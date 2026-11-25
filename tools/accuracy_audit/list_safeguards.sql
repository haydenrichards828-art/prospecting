CREATE OR REPLACE FUNCTION public.list_safeguards()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
 with called as (select distinct c.property_id from calls c where (c.created_at at time zone 'Australia/Sydney')::date = (now() at time zone 'Australia/Sydney')::date),
 today as (select (now() at time zone 'Australia/Sydney')::date d),
 g as (
  select 'Do Not Call numbers loaded' name, (select count(*) from do_not_call) + (select count(*) from dncr where registered) n, 500 need, 'numbers blocked from AgentBox Do Not Call, Do Not Contact and the register' what
  union all select 'Do Not Contact households blocked', (select count(*) from exclusions where source='agentbox_dnc'), 100, 'addresses where someone asked not to be contacted'
  union all select 'Contacts checked against the owner', (select count(*) from contact_roles), 1000, 'tenants, previous owners and unconfirmed contacts kept off'
  union all select 'Phones with a contact date', (select count(*) from properties where phone is not null and contact_as_of is not null), (select count(*) from properties where phone is not null), 'every number knows when it was recorded, so any later sale retires it'
  union all select 'Deceased owners'' phones known', (select count(*) from deceased_phones), 20, 'numbers of owners who have died'
  union all select 'Numbers on today''s list checked against the Do Not Call Register in the last 30 days',
     (select count(*) from daily_list dl join properties p on p.id = dl.property_id join dncr r on r.phone = p.phone
       where dl.list_date = (now() at time zone 'Australia/Sydney')::date and dl.list_type <> 'nophone' and not r.registered and r.washed_at > now() - interval '30 days'),
     (select count(*) from daily_list dl where dl.list_date = (now() at time zone 'Australia/Sydney')::date and dl.list_type <> 'nophone'),
     'the law allows calling a number only within 30 days of checking it'
  union all select 'Withdrawn listings with AgentBox proof', (select count(*) from withdrawn_listings w where w.kind='withdrawn' and w.event_date is not null), 50, 'sale listings taken down; rental ones are ignored'
 )
 select jsonb_build_object(
  'safeguards', (select jsonb_agg(jsonb_build_object('name', name, 'n', n, 'ok', n >= need, 'what', what)) from g),
  'rule_breakers_on_list', (select count(*) from list_audit((select d from today)) a where a.action='remove' and a.property_id not in (select property_id from called)),
  'list_size', (select count(*) from daily_list where list_date=(select d from today)))
$function$;
