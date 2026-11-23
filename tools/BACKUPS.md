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
A monthly schedule for it (`monthly_restore_test`, 1st of the month about 2:50am) is waiting on approval.

Both backups and the test live in the same Supabase project. If the project itself were lost, so would the backups:
an off site copy (for example a weekly copy to Google Drive or a private GitHub repo) would cover that.
