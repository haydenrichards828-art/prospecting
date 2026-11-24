// ================= Audit fixes, 20 Nov =================
function toast2(msg,label,fn){ const t=$("#toast"); t.innerHTML=esc(msg)+(fn?` <button id="undo">${esc(label)}</button>`:''); t.classList.add('show');
  if(fn) $("#undo").onclick=()=>{ t.classList.remove('show'); fn(); }; clearTimeout(window.toastT); window.toastT=setTimeout(()=>t.classList.remove('show'),5000); }
const isBuyer2=l=>/buyer/i.test(l.lead_type||'');
const dueLeads2=()=>{ const t=todayKey(); return (S.leads||[]).filter(l=>l.follow_up&&l.follow_up<=t&&!/closed|do not contact|listing won|listing lost/i.test(l.status||'')).sort((a,b)=>a.follow_up.localeCompare(b.follow_up)); };

// Lead panel: Save closes it (or moves to the next follow up), a lead from a call starts as a seller with the call note in it
window.openLead=(function(orig){ return function(id,opts){ opts=opts||{};
  if(!id) return quickAdd2();
  if(opts.saved && S.fq){ const nx=S.fq.ids[S.fq.i+1]; if(nx!=null){ S.fq.i++; return openLead(nx,{fq:true}); } S.fq=null; closeOv(); if(S.tab==='leads') drawLeads(); return toast('All follow ups done'); }
  if(opts.saved){ closeOv(); if(S.tab==='leads') drawLeads(); return toast2('Saved','Open',()=>openLead(id)); }
  orig(id,opts); const sh=document.getElementById('sheet'); if(!sh) return;
  const l=(S.leads||[]).find(x=>x.id===id); if(!l) return;
  if(opts.fresh && !isBuyer2(l)){
    const we=document.getElementById('weditor'); if(we) we.hidden=true; const wv=document.getElementById('wview_box'); if(wv) wv.hidden=true;
    const bn=sh.querySelector('.banner.info div'); if(bn) bn.textContent=(l.notes||[]).length?'Added to Leads with your call note. Pick when to follow up, then Save.':'Added to Leads. Pick when to follow up, then Save.';
    const b=[...sh.querySelectorAll('#ln_fu button')].find(x=>x.textContent.trim()==='1 week'); if(b){ b.click(); }
  }
  if(S.fq && opts.fq){
    const n=S.fq.ids.length, i=S.fq.i;
    sh.querySelector('.lhead h3')?.insertAdjacentHTML('beforebegin',`<div class="fqh2">Follow up ${i+1} of ${n}</div>`);
    const sv=document.getElementById('lead_save'); if(sv){ sv.textContent=i+1<n?'Save and next':'Save and finish'; sv.insertAdjacentHTML('afterend',`<button class="b2 fqs2" onclick="fqSkip()">Skip</button>`); sv.parentElement.classList.add('fqrow2'); }
    sh.querySelector('.lact')?.setAttribute('onclick','S.fq=null;closeOv();if(S.tab===\'leads\')drawLeads()');
  }
}; })(window.openLead);
// Saving a lead from follow ups needs a next follow up date
window.saveLeadAll=(function(orig){ return async function(id){
  if(id && S.fq && !S.ol.follow_up){ const f=document.getElementById('ln_fu'); f?.classList.add('need2'); setTimeout(()=>f?.classList.remove('need2'),1600); return toast('Pick when to follow up next'); }
  return orig(id); }; })(window.saveLeadAll);
function fqStart(){ const ids=dueLeads2().map(l=>l.id); if(!ids.length) return toast('No follow ups due'); S.fq={ids,i:0}; openLead(ids[0],{fq:true}); }
function fqSkip(){ if(!S.fq) return; const nx=S.fq.ids[S.fq.i+1]; if(nx==null){ S.fq=null; closeOv(); if(S.tab==='leads') drawLeads(); return toast('That was the last one'); } S.fq.i++; openLead(nx,{fq:true}); }
// Leads page: the Call N follow ups button
window.drawLeads=(function(orig){ return function(){ orig(); if(S.lview==='listings') return; const n=dueLeads2().length; if(!n) return;
  const ph=document.querySelector('#main .ph2'); if(!ph) return; ph.querySelector('.flag2')?.remove();
  ph.querySelector('h1')?.insertAdjacentHTML('afterend',`<button class="fqb2" data-n="${n}" onclick="fqStart()" title="Call ${n} follow up${n===1?'':'s'}, one after another" aria-label="Call ${n} follow up${n===1?'':'s'}">${ic2('phone',15)}<span>${n}</span></button>`); }; })(window.drawLeads);

// Send info goes back to the lead it came from
window.swSend=(function(orig){ return async function(ch){ const w=S.sw; await orig(ch); if(ch!=='copy'&&w&&w.lead_id&&S.swBack){ S.swBack=false; setTimeout(()=>openLead(w.lead_id),120); } }; })(window.swSend);
// Lead menu: remembers to come back to the lead after sending info
window.lmenuGo=(function(orig){ return function(k){ if(k==='send') S.swBack=true; return orig(k); }; })(window.lmenuGo);

// Appraisal: ask when first, save the time, then offer the confirmation text filled in
window.act2=(function(orig){ return function(id,o){ if(o==='appraisal'){ document.activeElement?.blur?.(); document.body.classList.remove('typing'); return apptSheet2(id); } return orig(id,o); }; })(window.act2);
// Appraisal outcome: asks for the appraisal time first
window.outcome=(function(orig){ return function(id,o){ if(o==='appraisal'&&!(S.appt&&S.appt[id]!==undefined)) return apptSheet2(id); return orig(id,o); }; })(window.outcome);
function apptPicks2(){ const a=nextCallDay(1), lab=(d,h)=>`${d.k===1?'Tomorrow':d.wd} ${h>12?h-12+'pm':h+'am'}`; let sat=null; for(let k=1;k<9;k++){ const i=sydInfo(new Date(Date.now()+k*864e5)); if(i.dow===6){ sat={k,...i}; break; } }
  const out=[[a.k,10,lab(a,10)],[a.k,16,lab(a,16)]]; if(sat&&sat.k!==a.k) out.push([sat.k,10,`Saturday ${sat.k<=7?'':'week '}10am`]); return out; }
function apptISO2(days,hour){ const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Sydney',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(Date.now()+days*864e5)).map(x=>[x.type,x.value])); return sydToISO(`${p.year}-${p.month}-${p.day}T${String(hour).padStart(2,'0')}:00`); }
function apptSheet2(id){ const r=queue().find(x=>x.property_id===id)||(S.rows||[]).find(x=>x.property_id===id)||{}; const nm=people(r.owner_name)[0]||'them';
  const sub=(d,h)=>new Date(apptISO2(d,h)).toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',weekday:'long',day:'numeric',month:'long'})+', '+hl2(h);
  const picks=apptPicks2();
  openSheet2(`Appraisal with ${esc(nm)}: when?`,`<div class="g2">${picks.map(([d,h,l],i)=>row2('var(--ap)','appr',esc(l),sub(d,h),`<span class="kb2 hide-phone">${i+1}</span>`,`apptGo2(${id},'${apptISO2(d,h)}')`)).join('')}</div>
   <div class="g2">${row2('#4b5565','cal','Pick a day and time','',chev2(),`apptPick2(${id})`)}</div>
   <div class="g2">${row2('#4b5565','skip','Time not set yet','Book it, add the time later',chev2(),`apptGo2(${id},'')`)}</div>`);
  S.sheetKeys=Object.fromEntries(picks.map(([d,h],i)=>[String(i+1),()=>apptGo2(id,apptISO2(d,h))])); }
function apptPick2(id){ openSheet2('Pick a day and time',`<input type="datetime-local" id="apt2" value="${sydInput(new Date(Date.now()+864e5)).slice(0,11)}10:00" step="900" style="height:52px;border-radius:8px;padding:0 14px">
   <button class="b2 pri" onclick="const v=$('#apt2').value;if(!v)return toast('Pick a date and time');apptGo2(${id},sydToISO(v))">Book appraisal</button>`,`apptSheet2(${id})`); }
async function apptGo2(id,iso){ closeOv(); S.appt=S.appt||{}; S.appt[id]=iso||null; await outcome(id,'appraisal'); setTimeout(()=>{ if(S.appt) delete S.appt[id]; },3000); }
const apptTxt2=iso=>iso?new Date(iso).toLocaleString('en-AU',{timeZone:'Australia/Sydney',weekday:'short',day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}).replace(':00','').replace(/\s?([ap]m)/i,'$1'):'';
// Appraisals list: sorted by the appraisal time, with the time shown and a way to set or change it
window.viewPipeline=(function(orig){ return async function(local){ const r=await orig(local); try{
  if((S.pst||'appraisal')==='appraisal'){ const h=document.querySelector('#main .lg4.h span:nth-child(3)'); if(h) h.textContent='Appraisal';
    document.querySelectorAll('#main .lg4[onclick^="pipeSheet("]').forEach(el=>{ const id=+el.getAttribute('onclick').match(/\d+/)[0], x=(S.pipe||[]).find(p=>p.property_id===id), c=el.querySelector('.bt3:not(.pb4)'); if(!x||!c) return;
      const soon=x.appt_at&&new Date(x.appt_at)>Date.now()&&new Date(x.appt_at)-Date.now()<36*3600e3, bk=c.querySelector('b')?.textContent||'', src=c.querySelector('span')?.textContent||'';
      c.innerHTML=`<b class="apt4${x.appt_at?'':' none'}${soon?' soon':''}" onclick="event.stopPropagation();apptEdit2(${id})">${x.appt_at?esc(apptTxt2(x.appt_at)):'Set a time'}</b><span>Booked ${esc(bk)}${src?' · '+esc(src.replace(/^From /,'from ')):''}</span>`; }); }
  { const seg=document.querySelector('#main .pph2 .seg2.mini'); if(seg){ if(desk2()) seg.remove(); else seg.querySelectorAll('button').forEach(b=>{ const k=(b.getAttribute('onclick')||'').match(/S.pst='(\w+)'/); if(k&&!['appraisal','listed','sold'].includes(k[1])) b.remove(); }); }
    const pst=S.pst||'appraisal', n=k=>(S.pipe||[]).filter(x=>ptab(x.stage)===k).length, ex=['sold','withdrawn','lost'].filter(k=>n(k));
    if(pst!=='appraisal'&&(ex.length||pst!=='listed')){ document.querySelector('#main .pp2')?.insertAdjacentHTML('beforeend',`<div class="pex2">${pst!=='listed'?`<button onclick="S.pst='listed';viewPipeline(true)">Back to listings</button>`:''}${ex.filter(k=>k!==pst).map(k=>`<button onclick="S.pst='${k}';viewPipeline(true)">${n(k)} ${PST[k][0].toLowerCase()}</button>`).join('')}</div>`); } }
  document.querySelectorAll('.tabbtn').forEach(t=>t.textContent=tabName());
  }catch(e){} return r; }; })(window.viewPipeline);
function apptEdit2(id){ const x=(S.pipe||[]).find(p=>p.property_id===id)||{}; openSheet2('Appraisal time',`<input type="datetime-local" id="apt3" value="${x.appt_at?sydInput(new Date(x.appt_at)):sydInput(new Date(Date.now()+864e5)).slice(0,11)+'10:00'}" step="900" style="height:52px;border-radius:8px;padding:0 14px">
   <button class="b2 pri" onclick="apptSave2(${id})">Save time</button>`); }
async function apptSave2(id){ const v=$('#apt3').value; if(!v) return toast('Pick a date and time'); const iso=sydToISO(v), x=(S.pipe||[]).find(p=>p.property_id===id), prev=x&&x.appt_at; if(x) x.appt_at=iso; closeOv(); viewPipeline(true);
  try{ await api('set_appt',{property_id:id,appt_at:iso}); toast('Appraisal time saved'); }catch(e){ if(x) x.appt_at=prev; viewPipeline(true); toast("Couldn't save that. "+e.message); } }
// Reminder the day before and on the day
window.dueItems=(function(orig){ return function(){ const out=orig(), now=Date.now();
  (S.pipe||[]).forEach(x=>{ if(x.stage!=='appraisal'||!x.appt_at) return; const t=new Date(x.appt_at).getTime(); if(t<now-3600e3||t-now>30*3600e3) return;
    out.push({k:'a'+x.property_id+':'+x.appt_at,title:`Appraisal ${apptTxt2(x.appt_at)}`,sub:[people(x.owner_name)[0],[x.street_address,x.suburb].filter(Boolean).join(', ')].filter(Boolean).join(' · '),act:`S.pst='appraisal';go('pipeline')`,over:false}); });
  return out; }; })(window.dueItems);
// Reminders: refreshes the pipeline every 30 minutes so appraisal reminders are current
window.checkReminders=(function(orig){ return async function(){ try{ if(!S.pipe||Date.now()-(S.pipeAt||0)>30*60e3){ const r=await api('pipeline'); S.pipe=r.rows||[]; S.pipeAt=Date.now(); } }catch{} return orig(); }; })(window.checkReminders);

// Quick add lead: who, where (picked from the property register), seller or buyer, when to follow up
const QFU2=[['Tomorrow',1],['3 days',3],['1 week',7],['1 month',30]], QT2=[['Seller','Potential Vendor'],['Buyer','Buyer'],['Both','Buyer/Vendor']], QSRC2=['Referral','Card Drop','Open Home','Database','Other'];
function quickAdd2(){ S.qa={type:'Potential Vendor',fu:3,pid:null,src:null,types:[],beds:null,subs:[]};
  openSheet2('New lead',`<div class="qa2">
   <div class="qr2"><input id="qa_name" placeholder="Name" autocomplete="off"><input id="qa_phone" inputmode="tel" placeholder="Phone" autocomplete="off" onblur="qaDupe()"></div>
   <div id="qa_dupe"></div>
   <div class="qwrap2"><input id="qa_addr" placeholder="Address, start typing to find it" autocomplete="off" oninput="qaFind(this.value)"><div id="qa_hits" class="qhits2"></div></div>
   <div id="qa_link"></div>
   <div class="ql2">They are</div><div class="qc2" id="qa_type">${QT2.map(([l,v])=>`<button class="${v===S.qa.type?'on':''}" onclick="pickOne(this);S.qa.type='${v}';qaBuy()">${l}</button>`).join('')}</div>
   <div id="qa_buy" hidden></div>
   <div class="ql2">Follow up</div><div class="qc2">${QFU2.map(([l,d])=>`<button class="${d===S.qa.fu?'on':''}" onclick="pickOne(this);S.qa.fu=${d}">${l}</button>`).join('')}</div>
   <div class="ql2">Where from <span>optional</span></div><div class="qc2">${QSRC2.map(x=>`<button onclick="const on=this.classList.contains('on');pickOne(this);if(on)this.classList.remove('on');S.qa.src=on?null:'${x}'">${x==='Open Home'?'Open home':x==='Card Drop'?'Card drop':x}</button>`).join('')}</div>
   <textarea id="qa_note" rows="2" data-grow placeholder="Note, optional"></textarea>
   <button class="b2 pri" id="qa_go" onclick="qaSave()">Add lead</button></div>`);
  setTimeout(()=>$('#qa_name')?.focus(),60); }
function qaBuy(){ const b=$('#qa_buy'); if(!b) return; const on=/buyer/i.test(S.qa.type); b.hidden=!on; if(!on||b.innerHTML) return;
  b.innerHTML=`<div class="ql2">Looking to buy</div><input id="qa_max" inputmode="decimal" placeholder="Budget up to, e.g. 900k">
   <div class="qc2">${[1,2,3,4].map(n=>`<button onclick="const on=this.classList.contains('on');pickOne(this);if(on)this.classList.remove('on');S.qa.beds=on?null:${n}">${n}+ bed</button>`).join('')}</div>
   <div class="qc2">${LO.types.map(t=>`<button onclick="this.classList.toggle('on');S.qa.types=[...document.querySelectorAll('#qa_bt button.on')].map(x=>x.textContent)">${t}</button>`).join('')}</div>
   <div class="qwrap2"><input id="qa_sub" placeholder="Suburbs they want" autocomplete="off" oninput="qaSub(this.value)"><div id="qa_subhits" class="qhits2"></div></div><div class="qc2" id="qa_subs"></div>`;
  b.querySelectorAll('.qc2')[1].id='qa_bt'; }
function qaSub(v){ const q=v.trim().toLowerCase(), box=$('#qa_subhits'); if(!q){ box.innerHTML=''; return; }
  box.innerHTML=SUBURBS.filter(x=>x.toLowerCase().includes(q)&&!S.qa.subs.includes(x)).slice(0,5).map(x=>`<button onclick="S.qa.subs.push('${esc(x)}');$('#qa_sub').value='';$('#qa_subhits').innerHTML='';qaSubs()">${esc(x)}</button>`).join(''); }
function qaSubs(){ $('#qa_subs').innerHTML=S.qa.subs.map((x,i)=>`<button class="on" onclick="S.qa.subs.splice(${i},1);qaSubs()">${esc(x)} ×</button>`).join(''); }
let qaT=null;
function qaFind(v){ clearTimeout(qaT); S.qa.pid=null; $('#qa_link').innerHTML=''; const q=v.trim(); if(q.length<4){ $('#qa_hits').innerHTML=''; return; }
  qaT=setTimeout(async()=>{ let r; try{ r=await api('search',{q}); }catch{ return; } if($('#qa_addr')?.value.trim()!==q) return;
    const props=(r.props||[]).slice(0,6), leads=(r.leads||[]).slice(0,2);
    $('#qa_hits').innerHTML=leads.map(l=>`<button class="dup" onclick="closeOv();openLead(${l.id})">${ic2('lead',15)}<span><b>Already a lead: ${esc(leadTitle(l))}</b><em>${esc([l.address,l.suburb].filter(Boolean).join(', '))}. Open them</em></span></button>`).join('')
      +props.map((p,i)=>`<button onclick="qaPick(${i})">${ic2('house',15)}<span><b>${esc(String(p.street_address||'').trim())}, ${esc(p.suburb||'')}</b><em>${esc(p.owner_name||'Owner not known')}${p.is_lead?' · already a lead':''}</em></span></button>`).join('');
    S.qa.hits=props; },250); }
function qaPick(i){ const p=S.qa.hits[i]; if(!p) return; S.qa.pid=p.id; $('#qa_addr').value=String(p.street_address||'').trim(); S.qa.suburb=p.suburb||''; $('#qa_hits').innerHTML='';
  if(!$('#qa_name').value.trim()&&p.owner_name) $('#qa_name').value=people(p.owner_name)[0]||p.owner_name;
  if(!$('#qa_phone').value.trim()&&p.phone) $('#qa_phone').value=fmtPh2(p.phone);
  $('#qa_link').innerHTML=`<div class="qlink2">${ic2('check',15)} Linked to ${esc($('#qa_addr').value)}, ${esc(S.qa.suburb)}${p.is_lead?'. They are already a lead, this will update them':''}</div>`; }
async function qaDupe(){ const v=($('#qa_phone')?.value||'').replace(/\D/g,''); const box=$('#qa_dupe'); if(!box) return; if(v.length<8){ if(!box.querySelector('.err')) box.innerHTML=''; return; }
  let r; try{ r=await api('search',{q:v}); }catch{ return; } const l=(r.leads||[])[0], pr=(r.props||[])[0];
  if(l){ box.innerHTML=`<button class="qdup2" onclick="closeOv();openLead(${l.id})">${ic2('warn',15)} ${esc(leadTitle(l))} already has this number. Open them instead</button>`; return; }
  if(pr&&!S.qa.pid){ S.qa.hits=[pr]; box.innerHTML=`<button class="qdup2 info" onclick="qaPick(0);this.remove()">${ic2('house',15)} This number is the owner of ${esc(String(pr.street_address||'').trim())}, ${esc(pr.suburb||'')}. Link the house</button>`; return; }
  box.innerHTML=''; }
function qaMoney(v){ const m=String(v||'').toLowerCase().replace(/[$,\s]/g,'').match(/^([\d.]+)(k|m)?$/); if(!m) return null; return Math.round(+m[1]*(m[2]==='m'?1e6:m[2]==='k'?1e3:(+m[1]<10?1e6:1))); }
async function qaSave(){ const q=S.qa, name=$('#qa_name').value.trim(), phone=$('#qa_phone').value.trim(), addr=$('#qa_addr').value.trim(), note=$('#qa_note').value.trim();
  if(!name&&!phone&&!addr) return toast('Add a name, phone or address');
  const pe=phone&&phoneProblem(phone); if(pe){ $('#qa_dupe').innerHTML=`<div class="qdup2 err">${esc(pe)}${/\d/.test(phone)?'':` <button class="lnk2" onclick="const n=$('#qa_name'),p=$('#qa_phone');n.value=(n.value.trim()+' '+p.value.trim()).trim();p.value='';$('#qa_dupe').innerHTML='';n.focus()">Move it to the name</button>`}</div>`; $('#qa_phone').focus(); return; }
  const lead={name:name||null,phone:phone?phone.replace(/[^\d+]/g,''):null,address:addr||null,suburb:q.suburb||null,lead_type:q.type,source:q.src,temperature:'Warm',follow_up:addDaysKey(q.fu)};
  if(/buyer/i.test(q.type)){ const buy={}; const mx=qaMoney($('#qa_max')?.value); if(mx) buy.max=mx; if(q.beds) buy.beds=q.beds; if(q.types.length) buy.types=q.types; if(q.subs.length) buy.suburbs=q.subs; if(Object.keys(buy).length) lead.buy=buy; }
  const b=$('#qa_go'); b.disabled=true; b.textContent='Adding…';
  try{ const r=await api('save_lead',{lead,property_id:q.pid||undefined}); if(note) await api('lead_note',{id:r.id,body:note,follow_up:lead.follow_up});
    await loadLeads(); closeOv(); if(S.tab==='leads') drawLeads(); toast2(r.existing?'Already a lead, updated':`Added ${name||addr||'lead'}`,'Open',()=>openLead(r.id)); }
  catch(e){ b.disabled=false; b.textContent='Add lead'; toast(e.message); } }

// Phone: a bottom bar so every page is one tap away
const TB2=[['calls','Calls','phone'],['leads','Leads','users'],['pipeline','Pipeline','appr'],['more','More','more']];
function tbHTML2(){ return `<nav id="tb2" aria-label="Pages">${TB2.map(([k,l,ic])=>`<button class="${S.tab===k||(k==='more'&&['drops','insights','settings','messages'].includes(S.tab))?'on':''}" onclick="${k==='more'?'tbMore2()':`closeOv();closePop2();go('${k}')`}">${ic2(ic,20)}<span>${l}</span></button>`).join('')}</nav>`; }
function tbMore2(){ openSheet2('More',`<div class="g2">${[['drops','Card drops','mail'],['insights','Stats','chart'],['settings','Settings','gear']].map(([k,l,ic])=>row2(NAVI[k]?NAVI[k][0]:'#4b5565',ic,l,'',chev2(),`closeOv();go('${k}')`)).join('')}</div>`); }
function tbPaint2(){ if(desk2()){ document.getElementById('tb2')?.remove(); document.body.classList.remove('hastb2'); return; } document.getElementById('tb2')?.remove(); if(!S.token&&!DEMO) return; document.body.insertAdjacentHTML('beforeend',tbHTML2()); document.body.classList.add('hastb2'); }
// Every render: phone bottom bar
window.render=(function(orig){ return async function(...a){ const r=await orig(...a); tbPaint2(); return r; }; })(window.render);
// Changing page: phone bottom bar follows
window.go=(function(orig){ return function(...a){ const r=orig(...a); setTimeout(tbPaint2,0); return r; }; })(window.go);
addEventListener('resize',()=>tbPaint2());

// Card drops: the layer and "how many" filters live behind one Filters button
try{ localStorage.removeItem('dp_dtop'); }catch{}   // the "how many" control is gone, so any old pick goes back to the automatic default
// Card drops: layer and how many filters behind one Filters button
window.drawDrops=(function(orig){ return function(...a){ const r=orig(...a); try{ const m=$('#main'), top=m.querySelector(':scope > .top'), ch=m.querySelector(':scope > .chips'); if(!top||!ch) return r;
  const segs=top.querySelectorAll('.seg'), box=document.createElement('div'); box.className='top dflt2'; box.hidden=!S.dflt; if(segs[1]) box.append(segs[1]);
  ch.remove();
  const active=S.dlayer&&S.dlayer!=='pins';
  top.insertAdjacentHTML('beforeend',`<button class="dfb2${S.dflt?' on':''}" onclick="S.dflt=!S.dflt;document.querySelector('.dflt2').hidden=!S.dflt;this.classList.toggle('on',S.dflt)">${ic2('menu',16)} Filters${active?' <i></i>':''}</button>`); top.after(box); }catch(e){} return r; }; })(window.drawDrops);

// Stats: the call order suggestion in plain words, and in Settings rather than Stats
function weightsPlain2(v){ const m=String(v.notes||'').match(/current weights ([\d.]+) per 100.*?proposed ([\d.]+)/i); return m?`Tested on past calls, the new order finds about ${m[2]} appraisals per 100 answered calls, against ${m[1]} now.`:'Tested on past calls, the new order should find more appraisals.'; }
// Settings: shows a waiting list version to approve
window.viewSettings=(function(orig){ return async function(...a){ const r=await orig(...a); try{ const ov=S.ovFull||await api('overview'); const pend=(ov.versions||[]).filter(v=>!v.approved);
  if(pend.length){ const v=pend[0]; document.querySelector('#main .setw2 .ph2')?.insertAdjacentHTML('afterend',`<div class="warn2" style="color:var(--accT);margin-bottom:14px">${ic2('trend',18)}<div style="flex:1"><b>A better call order is ready.</b> <span style="color:var(--t2)">${esc(weightsPlain2(v))}</span>
     <div style="display:flex;gap:8px;margin-top:10px"><button class="b2 pri" style="height:40px" onclick="approve(${v.version})">Use it</button><button class="b2" style="height:40px" onclick="reject(${v.version})">Not now</button></div></div></div>`); } }catch(e){} return r; }; })(window.viewSettings);

// Search: results from the first letter, shown straight away from what is already on the phone, then filled in from the server.
// Answers are remembered, so typing on or deleting back is instant.
const SC2=new Map();
function sLocal2(q,base){ const w=sWords(q), hit=(...xs)=>sHit(w,sHay(...xs));
  const leads=(base?base.leads:(S.leads||[])).filter(l=>hit(l.name,l.phone,l.address,l.suburb)).slice(0,20);
  const props=(base?base.props:[]).filter(p=>hit(p.owner_name,p.phone,p.owner2_name,p.phone2,p.street_address,p.suburb));
  const listings=(base?base.listings:(S.listings||[])).filter(t=>hit(t.address,t.suburb)).slice(0,10);
  return {leads,props,listings}; }
window.hSearch=function(v){ S.sq=v; clearTimeout(searchT); const q=v.trim();
  if(!q){ if(S.searching){ S.searching=false; const back=S.prevTab||'calls'; S.prevTab=null; go(back); setTimeout(()=>{ const i=$('#hq')||$('#hq2'); if(i){ i.value=v; i.focus(); } },0); } return; }
  if(!S.searching){ S.searching=true; S.prevTab=S.tab; }
  const key=q.toLowerCase(); let pre=SC2.get(key);
  if(!pre){ let k=key; while(k.length>1&&!SC2.has(k)) k=k.slice(0,-1); const b=SC2.get(k); pre=sLocal2(q,b&&key.startsWith(k)?b:null); }
  runSearch(q,pre);
  if(SC2.has(key)) return;
  searchT=setTimeout(async()=>{ try{ const A7=addrQ7(q), r=await searchApi7(q); SC2.set(key,r); if(SC2.size>200) SC2.delete(SC2.keys().next().value); if(S.searching&&S.sq.trim()===q) runSearch(q,r); }catch(e){} },70); };

// ---------- More tracking: errors and slowness, undos and backtracks, search success, calls with no result ----------
// Same rules as the rest: labels, counts and timings only, never anything typed or read off the screen.
(function(){ if(typeof uxPush!=='function') return;
  // 1. Every server request: slow ones (over 1.5s) and failed ones are recorded
  const wrapApi=fn=>async function(action,body){ const t0=performance.now(); try{ const r=await fn(action,body); const ms=Math.round(performance.now()-t0); if(ms>1500) uxPush('api',{g:'api:'+action,dt:ms,m:{ok:true}}); return r; }
    catch(e){ const ms=Math.round(performance.now()-t0); uxPush('api',{g:'api:'+action,dt:ms,m:{ok:false,offline:!navigator.onLine}}); throw e; } };
  window.api=wrapApi(window.api); if(window.api2) window.api2=wrapApi(window.api2);
  addEventListener('offline',()=>uxPush('offline',{})); addEventListener('online',()=>uxPush('online',{}));
  // 2. Undo taps
  document.addEventListener('click',e=>{ if(e.target.closest('#toast #undo')){ const msg=($('#toast')?.firstChild?.textContent||'').trim().replace(/\d{3,}/g,'#').slice(0,40); uxPush('undo',{g:'undo:'+(/^(Saved|Added|Already)/.test(msg)?'open':msg.replace(/ saved$/,'').toLowerCase())}); } },true);
  // 3. A sheet closed without choosing anything
  let sheetAt=0, sheetTitle='', sheetUsed=false;
  window.openSheet2=(function(o){ return function(title,...a){ sheetAt=Date.now(); sheetTitle=String(title).replace(/<[^>]+>/g,'').replace(/(with|call) [A-Z][\w']+( [A-Z][\w']+)*/g,'$1 #').slice(0,40); sheetUsed=false; return o(title,...a); }; })(window.openSheet2);
  document.addEventListener('click',e=>{ if(sheetAt&&e.target.closest('#sheet .sb2 button, #sheet .sb2 a, #sheet .sb2 input, #sheet .sb2 textarea')) sheetUsed=true; },true);
  window.closeOv=(function(o){ return function(...a){ if(sheetAt&&!sheetUsed&&$('#ov.show')&&$('#sheet.v2s')) uxPush('abandon',{g:'sheet:'+sheetTitle,dt:Date.now()-sheetAt}); sheetAt=0; return o(...a); }; })(window.closeOv);
  // 4. A lead opened again within 15 seconds of saving it
  let lastSave={id:null,at:0};
  window.toast2=(function(o){ return function(msg,label,fn){ if(/^Saved/.test(msg)) lastSave={id:S.ol&&S.ol.id,at:Date.now()}; return o(msg,label,fn); }; })(window.toast2);
  window.openLead=(function(o){ return function(id,opts){ if(id&&lastSave.id===id&&Date.now()-lastSave.at<15e3&&!(opts&&opts.saved)) uxPush('reopen',{g:'lead',dt:Date.now()-lastSave.at}); return o(id,opts); }; })(window.openLead);
  // 5. Search: how long the search was and whether a result got opened
  let sStart=0, sLen=0, sOpened=false;
  window.hSearch=(function(o){ return function(v){ const q=String(v||'').trim();
    if(q&&!sStart){ sStart=Date.now(); sOpened=false; }
    if(q) sLen=q.length;
    if(!q&&sStart){ uxPush('search',{g:'search',dt:Date.now()-sStart,m:{len:sLen,opened:sOpened}}); sStart=0; }
    return o(v); }; })(window.hSearch);
  ['openSearchLead','openSearchProp','openSearchListing'].forEach(n=>{ if(window[n]) window[n]=(function(o){ return function(...a){ if(sStart&&!sOpened){ sOpened=true; uxPush('search',{g:'search',dt:Date.now()-sStart,m:{len:sLen,opened:true,kind:n.replace('openSearch','').toLowerCase()}}); sStart=Date.now(); } return o(...a); }; })(window[n]); });
  // 6. A call dialled but no result logged for it
  const pend=new Map();
  window.markDial=(function(o){ return function(pid){ pend.set(pid,Date.now()); return o(pid); }; })(window.markDial);
  window.record=(function(o){ return async function(id,...a){ pend.delete(id); const now=Date.now(); for(const [p,t] of pend){ if(p!==id){ uxPush('nooutcome',{p,dt:now-t}); pend.delete(p); } } return o(id,...a); }; })(window.record);
  window.skip2=(function(o){ return function(id){ if(pend.has(id)){ uxPush('nooutcome',{p:id,dt:Date.now()-pend.get(id),m:{skipped:true}}); pend.delete(id); } return o(id); }; })(window.skip2);
})();

