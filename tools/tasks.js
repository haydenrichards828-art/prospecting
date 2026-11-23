// Runs the main jobs in the demo the way a person would and counts the effort each one takes:
// taps, characters typed, drags, screens passed through, and how quickly the screen answered each tap.
// It also estimates an experienced person's time with the keystroke level model (Card, Moran and Newell 1980):
// a tap is think 1.35s + point 1.1s + press 0.2s, a shortcut key is think 1.35s + key 0.28s,
// typing is 0.4s to move to the keyboard plus 0.28s a character, a drag is think + point + press + point + release.
// Usage: PW=/path/to/playwright node tools/tasks.js [--write]   (--write saves the numbers as the new budget)
const {chromium}=require(process.env.PW||'playwright'); const fs=require('fs'), path=require('path');
const BUD=path.join(__dirname,'tasks.json'), URL=process.env.URL||'http://localhost:8765/index.html#demo';
const KLM={tap:2.65,key:1.63,home:0.4,char:0.28,drag:3.75};
const NUM='a.num2:visible, a.pnum2:visible', bar=t=>`.bar2x button:visible:has-text("${t}")`;
const JOBS=[
 {name:'Log a no answer and move to the next call', go:p=>p.evaluate(()=>go('calls')), steps:[['tap',NUM],['tap',bar('No answer')]], ok:p=>p.evaluate(()=>!!document.querySelector('a.num2,a.pnum2'))},
 {name:'Log a call with a note',               go:p=>p.evaluate(()=>go('calls')), steps:[['tap',NUM],['type','#note2:visible, #pnote2:visible','Wants to sell in spring'],['tap',bar('Not selling')]], ok:p=>p.evaluate(()=>!!document.querySelector('a.num2,a.pnum2'))},
 {name:'Book an appraisal from a call',        go:p=>p.evaluate(()=>go('calls')), steps:[['tap',NUM],['tap',bar('Appraisal')],['tap','#sheet button.r2 >> nth=0'],['tap','#sheet :is(a,button):visible:has-text("Open in Messages")']], ok:p=>p.evaluate(()=>!document.getElementById('ov').classList.contains('show'))},
 {name:'Book a call back',                     go:p=>p.evaluate(()=>go('calls')), steps:[['tap',NUM],['tap',bar('Call back')],['tap','#sheet button.r2 >> nth=0']], ok:p=>p.evaluate(()=>!document.getElementById('ov').classList.contains('show'))},
 {name:'Find a person and open them',          go:p=>p.evaluate(()=>go('calls')), steps:[['tap','#hq:visible, button.ib3:visible'],['type','#hq:visible, #hq2:visible','Hill'],['wait',900],['tap','#main .card.lead >> nth=0']], ok:p=>p.evaluate(()=>document.getElementById('ov').classList.contains('show')||!!document.querySelector('.lsheet,.lp2,.ldet'))},
 {name:'Add a lead by hand',                   go:p=>p.evaluate(()=>go('leads')), steps:[['tap','.hadd5:visible, button[aria-label="Add"]:visible'],['type','#qa_name','Kim Lee'],['type','#qa_phone','0400111222'],['type','#qa_addr','9 Test St, Thirroul'],['tap','#qa_go']], ok:p=>p.evaluate(()=>!document.getElementById('ov').classList.contains('show'))},
 {name:'Move a lead to appraisals',            go:p=>p.click('button.si2:has-text("Pipeline")'), steps:[['drag','.bc3.ld .cd3 >> nth=0','.bd3 > .bc3 >> nth=1']], ok:p=>p.evaluate(()=>document.querySelectorAll('.bd3 > .bc3')[1].querySelectorAll('.cd3').length>=2&&+(document.querySelector('.bc3.ld .bh3 span')?.textContent||0)<4)},
 {name:'Move a lead to appraisals with the menu', go:p=>p.evaluate(()=>sideGo('board')), steps:[['tap','.bc3.ld .cd3 >> nth=1 >> .lm6'],['tap','#sheet .mm6:has-text("Moves to Appraisals")']], ok:p=>p.evaluate(()=>document.querySelectorAll('.bd3 > .bc3')[1].querySelectorAll('.cd3').length>=2&&+(document.querySelector('.bc3.ld .bh3 span')?.textContent||0)<4)},
 {name:'Plan a card drop walk',                go:p=>p.evaluate(()=>go('drops')), steps:[['tap','.wkb5'],['tap','button.wkr5 >> nth=0']], ok:p=>p.evaluate(()=>true)},
];
async function run(b,job,vw){ const p=await b.newPage({viewport:vw}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.route(/tile|arcgis|openstreetmap|routing|nsw\.gov|google/,r=>r.abort());
  const LF='/tmp/lf/node_modules/leaflet/dist/';   // leaflet served locally so the card drop map works offline
  await p.route(/unpkg|jsdelivr/,r=>{ const u=r.request().url(); if(u.includes('heat')||!fs.existsSync(LF)) return r.fulfill({body:'window.L&&(L.heatLayer=()=>({addTo(){return this},setLatLngs(){return this},redraw(){return this}}))',contentType:'text/javascript'}); r.fulfill({path:LF+(u.endsWith('.css')?'leaflet.css':'leaflet.js')}); });
  await p.addInitScript(()=>{ const T=Date.parse('2026-11-23T10:30:00+11:00'),R=Date.now(),O=Date; Date.now=()=>T+(O.prototype.getTime.call(new O())-R); window.L=window.L||undefined; });
  await p.goto(URL); await p.waitForTimeout(1200); await job.go(p); await p.waitForTimeout(700);
  await p.evaluate(()=>{ UX.resp=[]; window.__scr=new Set([uxScreen()]); window.__si=setInterval(()=>window.__scr.add(uxScreen()),100); });
  const n={taps:0,chars:0,drags:0,fields:0}; let failed=null;
  for(const [k,a,c] of job.steps){ try{
    if(k==='tap'){ await p.click(a,{timeout:3000}); n.taps++; }
    else if(k==='type'){ const loc=p.locator(a).first(); const cur=await loc.evaluate(e=>e===document.activeElement,null,{timeout:3000}).catch(()=>false); if(!cur){ await loc.click({timeout:3000}); n.taps++; } await p.keyboard.type(c,{delay:10}); n.chars+=c.length; n.fields++; }
    else if(k==='drag'){ await p.dragTo?0:0; await p.locator(a).dragTo(p.locator(c),{timeout:3000}); n.drags++; }
    else if(k==='wait'){ await p.waitForTimeout(a); continue; }
    await p.waitForTimeout(450); }catch(e){ failed=`${k} ${a}: ${e.message.split('\n')[0]}`; await p.screenshot({path:`/tmp/tasks-fail-${job.name.replace(/\W+/g,'-')}-${vw.width}.png`}).catch(()=>{}); break; } }
  await p.waitForTimeout(600);
  const ok=!failed&&await job.ok(p).catch(()=>false);
  const m=await p.evaluate(()=>{ clearInterval(window.__si); const r=UX.resp.slice().sort((a,b)=>a-b); return {screens:window.__scr.size, p75:r.length?r[Math.min(r.length-1,Math.floor(.75*r.length))]:0, worst:r.length?r[r.length-1]:0}; });
  await p.close();
  const est=n.taps*KLM.tap+n.drags*KLM.drag+n.fields*KLM.home+n.chars*KLM.char;
  return {...n,...m,est:+est.toFixed(1),ok,failed,errs:errs.slice(0,2)}; }
const job_note=k=>(JOBS.find(j=>k.endsWith(j.name))||{}).note;
(async()=>{ const b=await chromium.launch(); const out={};
  for(const [dev,vw] of [['desktop',{width:1213,height:720}],['phone',{width:400,height:860}]]){
    for(const j of JOBS){ if(dev==='phone'&&/appraisals$|card drop/.test(j.name)) continue; out[dev+': '+j.name]=await run(b,j,vw); } }
  await b.close();
  const bud=fs.existsSync(BUD)?JSON.parse(fs.readFileSync(BUD,'utf8')):{}; let bad=0;
  console.log('Job'.padEnd(54)+'taps typed screens  est  tap p75  worst');
  for(const [k,r] of Object.entries(out)){ const B=bud[k]; const over=B&&(r.taps+r.drags>B.effort||r.screens>B.screens);
    if((!r.ok&&B)||over) bad++;   // a job that worked before and now fails, or needs more steps, fails the check
    console.log((r.ok?'  ':'X ')+k.padEnd(52)+String(r.taps+r.drags).padStart(4)+String(r.chars).padStart(6)+String(r.screens).padStart(8)+(r.est+'s').padStart(7)+(r.p75+'ms').padStart(9)+(r.worst+'ms').padStart(7)+(over?'  MORE STEPS THAN BEFORE':'')+(r.failed?'  '+r.failed:'')+(!r.ok&&!r.failed&&job_note(k)?'  '+job_note(k):'')+(r.errs.length?'  page error: '+r.errs[0]:'')); }
  if(process.argv.includes('--write')){ const nb={}; for(const [k,r] of Object.entries(out)) if(r.ok) nb[k]={effort:r.taps+r.drags,screens:r.screens}; fs.writeFileSync(BUD,JSON.stringify(nb,null,1)); console.log('Saved as the budget.'); }
  fs.writeFileSync('/tmp/tasks-result.json',JSON.stringify(out,null,1));
  process.exit(bad&&!process.argv.includes('--write')?1:0); })();
