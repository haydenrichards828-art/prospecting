// ---------- House photos from cached map tiles (24 Nov) ----------
// The aerial photos used to ask the NSW map server to draw a fresh picture for each house (the "export" request), which
// takes from half a second to several seconds. The same server keeps ready made 256px tiles of the same imagery, cached
// and fast. Each photo is now built from the 2 to 4 tiles around the house, placed so the house sits exactly where it did.
// Neighbours share tiles, so once one house in a street has loaded the rest of the street shows straight away.
// Big photos (wider than 720px, like the full screen photo) still use the drawn picture.
(function(){
const TILE = 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer/tile/';
const my = (la, z) => { const s = Math.sin(la * Math.PI / 180); return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * 256 * 2 ** z; };
const mx = (lo, z) => (lo + 180) / 360 * 256 * 2 ** z;
const EXPORT = 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer/export';
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7#am16?';
// The photo address points at an empty placeholder (no download) until it is swapped for tiles
const realAerial = window.aerialUrl;
window.aerialUrl = function(...a){ const u = realAerial.apply(this, a); return u ? BLANK + u.split('?')[1] : u; };
const exportOf = src => src.startsWith(BLANK) ? EXPORT + '?' + src.slice(BLANK.length) : src;
function parse(src){ try { src = exportOf(src); if (!/NSW_Imagery\/MapServer\/export/.test(src)) return null; const u = new URL(src), bb = u.searchParams.get('bbox').split(',').map(Number), sz = u.searchParams.get('size').split(',').map(Number);
  return { bb, w: sz[0], h: sz[1], lat: (bb[1] + bb[3]) / 2, lng: (bb[0] + bb[2]) / 2 }; } catch { return null; } }
// the tiles (and where each sits, in % of the box) that fill a W x H box the same way the drawn picture did with object-fit: cover
function layout(p, W, H){ const hz0 = my(p.bb[1], 0) - my(p.bb[3], 0), sc = Math.max(W / p.w, H / p.h), cssZ0 = (p.h / hz0) * sc, dpr = Math.min(W > 200 ? 1.2 : 2, devicePixelRatio || 1);   // as sharp as the old photos, no sharper (fewer tiles)
  const z = Math.max(10, Math.min(20, Math.ceil(Math.log2(cssZ0 * dpr)))), k = cssZ0 / 2 ** z, cx = mx(p.lng, z), cy = my(p.lat, z);
  const x0 = cx - W / 2 / k, y0 = cy - H / 2 / k, x1 = cx + W / 2 / k, y1 = cy + H / 2 / k, out = [];
  for (let ty = Math.floor(y0 / 256); ty <= Math.floor((y1 - .001) / 256); ty++) for (let tx = Math.floor(x0 / 256); tx <= Math.floor((x1 - .001) / 256); tx++)
    out.push({ url: `${TILE}${z}/${ty}/${tx}`, l: (tx * 256 - x0) * k / W * 100, t: (ty * 256 - y0) * k / H * 100, w: 256 * k / W * 100, h: 256 * k / H * 100 });
  return out; }
function build(img){ if (img.dataset.am16) return; const p = parse(img.currentSrc || img.src); if (!p) return; const r = img.getBoundingClientRect(), W = r.width, H = r.height;
  if (!W || !H){ if (!img.__ro16){ img.__ro16 = new ResizeObserver(() => { if (img.getBoundingClientRect().width){ img.__ro16.disconnect(); build(img); } }); img.__ro16.observe(img); } return; }
  img.dataset.am16 = 1;
  if (W > 720){ img.src = exportOf(img.src); return; }      // big photos: the drawn picture, sharp at that size
  const lazy = img.loading === 'lazy' ? ' loading="lazy"' : '', abs = getComputedStyle(img).position === 'absolute', box = document.createElement('span');
  box.className = 'am16 ld16'; box.setAttribute('aria-hidden', 'true');
  box.style.cssText = abs ? 'position:absolute;inset:0;overflow:hidden;display:block' : 'position:relative;display:block;width:100%;height:100%;overflow:hidden';
  box.innerHTML = layout(p, W, H).map(t => `<img src="${t.url}" alt=""${lazy} decoding="async" draggable="false" style="position:absolute;left:${t.l.toFixed(3)}%;top:${t.t.toFixed(3)}%;width:calc(${t.w.toFixed(3)}% + .6px);height:calc(${t.h.toFixed(3)}% + .6px);max-width:none;object-fit:fill" onerror="this.style.visibility='hidden'">`).join('');
  // show the photo whole: hidden until every tile has arrived (tiles already on the device arrive at once), then it fades in
  const ts = [...box.querySelectorAll('img')]; let left = ts.length; const done = () => box.classList.remove('ld16');
  ts.forEach(t => { const one = () => { if (--left <= 0) done(); }; t.addEventListener('load', one, { once: true }); t.addEventListener('error', one, { once: true }); });
  setTimeout(done, 2500);
  img.replaceWith(box); }
function scan(root){ (root.querySelectorAll ? root.querySelectorAll('img[src*="NSW_Imagery/MapServer/export"],img[src^="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7#am16"]') : []).forEach(i => { if (i.closest('.leaflet-container,.maplibregl-map')) return; build(i); }); }
// photos are swapped before the browser starts fetching the slow drawn picture
new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes){ if (n.nodeType !== 1) continue; if (n.tagName === 'IMG') { if (/MapServer\/export|#am16\?/.test(n.src)) build(n); } else if (n.querySelector) scan(n); } })
  .observe(document.documentElement, { childList: true, subtree: true });
scan(document);
// Background loading of the next people's photos uses the tiles too (it used to ask for the slow drawn pictures)
const pf = new Set();
window.prefetchPhotos = (function(o){ return function(curId){ try {
  const big = desk2(), box = big ? [430, 430] : [76, 76], sz = big ? PH_BIG : PH_SMALL;
  const next = callQ().filter(x => !x.today_outcome && !S.skipped.has(x.property_id) && x.property_id !== curId).slice(0, big ? 8 : 30);
  const load = x => { const u = aerialUrl(x, sz[0], sz[1]), p = u && parse(u); if (!p) return; layout(p, box[0], box[1]).forEach(t => { if (pf.has(t.url)) return; pf.add(t.url); const im = new Image(); im.decoding = 'async'; im.src = t.url; }); };
  next.slice(0, 6).forEach(load);
  clearTimeout(window._pfIdle); window._pfIdle = setTimeout(() => { const go = () => next.slice(6).forEach(load); window.requestIdleCallback ? requestIdleCallback(go, { timeout: 4000 }) : go(); }, 1500);
} catch { return o.apply(this, arguments); } }; })(window.prefetchPhotos);
window.AM16 = { layout, parse };
})();
