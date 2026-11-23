// How long the app takes to show real content, with the real app (not the demo) talking to a pretend server.
// The pretend server answers with demo data after a delay: COLD (server waking up) or WARM.
// Each run opens the app (it always opens on Calls), then switches to each main screen and times it.
// It does that twice in the same browser: a first visit with nothing saved, then a repeat visit.
// Usage: PW=... node tools/load_time.js [cold_ms] [warm_ms]
const {chromium}=require(process.env.PW||'playwright'); const fs=require('fs'), os=require('os'), path=require('path');
const URL='http://localhost:8765/index.html', COLD=+(process.argv[2]||2000), WARM=+(process.argv[3]||400);
const CONTENT={calls:'a.num2:visible, a.pnum2:visible', board:'.cd3', leads:'.lt3:not(.h), .r2', insights:'.s9 .tot9', appraisal:'.pt3:not(.h), .cd3'};
const SWITCH={board:"sideGo('board')", leads:"sideGo('leads')", insights:"go('insights')", appraisal:"sideGo('appraisal')"};
(async()=>{
  const b0=await chromium.launch(); const p0=await b0.newPage(); await p0.goto(URL+'#demo'); await p0.waitForTimeout(1200);
  const rec=await p0.evaluate(()=>{ const out={}; for(const a of ['list','today','callbacks','upcoming_callbacks','leads','pipeline','overview','work_stats','settings','templates','messages','elists']){ try{ out[a]=JSON.parse(JSON.stringify(demoApi(a,{type:'seller',days:7}))); }catch(e){} } out.referrals={partners:[],referrals:[]}; try{ const [a,b]=st9Range('week',0); out.stats=JSON.parse(JSON.stringify(st9Demo('week',a,b))); }catch(e){} return out; });
  await b0.close();
  const rows=[];
  for(const temp of ['cold','warm']){
    const ms=temp==='cold'?COLD:WARM;
    const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lt-')); const ctx=await chromium.launchPersistentContext(dir,{viewport:{width:1213,height:720}});
    await ctx.route(/supabase\.co\/functions\/v1\/(api|extra|ux|boot)/,async r=>{ const q=r.request(); const h={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'content-type, x-session','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Max-Age':'7200','Content-Type':'application/json'};
      await new Promise(s=>setTimeout(s,ms)); if(q.method()==='OPTIONS') return r.fulfill({status:204,headers:h});
      let a='?'; try{ a=JSON.parse(q.postData()||'{}').action; }catch{} if(/\/boot/.test(q.url())&&!a) return r.fulfill({status:200,headers:h,body:JSON.stringify({list:rec.list,today:{...rec.today,holidays:[]},callbacks:rec.callbacks})}); r.fulfill({status:200,headers:h,body:JSON.stringify(rec[a]||{ok:true,rows:[]})}); });
    await ctx.route(/tile|arcgis|openstreetmap|google|routing|nsw\.gov|unpkg|jsdelivr|fonts\./,r=>r.abort());
    await ctx.addInitScript(()=>{ try{ localStorage.setItem('dp_token','test-token-123456789'); }catch{} });
    const until=async(p,sel,t0)=>{ for(let i=0;i<200;i++){ if(await p.locator(sel).first().isVisible().catch(()=>false)) return Date.now()-t0; await p.waitForTimeout(25); } return null; };
    for(const visit of ['first visit','repeat visit']){
      const p=await ctx.newPage(); let t0=Date.now(); await p.goto(URL); const r={temp,visit,calls:await until(p,CONTENT.calls,t0)};
      await p.waitForTimeout(3000);   // a few seconds on the call screen, as in real use
      for(const [k,js] of Object.entries(SWITCH)){ t0=Date.now(); await p.evaluate(js); r[k]=await until(p,CONTENT[k],t0); await p.waitForTimeout(1500); }
      rows.push(r); await p.close(); }
    await ctx.close(); fs.rmSync(dir,{recursive:true,force:true}); }
  const f=v=>v==null?'never':v+'ms';
  console.log('Server  Visit          Open    Pipeline   Leads    Stats  Appraisals');
  for(const r of rows) console.log(r.temp.padEnd(8)+r.visit.padEnd(13)+f(r.calls).padStart(7)+f(r.board).padStart(10)+f(r.leads).padStart(9)+f(r.insights).padStart(9)+f(r.appraisal).padStart(10));
})();
