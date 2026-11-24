// ---------- Card drop map on the graphics chip (24 Nov) ----------
// The card drop map used Leaflet, which draws streets, pins and the heat map on the processor and redraws them each
// time a zoom settles. On slower laptops that redraw is a visible hesitation. This draws the same map with MapLibre,
// which redraws everything on the graphics chip every frame, so zooming and panning never wait on a redraw.
// Same controls as before: Filters (Pins, Heat, Streets, street colours, extras), Plan a walk, tap a street in the list
// to light it up, tap a pin or street for details. If MapLibre can't start (very old browser), the Leaflet map is used.
(function(){
const GLV = '4.7.1';
let glLoad = null;
function loadGL(){ if (window.maplibregl) return Promise.resolve();
  if (glLoad) return glLoad;
  const add = (tag, at) => new Promise((ok, no) => { const e = document.createElement(tag); Object.assign(e, at); e.onload = ok; e.onerror = () => no(new Error('Map could not load')); document.head.appendChild(e); });
  glLoad = add('link', { rel: 'stylesheet', href: `https://unpkg.com/maplibre-gl@${GLV}/dist/maplibre-gl.css` }).then(() => add('script', { src: `https://unpkg.com/maplibre-gl@${GLV}/dist/maplibre-gl.js` }));
  glLoad.catch(() => { glLoad = null; }); return glLoad; }
// Only use it with a real graphics chip. Software WebGL (hardware acceleration off, remote desktop) would be slower than Leaflet.
function glOk(){ if (window.__glForce) return true; try { const f = localStorage.getItem('dp_gl'); if (f === 'off') return false; if (f === 'force') return true; } catch {}
  try { const c = document.createElement('canvas'), g = c.getContext('webgl2') || c.getContext('webgl'); if (!g) return false;
    const d = g.getExtension('WEBGL_debug_renderer_info'), r = String(d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER) || '');
    GL16_renderer = r; return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(r); } catch { return false; } }
let GL16_renderer = '';
window.GL16 = { on: glOk(), renderer: () => GL16_renderer };

// distance in metres between [lat,lng] points
const dist = (p, q) => { const R = 6371e3, r = Math.PI / 180, a = Math.sin((q[0] - p[0]) * r / 2) ** 2 + Math.cos(p[0] * r) * Math.cos(q[0] * r) * Math.sin((q[1] - p[1]) * r / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(a)); };
const PIN = '#2563eb', DONE = '#9aa3ad';
const TCOL = () => ({ most: STREET_TIERS[0][2], likely: STREET_TIERS[1][2], some: STREET_TIERS[2][2], done: '#9aa3ad', rest: '#8a94a3' });

// ---- data ----
function streetFeatures(){ const ranked = (S.streets || []).filter(x => x.n >= 3).sort((a, b) => sval(b) - sval(a)), byId = new Map((S.drops || []).map(x => [x.id, x])), f = [];
  (S.streets || []).forEach((st, i) => { const t = streetTier(st, ranked), left = (st.ids || []).filter(id => byId.has(id) && !isDropped(byId.get(id))), done = (st.ids || []).length > 0 && !left.length;
    const tier = done ? 'done' : t ? ['most', 'likely', 'some'][STREET_TIERS.indexOf(t)] : 'rest';
    const w = done ? 4 : t ? t[3] : 2.5, rank = done ? 0 : t ? 3 - STREET_TIERS.indexOf(t) : 0;
    for (const p of st.paths || []) if (p && p.length > 1) f.push({ type: 'Feature', properties: { i, tier, w, rank }, geometry: { type: 'LineString', coordinates: p } }); });
  return { type: 'FeatureCollection', features: f }; }
function pinFeatures(){ const rows = dropRows().filter(x => x.lat != null), max = Math.max(1, ...rows.map(x => Number(x.score) || 0)), b = new Map();
  for (const x of rows){ const k = x.lat.toFixed(6) + ',' + x.lng.toFixed(6); const o = b.get(k) || { lat: x.lat, lng: x.lng, xs: [] }; o.xs.push(x); b.set(k, o); }
  const f = []; S._gl16b = []; let n = 0;
  for (const o of b.values()){ const left = o.xs.filter(x => !isDropped(x)), sc = o.xs.reduce((a, x) => a + (Number(x.score) || 0), 0) / o.xs.length, t = sc / max, many = o.xs.length > 1, d = !left.length;
    S._gl16b.push({ ...o, left }); f.push({ type: 'Feature', properties: { b: n++, d: d ? 1 : 0, t, base: d ? 2.5 : 3 + t * 2.5 + (many ? 1 : 0), many: many ? 1 : 0 }, geometry: { type: 'Point', coordinates: [o.lng, o.lat] } }); }
  return { type: 'FeatureCollection', features: f }; }

// ---- map ----
function rasterStyle(){ return { version: 8, sources: { osm: { type: 'raster', tiles: ['a', 'b', 'c'].map(s => `https://${s}.tile.openstreetmap.org/{z}/{x}/{y}.png`), tileSize: 256, maxzoom: 19, attribution: '© OpenStreetMap' } },
  layers: [{ id: 'osm', type: 'raster', source: 'osm', paint: { 'raster-fade-duration': 120 } }] }; }
const zw = (k) => ['interpolate', ['linear'], ['zoom'], 11, ['*', ['get', 'w'], .55 * k], 14, ['*', ['get', 'w'], .9 * k], 16, ['*', ['get', 'w'], 1.25 * k], 18, ['*', ['get', 'w'], 2 * k]];
const pinR = ['interpolate', ['linear'], ['zoom'], 11, ['max', 2.6, ['*', ['get', 'base'], .55 * 1.45]], 13, ['max', 3.5, ['*', ['get', 'base'], .7 * 1.45]], 15, ['*', ['get', 'base'], 1.45], 16, ['*', ['get', 'base'], 1.3 * 1.45], 18, ['*', ['get', 'base'], 1.9 * 1.45]];

function mount(){ const el = document.getElementById('dmap'); if (!el || S.tab !== 'drops') return;
  if (S.gl){ try { S.gl.remove(); } catch {} S.gl = null; }
  el.innerHTML = ''; el.classList.add('gl16');
  const pts = dropRows().filter(x => x.lat != null);
  const m = new maplibregl.Map({ container: el, style: rasterStyle(), center: [150.91, -34.36], zoom: 11.5, maxZoom: 19, attributionControl: { compact: false }, dragRotate: false, pitchWithRotate: false, touchPitch: false, fadeDuration: 0, renderWorldCopies: false });
  m.touchZoomRotate.disableRotation(); S.gl = m; wheel(m);
  if (pts.length){ const bb = pts.reduce((a, x) => [Math.min(a[0], x.lng), Math.min(a[1], x.lat), Math.max(a[2], x.lng), Math.max(a[3], x.lat)], [180, 90, -180, -90]); m.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], { padding: 20, duration: 0 }); }
  new ResizeObserver(() => { try { m.resize(); } catch {} }).observe(el);
  m.on('load', () => { if (S.gl !== m) return;
    m.addSource('streets', { type: 'geojson', data: streetFeatures(), tolerance: .6 });
    m.addSource('pins', { type: 'geojson', data: pinFeatures() });
    m.addSource('hi', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    m.addSource('ext', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    m.addSource('walk', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    m.addLayer({ id: 'heat', type: 'heatmap', source: 'pins', filter: ['==', ['get', 'd'], 0], maxzoom: 19, paint: {
      'heatmap-weight': ['max', .15, ['get', 't']], 'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 10, .6, 16, 1.6],
      'heatmap-radius': ['interpolate', ['exponential', 1.6], ['zoom'], 10, 10, 13, 22, 16, 44, 18, 90],
      'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(0,0,255,0)', .15, 'rgba(0,0,255,.55)', .35, 'cyan', .55, 'lime', .75, 'yellow', 1, 'red'],
      'heatmap-opacity': .8 } });
    m.addLayer({ id: 'streets', type: 'line', source: 'streets', layout: { 'line-cap': 'round', 'line-join': 'round', 'line-sort-key': ['get', 'rank'] }, paint: {
      'line-color': ['match', ['get', 'tier'], 'most', TCOL().most, 'likely', TCOL().likely, 'some', TCOL().some, 'done', TCOL().done, TCOL().rest],
      'line-opacity': ['match', ['get', 'tier'], 'rest', .45, 'done', .8, .9], 'line-width': zw(1) } });
    m.addLayer({ id: 'streets-done', type: 'line', source: 'streets', filter: ['==', ['get', 'tier'], 'done'], layout: { 'line-cap': 'butt' }, paint: { 'line-color': '#e9edf2', 'line-width': zw(.5), 'line-dasharray': [2, 2] } });
    m.addLayer({ id: 'streets-hit', type: 'line', source: 'streets', paint: { 'line-color': '#000', 'line-opacity': .001, 'line-width': 22 } });
    m.addLayer({ id: 'hi-casing', type: 'line', source: 'hi', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#fff', 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 7, 16, 14, 18, 20] } });
    m.addLayer({ id: 'hi-line', type: 'line', source: 'hi', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#2563eb', 'line-width': ['interpolate', ['linear'], ['zoom'], 12, 4, 16, 8, 18, 12] } });
    m.addLayer({ id: 'pins', type: 'circle', source: 'pins', layout: { 'circle-sort-key': ['-', 1, ['get', 'd']] }, paint: {
      'circle-radius': pinR, 'circle-color': ['case', ['==', ['get', 'd'], 1], DONE, PIN], 'circle-opacity': ['case', ['==', ['get', 'd'], 1], .75, 1],
      'circle-stroke-color': '#fff', 'circle-stroke-width': ['case', ['==', ['get', 'many'], 1], 2, 1.4] } });
    m.addLayer({ id: 'walk-glow', type: 'line', source: 'walk', filter: ['==', ['get', 'k'], 'glow'], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#f6c026', 'line-opacity': .5, 'line-width': ['interpolate', ['linear'], ['zoom'], 13, 9, 17, 18] } });
    m.addLayer({ id: 'walk-casing', type: 'line', source: 'walk', filter: ['==', ['get', 'k'], 'route'], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#1a4fd6', 'line-width': ['interpolate', ['linear'], ['zoom'], 13, 6, 17, 10] } });
    m.addLayer({ id: 'walk-line', type: 'line', source: 'walk', filter: ['==', ['get', 'k'], 'route'], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#5b9bff', 'line-width': ['interpolate', ['linear'], ['zoom'], 13, 3.5, 17, 6] } });
    m.addLayer({ id: 'ext-dot', type: 'circle', source: 'ext', paint: { 'circle-radius': ['get', 'r'], 'circle-color': ['get', 'c'], 'circle-stroke-color': ['get', 'sc'], 'circle-stroke-width': ['get', 'sw'] } });
    sync(); extras();
    // taps
    const pop = (ll, html) => { S.gl16pop?.remove(); S.gl16pop = new maplibregl.Popup({ maxWidth: '280px', offset: 10 }).setLngLat(ll).setHTML(html).addTo(m); };
    m.on('click', e => {
      const hit = m.queryRenderedFeatures([[e.point.x - 6, e.point.y - 6], [e.point.x + 6, e.point.y + 6]], { layers: ['pins', 'ext-dot', 'streets-hit'].filter(id => m.getLayer(id) && m.getLayoutProperty(id, 'visibility') !== 'none') });
      const f = hit.find(h => h.layer.id === 'pins') || hit.find(h => h.layer.id === 'ext-dot') || hit.find(h => h.layer.id === 'streets-hit');
      if (!f){ clearHi(); S.gl16pop?.remove(); return; }
      if (f.layer.id === 'pins') return pop(f.geometry.coordinates, pinHTML(f.properties.b));
      if (f.layer.id === 'ext-dot') return pop(f.geometry.coordinates, f.properties.html);
      const st = (S.streets || [])[f.properties.i]; if (st) pop(e.lngLat, streetHTML(st, f.properties.tier)); });
    ['pins', 'ext-dot', 'streets-hit'].forEach(id => { m.on('mouseenter', id, () => { m.getCanvas().style.cursor = 'pointer'; }); m.on('mouseleave', id, () => { m.getCanvas().style.cursor = ''; }); });
    m.on('moveend', () => labels());
  });
  controls(el);
}
function pinHTML(i){ const b = (S._gl16b || [])[i]; if (!b) return ''; const x = b.xs[0], many = b.xs.length > 1, d = !b.left.length;
  const label = many ? `${esc([x.house_number].filter(Boolean).join(''))} ${esc(x.street || '')}, ${b.xs.length} units` : esc(dropAddr(x));
  return `<b>${label}</b><br>${esc(x.suburb || '')}<br><span style="color:#667">${many ? `${b.left.length} of ${b.xs.length} letterboxes to drop` : esc((x.reasons || [])[0] || '')}</span><br>` +
    (d ? `<button class="gp16" onclick="toggleDrop([${b.xs.map(y => y.id)}],true)">Undo dropped</button>` : `<button class="gp16 pri" onclick="toggleDrop([${b.left.map(y => y.id)}],false)">${many ? 'Mark building dropped' : 'Mark dropped'}</button>`); }
function streetHTML(st, tier){ const t = { most: STREET_TIERS[0], likely: STREET_TIERS[1], some: STREET_TIERS[2] }[tier];
  const byId = new Map((S.drops || []).map(x => [x.id, x])), left = (st.ids || []).filter(id => byId.has(id) && !isDropped(byId.get(id)));
  return `<b>${esc(st.street)}</b>, ${esc(st.suburb)}<br>${t ? `<span style="color:${t[2]};font-weight:600">${t[0]}</span><br>` : st.n < 3 ? '<span style="color:#667">Too few houses known to rate</span><br>' : ''}Likely to sell score ${Math.round(sval(st))}, ${st.n} address${st.n === 1 ? '' : 'es'}` +
    (left.length ? `<br><button class="gp16 pri" onclick="toggleDrop([${left}],false)">Mark street dropped (${left.length})</button>` : '<br><span style="color:#667">All dropped</span>'); }

// layers on or off from Filters, street colours, and fresh data after a drop is marked
function sync(){ const m = S.gl; if (!m || !m.getSource('pins')) return;
  m.getSource('pins').setData(pinFeatures()); m.getSource('streets').setData(streetFeatures());
  const L5 = lays5(), vis = (id, on) => m.getLayer(id) && m.setLayoutProperty(id, 'visibility', on && !S.gl16walk ? 'visible' : 'none');
  vis('pins', L5.has('pins')); vis('heat', L5.has('heat'));
  ['streets', 'streets-done', 'streets-hit'].forEach(id => vis(id, L5.has('streets')));
  const shown = [...streetShown()]; m.setFilter('streets', ['in', ['get', 'tier'], ['literal', shown]]); m.setFilter('streets-hit', ['in', ['get', 'tier'], ['literal', shown]]);
  m.setFilter('streets-done', ['all', ['==', ['get', 'tier'], 'done'], ['in', 'done', ['literal', shown]]]);
  try { dfBtn5(); } catch {} }
// our appraisals and listings, recent sales: drawn on the GPU as dots
async function extras(){ const m = S.gl; if (!m || !m.getSource('ext')) return; const MX = mx5(), f = [];
  try { if (MX.pipe && !S.pipe) S.pipe = (await api('pipeline')).rows || []; } catch {}
  try { if (MX.sales && !S.rsales) S.rsales = (await api('recent_sales')).rows || []; } catch { S.rsales = []; }
  const k = v => v >= 1e6 ? '$' + (v / 1e6).toFixed(2).replace(/0$/, '').replace(/\.0$/, '') + 'm' : '$' + Math.round(v / 1e3) + 'k';
  for (const x of MX.pipe ? (S.pipe || []) : []){ if (x.lat == null || !['appraisal', 'listed'].includes(x.stage)) continue;
    f.push({ type: 'Feature', properties: { r: 8, c: x.stage === 'listed' ? '#0d9488' : '#15803d', sc: '#fff', sw: 3, html: `<b>${x.stage === 'listed' ? 'Our listing' : 'Our appraisal'}</b><br>${esc([x.street_address, x.suburb].filter(Boolean).join(', '))}<br><span style="color:#667">Drop the neighbours</span>` }, geometry: { type: 'Point', coordinates: [x.lng, x.lat] } }); }
  for (const s of MX.sales ? (S.rsales || []) : []) f.push({ type: 'Feature', properties: { r: 4.5, c: '#f6c026', sc: '#111419', sw: 1.5, price: k(+s.price), html: `<b>Sold ${k(+s.price)}</b><br>${esc(s.addr)}, ${esc(s.suburb || '')}<br><span style="color:#667">${new Date(s.d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>` }, geometry: { type: 'Point', coordinates: [+s.lng, +s.lat] } });
  m.getSource('ext').setData({ type: 'FeatureCollection', features: f }); m.setLayoutProperty('ext-dot', 'visibility', S.gl16walk ? 'none' : 'visible'); labels(); }
// close in (zoom 16 and up): sale prices and the date each finished street was dropped, only for what is on screen
function labels(){ const m = S.gl; if (!m) return; (S.gl16lab || []).forEach(x => x.remove()); S.gl16lab = [];
  if (m.getZoom() < 16 || S.gl16walk) return; const bb = m.getBounds(), MX = mx5(), add = (ll, cls, html) => S.gl16lab.push(new maplibregl.Marker({ element: Object.assign(document.createElement('div'), { className: cls, innerHTML: html }) }).setLngLat(ll).addTo(m));
  const k = v => v >= 1e6 ? '$' + (v / 1e6).toFixed(2).replace(/0$/, '').replace(/\.0$/, '') + 'm' : '$' + Math.round(v / 1e3) + 'k';
  for (const s of MX.sales ? (S.rsales || []) : []) if (bb.contains([+s.lng, +s.lat])) add([+s.lng, +s.lat], 'sale3 gl16l', `<span>${k(+s.price)}</span>`);
  if (MX.dropped){ const byId = new Map((S.drops || []).map(x => [x.id, x]));
    for (const st of S.streets || []){ const p = (st.paths || [])[0]; if (!p || !p.length) continue; const mid = p[Math.floor(p.length / 2)]; if (!bb.contains(mid)) continue;
      const ds = (st.ids || []).map(id => byId.get(id)).filter(x => x && isDropped(x)); if (!ds.length || ds.length < (st.ids || []).length) continue;
      const last = ds.map(x => x.dropped_at).sort().pop(); add(mid, 'dd3 gl16l', `<span>Dropped ${new Date(last).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}</span>`); } } }

// tapping a street or suburb in the list lights it up
function clearHi(){ S.gl?.getSource('hi')?.setData({ type: 'FeatureCollection', features: [] }); document.querySelectorAll('.bs14.on').forEach(x => x.classList.remove('on')); }
function zoomTo(g, i){ const m = S.gl; if (!m || !g) return;
  const one = (S.streets || []).filter(st => `${st.street}, ${st.suburb}` === g.k), paths = (one.length ? one : (S.streets || []).filter(st => st.suburb === g.k)).flatMap(st => st.paths || []);
  m.getSource('hi')?.setData({ type: 'FeatureCollection', features: paths.map(p => ({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: p } })) });
  const all = paths.length ? paths.flat() : (g.pts || []).map(([a, b]) => [b, a]);
  if (all.length){ const bb = all.reduce((a, p) => [Math.min(a[0], p[0]), Math.min(a[1], p[1]), Math.max(a[2], p[0]), Math.max(a[3], p[1])], [180, 90, -180, -90]); m.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], { padding: 60, maxZoom: 17, duration: 700 }); }
  document.querySelectorAll('.bs14').forEach((x, j) => x.classList.toggle('on', j === i));
  if (innerWidth < 900) scrollTo({ top: 0, behavior: 'smooth' }); }

// walking route, same plan as before, drawn on the GPU
async function walk(){ const m = S.gl; const sub = S.walkSub || walkSubs3()[0]?.sub; S.walkSub = sub;
  const gs = dropGroups('street').filter(g => g.k.split(', ').pop() === sub && g.pts && g.pts.length).slice(0, 8);
  if (gs.length < 2 || !m) return toast(`Not enough streets left to drop in ${sub || 'that suburb'}`);
  const ends = pts => { const c = pts.reduce((a, p) => [a[0] + p[0] / pts.length, a[1] + p[1] / pts.length], [0, 0]); const a = pts.reduce((b, p) => dist(p, c) > dist(b, c) ? p : b, pts[0]), b = pts.reduce((x, p) => dist(p, a) > dist(x, a) ? p : x, pts[0]); return [a, b]; };
  const items = gs.map(g => ({ g, e: ends(g.pts) })), order = [items.shift()];
  while (items.length){ const c = order[order.length - 1].e; let bi = 0, bd = 1e12; items.forEach((s, i) => { const v = Math.min(dist(c[0], s.e[0]), dist(c[0], s.e[1]), dist(c[1], s.e[0]), dist(c[1], s.e[1])); if (v < bd){ bd = v; bi = i; } }); order.push(items.splice(bi, 1)[0]); }
  const mid = s => [(s.e[0][0] + s.e[1][0]) / 2, (s.e[0][1] + s.e[1][1]) / 2], len = o => o.slice(1).reduce((a, s, i) => a + dist(mid(o[i]), mid(s)), 0);
  for (let pass = 0, better = true; better && pass < 20; pass++){ better = false; for (let a = 1; a < order.length - 1; a++) for (let b = a + 1; b < order.length; b++){ const t = [...order.slice(0, a), ...order.slice(a, b + 1).reverse(), ...order.slice(b + 1)]; if (len(t) + 1 < len(order)){ order.splice(0, order.length, ...t); better = true; } } }
  const stops = []; for (const s of order){ const prev = stops.length ? stops[stops.length - 1].b : null; const flip = prev && dist(prev, s.e[1]) < dist(prev, s.e[0]); stops.push({ g: s.g, a: flip ? s.e[1] : s.e[0], b: flip ? s.e[0] : s.e[1] }); }
  const wps = stops.flatMap(s => [s.a, s.b]); toast('Working out the walk…');
  let line = null, km = 0, legs = [];
  try { const u = 'https://routing.openstreetmap.de/routed-foot/route/v1/driving/' + wps.map(p => `${p[1].toFixed(6)},${p[0].toFixed(6)}`).join(';') + '?overview=full&geometries=geojson&steps=true';
    const j = await (await fetch(u, { signal: AbortSignal.timeout(15000) })).json(); if (j.code !== 'Ok' || !j.routes?.length) throw new Error(j.message || j.code);
    line = j.routes[0].geometry.coordinates; km = j.routes[0].distance / 1000; legs = j.routes[0].legs || [];
  } catch (e){ console.warn('walk route', e); for (let i = 1; i < wps.length; i++) km += dist(wps[i - 1], wps[i]) / 1000; }
  const mins = Math.round(km / 4.5 * 60) + stops.reduce((a, s) => a + s.g.ids.length, 0) / 2 | 0;
  const streetsOf = k => (S.streets || []).filter(st => `${st.street}, ${st.suburb}` === k).flatMap(st => st.paths || []);
  const f = []; stops.forEach(s => streetsOf(s.g.k).forEach(p => f.push({ type: 'Feature', properties: { k: 'glow' }, geometry: { type: 'LineString', coordinates: p } })));
  f.push({ type: 'Feature', properties: { k: 'route' }, geometry: { type: 'LineString', coordinates: line || wps.map(([a, b]) => [b, a]) } });
  walkOff(true); S.gl16walk = 1; m.getSource('walk').setData({ type: 'FeatureCollection', features: f }); sync(); extras();
  const mk = (p, cls, html, popup) => { const e = Object.assign(document.createElement('div'), { className: cls, innerHTML: html }); const k = new maplibregl.Marker({ element: e }).setLngLat([p[1], p[0]]); if (popup) k.setPopup(new maplibregl.Popup({ offset: 12 }).setHTML(popup)); S.gl16wk.push(k.addTo(m)); };
  S.gl16wk = S.gl16wk || [];
  stops.forEach((s, i) => { if (i) mk(s.a, 'wk3', `<span>${i + 1}</span>`, `<b>${i + 1}. ${esc(s.g.k)}</b><br>${s.g.ids.length} letterboxes`); });
  mk(stops[0].a, 'wks3', '<span>Start</span>'); mk(stops[stops.length - 1].b, 'wkf3', '<span>Finish</span>');
  const bb = wps.reduce((a, p) => [Math.min(a[0], p[1]), Math.min(a[1], p[0]), Math.max(a[2], p[1]), Math.max(a[3], p[0])], [180, 90, -180, -90]); m.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], { padding: 50, duration: 700 });
  const turn = st => { const mm = st.maneuver || {}, n = st.name || 'the path', md = mm.modifier || '';
    if (mm.type === 'turn' || mm.type === 'end of road' || mm.type === 'fork') return `Turn ${md} onto ${n}`; if (mm.type === 'continue' || mm.type === 'new name') return `Keep going onto ${n}`;
    if (mm.type === 'roundabout' || mm.type === 'rotary') return `At the roundabout, take ${n}`; return null; };
  const fm = x => x < 1000 ? `${Math.round(x / 10) * 10} m` : `${(x / 1000).toFixed(1)} km`, rows = [];
  S.gl16stops = stops;
  stops.forEach((s, i) => { if (i && legs.length){ const lg = legs[2 * i - 1]; for (const st of (lg?.steps || [])){ const t = turn(st); if (t && st.distance > 5) rows.push(`<li class="go"><i>${ic2('chev', 12)}</i><span>${esc(t)}</span><em>${fm(st.distance)}</em></li>`); } }
    rows.push(`<li onclick="GL16.fitStop(${i})"><i>${i ? i + 1 : 'S'}</i><span><b>Drop along ${esc(s.g.k.split(', ')[0])}</b></span><em>${s.g.ids.length} letterboxes</em></li>`); });
  const b = document.getElementById('best'); document.getElementById('wkp3')?.remove();
  b?.insertAdjacentHTML('afterbegin', `<div id="wkp3"><div class="wkh3"><b>Walk in ${esc(sub)}</b><span>${km.toFixed(1)} km, about ${Math.round(mins / 5) * 5 || 5} min</span><button onclick="walkClear3()">Clear</button></div>
    <ol>${rows.join('')}<li class="end"><i>${ic2('check', 12)}</i><span>Finish</span></li></ol>${line ? '' : '<p>Walking directions weren\'t available, so this shows the order only.</p>'}</div>`);
  toast(`${stops.length} streets in ${sub}. Start at the green pin.`); try { walkBtn14(); } catch {} }
function walkOff(keepPanel){ (S.gl16wk || []).forEach(k => k.remove()); S.gl16wk = []; S.gl16walk = 0; S.gl?.getSource('walk')?.setData({ type: 'FeatureCollection', features: [] });
  if (!keepPanel){ document.getElementById('wkp3')?.remove(); sync(); extras(); try { walkBtn14(); } catch {} } }
GL16.fitStop = i => { const s = (S.gl16stops || [])[i]; if (!s || !S.gl) return; S.gl.fitBounds([[Math.min(s.a[1], s.b[1]), Math.min(s.a[0], s.b[0])], [Math.max(s.a[1], s.b[1]), Math.max(s.a[0], s.b[0])]], { padding: 60, maxZoom: 18, duration: 600 }); };

// Scroll zoom with the same feel as before. MapLibre's own scroll zoom is used (it never redraws more than needed),
// just made as sensitive as the old map: about one zoom level per mouse wheel notch, about 60px of trackpad scroll per level.
function wheel(m){ try { m.scrollZoom.setWheelZoomRate(1 / 25); m.scrollZoom.setZoomRate(1 / 43); } catch {} }

// Filters and full screen buttons on the map
function controls(el){ el.insertAdjacentHTML('beforeend', `<div class="mctl5"><button class="dfb5" onclick="event.stopPropagation();dfPanel5()"></button></div><button class="mfs5" aria-label="Full screen map" title="Full screen" onclick="event.stopPropagation();mapFs5('dmap')">${FS5_IN}</button>`);
  el._fsMap = () => ({ invalidateSize(){ try { S.gl?.resize(); } catch {} } });
  ['.mctl5', '.mfs5'].forEach(s => { const c = el.querySelector(s); ['mousedown', 'dblclick', 'wheel', 'touchstart', 'pointerdown'].forEach(ev => c.addEventListener(ev, e => e.stopPropagation())); });
  try { dfBtn5(); } catch {} }

// ---- hooks into the existing card drops code ----
const realLoadLeaflet = window.loadLeaflet;
window.loadLeaflet = function(...a){ if (S.__gl16skip) return new Promise(() => {}); return realLoadLeaflet.apply(this, a); };
window.drawDrops = (function(o){ return function(...a){
  if (!GL16.on || S.dview === 'list' || !(S.drops || []).length){ if (S.gl){ try { S.gl.remove(); } catch {} S.gl = null; } return o.apply(this, a); }
  if (S.map){ try { S.map.remove(); } catch {} S.map = null; }
  S.__gl16skip = 1; let r; try { r = o.apply(this, a); } finally { S.__gl16skip = 0; }
  realLoadLeaflet().catch(() => {});                       // Leaflet still loads for the little helpers the panels use
  loadGL().then(() => { if (S.tab === 'drops' && document.getElementById('dmap')) mount(); })
    .catch(() => { GL16.on = false; window.drawDrops(...a); });
  return r; }; })(window.drawDrops);
window.drawDropLayer = (function(o){ return function(...a){ if (S.gl){ sync(); return; } return o.apply(this, a); }; })(window.drawDropLayer);
window.mapExtras3 = (function(o){ return function(...a){ if (S.gl){ extras(); return; } return o.apply(this, a); }; })(window.mapExtras3);
window.zoomBest = (function(o){ return function(i){ if (S.gl) return zoomTo((S._best || [])[i], i); return o.apply(this, arguments); }; })(window.zoomBest);
window.walk3 = (function(o){ return async function(...a){ if (S.gl) return walk(); return o.apply(this, a); }; })(window.walk3);
window.walkClear3 = (function(o){ return function(...a){ if (S.gl){ walkOff(); return; } return o.apply(this, a); }; })(window.walkClear3);
window.walkGo5 = (function(o){ return function(sub){ if (S.gl){ try { popClose5(); } catch {} S.walkSub = sub; return walk(); } return o.apply(this, arguments); }; })(window.walkGo5);
window.toggleTier = (function(o){ return function(...a){ const r = o.apply(this, a); if (S.gl) sync(); return r; }; })(window.toggleTier);
window.fitDrops5 = (function(o){ return function(...a){ const r = o.apply(this, a); try { S.gl?.resize(); } catch {} return r; }; })(window.fitDrops5);
// leaving the page or switching to the list cleans up the GPU map
window.render = (function(o){ return function(...a){ if (S.gl && S.tab !== 'drops'){ try { S.gl.remove(); } catch {} S.gl = null; } return o.apply(this, a); }; })(window.render);
})();
