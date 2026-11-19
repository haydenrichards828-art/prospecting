// Prospect v2: the new screens, built on the same data and actions as before
window.V2 = true;
(function(){ try{ S.autodial = localStorage.getItem("dp_autodial")==="1"; S.view = localStorage.getItem("dp_view")==="list" ? "list" : "call"; }catch{ S.view="call"; } S.dialer = S.view!=="list"; })();

// ---------- icons ----------
const P2={
 phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
 na:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2M16 3l5 5M21 3l-5 5',
 x:'M6 6l12 12M18 6L6 18', clock:'M12 7v5l3 2M21 12a9 9 0 1 1-9-9',
 lead:'M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6',
 appr:'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1zM9 14l2 2 4-4',
 skip:'M5 5l7 7-7 7M13 5l7 7-7 7', more:'M5 12h.01M12 12h.01M19 12h.01',
 tag:'M3 12V4h8l10 10-8 8zM7.5 8h.01', trend:'M3 17l6-6 4 4 8-8M15 7h6v6',
 bed:'M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18M7 9V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2',
 land:'M4 4h16v16H4zM4 10h5V4M15 20v-6h5', bath:'M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM6 12V6a2 2 0 0 1 4 0', car:'M5 17h14M6 17l1.6-5.5h8.8L18 17M5 17v2M19 17v2M8 14.5h.01M16 14.5h.01', pin:'M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
 chev:'M9 6l6 6-6 6', back:'M15 6l-6 6 6 6', down:'M6 9l6 6 6-6', msg:'M4 5h16v11H8l-4 4zM8 10h8',
 star:'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z', warn:'M12 3l10 18H2zM12 10v5M12 18h.01',
 ban:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M5.6 5.6l12.8 12.8', cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
 search:'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14M20 20l-4-4', house:'M3 11l9-7 9 7v9H3z', send:'M4 12l16-8-6 16-3-7z', chart:'M4 20V10M10 20V4M16 20v-7M22 20H2',
 gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
 mail:'M3 6h18v12H3zM3 7l9 6 9-6', plus:'M12 5v14M5 12h14', check:'M5 12l5 5 9-10',
 users:'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M21 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
 eye:'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6', fire:'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z', drop:'M12 3l6 8a6 6 0 1 1-12 0z'
};
const ic2=(n,s=20,c='currentColor')=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P2[n]||''}"/></svg>`;
const desk2=()=>matchMedia('(min-width:900px)').matches;
const OUT2=[
 {o:'no_answer',lab:'No answer',bg:'var(--na)',icon:'na',key:'1'},
 {o:'not_interested',lab:'Not selling',bg:'var(--ns)',icon:'x',key:'2'},
 {o:'call_back',lab:'Call back',bg:'var(--cb)',icon:'clock',key:'3'},
 {o:'lead',lab:'Lead',bg:'var(--ld)',icon:'lead',key:'4'},
 {o:'appraisal',lab:'Appraisal',bg:'var(--ap)',icon:'appr',key:'5'}];
const OC2={no_answer:['#7C3AED','var(--naT)','phone'],not_interested:['var(--ns)','var(--nsT)','x'],call_back:['var(--cb)','var(--cbT)','clock'],lead:['var(--ld)','var(--accT)','lead'],appraisal:['var(--ap)','#5ee08f','appr'],listed:['var(--lst)','var(--lstT)','star'],do_not_call:['var(--ns)','var(--nsT)','ban']};
const MONF=['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONS=MONF.map(m=>m.slice(0,3));
// One colour and icon per page, used in the menu and the side bar
const NAVI={calls:['#3b82f6','phone'],enquiry:['#d97706','msg'],leads:['#6366f1','users'],pipeline:['#0d9488','appr'],drops:['#db2777','mail'],insights:['#16a34a','chart'],settings:['#4b5565','gear']};
const TABS2=[['calls','Calls'],['enquiry','Call sheets'],['leads','Leads'],['pipeline','Appraisals and Listings'],['drops','Card drops'],['insights','Stats'],['settings','Settings']];
const LVL2={Strong:['var(--acc)','#93c0ff'],Medium:['#6366f1','#a5b4fc'],Light:['#475063','var(--t2)'],Note:['#b45309','#ffc864']};

// ---------- small helpers ----------
const row2=(tile,icon,title,sub='',right='',on='')=>`<${on?'button':'div'} class="r2" ${on?`onclick="${on}"`:''}><span class="tile" style="background:${tile}">${ic2(icon,17,'#fff')}</span><span class="rt2"><b>${title}</b>${sub?`<span>${sub}</span>`:''}</span>${right||'<span></span>'}</${on?'button':'div'}>`;
const chev2=()=>ic2('chev',16,'var(--t3)');
const fmtPh2=p=>{ const d=String(p||'').replace(/[^\d]/g,''); return /^0[2378]\d{8}$/.test(d)?d.replace(/^(\d{2})(\d{4})(\d{4})$/,'$1 $2 $3'):d.replace(/^(\d{4})(\d{3})(\d{3})$/,'$1 $2 $3'); };
const telOf=p=>String(p||'').replace(/[^\d+]/g,'');
const price2=v=>v?(v>=1e6?'$'+(Math.round(v/1e4)/100)+'m':'$'+Math.round(v/1e3)+'k'):'';
const yrsSince=d=>{ if(!d) return null; const y=(Date.now()-new Date(d+'T12:00:00Z'))/(365.25*864e5); return y>=0?Math.floor(y):null; };
const monYear=d=>{ const x=new Date(String(d).slice(0,10)+'T12:00:00Z'); return isNaN(x)?'':MONF[x.getUTCMonth()]+' '+x.getUTCFullYear(); };
const dayMon=iso=>{ if(!iso) return ''; const s=String(iso); const x=/^\d{4}-\d\d-\d\d$/.test(s)?new Date(s+'T12:00:00Z'):new Date(s); return x.toLocaleDateString('en-AU',{timeZone:/^\d{4}-\d\d-\d\d$/.test(s)?'UTC':'Australia/Sydney',day:'numeric',month:'short'}); };
const dayMonLong=iso=>{ if(!iso) return ''; const x=new Date(iso); return x.toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',day:'numeric',month:'long'}); };
const hl2=h=>(h%12||12)+(h<12?'am':'pm');
const firstName=n=>((people(n)[0]||'').split(' ')[0])||'them';

// ---------- why each person is on the list ----------
const RC={wd:['#d97706','var(--cbT)','tag','Withdrawn'],pb:['#64748b','#cbd5e1','users','Estate'],st:['#0891b2','#a5f3fc','trend','Street sale'],da:['#8b5cf6','#ddd6fe','land','DA lodged'],lh:['#6366f1','#c7d2fe','clock','Long hold'],crm:['#3b82f6','#93c0ff','users','In CRM'],inv:['#0d9488','#99f6e4','house','Investor'],cb:['#d97706','var(--cbT)','cal','Call back'],gen:['#475063','var(--t2)','tag','On the list']};
function reasonOf(r){
  const sig=r.signals||[], rs=r.reasons||[];
  const own=rs.find(x=>/^Owned /.test(x)), yrs=own&&(own.match(/Owned (\d+)/)||[])[1];
  const nb=rs.find(x=>/^Neighbour at /.test(x)), wdr=rs.find(x=>/^Listing withdrawn|^Withdrawn/.test(x));
  const wd=(r.withdrawn||[]).find(w=>w.kind!=='rental_withdrawn');
  const ownLine=yrs?`Owned ${yrs} years`:'', ss=r.street_sales_12m?`${r.street_sales_12m} street sale${r.street_sales_12m>1?'s':''} this year`:'';
  const mk=(k,head,sub,line,lvl)=>({k,c:RC[k][0],t:RC[k][1],icon:RC[k][2],side:RC[k][3],head,sub,line:line||head,lvl});
  if(r.callback) return mk('cb',`Call back due ${fmt(r.callback_at)}`,r.notes||'You booked this call back','Call back due '+dayMon(r.callback_at),'Strong');
  if(sig.includes('probate')){ const sol=rs.find(x=>x.startsWith('Probate notice (')); return mk('pb','Deceased estate',r.solicitor&&r.phone?`This number is the solicitor, ${r.solicitor}, not the family`:`Don't call the family. Contact the solicitor${sol?' ('+sol.slice(16,-1)+')':''} or write a letter`,'Deceased estate','Strong'); }
  if(sig.includes('withdrawn')||wdr){ const m=wd?monYear(wd.d):((wdr||'').match(/(?:expired|withdrawn) (\w+ \d{4})/i)||[])[1]||''; const mon=m?MONF[MONS.indexOf(m.slice(0,3))]||m.split(' ')[0]:'';
    return mk('wd',`Withdrawn${mon?' in '+mon:''}, not sold since`,[ownLine,ss].filter(Boolean).join(', ')||'Listing came off the market unsold',`Withdrawn${mon?' in '+mon:''}, not sold`,'Strong'); }
  if(nb){ const m=nb.match(/^Neighbour at (.+?) sold(?: for (\S+))? \((.+)\)$/); return mk('st',m&&m[2]?`Neighbour sold for ${m[2]}`:'A neighbour just sold',m?`${m[1]}, ${m[3]}`:nb,m&&m[2]?`Neighbour sold ${m[2]}`:'Neighbour just sold','Strong'); }
  if(sig.includes('da_major')) return mk('da','Subdivision DA in the last year',ownLine||ss||'Plans lodged with council','Subdivision DA','Strong');
  if(S.type==='landlord'||rs.includes('Investment property')) return mk('inv','Investment property',[ownLine,ss].filter(Boolean).join(', ')||'Owner does not live here','Investor','Medium');
  if(yrs) return mk('lh',`Owned for ${yrs} years`,/prime/.test(own)?'In the prime selling window':(ss||'Long time owner'),ownLine,'Medium');
  return mk('gen',rs[0]||'On today\'s list',ss||'','','Light');
}
function whyRows(r){
  const out=[], rs=r.reasons||[];
  rs.forEach(x=>{
    if(/^Probate notice/.test(x)) out.push(['users','Probate notice'+((x.match(/^Probate notice (\w+ \d{4})/)||[])[1]?' '+x.match(/^Probate notice (\w+ \d{4})/)[1]:''),'Strong']);
    else if(/^Listing withdrawn|^Withdrawn/.test(x)) out.push(['tag',x.replace(/^Listing withdrawn or expired/,'Withdrawn').replace(/, not sold since/,', not sold'),'Strong']);
    else if(/^Neighbour at/.test(x)) out.push(['trend',x.replace(/^Neighbour at /,'Sold nearby: '),'Strong']);
    else if(/DA/.test(x)) out.push(['land',x,'Strong']);
    else if(/^Owned/.test(x)) out.push(['clock',x.replace(/ yrs/,' years').replace(/\s*\(prime selling window\)/,', prime window').replace(/\s*\([^)]*\)$/,''),'Medium']);
    else if(/CRM/.test(x)) return;
    else if(/Investment/.test(x)) out.push(['house',x,'Light']);
    else if(/Large home/i.test(x)) out.push(['bed',x,'Light']);
    else out.push(['tag',x,'Light']); });
  if(r.street_sales_12m && !rs.some(x=>/^Neighbour/.test(x))) out.push(['trend',`${r.street_sales_12m} street sale${r.street_sales_12m>1?'s':''} this year`,'Light']);
  if(r.fire_zone) out.push(['fire',r.fire_zone==='Vegetation Buffer'?'Bushfire prone, bush edge':'Bushfire prone, in bushland','Note']);
  if(r.flood_zone) out.push(['drop','Flood planning area','Note']);
  if(r.callback&&!out.length) out.push(['cal','You booked a call back','Strong']);
  return out;
}
function strength2(r){ return ({Strong:3,Medium:2,Light:1})[reasonOf(r).lvl]||1; }
function histRows(r){
  const ev=[]; const sales=r.sales||[];
  // Each sale shows how much it rose from the one before and how long that owner held it; the latest shows who sold it when we know
  const ag=r.last_agency&&sales[0]&&r.agency_sale_date&&Math.abs(new Date(r.agency_sale_date)-new Date(sales[0].d))<=120*864e5;
  sales.forEach((s,i)=>{ const pv=sales[i+1]; let gain='';
    if(pv&&s.price&&pv.price){ const yrs=(new Date(s.d)-new Date(pv.d))/31557600000, df=s.price-pv.price, pc=Math.round(df/pv.price*100);
      gain=`${df>=0?'+':'−'}${price2(Math.abs(df))} (${df>=0?'+':''}${pc}%) over ${yrs<1?Math.max(1,Math.round(yrs*12))+' months':(Math.round(yrs*10)/10)+' yrs'}`; }
    ev.push({d:s.d,lab:i===0?'Bought':'Sold',val:price2(s.price),col:'#9ba4b2',year:true,gain,agency:i===0&&ag?[r.last_agency,r.last_agent].filter(Boolean).join(', '):''}); });
  if(!sales.length&&r.last_sale_date) ev.push({d:r.last_sale_date,lab:'Bought',val:price2(r.last_sale_price),col:'#9ba4b2',year:true});
  (r.withdrawn||[]).filter(w=>w.kind!=='rental_withdrawn').forEach(w=>ev.push({d:w.d,lab:/expir/.test(w.kind)?'Expired':'Withdrawn',val:'Not sold',col:'#f0a92b'}));
  ev.sort((a,b)=>String(a.d).localeCompare(String(b.d)));
  return ev.slice(-4).map(e=>({...e,when:e.year?String(e.d).slice(0,4):monYear(e.d)}));
}
function callGroups(r){
  const h=(r.history||[]).slice().sort((a,b)=>String(b.at).localeCompare(String(a.at))), out=[];
  h.forEach(x=>{ const last=out[out.length-1];
    if(last&&last.o==='no_answer'&&x.outcome==='no_answer'&&!x.notes&&!last.note) last.n++;
    else out.push({o:x.outcome,at:x.at,note:x.notes||'',n:1}); });
  return out.slice(0,8);
}
function dignamLast(r){ const ns=r.crm_notes||[]; if(!ns.length) return null;
  const d=ns.filter(n=>n.on).sort((a,b)=>String(b.on).localeCompare(String(a.on)))[0], own=(ns.find(n=>n.owner)||{}).owner;
  return {when:d?monYear(d.on):null, by:d&&d.by, owner:own&&!/^Dignam Real Estate/i.test(own)?own:null, recent:!!d&&(Date.now()-new Date(d.on))<365*864e5}; }
// The office line under the name is gone: Dignam's contacts and notes show in the history instead
function dignamLine(r){ return ''; const x=dignamLast(r); if(!x) return '';
  const t=x.when?`Last Dignam contact ${x.when}${x.by?', '+x.by:''}`:'In the Dignam CRM, no contact date';
  return `<div class="dl2" style="color:${x.recent?'var(--cbT)':'var(--t2)'}">${ic2('users',15)}<span>${esc(t)}${x.owner&&x.owner!==x.by?`<span class="pa"> · Primary agent ${esc(x.owner)}</span>`:''}</span></div>`; }
function officeNotes(r){ const ns=(r.crm_notes||[]).filter(n=>n.comments||n.last); if(!ns.length) return '';
  return ns.map(n=>`<div class="cc2"><i style="background:#6366f1"></i><div><div class="h"><b style="color:#c7d2fe">Office notes</b><span class="lab2">${esc(n.owner||n.name||'AgentBox')}${n.on?' · last contact '+esc(monYear(n.on)):''}</span></div>${n.comments?`<p>${esc(n.comments)}</p>`:''}${n.last?`<p style="color:var(--t2)">${esc(n.last)}</p>`:''}</div></div>`).join(''); }
// One timeline: your calls and everything Dignam has logged with them, newest first
const MON3={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
function officeEntries(r){ const out=[];
  (r.crm_notes||[]).forEach(n=>{
    const ln=String(n.last||''); let m; const rx=/(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w* (\d{4}):\s*(.*?)\s*\(Added by:\s*([^)]+)\)/gi;
    while((m=rx.exec(ln))) out.push({at:new Date(Date.UTC(+m[3],MON3[m[2].toLowerCase()],+m[1],12)).toISOString(),who:m[5].trim(),text:m[4].replace(/^[\s\-:]+|[\s\-]+$/g,''),office:true});
    const cm=String(n.comments||''); const parts=cm.split(/(?=\b\d{1,2}\/\d{1,2}\/\d{2,4}\b)/);
    parts.forEach(p=>{ p=p.trim(); if(!p) return; const d=p.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b\s*(.*)$/s);
      if(d){ let y=+d[3]; if(y<100) y+=2000; const dt=new Date(Date.UTC(y,+d[2]-1,+d[1],12)); const ini=(d[4].match(/^([A-Z]{2,3})\b\s*[-–]?\s*/)||[]);
        out.push({at:isNaN(dt)?null:dt.toISOString(),who:ini[1]||null,text:d[4].slice(ini[0]?ini[0].length:0).replace(/^[.\s\-–:]+/,'').trim(),office:true}); }
      else out.push({at:null,who:null,text:p,office:true}); });
  });
  return out.filter(e=>e.text&&!/^(n\/?a|-|\.|nil|none)$/i.test(e.text.trim())); }
function timeline(r){
  const mine=callGroups(r).map(c=>({at:c.at,o:c.o,n:c.n,text:c.note,mine:true}));
  const all=[...mine,...officeEntries(r)];
  return all.sort((a,b)=>(b.at?Date.parse(b.at):-1)-(a.at?Date.parse(a.at):-1)); }
function callCards2(r){
  const cbn=r.callback&&r.notes?`<div class="cc2"><i style="background:var(--cb)"></i><div><div class="h"><b style="color:var(--cbT)">Call back note</b><span class="lab2">${esc(dayMon(r.callback_at))}</span></div><p>${esc(r.notes)}</p></div></div>`:'';
  const t=timeline(r);
  if(!t.length) return cbn||`<p class="emptyline" style="margin:0">Not contacted.</p>`;
  const when=a=>{ if(!a) return 'no date'; const d=new Date(a); return (Date.now()-d)<330*864e5?dayMonLong(a):monYear(a.slice(0,10)); };
  return cbn+t.map(e=>{
    if(e.mine){ const k=OC2[e.o]||OC2.no_answer; return `<div class="cc2"><i style="background:${k[0]}"></i><div><div class="h"><b style="color:${k[1]}">${esc(LABEL[e.o]||e.o)}${e.n>1?` ×${e.n}`:''}</b><span class="lab2">You · ${e.n>1?'latest ':''}${esc(when(e.at))}</span></div>${e.text?`<p>${esc(e.text)}</p>`:''}</div></div>`; }
    return `<div class="cc2"><i style="background:#14b8a6"></i><div><div class="h"><b style="color:#99f6e4">${esc(e.who||'Dignam')}</b><span class="lab2">${esc(when(e.at))}</span></div><p>${esc(e.text)}</p></div></div>`; }).join('');
}

// ---------- photos: NSW aerial imagery plus a Street View link ----------
function aerialUrl(r,w=640,h=440){ if(r.lat==null||r.lng==null) return null; const la=+r.lat, lo=+r.lng, vs=0.00055, hs=vs*(w/h)/0.829;
  return `https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer/export?bbox=${(lo-hs).toFixed(6)},${(la-vs).toFixed(6)},${(lo+hs).toFixed(6)},${(la+vs).toFixed(6)}&bboxSR=4326&imageSR=3857&size=${w},${h}&format=jpg&f=image`; }
const svUrl=r=>r.lat!=null?`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${(+r.lat).toFixed(6)},${(+r.lng).toFixed(6)}`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rpAddress(r.street_address,r.suburb,r.postcode))}`;
// Sized to where it shows: a small square on the phone, a wide photo on a computer. Only the one on screen loads.
const PH_SMALL=[240,240], PH_BIG=[640,440];
function photo2(r,style,big,on=true){ const sz=big?PH_BIG:PH_SMALL, u=aerialUrl(r,sz[0],sz[1]);
  return `<div class="photo2" style="${style||''}" role="img" aria-label="Aerial photo of ${esc(r.street_address||'the house')}">${u?`${on?`<img src="${u}" alt="" fetchpriority="high" decoding="async" onerror="this.remove()">`:''}<span class="pinm"></span>`:`<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--t3)">${ic2('house',big?28:18)}</span>`}
   ${big?`${u?'<span class="credit">Imagery © NSW Spatial Services</span>':''}<a class="sv" href="${svUrl(r)}" target="_blank" rel="noopener">${ic2('eye',15)}Street View</a>`:''}</div>`; }

// ---------- shell ----------
function ensureExtras(){
  if(!$("#pop2")) document.body.insertAdjacentHTML('beforeend','<div id="popscrim2" onclick="closePop2()"></div><div id="pop2" role="menu"></div><div id="acc2"></div>');
}
function tabName(){ return S.searching?'Search':(TABS2.find(t=>t[0]===S.tab)||[,S.tab==='messages'?'Texts':S.tab==='pipeline'?'Pipeline':'Prospect'])[1]; }
function hasDot(){ return (S.ov?.ready_texts||0)>0 || (S.leads||[]).some(l=>newMatches(l).length); }
function tabBtn(id){ return `<button class="tabbtn" id="${id}" onclick="navPop(this)" aria-haspopup="true">${tabName()}${ic2('down',18)}${hasDot()?'<span class="dot"></span>':''}</button>`; }
function vseg2(){ return S.tab==='calls'&&!S.searching?`<div class="vseg">${[['call','Calling'],['list','List']].map(([k,l])=>`<button class="${S.view===k?'on':''}" onclick="setView('${k}')">${l}</button>`).join('')}</div>`:''; }
function setView(v){ S.view=v; S.dialer=v!=='list'; try{localStorage.setItem("dp_view",v)}catch{} if(v==='list') S.pick=null; render(); }
function navPop(btn){
  const ico=NAVI;
  const ready=S.ov?.ready_texts||0, nl=(S.leads||[]).filter(l=>newMatches(l).length).length;
  const body=`<div class="g2">${TABS2.map(([k,l])=>row2(ico[k][0],ico[k][1],l,k==='leads'&&nl?`${nl} with new matching homes`:'',k===S.tab?ic2('check',18,'var(--accT)'):'',`closePop2();closeOv();go('${k}')`)).join('')}</div>
   ${ready?`<div class="g2" style="margin-top:10px">${row2('var(--acc)','send','Texts',`${ready} ready to send`,chev2(),"closePop2();closeOv();go('messages')")}</div>`:''}`;
  if(!desk2()) return openSheet2('Go to',body);
  const r=btn.getBoundingClientRect(), pop=$("#pop2"); pop.innerHTML=body; pop.style.left=r.left+'px'; pop.style.top=(r.bottom+8)+'px'; pop.classList.add('show'); $("#popscrim2").classList.add('show');
}
function closePop2(){ $("#pop2")?.classList.remove('show'); $("#popscrim2")?.classList.remove('show'); }
function v2search(v){ const m=$("#main"); if(m) m.className='v2main old'; S.psearch=S.psearch||!!v; hSearch(v); }
function togglePS(){ S.psearch=!S.psearch; if(!S.psearch&&S.sq){ S.sq=''; hSearch(''); return; } render(); if(S.psearch) setTimeout(()=>$("#hq2")?.focus(),30); }

async function render(){
  if (!S.token) return renderLogin();
  closePop2();
  const v2tab=['calls','leads','insights','enquiry'].includes(S.tab)&&!S.searching;
  $("#app").innerHTML=`<div id="shell"><div class="panel">
   <header class="top2">${tabBtn('tabbtn')}${vseg2()}${S.tab==='calls'?'<div class="tstats" id="tstats"></div>':''}
    <label class="tsearch" style="${S.tab==='calls'?'':'margin-left:auto'}">${ic2('search',16)}<input id="hq" type="search" placeholder="Search everything" value="${esc(S.sq||'')}" oninput="v2search(this.value)" autocomplete="off" aria-label="Search names, numbers and addresses"></label></header>
   <header class="ptop2">${tabBtn('ptabbtn')}${vseg2()}<div class="ps" id="pstats"></div><button class="ib3" onclick="togglePS()" aria-label="Search">${ic2(S.psearch?'x':'search',20)}</button></header>
   ${S.psearch?`<div class="psrch"><label class="tsearch">${ic2('search',16)}<input id="hq2" type="search" placeholder="Search everything" value="${esc(S.sq||'')}" oninput="v2search(this.value)" autocomplete="off" aria-label="Search"></label></div>`:''}
   <main id="main" class="v2main${v2tab?'':' old'}"><div class="empty2"><b>Loading</b></div></main></div></div>`;
  ensureExtras(); document.body.classList.remove('typing');
  if (!S.leadsAt || Date.now()-S.leadsAt>10*60e3) { S.leadsAt=Date.now(); loadLeads().then(()=>{ document.querySelectorAll('.tabbtn').forEach(b=>{ if(hasDot()&&!b.querySelector('.dot')) b.insertAdjacentHTML('beforeend','<span class="dot"></span>'); }); }).catch(()=>{ S.leadsAt=0; }); }
  if (S.searching && (S.sq||'').trim().length>=2) { runSearch(S.sq); return; }
  try { await ({enquiry:viewEnquiry,calls:viewCalls,leads:viewLeads,pipeline:viewPipeline,drops:viewDrops,messages:viewMessages,insights:viewInsights,settings:viewSettings})[S.tab](); }
  catch(e){ if (S.token&&$("#main")) $("#main").innerHTML = `<div class="empty2"><b>${esc(e.message)}</b><button class="b2 pri" onclick="render()">Try again</button></div>`; }
}
function updateLeadDot(){}

// ---------- sheets ----------
function openSheet2(title,body,back){
  const sh=$("#sheet"); sh.classList.remove('lsheet','wide2'); sh.classList.add('v2s');
  sh.innerHTML=`<div class="grab2"><i></i></div><div class="sh2">${back?`<button onclick="${back}" aria-label="Back">${ic2('back',20)}</button>`:'<span></span>'}<b>${title}</b><button onclick="closeOv()" aria-label="Close">${ic2('x',20)}</button></div><div class="sb2">${body}</div>`;
  $("#ov").classList.add('show'); sh.scrollTop=0;
}
function closeOv(){ S.sheetKeys=null; $("#ov").classList.remove("show"); $("#sheet").classList.remove("lsheet","v2s","wide2"); }

// ---------- calls ----------
function paintCalls(){ drawProg(); drawList(); keepAwake(); }
function drawProg(){
  const ov=S.ov; if(!ov) return; const tg=ov.settings?.daily_target||100, c=ov.today_calls||0, a=ov.today_appraisals||0, cn=ov.today_connected||0, pace=livePace();
  const pl=S.view!=='list'&&S.progLine?`<div class="pl2"><b>${S.progLine.here}</b><span>left in ${esc(S.progLine.sub)}</span></div><div class="pl2"><b>${S.progLine.total}</b><span>to go</span></div><i class="tsep"></i>`:'';
  const t=$("#tstats"); if(t) t.innerHTML=pl+`<div><b>${c}</b><span>/ ${tg} calls</span></div><div><b>${cn}</b><span>connected</span></div><div><b style="color:var(--ok)">${a}</b><span>appraisals</span></div>${pace?`<div><b>${pace}</b><span>an hour</span></div>`:''}`;
  const p=$("#pstats"); if(p) p.innerHTML=`<span><b>${c}</b> / ${tg}</span><span><b style="color:var(--ok)">${a}</b> appr</span>`;
}
function curCall(){ const all=queue(); if(S.pick){ const p=all.find(r=>r.property_id===S.pick); if(p) return p; S.pick=null; } return all.find(r=>!r.today_outcome&&!S.skipped.has(r.property_id)); }
function drawList(){ if(S.tab!=='calls'||S.searching||!$("#main")) return; $("#main").className='v2main'; if(S.view==='list') return drawList2(); drawCall2(); }
function hoursStrip(){ if(callingAllowed()) return ''; return `<div class="hline2">${ic2('clock',16)}Outside legal calling hours. Next window ${nextWindowText()}. Only call if they asked you to call at this time.</div>`; }
function failStrip(){ return S.ov?.failed?`<div class="hline2" style="color:var(--nsT);background:#d6455a1a;border-color:#d6455a44">${ic2('warn',16)}Something didn't run overnight.&nbsp;<a href="#" onclick="go('insights');return false" style="color:inherit">See details</a></div>`:''; }
function barHTML2(id,small){ return `<div class="bar2x">${OUT2.map(o=>`<button style="background:${o.bg}" onclick="act2(${id},'${o.o}')" ${small?`onmousedown="event.preventDefault()" aria-label="${o.lab}"`:''}>${ic2(o.icon,20,'#fff')}${small?'':`<span>${o.lab}</span><span class="k">${o.key}</span>`}</button>`).join('')}</div>`; }
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
    w+=`<div class="warn2" style="color:#5ee08f;background:#16a34a1a;border-color:#16a34a55;align-items:center">${ic2('check',18)}<div style="flex:1"><b>Called today:</b> ${esc(LABEL[r.today_outcome]||r.today_outcome)}</div>${tc?`<button class="b2" style="height:36px" onclick="undoToday(${r.property_id},${tc.id})">Undo</button>`:''}</div>`; }
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
  const all=queue();
  if(!S.rows.length&&!all.length){ $("#main").innerHTML=`<div class="empty2">${ic2('search',30)}<b>No list yet for today</b>It builds itself at 4:30am. To build it now, go to Settings.</div>`; return; }
  const r=curCall();
  if(!r){ $("#main").innerHTML=hoursStrip()+`<div class="empty2">${ic2('check',30,'var(--ok)')}<b>That's everyone for today</b>${S.skipped.size?`<button class="b2" onclick="S.skipped.clear();drawList()">Go back to ${S.skipped.size} skipped</button>`:''}<button class="b2" onclick="setView('list')">Open the list</button></div>`; return; }
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
    <div><h1 class="nm2">${esc(nm)}</h1>${ppl.length>1?`<div class="also2">Also on file: ${ppl.slice(1).map(esc).join(', ')}</div>`:''}<button class="ad2 cp2" onclick="copyAddr(${id})" title="Copy address for RP Data">${ic2('pin',21)}<span>${addr}</span><span class="cpl">Copy</span></button>${dignamLine(r)}</div>
    ${tag}${warnBox(r)}
    ${numBtn(r,'num2')}
    ${why.length?`<div class="whyl2"><div class="wl2" style="grid-template-columns:repeat(${Math.min(why.length,4)},minmax(0,1fr))">${why.slice(0,4).map(([i,t,l])=>`<div class="wc2" style="--c:${LVL2[l][0]};--t:${LVL2[l][1]}"><span class="ti2">${ic2(i,18,'#fff')}</span><span><b>${esc(t)}</b><em>${l}</em></span></div>`).join('')}</div></div>`:''}
    <label class="nw2"><span class="h"><span class="lab2">Note <span class="nsaved" style="font-weight:500;color:var(--t3)">${note?'· saved':''}</span></span><span class="kb2">N</span></span>
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
    <div class="ptyp2" style="align-items:center;gap:12px;flex:none;padding-bottom:4px">${photo2(r,'width:44px;height:44px;border-radius:11px',false,!desk2())}<div style="min-width:0"><b style="font-size:18px;display:block">${esc(nm)}</b><span style="font-size:14px;color:var(--t2)">${addr}</span></div></div>
    <div class="pid2"><div class="pidr2">${photo2(r,'',false,!desk2()).replace('class="photo2"',`class="photo2" onclick="bigPhoto(${id})"`)}<div style="min-width:0"><h1>${esc(nm)}</h1><button class="a cp2" onclick="copyAddr(${id})">${addr}<span class="cpl">Copy</span></button>${dignamLine(r)}</div></div>
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
  const acc=$("#acc2"); if(acc) acc.innerHTML=`${barHTML2(id,true)}<button class="done" onmousedown="event.preventDefault()" onclick="document.activeElement.blur()">Done</button>`;
  markShown(id); prefetchPhotos(id);
}
// Load the next few people's photos in the background so they are already there when the card comes up
const _pf=new Set();
function prefetchPhotos(curId){
  const sz=desk2()?PH_BIG:PH_SMALL;
  const next=queue().filter(x=>!x.today_outcome&&!S.skipped.has(x.property_id)&&x.property_id!==curId);
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
   why:()=>`<div class="g2">${whyRows(r).map(([i,t,l])=>row2(LVL2[l][0],i,esc(t),`<span style="color:${LVL2[l][1]};font-weight:700">${l}</span>`)).join('')}</div><div class="g2" style="padding:14px 16px"><b style="display:block;margin-bottom:4px">${esc(R.head)}</b><span style="color:var(--t2)">${esc(R.sub)}</span></div>`,
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
  openSheet2('What is wrong?',`<p style="margin:0 4px;font-size:15px;line-height:21px;color:var(--t2)">Tap one and ${esc(firstName(r.owner_name))} is skipped straight away. Anything in the note box is sent with it.</p>
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
  openSheet2('Do not call',`<span class="tile" style="width:48px;height:48px;border-radius:14px;background:var(--ns);align-self:center">${ic2('ban',24,'#fff')}</span>
   <b style="font-size:20px;text-align:center">Never call ${esc(firstName(r.owner_name))} again?</b>
   <p style="margin:0;font-size:15px;line-height:21px;text-align:center;color:var(--t2)">${r.phone?esc(fmtPh2(r.phone))+' comes':'This person comes'} off every list for good.</p>
   <button class="b2 dan" onclick="record(${id},'do_not_call')">Do not call</button><button class="b2" onclick="moreSheet2(${id})">Cancel</button>`,`moreSheet2(${id})`);
}
function callbackSheet2(id){
  const picks=callbackPicks(), sub=(d,h)=>{ const x=new Date(Date.now()+d*864e5); return x.toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',weekday:'long',day:'numeric',month:'long'})+', '+hl2(h); };
  openSheet2('Call back when?',`<div class="g2">${picks.map(([d,h,l],i)=>row2('var(--cb)','clock',esc(l),sub(d,h),`<span class="kb2 hide-phone">${i+1}</span>`,`closeOv();quickCallback(${id},${d},${h})`)).join('')}</div>
   <div class="g2">${row2('#4b5565','cal','Pick a day and time','',chev2(),`pickSheet2(${id})`)}</div>`);
  S.sheetKeys=Object.fromEntries(picks.map(([d,h],i)=>[String(i+1),()=>{ closeOv(); quickCallback(id,d,h); }]));
}
function pickSheet2(id){
  openSheet2('Pick a day and time',`<input type="datetime-local" id="pcb2" value="${sydInput(new Date(Date.now()+2*864e5)).slice(0,11)}10:00" style="height:52px;border-radius:14px;padding:0 14px">
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
    const d=dignamLast(r); if(d&&d.when) return two('Dignam','#99f6e4',d.when+(d.by?' · '+d.by:''));
    return '<span class="nc3">Not contacted</span>'; };
  $("#main").innerHTML=failStrip()+`<div class="list2">
   <nav class="rail2" aria-label="Suburbs"><button class="cbk" onclick="upcomingCB()">Booked call backs<span>${ic2('chev',14)}</span></button>${cbs.length?`<button class="cbk ${S.lsub==='Call backs'?'on':''}" onclick="S.lsub='Call backs';drawList()">Call backs<span>${cbs.filter(r=>!r.today_outcome).length}</span></button>`:''}${subs.filter(([s])=>s!==SOL_GROUP).map(([s,n])=>`<button class="${s===S.lsub?'on':''}" onclick="S.lsub=this.dataset.s;drawList()" data-s="${esc(s)}">${esc(s)}<span>${n}</span></button>`).join('')}</nav>
   <div class="lm2">
    <div class="lh2"><h1>${esc(S.lsub)}</h1><span style="font-size:14px;color:var(--t2)">${left} to call</span>
     <div class="seg2 mini" style="margin-left:auto"><button class="${S.type==='seller'&&S.lsub!==SOL_GROUP?'on':''}" onclick="S.type='seller';S.lsub=null;render()">Sellers</button><button class="${S.type==='landlord'&&S.lsub!==SOL_GROUP?'on':''}" onclick="S.type='landlord';S.lsub=null;render()">Landlords</button>${subs.some(x=>x[0]===SOL_GROUP)?`<button class="${S.lsub===SOL_GROUP?'on':''}" onclick="S.lsub=SOL_GROUP;drawList()">Solicitors <span style="opacity:.7">${(subs.find(x=>x[0]===SOL_GROUP)||[])[1]}</span></button>`:''}</div>
     <button class="b2 pri hide-phone" style="height:40px" onclick="startSub()">${ic2('phone',18)}Start ${esc(S.lsub)}<span class="key2">Enter</span></button></div>
    <div class="lg3 h"><span></span><span>Name</span><span>Why they're on the list</span><span>Last bought</span><span>Last contact</span><span></span></div>
    <div class="lr2" id="lrows2">${rows.length?rows.map((r,ix)=>{ const div=r.today_outcome&&(ix===0||!rows[ix-1].today_outcome)?'<div class="div3">Called today</div>':''; const y=yrsSince(r.last_sale_date), id=r.property_id, ws=r.callback?[['cal','Call back '+dayMon(r.callback_at),'Note']]:whyRows(r).slice(0,3);
      const ph=(r.signals||[]).includes('probate')&&!(r.solicitor&&r.phone)?null:r.phone, u=aerialUrl(r,PH_SMALL[0],PH_SMALL[1]);
      const rooms=[r.bedrooms>0?r.bedrooms+' bd':'',r.baths>0?r.baths+' ba':'',r.cars>0?r.cars+' car':''].filter(Boolean).join(' · ');
      const bought=r.last_sale_date?`<b>${r.last_sale_price?esc(price2(r.last_sale_price)):'Price n/a'}</b><span>${String(r.last_sale_date).slice(0,4)}${y!=null?' · '+y+' yrs ago':''}</span>`:'<span>No sale on record</span>';
      return div+`<div class="lg3${r.today_outcome?' done':''}" onclick="open2(${id})">
      <div class="th3">${u?`<img src="${u}" alt="" loading="lazy" onerror="this.remove()">`:''}</div>
      <div class="nm3"><b>${esc(people(r.owner_name)[0]||'Owner unknown')}</b><span>${esc(r.street_address||'')}${S.lsub===SOL_GROUP&&r.suburb?', '+esc(r.suburb):''}</span></div>
      <div class="why3">${(()=>{ const all=ws.map(w=>w[1]), dk=all.filter(t=>!/^Owned /.test(t)), d=dk.length?dk:(all.length?['Long time owner']:[]);
        const fmt=a=>a.length?`<b>${esc(a[0])}</b>${a.length>1?', '+a.slice(1).map(esc).join(', '):''}`:'';
        return `<span class="wd3">${fmt(d)}</span><span class="wm3">${fmt(all)}</span>`; })()}</div>
      <div class="bt3">${bought}</div>
      <div class="lc3">${lastC(r)}</div>
      <div class="ac3">${ph&&!r.today_outcome?`<button class="cl3" aria-label="Call ${esc(people(r.owner_name)[0]||'')}" onclick="event.stopPropagation();open2(${id});if(callingAllowed())openUrl('tel:'+${JSON.stringify(String(ph).replace(/\s/g,''))}.replace(/[^0-9+]/g,''))">${ic2('phone',18,'#fff')}</button>`:''}<span class="ch3">${chev2()}</span></div></div>`; }).join(''):'<p class="emptyline" style="padding:28px">Nobody left here today.</p>'}</div>
   </div></div>`;
}
function rpu0(r){ return r.street_address||r.suburb?rpUrl(r.street_address,r.suburb,r.rp_link,r.postcode):null; }
async function copyAddr(id){ const r=queue().find(x=>x.property_id===id); if(!r) return; const t=[r.street_address,r.suburb].filter(Boolean).join(', ');
  try{ await navigator.clipboard.writeText(t); }catch{ const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy')}catch{} ta.remove(); }
  toast('Copied: '+t); }
function bigPhoto(id){ const r=queue().find(x=>x.property_id===id); if(!r) return; const u=aerialUrl(r,1200,900);
  openSheet2(esc(r.street_address||'House'),`<div class="photo2" style="aspect-ratio:4/3;width:100%">${u?`<img src="${u}" alt="" onerror="this.remove()"><span class="pinm"></span><span class="credit">Imagery © NSW Spatial Services</span>`:''}</div>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><a class="b2 pri" href="${svUrl(r)}" target="_blank" rel="noopener">${ic2('eye',18)}Street View</a><button class="b2" onclick="copyAddr(${id})">Copy address</button></div>`);
  $("#sheet").classList.add('wide2'); }
function filterRows2(q){ q=q.toLowerCase(); document.querySelectorAll('#lrows2 .lg2').forEach(r=>r.style.display=r.dataset.q.includes(q)?'':'none'); }
function open2(id){ S.pick=id; S.view='call'; S.dialer=true; try{localStorage.setItem("dp_view","call")}catch{} render(); }
function startSub(){ S.focusSub=S.lsub==='Call backs'?null:S.lsub; S.pick=null; S.skipped.clear(); setView('call'); }

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
  const tile=l=>`<span class="tile" style="background:${TCOL2[l.temperature]||'#4b5565'}">${ic2(hasCriteria(l.buy)?'search':'lead',16,'#fff')}</span>`;
  const nw=l=>{ const n=newMatches(l).length; return n?`<em class="nw4">${n} new match${n>1?'es':''}</em>`:''; };
  const table=`<div class="ltab2"><div class="lt2 h"><span>Lead</span><span>Next step</span><span>Due</span><span class="c4">Notes</span><span class="c5">Last spoke</span><span></span></div>${ls.map(l=>`<div class="lt2" onclick="openLead(${l.id})" data-lq="${esc([l.name,l.address,l.suburb,l.phone].join(' ').toLowerCase())}">
     <div class="ltn">${tile(l)}<div><b>${esc(leadTitle(l))}${nw(l)}</b><span>${esc(sub(l))}</span></div></div>
     <span class="ltnote" style="color:var(--t1)">${l.status&&l.status!=='Active'?`<b style="color:${/Listing Won/.test(l.status)?'#5ee08f':/Appraisal/.test(l.status)?'#93c0ff':'var(--t2)'};margin-right:6px">${esc(l.status==='Listing Won'?'Listed':l.status)}${l.next_action?',':''}</b>`:''}${esc(l.next_action||(l.status&&l.status!=='Active'?'':'Set a next step'))}</span>
     <b style="color:${dueCol(l.follow_up)};font-size:14px">${esc(dueLabel(l.follow_up))}</b><span class="ltnote c4">${esc(latest(l))}</span><span class="c5" style="font-size:14px;color:var(--t2)">${l.last_contact?esc(dayMon(l.last_contact)):''}</span>
     <div class="lbtns">${l.phone?`<a class="ib2" href="${smsLink(l.phone,'')}" onclick="event.stopPropagation()" aria-label="Text">${ic2('msg',17,'#fff')}</a><a class="ib2 call" href="tel:${esc(telOf(l.phone))}" onclick="event.stopPropagation()" aria-label="Call">${ic2('phone',17,'#fff')}</a>`:''}</div></div>`).join('')}</div>`;
  const list=`<div class="g2">${ls.map(l=>`<button class="r2" onclick="openLead(${l.id})">${tile(l)}<span class="rt2"><b>${esc(leadTitle(l))}</b><span>${esc(l.next_action||sub(l))}</span></span><span style="display:flex;align-items:center;gap:4px;font-size:13px;font-weight:700;color:${dueCol(l.follow_up)};white-space:nowrap">${esc(dueLabel(l.follow_up).replace('Follow up today','Today').replace('No follow up set','No date'))}${chev2()}</span></button>`).join('')}</div>`;
  m.innerHTML=`<div class="pg2">${head}${D?table:list}${S.leadsClosed?`<p class="emptyline" style="text-align:center;margin-top:16px">${S.leadsClosed} closed or do not contact leads hidden</p>`:''}</div>`;
}

// ---------- stats ----------
const PERIOD_DAYS={week:7,month:30,quarter:91}, PERIOD_WD={week:5,month:21,quarter:63};
function callChart2(ov,mode){
  const raw=(ov.periods||{})[mode]||[]; if(!raw.length) return null;
  const lab=s=>{ const d=new Date(s+'T12:00:00Z'); return mode==='week'?`${d.getUTCDate()} ${MONS[d.getUTCMonth()]}`:mode==='month'?MONS[d.getUTCMonth()]:`Q${Math.floor(d.getUTCMonth()/3)+1}`; };
  const groups=raw.map(x=>[+x.n||0,lab(x.start)]);
  const goal=(ov.settings?.daily_target||100)*PERIOD_WD[mode], ph=!desk2(), fm=n=>n.toLocaleString('en-AU');
  const W=ph?360:Math.max(560,Math.round(($("#main")?.clientWidth||944)-64)), H=ph?220:260, L=6, R=6, T=34, B=26, iw=W-L-R, ih=H-T-B, max=Math.max(goal,...groups.map(g=>g[0]))*1.15;
  const y=v=>T+ih-(v/max)*ih, n=groups.length, cw=iw/n, gap=ph?5:10, fs=ph?10:12;
  let g=`<line x1="${L}" x2="${W-R}" y1="${y(goal)}" y2="${y(goal)}" stroke="#5ee08f" stroke-opacity=".55" stroke-dasharray="4 5"/><text x="${W-R}" y="${y(goal)-6}" fill="#5ee08f" font-size="${fs}" text-anchor="end">goal ${fm(goal)}</text>`;
  groups.forEach(([v,l],i)=>{ const x0=L+i*cw+gap/2, w=cw-gap, yy=Math.min(y(v),T+ih-6), ch=i?v-groups[i-1][0]:null;
    const last0=i===n-1, up=!last0&&ch!==null&&ch>0&&(!v||ch/v>.03), down=!last0&&ch!==null&&ch<0, col=up?'#34d399':down?'#f0a92b':'#9ba4b2', last=i===n-1;
    g+=`<rect x="${x0}" y="${yy}" width="${w}" height="${T+ih-yy}" rx="8" fill="${last?'#1e2a3d':'#1a1f26'}"/><rect x="${x0}" y="${yy}" width="${w}" height="4" rx="2" fill="${last?'#3b82f6':col}"/>`;
    g+=`<text x="${x0+w/2}" y="${yy-8}" fill="#f2f4f7" font-size="${ph?11:15}" font-weight="800" text-anchor="middle">${fm(v)}</text>`;
    if(ch&&(up||down)&&T+ih-yy>30) g+=`<text x="${x0+w/2}" y="${yy+22}" fill="${col}" font-size="${ph?10:12}" font-weight="700" text-anchor="middle">${ch>0?'+':'−'}${fm(Math.abs(ch))}</text>`;
    if(!(ph&&n>6&&(n-1-i)%2)) g+=`<text x="${x0+w/2}" y="${H-6}" fill="${last?'#f2f4f7':'#9ba4b2'}" font-size="${fs}" font-weight="${last?700:400}" text-anchor="middle">${l}</text>`; });
  return {svg:`<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block" role="img" aria-label="Calls per ${mode}">${g}</svg>`, now:fm(groups[n-1][0])};
}
function heatGrid2(times){
  times=times||[]; const tot=times.reduce((a,t)=>a+(+t.calls||0),0);
  if(tot<100) return `<p class="emptyline" style="margin:0">This fills in once you have made about 100 calls, so the best hours are real and not luck. ${tot} so far.</p>`;
  const hrs=[...Array(12)].map((_,i)=>i+9), days=['Mon','Tue','Wed','Thu','Fri','Sat'];
  const at=(d,h)=>times.find(t=>t.dow===d&&t.hr===h);
  const g=days.map((_,di)=>hrs.map(h=>{ if(di===5&&h>=17) return null; const t=at(di+1,h); return t&&t.calls>=3?{r:t.answered/t.calls,c:t.calls}:{r:null}; }));
  const vals=g.flat().filter(v=>v&&v.r!=null).map(v=>v.r).sort((a,b)=>b-a); if(!vals.length) return '';
  const cut=vals[Math.max(0,Math.floor(vals.length*.12)-1)], q1=vals[Math.floor(vals.length*.4)]??0, q2=vals[Math.floor(vals.length*.75)]??0;
  let best=[-1,0,0]; g.forEach((row,di)=>row.forEach((v,hi)=>{ if(v&&v.r!=null&&v.c>=5&&v.r>best[0]) best=[v.r,di,hi]; }));
  const win=(len)=>{ let out=[]; for(let i=0;i+len<=12;i++){ let c=0,a=0; for(let d=1;d<=5;d++) for(let k=0;k<len;k++){ const t=at(d,hrs[i+k]); if(t){ c+=t.calls; a+=t.answered; } } if(c>=15) out.push([a/c,i]); } return out.sort((x,y)=>y[0]-x[0]); };
  const w3=win(3), w2=win(2), bw=w3[0], aw=w2[w2.length-1];
  const cell=(v,di,hi)=> v===null?'<i class="hz"></i>': v.r==null?'<i style="background:#14181e"></i>': v.r>=cut?`<i class="hb ${di===best[1]&&hi===best[2]?'top':''}"></i>`:`<i style="background:${v.r<=q2?'#1c2129':v.r<=q1?'#232933':'#2c333e'}"></i>`;
  return `<div class="tags2">${bw?`<span class="on">Best: weekdays ${hl2(hrs[bw[1]])} to ${hl2(hrs[bw[1]]+3)}</span>`:''}${best[0]>=0?`<span>Top hour: ${days[best[1]]} ${hl2(hrs[best[2]])}</span>`:''}${aw&&w2.length>2?`<span>Avoid: ${hl2(hrs[aw[1]])} to ${hl2(hrs[aw[1]]+2)}</span>`:''}</div>
   <div class="hgrid2"><span></span>${hrs.map(h=>`<span class="hx2">${h%2?'':hl2(h)}</span>`).join('')}${g.map((row,di)=>`<span class="hy2">${days[di]}</span>${row.map((v,hi)=>cell(v,di,hi)).join('')}`).join('')}</div>
   <div class="leg2"><span><i style="background:var(--acc)"></i>Best times</span><span><i style="background:#2c333e"></i>Average</span><span><i style="background:#1c2129"></i>Quiet</span><span><i style="background:#14181e"></i>Not enough calls</span></div>`;
}
function funnel2(ov){
  const k={week:'7',month:'30',quarter:'90'}[S.period||'week'], c=(ov.cohort||{})[k]||{}, h=+c.homes||0;
  const per=v=>h?Math.round(1000*v/h)/10:0, f1=v=>String(v).replace(/\.0$/,'');
  const steps=[['Called',h,null],['Answered',+c.reached||0,75],['Appraisal booked',+c.appraisals||0,5],['Listed',+c.listed||0,3]];
  if(!h) return `<section class="sec2"><div class="gh2" style="margin:0"><span>From call to listing</span></div><p class="emptyline" style="margin:0">No calls logged in this period yet.</p></section>`;
  return `<section class="sec2"><div class="gh2" style="margin:0"><span>From call to listing</span><b>${f1(per(+c.listed||0))} listings per 100</b></div>
   ${steps.map(([l,v,g],i)=>{ const p=per(v), ok=g!=null&&p>=g; return `<div class="fun2"><span>${l}</span><div class="hbt2"><i style="width:${v?Math.max(1.5,v/h*100):0}%;background:${i===0?'#3a4250':ok?'var(--ap)':'var(--acc)'}"></i></div><b>${v.toLocaleString()}</b><em>${i?`<span style="color:${ok?'#5ee08f':'var(--t1)'}">${f1(p)}</span> per 100 <small>goal ${g}</small>`:''}</em></div>`; }).join('')}
   <p class="emptyline" style="margin:12px 0 0">Each home counts once. Appraisals and Listings count whenever they come after the first call.${h<300?` Settles after about 300 homes, ${h} so far.`:''}</p></section>`;
}
const hm2=s=>{ s=Math.round(s||0); const h=Math.floor(s/3600), m=Math.round((s%3600)/60); return h?`${h}h ${m}m`:`${m}m`; };
function paintInsights(ov){
  S.period=S.period||'week';
  const pending=(ov.versions||[]).filter(v=>!v.approved), live=(ov.versions||[]).find(v=>v.approved);
  const c=ov.last30||{connected:0,appraisals:0}, t=+(ov.settings?.target_rate??3), rate=c.connected?100*c.appraisals/c.connected:0;
  const grp=k=>{ const xs=(ov.groups||[]).filter(g=>g.grp===k), cn=xs.reduce((a,g)=>a+(+g.connected||0),0), ap=xs.reduce((a,g)=>a+(+g.appraisals||0),0); return cn?(100*ap/cn).toFixed(1):'0.0'; };
  const status=c.connected<300?[`Settles after about 300 answered calls. ${c.connected} so far`,'var(--t2)']:rate>=t?['On target','#5ee08f']:[`${(t-rate).toFixed(1)} below goal`,'var(--cbT)'];
  const ch=callChart2(ov,S.period), subs=ov.suburbs||[], smax=Math.max(1,...subs.map(s=>s.n));
  $("#main").className='v2main';
  $("#main").innerHTML=`<div class="pg2"><div>
   <div class="ph2"><h1>Stats</h1><div class="seg2" style="min-width:270px">${[['week','Week'],['month','Month'],['quarter','Quarter']].map(([k,l])=>`<button class="${S.period===k?'on':''}" onclick="S.period='${k}';paintInsights(S.ovFull)">${l}</button>`).join('')}</div></div>
   ${pending.map(v=>`<div class="warn2" style="color:var(--accT);background:#3b82f61a;border-color:#3b82f655;margin-bottom:16px">${ic2('trend',18)}<div style="flex:1"><b>Better weights found.</b> <span style="color:var(--t2)">${esc(String(v.notes||'').split(". Odds")[0].replace(/\.$/,""))}.</span>
     <div style="display:flex;gap:8px;margin-top:10px"><button class="b2 pri" style="height:40px" onclick="approve(${v.version})">Use them</button><button class="b2" style="height:40px" onclick="reject(${v.version})">Not now</button></div></div></div>`).join('')}
   <section class="sec2 first"><div class="gh2" style="margin:0"><span>Appraisals per 100 answered calls, last 30 days</span></div>
    <div style="display:flex;align-items:baseline;gap:10px"><span class="big2" style="color:${rate>=t?'#5ee08f':'var(--t1)'}">${rate.toFixed(1)}</span><span style="color:var(--t2)">goal ${t}</span><span style="margin-left:auto;color:${status[1]};font-weight:700;text-align:right">${status[0]}</span></div>
    <div class="meter2"><i style="width:${Math.min(100,rate/t*100)}%;background:${rate>=t?'var(--ap)':'var(--acc)'}"></i></div>
    <div class="pair2"><span><b>${grp('Algorithm')}</b> from the list</span><span><b>${grp('Control')}</b> from random picks</span></div></section>
   ${funnel2(ov)}
   <section class="sec2"><div class="gh2" style="margin:0"><span>Calls a ${S.period}</span>${ch?`<b class="big2" style="font-size:32px;color:var(--t1)">${ch.now}</b>`:''}</div>${ch?ch.svg:'<p class="emptyline">No calls logged yet.</p>'}</section>
   <section class="sec2"><div class="gh2" style="margin:0"><span>Best time to call</span></div>${heatGrid2(ov.times)}</section>
   <section class="sec2"><div class="gh2" style="margin:0"><span>Suburbs booking appraisals, last 90 days</span>${subs.length?`<b>${subs.reduce((a,s)=>a+s.n,0)} booked</b>`:''}</div>
    ${subs.length?subs.map((s,j)=>`<div class="srow2"><span>${esc(s.suburb)}</span><div class="hbt2"><i style="width:${s.n/smax*100}%;background:${j?'#3a4250':'var(--acc)'}"></i></div><b>${s.n}</b></div>`).join(''):'<p class="emptyline" style="margin:0">No appraisals booked in the last 90 days yet.</p>'}</section>
   <section class="sec2" id="tphone"><div class="gh2" style="margin:0"><span>Time on the phone</span></div><p class="emptyline" style="margin:0">Working it out</p></section>
   <details class="sec"><summary>How the algorithm is doing</summary><div>
    <p class="muted" style="margin-top:0">Control calls are random picks. The gap between the two is what the algorithm adds.</p>
    <table><tr><th>Group</th><th>Answered</th><th>Appraisals</th><th>Per 100</th></tr>${(ov.groups||[]).length?ov.groups.map(g=>`<tr><td>${esc(g.grp)} v${g.version??"?"}</td><td>${g.connected}</td><td>${g.appraisals}</td><td>${g.rate??0}</td></tr>`).join(""):`<tr><td colspan="4" class="muted">No calls yet.</td></tr>`}</table>
    <p class="muted">Current weights: ${Object.entries(live?.weights||{}).map(([k,w])=>`${esc(k)} ${w}`).join(", ")}. Every Sunday it tests better weights against your results and asks you here before changing anything.</p></div></details>
   ${ov.failed?`<p class="muted" style="color:var(--bad)">A background update didn't finish. Hayden can see the details.</p>`:""}
  </div></div>`;
  drawPhoneTime();
}
async function drawPhoneTime(){
  const days=PERIOD_DAYS[S.period||'week'], el=()=>$("#tphone"); let w;
  try{ w=await api("work_stats",{days}); }catch{ if(el()) el().querySelector('p').textContent="Couldn't load this right now."; return; }
  const x=el(); if(!x) return; const t=w.totals||{};
  if(!t.calls){ x.querySelector('p').textContent=`No calls logged in the last ${days} days yet.`; return; }
  const noans=t.calls-t.answered, talk=(t.talk_s||0)*t.answered, ring=(t.ring_s||0)*noans+(t.talk_s?0:(t.ring_s||0)*t.answered), betw=((t.prep_s||0)+(t.wrap_s||0))*t.calls;
  const tot=talk+ring+betw;
  x.innerHTML=`<div class="gh2" style="margin:0"><span>Time on the phone, last ${days} days</span><b>${hm2(t.active_s||tot)}</b></div>`+(tot?`
   <div class="split2"><i style="flex:${talk||0.001};background:var(--acc)"></i><i style="flex:${ring||0.001};background:#5b6576"></i><i style="flex:${betw||0.001};background:var(--cb)"></i></div>
   <div class="pair2"><span><b style="color:#93c0ff">${hm2(talk)}</b> talking</span><span><b>${hm2(ring)}</b> ringing</span><span><b style="color:#ffc864">${hm2(betw)}</b> between calls</span><span><b>${t.calls}</b> calls</span></div>`:`<p class="emptyline" style="margin:0">${t.calls} calls logged. The split starts from your next calls.</p>`);
}
let _rs2; addEventListener('resize',()=>{ clearTimeout(_rs2); _rs2=setTimeout(()=>{ if(S.tab==='insights'&&S.ovFull&&!$("#ov").classList.contains("show")) paintInsights(S.ovFull); },200); });

// ---------- older screens in the new frame ----------
window.viewSettings=(function(orig){ return async function(){ await orig();
  const m=$("#main"); if(!m||S.tab!=='settings') return;
  m.insertAdjacentHTML('afterbegin',`<div class="ph2"><h1>Settings</h1></div>
   <div class="g2" style="margin-bottom:14px">${row2('var(--cb)','skip','Auto dial next','After No answer or Not selling, ring the next person straight away',`<span class="sw2 ${S.autodial?'on':''}"><i></i></span>`,'toggleAuto()')}${row2('var(--ns)','ban','Taken off the list','Problems reported and do not calls, bring people back',chev2(),'removedSheet()')}${row2('var(--cb)','clock','Booked call backs','Change the time or cancel',chev2(),'upcomingCB()')}${row2('#4b5565','users','Sign out','','','logout()')}</div>`); }; })(window.viewSettings);
function toggleAuto(){ S.autodial=!S.autodial; try{localStorage.setItem("dp_autodial",S.autodial?"1":"0")}catch{} document.querySelectorAll('.sw2').forEach(s=>s.classList.toggle('on',S.autodial)); toast(S.autodial?"Auto dial is on":"Auto dial is off"); }
window.drawDrops=(function(orig){ return function(){ orig(); $("#main").classList.add('drops2'); $("#main").querySelectorAll('.muted').forEach(e=>{ if(/\(area avg \d+\)/.test(e.textContent)) e.textContent=e.textContent.replace(/\s*\(area avg \d+\)/g,''); }); const top=$("#main .top"); if(top&&!top.querySelector('.pt2')) top.insertAdjacentHTML('afterbegin','<h1 class="pt2">Card drops</h1>'); }; })(window.drawDrops);
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
  toast("Undone. They're back on your list"); S.pick=pid; drawList(); drawProg(); }
async function upcomingCB(){
  openSheet2('Booked call backs','<p class="emptyline">Loading</p>');
  let rows=[]; try{ rows=(await api("upcoming_callbacks")).rows||[]; }catch(e){ openSheet2('Booked call backs',`<p class="emptyline">${esc(e.message)}</p>`); return; }
  S._ucb=rows;
  openSheet2('Booked call backs',rows.length?`<div class="g2">${rows.map((c,i)=>`<div class="r2" style="grid-template-columns:32px minmax(0,1fr) auto"><span class="tile" style="background:var(--cb)">${ic2('clock',17,'#fff')}</span><span class="rt2"><b>${esc(people(c.owner_name)[0]||'Owner unknown')}</b><span>${esc(fmt(c.callback_at))} · ${esc(c.street_address||'')}${c.notes?' · '+esc(c.notes):''}</span></span>
     <span style="display:flex;gap:6px"><button class="b2" style="height:36px;padding:0 12px!important" onclick="moveCB(${i})">Change</button><button class="b2" style="height:36px;padding:0 12px!important" onclick="cancelCB(${i})">Cancel</button></span></div>`).join('')}</div>`
   :'<p class="emptyline">No call backs booked.</p>');
}
function moveCB(i){ const c=S._ucb[i]; if(!c) return; S._cbBack=true;
  openSheet2('New time for '+esc(people(c.owner_name)[0]||'them'),`<input type="datetime-local" id="mcb2" value="${sydInput(new Date(c.callback_at))}" style="height:52px;border-radius:14px;padding:0 14px">
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
   <div class="lh2 pph2"><h1>Appraisals and Listings</h1>
    <div class="seg2 mini">${PTABS.map(k=>[k,PST[k]]).map(([k,v])=>`<button class="${S.pst===k?'on':''}" onclick="S.pst='${k}';viewPipeline(true)">${v[0]} <span style="opacity:.65">${cnt(k)}</span></button>`).join('')}</div>
    <button class="b2 pri" style="height:40px;margin-left:auto" onclick="openAddPipe()" aria-label="Add appraisal or listing">${ic2('plus',18)}<span class="addt">Add</span></button></div>
   <div class="lg4 h"><span></span><span>Owner</span><span>${PST[S.pst][1]}</span><span>Last bought</span><span></span></div>
   ${list.length?list.map(x=>{ const u=aerialUrl(x,PH_SMALL[0],PH_SMALL[1]), id=x.property_id;
     return `<div class="lg4" onclick="pipeSheet(${id})">
      <div class="th3">${u?`<img src="${u}" alt="" loading="lazy" onerror="this.remove()">`:''}</div>
      <div class="nm3"><b>${esc(people(x.owner_name)[0]||'Owner unknown')}</b><span>${esc(x.street_address||'')}${x.suburb?', '+esc(x.suburb):''}</span>${x.notes?`<em class="pn4">${esc(x.notes)}</em>`:''}</div>
      <div class="bt3"><b>${esc(when(x))}</b><span>${x.stage==='listed_other'?'Another agency listed':'From '+esc((SOURCES[x.source||'calls']||'calls').toLowerCase())}</span></div>
      <div class="bt3 pb4">${x.last_sale_date?`<b>${x.last_sale_price?esc(price2(x.last_sale_price)):'Price n/a'}</b><span>${String(x.last_sale_date).slice(0,4)}</span>`:'<span>No sale on record</span>'}</div>
      <div class="ac4">${PNEXT[x.stage].map(([s2,l],i)=>`<button class="b2 ${i===0&&!pBad(s2)?'go4':''}" onclick="event.stopPropagation();setStage(${id},'${s2}')">${l}</button>`).join('')}${x.phone?`<button class="cl3" aria-label="Call" onclick="event.stopPropagation();if(callingAllowed())openUrl('tel:'+${JSON.stringify(String(x.phone))}.replace(/[^0-9+]/g,''))">${ic2('phone',18,'#fff')}</button>`:''}</div></div>`; }).join('')
   :`<div class="empty2"><b>No ${PST[S.pst][0].toLowerCase()} yet</b>${S.pst==='appraisal'?'Book one from the call list and it shows up here.':''}</div>`}
  </div>`;
};
function pipeSheet(id){ const x=(S.pipe||[]).find(r=>r.property_id===id); if(!x) return;
  openSheet2(esc(people(x.owner_name)[0]||x.street_address||'Property'),`<p class="hint2">${esc(x.street_address||'')}${x.suburb?', '+esc(x.suburb):''}</p>
   <div class="g2">${PNEXT[x.stage].map(([s2,l])=>row2(({listed:'var(--lst)',sold:'var(--sld)',withdrawn:'#64748b',appraisal:'var(--ap)'})[s2]||'var(--ns)',pBad(s2)?'x':'check',l,{listed_other:'They listed with someone else. Not counted as ours',withdrawn:'Our listing came off the market',sold:'Our listing sold',listed:'They signed with Dignam'}[s2]||'',chev2(),`closeOv();setStage(${id},'${s2}')`)).join('')}
    ${row2('#4b5565','msg',x.notes?'Edit note':'Add a note',x.notes?esc(x.notes):'',chev2(),`closeOv();stageNote(${id})`)}
    ${row2('#4b5565','tag','Came from',esc(SOURCES[x.source||'calls']),chev2(),`pickSource(${id},'${x.source||'calls'}')`)}
    ${[[x.owner_name,x.phone],[x.owner2_name,x.phone2]].filter(p=>p[1]).map(([n,p])=>row2('var(--ap)','phone',`Call ${esc(firstName(n||''))!=='them'?esc(firstName(n))+' ':''}${esc(fmtPh2(p))}`,'',chev2(),`if(callingAllowed())openUrl('tel:${esc(String(p).replace(/[^0-9+]/g,''))}')`)).join('')}</div>
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
     ${(h.safeguards||[]).length?`<div class="sth2">Safeguards</div><div class="g2">${h.safeguards.map(g=>`<div class="r2"><span class="tile" style="background:${g.ok?'#16a34a':'#d97706'}">${ic2(g.ok?'check':'warn',16,'#fff')}</span><span class="rt2"><b>${esc(g.name)}</b></span><span class="sv2">${Number(g.n).toLocaleString()}</span></div>`).join('')}</div>`:''}
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
   <label><span>File</span><input type="file" id="if" accept=".csv,.json" onchange="S.pending=null;previewCSV()"></label></div><div id="ir" class="hint2"></div>
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
window.openListingMatches=(function(orig){ return function(lid){ orig(lid);
  const t=(S.listings||[]).find(x=>x.id===lid); if(!t) return; const by=buyersFor(t);
  [...document.querySelectorAll('#sheet .lsec .mcard')].forEach((c,i)=>{ const x=by[i]; if(!x) return;
    c.insertAdjacentHTML('beforeend',`<button class="iconbtn" onclick="event.stopPropagation();rejectMatch(${x.l.id},${+t.id},'listing')" aria-label="Remove ${esc(leadTitle(x.l))} from this home" title="Not a match for them"><i class="ti ti-trash"></i></button>`); }); }; })(window.openListingMatches);

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
window.moreSheet2=(function(orig){ return function(id){ S.ecFromSearch=false; S.ecFrom=null; orig(id);
  const g=document.querySelector('#sheet .sb2 .g2'); if(g) g.insertAdjacentHTML('beforeend',row2('#4b5565','users','Edit name and phone','Fix a wrong name or number',chev2(),`editContact2(${id})`)); }; })(window.moreSheet2);
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
window.cancelCB=(function(orig){ return async function(i){ const c=S._ucb[i]; if(!c||!c.reminder_id) return orig(i);
  if(!(await uiAsk(`Cancel the call back with ${people(c.owner_name)[0]||'them'}?`,{ok:'Cancel call back'}))) return upcomingCB();
  try{ await api("reminder",{id:c.reminder_id,cancel:true}); }catch(e){ return toast(e.message); } toast('Call back cancelled'); await loadCallbacks(); upcomingCB(); }; })(window.cancelCB);
window.upcomingCB=(function(orig){ return async function(){ await orig(); const sb=document.querySelector('#sheet .sb2');
  if(sb&&!sb.querySelector('.addp2')) sb.insertAdjacentHTML('afterbegin',`<div class="g2 addp2">${row2('var(--acc)','lead','Add a person','Someone to ring back months or years from now',chev2(),'addPerson2()')}</div>`); }; })(window.upcomingCB);
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
   <label class="fl2">Export from the CRM (CSV or Excel)<input type="file" id="im_file" accept=".csv,.xlsx,.xls,text/csv" onchange="impFile(this.files[0])"></label>
   <label class="fl2">Or paste the rows<textarea id="im_paste" rows="3" placeholder="Copy the enquiry list in the CRM, including the headings, and paste it here" oninput="impParse(this.value)"></textarea></label>
   <p class="hint2" id="im_res" aria-live="polite"></p>
   <button class="b2 pri" id="im_go" onclick="impGo(${listId||'null'})" disabled>Import</button>`,listId?`elSettings(${listId})`:null);
  const s=$('#im_listing'); if(s) s.onchange=()=>{ $('#im_titlew').hidden=s.value!=='other'; }; }
async function impFile(f){ if(!f) return; $('#im_res').textContent='Reading…';
  try{ let rows;
    if(/\.xlsx?$/i.test(f.name)){ const X=await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs'); const wb=X.read(await f.arrayBuffer(),{cellDates:true}); rows=X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:false,defval:''}); }
    else rows=parseCSV(await f.text());
    impRows(rows); }catch(e){ $('#im_res').textContent="Couldn't read that file. "+e.message; } }
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
window.drawCall2=(function(orig){ return function(){ orig(); const r=curCall(); if(!r) return;
  const big=document.querySelector('#main .prop2 .photo2'), small=document.querySelector('#main .pidr2 .photo2');
  if(big&&big.offsetParent) svFill(big,r.property_id,'big'); if(small&&small.offsetParent) svFill(small,r.property_id,'small');
  const nx=queue().find(x=>x.property_id!==r.property_id&&!x.today_outcome&&!S.skipped.has(x.property_id)); if(nx) svGet(nx.property_id,big&&big.offsetParent?'big':'small'); }; })(window.drawCall2);

// Small street photos on list and pipeline rows, loaded only as they scroll into view
function svThumbs(sel,re){ if(S.svOff||DEMO||!('IntersectionObserver' in window)) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; io.unobserve(e.target); const t=e.target, pid=+t.dataset.svp;
    svGet(pid,'small').then(p=>{ if(!p||!t.isConnected) return; let im=t.querySelector('img'); if(!im){ im=document.createElement('img'); im.alt=''; t.prepend(im); } im.onerror=null; im.src=p.url; }); }),{rootMargin:'200px'});
  document.querySelectorAll(sel).forEach(row=>{ const m=(row.getAttribute('onclick')||'').match(re), th=row.querySelector('.th3'); if(m&&th){ th.dataset.svp=m[1]; io.observe(th); } }); }
// Rows keep the free aerial; a paid street photo loads only for the person you open

// Note boxes grow with what you type (up to half the screen, then they scroll), so a long note never runs off the edge
function growTA(t){ if(!t||!t.matches('textarea[data-grow]')) return; t.style.height='auto'; t.style.height=Math.min(t.scrollHeight+2,innerHeight*0.5)+'px'; t.style.overflowY=t.scrollHeight+2>innerHeight*0.5?'auto':'hidden'; }
document.addEventListener('input',e=>growTA(e.target),true);
new MutationObserver(ms=>{ for(const m of ms) m.addedNodes.forEach(n=>{ if(n.nodeType!==1) return; (n.matches?.('textarea[data-grow]')?[n]:[...n.querySelectorAll('textarea[data-grow]')]).forEach(t=>requestAnimationFrame(()=>growTA(t))); }); }).observe(document.body,{childList:true,subtree:true});

// ---------- two owners: both names and both numbers on the call screen ----------
window.numBtn=(function(orig){ return function(r,cls){ const a=orig(r,cls); if(!r.phone2||(r.signals||[]).includes('probate')) return a;
  const n1=firstName(people(r.owner_name)[0]||''), n2=firstName(r.owner2_name||'');
  const one=n1&&n1!=='them'?a.replace(/(<span style="[^"]*">)/,`$1<em class="who2">${esc(n1)}</em>`):a;
  return `<div class="nums2">${one}<a class="${cls} ph2nd" href="tel:${esc(telOf(r.phone2))}" onclick="if(!hoursOk(event))return false;markDial(${r.property_id})">${ic2('phone',cls==='num2'?24:20,'#fff')}<span${cls==='num2'?' style="flex:1"':''}>${n2&&n2!=='them'?`<em class="who2">${esc(n2)}</em>`:''}${esc(fmtPh2(r.phone2))}</span></a></div>`; }; })(window.numBtn);
window.drawCall2=(function(orig){ return function(){ orig(); const r=curCall(); if(!r||!r.owner2_name) return;
  const known=people(r.owner_name).map(s=>s.toLowerCase()); if(known.includes(r.owner2_name.toLowerCase())) return;
  document.querySelectorAll('#main .nm2, #main .pidr2 h1').forEach(h=>{ if(h.dataset.two) return; h.dataset.two='1'; h.insertAdjacentHTML('beforeend',`<span class="and2"> &amp; ${esc(firstName(r.owner2_name))}</span>`); });
  const al=document.querySelector('#main .also2'), t=`Second owner: ${esc(r.owner2_name)}`; if(al) al.insertAdjacentHTML('beforeend',' · '+t); else document.querySelector('#main .nm2')?.insertAdjacentHTML('afterend',`<div class="also2">${t}</div>`); }; })(window.drawCall2);

// Phone boxes tidy themselves into groups when you leave them (0412 345 678, 02 4283 5242)
document.addEventListener('blur',e=>{ const t=e.target; if(!(t instanceof HTMLInputElement)||!(t.type==='tel'||t.inputMode==='tel'||/phone/i.test(t.id))) return;
  const d=t.value.replace(/\D/g,''); if(/^0\d{9}$/.test(d)) t.value=fmtPh2(d); },true);
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
  openSheet2(`Send to ${esc(who.name||'them')}`,`<div class="later2" style="grid-template-columns:repeat(2,minmax(0,1fr))">${opts.map((o,i)=>`<button onclick="swPick(${i},this)"><b>${esc(o[1])}</b></button>`).join('')}</div>
    <div id="sw_list"></div>
    <label class="fl2">Message<textarea id="sw_body" rows="4" data-grow placeholder="Pick one above or write your own"></textarea></label>
    <div class="sw2">${who.phone?`<button class="b2 pri" onclick="swSend('text')">${ic2('msg',18)}Text</button>`:''}${who.email?`<button class="b2" onclick="swSend('email')">${ic2('mail',18)}Email</button>`:''}<button class="b2" onclick="swSend('copy')">Copy</button></div>
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
window.moreSheet2=(function(orig){ return function(id){ orig(id); const r=findRow(id); const g=document.querySelector('#sheet .sb2 .g2'); if(!g||!r) return;
  const who=JSON.stringify({name:people(r.owner_name)[0]||'',phone:r.owner_phone||r.phone||'',property_id:id});
  g.insertAdjacentHTML('afterbegin',row2('var(--acc)','msg','Send info','Recent street sales, a listing, a check in',chev2(),`sendInfo(${esc(who)})`)+row2('#6366f1','users','Refer','To a broker, conveyancer or agent you work with',chev2(),`referSheet(${esc(who)})`)); }; })(window.moreSheet2);
window.pipeSheet=(function(orig){ return function(id){ orig(id); const x=(S.pipe||[]).find(r=>r.property_id===id); const gs=document.querySelectorAll('#sheet .sb2 .g2'); const g=gs[gs.length-1]; if(!g||!x) return;
  const who=JSON.stringify({name:people(x.owner_name)[0]||'',phone:x.phone||'',property_id:id,lead_id:x.lead_id||null});
  g.insertAdjacentHTML('beforeend',row2('var(--acc)','msg','Send info','',chev2(),`sendInfo(${esc(who)})`)+row2('#6366f1','users','Refer','',chev2(),`referSheet(${esc(who)})`)); }; })(window.pipeSheet);

// ---------- Stats: results for the period at the top (appraisals, listings, sold, referrals), then referrals to manage ----------
window.paintInsights=(function(orig){ return function(ov){ orig(ov); const R=ov.results||{}, k=S.period||'week', a=R[k]||{}, b=R[k+'_prev']||{};
  const lab={week:'last week',month:'last month',quarter:'last quarter'}[k];
  const card=(n,l,c,v,pv,fmt)=>{ const d=(+v||0)-(+pv||0); return `<div class="rs2" style="--c:${c}"><span>${l}</span><b>${fmt?fmt(v):(+v||0)}</b><em>${d===0?'Same as '+lab:(d>0?'+':'')+(fmt?fmt(d):d)+' on '+lab}</em></div>`; };
  const html=`<section class="res2" aria-label="Results this ${k}">
    ${card('a','Appraisals',COL.appraisal,a.appraisals,b.appraisals)}${card('l','Listings',COL.listed,a.listed,b.listed)}${card('s','Sold',COL.sold,a.sold,b.sold)}
    ${card('r','Referrals',COL.referral,a.referrals,b.referrals)}${card('f','Referral fees',COL.referral,a.fees,b.fees,n=>'$'+Math.round(+n||0).toLocaleString('en-AU'))}${card('m','Info sent',COL.sent,a.sent,b.sent)}</section>
    <section class="sec2" id="refs2"><div class="gh2" style="margin:0"><span>Referrals</span><button class="b2" style="height:36px" onclick="S.rw=null;partnerSheet()">${ic2('plus',16)}Add who you refer to</button></div><p class="emptyline">Loading…</p></section>`;
  const head=document.querySelector('#main .ph2'); if(head) head.insertAdjacentHTML('afterend',html);
  paintRefs(); }; })(window.paintInsights);
const RST=[['sent','Sent'],['in_progress','In progress'],['won','Won'],['lost','Lost']];
async function paintRefs(){ const el=document.getElementById('refs2'); if(!el) return; let d; try{ d=await api2('referrals'); }catch(e){ el.querySelector('.emptyline').textContent=e.message; return; } S.ref=d;
  const rs=d.referrals||[]; const body=rs.length?`<div class="g2">${rs.slice(0,20).map(r=>`<button class="r2" onclick="refEdit(${r.id})"><span class="rt2"><b>${esc(r.person_name||'Someone')} to ${esc(r.partner||'?')}</b><span>${esc([r.business,dayMon(r.created_at),r.note].filter(Boolean).join(' · '))}</span></span><span class="rtag2" style="--c:${r.status==='won'?COL.sold:r.status==='lost'?COL.lost:COL.referral}">${esc((RST.find(s=>s[0]===r.status)||[])[1]||r.status)}${r.status==='won'&&r.fee?' $'+Math.round(r.fee).toLocaleString('en-AU'):''}</span>${chev2()}</button>`).join('')}</div>`
    :`<p class="emptyline">No referrals yet. Use Refer on a lead, the call screen or Appraisals and Listings.${(d.partners||[]).length?'':' Add the brokers, conveyancers and agents you work with first.'}</p>`;
  el.innerHTML=el.querySelector('.gh2').outerHTML+body+((d.partners||[]).length?`<p class="hint2" style="margin:4px 0 0">You refer to: ${(d.partners||[]).map(p=>`<a href="#" onclick="event.preventDefault();S.rw=null;partnerSheet(S.ref.partners.find(x=>x.id===${p.id}))">${esc(p.name)}</a>`).join(', ')}</p>`:''); }
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
document.addEventListener('click',e=>{ const h=e.target.closest('#main .ph2 h1, #main .pph2 h1'); if(!h) return; const b=document.getElementById('tabbtn')||document.getElementById('ptabbtn'); if(b&&b.offsetParent) navPop(b); });

// ---------- Side bar on computers: every page one click away (the menu took 7 to 30 seconds to use) ----------
const SIDEL={calls:'Calls',enquiry:'Call sheets',leads:'Leads',pipeline:'Appraisals',drops:'Card drops',insights:'Stats',settings:'Settings'};
window.render=(function(orig){ return async function(){ const p=orig(); const sh=document.getElementById('shell');
  if(sh&&S.token&&!sh.querySelector('.side2')){ const nl=(S.leads||[]).filter(l=>newMatches(l).length).length;
    sh.insertAdjacentHTML('afterbegin',`<nav class="side2" aria-label="Pages">${TABS2.map(([k])=>`<button class="${k===S.tab&&!S.searching?'on':''}" onclick="closePop2();closeOv();go('${k}')" aria-label="${esc(TABS2.find(t=>t[0]===k)[1])}"${k===S.tab?' aria-current="page"':''}><span class="si" style="--c:${NAVI[k][0]}">${ic2(NAVI[k][1],20,'#fff')}${k==='leads'&&nl?'<i class="dot"></i>':''}</span><span class="sl">${SIDEL[k]}</span></button>`).join('')}</nav>`); }
  return p; }; })(window.render);
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
