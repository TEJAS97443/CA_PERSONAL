/* The command palette (app/js/core/search.js) on the CA Inter catalogue: ranking of CA queries, CA shorthand (eoq, bep, wacc, caro, npa ...),
   paper names, places, the empty palette's first row (P0-08) and the Questions group, which is absent while the ICAI bank is empty.
   Catalogues: the fixture (tests/fixtures/catalogue.js: a lesson for every CA sub-topic, a small synthetic MCQ bank) and the shipped one. */
globalThis.GA = globalThis.GA || {};
const path = require('path');
require('../app/js/core/util.js');
const Data = require('../app/js/core/data.js');
const FX = require('./fixtures/catalogue.js');
const MF = FX.manifest();
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(MF)));
const M0 = FX.real(), D0 = Data.buildCatalogue(JSON.parse(JSON.stringify(M0)));
const S = require('../app/js/core/search.js');
// the palette must not depend on another package's parser for these checks: run them on the local parser, the fallback every build has
const savedLib = GA.pyqLib; delete GA.pyqLib;
const post = {};                                                     // no question postings: question rows come from topic names only
const X = S.index(D, S.places());
const run = (q, o) => S.query(X, q, Object.assign({ post }, o || {}));
const flat = r => [].concat(...r.groups.map(g => g[2].map(row => Object.assign({ group: g[0] }, row))));
const firstLesson = r => flat(r).findIndex(x => x.ty === 'Lesson');

test('search: one normalisation for index and query (P/V, EBIT-EPS, SA 705, ₹, Modigliani-Miller)', () => {
  assert.equal(S.norm('EBIT-EPS analysis'), 'ebit eps analysis');
  assert.equal(S.norm('SA 705: qualified opinion'), 'sa 705 qualified opinion');
  assert.equal(S.norm('Modigliani-Miller'), 'modigliani miller');
  assert.equal(S.norm('  CVP/BEP  '), 'cvp bep');
  assert.equal(S.norm("Walter's model"), 'walter model');
});

test('search: the local parser reads year and question number, and keeps other numbers as words', () => {
  const P = q => S.parseLocal(q, S.index(D, []));
  let p = P('q7 2025'); assert.equal(p.year, 2025); assert.equal(p.no, 7); assert.equal(p.idLike, true);
  p = P('materiality 2026'); assert.equal(p.year, 2026); assert.deepEqual(p.terms, ['materiality']); assert.equal(p.idLike, false);
  p = P('sa 705'); assert.deepEqual(p.terms, ['sa', '705']); assert.equal(p.no, null, 'a Standard number is a word, not a question number');
  p = P('caro 2020'); assert.ok(p.terms.includes('caro'));
});

/* [query, the lesson that must come first (null: any lesson in the top 3)] */
const TOPICS = [['eoq', 'cma.mat.eoq'], ['economic order quantity', 'cma.mat.eoq'], ['margin of safety', 'cma.mc.bep'], ['break-even', null], ['bep', null],
  ['sa 705', 'aud.report.sa705'], ['disclaimer of opinion', 'aud.report.sa705'], ['caro', 'aud.report.caro'], ['materiality', 'aud.risk.sa320'], ['wacc', 'fm.coc.wacc'],
  ['ebit eps', 'fm.cs.ebiteps'], ['cash budget', 'cma.bud.cash'], ['equivalent units', 'cma.proc.eu'], ['joint costs', null], ['material variances', 'cma.std.material'],
  ['walter gordon', 'fm.div.models'], ['npa', 'aud.bank.advances'], ['activity based costing', null], ['cost drivers', 'cma.abc.concept'], ['operating cycle', 'fm.wc.basics'],
  ['swot', null], ['bcg', null], ['pestle', null], ['leverage', null], ['capital rationing', 'fm.capbud.rationing'], ['by-products', 'cma.joint.byprod']];

test('search: for CA topic queries the first lesson row is in the top 3, and the named lesson is that first lesson', () => {
  const bad = [];
  for (const [q, want] of TOPICS) {
    const r = run(q), rows = flat(r), i = firstLesson(r);
    if (i < 0 || i > 2) { bad.push(`${q}: first lesson at rank ${i + 1}: ${rows.slice(0, 3).map(x => x.t).join(' | ')}`); continue; }
    if (want && rows[i].href !== '#/l/' + want) bad.push(`${q}: first lesson is "${rows[i].t}", expected "${D.lessonById[want] ? D.lessonById[want].title : want}"`);
  }
  assert.deepEqual(bad, []);
});

test('search: groups come in the mockup order (Best match, Lessons, Questions, Labs, Chapters & papers, Jump to)', () => {
  const ORDER = ['best', 'Lesson', 'PYQ', 'Lab', 'Topic', 'Action'];
  for (const q of ['variance', 'audit', 'budget', 'eoq', 'dividend']) {
    const ks = run(q).groups.map(g => g[0]);
    const pos = ks.map(k => ORDER.indexOf(k));
    assert.deepEqual(pos.slice().sort((a, b) => a - b), pos, `${q}: ${ks.join(', ')}`);
  }
  const r = run('variance');
  assert.ok(r.groups.find(g => g[0] === 'Lesson')[2].length <= 5, 'at most 5 lessons');
  assert.equal(r.groups.find(g => g[0] === 'Topic')[1], 'Chapters & papers');
});

test('search: with no ICAI question in the build there is no Questions group at all (no error row, no "All N" row)', () => {
  if (D0.questions.length) return;
  const X0 = S.index(D0, S.places());
  for (const q of ['eoq', 'audit', 'variance', 'q7 2025', 'materiality 2026', 'caro']) {
    for (const o of [{ post: {} }, { post: null }, { post: null, postFailed: true }, { post: {}, filter: 'pyq' }]) {
      const r = S.query(X0, q, o);
      assert.ok(!r.groups.some(g => g[0] === 'PYQ'), `${q} ${JSON.stringify(o)}: ${r.groups.map(g => g[0]).join(', ')}`);
      assert.ok(!flat(r).some(x => x.ty === 'Offline' || x.more), q + ': no offline or More row');
    }
  }
  const pl = S.places().find(p => p.href === '#/pyq');
  assert.equal(pl.t, 'Questions'); assert.equal(pl.c, 'ICAI past papers, RTPs and MTPs are being added');
});

test('search: paper names, codes and course names find their paper first', () => {
  const best = q => { const g = run(q).groups[0]; return g && g[0] === 'best' ? g[2][0].href : flat(run(q))[0] && flat(run(q))[0].href; };
  for (const [q, href] of [['costing', '#/s/cma'], ['cost and management accounting', '#/s/cma'], ['auditing', '#/s/aud'], ['p5', '#/s/aud'], ['financial management', '#/s/fm'],
    ['p6a', '#/s/fm'], ['strategic management', '#/s/sm'], ['p6b', '#/s/sm'], ['cma', '#/s/cma'], ['fm', '#/s/fm']]) assert.equal(best(q), href, q);
  const sub = flat(run('auditing')).find(x => x.href === '#/s/aud');
  assert.ok(/^Paper 5 · /.test(sub.c), 'the paper row names its paper: ' + sub.c);
});

test('search: places are found by name (labs, settings, planner, sources, exam date) and a one-letter typo in a long word is forgiven', () => {
  for (const [q, href] of [['labs', '#/labs'], ['settings', '#/settings'], ['planner', '#/plan'], ['provenance', '#/about'], ['exam date', '#/plan?set=exam'], ['questions', '#/pyq']]) {
    const rows = flat(run(q)); assert.ok(rows.slice(0, 3).some(x => x.href === href), `${q}: ${rows.slice(0, 3).map(x => x.t).join(' | ')}`);
  }
  const r = run('materialty');
  assert.ok(/materiality/.test(r.note || ''), 'the note names the word it read: ' + r.note);
  assert.equal(flat(r).find(x => x.ty === 'Lesson').href, '#/l/aud.risk.sa320');
});

test('search: nothing realistic comes back empty', () => {
  const Q = ['cost sheet', 'prime cost', 'works cost', 'stock levels', 'reorder level', 'fifo', 'lifo', 'scrap', 'spoilage', 'idle time', 'overtime', 'labour turnover', 'halsey', 'rowan',
    'overheads', 'apportionment', 'absorption', 'under absorption', 'activity based', 'reconciliation', 'integrated accounts', 'unit costing', 'batch costing', 'job costing',
    'process costing', 'abnormal loss', 'abnormal gain', 'equivalent production', 'inter process profit', 'joint products', 'service costing', 'standard costing', 'variance',
    'marginal costing', 'contribution', 'pv ratio', 'cvp', 'budget', 'flexible budget', 'zero base budgeting', 'audit', 'assurance', 'sa 200', 'audit planning', 'audit programme',
    'audit risk', 'internal control', 'audit evidence', 'sampling', 'external confirmation', 'analytical procedures', 'audit documentation', 'going concern', 'subsequent events',
    'written representations', 'audit report', 'key audit matters', 'emphasis of matter', 'branch audit', 'joint audit', 'caro', 'government audit', 'bank audit', 'npa',
    'ethics', 'independence', 'professional skepticism', 'engagement letter', 'quality control', 'financial management', 'wealth maximisation', 'ratio analysis', 'current ratio',
    'sources of finance', 'venture capital', 'leasing', 'cost of capital', 'cost of equity', 'capital structure', 'mm approach', 'leverage', 'npv', 'irr', 'payback',
    'profitability index', 'dividend policy', 'working capital', 'receivables', 'factoring', 'cash management', 'strategic management', 'strategic intent', 'pestle',
    'five forces', 'value chain', 'product life cycle', 'stakeholders', 'swot', 'generic strategies', 'ansoff', 'bcg matrix', 'ge matrix', 'diversification', 'turnaround',
    'divestment', 'strategy implementation', 'strategic control', 'digital transformation', 'organisational structure'];
  const empty = Q.filter(q => !flat(run(q)).length);
  assert.deepEqual(empty, [], 'queries with no result');
});

test('search: each query runs in well under a frame budget', () => {
  const t0 = Date.now();
  for (const q of ['variance', 'audit', 'eoq', 'materialty', 'sa 705', 'cash budget', 'q7 2025', 'strategic management']) run(q);
  assert.ok((Date.now() - t0) / 8 < 40, `${(Date.now() - t0) / 8} ms a query`);
});

test('search: the filter tabs keep to their kind', () => {
  assert.ok(flat(run('variance', { filter: 'lesson' })).every(x => x.ty === 'Lesson'));
  assert.ok(flat(run('variance', { filter: 'pyq' })).every(x => x.ty === 'PYQ' || x.more || x.ty === 'Offline'));
  assert.ok(flat(run('variance', { filter: 'lab' })).every(x => x.ty === 'Lab'));
  assert.ok(flat(run('audit', { filter: 'topic' })).every(x => x.ty === 'Topic' || x.ty === 'Subject'));
});

test('search: with a bank whose postings failed to load, question search offline is said once, quietly (P1-59)', () => {
  const r = S.query(X, 'variance', { post: null, postFailed: true });
  const q = r.groups.find(g => g[0] === 'PYQ');
  assert.ok(q && q[2].some(x => x.ty === 'Offline' && /offline/i.test(x.t)), 'an offline row');
  assert.equal(q[2].filter(x => x.ty === 'Offline').length, 1);
});

/* P0-08: the empty palette's row 1 is the shared next step (kind 'any') with Home's label, reason and link */
test('search: empty palette row 1 is GA.stats.nextStep (kind any) with its label, reason and href; peeks never appear as lessons in progress', () => {
  const realStats = GA.stats;
  const calls = [];
  GA.stats = Object.assign({}, realStats || {}, { nextStep: (st, d, o) => { calls.push(o); return { kind: 'lesson', rule: 'continue', label: 'Continue', title: 'Material variances', id: 'cma.std.material', subject: 'cma', reason: 'after Setting standards', href: '#/l/cma.std.material?focus=1' }; } });
  try {
    const now = Date.now();
    const state = { lessons: { 'cma.std.material': { last: now, secs: 400 }, 'aud.risk.sa320': { last: now - 1000, secs: 2 }, 'fm.coc.wacc': { last: now - 5000, secs: 300 }, 'sm.ext.pestle': { last: now - 9000, secs: 10, quiz: { 0: {} } } } };
    const rows = S.emptyRows(state, D, S.places(), '2026-10-16');
    assert.equal(calls[0].kind, 'any'); assert.equal(calls[0].scope, 'all');
    assert.equal(rows[0].ty, 'Next'); assert.equal(rows[0].k, 'Continue'); assert.equal(rows[0].href, '#/l/cma.std.material?focus=1'); assert.equal(rows[0].c, 'after Setting standards');
    const cont = rows.filter(r => r.ty === 'Continue').map(r => r.href);
    assert.ok(cont[0] === '#/l/fm.coc.wacc' && !cont.includes('#/l/aud.risk.sa320'), 'real reading only, the next step not repeated, newest first: ' + cont.join(', '));
  } finally { GA.stats = realStats; }
});

let NS = null;
try { NS = require('./next-states.js'); } catch (e) { NS = null; }
if (NS && typeof NS.states === 'function') {
  test('search: on the 12 learner states, palette row 1 names the same target as nextStep(kind any) (P0-08)', () => {
    const Stats = require('../app/js/core/stats.js'), Ins = require('../app/js/core/insights.js');
    if (typeof Stats.nextStep !== 'function') return;
    const I = Ins.build(D, MF.stats);
    const prev = GA.stats; GA.stats = Stats;
    try {
      for (const st of NS.states(D, I, '2026-10-16')) {
        const step = Stats.nextStep(st.state, D, { kind: 'any', scope: 'all', today: st.today, I });
        const row = S.emptyRows(st.state, D, S.places(), st.today)[0];
        if (!step) continue;
        assert.equal(row.href, step.href, st.name); assert.equal(row.k, step.label, st.name);
      }
    } finally { GA.stats = prev; }
  });
}

test('search: with the bank\'s own filter loaded, the question rows and the row\'s count are that filter\'s list for the same link (Part C)', () => {
  const seenF = [], pick = D.questions.filter(q => q.subject === 'cma').slice(0, 21);
  GA.pyqLib = { parse: f => f, filter: (d, f) => { seenF.push(Object.assign({}, f)); return pick.slice(); } };
  try {
    const g = run('variance').groups.find(x => x[0] === 'PYQ')[2], more = g.find(x => x.more);
    assert.equal(more.t, 'All 21 questions matching “variance”'); assert.equal(more.href, '#/pyq?q=variance');
    assert.deepEqual(seenF[0], { q: 'variance' }, 'the list is for exactly the filters the link carries');
    const ids = new Set(pick.map(q => q.id)), rows = g.filter(x => x.ty === 'PYQ');
    assert.ok(rows.length === 4 && rows.every(x => ids.has(x.id)), 'the rows are the bank\'s own: ' + rows.map(x => x.id).join(','));
  } finally { delete GA.pyqLib; }
});

test('search: with a shared parser that expands paper codes into words, the paper is still the Best match', () => {
  GA.pyqLib = { parseQuery: t => ({ year: null, set: null, section: null, no: null, idLike: false, terms: t.trim() === 'fm' ? ['financial', 'management'] : t.trim().split(/\s+/), ignored: [] }) };
  try {
    const r = run('fm');
    assert.equal(r.groups[0][0], 'best'); assert.equal(r.groups[0][2][0].href, '#/s/fm');
    assert.equal(flat(run('eoq')).find(x => x.ty === 'Lesson').href, '#/l/cma.mat.eoq');
  } finally { delete GA.pyqLib; }
});

if (savedLib) GA.pyqLib = savedLib;

test('search: the build\'s alias table and stop words (D.search, when it ships) extend the palette\'s own', () => {
  const D2 = Object.assign({}, D, { search: { alias: { nonsenseword: ['economic order quantity'] }, stop: ['quantity'] } });
  const X2 = S.index(D2, S.places());
  const l = flat(S.query(X2, 'nonsenseword', { post })).find(x => x.ty === 'Lesson');
  assert.ok(l && /Economic Order Quantity/.test(l.t), 'an alias from the build');
});

/* P1-26: Wrapped is always a place; US spellings reach lessons written the British way; a query that names a place gets it first */
test('search: PassBook Wrapped is a place on every profile: wrapped, passbook wrapped and recap find it, and say when it is not ready', () => {
  const prev = GA.engage; GA.engage = { recap: () => null };
  try {
    const X0 = S.index(D, S.places());
    for (const q of ['wrapped', 'passbook wrapped', 'PassBook Wrapped']) {
      const r = S.query(X0, q, { post }), b = r.groups[0];
      assert.ok(b && b[0] === 'best' && b[2][0].t === 'PassBook Wrapped' && b[2][0].href === '#/wrapped', q + ': ' + JSON.stringify(b && b[2][0]));
    }
    assert.equal(S.places().find(p => p.t === 'PassBook Wrapped').c, 'Your recap · not ready yet', 'no recap yet: the place says so');
    assert.ok(!S.emptyRows({ lessons: {}, q: {}, nb: {}, cards: {} }, D, S.places()).some(r => r.t === 'PassBook Wrapped'), 'the empty palette lists it like the Me menu: only with a recap');
    GA.engage = { recap: () => ({ range: { key: 'season', label: 'This season' }, href: '#/wrapped?range=season' }) };
    const w = S.places().find(p => p.t === 'PassBook Wrapped');
    assert.equal(w.href, '#/wrapped?range=season'); assert.ok(/This season/.test(w.c));
  } finally { GA.engage = prev; }
  assert.ok(!S.places().some(p => /GATE|PYQ/.test(p.t + ' ' + p.c)), 'no GATE or PYQ words in the places');
});

test('search: US and British spellings are one word (realisable, organisation, maximisation, analyse, behaviour)', () => {
  for (const [a, b] of [['normalization', 'normalisation'], ['optimize', 'optimise'], ['analyzer', 'analyser'], ['behavior', 'behaviour'], ['center', 'centre'], ['catalog', 'catalogue']]) assert.equal(S.canon(a), S.canon(b), a);
  assert.equal(S.norm('maximization'), 'maximization', 'norm() stays the shared normalisation; only the palette\'s canon() folds spellings');
  const first = q => flat(run(q)).find(x => x.ty === 'Lesson');
  assert.equal(first('net realizable value').href, '#/l/cma.joint.apportion', 'realizable finds the lesson written "realisable"');
  assert.ok(first('wealth maximization'), 'maximization finds a lesson');
});

test('search: a query that names a place gets it first (shortcuts, planner, cards), unless lessons are named by the same word (plan, time)', () => {
  const best = q => { const g = run(q).groups[0]; return g && g[0] === 'best' ? g[2][0].t : null; };
  assert.equal(best('shortcuts'), 'Keyboard shortcuts'); assert.equal(best('planner'), 'Planner'); assert.equal(best('cards'), 'Flashcards');
  for (const q of ['plan', 'time']) assert.notEqual(run(q).groups[0][0], 'best', q + ' is about lessons (the audit plan; idle time, time rate): ' + best(q));
  assert.ok(flat(run('pyq'))[0].href === '#/pyq', 'a stop word alone still finds its place');
});

test('search: the formula sheets are a place, and "<paper> formulas" finds that paper\'s sheet (P1-53)', () => {
  const f = r => [].concat(...r.groups.map(g => g[2]));
  assert.equal(f(run('formula sheet'))[0].href, '#/rev');
  assert.equal(f(run('fm formulas'))[0].href, '#/rev/fm');
  assert.equal(f(run('costing revision'))[0].href, '#/rev/cma');
  assert.equal(f(run('fm'))[0].href, '#/s/fm', 'a bare paper code still opens the paper');
});

test('search: a planned lab is listed as coming soon, never as a broken page', () => {
  const D3 = Object.assign({}, D, { labs: [{ id: 'bep-lab', title: 'Break-even Lab', subject: 'cma', topics: ['cma.mc'], blurb: 'Break-even.', keywords: ['break-even'], status: 'planned' }] });
  const row = flat(S.query(S.index(D3, S.places()), 'break-even lab', { post })).find(x => x.ty === 'Lab');
  assert.ok(row && /coming soon/.test(row.c) && row.href === '#/lab/bep-lab', JSON.stringify(row));
});
