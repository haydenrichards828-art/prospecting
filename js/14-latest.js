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
