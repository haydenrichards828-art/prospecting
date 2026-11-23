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

