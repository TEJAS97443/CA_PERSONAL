/* GA.insights on the CA Inter catalogue. Two catalogues: the shipped one (data/manifest.js: the real CA syllabus, whatever lessons the
   writers have shipped, and no ICAI question yet) and the fixture (tests/fixtures/catalogue.js: a lesson for every sub-topic and a small
   synthetic MCQ bank), so the logic is tested whether or not lessons and questions exist. The GATE-era tests that re-derived hooks from
   GATE papers went with the GATE bank; the ICAI bank's designer adds bank-specific tests with it. */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const FX = require('./fixtures/catalogue.js');

const sum = a => a.reduce((s, x) => s + x, 0);
const uniq = a => Array.from(new Set(a));

/* the shipped catalogue */
const M = FX.real();
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(M)));
const I = Ins.build(D, M.stats);
/* the fixture catalogue (every sub-topic a lesson, 128 synthetic keyed MCQs) */
const FM = FX.manifest();
const FD = Data.buildCatalogue(JSON.parse(JSON.stringify(FM)));
const FI = Ins.build(FD, FM.stats);

const PAPER_MARKS = { cma: 100, aud: 100, fm: 50, sm: 50 };
const LBOf = DD => Object.fromEntries(DD.lessons.map(l => [l.id, l]));
const prereqsFirst = (DD, ids, ok) => { const LB = LBOf(DD), pos = Object.fromEntries(ids.map((id, i) => [id, i])); ids.forEach((id, i) => (LB[id].needs || []).filter(n => LB[n] && ok(n)).forEach(n => assert.ok(pos[n] != null && pos[n] < i, `${id} needs ${n} first`))); };

/* ---------------------------------------------------------------- the paper weights (syllabus marks, never question counts) */
test('insights: every subject is an ICAI paper weighted by its marks (100, 100, 50, 50), whatever the bank holds', () => {
  for (const [Dx, Ix] of [[D, I], [FD, FI]]) {
    assert.deepEqual(Ix.subjects.map(s => s.id), ['cma', 'aud', 'fm', 'sm']);
    for (const s of Ix.subjects) {
      assert.equal(s.paperMarks, PAPER_MARKS[s.id], s.id + ' paperMarks');
      assert.equal(s.marksPerPaper, PAPER_MARKS[s.id], s.id + ' marksPerPaper is the paper marks');
      assert.equal(s.perPaper, PAPER_MARKS[s.id], s.id + ' perPaper is the paper marks');
      assert.ok(Math.abs(s.share - PAPER_MARKS[s.id] / 300) < 1e-12, s.id + ' share of the 300 marks');
      assert.ok(Math.abs(s.examShare - PAPER_MARKS[s.id] / 300) < 1e-12 && Math.abs(s.csShare - s.examShare) < 1e-12, s.id + ' examShare = csShare');
      assert.equal(s.paper, { cma: 'P4', aud: 'P5', fm: 'P6A', sm: 'P6B' }[s.id]);
    }
    assert.ok(Math.abs(sum(Ix.subjects.map(s => s.share)) - 1) < 1e-12, 'the shares add up to the group');
    assert.deepEqual(Ix.ranking, ['cma', 'aud', 'fm', 'sm'], 'ranking by paper marks, ties in syllabus order');
    assert.equal(Dx.subjects.length, 4);
  }
});

test('insights: totals are recomputed from the catalogue', () => {
  for (const [Mx, Dx, Ix] of [[M, D, I], [FM, FD, FI]]) {
    const T = Ix.totals;
    assert.equal(T.lessons, Mx.lessons.length); assert.equal(T.cards, Mx.cards.length); assert.equal(T.labs, Mx.labs.length);
    assert.equal(T.papers, Mx.papers.length); assert.equal(T.questions, Mx.pyq.rows.length);
    assert.equal(T.marks, sum(Mx.pyq.rows.map(r => r[Mx.pyq.cols.indexOf('marks')])));
    assert.equal(T.minutes, sum(Mx.lessons.map(l => l.minutes)));
    assert.equal(T.subjects, 4);
    assert.equal(T.topics, sum(Dx.subjects.map(s => s.topics.length)));
    assert.equal(T.subtopics, Object.values(Dx.nodes).filter(n => n.kind === 'sub').length);
  }
  /* the counts come from content/syllabus/syllabus.txt itself (the lead may still add sub-topics) */
  const txt = fs.readFileSync(path.join(ROOT, 'content/syllabus/syllabus.txt'), 'utf8').split('\n');
  assert.equal(I.totals.subtopics, txt.filter(l => /^- [a-z]+\./.test(l)).length, 'every sub-topic line of the syllabus');
  assert.equal(I.totals.topics, txt.filter(l => /^## [a-z]+\./.test(l)).length, 'every chapter line');
});

/* ---------------------------------------------------------------- an empty ICAI bank: nothing claims a number that is not there */
test('insights: with no ICAI question every bank figure is zero or empty, and no hook or marks route is made up', () => {
  if (M.pyq.rows.length) return;                                  // once the ICAI bank ships, the fixture tests below carry the logic
  assert.equal(I.totals.questions, 0); assert.equal(I.totals.marks, 0);
  for (const s of I.subjects) { assert.equal(s.pyqs, 0); assert.equal(s.marks, 0); assert.deepEqual(s.trend, []); assert.deepEqual(s.topTopics, []); }
  assert.deepEqual(I.hooks(), [], 'no global hook');
  D.subjects.forEach(s => assert.deepEqual(I.hooks(0, { subject: s.id }), [], s.id + ': no subject hook'));
  for (const id of ['crash', 'cover80', 'last30', 'rescue:cma']) assert.deepEqual(I.path(id).lessons, [], id + ' needs question marks');
  assert.equal(I.path('zero').lessons.length, D.lessons.length, 'From zero is every lesson');
  assert.deepEqual(I.topicFrequency(), []); assert.deepEqual(I.yearSubject().years, []);
  assert.deepEqual(I.labCards().map(c => c.pyqs).filter(Boolean), []);
});

/* ---------------------------------------------------------------- learning order and paths (fixture: every sub-topic a lesson) */
test('insights: prerequisite graph is layered (every edge goes to a later level) and the learning order respects it', () => {
  const G = FI.graph(null), lv = Object.fromEntries(G.nodes.map(n => [n.id, n.level])), LB = LBOf(FD);
  assert.equal(G.nodes.length, FD.lessons.length);
  assert.equal(G.edges.length, sum(FD.lessons.map(l => uniq(l.needs || []).filter(n => LB[n] && n !== l.id).length)));
  G.edges.forEach(e => assert.ok(lv[e.to] > lv[e.from], `${e.from} -> ${e.to}`));
  assert.equal(G.levels, Math.max(...G.nodes.map(n => n.level)) + 1); assert.equal(G.cycles, 0);
  const cma = FI.graph('cma');
  assert.ok(cma.nodes.every(n => n.subject === 'cma') && cma.edges.every(e => LB[e.from].subject === 'cma' && LB[e.to].subject === 'cma'));
  const ord = FI.order(null);
  assert.equal(ord.length, FD.lessons.length); prereqsFirst(FD, ord, () => true);
  assert.deepEqual(FI.order('aud'), ord.filter(id => LB[id].subject === 'aud'), 'a paper\'s order is the global order restricted to it');
});

test('insights: paths are prerequisite-closed and their totals are recomputed (fixture bank)', () => {
  const ps = FI.paths(), LB = LBOf(FD), Q = FD.questions, mk = qs => sum(qs.map(q => q.marks));
  assert.deepEqual(ps.map(p => p.id.split(':')[0]), ['zero', 'crash', 'rescue', 'last30']);
  assert.equal(ps[2].id, 'rescue:cma', 'the default rescue is the paper with the most marks');
  for (const p of ps) {
    const set = new Set(p.lessons), qs = Q.filter(q => set.has(q.subtopic));
    assert.equal(set.size, p.lessons.length, p.id + ' unique');
    assert.equal(p.minutes, sum(p.lessons.map(id => LB[id].minutes))); assert.equal(p.pyqs, qs.length); assert.equal(p.marks, mk(qs));
    if (p.lessons.length) assert.ok(p.href.startsWith('#/l/' + p.lessons[0]));
    prereqsFirst(FD, p.lessons, n => !p.subject || LB[n].subject === p.subject);
  }
  assert.equal(ps[0].lessons.length, FD.lessons.length);
  assert.ok(ps[1].marks >= FI.totals.marks / 2, 'the crash course reaches half the marks');
  assert.ok(ps[3].minutes <= 30 * 60, 'Last 30 days fits an hour a day');
  assert.equal(FI.paths({ weak: 'fm' })[2].id, 'rescue:fm');
  assert.ok(FI.cover(0.8).marks >= 0.8 * FI.totals.marks);
  assert.deepEqual(FI.cover(0.8).lessons.slice(0, FI.cover(0.5).lessons.length), FI.cover(0.5).lessons, 'the 50% route is a prefix of the 80% route');
});

test('insights: pathNav places a lesson on its path (step, prev/next that keep ?path=, done-state) and degrades to null', () => {
  const LB = LBOf(FD);
  for (const pid of ['zero', 'crash', 'rescue:cma']) {
    const p = FI.path(pid), L = p.lessons, enc = '?path=' + encodeURIComponent(pid);
    assert.ok(L.length > 1, pid + ' has lessons');
    for (const i of [0, 1, L.length - 1]) {
      const n = FI.pathNav(pid, L[i]);
      assert.equal(n.step, i + 1); assert.equal(n.steps, L.length);
      assert.equal(n.prev && n.prev.id, i ? L[i - 1] : null); assert.equal(n.next && n.next.id, i < L.length - 1 ? L[i + 1] : null);
      for (const x of [n.prev, n.next, n.current].filter(Boolean)) { assert.equal(x.href, '#/l/' + x.id + enc); assert.equal(x.title, LB[x.id].title); }
    }
  }
  const z = FI.path('zero').lessons, done = new Set(z.slice(0, 3)), n = FI.pathNav('zero', z[3], id => done.has(id));
  assert.equal(n.done, 3); assert.equal(n.prev.done, true); assert.equal(n.current.done, false);
  assert.equal(n.minutesLeft, sum(z.slice(3).map(id => LB[id].minutes)));
  for (const [pid, id] of [['nope', z[0]], ['', z[0]], [null, z[0]], ['zero', 'not.a.lesson'], ['rescue:', z[0]]]) assert.equal(FI.pathNav(pid, id), null, `pathNav(${pid}, ${id})`);
});

/* ---------------------------------------------------------------- hooks: CA copy rules on the fixture bank */
test('insights: hooks (fixture bank) have unique ids, a binding shape and CA copy: no GATE words, no exclamation, no emoji, no crowd claims', () => {
  const all = FI.hooks().concat(...FD.subjects.map(s => FI.hooks(0, { subject: s.id })));
  assert.ok(FI.hooks().length >= 1, 'the fixture bank yields some hooks');
  assert.equal(new Set(FI.hooks().map(h => h.id)).size, FI.hooks().length, 'unique ids');
  for (const h of all) {
    const t = [h.kicker, h.title, h.body].join(' ');
    assert.ok(h.kicker && h.title && h.body && h.stat && h.href && h.evidence, h.id + ' shape');
    assert.ok(!/\bGATE\b|\bPYQs?\b|\bIIT\b|\bCS\b|General Aptitude|\b2027 syllabus\b/.test(t), h.id + ': GATE wording: ' + t);
    assert.ok(!/\b(most|many|all) (students|aspirants|toppers|people)\b|\btoppers\b|guarantee|!/i.test(t), h.id + ': ' + t);
    assert.ok(!/[\u{1F300}-\u{1FAFF}]/u.test(t), h.id + ' emoji');
    assert.ok(/^[A-Z0-9]/.test(h.title), h.id + ' title starts capitalised');
  }
});

test('insights: the GATE-marking hooks (negative marking, MSQ, NAT, General Aptitude, marks to all) are never shown for ICAI papers', () => {
  const all = FI.hooks().concat(...FD.subjects.map(s => FI.hooks(0, { subject: s.id }))).map(h => h.template);
  for (const t of ['trap-no-negative', 'trap-msq', 'trap-nat-subject', 'trap-nat-topic', 'conc-two-mark', 'conc-two-mark-topic', 'conc-ga', 'dispute-mta'])
    assert.ok(!all.includes(t), t + ' is out of the hook orders');
  assert.ok(!FI.hooks().some(h => h.kind === 'trap'), 'no trap hook');
});

/* ---------------------------------------------------------------- a synthetic catalogue: conditions and cycle safety */
function synth() {
  const sub = (id, topic, subject) => ({ id, name: 'N ' + id, tier: 'core', status: 'in', topic, subject });
  const M2 = {
    built: 'x', topicMarks: {}, labs: [],
    syllabus: { subjects: [
      { id: 'cma', name: 'Cost and Management Accounting', short: 'Costing', hue: 1, area: 'Group II', paper: 'P4', marks: 100, official: '', topics: [{ id: 'cma.a', name: 'A', status: 'in', subtopics: [sub('cma.a.x', 'cma.a', 'cma'), sub('cma.a.y', 'cma.a', 'cma')] }, { id: 'cma.b', name: 'B', status: 'in', subtopics: [sub('cma.b.z', 'cma.b', 'cma')] }] },
      { id: 'fm', name: 'Financial Management', short: 'FM', hue: 2, area: 'Group II', paper: 'P6A', marks: 50, official: '', topics: [{ id: 'fm.c', name: 'C', status: 'in', subtopics: [sub('fm.c.w', 'fm.c', 'fm')] }] }] },
    lessons: [
      { id: 'cma.a.x', title: 'X', subject: 'cma', topic: 'cma.a', minutes: 10, tier: 'core', status: 'in', needs: ['cma.a.y'] },
      { id: 'cma.a.y', title: 'Y', subject: 'cma', topic: 'cma.a', minutes: 10, tier: 'core', status: 'in', needs: ['cma.b.z'] },
      { id: 'cma.b.z', title: 'Z', subject: 'cma', topic: 'cma.b', minutes: 10, tier: 'core', status: 'in', needs: ['cma.a.x'] },       // a cycle x -> y -> z -> x
      { id: 'fm.c.w', title: 'W', subject: 'fm', topic: 'fm.c', minutes: 20, tier: 'core', status: 'in', needs: ['cma.a.x', 'nope'] }],
    cards: [['c1', 'cma.a.x']],
    papers: [{ id: 'p1', year: 2025, set: 1, n: 3, cs: 3, ga: 0, marks: 4 }, { id: 'p2', year: 2026, set: 1, n: 2, cs: 2, ga: 0, marks: 3 }],
    pyq: { cols: ['id', 'paper', 'sec', 'no', 'marks', 'type', 'subject', 'topic', 'subtopic', 'diff', 'flags'],
           rows: [['p1:1', 0, 1, 1, 1, 0, 'cma', 'cma.a', 'cma.a.x', 0, 6], ['p1:2', 0, 1, 2, 2, 0, 'cma', 'cma.a', 'cma.a.y', 0, 6], ['p1:3', 0, 1, 3, 1, 0, 'fm', 'fm.c', 'fm.c.w', 0, 6],
                  ['p2:1', 1, 1, 1, 2, 0, 'cma', 'cma.a', 'cma.a.x', 0, 6], ['p2:2', 1, 1, 2, 1, 0, 'fm', 'fm.c', 'fm.c.w', 0, 6]] }
  };
  return Data.buildCatalogue(M2);
}

test('insights: graph, order and paths are cycle-safe', () => {
  const S = Ins.build(synth(), null);
  const G = S.graph(null);
  assert.equal(G.nodes.length, 4); assert.ok(G.cycles >= 1); assert.ok(G.nodes.every(n => Number.isInteger(n.level)));
  assert.equal(S.order(null).length, 4); assert.equal(S.order('cma').length, 3);
  assert.equal(S.graph('fm').external.length, 1);
  assert.equal(S.path('zero').lessons.length, 4);
  const c = S.cover(0.5); assert.ok(c.marks >= c.total / 2); assert.equal(new Set(c.lessons).size, c.lessons.length);
  assert.equal(S.dependents('cma.a.x').length, 3);
  assert.deepEqual(S.ranking, ['cma', 'fm'], 'paper marks rank the papers');
  assert.equal(S.subject('fm').paperMarks, 50);
});

test('insights: hooks are only emitted when their condition holds', () => {
  const S = Ins.build(synth(), null);
  const ids = S.hooks().map(h => h.template);
  for (const t of ['dispute-keys', 'trend-fall', 'trend-rise', 'freq-streak', 'freq-recent', 'freq-subtopic', 'lab-top', 'lab-coverage', 'lab-embed', 'path-gateway', 'trend-quiet', 'trend-new', 'path-value'])
    assert.ok(!ids.includes(t), t + ' should not be emitted for this catalogue');
  assert.equal(S.totals.diagrams, null); assert.equal(S.totals.disputes, null);
  assert.deepEqual(S.labCards(), []); assert.deepEqual(S.disputes(), []);
});

test('insights: lab cards: embeddedIn from the lesson rows, one featured lab, a link per lab', () => {
  const M3 = FX.manifest();
  M3.labs = [{ id: 'bep-x', title: 'Break-even Lab', subject: 'cma', topics: ['cma.mc'], blurb: 'Break-even.', keywords: [], status: 'ready' },
    { id: 'npv-x', title: 'NPV Lab', subject: 'fm', topics: ['fm.capbud'], blurb: 'NPV.', keywords: [], status: 'ready' }];
  const host = M3.lessons.find(l => l.topic === 'cma.mc');
  host.labs = ['bep-x'];
  M3.stats.embeds = { [host.id]: ['bep-x'] };
  const D3 = Data.buildCatalogue(JSON.parse(JSON.stringify(M3))), I3 = Ins.build(D3, M3.stats), cards = I3.labCards();
  assert.equal(cards.length, 2); assert.equal(cards.filter(c => c.featured).length, 1);
  const bep = cards.find(c => c.id === 'bep-x');
  assert.deepEqual(bep.embeddedIn, [host.id]); assert.deepEqual(bep.subs, [host.id], 'it simulates the sub-topic of the lesson that embeds it');
  assert.equal(bep.href, '#/lab/bep-x'); assert.equal(bep.subjectName, 'Cost and Management Accounting');
  assert.equal(bep.pyqs, D3.questions.filter(q => q.subtopic === host.id).length);
});

test('insights: lessonInfo and the subject rows carry the lesson numbers', () => {
  const LB = LBOf(FD), id = FD.lessons[5].id, info = FI.lessonInfo(id);
  assert.equal(info.id, id); assert.equal(info.minutes, LB[id].minutes); assert.equal(info.subject, LB[id].subject);
  assert.equal(info.pyqs, FD.questions.filter(q => q.subtopic === id).length);
  assert.equal(FI.lessonInfo('not.a.lesson'), null);
  for (const s of FI.subjects) {
    const ls = FD.lessons.filter(l => l.subject === s.id);
    assert.equal(s.lessons, ls.length); assert.equal(s.minutes, sum(ls.map(l => l.minutes)));
    assert.equal(s.topics.length, FD.subjectById[s.id].topics.length);
    assert.equal(s.firstLesson, FI.order(s.id)[0]);
  }
});

test('insights: build is memoised per catalogue and get() reads the live catalogue', () => {
  assert.equal(Ins.build(D, M.stats), I);
  assert.notEqual(Ins.build(D, null), I);
  const prev = GA.data.D, prevGAD = globalThis.GAD;
  globalThis.GAD = { manifest: { main: M } };                     // get() reads the live manifest's stats block
  GA.data.D = null; assert.equal(Ins.get(), null);
  GA.data.D = D; assert.equal(Ins.get(), I);
  GA.data.D = prev; globalThis.GAD = prevGAD;
  assert.notEqual(FI.hooks(), FI.hooks(), 'callers get a fresh array');
  assert.deepEqual(FI.hooks(), FI.hooks());
});

test('insights: lessons outside the syllabus text come last in I.order, as one group, prerequisites still first', () => {
  const M4 = FX.manifest();
  const a = M4.lessons.find(l => l.subject === 'aud' && !l.needs.length), b = M4.lessons.find(l => l.subject === 'aud' && l.needs.length);
  a.status = 'legacy';
  const D4 = Data.buildCatalogue(JSON.parse(JSON.stringify(M4))), o = Ins.build(D4, null).order('aud');
  const outside = o.filter(id => D4.lessonById[id].status !== 'in');
  assert.deepEqual(outside, [a.id]);
  const needsA = D4.lessons.filter(l => (l.needs || []).includes(a.id) && l.subject === 'aud');
  if (needsA.length) assert.ok(o.indexOf(a.id) < o.indexOf(needsA[0].id), 'a needed legacy lesson still comes first');
  else assert.equal(o[o.length - 1], a.id);
  assert.ok(b);
});
