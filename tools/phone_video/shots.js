// Real Prospect screens at phone size, for the first and last scenes of the setup videos.
const {chromium}=require(process.env.PW);const fs=require('fs');const out=__dirname+'/shots/';
(async()=>{const b=await chromium.launch();const pos={};
for(const [kind,w,h] of [['iphone',393,798],['android',412,875]]){
 const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 await p.route(/unpkg|jsdelivr|google|supabase|nsw\.gov|arcgis|openstreetmap|media\/phone-/,r=>r.abort());
 await p.goto('http://localhost:8765/index.html#demo');await p.waitForTimeout(1500);
 await p.addStyleTag({content:'#demobar{display:none!important} #demobar~#shell,#demobar~#app #shell{height:100dvh!important} .vw19,.gd19{display:none!important}'});
 // the setup sheet, as she sees it when the video plays
 await p.evaluate(k=>{window.ib15=async a=>a==='phone_setup'?{url:'https://x/inbox?p=abc',key:'abc'}:{};window.PHONE_SHORTCUT='https://www.icloud.com/shortcuts/x';go('messages');setTimeout(()=>phoneSetup(k),300)},kind);
 await p.waitForTimeout(1600);
 const sel=kind==='iphone'?'button:has-text("Add the shortcut")':'button:has-text("Get Message487")';
 const bb=await p.locator('.sheet '+sel+', #ov '+sel+', '+sel).first().boundingBox();
 pos[kind]={w,h,btn:bb};
 await p.screenshot({path:out+kind+'-sheet.png'});
 // Messages afterwards: replies in Prospect
 await p.evaluate(()=>{closeOv&&closeOv();});await p.waitForTimeout(300);
 await p.evaluate(async()=>{S.ib=null;go('messages')});await p.waitForTimeout(1200);
 await p.screenshot({path:out+kind+'-messages.png'});
 await p.close();}
fs.writeFileSync(out+'pos.json',JSON.stringify(pos,null,1));console.log(JSON.stringify(pos));await b.close();})();
