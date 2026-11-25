CREATE OR REPLACE FUNCTION public.list_health()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
 select jsonb_build_object(
  'checks', coalesce((select jsonb_agg(x order by x->>'date' desc) from (select jsonb_build_object('date', list_date, 'removed', coalesce(sum(n) filter (where action='remove'),0), 'flagged', coalesce(sum(n) filter (where action='flag'),0),
     'rules', jsonb_object_agg(rule, n)) x from (select list_date, rule, action, count(*) n from list_audit_log where list_date > current_date - 14 group by 1,2,3) a group by list_date) y), '[]'::jsonb),
  'reports', coalesce((select jsonb_agg(jsonb_build_object('at', f.created_at, 'kind', f.kind, 'note', f.note, 'address', concat_ws(' ', nullif(p.unit,'')||'/', p.house_number, p.street) || ', ' || p.suburb) order by f.created_at desc)
     from (select * from list_feedback order by created_at desc limit 30) f join properties p on p.id=f.property_id), '[]'::jsonb))
  || jsonb_build_object('data_checks', coalesce((select jsonb_agg(jsonb_build_object('name', c.name, 'level', c.level, 'n', c.n, 'what', c.what, 'sample', c.sample)
       order by case c.level when 'stop' then 0 when 'fix' then 1 else 2 end, c.n desc, c.name)
     from data_checks c where c.run_on = (select max(run_on) from data_checks)), '[]'::jsonb),
     'data_checked_on', (select max(run_on) from data_checks))
  || list_safeguards() $function$;
