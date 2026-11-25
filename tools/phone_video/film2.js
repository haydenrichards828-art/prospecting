// Draws any moment of the phone setup videos. Every screen is drawn to look like the real iPhone (iOS 26 style) or
// Android (Pixel style) screen she will see, with a finger showing each tap, and moves between apps the way the phone does.
// Used by rec2.js: FILM2.init(kind, pos) then FILM2.frame(t) for each frame. Native screen sizes: iPhone 393x852, Android 412x915.
(function () {
const S = {};
const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, cl = x => Math.max(0, Math.min(1, x));

// ---------- small drawings ----------
const svg = (w, h, inner, vb) => `<svg width="${w}" height="${h}" viewBox="${vb || `0 0 ${w} ${h}`}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const I = {
  chev: svg(8, 14, '<path d="M1.5 1.5l5 5.5-5 5.5"/>'),
  back: svg(12, 20, '<path d="M10 2L2 10l8 8"/>'),
  plus: svg(20, 20, '<path d="M10 3v14M3 10h14"/>'),
  check: svg(20, 20, '<path d="M4 10.5l4 4 8-9"/>'),
  x: svg(18, 18, '<path d="M4 4l10 10M14 4L4 14"/>'),
  search: svg(20, 20, '<circle cx="9" cy="9" r="6"/><path d="M14 14l4 4"/>'),
  aback: svg(24, 24, '<path d="M20 12H5M11 6l-6 6 6 6"/>'),
  more: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>`,
  bell: svg(24, 24, '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  sms: svg(24, 24, '<path d="M4 4h16v12H8l-4 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>'),
  dash: svg(24, 24, '<rect x="4" y="4" width="7" height="9" rx="1"/><rect x="13" y="4" width="7" height="5" rx="1"/><rect x="13" y="11" width="7" height="9" rx="1"/><rect x="4" y="15" width="7" height="5" rx="1"/>'),
  hist: svg(24, 24, '<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5M12 8v4l3 2"/>'),
  tune: svg(24, 24, '<path d="M4 7h10M18 7h2M4 17h4M12 17h8M14 5v4M8 15v4"/>'),
  link: svg(24, 24, '<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>'),
  info: svg(24, 24, '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>'),
  finger: svg(44, 44, '<path d="M14 30c0-8 3-14 8-14s8 6 8 14M10 24c1-10 6-16 12-16s11 6 12 16M18 34c0-6 1-11 4-11s4 5 4 11M22 38v-9"/>', '0 0 44 44'),
  lock: svg(14, 14, '<rect x="3" y="6" width="8" height="6" rx="1"/><path d="M5 6V4.5a2 2 0 0 1 4 0V6"/>'),
  dl: svg(24, 24, '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  pkg: svg(24, 24, '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>'),
  gear: svg(24, 24, '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'),
  globe: svg(24, 24, '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'),
  grid: svg(24, 24, '<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>'),
  clockcheck: svg(24, 24, '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  stack: svg(24, 24, '<path d="M12 4l8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4M4 16l8 4 8-4"/>'),
  spark: svg(24, 24, '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'),
  sig: `<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>`,
  wifi: `<svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.2c2.4 0 4.6.9 6.3 2.4l1.2-1.3A10.8 10.8 0 0 0 8.5.4 10.8 10.8 0 0 0 1 3.3l1.2 1.3a9 9 0 0 1 6.3-2.4zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3a7.2 7.2 0 0 0-9.8 0l1.2 1.3c1-.9 2.3-1.4 3.7-1.4zm0 3.6c-.5 0-1 .2-1.3.5L8.5 11.3l1.3-1.4c-.3-.3-.8-.5-1.3-.5z"/></svg>`,
  batt: `<svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.8" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2.5" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity=".45"/></svg>`,
  asig: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M15 1v14H1z"/></svg>`,
  awifi: `<svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor"><path d="M9 15L0 4.5A13.5 13.5 0 0 1 18 4.5z"/></svg>`,
  abatt: `<svg width="10" height="17" viewBox="0 0 10 17" fill="currentColor"><rect x="3" y="0" width="4" height="2" rx=".5"/><rect x="0" y="2" width="10" height="15" rx="1.5"/></svg>`,
};
const LOGO = `<svg width="100%" height="100%" viewBox="0 0 24 24"><rect width="24" height="24" rx="5.5" fill="#0d1117"/><g transform="translate(2.4 2.4) scale(.8)"><rect x="2" y="2.2" width="20" height="15.6" rx="4.2" fill="#3b82f6"/><path d="M5.2 16.8 4.4 22.4 10.6 17.4z" fill="#3b82f6"/><path d="M6.9 9.4 12 5.4l5.1 4v6.3H6.9z" fill="#fff"/><path d="M10.5 15.7v-4h3v4z" fill="#3b82f6"/></g></svg>`;
// app icons: plain shapes with the app's name beside them, not copies of anyone's logo
const AI = {
  prospect: `<span class="aic full">${LOGO}</span>`,
  shortcuts: `<span class="aic" style="background:linear-gradient(150deg,#ff5f8f,#a347ff 55%,#4d5cff)"><svg width="62%" height="62%" viewBox="0 0 24 24"><rect x="3" y="3" width="12" height="12" rx="3" fill="#fff" opacity=".95" transform="rotate(45 9 9)"/><rect x="9" y="9" width="12" height="12" rx="3" fill="#fff" opacity=".55" transform="rotate(45 15 15)"/></svg></span>`,
  m487: `<span class="aic" style="background:url(m487.png) center/cover"></span>`,
  chrome: `<span class="aic" style="background:#fff;color:#1a73e8;box-shadow:inset 0 0 0 1px #dadce0">${I.globe}</span>`,
  settings: `<span class="aic" style="background:#5f6368;color:#fff">${I.gear}</span>`,
  install: `<span class="aic" style="background:#3c8d5a;color:#fff">${I.pkg}</span>`,
  home: `<span class="aic" style="background:#394150;color:#fff">${I.grid}</span>`,
  whatsapp: `<span class="aic round" style="background:#25d366;color:#fff">${I.sms}</span>`,
  messages: `<span class="aic round" style="background:#1a73e8;color:#fff">${I.sms}</span>`,
};
const icon = (k, sz) => `<span class="icw" style="width:${sz}px;height:${sz}px">${AI[k]}</span>`;
const WHERE = { prospect: ['Prospect', 'prospect'], shortcuts: ['the Shortcuts app', 'shortcuts'], chrome: ['Chrome', 'chrome'], install: ['the installer', 'install'],
  settings: ['Settings', 'settings'], m487: ['Message487', 'm487'], home: ['your home screen', 'home'] };

// ---------- iPhone screens ----------
const ios = {
  sb: dark => `<div class="sbar${dark ? ' dk' : ''}"><span>9:41</span><i class="di"></i><span class="ic">${I.sig}${I.wifi}${I.batt}</span></div>`,
  wrap: (inner, o = {}) => `<div class="ios${o.dark ? ' dark' : ''}" style="${o.bg ? 'background:' + o.bg : ''}">${ios.sb(o.dark)}<div class="body">${inner}</div><i class="hind"></i></div>`,
  row: (t, o = {}) => `<div class="row"${o.k ? ` data-t="${o.k}"` : ''}>${o.ic || ''}<span>${t}</span>${o.v != null ? `<span class="v">${o.v}${o.chev === false ? '' : I.chev}</span>` : (o.right || '')}</div>`,
  tabs: (on, k, k0) => `<div class="tabbar">${[['Shortcuts', I.stack], ['Automation', I.clockcheck], ['Gallery', I.spark]].map(([n, ic], i) => `<span class="${i === on ? 'on' : ''}"${k && i === 1 ? ` data-t="${k}"` : k0 && i === 0 ? ` data-t="${k0}"` : ''}>${ic}<em>${n}</em></span>`).join('')}</div><div class="tsearch">${I.search}</div>`,
  kb: (o = {}) => `<div class="kb">${['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((r, i) => `<div class="kr">${i === 2 ? '<i class="g">⇧</i>' : ''}${[...r].map(c => `<i data-t="k-${c}">${c}</i>`).join('')}${i === 2 ? '<i class="g">⌫</i>' : ''}</div>`).join('')}<div class="kr"><i class="g w">123</i><i class="g w">☺</i><i class="sp" data-t="k-space">space</i><i class="g w2">return</i></div></div>`,
};
// the Shortcuts library after adding
const iLibrary = (k, kt, alert) => ios.wrap(`<div class="nav"><span></span><span class="navr"><span class="gb">${I.plus}</span></span></div><div class="lt">All Shortcuts</div>
  <div class="tiles"><div class="tile" style="background:linear-gradient(155deg,#ff7aa5,#a347ff)"${kt ? ` data-t="${kt}"` : ''}><span class="tic">${I.sms}</span><b>Prospect messages</b></div></div>${ios.tabs(0, k)}${alert || ''}`);
const iAutoEmptyBody = (k) => `<div class="nav"><span></span><span class="gb">${I.plus}</span></div><div class="lt">Automation</div>
  <div class="empty"><div class="eic">${I.clockcheck}</div><p>Have your devices react to changes in conditions.</p><span class="bigbtn"${k ? ` data-t="${k}"` : ''}>New Automation</span></div>${ios.tabs(1)}`;
const iAutoEmpty = (k) => ios.wrap(iAutoEmptyBody(k));
const TRIG = [['Time of Day', '#ff9500'], ['Alarm', '#ff9500'], ['Sleep', '#5e5ce6'], ['Apple Watch Workout', '#34c759'], ['Arrive', '#0a84ff'], ['Leave', '#0a84ff'], ['Before I Commute', '#0a84ff'],
  ['CarPlay', '#34c759'], ['Email', '#0a84ff'], ['Message', '#34c759'], ['Wallet', '#1c1c1e'], ['Wi‑Fi', '#0a84ff'], ['Bluetooth', '#0a84ff'], ['NFC', '#1c1c1e'], ['App', '#5e5ce6']];
const iNewAuto = () => ios.wrap(`${iAutoEmptyBody('')}<div class="sheetbg"></div><div class="sheet"><div class="grab"></div><div class="nav"><span class="gb">${I.x}</span><span class="tt">New Automation</span><span></span></div>
  <div class="srch">${I.search}<span>Search</span></div><div class="clip"><div class="scr"><div class="grp">${TRIG.map(([n, c]) => ios.row(n, { k: n === 'Message' ? 'msg' : '', ic: `<span class="ico" style="background:${c}">${n === 'Message' || n === 'Email' ? I.sms : I.clockcheck}</span>`, v: '' })).join('')}</div></div></div></div>`);
const iWhenBody = (n, kc, kr, kn) => `<div class="nav"><span class="gb">${I.back}</span><span class="tt">When</span><span class="gb txt${n >= 1 || kc === null ? '' : ' dim'}"${kn ? ` data-t="${kn}"` : ''}>Next</span></div>
  <div class="whenhd">${icon('messages', 30)}<b>When I get a message${kc === null ? ' containing “ ”' : ''}</b></div>
  <div class="grp">${ios.row('Sender', { v: 'Choose' })}${ios.row('Message Contains', { k: kc || '', v: kc === null ? '“ ”' : 'Choose' })}</div>
  <div class="grp">${ios.row('Run After Confirmation', { right: n >= 1 ? '' : `<span class="chk">${I.check}</span>` })}${ios.row('Run Immediately', { k: kr || '', right: n >= 1 ? `<span class="chk">${I.check}</span>` : '' })}</div>
  ${n >= 1 ? `<div class="grp">${ios.row('Notify When Run', { right: '<i class="tog on"></i>' })}</div>` : ''}`;
const iWhen = (n, kc, kr, kn) => ios.wrap(iWhenBody(n, kc, kr, kn));
const iContains = (n) => ios.wrap(`${iWhenBody(0, '')}<div class="sheetbg"></div><div class="sheet short"><div class="grab"></div><div class="nav"><span class="gb">${I.x}</span><span class="tt">Message Contains</span><span class="gb blue" data-t="ok">${I.check}</span></div>
  <div class="tf"><span class="${n >= 1 ? 'sp1' : 'ph'}">${n >= 1 ? '' : 'Message'}</span><i class="caret"></i></div>${ios.kb()}</div>`);
const iDo = () => ios.wrap(`<div class="nav"><span class="gb">${I.back}</span><span class="tt">Do</span><span></span></div>
  <div class="grp">${ios.row('New Blank Automation', { ic: `<span class="ico" style="background:#0a84ff">${I.plus}</span>` })}</div><div class="sh">My Shortcuts</div>
  <div class="grp">${ios.row('Prospect messages', { k: 'pm', ic: `<span class="ico" style="background:linear-gradient(155deg,#ff7aa5,#a347ff)">${I.sms}</span>` })}</div>`);
const iAutoList = (k0) => ios.wrap(`<div class="nav"><span></span><span class="gb">${I.plus}</span></div><div class="lt">Automation</div><div class="sh">Personal</div>
  <div class="grp">${ios.row('<span class="two"><b>When I get a message containing “ ”</b><em>Prospect messages</em></span>', { ic: icon('messages', 34), v: '' })}</div>${ios.tabs(1, null, k0)}`);
const iAdd = () => ios.wrap(`<div class="nav"><span></span><span class="gb">${I.x}</span></div><div class="addcard"><div class="tile big" style="background:linear-gradient(155deg,#ff7aa5,#a347ff)"><span class="tic">${I.sms}</span></div>
  <h2>Prospect messages</h2><p>Sends texts you receive from people in Prospect to Prospect, so their replies show up there.</p></div><span class="widebtn" data-t="setup">Set Up Shortcut</span>`, { bg: '#fff' });
const iSetup = (n) => ios.wrap(`<div class="nav"><span class="gb">${I.back}</span><span class="tt">Set Up Shortcut</span><span></span></div>
  <div class="q">Paste your Prospect link (it's already copied)</div><div class="tf2${n >= 1 ? ' on' : ''}" data-t="fld"><span class="${n >= 3 ? '' : 'ph'}">${n >= 3 ? 'https://hywtg…supabase.co/functions/v1/inbox?p=…' : 'URL'}</span>${n >= 1 ? '<i class="caret"></i>' : ''}</div>
  ${n === 2 ? `<div class="emenu"><span data-t="paste">Paste</span><span>AutoFill</span></div>` : ''}<span class="widebtn${n >= 1 ? ' up' : ''}" data-t="add">Add Shortcut</span>${n >= 1 ? ios.kb() : ''}`, { bg: '#fff' });

// the first time it sends anything, iOS asks whether the shortcut may send to that address
const iAllow = k => `<div class="sheetbg"></div><div class="ialert"><b>Allow “Prospect messages” to send 1 item to “hywtghpfhhvbygunokca.supabase.co”?</b>
  <p>Only allow this if you trust the shortcut.</p><span data-t="${k}">Always Allow</span><span>Allow Once</span><span>Don't Allow</span></div>`;

// ---------- Android screens ----------
const and = {
  sb: dark => `<div class="asb${dark ? ' dk' : ''}"><span>9:41</span><i class="cam"></i><span class="ic">${I.awifi}${I.asig}${I.abatt}</span></div>`,
  wrap: (inner, o = {}) => `<div class="and ${o.cls || ''}" style="${o.bg ? 'background:' + o.bg : ''}">${and.sb(o.dark)}<div class="abody">${inner}</div><i class="gbar${o.dark ? ' lt' : ''}"></i></div>`,
  sw: (on, k, dis) => `<i class="m3sw${on ? ' on' : ''}${dis ? ' dis' : ''}"${k ? ` data-t="${k}"` : ''}></i>`,
  dlg: (body, acts) => `<div class="dlgbg"></div><div class="dlg">${body}<div class="acts">${acts}</div></div>`,
  btn: (t, k, cls = '') => `<span class="tbtn ${cls}"${k ? ` data-t="${k}"` : ''}>${t}</span>`,
  kb: () => `<div class="akb"><div class="sug"><span>${I.grid}</span><span></span><span></span></div>${['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((r, i) => `<div class="kr">${i === 2 ? '<i class="g">⇧</i>' : ''}${[...r].map(c => `<i data-t="k-${c}">${c}</i>`).join('')}${i === 2 ? '<i class="g">⌫</i>' : ''}</div>`).join('')}<div class="kr"><i class="g w">?123</i><i class="g">,</i><i class="sp">English</i><i class="g">.</i><i class="g w ac">↵</i></div></div>`,
};
const chromeBar = () => `<div class="cbar"><span>${I.lock}</span><span class="url">github.com/andre487/AndroidMessage487</span><span class="tabs">2</span><span>${I.more}</span></div>`;
const aChrome = (inner) => and.wrap(`${chromeBar()}<div class="cpage"><div class="ghline"></div><div class="ghline s"></div></div>${inner}`, { bg: '#fff' });
const m487Nav = (on, k) => `<div class="navbar">${[['Overview', I.dash], ['Sources', I.bell], ['Journal', I.hist], ['Connection', I.tune]].map(([n, ic], i) => `<span class="${i === on ? 'on' : ''}"${k && k[i] ? ` data-t="${k[i]}"` : ''}><i class="pill">${ic}</i>${n}</span>`).join('')}</div>`;
const aOverview = (k) => and.wrap(`<div class="atop big"><span>Message487</span></div><div class="hero"><span class="chip">Webhook</span><h2>Set up connection</h2><p>Your messages. Your workflows.</p></div>
  <div class="stats"><div><b>0</b><span>In queue</span></div><div><b>0</b><span>Apps selected</span></div></div>${m487Nav(0, [0, 0, 0, k])}`);
const aConn = (n, o = {}) => and.wrap(`<div class="atop"><span>Connection</span></div><div class="clip"><div class="scr">
  <div class="pad"><h3 class="hl">Where messages go</h3><p class="sup">Connect an n8n workflow or your own webhook.</p><div class="sect">Recipient</div>
  <div class="field${o.urlFocus ? ' focus' : ''}"${o.ku ? ` data-t="${o.ku}"` : ''}><label>Webhook URL</label><span class="${o.url ? 'val' : ''}">${o.url ? 'https://hywtg….supabase.co/functions/v1/inbox?p=…' : ''}</span>${o.urlFocus && !o.url ? '<i class="acaret"></i>' : ''}${o.paste ? `<div class="apaste"><span data-t="paste">Paste</span><span>Select all</span></div>` : ''}</div><p class="sup sm">Enter the full URL from your published workflow.</p>
  <div class="field${o.tokFocus ? ' focus' : ''}"${o.kt ? ` data-t="${o.kt}"` : ''}><label>Webhook token</label><span class="val">${o.tok || ''}</span>${o.tokFocus ? '<i class="acaret"></i>' : ''}</div><p class="sup sm">Enter the token without the Bearer prefix. Stored encrypted on this device.</p>
  <div class="swrow"><div><b>n8n confirmation</b><p class="sup sm">Require an accepted response matching the event ID.</p></div>${and.sw(true)}</div>
  <div class="sect">This device</div><div class="field"><label>Device code</label><span class="val">android-device</span></div>
  <span class="fbtn">Save connection</span><div class="sect">Test message</div><p class="sup sm">Choose extra content for this test only. All options off sends text only.</p>
  <span class="obtn">Preview event</span><span class="obtn"${o.ks ? ` data-t="${o.ks}"` : ''}>Save and send test event</span><div style="height:140px"></div></div></div></div>
  ${o.snack ? '<div class="snack">Test event saved to the queue. Check the journal for its result.</div>' : ''}${o.kb ? and.kb() : m487Nav(3, [0, o.navk])}`);
const aSources = (o = {}) => and.wrap(`<div class="atop"><span class="ib">${I.aback}</span><span>Sources</span></div><div class="clip"><div class="scr"><div class="pad">
  <p class="sup">Enabled sources send message text, source names and timestamps to your saved webhook. SMS also includes the sender.</p>
  <div class="m3card"><div class="cardrow"><i class="cic">${I.bell}</i><b>Notifications</b>${and.sw(o.notif, o.kn)}</div><p class="sup sm">Selected apps only. Ongoing notifications and group summaries are skipped.</p><span class="lnk"${o.kl ? ` data-t="${o.kl}"` : ''}>Notification access settings</span></div>
  <div class="m3card"><div class="cardrow"><i class="cic">${I.sms}</i><b>Incoming SMS</b>${and.sw(o.sms, o.ks)}</div><p class="sup sm">New messages, including multipart SMS. No access to your message history.</p></div>
  <div class="apphd"><b>Applications · ${(o.wa ? 1 : 0) + (o.msg ? 1 : 0)}</b><span class="lnk">Add package</span></div>
  ${[['WhatsApp', 'whatsapp', o.wa, o.kw], ['Messages', 'messages', o.msg, o.km], ['Gmail', null, false], ['Photos', null, false]].map(([n, ic, on, k]) => `<div class="approw"${k ? ` data-t="${k}"` : ''}>${ic ? icon(ic, 40) : `<span class="aic round" style="width:40px;height:40px;background:#d7d2e0"></span>`}<span>${n}</span><i class="cbx${on ? ' on' : ''}">${on ? '✓' : ''}</i></div>`).join('')}
  <div style="height:160px"></div></div></div></div>${m487Nav(1)}${o.dlg || ''}`);
// Android Settings (Pixel blue system colours)
const setBar = (t, o = {}) => `<div class="stop"><span class="ib"${o.kb ? ` data-t="${o.kb}"` : ''}>${I.aback}</span><span></span>${o.more ? `<span class="ib"${o.km ? ` data-t="${o.km}"` : ''}>${I.more}</span>` : ''}</div><div class="stitle">${t}</div>`;
const aUnknown = (on, kSw, kBack) => and.wrap(`${setBar('Install unknown apps', { kb: kBack })}<div class="sapp">${icon('chrome', 44)}<div><b>Chrome</b><span>Version 142</span></div></div>
  <div class="srow big"${kSw ? ` data-t="${kSw}"` : ''}><span>Allow from this source</span>${and.sw(on)}</div><p class="snote">Your phone and personal data are more vulnerable to attack by unknown apps. By installing apps from this source, you agree that you are responsible for any damage to your phone or loss of data.</p>`, { cls: 'set' });
const aNotifList = (k) => and.wrap(`${setBar('Device & app notifications')}<p class="snote">These apps can read your notifications.</p>
  <div class="srow" ><span class="aic round" style="width:40px;height:40px;background:#1a73e8"></span><div class="two"><b>Android System Intelligence</b><em>Allowed</em></div></div>
  <div class="srow"${k ? ` data-t="${k}"` : ''}>${icon('m487', 40)}<div class="two"><b>Message487</b><em>Not allowed</em></div></div>`, { cls: 'set' });
const aNotifDetail = (on, k, dlg) => and.wrap(`${setBar('Device & app notifications')}<div class="sapp">${icon('m487', 44)}<div><b>Message487</b></div></div>
  <div class="srow big"${k ? ` data-t="${k}"` : ''}><span>Allow notification access</span>${and.sw(on)}</div><div class="sect2">Allowed notification types</div>
  ${['Real-time', 'Conversations', 'Notifications', 'Silent'].map(n => `<div class="srow dim"><span>${n}</span><i class="cbx${on ? ' on' : ''}">${on ? '✓' : ''}</i></div>`).join('')}${dlg || ''}`, { cls: 'set' });
const aAppInfo = (o = {}) => and.wrap(`${setBar('App info', { more: 1, km: o.km })}<div class="ainfo">${icon('m487', 64)}<b>Message487</b><span>Installed</span></div>
  <div class="abtns"><span${o.ko ? ` data-t="${o.ko}"` : ''}><i>${I.chev}</i>Open</span><span><i>${I.x}</i>Uninstall</span><span><i>${I.info}</i>Force stop</span></div>
  ${['Notifications', 'Permissions', 'Storage & cache', 'Mobile data & Wi‑Fi', 'Screen time', 'App battery usage'].map(n => `<div class="srow"><div class="two"><b>${n}</b></div></div>`).join('')}
  ${o.menu ? `<div class="amenu"><span${o.kr ? ` data-t="${o.kr}"` : ''}>Allow restricted settings</span><span>Uninstall for all users</span></div>` : ''}
  ${o.bio ? `<div class="dlgbg"></div><div class="bsheet"><b>Confirm it's you</b><p>Use your fingerprint or screen lock to continue</p><span class="fp"${o.kf ? ` data-t="${o.kf}"` : ''}>${I.finger}</span><span class="tbtn">Use PIN</span></div>` : ''}`, { cls: 'set' });
const HOMEAPPS = [['Phone', '#1e8e3e'], ['Messages', '#1a73e8'], ['Chrome', '#fff'], ['Camera', '#5f6368']];
const DRAWER = ['Calculator', 'Calendar', 'Camera', 'Chrome', 'Clock', 'Contacts', 'Files', 'Gmail', 'Maps', 'Message487', 'Messages', 'Phone', 'Photos', 'Play Store', 'Settings', 'WhatsApp'];
const aHome = (n, kl, ki) => and.wrap(`<div class="wall"></div><div class="glance">Tue, 25 Nov</div>
  <div class="dock">${HOMEAPPS.map(([a, c]) => `<span class="aic round" style="width:56px;height:56px;background:${c};${c === '#fff' ? 'box-shadow:inset 0 0 0 1px #ddd' : ''}"></span>`).join('')}</div><div class="gsearch">G<span></span></div>
  ${n >= 1 ? `<div class="drawer"><div class="dsearch">${I.search}<span>Search apps</span></div><div class="dgrid">${DRAWER.map(a => `<span class="dapp"${a === 'Message487' && kl ? ` data-t="${kl}"` : ''}>${a === 'Message487' ? icon('m487', 54) : a === 'WhatsApp' ? icon('whatsapp', 54) : a === 'Messages' ? icon('messages', 54) : a === 'Chrome' ? icon('chrome', 54) : a === 'Settings' ? icon('settings', 54) : `<span class="aic round" style="width:54px;height:54px;background:hsl(${a.length * 47 % 360} 45% 62%)"></span>`}<em>${a}</em></span>`).join('')}</div></div>` : ''}
  ${n >= 2 ? `<div class="lpmenu"><span${ki ? ` data-t="${ki}"` : ''}>${I.info}App info</span><span>${I.x}Pause app</span></div>` : ''}`, { dark: n < 1, bg: n < 1 ? '#1d2b4f' : '#f3f1f8' });
// the package installer dialogs
const instDlg = (title, ic, text, acts) => `<div class="dlgbg"></div><div class="dlg inst"><div class="ihd">${ic}<b>${title}</b></div><p>${text}</p><div class="acts">${acts}</div></div>`;

// Prospect itself: a real screenshot of the app, as installed on the home screen
const prospect = (os, file, k, pos) => {
  const top = os === 'ios' ? 54 : 40, img = `<img class="shot" src="shots/${file}" style="top:${top}px">`;
  const hit = k && pos ? `<i class="hit" data-t="${k}" style="left:${pos.x}px;top:${pos.y + top}px;width:${pos.width}px;height:${pos.height}px"></i>` : '';
  return os === 'ios' ? ios.wrap('', { dark: true }).replace('<div class="body"></div>', `${img}${hit}`) : and.wrap('', { dark: true, bg: '#0a0c0f' }).replace('<div class="abody"></div>', `${img}${hit}`);
};

// ---------- the two videos ----------
function scenes(kind, pos) {
  if (kind === 'iphone') return [
    { w: 'prospect', cap: 'Tap <b>Add the shortcut</b>', note: 'Your link is copied for you', scr: () => prospect('ios', 'iphone-sheet.png', 'btn', pos.iphone.btn), acts: [['tap', 'btn']] },
    { w: 'shortcuts', cap: 'The Shortcuts app opens. Tap <b>Set Up Shortcut</b>', note: 'If a web page shows first, tap Get Shortcut', enter: 'zoom', scr: () => iAdd(), acts: [['tap', 'setup']] },
    { w: 'shortcuts', cap: 'Tap the box, tap it again, then tap <b>Paste</b>', enter: 'push', scr: n => iSetup(n), acts: [['tap', 'fld'], ['tap', 'fld'], ['tap', 'paste']] },
    { w: 'shortcuts', cap: 'Tap <b>Add Shortcut</b>', enter: 'none', scr: () => iSetup(3), acts: [['tap', 'add']] },
    { w: 'shortcuts', cap: 'Tap <b>Automation</b> at the bottom', start: 1, enter: 'fade', scr: () => iLibrary('auto'), acts: [['tap', 'auto']] },
    { w: 'shortcuts', cap: 'Tap <b>New Automation</b>', note: 'Already have automations? Tap + at the top instead', enter: 'fade', scr: () => iAutoEmpty('new'), acts: [['tap', 'new']] },
    { w: 'shortcuts', cap: 'Scroll down and tap <b>Message</b>', enter: 'self', scr: () => iNewAuto(), acts: [['scroll', 300], ['tap', 'msg']] },
    { w: 'shortcuts', cap: 'Tap <b>Message Contains</b>', enter: 'push', scr: () => iWhen(0, 'mc'), acts: [['tap', 'mc']] },
    { w: 'shortcuts', cap: 'Press the <b>space bar</b> once, then tap <b>✓</b>', note: 'Every text has a space, so every text gets checked', enter: 'self', scr: n => iContains(n), acts: [['tap', 'k-space'], ['tap', 'ok']] },
    { w: 'shortcuts', cap: 'Tap <b>Run Immediately</b>, then <b>Next</b>', enter: 'fade', scr: n => iWhen(n, null, 'ri', 'nx'), acts: [['tap', 'ri'], ['tap', 'nx']] },
    { w: 'shortcuts', cap: 'Tap <b>Prospect messages</b>', enter: 'push', scr: () => iDo(), acts: [['tap', 'pm']] },
    { w: 'shortcuts', cap: 'Check it works: tap <b>Shortcuts</b> at the bottom, then <b>Prospect messages</b>', note: 'It runs by itself from now on. This just checks it once.', enter: 'back', scr: n => n < 1 ? iAutoList('tabS') : iLibrary(null, 'pm'), acts: [['tap', 'tabS'], ['tap', 'pm']] },
    { w: 'shortcuts', cap: 'If it asks, tap <b>Always Allow</b>', note: 'So it never needs to ask again', enter: 'self', scr: () => iLibrary(null, '', iAllow('aa')), acts: [['tap', 'aa']] },
    { w: 'prospect', cap: 'Prospect shows <b>Connected</b>. Replies show up there by themselves.', last: 1, enter: 'zoom', scr: () => prospect('ios', 'iphone-connected.png'), acts: [['wait', 2]] }];
  return [
    { w: 'prospect', cap: 'Tap <b>Get Message487</b>', note: 'Your link is copied for you', scr: () => prospect('and', 'android-sheet.png', 'btn', pos.android.btn), acts: [['tap', 'btn']] },
    { w: 'chrome', cap: 'Chrome asks about the download. Tap <b>Download anyway</b>', note: 'It asks this for any app download', enter: 'zoom', scr: () => aChrome(and.dlg(`<h3>File might be harmful</h3><p>Do you want to download message487.apk anyway?</p>`, and.btn('Cancel') + and.btn('Download anyway', 'dl'))), acts: [['tap', 'dl']] },
    { w: 'chrome', cap: 'Tap <b>Open</b>', enter: 'none', scr: () => aChrome(`<div class="cmsg">${I.dl}<span>Downloaded message487.apk</span><b data-t="open">Open</b></div>`), acts: [['tap', 'open']] },
    { w: 'install', cap: 'Tap <b>Settings</b>', note: 'Android checks once that Chrome may install apps', enter: 'self', scr: () => aChrome(instDlg('Chrome', icon('chrome', 28), 'For your security, your phone currently isn\'t allowed to install unknown apps from this source. You can change this in Settings.', and.btn('Cancel') + and.btn('Settings', 'set'))), acts: [['tap', 'set']] },
    { w: 'settings', cap: 'Turn on <b>Allow from this source</b>, then tap ← at the top', enter: 'push', scr: n => aUnknown(n >= 1, 'sw', 'bk'), acts: [['tap', 'sw'], ['tap', 'bk']] },
    { w: 'install', cap: 'Tap <b>Install</b>', note: 'If Google Play Protect asks, let it check, then install', enter: 'back', scr: () => aChrome(instDlg('Message487', icon('m487', 28), 'Do you want to install this app?', and.btn('Cancel') + and.btn('Install', 'ins'))), acts: [['tap', 'ins']] },
    { w: 'install', cap: 'Tap <b>Open</b>', enter: 'none', scr: () => aChrome(instDlg('Message487', icon('m487', 28), 'App installed.', and.btn('Done') + and.btn('Open', 'op'))), acts: [['tap', 'op']] },
    { w: 'm487', cap: 'Tap <b>Connection</b> at the bottom', enter: 'zoom', scr: () => aOverview('conn'), acts: [['tap', 'conn']] },
    { w: 'm487', cap: 'Touch and hold <b>Webhook URL</b>, then tap <b>Paste</b>', enter: 'fade', scr: n => aConn(n, { ku: 'url', urlFocus: n >= 1, paste: n === 1, url: n >= 2 }), acts: [['hold', 'url'], ['tap', 'paste']] },
    { w: 'm487', cap: 'Tap <b>Webhook token</b> and type <b>prospect</b>', note: 'Just that word, lower case is fine', enter: 'none', scr: n => aConn(n, { url: 1, kt: 'tok', tokFocus: n >= 1, kb: n >= 1, tok: 'prospect'.slice(0, Math.max(0, n - 1)) }),
      acts: [['tap', 'tok'], ...[...'prospect'].map(c => ['key', 'k-' + c])] },
    { w: 'm487', cap: 'Tap <b>Save and send test event</b>', note: 'Scroll down to it if you need to. Prospect shows Connected when the test arrives', enter: 'none', scr: n => aConn(n, { url: 1, tok: 'prospect', ks: 'send', snack: n >= 1 }), acts: [['tap', 'send'], ['wait', .6]] },
    { w: 'm487', cap: 'Tap <b>Sources</b>, then <b>Notification access settings</b>', enter: 'none', scr: n => n < 1 ? aConn(0, { url: 1, tok: 'prospect', navk: 'src' }) : aSources({ kl: 'nas' }), acts: [['tap', 'src'], ['tap', 'nas']] },
    { w: 'settings', cap: 'Tap <b>Message487</b>, then the switch', enter: 'push', scr: n => n < 1 ? aNotifList('m') : aNotifDetail(false, 'sw', n >= 2 ? and.dlg('<h3>Restricted setting</h3><p>For your security, this setting is currently unavailable.</p>', and.btn('OK', 'ok')) : ''), acts: [['tap', 'm'], ['tap', 'sw']] },
    { w: 'settings', cap: 'Android blocks it the first time. That\'s normal, tap <b>OK</b>', enter: 'none', scr: () => aNotifDetail(false, '', and.dlg('<h3>Restricted setting</h3><p>For your security, this setting is currently unavailable.</p>', and.btn('OK', 'ok'))), acts: [['tap', 'ok']] },
    { w: 'home', cap: 'Swipe up from the bottom, touch and hold <b>Message487</b>, tap <b>App info</b>', enter: 'fade', scr: n => aHome(n, 'ml', 'ai'), acts: [['swipe', [206, 860], [206, 420]], ['hold', 'ml'], ['tap', 'ai']] },
    { w: 'settings', cap: 'Tap <b>⋮</b> at the top, then <b>Allow restricted settings</b>', enter: 'push', scr: n => aAppInfo({ km: 'm', menu: n === 1, kr: 'r', bio: n >= 2, kf: 'f' }), acts: [['tap', 'm'], ['tap', 'r']] },
    { w: 'settings', cap: 'Confirm it\'s you, then tap <b>Open</b>', enter: 'none', scr: n => aAppInfo({ bio: n < 1, kf: 'f', ko: 'o' }), acts: [['tap', 'f'], ['tap', 'o']] },
    { w: 'm487', cap: 'Again: <b>Notification access settings</b>, <b>Message487</b>, switch on', enter: 'zoom', scr: n => n < 1 ? aSources({ kl: 'nas' }) : n < 2 ? aNotifList('m') : aNotifDetail(false, 'sw'), acts: [['tap', 'nas'], ['tap', 'm'], ['tap', 'sw']] },
    { w: 'settings', cap: 'Tap <b>Allow</b>', enter: 'self', scr: () => aNotifDetail(false, '', and.dlg('<h3>Allow notification access for Message487?</h3><p>Message487 will be able to read all notifications, including personal information such as contact names and the text of messages you receive.</p>', and.btn('Don\'t allow') + and.btn('Allow', 'al'))), acts: [['tap', 'al'], ['wait', .3]] },
    { w: 'm487', cap: 'Back in Message487: turn on <b>Notifications</b>, tick <b>WhatsApp</b> and <b>Messages</b>', enter: 'back', scr: n => aSources({ kn: 'n', notif: n >= 1, kw: 'w', wa: n >= 2, km: 'mm', msg: n >= 3 }), acts: [['tap', 'n'], ['tap', 'w'], ['tap', 'mm']] },
    { w: 'm487', cap: 'Turn on <b>Incoming SMS</b>, then tap <b>Allow</b>', enter: 'none', scr: n => aSources({ notif: 1, wa: 1, msg: 1, ks: 's', sms: n >= 2, dlg: n === 1 ? `<div class="dlgbg"></div><div class="dlg perm"><i class="pic">${I.sms}</i><p class="pq">Allow <b>Message487</b> to send and view SMS messages?</p><span class="pb" data-t="al">Allow</span><span class="pb">Don't allow</span></div>` : '' }), acts: [['tap', 's'], ['tap', 'al']] },
    { w: 'prospect', cap: 'Done. Replies now show up in <b>Prospect</b>', note: 'Prospect shows Connected once the first message arrives', last: 1, enter: 'zoom', scr: () => prospect('and', 'android-messages.png'), acts: [['wait', 1.8]] }];
}

// ---------- look ----------
const CSS = `
#stage{position:fixed;left:0;top:0;width:720px;height:1280px;background:#0a0c0f;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#f2f4f7}
#stage *{box-sizing:border-box}
.prog{position:absolute;left:48px;right:48px;top:30px;display:flex;gap:5px}.prog i{flex:1;height:6px;border-radius:3px;background:#262c35;overflow:hidden;position:relative}.prog b{position:absolute;inset:0;background:#3b82f6;transform-origin:0 0}
.where{position:absolute;left:48px;top:58px;display:flex;align-items:center;gap:10px;font-size:21px;color:#a3acb9}.where b{color:#f2f4f7;font-weight:600}
.cap{position:absolute;left:48px;right:40px;top:108px;display:flex;gap:16px}.cap .n{flex:none;width:46px;height:46px;border-radius:50%;background:#3b82f6;color:#fff;font-weight:800;font-size:21px;display:flex;align-items:center;justify-content:center}
.cap .n.ok{background:#16a34a}.cap .tx{font-size:33px;line-height:1.24;font-weight:500;letter-spacing:-.3px}.cap .tx b{color:#93c0ff;font-weight:700}.cap .nt{font-size:20px;color:#a3acb9;margin-top:8px;line-height:1.3}
.phone{position:absolute;padding:9px;border-radius:66px;background:#000;box-shadow:0 0 0 2px #2c323b,0 30px 80px rgba(0,0,0,.6)}
.and-ph{border-radius:46px}.scrbox{position:relative;overflow:hidden;border-radius:57px;background:#000}.and-ph .scrbox{border-radius:38px}
.native{position:absolute;left:0;top:0;transform-origin:0 0}.lay{position:absolute;inset:0;overflow:hidden}
.fing{position:absolute;width:60px;height:60px;margin:-30px 0 0 -30px;border-radius:50%;background:rgba(255,255,255,.28);border:3px solid rgba(255,255,255,.95);box-shadow:0 6px 18px rgba(0,0,0,.45);z-index:20}
.rip{position:absolute;border-radius:50%;border:5px solid #ff9f0a;z-index:19}.hring{position:absolute;width:84px;height:84px;margin:-42px 0 0 -42px;z-index:19}
.icw{display:inline-flex;flex:none;vertical-align:middle}.icw>.aic{width:100%;height:100%}.aic{display:inline-flex;align-items:center;justify-content:center;border-radius:22%;overflow:hidden;flex:none;vertical-align:middle}.aic.round{border-radius:50%}.aic svg{width:60%;height:60%}.aic.full svg{width:100%;height:100%}
[data-t].pr{filter:brightness(.82)}
/* iPhone */
.ios{position:absolute;inset:0;background:#f2f2f7;color:#000;font-family:Inter,system-ui;font-size:17px;letter-spacing:-.3px;overflow:hidden}.ios.dark{background:#000;color:#fff}
.sbar{position:absolute;left:0;right:0;top:0;height:54px;display:flex;align-items:center;justify-content:space-between;padding:6px 26px 0 50px;font-weight:600;font-size:17px;z-index:60;color:#000}.sbar.dk{color:#fff}
.sbar .di{position:absolute;left:50%;top:11px;width:124px;height:36px;margin-left:-62px;border-radius:18px;background:#000}.sbar .ic{display:flex;gap:6px;align-items:center}
.hind{position:absolute;left:50%;bottom:8px;width:138px;height:5px;margin-left:-69px;border-radius:3px;background:#000;z-index:60}.ios.dark .hind{background:#fff}
.ios .body{position:absolute;left:0;right:0;top:54px;bottom:0}
.nav{height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;position:relative}.nav .tt{position:absolute;left:80px;right:80px;text-align:center;font-weight:600;font-size:17px}
.gb{min-width:44px;height:44px;border-radius:22px;background:rgba(255,255,255,.85);box-shadow:0 2px 10px rgba(0,0,0,.1),inset 0 0 0 .5px rgba(0,0,0,.1);display:flex;align-items:center;justify-content:center;color:#000;position:relative}
.gb.txt{padding:0 16px;font-weight:600}.gb.dim{color:#b0b0b5}.gb.blue{background:#0a84ff;color:#fff}.navr{display:flex;gap:10px}
.lt{font-size:34px;font-weight:700;padding:0 20px 12px;letter-spacing:.2px}
.grp{margin:0 16px 20px;background:#fff;border-radius:26px;overflow:hidden}.row{position:relative;min-height:52px;display:flex;align-items:center;gap:12px;padding:0 18px}
.row+.row::before{content:"";position:absolute;top:0;left:18px;right:0;height:.6px;background:#c6c6c8}.row .v{margin-left:auto;color:#8a8a8e;display:flex;gap:9px;align-items:center}.row .v svg{color:#c4c4c7}
.ico{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;flex:none}.ico svg{width:19px;height:19px}
.sh{font-size:15px;font-weight:600;color:#3c3c43;padding:2px 36px 8px}.chk{margin-left:auto;color:#0a84ff;display:flex}
.tog{width:64px;height:28px;border-radius:14px;background:#e9e9ea;position:relative;margin-left:auto}.tog::after{content:"";position:absolute;top:2px;left:2px;width:38px;height:24px;border-radius:12px;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2)}.tog.on{background:#34c759}.tog.on::after{left:24px}
.tabbar{position:absolute;left:18px;bottom:30px;height:64px;width:276px;border-radius:32px;background:rgba(255,255,255,.88);box-shadow:0 8px 28px rgba(0,0,0,.14),inset 0 0 0 .5px rgba(0,0,0,.08);display:flex;align-items:center;padding:4px;z-index:5}
.tabbar span{flex:1;height:56px;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:#1c1c1e;position:relative}.tabbar em{font-style:normal;font-size:10px;font-weight:600}
.tabbar span.on{background:rgba(0,0,0,.07);color:#0a84ff}.tsearch{position:absolute;right:18px;bottom:30px;width:64px;height:64px;border-radius:32px;background:rgba(255,255,255,.88);box-shadow:0 8px 28px rgba(0,0,0,.14);display:flex;align-items:center;justify-content:center;z-index:5}
.tiles{padding:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:12px}.tile{height:112px;border-radius:22px;padding:14px;color:#fff;display:flex;flex-direction:column;justify-content:space-between;font-size:16px}
.tile .tic svg{width:30px;height:30px}.tile.big{width:96px;height:96px;margin:0 auto;align-items:center;justify-content:center}.tile.big .tic svg{width:46px;height:46px}
.empty{position:absolute;left:30px;right:30px;top:260px;text-align:center;color:#6d6d72}.empty .eic svg{width:54px;height:54px;color:#0a84ff}.empty p{font-size:17px;margin:12px 0 22px}
.bigbtn,.widebtn{display:inline-flex;align-items:center;justify-content:center;height:50px;padding:0 26px;border-radius:25px;background:#0a84ff;color:#fff;font-weight:600;position:relative}
.widebtn{position:absolute;left:20px;right:20px;bottom:46px}.widebtn.up{bottom:330px}
.sheetbg{position:absolute;inset:0;z-index:10;background:rgba(0,0,0,calc(var(--e,1)*.28))}.sheet{z-index:11;position:absolute;left:0;right:0;top:8px;bottom:-54px;background:#f2f2f7;border-radius:38px 38px 0 0;transform:translateY(calc((1 - var(--e,1))*105%))}
.sheet.short{top:40px}.grab{width:36px;height:5px;border-radius:3px;background:#c7c7cc;margin:6px auto 0}
.srch{margin:4px 16px 14px;height:40px;border-radius:20px;background:rgba(118,118,128,.14);display:flex;align-items:center;gap:8px;padding:0 12px;color:#8a8a8e}
.clip{position:absolute;left:0;right:0;top:130px;bottom:0;overflow:hidden}.sheet .clip{top:120px}
.whenhd{display:flex;align-items:center;gap:12px;padding:6px 22px 18px;font-size:19px}
.tf{margin:20px 16px;height:48px;border-radius:14px;background:#fff;display:flex;align-items:center;padding:0 14px}.tf .ph{color:#b0b0b5}.tf .sp1{width:8px}
.caret{display:inline-block;width:2px;height:22px;background:#0a84ff;margin-left:1px}
.kb{position:absolute;left:0;right:0;bottom:54px;height:262px;background:#d1d4db;padding:9px 3px 0;border-radius:0}.kr{display:flex;justify-content:center;gap:6px;margin-bottom:11px}
.kr i{width:33px;height:44px;border-radius:7px;background:#fff;box-shadow:0 1px 0 rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:22px;color:#000}
.kr i.g{background:#acb2bc;width:42px;font-size:17px}.kr i.w{width:44px;font-size:15px}.kr i.w2{width:88px;font-size:15px}.kr i.sp{width:150px;font-size:16px}
.ios .kb::after{content:"";position:absolute;left:0;right:0;bottom:-54px;height:54px;background:#d1d4db}
.addcard{text-align:center;padding:60px 30px 0}.addcard h2{font-size:26px;margin:22px 0 10px}.addcard p{color:#6d6d72;font-size:16px;line-height:1.4;margin:0}
.q{padding:18px 22px 10px;font-size:17px;font-weight:600}.tf2{margin:0 16px;height:50px;border-radius:12px;background:#f2f2f7;display:flex;align-items:center;padding:0 14px;position:relative;font-size:15px}
.tf2 span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tf2.on{box-shadow:inset 0 0 0 2px #0a84ff}.tf2 .ph{color:#9a9aa0}.emenu{position:absolute;left:34px;top:116px;display:flex;background:#2c2c2e;border-radius:12px;overflow:hidden;color:#fff;font-size:15px;box-shadow:0 6px 20px rgba(0,0,0,.25);z-index:5}
.emenu span{padding:11px 16px;position:relative}.emenu span+span{border-left:1px solid #48484a}
.ialert{position:absolute;left:46px;right:46px;top:250px;z-index:12;background:rgba(242,242,247,.97);border-radius:30px;text-align:center;overflow:hidden;opacity:var(--e,1);transform:scale(calc(.94 + .06*var(--e,1)))}
.ialert b{display:block;padding:20px 18px 4px;font-size:16px;line-height:1.3;overflow-wrap:anywhere}.ialert p{margin:0;padding:0 18px 16px;font-size:13px;color:#3c3c43}
.ialert span{display:block;position:relative;padding:12px;border-top:.6px solid #c6c6c8;color:#0a84ff;font-size:17px}.ialert span:first-of-type{font-weight:600}
.two{display:flex;flex-direction:column;gap:2px}.two b{font-weight:500}.two em{font-style:normal;color:#8a8a8e;font-size:14px}
.shot{position:absolute;left:0;width:100%}.hit{position:absolute}
/* Android */
.and{position:absolute;inset:0;background:#fef7ff;color:#1d1b20;font-family:Roboto,sans-serif;font-size:16px;overflow:hidden}
.asb{position:absolute;left:0;right:0;top:0;height:40px;display:flex;align-items:center;justify-content:space-between;padding:0 22px 0 26px;font-size:14px;font-weight:500;z-index:60;color:#1d1b20}.asb.dk{color:#fff}
.asb .cam{position:absolute;left:50%;top:11px;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#000}.asb .ic{display:flex;gap:6px;align-items:center}
.gbar{position:absolute;left:50%;bottom:9px;width:108px;height:4px;margin-left:-54px;border-radius:2px;background:#1d1b20;z-index:60}.gbar.lt{background:#fff}
.abody{position:absolute;top:40px;left:0;right:0;bottom:0}
.atop{height:64px;display:flex;align-items:center;gap:6px;padding:0 16px;font-size:22px}.atop.big{height:96px;font-size:32px}.ib{width:48px;height:48px;border-radius:24px;display:flex;align-items:center;justify-content:center;position:relative}
.hero{margin:8px 16px 16px;background:#eaddff;border-radius:28px;padding:24px;color:#21005d}.hero .chip{display:inline-block;background:#65558f;color:#fff;border-radius:12px;padding:6px 14px;font-size:15px}
.hero h2{font-size:34px;margin:18px 0 6px}.hero p{margin:0;color:#4a4458}.stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 16px}.stats div{background:#fff;border-radius:24px;padding:20px}.stats b{font-size:32px;display:block}.stats span{color:#49454f}
.navbar{position:absolute;left:0;right:0;bottom:0;height:100px;background:#f3edf7;display:flex;padding:12px 0 28px;z-index:4}.navbar span{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:12px;font-weight:500;color:#49454f;position:relative}
.navbar .pill{width:64px;height:32px;border-radius:16px;display:flex;align-items:center;justify-content:center}.navbar span.on .pill{background:#e8def8}.navbar span.on{color:#1d1b20}
.and .clip{top:64px;bottom:0}.pad{padding:0 16px}.hl{font-size:24px;font-weight:400;margin:4px 0 4px}.sup{color:#49454f;font-size:14px;line-height:20px;margin:4px 0 14px}.sup.sm{font-size:12px;line-height:16px;margin:4px 16px 14px}
.sect{color:#65558f;font-size:14px;font-weight:500;margin:18px 0 12px}
.field{position:relative;border:1px solid #79747e;border-radius:4px;height:56px;display:flex;align-items:center;padding:0 16px;font-size:16px}.field label{position:absolute;left:12px;top:-9px;padding:0 4px;background:#fef7ff;font-size:12px;color:#49454f}
.field.focus{border:2px solid #65558f;padding:0 15px}.field.focus label{color:#65558f}.field .val{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.acaret{display:inline-block;width:2px;height:22px;background:#65558f}
.apaste{position:absolute;left:10px;top:-54px;display:flex;background:#fff;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.25);font-size:15px;z-index:6}.apaste span{padding:13px 16px;position:relative}
.swrow{display:flex;align-items:center;gap:12px;margin:6px 0}.swrow b{font-weight:500;font-size:14px}.swrow .sup.sm{margin:2px 0 0}
.fbtn{display:flex;height:52px;border-radius:26px;background:#65558f;color:#fff;align-items:center;justify-content:center;font-weight:500;font-size:15px;margin:20px 0 6px}
.obtn{display:flex;height:48px;border-radius:24px;border:1px solid #79747e;color:#65558f;align-items:center;justify-content:center;font-weight:500;font-size:15px;margin:10px 0;position:relative}
.snack{position:absolute;left:12px;right:12px;bottom:112px;background:#322f35;color:#f5eff7;border-radius:6px;padding:14px 16px;font-size:14px;z-index:7}
.m3sw{width:52px;height:32px;border-radius:16px;border:2px solid #79747e;background:#e6e0e9;position:relative;flex:none;margin-left:auto}.m3sw::after{content:"";position:absolute;left:6px;top:6px;width:16px;height:16px;border-radius:50%;background:#79747e}
.m3sw.on{background:#65558f;border-color:#65558f}.m3sw.on::after{left:22px;top:2px;width:24px;height:24px;background:#fff}.set .m3sw.on{background:#0b57d0;border-color:#0b57d0}
.m3card{background:#fff;border-radius:24px;padding:18px;margin:0 0 12px}.cardrow{display:flex;align-items:center;gap:14px}.cardrow b{font-weight:500;font-size:18px}.cic{width:48px;height:48px;border-radius:24px;background:#eaddff;display:flex;align-items:center;justify-content:center;font-style:normal;flex:none}
.m3card .sup.sm{margin:10px 0 6px}.lnk{color:#65558f;font-weight:500;font-size:15px;display:inline-block;padding:8px 0;position:relative}
.apphd{display:flex;justify-content:space-between;align-items:center;margin:16px 0 6px}.apphd b{font-weight:500;font-size:18px}
.approw{display:flex;align-items:center;gap:16px;height:64px;position:relative}.approw span:nth-child(2){flex:1}
.cbx{width:20px;height:20px;border-radius:3px;border:2px solid #49454f;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:14px;color:#fff;flex:none;margin-right:4px}.cbx.on{background:#65558f;border-color:#65558f}.set .cbx.on{background:#0b57d0;border-color:#0b57d0}
.dlgbg{position:absolute;inset:0;background:rgba(0,0,0,calc(var(--e,1)*.34));z-index:40}
.dlg{position:absolute;left:28px;right:28px;top:50%;transform:translateY(-50%) scale(calc(.92 + .08*var(--e,1)));opacity:var(--e,1);background:#ece6f0;border-radius:28px;padding:24px 24px 18px;z-index:41}
.dlg h3{margin:0 0 14px;font-size:22px;font-weight:400;line-height:28px}.dlg p{margin:0;font-size:14px;line-height:20px;color:#49454f}.acts{display:flex;justify-content:flex-end;gap:4px;margin-top:22px}
.tbtn{height:40px;padding:0 12px;border-radius:20px;display:inline-flex;align-items:center;font-size:14px;font-weight:500;color:#65558f;position:relative}
.dlg.inst{background:#f0f2f8}.dlg.inst .tbtn,.set .tbtn{color:#0b57d0}.ihd{display:flex;align-items:center;gap:12px;margin-bottom:16px}.ihd b{font-weight:500;font-size:18px}
.dlg.perm{text-align:center;padding:26px 0 8px}.pic{display:inline-flex;color:#0b57d0;font-style:normal}.pq{font-size:20px!important;line-height:28px!important;color:#1d1b20!important;margin:12px 24px 20px!important}
.pb{display:block;margin:2px 20px;height:48px;line-height:48px;border-radius:24px;color:#0b57d0;font-weight:500;font-size:15px;position:relative}.pb+.pb{margin-bottom:8px}
.cbar{height:64px;display:flex;align-items:center;gap:10px;padding:0 12px;border-bottom:1px solid #e0e0e0}.cbar .url{flex:1;height:44px;border-radius:22px;background:#edf2fa;display:flex;align-items:center;padding:0 16px;font-size:15px;color:#3c4043;white-space:nowrap;overflow:hidden}
.cbar .tabs{width:22px;height:22px;border:2px solid #444;border-radius:5px;font-size:12px;display:flex;align-items:center;justify-content:center}
.cpage{padding:24px}.ghline{height:16px;border-radius:8px;background:#eef0f3;margin-bottom:12px;width:80%}.ghline.s{width:55%}
.cmsg{position:absolute;left:12px;right:12px;bottom:28px;background:#fff;border-radius:16px;box-shadow:0 4px 18px rgba(0,0,0,.2);padding:14px 16px;display:flex;align-items:center;gap:12px;font-size:15px;transform:translateY(calc((1 - var(--e,1))*140%))}
.cmsg span{flex:1}.cmsg b{color:#0b57d0;font-weight:500;padding:8px 12px;border-radius:18px;position:relative}
.set{background:#f6f8fc}.stop{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 6px}.stitle{font-size:34px;padding:16px 24px 20px;line-height:40px}
.sapp{display:flex;align-items:center;gap:16px;padding:6px 24px 18px}.sapp b{display:block;font-weight:500;font-size:17px}.sapp span{color:#5f6368;font-size:14px}
.srow{min-height:72px;display:flex;align-items:center;gap:16px;padding:0 24px;position:relative;font-size:17px}.srow.big{background:#d3e3fd;margin:0 16px;border-radius:36px;padding:0 20px;font-weight:500}.srow.dim{opacity:.5;min-height:56px}
.snote{color:#5f6368;font-size:14px;line-height:20px;padding:16px 24px}.sect2{color:#0b57d0;font-size:14px;font-weight:500;padding:24px 24px 6px}
.ainfo{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 0 20px}.ainfo b{font-size:24px;font-weight:400}.ainfo span{color:#5f6368;font-size:14px}
.abtns{display:flex;justify-content:center;gap:28px;padding:0 0 18px}.abtns span{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:13px;color:#0b57d0;position:relative}.abtns i{width:56px;height:56px;border-radius:28px;border:1px solid #c4c7c5;display:flex;align-items:center;justify-content:center}
.amenu{position:absolute;right:10px;top:50px;background:#fff;border-radius:8px;box-shadow:0 6px 22px rgba(0,0,0,.22);padding:8px 0;z-index:8;width:250px}.amenu span{display:block;padding:14px 18px;font-size:15px;position:relative}
.bsheet{position:absolute;left:0;right:0;bottom:-40px;background:#f0f2f8;border-radius:28px 28px 0 0;padding:28px 24px 70px;text-align:center;z-index:41}.bsheet b{font-size:22px;font-weight:400}.bsheet p{color:#5f6368;font-size:14px}
.bsheet .fp{display:inline-flex;width:72px;height:72px;border-radius:36px;background:#d3e3fd;color:#0b57d0;align-items:center;justify-content:center;margin:14px 0;position:relative}
.wall{position:absolute;inset:-40px 0 0;background:radial-gradient(120% 70% at 30% 20%,#5b7bd6,#1d2b4f 70%)}.glance{position:absolute;left:28px;top:40px;color:#fff;font-size:26px}
.dock{position:absolute;left:24px;right:24px;bottom:120px;display:flex;justify-content:space-between}.gsearch{position:absolute;left:24px;right:24px;bottom:44px;height:56px;border-radius:28px;background:rgba(255,255,255,.9);display:flex;align-items:center;padding:0 20px;font-weight:700;color:#4285f4;font-size:22px}
.drawer{position:absolute;inset:0;background:#f3f1f8;padding:12px 16px}.dsearch{height:52px;border-radius:26px;background:#e7e3ee;display:flex;align-items:center;gap:10px;padding:0 18px;color:#49454f;margin-bottom:18px}
.dgrid{display:grid;grid-template-columns:repeat(4,1fr);row-gap:20px}.dapp{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative}.dapp em{font-style:normal;font-size:12px;color:#1d1b20}
.lpmenu{position:absolute;left:96px;top:396px;width:210px;background:#fff;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.25);padding:6px 0;z-index:8}.lpmenu span{display:flex;align-items:center;gap:12px;padding:12px 16px;font-size:15px;position:relative}
.akb{position:absolute;left:0;right:0;bottom:0;height:300px;background:#e9eef6;padding:6px 4px 30px;z-index:9}.akb .sug{height:40px;display:flex;align-items:center;gap:30px;padding:0 12px;color:#444}
.akb .kr{gap:5px;margin-bottom:9px}.akb .kr i{width:35px;height:46px;border-radius:6px;box-shadow:none;font-size:21px}.akb .kr i.g{background:#cfd6e4;width:44px;font-size:15px}.akb .kr i.sp{width:150px;font-size:13px;color:#555}.akb .kr i.ac{background:#c2e7ff}
`;

// ---------- engine ----------
const DUR = { tap: 1.15, key: .34, hold: 1.6, scroll: 1.6, swipe: 1.3 };
const COMMIT = { tap: .7, key: .26, hold: 1.3, swipe: 1.0 };
const ENTER = { push: .5, back: .5, zoom: .55, fade: .4, self: .45, none: 0 };
let SC, OS, NW, NH, K, OX, OY, starts, durs, total, plan, $ = {}, cur = { i: -1, n: -1 };
const txt = h => h.replace(/<[^>]+>/g, '');
function build(kind) {
  OS = kind === 'iphone' ? 'ios' : 'and'; NW = OS === 'ios' ? 393 : 412; NH = OS === 'ios' ? 852 : 915;
  K = 990 / NH; const w = NW * K, h = NH * K; OX = Math.round((720 - w) / 2); OY = 262 + 9;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  const d = document.createElement('div'); d.id = 'stage';
  d.innerHTML = `<div class="prog">${SC.filter(s => !s.last).map(() => '<i><b></b></i>').join('')}</div><div class="where"></div><div class="cap"></div>
    <div class="phone ${OS}-ph" style="left:${OX - 9}px;top:${OY - 9}px"><div class="scrbox" style="width:${w}px;height:${h}px"><div class="native" style="width:${NW}px;height:${NH}px;transform:scale(${K})">
    <div class="lay m" style="visibility:hidden"></div><div class="lay b"></div><div class="lay a"></div><div class="lay o" style="z-index:5;pointer-events:none"></div></div></div></div>
    <svg class="hring" viewBox="0 0 84 84"><circle cx="42" cy="42" r="38" fill="none" stroke="#ff9f0a" stroke-width="5" stroke-linecap="round" pathLength="100" stroke-dasharray="0 100" transform="rotate(-90 42 42)"/></svg><div class="rip"></div><div class="fing"></div>`;
  document.body.appendChild(d);
  for (const k of ['where', 'cap', 'fing', 'rip', 'hring']) $[k] = d.querySelector('.' + k);
  $.A = d.querySelector('.lay.a'); $.B = d.querySelector('.lay.b'); $.M = d.querySelector('.lay.m'); $.O = d.querySelector('.lay.o'); $.bars = [...d.querySelectorAll('.prog b')];
}
function put(L, s, n, y) { L.innerHTML = s.scr(n); const sc = L.querySelector('.scr'); if (sc) sc.style.transform = `translateY(${-y}px)`; }
function centre(L, k) { const e = L.querySelector(`[data-t="${k}"]`); if (!e) throw new Error('no target ' + k); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
const nat = (x, y) => ({ x: OX + x * K, y: OY + y * K });
// work out every finger move once
function makePlan() {
  plan = []; starts = []; durs = []; let t = 0;
  SC.forEach((s, i) => {
    const e = i === 0 ? 0 : ENTER[s.enter || 'none'], read = Math.min(2.3, Math.max(1.0, txt(s.cap).length * .03)) + (i === 0 ? .6 : 0);
    let u = e + read, n = 0, y = 0; const steps = [];
    for (const [type, a, b] of s.acts) {
      if (type === 'wait') { steps.push({ type, t0: u, d: a }); u += a; continue; }
      const st = { type, t0: u, d: DUR[type], n0: n, y0: y };
      if (type === 'scroll') {
        put($.M, s, n, y); const c = $.M.querySelector('.clip').getBoundingClientRect();
        st.from = { x: c.left + c.width * .55, y: c.top + c.height * .78 }; st.to = { x: st.from.x, y: st.from.y - a * K }; st.dy = a; y += a;
      } else if (type === 'swipe') { st.from = nat(...a); st.to = nat(...b); n++; }
      else { put($.M, s, n, y); st.at = centre($.M, a); st.k = a; n++; }
      st.n1 = n; st.y1 = y; steps.push(st); u += st.d;
    }
    const d = u + (s.last ? .4 : .75); plan.push({ steps, nEnd: n, yEnd: y, e }); starts.push(t); durs.push(d); t += d;
  });
  total = t;
}
function capSet(i) {
  const s = SC[i], [nm, ic] = WHERE[s.w];
  $.where.innerHTML = `${icon(ic, 34)}<span>You're in <b>${nm}</b></span>`;
  $.cap.innerHTML = `<span class="n${s.last ? ' ok' : ''}">${s.last ? '✓' : i + 1}</span><div><div class="tx">${s.cap}</div>${s.note ? `<div class="nt">${s.note}</div>` : ''}</div>`;
  const tx = $.cap.querySelector('.tx'); let f = 33; while ($.cap.getBoundingClientRect().height > 148 && f > 24) { f -= 1; tx.style.fontSize = f + 'px'; }
}
let fingPrev = { x: 600, y: 1360 };
function frame(t) {
  let i = 0; while (i < SC.length - 1 && t >= starts[i + 1]) i++;
  const s = SC[i], P = plan[i], u = t - starts[i];
  // state and scroll so far
  let n = 0, y = 0, fx = null, press = 0, rip = -1, ring = -1, tgt = null, dragging = false;
  const prevEnd = i ? (plan[i - 1].steps.filter(z => z.at || z.to).slice(-1)[0] || null) : null;
  let pos = prevEnd ? (prevEnd.to || prevEnd.at) : { x: 600, y: 1360 };
  for (const st of P.steps) {
    if (st.type === 'wait') continue;
    const v = u - st.t0;
    if (v < 0) break;
    const from = pos, goal = st.at || st.from;
    if (st.type === 'scroll' || st.type === 'swipe') {
      const m = ease(cl(v / .45)), dr = cl((v - .5) / (st.type === 'scroll' ? .85 : .5)), de = ease(dr);
      pos = v < .5 ? { x: from.x + (goal.x - from.x) * m, y: from.y + (goal.y - from.y) * m } : { x: st.from.x + (st.to.x - st.from.x) * de, y: st.from.y + (st.to.y - st.from.y) * de };
      dragging = v >= .45 && dr < 1; press = dragging ? 1 : 0;
      if (st.type === 'scroll') y = st.y0 + st.dy * de; else n = v >= COMMIT.swipe ? st.n1 : st.n0;
      if (st.type === 'scroll' && dr >= 1) y = st.y1;
    } else {
      const mv = st.type === 'key' ? .2 : .55, m = ease(cl(v / mv));
      pos = { x: from.x + (goal.x - from.x) * m, y: from.y + (goal.y - from.y) * m };
      const c = COMMIT[st.type];
      if (st.type === 'hold') { const h = cl((v - .6) / .7); if (v >= .6 && v < 1.45) { press = 1; ring = h; tgt = st.k; } }
      else { const pv = v - (c - .08); if (pv >= 0 && pv < .2) { press = Math.sin(pv / .2 * Math.PI); tgt = st.k; } }
      if (v >= c) { n = st.n1; const rv = v - c; if (rv < .5) rip = rv / .5; }
      else n = st.n0;
    }
  }
  if (cur.i !== i) { capSet(i);
    if (i > 0) { const pp = plan[i - 1]; put($.B, SC[i - 1], pp.nEnd, pp.yEnd); }
    cur = { i, n: -1, y: -1 }; }
  if (cur.n !== n) { put($.A, s, n, y); cur.n = n; cur.y = y; }
  else if (cur.y !== y) { const sc = $.A.querySelector('.scr'); if (sc) sc.style.transform = `translateY(${-y}px)`; cur.y = y; }
  $.A.querySelectorAll('.pr').forEach(e => e.classList.remove('pr')); if (tgt) $.A.querySelector(`[data-t="${tgt}"]`)?.classList.add('pr');
  // moving between screens
  const en = i === 0 ? 'none' : (s.enter || 'none'), p = P.e ? ease(cl(u / P.e)) : 1, A = $.A.style, B = $.B.style;
  A.transform = ''; A.opacity = 1; A.zIndex = 2; B.transform = ''; B.opacity = 1; B.zIndex = 1; B.display = p < 1 && en !== 'self' && en !== 'none' ? 'block' : 'none'; B.filter = '';
  $.A.style.setProperty('--e', en === 'self' ? p : 1);
  if (p < 1) {
    if (en === 'push') { A.transform = `translateX(${(1 - p) * 100}%)`; B.transform = `translateX(${-30 * p}%)`; B.filter = `brightness(${1 - .15 * p})`; }
    else if (en === 'back') { A.zIndex = 1; B.zIndex = 2; A.transform = `translateX(${-30 * (1 - p)}%)`; B.transform = `translateX(${100 * p}%)`; }
    else if (en === 'zoom') { A.transform = `scale(${.55 + .45 * p})`; A.opacity = p; }
    else if (en === 'fade') A.opacity = p;
  }
  // the status bar stays put while screens slide underneath, like on the phone
  const sbA = $.A.querySelector('.sbar,.asb'), sbB = $.B.querySelector('.sbar,.asb'), slide = p < 1 && (en === 'push' || en === 'back');
  if (sbA) sbA.style.visibility = slide ? 'hidden' : ''; if (sbB) sbB.style.visibility = slide ? 'hidden' : '';
  const top = slide && sbA ? `<div class="${OS}" style="background:none">${sbA.outerHTML.replace('visibility: hidden;', '')}</div>` : '';
  if ($.O.dataset.h !== top) { $.O.innerHTML = top; $.O.dataset.h = top; }
  // the progress, the finger
  const steps = SC.length - 1; $.bars.forEach((b, j) => b.style.transform = `scaleX(${j < i ? 1 : j === i ? cl(u / durs[i]) : 0})`);
  const idle = !P.steps.some(z => z.at || z.from), prevIdle = i > 0 && !plan[i - 1].steps.some(z => z.at || z.from);
  const lastFade = idle ? 1 - cl(u / .4) : prevIdle ? cl(u / .3) : 1;
  Object.assign($.fing.style, { left: pos.x + 'px', top: pos.y + 'px', transform: `scale(${1 - .18 * press})`, opacity: lastFade });
  if (rip >= 0) { const r = 18 + 60 * rip; Object.assign($.rip.style, { left: pos.x - r + 'px', top: pos.y - r + 'px', width: 2 * r + 'px', height: 2 * r + 'px', opacity: (1 - rip).toFixed(2) }); } else $.rip.style.opacity = 0;
  if (ring >= 0) { Object.assign($.hring.style, { left: pos.x + 'px', top: pos.y + 'px', opacity: 1 }); $.hring.querySelector('circle').setAttribute('stroke-dasharray', `${(ring * 100).toFixed(1)} 100`); } else $.hring.style.opacity = 0;
}
window.FILM2 = { plan: () => plan.map((p, i) => ({ i, start: starts[i], dur: durs[i], steps: p.steps.map(z => [z.type, +(starts[i] + z.t0).toFixed(2)]) })),
  init(kind, pos) { SC = scenes(kind, pos); build(kind); makePlan();
    const startIdx = SC.findIndex(s => s.start);
    return { total, starts, durs, autoStart: startIdx >= 0 ? starts[startIdx] : null, autoIdx: startIdx,
      // one still per step: the finger on the first thing to tap
      stills: plan.map((p, i) => { const f = p.steps.find(z => z.at || z.from); return starts[i] + (f ? f.t0 + (f.type === 'key' ? .2 : .58) : Math.min(durs[i] - .2, 1.6)); }) }; },
  frame };
})();
