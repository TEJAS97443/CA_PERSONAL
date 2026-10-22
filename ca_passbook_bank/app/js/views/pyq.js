/* PassBook — previous-year question bank (browse, filter, search, practise) and the single-question page (owner: WP9b).
   URL filters (#/pyq?...): q subject topic sub year from to paper type marks sec diff status syl sort page, plus
     type=NAT,MSQ   several answer types at once (any order)
     topic=a,b      several topics (or sub=a,b sub-topics) at once: a lab's 'Practise these' link opens exactly its questions (P1-37)
     disputed=1     the questions whose official key is disputed (ids from the manifest stats block, see build.py manifest_stats)
     special=1      the questions where the official key gave marks to all or accepted more than one answer
     practise=10    a session link (docs/ARCHITECTURE.md §10.4): start 'Practise 10' on that filter; the URL is replaced first, so Back lands on the list
   The bank renders once per visit and updates in place (P0-14): typing, filters, sort and pages repaint the count, chips, rows and pager without
   re-rendering the page, so focus and the scroll position stay; the address follows with history.replaceState (P1-47: no history step per tap).
   Phones open Filters as a bottom sheet with a live 'Show N questions' (P1-25). The pure helpers live in core/pyqlib.js (GA.pyqLib); in Node this file
   returns that same object, so tests/pyq.test.js and tests/practice.test.js keep working through either path.
   Part B: calm compact rows (P2-25, P2-24, P2-66, P3-21, P3-33), a topic row under the subject row and a result line that names the subject (P2-27),
   one tab stop per filter row (P3-15), one Answer key select (P3-20), the mixed review (P2-64), retry cards that hand focus back (P1-48); on the
   question page a two-row phone header (P1-18), right / missed palette cells (P2-23, P3-22), a timer that stops on 'Show answer' (P3-18) and
   'More on' rows with a state dot and a line of the stem (P3-19). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('../core/util.js') : null);
  const Lib = GA.pyqLib || (typeof require === 'function' ? require('../core/pyqlib.js') : null);
  if (typeof module !== 'undefined' && module.exports) module.exports = Lib;
  if (typeof document === 'undefined') return;

  /* ================================================================== shared */
  const esc = U.esc, icon = (n, c) => GA.icon(n, c), UI = GA.ui, DATA = GA.data;
  const L = () => GA.pyqLib;
  const PAGE = 25;
  const ADV = ['year', 'from', 'to', 'paper', 'type', 'marks', 'sec', 'diff', 'status', 'key', 'syl', 'topic', 'sub', 'disputed', 'special', 'kind', 'attempt', 'scheme', 'oos'];
  /** the bank holds ICAI items (docs/ICAI_BANK.md): its own filters, words and states */
  const icaiBank = D => !!(D && D.questions && D.questions.length && D.questions.every(q => q.icai));
  const dot = '<i class="sep" aria-hidden="true">·</i>';
  const ss = { get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode: the session forgets */ } } };
  /** the bank address for a filter state: defaults (sort, page 1) are left out */
  const url = f => GA.router.href('/pyq', Object.fromEntries(L().FKEYS.filter(k => f[k] && !(k === 'sort' && f[k] === L().defaultSort(f)) && !(k === 'page' && +f[k] === 1)).map(k => [k, f[k]])));
  /** rewrite this history entry's address in place (P0-14, P1-47); history.state (the router's scroll key, open rows) is kept */
  function writeUrl(h, extra) {
    const fn = () => { try { history.replaceState(Object.assign({}, history.state || {}, extra || {}), '', h); } catch (e) { /* file:// quirks */ } };
    if (UI.overlay && UI.overlay.busy && UI.overlay.busy()) UI.overlay.after(fn); else fn();
  }
  async function ensureLib() { if (!GA.pyqLib || !GA.pyqLib.parseQuery) await U.loadScript('app/js/core/pyqlib.js'); }
  const touch = () => !!(UI && UI.touch);
  const phone = () => !!(g.matchMedia && g.matchMedia('(max-width: 700px)').matches);
  const calm = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* practice queue shared with the single-question page, the test result's 'Retry' and the notebook's revision.
     set(ids, label, extra?): extra = {bank: the bank address it came from, key, kind: 'bank', back: {href, label}}; this session's outcomes are
     kept on the record (res: id -> 'ok' | 'bad' | 'seen' | 'peek', ms: id -> time to answer) for the end-of-set summary (P1-22). */
  const QKEY = 'ga-queue';
  const Queue = (GA.queue = GA.queue || {});
  Object.assign(Queue, {
    set(ids, label, extra) { const rec = Object.assign({}, extra || {}, { ids: (ids || []).slice(), label: label || '', res: {}, ms: {}, made: Date.now() }); Queue._m = rec; ss.set(QKEY, rec); return rec; },
    get() { const r = ss.get(QKEY); return (r && Array.isArray(r.ids) ? r : null) || Queue._m || null; },
    patch(fn) { const r = Queue.get(); if (!r) return null; r.res = r.res || {}; r.ms = r.ms || {}; fn(r); Queue._m = r; ss.set(QKEY, r); return r; }
  });
  /** 'Practise 10' remembers per filter which questions it already served this session, so pressing it again continues with the next 10 */
  const SKEY = 'ga-pq-served';
  const served = key => ((ss.get(SKEY) || {})[key] || []);
  function serve(key, ids, wrapped) { const m = ss.get(SKEY) || {}; m[key] = (wrapped ? [] : (m[key] || [])).concat(ids).slice(-2000); ss.set(SKEY, m); }

  /** build 'Practise N' for a filtered list and open its first question (push: the list stays one Back away) */
  function startPractice(D, f, list, n) {
    const P = L(), key = P.bankKey(f);
    const set = P.practiseSet(list, GA.store, { n: n || 10, served: served(key) });
    if (!set.ids.length) return false;
    serve(key, set.ids, set.wrapped);
    const bank = url(Object.assign({}, f, { page: 1 }));
    Queue.set(set.ids, P.setName(D, f), { bank, f: filterOf(f), key, kind: 'bank', back: { href: bank, label: 'Back to the bank' } });
    GA.router.go('/q/' + encodeURIComponent(set.ids[0]), { queue: 1 });
    return true;
  }
  /** the filter keys of a state (no page), as stored on a queue record: 'Practise the next 10' draws from the same filter */
  const filterOf = f => Object.fromEntries(L().FKEYS.filter(k => k !== 'page' && f[k]).map(k => [k, String(f[k])]));

  /** a bottom sheet on the overlay stack (P1-25, P1-18): Back, Escape, the scrim and Close all close it; focus stays inside and returns to the opener.
      o = {id, title (text) or titleHtml, body, foot, opener, focus (selector of the part that gets focus: it starts in view), onRemove} */
  function sheet(o) {
    const scrim = U.h('div.pq-scrim');
    const box = U.h('div.pq-sheet', { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': o.id + '-h', tabindex: '-1' });
    box.innerHTML = `<div class="pq-sh-h"><h2 id="${o.id}-h">${o.titleHtml || esc(o.title)}</h2><button type="button" class="btn icon sm ghost" data-sh="close" aria-label="Close">${icon('x')}</button></div>
      <div class="pq-sh-b">${o.body || ''}</div>${o.foot ? `<div class="pq-sh-f">${o.foot}</div>` : ''}`;
    scrim.append(box); document.body.append(scrim);
    // the part that gets focus starts in view (the current palette cell of a 65-question paper sits far down the sheet): the sheet's body scrolls
    // to it before the sheet slides in, since focus itself never scrolls (preventScroll)
    const sb = U.$('.pq-sh-b', box), ft = o.focus ? U.$(o.focus, box) : null;
    if (sb && ft && sb.contains(ft)) {
      const r = ft.getBoundingClientRect(), br = sb.getBoundingClientRect();
      if (r.top < br.top || r.bottom > br.bottom) sb.scrollTop = Math.max(0, sb.scrollTop + r.top - br.top - Math.max(0, (br.height - r.height) / 2));
    }
    const opener = o.opener || document.activeElement;
    const undo = UI.isolate ? UI.isolate(scrim) : () => {}, untrap = UI.trap ? UI.trap(box) : () => {};
    let gone = false, ovId = null;
    const onKey = e => { if (e.key === 'Escape' && (!UI.overlay || UI.overlay.top() === ovId)) { e.preventDefault(); e.stopPropagation(); close(); } };
    function remove() {
      if (gone) return; gone = true;
      scrim.remove(); undo(); untrap(); document.removeEventListener('keydown', onKey, true);
      document.documentElement.classList.remove('pq-lock');
      if (o.onRemove) o.onRemove();
      if (opener && opener.isConnected && opener.focus) opener.focus({ preventScroll: true });
    }
    /** close from code; resolves once the sheet's history step is consumed (so a following replaceState lands on the page's own entry) */
    function close() { const id = ovId; remove(); return id && UI.overlay && UI.overlay.has(id) ? UI.overlay.pop(id) : Promise.resolve(true); }
    document.addEventListener('keydown', onKey, true);
    // a press on the scrim closes at once; its default action (focus to the pressed spot: <body>, after remove() gave it back) is cancelled,
    // so focus lands on the opener as it does for Escape, Close and Back (P1-48)
    scrim.addEventListener('mousedown', e => { if (e.target === scrim) { e.preventDefault(); close(); } });
    box.addEventListener('click', e => { if (e.target.closest && e.target.closest('[data-sh="close"]')) close(); });
    if (UI.overlay) ovId = UI.overlay.push({ id: o.id, kind: 'sheet', close: remove });
    document.documentElement.classList.add('pq-lock');
    requestAnimationFrame(() => scrim.classList.add('in'));
    setTimeout(() => { if (!gone) (box.querySelector(o.focus || '[data-sh="close"]') || box).focus({ preventScroll: true }); }, 30);
    return { el: box, close, remove, get open() { return !gone; } };
  }

  /** shared wording (P2-28, P2-66): GA.ui.str (WP1) when it has the key, else this page's own words */
  const str = (k, dflt) => (UI && UI.str && typeof UI.str[k] === 'string' && UI.str[k] ? UI.str[k] : dflt);
  const DIFF_N = { easy: 1, medium: 2, hard: 3 };
  /** the difficulty glyph as one image with its meaning (P3-21): a neutral ramp, never the error red; 'Hard (our estimate)' (P2-66) */
  const diffHtml = d => (DIFF_N[d] ? `<span class="diff pq-diff l${DIFF_N[d]}" role="img" aria-label="${esc(U.cap(d))} · ${esc(str('ourEstimate', 'our estimate'))}"><i></i><i></i><i></i></span>` : '');

  /** one tab stop for a row of radio-like buttons (P3-15, the pattern of GA.ui.roving): the checked button (else the first) is the row's only tab
      stop; arrows, Home and End move focus and select it with a click, so the row's own click handler does the filtering. Returns sync(), which
      re-applies the tab stop after a repaint. The listener lives on the row, which dies with the visit. */
  function rove(group, sel) {
    const items = () => U.$$(sel, group).filter(b => !b.hidden);
    const sync = () => { const it = items(), cur = it.find(b => b.getAttribute('aria-checked') === 'true') || it[0]; it.forEach(b => (b.tabIndex = b === cur ? 0 : -1)); };
    group.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const it = items(), i = it.indexOf(document.activeElement);
      if (i < 0) return;
      const k = e.key, j = k === 'ArrowRight' || k === 'ArrowDown' ? (i + 1) % it.length : k === 'ArrowLeft' || k === 'ArrowUp' ? (i - 1 + it.length) % it.length
        : k === 'Home' ? 0 : k === 'End' ? it.length - 1 : -1;
      if (j < 0) return;
      e.preventDefault();
      it[j].focus();
      if (it[j].getAttribute('aria-checked') !== 'true') it[j].click();
    });
    return sync;
  }

  /** one calm bank row: state dot, "paper · Q · subject · topic · marks · type" as plain text (compact, and without what the filter makes constant:
      P2-25), difficulty glyph, the honesty facts as text ('key questioned', 'not in the current syllabus': P2-24, P2-66), snippet, a down chevron
      (P3-33). Every icon carries its meaning as text for screen readers (P1-55); a question checked without an official key shows as seen (D9). */
  function stOf(e) { return e && e.n ? (e.lastOk ? 'ok' : e.g === 'partly' ? 'part' : 'bad') : e && e.seen ? 'seen' : ''; }
  const ST_TXT = { ok: 'Last time right (or got it)', bad: 'Last time missed', part: 'Last time partly', seen: 'Seen (not scored)', '': 'Not attempted' };
  /** the state dot; m = the question's catalogue row: a checked marks-to-all question is seen too, and says why (it has an official key) */
  function dotHtml(st, m) {
    const t = st === 'seen' && m && m.mta ? 'Seen (marks to all, not scored)' : ST_TXT[st];
    return `<span class="pqr-st ${st}" data-st="${st}" role="img" aria-label="${t}" title="${t}">${st === 'ok' ? icon('check') : st === 'bad' ? icon('x') : st === 'part' ? icon('minus') : ''}</span>`;
  }
  let DISP = null;
  const disputedQ = m => { if (m.disputed) return true; if (!DISP) DISP = new Set(L().disputedIds()); return DISP.has(m.id); };
  function tailHtml(m, e, f) {
    const show = !f || !f.diff;
    return [show && m.diff ? diffHtml(m.diff) : '',
      disputedQ(m) ? `<span class="pqr-kq">${icon('alert')}${esc(str('keyQuestioned', 'key questioned'))}</span>` : '',
      m.hasFig ? `<span class="pqr-ic" title="Has a figure">${icon('layers')}<span class="sr">has a figure</span></span>` : '',
      e && e.bm ? `<span class="pqr-ic bm" title="Bookmarked">${icon('bookmark')}<span class="sr">bookmarked</span></span>` : '',
      e && e.note ? `<span class="pqr-ic nt" title="Has your note">${icon('edit')}<span class="sr">has your note</span></span>` : '',
      m.legacy ? `<span class="pqr-leg">${esc(str('legacy', 'not in the current syllabus'))}</span>` : ''].join('');
  }
  /** the row's meta line: the compact parts and the tail; f = the filter state (constant parts are left out), omitted = every part */
  function metaHtml(D, m, e, f) {
    const r = L().rowParts ? L().rowParts(D, m, f || {}) : null;
    const parts = [`<b class="pqr-id">${esc(r ? r.id : `${UI.paperLabel(m)} · ${UI.qLabel(m)}`)}</b>`];
    if (r && r.subject) parts.push(`<span><span aria-hidden="true">${esc(r.subject.short)}</span><span class="sr">${esc(r.subject.name)}</span></span>`);
    if (r && r.topic) parts.push(`<span>${esc(r.topic)}</span>`);
    if (r && r.marks) parts.push(`<span>${r.marks}</span>`);
    if (r && r.type) parts.push(`<span>${r.type}</span>`);
    // each '·' travels with the part before it, so a wrapped phone line never starts with one
    const glued = parts.map((p, i) => (i < parts.length - 1 ? `<span class="pqr-p">${p}${dot}</span>` : p)).join('');
    return `${glued}<span class="pqr-tail">${tailHtml(m, e, f)}</span>`;
  }
  function rowHtml(D, m, q, e, extra, f) {
    return `<summary>${dotHtml(stOf(e), m)}
      <div class="pqr-b"><div class="pqr-t">${metaHtml(D, m, e, f)}${extra || ''}</div>
      <div class="pqr-s">${esc(L().snippet(q))}${m.grouped && !q.stem ? ' (shared passage)' : ''}</div></div>${icon('chev-d', 'pqr-chev')}</summary>`;
  }
  GA.pyqRow = rowHtml;

  /* ================================================================== the bank */
  /** the advanced filter controls (the inline panel on wide screens, the bottom sheet on phones); ids carry a prefix so both can exist */
  function advHtml(D, f, pre) {
    if (icaiBank(D)) return advIcai(D, f, pre);
    const P = L(), ts = P.types(f.type), on = (key, v) => (key === 'type' ? (v ? ts.includes(v) : !ts.length) : (f[key] || '') === v);
    const seg = (key, opts, label) => `<div class="seg pq-seg" data-seg="${key}" role="group" aria-label="${esc(label)}">${opts.map(o => `<button type="button" data-v="${o[0]}" class="${on(key, o[0]) ? 'on' : ''}" aria-pressed="${on(key, o[0])}">${o[1]}</button>`).join('')}</div>`;
    const sj = f.subject ? D.subjectById[f.subject] : null;
    const tOpt = t => `<option value="${t.id}"${f.topic === t.id ? ' selected' : ''}>${esc(t.name)}</option>`;
    const multiTopic = f.topic && P.listOf(f.topic).length > 1 ? `<option value="${esc(f.topic)}" selected>${esc(P.listOf(f.topic).map(id => D.name(id)).join(' + '))}</option>` : '';
    const keyF = f.key || (f.disputed ? 'disputed' : '');
    return `<div class="field"><label for="${pre}topic">Topic</label><select class="input" id="${pre}topic" data-f="topic"><option value="">Any topic</option>${multiTopic}${sj ? sj.topics.map(tOpt).join('') : D.subjects.map(s => `<optgroup label="${esc(s.name)}">${s.topics.map(tOpt).join('')}</optgroup>`).join('')}</select></div>
      <div class="field"><label for="${pre}from">From year</label><select class="input" id="${pre}from" data-f="from"><option value="">Any</option>${D.years.slice().reverse().map(y => `<option${String(f.from) === String(y) ? ' selected' : ''}>${y}</option>`).join('')}</select></div>
      <div class="field"><label for="${pre}to">To year</label><select class="input" id="${pre}to" data-f="to"><option value="">Any</option>${D.years.map(y => `<option${String(f.to) === String(y) ? ' selected' : ''}>${y}</option>`).join('')}</select></div>
      <div class="field"><label for="${pre}paper">Paper</label><select class="input" id="${pre}paper" data-f="paper"><option value="">All papers</option>${D.papers.slice().sort((a, b) => b.year - a.year || b.set - a.set).map(p => `<option value="${p.id}"${f.paper === p.id ? ' selected' : ''}>${esc(p.label)}</option>`).join('')}</select></div>
      <div class="field"><span class="lbl">Type</span>${seg('type', [['', 'All'], ['MCQ', 'MCQ'], ['MSQ', 'MSQ'], ['NAT', 'NAT']], 'Answer type')}</div>
      <div class="field"><span class="lbl">Marks</span>${seg('marks', [['', 'All'], ['1', '1'], ['2', '2']], 'Marks')}</div>
      <div class="field"><span class="lbl">${esc(str('difficulty', 'Difficulty (our estimate)'))}</span>${seg('diff', [['', 'All'], ['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']], str('difficulty', 'Difficulty (our estimate)'))}</div>
      <div class="field"><label for="${pre}key">Answer key</label><select class="input" id="${pre}key" data-f="key">${P.KEYF.map(k => `<option value="${k[0]}"${keyF === k[0] ? ' selected' : ''}>${k[1]}</option>`).join('')}</select></div>
      <div class="field"><label for="${pre}status">My status</label><select class="input" id="${pre}status" data-f="status">${P.STATUS.map(s => `<option value="${s[0]}"${f.status === s[0] ? ' selected' : ''}>${s[1]}</option>`).join('')}</select></div>
      <div class="field row"><label class="switch"><input type="checkbox" id="${pre}syl" data-f="syl"${f.syl ? ' checked' : ''}><span></span></label><label for="${pre}syl">Only topics in the current syllabus</label></div>
      <div class="field row"${f.subject && f.sec !== 'CS' ? ' hidden' : ''}><label class="switch"><input type="checkbox" id="${pre}sec" data-f="sec"${f.sec === 'CS' ? ' checked' : ''}><span></span></label><label for="${pre}sec">Technical section only (no General Aptitude)</label></div>`;
  }
  /** the ICAI bank's advanced filters (docs/ICAI_BANK.md §5): chapter, kind, attempt, scheme, type, document, status, difficulty (ours) and
      the syllabus switch */
  function advIcai(D, f, pre) {
    const P = L(), ts = P.types(f.type), on = (key, v) => (key === 'type' ? (v ? ts.includes(v) : !ts.length) : (f[key] || '') === v);
    const seg = (key, opts, label) => `<div class="seg pq-seg" data-seg="${key}" role="group" aria-label="${esc(label)}">${opts.map(o => `<button type="button" data-v="${o[0]}" class="${on(key, o[0]) ? 'on' : ''}" aria-pressed="${on(key, o[0])}">${o[1]}</button>`).join('')}</div>`;
    const sj = f.subject ? D.subjectById[f.subject] : null;
    const inBank = new Set(D.questions.map(q => q.topic).filter(Boolean));
    const tOpt = t => `<option value="${t.id}"${f.topic === t.id ? ' selected' : ''}>${esc(t.name)}${inBank.has(t.id) ? '' : ' (none yet)'}</option>`;
    const multiTopic = f.topic && P.listOf(f.topic).length > 1 ? `<option value="${esc(f.topic)}" selected>${esc(P.listOf(f.topic).map(id => D.name(id)).join(' + '))}</option>` : '';
    const atts = U.uniq(D.questions.map(q => q.attempt).filter(Boolean)).sort((a, b) => P.attemptOrd(b) - P.attemptOrd(a));
    const docs = D.papers.slice().sort((a, b) => b.year - a.year || b.set - a.set || (a.id < b.id ? -1 : 1));
    const old = D.questions.some(q => q.scheme === 'old');
    return `<div class="field"><label for="${pre}topic">Chapter</label><select class="input" id="${pre}topic" data-f="topic"><option value="">Any chapter</option>${multiTopic}${sj ? sj.topics.map(tOpt).join('') : D.subjects.map(s => `<optgroup label="${esc(s.name)}">${s.topics.map(tOpt).join('')}</optgroup>`).join('')}</select></div>
      <div class="field"><label for="${pre}kind">Kind</label><select class="input" id="${pre}kind" data-f="kind">${P.KINDS.map(k => `<option value="${k[0]}"${(f.kind || '') === k[0] ? ' selected' : ''}>${k[1]}</option>`).join('')}</select></div>
      <div class="field"><label for="${pre}attempt">Attempt</label><select class="input" id="${pre}attempt" data-f="attempt"><option value="">Any attempt</option>${atts.map(a => `<option value="${a}"${f.attempt === a ? ' selected' : ''}>${esc(P.attemptName(a))}</option>`).join('')}</select></div>
      <div class="field"><label for="${pre}paper">Document</label><select class="input" id="${pre}paper" data-f="paper"><option value="">All documents</option>${docs.map(p => `<option value="${p.id}"${f.paper === p.id ? ' selected' : ''}>${esc(p.title || p.label)}</option>`).join('')}</select></div>
      <div class="field"><span class="lbl">Type</span>${seg('type', [['', 'All'], ['MCQ', 'MCQ'], ['DESC', 'Descriptive']], 'Question type')}</div>
      ${old ? `<div class="field"><span class="lbl">Scheme</span>${seg('scheme', [['', 'Both'], ['new', 'New'], ['old', 'Old (2019–23)']], 'Scheme')}</div>` : ''}
      <div class="field"><span class="lbl">${esc(str('difficulty', 'Difficulty (our estimate)'))}</span>${seg('diff', [['', 'All'], ['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']], str('difficulty', 'Difficulty (our estimate)'))}</div>
      <div class="field"><label for="${pre}status">My status</label><select class="input" id="${pre}status" data-f="status">${P.STATUS.map(s => `<option value="${s[0]}"${f.status === s[0] ? ' selected' : ''}>${s[1]}</option>`).join('')}</select></div>
      ${old ? `<div class="field row"><label class="switch"><input type="checkbox" id="${pre}oos" data-f="oos"${f.oos ? ' checked' : ''}><span></span></label><label for="${pre}oos">Only topics in the current syllabus</label></div>` : ''}`;
  }
  /** the filter patch an event inside an advanced panel asks for, or null */
  function advPatch(e) {
    const t = e.target;
    if (e.type === 'click') {
      const b = t.closest && t.closest('[data-seg] [data-v]');
      return b ? { [b.closest('[data-seg]').dataset.seg]: b.dataset.v } : null;
    }
    const k = t && t.dataset && t.dataset.f;
    if (!k) return null;
    if (k === 'syl') return { syl: t.checked ? '2027' : '' };
    if (k === 'oos') return { oos: t.checked ? 'hide' : '' };
    if (k === 'sec') return { sec: t.checked ? 'CS' : '' };
    // the one Answer key select (P3-20) also clears the older key filters a link may have brought (disputed=1, special=1)
    if (k === 'key') return { key: t.value, disputed: '', special: '' };
    if (k === 'topic') return { topic: t.value, sub: '' };
    return { [k]: t.value };
  }
  /** keep an open panel's controls in step with the state (in place, so a focused control keeps focus) */
  function syncAdv(root, D, f) {
    if (!root) return;
    const P = L(), ts = P.types(f.type);
    U.$$('[data-seg]', root).forEach(sg => { const key = sg.dataset.seg; U.$$('[data-v]', sg).forEach(b => { const v = b.dataset.v, on = key === 'type' ? (v ? ts.includes(v) : !ts.length) : (f[key] || '') === v; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); }); });
    const set = (k, v) => { const el = U.$(`[data-f="${k}"]`, root); if (el && el !== document.activeElement && el.value !== v) el.value = v; };
    set('from', String(f.from || '')); set('to', String(f.to || '')); set('paper', f.paper || ''); set('status', f.status || '');
    set('kind', f.kind || ''); set('attempt', f.attempt || '');
    const oos = U.$('[data-f="oos"]', root); if (oos) oos.checked = !!f.oos;
    set('key', f.key || (f.disputed ? 'disputed' : ''));
    const syl = U.$('[data-f="syl"]', root); if (syl) syl.checked = !!f.syl;
    const sec = U.$('[data-f="sec"]', root); if (sec) { sec.checked = f.sec === 'CS'; sec.closest('.field').hidden = !!f.subject && f.sec !== 'CS'; }   // moot inside one subject
    const tp = U.$('[data-f="topic"]', root);
    if (tp && tp !== document.activeElement && (tp.dataset.subj || '') !== (f.subject || '')) {
      // the topic list follows the subject: rebuild it from a fresh panel's markup
      const tmp = document.createElement('div'); tmp.innerHTML = advHtml(D, f, 'x-');
      tp.innerHTML = U.$('[data-f="topic"]', tmp).innerHTML; tp.dataset.subj = f.subject || '';
    }
    if (tp && tp !== document.activeElement) tp.value = f.topic || '';
  }

  /** the bank's one honest empty state while the build ships no ICAI question (GA.pyqLib.isEmpty): a header, GA.ui.bankEmptyCard and one coral
      to the shared next lesson (else Learn). The ICAI bank plugs in through D.questions / D.papers (see core/pyqlib.js, 'the empty ICAI bank'). */
  function emptyBank(out, D, title) {
    const P = L(), st = P.emptyStep(GA.store && GA.store.state, D);
    const cta = `<a class="btn pop" href="${esc(st.href)}">${icon('book')}<span>${esc(st.label)}${st.title && st.label === 'Next lesson' ? ': ' + esc(st.title) : ''}</span></a>`;
    const card = UI.bankEmptyCard ? UI.bankEmptyCard({ cta, peak: { gaze: 'down' } })
      : UI.empty('target', 'ICAI past papers, RTPs and MTPs are being added', 'Until they are, practise with the self-checks and flashcards in each lesson.', cta);
    out.innerHTML = `<div class="pyq pr-page pq-empty-page">
      <header class="pr-head pq-head"><div class="pr-ht"><h1>${esc(title || 'ICAI questions')}</h1>
        <p>Past papers, RTPs and MTPs of the Group II papers, with ICAI's suggested answers.</p></div></header>
      <section class="pq-empty">${card}</section></div>`;
  }

  GA.views.pyq = {
    async enter(ctx, out) {
      await ensureLib();
      if (ctx.stale()) return;
      const S = GA.store, D = DATA.D, P = L();
      GA.shell.crumbs([['Questions', '#/pyq']]);                  // the tab's name: document title 'Questions · PassBook' (P2-12)
      if (P.isEmpty && P.isEmpty(D)) { emptyBank(out, D); return; }   // no ICAI bank yet: one honest empty state, nothing else
      let f = P.parse(ctx.query), sortSet = !!ctx.query.sort;
      let post = null, postState = 'idle', all = [], pageQs = [], seq = 0, by = {}, lastFailed = false;
      const V = GA.views.pyq;
      const needsPost = x => { if (!x.q || !String(x.q).trim()) return false; const p = P.parseQuery(x.q, { D }); return !p.id && p.terms.some(t => t.replace(/\s+/g, '').length >= 2); };
      async function loadPost() {
        if (post || postState === 'failed') return;
        postState = 'loading';
        try { const p = await DATA.searchPostings(); post = p && typeof p === 'object' && Object.keys(p).length ? p : null; postState = post ? 'ok' : 'failed'; }
        catch (e) { postState = 'failed'; }
      }

      // the session link #/pyq?<filters>&practise=N (planner rows, lesson links): act once, replace the address, open the first question
      if (ctx.query.practise) {
        if (needsPost(f)) await loadPost();
        // a navigation while the document is still loading replaces the entry instead of adding one: wait, so Back keeps the list
        if (document.readyState !== 'complete') await new Promise(r => addEventListener('load', () => setTimeout(r, 0), { once: true }));
        if (ctx.stale()) return;
        writeUrl(url(f));
        if (startPractice(D, f, needsPost(f) && !post ? [] : P.filter(D, f, S, post), Math.min(30, Math.max(1, +ctx.query.practise || 10)))) return;
      }

      const unkeyed = D.papers.filter(p => !p.keyed), noKey = unkeyed.reduce((a, p) => a + (p.n || 0), 0);
      const yr = ps => { const ys = ps.map(p => p.year); const a = Math.min(...ys), b = Math.max(...ys); return a === b ? String(a) : `${a}–${b}`; };
      const years = D.years.length ? `${Math.min(...D.years)}–${Math.max(...D.years)}` : '';
      const advOpen0 = !phone() && ss.get('ga-pq-adv') === 1;        // never opens by itself (P1-25): only the learner's own choice this session
      const icaiLine = () => {
        const kinds = U.uniq(D.papers.map(p => p.kind)), name = { pyq: 'past papers', rtp: 'RTPs', mtp: 'MTPs' };
        const atts = U.uniq(D.questions.map(q => q.attempt).filter(Boolean)).sort((a, b) => P.attemptOrd(a) - P.attemptOrd(b));
        const span = atts.length ? (atts.length === 1 ? P.attemptName(atts[0]) : `${P.attemptName(atts[0])} – ${P.attemptName(atts[atts.length - 1])}`) : '';
        return `<b>${U.nf(D.questions.length)}</b> ICAI ${D.questions.length === 1 ? 'item' : 'items'} from ${U.plural(D.papers.length, 'document')} (${kinds.map(k => name[k]).filter(Boolean).join(', ')}${span ? ', ' + span : ''}), with ICAI's own answers, word for word.`;
      };
      out.innerHTML = `<div class="pyq pr-page">
        <header class="pr-head pq-head"><div class="pr-ht"><h1>ICAI questions</h1>
          <p>${icaiBank(D) ? icaiLine() : `<b>${U.nf(D.questions.length)}</b> ${D.questions.length === 1 ? 'question' : 'questions'} from ${U.plural(D.papers.length, 'ICAI paper')}${years ? ` (${years})` : ''}; answers as ICAI published them${noKey ? `, none exists for ${yr(unkeyed)}` : ''}.`}<span id="pq-att"></span> <a class="pq-src" href="#/about">Sources</a></p></div>
          <div class="pr-acts"><button class="btn pop pq-go" type="button" id="practise">${icon('play')}<span class="pq-go-t"><span id="pq-go-l">Practise</span><small id="pq-go-s"></small></span></button>
            <span class="pq-mk"><button class="btn" type="button" id="mk-test" aria-describedby="mk-why">${icon('timer')}<span>Make a test</span></button><small id="mk-why" class="pq-why"></small></span></div></header>
        <section class="pq-filters" aria-label="Filters">
          <div class="pq-row1"><label class="pq-search">${icon('search')}<span class="sr">Search the bank</span><input id="pq-q" class="input" type="search" placeholder="${icaiBank(D) ? 'Search words, or “rtp sep 2026 q5”' : 'Search words, or a question number like “q3”'}" value="${esc(f.q)}" autocomplete="off" spellcheck="false" enterkeyhint="search"></label>
            <select class="input" id="pq-sort" aria-label="Sort"></select>
            <button type="button" class="btn pq-bmq" id="pq-bmq" aria-pressed="false" hidden>${icon('bookmark')}<span>Bookmarked</span><em></em></button>
            <button type="button" class="btn pq-advb" id="pq-adv" aria-expanded="${advOpen0}" aria-controls="pq-advp">${icon('filter')}<span>Filters</span><em hidden></em></button></div>
          <div class="pq-subj" role="radiogroup" aria-label="Subject"><button type="button" role="radio" aria-checked="false" data-subj=""><span aria-hidden="true">All</span><span class="sr">All subjects</span> <em></em></button>${D.subjects.map(s => `<button type="button" role="radio" aria-checked="false" data-subj="${s.id}" title="${esc(s.name)}"><span aria-hidden="true">${esc(s.short)}</span><span class="sr">${esc(s.name)}</span> <em></em></button>`).join('')}<button type="button" role="radio" aria-checked="false" data-subj="?" hidden>Unclassified <em></em></button></div>
          <div class="pq-tops" id="pq-tops" role="radiogroup" hidden></div>
          <div class="pq-adv" id="pq-advp"${advOpen0 ? '' : ' hidden'}>${advOpen0 ? advHtml(D, f, 'pq-') : ''}</div></section>
        <div class="pq-meta" id="pq-meta"></div>
        <div class="pq-results" id="pq-res"></div>
        <nav class="pq-pager" id="pq-pager" aria-label="Pages" hidden></nav>
      </div>`;
      const $ = s => U.$(s, out), res = $('#pq-res'), meta = $('#pq-meta'), pager = $('#pq-pager');
      const roveSubj = rove($('.pq-subj'), '[data-subj]'), roveTops = rove($('#pq-tops'), '[data-topic]');
      /** the subject the result line names (P2-27) */
      const scopeTxt = () => (f.subject && D.subjectById[f.subject] ? (U.medName ? U.medName(D.subjectById[f.subject].name) : D.subjectById[f.subject].name) : '');
      let advEl = advOpen0 ? $('#pq-advp') : null, sh = null, pend = null;
      // open rows survive Back from a question (history.state of this entry)
      const open = new Set(((history.state && history.state.pqOpen) || []).filter(id => D.qById[id]));
      const keepOpen = () => writeUrl(location.hash, { pqOpen: [...open] });

      /* ---------------------------------------------------------- paint (in place) */
      const nAdv = x => ADV.filter(k => x[k]).length;
      function paintHead() {
        const tt = P.testable(all), keyedN = tt.keyed;
        const set = P.practiseSet(all, S, { n: 10, served: served(P.bankKey(f)) });
        const b = $('#practise'), n = set.ids.length;
        // every list with questions has a set, so only a filter that matches nothing has no coral (D18 exempts no-match states); a list of only
        // marks-to-all questions practises them unscored, like an unkeyed paper (D9)
        const off = !n;
        b.disabled = off; b.classList.toggle('pop', !off);
        $('#pq-go-l').textContent = off ? str('nothingToPractise', 'Nothing to practise') : 'Practise ' + n;
        $('#pq-go-s').textContent = off ? '' : keyedN === all.length ? `of ${U.plural(all.length, icaiBank(D) ? 'item' : 'question')}` : keyedN ? `of ${U.nf(keyedN)} ${icaiBank(D) ? 'with ICAI’s answer' : 'with a key'}`
          : `of ${U.nf(set.pool)} · ${set.mta ? 'marks to all' : 'no key'}, not scored`;
        // 'Make a test' needs 3 questions with an official key (P0-05): an unkeyed filter says why instead of failing later
        const mk = $('#mk-test'), why = $('#mk-why');
        mk.disabled = !tt.ok;
        why.textContent = tt.why;
        why.hidden = !why.textContent;
        const att = D.questions.filter(q => P.seenOf(S.state.q[q.id])).length;
        $('#pq-att').innerHTML = att ? ` <b>${U.nf(att)}</b> attempted so far.` : '';
      }
      function paintBar(failed) {
        const inp = $('#pq-q');
        if (inp !== document.activeElement && inp.value.trim() !== (f.q || '')) inp.value = f.q || '';
        const sel = $('#pq-sort'), opts = P.SORTS.filter(s => s[0] !== 'best' || (f.q && String(f.q).trim()) || f.sort === 'best');
        const want = opts.map(s => s[0]).join(',');
        if (sel.dataset.opts !== want) { sel.innerHTML = opts.map(s => `<option value="${s[0]}">${s[1]}</option>`).join(''); sel.dataset.opts = want; }
        if (sel.value !== f.sort) sel.value = f.sort;
        // Bookmarked · N (D12, P2-65): only once something is bookmarked
        const bmN = D.questions.filter(q => S.state.q[q.id] && S.state.q[q.id].bm).length, bq = $('#pq-bmq');
        bq.hidden = !bmN && f.status !== 'bookmarked';
        U.$('em', bq).textContent = bmN ? U.nf(bmN) : '';
        bq.setAttribute('aria-pressed', String(f.status === 'bookmarked')); bq.classList.toggle('on', f.status === 'bookmarked');
        bq.setAttribute('aria-label', `Bookmarked: ${U.plural(bmN, 'question')}`);
        const ab = $('#pq-adv'), k = nAdv(f), em = U.$('em', ab);
        em.hidden = !k; em.textContent = k || ''; ab.classList.toggle('has', k > 0);
        ab.setAttribute('aria-expanded', String(!!advEl && !$('#pq-advp').hidden));
        // subject row: counts for the current filter without its subject, updated in place
        // (no counts while the search index is missing: a name-only count would be a wrong number)
        const counts = failed ? {} : U.countBy(P.filter(D, Object.assign({}, f, { subject: '', topic: '', sub: '', page: 1, sort: 'new' }), S, post), q => q.subject);
        const allN = Object.values(counts).reduce((a, b) => a + b, 0);
        U.$$('.pq-subj [data-subj]', out).forEach(btn => {
          const id = btn.dataset.subj, n = id ? counts[id] || 0 : allN, on = (f.subject || '') === id;
          btn.classList.toggle('on', on); btn.setAttribute('aria-checked', String(on)); btn.classList.toggle('z', !failed && !n && !on);
          U.$('em', btn).textContent = failed ? '' : U.nf(n);
          if (id === '?') btn.hidden = !n && !on;
        });
        roveSubj();
        paintTopics(failed);
        syncAdv(advEl, D, f);
      }
      /** the topic row (P2-27): under a selected subject, its topics with real counts under the other filters, '✓ 7/12' once some are attempted,
          greyed at 0; one tab stop with arrow keys like the subject row (P3-15). Rebuilt when the subject changes, otherwise updated in place. */
      const tops = $('#pq-tops');
      function paintTopics(failed) {
        const sj = f.subject && D.subjectById[f.subject];
        const row = sj && !failed ? P.topicRow(D, f, S, post) : [];
        tops.hidden = !row.length;
        if (!row.length) { if (tops._key) { tops.innerHTML = ''; tops._key = ''; } return; }
        const want = sj.id + ':' + row.map(t => t.id).join(',');
        if (tops._key !== want) {                         // (a property, not a data-subj attribute: the subject row's click handler matches those)
          tops.setAttribute('aria-label', 'Topic in ' + sj.name);
          tops.innerHTML = `<button type="button" role="radio" aria-checked="false" data-topic=""><span>All topics</span><em></em></button>` +
            row.map(t => `<button type="button" role="radio" aria-checked="false" data-topic="${esc(t.id)}"><span>${esc(t.name)}</span><em></em></button>`).join('');
          tops._key = want;
        }
        const sel = new Set(P.listOf(f.topic)), allN = row.reduce((a, t) => a + t.n, 0), seenN = row.reduce((a, t) => a + t.seen, 0);
        const cnt = (n, seen) => (seen ? `<span aria-hidden="true"><b>✓</b> ${U.nf(seen)}/${U.nf(n)}</span><span class="sr">: ${U.nf(seen)} of ${U.plural(n, 'question')} attempted</span>` : `<span aria-hidden="true">${U.nf(n)}</span><span class="sr">: ${U.plural(n, 'question')}</span>`);
        U.$$('[data-topic]', tops).forEach(b => {
          const id = b.dataset.topic, t = id ? row.find(x => x.id === id) : null, n = t ? t.n : allN, seen = t ? t.seen : seenN, on = id ? sel.has(id) : !sel.size;
          b.setAttribute('aria-checked', String(on)); b.classList.toggle('on', on); b.classList.toggle('z', !n && !on);
          const h = cnt(n, seen), em = U.$('em', b); if (em.innerHTML !== h) em.innerHTML = h;
        });
        roveTops();
        edge(tops);
      }
      /** a scroll row with more to its right gets the edge fade (phones) */
      const edge = row => { if (row) row.classList.toggle('more', row.scrollWidth - row.clientWidth - row.scrollLeft > 4); };
      [$('.pq-subj'), tops].forEach(row => row.addEventListener('scroll', () => edge(row), { passive: true }));
      function paintMeta(failed) {
        const m = all.meta, labels = P.chipLabels(D, f);
        const notes = [];
        if (!failed && m) {
          if (m.fixed.length) notes.push(`Showing results for “${esc(m.fixed.join(', '))}”`);
          if (m.partial) notes.push('Partial matches: no question has every word');
          if (m.unmatched.length) notes.push(`Ignored: ${esc(m.unmatched.join(', '))}`);
        }
        const chips = labels.map(([k, label]) => `<button type="button" class="pq-chip${k === 'status' && f.status === 'bookmarked' ? ' bmc' : ''}" data-clear="${k}" aria-label="${esc('Remove filter: ' + label)}">${esc(label)}${icon('x')}</button>`);
        const had = document.activeElement && meta.contains(document.activeElement) ? document.activeElement : null;
        const hadKey = had && had.dataset ? (had.dataset.clear || had.id) : null;
        // phones: the Bookmarked quick filter sits on this line (the bar has no room for it next to sort and Filters)
        const bmN = D.questions.filter(q => S.state.q[q.id] && S.state.q[q.id].bm).length, bmOn = f.status === 'bookmarked';
        const bmq = bmN || bmOn ? `<button type="button" class="pq-chip pq-bmq-m${bmOn ? ' on' : ''}" data-quick="bm" aria-pressed="${bmOn}" aria-label="Bookmarked: ${esc(U.plural(bmN, 'question'))}">${icon('bookmark')}<span>Bookmarked</span><em>${U.nf(bmN)}</em></button>` : '';
        // the count line is the list's heading (P3-06): '152 questions in Operating Systems'
        const noun = icaiBank(D) ? 'item' : 'question';
        meta.innerHTML = `<h2 class="pq-n" id="pq-n" tabindex="-1">${failed ? 'Search is not available' : `<b>${U.nf(all.length)}</b> ${noun}${all.length === 1 ? '' : 's'}${scopeTxt() ? ' in ' + esc(scopeTxt()) : ''}`}</h2>${notes.length ? `<span class="pq-note">${notes.join(' · ')}</span>` : ''}${chips.length ? `<span class="pq-chips">${chips.join('')}</span>` : ''}${chips.length > 1 ? '<button type="button" class="btn sm ghost" id="pq-clear">Clear all</button>' : ''}<span class="grow"></span>${bmq}${pageQs.length ? `<button type="button" class="btn sm ghost" id="pq-expand">${pageQs.every(q => open.has(q.id)) ? 'Collapse all' : 'Expand all on page'}</button>` : ''}`;
        // the focused chip was removed: hand focus to the next chip, else the count (never the page body, P1-48)
        if (had && !had.isConnected) {
          const same = hadKey && (U.$(`[data-clear="${hadKey}"]`, meta) || U.$('#' + hadKey, meta));
          (same || U.$('.pq-chip', meta) || U.$('#pq-n', meta)).focus({ preventScroll: true });
        }
      }
      function paintPager() {
        const pages = Math.max(1, Math.ceil(all.length / PAGE));
        const had = document.activeElement && pager.contains(document.activeElement) ? document.activeElement.dataset.dir : null;
        pager.hidden = pages <= 1;
        pager.innerHTML = pages <= 1 ? '' : `${f.page > 1 ? `<button type="button" class="btn sm" data-page="${f.page - 1}" data-dir="prev">${icon('arrow-l')}<span>Previous</span></button>` : '<span></span>'}<span class="muted">Page <b>${f.page}</b> of ${pages}</span>${f.page < pages ? `<button type="button" class="btn sm" data-page="${f.page + 1}" data-dir="next"><span>Next</span>${icon('arrow-r')}</button>` : '<span></span>'}`;
        if (had) { const b = U.$(`[data-dir="${had}"]`, pager) || U.$('[data-dir]', pager); if (b) b.focus({ preventScroll: true }); else U.$('#pq-n', meta).focus({ preventScroll: true }); }
      }
      const emptyHtml = () => {
        // the mixed review before any lesson is finished is a true empty state, not a no-match: it gets the real next step as its coral (D18)
        if (f.status === 'learned' && !P.learnedSubs(S.state, D).size) {
          const N = GA.stats && GA.stats.nextStep;
          let step = null; try { step = typeof N === 'function' ? N(S.state, D, { kind: 'lesson', scope: 'all', today: U.today() }) : null; } catch (e) { step = null; }
          const go = step && step.href ? `<a class="btn pop" href="${esc(step.href)}">${icon('book')}<span>${esc(step.label || 'Start')}${step.title ? ': ' + esc(step.title) : ''}</span></a>` : `<a class="btn pop" href="#/syllabus">${icon('book')}<span>Pick a lesson</span></a>`;
          return `<div class="pr-empty">${UI.empty('book', 'No finished lessons yet', 'Mixed review draws past questions from the lessons you have finished. Finish one and its questions show up here.', go + '<button type="button" class="btn" data-clearall>Clear filters</button>', { peak: { gaze: 'down', mood: 'idle' } })}</div>`;
        }
        const m = all.meta, un = m && m.unmatched && m.unmatched.length ? `No question in the bank mentions “${esc(m.unmatched.join(', '))}”. ${icaiBank(D) ? 'Try a topic (“economic order quantity”), a paper (“costing”) or a document (“rtp sep 2026 q5”).' : 'Try a topic (“page replacement”), a subject code (“os”) or a paper (“2019 cs 37”).'}` : 'Loosen a filter, or clear them all.';
        return `<div class="pr-empty">${UI.empty('search', 'No questions match', un, '<button type="button" class="btn" data-clearall>Clear filters</button>')}</div>`;
      };
      function mountCard(d) {
        if (d.dataset.loaded || !by[d.dataset.id]) return;
        d.dataset.loaded = '1';
        U.$('.pqr-x', d).append(GA.qcard.create(by[d.dataset.id], { mode: 'practice' }).el);
      }
      async function paintRows(my, failed) {
        if (failed) {
          res.dataset.ids = '';
          UI.loadFailed(res, { what: 'search', main: true, retry: () => { postState = 'idle'; return retried(); } });
          return;
        }
        if (!pageQs.length) { res.dataset.ids = ''; res.innerHTML = emptyHtml(); return; }
        const ids = pageQs.map(q => q.id), key = ids.join(',');
        if (res.dataset.ids === key) { refreshRows(); return; }        // the same rows: keep them (open cards, focus)
        res.setAttribute('aria-busy', 'true');
        const skT = setTimeout(() => { if (my === seq) { res.dataset.ids = ''; res.innerHTML = ids.map(() => '<div class="pqr pq-sk"><span class="sk" style="height:14px;width:46%"></span><span class="sk" style="height:12px;width:88%;margin-top:10px"></span></div>').join(''); } }, 120);
        let full;
        try { full = await DATA.questions(ids); }
        catch (e) {
          clearTimeout(skT); if (my !== seq || ctx.stale()) return;
          res.removeAttribute('aria-busy'); res.dataset.ids = '';
          UI.loadFailed(res, { what: 'paper', retry: () => retried() });
          return;
        }
        clearTimeout(skT);
        if (my !== seq || ctx.stale()) return;
        by = Object.fromEntries(full.map(q => [q.id, q]));
        res.innerHTML = pageQs.map(m => `<details class="pqr" data-id="${esc(m.id)}"${open.has(m.id) ? ' open' : ''}>${rowHtml(D, m, by[m.id] || m, S.state.q[m.id], '', f)}<div class="pqr-x"></div></details>`).join('');
        res.dataset.ids = key; res.removeAttribute('aria-busy');
        U.$$('.pqr[open]', res).forEach(mountCard);
      }
      /** a row's dot and glyphs after an answer, a bookmark or a note (store change), without touching open cards */
      function refreshRows() {
        U.$$('.pqr', res).forEach(d => {
          const m = D.qById[d.dataset.id], e = S.state.q[d.dataset.id], st = stOf(e);
          const dt = U.$('summary > .pqr-st', d);
          if (dt && dt.dataset.st !== st) dt.outerHTML = dotHtml(st, m);
          // the meta line follows the store (bookmark, note) and the filter (a part that became constant or stopped being so)
          const t = U.$('summary .pqr-t', d); if (t && m) { const h = metaHtml(D, m, e, f); if (t._h !== h) { t.innerHTML = h; t._h = h; } }
        });
      }
      /** 'Try again' on a failure card in the list (P1-48): repaint, then focus what replaced the card (the count line, or the new card's own
          Try again when it failed again) and announce the count, instead of leaving focus on the page body */
      function retried() {
        return update({ say: true }).then(() => {
          const a = document.activeElement;
          if (a && a !== document.body && out.contains(a) && a.isConnected) return;
          const again = U.$('[data-retry]', res), c = U.$('#pq-n', meta);
          (again && !again.disabled ? again : c || res).focus({ preventScroll: true });
        });
      }

      /** recompute and repaint everything that depends on the filter; o.say announces the new count (P1-48) */
      async function update(o) {
        o = o || {};
        const my = ++seq;
        if (needsPost(f) && !post && postState !== 'failed') { await loadPost(); if (my !== seq || ctx.stale()) return; }
        const failed = needsPost(f) && !post;
        all = failed ? [] : P.filter(D, f, S, post);
        const pages = Math.max(1, Math.ceil(all.length / PAGE));
        f.page = Math.min(Math.max(1, +f.page || 1), pages);
        pageQs = all.slice((f.page - 1) * PAGE, f.page * PAGE);
        paintHead(); paintBar(failed); paintMeta(failed); paintPager();
        lastFailed = failed;
        if (!o.keepUrl) writeUrl(url(f));
        if (o.say) UI.say(failed ? 'Search index did not load' : U.plural(all.length, 'question') + (scopeTxt() ? ' in ' + scopeTxt() : '') + (all.meta && all.meta.partial ? ', partial matches' : ''));
        await paintRows(my, failed);
      }
      /** a filter change from the learner: merge, reset the page, repaint in place */
      function go(patch, o) {
        const n = Object.assign({}, f, patch);
        if ('subject' in patch && patch.subject !== f.subject) { n.topic = ''; n.sub = ''; }
        if (!('page' in patch)) n.page = 1;
        if ('sort' in patch) sortSet = true;
        else if ('q' in patch && !sortSet) n.sort = P.defaultSort(n);
        if (n.sort === 'best' && !String(n.q || '').trim() && !sortSet) n.sort = 'new';
        f = n;
        return update(Object.assign({ say: true }, o || {}));
      }
      V._go = go;                      // tests and the self-test drive the bank through the same path

      /* ---------------------------------------------------------- wiring (delegated on this visit's host) */
      const inp = $('#pq-q');
      let typeT = null;
      inp.addEventListener('input', () => { clearTimeout(typeT); typeT = setTimeout(() => go({ q: inp.value.trim() }), 250); });
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); clearTimeout(typeT); go({ q: inp.value.trim() }); } });
      V._t = () => clearTimeout(typeT);
      $('#pq-sort').addEventListener('change', e => go({ sort: e.target.value }));
      $('#pq-bmq').addEventListener('click', () => go({ status: f.status === 'bookmarked' ? '' : 'bookmarked' }));
      U.on(out, 'click', '[data-quick="bm"]', () => go({ status: f.status === 'bookmarked' ? '' : 'bookmarked' }).then(() => { const b = U.$('[data-quick="bm"]', meta); if (b) b.focus({ preventScroll: true }); }));
      $('#pq-adv').addEventListener('click', e => {
        if (phone()) { openFilters(e.currentTarget); return; }
        const p = $('#pq-advp');
        if (!advEl) { p.innerHTML = advHtml(D, f, 'pq-'); advEl = p; U.$('[data-f="topic"]', p).dataset.subj = f.subject || ''; }
        p.hidden = !p.hidden; ss.set('ga-pq-adv', p.hidden ? 0 : 1);
        e.currentTarget.setAttribute('aria-expanded', String(!p.hidden));
      });
      if (advEl) U.$('[data-f="topic"]', advEl).dataset.subj = f.subject || '';
      const advChange = e => { const p = advPatch(e); if (p) go(p); };
      $('#pq-advp').addEventListener('change', advChange);
      $('#pq-advp').addEventListener('click', advChange);
      U.on(out, 'click', '[data-subj]', (e, b) => { go({ subject: b.dataset.subj }); });
      U.on(out, 'click', '[data-topic]', (e, b) => { go({ topic: b.dataset.topic, sub: '' }); });
      U.on(out, 'click', '[data-clear]', (e, b) => go({ [b.dataset.clear]: '' }));
      const clearAll = () => { const n = P.parse({}); sortSet = false; f = Object.assign(n, { q: '' }); inp.value = ''; return update({ say: true }); };
      U.on(out, 'click', '#pq-clear, [data-clearall]', () => { clearAll().then(() => { const c = U.$('#pq-n', meta); if (c && (!document.activeElement || document.activeElement === document.body)) c.focus({ preventScroll: true }); }); });
      U.on(out, 'click', '[data-page]', (e, b) => {
        go({ page: +b.dataset.page }, { say: false }).then(() => {
          const top = meta.getBoundingClientRect().top;
          if (top < 0 || top > innerHeight) scrollTo({ top: Math.max(0, scrollY + top - 90), behavior: calm() ? 'auto' : 'smooth' });
        });
      });
      U.on(out, 'click', '#pq-expand', () => {
        const allOpen = pageQs.every(q => open.has(q.id));
        U.$$('.pqr', res).forEach(d => { d.open = !allOpen; if (!allOpen) { open.add(d.dataset.id); mountCard(d); } else open.delete(d.dataset.id); });
        keepOpen(); paintMeta(false);
      });
      res.addEventListener('toggle', e => {
        const d = e.target; if (!d.classList || !d.classList.contains('pqr')) return;
        if (d.open) { open.add(d.dataset.id); mountCard(d); } else open.delete(d.dataset.id);
        keepOpen();
      }, true);
      $('#practise').addEventListener('click', () => { if (all.length) startPractice(D, f, all, 10); });
      $('#mk-test').addEventListener('click', () => {
        // the whole filter goes to the builder, which says how many of them can be scored and picks only those (WP10)
        if (!P.testable(all).ok) return;
        Queue.set(all.map(q => q.id), P.chipLabels(D, f).map(x => x[1]).join(' · ') || 'All questions', { bank: url(f), kind: 'test' });
        GA.router.go('/test', { new: 'filtered' });
      });
      // an answer, a bookmark or a note inside an open row: dots, counts and both Bookmarked filters follow (the phone one lives on the count line)
      const offStore = S.on ? S.on('change', tag => { if (tag === 'time' || !out.isConnected) return; refreshRows(); paintHead(); paintBar(lastFailed); paintMeta(lastFailed); }) : null;
      V._off = offStore;

      /* ---------------------------------------------------------- phones: Filters as a bottom sheet, applied once with 'Show N questions' */
      function openFilters(opener) {
        if (sh && sh.open) return;
        pend = Object.assign({}, f);
        const count = () => (needsPost(pend) && !post ? 0 : P.filter(D, pend, S, post).length);
        const showTxt = n => n ? `Show ${U.plural(n, 'question')}` : 'No questions match';
        sh = sheet({ id: 'pq-filters', title: 'Filters', opener, body: `<div class="pq-adv pq-adv-sh">${advHtml(D, pend, 'pqs-')}</div>`,
          foot: `<button type="button" class="btn ghost" data-sh="reset">Clear filters</button><button type="button" class="btn primary pq-show" data-sh="apply">${showTxt(count())}</button>`,
          focus: '[data-f="topic"]', onRemove: () => { sh = null; } });
        const root = sh.el;
        U.$('[data-f="topic"]', root).dataset.subj = pend.subject || '';
        const repaint = () => { syncAdv(U.$('.pq-adv-sh', root), D, pend); const n = count(), b = U.$('[data-sh="apply"]', root); b.textContent = showTxt(n); b.disabled = !n; };
        const onChange = e => { const p = advPatch(e); if (!p) return; Object.assign(pend, p); repaint(); };
        root.addEventListener('change', onChange);
        root.addEventListener('click', e => {
          const a = e.target.closest && e.target.closest('[data-sh]');
          if (!a) { onChange(e); return; }
          if (a.dataset.sh === 'reset') { ADV.forEach(k => (pend[k] = '')); repaint(); }
          else if (a.dataset.sh === 'apply') {
            const patch = {}; ADV.forEach(k => { if ((pend[k] || '') !== (f[k] || '')) patch[k] = pend[k] || ''; });
            sh.close().then(() => { if (Object.keys(patch).length) go(patch); });
          }
        });
      }
      V._sheet = () => sh;

      await update({ keepUrl: !ctx.query.practise });
      // the subject and topic rows scroll on narrow screens: keep the selected one in view
      const centre = b => { if (!b) return; const r = b.parentNode; r.scrollLeft = Math.max(0, b.offsetLeft - r.clientWidth / 2 + b.offsetWidth / 2); };
      if (f.subject) centre(U.$('.pq-subj button.on', out));
      if (f.topic) centre(U.$('#pq-tops button.on', out));
      edge(U.$('.pq-subj', out)); edge(tops);
    },
    leave() {
      const V = GA.views.pyq;
      if (typeof V._off === 'function') V._off();
      if (typeof V._t === 'function') V._t();
      const s = V._sheet && V._sheet(); if (s && s.open) s.remove();
      V._off = V._t = V._sheet = V._go = null;
    }
  };

  /* ================================================================== single question: the mockup's practice screen */
  GA.views.question = {
    async enter(ctx, out) {
      await ensureLib();
      if (ctx.stale()) return;
      const D = DATA.D, S = GA.store, P = L(), raw = String(ctx.params.id || '');
      if (P.isEmpty && P.isEmpty(D)) { GA.shell.crumbs([['Questions', '#/pyq']]); emptyBank(out, D); return; }   // no ICAI bank yet
      let id = raw;
      if (!D.qById[id]) { try { id = decodeURIComponent(raw); } catch (e) { id = raw; } }      // an older router passed it encoded
      const meta = D.qById[id];
      const notFound = () => {
        if (GA.shell.notFound) GA.shell.notFound({ kind: 'question', id, back: { href: '#/pyq', label: 'Open the bank' } });
        else out.innerHTML = UI.empty('help', 'Question not found', 'Check the address, or search the bank.', '<a class="btn pop" href="#/pyq">Open the bank</a>');
      };
      if (!meta) { notFound(); return; }
      let q = null;
      try { q = await DATA.question(id); }
      catch (e) { if (ctx.stale()) return; GA.shell.crumbs([['Questions', '#/pyq'], [`${UI.paperLabel(meta)} · ${UI.qLabel(meta)}`, '#/q/' + encodeURIComponent(id)]]); UI.loadFailed(out, { what: 'question' }); return; }
      if (ctx.stale()) return;
      if (!q) { notFound(); return; }
      const queue = Queue.get(), inQ = !!ctx.query.queue && !!queue && queue.ids.includes(id);
      const paperQs = D.questions.filter(x => x.paper === meta.paper);              // printed order (D15: a paper sitting keeps it)
      const ids = inQ ? queue.ids.filter(x => D.qById[x]) : paperQs.map(x => x.id);
      const at = ids.indexOf(id), last = at === ids.length - 1;
      const prev = ids[at - 1], next = ids[at + 1];
      const href = x => '#/q/' + encodeURIComponent(x) + (inQ ? '?queue=1' : '');
      const back = inQ ? (queue.back && queue.back.href) || queue.bank || '#/pyq' : '#/pyq';
      const backLabel = inQ ? (queue.back && queue.back.label) || 'Back to the bank' : 'Back to the bank';
      const setLabel = inQ ? (queue.label || 'Practice set') : UI.paperLabel(meta);
      GA.shell.crumbs([['Questions', back], [setLabel, '#/q/' + encodeURIComponent(id) + (inQ ? '?queue=1' : '')]]);
      // one title per question (P2-12): '<paper label> · Q37 · PassBook', a set adds its name; the router announces it after a move
      document.title = `${UI.paperLabel(meta)} · ${UI.qLabel(meta)}${inQ ? ' · ' + setLabel : ''} · PassBook`;
      // phones show the set name on its own line; a long subject name there reads in its medium form ('CO & Architecture practice', P1-18)
      const shortSet = U.medName ? D.subjects.reduce((t, sj) => t.replace(sj.name, U.medName(sj.name)), setLabel) : setLabel;
      // the set's name wherever it shows (header, palette sheet, end of the set): the full name, which phones swap for the medium form (bank.css)
      const setHtml = shortSet !== setLabel ? `<span class="qp-tl">${esc(setLabel)}</span><span class="qp-ts" aria-hidden="true">${esc(shortSet)}</span>` : esc(setLabel);
      const lessons = D.lessons.filter(l => (meta.subtopic && l.id === meta.subtopic) || (!meta.subtopic && meta.topic && l.topic === meta.topic)).slice(0, 3);
      // more on the same sub-topic (else topic): keyed and unseen first, newest first (P3-19)
      const relScope = meta.subtopic && D.questions.some(x => x.id !== id && x.subtopic === meta.subtopic) ? ['subtopic', meta.subtopic] : meta.topic ? ['topic', meta.topic] : null;
      const related = relScope ? D.questions.filter(x => x.id !== id && x[relScope[0]] === relScope[1])
        .sort((a, b) => (b.hasKey - a.hasKey) || ((P.seenOf(S.state.q[a.id]) ? 1 : 0) - (P.seenOf(S.state.q[b.id]) ? 1 : 0)) || P.base(a, b)).slice(0, 6) : [];
      const relAll = relScope ? D.questions.filter(x => x[relScope[0]] === relScope[1]).length : 0;
      const scope = meta.topic ? D.questions.filter(x => x.topic === meta.topic) : meta.subject && meta.subject !== '?' ? D.questions.filter(x => x.subject === meta.subject) : [];
      const scopeName = meta.topic ? D.name(meta.topic) : meta.subject && D.subjectById[meta.subject] ? D.subjectById[meta.subject].name : '';
      const stOfId = x => S.state.q[x] || {};
      const subjs = U.uniq(ids.map(x => D.qById[x] && D.qById[x].subject).filter(Boolean));
      const pp = D.paperById[meta.paper] || {};
      const subTxt = inQ ? `${U.plural(ids.length, meta.icai ? 'ICAI item' : 'past-paper question')}${subjs.length === 1 && D.subjectById[subjs[0]] ? ' · ' + esc(D.subjectById[subjs[0]].name) : ''} · untimed`
        : meta.icai ? `${U.plural(ids.length, 'item')} · in ICAI’s order, untimed · ${esc(pp.paperCode ? pp.paperCode.replace(/^P/, 'Paper ') : '')}${pp.subjects && pp.subjects.length === 1 && D.subjectById[pp.subjects[0]] ? ' ' + esc(D.subjectById[pp.subjects[0]].name) : ''}`
        : `${U.plural(ids.length, 'question')} · in paper order, untimed · ${esc(pp.organiser || '')}`;
      const keysLine = touch() ? '' : `<p class="pr-keys">Keys: <kbd>A</kbd>–<kbd>D</kbd> choose · <kbd>Enter</kbd> check · <kbd>J</kbd> / <kbd>K</kbd> next / previous</p>`;
      const noKey = !q.answer;
      const markTxt = meta.icai ? GA.qcard.markingNote(q) : noKey ? `<b>${esc(str('noKey', 'No official key'))}</b> for this paper: practice only, not scored. Check an answer to compare it with our worked answer.` : GA.qcard.markingNote(q);
      // the phone chip shows the position ('47/65', like the card's '47 of 65'); the printed number lives in its name, never a 'Q47' beside a printed Q37 (P1-21)
      const chipName = inQ ? `${at + 1} of ${ids.length} in this set, ${UI.paperLabel(meta)} ${UI.qLabel(meta)}: open the question palette`
        : `${UI.qLabel(meta)}, ${at + 1} of ${ids.length}: open the question palette`;
      /** a 'More on' row (P3-19): state dot, compact label ('2019 · Q37'), one line of the stem once it has loaded, marks */
      const relRow = x => `<a class="rail-a qp-rel" href="#/q/${encodeURIComponent(x.id)}" data-rel="${esc(x.id)}">${dotHtml(stOf(S.state.q[x.id]), x)}<span class="qp-rel-b"><span class="qp-rel-t">${esc(P.rowParts ? P.rowParts(D, x, {}).id : UI.paperLabel(x) + ' · ' + UI.qLabel(x))}${x.hasKey || x.icai ? '' : ' · ' + esc(str('noKey', 'No official key').toLowerCase())}</span><small class="qp-rel-s"></small></span><b>${x.icai && !x.marks ? (x.type === 'DESC' ? 'Desc.' : 'MCQ') : U.plural(x.marks, 'mark')}</b></a>`;
      /** the palette legend (P2-23): right and missed get their own marks in practice; 'seen' only where a question cannot be scored (D9): no official
          key, or an official key that gave marks to all */
      const noKeyIn = ids.some(x => D.qById[x] && !D.qById[x].hasKey), mtaIn = ids.some(x => D.qById[x] && D.qById[x].hasKey && D.qById[x].mta);
      const seenLgd = noKeyIn && mtaIn ? 'Seen, not scored' : noKeyIn ? 'Seen, no key' : mtaIn ? 'Seen, marks to all' : '';
      const icaiSet = ids.length && ids.every(x => D.qById[x] && D.qById[x].icai);
      const legendHtml = icaiSet
        ? `<div class="pr-legend qp-legend"><span><i class="lgs ans rok"></i>Right / got it</span><span><i class="lgs ans rpart"></i>Partly</span><span><i class="lgs ans rbad"></i>Missed</span><span><i class="lgs mk"></i>Bookmarked</span><span><i class="lgs cur"></i>Current</span></div>`
        : `<div class="pr-legend qp-legend"><span><i class="lgs ans rok"></i>Right</span><span><i class="lgs ans rbad"></i>Missed</span>${seenLgd ? `<span><i class="lgs ans"></i>${seenLgd}</span>` : ''}<span><i class="lgs mk"></i>Bookmarked</span><span><i class="lgs cur"></i>Current</span></div>`;
      const timerHtml = cls => `<div class="pr-timer ${cls}"><div><b class="num" data-qt aria-live="off">0:00</b><small data-qt-l>time on this question</small></div><button class="btn icon sm" type="button" data-qt-b aria-label="Pause timer">${icon('pause')}</button></div>`;

      out.innerHTML = `<div class="qpage pr-page${inQ ? ' in-q' : ''}">
        <header class="pr-head prac-h qp-head"><nav data-crumbs class="qp-crumbs"></nav>
          <a class="qp-back" href="${esc(back)}">${icon('arrow-l')}<span>Questions</span></a>
          <div class="pr-ht"><h1>${setHtml}</h1><p>${subTxt}</p></div>
          ${scope.length ? `<span class="pr-tag">${U.plural(scope.length, meta.icai ? 'ICAI item' : 'question')} on ${esc(scopeName)} in the bank${scope.reduce((a, x) => a + x.marks, 0) ? ' · ' + U.plural(scope.reduce((a, x) => a + x.marks, 0), 'mark') : ''}</span>` : ''}
          <div class="qp-hbar"><button type="button" class="qp-qchip" id="qp-chip" aria-haspopup="dialog" aria-label="${esc(chipName)}">${icon('grid')}<b>${at + 1}</b><span>/${ids.length}</span></button>${timerHtml('qp-ht')}</div></header>
        <div class="prac"><div class="qp-main"><div id="qhost" data-focus tabindex="-1" aria-label="Question"></div><div id="qend"></div></div>
        <aside class="qp-side" aria-label="This set">
          <div class="pr-panel qp-set"><h2 class="pr-h4">Your set</h2><div class="pr-sub" id="qp-cnt"></div>
            ${timerHtml('qp-rt')}
            <div id="qpal"></div>
            ${legendHtml}</div>
          <div class="pr-panel qp-mark"><h2 class="pr-h4">Marking</h2><p class="pr-mark">${markTxt}</p></div>
          ${lessons.length ? `<div class="pr-panel qp-learn"><h2 class="pr-h4">Learn the concept</h2>${lessons.map(l => `<a class="rail-a" href="#/l/${l.id}">${icon('book')}<span>${esc(l.title)}</span><b>${l.minutes} min</b></a>`).join('')}</div>` : ''}
          ${related.length ? `<div class="pr-panel qp-more"><h2 class="pr-h4">More on ${esc(D.name(relScope[1]))}</h2>${related.map(relRow).join('')}<a class="link" href="#/pyq?${relScope[0] === 'subtopic' ? 'sub' : 'topic'}=${encodeURIComponent(relScope[1])}">All ${U.nf(relAll)} ${icon('arrow-r')}</a></div>` : ''}
          ${keysLine}</aside></div></div>`;

      /* ---------------------------------------------------------- in-set navigation replaces this history step (P1-47): palette cells and keys here,
         the card's own Previous / Skip / Next in qcard.js */
      const navTo = h => { if (!h) return; if (UI.overlay && UI.overlay.busy && UI.overlay.busy()) UI.overlay.after(() => location.replace(h)); else location.replace(h); };
      out.addEventListener('click', e => {
        if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = e.target.closest && e.target.closest('.pr-pal a.pr-pb');
        if (!a || !out.contains(a) || !a.getAttribute('href')) return;
        e.preventDefault(); navTo(a.getAttribute('href'));
      });

      /* ---------------------------------------------------------- palette (P1-21): printed numbers by section in a paper, 1..N in a set */
      const W = 20;
      const cellsOf = () => {
        if (inQ) return [{ title: '', cells: ids.map((x, k) => ({ id: x, text: String(k + 1), label: `Question ${k + 1} of ${ids.length}: ${UI.paperLabel(D.qById[x])} · ${UI.qLabel(D.qById[x])}` })) }];
        return P.paperGroups(paperQs).map(gr => ({ title: gr.title, cells: gr.cells.map(c => ({ id: c.id, text: String(c.no), label: `${gr.title} ${c.label}` })) }));
      };
      const groups = cellsOf();
      // windows of at most 20 cells inside each section (a short set shows whole)
      const wins = [];
      groups.forEach(gr => { if (ids.length <= 30) { wins.push({ gr, from: 0, to: gr.cells.length }); return; } for (let s = 0; s < gr.cells.length; s += W) wins.push({ gr, from: s, to: Math.min(gr.cells.length, s + W) }); });
      let wi = Math.max(0, wins.findIndex(w => w.gr.cells.slice(w.from, w.to).some(c => c.id === id)));
      // practice cells say right or missed (P2-23: a ✓ or ✕ corner on the attempted fill); a question without an official key is only seen (D9)
      const cellHtml = c => {
        const e = stOfId(c.id), seen = P.seenOf(e), cur = c.id === id, r = e.n ? (e.lastOk ? 'rok' : e.g === 'partly' ? 'rpart' : 'rbad') : '';
        const cls = [cur ? 'cur' : '', seen ? 'ans' : '', r, e.bm ? 'mk' : ''].filter(Boolean).join(' ');
        const said = e.n ? (e.lastOk ? ', right last time' : e.g === 'partly' ? ', partly last time' : ', missed last time') : seen ? (D.qById[c.id] && D.qById[c.id].mta ? ', seen (marks to all, not scored)' : ', seen (no official key)') : ', not attempted';
        return `<a class="pr-pb ${cls}" href="${href(c.id)}" aria-label="${esc(c.label)}${said}${e.bm ? ', bookmarked' : ''}"${cur ? ' aria-current="true"' : ''}>${esc(c.text)}</a>`;
      };
      const navHtml = (gr, cells) => `<nav class="pr-pal" aria-label="${esc(gr.title || 'Questions in this set')}">${cells.map(cellHtml).join('')}</nav>`;
      const palHtml = all => {
        // the whole set (the phone sheet, or a set of 30 or fewer): one block per section, titled when the paper has sections
        if (all || ids.length <= 30) return groups.map(gr => `${gr.title ? `<div class="pq-palg">${esc(gr.title)}</div>` : ''}${navHtml(gr, gr.cells)}`).join('');
        // the rail: one window of at most 20 cells inside a section, with arrows
        const w = wins[wi];
        return `<div class="pr-win"><button class="btn icon sm ghost" type="button" data-w="-1" aria-label="Previous questions"${wi ? '' : ' disabled'}>${icon('arrow-l')}</button><span>${esc(w.gr.title ? w.gr.title + ' · ' : '')}${esc(w.gr.cells[w.from].text)}–${esc(w.gr.cells[w.to - 1].text)}</span><button class="btn icon sm ghost" type="button" data-w="1" aria-label="Next questions"${wi < wins.length - 1 ? '' : ' disabled'}>${icon('arrow-r')}</button></div>${navHtml(w.gr, w.gr.cells.slice(w.from, w.to))}`;
      };
      const palHost = U.$('#qpal', out);
      const counts = () => {
        const att = ids.filter(x => P.seenOf(stOfId(x))).length, graded = ids.filter(x => stOfId(x).n).length, right = ids.filter(x => stOfId(x).n && stOfId(x).lastOk).length;
        return `${U.nf(att)} of ${U.nf(ids.length)} attempted${graded ? ` · ${U.nf(right)} right last time` : ''}`;      // a seen-only (unkeyed) set has no 'right'
      };
      let palSheet = null;
      function paintPal() {
        palHost.innerHTML = palHtml(false);
        U.$('#qp-cnt', out).textContent = counts();
        if (palSheet && palSheet.open) { U.$('.qp-palsh', palSheet.el).innerHTML = palHtml(true); U.$('.qp-palcnt', palSheet.el).textContent = counts(); }
      }
      paintPal();
      U.on(palHost, 'click', '[data-w]', (e, b) => { wi = U.clamp(wi + (+b.dataset.w), 0, wins.length - 1); paintPal(); const nb = U.$(`[data-w="${b.dataset.w}"]`, palHost); if (nb && !nb.disabled) nb.focus(); else { const o2 = U.$('[data-w]:not([disabled])', palHost); if (o2) o2.focus(); } });
      const offStore = S.on ? S.on('change', tag => { if (tag !== 'time' && out.isConnected) paintPal(); }) : null;
      // phones: the 'Q n/N' chip opens the palette as a sheet (P1-18); a cell closes it first, then replaces this step
      U.$('#qp-chip', out).addEventListener('click', e => {
        if (palSheet && palSheet.open) return;
        palSheet = sheet({ id: 'qp-pal', title: setLabel, titleHtml: setHtml, opener: e.currentTarget, body: `<p class="pr-sub qp-palcnt">${esc(counts())}</p><div class="qp-palsh">${palHtml(true)}</div>${legendHtml}`,
          focus: '.pr-pb.cur', onRemove: () => { palSheet = null; } });
        palSheet.el.addEventListener('click', ev => {
          const a = ev.target.closest && ev.target.closest('a.pr-pb'); if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
          ev.preventDefault(); const h = a.getAttribute('href'), sh = palSheet;
          sh.close().then(() => navTo(h));
        });
      });

      /* ---------------------------------------------------------- 'More on': one line of each stem once the list is near the screen (P3-19); a paper
         that does not load leaves its row as a label */
      const relHost = U.$('.qp-more', out);
      if (relHost) {
        const fill = () => DATA.questions(related.map(x => x.id)).then(full => {
          if (!out.isConnected) return;
          full.forEach(r => { const el = U.$(`[data-rel="${esc(r.id)}"] .qp-rel-s`, relHost); if (el) el.textContent = P.snippet(r, 110); });
        }, () => { /* labels only */ });
        if (typeof IntersectionObserver === 'function') { const io = new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) { io.disconnect(); fill(); } }, { rootMargin: '400px 0px' }); io.observe(relHost); }
        else fill();
      }

      /* ---------------------------------------------------------- timer: time on this question; it has a pause control (WCAG 2.2.2) and stops once checked */
      let secs = 0, run = true, done = false;
      const tEls = U.$$('[data-qt]', out), tBs = U.$$('[data-qt-b]', out), tLs = U.$$('[data-qt-l]', out);
      const paint = () => { tEls.forEach(el => (el.textContent = U.clock(secs * 1000))); };
      const setRun = v => { run = v; tBs.forEach(b => { b.innerHTML = icon(run ? 'pause' : 'play'); b.setAttribute('aria-label', run ? 'Pause timer' : 'Resume timer'); b.disabled = done; }); };
      const setLbl = t => tLs.forEach(el => (el.textContent = t));
      const tick = setInterval(() => { if (!out.isConnected) return clearInterval(tick); if (run && !done && !document.hidden) { secs++; paint(); } }, 1000);
      tBs.forEach(b => b.addEventListener('click', () => setRun(!run)));
      GA.views.question._t = tick;

      /* ---------------------------------------------------------- the end of a set (P1-22): attempted · right · time and one real next step */
      const endHost = U.$('#qend', out);
      /** the next 'Practise 10' of a bank set's own filter -> {fx, key, set} (null for other queues, or when a search index does not load) */
      async function nextOf(rec) {
        if (!rec || rec.kind !== 'bank' || !rec.bank) return null;
        const fx = P.parse(rec.f || (GA.router._parse ? GA.router._parse(rec.bank).query : {}));
        let post = null;
        if (fx.q && String(fx.q).trim()) { try { post = await DATA.searchPostings(); } catch (err) { return null; } if (!post) return null; }
        const key = P.bankKey(fx);
        return { fx, key, set: P.practiseSet(P.filter(D, fx, S, post), S, { n: 10, served: served(key) }) };
      }
      let endSeq = 0;
      /** the real next step after a notebook retry set (P2-68): the day plan's next open task, named by the task, else the shared next step; a retry
          link while nothing is due for a retry is skipped (it would open an empty queue) */
      function notebookNext() {
        let plan = null, step = null;
        try { plan = GA.planner && typeof GA.planner.current === 'function' ? GA.planner.current() : null; } catch (e) { plan = null; }
        try { step = GA.stats && typeof GA.stats.nextStep === 'function' ? GA.stats.nextStep(S.state, D, { kind: 'any' }) : null; } catch (e) { step = null; }
        const dueNow = () => { try { return GA.stats.due(S.state, D, U.today()).questions.length; } catch (e) { return 0; } };
        return P.planNext(plan, step, { skip: h => /^#\/notebook\?(?:.*&)?retry=/.test(h) && !dueNow() });
      }
      /** the end of a set (P1-22): attempted · right · time, Tick, and the set's one real next step (D18): retry the misses; else the next 10 of the
          same filter while it still has questions this round has not served; else back to the bank (with 'Practise these again' as a link). A notebook
          retry set hands back to the day plan instead (P2-68): its coral is the plan's next open task, and its line says what the retries did. */
      async function endOfSet() {
        const my = ++endSeq;
        const rec = Queue.get(); if (!rec) return;
        const res = rec.res || {}, ms = rec.ms || {}, nbSet = rec.kind === 'notebook';
        const attempted = ids.filter(x => res[x] === 'ok' || res[x] === 'bad' || res[x] === 'seen').length;
        const right = ids.filter(x => res[x] === 'ok').length, missed = nbSet ? [] : ids.filter(x => res[x] === 'bad' || res[x] === 'peek');
        // a set of questions that cannot be scored (no official key, or marks to all) is seen only (D9): never 'N right', never 'every one was right'
        const graded = ids.filter(x => res[x] === 'ok' || res[x] === 'bad').length, unscored = attempted > 0 && !graded;
        const mins = Object.values(ms).reduce((a, b) => a + (+b || 0), 0) / 60000;
        const nx = missed.length || nbSet ? null : await nextOf(rec);
        if (my !== endSeq || !out.isConnected || !card.checked) return;           // left, re-rendered or 'Try again' meanwhile
        const more = nx && nx.set.ids.length ? nx.set.ids : [];
        const fresh = more.some(x => !ids.includes(x));                           // something this set did not have
        // 'the next N' only when it brings questions this set did not have (a pool of exactly 10 wraps to the same 10: 'these 10 again')
        const nextLbl = fresh ? `Practise the next ${U.nf(more.length)}` : more.length === 1 ? 'Practise it again' : `Practise these ${U.nf(more.length)} again`;
        const backA = cls => `<a class="${cls}" href="${esc(back)}">${cls === 'link' ? '' : icon('arrow-l')}<span>${esc(backLabel)}</span></a>`;
        const plan = nbSet ? notebookNext() : null;
        const planA = n => `<a class="btn pop qp-end-go" href="${esc(n.href)}"><span class="qp-end-gt"><small>${esc(n.kicker)}${n.minutes ? ' · ' + esc(U.nf(Math.round(n.minutes)) + ' min') : ''}</small><span>${esc(n.title || n.kicker)}</span></span>${icon('arrow-r')}</a>`;
        const coral = plan ? planA(plan) : nbSet ? backA('btn pop')
          : missed.length ? `<button type="button" class="btn pop" data-end="retry">${icon('refresh')}<span>${missed.length === 1 ? 'Retry the one you missed' : `Retry the ${U.nf(missed.length)} you missed`}</span></button>`
          : fresh ? `<button type="button" class="btn pop" data-end="next">${icon('play')}<span>${esc(nextLbl)}</span></button>` : backA('btn pop');
        const second = nbSet ? (plan ? backA('link') : '') : missed.length || fresh ? backA('link') : more.length ? `<button type="button" class="link" data-end="next">${esc(nextLbl)}</button>` : '';
        const allMta = ids.every(x => D.qById[x] && D.qById[x].mta), allNoKey = ids.every(x => D.qById[x] && !D.qById[x].hasKey);
        // a notebook set says what its retries did, by the notebook's own rule (GA.stats.retryDay): '1 resolved · 4 back for a retry from tomorrow'
        const nbSay = nbSet && GA.stats ? P.nbLine(P.nbAfter(S.state, ids, U.today(), GA.stats.retryDay), U.today()) : '';
        const say = nbSay ? nbSay + '.' : missed.length ? `${U.plural(missed.length, 'question')} worth a second look.`
          : unscored ? (allMta ? 'The official key gave marks to all on these, so none is scored.' : allNoKey ? 'No official key for these, so none is scored.' : 'None of these can be scored.')
          : graded ? (graded === attempted ? 'Every one you answered was right.' : 'Every scored one was right.') : 'Set finished.';
        endHost.innerHTML = `<section class="qp-end" aria-labelledby="qp-end-h">
          <div class="qp-end-pk" aria-hidden="true">${GA.mascot && GA.mascot.svg ? GA.mascot.svg({ size: 64, mood: missed.length || (nbSet && attempted > right) ? 'think' : 'happy', gaze: 'right' }) : ''}</div>
          <div class="qp-end-b"><div class="qp-end-t"><h2 id="qp-end-h">${setHtml}: done</h2>
            <p class="qp-end-n"><b>${U.nf(attempted)}</b> of ${U.nf(ids.length)} attempted · ${unscored ? 'not scored' : `<b>${U.nf(right)}</b> right`}${mins > 0 ? ` · ${esc(U.dur(mins))}` : ''}</p>
            <p class="qp-end-s${nbSay ? ' keep' : ''}">${esc(say)}</p></div>
            <div class="qp-end-a">${coral}${second}</div></div></section>`;
        endHost.hidden = false;
        if (UI.say) UI.say(`Set done: ${attempted} of ${ids.length} attempted, ${unscored ? 'not scored' : right + ' right'}.${nbSay ? ' ' + nbSay + '.' : ''}`);
      }
      endHost.addEventListener('click', async e => {
        const b = e.target.closest && e.target.closest('[data-end]'); if (!b) return;
        const rec = Queue.get(); if (!rec) return;
        if (b.dataset.end === 'retry') {
          const res = rec.res || {}, missed = ids.filter(x => res[x] === 'bad' || res[x] === 'peek');
          if (!missed.length) return;
          Queue.set(missed, (rec.label || 'Practice set').replace(/( · retry)?$/, ' · retry'), { bank: rec.bank, f: rec.f, key: rec.key, kind: rec.kind, back: rec.back });
          navTo('#/q/' + encodeURIComponent(missed[0]) + '?queue=1');
        } else if (b.dataset.end === 'next' && rec.bank) {
          b.disabled = true;
          const nx = await nextOf(rec);
          // nothing to draw (or a search index that did not load): back to the bank, which says why
          if (!nx || !nx.set.ids.length) { navTo(rec.bank); return; }
          serve(nx.key, nx.set.ids, nx.set.wrapped);
          Queue.set(nx.set.ids, P.setName(D, nx.fx), { bank: rec.bank, f: filterOf(nx.fx), key: nx.key, kind: 'bank', back: rec.back });
          navTo('#/q/' + encodeURIComponent(nx.set.ids[0]) + '?queue=1');
        }
      });
      /** after any action on the card: record this session's outcome (a peek too) and show or hide the end of the set */
      function sync() {
        if (!inQ) return;
        if (card.checked) {
          const rec = Queue.get();
          if (rec && !(rec.res || {})[id]) Queue.patch(r => { r.res[id] = 'peek'; });
          if (last && endHost.hidden !== false) endOfSet();
        } else if (!endHost.hidden) { endHost.hidden = true; endHost.innerHTML = ''; }
      }
      endHost.hidden = true;

      const card = GA.qcard.create(q, { mode: 'practice', cta: 'pop', mark: true,
        progress: { i: U.nf(at + 1), n: U.nf(ids.length) },
        prev: prev ? { href: href(prev) } : null,
        // the last question of a set ends with the summary (its coral is the set's next step); a paper ends at the tests hub
        next: next ? { href: href(next) } : inQ ? null : { href: '#/test', label: 'Done with this paper', end: true },
        onCheck: r => {
          done = true; setRun(false); setLbl('time to answer'); paintPal();
          if (inQ) Queue.patch(x => { x.res[id] = r.ok === true ? 'ok' : r.ok === false ? 'bad' : 'seen'; if (r.ms != null) x.ms[id] = r.ms; });
          setTimeout(sync, 0);
        },
        // 'Show answer' stops the clock too (P3-18): the card says 'Answer shown · Not counted'
        onReveal: () => { done = true; setRun(false); setLbl('answer shown, not counted'); paintPal(); setTimeout(sync, 0); },
        onRetry: () => { done = false; secs = 0; paint(); setLbl('time on this question'); setRun(true); if (inQ) Queue.patch(x => { delete x.res[id]; delete x.ms[id]; }); setTimeout(sync, 0); } });
      U.$('#qhost', out).append(card.el);
      U.$('#qhost', out).addEventListener('click', () => setTimeout(sync, 0));
      if (ctx.query.shot) setTimeout(() => {
        if (!out.isConnected) return;
        if (q.type !== 'DESC' && /^[A-D]$/.test(ctx.query.shot)) { const i = U.$(`.qc-o[data-k="${ctx.query.shot}"] input`, card.el); if (i) { i.click(); card.check(); } return; }
        card.check();
        if (/^(got|partly|missed)$/.test(ctx.query.shot)) setTimeout(() => { const b = U.$(`[data-a="grade"][data-g="${ctx.query.shot}"]`, card.el); if (b) b.click(); }, 50);
      }, 200);
      if (inQ && card.checked) sync();

      /* ---------------------------------------------------------- keys (P0-13): never grade or leave by accident; the decision is GA.pyqLib.pageKey */
      // a control of its own: Enter and the arrows keep their native meaning there (a button's action, a radio group's selection)
      const CONTROL = 'a[href], button, input, select, textarea, summary, [role="tab"], [role="radio"], [role="button"], [contenteditable], [tabindex]:not([tabindex="-1"])';
      const key = e => {
        if (!out.isConnected) return;
        const t = e.target, tag = t && t.tagName;
        const act = P.pageKey({ key: e.key, repeat: e.repeat, prevented: e.defaultPrevented, mods: e.metaKey || e.ctrlKey || e.altKey,
          field: (tag === 'INPUT' && !/^(radio|checkbox)$/.test(t.type)) || tag === 'TEXTAREA' || tag === 'SELECT' || !!(t && t.isContentEditable),
          option: tag === 'INPUT' && !!(t.closest && t.closest('.qc-o')),
          control: !!(t && t !== document.body && t.closest && t.closest(CONTROL)) },
        { checked: card.checked, choice: q.type === 'MCQ' || q.type === 'MSQ', next: !!next, prev: !!prev,
          overlay: !!(UI.overlay && UI.overlay.size && UI.overlay.size()), single: !(UI.singleKeys && !UI.singleKeys()) });
        if (!act) return;
        if (act === 'check') { e.preventDefault(); card.check(); }
        else if (act === 'next') { e.preventDefault(); navTo(href(next)); }
        else if (act === 'prev') { e.preventDefault(); navTo(href(prev)); }
        else { const i = U.$(`.qc-o[data-k="${act}"] input`, card.el); if (i && !i.disabled) { e.preventDefault(); i.click(); } }
      };
      document.addEventListener('keydown', key);
      GA.views.question._k = key;
      GA.views.question._off = offStore;
      GA.views.question._sheet = () => palSheet;
    },
    leave() {
      const V = GA.views.question;
      if (V._k) document.removeEventListener('keydown', V._k);
      if (V._t) clearInterval(V._t);
      if (typeof V._off === 'function') V._off();
      const s = V._sheet && V._sheet(); if (s && s.open) s.remove();
      V._k = V._t = V._off = V._sheet = null;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
