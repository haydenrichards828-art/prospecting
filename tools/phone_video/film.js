// Runs inside the app page. Builds a 720x1280 stage and draws any moment t (seconds) of the setup video.
(function(){
const kind = window.__filmKind, steps = kind === 'android' ? GUIDE19.AND : GUIDE19.IOS, nm = kind === 'android' ? 'Android' : 'iPhone';
const OUT = { t: 'Done. Replies now show up in <b>Prospect</b> by themselves.', s: `<div class="pr19"><div class="sb19"><span>9:41</span></div><div class="nv19"><b>Messages</b></div>
  <div class="ok19f"><i>✓</i> Phone connected</div>
  <div class="bub19"><b>Sarah Kim</b><span>Thursday at 4 works, see you then</span><em>just now</em></div>
  <div class="bub19"><b>Tom Reid</b><span>Can you send me that price guide?</span><em>2 min ago</em></div></div>`, last: 1 };
const all = steps.concat([OUT]);
const css = `#film{position:fixed;inset:0;z-index:999999;background:#0a0c0f;width:720px;height:1280px;overflow:hidden;font-family:Inter,system-ui,sans-serif}
#film *{animation:none!important;transition:none!important}
#film .hd{position:absolute;left:0;right:0;top:64px;text-align:center}
#film .hd h1{margin:0;font-size:46px;font-weight:800;color:#f2f4f7;letter-spacing:-.5px}#film .hd p{margin:10px 0 0;font-size:24px;color:#a3acb9}
#film .fp{position:absolute;left:166px;top:220px;transform:scale(1.7);transform-origin:0 0}
#film .lay{position:absolute;inset:0}
#film .cap{position:absolute;left:60px;right:60px;top:1000px;display:flex;gap:20px;align-items:flex-start;font-size:34px;line-height:1.3;color:#f2f4f7}
#film .cap b{color:#93c0ff}#film .cap .n{flex:none;width:54px;height:54px;border-radius:50%;background:#3b82f6;color:#fff;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center;margin-top:-4px}
#film .cap .n.ok{background:#16a34a}
#film .pb{position:absolute;left:60px;right:60px;bottom:64px;display:flex;gap:8px}#film .pb i{flex:1;height:8px;border-radius:4px;background:#2a303a;overflow:hidden;position:relative}#film .pb i b{position:absolute;inset:0;background:#3b82f6;transform-origin:0 0}
#film .fg{position:absolute;width:66px;height:66px;margin:-33px 0 0 -33px;border-radius:50%;background:rgba(255,255,255,.22);border:3px solid rgba(255,255,255,.95);box-shadow:0 6px 18px rgba(0,0,0,.45)}
#film .rp{position:absolute;border-radius:50%;border:5px solid #ff9f0a;pointer-events:none}
#film .ok19f{margin:6px 12px 10px;padding:8px 10px;border-radius:9px;background:#16a34a2e;color:#7ee2a8;font-weight:700;font-size:12px}#film .ok19f i{font-style:normal}
#film .bub19{margin:0 12px 8px;padding:10px 12px;border-radius:12px;background:#1a1f26;display:grid;gap:2px;font-size:12px}#film .bub19 b{font-size:13px}#film .bub19 span{color:#d6dbe2}#film .bub19 em{font-style:normal;color:#7d8794;font-size:10px}`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
const f = document.createElement('div'); f.id = 'film';
f.innerHTML = `<div class="hd"><h1>Connect your ${nm}</h1><p>About a minute. You only do this once.</p></div>
  <div class="fp"><div class="ph19f"><div class="ph19s"><div class="lay m" style="visibility:hidden"></div><div class="lay a"></div><div class="lay b"></div></div></div></div>
  <div class="cap"></div><div class="pb">${steps.map(() => '<i><b></b></i>').join('')}</div><div class="rp"></div><div class="fg"></div>`;
document.body.appendChild(f);
const LM = f.querySelector('.lay.m'), LA = f.querySelector('.lay.a'), LB = f.querySelector('.lay.b'), cap = f.querySelector('.cap'), fg = f.querySelector('.fg'), rp = f.querySelector('.rp'), bars = [...f.querySelectorAll('.pb b')];
const LEAD = 0.9, GAP = 1.45;
const durs = all.map((s, i) => s.last ? 3.2 : Math.max(3.3, (i ? 0.45 : LEAD + 0.45) + nT(s) * GAP + 1.0));
function nT(s){ return (s.s.match(/class="tp19"/g) || []).length; }
const starts = []; let acc = 0; durs.forEach(d => { starts.push(acc); acc += d; });
const total = acc, targets = {};
const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, cl = x => Math.max(0, Math.min(1, x));
let shown = -1;
function put(L, i){ L.innerHTML = `<div class="sc19">${all[i].s}</div>`; }
function tg(i){ if (targets[i]) return targets[i]; put(LM, i);
  const ts = [...LM.querySelectorAll('.tp19')].map(e => e.parentElement.getBoundingClientRect()).map(r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }));
  ts.sort((a, b) => b.y - a.y); return (targets[i] = ts); }
function frame(t){
  let i = 0; while (i < all.length - 1 && t >= starts[i + 1]) i++;
  const u = t - starts[i], s = all[i], ts = tg(i);
  put(LA, i); LA.style.opacity = 1;
  if (i > 0 && u < .3){ put(LB, i - 1); LB.style.opacity = 1 - u / .3; } else LB.style.opacity = 0;
  cap.innerHTML = `<span class="n${s.last ? ' ok' : ''}">${s.last ? '✓' : i + 1}</span><span>${s.t}</span>`; cap.style.opacity = i === 0 ? cl((t - .25) / .4) : cl(u / .3) * .999 + .001;
  bars.forEach((b, j) => { b.style.transform = `scaleX(${j < i ? 1 : j === i ? cl(u / durs[i]) : 0})`; });
  // pulse the glowing rings
  const ph = (t % 1.3) / 1.3; LA.querySelectorAll('.tp19').forEach(e => e.style.boxShadow = `0 0 0 ${(10 * ph).toFixed(1)}px rgba(255,159,10,${(.8 * (1 - ph)).toFixed(2)})`);
  // finger
  const prev = i === 0 ? { x: 600, y: 1360 } : (tg(i - 1).slice(-1)[0] || { x: 360, y: 700 });   const base = (i === 0 ? LEAD : 0) + .45; let pos = prev, press = 0, rip = -1, fade = 1;
  if (s.last){ fade = 1 - cl(u / .5); pos = prev; }
  ts.forEach((p, k) => { const m0 = base + k * GAP, from = k ? ts[k - 1] : prev;
    if (u >= m0) { const e = ease(cl((u - m0) / .65)); pos = { x: from.x + (p.x - from.x) * e, y: from.y + (p.y - from.y) * e }; }
    const pr = u - (m0 + .78); if (pr >= 0 && pr < .22) press = Math.sin(pr / .22 * Math.PI); if (pr >= 0 && pr < .6) rip = pr / .6; });
  if (!ts.length && !s.last) pos = prev;
  fg.style.left = pos.x + 'px'; fg.style.top = pos.y + 'px'; fg.style.opacity = fade; fg.style.transform = `scale(${1 - .2 * press})`;
  if (rip >= 0){ const r = 20 + 70 * rip; Object.assign(rp.style, { left: pos.x - r + 'px', top: pos.y - r + 'px', width: 2 * r + 'px', height: 2 * r + 'px', opacity: (1 - rip).toFixed(2) }); } else rp.style.opacity = 0;
}
all.forEach((_, i) => tg(i));
window.FILM = { frame, total, starts };
})();
