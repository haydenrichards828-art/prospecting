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
