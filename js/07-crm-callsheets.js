// ---------- CRM look (20 Nov): Leads as a grouped table, the lead docked beside the list, Pipeline as a board ----------
function ltype3(l){ return hasCriteria(l.buy)?'Buyer':'Seller'; }
function dayK3(k){ return new Date(k+'T00:00:00').toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'}); }
function dueTxt3(l){ const n=dueIn(l.follow_up); const t=n===null?'No date':n<0?`${-n} day${n===-1?'':'s'} overdue`:n===0?'Today':dayK3(l.follow_up);
  return `<b class="due3 ${n===null?'q':n<0?'od':n===0?'td':''}">${esc(t)}</b>`; }
function nwm3(l){ const n=newMatches(l).length; return n?`<em class="nwm3">${n} new match${n>1?'es':''}</em>`:''; }
function leadsTable3(ls){
  const G=[['Overdue','od',n=>n!==null&&n<0],['Today','td',n=>n===0],['Next 7 days','',n=>n>0&&n<=7],['Later','',n=>n>7],['No follow up date','',n=>n===null]];
  const sub=l=>[l.address,l.suburb].filter(Boolean).join(', ');
  const btns=l=>l.phone?`<a href="${smsLink(l.phone,'')}" onclick="event.stopPropagation()" aria-label="Text">${ic2('msg',17)}</a><a class="call" href="tel:${esc(telOf(l.phone))}" onclick="event.stopPropagation()" aria-label="Call">${ic2('phone',17)}</a>`:'';
  return `<div class="ltab3"><div class="lt3 h"><span>Lead</span><span>Type</span><span>Due</span><span class="c3">Address</span><span class="c3">Last spoke</span><span class="c3"></span></div>${G.map(([g,c,f])=>{ const xs=ls.filter(l=>f(dueIn(l.follow_up))); if(!xs.length) return '';
    return `<div class="lgb3 ${c}"><i></i><b>${g}</b><span>${xs.length}</span></div>`+xs.map(l=>`<div class="lt3${S.ol&&S.ol.id===l.id&&$('#ov').classList.contains('show')?' sel':''}" data-id="${l.id}" onclick="openLead(${l.id})" data-lq="${esc([l.name,l.address,l.suburb,l.phone].join(' ').toLowerCase())}">
      <span class="n3"><b>${esc(leadTitle(l))}</b>${nwm3(l)}</span><span>${ltype3(l)}</span><span>${dueTxt3(l)}</span><span class="c3">${esc(sub(l))}</span><span class="c3">${l.last_contact?esc(dayMon(l.last_contact)):'<i>Never</i>'}</span><span class="c3 b3">${btns(l)}</span></div>`).join(''); }).join('')}</div>`; }
// Leads page on desktop: the grouped table
window.drawLeads=(function(orig){ return function(){ orig(); if(S.lview==='listings'||!desk2()) return; const t=document.querySelector('#main .ltab2'); if(!t) return;
  t.outerHTML=leadsTable3((S.leads||[]).slice().sort((a,b)=>(a.follow_up||'9999').localeCompare(b.follow_up||'9999'))); }; })(window.drawLeads);
// The open lead is marked in the list, which stays in view beside it
window.openLead=(function(orig){ return function(id,opts){ const r=orig(id,opts); document.querySelectorAll('.lt3[data-id]').forEach(x=>x.classList.toggle('sel',+x.dataset.id===id)); return r; }; })(window.openLead);
// Closing a sheet clears the selected row
window.closeOv=(function(orig){ return function(...a){ const r=orig(...a); document.querySelectorAll('.lt3.sel').forEach(x=>x.classList.remove('sel')); return r; }; })(window.closeOv);

// Pipeline board: one column per stage. Click a column name to open that full page, a name to open the person.
function when3(x,k){ const d=x[k]||x.updated_at; return d?new Date(d).toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',weekday:'short',day:'numeric',month:'short'}):''; }
function card3(o){ const ph=o.buyer?`<span class="ph3 b">${ic2('search',18)}</span>`:`<span class="ph3">${ic2('house',20)}${o.photo?`<img src="${o.photo}" alt="" loading="lazy" onerror="this.remove()">`:''}</span>`;
  return `<div class="cd3">${ph}<div class="cx3"><button class="cn3" onclick="${o.open}">${esc(o.name)}</button><span class="ck3"><b class="${o.cls||''}">${esc(o.key)}</b>${o.sub?`&nbsp;&nbsp;${esc(o.sub)}`:''}</span><span class="ca3">${esc(o.addr)}</span></div><div class="cb3">${o.acts}</div></div>`; }
function telBtn3(p){ return p?`<button aria-label="Call" class="call" onclick="if(hoursOk())openUrl('tel:${esc(String(p).replace(/[^0-9+]/g,''))}')">${ic2('phone',16)}</button>`:''; }
async function board3(local){
  const rows=local===true&&S.pipe?S.pipe:((await api("pipeline")).rows||[]); S.pipe=rows;
  if(!S.leads) await loadLeads().catch(()=>{});
  const ls=(S.leads||[]).slice().sort((a,b)=>(a.follow_up||'9999').localeCompare(b.follow_up||'9999'));
  const apA=rows.filter(x=>x.stage==='appraisal'), liA=rows.filter(x=>x.stage==='listed'), ap=apA.filter(x=>pm5(x,'ap')), li=liA.filter(x=>pm5(x,'ls'));
  const n=d=>dueIn(d);
  const lsf=lsFilter5(ls); const lc=lsf.slice(0,S.bfit5||5).map(l=>{ const d=n(l.follow_up); return card3({buyer:hasCriteria(l.buy),photo:aerialUrl(l,PH_SMALL[0],PH_SMALL[1]),name:leadTitle(l),
    key:d===null?'No date':d<0?`${-d} day${d===-1?'':'s'} overdue`:d===0?'Today':dayK3(l.follow_up),cls:d!==null&&d<0?'od':d===0?'td':'',sub:ltype3(l),
    addr:[l.address,l.suburb].filter(Boolean).join(', '),open:`openLead(${l.id})`,
    acts:l.phone?`<a class="call" href="tel:${esc(telOf(l.phone))}" aria-label="Call">${ic2('phone',16)}</a><a href="${smsLink(l.phone,'')}" aria-label="Text">${ic2('msg',16)}</a>`:''}); });
  const pc=(x,key,cls,sub)=>card3({photo:aerialUrl(x,PH_SMALL[0],PH_SMALL[1]),name:people(x.owner_name)[0]||'Owner unknown',key,cls,sub,addr:[x.street_address,x.suburb].filter(Boolean).join(', '),
    open:`pipeSheet(${x.property_id})`,acts:telBtn3(x.phone)+`<button aria-label="Move to the next stage" onclick="pipeSheet(${x.property_id})">${ic2('more',16)}</button>`});
  const src=x=>'from '+(SOURCES[x.source||'calls']||'calls').toLowerCase();
  const apc=ap.map(x=>x.appt_at?pc(x,'Appraisal '+new Date(x.appt_at).toLocaleString('en-AU',{timeZone:'Australia/Sydney',weekday:'short',day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}),'',`Booked ${when3(x,'appraisal_at')}, ${src(x)}`):pc(x,'Set a time','td',`Booked ${when3(x,'appraisal_at')}, ${src(x)}`));
  const lic=li.map(x=>pc(x,'Listed '+when3(x,'listed_at'),'',src(x).replace(/^f/,'F')));
  const col=(k,title,count,cards,go,add,more)=>`<section class="bc3 ${k}"><div class="bh3"><button onclick="${go}">${title}</button><span>${count}</span><button class="ad3" aria-label="Add" onclick="${add}">${ic2('plus',16)}</button></div>${cards.join('')||'<p class="be3">Nothing here yet</p>'}<button class="bm3" onclick="${go}">${more}${ic2('chev',14)}</button></section>`;
  $("#main").className='v2main';
  $("#main").innerHTML=`<div class="pg2 bp3"><div class="bd3">
    ${col('ld','Leads',ls.length,lc,"go('leads')",'openLead(null)',`View all ${ls.length} leads`)}
    ${col('ap','Appraisals',apA.length,apc,"sideGo('appraisal')",'openAddPipe()','Open Appraisals')}
    ${col('ls','Listings',liA.length,lic,"sideGo('listed')",'openAddPipe()','Open Listings')}</div></div>`;
  const s=document.querySelector('.side2'); if(s) s.outerHTML=sideHTML();
  document.querySelectorAll('.tabbtn').forEach(t=>t.textContent='Pipeline');
}
// Pipeline page: the board when Pipeline is picked
window.viewPipeline=(function(orig){ return async function(local){ if(S.pst==='board') return board3(local); return orig(local); }; })(window.viewPipeline);
// Side bar: Pipeline opens the board
window.sideGo=(function(orig){ return function(k){ if(k==='board'){ closePop2(); closeOv(); S.pst='board'; return go('pipeline'); } return orig(k); }; })(window.sideGo);
// Side bar: the Pipeline heading opens the board too
window.sideHTML=(function(orig){ return function(){ return orig().replace(`onclick="this.parentElement.classList.toggle('open')"`,`onclick="this.parentElement.classList.add('open');sideGo('board')"`); }; })(window.sideHTML);

// Appraisals and Listings in the same layout as Leads: edge to edge table, a line between every column, a slim strip above
function pipeTable3(local){
  const rows=S.pipe||[], list=rows.filter(x=>ptab(x.stage)===S.pst), P=PST[S.pst];
  const when=x=>{ const d=x[PST[x.stage][2]]||x.updated_at; return d?new Date(d).toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',weekday:'short',day:'numeric',month:'short'}):''; };
  const key=x=>{ if(x.stage==='appraisal'){ return x.appt_at?`<b class="due3">${esc(new Date(x.appt_at).toLocaleString('en-AU',{timeZone:'Australia/Sydney',weekday:'short',day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}))}</b>`:`<b class="due3 td">Set a time</b>`; } return `<b class="due3">${esc(when(x))}</b>`; };
  const sub=x=>x.stage==='appraisal'?when(x):(x.stage==='listed_other'?'Another agency':'From '+(SOURCES[x.source||'calls']||'calls').toLowerCase());
  const head=`<div class="pt3 h"><span>Owner</span><span>Address</span><span>${P[1]==='Booked'?'Appraisal':P[1]}</span><span>${S.pst==='appraisal'?'Booked':'Came from'}</span><span>Last bought</span><span></span></div>`;
  const body=list.map(x=>{ const u=aerialUrl(x,PH_SMALL[0],PH_SMALL[1]), id=x.property_id;
    return `<div class="pt3" onclick="pipeSheet(${id})"><span class="n3"><span class="th4">${ic2('house',14)}${u?`<img src="${u}" alt="" loading="lazy" onerror="this.remove()">`:''}</span><b>${esc(people(x.owner_name)[0]||'Owner unknown')}</b></span>
     <span><span class="ad4">${esc([x.street_address,x.suburb].filter(Boolean).join(', '))}</span></span><span>${key(x)}</span><span>${esc(sub(x))}</span>
     <span class="lb4">${x.last_sale_date?`<b class="due3">${x.last_sale_price?esc(price2(x.last_sale_price)):'Price n/a'}</b><i>${String(x.last_sale_date).slice(0,4)}</i>`:'<i>No sale on record</i>'}</span>
     <span class="ac3">${PNEXT[x.stage].map(([s2,l],i)=>`<button class="${i===0&&!pBad(s2)?'go':''}" onclick="event.stopPropagation();setStage(${id},'${s2}')">${l}</button>`).join('')}${x.phone?`<button class="cl" aria-label="Call" onclick="event.stopPropagation();if(hoursOk())openUrl('tel:${esc(String(x.phone).replace(/[^0-9+]/g,''))}')">${ic2('phone',16)}</button>`:'<span class="cl clx" aria-hidden="true"></span>'}</span></div>`; }).join('');
  $("#main").className='v2main';
  $("#main").innerHTML=`<div class="pg2 pl3"><div class="ph2"><button class="b2 pri" onclick="openAddPipe()" aria-label="Add">${ic2('plus',18)}<span>Add</span></button></div>
   ${list.length?`<div class="ltab3">${head}${body}</div>`:`<div class="empty2"><b>${S.pst==='sold'?'Nothing sold yet':`No ${P[0].toLowerCase()} yet`}</b>${S.pst==='appraisal'?'Book one from the call list and it shows up here.':''}</div>`}</div>`;
}
// Pipeline page: Appraisals and Listings tables on desktop
window.viewPipeline=(function(orig){ return async function(local){ const r=await orig(local); if(S.pst!=='board'&&desk2()&&PST[S.pst]) pipeTable3(); return r; }; })(window.viewPipeline);

// Pipeline board: drag a card into another column to move them along. Leads to Appraisals books it, Appraisals to Listings lists it.
function dragStart3(e,kind,id){ e.dataTransfer.setData('text/plain',JSON.stringify({kind,id})); e.dataTransfer.effectAllowed='move'; document.body.classList.add('dragging3'); }
function dragEnd3(){ document.body.classList.remove('dragging3'); document.querySelectorAll('.bc3.over').forEach(c=>c.classList.remove('over')); }
async function drop3(e,col){ e.preventDefault(); dragEnd3(); let d; try{ d=JSON.parse(e.dataTransfer.getData('text/plain')); }catch{ return; }
  const from=d.kind; if(from===col) return;
  if(from==='ld'){ const l=(S.leads||[]).find(x=>x.id===d.id); if(!l) return;
    if(!l.property_id) return toast('This lead has no house linked. Use + on Appraisals to add it.');
    if(col==='ap') return setStage(l.property_id,'appraisal'); if(col==='ls') return setStage(l.property_id,'listed'); return; }
  if(col==='ld'){ const x=(S.pipe||[]).find(r=>r.property_id===d.id); return x&&x.lead_id?pipeLead(x.lead_id):pipeMakeLead(d.id); }
  return setStage(d.id,col==='ap'?'appraisal':'listed'); }
// Pipeline board: cards can be dragged between columns
window.board3=(function(orig){ return async function(local){ const r=await orig(local);
  const cols=document.querySelectorAll('.bd3 .bc3');
  cols.forEach(c=>{ const k=c.classList.contains('ap')?'ap':c.classList.contains('ls')?'ls':'ld';
    c.addEventListener('dragover',e=>{ e.preventDefault(); c.classList.add('over'); }); c.addEventListener('dragleave',e=>{ if(!c.contains(e.relatedTarget)) c.classList.remove('over'); });
    c.addEventListener('drop',e=>drop3(e,k));
    c.querySelectorAll('.cd3').forEach(cd=>{ const o=cd.querySelector('.cn3')?.getAttribute('onclick')||''; const m=o.match(/\((\d+)\)/); if(!m) return;
      cd.draggable=true; cd.addEventListener('dragstart',e=>dragStart3(e,k,+m[1])); cd.addEventListener('dragend',dragEnd3); }); });
  return r; }; })(window.board3);

// Card drop map extras: our appraisals and listings, recent sales with price, the date each street was last dropped, and a walking route
async function mapExtras3(){ if(!S.map||S.tab!=='drops'||S.walk) return;
  if(S.dext){ S.map.removeLayer(S.dext); S.dext=null; }
  const g=L.layerGroup(); const pin=(lat,lng,c,html)=>L.circleMarker([lat,lng],{radius:8,weight:3,color:'#fff',fillColor:c,fillOpacity:1}).bindPopup(html).addTo(g);
  const MX=mx5();
  try{ if(MX.pipe&&!S.pipe) S.pipe=(await api("pipeline")).rows||[]; }catch{}
  for(const x of MX.pipe?(S.pipe||[]):[]){ if(x.lat==null||!['appraisal','listed'].includes(x.stage)) continue;
    pin(x.lat,x.lng,x.stage==='listed'?'#0d9488':'#15803d',`<b>${x.stage==='listed'?'Our listing':'Our appraisal'}</b><br>${esc([x.street_address,x.suburb].filter(Boolean).join(', '))}<br><span style="color:#667">Drop the neighbours</span>`); }
  try{ if(MX.sales&&!S.rsales) S.rsales=(await api("recent_sales")).rows||[]; }catch{ S.rsales=[]; }
  const k=v=>v>=1e6?'$'+(v/1e6).toFixed(2).replace(/0$/,'').replace(/\.0$/,'')+'m':'$'+Math.round(v/1e3)+'k';
  // zoomed out: a small dot per sale; close in: the price tag, so they never pile up
  const near=S.map.getZoom()>=16;
  if(!S.map._sz3){ S.map._sz3=true; S.map.on('zoomend',()=>{ const n=S.map.getZoom()>=16; if(n!==S._salesNear){ S._salesNear=n; mapExtras3(); } }); }
  S._salesNear=near;
  for(const s of MX.sales?(S.rsales||[]):[]){ (near?L.marker([s.lat,s.lng],{icon:L.divIcon({className:'sale3',html:`<span>${k(+s.price)}</span>`,iconSize:null})}):L.circleMarker([s.lat,s.lng],{radius:4,weight:1.5,color:'#111419',fillColor:'#f6c026',fillOpacity:1}))
    .bindPopup(`<b>Sold ${k(+s.price)}</b><br>${esc(s.addr)}, ${esc(s.suburb||'')}<br><span style="color:#667">${new Date(s.d).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'})}</span>`).addTo(g); }
  // streets already dropped: a small date tag where the street sits
  const byId=new Map((S.drops||[]).map(x=>[x.id,x]));
  for(const st of near&&MX.dropped?(S.streets||[]):[]){ const ds=(st.ids||[]).map(id=>byId.get(id)).filter(x=>x&&isDropped(x)); if(!ds.length||ds.length<(st.ids||[]).length) continue;
    const last=ds.map(x=>x.dropped_at).sort().pop(), p=(st.paths||[])[0]; if(!p||!p.length) continue; const m=p[Math.floor(p.length/2)];
    L.marker([m[1],m[0]],{icon:L.divIcon({className:'dd3',html:`<span>Dropped ${new Date(last).toLocaleDateString('en-AU',{day:'numeric',month:'short'})}</span>`,iconSize:null}),interactive:false}).addTo(g); }
  S.dext=g.addTo(S.map); }
// Card drop map: our pins, recent sales and dropped dates on top of the layer
window.drawDropLayer=(function(orig){ return function(...a){ const r=orig(...a); if(S.walk&&S.dlay) S.map.removeLayer(S.dlay); setTimeout(mapExtras3,0); return r; }; })(window.drawDropLayer);

// Walking route along the real footpaths: each street is walked end to end, in the order that keeps the
// gaps between streets shortest, and the route between them comes from OpenStreetMap's walking router.
function ends3(pts){ const c=pts.reduce((a,p)=>[a[0]+p[0]/pts.length,a[1]+p[1]/pts.length],[0,0]), d=(p,q)=>L.latLng(p).distanceTo(q);
  const a=pts.reduce((b,p)=>d(p,c)>d(b,c)?p:b,pts[0]), b=pts.reduce((m,p)=>d(p,a)>d(m,a)?p:m,pts[0]); return [a,b]; }
// Suburbs to walk, best first: ranked by their best street still to drop
function walkSubs3(){ const m=new Map(); for(const g of dropGroups('street')){ const sub=g.k.split(', ').pop(); const o=m.get(sub)||{sub,best:0,n:0}; o.best=Math.max(o.best,g.avg); o.n++; m.set(sub,o); }
  return [...m.values()].filter(o=>o.n>=2).sort((a,b)=>b.best-a.best); }
async function walk3(){ const sub=document.getElementById('wksub')?.value||S.walkSub||walkSubs3()[0]?.sub; S.walkSub=sub;
  // the 8 best streets in one suburb: about an hour's walk, easy to follow
  const gs=dropGroups('street').filter(g=>g.k.split(', ').pop()===sub&&g.pts&&g.pts.length).slice(0,8);
  if(gs.length<2||!S.map) return toast(`Not enough streets left to drop in ${sub||'that suburb'}`);
  const d=(p,q)=>L.latLng(p).distanceTo(q), items=gs.map(g=>({g,e:ends3(g.pts)}));
  // order: start from the best street, nearest next, then untangle any crossings (2 opt)
  const order=[items.shift()]; while(items.length){ const c=order[order.length-1].e; let bi=0,bd=1e12; items.forEach((s,i)=>{ const v=Math.min(d(c[0],s.e[0]),d(c[0],s.e[1]),d(c[1],s.e[0]),d(c[1],s.e[1])); if(v<bd){bd=v;bi=i;} }); order.push(items.splice(bi,1)[0]); }
  const mid=s=>[(s.e[0][0]+s.e[1][0])/2,(s.e[0][1]+s.e[1][1])/2], len=o=>o.slice(1).reduce((a,s,i)=>a+d(mid(o[i]),mid(s)),0);
  for(let pass=0,better=true;better&&pass<20;pass++){ better=false; for(let a=1;a<order.length-1;a++) for(let b=a+1;b<order.length;b++){ const t=[...order.slice(0,a),...order.slice(a,b+1).reverse(),...order.slice(b+1)]; if(len(t)+1<len(order)){ order.splice(0,order.length,...t); better=true; } } }
  // walk each street end to end, entering at the end nearest the last one
  const stops=[]; for(const s of order){ const prev=stops.length?stops[stops.length-1].b:null; const flip=prev&&d(prev,s.e[1])<d(prev,s.e[0]); stops.push({g:s.g,a:flip?s.e[1]:s.e[0],b:flip?s.e[0]:s.e[1]}); }
  if(S.walk) S.map.removeLayer(S.walk); if(S.dext) S.map.removeLayer(S.dext);
  const wps=stops.flatMap(s=>[s.a,s.b]); toast('Working out the walk…');
  let line=null, km=0, legs=[];
  try{ const u='https://routing.openstreetmap.de/routed-foot/route/v1/driving/'+wps.map(p=>`${p[1].toFixed(6)},${p[0].toFixed(6)}`).join(';')+'?overview=full&geometries=geojson&steps=true';
    const j=await (await fetch(u,{signal:AbortSignal.timeout(15000)})).json(); if(j.code!=='Ok'||!j.routes?.length) throw new Error(j.message||j.code);
    line=j.routes[0].geometry.coordinates.map(([x,y])=>[y,x]); km=j.routes[0].distance/1000; legs=j.routes[0].legs||[];
    if(!S.map._osrm3){ S.map._osrm3=true; S.map.attributionControl?.addAttribution('Walking route: <a href="https://routing.openstreetmap.de" target="_blank" rel="noopener">FOSSGIS OSRM</a>'); }
  }catch(e){ console.warn('walk route',e); for(let i=1;i<wps.length;i++) km+=d(wps[i-1],wps[i])/1000; }
  const mins=Math.round(km/4.5*60)+stops.reduce((a,s)=>a+s.g.ids.length,0)/2|0;   // walking plus about 30 seconds a letterbox
  // Drawn like Google Maps: one bold blue route with arrows; the streets to drop glow yellow underneath; Start and Finish pins
  const streetsOf=k=>(S.streets||[]).filter(st=>`${st.street}, ${st.suburb}`===k).flatMap(st=>st.paths||[]).map(p=>p.map(([x,y])=>[y,x]));
  const path=line||wps, layers=[];
  stops.forEach(s=>{ for(const p of streetsOf(s.g.k)) layers.push(L.polyline(p,{color:'#f6c026',weight:16,opacity:.5,lineCap:'round'})); });
  layers.push(L.polyline(path,{color:'#1a4fd6',weight:9,opacity:1,lineCap:'round',lineJoin:'round'}), L.polyline(path,{color:'#5b9bff',weight:5.5,opacity:1,lineCap:'round',lineJoin:'round',dashArray:line?null:'1 10'}));
  if(line){ let acc=0; for(let k=1;k<path.length;k++){ const seg=d(path[k-1],path[k]); acc+=seg; if(acc>=140&&seg>8){ acc=0;
      const a=path[k-1], b=path[k], ang=Math.atan2(b[1]-a[1],(b[0]-a[0]))*180/Math.PI;
      layers.push(L.marker([(a[0]+b[0])/2,(a[1]+b[1])/2],{interactive:false,icon:L.divIcon({className:'wka3',html:`<i style="transform:translate(-50%,-50%) rotate(${ang-90}deg)"></i>`,iconSize:null})})); } } }
  const pin=(p,html,cls)=>L.marker(p,{zIndexOffset:500,icon:L.divIcon({className:cls,html,iconSize:null})});
  stops.forEach((s,i)=>{ if(i) layers.push(pin(s.a,`<span>${i+1}</span>`,'wk3').bindPopup(`<b>${i+1}. ${esc(s.g.k)}</b><br>${s.g.ids.length} letterboxes`)); });
  layers.push(pin(stops[0].a,'<span>Start</span>','wks3'), pin(stops[stops.length-1].b,'<span>Finish</span>','wkf3'));
  S.walk=L.layerGroup(layers).addTo(S.map); if(S.dlay) S.map.removeLayer(S.dlay); S.map.fitBounds(wps,{padding:[40,40]});
  // turn by turn, in the side panel: drop legs say which street and how many letterboxes, walking legs say where to turn
  const turn=st=>{ const m=st.maneuver||{}, n=st.name||'the path', md=(m.modifier||'').replace('slight ','slight ').replace('sharp ','sharp ');
    if(m.type==='turn'||m.type==='end of road'||m.type==='fork') return `Turn ${md} onto ${n}`; if(m.type==='continue'||m.type==='new name') return `Keep going onto ${n}`;
    if(m.type==='roundabout'||m.type==='rotary') return `At the roundabout, take ${n}`; return null; };
  const fm=m=>m<1000?`${Math.round(m/10)*10} m`:`${(m/1000).toFixed(1)} km`;
  const rows=[]; stops.forEach((s,i)=>{
    if(i&&legs.length){ const lg=legs[2*i-1]; for(const st of (lg?.steps||[])){ const t=turn(st); if(t&&st.distance>5) rows.push(`<li class="go"><i>${ic2('chev',12)}</i><span>${esc(t)}</span><em>${fm(st.distance)}</em></li>`); } }
    rows.push(`<li onclick="S.map.fitBounds(${JSON.stringify([s.a,s.b])},{padding:[60,60],maxZoom:18})"><i>${i?i+1:'S'}</i><span><b>Drop along ${esc(s.g.k.split(', ')[0])}</b></span><em>${s.g.ids.length} letterboxes</em></li>`); });
  const b=document.getElementById('best'); document.getElementById('wkp3')?.remove();
  b?.insertAdjacentHTML('afterbegin',`<div id="wkp3"><div class="wkh3"><b>Walk in ${esc(sub)}</b><span>${km.toFixed(1)} km, about ${Math.round(mins/5)*5||5} min</span><button onclick="walkClear3()">Clear</button></div>
    <ol>${rows.join('')}<li class="end"><i>${ic2('check',12)}</i><span>Finish</span></li></ol>${line?'':'<p>Walking directions weren\'t available, so this shows the order only.</p>'}</div>`);
  toast(`${stops.length} streets in ${sub}. Start at the green pin.`);
}
function walkClear3(){ if(S.walk) S.map.removeLayer(S.walk); S.walk=null; document.getElementById('wkp3')?.remove(); if(S.dext) S.dext.addTo(S.map); if(S.dlay) S.dlay.addTo(S.map); }
// Card drops list: the Walk in suburb control (hidden; Plan a walk on the map uses it)
window.drawBest=(function(orig){ return function(...a){ const r=orig(...a); const b=document.getElementById('best'); const subs=b?walkSubs3():[]; if(b&&subs.length){ const cur=subs.some(o=>o.sub===S.walkSub)?S.walkSub:subs[0].sub;
    b.insertAdjacentHTML('afterbegin',`<div class="wk4"><label for="wksub">Walk in</label><select id="wksub" onchange="S.walkSub=this.value">${subs.map(o=>`<option${o.sub===cur?' selected':''}>${esc(o.sub)}</option>`).join('')}</select><button class="wkb3" onclick="walk3()">${ic2('pin',16)} Plan a walk</button></div>`); } return r; }; })(window.drawBest);

// ---------- Call sheet around a home: pick a distance on a map, then call everyone inside it ----------
const AREA_DEF=800;
const blocks3=m=>Math.max(1,Math.round(m/80));
// Search result: Call sheet around here
window.openSearchProp=(function(orig){ return function(pid,inList){ orig(pid,inList);
  const sh=$('#sheet'); if(!sh) return;
  sh.insertAdjacentHTML('beforeend',`<button class="ghost ar3b" onclick="areaSheet(${pid})">${ic2('pin',18)}Call sheet around here</button>`); }; })(window.openSearchProp);
async function areaSheet(pid){
  openSheet2('Call sheet around here',`<div class="ar3"><div class="ar3h" id="ar3a">Finding everyone nearby</div><div id="ar3m" class="ar3m"></div>
    <div class="ar3c"><div class="ar3n"><b id="ar3n">0</b><span>people to call</span></div><div class="ar3d" id="ar3d"></div></div>
    <input type="range" id="ar3r" min="100" max="1000" step="50" value="${AREA_DEF}" aria-label="How far around" oninput="areaDraw3()" onchange="areaFit3()">
    <div class="ar3k"><span>100 m</span><span>1 km</span></div>
    <button class="b2 pri" id="ar3go" onclick="areaMake3(${pid})" disabled>Make call sheet</button></div>`);
  $('#sheet').classList.add('wide2');
  let d; try{ d=await api('area_preview',{id:pid}); }catch(e){ $('#ar3a').textContent=e.message; return; }
  if(d.error){ $('#ar3a').textContent=d.error; return; }
  S.area3={pid,d}; $('#ar3a').textContent=d.addr;
  try{ await loadLeaflet(); }catch(e){}
  if(!window.L&&$('#ar3m')) $('#ar3m').innerHTML=`<div class="empty" style="padding:40px 0">The map couldn't load. The count below still works.</div>`;
  if(window.L&&$('#ar3m')){ $('#ar3m').innerHTML='';
    const m=L.map('ar3m',{zoomControl:false,attributionControl:true,preferCanvas:true}).setView([d.lat,d.lng],15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(m);
    S.area3.map=m;
    S.area3.dots=d.pts.map(p=>L.circleMarker([p[0],p[1]],{radius:4,weight:0,fillOpacity:.9}).addTo(m));
    S.area3.circle=L.circle([d.lat,d.lng],{radius:AREA_DEF,color:'#5b9bff',weight:2,fillColor:'#2563eb',fillOpacity:.1}).addTo(m);
    L.marker([d.lat,d.lng],{icon:L.divIcon({className:'ar3pin',html:ic2('house',16),iconSize:[30,30],iconAnchor:[15,15]})}).addTo(m);
    [60,300].forEach(t=>setTimeout(()=>{ try{ m.invalidateSize(); areaFit3(); }catch{} },t));
  }
  $('#ar3go').disabled=false; areaDraw3();
}
function areaDraw3(){
  const A=S.area3; if(!A) return; const r=+$('#ar3r').value;
  const n=A.d.pts.filter(p=>p[2]<=r).length;
  $('#ar3n').textContent=n.toLocaleString(); $('#ar3d').innerHTML=`<b>${r>=1000?'1 km':r+' m'}</b><span>about ${blocks3(r)} block${blocks3(r)>1?'s':''} each way</span>`;
  $('#ar3go').textContent=n?`Make call sheet of ${n.toLocaleString()}`:'Nobody to call in that area'; $('#ar3go').disabled=!n;
  if(A.circle){ A.circle.setRadius(r); A.dots.forEach((m,i)=>{ const inn=A.d.pts[i][2]<=r; m.setStyle({fillColor:inn?'#ffc864':'#636d7e',fillOpacity:inn?.95:.5,radius:inn?4.5:3}); }); }
}
function areaFit3(){ const A=S.area3; if(A&&A.map&&A.circle) A.map.fitBounds(A.circle.getBounds(),{padding:[16,16]}); }
async function areaMake3(pid){
  const r=+$('#ar3r').value, b=$('#ar3go'); b.disabled=true; b.textContent='Making it';
  try{
    const x=await api('area_list',{id:pid,radius:r});
    if(x.error) throw new Error(x.error);
    try{ S.area3?.map?.remove(); }catch{} S.area3=null; closeOv();
    toast(`${x.n} people added to ${x.name}`);
    S.type='seller'; go('calls'); await refreshCalls(true); S.lsub=x.name; paintCalls();
  }catch(e){ b.disabled=false; areaDraw3(); toast(e.message); }
}
// Closing a sheet tidies up the call sheet map
window.closeOv=(function(orig){ return function(){ if(S.area3){ try{ S.area3.map?.remove(); }catch{} S.area3=null; } return orig.apply(this,arguments); }; })(window.closeOv);
// Demo mode: a made up neighbourhood so the screen can be tried without real data
window.demoApi=(function(orig){ return function(action,body){
  if(action==='area_preview'){ const lat=-34.3375,lng=150.9196,pts=[]; let s=7; const rnd=()=>((s=s*16807%2147483647)/2147483647);
    for(let i=0;i<620;i++){ const a=rnd()*6.283,d=Math.sqrt(rnd())*1000; pts.push([lat+d*Math.cos(a)/111320,lng+d*Math.sin(a)/(111320*Math.cos(lat*Math.PI/180)),Math.round(d)]); }
    pts.sort((x,y)=>x[2]-y[2]); return {lat,lng,addr:'6/12 Waterloo Street, Bulli',pts}; }
  if(action==='area_list') return {ok:true,name:'Around 6/12 Waterloo St',n:(window.__demoArea=Math.round(body.radius/2.1))};
  return orig(action,body); }; })(window.demoApi);
// Call list side rail: actions as a compact pair, special lists and suburbs in their own sections,
// long names cut with an ellipsis so the count always shows
window.drawList2=(function(orig){ return function(){ orig(); try{
  const rail=document.querySelector('.rail2'); if(!rail||rail.dataset.r5) return; rail.dataset.r5=1;
  const camp=new Set((S.rows||[]).map(r=>r.campaign).filter(Boolean));
  rail.querySelectorAll('button:not(.lt5 button)').forEach(b=>{ const t=[...b.childNodes].find(n=>n.nodeType===3&&n.textContent.trim()); if(!t) return;
    const em=document.createElement('em'); em.className='rn5'; em.textContent=t.textContent; b.replaceChild(em,t); b.title=em.textContent; });
  const acts=[...rail.querySelectorAll('button.cbk')].filter(b=>!b.dataset.s&&!/Call backs/.test(b.onclick?.toString()||'')&&(b.classList.contains('addp')||/upcomingCB/.test(b.getAttribute('onclick')||'')));
  if(acts.length){ const w=document.createElement('div'); w.className='rl5'; acts[0].before(w); acts.forEach(a=>w.appendChild(a)); }
  const items=[...rail.querySelectorAll('button')].filter(b=>!b.closest('.rl5')&&!b.closest('.lt5'));
  const lists=items.filter(b=>/S\.lsub='Call backs'/.test(b.getAttribute('onclick')||'')||camp.has(b.dataset.s));
  lists.forEach(b=>{ if(camp.has(b.dataset.s)){ b.classList.add('cmp5'); b.insertAdjacentHTML('afterbegin',ic2('pin',14)); } });
  const subs=items.filter(b=>!lists.includes(b));
  const head=t=>{ const h=document.createElement('div'); h.className='rh5'; h.textContent=t; return h; };
  if(lists.length) lists[0].before(head('Lists'));
  if(subs.length) subs[0].before(head('Suburbs'));
}catch(e){} }; })(window.drawList2);

// One short reason per person on the call list: the list's own name already says which home it is near
function short4(ws){ const all=(ws||[]).map(w=>w[1]).filter(Boolean), d=all.filter(t=>!/^Owned /.test(t)); let t=(d[0]||all[0]||'Long time owner');
  const m=(t.match(/\((\d+ m)\)/)||t.match(/(\d+ m) from /)||[])[1];
  if(/^Same complex/.test(t)) return 'Same complex';
  if(/^Same street/.test(t)) return 'Same street'+(m?', '+m:'');
  if(/^Similar unit/.test(t)) return 'Similar unit'+(m?', '+m:'');
  if(/^(?:House )?\d+ m from /.test(t)) return m+' away';
  return t.replace(/,.*$/,''); }

// ---------- Call sheets live inside Calls: one New call sheet button, open home lists under Lists ----------
window.go=(function(orig){ return function(t,...a){ if(t==='enquiry'){ S.ohSel=S.elid||S.ohSel||null; S.view='list'; t='calls'; } return orig(t,...a); }; })(window.go);
const paintEnquiry0=window.paintEnquiry;
window.paintEnquiry=function(){ if(S.tab==='calls') return drawList(); return paintEnquiry0(); };
// Open home lists open inside Calls
window.viewEnquiry=(function(orig){ return async function(){ if(S.tab==='enquiry'||S.tab==='calls'){ S.tab='calls'; S.view='list'; S.ohSel=S.elid||null; }
  await orig(); if(S.tab==='calls'){ const L=(S.el||[]).find(x=>x.id===S.elid); S.ohSel=L&&!L.archived?L.id:null; drawList(); } }; })(window.viewEnquiry);
async function loadEl5(){ try{ const r=await api('elists'); const sig=JSON.stringify(r.rows||[]); if(sig===S.elSig) return; S.elSig=sig; S.el=r.rows||[]; if(S.tab==='calls'&&S.view==='list') drawList(); }catch{} }
// Calls: also loads the open home lists
window.refreshCalls=(function(orig){ return async function(...a){ const r=await orig(...a); loadEl5(); return r; }; })(window.refreshCalls);
// Enter does nothing while an open home list is showing
window.startSub=(function(orig){ return function(){ if(S.ohSel) return; return orig(); }; })(window.startSub);
// Call list rail: New call sheet button and open home lists
window.drawList2=(function(orig){ return function(){ orig(); try{
  const rail=document.querySelector('.rail2'); if(!rail) return;
  // New call sheet: the one obvious way to make any list
  const acts=rail.querySelector('.rl5'); if(acts&&!acts.querySelector('.ncs5')) acts.insertAdjacentHTML('afterbegin',`<button class="ncs5" onclick="newSheet5()">${ic2('plus',16)}<em class="rn5">New call sheet</em></button>`);
  const live=(S.el||[]).filter(x=>!x.archived), fin=(S.el||[]).filter(x=>x.archived);
  if(live.length||fin.length){
    let anchor=rail.querySelector('.rh5:nth-of-type(2)')||[...rail.querySelectorAll('.rh5')].find(h=>h.textContent==='Suburbs');
    if(![...rail.querySelectorAll('.rh5')].some(h=>h.textContent==='Lists')){ const h=document.createElement('div'); h.className='rh5'; h.textContent='Lists'; anchor?anchor.before(h):rail.appendChild(h); }
    const btn=x=>`<button class="oh5${S.ohSel===x.id?' on':''}" data-oh="${x.id}" onclick="S.ohSel=${x.id};openEList(${x.id})" title="Open home: ${esc(x.address||x.title)}">${ic2('house',14)}<em class="rn5">${esc(shortAddr(x.address||x.title))}</em><span>${x.archived?x.coming:x.total-x.done}</span></button>`;
    const html=live.map(btn).join('')+(fin.length?`<button class="ohf5" data-oh="f" onclick="S.ohFin=!S.ohFin;drawList()">${ic2(S.ohFin?'down':'chev',14)}<em class="rn5">Finished open homes</em><span>${fin.length}</span></button>`+(S.ohFin?fin.map(btn).join(''):''):'');
    anchor?anchor.insertAdjacentHTML('beforebegin',html):rail.insertAdjacentHTML('beforeend',html);
  }
  rail.addEventListener('click',e=>{ const b=e.target.closest('button'); if(b&&!b.dataset.oh&&!b.classList.contains('ncs5')&&S.ohSel){ S.ohSel=null; } },true);
  if(S.ohSel){
    rail.querySelectorAll('button.on:not([data-oh])').forEach(b=>b.classList.remove('on'));
    S.elid=S.ohSel; const keep=rail; paintEnquiry0();
    const r2=document.querySelector('#main .rail2'); if(r2) r2.replaceWith(keep);
    if(!S.erows||S.erowsFor!==S.ohSel){ const id=S.ohSel; S.erowsFor=id; api('elist',{id}).then(x=>{ if(S.ohSel!==id) return; S.erows=x.rows||[]; drawList(); }).catch(e=>toast(e.message)); }
  }
}catch(e){ console.error(e); } }; })(window.drawList2);
// Opening an open home list remembers which one is loaded
window.openEList=(function(orig){ return async function(id){ S.erowsFor=id; return orig(id); }; })(window.openEList);
function newSheet5(){ openSheet2('New call sheet',`<div class="g2">${row2('#2563eb','pin','Around an address','Everyone with a number nearby',chev2(),'areaPick5()')}${row2('#0d9488','house','Open home enquiries','Import the CRM export for a listing',chev2(),'ohImport5()')}</div>`); }
async function ohImport5(){ if(!S.listings){ try{ await loadLeads(); }catch{} } importSheet(); }
function areaPick5(){ openSheet2('Around an address',`<label class="tsearch ap5">${ic2('search',16)}<input id="ap5q" type="search" placeholder="Type an address" autocomplete="off" oninput="areaFind5(this.value)"></label><div id="ap5r" class="g2" hidden></div>`,'newSheet5()'); setTimeout(()=>$('#ap5q')?.focus(),50); }
let ap5t;
function areaFind5(q){ clearTimeout(ap5t); ap5t=setTimeout(async()=>{ const box=$('#ap5r'); if(!box) return; if(q.trim().length<3){ box.hidden=true; return; }
  try{ const r=await api('search',{q}); if($('#ap5q')?.value!==q) return; const ps=(r.props||[]).filter(p=>p.id).slice(0,8);
    box.hidden=false; box.innerHTML=ps.length?ps.map(p=>row2('#4b5565','pin',esc(p.street_address||''),esc(p.suburb||''),chev2(),`areaSheet(${p.id})`)).join(''):'<p class="emptyline" style="padding:14px">No address found</p>'; }catch(e){ toast(e.message); } },250); }

