// ---------- Messages from her phone, no Mac (24 Nov) ----------
// iPhone: a ready made Shortcut plus one Shortcuts automation sends each message she receives to Prospect.
// Android: a free forwarding app sends new texts and WhatsApp messages to Prospect.
// Prospect keeps only messages from people in Prospect; everything else is dropped on arrival.
// Replying from the Messages tab opens her own Messages or WhatsApp with the reply typed in, so it goes from her number.
(function(){
// The shared iPhone shortcut (made once, see tools/PHONE_SHORTCUT.md). Every agent installs it with one tap.
window.PHONE_SHORTCUT = window.PHONE_SHORTCUT || '';
// the developer's own signed APK (same app as on F-Droid), so tapping it downloads straight away
const M487_APK = 'https://github.com/andre487/AndroidMessage487/releases/latest/download/message487.apk';
const ago = t => { if (!t) return 'nothing yet'; const m = Math.round((Date.now() - Date.parse(t)) / 60000); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' hr ago' : Math.round(m / 1440) + ' days ago'; };
async function link(kind){ const r = await ib15('phone_setup', { kind }); S.phLink = r.url; S.phKey = r.key; return r; }
async function copy(t){ try { await navigator.clipboard.writeText(t); return true; } catch { return false; } }

window.phoneSetup = async function(kind){
  if (!kind) return openSheet2('Connect your phone', `<p class="hint2">Replies to your texts come into Prospect by themselves. Pick your phone. It takes about two minutes, once.</p>
    <div class="ph19">
      <button onclick="phoneSetup('iphone')">${ic2('phone', 22)}<b>iPhone</b><span>Texts and iMessages</span></button>
      <button onclick="phoneSetup('android')">${ic2('phone', 22)}<b>Android</b><span>Texts and WhatsApp</span></button></div>
    <p class="hint2 sm19">Use Prospect on a computer? Still connect your phone: texts arrive on your phone's number, and Prospect shows them on your computer too.</p>
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
  const check = `<p class="hint2 sm19"><b>Last step, check it:</b> in Shortcuts, tap <i>Prospect messages</i> once. If it asks, tap <i>Always Allow</i>. The box below turns green.</p>`;
  const body = kind === 'iphone' ? `
    ${sc ? '' : build}
    ${videoHTML19(sc ? 'iphone' : 'iphone-auto')}
    <div class="ac19">${sc ? `<button class="b2 pri" onclick="phoneGo()">Add the shortcut</button>` : ''}<button class="b2" onclick="phoneCopy()">Copy my link again</button></div>
    ${check}
    <p class="hint2 sm19">Your link is already copied. Needs iOS 17 or newer. WhatsApp replies can't come through on iPhone (Apple doesn't allow it), so those stay in WhatsApp.</p>`
  : `
    ${videoHTML19('android')}
    <div class="ac19"><button class="b2 pri" onclick="window.open('${M487_APK}','_blank','noopener')">Get Message487</button><button class="b2" onclick="phoneCopy()">Copy my link again</button></div>
    <p class="hint2 sm19">Your link is already copied. In Message487 the token is just the word <b>prospect</b>. Leave the phone as it is after: it works in the background and keeps messages safe if the signal drops.</p>`;
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
    box.classList.add('on'); box.innerHTML = `${ic2('check', 16)} Connected. Last heard from your phone ${ago(p.last)}.${p.dropped ? ` ${p.dropped} personal message${p.dropped === 1 ? '' : 's'} ignored, as they should be.` : ''}`; }, 5000); }

// Messages tab, not set up yet: connect the phone first, the Mac is the other way
window.view15 = (function(o){ return async function(...a){ const r = await o.apply(this, a);
  const e = document.querySelector('#main .empty15'); if (e && !S.ib?.err && !S.ib?.th){
    e.innerHTML = `<h2>Get replies to your texts right here</h2><p>Connect your phone once and replies from your leads and owners show up in Prospect by themselves. About two minutes, nothing to leave switched on.</p>
      <div class="ph19 wide">
        <button onclick="phoneSetup('iphone')">${ic2('phone', 22)}<b>I have an iPhone</b><span>Texts and iMessages</span></button>
        <button onclick="phoneSetup('android')">${ic2('phone', 22)}<b>I have an Android</b><span>Texts and WhatsApp</span></button></div>
      <p class="sm19">On a computer? Connect your phone all the same: texts arrive on your phone's number, and they show up here on your computer too.</p>
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

// ---------- How to video (24 Nov) ----------
// media/phone-*.mp4 are drawn to look like her real iPhone or Android screens (made by tools/phone_video, see its README).
// The step through version shows a still from the video for each step. iphone-auto: the shortcut is already made, start at Automation.
(function(){
const VID = { iphone: { n: 14, auto: 16.1, autoIdx: 4 }, android: { n: 22 } }, VER = 3;
const file = kind => kind === 'android' ? 'android' : 'iphone';
window.videoHTML19 = kind => { const f = file(kind), t = kind === 'iphone-auto' ? ` onloadedmetadata="this.currentTime=${VID.iphone.auto}"` : '';
  return `<div class="vw19" id="vw19"><video class="vd19" src="media/phone-${f}.mp4?v=${VER}"${t} poster="media/phone-${f}.jpg?v=${VER}" autoplay muted playsinline controls preload="auto"
    onerror="vid19off('${kind}')"></video><button class="lnk2" onclick="vid19off('${kind}')">Go through it one step at a time instead</button></div>`; };
window.vid19off = kind => { const w = document.getElementById('vw19'); if (w) w.outerHTML = guideHTML19(kind); };
let G = null;
function draw(){ const el = document.getElementById('gd19'); if (!el || !G) return;
  const img = el.querySelector('.gi19'), last = G.i === G.n - 1;
  img.src = `media/phone-${G.f}-${G.i + 1}.jpg?v=${VER}`; img.alt = `Step ${G.i + 1} of ${G.n - 1}`;
  if (!last) new Image().src = `media/phone-${G.f}-${G.i + 2}.jpg?v=${VER}`;
  el.querySelector('.sn19').textContent = last ? 'Done' : `Step ${G.i + 1} of ${G.n - 1}`;
  el.querySelector('.bk19').disabled = G.i === G.from; el.querySelector('.nx19b').textContent = last ? 'Watch the video' : 'Next'; }
window.guide19 = { next(){ if (G.i === G.n - 1){ const g = document.getElementById('gd19'); if (g) g.outerHTML = videoHTML19(G.kind); return; } G.i++; draw(); },
  back(){ G.i = Math.max(G.from, G.i - 1); draw(); } };
window.guideHTML19 = kind => { const f = file(kind), v = VID[f], from = kind === 'iphone-auto' ? v.autoIdx : 0;
  G = { kind, f, n: v.n, from, i: from }; setTimeout(draw, 0);
  return `<div class="gd19" id="gd19"><img class="gi19" alt=""><span class="sn19"></span>
    <div class="gc19"><button class="b2 bk19" onclick="guide19.back()">Back</button><button class="b2 pri nx19b" onclick="guide19.next()">Next</button></div></div>`; };
})();

// ---------- On a computer (26 Nov) ----------
// Texts live on her phone's number, so the phone stays the thing that sends and receives. On a computer:
// setting up shows a code to scan, so the steps open on her phone with her link ready; and pressing send on a text
// shows a code that opens the text on her phone ready to go (Apple and Android cameras both read these).
(function(){
window.desk19 = () => !matchMedia('(pointer:coarse)').matches && !/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
const mac = () => /Macintosh/.test(navigator.userAgent);
let lib = null;
window.qr19 = async (text, px = 6) => { if (!window.qrcode) lib = lib || new Promise((ok, no) => { const s = document.createElement('script');
    s.src = 'https://unpkg.com/qrcode-generator@1.4.4/qrcode.js'; s.onload = ok; s.onerror = () => { lib = null; no(new Error("Couldn't load the code maker")); }; document.head.appendChild(s); });
  await lib; qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
  const q = qrcode(0, 'L'); q.addData(text, 'Byte'); q.make(); return q.createSvgTag({ cellSize: px, margin: 3, scalable: true }); };
const intl = p => { const d = String(p || '').replace(/[^\d+]/g, ''); return d.startsWith('+') ? d : /^0\d{9}$/.test(d) ? '+61' + d.slice(1) : d; };
const fill = async (id, text) => { const el = document.getElementById(id); if (!el) return;
  try { el.innerHTML = await qr19(text); } catch (e) { el.innerHTML = `<span class="qre19">${esc(e.message)}</span>`; } };

// setup: a code that opens the steps on her phone, link included
const page = (kind, u) => { const b = location.href.split('#')[0].replace(/[^/]*$/, '');
  const k = (String(u).match(/[?&]p=(\w+)/) || [])[1] || '', h = new URLSearchParams({ t: kind, k }); if (kind === 'iphone' && window.PHONE_SHORTCUT) h.set('s', window.PHONE_SHORTCUT); return b + 'phone.html#' + h; };
window.phoneSetup = (function(o){ return async function(kind){ const r = await o.apply(this, arguments);
  if (!kind || !desk19() || !S.phLink || !document.getElementById('ph19s')) return r;
  const sh = document.querySelector('#sheet .sh2'); if (!sh || document.getElementById('qrs19')) return r;
  sh.insertAdjacentHTML('afterend', `<div class="qr19"><div class="qrb19" id="qrs19"></div><div><b>Easiest: do it on your phone</b>
    <p>Point your phone's camera at this code and tap the link that appears. The steps open on your phone with your link ready, so there's nothing to copy across.</p>
    <p class="sm19">Or follow the video below on your phone yourself.</p></div></div>`);
  fill('qrs19', page(kind, S.phLink)); return r; }; })(window.phoneSetup);

// sending a text from a computer
const O = window.openUrl; window.openUrlRaw19 = O;
window.openUrl = u => { if (/^sms:/i.test(String(u)) && desk19()) return textQR19(String(u)); return O(u); };
window.textQR19 = u => { const m = u.match(/^sms:([^?&]*)(?:[?&]+body=(.*))?$/i) || [], ph = decodeURIComponent(m[1] || ''), body = m[2] ? decodeURIComponent(m[2]) : '';
  const who = (window.whoByPhone6 && whoByPhone6(ph)) || {}; S.qrBody19 = body; S.qrSms19 = u;
  openSheet2('Send it from your phone', `<div class="qr19 big"><div class="qrb19" id="qrt19"></div><div>
      <b>Point your phone's camera at this code</b><p>Tap the link that appears and your text to ${esc(who.name || fmtOne2(ph) || 'them')} opens, ready to send. Then press send on your phone.</p>
      <div class="ac19 left">${mac() ? `<button class="b2" onclick="openUrlRaw19(S.qrSms19)">Open Messages on this Mac</button>` : ''}<button class="b2" onclick="copy(S.qrBody19).then(()=>toast('Text copied'))">Copy the text</button><button class="b2 pri" onclick="closeOv()">Done</button></div>
      ${body.length > 600 ? '<p class="sm19">This one is long, so the code is dense. Hold your phone a little closer if it doesn\'t pick it up.</p>' : ''}</div></div>`);
  fill('qrt19', `SMSTO:${intl(ph)}:${body}`); };
})();
