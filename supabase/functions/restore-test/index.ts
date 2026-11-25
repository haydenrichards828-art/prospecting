// Restore test (24 Nov). Takes the newest nightly backup, puts every table back into a scratch area (schema restore_test),
// checks each table came back with the right number of rows, and compares the rows with the live data, then deletes the scratch area.
// Nothing live is touched. Runs monthly by schedule and writes the result to run_log (job restore_test). Cron key only.
import { createClient } from "npm:@supabase/supabase-js@2";
import postgres from "npm:postgres@3.4.5";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });
const DIGNAM = `'{"agency_id":"00000000-0000-4000-8000-000000000001"}'::jsonb`;
// backup entries that are a slice of a table rather than a whole table
const VIRTUAL: Record<string, string> = {
  properties_contacts: "select id, owner_name, phone, owner2_name, phone2, contact_as_of, contact_locked, crm_flag from public.properties",
  messages_settings: "select prefs, done from public.ib_state",
};

Deno.serve(async (req) => {
  const { data: k } = await db.from("app_secrets").select("value").eq("name", "cron_key").maybeSingle();
  if (!k?.value || req.headers.get("x-cron-key") !== k.value) return json({ error: "Forbidden" }, 403);
  const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 1, prepare: false, idle_timeout: 5 });
  const report: Record<string, unknown>[] = [];
  let name = "";
  try {
    const { data: files, error: le } = await db.storage.from("backups").list("", { limit: 1000 });
    if (le) throw new Error(le.message);
    name = (files ?? []).map((f) => f.name).filter((n) => /^prospect-\d{4}-\d{2}-\d{2}\.json\.gz$/.test(n)).sort().pop() ?? "";
    if (!name) throw new Error("no backup files found");
    const { data: blob, error: de } = await db.storage.from("backups").download(name);
    if (de || !blob) throw new Error("could not download " + name + ": " + (de?.message ?? "empty"));
    const text = await new Response(blob.stream().pipeThrough(new DecompressionStream("gzip"))).text();
    const b = JSON.parse(text) as { made_at: string; counts: Record<string, number>; tables: Record<string, unknown[]> };

    await sql`drop schema if exists restore_test cascade`;
    await sql`create schema restore_test`;
    for (const [t, rows] of Object.entries(b.tables)) {
      const live = VIRTUAL[t] ? `(${VIRTUAL[t]}) l` : `public."${t}" l`;
      try {
        if (VIRTUAL[t]) await sql.unsafe(`create table restore_test."${t}" as ${VIRTUAL[t]} limit 0`);
        else await sql.unsafe(`create table restore_test."${t}" (like public."${t}")`);
        // Backups made before 26 Nov have no agency_id, so those rows are given Dignam's (a row's own agency_id always wins)
        await sql.unsafe(`insert into restore_test."${t}" select * from jsonb_populate_recordset(null::restore_test."${t}", (select coalesce(jsonb_agg(${DIGNAM} || r), '[]'::jsonb) from jsonb_array_elements($1::text::jsonb) r))`, [JSON.stringify(rows)]);
        const [{ n }] = await sql.unsafe(`select count(*)::int n from restore_test."${t}"`);
        // rows in the backup that are exactly the same in the live data today (anything changed since the backup will differ)
        const [{ same }] = await sql.unsafe(`select count(*)::int same from (select md5(to_jsonb(r)::text) h from restore_test."${t}" r intersect all select md5(to_jsonb(l)::text) from ${live}) x`);
        const [{ now }] = await sql.unsafe(`select count(*)::int now from ${live}`);
        report.push({ table: t, expected: b.counts[t] ?? rows.length, restored: n, identical_now: same, live_now: now, ok: n === (b.counts[t] ?? rows.length) });
      } catch (e) {
        report.push({ table: t, expected: b.counts[t] ?? rows.length, restored: 0, ok: false, error: (e as Error).message.slice(0, 200) });
      }
    }
    await sql`drop schema if exists restore_test cascade`;
    const bad = report.filter((r) => !r.ok);
    const total = report.reduce((a, r) => a + Number(r.restored || 0), 0);
    await db.from("run_log").insert({ job: "restore_test", ok: !bad.length,
      detail: `${name}: ${report.length} tables, ${total} rows restored${bad.length ? `; failed: ${bad.map((r) => r.table).join(", ")}` : ", all match their counts"}` });
    return json({ ok: !bad.length, name, made_at: b.made_at, report });
  } catch (e) {
    await sql`drop schema if exists restore_test cascade`.catch(() => {});
    await db.from("run_log").insert({ job: "restore_test", ok: false, detail: `${name}: ${(e as Error).message}`.slice(0, 300) });
    return json({ error: (e as Error).message, report }, 500);
  } finally { await sql.end({ timeout: 5 }); }
});
