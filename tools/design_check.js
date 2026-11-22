// Design check: counts text sizes, colours, weights, corners and control heights across the main screens on desktop and phone,
// and lists contrast fails, tap targets under 24 pixels and cut off text. Needs the demo served on localhost:8765:
//   python3 -m http.server 8765 &   node tools/design_check.js
const {chromium}=require(process.env.PW||'playwright');
const screens=[['list',()=>{go('calls');S.view='list';S.lsub='Thirroul';render()}],['calling',()=>{go('calls');setView('call')}],['leads',()=>sideGo('leads')],['board',()=>sideGo('board')],['appraisal',()=>sideGo('appraisal')],['drops',()=>go('drops')],['stats',()=>go('insights')],['settings',()=>go('settings')]];
(async()=>{const b=await chromium.launch();const agg={font:new Map(),color:new Map(),radius:new Map(),btnH:new Map(),weight:new Map()};let contrast=[],small=[],cut=[];
for(const [w,h,dev] of [[1500,900,'desktop'],[400,860,'phone']]) for(const [n,f] of screens){const p=await b.newPage({viewport:{width:w,height:h}});
 await p.route(/unpkg|jsdelivr|tile|arcgis|nsw|google/,r=>r.fulfill({status:200,body:''}));
 await p.goto('http://localhost:8765/index.html#demo');await p.waitForTimeout(1200);await p.evaluate(f);await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>{const lum=c=>{const m=c.match(/[\d.]+/g);if(!m)return null;const [R,G,B]=m.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*R+.7152*G+.0722*B};
  const bg=e=>{while(e){const c=getComputedStyle(e).backgroundColor;const m=c.match(/[\d.]+/g);if(m&&(m.length<4||+m[3]>.9))return c;e=e.parentElement}return 'rgb(17,20,25)'};
  const out={font:[],color:[],radius:[],btnH:[],weight:[],contrast:[],small:[],cut:[]};
  for(const e of document.querySelectorAll('#app *, #sheet *')){const cs=getComputedStyle(e);const rc=e.getBoundingClientRect();if(!rc.width||!rc.height||cs.visibility==='hidden'||cs.display==='none')continue;if(rc.bottom<0||rc.top>innerHeight)continue;
   const txt=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
   if(txt){out.font.push(cs.fontSize);out.color.push(cs.color);out.weight.push(cs.fontWeight);
     const a=lum(cs.color),c=lum(bg(e));if(a!=null&&c!=null){const ratio=(Math.max(a,c)+.05)/(Math.min(a,c)+.05);const big=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.5&&+cs.fontWeight>=700);if(ratio<(big?3:4.5)&&!e.closest('[disabled],.done'))out.contrast.push(e.textContent.trim().slice(0,30)+' '+ratio.toFixed(1)+' <'+e.tagName+'.'+e.className+'> '+cs.color+' on '+bg(e))}
     if(e.scrollWidth>e.clientWidth+2&&cs.overflow!=='visible'&&cs.textOverflow!=='ellipsis')out.cut.push(e.textContent.trim().slice(0,30))}
   if(parseFloat(cs.borderRadius)>0&&(parseFloat(cs.borderTopWidth)>0||cs.backgroundColor!=='rgba(0, 0, 0, 0)'))out.radius.push(cs.borderRadius);
   if(e.matches('button,a[href],[onclick],input,select')&&!e.closest('.leaflet-container')){out.btnH.push(Math.round(rc.height));if(rc.width<24||rc.height<24)out.small.push((e.getAttribute('aria-label')||e.textContent.trim()||e.className).slice(0,25)+' '+Math.round(rc.width)+'x'+Math.round(rc.height))}}
  return out});
 for(const k of ['font','color','radius','btnH','weight']) r[k].forEach(v=>agg[k].set(v,(agg[k].get(v)||0)+1));
 contrast.push(...r.contrast.map(x=>dev+' '+n+': '+x));small.push(...r.small.map(x=>dev+' '+n+': '+x));cut.push(...r.cut.map(x=>dev+' '+n+': '+x));await p.close();}
const top=m=>[...m.entries()].sort((a,b)=>b[1]-a[1]);
console.log('distinct font sizes:',agg.font.size,top(agg.font).map(x=>x[0]+'×'+x[1]).join(' '));
console.log('distinct text colours:',agg.color.size,top(agg.color).map(x=>x[0]+'×'+x[1]).join(' '));console.log('distinct font weights:',agg.weight.size,top(agg.weight).map(x=>x[0]).join(' '));
console.log('distinct corner radii:',agg.radius.size,top(agg.radius).map(x=>x[0]+'×'+x[1]).join(' '));
console.log('distinct control heights:',agg.btnH.size,top(agg.btnH).slice(0,14).map(x=>x[0]+'×'+x[1]).join(' '));
const u=a=>[...new Set(a)];console.log('contrast fails:',u(contrast).length);console.log(u(contrast).slice(0,15).join('\n'));
console.log('targets under 24px:',u(small).length);console.log(u(small).slice(0,15).join('\n'));
console.log('text cut off (no ellipsis):',u(cut).length,u(cut).slice(0,8).join(' | '));
await b.close();})();
