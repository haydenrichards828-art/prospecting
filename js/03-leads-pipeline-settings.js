// ---------- leads ----------
const TCOL2={Hot:'var(--ns)',Warm:'var(--cb)',Nurture:'#6366f1',Cold:'#4b5565'};
function dueCol(d){ const n=dueIn(d); return n===null?'var(--t3)':n<0?'var(--nsT)':n===0?'var(--accT)':n===1?'var(--t1)':'var(--t2)'; }
function drawLeads(){
  S.lview=S.lview||'leads';
  const ls=(S.leads||[]).slice().sort((a,b)=>(a.follow_up||'9999').localeCompare(b.follow_up||'9999'));
  const over=ls.filter(l=>dueIn(l.follow_up)!==null&&dueIn(l.follow_up)<0).length, D=desk2();
  const head=`<div class="ph2"><h1>Leads</h1>${over&&S.lview==='leads'?`<span class="flag2">${over} overdue</span>`:''}
    <div class="seg2" style="min-width:250px">${[['leads','Leads '+ls.length],['listings','Listings '+(S.listings||[]).length]].map(([k,l])=>`<button class="${S.lview===k?'on':''}" onclick="S.lview='${k}';drawLeads()">${l}</button>`).join('')}</div>
    <button class="b2 pri" style="height:44px" onclick="${S.lview==='listings'?'openListing()':'openLead(null)'}" aria-label="Add">${ic2('plus',18)}<span class="hide-phone">Add</span></button></div>`;
  const m=$("#main"); m.className='v2main';
  if(S.lview==='listings'){ m.innerHTML=`<div class="pg2 oldin">${head}${listingsHTML()}</div>`; return; }
  if(!ls.length){ m.innerHTML=`<div class="pg2">${head}<div class="empty2"><b>No leads yet</b>Tap Lead on a call, or Add above.</div></div>`; return; }
  const sub=l=>[l.name?l.address:null,l.suburb].filter(Boolean).join(', ')||l.motivation||'';
  const latest=l=>(l.notes||[])[0]?.body||l.motivation||'';
  const tile=l=>`<span class="tile" style="--c:${TCOL2[l.temperature]||'#4b5565'}">${ic2(hasCriteria(l.buy)?'search':'lead',16,'#fff')}</span>`;
  const nw=l=>{ const n=newMatches(l).length; return n?`<em class="nw4">${n} new match${n>1?'es':''}</em>`:''; };
  const table=`<div class="ltab2"><div class="lt2 h"><span>Lead</span><span>Status</span><span>Due</span><span class="c4">Notes</span><span class="c5">Last spoke</span><span></span></div>${ls.map(l=>`<div class="lt2" onclick="openLead(${l.id})" data-lq="${esc([l.name,l.address,l.suburb,l.phone].join(' ').toLowerCase())}">
     <div class="ltn">${tile(l)}<div><b>${esc(leadTitle(l))}${nw(l)}</b><span>${esc(sub(l))}</span></div></div>
     <span class="ltnote" style="color:var(--t1)">${l.status&&l.status!=='Lead'?`<b style="color:${/^(Listed|Sold)$/.test(l.status)?'#5ee08f':/Appraisal/.test(l.status)?'#93c0ff':'var(--t2)'};margin-right:6px">${esc(l.status)}</b>`:''}</span>
     <b style="color:${dueCol(l.follow_up)};font-size:14px">${esc(dueLabel(l.follow_up))}</b><span class="ltnote c4">${esc(latest(l))}</span><span class="c5" style="font-size:14px;color:var(--t2)">${l.last_contact?esc(dayMon(l.last_contact)):''}</span>
     <div class="lbtns">${l.phone?`<a class="ib2" href="${smsLink(l.phone,'')}" onclick="event.stopPropagation()" aria-label="Text">${ic2('msg',17,'#fff')}</a><a class="ib2 call" href="tel:${esc(telOf(l.phone))}" onclick="event.stopPropagation()" aria-label="Call">${ic2('phone',17,'#fff')}</a>`:''}</div></div>`).join('')}</div>`;
  const list=`<div class="g2">${ls.map(l=>`<button class="r2" onclick="openLead(${l.id})">${tile(l)}<span class="rt2"><b>${esc(leadTitle(l))}</b><span>${esc(sub(l))}</span></span><span style="display:flex;align-items:center;gap:4px;font-size:13px;font-weight:700;color:${dueCol(l.follow_up)};white-space:nowrap">${esc(dueLabel(l.follow_up).replace('Follow up today','Today').replace('No follow up set','No date'))}${chev2()}</span></button>`).join('')}</div>`;
  m.innerHTML=`<div class="pg2">${head}${D?table:list}</div>`;
}

// ---------- older screens in the new frame ----------
window.viewSettings=(function(orig){ return async function(){ await orig();
  const m=$("#main"); if(!m||S.tab!=='settings') return;
  m.insertAdjacentHTML('afterbegin',`<div class="ph2"><h1>Settings</h1></div>
   <div class="g2" style="margin-bottom:14px">${row2('var(--cb)','skip','Auto dial next','After No answer or Not selling, ring the next person straight away',`<span class="sw2 ${S.autodial?'on':''}"><i></i></span>`,'toggleAuto()')}${row2('var(--ns)','ban','Taken off the list','Problems reported and do not calls, bring people back',chev2(),'removedSheet()')}${row2('var(--cb)','clock','Booked call backs','Change the time or cancel',chev2(),'upcomingCB()')}${row2('#4b5565','users','Sign out','','','logout()')}</div>`); }; })(window.viewSettings);
function toggleAuto(){ S.autodial=!S.autodial; try{localStorage.setItem("dp_autodial",S.autodial?"1":"0")}catch{} document.querySelectorAll('.sw2').forEach(s=>s.classList.toggle('on',S.autodial)); toast(S.autodial?"Auto dial is on":"Auto dial is off"); }
// Card drops page: marks the page for the new styles and drops the area average text
window.drawDrops=(function(orig){ return function(){ orig(); $("#main").classList.add('drops2'); $("#main").querySelectorAll('.muted').forEach(e=>{ if(/\(area avg \d+\)/.test(e.textContent)) e.textContent=e.textContent.replace(/\s*\(area avg \d+\)/g,''); }); const top=$("#main .top"); if(top&&!top.querySelector('.pt2')) top.insertAdjacentHTML('afterbegin','<h1 class="pt2">Card drops</h1>'); }; })(window.drawDrops);
// Texts page: page title in the new style
window.viewMessages=(function(orig){ return async function(){ await orig(); const h=$("#main h2"); if(h){ h.outerHTML='<div class="ph2"><h1>Texts</h1></div>'; } }; })(window.viewMessages);

// ---------- demo data: photos, sales and history so the preview looks real ----------
window.demoApi=(function(orig){ return function(action,body){ const r=orig(action,body); const D=window.__demo;
  if(D&&!D._v2){ D._v2=true; const C={Austinmer:[-34.3065,150.9300],Thirroul:[-34.3170,150.9215],Bulli:[-34.3350,150.9150],Woonona:[-34.3480,150.9080],Corrimal:[-34.3720,150.8990],"Fairy Meadow":[-34.3920,150.8920],Wollongong:[-34.4250,150.8930]};
    D.rows.forEach((x,i)=>{ const c=C[x.suburb]||C.Thirroul, yrs=+((x.reasons[0]||'').match(/\d+/)||[8])[0]; x.lat=c[0]+((i*37)%100-50)/20000; x.lng=c[1]+((i*53)%100-50)/20000; x.land_area=i%5===2?null:420+(i*41)%480;
      const by=2026-yrs, p=Math.round((350+(i*37)%600)*1000); x.last_sale_date=`${by}-0${1+i%9}-1${i%9}`; x.last_sale_price=p; x.sales=[{d:x.last_sale_date,price:p},...(i%3===0?[{d:`${by-9}-05-02`,price:Math.round(p*0.55)}]:[])];
      x.withdrawn=(x.signals||[]).includes('withdrawn')?[{d:`2026-0${5+i%4}-12`,kind:'withdrawn'}]:null; if(x.withdrawn) x.reasons=x.reasons.map(s=>/Withdrawn/.test(s)?`Listing withdrawn or expired ${MONS[4+i%4]} 2026, not sold since`:s);
      if(i%6===1) x.history=[{at:new Date(Date.now()-864e5*9).toISOString(),outcome:'no_answer',notes:null},{at:new Date(Date.now()-864e5*16).toISOString(),outcome:'no_answer',notes:null},{at:new Date(Date.now()-864e5*60).toISOString(),outcome:'not_interested',notes:'Said maybe next year once the kids finish school. Asked us to try again in spring.'}];
      if(i%4===1) x.crm_notes=[{name:x.owner_name,comments:'9/8/17 RG. Called, no plans to move. Kids still at school, maybe in a few years.',last:'05 Aug 2019: left message about sale in the street (Added by: Blake Torresan)',on:'2019-08-05',by:'Blake Torresan',owner:'Adam McMahon'}];
      if(i%10===4) x.reasons.push(`Neighbour at ${(i*3)%90+3} ${x.street_address.replace(/^\S+\s/,'')} sold for $1.${2+i%6}m (1${i%9} Oct)`); }); }
  if(action==='overview'&&r){ const wk=[...Array(8)].map((_,i)=>{ const d=new Date(Date.now()-(7-i)*7*864e5); return {start:d.toISOString().slice(0,10),n:[380,412,455,430,470,498,440,120+(D?.calls||0)][i]}; });
    r.periods={week:wk,month:['2026-06-01','2026-07-01','2026-08-01','2026-09-01','2026-10-01','2026-11-01'].map((s,i)=>({start:s,n:[1520,1610,1700,1820,1940,980][i]})),quarter:['2026-01-01','2026-04-01','2026-07-01','2026-10-01'].map((s,i)=>({start:s,n:[4100,4700,5200,2920][i]}))};
    r.suburbs=[{suburb:'Thirroul',n:6},{suburb:'Austinmer',n:4},{suburb:'Bulli',n:3},{suburb:'Woonona',n:2}]; }
  return r; }; })(window.demoApi);

// No RP Data buttons anywhere: the address copies instead
function rpBtn(){ return ''; }

// ---------- fixing things after the fact ----------
async function undoToday(pid,callId){ try{ await api("undo_outcome",{call_id:callId}); }catch(e){ return toast("Couldn't undo. "+e.message); }
  const row=S.rows.find(x=>x.property_id===pid), cb=(S.callbacks||[]).find(x=>x.property_id===pid);
  if(row){ row.today_outcome=null; row.history=(row.history||[]).filter(h=>h.id!==callId); } if(cb){ cb.today_outcome=null; cb.done=false; }
  if(S.ov) S.ov.today_calls=Math.max(0,(S.ov.today_calls||0)-1);
  toast("Cleared. Pick what happened"); S.pick=pid; drawList(); drawProg(); }
async function upcomingCB(){
  openSheet2('Booked call backs','<p class="emptyline">Loading</p>');
  let rows=[]; try{ rows=(await api("upcoming_callbacks")).rows||[]; }catch(e){ openSheet2('Booked call backs',`<p class="emptyline">${esc(e.message)}</p>`); return; }
  S._ucb=rows;
  openSheet2('Booked call backs',rows.length?`<div class="g2">${rows.map((c,i)=>`<div class="r2" style="grid-template-columns:32px minmax(0,1fr) auto"><span class="tile" style="--c:var(--cb)">${ic2('clock',17,'#fff')}</span><span class="rt2"><b>${esc(people(c.owner_name)[0]||'Owner unknown')}</b><span>${esc(fmt(c.callback_at))} · ${esc(c.street_address||'')}${c.notes?' · '+esc(c.notes):''}</span></span>
     <span style="display:flex;gap:6px"><button class="b2" style="height:36px;padding:0 12px!important" onclick="moveCB(${i})">Change</button><button class="b2" style="height:36px;padding:0 12px!important" onclick="cancelCB(${i})">Cancel</button></span></div>`).join('')}</div>`
   :'<p class="emptyline">No call backs booked.</p>');
}
function moveCB(i){ const c=S._ucb[i]; if(!c) return; S._cbBack=true;
  openSheet2('New time for '+esc(people(c.owner_name)[0]||'them'),`<input type="datetime-local" id="mcb2" value="${sydInput(new Date(c.callback_at))}" style="height:52px;border-radius:8px;padding:0 14px">
   <button class="b2 pri" onclick="saveMoveCB(${i})">Save new time</button>`,'upcomingCB()'); }
async function saveMoveCB(i){ const c=S._ucb[i], v=$('#mcb2').value; if(!v) return toast('Pick a date and time');
  try{ await api("outcome",{property_id:c.property_id,outcome:'call_back',callback_at:sydToISO(v),notes:c.notes||null,list_type:S.type,mode:'list'}); await api("undo_outcome",{call_id:c.call_id}); }catch(e){ return toast(e.message); }
  toast('Call back moved to '+fmt(sydToISO(v))); await loadCallbacks(); upcomingCB(); }
async function cancelCB(i){ const c=S._ucb[i]; if(!c) return;
  if(!(await uiAsk(`Cancel the call back with ${people(c.owner_name)[0]||'them'}? They go back into the normal list.`,{ok:'Cancel call back'}))) return upcomingCB();
  try{ await api("undo_outcome",{call_id:c.call_id}); }catch(e){ return toast(e.message); }
  toast('Call back cancelled'); await loadCallbacks(); upcomingCB(); }
async function removedSheet(){
  openSheet2('Taken off the list','<p class="emptyline">Loading</p>');
  let rows=[]; try{ rows=(await api("removed_list")).rows||[]; }catch(e){ openSheet2('Taken off the list',`<p class="emptyline">${esc(e.message)}</p>`); return; }
  S._rm=rows; const why=t=>String(t||'').replace(/^reported: /,'').replace(/^./,c=>c.toUpperCase());
  openSheet2('Taken off the list',rows.length?`<p class="emptyline" style="margin:0 4px">Everyone you took off with Something is wrong or Do not call. Bring someone back if it was a mistake.</p><div class="g2">${rows.map((x,i)=>`<div class="r2" style="grid-template-columns:minmax(0,1fr) auto"><span class="rt2"><b>${esc(people(x.owner_name)[0]||x.street_address||'Owner unknown')}</b><span>${esc(why(x.reason))} · ${esc(x.street_address||'')}, ${esc(x.suburb||'')} · ${x.until?'back '+esc(dayMon(x.until)):'for good'}</span></span><button class="b2" style="height:36px;padding:0 12px!important" onclick="restore2(${i})">Bring back</button></div>`).join('')}</div>`
   :'<p class="emptyline">Nobody taken off yet.</p>');
}
async function restore2(i){ const x=S._rm[i]; if(!x) return;
  try{ await api("restore_removed",{ref:x.ref}); }catch(e){ return toast(e.message); }
  toast('Back on the list from tomorrow'); removedSheet(); }
// ---------- Appraisals and Listings: one tab per stage, tidy rows like the call list ----------
// Tabs: another agency's listing sits under Lost, but is kept apart so it never counts as one of ours
const PST={appraisal:['Appraisals','Booked','appraisal_at'],listed:['Listed','Listed','listed_at'],sold:['Sold','Sold','sold_at'],withdrawn:['Withdrawn','Withdrawn','withdrawn_at'],lost:['Lost','Lost','lost_at'],listed_other:['Lost','Another agency','listed_other_at']};
const PTABS=['appraisal','listed','sold','withdrawn','lost'], ptab=s=>s==='listed_other'?'lost':s;
const PNEXT={appraisal:[['listed','Listed with us'],['listed_other','Another agency'],['lost','Lost']],listed:[['sold','Sold'],['withdrawn','Withdrawn']],withdrawn:[['listed','Relisted'],['listed_other','Another agency']],sold:[],lost:[['appraisal','Reopen']],listed_other:[['appraisal','Reopen']]};
const pBad=s=>s==='lost'||s==='listed_other'||s==='withdrawn';
function paintPipe(){ return window.viewPipeline(true); }
window.viewPipeline=async function(local){
  const rows=local===true&&S.pipe?S.pipe:((await api("pipeline")).rows||[]); S.pipe=rows;
  const cnt=k=>rows.filter(x=>ptab(x.stage)===k).length;
  if(!PST[S.pst]) S.pst=cnt('appraisal')||!cnt('listed')?'appraisal':'listed';
  const list=rows.filter(x=>ptab(x.stage)===S.pst);
  const when=x=>{ const d=x[PST[x.stage][2]]||x.updated_at; return d?new Date(d).toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',weekday:'short',day:'numeric',month:'short'}):''; };
  $("#main").innerHTML=`<div class="pp2">
   <div class="lh2 pph2"><h1>${PTITLE2[S.pst||'appraisal']||'Appraisals'}</h1>
    <div class="seg2 mini">${PTABS.map(k=>[k,PST[k]]).map(([k,v])=>`<button class="${S.pst===k?'on':''}" onclick="S.pst='${k}';viewPipeline(true)">${v[0]}</button>`).join('')}</div>
    <button class="b2 pri" style="height:40px;margin-left:auto" onclick="openAddPipe()" aria-label="Add appraisal or listing">${ic2('plus',18)}<span class="addt">Add</span></button></div>
   <div class="lg4 h"><span></span><span>Owner</span><span>${PST[S.pst][1]}</span><span>Last bought</span><span></span></div>
   ${list.length?list.map(x=>{ const u=aerialUrl(x,PH_SMALL[0],PH_SMALL[1]), id=x.property_id;
     return `<div class="lg4" onclick="pipeSheet(${id})">
      <div class="th3">${u?`<img src="${u}" alt="" loading="lazy" onerror="this.remove()">`:''}</div>
      <div class="nm3"><b>${esc(people(x.owner_name)[0]||'Owner unknown')}</b><span>${esc(x.street_address||'')}${x.suburb?', '+esc(x.suburb):''}</span>${x.notes?`<em class="pn4">${esc(x.notes)}</em>`:''}</div>
      <div class="bt3"><b>${esc(when(x))}</b><span>${x.stage==='listed_other'?'Another agency listed':'From '+esc((SOURCES[x.source||'calls']||'calls').toLowerCase())}</span></div>
      <div class="bt3 pb4">${x.last_sale_date?`<b>${x.last_sale_price?esc(price2(x.last_sale_price)):'Price n/a'}</b><span>${String(x.last_sale_date).slice(0,4)}</span>`:'<span>No sale on record</span>'}</div>
      <div class="ac4">${PNEXT[x.stage].map(([s2,l],i)=>`<button class="b2 ${i===0&&!pBad(s2)?'go4':''}" onclick="event.stopPropagation();setStage(${id},'${s2}')">${l}</button>`).join('')}${x.phone?`<button class="cl3" aria-label="Call" onclick="event.stopPropagation();if(hoursOk())openUrl('tel:${esc(String(x.phone).replace(/[^0-9+]/g,''))}')">${ic2('phone',18,'#fff')}</button>`:''}</div></div>`; }).join('')
   :`<div class="empty2"><b>No ${PST[S.pst][0].toLowerCase()} yet</b>${S.pst==='appraisal'?'Book one from the call list and it shows up here.':''}</div>`}
  </div>`;
};
function pipeSheet(id){ const x=(S.pipe||[]).find(r=>r.property_id===id); if(!x) return;
  openSheet2(esc(people(x.owner_name)[0]||x.street_address||'Property'),`<p class="hint2">${esc(x.street_address||'')}${x.suburb?', '+esc(x.suburb):''}</p>
   <div class="g2">${PNEXT[x.stage].map(([s2,l])=>row2(({listed:'var(--lst)',sold:'var(--sld)',withdrawn:'#64748b',appraisal:'var(--ap)'})[s2]||'var(--ns)',pBad(s2)?'x':'check',l,{listed_other:'They listed with someone else. Not counted as ours',withdrawn:'Our listing came off the market',sold:'Our listing sold',listed:'They signed with Dignam'}[s2]||'',chev2(),`closeOv();setStage(${id},'${s2}')`)).join('')}
    ${row2('#4b5565','msg',x.notes?'Edit note':'Add a note',x.notes?esc(x.notes):'',chev2(),`closeOv();stageNote(${id})`)}
    ${row2('#4b5565','tag','Came from',esc(SOURCES[x.source||'calls']),chev2(),`pickSource(${id},'${x.source||'calls'}')`)}
    ${((ph,ii)=>ph.map(([n,p],k)=>row2('var(--ap)','phone',ph.length>1&&ii[k]?`${ini7(ii[k])}${esc(fmtPh2(p))}`:`Call ${esc(firstName(n||''))!=='them'?esc(firstName(n))+' ':''}${esc(fmtPh2(p))}`,'',chev2(),`if(hoursOk())openUrl('tel:${esc(String(p).replace(/[^0-9+]/g,''))}')`)).join(''))([[x.owner_name,x.phone],[x.owner2_name,x.phone2]].filter(p=>p[1]),inis7(names7(people(x.owner_name)[0]||x.owner_name,x.owner2_name),2))}</div>
   <div class="g2">${row2('#4b5565','users','Names and phones',esc([x.owner_name,x.owner2_name].filter(Boolean).join(' & ')||'Add the owners'),chev2(),`S.ecFrom='pipe';editContact2(${id})`)}
    ${row2('#6366f1','lead',x.lead_id?'Open their lead':'Make a lead','Notes, follow ups and buyer details',chev2(),x.lead_id?`closeOv();pipeLead(${x.lead_id})`:`closeOv();pipeMakeLead(${id})`)}</div>`); }
async function pipeLead(lid){ if(!S.leads) await loadLeads().catch(()=>{}); openLead(lid); }
async function pipeMakeLead(id){ try{ const r=await api("make_lead",{property_id:id}); const x=(S.pipe||[]).find(p=>p.property_id===id); if(x) x.lead_id=r.lead_id; await loadLeads().catch(()=>{}); openLead(r.lead_id); }catch(e){ toast(e.message); } }

// Homes a lead has said no to never show as matches again
window.matchesFor=(function(orig){ return function(l){ const no=((l&&l.buy)||{}).no||[]; return orig(l).filter(x=>!no.includes(+x.t.id)); }; })(window.matchesFor);
async function rejectMatch(leadId,listingId){ const l=(S.leads||[]).find(x=>x.id===leadId); if(!l) return;
  const buy={...(l.buy||{})}; buy.no=[...new Set([...(buy.no||[]),listingId])];
  const prev=l.buy; l.buy=buy; openLead(leadId,{keepScroll:true});
  try{ await api("save_lead",{id:leadId,lead:{buy}}); toast("Removed. It won't show for them again",()=>{ l.buy=prev; api("save_lead",{id:leadId,lead:{buy:prev||{}}}).catch(()=>{}); openLead(leadId,{keepScroll:true}); }); }
  catch(e){ l.buy=prev; openLead(leadId,{keepScroll:true}); toast("Couldn't save that. "+e.message); } }
// New lead: their details first, then what they want to buy
window.openLead=(function(orig){ return function(id,opts){ const r=orig(id,opts);
  [['d_lead_type','Lead type'],['d_source','Source'],['d_timeframe','Timeframe']].forEach(([k,t])=>{ const o=$('#'+k)?.querySelector('option[value=""]'); if(o) o.textContent=t; });
  setTimeout(subPick,0);
  if(!id){ const d=$("#deditor"), w=$("#wview_box"); if(d&&w&&w.parentNode){ w.parentNode.insertBefore(d,w); if(!d.querySelector('.wlabel')) d.insertAdjacentHTML('afterbegin','<div class="wlabel">Their details</div>'); } }
  return r; }; })(window.openLead);

// Suburb picker in our own style instead of the browser's white dropdown
function subPick(){ document.querySelectorAll('#sheet input[list="sublist"]').forEach(inp=>{
  inp.removeAttribute('list'); inp.setAttribute('autocomplete','off'); const isAdd=inp.id==='b_sub_add';
  const box=document.createElement('div'); box.className='sugg2'; inp.insertAdjacentElement('afterend',box);
  const show=()=>{ const q=inp.value.trim().toLowerCase(); const xs=SUBURBS.filter(x=>!q||x.toLowerCase().includes(q)).slice(0,8);
    box.innerHTML=xs.map(x=>`<button type="button" data-s="${esc(x)}">${esc(x)}</button>`).join(''); box.style.display=xs.length&&document.activeElement===inp?'block':'none'; };
  box.addEventListener('mousedown',e=>e.preventDefault());
  box.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; inp.value=b.dataset.s; box.style.display='none';
    if(isAdd){ addSub(inp); inp.value=''; inp.focus(); } inp.dispatchEvent(new Event('input',{bubbles:true})); });
  inp.addEventListener('input',show); inp.addEventListener('focus',show); inp.addEventListener('blur',()=>setTimeout(()=>box.style.display='none',100));
  if(isAdd){ inp.removeAttribute('onchange'); inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); const f=box.querySelector('button'); if(f){ inp.value=f.dataset.s; } addSub(inp); inp.value=''; show(); } }); }
}); }

// ---------- Settings: a short menu; each item shows its current value and opens its own small panel ----------
const RET2=[["noanswer_gap_days","Missed call",3],["noanswer_rest_days","6 missed calls in a row",90],["not_interested_days","Not selling",365],["lead_closed_days","Lead closed or lost",180],["appraisal_days","After an appraisal",365],["sold_days","After it sells",1095],["recent_call_days","Any answered call",7]];
const daysTxt=d=>d>=365&&d%365===0?`${d/365} yr${d/365>1?'s':''}`:d>=30&&d%30===0?`${d/30} mth${d/30>1?'s':''}`:`${d} day${d>1?'s':''}`;
const t12=v=>{ const [h,m]=String(v||'').slice(0,5).split(':').map(Number); if(isNaN(h)) return ''; return `${h%12||12}${m?':'+String(m).padStart(2,'0'):''}${h<12?'am':'pm'}`; };
window.viewSettings=async function(){
  const [ov,t]=await Promise.all([api("overview"),api("templates")]); S.templates=t.rows||[]; S.setv=ov.settings||{}; const s=S.setv;
  const sec=(title,rows)=>`<div class="set2"><div class="sth2">${title}</div><div class="g2">${rows.join('')}</div></div>`;
  const val=v=>`<span class="sv2">${v}${chev2()}</span>`;
  $("#main").innerHTML=`<div class="setw2"><div class="ph2"><h1>Settings</h1></div>
   ${sec('Calling',[
     row2('var(--cb)','skip','Auto dial next','',`<span class="sw2 ${S.autodial?'on':''}"><i></i></span>`,'toggleAuto()'),
     row2('var(--cb)','clock','Booked call backs','',chev2(),'upcomingCB()'),
     row2('var(--ns)','ban','Taken off the list','',chev2(),'removedSheet()'),
     row2('var(--ap)','chart','Daily target','',val(`${s.daily_target??100} calls`),'setTargets()')])}
   ${sec('Your list',[
     row2('var(--acc)','users','List size','',val(`${s.seller_list_size} sellers · ${s.landlord_list_size} landlords`),'setTargets()'),
     row2('#6366f1','cal','When people come back','',val('7 rules'),'setReturn()'),
     row2('#14b8a6','check','List health','',chev2(),'setHealth()'),
     row2('#4b5565','house','Rebuild today\'s list','',chev2(),'regen2()')])}
   ${sec('Texts',[
     row2('var(--acc)','msg','Message templates','',val(`${S.templates.length}`),'setTemplates()'),
     row2('var(--acc)','send','Scheduled and sent texts','',chev2(),"go('messages')"),
     row2('#4b5565','clock','Texting hours','',val(`${t12(s.quiet_start)} to ${t12(s.quiet_end)}`),'setTargets()')])}
   ${sec('Data',[
     row2('#d97706','plus','Import a file','',chev2(),'setImport()'),
     row2('#16a34a','plus','Import leads from Google Sheets','',chev2(),'setSheets()')])}
   ${sec('Account',[
     row2('#4b5565','gear','Change password','',chev2(),'setPw()'),
     row2('#4b5565','users','Sign out','','','logout()')])}
   </div>`;
};
function setTargets(){ const s=S.setv||{};
  openSheet2('List and targets',`<div class="fg2">
    <label><span>Calls per day</span><input type="number" id="s7" value="${s.daily_target??100}"></label>
    <label><span>Appraisals per 100 calls</span><input type="number" step="0.5" id="s8" value="${s.target_rate??3}"></label>
    <label><span>Sellers on the list</span><input type="number" id="s1" value="${s.seller_list_size}"></label>
    <label><span>Landlords on the list</span><input type="number" id="s2" value="${s.landlord_list_size}"></label>
    <label><span>Texts from</span><input type="time" id="s5" value="${String(s.quiet_start||'08:00').slice(0,5)}"></label>
    <label><span>Texts until</span><input type="time" id="s6" value="${String(s.quiet_end||'20:00').slice(0,5)}"></label>
    <label><span>Test group %</span><input type="number" id="s3" value="${Math.round((s.control_pct||0)*100)}"></label>
    <label><span>Only DNCR washed numbers</span><select id="s4"><option value="true" ${s.require_dncr_wash?"selected":""}>Yes</option><option value="false" ${!s.require_dncr_wash?"selected":""}>No</option></select></label>
   </div><button class="b2 pri wide2b" onclick="saveSettings().then(()=>{closeOv();render()})">Save</button>`); }
function setReturn(){ const s=S.setv||{};
  openSheet2('When people come back',`<p class="hint2">Days before someone is back on your list.</p><div class="fg2 one">${RET2.map(([k,l,d])=>`<label><span>${l}</span><span class="din2"><input type="number" min="1" id="r_${k}" value="${s[k]??d}"><em>days</em></span></label>`).join('')}</div>
   <p class="hint2">Do not call is forever. Open leads and booked call backs stay off until dealt with.</p><button class="b2 pri wide2b" onclick="saveReturn().then(()=>{closeOv();render()})">Save</button>`); }
function setHealth(){ openSheet2('List health',`<div id="health"><p class="hint2">Checking…</p></div>`); loadHealth(); }
async function loadHealth(){ const el=$("#health"); if(!el) return;
  try{ const h=(await api("list_health")).rows||{}; const c=(h.checks||[])[0], rep=h.reports||[], bad=h.rule_breakers_on_list||0;
    el.innerHTML=`<div class="hb2 ${bad?'bad':''}">${ic2(bad?'warn':'check',22)}<div><b>${bad?`${bad} rule breaker${bad>1?'s':''} on today's list`:'Today\'s list passes every check'}</b><span>${[h.list_size!=null?h.list_size+' people on the list':'',c?c.removed+' taken off this morning':''].filter(Boolean).join(' · ')}</span></div></div>
     ${(h.safeguards||[]).length?`<div class="sth2">Safeguards</div><div class="g2">${h.safeguards.map(g=>`<div class="r2"><span class="tile" style="--c:${g.ok?'#16a34a':'#d97706'}">${ic2(g.ok?'check':'warn',16,'#fff')}</span><span class="rt2"><b>${esc(g.name)}</b></span><span class="sv2">${Number(g.n).toLocaleString()}</span></div>`).join('')}</div>`:''}
     ${c&&Object.keys(c.rules||{}).length?`<div class="sth2">Taken off this morning</div><div class="g2">${Object.entries(c.rules).map(([k,v])=>`<div class="hr2"><span>${esc(k[0].toUpperCase()+k.slice(1))}</span><b>${v}</b></div>`).join('')}</div>`:''}
     ${rep.length?`<div class="sth2">Problems you reported</div><div class="g2">${rep.slice(0,10).map(r=>`<div class="hr2"><span>${esc(r.address)}<em>${esc((WRONG.find(w=>w[0]===r.kind)||[,r.kind])[1])}${r.note?' · '+esc(r.note):''}</em></span></div>`).join('')}</div>`:''}`;
  }catch(e){ el.innerHTML=`<p class="hint2">${esc(e.message)}</p>`; } }
function setTemplates(){
  const card=tp=>`<div class="tpl2"><input id="tn${tp.id}" class="tpn2" placeholder="Template name" value="${esc(tp.name)}"><textarea id="tb${tp.id}" rows="${Math.max(3,Math.ceil((tp.body||'').length/(desk2()?70:36))+1)}" placeholder="Hi {first_name}, it's Marlowe from Dignam. … Reply STOP to opt out.">${esc(tp.body)}</textarea>
    <div class="tpr2"><select id="td${tp.id}">${[["now","Send now"],["tomorrow_8am","Tomorrow 8am"],["1w","Next week"]].map(([k,l])=>`<option value="${k}" ${k===tp.default_delay?"selected":""}>${l}</option>`).join("")}</select>
    <button class="b2 pri" onclick="saveTpl(${tp.id})">${tp.id?'Save':'Add'}</button>${tp.id?`<button class="b2 del2" onclick="delTpl(${tp.id})">Delete</button>`:''}</div></div>`;
  openSheet2('Message templates',`<p class="hint2">Fill ins: {first_name} {address} {street} {suburb} {appt_date} {callback_date}</p>${S.templates.map(card).join('')}<div class="sth2">New template</div>${card({id:0,name:'',body:'',default_delay:'now'})}`); }
function setImport(){
  openSheet2('Import a file',`<div class="fg2 one"><label><span>What is it?</span><select id="ik" onchange="S.pending=null;previewCSV()"><option value="properties">RP Data or Pricefinder export</option><option value="crm">Dignam CRM contacts</option><option value="probate">Probate notices</option><option value="withdrawn">Withdrawn or expired listings</option><option value="on_market">Currently for sale</option><option value="dncr">DNCR wash results</option><option value="crm_notes">Office notes (file from Claude)</option></select></label>
   <label><span>Files</span><input type="file" id="if" multiple accept=".csv,.json,.pdf,.xlsx,.xls,application/pdf" onchange="S.impDir=null;S.pending=null;previewCSV()"></label><button type="button" class="b2 ghost dir6" onclick="$('#ifd').click()">Choose a whole folder</button><input type="file" id="ifd" webkitdirectory multiple hidden onchange="S.impDir=[...this.files];S.pending=null;previewCSV()"></div><div id="ir" class="hint2"></div>
   <button class="b2 pri wide2b" onclick="importCSV()">${ic2('plus',18)}Import</button>`); }
function setSheets(){
  openSheet2('Import leads from Google Sheets',`<p class="hint2">Share the sheet as "Anyone with the link can view", then paste the link.</p><div class="fg2 one"><label><span>Sheet link</span><input id="gs_url" placeholder="https://docs.google.com/spreadsheets/d/…"></label></div><div id="gs_r" class="hint2"></div>
   <button class="b2 pri wide2b" id="gs_go" onclick="importLeadsSheet()">${ic2('plus',18)}Import leads</button>`); }
function setPw(){
  openSheet2('Change password',`<div class="fg2 one"><label><span>Current password</span><input type="password" id="p0" autocomplete="current-password"></label><label><span>New password, 10 or more characters</span><input type="password" id="p1" autocomplete="new-password"></label></div>
   <button class="b2 pri wide2b" onclick="changePw()">Change password</button>`); }
async function saveTpl(id){ const body=$("#tb"+id).value; if(!/stop/i.test(body) && !(await uiAsk("This message has no STOP opt out. Save anyway?", {ok:"Save anyway"}))) return;
  try{ await api("save_template",{id:id||null,name:$("#tn"+id).value,body,default_delay:$("#td"+id).value}); S.templates=(await api("templates")).rows||[]; toast(id?"Template saved":"Template added"); setTemplates(); }catch(e){toast(e.message);} }
async function delTpl(id){ if(!(await uiAsk("Delete this template?", {ok:"Delete"}))) return; await api("delete_template",{id}); S.templates=(await api("templates")).rows||[]; setTemplates(); }

async function regen2(){ if(!(await uiAsk("Rebuild today's list now? It takes about a minute.",{ok:'Rebuild'}))) return; regen(); }
function openAddPipe(){
  S.addp={stage:"appraisal",source:"card_drop"};
  const pick=(key,opts,cls)=>`<div class="opts3 ${cls}" id="ap_${key}">${opts.map(([k,l])=>`<button type="button" class="${S.addp[key]===k?'on':''}" onclick="S.addp.${key}='${k}';document.querySelectorAll('#ap_${key} button').forEach(b=>b.classList.toggle('on',b===this))">${l}</button>`).join('')}</div>`;
  openSheet2('Add appraisal or listing',`<div class="fg2 ap4"><label><span>No.</span><input id="ap_no" inputmode="text"></label><label><span>Street</span><input id="ap_st"></label></div>
   <div class="fg2 one" style="margin-top:10px"><label><span>Suburb</span><input id="ap_sub"></label></div>
   <div class="fg2 two4" style="margin-top:10px"><label><span>Owner</span><input id="ap_own" placeholder="Optional"></label><label><span>Phone</span><input id="ap_ph" inputmode="tel" placeholder="Optional"></label></div>
   <div class="sth2" style="margin-left:0">Stage</div>${pick('stage',[["appraisal","Appraisal booked"],["listed","Listed"]],'c2')}
   <div class="sth2" style="margin-left:0">Came from</div>${pick('source',Object.entries(SOURCES).filter(([k])=>k!=="calls"),'c3')}
   <button class="b2 pri wide2b" id="ap_go" onclick="saveAddPipe()">Add</button>`);
  setTimeout(()=>$("#ap_no")?.focus(),60);
}

// What a lead wants, as three plain lines instead of tiles and pills
function wantsView(b){ b=b||{};
  if(!hasCriteria(b)) return `<button class="wempty" onclick="editWants(true)"><i class="ti ti-plus"></i>Add what they want to buy</button>`;
  const bud=b.min&&b.max?`${money(b.min)} to ${money(b.max)}`:b.max?`Up to ${money(b.max)}`:b.min?`From ${money(b.min)}`:"";
  const rooms=[b.beds?b.beds+'+ bed':'',b.baths?b.baths+'+ bath':'',b.cars?b.cars+'+ car':''].filter(Boolean).join(' · ');
  const types=[...(b.types||[]),...(b.flat?["Flat block"]:[])], subs=b.suburbs||[];
  const where=`${types.length?types.join(' or '):'Any type'} in ${subs.length?subs.join(', '):'any area'}`;
  return `<div class="wcard w2" id="wview">
    <div class="whead"><div style="flex:1;min-width:0"><div class="wl2">Looking to buy</div><div class="wbudget${bud?"":" none"}">${bud||"Budget not set yet"}</div></div><button class="wedit" onclick="editWants(true)"><i class="ti ti-pencil"></i>Edit</button></div>
    ${rooms?`<div class="wln2">${esc(rooms)}</div>`:''}<div class="wln2">${esc(where)}</div>
    ${(b.musts||[]).length?`<div class="wln2"><span>Must have</span> ${esc(b.musts.join(', '))}</div>`:''}</div>`; }

// ---------- phone safeguard: a phone box holds a number, never a name (the server and database check the same) ----------
function phoneProblem(p){ const v=String(p||'').trim(); if(!v) return null;
  if(!/\d/.test(v)) return `The phone box has no number in it. If "${v.slice(0,40)}" is part of their name, put it in the name box.`;
  if(/[A-Za-z]{2}/.test(v)) return 'The phone box has words in it. Names go in the name box.';
  const d=v.replace(/\D/g,'').length; if(d<8) return 'That phone number is too short. It needs at least 8 digits.'; if(d>24) return 'That phone number is too long.'; return null; }
function phoneBad(inp,msg){ if(!inp) return; inp.classList.add('bad2'); inp.setAttribute('aria-invalid','true');
  let n=inp.parentElement.querySelector('.err2'); if(!n){ n=document.createElement('div'); n.className='err2'; n.setAttribute('role','alert'); inp.insertAdjacentElement('afterend',n); } n.textContent=msg;
  const d=inp.closest('#deditor'); if(d) d.hidden=false; inp.focus(); inp.oninput=()=>{ inp.classList.remove('bad2'); inp.removeAttribute('aria-invalid'); n.remove(); }; }
// Moves a word typed in the phone box onto the end of the name, then clears the phone box
function phoneToName(){ const p=$('#d_phone'), n=$('#d_name'); if(!p||!n) return; n.value=(n.value.trim()+' '+p.value.trim()).trim(); p.value=''; p.dispatchEvent(new Event('input',{bubbles:true})); n.focus(); }
// Saving a lead: checks the phone box holds a number, not a name
window.saveLeadAll=(function(orig){ return async function(id){ const p=$('#d_phone'), e=p&&phoneProblem(p.value);
  if(e){ phoneBad(p,e); if(!/\d/.test(p.value)) p.parentElement.querySelector('.err2').insertAdjacentHTML('beforeend',` <button class="lnk2" onclick="phoneToName()">Move it to the name</button>`);
    const b=$('#lead_save'); if(b){ b.textContent='Fix the phone first'; b.classList.add('err'); } return; }
  return orig(id); }; })(window.saveLeadAll);

// ---------- matches: removing a person from a listing works from both sides ----------
window.buyersFor=(function(orig){ return function(t){ return orig(t).filter(x=>!(((x.l.buy)||{}).no||[]).includes(+t.id)); }; })(window.buyersFor);
window.rejectMatch=(function(){ return async function(leadId,listingId,from){ const l=(S.leads||[]).find(x=>x.id===leadId); if(!l) return;
  const redraw=()=>from==='listing'?openListingMatches(listingId):openLead(leadId,{keepScroll:true});
  const buy={...(l.buy||{})}; buy.no=[...new Set([...(buy.no||[]),listingId])];
  const prev=l.buy; l.buy=buy; redraw();
  try{ await api("save_lead",{id:leadId,lead:{buy}}); toast(from==='listing'?`${leadTitle(l)} removed from this home`:"Removed. It won't show for them again",()=>{ l.buy=prev; api("save_lead",{id:leadId,lead:{buy:prev||{}}}).catch(()=>{}); redraw(); }); }
  catch(e){ l.buy=prev; redraw(); toast("Couldn't save that. "+e.message); } }; })();
// Listing matches: shows each buyer's details on the match cards
window.openListingMatches=(function(orig){ return function(lid){ orig(lid);
  const t=(S.listings||[]).find(x=>x.id===lid); if(!t) return; const by=buyersFor(t);
  [...document.querySelectorAll('#sheet .lsec .mcard')].forEach((c,i)=>{ const x=by[i]; if(!x) return;
    c.insertAdjacentHTML('beforeend',`<button class="iconbtn" onclick="event.stopPropagation();rejectMatch(${x.l.id},${+t.id},'listing')" aria-label="Remove ${esc(leadTitle(x.l))} from this home" title="Not a match for them"><i class="ti ti-trash"></i></button>`); }); }; })(window.openListingMatches);

