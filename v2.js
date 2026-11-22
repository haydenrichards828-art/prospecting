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
// A phone field can hold more than one number ("0414 872 772 (M) 0417 962 446"). Keep them apart.
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
  return `<div class="photo2" style="${style||''}" role="img" aria-label="Aerial photo of ${esc(r.street_address||'the house')}">${u?`${on?`<img src="${u}" alt="" fetchpriority="high" decoding="async" onerror="this.remove()">`:''}<span class="pinm"></span>`:`<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--t3)">${ic2('house',big?28:18)}</span>`}
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
  const tile=l=>`<span class="tile" style="--c:${TCOL2[l.temperature]||'#4b5565'}">${ic2(hasCriteria(l.buy)?'search':'lead',16,'#fff')}</span>`;
  const nw=l=>{ const n=newMatches(l).length; return n?`<em class="nw4">${n} new match${n>1?'es':''}</em>`:''; };
  const table=`<div class="ltab2"><div class="lt2 h"><span>Lead</span><span>Status</span><span>Due</span><span class="c4">Notes</span><span class="c5">Last spoke</span><span></span></div>${ls.map(l=>`<div class="lt2" onclick="openLead(${l.id})" data-lq="${esc([l.name,l.address,l.suburb,l.phone].join(' ').toLowerCase())}">
     <div class="ltn">${tile(l)}<div><b>${esc(leadTitle(l))}${nw(l)}</b><span>${esc(sub(l))}</span></div></div>
     <span class="ltnote" style="color:var(--t1)">${l.status&&l.status!=='Lead'?`<b style="color:${/^(Listed|Sold)$/.test(l.status)?'#5ee08f':/Appraisal/.test(l.status)?'#93c0ff':'var(--t2)'};margin-right:6px">${esc(l.status)}</b>`:''}</span>
     <b style="color:${dueCol(l.follow_up)};font-size:14px">${esc(dueLabel(l.follow_up))}</b><span class="ltnote c4">${esc(latest(l))}</span><span class="c5" style="font-size:14px;color:var(--t2)">${l.last_contact?esc(dayMon(l.last_contact)):''}</span>
     <div class="lbtns">${l.phone?`<a class="ib2" href="${smsLink(l.phone,'')}" onclick="event.stopPropagation()" aria-label="Text">${ic2('msg',17,'#fff')}</a><a class="ib2 call" href="tel:${esc(telOf(l.phone))}" onclick="event.stopPropagation()" aria-label="Call">${ic2('phone',17,'#fff')}</a>`:''}</div></div>`).join('')}</div>`;
  const list=`<div class="g2">${ls.map(l=>`<button class="r2" onclick="openLead(${l.id})">${tile(l)}<span class="rt2"><b>${esc(leadTitle(l))}</b><span>${esc(sub(l))}</span></span><span style="display:flex;align-items:center;gap:4px;font-size:13px;font-weight:700;color:${dueCol(l.follow_up)};white-space:nowrap">${esc(dueLabel(l.follow_up).replace('Follow up today','Today').replace('No follow up set','No date'))}${chev2()}</span></button>`).join('')}</div>`;
  m.innerHTML=`<div class="pg2">${head}${D?table:list}${S.leadsClosed?`<p class="emptyline" style="text-align:center;margin-top:16px">${S.leadsClosed} closed or do not contact leads hidden</p>`:''}</div>`;
}

// ---------- stats ----------
const PERIOD_DAYS={week:7,month:30,quarter:91}, PERIOD_WD={week:5,month:21,quarter:63};
function callChart2(ov,mode){
  const raw=(ov.periods||{})[mode]||[]; if(!raw.length) return null;
  const lab=s=>{ const d=new Date(s+'T12:00:00Z'); return mode==='week'?`${d.getUTCDate()} ${MONS[d.getUTCMonth()]}`:mode==='month'?MONS[d.getUTCMonth()]:`Q${Math.floor(d.getUTCMonth()/3)+1}`; };
  const groups=raw.map(x=>[+x.n||0,lab(x.start)]);
  const goal=(ov.settings?.daily_target||100)*PERIOD_WD[mode], ph=!desk2()||innerWidth>=1100, fm=n=>n.toLocaleString('en-AU');   // the Stats dashboard puts this chart in a narrow column, so it uses the compact drawing
  const W=ph?360:Math.max(560,Math.round(($("#main")?.clientWidth||944)-64)), H=ph?220:260, L=6, R=6, T=34, B=26, iw=W-L-R, ih=H-T-B, max=Math.max(goal,...groups.map(g=>g[0]))*1.15;
  const y=v=>T+ih-(v/max)*ih, n=groups.length, cw=iw/n, gap=ph?5:10, fs=ph?10:12;
  let g=`<line x1="${L}" x2="${W-R}" y1="${y(goal)}" y2="${y(goal)}" stroke="#5ee08f" stroke-opacity=".55" stroke-dasharray="4 5"/><text x="${W-R}" y="${y(goal)-6}" fill="#5ee08f" font-size="${fs}" text-anchor="end">goal ${fm(goal)}</text>`;
  groups.forEach(([v,l],i)=>{ const x0=L+i*cw+gap/2, w=cw-gap, yy=Math.min(y(v),T+ih-6), ch=i?v-groups[i-1][0]:null;
    const last0=i===n-1, up=!last0&&ch!==null&&ch>0&&(!v||ch/v>.03), down=!last0&&ch!==null&&ch<0, col=up?'#34d399':down?'#f0a92b':'#9ba4b2', last=i===n-1;
    g+=`<rect x="${x0}" y="${yy}" width="${w}" height="${T+ih-yy}" rx="8" fill="${last?'#1e2a3d':'#1a1f26'}"/><rect x="${x0}" y="${yy}" width="${w}" height="4" rx="2" fill="${last?'#3b82f6':col}"/>`;
    g+=`<text x="${x0+w/2}" y="${yy-8}" fill="#f2f4f7" font-size="${ph?11:15}" font-weight="700" text-anchor="middle">${fm(v)}</text>`;
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
   <section class="sec2"><div class="gh2" style="margin:0"><span>Calls a ${S.period}</span>${ch?`<b class="big2" style="font-size:28px;color:var(--t1)">${ch.now}</b>`:''}</div>${ch?ch.svg:'<p class="emptyline">No calls logged yet.</p>'}</section>
   <section class="sec2"><div class="gh2" style="margin:0"><span>Best time to call</span></div>${heatGrid2(ov.times)}</section>
   <section class="sec2"><div class="gh2" style="margin:0"><span>Suburbs booking appraisals, last 90 days</span>${subs.length?`<b>${subs.reduce((a,s)=>a+s.n,0)} booked</b>`:''}</div>
    ${subs.length?subs.map((s,j)=>`<div class="srow2"><span>${esc(s.suburb)}</span><div class="hbt2"><i style="width:${s.n/smax*100}%;background:${j?'#3a4250':'var(--acc)'}"></i></div><b>${s.n}</b></div>`).join(''):'<p class="emptyline" style="margin:0">No appraisals booked in the last 90 days yet.</p>'}</section>
   <section class="sec2" id="tphone"><div class="gh2" style="margin:0"><span>Time on the phone</span></div><p class="emptyline" style="margin:0">Working it out</p></section>
   <details class="sec"><summary>How the algorithm is doing</summary><div>
    <p class="muted" style="margin-top:0">Control calls are random picks. The gap between the two is what the algorithm adds.</p>
    <table><tr><th>Group</th><th>Answered</th><th>Appraisals</th><th>Per 100</th></tr>${(ov.groups||[]).length?ov.groups.map(g=>`<tr><td>${esc(g.grp)} v${g.version??"?"}</td><td>${g.connected}</td><td>${g.appraisals}</td><td>${g.rate??0}</td></tr>`).join(""):`<tr><td colspan="4" class="muted">No calls yet.</td></tr>`}</table>
    <p class="muted">Current weights: ${Object.entries(live?.weights||{}).map(([k,w])=>`${esc(k)} ${w}`).join(", ")}. Every Sunday it tests better weights against your results and asks you here before changing anything.</p></div></details>

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
  toast("Undone. They're back on your list"); S.pick=pid; drawList(); drawProg(); }
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
document.addEventListener('input',e=>growTA(e.target),true);
new MutationObserver(ms=>{ for(const m of ms) m.addedNodes.forEach(n=>{ if(n.nodeType!==1) return; (n.matches?.('textarea[data-grow]')?[n]:[...n.querySelectorAll('textarea[data-grow]')]).forEach(t=>requestAnimationFrame(()=>growTA(t))); }); }).observe(document.body,{childList:true,subtree:true});

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
    ${who.phone&&!canText6()?'<p class="hint2">This computer can\'t send texts. Copy it and send it from your phone.</p>':''}
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
  ph.querySelector('h1')?.insertAdjacentHTML('afterend',`<button class="fqb2" data-n="${n}" onclick="fqStart()" title="Call the leads due for a follow up, one after another">${ic2('phone',15)}<span>Call ${n} follow up${n===1?'':'s'}</span></button>`); }; })(window.drawLeads);

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
// Stats: hides the old Better weights found note
window.paintInsights=(function(orig){ return function(...a){ const r=orig(...a); document.querySelectorAll('#main .warn2').forEach(w=>{ if(/Better weights found/.test(w.textContent)) w.remove(); }); return r; }; })(window.paintInsights);
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

// ---------- Card drops: one toolbar, map and list fill the screen, maps can go full screen ----------
function dropsTidy5(){ try{
  const top=document.querySelector('#main > .top'); if(!top||!top.querySelector('.dfb2')&&!top.classList.contains('dtb5')) return;
  // Map / List lives in the top bar beside the page name
  const head=document.querySelector('header.top2'), vs=[...top.querySelectorAll('.seg')].find(g=>/^Map/.test(g.textContent.trim()));
  if(head&&vs&&innerWidth>=900){ head.querySelectorAll('.dvw5').forEach(x=>x.remove()); vs.classList.add('lift5','dvw5'); head.querySelector('.tabbtn')?.after(vs);
    if(!document.querySelector('#main .l5mark')) document.getElementById('main').insertAdjacentHTML('afterbegin','<i class="l5mark" hidden></i>'); }
  if(!document.querySelector('.dsplit')){ // list view: print and download go in the top bar, nothing else is needed here
    top.querySelector('h1.pt2')?.remove(); top.querySelector('.dfb2')?.remove(); document.querySelectorAll('#main > .dflt2').forEach(x=>x.remove());
    if(head&&innerWidth>=900){ const srch=head.querySelector('.tsearch'); top.querySelectorAll('.iconbtn').forEach(b=>{ b.classList.add('lift5','dic5'); srch?srch.before(b):head.appendChild(b); }); }
    if(!top.querySelector('button,.seg')) top.remove();
    return; }
  if(!top.querySelector('.dfb2')) return; top.classList.add('dtb5');
  top.classList.add('dtb5'); top.querySelector('h1.pt2')?.remove();
  const sideTop=document.querySelector('.dside > .top'); const g=sideTop?.querySelector('.seg');
  // Streets / Suburbs only changes the list, so it heads the list
  const side=document.querySelector('.dside');
  if(g&&side&&!side.querySelector('.dgrp5')){ g.classList.add('dgrp5'); const h=document.createElement('div'); h.className='dsh5'; h.appendChild(g); side.prepend(h); }
  sideTop?.remove();
  if(!top.querySelector('.seg:not(.dgrp5), .iconbtn, button:not(.dfb2)')) top.classList.add('dtb5e');
  top.querySelector('.dfb2')?.remove();
  dfBtn5(); fitDrops5();
}catch(e){ console.error(e); } }
function fitDrops5(){ const m=$('#dmap'), s=document.querySelector('.dside'); if(!m||innerWidth<1000) { if(m) m.style.height=''; if(s) s.style.maxHeight=''; return; }
  const h=Math.max(320,innerHeight-m.getBoundingClientRect().top); m.style.height=h+'px'; if(s){ s.style.height=h+'px'; s.style.maxHeight=h+'px'; s.style.overflow='auto'; }
  try{ S.map&&S.map.invalidateSize(); }catch{} }
addEventListener('resize',()=>{ if(S.tab==='drops') fitDrops5(); });
// Card drops: tidy toolbar, full screen and map controls
window.drawDrops=(function(orig){ return function(...a){ const r=orig(...a); dropsTidy5(); mapFsBtn5('dmap',()=>S.map); mapCtl5(); return r; }; })(window.drawDrops);
// Card drops list: tidy after each redraw
window.drawBest=(function(orig){ return function(...a){ const r=orig(...a); dropsTidy5(); return r; }; })(window.drawBest);
// Full screen for any map: the button sits on the map; Esc or the same button comes back
function mapFsBtn5(id,getMap){ let n=0; const t=setInterval(()=>{ const el=document.getElementById(id); if(!el||++n>40){ clearInterval(t); return; }
  if(!el.classList.contains('leaflet-container')) return; clearInterval(t); if(el.querySelector('.mfs5')) return;
  el.insertAdjacentHTML('beforeend',`<button class="mfs5" aria-label="Full screen map" title="Full screen" onclick="event.stopPropagation();mapFs5('${id}')">${FS5_IN}</button>`);
  L.DomEvent.disableClickPropagation(el.querySelector('.mfs5')); el._fsMap=getMap; },75); }
const FS5_IN='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
const FS5_OUT='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
function mapFs5(id){ const el=document.getElementById(id); if(!el) return; const on=!el.classList.contains('mfull5');
  el.classList.toggle('mfull5',on); document.body.classList.toggle('mfs5on',on); const b=el.querySelector('.mfs5'); if(b){ b.innerHTML=on?FS5_OUT:FS5_IN; b.setAttribute('aria-label',on?'Leave full screen':'Full screen map'); }
  [0,120,350].forEach(t=>setTimeout(()=>{ try{ el._fsMap&&el._fsMap()?.invalidateSize(); }catch{} },t)); }
addEventListener('keydown',e=>{ if(e.key==='Escape'){ const f=document.querySelector('.mfull5'); if(f){ e.stopPropagation(); mapFs5(f.id); } } },true);
// The call sheet map gets the same button
window.areaSheet=(function(orig){ return async function(pid){ const r=await orig(pid); mapFsBtn5('ar3m',()=>S.area3?.map); return r; }; })(window.areaSheet);

// Card drop map controls float on the map, like Google Maps: Plan a walk and Filters top left, full screen top right
const MX5_DEF={sales:false,pipe:true,dropped:true};
function mx5(){ if(!S.mx){ try{ S.mx={...MX5_DEF,...JSON.parse(localStorage.getItem('dp_mx')||'{}')}; }catch{ S.mx={...MX5_DEF}; } } return S.mx; }
function mxSave5(){ try{ localStorage.setItem('dp_mx',JSON.stringify(S.mx)); }catch{} }
function dfActive5(){ const m=mx5(), L5=lays5(); return !(L5.size===1&&L5.has('pins'))||streetShown().size<STREET_KEYS.length||Object.keys(MX5_DEF).some(k=>m[k]!==MX5_DEF[k]); }
function mapCtl5(){ let n=0; const t=setInterval(()=>{ const el=document.getElementById('dmap'); if(!el||++n>40){ clearInterval(t); return; }
  if(!el.classList.contains('leaflet-container')) return; clearInterval(t); if(el.querySelector('.mctl5')) return dfBtn5();
  el.insertAdjacentHTML('beforeend',`<div class="mctl5"><button class="wkb5" onclick="event.stopPropagation();walkPick5()">${ic2('pin',16)}<span>Plan a walk</span></button><button class="dfb5" onclick="event.stopPropagation();dfPanel5()"></button></div>`);
  const c=el.querySelector('.mctl5'); L.DomEvent.disableClickPropagation(c); L.DomEvent.disableScrollPropagation(c); dfBtn5(); },75); }
function dfBtn5(){ const b=document.querySelector('#dmap .dfb5'); if(!b) return; b.classList.toggle('on',!!document.querySelector('.dfp5'));
  b.innerHTML=`${ic2('menu',16)}<span>Filters</span>${dfActive5()?'<i></i>':''}`; const w=document.querySelector('#dmap .wkb5'); if(w) w.classList.toggle('on',!!document.querySelector('.wkp5')||!!S.walk); }
function pop5(cls,html){ const m=document.getElementById('dmap'); if(!m) return; document.querySelectorAll('.dfp5,.wkp5').forEach(x=>x.remove());
  m.insertAdjacentHTML('beforeend',html); const p=m.querySelector('.'+cls); L.DomEvent.disableClickPropagation(p); L.DomEvent.disableScrollPropagation(p); dfBtn5();
  setTimeout(()=>document.addEventListener('click',popOut5,true),0); }
function popClose5(){ document.querySelectorAll('.dfp5,.wkp5').forEach(x=>x.remove()); dfBtn5(); document.removeEventListener('click',popOut5,true); }
function popOut5(e){ const p=document.querySelector('.dfp5,.wkp5'); if(!p){ document.removeEventListener('click',popOut5,true); return; } if(p.contains(e.target)||e.target.closest('.mctl5')) return; popClose5(); }
function dfPanel5(){ if(document.querySelector('.dfp5')) return popClose5(); pop5('dfp5',dfHTML5()); }
function dfHTML5(){ const m=mx5();
  const nPipe=(S.pipe||[]).filter(x=>x.lat!=null&&['appraisal','listed'].includes(x.stage)).length, nSales=S.rsales?S.rsales.length:null;
  const nDrop=(S.streets||[]).filter(st=>{ const ids=st.ids||[]; return ids.length&&ids.every(id=>{ const x=(S.drops||[]).find(d=>d.id===id); return x&&isDropped(x); }); }).length;
  const row=(k,l,n)=>`<label class="dfr5"><input type="checkbox" ${m[k]?'checked':''} onchange="mx5().${k}=this.checked;mxSave5();mapExtras3();dfRefresh5()"><span>${l}${n!=null?` <em>(${n})</em>`:''}</span></label>`;
  return `<div class="dfp5" role="dialog" aria-label="Map filters">
   <div class="dfh5"><b>Filter</b><button class="dfx5" onclick="S.mx={...MX5_DEF};mxSave5();layReset5()">Clear all</button></div>
   <div class="dfs5">Map style</div>
   <div class="dft5">${[['pins','Pins'],['heat','Heat'],['streets','Streets']].map(([v,l])=>`<button class="${lays5().has(v)?'on':''}" aria-pressed="${lays5().has(v)}" onclick="layToggle5('${v}')">${l}</button>`).join('')}</div>
   ${lays5().has('streets')?`<div class="dfs5">Streets most likely to sell</div><div class="dtr5">${STREET_KEYS.map(k=>`<button class="${streetShown().has(k)?'on':''}" onclick="toggleTier('${k}');dfRefresh5()"><i style="background:${{most:STREET_TIERS[0][2],likely:STREET_TIERS[1][2],some:STREET_TIERS[2][2],done:'#9aa3ad',rest:'#c9ced4'}[k]}"></i>${STREET_LABELS[k]}</button>`).join('')}</div>`:''}
   <div class="dfs5">Show on map</div>
   <div class="dfb5x">${row('pipe','Our appraisals and listings',nPipe)}${row('sales','Recent sales',nSales)}${row('dropped','Dropped dates',nDrop)}</div>
   <div class="dff5"><button class="pri" onclick="popClose5()">Done</button><button class="pri" onclick="S.mx={...MX5_DEF};mxSave5();layReset5()">Reset</button></div></div>`; }
function dfRefresh5(){ const p=document.querySelector('.dfp5'); if(p){ const m=document.getElementById('dmap'); p.remove(); m.insertAdjacentHTML('beforeend',dfHTML5()); const q=m.querySelector('.dfp5'); L.DomEvent.disableClickPropagation(q); L.DomEvent.disableScrollPropagation(q); } dfBtn5(); }
// Plan a walk: pick the suburb only when you ask for a walk
function walkPick5(){ if(document.querySelector('.wkp5')) return popClose5(); const subs=walkSubs3().slice(0,12);
  pop5('wkp5',`<div class="wkp5 dfp5x" role="dialog" aria-label="Plan a walk"><div class="dfh5"><b>Plan a walk</b>${S.walk?'<button class="dfx5" onclick="popClose5();walkClear3()">Clear walk</button>':''}</div>
   <div class="dfs5">Which suburb?</div><div class="dfb5x">${subs.map(o=>`<button class="wkr5${o.sub===S.walkSub?' on':''}" onclick="walkGo5(this.dataset.s)" data-s="${esc(o.sub)}"><span>${esc(o.sub)}</span><em>${Math.min(8,o.n)} streets</em></button>`).join('')||'<p class="emptyline" style="padding:12px">No streets to walk yet</p>'}</div></div>`); }
function walkGo5(sub){ popClose5(); S.walkSub=sub; const sel=document.getElementById('wksub'); if(sel){ if(![...sel.options].some(o=>o.value===sub)) sel.insertAdjacentHTML('beforeend',`<option>${esc(sub)}</option>`); sel.value=sub; } walk3(); }
// Card drop map: Filters button shows when something is changed
window.drawDropLayer=(function(orig){ return function(...a){ const r=orig(...a); dfBtn5(); return r; }; })(window.drawDropLayer);
// Outside legal calling hours: one warning when you tap any call link, instead of banners on every screen
document.addEventListener('click',e=>{ const a=e.target.closest('a[href^="tel:"]'); if(!a) return; if(/hoursOk/.test(a.getAttribute('onclick')||'')) return; hoursOk(e); },true);
// Desktop: a page's own strip (count, switches, Add) moves up into the top bar, so the work area starts at the top
function lift5(){ try{
  const main=document.getElementById('main'), head=document.querySelector('header.top2'); if(!main||!head) return;
  const ph=main.querySelector('.ph2');
  if(!ph){ if(!main.querySelector('.l5mark')) head.querySelectorAll('.lift5').forEach(x=>x.remove()); return; }
  if(innerWidth<900||ph.closest('#sheet')) return;
  head.querySelectorAll('.lift5').forEach(x=>x.remove());
  const title=head.querySelector('.tabbtn'), search=head.querySelector('.tsearch');
  [...ph.children].forEach(c=>{
    if(c.tagName==='H1') return;
    c.classList.add('lift5');
    if(c.matches('span.muted')){ c.classList.add('hc5'); title?title.after(c):head.prepend(c); return; }
    if(c.matches('button.b2.pri')){ c.classList.add('hadd5'); head.appendChild(c); return; }
    search?search.before(c):head.appendChild(c);
  });
  ph.replaceWith(Object.assign(document.createElement('i'),{className:'l5mark',hidden:true}));
}catch(e){ console.error(e); } }
new MutationObserver(()=>{ if(window.__l5q) return; window.__l5q=1; queueMicrotask(()=>{ window.__l5q=0; lift5(); }); }).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
addEventListener('resize',()=>{ clearTimeout(window.__l5r); window.__l5r=setTimeout(()=>{ if(innerWidth<900&&document.querySelector('.lift5')) render(); },200); });

// Copy address: an icon instead of the word
const COPYIC5='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>';

// Map styles can be mixed: any of Pins, Heat and Streets at once. Heat sits at the bottom, pins on top.
function lays5(){ if(!S.dlays){ try{ const v=JSON.parse(localStorage.getItem('dp_dlays')||'null'); S.dlays=new Set(Array.isArray(v)?v:['pins']); }catch{ S.dlays=new Set(['pins']); } } return S.dlays; }
function laySave5(){ try{ localStorage.setItem('dp_dlays',JSON.stringify([...lays5()])); }catch{} }
function layToggle5(v){ const L5=lays5(); L5.has(v)?L5.delete(v):L5.add(v); laySave5(); drawDropLayer(); dfRefresh5(); }
function layReset5(){ S.dlays=new Set(['pins']); laySave5(); S.stiers=new Set(STREET_KEYS); try{localStorage.removeItem('dp_stiers')}catch{} drawDropLayer(); dfRefresh5(); }
// Card drop map: Pins, Heat and Streets can be shown together
window.drawDropLayer=(function(orig){ return function(){
  if(!S.map) return orig();
  if(S.dlay){ try{ S.map.removeLayer(S.dlay); }catch{} S.dlay=null; }
  const keep=[];
  for(const v of ['heat','streets','pins']){ if(!lays5().has(v)) continue; S.dlayer=v; orig(); if(S.dlay){ keep.push(S.dlay); if(v==='streets') widen5(S.dlay); S.dlay=null; } }
  if(S.dleg){ S.dleg.remove(); S.dleg=null; }   // the street key lives in the Filters panel now
  if(!keep.length){ orig.__none=1; } 
  keep.forEach(l=>{ try{ S.map.removeLayer(l); }catch{} });
  S.dlay=L.layerGroup(keep).addTo(S.map); S.dlayer=[...lays5()][0]||'pins';
  if(S.walk&&S.dlay) S.map.removeLayer(S.dlay);
  dfBtn5();
}; })(window.drawDropLayer);
// Streets are easy to tap: an invisible wide line sits over each one and opens the same details
function widen5(group){ try{ const extra=[]; group.eachLayer(l=>{ if(!(l instanceof L.Polyline)) return;
  const t=L.polyline(l.getLatLngs(),{weight:24,opacity:0.001,lineCap:'round',interactive:true});
  t.on('click',e=>{ l.openPopup(e.latlng); }); extra.push(t); }); extra.forEach(t=>group.addLayer(t)); }catch(e){ console.error(e); } }

// Board Leads column: find any lead to drag, and show exactly as many cards as fit the screen
function bqv5(k){ return String((S.bq5o||{})[k]||'').trim().toLowerCase(); }
function pm5(x,k){ const q=bqv5(k); if(!q) return true; const d=q.replace(/\D/g,''); return [x.owner_name,x.street_address,x.suburb].some(v=>String(v||'').toLowerCase().includes(q))||(d.length>=3&&String(x.phone||'').replace(/\D/g,'').includes(d)); }
function lsFilter5(ls){ const q=bqv5('ld'); if(!q) return ls; const d=q.replace(/\D/g,'');
  return ls.filter(l=>[leadTitle(l),l.name,l.address,l.suburb].some(v=>String(v||'').toLowerCase().includes(q))||(d.length>=3&&String(l.phone||'').replace(/\D/g,'').includes(d))); }
let bq5t;
function bq5(k,v){ S.bq5o=S.bq5o||{}; S.bq5o[k]=v; clearTimeout(bq5t); bq5t=setTimeout(()=>{ const pos=document.getElementById('bq5_'+k)?.selectionStart; board3(true).then(()=>{ const i=document.getElementById('bq5_'+k); if(i){ i.focus(); try{ i.setSelectionRange(pos,pos); }catch{} } }); },120); }
// Each column header has a search icon; it opens a thin search line under the header
function bqToggle5(k){ const open=!!((S.bqOpen5||{})[k]||bqv5(k)); return open?bqClose5(k):bqOpen5(k); }
function bqOpen5(k){ S.bqOpen5=S.bqOpen5||{}; S.bqOpen5[k]=true; bqHeads5(); setTimeout(()=>document.getElementById('bq5_'+k)?.focus(),0); }
function bqClose5(k){ S.bqOpen5=S.bqOpen5||{}; S.bqOpen5[k]=false; const had=bqv5(k); S.bq5o=S.bq5o||{}; S.bq5o[k]=''; had?board3(true):bqHeads5(); }
function bqHeads5(){ const PH={ld:'Find a lead',ap:'Find an appraisal',ls:'Find a listing'};
  document.querySelectorAll('.bd3 .bc3').forEach(c=>{ const k=c.classList.contains('ap')?'ap':c.classList.contains('ls')?'ls':'ld', h=c.querySelector('.bh3'); if(!h) return;
    if(!h.querySelector('.bs5')){ const ad=h.querySelector('.ad3'); ad&&ad.insertAdjacentHTML('beforebegin',`<button class="bs5" aria-label="${PH[k]}" title="${PH[k]}" onclick="bqToggle5('${k}')">${ic2('search',15)}</button>`); }
    const open=!!((S.bqOpen5||{})[k]||bqv5(k)); h.querySelector('.bs5')?.classList.toggle('on',open);
    let row=c.querySelector('.bq5');
    if(open&&!row){ h.insertAdjacentHTML('afterend',`<label class="bq5">${ic2('search',14)}<input id="bq5_${k}" type="search" placeholder="${PH[k]}" value="${esc((S.bq5o||{})[k]||'')}" oninput="bq5('${k}',this.value)" onkeydown="if(event.key==='Escape')bqClose5('${k}')" autocomplete="off" aria-label="${PH[k]}"><button class="bx5" aria-label="Close search" onclick="event.preventDefault();bqClose5('${k}')">${ic2('x',14)}</button></label>`); }
    if(!open&&row) row.remove();
    if(bqv5(k)&&!c.querySelector('.cd3')){ const e=c.querySelector('.be3'); if(e) e.textContent='Nothing matches that'; } }); }
function boardFit5(){ try{ const col=document.querySelector('.bd3 .bc3.ld'); if(!col||innerWidth<900) return false;
  const first=col.querySelector('.cd3'), more=col.querySelector('.bm3'); if(!first||!more) return false;
  const avail=innerHeight-first.getBoundingClientRect().top-more.offsetHeight; const n=Math.max(3,Math.floor(avail/84));
  document.querySelector('.bd3').style.setProperty('--cdh',Math.floor(avail/n)+'px');
  if(n!==S.bfit5){ S.bfit5=n; return true; } return false; }catch{ return false; } }
// Pipeline board: column search and screen fitting
window.board3=(function(orig){ return async function(local){ const r=await orig(local);
  bqHeads5();
  if(boardFit5()) return board3(true);
  return r; }; })(window.board3);
addEventListener('resize',()=>{ clearTimeout(window.__bf5); window.__bf5=setTimeout(()=>{ if(document.querySelector('.bd3')&&boardFit5()) board3(true); },200); });
// Stats on one screen: numbers strip on top, then three columns of panels split by lines
window.paintInsights=(function(orig){ return function(...a){ const r=orig(...a); try{
  if(innerWidth<1100) return r;
  const secs=[...document.querySelectorAll('#main .sec2')]; if(!secs.length||document.querySelector('#main .sg5')) return r;
  const t=s=>(s.querySelector('.gh2')?.textContent||'').toLowerCase();
  const cols=[[],[],[]];
  for(const s of secs){ const x=t(s);
    if(/per 100 answered|call to listing|referral/.test(x)) cols[0].push(s);
    else if(/calls a week|time on the phone/.test(x)) cols[1].push(s);
    else if(/best time|suburbs/.test(x)) cols[2].push(s);
    else cols.reduce((m,c)=>c.length<m.length?c:m).push(s); }
  // inside the left column the rate comes first, then the steps, then referrals
  const ord=x=>/per 100 answered/.test(x)?0:/call to listing/.test(x)?1:2; cols[0].sort((p,q)=>ord(t(p))-ord(t(q)));
  const g=document.createElement('div'); g.className='sg5';
  cols.forEach(c=>{ const d=document.createElement('div'); d.className='sc5'; c.forEach(s=>d.appendChild(s)); g.appendChild(d); });
  const res=document.querySelector('#main .res2'); res?res.after(g):secs[0].parentElement.appendChild(g);
}catch(e){ console.error(e); } return r; }; })(window.paintInsights);

// ---------- Stats, rebuilt (22 Nov): six equal panels, title left and one number right, no explanation text ----------
window.paintInsights=function(ov){ S.period=S.period||'week'; const k=S.period, fm=n=>Math.round(+n||0).toLocaleString('en-AU');
  const lab={week:'last week',month:'last month',quarter:'last quarter'}[k], R=ov.results||{}, a=R[k]||{}, b=R[k+'_prev']||{};
  const tile=(l,c,v,pv,f)=>{ const d=(+v||0)-(+pv||0); return `<div class="rs2" style="--c:${c}"><span>${l}</span><div class="rv6"><b>${f?f(v):fm(v)}</b>${d?`<em class="dl6 ${d>0?'up':'dn'}" title="vs ${lab}">${d>0?'+':'−'}${f?f(Math.abs(d)):fm(Math.abs(d))}</em>`:''}</div></div>`; };
  const money=n=>'$'+fm(n);
  const res=`<section class="res2" aria-label="Results this ${k}">${tile('Appraisals',COL.appraisal,a.appraisals,b.appraisals)}${tile('Listings',COL.listed,a.listed,b.listed)}${tile('Sold',COL.sold,a.sold,b.sold)}${tile('Referrals',COL.referral,a.referrals,b.referrals)}${tile('Referral fees',COL.referral,a.fees,b.fees,money)}${tile('Info sent',COL.sent,a.sent,b.sent)}</section>`;
  const pan=(id,title,val,body,extra='')=>`<section class="p6" id="${id}"><div class="p6h"><span>${title}</span>${extra}<b>${val}</b></div><div class="p6b">${body}</div></section>`;
  const none=t=>empty6('cols',t);
  // calls: progress to this period's goal, then the history as bars scaled to the calls themselves
  const raw=(ov.periods||{})[k]||[], MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const pl=s=>{ const d=new Date(s+'T12:00:00Z'); return k==='week'?`${d.getUTCDate()} ${MON[d.getUTCMonth()]}`:k==='month'?MON[d.getUTCMonth()]:`Q${Math.floor(d.getUTCMonth()/3)+1}`; };
  const now=raw.length?+raw[raw.length-1].n||0:0, goal=(ov.settings?.daily_target||100)*PERIOD_WD[k], mx=Math.max(1,...raw.map(x=>+x.n||0));
  const calls=raw.length?`<div class="m6"><i style="width:${Math.min(100,now/goal*100)}%"></i></div><div class="m6l"><span>${Math.round(now/goal*100)}% of goal</span><span>goal ${fm(goal)}</span></div>
    <div class="cb6">${raw.map((x,i)=>{ const v=+x.n||0, p=v/mx*84, last=i===raw.length-1; return `<div class="${last?'on':''}"><div class="t6"><b style="bottom:calc(${p}% + 4px)">${fm(v)}</b><i style="height:${Math.max(p,v?2:0)}%"></i></div><span>${raw.length>8&&(raw.length-1-i)%2?'':pl(x.start)}</span></div>`; }).join('')}</div>`:empty6('cols','No calls yet');
  // call to listing: one row per step, rate against goal
  const ck={week:'7',month:'30',quarter:'90'}[k], c=(ov.cohort||{})[ck]||{}, h=+c.homes||0, per=v=>h?Math.round(1000*v/h)/10:0, f1=v=>String(v).replace(/\.0$/,'');
  const steps=[['Answered',+c.reached||0,75],['Appraisals',+c.appraisals||0,5],['Listed',+c.listed||0,3]];
  const fun=h?`<div class="ft6"><span></span><em>Homes</em><em>Per 100</em><em>Goal</em>
    <span>Called</span><b>${fm(h)}</b><b></b><em></em>${steps.map(([l,v,g])=>{ const p=per(v); return `<span>${l}</span><b>${fm(v)}</b><b class="${p>=g?'ok':''}">${f1(p)}</b><em>${g}</em>`; }).join('')}</div>${h<300?`<p class="ft6n">Early numbers, ${h} of 300 homes</p>`:''}`:empty6('rows','No calls yet');
  // best time: the grid without its chips and key, the best window becomes the panel number
  const tot=(ov.times||[]).reduce((s,t)=>s+(+t.calls||0),0); let heat='', best='';
  if(tot>=100){ const d=document.createElement('div'); d.innerHTML=heatGrid2(ov.times); const bt=d.querySelector('.tags2 .on'); best=bt?bt.textContent.replace(/^Best: weekdays /,''):''; d.querySelector('.tags2')?.remove(); d.querySelector('.leg2')?.remove(); heat=d.innerHTML; }
  else heat=empty6('grid','Ready at 100 calls',tot/100,`${tot} of 100`);
  const subs=ov.suburbs||[], smax=Math.max(1,...subs.map(s=>s.n));
  const sub=subs.length?`<div class="sr6">${subs.slice(0,8).map((s,j)=>`<span>${esc(s.suburb)}</span><div><i style="width:${s.n/smax*100}%;${j?'':'background:var(--acc)'}"></i></div><b>${s.n}</b>`).join('')}</div>`:empty6('bars','No appraisals in 90 days');
  const live=(ov.versions||[]).find(v=>v.approved);
  const l30=ov.last30||{}, grp=g=>{ const xs=(ov.groups||[]).filter(x=>x.grp===g), cn=xs.reduce((s,x)=>s+(+x.connected||0),0), ap=xs.reduce((s,x)=>s+(+x.appraisals||0),0); return cn?(100*ap/cn).toFixed(1):'0.0'; };
  $("#main").className='v2main';
  $("#main").innerHTML=`<div class="pg2 st6pg"><div>
   <div class="ph2"><h1>Stats</h1><div class="seg2" style="min-width:270px">${[['week','Week'],['month','Month'],['quarter','Quarter']].map(([q,l])=>`<button class="${k===q?'on':''}" onclick="S.period='${q}';paintInsights(S.ovFull)">${l}</button>`).join('')}</div></div>
   ${res}
   <div class="st6">
    ${pan('p6calls',`Calls this ${k}`,fm(now),calls)}
    ${pan('p6fun','Call to listing',h?`${f1(per(+c.listed||0))} <small>per 100</small>`:'',fun)}
    ${pan('tphone','Time on the phone','','')}
    ${pan('p6best','Best time to call',best,heat)}
    ${pan('p6sub','Appraisals by suburb',subs.length?`${subs.reduce((s,x)=>s+x.n,0)} <small>in 90 days</small>`:'',sub)}
    ${pan('refs2','Referrals','','',`<button class="ib6" onclick="S.rw=null;partnerSheet()" aria-label="Add who you refer to" title="Add who you refer to">${ic2('plus',16)}</button>`)}
   </div>
   <details class="sec"><summary>How the algorithm is doing</summary><div>
    <div class="ft6 al6"><span></span><em>Answered</em><em>Appraisals</em><em>Per 100</em>${(ov.groups||[]).map(g=>`<span>${g.grp==='Control'?'Random picks':'From the list'} v${g.version??'?'}</span><b>${fm(g.connected)}</b><b>${fm(g.appraisals)}</b><b>${g.rate??0}</b>`).join('')||'<span>No calls yet</span>'}</div>
    <p class="muted">Last 30 days: ${grp('Algorithm')} per 100 from the list, ${grp('Control')} from random picks, goal ${+(ov.settings?.target_rate??3)}. Random picks show what the list adds. Weights: ${Object.entries(live?.weights||{}).map(([q,w])=>`${esc(q)} ${w}`).join(', ')||'none yet'}.</p></div></details>
  </div></div>`;
  st6Fit(); requestAnimationFrame(st6Fit); setTimeout(st6Fit,120); phone6(); refs6();   // fit again once the title has moved into the top bar
};
function st6Fit(){ const g=document.querySelector('#main .st6'); if(g) g.style.height=''; }   // sizing is done by CSS now
async function phone6(){ const days=PERIOD_DAYS[S.period||'week'], el=()=>document.getElementById('tphone'); let w;
  const last=S.ph6&&S.ph6[days]; if(last) paintPhone6(last);
  try{ w=await api("work_stats",{days}); }catch{ if(el()&&!last) el().querySelector('.p6b').innerHTML='<p class="no6">Could not load</p>'; return; }
  S.ph6=S.ph6||{}; S.ph6[days]=w; if(!last||JSON.stringify(last)!==JSON.stringify(w)) paintPhone6(w); }
function paintPhone6(w){ const el=()=>document.getElementById('tphone');
  const x=el(); if(!x) return; const t=w.totals||{}, body=x.querySelector('.p6b'), head=x.querySelector('.p6h b');
  if(!t.calls){ body.innerHTML=empty6('time','No calls yet'); return; }
  const noans=t.calls-t.answered, talk=(t.talk_s||0)*t.answered, ring=(t.ring_s||0)*noans+(t.talk_s?0:(t.ring_s||0)*t.answered), betw=((t.prep_s||0)+(t.wrap_s||0))*t.calls, est=talk+ring+betw;
  const act=t.active_s||est, sc=est?act/est:0; head.textContent=hm2(act);   // the parts are typical times, so scale them to the real working time
  if(!est){ body.innerHTML=`<div class="tq6"><div><b>${t.calls}</b><span>Calls</span></div></div>`; return; }
  const parts=[['Talking',talk*sc,'var(--acc)'],['Ringing',ring*sc,'#5b6576'],['Between calls',betw*sc,'#c98a1c']];
  body.innerHTML=`<div class="sp6">${parts.map(([,v,c])=>`<i style="flex:${v||0.001};background:${c}"></i>`).join('')}</div>
   <div class="tq6">${parts.map(([l,v,c])=>`<div><b>${hm2(v)}</b><span><i style="background:${c}"></i>${l}</span></div>`).join('')}<div><b>${fm2(t.calls)}</b><span>Calls</span></div></div>`; }
const fm2=n=>Math.round(+n||0).toLocaleString('en-AU');
async function refs6(){ const x=document.getElementById('refs2'); if(!x) return;
  let last=S.ref; if(!last){ try{ last=JSON.parse(localStorage.getItem('dp_c6_refs')||'null'); }catch{} } if(last) paintRefs6(last);
  let d; try{ d=await api2('referrals'); }catch(e){ if(!last) x.querySelector('.p6b').innerHTML='<p class="no6">Could not load</p>'; return; } S.ref=d;
  try{ if(!DEMO) localStorage.setItem('dp_c6_refs',JSON.stringify(d)); }catch{}
  if(!last||JSON.stringify(last)!==JSON.stringify(d)) paintRefs6(d); }
function paintRefs6(d){ const y=document.getElementById('refs2'); if(!y) return; const rs=d.referrals||[], ps=d.partners||[]; y.querySelector('.p6h b').textContent=rs.length||'';
  y.querySelector('.p6b').innerHTML=(rs.length?`<div class="rf6">${rs.slice(0,6).map(r=>`<button onclick="refEdit(${r.id})"><span>${esc(r.person_name||'Someone')} to ${esc(r.partner||'?')}</span><em style="--c:${r.status==='won'?COL.sold:r.status==='lost'?COL.lost:COL.referral}">${esc((RST.find(s=>s[0]===r.status)||[])[1]||r.status)}${r.status==='won'&&r.fee?' $'+fm2(r.fee):''}</em></button>`).join('')}</div>`:empty6('people','No referrals yet'))
   +(ps.length?`<p class="rp6"><small>Partners</small>${ps.map(p=>`<button onclick="S.rw=null;partnerSheet(S.ref.partners.find(x=>x.id===${p.id}))">${esc(p.name)}</button>`).join('')}</p>`:''); }
addEventListener('resize',()=>{ clearTimeout(window.__st6); window.__st6=setTimeout(st6Fit,150); });

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
    [...new Set(Object.values(PERIOD_DAYS))].forEach(days=>api('work_stats',{days}).then(w=>{ S.ph6=S.ph6||{}; S.ph6[days]=w; }).catch(()=>{}));
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
// On a computer the rail is too narrow for three words in the switch, so Solicitors sits under Lists like Call backs
window.drawList2=(function(orig){ return function(...a){ const r=orig.apply(this,a); const rail=document.querySelector('.rail2'); if(!rail) return r;
  rail.querySelectorAll('.lt5 button[onclick^="solGo6"]').forEach(b=>b.remove());
  if(!rail.querySelector('.sol6')){ const n=solN6()||'', on=S.lsub===SOL_GROUP;
    const b=document.createElement('button'); b.className='sol6'+(on?' on':''); b.setAttribute('onclick','solGo6()'); b.innerHTML=`<em class="rn5">Solicitors</em><span>${n}</span>`;
    let h=[...rail.querySelectorAll('.rh5')].find(x=>/Lists/.test(x.textContent));
    if(!h){ h=document.createElement('div'); h.className='rh5'; h.textContent='Lists'; const sub=[...rail.querySelectorAll('.rh5')].find(x=>/Suburbs/.test(x.textContent)); rail.insertBefore(h,sub||null); }
    let after=h; while(after.nextElementSibling&&after.nextElementSibling.tagName==='BUTTON') after=after.nextElementSibling; after.insertAdjacentElement('afterend',b); }
  return r; }; })(window.drawList2);

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

// Stats empty states (23 Nov): a faint preview of what the panel will show, one line, and progress where there is some
function empty6(kind,line,prog,progTxt){
  const g={
    grid:`<div class="eg6 grid">${Array.from({length:35},(_,i)=>`<i style="opacity:${[.35,.6,.9,.5,.25,.7,.45][i%7]*(.5+((i*7)%5)/8)}"></i>`).join('')}</div>`,
    bars:`<div class="eg6 bars">${[92,70,54,40,28].map(w=>`<i style="width:${w}%"></i>`).join('')}</div>`,
    cols:`<div class="eg6 cols">${[30,55,40,70,50,85,60].map(h=>`<i style="height:${h}%"></i>`).join('')}</div>`,
    rows:`<div class="eg6 rows">${[0,1,2,3].map(()=>'<i></i>').join('')}</div>`,
    time:`<div class="eg6 time"><i style="flex:1"></i><i style="flex:.3"></i><i style="flex:2.4"></i></div>`,
    people:`<div class="eg6 people"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2c2.6-.3 4.8 1.2 5.5 4.3"/></svg></div>`}[kind]||'';
  return `<div class="e6">${g}<div class="e6t"><b>${esc(line)}</b>${prog!=null?`<div class="e6p"><i style="width:${Math.max(2,Math.min(100,prog*100))}%"></i></div><span>${esc(progTxt||'')}</span>`:''}</div></div>`; }
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

// ================= Feel (23 Nov): micro animations and arrow keys =================
// Rules: nothing makes you wait. Press feedback ~80ms, panels 150 to 200ms in and ~110ms out, rows glide 180ms.
// Only transform and opacity move. With the phone's reduce motion setting on, movement is dropped and fades stay.
(function(){
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const typing=()=>{ const a=document.activeElement; return !!a&&(/INPUT|TEXTAREA|SELECT/.test(a.tagName)||a.isContentEditable); };
const vis=e=>!!e&&e.offsetParent!==null&&e.getBoundingClientRect().width>0;

// ---- 1. Logging a call: the next person fades in, and the button you hit flashes in the new bar ----
let lastCall=null, hit=null;
window.act2=(function(o){ return function(id,out){ hit={out,t:Date.now()}; return o(id,out); }; })(window.act2);
window.drawCall2=(function(o){ return function(...a){ const r=o(...a); try{
  const c=curCall&&curCall(), id=c&&c.property_id, m=document.getElementById('main');
  if(m&&id&&lastCall&&id!==lastCall){ m.classList.remove('in8'); void m.offsetWidth; m.classList.add('in8'); }
  if(hit&&Date.now()-hit.t<4000){ const b=[...document.querySelectorAll('#main .bar2x button')].find(x=>(x.getAttribute('onclick')||'').includes(`'${hit.out}'`)); if(b){ b.classList.remove('hit8'); void b.offsetWidth; b.classList.add('hit8'); } hit=null; }
  lastCall=id||lastCall; }catch(e){} return r; }; })(window.drawCall2);

// The fading copy loses styles written against #sheet, so each element keeps its own look as drawn
const FZ=['display','position','top','left','right','bottom','width','height','marginTop','marginRight','marginBottom','marginLeft','paddingTop','paddingRight','paddingBottom','paddingLeft','color','backgroundColor','backgroundImage','borderTop','borderRight','borderBottom','borderLeft','borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius','fontSize','fontWeight','lineHeight','letterSpacing','textAlign','whiteSpace','gap','gridTemplateColumns','flexDirection','flexWrap','alignItems','justifyContent','boxShadow','opacity','listStyle','overflow','textOverflow','visibility','boxSizing','objectFit','fill','stroke'];
const FZC=FZ.map(k=>[k,k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())]);
function freeze8(src,dst){ const a=[src,...src.querySelectorAll('*')], b=[dst,...dst.querySelectorAll('*')]; if(a.length>1500) return;
  // read everything first, then write once per element, so the browser works out styles once instead of thousands of times
  const vh=innerHeight, css=new Array(a.length);
  for(let i=0;i<a.length;i++){ const r=i?a[i].getBoundingClientRect():null; if(r&&(r.bottom<-50||r.top>vh+50)){ css[i]=null; continue; }
    const cs=getComputedStyle(a[i]); let t=''; for(const [k,c] of FZC){ const v=cs[k]; if(v) t+=c+':'+v+';'; } css[i]=t+'transition:none;animation:none;'; }
  for(let i=0;i<b.length;i++) if(css[i]!==null) b[i].style.cssText=css[i]; else b[i].style.cssText='visibility:hidden'; }
// ---- 2. Panels: open with a short rise (CSS), close with a quick fade of a copy so the app's state changes instantly ----
window.closeOv=(function(o){ return function(...a){ try{ const ov=document.getElementById('ov'), sh=document.getElementById('sheet');
  const big=sh.getElementsByTagName('*').length>(innerWidth<900||matchMedia('(pointer: coarse)').matches?120:700);
  if(ov&&sh&&!big&&ov.classList.contains('show')&&sh.innerHTML.trim()){ const r=sh.getBoundingClientRect(), cs=getComputedStyle(sh), oc=getComputedStyle(ov);
    const g=document.createElement('div'); g.className='ghost8'; g.setAttribute('aria-hidden','true'); g.style.background=oc.backgroundColor;
    const c=sh.cloneNode(true); freeze8(sh,c); c.removeAttribute('id'); c.removeAttribute('class'); c.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));
    
    Object.assign(c.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',margin:0,maxWidth:'none',maxHeight:'none',boxSizing:'border-box'});
    c.scrollTop=sh.scrollTop; g.appendChild(c); document.body.appendChild(g); c.scrollTop=sh.scrollTop;
    if(sh.classList.contains('lsheet')&&innerWidth>=900) g.classList.add('side8'); else if(innerWidth<900&&r.bottom>=innerHeight-2) g.classList.add('bot8');
    const done=()=>g.remove(); g.addEventListener('animationend',done,{once:true}); setTimeout(done,400); } }catch(e){} return o(...a); }; })(window.closeOv);

// ---- 3. The Saved and Undo message: rises in, and a bar shows how long Undo lasts ----
for(const n of ['toast','toast2']) if(typeof window[n]==='function') window[n]=(function(o){ return function(...a){ const t=document.getElementById('toast'); if(t){ t.classList.remove('show'); void t.offsetWidth; } return o(...a); }; })(window[n]);

// ---- 4. Save buttons: a spinner if the save takes a moment, then a tick or a red flash ----
let press={el:null,t:0};
const pressAt=e=>{ const b=e.target.closest&&e.target.closest('button,a.b2,[role=button]'); if(b) press={el:b,t:Date.now()}; };
document.addEventListener('pointerdown',pressAt,true);
document.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' ') pressAt({target:document.activeElement||document.body}); },true);
const SAVE='.b2.pri,.primary,.wide2b,.lsave button,button[id$="_go"]';
const wrap=f=>async function(...a){ const el=press.el, fresh=el&&Date.now()-press.t<300&&el.matches&&el.matches(SAVE); let tm;
  if(fresh){ press.el=null; el.dataset.p8=(+el.dataset.p8||0)+1; tm=setTimeout(()=>{ if(el.isConnected&&+el.dataset.p8>0){ if(getComputedStyle(el).position==='static') el.style.position='relative'; el.classList.add('spin8'); } },160); }
  try{ const r=await f.apply(this,a); if(fresh){ el.dataset.p8=+el.dataset.p8-1; if(+el.dataset.p8<=0){ clearTimeout(tm); el.classList.remove('spin8'); if(el.isConnected){ el.classList.remove('ok8b'); void el.offsetWidth; el.classList.add('ok8b'); setTimeout(()=>el.classList.remove('ok8b'),700); } } } return r; }
  catch(err){ if(fresh){ el.dataset.p8=0; clearTimeout(tm); el.classList.remove('spin8'); if(el.isConnected){ el.classList.remove('bad8'); void el.offsetWidth; el.classList.add('bad8'); } } throw err; } };
window.api=wrap(window.api); if(window.api2) window.api2=wrap(window.api2);

// ---- 5. Lists glide instead of jumping, and the option bar highlight slides to the new choice ----
const ROWS='.lg3,.lt3:not(.h),.pt3:not(.h),.lead2,.r2[onclick],.card.lead,.cd3,.bd3 .cd3';
const SEGS='.seg2,.seg,.vseg,.later2,.opts3';
const rkey=e=>e.dataset.id?'id'+e.dataset.id:(e.getAttribute('onclick')||'');
const where=()=>S.tab+'|'+(S.pst||'')+'|'+(S.view||'')+'|'+(S.searching?1:0);
let snap=null;
function takeSnap(){ if(RM()) return; const rows=new Map(), segs=new Map();
  document.querySelectorAll('#main '+ROWS.split(',').join(',#main ')).forEach(e=>{ const k=rkey(e); if(k&&vis(e)) rows.set(k,e.getBoundingClientRect().top); });
  document.querySelectorAll(SEGS).forEach(s=>{ const on=s.querySelector(':scope>button.on'); if(on&&vis(on)) segs.set(segKey(s),{x:on.getBoundingClientRect().left-s.getBoundingClientRect().left,w:on.offsetWidth}); });
  snap={t:Date.now(),w:where(),rows,segs}; }
const segKey=s=>[...s.querySelectorAll(':scope>button')].map(b=>b.textContent.trim()).join('|');
document.addEventListener('pointerdown',takeSnap,true);
document.addEventListener('keydown',e=>{ if(!typing()) takeSnap(); },true);
function playSnap(){ if(!snap||Date.now()-snap.t>2500||RM()) return; const s=snap;
  // option bars
  document.querySelectorAll(SEGS).forEach(sg=>{ const p=s.segs.get(segKey(sg)), on=sg.querySelector(':scope>button.on'); if(!p||!on||sg.querySelector('.segind8')) return;
    const x=on.getBoundingClientRect().left-sg.getBoundingClientRect().left; if(Math.abs(x-p.x)<2) return;
    s.segs.delete(segKey(sg)); if(getComputedStyle(sg).position==='static') sg.style.position='relative';
    const cs=getComputedStyle(on), ind=document.createElement('i'); ind.className='segind8';
    Object.assign(ind.style,{left:on.offsetLeft+'px',top:on.offsetTop+'px',width:p.w+'px',height:on.offsetHeight+'px',background:cs.backgroundColor,borderRadius:cs.borderRadius,boxShadow:cs.boxShadow,transform:`translateX(${p.x-x}px)`});
    sg.insertBefore(ind,sg.firstChild); sg.classList.add('sliding8');
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ ind.style.transform='translateX(0)'; ind.style.width=on.offsetWidth+'px'; }));
    setTimeout(()=>{ ind.remove(); sg.classList.remove('sliding8'); },200); });
  // rows: only on the same screen, after a change you made
  if(s.w!==where()||!s.rows.size) return;
  const now=[...document.querySelectorAll('#main '+ROWS.split(',').join(',#main '))].filter(vis); if(now.length>250) return;
  let moved=0; const fresh=[];
  for(const e of now){ const k=rkey(e); if(!s.rows.has(k)){ fresh.push(e); continue; } const dy=s.rows.get(k)-e.getBoundingClientRect().top; if(Math.abs(dy)>1&&Math.abs(dy)<400){ e.animate([{transform:`translateY(${dy}px)`},{transform:'none'}],{duration:180,easing:'cubic-bezier(.2,.8,.2,1)'}); moved++; } }
  if((moved||s.rows.size!==now.length-fresh.length)&&fresh.length<6) fresh.forEach(e=>e.animate([{opacity:0},{opacity:1}],{duration:160,easing:'ease-out'}));
  snap=null; }
let raf=0; const mo=new MutationObserver(()=>{ if(raf) return; raf=requestAnimationFrame(()=>{ raf=0; playSnap(); restoreKf(); }); });
const startMo=()=>{ const a=document.getElementById('app')||document.body, sh=document.getElementById('sheet'); mo.observe(a,{childList:true,subtree:true,attributes:true,attributeFilter:['class']}); if(sh) mo.observe(sh,{childList:true,subtree:true,attributes:true,attributeFilter:['class']}); };
if(document.readyState==='loading') addEventListener('DOMContentLoaded',startMo); else startMo();

// ---- 6. Stats: bars grow once when the page first opens ----
let grown=false;
window.paintInsights=(function(o){ return function(...a){ const r=o(...a); try{ if(!grown&&!RM()){ grown=true; const m=document.querySelector('#main .st6pg'); if(m){
  m.querySelectorAll('.cb6 .t6 i').forEach((x,i)=>{ x.classList.add('gy8'); x.style.animationDelay=i*35+'ms'; });
  m.querySelectorAll('.sr6 i').forEach((x,i)=>{ x.classList.add('gx8'); x.style.animationDelay=i*35+'ms'; });
  m.querySelectorAll('.ft6 b, .rs2 .rv6 b').forEach(x=>x.classList.add('fd8')); } } }catch(e){} return r; }; })(window.paintInsights);

// ---- 7. Arrow keys ----
let kfKey=null, kfWhere=null;
const rowsNow=()=>[...document.querySelectorAll('#main '+ROWS.split(',').join(',#main '))].filter(e=>vis(e)&&!e.closest('#sheet'));
function setKf(e,{open}={}){ document.querySelectorAll('.kf8').forEach(x=>x.classList.remove('kf8')); if(!e) return;
  e.classList.add('kf8'); if(!e.hasAttribute('tabindex')&&!/BUTTON|A/.test(e.tagName)) e.setAttribute('tabindex','-1');
  e.focus({preventScroll:true}); e.scrollIntoView({block:'nearest'}); kfKey=rkey(e); kfWhere=where(); if(open) e.click(); }
function restoreKf(){ if(!kfKey||kfWhere!==where()||document.querySelector('#main .kf8')) return; const e=rowsNow().find(x=>rkey(x)===kfKey); if(e){ e.classList.add('kf8'); if(document.activeElement===document.body) e.focus({preventScroll:true}); } }
// pick the nearest visible control in a direction (used inside pop ups, the sidebar and tag groups)
function spatial(from,dir,pool){ const a=from.getBoundingClientRect(), ax=a.left+a.width/2, ay=a.top+a.height/2; let best=null, bs=1e9;
  for(const c of pool){ if(c===from) continue; const b=c.getBoundingClientRect(), bx=b.left+b.width/2, by=b.top+b.height/2, dx=bx-ax, dy=by-ay;
    const ok=dir==='down'?dy>4:dir==='up'?dy<-4:dir==='right'?dx>4&&Math.abs(dy)<a.height:dx<-4&&Math.abs(dy)<a.height; if(!ok) continue;
    const s=(dir==='down'||dir==='up')?Math.abs(dy)+Math.abs(dx)*2:Math.abs(dx)+Math.abs(dy)*4; if(s<bs){ bs=s; best=c; } } return best; }
const ctrls=root=>[...root.querySelectorAll('button:not(:disabled),a[href],[onclick]:not(div.overlay),[tabindex]:not([tabindex="-1"])')].filter(e=>vis(e)&&!e.closest('.ghost8')&&!e.querySelector('button,a[href]'));
let followT=0;
document.addEventListener('keydown',e=>{
  if(e.metaKey||e.ctrlKey||e.altKey||!S.token) return;
  const k=e.key, dir={ArrowDown:'down',ArrowUp:'up',ArrowLeft:'left',ArrowRight:'right'}[k];
  if(!dir&&k!=='Enter'&&k!=='Home'&&k!=='End') return;
  if(typing()) return;
  const ov=document.getElementById('ov'), open=ov&&ov.classList.contains('show'), sh=document.getElementById('sheet');
  const side=open&&sh.classList.contains('lsheet')&&document.querySelector('#main .ltab3')&&innerWidth>=900;
  const act=document.activeElement;
  // Enter on a highlighted row opens it
  if(k==='Enter'){ if(act&&act.classList&&act.classList.contains('kf8')&&!/BUTTON|A/.test(act.tagName)){ e.preventDefault(); e.stopImmediatePropagation(); act.click(); } return; }
  // a pop up is open (not the lead side panel): move between its choices, left and right inside a row of options
  if(open&&!side){ const pool=ctrls(sh); if(!pool.length) return; let cur=pool.includes(act)?act:null;
    if(!cur){ if(!dir) return; e.preventDefault(); (dir==='up'?pool[pool.length-1]:pool[0]).focus(); return; }
    if(!dir) return; const n=spatial(cur,dir,pool); if(n){ e.preventDefault(); n.focus(); n.scrollIntoView({block:'nearest'}); if(n.parentElement&&n.parentElement.matches('.seg2,.seg,.vseg')) n.click(); } return; }
  // focus is on an option bar: left and right switch it
  const sg=act&&act.parentElement&&act.parentElement.matches&&act.parentElement.matches('.seg2,.seg,.vseg')?act.parentElement:null;
  if(sg&&(dir==='left'||dir==='right')){ const bs=[...sg.querySelectorAll(':scope>button')].filter(vis), i=bs.indexOf(act), n=bs[i+(dir==='right'?1:-1)]; if(n){ e.preventDefault(); n.click(); requestAnimationFrame(()=>{ const m=[...document.querySelectorAll('.seg2 button,.seg button,.vseg button')].find(x=>x.textContent.trim()===n.textContent.trim()&&vis(x)); (m||n).focus(); }); } return; }
  // focus is in the sidebar or a row of tags: move to the nearest one
  const grp=act&&act.closest&&act.closest('.side2,.chips,.chipgrid,.wtags,.fu4,.lcta');
  if(grp&&dir){ const n=spatial(act,dir,ctrls(grp)); if(n){ e.preventDefault(); n.focus(); } return; }
  if(S.tab==='calls'&&S.view!=='list'&&!S.searching) return;   // the call screen keeps its own keys; no arrows that could skip someone
  // lists: up and down move a highlight, Enter opens; with a lead open on the side, the panel follows
  if(dir==='up'||dir==='down'||k==='Home'||k==='End'){ const rows=rowsNow(); if(!rows.length) return;
    let i=rows.findIndex(x=>x.classList.contains('kf8')||x===act); if(i<0&&side) i=rows.findIndex(x=>x.classList.contains('sel'));
    const j=k==='Home'?0:k==='End'?rows.length-1:i<0?(dir==='down'?0:rows.length-1):Math.max(0,Math.min(rows.length-1,i+(dir==='down'?1:-1)));
    e.preventDefault(); e.stopImmediatePropagation();
    if(side){ setKf(rows[j]); clearTimeout(followT); const r=rows[j]; followT=setTimeout(()=>{ if(r.isConnected) r.click(); },120); } else setKf(rows[j]); return; }
  // left and right with nothing focused: switch the page's option bar (Stats Week Month Quarter, Leads Listings)
  if((dir==='left'||dir==='right')&&S.tab!=='calls'){ const bar=[...document.querySelectorAll('header .seg2,#main .ph2 .seg2,#main .lh2 .seg2')].find(vis); if(!bar) return;
    const bs=[...bar.querySelectorAll(':scope>button')].filter(vis), i=bs.findIndex(b=>b.classList.contains('on')), n=bs[i+(dir==='right'?1:-1)]; if(n){ e.preventDefault(); n.click(); } }
},true);
document.addEventListener('pointerdown',()=>{ document.querySelectorAll('.kf8').forEach(x=>x.classList.remove('kf8')); kfKey=null; },true);
})();

// Stats switching smoothly (23 Nov): keep Time on the phone filled while the new period loads, load all three periods up front,
// and soften the swap of numbers and bars with a short fade instead of a hard cut
(function(){ let prevPhone=null, prevK=null;
  window.paintInsights=(function(o){ return function(...a){ const old=document.querySelector('#tphone');
    if(old&&old.querySelector('.p6b').innerHTML.trim()) prevPhone={b:old.querySelector('.p6b').innerHTML,h:old.querySelector('.p6h b').textContent};
    const k0=prevK, onStats=!!document.querySelector('#main .st6pg'); const r=o(...a); prevK=S.period;
    try{ const t=document.getElementById('tphone'); if(t&&prevPhone&&!t.querySelector('.p6b').innerHTML.trim()){ t.querySelector('.p6b').innerHTML=prevPhone.b; t.querySelector('.p6h b').textContent=prevPhone.h; }
      if(onStats&&k0&&k0!==S.period&&!matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('#main .st6pg .st6, #main .st6pg .res2').forEach(x=>x.animate([{opacity:.55},{opacity:1}],{duration:160,easing:'ease-out'}));
      if(!window.__ph8){ window.__ph8=1; setTimeout(()=>{ for(const d of Object.values(PERIOD_DAYS)) if(!(S.ph6&&S.ph6[d])) api('work_stats',{days:d}).then(w=>{ S.ph6=S.ph6||{}; S.ph6[d]=w; }).catch(()=>{}); },400); }
    }catch(e){} return r; }; })(window.paintInsights);
})();

// ================= From the tracking review (23 Nov) =================
(function(){
const $$=s=>document.querySelector(s);
const ovOpen=()=>!!$$('#ov')&&$$('#ov').classList.contains('show');

// ---- Notes save themselves. A lead's note, status and details are saved when the panel closes, when another lead is opened,
// or when the app is put away. While typing, the note is also kept on the device so nothing is lost if the app is closed.
const DKEY=id=>'dp_ldraft_'+id;
const dropDraft=id=>{ try{ localStorage.removeItem(DKEY(id)); }catch{} };
let saving=false;
function leadSnap(){ const o=S.ol, ta=$$('#ln_body'); if(!o||!o.id||!ta||!ovOpen()) return null;
  const id=o.id, cur=(S.leads||[]).find(x=>x.id===id)||{};
  const body=ta.value.trim(), st=$$('#ln_status')?$$('#ln_status').value:(cur.status||'Lead'), nx=$$('#ln_next')?($$('#ln_next').value||null):(cur.next_action||null);
  let note=null; if(body||st!==(cur.status||'Lead')||(o.temperature||null)!==(cur.temperature||null)||nx!==(cur.next_action||null)){ note={id,body,status:st,next_action:nx}; if(o.temperature) note.temperature=o.temperature; }
  let lead=null; try{ if(S.olOrig&&$$('#b_min')){ const buy=readBuy(), det=readDetails(), l={}; if(JSON.stringify(buy)!==S.olOrig.buy) l.buy=buy; if(JSON.stringify(det)!==S.olOrig.details) Object.assign(l,det); if(Object.keys(l).length) lead=l; } }catch(e){}
  return note||lead?{id,note,lead}:null; }
async function leadSave(s){ if(!s) return;
  try{ const jobs=[]; if(s.note) jobs.push(api('lead_note',s.note)); if(s.lead) jobs.push(api('save_lead',{id:s.id,lead:s.lead}));
    await Promise.all(jobs); dropDraft(s.id); await loadLeads();
    if(S.tab==='leads'&&!(ovOpen()&&S.ol&&S.ol.id)) drawLeads();
    toast(s.note&&s.note.body?'Note saved':'Saved'); }
  catch(e){ toast("Couldn't save. The note is kept, open the lead to try again"); } }
window.saveLeadAll=(function(o){ return async function(id){ saving=true; try{ const r=await o(id); if(id&&!$$('#ln_body')?.value.trim()) dropDraft(id); return r; } finally{ saving=false; } }; })(window.saveLeadAll);
window.closeOv=(function(o){ return function(...a){ const s=saving?null:leadSnap(); const r=o(...a); if(s) leadSave(s); return r; }; })(window.closeOv);
window.openLead=(function(o){ return function(id,opts,...a){ const s=(!saving&&S.ol&&S.ol.id&&S.ol.id!==id)?leadSnap():null; const r=o(id,opts,...a); if(s) leadSave(s);
  try{ const ta=$$('#ln_body'); if(ta&&id){ const d=localStorage.getItem(DKEY(id)); if(d&&!ta.value){ ta.value=d; ta.dispatchEvent(new Event('input')); } } }catch{}
  return r; }; })(window.openLead);
let dT=0; document.addEventListener('input',e=>{ if(e.target&&e.target.id==='ln_body'&&S.ol&&S.ol.id){ clearTimeout(dT); const id=S.ol.id, v=e.target.value; dT=setTimeout(()=>{ try{ v.trim()?localStorage.setItem(DKEY(id),v):localStorage.removeItem(DKEY(id)); }catch{} },300); } },true);
document.addEventListener('visibilitychange',()=>{ if(document.hidden&&!saving){ const s=leadSnap(); if(s&&S.olOrig){ leadSave(s).then(()=>{ if(S.ol&&S.ol.id===s.id&&$$('#ln_body')) $$('#ln_body').value=''; }); try{ S.olOrig.buy=JSON.stringify(readBuy()); S.olOrig.details=JSON.stringify(readDetails()); }catch{} } } });

// ---- Closing: Escape and a click outside close any panel. Nothing typed is lost: notes save (above), boxes that save when
// you leave them get the chance to, and a note prompt keeps what was typed.
window.requestClose8=function(){ if(!ovOpen()) return false;
  const yes=$$('#askyes'), no=$$('#askno'), ta=$$('#askin');
  if(yes&&no){ const keep=ta&&ta.value.trim()&&ta.value!==ta.defaultValue&&/note|save/i.test(yes.textContent); (keep?yes:no).click(); return true; }
  const a=document.activeElement; if(a&&a.closest&&a.closest('#sheet')&&a.blur) a.blur();
  closeOv(); return true; };
document.addEventListener('keydown',e=>{ if(e.key!=='Escape'||!ovOpen()||document.querySelector('.mfull5')) return;
  e.preventDefault(); e.stopImmediatePropagation(); if(typeof closePop2==='function') closePop2(); requestClose8(); },true);
let downOnBackdrop=false;
document.addEventListener('pointerdown',e=>{ downOnBackdrop=e.target&&e.target.id==='ov'; },true);
document.addEventListener('click',e=>{ if(e.target&&e.target.id==='ov'&&downOnBackdrop){ downOnBackdrop=false; requestClose8(); } },true);

// ---- Quick note phrases under the call note: tap to add, so the note is done before the next call
const PHR_DEF=['Selling next year','Has an agent','Call after Christmas','Wants a price update','Renting it out','Spoke to partner'];
const phrs=()=>{ try{ const v=JSON.parse(localStorage.getItem('dp_phr8')||'null'); if(Array.isArray(v)&&v.length) return v; }catch{} return PHR_DEF; };
window.phrAdd8=function(btn,i){ const t=btn.closest('.phr8')?.previousElementSibling?.matches?.('textarea')?btn.closest('.phr8').previousElementSibling:document.querySelector(innerWidth<900?'#pnote2':'#note2'); if(!t) return;
  const p=phrs()[i], v=t.value.trim(); t.value=v?(/[.!?]$/.test(v)?v+' ':v+'. ')+p:p; t.dispatchEvent(new Event('input',{bubbles:true})); btn.classList.add('used8'); };
window.phrEdit8=async function(){ const v=await uiAsk('Quick notes, one per line',{input:phrs().join('\n'),ok:'Save notes'}); if(v===null) return;
  const list=v.split('\n').map(x=>x.trim()).filter(Boolean).slice(0,10); try{ localStorage.setItem('dp_phr8',JSON.stringify(list.length?list:PHR_DEF)); }catch{} drawList(); };
const phrHTML=()=>`<div class="phr8" role="group" aria-label="Quick notes">${phrs().map((p,i)=>`<button type="button" onmousedown="event.preventDefault()" onclick="phrAdd8(this,${i})">${esc(p)}</button>`).join('')}<button type="button" class="phre8" onclick="phrEdit8()" aria-label="Change the quick notes" title="Change the quick notes">${ic2('pen',14)}</button></div>`;
window.drawCall2=(function(o){ return function(...a){ const r=o(...a); try{ for(const id of ['note2','pnote2']){ const t=document.getElementById(id); if(t&&!(t.nextElementSibling&&t.nextElementSibling.classList.contains('phr8'))) t.insertAdjacentHTML('afterend',phrHTML()); } }catch(e){} return r; }; })(window.drawCall2);

// ---- Booked call backs: the button shows how many are booked; with none it says so instead of opening an empty panel
let ucbN=null, ucbAt=0;
function ucbCount(){ if(DEMO||Date.now()-ucbAt<120000) return; ucbAt=Date.now(); api('upcoming_callbacks').then(r=>{ ucbN=(r.rows||[]).length; ucbLabel(); }).catch(()=>{}); }
function ucbLabel(){ document.querySelectorAll('button.cbk[onclick="upcomingCB()"]').forEach(b=>{ if(ucbN==null) return; let s=b.querySelector('.n8'); if(!s){ s=document.createElement('em'); s.className='n8'; b.insertBefore(s,b.lastElementChild); } s.textContent=ucbN; b.classList.toggle('none8',ucbN===0); }); }
window.drawList=(function(o){ return function(...a){ const r=o(...a); try{ if(S.view==='list'){ ucbLabel(); ucbCount(); } }catch(e){} return r; }; })(window.drawList);
window.upcomingCB=(function(o){ return function(...a){ if(ucbN===0){ toast('No call backs booked'); return; } return o(...a); }; })(window.upcomingCB);

// ---- Opening the app: on the first open of the day the call list, today's numbers and call backs come back in one trip
const BOOT=API.replace(/\/api$/,'/boot'); let primed=null;
window.api=(function(o){ return async function(action,body={},...rest){
  if(primed&&(action==='list'||action==='today'||action==='callbacks')&&primed[action]&&(action!=='list'||primed.type===((body&&body.type)||'seller'))){ const v=primed[action]; primed[action]=null; return JSON.parse(JSON.stringify(v)); }
  return o.call(this,action,body,...rest); }; })(window.api);
window.refreshCalls=(function(o){ return async function(first,...a){
  if(first&&!DEMO&&S.token){ try{ const r=await fetch(BOOT,{method:'POST',headers:{'Content-Type':'application/json','x-session':S.token},body:JSON.stringify({type:S.type})});
      if(r.ok){ const j=await r.json(); if(j&&j.list&&j.today&&j.callbacks) primed={type:S.type,list:j.list,today:j.today,callbacks:j.callbacks}; } }catch(e){} }
  try{ return await o(first,...a); } finally{ primed=null; } }; })(window.refreshCalls);

// ---- Typing speed: when a key press is slow, record where the time went (waiting, the app's code, or drawing) and the browser,
// so the next review can say whether it is the app or the computer
try{ new PerformanceObserver(list=>{ for(const e of list.getEntries()){ if(!e.interactionId||e.duration<200||!/key/.test(e.name)) continue;
      const wait=Math.round(e.processingStart-e.startTime), code=Math.round(e.processingEnd-e.processingStart), draw=Math.max(0,Math.round(e.duration-(e.processingEnd-e.startTime)));
      if(typeof uxPush==='function') uxPush('slow',{g:'keys:'+(e.target&&(e.target.id||e.target.tagName)||'?'),dt:Math.round(e.duration),m:{wait,code,draw,ime:!!(e.target&&e.target.isComposing),els:document.getElementsByTagName('*').length,ua:navigator.userAgent.slice(0,160)}}); } })
  .observe({type:'event',durationThreshold:200}); }catch(e){}
})();
// a mouse wheel scrolls the quick notes row sideways, so the rest of the phrases and the edit button are reachable on a computer
document.addEventListener('wheel',e=>{ const r=e.target.closest&&e.target.closest('.phr8'); if(!r||r.scrollWidth<=r.clientWidth||Math.abs(e.deltaX)>Math.abs(e.deltaY)) return; e.preventDefault(); r.scrollLeft+=e.deltaY; },{passive:false});
