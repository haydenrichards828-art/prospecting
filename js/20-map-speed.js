// Map speed (25 Nov). Measured what a zoom on the card drop map waits on, and took that work out of the zoom.
(function(){
// Resizing 6,000 pins one at a time held up the end of every zoom by about 25 ms, because each one asked for its own redraw.
// Now the sizes are set directly and the whole layer redraws once, in the next frame.
// During a zoom the map is about to place and redraw every pin anyway, so this only sets the size then.
window.resizePins = function(){ if (!S.dlay || !S.dlay.eachLayer) return; const ren = new Set(), zooming = !!(S.map && S.map.__z);
  S.dlay.eachLayer(function rz(m){ if (m.eachLayer) return m.eachLayer(rz);
    if (m.options && m.options.base != null && m.setRadius){ const r = pinR(m.options.base); if (m._radius === r) return;
      m.options.radius = m._radius = r; if (m._map && !zooming){ m._project(); if (m._renderer) ren.add(m._renderer); } } });
  ren.forEach(r => { r._redrawBounds = null; if (r._redrawRequest) return; r._redrawRequest = L.Util.requestAnimFrame(r._redraw, r); }); };
// Map squares load once the zoom stops, not at every step on the way. Loading them mid zoom is what stuttered a first zoom in:
// a fast zoom from street level used to pull in about 125 squares, now about 25. Keep a few more around for zooming back out.
const tune = () => { if (!window.L || !L.GridLayer || L.GridLayer.__ms) return; L.GridLayer.__ms = 1; Object.assign(L.GridLayer.prototype.options, { updateWhenZooming: false, keepBuffer: 4 });
  L.Map.addInitHook(function(){ this.on('zoomstart', () => { this.__z = 1; }); this.on('moveend', () => { this.__z = 0; }); });
  // The heat map waits for its own frame when a zoom settles (see below), instead of redrawing in the same frame as everything else
  if (L.HeatLayer && !L.HeatLayer.__ms){ L.HeatLayer.__ms = 1; const R = L.HeatLayer.prototype._reset;
    L.HeatLayer.prototype._reset = function(){ if (this._map && this._map.__settle){ this.__later = () => { this.__later = null; R.call(this); }; return; } this.__later = null; R.call(this); }; }
  settle(); };
// When a zoom stops, the work used to happen in one go: about a tenth of a second where the screen froze. Now it's spread out,
// one piece per frame: map squares, then placing the pins, then drawing them, then the heat map. A copy of how the pins looked
// stays on top until they're redrawn, so nothing flashes.
function settle(){ const H = window.__swH14; if (!H || H.__ms) return; H.__ms = 1;
  H.prototype._end = function(quiet){ if (!this._on) return; this._on = false; cancelAnimationFrame(this._raf); const m = this._map; m._container.classList.remove('sw14');
    const heat = this._heat || [], back = () => heat.forEach(l => { try { l._canvas.style.transformOrigin = l.__to14 || ''; } catch {} });
    if (!this._moved || quiet){ back(); return; }
    const hc = new Set(heat.map(l => l._canvas)), ghosts = [];
    try { m.getPanes().overlayPane.querySelectorAll('canvas').forEach(c => { if (hc.has(c) || !c.width || !c.height || c.classList.contains('sw14g')) return;
      const k = document.createElement('canvas'); k.width = c.width; k.height = c.height; k.getContext('2d').drawImage(c, 0, 0);
      k.style.cssText = c.style.cssText; k.style.pointerEvents = 'none'; k.className = c.className + ' sw14g'; c.after(k); ghosts.push(k); }); } catch {}
    const tok = this.__tok = (this.__tok || 0) + 1, live = () => tok === this.__tok && !this._on, raf = f => requestAnimationFrame(() => { if (live()) f(); else { m.__settle = 0; ghosts.forEach(k => k.remove()); } });
    m._move(m.getCenter(), m.getZoom());                               // frame 1: map squares for this zoom
    raf(() => { m.fire('zoomend');                                     // frame 2: work out where every pin and street goes
     raf(() => { m.__settle = 1; m.fire('moveend'); m.__settle = 0;    // frame 3: place them (they draw on frame 4)
      raf(() => raf(() => { let i = 0;                                 // frames 5+: the heat map, one layer per frame
        const next = () => { if (i < heat.length){ const l = heat[i++]; try { l.__later && l.__later(); } catch {} raf(next); return; }
          back(); ghosts.forEach(k => { k.style.transition = 'opacity .2s ease-out'; k.style.opacity = '0'; }); setTimeout(() => ghosts.forEach(k => k.remove()), 280); };
        next(); })); }); }); };
  // where the pointer is, without asking the page for the map's position on every scroll tick (that forced a layout each time)
  const W0 = H.prototype._wheel; H.prototype._wheel = function(e){ const m = this._map, c = m._container;
    if (!this._on || !this._rc) this._rc = c.getBoundingClientRect();
    const r = this._rc, sx = r.width / (c.offsetWidth || 1) || 1, sy = r.height / (c.offsetHeight || 1) || 1;
    const fake = m.mouseEventToContainerPoint; m.mouseEventToContainerPoint = ev => L.point((ev.clientX - r.left) / sx - c.clientLeft, (ev.clientY - r.top) / sy - c.clientTop);
    try { return W0.call(this, e); } finally { m.mouseEventToContainerPoint = fake; } };
  // a new zoom starting part way through simply takes over
  const S0 = H.prototype._start; H.prototype._start = function(){ this.__tok = (this.__tok || 0) + 1; document.querySelectorAll('.sw14g').forEach(k => k.remove());
    (this._heat || []).forEach(l => { try { l._canvas.style.transformOrigin = l.__to14 || ''; } catch {} }); return S0.apply(this, arguments); }; }
tune();
if (window.loadLeaflet) window.loadLeaflet = (function(o){ return function(...a){ return Promise.resolve(o.apply(this, a)).then(r => { tune(); return r; }); }; })(window.loadLeaflet);
})();

// If the browser isn't using the computer's graphics chip, the smooth map can't run and zooming will stutter whatever we do.
// Say so on the card drop map, once, with the fix. (Phones and tablets always have it on, so this is for computers.)
(function(){
  const soft = () => { try { if (localStorage.getItem('dp_gl') || localStorage.getItem('dp_gpu_ok')) return false; } catch {}
    const r = (window.GL16 && GL16.renderer && GL16.renderer()) || ''; return window.GL16 && !GL16.on && (!r || /swiftshader|llvmpipe|softpipe|software|basic render/i.test(r)) && !matchMedia('(pointer:coarse)').matches; };
  const edge = /Edg\//.test(navigator.userAgent), where = edge ? 'Settings, System and performance' : 'Settings, System';
  window.gpuOk20 = () => { try { localStorage.setItem('dp_gpu_ok', '1'); } catch {} document.getElementById('gpu20')?.remove(); };
  if (window.drawDrops) window.drawDrops = (function(o){ return function(...a){ const r = o.apply(this, a);
    setTimeout(() => { const m = document.getElementById('dmap'); if (!m || !soft() || document.getElementById('gpu20')) return;
      m.insertAdjacentHTML('beforeend', `<div class="gpu20" id="gpu20"><b>Zooming may stutter on this computer</b><span>Your browser isn't using the graphics chip. Turn it on in ${where}: <i>Use graphics acceleration when available</i>, then relaunch the browser.</span><button class="b2" onclick="gpuOk20()">Got it</button></div>`); }, 1500);
    return r; }; })(window.drawDrops);
})();
