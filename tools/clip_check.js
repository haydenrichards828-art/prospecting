// Finds buttons, links and boxes that are cut off: clipped by a box that hides what spills out, pushed past the
// screen edge, partly covered by something on top (a side panel, a bar), or with their words cut short.
// Runs every main screen and the common open panels at four screen sizes, in demo mode.
// Things scrolled out of view, and things behind a full screen sheet, are not counted: that is normal.
// Usage: PW=/path/to/playwright node tools/clip_check.js        (exit 1 when something is cut off)
const {chromium}=require(process.env.PW||'playwright');
const SIZES=[[1500,900,'wide'],[1213,720,'laptop'],[1024,700,'small'],[400,860,'phone']];
const open=sel=>`(()=>{ const e=document.querySelector(${JSON.stringify(sel)}); if(e) e.click(); })()`;
const STATES=[
 ['calls',"go('calls');setView('call')"],
 ['call list',"go('calls');S.view='list';S.lsub='Thirroul';render()"],
 ['call back sheet',"go('calls');setView('call');setTimeout(()=>document.querySelector('.bar2x button:nth-child(3)')?.click(),300)"],
 ['more sheet',"go('calls');setView('call');setTimeout(()=>[...document.querySelectorAll('.ends2 button')].find(b=>/More/.test(b.textContent))?.click(),300)"],
 ['leads',"sideGo('leads')"],
 ['lead open',"sideGo('leads');setTimeout(()=>document.querySelector('.lt3:not(.h), .lead2, .g2 .r2')?.click(),400)"],
 ['add lead',"sideGo('leads');setTimeout(()=>document.querySelector('.hadd5, button[aria-label=Add]')?.click(),400)"],
 ['board',"sideGo('board')"],
 ['lead menu',"sideGo('board');setTimeout(()=>document.querySelector('.lm6')?.click(),500)"],
 ['appraisals',"sideGo('appraisal')"],
 ['appraisal open',"sideGo('appraisal');setTimeout(()=>document.querySelector('.pt3:not(.h), .cd3 .cn3')?.click(),500)"],
 ['listings',"sideGo('listed')"],
 ['card drops',"go('drops')"],
 ['drop filters',"go('drops');setTimeout(()=>document.querySelector('.dfb5')?.click(),900)"],
 ['stats',"go('insights')"],
 ['settings',"go('settings')"],
 ['search',"go('calls');setTimeout(()=>{ const i=[...document.querySelectorAll('#hq,#hq2')].find(x=>x.offsetParent); if(i){ i.value='Hill'; i.dispatchEvent(new Event('input',{bubbles:true})); } else togglePS&&togglePS(); },300)"],
];
function scan(){
  const out=[], vw=innerWidth, vh=innerHeight, ov=document.getElementById('ov'), ovOn=!!(ov&&ov.classList.contains('show'));
  const ovR=ovOn?ov.getBoundingClientRect():null, docked=ovOn&&ovR.width<vw-4;
  const desc=a=>a?(a.tagName.toLowerCase()+(a.id?'#'+a.id:'')+([...a.classList].slice(0,2).map(c=>'.'+c).join(''))):'?';
  const label=e=>(e.getAttribute('aria-label')||e.textContent||e.placeholder||e.value||'').trim().replace(/\s+/g,' ').slice(0,28)||desc(e);
  const fixedish=t=>{ for(let a=t;a&&a!==document.body;a=a.parentElement){ const p=getComputedStyle(a).position; if(p==='fixed'||p==='sticky') return a; } return null; };
  const scroller=e=>{ for(let a=e.parentElement;a;a=a.parentElement){ const s=getComputedStyle(a); if(/(auto|scroll)/.test(s.overflowY+s.overflowX)&&(a.scrollHeight>a.clientHeight+1||a.scrollWidth>a.clientWidth+1)) return a; } const d=document.scrollingElement; return d.scrollHeight>d.clientHeight+1?d:null; };
  for(const e of document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea,[onclick],summary')){
    const r=e.getBoundingClientRect(); if(r.width<2||r.height<2) continue;
    const cs=getComputedStyle(e); if(cs.visibility==='hidden'||+cs.opacity===0) continue;
    if(e.closest('[hidden],[aria-hidden="true"],.leaflet-container,.leaflet-control-container,#demobar')) continue;   // the demo banner is not in the real app
    if(ovOn&&!docked&&!ov.contains(e)) continue;            // behind a sheet that covers the screen: on purpose
    let x1=r.left,y1=r.top,x2=r.right,y2=r.bottom,why=null;
    for(let a=e.parentElement;a&&a!==document.documentElement;a=a.parentElement){ const s=getComputedStyle(a); if(s.overflowX==='visible'&&s.overflowY==='visible') continue;
      const ar=a.getBoundingClientRect(), sx=/(auto|scroll)/.test(s.overflowX)&&a.scrollWidth>a.clientWidth+1, sy=/(auto|scroll)/.test(s.overflowY)&&a.scrollHeight>a.clientHeight+1;
      if(s.overflowX!=='visible'&&!sx&&(x1<ar.left-1||x2>ar.right+1)) why=why||'clipped at the side by '+desc(a);
      if(s.overflowY!=='visible'&&!sy&&(y1<ar.top-1||y2>ar.bottom+1)) why=why||'clipped top or bottom by '+desc(a);
      x1=Math.max(x1,ar.left); x2=Math.min(x2,ar.right); y1=Math.max(y1,ar.top); y2=Math.min(y2,ar.bottom); }
    if(x2-x1<1||y2-y1<1){ if(!why) continue; }               // scrolled out of view: fine
    else {
      if(!scroller(e)&&(r.left<-1||r.right>vw+1||r.bottom>vh+1)) why=why||'past the screen edge';
      let cov=0,tot=0,by=null;
      for(const fx of [.1,.5,.9]) for(const fy of [.25,.5,.75]){ const px=x1+(x2-x1)*fx, py=y1+(y2-y1)*fy; if(px<0||py<0||px>=vw||py>=vh) continue; tot++;
        const t=document.elementFromPoint(px,py); if(!t||t===e||e.contains(t)||t.contains(e)) continue;
        const f=fixedish(t), sc=scroller(e); if(f&&!f.contains(e)&&sc&&!(docked&&ov.contains(t))) continue;   // a bar over content that scrolls out from under it
        cov++; by=by||t; }
      if(cov&&cov<tot) why=why||'partly covered by '+desc(by);
      else if(cov&&cov===tot&&docked&&!ov.contains(e)&&ov.contains(by)) why=why||'hidden under the side panel';
    }
    if(!why&&e.tagName!=='INPUT'&&e.tagName!=='TEXTAREA'&&e.tagName!=='SELECT'&&e.scrollWidth>e.clientWidth+2&&cs.textOverflow!=='ellipsis'&&cs.overflowX!=='visible') why='words cut off';
    // words that spill past their button's edge (the button itself fits, the text inside does not), unless they end in ...
    if(!why&&!/INPUT|TEXTAREA|SELECT/.test(e.tagName)){ const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT); let t;
      while((t=w.nextNode())){ if(!t.textContent.trim()) continue; const pe=t.parentElement, ps=getComputedStyle(pe); if(ps.textOverflow==='ellipsis'&&pe.scrollWidth>pe.clientWidth) continue; if(pe.closest('[hidden]')||ps.display==='none'||ps.visibility==='hidden') continue;
        const rg=document.createRange(); rg.selectNodeContents(t); const tr=rg.getBoundingClientRect(); if(tr.width<1) continue;
        if(tr.left<r.left-1||tr.right>r.right+1){ why='words spill past the edge ("'+t.textContent.trim().slice(0,16)+'")'; break; } } }
    if(why) out.push(label(e)+': '+why); }
  return [...new Set(out)]; }
(async()=>{ const b=await chromium.launch(); let n=0;
  for(const [w,h,tag] of SIZES) for(const [name,js] of STATES){
    const p=await b.newPage({viewport:{width:w,height:h}});
    await p.route(/tile|arcgis|openstreetmap|unpkg|jsdelivr|routing|nsw\.gov|google/,r=>r.abort());
    await p.addInitScript(()=>{ const T=Date.parse('2026-11-23T10:30:00+11:00'),R=Date.now(),O=Date; Date.now=()=>T+(O.prototype.getTime.call(new O())-R); try{ localStorage.setItem('dp_hint6','1'); }catch{} });
    await p.goto('http://localhost:8765/index.html#demo'); await p.waitForTimeout(1300);
    await p.evaluate(js).catch(()=>{}); await p.waitForTimeout(1300);
    await p.addStyleTag({content:'*{animation:none!important;transition:none!important}#toast{display:none!important}'}); await p.waitForTimeout(150);
    const found=await p.evaluate(scan); if(found.length){ n+=found.length; console.log(`${tag} ${name}:`); found.forEach(f=>console.log('   '+f)); }
    await p.close(); }
  await b.close(); console.log(n?`${n} cut off things found.`:'Nothing cut off.'); process.exit(n?1:0); })();
