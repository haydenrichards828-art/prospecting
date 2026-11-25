// Off site copy of the nightly backup (26 Nov). Copies the newest prospect-YYYY-MM-DD.json.gz from the private "backups"
// bucket into a "Prospect backups" folder in Hayden's Google Drive, and keeps the last 30 nights there.
// Started by the nightly_backup_offsite schedule (cron key) about 30 minutes after the nightly backup.
//
// One time setup (see tools/BACKUPS.md):
//   1. A Google OAuth client (Web application) whose redirect URI is this function's URL exactly.
//      Its ID and secret go in the GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET function secrets
//      (or app_secrets rows google_client_id / google_client_secret).
//   2. Open  <this URL>?connect=<setup code>  (the code is a one time row in app_secrets, google_setup_code),
//      sign in to Google and allow. The connection is stored as google_drive_refresh_token, the code is deleted.
// Scope is drive.file only: Prospect can see and change only the files and folder it made itself, nothing else in Drive.
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
// must match the redirect URI in the Google OAuth client exactly
const SELF = "https://hywtghpfhhvbygunokca.supabase.co/functions/v1/backup-offsite";
const SCOPE = "https://www.googleapis.com/auth/drive.file";
const FOLDER = "Prospect backups";
const KEEP = 30;
const NAME_RE = /^prospect-\d{4}-\d{2}-\d{2}\.json\.gz$/;
const text = (b: string, s = 200) => new Response(b, { status: s, headers: { "Content-Type": "text/plain; charset=utf-8" } });
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json" } });

async function secret(name: string): Promise<string | null> {
  const { data } = await db.from("app_secrets").select("value").eq("name", name).maybeSingle();
  return data?.value ?? null;
}
async function setSecret(name: string, value: string) {
  const { error } = await db.from("app_secrets").upsert({ name, value }, { onConflict: "name" });
  if (error) throw new Error("could not save " + name + ": " + error.message);
}
async function dropSecret(name: string) { await db.from("app_secrets").delete().eq("name", name); }
async function client() {
  const id = Deno.env.get("GOOGLE_CLIENT_ID") || await secret("google_client_id");
  const sec = Deno.env.get("GOOGLE_CLIENT_SECRET") || await secret("google_client_secret");
  return id && sec ? { id, sec } : null;
}
async function log(ok: boolean, detail: string) { await db.from("run_log").insert({ job: "backup_offsite", ok, detail: detail.slice(0, 300) }); }

async function accessToken(): Promise<string> {
  const c = await client();
  const rt = await secret("google_drive_refresh_token");
  if (!c || !rt) throw new Error("not_connected");
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: c.id, client_secret: c.sec, refresh_token: rt, grant_type: "refresh_token" }) });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error(j.error === "invalid_grant" ? "Google connection expired or was removed: reconnect it" : `token refresh failed: ${j.error ?? r.status}`);
  return j.access_token;
}

async function drive(tok: string, path: string, init: RequestInit = {}) {
  const r = await fetch(`https://www.googleapis.com${path}`, { ...init, headers: { Authorization: `Bearer ${tok}`, ...(init.headers ?? {}) } });
  if (!r.ok && r.status !== 404) throw new Error(`Drive ${init.method ?? "GET"} ${path.split("?")[0]}: ${r.status} ${(await r.text()).slice(0, 120)}`);
  return r;
}

async function folderId(tok: string, fresh = false): Promise<string> {
  const saved = fresh ? null : await secret("google_drive_folder_id");
  if (saved) {
    const r = await drive(tok, `/drive/v3/files/${saved}?fields=id,trashed`);
    if (r.ok) { const f = await r.json(); if (!f.trashed) return saved; }
  }
  const r = await drive(tok, "/drive/v3/files?fields=id", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: FOLDER, mimeType: "application/vnd.google-apps.folder" }) });
  const { id } = await r.json();
  await setSecret("google_drive_folder_id", id);
  return id;
}

async function copyNewest(): Promise<string> {
  const { data: files, error } = await db.storage.from("backups").list("", { limit: 1000 });
  if (error) throw new Error(error.message);
  const name = (files ?? []).map((f) => f.name).filter((n) => NAME_RE.test(n)).sort().pop();
  if (!name) throw new Error("no backup files in storage");
  const { data: blob, error: de } = await db.storage.from("backups").download(name);
  if (de || !blob) throw new Error("could not download " + name);
  const bytes = new Uint8Array(await blob.arrayBuffer());

  const tok = await accessToken();
  const folder = await folderId(tok);
  const q = encodeURIComponent(`'${folder}' in parents and trashed = false`);
  const listed = await (await drive(tok, `/drive/v3/files?q=${q}&fields=files(id,name)&pageSize=1000`)).json();
  const there = (listed.files ?? []) as { id: string; name: string }[];
  const same = there.find((f) => f.name === name);
  if (same) {
    await drive(tok, `/upload/drive/v3/files/${same.id}?uploadType=media`, { method: "PATCH", headers: { "Content-Type": "application/gzip" }, body: bytes });
  } else {
    const b = "prospect" + crypto.randomUUID().replaceAll("-", "");
    const body = new Blob([
      `--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ name, parents: [folder] })}\r\n--${b}\r\nContent-Type: application/gzip\r\n\r\n`,
      bytes, `\r\n--${b}--`]);
    const r = await drive(tok, "/upload/drive/v3/files?uploadType=multipart&fields=id", { method: "POST", headers: { "Content-Type": `multipart/related; boundary=${b}` }, body });
    if (r.status === 404) throw new Error("Drive folder missing; it will be made again next run");
  }
  // keep the newest 30 nights in Drive
  const old = there.filter((f) => NAME_RE.test(f.name) && f.name !== name).sort((a, z) => z.name.localeCompare(a.name)).slice(KEEP - 1);
  for (const f of old) await drive(tok, `/drive/v3/files/${f.id}`, { method: "DELETE" });
  const kb = Math.round(bytes.length / 1024);
  await log(true, `${name} copied to Google Drive (${kb} KB)${old.length ? `, removed ${old.length} older` : ""}`);
  return `${name} (${kb} KB)`;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  try {
    // Step 1 of connecting: the one time setup link sends Hayden to Google
    const connect = url.searchParams.get("connect");
    if (connect !== null) {
      const want = await secret("google_setup_code");
      const [code, until] = (want ?? "").split("|");
      if (!code || connect !== code || (until && Date.now() > Date.parse(until))) return text("This setup link has expired or was already used. Ask Claude for a new one.", 403);
      const c = await client();
      if (!c) return text("Almost there: the Google client ID and secret haven't been added yet (step 3 of the setup).", 400);
      const state = crypto.randomUUID();
      await setSecret("google_oauth_state", `${state}|${new Date(Date.now() + 15 * 60e3).toISOString()}`);
      const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      auth.search = new URLSearchParams({ client_id: c.id, redirect_uri: SELF, response_type: "code", scope: SCOPE, access_type: "offline", prompt: "consent", state }).toString();
      return Response.redirect(auth.toString(), 302);
    }
    // Step 2: Google sends Hayden back here after he allows access
    if (url.searchParams.has("state")) {
      const [st, until] = ((await secret("google_oauth_state")) ?? "").split("|");
      if (!st || url.searchParams.get("state") !== st || Date.now() > Date.parse(until)) return text("That sign in didn't match or took too long. Open the setup link again.", 403);
      await dropSecret("google_oauth_state");
      if (url.searchParams.get("error")) return text("Google access wasn't allowed, so nothing was connected. Open the setup link again to retry.", 400);
      const c = await client();
      const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ code: url.searchParams.get("code") ?? "", client_id: c!.id, client_secret: c!.sec, redirect_uri: SELF, grant_type: "authorization_code" }) });
      const j = await r.json();
      if (!r.ok || !j.refresh_token) return text(`Google didn't return a lasting connection (${j.error ?? "no refresh token"}). Open the setup link again.`, 400);
      await setSecret("google_drive_refresh_token", j.refresh_token);
      await dropSecret("google_setup_code");
      await log(true, "connected to Google Drive");
      let first = "";
      try { first = await copyNewest(); } catch (e) { first = "first copy failed: " + (e as Error).message; }
      return text(`Connected. Every night Prospect's backup will be copied to the "${FOLDER}" folder in your Google Drive, keeping the last ${KEEP} nights.\n\nFirst copy: ${first}\n\nYou can close this page.`);
    }
    // Nightly run from the schedule
    const key = await secret("cron_key");
    if (!key || req.headers.get("x-cron-key") !== key) return json({ error: "Forbidden" }, 403);
    try {
      return json({ ok: true, copied: await copyNewest() });
    } catch (e) {
      const m = (e as Error).message;
      if (m === "not_connected") { await log(true, "skipped: Google Drive not connected yet"); return json({ ok: true, skipped: "not connected" }); }
      throw e;
    }
  } catch (e) {
    await log(false, (e as Error).message);
    return json({ error: (e as Error).message }, 500);
  }
});
