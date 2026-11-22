# Prospect backups

Every night at about 2:30am Sydney time the `backup` server function saves everything typed into Prospect
to the private `backups` storage box in the Supabase project, as `prospect-YYYY-MM-DD.json.gz`.
The last 30 nights are kept. Sign in data and secret keys are never included.

What is in each file: calls, leads, lead notes, pipeline, reminders, texts and templates, settings,
Do Not Call, card drops, call sheets and their people, open home lists and enquiries, referrals and partners,
CRM notes, list feedback, exclusions, solicitor contacts, list versions, contact roles, deceased phones,
withdrawn listings, listings, and the owner names and phone numbers on every home.

## Getting a copy

Supabase dashboard, project Prospect, Storage, `backups`, pick a night, Download.
The file is gzipped JSON: `{ made_at, counts, tables: { calls: [...], leads: [...], ... } }`.

## Checking it ran

`select * from run_log where job = 'backup' order by created_at desc limit 5;`
A good night reads like `prospect-2026-11-22.json.gz: 33905 rows, 998 KB`.

## Restoring

Ask Claude with the file attached and say which table and which night. A restore is done table by table
(for example "put back the leads from Friday night"), always into a copy first so nothing current is
overwritten until the copy has been checked.
