globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js'); require('../app/js/core/scoring.js'); const TG = require('../app/js/core/testgen.js');

// synthetic catalogue: 14 subjects x plenty of 1- and 2-mark questions, a GA pool, some grouped / keyless questions
function catalogue() {
  const subjects = ['dm', 'la', 'calc', 'ps', 'dl', 'coa', 'pds', 'algo', 'toc', 'cd', 'os', 'db', 'cn', 'ga'].map(id => ({ id, name: id.toUpperCase(), hue: 1, topics: [] }));
  const D = { subjects, subjectById: Object.fromEntries(subjects.map(s => [s.id, s])), papers: [], paperById: {}, years: [2020], questions: [] };
  D.name = id => id;
  let n = 0;
  subjects.forEach(s => { for (let i = 0; i < 60; i++) { const sec = s.id === 'ga' ? 'GA' : 'CS'; D.questions.push({ id: `${s.id}:${i}`, paper: 'p', year: 2020, set: 1, section: sec, no: ++n, marks: i % 2 ? 2 : 1, type: 'MCQ', subject: s.id, topic: s.id + '.t', subtopic: null, hasKey: i !== 5, grouped: i === 7, review: false, legacy: i === 9 }); } });
  D.qById = Object.fromEntries(D.questions.map(q => [q.id, q]));
  return D;
}
const D = catalogue();

test('allocate(): largest remainder sums exactly and respects weights', () => {
  const a = TG.allocate([5, 3, 2], 10); assert.deepEqual(a, [5, 3, 2]);
  const b = TG.allocate([1, 1, 1], 10); assert.equal(b.reduce((x, y) => x + y, 0), 10);
  assert.equal(TG.allocate([0, 0, 0], 4).reduce((x, y) => x + y, 0), 4);
});
test('mock(): 10 GA + 55 CS, 100 marks, 180 minutes, no duplicates, no keyless / grouped / legacy', () => {
  const m = TG.mock(D, { seed: 3 });
  assert.equal(m.qids.length, 65); assert.ok(m.complete);
  assert.equal(new Set(m.qids).size, 65);
  const qs = m.qids.map(id => D.qById[id]);
  assert.equal(qs.filter(q => q.section === 'GA').length, 10);
  assert.equal(qs.reduce((a, q) => a + q.marks, 0), 100);
  assert.equal(qs.filter(q => q.section === 'CS' && q.marks === 1).length, 25);
  assert.equal(qs.filter(q => q.section === 'CS' && q.marks === 2).length, 30);
  assert.ok(qs.every(q => q.hasKey && !q.grouped && !q.legacy));
  assert.equal(m.limitMs, 180 * 60000);
});
test('mock(): seeded, so reproducible; different seeds differ', () => {
  assert.deepEqual(TG.mock(D, { seed: 5 }).qids, TG.mock(D, { seed: 5 }).qids);
  assert.notDeepEqual(TG.mock(D, { seed: 5 }).qids, TG.mock(D, { seed: 6 }).qids);
});
test('mock(): excludeAttempted avoids questions the learner has already tried', () => {
  const st = { q: {} }; D.questions.filter((q, i) => i % 60 < 25).forEach(q => (st.q[q.id] = { n: 1 }));
  const m = TG.mock(D, { seed: 2, excludeAttempted: true, state: st });
  assert.ok(m.qids.every(id => !st.q[id]), 'enough fresh questions exist, so none should be reused');
});
test('subject test: n questions of that subject, time proportional to marks', () => {
  const t = TG.subject(D, { subject: 'os', n: 20, seed: 1 });
  assert.equal(t.qids.length, 20); assert.ok(t.qids.every(id => D.qById[id].subject === 'os'));
  const marks = t.qids.reduce((a, id) => a + D.qById[id].marks, 0);
  assert.equal(t.limitMs, Math.round(marks * 1.8 * 60000));
});
test('diagnostic: 10 questions, 2 aptitude', () => {
  const t = TG.diagnostic(D); assert.equal(t.qids.length, 10); assert.equal(t.qids.filter(id => D.qById[id].section === 'GA').length, 2);
});
test('summarise(): totals, per-subject and per-section breakdowns', () => {
  const qs = [
    { id: 'a', section: 'GA', subject: 'ga', marks: 1, type: 'MCQ', answer: { kind: 'single', value: 'A' } },
    { id: 'b', section: 'CS', subject: 'os', marks: 2, type: 'MCQ', answer: { kind: 'single', value: 'B' } },
    { id: 'c', section: 'CS', subject: 'os', marks: 2, type: 'NAT', answer: { kind: 'range', min: 3, max: 3 } },
  ];
  const D2 = { qById: {} };
  const live = { id: 't1', startedAt: 1, elapsedMs: 5000, responses: { a: 'A', b: 'C' }, times: { a: 1000, b: 2000, c: 0 }, marked: {} };
  const rec = TG.summarise(D2, { kind: 'custom', title: 'x', qids: ['a', 'b', 'c'], limitMs: 1 }, live, qs);
  approx(rec.score, 1 - 2 / 3, 1e-3); assert.equal(rec.max, 5); assert.equal(rec.correct, 1); assert.equal(rec.wrong, 1); assert.equal(rec.skipped, 1); assert.equal(rec.attempted, 2);
  assert.equal(rec.bySubject.os.total, 2); assert.equal(rec.bySubject.os.attempted, 1); assert.equal(rec.bySection.GA.correct, 1);
  assert.equal(rec.states.c, 'skipped');
});

/* ---------------------------------------------------------------- audit P0-04 / P0-05 on a bank-shaped catalogue (WP10)
   PassBook ships no question yet, so these run on tests/fixtures/practice-catalogue.js: the CA syllabus with engine-shaped papers
   (fx-2019 without a key; fx-2021-1 … fx-2026-2 keyed, 10 + 55 questions, 100 marks; twelve marks-to-all rulings in the 2024 papers). */
const pathT = require('path'), ROOT_T = pathT.join(__dirname, '..');
globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
const DataT = require('../app/js/core/data.js');
const FX = require('./fixtures/practice-catalogue.js'), FXM = FX();
const R = DataT.buildCatalogue(FXM);
const fullQ = FX.full(R);
const mtaIds = Object.keys(fullQ).filter(id => fullQ[id].answer && fullQ[id].answer.kind === 'mta');

test('P0-04: no mock, diagnostic or subject test draws a marks-to-all question (200 mock seeds); an empty mock scores 0', () => {
  assert.ok(mtaIds.length >= 5, 'the bank has its marks-to-all questions: ' + mtaIds.length);
  const SC = globalThis.GA.scoring;
  for (let seed = 1; seed <= 200; seed++) {
    const m = TG.mock(R, { seed });
    const bad = m.qids.filter(id => mtaIds.includes(id));
    assert.deepEqual(bad, [], 'seed ' + seed);
    if (seed <= 20) { const r = SC.scoreAll(m.qids.map(id => fullQ[id]), {}); assert.equal(r.score, 0, 'empty mock, seed ' + seed); assert.equal(r.mta, 0); }
  }
  for (let seed = 1; seed <= 30; seed++) assert.ok(!TG.diagnostic(R, { seed }).qids.some(id => mtaIds.includes(id)), 'diagnostic ' + seed);
  mtaIds.slice(0, 3).forEach(id => {
    const q = R.qById[id];
    const t = TG.subject(R, { subject: q.subject, topic: q.topic, n: 30, seed: 3, includeLegacy: true });
    assert.ok(!t.qids.includes(id), 'topic test of ' + id);
  });
});
test('P0-05: a paper sits on its own clock (180 min) in printed order; unkeyed papers say so', () => {
  const p19 = TG.fromPaper(R, 'fx-2019');
  assert.equal(p19.limitMs, 180 * 60000, 'not marks x 1.8'); assert.equal(p19.keyed, 0);
  const p26 = TG.fromPaper(R, 'fx-2026-1');
  assert.equal(p26.limitMs, 180 * 60000); assert.equal(p26.keyed, 65); assert.equal(p26.qids.length, 65);
  assert.equal(R.qById[p26.qids[0]].section, 'GA', 'section 0 printed first');
  // restart numbering: section 0 runs 1–10, then section 1 restarts at 1
  const q24 = TG.fromPaper(R, 'fx-2024-1').qids.map(id => R.qById[id]);
  assert.deepEqual([q24[0].section, q24[0].no, q24[10].section, q24[10].no], ['GA', 1, 'CS', 1]);
});
test('P0-04: summarise() keeps marks to all and "not evaluated" apart, counts graded marks only and keeps the seed', () => {
  const keyedMcq = Object.keys(fullQ).filter(id => fullQ[id].paper === 'fx-2024-1' && fullQ[id].type === 'MCQ' && fullQ[id].answer && fullQ[id].answer.kind === 'single');
  const qs = [mtaIds[0], keyedMcq[0], keyedMcq[1]].map(id => fullQ[id]);
  const live = { id: 'tz', startedAt: 1, elapsedMs: 1000, responses: { [keyedMcq[0]]: fullQ[keyedMcq[0]].answer.value }, times: {}, marked: {} };
  const rec = TG.summarise(R, { kind: 'custom', title: 'x', qids: qs.map(q => q.id), limitMs: 1, seed: 42 }, live, qs);
  assert.equal(rec.correct, 1); assert.equal(rec.mta, 1); assert.equal(rec.mtaMarks, fullQ[mtaIds[0]].marks); assert.equal(rec.skipped, 1); assert.equal(rec.seed, 42);
  const sj = rec.bySubject[fullQ[keyedMcq[0]].subject];
  assert.ok(sj && sj.correct >= 1);
  const all = Object.values(rec.bySubject).reduce((a, e) => ({ correct: a.correct + e.correct, mta: a.mta + e.mta }), { correct: 0, mta: 0 });
  assert.deepEqual(all, { correct: 1, mta: 1 }, 'by subject: marks to all is not "correct"');
  // an unkeyed paper: nothing graded, max 0
  const u = TG.fromPaper(R, 'fx-2019'), uq = u.qids.slice(0, 5).map(id => fullQ[id]);
  const ur = TG.summarise(R, u, { id: 'u', startedAt: 1, elapsedMs: 1, responses: { [uq[0].id]: 'A' }, times: {}, marked: {} }, uq);
  assert.equal(ur.max, 0); assert.equal(ur.ungraded, 5); assert.equal(globalThis.GA.scoring.summary(ur, R).scored, false);
});

/* ---------------------------------------------------------------- audit P1-29 / P1-03 / P1-31 / P1-61 (WP10) */
test('P1-29: a mock follows the recent papers: block order, MCQ / MSQ / NAT mix per block, subjects interleaved', () => {
  const bp = TG.blueprint(R);
  assert.deepEqual(bp.blocks.map(b => [b.sec, b.marks, b.n]), [['GA', 1, 5], ['GA', 2, 5], ['CS', 1, 25], ['CS', 2, 30]]);
  assert.deepEqual([bp.questions, bp.marks, bp.minutes], [65, 100, 180]);
  const cs1 = bp.blocks[2].mix, cs2 = bp.blocks[3].mix;
  assert.equal(cs1.MCQ + cs1.MSQ + cs1.NAT, 25); assert.equal(cs2.MCQ + cs2.MSQ + cs2.NAT, 30);
  // the mix is computed from the papers, not typed in: recount it independently
  const recent = R.questions.filter(q => q.year >= TG.PATTERN_SINCE && q.section === 'CS' && q.marks === 1);
  assert.ok(Math.abs(recent.filter(q => q.type === 'MSQ').length / recent.length * 25 - cs1.MSQ) < 0.6);
  const key = q => [q.section === 'GA' ? 0 : 1, q.marks, ['MCQ', 'MSQ', 'NAT'].indexOf(q.type)];
  let runs = 0;
  for (let seed = 1; seed <= 60; seed++) {
    const m = TG.mock(R, { seed }), qs = m.qids.map(id => R.qById[id]);
    assert.ok(m.complete, 'seed ' + seed);
    const cnt = k => qs.filter(q => q.section + q.marks + q.type === k).length;
    assert.deepEqual(['CS1MCQ', 'CS1MSQ', 'CS1NAT', 'CS2MCQ', 'CS2MSQ', 'CS2NAT'].map(cnt), [cs1.MCQ, cs1.MSQ, cs1.NAT, cs2.MCQ, cs2.MSQ, cs2.NAT], 'type mix, seed ' + seed);
    for (let i = 1; i < qs.length; i++) { const a = key(qs[i - 1]), b = key(qs[i]); assert.ok(a[0] < b[0] || (a[0] === b[0] && (a[1] < b[1] || (a[1] === b[1] && a[2] <= b[2]))), 'printed block order, seed ' + seed + ' at ' + i); }
    const cs = qs.filter(q => q.section === 'CS');
    for (let i = 1; i < cs.length; i++) if (cs[i].subject !== cs[i - 1].subject) runs++;
  }
  assert.ok(runs / 60 >= 25, 'subjects interleave inside blocks (subject changes per mock: ' + (runs / 60).toFixed(1) + ' of 54)');
});
test('P1-03 / P1-29: subject weights are the like-for-like marks a paper; each mock gives a subject its share of the 25 + 30 questions', () => {
  const W = TG.likeForLike(R);
  const cs = Object.keys(W).filter(s => s !== 'ga');
  approx(cs.reduce((a, s) => a + W[s], 0), 85, 0.5);
  const subs = cs.slice().sort(), q1 = TG.allocate(subs.map(s => W[s]), 25), q2 = TG.allocate(subs.map(s => W[s]), 30);
  for (const seed of [3, 17, 99]) {
    const qs = TG.mock(R, { seed }).qids.map(id => R.qById[id]).filter(q => q.section === 'CS');
    subs.forEach((s, i) => assert.equal(qs.filter(q => q.subject === s).length, q1[i] + q2[i], s + ', seed ' + seed));
  }
  // weights passed in (GA.insights' perPaper in the browser) are used as given
  const only = TG.mock(R, { seed: 4, weights: { cma: 1 } }).qids.map(id => R.qById[id]).filter(q => q.section === 'CS');
  assert.ok(only.filter(q => q.subject === 'cma').length >= 40, 'all the weight on Paper 4');
});
test('P1-31: mocks are named "Mock 4 · 15 Oct" (numbered after finished mocks); the seed stays in the record', () => {
  const now = new Date(2026, 9, 15, 10).getTime();
  const st = { q: {}, tests: [{ kind: 'mock' }, { kind: 'paper' }, { kind: 'mock' }, { kind: 'mock' }] };
  const m = TG.mock(R, { seed: 24389, state: st, now });
  assert.equal(m.title, 'Mock 4 · 15 Oct'); assert.equal(m.seed, 24389);
  assert.equal(TG.mock(R, { seed: 2, now }).title, 'Mock 1 · 15 Oct');
  assert.ok(!/seed/.test(m.title));
});
test('P1-61: the warm-up is 10 easy one-mark questions (2 from section 0, then one from each subject by weight), keyed, no marks to all, 15 minutes', () => {
  for (const seed of [1, 7, 42]) {
    const w = TG.warmup(R, { seed }), qs = w.qids.map(id => R.qById[id]);
    assert.equal(w.kind, 'warmup'); assert.equal(qs.length, 10); assert.equal(w.limitMs, 15 * 60000);
    assert.equal(qs.filter(q => q.section === 'GA').length, 2);
    assert.equal(new Set(qs.filter(q => q.section === 'CS').map(q => q.subject)).size, Math.min(8, R.subjects.length), 'every subject (up to eight)');
    assert.ok(qs.every(q => q.marks === 1 && q.hasKey && q.type !== 'MSQ' && !mtaIds.includes(q.id)));
    assert.ok(qs.filter(q => q.diff === 'easy').length >= 8, 'easy first');
  }
  // unseen first
  const st = { q: {} }; TG.warmup(R, { seed: 5 }).qids.forEach(id => (st.q[id] = { n: 1 }));
  assert.ok(TG.warmup(R, { seed: 5, state: st }).qids.every(id => !st.q[id]), 'a second warm-up picks other questions');
});

/* ---------------------------------------------------------------- audit P1-28 / P1-30 / P1-56 / P1-61 / P1-03 (WP10, Part A) */
test('P1-28: the Submit summary counts every question once: answered = answered + answered & marked, unanswered = not answered + not visited + marked', () => {
  const q = (id, section, type) => ({ id, section, type: type || 'MCQ', marks: 1 });
  const qs = [q('g1', 'GA'), q('g2', 'GA'), q('g3', 'GA'), q('c1', 'CS'), q('c2', 'CS'), q('c3', 'CS', 'NAT'), q('c4', 'CS'), q('c5', 'CS', 'NAT')];
  const lv = { responses: { g1: 'A', g2: 'B', c1: 'C', c3: '12,5', c5: '-0.5' }, marked: { g2: true, g3: true, c4: true }, visited: { g1: 1, g2: 1, g3: 1, c1: 1, c2: 1, c3: 1, c4: 1, c5: 1 } };
  assert.deepEqual(qs.map(x => TG.status(x, lv)), ['ans', 'am', 'mk', 'ans', 'na', 'na', 'mk', 'ans'], 'a NAT box with "12,5" holds no answer (P0-16)');
  const c = TG.counts(qs, lv);
  assert.deepEqual(c.sections.map(s => s.sec), ['GA', 'CS']);
  const [ga, cs] = c.sections;
  assert.deepEqual([ga.total, ga.ans, ga.am, ga.mk, ga.na, ga.nv, ga.answered, ga.unanswered], [3, 1, 1, 1, 0, 0, 2, 1]);
  assert.deepEqual([cs.total, cs.ans, cs.am, cs.mk, cs.na, cs.nv, cs.answered, cs.unanswered], [5, 2, 0, 1, 2, 0, 2, 3]);
  assert.deepEqual([c.total.total, c.total.answered, c.total.unanswered], [8, 4, 4]);
  for (const e of c.sections.concat(c.total)) assert.equal(e.answered + e.unanswered, e.total, 'the two numbers add up to the questions');
  // not visited, and the order of the sections follows the test (a paper may print its sections in either order)
  const c2 = TG.counts([q('c1', 'CS'), q('g1', 'GA')], { responses: {}, marked: {}, visited: {} });
  assert.deepEqual(c2.sections.map(s => [s.sec, s.nv, s.unanswered]), [['CS', 1, 1], ['GA', 1, 1]]);
  // a whole sitting with nothing touched is 65 not visited, in the paper's section order
  const p24 = TG.fromPaper(R, 'fx-2024-1'), c24 = TG.counts(p24.qids.map(id => R.qById[id]), { responses: {}, marked: {}, visited: {} });
  assert.deepEqual(c24.sections.map(s => [s.sec, s.total]), [['GA', 10], ['CS', 55]]); assert.equal(c24.total.nv, 65);
});
test('P1-30 / P1-56 / P1-61: the hub offers resume, the diagnostic, the next mock or a warm-up by state and season', () => {
  const fresh = { tests: [], live: null, q: {} }, done1 = { tests: [{ id: 'a', kind: 'diagnostic' }], live: null };
  assert.deepEqual(TG.offer({ tests: [], live: { id: 't1' } }, { season: 'day' }), { kind: 'resume', id: 't1' }, 'a live test wins in every season: Resume is the coral, no hero');
  assert.equal(TG.offer(fresh, {}).kind, 'diagnostic');
  assert.equal(TG.offer(fresh, { season: 'normal', phase: 'learn' }).kind, 'diagnostic');
  assert.equal(TG.offer(fresh, { season: 'normal', phase: 'practice' }).kind, 'diagnostic');
  assert.equal(TG.offer(done1, { season: 'normal', phase: 'learn' }).kind, 'mock', 'after a first finished test: the next full mock');
  assert.equal(TG.offer(fresh, { season: 'normal', phase: 'mocks' }).kind, 'mock', 'the Mocks phase never offers the diagnostic');
  assert.equal(TG.offer(fresh, { season: 'final', phase: 'final' }).kind, 'mock', 'nor the final fortnight');
  assert.equal(TG.offer(fresh, { season: 'eve' }).kind, 'warmup');
  assert.equal(TG.offer(done1, { season: 'day', cardsSeen: true }).kind, 'warmcards');
  assert.equal(TG.offer(done1, { season: 'day', cardsSeen: false }).kind, 'warmup');
  assert.equal(TG.offer(fresh, { season: 'done' }).kind, 'diagnostic'); assert.equal(TG.offer(done1, { season: 'between' }).kind, 'mock');
  assert.equal(TG.offer(null).kind, 'diagnostic');
});
test('P1-03: the mock\'s subject weights in the hub are GA.insights\' perPaper, the ICAI paper marks (I.subjects[].perPaper)', () => {
  const Ins = require('../app/js/core/insights.js');
  // PassBook: the subjects are ICAI papers with fixed marks (syllabus marks=), so insights' perPaper is the paper's marks and the mock's own
  // like-for-like formula (testgen) no longer equals it; the hub passes perPaper in as the weights (views/test.js mockWeights)
  const I = Ins.build(R, FXM.stats);
  const cs = I.subjects.filter(s => s.id !== 'ga');
  assert.equal(cs.length, R.subjects.length);
  cs.forEach(s => assert.equal(s.perPaper, s.paperMarks, s.id + ': perPaper is the paper\'s marks'));
  const only = TG.mock(R, { seed: 5, weights: Object.fromEntries(cs.map(s => [s.id, s.perPaper])) }).qids.map(id => R.qById[id]).filter(q => q.section === 'CS');
  const n = id => only.filter(q => q.subject === id).length;
  assert.ok(n('cma') > n('fm') && n('aud') > n('sm'), 'a 100-mark paper gets more questions than a 50-mark one');
});

/* ---------------------------------------------------------------- audit P2-30 / P2-31 / P2-33 (WP10, Part B) */
test('P2-31: the diagnostic varies with its seed, prefers unseen questions and rotates its 2-mark subjects; always 10 · 15 marks · 27 min', () => {
  const sets = new Set(), twos = new Set();
  for (const seed of [1, 2, 3, 9, 17, 123456]) {
    const d = TG.diagnostic(R, { seed }), qs = d.qids.map(id => R.qById[id]);
    assert.equal(qs.length, 10); assert.equal(qs.reduce((a, q) => a + q.marks, 0), 15); assert.equal(Math.round(d.limitMs / 60000), 27);
    assert.equal(qs.filter(q => q.section === 'GA').length, 2);
    const per = {}; qs.filter(q => q.section === 'CS').forEach(q => (per[q.subject] = (per[q.subject] || 0) + 1));
    assert.deepEqual(Object.values(per), R.subjects.map(() => 8 / R.subjects.length), 'eight slots shared by the four papers: two questions each');
    assert.ok(qs.every(q => q.hasKey && !q.grouped && !q.legacy && !mtaIds.includes(q.id)));
    sets.add(d.qids.slice().sort().join()); twos.add(qs.filter(q => q.section === 'CS' && q.marks === 2).map(q => q.subject).sort().join());
  }
  assert.ok(sets.size >= 5, 'different seeds give different checks: ' + sets.size);
  assert.ok(twos.size >= 2, 'the 2-mark question moves between subjects');
  assert.deepEqual(TG.diagnostic(R, { seed: 4 }).qids, TG.diagnostic(R, { seed: 4 }).qids, 'seeded, so reproducible');
  const st = { q: {} }; TG.diagnostic(R, { seed: 4 }).qids.forEach(id => (st.q[id] = { n: 1 }));
  const again = TG.diagnostic(R, { seed: 4, state: st });
  assert.ok(again.qids.every(id => !st.q[id]), 'a second diagnostic with the same seed picks questions not seen yet');
});
test('P2-31: topic options carry usable counts, and a topic test is exactly the usable count the button names', () => {
  for (const sj of R.subjects) {
    const tc = TG.topicCounts(R, sj.id);
    assert.equal(tc.whole, TG.topicPool(R, { subject: sj.id }).length, sj.id);
    assert.ok(tc.topics.every(x => x.n === TG.subject(R, { subject: sj.id, topic: x.id, n: 999, seed: 2 }).qids.length), sj.id + ': every topic count');
    assert.ok(tc.topics.every(x => !x.outside), sj.id + ': every chapter is in the ICAI syllabus');
  }
  const small = TG.topicCounts(R, 'sm').topics.slice().sort((a, b) => a.n - b.n)[0];
  assert.equal(TG.subject(R, { subject: 'sm', topic: small.id, n: 999, seed: 1 }).qids.length, small.n);
});
test('P2-31: sizes offered for a pool: each size up to it and the first size that takes it all', () => {
  const on = p => TG.sizesFor(p).filter(s => s.on).map(s => s.n + ':' + s.real).join(' ');
  assert.equal(on(0), ''); assert.equal(on(7), '10:7'); assert.equal(on(10), '10:10'); assert.equal(on(20), '10:10 20:20');
  assert.equal(on(25), '10:10 20:20 30:25'); assert.equal(on(140), '10:10 20:20 30:30');
});
test('P2-30: CBT answers: Save & Next saves the draft and unmarks, Mark & Next saves and marks, Clear empties, moving away drops a draft', () => {
  const mcq = { id: 'm', type: 'MCQ', marks: 1 }, nat = { id: 'n', type: 'NAT', marks: 2 }, msq = { id: 's', type: 'MSQ', marks: 2 };
  const lv = { responses: {}, marked: {} };
  assert.deepEqual(TG.commit(lv, mcq, 'leave', 'B'), { saved: false, lost: true }); assert.equal(lv.responses.m, undefined, 'a choice without Save & Next is not an answer');
  TG.commit(lv, mcq, 'save', 'B'); assert.equal(lv.responses.m, 'B'); assert.equal(TG.status(mcq, lv), 'ans');
  assert.deepEqual(TG.commit(lv, mcq, 'leave', undefined), { saved: false, lost: false }, 'opening and leaving a saved question loses nothing');
  assert.deepEqual(TG.commit(lv, mcq, 'leave', 'B'), { saved: false, lost: false }, 'the same choice again is not a loss');
  assert.equal(TG.commit(lv, mcq, 'leave', 'C').lost, true); assert.equal(lv.responses.m, 'B', 'a changed choice is dropped, the saved answer stays');
  TG.commit(lv, mcq, 'mark', 'C'); assert.equal(lv.responses.m, 'C'); assert.equal(TG.status(mcq, lv), 'am');
  TG.commit(lv, mcq, 'save', undefined); assert.equal(TG.status(mcq, lv), 'ans', 'Save & Next on a marked question: the last action sets the status');
  TG.commit(lv, mcq, 'mark', undefined); TG.commit(lv, mcq, 'clear'); assert.equal(TG.status(mcq, lv), 'mk', 'Clear keeps the review mark, drops the answer');
  TG.commit(lv, nat, 'save', '12,5'); assert.equal(lv.responses.n, undefined, 'a NAT draft that is not a number is never saved (P0-16)');
  TG.commit(lv, nat, 'save', '-0.5'); assert.equal(lv.responses.n, '-0.5');
  TG.commit(lv, nat, 'save', null); assert.equal(lv.responses.n, undefined, 'saving an emptied box clears the answer');
  TG.commit(lv, msq, 'save', ['A', 'C']); assert.equal(TG.commit(lv, msq, 'leave', ['C', 'A']).lost, false, 'MSQ choices compare as sets');
  assert.ok(TG.cbtDefault('paper') && TG.cbtDefault('mock') && !TG.cbtDefault('diagnostic') && !TG.cbtDefault('topic'), 'D7: full-length sittings only; short tests autosave');
});
test('P2-30: a sitting\'s own blueprint for the briefing card (fx-2024-1: section 0 5 × 1 + 5 × 2, section 1 25 × 1 + 30 × 2, 100 marks)', () => {
  const p = TG.fromPaper(R, 'fx-2024-1'), qs = p.qids.map(id => fullQ[id]);
  const b = TG.blueprintOf(qs);
  assert.equal(b.questions, 65); assert.equal(b.marks, 100); assert.equal(b.ungraded, 0);
  assert.deepEqual(b.sections.map(s => [s.sec, s.n, s.marks, s.byMarks[1], s.byMarks[2]]), [['GA', 10, 15, 5, 5], ['CS', 55, 85, 25, 30]]);
  const cs = b.sections[1].types; assert.equal(cs.MCQ + cs.MSQ + cs.NAT, 55);
  const b19 = TG.blueprintOf(TG.fromPaper(R, 'fx-2019').qids.map(id => fullQ[id]));
  assert.equal(b19.ungraded, 65, 'a paper without a key: every question ungraded');
});
test('P2-33: time against the budget (1.8 min per mark) and the five slowest questions', () => {
  const by = { a: { marks: 1 }, b: { marks: 2 }, c: { marks: 1 }, d: { marks: 2 } };
  const rows = TG.timeVsBudget(['a', 'b', 'c', 'd'], by, { a: 216000, b: 108000, c: 0, d: 432000 });
  assert.deepEqual(rows.map(r => Math.round(r.ratio * 100) / 100), [2, 0.5, 0, 2]);
  assert.equal(rows[1].budget, 216000);
  assert.deepEqual(TG.slowest(rows, 2).map(r => r.id), ['d', 'a'], 'ties on the ratio: the longer time first');
  assert.ok(TG.slowest(rows).every(r => r.ms > 0), 'an untouched question is never "slow"');
});
