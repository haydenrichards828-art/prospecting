// Screenshots every main screen on desktop and phone in demo mode, and reports page errors.
//   node tools/screens.js <out folder>          take screenshots
//   node tools/screens.js <out> <baseline>      also compare with an earlier run and list screens that changed
// Needs the app served on localhost:8765 (tools/check.sh starts it) and Playwright (npm i playwright, or set PW to its path).
const {chromium}=require(process.env.PW||'playwright');const fs=require('fs'),path=require('path');
const out=process.argv[2]||'/tmp/prospect-shots', base=process.argv[3];fs.mkdirSync(out,{recursive:true});
const screens=[['list',()=>{go('calls');S.view='list';S.lsub='Thirroul';render()}],['calling',()=>{go('calls');setView('call')}],['leads',()=>sideGo('leads')],
 ['leadopen',()=>{sideGo('leads');setTimeout(()=>document.querySelector('.lt3:not(.h), .lead2')?.click(),400)}],['board',()=>sideGo('board')],['appraisal',()=>sideGo('appraisal')],
 ['listed',()=>sideGo('listed')],['drops',()=>go('drops')],['stats',()=>go('insights')],['settings',()=>go('settings')]];
(async()=>{const b=await chromium.launch();let errors=0;
for(const [w,h,tag] of [[1500,900,'d'],[400,860,'m']]) for(const [name,fn] of screens){
  const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>{errors++;console.log('ERROR',tag,name,e.message.slice(0,160));});
  await p.route(/tile|arcgis|openstreetmap|unpkg|jsdelivr|routing|nsw\.gov|google/,r=>r.abort());
  await p.addInitScript(()=>{Date.now=(()=>()=>Date.parse('2026-11-21T10:00:00+11:00'))();});
  await p.goto('http://localhost:8765/index.html#demo');await p.waitForTimeout(1500);
  try{await p.evaluate(fn);}catch(e){console.log('ERROR',tag,name,e.message.slice(0,120));errors++;}
  await p.waitForTimeout(1100);await p.addStyleTag({content:'*{animation:none!important;transition:none!important;caret-color:transparent!important}'});await p.waitForTimeout(200);
  await p.screenshot({path:path.join(out,`${tag}-${name}.png`)});await p.close();}
await b.close();
if(base){ let changed=[];
  for(const f of fs.readdirSync(out).filter(f=>f.endsWith('.png'))){ const a=path.join(out,f),c=path.join(base,f); if(!fs.existsSync(c)){changed.push(f+' (new)');continue;}
    if(fs.readFileSync(a).equals(fs.readFileSync(c))) continue;
    // ignore antialiasing specks: only report a screen when more than 50 pixels changed
    const r=require('child_process').spawnSync('python3',['-c',"import sys;from PIL import Image,ImageChops;a=Image.open(sys.argv[1]).convert('RGB');b=Image.open(sys.argv[2]).convert('RGB');print(-1 if a.size!=b.size else sum(1 for p in ImageChops.difference(a,b).getdata() if max(p)>16))",a,c]);
    const n=parseInt(String(r.stdout).trim()); if(isNaN(n)||n<0||n>50) changed.push(f+(n>0?` (${n} px)`:'')); }
  console.log(changed.length?'Screens that look different from the baseline: '+changed.join(', '):'Every screen matches the baseline.'); }
console.log(errors?errors+' page errors':'No page errors.');process.exit(errors?1:0);})();
