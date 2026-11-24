const {chromium}=require(process.env.PW);const {page}=require('./glmap_check.js');
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
for(const mode of ['leaflet (old)','maplibre (new)']){
 const p=await page(b,1440,900);
 await p.evaluate((mode)=>{ GL16.on=!mode.startsWith('leaflet'); go('drops'); },mode); await p.waitForTimeout(4000);
 await p.evaluate(()=>{ let seed=1;const R=()=>(seed=(seed*16807)%2147483647)/2147483647; const D=[],St=[];let id=1e6;
   for(let s=0;s<1500;s++){ const la=-34.25-R()*0.35, lo=150.82+R()*0.12, pts=[];let a=la,o=lo;for(let k=0;k<6;k++){pts.push([o,a]);a+=(R()-.5)*.003;o+=(R()-.5)*.003;}
     const ids=[];for(let h=0;h<4;h++){const q=pts[h];D.push({id:++id,lat:q[1],lng:q[0],score:R()*100,street:'S'+s,suburb:'Sub'+(s%12),house_number:String(h*2+1),reasons:['x']});ids.push(id);}
     St.push({street:'S'+s,suburb:'Sub'+(s%12),n:4,avg:R()*100,ids,paths:[pts]}); }
   S.drops=D;S.streets=St;S.dlays=new Set(['pins','heat','streets']);drawDropLayer();
   if(S.gl) S.gl.jumpTo({center:[150.88,-34.42],zoom:13}); else S.map.setView([-34.42,150.88],13,{animate:false}); });
 await p.waitForTimeout(2500);
 const gesture=async(name,deltas,gap,ctrl)=>{ const r=await p.evaluate(async({deltas,gap,ctrl})=>{ const el=S.gl?S.gl.getCanvasContainer():S.map.getContainer(), rc=el.getBoundingClientRect(), x=rc.left+450,y=rc.top+400;
     const f=[];let last=performance.now(),rec=1;const tick=t=>{f.push(t-last);last=t;if(rec)requestAnimationFrame(tick)};requestAnimationFrame(tick);
     let long=[]; const po=new PerformanceObserver(l=>l.getEntries().forEach(e=>long.push(Math.round(e.duration))));try{po.observe({entryTypes:['longtask']})}catch{}
     const z0=S.gl?S.gl.getZoom():S.map.getZoom(); const t0=performance.now();
     for(const d of deltas){ el.dispatchEvent(new WheelEvent('wheel',{deltaY:d,deltaMode:0,clientX:x,clientY:y,ctrlKey:!!ctrl,bubbles:true,cancelable:true})); await new Promise(r=>setTimeout(r,gap)); }
     const tEnd=performance.now(); await new Promise(r=>setTimeout(r,1200)); rec=0; po.disconnect();
     const all=f.slice(1), during=all.slice(0,Math.round((tEnd-t0)/16.7)+20).sort((a,b)=>a-b),n=during.length;
     return {p50:during[n>>1].toFixed(1),p95:during[Math.floor(n*.95)].toFixed(1),over34ms:during.filter(x=>x>34).length+'/'+n,longTasks:long.join(',')||'none',zoom:(z0).toFixed(1)+'>'+(S.gl?S.gl.getZoom():S.map.getZoom()).toFixed(2)};
   },{deltas,gap,ctrl}); console.log((mode+' | '+name).padEnd(34),JSON.stringify(r)); };
 const tp=Array.from({length:60},(_,i)=>(2+4*Math.sin(i/60*Math.PI)));
 await gesture('trackpad zoom in',tp.map(d=>-d),16); await gesture('trackpad zoom out',tp,16);
 await gesture('mouse 3 notches in',[-100,-100,-100],110); await gesture('pinch out',Array.from({length:40},()=>3),16,true);
 await p.close(); }
 await b.close();})();
