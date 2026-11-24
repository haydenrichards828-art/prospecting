// node rec.js <kind> <out.mp4> [preview times...]
const {chromium}=require(process.env.PW);const {spawn}=require('child_process');const fs=require('fs');
(async()=>{const [kind,out,...prev]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:720,height:1280}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/unpkg|jsdelivr|google|supabase|nsw\.gov|arcgis|openstreetmap/,r=>r.abort());
 await p.goto('http://localhost:8765/index.html#demo');await p.waitForTimeout(1500);
 await p.evaluate(k=>{window.__filmKind=k},kind);await p.addScriptTag({path:''+__dirname+'/film.js'});await p.waitForTimeout(300);
 const info=await p.evaluate(()=>({total:FILM.total,starts:FILM.starts}));console.log(JSON.stringify(info));
 if(prev.length){for(const t of prev){await p.evaluate(t=>FILM.frame(t),+t);await p.screenshot({path:`/tmp/g19/pv-${kind}-${t}.jpg`,type:'jpeg',quality:92});}console.log(errs);await b.close();return;}
 const tmp=out.replace(/\.mp4$/,'.part.mp4');
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-crf','24','-preset','veryfast','-pix_fmt','yuv420p','-movflags','+faststart',tmp],{stdio:['pipe','inherit','inherit']});
 const N=Math.round(info.total*30);
 for(let f=0;f<N;f++){await p.evaluate(t=>FILM.frame(t),f/30);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();const code=await new Promise(r=>ff.on('close',r));
 if(code===0){fs.renameSync(tmp,out);console.log('ok',out,N,'frames');}else console.log('ffmpeg failed',code);
 // poster: a moment in step 1 with the finger on the button
 await p.evaluate(t=>FILM.frame(t),2.1);await p.screenshot({path:out.replace(/\.mp4$/,'.jpg'),type:'jpeg',quality:80});
 console.log(errs);await b.close();})();
