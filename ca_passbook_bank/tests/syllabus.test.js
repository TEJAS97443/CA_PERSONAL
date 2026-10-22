/* views/syllabus.js pure helpers: axis ticks, search highlighting, the syllabus filter, the subject-page model (learning order, prev/next,
   start/continue), the per-year PYQ timeline and the hook mini-charts. Numbers are re-derived here from the raw catalogue. */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js'); require('../app/js/core/srs.js'); require('../app/js/core/stats.js');
const Store = require('../app/js/core/store.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const K = require('../app/js/views/syllabus.js');

/* the fixture catalogue (tests/fixtures/catalogue.js): the real CA syllabus with a lesson for every sub-topic and a small synthetic MCQ bank,
   so these view helpers are tested whatever the writers and the ICAI bank have shipped; the shipped one for the no-bank cases */
const FX = require('./fixtures/catalogue.js');
const M = FX.manifest();
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(M)));
const M0 = FX.real(), D0 = Data.buildCatalogue(JSON.parse(JSON.stringify(M0))), I0 = Ins.build(D0, M0.stats);
const I = Ins.build(D, M.stats);
const S0 = { state: Store._blank() };
const allSubs = D.subjects.flatMap(s => s.topics.flatMap(t => t.subtopics.map(n => ({ n, t, s }))));

test('syllabus: ticks are clean 1/2/2.5/5 x 10^k steps that cover the maximum', () => {
  assert.deepEqual(K.ticks(22, 4).list, [0, 10, 20, 30]);
  assert.deepEqual(K.ticks(2.57, 4).list, [0, 1, 2, 3]);
  assert.deepEqual(K.ticks(15, 4).list, [0, 5, 10, 15]);
  for (const mx of [0.4, 3, 7.13, 9.63, 15, 21, 38.5, 99]) {
    const T = K.ticks(mx, 4);
    assert.ok(T.top >= mx - 1e-9 && T.top - T.step < mx, `top ${T.top} for ${mx}`);
    assert.ok(T.list.length >= 2 && T.list.length <= 6, `${T.list.length} ticks for ${mx}`);
  }
  assert.deepEqual(K.ticks(0).list, [0, 1]);
});

test('syllabus: hl escapes text and marks every case-insensitive match', () => {
  assert.equal(K.hl('Binary <tree> & Tree', 'tree'), 'Binary &lt;<mark>tree</mark>&gt; &amp; <mark>Tree</mark>');
  assert.equal(K.hl('a"b', ''), 'a&quot;b');
  assert.equal(K.hl('no match', 'zz'), 'no match');
});

test('syllabus: filterTree with no filters keeps every sub-topic; tier and status filters match the raw counts', () => {
  const all = K.filterTree(D, { q: '', tier: '', status: '' });
  assert.equal(all.subs, allSubs.length); assert.equal(all.subjects, D.subjects.length);
  for (const tier of ['core', 'standard', 'advanced']) assert.equal(K.filterTree(D, { q: '', tier, status: '' }).subs, allSubs.filter(x => x.n.tier === tier).length, tier);
  const eff = x => (x.n.status !== 'in' ? x.n.status : x.t.status);
  for (const status of ['in', 'legacy', 'extra']) assert.equal(K.filterTree(D, { q: '', tier: '', status }).subs, allSubs.filter(x => eff(x) === status).length, status);
  const both = K.filterTree(D, { q: '', tier: 'standard', status: 'legacy' });
  assert.equal(both.subs, allSubs.filter(x => x.n.tier === 'standard' && eff(x) === 'legacy').length);
});

test('syllabus: filterTree search matches subject, topic, sub-topic, lesson title and tags', () => {
  const r = K.filterTree(D, { q: 'break-even', tier: '', status: '' });
  assert.ok(r.tree.cma, 'break-even is in Cost and Management Accounting');
  const hits = Object.values(r.tree.cma).flat().map(n => n.id);
  hits.forEach(id => { const L = D.lessonById[id], n = D.nodes[id], t = D.nodes[n.topic]; assert.ok(/break-even/i.test((L && L.title) + ' ' + n.name + ' ' + ((L && L.tags) || []).join(' ') + ' ' + t.name + ' ' + (t.syl || '')), id); });
  const s = K.filterTree(D, { q: 'auditing and ethics', tier: '', status: '' });
  assert.equal(s.subjects, 1); assert.equal(s.subs, D.subjects.find(x => x.id === 'aud').topics.reduce((n, t) => n + t.subtopics.length, 0), 'a paper hit keeps all its sub-topics');
  assert.equal(K.filterTree(D, { q: 'zzqqxx', tier: '', status: '' }).subs, 0);
});

test('subject model: learning order is a permutation of the subject lessons with in-subject prerequisites first', () => {
  for (const s of D.subjects) {
    const m = K.model(D, I, S0, s.id), mine = D.lessons.filter(l => l.subject === s.id).map(l => l.id);
    assert.deepEqual(m.order.slice().sort(), mine.slice().sort(), s.id);
    const pos = Object.fromEntries(m.order.map((id, i) => [id, i]));
    m.order.forEach((id, i) => (D.lessonById[id].needs || []).filter(n => pos[n] != null && n !== id).forEach(n => assert.ok(pos[n] < i, `${id} after ${n}`)));
    m.order.forEach((id, i) => assert.equal(m.step[id], i + 1));
    m.G.edges.forEach(e => assert.ok(m.preds[e.to].includes(e.from)));
    m.G.external.forEach(e => assert.notEqual(D.lessonById[e.from].subject, s.id));
    assert.equal(m.done, 0); assert.equal(m.touched, false); assert.equal(m.nextId, m.order[0], 'a fresh learner starts at the first lesson');
    assert.equal(m.R.firstLesson, m.order[0]);
  }
});

test('subject model: prev/next follow the syllabus without wrapping (P3-08); rank is within the section; done state moves the start', () => {
  const ids = D.subjects.map(s => s.id), n = ids.length;
  ids.forEach((id, i) => { const m = K.model(D, I, S0, id); assert.equal(m.prev ? m.prev.id : null, i ? ids[i - 1] : null); assert.equal(m.next ? m.next.id : null, i < n - 1 ? ids[i + 1] : null); assert.equal(m.k, i); });
  const fm = K.model(D, I, S0, 'fm'), cs = I.subjects.filter(x => x.section === 'CS');
  assert.equal(fm.peers, cs.length);
  assert.equal(fm.rank, 1 + cs.filter(x => x.marksPerPaper > I.subject('fm').marksPerPaper).length);
  assert.equal(fm.rank, 3, 'Paper 6A (50 marks) ranks after Papers 4 and 5 (100 each)');
  const st = Store._blank(); st.lessons[fm.order[0]] = { done: Date.now(), visits: 1, last: Date.now() };
  const m2 = K.model(D, I, { state: st }, 'fm');
  assert.equal(m2.done, 1); assert.equal(m2.touched, true); assert.equal(m2.nextId, fm.order[1]);
  assert.ok(m2.hooks.length <= 3 && m2.hooks.every(h => !['freq-years', 'freq-papers', 'trend-subject'].includes(h.template)));
  assert.ok(m2.labs.every(l => l.subject === 'fm'));
});

test('subject timeline: per-year marks, counts and share of the paper recomputed from the questions', () => {
  for (const sid of ['cma', 'fm']) {
    const m = K.model(D, I, S0, sid), rows = K.timelineData(D, m);
    assert.deepEqual(rows.map(r => r.year), Array.from(new Set(D.papers.map(p => p.year))).sort((a, b) => a - b));
    rows.forEach(r => {
      const qs = D.questions.filter(q => q.subject === sid && q.year === r.year), raw = qs.reduce((a, q) => a + q.marks, 0);
      const pm = D.papers.filter(p => p.year === r.year).reduce((a, p) => a + p.marks, 0);
      assert.equal(r.n, qs.length); assert.equal(r.raw, raw); approx(r.share, pm ? raw / pm : 0);
      if (!r.na) approx(r.per, Math.round((raw / r.papers) * 100) / 100);
    });
    assert.equal(rows.reduce((a, r) => a + r.n, 0), I.subject(sid).pyqs);
  }
});

test('subject hooks: every mini-chart is drawn from the hook evidence and stays inside 0..100%', () => {
  const years = Array.from(new Set(D.papers.map(p => p.year))).sort((a, b) => a - b);
  let drawn = 0;
  for (const s of D.subjects) {
    const R = I.subject(s.id), hooks = I.hooks(0, { subject: s.id }), ctx = { years, minutes: R.minutes };
    for (const h of hooks) {
      const v = K.hookViz(h, ctx), e = h.evidence || {};
      if (!v) continue;
      drawn++;
      if (v.kind === 'years') {
        assert.equal(v.on.length, years.length, h.id);
        assert.deepEqual(years.filter((y, i) => v.on[i]), years.filter(y => e.years.includes(y)), h.id + ' years');
        continue;
      }
      const parts = v.kind === 'pair' ? [v.a, v.b] : [v];
      parts.forEach(x => assert.ok(x.whole > 0 && x.part >= 0 && x.part <= x.whole, `${h.id} ${x.part}/${x.whole}`));
      if (v.kind === 'pair') {
        assert.equal(v.b.part, e.marks, h.id); assert.equal(v.b.whole, e.total, h.id);
        if (Array.isArray(e.lessons)) { assert.equal(v.a.part, e.minutes); assert.equal(v.a.whole, R.minutes); }
        else { assert.equal(v.a.part, e.topics.length); assert.equal(v.a.whole, e.of); }
      }
    }
  }
  assert.ok(drawn > 10, `${drawn} hooks carry a mini-chart`);
  assert.equal(K.hookViz({ evidence: { ids: ['x'] } }, { years }), null, 'nothing to draw');
  assert.equal(K.hookViz({ evidence: { marks: 5, total: 0 } }, {}), null, 'no zero wholes');
  assert.equal(K.hookViz({ evidence: { marks: 9, total: 4 } }, {}), null, 'no shares above 100%');
  assert.deepEqual(K.hookViz({ evidence: { papers: ['a', 'b'], totalPapers: 4 } }, {}), { kind: 'bar', part: 2, whole: 4 });
  const p = K.hookViz({ evidence: { lessons: ['l'], minutes: 30, marks: 6, total: 10 } }, { minutes: 0 });
  assert.deepEqual(p, { kind: 'bar', part: 6, whole: 10 }, 'falls back to the marks share without a time total');
});

/* ------------------------------------------------------------------ audit 2026-10-16, WP5: one next step, one sequence, routes, honest numbers */
const NS = (() => { try { return require('./next-states.js'); } catch (e) { return null; } })();
const HAS_STEP = !!(GA.stats && typeof GA.stats.nextStep === 'function');
const nsStates = () => (NS ? NS.states(D, I) : []).filter(c => c && c.state);
const lessonStep = (state, scope, today) => GA.stats.nextStep(state, D, { kind: 'lesson', scope, today, I });

test('P0-08 /syllabus: the header coral is the shared next step (kind lesson) in every learner state, and a full mock once all is done', () => {
  if (!HAS_STEP) return;
  const cs = nsStates();
  assert.ok(cs.length >= 11, `${cs.length} learner states`);
  for (const c of cs) {
    const st = lessonStep(c.state, 'all', c.today), h = K.headerCta(c.state, D, I, c.today);
    if (st) { assert.equal(h.href, st.href, c.name); assert.ok(h.kicker.startsWith(st.label + ' · '), c.name + ': ' + h.kicker); assert.equal(h.title, st.title, c.name); assert.equal(h.reason, st.reason || '', c.name); }
    else assert.equal(h.href, '#/test?new=mock', c.name);
  }
  const fresh = Store._blank(), h0 = K.headerCta(fresh, D, I, NS ? NS.TODAY : U0());
  assert.ok(h0.step && h0.step.rule === 'start', 'fresh: Start here');
  assert.equal(D.lessonById[h0.step.id].subject, 'cma', 'a fresh start is in Paper 4, the paper with the most marks (and the first paper day)');
  const all = Store._blank(); D.lessons.forEach(l => (all.lessons[l.id] = { done: 1, visits: 1, last: 1, first: 1 }));
  assert.equal(K.headerCta(all, D, I, NS ? NS.TODAY : U0()).href, '#/test?new=mock', 'every lesson done: the coral is a full mock (D18)');
});
function U0() { return GA.util.today(); }

test('P0-08 /s/:subject: the hero coral and the list badge are the shared next step within the subject; a finished subject offers its PYQs', () => {
  if (!HAS_STEP) return;
  for (const c of nsStates()) {
    const any = lessonStep(c.state, 'all', c.today), sids = GA.util.uniq([any && any.subject, 'cma', 'aud', 'fm'].filter(Boolean));
    for (const sid of sids) {
      const m = K.model(D, I, { state: c.state }, sid, c.today), st = lessonStep(c.state, 'subject:' + sid, c.today), cta = K.heroCta(m);
      if (st) { assert.equal(cta.href, st.href, `${c.name} ${sid}`); assert.equal(m.nextId, st.id, `${c.name} ${sid}: badge`); assert.ok(/\?focus=1/.test(cta.href), 'the hero sets the current subject'); }
      else { assert.equal(m.nextId, null); assert.equal(cta.href, `#/pyq?subject=${sid}&practise=10`, `${c.name} ${sid}: done state`); }
    }
  }
  const st = Store._blank(); I.order('sm').forEach(id => (st.lessons[id] = { done: 1, visits: 1, last: 1, first: 1 }));
  const m = K.model(D, I, { state: st }, 'sm'), cta = K.heroCta(m);
  assert.ok(cta.done && /^#\/pyq\?subject=sm&practise=10$/.test(cta.href) && /Practise Strategic Management questions/.test(cta.title), JSON.stringify(cta));
});

test('P1-05 subject Lessons: one numbered sequence in I.order, zero backward edges, continued dividers only where the order returns, outside-2027 last', () => {
  let cont = 0;
  for (const s of D.subjects) {
    const m = K.model(D, I, S0, s.id), runs = m.runs, flat = runs.flatMap(r => r.ids);
    assert.deepEqual(flat, m.order, s.id + ': the runs are the learning order');
    let n = 1; runs.forEach(r => { assert.equal(r.start, n, s.id + ': numbering'); n += r.ids.length; });
    m.order.forEach(id => (D.lessonById[id].needs || []).forEach(p => { if (m.step[p]) assert.ok(m.step[p] < m.step[id], `${s.id}: ${id} (step ${m.step[id]}) builds on ${p} (step ${m.step[p]})`); }));
    runs.forEach((r, i) => { if (i) assert.notEqual(r.topic, runs[i - 1].topic, s.id + ': runs are maximal'); });
    const firsts = runs.filter(r => !r.cont).map(r => r.topic);
    assert.equal(new Set(firsts).size, firsts.length, s.id + ': each topic has one anchored run');
    runs.filter(r => r.cont).forEach(r => assert.ok(firsts.includes(r.topic), s.id + ': a continued run follows its first one'));
    const outI = runs.findIndex(r => r.outside);
    if (outI >= 0) {
      assert.equal(outI, runs.length - 1, s.id + ': the outside-2027 group is last');
      runs[outI].ids.forEach(id => assert.ok(D.lessonById[id].status && D.lessonById[id].status !== 'in', id));
    }
    cont += runs.filter(r => r.cont).length;
  }
  assert.ok(cont <= 20, `${cont} continued dividers app-wide`);
});

test('P1-06 /syllabus Routes: four curated routes with their real size, the chosen one marked, and the shared step follows it', () => {
  const fresh = Store._blank(), rs = K.routesModel(fresh, D, I);
  assert.deepEqual(rs.map(r => r.id), K.ROUTES.filter(id => I.path(id) && I.path(id).lessons.length));
  rs.forEach(r => { const p = I.path(r.id); assert.equal(r.lessons, p.lessons.length); assert.equal(r.hours, p.hours); assert.equal(r.active, false); assert.equal(r.title, p.title); });
  assert.equal(K.onRoute(fresh, I), null);
  const st = Store._blank(); st.profile.route = 'crash'; const p = I.path('crash'); st.lessons[p.lessons[0]] = { done: 1, visits: 1, last: 1, first: 1 };
  assert.deepEqual(K.routesModel(st, D, I).filter(r => r.active).map(r => r.id), ['crash']);
  assert.deepEqual(K.onRoute(st, I), { id: 'crash', title: p.title, done: 1, total: p.lessons.length });
  if (HAS_STEP) { const h = K.headerCta(st, D, I, NS ? NS.TODAY : U0()); assert.equal(h.step.rule, 'route'); assert.equal(h.step.id, p.lessons[1]); assert.ok(/path=crash/.test(h.href)); }
  st.profile.route = 'no-such-route';
  assert.equal(K.onRoute(st, I), null); assert.ok(K.routesModel(st, D, I).every(r => !r.active));
});

test('P1-04 / P1-52 / P1-03 subject page: honest hooks, builds-on counts, fast track only when it saves time, the like-for-like figure', () => {
  for (const s of D.subjects) {
    const m = K.model(D, I, S0, s.id), R = I.subject(s.id);
    assert.ok(m.hooks.length <= 3, s.id);
    m.hooks.filter(h => h.template === 'path-half').forEach(h => {
      assert.ok(!(h.evidence.minutes > K.FAST_MAX * R.minutes), `${s.id}: a 'fast track' that needs more than 60% of the time is left out`);
      const share = Math.round((100 * h.evidence.marks) / h.evidence.total);
      assert.ok(new RegExp('\\b' + share + '%').test(h.title), `${s.id}: '${h.title}' states the real share ${share}%`);
    });
    const ext = {}; m.G.external.forEach(e => { const l = D.lessonById[e.from]; ext[l.subject] = (ext[l.subject] || 0) + 1; });
    assert.deepEqual(m.builds.map(b => b.id).sort(), Object.keys(ext).filter(k => ext[k] >= 2).sort(), s.id + ': builds on');
    m.builds.forEach(b => assert.equal(b.n, ext[b.id]));
    const rp = I.rescue ? I.rescue(s.id) : I.path('rescue:' + s.id);
    if (m.fast) { assert.ok(m.fast.share > 0 && m.fast.share <= 1); assert.ok(rp.minutes <= (1 - K.FAST_SAVES) * R.minutes + 1e-9, s.id + ': saves a quarter'); assert.ok(/\?path=rescue(:|%3A)/i.test(m.fast.href)); }
    else assert.ok(!rp || !rp.lessons.length || rp.minutes > (1 - K.FAST_SAVES) * R.minutes, s.id + ': fast track hidden only when it does not save time');
    approx(m.per, R.perPaper, 1e-9);
    assert.equal(m.per, R.paperMarks, s.id + ': the hero figure is the paper\'s marks');
    assert.equal(K.perSince(D, R, Math.min(...D.papers.map(p => p.year))), null, s.id + ': no like-for-like range figure for a fixed-mark paper');
  }
  assert.equal(I.subjects.reduce((a, r) => a + r.perPaper, 0), 300, 'the papers add up to Group II\'s 300 marks');
});

/* ------------------------------------------------------------------ audit WP5 part B: tiers, cards, builds on */
test('P2-09 tiers: the data keeps standard, the label reads Extended (D14); rows print the tier only when it is not core; real shares', () => {
  if (!(GA.ui && GA.ui.str && GA.ui.str.tier)) assert.equal(K.tierName('standard'), 'Extended');
  assert.equal(K.tierName('core'), 'Core'); assert.equal(K.tierName('advanced'), 'Advanced');
  assert.equal(K.tierTxt('core'), '', 'no tier word on core rows');
  assert.ok(/Extended/.test(K.tierTxt('standard')) || (GA.ui && GA.ui.str));
  const ts = K.tierStats(D, I), subs = allSubs;
  for (const [t] of K.TIERS) assert.equal(ts[t].n, subs.filter(x => x.n.tier === t).length, t);
  approx(K.TIERS.reduce((a, [t]) => a + ts[t].share, 0), 1, 1e-9);
  const mk = t => subs.filter(x => x.n.tier === t).reduce((a, x) => a + ((I.subtopic(x.n.id) || {}).marks || 0), 0);
  for (const [t] of K.TIERS) assert.equal(ts[t].marks, mk(t), t + ' marks');
  assert.ok(ts.core.share >= ts.standard.share && ts.core.share >= ts.advanced.share, 'core carries most marks');
  const t0 = K.tierStats(D0, I0);
  // the shipped catalogue: no share before ICAI's exam papers are in the bank (RTPs and MTPs are not counted: docs/ICAI_BANK.md §7)
  if (K.TIERS.every(([t]) => !t0[t].marks)) for (const [t] of K.TIERS) assert.equal(t0[t].share, 0, t + ': no ICAI question, no share');
  else approx(K.TIERS.reduce((a, [t]) => a + t0[t].share, 0), 1, 1e-9);
});

test('P3-08 builds on: every subject lists the other subjects its lessons need (2+ links), most links first, same on the hero and the card', () => {
  for (const s of D.subjects) {
    const b = K.buildsOn(D, I, s.id), ext = {};
    I.graph(s.id).external.forEach(e => { const l = D.lessonById[e.from]; if (l.subject !== s.id) ext[l.subject] = (ext[l.subject] || 0) + 1; });
    assert.deepEqual(b.map(x => x.id).sort(), Object.keys(ext).filter(k => ext[k] >= 2).sort(), s.id);
    b.forEach((x, i) => { assert.equal(x.n, ext[x.id]); if (i) assert.ok(b[i - 1].n >= x.n, s.id + ': most links first'); });
    assert.deepEqual(K.model(D, I, S0, s.id).builds, b, s.id + ': the hero uses the same list');
  }
});

test('P3-47 where you stand: per-topic tried / right from the latest outcome of each question; nothing for a fresh learner', () => {
  assert.deepEqual(K.youByTopic(Store._blank(), D, 'cma'), {});
  const st = Store._blank(), qs = D.questions.filter(q => q.subject === 'cma' && q.topic).slice(0, 7);
  qs.forEach((q, i) => (st.q[q.id] = { n: 1 + (i % 2), lastOk: i % 3 === 0, firstOk: 0, last: Date.now() }));
  const y = K.youByTopic(st, D, 'cma');
  const want = {}; qs.forEach((q, i) => { const o = want[q.topic] = want[q.topic] || { tried: 0, right: 0 }; o.tried++; if (i % 3 === 0) o.right++; });
  assert.deepEqual(y, want);
  const m = K.model(D, I, { state: st }, 'cma');
  assert.deepEqual(m.mine, want, 'the subject model carries it for the ranking rows');
});

test('P2-10 /syllabus cards: the open body is one minmax(0, 1fr) column, the closing link may wrap and shows the medium name on phones', () => {
  const css = fs.readFileSync(path.join(ROOT, 'app/css/subject.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const rule = sel => { const m = css.match(new RegExp('(?:^|\\})\\s*' + sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^}]*)\\}')); return m ? m[1] : ''; };
  assert.match(rule('.sy-body'), /grid-template-columns:\s*minmax\(0,\s*1fr\)/, 'an auto column took the width of the longest unbreakable line (COA +17 px at 360)');
  assert.match(rule('.sy .sy-open'), /white-space:\s*normal/, 'the closing link wraps instead of widening the card');
  assert.match(css, /@media \(max-width: 480px\) \{\s*\.sy-open-f \{ display: none; \}\s*\.sy-open-m \{ display: inline; \}/, 'phones show the medium name');
  assert.match(rule('.sy-go::after'), /border-radius:\s*var\(--sy-r\) var\(--sy-r\) 0 0/, 'the header link covers the card up to its own corners');
  assert.match(rule('.sy-list > .sy-subj'), /border-radius:\s*var\(--sy-r\)/, 'the card uses the same radius');
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/syllabus.js'), 'utf8');
  assert.match(src, /<a class="hb-link sy-open" href="#\/s\/\$\{s\.id\}"><span class="sy-open-t">Open \$\{openTxt\}<\/span>/, 'one text span, so a wrap keeps the words together');
  // about 8.5 px a character at 14 px bold: 'Open ' + the medium name stays one line in a 320 px screen's 268 px card body
  for (const s of D.subjects) { const t = 'Open ' + K.phoneName(s); assert.ok(t.length <= 26, `${s.id}: '${t}' is ${t.length} characters`); }
  assert.equal(K.phoneName(D.subjectById.cma), 'Costing', 'a long paper name falls back to its short name');
});

/* ------------------------------------------------------------------ the shipped catalogue with no ICAI bank: honest pages, no crash */
test('subject model on the shipped catalogue (no ICAI question): no bank section, the paper\'s facts, a real coral', () => {
  for (const s of D0.subjects) {
    const m = K.model(D0, I0, S0, s.id);
    assert.equal(m.bank, D0.questions.length > 0);
    if (m.bank) continue;
    assert.equal(m.hasQ, false, s.id + ': no question section');
    assert.equal(m.R.paperMarks, { cma: 100, aud: 100, fm: 50, sm: 50 }[s.id]);
    if (m.day) assert.ok(/^2027-01-(08|10|12)$/.test(m.day), s.id + ': its Group II paper day');
    const cta = K.heroCta(m);
    assert.ok(cta.href && !/#\/pyq|#\/test/.test(cta.href), `${s.id}: the coral never opens an empty bank (${cta.href})`);
    if (!m.order.length) assert.ok(/^#\/(map|l\/)/.test(cta.href), s.id + ': no lesson yet: the map or another paper\'s next lesson');
  }
  const h = K.headerCta(Store._blank(), D0, I0, U0());
  assert.ok(!/#\/test/.test(h.href), 'the /syllabus coral is never a mock without a bank: ' + h.href);
  if (!D0.questions.length) assert.deepEqual(K.tierStats(D0, I0).core.share, 0);
});
