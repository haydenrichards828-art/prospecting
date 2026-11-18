// Keeps a copy of the app on the phone so it opens instantly, even on weak signal.
// The page itself is always fetched fresh first, so a new version shows straight away when there is signal.
const C = "prospect-v3", P = "photos-v1";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(["./", "index.html"]).catch(() => {}))); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C && k !== P).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (url.hostname === "maps.six.nsw.gov.au" && url.pathname.includes("/export")) { e.respondWith(photo(req)); return; }   // aerial photos: kept on the phone
  if (url.origin !== location.origin) return;                                  // data and everything else go straight to the network
  if (/\.(js|css|png|webmanifest)$/.test(url.pathname)) {                      // versioned files: use the saved copy, refresh it quietly
    e.respondWith(caches.open(C).then(async c => { const hit = await c.match(req); const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net; }));
    return;
  }
  if (req.mode === "navigate") {                                               // the page: fresh if it arrives within 2.5s, else the saved copy
    e.respondWith(caches.open(C).then(async c => {
      const net = fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then(r => { if (r.ok) c.put(url.pathname.endsWith("/") ? "./" : req, r.clone()); return r; });   // always check for a new version, never the browser's 10 minute copy
      const saved = await c.match(req, { ignoreSearch: true }) || await c.match("index.html");
      if (!saved) return net;
      return Promise.race([net.catch(() => saved), new Promise(res => setTimeout(() => res(saved), 2500))]);
    }));
  }
});

// Aerial photos never change, so once one has loaded it is kept and shows instantly next time
let trimAt = 0;
async function photo(req) {
  const c = await caches.open(P);
  const hit = await c.match(req.url);
  if (hit) return hit;
  try {
    const r = await fetch(req.url, { mode: "cors" });
    if (r.ok) { c.put(req.url, r.clone()); if (Date.now() > trimAt) { trimAt = Date.now() + 60000; trim(c); } }
    return r;
  } catch (e) { return fetch(req); }
}
async function trim(c) { const ks = await c.keys(); if (ks.length > 700) await Promise.all(ks.slice(0, ks.length - 600).map(k => c.delete(k))); }
