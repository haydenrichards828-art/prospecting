-- Accuracy audit 26 Nov 2026: fix sale records and duplicate homes. Backups first.
create table if not exists public.sales_bak_20261126 as select * from public.sales;
create table if not exists public.properties_sale_bak_20261126 as select id, last_sale_date, last_sale_price from public.properties;

-- 1. impossible sale dates (typed years like 1016, 1914 from old file imports)
delete from public.sales where contract_date < '1950-01-01' or contract_date > (now() at time zone 'Australia/Sydney')::date + 1;
update public.properties set last_sale_date = null, last_sale_price = null where last_sale_date < '1950-01-01' or last_sale_date > (now() at time zone 'Australia/Sydney')::date + 1;

-- 2. the same sale stored twice (left over from earlier merges)
delete from public.sales s using public.sales t
 where s.property_id = t.property_id and s.contract_date = t.contract_date and s.price is not distinct from t.price and s.id > t.id;
delete from public.sales s using public.sales t
 where s.property_id = t.property_id and s.contract_date = t.contract_date and s.price is null and t.price is not null;

-- 3. one home stored twice under two spellings (Mount St Thomas and Mount Saint Thomas, Crest and Crst ...)
select public.merge_same_address_doubles();
delete from public.sales s using public.sales t
 where s.property_id = t.property_id and s.contract_date = t.contract_date and s.price is not distinct from t.price and s.id > t.id;

-- 4. government sales that match a home's address exactly but were never linked to it
with v as (
  select distinct on (p.id, v.d) p.id pid, v.d, nullif(v.price, 0) price
  from public.vg_full v join public.properties p on p.address_key = v.k
  where v.pid is null and v.d >= '1990-01-01' and v.d <= (now() at time zone 'Australia/Sydney')::date
    and not exists (select 1 from public.sales s where s.property_id = p.id and abs(s.contract_date - v.d) <= 7)
  order by p.id, v.d, v.price desc nulls last)
insert into public.sales(property_id, vg_sale_key, contract_date, price)
select pid, 'vgf-' || pid || '-' || d, d, price from v
on conflict (vg_sale_key) do nothing;
update public.vg_full v set pid = p.id from public.properties p where v.pid is null and p.address_key = v.k;

-- 5. the home's own last sale fields follow its newest recorded sale
update public.properties p set last_sale_date = s.d, last_sale_price = s.price
from (select distinct on (property_id) property_id, contract_date d, price from public.sales order by property_id, contract_date desc, price desc nulls last) s
where s.property_id = p.id and (p.last_sale_date is null or s.d > p.last_sale_date);
