// ---------- Messages: one inbox for iMessage and texts, built to be checked a few times a day, not watched ----------
// Group chats only count when something is for Marlowe (tagged, her name, a reply to her, @all, her words).
// New messages are held back until the next delivery time she picks in Settings (every hour, three set times, or live).
// Focus sessions hide every alert while messages keep arriving quietly underneath.
// Live messages come from BlueBubbles running on her Mac (free). The Mac posts each new message to the inbox function on the
// server, the app reads from there, sends through there, and texts with a lead count as contact that day but stay out of the lead's notes (24 Nov).
// Settings and Mark done are kept on the server so the phone and laptop match. #demo shows example chats.

const MS15_KEY = 'dp_msgset';
const MS15_DEF = { deliver: 'three', times: ['09:00', '12:30', '16:00'], urgent: true, focusLen: 60, autoFocus: true, focusUrgent: true,
  rules: { tag: true, name: true, reply: true, all: true, words: false }, names: ['Marlowe', 'Marl'], words: ['appraisal', 'listing', 'urgent'],
  groups: {} };
// the Mac password used to be kept in the browser; it now lives on the server only
try { const o = JSON.parse(localStorage.getItem('dp_msgset') || '{}'); if (o.bbPass || o.bbUrl){ delete o.bbPass; delete o.bbUrl; localStorage.setItem('dp_msgset', JSON.stringify(o)); } } catch {}
function ms15(){ let o = {}; try { o = JSON.parse(localStorage.getItem(MS15_KEY) || '{}'); } catch {} return Object.assign({}, MS15_DEF, o, { rules: Object.assign({}, MS15_DEF.rules, o.rules || {}) }); }
function ms15Save(patch){ const o = Object.assign(ms15(), patch); delete o.bbUrl; delete o.bbPass; try { localStorage.setItem(MS15_KEY, JSON.stringify(o)); } catch {}
  if (!DEMO) ib15('prefs', { prefs: o }).catch(() => {}); return o; }
const INBOX15 = API.replace(/\/api$/, '/inbox');
async function ib15(action, body){ const r = await fetch(INBOX15, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-session': S.token || '' }, body: JSON.stringify(Object.assign({ action }, body || {})) });
  const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || 'Messages had a problem'); return j; }
function ls15(k, v){ try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, String(v)); } catch {} return null; }

// ---------- delivery times and focus ----------
const hm15 = s => { const [h, m] = String(s).split(':').map(Number); return h * 60 + (m || 0); };
function slots15(){ const s = ms15(); if (s.deliver === 'hourly') return Array.from({ length: 11 }, (_, i) => String(8 + i).padStart(2, '0') + ':00'); return (s.times || []).slice().sort((a, b) => hm15(a) - hm15(b)); }
// the last delivery time that has passed (as a timestamp)
function lastSlot15(now = new Date()){
  const s = ms15(); if (s.deliver === 'live') return now.getTime();
  const mins = now.getHours() * 60 + now.getMinutes(), sl = slots15(); let t = null;
  sl.forEach(x => { if (hm15(x) <= mins) t = x; });
  const d = new Date(now); if (t == null){ d.setDate(d.getDate() - 1); t = sl[sl.length - 1] || '00:00'; }
  d.setHours(Math.floor(hm15(t) / 60), hm15(t) % 60, 0, 0);
  return Math.max(d.getTime(), +(ls15('dp_deliv') || 0));
}
function nextSlot15(now = new Date()){ const s = ms15(); if (s.deliver === 'live') return null; const mins = now.getHours() * 60 + now.getMinutes();
  const n = slots15().find(x => hm15(x) > mins); return n ? t15(n) : (slots15()[0] ? 'tomorrow ' + t15(slots15()[0]) : null); }
const t15 = v => { const m = hm15(v), h = Math.floor(m / 60), mm = m % 60; return `${h % 12 || 12}${mm ? ':' + String(mm).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`; };
function focus15(){ const u = +(ls15('dp_focus') || 0); if (u && u < Date.now()){ ls15('dp_focus', 0); return 0; } return u; }
function focusStart15(mins){ const m = mins || ms15().focusLen; ls15('dp_focus', m === 'end' || m >= 9999 ? Date.now() + 864e5 : Date.now() + m * 60e3); }
function focusEnd15(){ ls15('dp_focus', 0); }
const clock15 = ms => { const d = new Date(ms), t = t15(`${d.getHours()}:${d.getMinutes()}`), n = new Date(), days = Math.round((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5);
  return days <= 0 ? t : days === 1 ? 'Yesterday ' + t : days < 7 ? d.toLocaleDateString('en-AU', { weekday: 'short' }) + ' ' + t : d.getDate() + ' ' + d.toLocaleDateString('en-AU', { month: 'short' }) + ' ' + t; };

// ---------- who a message is for ----------
function forMe15(m, th){
  if (m.mine || th.kind === 'auto') return false; if (!th.group) return true;
  const s = ms15(), mode = s.groups[th.id] || 'needs'; if (mode === 'never') return false; if (mode === 'every') return true;
  const t = (m.text || '').toLowerCase(), names = (s.names || []).map(n => n.toLowerCase()).filter(Boolean);
  const tagged = names.some(n => t.includes('@' + n));
  if (s.rules.tag && tagged) return 'Tagged you';
  if (s.rules.name && !tagged && names.some(n => new RegExp('\\b' + n.replace(/[^a-z]/g, '') + '\\b').test(t))) return 'Your name is in it';
  if (s.rules.reply && m.replyMine) return 'Replied to you';
  if (s.rules.all && /@(all|everyone)\b/.test(t)) return 'Message to everyone';
  if (s.rules.words && (s.words || []).some(w => w && t.includes(w.toLowerCase()))) return 'Has one of your words';
  return false;
}
const urgent15 = (m, th) => !th.group && th.lead && /cancel|reschedul|can't make|cant make|running late/i.test(m.text || '');
// held back until the next delivery, unless urgent and allowed through
function shown15(m, th){ if (m.mine || m.at <= lastSlot15()) return true; const s = ms15(); return s.urgent && urgent15(m, th) && (!focus15() || s.focusUrgent); }

// ---------- data ----------
function demo15(){ const d = new Date(), at = (h, m, back = 0) => { const x = new Date(d); x.setDate(x.getDate() - back); x.setHours(h, m, 0, 0); return x.getTime(); };
  const msg = (who, text, a, o) => Object.assign({ who, text, at: a, mine: who === 'me' }, o || {});
  return [
    { id: 'g1', group: true, name: 'Dignam sales team', members: '9 people', msgs: [
      msg('Kate', 'Morning all, coffee run at 8:30 if anyone wants one', at(8, 2)), msg('Sam', 'Flat white please', at(8, 5)), msg('Josh', 'Same for me', at(8, 11)),
      msg('Priya', 'Who has the keys for the Sample Ave open home?', at(8, 40)), msg('Kate', 'On the hook in the back office', at(8, 41)),
      msg('Josh', '@Marlowe any new appraisals booked from the weekend calls?', at(9, 15)), msg('Sam', 'Nice result on Demo Rd everyone', at(9, 20)),
      msg('me', 'Two so far! Who can take an appraisal Thu at 4pm at 12 Example St?', at(9, 58)),
      msg('Kate', 'Yes, I can take the Sarah Kim appraisal Thursday', at(10, 4), { replyMine: 'Who can take an appraisal Thu at 4pm' }), msg('Josh', 'Good stuff', at(10, 6))] },
    { id: 'g2', group: true, name: 'Bulli office', members: '14 people', msgs: [
      msg('Priya', 'Bins go out tonight, whoever is last out', at(7, 48)), msg('Sam', 'Printer is fixed', at(8, 30)), msg('Priya', '@all Office closes at 3pm on Friday for the Christmas party', at(9, 5))] },
    { id: 'g3', group: true, name: 'Open homes roster', members: '6 people', msgs: [
      msg('Sam', 'Can anyone swap Saturday 11am?', at(7, 12)), msg('Priya', 'I can', at(7, 20)), msg('Kate', 'Updated the roster sheet', at(7, 30))] },
    { id: 'p1', name: 'Josh', kind: 'agent', via: 'iMessage', msgs: [msg('Josh', 'Thanks for Friday’s leads, both picked up', at(16, 10, 3)), msg('Josh', 'Morning! Can you send me the Hart lead before 11?', at(9, 50))] },
    { id: 'p2', name: 'Kate', kind: 'agent', via: 'iMessage', msgs: [msg('me', 'Sarah Kim is booked Thu 4pm', at(15, 25, 3)), msg('Kate', 'Perfect, thank you', at(15, 31, 3))], read: true },
    { id: 'p3', name: 'Sarah Kim', kind: 'lead', via: 'iMessage', lead: { name: 'Sarah Kim', address: '12 Example St, Fairy Meadow', stage: 'Appraisal booked', next: 'Thu, 4pm with Kate', phone: '0491 570 156', ok: 'Yes, on the call Fri' },
      msgs: [msg('me', 'Hi Sarah, lovely chatting today. Your appraisal is locked in for Thursday at 4pm. Kate from Dignam will see you then. Marlowe', at(15, 20, 3)), msg('Sarah Kim', 'Hi Marlowe, is Thursday at 4 still ok? I might be 10 minutes late home from work.', at(9, 42))] },
    { id: 'p4', name: 'Pat Nguyen', kind: 'lead', via: 'SMS', lead: { name: 'Pat Nguyen', address: '7 Sample Ave, Bulli', stage: 'Call back', next: 'Call early February', phone: '0491 570 157', ok: 'Yes, on the call today' },
      msgs: [msg('Pat Nguyen', 'Thanks Marlowe, not selling until after Christmas. Try me in Feb.', at(8, 55))] },
    { id: 'p5', name: 'Tom Reid', kind: 'lead', via: 'SMS', lead: { name: 'Tom Reid', address: '9 Demo Rd, Thirroul', stage: 'Appraisal booked', next: 'Tomorrow, 2pm with Kate', phone: '0491 570 158', ok: 'Yes, on the call' },
      msgs: [msg('Tom Reid', 'Hi Marlowe, can we reschedule tomorrow? Something came up', Date.now() - 6e5)] }
  ]; }
const digits15 = p => String(p || '').replace(/\D/g, '').replace(/^61/, '0');
function leadFor15(id){ const l = (S.leads || []).find(x => x.id === id); if (!l) return null;
  return { id: l.id, name: l.name || '', address: [l.address, l.suburb].filter(Boolean).join(', '), stage: l.status || 'Lead', next: l.next_action || (l.follow_up ? 'Follow up ' + dayMon(l.follow_up) : ''), phone: l.phone || '' }; }
const nice15 = a => { const d = digits15(a); return /^04\d{8}$/.test(d) ? d.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3') : a; };
// a name for a phone number: a lead, or someone in today's list, else the number
const key15 = a => { const t = String(a || '').trim(); return t.includes('@') ? t.toLowerCase() : digits15(t); };
// verification codes, bank alerts and marketing come from short numbers or names, never a real phone
const auto15 = a => { const t = String(a || '').trim(); if (!t || t.includes('@')) return false; const d = digits15(t); return /[a-z]/i.test(t) || d.length < 8; };
function who15(addr){ const nm = S.ib?.srv?.names?.[key15(addr)]; if (nm) return nm; const d = digits15(addr); if (!d) return addr || 'Someone';
  const l = (S.leads || []).find(x => digits15(x.phone) === d); if (l) return l.name;
  const r = (S.rows || []).find(x => digits15(x.phone) === d); if (r && r.owner_name) return people(r.owner_name)[0] || r.owner_name; return nice15(addr); }
async function live15(){ if (!S.leads) await loadLeads().catch(() => {});
  const d = await ib15('load'); S.ib.srv = d;
  if (!d.connected) return null;
  if (d.prefs && Object.keys(d.prefs).length) try { localStorage.setItem(MS15_KEY, JSON.stringify(d.prefs)); } catch {}
  S.ib.done = Object.assign({}, d.done || {});
  if (d.quiet && (!d.synced_at || Date.now() - Date.parse(d.synced_at) > 10 * 60e3)) ib15('sync').then(r => { if (r && !r.skipped && S.tab === 'messages'){ S.ib.at = 0; view15(); } }).catch(() => {});
  const by = {}; (d.msgs || []).forEach(m => (by[m.chat_guid] = by[m.chat_guid] || []).push(m));
  return (d.chats || []).filter(c => by[c.guid]?.length).map(c => { const mine = new Set(by[c.guid].filter(m => m.from_me).map(m => m.guid)), mem = c.members || [];
    const lead = c.lead_id ? leadFor15(c.lead_id) : null;
    const name = c.name || (lead && lead.name) || (c.is_group ? mem.map(a => who15(a).split(' ')[0]).join(', ') : who15(mem[0]));
    return { id: c.guid, group: c.is_group, name, members: c.is_group ? (mem.length + 1) + ' people' : '', kind: c.is_group ? '' : (lead ? 'lead' : auto15(mem[0]) ? 'auto' : 'person'), lead, via: c.service || 'iMessage',
      msgs: by[c.guid].slice().reverse().map(m => ({ who: m.from_me ? 'me' : (c.is_group ? who15(m.handle) : name), mine: m.from_me, text: m.body || '', at: Date.parse(m.at), replyMine: m.reply_to && mine.has(m.reply_to) ? 'your message' : '' })) }; });
}
async function load15(force){ S.ib = S.ib || { view: 'needs', sel: null, all: false, open: { c: true }, draft: '', done: DEMO ? JSON.parse(ls15('dp_ibdone') || '{}') : {} };
  if (!force && S.ib.th && Date.now() - S.ib.at < 60e3) return S.ib.th;
  if (DEMO) S.ib.th = S.ib.th || demo15(); else S.ib.th = await live15();
  S.ib.at = Date.now(); return S.ib.th; }

// ---------- working out what shows ----------
function info15(th){ const seen = +(S.ib.done[th.id] || 0);
  const vis = th.msgs.filter(m => shown15(m, th));
  const waiting = th.msgs.filter(m => !m.mine && !shown15(m, th)).length;
  const lastMine = Math.max(0, ...th.msgs.filter(m => m.mine).map(m => m.at));
  const forMe = vis.filter(m => m.at > Math.max(seen, th.group ? 0 : lastMine) && forMe15(m, th));
  const hidden = th.group ? vis.filter(m => !m.mine && !forMe15(m, th)).length : 0;
  return { vis, waiting, forMe, hidden, badge: th.read ? 0 : forMe.length }; }

// ---------- the page ----------
const IC15 = { at: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8', moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0', grp: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6',
  mute: 'M8.7 3.6A6 6 0 0 1 18 8c0 3 .6 5 1.3 6.5M17 17H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0M2 2l20 20' };
const i15 = (n, s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC15[n]}"/></svg>`;
const ini15 = n => String(n || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
const MODES15 = { needs: 'Only when it needs me', every: 'Every message', never: 'Never' };

(function css15(){ if (document.getElementById('css15')) return; const st = document.createElement('style'); st.id = 'css15'; st.textContent = `
.ib15{display:grid;grid-template-columns:260px minmax(0,1fr) auto;height:calc(100vh - 120px);min-height:520px;margin:calc(var(--px)*-1);margin-top:0;border-top:1px solid var(--line2)}
.ib15.noside{grid-template-columns:260px minmax(0,1fr)}
.ib15 .il{background:var(--panel);border-right:1px solid var(--line2);overflow-y:auto;padding:12px 8px 24px}
.ib15 .ic{display:flex;flex-direction:column;min-width:0;background:var(--base)}
.ib15 .ip{width:280px;background:var(--panel);border-left:1px solid var(--line2);overflow-y:auto;padding:22px 20px}
.ib15 .dbox{margin:0 4px 10px;padding:10px 12px;border-radius:8px;background:#1c2129;border:1px solid var(--line2);display:flex;flex-direction:column;gap:6px}
.ib15 .dbox.fo{background:#162544;border-color:var(--acc)}
.ib15 .dbox b{font-size:13px;line-height:18px}.ib15 .dbox span{font-size:12px;line-height:16px;color:var(--t2)}
.ib15 .dbox div{display:flex;gap:10px;align-items:center}
.ib15 .sm{height:30px;padding:0 10px;border-radius:6px;border:1px solid #636d7e;background:transparent;color:var(--t1);font-size:12px;font-weight:600;cursor:pointer}
.ib15 .ln{font-size:12px;font-weight:600;color:var(--accT);background:none;border:0;padding:0;cursor:pointer}
.ib15 .rw{width:100%;display:flex;align-items:center;gap:10px;min-height:34px;padding:0 10px;border:0;border-radius:6px;background:transparent;color:var(--t2);font-size:14px;text-align:left;cursor:pointer}
.ib15 .rw:hover{background:var(--sub)}.ib15 .rw.on{background:#162544;color:var(--t1)}.ib15 .rw.b{color:var(--t1);font-weight:700}.ib15 .rw.mu{color:var(--t3)}
.ib15 .rw .nm{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ib15 .av{flex:0 0 20px;height:20px;border-radius:5px;background:#323a46;color:#fff;font-size:10px;line-height:20px;font-weight:600;text-align:center}
.ib15 .av.ag{background:#1d4ed8}.ib15 .av.big{flex-basis:36px;height:36px;border-radius:8px;font-size:13px;line-height:36px}
.ib15 .bd{min-width:20px;height:20px;padding:0 6px;box-sizing:border-box;border-radius:999px;background:var(--acc);color:#fff;font-size:12px;line-height:20px;font-weight:600;text-align:center}
.ib15 .sec{margin-top:14px}.ib15 .sec>button{display:flex;align-items:center;gap:6px;height:28px;padding:0 6px;border:0;background:none;color:var(--t2);font-size:13px;font-weight:600;cursor:pointer}
.ib15 .hd{padding:12px 24px;border-bottom:1px solid var(--line2);background:var(--panel);display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}
.ib15 .hd h2{margin:0;font-size:20px;line-height:26px}.ib15 .hd p{margin:2px 0 0;font-size:13px;color:var(--t2)}
.ib15 .seg{display:flex;background:#272d37;border-radius:8px;padding:3px}.ib15 .seg button{height:30px;padding:0 12px;border:0;border-radius:6px;background:none;color:var(--t2);font-size:13px;font-weight:600;cursor:pointer}
.ib15 .seg button.on{background:var(--panel);color:var(--t1)}
.ib15 .ob{height:36px;padding:0 12px;border-radius:8px;border:1px solid #636d7e;background:none;color:var(--t1);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px}
.ib15 .ms{flex:1;overflow-y:auto;padding:14px 0}
.ib15 .m{display:flex;gap:12px;padding:8px 24px}.ib15 .m.me4{background:#162544}
.ib15 .m .who{font-weight:700}.ib15 .m .tm{font-size:12px;color:var(--t3);margin-left:8px}.ib15 .m .tg{font-size:12px;font-weight:600;color:var(--accT);margin-left:8px}
.ib15 .m .tx{margin-top:2px;white-space:pre-wrap;overflow-wrap:anywhere}.ib15 .m .rp{font-size:12px;color:var(--t3)}
.ib15 .men{background:var(--acc);color:#fff;font-weight:600;padding:0 3px;border-radius:4px}
.ib15 .fold{display:flex;align-items:center;gap:12px;padding:6px 24px}.ib15 .fold i{flex:1;height:1px;background:#363e4b}
.ib15 .fold button{height:30px;padding:0 12px;border-radius:8px;border:1px solid #363e4b;background:var(--panel);color:var(--t2);font-size:13px;cursor:pointer}
.ib15 .note{margin:0 auto 8px;max-width:480px;padding:0 24px;font-size:13px;color:var(--t2);text-align:center}
.ib15 .cp{position:relative;padding:4px 24px 18px}.ib15 .box{border:1px solid #636d7e;border-radius:12px;background:#1c2129}
.ib15 .box textarea{display:block;width:100%;box-sizing:border-box;resize:none;padding:12px 14px;border:0;background:transparent;color:var(--t1);font:inherit;min-height:66px;outline:none}
.ib15 .cb15{display:flex;gap:10px;align-items:center;justify-content:space-between;padding:6px 8px 6px 10px;border-top:1px solid var(--line2)}
.ib15 .cb15 span{font-size:12px;color:var(--t3)}
.ib15 .menu{position:absolute;left:24px;right:24px;bottom:100%;margin-bottom:4px;padding:8px;border-radius:12px;background:#1c2129;border:1px solid #363e4b;box-shadow:0 8px 24px rgba(0,0,0,.45);max-height:260px;overflow-y:auto}
.ib15 .menu button{display:block;width:100%;padding:8px;border:0;border-radius:6px;background:none;color:var(--t1);text-align:left;cursor:pointer}.ib15 .menu button:hover{background:var(--sub)}
.ib15 .menu small{display:block;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ib15 .act{width:100%;display:flex;gap:12px;align-items:flex-start;padding:14px 16px;margin-bottom:8px;border-radius:12px;border:1px solid var(--line2);background:#1c2129;color:var(--t1);text-align:left;cursor:pointer}
.ib15 .act .k{font-size:12px;font-weight:600;color:var(--accT)}.ib15 .act .w{font-size:12px;color:var(--t3);margin-left:8px}
.ib15 .act .x{display:block;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ib15 .quiet{margin-top:8px;padding:14px 16px;border-radius:12px;border:1px dashed #636d7e;display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center}
.ib15 dl{margin:0;display:flex;flex-direction:column;gap:14px}.ib15 dt{font-size:12px;font-weight:600;color:var(--t3)}.ib15 dd{margin:2px 0 0}
.ib15 .empty15{max-width:520px;margin:48px auto;padding:0 24px;color:var(--t2)}
.ib15 .empty15 h2{color:var(--t1);font-size:20px;margin:0 0 8px}.ib15 .empty15 ol{padding-left:20px;line-height:22px}
@media (max-width:899px){.ib15,.ib15.noside{grid-template-columns:1fr;height:auto;margin:0}.ib15 .il,.ib15 .ic,.ib15 .ip{width:auto;border:0}
 .ib15.chat .il{display:none}.ib15:not(.chat) .ic,.ib15:not(.chat) .ip{display:none}.ib15 .ms{min-height:50vh}}
`; document.head.appendChild(st); })();

function parts15(t){ return esc(t).replace(/@(\w+)/g, (x, n) => (/^(all|everyone)$/i.test(n) || (ms15().names || []).some(k => k.toLowerCase() === n.toLowerCase())) ? `<span class="men">${x}</span>` : x); }

async function view15(){
  const m = $('#main'); if (!m) return;
  let th; try { th = await load15(); } catch (e) { th = undefined; S.ib.err = e.message; }
  m.className = 'v2main old'; m.style.padding = '';
  if (!th){ m.innerHTML = `<div class="ib15" style="display:block"><div class="empty15">${S.ib.err ? `<h2>Messages couldn’t load</h2><p>${esc(S.ib.err)}</p><button class="b2 pri" onclick="S.ib.th=null;S.ib.err='';render()">Try again</button> <button class="b2" onclick="set15Mac()">Check the connection</button>` :
    `<h2>Connect your Mac to see your messages here</h2><p>Prospect reads and sends your iMessages and texts through your own Mac, for free. It takes about 15 minutes, once.</p>
     <ol><li>On your Mac, install BlueBubbles from bluebubbles.app and sign in with your Apple ID.</li><li>On your iPhone, open Settings, Apps, Messages, Text Message Forwarding, and turn on your Mac. That lets texts to Android phones go through too.</li>
     <li>In BlueBubbles, set a password and turn on the free Cloudflare link. Copy the address it shows. If the address changes after a restart, Prospect follows it by itself.</li><li>Set your Mac to never sleep (System Settings, Energy).</li><li>Paste the address and password into Prospect. You only do this once, it works on every device after that.</li></ol>
     <button class="b2 pri" onclick="set15Mac()">Paste the address</button> <button class="b2" onclick="S.msgOld=1;go('messages')">Scheduled texts</button>`}</div></div>`; return; }
  const ib = S.ib, f = focus15(), s = ms15();
  const all = th.map(t => Object.assign({ t }, info15(t)));
  const byId = Object.fromEntries(all.map(x => [x.t.id, x]));
  const waiting = all.reduce((n, x) => n + x.waiting, 0);
  const acts = []; all.forEach(x => !x.t.read && x.forMe.forEach(mm => acts.push({ th: x.t, m: mm, why: x.t.group ? forMe15(mm, x.t) : (x.t.via === 'SMS' ? 'Text' : 'Direct message') })));
  acts.sort((a, b) => b.m.at - a.m.at);
  const quiet = all.reduce((n, x) => n + x.hidden, 0);
  const nxt = nextSlot15();
  const dTitle = f ? `Focus until ${clock15(f)}` : waiting ? `${waiting} waiting${nxt ? ', next ' + nxt : ''}` : (nxt ? `Next delivery ${nxt}` : 'Live');
  const dBtn = f ? `<button class="sm" onclick="focusEnd15();render()">End</button>` : waiting ? `<button class="sm" onclick="ls15('dp_deliv',Date.now());render()">Show</button>` : `<button class="sm" onclick="focusStart15();render()">Focus</button>`;
  const sel = ib.view === 'chat' ? byId[ib.sel] : null;
  const row = x => { const t = x.t, mode = t.group ? (s.groups[t.id] || 'needs') : '', mu = mode === 'never', on = sel && sel.t.id === t.id, b = !f && x.badge > 0;
    return `<button class="rw${on ? ' on' : ''}${b ? ' b' : ''}${mu ? ' mu' : ''}" onclick="open15('${esc(t.id)}')"${on ? ' aria-current="true"' : ''}>${t.group ? i15('grp') : `<span class="av${t.kind === 'agent' ? ' ag' : ''}" aria-hidden="true">${ini15(t.name)}</span>`}<span class="nm">${esc(t.name)}</span>${mu ? `<span role="img" aria-label="Muted">${i15('mute', 14)}</span>` : ''}${b ? `<span class="bd">${x.badge}</span>` : ''}</button>`; };
  const sec = (k, title, list) => list.length ? `<div class="sec"><button onclick="S.ib.open.${k}=!S.ib.open.${k};render()" aria-expanded="${!ib.open[k]}">${ic2(ib.open[k] ? 'chev' : 'down', 14)}${title}</button>${ib.open[k] ? '' : list.map(row).join('')}</div>` : '';
  const left = `<div class="il"><div class="dbox${f ? ' fo' : ''}" style="flex-direction:row;align-items:center;justify-content:space-between"><b>${dTitle}</b>${dBtn}</div>
   <button class="rw${ib.view === 'needs' ? ' on' : ''} b" onclick="S.ib.view='needs';render()">${i15('at')}<span class="nm">Needs you</span>${!f && acts.length ? `<span class="bd">${acts.length}</span>` : ''}</button>
   ${sec('g', 'Group chats', all.filter(x => x.t.group))}${sec('a', 'Agents', all.filter(x => x.t.kind === 'agent'))}${sec('l', 'Leads', all.filter(x => x.t.kind === 'lead'))}${sec('p', 'People', all.filter(x => x.t.kind === 'person'))}${sec('c', 'Codes and alerts', all.filter(x => x.t.kind === 'auto'))}<div class="sec"><button onclick="S.msgOld=1;render()">${ic2('clock', 14)}Scheduled texts</button></div></div>`;
  let mid = '', side = '';
  if (!sel){
    mid = `<div class="hd"><h2>Needs you</h2></div>
     <div class="ms" style="padding:20px 24px">${f ? `<p class="note">${acts.length} waiting until focus ends</p>` : acts.length ? acts.map(a => `<button class="act" onclick="open15('${esc(a.th.id)}')"><span style="min-width:0;flex:1"><span><b>${esc(a.m.who)}</b><span class="w">${a.th.group ? esc(a.th.name) + ', ' : ''}${clock15(a.m.at)}</span>${a.th.group ? `<span class="k" style="margin-left:8px">${esc(a.why)}</span>` : ''}</span><span class="x">${esc(a.m.text)}</span></span></button>`).join('') : `<p class="note" style="margin-top:40px">All caught up</p>`}
     ${quiet ? '' : '<!--'}<p class="note" style="margin-top:12px">${quiet} group message${quiet === 1 ? '' : 's'} kept quiet</p>${quiet ? '' : '-->'}</div>`;
  } else {
    const t = sel.t, mode = t.group ? (s.groups[t.id] || 'needs') : '', filt = t.group && !ib.all && mode !== 'every';
    let out = [], hid = 0; const flush = () => { if (hid){ out.push(`<div class="fold"><i></i><button onclick="S.ib.all=true;render()">${hid} hidden</button><i></i></div>`); hid = 0; } };
    sel.vis.forEach(mm => { const why = t.group ? forMe15(mm, t) : false; if (filt && !mm.mine && !why){ hid++; return; } flush();
      out.push(`<div class="m${why ? ' me4' : ''}"><span class="av big${mm.mine ? ' ag' : ''}" aria-hidden="true">${mm.mine ? 'M' : ini15(mm.who)}</span><div style="min-width:0;flex:1"><div><span class="who">${mm.mine ? 'You' : esc(mm.who)}</span><span class="tm">${clock15(mm.at)}</span>${why ? `<span class="tg">${esc(why)}</span>` : ''}</div>${mm.replyMine ? `<div class="rp">Replying to your message: “${esc(mm.replyMine)}”</div>` : ''}<div class="tx">${parts15(mm.text)}</div></div></div>`); });
    flush();
    if (sel.waiting) out.push(`<p class="note" style="margin-top:12px">${sel.waiting} more at the next delivery</p>`);
    const tps = (S.templates || []).map(x => ({ n: x.name, b: x.body })).concat([{ n: 'Running late', b: 'Sorry, running about 10 minutes late. Marlowe' }, { n: 'On it', b: 'On it, I will let you know by lunch.' }]);
    const d = ib.draft || '', menu = d[0] === '/' && !d.includes(' '), q = d.slice(1).toLowerCase(), hits = menu ? tps.filter(x => !q || x.n.toLowerCase().includes(q)) : [];
    S.ib.tps = hits;
    mid = `<div class="hd"><div>${desk2() ? '' : `<button class="ln" style="font-size:14px;margin-bottom:6px" onclick="S.ib.view='needs';render()">Back</button>`}<h2>${esc(t.name)}</h2><p>${t.group ? esc(t.members) : esc(t.via)}</p></div>
     <div style="display:flex;gap:8px;flex-wrap:wrap">${t.group ? `<button class="ob" onclick="mode15('${esc(t.id)}')" aria-label="Notifications for this group: ${MODES15[mode]}. Click to change.">${i15('bell')}${MODES15[mode]}</button>` : ''}
     ${sel.badge ? `<button class="ob" onclick="done15('${esc(t.id)}')">Mark done</button>` : ''}</div></div>
     <div class="ms" id="ms15">${out.join('')}</div>
     <div class="cp">${menu ? `<div class="menu"><b style="display:block;padding:4px 8px;font-size:12px;color:var(--t2)">Templates</b>${hits.length ? hits.map((x, i) => `<button onclick="tp15(${i})"><b>${esc(x.n)}</b><small>${esc(x.b)}</small></button>`).join('') : '<p style="margin:6px 8px;color:var(--t2)">No template called that.</p>'}</div>` : ''}
      <div class="box"><label for="ib15d" class="sr15" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Message to ${esc(t.name)}</label><textarea id="ib15d" placeholder="Message ${esc(t.name)}" oninput="draft15(this.value)" onkeydown="if(event.key==='Enter'&&(event.metaKey||event.ctrlKey)){event.preventDefault();send15()}">${esc(d)}</textarea>
      <div class="cb15"><span>/ for templates</span><button class="b2 pri" style="height:34px" onclick="send15()">${ic2('send', 16)}Send</button></div></div></div>`;
    if (t.kind === 'lead' && t.lead){ const l = t.lead;
      side = `<aside class="ip" aria-label="Lead details"><div style="display:flex;gap:12px;align-items:center;margin-bottom:20px"><span class="av big" aria-hidden="true" style="flex-basis:48px;height:48px;line-height:48px;font-size:16px">${ini15(l.name || t.name)}</span><div><b style="font-size:16px">${esc(l.name || t.name)}</b><div style="font-size:13px;color:var(--t2)">${esc(l.stage)}</div></div></div>
       <dl>${[['Address', l.address], ['Next step', l.next], ['Phone', l.phone], ['OK to message', l.ok]].filter(x => x[1]).map(x => `<div><dt>${x[0]}</dt><dd>${esc(x[1])}</dd></div>`).join('')}</dl>
       <div style="display:flex;flex-direction:column;gap:8px;margin-top:20px">${l.phone ? `<a class="b2 pri" href="tel:${esc(digits15(l.phone))}">${ic2('phone', 16)}Call</a>` : ''}${l.id ? `<button class="b2" onclick="openLead(${+l.id})">Open lead</button>` : ''}</div></aside>`; }
  }
  m.innerHTML = `<div class="ib15${sel ? ' chat' : ''}${side ? '' : ' noside'}">${left}<section class="ic" aria-label="${sel ? 'Conversation' : 'Needs you'}">${mid}</section>${side}</div>`;
  const ms = $('#ms15'); if (ms) ms.scrollTop = ms.scrollHeight;
  if (sel){ const ta = $('#ib15d'); if (ta && ib.focusDraft){ ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); ib.focusDraft = 0; } }
}
function open15(id){ S.ib.view = 'chat'; S.ib.sel = id; S.ib.all = false; S.ib.draft = ''; render(); }
function draft15(v, refocus){ const was = (S.ib.draft || '')[0] === '/' && !(S.ib.draft || '').includes(' '); S.ib.draft = v; const now = v[0] === '/' && !v.includes(' ');
  if (refocus || was || now){ S.ib.focusDraft = 1; view15(); } }
function tp15(i){ const x = (S.ib.tps || [])[i]; if (!x) return; const th = (S.ib.th || []).find(t => t.id === S.ib.sel) || {}; const fn = String(th.name || '').split(' ')[0];
  S.ib.draft = x.b.replace(/\{first_name\}/g, fn).replace(/\{address\}/g, th.lead?.address || 'your place'); S.ib.focusDraft = 1; view15(); }
function done15(id){ S.ib.done[id] = Date.now(); if (DEMO) ls15('dp_ibdone', JSON.stringify(S.ib.done)); else ib15('done', { chat: id }).catch(() => {}); render(); }
function mode15(id){ const s = ms15(), k = ['needs', 'every', 'never'], cur = s.groups[id] || 'needs', nx = k[(k.indexOf(cur) + 1) % 3];
  ms15Save({ groups: Object.assign({}, s.groups, { [id]: nx }) }); toast('Notify me: ' + MODES15[nx].toLowerCase()); render(); }
async function send15(){ const txt = (S.ib.draft || '').trim(); if (!txt || (txt[0] === '/' && !txt.includes(' '))) return toast('Write a message first');
  const th = (S.ib.th || []).find(t => t.id === S.ib.sel); if (!th) return;
  if (S.ib.sending) return; S.ib.sending = 1;
  try { if (!DEMO) await ib15('send', { chat: th.id, text: txt }); }
  catch (e) { S.ib.sending = 0; return toast(e.message); }
  S.ib.sending = 0;
  th.msgs.push({ who: 'me', mine: true, text: txt, at: Date.now() }); S.ib.draft = ''; done15(th.id); toast('Sent to ' + th.name); }

// Messages replaces the old Texts page; the scheduled texts list stays one click away
window.viewMessages = (function(orig){ return async function(){ if (S.msgOld){ S.msgOld = 0; await orig(); $('#main')?.insertAdjacentHTML('afterbegin', `<button class="b2" style="margin-bottom:12px" onclick="render()">${ic2('back', 16)}Back to messages</button>`); return; } return view15(); }; })(window.viewMessages);
window.tabName = (function(orig){ return function(){ return !S.searching && S.tab === 'messages' ? 'Messages' : orig(); }; })(window.tabName);
if (!SIDE.some(x => x[0] === 'messages')) SIDE.splice(1, 0, ['messages', 'Messages', 'msg']);
if (!TB2.some(x => x[0] === 'messages')) TB2.splice(3, 0, ['messages', 'Messages', 'msg']);
// refresh every minute while Messages is open, so deliveries and focus endings show without a tap
setInterval(() => { if (S.tab === 'messages' && !S.msgOld && !document.querySelector('#ov.show') && document.activeElement?.id !== 'ib15d') { if (S.ib) S.ib.at = 0; view15().catch(() => {}); } }, 60e3);
// Focus starts by itself while she is on the call list, if she wants that
window.go = (function(orig){ return function(t, ...a){ const s = ms15(); if (s.autoFocus){ if (t === 'calls' && !focus15()){ focusStart15(); S.ibAuto = 1; } else if (t !== 'calls' && S.ibAuto){ focusEnd15(); S.ibAuto = 0; } } return orig(t, ...a); }; })(window.go);

// ---------- Settings: everything for Messages in one section ----------
function whenTxt15(){ const s = ms15(); return s.deliver === 'live' ? 'As they come in' : s.deliver === 'hourly' ? 'Every hour' : slots15().map(t15).join(', '); }
window.viewSettings = (function(orig){ return async function(){ await orig(); const m = $('#main'); if (!m || S.tab !== 'settings') return; const s = ms15();
  const val = v => `<span class="sv2">${esc(v)}${chev2()}</span>`;
  const html = `<div class="set2"><div class="sth2">Messages</div><div class="g2">${[
    row2('var(--acc)', 'msg', 'Connect your Mac', '', val(S.ib?.srv ? (S.ib.srv.connected ? 'Connected' : 'Not set up') : 'Check'), 'set15Mac()'),
    row2('var(--acc)', 'clock', 'When messages are delivered', '', val(whenTxt15()), 'set15When()'),
    row2('#6366f1', 'clock', 'Focus sessions', '', val(s.focusLen >= 9999 ? 'Until I end it' : s.focusLen >= 60 ? s.focusLen / 60 + ' hr' : s.focusLen + ' min'), 'set15Focus()'),
    row2('#0d9488', 'users', 'Group chats', '', val('Only when it needs me'), 'set15Groups()')].join('')}</div></div>`;
  const texts = [...m.querySelectorAll('.sth2')].find(x => x.textContent === 'Texts'); if (texts) texts.parentElement.insertAdjacentHTML('beforebegin', html); else m.querySelector('.setw2')?.insertAdjacentHTML('beforeend', html); }; })(window.viewSettings);
const sw15 = (id, on, t, sub) => `<label style="display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-top:1px solid var(--line2);cursor:pointer"><input type="checkbox" id="${id}" ${on ? 'checked' : ''} style="width:20px;height:20px;margin:2px 0 0;accent-color:var(--acc);flex:none"><span><b style="display:block">${t}</b><span style="font-size:13px;color:var(--t2)">${sub}</span></span></label>`;
function set15Mac(){ const on = S.ib?.srv?.connected, hk = S.ib?.srv && S.ib.srv.hook_ok === false;
  openSheet2('Connect your Mac', `<p class="hint2">From BlueBubbles on your Mac: the server address and the password you set. Both are kept on Prospect's server, not on this phone or laptop, so you only do this once.</p>
  ${on ? `<p class="hint2" style="color:var(--good)">Connected.${S.ib.srv.last_hook ? ' Last message arrived ' + clock15(Date.parse(S.ib.srv.last_hook)) + '.' : ''}</p>` : ''}
  ${hk ? `<p class="hint2">Your Mac isn't sending new messages straight here yet, so Prospect checks every 10 minutes instead. To fix it, in BlueBubbles open API and Webhooks, add a webhook, and paste the address from "Copy webhook address".</p>` : ''}
  <div class="fg2 one"><label><span>Server address</span><input id="bb_u" type="url" placeholder="https://something.trycloudflare.com" autocomplete="off"></label><label><span>Password</span><input id="bb_p" type="password" autocomplete="off"></label></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><button class="b2 pri wide2b" id="bb_go" onclick="save15Mac()">Save and test</button>${on ? '<button class="b2" onclick="dis15()">Disconnect</button>' : ''}${(S.ibHook || S.ib?.srv?.hook_url) ? '<button class="b2" onclick="navigator.clipboard.writeText(S.ibHook || S.ib.srv.hook_url).then(()=>toast(\'Copied\'))">Copy webhook address</button>' : ''}</div>`); }
async function save15Mac(){ const u = $('#bb_u').value.trim(), pw = $('#bb_p').value; if (!u || !pw) return toast('Add the address and the password');
  const btn = $('#bb_go'); if (btn){ btn.disabled = true; btn.textContent = 'Connecting, this can take a minute'; }
  try { const r = await ib15('setup', { url: u, pass: pw }); S.ibHook = r.hook_url || null;
    toast(r.hook_ok ? `Connected to your Mac${r.synced ? ', ' + r.synced.messages + ' messages from the last week' : ''}` : 'Connected. One more step to get messages instantly, see Connect your Mac in Settings'); }
  catch (e) { if (btn){ btn.disabled = false; btn.textContent = 'Save and test'; } return toast(e.message); }
  S.ib = null; closeOv(); render(); }
async function dis15(){ try { await ib15('disconnect'); } catch (e) { return toast(e.message); } S.ib = null; closeOv(); toast('Disconnected'); render(); }
function set15When(){ const s = ms15(), r = (k, t, sub) => `<label style="display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-top:1px solid var(--line2);cursor:pointer"><input type="radio" name="dl15" value="${k}" ${s.deliver === k ? 'checked' : ''} style="width:20px;height:20px;margin:2px 0 0;accent-color:var(--acc);flex:none"><span><b style="display:block">${t}</b><span style="font-size:13px;color:var(--t2)">${sub}</span></span></label>`;
  openSheet2('When messages are delivered', `<p class="hint2">Inside Prospect, new messages only show and count at these times. Your iPhone still alerts as normal, so turn Messages alerts off on the phone if you want the quiet.</p>
   ${r('hourly', 'Every hour', 'On the hour, 8am to 6pm.')}${r('three', 'At set times', 'Morning, midday and afternoon by default. Change the times below.')}${r('live', 'As they come in', 'Shows straight away in Prospect.')}
   <div class="fg2" style="margin-top:8px">${[0, 1, 2, 3].map(i => `<label><span>Time ${i + 1}</span><input type="time" id="dt15_${i}" value="${esc((s.times || [])[i] || '')}"></label>`).join('')}</div>
   ${sw15('ur15', s.urgent, 'Let urgent lead messages straight through', 'A lead writing cancel, reschedule or running late shows in Prospect straight away.')}
   <button class="b2 pri wide2b" style="margin-top:12px" onclick="save15When()">Save</button>`); }
function save15When(){ const d = document.querySelector('input[name=dl15]:checked')?.value || 'three'; const times = [0, 1, 2, 3].map(i => $('#dt15_' + i).value).filter(Boolean);
  if (d === 'three' && !times.length) return toast('Add at least one time'); ms15Save({ deliver: d, times, urgent: $('#ur15').checked }); closeOv(); toast('Saved'); render(); }
function set15Focus(){ const s = ms15(), L = [[30, '30 min'], [60, '1 hour'], [120, '2 hours'], [9999, 'Until I end it']];
  openSheet2('Focus sessions', `<p class="hint2">Prospect shows no new messages until it ends. They keep coming in quietly and are waiting for you. Your iPhone is not affected.</p>
   <div class="fg2 one"><label><span>Default length</span><select id="fl15">${L.map(([v, l]) => `<option value="${v}" ${+s.focusLen === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>
   ${sw15('af15', s.autoFocus, 'Start focus when I open the call list', 'Ends when you leave the call list.')}${sw15('fu15', s.focusUrgent, 'Still let urgent lead messages through', 'Off means Prospect stays completely quiet.')}
   <div style="display:flex;gap:8px;margin-top:12px"><button class="b2 pri wide2b" onclick="save15Focus()">Save</button><button class="b2" onclick="save15Focus(1)">Start one now</button></div>`); }
function save15Focus(now){ ms15Save({ focusLen: +$('#fl15').value, autoFocus: $('#af15').checked, focusUrgent: $('#fu15').checked }); if (now) focusStart15(); closeOv(); toast(now ? 'Focus on' : 'Saved'); render(); }
function set15Groups(){ const s = ms15(), r = s.rules;
  openSheet2('Group chats', `<p class="hint2">Messages from just you always count. In groups, these are the only things that do. Change a single group with the bell at the top of that chat.</p>
   ${sw15('gt15', r.tag, 'Someone tags me', 'The normal way people get your attention.')}${sw15('gn15', r.name, 'My name is in the message', 'Catches people who type your name without tagging you.')}
   <div class="fg2 one" style="margin:0 0 8px 32px"><label><span>Names</span><input id="gnm15" value="${esc((s.names || []).join(', '))}"></label></div>
   ${sw15('gr15', r.reply, 'Someone replies to my message', 'So answers to your questions always reach you.')}${sw15('ga15', r.all, 'Someone writes @all or @everyone', 'Office notices like closures and meeting changes.')}
   ${sw15('gw15', r.words, 'A message has one of my words', 'Off by default, busy groups use these a lot.')}
   <div class="fg2 one" style="margin:0 0 8px 32px"><label><span>Words</span><input id="gwd15" value="${esc((s.words || []).join(', '))}"></label></div>
   <button class="b2 pri wide2b" style="margin-top:12px" onclick="save15Groups()">Save</button>`); }
function save15Groups(){ const list = v => v.split(',').map(x => x.trim()).filter(Boolean);
  ms15Save({ rules: { tag: $('#gt15').checked, name: $('#gn15').checked, reply: $('#gr15').checked, all: $('#ga15').checked, words: $('#gw15').checked }, names: list($('#gnm15').value), words: list($('#gwd15').value) });
  closeOv(); toast('Saved'); render(); }
