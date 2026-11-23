// ---------- Card drops: one toolbar, map and list fill the screen, maps can go full screen ----------
function dropsTidy5(){ try{
  const top=document.querySelector('#main > .top'); if(!top||!top.querySelector('.dfb2')&&!top.classList.contains('dtb5')) return;
  // Map / List lives in the top bar beside the page name
  const head=document.querySelector('header.top2'), vs=[...top.querySelectorAll('.seg')].find(g=>/^Map/.test(g.textContent.trim()));
  if(head&&vs&&innerWidth>=900){ head.querySelectorAll('.dvw5').forEach(x=>x.remove()); vs.classList.add('lift5','dvw5'); head.querySelector('.tabbtn')?.after(vs);
    if(!document.querySelector('#main .l5mark')) document.getElementById('main').insertAdjacentHTML('afterbegin','<i class="l5mark" hidden></i>'); }
  if(!document.querySelector('.dsplit')){ // list view: print and download go in the top bar, nothing else is needed here
    top.querySelector('h1.pt2')?.remove(); top.querySelector('.dfb2')?.remove(); document.querySelectorAll('#main > .dflt2').forEach(x=>x.remove());
    if(head&&innerWidth>=900){ const srch=head.querySelector('.tsearch'); top.querySelectorAll('.iconbtn').forEach(b=>{ b.classList.add('lift5','dic5'); srch?srch.before(b):head.appendChild(b); }); }
    if(!top.querySelector('button,.seg')) top.remove();
    return; }
  if(!top.querySelector('.dfb2')) return; top.classList.add('dtb5');
  top.classList.add('dtb5'); top.querySelector('h1.pt2')?.remove();
  const sideTop=document.querySelector('.dside > .top'); const g=sideTop?.querySelector('.seg');
  // Streets / Suburbs only changes the list, so it heads the list
  const side=document.querySelector('.dside');
  if(g&&side&&!side.querySelector('.dgrp5')){ g.classList.add('dgrp5'); const h=document.createElement('div'); h.className='dsh5'; h.appendChild(g); side.prepend(h); }
  sideTop?.remove();
  if(!top.querySelector('.seg:not(.dgrp5), .iconbtn, button:not(.dfb2)')) top.classList.add('dtb5e');
  top.querySelector('.dfb2')?.remove();
  dfBtn5(); fitDrops5();
}catch(e){ console.error(e); } }
function fitDrops5(){ const m=$('#dmap'), s=document.querySelector('.dside'); if(!m||innerWidth<1000) { if(m) m.style.height=''; if(s) s.style.maxHeight=''; return; }
  const h=Math.max(320,innerHeight-m.getBoundingClientRect().top); m.style.height=h+'px'; if(s){ s.style.height=h+'px'; s.style.maxHeight=h+'px'; s.style.overflow='auto'; }
  try{ S.map&&S.map.invalidateSize(); }catch{} }
addEventListener('resize',()=>{ if(S.tab==='drops') fitDrops5(); });
// Card drops: tidy toolbar, full screen and map controls
window.drawDrops=(function(orig){ return function(...a){ const r=orig(...a); dropsTidy5(); mapFsBtn5('dmap',()=>S.map); mapCtl5(); return r; }; })(window.drawDrops);
// Card drops list: tidy after each redraw
window.drawBest=(function(orig){ return function(...a){ const r=orig(...a); dropsTidy5(); return r; }; })(window.drawBest);
// Full screen for any map: the button sits on the map; Esc or the same button comes back
function mapFsBtn5(id,getMap){ let n=0; const t=setInterval(()=>{ const el=document.getElementById(id); if(!el||++n>40){ clearInterval(t); return; }
  if(!el.classList.contains('leaflet-container')) return; clearInterval(t); if(el.querySelector('.mfs5')) return;
  el.insertAdjacentHTML('beforeend',`<button class="mfs5" aria-label="Full screen map" title="Full screen" onclick="event.stopPropagation();mapFs5('${id}')">${FS5_IN}</button>`);
  L.DomEvent.disableClickPropagation(el.querySelector('.mfs5')); el._fsMap=getMap; },75); }
const FS5_IN='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
const FS5_OUT='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
function mapFs5(id){ const el=document.getElementById(id); if(!el) return; const on=!el.classList.contains('mfull5');
  el.classList.toggle('mfull5',on); document.body.classList.toggle('mfs5on',on); const b=el.querySelector('.mfs5'); if(b){ b.innerHTML=on?FS5_OUT:FS5_IN; b.setAttribute('aria-label',on?'Leave full screen':'Full screen map'); }
  [0,120,350].forEach(t=>setTimeout(()=>{ try{ el._fsMap&&el._fsMap()?.invalidateSize(); }catch{} },t)); }
addEventListener('keydown',e=>{ if(e.key==='Escape'){ const f=document.querySelector('.mfull5'); if(f){ e.stopPropagation(); mapFs5(f.id); } } },true);
// The call sheet map gets the same button
window.areaSheet=(function(orig){ return async function(pid){ const r=await orig(pid); mapFsBtn5('ar3m',()=>S.area3?.map); return r; }; })(window.areaSheet);

// Card drop map controls float on the map, like Google Maps: Plan a walk and Filters top left, full screen top right
const MX5_DEF={sales:false,pipe:true,dropped:true};
function mx5(){ if(!S.mx){ try{ S.mx={...MX5_DEF,...JSON.parse(localStorage.getItem('dp_mx')||'{}')}; }catch{ S.mx={...MX5_DEF}; } } return S.mx; }
function mxSave5(){ try{ localStorage.setItem('dp_mx',JSON.stringify(S.mx)); }catch{} }
function dfActive5(){ const m=mx5(), L5=lays5(); return !(L5.size===1&&L5.has('pins'))||streetShown().size<STREET_KEYS.length||Object.keys(MX5_DEF).some(k=>m[k]!==MX5_DEF[k]); }
function mapCtl5(){ let n=0; const t=setInterval(()=>{ const el=document.getElementById('dmap'); if(!el||++n>40){ clearInterval(t); return; }
  if(!el.classList.contains('leaflet-container')) return; clearInterval(t); if(el.querySelector('.mctl5')) return dfBtn5();
  el.insertAdjacentHTML('beforeend',`<div class="mctl5"><button class="wkb5" onclick="event.stopPropagation();walkPick5()">${ic2('pin',16)}<span>Plan a walk</span></button><button class="dfb5" onclick="event.stopPropagation();dfPanel5()"></button></div>`);
  const c=el.querySelector('.mctl5'); L.DomEvent.disableClickPropagation(c); L.DomEvent.disableScrollPropagation(c); dfBtn5(); },75); }
function dfBtn5(){ const b=document.querySelector('#dmap .dfb5'); if(!b) return; b.classList.toggle('on',!!document.querySelector('.dfp5'));
  b.innerHTML=`${ic2('menu',16)}<span>Filters</span>${dfActive5()?'<i></i>':''}`; const w=document.querySelector('#dmap .wkb5'); if(w) w.classList.toggle('on',!!document.querySelector('.wkp5')||!!S.walk); }
function pop5(cls,html){ const m=document.getElementById('dmap'); if(!m) return; document.querySelectorAll('.dfp5,.wkp5').forEach(x=>x.remove());
  m.insertAdjacentHTML('beforeend',html); const p=m.querySelector('.'+cls); L.DomEvent.disableClickPropagation(p); L.DomEvent.disableScrollPropagation(p); dfBtn5();
  setTimeout(()=>document.addEventListener('click',popOut5,true),0); }
function popClose5(){ document.querySelectorAll('.dfp5,.wkp5').forEach(x=>x.remove()); dfBtn5(); document.removeEventListener('click',popOut5,true); }
function popOut5(e){ const p=document.querySelector('.dfp5,.wkp5'); if(!p){ document.removeEventListener('click',popOut5,true); return; } if(p.contains(e.target)||e.target.closest('.mctl5')) return; popClose5(); }
function dfPanel5(){ if(document.querySelector('.dfp5')) return popClose5(); pop5('dfp5',dfHTML5()); }
function dfHTML5(){ const m=mx5();
  const nPipe=(S.pipe||[]).filter(x=>x.lat!=null&&['appraisal','listed'].includes(x.stage)).length, nSales=S.rsales?S.rsales.length:null;
  const nDrop=(S.streets||[]).filter(st=>{ const ids=st.ids||[]; return ids.length&&ids.every(id=>{ const x=(S.drops||[]).find(d=>d.id===id); return x&&isDropped(x); }); }).length;
  const row=(k,l,n)=>`<label class="dfr5"><input type="checkbox" ${m[k]?'checked':''} onchange="mx5().${k}=this.checked;mxSave5();mapExtras3();dfRefresh5()"><span>${l}${n!=null?` <em>(${n})</em>`:''}</span></label>`;
  return `<div class="dfp5" role="dialog" aria-label="Map filters">
   <div class="dfh5"><b>Filter</b><button class="dfx5" onclick="S.mx={...MX5_DEF};mxSave5();layReset5()">Clear all</button></div>
   <div class="dfs5">Map style</div>
   <div class="dft5">${[['pins','Pins'],['heat','Heat'],['streets','Streets']].map(([v,l])=>`<button class="${lays5().has(v)?'on':''}" aria-pressed="${lays5().has(v)}" onclick="layToggle5('${v}')">${l}</button>`).join('')}</div>
   ${lays5().has('streets')?`<div class="dfs5">Streets most likely to sell</div><div class="dtr5">${STREET_KEYS.map(k=>`<button class="${streetShown().has(k)?'on':''}" onclick="toggleTier('${k}');dfRefresh5()"><i style="background:${{most:STREET_TIERS[0][2],likely:STREET_TIERS[1][2],some:STREET_TIERS[2][2],done:'#9aa3ad',rest:'#c9ced4'}[k]}"></i>${STREET_LABELS[k]}</button>`).join('')}</div>`:''}
   <div class="dfs5">Show on map</div>
   <div class="dfb5x">${row('pipe','Our appraisals and listings',nPipe)}${row('sales','Recent sales',nSales)}${row('dropped','Dropped dates',nDrop)}</div>
   <div class="dff5"><button class="pri" onclick="popClose5()">Done</button><button class="pri" onclick="S.mx={...MX5_DEF};mxSave5();layReset5()">Reset</button></div></div>`; }
function dfRefresh5(){ const p=document.querySelector('.dfp5'); if(p){ const m=document.getElementById('dmap'); p.remove(); m.insertAdjacentHTML('beforeend',dfHTML5()); const q=m.querySelector('.dfp5'); L.DomEvent.disableClickPropagation(q); L.DomEvent.disableScrollPropagation(q); } dfBtn5(); }
// Plan a walk: pick the suburb only when you ask for a walk
function walkPick5(){ if(document.querySelector('.wkp5')) return popClose5(); const subs=walkSubs3().slice(0,12);
  pop5('wkp5',`<div class="wkp5 dfp5x" role="dialog" aria-label="Plan a walk"><div class="dfh5"><b>Plan a walk</b>${S.walk?'<button class="dfx5" onclick="popClose5();walkClear3()">Clear walk</button>':''}</div>
   <div class="dfs5">Which suburb?</div><div class="dfb5x">${subs.map(o=>`<button class="wkr5${o.sub===S.walkSub?' on':''}" onclick="walkGo5(this.dataset.s)" data-s="${esc(o.sub)}"><span>${esc(o.sub)}</span><em>${Math.min(8,o.n)} streets</em></button>`).join('')||'<p class="emptyline" style="padding:12px">No streets to walk yet</p>'}</div></div>`); }
function walkGo5(sub){ popClose5(); S.walkSub=sub; const sel=document.getElementById('wksub'); if(sel){ if(![...sel.options].some(o=>o.value===sub)) sel.insertAdjacentHTML('beforeend',`<option>${esc(sub)}</option>`); sel.value=sub; } walk3(); }
// Card drop map: Filters button shows when something is changed
window.drawDropLayer=(function(orig){ return function(...a){ const r=orig(...a); dfBtn5(); return r; }; })(window.drawDropLayer);
// Outside legal calling hours: one warning when you tap any call link, instead of banners on every screen
document.addEventListener('click',e=>{ const a=e.target.closest('a[href^="tel:"]'); if(!a) return; if(/hoursOk/.test(a.getAttribute('onclick')||'')) return; hoursOk(e); },true);
// Desktop: a page's own strip (count, switches, Add) moves up into the top bar, so the work area starts at the top
function lift5(){ try{
  const main=document.getElementById('main'), head=document.querySelector('header.top2'); if(!main||!head) return;
  const ph=main.querySelector('.ph2');
  if(!ph){ if(!main.querySelector('.l5mark')) head.querySelectorAll('.lift5').forEach(x=>x.remove()); return; }
  if(innerWidth<900||ph.closest('#sheet')) return;
  head.querySelectorAll('.lift5').forEach(x=>x.remove());
  const title=head.querySelector('.tabbtn'), search=head.querySelector('.tsearch');
  [...ph.children].forEach(c=>{
    if(c.tagName==='H1') return;
    c.classList.add('lift5');
    if(c.matches('span.muted')){ c.classList.add('hc5'); title?title.after(c):head.prepend(c); return; }
    if(c.matches('button.b2.pri')){ c.classList.add('hadd5'); head.appendChild(c); return; }
    search?search.before(c):head.appendChild(c);
  });
  ph.replaceWith(Object.assign(document.createElement('i'),{className:'l5mark',hidden:true}));
}catch(e){ console.error(e); } }
new MutationObserver(()=>{ if(window.__l5q) return; window.__l5q=1; queueMicrotask(()=>{ window.__l5q=0; lift5(); }); }).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
addEventListener('resize',()=>{ clearTimeout(window.__l5r); window.__l5r=setTimeout(()=>{ if(innerWidth<900&&document.querySelector('.lift5')) render(); },200); });

// Copy address: an icon instead of the word
const COPYIC5='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>';

// Map styles can be mixed: any of Pins, Heat and Streets at once. Heat sits at the bottom, pins on top.
function lays5(){ if(!S.dlays){ try{ const v=JSON.parse(localStorage.getItem('dp_dlays')||'null'); S.dlays=new Set(Array.isArray(v)?v:['pins']); }catch{ S.dlays=new Set(['pins']); } } return S.dlays; }
function laySave5(){ try{ localStorage.setItem('dp_dlays',JSON.stringify([...lays5()])); }catch{} }
function layToggle5(v){ const L5=lays5(); L5.has(v)?L5.delete(v):L5.add(v); laySave5(); drawDropLayer(); dfRefresh5(); }
function layReset5(){ S.dlays=new Set(['pins']); laySave5(); S.stiers=new Set(STREET_KEYS); try{localStorage.removeItem('dp_stiers')}catch{} drawDropLayer(); dfRefresh5(); }
// Card drop map: Pins, Heat and Streets can be shown together
window.drawDropLayer=(function(orig){ return function(){
  if(!S.map) return orig();
  if(S.dlay){ try{ S.map.removeLayer(S.dlay); }catch{} S.dlay=null; }
  const keep=[];
  for(const v of ['heat','streets','pins']){ if(!lays5().has(v)) continue; S.dlayer=v; orig(); if(S.dlay){ keep.push(S.dlay); if(v==='streets') widen5(S.dlay); S.dlay=null; } }
  if(S.dleg){ S.dleg.remove(); S.dleg=null; }   // the street key lives in the Filters panel now
  if(!keep.length){ orig.__none=1; } 
  keep.forEach(l=>{ try{ S.map.removeLayer(l); }catch{} });
  S.dlay=L.layerGroup(keep).addTo(S.map); S.dlayer=[...lays5()][0]||'pins';
  if(S.walk&&S.dlay) S.map.removeLayer(S.dlay);
  dfBtn5();
}; })(window.drawDropLayer);
// Streets are easy to tap: an invisible wide line sits over each one and opens the same details
function widen5(group){ try{ const extra=[]; group.eachLayer(l=>{ if(!(l instanceof L.Polyline)) return;
  const t=L.polyline(l.getLatLngs(),{weight:24,opacity:0.001,lineCap:'round',interactive:true});
  t.on('click',e=>{ l.openPopup(e.latlng); }); extra.push(t); }); extra.forEach(t=>group.addLayer(t)); }catch(e){ console.error(e); } }

// Board Leads column: find any lead to drag, and show exactly as many cards as fit the screen
function bqv5(k){ return String((S.bq5o||{})[k]||'').trim().toLowerCase(); }
function pm5(x,k){ const q=bqv5(k); if(!q) return true; const d=q.replace(/\D/g,''); return [x.owner_name,x.street_address,x.suburb].some(v=>String(v||'').toLowerCase().includes(q))||(d.length>=3&&String(x.phone||'').replace(/\D/g,'').includes(d)); }
function lsFilter5(ls){ const q=bqv5('ld'); if(!q) return ls; const d=q.replace(/\D/g,'');
  return ls.filter(l=>[leadTitle(l),l.name,l.address,l.suburb].some(v=>String(v||'').toLowerCase().includes(q))||(d.length>=3&&String(l.phone||'').replace(/\D/g,'').includes(d))); }
let bq5t;
function bq5(k,v){ S.bq5o=S.bq5o||{}; S.bq5o[k]=v; clearTimeout(bq5t); bq5t=setTimeout(()=>{ const pos=document.getElementById('bq5_'+k)?.selectionStart; board3(true).then(()=>{ const i=document.getElementById('bq5_'+k); if(i){ i.focus(); try{ i.setSelectionRange(pos,pos); }catch{} } }); },120); }
// Each column header has a search icon; it opens a thin search line under the header
function bqToggle5(k){ const open=!!((S.bqOpen5||{})[k]||bqv5(k)); return open?bqClose5(k):bqOpen5(k); }
function bqOpen5(k){ S.bqOpen5=S.bqOpen5||{}; S.bqOpen5[k]=true; bqHeads5(); setTimeout(()=>document.getElementById('bq5_'+k)?.focus(),0); }
function bqClose5(k){ S.bqOpen5=S.bqOpen5||{}; S.bqOpen5[k]=false; const had=bqv5(k); S.bq5o=S.bq5o||{}; S.bq5o[k]=''; had?board3(true):bqHeads5(); }
function bqHeads5(){ const PH={ld:'Find a lead',ap:'Find an appraisal',ls:'Find a listing'};
  document.querySelectorAll('.bd3 .bc3').forEach(c=>{ const k=c.classList.contains('ap')?'ap':c.classList.contains('ls')?'ls':'ld', h=c.querySelector('.bh3'); if(!h) return;
    if(!h.querySelector('.bs5')){ const ad=h.querySelector('.ad3'); ad&&ad.insertAdjacentHTML('beforebegin',`<button class="bs5" aria-label="${PH[k]}" title="${PH[k]}" onclick="bqToggle5('${k}')">${ic2('search',15)}</button>`); }
    const open=!!((S.bqOpen5||{})[k]||bqv5(k)); h.querySelector('.bs5')?.classList.toggle('on',open);
    let row=c.querySelector('.bq5');
    if(open&&!row){ h.insertAdjacentHTML('afterend',`<label class="bq5">${ic2('search',14)}<input id="bq5_${k}" type="search" placeholder="${PH[k]}" value="${esc((S.bq5o||{})[k]||'')}" oninput="bq5('${k}',this.value)" onkeydown="if(event.key==='Escape')bqClose5('${k}')" autocomplete="off" aria-label="${PH[k]}"><button class="bx5" aria-label="Close search" onclick="event.preventDefault();bqClose5('${k}')">${ic2('x',14)}</button></label>`); }
    if(!open&&row) row.remove();
    if(bqv5(k)&&!c.querySelector('.cd3')){ const e=c.querySelector('.be3'); if(e) e.textContent='Nothing matches that'; } }); }
function boardFit5(){ try{ const col=document.querySelector('.bd3 .bc3.ld'); if(!col||innerWidth<900) return false;
  const first=col.querySelector('.cd3'), more=col.querySelector('.bm3'); if(!first||!more) return false;
  const avail=innerHeight-first.getBoundingClientRect().top-more.offsetHeight; const n=Math.max(3,Math.floor(avail/84));
  document.querySelector('.bd3').style.setProperty('--cdh',Math.floor(avail/n)+'px');
  if(n!==S.bfit5){ S.bfit5=n; return true; } return false; }catch{ return false; } }
// Pipeline board: column search and screen fitting
window.board3=(function(orig){ return async function(local){ const r=await orig(local);
  bqHeads5();
  if(boardFit5()) return board3(true);
  return r; }; })(window.board3);
addEventListener('resize',()=>{ clearTimeout(window.__bf5); window.__bf5=setTimeout(()=>{ if(document.querySelector('.bd3')&&boardFit5()) board3(true); },200); });
