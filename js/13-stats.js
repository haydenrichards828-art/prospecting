// ---------- Stats, one screen (23 Nov) ----------
// Call results across the top double as the key to the dots: one dot per call, coloured by how far it got,
// filled towards the period's goal. Phone time and best time to call underneath, appraisals by suburb beside them.
const ST9={per:'week',off:0,cache:{}};
const ST9_K=[['so','Sold','#f5b83d'],['ap','Appraisal','var(--ap)'],['ld','Lead','var(--ld)'],['an','Answered','#64748b'],['na','No answer','#7C3AED']];
const ST9_T=[['talk','Talking','#e2e8f0'],['ring','Ringing','#8b95a5'],['between','Between calls','#3a4352']];
function st9Today(){ const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Sydney',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(x=>[x.type,x.value])); return new Date(Date.UTC(+p.year,+p.month-1,+p.day)); }
const st9Iso=d=>d.toISOString().slice(0,10);
function st9Range(per,off){ const t=st9Today(); let a,b;
  if(per==='week'){ const dow=(t.getUTCDay()+6)%7; a=new Date(t); a.setUTCDate(t.getUTCDate()-dow+7*off); b=new Date(a); b.setUTCDate(a.getUTCDate()+6); }
  else if(per==='month'){ a=new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth()+off,1)); b=new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth()+1,0)); }
  else if(per==='quarter'){ const q=Math.floor(t.getUTCMonth()/3)+off; a=new Date(Date.UTC(t.getUTCFullYear(),q*3,1)); b=new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth()+3,0)); }
  else { a=new Date(Date.UTC(t.getUTCFullYear()+off,0,1)); b=new Date(Date.UTC(t.getUTCFullYear()+off,11,31)); }
  return [a,b]; }
function st9Label(per,a,b){ const yr=st9Today().getUTCFullYear(), M=d=>d.toLocaleDateString('en-AU',{month:'short',timeZone:'UTC'}), ML=d=>d.toLocaleDateString('en-AU',{month:'long',timeZone:'UTC'}), Y=d=>d.getUTCFullYear()!==yr?' '+d.getUTCFullYear():'';
  if(per==='week') return a.getUTCMonth()===b.getUTCMonth()?`${a.getUTCDate()} to ${b.getUTCDate()} ${M(b)}${Y(b)}`:`${a.getUTCDate()} ${M(a)} to ${b.getUTCDate()} ${M(b)}${Y(b)}`;
  if(per==='month') return ML(a)+Y(a);
  if(per==='quarter') return `${M(a)} to ${M(b)}${Y(b)}`;
  return String(a.getUTCFullYear()); }
function st9Demo(per,a,b){ let seed=a.getTime()%2147483647||7; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const wd=[...Array(Math.round((b-a)/864e5)+1)].map((_,i)=>new Date(a.getTime()+i*864e5)).filter(d=>d.getUTCDay()%6).length, goal=wd*100;
  const t=st9Today(), past=b<t?1:a>t?0:Math.max(.02,((t-a)/864e5+1)/((b-a)/864e5+1)), calls=Math.round(goal*(per==='week'&&ST9.off===0?.026:.66)*past);
  const mix={so:Math.round(calls*.006),ap:Math.round(calls*.034),ld:Math.round(calls*.045),na:Math.round(calls*.41)}; mix.an=calls-mix.so-mix.ap-mix.ld-mix.na;
  const heat=[]; if(calls>=100) for(let d=1;d<=6;d++) for(let h=9;h<=18;h++){ const n=Math.round(calls/60*(.5+rnd())), v=Math.min(.95,.3+.25*Math.sin(h*.9+d)+(h>=16?.2:0)+rnd()*.15); heat.push({d,h,n,a:Math.round(n*v)}); }
  const active=Math.round(calls*190);
  const subs=['Thirroul','Woonona','Bulli','Corrimal','Austinmer'].map((s,i)=>({s,n:Math.round(calls*(.28-i*.04)),ap:Math.round(mix.ap*(.3-i*.04))})).filter(x=>x.ap>0);
  return {calls,goal,mix,time:{talk:Math.round(active*.12),ring:Math.round(active*.04),between:Math.round(active*.84),active,timed:calls},heat,heat_calls:calls,suburbs:subs}; }
async function st9Load(){ const [a,b]=st9Range(ST9.per,ST9.off), key=ST9.per+'|'+st9Iso(a);
  if(ST9.cache[key]) return ST9.cache[key];
  let d; if(DEMO) d=st9Demo(ST9.per,a,b);
  else { const r=await fetch(BOOT,{method:'POST',headers:{'Content-Type':'application/json','x-session':S.token},body:JSON.stringify({action:'stats',from:st9Iso(a),to:st9Iso(b)})}); d=await r.json(); if(!r.ok) throw new Error(d.error||'Could not load stats'); }
  ST9.cache[key]=d; return d; }
const st9hm=s=>{ const m=Math.round((+s||0)/60); return m>=600?Math.round(m/60)+'h':m>=60?Math.floor(m/60)+'h '+(m%60?m%60+'m':''):m+'m'; };
const st9pc=(a,b)=>b?Math.round(a/b*100):0;
function st9Paint(d){ const m=$("#main"); if(!m||S.tab!=='insights') return;
  const [a,b]=st9Range(ST9.per,ST9.off), N=d.calls||0, goal=Math.max(d.goal||0,1), mix=d.mix||{};
  const res=ST9_K.map(([k,l,c])=>`<div><u style="background:${c}"></u><span>${l}</span><b>${(mix[k]||0).toLocaleString('en-AU')}<small>${st9pc(mix[k]||0,N)}%</small></b></div>`).join('');
  const T=d.time||{}, act=T.active||0, hasT=act>0&&(T.timed||0)>0;
  const tbar=hasT?ST9_T.map(([k,,c])=>`<i style="flex:${Math.max(T[k]||0,0)};background:${c}"></i>`).join(''):'<i style="flex:1;background:#1d222a"></i>';
  const tleg=ST9_T.map(([k,l,c])=>`<span><u style="background:${c}"></u><b>${hasT?st9pc(T[k]||0,act)+'%':'0%'}</b> ${l}</span>`).join('');
  // best time: days down the side, hours along the bottom; a slot needs 5 calls before it counts
  const H={}; (d.heat||[]).forEach(x=>{ H[x.d+'|'+x.h]=x; }); const hrs=[9,10,11,12,13,14,15,16,17,18], dn=['Mon','Tue','Wed','Thu','Fri','Sat'];
  const enough=(d.heat_calls||0)>=100; let best=null; const rates=[];
  if(enough) for(let i=1;i<=6;i++) for(const h of hrs){ const x=H[i+'|'+h]; if(x&&x.n>=5){ const r=x.a/x.n; rates.push(r); if(!best||r>best.r) best={r,d:dn[i-1],h}; } }
  const top=rates.slice().sort((p,q)=>q-p)[Math.min(4,rates.length-1)]??2, lo=Math.min(...rates,1), hi=Math.max(...rates,0);
  const hl=h=>(h%12||12)+(h<12?'am':'pm');
  let hm=''; dn.forEach((nm,i)=>{ hm+=`<span>${nm}</span>`; hrs.forEach(h=>{ const x=H[(i+1)+'|'+h]; if(!enough||!x||x.n<5){ hm+='<i></i>'; return; } const r=x.a/x.n, v=hi>lo?(r-lo)/(hi-lo):1;
    hm+=`<i title="${nm} ${hl(h)}: ${x.a} of ${x.n} answered" style="background:rgba(37,99,235,${(.18+v*.82).toFixed(2)})">${r>=top?Math.round(r*100)+'%':''}</i>`; }); });
  hm+='<span></span>'+hrs.map(h=>`<span class="dd">${hl(h)}</span>`).join('');
  const subs=d.suburbs||[], mx=Math.max(1,...subs.map(x=>x.ap));
  const sub=subs.length?subs.map(x=>`<div><span>${esc(x.s)}</span><b>${x.ap}</b><small>${x.n?(x.ap/x.n*100).toFixed(1):'0'}</small><em><i style="width:${x.ap/mx*100}%"></i></em></div>`).join(''):'<p class="no9">No appraisals booked in this period yet.</p>';
  m.classList.add('st9main');
  m.innerHTML=`<div class="s9">
   <div class="tp9"><div class="h9">Call results</div>
    <div class="nav9"><button class="ar9" onclick="st9Go(-1)" aria-label="Previous ${ST9.per}">${ic2('back',18)}</button><b>${st9Label(ST9.per,a,b)}</b><button class="ar9" onclick="st9Go(1)" aria-label="Next ${ST9.per}" ${ST9.off>=0?'disabled':''}>${ic2('chev',18)}</button>
     <div class="sg9" role="tablist">${['week','month','quarter','year'].map(p=>`<button role="tab" aria-selected="${p===ST9.per}" class="${p===ST9.per?'on':''}" onclick="st9Per('${p}')">${p[0].toUpperCase()+p.slice(1)}</button>`).join('')}</div></div></div>
   <div class="rs9">${res}<div class="tot9"><span>Calls</span><b>${N.toLocaleString('en-AU')}<small>of ${goal.toLocaleString('en-AU')}</small></b></div></div>
   <div class="dots9"><canvas id="dots9" aria-label="${N} calls of ${goal}" role="img"></canvas></div>
   <div class="st9">
    <div class="c9">
     <div class="h9">Phone time<small>${hasT?st9hm(act)+' total':''}</small></div>
     <div class="pb9">${tbar}</div><div class="pl9">${tleg}</div>
     <div class="h9" style="margin-top:22px">Best time to call<small>${best?`Best ${best.d} ${hl(best.h)}, ${Math.round(best.r*100)}% pick up`:''}</small></div>
     ${enough?'':`<div class="bt9"><b>${(d.heat_calls||0)} of 100 calls</b><em><i style="width:${Math.min(100,d.heat_calls||0)}%"></i></em><span>Fills in at 100 calls</span></div>`}
     <div class="hm9">${hm}</div>
     <div class="sc9"><span>Fewer answered</span><i></i><span>More</span></div>
    </div>
    <div class="c9"><div class="h9">Appraisals by suburb<small>per 100</small></div><div class="sb9${subs.length>=4?' full':''}">${sub}</div></div>
   </div></div>`;
  st9Dots(d); }
function st9Dots(d){ const c=$('#dots9'); if(!c) return; const box=c.parentElement, W=box.clientWidth, Hh=box.clientHeight; if(!W||!Hh) return;
  const N=d.calls||0, n=Math.max(d.goal||0,N,1), dpr=devicePixelRatio||1; c.width=Math.round(W*dpr); c.height=Math.round(Hh*dpr); c.style.width=W+'px'; c.style.height=Hh+'px';
  const x=c.getContext('2d'); x.scale(dpr,dpr); const cs=getComputedStyle(document.documentElement);
  const col=Object.fromEntries(ST9_K.map(([k,,v])=>[k,v.startsWith('var(')?(cs.getPropertyValue(v.slice(4,-1)).trim()||'#888'):v]));
  const cols=Math.max(1,Math.round(Math.sqrt(n*W/Hh))), rows=Math.ceil(n/cols), cw=W/cols, ch=Hh/rows, g=cw>8?2:cw>4?1:.6, r=cw>10?2:0;
  const seq=[]; ST9_K.forEach(([k])=>{ for(let i=0;i<(d.mix||{})[k];i++) seq.push(col[k]); });
  for(let i=0;i<n;i++){ const rr=Math.floor(i/cols), k=i%cols; x.fillStyle=seq[i]||'#1a1f26'; const px=k*cw, py=rr*ch, w=Math.max(.8,cw-g), h=Math.max(.8,ch-g);
    if(r&&x.roundRect){ x.beginPath(); x.roundRect(px,py,w,h,r); x.fill(); } else x.fillRect(px,py,w,h); } }
async function st9Show(){ const m=$("#main"); if(!m) return; const [a]=st9Range(ST9.per,ST9.off), key=ST9.per+'|'+st9Iso(a);
  if(ST9.cache[key]) return st9Paint(ST9.cache[key]);
  if(!m.querySelector('.s9')) m.innerHTML='<div class="s9"><p class="no9" style="padding:24px 0">Loading stats</p></div>';
  else m.querySelector('.s9').classList.add('ld9');
  try{ const d=await st9Load(); if(S.tab==='insights') st9Paint(d); }catch(e){ m.querySelector('.s9')?.classList.remove('ld9'); toast(e.message||'Could not load stats'); } }
function st9Go(n){ if(ST9.off+n>0) return; ST9.off+=n; st9Show(); }
function st9Per(p){ ST9.per=p; ST9.off=0; try{ localStorage.setItem('dp_st9',p); }catch{} st9Show(); }
try{ const p=localStorage.getItem('dp_st9'); if(['week','month','quarter','year'].includes(p)) ST9.per=p; }catch{}
window.viewInsights=async function(){ ST9.cache={}; return st9Show(); };
window.paintInsights=function(){ if(S.tab==='insights') st9Show(); };
window.render=(function(o){ return function(...a){ const m=$("#main"); if(m&&S.tab!=='insights') m.classList.remove('st9main'); return o.apply(this,a); }; })(window.render);
let st9rz; addEventListener('resize',()=>{ clearTimeout(st9rz); st9rz=setTimeout(()=>{ if(S.tab==='insights'){ const [a]=st9Range(ST9.per,ST9.off), d=ST9.cache[ST9.per+'|'+st9Iso(a)]; if(d) st9Dots(d); } },120); });

