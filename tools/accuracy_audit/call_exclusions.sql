CREATE OR REPLACE FUNCTION public.call_exclusions(p_date date)
 RETURNS TABLE(property_id bigint, why text)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
  with s as (select * from settings where id = 1),
  lc as (select distinct on (c.property_id) c.property_id, c.outcome, c.created_at from calls c order by c.property_id, c.created_at desc),
  lastconn as (select c.property_id, max(c.created_at) at from calls c where c.outcome <> 'no_answer' group by 1),
  na as (select c.property_id,
           count(*) filter (where c.created_at > p_date - interval '30 days') n30,
           count(*) filter (where c.created_at > coalesce(lc2.at, '-infinity')) since_conn,
           max(c.created_at) last_na
         from calls c left join lastconn lc2 on lc2.property_id = c.property_id
         where c.outcome = 'no_answer' group by c.property_id),
  ld as (select coalesce(l.property_id, match_lead_property(l.address, l.suburb)) pid, norm_phone(l.phone) phone, l.status, l.updated_at from leads l),
  x as (
    select c.property_id, 'do not call' why from calls c where c.outcome = 'do_not_call'
    union all select lc.property_id, 'called in the last ' || s.recent_call_days || ' days' from lc, s where lc.created_at > p_date - make_interval(days => s.recent_call_days)
    union all select lc.property_id, 'call back booked' from lc where lc.outcome = 'call_back'
    union all select lc.property_id, 'not interested' from lc, s where lc.outcome = 'not_interested' and lc.created_at > p_date - make_interval(days => s.not_interested_days)
    union all select na.property_id, 'missed call' from na, s where na.last_na > p_date - make_interval(days => s.noanswer_gap_days)
    union all select na.property_id, '3 missed calls this month' from na where na.n30 >= 3
    union all select na.property_id, '6 missed calls in a row' from na, s where na.since_conn >= 6 and na.last_na > p_date - make_interval(days => s.noanswer_rest_days)
    union all select lc.property_id, 'appraisal' from lc, s where lc.outcome = 'appraisal' and lc.created_at > p_date - make_interval(days => s.appraisal_days)
    union all select lc.property_id, 'listed' from lc, s where lc.outcome = 'listed' and lc.created_at > p_date - make_interval(days => s.sold_days)
    union all select lc.property_id, 'lead' from lc, s where lc.outcome = 'lead' and lc.created_at > p_date - make_interval(days => s.lead_closed_days)
    union all select pl.property_id, 'in pipeline: ' || pl.stage from pipeline pl, s where
         (pl.stage = 'appraisal' and coalesce(pl.appraisal_at, pl.updated_at) > p_date - make_interval(days => s.appraisal_days))
      or (pl.stage = 'listed')
      or (pl.stage = 'sold' and coalesce(pl.sold_at, pl.updated_at) > p_date - make_interval(days => s.sold_days))
      or (pl.stage in ('lost','listed_other','withdrawn') and coalesce(pl.lost_at, pl.listed_other_at, pl.withdrawn_at, pl.updated_at) > p_date - make_interval(days => s.lead_closed_days))
    union all select ld.pid, case when ld.status = 'Do Not Contact' then 'lead: do not contact' when ld.status = 'Closed' then 'closed lead' else 'open lead' end
      from ld, s where ld.pid is not null and (ld.status <> 'Closed' or ld.updated_at > p_date - make_interval(days => s.lead_closed_days))
    union all select p.id, 'phone is a lead' from ld join properties p on p.phone = ld.phone, s where ld.phone is not null
         and (ld.status <> 'Closed' or ld.updated_at > p_date - make_interval(days => s.lead_closed_days))
    union all select p.id, 'do not call list' from do_not_call d join properties p on p.phone = norm_phone(d.phone)
    union all select p.id, 'on the Do Not Call Register' from dncr d join properties p on p.phone = d.phone where d.registered
   union all select e.property_id, e.reason from exclusions e where (e.until is null or e.until >= p_date) and e.reason <> 'reported: on the market'
   -- for sale with another agent: off until it sells, then 2 years from the sale
   union all select e.property_id, e.reason from exclusions e where e.reason = 'reported: on the market'
      and not exists (select 1 from sales sl where sl.property_id = e.property_id and sl.contract_date >= e.created_at::date - 120 and sl.contract_date <= p_date - 730)
   -- rentals Dignam manages are never called
   union all select p.id, 'Dignam manages the rental' from dignam_rentals r join properties p on p.address_key = r.address_key
   union all select l.property_id, 'listed with Dignam' from listings l where l.status = 'for_sale' and l.property_id is not null
   -- other agencies' websites: on the market now, or sold recently (shows days after exchange, months before government data)
   union all select a.property_id, 'on the market with another agency' from agency_listings a
      where a.property_id is not null and a.status in ('for_sale','under_offer') and a.last_seen > p_date - 7
   union all select a.property_id, 'sold recently (agency website)' from agency_listings a
      where a.property_id is not null and a.status = 'sold'
        and coalesce(a.sold_date, (select max(sl.contract_date) from sales sl where sl.property_id = a.property_id)) > p_date - 730
   union all select a.property_id, case when sl.cd is not null then 'sold (left the agency website, sale confirmed)' else 'probably sold (left the agency website)' end
      from agency_listings a
      left join lateral (select max(s2.contract_date) cd from sales s2 where s2.property_id = a.property_id and s2.contract_date >= a.first_seen::date - 30) sl on true
      where a.property_id is not null
        and (a.status = 'off_market' or (a.status in ('for_sale','under_offer') and a.last_seen <= p_date - 7))
        and not exists (select 1 from withdrawn_listings w where w.property_id = a.property_id and w.event_date >= a.first_seen::date)
        and (case when sl.cd is not null then sl.cd > p_date - 730 else coalesce(a.gone_at, a.last_seen) > p_date - 120 end)
   -- an agency website shows it sold, with no date, and no government sale matches its price: probably a recent sale not recorded yet
   union all select a.property_id, 'sold on an agency website, not in government records yet' from agency_listings a
      where a.property_id is not null and a.status = 'sold' and a.sold_date is null
        and ((a.price is not null and not exists (select 1 from sales sl where sl.property_id = a.property_id and sl.price between a.price * 0.95 and a.price * 1.05))
          or (a.price is null and not exists (select 1 from sales sl where sl.property_id = a.property_id)))
   union all select ce.property_id, 'Dignam off-market listing' from crm_events ce where ce.status = 'OffMarket' and ce.event_date > p_date - 180 and ce.property_id is not null
   union all select ce.property_id, 'sold through Dignam' from crm_events ce where ce.status = 'Exchanged' and ce.event_date > p_date - 365 and ce.property_id is not null
   union all select p.id, 'withdrawn with Dignam' from agentbox_withdrawn a join properties p on p.address_key = a.address_key
      where a.cls = 'sale' and a.event_date <= p_date
        and not exists (select 1 from sales sl where sl.property_id = p.id and sl.contract_date > a.event_date and sl.contract_date <= p_date)
   -- who the contact is: only confirmed owners get called
   union all select p.id, case cr.kind when 'tenant' then 'contact is a tenant'
                                       when 'stale' then 'contact on file is from before the last sale'
                                       when 'past_owner' then 'contact is a past owner'
                                       else 'contact not confirmed as the owner' end
      from properties p join contact_roles cr on cr.phone = regexp_replace(p.phone, '\D', '', 'g')
      where cr.kind in ('tenant','stale','unknown','past_owner')
   -- any sale after the contact details were recorded means the contact is probably the previous owner
   union all select p.id, 'home sold after these contact details were recorded' from properties p
      where p.phone is not null and p.contact_as_of is not null
        and exists (select 1 from sales sl where sl.property_id = p.id and sl.contract_date > p.contact_as_of + 60 and sl.contract_date <= p_date)
   union all select p.id, 'phone belongs to an owner who has died' from properties p join deceased_phones dp on dp.phone = p.phone
      where not exists (select 1 from probate_notices n where n.property_id = p.id and n.notice_date > p_date - 1095)
        and (p.phone like '04%' or coalesce(p.owner_name,'') !~ '/|&|;|\mand\M')
   union all select p.id, 'phone number not valid' from properties p
      where p.phone is not null and (regexp_replace(p.phone, '\D', '', 'g') !~ '^0[23478][0-9]{8}$'
         or regexp_replace(p.phone, '\D', '', 'g') ~ '([0-9])\1{5,}'
         or regexp_replace(p.phone, '\D', '', 'g') in ('0123456789','0212345678','0412345678'))
   union all select p.id, 'no owner name on the record' from properties p where p.phone is not null and btrim(coalesce(p.owner_name,'')) = ''
   union all select p.id, 'contact is a solicitor or care of address' from properties p
      where p.owner_name ~* '\m(lawyers?|solicitors?|legal|conveyancing|& associates)\M|c/-|c/o'
   union all select p.id, 'not a home address (care of)' from properties p
      where concat_ws(' ', p.unit, p.house_number, p.street) ~* 'c/-|c/o|po box|locked bag'
   union all select r.matched_pid, 'owner died and the home has since sold' from probate_notices_raw r
      join sales sl on sl.property_id = r.matched_pid and sl.contract_date > coalesce(r.date_of_death, r.notice_date) - 180 and sl.contract_date <= p_date
      where r.matched_pid is not null
   union all select p.id, 'owner on file died ' || to_char(n.notice_date, 'Mon YYYY') from probate_notices n join properties p on p.id = n.property_id
      where n.notice_date <= p_date - 1095 and p.owner_name !~ '/|&|;|\mand\M'
  )
  select y.property_id, min(y.why) from (
    select x.property_id, x.why from x
    union all
    select p2.id, x.why || ' (same phone)' from x join properties p1 on p1.id = x.property_id join properties p2 on p2.phone = p1.phone and p2.id <> p1.id where p1.phone is not null and x.why not in ('home sold after these contact details were recorded', 'owner died and the home has since sold')
  ) y where y.property_id is not null group by 1
$function$;
