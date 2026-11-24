// ---------- No Save button on a lead that already exists (23 Nov) ----------
// Notes and details save themselves when the panel closes. Save stays for a brand new lead ("Add lead")
// and in the follow up queue, where it is "Save and next".
function noSave11(id){ if(!id) return; const sv=document.getElementById('lead_save'); if(!sv) return; const row=sv.closest('.lsave');
  if(row&&!row.classList.contains('fqrow2')) row.remove(); }
window.openLead=(function(o){ return function(id,...a){ const r=o(id,...a); try{ noSave11(id); Promise.resolve(r).then(()=>setTimeout(()=>noSave11(id),0)); }catch(e){} return r; }; })(window.openLead);

// ---------- Typing without lag (23 Nov) ----------
// 1. Note boxes grow by themselves in browsers that can size a box to its text, so typing never makes the page
//    re-measure everything (the old way measured the whole page twice a keystroke). Others keep the old way,
//    but only shrink the box when text is deleted.
const FS14=typeof CSS!=='undefined'&&CSS.supports&&CSS.supports('field-sizing','content');
if(FS14) document.documentElement.classList.add('fs14');
window.growTA=function(t,e){ if(FS14||!t||!t.matches||!t.matches('textarea[data-grow]')) return;
  const cap=innerHeight*0.5, del=e&&/^delete/.test(e.inputType||'');
  if(del||!t.style.height){ t.style.height='auto'; }
  const h=t.scrollHeight+2; if(del||h>t.clientHeight+2||!t.style.height||t.style.height==='auto'){ t.style.height=Math.min(h,cap)+'px'; t.style.overflowY=h>cap?'auto':'hidden'; } };
// 2. Search shows results once per screen refresh however fast you type, instead of rebuilding the page on every key
window.runSearch=(function(o){ let raf14=0, last14=null; return function(q,pre,...a){ last14=[q,pre,...a];
  if(raf14) return; raf14=requestAnimationFrame(()=>{ raf14=0; const x=last14; last14=null; o(...x); }); }; })(window.runSearch);


// Someone rings back after being marked No answer: from search, "Change result" clears today's result
// and opens their call card so the real outcome and a note can go in
async function changeToday14(pid){
  const r=queue().find(x=>x.property_id===pid)||(S.rows||[]).find(x=>x.property_id===pid);
  const tc=r&&(r.history||[]).find(h=>h.id&&h.outcome===r.today_outcome);
  closeOv();
  if(tc) await undoToday(pid,tc.id);
  if(queue().some(x=>x.property_id===pid)){ go('calls'); open2(pid); } else toast('Open them from the call list to log the call');
}
window.openSearchProp=(function(orig){ return function(pid,inList){ orig(pid,inList);
  try{ const r=(S.sres?.calls||[]).find(x=>x.property_id===pid); if(!r||!r.today_outcome) return;
    const p=[...document.querySelectorAll('#sheet p')].find(x=>/^Called today:/.test(x.textContent)); if(!p) return;
    p.outerHTML=`<div class="ct14"><span>Called today: ${esc(LABEL[r.today_outcome]||r.today_outcome)}</span><button class="b2" onclick="changeToday14(${pid})">Change result</button></div>`;
  }catch{} }; })(window.openSearchProp);
// Keep the saved call's id on the row, so "Change result" works for calls logged earlier today, not just from the toast
window.record=(function(orig){ return async function(id,o,cb){ const r=await orig.apply(this,arguments);
  try{ if(r&&r.id){ const h={id:r.id,outcome:o,at:new Date().toISOString(),notes:null};
    [(S.rows||[]).find(x=>x.property_id===id),(S.callbacks||[]).find(x=>x.property_id===id)].forEach(x=>{ if(x){ x.history=(x.history||[]).filter(y=>y.id!==r.id); x.history.unshift(h); } }); } }catch{}
  return r; }; })(window.record);

// Page shape switches on <body> (24 Nov). These used to be CSS :has() rules on body and #main, which made Safari
// recheck the whole page on every keystroke (about 450ms a key on an Intel Mac). Now they are plain classes kept
// up to date after each change to the page; typing in a box never changes them.
(function(){
  const rules = [['h-ltab', '.ltab3'], ['h-lsheet', '#ov.show #sheet.lsheet'], ['h-dsplit', '#main.drops2 .dsplit'], ['h-setw', '#main .setw2'],
    ['h-dialer', '.wrap .dialer'], ['h-bd3', '.pg2 .bd3'], ['h-res2', '.pg2 .res2'], ['h-sg5', '.pg2 .sg5']];
  const sync = () => { const b = document.body; if (!b) return; for (const [c, sel] of rules){ const on = !!document.querySelector(sel); if (b.classList.contains(c) !== on) b.classList.toggle(c, on); } };
  new MutationObserver(ms => { for (const m of ms){ if (m.type === 'attributes' && m.target === document.body) continue; sync(); return; } })
    .observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  sync();
})();

// National public holidays named in the Telemarketing Standard, by their actual date (24 Nov). The holiday feed only lists
// the day off in lieu, so Boxing Day on Saturday 26 Dec 2026 would have been treated as a normal Saturday. No calls on either.
(function(){
  const easter = y => { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3),
    h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
    mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return Date.UTC(y, mo - 1, da); };
  const iso = t => new Date(t).toISOString().slice(0, 10);
  const fixed = key => { const y = +key.slice(0, 4), md = key.slice(5), e = easter(y);
    return ['01-01', '01-26', '04-25', '12-25', '12-26'].includes(md) || key === iso(e - 2 * 864e5) || key === iso(e + 864e5); };
  const orig = window.callDayOk;
  window.callDayOk = function(i){ return orig(i) && !fixed(i.key); };
  window.nationalHoliday = fixed;
})();

// Left panel tidy up (24 Nov): Add a person sits beside New call sheet as an icon button, and Booked call backs
// becomes an ordinary row at the top of Lists, so the top of the panel is one switch and one action row.
function railTidy14(){ const r = document.querySelector('.rail2'); if (!r || r.dataset.t14) return; r.dataset.t14 = 1;
  const top = r.querySelector('.rl5'), add = r.querySelector('.cbk.addp'), cb = top && top.querySelector('.cbk:not(.addp)'), head = r.querySelector('.rh5');
  if (top && add){ add.classList.add('ad14'); add.setAttribute('aria-label', 'Add a person'); top.classList.add('rl14'); }
  if (cb && head){ cb.classList.add('ls9', 'bk14'); const n = cb.querySelector('.rn5'); if (n) n.textContent = 'Booked for later';
    cb.insertAdjacentHTML('afterbegin', '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/></svg>');
    const today = r.querySelector('.ls9:not(.bk14)'); if (today && /Call backs/.test(today.textContent)) today.after(cb); else head.after(cb); }
}
window.drawList = (function(o){ return function(...a){ const x = o.apply(this, a); try { railTidy14(); } catch {} return x; }; })(window.drawList);
window.render = (function(o){ return function(...a){ const x = o.apply(this, a); try { railTidy14(); setTimeout(railTidy14, 0); } catch {} return x; }; })(window.render);

// Follow ups due (24 Nov): no more popup of names. The same small orange button as on the Leads page,
// phone and number, sits in the corner; tapping it calls the due leads one after another.
window.paintReminders = function(){ document.getElementById('rem2')?.remove(); const it = S.remind || []; if (!it.length || S.tab === 'leads') return;
  const n = it.length;
  document.body.insertAdjacentHTML('beforeend', `<button id="rem2" class="rem14" onclick="remGo14()" aria-label="${n} follow up${n === 1 ? '' : 's'} due, call them" title="${n} follow up${n === 1 ? '' : 's'} due. Tap to call them one after another">${ic2('phone', 18)}<span>${n}</span></button>`); };
function remGo14(){ document.getElementById('rem2')?.remove(); go('leads'); setTimeout(() => { try { fqStart(); } catch {} }, 250); }
window.go = (function(o){ return function(...a){ const x = o.apply(this, a); try { paintReminders(); } catch {} return x; }; })(window.go);

// Map credit (24 Nov): drop the Leaflet flag and name. The map data licence still needs a small OpenStreetMap credit.
(function mapCredit14(){ const go = () => { if (!window.L || !L.Map) return setTimeout(go, 300); L.Map.addInitHook(function(){ try { this.attributionControl && this.attributionControl.setPrefix(false); } catch {} }); }; go(); })();

// Card drop map speed (24 Nov).
// 1. Street lines draw on one canvas instead of thousands of separate shapes, and the canvas gives each line
//    a wide tap area, so the second invisible copy of every street is no longer needed.
// 2. Each layer (Pins, Heat, Streets) is built once and kept. Turning a filter on or off just shows or hides it;
//    a layer is only rebuilt when the addresses, the dropped marks, the Top N or the street colours change.
window.widen5 = function(){};
window.L_streetCanvas14 = null;
window.drawStreetLayer = (function(orig){ return function(){
  if (!window.L) return orig();
  const P = L.polyline;
  window.L_streetCanvas14 = window.L_streetCanvas14 || L.canvas({ padding: 0.3, tolerance: 10 });
  L.polyline = function(ll, o){ return P(ll, Object.assign({ renderer: window.L_streetCanvas14, smoothFactor: 1.5 }, o || {})); };
  try { return orig(); } finally { L.polyline = P; }
}; })(window.drawStreetLayer);
window.toggleDrop = (function(o){ return function(...a){ S._dver14 = (S._dver14 || 0) + 1; return o.apply(this, a); }; })(window.toggleDrop);
window.drawDropLayer = (function(orig){ return function(){
  if (!S.map || !window.L) return orig();
  const sig = v => [S._dver14 || 0, S.dtop || 0, v === 'streets' ? [...streetShown()].sort().join() : ''].join('|');
  if (S.map !== S._c14map || S._c14drops !== S.drops || S._c14streets !== S.streets){ S._c14 = {}; S._c14map = S.map; S._c14drops = S.drops; S._c14streets = S.streets; }
  const C = S._c14, all = lays5();
  if (S.dlay){ try { S.map.removeLayer(S.dlay); } catch {} S.dlay = null; }
  Object.values(C).forEach(c => { try { S.map.removeLayer(c.l); } catch {} });
  const want = ['heat', 'streets', 'pins'].filter(v => all.has(v)), shown = [];
  for (const v of want){
    if (!C[v] || C[v].sig !== sig(v)){
      S.dlays = new Set([v]);              // build just this one layer with the existing code
      try { orig(); } finally { S.dlays = all; }
      if (S.dlay){ try { S.map.removeLayer(S.dlay); } catch {} C[v] = { l: S.dlay, sig: sig(v) }; S.dlay = null; } else delete C[v];
    }
    if (C[v]) { C[v].l.addTo(S.map); shown.push(C[v].l); }
  }
  S.dlay = L.layerGroup(shown).addTo(S.map); S.dlayer = want[0] || 'pins';
  if (S.walk) S.map.removeLayer(S.dlay);
  try { dfBtn5(); } catch {}
}; })(window.drawDropLayer);

// Map filter panel, compact (24 Nov): no Done or Reset footer (tap the map or Filters to close, Clear all resets),
// map style and street colours as small toggles, shorter rows.
window.dfHTML5 = function(){ const m = mx5();
  const nPipe = (S.pipe || []).filter(x => x.lat != null && ['appraisal', 'listed'].includes(x.stage)).length, nSales = S.rsales ? S.rsales.length : null;
  const byId = new Map((S.drops || []).map(d => [d.id, d]));
  const nDrop = (S.streets || []).filter(st => { const ids = st.ids || []; return ids.length && ids.every(id => { const x = byId.get(id); return x && isDropped(x); }); }).length;
  const row = (k, l, n) => `<label class="dfr5"><input type="checkbox" ${m[k] ? 'checked' : ''} onchange="mx5().${k}=this.checked;mxSave5();mapExtras3();dfRefresh5()"><span>${l}${n != null ? ` <em>${n}</em>` : ''}</span></label>`;
  const col = { most: STREET_TIERS[0][2], likely: STREET_TIERS[1][2], some: STREET_TIERS[2][2], done: '#9aa3ad', rest: '#c9ced4' };
  return `<div class="dfp5 dfc14" role="dialog" aria-label="Map filters">
   <div class="dfh5"><b>Map</b><button class="dfx5" onclick="S.mx={...MX5_DEF};mxSave5();layReset5()">Clear all</button><button class="dfq14" onclick="popClose5()" aria-label="Close">${ic2('x', 16)}</button></div>
   <div class="dft5">${[['pins', 'Pins'], ['heat', 'Heat'], ['streets', 'Streets']].map(([v, l]) => `<button class="${lays5().has(v) ? 'on' : ''}" aria-pressed="${lays5().has(v)}" onclick="layToggle5('${v}')">${l}</button>`).join('')}</div>
   ${lays5().has('streets') ? `<div class="dtr5">${STREET_KEYS.map(k => `<button class="${streetShown().has(k) ? 'on' : ''}" aria-pressed="${streetShown().has(k)}" onclick="toggleTier('${k}');dfRefresh5()"><i style="background:${col[k]}"></i>${STREET_LABELS[k]}</button>`).join('')}</div>` : ''}
   <div class="dfb5x">${row('pipe', 'Our appraisals and listings', nPipe)}${row('sales', 'Recent sales', nSales)}${row('dropped', 'Dropped dates', nDrop)}</div></div>`; };

// Best streets list (24 Nov): rank, street, suburb and letterboxes, with a plain Dropped button.
window.drawBest = function(){
  const el = document.getElementById('best'); if (!el) return;
  const gs = dropGroups(S.dgroup).slice(0, 12); S._best = gs;
  el.innerHTML = gs.length ? gs.map((g, i) => { const [st, ...rest] = String(g.k).split(', '), sub = rest.join(', '), n = g.ids.length;
    return `<div class="bs14"><button class="bsm14" onclick="zoomBest(${i})" aria-label="Show ${esc(g.k)} on the map"><span class="bsn14">${i + 1}</span><span class="bst14"><b>${esc(st)}</b><em>${sub ? esc(sub) + ', ' : ''}${n} letterbox${n === 1 ? '' : 'es'}</em></span></button>
      <button class="bsd14" onclick="toggleDrop(S._best[${i}].ids,false)" aria-label="Mark ${esc(g.k)} dropped">${ic2('check', 16)}<span>Dropped</span></button></div>`; }).join('')
    : `<p class="emptyline">Everything has been dropped in the last ${DROP_DAYS} days.</p>`; };

// Tapping a street in the list (24 Nov): zoom to it and light it up, a thick blue line along the street
// with a white edge so it stands out on any map, plus a dot on every letterbox still to drop. It stays until another
// street is tapped or the map is tapped.
window.zoomBest = function(i){ const g = (S._best || [])[i]; if (!S.map || !g) return;
  if (S.hi14){ try { S.map.removeLayer(S.hi14); } catch {} S.hi14 = null; }
  const ls = [], one = (S.streets || []).filter(st => `${st.street}, ${st.suburb}` === g.k), paths = (one.length ? one : (S.streets || []).filter(st => st.suburb === g.k)).flatMap(st => st.paths || []).map(p => p.map(([x, y]) => [y, x]));
  const wide = !one.length; paths.forEach(p => ls.push(L.polyline(p, { color: '#fff', weight: wide ? 9 : 14, opacity: .9, lineCap: 'round', lineJoin: 'round', interactive: false })));
  paths.forEach(p => ls.push(L.polyline(p, { color: '#2563eb', weight: wide ? 5 : 8, opacity: 1, lineCap: 'round', lineJoin: 'round', interactive: false })));
  S.hi14 = L.layerGroup(ls).addTo(S.map);
  const b = L.latLngBounds(paths.length ? paths.flat() : (g.pts || []));
  if (b.isValid()) S.map.flyToBounds(b, { padding: [60, 60], maxZoom: 17, duration: .6 });
  if (!S.hi14on){ S.hi14on = 1; S.map.on('click', () => { if (S.hi14){ S.map.removeLayer(S.hi14); S.hi14 = null; document.querySelectorAll('.bs14.on').forEach(x => x.classList.remove('on')); } }); }
  document.querySelectorAll('.bs14').forEach((x, j) => x.classList.toggle('on', j === i));
  if (innerWidth < 900) scrollTo({ top: 0, behavior: 'smooth' }); };
// Leaflet name off as soon as the map library loads, before any map is made
window.loadLeaflet = (function(o){ return function(...a){ return Promise.resolve(o.apply(this, a)).then(r => { try { if (!L.__p14){ L.__p14 = 1; L.Map.addInitHook(function(){ this.attributionControl && this.attributionControl.setPrefix(false); }); } if (S.map && S.map.attributionControl) S.map.attributionControl.setPrefix(false); } catch {} return r; }); }; })(window.loadLeaflet);

// Leads table (24 Nov): name with the address under it, type as a small tag, a short due date
// ("32 days late" under the Overdue heading), last spoke, and the text and call buttons. No lines between columns.
window.leadsTable3 = function(ls){
  const G = [['Overdue', 'od', n => n !== null && n < 0], ['Today', 'td', n => n === 0], ['Next 7 days', '', n => n > 0 && n <= 7], ['Later', '', n => n > 7], ['No follow up date', '', n => n === null]];
  const addr = l => [l.address, l.suburb].filter(Boolean).join(', ');
  const due = l => { const n = dueIn(l.follow_up); const t = n === null ? 'No date' : n < 0 ? `${-n} day${n === -1 ? '' : 's'} late` : n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : dayK3(l.follow_up);
    return `<b class="due3 ${n === null ? 'q' : n < 0 ? 'od' : n === 0 ? 'td' : ''}">${esc(t)}</b>`; };
  const btns = l => l.phone ? `<a href="${smsLink(l.phone, '')}" onclick="event.stopPropagation()" aria-label="Text ${esc(leadTitle(l))}">${ic2('msg', 17)}</a><a class="call" href="tel:${esc(telOf(l.phone))}" onclick="event.stopPropagation()" aria-label="Call ${esc(leadTitle(l))}">${ic2('phone', 17)}</a>` : '<i class="np14">No number</i>';
  return `<div class="ltab3 l14"><div class="lt3 h"><span>Lead</span><span class="t14">Type</span><span>Follow up</span><span class="c3">Last spoke</span><span class="c3"></span></div>${G.map(([g, c, f]) => { const xs = ls.filter(l => f(dueIn(l.follow_up))); if (!xs.length) return '';
    return `<div class="lgb3 ${c}"><i></i><b>${g}</b><span>${xs.length}</span></div>` + xs.map(l => { const t = ltype3(l), a = addr(l);
      return `<div class="lt3${S.ol && S.ol.id === l.id && $('#ov').classList.contains('show') ? ' sel' : ''}" data-id="${l.id}" onclick="openLead(${l.id})" data-lq="${esc([l.name, l.address, l.suburb, l.phone].join(' ').toLowerCase())}">
      <span class="n3"><span class="nn14"><b>${esc(leadTitle(l))}</b>${nwm3(l)}</span>${a ? `<em class="na14">${esc(a)}</em>` : ''}</span><span class="t14"><em class="tg14 ${t === 'Buyer' ? 'by' : ''}">${t}</em></span><span>${due(l)}</span><span class="c3">${l.last_contact ? esc(dayMon(l.last_contact)) : '<i>Never</i>'}</span><span class="c3 b3">${btns(l)}</span></div>`; }).join(''); }).join('')}</div>`; };

// Map zoom: Leaflet's own settings (a smoother zoom was tried 24 Nov and felt worse, so it was taken out)

// Today's counter (24 Nov).
// 1. "Change result" took a call off the count but left the appraisal and connected counts as they were.
window.undoToday = (function(o){ return async function(pid, callId){ const row = (S.rows || []).find(x => x.property_id === pid), cb = (S.callbacks || []).find(x => x.property_id === pid);
  const was = (row && row.today_outcome) || (cb && cb.today_outcome) || null; const before = S.ov ? S.ov.today_calls : null;
  const r = await o.apply(this, arguments);
  if (S.ov && before !== null && S.ov.today_calls < before && was){ if (was !== 'no_answer') S.ov.today_connected = Math.max(0, (S.ov.today_connected || 0) - 1); if (was === 'appraisal') S.ov.today_appraisals = Math.max(0, (S.ov.today_appraisals || 0) - 1); drawProg(); }
  return r; }; })(window.undoToday);
// 2. Calls made on another device (phone and computer both open) now show when she comes back to this one,
//    and every minute while the Calls page is open.
async function today14(){ if (DEMO || !S.token || !S.ov || document.visibilityState !== 'visible') return; try { const t = await api('today'); if (t && typeof t.today_calls === 'number'){ Object.assign(S.ov, t); drawProg(); } } catch {} }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') today14(); });
setInterval(() => { if (S.tab === 'calls') today14(); }, 60000);

// Leads table v2 (24 Nov): who, what to talk about, when, how long since.
// About them: a buyer's budget, beds and suburbs; a seller's latest note. Hot leads first in each group with a red mark.
function ago14(iso){ if (!iso) return 'Not yet'; const d = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
  if (d <= 0) return 'Today'; if (d === 1) return 'Yesterday'; if (d < 7) return d + ' days ago'; if (d < 30){ const w = Math.round(d / 7); return w + (w === 1 ? ' week ago' : ' weeks ago'); }
  if (d < 365){ const m = Math.round(d / 30.4); return m + (m === 1 ? ' month ago' : ' months ago'); } const y = Math.round(d / 365); return y + (y === 1 ? ' year ago' : ' years ago'); }
function about14(l){ const b = l.buy || {};
  if (hasCriteria(b)){ const p = [];
    if (b.max || b.min) p.push(b.min && b.max ? `${money(b.min)} to ${money(b.max)}` : b.max ? `up to ${money(b.max)}` : `from ${money(b.min)}`);
    if (b.beds) p.push(`${b.beds}+ bed`); if ((b.suburbs || []).length) p.push(b.suburbs.slice(0, 2).join(', ') + (b.suburbs.length > 2 ? ` +${b.suburbs.length - 2}` : ''));
    return { t: 'Buyer', x: p.join(', ') || 'Wants not filled in yet' }; }
  const n = ((l.notes || [])[0] || {}).body || l.motivation || '';
  return { t: 'Seller', x: n ? n.replace(/\s+/g, ' ').trim() : 'No notes yet', none: !n }; }
const TORD14 = { Hot: 0, Warm: 1, Nurture: 2, Cold: 3 };
window.leadsTable3 = function(ls){
  const G = [['Overdue', 'od', n => n !== null && n < 0], ['Today', 'td', n => n === 0], ['Next 7 days', '', n => n > 0 && n <= 7], ['Later', '', n => n > 7], ['No follow up date', '', n => n === null]];
  const addr = l => [l.address, l.suburb].filter(Boolean).join(', ');
  const due = l => { const n = dueIn(l.follow_up); const t = n === null ? 'No date' : n < 0 ? `${-n} day${n === -1 ? '' : 's'} late` : n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : dayK3(l.follow_up);
    return `<b class="due3 ${n === null ? 'q' : n < 0 ? 'od' : n === 0 ? 'td' : ''}">${esc(t)}</b>`; };
  const btns = l => l.phone ? `<a href="${smsLink(l.phone, '')}" onclick="event.stopPropagation()" aria-label="Text ${esc(leadTitle(l))}" title="Text">${ic2('msg', 17)}</a><a class="call" href="tel:${esc(telOf(l.phone))}" onclick="event.stopPropagation()" aria-label="Call ${esc(leadTitle(l))}" title="Call">${ic2('phone', 17)}</a>` : '<i class="np14">No number</i>';
  const ord = (a, b) => (TORD14[a.temperature] ?? 1.5) - (TORD14[b.temperature] ?? 1.5) || (a.follow_up || '9999').localeCompare(b.follow_up || '9999');
  return `<div class="ltab3 l14 l15"><div class="lt3 h"><span>Lead</span><span>About them</span><span>Follow up</span><span class="c3">Last spoke</span><span class="c3"></span></div>${G.map(([g, c, f]) => { const xs = ls.filter(l => f(dueIn(l.follow_up))).sort(ord); if (!xs.length) return '';
    return `<div class="lgb3 ${c}"><i></i><b>${g}</b><span>${xs.length}</span></div>` + xs.map(l => { const a = addr(l), ab = about14(l), hot = l.temperature === 'Hot';
      return `<div class="lt3${S.ol && S.ol.id === l.id && $('#ov').classList.contains('show') ? ' sel' : ''}" data-id="${l.id}" onclick="openLead(${l.id})" data-lq="${esc([l.name, l.address, l.suburb, l.phone].join(' ').toLowerCase())}">
      <span class="n3"><span class="nn14">${hot ? '<i class="hot15" title="Hot lead" aria-label="Hot lead"></i>' : ''}<b>${esc(leadTitle(l))}</b>${nwm3(l)}</span>${a ? `<em class="na14">${esc(a)}</em>` : ''}</span>
      <span class="ab15"><em class="tg14 ${ab.t === 'Buyer' ? 'by' : ''}">${ab.t}</em><span class="${ab.none ? 'q15' : ''}" title="${esc(ab.x)}">${esc(ab.x)}</span></span>
      <span>${due(l)}</span><span class="c3 ls15${l.last_contact ? '' : ' q15'}">${esc(ago14(l.last_contact))}</span><span class="c3 b3">${btns(l)}</span></div>`; }).join(''); }).join('')}</div>`; };

// Marking a whole suburb (or any big group) dropped asks first, since one tap could mark thousands of letterboxes
window.toggleDrop = (function(o){ return async function(ids, undo){ if (!undo && (ids || []).length > 60 && !(await uiAsk(`Mark all ${ids.length.toLocaleString('en-AU')} letterboxes dropped?`, { ok: 'Yes, all dropped' }))) return; return o.apply(this, arguments); }; })(window.toggleDrop);
// Streets / Suburbs tabs show which one is picked (the new list dropped this)
window.drawBest = (function(o){ return function(...a){ const r = o.apply(this, a);
  document.querySelectorAll('button').forEach(b => { const t = b.textContent.trim(); if (t !== 'Streets' && t !== 'Suburbs') return; const sib = [...b.parentElement.children].map(x => x.textContent.trim()); if (!sib.includes('Streets') || !sib.includes('Suburbs')) return;
    const on = (t === 'Streets') === (S.dgroup !== 'suburb'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  return r; }; })(window.drawBest);

// Card drop pins easier to see (24 Nov): solid blue with a white ring, a bit bigger. Dropped ones stay grey.
window.pinR = function(base){ return Math.max(3.5, base * pinScale() * 1.45); };
function pinStyle14(g){ try { g.eachLayer(function st(m){ if (m.eachLayer) return m.eachLayer(st); if (!m.setStyle || m.options.base == null) return;
  const dropped = m.options.fillColor === '#c9ced4' || m.options._d14 === 1; m.options._d14 = dropped ? 1 : 0;
  m.setStyle(dropped ? { color: '#ffffff', weight: 1, fillColor: '#9aa3ad', fillOpacity: .75 } : { color: '#ffffff', weight: 1.5, fillColor: '#2563eb', fillOpacity: 1 }); m.setRadius(pinR(m.options.base)); }); } catch {} }
// Pins grow as you zoom in: walk into the grouped layers too
window.resizePins = function(){ if (!S.dlay || !S.dlay.eachLayer) return; S.dlay.eachLayer(function rz(m){ if (m.eachLayer) return m.eachLayer(rz); if (m.setRadius && m.options.base != null) m.setRadius(pinR(m.options.base)); }); };
window.drawDropLayer = (function(o){ return function(...a){ const r = o.apply(this, a); if (S._c14 && S._c14.pins && !S._c14.pins._st14){ pinStyle14(S._c14.pins.l); S._c14.pins._st14 = 1; } return r; }; })(window.drawDropLayer);

// Plan a walk lives with the list (24 Nov), next to Streets and Suburbs. Tapping it swaps the list for the suburbs
// to walk; picking one draws the walk and brings the list back. While a walk is showing, the button becomes Clear walk.
function walkBtn14(){ const top = document.querySelector('.dside > .dsh5') || document.querySelector('.dside > .top'); if (!top) return;
  let b = top.querySelector('.wk14'); if (!b){ top.insertAdjacentHTML('beforeend', `<button class="wk14" onclick="walkTap14()"></button>`); b = top.querySelector('.wk14'); }
  const open = !!document.querySelector('.wkl14');
  b.innerHTML = (S.walk || S.gl16walk) ? `${ic2('x', 15)}<span>Clear walk</span>` : `${ic2('pin', 15)}<span>Plan a walk</span>`;
  b.classList.toggle('on', open || !!S.walk || !!S.gl16walk); b.setAttribute('aria-expanded', open); }
function walkTap14(){ if (S.walk || S.gl16walk){ walkClear3(); walkBtn14(); return; } const box = document.getElementById('best'); if (!box) return;
  if (document.querySelector('.wkl14')){ drawBest(); return; }
  const subs = walkSubs3().slice(0, 12);
  box.innerHTML = `<div class="wkl14"><div class="wkh14"><b>Pick a suburb to walk</b><button onclick="drawBest()">Cancel</button></div><p>About an hour, the best 8 streets in a loop.</p>
    ${subs.map(o => `<button class="wkr14" data-s="${esc(o.sub)}" onclick="walkGo5(this.dataset.s);drawBest()"><span>${esc(o.sub)}</span><em>${Math.min(8, o.n)} streets</em>${ic2('chev', 14)}</button>`).join('') || '<p>No streets to walk yet</p>'}</div>`;
  walkBtn14(); }
window.drawBest = (function(o){ return function(...a){ const r = o.apply(this, a); walkBtn14(); return r; }; })(window.drawBest);
window.walkClear3 = (function(o){ return function(...a){ const r = o.apply(this, a); setTimeout(walkBtn14, 0); return r; }; })(window.walkClear3);
window.walk3 = (function(o){ return async function(...a){ const r = await o.apply(this, a); setTimeout(walkBtn14, 0); return r; }; })(window.walk3);
window.dfBtn5 = (function(o){ return function(...a){ const r = o.apply(this, a); try { walkBtn14(); } catch {} return r; }; })(window.dfBtn5);

// Card drop list (24 Nov): a checklist for walking. Each house is a row with a tick circle; tap the row to tick it.
// The reason is split into how long they've owned it and a small tag ("Prime selling window"). Each street says how
// many are left and has a quiet "Tick all". Dropped houses sink to the bottom of their street, struck through.
window.dropListHTML = function(){
  const bySub = new Map();
  for (const x of dropRows()){ const s = x.suburb || 'Unknown', st = x.street || 'Unknown'; if (!bySub.has(s)) bySub.set(s, new Map()); const m = bySub.get(s); if (!m.has(st)) m.set(st, []); m.get(st).push(x); }
  const num = x => parseInt(String(x.house_number || '').replace(/^.*\//, '')) || 0, unitN = x => parseInt(x.unit) || 0;
  const big = dropRows().length > 1500;
  const why = x => { const r = String((x.reasons || [])[0] || ''); const m = r.match(/^(.*?)\s*\(([^)]+)\)\s*$/); const main = (m ? m[1] : r).replace(/\byrs\b/, 'years').replace(/\byr\b/, 'year'); const tag = m ? m[2] : '';
    return `${main ? `<span class="dw16">${esc(main)}</span>` : ''}${tag ? `<em class="dg16">${esc(tag[0].toUpperCase() + tag.slice(1))}</em>` : ''}`; };
  return `<div class="dl16">` + [...bySub.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([sub, m]) => {
    const tot = [...m.values()].reduce((a, xs) => a + xs.length, 0), left = [...m.values()].reduce((a, xs) => a + xs.filter(x => !isDropped(x)).length, 0);
    const streets = [...m.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([st, xs]) => {
      xs.sort((a, b) => (isDropped(a) - isDropped(b)) || num(a) - num(b) || unitN(a) - unitN(b));
      const ids = xs.filter(x => !isDropped(x)).map(x => x.id);
      return `<section class="ds16"><div class="dsh16"><b>${esc(st)}</b><span>${ids.length ? `${ids.length} to drop` : 'All dropped'}</span>${ids.length > 1 ? `<button class="noprint" onclick="toggleDrop([${ids}],false)">Tick all</button>` : ''}</div>` +
        xs.map(x => { const d = isDropped(x), n = [x.unit && x.unit + '/', x.house_number].filter(Boolean).join('') || '?';
          return `<button class="dr16${d ? ' on' : ''}" onclick="toggleDrop([${x.id}],${d})" aria-pressed="${d}" aria-label="${esc(n + ' ' + st)}${d ? ', dropped, tap to undo' : ', tap when dropped'}"><i class="dc16">${d ? ic2('check', 14) : ''}</i><b>${esc(n)}</b><span class="dx16">${why(x)}</span></button>`; }).join('') + `</section>`; }).join('');
    return big ? `<details class="dsub16"><summary><b>${esc(sub)}</b><span>${left} of ${tot} to drop</span></summary>${streets}</details>` : `<div class="dsub16"><h3><b>${esc(sub)}</b><span>${left} of ${tot} to drop</span></h3>${streets}</div>`; }).join('') + `</div>`; };

// Smooth scroll zoom (24 Nov, second try). Leaflet's own scroll zoom jumps a level at a time. This glides toward the
// target zoom every frame, keeps the spot under the mouse still, and keeps the same sensitivity: one mouse wheel notch
// is about one zoom level, and a trackpad pinch follows the fingers. Touch pinch on phones is untouched (already smooth).
function smoothWheel14(){ if (!window.L || L.__sw14) return; L.__sw14 = 1;
  // How it works, the same way Leaflet's own phone pinch works: while you scroll, the map and every layer only scale
  // (cheap, no redrawing, no new map tiles), easing toward where you are heading. The heat map is scaled along with it.
  // Once you stop, the map settles once: fresh tiles load and the pins, streets and heat redraw sharp.
  const H = L.Handler.extend({
    addHooks(){ L.DomEvent.on(this._map._container, 'wheel', this._wheel, this); },
    removeHooks(){ L.DomEvent.off(this._map._container, 'wheel', this._wheel, this); this._end(true); },
    _wheel(e){ const m = this._map;
      let d = e.deltaY; if (e.deltaMode === 1) d *= 20; else if (e.deltaMode === 2) d *= 300;
      d = Math.max(-150, Math.min(150, d));
      // one mouse notch is a level, 60px of trackpad scroll is a level, a trackpad pinch follows the fingers
      const step = e.ctrlKey ? d / 30 : Math.sign(d) * Math.min(Math.abs(d) / 60, 1);
      if (!this._on) this._start();
      this._mouse = m.mouseEventToContainerPoint(e); this._anchor = m.containerPointToLatLng(this._mouse);
      this._goal = Math.max(m.getMinZoom(), Math.min(m.getMaxZoom(), this._goal - step));
      this._lastIn = performance.now();
      L.DomEvent.preventDefault(e); L.DomEvent.stopPropagation(e); },
    _start(){ const m = this._map; this._on = true; m._container.classList.add('sw14'); m._stop(); this._goal = m.getZoom(); this._moved = false; this._t = performance.now();
      this._heat = []; m.eachLayer(l => { if (l._heat && l._canvas){ this._heat.push(l); l.__to14 = l._canvas.style.transformOrigin; l._canvas.style.transformOrigin = '0 0'; } });   // the heat library scales from its middle; ours from the corner
      this._tl = m.containerPointToLatLng([0, 0]); this._z0 = m.getZoom();
      this._raf = requestAnimationFrame(t => this._step(t)); },
    _step(now){ const m = this._map; if (!this._on) return;
      const dt = Math.min(64, now - this._t); this._t = now;
      const z0 = m.getZoom(), diff = this._goal - z0;
      if (Math.abs(diff) > 0.0015){
        const z = Math.abs(diff) < 0.004 ? this._goal : z0 + diff * (1 - Math.exp(-dt / 75));   // eases the same at any frame rate
        const off = this._mouse.subtract(m.getSize().divideBy(2));
        const c = m.unproject(m.project(this._anchor, z).subtract(off), z);
        if (!this._moved){ m._moveStart(true, false); this._moved = true; }
        m._move(c, z, { pinch: true, round: false });       // pinch: tiles scale, no new tiles mid zoom
        const sc = m.getZoomScale(z, this._z0), tl = m.latLngToLayerPoint(this._tl);
        this._heat.forEach(l => { try { L.DomUtil.setTransform(l._canvas, tl, sc); } catch {} });
      } else if (now - this._lastIn > 140){ this._end(); return; }
      this._raf = requestAnimationFrame(t => this._step(t)); },
    _end(quiet){ if (!this._on) return; this._on = false; cancelAnimationFrame(this._raf); this._map._container.classList.remove('sw14');
      const m = this._map; (this._heat || []).forEach(l => { try { l._canvas.style.transformOrigin = l.__to14 || ''; } catch {} }); if (!this._moved || quiet) return;
      // keep a copy of how the pins, streets and heat look right now, redraw them sharp underneath, then fade the copy
      const ghosts = []; try { m.getPanes().overlayPane.querySelectorAll('canvas').forEach(c => { if (!c.width || !c.height || c.classList.contains('sw14g')) return;
        const k = document.createElement('canvas'); k.width = c.width; k.height = c.height; k.getContext('2d').drawImage(c, 0, 0);
        k.style.cssText = c.style.cssText; k.style.pointerEvents = 'none'; k.className = c.className + ' sw14g'; c.after(k); ghosts.push(k); }); } catch {}
      m._move(m.getCenter(), m.getZoom());                  // settle: tiles for this zoom load
      m._moveEnd(true);                                      // pins, streets and heat redraw once
      requestAnimationFrame(() => requestAnimationFrame(() => { ghosts.forEach(k => { k.style.transition = 'opacity .2s ease-out'; k.style.opacity = '0'; }); setTimeout(() => ghosts.forEach(k => k.remove()), 280); })); }
  });
  L.Map.addInitHook(function(){ this.options.scrollWheelZoom = false; if (this.scrollWheelZoom) this.scrollWheelZoom.disable(); this.addHandler('smoothWheel14', H); this.smoothWheel14.enable(); });
  window.__swH14 = H; }
function smoothOn14(m){ try { if (!m || m.smoothWheel14) return; m.scrollWheelZoom && m.scrollWheelZoom.disable(); m.addHandler('smoothWheel14', window.__swH14); m.smoothWheel14.enable(); } catch {} }
window.loadLeaflet = (function(o){ return function(...a){ return Promise.resolve(o.apply(this, a)).then(r => { try { smoothWheel14(); smoothOn14(S.map); } catch {} return r; }); }; })(window.loadLeaflet);

// Call screen, new style (24 Nov). Signs as one quiet list with a strength tag; unknown facts ("?") hidden.
function callTidy15(){ const c = document.querySelector('.cl2'); if (!c) return;
  c.querySelectorAll('.wc2').forEach(w => { const em = w.querySelector('em'); if (!em || em.dataset.s15) return; const t = em.textContent.trim().toLowerCase();
    em.dataset.s15 = t.startsWith('strong') ? 'strong' : t.startsWith('some') ? 'some' : 'weak'; });
  const wl = c.querySelector('.wl2'); if (wl && !wl.dataset.o15){ wl.dataset.o15 = 1; const R = { strong: 0, some: 1, weak: 2 }; [...wl.querySelectorAll('.wc2')].sort((a, b) => R[a.querySelector('em')?.dataset.s15 || 'weak'] - R[b.querySelector('em')?.dataset.s15 || 'weak']).forEach(x => wl.appendChild(x)); }
  document.querySelectorAll('.cr2 .facts2 .attr2').forEach(a => { const b = a.querySelector('b'); if (b && b.textContent.trim() === '?') a.remove(); });
  document.querySelectorAll('.cr2 .facts2').forEach(f => { if (!f.querySelector('.attr2')) f.remove(); }); }
window.drawCall2 = (function(o){ return function(...a){ const r = o.apply(this, a); try { callTidy15(); } catch {} return r; }; })(window.drawCall2);
new MutationObserver(() => { if (window.__ct15) return; window.__ct15 = 1; requestAnimationFrame(() => { window.__ct15 = 0; if (document.querySelector('.cl2 .wc2 em:not([data-s15]), .cr2 .facts2')) callTidy15(); }); }).observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
