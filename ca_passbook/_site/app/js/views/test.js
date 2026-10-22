/* PassBook — tests and mocks: hub, exam-style runner (timer with pause, palette, review marks, calculator) and result analytics.
   v3 look: the mockup's practice screen (question card + side panel with clock, palette and legend).
   Audit (WP10): the hub leads with one start-here hero, the approved two-half card with a cobalt half (P1-30, D21); on phones and at 200 % zoom
   the runner's exam bar is the top bar, the actions are one row and the palette is a sheet (P1-28). Full-length sittings follow GATE's
   computer-based test (D7, P2-30): a briefing card first, answers count once saved, GATE's palette shapes, an on-screen NAT keypad; short tests
   autosave. The result is a milestone: a two-half score hero, where the marks went, the next step (P2-32, P2-69). Contract: ARCHITECTURE §10. */
(function (g) {
  'use strict';
  const GA = g.GA, U = GA.util, esc = U.esc, icon = GA.icon, UI = GA.ui, DATA = GA.data, TG = GA.testgen, SC = GA.scoring, C = GA.charts;

  /* ------------------------------------------------------------ helpers */
  const live = () => GA.store.state.live;
  const answeredIn = lv => (lv && lv.qids ? lv.qids.filter(id => lv.responses && SC.norm(lv.responses[id]) !== null).length : 0);
  /** a stored test read the way GATE counts it (P0-04, P0-05): GA.scoring.summary when present, else the stored fields */
  const sumOf = t => (SC.summary ? SC.summary(t, DATA.D) : { score: t.score, max: t.max, correct: t.correct, wrong: t.wrong, skipped: t.skipped, mta: 0, mtaMarks: 0, notEvaluated: 0,
    ungraded: t.ungraded || 0, attempted: t.attempted, total: t.total, accuracy: t.attempted ? t.correct / t.attempted : null, scored: !!t.max, full: t.kind === 'paper' || t.kind === 'mock',
    pct: t.max ? t.score / t.max : null, missed: (t.wrong || 0) + (t.skipped || 0), negative: t.negative || 0 });
  const minus = s => String(s).replace(/^-/, '−');
  const fm = x => minus(U.fmtMarks(x));
  const safe = (f, d) => { try { const v = f(); return v == null ? d : v; } catch (e) { return d; } };
  const calm = () => !!(g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches);
  /* dates in the app's one format (P3-27): '16 Oct' for a study day, '12 Oct 2026, 12:45' for a moment */
  const dayTxt = t => (U.fmtDay && U.dayOf ? U.fmtDay(U.dayOf(t), { day: 'numeric', month: 'short' }) : new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })).replace(' ', '\u00a0');
  const dateTxt = t => (U.fmtWhen ? U.fmtWhen(t) : new Date(t).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
  /** mock titles carry their day ('Mock 1 · 16 Oct'), so a title is dated only when it has none: never '16 Oct · 16 Oct' */
  const HAS_DAY = /\b\d{1,2}[ \u00a0](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;
  const datedTitle = t => (HAS_DAY.test(t.title || '') ? t.title : `${t.title} · ${dayTxt(t.finished)}`);
  const sIcon = id => (C && C.subj ? C.subj(id) : '');
  const hours = min => (min % 60 ? U.plural(Math.round(min), 'minute') : U.plural(min / 60, 'hour'));
  const hm = min => (U.hm ? U.hm(min) : Math.round(min) + ' min');
  const secs = ms => { const s = Math.round(ms / 1000); return s < 60 ? s + ' s' : Math.floor(s / 60) + ' min' + (s % 60 ? ' ' + (s % 60) + ' s' : ''); };
  const KIND = { paper: 'Paper', mock: 'Mock', diagnostic: 'Diagnostic', subject: 'Subject test', topic: 'Topic test', custom: 'Filtered test', warmup: 'Warm-up' };
  const pctTxt = m => (U.pctMarks ? U.pctMarks(m.score, m.max) : Math.round(100 * (m.pct || 0)) + '%');
  const scoreTxt = m => `${fm(m.score)} / ${m.max}`;
  const secName = s => (s === 'GA' ? 'General Aptitude' : 'CS & IT');
  const isFullKind = k => k === 'paper' || k === 'mock';
  /** GA.ui.roving (P3-15, WP1) for a group of pressed buttons, when it exists; today's Tab stops otherwise */
  const roving = el => { if (el && UI.roving) safe(() => UI.roving(el, { items: 'button' }), null); };

  /* the palette's five statuses in GATE's shapes and Cobalt Pop colours (P2-30): one renderer for the palette cells, the legend, the Submit
     summary and the briefing. Not visited: a square; not answered: flat top, round bottom; answered: round top, flat bottom; marked for review:
     a circle; answered and marked: a circle with a tick (it is evaluated). Shape, fill and tick carry it, never colour alone. */
  const STATUS = { nv: 'Not visited', na: 'Not answered', ans: 'Answered', mk: 'Marked for review', am: 'Answered & marked for review' };
  const LBL = { ans: 'answered', na: 'not answered', nv: 'not visited', mk: 'marked for review', am: 'answered and marked for review' };
  const tickSvg = '<svg class="i pg-ck" aria-hidden="true"><use href="#i-check"/></svg>';
  const glyph = (k, txt, cls) => `<i class="pg ${k}${cls ? ' ' + cls : ''}" aria-hidden="true">${txt != null ? esc(txt) : ''}${k === 'am' ? tickSvg : ''}</i>`;

  /* ------------------------------------------------------------ starting a test */
  /** P0-03: starting a test while another is live asks first. Keep it (the default) returns to the runner; Discard and start replaces it. */
  function confirmReplace(lv) {
    return new Promise(res => {
      const n = answeredIn(lv), N = (lv.qids || []).length, left = U.clock(Math.max(0, (lv.limitMs || 0) - (lv.elapsedMs || 0)));
      const m = UI.modal({ title: 'Replace the test in progress?', body: `<p class="muted" style="margin:6px 0 0"><b>${esc(lv.title || 'Your test')}</b>: ${n} of ${N} answered, ${left} left. Starting another test discards it.</p>`,
        onclose: v => res(v || null),
        actions: [{ label: 'Discard and start', kind: 'bad', value: 'discard' }, { label: 'Keep it', kind: 'primary', value: 'keep' }] });
      // the safe choice has focus (Enter keeps the test)
      const keep = m && m.el ? U.$$('.m-actions .btn', m.el).find(b => /Keep it/.test(b.textContent)) : null;
      if (keep) setTimeout(() => { if (keep.isConnected) keep.focus({ preventScroll: true }); }, 60);
    });
  }
  /** preload a test's figures (question and option images) so the first question opens complete (P2-76); a figure that fails never stops the
      test, and a slow one is waited for at most 8 s */
  function figures(qs) {
    if (typeof Image === 'undefined') return Promise.resolve();
    const files = U.uniq([].concat(...qs.map(q => (q.figures || []).map(f => f.file)))).filter(Boolean);
    if (!files.length) return Promise.resolve();
    const one = f => new Promise(res => { const im = new Image(); im.onload = im.onerror = () => res(); im.src = DATA.figUrl(f); });
    return Promise.race([Promise.all(files.map(one)), new Promise(res => setTimeout(res, 8000))]);
  }
  /** load a test's questions paper by paper, saying how far it got (P2-76: 'Preparing your mock · 14 of 24 papers'), then its figure files.
      Rejects when a paper file does not arrive (P1-59). say(k, n) is called for tests that span more than one paper. */
  async function prepare(qids, say) {
    const D = DATA.D, papers = U.uniq(qids.map(id => D.qById[id] && D.qById[id].paper).filter(Boolean));
    let done = 0;
    if (say && papers.length > 1) say(0, papers.length);
    await Promise.all(papers.map(p => DATA.paper(p).then(r => { done++; if (say && papers.length > 1) say(done, papers.length); return r; })));
    const qs = await DATA.questions(qids);
    await figures(qs);
    return qs;
  }
  /** start a test; with a live test, only after the learner chose to replace it. The questions are loaded first (P1-59): when their files do
      not arrive nothing is started or saved, and the hub says so. While they load, the button says how far it got (P2-76). Full-length
      sittings open on the briefing card with the clock stopped and save answers the GATE way (D7). Resolves true when the runner opens. */
  let starting = false;
  async function begin(test, from) {
    if (!test || !test.qids || !test.qids.length) { UI.toast('No questions match.', 'bad'); return false; }
    if (starting) return false;
    const lv = live();
    if (lv && lv.id) {
      const v = await confirmReplace(lv);
      if (v !== 'discard') { if (v === 'keep') GA.router.go('/test/run/' + lv.id); return false; }
    }
    starting = true;
    const lab = from ? U.$$('span', from).pop() : null, was = lab ? lab.textContent : '';
    const noun = test.kind === 'mock' ? 'mock' : test.kind === 'paper' ? 'paper' : 'test';
    let said = false;
    const say = (k, n) => { const t = `Preparing your ${noun} · ${k} of ${n} papers`; if (lab && lab.isConnected) lab.textContent = t; if (!said && UI.say) { said = true; UI.say(`Preparing your ${noun}`); } };
    if (from) { from.setAttribute('aria-busy', 'true'); from.disabled = true; }
    try { await prepare(test.qids, say); }
    catch (err) {
      UI.toast(`The questions for this test did not load${typeof navigator !== 'undefined' && navigator.onLine === false ? ' (you are offline)' : ''}. Nothing was started; try again in a moment.`, 'bad');
      return false;
    } finally {
      starting = false;
      if (from && from.isConnected) { from.removeAttribute('aria-busy'); from.disabled = false; if (lab) lab.textContent = was; }
    }
    const id = 't' + Date.now().toString(36), cbt = test.icai ? false : TG.cbtDefault ? TG.cbtDefault(test.kind) : false;
    GA.store.update(s => { s.live = { id, ...test, startedAt: Date.now(), elapsedMs: 0, pausedMs: 0, cur: 0, responses: {}, visited: {}, marked: {}, times: {}, cbt, clockAt: cbt || (test.icai && test.kind === 'paper') ? null : Date.now() }; }, 'live');   // an ICAI paper opens on its briefing too
    GA.router.go('/test/run/' + id);
    return true;
  }
  /** a full-length sitting whose clock has not started opens on its briefing (records from before the briefing existed never do) */
  const needsBrief = lv => isFullKind(lv.kind) && !lv.clockAt && !(lv.elapsedMs > 0);

  /* ------------------------------------------------------------ hub */
  /** the season around the hub (P1-61): the exam (GA.stats.exam), its season and phase, and on exam day nextStep's warm-up step */
  function seasonOf(st, D, today) {
    const ST = GA.stats || {};
    const E = typeof ST.exam === 'function' ? safe(() => ST.exam(st, D.exam, today), null) : null;
    const season = typeof ST.season === 'function' ? safe(() => ST.season(st, D.exam, today), 'normal') : 'normal';
    const phase = typeof ST.phaseOf === 'function' && E && typeof E.daysLeft === 'number' ? safe(() => ST.phaseOf(E.daysLeft), null) : null;
    const step = season === 'day' && typeof ST.nextStep === 'function' ? safe(() => ST.nextStep(st, D, { kind: 'any', scope: 'all', today }), null) : null;
    return { E, season, phase, day: step && step.rule === 'day' ? step : null };
  }
  /** the mock's subject weights: GA.insights' like-for-like marks a paper (P1-03); testgen's own copy of the formula otherwise (tested equal) */
  function mockWeights() {
    const I = GA.insights && GA.insights.get ? safe(() => GA.insights.get(), null) : null;
    if (!I || !Array.isArray(I.subjects)) return undefined;
    const w = {};
    I.subjects.forEach(s => { if (typeof s.perPaper === 'number' && s.perPaper > 0) w[s.id] = s.perPaper; });
    return Object.keys(w).length ? w : undefined;
  }
  /** the cobalt half (D21): the paper's blueprint from TG.blueprint (the mock follows it) */
  function blueprintHtml(bp) {
    if (!bp) return '';
    const ga = bp.blocks.filter(b => b.sec === 'GA'), cs1 = bp.blocks.find(b => b.sec !== 'GA' && b.marks === 1), cs2 = bp.blocks.find(b => b.sec !== 'GA' && b.marks === 2);
    const mix = b => ['MCQ', 'MSQ', 'NAT'].filter(t => b.mix && b.mix[t]).map(t => `<span>${b.mix[t]} ${t}</span>`).join(' · ');
    const yrs = bp.since && bp.until ? (bp.since === bp.until ? `${bp.since}` : `${bp.since}–${bp.until}`) : '';
    const tile = (n, what, small) => `<div role="listitem"><b class="num">${n}</b><span>${what}</span><small>${small}</small></div>`;
    return `<div class="th-cap"><span>A full paper, block by block</span>${yrs ? `<span class="mono">as in ${esc(yrs)}</span>` : ''}</div>
      <div class="th-bpx" role="list" aria-label="Blueprint of a full paper">${tile(ga.reduce((a, b) => a + b.n, 0), 'aptitude', ga.map(b => `${b.n} × ${b.marks}`).join(' + ') + ' marks')}${cs1 ? tile(cs1.n, 'technical · 1 mark', mix(cs1)) : ''}${cs2 ? tile(cs2.n, 'technical · 2 marks', mix(cs2)) : ''}</div>
      <p class="th-bpf">${bp.questions} questions · ${bp.marks} marks · ${hours(bp.minutes)} · −⅓ or −⅔ for a wrong MCQ, nothing negative for MSQ and NAT</p>`;
  }
  /** phones draw charts at their own width, so the labels keep about 10 px (P2-33) */
  const narrow = () => !!(g.matchMedia && g.matchMedia('(max-width: 700px)').matches);
  /** a trend of scored full-length sittings (never a short test, P2-34) on its surface tile inside a cobalt half. The chart itself is drawn by
      drawTrend() once the tile is on the page, at the tile's own width (P2-33); without GA.charts.fit it is drawn here at a fixed size. */
  const trendPts = fulls => fulls.slice(-8).map(x => ({ x: dayTxt(x.t.finished), y: Math.max(0, x.m.pct || 0), tip: `${x.t.title}: ${scoreTxt(x.m)}` }));
  const trendAria = n => `Score of your last ${n} full-length sittings, as a share of the marks`;
  function trendTile(fulls, cap, curId) {
    const pts = fulls.slice(-8), last = pts[pts.length - 1];
    const best = fulls.reduce((m, x) => (!m || x.m.pct > m.m.pct ? x : m), null);
    const me = curId ? pts.find(x => x.t.id === curId) || last : last;
    const chart = C.fit ? '' : C.line(trendPts(fulls), narrow() ? { w: 320, h: 130, yMax: 1, aria: trendAria(pts.length) } : { w: 420, h: curId ? 190 : 150, yMax: 1, aria: trendAria(pts.length) });
    return `<div class="th-cap"><span>${cap}</span><span class="mono">last ${pts.length}</span></div>
      ${curId ? '' : `<div class="th-big"><b class="num">${pctTxt(me.m)}</b><span>${best === me ? 'latest, and your best' : `latest · best ${pctTxt(best.m)}`}</span></div>`}
      <div class="th-chart" data-trend="${curId ? 'tall' : ''}">${chart}</div>`;
  }
  function drawTrend(root, fulls) {
    const host = U.$('.th-chart[data-trend]', root);
    if (!host || !C.fit || fulls.length < 2) return;
    const pts = trendPts(fulls), tall = host.dataset.trend === 'tall';
    C.fit(host, w => C.line(pts, { w, h: narrow() ? 150 : tall ? 200 : 160, px: true, yMax: 1, aria: trendAria(pts.length) }), { min: 260 });
  }
  /** the subject card's topic options with their usable counts (P2-31): a topic with none is disabled, never a silently smaller test */
  function topicOptions(D, subject) {
    const tc = TG.topicCounts ? TG.topicCounts(D, subject) : null;
    if (!tc) { const sj = D.subjectById[subject]; return '<option value="">Whole subject</option>' + sj.topics.map(t => `<option value="${t.id}">${esc(t.name)}</option>`).join(''); }
    return `<option value="">Whole subject (${U.nf(tc.whole)})</option>` + tc.topics.map(t => `<option value="${t.id}"${t.n ? '' : ' disabled'}>${esc(t.name)} (${t.n ? U.nf(t.n) : 'none yet'})</option>`).join('');
  }

  /* ------------------------------------------------------------ the empty ICAI bank (PassBook fork)
     While the build ships no question, the hub shows one honest empty state and starts nothing (?new=mock / diagnostic / warmup included). The
     ICAI bank plugs in here through D.questions / D.papers and core/testgen.js (TG.mock / diagnostic / subject / fromPaper / blueprint build a
     test {kind, title, qids, limitMs, sections}; GA.scoring marks it). The ICAI blueprint (descriptive sub-parts, the 30-mark MCQ part of
     Papers 5 and 6, no negative marking) belongs to that job, not to TG's GATE defaults. */
  const emptyBank = D => (GA.pyqLib && GA.pyqLib.isEmpty ? GA.pyqLib.isEmpty(D) : !(D && D.questions && D.questions.length));
  function emptyHub(out, D, st, lv) {
    const P = GA.pyqLib, step = P && P.emptyStep ? P.emptyStep(st, D) : { href: '#/syllabus', label: 'Go to Learn', title: '' };
    try { if (/[?&]new=/.test(location.hash)) history.replaceState(history.state, '', '#/test'); } catch (e) { /* file:// quirks */ }
    // a live test from an older build can still be resumed; it then holds the screen's one coral
    const resume = lv ? `<section class="pr-panel th-resume" aria-label="Test in progress"><div class="th-ri">${icon('timer')}</div><div class="grow"><div class="pr-sub">In progress</div><b>${esc(lv.title)}</b><div class="th-rm"><span><b>${answeredIn(lv)}</b> of ${lv.qids.length} answered</span></div></div><div class="pr-acts"><a class="btn pop" href="#/test/run/${lv.id}">${icon('play')}<span>Resume</span></a></div></section>` : '';
    const cta = lv ? '' : `<a class="btn pop" href="${esc(step.href)}">${icon('book')}<span>${esc(step.label)}${step.title && step.label === 'Next lesson' ? ': ' + esc(step.title) : ''}</span></a>`;
    const card = UI.bankEmptyCard ? UI.bankEmptyCard({ cta, peak: lv ? undefined : { gaze: 'down' } })
      : UI.empty('target', 'ICAI past papers, RTPs and MTPs are being added', 'Until they are, practise with the self-checks and flashcards in each lesson.', cta);
    const hist = (st.tests || []).slice().sort((a, b) => b.finished - a.finished).slice(0, 5);
    const attempts = hist.length ? `<section aria-labelledby="th-h-att"><div class="pr-sec-h"><div><h2 id="th-h-att">Your attempts</h2><p>${U.plural((st.tests || []).length, 'finished test')}</p></div></div>
        <div class="pr-panel th-att"><ul class="th-oldl" role="list">${hist.map(t => `<li><span><b><a class="th-tl" href="#/test/result/${esc(t.id)}">${esc(t.title || 'Test')}</a></b><small>${esc(dayTxt(t.finished))}</small></span></li>`).join('')}</ul></div></section>` : '';
    out.innerHTML = `<div class="th pr-page th-empty">
      <header class="pr-head"><div class="pr-ht"><h1>Tests &amp; mocks</h1><p>Timed sittings of ICAI past papers, RTPs and MTPs, marked against ICAI's suggested answers.</p></div></header>
      ${resume}<section class="pq-empty">${card}</section>${attempts}</div>`;
  }

  /* ------------------------------------------------------------ the ICAI hub (docs/ICAI_BANK.md §7) */
  const icaiBank = D => !!(TG.icaiOf && TG.icaiOf(D));
  /** an ICAI section key ('II', 'fm:I') as its name: 'Part II · Descriptive', '6A FM · Part I · MCQs' */
  const ICAI_SEC = { I: 'Part I · MCQs', II: 'Part II · Descriptive' }, ICAI_SUB = { fm: '6A FM', sm: '6B SM' };
  const icaiSecName = k => { const m = /^(?:(fm|sm):)?(I|II)$/.exec(String(k)); return m ? (m[1] ? ICAI_SUB[m[1]] + ' · ' : '') + ICAI_SEC[m[2]] : String(k); };
  const icaiSecShort = k => { const m = /^(?:(fm|sm):)?(I|II)$/.exec(String(k)); return m ? (m[1] ? ICAI_SUB[m[1]] + ' ' : '') + 'Part ' + m[2] : String(k); };
  /** a paper's choice rule in words (GA.testgen.choiceWords): 'Question 1 is compulsory; answer any 4 of Questions 2–6; in Question 1, answer any 7 of (a)–(h)' */
  const choiceWords = c => TG.choiceWords(c);
  /** escaped text whose dashes never end a line ('(a)–(h)', 'Questions 2–6' stay whole) */
  const keepDash = t => esc(t).replace(/–/g, '\u2060–\u2060');
  /** the choice lines of a paper (P6: per section) */
  const choiceLines = p => (p && p.choice ? Object.entries(p.choice).map(([k, c]) => (k === 'all' ? '' : ICAI_SUB[k] + ': ') + choiceWords(c)).filter(x => x.replace(/^[^:]*: /, '')) : []);
  /** the sittable documents in the order the hub offers them: newest attempt first, exam papers before MTPs, the focus subject's paper first */
  function sittables(D, st) {
    const focus = st && st.profile && st.profile.focus;
    return D.papers.filter(p => p.sittable).sort((a, b) => ((b.subjects || []).includes(focus) ? 1 : 0) - ((a.subjects || []).includes(focus) ? 1 : 0)
      || b.year - a.year || Math.floor(b.set / 10) - Math.floor(a.set / 10) || (a.kind === 'pyq' ? -1 : b.kind === 'pyq' ? 1 : 0) || a.set - b.set);
  }
  function icaiHub(out, ctx, D, st, lv) {
    const play = icon('play'), today = U.today();
    const hist = st.tests.slice().sort((a, b) => b.finished - a.finished);
    const sat = id => st.tests.some(t => t.paper === id && !t.pendingMarks);
    const can = sittables(D, st), next = can.find(p => !sat(p.id)) || can[0] || null;
    const bestOf = p => st.tests.filter(t => t.paper === p.id).map(sumOf).filter(m => m.scored).sort((a, b) => b.pct - a.pct)[0] || null;
    const rtps = D.papers.filter(p => p.kind === 'rtp').sort((a, b) => b.year - a.year || b.set - a.set);
    const firstOf = p => { const q = D.questions.filter(x => x.paper === p.id).sort((a, b) => (a.ord || 0) - (b.ord || 0))[0]; return q ? '#/q/' + encodeURIComponent(q.id) : '#/pyq?paper=' + p.id; };
    const qsOf = p => D.questions.filter(x => x.paper === p.id);
    // the cobalt half: an ICAI paper, part by part (from the next paper to sit, else ICAI's pattern in words)
    const patt = p => {
      const qs = p ? qsOf(p) : [], m1 = qs.filter(q => q.type === 'MCQ').reduce((a, q) => a + (q.marks || 0), 0), max = p ? TG.icaiMax(qs, p) : 0;
      const tile = (n, what, small) => `<div role="listitem"><b class="num">${n}</b><span>${what}</span><small>${small}</small></div>`;
      const cl = p ? choiceLines(p) : [];
      return `<div class="th-cap"><span>${p ? esc(p.title || p.label) : 'An ICAI paper'}</span><span class="mono">${p ? `${hours(p.minutes || 180)}` : '3 hours'}</span></div>
        <div class="th-bpx" role="list" aria-label="The paper, part by part">${tile(p ? m1 : 30, 'Part I · MCQs', 'case scenarios and stand-alone, 1 or 2 marks each')}${tile(p ? max - m1 : 70, 'Part II · Descriptive', cl.length ? keepDash(cl.join(' · ')) : 'ICAI’s choices honoured')}</div>
        <p class="th-bpf">${p ? `${U.plural(max, 'mark')} · ` : '100 marks a paper (P6: 50 + 50) · '}no negative marking · MCQs marked against ICAI’s key, descriptive answers marked by you against ICAI’s</p>`;
    };
    let hero = '';
    if (!lv) {
      const box = o => `<section class="th-hero" aria-labelledby="th-hh"><div class="th-hl"><p class="th-eye"><i class="dot" aria-hidden="true"></i><span>${o.eyebrow}</span></p><h2 id="th-hh">${o.title}</h2><p class="th-hm">${o.meta}</p>${o.note || ''}<div class="th-cta">${o.cta}${o.alt || ''}</div></div><div class="th-hr">${patt(o.p)}</div></section>`;
      if (next) {
        const b = bestOf(next);
        hero = box({ p: next, eyebrow: sat(next.id) ? 'Sit it again' : next.kind === 'mtp' ? 'Your next mock test paper' : 'Your next past paper', title: esc(next.title || next.label),
          meta: `${U.plural(TG.icaiMax(qsOf(next), next), 'mark')} · ${hours(next.minutes || 180)} · ICAI’s own questions, in ICAI’s order`,
          note: `<p class="th-hn">${b ? `Your best here: <b>${scoreTxt(b)}</b> (${pctTxt(b)}). ` : ''}MCQs are marked at once; after Submit you mark each descriptive answer against ICAI’s, then see your score.</p>`,
          cta: `<button class="btn pop lg" type="button" data-sit="${esc(next.id)}">${play}<span>Sit ${esc(next.label)}</span></button>` });
      } else if (rtps.length) {
        const r = rtps[0];
        hero = box({ p: null, eyebrow: 'No MTP or past paper in the bank yet', title: `Practise ${esc(r.title || r.label)}`,
          meta: `${U.plural(qsOf(r).length, 'ICAI item')} in ICAI’s order, untimed · RTPs print no marks, so they are practised, not sat`,
          note: '<p class="th-hn">ICAI’s MTPs and past papers are being added; each one can then be sat as a timed 3-hour paper here.</p>',
          cta: `<a class="btn pop lg" href="${esc(firstOf(r))}">${play}<span>Start ${esc(r.label)}</span></a>` });
      }
    }
    const lvNote = lv ? (needsBrief(lv) ? '<span>Not started: the clock waits for you</span>' : `<span><b>${U.clock(Math.max(0, lv.limitMs - lv.elapsedMs))}</b> left</span>`) : '';
    const resume = lv ? `<section class="pr-panel th-resume" aria-label="Test in progress"><div class="th-ri">${icon('timer')}</div><div class="grow"><div class="pr-sub">In progress</div><b>${esc(lv.title)}</b><div class="th-rm"><span><b>${answeredIn(lv)}</b> of ${lv.qids.length} answered</span>${lvNote}</div>${UI.bar(lv.qids.length ? answeredIn(lv) / lv.qids.length : 0, 'thin')}</div><div class="pr-acts"><a class="btn pop" href="#/test/run/${lv.id}">${play}<span>Resume</span></a><button class="btn ghost" type="button" id="abandon">Discard</button></div></section>` : '';
    const waiting = hist.filter(t => t.icai && t.pendingMarks);
    const toMark = waiting.length ? `<section class="pr-panel th-resume" aria-label="Answers to mark"><div class="th-ri">${icon('edit')}</div><div class="grow"><div class="pr-sub">Waiting for your marks</div><b>${esc(waiting[0].title)}</b><div class="th-rm"><span><b>${waiting[0].pendingMarks}</b> descriptive ${waiting[0].pendingMarks === 1 ? 'answer' : 'answers'} to mark against ICAI’s</span></div></div><div class="pr-acts"><a class="btn${lv || hero ? '' : ' pop'}" href="#/test/mark/${esc(waiting[0].id)}">${icon('edit')}<span>Mark them</span></a></div></section>` : '';
    // every ICAI document by paper: sit the MTPs and past papers, practise the RTPs in order
    const codes = U.uniq(D.papers.map(p => p.paperCode));
    const docRow = p => {
      const b = bestOf(p), qs = qsOf(p), max = TG.icaiMax(qs, p), subs = U.uniq(qs.map(q => q.subject));
      const sitB = p.sittable ? (subs.length > 1 ? `<button type="button" class="btn sm" data-sit="${esc(p.id)}">${play}<span>Sit 6A + 6B</span></button>${subs.map(sj => `<button type="button" class="btn sm ghost" data-sit="${esc(p.id)}" data-sub="${sj}">${esc(sj === 'fm' ? '6A only' : '6B only')}</button>`).join('')}`
        : `<button type="button" class="btn sm" data-sit="${esc(p.id)}">${play}<span>Sit it</span></button>`) : '';
      // a document that cannot be sat says why; its marks are shown only when sittable (without ICAI's printed choice of questions the items' sum,
      // 114 for a 100-mark paper, is not the paper's maximum)
      const why = p.sittable ? '' : p.kind === 'rtp' ? 'an RTP prints no marks: practise it' : p.answers === 'unpublished' ? 'ICAI has not published the answers yet' : p.answers === 'unavailable' ? 'ICAI’s answers to this paper are no longer available online' : 'ICAI’s choice of questions is not printed: practise it';
      return `<li><span><b>${esc(p.label)}</b><small>${U.plural(qs.length, 'item')}${max && p.sittable ? ` · ${U.plural(max, 'mark')} · ${hours(p.minutes || 180)}` : ''}${b ? ` · your best ${scoreTxt(b)}` : ''}${why ? ' · ' + esc(why) : ''}</small></span><span class="th-docb">${sitB}<a class="th-link" href="${esc(firstOf(p))}">Practise in order</a></span></li>`;
    };
    const docs = `<section aria-labelledby="th-h-pp"><div class="pr-sec-h"><div><h2 id="th-h-pp">ICAI’s documents</h2><p>${U.plural(D.papers.length, 'document')} in the bank · MTPs and past papers can be sat on ICAI’s clock; every document can be practised untimed in ICAI’s order</p></div></div>
        <div class="th-icd">${codes.map(c => { const ps = D.papers.filter(p => p.paperCode === c).sort((a, b) => b.year - a.year || b.set - a.set || (a.kind === 'pyq' ? -1 : 1));
          return `<div class="pr-panel th-icp"><div class="th-yh"><b>${esc(c.replace(/^P/, 'Paper '))}</b><span>${esc(ps[0] && D.subjectById[ps[0].subjects[0]] ? (ps[0].subjects.length > 1 ? 'FM & SM' : D.subjectById[ps[0].subjects[0]].name) : '')}</span></div><ul class="th-oldl" role="list">${ps.map(docRow).join('')}</ul></div>`; }).join('')}</div></section>`;
    // the MCQ drill: a paper or a chapter, 10 / 20 / 30, auto-marked; descriptive items optional (self-marked after Submit)
    const sub0 = D.subjectById[ctx.query.subject] ? ctx.query.subject : (D.subjects.find(s2 => D.questions.some(q => q.subject === s2.id && q.type === 'MCQ' && q.hasKey)) || D.subjects[0]).id;
    const chOpts = sj => { const s2 = D.subjectById[sj]; const n = t => D.questions.filter(q => q.topic === t && q.type === 'MCQ' && q.hasKey && !q.oos).length;
      return `<option value="">Whole paper (${U.nf(D.questions.filter(q => q.subject === sj && q.type === 'MCQ' && q.hasKey && !q.oos).length)} MCQs)</option>` + s2.topics.map(t => `<option value="${t.id}"${n(t.id) ? '' : ' disabled'}>${esc(t.name)} (${n(t.id) ? U.nf(n(t.id)) : 'none yet'})</option>`).join(''); };
    const drill = `<div class="pr-panel th-card"><div class="th-ch"><div class="th-ic">${icon('layers')}</div><h2>MCQ drill</h2></div><p>ICAI’s own MCQs from one paper or chapter, on the clock (1.8 minutes a mark), marked against ICAI’s key. No negative marking.</p>
        <div class="th-form"><div class="field"><label for="s-sub">Paper</label><select class="input" id="s-sub">${D.subjects.map(s2 => `<option value="${s2.id}"${s2.id === sub0 ? ' selected' : ''}>${esc((s2.paper ? s2.paper.replace(/^P/, 'Paper ') + ' · ' : '') + s2.name)}</option>`).join('')}</select></div>
        <div class="field"><label for="s-top">Chapter (optional)</label><select class="input" id="s-top">${chOpts(sub0)}</select></div>
        <div class="field"><span class="th-lab" id="s-n-l">Questions</span><div class="seg" id="s-n" role="group" aria-labelledby="s-n-l">${[10, 20, 30].map(k => `<button type="button" data-n="${k}" class="${k === 10 ? 'on' : ''}" aria-pressed="${k === 10}">${k}</button>`).join('')}</div></div>
        <div class="field row"><label class="switch"><input type="checkbox" id="s-desc"><span></span></label><label for="s-desc">Add descriptive questions (you mark them after Submit)</label></div></div>
        <p class="th-meta" id="s-pool" aria-live="polite"></p>
        <button class="btn" type="button" id="t-sub">${play}<span>Start the drill</span></button></div>`;
    const how = `<div class="pr-panel th-card"><div class="th-ch"><div class="th-ic">${icon('info')}</div><h2>How a sitting works</h2></div>
        <p><b>Part I</b>: MCQs, marked against ICAI’s key the moment you submit. <b>Part II</b>: write in the box, or on paper and tick “I answered this on paper”.</p>
        <p>After Submit you see each descriptive answer next to ICAI’s and give yourself marks; the paper’s choices (“answer any four of the rest”) are applied, then your score.</p>
        <p>Full marks count as Got it, some marks as Partly, none as Missed: Partly and Missed go to your error notebook and come back for revision.</p></div>`;
    const row = t => { const m = sumOf(t), kind = esc(KIND[t.kind] || 'Test'); return `<tr><td><a class="th-tl" href="#/test/${t.icai && t.pendingMarks ? 'mark' : 'result'}/${t.id}"><b>${esc(t.title)}</b></a><small class="sp">${kind}${HAS_DAY.test(t.title || '') ? '' : ' · ' + dayTxt(t.finished)}</small></td><td class="hp">${kind}</td><td class="nw hp">${dateTxt(t.finished)}</td>${t.icai && t.pendingMarks ? `<td class="r nw muted">${U.plural(t.pendingMarks, 'answer')} to mark</td><td class="r hp">—</td>` : m.scored ? `<td class="r nw"><b>${fm(m.score)}</b> / ${m.max}</td><td class="r hp">${m.accuracy != null ? Math.round(100 * m.accuracy) + '%' : '—'}</td>` : '<td class="r nw muted">Not scored</td><td class="r hp">—</td>'}<td class="r hp">${hm((t.usedMs || t.finished - t.started) / 60000)}</td></tr>`; };
    const thead = '<thead><tr><th scope="col">Test</th><th class="hp" scope="col">Kind</th><th class="hp" scope="col">When</th><th class="r" scope="col">Score</th><th class="r hp" scope="col">Accuracy</th><th class="r hp" scope="col">Time</th></tr></thead>';
    const attempts = hist.length ? `<section aria-labelledby="th-h-att"><div class="pr-sec-h"><div><h2 id="th-h-att">Your attempts</h2><p>${U.plural(hist.length, 'finished test')}</p></div></div>
        <div class="pr-panel th-att"><div class="tw"><table class="t">${thead}<tbody>${hist.slice(0, 5).map(row).join('')}</tbody></table></div>
        ${hist.length > 5 ? `<details class="th-more"><summary>All ${U.plural(hist.length, 'attempt')}${icon('chev-d')}</summary><div class="tw"><table class="t">${thead}<tbody>${hist.slice(5).map(row).join('')}</tbody></table></div></details>` : ''}</div></section>` : '';
    out.innerHTML = `<div class="th pr-page th-icai">
      <header class="pr-head"><div class="pr-ht"><h1>Tests &amp; mocks</h1><p>${U.plural(can.length, 'ICAI paper')} to sit (MTPs and past papers) · MCQ drills from ${U.nf(D.questions.filter(q => q.type === 'MCQ' && q.hasKey).length)} ICAI MCQs · no negative marking, as in the exam</p></div></header>
      ${resume}${toMark}${hero}
      <section class="th-row" aria-label="Build a test">${drill}${how}</section>
      ${docs}
      ${attempts}
    </div>`;
    const $ = sel => U.$(sel, out);
    let n = 10, pending = null;
    const paint = () => {
      const subject = $('#s-sub').value, topic = $('#s-top').value || null, desc = $('#s-desc').checked;
      pending = TG.icaiDrill(D, { subject, topic, n, seed: Date.now() % 100000, state: st, desc });
      const k = pending.qids.length;
      $('#s-pool').textContent = k ? `${U.plural(k, desc ? 'ICAI item' : 'ICAI MCQ')} · ${Math.round(pending.limitMs / 60000)} minutes` : 'Nothing here yet: pick another paper or chapter.';
      const bt = $('#t-sub'); bt.disabled = !k;
      U.$$('span', bt).pop().textContent = k ? `Start · ${U.plural(k, 'question')}` : 'Start the drill';
    };
    $('#s-sub').addEventListener('change', () => { $('#s-top').innerHTML = chOpts($('#s-sub').value); paint(); });
    $('#s-top').addEventListener('change', paint); $('#s-desc').addEventListener('change', paint);
    U.on(out, 'click', '#s-n [data-n]', (e, b) => { n = +b.dataset.n; U.$$('#s-n button', out).forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); }); paint(); });
    roving($('#s-n'));
    paint();
    $('#t-sub').addEventListener('click', e => { if (pending && pending.qids.length) begin(pending, e.currentTarget); });
    U.on(out, 'click', '[data-sit]', (e, b) => begin(TG.icaiPaper(D, b.dataset.sit, { sub: b.dataset.sub || null }), b));
    const ab = $('#abandon'); if (ab) ab.addEventListener('click', async () => { if (await UI.confirm('The answers you have entered in this test will be lost.', { ok: 'Discard test', danger: true })) { GA.store.update(s => { s.live = null; }, 'live'); GA.router.resolve(); } });
    // links: ?new=paper&paper=<id>[&sub=fm] sits a document; ?new=mock sits the next paper (or resumes); ?new=filtered tests the bank's filter
    const autostart = () => { try { history.replaceState(history.state, '', '#/test'); } catch (e) { /* file:// quirks */ } };
    if (ctx.query.new === 'paper' && D.paperById[ctx.query.paper]) { autostart(); begin(TG.icaiPaper(D, ctx.query.paper, { sub: ctx.query.sub || null }), U.$(`[data-sit="${ctx.query.paper}"]`, out)); }
    if (ctx.query.new === 'mock') { autostart(); if (lv) GA.router.go('/test/run/' + lv.id); else if (next) begin(TG.icaiPaper(D, next.id), U.$(`[data-sit="${next.id}"]`, out)); }
    // the warm-up and the diagnostic of the shared next steps: 10 ICAI MCQs across the papers, unseen first
    if (ctx.query.new === 'warmup' || ctx.query.new === 'diagnostic') { autostart(); if (lv) GA.router.go('/test/run/' + lv.id); else { const w = TG.icaiDrill(D, { n: 10, seed: Date.now() % 100000, state: st }); if (w.qids.length) { w.title = (ctx.query.new === 'warmup' ? 'Warm-up' : 'Quick check') + ` · ${U.plural(w.qids.length, 'ICAI MCQ')}`; begin(w, $('#t-sub')); } } }
    if (ctx.query.new === 'filtered') {
      autostart();
      const q = GA.queue && GA.queue.get(), P = GA.pyqLib;
      const ids = q && q.ids ? q.ids.filter(id => D.qById[id] && P && P.scorable(D.qById[id])) : [];
      if (ids.length >= 3) {
        let started = false;
        const away = () => { const ov = UI.overlay, back = () => { try { history.back(); } catch (e) { GA.router.go('/pyq'); } }; if (ov && ov.busy && ov.busy() && ov.after) ov.after(back); else setTimeout(back, 0); };
        UI.modal({ title: 'Make a test from your filter', body: `<p class="muted" style="margin:0 0 12px">${U.nf(ids.length)} ICAI items in your filter can be marked (MCQs by ICAI’s key, descriptive answers by you after Submit). Choose how many to include (a random pick, 1.8 minutes a mark).</p><div class="field"><label for="fq-n">Number of questions</label><input class="input" id="fq-n" type="number" min="3" max="${Math.min(60, ids.length)}" value="${Math.min(15, ids.length)}"></div>`,
          onclose: () => { if (!started) away(); },
          actions: [{ label: 'Cancel' }, { label: 'Start', kind: 'pop', onclick: b => { started = true; const k = U.clamp(+U.$('#fq-n', b).value || 10, 3, Math.min(60, ids.length)); const pick = U.shuffle(ids, Math.random).slice(0, k).sort((a, b2) => D.questions.indexOf(D.qById[a]) - D.questions.indexOf(D.qById[b2]));
            const t = TG.custom(D, pick, `Filtered test · ${pick.length} ICAI items`); t.icai = true; t.limitMs = Math.round(pick.reduce((a, id) => a + TG.icaiMs(D.qById[id]), 0)); setTimeout(() => begin(t), 30); } }] });
      }
    }
  }

  GA.views.testhub = {
    enter(ctx, out) {
      const D = DATA.D, S = GA.store, st = S.state, today = U.today();
      GA.shell.crumbs([['Tests', '#/test']]);                       // the tab's label (P2-12); the H1 stays 'Tests & mocks'
      const lv = st.live && st.live.id ? st.live : null;
      if (emptyBank(D)) { emptyHub(out, D, st, lv); return; }      // no ICAI bank yet: nothing can be generated, so no test is ever created here
      if (icaiBank(D)) { icaiHub(out, ctx, D, st, lv); return; }   // the ICAI bank: its papers, drills and self-marking (docs/ICAI_BANK.md §7)
      const sea = seasonOf(st, D, today);
      const offer = TG.offer ? TG.offer(st, { season: sea.season, phase: sea.phase, cardsSeen: !!(sea.day && sea.day.kind === 'cards') }) : { kind: lv ? 'resume' : st.tests.length ? 'mock' : 'diagnostic' };
      const papers = D.papers.slice().sort((a, b) => b.year - a.year || a.set - b.set);
      const hist = st.tests.slice().sort((a, b) => b.finished - a.finished);
      const fulls = SC.fullSittings ? SC.fullSittings(st.tests, D) : [];
      const lastFull = fulls.length ? fulls[fulls.length - 1] : null;
      const keyedPapers = papers.filter(p => p.n && p.keyed === p.n).length;
      const usable = o => D.questions.filter(TG.usableWith(D, o));
      const unseenOf = list => list.filter(q => !(st.q[q.id] && (st.q[q.id].n || st.q[q.id].seen))).length;
      const pool = usable({ includeLegacy: false });
      const quiet = sea.season === 'final' || sea.season === 'eve' || sea.season === 'day' || sea.phase === 'mocks';
      const until = U.untilExam && sea.E ? U.untilExam(sea.E) : '';
      const assumedNote = sea.E && sea.E.basis === 'assumed' && typeof sea.E.daysLeft === 'number' && sea.E.daysLeft <= 1
        ? `<p class="th-hn">${esc(sea.E.paper && sea.E.paper.name ? sea.E.paper.name : sea.E.label || 'The exam')} is ${sea.E.daysLeft === 0 ? 'today' : 'tomorrow'}. Is your paper ${sea.E.daysLeft === 0 ? 'today' : 'tomorrow'}? <a class="th-link" href="#/plan?set=exam">Set your date</a></p>` : '';
      const nextMock = TG.mockTitle ? TG.mockTitle({ state: st }).replace(/ · .*$/, '') : 'Full mock';
      const diag = safe(() => TG.diagnostic(D, { seed: 11 }), { qids: [], limitMs: 0 });
      const dQ = diag.qids.map(id => D.qById[id]).filter(Boolean), dMarks = dQ.reduce((a, q) => a + (q.marks || 0), 0), dMin = Math.round(diag.limitMs / 60000);
      const dGA = dQ.filter(q => q.section === 'GA').length, dCS = U.uniq(dQ.filter(q => q.section !== 'GA').map(q => q.subject)).length;
      const warm = TG.warmup ? safe(() => TG.warmup(D, { seed: 7, state: st }), null) : null;
      const bp = TG.blueprint ? safe(() => TG.blueprint(D), null) : null;
      const right = fulls.length > 1 ? trendTile(fulls, 'Your full-length sittings') : blueprintHtml(bp);
      const play = icon('play');
      // the start-here hero (P1-30, D21): one coral; not rendered while a test is live (Resume is then the only coral, P0-08 rule 1)
      let hero = '';
      const box = o => `<section class="th-hero" aria-labelledby="th-hh"><div class="th-hl"><p class="th-eye"><i class="dot" aria-hidden="true"></i><span>${o.eyebrow}</span></p><h2 id="th-hh">${o.title}</h2><p class="th-hm">${o.meta}</p>${o.note || ''}<div class="th-cta">${o.cta}${o.alt || ''}</div></div><div class="th-hr">${right}</div></section>`;
      if (offer.kind === 'diagnostic') {
        hero = box({ eyebrow: 'New here? Start with a short check', title: 'The diagnostic',
          meta: `${U.plural(dQ.length, 'real past-paper question')} · ${U.plural(dMarks, 'mark')} · ${dMin}‑minute limit · see where you stand`,
          note: `<p class="th-hn">${dGA ? U.plural(dGA, 'short question') + ' and ' : ''}one question from each of ${U.plural(dCS, 'subject')}, marked against the official answers. It shows where you stand; your lessons keep their order.</p>`,
          cta: `<button class="btn pop lg" type="button" id="t-diag">${play}<span>Start the diagnostic</span></button>` });
      } else if (offer.kind === 'mock') {
        const eyebrow = sea.season === 'final' ? `${esc(until || 'The final stretch')} · final stretch` : sea.phase === 'mocks' && until ? `${esc(until)} · time for full mocks` : 'Your next full mock';
        hero = box({ eyebrow, title: esc(nextMock),
          meta: bp ? `${U.plural(bp.questions, 'question')} · ${U.plural(bp.marks, 'mark')} · ${hours(bp.minutes)} · built like the papers since ${bp.since || 2021}` : 'Built like the real paper',
          note: (lastFull ? `<p class="th-hn">Last full-length sitting: <b>${scoreTxt(lastFull.m)}</b> (${pctTxt(lastFull.m)}) · ${esc(datedTitle(lastFull.t))}</p>` : '<p class="th-hn">Your first full-length sitting: the timer, the palette and the marking, start to finish.</p>') + assumedNote,
          cta: `<button class="btn pop lg" type="button" id="t-mock">${play}<span>Start ${esc(nextMock.replace(/^Mock\b/, 'mock'))}</span></button>`,
          alt: quiet ? '' : `<button class="th-link" type="button" id="t-diag">or the ${dQ.length}-question diagnostic · ${dMin} min</button>` });
      } else if (offer.kind === 'warmup' || offer.kind === 'warmcards') {
        const dayOf = sea.season === 'day';
        const wN = warm ? warm.qids.length : 10, wMin = warm ? Math.round(warm.limitMs / 60000) : 15;
        hero = box({ eyebrow: dayOf ? "It's exam day" : esc(until || 'The exam is tomorrow'),
          title: dayOf ? 'Nothing to study today' : `A ${wN}-question warm-up`,
          meta: dayOf ? `If you like, warm up for a few minutes, then go and sit the paper.` : `${wN} easy one-mark questions · ${wMin}‑minute clock · no new topics, then rest`,
          cta: offer.kind === 'warmcards'
            ? `<a class="btn pop lg" href="${esc(sea.day.href)}">${icon('cards')}<span>Warm up · ${esc(sea.day.title)}</span></a>`
            : `<button class="btn pop lg" type="button" id="t-warm">${play}<span>Start the warm-up</span></button>`,
          alt: offer.kind === 'warmcards' ? `<button class="th-link" type="button" id="t-warm">or a ${wN}-question warm-up test · ${wMin} min</button>` : '' });
      }
      const lvNote = lv ? (needsBrief(lv) ? '<span>Not started: the clock waits for you</span>' : `<span><b>${U.clock(Math.max(0, lv.limitMs - lv.elapsedMs))}</b> left</span>`) : '';
      const resume = lv ? `<section class="pr-panel th-resume" aria-label="Test in progress"><div class="th-ri">${icon('timer')}</div><div class="grow"><div class="pr-sub">In progress</div><b>${esc(lv.title)}</b><div class="th-rm"><span><b>${answeredIn(lv)}</b> of ${lv.qids.length} answered</span>${lvNote}</div>${UI.bar(lv.qids.length ? answeredIn(lv) / lv.qids.length : 0, 'thin')}</div><div class="pr-acts"><a class="btn pop" href="#/test/run/${lv.id}">${play}<span>Resume</span></a><button class="btn ghost" type="button" id="abandon">Discard</button></div></section>` : '';
      // mock options (neutral; the hero's coral uses them) · subject or topic test
      const mockHere = offer.kind !== 'mock';
      const opts = `<div class="pr-panel th-card th-mopt"><div class="th-ch"><div class="th-ic">${icon('shuffle')}</div><h2 id="th-h-mock">Full-length mock</h2></div>
          <p>Built like the real papers from the bank's own questions, with subjects shuffled inside each block and weighted by their marks.</p>
          <p class="th-meta" id="m-pool" aria-live="polite">${U.nf(pool.length)} usable questions · ${U.nf(unseenOf(pool))} you have not seen</p>
          <div class="th-opts"><div class="field row"><label class="switch"><input type="checkbox" id="m-fresh" checked><span></span></label><label for="m-fresh">Prefer questions I haven't seen</label></div>
          <div class="field row"><label class="switch"><input type="checkbox" id="m-leg"><span></span></label><label for="m-leg">Include topics outside the current syllabus</label></div></div>
          ${mockHere ? `<button class="btn" type="button" id="t-mock">${play}<span>Start a full mock</span></button>` : '<p class="th-meta th-use">Start it from the card above: it uses these options.</p>'}</div>`;
      const sub0 = D.subjectById[ctx.query.subject] ? ctx.query.subject : D.subjects[0].id;
      const subjCard = `<div class="pr-panel th-card"><div class="th-ch"><div class="th-ic">${icon('layers')}</div><h2>Subject or topic test</h2></div><p>Pick a subject, how many questions, and go: 1.8 minutes per mark, like the real paper.</p>
          <div class="th-form"><div class="field"><label for="s-sub">Subject</label><select class="input" id="s-sub">${D.subjects.map(s => `<option value="${s.id}"${s.id === sub0 ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</select></div>
          <div class="field"><label for="s-top">Topic (optional)</label><select class="input" id="s-top">${topicOptions(D, sub0)}</select></div>
          <div class="field"><span class="th-lab" id="s-n-l">Questions</span><div class="seg" id="s-n" role="group" aria-labelledby="s-n-l">${[10, 20, 30].map(n => `<button type="button" data-n="${n}" class="${n === 20 ? 'on' : ''}" aria-pressed="${n === 20}">${n}</button>`).join('')}</div></div></div>
          <p class="th-meta" id="s-pool" aria-live="polite"></p>
          <button class="btn" type="button" id="t-sub">${play}<span>Start test</span></button></div>`;
      // past papers as a year grid, 2026 → 2011 (sets as quiet buttons with your best); the unkeyed 2007–2010 folded as untimed practice
      const bestOf = p => st.tests.filter(t => t.paper === p.id).map(sumOf).filter(m => m.scored).sort((a, b) => b.score - a.score)[0] || null;
      const keyed = papers.filter(p => p.keyed > 0), unkeyed = papers.filter(p => !p.keyed).sort((a, b) => b.year - a.year);
      const years = U.uniq(keyed.map(p => p.year));
      const yearTile = y => {
        const ps = keyed.filter(p => p.year === y), multi = ps.length > 1;
        return `<li class="th-yr"><div class="th-yh"><b class="num">${y}</b><span>${esc(ps[0].organiser || '')}</span></div><div class="th-sets">${ps.map(p => {
          const b = bestOf(p), part = p.keyed < p.n ? ` · key ${p.keyed}/${p.n}` : '', vis = multi ? 'Set ' + p.set : 'Sit it';
          // WCAG 2.5.3: the accessible name starts with the visible words ('Sit it: GATE 2023 CS, 3 hours'), so a voice command finds it
          const name = `${multi ? '' : vis + ': '}${multi ? 'Start ' : ''}${p.label}, ${hours(p.minutes || 180)}${b ? `, your best ${scoreTxt(b)}` : ''}${part ? `, official key for ${p.keyed} of ${p.n} questions` : ''}`;
          return `<button type="button" class="th-set" data-paper="${p.id}" aria-label="${esc(name)}"><span>${vis}</span>${b ? `<small>best ${fm(b.score)}</small>` : ''}${part ? `<small class="warn">key ${p.keyed}/${p.n}</small>` : ''}</button>`; }).join('')}</div></li>`;
      };
      const oldRows = unkeyed.map(p => { const first = TG.printedOrder ? TG.printedOrder(D.questions.filter(q => q.paper === p.id))[0] : null;
        return `<li><span><b>${esc(p.label)}</b><small>${esc(p.organiser || '')} · ${p.n} questions · ${p.marks} marks</small></span>${first ? `<a class="th-link" href="#/q/${encodeURIComponent(first.id)}">Practise in paper order</a>` : ''}</li>`; }).join('');
      const span = years.length ? `${years[years.length - 1]}–${years[0]}` : '';
      const papersSec = `<section aria-labelledby="th-h-pp"><div class="pr-sec-h"><div><h2 id="th-h-pp">Past papers, exactly as printed</h2><p>${keyedPapers} papers with a complete official key${span ? `, ${span}` : ''} · 3 hours each, in printed order${st.tests.some(t => t.paper) ? ' · your best on each set' : ''}</p></div></div>
          <ul class="th-years" role="list">${years.map(yearTile).join('')}</ul>
          ${unkeyed.length ? `<details class="th-old"><summary><span>${unkeyed[unkeyed.length - 1].year}–${unkeyed[0].year} · ${U.plural(unkeyed.length, 'paper')} without an official key</span><small>Practise them untimed: nothing in them can be scored</small>${icon('chev-d')}</summary><ul class="th-oldl" role="list">${oldRows}</ul></details>` : ''}</section>`;
      // your attempts: the scored full-length trend (when the hero does not already show it) and the last 5 of any kind, with their kind
      const row = t => { const m = sumOf(t), kind = esc(KIND[t.kind] || 'Test'); return `<tr><td><a class="th-tl" href="#/test/result/${t.id}"><b>${esc(t.title)}</b></a><small class="sp">${kind}${HAS_DAY.test(t.title || '') ? '' : ' · ' + dayTxt(t.finished)}</small></td><td class="hp">${kind}</td><td class="nw hp">${dateTxt(t.finished)}</td>${m.scored ? `<td class="r nw"><b>${fm(m.score)}</b> / ${m.max}</td><td class="r hp">${m.accuracy != null ? Math.round(100 * m.accuracy) + '%' : '—'}</td>` : '<td class="r nw muted">Not scored</td><td class="r hp">—</td>'}<td class="r hp">${hm((t.usedMs || t.finished - t.started) / 60000)}</td></tr>`; };
      const thead = '<thead><tr><th scope="col">Test</th><th class="hp" scope="col">Kind</th><th class="hp" scope="col">When</th><th class="r" scope="col">Score</th><th class="r hp" scope="col">Accuracy</th><th class="r hp" scope="col">Time</th></tr></thead>';
      const bestFull = fulls.reduce((m, x) => (!m || x.m.pct > m.m.pct ? x : m), null);
      const attempts = hist.length ? `<section aria-labelledby="th-h-att"><div class="pr-sec-h"><div><h2 id="th-h-att">Your attempts</h2><p>${U.plural(hist.length, 'finished test')}${fulls.length ? ` · ${U.plural(fulls.length, 'scored full-length sitting')}` : ''}${bestFull ? ` · best full-length ${pctTxt(bestFull.m)} (${esc(bestFull.t.title)})` : ''}</p></div></div>
          <div class="pr-panel th-att">${!hero && fulls.length > 1 ? `<div class="th-spark"><div><span class="pr-sub">Latest full-length</span><b class="num">${pctTxt(lastFull.m)}</b></div><div class="th-sp"><span class="pr-sub">Your last ${Math.min(12, fulls.length)} full-length sittings, % of marks</span>${C.spark(fulls.slice(-12).map(x => Math.max(0, x.m.pct || 0)), { w: 240, h: 44, min: 0, max: 1 })}</div></div>` : ''}
          <div class="tw"><table class="t">${thead}<tbody>${hist.slice(0, 5).map(row).join('')}</tbody></table></div>
          ${hist.length > 5 ? `<details class="th-more"><summary>All ${U.plural(hist.length, 'attempt')}${icon('chev-d')}</summary><div class="tw"><table class="t">${thead}<tbody>${hist.slice(5).map(row).join('')}</tbody></table></div></details>` : ''}</div></section>` : '';
      out.innerHTML = `<div class="th pr-page">
        <header class="pr-head"><div class="pr-ht"><h1>Tests &amp; mocks</h1><p>${papers.length} official papers (${keyedPapers} with keys) · mocks from ${U.nf(pool.length)} usable questions · marked against the official answers</p></div></header>
        ${resume}${hero}
        <section class="th-row" aria-label="Build a test">${opts}${subjCard}</section>
        ${papersSec}
        ${attempts}
      </div>`;
      const $ = s => U.$(s, out);
      if (fulls.length > 1) drawTrend(out, fulls);
      // the subject or topic test (P2-31): usable counts per topic, sizes the pool can fill, and a button that names the exact test it starts
      let want = 20, n = 20, pending = null;               // want: the size the learner picked; n: the size this pool can take
      const paintSub = () => {
        const subject = $('#s-sub').value, topic = $('#s-top').value || null;
        const have = TG.topicPool ? TG.topicPool(D, { subject, topic }).length : null;
        const sizes = TG.sizesFor && have != null ? TG.sizesFor(have) : [10, 20, 30].map(k => ({ n: k, real: k, on: true }));
        const on = sizes.filter(s => s.on);
        n = on.some(s => s.n === want) ? want : on.length ? on[on.length - 1].n : want;
        U.$$('#s-n button', out).forEach(b => { const s = sizes.find(x => x.n === +b.dataset.n), on = +b.dataset.n === n; b.disabled = !(s && s.on); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
        pending = have === 0 ? null : TG.subject(D, { subject, topic, n, seed: Date.now() % 100000, state: st });
        const k = pending ? pending.qids.length : 0, outside = topic && TG.topicOutside && TG.topicOutside(D, topic);
        $('#s-pool').textContent = have == null ? '' : have ? `${U.plural(have, 'usable question')} in this ${topic ? 'topic' : 'subject'}${outside ? ', outside the current syllabus' : ''}` : 'Nothing here can be scored yet: pick another topic.';
        const bt = $('#t-sub'); bt.disabled = !k;
        U.$$('span', bt).pop().textContent = k ? `Start · ${U.plural(k, 'question')} · ${Math.round(pending.limitMs / 60000)} min` : 'Start test';
      };
      $('#s-sub').addEventListener('change', () => { $('#s-top').innerHTML = topicOptions(D, $('#s-sub').value); paintSub(); });
      $('#s-top').addEventListener('change', paintSub);
      U.on(out, 'click', '#s-n [data-n]', (e, b) => { if (b.disabled) return; want = +b.dataset.n; paintSub(); });
      roving($('#s-n'));
      paintSub();
      // the pool line follows the legacy switch (P3-43): counted with the mock builder's own filter
      $('#m-leg').addEventListener('change', () => { const p = usable({ includeLegacy: $('#m-leg').checked }); $('#m-pool').textContent = `${U.nf(p.length)} usable questions · ${U.nf(unseenOf(p))} you have not seen`; });
      const mockOf = () => TG.mock(D, { seed: Date.now() % 100000, excludeAttempted: $('#m-fresh').checked, includeLegacy: $('#m-leg').checked, state: st, weights: mockWeights() });
      const startMock = from => { const t = mockOf(); if (!t.complete) UI.toast('The bank does not yet have enough keyed questions for a full-length mock; running a shorter one.'); return begin(t, from); };
      const diagNow = () => TG.diagnostic(D, { seed: Date.now() % 100000, state: st });
      U.on(out, 'click', '#t-diag', (e, b) => begin(diagNow(), b));
      U.on(out, 'click', '#t-mock', (e, b) => startMock(b));
      U.on(out, 'click', '#t-warm', (e, b) => begin(TG.warmup(D, { seed: Date.now() % 100000, state: st }), b));
      $('#t-sub').addEventListener('click', e => { const t = pending; if (!t) return; begin(t, e.currentTarget).then(ok => { if (!ok && out.isConnected) paintSub(); }); });
      U.on(out, 'click', '[data-paper]', (e, b) => { const t = TG.fromPaper(D, b.dataset.paper); if (t.keyed === 0) { UI.toast('This paper has no official key, so a sitting cannot be scored. Practise it untimed instead.'); return; } begin(t, b); });
      const ab = $('#abandon'); if (ab) ab.addEventListener('click', async () => { if (await UI.confirm('The answers you have entered in this test will be lost.', { ok: 'Discard test', danger: true })) { S.update(s => { s.live = null; }, 'live'); GA.router.resolve(); } });
      // ?new=diagnostic / ?new=mock / ?new=warmup (links from Home, the planner and the shared next step): start straight away. The URL is first
      // rewritten to plain #/test so Back from the runner lands on the hub instead of starting another test. A mock link resumes a test already
      // in progress rather than replacing it.
      const autostart = k => { try { history.replaceState(history.state, '', '#/test'); } catch (e) { /* file:// quirks */ } return k; };
      if (ctx.query.new === 'diagnostic') { autostart(); begin(diagNow(), $('#t-diag')); }
      if (ctx.query.new === 'warmup' && TG.warmup) { autostart(); begin(TG.warmup(D, { seed: Date.now() % 100000, state: st }), $('#t-warm')); }
      if (ctx.query.new === 'mock') { autostart(); if (lv) GA.router.go('/test/run/' + lv.id); else startMock($('#t-mock')); }
      if (ctx.query.new === 'filtered') {
        autostart();
        const q = GA.queue && GA.queue.get();
        const isMta = TG.mtaOf ? TG.mtaOf(D) : (x => false);
        const ids = q && q.ids ? q.ids.filter(id => D.qById[id] && D.qById[id].hasKey && !isMta(D.qById[id])) : [];
        const n0 = q && q.ids ? q.ids.filter(id => D.qById[id]).length : 0;
        // Cancel goes back to where 'Make a test' was pressed (the bank), instead of stranding the learner here (P3-49)
        const away = () => { const ov = UI.overlay, back = () => { try { history.back(); } catch (e) { GA.router.go('/pyq'); } };
          if (ov && ov.busy && ov.busy() && ov.after) ov.after(back); else setTimeout(back, 0); };
        if (!n0) { /* nothing queued (a reload): stay on the hub */ }
        else if (ids.length < 3) {
          UI.modal({ title: 'Make a test from your filter', body: `<p class="muted" style="margin:0">${ids.length ? `Only ${U.plural(ids.length, 'question')} of the ${U.nf(n0)} in your filter ${ids.length === 1 ? 'has' : 'have'} an official key that can be scored` : `None of the ${U.nf(n0)} questions in your filter has an official key that can be scored`}; a test needs at least 3. Practise them untimed in the bank instead.</p>`,
            onclose: v => { if (v !== 'stay') away(); }, actions: [{ label: 'Back to the bank', kind: 'primary', value: 'back' }] });
        } else {
          let started = false;
          UI.modal({ title: 'Make a test from your filter', body: `<p class="muted" style="margin:0 0 12px">${U.nf(ids.length)} of the ${U.nf(n0)} questions in your filter have an official key that can be scored. Choose how many to include (a random pick; the time is set at 1.8 minutes per mark).</p><div class="field"><label for="fq-n">Number of questions</label><input class="input" id="fq-n" type="number" min="3" max="${Math.min(65, ids.length)}" value="${Math.min(20, ids.length)}"></div>`,
            onclose: () => { if (!started) away(); },
            actions: [{ label: 'Cancel' }, { label: 'Start', kind: 'pop', onclick: b => { started = true; const k = U.clamp(+U.$('#fq-n', b).value || 10, 3, Math.min(65, ids.length)); const pickIds = U.shuffle(ids, Math.random).slice(0, k); setTimeout(() => begin(TG.custom(D, pickIds, `Filtered test · ${pickIds.length} questions`)), 30); } }] });
        }
      }
      // P2-76 (optional, hosted copy only): once the hub has been idle for 2 s on a fast connection that does not save data, warm the service
      // worker's cache with the paper files, so a mock started later needs no download. Never on file://, slow links or Save-Data.
      prefetchSoon(out);
    },
    leave() { if (prefetchT) { clearTimeout(prefetchT); prefetchT = null; } }
  };
  let prefetchT = null, prefetched = false;
  function prefetchSoon(out) {
    const P = GA.pwa, nc = typeof navigator !== 'undefined' ? navigator.connection : null;
    if (prefetched || !P || !P.hosted || !nc || nc.saveData || nc.effectiveType !== '4g' || typeof fetch !== 'function') return;
    let last = Date.now();
    const poke = () => { last = Date.now(); };
    ['pointerdown', 'keydown', 'scroll'].forEach(ev => out.addEventListener(ev, poke, { passive: true, capture: true }));
    const check = () => {
      if (!out.isConnected) return;
      if (Date.now() - last < 2000) { prefetchT = setTimeout(check, 500); return; }
      prefetched = true;
      const files = DATA.D.papers.filter(p => p.keyed > 0).map(p => `data/pyq/${p.id}.js`).map(f => (DATA.D.files && DATA.D.files[f] ? f + '?v=' + DATA.D.files[f] : f));
      (function next(i) { if (i < files.length && out.isConnected) fetch(files[i]).catch(() => null).then(() => next(i + 1)); })(0);
    };
    prefetchT = setTimeout(check, 2000);
  }

  /* ------------------------------------------------------------ calculator: a docked, non-modal panel on GA.calc (P0-15) */
  /* the exam's whole key set (TCS iON) in one layout at every width: a quiet band (memory, Ans, hyperbolic functions) over an 8-column grid in
     reading order, functions at the left and on top, C and ⌫ right above the digit block (7 8 9 ÷ / 4 5 6 × / 1 2 3 − / 0 . = +). Where it
     sits is CSS: beside the question over the palette column (desktop), above the pinned action row (tablets), a sheet (phones), a column at
     the right (short screens). */
  /** the exam calculator. Its state lives with the live test (lv.calc), so closing it or leaving the runner keeps the expression, the answer
      and the memory. Keys typed inside it never reach the runner's shortcuts. */
  function calcPanel(host, lv, onSave) {
    const K = GA.calc;
    if (!K) return null;
    let st = K.init(lv.calc), opener = null;
    const keyBtn = id => `<button type="button" class="exc-k${/^[0-9.]$/.test(id) ? ' n' : ''}${id === 'eq' ? ' eq' : ''}${/^[-+*/]$/.test(id) ? ' op' : ''}${id === 'clear' || id === 'back' ? ' tp' : ''}" data-ck="${esc(id)}" aria-label="${esc(K.name(id))}">${esc(K.label(id))}</button>`;
    const band = K.KEYS.band || [], grid = K.KEYS.grid || [];
    const el = U.h('section.ex-calc', { id: 'ex-calc', role: 'dialog', 'aria-modal': 'false', 'aria-label': 'Scientific calculator', tabindex: '-1', hidden: true });
    el.innerHTML = `<header class="exc-h"><b id="exc-t">Calculator</b>
        <div class="exc-mode" role="group" aria-label="Angle unit"><button type="button" data-ck="deg" data-u="deg">Deg</button><button type="button" data-ck="deg" data-u="rad">Rad</button></div>
        <button type="button" class="btn icon sm ghost" data-calc-close aria-label="Close the calculator">${icon('x')}</button></header>
      <div class="exc-scr"><div class="exc-ex" aria-label="Expression"></div><output class="exc-out" aria-live="polite">0</output></div>
      <div class="exc-keys"><div class="exc-band">${band.map((row, i) => `<div role="group" aria-label="${i ? 'Hyperbolic functions' : 'Memory'}">${row.map(keyBtn).join('')}</div>`).join('')}</div>
        <div class="exc-grid" role="group" aria-label="Functions, digits and operators">${[].concat(...grid).map(keyBtn).join('')}</div></div>
      <p class="exc-note">Degrees unless you switch to Rad, as in the exam. logᵧx, ʸ√x and Exp go between two numbers: <span class="nw">8 logᵧx 2 = 3</span>.${UI.touch ? '' : ' Your keyboard types too.'}</p>`;
    host.append(el);
    const ex = U.$('.exc-ex', el), outEl = U.$('.exc-out', el);
    function paint() {
      const d = K.display(st);
      ex.textContent = d || ' ';
      outEl.textContent = st.err ? st.err : st.out;
      outEl.classList.toggle('bad', !!st.err);
      U.$$('[data-u]', el).forEach(b => { const on = (b.dataset.u === 'deg') === st.deg; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
    }
    /** the panel's own height (--calc-h) and width (--calc-w): the page leaves that much room, so the question and the action row can always
        scroll clear of it (tests.css) */
    const pad = () => {
      if (el.hidden) return;
      const rs = document.documentElement.style;
      rs.setProperty('--calc-h', el.offsetHeight + 'px'); rs.setProperty('--calc-w', el.offsetWidth + 'px');
    };
    const unpad = () => { const rs = document.documentElement.style; rs.removeProperty('--calc-h'); rs.removeProperty('--calc-w'); };
    let ro = null;
    if (typeof ResizeObserver === 'function') { ro = new ResizeObserver(pad); ro.observe(el); }
    const onResize = () => pad();
    g.addEventListener('resize', onResize);
    function press(id) { st = K.press(st, id); lv.calc = K.save(st); paint(); if (onSave) onSave(); }
    U.on(el, 'click', '[data-ck]', (e, b) => press(b.dataset.ck));
    U.on(el, 'click', '[data-calc-close]', () => api.close());
    el.addEventListener('keydown', e => {
      e.stopPropagation();                               // the runner's A–D / N / P / M / X / S never fire from inside the calculator
      if (e.key === 'Escape') { e.preventDefault(); api.close(); return; }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target, onKey = t && t.closest && t.closest('[data-ck]');
      if ((e.key === 'Enter' || e.key === ' ') && onKey) return;     // a focused key presses itself
      const id = K.keyOf(e.key);
      if (id) { e.preventDefault(); press(id); }
    });
    paint();
    const sync = on => U.$$('[data-calc]', host).forEach(b => b.setAttribute('aria-expanded', String(on)));
    const api = {
      el,
      get open() { return !el.hidden; },
      show(from) { opener = from || document.activeElement; el.hidden = false; document.body.classList.add('calc-open'); paint(); pad(); el.focus({ preventScroll: true }); sync(true); },
      close(silent) {
        if (el.hidden) return;
        el.hidden = true; document.body.classList.remove('calc-open'); unpad(); sync(false);
        if (!silent && opener && opener.isConnected) opener.focus({ preventScroll: true });
      },
      toggle(from) { if (el.hidden) api.show(from); else api.close(); },
      destroy() { if (ro) ro.disconnect(); g.removeEventListener('resize', onResize); unpad(); }
    };
    return api;
  }

  /* ------------------------------------------------------------ the question card in a sitting */
  /** the card's one header line (P2-30: the marking rule once per screen): '1 mark · MCQ · −⅓ if wrong' */
  function ruleLine(q) {
    if (q.icai) {
      const mk = q.marks ? U.plural(q.marks, 'mark') : q.kind === 'rtp' ? 'no marks printed (RTP)' : 'no marks printed';
      return q.type === 'DESC' ? `${mk} · Descriptive · you mark it after Submit` : `${mk} · MCQ · no negative marking`;
    }
    const m = q.marks || 1, base = `${U.plural(m, 'mark')} · ${q.type}`;
    if (q.type === 'MSQ') return `${base} · all or nothing, no negative marks`;
    if (q.type === 'NAT') return `${base} · no negative marks`;
    if (q.group && q.group.kind === 'linked' && q.group.role === 'second') return `${base} · linked part 2: no negative marks`;
    return `${base} · −${m === 1 ? '⅓' : '⅔'} if wrong`;
  }
  /** how to answer, under the options (MSQ and NAT only; the marks are in the header line) */
  function howTo(q, keypad) {
    if (q.type === 'DESC') return 'Write your answer in the box, or on paper and tick below. You mark it against ICAI’s answer after Submit.';
    if (q.type === 'MSQ') return 'One or more options are right: choose every one of them.';
    if (q.type === 'NAT') return keypad ? 'Enter a number with the keypad (or your keyboard): digits, one decimal point, a leading minus.' : 'Type a number: digits, one decimal point, a leading minus.';
    return '';
  }
  /* the on-screen NAT keypad of a full-length sitting (D7, P2-30): GATE's digits, point, minus, backspace, caret keys and Clear all. On phones it is
     the keyboard (inputmode none), as in the exam; a physical keyboard still types. */
  const PAD = [['7', '8', '9', 'back'], ['4', '5', '6', 'minus'], ['1', '2', '3', '.'], ['0', 'left', 'right', 'clear']];
  const PADL = { back: '⌫', minus: '−', left: '←', right: '→', clear: 'Clear all' };
  const PADN = { back: 'Backspace', minus: 'Minus sign', left: 'Move left', right: 'Move right', clear: 'Clear all', '.': 'Decimal point' };
  function natPad(cardEl) {
    const box = U.$('.qc-nat', cardEl), input = box && U.$('input', box);
    if (!input) return null;
    box.classList.add('has-pad');
    input.setAttribute('inputmode', 'none');
    const pad = U.h('div.np', { role: 'group', 'aria-label': 'Number keypad' });
    pad.innerHTML = [].concat(...PAD).map(k => `<button type="button" class="np-k${/^\d$/.test(k) ? ' n' : ''}${k === 'clear' ? ' w' : ''}" data-np="${k}" aria-label="${esc(PADN[k] || k)}">${esc(PADL[k] || k)}</button>`).join('');
    const w = U.$('.qc-natw', box); (w || input).after(pad);
    pad.addEventListener('click', e => {
      const b = e.target.closest('[data-np]'); if (!b) return;
      const k = b.dataset.np, v = input.value;
      const a = Math.min(v.length, input.selectionStart == null ? v.length : input.selectionStart), z = Math.min(v.length, input.selectionEnd == null ? a : input.selectionEnd);
      let next = v, at = a;
      if (/^[0-9.]$/.test(k)) { next = v.slice(0, a) + k + v.slice(z); at = a + 1; }
      else if (k === 'minus') { if (v.charAt(0) === '-') { next = v.slice(1); at = Math.max(0, a - 1); } else { next = '-' + v; at = a + 1; } }
      else if (k === 'back') { if (z > a) next = v.slice(0, a) + v.slice(z); else if (a > 0) { next = v.slice(0, a - 1) + v.slice(a); at = a - 1; } }
      else if (k === 'left') at = Math.max(0, a - 1);
      else if (k === 'right') at = Math.min(v.length, z + 1);
      else if (k === 'clear') { next = ''; at = 0; }
      if (next !== v) { input.value = next; input.dispatchEvent(new Event('input', { bubbles: true })); }
      at = Math.min(at, input.value.length);
      try { input.setSelectionRange(at, at); } catch (err) { /* not focusable */ }
    });
    return pad;
  }

  /* ------------------------------------------------------------ the briefing and the instructions (P2-30, D7) */
  /** the briefing's body: this sitting's own blueprint, one marking line, the five palette glyphs and how answers are saved. o.modal: the
      'Instructions' dialog during the test (no switch, no Start). */
  function briefHtml(lv, qs, o) {
    o = o || {};
    if (lv.icai) return briefIcai(lv, qs, o);
    const b = TG.blueprintOf ? TG.blueprintOf(qs) : { sections: [], questions: qs.length, marks: qs.reduce((a, q) => a + (q.marks || 0), 0), linked: 0, ungraded: 0 };
    const mins = Math.round((lv.limitMs || 0) / 60000), cbt = !!lv.cbt;
    const tile = s => { const by = Object.keys(s.byMarks).sort().map(m => `${s.byMarks[m]} × ${m}`).join(' + ');
      const mix = ['MCQ', 'MSQ', 'NAT'].filter(t => s.types[t]).map(t => `${s.types[t]} ${t}`).join(' · ');
      return `<div role="listitem"><b class="num">${s.n}</b><span>${secName(s.sec)} · ${U.plural(s.marks, 'mark')}</span><small>${by} marks${mix ? `<br>${mix}` : ''}</small></div>`; };
    const marking = `<p class="xb-mark"><b>Marking:</b> a wrong MCQ costs −⅓ (1 mark) or −⅔ (2 marks); MSQ and NAT have no negative marks and no partial credit; a question you leave scores 0.${b.linked ? ' Linked pairs: the second part counts only when the first is right, and costs nothing when wrong.' : ''}${b.ungraded ? ` ${U.plural(b.ungraded, 'question')} without an official key ${b.ungraded === 1 ? 'is' : 'are'} not counted.` : ''}</p>`;
    const legend = `<ul class="xb-lg" role="list" aria-label="The palette's colours and shapes">${['nv', 'na', 'ans', 'mk', 'am'].map((k, i) => `<li>${glyph(k, String(i + 1), 'lg')}<span>${STATUS[k]}${k === 'am' ? ': evaluated' : ''}</span></li>`).join('')}</ul>`;
    const how = cbt
      ? `<li><b>Save &amp; next</b> saves your answer. Leaving a question any other way (the palette, Previous, a section tab) drops a choice you have not saved, as in a computer-based test.</li>
         <li><b>Mark for review &amp; next</b> saves your answer too and flags the question; answered and marked questions are evaluated. <b>Clear response</b> removes the answer.</li>
         <li>Type NAT answers with the on-screen keypad. The calculator is on the bar and Pause is next to the clock; only saved answers count when the time is up.</li>`
      : `<li>Your answers save as you choose them. <b>Mark for review &amp; next</b> flags a question; answered and marked questions are evaluated.</li>
         <li><b>Clear response</b> removes an answer. The calculator is on the bar and Pause is next to the clock.</li>`;
    const clock = `The ${mins % 60 ? mins + '-minute' : mins / 60 + '-hour'} clock ${o.modal ? 'keeps running while you read this' : 'starts when you press Start the clock'}. It counts only while this page is open; Pause stops it.`;
    return `<div class="xb-bp" role="list" aria-label="This sitting, section by section">${b.sections.map(tile).join('')}</div>
      ${marking}
      <h3 class="xb-h">The question palette</h3>${legend}
      <h3 class="xb-h">How answers are saved</h3><ul class="xb-how">${how}</ul>
      <p class="xb-clock">${icon('clock')}<span>${clock}</span></p>`;
  }
  /** an ICAI sitting's briefing (docs/ICAI_BANK.md §7): its parts with their marks, ICAI's choices, the marking, the palette and how answers
      and self-marking work */
  function briefIcai(lv, qs, o) {
    const b = TG.blueprintOf ? TG.blueprintOf(qs) : { sections: [] }, mins = Math.round((lv.limitMs || 0) / 60000);
    const p = lv.paper ? DATA.D.paperById[lv.paper] : null, cl = p && lv.kind === 'paper' ? choiceLines(p) : [];
    // each Part's marks under the paper's choices (a Part II whose items add up to 84 or 90 counts 70 when ICAI says 'answer any four of the
    // rest' or 'any seven of (a)-(h)'), and a Part II tile reads ICAI's rule for its section instead of the items' marks
    const maxBy = (() => { if (!p || lv.kind !== 'paper') return null; const res = {}; qs.forEach(q => { res[q.id] = { score: q.marks || 0, state: 'correct', negative: 0 }; }); return SC.applyChoice(qs, res, TG.choiceFn(p)).maxBy; })();
    const tile = s2 => {
      const m = /^(?:(fm|sm):)?(I|II)$/.exec(String(s2.sec)), mb = maxBy && m ? maxBy[m[1] || 'all'] : null, marks = mb ? (m[2] === 'I' ? mb.mcq : mb.desc) : s2.marks;
      const rule = m && m[2] === 'II' && maxBy ? choiceWords(TG.choiceFn(p)(m[1] || 'all')) : '';
      return `<div role="listitem"><b class="num">${s2.n}</b><span>${icaiSecName(s2.sec)}${marks ? ' · ' + U.plural(marks, 'mark') : ''}</span><small>${rule ? keepDash(rule) : `${Object.keys(s2.byMarks).sort((x, y) => x - y).map(k => `${s2.byMarks[k]} × ${k}`).join(' + ')} marks`}</small></div>`;
    };
    const legend = `<ul class="xb-lg" role="list" aria-label="The palette's colours and shapes">${['nv', 'na', 'ans', 'mk', 'am'].map((k, i) => `<li>${glyph(k, String(i + 1), 'lg')}<span>${STATUS[k]}${k === 'am' ? ': evaluated' : ''}</span></li>`).join('')}</ul>`;
    const clock = `The ${mins % 60 ? mins + '-minute' : mins / 60 + '-hour'} clock ${o.modal ? 'keeps running while you read this' : 'starts when you press Start the clock'}. It counts only while this page is open; Pause stops it.`;
    return `<div class="xb-bp" role="list" aria-label="This sitting, part by part">${b.sections.map(tile).join('')}</div>
      <p class="xb-mark"><b>Marking:</b> no negative marking, as in ICAI’s papers. MCQs are marked against ICAI’s key. Descriptive answers are marked by you after Submit, against ICAI’s own answers.${cl.length ? ` <b>Choices:</b> ICAI’s, as Part II above says. If you answer more questions or parts than they allow, PassBook counts the first ones in paper order.` : ''}</p>
      <h3 class="xb-h">The question palette</h3>${legend}
      <h3 class="xb-h">How answers are saved</h3><ul class="xb-how"><li>Your answers save as you go. For a descriptive question write in the box, or answer on paper and tick <b>I answered this on paper</b>: either counts it as answered.</li>
        <li><b>Mark for review &amp; next</b> flags a question; <b>Clear response</b> removes an answer. A simple calculator is on the bar, as ICAI allows one.</li></ul>
      <p class="xb-clock">${icon('clock')}<span>${clock}</span></p>`;
  }
  /** the briefing card before a full-length sitting: the clock stays stopped until the coral 'Start the clock' */
  function briefing(out, lv, qs, start) {
    const isPaper = lv.kind === 'paper', b = TG.blueprintOf ? TG.blueprintOf(qs) : null, mins = Math.round(lv.limitMs / 60000);
    out.innerHTML = `<div class="xb pr-page"><section class="pr-panel xb-card" aria-labelledby="xb-h1">
        <p class="xb-eye">${icon('info')}<span>Before you start</span></p>
        <h1 id="xb-h1" tabindex="-1" data-focus>${esc(lv.title)}</h1>
        <p class="xb-sub">${b ? `${U.plural(b.questions, lv.icai ? 'item' : 'question')} · ${U.plural(lv.icai && lv.max != null ? lv.max : b.marks, 'mark')} · ` : ''}${hours(mins)} · ${lv.icai ? 'ICAI’s own questions, in ICAI’s order' : isPaper ? 'in the order it was printed' : 'built like the real papers'}</p>
        <div class="xb-body">${briefHtml(lv, qs)}</div>
        ${lv.icai ? '' : `<div class="field row xb-sw"><label class="switch"><input type="checkbox" id="xb-cbt"${lv.cbt ? ' checked' : ''}><span></span></label><label for="xb-cbt">Save answers only with Save &amp; next, as in a computer-based test</label></div>`}
        <div class="xb-cta"><button class="btn pop lg" type="button" id="xb-go">${icon('play')}<span>Start the clock</span></button><a class="btn ghost" href="#/test">${icon('arrow-l')}<span class="l">Back to tests</span></a></div>
      </section></div>`;
    const sw = U.$('#xb-cbt', out);
    if (sw) sw.addEventListener('change', () => {
      lv.cbt = sw.checked;
      GA.store.update(s => { if (s.live && s.live.id === lv.id) s.live.cbt = lv.cbt; }, 'live');
      U.$('.xb-body', out).innerHTML = briefHtml(lv, qs);
    });
    U.$('#xb-go', out).addEventListener('click', () => {
      lv.clockAt = Date.now();
      GA.store.update(s => { if (s.live && s.live.id === lv.id) { s.live.clockAt = lv.clockAt; s.live.cbt = lv.cbt; } }, 'live');
      start();
    });
  }

  /* ------------------------------------------------------------ runner */
  /* Layout (P1-28, P2-30): above 980 px the page header is the sticky exam bar under the top bar (one-line title, section tabs with their
     counts, Calculator, Submit), then the question with its action row and the sticky side panel (clock, palette, and at its foot the legend,
     Instructions and Submit). At 980 px and below the exam bar is the top bar (the shell's bar and crumbs step aside: tests.css), the actions
     are one row (one 56 px row on phones), and the side panel is a sheet opened from the bar's '24 of 65 · 17 answered' button, with the
     legend and Submit at its foot. Under 560 px of height the bars are static, so they never cover the question. */
  GA.views.testrun = {
    async enter(ctx, out) {
      const lv = live();
      if (!lv || lv.id !== ctx.params.id) { GA.router.go('/test', null, true); return; }
      GA.shell.crumbs([['Tests', '#/test'], [lv.title, '#/test/run/' + lv.id]]);
      const noun = lv.kind === 'mock' ? 'mock' : lv.kind === 'paper' ? 'paper' : 'test';
      // P2-76: a load that takes a moment says how far it got
      let n0 = 0, k0 = 0;
      const slow = setTimeout(() => { if (!ctx.stale()) out.innerHTML = `<div class="xm-load" role="status">${icon('timer')}<p>Preparing your ${noun}<b>${n0 > 1 ? ` · ${k0} of ${n0} papers` : ''}</b></p></div>`; }, 250);
      let qs;
      try { qs = await prepare(lv.qids, (k, n) => { k0 = k; n0 = n; const b = U.$('.xm-load b', out); if (b) b.textContent = ` · ${k} of ${n} papers`; }); }
      catch (err) {
        // P1-59: the test is saved and its clock never started; say so and offer a real retry
        clearTimeout(slow);
        if (ctx.stale()) return;
        const box = U.h('div.ex-fail');
        out.replaceChildren(box);
        if (UI.loadFailed) UI.loadFailed(box, { what: 'test', main: true }); else box.innerHTML = UI.empty('alert', 'This test did not load', 'Try again in a moment.', '');
        const off = typeof navigator !== 'undefined' && navigator.onLine === false;
        box.insertAdjacentHTML('beforeend', `<p class="ex-fail-n">${icon('shield')}<span>Your ${noun} is saved and its clock is stopped: ${answeredIn(lv)} of ${lv.qids.length} answered. Its questions did not download${off ? ' (you are offline)' : ''}; it continues where you left it once they load.</span></p>`);
        return;
      }
      clearTimeout(slow);
      if (ctx.stale()) return;
      const byId = Object.fromEntries(qs.map(q => [q.id, q]));
      const order = lv.qids.filter(id => byId[id]);
      if (!order.length) { out.innerHTML = UI.empty('alert', 'This test has no questions', 'Discard it from Tests and start another one.', '<a class="btn pop" href="#/test">Back to tests</a>'); return; }
      const qsInOrder = order.map(id => byId[id]);
      GA.views.testrun._cleanup = null;
      if (needsBrief(lv)) {
        briefing(out, lv, qsInOrder, () => { if (out.isConnected) exam(out, lv, byId, order, qsInOrder, true); });
        return;
      }
      exam(out, lv, byId, order, qsInOrder, false);
    },
    leave() { if (GA.views.testrun._cleanup) { GA.views.testrun._cleanup(); GA.views.testrun._cleanup = null; } }
  };

  function exam(out, lv, byId, order, qsInOrder, fromBrief) {
    const D = DATA.D, S = GA.store;
    // an ICAI sitting (docs/ICAI_BANK.md §7): its parts are the sections (P6: per section), its labels ICAI's printed numbers
    const icai = !!lv.icai;
    const secOf = q => (icai ? (q.sub ? q.sub + ':' : '') + q.section : q.section);
    const sName = icai ? icaiSecName : secName;
    const sections = U.uniq(order.map(id => secOf(byId[id])));
    let cur = Math.min(lv.cur || 0, order.length - 1), card = null, tick = null, saveT = null, paused = false, pausedAt = 0;
    let finished = false, dlg = null, calc = null, draft;
    const cbt = !!lv.cbt;
    lv.pausedMs = lv.pausedMs || 0; lv.warned = lv.warned || {}; lv.times = lv.times || {}; lv.visited = lv.visited || {}; lv.marked = lv.marked || {}; lv.responses = lv.responses || {};
    document.body.classList.add('in-exam');
    const totalMarks = icai && lv.max != null ? lv.max : order.reduce((a, id) => a + (byId[id].marks || 0), 0);
    const isPaper = lv.kind === 'paper';
    /** the cell's label: the printed number in a paper sitting (numbered per section where the paper restarts), else 1..N (P1-21) */
    const cellNo = i => (isPaper ? (icai && GA.pyqLib ? GA.pyqLib.cellText(byId[order[i]]) : String(byId[order[i]].no)) : String(i + 1));
    const qName = i => (isPaper ? (icai ? byId[order[i]].label : `${byId[order[i]].section === 'GA' && sections.length > 1 ? 'GA ' : ''}Q${byId[order[i]].no}`) : `Question ${i + 1}`);
    const choiceNote = icai && isPaper && lv.paper ? choiceLines(D.paperById[lv.paper]).filter(x => !lv.sub || x.indexOf(':') < 0 || x.startsWith(ICAI_SUB[lv.sub])).join(' · ') : '';
    const sheetMQ = g.matchMedia ? g.matchMedia('(max-width: 980px)') : { matches: false };

    const status = id => (TG.status ? TG.status(byId[id], lv) : (() => {
      const r = lv.responses[id] != null && SC.answered(byId[id], lv.responses[id]), mk = lv.marked[id];
      return r && mk ? 'am' : mk ? 'mk' : r ? 'ans' : lv.visited[id] ? 'na' : 'nv';
    })());
    const remaining = () => lv.limitMs - lv.elapsedMs;
    const tally = () => order.reduce((o, id) => { o[status(id)]++; return o; }, { ans: 0, na: 0, nv: 0, mk: 0, am: 0 });
    const paletteHtml = () => sections.map(sec => {
        const ids = order.filter(id => secOf(byId[id]) === sec), done = ids.filter(id => /^(ans|am)$/.test(status(id))).length;
        return `<div class="pal-sec">${sections.length > 1 ? `<b>${sName(sec)} <span>${done} of ${ids.length} answered</span></b>` : ''}<div class="pal">${order.map((id, i) => { if (secOf(byId[id]) !== sec) return ''; const k = status(id);
          return `<button type="button" class="pb pg ${k}${i === cur ? ' cur' : ''}${icai && GA.pyqLib && GA.pyqLib.cellWide ? GA.pyqLib.cellWide(cellNo(i)) : ''}" data-go="${i}" aria-label="${qName(i)}, ${LBL[k]}"${i === cur ? ' aria-current="true"' : ''}>${cellNo(i)}${k === 'am' ? tickSvg : ''}</button>`; }).join('')}</div></div>`;
      }).join('');
    const legendHtml = () => { const cnt = tally();
      return ['ans', 'na', 'nv', 'mk', 'am'].map(k => `<span${k === 'am' ? ' class="w"' : ''}>${glyph(k)}${cnt[k]} ${LBL[k]}</span>`).join(''); };
    // the section tabs carry their answered counts (P2-30 page plan: 'GA / CS & IT tabs with counts'), painted with the palette
    const tabs = sections.length > 1 ? `<div class="seg xm-tabs" role="group" aria-label="Section">${sections.map(sec => `<button type="button" data-sec="${sec}" aria-pressed="false"><span>${icai ? icaiSecShort(sec) : secName(sec)}</span><small class="xm-tc num"></small></button>`).join('')}</div>` : '';
    out.innerHTML = `<div class="exam xm pr-page${cbt ? ' cbt' : ''}">
      <header class="pr-head xm-head"><div class="pr-ht"><h1>${esc(lv.title)}</h1><p${icai && choiceNote ? ` title="${esc(choiceNote)}"` : ''}>${icai ? `${U.plural(order.length, 'item')} · ${U.plural(totalMarks, 'mark')} · no negative marking${choiceNote ? ' · ' + esc(choiceNote) : ''}` : `${order.length} questions · ${totalMarks} marks · official marking${cbt ? ' · an answer counts once saved' : ''}`}</p></div>
        <div class="xm-hacts">${tabs}<button class="btn" id="calc" type="button" data-calc aria-controls="ex-calc" aria-expanded="false">${icon('sigma')}<span>Calculator</span></button><button class="btn" id="end" type="button" data-end>Submit test</button></div></header>
      <div class="xm-bar" role="group" aria-label="Test controls"><b class="xm-bt">${esc(lv.title)}</b><div class="xm-clock num" id="clock2" role="timer" aria-label="Time left">--:--</div><button class="btn icon sm" type="button" data-pause aria-label="Pause the test">${icon('pause')}</button><span class="grow"></span><button class="btn sm xm-cb" type="button" data-calc aria-controls="ex-calc" aria-expanded="false" aria-label="Calculator">${icon('sigma')}<span>Calculator</span></button><button class="btn sm xm-palb" id="palb" type="button" aria-haspopup="dialog" aria-controls="xm-side" aria-expanded="false">${icon('grid')}<span class="xm-pt"><b id="palb-q">1 of ${order.length}</b><small id="palb-a">0 answered</small></span></button></div>
      <div class="prac xm-main"><section class="xm-q" aria-label="Question"><div id="qhost" tabindex="-1" data-focus></div><div class="xm-paused" id="ex-paused" hidden><div>${icon('pause')}<b>Paused</b><p>The clock is stopped and the question is hidden.</p><button class="btn primary" type="button" data-pause>${icon('play')}<span>Resume</span></button></div></div>
        <div class="xm-act" role="group" aria-label="Answer actions"><button class="btn" id="prev" type="button">${icon('arrow-l')}<span class="l">Previous</span></button><button class="btn" id="mark" type="button">${icon('flag')}<span class="l">Mark for review &amp; next</span><span class="s">Mark &amp; next</span></button><button class="btn ghost" id="clear" type="button">${icon('x')}<span class="l">Clear response</span><span class="s">Clear</span></button><button class="btn pop" id="next" type="button"><span class="l">Save &amp; next</span>${icon('arrow-r')}</button></div></section>
        <div class="xm-scrim" hidden></div>
        <aside class="xm-side" id="xm-side" aria-labelledby="xm-ph"><div class="pr-panel xm-pp"><div class="xm-sh"><h2 class="pr-h4" id="xm-ph">Question palette</h2><span class="xm-st">${esc(lv.title)}</span><button class="btn icon sm ghost xm-x" type="button" data-palclose aria-label="Close the palette">${icon('x')}</button></div>
          <div class="pr-timer xm-timer"><div><b class="num xm-clock" id="clock" aria-live="off">--:--</b><small id="clock-l">left of ${Math.round(lv.limitMs / 60000)} min · counts only while this page is open</small></div><button class="btn icon sm" type="button" data-pause aria-label="Pause the test">${icon('pause')}</button></div>
          <div id="pal" class="xm-pal"></div><div class="xm-sf"><div class="pal-legend pr-legend" id="pal-lg"></div><div class="xm-sfa"><button class="btn ghost sm xm-ins" type="button" data-instr>${icon('info')}<span>Instructions</span></button><button class="btn xm-subm" type="button" data-end>Submit test</button></div></div></div>
          <p class="pr-keys">Keys: <kbd>A</kbd>–<kbd>D</kbd> choose · <kbd>S</kbd> save &amp; next · <kbd>N</kbd> / <kbd>P</kbd> next / previous · <kbd>M</kbd> mark · <kbd>X</kbd> clear</p></aside></div></div>`;

    const $ = s => U.$(s, out);
    const side = $('#xm-side'), scrim = $('.xm-scrim'), palb = $('#palb'), root = $('.xm');
    function flush() { S.update(s => { if (s.live && s.live.id === lv.id) Object.assign(s.live, { cur, elapsedMs: lv.elapsedMs, pausedMs: lv.pausedMs, responses: lv.responses, visited: lv.visited, marked: lv.marked, times: lv.times, calc: lv.calc, draft: lv.draft || null, warned: lv.warned }); }, 'live'); }
    const flushSoon = () => { clearTimeout(saveT); saveT = setTimeout(flush, 600); };
    function paintPalb() {
      const c = tally(), a = c.ans + c.am;
      $('#palb-q').textContent = `${cur + 1} of ${order.length}`;
      $('#palb-a').textContent = `${a} answered`;
      palb.setAttribute('aria-label', `Question palette: ${qName(cur)}, ${cur + 1} of ${order.length}, ${a} answered`);
    }
    function paintTabs() {
      U.$$('[data-sec]', out).forEach(b => {
        const ids = order.filter(id => secOf(byId[id]) === b.dataset.sec), done = ids.filter(id => /^(ans|am)$/.test(status(id))).length, c = U.$('.xm-tc', b);
        if (c) c.textContent = `${done}/${ids.length}`;
        b.setAttribute('aria-label', `${sName(b.dataset.sec)}, ${done} of ${ids.length} answered`);
      });
    }
    function paintPal(focusCur) {
      const had = document.activeElement && $('#pal').contains(document.activeElement);
      $('#pal').innerHTML = paletteHtml(); $('#pal-lg').innerHTML = legendHtml();
      if (had || focusCur) { const c = $(`#pal [data-go="${cur}"]`); if (c) c.focus({ preventScroll: true }); }   // P1-48: focus never falls to the page
      paintPalb(); paintTabs();
    }

    /* the palette sheet (at 980 px and below): Back, Escape, the scrim and the close button close it; Tab stays inside it */
    let sheet = null;
    function openSheet(from) {
      if (sheet || finished) return;
      if (calc) calc.close(true);
      const opener = from || document.activeElement;
      root.classList.add('pal-open'); scrim.hidden = false; palb.setAttribute('aria-expanded', 'true');
      side.setAttribute('role', 'dialog'); side.setAttribute('aria-modal', 'true');
      const away = U.$$('.xm-q, .xm-bar, .xm-head', out); away.forEach(el => (el.inert = true));
      const untrap = UI.trap ? UI.trap(side) : () => {};
      const ov = UI.overlay ? UI.overlay.push({ id: 'xm-pal', kind: 'sheet', close: () => closeSheet({ fromBack: true }) }) : null;
      sheet = { opener, away, untrap, ov };
      const c = $(`#pal [data-go="${cur}"]`) || $('[data-palclose]');
      setTimeout(() => { if (sheet && c && c.isConnected) c.focus({ preventScroll: true }); }, 30);
    }
    function closeSheet(o) {
      if (!sheet) return;
      const s = sheet; sheet = null; o = o || {};
      root.classList.remove('pal-open'); scrim.hidden = true; palb.setAttribute('aria-expanded', 'false');
      side.removeAttribute('role'); side.removeAttribute('aria-modal');
      s.away.forEach(el => (el.inert = false)); s.untrap();
      if (!o.fromBack && s.ov && UI.overlay && UI.overlay.has && UI.overlay.has(s.ov)) UI.overlay.pop(s.ov);
      if (o.focus === 'q') { const f = U.$('.qc-o input, .qc-nat input', out) || $('#qhost'); if (f) f.focus({ preventScroll: true }); }
      else if (o.focus === 'palb') palb.focus({ preventScroll: true });
      else if (o.focus !== false && s.opener && s.opener.isConnected) s.opener.focus({ preventScroll: true });
    }
    palb.addEventListener('click', () => (sheet ? closeSheet() : openSheet(palb)));
    scrim.addEventListener('click', () => closeSheet());
    U.on(out, 'click', '[data-palclose]', () => closeSheet());
    side.addEventListener('keydown', e => { if (sheet && e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeSheet(); } });
    const onMQ = () => { if (!sheetMQ.matches) closeSheet({ focus: false }); };
    if (sheetMQ.addEventListener) sheetMQ.addEventListener('change', onMQ);

    /** GATE: moving away from a question drops a choice that was not saved (cbt only). → the words to say, or '' */
    function leaveDraft(id) {
      if (!cbt || draft === undefined) { lv.draft = null; draft = undefined; return ''; }
      const r = TG.commit(lv, byId[id], 'leave', draft);
      draft = undefined; lv.draft = null;
      if (!r.lost) return '';
      const msg = `Not saved: your choice on ${qName(order.indexOf(id))} was dropped. Save & next keeps an answer.`;
      UI.toast(msg);
      return msg;
    }
    function show(i, o) {
      if (finished) return;
      o = o || {};
      const next = U.clamp(i, 0, order.length - 1);
      if (next === cur && card) o.kept = true;            // re-opening the open question keeps its unsaved choice
      const lost = card && !o.kept ? leaveDraft(order[cur]) : '';
      cur = next;
      const id = order[cur], q = byId[id];
      lv.visited[id] = true;
      if (card && card.destroy) card.destroy();
      $('#qhost').innerHTML = '';
      draft = undefined;
      if (cbt && lv.draft && lv.draft.id === id) draft = lv.draft.r;       // a resumed sitting keeps the choice it was left with
      else lv.draft = null;
      card = GA.qcard.create({ ...q }, { mode: 'exam', resp: draft !== undefined ? draft : lv.responses[id], progress: { i: cur + 1, n: order.length, label: isPaper ? (icai ? `${icaiSecShort(secOf(q))} · ${q.label}` : `${secName(q.section)} · Q${q.no}`) : sections.length > 1 ? sName(secOf(q)) : '' },
        onChange: r => {
          if (cbt) { draft = r == null || (Array.isArray(r) && !r.length) ? null : r; lv.draft = { id, r: draft }; flushSoon(); return; }
          // P0-16: a NAT box holds an answer only when it is a real number; anything else is no answer (the tile stays 'not answered')
          if (r == null || (Array.isArray(r) && !r.length) || !SC.answered(q, r)) delete lv.responses[id]; else lv.responses[id] = r;
          flushSoon(); paintPal();
        } });
      // exam mode hides identity: strip the header so the paper year, subject and topic are not hints. The marks, the type and the marking rule
      // are the progress row's one line (P2-30: the rule once per screen); MSQ and NAT keep a how-to line, MCQs need none
      const hd = U.$('.qc-h', card.el); if (hd) hd.remove();
      const src = U.$('.qc-src', card.el); if (src) src.remove();
      const mt = U.$$('.qc-prog > span', card.el).find(s => /\bmarks?\b · (MCQ|MSQ|NAT|Descriptive)$/.test(s.textContent.trim()) || /^(RTP, no marks|no marks printed) · /.test(s.textContent.trim()));
      if (mt) mt.textContent = ruleLine(q);
      const pad = cbt && q.type === 'NAT' ? natPad(card.el) : null;
      U.$$('.qc-hint', card.el).forEach(h => { const t = howTo(q, !!pad); if (t) h.textContent = t; else h.remove(); });
      $('#qhost').append(card.el);
      paintPal(o.focusPal);
      const mk = lv.marked[id];
      U.$('.l', $('#mark')).textContent = !cbt && mk ? 'Unmark & next' : 'Mark for review & next';
      U.$('.s', $('#mark')).textContent = !cbt && mk ? 'Unmark' : 'Mark & next';
      // P1-48: a focused Previous that becomes disabled on the first question hands focus to Save & next instead of the page
      const prev = $('#prev'), gone = document.activeElement === prev && cur === 0;
      prev.disabled = cur === 0;
      if (gone) $('#next').focus({ preventScroll: true });
      U.$('.l', $('#next')).textContent = cur === order.length - 1 ? 'Save' : 'Save & next';
      U.$$('[data-sec]', out).forEach(b => { const on = b.dataset.sec === secOf(q); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
      if (o.say !== false && UI.say) UI.say(`${lost ? lost + ' ' : ''}${qName(cur)} of ${isPaper ? lv.qids.length + ' questions' : order.length}`);
      flush();
    }
    const go = d => show(cur + d);
    /** Save & next and Mark for review & next: in a GATE sitting they save the draft (and mark or unmark); in a short test the answer is
        already saved, so Mark toggles the flag */
    function saveAnd(markIt) {
      const id = order[cur], q = byId[id];
      if (cbt) { TG.commit(lv, q, markIt ? 'mark' : 'save', draft); draft = undefined; lv.draft = null; }
      else if (markIt) { if (lv.marked[id]) delete lv.marked[id]; else lv.marked[id] = true; }
      show(cur === order.length - 1 ? cur : cur + 1, { kept: true });
    }
    U.on(out, 'click', '[data-go]', (e, b) => {
      // in the sheet a tap opens the question and closes the sheet (focus goes to the question); beside the question focus stays on the cell
      if (sheet) { show(+b.dataset.go); closeSheet({ focus: 'q' }); } else show(+b.dataset.go, { focusPal: true });
    });
    U.on(out, 'click', '[data-sec]', (e, b) => { const i = order.findIndex(id => secOf(byId[id]) === b.dataset.sec); if (i >= 0 && i !== cur) show(i); });
    roving($('.xm-tabs'));
    $('#next').addEventListener('click', () => saveAnd(false));
    $('#prev').addEventListener('click', () => go(-1));
    $('#clear').addEventListener('click', () => {
      const id = order[cur];
      if (cbt) { TG.commit(lv, byId[id], 'clear'); draft = undefined; lv.draft = null; } else delete lv.responses[id];
      card.setResponse(null); const nat = U.$('.qc-nat input', card.el); if (nat) nat.value = '';
      paintPal(); flush();
    });
    $('#mark').addEventListener('click', () => saveAnd(true));
    calc = calcPanel(out, lv, flushSoon);
    U.on(out, 'click', '[data-calc]', (e, b) => { if (calc) calc.toggle(b); });
    U.on(out, 'click', '[data-instr]', (e, b) => {
      // the instructions during the test (GATE keeps its clock running while they are open)
      if (sheet) closeSheet({ focus: 'palb' });
      UI.modal({ title: 'Instructions', wide: true, body: `<div class="xb xb-in">${briefHtml(lv, qsInOrder, { modal: true })}</div>`, actions: [{ label: 'Back to the test', kind: 'primary' }] });
    });

    /* pause: the clock stops and the question is hidden (time only counts while the page is open and visible). Paused time is kept for the
       result's 'Paused 12 min' (P3-23). */
    function setPaused(v) {
      if (finished || v === paused) return;
      paused = v;
      if (v) pausedAt = Date.now(); else if (pausedAt) { lv.pausedMs += Date.now() - pausedAt; pausedAt = 0; }
      $('#ex-paused').hidden = !v; $('#qhost').hidden = v; $('.xm-act').classList.toggle('off', v);
      U.$$('[data-pause]', out).forEach(b => { if (b.closest('#ex-paused')) return; b.innerHTML = icon(v ? 'play' : 'pause'); b.setAttribute('aria-label', v ? 'Resume the test' : 'Pause the test'); });
      U.$$('.xm-act .btn', out).forEach(b => (b.disabled = v || (b.id === 'prev' && cur === 0)));
      if (v && calc) calc.close(true);
      if (v) closeSheet({ focus: false });
      if (!v) { const r = U.$('.qc-o input, .qc-nat input', out); if (r) r.focus({ preventScroll: true }); } else U.$('#ex-paused .btn', out).focus();
      flush();
    }
    U.on(out, 'click', '[data-pause]', () => setPaused(!paused));

    /** the Submit summary (P1-28): GATE's five statuses per section and in total, so the numbers add up to the questions; in a GATE sitting
        an unsaved choice on the open question is named, because it will not be evaluated */
    function summaryHtml() {
      const c = TG.counts ? TG.counts(order.map(id => byId[id]), lv) : null;
      const pend = cbt && draft !== undefined && TG.commit(lv, byId[order[cur]], 'leave', draft).lost
        ? `<p class="xm-sum-w">${icon('alert')}<span>Your choice on ${qName(cur)} is not saved, so it will not be evaluated. Keep working and press Save &amp; next to keep it.</span></p>` : '';
      if (!c) { const t = tally(); return `${pend}<p class="muted" style="margin:6px 0 0">You have answered <b>${t.ans + t.am}</b> of ${order.length}. ${t.na + t.nv + t.mk} unanswered. Answered and marked questions will be evaluated. You cannot change answers after submitting.</p>`; }
      const cols = c.sections.length > 1 ? c.sections.concat([Object.assign({ sec: 'all' }, c.total)]) : c.sections;
      const head = cols.map(s => `<th class="r" scope="col">${s.sec === 'all' ? 'Total' : icai ? esc(icaiSecShort(s.sec)) : s.sec === 'GA' ? 'GA' : 'CS &amp; IT'}</th>`).join('');
      const row = (k, label) => `<tr><th scope="row">${glyph(k)}${label}</th>${cols.map(s => `<td class="r num">${s[k]}</td>`).join('')}</tr>`;
      const t = c.total;
      return `${pend}<p class="xm-sum-l">You have answered <b>${t.answered}</b> of ${t.total}; <b>${t.unanswered}</b> ${t.unanswered === 1 ? 'is' : 'are'} unanswered.</p>
        <div class="tw"><table class="t xm-sum"><thead><tr><th scope="col">Status</th>${head}</tr></thead><tbody>${row('ans', 'Answered')}${row('am', 'Answered &amp; marked')}${row('mk', 'Marked, no answer')}${row('na', 'Not answered')}${row('nv', 'Not visited')}</tbody>
        <tfoot><tr><th scope="row">Questions</th>${cols.map(s => `<td class="r num"><b>${s.total}</b></td>`).join('')}</tr></tfoot></table></div>
        <p class="xm-sum-n">${icai ? `Answered &amp; marked questions are evaluated. You cannot change answers after submitting${order.some(id => byId[id].type === 'DESC') ? '; next you mark your descriptive answers against ICAI’s' : ''}.` : 'Answered &amp; marked questions will be evaluated. You cannot change answers after submitting.'}</p>`;
    }
    /** P0-02: one Submit at a time; time-up while the dialog is open closes it and submits once; nothing is stored twice */
    function askSubmit() {
      return new Promise(res => {
        dlg = UI.modal({ title: 'Submit the test?', onclose: v => { dlg = null; res(v === true); }, focus: '.m-actions .btn',
          body: summaryHtml(), actions: [{ label: 'Keep working', value: false }, { label: 'Submit', kind: 'primary', value: true }] });
      });
    }
    let asking = false;
    async function submit(auto) {
      if (finished) return;
      if (!auto) {
        if (asking) return;
        asking = true;
        // P1-48: from the palette sheet, the dialog hands focus back to the palette button (the sheet's own Submit is hidden once it closes)
        if (sheet) closeSheet({ focus: 'palb' });
        const ok = await askSubmit();
        asking = false;
        if (!ok || finished) return;
      }
      finished = true;
      if (dlg) { const d = dlg; dlg = null; d.close(false); }
      if (calc) calc.close(true);
      closeSheet({ focus: false });
      if (paused && pausedAt) { lv.pausedMs += Date.now() - pausedAt; pausedAt = 0; }
      clearInterval(tick); clearTimeout(saveT); document.removeEventListener('keydown', key); document.body.classList.remove('in-exam', 'calc-open');
      lv.draft = null;                                   // GATE evaluates saved answers only
      let rec = TG.summarise(D, lv, lv, order.map(id => byId[id]));
      if (icai) { rec = TG.icaiRecord(D, rec, order.map(id => byId[id])); rec.sub = lv.sub || null; rec.pendingMarks = rec.pending || 0; }
      GA.actions.finishTest(rec, order.map(id => byId[id]));
      S.update(s => { if (s.live && s.live.id === lv.id) s.live = null; }, 'live');
      GA.views.testresult._arrive = rec.id;            // the result's score counts up once, on arrival from Submit (P2-69)
      GA.router.go((icai && rec.pendingMarks ? '/test/mark/' : '/test/result/') + rec.id);
    }
    U.on(out, 'click', '[data-end]', () => submit(false));
    // clock: counts only while this page is open, visible and not paused; each second goes to the open question too, so the times add up to
    // the clock (P3-23). One-time warnings at 10 and 2 minutes left (P3-24), kept with the test so a resumed sitting does not repeat them.
    let lastTick = Date.now();
    const clockEls = [$('#clock'), $('#clock2')];
    const paint = () => { const rem = remaining(), t = U.clock(Math.max(0, rem)); clockEls.forEach(c => { c.textContent = t; c.classList.toggle('low', rem < 10 * 60000); c.classList.toggle('crit', rem < 2 * 60000); }); };
    const warn = m => {
      if (lv.warned[m] || lv.limitMs <= (m + 1) * 60000 || remaining() > m * 60000 || remaining() <= 0) return;
      lv.warned[m] = 1; UI.toast(`${U.plural(m, 'minute')} left`, m <= 2 ? 'bad' : undefined); flush();
    };
    tick = setInterval(() => {
      if (finished) return;
      const now = Date.now(), dt = Math.min(Math.max(0, now - lastTick), 2000); lastTick = now;
      if (!document.hidden && !paused) { lv.elapsedMs += dt; const id = order[cur]; lv.times[id] = (lv.times[id] || 0) + dt; }
      paint(); warn(10); warn(2);
      if (!paused && Math.floor(lv.elapsedMs / 1000) % 10 === 0) flush();
      if (remaining() <= 0) { UI.toast('Time is up: submitting.', 'bad'); submit(true); }
    }, 1000);
    paint();
    /* P0-13: shortcuts never grade or leave by accident. A key the page or the card already handled, a held key, typing in a field, the
       calculator and open dialogs or sheets are left alone; arrows never navigate from options, tabs or other controls (N / P and J / K do);
       A–D choose, S saves and moves on, M marks, X clears (C is an option letter). Single-key shortcuts honour the Settings switch (P3-17). */
    const key = e => {
      if (finished || e.defaultPrevented || e.repeat) return;
      if (e.key && e.key.length === 1 && UI.singleKeys && !UI.singleKeys()) return;
      const t = e.target, tag = t && t.tagName;
      const box = t && (/^(TEXTAREA|SELECT)$/.test(tag) || t.isContentEditable || (tag === 'INPUT' && !/^(checkbox|radio)$/.test(t.type)));
      if (box || paused || sheet || e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('.scrim') || (UI.overlay && UI.overlay.size && UI.overlay.size()) || (t && t.closest && t.closest('.ex-calc'))) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key, q = byId[order[cur]];
      const control = t && t !== document.body && (/^(BUTTON|A|SUMMARY|INPUT|SELECT)$/.test(tag) || (t.getAttribute && /^(radio|tab|button)$/.test(t.getAttribute('role') || '')));
      if (k.length === 1 && 'abcd'.includes(k) && (q.type === 'MCQ' || q.type === 'MSQ')) { const i = U.$(`.qc-o[data-k="${k.toUpperCase()}"] input`, out); if (i) { e.preventDefault(); i.click(); } }
      else if (k === 'n' || k === 'j') { e.preventDefault(); go(1); }
      else if (k === 'p' || k === 'k') { e.preventDefault(); go(-1); }
      else if ((k === 'ArrowRight' || k === 'ArrowLeft') && !control) { e.preventDefault(); go(k === 'ArrowRight' ? 1 : -1); }
      else if (k === 's') { e.preventDefault(); $('#next').click(); }
      else if (k === 'm') { e.preventDefault(); $('#mark').click(); }
      else if (k === 'x') { e.preventDefault(); $('#clear').click(); }
    };
    document.addEventListener('keydown', key);
    const unload = () => { if (paused && pausedAt) { lv.pausedMs += Date.now() - pausedAt; pausedAt = Date.now(); } flush(); };
    window.addEventListener('beforeunload', unload);
    GA.views.testrun._cleanup = () => {
      clearInterval(tick); clearTimeout(saveT); document.removeEventListener('keydown', key); window.removeEventListener('beforeunload', unload);
      if (sheetMQ.removeEventListener) sheetMQ.removeEventListener('change', onMQ);
      document.body.classList.remove('in-exam', 'calc-open');
      if (calc && calc.destroy) calc.destroy();
      if (dlg) { const d = dlg; dlg = null; d.close(false); }
      if (sheet) { const s = sheet; sheet = null; s.away.forEach(el => (el.inert = false)); s.untrap(); }
      if (card && card.destroy) card.destroy();
      if (!finished) { if (paused && pausedAt) { lv.pausedMs += Date.now() - pausedAt; pausedAt = 0; } flush(); }
    };
    show(cur, { say: false });
    if (fromBrief) {
      // the briefing is replaced in place, with no route change, so the router does not reset the scroll: the runner opens at its top. On a
      // short screen (the bars are static under 560 px of height) a learner who read the briefing to its end would otherwise start 100–300 px
      // down, with the exam bar, its clock and the question's first lines off-screen while the clock runs
      out.scrollTop = 0; g.scrollTo(0, 0);
      // focus goes to the first option when it is in view (above the action row); under a long stem it goes to the question itself, so the
      // first Tab reaches the options and the screen stays at the top
      const f = U.$('.qc-o input, .qc-nat input', out), host = $('#qhost'), act = $('.xm-act');
      const r = f && f.getBoundingClientRect(), lim = Math.min(g.innerHeight || 0, act ? act.getBoundingClientRect().top : Infinity);
      const to = f && r.top >= 0 && r.bottom <= lim ? f : host;
      if (to) to.focus({ preventScroll: true });
      if (UI.say) UI.say(`The clock has started. ${qName(cur)} of ${order.length}`);
    }
  }

  /* ------------------------------------------------------------ self-marking an ICAI sitting (docs/ICAI_BANK.md §7) */
  /** after Submit: each answered descriptive item with your answer and ICAI's answer, and the marks you give yourself (0 to its marks, in
      halves). The paper's choices are applied when the marks are saved; Finish marking re-scores the sitting and opens the result. */
  GA.views.testmark = {
    async enter(ctx, out) {
      const D = DATA.D, S = GA.store, t = S.state.tests.find(x => x.id === ctx.params.id);
      if (!t) { if (GA.shell.notFound) GA.shell.notFound({ kind: 'test', id: ctx.params.id, back: { href: '#/test', label: 'Back to tests' } }); return; }
      GA.shell.crumbs([['Tests', '#/test'], [t.title, '#/test/mark/' + t.id]]);
      let qs;
      try { qs = await DATA.questions(t.qids); }
      catch (err) { if (ctx.stale()) return; if (UI.loadFailed) UI.loadFailed(out, { what: 'test', main: true }); return; }
      if (ctx.stale()) return;
      const by = Object.fromEntries(qs.map(q => [q.id, q])), resp = t.responses || {}, states = t.states || {};
      const items = t.qids.map(id => by[id]).filter(q => q && q.type === 'DESC' && SC.descAttempted(resp[q.id]));
      if (!items.length) { GA.router.go('/test/result/' + t.id, null, true); return; }
      const p = t.paper ? D.paperById[t.paper] : null, cl = p && t.kind === 'paper' ? choiceLines(p) : [];
      const marks = {};
      items.forEach(q => { const m = SC.selfMarks(resp[q.id], q.marks || 0); if (m != null) marks[q.id] = m; });
      const step = q => ((q.marks || 0) >= 1 ? 0.5 : 0.5);
      items.forEach(q => { if (!q.marks && resp[q.id] && resp[q.id].g) marks[q.id] = resp[q.id].g; });
      const GR = [['got', 'Got it'], ['partly', 'Partly'], ['missed', 'Missed']];
      const mk = q => {
        const max = q.marks || 0, v = marks[q.id], ex = states[q.id] === 'excess';
        // an item that prints no marks (an RTP's) is graded, not marked
        if (!max) return `<section class="pr-panel tm-item" data-q="${esc(q.id)}" aria-labelledby="tm-h-${esc(q.id)}">
          <div class="tm-h"><h2 id="tm-h-${esc(q.id)}">${esc(q.label)} · no marks printed</h2></div><div class="tm-card"></div>
          <div class="tm-give" role="group" aria-label="How your answer to ${esc(q.label)} compares with ICAI's"><span class="tm-l">Your answer</span>${GR.map(g => `<button type="button" class="btn sm${v === g[0] ? ' on' : ''}" data-g="${g[0]}" aria-pressed="${v === g[0]}">${g[1]}</button>`).join('')}</div></section>`;
        return `<section class="pr-panel tm-item" data-q="${esc(q.id)}" aria-labelledby="tm-h-${esc(q.id)}">
          <div class="tm-h"><h2 id="tm-h-${esc(q.id)}">${esc(q.label)}${max ? ` · ${U.plural(max, 'mark')}` : ''}</h2>${ex ? '<span class="tm-ex">not counted: beyond the questions or parts this paper lets you answer</span>' : ''}</div>
          <div class="tm-card"></div>
          <div class="tm-give" role="group" aria-label="Your marks for ${esc(q.label)}">
            <span class="tm-l">Your marks</span>
            <button type="button" class="btn icon sm" data-d="-1" aria-label="Half a mark less">${icon('minus')}</button>
            <input class="input num tm-v" type="number" inputmode="decimal" min="0" max="${max}" step="${step(q)}" value="${v != null ? v : ''}" placeholder="–" aria-label="Marks for ${esc(q.label)}, out of ${max}">
            <span class="tm-of">of ${max}</span>
            <button type="button" class="btn icon sm" data-d="1" aria-label="Half a mark more">${icon('plus')}</button>
            <span class="tm-q"><button type="button" class="btn sm ghost" data-set="${max}">Full</button><button type="button" class="btn sm ghost" data-set="${max / 2}">Half</button><button type="button" class="btn sm ghost" data-set="0">Zero</button></span>
          </div></section>`;
      };
      out.innerHTML = `<div class="tm pr-page">
        <header class="pr-head"><div class="pr-ht"><h1>Mark your answers</h1><p>${esc(t.title)} · ${U.plural(items.length, 'descriptive answer')} to mark. Read ICAI’s answer, then give yourself the marks an examiner would.${cl.length ? ` ${esc(cl.join('; '))}.` : ''}</p></div></header>
        <p class="tm-how">${icon('info')}<span>Be honest: full marks count as <b>Got it</b>, some marks as <b>Partly</b> and none as <b>Missed</b>. Partly and Missed go to your error notebook and come back for revision. MCQs are already marked against ICAI’s key.</span></p>
        <div class="tm-list">${items.map(mk).join('')}</div>
        <div class="tm-foot pr-panel"><span id="tm-n" aria-live="polite"></span><span class="grow"></span><a class="btn ghost" href="#/test/result/${esc(t.id)}">Mark later</a><button class="btn pop" type="button" id="tm-go">${icon('check')}<span>Finish marking</span></button></div>
      </div>`;
      items.forEach(q => {
        const host = U.$(`[data-q="${CSS.escape(q.id)}"] .tm-card`, out);
        const c = GA.qcard.create(q, { mode: 'review', resp: resp[q.id], state: 'pending' });
        const fb = U.$('.qc-fb', c.el); if (fb) fb.remove();                 // the verdict is what this page asks for
        host.append(c.el);
      });
      const $ = sel => U.$(sel, out);
      const count = () => { const n = items.filter(q => marks[q.id] != null).length; $('#tm-n').textContent = `${n} of ${items.length} marked`; };
      const setV = (q, v) => {
        const max = q.marks || 0;
        if (v === '' || v == null || !isFinite(+v)) { delete marks[q.id]; }
        else marks[q.id] = SC.selfMarks({ m: +v }, max);
        const inp = U.$(`[data-q="${CSS.escape(q.id)}"] .tm-v`, out);
        if (inp && document.activeElement !== inp) inp.value = marks[q.id] != null ? marks[q.id] : '';
        count();
      };
      U.on(out, 'click', '[data-d]', (e, b) => { const q = by[b.closest('[data-q]').dataset.q]; const cur = marks[q.id] != null ? marks[q.id] : 0; setV(q, cur + 0.5 * (+b.dataset.d)); });
      U.on(out, 'click', '[data-set]', (e, b) => setV(by[b.closest('[data-q]').dataset.q], +b.dataset.set));
      U.on(out, 'click', '.tm-give [data-g]', (e, b) => { const box = b.closest('[data-q]'); marks[box.dataset.q] = b.dataset.g; U.$$('[data-g]', box).forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); }); count(); });
      out.addEventListener('change', e => { const i = e.target.closest && e.target.closest('.tm-v'); if (i) { setV(by[i.closest('[data-q]').dataset.q], i.value); i.value = marks[by[i.closest('[data-q]').dataset.q].id] != null ? marks[by[i.closest('[data-q]').dataset.q].id] : ''; } });
      count();
      $('#tm-go').addEventListener('click', async () => {
        const left = items.filter(q => marks[q.id] == null).length;
        if (left && !(await UI.confirm(`${U.plural(left, 'answer')} ${left === 1 ? 'has' : 'have'} no marks yet: ${left === 1 ? 'it counts' : 'they count'} as 0 (Missed).`, { ok: 'Finish anyway' }))) return;
        const give = Object.assign({}, marks);
        items.forEach(q => { if (give[q.id] == null) give[q.id] = q.marks ? 0 : 'missed'; });
        GA.actions.markTest(t.id, give, qs);
        GA.views.testresult._arrive = t.id;
        GA.router.go('/test/result/' + t.id);
      });
    }
  };

  /* ------------------------------------------------------------ result */
  /** the shared next step as Home prints it (P1-56, P0-08): a two-line coral, 'Start here · Programming & DS · 30 min' over the lesson's title */
  function stepCoral(step, cls) {
    const sj = step.subject && DATA.D.subjectById[step.subject];
    const kick = [step.label, sj ? (U.medName ? U.medName(sj.name) : sj.name) : '', step.minutes ? step.minutes + ' min' : ''].filter(Boolean).join(' · ');
    return `<a class="btn pop ${cls || ''} tr-cta2" href="${esc(step.href)}"><span class="tr-cta-t"><small>${esc(kick)}</small><span>${esc(step.title)}</span></span>${icon('arrow-r')}</a>`;
  }
  /** the sitting split into its parts for the cobalt half or the strip (P2-32, P2-69): GA vs CS & IT, 1-mark vs 2-mark; a short test without
      either split shows its MCQ / MSQ / NAT split */
  function partsOf(bySec, byMarks, byType) {
    const P = (e, label) => ({ score: e.score, max: e.max, label });
    const out = [];
    if (bySec.GA && bySec.CS && bySec.GA.max && bySec.CS.max) out.push(P(bySec.GA, 'General Aptitude'), P(bySec.CS, 'CS & IT'));
    if (byMarks['1'] && byMarks['2'] && byMarks['1'].max && byMarks['2'].max) out.push(P(byMarks['1'], '1-mark questions'), P(byMarks['2'], '2-mark questions'));
    if (!out.length) ['MCQ', 'MSQ', 'NAT'].forEach(t => { if (byType[t] && byType[t].max) out.push(P(byType[t], t + 's')); });
    return out.length > 1 ? out : [];
  }
  /** time against the budget per question (P2-33): bars of time ÷ budget with labelled 1× and 2× lines, so the position says 'over budget'
      and the colour only repeats it. Drawn by GA.charts at the host's own width, so its 11.5 px labels are never scaled. */
  function timeChart(rows, w) {
    const items = rows.map((r, i) => ({ label: String(i + 1), v: Math.min(3, r.ratio), color: r.ratio > 2 ? 'var(--bad)' : r.ratio > 1 ? 'var(--warn)' : 'var(--accent)',
      tip: r.ms > 0 ? `Q${i + 1}: ${secs(r.ms)}, ${Math.round(r.ratio * 10) / 10}× its ${secs(r.budget)} budget` : `Q${i + 1}: no time on it` }));
    return C.bars(items, { w, h: 180, px: true, max: 3, refs: [{ v: 1, label: '1× budget' }, { v: 2, label: '2×' }], aria: `Time per question as a multiple of its budget, ${rows.length} questions` });
  }
  GA.views.testresult = {
    async enter(ctx, out) {
      const D = DATA.D, S = GA.store, t = S.state.tests.find(x => x.id === ctx.params.id);
      const arrived = GA.views.testresult._arrive === ctx.params.id; GA.views.testresult._arrive = null;
      if (!t && emptyBank(D)) { GA.shell.crumbs([['Tests', '#/test']]); emptyHub(out, D, S.state, S.state.live && S.state.live.id ? S.state.live : null); return; }
      if (!t) {
        if (GA.shell.notFound) { GA.shell.notFound({ kind: 'test', id: ctx.params.id, back: { href: '#/test', label: 'Back to tests' } }); return; }
        GA.shell.crumbs([['Tests', '#/test'], ['Not found', '#/test/result/' + ctx.params.id]]);
        out.innerHTML = UI.empty('timer', 'Result not found', 'This test is not in your history.', `<a class="btn pop" href="#/test">${icon('arrow-l')}<span>Back to tests</span></a>`, { peak: { gaze: 'down', mood: 'think' } }); return;
      }
      GA.shell.crumbs([['Tests', '#/test'], [t.title, '#/test/result/' + t.id]]);
      let qs;
      try { qs = await DATA.questions(t.qids); }
      catch (err) { if (ctx.stale()) return; if (UI.loadFailed) UI.loadFailed(out, { what: 'test', main: true }); else out.innerHTML = UI.empty('alert', 'This result did not load', 'Try again in a moment.', ''); return; }
      if (ctx.stale()) return;
      const by = Object.fromEntries(qs.map(q => [q.id, q]));
      const states = t.states || {}, times = t.times || {}, resp = t.responses || {}, marked = t.marked || {};
      const M = sumOf(t);                                // counted the way GATE counts, also for records stored before the fix (P0-04, P0-05)
      const usedMs = t.usedMs || t.finished - t.started, pausedMs = t.pausedMs || 0;
      const isDiag = t.kind === 'diagnostic', full = isFullKind(t.kind);
      // the splits, from the per-question states (marks to all is not 'correct'; only graded marks count towards 'out of')
      const G = key => (TG.groups ? TG.groups(qs, states, resp, times, key) : {});
      const groups = TG.groups ? G(q => q.subject || '?') : t.bySubject || {};
      const icai = !!t.icai;
      const bySec = G(q => (icai ? (q.sub ? q.sub + ':' : '') + q.section : q.section === 'GA' ? 'GA' : 'CS')), byMarks = G(q => String(q.marks || 1)), byType = G(q => q.type);
      // an ICAI paper sitting: parts, papers and types out of the maxima under the paper's choices, so they add up to the headline's
      if (icai && t.kind === 'paper' && TG.paperChoice && TG.choiceMaxima) TG.choiceMaxima(TG.paperChoice(D, t, qs), qs, { bySection: bySec, bySubject: groups, byType });
      const subj = Object.entries(groups).sort((a, b) => b[1].max - a[1].max || b[1].total - a[1].total);
      const tv = TG.timeVsBudget ? TG.timeVsBudget(t.qids, by, times) : t.qids.map((id, i) => ({ id, i, ms: times[id] || 0, budget: ((by[id] && by[id].marks) || 1) * 108000, ratio: 0 }));
      const slowSet = new Set(tv.filter(r => r.ratio > 2).map(r => r.id));
      const wrongIds = t.qids.filter(id => states[id] === 'wrong' || states[id] === 'partial' || states[id] === 'pending'), skippedIds = t.qids.filter(id => states[id] === 'skipped');
      const markedIds = t.qids.filter(id => marked[id]);
      const easySet = new Set(t.qids.filter(id => by[id] && by[id].diff === 'easy' && (states[id] === 'wrong' || states[id] === 'skipped')));
      const missed = wrongIds.length + skippedIds.length;            // graded questions only: a question without a key is never 'missed'
      const inNotebook = wrongIds.filter(id => S.state.nb && S.state.nb[id] && !S.state.nb[id].resolved).length;
      const fulls = full && M.scored && SC.fullSittings ? SC.fullSittings(S.state.tests, D) : [];
      const stand = full && M.scored && SC.standing ? SC.standing(S.state.tests, t.id, D) : null;
      const xp = M.scored && GA.engage && GA.engage.xpFor ? safe(() => GA.engage.xpFor(S.state, 'test', t.id), 0) : 0;
      let step = null;
      if (isDiag && GA.stats && GA.stats.nextStep) { try { step = GA.stats.nextStep(S.state, D, { kind: 'lesson', scope: 'all', today: U.today() }); } catch (e) { step = null; } }
      // the official yardstick (D11, P2-35): a qualifying-mark line only, for a paper with a sourced official report; never a prediction
      const R = M.scored && t.paper && Array.isArray(D.results) ? D.results.find(r => r && Array.isArray(r.papers) && r.papers.includes(t.paper) && r.qualifying) : null;
      const cats = R ? Object.keys(R.qualifying) : [], prof = (S.state.profile && S.state.profile.category) || '';
      const cat = R ? (cats.includes(prof) ? prof : cats.includes('General') ? 'General' : cats[0]) : null;

      /* ---- the hero: the approved two-half card (P2-69). Left: the score (counting up once on arrival from Submit), real chips, the split
         and the one coral; the cobalt half: the trend of scored full-length sittings, or this sitting's parts when there is no earlier one */
      const scoreS = fm(M.score);
      const chips = [];
      if (stand && stand.best) chips.push(`<span class="tr-chip">${icon('trophy')}Best of ${stand.n} full-length sittings</span>`);
      else if (stand && stand.first) chips.push(`<span class="tr-chip">${icon('flag')}Your first full-length sitting</span>`);
      if (xp > 0) chips.push(`<span class="tr-chip">${icon('bolt')}+${U.nf(xp)} XP</span>`);
      if (stand && stand.prev) {
        const d = stand.delta != null ? stand.delta : stand.deltaPts, unit = stand.delta != null ? (Math.abs(d) === 1 ? 'mark' : 'marks') : (Math.abs(d) === 1 ? 'percentage point' : 'percentage points');
        chips.push(`<span class="tr-chip">${d === 0 ? `Level with your last full-length sitting` : `${d > 0 ? '+' : '−'}${stand.delta != null ? U.fmtMarks(Math.abs(d)) : Math.abs(d)} ${unit} on your last full-length sitting`}</span>`);
      }
      const peak = full && M.scored && stand && (stand.first || stand.best) && GA.mascot && GA.mascot.svg ? `<div class="tr-peak" aria-hidden="true">${GA.mascot.svg({ size: 64, gaze: 'down', mood: 'happy' })}</div>` : '';
      const split = icai
        ? [`<span><i class="ok"></i>${M.correct} full marks</span>`].concat(M.partial ? [`<span><i class="mta"></i>${M.partial} part marks</span>`] : [], [`<span><i class="bad"></i>${M.wrong} no marks</span>`, `<span><i></i>${M.skipped} skipped</span>`], M.excess ? [`<span><i class="ne"></i>${M.excess} not counted</span>`] : [])
        : [`<span><i class="ok"></i>${M.correct} correct</span>`, `<span><i class="bad"></i>${M.wrong} wrong</span>`, `<span><i></i>${M.skipped} skipped</span>`];
      if (M.mta) split.push(`<span><i class="mta"></i>${U.plural(M.mta, 'mark to all', 'marks to all')} · +${U.fmtMarks(M.mtaMarks)}</span>`);
      if (M.notEvaluated) split.push(`<span><i class="ne"></i>${M.notEvaluated} not evaluated</span>`);
      const splitAria = [`${M.correct} correct`, `${M.wrong} wrong`, `${M.skipped} skipped`].concat(M.mta ? [`${M.mta} with marks to all`] : [], M.notEvaluated ? [`${M.notEvaluated} not evaluated`] : []).join(', ');
      const toMark = icai && t.pendingMarks ? `<a class="btn pop" href="#/test/mark/${esc(t.id)}">${icon('edit')}<span>Mark ${U.plural(t.pendingMarks, 'answer')}</span></a>` : '';
      const acts = toMark ? `${toMark}<a class="btn ghost" href="#tr-review" data-jump>Review answers</a>` : !M.scored
        ? `<a class="btn pop" href="#/test">${icon('timer')}<span>Choose another test</span></a><a class="btn ghost" href="#tr-review" data-jump>Review answers</a>`
        : isDiag && step
          ? `${stepCoral(step)}${missed ? `<button class="btn" id="retry" type="button">${icon('refresh')}<span>Retry ${missed} missed</span></button>` : ''}<a class="btn ghost" href="#tr-review" data-jump>Review answers</a>`
          : `${missed ? `<button class="btn pop" id="retry" type="button">${icon('refresh')}<span>Retry ${missed} missed</span></button><a class="btn" href="#/test">${icon('timer')}<span>Another test</span></a>` : `<a class="btn pop" href="#/test">${icon('timer')}<span>Another test</span></a>`}<a class="btn ghost" href="#tr-review" data-jump>Review answers</a>`;
      const parts = !M.scored ? [] : icai ? Object.keys(bySec).filter(k => bySec[k].max).map(k => ({ score: bySec[k].score, max: bySec[k].max, label: icaiSecShort(k) })) : partsOf(bySec, byMarks, byType);
      const trendSide = fulls.length > 1;
      const yard = R && cat != null ? (() => {
        const q = R.qualifying[cat], of = R.outOf || 100, pos = v => Math.max(0, Math.min(100, (100 * v) / of));
        return `<div class="tr-yard"><div class="tr-ybar" role="img" aria-label="Your ${fm(M.score)} against the qualifying mark of ${U.fmtMarks(q)}"><i class="you" style="width:${pos(M.score)}%"></i><i class="cut" style="left:${pos(q)}%"></i></div>
          <p><b>${esc(R.exam)} qualifying mark (${esc(cat)}): ${U.fmtMarks(q)} of ${of}</b><span>From ${esc(R.organiser || 'ICAI')}'s official result${R.source && R.source.url ? ` (<a href="${esc(R.source.url)}" target="_blank" rel="noopener">source</a>)` : ''}. A yardstick, not a prediction.</span></p></div>`;
      })() : '';
      const partTile = p => `<div role="listitem"><b class="num">${fm(p.score)}</b><span>of ${U.fmtMarks(p.max)} · ${esc(p.label)}</span></div>`;
      const right = !M.scored ? '' : trendSide
        ? `<div class="tr-hr">${trendTile(fulls, 'Your full-length sittings', t.id)}${yard}</div>`
        : parts.length ? `<div class="tr-hr"><div class="th-cap"><span>${full ? 'This sitting, part by part' : 'This test, part by part'}</span></div><div class="th-bpx tr-parts${parts.length > 3 ? ' four' : ''}" role="list" aria-label="Marks by part">${parts.map(partTile).join('')}</div>${yard}</div>`
          : yard ? `<div class="tr-hr">${yard}</div>` : '';
      const hero = !M.scored
        ? `<div class="tr-hl"><div class="pr-sub">${esc(KIND[t.kind] || 'Test')} · ${dateTxt(t.finished)}</div><h1>${esc(t.title)}</h1>
            <div class="tr-score tr-ns"><b>Not scored</b></div>
            <p class="tr-note">${icai ? `ICAI prints no marks for these items, so the sitting has no score. Your answers were checked against ICAI’s key and your own Got it / Partly / Missed grades: see the review below. You answered ${M.attempted} of ${M.total}.` : `This paper has no official key, so nothing in it could be graded and the sitting earns no score or XP. You answered ${M.attempted} of ${M.total} questions.`}</p>
            <div class="pr-acts">${acts}</div></div>`
        : `<div class="tr-hl${peak ? ' has-peak' : ''}">${peak}<div class="pr-sub">${esc(KIND[t.kind] || 'Test')} · ${dateTxt(t.finished)}</div><h1>${esc(t.title)}</h1>
            <div class="tr-score"><b class="num"${arrived && !calm() ? ` data-count="${esc(scoreS)}"` : ''}>${scoreS}</b><span>/ ${M.max}</span><em>${pctTxt(M)}</em></div>
            ${chips.length ? `<div class="tr-chips">${chips.join('')}</div>` : ''}
            <div class="tr-split" role="img" aria-label="${splitAria}">${C.stack([{ v: M.correct, color: 'var(--ok)', label: icai ? 'Full marks' : 'Correct' }].concat(icai && M.partial ? [{ v: M.partial, color: 'var(--warn)', label: 'Part marks' }] : [], [{ v: M.wrong, color: 'var(--bad)', label: icai ? 'No marks' : 'Wrong' }, { v: M.skipped, color: 'var(--surface-3)', label: 'Skipped' }], M.mta ? [{ v: M.mta, color: 'var(--accent-soft-2)', label: 'Marks to all' }] : [], M.notEvaluated ? [{ v: M.notEvaluated, color: 'var(--warn-soft)', label: 'Not evaluated' }] : []))}<div class="tr-sl">${split.join('')}</div></div>
            <p class="tr-note">${icai
              ? `Marked the ICAI way: no negative marking; MCQs against ICAI’s key, descriptive answers by your own marks against ICAI’s answers.${t.pendingMarks ? ` <b>${U.plural(t.pendingMarks, 'descriptive answer')} still to mark</b> count${t.pendingMarks === 1 ? 's' : ''} as 0 until you do.` : ''}${t.choiceNote ? ' ' + esc(t.choiceNote) : ''}${M.ungraded ? ` ${U.plural(M.ungraded, 'MCQ')} with an irregular ICAI key ${M.ungraded === 1 ? 'is' : 'are'} not counted.` : ''}`
              : `${M.ungraded ? `${M.ungraded} question${M.ungraded === 1 ? ' has' : 's have'} no official key and ${M.ungraded === 1 ? 'is' : 'are'} not counted. ` : ''}Marked with the bank's scheme: −⅓ / −⅔ for wrong MCQs, nothing negative for MSQ and NAT${M.notEvaluated ? '; the second part of a linked pair is evaluated only when the first part is right' : ''}.`}${isDiag && step && step.reason ? ` Next: ${esc(step.reason)}.` : ''}</p>
            <div class="pr-acts">${acts}</div></div>${right}`;

      /* ---- where the marks went (P2-32): one strip of numbers that appear nowhere else on the screen, then the MCQ / MSQ / NAT table */
      const wrongMcq = wrongIds.filter(id => by[id] && by[id].type === 'MCQ' && !(by[id].group && by[id].group.kind === 'linked' && by[id].group.role === 'second')).length;
      const tile = (n, what) => `<div role="listitem"><b class="num">${n}</b><span>${what}</span></div>`;
      const tiles = [];
      if (trendSide) parts.forEach(p => tiles.push(tile(fm(p.score), `of ${U.fmtMarks(p.max)} · ${esc(p.label)}`)));
      if (icai) { const dq = byType.DESC; if (dq && dq.max) tiles.push(tile(fm(dq.score), `of ${U.fmtMarks(dq.max)} · descriptive, your own marking`)); const mq = byType.MCQ; if (mq && mq.max) tiles.push(tile(fm(mq.score), `of ${U.fmtMarks(mq.max)} · MCQs, ICAI’s key`)); }
      else tiles.push(tile(M.negative ? '−' + U.fmtMarks(M.negative) : '0', M.negative ? `marks lost to ${U.plural(wrongMcq, 'wrong MCQ')}` : 'marks lost to negative marking'));
      tiles.push(tile(M.accuracy != null ? Math.round(M.accuracy * 100) + '%' : '–', M.correct + M.wrong ? `accuracy · ${M.correct} of ${M.correct + M.wrong} graded answers right` : 'accuracy · nothing graded was answered'));
      tiles.push(tile(hm(usedMs / 60000), `of ${hm(t.limitMs / 60000)}${M.total ? ` · ${Math.round(usedMs / 1000 / M.total)} s a question` : ''}${pausedMs >= 30000 ? ` · paused ${hm(pausedMs / 60000)}` : ''}`));
      const typeRows = (icai ? [] : ['MCQ', 'MSQ', 'NAT']).filter(k => byType[k]).map(k => { const e = byType[k]; return `<tr><th scope="row">${k}</th><td class="r">${e.total}</td><td class="r hp">${e.attempted}</td><td class="r">${e.correct}${e.mta ? ` <small class="muted">+${e.mta} to all</small>` : ''}</td><td class="r nw">${e.max ? `<b>${fm(e.score)}</b> / ${U.fmtMarks(e.max)}` : '<span class="muted">no key</span>'}</td><td class="r">${e.lost ? '−' + U.fmtMarks(e.lost) : '—'}</td></tr>`; }).join('');
      const strip = M.scored && !isDiag ? `<section class="pr-panel tr-went" aria-labelledby="tr-h-went"><div class="pr-sec-h"><div><h2 id="tr-h-went">Where the marks went</h2></div></div>
          <div class="tr-kpis" role="list">${tiles.join('')}</div>
          ${!icai && Object.keys(byType).length > 1 ? `<div class="tw"><table class="t tr-types"><thead><tr><th scope="col">Type</th><th class="r" scope="col">Qs</th><th class="r hp" scope="col">Attempted</th><th class="r" scope="col">Correct</th><th class="r" scope="col">Marks</th><th class="r" scope="col">Lost</th></tr></thead><tbody>${typeRows}</tbody></table></div>` : ''}</section>` : '';

      /* ---- what to do next: this test's missed questions per weak subject, the real notebook count, the run-up as a story (P2-32) */
      const next = (() => {
        const items = [];
        if (!M.scored) return icai ? `<a class="rail-a" href="#/notebook">${icon('notebook')}<span>Your misses here are in your error notebook</span></a><a class="rail-a" href="#/test">${icon('timer')}<span>Sit an MTP or a past paper for a score</span></a>`
          : `<div class="rail-a">${icon('info')}<span>Nothing in this sitting could be graded: its paper has no official key. The questions below show our worked answers.</span></div><a class="rail-a" href="#/test">${icon('timer')}<span>Sit a paper with an official key</span></a>`;
        const weak = subj.filter(([k, v]) => D.subjectById[k] && v.correct + v.wrong && v.correct / (v.correct + v.wrong) < 0.6)
          .sort((a, b) => (b[1].max - b[1].score) - (a[1].max - a[1].score)).slice(0, 3);
        weak.forEach(([k, v]) => {
          const ids = t.qids.filter(id => by[id] && by[id].subject === k && (states[id] === 'wrong' || states[id] === 'skipped'));
          if (ids.length) items.push(`<button class="rail-a" type="button" data-again="${esc(ids.join(','))}" data-label="${esc(`${D.subjectById[k].name} missed in ${t.title}`)}">${icon('target')}<span>Retry the ${ids.length === 1 ? 'missed ' + D.subjectById[k].name + ' question' : ids.length + ' missed ' + D.subjectById[k].name + ' questions'} from this test</span><b>${ids.length}</b></button>`);
        });
        if (M.skipped > M.total * 0.2) items.push(`<div class="rail-a">${icon('clock')}<span>You skipped ${M.skipped}: practise a first pass that banks the easy marks quickly</span></div>`);
        if (!icai && M.negative > (M.max || 0) * 0.05) { const nm = U.fmtMarks(M.negative); items.push(`<div class="rail-a">${icon('alert')}<span>Guessing cost ${nm} ${nm === '1' ? 'mark' : 'marks'}: skip MCQs where you cannot eliminate two options</span></div>`); }
        if (inNotebook) items.push(`<a class="rail-a" href="#/notebook">${icon('notebook')}<span>${inNotebook === 1 ? 'Your wrong answer here is' : `${inNotebook} of your wrong answers here are`} in your error notebook</span><b>${inNotebook}</b></a>`);
        // the diagnostic hands over to the day's plan (P1-56: it does not choose the next lesson, so it never says 'your plan starts here')
        if (isDiag) { const day = GA.planner && GA.planner.current ? safe(() => GA.planner.current(), null) : null; items.push(`<a class="rail-a" href="#/plan">${icon('calendar')}<span>Open today's plan</span>${day && day.left ? `<b>${day.left} left</b>` : ''}</a>`); }
        // the run-up to this sitting as a PassBook Wrapped story, once there is one (P2-69)
        const rc = full && GA.engage && GA.engage.recap ? safe(() => GA.engage.recap(undefined, undefined, undefined, { range: 'mock' }), null) : null;
        if (rc && rc.href && rc.range && rc.range.test === t.id) items.push(`<a class="rail-a" href="${esc(rc.href)}">${icon('star')}<span>See the run-up to this sitting as a story</span></a>`);
        if (!items.length) items.push(`<div class="rail-a">${icon('check')}<span>No misses to chase here. Try a longer test next.</span></div>`);
        return items.join('');
      })();
      const bySubj = `<section class="pr-panel"><div class="pr-sec-h"><div><h2>By ${icai ? 'paper' : 'subject'}</h2><p>${icai ? 'Marks scored out of the marks that count under the paper’s choices' : 'Marks scored out of the marks that could be graded; Lost is what wrong MCQs cost'}</p></div></div><div class="tw"><table class="t"><thead><tr><th scope="col">Subject</th><th class="r" scope="col">Qs</th><th class="r hp" scope="col">Attempted</th><th class="r" scope="col">Correct</th><th class="r" scope="col">Marks</th><th class="r" scope="col">Lost</th><th class="r hp" scope="col">Avg time</th></tr></thead><tbody>${subj.map(([k, v]) => { const sj = D.subjectById[k]; return `<tr><td>${sj ? `<span class="tr-sj">${sIcon(k)}${esc(sj.name)}</span>` : '<span class="muted">Unclassified</span>'}</td><td class="r">${v.total}</td><td class="r hp">${v.attempted}</td><td class="r">${v.correct}${v.mta ? ` <small class="muted">+${v.mta} to all</small>` : ''}</td><td class="r nw">${v.max ? `<b>${fm(v.score)}</b> / ${v.max}` : '<span class="muted">no key</span>'}</td><td class="r nw">${v.lost ? '−' + U.fmtMarks(v.lost) : '<span class="muted">—</span>'}</td><td class="r hp">${v.total ? Math.round(v.ms / v.total / 1000) + ' s' : ''}</td></tr>`; }).join('')}</tbody></table></div></section>`;
      const timeSec = `<section class="pr-panel tr-time" aria-labelledby="tr-h-time"><div class="pr-sec-h"><div><h2 id="tr-h-time">Time against the budget</h2><p>Each question's time as a multiple of its budget (1.8 minutes per mark): above the 1× line is over budget${slowSet.size ? ` · ${U.plural(slowSet.size, 'question')} over twice the budget` : ''}</p></div></div><div class="tr-tbox"></div></section>`;
      const nextSec = `<section class="pr-panel"><div class="pr-sec-h"><div><h2>What to do next</h2></div></div>${next}</section>`;
      const F = [['all', 'All', t.qids.length], ['wrong', 'Wrong', wrongIds.length], ['skipped', 'Skipped', skippedIds.length], ['marked', 'Marked', markedIds.length], ['slow', 'Slow', slowSet.size], ['easy', 'Easy missed', easySet.size]];
      const review = `<section id="tr-review" aria-labelledby="tr-h-rv"><div class="pr-sec-h"><div><h2 id="tr-h-rv">Question review</h2><p>${icai ? 'Open any question to see your answer next to ICAI’s key and ICAI’s own answer.' : M.scored ? 'Open any question to see your answer against the official key and the worked solution.' : 'Open any question to see your answer next to our worked answer (no official key).'}${easySet.size ? ' Easy is the platform\'s own estimate.' : ''}</p></div><span class="grow"></span><div class="seg tr-rf" id="rf" role="group" aria-label="Show">${F.map(([k, l, c]) => `<button type="button" data-f="${k}" class="${k === 'all' ? 'on' : ''}" aria-pressed="${k === 'all'}"${k !== 'all' && !c ? ' disabled' : ''}>${l}${k === 'all' ? '' : ` ${c}`}</button>`).join('')}</div></div><div class="pq-results" id="rv">${t.qids.map((id, i) => rowHtml(id, i)).join('')}</div></section>`;
      function rowHtml(id, i) {
        const q = by[id]; if (!q) return '';
        const stt = states[id] || 'ungraded';
        const lab = LAB[stt] || ['', stt];
        const sj = D.subjectById[q.subject];
        const parts2 = [`<b class="pqr-id">Q${i + 1}</b>`, `<span>${esc(UI.paperLabel(q))} ${esc(UI.qLabel(q))}</span>`];
        if (sj) parts2.push(`<span title="${esc(sj.name)}">${esc(sj.short)}</span>`);
        parts2.push(q.marks ? `<span>${q.marks} mark${q.marks === 1 ? '' : 's'}</span>` : '', `<span>${q.type === 'DESC' ? 'Descriptive' : q.type}</span>`, `<span class="rv-st ${lab[0]}">${lab[1]}${q.type === 'DESC' && (stt === 'partial' || stt === 'correct' || stt === 'wrong') && resp[id] && resp[id].m != null ? ` · ${U.fmtMarks(resp[id].m)}/${q.marks}` : ''}</span>`);
        if (marked[id]) parts2.push('<span class="rv-mk">marked</span>');
        parts2.push(`<span class="rv-t">${Math.round((times[id] || 0) / 1000)} s</span>`);
        return `<details class="pqr" data-id="${esc(id)}" data-st="${stt}"><summary><span class="pqr-st ${lab[0]}" role="img" aria-label="${lab[1]}">${stt === 'correct' ? icon('check') : stt === 'wrong' ? icon('x') : stt === 'partial' ? icon('minus') : stt === 'mta' ? icon('info') : ''}</span><div class="pqr-b"><div class="pqr-t">${parts2.filter(Boolean).join('<i class="sep" aria-hidden="true">·</i>')}</div></div><svg class="i pqr-chev" aria-hidden="true"><use href="#i-arrow-r"/></svg></summary><div class="pqr-x"></div></details>`;
      }
      // the page plans: a diagnostic puts its next step beside 'By subject' straight after the score; papers, mocks and other tests show where
      // the marks went, then the next step beside 'By subject', the time and the review
      const body = isDiag && M.scored
        ? `<div class="tr-grid tr-dg"><div class="tr-col">${nextSec}</div><div class="tr-col">${bySubj}</div></div>${review}${timeSec}`
        : `${strip}<div class="tr-grid tr-dg"><div class="tr-col">${nextSec}</div><div class="tr-col">${bySubj}</div></div>${timeSec}${review}`;
      out.innerHTML = `<div class="tr pr-page">
        <header class="pr-panel tr-hero${M.scored ? '' : ' tr-hero-ns'}${right ? ' two' : ''}">${hero}</header>
        ${body}</div>`;
      // the trend and the time chart at their hosts' widths, redrawn when they change (P2-33); phones get the five slowest questions instead
      if (trendSide) drawTrend(out, fulls);
      const tbox = U.$('.tr-tbox', out);
      const slowList = () => { const top = TG.slowest ? TG.slowest(tv, 5) : [];
        return top.length ? `<p class="tr-slh">The five slowest, against their budget</p><ol class="tr-slow" role="list">${top.map(r => `<li><button type="button" class="tr-sq" data-open="${esc(r.id)}"><b>Q${r.i + 1}</b><span>${secs(r.ms)} · ${Math.round(r.ratio * 10) / 10}× its ${secs(r.budget)}</span>${icon('arrow-r')}</button></li>`).join('')}</ol>` : '<p class="muted">No time was recorded for these questions.</p>'; };
      const mq = g.matchMedia ? g.matchMedia('(max-width: 700px)') : null;
      let stopFit = null;
      const paintTime = () => {
        if (!tbox.isConnected) return;
        if (stopFit) { stopFit(); stopFit = null; }
        if (mq && mq.matches) tbox.innerHTML = slowList();
        else if (C.fit) { tbox.innerHTML = ''; stopFit = C.fit(tbox, w => timeChart(tv, w)); }
        else tbox.innerHTML = timeChart(tv, 720);
      };
      paintTime();
      if (mq && mq.addEventListener) { mq.addEventListener('change', paintTime); GA.views.testresult._off = () => mq.removeEventListener('change', paintTime); }
      const open = d => { if (!d.classList || !d.classList.contains('pqr') || d.dataset.loaded) return; d.dataset.loaded = '1'; /* review rows only: a card's own folds toggle too */ const id = d.dataset.id; U.$('.pqr-x', d).append(GA.qcard.create(by[id], { mode: 'review', resp: resp[id], state: states[id] }).el); };
      U.$('#rv', out).addEventListener('toggle', e => { if (e.target.open) open(e.target); }, true);
      const FILTER = { all: () => true, wrong: id => states[id] === 'wrong', skipped: id => states[id] === 'skipped', marked: id => !!marked[id], slow: id => slowSet.has(id), easy: id => easySet.has(id) };
      const setFilter = k => { U.$$('#rf button', out).forEach(x => { const on = x.dataset.f === k; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); }); U.$$('#rv .pqr', out).forEach(d => { d.hidden = !(FILTER[k] || FILTER.all)(d.dataset.id); }); };
      U.on(out, 'click', '#rf [data-f]', (e, b) => { if (!b.disabled) setFilter(b.dataset.f); });
      roving(U.$('#rf', out));
      U.on(out, 'click', '[data-jump]', e => { e.preventDefault(); const r = U.$('#tr-review', out); if (r) r.scrollIntoView({ behavior: calm() ? 'auto' : 'smooth', block: 'start' }); });
      // a slow question on a phone opens its review row
      U.on(out, 'click', '[data-open]', (e, b) => { setFilter('all'); const d = U.$(`#rv .pqr[data-id="${CSS.escape(b.dataset.open)}"]`, out); if (!d) return; d.open = true; d.scrollIntoView({ behavior: calm() ? 'auto' : 'smooth', block: 'start' }); const s = U.$('summary', d); if (s) s.focus({ preventScroll: true }); });
      // the practice queue lives in views/pyq.js, which may not be loaded yet when a result is the first page opened
      const practise = async (ids, label) => { if (!ids.length) return; if (!GA.queue) await U.loadScript('app/js/views/pyq.js'); GA.queue.set(ids, label, { kind: 'test', back: { href: '#/test/result/' + encodeURIComponent(t.id), label: 'Back to the result' } }); GA.router.go('/q/' + encodeURIComponent(ids[0]), { queue: 1 }); };
      const rt = U.$('#retry', out); if (rt) rt.addEventListener('click', () => practise(wrongIds.concat(skippedIds), 'Missed in ' + t.title));
      U.on(out, 'click', '[data-again]', (e, b) => practise(b.dataset.again.split(',').filter(Boolean), b.dataset.label || 'Missed in ' + t.title));
    },
    leave() { if (GA.views.testresult._off) { GA.views.testresult._off(); GA.views.testresult._off = null; } }
  };
  const LAB = { correct: ['ok', 'Correct'], mta: ['', 'Marks to all'], wrong: ['bad', 'Wrong'], skipped: ['', 'Skipped'], notevaluated: ['warn', 'Not evaluated'], ungraded: ['', 'No key'],
    partial: ['part', 'Part marks'], pending: ['warn', 'Not marked yet'], excess: ['', 'Not counted'] };
})(typeof window !== 'undefined' ? window : globalThis);
