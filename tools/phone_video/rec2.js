// Renders the phone setup videos. node rec2.js <iphone|android> <out.mp4> [preview seconds...]
// Full render also writes one still per step (<out>-1.jpg ...) for the step through guide, and <out>.json with the timings.
const {chromium}=require(process.env.PW);const {spawn}=require('child_process');const fs=require('fs');const path=require('path');
(async()=>{const [kind,out,...prev]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.join(__dirname,'stage.html'));await p.addScriptTag({path:path.join(__dirname,'film2.js')});
 const pos=JSON.parse(fs.readFileSync(path.join(__dirname,'shots/pos.json')));
 const info=await p.evaluate(([k,pos])=>FILM2.init(k,pos),[kind,pos]);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
 console.log(JSON.stringify({total:info.total,autoStart:info.autoStart,autoIdx:info.autoIdx,steps:info.starts.length}));
 const shot=async(t,file)=>{await p.evaluate(t=>FILM2.frame(t),t);return p.screenshot({type:'jpeg',quality:file?82:92,path:file});};
 if(prev[0]==='plan'){console.log(JSON.stringify(await p.evaluate(()=>FILM2.plan())));await b.close();return;}
 if(prev[0]==='stills'){for(const [i,t] of info.stills.entries())await shot(t,`/tmp/g19/st-${kind}-${String(i+1).padStart(2,'0')}.jpg`);console.log(errs);await b.close();return;}
 if(prev.length){for(const t of prev)await shot(+t,`/tmp/g19/p2-${kind}-${t}.jpg`);console.log(errs);await b.close();return;}
 const tmp=out.replace(/\.mp4$/,'.part.mp4');
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-crf','24','-preset','veryfast','-pix_fmt','yuv420p','-movflags','+faststart',tmp],{stdio:['pipe','inherit','inherit']});
 const N=Math.round(info.total*30);
 for(let f=0;f<N;f++){const buf=await shot(f/30);if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();const code=await new Promise(r=>ff.on('close',r));
 if(code!==0){console.log('ffmpeg failed',code);process.exit(1);}
 fs.renameSync(tmp,out);
 const base=out.replace(/\.mp4$/,'');
 for(const [i,t] of info.stills.entries()) await shot(t,`${base}-${i+1}.jpg`);
 await shot(info.stills[0],base+'.jpg');
 fs.writeFileSync(base+'.json',JSON.stringify({total:+info.total.toFixed(2),autoStart:info.autoStart&&+info.autoStart.toFixed(2),autoIdx:info.autoIdx,steps:info.stills.length}));
 console.log('ok',out,N,'frames',errs);await b.close();})();
