// Zoom smoothness test: Leaflet default scroll zoom vs the smooth zoom, on a big made up map. Run: PW=$(npm root -g)/playwright node tools/with_server.js node tools/zoom_smooth.js (needs leaflet in /tmp/lf)
const {chromium}=require(process.env.PW);const fs=require('fs');
(async()=>{const b=await chromium.launch();
for (const mode of ['leaflet default','new smooth']){
 const p=await b.newPage({viewport:{width:1440,height:900}});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.route(/unpkg\.com\/(leaflet.*)/,r=>{const u=r.request().url();const f=u.includes('heat')?'/tmp/lf/node_modules/leaflet.heat/dist/leaflet-heat.js':u.endsWith('.css')?'/tmp/lf/node_modules/leaflet/dist/leaflet.css':'/tmp/lf/node_modules/leaflet/dist/leaflet.js';r.fulfill({body:fs.readFileSync(f),contentType:u.endsWith('.css')?'text/css':'application/javascript'})});
 let tiles=0; await p.route(/tile\.openstreetmap|arcgis|nsw\.gov/,r=>{tiles++;r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')})});
 await p.route(/jsdelivr|routing|google|supabase/,r=>r.abort());
 await p.goto('http://localhost:8765/index.html#demo');await p.waitForTimeout(1500);
 await p.evaluate(()=>go('drops'));await p.waitForTimeout(2500);
 await p.evaluate((mode)=>{ let seed=1;const R=()=>(seed=(seed*16807)%2147483647)/2147483647; const D=[],St=[];let id=1e6;
   for(let s=0;s<1500;s++){ const la=-34.25-R()*0.35, lo=150.82+R()*0.12, pts=[];let a=la,o=lo;for(let k=0;k<6;k++){pts.push([o,a]);a+=(R()-.5)*.003;o+=(R()-.5)*.003;}
     const ids=[];for(let h=0;h<4;h++){const q=pts[h];D.push({id:++id,lat:q[1],lng:q[0],score:R()*100,street:'S'+s,suburb:'Sub'+(s%12),house_number:String(h*2+1),reasons:['x']});ids.push(id);}
     St.push({street:'S'+s,suburb:'Sub'+(s%12),n:4,avg:R()*100,ids,paths:[pts]}); }
   S.drops=D;S.streets=St;S.dlays=new Set(['pins','heat','streets']);drawDropLayer();S.map.setView([-34.42,150.88],13,{animate:false});
   if(mode==='leaflet default'){ S.map.smoothWheel14.disable(); S.map.options.scrollWheelZoom=true; S.map.scrollWheelZoom.enable(); }
 },mode);
 await p.waitForTimeout(1500);
 const gesture=async(name,deltas,gap)=>{ const r=await p.evaluate(async({deltas,gap})=>{ const el=S.map.getContainer(), rc=el.getBoundingClientRect(), x=rc.left+450,y=rc.top+400;
     const f=[],me=[];let last=performance.now(),rec=1;const tick=t=>{f.push(t-last);last=t;if(rec)requestAnimationFrame(tick)};requestAnimationFrame(tick);
     const onme=()=>me.push(performance.now());S.map.on('moveend',onme); let long=0; const po=new PerformanceObserver(l=>l.getEntries().forEach(e=>long=Math.max(long,e.duration)));try{po.observe({entryTypes:['longtask']})}catch{}
     const t0=performance.now();
     for(const d of deltas){ el.dispatchEvent(new WheelEvent('wheel',{deltaY:d,deltaMode:0,clientX:x,clientY:y,bubbles:true,cancelable:true})); await new Promise(r=>setTimeout(r,gap)); }
     const tEnd=performance.now(); await new Promise(r=>setTimeout(r,900)); rec=0; S.map.off('moveend',onme); po.disconnect();
     const during=f.slice(1,Math.max(2,Math.round((tEnd-t0)/16.7))).sort((a,b)=>a-b),n=during.length;
     return {p50:during[n>>1].toFixed(1),p95:during[Math.floor(n*.95)].toFixed(1),janky:during.filter(x=>x>34).length+'/'+n,refreshesMidGesture:me.filter(t=>t<tEnd).length,refreshesTotal:me.length,longestTask:Math.round(long),zoom:S.map.getZoom().toFixed(2)};
   },{deltas,gap}); console.log((mode+' | '+name).padEnd(36),JSON.stringify(r)); };
 const tpIn=Array.from({length:60},(_,i)=>-(2+4*Math.sin(i/60*Math.PI))), tpOut=tpIn.map(d=>-d);
 await gesture('trackpad zoom in',tpIn,16); await gesture('trackpad zoom out',tpOut,16);
 await gesture('mouse 3 notches',[-100,-100,-100],110);
 await p.evaluate(()=>S.map.setView([-34.42,150.88],13,{animate:false})); await p.waitForTimeout(600);
 await gesture('pinch in',Array.from({length:40},()=>-3),16);
 await p.close(); }
 await b.close();})();
