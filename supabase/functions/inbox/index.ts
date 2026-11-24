// Messages inbox (24 Nov). BlueBubbles on Marlowe's Mac posts every new message here (webhook, ?hook=<key>),
// so the app reads chats from the database: quick on any device, set up once, and the Mac password never leaves the server.
// Sending goes through here too. Texts with a lead count as contact that day (they are not copied into notes). The Mac's link can change after a
// restart: BlueBubbles sends a new-server event and the stored link follows it. Two weeks of messages are kept.
// App actions need a signed in session (x-session): load, send, setup, disconnect, sync, prefs, done, phone_setup, phone_off, phone_sent.
// Without a Mac: her phone posts what it receives to ?p=<key> (see "her phone" below).
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, x-session", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Max-Age": "7200" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
const seen = new Map<string, number>();
const HOOK_EVENTS = ["new-message", "updated-message", "new-server"];
type St = { phone_key?: string | null; phone_on?: boolean | null; phone_kind?: string | null; phone_last?: string | null; phone_dropped?: number | null; synced_at?: string | null; prefs: Record<string, unknown>; done: Record<string, number>; bb_url: string | null; bb_pass: string | null; hook_key: string | null; last_hook: string | null; hook_ok: boolean | null };
type Lead = { id: number; name: string; phone: string };

const digits = (p: unknown) => String(p ?? "").replace(/\D/g, "").replace(/^61(?=4)/, "0").replace(/^61/, "0");
async function state(): Promise<St> { const { data, error } = await db.from("ib_state").select("*").eq("id", 1).single(); if (error) throw new Error(error.message); return data as St; }
async function setState(p: Partial<St> & Record<string, unknown>) { const { error } = await db.from("ib_state").update(p).eq("id", 1); if (error) throw new Error(error.message); }

// ---------- talking to the Mac ----------
async function bb(st: Pick<St, "bb_url" | "bb_pass">, path: string, body?: unknown, ms = 8000) {
  if (!st.bb_url) throw new Error("Your Mac isn't connected yet");
  const u = st.bb_url.replace(/\/$/, "") + "/api/v1/" + path + (path.includes("?") ? "&" : "?") + "password=" + encodeURIComponent(st.bb_pass ?? "");
  let r: Response;
  try { r = await fetch(u, { method: body ? "POST" : "GET", headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(ms) }); }
  catch { throw new Error("Can't reach your Mac. Check it's on and BlueBubbles is open."); }
  const j = await r.json().catch(() => ({})) as { data?: unknown; message?: string; error?: { message?: string } };
  if (r.status === 401) throw new Error("Your Mac said the password is wrong");
  if (!r.ok) throw new Error(j.error?.message || j.message || "Your Mac said no (" + r.status + ")");
  return j.data;
}

// ---------- storing ----------
type BBChat = { guid: string; displayName?: string; chatIdentifier?: string; participants?: { address: string }[]; style?: number };
type BBMsg = { guid: string; text?: string | null; isFromMe?: boolean; dateCreated?: number; handle?: { address?: string } | null; threadOriginatorGuid?: string | null; attachments?: unknown[]; chats?: BBChat[]; associatedMessageGuid?: string | null; associatedMessageType?: string | number | null };

async function leads(): Promise<Lead[]> { const { data } = await db.from("leads").select("id,name,phone").not("phone", "is", null); return (data ?? []) as Lead[]; }
const leadByPhone = (ls: Lead[], addr: string) => { const d = digits(addr); return d.length >= 8 ? ls.find((l) => digits(l.phone) === d) ?? null : null; };
const isGroup = (c: BBChat) => (c.participants?.length ?? 0) > 1 || c.style === 43 || /;\+;/.test(c.guid);

async function saveChat(c: BBChat, lastAt?: number) {
  const row: Record<string, unknown> = { guid: c.guid, is_group: isGroup(c), service: /^SMS/i.test(c.guid) ? "SMS" : /^RCS/i.test(c.guid) ? "RCS" : "iMessage", updated_at: new Date().toISOString() };
  if (c.displayName) row.name = c.displayName;
  if (c.participants?.length) row.members = c.participants.map((p) => p.address);
  if (lastAt) row.last_at = new Date(lastAt).toISOString();
  const { error } = await db.from("ib_chats").upsert(row, { onConflict: "guid" }); if (error) throw new Error(error.message);
}
// tapbacks and edits come through as their own messages; only real messages are kept
const real = (m: BBMsg) => !m.associatedMessageGuid && !(m.associatedMessageType && String(m.associatedMessageType) !== "0");
function msgRow(m: BBMsg, chat: string, leadId: number | null) {
  return { guid: m.guid, chat_guid: chat, from_me: !!m.isFromMe, handle: m.handle?.address ?? null, body: m.text || (m.attachments?.length ? "Sent a photo or file" : ""),
    at: new Date(m.dateCreated ?? Date.now()).toISOString(), reply_to: m.threadOriginatorGuid ?? null, attach: !!m.attachments?.length, lead_id: leadId };
}
// a text to or from a lead counts as contact today. Texts stay in Messages and never go into the lead's notes.
async function toLead(leadId: number) {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  await db.from("leads").update({ last_contact: today }).eq("id", leadId);
}

// one message from the webhook or from sending
async function ingest(st: St, m: BBMsg, ls: Lead[], notes = true) {
  if (!m?.guid || !real(m)) return;
  let c = m.chats?.[0]; if (!c?.guid) return;
  const { data: known } = await db.from("ib_chats").select("guid,members,is_group,name").eq("guid", c.guid).maybeSingle();
  if (!known || !(known.members as unknown[])?.length) { try { const full = await bb(st, `chat/${encodeURIComponent(c.guid)}?with=participants`, undefined, 5000) as BBChat; if (full?.guid) c = { ...c, ...full }; } catch { /* store what we have */ } }
  await saveChat(c, m.dateCreated);
  const members = c.participants?.map((p) => p.address) ?? (known?.members as string[] | undefined) ?? [];
  const group = c.participants ? isGroup(c) : !!known?.is_group;
  const lead = group ? null : leadByPhone(ls, members[0] ?? m.handle?.address ?? "");
  const { data: had } = await db.from("ib_msgs").select("guid").eq("guid", m.guid).maybeSingle();
  const { error } = await db.from("ib_msgs").upsert(msgRow(m, c.guid, lead?.id ?? null), { onConflict: "guid" }); if (error) throw new Error(error.message);
  if (lead && notes && !had) await toLead(lead.id).catch(() => {});
  // Spam Act: someone replying STOP is opted out. They go on the do not call list, which also keeps them off call lists.
  if (!m.isFromMe && !group && !had && /^\s*(stop|unsubscribe|opt ?out|remove me)\b/i.test(m.text ?? "")) {
    const ph = digits(members[0] ?? m.handle?.address ?? "");
    if (ph.length >= 8) await db.from("do_not_call").upsert({ phone: ph, reason: "Replied STOP to a text" }, { onConflict: "phone", ignoreDuplicates: true });
  }
}

// names from the Contacts app on her Mac (BlueBubbles only gives numbers for one to one chats)
const key = (a: unknown) => { const t = String(a ?? "").trim(); return t.includes("@") ? t.toLowerCase() : digits(t); };
async function contacts(st: Pick<St, "bb_url" | "bb_pass">) {
  const list = (await bb(st, "contact", undefined, 15000).catch(() => null)) as { displayName?: string; firstName?: string; lastName?: string; phoneNumbers?: { address: string }[]; emails?: { address: string }[] }[] | null;
  if (!Array.isArray(list)) return 0;
  const rows = new Map<string, { addr: string; name: string }>();
  for (const c of list) { const name = (c.displayName || [c.firstName, c.lastName].filter(Boolean).join(" ")).trim(); if (!name) continue;
    for (const a of [...(c.phoneNumbers ?? []), ...(c.emails ?? [])]) { const k = key(a.address); if (k.length >= 5) rows.set(k, { addr: k, name: name.slice(0, 80) }); } }
  const all = [...rows.values()];
  for (let i = 0; i < all.length; i += 500) await db.from("ib_contacts").upsert(all.slice(i, i + 500).map((r) => ({ ...r, updated_at: new Date().toISOString() })), { onConflict: "addr" });
  return all.length;
}

// pull the last week from the Mac (after setup, or when the webhook has gone quiet)
async function sync(st: St) {
  await setState({ synced_at: new Date().toISOString() });
  const since = Date.now() - 7 * 864e5;
  await contacts(st).catch(() => 0);
  const chats = (await bb(st, "chat/query", { limit: 40, offset: 0, with: ["participants", "lastMessage"], sort: "lastmessage" }, 12000) ?? []) as (BBChat & { lastMessage?: BBMsg })[];
  const ls = await leads(); let n = 0;
  const recent = chats.filter((c) => !c.lastMessage?.dateCreated || c.lastMessage.dateCreated > since);
  for (let i = 0; i < recent.length; i += 8) {
    await Promise.all(recent.slice(i, i + 8).map(async (c) => {
      const ms = (await bb(st, "message/query", { chatGuid: c.guid, limit: 50, offset: 0, with: ["handle"], sort: "DESC", after: since }, 8000).catch(() => [])) as BBMsg[] ?? [];
      const keep = ms.filter(real); await saveChat(c, keep[0]?.dateCreated ?? c.lastMessage?.dateCreated);
      const lead = isGroup(c) ? null : leadByPhone(ls, c.participants?.[0]?.address ?? "");
      if (keep.length) { const { error } = await db.from("ib_msgs").upsert(keep.map((m) => msgRow(m, c.guid, lead?.id ?? null)), { onConflict: "guid" }); if (!error) n += keep.length; }
    }));
  }
  return { chats: recent.length, messages: n };
}

// ---------- what the app reads ----------
async function load(st: St) {
  const since = new Date(Date.now() - 7 * 864e5).toISOString();
  const [{ data: chats }, { data: msgs }, ls] = await Promise.all([
    db.from("ib_chats").select("guid,name,is_group,members,service,last_at").gte("last_at", since).order("last_at", { ascending: false }).limit(60),
    db.from("ib_msgs").select("guid,chat_guid,from_me,handle,body,at,reply_to,lead_id").gte("at", since).order("at", { ascending: false }).limit(2000),
    leads()]);
  const out = (chats ?? []).map((c) => {
    const lead = c.is_group ? null : leadByPhone(ls, (c.members as string[])[0] ?? "");
    return { ...c, lead_id: lead?.id ?? null, lead_name: lead?.name ?? null };
  });
  const addrs = new Set<string>(); (chats ?? []).forEach((c) => (c.members as string[] ?? []).forEach((a) => addrs.add(key(a)))); (msgs ?? []).forEach((m) => m.handle && addrs.add(key(m.handle)));
  const names: Record<string, string> = {};
  const ks = [...addrs].filter((k) => k.length >= 5);
  for (let i = 0; i < ks.length; i += 300) { const { data } = await db.from("ib_contacts").select("addr,name").in("addr", ks.slice(i, i + 300)); (data ?? []).forEach((r) => names[r.addr] = r.name); }
  const quiet = !!st.bb_url && (st.last_hook ? Date.now() - Date.parse(st.last_hook) > 6 * 3600_000 : true);
  const hook_url = st.bb_url && st.hook_ok === false && st.hook_key ? `${Deno.env.get("SUPABASE_URL")}/functions/v1/inbox?hook=${st.hook_key}` : null;
  const phone = st.phone_on ? { kind: st.phone_kind, last: st.phone_last ?? null, dropped: st.phone_dropped ?? 0, url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/inbox?p=${st.phone_key}` } : null;
  return { connected: !!st.bb_url || !!st.phone_on, mode: st.bb_url ? "mac" : st.phone_on ? "phone" : null, phone, hook_url, synced_at: st.synced_at ?? null, hook_ok: st.hook_ok, last_hook: st.last_hook, quiet, prefs: st.prefs, done: st.done, names, chats: out, msgs: msgs ?? [] };
}

async function setup(b: { url?: string; pass?: string }) {
  const url = String(b.url ?? "").trim().replace(/\/+$/, ""), pass = String(b.pass ?? "");
  if (!/^https:\/\/[^\s]+$/i.test(url)) throw new Error("The address should start with https://");
  if (!pass) throw new Error("Add the password you set in BlueBubbles");
  const st0 = await state(), tmp = { bb_url: url, bb_pass: pass };
  await bb(tmp, "server/info");
  const hk = st0.hook_key ?? crypto.randomUUID().replace(/-/g, "");
  const fnUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/inbox?hook=${hk}`;
  let hook_ok = false;
  try {
    const list = (await bb(tmp, "webhook").catch(() => [])) as { id: number; url: string }[] ?? [];
    if (!list.some((w) => w.url === fnUrl)) await bb(tmp, "webhook", { url: fnUrl, events: HOOK_EVENTS });
    hook_ok = true;
  } catch { hook_ok = false; }
  await setState({ bb_url: url, bb_pass: pass, hook_key: hk, url_at: new Date().toISOString(), hook_ok });
  let synced = null; try { synced = await sync({ ...st0, ...tmp, hook_key: hk }); } catch { /* it fills in as messages arrive */ }
  return { ok: true, hook_ok, hook_url: hook_ok ? null : fnUrl, synced };
}


// ---------- her phone, without a Mac (24 Nov) ----------
// iPhone: a Shortcuts automation posts each message she receives to ?p=<key>. Android: a forwarding app posts new texts and
// WhatsApp notifications the same way. Only messages from people in Prospect are kept (a lead, an owner on the call list,
// or someone she has messaged from Prospect). Everything else is dropped on arrival and never stored.
function flat(o: unknown, pre = "", out: [string, string][] = []): [string, string][] {
  if (o && typeof o === "object") { for (const [k, v] of Object.entries(o as Record<string, unknown>)) flat(v, pre ? pre + "." + k : k, out); }
  else if (o != null && (typeof o === "string" || typeof o === "number")) out.push([pre.toLowerCase(), String(o)]);
  return out; }
const pickKey = (f: [string, string][], re: RegExp, not?: RegExp) => f.find(([k, v]) => re.test(k) && (!not || !not.test(k)) && v.trim())?.[1]?.trim() ?? "";
async function phoneParse(req: Request) {
  const raw = await req.text(); let o: unknown = null;
  try { o = JSON.parse(raw); } catch { const u = new URLSearchParams(raw); o = u.toString() && [...u.keys()].length ? Object.fromEntries(u) : { text: raw }; }
  const f = flat(o);
  const app = pickKey(f, /(^|\.)(package|packagename|package_name|app|application|source|appname|app_name)$/);
  const text = pickKey(f, /(^|\.)(text|body|message|content|msg|bigtext|big_text)$/, /title|sender|from/);
  const from = pickKey(f, /(^|\.)(sender|from|address|phone|number|originatingaddress|origin|contact)$/) || pickKey(f, /(^|\.)(title|name)$/);
  return { app, text, from };
}
async function sha(s: string) { const b = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("").slice(0, 24); }
// who this is, if they belong in Prospect
async function whoPhone(from: string): Promise<{ guid: string; lead: number | null; name: string | null; phone: string | null } | null> {
  const d = digits(from);
  if (d.length >= 8 && !/[a-z]/i.test(from.replace(/^\+?[\d\s()-]+$/, ""))) {
    const ls = await leads(), l = ls.find((x) => digits(x.phone) === d);
    if (l) return { guid: "ph:" + d, lead: l.id, name: l.name, phone: d };
    const { data: had } = await db.from("ib_chats").select("guid,name").eq("guid", "ph:" + d).maybeSingle();
    if (had) return { guid: "ph:" + d, lead: null, name: had.name ?? null, phone: d };
    const { data: pr } = await db.from("properties").select("id,owner_name").ilike("phone", "%" + d.slice(-9) + "%").limit(1);
    if (pr?.length) return { guid: "ph:" + d, lead: null, name: (pr[0].owner_name as string) ?? null, phone: d };
    return null;
  }
  // a saved contact name (WhatsApp on Android shows names, not numbers)
  const n = from.toLowerCase().replace(/\s+/g, " ").trim(); if (n.length < 3) return null;
  const { data: ld } = await db.from("leads").select("id,name,phone").not("name", "is", null);
  const l = (ld ?? []).find((x) => { const m = String(x.name).toLowerCase().replace(/\s+/g, " ").trim(); return m === n || (m.split(" ").length > 1 && n.includes(m)) || (n.split(" ").length > 1 && m.includes(n)); });
  if (l) { const pd = digits(l.phone); return { guid: pd.length >= 8 ? "ph:" + pd : "ph:n:" + n, lead: l.id, name: l.name, phone: pd || null }; }
  const { data: had } = await db.from("ib_chats").select("guid,name").eq("guid", "ph:n:" + n).maybeSingle();
  return had ? { guid: had.guid, lead: null, name: had.name ?? from, phone: null } : null;
}
async function phoneIn(st: St, req: Request) {
  const { app, text, from } = await phoneParse(req); const now = new Date().toISOString();
  if (!text || !from) return { ok: true, kept: false, why: "nothing to read" };
  const wa = /whatsapp/i.test(app), sms = /sms|mms|messag|telephony|iphone|shortcut/i.test(app) || !app;
  if (!wa && !sms) return { ok: true, kept: false, why: "not a messaging app" };
  if (wa && /:/.test(from) && /\(\d+ messages\)|@/.test(from + text)) return { ok: true, kept: false, why: "group" };
  const who = await whoPhone(from);
  if (!who){ await setState({ phone_last: now, phone_dropped: (st.phone_dropped ?? 0) + 1 }); return { ok: true, kept: false }; }
  const guid = "ph:" + await sha(who.guid + "|" + text + "|" + now.slice(0, 15));
  const { data: had } = await db.from("ib_msgs").select("guid").eq("guid", guid).maybeSingle();
  await db.from("ib_chats").upsert({ guid: who.guid, is_group: false, service: wa ? "WhatsApp" : "Text", name: who.name, members: who.phone ? [who.phone] : [], last_at: now, updated_at: now }, { onConflict: "guid" });
  await db.from("ib_msgs").upsert({ guid, chat_guid: who.guid, from_me: false, handle: who.phone ?? from, body: text.slice(0, 4000), at: now, reply_to: null, attach: false, lead_id: who.lead }, { onConflict: "guid" });
  await setState({ phone_last: now });
  if (!had && who.lead) await toLead(who.lead).catch(() => {});
  if (!had && who.phone && /^\s*(stop|unsubscribe|opt ?out|remove me)\b/i.test(text)) await db.from("do_not_call").upsert({ phone: who.phone, reason: "Replied STOP to a message" }, { onConflict: "phone", ignoreDuplicates: true });
  return { ok: true, kept: true };
}
// a message she sent from Prospect with one tap (her phone sent it), so the conversation reads both ways
async function phoneSent(b: Record<string, unknown>) {
  const d = digits(b.phone), text = String(b.text ?? "").trim(); if (d.length < 8 || !text) return { ok: true };
  const ls = await leads(), l = ls.find((x) => digits(x.phone) === d), now = new Date().toISOString(), wa = b.channel === "whatsapp";
  await db.from("ib_chats").upsert({ guid: "ph:" + d, is_group: false, service: wa ? "WhatsApp" : "Text", name: (b.name as string) || l?.name || null, members: [d], last_at: now, updated_at: now }, { onConflict: "guid" });
  await db.from("ib_msgs").insert({ guid: "ph:" + await sha("me|" + d + "|" + text + "|" + now), chat_guid: "ph:" + d, from_me: true, handle: d, body: text.slice(0, 4000), at: now, reply_to: null, attach: false, lead_id: l?.id ?? null });
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const q = new URL(req.url).searchParams, hook = q.get("hook"), pk = q.get("p") || (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "") || null;
    // ---------- her phone (iPhone Shortcuts or an Android forwarding app) ----------
    if (q.get("p") || (pk && !req.headers.get("x-session") && !hook)) {
      const st = await state();
      if (!st.phone_on || !st.phone_key || pk !== st.phone_key) return json({ error: "No" }, 403);
      return json(await phoneIn(st, req));
    }
    // ---------- BlueBubbles webhook ----------
    if (hook) {
      const st = await state();
      if (!st.hook_key || hook !== st.hook_key || !st.bb_url) return json({ error: "No" }, 403);
      const ev = await req.json().catch(() => ({})) as { type?: string; data?: unknown };
      const now = new Date().toISOString();
      if (ev.type === "new-server") {
        const u = typeof ev.data === "string" ? ev.data : (ev.data as { url?: string; server_url?: string })?.url ?? (ev.data as { server_url?: string })?.server_url;
        if (u && /^https?:\/\//.test(u)) await setState({ bb_url: u.replace(/\/+$/, ""), url_at: now, last_hook: now, hook_ok: true });
        return json({ ok: true });
      }
      await setState({ last_hook: now, hook_ok: true });
      if (ev.type === "new-message" || ev.type === "updated-message") await ingest(st, ev.data as BBMsg, await leads(), ev.type === "new-message");
      return json({ ok: true });
    }
    // ---------- the app ----------
    const b = await req.json().catch(() => ({})) as Record<string, unknown>;
    const token = req.headers.get("x-session") ?? "";
    if (!token) return json({ error: "Not signed in" }, 401);
    if (!((seen.get(token) ?? 0) > Date.now())) {
      const { data, error } = await db.rpc("auth_check", { p_token: token });
      if (error || !data) return json({ error: "Not signed in" }, 401);
      seen.set(token, Date.now() + 60_000); if (seen.size > 50) seen.clear();
    }
    const st = await state();
    switch (b.action) {
      case "load": return json(await load(st));
      case "send": {
        const chat = String(b.chat ?? ""), text = String(b.text ?? "").trim();
        if (!chat || !text) return json({ error: "Write a message first" }, 400);
        if (text.length > 2000) return json({ error: "That message is too long" }, 400);
        const sent = await bb(st, "message/text", { chatGuid: chat, tempGuid: "p" + crypto.randomUUID(), message: text, method: "apple-script" }, 20000) as BBMsg;
        if (sent?.guid) await ingest(st, { ...sent, isFromMe: true, chats: sent.chats?.length ? sent.chats : [{ guid: chat }] }, await leads());
        return json({ ok: true, guid: sent?.guid ?? null, at: sent?.dateCreated ?? Date.now() });
      }
      case "setup": return json(await setup(b as { url?: string; pass?: string }));
      case "phone_setup": {
        const kind = b.kind === "android" ? "android" : "iphone", key = st.phone_key ?? crypto.randomUUID().replace(/-/g, "");
        await setState({ phone_key: key, phone_on: true, phone_kind: kind });
        return json({ ok: true, url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/inbox?p=${key}`, key });
      }
      case "phone_off": { await setState({ phone_on: false, phone_key: null, phone_last: null }); return json({ ok: true }); }
      case "phone_sent": return json(await phoneSent(b));
      case "disconnect": {
        // disconnecting also removes the copies of her messages and contact names
        await setState({ bb_url: null, bb_pass: null, hook_ok: null, hook_key: null, synced_at: null, last_hook: null });
        await db.from("ib_msgs").delete().neq("guid", ""); await db.from("ib_chats").delete().neq("guid", ""); await db.from("ib_contacts").delete().neq("addr", "");
        return json({ ok: true });
      }
      case "sync": {
        if (!st.bb_url) return json({ ok: true, skipped: true });
        if (st.synced_at && Date.now() - Date.parse(st.synced_at) < 10 * 60e3) return json({ ok: true, skipped: true });
        return json(await sync(st));
      }
      case "prefs": {
        const p = (b.prefs ?? {}) as Record<string, unknown>; delete p.bbUrl; delete p.bbPass;
        if (JSON.stringify(p).length > 20000) return json({ error: "Too big" }, 400);
        await setState({ prefs: p }); return json({ ok: true });
      }
      case "done": {
        const chat = String(b.chat ?? ""); if (!chat) return json({ error: "No chat" }, 400);
        const done = { ...(st.done ?? {}), [chat]: Date.now() };
        const cut = Date.now() - 30 * 864e5; for (const k of Object.keys(done)) if (done[k] < cut) delete done[k];
        await setState({ done }); return json({ ok: true });
      }
      default: return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
