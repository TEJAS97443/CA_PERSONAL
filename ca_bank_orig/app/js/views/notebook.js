/* PassBook — error notebook (/notebook): every question you missed, why you missed it, and when to retry it. Styles: app/css/retention.css.
   Audit wave 1 (WP11; _audit/PROPOSAL.md P1-43, P1-27, §3 '/notebook'; contract docs/ARCHITECTURE.md §10.4, §10.6):
     header       one line (open · due for a retry today · resolved) + the coral 'Retry the 5 most urgent' (the planner's constant, RETRY_N), or with
                  nothing due 'Practise 10 new questions' from your weakest topic (D18)
     filters      a bar (sticky above 700 px): Open / Resolved / All · sort; subject and reason from the patterns (side column on desktop) or chips (phones)
     the list     compact rows (paper · Q · topic · marks · reason chip or 'Tag why' · retry date), 20 per page with 'Show 20 more', one open at a
                  time; an open row shows the question, the reason chips, 'Your note' (the one note per question, q[id].note: P1-27) and a neutral Retry
     patterns     Why you miss + By subject (beside the list on desktop, below it on phones)
   #/notebook?retry=5 opens the 5 most urgent due misses as a practice queue (the planner's and nextStep's link). Filter changes stay on the page
   (history.replaceState), so a tap never adds a Back step. The pure helpers at the top load in Node (tests/flash.test.js).
   Audit part B: an entry's retry day is GA.stats.retryDay, the rule GA.stats.due counts with (never before the day after its last answer;
   P2-41's reader side), so the notebook's numbers, the planner's 'Retry 5' and My progress agree; a cleared notebook says so (P2-70). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = GA.util || (typeof require === 'function' ? require('../core/util.js') : null);
  const SRS = GA.srs || (typeof require === 'function' ? require('../core/srs.js') : null);
  const PAGE = 20, RETRY_N = 5, MIN_RETRY = 3, MIN_QUESTION = 4;   // RETRY_N, MIN_*: the planner's constants (GA.planner.RETRY_N, MIN)
  // reason colours encode a data series (the "why you miss" breakdown), so they use the --viz-* palette
  const REASONS = [['concept', 'Concept gap', 'var(--viz-d)'], ['recall', 'Forgot formula / fact', 'var(--viz-c)'], ['calc', 'Calculation slip', 'var(--viz-e)'], ['misread', 'Misread the question', 'var(--viz-f)'], ['time', 'Ran out of time', 'var(--viz-b)'], ['guess', 'Guessed', 'var(--faint)'], ['trap', 'Fell for a trap', 'var(--viz-h)']];
  const NONE = ['none', 'Not tagged yet', 'var(--line-2)'];
  const SORTS = [['due', 'Most urgent first'], ['recent', 'Most recent miss'], ['misses', 'Missed most often']];
  const STATUSES = ['open', 'resolved', 'all'];

  /* ================================================================== pure helpers (no DOM) */
  const reasonLabel = k => ((REASONS.concat([NONE])).find(r => r[0] === k) || NONE)[1];
  /** the day an open entry comes back for a retry: GA.stats.retryDay, the one rule GA.stats.due counts with (its review day, never before the
      day after its last answer: P2-41), else its review day; null for a resolved entry or one without a schedule */
  function retryOf(state, id, n, q) {
    if (!n || n.resolved) return null;
    const ST = GA.stats;
    if (ST && typeof ST.retryDay === 'function') { try { return ST.retryDay(state, id) || null; } catch (e) { /* fall through */ } }
    return q && q.srs && typeof q.srs.due === 'string' ? q.srs.due : null;
  }
  /** the notebook's entries that still name a question in the catalogue: {id, n: nb entry, m: catalogue row, q: state.q entry, r: retry day} */
  function entries(state, D) {
    const nb = (state && state.nb) || {}, out = [];
    for (const id in nb) if (D.qById[id] && nb[id]) { const q = (state.q && state.q[id]) || {}; out.push({ id, n: nb[id], m: D.qById[id], q, r: retryOf(state, id, nb[id], q) }); }
    return out;
  }
  const isOpen = e => !e.n.resolved;
  const isDue = (e, today) => isOpen(e) && !!e.r && e.r <= today;
  /** an entry's urgency for the shared order: its retry day and ease (SRS.byUrgency) */
  const urgOf = e => ({ due: e.r || '9999-99-99', ease: e.q.srs ? +e.q.srs.ease || 2.5 : 2.5 });
  /** the open misses due for a retry today, most urgent first: GA.stats.due's list (the planner reads the same), kept to open notebook entries */
  function dueList(state, D, today) {
    const open = entries(state, D).filter(e => isDue(e, today));
    const ok = new Set(open.map(e => e.id));
    const ST = GA.stats;
    if (ST && typeof ST.due === 'function') {
      try { const q = ST.due(state, D, today).questions; if (Array.isArray(q)) { const l = q.filter(id => ok.has(id)); if (l.length === ok.size) return l; } } catch (e) { /* fall through */ }
    }
    return open.sort((a, b) => SRS.byUrgency(urgOf(a), urgOf(b))).map(e => e.id);
  }
  /** the retry queue '#/notebook?retry=n' opens: the n most urgent due misses (n = 5, the planner's constant) */
  const retryIds = (state, D, today, n) => dueList(state, D, today).slice(0, n || RETRY_N);
  /** filter state from a query: {status, subject, reason, sort} */
  function parseFilter(q) {
    q = q || {};
    return { status: STATUSES.indexOf(q.status) >= 0 ? q.status : 'open', subject: q.subject || '', reason: q.reason || '', sort: SORTS.some(s => s[0] === q.sort) ? q.sort : 'due' };
  }
  /** the query that keeps a filter in the address (defaults left out) */
  function filterQuery(f, shown) {
    const q = {};
    if (f.status !== 'open') q.status = f.status;
    if (f.subject) q.subject = f.subject;
    if (f.reason) q.reason = f.reason;
    if (f.sort !== 'due') q.sort = f.sort;
    if (shown > PAGE) q.n = shown;
    return q;
  }
  /** the list a filter shows, sorted: 'due' = the misses due for a retry in dueList's order (so the top rows are the ones the coral and the
      planner's 'Retry 5' open), then the next retry dates, then resolved. `rank` = dueList(state, D, today), computed here when left out. */
  function select(list, f, today, rank, state, D) {
    const keep = list.filter(e => (f.status === 'all' || (f.status === 'open' ? isOpen(e) : !isOpen(e))) && (!f.subject || e.m.subject === f.subject) && (!f.reason || (e.n.reason || 'none') === f.reason));
    const order = rank || (state && D ? dueList(state, D, today) : keep.filter(e => isDue(e, today)).sort((a, b) => SRS.byUrgency(urgOf(a), urgOf(b))).map(e => e.id));
    const at = new Map(order.map((id, i) => [id, i]));
    const urg = e => [isOpen(e) ? 0 : 1, at.has(e.id) ? at.get(e.id) : order.length, isOpen(e) && e.r ? e.r : '9999-99-99', e.q.srs ? e.q.srs.ease : 9, -(e.q.last || 0)];
    const cmp = (a, b) => { const x = urg(a), y = urg(b); for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1; return 0; };
    if (f.sort === 'misses') return keep.sort((a, b) => (b.n.misses || 0) - (a.n.misses || 0) || cmp(a, b));
    if (f.sort === 'recent') return keep.sort((a, b) => (b.q.last || 0) - (a.q.last || 0) || cmp(a, b));
    return keep.sort(cmp);
  }
  /** the one note per question (P1-27): state.q[id].note only. The v3 store migration joined the notebook's old nb[id].note into it, so that
      copy is never read here: a note deleted on the question card stays deleted in the notebook. */
  function noteOf(state, id) {
    const q = state && state.q && state.q[id];
    return q && typeof q.note === 'string' && q.note.trim() ? q.note : '';
  }
  /** when an entry comes back: {text, now}: 'retry now', 'retry tomorrow', 'retry 24 Oct', 'resolved 3 days ago' */
  function whenOf(e, today, now) {
    if (e.n.resolved) return { text: 'resolved ' + U.ago(e.n.resolved, now), now: false };
    if (!e.r) return { text: 'retry soon', now: false };
    if (e.r <= today) return { text: 'retry now', now: true };
    return { text: e.r === U.addDays(today, 1) ? 'retry tomorrow' : 'retry ' + U.fmtDay(e.r, { day: 'numeric', month: 'short' }), now: false };
  }
  /** the header's numbers */
  function tally(list, today) {
    let open = 0, resolved = 0, due = 0;
    for (const e of list) { if (isOpen(e)) { open++; if (isDue(e, today)) due++; } else resolved++; }
    return { open, resolved, due, total: list.length };
  }
  /** the screen's one coral (D18): 'Retry the 5 most urgent' while misses are due, else 'Practise 10 new questions' from the weakest topic
      (with no ICAI bank yet: the shared next lesson) */
  function coralOf(state, D, today) {
    const due = dueList(state, D, today), n = Math.min(RETRY_N, due.length);
    if (n) return { kind: 'retry', ids: due.slice(0, n), kicker: `${U.nf(due.length)} due for a retry · about ${U.nf(n * MIN_RETRY)} min`,
      title: due.length > n ? `Retry the ${U.nf(n)} most urgent` : n === 1 ? 'Retry the missed question' : `Retry the ${U.nf(n)} missed questions` };
    let w = null;
    try { w = GA.stats && typeof GA.stats.weakTopics === 'function' ? (GA.stats.weakTopics(state, D, today, { limit: 1 }) || [])[0] : null; } catch (e) { w = null; }
    const P = GA.pyqLib;
    if (P && P.isEmpty && P.isEmpty(D)) {        // no ICAI bank yet: nothing to practise, so the coral is the shared next lesson (else Learn)
      const st = P.emptyStep(state, D);
      return { kind: 'lesson', href: st.href, kicker: 'Nothing due for a retry', title: st.label === 'Next lesson' && st.title ? `Next lesson: ${st.title}` : st.label };
    }
    const kicker = `Nothing due for a retry · about ${U.nf(10 * MIN_QUESTION)} min`;
    if (w && w.id) return { kind: 'practise', href: '#/pyq?topic=' + encodeURIComponent(w.id) + '&practise=10', kicker, title: `Practise 10 new questions: ${w.name}` };
    return { kind: 'practise', href: '#/pyq?practise=10', kicker, title: 'Practise 10 new questions' };
  }

  /** the list's empty state when every entry is resolved (P2-70: a cleared notebook says so, with its real count) */
  const clearedText = t => ({ title: 'Notebook cleared', text: `${t.resolved === 1 ? 'Its one mistake is resolved' : `All ${U.nf(t.resolved)} mistakes in it are resolved`}. New misses land here by themselves.` });

  const Lib = { PAGE, RETRY_N, REASONS, SORTS, reasonLabel, retryOf, entries, isOpen, isDue, dueList, retryIds, parseFilter, filterQuery, select, noteOf, whenOf, tally, coralOf, clearedText };
  GA.nbLib = Lib;
  if (typeof module !== 'undefined' && module.exports) module.exports = Lib;
  if (typeof document === 'undefined') return;

  /* ================================================================== the view (browser only) */
  const esc = U.esc, icon = GA.icon, UI = GA.ui, DATA = GA.data, C = GA.charts;
  const sIcon = id => (C && C.subj ? C.subj(id) : '');
  const RS = REASONS.concat([NONE]);
  const replaceUrl = h => { try { history.replaceState(history.state, '', location.href.split('#')[0] + h); } catch (e) { /* the address is a nicety */ } };
  async function ensureQueue() { if (!GA.queue) await U.loadScript('app/js/views/pyq.js'); return !!GA.queue; }
  /** open the retry queue: the question page walks it and its end card leads back here */
  function startRetry(ids) {
    const label = ids.length >= RETRY_N ? `Notebook · the ${ids.length} most urgent` : `Notebook · ${U.plural(ids.length, 'due miss', 'due misses')}`;
    GA.queue.set(ids, label, { kind: 'notebook', back: { href: '#/notebook', label: 'Back to the notebook' } });
    GA.router.go('/q/' + encodeURIComponent(ids[0]), { queue: 1 });
  }

  GA.views.notebook = {
    async enter(ctx, out) {
      const D = DATA.D, S = GA.store, today = U.today();
      GA.shell.crumbs([['Error notebook', '#/notebook']]);
      // the session link (§10.4): act once, drop it from the address, open the queue; with nothing due the list shows instead
      if (ctx.query.retry) {
        const n = Math.min(20, Math.max(1, Math.floor(+ctx.query.retry) || RETRY_N));
        const q = Object.assign({}, ctx.query); delete q.retry;
        replaceUrl(GA.router.href('/notebook', q));
        const ids = retryIds(S.state, D, today, n);
        if (ids.length) {
          try { await ensureQueue(); } catch (e) { if (UI && UI.loadFailed) UI.loadFailed(out, { what: 'view', main: true }); return; }
          if (ctx.stale()) return;
          startRetry(ids); return;
        }
      }
      const f = parseFilter(ctx.query);
      const shown = Math.max(PAGE, Math.min(2000, Math.floor(+ctx.query.n) || PAGE));
      draw(out, D, S, today, f, shown);
    }
  };

  function draw(out, D, S, today, f, shown) {
    let openId = null;
    const all = () => entries(S.state, D);
    out.innerHTML = `<div class="nb pr-page"><header class="pr-head"><div class="pr-ht"><h1>Error notebook</h1><p id="nb-line"></p></div><div class="pr-acts" id="nb-cta"></div></header><div id="nb-body"></div></div>`;
    const line = U.$('#nb-line', out), cta = U.$('#nb-cta', out), body = U.$('#nb-body', out);

    function paintHead() {
      const list = all(), t = tally(list, today);
      line.innerHTML = list.length ? `<b>${U.nf(t.open)}</b> open · <b>${U.nf(t.due)}</b> due for a retry today · ${U.nf(t.resolved)} resolved`
        : 'Your wrong answers, why you missed them, and when to retry them.';
      if (!list.length) { cta.innerHTML = ''; return; }
      const c = coralOf(S.state, D, today);
      const inner = `<span><small>${esc(c.kicker)}</small>${esc(c.title)}</span>${icon('arrow-r')}`;
      cta.innerHTML = c.kind === 'retry' ? `<button class="btn pop lg hb-go" type="button" id="nb-retry">${inner}</button>` : `<a class="btn pop lg hb-go" href="${esc(c.href)}">${inner}</a>`;
    }
    function paintBody() {
      const list = all();
      if (!list.length) {
        const m = { mood: 'idle', gaze: 'down' };
        // P2-41: the timing comes from the engine's own constants (GA.stats.RETRY: first retry the day after a miss; a right answer closes
        // the entry only `resolve` or more study days after the last miss), so the copy cannot drift from what actions.attempt does
        const R = (GA.stats && GA.stats.RETRY) || { first: 1, resolve: 3 };
        const P = GA.pyqLib, empty = !!(P && P.isEmpty && P.isEmpty(D)), st = empty ? P.emptyStep(S.state, D) : null;
        const act = empty ? `<a class="btn pop" href="${esc(st.href)}">${esc(st.label === 'Next lesson' && st.title ? `Next lesson: ${st.title}` : st.label)}</a>` : '<a class="btn pop" href="#/pyq?practise=10">Practise 10 questions</a>';
        const how = `every wrong answer in practice or a test lands here and comes back for a retry from the next day. It closes when you get it right ${U.nf(R.resolve)} or more days after your last miss.`;
        body.innerHTML = `<div class="pr-empty nb-empty">${UI.empty('notebook', 'Your notebook is empty', empty ? `It fills itself once ICAI past papers, RTPs and MTPs are added: ${how}` : `It fills itself: ${how}`, act, { peak: m })}</div>`;
        return;
      }
      body.innerHTML = `<div class="nb-wrap"><div class="nb-main"><div class="nb-bar" id="nb-bar"></div><div class="nb-chips" id="nb-chips" role="group" aria-label="Filter by reason or subject"></div><h2 class="sr" id="nb-h-list">Your mistakes</h2><div class="nb-list" id="nb-list" role="region" aria-labelledby="nb-h-list"></div></div>
        <aside class="nb-side" id="nb-side" aria-label="Patterns"></aside></div>`;
      paintBar(); paintChips(); paintList(); paintSide();
    }
    function paintBar() {
      const t = tally(all(), today), el = U.$('#nb-bar', out); if (!el) return;
      const chips = [f.reason ? [`reason`, reasonLabel(f.reason)] : null, f.subject ? ['subject', (D.subjectById[f.subject] || { name: 'Unclassified' }).name] : null].filter(Boolean);
      el.innerHTML = `<div class="seg" role="group" aria-label="Show">${[['open', `Open ${U.nf(t.open)}`], ['resolved', `Resolved ${U.nf(t.resolved)}`], ['all', 'All']].map(([k, l]) => `<button type="button" data-status="${k}" class="${f.status === k ? 'on' : ''}" aria-pressed="${f.status === k}">${l}</button>`).join('')}</div>
        <select class="input" id="nb-sort" aria-label="Sort">${SORTS.map(([k, l]) => `<option value="${k}"${f.sort === k ? ' selected' : ''}>${l}</option>`).join('')}</select>
        ${chips.map(([k, l]) => `<button type="button" class="nb-fc" data-unset="${k}" aria-label="Remove the filter ${esc(l)}">${esc(l)}${icon('x')}</button>`).join('')}`;
    }
    function counts() {
      const open = all().filter(isOpen);
      return { open, byReason: U.countBy(open, e => e.n.reason || 'none'), bySubj: Object.entries(U.countBy(open, e => e.m.subject)).sort((a, b) => b[1] - a[1]) };
    }
    function paintChips() {
      const el = U.$('#nb-chips', out); if (!el) return;
      const { byReason, bySubj } = counts();
      const rc = RS.filter(([k]) => byReason[k]).map(([k, l]) => `<button type="button" class="nb-chip${f.reason === k ? ' on' : ''}" data-reason="${k}" aria-pressed="${f.reason === k}">${esc(l)} <b>${byReason[k]}</b></button>`);
      const sc = bySubj.slice(0, 8).map(([k, v]) => { const s = D.subjectById[k]; return `<button type="button" class="nb-chip${f.subject === k ? ' on' : ''}" data-subj="${k}" aria-pressed="${f.subject === k}">${esc(s ? s.short : 'Other')} <b>${v}</b></button>`; });
      el.innerHTML = rc.concat(sc).join('');
      el.hidden = !rc.length && !sc.length;
    }
    function paintSide() {
      const el = U.$('#nb-side', out); if (!el) return;
      const { open, byReason, bySubj } = counts(), maxS = bySubj.length ? bySubj[0][1] : 1;
      const row = ([k, v]) => { const s = D.subjectById[k]; return `<button type="button" class="nb-r nb-s${f.subject === k ? ' on' : ''}" data-subj="${k}" aria-pressed="${f.subject === k}">${s ? sIcon(k) : ''}<span>${esc(s ? s.name : 'Unclassified')}</span><em class="nb-m" aria-hidden="true"><i style="width:${Math.round((100 * v) / maxS)}%"></i></em><b>${v}</b></button>`; };
      const top = bySubj.slice(0, 6), rest = bySubj.slice(6), sel = rest.find(([k]) => k === f.subject);
      el.innerHTML = `<section class="pr-panel nb-reasons" aria-labelledby="nb-h-why"><div class="pr-sec-h"><div><h2 id="nb-h-why">Why you miss</h2><p>${open.length ? `${U.plural(open.length, 'open mistake')} by reason` : 'Nothing open'}</p></div></div>
          ${open.length ? `${C.stack(RS.map(([k, l, c]) => ({ v: byReason[k] || 0, color: c, label: l })), { aria: 'Open mistakes by reason' })}<div class="nb-bars">${RS.map(([k, l, c]) => byReason[k] ? `<button type="button" class="nb-r${f.reason === k ? ' on' : ''}" data-reason="${k}" aria-pressed="${f.reason === k}"><i style="background:${c}"></i><span>${l}</span><b>${byReason[k]}</b></button>` : '').join('')}</div>` : '<p class="muted">Every mistake here is resolved.</p>'}</section>
        <section class="pr-panel" aria-labelledby="nb-h-sub"><div class="pr-sec-h"><div><h2 id="nb-h-sub">By subject</h2><p>Where the open mistakes are</p></div></div>
          ${bySubj.length ? top.map(row).join('') + (sel ? row(sel) : '') + (rest.length ? `<details class="nb-more"><summary>${icon('chev-d')}<span>${rest.length} more subject${rest.length === 1 ? '' : 's'}</span></summary>${rest.filter(x => x !== sel).map(row).join('')}</details>` : '') : '<p class="muted">Nothing open.</p>'}</section>`;
    }
    function rowHtml(e, i) {
      const m = e.m, sj = D.subjectById[m.subject], w = whenOf(e, today), open = e.id === openId;
      const parts = [sj ? esc(sj.short) : '', m.topic ? esc(D.name(m.topic)) : '', esc(U.plural(m.marks, 'mark')) + ' · ' + esc(m.type)].filter(Boolean);
      return `<li class="nbr${e.n.resolved ? ' res' : ''}${open ? ' open' : ''}" data-id="${esc(e.id)}"><button type="button" class="nbr-h" aria-expanded="${open}" aria-controls="nbp-${i}">
          <span class="nbr-l"><span class="nbr-id">${esc(UI.paperLabel(m))} · ${esc(UI.qLabel(m))}</span><span class="nbr-t">${parts.join('<i aria-hidden="true"> · </i>')}</span></span>
          <span class="nbr-r">${e.n.reason ? `<span class="nbr-c">${esc(reasonLabel(e.n.reason))}</span>` : !e.n.resolved ? '<span class="nbr-tag">Tag why</span>' : ''}<span class="nbr-d${w.now ? ' now' : ''}">${e.n.resolved ? icon('check') : icon('clock')}${esc(w.text)}</span></span>
          <svg class="i nbr-chev" aria-hidden="true"><use href="#i-chev-d"/></svg></button><div class="nbr-p" id="nbp-${i}"${open ? '' : ' hidden'}></div></li>`;
    }
    // the list's size line; a change after a tap is announced through the one live region pair (GA.ui.say, P1-48), not a fresh live node
    const countText = (n, total) => (n < total ? `Showing ${U.nf(n)} of ${U.nf(total)}` : U.plural(total, 'entry', 'entries'));
    const sayCount = () => { const t = U.$('#nb-list .nb-count', out) || U.$('#nb-list .empty > b', out); if (t && UI && UI.say) UI.say(t.textContent); };
    function paintList(focusAt) {
      const el = U.$('#nb-list', out); if (!el) return;
      const list = select(all(), f, today, dueList(S.state, D, today)), n = Math.min(shown, list.length);
      if (!list.length) {
        const filtered = f.subject || f.reason;
        el.innerHTML = `<div class="pr-empty">${filtered ? UI.empty('filter', 'No entries match these filters', 'Try another reason or subject.', '<button class="btn" type="button" data-clear>Clear filters</button>')
          : f.status === 'resolved' ? UI.empty('check', 'Nothing resolved yet', 'Two right answers in a row resolve a mistake.')
          : (c => UI.empty('check', esc(c.title), esc(c.text), '', { peak: { mood: 'happy', gaze: 'up' } }))(clearedText(tally(all(), today)))}</div>`;
        return;
      }
      el.innerHTML = `<p class="nb-count">${esc(countText(n, list.length))}</p>
        <ol class="nb-rows">${list.slice(0, n).map(rowHtml).join('')}</ol>
        ${n < list.length ? `<button type="button" class="btn nb-more-b" data-more>${icon('plus')}<span>Show ${U.nf(Math.min(PAGE, list.length - n))} more</span></button>` : ''}`;
      if (openId) { const li = rowOf(openId); if (li) fillPanel(li); else openId = null; }
      if (focusAt != null) { const hs = U.$$('.nbr-h', el); const h = hs[Math.min(focusAt, hs.length - 1)]; if (h) h.focus({ preventScroll: false }); else { const t = U.$('h1', out); if (t) { t.tabIndex = -1; t.focus(); } } }
    }
    const rowOf = id => U.$$('.nbr', out).find(li => li.dataset.id === id) || null;
    async function fillPanel(li) {
      const id = li.dataset.id, p = U.$('.nbr-p', li), e = entries(S.state, D).find(x => x.id === id);
      if (!e) return;
      p.innerHTML = `<div class="nbr-s"><span class="skel" aria-hidden="true"></span></div>
        <div class="nbe-reasons" role="group" aria-label="Why did you miss it?"><span class="nbe-rl">Why?</span>${REASONS.map(([k, l]) => `<button type="button" class="nbe-c${e.n.reason === k ? ' on' : ''}" data-r="${k}" aria-pressed="${e.n.reason === k}">${l}</button>`).join('')}</div>
        <div class="nbr-note">${noteHtml(id)}</div>
        <div class="nbe-a"><a class="btn sm" href="#/q/${encodeURIComponent(id)}">${icon('refresh')}<span>Retry</span></a><button class="btn sm ghost" data-resolve type="button">${e.n.resolved ? `${icon('undo')}<span>Re-open</span>` : `${icon('check')}<span>Mark resolved</span>`}</button><span class="grow"></span><button class="btn sm ghost" data-del type="button">${icon('trash')}<span>Remove</span></button></div>
        <p class="nbr-meta">missed ${U.nf(e.n.misses || 1)}×${e.q.last ? ` · last answered ${esc(U.ago(e.q.last))}` : ''}${e.n.added ? ` · added ${esc(U.fmtDay(U.dayKey(e.n.added), { day: 'numeric', month: 'short' }))}` : ''}</p>`;
      const s = U.$('.nbr-s', p);
      try {
        const q = await DATA.question(id);
        if (!li.isConnected) return;
        const L = GA.pyqLib;
        s.textContent = q ? (L && L.snippet ? L.snippet(q, 260) : GA.md.toText(q.stem || (q.group && q.group.context) || '').slice(0, 260)) : '';
      } catch (err) {
        if (li.isConnected && UI && UI.loadFailed) UI.loadFailed(s, { what: 'question', main: false, retry: () => fillPanel(li) });
      }
    }
    function noteHtml(id, editing) {
      const note = noteOf(S.state, id);
      if (editing) return `<label class="nb-nl" for="nbn-${esc(id)}">Your note</label><textarea class="input nbe-note" id="nbn-${esc(id)}" rows="3" placeholder="What should you remember next time?">${esc(note)}</textarea>
        <div class="nb-na"><button type="button" class="btn sm primary" data-save>Save note</button><button type="button" class="btn sm ghost" data-cancel>Cancel</button></div>`;
      return note ? `<div class="nb-note"><b>Your note</b><p>${esc(note)}</p><button type="button" class="btn sm ghost" data-edit>${icon('edit')}<span>Edit</span></button></div>`
        : `<button type="button" class="btn sm ghost nb-add" data-edit>${icon('edit')}<span>Add a note</span></button>`;
    }
    function toggle(li) {
      const id = li.dataset.id, opening = openId !== id;
      if (openId) { const old = rowOf(openId); if (old) { old.classList.remove('open'); U.$('.nbr-h', old).setAttribute('aria-expanded', 'false'); U.$('.nbr-p', old).hidden = true; } }
      openId = opening ? id : null;
      if (!opening) return;
      li.classList.add('open'); U.$('.nbr-h', li).setAttribute('aria-expanded', 'true');
      const p = U.$('.nbr-p', li); p.hidden = false;
      fillPanel(li);
    }
    function setFilter(patch) {
      Object.assign(f, patch);
      shown = PAGE; openId = null;
      replaceUrl(GA.router.href('/notebook', filterQuery(f, shown)));
      paintBar(); paintChips(); paintSide(); paintList();
      sayCount();
    }
    function afterChange(li) {
      // an entry that leaves the current view (resolved, re-opened, removed): redraw the list and the numbers, keep focus on the next row
      const hs = U.$$('.nbr-h', out), at = li ? hs.indexOf(U.$('.nbr-h', li)) : null;
      openId = null;
      paintHead(); paintBar(); paintChips(); paintSide(); paintList(at);
    }

    paintHead(); paintBody();
    U.on(out, 'click', '#nb-retry', async () => {
      const ids = retryIds(S.state, D, U.today());
      if (!ids.length) { paintHead(); return; }
      try { await ensureQueue(); } catch (e) { UI.toast('The practice queue did not load. Try again.', 'bad'); return; }
      startRetry(ids);
    });
    U.on(out, 'click', '[data-status]', (e, b) => setFilter({ status: b.dataset.status }));
    U.on(out, 'click', '[data-reason]', (e, b) => setFilter({ reason: f.reason === b.dataset.reason ? '' : b.dataset.reason }));
    U.on(out, 'click', '[data-subj]', (e, b) => setFilter({ subject: f.subject === b.dataset.subj ? '' : b.dataset.subj }));
    U.on(out, 'click', '[data-unset]', (e, b) => setFilter({ [b.dataset.unset]: '' }));
    U.on(out, 'click', '[data-clear]', () => setFilter({ subject: '', reason: '' }));
    out.addEventListener('change', e => { if (e.target.id === 'nb-sort') { Object.assign(f, { sort: e.target.value }); replaceUrl(GA.router.href('/notebook', filterQuery(f, shown))); paintList(); } });
    U.on(out, 'click', '[data-more]', () => {
      const before = U.$$('.nbr', out).length;
      shown += PAGE; replaceUrl(GA.router.href('/notebook', filterQuery(f, shown)));
      paintList(); sayCount();
      const h = U.$$('.nbr-h', out)[before]; if (h) h.focus({ preventScroll: true });
    });
    U.on(out, 'click', '.nbr-h', (e, b) => toggle(b.closest('.nbr')));
    U.on(out, 'click', '[data-r]', (e, b) => {
      const li = b.closest('.nbr'), id = li.dataset.id, cur = S.state.nb[id] && S.state.nb[id].reason, next = cur === b.dataset.r ? null : b.dataset.r;
      GA.actions.notebookSet(id, { reason: next });
      U.$$('[data-r]', b.parentNode).forEach(x => { const on = x.dataset.r === next; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
      const r = U.$('.nbr-r', li), w = whenOf(entries(S.state, D).find(x => x.id === id), today, Date.now());
      r.innerHTML = `${next ? `<span class="nbr-c">${esc(reasonLabel(next))}</span>` : '<span class="nbr-tag">Tag why</span>'}<span class="nbr-d${w.now ? ' now' : ''}">${icon(S.state.nb[id].resolved ? 'check' : 'clock')}${esc(w.text)}</span>`;
      paintChips(); paintSide();
    });
    U.on(out, 'click', '[data-edit]', (e, b) => { const box = b.closest('.nbr-note'), id = b.closest('.nbr').dataset.id; box.innerHTML = noteHtml(id, true); const t = U.$('textarea', box); t.focus(); t.setSelectionRange(t.value.length, t.value.length); });
    U.on(out, 'click', '[data-cancel]', (e, b) => { const box = b.closest('.nbr-note'); box.innerHTML = noteHtml(b.closest('.nbr').dataset.id); const ed = U.$('[data-edit]', box); if (ed) ed.focus(); });
    const saveNote = b => {
      const box = b.closest('.nbr-note'), id = b.closest('.nbr').dataset.id, v = U.$('textarea', box).value;
      GA.actions.setNote(id, v);   // the one note store (§10.6): the card and the bank's 'Has my note' read the same field
      box.innerHTML = noteHtml(id); const ed = U.$('[data-edit]', box); if (ed) ed.focus();
      if (UI && UI.say) UI.say(v.trim() ? 'Note saved' : 'Note removed');
    };
    U.on(out, 'click', '[data-save]', (e, b) => saveNote(b));
    out.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && e.target.matches && e.target.matches('textarea.nbe-note')) { e.preventDefault(); const s = U.$('[data-save]', e.target.closest('.nbr-note')); if (s) saveNote(s); } });
    U.on(out, 'click', '[data-resolve]', (e, b) => {
      const li = b.closest('.nbr'), id = li.dataset.id;
      GA.actions.notebookSet(id, { resolved: S.state.nb[id].resolved ? null : Date.now() });
      if (UI && UI.say) UI.say(S.state.nb[id].resolved ? 'Marked resolved' : 'Re-opened');
      afterChange(li);
    });
    U.on(out, 'click', '[data-del]', async (e, b) => {
      const li = b.closest('.nbr'), id = li.dataset.id;
      if (await UI.confirm('Remove this question from the notebook? Your attempt history is kept.', { ok: 'Remove', danger: true })) {
        if (!li.isConnected) return;
        GA.actions.notebookRemove(id);
        if (UI && UI.say) UI.say('Removed from the notebook');
        if (!entries(S.state, D).length) { paintHead(); paintBody(); return; }
        afterChange(li);
      }
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
