globalThis.GA = globalThis.GA || {};
const S = require('../app/js/core/scoring.js');

const mcq = (m, v) => ({ id: 'x', type: 'MCQ', marks: m, answer: { kind: 'single', value: v } });

test('MCQ correct / wrong / skipped with 1/3 and 2/3 negatives', () => {
  assert.deepEqual(S.mark(mcq(1, 'B'), 'B'), { score: 1, state: 'correct', negative: 0 });
  approx(S.mark(mcq(1, 'B'), 'C').score, -1 / 3);
  approx(S.mark(mcq(2, 'B'), 'D').score, -2 / 3);
  assert.equal(S.mark(mcq(2, 'B'), null).state, 'skipped');
  assert.equal(S.mark(mcq(2, 'B'), '').score, 0);
  assert.equal(S.mark(mcq(1, 'B'), 'b').state, 'correct');
});
test('MSQ is all-or-nothing with no negative marking', () => {
  const q = { type: 'MSQ', marks: 2, answer: { kind: 'multi', value: ['A', 'C'] } };
  assert.equal(S.mark(q, ['C', 'A']).score, 2);
  assert.equal(S.mark(q, ['A']).score, 0);
  assert.equal(S.mark(q, ['A', 'B', 'C']).score, 0);
  assert.equal(S.mark(q, ['A']).state, 'wrong');
  assert.equal(S.mark(q, []).state, 'skipped');
  assert.equal(S.mark(q, 'AC').score, 2);
});
test('NAT range is inclusive and tolerant of keypad formats', () => {
  const q = { type: 'NAT', marks: 2, answer: { kind: 'range', min: 3.4, max: 3.6 } };
  assert.equal(S.mark(q, '3.4').score, 2);
  assert.equal(S.mark(q, '3.6').score, 2);
  assert.equal(S.mark(q, '3.61').score, 0);
  assert.equal(S.mark(q, ' 3.5 ').score, 2);
  assert.equal(S.mark(q, 'abc').state, 'skipped', 'text that is not a number is no answer (P0-16)');
  assert.equal(S.mark(q, '').state, 'skipped');
  assert.equal(S.mark({ type: 'NAT', marks: 1, answer: { kind: 'range', min: -2, max: -2 } }, '−2').score, 1);
  assert.equal(S.mark({ type: 'NAT', marks: 1, answer: { kind: 'range', min: 1000, max: 1000 } }, '1000').score, 1);
  assert.equal(S.mark(q, '3.5').negative, 0);
});
test('alternatives (oneof) and marks-to-all', () => {
  const a = { type: 'MCQ', marks: 1, answer: { kind: 'oneof', alts: [{ kind: 'single', value: 'C' }, { kind: 'single', value: 'D' }] } };
  assert.equal(S.mark(a, 'C').score, 1);
  assert.equal(S.mark(a, 'D').score, 1);
  approx(S.mark(a, 'A').score, -1 / 3);
  const nat = { type: 'NAT', marks: 2, answer: { kind: 'oneof', alts: [{ kind: 'range', min: 3.7, max: 3.8 }, { kind: 'range', min: 4.0, max: 4.1 }] } };
  assert.equal(S.mark(nat, '4.05').score, 2);
  assert.equal(S.mark(nat, '3.9').score, 0);
  const msq = { type: 'MSQ', marks: 1, answer: { kind: 'oneof', alts: [{ kind: 'multi', value: ['A', 'C', 'D'] }, { kind: 'multi', value: ['C', 'D'] }] } };
  assert.equal(S.mark(msq, ['C', 'D']).score, 1);
  assert.equal(S.mark(msq, ['D', 'C', 'A']).score, 1);
  assert.equal(S.mark(msq, ['A', 'C']).score, 0);
  const mta = { type: 'MCQ', marks: 2, answer: { kind: 'mta' } };
  assert.equal(S.mark(mta, null).score, 2);
  assert.equal(S.mark(mta, 'A').state, 'mta');
});
test('questions without an official key are ungraded, never marked wrong', () => {
  const r = S.mark({ type: 'MCQ', marks: 1, answer: null }, 'A');
  assert.equal(r.state, 'ungraded');
  assert.equal(r.score, 0);
});
test('scoreAll totals', () => {
  const qs = [
    { id: 'a', type: 'MCQ', marks: 1, answer: { kind: 'single', value: 'A' } },
    { id: 'b', type: 'MCQ', marks: 2, answer: { kind: 'single', value: 'B' } },
    { id: 'c', type: 'NAT', marks: 2, answer: { kind: 'range', min: 5, max: 5 } },
    { id: 'd', type: 'MSQ', marks: 1, answer: { kind: 'multi', value: ['B', 'D'] } },
    { id: 'e', type: 'MCQ', marks: 1, answer: { kind: 'mta' } },
  ];
  const r = S.scoreAll(qs, { a: 'A', b: 'C', c: '5', d: ['B'] });
  approx(r.score, 1 - 2 / 3 + 2 + 0 + 1);
  assert.equal(r.max, 7);
  assert.equal(r.correct, 2);   // a, c (marks to all is its own bucket, P0-04)
  assert.equal(r.mta, 1); assert.equal(r.mtaMarks, 1);
  assert.equal(r.wrong, 2);     // b, d
  assert.equal(r.skipped, 0);
  approx(r.negative, 2 / 3);
  assert.equal(r.attempted, 4);
});
test('linked-answer rule: second not evaluated if first is wrong or skipped; no negative on a wrong second', () => {
  const g = (role) => ({ id: 'g1', kind: 'linked', role });
  const mk = (id, v, role) => ({ id, type: 'MCQ', marks: 2, answer: { kind: 'single', value: v }, group: g(role) });
  const qs = [mk('p', 'A', 'first'), mk('q', 'B', 'second')];
  let r = S.scoreAll(qs, { p: 'C', q: 'B' });                 // first wrong -> second ignored although correct
  approx(r.score, -2 / 3);
  assert.equal(r.results.q.state, 'notevaluated');
  r = S.scoreAll(qs, {  q: 'B' });                            // first skipped
  assert.equal(r.score, 0);
  r = S.scoreAll(qs, { p: 'A', q: 'D' });                     // first right, second wrong: no negative
  assert.equal(r.score, 2);
  r = S.scoreAll(qs, { p: 'A', q: 'B' });
  assert.equal(r.score, 4);
});
test('describe renders official answers readably', () => {
  assert.equal(S.describe({ kind: 'single', value: 'C' }), 'C');
  assert.equal(S.describe({ kind: 'multi', value: ['A', 'C'] }), 'A, C');
  assert.equal(S.describe({ kind: 'range', min: 3.7, max: 3.8 }), '3.7 to 3.8');
  assert.equal(S.describe({ kind: 'range', min: 12, max: 12 }), '12');
  assert.equal(S.describe({ kind: 'oneof', alts: [{ kind: 'single', value: 'C' }, { kind: 'single', value: 'D' }] }), 'C or D');
  assert.equal(S.describe({ kind: 'mta' }), 'Marks to all');
  assert.equal(S.describe(null), 'not available');
});

test('MSQ whose key lists a single letter is matched by a one-element selection (and only that)', () => {
  const SC = globalThis.GA.scoring;
  const q = { type: 'MSQ', marks: 2, answer: { kind: 'single', value: 'D' } };
  assert.strictEqual(SC.mark(q, ['D']).state, 'correct');
  assert.strictEqual(SC.mark(q, ['D', 'A']).state, 'wrong');
  assert.strictEqual(SC.mark(q, ['A']).state, 'wrong');
  assert.strictEqual(SC.mark({ ...q, answer: { kind: 'multi', value: ['D'] } }, ['D']).state, 'correct');
});

/* ---------------------------------------------------------------- audit P0-04 / P0-05 / P0-16 (WP10) */
test('P0-16: parseNat reads only a real number; a comma is never a decimal point or a thousands separator', () => {
  assert.equal(S.parseNat('-2'), -2); assert.equal(S.parseNat('−2.5'), -2.5); assert.equal(S.parseNat('.5'), 0.5); assert.equal(S.parseNat(' 12 '), 12);
  assert.equal(S.parseNat('0,75'), null); assert.equal(S.parseNat('1,000'), null);
  assert.equal(S.parseNat('12abc'), null); assert.equal(S.parseNat('abc'), null); assert.equal(S.parseNat('-'), null); assert.equal(S.parseNat('.'), null); assert.equal(S.parseNat(''), null);
  const q = { type: 'NAT', marks: 1, answer: { kind: 'range', min: 0.75, max: 0.75 } };
  assert.equal(S.mark(q, '0,75').state, 'skipped', '0,75 is never graded as 75 (or as 0.75)');
  assert.equal(S.mark(q, '0.75').state, 'correct');
  assert.equal(S.answered(q, '12abc'), false); assert.equal(S.answered(q, '-0.5'), true);
  assert.equal(S.answered({ type: 'MCQ' }, 'B'), true); assert.equal(S.answered({ type: 'MSQ' }, []), false);
});
test('P0-16: natClean keeps digits, one point and a leading minus (the shared rule of the four NAT boxes)', () => {
  const C = S.natClean;
  assert.equal(C('12abc'), '12'); assert.equal(C('abc'), ''); assert.equal(C('−2'), '-2'); assert.equal(C('-0.5'), '-0.5');
  assert.equal(C('1.2.3'), '1.23'); assert.equal(C('5-3'), '53'); assert.equal(C('3-4'), '34'); assert.equal(C('a1b2'), '12'); assert.equal(C('5-'), '5');
  assert.equal(C('0,75'), '075', 'the comma is dropped; the boxes say "use a decimal point"'); assert.equal(C(' 4 2 '), '42'); assert.equal(C(null), '');
});
test('P0-04: a wrong second answer of a linked pair costs nothing, also when checked on its own', () => {
  const q = { id: 's', type: 'MCQ', marks: 2, answer: { kind: 'single', value: 'B' }, group: { id: 'g', kind: 'linked', role: 'second' } };
  assert.deepEqual(S.mark(q, 'C'), { score: 0, state: 'wrong', negative: 0 });
  const first = Object.assign({}, q, { id: 'f', group: { id: 'g', kind: 'linked', role: 'first' } });
  approx(S.mark(first, 'C').score, -2 / 3);
});
test('P0-04: marks to all and "not evaluated" are their own buckets; accuracy is correct over graded answers', () => {
  // GATE 2012-like: 5 right, 5 wrong, 6 questions with marks to all (+10)
  const qs = [];
  for (let i = 0; i < 10; i++) qs.push({ id: 'k' + i, type: 'MCQ', marks: 1, answer: { kind: 'single', value: 'A' } });
  [1, 2, 2, 2, 1, 2].forEach((m, i) => qs.push({ id: 'm' + i, type: 'MCQ', marks: m, answer: { kind: 'mta' } }));
  const resp = {}; for (let i = 0; i < 10; i++) resp['k' + i] = i < 5 ? 'A' : 'B';
  const r = S.scoreAll(qs, resp);
  assert.equal(r.correct, 5); assert.equal(r.wrong, 5); assert.equal(r.mta, 6); assert.equal(r.mtaMarks, 10); assert.equal(r.attempted, 10);
  approx(r.score, 5 - 5 / 3 + 10);
  const t = { id: 'x', kind: 'paper', qids: qs.map(q => q.id), states: Object.fromEntries(Object.entries(r.results).map(([k, v]) => [k, v.state])), score: r.score, max: r.max, attempted: 10 };
  const m = S.summary(t, { qById: Object.fromEntries(qs.map(q => [q.id, q])) });
  assert.equal(m.correct, 5); assert.equal(m.mta, 6); assert.equal(m.mtaMarks, 10); assert.equal(m.accuracy, 0.5, 'not 110 %');
  // an empty test of keyed questions with one marks-to-all question scores its marks but has no correct answer
  const e = S.scoreAll([qs[0], qs[10]], {});
  assert.equal(e.correct, 0); assert.equal(e.mta, 1); assert.equal(e.skipped, 1); assert.equal(e.score, 1);
});
test('P0-04: a linked second after a wrong or skipped first is "not evaluated", never "skipped" (2013: 10 skipped, 1 not evaluated)', () => {
  const g = role => ({ id: 'g1', kind: 'linked', role });
  const qs = [{ id: 'p', type: 'MCQ', marks: 2, answer: { kind: 'single', value: 'A' }, group: g('first') }, { id: 'q', type: 'MCQ', marks: 2, answer: { kind: 'single', value: 'B' }, group: g('second') }];
  for (let i = 0; i < 9; i++) qs.push({ id: 's' + i, type: 'NAT', marks: 1, answer: { kind: 'range', min: 1, max: 1 } });
  const r = S.scoreAll(qs, { q: 'B' });                    // first skipped: second not evaluated although it is right
  assert.equal(r.skipped, 10); assert.equal(r.notEvaluated, 1); assert.equal(r.correct, 0);
  // order does not matter: the second listed before the first still follows the rule
  const r2 = S.scoreAll([qs[1], qs[0]], { p: 'C', q: 'B' });
  assert.equal(r2.results.q.state, 'notevaluated'); approx(r2.score, -2 / 3);
  // marks to all on the second wins over the rule
  const r3 = S.scoreAll([qs[0], Object.assign({}, qs[1], { answer: { kind: 'mta' } })], {});
  assert.equal(r3.results.q.state, 'mta');
});
test('P0-05: a paper without a key is "Not scored": max counts graded questions only, nothing is missed', () => {
  const qs = [1, 2, 2].map((m, i) => ({ id: 'u' + i, type: 'MCQ', marks: m, answer: null }));
  const r = S.scoreAll(qs, { u0: 'A', u1: 'B' });
  assert.equal(r.max, 0); assert.equal(r.ungraded, 3); assert.equal(r.skipped, 0); assert.equal(r.wrong, 0); assert.equal(r.attempted, 2);
  // an old record of a 150-mark sitting stored max 150 and 0 / 150: it reads 'Not scored'
  const old = { id: 'o', kind: 'paper', qids: ['u0', 'u1', 'u2'], states: { u0: 'ungraded', u1: 'ungraded', u2: 'ungraded' }, score: 0, max: 150, correct: 0, wrong: 0, skipped: 0, ungraded: 3, attempted: 2, total: 3 };
  const m = S.summary(old, { qById: Object.fromEntries(qs.map(q => [q.id, q])) });
  assert.equal(m.scored, false); assert.equal(m.max, 0); assert.equal(m.pct, null); assert.equal(m.missed, 0); assert.equal(m.accuracy, null); assert.equal(m.full, true);
  assert.equal(S.summary(old).scored, false, 'also without the catalogue');
  // a mixed test: the ungraded question is not out of anything
  const mix = { id: 'z', kind: 'custom', qids: ['a', 'u0'], states: { a: 'correct', u0: 'ungraded' }, score: 2, max: 3 };
  const mz = S.summary(mix, { qById: { a: { marks: 2 }, u0: { marks: 1 } } });
  assert.equal(mz.max, 2); assert.equal(mz.scored, true); assert.equal(mz.pct, 1); assert.equal(mz.full, false);
});
test('P0-04: summary() reads records written before the fix (correct counted marks to all, skipped counted "not evaluated")', () => {
  const t = { id: 'old', kind: 'paper', qids: ['a', 'b', 'c', 'd'], states: { a: 'correct', b: 'mta', c: 'notevaluated', d: 'wrong' },
              score: 2 + 2 - 1 / 3, max: 7, correct: 2, wrong: 1, skipped: 1, ungraded: 0, attempted: 3, total: 4 };
  const m = S.summary(t, { qById: { a: { marks: 2 }, b: { marks: 2 }, c: { marks: 2 }, d: { marks: 1 } } });
  assert.deepEqual([m.correct, m.mta, m.mtaMarks, m.notEvaluated, m.skipped, m.wrong, m.max, m.total], [1, 1, 2, 1, 0, 1, 7, 4]);
  assert.equal(m.accuracy, 0.5); assert.equal(m.scored, true); approx(m.pct, (2 + 2 - 1 / 3) / 7);
  assert.equal(S.summary(null), null);
  assert.equal(S.isFull({ kind: 'mock' }), true); assert.equal(S.isFull({ kind: 'diagnostic' }), false);
});

/* ---------------------------------------------------------------- audit P1-30 / P2-34 (WP10): the full-length trend */
test('P1-30: fullSittings() keeps scored papers and mocks only, oldest first; quizzes and unkeyed sittings never join the trend', () => {
  const rec = (id, kind, finished, score, max, states) => ({ id, kind, finished, score, max, states, qids: Object.keys(states) });
  const tests = [
    rec('m2', 'mock', 300, 40, 100, { a: 'correct', b: 'wrong' }),
    rec('d1', 'diagnostic', 100, 9, 15, { a: 'correct' }),
    rec('p1', 'paper', 200, 30, 100, { a: 'correct', b: 'skipped' }),
    rec('u1', 'paper', 250, 0, 0, { a: 'ungraded', b: 'ungraded' }),          // GATE 2008 sat before the P0-05 fix: 'Not scored'
    rec('s1', 'subject', 400, 12, 20, { a: 'correct' }), null, 'junk'
  ];
  const f = S.fullSittings(tests);
  assert.deepEqual(f.map(x => x.t.id), ['p1', 'm2']);
  assert.ok(f.every(x => x.m.full && x.m.scored && x.m.max > 0));
  assert.equal(f[1].m.pct, 0.4);
  assert.deepEqual(S.fullSittings(null), []); assert.deepEqual(S.fullSittings([]), []);
});
test('P2-69: standing() of a full-length sitting: first, best of N (ties count), the delta on the sitting before it', () => {
  const rec = (id, kind, finished, score, max) => ({ id, kind, finished, score, max, states: { a: max ? 'correct' : 'ungraded' }, qids: ['a'] });
  const tests = [rec('p1', 'paper', 100, 30, 100), rec('q1', 'diagnostic', 150, 15, 15), rec('m1', 'mock', 200, 41.33, 100), rec('u', 'paper', 250, 0, 0),
    rec('p2', 'paper', 300, 41.33, 100), rec('p3', 'paper', 400, 36, 95)];
  const a = S.standing(tests, 'p1');
  assert.deepEqual([a.n, a.i, a.first, a.best, a.prev, a.delta, a.deltaPts], [4, 0, true, false, null, null, null]);
  const b = S.standing(tests, 'm1');
  assert.equal(b.first, false); assert.equal(b.best, true, 'the best share so far, and a later tie keeps it best'); assert.equal(b.prev.t.id, 'p1'); approx(b.delta, 11.33, 1e-9);
  const c = S.standing(tests, 'p2');
  assert.equal(c.best, true); assert.equal(c.prev.t.id, 'm1', 'the quiz and the unscored sitting in between never count'); approx(c.delta, 0, 1e-9);
  const d = S.standing(tests, 'p3');
  assert.equal(d.best, false); assert.equal(d.delta, null, 'out of different marks: no marks delta'); assert.equal(d.deltaPts, Math.round(100 * (36 / 95 - 0.4133)));
  assert.equal(S.standing(tests, 'q1'), null, 'a short test has no full-length standing');
  assert.equal(S.standing(tests, 'u'), null, 'nor a Not scored sitting');
  assert.equal(S.standing([rec('x', 'mock', 1, 10, 100)], 'x').best, false, 'one sitting is the first, never "best of 1"');
});
