CREATE OR REPLACE FUNCTION public.get_list(p_type text)
 RETURNS json
 LANGUAGE sql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
  with today as (select (now() at time zone 'Australia/Sydney')::date d),
  dl as (select id, rank, score, reasons, signals, is_control, version, property_id, null::text campaign from daily_list where list_date = (select d from today) and list_type = p_type
         union all
         select null, 100000 + ci.rank, null, array[ci.reason], '{}'::text[], false, null, ci.property_id, c.name
         from campaign_items ci join campaigns c on c.id = ci.campaign_id
         where p_type = 'seller' and c.active and c.ends_on >= (select d from today)
           and ci.property_id not in (select property_id from daily_list where list_date = (select d from today) and list_type = p_type)
           and not exists (select 1 from calls k where k.property_id = ci.property_id and k.created_at > c.created_at
                           and (k.created_at at time zone 'Australia/Sydney')::date < (select d from today))
           and not exists (select 1 from properties pp where pp.id = ci.property_id and pp.phone is not null and not phone_callable(pp.phone))),
  lc as (select distinct on (c.property_id) c.property_id, c.outcome, c.created_at from calls c where c.property_id in (select property_id from dl) order by c.property_id, c.created_at desc),
  hi as (select c.property_id, json_agg(json_build_object('id', c.id, 'at', c.created_at, 'outcome', c.outcome, 'notes', c.notes) order by c.created_at desc) h,
                count(*) filter (where c.outcome = 'no_answer') na
         from calls c where c.property_id in (select property_id from dl) group by c.property_id),
  ss as (select coalesce(p.street,'') street, coalesce(p.suburb,'') suburb, count(distinct case when s.bulk then s.contract_date::text || '|' || s.price::text else s.id::text end) n from sales s join properties p on p.id = s.property_id
         where s.contract_date > current_date - 365 group by 1, 2),
  sol as (select distinct on (n.property_id) n.property_id, sc.firm, sc.phone from probate_notices n
          join solicitor_contacts sc on n.solicitor ilike '%' || sc.pattern || '%'
          where n.property_id in (select property_id from dl) and n.notice_date > current_date - 1095
          order by n.property_id, n.notice_date desc, length(sc.pattern) desc),
  pb as (select distinct on (n.property_id) n.property_id, n.solicitor from probate_notices n
          where n.property_id in (select property_id from dl) and n.notice_date > current_date - 1095 order by n.property_id, n.notice_date desc),
  sh as (select s.property_id, json_agg(json_build_object('d', s.contract_date, 'price', case when s.bulk or s.price < 10000 then null else s.price end, 'bulk', s.bulk) order by s.contract_date desc) sales,
                (array_agg(s.bulk or coalesce(s.price, 0) < 10000 order by s.contract_date desc))[1] last_hidden
         from sales s where s.property_id in (select property_id from dl) and s.contract_date is not null group by s.property_id),
  wd as (select w.property_id, json_agg(json_build_object('d', w.event_date, 'kind', w.kind) order by w.event_date desc) ev
         from withdrawn_listings w where w.property_id in (select property_id from dl) group by w.property_id),
  cn as (select c.property_id, json_agg(json_build_object('name', c.name, 'comments', c.comments, 'last', c.last_notes, 'on', c.contacted_on, 'by', c.contacted_by, 'owner', c.primary_owner) order by c.contacted_on desc nulls last, c.id) notes
         from crm_notes c where c.property_id in (select property_id from dl) group by c.property_id)
  select coalesce(json_agg(row_to_json(x) order by x.rank), '[]'::json) from (
    select d.id list_id, d.rank, d.score, d.campaign, d.reasons, d.signals, d.is_control, d.version, p.id property_id, p.last_agency, p.last_agent, p.agency_sale_date,
      case when sol.firm is not null then 'Solicitor: ' || sol.firm || ' (estate of ' || coalesce(p.owner_name, 'owner') || ')'
           when pb.property_id is not null then 'Probate, solicitor number not found (' || coalesce(nullif(trim(regexp_replace(pb.solicitor, '^or by email to ', '')), ''), 'solicitor unknown') || '). Estate of ' || coalesce(p.owner_name, 'owner')
           when exists (select 1 from deceased_phones dp where dp.phone = regexp_replace(coalesce(p.phone, ''), '\D', '', 'g')) then 'Estate of ' || coalesce(p.owner_name, 'owner') || ' (owner has died, find the family or solicitor)' else p.owner_name end owner_name,
      case when sol.phone is not null then sol.phone when exists (select 1 from deceased_phones dp where dp.phone = regexp_replace(coalesce(p.phone, ''), '\D', '', 'g')) then null else p.phone end phone, case when exists (select 1 from deceased_phones dp where dp.phone = regexp_replace(coalesce(p.phone, ''), '\D', '', 'g')) then null else p.phone end owner_phone, p.owner2_name, case when phone_callable(p.phone2) then p.phone2 end phone2, sol.firm solicitor, p.fire_zone, p.flood_zone,
      concat_ws(' ', coalesce(nullif(p.unit,'') || '/', '') || p.house_number, p.street) street_address, p.suburb, p.postcode, p.bedrooms, p.baths, p.cars,
      p.last_sale_date, case when coalesce(sh.last_hidden, false) or p.last_sale_price < 10000 then null else p.last_sale_price end last_sale_price, p.land_area, p.lat, p.lng,
      case when (lc.created_at at time zone 'Australia/Sydney')::date = (select d from today) then lc.outcome end today_outcome,
      coalesce(ss.n, 0) street_sales_12m, hi.h history, coalesce(hi.na, 0) no_answers, sh.sales, wd.ev withdrawn, cn.notes crm_notes, pf.extra
    from dl d join properties p on p.id = d.property_id
    left join lc on lc.property_id = p.id
    left join hi on hi.property_id = p.id
    left join sol on sol.property_id = p.id
    left join pb on pb.property_id = p.id
    left join sh on sh.property_id = p.id
    left join wd on wd.property_id = p.id
    left join cn on cn.property_id = p.id
    left join property_facts pf on pf.property_id = p.id
    left join ss on ss.street = coalesce(p.street,'') and ss.suburb = coalesce(p.suburb,'')) x
$function$;
