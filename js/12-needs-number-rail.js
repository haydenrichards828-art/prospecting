// ---------- Needs a number (23 Nov) ----------
// The best 50 homes each day that have no phone yet. Copy the address, find the number and add it: they move into today's calls.
// "No number" rests a home for six months so tomorrow's 50 are new ones.
const NN8='Needs a number';
async function loadNN8(){
  try{
    let rows;
    if(DEMO){ const D=window.__demo, src=(D&&D.rows)||S.rows||[];
      rows=S.nn8demo||(S.nn8demo=src.slice(0,14).map((r,i)=>({...r,property_id:900000+i,phone:null,owner_phone:null,phone2:null,owner_name:i%3?r.owner_name:null,today_outcome:null,history:null,callback:false,rank:i+1}))); }
    else { if(!S.token) return; const r=await fetch(BOOT,{method:'POST',headers:{'Content-Type':'application/json','x-session':S.token},body:JSON.stringify({action:'nophone'})});
      if(!r.ok) return; rows=(await r.json()).rows||[]; }
    const sig=rows.map(r=>r.property_id).join();
    if(sig===S.nn8sig&&S.nn8rows) return; S.nn8sig=sig; S.nn8rows=rows;
    if(S.tab==='calls'&&S.view==='list'&&!S.searching&&!$("#ov").classList.contains("show")) drawList();
  }catch(e){}
}
window.refreshCalls=(function(o){ return async function(...a){ const r=await o(...a); loadNN8(); return r; }; })(window.refreshCalls);
// the editor and the call screen find these homes like any other
window.findRow=(function(o){ return function(id){ return o(id)||(S.nn8rows||[]).find(x=>x.property_id===id); }; })(window.findRow);
window.api=(function(o){ return async function(action,body,...a){ const r=await o(action,body,...a); if(action==='save_contact'&&body) S.nnSaved8=body.property_id; return r; }; })(window.api);

function nnGo8(){ S.nn8=true; S.ohSel=null; if(S.view!=='list') return setView('list'); drawList(); }
function nnRow8(r){ const id=r.property_id, u=aerialUrl(r,PH_SMALL[0],PH_SMALL[1]), who=people(r.owner_name)[0], ws=whyRows(r).slice(0,3);
  const bought=r.last_sale_date?'Bought '+String(r.last_sale_date).slice(0,4)+(r.last_sale_price?' for '+price2(r.last_sale_price):''):'No sale on record';
  return `<div class="nn8" data-id="${id}">
   <div class="th3">${u?`<img src="${u}" alt="" loading="lazy" onerror="this.remove()">`:''}</div>
   <div class="nm3"><b>${esc(r.street_address||'Address unknown')}</b><span>${esc(r.suburb||'')}${' · '+esc(who||'Owner unknown')}</span></div>
   <div class="why3"><b class="wy4">${esc(short4(ws))}</b><span class="wb4">${esc(bought)}</span></div>
   <div class="act8"><button class="b2 cp8" onclick="nnCopy8(${id})">Copy address</button><button class="b2 pri" onclick="nnAdd8(${id})">${ic2('phone',16,'#fff')}Add number</button><button class="b2 nnx8" onclick="nnNone8(${id})" title="Couldn't find a number: skip it for 6 months">No number</button></div></div>`; }
function paintNN8(){
  const lh=document.querySelector('#main .lh2'), box=document.querySelector('#lrows2'); if(!box) return;
  if(lh) lh.querySelectorAll('button.on').forEach(x=>x.classList.remove('on'));
  const rows=S.nn8rows||[];
  box.innerHTML=rows.length?`<div class="nnh8"><b>${NN8}</b><span>Find their number and add it. They go into today's calls.</span></div>`+rows.map(nnRow8).join(''):`<div class="empty2">${ic2('check',30,'var(--ok)')}<b>All looked up</b>A fresh 50 arrive with tomorrow's list.</div>`;
}
window.drawList2=(function(orig){ return function(...a){ const r=orig.apply(this,a); try{
  const rail=document.querySelector('#main .rail2'); if(!rail) return r;
  const n=(S.nn8rows||[]).length;
  if((n||S.nn8)&&!rail.querySelector('.nn8b')){
    const b=document.createElement('button'); b.className='nn8b'+(S.nn8&&!S.ohSel?' on':''); b.setAttribute('onclick','nnGo8()'); b.title=NN8;
    b.innerHTML=`<em class="rn5">${NN8}</em><span>${n}</span>`;
    let h=[...rail.querySelectorAll('.rh5')].find(x=>/Lists/.test(x.textContent));
    if(!h){ h=document.createElement('div'); h.className='rh5'; h.textContent='Lists'; const sub=[...rail.querySelectorAll('.rh5')].find(x=>/Suburbs/.test(x.textContent)); rail.insertBefore(h,sub||null); }
    let after=h; while(after.nextElementSibling&&after.nextElementSibling.tagName==='BUTTON') after=after.nextElementSibling; after.insertAdjacentElement('afterend',b);
  }
  if(!rail.dataset.nn8){ rail.dataset.nn8=1; rail.addEventListener('click',e=>{ const x=e.target.closest('button'); if(x&&!x.classList.contains('nn8b')) S.nn8=false; },true); }
  const lh=document.querySelector('#main .lh2'); if(lh&&!lh.dataset.nn8){ lh.dataset.nn8=1; lh.addEventListener('click',e=>{ if(e.target.closest('.seg2 button')) S.nn8=false; },true); }
  if(S.nn8&&!S.ohSel){ rail.querySelectorAll('button.on').forEach(x=>{ if(!x.classList.contains('nn8b')) x.classList.remove('on'); }); paintNN8(); }
}catch(e){ console.error(e); } return r; }; })(window.drawList2);

function nnAdd8(id){ S.nnFrom=id; S.ecFrom=null; S.ecFromSearch=true; editContact2(id); setTimeout(()=>$('#ec_phone')?.focus(),80); }
window.saveContact2=(function(orig){ return async function(id){
  if(S.nnFrom!==id) return orig(id);
  const p=($('#ec_phone')?.value||'').trim(), n=($('#ec_name')?.value||'').trim();
  S.ecFromSearch=true; S.nnSaved8=null;
  await orig(id);
  if(S.nnSaved8!==id) return;           // not saved: the problem shows in the editor, which stays open
  S.nnFrom=null; S.ecFromSearch=false;
  const r=(S.nn8rows||[]).find(x=>x.property_id===id); if(!r) return drawList();
  if(!p){ r.owner_name=n||null; drawList(); return toast('Saved. Add a number to move them into today\'s calls'); }
  S.nn8rows=S.nn8rows.filter(x=>x!==r);
  const ph=p.replace(/\D/g,'').replace(/^61(\d{9})$/,'0$1');
  if(DEMO){ const row={...r,owner_name:n||null,phone:ph,owner_phone:ph,rank:0}; S.nn8demo=S.nn8rows; S.rows=[row,...(S.rows||[])]; const D=window.__demo; if(D&&D.rows) D.rows.unshift(row); }
  drawList(); toast(`Added to today's calls${r.suburb?' in '+r.suburb:''}`);
  if(!DEMO) refreshCalls();
}; })(window.saveContact2);
function nnNone8(id){ const r=(S.nn8rows||[]).find(x=>x.property_id===id); if(!r) return;
  const at=S.nn8rows.indexOf(r); S.nn8rows=S.nn8rows.filter(x=>x!==r); if(DEMO) S.nn8demo=S.nn8rows; drawList();
  let undone=false; const t=setTimeout(()=>{ if(!undone) api('report_issue',{property_id:id,kind:'no_number'}).catch(e=>toast(e.message)); },5200);
  toast('Skipped for 6 months',()=>{ undone=true; clearTimeout(t); S.nn8rows.splice(at,0,r); if(DEMO) S.nn8demo=S.nn8rows; drawList(); }); }
async function nnCopy8(id){ const r=(S.nn8rows||[]).find(x=>x.property_id===id); if(!r) return; const t=[r.street_address,r.suburb].filter(Boolean).join(', ');
  try{ await navigator.clipboard.writeText(t); }catch{ const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy')}catch{} ta.remove(); }
  toast('Copied: '+t); }

// ---------- Quick notes live inside the note box (23 Nov) ----------
// One box: what you type on top, the quick notes along its bottom edge, fading out at the right instead of being cut off
window.drawCall2=(function(o){ return function(...a){ const r=o(...a); try{ for(const id of ['note2','pnote2']){ const t=document.getElementById(id), ph=t&&t.nextElementSibling;
    if(!t||!ph||!ph.classList.contains('phr8')||t.parentElement.classList.contains('nbox8')) continue;
    const w=document.createElement('div'); w.className='nbox8 '+(id==='note2'?'nb8d':'nb8p'); t.before(w); w.append(t,ph);
    w.addEventListener('mousedown',e=>{ if(e.target===w){ e.preventDefault(); t.focus(); } });
    const fade=()=>w.classList.toggle('more8',ph.scrollLeft+ph.clientWidth<ph.scrollWidth-4); ph.addEventListener('scroll',fade,{passive:true}); requestAnimationFrame(fade); } }catch(e){} return r; }; })(window.drawCall2);

// ---------- Lists in the rail are blue (23 Nov) ----------
// Everything under Lists (call backs, call sheets, open homes, Needs a number) reads blue with an icon; suburbs stay plain grey
window.drawList2=(function(orig){ return function(...a){ const r=orig.apply(this,a); try{
  const rail=document.querySelector('#main .rail2'); if(!rail) return r;
  const h=[...rail.querySelectorAll(':scope>.rh5')].find(x=>/Lists/.test(x.textContent)); if(!h) return r;
  for(let b=h.nextElementSibling; b&&b.tagName==='BUTTON'; b=b.nextElementSibling){
    b.classList.add('ls9');
    if(!b.querySelector(':scope>svg')){ const i=b.classList.contains('cbk')?'clock':b.classList.contains('nn8b')?'phone':b.classList.contains('ohf5')?null:'pin'; if(i) b.insertAdjacentHTML('afterbegin',ic2(i,14)); }
  }
}catch(e){} return r; }; })(window.drawList2);
// If a browser draws the words wider than expected, the switch steps its text down rather than cutting a word
window.drawList2=(function(orig){ return function(...a){ const r=orig.apply(this,a); try{ const s=document.querySelector('#main .rail2 .lt5'); if(s){ s.classList.remove('sm9','xs9');
  const over=()=>[...s.querySelectorAll('button')].some(b=>b.scrollWidth>b.clientWidth+1); if(over()){ s.classList.add('sm9'); if(over()) s.classList.add('xs9'); } } }catch(e){} return r; }; })(window.drawList2);

