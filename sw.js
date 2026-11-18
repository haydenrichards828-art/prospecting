// Keeps a copy of the app on the phone so it opens instantly, even on weak signal.
// The page itself is always fetched fresh first, so a new version shows straight away when there is signal.
const C = "prospect-v1";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(["./", "index.html"]).catch(() => {}))); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;          // data, photos and maps go straight to the network
  if (/\.(js|css|png|webmanifest)$/.test(url.pathname)) {                      // versioned files: use the saved copy, refresh it quietly
    e.respondWith(caches.open(C).then(async c => { const hit = await c.match(req); const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net; }));
    return;
  }
  if (req.mode === "navigate") {                                               // the page: fresh if it arrives within 2.5s, else the saved copy
    e.respondWith(caches.open(C).then(async c => {
      const net = fetch(req).then(r => { if (r.ok) c.put(url.pathname.endsWith("/") ? "./" : req, r.clone()); return r; });
      const saved = await c.match(req, { ignoreSearch: true }) || await c.match("index.html");
      if (!saved) return net;
      return Promise.race([net.catch(() => saved), new Promise(res => setTimeout(() => res(saved), 2500))]);
    }));
  }
});
