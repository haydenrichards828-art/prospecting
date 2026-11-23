// ---------- Speed and usability tracking, added 22 Nov: how long each job takes, whether it gets finished, how fast taps respond ----------
// A job is anything done in a sheet: it starts when the sheet opens and ends when it closes; done means something was saved meanwhile.
(function(){
  const READS=new Set('list callbacks overview today work_stats leads search list_health upcoming_callbacks removed_list elists elist pipeline recent_sales area_preview area_list drops templates preview_message messages settings referrals'.split(' '));
  const wrap=name=>{ const orig=window[name]; if(typeof orig!=='function') return; window[name]=async function(action,...rest){ const t0=performance.now();
      if(UX.job&&!READS.has(action)) UX.job.saved=true;
      try{ return await orig.call(this,action,...rest); } finally{ const ms=Math.round(performance.now()-t0); if(!DEMO) uxPush('api',{g:String(action).slice(0,40),dt:ms}); } }; };
  wrap('api'); wrap('api2');
  const ov=document.getElementById('ov'); let open=false;
  new MutationObserver(()=>{ const now=ov.classList.contains('show');
    if(now&&!open){ UX.job={name:uxScreen(),at:Date.now(),taps:0,saved:false}; }
    if(!now&&open&&UX.job){ const j=UX.job; UX.job=null; uxPush('task',{g:j.name.slice(0,80),dt:Date.now()-j.at,m:{taps:j.taps,done:j.saved}}); }
    open=now; }).observe(ov,{attributes:true,attributeFilter:['class']});
  document.addEventListener('click',()=>{ if(UX.job) UX.job.taps++; },true);
  // tap response: the time from a tap or key press to the screen updating, per interaction
  UX.resp=[]; UX.slowN=0;
  try{ new PerformanceObserver(list=>{ const seen=new Map();
      for(const e of list.getEntries()){ if(!e.interactionId) continue; const p=seen.get(e.interactionId); if(!p||e.duration>p.duration) seen.set(e.interactionId,e); }
      for(const e of seen.values()){ UX.resp.push(Math.round(e.duration)); if(e.duration>=200){ UX.slowN++; const el=e.target&&e.target.closest?e.target.closest(UX_INTER):null; uxPush('slow',{g:el?uxLabel(el):uxDeadLabel(e.target),dt:Math.round(e.duration)}); } }
    }).observe({type:'event',durationThreshold:16,buffered:true}); }catch(e){}
  // a summary of every response time since the last send, so the typical figure can be worked out
  const sum=()=>{ if(!UX.resp.length) return; const r=UX.resp.splice(0).sort((a,b)=>a-b), q=f=>r[Math.min(r.length-1,Math.floor(f*r.length))];
    uxPush('resp',{dt:q(.75),m:{n:r.length,p50:q(.5),p75:q(.75),max:r[r.length-1]}}); };
  setInterval(sum,14000); document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') sum(); });
})();

// ---------- Moving a lead along the pipeline (22 Nov): 84% of leads had no house linked, so dragging them did nothing ----------
// Lead cards get the same ⋯ menu as appraisal and listing cards. With no house linked, the typed address is used;
// with no address at all, the add form opens with their details filled in.
const LSRC6={'Card Drop':'card_drop','Cold Call':'calls','Just Listed':'just_listed','Just Sold':'just_sold','Open Home':'open_home','Database':'crm','Referral':'referral','Door Knock':'door_knock','Letterbox Drop':'card_drop','Social Media':'social','Website':'website'};
function addrParts6(l){ let a=String(l.address||'').trim(), sub=String(l.suburb||'').trim();
  if(a.includes(',')){ const ps=a.split(','); a=ps[0].trim(); if(!sub) sub=ps.slice(1).join(',').trim(); }
  const u=a.match(/^(?:unit\s*|u\s*)?(\d+[a-z]?)\s*\/\s*(\d+[a-z]?(?:-\d+[a-z]?)?)\s+(.+)$/i); if(u) return {unit:u[1],house_number:u[2],street:u[3],suburb:sub};
  const n=a.match(/^(\d+[a-z]?(?:-\d+[a-z]?)?)\s+(.+)$/i); return n?{house_number:n[1],street:n[2],suburb:sub}:{house_number:'',street:a,suburb:sub}; }
async function leadMove6(id,stage){ const l=(S.leads||[]).find(x=>x.id===id); if(!l) return; closeOv();
  if(l.property_id) return setStage(l.property_id,stage);
  const a=addrParts6(l), source=LSRC6[l.source]||'other', where={appraisal:'Appraisals',listed:'Listings',sold:'Sold',listed_other:'Listed elsewhere'}[stage]||'Listings';
  const first=stage==='appraisal'?'appraisal':'listed', after=first===stage?null:stage;
  if(a.house_number&&a.street&&a.suburb){ try{ const r=await api('add_pipeline',{...a,owner_name:l.name||'',phone:l.phone||'',stage:first,source,lead_id:id}); if(after&&r&&r.property_id) await api('set_stage',{property_id:r.property_id,stage:after}); toast('Moved to '+where); S.leads=null; render(); }catch(e){ toast(e.message); } return; }
  openAddPipe(); S.addp.stage=first; S.addp.after=after; S.addp.source=source; S.addp.lead_id=id;
  const set=(sel,v)=>{ const i=$(sel); if(i&&v) i.value=v; };
  set('#ap_no',a.house_number); set('#ap_st',a.street); set('#ap_sub',a.suburb); set('#ap_own',l.name); set('#ap_ph',l.phone);
  document.querySelectorAll('#ap_stage button').forEach((b,i)=>b.classList.toggle('on',i===(first==='appraisal'?0:1)));
  document.querySelectorAll('#ap_source button').forEach(b=>b.classList.toggle('on',(b.getAttribute('onclick')||'').includes(`'${source}'`)));
  const t=$('#sheet .sh2 b'); if(t) t.textContent=`Move ${l.name||'this lead'} to ${where}`; const g=$('#ap_go'); if(g) g.textContent='Move to '+where;
  setTimeout(()=>{ const f=['#ap_no','#ap_st','#ap_sub'].map(s=>$(s)).find(i=>i&&!i.value); (f||$('#ap_go'))?.focus(); },80); }
function leadMenu6(id){ const l=(S.leads||[]).find(x=>x.id===id); if(!l) return;   // the ⋯ menu is the status list: picking one moves them
  const where={'Appraisal Booked':'Stays in Leads','Appraisal':'Moves to Appraisals','Listed':'Moves to Listings','Sold':'Moves to Sold','Listed Elsewhere':'Leaves Leads','Do Not Contact':'Leaves Leads and the call list'};
  openSheet2(esc(l.name||'Lead'),`<div class="mm6s">${LST2.map(([v,t])=>`<button class="mm6${(l.status||'Lead')===v?' on':''}" onclick="leadStatus6(${id},'${v}')"><span><b>${t}</b>${where[v]?`<em>${where[v]}</em>`:''}</span>${(l.status||'Lead')===v?ic2('check',16):''}</button>`).join('')}
   <button class="mm6" onclick="closeOv();openLead(${id})"><span><b>Open lead</b><em>Notes, follow up and details</em></span>${ic2('chev',16)}</button></div>`); }
async function leadStatus6(id,val){ const l=(S.leads||[]).find(x=>x.id===id); if(!l) return closeOv();
  if(val===(l.status||'Lead')){ if(MOVE6[val]&&MOVE6[val][0]) return leadMove6(id,MOVE6[val][0]); return closeOv(); }   // already that status but not moved yet: move them now
  try{ await api('lead_note',{id,body:'',status:val,next_action:l.next_action||null}); l.status=val; }catch(e){ return toast("Couldn't save that. "+e.message); }
  if(MOVE6[val]) return statusMoved6(id,val); closeOv(); toast('Status saved'); render(); }
// dragging a lead onto Appraisals or Listings goes through the same steps
window.drop3=(function(orig){ return async function(e,col){ let d; try{ d=JSON.parse(e.dataTransfer.getData('text/plain')); }catch{ return orig(e,col); }
  if(d.kind==='ld'&&(col==='ap'||col==='ls')){ e.preventDefault(); dragEnd3(); return leadMove6(d.id,col==='ap'?'appraisal':'listed'); } return orig(e,col); }; })(window.drop3);
// the ⋯ button on each lead card, after call and text
window.board3=(function(orig){ return async function(local){ const r=await orig(local);
  document.querySelectorAll('.bd3 .bc3.ld .cd3').forEach(cd=>{ const o=cd.querySelector('.cn3')?.getAttribute('onclick')||'', m=o.match(/openLead\((\d+)\)/); if(!m||cd.querySelector('.lm6')) return;
    const acts=cd.querySelector('.cb3'); if(!acts) return; const b=document.createElement('button');
    b.className='lm6'; b.setAttribute('aria-label','Move to the next stage'); b.title='Move to the next stage'; b.innerHTML=ic2('more',16); b.onclick=ev=>{ ev.stopPropagation(); leadMenu6(+m[1]); }; acts.appendChild(b); });
  return r; }; })(window.board3);

// ---------- Lead follow up saves the moment it is tapped (22 Nov): it used to need Save, and closing the panel lost it ----------
async function fuSave6(){ const o=S.ol; if(!o||!o.id||!o.follow_up) return; const l=(S.leads||[]).find(x=>x.id===o.id), prev=l?l.follow_up:null, val=o.follow_up;
  const nice=new Date(val+'T00:00').toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'});
  try{ await api('save_lead',{id:o.id,lead:{follow_up:val}}); if(l) l.follow_up=val;
    toast(`Follow up saved for ${nice}`,prev?async()=>{ try{ await api('save_lead',{id:o.id,lead:{follow_up:prev}}); if(l) l.follow_up=prev; if(S.ol&&S.ol.id===o.id) S.ol.follow_up=prev; document.querySelectorAll('#ln_fu button').forEach(b=>b.classList.remove('on')); toast('Follow up put back'); }catch(e){ toast(e.message); } }:undefined); }
  catch(e){ toast(e.message); } }

// ---------- Call screen for first timers (22 Nov) ----------
// Top bar: just calls against the goal and appraisals (it showed five numbers, two of them about list position)
window.drawProg=function(){ const ov=S.ov; if(!ov) return; const tg=ov.settings?.daily_target||100, c=ov.today_calls||0, a=ov.today_appraisals||0;
  const t=$("#tstats"); if(t) t.innerHTML=`<div><b>${c}</b><span>/ ${tg} calls</span></div><div><b style="color:var(--ok)">${a}</b><span>appraisals</span></div>`;
  const p=$("#pstats"); if(p) p.innerHTML=`<span><b>${c}</b> / ${tg}</span><span><b style="color:var(--ok)">${a}</b> appr</span>`; };
// Keyboard letters on buttons stay hidden until a shortcut key is used once (they show on hover meanwhile)
(function(){ const on=()=>document.body.classList.add('kb6'); try{ if(localStorage.getItem('dp_kb6')) on(); }catch{}
  document.addEventListener('keydown',e=>{ if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')||e.ctrlKey||e.metaKey||e.altKey) return;
    if(/^[1-5scnm]$/i.test(e.key)&&S.tab==='calls'){ on(); try{ localStorage.setItem('dp_kb6','1'); }catch{} } },true); })();
// One time help on the first call: three steps, gone after Got it or the first outcome
function hint6done(){ try{ localStorage.setItem('dp_hint6','1'); }catch{} document.querySelectorAll('.fh6').forEach(x=>x.remove()); }
function hint6(){ try{ if(localStorage.getItem('dp_hint6')) return; }catch{ return; } if(S.tab!=='calls'||S.view==='list'||document.querySelector('.fh6')) return;
  const num=[...document.querySelectorAll('a.num2,a.pnum2')].find(x=>x.offsetParent); if(!num) return;
  const d=document.createElement('div'); d.className='fh6'; d.setAttribute('role','note');
  d.innerHTML=`<ol><li><b>1</b>Tap the number to call</li><li><b>2</b>Type notes while you talk</li><li><b>3</b>Tap what happened</li></ol><button onclick="hint6done()">Got it</button>`;
  num.parentElement.insertBefore(d,num); }
window.drawList=(function(orig){ return function(...a){ const r=orig.apply(this,a); hint6(); return r; }; })(window.drawList);
window.act2=(function(orig){ return function(...a){ hint6done(); return orig.apply(this,a); }; })(window.act2);

// ---------- Instant screens (22 Nov) ----------
// Each screen's last answer is kept on the phone and shown straight away; the fresh answer replaces it a moment later.
// After any change (an outcome, a move, a save) the next read waits for the fresh answer, so nothing old shows after an edit.
// While Calls is open the other screens' answers are fetched in the background, so switching is instant the first time too.
(function(){
  const SWR=new Set(['leads','pipeline','overview','work_stats','upcoming_callbacks','templates','elists']);
  const READ6=new Set('list callbacks overview today work_stats leads search list_health upcoming_callbacks removed_list elists elist pipeline recent_sales area_preview area_list drops templates preview_message messages settings referrals ping'.split(' '));
  const mem={}, fetchedAt={}; let wroteAt=0;   // a saved answer older than the last change is not shown
  const tok=()=>String(S.token||'').slice(-8), key=(a,b)=>a+':'+JSON.stringify(b||{});
  const load=k=>{ if(mem[k]) return mem[k]; try{ const c=JSON.parse(localStorage.getItem('dp_c6_'+k)||'null'); if(c&&c.tok===tok()&&Date.now()-c.at<48*3600e3) return mem[k]=c; }catch{} return null; };
  const save=(k,v)=>{ const c={at:Date.now(),tok:tok(),v}; mem[k]=c; try{ localStorage.setItem('dp_c6_'+k,JSON.stringify(c)); }catch{ try{ localStorage.removeItem('dp_c6_'+k); }catch{} } };
  const copy=v=>JSON.parse(JSON.stringify(v));
  // redraw the screen being looked at, unless a panel is open or something is being typed
  const busy=()=>document.getElementById('ov')?.classList.contains('show')||/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')||S.searching||document.body.classList.contains('dragging3');
  function redraw(action){ if(busy()) return;
    if(action==='leads'){ loadLeads().then(()=>{ if(busy()) return; if(S.tab==='leads') viewLeads(); else if(S.tab==='pipeline') viewPipeline(); }).catch(()=>{}); return; }
    if(action==='pipeline'&&S.tab==='pipeline') return viewPipeline();
    if(action==='overview'&&S.tab==='insights'){ S.ovFull=null; return viewInsights(); } }
  const orig=window.api;
  window.api=async function(action,body={},...rest){
    if(DEMO||!S.token) return orig.call(this,action,body,...rest);
    if(!READ6.has(action)){ wroteAt=Date.now(); try{ return await orig.call(this,action,body,...rest); } finally{ wroteAt=Date.now(); } }
    if(!SWR.has(action)) return orig.call(this,action,body,...rest);
    const k=key(action,body), c0=load(k), c=c0&&c0.at>wroteAt?c0:null;
    if(c&&Date.now()-(fetchedAt[k]||0)<1500) return copy(c.v);           // just fetched (the redraw reading it back): no second trip
    const net=orig.call(this,action,body,...rest).then(v=>{ const changed=!c||JSON.stringify(c.v)!==JSON.stringify(v); save(k,v); fetchedAt[k]=Date.now(); return {v,changed}; });
    if(c){ net.then(({changed})=>{ if(changed) redraw(action); }).catch(()=>{}); return copy(c.v); }
    const {v}=await net; return copy(v); };
  // fetch the other screens' answers once Calls has shown, then every 10 minutes while the app is open
  const warm=()=>{ if(DEMO||!S.token||document.visibilityState!=='visible') return; ['pipeline','overview'].forEach(a=>api(a).catch(()=>{}));
    api2('referrals').then(d=>{ S.ref=d; try{ localStorage.setItem('dp_c6_refs',JSON.stringify(d)); }catch{} }).catch(()=>{}); };
  const idle=f=>('requestIdleCallback' in window)?requestIdleCallback(f,{timeout:3000}):setTimeout(f,1500);
  setTimeout(()=>idle(warm),1200); setInterval(warm,10*60e3);
  // sign out clears the saved answers
  window.logout=(function(o){ return function(...a){ try{ Object.keys(localStorage).filter(x=>x.startsWith('dp_c6_')).forEach(x=>localStorage.removeItem(x)); }catch{} return o.apply(this,a); }; })(window.logout);
})();

// Solicitors stays in the Sellers, Landlords, Solicitors switch on every list (22 Nov): deceased estates are on the sellers list,
// so on Landlords the button used to vanish. Tapping it from Landlords switches to the sellers list's solicitor group.
function solN6(){ if(S.type==='seller') S.solN6=queue().filter(r=>!r.callback&&grp(r)===SOL_GROUP&&!r.today_outcome).length; return S.solN6||0; }   // left to call; kept from the sellers list while on Landlords
function solGo6(){ if(S.type!=='seller'){ S.type='seller'; S.lsub=SOL_GROUP; S.focusSub=SOL_GROUP; render(); } else { S.lsub=SOL_GROUP; drawList(); } }
// Solicitors sits in the Sellers, Landlords, Solicitors switch at the top of the rail (23 Nov: moved back up from Lists)

// ---------- One way to message someone (22 Nov) ----------
// The text icons used to open the phone's Messages with a blank text, and Send info was a separate button for the same job.
// Now every text icon opens the message sheet (ready made messages, edit, then text or copy), and Send info is gone.
function canText6(){ return /Android|iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent); }   // a computer without a Messages app shows an error instead
function whoByPhone6(ph,el){ const d=String(ph||'').replace(/\D/g,'').replace(/^61/,'0'), same=x=>String(x||'').replace(/\D/g,'').replace(/^61/,'0')===d;
  const lid=+(el&&(el.closest('[data-id]')?.dataset.id||((el.closest('.cd3')?.querySelector('.cn3')?.getAttribute('onclick')||'').match(/openLead\((\d+)\)/)||[])[1]))||(document.getElementById('sheet')?.contains(el)&&S.ol?S.ol.id:0);
  const l=(S.leads||[]).find(x=>x.id===lid&&same(x.phone))||(S.leads||[]).find(x=>same(x.phone));
  if(l) return {name:leadTitle(l),phone:l.phone,lead_id:l.id,property_id:l.property_id||null,lead:l};
  const r=[...(S.rows||[]),...(S.callbacks||[]),...(S.pipe||[])].find(x=>same(x.phone)||same(x.owner_phone));
  return r?{name:people(r.owner_name)[0]||'',phone:r.phone||r.owner_phone,property_id:r.property_id||null}:{name:'',phone:ph}; }
addEventListener('click',e=>{ const a=e.target.closest&&e.target.closest('a[href^="sms:"]'); if(!a||a.dataset.direct) return;
  if(document.getElementById('sheet')?.contains(a)&&/^Message /.test(document.querySelector('#sheet .sh2 b')?.textContent||'')) return;
  e.preventDefault(); e.stopPropagation(); const ph=decodeURIComponent(a.getAttribute('href').slice(4).split(/[?&]/)[0]); sendInfo(whoByPhone6(ph,a)); },true);
// the lead panel had both a Text button and Send info: Text opens the message sheet now, so Send info goes
window.openLead=(function(orig){ return function(...a){ const r=orig.apply(this,a); document.querySelectorAll('#sheet .snd2 button').forEach(b=>{ if(/Send info/.test(b.textContent)) b.remove(); }); return r; }; })(window.openLead);

// ── Import a file: PDF and Excel as well as CSV (22 Nov) ──
// A Dignam CRM "Detailed Contact Report" PDF is recognised on its own, whatever is picked in the list.
// Dignam CRM "Detailed Contact Report" PDF -> property rows. Same rules as parse_v7.py.
function crmPdfRecords(txt){
  const HEADER=/Name\s+Details\s+Contact\s+Related\s+Contacts\s+Related\s+Properties\s+Requirements\s+Notes\s+Record\s+Details/i;
  const TAIL=/Last\s+Modified:\s*\d{1,2}\s+\w{3,9}\s+\d{4}/ig, PRINT=/Print this Page/ig;
  const FURN=/Printed by:|Print Date:|Detailed Contact Report|Marlowe Richards|\d{1,2}-\w{3}-\d{4}|Contact report is ready.*/ig;
  const ADDR=/\[Address\]:\s*([\s\S]+?)(?:\[Postal\]|\[E\]|\[M\]|\[H\]|\[W\]|Spouse:|\?:|Buyer:|For Sale:|For Lease:|Owner Occupier|Owner:|Tenant:|Last 3 notes|Comments:|Primary\s+Owner|First\s+Created|Full\s+Access|$)/i;
  const PHONE=/\[([MHW])\]:\s*(0\d[\d \-]{6,})/g, ws=s=>String(s||'').replace(/\s+/g,' ').trim();
  const addr=a=>{ a=ws(a); const parts=a.split(',').map(p=>p.trim()).filter(Boolean); if(parts.length<2) return null;
    const pc=(a.match(/\b(2\d{3})\b/)||[])[1]||''; const drop=new Set(['australia','nsw','act','qld','vic','wa','sa','tas','nt']);
    const core=parts.filter(p=>!drop.has(p.toLowerCase())&&!/^2\d{3}$/.test(p)); if(core.length<2) return null;
    let unit='',house='',street=core[0]; const suburb=core[1];
    const hm=core[0].match(/^\s*([0-9]+[A-Za-z]?(?:\/[0-9]+[A-Za-z]?)?|[0-9]+-[0-9]+)\s+(.+)/); if(hm){ house=hm[1]; street=hm[2].trim(); }
    if(house.includes('/')) [unit,house]=house.split('/');
    if(street.length<2||suburb.length<2||suburb.length>30||/\d/.test(suburb)) return null;
    return {unit,house_number:house,street,suburb,postcode:pc}; };
  const name=src=>{ let cut=0; for(const re of [TAIL,PRINT]){ re.lastIndex=0; let m; while((m=re.exec(src))) cut=Math.max(cut,m.index+m[0].length); }
    const h=[...src.matchAll(new RegExp(HEADER.source,'ig'))].pop(); if(h) cut=Math.max(cut,h.index+h[0].length);
    let s=ws(src.slice(cut).replace(FURN,' ')).split('(')[0].replace(/^[ ,\-]+|[ ,\-]+$/g,'');
    return s.length<2||s.length>55||!/[A-Za-z]/.test(s)?'':s; };
  const pieces=txt.split('Status:'), out=[];
  for(let k=0;k<pieces.length-1;k++){ let body=pieces[k+1]; const hb=body.search(HEADER); if(hb>=0) body=body.slice(0,hb);
    const ma=body.match(ADDR); if(!ma) continue; const ad=addr(ma[1]); if(!ad) continue;
    const ph=[]; for(const m of body.matchAll(PHONE)){ const d=m[2].replace(/\D/g,''); if(d.length>=8&&d.length<=10&&!ph.includes(d)) ph.push(d); }
    out.push({...ad,owner_name:name(pieces[k]),phone:ph[0]||'',phone2:ph[1]||'',crm_flag:true}); }
  return {rows:out,records:pieces.length-1}; }
async function pdfText(pdfjs,data,onPage){ const doc=await pdfjs.getDocument({data}).promise; let t='';
  for(let p=1;p<=doc.numPages;p++){ const tc=await (await doc.getPage(p)).getTextContent();
    for(const it of tc.items){ t+=it.str+(it.hasEOL?'\n':''); } t+='\n'; onPage&&onPage(p,doc.numPages); } try{ await doc.destroy(); }catch(e){} return t; }

window.previewCSV=(function(orig){ return async function(){
  const f=$("#if")&&$("#if").files[0]; if(!f) return;
  const pdf=/\.pdf$/i.test(f.name)||f.type==="application/pdf", xl=/\.xlsx?$/i.test(f.name);
  if(!pdf&&!xl) return orig();
  const ir=$("#ir"); ir.textContent="Reading…";
  try{
    let rows;
    if(pdf){
      const pdfjs=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';
      const txt=await pdfText(pdfjs,new Uint8Array(await f.arrayBuffer()),(p,n)=>{ if(p%10===0||p===n) ir.textContent=`Reading page ${p} of ${n}…`; });
      if(/Detailed Contact Report|Related\s+Properties/i.test(txt)&&/\[Address\]:/.test(txt)){
        const r=crmPdfRecords(txt); S.pending=r.rows; $("#ik").value="crm";
        const wp=r.rows.filter(x=>x.phone).length, ex=r.rows[0];
        ir.innerHTML=r.rows.length?`<b>Dignam CRM contact report. ${r.rows.length.toLocaleString()} ${r.rows.length===1?'house':'houses'} found, ${wp.toLocaleString()} with a number.</b><br>${(r.records-r.rows.length).toLocaleString()} contacts skipped with no street address.<br>First one reads as: ${esc([ex.unit&&ex.unit+"/",ex.house_number," ",ex.street,", ",ex.suburb," · ",ex.owner_name," · ",ex.phone].join("").replace(/\s+/g," "))}<br>Tap Import.`:"No addresses found in that report.";
        return; }
      const fake={name:f.name,type:f.type,arrayBuffer:async()=>new Uint8Array(await f.arrayBuffer()).buffer};
      rows=await pdfRows(fake);
    } else {
      const X=await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs'); const wb=X.read(await f.arrayBuffer(),{cellDates:true});
      rows=X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:false,defval:''}).map(r=>r.map(c=>String(c??'')));
    }
    const hi=rows.findIndex(r=>r.filter(c=>String(c).trim()).length>=3); if(hi>0) rows=rows.slice(hi);
    if(rows.length<2){ ir.textContent="Couldn't find a table in that file. Export it from the CRM as CSV or Excel instead."; return; }
    const {out,col}=mapRows(rows); S.pending=out;
    const ok=out.filter(o=>o.street||$("#ik").value==="dncr").length;
    ir.innerHTML=`<b>${out.length.toLocaleString()} rows found, ${ok.toLocaleString()} with a usable address.</b><br>Matched columns: ${esc(Object.entries(col).map(([k,i])=>rows[0][i].trim()+" → "+k.replace(/_/g," ")).join(" · ")||"none")}`;
  }catch(e){ S.pending=null; ir.textContent="Couldn't read that file. "+e.message; }
}; })(window.previewCSV);

// Leads with two numbers in the phone field: call and text the first, and give the second its own call button (22 Nov)
window.smsLink=function(phone,body){ return `sms:${telOf(phone)}${/iPhone|iPad/.test(navigator.userAgent)?"&":"?"}body=${encodeURIComponent(body)}`; };
window.openLead=(function(orig){ return function(id,opts){ const r=orig(id,opts);
  try{ const l=(S.leads||[]).find(x=>x.id===id), c=document.querySelector('#sheet .lcta'); const ps=l?phList(l.phone):[];
    if(c&&ps.length){ const a=c.querySelector('a.call'); const tg=[...String(l.phone||'').matchAll(/(\d[\d\s-]{7,}\d)\s*\(([A-Za-z])\)/g)].map(m=>m[2].toUpperCase()), nm=inis7(names7(l.name),ps.length).map(x=>x[0]); const ii=ps.length>1?(tg.length===ps.length&&tg.every(t=>nm.includes(t))?tg:inis7(names7(l.name),ps.length)):[]; if(a){ a.href='tel:'+ps[0]; a.innerHTML=a.innerHTML.replace(/Call .*$/,(ps.length>1?ini7(ii[0]):'Call ')+esc(fmtOne2(ps[0]))); }
      if(ps.length>1) c.classList.add('two6'); if(ps.length>1&&!c.querySelector('.call2')) c.querySelector('a.call').insertAdjacentHTML('afterend',ps.slice(1).map((p,k)=>`<a class="call call2" href="tel:${p}" aria-label="Call ${esc(fmtOne2(p))}"><i class="ti ti-phone"></i>${ini7(ii[k+1])}${esc(fmtOne2(p))}</a>`).join('')); } }catch(e){}
  return r; }; })(window.openLead);

// Keep an open app on the newest version (22 Nov): fixes were going live but a tab left open all day kept running the old code.
(function(){ const mine=+(([...document.scripts].map(x=>x.src).join(' ').match(/v2\.js\?v=(\d+)/)||[])[1]||0); if(!mine||window.DEMO_ON&&location.hostname==='localhost') return;
  let busy=false; const check=async()=>{ if(busy||document.hidden) return; busy=true;
    try{ const t=await (await fetch(location.pathname+'?vc='+Date.now(),{cache:'no-store'})).text(); const v=+((t.match(/v2\.js\?v=(\d+)/)||[])[1]||0);
      if(v>mine){ const typing=document.activeElement&&/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName), open=document.querySelector('#ov.show');
        if(!typing&&!open) location.reload(); else if(!document.querySelector('.upd6')) document.body.insertAdjacentHTML('beforeend','<button class="upd6" onclick="location.reload()">New version ready. Tap to update</button>'); } }catch(e){}
    busy=false; };
  document.addEventListener('visibilitychange',check); setInterval(check,10*60*1000); })();

// Import many files or a whole folder at once (22 Nov). Every file is read in turn and the rows go up as one import.
async function pdfjs6(){ const p=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs'); p.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs'; return p; }
async function readOne6(f,say){
  if(/\.pdf$/i.test(f.name)||f.type==='application/pdf'){
    const txt=await pdfText(await pdfjs6(),new Uint8Array(await f.arrayBuffer()),(p,n)=>{ if(p%20===0||p===n) say(`page ${p} of ${n}`); });
    if(/Detailed Contact Report|Related\s+Properties/i.test(txt)&&/\[Address\]:/.test(txt)){ const r=crmPdfRecords(txt); return {rows:r.rows,crm:true}; }
    const fake={name:f.name,type:f.type,arrayBuffer:async()=>new Uint8Array(await f.arrayBuffer()).buffer}; return {rows:tab6(await pdfRows(fake))}; }
  if(/\.xlsx?$/i.test(f.name)){ const X=await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs'); const wb=X.read(await f.arrayBuffer(),{cellDates:true});
    return {rows:tab6(X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:false,defval:''}).map(r=>r.map(c=>String(c??''))))}; }
  if(/\.csv$/i.test(f.name)) return {rows:tab6(parseCSV(await f.text()))};
  return {rows:[],skip:true}; }
function tab6(rows){ const hi=rows.findIndex(r=>r.filter(c=>String(c).trim()).length>=3); if(hi>0) rows=rows.slice(hi); return rows.length<2?[]:mapRows(rows).out; }
window.previewCSV=(function(orig){ return async function(){
  const files=S.impDir||[...(($("#if")||{}).files||[])];
  if(files.length<2||$("#ik").value==="crm_notes"){ if(S.impDir&&files.length===1){ const dt=new DataTransfer(); dt.items.add(files[0]); $("#if").files=dt.files; S.impDir=null; } return orig(); }
  const ir=$("#ir"), list=files.filter(f=>/\.(pdf|csv|xlsx?)$/i.test(f.name)).sort((a,b)=>a.name.localeCompare(b.name));
  if(!list.length){ ir.textContent="No PDF, CSV or Excel files in that folder."; return; }
  const all=[], seen=new Set(), per=[]; let crm=0;
  for(const [i,f] of list.entries()){ const nm=f.name.replace(/\.[^.]+$/,'').replace(/^Contact Report\s*-?\s*/i,'')||f.name;
    const say=t=>{ ir.textContent=`Reading ${i+1} of ${list.length}: ${nm}${t?', '+t:''}…`; }; say('');
    try{ const r=await readOne6(f,say); if(r.crm) crm++;
      let n=0; for(const o of r.rows){ const k=[o.unit,o.house_number,o.street,o.suburb].join('|').toLowerCase(); if(o.street&&seen.has(k)) continue; seen.add(k); all.push(o); n++; }
      per.push(`${esc(nm)} ${n.toLocaleString()}`); }
    catch(e){ per.push(`${esc(nm)}: couldn't read`); } }
  if(crm) $("#ik").value="crm";
  S.pending=all;
  const wp=all.filter(x=>x.phone).length;
  ir.innerHTML=`<b>${list.length} files, ${all.length.toLocaleString()} houses, ${wp.toLocaleString()} with a number.</b><br>${per.join(' · ')}<br>Tap Import.`;
}; })(window.previewCSV);
window.importCSV=(function(orig){ return async function(){ const r=await orig(); if(!S.pending) S.impDir=null; return r; }; })(window.importCSV);
// Notes sit together (23 Nov): the entries, oldest to newest, with the box to write the next one right under them
function notesBlock7(l){ const ns=(l.notes||[]).slice().sort((a,b)=>String(a.at).localeCompare(String(b.at)));
  const when=n=>{ const d=new Date(n.at); return isNaN(d)?'':d.toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',day:'numeric',month:'short',year:d.getFullYear()===new Date().getFullYear()?undefined:'numeric'}); };
  const one=n=>`<li class="nt7"><time>${esc(when(n))}</time><p>${esc(n.body)}</p></li>`;
  const old=ns.slice(0,Math.max(0,ns.length-3)), recent=ns.slice(-3);
  return `<div class="nb7"><div class="nh7">Notes${ns.length?`<span>${ns.length}</span>`:''}</div>${old.length?`<button class="nmore7" onclick="this.nextElementSibling.hidden=false;this.remove()">Show ${old.length} earlier note${old.length>1?'s':''}</button><ol class="nl7" hidden>${old.map(one).join('')}</ol>`:''}<ol class="nl7">${recent.map(one).join('')}</ol></div>`; }
window.openLead=(function(orig){ return function(id,opts){ const r=orig(id,opts);
  try{ const l=(S.leads||[]).find(x=>x.id===id), ta=document.getElementById('ln_body'); if(!l||!ta) return r;
    document.querySelectorAll('#sheet .lsec.tight').forEach(s=>{ if(s.firstElementChild&&s.firstElementChild.textContent.trim()==='Notes') s.remove(); });
    if(!document.querySelector('#sheet .nb7')){ ta.insertAdjacentHTML('beforebegin',notesBlock7(l)); const nb=document.querySelector('#sheet .nb7'); nb.appendChild(ta); ta.placeholder=(l.notes||[]).length?'Add a note':'What did they say?'; }
  }catch(e){}
  return r; }; })(window.openLead);
// Address search (23 Nov): "9/18 spinks rd" means unit 9, number 18, Spinks Road. Only that building shows, the exact home first.
const ABR7={rd:'road',st:'street',ave:'avenue',av:'avenue',dr:'drive',cl:'close',cr:'crescent',cres:'crescent',pde:'parade',pl:'place',hwy:'highway',tce:'terrace',ct:'court',ln:'lane',gr:'grove',cct:'circuit',bvd:'boulevard',blvd:'boulevard',esp:'esplanade',wy:'way',sq:'square',mt:'mount'};
const nw7=s=>String(s||'').toLowerCase().replace(/[^a-z0-9\/ ]/g,' ').split(/\s+/).filter(Boolean).map(w=>ABR7[w]||w);
function addrQ7(q){ const m=String(q).trim().toLowerCase().match(/^(?:(?:unit|u|apt|flat)\s*)?(?:([0-9]+[a-z]?)\s*\/\s*)?([0-9]+[a-z]?)\s+([a-z].*)$/); if(!m) return null; const words=nw7(m[3]); return words.length?{unit:m[1]||'',no:m[2],words}:null; }
function addrSplit7(a){ const m=String(a||'').trim().toLowerCase().match(/^(?:([0-9a-z]+)\s*\/\s*)?([0-9]+[a-z]?)\s+(.*)$/); return m?{unit:m[1]||'',no:m[2],street:m[3]}:null; }
// score: 0 the exact home, 1 same building, null not this address
function addrScore7(A,addr,suburb){ const p=addrSplit7(addr); if(!p||p.no!==A.no) return null; const hay=nw7(p.street+' '+(suburb||''));
  if(!A.words.every(w=>hay.some(h=>h.startsWith(w)))) return null; return A.unit?(p.unit===A.unit?0:1):(p.unit?1:0); }
function addrRank7(q,res,calls){ const A=addrQ7(q); if(!A) return null;
  const rank=(xs,ad,sb)=>xs.map(x=>[x,addrScore7(A,ad(x),sb(x))]).filter(z=>z[1]!==null).sort((a,b)=>a[1]-b[1]||String(ad(a[0])).localeCompare(String(ad(b[0])),'en',{numeric:true})).map(z=>z[0]);
  const props=rank(res.props||[],p=>p.street_address,p=>p.suburb), cl=rank(calls,r=>r.street_address,r=>r.suburb);
  const leads=(res.leads||[]).filter(l=>addrScore7(A,l.address,l.suburb)!==null);
  const exact=[...props,...cl].some(x=>addrScore7(A,x.street_address,x.suburb)===0)||leads.some(l=>addrScore7(A,l.address,l.suburb)===0);
  const any=props[0]||cl[0]; const street=any?addrSplit7(any.street_address).street:'';
  const label=((A.unit?A.unit+'/':'')+A.no+' '+(street||A.words.join(' '))).replace(/\b[a-z]/g,c=>c.toUpperCase());
  return {props,calls:cl,leads,exact,label,suburb:any?any.suburb:''}; }
function addMissing7(addr,sub){ addPerson2(); setTimeout(()=>{ const a=$('#ap_addr'),s=$('#ap_sub'); if(a) a.value=addr; if(s&&sub) s.value=sub; $('#ap_name')?.focus(); },60); }
// Import status (23 Nov): the lines of text under Import a file become a loading animation, then a short result.
// Every reader still writes its message into #ir; this turns that message into the display.
(function(){
  const num=s=>+String(s||'0').replace(/[^0-9]/g,'')||0, fmt=n=>n.toLocaleString();
  function view(el){
    const raw=el.dataset.raw||'', txt=raw.replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'').trim(), out=el.nextElementSibling;
    if(!out||!out.classList.contains('imp8')) return;
    let m, h='';
    const bar=(label,p)=>`<div class="imp8l"><span class="sp8" aria-hidden="true"></span><b>${esc(label)}</b>${p!=null?`<em>${Math.round(p*100)}%</em>`:''}</div><div class="pb8${p==null?' ind':''}"><i style="width:${p==null?40:Math.max(3,p*100)}%"></i></div>`;
    if(!txt){ out.hidden=true; out.innerHTML=''; return; }
    if((m=txt.match(/Imported ([\d,]+) of ([\d,]+)/))){ const a=num(m[1]),b=num(m[2]); h=bar(a>=b?'Finishing':'Importing',b?a/b:null); }
    else if(/^Reading/.test(txt)){ m=txt.match(/Reading (\d+) of (\d+)/)||txt.match(/page (\d+) of (\d+)/); h=bar('Reading',m?num(m[1])/num(m[2]):null); }
    else if((m=txt.match(/^([\d,]+) files, ([\d,]+) houses, ([\d,]+) with a number/))) h=done(num(m[2]),'houses',num(m[3]),`from ${m[1]} files`);
    else if((m=txt.match(/([\d,]+) (?:house|houses) found, ([\d,]+) with a number/))) h=done(num(m[1]),'houses',num(m[2]));
    else if((m=txt.match(/^([\d,]+) rows found, ([\d,]+) with a usable address/))) h=done(num(m[2]),'ready to import',null,num(m[1])>num(m[2])?`${fmt(num(m[1])-num(m[2]))} without an address`:'');
    else if((m=txt.match(/^([\d,]+) notes found/))) h=done(num(m[1]),'notes');
    else h=`<div class="imp8e">${esc(txt.split('\n')[0])}</div>`;
    out.innerHTML=h; out.hidden=false;
  }
  function done(n,what,ph,extra){ return `<div class="imp8d"><span class="ok8" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><div><b>${fmt(n)}</b> ${esc(what)}${ph!=null?`<span>${fmt(ph)} with a number</span>`:''}${extra?`<span>${esc(extra)}</span>`:''}</div></div>`; }
  function wire(){
    const el=document.getElementById('ir'); if(!el||el.dataset.w8) return; el.dataset.w8=1;
    el.insertAdjacentHTML('afterend','<div class="imp8" hidden aria-live="polite"></div>'); el.classList.add('irsrc8');
    new MutationObserver(()=>{ el.dataset.raw=el.innerHTML; view(el); }).observe(el,{childList:true,characterData:true,subtree:true});
  }
  window.setImport=(function(o){ return function(...a){ const r=o(...a); wire(); return r; }; })(window.setImport);
  // the Import button spins while rows go up
  window.importCSV=(function(o){ return async function(...a){ const b=document.querySelector('#sheet .wide2b'); if(b){ b.disabled=true; b.classList.add('busy8'); }
    try{ const r=await o(...a); const el=document.getElementById('ir'), out=el&&el.nextElementSibling, m=el&&el.textContent.match(/Imported ([\d,]+) of [\d,]+$/);
      if(out&&m&&!S.pending) out.innerHTML=done(num(m[1]),'imported');
      return r; } finally{ if(b){ b.disabled=false; b.classList.remove('busy8'); } } }; })(window.importCSV);
})();
// Reload keeps you where you were (23 Nov): the open tab is remembered for this window and reopened after a refresh.
(function(){
  const KEY='dp_tab8', ok=t=>TABS2.some(x=>x[0]===t)||t==='messages';
  window.go=(function(o){ return function(t,...a){ const r=o(t,...a); try{ sessionStorage.setItem(KEY,JSON.stringify({tab:S.tab,pst:S.pst||null})); }catch(e){} return r; }; })(window.go);
  try{ const s=JSON.parse(sessionStorage.getItem(KEY)||'null');
    if(s&&ok(s.tab)&&s.tab!=='calls'&&S.token&&S.token!=='demo'){ S.tab=s.tab; if(s.pst) S.pst=s.pst; document.body.classList.toggle('dwide',s.tab==='drops'); } }catch(e){}
})();

// What they want to buy (23 Nov): an X closes the editor if it was opened by mistake
function closeWants8(){ const e=document.getElementById('weditor'); if(e) e.hidden=true;
  const v=document.getElementById('wview_box'), b=readBuy(); if(v){ v.innerHTML=wantsView(b); v.hidden=!hasCriteria(b); }
  document.querySelectorAll('#sheet [onclick*="editWants(true)"]').forEach(x=>{ if(x.style.display==='none') x.style.display=''; }); }
window.openLead=(function(o){ return function(...a){ const r=o(...a);
  try{ const w=document.querySelector('#weditor .wlabel'); if(w&&!w.querySelector('.wx8')) w.insertAdjacentHTML('beforeend','<button type="button" class="wx8" onclick="closeWants8()" aria-label="Close" title="Close"><i class="ti ti-x"></i></button>'); }catch(e){}
  return r; }; })(window.openLead);

// Unit searches (23 Nov): ask for the exact unit and for the whole building, then merge, so the unit is never cut off a big block
async function searchApi7(q){ const A=addrQ7(q); if(!A||!A.unit) return api('search',{q});
  const [a,b]=await Promise.all([api('search',{q:A.unit+'/'+A.no+' '+A.words.join(' ')}),api('search',{q:A.no+' '+A.words.join(' ')})]);
  const u=(x,y,k)=>[...(x||[]),...(y||[])].filter((r,i,arr)=>arr.findIndex(z=>z[k]===r[k])===i);
  return {...b,props:u(a.props,b.props,'id'),leads:u(a.leads,b.leads,'id'),listings:u(a.listings,b.listings,'id')}; }

