CREATE OR REPLACE FUNCTION public.score_properties_v5(p_date date, p_type text, p_weights jsonb)
 RETURNS TABLE(property_id bigint, phone text, score numeric, signals text[], reasons text[], features jsonb)
 LANGUAGE sql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
  with cfg as (select require_dncr_wash req from settings where id = 1),
  w as (select p_weights j),
  rt as (select is_unit, bk, case when bk = 99 and not is_unit and (p_weights ? 'nosale_rate_house') then (p_weights->>'nosale_rate_house')::numeric
                         when bk = 99 and is_unit and (p_weights ? 'nosale_rate_unit') then (p_weights->>'nosale_rate_unit')::numeric else rate::numeric end rate, n from fix_rates),
  rmax as (select max(bk) filter (where bk < 99) mb from rt),
  base_rate as (select sum(rate::numeric*n)/sum(n) br from fix_rates),
  excl as (
    select e.property_id from call_exclusions(p_date) e
    union
    select d.property_id from da_applications d
      where d.dev_types ~* 'commercial|retail|office|industrial|business premises|shop|restaurant|cafe|food and drink|signage|recreation facility|warehouse|educational|health services|place of public worship|hotel|motel|car park|telecommunications|mixed use|serviced apartment|childcare|centre-based'),
  pr as (select n.property_id, max(n.notice_date) d, string_agg(distinct coalesce(n.solicitor,''), ', ') sol from probate_notices n where n.notice_date > p_date - 1095 and n.notice_date <= p_date
         and not exists (select 1 from sales s where s.property_id = n.property_id and s.contract_date > n.notice_date and s.contract_date <= p_date) group by 1),
  wd as (select w.property_id, max(w.event_date) d from withdrawn_listings w where coalesce(w.kind,'withdrawn') = 'withdrawn' and w.event_date > p_date - 1095 and w.event_date <= p_date
         and not exists (select 1 from sales s where s.property_id = w.property_id and s.contract_date > w.event_date and s.contract_date <= p_date) group by 1),
  ap as (select w.property_id, max(w.event_date) d from withdrawn_listings w where w.kind = 'appraisal' and w.event_date > p_date - 365 and w.event_date <= p_date
         and not exists (select 1 from sales s where s.property_id = w.property_id and s.contract_date > w.event_date and s.contract_date <= p_date) group by 1),
  da0 as (select d.property_id, coalesce(d.determination_date, d.lodgement_date) dd,
            case when d.subdivision or d.dev_types ~* 'subdivision|torrens' then 1
                 when d.dev_types ~* 'demolition|dual occupancy|new dwelling|erection of a dwelling|multi dwelling|secondary dwelling|strata' then 2
                 when d.dev_types ~* 'alteration|additions' then 3 else 4 end c
          from da_applications d where d.property_id is not null and coalesce(d.determination_date, d.lodgement_date) between p_date - 1095 and p_date
            and not exists (select 1 from sales s where s.property_id = d.property_id and s.contract_date > coalesce(d.determination_date, d.lodgement_date) and s.contract_date <= p_date)),
  da as (select property_id, min(c) filter (where c <> 1 or dd > p_date - 365) c from da0 group by 1),
  ls as (select s.property_id, max(s.contract_date) d from sales s where s.contract_date <= p_date and s.contract_date >= '1990-01-01' group by 1),
  stc as (select lower(p.street||'|'||p.suburb) sk, count(distinct case when s.bulk then s.contract_date::text || '|' || s.price::text else s.id::text end) n from sales s join properties p on p.id = s.property_id
          where s.contract_date > p_date - 365 and s.contract_date <= p_date and s.price >= 50000 and p.street is not null and p.suburb is not null group by 1),
  sbc as (select suburb, count(*) n from properties where suburb is not null group by 1),
  sr as (select p.suburb, count(distinct s.property_id)::real / max(sbc.n) r from sales s join properties p on p.id = s.property_id join sbc on sbc.suburb = p.suburb
          where s.contract_date > p_date - 1095 and s.contract_date <= p_date and s.price >= 50000 group by p.suburb),
  sqt as (select p.id, ntile(5) over (order by coalesce(sr.r,0)) sq from properties p join ls on ls.property_id = p.id left join sr on sr.suburb = p.suburb
          where p.suburb is not null and p.street is not null),
  jsr as (select s.property_id sid, s.contract_date sd, case when s.bulk or s.price < 10000 then null else s.price end sp from sales s where s.contract_date > p_date - 90 and s.contract_date <= p_date),
  js0 as (select j.*, coalesce(p.street,'') street, coalesce(p.suburb,'') suburb, p.unit su, p.house_number hn,
            substring(p.house_number from '(\d+)[A-Za-z]?$')::int n
          from jsr j join properties p on p.id = j.sid where p.house_number ~ '\d'),
  js as (select distinct on (p.id) p.id pid, j.su, j.hn, j.street, j.sd, j.sp
         from js0 j join properties p on coalesce(p.street,'') = j.street and coalesce(p.suburb,'') = j.suburb and p.id <> j.sid
           and p.house_number ~ '\d' and abs(j.n - substring(p.house_number from '(\d+)[A-Za-z]?$')::int) <= 12
         order by p.id, j.sd desc),
  base as (
    select p.*, ls.d last_d, case when ls.d is not null then (p_date - ls.d)/365.25 end yrs,
      (coalesce(p.unit,'') <> '' or p.house_number like '%/%') is_unit
    from properties p
    left join ls on ls.property_id = p.id
    left join excl e on e.property_id = p.id
    left join do_not_call dn on dn.phone = p.phone
    left join dncr r on r.phone = p.phone
    where (p_type = 'seller' or p.is_landlord)
      and e.property_id is null and dn.phone is null and coalesce(r.registered, false) = false
      and (p.phone is null or not (select req from cfg) or (r.phone is not null and r.washed_at > now() - interval '30 days'))),
  sig as (
    select b.id, b.phone, b.yrs, b.crm_flag crm, b.is_landlord ll, coalesce(lr.rate, (select br from base_rate)) * coalesce(fc.adj, 1)::numeric rate, coalesce(fc.adj, 1)::numeric adj,
      pr.d pr_d, pr.sol, p_date - pr.d pr_age, wd.d wd_d, p_date - wd.d wd_age, ap.d ap_d, p_date - ap.d ap_age, da.c da_c,
      coalesce(b.bedrooms >= 4 and b.yrs >= 15, false) dn, coalesce(b.bedrooms <= 2 and b.yrs between 5 and 8, false) up,
      js.pid is not null and (b.last_d is null or b.last_d <= p_date - 90) is_js, js.su js_u, js.hn js_hn, js.street js_st, js.sd js_d, js.sp js_p
    from base b
    left join rt lr on lr.is_unit = b.is_unit
      and lr.bk = case when b.yrs is null then 99 else least(floor(b.yrs)::int, (select mb from rmax)) end
    left join sqt on sqt.id = b.id
    left join stc on stc.sk = lower(b.street||'|'||b.suburb)
    left join fix_cells fc on coalesce((p_weights->>'cells_v1')::boolean, false) and fc.is_unit = b.is_unit and fc.sq = sqt.sq
      and fc.st = least(3, greatest(0, coalesce(stc.n,0) - case when b.last_d > p_date - 365 then 1 else 0 end))
      and fc.hold_b = case when b.last_d is null then -1 when b.yrs < 1 then 0 when b.yrs < 2 then 1 when b.yrs < 3 then 2 when b.yrs < 5 then 3
                           when b.yrs < 7 then 4 when b.yrs < 10 then 5 when b.yrs < 15 then 6 else 7 end
    left join pr on pr.property_id = b.id left join wd on wd.property_id = b.id left join ap on ap.property_id = b.id
    left join da on da.property_id = b.id left join js on js.pid = b.id),
  m as (
    select s.*,
      case when pr_age is null then 1 when pr_age <= 182 then (j->>'probate_6m')::numeric when pr_age <= 365 then (j->>'probate_12m')::numeric else (j->>'probate_3y')::numeric end m_pr,
      case when wd_age is null then 1 when wd_age <= 182 then (j->>'withdrawn_6m')::numeric when wd_age <= 365 then (j->>'withdrawn_12m')::numeric
           when wd_age <= 730 then (j->>'withdrawn_2y')::numeric else (j->>'withdrawn_3y')::numeric end m_wd,
      case when ap_age is null then 1 when ap_age <= 182 then (j->>'appraisal_6m')::numeric else (j->>'appraisal_12m')::numeric end m_ap,
      case da_c when 1 then (j->>'da_subdivision')::numeric when 2 then (j->>'da_build')::numeric when 3 then (j->>'da_reno')::numeric when 4 then (j->>'da_other')::numeric else 1 end m_da
    from sig s, w),
  pp as (
    select m.*, m.rate
      * case when crm then coalesce((p_weights->>'crm')::numeric,1) else 1 end
      * case when is_js then coalesce((p_weights->>'just_sold')::numeric,1) else 1 end
      * coalesce(m_pr,1) * coalesce(m_wd,1) * coalesce(m_ap,1) * coalesce(m_da,1)
      * case when dn then coalesce((p_weights->>'downsize')::numeric,1) else 1 end
      * case when up then coalesce((p_weights->>'upsize')::numeric,1) else 1 end
      + case when coalesce((p_weights->>'pin_fresh')::boolean, false) and (pr_age <= 182 or wd_age <= 182) then 1 else 0 end p,
      m.rate > (select br from base_rate) * 1.2 hot_hold
    from m)
  select id, phone, round(1000 * p, 1),
    array_remove(array[case when hot_hold then 'turnover' end, case when pr_d is not null then 'probate' end, case when wd_d is not null then 'withdrawn' end,
      case when ap_d is not null then 'appraisal' end,
      case when dn then 'downsize' end, case when up then 'upsize' end, case when crm then 'crm' end,
      case when da_c = 1 then 'da_major' end, case when is_js then 'just_sold' end, case when p_type='landlord' and ll then 'landlord' end], null),
    array_remove(array[
      case when pr_d is not null then 'Probate notice ' || to_char(pr_d, 'FMMon YYYY') || case when coalesce(sol,'') <> '' then ' (' || sol || ')' else '' end end,
      case when wd_d is not null then 'Listing withdrawn or expired ' || to_char(wd_d, 'FMMon YYYY') || ', not sold since' end,
      case when ap_d is not null then 'Dignam appraisal ' || to_char(ap_d, 'FMMon YYYY') || ', never listed' end,
      case when is_js then 'Neighbour at ' || coalesce(nullif(js_u,'') || '/', '') || js_hn || ' ' || initcap(js_st) || ' sold'
        || case when js_p is null then '' when js_p >= 999500 then ' for $' || trim(to_char(js_p/1000000.0, 'FM990.00')) || 'm' else ' for $' || round(js_p/1000) || 'k' end
        || ' (' || to_char(js_d, 'FMDD Mon') || ')' end,
      case when yrs is not null then 'Owned ' || floor(yrs) || ' yrs' || case when hot_hold then ' (prime selling window)' else '' end
           else 'No sale on record since 1990' end,
      case when dn then 'Large home held long term' end, case when up then 'Small home, 5 to 8 yrs' end,
       case when da_c = 1 then 'Subdivision DA in the last year' end,
      case when p_type='landlord' and ll then 'Investment property' end], null),
    jsonb_build_object('hold_rate', round(rate,4), 'probate', (pr_d is not null)::int, 'withdrawn', (wd_d is not null)::int, 'appraisal', (ap_d is not null)::int,
      'downsize', dn::int, 'upsize', up::int, 'crm', crm::int, 'da', coalesce(da_c,0), 'just_sold', is_js::int, 'landlord', (p_type='landlord' and ll)::int, 'area_adj', round(adj, 2))
  from pp
$function$;
