// Serves the app on localhost:8765 only while one command runs, then stops it. No server is left running.
//   node tools/with_server.js node tools/screens.js /tmp/shots
const http=require('http'),fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const root=path.join(__dirname,'..'), types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.json':'application/json','.webmanifest':'application/json'};
const srv=http.createServer((q,r)=>{ const u=decodeURIComponent(q.url.split('?')[0]), f=path.join(root,u==='/'?'index.html':u);
  if(!f.startsWith(root)){ r.statusCode=403; return r.end(); }
  fs.readFile(f,(e,d)=>{ if(e){ r.statusCode=404; return r.end(); } r.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream'); r.end(d); }); });
srv.listen(8765,()=>{ const [cmd,...args]=process.argv.slice(2); const c=spawn(cmd,args,{stdio:'inherit',cwd:root}); c.on('exit',code=>{ srv.close(); process.exit(code??1); }); });
