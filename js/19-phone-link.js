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
  const body = kind === 'iphone' ? `
    <ol class="st19">
      <li><b>Add the Prospect shortcut.</b> ${sc ? `Tap the button, then <i>Set Up Shortcut</i>, paste your link (it's already copied) and tap <i>Add Shortcut</i>.<button class="b2 pri" onclick="phoneGo()">Add the shortcut</button>` : `Your link is copied.<button class="b2" onclick="phoneCopy()">Copy my link again</button>
        <details class="bd19"><summary>Make the shortcut (first time only, about 3 minutes)</summary><ol>
          <li>Open Shortcuts, tap <i>+</i>, name it <i>Prospect messages</i>.</li>
          <li>Add the action <i>Get Contents of URL</i> and paste your link as the URL.</li>
          <li>Tap the arrow on that action. Set <i>Method</i> to <i>POST</i> and <i>Request Body</i> to <i>JSON</i>.</li>
          <li>Add a Text field called <i>from</i>: tap the value, choose <i>Shortcut Input</i>, then tap it again and pick <i>Sender</i>.</li>
          <li>Add a Text field called <i>text</i>: choose <i>Shortcut Input</i> and pick <i>Content</i>.</li>
          <li>Add a Text field called <i>app</i> with the value <i>iphone</i>. Tap <i>Done</i>.</li></ol></details>`}</li>
      <li><b>Make it automatic.</b> In the Shortcuts app tap <i>Automation</i>, then <i>+</i>, then <i>Message</i>. In <i>Message Contains</i> type one space. Choose <i>Run Immediately</i>, tap <i>Next</i>, and pick <i>Prospect messages</i>.</li>
      <li><b>That's it.</b> Ask someone in Prospect to text you, or wait for the next reply. It shows below when it arrives.</li></ol>
    <p class="hint2 sm19">Needs iOS 17 or newer. WhatsApp replies can't come through on iPhone (Apple doesn't allow it), so those stay in WhatsApp.</p>`
  : `
    <ol class="st19">
      <li><b>Install Message487.</b> It's free. On the page tap <i>Download APK</i> and open it. If Android asks, allow installing from your browser.<button class="b2 pri" onclick="window.open('${F_DROID}','_blank','noopener')">Get Message487</button></li>
      <li><b>Paste your link.</b> Open it, go to <i>Connection</i>, paste your link into the address (it's already copied) and paste it again as the token.<button class="b2" onclick="phoneCopy()">Copy my link again</button></li>
      <li><b>Turn on texts and WhatsApp.</b> In <i>Sources</i> turn on <i>SMS</i>, then <i>Notifications</i> and tick <i>WhatsApp</i> and <i>Messages</i>. Allow the permissions it asks for.</li></ol>
    <p class="hint2 sm19">Leave the phone as it is: it works in the background, and keeps messages safe if the signal drops.</p>`;
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
