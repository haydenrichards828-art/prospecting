# Accuracy audit, 26 Nov 2026

What was checked, what was found, and the database changes that go with it. Apply the SQL files in this order
(each one is a whole `create or replace`), once approved:

1. `01_data_fixes.sql`: backs up `sales` first, then removes 5 impossible sale dates, removes sales stored twice,
   merges homes stored twice (Mount St Thomas and Mount Saint Thomas, Crest and Crst), links government sales that match
   a home's address exactly, and brings each home's last sale up to date.
2. `02_bulk_and_guard.sql`: marks sales where one price covers several homes, and skips any new sale with an impossible date.
3. `score_properties_v5.sql`, `get_list.sql`, `call_exclusions.sql`, `list_safeguards.sql`: honest wording when no sale
   is on record, bulk prices never shown as a home's price, homes an agency website shows as sold (not yet in
   government records) kept off the list, and the Do Not Call Register check shown as a safeguard.
4. `data_check.sql` then `list_health.sql`: the nightly data check (cron `data_check`, 04:40 Sydney) and its section
   in Settings, List health.

The inbox function change (exact name matching for WhatsApp senders) is in `supabase/functions/inbox/index.ts`.
