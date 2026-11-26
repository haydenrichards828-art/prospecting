CREATE OR REPLACE FUNCTION public.merge_property(p_keep bigint, p_lose bigint, p_reason text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
declare k properties; l properties; t text[]; pk_tables text[] := array['pipeline','card_drops','contact_asof','property_planning','property_facts','streetview_meta','property_photos','nophone_skips'];
begin
  if p_keep = p_lose then return; end if;
  select * into k from properties where id = p_keep for update; select * into l from properties where id = p_lose for update;
  if k.id is null or l.id is null then return; end if;
  insert into property_merges(keep_id, lose_id, reason, lose_row) values (p_keep, p_lose, p_reason, to_jsonb(l));
  for i in 1..array_length(pk_tables,1) loop
    execute format('delete from %I where property_id = $2 and exists (select 1 from %I where property_id = $1)', pk_tables[i], pk_tables[i]) using p_keep, p_lose;
    execute format('update %I set property_id = $1 where property_id = $2', pk_tables[i]) using p_keep, p_lose;
  end loop;
  -- each agency keeps one contact row per home: the kept home's row wins, and is refreshed from the merged contact below
  delete from agency_contacts a where a.property_id = p_lose and exists (select 1 from agency_contacts a2 where a2.property_id = p_keep and a2.agency_id = a.agency_id);
  delete from daily_list d where d.property_id = p_lose and exists (select 1 from daily_list d2 where d2.property_id = p_keep and d2.list_date = d.list_date and d2.list_type = d.list_type);
  delete from campaign_items c where c.property_id = p_lose and exists (select 1 from campaign_items c2 where c2.property_id = p_keep and c2.campaign_id = c.campaign_id);
  for t in select array[c.table_name::text, c.column_name::text] from information_schema.columns c join pg_class r on r.relname = c.table_name and r.relkind = 'r'
           join pg_namespace n on n.oid = r.relnamespace and n.nspname = 'public'
           where c.table_schema = 'public' and (c.column_name = 'property_id' or (c.column_name = 'pid' and c.table_name in ('ux_events','vg_full')) or c.column_name = 'anchor_property_id')
             and c.table_name not like '%bak%' and c.table_name not like 'bt%' and c.table_name not in ('property_merges','property_key_alias')
             and not (c.table_name = any(pk_tables)) loop
    execute format('update %I set %I = $1 where %I = $2', t[1], t[2], t[2]) using p_keep, p_lose;
  end loop;
  update property_key_alias set property_id = p_keep where property_id = p_lose;
  if l.vg_property_id is not null and k.vg_property_id is null then update properties set vg_property_id = null where id = p_lose; end if;
  update properties p set
    vg_property_id = coalesce(k.vg_property_id, l.vg_property_id),
    last_sale_date = greatest(k.last_sale_date, l.last_sale_date),
    last_sale_price = case when coalesce(l.last_sale_date,'1900-01-01') > coalesce(k.last_sale_date,'1900-01-01') then l.last_sale_price else coalesce(k.last_sale_price, l.last_sale_price) end,
    bedrooms = coalesce(k.bedrooms, l.bedrooms), baths = coalesce(k.baths, l.baths), cars = coalesce(k.cars, l.cars), land_area = coalesce(k.land_area, l.land_area),
    lat = coalesce(k.lat, l.lat), lng = coalesce(k.lng, l.lng), zone = coalesce(k.zone, l.zone), postcode = coalesce(k.postcode, l.postcode),
    nature = coalesce(k.nature, l.nature), purpose = coalesce(k.purpose, l.purpose), flood_zone = coalesce(k.flood_zone, l.flood_zone), fire_zone = coalesce(k.fire_zone, l.fire_zone),
    owner_address = coalesce(k.owner_address, l.owner_address), last_agency = coalesce(k.last_agency, l.last_agency), last_agent = coalesce(k.last_agent, l.last_agent),
    agency_sale_date = greatest(k.agency_sale_date, l.agency_sale_date),
    is_landlord = k.is_landlord or l.is_landlord, crm_flag = k.crm_flag or l.crm_flag, contact_locked = coalesce(k.contact_locked,false) or coalesce(l.contact_locked,false),
    owner_name = case when k.phone is null and l.phone is not null then l.owner_name else coalesce(k.owner_name, l.owner_name) end,
    phone = coalesce(k.phone, l.phone),
    contact_as_of = case when k.phone is null and l.phone is not null then l.contact_as_of else k.contact_as_of end,
    owner2_name = case when k.phone is null and l.phone is not null then l.owner2_name
                       when k.phone is not null and l.phone is not null and l.phone <> k.phone and k.phone2 is null then l.owner_name else k.owner2_name end,
    phone2 = case when k.phone is null and l.phone is not null then l.phone2
                  when k.phone is not null and l.phone is not null and l.phone <> k.phone and k.phone2 is null then l.phone else k.phone2 end,
    updated_at = now()
  where p.id = p_keep;
  delete from properties where id = p_lose;
  insert into property_key_alias(address_key, property_id) values (l.address_key, p_keep) on conflict (address_key) do update set property_id = excluded.property_id;
end $function$;
