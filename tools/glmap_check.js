// Card drop map (MapLibre) feature check. Needs leaflet, leaflet.heat and maplibre-gl installed in /tmp/lf. Forces MapLibre on even without a graphics chip.
const {chromium}=require(process.env.PW);const fs=require('fs');
const LF='/tmp/lf/node_modules/';
async function page(b,w,h,mobile){ const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:mobile?2:1,isMobile:!!mobile,hasTouch:!!mobile});
 p.on('pageerror',e=>console.log('ERR',e.message)); p.on('console',m=>{ if(m.type()==='error'&&!/Failed to load|net::/.test(m.text())) console.log('CONSOLE',m.text().slice(0,200)); });
 await p.route(/unpkg\.com\/(.*)/,r=>{const u=r.request().url(); let f;
   if(u.includes('maplibre-gl')) f=LF+'maplibre-gl/dist/'+(u.endsWith('.css')?'maplibre-gl.css':'maplibre-gl.js');
   else f=u.includes('heat')?LF+'leaflet.heat/dist/leaflet-heat.js':u.endsWith('.css')?LF+'leaflet/dist/leaflet.css':LF+'leaflet/dist/leaflet.js';
   r.fulfill({body:fs.readFileSync(f),contentType:u.endsWith('.css')?'text/css':'application/javascript'})});
 await p.route(/tile\.openstreetmap|arcgis|nsw\.gov/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
 await p.route(/jsdelivr|routing|google|supabase/,r=>r.abort());
 await p.addInitScript(()=>{ window.__glForce=1; }); await p.goto('http://localhost:8765/index.html#demo');await p.waitForTimeout(1500); return p; }
module.exports={page};
if(require.main===module)(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const p=await page(b,1440,900);
 await p.evaluate(()=>go('drops'));await p.waitForTimeout(3500);
 console.log('gl',await p.evaluate(()=>[!!S.gl,!!S.map,GL16.on,S.gl&&S.gl.loaded(),S.gl&&S.gl.getStyle().layers.map(l=>l.id).join(',')]));
 await p.screenshot({path:'/tmp/gl1.png'});
 await p.evaluate(()=>{S.dlays=new Set(['pins','heat','streets']);drawDropLayer();});await p.waitForTimeout(800);await p.screenshot({path:'/tmp/gl2.png'});
 await p.click('.dfb5');await p.waitForTimeout(400);await p.screenshot({path:'/tmp/gl3.png'});
 await p.evaluate(()=>popClose5());
 await p.click('.bs14 .bsm14');await p.waitForTimeout(1200);await p.screenshot({path:'/tmp/gl4.png'});
 // tap a pin
 const pt=await p.evaluate(()=>{const f=S.gl.queryRenderedFeatures({layers:['pins']})[0];if(!f)return null;const q=S.gl.project(f.geometry.coordinates);const r=S.gl.getContainer().getBoundingClientRect();return [r.left+q.x,r.top+q.y]});
 if(pt){await p.mouse.click(pt[0],pt[1]);await p.waitForTimeout(500);} await p.screenshot({path:'/tmp/gl5.png'});
 console.log('popup',await p.evaluate(()=>document.querySelector('.maplibregl-popup-content')?.innerText.replace(/\n/g,' | ')));
 await p.click('.wk14');await p.waitForTimeout(300);await p.click('.wkr14');await p.waitForTimeout(2500);await p.screenshot({path:'/tmp/gl6.png'});
 console.log('walk',await p.evaluate(()=>[S.gl16walk,(S.gl16wk||[]).length,document.querySelector('.wk14')?.textContent]));
 await p.click('.wk14');await p.waitForTimeout(500);
 console.log('after clear',await p.evaluate(()=>[S.gl16walk,S.gl.getLayoutProperty('pins','visibility')]));
 await p.evaluate(()=>{S.dview='list';drawDrops()});await p.waitForTimeout(500);
 await p.evaluate(()=>{S.dview='map';drawDrops()});await p.waitForTimeout(2500);
 console.log('back',await p.evaluate(()=>[!!S.gl,document.querySelectorAll('#dmap .maplibregl-canvas').length]));
 await p.evaluate(()=>go('calls'));await p.waitForTimeout(500); console.log('left',await p.evaluate(()=>!!S.gl));
 await p.close();
 const m=await page(b,390,844,true); await m.evaluate(()=>go('drops'));await m.waitForTimeout(3500); await m.screenshot({path:'/tmp/gl7.png'});
 console.log('mobile',await m.evaluate(()=>[!!S.gl,S.gl&&S.gl.loaded()]));
 await b.close();})();
