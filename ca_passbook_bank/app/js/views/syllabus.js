/* PassBook — the syllabus index (/syllabus) and the subject pages (/s/:subject). Both views live here (shell.js FILE maps subject -> 'syllabus').
   Every number is computed: content counts and exam statistics come from GA.insights (pure functions of GA.data.D), progress from GA.store.
   Styles: app/css/subject.css (.sj-* subject page, .sy-* syllabus index), built on the hub primitives in hubs.css (.hb-head, .hb-card, .hb-stats,
   .hb-seg, .hb-ic, .hb-bar, .hb-link, .hb-meta). v3 language (docs/FRONTEND_V3_SPEC.md section 6): page header with a real-data line, solid cards,
   primary bars and rings, one .pop CTA per screen (the next lesson), subject identity = glyph (GA.charts.subj) + name, no subject colours.
   Every coral that names a lesson is the shared next step, GA.stats.nextStep (kind 'lesson'; ARCHITECTURE §10.3, audit P0-08): scope 'all' for
   the /syllabus header, 'subject:<id>' for the subject hero and its list badge. Links from the subject page carry ?focus=1 (the current subject).

   /s/:subject      hero card, shorter (glyph + a native 'Switch subject' select, name, the official syllabus line clamped to 2 lines, one
                    meta line: lessons · hours · topics · builds on, your progress, the .pop next lesson, a quiet 'Fast track' link; a primary
                    panel with the like-for-like marks a paper and the share of every GATE year's paper) · sticky nav whose labels are the
                    section H2s: Lessons · Where the marks are · Year by year · Labs · Lessons: one numbered sequence in I.order whose topic
                    names are H3s (a disclosure button inside the H3 on phones only, a sticky topic index at >= 1100 px) · Where the marks
                    are: the hook cards (big digits), then one ranking of topics by marks with the learner's 'You: 3/13 right' (list, or the
                    GA.mapviz treemap on desktop) · Year by year (share of the paper by default, or marks per paper; heaviest / lightest year on
                    share; question types, table view) · labs · prev/next without wrap. 'Open in map' from the section heads.
                    Audit P1-04, P1-05, P2-13, P3-08, P3-09, P3-47. Query: ?t=<topicId> opens that topic, ?tab=weight scrolls to Year by year.
   /syllabus        header (one real-data line, the .pop shared next step with its reason, the chosen route, a quiet 'Content map' link) ·
                    a 4-cell number strip · Routes (From zero, 80% of the marks, Crash course, Last 30 days: choosing one sets profile.route) ·
                    what changed in 2027 (one folded line) · sticky search + tier/status filters with tips (one Filters button on phones) · the
                    key line (what Core / Extended / Advanced, legacy / extra and, once there is progress, the done / started dots mean; on phones
                    each open card carries its own) · 14 subject cards whose header opens the subject, a 44 px 'Topics' toggle, mastery rings,
                    'Builds on'. Audit P1-07, P1-06, P2-09, P2-10, P1-55.
                    Query: ?q=&tier=&status=&open=id,id (kept in the URL with replaceState). */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, esc = U.esc, icon = (n, c) => GA.icon(n, c), UI = GA.ui, C = GA.charts;
  GA.views = GA.views || {};
  /* what changed in the syllabus text since the last attempt, as [subject id, name, change] rows: none for the CA Inter new scheme (the section
     hides itself while the list is empty) */
  const CHANGES = [];
  /* tiers (P2-09, D14): the data keeps 'standard', the label reads 'Extended'; GA.ui.str.tier (WP1) wins when it is there */
  const TIERS = [['core', 'Core'], ['standard', 'Extended'], ['advanced', 'Advanced']];
  /** what each tier is for (content/syllabus/syllabus.txt: c = every student must be able to write it, a = scoring depth) */
  const TIER_DEF = { core: 'what every student must be able to write', standard: 'one level deeper', advanced: 'scoring depth' };
  const STATUS = [['in', 'In syllabus'], ['legacy', 'Legacy'], ['extra', 'Extra']];
  /** one wording per status (P2-66), for the tips, the screen-reader copies and the visible keys */
  const STATUS_DEF = { in: 'named in the ICAI syllabus', legacy: 'not in the current syllabus; named in earlier syllabi, still in past papers', extra: 'not named in the syllabus text, but asked in past papers' };
  const TYPES = [['MCQ', 'Multiple choice', 'One correct option; a wrong answer costs a third of the marks'], ['MSQ', 'Multiple select', 'All correct options and no wrong one; no negative marking'], ['NAT', 'Numerical answer', 'Type the number; no negative marking']];

  /* ------------------------------------------------------------------ small helpers */
  function ensureCss() {
    if (typeof document === 'undefined' || document.querySelector('link[href*="css/subject.css"]')) return;
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'app/css/subject.css'; document.head.appendChild(l);
  }
  const reduced = () => (GA.reveal && GA.reveal.reduced ? GA.reveal.reduced() : !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches));
  const n1 = x => String(U.round(x || 0, 1));
  const pctS = x => { const p = 100 * (x || 0); return (p < 100 ? U.round(p, 1) : Math.round(p)) + '%'; };
  const pl = (n, w, ws) => U.plural(n, w, ws);
  const ordS = n => n + ((n % 100 >= 11 && n % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'));
  const lstate = (S, id) => { const e = S.state.lessons[id]; return e && e.done ? 'done' : e && e.visits ? 'seen' : ''; };
  /** shared wording (GA.ui.str, WP1) when it exists; until then the D14 label ('Extended' for the data's 'standard') */
  const tierName = t => { const m = GA.ui && GA.ui.str && GA.ui.str.tier; return (m && m[t]) || (TIERS.find(x => x[0] === t) || [])[1] || U.cap(t); };
  /** tier as plain muted text, only on rows that are not core (P2-09: 230 rows saying 'Core' told nothing); syllabus status as a small dot +
      word (only when it is not "in the syllabus"). The status explanation is plain text for everyone (P1-55: no hover-only tips): a visually
      hidden copy here, a visible key line once per page, and a tap tip (statusTip) wherever the marker is not inside a link */
  const tierTxt = t => (t && t !== 'core' ? `<span class="sj-tier">${esc(tierName(t))}</span>` : '');
  const statusTxt = st => (st && st !== 'in' ? `<span class="sj-stt"><span class="dotl warn">${esc(st)}</span><span class="sr"> (${esc(STATUS_DEF[st] || '')})</span></span>` : '');
  const statusTip = st => {
    if (!st || st === 'in') return '';
    if (!(UI && typeof UI.infoTip === 'function')) return statusTxt(st);
    return UI.infoTip(U.cap(st) + ': ' + STATUS_DEF[st], { html: `<span class="dotl warn">${esc(st)}</span>`, cls: 'txt sj-stt' });
  };
  /** per tier: sub-topics and their share of the sub-topic-tagged PYQ marks (the key line's real numbers). Pure: tests/syllabus.test.js */
  function tierStats(D, I) {
    const out = {}; let tot = 0;
    TIERS.forEach(([t]) => (out[t] = { n: 0, marks: 0, share: 0 }));
    D.subjects.forEach(s => s.topics.forEach(t => t.subtopics.forEach(n => {
      const o = out[n.tier]; if (!o) return;
      const mk = (I && I.subtopic && I.subtopic(n.id) ? I.subtopic(n.id).marks : 0) || 0;
      o.n++; o.marks += mk; tot += mk;
    })));
    Object.values(out).forEach(o => (o.share = tot ? o.marks / tot : 0));
    return out;
  }
  const pct0 = x => (x > 0 && x < 0.005 ? 'under 1%' : Math.round(100 * x) + '%');
  const medName = name => (U.medName ? U.medName(name) : String(name || ''));
  /** the name a phone's one-line 'Open …' link uses: the medium name when 'Open ' + it fits 26 characters, else the paper's short name
      ('Open Costing' for Cost and Management Accounting) */
  const phoneName = s => { const mn = medName(s.name); return ('Open ' + mn).length <= 26 || !s.short ? mn : s.short; };

  /* ------------------------------------------------------------------ the shared next step (P0-08, ARCHITECTURE §10.3) */
  /** GA.stats.nextStep with kind 'lesson' (WP4) for scope 'all' (the /syllabus header) or 'subject:<id>' (the subject hero and list badge);
      until it exists, today's choice in the same shape. Returns a lesson step {kind, rule, label, title, id, subject, minutes, reason, href}
      or null (every in-syllabus lesson done / the subject finished). */
  function stepFor(state, D, I, scope, today) {
    const st = GA.stats;
    if (st && typeof st.nextStep === 'function') {
      try { return st.nextStep(state, D, { kind: 'lesson', scope, today, I }); } catch (e) { if (g.console) console.warn('nextStep:', e); }
    }
    const done = id => !!(state.lessons[id] && state.lessons[id].done), touched = id => !!state.lessons[id];
    let id = null, sid = null;
    if (/^subject:/.test(scope)) { sid = scope.slice(8); id = (I ? I.order(sid) : []).find(x => D.lessonById[x] && !done(x)) || null; }
    else if (st && st.nextLessons) id = st.nextLessons(state, D, 1).all[0] || null;
    if (!id || !D.lessonById[id]) return null;
    const l = D.lessonById[id], sub = I && I.subtopic ? I.subtopic(id) : null, R = I ? I.subject(l.subject) : null;
    const any = sid ? D.lessons.some(x => x.subject === sid && touched(x.id)) : Object.keys(state.lessons).length > 0;
    return { kind: 'lesson', rule: any ? 'continue' : 'start', label: touched(id) && !done(id) ? 'Continue' : any ? 'Next up' : 'Start here', title: l.title, id, subject: l.subject,
             minutes: l.minutes || null, reason: sub && sub.pyqs ? `${U.plural(sub.pyqs, 'ICAI question')} in ${sub.papers} of ${R ? R.papers : D.papers.length} papers` : bankN(D) && bankN(D).sub[id] ? `${U.plural(bankN(D).sub[id], 'ICAI question')} to practise` : '', href: '#/l/' + id + '?focus=1' };
  }
  /** the /syllabus header's coral: the shared next step (kind 'lesson', scope 'all') with its reason; 'Take a full mock' once every
      in-syllabus lesson is done (D18: a done state still gets a real next step) */
  function headerCta(state, D, I, today) {
    const s = stepFor(state, D, I, 'all', today);
    if (s && s.id && D.lessonById[s.id]) {
      const sj = D.subjectById[s.subject || D.lessonById[s.id].subject];
      return { kicker: `${s.label} · ${medName(sj ? sj.name : '')}`, title: s.title, href: s.href, reason: s.reason || '', step: s };
    }
    if (!D.lessons.length) return { kicker: 'Lessons are being written', title: 'See the syllabus on the map', href: '#/map', reason: '', step: null };
    if (!bankOf(D)) return { kicker: 'Every lesson written so far is done', title: 'Review your flashcards', href: '#/flash', reason: 'new lessons appear here as they are written', step: null };
    const fs = GA.ui && GA.ui.fullStep ? GA.ui.fullStep(D) : { label: 'Take a full mock', href: '#/test?new=mock' };
    return { kicker: 'Every syllabus lesson done', title: fs.label, href: fs.href, reason: 'a dress rehearsal in exam conditions', step: null };
  }
  /** the ICAI question bank has questions (false until it is built: every question-bank section then hides itself) */
  function bankOf(D) { return !!(D && Array.isArray(D.questions) && D.questions.length); }
  /** the ICAI bank's own counts (docs/ICAI_BANK.md §7): every item of every document (exam papers, RTPs and MTPs), by sub-topic (its primary
      sub-topic or a secondary tag), chapter and paper, OR alternatives left out. Insights count exam papers only (what the exam sets), so on
      an ICAI bank the subject page and the syllabus count from here; null for a GATE-shaped bank */
  const BANKN = new WeakMap();
  function bankN(D) {
    if (!bankOf(D) || !D.questions.every(q => q.icai)) return null;
    let o = BANKN.get(D);
    if (o) return o;
    o = { sub: {}, topic: {}, subject: {}, all: 0, docs: D.papers.length };
    const topicOf = {};
    D.subjects.forEach(s => s.topics.forEach(t => t.subtopics.forEach(n => (topicOf[n.id] = t.id))));
    const add = (m, k) => { if (k) m[k] = (m[k] || 0) + 1; };
    D.questions.forEach(q => {
      if (q.alt) return;
      o.all++;
      const subs = U.uniq([q.subtopic].concat(q.tags || []).filter(Boolean));
      subs.forEach(x => add(o.sub, x));
      U.uniq([q.topic].concat(subs.map(x => topicOf[x])).filter(Boolean)).forEach(x => add(o.topic, x));
      add(o.subject, q.subject);
    });
    BANKN.set(D, o);
    return o;
  }
  /** an ICAI bank count: 'N ICAI questions', or the honest none-yet */
  const bankTxt = (n, none) => (n ? pl(n, 'ICAI question') : none || 'no ICAI question yet');
  /** 'Paper 4' from the syllabus paper code P4 / P6A */
  const paperName = s => (s && s.paper ? String(s.paper).replace(/^P/, 'Paper ') : '');
  /** progress as a small dot: filled = done, ring = started; absent otherwise (a fresh profile shows nothing). Its meaning is plain text, never a
      hover-only title (P1-55): a visually hidden copy on the row (stateSr) and a visible legend (progKey here, the subject page's legend line) */
  const stateDot = stt => (stt === 'done' ? `<span class="hb-st done" aria-hidden="true">${icon('check')}</span>` : stt === 'seen' ? '<span class="hb-st seen" aria-hidden="true"></span>' : '');
  const progKey = cls => `<span class="sy-kg ${cls || ''}"><span class="sy-kh">Your lessons</span><span class="sj-lg">${stateDot('done')} done</span><span class="sj-lg">${stateDot('seen')} started</span></span>`;
  const stateSr = stt => (stt === 'done' ? '<span class="sr">, done</span>' : stt === 'seen' ? '<span class="sr">, started</span>' : '');
  /** one tab stop for a radio-like group (P3-15): GA.ui.roving when the shell has it (ARCHITECTURE §10.2), else the same behaviour here:
      the checked option is the group's tab stop; arrows, Home and End move focus and choose. Returns {destroy}. */
  function roving(group) {
    if (!group) return { destroy() {} };
    if (UI && typeof UI.roving === 'function') {                     // the contract returns destroy() itself (ARCHITECTURE §10.2)
      const r = UI.roving(group, { items: '[role="radio"]' });
      return typeof r === 'function' ? { destroy: r } : r && typeof r.destroy === 'function' ? r : { destroy() {} };
    }
    const items = () => Array.from(group.querySelectorAll('[role="radio"]'));
    const sync = () => { const all = items(), on = all.find(b => b.getAttribute('aria-checked') === 'true') || all[0]; all.forEach(b => (b.tabIndex = b === on ? 0 : -1)); };
    const onKey = e => {
      const all = items(), i = all.indexOf(e.target); if (i < 0) return;
      const j = /^(ArrowRight|ArrowDown)$/.test(e.key) ? (i + 1) % all.length : /^(ArrowLeft|ArrowUp)$/.test(e.key) ? (i - 1 + all.length) % all.length : e.key === 'Home' ? 0 : e.key === 'End' ? all.length - 1 : -1;
      if (j < 0) return;
      e.preventDefault(); all[j].focus(); all[j].click();
    };
    group.addEventListener('keydown', onKey);
    const mo = typeof MutationObserver !== 'undefined' ? new MutationObserver(sync) : null;
    if (mo) mo.observe(group, { subtree: true, attributes: true, attributeFilter: ['aria-checked'] });
    sync();
    return { destroy() { group.removeEventListener('keydown', onKey); if (mo) mo.disconnect(); } };
  }
  let timers = [];                                    // pending timeouts of the current view (cleared by leave())
  const later = (fn, ms) => { const t = setTimeout(() => { timers = timers.filter(x => x !== t); fn(); }, ms); timers.push(t); return t; };
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  /** scroll so el sits just below the sticky chrome (top bar + the in-page nav or the syllabus tools when they stick); measured, so it does not
      depend on html's scroll-padding or on CSS scroll margins */
  const scrollBelowChrome = (el, smooth) => {
    const h = sel => { const x = document.querySelector(sel); return x && /sticky|fixed/.test(getComputedStyle(x).position) ? x.getBoundingClientRect().height : 0; };
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--topbar')) || 0;
    const off = Math.max(nav, h('.topbar')) + h('.sj-local') + h('.sy-tools') + 16;
    scrollTo({ top: Math.max(0, Math.round(el.getBoundingClientRect().top + scrollY - off)), behavior: smooth && !reduced() ? 'smooth' : 'auto' });
  };
  const jumpTo = (id, flash) => {
    const el = document.getElementById(id);
    if (!el) return;
    scrollBelowChrome(el, true);
    if (flash) { el.classList.remove('sj-flash'); void el.offsetWidth; el.classList.add('sj-flash'); later(() => el.classList.remove('sj-flash'), 1800); }
  };
  /** clean axis ticks: 0..max in steps of 1/2/5 x 10^k */
  function ticks(max, n) {
    if (!(max > 0)) return { top: 1, step: 1, list: [0, 1] };
    const raw = max / (n || 4), mag = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / mag;
    const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * mag, top = Math.ceil(max / step - 1e-9) * step, list = [];
    for (let v = 0; v <= top + 1e-9; v += step) list.push(Math.round(v * 1000) / 1000);
    return { top, step, list };
  }
  const lower = s => String(s || '').toLowerCase();
  const yearsOf = D => U.uniq(D.papers.map(p => p.year)).sort((a, b) => a - b);

  /** the mini-chart a hook can carry, derived only from its evidence (null when the evidence has nothing to draw):
      {kind:'years', on:[bool per year]} for hooks about which years asked something;
      {kind:'pair', a:{part,whole,label}, b:{...}} cost share (grey) against marks share (accent) for concentration / fast-path hooks;
      {kind:'bar', part, whole} for one share. ctx = {years: every GATE year in the bank, minutes: the subject's total reading minutes} */
  function hookViz(h, ctx) {
    const e = (h && h.evidence) || {}, c = ctx || {}, num = x => typeof x === 'number' && isFinite(x), len = x => (Array.isArray(x) ? x.length : null);
    const share = (part, whole, label) => (num(part) && num(whole) && whole > 0 && part >= 0 && part <= whole ? { part, whole, label } : null);
    const one = s => (s ? { kind: 'bar', part: s.part, whole: s.whole } : null);
    if (Array.isArray(e.years) && e.years.length && Array.isArray(c.years) && c.years.length) {
      const set = new Set(e.years);
      return { kind: 'years', years: c.years.slice(), on: c.years.map(y => set.has(y)) };
    }
    if (Array.isArray(e.topics) && !e.labs && num(e.of) && num(e.marks) && num(e.total)) {
      const a = share(e.topics.length, e.of, 'of the topics'), b = share(e.marks, e.total, 'of the marks');
      return a && b ? { kind: 'pair', a, b } : null;
    }
    if (Array.isArray(e.lessons) && num(e.minutes) && num(e.marks) && num(e.total)) {
      const a = share(e.minutes, c.minutes, 'of the reading time'), b = share(e.marks, e.total, 'of the marks');
      return a && b ? { kind: 'pair', a, b } : one(b);
    }
    if (num(e.twoMarks) && num(e.marks)) return one(share(e.twoMarks, e.marks));
    if (num(e.two) && num(e.pyqs)) return one(share(e.two, e.pyqs));
    if (num(e.natMarks) && num(e.msqMarks) && num(e.marks)) return one(share(e.natMarks + e.msqMarks, e.marks));
    if (num(e.natMarks) && num(e.marks)) return one(share(e.natMarks, e.marks));
    if (len(e.nat) != null && len(e.all) != null) return one(share(e.nat.length, e.all.length));
    if (len(e.papers) != null && num(e.totalPapers)) return one(share(e.papers.length, e.totalPapers));
    if (num(e.marks) && num(e.total)) return one(share(e.marks, e.total));
    return null;
  }
  const pc = s => Math.round((100 * s.part) / s.whole);
  function vizHtml(v) {
    if (!v) return '';
    const bar = s => `<span class="hb-bar sm" aria-hidden="true"><i style="width:${((100 * s.part) / s.whole).toFixed(1)}%"></i></span>`;
    if (v.kind === 'years') return `<span class="sj-ticks" aria-hidden="true">${v.on.map(o => `<i${o ? ' class="on"' : ''}></i>`).join('')}</span><span class="sj-fcap">${v.years[0]}–${v.years[v.years.length - 1]}</span>`;
    if (v.kind === 'pair') return `<span class="sj-duo">${[['a', v.a], ['b', v.b]].map(([k, s]) => `<span class="sj-duo-r ${k}">${bar(s)}<span>${pc(s)}% ${esc(s.label)}</span></span>`).join('')}</span>`;
    return `<span class="sj-one">${bar(v)}</span>`;
  }

  /* ================================================================== subject page */
  /** the like-for-like marks a paper (I.subject().perPaper, P1-03: in-syllabus share of each paper's technical marks x 85, GA 15); the raw
      average until the insights carry it */
  const perOf = R => (R && R.perPaper != null ? R.perPaper : R ? R.marksPerPaper : 0);
  const SECTION_MARKS = { CS: 85, GA: 15 };
  /** the same like-for-like figure over the papers of the last years only (the hero's "7.0 in 2022–'26"), so the hero compares like with like.
      Mirrors insights.js likeForLike for a range; null when the insights do not carry perPaper yet (the raw recentPerPaper is then the pair) */
  function perSince(D, R, from) {
    if (!R || R.perPaper == null || R.paperMarks) return null;          // an ICAI paper's marks are fixed: there is no like-for-like range figure
    const sec = R.section === 'GA' ? 'GA' : 'CS', ps = D.papers.filter(p => p.year >= from && (sec === 'CS' || p.ga));
    let sum = 0, n = 0;
    ps.forEach(p => {
      const qs = D.questions.filter(q => q.paper === p.id && q.section === sec && !q.legacy), tot = U.sum(qs.map(q => q.marks || 0));
      if (!tot) return;
      n++; sum += U.sum(qs.filter(q => q.subject === R.id).map(q => q.marks || 0)) / tot;
    });
    return n ? (sum / n) * SECTION_MARKS[sec] : null;
  }
  const fx1 = x => (Math.round((x || 0) * 10) / 10).toFixed(1);
  /** a route that saves at least a quarter of the subject's reading time is worth a 'Fast track' link (P1-06) */
  const FAST_SAVES = 0.25;
  /** a 'fast track' hook that needs more than 60% of the subject's reading time is no fast track: the card is left out (P1-52) */
  const FAST_MAX = 0.6;
  /** the path-half hook states the real share of the marks it covers (P1-52): its title is rebuilt from the evidence when it does not */
  function hookCard(h, R) {
    const e = (h && h.evidence) || {};
    if (h.template !== 'path-half' || !(e.total > 0) || !Array.isArray(e.lessons)) return h;
    const share = Math.round((100 * e.marks) / e.total);
    if (new RegExp('\\b' + share + '%').test(h.title)) return h;
    return Object.assign({}, h, { title: `${share}% of ${R.name} marks in ${h.stat.value} hours of lessons`,
      body: `${U.plural(e.lessons.length, 'lesson')} of ${R.lessons}, ranked by marks per minute, prerequisites within the subject included.` });
  }
  /** the subject page's hook cards: up to 3, without a 'fast track' that is not fast */
  function pickHooks(I, R, sid) {
    return I.hooks(5, { subject: sid, exclude: ['freq-years', 'freq-papers', 'trend-subject'] })
      .filter(h => !(h.template === 'path-half' && h.evidence && R.minutes && h.evidence.minutes > FAST_MAX * R.minutes))
      .slice(0, 3).map(h => hookCard(h, R));
  }
  /** per topic of a subject: {topicId: {tried, right}} from the learner's question records (latest outcome; P3-47 'You: 3/13 right') */
  function youByTopic(state, D, sid) {
    const out = {}, q = (state && state.q) || {};
    D.questions.forEach(x => {
      if (x.subject !== sid || !x.topic) return;
      const e = q[x.id]; if (!e || !e.n) return;
      const o = out[x.topic] = out[x.topic] || { tried: 0, right: 0 };
      o.tried++; if (e.lastOk) o.right++;
    });
    return out;
  }
  const youTxt = y => (y && y.tried ? `<span class="sj-you"><span aria-hidden="true">You: ${y.right}/${y.tried} right</span><span class="sr">You tried ${U.plural(y.tried, 'of its questions', 'of its questions')}, ${y.right} right on the latest try</span></span>` : '');
  /** "builds on" (P3-08): the other subjects whose lessons this subject's lessons need, by "needs" links, kept when 2 or more:
      [{id, n}], most links first. The subject hero and the /syllabus cards print 'Builds on PDS (17) · DM (4)'. */
  function buildsOn(D, I, sid) {
    const bc = {};
    I.graph(sid).external.forEach(e => { const l = D.lessonById[e.from]; if (l && l.subject !== sid) bc[l.subject] = (bc[l.subject] || 0) + 1; });
    const at = id => D.subjects.findIndex(x => x.id === id);
    return Object.keys(bc).filter(x => bc[x] >= 2 && D.subjectById[x]).sort((a, b) => bc[b] - bc[a] || at(a) - at(b)).map(x => ({ id: x, n: bc[x] }));
  }
  const buildsHtml = (D, list) => (list.length ? `<span class="sj-bo">Builds on ${list.map(b => `<a href="#/s/${b.id}">${esc(D.subjectById[b.id].short)}</a> (${b.n})`).join(' · ')}<span class="sr"> (“needs” links from those subjects’ lessons)</span></span>` : '');
  /** everything the subject page shows, from the catalogue, the insights and the learner's state */
  function model(D, I, S, sid, today) {
    today = today || U.today();
    const s = D.subjectById[sid], R = I.subject(sid);
    const k = D.subjects.findIndex(x => x.id === sid), N = D.subjects.length;
    const order = I.order(sid), step = {};
    order.forEach((id, i) => (step[id] = i + 1));
    const G = I.graph(sid), level = {}, preds = {}, ext = {};
    G.nodes.forEach(n => { level[n.id] = n.level; preds[n.id] = []; ext[n.id] = []; });
    G.edges.forEach(e => preds[e.to] && preds[e.to].push(e.from));
    G.external.forEach(e => ext[e.to] && ext[e.to].push(e.from));
    const builds = buildsOn(D, I, sid);
    const st = {}; order.forEach(id => (st[id] = lstate(S, id)));
    /* 'touched' = real reading in this subject (P0-08: a 2-second peek is not progress; GA.stats.realLesson when it is there) */
    const real = id => { const r = S.state.lessons[id]; return !!r && (GA.stats && typeof GA.stats.realLesson === 'function' ? GA.stats.realLesson(r) : true); };
    const done = order.filter(id => st[id] === 'done').length, touched = order.some(real);
    const sum = GA.stats.subjects(S.state, D, today).find(x => x.id === sid) || { pyq: { attempted: 0 }, mastery: null };
    /* where the learner stands per topic (P3-47): questions tried and right on their latest attempt */
    const mine = youByTopic(S.state, D, sid);
    /* the hero coral and the list badge: the shared next step within this subject (null = the subject is finished) */
    const next = stepFor(S.state, D, I, 'subject:' + sid, today), nextId = next && next.id ? next.id : null;
    const allStep = order.length ? null : stepFor(S.state, D, I, 'all', today);
    const years = yearsOf(D), Y0 = years[0], Y1 = years[years.length - 1], recentFrom = years[Math.max(0, years.length - 5)];
    const firstSecYear = (R.trend.find(t => t.papers) || { year: Y0 }).year;
    const peers = I.subjects.filter(x => x.section === R.section).slice().sort((a, b) => perOf(b) - perOf(a));
    /* the subject's fast track (insights' rescue route): only when it saves at least a quarter of the reading time */
    const rp = I.rescue ? I.rescue(sid) : I.path ? I.path('rescue:' + sid) : null;
    const fast = rp && rp.lessons && rp.lessons.length && R.minutes && rp.minutes <= (1 - FAST_SAVES) * R.minutes
      ? { id: rp.id, href: rp.href, lessons: rp.lessons.length, hours: rp.hours, share: rp.subjectShare != null ? rp.subjectShare : rp.share } : null;
    const trendHook = I.hooks(0, { subject: sid, kinds: ['trend'] }).find(h => h.template === 'trend-subject') || null;
    const hooks = pickHooks(I, R, sid);
    const labs = I.labCards().filter(l => l.subject === sid && l.status !== 'planned').slice().sort((a, b) => (b.pyqs || 0) - (a.pyqs || 0) || (b.marks || 0) - (a.marks || 0));
    /* the paper's exam day (GA.stats.paperDays: content/exam.json papers) and the cycle's time, for the hero's CA panel */
    let day = null, E = null;
    try { E = GA.stats.exam ? GA.stats.exam(S.state, D.exam, today) : null; day = GA.stats.paperDays ? GA.stats.paperDays(D, D.exam, today, S.state)[sid] || null : null; } catch (e) { day = null; }
    const cyc = (E && E.cycle) || null, hasQ = bankOf(D) && R.pyqs > 0 && R.trend.length > 0;
    /* previous / next subject in syllabus order, no wrap from General Aptitude back to Discrete Mathematics (P3-08) */
    return { s, R, k, N, prev: k > 0 ? D.subjects[k - 1] : null, next: k < N - 1 ? D.subjects[k + 1] : null, order, step, G, level, preds, ext, st, done, touched, sum, nextId, nextStep: next,
             years, Y0, Y1, recentFrom, firstSecYear, rank: peers.findIndex(x => x.id === sid) + 1, peers: peers.length, per: perOf(R), recentPer: perSince(D, R, recentFrom), builds, fast, trendHook, hooks, labs,
             runs: sequence(D, order), tl: timelineRows(D, sid, R), mine, hasQ, day, cycle: cyc, E, bank: bankOf(D), allStep, D,
             BN: bankN(D), nQ: bankN(D) ? bankN(D).subject[sid] || 0 : R.pyqs };
  }
  /** the Lessons section as runs of consecutive lessons of one topic, in I.order (P1-05): the numbering is the learning order itself, a topic
      the order returns to gets a 'continued' divider, and a trailing run of lessons outside the 2027 syllabus text (status legacy / extra; I.order
      puts them last, P2-08) becomes one labelled group. Returns [{topic, cont, outside, ids, start}], start = the step of its first lesson. */
  function sequence(D, order) {
    const out = [], seen = new Set(), stIn = id => { const l = D.lessonById[id]; return !l.status || l.status === 'in'; };
    let tail = order.length;
    while (tail > 0 && !stIn(order[tail - 1])) tail--;
    if (!order.slice(0, tail).some(stIn)) tail = order.length;                 // a subject with nothing in the syllabus: no separate group
    order.forEach((id, i) => {
      const outside = i >= tail, topic = outside ? '_outside' : D.lessonById[id].topic, last = out[out.length - 1];
      if (last && last.topic === topic) { last.ids.push(id); return; }
      out.push({ topic, cont: !outside && seen.has(topic), outside, ids: [id], start: i + 1 });
      seen.add(topic);
    });
    return out;
  }

  const glyph = (id, cls) => (C && C.subj ? C.subj(id, cls) : icon('book', cls));

  /* ---- hero: a solid card in two halves, like the home resume hero. Left: identity (glyph + name), the official line, progress, the one
     .pop CTA. Right (primary panel): what the papers say about the subject, with marks per paper for every GATE year. */
  /** the hero's right panel while the paper has no ICAI questions: the paper's own facts (code, marks, its exam day and time, chapters,
      sub-topics, the pass mark), every one from the syllabus and content/exam.json */
  function paperPanelHtml(m) {
    const { s, R } = m, six = /^P6[AB]$/.test(s.paper || ''), groupMarks = U.sum(((m.D || GA.data.D).subjects || []).map(x => +x.marks || 0));
    const subs = s.topics.reduce((n, t) => n + t.subtopics.length, 0);
    const tm = m.cycle && m.cycle.time, clock = hm => { const x = /^(\d{1,2}):(\d{2})$/.exec(hm || ''); if (!x) return hm || ''; const h = +x[1]; return `${h % 12 || 12}${x[2] === '00' ? '' : '.' + x[2]} ${h < 12 ? 'AM' : 'PM'}`; };
    const left = m.day ? U.daysBetween(U.today(), m.day) : null;
    const when = m.day ? `${U.fmtDay(m.day, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}${tm ? `, ${clock(tm.start)} to ${clock(tm.end)} ${tm.zone || ''}`.trimEnd() : ''}` : '';
    const leftTxt = left == null ? '' : left > 1 ? `${U.nf(left)} days to go` : left === 1 ? 'tomorrow' : left === 0 ? 'today' : 'written';
    const share = groupMarks ? Math.round((100 * (+s.marks || 0)) / groupMarks) : 0;
    const sub = six ? `${esc(paperName(s))}: half of Paper 6 (100 marks)` : `${share}% of Group II's ${U.nf(groupMarks)} marks`;
    return `<div class="sj-hr sj-hr-ca">
      <div class="sj-hr-cap"><b>${esc(paperName(s) || 'Paper')} · ${esc(s.area || 'Group II')}</b><span>${esc(m.cycle && m.cycle.label ? m.cycle.label : '')}</span></div>
      <div class="sj-hr-big"><b>${U.nf(+s.marks || 0)}</b><span>marks<br><small>${sub}</small></span></div>
      ${when ? `<p class="sj-hr-day">${icon('calendar')}<span><b>${esc(when)}</b>${tm && tm.reading ? `<small>reading time from ${esc(clock(tm.reading))}</small>` : ''}${leftTxt ? `<small>${esc(leftTxt)}</small>` : ''}</span></p>` : ''}
      <div class="sj-hr-row"><div><b>${s.topics.length}</b><span>chapters</span></div><div><b>${U.nf(subs)}</b><span>sub-topics</span></div><div><b>40</b><span>${six ? 'of 100 in Paper 6 to pass' : 'of 100 to pass'}</span></div></div>
      <button type="button" class="sj-hr-go" data-jump="sj-lessons">Lessons ${icon('arrow-r')}</button></div>`;
  }
  function heroVizHtml(m) {
    if (!m.hasQ || !m.tl.length) return paperPanelHtml(m);
    /* P2-13: the year columns are the share of each year's paper (marks per 100-mark paper), so the 150-mark 2007–08 papers do not tower */
    const { R } = m, rows = m.tl, live = rows.filter(t => !t.na), mx = Math.max(1e-9, ...live.map(t => t.share));
    const yy = y => "'" + String(y).slice(2), pk = yearExtremes(rows).peak;
    const cols = rows.map((t, k) => (!t.na ? `<i style="--v:${Math.max(3, (100 * t.share) / mx).toFixed(1)}%;--k:${k}" data-ftip="${esc(`${t.year}\n${pctS(t.share)} of the paper\n${U.nf(t.raw)} of ${U.nf(t.paperMarks)} marks`)}"></i>` : `<i class="na" style="--k:${k}" data-ftip="${t.year}\nNo ${esc(R.name)} section"></i>`)).join('');
    const share = `<div><b>${pctS(R.share)}</b><span>of Group II's marks${m.rank ? ` · ${ordS(m.rank)} of ${m.peers}` : ''}</span></div>`;
    const rp = m.recentPer != null ? m.recentPer : R.recentPerPaper;
    const recent = R.paperMarks ? `${paperName(m.s)}, as ICAI sets it` : Math.abs(rp - m.per) >= 0.05 ? `${fx1(rp)} in ${m.recentFrom}–${yy(m.Y1)}` : `steady since ${m.firstSecYear}`;
    /* P1-03: the big number is the like-for-like marks a paper (in-syllabus questions, share of each paper's technical marks); the year columns
       stay raw marks per paper */
    const lfl = R.perPaper != null ? `<span class="sr"> (in-syllabus questions, the subject's share of each paper's ${R.section === 'GA' ? 'marks' : 'technical marks'})</span>` : '';
    return `<div class="sj-hr">
      <div class="sj-hr-cap"><b>In ${R.papers} ICAI papers</b><span>${live.length ? live[0].year : m.Y0}–${m.Y1}</span></div>
      <div class="sj-hr-big"><b>${fx1(m.per)}</b><span>marks in the paper${lfl}<br><small>${esc(recent)}</small></span></div>
      <div class="sj-hr-cols" role="img" aria-label="${esc(`Share of each paper's marks by year, ${rows[0].year} to ${m.Y1}${pk ? `; highest ${pctS(pk.share)} in ${pk.year}` : ''}`)}">${cols}</div>
      <div class="sj-hr-ax" aria-hidden="true"><span>${rows[0].year}</span><span class="sj-hr-axl">share of the paper, by year</span><span>${m.Y1}</span></div>
      <div class="sj-hr-row"><div><b>${U.nf(R.pyqs)}</b><span>ICAI questions</span></div><div><b>${R.papersAsked}<small>/${R.papers}</small></b><span>papers asked it</span></div>${share}</div>
      <button type="button" class="sj-hr-go" data-jump="sj-years">Year by year ${icon('arrow-r')}</button></div>`;
  }
  /** the hero's one coral (P0-08, D18): the shared next step within the subject; once every lesson is done, practising its PYQs */
  function heroCta(m) {
    const { s, R } = m;
    if (!m.order.length) {
      if (m.bank && m.nQ) return { href: '#/pyq?subject=' + s.id, kicker: 'ICAI questions', title: `Practise ${R.name} questions`, done: false };
      /* no lesson in this paper yet: the shared next step elsewhere, else the paper's chapters on the map */
      const st = m.allStep;
      if (st && st.id) return { href: st.href, kicker: `${st.label} · ${medName(((m.D || GA.data.D).subjectById[st.subject] || {}).name || '')}`, title: st.title, reason: `No ${R.name} lesson is written yet.`, done: false };
      return { href: `#/map?subject=${s.id}`, kicker: 'Lessons are being written', title: `See ${R.name} on the map`, done: false };
    }
    if (!m.nextStep || !m.nextStep.id) return m.bank && m.nQ ? { href: `#/pyq?subject=${s.id}&practise=10`, kicker: m.done === m.order.length ? `All ${m.order.length} lessons done` : 'Every syllabus lesson done', title: `Practise ${R.name} questions`, done: true }
      : { href: R.cards ? `#/flash/${s.id}` : `#/rev/${s.id}`, kicker: `All ${m.order.length} ${m.order.length === 1 ? 'lesson' : 'lessons'} written so far done`, title: R.cards ? `Review ${R.name} flashcards` : `${R.name} formula sheet`, done: true };
    const st = m.nextStep;
    return { href: st.href, kicker: st.label + (st.minutes ? ` · ${st.minutes} min` : ''), title: st.title, reason: st.reason || '', done: false };
  }
  function heroHtml(m, D) {
    const { s, R } = m, c = heroCta(m);
    const cta = `<a class="btn pop lg hb-go" href="${esc(c.href)}"><span><small>${esc(c.kicker)}</small>${esc(c.title)}</span>${icon('arrow-r')}</a>`;
    /* one meta line (P1-04): what there is to learn here and what it builds on */
    const asked = m.BN ? s.topics.filter(t => m.BN.topic[t.id]).length : R.topics.filter(t => t.pyqs).length, nsub = s.topics.reduce((n, t) => n + t.subtopics.length, 0);
    const meta = [`<span><b>${U.nf(R.lessons)}</b> ${R.lessons === 1 ? 'lesson' : 'lessons'}${R.lessons < nsub ? ` of ${U.nf(nsub)} planned` : ''}</span>`].concat(R.minutes ? [`<span><b>${esc(U.dur(R.minutes))}</b> of reading</span>`] : [],
      [`<span><b>${R.topics.length}</b> chapters${m.bank && asked < R.topics.length ? `, ${asked} ${m.BN ? 'with ICAI questions' : 'asked'}` : ''}</span>`]);
    if (m.builds.length) meta.push(buildsHtml(D, m.builds));
    let mine = '';
    if (m.touched || m.sum.pyq.attempted) {
      const bits = [`<span><b>${m.done}</b> of ${m.order.length} lessons done</span>`];
      if (m.sum.pyq.attempted) bits.push(`<span><b>${U.nf(m.sum.pyq.attempted)}</b> questions tried, ${Math.round(m.sum.pyq.acc * 100)}% right</span>`);
      if (m.sum.mastery != null) bits.push(`<span><b>${Math.round(m.sum.mastery * 100)}%</b> mastery</span>`);
      mine = `<div class="sj-mine" aria-label="Your progress in ${esc(s.name)}"><span class="hb-bar anim"><i style="width:${m.order.length ? ((100 * m.done) / m.order.length).toFixed(1) : 0}%"></i></span><p class="hb-meta">${bits.join('')}</p></div>`;
    }
    const off = esc(s.official.replace(/^[^:]{2,60}:\s*/, ''));
    const fast = m.fast ? `<a class="hb-link sm sj-fast" href="${esc(m.fast.href)}">Fast track: ${Math.round(100 * m.fast.share)}% of the marks in ${esc(String(m.fast.hours))} h ${icon('arrow-r')}</a>` : '';
    return `<section class="hb-card flush sj-hero" aria-labelledby="sj-title"><div class="sj-hero-l">
        <div class="hb-eb sj-eb"><span class="hb-ic sm">${glyph(s.id)}</span>${paperName(s) ? `<span>${esc(paperName(s))}</span><span class="sj-eb-dot" aria-hidden="true">·</span>` : s.area !== s.name ? `<span>${esc(s.area)}</span><span class="sj-eb-dot" aria-hidden="true">·</span>` : ''}${switcherHtml(D, s.id)}</div>
        <h1 class="sj-title" id="sj-title">${esc(s.name)}</h1>
        <div class="sj-offw"><p class="sj-off" id="sj-off"><b>ICAI syllabus:</b> ${off}</p><button type="button" class="sj-offmore" aria-expanded="false" aria-controls="sj-off" hidden>More</button></div>
        <p class="hb-meta sj-meta">${meta.join('')}</p>
        ${mine}
        <div class="sj-cta">${cta}
          ${c.done || !m.nQ ? '' : `<a class="btn" href="#/pyq?subject=${s.id}">${icon('target')} Practise ${U.nf(m.nQ)} questions</a>`}
          ${m.nQ ? `<a class="btn ghost" href="#/test?subject=${s.id}">${icon('timer')} ${m.BN ? 'Papers and drills' : 'Paper test'}</a>` : ''}${R.cards ? `<a class="btn ghost" href="#/flash/${s.id}">${icon('cards')} ${U.nf(R.cards)} flashcards</a>` : ''}${R.lessons && GA.shell && GA.shell.has && GA.shell.has('/rev/' + s.id) ? `<a class="btn ghost" href="#/rev/${s.id}">${icon('sigma')} Formula sheet</a>` : ''}</div>
        ${fast}
      </div>${heroVizHtml(m)}</section>`;
  }

  /** the eyebrow's native subject switcher (P3-08): every subject grouped by syllabus area; it shows 'Switch subject' and opens another page */
  function switcherHtml(D, sid) {
    const areas = U.uniq(D.subjects.map(x => x.area));
    const opt = x => `<option value="${x.id}"${x.id === sid ? ' disabled' : ''}>${esc(x.name)}${x.id === sid ? ' (this page)' : ''}</option>`;
    return `<label class="sj-sw"><span class="sr">Switch to another paper</span><select class="sj-swsel" data-switch>
      <option value="" selected>Switch paper</option>${areas.map(a => { const xs = D.subjects.filter(x => x.area === a); return xs.length > 1 || xs[0].name !== a ? `<optgroup label="${esc(a)}">${xs.map(opt).join('')}</optgroup>` : opt(xs[0]); }).join('')}
    </select>${icon('chev-d', 'sj-sw-c')}</label>`;
  }

  /** the sticky in-page nav: its labels are the section H2s (P1-04) */
  const SECTIONS = [['sj-lessons', 'Lessons'], ['sj-marks', 'Where the marks are'], ['sj-years', 'Year by year'], ['sj-labs', 'Labs']];
  function navHtml(m) {
    const items = SECTIONS.filter(([id]) => (id !== 'sj-labs' || m.labs.length) && ((id !== 'sj-marks' && id !== 'sj-years') || m.hasQ));
    return `<nav class="sj-local" aria-label="On this page"><div class="hb-seg sj-local-in">${items.map(([id, t]) => `<button type="button" class="sj-lk" data-jump="${id}">${esc(t)}</button>`).join('')}</div></nav>`;
  }

  /** 'Open in map' from a subject-page section (P3-09): the same view on the content map; the hidden words say which one */
  const inMap = (href, what) => `<a class="hb-link sm sj-inmap" href="${href}">Open in map<span class="sr">: ${esc(what)}</span> ${icon('arrow-r')}</a>`;
  /** section head: the nav label as the H2, the informative line as the lead, one optional action */
  function head(id, title, lead, extra) {
    return `<div class="hb-sh sj-head"><div><h2 id="${id}-h">${esc(title)}</h2>${lead ? `<p>${lead}</p>` : ''}</div>${extra || ''}</div>`;
  }

  /* ---- hooks: "what the papers say" cards, big digits first, a mini-chart drawn from each hook's evidence; they open 'Where the marks are'.
     Each link says where it goes (P1-52): an in-page section, the fast track, a lesson, a lab or the questions */
  function hookGo(h, self) {
    if (h.href === self) return h.kind === 'trend' ? ['sj-years', 'See year by year'] : h.kind === 'concentration' ? ['sj-rank', 'See every topic'] : ['sj-lessons', 'See the lessons'];
    if (/^#\/l\/[^?]*\?(.*&)?path=/.test(h.href)) return ['', 'Start the fast track'];
    return ['', h.href.startsWith('#/l/') ? 'Open the lesson' : h.href.startsWith('#/lab/') ? 'Open the lab' : h.href.startsWith('#/labs') ? 'See the labs' : 'See the questions'];
  }
  function hooksHtml(m) {
    if (!m.hooks.length) return '';
    const self = '#/s/' + m.s.id, ctx = { years: m.years, minutes: m.R.minutes };
    return `<div class="sj-finds">${m.hooks.map(h => {
      const [jump, go] = hookGo(h, self);
      return `<a class="hb-card sj-find" href="${esc(h.href)}"${jump ? ` data-jump="${jump}"` : ''}>
        <span class="sj-fd"><b>${esc(String(h.stat.value))}</b><small>${esc(h.stat.unit)}</small></span><span class="sj-fv">${vizHtml(hookViz(h, ctx))}</span>
        <h3>${esc(h.title)}</h3><p>${esc(h.body)}</p><span class="sj-fgo"><span>${go}</span>${icon('arrow-r')}</span></a>`;
    }).join('')}</div>`;
  }

  /* ---- Lessons: one numbered sequence in I.order with topic dividers (P1-05). Each run of consecutive lessons of a topic is a <details>:
     open on wide screens (the dividers read as headings), a topic accordion on phones (the current topic open). The number is the step in the
     learning order, so a prerequisite's number is always smaller ("after 3, 8"); the topic's anchor sj-t-<topic> stays for ?t= links. */
  const OUTSIDE = 'Outside the syllabus text';
  /** a planned sub-topic (no lesson yet): its ICAI questions once the bank has them, else its place on the syllabus map */
  const plannedHref = (m, n) => (m.bank ? '#/pyq?sub=' + encodeURIComponent(n.id) : '#/map?node=' + encodeURIComponent(n.id));
  const sylLine = t => (t.syl && !lower(t.name).includes(lower(t.syl).replace(/[-‐‑–]/g, ' ')) ? t.syl : '');
  function lessonRow(m, D, I, id) {
    const l = D.lessonById[id], stt = m.st[id], sub = I.subtopic(id) || { pyqs: 0 }, pr = (m.preds[id] || []).filter(p => m.step[p]).sort((a, b) => m.step[a] - m.step[b]);
    const exL = (m.ext[id] || []).map(x => D.lessonById[x]).filter(Boolean), ex = U.uniq(exL.map(x => x.subject));
    const nx = id === m.nextId, badge = nx ? `<span class="hb-chip acc sj-next">${icon('play')}${esc(m.nextStep.label)}</span>` : '';
    /* "after 3, 8" and "uses PDS" are plain text; the lesson names behind them ride along in a visually hidden copy (P1-55: no hover-only tips) */
    const after = pr.length ? `<span class="sj-after">after ${pr.map(p => m.step[p]).join(', ')}<span class="sr">: builds on ${esc(pr.map(p => m.step[p] + '. ' + D.lessonById[p].title).join('; '))}</span></span>` : '';
    const uses = ex.length ? `<span class="sj-ext">uses ${ex.map(x => esc(D.subjectById[x].short)).join(', ')}<span class="sr">: ${esc(exL.map(x => `${x.title} (${D.subjectById[x.subject].name})`).join('; '))}</span></span>` : '';
    return `<li class="sj-les${stt ? ' ' + stt : ''}${nx ? ' nx' : ''}"><a class="sj-les-a" href="#/l/${id}?focus=1">
      <span class="sj-step" aria-hidden="true">${m.step[id]}</span><span class="sr">Step ${m.step[id]}: </span>
      <span class="sj-les-b"><span class="sj-les-t">${esc(l.title)}</span>
        <span class="sj-les-m hb-meta">${tierTxt(l.tier)}${statusTxt(l.status)}<span>${l.minutes}&nbsp;min</span>${m.BN ? `<span>${bankTxt(m.BN.sub[id])}</span>` : sub.pyqs ? `<span>${pl(sub.pyqs, 'question')}</span>` : m.bank ? '<span>no ICAI question yet</span>' : ''}${after}${uses}</span></span>
      ${badge}${stateDot(stt)}${stateSr(stt)}</a></li>`;
  }
  function lessonsHtml(m, D, I) {
    const { s } = m, extN = U.uniq(m.G.external.map(e => e.to)).length, extS = U.uniq(m.G.external.map(e => D.lessonById[e.from] && D.lessonById[e.from].subject).filter(Boolean));
    const tpc = id => s.topics.find(t => t.id === id), cur = curTopic(m, D);
    const plan = {}; s.topics.forEach(t => { const p = t.subtopics.filter(n => !D.lessonById[n.id]); if (p.length) plan[t.id] = p; });
    const lastRun = {}; m.runs.forEach((r, i) => (lastRun[r.topic] = i));
    const runH = (r, i) => {
      const t = r.outside ? null : tpc(r.topic), rec = t ? I.topic(t.id) : null, doneN = r.ids.filter(id => m.st[id] === 'done').length;
      const mins = U.sum(r.ids.map(id => D.lessonById[id].minutes || 0)), pyqs = U.sum(r.ids.map(id => (m.BN ? m.BN.sub[id] || 0 : (I.subtopic(id) || { pyqs: 0 }).pyqs)));
      const name = r.outside ? OUTSIDE : t.name, anchor = r.outside ? ' id="sj-t-outside"' : !r.cont ? ` id="sj-t-${esc(t.id)}"` : '';
      const bits = [`<span>${pl(r.ids.length, 'lesson')}</span>`, `<span>${esc(U.dur(mins))}</span>`];
      if (r.outside && m.bank) bits.push(`<span>${pl(pyqs, 'question')}</span>`);
      /* a done count stays neutral; green with a tick only once the whole run is done (P3-10) */
      if (doneN) bits.push(doneN === r.ids.length ? `<span class="sj-run-d all">${icon('check')}${doneN === 1 ? 'done' : `all ${doneN} done`}</span>` : `<span class="sj-run-d">${doneN} of ${r.ids.length} done</span>`);
      const syl = t && !r.cont && sylLine(t) ? `<p class="sj-run-syl">${esc(sylLine(t))}</p>` : '';
      const pq = t && !r.cont && m.BN ? (m.BN.topic[t.id] ? `<a class="hb-link sm sj-run-q" href="#/pyq?topic=${encodeURIComponent(t.id)}">${pl(m.BN.topic[t.id], 'ICAI question')} ${icon('arrow-r')}</a>` : '')
        : t && !r.cont && rec && rec.pyqs ? `<a class="hb-link sm sj-run-q" href="#/pyq?topic=${encodeURIComponent(t.id)}">${pl(rec.pyqs, 'question')} · ${U.nf(rec.marks)} marks ${icon('arrow-r')}</a>` : '';
      const note = r.outside ? '<p class="sj-run-syl">Not in the syllabus text: earlier syllabi named these, or past papers asked them anyway. Plan your time around the steps above.</p>' : '';
      const planned = !r.outside && lastRun[r.topic] === i && plan[r.topic] ? plan[r.topic].map(n => `<li class="sj-les plan"><a class="sj-les-a" href="${plannedHref(m, n)}"><span class="sj-step" aria-hidden="true">–</span><span class="sj-les-b"><span class="sj-les-t">${esc(n.name)}</span><span class="sj-les-m hb-meta">${tierTxt(n.tier)}<span>lesson planned</span></span></span></a></li>`).join('') : '';
      /* the topic name is an H3 at every width (heading navigation between the rows); on phones the subject view swaps its inner span for a
         disclosure button (the WAI accordion pattern: a button inside the heading), so wide screens never announce a toggle that does nothing */
      return `<div class="sj-run${r.outside ? ' out' : ''}${r.cont ? ' cont' : ''}" data-topic="${esc(r.topic)}"${anchor}${r.topic === cur ? ' data-cur="1"' : ''}>
        <div class="sj-div"><h3 class="sj-div-h" id="sj-rh-${i}"><span class="sj-div-x"><span class="sj-div-t"><b>${esc(name)}</b>${r.cont ? '<small>continued</small>' : ''}${t ? statusTxt(t.status) : ''}</span></span></h3><span class="sj-div-m hb-meta">${bits.join('')}</span>${icon('chev-d', 'sj-div-c')}</div>
        <div class="sj-run-b" id="sj-rb-${i}">${syl}${note}${pq}<ol class="sj-les-list" start="${r.start}">${r.ids.map(id => lessonRow(m, D, I, id)).join('')}${planned}</ol></div></div>`;
    };
    /* one wording per status (P2-66): the same definitions as the Learn tab's key, only for the markers this subject shows */
    const stHere = ['legacy', 'extra'].filter(v => s.topics.some(t => t.status === v || t.subtopics.some(n => n.status === v)));
    const legacyNote = stHere.map(v => `<span><span class="dotl warn">${v}</span> ${esc(STATUS_DEF[v])}</span>`).join('');
    /* P2-09: rows print the tier only when it is not core, so the key names what the other two mean */
    const tiersHere = TIERS.filter(([v]) => v !== 'core' && m.order.some(id => D.lessonById[id].tier === v));
    const tierNote = tiersHere.length ? `<span>${tiersHere.map(([v]) => `<b>${esc(tierName(v))}</b> ${esc(TIER_DEF[v])}`).join(' · ')}; every other lesson is core</span>` : '';
    const dots = m.order.some(id => m.st[id]);
    const legend = `<p class="sj-legend"><span><b>after 1, 4</b> builds on those steps</span>${dots ? `<span class="sj-lg">${stateDot('done')} done</span><span class="sj-lg">${stateDot('seen')} started</span>` : ''}${tierNote}${legacyNote}</p>`;
    /* the topic index (>= 1100 px): each topic once, in the order the sequence reaches it */
    const firsts = m.runs.filter(r => !r.cont);
    const tix = firsts.length > 1 ? `<nav class="sj-tix" aria-label="Topics of ${esc(s.name)} in learning order"><p class="sj-tix-h">Topics</p><ol>${firsts.map(r => {
      const ids = m.runs.filter(x => x.topic === r.topic).flatMap(x => x.ids), d = ids.filter(id => m.st[id] === 'done').length, nm = r.outside ? OUTSIDE : tpc(r.topic).name;
      const tgt = r.outside ? 'sj-t-outside' : 'sj-t-' + r.topic;
      return `<li><a href="#/s/${s.id}?t=${encodeURIComponent(r.outside ? 'outside' : r.topic)}" data-jump="${esc(tgt)}" data-tix="${esc(tgt)}"${r.topic === cur && m.nextId ? ' class="cur"' : ''}><span>${esc(nm)}</span><small>${d ? `${d}/${ids.length}` : ids.length}</small></a></li>`;
    }).join('')}</ol></nav>` : '';
    /* chapters with no lesson yet: their sub-topics as planned rows, in syllabus order, after the learning sequence */
    const withLessons = new Set(m.runs.map(r => r.topic)), waiting = s.topics.filter(t => !withLessons.has(t.id));
    const waitH = (t, i) => `<div class="sj-run plan" data-topic="${esc(t.id)}" id="sj-t-${esc(t.id)}"${!m.runs.length && i === 0 ? ' data-cur="1"' : ''}>
        <div class="sj-div"><h3 class="sj-div-h" id="sj-rh-p${i}"><span class="sj-div-x"><span class="sj-div-t"><b>${esc(t.name)}</b>${statusTxt(t.status)}</span></span></h3><span class="sj-div-m hb-meta"><span>${pl(t.subtopics.length, 'sub-topic')}</span><span>no lesson yet</span></span>${icon('chev-d', 'sj-div-c')}</div>
        <div class="sj-run-b" id="sj-rb-p${i}">${sylLine(t) ? `<p class="sj-run-syl">${esc(sylLine(t))}</p>` : ''}<ol class="sj-les-list">${t.subtopics.map(n => `<li class="sj-les plan"><a class="sj-les-a" href="${plannedHref(m, n)}"><span class="sj-step" aria-hidden="true">–</span><span class="sj-les-b"><span class="sj-les-t">${esc(n.name)}</span><span class="sj-les-m hb-meta">${tierTxt(n.tier)}<span>lesson planned</span></span></span></a></li>`).join('')}</ol></div></div>`;
    const nsub = s.topics.reduce((n, t) => n + t.subtopics.length, 0);
    const lead = m.order.length
      ? `${pl(m.order.length, 'lesson')} in one learning order: each comes after the lessons it builds on.${m.G.levels > 1 ? ` The longest chain inside ${esc(s.name)} is ${pl(m.G.levels, 'lesson')} deep` : ''}${extN ? `${m.G.levels > 1 ? ';' : ''} ${pl(extN, 'lesson')} also build${extN === 1 ? 's' : ''} on ${extS.map(x => esc(D.subjectById[x].short)).join(', ')}` : ''}${m.G.levels > 1 || extN ? '.' : ''}${waiting.length ? ` ${pl(waiting.length, 'chapter')} still to come.` : ''}`
      : `No lesson is written yet. The ${U.nf(nsub)} sub-topics of ${esc(s.name)} are listed by chapter below; each becomes a lesson as it is written.`;
    return `<section class="hb-sec sj-sec" id="sj-lessons" aria-labelledby="sj-lessons-h">${head('sj-lessons', 'Lessons', lead,
      m.order.length ? inMap(`#/map?lens=prereq&amp;subject=${s.id}`, `the prerequisites of ${s.name}`) : inMap(`#/map?subject=${s.id}`, `${s.name} on the syllabus map`))}
      ${m.order.length ? legend : ''}
      <div class="sj-lw${tix ? ' has-tix' : ''}"><div class="sj-seq">${m.runs.map(runH).join('')}${waiting.map(waitH).join('')}</div>${tix}</div></section>`;
  }
  /** the topic the learner is in: the next step's topic, else the first one (the phone accordion opens it) */
  function curTopic(m, D) {
    if (m.nextId) { const r = m.runs.find(x => x.ids.includes(m.nextId)); if (r) return r.topic; }
    return m.runs[0] ? m.runs[0].topic : null;
  }

  /* ---- Where the marks are (P1-04): the hook cards, then one ranking of the topics by marks (merges the old topic map and 'What GATE asks'):
     marks and share, papers, a year strip; a list by default, the GA.mapviz treemap as a toggle on wide screens */
  function rankingHtml(m, I) {
    const yt = I.yearTopic(m.s.id), col = {}, freq = {};
    yt.topics.forEach((id, i) => (col[id] = i));
    I.topicFrequency(0, { subject: m.s.id }).forEach(r => (freq[r.id] = r));
    const secYears = new Set(m.R.trend.filter(t => t.papers).map(t => t.year)), max = yt.max || 1, ys = yt.years;
    const rows = m.R.topics.filter(t => t.marks > 0).slice().sort((a, b) => b.marks - a.marks || b.pyqs - a.pyqs || b.papers - a.papers);
    const never = m.R.topics.filter(t => !t.pyqs), tot = U.sum(rows.map(t => t.marks)) || 1, top = rows.length ? rows[0].marks : 1, SHOW = 8;
    if (!rows.length) return `<div class="hb-card sj-rk-card" id="sj-rank"><p class="sj-note">No tagged questions yet.</p></div>`;
    const strip = r => ys.map((y, i) => {
      if (!secYears.has(y)) return `<i class="na" data-ftip="${y}\nNo ${esc(m.s.name)} section that year"></i>`;
      const v = yt.cells[i][col[r.id]] || 0;
      return v ? `<i style="--p:${(24 + 76 * Math.pow(v / max, 0.75)).toFixed(1)}%" data-ftip="${y}\n${n1(v)} marks per paper"></i>` : `<i data-ftip="${y}\nNot asked"></i>`;
    }).join('');
    const rowH = (t, i) => {
      const f = freq[t.id] || { years: [], yearCount: 0, firstYear: null, lastYear: null };
      const span = f.firstYear == null ? '' : f.firstYear === f.lastYear ? ` · ${f.firstYear}` : ` · ${f.firstYear}–${f.lastYear}`;
      return `<li class="sj-rk${i >= SHOW ? ' more' : ''}"${i >= SHOW ? ' hidden' : ''}><span class="sj-rank" aria-hidden="true">${i + 1}</span>
      <span class="sj-rk-n"><a href="#/s/${m.s.id}?t=${encodeURIComponent(t.id)}" data-topic="${esc(t.id)}"><b>${esc(t.name)}</b></a>${statusTxt(t.status)}<small><a href="#/pyq?topic=${encodeURIComponent(t.id)}&amp;sort=old">${pl(t.pyqs, 'question')}</a> · ${U.nf(t.marks)} marks${span}${m.mine && m.mine[t.id] ? ' · ' + youTxt(m.mine[t.id]) : ''}</small></span>
      <span class="sj-rk-v"><span class="sj-pn"><b>${pctS(t.marks / tot)}</b> <small>of the marks</small></span><span class="hb-bar sm" aria-hidden="true"><i style="width:${((100 * t.marks) / top).toFixed(1)}%"></i></span></span>
      <span class="sj-ask-y"><b>${t.papers}</b><small>of ${m.R.papers} papers</small></span>
      <span class="sj-strip" role="img" aria-label="${esc(`Asked in ${f.yearCount} of ${secYears.size} years${f.years && f.years.length ? ': ' + f.years.join(', ') : ''}`)}">${strip(t)}</span></li>`;
    };
    return `<div class="hb-card sj-rk-card" id="sj-rank"><div class="sj-mapbox" id="sj-mapbox" hidden></div><div id="sj-rankbox">
      <div class="sj-ask-hd" aria-hidden="true"><span></span><span>Chapter</span><span>Marks</span><span>Papers</span><span class="sj-strip-k"><span>${ys[0]}</span><span>${ys[ys.length - 1]}</span></span></div>
      <ol class="sj-ask-list" aria-label="Chapters of ${esc(m.s.name)} by question marks">${rows.map(rowH).join('')}</ol>
      <div class="sj-ask-f"><span class="sj-kg"><span class="sj-key" aria-hidden="true"><i style="--p:24%"></i><i style="--p:50%"></i><i style="--p:75%"></i><i style="--p:100%"></i></span>fewer → more marks per paper that year</span>${secYears.size < ys.length ? '<span class="sj-kg"><span class="sj-key" aria-hidden="true"><i class="na"></i></span>no section that year</span>' : ''}
        ${rows.length > SHOW ? `<button type="button" class="btn sm ghost sj-more" aria-expanded="false">${icon('chev-d')} Show all ${rows.length} chapters</button>` : ''}</div>
      ${never.length ? `<p class="sj-note">Not asked in any paper yet: ${never.map(t => esc(t.name)).join(', ')}.</p>` : ''}</div></div>`;
  }
  function marksHtml(m, I) {
    if (!m.hasQ) return '';                                    // no ICAI question on this paper yet: the section comes back with the bank
    /* the lead describes the ranking; the findings themselves are the cards (each fact once, P1-04) */
    const R = m.R, asked = R.topics.filter(t => t.marks).length;
    const lead = R.marks ? `${R.topics.length} chapters, ranked by the ${U.nf(R.marks)} marks ICAI set on them in ${R.papers} papers${asked < R.topics.length ? ` (${R.topics.length - asked} not asked yet)` : ''}. Pick a chapter for its lessons, or its count for the questions.` : '';
    const seg = `<div class="hb-seg sj-mapseg" role="radiogroup" aria-label="Show the topics as" hidden><button type="button" role="radio" data-mv="list" aria-checked="true" class="on">${icon('list')} List</button><button type="button" role="radio" data-mv="map" aria-checked="false">${icon('grid')} Treemap</button></div>`;
    return `<section class="hb-sec sj-sec" id="sj-marks" aria-labelledby="sj-marks-h">${head('sj-marks', 'Where the marks are', lead, `<div class="sj-hacts">${seg}${inMap(`#/map?subject=${m.s.id}`, `${m.s.name} on the syllabus map`)}</div>`)}
      ${hooksHtml(m)}${rankingHtml(m, I)}</section>`;
  }

  /* ---- PYQ timeline: per-year columns (HTML, so labels stay crisp at every width), mode = marks per paper | share of the paper */
  /** one row per GATE year: questions, raw marks, marks per paper (t.marks) and the share of that year's paper marks (P2-13: share = marks
      per 100-mark paper, fair to the 150-mark 2007–08 papers) */
  function timelineRows(D, sid, R) {
    const qs = D.questions.filter(q => q.subject === sid), byY = U.groupBy(qs, q => q.year), papersBy = U.groupBy(D.papers, p => p.year);
    return R.trend.map(t => {
      const list = byY[t.year] || [], raw = U.sum(list.map(q => q.marks || 0)), paperMarks = U.sum((papersBy[t.year] || []).map(p => p.marks || 0));
      return { year: t.year, papers: t.papers, allPapers: (papersBy[t.year] || []).length, n: list.length, raw, per: t.marks, paperMarks, share: paperMarks ? raw / paperMarks : 0, na: !t.papers };
    });
  }
  const timelineData = (D, m) => timelineRows(D, m.s.id, m.R);
  /** share of the paper over a set of year rows (sum of marks over sum of paper marks; years without the section left out) */
  const shareOf = rows => { const live = rows.filter(r => !r.na), pm = U.sum(live.map(r => r.paperMarks)); return pm ? U.sum(live.map(r => r.raw)) / pm : 0; };
  /** the heaviest and lightest year by share of the paper (P2-13: raw marks named a 150-mark 2007–08 paper for 10 of 13 CS subjects) */
  function yearExtremes(rows) {
    const live = rows.filter(r => !r.na);
    return { peak: live.reduce((b, r) => (!b || r.share > b.share ? r : b), null), low: live.reduce((b, r) => (!b || r.share < b.share ? r : b), null) };
  }
  function chartHtml(rows, mode, m) {
    const v = r => (mode === 'share' ? 100 * r.share : r.per), live = rows.filter(r => !r.na), mx = Math.max(0, ...live.map(v));
    const T = ticks(mx || 1, 4), fmt = x => (mode === 'share' ? n1(x) + '%' : n1(x));
    const peak = live.reduce((b, r) => (!b || v(r) > v(b) ? r : b), null), last = live[live.length - 1];
    return `<div class="sj-chart" data-mode="${mode}"><div class="sj-grid" aria-hidden="true">${T.list.map(t => `<span style="bottom:${((100 * t) / T.top).toFixed(2)}%"><em>${mode === 'share' ? n1(t) + '%' : n1(t)}</em></span>`).join('')}</div>
      <ol class="sj-cols" aria-label="${mode === 'share' ? 'Share of each year’s paper marks' : 'Average marks per paper'} for ${esc(m.s.name)}, by year">${rows.map((r, k) => {
        const h = r.na ? 0 : (100 * v(r)) / T.top, lab = r === peak || r === last;
        const tip = r.na ? `${r.year}\nNo ${m.s.name} section` : `${r.year}\n${mode === 'share' ? fmt(v(r)) + ' of the paper’s marks' : n1(r.per) + ' marks per paper'}\n${pl(r.n, 'question')}, ${U.nf(r.raw)} marks in ${pl(r.papers, 'paper')}`;
        return `<li${r.na ? ' class="na"' : ''}><a href="#/pyq?subject=${m.s.id}&amp;year=${r.year}" data-ftip="${esc(tip)}" aria-label="${esc(tip.replace(/\n/g, ', '))}"${r.na ? ' tabindex="-1" aria-disabled="true"' : ''}>
          <span class="sj-col">${r.na ? '' : `<i style="height:${h.toFixed(2)}%;--k:${k}"></i>`}${!r.na ? `<em class="${lab ? 'on' : ''}" style="bottom:${h.toFixed(2)}%">${fmt(v(r))}</em>` : ''}</span><span class="sj-yl">'${String(r.year).slice(2)}</span></a></li>`;
      }).join('')}</ol></div>`;
  }
  function timelineHtml(m, D) {
    if (!m.hasQ) return '';
    const rows = timelineData(D, m), R = m.R, live = rows.filter(r => !r.na);
    const big = D.papers.filter(p => p.marks && p.marks !== 100), bigYears = U.uniq(big.map(p => p.year));
    /* P2-13: share of the paper by default; the heaviest / lightest year and the recent figure are judged on it too */
    const { peak, low } = yearExtremes(rows), all = shareOf(rows), recent = shareOf(rows.filter(r => r.year >= m.recentFrom));
    const types = TYPES.map(([k, name, tip]) => ({ k, name, tip, n: (R.types && R.types[k]) || 0 })), tn = U.sum(types.map(t => t.n)) || 1;
    /* the year view counts every question (P1-03); the hero's big figure is the like-for-like one, so the lead says which */
    const lead = `Every question counted, as a share of each paper’s marks: ${pctS(all)} since ${m.firstSecYear}` + (Math.abs(recent - all) >= 0.005 ? `, ${pctS(recent)} in the last five years` : '') +
      `. Each column is one year (years with several attempts are averaged); pick one for its questions.` +
      (bigYears.length && rows.some(r => !r.na && bigYears.includes(r.year)) ? ` Marks per paper shows the raw marks, where the ${bigYears.join(' and ')} papers carried ${U.uniq(big.map(p => p.marks)).join('/')}.` : '');
    const pp = r => `${pctS(r.share)} of the paper`;
    return `<section class="hb-sec sj-sec" id="sj-years" aria-labelledby="sj-years-h">${head('sj-years', 'Year by year', lead,
      `<div class="sj-hacts">${inMap(`#/map?lens=exam&amp;by=topic&amp;subject=${m.s.id}`, `${m.s.name} topics on the exam map`)}<div class="hb-seg sj-tlseg" role="radiogroup" aria-label="Measure"><button type="button" role="radio" data-tl="share" aria-checked="true" class="on">Share of the paper</button><button type="button" role="radio" data-tl="per" aria-checked="false">Marks per paper</button></div></div>`)}
      <div class="sj-tl">
        <div class="hb-card sj-tl-chart"><div id="sj-chart">${chartHtml(rows, 'share', m)}</div>
          <details class="sj-table"><summary>${icon('list')} Table view</summary><div class="tw"><table class="t"><thead><tr><th>Year</th><th class="r">Papers</th><th class="r">Questions</th><th class="r">Marks</th><th class="r">Share of the paper</th><th class="r">Marks per paper</th></tr></thead>
            <tbody>${rows.map(r => `<tr><td>${r.year}</td><td class="r">${r.na ? '—' : r.papers}</td><td class="r">${r.na ? '—' : r.n}</td><td class="r">${r.na ? '—' : U.nf(r.raw)}</td><td class="r">${r.na ? '—' : n1(100 * r.share) + '%'}</td><td class="r">${r.na ? '—' : n1(r.per)}</td></tr>`).join('')}</tbody></table></div></details></div>
        <aside class="hb-card sj-tl-side" aria-label="Summary">
          <dl class="sj-facts"><div><dt>Asked in</dt><dd><b>${R.papersAsked}</b> of ${R.papers} papers</dd></div>
            ${peak && low && Math.abs(peak.share - low.share) < 1e-9 ? `<div><dt>Every year</dt><dd><b>${pctS(peak.share)}</b> of the paper, ${live[0].year}–${live[live.length - 1].year}</dd></div>` : `
            ${peak ? `<div><dt>Heaviest year</dt><dd><b>${peak.year}</b> · ${pp(peak)}</dd></div>` : ''}
            ${low ? `<div><dt>Lightest year</dt><dd><b>${low.year}</b> · ${low.n ? pp(low) : 'not asked at all'}</dd></div>` : ''}`}
            <div><dt>${m.recentFrom}–${m.Y1}</dt><dd><b>${pctS(recent)}</b> of the paper</dd></div></dl>
          <div class="sj-types"><div class="sj-types-h"><span>Question types</span><small>${pl(tn, 'question')}</small></div>
            <div class="sj-stack" role="img" aria-label="${esc(types.map(t => `${t.k} ${t.n}`).join(', '))}">${types.filter(t => t.n).map(t => `<i class="ty-${t.k}" style="flex:${t.n}" data-ftip="${esc(`${t.k}: ${t.n} questions\n${Math.round((100 * t.n) / tn)}% of ${R.name}\n${t.tip}`)}"></i>`).join('')}</div>
            <ul class="sj-types-l">${types.map(t => `<li><i class="ty-${t.k}" aria-hidden="true"></i><b>${t.k}</b><span>${t.n} · ${Math.round((100 * t.n) / tn)}%</span><small>${esc(t.name)}</small></li>`).join('')}</ul></div>
          <div class="sj-tl-links"><a class="hb-link sm" href="#/pyq?subject=${R.id}">All ${U.nf(R.pyqs)} questions ${icon('arrow-r')}</a><a class="hb-link sm" href="#/pyq?subject=${R.id}&amp;from=${m.recentFrom}">Since ${m.recentFrom} ${icon('arrow-r')}</a><a class="hb-link sm" href="#/pyq?subject=${R.id}&amp;sort=old">Oldest first ${icon('arrow-r')}</a></div>
        </aside></div></section>`;
  }

  function labsHtml(m, D) {
    if (!m.labs.length) return '';
    const name = id => (D.nodes && D.nodes[id] ? D.nodes[id].name : id);
    return `<section class="hb-sec sj-sec" id="sj-labs" aria-labelledby="sj-labs-h">${head('sj-labs', 'Labs',
      `${m.labs.length === 1 ? 'One interactive lab' : `${m.labs.length} interactive labs`} for ${esc(m.s.name)}: run the methods ICAI examines on your own numbers and step through them. Each lab is also built into the lessons that need it.`,
      `<a class="hb-link" href="#/labs">All ${D.labs.filter(l => l.status !== 'planned').length} labs ${icon('arrow-r')}</a>`)}
      <ul class="sj-labs">${m.labs.map(l => `<li><a class="hb-card sj-lab" href="${esc(l.href)}">
        <span class="sj-lab-top"><span class="hb-ic">${icon('flask')}</span><span class="sj-lab-t"><b>${esc(l.title)}</b><small>${l.topics.map(t => esc(name(t))).join(' · ')}</small></span></span>
        <span class="sj-lab-p">${esc(l.blurb || '')}</span>
        <span class="sj-lab-m hb-meta">${l.pyqs ? `<span>${pl(l.pyqs, 'question')}</span><span>${U.nf(l.marks)} marks</span>` : '<span>Practice lab</span>'}${l.embeddedIn.length ? `<span>in ${pl(l.embeddedIn.length, 'lesson')}</span>` : ''}</span></a></li>`).join('')}</ul></section>`;
  }

  function pnHtml(m) {
    const a = (x, dir) => `<a class="hb-card sj-pnl ${dir}" href="#/s/${x.id}"><small>${dir === 'prev' ? 'Previous paper' : 'Next paper'}</small>
      <span>${dir === 'prev' ? icon('arrow-l') : ''}<span class="hb-ic sm">${glyph(x.id)}</span><span class="sj-pnn">${esc(x.name)}</span>${dir === 'next' ? icon('arrow-r') : ''}</span></a>`;
    /* the first subject has no previous one and the last no next one (no wrap, P3-08); the empty side keeps its column */
    return `<nav class="hb-sec sj-pn-sec" aria-label="More papers"><div class="sj-pns">${m.prev ? a(m.prev, 'prev') : '<span></span>'}${m.next ? a(m.next, 'next') : ''}</div></nav>`;
  }

  let subjCleanup = [];
  const PHONE = '(max-width: 700px)', WIDE = '(min-width: 640px)';
  const mq = q => !!(g.matchMedia && g.matchMedia(q).matches);
  GA.views.subject = {
    async enter(ctx, out) {
      ensureCss();
      const S = GA.store, D = GA.data.D, I = GA.insights && GA.insights.get(), sid = ctx.params.subject, s = D.subjectById[sid];
      if (!s || !I || !I.subject(sid)) {
        if (GA.shell && typeof GA.shell.notFound === 'function') { GA.shell.notFound({ kind: 'subject', id: sid, back: { href: '#/syllabus', label: 'Open the syllabus' } }); return; }
        out.innerHTML = UI.empty('layers', 'Subject not found', '', '<a class="btn pop" href="#/syllabus">Open the syllabus</a>'); return;
      }
      GA.shell.crumbs([['Learn', '#/syllabus'], [s.name, '#/s/' + s.id]]);          // the tab's label as the root (P2-12)
      const m = model(D, I, S, sid);
      out.innerHTML = `<div class="hb sj">${heroHtml(m, D)}${navHtml(m)}${lessonsHtml(m, D, I)}${marksHtml(m, I)}${timelineHtml(m, D)}${labsHtml(m, D)}${pnHtml(m)}</div>`;
      const root = out.firstElementChild;

      /* the topic accordions (P1-05): every run open on wide screens; on phones only the current topic's runs, until the reader toggles one */
      const runs = U.$$('.sj-run', root);
      let phone = null;
      const phoneOpen = new Map();                                     // the reader's own toggles on phones (kept across a rotation)
      const setRun = (d, open) => {
        d.classList.toggle('closed', !open);
        const b = d.querySelector('.sj-run-b'), x = d.querySelector('.sj-div-x');
        if (b) b.hidden = !open;
        if (x && x.tagName === 'BUTTON') x.setAttribute('aria-expanded', String(open));
      };
      /* wide screens: the heading holds plain text; phones: the same content inside a disclosure button */
      const asMode = (d, p) => {
        const x = d.querySelector('.sj-div-x'), b = d.querySelector('.sj-run-b');
        if (!x || (x.tagName === 'BUTTON') === p) return;
        const n = document.createElement(p ? 'button' : 'span');
        n.className = 'sj-div-x';
        if (p) { n.type = 'button'; if (b) n.setAttribute('aria-controls', b.id); }
        while (x.firstChild) n.appendChild(x.firstChild);
        if (document.activeElement === x && p) requestAnimationFrame(() => n.focus());
        x.replaceWith(n);
      };
      const applyRuns = () => {
        const p = mq(PHONE); if (p === phone) return; phone = p;
        runs.forEach(d => { asMode(d, p); setRun(d, !p || (phoneOpen.has(d) ? phoneOpen.get(d) : d.dataset.cur === '1')); });
      };
      applyRuns();
      U.on(root, 'click', 'button.sj-div-x', (e, b) => { const d = b.closest('.sj-run'), open = d.classList.contains('closed'); setRun(d, open); phoneOpen.set(d, open); });
      const openTopic = id => {
        const el = document.getElementById(id); if (!el) return;
        U.$$(`.sj-run[data-topic="${CSS.escape(el.dataset.topic)}"]`, root).forEach(d => { setRun(d, true); if (phone) phoneOpen.set(d, true); });
      };
      /* a topic whose lessons all sit in the outside-2027 group has no divider of its own: its links land on that group */
      const go = (id, flash) => { if (/^sj-t-/.test(id) && !document.getElementById(id) && document.getElementById('sj-t-outside') && s.topics.some(x => 'sj-t-' + x.id === id)) id = 'sj-t-outside'; if (/^sj-t-/.test(id)) openTopic(id); jumpTo(id, flash); };

      /* in-page jumps (local nav, the topic index, hooks that point at this page, topic rows of the ranking) */
      U.on(root, 'click', '[data-jump]', (e, el) => { e.preventDefault(); go(el.dataset.jump, /^sj-t-/.test(el.dataset.jump)); });
      U.on(root, 'click', 'a[data-topic]', (e, el) => { e.preventDefault(); go('sj-t-' + el.dataset.topic, true); });
      /* the syllabus line: clamped to two lines, 'More' only when it is cut */
      const off = U.$('#sj-off', root), more = U.$('.sj-offmore', root);
      const clampCheck = () => { if (!off.isConnected || more.getAttribute('aria-expanded') === 'true') return; more.hidden = off.scrollHeight <= off.clientHeight + 2; };
      requestAnimationFrame(clampCheck);                // P2-56: measured after the first paint, not in enter (no forced layout)
      more.addEventListener('click', () => { const open = more.getAttribute('aria-expanded') !== 'true'; more.setAttribute('aria-expanded', String(open)); off.classList.toggle('open', open); more.textContent = open ? 'Less' : 'More'; });
      /* the ranking: show all */
      U.on(root, 'click', '.sj-more', (e, b) => {
        const open = b.getAttribute('aria-expanded') !== 'true';
        U.$$('.sj-rk.more', root).forEach(li => (li.hidden = !open));
        b.setAttribute('aria-expanded', String(open));
        b.innerHTML = open ? `${icon('chev-u')} Show the top 8` : `${icon('chev-d')} Show all ${U.$$('.sj-rk', root).length} chapters`;
      });
      /* year-by-year measure; both radio groups are one tab stop each (P3-15) */
      [U.$('.sj-tlseg', root), U.$('.sj-mapseg', root)].forEach(gr => { const r = roving(gr); subjCleanup.push(() => r.destroy()); });
      const rows = timelineData(D, m);
      const toLatest = () => { const c = U.$('.sj-cols', root); if (c) c.scrollLeft = c.scrollWidth; };   // a phone's year chart scrolls; it opens on the latest year (P2-54)
      requestAnimationFrame(toLatest);
      U.on(root, 'click', '[data-tl]', (e, b) => {
        U.$$('[data-tl]', root).forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); });
        U.$('#sj-chart', root).innerHTML = chartHtml(rows, b.dataset.tl, m);
        const ch = U.$('.sj-chart', root); if (ch) ch.classList.add('go');
        toLatest();
      });
      /* local nav and topic index: mark the section / topic the reader is in (the last one whose top has passed 35% of the viewport) */
      const links = U.$$('.sj-lk', root), secs = links.map(a => document.getElementById(a.dataset.jump)).filter(Boolean);
      const tixLinks = U.$$('[data-tix]', root);
      let raf = 0, cur = '', curT = '';
      const spy = () => {
        raf = 0;
        if (!root.isConnected) return;
        const y = innerHeight * 0.35, de = document.documentElement;
        let id = '';
        secs.forEach(x => { if (x.getBoundingClientRect().top <= y) id = x.id; });
        if (id && secs.length && scrollY + innerHeight >= de.scrollHeight - 2) id = secs[secs.length - 1].id;
        if (id !== cur) {
          cur = id;
          links.forEach(a => {
            const on = a.dataset.jump === id, bar = a.parentElement;
            a.classList.toggle('on', on);
            if (!on) { a.removeAttribute('aria-current'); return; }
            a.setAttribute('aria-current', 'location');
            if (a.offsetLeft < bar.scrollLeft || a.offsetLeft + a.offsetWidth > bar.scrollLeft + bar.clientWidth) bar.scrollLeft = a.offsetLeft - 18;   // phones: keep the current item in the strip
          });
        }
        if (tixLinks.length) {
          let t = '';
          runs.forEach(d => { if (d.getBoundingClientRect().top <= y) t = d.dataset.topic === '_outside' ? 'sj-t-outside' : 'sj-t-' + d.dataset.topic; });   // a 'continued' run counts as its topic
          if (cur !== 'sj-lessons') t = '';
          if (t !== curT) { curT = t; tixLinks.forEach(a => { const on = a.dataset.tix === t; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); }
        }
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(spy); };
      const onResize = () => { onScroll(); applyRuns(); clampCheck(); };
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onResize, { passive: true });
      subjCleanup.push(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); if (raf) cancelAnimationFrame(raf); });
      raf = requestAnimationFrame(spy);                 // P2-56: the first spy runs after the first paint

      /* Where the marks are: the ranking list by default; on wide screens a toggle draws the topics as the GA.mapviz treemap (once) */
      const box = U.$('#sj-mapbox', root), list = U.$('#sj-rankbox', root), seg = U.$('.sj-mapseg', root);
      let mapH = null;
      const mountMap = async () => {
        if (mapH) return true;
        try { if (!(GA.mapviz && GA.mapviz.mount)) await U.loadScript('app/js/core/mapviz.js'); } catch (err) { return false; }
        if ((ctx.stale && ctx.stale()) || !box.isConnected || !(GA.mapviz && typeof GA.mapviz.mount === 'function')) return false;
        try {
          box.hidden = false; box.style.minHeight = '382px';     // reserve the space: no layout jump when the treemap draws
          mapH = GA.mapviz.mount(box, { mode: 'mini', subject: sid, height: 380, lazy: false,
            onSelect: info => { if (info && info.kind === 'topic' && info.subject === sid) { go('sj-t-' + info.id, true); return false; } return undefined; } });
          subjCleanup.push(() => { if (mapH && mapH.destroy) mapH.destroy(); });
          return true;
        } catch (err) { box.hidden = true; box.innerHTML = ''; mapH = null; if (g.console) console.warn('topic map:', err); return false; }
      };
      if (seg && box && list) {
        const showSeg = () => { seg.hidden = !mq(WIDE); if (seg.hidden) { box.hidden = true; list.hidden = false; U.$$('[data-mv]', seg).forEach(x => { const on = x.dataset.mv === 'list'; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); }); } };
        showSeg();
        addEventListener('resize', showSeg, { passive: true });
        subjCleanup.push(() => removeEventListener('resize', showSeg));
        U.on(seg, 'click', '[data-mv]', async (e, b) => {
          const asMap = b.dataset.mv === 'map';
          if (asMap && !(await mountMap())) return;
          U.$$('[data-mv]', seg).forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); });
          box.hidden = !asMap; list.hidden = asMap;
        });
      }

      /* deep links: ?t=<topic> (map tiles, old links; 'outside' = the outside-2027 group), ?tab=weight (old weightage tab) */
      /* the subject switcher (P3-08): picking a subject opens it. Keys that would change a closed select's value one step at a time (arrows,
         type-ahead) are held back, so the page never changes on a stray arrow press (WCAG 3.2.2); Space, Enter or Alt+Down open the list */
      const sw = U.$('[data-switch]', root);
      if (sw) {
        sw.addEventListener('keydown', e => { if (!e.altKey && !e.metaKey && !e.ctrlKey && (/^(Arrow(Up|Down|Left|Right)|Home|End|PageUp|PageDown)$/.test(e.key) || (e.key.length === 1 && e.key !== ' '))) e.preventDefault(); });
        sw.addEventListener('change', () => { if (sw.value && D.subjectById[sw.value]) location.hash = '#/s/' + sw.value; });
      }
      const t = ctx.query.t, tab = ctx.query.tab;
      if (t && (document.getElementById('sj-t-' + t) || s.topics.some(x => x.id === t))) later(() => go('sj-t-' + t, true), 80);
      else if (tab === 'weight') later(() => jumpTo('sj-years'), 80);
    },
    leave() { clearTimers(); subjCleanup.forEach(f => { try { f(); } catch (e) { /* already gone */ } }); subjCleanup = []; }
  };

  /* ================================================================== study routes (P1-06) */
  /** the curated routes the Learn tab offers, in this order; ids are insights' path ids (stable: profile.route stores them) */
  const ROUTES = ['zero', 'cover80', 'crash', 'last30'];
  /** the Routes row: one entry per route with its real size and reach, the chosen one (profile.route) marked. Pure: tests/syllabus.test.js */
  function routesModel(state, D, I) {
    const cur = state && state.profile && typeof state.profile.route === 'string' ? state.profile.route : null;
    const done = id => !!(state && state.lessons && state.lessons[id] && state.lessons[id].done);
    return ROUTES.map(id => (I && I.path ? I.path(id) : null)).filter(p => p && p.lessons && p.lessons.length).map(p => {
      const reach = p.id === 'zero' ? 'every lesson'
        : p.recentTotal ? `${Math.round((100 * p.recentMarks) / p.recentTotal)}% of ${p.from}–${String(p.to).slice(2)} marks`
        : `${Math.round(100 * p.share)}% of the marks`;
      return { id: p.id, title: p.title, lessons: p.lessons.length, hours: p.hours, reach, done: p.lessons.filter(done).length, active: p.id === cur, href: p.href };
    });
  }
  /** the chosen route as one line for the header ('On route: Crash course · 12 of 91'), or null; a route id the insights do not know is ignored */
  function onRoute(state, I) {
    const id = state && state.profile && typeof state.profile.route === 'string' ? state.profile.route : null, p = id && I && I.path ? I.path(id) : null;
    if (!p || !p.lessons || !p.lessons.length) return null;
    const d = p.lessons.filter(x => state.lessons[x] && state.lessons[x].done).length;
    return { id: p.id, title: p.title, done: d, total: p.lessons.length };
  }

  /* ================================================================== syllabus index */
  /** text with every case-insensitive occurrence of q wrapped in <mark> (escaped) */
  function hl(text, q) {
    const t = String(text || '');
    if (!q) return esc(t);
    const lt = t.toLowerCase(); let i = 0, out = '';
    for (;;) { const j = lt.indexOf(q, i); if (j < 0) break; out += esc(t.slice(i, j)) + '<mark>' + esc(t.slice(j, j + q.length)) + '</mark>'; i = j + q.length; }
    return out + esc(t.slice(i));
  }
  /** which sub-topics pass the filters: {subjectId: {topicId: [subtopic]}} plus totals */
  function filterTree(D, f) {
    const q = lower(f.q).trim(), hit = x => !!q && lower(x).includes(q), out = {};
    let subs = 0, subjects = 0;
    D.subjects.forEach(s => {
      const sHit = hit(s.name) || hit(s.short) || (s.area !== s.name && hit(s.area)), tmap = {};
      let any = false;
      s.topics.forEach(t => {
        const tHit = sHit || hit(t.name) || hit(t.syl);
        const list = t.subtopics.filter(n => {
          const L = D.lessonById[n.id], eff = n.status !== 'in' ? n.status : t.status;
          if (f.tier && n.tier !== f.tier) return false;
          if (f.status && eff !== f.status) return false;
          return !q || tHit || hit(n.name) || (L && (hit(L.title) || (L.tags || []).some(hit)));
        });
        if (list.length) { tmap[t.id] = list; any = true; subs += list.length; }
      });
      if (any) { out[s.id] = tmap; subjects++; }
    });
    return { tree: out, subs, subjects, q };
  }

  let syCleanup = [];
  GA.views.syllabus = {
    enter(ctx, out) {
      ensureCss();
      syCleanup.forEach(f => f()); syCleanup = [];
      const S = GA.store, D = GA.data.D, I = GA.insights && GA.insights.get(), today = U.today();
      GA.shell.crumbs([['Learn', '#/syllabus']]);                                        // document title 'Learn · PassBook' (P2-12)
      const mastery = Object.fromEntries(GA.stats.subjects(S.state, D, today).map(x => [x.id, x.mastery]));
      const allSubs = D.subjects.flatMap(s => s.topics.flatMap(t => t.subtopics.map(n => ({ n, t, s }))));
      const withLesson = allSubs.filter(x => D.lessonById[x.n.id]).length;
      const eff = x => (x.n.status !== 'in' ? x.n.status : x.t.status);
      const cnt = { tier: U.countBy(allSubs, x => x.n.tier), status: U.countBy(allSubs, eff) };
      const minutes = U.sum(D.lessons.map(l => l.minutes || 0)), years = yearsOf(D);
      const rows = I ? I.subjects : [], maxPer = Math.max(1, ...rows.map(r => r.paperMarks || perOf(r)));
      const f = { q: ctx.query.q || '', tier: TIERS.some(x => x[0] === ctx.query.tier) ? ctx.query.tier : '', status: STATUS.some(x => x[0] === ctx.query.status) ? ctx.query.status : '' };
      let open = new Set(String(ctx.query.open || '').split(',').filter(id => D.subjectById[id]));
      let manual = new Set(open);
      const filtering = () => !!(f.q.trim() || f.tier || f.status);

      const segH = (key, opts, cur, label) => `<div class="hb-seg sy-seg" role="radiogroup" aria-label="${esc(label)}" data-k="${key}"><button type="button" role="radio" data-v="" aria-checked="${!cur}" class="${!cur ? 'on' : ''}">${key === 'tier' ? 'Any tier' : 'Any status'}</button>${opts.map(([v, l]) => `<button type="button" role="radio" data-v="${v}" aria-checked="${cur === v}" class="${cur === v ? 'on' : ''}">${esc(l)}<em>${cnt[key][v] || 0}</em></button>`).join('')}</div>`;
      /* phones get the same two filters as plain selects (CSS shows one form or the other; both stay in sync) */
      const selH = (key, opts, cur, label) => `<label class="sy-sel"><span class="sr">${esc(label)}</span><select class="input" data-k="${key}"><option value=""${!cur ? ' selected' : ''}>${key === 'tier' ? 'Any tier' : 'Any status'}</option>${opts.map(([v, l]) => `<option value="${v}"${cur === v ? ' selected' : ''}>${esc(l)} (${cnt[key][v] || 0})</option>`).join('')}</select></label>`;
      const outside = (cnt.status.legacy || 0) + (cnt.status.extra || 0);
      /* P2-09 / P1-55: what the tiers and the status markers mean, once, in plain text (the key line) and as a tap tip on each filter */
      const ts = tierStats(D, I), bank = bankOf(D), BNs = bankN(D), tierShare = (v, all) => (bank && Object.values(ts).some(o => o.marks > 0) ? `, ${pct0(ts[v].share)}${all ? ' of question marks' : ''}` : '');
      const tierLine = v => `${tierName(v)}: ${TIER_DEF[v]}${tierShare(v, true)}`;
      const fTip = (k, text) => (UI && typeof UI.infoTip === 'function' ? UI.infoTip(text, { label: k === 'tier' ? 'Tiers' : 'Syllabus status', cls: 'sy-ftip' }) : '');
      const tierTip = fTip('tier', TIERS.map(([v]) => tierLine(v)).join('\n')), statusTip2 = fTip('status', STATUS.map(([v, l]) => `${l}: ${STATUS_DEF[v]}`).join('\n'));
      /* phones: the page key would push the first card off the first screen, so each open card ends with the key of the markers it shows */
      const cardKey = (s, tmap) => {
        const tiers = new Set(), sts = new Set();
        s.topics.filter(t => tmap[t.id]).forEach(t => { if (t.status !== 'in') sts.add(t.status); tmap[t.id].forEach(n => { if (n.tier !== 'core') tiers.add(n.tier); if (n.status && n.status !== 'in') sts.add(n.status); }); });
        const bits = TIERS.filter(([v]) => tiers.has(v)).map(([v]) => `<span><b>${esc(tierName(v))}</b> ${esc(TIER_DEF[v])}${esc(tierShare(v, true))}</span>`)
          .concat(['legacy', 'extra'].filter(v => sts.has(v)).map(v => `<span><span class="dotl warn">${v}</span> ${esc(STATUS_DEF[v])}</span>`));
        /* the done / started dots this card's tree shows (P1-55: their meaning is visible text, not a hover title) */
        if (Object.values(tmap).some(list => list.some(n => D.lessonById[n.id] && lstate(S, n.id)))) bits.push(progKey('sy-kd'));
        return bits.length ? `<p class="sy-key sy-ckey">${bits.join('')}</p>` : '';
      };
      const anyState = D.lessons.some(l => lstate(S, l.id));                  // the trees show done / started dots: the key says what they mean
      const keyHtml = `<p class="sy-key sy-pkey" id="sy-key"><span class="sy-kg sy-kt"><span class="sy-kh">Tiers</span>${TIERS.map(([v], i) => `<span><b>${esc(tierName(v))}</b> ${esc(TIER_DEF[v])}${esc(tierShare(v, !i))}</span>`).join('')}</span>` +
        (outside ? `<span class="sy-kg sy-ks"><span class="sy-kh">Outside the syllabus text</span>${['legacy', 'extra'].map(v => `<span><span class="dotl warn">${v}</span> ${esc(STATUS_DEF[v])}</span>`).join('')}</span>` : '') + `${anyState ? progKey('sy-kp') : ''}</p>`;
      /* P1-07: one real-data line that does not repeat the strip; the progress sentence once a lesson is finished */
      const subLine = () => { const n = D.lessons.filter(l => lstate(S, l.id) === 'done').length; return `Mapped line by line to ICAI's syllabus for CA Intermediate Group II (new scheme), January 2027 attempt.${n ? ` You have finished <b>${U.nf(n)}</b> of ${U.nf(D.lessons.length)} lessons.` : ''}`; };
      const nTopics = D.subjects.reduce((n, x) => n + x.topics.length, 0), groupMarks = U.sum(D.subjects.map(x => +x.marks || 0));
      out.innerHTML = `<div class="hb sj sy">
        <header class="hb-head sy-head"><div class="hb-head-t">
          <h1 id="sy-title">The Group II syllabus</h1>
          <p class="hb-sub" id="sy-sub">${subLine()}</p><p class="sy-onroute" id="sy-onroute" hidden></p>
          <span class="sy-links"><a class="hb-link sm sy-maplink" href="#/map">${icon('grid')} Content map ${icon('arrow-r')}</a>${D.lessons.length && GA.shell && GA.shell.has && GA.shell.has('/rev') ? `<a class="hb-link sm sy-maplink" href="#/rev">${icon('sigma')} Formula sheets ${icon('arrow-r')}</a>` : ''}</span></div>
          <div class="hb-acts sy-cta" id="sy-cta"></div></header>
        <section class="hb-stats sy-stats" style="--n:4" aria-label="The syllabus in numbers">
          <div class="hb-stat"><b>${U.nf(D.lessons.length)}</b><span>${withLesson === allSubs.length ? 'lessons, one for every sub-topic' : `lessons for ${withLesson} of ${allSubs.length} sub-topics`}</span></div>
          <div class="hb-stat"><b>${esc(minutes ? U.dur(minutes) : '0 min')}</b><span>of reading</span></div>
          ${BNs ? `<div class="hb-stat"><b>${U.nf(BNs.all)}</b><span>ICAI questions from ${pl(BNs.docs, 'ICAI document')}</span></div>` : bank ? `<div class="hb-stat"><b>${U.nf(D.questions.length)}</b><span>ICAI questions, ${years[0]}–${years[years.length - 1]}</span></div>` : `<div class="hb-stat"><b>${U.nf(nTopics)}</b><span>chapters in ${D.subjects.length} papers</span></div>`}
          <div class="hb-stat"><b>${U.nf(groupMarks)}</b><span>marks in Group II · pass: 40 in each paper, 150 in all</span></div>
        </section>
        <section class="sy-routes" id="sy-routes" aria-labelledby="sy-rt-h"></section>
        <section class="sy-main">
          ${CHANGES.length ? `<details class="hb-card tight sy-changes"><summary><span class="hb-ic sm">${icon('refresh')}</span><span class="sy-ch-t"><b>What changed in the syllabus:</b> <span>${CHANGES.length === 1 ? '1 paper' : CHANGES.length + ' papers'}</span></span>${icon('chev-d', 'sy-chev')}</summary>
            <ul class="sy-chg">${CHANGES.map(c => `<li><a href="#/s/${c[0]}"><span class="hb-ic sm">${glyph(c[0])}</span><b>${c[1]}</b><span>${c[2]}</span></a></li>`).join('')}</ul></details>` : ''}
          <div class="sy-tools" role="search" aria-label="Filter the syllabus">
            <label class="sy-search">${icon('search')}<span class="sr">Filter the syllabus by paper, chapter, sub-topic or lesson</span><input class="input" type="search" id="sy-q" placeholder="Filter the syllabus…" value="${esc(f.q)}" autocomplete="off" spellcheck="false"><button type="button" class="sy-clear" aria-label="Clear the search"${f.q ? '' : ' hidden'}>${icon('x')}</button></label>
            <button type="button" class="btn sy-fbtn" aria-expanded="false" aria-controls="sy-filters">${icon('filter')}<span>Filters</span><em class="sy-fn" hidden></em></button>
            <div class="sy-filters" id="sy-filters"><span class="sy-fg">${segH('tier', TIERS.map(([v, l]) => [v, tierName(v) || l]), f.tier, 'Tier')}${tierTip}</span>${outside ? `<span class="sy-fg">${segH('status', STATUS, f.status, 'Syllabus status')}${statusTip2}</span>` : ''}${selH('tier', TIERS.map(([v, l]) => [v, tierName(v) || l]), f.tier, 'Tier')}${outside ? selH('status', STATUS, f.status, 'Syllabus status') : ''}</div>
          </div>
          <div class="sy-bar"><div class="sy-bar-l"><p class="sy-count" id="sy-count" role="status" aria-live="polite"></p>${keyHtml}</div><div class="sy-acts"><button type="button" class="btn sm ghost sy-act" data-all="open">${icon('chev-d')} Expand all</button><button type="button" class="btn sm ghost sy-act" data-all="close">${icon('chev-u')} Collapse all</button></div></div>
          <div class="sy-list" id="sy-list"></div>
        </section></div>`;
      const root = out.firstElementChild, list = U.$('#sy-list', root), qi = U.$('#sy-q', root), clr = U.$('.sy-clear', root);

      /* the header's coral is the shared next step (P0-08); the route row and the 'On route' line follow profile.route (P1-06) */
      const paintHead = () => {
        const c = headerCta(S.state, D, I, today), r = onRoute(S.state, I);
        const why = c.reason && !(c.step && c.step.rule === 'route' && r) ? c.reason : '';           // on a route the 'On route' line says it once (P1-06)
        U.$('#sy-cta', root).innerHTML = `<a class="btn pop lg hb-go" href="${esc(c.href)}"><span><small>${esc(c.kicker)}</small>${esc(c.title)}</span>${icon('arrow-r')}</a>${why ? `<p class="sy-why">${esc(why)}</p>` : ''}`;
        const or = U.$('#sy-onroute', root);
        or.hidden = !r;
        or.innerHTML = r ? `On route: <b>${esc(r.title)}</b> · ${U.nf(r.done)} of ${U.nf(r.total)} <button type="button" class="sy-rt-x" data-route-off>Change</button>` : '';
        U.$('#sy-sub', root).innerHTML = subLine();
      };
      const paintRoutes = () => {
        const rs = I ? routesModel(S.state, D, I) : [];
        const box = U.$('#sy-routes', root);
        box.hidden = !rs.length;
        box.innerHTML = rs.length ? `<h2 class="sy-rt-h" id="sy-rt-h">Routes</h2><div class="sy-rt-row" role="group" aria-labelledby="sy-rt-h">${rs.map(r => `<button type="button" class="sy-rt${r.active ? ' on' : ''}" data-route="${esc(r.id)}" aria-pressed="${r.active}">
            <b>${r.active ? icon('check') : ''}${esc(r.title)}</b><span>${U.plural(r.lessons, 'lesson')} · ${esc(String(r.hours))} h · ${esc(r.reach)}${r.active && r.done ? ` · ${U.nf(r.done)} done` : ''}</span></button>`).join('')}</div>` : '';
        /* phones: the chip row scrolls; keep the chosen route in view at the row's own inset (its scroll-padding, so snapping agrees);
           measured in the next frame so painting the row never forces a layout (P2-56) */
        const row = U.$('.sy-rt-row', box), on = U.$('.sy-rt.on', box);
        if (row && on) requestAnimationFrame(() => {
          if (!row.isConnected || row.scrollWidth <= row.clientWidth) return;
          const pad = parseFloat(getComputedStyle(row).scrollPaddingLeft) || parseFloat(getComputedStyle(row).paddingLeft) || 0;
          row.scrollLeft = Math.max(0, on.offsetLeft - row.offsetLeft - pad);
        });
      };
      paintHead(); paintRoutes();
      const setRoute = id => {
        if (!GA.actions || typeof GA.actions.setProfile !== 'function') return;
        GA.actions.setProfile({ route: id || null });
        paintHead(); paintRoutes();
        const r = onRoute(S.state, I), c = headerCta(S.state, D, I, today);
        if (GA.ui && typeof GA.ui.say === 'function') GA.ui.say(r ? `Route chosen: ${r.title}. ${c.kicker}: ${c.title}` : `No route. ${c.kicker}: ${c.title}`);
      };
      U.on(root, 'click', '[data-route]', (e, b) => { const id = b.dataset.route; setRoute(b.getAttribute('aria-pressed') === 'true' ? null : id); const nb = U.$(`[data-route="${CSS.escape(id)}"]`, root); if (nb) nb.focus(); });
      U.on(root, 'click', '[data-route-off]', () => { setRoute(null); const first = U.$('[data-route]', root); if (first) first.focus(); });
      /* phones: the tier and status filters sit behind one Filters button (P1-07) */
      const fbtn = U.$('.sy-fbtn', root), tools = U.$('.sy-tools', root), fn = U.$('.sy-fn', root);
      const showFn = () => { const k = (f.tier ? 1 : 0) + (f.status ? 1 : 0); fn.hidden = !k; fn.textContent = k ? String(k) : ''; };
      fbtn.addEventListener('click', () => { const open = fbtn.getAttribute('aria-expanded') !== 'true'; fbtn.setAttribute('aria-expanded', String(open)); tools.classList.toggle('fopen', open); });

      const sync = () => {
        if (!root.isConnected) return;                // a debounced render after leaving must not rewrite another page's URL
        const h = GA.router.href('/syllabus', { q: f.q.trim(), tier: f.tier, status: f.status, open: filtering() ? '' : Array.from(open).join(',') });
        if (location.hash !== h) try { history.replaceState(history.state, '', location.href.split('#')[0] + h); } catch (e) { /* URL state is a nicety */ }
      };
      const subjHtml = (s, tmap, isOpen, q) => {
        const r = I ? I.subject(s.id) : null, ls = D.lessons.filter(l => l.subject === s.id), done = ls.filter(l => lstate(S, l.id) === 'done').length, mm = mastery[s.id];
        const nsub = s.topics.reduce((n, t) => n + t.subtopics.length, 0), shown = Object.values(tmap).reduce((n, x) => n + x.length, 0);
        const sHit = !!q && (lower(s.name).includes(q) || lower(s.short).includes(q) || (s.area !== s.name && lower(s.area).includes(q)));
        const body = s.topics.filter(t => tmap[t.id]).map(t => {
          const tr = I ? I.topic(t.id) : null, tHit = !!q && (lower(t.name).includes(q) || lower(t.syl).includes(q));
          return `<li class="sy-topic"><div class="sy-th"><b>${hl(t.name, q)}</b>${statusTip(t.status)}<span class="sy-tm hb-meta"><span>${pl(t.subtopics.length, 'sub-topic')}</span>${BNs ? (BNs.topic[t.id] ? `<a href="#/pyq?topic=${encodeURIComponent(t.id)}">${pl(BNs.topic[t.id], 'ICAI question')}</a>` : '<span>no ICAI question yet</span>') : tr && bank ? (tr.pyqs ? `<a href="#/pyq?topic=${encodeURIComponent(t.id)}">${pl(tr.pyqs, 'question')}</a>` : '<span>no ICAI question yet</span>') : ''}</span></div>
            ${t.syl && !lower(t.name).includes(lower(t.syl).replace(/[-\u2010\u2011\u2013]/g, ' ')) ? `<p class="sy-syl">${hl(t.syl, q)}</p>` : ''}
            <ul class="sy-subs">${tmap[t.id].map(n => {
              const L = D.lessonById[n.id], stt = L ? lstate(S, n.id) : 'plan', sr = I ? I.subtopic(n.id) : null, npq = BNs ? BNs.sub[n.id] || 0 : sr ? sr.pyqs : 0;
              const byTag = q && L && !sHit && !tHit && !lower(L.title).includes(q) && !lower(n.name).includes(q) ? (L.tags || []).filter(x => lower(x).includes(q)).slice(0, 2) : [];
              return `<li><a class="sy-node ${stt}" href="${L ? '#/l/' + n.id : bank ? '#/pyq?' + (npq ? 'sub=' + n.id : 'topic=' + t.id) : '#/map?node=' + n.id}"><span class="sy-tick">${stateDot(stt)}</span>
                <span class="sy-nn">${hl(L ? L.title : n.name, q)}${byTag.length ? `<small>tagged ${byTag.map(x => hl(x, q)).join(', ')}</small>` : ''}</span>
                <span class="sy-nm hb-meta">${tierTxt(n.tier)}${statusTxt(n.status)}<span>${L ? `${L.minutes}&nbsp;min` : 'lesson planned'}</span>${bank ? `<span>${npq ? pl(npq, 'question') : 'no ICAI question'}</span>` : ''}</span>${stateSr(stt)}</a></li>`;
            }).join('')}</ul></li>`;
        }).join('');
        /* P2-10: the whole header opens the subject (its title link stretches over the row); a 44 px 'Topics' button peeks the tree; the ring is
           always mastery (as on Home and My progress), lessons done is text; P3-08: 'Builds on PDS (17)' with links */
        const ring = mm != null ? `${C.ring({ size: 44, stroke: 5, pct: mm, text: Math.round(mm * 100) + '%' })}<span class="sy-pt"><b>${Math.round(mm * 100)}%</b> mastery<small>${done ? `${done} of ${ls.length} done` : 'no lesson done yet'}</small></span>` : '';
        const bo = I ? buildsHtml(D, buildsOn(D, I, s.id)) : '';
        /* the closing 'Open <subject>' link: the full name where it fits, the medium name on phones ('Open CO & Architecture'); one text span so a
           narrow column wraps it as one line of words (subject.css .sy-open) */
        const mn = phoneName(s), openTxt = mn !== s.name ? `<span class="sy-open-f">${esc(s.name)}</span><span class="sy-open-m">${esc(mn)}</span>` : esc(s.name);
        return `<article class="hb-card flush sy-subj${isOpen ? ' open' : ''}" id="sy-${s.id}">
          <div class="sy-sh">
            <span class="hb-ic">${glyph(s.id)}</span>
            <div class="sy-name"><h2><a class="sy-go" href="#/s/${s.id}">${hl(s.name, q)}</a>${paperName(s) ? `<small>${esc(paperName(s))}</small>` : s.area !== s.name ? `<small>${esc(s.area)}</small>` : ''}</h2>
              <p class="sy-meta hb-meta">${filtering() ? `<span class="sy-hits">${shown} of ${nsub} match</span>` : ''}<span>${pl(s.topics.length, 'chapter')}</span><span>${pl(ls.length, 'lesson')}</span>${BNs ? `<span>${bankTxt(BNs.subject[s.id])}</span>` : r && bank ? `<span>${U.nf(r.pyqs)} ICAI questions</span>` : ''}${bo}</p></div>
            ${r ? `<div class="sy-w"><span><b>${U.nf(r.paperMarks || perOf(r))}</b> marks<span class="sr"> in the paper</span></span><span class="hb-bar sm" aria-hidden="true"><i style="width:${((100 * (r.paperMarks || perOf(r))) / maxPer).toFixed(1)}%"></i></span></div>` : ''}
            <div class="sy-p">${ring}</div>
            <button type="button" class="sy-tog" aria-expanded="${isOpen}" aria-controls="sy-b-${s.id}" aria-label="${isOpen ? 'Hide' : 'Show'} the chapters of ${esc(s.name)}"><span class="sy-tog-t" aria-hidden="true">Chapters</span>${icon('chev-d')}</button>
          </div>
          <div class="sy-body" id="sy-b-${s.id}"${isOpen ? '' : ' hidden'}>
            <p class="sy-off">${esc(s.official)}</p>
            <ul class="sy-topics">${body}</ul>${cardKey(s, tmap)}
            <a class="hb-link sy-open" href="#/s/${s.id}"><span class="sy-open-t">Open ${openTxt}</span>${icon('arrow-r')}</a></div></article>`;
      };
      const render = () => {
        const F = filterTree(D, f), act = filtering();
        list.classList.toggle('has-p', D.lessons.some(l => lstate(S, l.id)) || Object.values(mastery).some(x => x != null));
        list.innerHTML = F.subjects ? D.subjects.filter(s => F.tree[s.id]).map(s => subjHtml(s, F.tree[s.id], act ? true : open.has(s.id), F.q)).join('')
          : `<div class="sy-empty">${UI.empty('search', 'Nothing matches', f.q.trim() ? `No paper, chapter or sub-topic contains “${esc(f.q.trim())}” with these filters.` : 'No sub-topic has this combination of tier and status.', '<button type="button" class="btn" data-reset>Clear the filters</button>')}</div>`;
        U.$('#sy-count', root).textContent = act ? `${pl(F.subs, 'sub-topic')} in ${pl(F.subjects, 'paper')} match` : '';   // the count line only while filtering (P1-07)
        root.classList.toggle('filtering', act);
        clr.hidden = !f.q;
        showFn();
        U.$('.sy-acts', root).hidden = !F.subjects;
        sync();
      };
      const setOpen = (id, on) => {
        const art = document.getElementById('sy-' + id); if (!art) return;
        art.classList.toggle('open', on);
        const b = U.$('.sy-tog', art), body = U.$('.sy-body', art);
        b.setAttribute('aria-expanded', String(on)); b.setAttribute('aria-label', `${on ? 'Hide' : 'Show'} the chapters of ${D.subjectById[id].name}`); body.hidden = !on;
        if (!filtering()) { if (on) open.add(id); else open.delete(id); manual = new Set(open); sync(); }
      };
      render();

      /* the header row is the subject's link (P2-10); only the Topics button folds the tree */
      U.on(list, 'click', '.sy-tog', (e, b) => { const art = b.closest('.sy-subj'); setOpen(art.id.slice(3), !art.classList.contains('open')); });
      U.on(root, 'click', '[data-all]', (e, b) => { const on = b.dataset.all === 'open'; U.$$('.sy-subj', list).forEach(a => setOpen(a.id.slice(3), on)); });
      const showFilter = () => {
        U.$$('.sy-seg', root).forEach(box => U.$$('button', box).forEach(x => { const on = x.dataset.v === f[box.dataset.k]; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); }));
        U.$$('.sy-sel select', root).forEach(sel => (sel.value = f[sel.dataset.k]));
      };
      const setFilter = (k, v) => {
        if (!filtering()) manual = new Set(open);
        f[k] = v; showFilter();
        if (!filtering()) open = new Set(manual);
        render();
      };
      U.on(root, 'click', '.sy-seg button', (e, b) => setFilter(b.parentElement.dataset.k, b.dataset.v));
      U.$$('.sy-seg', root).forEach(gr => { const r = roving(gr); syCleanup.push(() => r.destroy()); });
      U.on(root, 'change', '.sy-sel select', (e, sel) => setFilter(sel.dataset.k, sel.value));
      const onInput = U.debounce(() => { if (!root.isConnected) return; const was = filtering(); if (!was) manual = new Set(open); f.q = qi.value; if (!filtering()) open = new Set(manual); render(); }, 110);
      qi.addEventListener('input', () => { clr.hidden = !qi.value; onInput(); });
      qi.addEventListener('keydown', e => { if (e.key === 'Escape' && qi.value) { e.preventDefault(); e.stopPropagation(); qi.value = ''; f.q = ''; open = new Set(manual); render(); } });
      clr.addEventListener('click', () => { qi.value = ''; f.q = ''; open = new Set(manual); render(); qi.focus(); });
      U.on(root, 'click', '[data-reset]', () => {
        qi.value = ''; f.q = ''; f.tier = ''; f.status = ''; open = new Set(manual);
        showFilter(); render(); qi.focus();
      });
      /* arrow keys move between the subject toggles */
      U.on(list, 'keydown', '.sy-tog', (e, b) => {
        if (!/^(ArrowDown|ArrowUp|Home|End)$/.test(e.key)) return;
        const all = U.$$('.sy-tog', list), i = all.indexOf(b), j = e.key === 'Home' ? 0 : e.key === 'End' ? all.length - 1 : Math.max(0, Math.min(all.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)));
        e.preventDefault(); all[j].focus();
      });
      if (open.size === 1 && !filtering()) { const id = Array.from(open)[0]; later(() => { const el = document.getElementById('sy-' + id); if (el) scrollBelowChrome(el, false); }, 60); }
    },
    leave() { clearTimers(); syCleanup.forEach(f => f()); syCleanup = []; }
  };

  const Kit = { phoneName, paperName, bankOf, bankN, ticks, hl, filterTree, model, timelineData, hookViz, stepFor, headerCta, heroCta, sequence, routesModel, onRoute, perSince, pickHooks, hookCard, ROUTES, FAST_SAVES, FAST_MAX,
    tierStats, tierName, tierTxt, buildsOn, TIERS, STATUS_DEF, yearExtremes, shareOf, youByTopic };   // pure helpers (tests/syllabus.test.js)
  if (typeof module !== 'undefined' && module.exports) module.exports = Kit;
})(typeof window !== 'undefined' ? window : globalThis);
