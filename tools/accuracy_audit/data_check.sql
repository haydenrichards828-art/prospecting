-- Nightly data check: every morning after the call list is made, look for anything wrong in what Prospect shows.
-- Results go in data_checks (shown in Settings, List health) and run_log. A "stop" result marks the run as failed,
-- which turns on the warning in the app.
create table if not exists public.data_checks (
  run_on date not null,
  name text not null,
  level text not null,          -- stop: something wrong on today's call list; fix: wrong data elsewhere; info: worth knowing
  n integer not null,
  what text,
  sample jsonb,
  at timestamptz not null default now(),
  primary key (run_on, name)
);
alter table public.data_checks enable row level security;

create or replace function public.data_check() returns jsonb
language plpgsql security definer set search_path to 'public', 'extensions' as $$
declare td date := (now() at time zone 'Australia/Sydney')::date; stops int; fixes int; out jsonb;
begin
  perform mark_bulk_sales();
  delete from data_checks where run_on = td;

  with d as (select d.list_type, d.property_id, d.reasons, d.signals, p.phone, p.phone2, p.contact_as_of,
               concat_ws(' ', coalesce(nullif(p.unit,'') || '/', '') || p.house_number, p.street) || ', ' || p.suburb addr
             from daily_list d join properties p on p.id = d.property_id where d.list_date = td),
  called as (select distinct property_id from calls where (created_at at time zone 'Australia/Sydney')::date = td),
  c as (
    -- today's call list
    select 'On today''s list but blocked (do not call list or the register)' name, 'stop' level,
           'a number that must never be called' what,
           (select jsonb_agg(addr) from d where list_type <> 'nophone' and (
              exists (select 1 from do_not_call x where norm_phone(x.phone) in (d.phone, d.phone2))
              or exists (select 1 from dncr x where x.registered and x.phone in (d.phone, d.phone2)))) s
    union all select 'Same number twice on today''s list', 'stop', 'one person would be called twice',
           (select jsonb_agg(phone) from (select phone from d where phone is not null and list_type <> 'nophone' group by phone having count(*) > 1) z)
    union all select 'On today''s list but bought in the last 12 months', 'stop', 'new owners are kept off for a year',
           (select jsonb_agg(addr) from d where list_type <> 'nophone' and exists (select 1 from sales s where s.property_id = d.property_id and s.contract_date > td - 365 and s.contract_date <= td)
              and not ('probate' = any(coalesce(d.signals, '{}'))) and not exists (select 1 from called k where k.property_id = d.property_id))
    union all select 'On today''s list but for sale with another agency', 'stop', 'listed elsewhere right now',
           (select jsonb_agg(addr) from d where exists (select 1 from agency_listings a where a.property_id = d.property_id and a.status in ('for_sale','under_offer') and a.gone_at is null and a.last_seen > td - 7))
    union all select 'On today''s list but sold after the contact was recorded', 'stop', 'the number probably belongs to the previous owner',
           (select jsonb_agg(addr) from d where list_type <> 'nophone' and d.contact_as_of is not null and exists (select 1 from sales s where s.property_id = d.property_id and s.contract_date > d.contact_as_of + 60))
    union all select 'Numbers on today''s list not checked against the Do Not Call Register in the last 30 days', 'stop',
           'the law allows calling a number only within 30 days of checking it',
           (select jsonb_agg(addr) from d where list_type <> 'nophone' and not exists (select 1 from dncr r where r.phone = d.phone and not r.registered and r.washed_at > now() - interval '30 days'))
    union all select 'A reason on today''s list does not match the sale records', 'stop', 'the "Owned" years shown must match the latest recorded sale',
           (select jsonb_agg(addr || ': ' || o) from (select d.addr, o from d cross join lateral unnest(d.reasons) o
              left join lateral (select max(s.contract_date) ls from sales s where s.property_id = d.property_id and s.contract_date >= '1990-01-01' and s.contract_date <= td) m on true
              where (o ~ '^Owned \d+ yrs' and (m.ls is null or substring(o from '^Owned (\d+)')::int <> floor((td - m.ls) / 365.25)::int))
                 or (o ~ '^(No sale on record|Owned 35\+)' and m.ls is not null)) z)
    -- leads
    union all select 'Lead linked to a different home than its address', 'fix', 'the lead shows facts about the wrong home',
           (select jsonb_agg(l.name || ': ' || l.address || ' vs ' || concat_ws(' ', p.house_number, p.street, p.suburb)) from leads l join properties p on p.id = l.property_id
             where l.address ~ '\d' and coalesce(l.suburb, '') <> ''
               and ((canon_sub(l.suburb) <> canon_sub(p.suburb) and levenshtein(lower(l.suburb), lower(p.suburb)) > 2)
                    or substring(lower(l.address) from '(\d+)[a-z]?\s+[a-z]') is distinct from substring(lower(p.house_number) from '(\d+)[a-z]?$')))
    -- the records behind everything
    union all select 'Same home stored twice', 'fix', 'sales and contacts split across two records',
           (select jsonb_agg(k) from (select street_key(p.unit, p.house_number, p.street) || ', ' || canon_sub(p.suburb) k from properties p
              where p.house_number ~ '\d' and street_key(p.unit, p.house_number, p.street) is not null group by street_key(p.unit, p.house_number, p.street), canon_sub(p.suburb) having count(*) > 1) z)
    union all select 'Same sale stored twice', 'fix', 'a sale shows twice in the history',
           (select jsonb_agg(property_id) from (select property_id from sales group by property_id, contract_date, price having count(*) > 1) z)
    union all select 'Sale with an impossible date', 'fix', 'before 1950 or in the future',
           (select jsonb_agg(property_id) from sales where contract_date < '1950-01-01' or contract_date > td + 1)
    union all select 'Government sale not linked to its home', 'fix', 'the home looks like it has not sold when it has',
           (select jsonb_agg(v.k || ' ' || v.d) from vg_full v join properties p on p.address_key = v.k
             where v.pid is null and v.d >= '1990-01-01' and not exists (select 1 from sales s where s.property_id = p.id and abs(s.contract_date - v.d) <= 7))
    -- is the data coming in
    union all select 'Government sales not updated in 3 days', 'fix', 'the daily sales import has stopped',
           case when not exists (select 1 from run_log where job = 'vg_import' and ok and created_at > now() - interval '3 days') then '["vg_import"]'::jsonb end
    union all select 'Council applications not updated in 3 days', 'fix', 'the daily DA import has stopped',
           case when not exists (select 1 from run_log where job = 'da_import' and ok and created_at > now() - interval '3 days') then '["da_import"]'::jsonb end
    union all select 'Probate notices not updated in 3 days', 'fix', 'the probate import has stopped',
           case when not exists (select 1 from run_log where job = 'probate_sync' and ok and created_at > now() - interval '3 days') then '["probate_sync"]'::jsonb end
    union all select 'Other agencies'' listings not updated in 2 days', 'fix', 'homes listed elsewhere could stay on the list',
           case when not exists (select 1 from run_log where job = 'agency_sync' and ok and created_at > now() - interval '2 days') then '["agency_sync"]'::jsonb end
    union all select 'Today''s call list was not made', 'stop', 'the morning list did not run',
           case when not exists (select 1 from daily_list where list_date = td) then '["daily_list"]'::jsonb end
    -- worth knowing
    union all select 'Sales where one price covers several homes', 'info', 'shown as "Sold with other homes", never as this home''s price',
           (select jsonb_agg(distinct property_id) from sales where bulk and contract_date > td - 730)
  )
  insert into data_checks(run_on, name, level, n, what, sample)
  select td, name, level, coalesce(jsonb_array_length(s), 0), what, (select jsonb_agg(x) from (select x from jsonb_array_elements(s) x limit 10) y) from c;

  select count(*) filter (where level = 'stop' and n > 0), count(*) filter (where level = 'fix' and n > 0) into stops, fixes from data_checks where run_on = td;
  select jsonb_object_agg(name, n) into out from data_checks where run_on = td and n > 0;
  insert into run_log(job, ok, detail) values ('data_check', stops = 0,
    case when stops = 0 and fixes = 0 then 'Everything checked out' else stops || ' problem(s) on today''s list, ' || fixes || ' data problem(s): ' || coalesce(out::text, '{}') end);
  return jsonb_build_object('stops', stops, 'fixes', fixes, 'found', coalesce(out, '{}'::jsonb));
end $$;

-- every morning, ten minutes after the call list is made (04:30 Sydney summer time)
select cron.unschedule(jobid) from cron.job where jobname = 'data_check';
select cron.schedule('data_check', '40 17 * * *', 'select public.data_check()');
