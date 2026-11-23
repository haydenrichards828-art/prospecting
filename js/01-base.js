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
 chev:'M9 6l6 6-6 6', menu:'M4 6h16M4 12h16M4 18h10', back:'M15 6l-6 6 6 6', down:'M6 9l6 6 6-6', msg:'M4 5h16v11H8l-4 4zM8 10h8',
 star:'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z', warn:'M12 3l10 18H2zM12 10v5M12 18h.01',
 ban:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M5.6 5.6l12.8 12.8', cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
 search:'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14M20 20l-4-4', house:'M3 11l9-7 9 7v9H3z', send:'M4 12l16-8-6 16-3-7z', chart:'M4 20V10M10 20V4M16 20v-7M22 20H2',
 gear:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
 mail:'M3 6h18v12H3zM3 7l9 6 9-6', plus:'M12 5v14M5 12h14', flag:'M5 21V4M5 4h11l-2 4 2 4H5', user:'M18 21v-2a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', check:'M5 12l5 5 9-10',
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
const RC2={users:'#7c3aed',tag:'#d97706',trend:'#16a34a',land:'#0d9488',clock:'#2563eb',house:'#db2777',bed:'#0891b2',fire:'#dc2626',drop:'#0284c7',cal:'#b45309'};   // each kind of reason has its own colour
const LVW6={Strong:'Strong sign',Medium:'Some sign',Light:'Weak sign',Note:'Note'};   // plain words under each reason
const LVL2={Strong:['var(--acc)','#93c0ff'],Medium:['#6366f1','#a5b4fc'],Light:['#475063','var(--t2)'],Note:['#b45309','#ffc864']};

// ---------- small helpers ----------
const row2=(tile,icon,title,sub='',right='',on='')=>`<${on?'button':'div'} class="r2" ${on?`onclick="${on}"`:''}><span class="tile" style="--c:${tile}">${ic2(icon,17,'#fff')}</span><span class="rt2"><b>${title}</b>${sub?`<span>${sub}</span>`:''}</span>${right||'<span></span>'}</${on?'button':'div'}>`;
const chev2=()=>ic2('chev',16,'var(--t3)');
// A phone field can hold more than one number ("0491 570 156 (M) 0491 570 157"). Keep them apart.
const phList=p=>{ const t=String(p||''); const m=t.match(/(?:\+?61[\s-]?\(?0?\)?|\(?0)[2-578]\)?(?:[\s-]?\d){8}/g); if(m&&m.length) return m.map(x=>{ let d=x.replace(/\D/g,''); if(d.startsWith('61')) d='0'+d.slice(2).replace(/^0/,''); return d; }).filter((d,i,a)=>a.indexOf(d)===i); const d=t.replace(/[^\d]/g,''); return d?[d]:[]; };
const fmtOne2=d=>/^0[2378]\d{8}$/.test(d)?d.replace(/^(\d{2})(\d{4})(\d{4})$/,'$1 $2 $3'):d.replace(/^(\d{4})(\d{3})(\d{3})$/,'$1 $2 $3');
const fmtPh2=p=>phList(p).map(fmtOne2).join(', ');
const telOf=p=>{ const t=String(p||''); return t.trim().startsWith('+')&&phList(t).length<2?t.replace(/[^\d+]/g,''):(phList(t)[0]||''); };
const price2=v=>v?(v>=1e6?'$'+(Math.round(v/1e4)/100)+'m':'$'+Math.round(v/1e3)+'k'):'';
const yrsSince=d=>{ if(!d) return null; const y=(Date.now()-new Date(d+'T12:00:00Z'))/(365.25*864e5); return y>=0?Math.floor(y):null; };
const monYear=d=>{ const x=new Date(String(d).slice(0,10)+'T12:00:00Z'); return isNaN(x)?'':MONF[x.getUTCMonth()]+' '+x.getUTCFullYear(); };
const dayMon=iso=>{ if(!iso) return ''; const s=String(iso); const x=/^\d{4}-\d\d-\d\d$/.test(s)?new Date(s+'T12:00:00Z'):new Date(s); return x.toLocaleDateString('en-AU',{timeZone:/^\d{4}-\d\d-\d\d$/.test(s)?'UTC':'Australia/Sydney',day:'numeric',month:'short'}); };
const dayMonLong=iso=>{ if(!iso) return ''; const x=new Date(iso); return x.toLocaleDateString('en-AU',{timeZone:'Australia/Sydney',day:'numeric',month:'long'}); };
const hl2=h=>(h%12||12)+(h<12?'am':'pm');
const firstName=n=>((people(n)[0]||'').split(' ')[0])||'them';

// ---------- why each person is on the list ----------
const RC={wd:['#d97706','var(--cbT)','tag','Withdrawn'],pb:['#64748b','#cbd5e1','users','Estate'],st:['#0891b2','#a5f3fc','trend','Street sale'],da:['#8b5cf6','#ddd6fe','land','DA lodged'],lh:['#6366f1','#c7d2fe','clock','Long hold'],crm:['#3b82f6','#93c0ff','users','In CRM'],inv:['#0d9488','#5eead4','house','Investor'],cb:['#d97706','var(--cbT)','cal','Call back'],gen:['#475063','var(--t2)','tag','On the list']};
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
    return `<div class="cc2"><i style="background:#14b8a6"></i><div><div class="h"><b style="color:#5eead4">${esc(e.who||'Dignam')}</b><span class="lab2">${esc(when(e.at))}</span></div><p>${esc(e.text)}</p></div></div>`; }).join('');
}

// ---------- photos: NSW aerial imagery plus a Street View link ----------
function aerialUrl(r,w=640,h=440){ if(r.lat==null||r.lng==null) return null; const la=+r.lat, lo=+r.lng, vs=0.00055, hs=vs*(w/h)/0.829;
  return `https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer/export?bbox=${(lo-hs).toFixed(6)},${(la-vs).toFixed(6)},${(lo+hs).toFixed(6)},${(la+vs).toFixed(6)}&bboxSR=4326&imageSR=3857&size=${w},${h}&format=jpg&f=image`; }
const svUrl=r=>r.lat!=null?`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${(+r.lat).toFixed(6)},${(+r.lng).toFixed(6)}`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rpAddress(r.street_address,r.suburb,r.postcode))}`;
// Sized to where it shows: a small square on the phone, a wide photo on a computer. Only the one on screen loads.
const PH_SMALL=[240,240], PH_BIG=[640,440];
function photo2(r,style,big,on=true){ const sz=big?PH_BIG:PH_SMALL, u=aerialUrl(r,sz[0],sz[1]);
  return `<div class="photo2" style="${style||''}" role="group" aria-label="Photo of ${esc(r.street_address||'the house')}">${u?`${on?`<img src="${u}" alt="" fetchpriority="high" decoding="async" onerror="this.remove()">`:''}<span class="pinm"></span>`:`<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--t3)">${ic2('house',big?28:18)}</span>`}
   ${big?`${u?'<span class="credit">Imagery © NSW Spatial Services</span>':''}<a class="sv" href="${svUrl(r)}" target="_blank" rel="noopener">${ic2('eye',15)}Street View</a>`:''}</div>`; }

// ---------- shell ----------
function ensureExtras(){
  if(!$("#pop2")) document.body.insertAdjacentHTML('beforeend','<div id="popscrim2" onclick="closePop2()"></div><div id="pop2" role="menu"></div><div id="acc2"></div>');
}
const PTITLE2={appraisal:'Appraisals',listed:'Listings',sold:'Sold',withdrawn:'Withdrawn',lost:'Lost'};
function tabName(){ if(!S.searching&&S.tab==='pipeline') return PTITLE2[S.pst||'appraisal']||'Appraisals'; return S.searching?'Search':(TABS2.find(t=>t[0]===S.tab)||[,S.tab==='messages'?'Texts':'Prospect'])[1]; }
function hasDot(){ return (S.ov?.ready_texts||0)>0 || (S.leads||[]).some(l=>newMatches(l).length); }
function tabBtn(id){ return `<span class="tabbtn" id="${id}">${tabName()}</span>`; }
// Calls: the list needs no switch (tap anyone to start calling); the calling screen gets one way back to the list
function vseg2(){ return S.tab==='calls'&&!S.searching&&S.view==='call'?`<button class="vbk5" onclick="setView('list')" aria-label="Back to the list">${ic2('back',16)}<span>List</span></button>`:''; }
function setView(v){ S.view=v; S.dialer=v!=='list'; try{localStorage.setItem("dp_view",v)}catch{} if(v==='list') S.pick=null; render(); }
function closePop2(){ $("#pop2")?.classList.remove('show'); $("#popscrim2")?.classList.remove('show'); }
function v2search(v){ const m=$("#main"); if(m) m.className='v2main old'; if(!desk2()) S.psearch=S.psearch||!!v; hSearch(v); }
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
   <main id="main" class="v2main${v2tab?'':' old'}"><div class="sk6" role="status" aria-label="Loading"><i></i><i></i><i></i><i></i><i></i><i></i></div></main></div></div>`;
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

