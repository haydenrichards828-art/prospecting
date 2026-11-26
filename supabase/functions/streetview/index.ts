// Street View photo of the front of a house, for the call screen.
// The Google key stays on the server (Supabase secret GOOGLE_MAPS_KEY). The app asks with its session, gets the picture back.
// Only Google's panorama id is stored (allowed by their terms); the picture itself is never saved, only browser cached for a day.
// 26 Nov: only Google's own street photos are used. A photo a member of the public uploaded (inside a shop, a backyard)
// is never shown as the house. Checks made before this rule are redone once (the check is free).
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, x-session", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" };
// Paid image loads per day (the free status check is not counted). While the Google sign up credit lasts (90 days from 19 Nov 2026)
// the cap is higher, sized to spend about all A$420 of it; after that it drops to what Google gives free each month (10,000).
const CREDIT_UNTIL = "2027-02-17";
const RULES_FROM = "2026-11-26T00:30:00Z";   // checks older than this may have picked a member of the public's photo
const capToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Sydney" }).format(new Date()) < CREDIT_UNTIL ? 750 : 320;
const seen = new Map<string, number>();

const bearing = (la1: number, lo1: number, la2: number, lo2: number) => {
  const r = Math.PI / 180, y = Math.sin((lo2 - lo1) * r) * Math.cos(la2 * r);
  const x = Math.cos(la1 * r) * Math.sin(la2 * r) - Math.sin(la1 * r) * Math.cos(la2 * r) * Math.cos((lo2 - lo1) * r);
  return (Math.atan2(y, x) / r + 360) % 360;
};
const dist = (la1: number, lo1: number, la2: number, lo2: number) => {
  const r = Math.PI / 180, a = Math.sin((la2 - la1) * r / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin((lo2 - lo1) * r / 2) ** 2;
  return 6371000 * 2 * Math.asin(Math.sqrt(a));
};
const msg = (s: number, t: string) => new Response(JSON.stringify({ error: t }), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
type Meta = { status?: string; pano_id?: string; location?: { lat: number; lng: number }; date?: string; copyright?: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const key = Deno.env.get("GOOGLE_MAPS_KEY");
  if (!key) return msg(503, "Street View is not set up yet");
  const token = req.headers.get("x-session") ?? "";
  if (!token) return msg(401, "Not signed in");
  const q = new URL(req.url).searchParams;
  const b = req.method === "GET" ? { pid: q.get("pid"), size: q.get("size") } : await req.json().catch(() => ({}));
  const pid = Number(b.pid); if (!pid) return msg(400, "No house");
  const big = b.size === "big";

  // sign in check, the house and its stored photo check, all at once
  const [auth, { data: p }, { data: m0 }] = await Promise.all([
    (seen.get(token) ?? 0) > Date.now() ? Promise.resolve({ data: true }) : db.rpc("auth_check", { p_token: token }),
    db.from("properties").select("lat, lng, house_number, street, suburb, postcode").eq("id", pid).maybeSingle(),
    db.from("streetview_meta").select("*").eq("property_id", pid).maybeSingle()]);
  if (!auth.data) return msg(401, "Not signed in");
  seen.set(token, Date.now() + 60_000); if (seen.size > 50) seen.clear();
  if (!p?.lat || !p?.lng) return msg(404, "No map position");
  let m = m0;
  const old = m && m.checked_at < RULES_FROM;
  if (!m || old || (m.status !== "OK" && Date.now() - new Date(m.checked_at).getTime() > 90 * 864e5)) {
    // Free checks. Looking up by street address makes Google pick a photo taken on the house's own street, out the front,
    // not the nearest one, which can be on the street behind or a back lane. The photo must be taken within 45 m of the house,
    // and must be Google's own (not one a member of the public uploaded).
    const meta = async (loc: string, radius: number): Promise<Meta> => (await fetch(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${encodeURIComponent(loc)}&radius=${radius}&source=outdoor&key=${key}`)).json();
    const bad = (j: Meta) => j.status !== "OK" || !j.location || dist(j.location.lat, j.location.lng, p.lat, p.lng) > 45 || !/google/i.test(j.copyright ?? "");
    let j: Meta = p.house_number && p.street ? await meta(`${p.house_number} ${p.street}, ${p.suburb ?? ""} NSW ${p.postcode ?? ""}, Australia`, 40) : { status: "ZERO_RESULTS" };
    if (j.status === "REQUEST_DENIED") return msg(503, "Google refused the key. Check the Street View Static API is turned on for it.");
    if (bad(j)) j = await meta(`${p.lat},${p.lng}`, 30);
    const status = j.status !== "OK" ? (j.status ?? "ERROR") : !/google/i.test(j.copyright ?? "") ? "NOT_GOOGLE" : bad(j) ? "FAR" : "OK";
    m = { property_id: pid, status, pano_id: status === "OK" ? j.pano_id ?? null : null, pano_lat: j.location?.lat ?? null, pano_lng: j.location?.lng ?? null, pano_date: j.date ?? null, checked_at: new Date().toISOString() };
    if (["OK", "FAR", "NOT_GOOGLE", "ZERO_RESULTS", "NOT_FOUND"].includes(status)) await db.from("streetview_meta").upsert(m);
  }
  if (m.status !== "OK" || !m.pano_id) return msg(404, "No street photo here");
  if (!(await db.rpc("api_take", { p_api: "streetview", p_cap: capToday() })).data) return msg(429, "Daily photo limit reached");

  // look from the road straight at the house
  const heading = m.pano_lat != null ? Math.round(bearing(m.pano_lat, m.pano_lng, p.lat, p.lng)) : 0;
  const size = big ? "640x440" : "320x240";
  const img = await fetch(`https://maps.googleapis.com/maps/api/streetview?size=${size}&pano=${m.pano_id}&heading=${heading}&fov=85&pitch=2&return_error_code=true&key=${key}`);
  if (!img.ok) return msg(404, "No street photo here");
  return new Response(img.body, { headers: { ...cors, "Content-Type": img.headers.get("content-type") ?? "image/jpeg", "Cache-Control": "private, max-age=86400",
    "X-Pano-Date": m.pano_date ?? "", "Access-Control-Expose-Headers": "X-Pano-Date" } });
});
