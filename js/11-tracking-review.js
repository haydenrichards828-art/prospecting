// ================= From the tracking review (23 Nov) =================
(function(){
const $$=s=>document.querySelector(s);
const ovOpen=()=>!!$$('#ov')&&$$('#ov').classList.contains('show');

// ---- Notes save themselves. A lead's note, status and details are saved when the panel closes, when another lead is opened,
// or when the app is put away. While typing, the note is also kept on the device so nothing is lost if the app is closed.
const DKEY=id=>'dp_ldraft_'+id;
const dropDraft=id=>{ try{ localStorage.removeItem(DKEY(id)); }catch{} };
let saving=false;
function leadSnap(){ const o=S.ol, ta=$$('#ln_body'); if(!o||!o.id||!ta||!ovOpen()) return null;
  const id=o.id, cur=(S.leads||[]).find(x=>x.id===id)||{};
  const body=ta.value.trim(), st=$$('#ln_status')?$$('#ln_status').value:(cur.status||'Lead'), nx=$$('#ln_next')?($$('#ln_next').value||null):(cur.next_action||null);
  let note=null; if(body||st!==(cur.status||'Lead')||(o.temperature||null)!==(cur.temperature||null)||nx!==(cur.next_action||null)){ note={id,body,status:st,next_action:nx}; if(o.temperature) note.temperature=o.temperature; }
  let lead=null; try{ if(S.olOrig&&$$('#b_min')){ const buy=readBuy(), det=readDetails(), l={}; if(JSON.stringify(buy)!==S.olOrig.buy) l.buy=buy; if(JSON.stringify(det)!==S.olOrig.details) Object.assign(l,det); if(Object.keys(l).length) lead=l; } }catch(e){}
  return note||lead?{id,note,lead}:null; }
async function leadSave(s){ if(!s) return;
  try{ const jobs=[]; if(s.note) jobs.push(api('lead_note',s.note)); if(s.lead) jobs.push(api('save_lead',{id:s.id,lead:s.lead}));
    await Promise.all(jobs); dropDraft(s.id); await loadLeads();
    if(S.tab==='leads'&&!(ovOpen()&&S.ol&&S.ol.id)) drawLeads();
    toast(s.note&&s.note.body?'Note saved':'Saved'); }
  catch(e){ toast("Couldn't save. The note is kept, open the lead to try again"); } }
window.saveLeadAll=(function(o){ return async function(id){ saving=true; try{ const r=await o(id); if(id&&!$$('#ln_body')?.value.trim()) dropDraft(id); return r; } finally{ saving=false; } }; })(window.saveLeadAll);
window.closeOv=(function(o){ return function(...a){ const s=saving?null:leadSnap(); const r=o(...a); if(s) leadSave(s); return r; }; })(window.closeOv);
window.openLead=(function(o){ return function(id,opts,...a){ const s=(!saving&&S.ol&&S.ol.id&&S.ol.id!==id)?leadSnap():null; const r=o(id,opts,...a); if(s) leadSave(s);
  try{ const ta=$$('#ln_body'); if(ta&&id){ const d=localStorage.getItem(DKEY(id)); if(d&&!ta.value){ ta.value=d; ta.dispatchEvent(new Event('input')); } } }catch{}
  return r; }; })(window.openLead);
let dT=0; document.addEventListener('input',e=>{ if(e.target&&e.target.id==='ln_body'&&S.ol&&S.ol.id){ clearTimeout(dT); const id=S.ol.id, v=e.target.value; dT=setTimeout(()=>{ try{ v.trim()?localStorage.setItem(DKEY(id),v):localStorage.removeItem(DKEY(id)); }catch{} },300); } },true);
document.addEventListener('visibilitychange',()=>{ if(document.hidden&&!saving){ const s=leadSnap(); if(s&&S.olOrig){ leadSave(s).then(()=>{ if(S.ol&&S.ol.id===s.id&&$$('#ln_body')) $$('#ln_body').value=''; }); try{ S.olOrig.buy=JSON.stringify(readBuy()); S.olOrig.details=JSON.stringify(readDetails()); }catch{} } } });

// ---- Closing: Escape and a click outside close any panel. Nothing typed is lost: notes save (above), boxes that save when
// you leave them get the chance to, and a note prompt keeps what was typed.
window.requestClose8=function(){ if(!ovOpen()) return false;
  const yes=$$('#askyes'), no=$$('#askno'), ta=$$('#askin');
  if(yes&&no){ const keep=ta&&ta.value.trim()&&ta.value!==ta.defaultValue&&/note|save/i.test(yes.textContent); (keep?yes:no).click(); return true; }
  const a=document.activeElement; if(a&&a.closest&&a.closest('#sheet')&&a.blur) a.blur();
  closeOv(); return true; };
document.addEventListener('keydown',e=>{ if(e.key!=='Escape'||!ovOpen()||document.querySelector('.mfull5')) return;
  e.preventDefault(); e.stopImmediatePropagation(); if(typeof closePop2==='function') closePop2(); requestClose8(); },true);
let downOnBackdrop=false;
document.addEventListener('pointerdown',e=>{ downOnBackdrop=e.target&&e.target.id==='ov'; },true);
document.addEventListener('click',e=>{ if(e.target&&e.target.id==='ov'&&downOnBackdrop){ downOnBackdrop=false; requestClose8(); } },true);

// ---- Quick note phrases under the call note: tap to add, so the note is done before the next call
const PHR_DEF=['Selling next year','Has an agent','Call after Christmas','Wants a price update','Renting it out','Spoke to partner'];
const phrs=()=>{ try{ const v=JSON.parse(localStorage.getItem('dp_phr8')||'null'); if(Array.isArray(v)&&v.length) return v; }catch{} return PHR_DEF; };
window.phrAdd8=function(btn,i){ const t=btn.closest('.phr8')?.previousElementSibling?.matches?.('textarea')?btn.closest('.phr8').previousElementSibling:document.querySelector(innerWidth<900?'#pnote2':'#note2'); if(!t) return;
  const p=phrs()[i], v=t.value.trim(); t.value=v?(/[.!?]$/.test(v)?v+' ':v+'. ')+p:p; t.dispatchEvent(new Event('input',{bubbles:true})); btn.classList.add('used8'); };
window.phrEdit8=async function(){ const v=await uiAsk('Quick notes, one per line',{input:phrs().join('\n'),ok:'Save notes'}); if(v===null) return;
  const list=v.split('\n').map(x=>x.trim()).filter(Boolean).slice(0,10); try{ localStorage.setItem('dp_phr8',JSON.stringify(list.length?list:PHR_DEF)); }catch{} drawList(); };
const phrHTML=()=>`<div class="phr8" role="group" aria-label="Quick notes">${phrs().map((p,i)=>`<button type="button" onmousedown="event.preventDefault()" onclick="phrAdd8(this,${i})">${esc(p)}</button>`).join('')}<button type="button" class="phre8" onclick="phrEdit8()" aria-label="Change the quick notes" title="Change the quick notes">${ic2('pen',14)}</button></div>`;
window.drawCall2=(function(o){ return function(...a){ const r=o(...a); try{ for(const id of ['note2','pnote2']){ const t=document.getElementById(id); if(t&&!(t.nextElementSibling&&t.nextElementSibling.classList.contains('phr8'))) t.insertAdjacentHTML('afterend',phrHTML()); } }catch(e){} return r; }; })(window.drawCall2);

// ---- Booked call backs: the button shows how many are booked; with none it says so instead of opening an empty panel
let ucbN=null, ucbAt=0;
function ucbCount(){ if(DEMO||Date.now()-ucbAt<120000) return; ucbAt=Date.now(); api('upcoming_callbacks').then(r=>{ ucbN=(r.rows||[]).length; ucbLabel(); }).catch(()=>{}); }
function ucbLabel(){ document.querySelectorAll('button.cbk[onclick="upcomingCB()"]').forEach(b=>{ if(ucbN==null) return; let s=b.querySelector('.n8'); if(!s){ s=document.createElement('em'); s.className='n8'; b.insertBefore(s,b.lastElementChild); } s.textContent=ucbN; b.classList.toggle('none8',ucbN===0); }); }
window.drawList=(function(o){ return function(...a){ const r=o(...a); try{ if(S.view==='list'){ ucbLabel(); ucbCount(); } }catch(e){} return r; }; })(window.drawList);
window.upcomingCB=(function(o){ return function(...a){ if(ucbN===0){ toast('No call backs booked'); return; } return o(...a); }; })(window.upcomingCB);

// ---- Opening the app: on the first open of the day the call list, today's numbers and call backs come back in one trip
const BOOT=API.replace(/\/api$/,'/boot'); let primed=null;
window.api=(function(o){ return async function(action,body={},...rest){
  if(primed&&(action==='list'||action==='today'||action==='callbacks')&&primed[action]&&(action!=='list'||primed.type===((body&&body.type)||'seller'))){ const v=primed[action]; primed[action]=null; return JSON.parse(JSON.stringify(v)); }
  return o.call(this,action,body,...rest); }; })(window.api);
window.refreshCalls=(function(o){ return async function(first,...a){
  if(first&&!DEMO&&S.token){ try{ const r=await fetch(BOOT,{method:'POST',headers:{'Content-Type':'application/json','x-session':S.token},body:JSON.stringify({type:S.type})});
      if(r.ok){ const j=await r.json(); if(j&&j.list&&j.today&&j.callbacks) primed={type:S.type,list:j.list,today:j.today,callbacks:j.callbacks}; } }catch(e){} }
  try{ return await o(first,...a); } finally{ primed=null; } }; })(window.refreshCalls);

// ---- Typing speed: when a key press is slow, record where the time went (waiting, the app's code, or drawing) and the browser,
// so the next review can say whether it is the app or the computer
try{ new PerformanceObserver(list=>{ for(const e of list.getEntries()){ if(!e.interactionId||e.duration<200||!/key/.test(e.name)) continue;
      const wait=Math.round(e.processingStart-e.startTime), code=Math.round(e.processingEnd-e.processingStart), draw=Math.max(0,Math.round(e.duration-(e.processingEnd-e.startTime)));
      if(typeof uxPush==='function') uxPush('slow',{g:'keys:'+(e.target&&(e.target.id||e.target.tagName)||'?'),dt:Math.round(e.duration),m:{wait,code,draw,ime:!!(e.target&&e.target.isComposing),els:document.getElementsByTagName('*').length,ua:navigator.userAgent.slice(0,160)}}); } })
  .observe({type:'event',durationThreshold:200}); }catch(e){}
})();
// a mouse wheel scrolls the quick notes row sideways, so the rest of the phrases and the edit button are reachable on a computer
document.addEventListener('wheel',e=>{ const r=e.target.closest&&e.target.closest('.phr8'); if(!r||r.scrollWidth<=r.clientWidth||Math.abs(e.deltaX)>Math.abs(e.deltaY)) return; e.preventDefault(); r.scrollLeft+=e.deltaY; },{passive:false});

