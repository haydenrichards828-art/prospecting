# Prospect backups

Every night at about 2:30am Sydney time the `backup` server function saves everything typed into Prospect
to the private `backups` storage box in the Supabase project, as `prospect-YYYY-MM-DD.json.gz`.
The last 30 nights are kept. Sign in data and secret keys are never included.

What is in each file: calls, leads, lead notes, pipeline, reminders, texts and templates, settings,
Do Not Call, card drops, call sheets and their people, open home lists and enquiries, referrals and partners,
CRM notes, list feedback, exclusions, solicitor contacts, list versions, contact roles, deceased phones,
withdrawn listings, listings, and the owner names and phone numbers on every home.
Added 24 Nov: "no number" skips, Do Not Call Register results, probate notices, AgentBox withdrawn and Dignam rentals imports,
CRM events, the territory suburbs and suburb spellings, and the Messages settings (never the Mac address or password).
Added 26 Nov: the agency accounts tables (agencies, people, roles, suburbs, connections, audit log, and each agency's
own copy of owner names and numbers). Every row now carries an `agency_id`; Dignam is `00000000-0000-4000-8000-000000000001`.
Backups made before 26 Nov have no `agency_id`, so a restore gives those rows Dignam's (a row's own value always wins).

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

## Restore test

The `restore-test` server function (cron key only) takes the newest file, puts every table back into a scratch area
(schema `restore_test`), checks each table has the right number of rows, compares the rows with the live data, then
deletes the scratch area. Nothing live is touched. Result in `run_log` (job `restore_test`).
First run 24 Nov 2026: 39 tables, every one restored with the right count and matching the live data.
26 Nov 2026, after the agency accounts change: 46 tables, 51,977 rows, every one restored with the right count.
A monthly schedule for it (`monthly_restore_test`, 1st of the month about 2:50am) is waiting on approval.

## Off site copy in Google Drive

The `backup-offsite` server function copies the newest nightly file into a "Prospect backups" folder in Hayden's
Google Drive every night at about 3am Sydney time (2am in winter; schedule `nightly_backup_offsite`, 16:00 UTC),
and keeps the last 30 nights there. It uses the `drive.file` permission, so it can only see the folder and files it made.
Results go to `run_log` (job `backup_offsite`). Until Google is connected each run logs "skipped: Google Drive not connected yet".

Connecting (once): a Google OAuth client (Web application, published "In production" so the connection doesn't
expire after 7 days) with redirect URI `https://hywtghpfhhvbygunokca.supabase.co/functions/v1/backup-offsite`.
Its ID and secret go in the Edge Function secrets `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. Then open
`.../backup-offsite?connect=<code>`, where the code is the one time `google_setup_code` row in `app_secrets`
(ask Claude for a fresh one if it has expired), and allow access. The connection is stored as
`google_drive_refresh_token` and the setup code is deleted.

The monthly restore test schedule (`monthly_restore_test`) was added 26 Nov.
