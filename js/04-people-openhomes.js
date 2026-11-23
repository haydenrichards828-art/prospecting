// ---------- people on the calls side: fix a name or number, or add someone to ring back later ----------
const LATER=[['3 months',3],['6 months',6],['1 year',12],['2 years',24],['3 years',36],['5 years',60]];
// A date some months ahead at 10am Sydney time, moved off Sundays
function monthsAhead(n){ const p=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:"Australia/Sydney",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date()).map(x=>[x.type,x.value]));
  const d=new Date(Date.UTC(+p.year,+p.month-1+n,Math.min(+p.day,28))); if(d.getUTCDay()===0) d.setUTCDate(d.getUTCDate()+1);
  return sydToISO(d.toISOString().slice(0,10)+'T10:00'); }
const longLab=iso=>new Date(iso).toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',day:'numeric',month:'long',year:'numeric'});
function findRow(id){ return (S.ecFrom==='pipe'&&(S.pipe||[]).find(x=>x.property_id===id))||(S.rows||[]).find(x=>x.property_id===id)||(S.callbacks||[]).find(x=>x.property_id===id)||queue().find(x=>x.property_id===id)||(S.sres?.props||[]).find(x=>x.id===id); }
function editContact2(id){ const r=findRow(id)||{};
  openSheet2('Names and phones',`<div class="ap2"><label class="fl2">Name<input id="ec_name" value="${esc(r.owner_name||'')}" autocomplete="off"></label>
   <label class="fl2">Phone<input id="ec_phone" inputmode="tel" value="${esc(fmtPh2(r.owner_phone||r.phone||''))}" autocomplete="off"></label>
   <label class="fl2">Second owner<input id="ec_name2" value="${esc(r.owner2_name||'')}" placeholder="Husband, wife or partner" autocomplete="off"></label>
   <label class="fl2">Their phone<input id="ec_phone2" inputmode="tel" value="${esc(fmtPh2(r.phone2||''))}" autocomplete="off"></label></div>
   <p class="muted" style="margin:0 4px;font-size:13px">Your change is kept even when new data comes in.</p>
   <button class="b2 pri" id="ec_go" onclick="saveContact2(${id})">Save</button>`,S.ecFrom==='pipe'?`pipeSheet(${id})`:S.ecFromSearch?null:`moreSheet2(${id})`); setTimeout(()=>$('#ec_name')?.focus(),50); }
async function saveContact2(id){ const n=$('#ec_name').value.trim(), p=$('#ec_phone').value.trim(), n2=$('#ec_name2')?.value.trim()||'', p2=$('#ec_phone2')?.value.trim()||'', e=phoneProblem(p), e2=phoneProblem(p2);
  if(e) return phoneBad($('#ec_phone'),e); if(e2) return phoneBad($('#ec_phone2'),e2); if(!n&&!p) return phoneBad($('#ec_name'),'Add a name or a phone number.');
  const b=$('#ec_go'); b.disabled=true; b.textContent='Saving…';
  try{ await api("save_contact",{property_id:id,owner_name:n,phone:p,owner2_name:n2,phone2:p2}); }catch(err){ b.disabled=false; b.textContent='Save'; return phoneBad(/second/i.test(err.message)?$('#ec_phone2'):$('#ec_phone'),err.message); }
  const nz=s=>s.replace(/\D/g,'').replace(/^61(\d{9})$/,'0$1'), ph=nz(p), ph2=nz(p2);
  [...(S.rows||[]),...(S.callbacks||[])].filter(x=>x.property_id===id).forEach(x=>{ x.owner_name=n||null; x.phone=ph||null; x.owner_phone=ph||null; x.owner2_name=n2||null; x.phone2=ph2&&ph2!==ph?ph2:null; });
  (S.sres?.props||[]).filter(x=>x.id===id).forEach(x=>{ x.owner_name=n||null; x.phone=ph||null; });
  (S.pipe||[]).filter(x=>x.property_id===id).forEach(x=>{ x.owner_name=n||null; x.phone=ph||null; x.owner2_name=n2||null; x.phone2=ph2&&ph2!==ph?ph2:null; });
  if(S.ecFrom==='pipe'){ S.ecFrom=null; saveCallsCache(); closeOv(); toast('Saved'); if(S.tab==='pipeline') paintPipe(); pipeSheet(id); return; }
  saveCallsCache(); closeOv();
  if(S.ecFromSearch){ S.ecFromSearch=false; toast(ph?'Saved. They go on the call list on days they rank high enough':'Saved'); if(S.searching&&S.sq) runSearch(S.sq); return; }
  drawList(); toast('Saved'); }
// Call screen More: adds Edit name and phone
window.moreSheet2=(function(orig){ return function(id){ S.ecFromSearch=false; S.ecFrom=null; orig(id);
  const g=document.querySelector('#sheet .sb2 .g2'); if(g) g.insertAdjacentHTML('beforeend',row2('#4b5565','users','Edit name and phone','Fix a wrong name or number',chev2(),`editContact2(${id})`)); }; })(window.moreSheet2);
// Call back sheet: adds Months or years from now
window.callbackSheet2=(function(orig){ return function(id){ orig(id);
  const gs=document.querySelectorAll('#sheet .sb2 .g2'); const g=gs[gs.length-1]; if(g) g.insertAdjacentHTML('beforeend',row2('#4b5565','clock','Months or years from now','For someone who just sold or bought',chev2(),`laterSheet2(${id})`)); }; })(window.callbackSheet2);
function laterSheet2(id){ openSheet2('Call back in',`<div class="later2">${LATER.map(([l,m])=>`<button onclick="closeOv();record(${id},'call_back',monthsAhead(${m}))"><b>${l}</b><span>${esc(longLab(monthsAhead(m)))}</span></button>`).join('')}</div>`,`callbackSheet2(${id})`); }
function addPerson2(){ S.apWhen=null;
  openSheet2('Add a person',`<div class="ap2"><label class="fl2">Name<input id="ap_name" autocomplete="off"></label><label class="fl2">Phone<input id="ap_phone" inputmode="tel" autocomplete="off"></label>
   <label class="fl2">Address<input id="ap_addr" placeholder="12 Smith Street" autocomplete="off"></label><label class="fl2">Suburb<input id="ap_sub" list="sublist2" autocomplete="off"></label></div>
   <datalist id="sublist2">${(typeof SUBURBS!=='undefined'?SUBURBS:[]).map(s=>`<option value="${esc(s)}">`).join('')}</datalist>
   <div class="fl2">Call them back in<div class="later2 sm" id="ap_when">${LATER.map(([l,m])=>`<button onclick="S.apWhen=monthsAhead(${m});pickOne(this);$('#ap_date').value='';$('#ap_when .pd2').classList.remove('on')"><b>${l}</b></button>`).join('')}<label class="pd2"><span>Pick date</span><input type="date" id="ap_date" onchange="S.apWhen=this.value?sydToISO(this.value+'T10:00'):null;pickOne(null,'#ap_when');this.parentElement.classList.toggle('on',!!this.value);this.previousElementSibling.textContent=this.value?longLab(S.apWhen):'Pick date'"></label></div></div>
   <label class="fl2">Note<textarea id="ap_note" rows="1" data-grow placeholder="Sold 12 Smith St in November, wants a check in"></textarea></label>
   <button class="b2 pri" id="ap_go" onclick="savePerson2()">Add to call backs</button>`); setTimeout(()=>$('#ap_name')?.focus(),50); }
async function savePerson2(){ const v=k=>$('#ap_'+k).value.trim(), e=phoneProblem(v('phone'));
  if(e) return phoneBad($('#ap_phone'),e);
  if(!v('name')&&!v('phone')) return phoneBad($('#ap_name'),'Add their name or phone number.');
  if(!/^\s*(\w+\s*\/\s*)?\d+\w?\s+\S/.test(v('addr'))) return phoneBad($('#ap_addr'),'Start with the house number, like 12 Smith Street.');
  if(!v('sub')) return phoneBad($('#ap_sub'),'Add the suburb.');
  if(!S.apWhen) return toast('Pick when to call them back');
  const b=$('#ap_go'); b.disabled=true; b.textContent='Adding…';
  try{ await api("add_person",{name:v('name'),phone:v('phone'),address:v('addr'),suburb:v('sub'),callback_at:S.apWhen,notes:v('note')}); }
  catch(err){ b.disabled=false; b.textContent='Add to call backs'; return toast(err.message); }
  closeOv(); toast(`${v('name')||'They'} will come up as a call back on ${longLab(S.apWhen)}`); }
// Booked call backs: reminders added by hand move and cancel on their own record
window.saveMoveCB=(function(orig){ return async function(i){ const c=S._ucb[i]; if(!c||!c.reminder_id) return orig(i); const v=$('#mcb2').value; if(!v) return toast('Pick a date and time');
  try{ await api("reminder",{id:c.reminder_id,callback_at:sydToISO(v)}); }catch(e){ return toast(e.message); } toast('Call back moved to '+fmt(sydToISO(v))); await loadCallbacks(); upcomingCB(); }; })(window.saveMoveCB);
// Cancelling a booked call back asks first
window.cancelCB=(function(orig){ return async function(i){ const c=S._ucb[i]; if(!c||!c.reminder_id) return orig(i);
  if(!(await uiAsk(`Cancel the call back with ${people(c.owner_name)[0]||'them'}?`,{ok:'Cancel call back'}))) return upcomingCB();
  try{ await api("reminder",{id:c.reminder_id,cancel:true}); }catch(e){ return toast(e.message); } toast('Call back cancelled'); await loadCallbacks(); upcomingCB(); }; })(window.cancelCB);
// Booked call backs: Add a person at the top
window.upcomingCB=(function(orig){ return async function(){ await orig(); const sb=document.querySelector('#sheet .sb2');
  if(sb&&!sb.querySelector('.addp2')) sb.insertAdjacentHTML('afterbegin',`<div class="g2 addp2">${row2('var(--acc)','lead','Add a person','Someone to ring back months or years from now',chev2(),'addPerson2()')}</div>`); }; })(window.upcomingCB);
// Call list rail: Add a person button
window.drawList2=(function(orig){ return function(){ orig(); const r=document.querySelector('.rail2 .cbk'); if(r&&!document.querySelector('.rail2 .addp')) r.insertAdjacentHTML('afterend',`<button class="cbk addp" onclick="addPerson2()">Add a person<span>${ic2('lead',14)}</span></button>`); }; })(window.drawList2);
// Demo mode keeps the new actions working without a server
window.demoApi=(function(orig){ return function(action,body){ const D=window.__demo;
  if(action==='save_contact'){ const e=phoneProblem(body.phone); if(e) throw new Error(e); return {ok:true}; }
  if(action==='add_person'){ const e=phoneProblem(body.phone); if(e) throw new Error(e); return {ok:true,property_id:9e6+Date.now()%1e5}; }
  if(action==='reminder') return {ok:true};
  if(action==='save_lead'&&body.lead&&'phone' in body.lead){ const e=phoneProblem(body.lead.phone); if(e) throw new Error(e); }
  return orig(action,body); }; })(window.demoApi);

// Any address can get owner details from search; with a phone number they compete for a spot on the daily list
window.openSearchProp=(function(orig){ return function(pid,inList){ orig(pid,inList);
  const p=(S.sres?.props||[]).find(x=>x.id===pid), r=(S.sres?.calls||[]).find(x=>x.property_id===pid), has=(p||r)&&((p||r).owner_name||(p||r).phone);
  const sh=$('#sheet'); if(!sh) return;
  sh.insertAdjacentHTML('beforeend',`<button class="ghost" style="width:100%;margin-top:8px" onclick="S.ecFrom=null;S.ecFromSearch=true;editContact2(${pid})"><i class="ti ti-pencil"></i>${has?'Edit owner name and phone':'Add owner name and phone'}</button>`); }; })(window.openSearchProp);
// Enquiry call lists (owners near a home buyers are chasing) show as their own group, first in the list
window.grp=(function(orig){ return function(r){ return r&&r.campaign?r.campaign:orig(r); }; })(window.grp);
// Call list groups: special lists (call sheets) come before the suburbs
window.bySuburb=(function(orig){ return function(rows){ const c=rows.filter(r=>r.campaign).sort((a,b)=>a.rank-b.rank); return [...c,...orig(rows.filter(r=>!r.campaign))]; }; })(window.bySuburb);

// A stage change moves the home straight away; the server catches up behind it
window.setStage=async function(id,stage,notes){ const x=(S.pipe||[]).find(r=>r.property_id===id), prev=x&&{...x};
  // big moves are confirmed first so a stray tap can't mark a home sold or lost
  const ASK={sold:['Mark as Sold?','Yes, sold'],lost:['Mark as Lost?','Yes, lost'],withdrawn:['Mark as Withdrawn?','Yes, withdrawn'],listed_other:['Listed with another agency?','Yes, another agency'],listed:['Listed with Dignam?','Yes, listed']};
  if(ASK[stage]&&!(await uiAsk(`${ASK[stage][0]}${x?' '+(x.street_address||'')+(x.suburb?', '+x.suburb:''):''}`,{ok:ASK[stage][1]}))) return;
  if(x){ x.stage=stage; x[(PST[stage]||[])[2]]=new Date().toISOString(); if(typeof notes==='string') x.notes=notes; x.updated_at=new Date().toISOString(); if(S.tab==='pipeline') paintPipe(); }
  try{ await api("set_stage",{property_id:id,stage,notes}); toast('Moved to '+(stage==='listed_other'?'Lost (another agency)':PST[stage][0])); if(S.leads) loadLeads().catch(()=>{}); }
  catch(e){ if(x) Object.assign(x,prev); if(S.tab==='pipeline') paintPipe(); toast("Couldn't move it. "+e.message); } };

// ---------- Open home calls: buyer enquiry lists from the CRM, one per Dignam listing ----------
const EOUT={coming:['Coming','var(--ap)','#5ee08f'],maybe:['Maybe','var(--cb)','var(--cbT)'],no_answer:['No answer','#7C3AED','var(--naT)'],not_coming:["Can't make it",'#4b5565','var(--t2)'],
  not_looking:['Not looking now','#4b5565','var(--t2)'],bought:['Bought elsewhere','#4b5565','var(--t2)'],wrong_number:['Wrong number','#4b5565','var(--t2)'],do_not_call:['Do not call','var(--ns)','var(--nsT)']};
const ohWhen=iso=>iso?new Date(iso).toLocaleString('en-AU',{timeZone:'Australia/Sydney',weekday:'long',day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}).replace(/:00/,'').replace(' am','am').replace(' pm','pm'):'';
async function viewEnquiry(){
  const [r]=await Promise.all([api("elists"),S.listings?null:loadLeads().catch(()=>{})]); S.el=r.rows||[];
  const live=S.el.filter(x=>!x.archived);
  if(!S.el.find(x=>x.id===S.elid)) S.elid=(live[0]||S.el[0]||{}).id||null;
  if(S.elid){ S.erows=(await api("elist",{id:S.elid})).rows||[]; } else S.erows=[];
  paintEnquiry();
}
function paintEnquiry(){
  const L=(S.el||[]).find(x=>x.id===S.elid), live=(S.el||[]).filter(x=>!x.archived), old=(S.el||[]).filter(x=>x.archived);
  const rail=`<nav class="rail2" aria-label="Call sheets"><button class="cbk" onclick="importSheet()">Import from CRM<span>${ic2('plus',14)}</span></button>
   ${live.map(x=>`<button class="${x.id===S.elid?'on':''}" onclick="openEList(${x.id})" title="${esc(x.address||x.title)}">${esc(shortAddr(x.address||x.title))}<span>${x.total-x.done}</span></button>`).join('')}
   ${old.length?`<div class="rh2">Finished</div>`+old.map(x=>`<button class="${x.id===S.elid?'on':''}" onclick="openEList(${x.id})">${esc(shortAddr(x.address||x.title))}<span>${x.coming}</span></button>`).join(''):''}</nav>`;
  if(!L){ $("#main").innerHTML=`<div class="list2">${rail}<div class="lm2"><div class="empty2"><b>No call sheets yet</b>Export the enquiries for a listing from the CRM, then tap Import from CRM. A spreadsheet or copied rows both work.<button class="b2 pri" onclick="importSheet()">Import from CRM</button></div></div></div>`; return; }
  const rows=S.erows||[], left=rows.filter(c=>!c.outcome||c.outcome==='no_answer').length;
  const addr=L.address?`${L.address}${L.suburb?', '+L.suburb:''}`:L.title;
  $("#main").innerHTML=`<div class="list2">${rail}<div class="lm2">
   <div class="lh2 oh2h"><div style="min-width:0;flex:1"><h1>${esc(addr)}</h1><div class="ohs">${L.open_at?`Open ${esc(ohWhen(L.open_at))}`:'<span style="color:var(--cbT)">No open home time set</span>'} · <b style="color:#5ee08f">${L.coming} coming</b> · ${L.maybe} maybe · ${left} to call</div></div>
    <button class="b2" style="height:40px" onclick="elSettings(${L.id})">${ic2('gear',16)}<span class="hide-phone">Open time and more</span></button></div>
   <div class="lr2">${rows.length?rows.map(eRow).join(''):'<div class="empty2"><b>Nobody on this list</b></div>'}</div></div></div>`;
}
const shortAddr=a=>String(a||'').replace(/\s+(Street|Road|Avenue|Drive|Place|Crescent|Parade|Close|Court|Lane|Circuit|Terrace|Way)\b/i,m=>' '+({street:'St',road:'Rd',avenue:'Ave',drive:'Dr',place:'Pl',crescent:'Cres',parade:'Pde',close:'Cl',court:'Ct',lane:'La',circuit:'Cct',terrace:'Tce',way:'Way'}[m.trim().toLowerCase()]));
function eRow(c){ const o=EOUT[c.outcome], tel=c.phone?c.phone:'', done=c.outcome&&c.outcome!=='no_answer';
  const sub=[c.phone?fmtPh2(c.phone):'No phone',c.enquired_on?'Enquired '+new Date(c.enquired_on+'T00:00').toLocaleDateString('en-AU',{day:'numeric',month:'short'}):null,c.attempts>1?c.attempts+' tries':null].filter(Boolean).join(' · ');
  return `<div class="er2 ${done?'done':''}" id="er${c.id}"><div class="nm"><b>${esc(c.name||c.email||'Name unknown')}${c.lead_id?' <span class="stag">lead</span>':''}</b><span>${esc(sub)}</span>${c.crm_note||c.note?`<em>${esc(c.note||c.crm_note)}</em>`:''}</div>
   <div class="eo2">${o?`<span class="eob" style="color:${o[2]}">${esc(o[0])}</span>`:''}
    ${c.dnc?'<span class="eob" style="color:var(--nsT)">Do not call list</span>':`${tel?`<a class="cl3" href="tel:${esc(tel)}" onclick="return hoursOk(event)" aria-label="Call ${esc(c.name||'')}">${ic2('phone',18,'#fff')}</a>`:''}
    <button class="b2 go4" onclick="eSet(${c.id},'coming')">Coming</button><button class="b2" onclick="eSet(${c.id},'maybe')">Maybe</button><button class="b2" onclick="eSet(${c.id},'no_answer')">No answer</button>`}
    <button class="b2 ib" aria-label="More for ${esc(c.name||'')}" onclick="eMore(${c.id})">${ic2('chev',16)}</button></div></div>`; }
async function openEList(id){ S.elid=id; S.erows=null; paintEnquiry(); try{ S.erows=(await api("elist",{id})).rows||[]; }catch(e){ return toast(e.message); } paintEnquiry(); }
async function eSet(id,outcome,note){ const c=(S.erows||[]).find(x=>x.id===id); if(!c) return; const prev={...c};
  c.outcome=outcome; if(outcome) c.attempts=(c.attempts||0)+1; if(typeof note==='string') c.note=note; eCounts(); paintEnquiry();
  try{ await api("econtact",{id,outcome,note}); toast(outcome?`${firstName(c.name)}: ${EOUT[outcome][0]}`:'Cleared',()=>{ Object.assign(c,prev); eCounts(); paintEnquiry(); api("econtact",{id,outcome:prev.outcome,note:prev.note??''}).catch(()=>{}); }); }
  catch(e){ Object.assign(c,prev); eCounts(); paintEnquiry(); toast("Couldn't save. "+e.message); } }
function eCounts(){ const L=(S.el||[]).find(x=>x.id===S.elid); if(!L) return; const r=S.erows||[];
  L.total=r.length; L.done=r.filter(c=>c.outcome&&c.outcome!=='no_answer').length; L.coming=r.filter(c=>c.outcome==='coming').length; L.maybe=r.filter(c=>c.outcome==='maybe').length; }
function ohText(c){ const L=(S.el||[]).find(x=>x.id===S.elid)||{}, a=L.address||L.title||'the property';
  return `Hi ${firstName(c.name)}, it's Marlowe from Dignam. Thanks for your enquiry on ${a}.${L.open_at?` We're open ${ohWhen(L.open_at)}, would you like to come through?`:''} Reply STOP to opt out.`; }
function eMore(id){ const c=(S.erows||[]).find(x=>x.id===id); if(!c) return;
  openSheet2(esc(c.name||'Enquiry'),`${c.crm_note?`<p class="hint2">${esc(c.crm_note)}</p>`:''}
   <div class="g2">${c.phone&&!c.dnc?row2('var(--acc)','msg','Text an invite',esc(ohText(c)).slice(0,90)+'…',chev2(),`openUrl(smsLink('${esc(c.phone)}',ohText((S.erows||[]).find(x=>x.id===${id}))))`):''}
    ${row2('#6366f1','users',c.lead_id?'Open buyer lead':'Make a buyer lead','Keeps them for matching homes later',chev2(),`eLead(${id})`)}</div>
   <div class="g2">${['not_coming','not_looking','bought','wrong_number'].map(k=>row2(EOUT[k][1],'x',EOUT[k][0],'',c.outcome===k?ic2('check',18,'var(--accT)'):'',`closeOv();eSet(${id},'${k}')`)).join('')}
    ${c.outcome?row2('#4b5565','back','Clear the result','Back to the top of the list','',`closeOv();eSet(${id},null)`):''}</div>
   <label class="fl2">Note<textarea id="en_note" rows="1" data-grow placeholder="Coming Saturday with partner" onchange="eSet(${id},(S.erows.find(x=>x.id===${id})||{}).outcome||null,this.value)">${esc(c.note||'')}</textarea></label>
   <div class="g2">${row2('var(--ns)','ban','<span style="color:var(--nsT)">Do not call</span>','Never call this number again','',`closeOv();eSet(${id},'do_not_call')`)}</div>`); }
async function eLead(id){ closeOv(); try{ const r=await api("econtact_lead",{id}); const c=(S.erows||[]).find(x=>x.id===id); if(c) c.lead_id=r.lead_id; await loadLeads(); openLead(r.lead_id); }catch(e){ toast(e.message); } }
function elSettings(id){ const L=(S.el||[]).find(x=>x.id===id); if(!L) return;
  openSheet2('Open home',`<label class="fl2">Open home day and time<input type="datetime-local" id="el_open" value="${L.open_at?sydInput(new Date(L.open_at)):''}"></label>
   <button class="b2 pri" onclick="elSave(${id})">Save time</button>
   <div class="g2">${row2('var(--cb)','plus','Add more enquiries','Import a newer export, repeats are merged',chev2(),`importSheet(${id})`)}
    ${row2('#4b5565','check',L.archived?'Move back to current':'Finished with this list',L.archived?'':'Moves it under Finished',chev2(),`elArchive(${id},${!L.archived})`)}</div>`); }
async function elSave(id){ const v=$('#el_open').value; try{ await api("elist_set",{id,open_at:v?sydToISO(v):null}); }catch(e){ return toast(e.message); } closeOv(); toast('Saved'); viewEnquiry(); }
async function elArchive(id,a){ try{ await api("elist_set",{id,archived:a}); }catch(e){ return toast(e.message); } closeOv(); viewEnquiry(); }

// Import: a CSV or Excel export from the CRM, or rows copied straight off the screen. Columns are found by their names.
function importSheet(listId){ const ts=(S.listings||[]).slice(); S.imp=null;
  openSheet2(listId?'Add more enquiries':'Import enquiries',`${listId?'':`<label class="fl2">Property<select id="im_listing"><option value="">Pick a Dignam listing</option>${ts.map(t=>`<option value="${t.id}">${esc(t.address)}${t.suburb?', '+esc(t.suburb):''}</option>`).join('')}<option value="other">Something else</option></select></label>
   <label class="fl2" id="im_titlew" hidden>Name for this list<input id="im_title" placeholder="12 Smith St, Bulli"></label>
   <label class="fl2">Open home day and time<input type="datetime-local" id="im_open"></label>`}
   <label class="fl2">Export from the CRM (CSV, Excel or PDF)<input type="file" id="im_file" accept=".csv,.xlsx,.xls,.pdf,text/csv,application/pdf" onchange="impFile(this.files[0])"></label>
   <label class="fl2">Or paste the rows<textarea id="im_paste" rows="3" placeholder="Copy the enquiry list in the CRM, including the headings, and paste it here" oninput="impParse(this.value)"></textarea></label>
   <p class="hint2" id="im_res" aria-live="polite"></p>
   <button class="b2 pri" id="im_go" onclick="impGo(${listId||'null'})" disabled>Import</button>`,listId?`elSettings(${listId})`:null);
  const s=$('#im_listing'); if(s) s.onchange=()=>{ $('#im_titlew').hidden=s.value!=='other'; }; }
async function impFile(f){ if(!f) return; $('#im_res').textContent='Reading…';
  try{ let rows;
    if(/\.pdf$/i.test(f.name)||f.type==='application/pdf') rows=await pdfRows(f);
    else if(/\.xlsx?$/i.test(f.name)){ const X=await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs'); const wb=X.read(await f.arrayBuffer(),{cellDates:true}); rows=X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:false,defval:''}); }
    else rows=parseCSV(await f.text());
    impRows(rows); }catch(e){ $('#im_res').textContent="Couldn't read that file. "+e.message; } }
// A PDF report from the CRM: the text is read page by page and laid back out as rows under the column headings.
// With no headings, each line that holds a phone number or email becomes one person.
async function pdfRows(f){
  const pdfjs=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';
  const doc=await pdfjs.getDocument({data:new Uint8Array(await f.arrayBuffer())}).promise, lines=[];
  for(let p=1;p<=doc.numPages;p++){ const tc=await (await doc.getPage(p)).getTextContent();
    const its=tc.items.filter(i=>i.str&&i.str.trim()).map(i=>({s:i.str.trim(),x:i.transform[4],y:i.transform[5],w:i.width||0})).sort((a,b)=>b.y-a.y||a.x-b.x);
    let cur=null; for(const it of its){ if(!cur||Math.abs(cur.y-it.y)>3){ cur={items:[]}; lines.push(cur); cur.y=it.y; } cur.items.push(it); } }
  lines.forEach(l=>l.items.sort((a,b)=>a.x-b.x));
  const isHead=l=>{ const t=l.items.map(i=>i.s.toLowerCase()).join(' '); return /name/.test(t)&&/mobile|phone|email/.test(t); };
  const hi=lines.findIndex(isHead);
  if(hi>=0){ const heads=[]; for(const it of lines[hi].items){ const h=heads[heads.length-1]; if(h&&it.x-(h.x+h.w)<8){ h.s+=' '+it.s; h.w=it.x+it.w-h.x; } else heads.push({...it}); }
    const rows=[heads.map(h=>h.s)];
    for(const l of lines.slice(hi+1)){ if(isHead(l)) continue;
      const r=heads.map(()=>[]); for(const it of l.items){ let k=0; heads.forEach((h,j)=>{ if(it.x>=h.x-6) k=j; }); r[k].push(it.s); }
      const cells=r.map(c=>c.join(' '));
      if(!cells[0]&&rows.length>1&&!/\d{6}/.test(cells.join(''))){ const prev=rows[rows.length-1]; cells.forEach((c,j)=>{ if(c) prev[j]=(prev[j]?prev[j]+' ':'')+c; }); continue; }  // a wrapped line belongs to the row above
      rows.push(cells); }
    return rows; }
  const out=[['Name','Mobile','Email']];
  for(const l of lines){ const t=l.items.map(i=>i.s).join(' '); const ph=(t.match(/(\+?61\s?|0)4[\d ]{8,11}\d/)||t.match(/\(?0[2-8]\)?[\d ]{8,10}\d/)||[''])[0], em=(t.match(/[\w.+-]+@[\w-]+\.[\w.]+/)||[''])[0];
    if(!ph&&!em) continue; out.push([t.replace(ph,'').replace(em,'').replace(/\s{2,}/g,' ').trim(),ph.trim(),em]); }
  return out; }
function impParse(t){ if(!t.trim()){ $('#im_res').textContent=''; $('#im_go').disabled=true; return; }
  const rows=t.includes('\t')?t.split(/\r?\n/).filter(l=>l.trim()).map(l=>l.split('\t')):parseCSV(t); impRows(rows); }
function impDate(v){ v=String(v||'').trim(); let m=v.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})/); if(m){ const y=+m[3]<100?2000+ +m[3]:+m[3]; return `${y}-${String(m[2]).padStart(2,'0')}-${String(m[1]).padStart(2,'0')}`; }
  m=v.match(/^(\d{4})-(\d{2})-(\d{2})/); if(m) return m[0]; const d=new Date(v); return isNaN(d)?'':d.toISOString().slice(0,10); }
function impRows(rows){
  const hi=rows.findIndex(r=>r.some(c=>/name|mobile|phone|email/i.test(String(c)))); if(hi<0){ $('#im_res').textContent='No heading row found. Include the column headings (Name, Mobile, Email).'; $('#im_go').disabled=true; return; }
  const h=rows[hi].map(c=>String(c).trim().toLowerCase()), col=(...res)=>{ for(const re of res){ const i=h.findIndex(x=>re.test(x)); if(i>=0) return i; } return -1; };
  const iFirst=col(/^first ?name$|^given/), iLast=col(/^last ?name$|^surname$|^family/), iName=col(/^(full ?)?name$|^contact( name)?$|^buyer$|^enquirer|^person/),
    iMob=col(/mobile|^cell/), iPh=col(/^phone$|phone ?number|^home ?phone|^work ?phone|^contact ?number|phone/), iEm=col(/e-?mail/),
    iDate=col(/enquir\w* ?date|^date|created|received|^when/), iNote=col(/message|comment|note|enquiry$|^enquiry ?text|^details/);
  const v=(r,i)=>i>=0?String(r[i]??'').trim():'';
  const out=rows.slice(hi+1).map(r=>{ const nm=[v(r,iFirst),v(r,iLast)].filter(Boolean).join(' ')||v(r,iName); const ph=[v(r,iMob),v(r,iPh)].find(x=>x.replace(/\D/g,'').length>=8)||'';
    return {name:nm,phone:ph,email:v(r,iEm),enquired_on:impDate(v(r,iDate)),note:v(r,iNote)}; }).filter(x=>x.name||x.phone||x.email);
  S.imp=out; const wp=out.filter(x=>x.phone).length;
  $('#im_res').innerHTML=out.length?`<b>${out.length} people found</b>, ${wp} with a phone number.${out[0]?` First one reads as ${esc(out[0].name||'no name')}${out[0].phone?', '+esc(out[0].phone):''}.`:''}${iMob<0&&iPh<0?' <span style="color:var(--bad)">No phone column found.</span>':''}`:'No people found under the headings.';
  $('#im_go').disabled=!out.length; }
async function impGo(listId){ if(!S.imp?.length) return; const s=$('#im_listing');
  if(!listId&&(!s||!s.value)) return toast('Pick the property');
  const other=s&&s.value==='other', title=other?$('#im_title').value.trim():'';
  if(other&&!title) return toast('Name this list');
  const op=$('#im_open')?.value, b=$('#im_go'); b.disabled=true; b.textContent='Importing…';
  try{ const r=await api("elist_import",{list_id:listId,listing_id:other||!s?null:+s.value,title:title||(s&&!other?s.options[s.selectedIndex].text:''),open_at:op?sydToISO(op):null,rows:S.imp});
    closeOv(); S.elid=r.list_id; toast(`${r.added} added${r.merged?`, ${r.merged} already there`:''}${r.skipped?`, ${r.skipped} with no phone or email left out`:''}`); viewEnquiry(); }
  catch(e){ b.disabled=false; b.textContent='Import'; toast(e.message); } }
// Demo: one made up open home list
window.demoApi=(function(orig){ return function(action,body){ const D=window.__demo||{};
  if(!D.el&&/^e(list|contact)/.test(action)){ const t=(D.listings||[])[0]||{id:1,address:'14 Hill View Cl',suburb:'Tarrawanna'};
    D.el=[{id:1,listing_id:t.id,title:t.address,address:t.address,suburb:t.suburb,open_at:new Date(Date.now()+2*864e5).toISOString().slice(0,11)+'00:00:00Z',archived:false}];
    D.ec=['Priya Shah','Tom Walsh','Kate Nguyen','Ben Carter','Lucy Moore','Sam Patel'].map((n,i)=>({id:i+1,list_id:1,name:n,phone:'04'+(12345670+i*1111),email:null,enquired_on:`2026-11-${10+i}`,crm_note:i%2?'Asked about strata levies':'Wants the contract',outcome:null,attempts:0,note:null,lead_id:null,dnc:false})); }
  const sum=l=>{ const r=D.ec.filter(c=>c.list_id===l.id); return {...l,total:r.length,done:r.filter(c=>c.outcome&&c.outcome!=='no_answer').length,coming:r.filter(c=>c.outcome==='coming').length,maybe:r.filter(c=>c.outcome==='maybe').length}; };
  if(action==='elists') return {rows:D.el.map(sum)};
  if(action==='elist') return {rows:D.ec.filter(c=>c.list_id===body.id).map(c=>({...c}))};
  if(action==='econtact'){ const c=D.ec.find(x=>x.id===body.id); if(c){ c.outcome=body.outcome; if(typeof body.note==='string') c.note=body.note; } return {ok:true}; }
  if(action==='elist_set'){ const l=D.el.find(x=>x.id===body.id); if(l) Object.assign(l,'open_at' in body?{open_at:body.open_at}:{},'archived' in body?{archived:body.archived}:{}); return {ok:true}; }
  if(action==='elist_import'){ let id=body.list_id; if(!id){ id=D.el.length+1; D.el.push({id,listing_id:body.listing_id,title:body.title,address:body.title,suburb:'',open_at:body.open_at,archived:false}); }
    body.rows.forEach((r,i)=>D.ec.push({id:D.ec.length+1,list_id:id,...r,crm_note:r.note,outcome:null,attempts:0,lead_id:null,dnc:false})); return {list_id:id,added:body.rows.length,merged:0,skipped:0}; }
  if(action==='econtact_lead'){ const c=D.ec.find(x=>x.id===body.id); const r=orig('save_lead',{lead:{name:c.name,phone:c.phone,lead_type:'Buyer'}}); c.lead_id=r.id; return {lead_id:r.id}; }
  return orig(action,body); }; })(window.demoApi);

// ---------- Street View: a photo of the front of the house, from Google, through our server so the key stays private ----------
const SV_URL=API.replace(/\/api$/,'/streetview'); S.sv=S.sv||{};
async function svGet(pid,size){ const k=pid+':'+size; if(S.sv[k]) return S.sv[k]; if(S.svOff||DEMO) return null;
  S.sv[k]=(async()=>{ try{ const r=await fetch(`${SV_URL}?pid=${pid}&size=${size}&v=2`,{headers:{'x-session':S.token||''}});
      if(r.status===503||r.status===429||r.status===401){ S.svOff=true; return null; } if(!r.ok) return null;
      return {url:URL.createObjectURL(await r.blob()),date:r.headers.get('X-Pano-Date')||''}; }catch{ S.sv[k]=null; return null; } })();
  return S.sv[k]; }
function svFill(el,pid,size){ if(!el||el.dataset.sv) return; el.dataset.sv='1';
  svGet(pid,size).then(p=>{ if(!p||!el.isConnected) return; const aer=el.querySelector('img'), au=aer?aer.src:null;
    let im=aer; if(!im){ el.querySelectorAll(':scope>span:not(.credit)').forEach(s=>s.remove()); im=document.createElement('img'); im.alt=''; el.prepend(im); } im.src=p.url; el.classList.add('svon'); el.querySelector('.pinm')?.remove();
    if(size==='big'){ el.querySelector('.credit')?.remove(); el.insertAdjacentHTML('beforeend',`<span class="credit" data-s="Google${p.date?' · '+esc(p.date):''}">Google${p.date?' · '+esc(p.date.replace(/^(\d{4})-(\d{2})$/,(m,y,mo)=>MONS[+mo-1]+' '+y)):''}</span>${au?`<button class="svt" onclick="event.stopPropagation();svToggle(this)" data-a="${esc(au)}" data-s="${esc(p.url)}">Aerial</button>`:''}`); } }); }
function svToggle(b){ const el=b.closest('.photo2'), im=el.querySelector('img'), cr=el.querySelector('.credit'), toA=b.textContent==='Aerial'; im.src=toA?b.dataset.a:b.dataset.s; b.textContent=toA?'Street':'Aerial'; el.classList.toggle('svon',!toA);
  if(cr){ if(!cr.dataset.g) cr.dataset.g=cr.textContent; cr.textContent=toA?'Imagery © NSW Spatial Services':cr.dataset.g; } }
// Call screen: fills the house photos with Street View when there is no aerial
window.drawCall2=(function(orig){ return function(){ orig(); const r=curCall(); if(!r) return;
  const big=document.querySelector('#main .prop2 .photo2'), small=document.querySelector('#main .pidr2 .photo2');
  if(big&&big.offsetParent) svFill(big,r.property_id,'big'); if(small&&small.offsetParent) svFill(small,r.property_id,'small');
  const nx=queue().find(x=>x.property_id!==r.property_id&&!x.today_outcome&&!S.skipped.has(x.property_id)); if(nx) svGet(nx.property_id,big&&big.offsetParent?'big':'small'); }; })(window.drawCall2);

// Small street photos on list and pipeline rows, loaded only as they scroll into view
// Rows keep the free aerial; a paid street photo loads only for the person you open

// Note boxes grow with what you type (up to half the screen, then they scroll), so a long note never runs off the edge
function growTA(t){ if(!t||!t.matches('textarea[data-grow]')) return; t.style.height='auto'; t.style.height=Math.min(t.scrollHeight+2,innerHeight*0.5)+'px'; t.style.overflowY=t.scrollHeight+2>innerHeight*0.5?'auto':'hidden'; }
document.addEventListener('input',e=>window.growTA(e.target,e),true);
new MutationObserver(ms=>{ for(const m of ms) m.addedNodes.forEach(n=>{ if(n.nodeType!==1) return; (n.matches?.('textarea[data-grow]')?[n]:[...n.querySelectorAll('textarea[data-grow]')]).forEach(t=>requestAnimationFrame(()=>window.growTA(t))); }); }).observe(document.body,{childList:true,subtree:true});

// Two people, two numbers (23 Nov): a capital letter for each person sits inside their number's button, so C 0412 345 678 is Charlie's
function names7(a,b){ const split=n=>String(n||'').replace(/^Solicitor:.*$/,'').split(/\s*(?:&|\band\b|\/|;|,)\s*/i).map(x=>x.replace(/^(mr|mrs|ms|miss|dr)\.?\s+/i,'').trim()).filter(x=>/[a-z]/i.test(x));
  const xs=split(a); if(b) xs.splice(1,0,...split(b)); return xs; }
function inis7(list,n){ const fs=list.slice(0,n).map(x=>x.split(/\s+/)[0]); let r=fs.map(f=>(f[0]||'').toUpperCase());
  if(n>1&&r[0]&&r[0]===r[1]) r=fs.map(f=>f.slice(0,2).replace(/^./,c=>c.toUpperCase())); if(n>1&&r[0]&&r[0]===r[1]) r=fs; return r; }
const ini7=t=>t?`<b class="ini7">${esc(t)}</b>`:'';
// ---------- two owners: both names and both numbers on the call screen ----------
window.numBtn=(function(orig){ return function(r,cls){ const a=orig(r,cls); if(!r.phone2||(r.signals||[]).includes('probate')) return a;
  const [i1,i2]=inis7(names7(people(r.owner_name)[0]||'',r.owner2_name),2);
  const one=i1?a.replace(/(<span style="[^"]*">)/,`$1${ini7(i1)}`):a;
  return `<div class="nums2">${one}<a class="${cls} ph2nd" href="tel:${esc(telOf(r.phone2))}" onclick="if(!hoursOk(event))return false;markDial(${r.property_id})">${ic2('phone',cls==='num2'?24:20,'#fff')}<span${cls==='num2'?' style="flex:1"':''}>${ini7(i2)}${esc(fmtPh2(r.phone2))}</span></a></div>`; }; })(window.numBtn);
// Call screen: shows the second owner's name when it differs
window.drawCall2=(function(orig){ return function(){ orig(); const r=curCall(); if(!r||!r.owner2_name) return;
  const known=people(r.owner_name).map(s=>s.toLowerCase()); if(known.includes(r.owner2_name.toLowerCase())) return;
  document.querySelectorAll('#main .nm2, #main .pidr2 h1').forEach(h=>{ if(h.dataset.two) return; h.dataset.two='1'; h.insertAdjacentHTML('beforeend',`<span class="and2"> &amp; ${esc(firstName(r.owner2_name))}</span>`); });
  const al=document.querySelector('#main .also2'), t=`Second owner: ${esc(r.owner2_name)}`; if(al) al.insertAdjacentHTML('beforeend',' · '+t); else document.querySelector('#main .nm2')?.insertAdjacentHTML('afterend',`<div class="also2">${t}</div>`); }; })(window.drawCall2);

// Phone boxes tidy themselves into groups when you leave them (0412 345 678, 02 4283 5242)
document.addEventListener('blur',e=>{ const t=e.target; if(!(t instanceof HTMLInputElement)||!(t.type==='tel'||t.inputMode==='tel'||/phone/i.test(t.id))) return;
  const d=t.value.replace(/\D/g,''); if(/^0\d{9}$/.test(d)) t.value=fmtPh2(d); },true);
// Marking Listed asks first
window.record=(function(orig){ return async function(id,o,cb){ if(o==='listed'&&!(await uiAsk('Mark as Listed with Dignam?',{ok:'Yes, listed'}))) return; return orig(id,o,cb); }; })(window.record);
// Tap the name on the call screen to fix names and numbers straight away
window.drawCall2=(function(orig){ return function(){ orig(); const r=curCall(); if(!r) return;
  document.querySelectorAll('#main .nm2, #main .pidr2 h1').forEach(h=>{ h.classList.add('edn2'); h.title='Tap to edit names and numbers'; h.onclick=()=>{ S.ecFrom=null; S.ecFromSearch=false; editContact2(r.property_id); }; }); }; })(window.drawCall2);

// ---------- Reminders: a popup when follow ups and call backs fall due, so nothing slips ----------
// Checks on opening and every 5 minutes. Each item pops up once a day; Later hides it for an hour.
// With permission, the computer or phone also shows its own notification while the app is open.
const RKEY='remind_seen_v1';
function rSeen(){ try{ const o=JSON.parse(localStorage.getItem(RKEY)||'{}'); return o.d===todayKey()?o:{d:todayKey(),k:{}}; }catch{ return {d:todayKey(),k:{}}; } }
function rSave(o){ try{ localStorage.setItem(RKEY,JSON.stringify(o)); }catch{} }
function dueItems(){ const now=Date.now(), t=todayKey(), out=[];
  (S.leads||[]).forEach(l=>{ if(l.follow_up&&l.follow_up<=t&&!/closed|do not contact|listing won/i.test(l.status||'')) out.push({k:'l'+l.id+':'+l.follow_up,title:leadTitle(l),sub:l.follow_up<t?`Follow up was due ${dayMon(l.follow_up)}`:'Follow up due today',act:`openLead(${l.id})`,over:l.follow_up<t}); });
  (S.callbacks||[]).forEach(c=>{ if(c.callback_at&&new Date(c.callback_at).getTime()<=now+5*60e3) out.push({k:'c'+c.property_id+':'+c.callback_at,title:people(c.owner_name)[0]||c.street_address||'Call back',sub:`Call back ${new Date(c.callback_at).toLocaleTimeString('en-AU',{timeZone:'Australia/Sydney',hour:'numeric',minute:'2-digit'})}${c.notes?' · '+c.notes:''}`,act:`go('calls')`,over:false}); });
  return out; }
async function checkReminders(){ if(DEMO&&!window.__remindTest) return; if(!S.token&&!DEMO) return;
  try{ if(!S.leads||Date.now()-(S.leadsAt||0)>10*60e3) await loadLeads(); }catch{}
  const seen=rSeen(), now=Date.now(), items=dueItems().filter(i=>!(seen.k[i.k]>now)); if(!items.length) return;
  items.forEach(i=>seen.k[i.k]=now+20*3600e3); rSave(seen); S.remind=items; paintReminders();
  try{ if('Notification' in window&&Notification.permission==='granted'&&document.hidden){ const n=new Notification(items.length===1?items[0].title:`${items.length} follow ups due`,{body:items.slice(0,3).map(i=>i.title+': '+i.sub).join('\n'),tag:'prospect-remind'}); n.onclick=()=>{ window.focus(); n.close(); }; } }catch{} }
function paintReminders(){ document.getElementById('rem2')?.remove(); const it=S.remind||[]; if(!it.length) return;
  const askN='Notification' in window&&Notification.permission==='default';
  document.body.insertAdjacentHTML('beforeend',`<div id="rem2" role="alertdialog" aria-label="Follow ups due"><div class="rh"><b>${it.length===1?'Follow up due':it.length+' follow ups due'}</b><button class="x" aria-label="Close" onclick="remClose()">${ic2('x',18)}</button></div>
   <div class="rl">${it.slice(0,6).map((i,ix)=>`<button class="ri${i.over?' over':''}" onclick="remOpen(${ix})"><b>${esc(i.title)}</b><span>${esc(i.sub)}</span></button>`).join('')}${it.length>6?`<div class="rmore">and ${it.length-6} more on the Leads page</div>`:''}</div>
   <div class="rf"><button class="b2" onclick="remLater()">Remind me in an hour</button>${askN?`<button class="b2" onclick="remAsk()">Also notify me</button>`:''}</div></div>`); }
function remOpen(ix){ const i=(S.remind||[])[ix]; if(!i) return; S.remind.splice(ix,1); paintReminders(); new Function(i.act)(); }
function remClose(){ S.remind=[]; paintReminders(); }
function remLater(){ const seen=rSeen(), t=Date.now()+3600e3; (S.remind||[]).forEach(i=>seen.k[i.k]=t); rSave(seen); remClose(); toast('I’ll remind you in an hour'); }
async function remAsk(){ try{ await Notification.requestPermission(); }catch{} paintReminders(); }
setTimeout(checkReminders,4000); setInterval(checkReminders,5*60e3);
document.addEventListener('visibilitychange',()=>{ if(!document.hidden) checkReminders(); });

