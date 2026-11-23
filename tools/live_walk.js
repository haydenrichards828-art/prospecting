// Live mode walk (24 Nov): the real app, not the demo, against a stand-in server built from the demo answers. Visits every screen on desktop and phone and reports page errors and error toasts. The demo hid a bug where Stats and Needs a number could never load live; this catches that kind.
// Usage: PW=$(npm root -g)/playwright node tools/with_server.js node tools/live_walk.js
const {chromium}=require(process.env.PW);
(async()=>{const b=await chromium.launch();
for(const [w,h] of [[1440,900],[390,844]]){
 const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:w<900,isMobile:w<900});
 const p0=await ctx.newPage(); await p0.goto('http://localhost:8765/index.html#demo'); await p0.waitForTimeout(1200);
 const rec=await p0.evaluate(()=>{ const out={}; for(const a of ['list','today','callbacks','upcoming_callbacks','leads','pipeline','overview','work_stats','settings','templates','messages','elists','drops','list_health','search']){ try{ out[a]=JSON.parse(JSON.stringify(demoApi(a,{type:'seller',days:7,q:'a'}))); }catch(e){} } out.referrals={partners:[],referrals:[]}; try{ const [a,b]=st9Range('week',0); out.stats=JSON.parse(JSON.stringify(st9Demo('week',a,b))); }catch(e){} out.nophone={rows:[]}; return out; });
 await p0.close();
 const seen=new Set();
 await ctx.route(/supabase\.co\/functions\/v1\//,async r=>{ const q=r.request(); const h={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*'}; if(q.method()==='OPTIONS') return r.fulfill({status:204,headers:h});
   const fn=q.url().split('/v1/')[1].split('?')[0]; let a; try{ a=JSON.parse(q.postData()||'{}').action; }catch{} seen.add(fn+':'+(a||''));
   if(fn==='boot'&&!a) return r.fulfill({status:200,headers:h,body:JSON.stringify({list:rec.list,today:{...rec.today,holidays:[]},callbacks:rec.callbacks})});
   if(fn==='inbox') return r.fulfill({status:200,headers:h,body:JSON.stringify({connected:false})});
   if(fn==='streetview') return r.fulfill({status:404,headers:h,body:'{}'});
   r.fulfill({status:200,headers:h,body:JSON.stringify(rec[a]||{ok:true,rows:[]})}); });
 await ctx.route(/tile|arcgis|openstreetmap|google|routing|nsw\.gov|unpkg|jsdelivr|fonts\./,r=>r.abort());
 await ctx.addInitScript(()=>{ try{ localStorage.setItem('dp_token','test-token-123456789'); }catch{} });
 const p=await ctx.newPage(); const errs=[];
 p.on('pageerror',e=>errs.push('ERR '+e.message));
 await p.exposeFunction('__toast',t=>errs.push('TOAST '+t));
 await p.addInitScript(()=>{ addEventListener('unhandledrejection',e=>console.log('UNHANDLED',e.reason&&e.reason.message)); });
 p.on('console',m=>{ if(m.text().startsWith('UNHANDLED')) errs.push(m.text()); });
 await p.goto('http://localhost:8765/index.html'); await p.waitForTimeout(2500);
 await p.evaluate(()=>{ const o=window.toast; window.toast=function(t,...a){ if(/couldn|error|not defined|failed|wrong|problem/i.test(String(t))) window.__toast(String(t)); return o.call(this,t,...a); }; });
 const screens=[['calls list',"go('calls');S.view='list';render()"],['call screen',"go('calls');setView('call')"],['needs a number',"go('calls');S.view='list';render();setTimeout(()=>document.querySelector('.rail2 button[data-oh=f]')?.click(),400)"],['leads',"go('leads')"],['pipeline',"go('pipeline')"],['card drops',"go('drops')"],['stats',"go('insights')"],['messages',"go('messages')"],['settings',"go('settings')"],['search',"S.searching=true;S.sq='smith';go('calls')"]];
 for(const [n,js] of screens){ const before=errs.length; await p.evaluate(js).catch(e=>errs.push('EVAL '+e.message)); await p.waitForTimeout(1500); const txt=await p.evaluate(()=>document.querySelector('#main')?.innerText.slice(0,60).replace(/\s+/g,' ')); console.log(w, n.padEnd(15), errs.length>before?errs.slice(before).join(' | '):'ok', '·', txt); }
 console.log(w,'server calls:',[...seen].sort().join(' '));
 await ctx.close(); }
await b.close();})();
