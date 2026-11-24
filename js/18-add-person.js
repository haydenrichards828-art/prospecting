// ---------- One "Add a person" form for every kind of person (24 Nov) ----------
// There were three add forms (call back, new lead, appraisal or listing). Now one form: pick what they are first, then
// only the details that matter for that show. Every Add button opens it with the right choice already picked.
(function(){
const KINDS = [
  ['callback', 'Call back', 'clock', 'Ring them again later, like past clients or people not ready yet. They come up in Call backs on the day.'],
  ['seller', 'Seller', 'house', 'Thinking about selling. Goes into Leads with a follow up date.'],
  ['buyer', 'Buyer', 'search', 'Looking to buy. Goes into Leads, and Dignam homes that suit them show in their lead.'],
  ['appraisal', 'Appraisal', 'appr', 'An appraisal is booked. Goes into Appraisals.'],
  ['listed', 'Listing', 'star', 'Signed with Dignam. Goes into Listings.']];
const LEADSRC = { referral: 'Referral', card_drop: 'Card Drop', open_home: 'Open Home', crm: 'Database' };
const SRC = Object.entries(typeof SOURCES !== 'undefined' ? SOURCES : {}).filter(([k]) => k !== 'calls').map(([k, l]) => [k, l, LEADSRC[k] || l]);
const FU = [['Tomorrow', 1], ['3 days', 3], ['1 week', 7], ['1 month', 30]], TEMP = ['Hot', 'Warm', 'Nurture', 'Cold'];
const IC = n => { try { const s = ic2(n, 16); return s && s.length > 20 ? s : ic2('clock', 16); } catch { return ''; } };
const chips = (id, items, onKey, cur, extra = '') => `<div class="ch16 ${extra}" id="${id}">${items.map(([v, l]) => `<button type="button" class="${String(v) === String(cur) ? 'on' : ''}" onclick="AD16.pick('${id}',this,'${onKey}','${v}')">${l}</button>`).join('')}</div>`;

function open(kind){ S.ad16 = { kind: kind || 'callback', when: null, fu: 3, temp: 'Warm', src: null, beds: null, subs: [], pid: null, suburb: null };
  openSheet2('Add a person', `<div class="ad16">
    <div class="kd16" role="tablist" aria-label="What are they">${KINDS.map(([k, l, ic]) => `<button role="tab" type="button" data-k="${k}" aria-selected="${k === S.ad16.kind}" class="${k === S.ad16.kind ? 'on' : ''}" onclick="AD16.kind('${k}')">${IC(ic)}<span>${l}</span></button>`).join('')}</div>
    <p class="kh16" id="ad_hint"></p>
    <div class="gr16">
      <label class="fl2">Name<input id="ap_name" autocomplete="off"></label>
      <label class="fl2">Phone<input id="ap_phone" inputmode="tel" autocomplete="off" onblur="AD16.dupe()"></label>
      <div id="ad_dupe" class="sp16"></div>
    </div>
    <div class="gr16 as16">
      <label class="fl2 aw16">Address<input id="ap_addr" placeholder="Start typing, like 12 Smith Street" autocomplete="off" oninput="AD16.find(this.value)"><div id="ad_hits" class="qhits2"></div></label>
      <label class="fl2" id="ad_subw">Suburb<input id="ap_sub" list="sublist16" autocomplete="off"></label>
      <div id="ad_link" class="sp16"></div>
    </div>
    <datalist id="sublist16">${(typeof SUBURBS !== 'undefined' ? SUBURBS : []).map(s => `<option value="${esc(s)}">`).join('')}</datalist>
    <div id="ad_more"></div>
    <button class="b2 pri" id="ap_go" onclick="AD16.save()"></button></div>`);
  kind16(S.ad16.kind); setTimeout(() => $('#ap_name')?.focus(), 60); }

function kind16(k){ const a = S.ad16; a.kind = k;
  document.querySelectorAll('.kd16 button').forEach(b => { const on = b.dataset.k === k; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
  $('#ad_hint').textContent = KINDS.find(x => x[0] === k)[3];
  const note = ph => `<label class="fl2"><span>Note <em class="op16">optional</em></span><textarea id="ap_note" rows="2" data-grow placeholder="${ph}"></textarea></label>`;
  const src = () => `<div class="fl2"><span>Where from <em class="op16">optional</em></span>${chips('ad_src', SRC.map(s => [s[0], s[1]]), 'src', a.src, 'wrap')}</div>`;
  let h = '';
  if (k === 'callback') h = `<div class="fl2">Call them back in${chips('ad_when', LATER.map(([l, m]) => [m, l]), 'when', a.whenM, 'g4')}
      <label class="pd16"><span>Or pick a date</span><input type="date" id="ad_date" onchange="AD16.date(this.value)"></label></div>${note('Sold 12 Smith St in November, wants a check in')}`;
  if (k === 'seller') h = `<div class="fl2">Follow up${chips('ad_fu', FU.map(([l, d]) => [d, l]), 'fu', a.fu, 'g4')}</div><div class="fl2">How keen${chips('ad_temp', TEMP.map(t => [t, t]), 'temp', a.temp, 'g4')}</div>${src()}${note('Might sell after Christmas, wants a price guide')}`;
  if (k === 'buyer') h = `<div class="gr16"><label class="fl2">Budget up to<input id="ad_max" inputmode="decimal" placeholder="Like 900k or 1.2m"></label>
      <div class="fl2">Bedrooms${chips('ad_beds', [[1, '1+'], [2, '2+'], [3, '3+'], [4, '4+']], 'beds', a.beds, 'g4')}</div></div>
      <label class="fl2 aw16">Suburbs they want<input id="ad_subq" placeholder="Start typing a suburb" autocomplete="off" oninput="AD16.subq(this.value)"><div id="ad_subhits" class="qhits2"></div></label><div class="ch16 wrap" id="ad_subs"></div>
      <div class="fl2">Follow up${chips('ad_fu', FU.map(([l, d]) => [d, l]), 'fu', a.fu, 'g4')}</div>${src()}${note('Pre approved, wants a yard for the dog')}`;
  if (k === 'appraisal') h = `<label class="fl2"><span>When <em class="op16">optional, you can set it later</em></span><input type="datetime-local" id="ad_appt"></label>${src()}`;
  if (k === 'listed') h = src();
  $('#ad_more').innerHTML = h; subs16();
  $('#ap_go').textContent = { callback: 'Add to call backs', seller: 'Add seller lead', buyer: 'Add buyer lead', appraisal: 'Add to Appraisals', listed: 'Add to Listings' }[k];
  $('#ap_addr').placeholder = k === 'buyer' ? 'Where they live now, optional' : 'Start typing, like 12 Smith Street'; }

function pick(id, btn, key, v){ const a = S.ad16, on = btn.classList.contains('on'), optional = ['src', 'beds'].includes(key);
  document.querySelectorAll('#' + id + ' button').forEach(b => b.classList.remove('on'));
  if (on && optional){ a[key] = null; return; } btn.classList.add('on');
  if (key === 'when'){ a.whenM = +v; a.when = monthsAhead(+v); const d = $('#ad_date'); if (d) d.value = ''; $('.pd16')?.classList.remove('on'); return; }
  a[key] = ['fu', 'beds'].includes(key) ? +v : v; }
function date(v){ const a = S.ad16; a.when = v ? sydToISO(v + 'T10:00') : null; a.whenM = null; document.querySelectorAll('#ad_when button').forEach(b => b.classList.remove('on')); $('.pd16')?.classList.toggle('on', !!v); }

// address: find the house in the property register as you type; picking it links them and fills the suburb
let ft = 0;
function find(v){ clearTimeout(ft); const a = S.ad16; a.pid = null; $('#ad_link').innerHTML = ''; const q = v.trim(); if (q.length < 4){ $('#ad_hits').innerHTML = ''; return; }
  ft = setTimeout(async () => { let r; try { r = await api('search', { q }); } catch { return; } if ($('#ap_addr')?.value.trim() !== q) return;
    const props = (r.props || []).slice(0, 5), leads = (r.leads || []).slice(0, 2); a.hits = props;
    $('#ad_hits').innerHTML = leads.map(l => `<button type="button" class="dup" onclick="closeOv();openLead(${l.id})">${ic2('lead', 15)}<span><b>Already a lead: ${esc(leadTitle(l))}</b><em>${esc([l.address, l.suburb].filter(Boolean).join(', '))}. Open them</em></span></button>`).join('')
      + props.map((p, i) => `<button type="button" onclick="AD16.link(${i})">${ic2('house', 15)}<span><b>${esc(String(p.street_address || '').trim())}, ${esc(p.suburb || '')}</b><em>${esc(p.owner_name || 'Owner not known')}${p.is_lead ? ', already a lead' : ''}</em></span></button>`).join(''); }, 250); }
function link(i){ const a = S.ad16, p = (a.hits || [])[i]; if (!p) return; a.pid = p.id; a.suburb = p.suburb || '';
  $('#ap_addr').value = String(p.street_address || '').trim(); $('#ap_sub').value = a.suburb; $('#ad_hits').innerHTML = '';
  if (!$('#ap_name').value.trim() && p.owner_name) $('#ap_name').value = people(p.owner_name)[0] || p.owner_name;
  if (!$('#ap_phone').value.trim() && p.phone) $('#ap_phone').value = fmtPh2(p.phone);
  $('#ad_link').innerHTML = `<div class="qlink2">${ic2('check', 15)} Linked to ${esc($('#ap_addr').value)}, ${esc(a.suburb)}</div>`; }
async function dupe(){ const v = ($('#ap_phone')?.value || '').replace(/\D/g, ''), box = $('#ad_dupe'); if (!box) return; if (v.length < 8){ box.innerHTML = ''; return; }
  let r; try { r = await api('search', { q: v }); } catch { return; } const l = (r.leads || [])[0];
  box.innerHTML = l ? `<button type="button" class="qdup2" onclick="closeOv();openLead(${l.id})">${ic2('warn', 15)} ${esc(leadTitle(l))} already has this number. Open them instead</button>` : ''; }
function subq(v){ const q = v.trim().toLowerCase(), box = $('#ad_subhits'); if (!q){ box.innerHTML = ''; return; }
  box.innerHTML = SUBURBS.filter(x => x.toLowerCase().includes(q) && !S.ad16.subs.includes(x)).slice(0, 5).map(x => `<button type="button" onclick="S.ad16.subs.push('${esc(x)}');$('#ad_subq').value='';$('#ad_subhits').innerHTML='';AD16.subs()">${esc(x)}</button>`).join(''); }
function subs16(){ const b = $('#ad_subs'); if (b) b.innerHTML = S.ad16.subs.map((x, i) => `<button type="button" class="on" onclick="S.ad16.subs.splice(${i},1);AD16.subs()">${esc(x)} ×</button>`).join(''); }

async function save(){ const a = S.ad16, v = id => ($('#' + id)?.value || '').trim(), name = v('ap_name'), phone = v('ap_phone'), addr = v('ap_addr'), sub = v('ap_sub') || a.suburb || '', note = v('ap_note');
  const pe = phone && phoneProblem(phone); if (pe) return phoneBad($('#ap_phone'), pe);
  const hasNo = /^\s*(\w+\s*\/\s*)?\d+\w?\s+\S/.test(addr), b = $('#ap_go'), label = b.textContent;
  const busy = on => { b.disabled = on; b.textContent = on ? 'Adding…' : label; };
  if (a.kind === 'callback'){
    if (!name && !phone) return phoneBad($('#ap_name'), 'Add their name or phone number.');
    if (!hasNo) return phoneBad($('#ap_addr'), 'Start with the house number, like 12 Smith Street.');
    if (!sub) return phoneBad($('#ap_sub'), 'Add the suburb.');
    if (!a.when) return toast('Pick when to call them back');
    busy(true); try { await api('add_person', { name, phone, address: addr, suburb: sub, callback_at: a.when, notes: note }); } catch (e){ busy(false); return toast(e.message); }
    closeOv(); try { await loadCallbacks(); if (S.tab === 'calls') drawList(); } catch {} return toast(`${name || 'They'} will come up as a call back on ${longLab(a.when)}`); }
  if (a.kind === 'seller' || a.kind === 'buyer'){
    if (!name && !phone && !addr) return phoneBad($('#ap_name'), 'Add a name, phone or address.');
    const src = SRC.find(s => s[0] === a.src);
    const lead = { name: name || null, phone: phone ? phone.replace(/[^\d+]/g, '') : null, address: addr || null, suburb: sub || null, lead_type: a.kind === 'buyer' ? 'Buyer' : 'Potential Vendor', source: src ? src[2] : null, temperature: a.kind === 'seller' ? a.temp : 'Warm', follow_up: addDaysKey(a.fu) };
    if (a.kind === 'buyer'){ const buy = {}, mx = qaMoney(v('ad_max')); if (mx) buy.max = mx; if (a.beds) buy.beds = a.beds; if (a.subs.length) buy.suburbs = a.subs; if (Object.keys(buy).length) lead.buy = buy; }
    busy(true); try { const r = await api('save_lead', { lead, property_id: a.pid || undefined }); if (note) await api('lead_note', { id: r.id, body: note, follow_up: lead.follow_up });
      await loadLeads(); closeOv(); if (S.tab === 'leads') drawLeads(); if (S.tab === 'pipeline') render(); toast2(r.existing ? 'Already a lead, updated' : `Added ${name || addr || 'lead'}`, 'Open', () => openLead(r.id)); }
    catch (e){ busy(false); toast(e.message); } return; }
  // appraisal or listing
  const m = addr.match(/^\s*((?:\w+\s*\/\s*)?\d+[a-z]?(?:-\d+[a-z]?)?)\s+(.+)$/i);
  if (!m) return phoneBad($('#ap_addr'), 'Start with the house number, like 12 Smith Street.');
  if (!sub) return phoneBad($('#ap_sub'), 'Add the suburb.');
  const body = { house_number: m[1].replace(/\s+/g, ''), street: m[2], suburb: sub, owner_name: name, phone, stage: a.kind === 'listed' ? 'listed' : 'appraisal', source: a.src || 'other', lead_id: a.lead_id || undefined };
  busy(true); try { const r = await api('add_pipeline', body); if (a.after && r && r.property_id) await api('set_stage', { property_id: r.property_id, stage: a.after }); const at = v('ad_appt'); if (at && r && r.property_id) try { await api('set_appt', { property_id: r.property_id, appt_at: sydToISO(at) }); } catch {}
    closeOv(); toast(a.kind === 'listed' ? 'Added to Listings' : 'Added to Appraisals'); S.leads = null; render(); }
  catch (e){ busy(false); toast(e.message); } }

window.AD16 = { open, kind: kind16, pick, date, find, link, dupe, subq, subs: subs16, save };
// Every Add button opens the one form, with the matching choice picked
window.addPerson2 = () => open('callback');
window.quickAdd2 = () => open('seller');
window.openAddPipe = function(kind){ return open(kind === 'listed' ? 'listed' : 'appraisal'); };
// Moving a lead into Appraisals or Listings when their address isn't complete: the same form, with the lead filled in
window.leadMove6 = (function(o){ return async function(id, stage){ const l = (S.leads || []).find(x => x.id === id); if (!l) return;
  const p = addrParts6(l); if (l.property_id || (p.house_number && p.street && p.suburb)) return o.apply(this, arguments);
  closeOv(); const first = stage === 'appraisal' ? 'appraisal' : 'listed'; open(first);
  Object.assign(S.ad16, { lead_id: id, after: first === stage ? null : stage, src: LSRC6[l.source] || null });
  const set = (sel, v) => { const i = $(sel); if (i && v) i.value = v; };
  set('#ap_name', l.name); set('#ap_phone', l.phone); set('#ap_addr', [p.house_number, p.street].filter(Boolean).join(' ')); set('#ap_sub', p.suburb);
  kind16(first); $('#ap_go').textContent = first === 'listed' ? 'Move to Listings' : 'Move to Appraisals'; document.querySelectorAll('#ad_src button').forEach(b => b.classList.toggle('on', b.textContent === (SOURCES[S.ad16.src] || ''))); }; })(window.leadMove6);
})();

// ---------- WhatsApp beside Text and Email in the message sheet (24 Nov) ----------
// Opens WhatsApp (phone app, desktop app or web) with the message typed in; she presses send. Works on iPhone, Android and computers.
(function(){
const intl = p => { let d = String(p || '').replace(/[^\d+]/g, ''); if (d.startsWith('+')) return d.slice(1); if (d.startsWith('0')) return '61' + d.slice(1); return d; };
window.waLink = (phone, body) => `https://wa.me/${intl(phone)}?text=${encodeURIComponent(body)}`;
window.sendInfo = (function(o){ return async function(...a){ const r = await o.apply(this, a); const w = S.sw, row = document.querySelector('#sheet .sw2');
  if (w && w.phone && row && !row.querySelector('.wa18')){ const b = document.createElement('button'); b.className = 'b2 wa18'; b.innerHTML = `${ic2('msg', 18)}WhatsApp`; b.onclick = () => swSend('whatsapp');
    const copy = [...row.children].find(x => /Copy/.test(x.textContent)); row.insertBefore(b, copy || null); }
  return r; }; })(window.sendInfo);
window.swSend = (function(o){ return async function(ch){ if (ch !== 'whatsapp') return o.apply(this, arguments);
  const w = S.sw, body = ($('#sw_body')?.value || '').trim(); if (!body) return toast('Write a message first');
  if (!callingAllowed()) return toast('Outside calling hours, so messages wait too. Copy it and send later.');
  openUrl(waLink(w.phone, body));
  api2('log_send', { channel: 'whatsapp', kind: 'info', body, person_name: w.name, phone: w.phone, email: w.email, lead_id: w.lead_id, property_id: w.property_id }).catch(() => {});
  closeOv(); toast('Opened WhatsApp. It’s noted on their record.'); }; })(window.swSend);
})();
