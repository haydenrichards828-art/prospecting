// ---------- Send info and referrals: from a lead, the call screen or the pipeline, in two taps ----------
const XAPI=API.replace(/\/api$/,'/extra');
async function api2(action,body={}){
  if(DEMO){ await new Promise(r=>setTimeout(r,80)); const D=window.__demo2||(window.__demo2={partners:[{id:1,name:'Sarah Lee',business:'Coast Mortgage Co',kind:'finance',phone:'0400222333'}],refs:[]});
    if(action==='referrals') return {partners:D.partners,referrals:D.refs};
    if(action==='save_partner'){ const id=D.partners.length+1; D.partners.push({id,...body.partner}); return {id}; }
    if(action==='save_referral'){ const r=body.referral; if(r.id){ Object.assign(D.refs.find(x=>x.id===r.id)||{},r); return {ok:true}; } if(!r.consent) throw new Error('Tick that they agreed to be passed on'); const p=D.partners.find(x=>x.id==r.partner_id)||{}; D.refs.unshift({id:D.refs.length+1,...r,partner:p.name,business:p.business,status:'sent',created_at:new Date().toISOString()}); return {id:D.refs.length}; }
    if(action==='street_update') return {rows:[{d:'2026-08-12',price:1250000,addr:'14 Example St'},{d:'2026-03-02',price:1080000,addr:'3 Example St'}]};
    return {ok:true}; }
  let r; try{ r=await fetch(XAPI,{method:'POST',headers:{'Content-Type':'application/json','x-session':S.token||''},body:JSON.stringify({action,...body})}); }catch{ throw new Error("Can't reach the server. Check your signal."); }
  const j=await r.json().catch(()=>({error:'Server error'})); if(!r.ok) throw new Error(j.error||'Something went wrong'); return j; }
const ME='Marlowe from Dignam';
const money2=n=>n>=1e6?'$'+(Math.round(n/1e4)/100)+'m':'$'+Math.round(n/1e3)+'k';
// who: {name, phone, email, lead_id, property_id, lead}
async function sendInfo(who){ S.sw=who; if(!S.templates&&!DEMO) api('templates').then(t=>{ S.templates=t.rows||[]; }).catch(()=>{}); const fn=firstName(who.name||''), hi=`Hi ${fn!=='them'?fn:'there'}, it's ${ME}.`;
  const opts=[];
  const l=who.lead; if(l&&typeof matchesFor==='function'){ const ms=matchesFor(l).slice(0,3); if(ms.length) opts.push(['homes','Homes that suit them',`${hi} A few homes that look like a good fit:\n${ms.map(x=>`${x.t.address}, ${x.t.suburb}${x.t.price_text?' ('+x.t.price_text+')':''}${x.t.url?' '+x.t.url:''}`).join('\n')}\nHappy to arrange a look at any of them.`]); }
  if(who.property_id) opts.push(['street','Recent sales on their street',null]);
  opts.push(['listing','One of our listings',null]);
  opts.push(['checkin','Just checking in',`${hi} Just checking in to see how things are going. If you'd like an update on what homes near you are selling for, I'm happy to send one through.`]);
  opts.push(['appraisal','Offer a free appraisal',`${hi} If you're curious what your home would sell for in today's market, I can arrange a free, no obligation appraisal at a time that suits you.`]);
  (S.templates||[]).slice(0,4).forEach(t=>opts.push(['tpl'+t.id,t.name,t.body.replace(/\{first_name\}/g,fn!=='them'?fn:'there')]));
  S.swOpts=opts;
  openSheet2(`Message ${esc(who.name||'them')}`,`<div class="later2" style="grid-template-columns:repeat(2,minmax(0,1fr))">${opts.map((o,i)=>`<button onclick="swPick(${i},this)"><b>${esc(o[1])}</b></button>`).join('')}</div>
    <div id="sw_list"></div>
    <label class="fl2">Message<textarea id="sw_body" rows="4" data-grow placeholder="Pick one above or write your own"></textarea></label>
    <div class="sw2">${who.phone&&canText6()?`<button class="b2 pri" onclick="swSend('text')">${ic2('msg',18)}Text</button>`:''}${who.email?`<button class="b2" onclick="swSend('email')">${ic2('mail',18)}Email</button>`:''}<button class="b2${who.phone&&canText6()?'':' pri'}" onclick="swSend('copy')">Copy</button></div>

    ${who.phone?'':'<p class="hint2">No phone number on file, so copy it and paste where you need it.</p>'}`); }
async function swPick(i,btn){ pickOne(btn,'#sheet .later2'); const o=S.swOpts[i], w=S.sw, fn=firstName(w.name||''), hi=`Hi ${fn!=='them'?fn:'there'}, it's ${ME}.`; $('#sw_list').innerHTML='';
  if(o[0]==='street'){ $('#sw_body').value='Looking up recent sales…'; try{ const r=(await api2('street_update',{property_id:w.property_id})).rows||[];
      $('#sw_body').value=r.length?`${hi} Thought you might like to know what's sold near you lately:\n${r.slice(0,4).map(s=>`${s.addr}, ${money2(s.price)} (${new Date(s.d+'T00:00').toLocaleDateString('en-AU',{month:'short',year:'numeric'})})`).join('\n')}\nIf you ever want to know what yours is worth, just let me know.`:`${hi} There haven't been many sales on your street lately, which can mean buyers are waiting for the right home to come up. Happy to chat about what yours might be worth.`; }
    catch(e){ $('#sw_body').value=''; toast(e.message); } }
  else if(o[0]==='listing'){ const ls=(S.listings||[]).slice(0,12); $('#sw_list').innerHTML=`<div class="g2">${ls.map(t=>row2('var(--acc)','house',esc(t.address),esc([t.suburb,t.price_text].filter(Boolean).join(' · ')),'',`swListing(${t.id})`)).join('')||'<p class="hint2">No listings loaded.</p>'}</div>`; $('#sw_body').value=''; }
  else $('#sw_body').value=o[2];
  growTA($('#sw_body')); }
function swListing(id){ const t=(S.listings||[]).find(x=>x.id===id), w=S.sw, fn=firstName(w.name||''); if(!t) return;
  $('#sw_body').value=`Hi ${fn!=='them'?fn:'there'}, it's ${ME}. Thought this one might interest you: ${t.address}, ${t.suburb}${t.beds?`, ${t.beds} bed`:''}${t.price_text?` (${t.price_text})`:''}.${t.url?' '+t.url:''} Happy to arrange a look.`; growTA($('#sw_body')); $('#sw_list').innerHTML=''; }
async function swSend(ch){ const w=S.sw, body=$('#sw_body').value.trim(); if(!body) return toast('Write a message first');
  if(ch==='text'){ if(!callingAllowed()) return toast('Outside calling hours, so texts wait too. Copy it and send later.'); openUrl(smsLink(w.phone,body)); }
  else if(ch==='email') openUrl(`mailto:${encodeURIComponent(w.email)}?subject=${encodeURIComponent('From '+ME)}&body=${encodeURIComponent(body)}`);
  else { try{ await navigator.clipboard.writeText(body); }catch{} toast('Copied'); }
  api2('log_send',{channel:ch,kind:'info',body,person_name:w.name,phone:w.phone,email:w.email,lead_id:w.lead_id,property_id:w.property_id}).catch(()=>{});
  if(ch!=='copy'){ closeOv(); toast('Opened your messages. It’s noted on their record.'); } }

const RKINDS=[['finance','Finance'],['conveyancing','Conveyancing'],['agent','Agent elsewhere'],['buyers_agent',"Buyer's agent"],['property_management','Property management'],['trades','Trades'],['other','Other']];
async function referSheet(who){ S.rw=who; let d; try{ d=await api2('referrals'); }catch(e){ return toast(e.message); } S.ref=d;
  openSheet2(`Refer ${esc(who.name||'them')}`,`<div class="sth2">Who to</div>
    <div class="g2" id="rf_p">${(d.partners||[]).map(p=>`<button class="r2 rfp" data-id="${p.id}" onclick="pickOne(this,'#rf_p');S.rfp=${p.id}">${tile2('users')}<span class="rt2"><b>${esc(p.name)}</b><span>${esc([p.business,(RKINDS.find(k=>k[0]===p.kind)||[])[1]].filter(Boolean).join(' · '))}</span></span></button>`).join('')}
     <button class="r2" onclick="partnerSheet()">${tile2('plus')}<span class="rt2"><b>Add someone new</b><span>A broker, conveyancer, agent or trade you refer to</span></span></button></div>
    <label class="fl2">Note for them<textarea id="rf_note" rows="2" data-grow placeholder="Looking to buy in Thirroul, needs pre approval"></textarea></label>
    <label class="ck2"><input type="checkbox" id="rf_ok"> ${esc(firstName(who.name||'')!=='them'?firstName(who.name):'They')} agreed to be passed on</label>
    <button class="b2 pri" id="rf_go" onclick="saveRef()">Save referral</button>`); S.rfp=null; }
function tile2(i){ return `<span class="tl2i">${ic2(i,18,'var(--t1)')}</span>`; }
function partnerSheet(p={}){ openSheet2(p.id?'Edit contact':'Someone you refer to',`<div class="ap2"><label class="fl2">Name<input id="pp_name" value="${esc(p.name||'')}"></label><label class="fl2">Business<input id="pp_biz" value="${esc(p.business||'')}"></label>
   <label class="fl2">Phone<input id="pp_phone" inputmode="tel" value="${esc(fmtPh2(p.phone||''))}"></label><label class="fl2">Email<input id="pp_email" inputmode="email" value="${esc(p.email||'')}"></label></div>
   <label class="fl2">What they do<select id="pp_kind">${RKINDS.map(k=>`<option value="${k[0]}"${p.kind===k[0]?' selected':''}>${k[1]}</option>`).join('')}</select></label>
   <button class="b2 pri" onclick="savePartner(${p.id||'null'})">Save</button>`,S.rw?'referSheet(S.rw)':null); }
async function savePartner(id){ const ph=$('#pp_phone').value.trim(), e=phoneProblem(ph); if(e) return phoneBad($('#pp_phone'),e);
  try{ await api2('save_partner',{partner:{id,name:$('#pp_name').value,business:$('#pp_biz').value,phone:ph,email:$('#pp_email').value,kind:$('#pp_kind').value}}); }catch(err){ return toast(err.message); }
  toast('Saved'); if(S.rw) referSheet(S.rw); else { closeOv(); if(S.tab==='insights') render(); } }
async function saveRef(){ const w=S.rw; if(!S.rfp) return toast('Pick who you’re referring them to'); if(!$('#rf_ok').checked) return toast('Tick that they agreed to be passed on first');
  const p=(S.ref.partners||[]).find(x=>x.id===S.rfp)||{}, note=$('#rf_note').value.trim();
  try{ await api2('save_referral',{referral:{partner_id:p.id,partner_label:[p.name,p.business].filter(Boolean).join(', '),person_name:w.name,person_phone:w.phone,lead_id:w.lead_id,property_id:w.property_id,kind:p.kind,note,consent:true}}); }catch(e){ return toast(e.message); }
  const msg=`Hi ${firstName(p.name)!=='them'?firstName(p.name):'there'}, it's ${ME}. I'd like to refer ${w.name||'a client'}${w.phone?' ('+fmtPh2(w.phone)+')':''} to you.${note?' '+note:''} They're happy for you to get in touch.`;
  openSheet2('Referral saved',`<p class="hint2">It's in Stats under Referrals. Mark it won and add the fee when it comes through.</p>
    <div class="g2">${p.phone?row2('var(--acc)','msg',`Text ${esc(p.name)} the details`,esc(msg).slice(0,80)+'…',chev2(),`openUrl(smsLink('${esc(p.phone)}',${esc(JSON.stringify(msg))}));closeOv()`):''}
    ${p.email?row2('#4b5565','mail',`Email ${esc(p.name)}`,'',chev2(),`openUrl('mailto:${esc(p.email)}?subject=${encodeURIComponent('Referral from '+ME)}&body='+encodeURIComponent(${esc(JSON.stringify(msg))}));closeOv()`):''}</div>`); }

// Entry points: lead sheet, call screen More, pipeline sheet, open home list
window.openLead=(function(orig){ return function(id,opts){ orig(id,opts); const l=(S.leads||[]).find(x=>x.id===id); const c=document.querySelector('#sheet .lcta'); if(!l||!c||c.querySelector('.snd2')) return;
  c.insertAdjacentHTML('afterend',`<div class="lcta snd2"><button class="ghost" onclick="sendInfo({name:${esc(JSON.stringify(leadTitle(l)))},phone:${esc(JSON.stringify(l.phone||''))},lead_id:${l.id},property_id:${l.property_id||'null'},lead:(S.leads||[]).find(x=>x.id===${l.id})})">${ic2('msg',18)} Send info</button><button class="ghost" onclick="referSheet({name:${esc(JSON.stringify(leadTitle(l)))},phone:${esc(JSON.stringify(l.phone||''))},lead_id:${l.id},property_id:${l.property_id||'null'}})">${ic2('users',18)} Refer</button></div>`); }; })(window.openLead);
// Call screen More: adds Refer to a partner
window.moreSheet2=(function(orig){ return function(id){ orig(id); const r=findRow(id); const g=document.querySelector('#sheet .sb2 .g2'); if(!g||!r) return;
  const who=JSON.stringify({name:people(r.owner_name)[0]||'',phone:r.owner_phone||r.phone||'',property_id:id});
  g.insertAdjacentHTML('afterbegin',row2('var(--acc)','msg','Message','Text them: street sales, a listing, a check in',chev2(),`sendInfo(${esc(who)})`)+row2('#6366f1','users','Refer','To a broker, conveyancer or agent you work with',chev2(),`referSheet(${esc(who)})`)); }; })(window.moreSheet2);
// Pipeline sheet: adds Refer to a partner
window.pipeSheet=(function(orig){ return function(id){ orig(id); const x=(S.pipe||[]).find(r=>r.property_id===id); const gs=document.querySelectorAll('#sheet .sb2 .g2'); const g=gs[gs.length-1]; if(!g||!x) return;
  const who=JSON.stringify({name:people(x.owner_name)[0]||'',phone:x.phone||'',property_id:id,lead_id:x.lead_id||null});
  g.insertAdjacentHTML('beforeend',row2('var(--acc)','msg','Message','',chev2(),`sendInfo(${esc(who)})`)+row2('#6366f1','users','Refer','',chev2(),`referSheet(${esc(who)})`)); }; })(window.pipeSheet);

const RST=[['sent','Sent'],['in_progress','In progress'],['won','Won'],['lost','Lost']];
function refEdit(id){ const r=(S.ref?.referrals||[]).find(x=>x.id===id); if(!r) return;
  openSheet2(`${esc(r.person_name||'Referral')} to ${esc(r.partner||'')}`,`<div class="later2 sm" id="re_st">${RST.map(([k,l])=>`<button class="${r.status===k?'on':''}" onclick="pickOne(this,'#re_st');S.rest='${k}'">${l}</button>`).join('')}</div>
   <div class="ap2"><label class="fl2">Fee received ($)<input id="re_fee" inputmode="decimal" value="${r.fee??''}"></label><label class="fl2">Paid on<input id="re_paid" type="date" value="${r.paid_at||''}"></label></div>
   <label class="fl2">Note<textarea id="re_note" rows="2" data-grow>${esc(r.note||'')}</textarea></label>
   <button class="b2 pri" onclick="refSave(${id})">Save</button>`); S.rest=r.status; }
async function refSave(id){ const fee=$('#re_fee').value.replace(/[$,\s]/g,'');
  try{ await api2('save_referral',{referral:{id,status:S.rest,fee,paid_at:$('#re_paid').value,note:$('#re_note').value}}); }catch(e){ return toast(e.message); }
  closeOv(); toast('Saved'); if(S.tab==='insights') render(); }

// One colour per meaning, used everywhere: outcomes, pipeline stages, stats and tags
const COL={no_answer:'#7C3AED',not_selling:'#d6455a',call_back:'#d97706',lead:'#3b82f6',appraisal:'#16a34a',listed:'#0d9488',sold:'#eab308',withdrawn:'#64748b',lost:'#d6455a',other_agency:'#d6455a',referral:'#6366f1',sent:'#0ea5e9'};

// ---------- From the click tracking: people click outside a panel to close it, and click page titles expecting the menu ----------
// Clicking the dark area around a panel closes it, unless something was typed and not saved (then it asks first).
(function(){ const ov=document.getElementById('ov'); if(!ov) return; let dirty=false;
  ov.addEventListener('input',e=>{ if(e.target.closest('#sheet')) dirty=true; },true);
  new MutationObserver(()=>{ if(!ov.classList.contains('show')) dirty=false; }).observe(ov,{attributes:true,attributeFilter:['class']});
  let warned=0;
  ov.addEventListener('click',e=>{ if(e.target!==ov) return;
    if(dirty&&Date.now()-warned>4000){ warned=Date.now(); toast('You typed something here. Tap outside again to close without saving.'); return; }
    dirty=false; warned=0; closeOv(); }); })();
// (page titles are plain titles now; the sidebar and the phone's bottom bar move between pages)

// ---------- Side bar on computers: every page one click away (the menu took 7 to 30 seconds to use) ----------
// Pipeline opens Leads, Appraisals and Listings when you point at it. The button at the top folds the bar down to just the icons.
const SIDE=[['calls','Calls','phone'],['pipe','Pipeline','appr',[['leads','Leads','users'],['appraisal','Appraisals','appr'],['listed','Listings','star'],['sold','Sold','tag']]],['drops','Card drops','mail'],['insights','Stats','chart']];
const LOGO2=`<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2.2" width="20" height="15.6" rx="4.2" fill="#3b82f6"/><path d="M5.2 16.8 4.4 22.4 10.6 17.4z" fill="#3b82f6" stroke="#3b82f6" stroke-width="1" stroke-linejoin="round"/><rect x="15.3" y="5.3" width="1.7" height="3.4" rx=".4" fill="#fff"/><path d="M5.8 9.9 12 5l6.2 4.9" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.9 9.4 12 5.4l5.1 4v6.3H6.9z" fill="#fff"/><path d="M10.5 15.7v-4a.4.4 0 0 1 .4-.4h2.2a.4.4 0 0 1 .4.4v4z" fill="#3b82f6"/></svg>`;
function sideFolded(){ try{ return localStorage.getItem('dp_side')==='1'; }catch{ return false; } }
function sideFold(){ try{ localStorage.setItem('dp_side',sideFolded()?'0':'1'); }catch{} sideApply(); }
function sideW(){ let w=184; try{ w=+localStorage.getItem('dp_side_w')||184; }catch{} return Math.min(380,Math.max(150,w)); }
function sideApply(){ const n=document.querySelector('.side2'); if(!n) return; const f=sideFolded(); n.classList.toggle('fold',f); n.style.width=f?'':sideW()+'px'; }
function sideReset(){ try{ localStorage.setItem('dp_side_w','184'); localStorage.setItem('dp_side','0'); }catch{} sideApply(); }
function sideDrag(e){ const n=document.querySelector('.side2'); if(!n) return; e.preventDefault(); const now=Date.now(); if(now-(window._rzT||0)<400){ window._rzT=0; return sideReset(); } let moved=false; const x0=n.getBoundingClientRect().left; n.classList.add('drag'); document.body.classList.add('rzing');
  const mv=ev=>{ moved=true; const w=ev.clientX-x0; const fold=w<120; try{ localStorage.setItem('dp_side',fold?'1':'0'); if(!fold) localStorage.setItem('dp_side_w',String(Math.round(Math.min(380,Math.max(150,w))))); }catch{} sideApply(); };
  const up=()=>{ window._rzT=moved?0:Date.now(); n.classList.remove('drag'); document.body.classList.remove('rzing'); removeEventListener('pointermove',mv); removeEventListener('pointerup',up); };
  addEventListener('pointermove',mv); addEventListener('pointerup',up); }
function sideGo(k){ closePop2(); closeOv(); if(k==='appraisal'||k==='listed'||k==='sold'){ S.pst=k; go('pipeline'); } else go(k); }
function sideOn(k){ if(S.searching) return false; if(k==='appraisal'||k==='listed'||k==='sold') return S.tab==='pipeline'&&(S.pst||'appraisal')===k; return S.tab===k; }
function sideHTML(){ const nl=(S.leads||[]).filter(l=>newMatches(l).length).length;
  const item=(k,l,ic,sub)=>`<button class="si2${sideOn(k)?' on':''}${sub?' sub':''}" onclick="sideGo('${k}')" title="${esc(l)}"${sideOn(k)?' aria-current="page"':''}>${ic2(ic,sub?16:19)}<span class="sl">${esc(l)}</span>${k==='leads'&&nl?'<i class="dot"></i>':''}</button>`;
  const inPipe=['leads','pipeline'].includes(S.tab)&&!S.searching;
  return `<nav class="side2${sideFolded()?' fold':''}" aria-label="Pages"${sideFolded()?'':` style="width:${sideW()}px"`}><div class="rz2" onpointerdown="sideDrag(event)" title="Drag to resize, double click to reset" role="separator" aria-orientation="vertical" aria-label="Resize sidebar"></div>
   <div class="sh2"><span class="brand2">${LOGO2}</span><span class="bn2">Prospect</span><button class="fold2" onclick="sideFold()" aria-label="Show icons only or icons and names">${ic2('menu',18)}</button></div>
   <div class="sg2">${SIDE.map(([k,l,ic,kids])=>kids?`<div class="grp2${inPipe?' open':''}"><button class="si2${inPipe?' on':''}" onclick="this.parentElement.classList.toggle('open')" aria-expanded="${inPipe}" title="${l}">${ic2(ic,19)}<span class="sl">${l}</span><span class="car2">${ic2('down',14)}</span>${nl?'<i class="dot"></i>':''}</button><div class="kids2">${kids.map(([k2,l2,i2])=>item(k2,l2,i2,true)).join('')}</div></div>`:item(k,l,ic)).join('')}</div>
   <div class="sf2">${item('settings','Settings','gear')}</div></nav>`; }
// Every render: puts the side bar in
window.render=(function(orig){ return async function(){ const p=orig(); const sh=document.getElementById('shell');
  if(sh&&S.token&&!sh.querySelector('.side2')) sh.insertAdjacentHTML('afterbegin',sideHTML());
  return p; }; })(window.render);
// the pipeline tabs inside the page also keep the side bar in step
window.viewPipeline=(function(orig){ return async function(local){ const r=await orig(local); const s=document.querySelector('.side2'); if(s) s.outerHTML=sideHTML(); return r; }; })(window.viewPipeline);
// Card drop pins are small: a tap within a finger's width of a pin now opens it
(function(){ const t=setInterval(()=>{ if(!window.L||!L.canvas) return; clearInterval(t); const orig=L.canvas; L.canvas=o=>orig({...(o||{}),tolerance:10}); },500); })();
// Lead panel: status, next action and edit details always showing; matching homes and older notes open (people opened them every time)
window.openLead=(function(orig){ return function(id,opts){ orig(id,opts); const sh=document.getElementById('sheet'); if(!sh) return;
  const d=sh.querySelector('details.lmore'); if(d){ d.open=true; d.querySelector('summary')?.remove(); d.classList.add('lmore2'); }
  sh.querySelectorAll('.lsec details').forEach(x=>x.open=true);
  const h=sh.querySelector('.lhead h3'); if(h&&id){ h.classList.add('edn2'); h.title='Tap to edit name, phone and address'; h.onclick=()=>{ if(typeof editDetails==='function') editDetails(); }; } }; })(window.openLead);
// Back from a call: the result buttons light up so the next tap is obvious
document.addEventListener('visibilitychange',()=>{ if(document.hidden||!S.tm||!S.tm.back||Date.now()-S.tm.back>1500) return;
  document.querySelectorAll('#main .bar2x').forEach(b=>{ b.classList.remove('pulse2'); void b.offsetWidth; b.classList.add('pulse2'); });
  if(desk2()){ const n=document.getElementById('note2'); if(n&&!n.value) n.focus(); } });

// Lead panel bottom: one clean list. Each row shows its current value; tap to change it right there. Status and next step save straight away.
const LST2=[['Lead','Lead'],['Appraisal Booked','Appraisal booked'],['Appraisal','Appraisal'],['Listed','Listed'],['Sold','Sold'],['Listed Elsewhere','Listed elsewhere'],['Not Ready','Not ready'],['Do Not Contact','Do not contact']];
function lrowHTML(k,ic,label,val,on){ return `<button class="ldr4" data-k="${k}" onclick="${on}"><span class="lri2">${ic2(ic,17)}</span><span class="lrt2"><span>${esc(label)}</span><b class="${val?'':'none'}">${esc(val||'Not set')}</b></span>${chev2()}</button><div class="lrx2" id="lrx_${k}" hidden></div>`; }
function lrToggle(k,html){ const x=document.getElementById('lrx_'+k); if(!x) return; const open=x.hidden; document.querySelectorAll('.lrx2').forEach(e=>{ e.hidden=true; e.innerHTML=''; }); document.querySelectorAll('.ldr4').forEach(e=>e.classList.remove('open')); if(!open) return; x.innerHTML=html; x.hidden=false; x.previousElementSibling.classList.add('open'); }
function lrPick(id,field,val){ const l=(S.leads||[]).find(x=>x.id===id); if(!l) return;
  const sel=document.getElementById(field==='status'?'ln_status':'ln_next'); if(sel) sel.value=val;
  const prev=l[field]; l[field]=val||null; if(field==='status') S.ol.status=val;
  const p={id,body:'',status:field==='status'?val:(document.getElementById('ln_status')?.value||l.status||'Lead'),next_action:field==='next_action'?(val||null):(document.getElementById('ln_next')?.value||null)};
  const r=document.querySelector(`.ldr4[data-k="${field}"] b`); if(r){ r.textContent=field==='status'?(LST2.find(s=>s[0]===val)||[0,val])[1]:(val||'Not set'); r.classList.toggle('none',!val); }
  lrToggle(field);
  api('lead_note',p).then(()=>{ if(field==='status'&&MOVE6[val]) return statusMoved6(id,val); toast(field==='status'?'Status saved':'Next step saved'); if(S.tab==='leads') drawLeads(); })
   .catch(e=>{ l[field]=prev; toast("Couldn't save that. "+e.message); }); }
// 22 Nov: a status that moves someone (the database moves them along the pipeline) now shows the move:
// the list reloads without them and says where they went. With no address to make a house from, the add form opens filled in.
const MOVE6={'Appraisal':['appraisal','Moved to Appraisals'],'Listed':['listed','Moved to Listings'],'Sold':['sold','Moved to Sold'],'Listed Elsewhere':['listed_other','Marked as listed elsewhere'],'Do Not Contact':[null,'Marked do not contact. Taken off the call list too']};
async function statusMoved6(id,val){ const [stage,msg]=MOVE6[val]; S.leads=null; await loadLeads().catch(()=>{}); const still=(S.leads||[]).find(x=>x.id===id);
  if(still&&stage){ if(!still.property_id) toast('Status saved. Add the address to move them'); return leadMove6(id,stage); }   // the database could not move them: do it here
  closeOv(); toast(msg); render(); }
// Lead panel: status line and next action
window.openLead=(function(orig){ return function(id,opts){ orig(id,opts); const sh=document.getElementById('sheet'); if(!sh||!id) return;
  const l=(S.leads||[]).find(x=>x.id===id); if(!l) return;
  sh.querySelector('.lstat')?.remove();
  const lm=sh.querySelector('details.lmore'); if(lm){ lm.hidden=true; }
  const wv=document.getElementById('wview_box'); const hasB=hasCriteria(l.buy); if(wv&&!hasB) wv.hidden=true;
  const st=(LST2.find(s=>s[0]===(l.status||'Lead'))||[0,l.status])[1];
  const who=[fmtPh2(l.phone||''),[l.address,l.suburb].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
  const chips=(field,list,cur)=>`<div class="lrc2">${list.map(([v,t])=>`<button class="${v===cur?'on':''}" onclick="lrPick(${id},'${field}','${v.replace(/'/g,'')}')">${esc(t)}</button>`).join('')}</div>`;
  const stHTML=chips('status',LST2,l.status||'Lead').replace(/"/g,'&quot;');
  const nxHTML=chips('next_action',[['','None'],...LO.next_action.map(v=>[v,v])],l.next_action||'').replace(/"/g,'&quot;');
  const rows=`<div class="ldrows4">
    ${lrowHTML('status','flag','Status',st,`lrToggle('status',this.dataset.h)`).replace('data-k="status"',`data-k="status" data-h="${stHTML}"`)}
    ${lrowHTML('who','user','Their details',who,`editDetails();this.classList.toggle('open')`)}
    ${hasB?'':lrowHTML('buy','search','What they want to buy','',`editWants(true);this.style.display='none'`)}
  </div>`;
  const card=sh.querySelector('.lcard'); if(card) card.insertAdjacentHTML('afterend',rows);
  const de=document.getElementById('deditor'), wr=sh.querySelector('.ldr4[data-k="who"]'); if(de&&wr) wr.nextElementSibling.after(de);
  const we=document.getElementById('weditor'), br=sh.querySelector('.ldr4[data-k="buy"]'); if(we&&br) br.nextElementSibling.after(we);
}; })(window.openLead);

// Simpler lead panel: the extras live behind a three dot menu next to the close button
function lmenuOpen(btn){ const m=document.getElementById('lmenu2'); if(!m) return; const show=m.hidden; m.hidden=!show; btn.classList.toggle('on',show);
  if(show) setTimeout(()=>document.addEventListener('click',function c(e){ if(!e.target.closest('#lmenu2,.ldots2')){ m.hidden=true; btn.classList.remove('on'); document.removeEventListener('click',c); } }),0); }
function lmenuGo(k){ const m=document.getElementById('lmenu2'); if(m) m.hidden=true; document.querySelector('.ldots2')?.classList.remove('on');
  const rows=document.querySelector('.ldrows4');
  if(k==='status'||k==='next_action'){ if(!rows) return; rows.hidden=false; rows.querySelectorAll('.ldr4').forEach(r=>r.style.display=r.dataset.k===k?'':'none');
    const r=rows.querySelector(`.ldr4[data-k="${k}"]`); lrToggle(k,r.dataset.h); rows.scrollIntoView({block:'nearest',behavior:'smooth'}); return; }
  if(k==='who'){ const d=document.getElementById('deditor'); if(d){ d.hidden=false; d.scrollIntoView({block:'nearest',behavior:'smooth'}); d.querySelector('input')?.focus(); } return; }
  if(k==='buy'){ editWants(true); document.getElementById('weditor')?.scrollIntoView({block:'nearest',behavior:'smooth'}); return; }
  if(k==='send'){ const l=S.ol&&(S.leads||[]).find(x=>x.id===S.ol.id); if(l) sendInfo({name:leadTitle(l),phone:l.phone||'',lead_id:l.id,property_id:l.property_id||null,lead:l}); return; }
  const b=[...document.querySelectorAll('.snd2 button')].find(x=>x.textContent.includes('Refer')); b?.click(); }
// Lead panel: picking status or next action updates the panel in place
window.lrPick=(function(orig){ return function(...a){ orig(...a); const rows=document.querySelector('.ldrows4'); if(rows) rows.hidden=true;
  const sub=document.querySelector('.lhead .lsub b'); const l=(S.leads||[]).find(x=>x.id===a[0]); if(a[1]==='status'&&l){ const t=(LST2.find(s=>s[0]===l.status)||[0,l.status])[1]; if(sub) sub.textContent=t; }
  const mb=[...document.querySelectorAll('#lmenu2 button')].find(b=>b.getAttribute('onclick')===`lmenuGo('${a[1]}')`); if(mb&&l){ let em=mb.querySelector('em'); const v=a[1]==='status'?(LST2.find(s=>s[0]===l.status)||[0,l.status])[1]:(l.next_action||''); if(!em&&v){ em=document.createElement('em'); mb.append(em); } if(em) em.textContent=v; } }; })(window.lrPick);
// Lead panel: details rows start folded
window.openLead=(function(orig){ return function(id,opts){ orig(id,opts); const sh=document.getElementById('sheet'); if(!sh||!id) return;
  const l=(S.leads||[]).find(x=>x.id===id); if(!l) return;
  const rows=sh.querySelector('.ldrows4'); if(rows){ rows.hidden=true;
    ['deditor','weditor'].forEach(i=>{ const e=document.getElementById(i); if(e) rows.after(e); }); }
  sh.querySelector('.snd2')?.setAttribute('hidden','');
  const st=(LST2.find(s=>s[0]===(l.status||'Lead'))||[0,l.status])[1];
  const it=(k,ic,t,v='')=>`<button onclick="lmenuGo('${k}')">${ic2(ic,17)}<span>${t}</span>${v?`<em>${esc(v)}</em>`:''}</button>`;
  const x=sh.querySelector('.lhead .lact');
  if(x) x.insertAdjacentHTML('beforebegin',`<div class="ldw2"><button class="ldots2" onclick="lmenuOpen(this)" aria-label="More options" aria-haspopup="menu">${ic2('more',20)}</button>
   <div id="lmenu2" class="lmenu2" role="menu" hidden>${it('status','flag','Status',st)}${it('who','user','Edit')}${it('buy','search','What they want to buy')}<hr>${it('send','msg','Message')}${it('refer','users','Refer')}</div></div>`);
}; })(window.openLead);

