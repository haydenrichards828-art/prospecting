// Nightly backup of everything typed into Prospect, as one gzipped JSON file per night in the private "backups" bucket.
// Keeps 30 days. Sign in data and secret keys are never included. Started by the nightly_backup schedule with the cron key.
// 24 Nov: also keeps "no number" skips, Do Not Call Register results, probate notices, AgentBox imports, CRM events,
// the territory suburb list and suburb spellings, and the Messages settings (never the Mac password).
// A restore test (restore-test function) puts the newest file back into a scratch area once a month to prove it works.
import { createClient } from "npm:@supabase/supabase-js@2";
import postgres from "npm:postgres@3.4.5";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const TABLES = ["calls", "leads", "lead_notes", "pipeline", "reminders", "messages", "templates", "settings", "do_not_call", "card_drops",
  "campaigns", "campaign_items", "enquiry_lists", "enquiry_contacts", "referrals", "referral_partners", "crm_notes", "list_feedback",
  "exclusions", "solicitor_contacts", "sends", "work_events", "algo_versions", "contact_roles", "contact_asof", "deceased_phones", "withdrawn_listings", "listings",
  "nophone_skips", "dncr", "probate_notices", "agentbox_withdrawn", "dignam_rentals", "crm_events", "territory_suburbs", "suburb_alias", "patch_suburbs"];
const KEEP_DAYS = 30;
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  const { data: k } = await db.from("app_secrets").select("value").eq("name", "cron_key").maybeSingle();
  if (!k?.value || req.headers.get("x-cron-key") !== k.value) return json({ error: "Forbidden" }, 403);
  const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 1, prepare: false, idle_timeout: 5 });
  try {
    const tables: Record<string, unknown> = {}, counts: Record<string, number> = {};
    for (const t of TABLES) {
      const [{ exists }] = await sql`select to_regclass(${"public." + t}::text) is not null as exists`;
      if (!exists) continue;
      const [{ rows }] = await sql.unsafe(`select coalesce(json_agg(t), '[]'::json) as rows from public."${t}" t`);
      tables[t] = rows; counts[t] = (rows as unknown[]).length;
    }
    // names and numbers on every home (edited by hand in the app, so worth keeping)
    const [{ rows: pc }] = await sql`select coalesce(json_agg(x), '[]'::json) as rows from (select id, owner_name, phone, owner2_name, phone2, contact_as_of, contact_locked, crm_flag from properties where owner_name is not null or phone is not null) x`;
    tables.properties_contacts = pc; counts.properties_contacts = (pc as unknown[]).length;
    // Messages settings only: delivery times, group rules, Mark done. Never the Mac address or password.
    const [{ rows: ms }] = await sql`select coalesce(json_agg(x), '[]'::json) as rows from (select prefs, done from ib_state) x`.catch(() => [{ rows: [] }]);
    tables.messages_settings = ms; counts.messages_settings = (ms as unknown[]).length;
    const body = JSON.stringify({ made_at: new Date().toISOString(), app: "Prospect", counts, tables });
    const gz = new Uint8Array(await new Response(new Blob([body]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer());
    const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Sydney" }).format(new Date());
    const name = `prospect-${day}.json.gz`;
    const { error } = await db.storage.from("backups").upload(name, gz, { contentType: "application/gzip", upsert: true });
    if (error) throw new Error(error.message);
    // keep 30 days
    const { data: files } = await db.storage.from("backups").list("", { limit: 1000 });
    const cutoff = new Date(Date.now() - KEEP_DAYS * 86400e3).toISOString().slice(0, 10);
    const old = (files ?? []).map((f) => f.name).filter((n) => /^prospect-\d{4}-\d{2}-\d{2}\.json\.gz$/.test(n) && n.slice(9, 19) < cutoff);
    if (old.length) await db.storage.from("backups").remove(old);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    await db.from("run_log").insert({ job: "backup", ok: true, detail: `${name}: ${total} rows, ${Math.round(gz.length / 1024)} KB` });
    return json({ ok: true, name, kb: Math.round(gz.length / 1024), counts, removed: old.length });
  } catch (e) {
    await db.from("run_log").insert({ job: "backup", ok: false, detail: (e as Error).message.slice(0, 300) });
    return json({ error: (e as Error).message }, 500);
  } finally { await sql.end({ timeout: 5 }); }
});
