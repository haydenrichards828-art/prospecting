// ---------- Messages from her phone, no Mac (24 Nov) ----------
// iPhone: a ready made Shortcut plus one Shortcuts automation sends each message she receives to Prospect.
// Android: a free forwarding app sends new texts and WhatsApp messages to Prospect.
// Prospect keeps only messages from people in Prospect; everything else is dropped on arrival.
// Replying from the Messages tab opens her own Messages or WhatsApp with the reply typed in, so it goes from her number.
(function(){
// The shared iPhone shortcut (made once, see tools/PHONE_SHORTCUT.md). Every agent installs it with one tap.
window.PHONE_SHORTCUT = window.PHONE_SHORTCUT || '';
const F_DROID = 'https://f-droid.org/packages/life.andre.message487/';
const ago = t => { if (!t) return 'nothing yet'; const m = Math.round((Date.now() - Date.parse(t)) / 60000); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' hr ago' : Math.round(m / 1440) + ' days ago'; };
async function link(kind){ const r = await ib15('phone_setup', { kind }); S.phLink = r.url; S.phKey = r.key; return r; }
async function copy(t){ try { await navigator.clipboard.writeText(t); return true; } catch { return false; } }

window.phoneSetup = async function(kind){
  if (!kind) return openSheet2('Connect your phone', `<p class="hint2">Replies to your texts come into Prospect by themselves. Pick your phone. It takes about two minutes, once.</p>
    <div class="ph19">
      <button onclick="phoneSetup('iphone')">${ic2('phone', 22)}<b>iPhone</b><span>Texts and iMessages</span></button>
      <button onclick="phoneSetup('android')">${ic2('phone', 22)}<b>Android</b><span>Texts and WhatsApp</span></button></div>
    <p class="hint2 sm19">Only messages from people in Prospect are kept. Messages from family and friends are thrown away the moment they arrive.</p>
    <p class="hint2 sm19"><button class="lnk2" onclick="set15Mac()">Use a Mac instead</button></p>`);
  openSheet2(kind === 'iphone' ? 'Connect your iPhone' : 'Connect your Android', '<p class="hint2">Getting your link ready…</p>');
  let r; try { r = await link(kind); } catch (e) { return toast(e.message); }
  const sc = window.PHONE_SHORTCUT;
  const build = `<details class="bd19"><summary>Make the shortcut first (one time, about 3 minutes)</summary><ol>
          <li>Open Shortcuts, tap <i>+</i>, name it <i>Prospect messages</i>.</li>
          <li>Add the action <i>Get Contents of URL</i> and paste your link as the URL.</li>
          <li>Tap the arrow on that action. Set <i>Method</i> to <i>POST</i> and <i>Request Body</i> to <i>JSON</i>.</li>
          <li>Add a Text field called <i>from</i>: tap the value, choose <i>Shortcut Input</i>, then tap it again and pick <i>Sender</i>.</li>
          <li>Add a Text field called <i>text</i>: choose <i>Shortcut Input</i> and pick <i>Content</i>.</li>
          <li>Add a Text field called <i>app</i> with the value <i>iphone</i>. Tap <i>Done</i>.</li></ol></details>`;
  const body = kind === 'iphone' ? `
    ${sc ? '' : build}
    ${videoHTML19(sc ? 'iphone' : 'iphone-auto')}
    <div class="ac19">${sc ? `<button class="b2 pri" onclick="phoneGo()">Add the shortcut</button>` : ''}<button class="b2" onclick="phoneCopy()">Copy my link again</button></div>
    <p class="hint2 sm19">Your link is already copied. Needs iOS 17 or newer. WhatsApp replies can't come through on iPhone (Apple doesn't allow it), so those stay in WhatsApp.</p>`
  : `
    ${videoHTML19('android')}
    <div class="ac19"><button class="b2 pri" onclick="window.open('${F_DROID}','_blank','noopener')">Get Message487</button><button class="b2" onclick="phoneCopy()">Copy my link again</button></div>
    <p class="hint2 sm19">Your link is already copied. Leave the phone as it is: it works in the background, and keeps messages safe if the signal drops.</p>`;
  await copy(r.url);
  openSheet2(kind === 'iphone' ? 'Connect your iPhone' : 'Connect your Android', body + `<div class="ok19" id="ph19s">Waiting for the first message…</div>
    <p class="hint2 sm19"><button class="lnk2" onclick="phoneOff()">Turn this off</button></p>`);
  phoneWatch(); };
window.phoneCopy = async () => { if (S.phLink && await copy(S.phLink)) toast('Link copied'); };
window.phoneGo = async () => { await copy(S.phLink || ''); if (window.PHONE_SHORTCUT) openUrl(window.PHONE_SHORTCUT); };
window.phoneOff = async () => { if (!(await uiAsk('Stop messages coming in from your phone?', { ok: 'Turn off' }))) return; try { await ib15('phone_off'); } catch (e) { return toast(e.message); } S.ib = null; closeOv(); toast('Turned off'); render(); };
// shows when the first message arrives, while the setup sheet is open
function phoneWatch(){ clearInterval(window.__ph19); const t0 = Date.now();
  window.__ph19 = setInterval(async () => { const box = document.getElementById('ph19s'); if (!box || Date.now() - t0 > 20 * 60e3){ clearInterval(window.__ph19); return; }
    let d; try { d = await ib15('load'); } catch { return; } const p = d.phone; if (!p || !p.last) return;
    box.classList.add('on'); box.innerHTML = `${ic2('check', 16)} Connected. Last message ${ago(p.last)}.${p.dropped ? ` ${p.dropped} personal message${p.dropped === 1 ? '' : 's'} ignored, as they should be.` : ''}`; }, 5000); }

// Messages tab, not set up yet: connect the phone first, the Mac is the other way
window.view15 = (function(o){ return async function(...a){ const r = await o.apply(this, a);
  const e = document.querySelector('#main .empty15'); if (e && !S.ib?.err && !S.ib?.th){
    e.innerHTML = `<h2>Get replies to your texts right here</h2><p>Connect your phone once and replies from your leads and owners show up in Prospect by themselves. About two minutes, nothing to leave switched on.</p>
      <div class="ph19 wide">
        <button onclick="phoneSetup('iphone')">${ic2('phone', 22)}<b>I have an iPhone</b><span>Texts and iMessages</span></button>
        <button onclick="phoneSetup('android')">${ic2('phone', 22)}<b>I have an Android</b><span>Texts and WhatsApp</span></button></div>
      <p class="sm19">Only messages from people in Prospect are kept. Family and friends are never saved.</p>
      <p class="sm19"><button class="lnk2" onclick="set15Mac()">Use a Mac instead</button> · <button class="lnk2" onclick="S.msgOld=1;go('messages')">Scheduled texts</button></p>`; }
  // Started connecting the phone but no message has come in yet: always a way back to the steps
  const p = S.ib?.srv?.phone, ic = document.querySelector('#main .ib15 .ic');
  if (p && !p.last && S.ib?.srv?.mode === 'phone' && ic && !S.ib.sel && !document.getElementById('fin19')){
    const nm = p.kind === 'android' ? 'Android' : 'iPhone';
    const at = ic.offsetParent ? (ic.querySelector('.hd') || ic.firstElementChild) : document.querySelector('#main .ib15 > :first-child > :first-child');
    at?.insertAdjacentHTML('afterend', `<div class="fin19" id="fin19">${ic2('phone', 22)}<div><b>Finish connecting your ${nm}</b><p>Replies show up here once it's set up. It picks up where you left off.</p></div>
      <div class="fb19"><button class="b2 pri" onclick="phoneSetup('${p.kind === 'android' ? 'android' : 'iphone'}')">Carry on</button><button class="b2" onclick="phoneSetup()">Different phone</button></div></div>`); }
  return r; }; })(window.view15);

// Replying from the Messages tab when it's her phone: her Messages or WhatsApp opens with the reply typed in
window.send15 = (function(o){ return async function(...a){ if (S.ib?.srv?.mode !== 'phone') return o.apply(this, a);
  const txt = (S.ib.draft || '').trim(); if (!txt) return toast('Write a message first');
  const th = (S.ib.th || []).find(t => t.id === S.ib.sel); if (!th) return;
  const ph = th.id.startsWith('ph:') && !th.id.startsWith('ph:n:') ? th.id.slice(3) : (th.lead && th.lead.phone);
  if (!ph) return toast('No number for them yet. Reply in WhatsApp on your phone.');
  const wa = th.via === 'WhatsApp'; openUrl(wa ? waLink(ph, txt) : smsLink(ph, txt));
  ib15('phone_sent', { phone: ph, text: txt, channel: wa ? 'whatsapp' : 'text', name: th.name }).catch(() => {});
  th.msgs.push({ who: 'me', mine: true, text: txt, at: Date.now() }); S.ib.draft = ''; done15(th.id); toast(wa ? 'Opened WhatsApp, press send' : 'Opened Messages, press send'); }; })(window.send15);

// One tap sends from the message sheet also go into the conversation, so replies line up with what she sent
window.swSend = (function(o){ return async function(ch){ const w = S.sw, body = ($('#sw_body')?.value || '').trim(); const r = await o.apply(this, arguments);
  if ((ch === 'text' || ch === 'whatsapp') && w && w.phone && body) ib15('phone_sent', { phone: w.phone, text: body, channel: ch, name: w.name }).catch(() => {});
  return r; }; })(window.swSend);

// Settings: Connect your phone sits above Connect your Mac
window.viewSettings = (function(o){ return async function(...a){ const r = await o.apply(this, a); const mac = [...document.querySelectorAll('#main .g2 .r2, #main .g2 > *')].find(x => /Connect your Mac/.test(x.textContent));
  if (mac && !document.getElementById('ph19row')){ const p = S.ib?.srv?.phone, st = p ? (p.kind === 'android' ? 'Android' : 'iPhone') + (p.last ? ', working' : ', waiting') : 'Not set up';
    mac.insertAdjacentHTML('beforebegin', row2('var(--acc)', 'phone', 'Connect your phone', '', `<span class="sv2">${esc(st)}${chev2()}</span>`, 'phoneSetup()').replace(/^<(\w+)/, '<$1 id="ph19row"')); }
  return r; }; })(window.viewSettings);
})();

// ---------- Picture guide (24 Nov): a drawing of the phone screen for each step, the button to press glowing ----------
// Plays by itself like a short video, or step through with Next and Back. One instruction per screen.
(function(){
const tap = '<i class="tp19" aria-hidden="true"></i>';
const bar = (title, right = '') => `<div class="sb19"><span>9:41</span></div><div class="nv19"><b>${title}</b>${right}</div>`;
const row = (t, hi, sub = '') => `<div class="rw19${hi ? ' hi' : ''}">${hi ? tap : ''}<span>${t}</span>${sub ? `<em>${sub}</em>` : ''}<i class="cv19">›</i></div>`;
const tabs = hi => `<div class="tb19"><span>Shortcuts</span><span class="${hi ? 'hi' : ''}">${hi ? tap : ''}Automation</span><span>Gallery</span></div>`;
const IOS = [
  { t: 'Tap <b>Add the shortcut</b> in Prospect', s: `<div class="pr19">${bar('Prospect')}<div class="pc19"><p>Connect your iPhone</p><div class="bt19 hi">${tap}Add the shortcut</div></div></div>` },
  { t: 'Shortcuts opens. Tap the box, then tap <b>Paste</b>', s: `${bar('Set Up Shortcut')}<div class="pg19"><p class="mu19">Paste your Prospect link</p><div class="in19 hi">${tap}<span class="pa19">Paste</span></div></div>` },
  { t: 'Tap <b>Add Shortcut</b>', s: `${bar('Set Up Shortcut')}<div class="pg19"><p class="mu19">Paste your Prospect link</p><div class="in19 full">https://…/inbox?p=…</div></div><div class="bb19 hi">${tap}Add Shortcut</div>` },
  { t: 'Tap <b>Automation</b> at the bottom', s: `${bar('Shortcuts')}<div class="gr19"><span>Prospect messages</span><span></span><span></span><span></span></div>${tabs(1)}` },
  { t: 'Tap <b>+</b> at the top right', s: `${bar('Automation', `<span class="pl19 hi">${tap}+</span>`)}<div class="pg19"><p class="mu19">No automations yet</p></div>${tabs(0)}` },
  { t: 'Scroll down and tap <b>Message</b>', s: `${bar('New Automation')}<div class="ls19">${row('Email', 0)}${row('Message', 1)}${row('Sleep', 0)}${row('Wi Fi', 0)}</div>` },
  { t: 'Tap <b>Message Contains</b>, press the space bar once, tap <b>Done</b>', s: `${bar('When')}<div class="ls19">${row('Sender', 0, 'Choose')}${row('Message Contains', 1, 'space')}</div><div class="kb19"><span class="hi">${tap}space</span></div>` },
  { t: 'Tap <b>Run Immediately</b>, then <b>Next</b>', s: `${bar('When', `<span class="nx19 hi">${tap}Next</span>`)}<div class="ls19"><div class="rw19"><span>Run After Confirmation</span><i class="rd19"></i></div><div class="rw19 hi">${tap}<span>Run Immediately</span><i class="rd19 on"></i></div></div>` },
  { t: 'Tap <b>Prospect messages</b>. Done!', s: `${bar('Do')}<div class="ls19"><p class="mu19 pad19">My Shortcuts</p>${row('Prospect messages', 1)}${row('Other shortcut', 0)}</div>` }];
const AND = [
  { t: 'Tap <b>Get Message487</b> in Prospect', s: `<div class="pr19">${bar('Prospect')}<div class="pc19"><p>Connect your Android</p><div class="bt19 hi">${tap}Get Message487</div></div></div>` },
  { t: 'Tap <b>Download APK</b>, then open it', s: `${bar('f-droid.org')}<div class="pg19"><p class="mu19">Message487</p><div class="bt19 hi alt">${tap}Download APK</div></div>` },
  { t: 'If asked, allow installing, then tap <b>Install</b>', s: `${bar('Install')}<div class="pg19"><p class="mu19">Do you want to install this app?</p></div><div class="bb19 hi">${tap}Install</div>` },
  { t: 'Open it, tap <b>Connection</b>', s: `${bar('Message487')}<div class="ls19">${row('Connection', 1)}${row('Sources', 0)}${row('Outbox', 0)}</div>` },
  { t: 'Paste your link into the <b>address</b> and the <b>token</b>, tap <b>Save</b>', s: `${bar('Connection')}<div class="pg19"><p class="mu19">Webhook address</p><div class="in19 hi">${tap}<span class="pa19">Paste</span></div><p class="mu19">Token</p><div class="in19"><span class="pa19 dim">Paste</span></div></div><div class="bb19">Save</div>` },
  { t: 'Tap <b>Sources</b>, turn on <b>SMS</b>', s: `${bar('Sources')}<div class="ls19"><div class="rw19 hi">${tap}<span>SMS</span><i class="sw19 on"></i></div><div class="rw19"><span>Notifications</span><i class="cv19">›</i></div></div>` },
  { t: 'In <b>Notifications</b>, tick <b>WhatsApp</b> and <b>Messages</b>, allow access. Done!', s: `${bar('Notifications')}<div class="ls19"><div class="rw19 hi">${tap}<span>WhatsApp</span><i class="ck19 on">✓</i></div><div class="rw19"><span>Messages</span><i class="ck19 on">✓</i></div><div class="rw19"><span>Camera</span><i class="ck19"></i></div></div>` }];
window.GUIDE19 = { IOS, AND };
// The video of the same steps (media/phone-*.mp4, made from these screens). Picture guide if it can't play, or if she'd rather step through.
const VSTART = { 'iphone-auto': 10.4 };
window.videoHTML19 = kind => { const f = kind === 'android' ? 'android' : 'iphone', t = VSTART[kind] ? ` onloadedmetadata="this.currentTime=${VSTART[kind]}"` : '';
  return `<div class="vw19" id="vw19"><video class="vd19" src="media/phone-${f}.mp4?v=1"${t} poster="media/phone-${f}.jpg" autoplay muted playsinline controls preload="auto"
    onerror="vid19off('${kind}')"></video><button class="lnk2" onclick="vid19off('${kind}')">Step through at my own pace instead</button></div>`; };
window.vid19off = kind => { const w = document.getElementById('vw19'); if (w) w.outerHTML = guideHTML19(kind); };
let G = null;
function draw(){ const g = G, st = g.steps[g.i], el = document.getElementById('gd19'); if (!el) { stop(); return; }
  el.querySelector('.ph19s').innerHTML = `<div class="sc19">${st.s}</div>`;
  el.querySelector('.cap19').innerHTML = `<span class="n19">${g.i + 1}</span><span>${st.t}</span>`;
  el.querySelector('.dt19').innerHTML = g.steps.map((_, j) => `<i class="${j === g.i ? 'on' : j < g.i ? 'dn' : ''}"></i>`).join('');
  el.querySelector('.bk19').disabled = g.i === 0; el.querySelector('.nx19b').textContent = g.i === g.steps.length - 1 ? 'Start again' : 'Next';
  el.querySelector('.pl19b').innerHTML = g.play ? 'Pause' : `${ic2('chev', 14)} Play`; }
function stop(){ clearInterval(G && G.tm); if (G) G.play = 0; }
window.guide19 = { next(){ G.i = (G.i + 1) % G.steps.length; draw(); }, back(){ G.i = Math.max(0, G.i - 1); draw(); },
  play(){ if (G.play){ stop(); draw(); return; } G.play = 1; draw(); G.tm = setInterval(() => { if (!document.getElementById('gd19')) return stop(); if (G.i === G.steps.length - 1){ stop(); draw(); return; } G.i++; draw(); }, 3200); } };
window.guideHTML19 = kind => { stop(); G = { steps: kind === 'android' ? AND : kind === 'iphone-auto' ? IOS.slice(3) : IOS, i: 0, play: 0 }; setTimeout(() => { draw(); guide19.play(); }, 30);
  return `<div class="gd19" id="gd19"><div class="ph19f"><div class="ph19s"></div></div><div class="cap19"></div><div class="dt19"></div>
    <div class="gc19"><button class="b2 bk19" onclick="guide19.back()">Back</button><button class="b2 pl19b" onclick="guide19.play()"></button><button class="b2 pri nx19b" onclick="guide19.next()">Next</button></div></div>`; };
})();
