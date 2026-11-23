// ---------- calls ----------
function paintCalls(){ drawProg(); drawList(); keepAwake(); }
function drawProg(){
  const ov=S.ov; if(!ov) return; const tg=ov.settings?.daily_target||100, c=ov.today_calls||0, a=ov.today_appraisals||0, cn=ov.today_connected||0, pace=livePace();
  const pl=S.view!=='list'&&S.progLine?`<div class="pl2"><b>${S.progLine.here}</b><span>left in ${esc(S.progLine.sub)}</span></div><div class="pl2"><b>${S.progLine.total}</b><span>to go</span></div><i class="tsep"></i>`:'';
  const t=$("#tstats"); if(t) t.innerHTML=pl+`<div><b>${c}</b><span>/ ${tg} calls</span></div><div><b>${cn}</b><span>connected</span></div><div><b style="color:var(--ok)">${a}</b><span>appraisals</span></div>${pace?`<div><b>${pace}</b><span>an hour</span></div>`:''}`;
  const p=$("#pstats"); if(p) p.innerHTML=`<span><b>${c}</b> / ${tg}</span><span><b style="color:var(--ok)">${a}</b> appr</span>`;
}
// The call screen stays inside the group you started from (a suburb, a call sheet, Solicitors or Call backs) and never moves on to another one
function grpOf(r){ return r.callback?'Call backs':(grp(r)||'Suburb unknown'); }
function callQ(){ const all=queue(), f=S.lsub||S.focusSub; if(!f) return all; const g=all.filter(r=>grpOf(r)===f); return g.length||f===S.focusSub?g:all; }
function curCall(){ const all=callQ(); if(S.pick){ const p=all.find(r=>r.property_id===S.pick); if(p) return p; S.pick=null; } return all.find(r=>!r.today_outcome&&!S.skipped.has(r.property_id)); }
function drawList(){ if(S.tab!=='calls'||S.searching||!$("#main")) return; $("#main").className='v2main'; if(S.view==='list') return drawList2(); drawCall2(); }
function hoursStrip(){ return ''; // outside hours is now a warning when you tap call, not a banner
  if(callingAllowed()) return ''; return `<div class="hline2">${ic2('clock',16)}Outside legal calling hours. Next window ${nextWindowText()}. Only call if they asked you to call at this time.</div>`; }
function failStrip(){ return ''; }   // the overnight job warning is not shown
function barHTML2(id,small){ return `<div class="bar2x">${OUT2.map(o=>`<button style="--c:${o.bg}" onclick="act2(${id},'${o.o}')" ${small?`onmousedown="event.preventDefault()" aria-label="${o.lab}"`:''}>${ic2(o.icon,small?18:20)}${small?`<span class="sl3">${o.lab}</span>`:`<span>${o.lab}</span><span class="k">${o.key}</span>`}</button>`).join('')}</div>`; }
function setNote(id,v){ if(v.trim()) notes[id]=v; else delete notes[id]; document.querySelectorAll('.nsaved').forEach(x=>x.textContent=v.trim()?'· saved':''); document.querySelectorAll('textarea[data-note]').forEach(t=>{ if(t!==document.activeElement) t.value=v; }); }
function numBtn(r,cls){
  const id=r.property_id, probate=(r.signals||[]).includes('probate');
  if(probate&&!(r.solicitor&&r.phone)) return `<button class="${cls} sol" onclick="addSolicitor(${id})">${ic2('plus',24,'#fff')}<span style="flex:1;font-size:.7em">Add solicitor's number</span></button>`;
  if(!r.phone) return `<div class="${cls} sol" style="opacity:.6;font-size:.7em">No phone number yet</div>`;
  return `<a class="${cls}${probate?' sol':''}" href="tel:${esc(telOf(r.phone))}" onclick="if(!hoursOk(event))return false;markDial(${id})">${ic2('phone',cls==='num2'?30:24,'#fff')}<span style="${cls==='num2'?'flex:1':''}">${probate?'Solicitor ':''}${esc(fmtPh2(r.phone))}</span>${cls==='num2'?'<span class="key2">C</span>':''}</a>`;
}
function warnBox(r,ph){
  const probate=(r.signals||[]).includes('probate'), sol=(r.reasons||[]).find(x=>x.startsWith('Probate notice ('));
  let w='';
  if(r.today_outcome){ const tc=(r.history||[]).find(h=>h.id&&h.outcome===r.today_outcome);
    w+=`<div class="warn2" style="color:#5ee08f;background:#16a34a1a;border-color:#16a34a55;align-items:center">${ic2('check',18)}<div style="flex:1"><b>Called today:</b> ${esc(LABEL[r.today_outcome]||r.today_outcome)}</div>${tc?`<button class="b2" style="height:36px" onclick="undoToday(${r.property_id},${tc.id})">Change result</button>`:''}</div>`; }
  return w;
}
// Extra facts from NSW government data (land values, planning maps, certificates, rental bonds)
function extraRows(r){
  const e=r.extra||{}, out=[], yr=d=>d?String(d).slice(0,4):'', mon=d=>{ const x=new Date(String(d).slice(0,10)+'T12:00:00Z'); return isNaN(x)?'':x.toLocaleString('en-AU',{month:'short',year:'numeric',timeZone:'UTC'}); };
  if(e.lv){ const ch=e.lv_old&&e.lv_old!==e.lv?Math.round((e.lv/e.lv_old-1)*100):null;
    out.push(['Land value',price2(e.lv),ch!=null?`${ch>=0?'+':''}${ch}% since ${yr(e.lv_old_d)}`:'',ch>0]); }
  if(e.area) out.push(['Block',`${Math.round(e.area).toLocaleString()} m²`,e.split?`could be split, min ${e.min_lot} m²`:(e.zone?'zoned '+String(e.zone).split(' ')[0]:''),!!e.split]);
  if(e.rent) out.push(['Rent guide',`$${e.rent}/wk`,`${e.rent_beds&&/^\d$/.test(e.rent_beds)?e.rent_beds+' bed ':''}${/^\d+\//.test(r.street_address||'')?'units':'houses'} nearby`,false]);
  if(e.cdc){ const w=String(e.cdc.what||'').split(';')[0].trim()||'Building work';
    out.push([w,mon(e.cdc.d),/approv|determin|issued/i.test(e.cdc.status||'')?'approved':String(e.cdc.status||'lodged').toLowerCase(),true]); }
  if(e.lease) out.splice(1,0,['Rental','Rented out',`leased through ${e.lease}`,true]);
  if(e.heritage&&out.length<4) out.push(['Heritage','Yes',String(e.heritage).slice(0,30),false]);
  return out.length?`<div class="xg2">${out.slice(0,4).map(([l,v,s,hot])=>`<div class="xr2"><span>${esc(l)}</span><b>${esc(v)}</b>${s?`<em class="${hot?'hot':''}">${esc(s)}</em>`:''}</div>`).join('')}</div>`:'';
}
function drawCall2(){
  const all=callQ();
  if(!S.rows.length&&!all.length){ $("#main").innerHTML=`<div class="empty2">${ic2('search',30)}<b>No list yet for today</b>It builds itself at 4:30am. To build it now, go to Settings.</div>`; return; }
  const r=curCall();
  if(!r){ $("#main").innerHTML=hoursStrip()+`<div class="empty2">${ic2('check',30,'var(--ok)')}<b>${(()=>{ const f=S.lsub||S.focusSub; return f&&(f===S.focusSub||queue().some(x=>grpOf(x)===f))?`That's everyone in ${esc(f)}`:"That's everyone for today"; })()}</b>${S.skipped.size?`<button class="b2" onclick="S.skipped.clear();drawList()">Go back to ${S.skipped.size} skipped</button>`:''}<button class="b2" onclick="setView('list')">Open the list</button></div>`; return; }
  const id=r.property_id, R=reasonOf(r), note=notes[id]||'', ppl=people(r.owner_name), nm=ppl[0]||'Owner unknown';
  const addr=`${esc(r.street_address||'')}${r.suburb?', '+esc(r.suburb):''}`, rpu=r.street_address||r.suburb?rpUrl(r.street_address,r.suburb,r.rp_link,r.postcode):null;
  const yrs=yrsSince(r.last_sale_date), why=whyRows(r), hist=histRows(r), g=callGroups(r);
  const left=all.filter(x=>!x.today_outcome&&!S.skipped.has(x.property_id));
  const hasRooms=r.bedrooms>0||r.baths>0||r.cars>0;
  const attrs=[['bed',r.bedrooms>0?r.bedrooms:'?','Bedrooms'],['bath',r.baths>0?r.baths:'?','Bathrooms'],['car',r.cars>0?r.cars:(r.cars===0?0:'?'),'Car spaces'],yrs!=null?['clock',yrs+' years','Owned']:['tag',r.last_sale_price?price2(r.last_sale_price):'?','Last bought']];
  // A plain long hold isn't shown here: the years owned already sit beside the photo
  // No reason tags on the call screen: the reasons are listed in "Why they are on the list"
  const tag=true?'':`<div class="tag2" style="border-color:${R.c}77"><div class="s" style="background:${R.c}">${ic2(R.icon,26,'#fff')}${R.side}</div><div class="m" style="background:${R.c}1a"><b>${esc(R.head)}</b>${R.sub?`<span style="color:${R.t}">${esc(R.sub)}</span>`:''}</div></div>`;
  const tl=timeline(r), t0=tl[0], lastRow=t0?(t0.mine?(()=>{ const k=OC2[t0.o]||OC2.no_answer; return row2(k[0],k[2],`${LABEL[t0.o]||t0.o}${t0.n>1?' ×'+t0.n:''}, ${dayMonLong(t0.at)}`,`${tl.length} interaction${tl.length>1?'s':''} with Dignam`,chev2(),`details2(${id},'calls')`); })()
    :row2('#6366f1','msg',`${esc(t0.who||'Dignam')}, ${t0.at?monYear(t0.at.slice(0,10)):'no date'}`,`${tl.length} interaction${tl.length>1?'s':''} with Dignam`,chev2(),`details2(${id},'calls')`))
    :row2('#4b5565','phone',r.callback&&r.notes?'Call back note':'Not contacted','',chev2(),`details2(${id},'calls')`);
  const bought=hist.find(h=>h.lab==='Bought');
  const icons=[['bed',r.bedrooms>0?r.bedrooms:'?'],['bath',r.baths>0?r.baths:'?'],['car',r.cars>0?r.cars:(r.cars===0?0:'?')],yrs!=null?['clock',yrs+' yrs']:null].filter(Boolean);
  S.progLine={sub:r.callback?'call backs':(grp(r)===SOL_GROUP?'solicitors':(r.suburb||'')),here:r.callback?left.filter(x=>x.callback).length:left.filter(x=>!x.callback&&grp(x)===grp(r)).length,total:left.length};
  drawProg();
  $("#main").innerHTML=failStrip()+hoursStrip()+`
  <div class="call2">
   <section class="cl2">
    <div><h1 class="nm2">${esc(nm)}</h1>${ppl.length>1?`<div class="also2">Also on file: ${ppl.slice(1).map(esc).join(', ')}</div>`:''}<button class="ad2 cp2" onclick="copyAddr(${id})" title="Copy address for RP Data">${ic2('pin',21)}<span>${addr}</span><span class="cpl" title="Copy address" aria-label="Copy address">${COPYIC5}</span></button>${dignamLine(r)}</div>
    ${tag}${warnBox(r)}
    ${numBtn(r,'num2')}
    ${why.length?`<div class="whyl2"><div class="wl2" style="grid-template-columns:repeat(${Math.min(why.length,4)},minmax(0,1fr))">${why.slice(0,4).map(([i,t,l])=>`<div class="wc2" style="--c:${RC2[i]||LVL2[l][0]};--t:${LVL2[l][1]}"><span class="ti2">${ic2(i,18,'#fff')}</span><span><b>${esc(t)}</b><em>${LVW6[l]||l}</em></span></div>`).join('')}</div></div>`:''}
    <label class="nw2"><span class="h"><span class="lab2">Note <span class="nsaved" style="font-weight:600;color:var(--t3)">${note?'· saved':''}</span></span><span class="kb2">N</span></span>
     <textarea class="note2" id="note2" data-note placeholder="Type while you talk" oninput="setNote(${id},this.value)">${esc(note)}</textarea></label>
    ${barHTML2(id)}
    <div class="ends2"><button onclick="skip2(${id})">${ic2('skip',16)}Skip<span class="k kb2">S</span></button><button onclick="moreSheet2(${id})">${ic2('more',16)}More<span class="k kb2">M</span></button></div>
   </section>
   <section class="cr2">
    <div class="prop2"><div class="pcol2">${photo2(r,(r.extra&&Object.keys(r.extra).length?'height:clamp(140px,22vh,280px)':'height:clamp(170px,30vh,320px)')+';cursor:zoom-in',true,desk2()).replace('class="photo2"',`class="photo2" onclick="if(!event.target.closest('.sv'))bigPhoto(${id})"`)}${extraRows(r)}</div>
     <div class="sales2"><span class="lab2">Sales history</span>${hist.length?hist.map((h,j)=>`<div class="tl2"><div class="d"><i style="background:${h.col};box-shadow:0 0 0 3px ${h.col}33"></i>${j<hist.length-1?'<u></u>':''}</div><div><div class="tlh2"><b>${h.lab}</b>${h.val?`<em style="color:${h.col==='#9ba4b2'?'var(--t1)':h.col}">${h.val}</em>`:''}</div><small>${esc(h.when)}${h.gain?` <span class="gain2 ${h.gain[0]==='+'?'up':'dn'}">${esc(h.gain)}</span>`:''}</small>${h.agency?`<small class="agy2">Sold through ${esc(h.agency)}</small>`:''}</div></div>`).join(''):'<p class="emptyline" style="margin:0">No sales on record</p>'}</div></div>
    <div class="calls2"><span class="lab2">Calls and Dignam history</span>${callCards2(r)}</div>
    <div class="facts2">${attrs.map(([i,v,l])=>`<div class="attr2">${ic2(i,22,'var(--t2)')}<div><b>${esc(v)}</b><span>${l}</span></div></div>`).join('')}</div>
   </section>
  </div>
  <div class="pcall2">
   <div class="pb2">
    <div class="ptyp2" style="align-items:center;gap:12px;flex:none;padding-bottom:4px">${photo2(r,'width:44px;height:44px;border-radius:11px',false,!desk2())}<div style="min-width:0"><b style="font-size:20px;display:block">${esc(nm)}</b><span style="font-size:14px;color:var(--t2)">${addr}</span></div></div>
    <div class="pid2"><div class="pidr2">${photo2(r,'',false,!desk2()).replace('class="photo2"',`class="photo2" onclick="bigPhoto(${id})"`)}<div style="min-width:0"><h1>${esc(nm)}</h1><button class="a cp2" onclick="copyAddr(${id})">${addr}<span class="cpl" title="Copy address" aria-label="Copy address">${COPYIC5}</span></button>${dignamLine(r)}</div></div>
     ${icons.length?`<div class="icons2">${icons.map(([i,v])=>`<span>${ic2(i,18,'var(--t2)')}${esc(v)}</span>`).join('')}</div>`:''}</div>
    ${warnBox(r,true)}
    ${numBtn(r,'pnum2')}
    <div class="g2 pgl2" style="flex:none">
     ${true?'':row2(R.c,R.icon,esc(R.line),'',chev2(),`details2(${id},'why')`)}
     ${lastRow}
     ${row2('#4b5565','clock',bought?`Bought ${bought.when}${bought.val?' for '+bought.val:''}`:'Sales history','',chev2(),`details2(${id},'history')`)}
    </div>
    <textarea class="pnote2" id="pnote2" data-note placeholder="Note, saves as you type" oninput="setNote(${id},this.value)" onfocus="typing2(true)" onblur="typing2(false)">${esc(note)}</textarea>
   </div>
   <div class="pf2">${barHTML2(id)}<div class="ends2"><button onclick="skip2(${id})">${ic2('skip',16)}Skip</button><button onclick="moreSheet2(${id})">${ic2('more',16)}More</button></div></div>
  </div>`;
  const acc=$("#acc2"); if(acc) acc.innerHTML=`${barHTML2(id,true)}<div class="accr2"><button class="askip" onmousedown="event.preventDefault()" onclick="document.activeElement.blur();document.body.classList.remove('typing');skip2(${id})">${ic2('skip',16)}Skip</button><button class="done" onmousedown="event.preventDefault()" onclick="document.activeElement.blur()">Done</button></div>`;
  markShown(id); prefetchPhotos(id);
}
// Load the next few people's photos in the background so they are already there when the card comes up
const _pf=new Set();
function prefetchPhotos(curId){
  const sz=desk2()?PH_BIG:PH_SMALL;
  const next=callQ().filter(x=>!x.today_outcome&&!S.skipped.has(x.property_id)&&x.property_id!==curId);
  const load=x=>{ const u=aerialUrl(x,sz[0],sz[1]); if(!u||_pf.has(u)) return; _pf.add(u); const im=new Image(); im.decoding='async'; im.src=u; };
  next.slice(0,6).forEach(load);
  // the rest of the next 30 load quietly when the phone is idle, and the phone keeps them, so they show instantly later
  clearTimeout(window._pfIdle); window._pfIdle=setTimeout(()=>{ const go=()=>next.slice(6,30).forEach(load); window.requestIdleCallback?requestIdleCallback(go,{timeout:4000}):go(); },1500);
}
matchMedia('(min-width:900px)').addEventListener('change',()=>{ if(S.tab==='calls'&&S.view!=='list'&&!S.searching&&!$("#ov").classList.contains("show")) drawList(); });
function typing2(on){ if(desk2()) return; if(on){ document.body.classList.add('typing'); placeAcc2(); } else setTimeout(()=>{ if(document.activeElement?.id!=='pnote2') document.body.classList.remove('typing'); },120); }
function placeAcc2(){ const v=window.visualViewport, a=$("#acc2"); if(!v||!a) return; const gap=window.innerHeight-(v.height+v.offsetTop); a.style.bottom=Math.max(0,gap)+'px'; }
window.visualViewport&&visualViewport.addEventListener('resize',placeAcc2);
window.visualViewport&&visualViewport.addEventListener('scroll',placeAcc2);
addEventListener('resize',()=>{ if(desk2()) document.body.classList.remove('typing'); });

function act2(id,o){ document.activeElement?.blur?.(); document.body.classList.remove('typing'); if(o==='call_back') return callbackSheet2(id); outcome(id,o); }
function skip2(id){ if(S.pick===id) S.pick=null; skipCard(id); }
window.record = (function(orig){ return async function(id,o,cb){ if(S.pick===id) S.pick=null; closeOv(); return orig(id,o,cb); }; })(window.record);
window.queue = (function(orig){ return function(){ const a=orig().map(r=>{ if(!r.callback) return r; const m=(S.rows||[]).find(x=>x.property_id===r.property_id); return m?{...m,...r,reasons:m.reasons,signals:m.signals,history:m.history,rank:0}:r; }); if(!S.focusSub) return a; return [...a.filter(r=>r.callback),...a.filter(r=>!r.callback&&grp(r)===S.focusSub),...a.filter(r=>!r.callback&&grp(r)!==S.focusSub)]; }; })(window.queue);
function toggleDialer(){ setView(S.view==='list'?'call':'list'); }

function details2(id,tab){
  const r=queue().find(x=>x.property_id===id); if(!r) return;
  const R=reasonOf(r), hist=histRows(r);
  const body={calls:()=>callCards2(r),
   why:()=>`<div class="g2">${whyRows(r).map(([i,t,l])=>row2(RC2[i]||LVL2[l][0],i,esc(t),`<span style="color:${LVL2[l][1]};font-weight:700">${LVW6[l]||l}</span>`)).join('')}</div><div class="g2" style="padding:14px 16px"><b style="display:block;margin-bottom:4px">${esc(R.head)}</b><span style="color:var(--t2)">${esc(R.sub)}</span></div>`,
   history:()=>`${photo2(r,'height:190px',true)}<div class="g2" style="padding:16px;display:flex;flex-direction:column;gap:14px">${hist.length?hist.map((h,j)=>`<div class="tl2"><div class="d"><i style="background:${h.col};box-shadow:0 0 0 3px ${h.col}33"></i>${j<hist.length-1?'<u></u>':''}</div><div><div class="tlh2"><b>${h.lab}</b>${h.val?`<em style="color:${h.col==='#9ba4b2'?'var(--t1)':h.col}">${h.val}</em>`:''}</div><small>${esc(h.when)}</small></div></div>`).join(''):'<span class="emptyline">No sales on record</span>'}</div>
     <div class="g2">${[['bed',[r.bedrooms>0?r.bedrooms+' bed':null,r.baths>0?r.baths+' bath':null,r.cars>0?r.cars+' car':null].filter(Boolean).join(', ')||'Not known yet','Rooms'],['clock',yrsSince(r.last_sale_date)!=null?yrsSince(r.last_sale_date)+' years':'Not known','Owned'],['trend',String(r.street_sales_12m||0),'Street sales this year']].map(([i,v,l])=>row2('#4b5565',i,esc(v),l)).join('')}</div>
`}[tab]();
  openSheet2(esc(people(r.owner_name)[0]||'Owner unknown'),`<div class="seg2">${[['calls','Calls'],['why','Why'],['history','Sales']].map(([k,l])=>`<button class="${k===tab?'on':''}" onclick="details2(${id},'${k}')">${l}</button>`).join('')}</div>${body}`);
}
function moreSheet2(id){
  openSheet2('More',`<div class="g2">${row2('var(--acc)','msg','Text message','Schedule a text from a template','<span class="kb2 hide-phone">T</span>',`closeOv();openMessage(${id})`)}${row2('var(--lst)','star','Listed with us','They signed with Dignam','',`record(${id},'listed')`)}</div>
   <div class="g2">${row2('#4b5565','warn','Something is wrong','Wrong person, rented, already listed',chev2(),`wrongSheet2(${id})`)}</div>
   <div class="g2">${row2('var(--ns)','ban','<span style="color:var(--nsT)">Do not call</span>','Never list this number again','',`dncSheet2(${id})`)}</div>`);
  S.sheetKeys={t:()=>{ closeOv(); openMessage(id); }};
}
function wrongSheet2(id){
  const r=queue().find(x=>x.property_id===id)||{};
  openSheet2('What is wrong?',`<p style="margin:0 4px;font-size:14px;line-height:21px;color:var(--t2)">Tap one and ${esc(firstName(r.owner_name))} is skipped straight away. Anything in the note box is sent with it.</p>
   <div class="g2">${WRONG.map(([k,l])=>`<button class="r2" style="grid-template-columns:1fr" onclick="wrong2(${id},'${k}')"><span class="rt2"><b>${esc(l)}</b><span>${ISSUE_RULE[k]||''}</span></span></button>`).join('')}</div>`,`moreSheet2(${id})`);
}
const ISSUE_RULE={sold:'Off the list for 2 years',on_market:'Off until it sells, then 2 years from the sale',dignam_listed:'Never called again',
  rented:'Off the seller list for good, moves to the landlord list',rented_dignam:'Never called again, on either list',
  recent_buyer:'Off the list for 2 years',wrong_names:'Off the list for 3 months while the names get fixed',wrong_reason:'Skipped today, back tomorrow',other:'Skipped today, back tomorrow'};
function wrong2(id,k){ closeOv(); if(S.pick===id) S.pick=null; S.skipped.add(id); drawList();
  toast(`${(WRONG.find(w=>w[0]===k)||[,'Noted'])[1]}. ${ISSUE_RULE[k]||'Skipped'}`);
  api("report_issue",{property_id:id,kind:k,note:notes[id]||null}).catch(e=>{ S.skipped.delete(id); drawList(); toast("Couldn't save that. "+e.message); }); }
function dncSheet2(id){
  const r=queue().find(x=>x.property_id===id)||{};
  openSheet2('Do not call',`<span class="tile" style="width:48px;height:48px;border-radius:8px;background:var(--ns);align-self:center">${ic2('ban',24,'#fff')}</span>
   <b style="font-size:20px;text-align:center">Never call ${esc(firstName(r.owner_name))} again?</b>
   <p style="margin:0;font-size:14px;line-height:21px;text-align:center;color:var(--t2)">${r.phone?esc(fmtPh2(r.phone))+' comes':'This person comes'} off every list for good.</p>
   <button class="b2 dan" onclick="record(${id},'do_not_call')">Do not call</button><button class="b2" onclick="moreSheet2(${id})">Cancel</button>`,`moreSheet2(${id})`);
}
function callbackSheet2(id){
  const picks=callbackPicks(), sub=(d,h)=>{ const x=new Date(Date.now()+d*864e5); return x.toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',weekday:'long',day:'numeric',month:'long'})+', '+hl2(h); };
  const _r=queue().find(x=>x.property_id===id)||{}; openSheet2(`When to call ${esc(people(_r.owner_name)[0]||'them')} back?`,`<div class="g2">${picks.map(([d,h,l],i)=>row2('var(--cb)','clock',esc(l),sub(d,h),`<span class="kb2 hide-phone">${i+1}</span>`,`closeOv();quickCallback(${id},${d},${h})`)).join('')}</div>
   <div class="g2">${row2('#4b5565','cal','Pick a day and time','',chev2(),`pickSheet2(${id})`)}</div>`);
  S.sheetKeys=Object.fromEntries(picks.map(([d,h],i)=>[String(i+1),()=>{ closeOv(); quickCallback(id,d,h); }]));
}
function pickSheet2(id){
  openSheet2('Pick a day and time',`<input type="datetime-local" id="pcb2" value="${sydInput(new Date(Date.now()+2*864e5)).slice(0,11)}10:00" style="height:52px;border-radius:8px;padding:0 14px">
   <button class="b2 pri" onclick="const v=$('#pcb2').value;if(!v)return toast('Pick a date and time');closeOv();record(${id},'call_back',sydToISO(v))">Save call back</button>`,`callbackSheet2(${id})`);
}

// ---------- the list: pick who to call ----------
function drawList2(){
  const all=queue(), cbs=all.filter(r=>r.callback), rest=all.filter(r=>!r.callback);
  const subs=[]; rest.forEach(r=>{ const k=grp(r)||'Suburb unknown'; let s=subs.find(x=>x[0]===k); if(!s) subs.push(s=[k,0,0]); s[2]++; if(!r.today_outcome) s[1]++; });
  if(!all.length){ $("#main").innerHTML=`<div class="empty2"><b>No list yet for today</b>It builds itself at 4:30am. To build it now, go to Settings.</div>`; return; }
  const names=[...(cbs.length?['Call backs']:[]),...subs.map(s=>s[0])];
  if(!names.includes(S.lsub)) S.lsub=(S.focusSub&&names.includes(S.focusSub))?S.focusSub:(names.find(n=>n!==SOL_GROUP)||names[0]);
  const rows=(S.lsub==='Call backs'?cbs:rest.filter(r=>(grp(r)||'Suburb unknown')===S.lsub)).slice().sort((a,b)=>(!!a.today_outcome-!!b.today_outcome));
  const left=rows.filter(r=>!r.today_outcome).length;
  // Last contact reads like Last bought: what happened on top, when underneath
  const two=(top,col,sub)=>`<b style="color:${col}">${esc(top)}</b><span>${esc(sub)}</span>`;
  const lastC=r=>{ if(r.today_outcome){ const k=OC2[r.today_outcome]||OC2.no_answer; return two(LABEL[r.today_outcome]||r.today_outcome,k[1],'Today'); }
    const g=callGroups(r); if(g.length){ const k=OC2[g[0].o]||OC2.no_answer; return two((LABEL[g[0].o]||g[0].o)+(g[0].n>1?' ×'+g[0].n:''),k[1],'You · '+dayMon(g[0].at)); }
    const d=dignamLast(r); if(d&&d.when) return two('Dignam','#5eead4',d.when+(d.by?' · '+d.by:''));
    return '<span class="nc3">Not contacted</span>'; };
  $("#main").innerHTML=failStrip()+`<div class="list2">
   <nav class="rail2" aria-label="Suburbs"><div class="seg2 mini lt5"><button class="${S.type==='seller'&&S.lsub!==SOL_GROUP?'on':''}" onclick="S.type='seller';S.lsub=null;render()">Sellers</button><button class="${S.type==='landlord'&&S.lsub!==SOL_GROUP?'on':''}" onclick="S.type='landlord';S.lsub=null;render()">Landlords</button><button class="${S.lsub===SOL_GROUP?'on':''}" onclick="solGo6()">Solicitors${solN6(subs)?` <span style="opacity:.7">${solN6(subs)}</span>`:''}</button></div><button class="cbk" onclick="upcomingCB()">Booked call backs<span>${ic2('chev',14)}</span></button>${cbs.length?`<button class="cbk ${S.lsub==='Call backs'?'on':''}" onclick="S.lsub='Call backs';drawList()">Call backs<span>${cbs.filter(r=>!r.today_outcome).length}</span></button>`:''}${subs.filter(([s])=>s!==SOL_GROUP).map(([s,n])=>`<button class="${s===S.lsub?'on':''}" onclick="S.lsub=this.dataset.s;drawList()" data-s="${esc(s)}">${esc(s)}<span>${n}</span></button>`).join('')}</nav>
   <div class="lm2">
    <div class="lh2 lh4"><div class="seg2 mini lt4"><button class="${S.type==='seller'&&S.lsub!==SOL_GROUP?'on':''}" onclick="S.type='seller';S.lsub=null;render()">Sellers</button><button class="${S.type==='landlord'&&S.lsub!==SOL_GROUP?'on':''}" onclick="S.type='landlord';S.lsub=null;render()">Landlords</button><button class="${S.lsub===SOL_GROUP?'on':''}" onclick="solGo6()">Solicitors${solN6(subs)?` <span style="opacity:.7">${solN6(subs)}</span>`:''}</button></div></div>
    <div class="lr2" id="lrows2">${rows.length?rows.map((r,ix)=>{ const div=r.today_outcome&&(ix===0||!rows[ix-1].today_outcome)?'<div class="div3">Called today</div>':''; const y=yrsSince(r.last_sale_date), id=r.property_id, ws=r.callback?[['cal','Call back '+dayMon(r.callback_at),'Note']]:whyRows(r).slice(0,3);
      const ph=(r.signals||[]).includes('probate')&&!(r.solicitor&&r.phone)?null:r.phone, u=aerialUrl(r,PH_SMALL[0],PH_SMALL[1]);
      const rooms=[r.bedrooms>0?r.bedrooms+' bd':'',r.baths>0?r.baths+' ba':'',r.cars>0?r.cars+' car':''].filter(Boolean).join(' · ');
      const bought=r.last_sale_date?`<b>${r.last_sale_price?esc(price2(r.last_sale_price)):'Price n/a'}</b><span>${String(r.last_sale_date).slice(0,4)}${y!=null?' · '+y+' yrs ago':''}</span>`:'<span>No sale on record</span>';
      return div+`<div class="lg3${r.today_outcome?' done':''}" onclick="open2(${id})">
      <div class="th3">${u?`<img src="${u}" alt="" loading="lazy" onerror="this.remove()">`:''}</div>
      <div class="nm3"><b>${esc(people(r.owner_name)[0]||'Owner unknown')}</b><span>${esc(r.street_address||'')}${S.lsub===SOL_GROUP&&r.suburb?', '+esc(r.suburb):''}</span></div>
      <div class="why3"><b class="wy4">${esc(short4(ws))}</b><span class="wb4">${r.last_sale_date?'Bought '+String(r.last_sale_date).slice(0,4)+(r.last_sale_price?' for '+esc(price2(r.last_sale_price)):''):'No sale on record'}</span></div>
      <div class="lc3">${lastC(r)}</div>
      <div class="ac3">${ph&&!r.today_outcome?`<button class="cl3" aria-label="Call ${esc(people(r.owner_name)[0]||'')}" onclick="event.stopPropagation();open2(${id});if(hoursOk())openUrl('tel:${esc(String(ph).replace(/[^0-9+]/g,''))}')">${ic2('phone',18,'#fff')}</button>`:''}<span class="ch3">${chev2()}</span></div></div>`; }).join(''):'<p class="emptyline" style="padding:28px">Nobody left here today.</p>'}</div>
   </div></div>`;
}
async function copyAddr(id){ const r=queue().find(x=>x.property_id===id); if(!r) return; const t=[r.street_address,r.suburb].filter(Boolean).join(', ');
  try{ await navigator.clipboard.writeText(t); }catch{ const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy')}catch{} ta.remove(); }
  toast('Copied: '+t); }
function bigPhoto(id){ const r=queue().find(x=>x.property_id===id); if(!r) return; const u=aerialUrl(r,1200,900);
  openSheet2(esc(r.street_address||'House'),`<div class="photo2" style="aspect-ratio:4/3;width:100%">${u?`<img src="${u}" alt="" onerror="this.remove()"><span class="pinm"></span><span class="credit">Imagery © NSW Spatial Services</span>`:''}</div>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><a class="b2 pri" href="${svUrl(r)}" target="_blank" rel="noopener">${ic2('eye',18)}Street View</a><button class="b2" onclick="copyAddr(${id})">Copy address</button></div>`);
  $("#sheet").classList.add('wide2'); }
function open2(id){ const r=queue().find(x=>x.property_id===id); if(r){ S.focusSub=(S.lsub==='Call backs'&&r.callback)?'Call backs':grpOf(r); S.lsub=S.focusSub; } S.pick=id; S.view='call'; S.dialer=true; try{localStorage.setItem("dp_view","call")}catch{} render(); }
function startSub(){ S.focusSub=S.lsub; S.pick=null; S.skipped.clear(); setView('call'); }

// ---------- keys ----------
document.addEventListener('keydown',e=>{
  if(!S.token) return;
  const ovOpen=$("#ov").classList.contains("show");
  if(e.key==='Escape'){ closePop2(); if(ovOpen){ closeOv(); return; } document.activeElement?.blur?.(); return; }
  if(e.metaKey||e.ctrlKey||e.altKey) return;
  if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')) return;
  if(ovOpen){ const f=S.sheetKeys&&S.sheetKeys[e.key.toLowerCase()]; if(f){ e.preventDefault(); f(); } return; }
  if(S.tab!=='calls'||S.searching) return;
  if(S.view==='list'){ if(e.key==='Enter'){ e.preventDefault(); startSub(); } return; }
  const r=curCall(); if(!r) return; const id=r.property_id, k=e.key.toLowerCase();
  const o=OUT2.find(x=>x.key===e.key); if(o){ e.preventDefault(); return act2(id,o.o); }
  if(k==='s') skip2(id); else if(k==='m') moreSheet2(id); else if(k==='t') openMessage(id);
  else if(k==='n') $(desk2()?'#note2':'#pnote2')?.focus();
  else if(k==='c'){ const a=$('.num2[href^="tel:"]'); if(a) a.click(); }
  else if(k==='a') copyAddr(id);
  else return;
  e.preventDefault();
});

