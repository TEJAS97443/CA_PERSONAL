/* The ICAI question bank (docs/ICAI_BANK.md): the item model as the app reads it, descriptive self-marking (Got it / Partly / Missed or
   marks), ICAI's choices in a paper sitting (compulsory questions, 'any n of', OR alternatives, excess answers), no negative marking,
   sittings and drills (testgen), the actions that feed the notebook and the review schedule, the exam-only view of the insights, the
   bank's filters and search words, and the Python side (tests/py/test_bank.py: format, validation, check.py, the SM import, the plan). */
globalThis.GA = globalThis.GA || {};
const path = require('path'), cp = require('child_process');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
const SC = require('../app/js/core/scoring.js');
const TG = require('../app/js/core/testgen.js');

/* ---------------------------------------------------------------- a small ICAI catalogue, in the shape data.js gives the app */
const subjectById = { sm: { id: 'sm', name: 'Strategic Management' }, fm: { id: 'fm', name: 'Financial Management' } };
const Q = (id, o) => Object.assign({ id, icai: true, label: id, paper: 'mtp', subject: 'sm', topic: 'sm.choice', section: 'CS', ord: 0 }, o);
const mcq = (id, no, key, o) => Q(id, Object.assign({ type: 'MCQ', no, marks: 2, answer: { kind: 'single', value: key }, hasKey: true }, o));
const desc = (id, no, o) => Q(id, Object.assign({ type: 'DESC', no, marks: 5, hasAns: true, sub: 'sm' }, o));
const questions = [
  mcq('m1', 1, 'B', { ord: 1 }), mcq('m2', 1, 'C', { ord: 2 }),
  desc('q1a', 1, { ord: 3 }), desc('q2a', 2, { ord: 4 }), desc('q3a', 3, { ord: 5 }), desc('q4a', 4, { ord: 6 }),
  desc('q4a-or', 4, { ord: 7, alt: 'q4a' }),
  mcq('f1', 1, 'A', { ord: 8, subject: 'fm', topic: 'fm.cap', sub: 'fm' }), desc('f2', 2, { ord: 9, subject: 'fm', topic: 'fm.cap', sub: 'fm', marks: 10 }),
  mcq('r1', 1, 'D', { paper: 'rtp', marks: null, ord: 1 }), desc('r2', 2, { paper: 'rtp', marks: null, ord: 2 }),
  mcq('oos', 3, 'A', { paper: 'rtp', oos: true, ord: 3 })
];
const rule = { all: false, compulsory: [1], groups: [{ n: 2, of: [2, 3, 4] }] };
const paperById = {
  mtp: { id: 'mtp', title: 'MTP Sep 2026', label: 'MTP Sep 2026', kind: 'mtp', minutes: 180, choice: { sm: rule, fm: { all: true } }, sittable: true },
  rtp: { id: 'rtp', title: 'RTP Sep 2026', label: 'RTP Sep 2026', kind: 'rtp', minutes: 180, choice: null, sittable: false }
};
const D = { questions, paperById, subjectById, qById: Object.fromEntries(questions.map(q => [q.id, q])), name: id => id, papers: Object.values(paperById) };
const smQs = questions.filter(q => q.paper === 'mtp' && q.subject === 'sm');

/* ---------------------------------------------------------------- self-marking */
test('bank: a descriptive item is self-marked: skipped, pending, Got it / Partly / Missed, or marks (halves, clamped)', () => {
  const q = desc('d', 5);
  assert.deepEqual(SC.descMark(q, null), { score: 0, state: 'skipped', negative: 0 });
  assert.equal(SC.descMark(q, { t: '   ' }).state, 'skipped', 'blank text is no attempt');
  assert.equal(SC.descMark(q, { t: 'My answer' }).state, 'pending');
  assert.equal(SC.descMark(q, { done: true }).state, 'pending', 'answered on paper');
  assert.deepEqual(SC.descMark(q, { done: true, g: 'got' }), { score: 5, state: 'correct', negative: 0, self: true });
  assert.equal(SC.descMark(q, { done: true, g: 'partly' }).score, 2.5);
  assert.equal(SC.descMark(q, { done: true, g: 'partly' }).state, 'partial');
  assert.equal(SC.descMark(q, { done: true, g: 'missed' }).state, 'wrong');
  assert.equal(SC.descMark(q, { done: true, m: 3.3 }).score, 3.5, 'marks round to halves');
  assert.equal(SC.descMark(q, { done: true, m: 9 }).score, 5, 'never more than the item is worth');
  assert.equal(SC.descMark(q, { done: true, m: -1 }).state, 'wrong');
  assert.equal(SC.descMark(q, { done: true, m: 5 }).state, 'correct');
  assert.equal(SC.mark(q, { done: true, g: 'got' }).state, 'correct', 'mark() routes DESC to descMark');
  assert.equal(SC.gradeOfMarks(5, 5), 'got'); assert.equal(SC.gradeOfMarks(2, 5), 'partly'); assert.equal(SC.gradeOfMarks(0, 5), 'missed');
});
test('bank: ICAI MCQs have no negative marking (a GATE-shaped MCQ keeps its third)', () => {
  assert.deepEqual(SC.mark(mcq('x', 1, 'B'), 'A'), { score: -0, state: 'wrong', negative: 0 });
  const gate = { id: 'g', type: 'MCQ', marks: 1, answer: { kind: 'single', value: 'B' } };
  approx(SC.mark(gate, 'A').score, -1 / 3);
});

/* ---------------------------------------------------------------- choices */
const res = answered => Object.fromEntries(questions.map(q => [q.id, answered.includes(q.id) ? { score: q.marks || 0, state: 'correct', negative: 0 } : { score: 0, state: 'skipped', negative: 0 }]));
test('bank: applyChoice counts the compulsory question and the first n of a group; the maximum is ICAI\'s, not the sum of every question', () => {
  const choice = sub => (sub === 'sm' ? rule : null);
  const all = smQs.map(q => q.id);
  const r1 = res(all), c1 = SC.applyChoice(smQs, r1, choice);
  assert.equal(c1.max, 2 + 2 + 5 + 5 + 5, 'two MCQs, Q1 and two of Q2-Q4');
  assert.deepEqual(c1.excess, ['sm:4'], 'a third answer from the group is not counted');
  assert.equal(r1['q4a'].state, 'excess'); assert.equal(r1['q4a-or'].state, 'excess');
  const r2 = res(['m1', 'q1a', 'q3a', 'q4a', 'q4a-or']), c2 = SC.applyChoice(smQs, r2, choice);
  assert.deepEqual(c2.excess, []);
  assert.equal(c2.max, 19, 'the maximum counts the group in full even when fewer were tried');
  assert.equal(r2['q4a-or'].state, 'excess', 'both halves of an OR pair answered: the first counts');
  assert.equal(r2['q4a'].state, 'correct');
  const r3 = res(['q4a-or']); SC.applyChoice(smQs, r3, choice);
  assert.equal(r3['q4a-or'].state, 'correct', 'the alternative alone counts');
  const r4 = res([]); const c4 = SC.applyChoice(smQs, r4, () => ({ all: true }));
  assert.equal(c4.max, 2 + 2 + 5 * 4, "'all': every question once, an OR pair once");
});

test('bank: an OR that replaces two sub-parts counts once against both (P5 Jan 2025 Q6(c) OR for (c)(i) and (c)(ii))', () => {
  const d = (id, label, marks, alt) => ({ id, label, no: 6, marks, type: 'DESC', icai: true, section: 'II', ...(alt ? { alt } : {}) });
  const qs = [d('q6a', 'Q6(a)', 5), d('q6c-i', 'Q6(c)(i)', 2), d('q6c-ii', 'Q6(c)(ii)', 2), d('q6c-or', 'Q6(c)', 4, 'q6c-i')];
  assert.deepEqual(SC.orSet(qs[3], qs).map(q => q.id), ['q6c-i', 'q6c-ii']);
  const r = ids => Object.fromEntries(qs.map(q => [q.id, ids.includes(q.id) ? { score: q.marks, state: 'correct', negative: 0 } : { score: 0, state: 'skipped', negative: 0 }]));
  const all = () => ({ all: true });
  const a = r(['q6a', 'q6c-ii', 'q6c-or']), ca = SC.applyChoice(qs, a, all);
  assert.equal(ca.max, 9, '(a) plus (c) once');
  assert.equal(a['q6c-or'].state, 'excess', '(c)(ii) answered first: the OR does not count on top of it');
  const b = r(['q6a', 'q6c-or']); SC.applyChoice(qs, b, all);
  assert.equal(b['q6c-or'].state, 'correct'); assert.ok(b['q6c-i'].alt && b['q6c-ii'].alt, 'both sub-parts are replaced, not missed');
  const one = [d('q4b', 'Q4(b)', 5), d('q4b-or', 'Q4(b)', 5, 'q4b')];
  assert.deepEqual(SC.orSet(one[1], one).map(q => q.id), ['q4b'], 'an OR of a whole part replaces that part only');
});

/* a choice inside a question (docs/ICAI_BANK.md §3.1 'choice'): old P6 'Q1 (Answer any seven)' of eight 2-mark statements, old P3 'Q6 Answer any four
   of the following' of five 5-mark parts. The build ships each named part's item ids; an OR alternative sits in the part it replaces. */
const pd = (id, no, label, marks, o) => Object.assign({ id, label, no, marks, type: 'DESC', icai: true, section: 'II' }, o || {});
const L8 = 'abcdefgh'.split('');
const oldP6 = [pd('m1', 1, 'MCQ 1', 2, { type: 'MCQ', answer: { kind: 'single', value: 'A' } })]
  .concat(L8.map(x => pd('q1' + x, 1, `Q1(${x})`, 2)), [2, 3, 4, 5, 6].map(n => pd('q' + n, n, 'Q' + n, 14)));
const p6Rule = { all: false, compulsory: [1], groups: [{ n: 4, of: [2, 3, 4, 5, 6] }],
  parts: [{ no: 1, n: 7, of: L8.map(x => `(${x})`), span: '(a)–(h)', ids: L8.map(x => ['q1' + x]) }] };
const resOf = (qs, ids) => Object.fromEntries(qs.map(q => [q.id, ids.includes(q.id) ? { score: q.marks, state: 'correct', negative: 0 } : { score: 0, state: 'skipped', negative: 0 }]));
test('bank: a part choice counts the first n parts answered, in paper order; the rest are excess; the maximum is ICAI\'s (old P6 Q1 any 7 of (a)-(h))', () => {
  const all = oldP6.map(q => q.id), r1 = resOf(oldP6, all), c1 = SC.applyChoice(oldP6, r1, () => p6Rule);
  assert.equal(c1.max, 2 + 14 + 4 * 14, 'Q1 is 7 x 2 = 14, not 16');
  assert.equal(r1.q1h.state, 'excess', 'the eighth statement answered is not counted');
  assert.ok(L8.slice(0, 7).every(x => r1['q1' + x].state === 'correct'));
  assert.deepEqual(c1.excess, ['1(h)', '6'], 'a part key reads question + label; Q6 is the fifth of the group');
  const r2 = resOf(oldP6, ['q1b', 'q1c', 'q1d', 'q1e', 'q1f', 'q1g', 'q1h', 'q2']), c2 = SC.applyChoice(oldP6, r2, () => p6Rule);
  assert.deepEqual(c2.excess, [], 'seven answered, skipping (a): all seven count');
  assert.equal(r2.q1h.state, 'correct');
  assert.equal(c2.max, 72, 'the maximum counts seven parts even when fewer were tried');
  const r3 = resOf(oldP6, ['q1a', 'q1b']), c3 = SC.applyChoice(oldP6, r3, () => p6Rule);
  assert.equal(c3.max, 72); assert.deepEqual(c3.excess, []);
  assert.equal(SC.questionMax(p6Rule, SC.questionsByNo(oldP6).by['1']), 14);
  assert.equal(SC.questionMax({ all: true }, SC.questionsByNo(oldP6).by['1']), 16, 'without a part choice every part counts');
  // icaiMax (the hub, the briefing, the sitting) gives the same maximum
  assert.equal(TG.icaiMax(oldP6, { choice: { all: p6Rule } }), 72);
});
test('bank: a part choice inside an "any n of" group, under "all", with an OR pair inside a part, and without shipped ids', () => {
  const L5 = 'abcde'.split('');
  const p3 = [pd('q1', 1, 'Q1', 20), pd('q5', 5, 'Q5', 20)].concat(L5.map(x => pd('q6' + x, 6, `Q6(${x})`, 5)), [pd('q6b-or', 6, 'Q6(b)', 5, { alt: 'q6b' })]);
  const rule = { all: false, compulsory: [1], groups: [{ n: 1, of: [5, 6] }], parts: [{ no: 6, n: 4, of: L5.map(x => `(${x})`), span: '(a)–(e)',
    ids: L5.map(x => (x === 'b' ? ['q6b', 'q6b-or'] : ['q6' + x])) }] };
  const r1 = resOf(p3, ['q1', 'q6a', 'q6b', 'q6b-or', 'q6c', 'q6d', 'q6e']), c1 = SC.applyChoice(p3, r1, () => rule);
  assert.equal(c1.max, 40, 'Q1 20 + one of Q5 / Q6, each worth 20 (Q6: four of five 5-mark parts)');
  assert.equal(r1.q6e.state, 'excess', 'the fifth part answered');
  assert.equal(r1['q6b-or'].state, 'excess', 'both halves of (b)\'s OR answered: the first counts, and (b) is one part');
  assert.ok(['q6a', 'q6b', 'q6c', 'q6d'].every(id => r1[id].state === 'correct'));
  const r2 = resOf(p3, ['q6b-or', 'q6c']); SC.applyChoice(p3, r2, () => rule);
  assert.equal(r2['q6b-or'].state, 'correct', 'the OR alone answers part (b)'); assert.ok(r2.q6b.alt);
  // the same rule as a hand-made one (no ids): the printed label decides the part, an OR goes with the item it replaces
  const bare = { all: false, compulsory: [1], groups: [{ n: 1, of: [5, 6] }], parts: [{ no: 6, n: 4, of: L5.map(x => `(${x})`) }] };
  const r3 = resOf(p3, ['q6a', 'q6b', 'q6b-or', 'q6c', 'q6d', 'q6e']), c3 = SC.applyChoice(p3, r3, () => bare);
  assert.equal(c3.max, 40); assert.equal(r3.q6e.state, 'excess'); assert.equal(r3['q6b-or'].state, 'excess');
  // 'all' with a part choice in two questions (old P7 May 2018 MTP Section B: 'Attempt any two parts' of Q1 and of Q2)
  const p7 = ['a', 'b', 'c'].map(x => pd('q1' + x, 1, `Q1(${x})`, 2)).concat(['a', 'b', 'c'].map(x => pd('q2' + x, 2, `Q2(${x})`, 2)), [pd('q3', 3, 'Q3', 5)]);
  const all7 = { all: true, compulsory: [], groups: [], parts: [1, 2].map(no => ({ no, n: 2, of: ['(a)', '(b)', '(c)'], span: '(a)–(c)', ids: ['a', 'b', 'c'].map(x => [`q${no}${x}`]) })) };
  const r4 = resOf(p7, p7.map(q => q.id)), c4 = SC.applyChoice(p7, r4, () => all7);
  assert.equal(c4.max, 4 + 4 + 5); assert.deepEqual(c4.excess, ['1(c)', '2(c)']);
});
test('bank: the rule in ICAI\'s words names the parts; a sitting\'s record says parts were not counted', () => {
  assert.equal(TG.choiceWords(p6Rule), 'Question 1 is compulsory; answer any 4 of Questions 2–6; in Question 1, answer any 7 of (a)–(h)');
  assert.equal(TG.choiceWords({ all: true }), '', 'nothing to say when every question counts');
  assert.equal(TG.choiceWords({ all: true, parts: [{ no: 1, n: 2, of: ['(a)', '(b)', '(c)'], span: '(a)–(c)' }] }), 'All questions are compulsory; in Question 1, answer any 2 of (a)–(c)');
  assert.equal(TG.choiceWords(rule), 'Question 1 is compulsory; answer any 2 of Questions 2–4', 'an old rule reads as before');
  const P = { id: 'op6', title: 'Old P6', label: 'Old P6', kind: 'pyq', minutes: 180, choice: { all: p6Rule }, sittable: true };
  const qs = oldP6.map(q => Object.assign({}, q, { paper: 'op6', subject: 'aud', hasAns: true }));
  const D6 = { questions: qs, paperById: { op6: P }, qById: Object.fromEntries(qs.map(q => [q.id, q])) };
  const resp = Object.fromEntries(L8.map(x => ['q1' + x, { done: true, m: 2 }]).concat([['m1', 'A'], ['q2', { done: true, m: 10 }]]));
  const rec = TG.icaiRecord(D6, { kind: 'paper', paper: 'op6', qids: qs.map(q => q.id), responses: resp, times: {} }, qs);
  assert.equal(rec.states.q1h, 'excess'); assert.equal(rec.max, 72); assert.equal(rec.score, 2 + 14 + 10);
  assert.ok(/questions or parts/.test(rec.choiceNote) && /1 not counted/.test(rec.choiceNote), rec.choiceNote);
  const again = TG.paperChoice(D6, rec, qs);
  assert.deepEqual(again.excess, ['1(h)'], 'the result page re-applies the rule to the stored states');
});

/* ---------------------------------------------------------------- sittings and drills */
test('bank: icaiPaper sits a document in ICAI\'s order on ICAI\'s clock; one Paper 6 section is half the time', () => {
  const t = TG.icaiPaper(D, 'mtp');
  assert.equal(t.kind, 'paper'); assert.ok(t.icai);
  assert.deepEqual(t.qids, questions.filter(q => q.paper === 'mtp').sort((a, b) => a.ord - b.ord).map(q => q.id));
  assert.equal(t.limitMs, 180 * 60000);
  assert.equal(t.max, 19 + 2 + 10, 'SM under its rule, FM all');
  const s = TG.icaiPaper(D, 'mtp', { sub: 'sm' });
  assert.equal(s.limitMs, 90 * 60000); assert.equal(s.sub, 'sm');
  assert.ok(s.qids.every(id => D.qById[id].subject === 'sm'));
  assert.equal(s.max, 19);
  assert.ok(/Strategic Management/.test(s.title));
});
test('bank: icaiRecord applies the choices after Submit and counts the answers still to self-mark', () => {
  const qs = questions.filter(q => q.paper === 'mtp' && q.subject === 'sm');
  const rec = { kind: 'paper', paper: 'mtp', qids: qs.map(q => q.id), responses: { m1: 'B', m2: 'A', q1a: { done: true }, q2a: { t: 'x', m: 4 }, q3a: { done: true, g: 'partly' }, q4a: { done: true } }, times: {} };
  TG.icaiRecord(D, rec, qs);
  assert.equal(rec.states.m1, 'correct'); assert.equal(rec.states.m2, 'wrong');
  assert.equal(rec.states.q1a, 'pending'); assert.equal(rec.states.q2a, 'partial'); assert.equal(rec.states.q3a, 'partial');
  assert.equal(rec.states.q4a, 'excess', 'the third of the group');
  assert.equal(rec.pending, 1); assert.equal(rec.excess, 1); assert.equal(rec.negative, 0);
  assert.equal(rec.score, 2 + 4 + 2.5);
  assert.equal(rec.max, 19);
  assert.ok(rec.choiceNote && /not counted/.test(rec.choiceNote));
});
test('bank: icaiDrill takes keyed MCQs (descriptive items only on request), never out-of-syllabus items, unseen first', () => {
  const d = TG.icaiDrill(D, { n: 10, seed: 3 });
  assert.ok(d.qids.length > 0 && d.qids.every(id => D.qById[id].type === 'MCQ'));
  assert.ok(!d.qids.includes('oos'));
  const s = TG.icaiDrill(D, { subject: 'sm', n: 10, desc: true, seed: 3 });
  assert.ok(s.qids.some(id => D.qById[id].type === 'DESC'));
  assert.ok(s.qids.every(id => D.qById[id].subject === 'sm'));
  const seen = TG.icaiDrill(D, { subject: 'sm', n: 1, seed: 3, state: { q: { m1: { n: 1, lastOk: 1 }, m2: { n: 1, lastOk: 1 }, r1: { n: 1, lastOk: 0 } } } });
  assert.deepEqual(seen.qids, ['r1'], 'with every MCQ seen, the missed one comes first');
  assert.ok(d.limitMs > 0, 'an RTP item without marks is timed as a 2-mark MCQ');
});

/* ---------------------------------------------------------------- the actions: grades feed the notebook and the review schedule */
test('bank: Got it / Partly / Missed are attempts: Partly and Missed open a notebook entry, Partly logs "pt", mastery counts it half; markTest re-scores a sitting', () => {
  const src = `
    globalThis.GA = {}; const R = ${JSON.stringify(path.join(ROOT, 'app', 'js', 'core'))} + '/';
    require(R + 'util.js'); require(R + 'srs.js'); require(R + 'scoring.js'); require(R + 'testgen.js'); require(R + 'stats.js');
    const S = require(R + 'store.js'), A = require(R + 'actions.js');
    S.init({ profile: 'tbank' }); S.reset();
    const q = { id: 'n-p6-mtp-sep2026-s1-sm-q1a', type: 'DESC', marks: 5, icai: true, label: 'Q1(a)' };
    A.attempt(q, { t: 'mine' }, false, 60000, 'p', { grade: 'partly', mine: 'My answer  ' });
    const e1 = JSON.parse(JSON.stringify(S.state.q[q.id])), nb1 = !!S.state.nb[q.id], row = S.state.log[S.state.log.length - 1];
    A.attempt(q, {}, true, 60000, 'p', { grade: 'got' });
    const e2 = S.state.q[q.id];
    A.setMine(q.id, '   ');
    const mineGone = !('mine' in S.state.q[q.id]);
    const G = GA.data = { D: null };
    const qs = [ { id: 'a', type: 'DESC', marks: 5, icai: true, no: 2, sub: 'sm', subject: 'sm', paper: 'p' }, { id: 'b', type: 'MCQ', marks: 2, icai: true, no: 1, answer: { kind: 'single', value: 'A' }, subject: 'sm', paper: 'p' } ];
    G.D = { questions: qs, paperById: { p: { id: 'p', choice: null } }, subjectById: {}, qById: { a: qs[0], b: qs[1] } };
    S.update(s => { s.tests.push({ id: 'T1', kind: 'paper', icai: true, paper: 'p', qids: ['a', 'b'], responses: { a: { done: true }, b: 'A' }, times: {}, finished: Date.now() }); }, 'test');
    const rec = A.markTest('T1', { a: 2 }, qs);
    process.stdout.write(JSON.stringify({ e1, nb1, row, e2g: e2.g, e2n: e2.n, mineGone, recScore: rec.score, recState: rec.states.a, pend: rec.pendingMarks, aGrade: S.state.q.a && S.state.q.a.g, nbA: !!S.state.nb.a }));
  `;
  const r = cp.spawnSync(process.execPath, ['-e', src], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  const o = JSON.parse(r.stdout);
  assert.equal(o.e1.g, 'partly'); assert.equal(o.e1.n, 1); assert.equal(o.e1.lastOk, 0);
  assert.equal(o.e1.mine, 'My answer', 'the learner\'s own answer is kept, trailing space trimmed');
  assert.ok(o.nb1, 'Partly opens a notebook entry');
  assert.equal(o.row[5], 'pt', 'the log row marks a Partly');
  assert.equal(o.e2g, 'got'); assert.equal(o.e2n, 2);
  assert.ok(o.mineGone, 'a blank answer deletes it');
  assert.equal(o.recScore, 2 + 2, 'MCQ right + 2 of 5 self-marked'); assert.equal(o.recState, 'partial'); assert.equal(o.pend, 0);
  assert.equal(o.aGrade, 'partly', '2 of 5 marks is a Partly'); assert.ok(o.nbA);
});

/* ---------------------------------------------------------------- the Python side */
test('bank: tools/buildlib/bank.py and tools/bank unit tests (tests/py/test_bank.py)', () => {
  const PY = ['python3', '/usr/bin/python3'].find(p => { try { return cp.spawnSync(p, ['-c', '1']).status === 0; } catch (e) { return false; } });
  if (!PY) { console.log('       (skipped: no python3 on PATH)'); return; }
  const r = cp.spawnSync(PY, ['-I', '-m', 'unittest', 'discover', '-s', 'tests/py', '-p', 'test_bank.py'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000 });
  assert.equal(r.status, 0, (r.stderr || r.stdout || '').slice(-2500));
});

/* ---------------------------------------------------------------- the shipped bank: filters, search words, Part groups, the exam-only view */
test('bank: the shipped bank filters by kind and attempt, reads "rtp sep 2026 q5", groups a document into Parts, and insights count exam papers only', () => {
  globalThis.window = globalThis.window || globalThis;
  require('../data/boot.js');
  const Data = require('../app/js/core/data.js'), P = require('../app/js/core/pyqlib.js'), Ins = require('../app/js/core/insights.js');
  const D0 = Data.buildCatalogue(JSON.parse(JSON.stringify(require('./fixtures/catalogue.js').real())));
  if (!D0.qById['n-p4-rtp-sep2026-q5']) { console.log('       (skipped: the pilot document is not in the shipped data; run build.py)'); return; }
  const S = { state: { q: {} } };
  const q5 = D0.qById['n-p4-rtp-sep2026-q5'];
  assert.ok(q5.icai && q5.type === 'DESC' && q5.label === 'Q5' && q5.kind === 'rtp' && q5.attempt === 'sep2026' && q5.hasAns);
  const pq = P.parseQuery('rtp sep 2026 q5', { D: D0 });
  assert.equal(pq.kind, 'rtp'); assert.equal(pq.attempt, 'sep2026'); assert.equal(pq.no, 5);
  const rtp = P.filter(D0, P.parse({ kind: 'rtp', attempt: 'sep2026', subject: 'cma' }), S, null);
  assert.ok(rtp.length >= 28 && rtp.every(q => q.paper === 'n-p4-rtp-sep2026'));
  const desc = P.filter(D0, P.parse({ type: 'DESC', subject: 'cma' }), S, null);
  assert.ok(desc.length && desc.every(q => q.type === 'DESC'));
  const groups = P.paperGroups(D0.questions.filter(q => q.paper === 'n-p4-rtp-sep2026'));
  assert.deepEqual(groups.map(g => g.title), ['Part I · MCQs', 'Part II · Descriptive']);
  const X = Ins.examView(D0);
  assert.ok(X.papers.every(p => p.kind === 'pyq'), 'RTPs and MTPs are practice material, not evidence of what the exam sets');
  assert.ok(X.questions.every(q => X.paperById[q.paper] && !q.alt));
  assert.strictEqual(Ins.examView(D0), X, 'memoised');
});
