-- A sale is "bulk" when one price covers several homes: same day, same price, same street, at least two homes,
-- and the price is far above what a single home there sells for. Its price is never shown as this home's price.
alter table public.sales add column if not exists bulk boolean not null default false;

create or replace function public.mark_bulk_sales() returns integer
language plpgsql set search_path to 'public', 'extensions' as $$
declare n int;
begin
  with g as (
    select s.contract_date d, s.price, lower(coalesce(p.street,'') || '|' || coalesce(p.suburb,'')) sk, min(p.suburb) sub
    from sales s join properties p on p.id = s.property_id
    where s.price >= 1000000
    group by 1, 2, 3 having count(distinct s.property_id) >= 2),
  m as (
    select g.*, (select percentile_cont(0.5) within group (order by s2.price)
                 from sales s2 join properties p2 on p2.id = s2.property_id
                 where p2.suburb = g.sub and s2.contract_date between g.d - 1095 and g.d and s2.price >= 100000 and not s2.bulk) med
    from g)
  update sales s set bulk = true
  from m, properties p
  where p.id = s.property_id and s.contract_date = m.d and s.price = m.price
    and lower(coalesce(p.street,'') || '|' || coalesce(p.suburb,'')) = m.sk
    and (m.price >= 3000000 or m.price >= 2.5 * coalesce(m.med, 1e12))
    and not s.bulk;
  get diagnostics n = row_count;
  return n;
end $$;
select public.mark_bulk_sales();

-- New sale rows with an impossible date are skipped instead of saved (a typed year like 1016 or 1914).
create or replace function public.sales_date_guard() returns trigger
language plpgsql set search_path to 'public' as $$
begin
  if new.contract_date is null or new.contract_date < '1950-01-01' or new.contract_date > (now() at time zone 'Australia/Sydney')::date + 1 then
    return null;
  end if;
  return new;
end $$;
drop trigger if exists sales_date_guard on public.sales;
create trigger sales_date_guard before insert or update of contract_date on public.sales
  for each row execute function public.sales_date_guard();
