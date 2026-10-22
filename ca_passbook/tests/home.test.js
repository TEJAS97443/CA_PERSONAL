/* Home page (app/js/views/home.js), v3 adapted for CA Inter Group II: the pure helpers behind the hero, the number strip, the papers by weight,
   the findings, the labs, the question of the day and the tests card. The view itself is DOM-only; here every helper is checked against two
   catalogues: the shared fixture (tests/fixtures/catalogue.js via NS.catalogue(): every CA sub-topic as a lesson, a small synthetic MCQ bank)
   for the learner states, and an empty one (the real syllabus and exam calendar, no lesson, no question, no lab) for what a fresh build shows. */
globalThis.GA = globalThis.GA || {};
const path = require('path'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
require('../app/js/core/util.js');
const Data = require('../app/js/core/data.js');
const Ins = require('../app/js/core/insights.js');
const Stats = require('../app/js/core/stats.js');
const SC = require('../app/js/core/scoring.js') || GA.scoring;
const TG = require('../app/js/core/testgen.js');
const H = require('../app/js/views/home.js');
const NS = require('./next-states.js');
const FX = require('./fixtures/catalogue.js');

const { D, I } = NS.catalogue();
/* the empty catalogue: what a build with no lesson, no ICAI question and no lab ships */
const M0 = FX.real();
Object.assign(M0, { lessons: [], cards: [], papers: [], pyq: { cols: M0.pyq.cols, rows: [] }, labs: [], topicMarks: {}, stats: { diagrams: {}, quiz: {}, embeds: {}, disputes: [] } });
const D0 = Data.buildCatalogue(JSON.parse(JSON.stringify(M0))), I0 = Ins.build(D0, M0.stats);
const NSUB = M0.syllabus.subjects.reduce((n, x) => n + x.topics.reduce((k, t) => k + t.subtopics.length, 0), 0);   // the syllabus's sub-topics (it may still grow)
/* the fixture's full question records, in a registry of their own (the shared GAD belongs to the other test files) */
const BOX = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } };
FX.register(BOX);
const fullQ = pid => (BOX.pyq[pid] || []).map(r => Object.assign({}, D.qById[r.id] || {}, r));
const blank = () => ({ profile: {}, lessons: {}, q: {}, log: [], tests: [], cards: {}, nb: {}, act: {}, plan: null, live: null, labs: {}, seen: {} });
const now = Date.UTC(2026, 9, 13, 12);
const sc = GA.scoring;
const ST = Stats;
const MAIN = I.ranking[0];
const exOf = (st, today, X) => ST.exam(st, X || D.exam, today);
const model = (st, today, o) => H.heroModel(st, D, I, Object.assign({ today, now: Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10), 12), exam: exOf(st, today) }, o));

test('home: ctaFor names the destination of every finding link', () => {
  assert.equal(H.ctaFor('#/l/cma.mc.bep'), 'Open the lesson');
  assert.equal(H.ctaFor('#/l/cma.mc.bep?path=crash'), 'Start the fast track');
  assert.equal(H.ctaFor('#/lab/bep'), 'Open the lab');
  assert.equal(H.ctaFor('#/labs'), 'Browse the labs');
  assert.equal(H.ctaFor('#/q/fx-cma-2025%3AQ1'), 'See the question');
  assert.equal(H.ctaFor('#/pyq?type=MCQ'), 'See those questions');
  assert.equal(H.ctaFor('#/pyq?disputed=1&sort=old'), 'See the disputes');
  assert.equal(H.ctaFor('#/pyq'), 'See the questions');
  assert.equal(H.ctaFor('#/s/cma'), 'Open the subject');
  assert.equal(H.ctaFor('#/map?lens=syllabus'), 'Open the map');
  assert.equal(H.ctaFor('#/syllabus'), 'Open the syllabus');
  assert.equal(H.ctaFor('#/elsewhere'), 'Open');
});

test('home: statParts keeps the hook number verbatim and glues % to it; statNote never invents a unit', () => {
  assert.deepEqual(H.statParts({ value: 51, unit: '%' }), { value: '51%', unit: '', glued: true });
  assert.deepEqual(H.statParts({ value: 80, unit: '% numerical' }), { value: '80%', unit: 'numerical', glued: true });
  assert.deepEqual(H.statParts({ value: 20, unit: 'of 20 attempts' }), { value: '20', unit: 'of 20 attempts', glued: false });
  assert.equal(H.statParts({ value: 3.4, unit: 'points down' }).value, '3.4');
  assert.equal(H.statParts({ value: 125000, unit: 'marks' }).value, '1,25,000', 'Indian digit grouping');
  assert.equal(H.statNote({ stat: { value: 40, unit: 'marks' } }), 'marks');
  assert.equal(H.statNote({ stat: { value: 40, unit: '%' }, evidence: { from: 2024 } }), 'since 2024');
  assert.equal(H.statNote({ stat: { value: 40, unit: '%' }, evidence: { from: 2024, to: 2026 } }), '', 'a range is in the claim, not the note');
  for (const h of I.hooks()) {                                         // whatever hooks the catalogue has: printed as computed
    const s = H.statParts(h.stat);
    assert.equal(parseFloat(s.value.replace(/,/g, '')), Math.round(h.stat.value * 10) / 10, h.id);
  }
});

test('home: the findings: the preferred kinds first, four different hooks, rotated once a day for a returning learner (P3-01)', () => {
  const hk = (id, kind, subject, template) => ({ id, kind, subject: subject || null, template: template || kind + '-x', stat: { value: 1, unit: '' } });
  const all = [hk('a', 'freq', 'cma', 'freq-years'), hk('b', 'freq', 'aud'), hk('c', 'trend', 'cma'), hk('d', 'path', null, 'path-half'), hk('e', 'trap', 'fm'),
    hk('f', 'mix', 'sm'), hk('g', 'trend', 'aud'), hk('h', 'labs', 'cma'), hk('i', 'freq', 'cma')];
  const f = H.pickFindings(all);
  assert.equal(f.length, 4); assert.deepEqual(f.slice(0, 2).map(h => h.id), ['a', 'd'], 'the preferred templates first');
  assert.equal(new Set(f.map(h => h.kind)).size, 4, 'four kinds while the bank has them');
  assert.deepEqual(H.pickFindings([]), []);
  assert.deepEqual(H.dailyFindings(all, {}), f, 'a first run keeps the picked four');
  const a = H.dailyFindings(all, { day: '2026-10-16', subject: 'cma' }), b = H.dailyFindings(all, { day: '2026-10-16', subject: 'cma' });
  assert.deepEqual(a.map(h => h.id), b.map(h => h.id), 'the same day, the same four');
  assert.equal(a.length, 4); assert.equal(new Set(a.map(h => h.id)).size, 4);
  assert.deepEqual(a.slice(0, 2).map(h => h.subject), ['cma', 'cma'], 'two about the hero\'s paper, first');
  assert.ok(a.slice(2).every(h => h.subject !== 'cma'), 'the other two never about it');
  const days = ['2026-10-17', '2026-10-18', '2026-10-19', '2026-10-20', '2026-10-21'].map(d => H.dailyFindings(all, { day: d, subject: 'cma' }).map(h => h.id).join());
  assert.ok(days.some(x => x !== a.map(h => h.id).join()), 'another day, other findings');
  const few = all.filter(h => h.subject === 'cma').concat([all[3]]);
  assert.equal(H.dailyFindings(few, { day: '2026-10-16', subject: 'cma' }).length, 4, 'too few others: the paper\'s own fill the four');
  assert.ok(typeof H.hookViz === 'function' && H.hookViz({ stat: { value: 40, unit: '%' } }, { years: [] }).type === 'meter', 'a bare share is a meter');
});

test('home: the question of the day is fixed for the study day, drawn from finished lessons first (P3-46, D12)', () => {
  const C = D.questions.filter(H.isCandidate), day = '2026-10-16', start = Date.UTC(2026, 9, 15, 22, 30);
  assert.ok(C.length >= 40, 'the fixture bank gives a pool: ' + C.length);
  const s = blank(), L = D.lessons.find(l => C.filter(m => m.subtopic === l.id).length >= 2);
  s.lessons[L.id] = { first: start - 864e5 * 3, last: start - 864e5 * 2, done: start - 864e5 * 2, secs: 900, visits: 2, quiz: {} };
  const o1 = H.qotdOrder(C, s, day, start, D);
  assert.equal(o1.length, C.length, 'every candidate is in the order');
  assert.equal(o1[0].subtopic, L.id, 'a question from a lesson finished before today comes first');
  const s2 = JSON.parse(JSON.stringify(s));
  s2.q[o1[0].id] = { n: 1, ok: 1, last: start + 3600e3, lastOk: 1, firstOk: 1 }; s2.log.push([start + 3600e3, o1[0].id, 1, 9000, 'p']);
  s2.q[o1[5].id] = { n: 1, ok: 0, last: start + 3700e3, lastOk: 0, firstOk: 0 }; s2.log.push([start + 3700e3, o1[5].id, 0, 9000, 'p']);
  const L2 = D.lessons.find(l => l.subject !== L.subject);
  s2.lessons[L2.id] = { first: start + 1000, last: start + 2000, done: start + 3000, secs: 900, visits: 1, quiz: {} };
  assert.deepEqual(H.qotdOrder(C, s2, day, start, D).map(m => m.id), o1.map(m => m.id), 'the same order all day');
  const o3 = H.qotdOrder(C, s2, '2026-10-17', start + 864e5, D);
  assert.notDeepEqual(o3.slice(0, 5).map(m => m.id), o1.slice(0, 5).map(m => m.id));
  assert.ok(o3.findIndex(m => m.id === o1[0].id) > o3.findIndex(m => !s2.q[m.id]), 'yesterday\'s answered question is not today\'s first');
  assert.equal(H.qotdSaved({ seen: { [H.QOTD_FLAG]: day + '|' + o1[0].id } }, day), o1[0].id);
  assert.equal(H.qotdSaved({ seen: { [H.QOTD_FLAG]: '2026-10-15|' + o1[0].id } }, day), null);
  assert.equal(H.qotdSaved(blank(), day), null);
  assert.deepEqual(D0.questions.filter(H.isCandidate), [], 'no ICAI bank: nothing to ask inline');
});

/* tests/run.js is synchronous, so the promise-based question-of-the-day walk runs in a child process that prints JSON */
function qotdRun(body) {
  const cp = require('child_process'), J = JSON.stringify;
  const script = `globalThis.GA = {}; globalThis.GAD = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } };
    const R = ${J(ROOT + '/')}; require(R + 'app/js/core/util.js'); const Data = require(R + 'app/js/core/data.js'); const Ins = require(R + 'app/js/core/insights.js');
    require(R + 'app/js/core/stats.js'); require(R + 'app/js/core/scoring.js'); const H = require(R + 'app/js/views/home.js');
    const NS = require(R + 'tests/next-states.js'), FX = require(R + 'tests/fixtures/catalogue.js'), { D, I, shipped } = NS.catalogue();
    const BOX = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } };
    if (shipped) for (const p of D.papers) { require(R + 'data/pyq/' + p.id + '.js'); BOX.reg('pyq', p.id, GAD.pyq[p.id]); } else FX.register(BOX);
    (async () => { ${body} })().then(r => process.stdout.write(JSON.stringify(r)), e => process.stdout.write(JSON.stringify({ error: String(e && e.stack || e) })));`;
  const r = JSON.parse(cp.execFileSync(process.execPath, ['-e', script], { maxBuffer: 64 << 20 }).toString());
  if (r && r.error) throw new Error(r.error);
  return r;
}

test('home: the question-of-the-day walk takes the first short question in the order, fetching papers in parallel rounds (P3-46, P2-79)', () => {
  const r = qotdRun(`
    const P = { a: [{ id: 'a1' }, { id: 'a2', ok: 1 }], b: [{ id: 'b1' }], c: [{ id: 'c1', ok: 1 }], d: [{ id: 'd1', ok: 1 }], e: [{ id: 'e1', ok: 1 }], f: [{ id: 'f1', ok: 1 }] };
    const mk = (...ids) => ids.map(id => ({ id, paper: id[0] }));
    const run = async (order, rounds, fail) => {
      const calls = [], waves = []; let inflight = 0;
      const load = async p => { if (!inflight) waves.push([]); waves[waves.length - 1].push(p); calls.push(p); inflight++; await new Promise(res => setTimeout(res, 2)); inflight--;
        if (fail && fail.includes(p)) throw new Error('offline'); return P[p]; };
      const res = await H.qotdPick(order, load, q => !!q.ok, rounds);
      return { id: res.q && res.q.id, calls, waves, rounds: res.rounds, papers: res.papers };
    };
    return {
      first: await run(mk('a1', 'b1', 'c1', 'd1', 'a2'), [2, 3]),
      budget: await run(mk('a1', 'b1', 'c1', 'a2'), [2]),
      fail: await run(mk('c1', 'd1'), [2, 3], ['c']),
      none: await run(mk('b1'), [2, 3]),
      empty: await run([], [2, 3]),
      dflt: H.QOTD_ROUNDS
    };`);
  assert.deepEqual(r.dflt, [2, 3], 'at most 5 paper files in 2 round trips');
  // a1 and b1 are not short, c1 is: round 1 fetches a and b together, round 2 the next papers the order names (c and d; up to 3)
  assert.equal(r.first.id, 'c1', 'the first short question in the order');
  assert.deepEqual(r.first.waves, [['a', 'b'], ['c', 'd']], 'each round fetches its papers together; only papers the order names');
  assert.equal(r.first.rounds, 2);
  // the budget runs out before c: the first short question in the order among the papers fetched (a2, later in the order)
  assert.deepEqual([r.budget.id, r.budget.waves], ['a2', [['a', 'b']]]);
  // a paper that does not arrive is skipped, never fatal
  assert.equal(r.fail.id, 'd1'); assert.deepEqual(r.fail.waves, [['c', 'd']]);
  assert.equal(r.none.id, null, 'nothing short in what was fetched'); assert.equal(r.empty.id, null); assert.deepEqual(r.empty.calls, []);
});


test('home: every learner state gets its own question of the day from at most 5 paper files in 2 rounds, from its finished lessons\' paper (P3-46)', () => {
  const r = qotdRun(`
    const C = D.questions.filter(H.isCandidate), full = {};
    for (const p of D.papers) full[p.id] = (BOX.pyq[p.id] || []).map(x => Object.assign({}, D.qById[x.id] || {}, x));
    const out = [];
    for (const c of NS.states(D, I)) {
      const s = JSON.parse(JSON.stringify(c.state));
      for (let n = 0; n < 14; n++) {
        const t = new Date(2026, 9, 17 + n), day = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
        const start = GA.util.dayBounds(day)[0], order = H.qotdOrder(C, s, day, start, D);
        const calls = [], waves = []; let inflight = 0;
        const load = async p => { if (!inflight) waves.push(0); waves[waves.length - 1]++; calls.push(p); inflight++; await new Promise(res => setTimeout(res, 1)); inflight--; return full[p]; };
        const a = await H.qotdPick(order, load, H.isShort), b = await H.qotdPick(order, async p => full[p], H.isShort);
        const done = Object.keys(s.lessons || {}).filter(id => D.lessonById[id] && s.lessons[id].done && s.lessons[id].done < start).map(id => D.lessonById[id].subject);
        const freshDone = C.some(m => done.includes(m.subject) && !(s.q && s.q[m.id] && s.q[m.id].n));     // a finished lesson's paper still has an unanswered question
        s.seen = s.seen || {}; s.seen[H.QOTD_FLAG] = H.qotdValue(s, day, a.q.id);
        const same = H.qotdOrder(C, s, day, start, D).slice(0, 60).map(m => m.id).join() === order.slice(0, 60).map(m => m.id).join();
        out.push({ n: c.n, day, id: a.q && a.q.id, again: b.q && b.q.id, short: !!a.q && H.isShort(a.q), files: new Set(calls).size, calls: calls.length, waves: waves.length,
                   subject: a.q && a.q.subject, done, freshDone, same, saved: H.qotdSaved(s, day) });
      }
    }
    return out;`);
  assert.ok(r.length >= 11 * 14, 'every state, two weeks');
  for (const x of r) {
    const tag = `state ${x.n} on ${x.day}`;
    assert.ok(x.id && x.short, tag + ': a question of the day, short enough for the card');
    assert.equal(x.again, x.id, tag + ': the same pick for the same day and state');
    assert.equal(x.saved, x.id, tag + ': remembered for the rest of the day');
    assert.ok(x.same, tag + ': saving the pick does not move the day\'s order');
    assert.ok(x.files <= 5 && x.calls === x.files, `${tag}: ${x.files} paper files, each fetched once`);
    assert.ok(x.waves <= 2, `${tag}: ${x.waves} round trips`);
  }
  for (const n of new Set(r.map(x => x.n))) {
    const xs = r.filter(x => x.n === n), ids = xs.map(x => x.id);
    assert.ok(new Set(ids).size >= 7, `state ${n}: a different question on most days (${new Set(ids).size} of 14)`);
    ids.forEach((id, i) => assert.ok(!i || id !== ids[i - 1], `state ${n}: an unanswered question of the day gives way the next day (${id})`));
    if (xs[0].done.length && xs[0].freshDone) assert.ok(xs[0].done.includes(xs[0].subject), `state ${n}: day one from a finished lesson's paper (${xs[0].done}), not ${xs[0].subject}`);
  }
});

test('home: the labs Home shows are real ready labs: a first run gets the first three, a returning learner\'s untried labs come first (P3-01)', () => {
  const pool = ['bep', 'eoq', 'npv', 'variance', 'process'];
  assert.deepEqual(H.pickLabs(pool, new Set(['bep', 'npv']), false), ['bep', 'eoq', 'npv'], 'a first run: the first three');
  assert.deepEqual(H.pickLabs(pool, new Set(['bep', 'npv']), true), ['eoq', 'variance', 'process'], 'labs already run give way');
  assert.deepEqual(H.pickLabs(pool, new Set(pool), true), pool.slice(0, 3), 'all tried: the usual three');
  assert.deepEqual(H.pickLabs(pool, new Set(), true), pool.slice(0, 3));
  assert.deepEqual(H.pickLabs([], new Set(), true), [], 'no ready lab: no lab section');
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/home.js'), 'utf8');
  for (const gate of ['cpu-sched', 'page-replace', 'subnet', 'disk-sched', 'hashing', 'os.mem.paging']) assert.ok(!src.includes(`'${gate}'`), 'no hard-coded GATE lab or lesson: ' + gate);
});

test('home: the Wrapped card is GA.engage.recap()\'s: its headline, one unlit bar per slide, its range (P2-36, P3-05, P3-27)', () => {
  assert.equal(H.wrapModel(null, '2026-10-16'), null, 'no recap, no card');
  const w = { pyq: { answered: 168, distinct: 155, firstTry: { n: 40, ok: 22, acc: 0.55 } }, best: { name: 'Financial Management' }, minutes: 1038, streak: 9, lessons: 3, activeDays: 12 };
  const m = H.wrapModel({ range: { key: 'month', label: 'This month' }, href: '#/wrapped?range=month', w, slides: 7, keys: [] }, '2026-10-16');
  assert.deepEqual(m.big, [168, 'questions answered'], 'the same number as the recap\'s own headline (raw answers)');
  assert.equal(m.bars, 7); assert.equal(m.href, '#/wrapped?range=month'); assert.equal(m.range, 'October');
  assert.deepEqual(m.lines.map(x => x.b + (x.glue ? '' : ' ') + x.t), ['55% right on the first try', 'FM was your top subject', '17 h 18 min of focused study']);
  const all = H.wrapModel({ range: { key: 'all', label: 'All time' }, href: '#/wrapped?range=all', w: Object.assign({}, w, { pyq: { answered: 0, firstTry: {} }, best: null, minutes: 0 }), slides: 4 }, '2026-10-16');
  assert.deepEqual([all.range, all.big[1], all.lines[0].b + all.lines[0].t], ['All time', 'lessons finished', '9 days: your longest streak']);
  const wk = H.wrapModel({ range: { key: 'week', label: 'This week' }, w: Object.assign({}, w, { pyq: { answered: 0, firstTry: {} }, best: null, minutes: 0, lessons: 0 }), slides: 3 }, '2026-10-16');
  assert.equal(wk.lines[0].t, ': your longest run this week');
});

/* ---- the hero is the shared next step (P0-08, P0-22, P1-32, P1-61) */
test('home: in all 12 learner states the hero opens exactly the shared next step (nextStep, kind "any"), never a test in progress', () => {
  const states = NS.states(D, I);
  assert.ok(states.length >= 11, 'the fixture builds the learner states');
  for (const c of states) {
    const noLive = c.state.live ? Object.assign({}, c.state, { live: null }) : c.state;
    const step = ST.nextStep(noLive, D, { kind: 'any', scope: 'all', today: c.today, I }), m = model(c.state, c.today);
    assert.ok(m && step, c.n + ' ' + c.name);
    assert.equal(m.href, step.href, `${c.n} ${c.name}: the hero's primary action is the shared step`);
    assert.ok(!/^#\/test\/run\//.test(m.href) && m.kind !== 'test', `${c.n} ${c.name}: never Resume test on Home`);
    const fresh = step.rule === 'start' && !(c.state.tests || []).some(t => t && t.finished);
    assert.equal(m.first, fresh, `${c.n} ${c.name}: the first-run hero shows exactly while the step is 'Start here' and no test is finished`);
    assert.deepEqual(H.sections(c.state, step), fresh ? H.ORDER.first : H.ORDER.returning, c.n + ': page order');
    if (step.kind === 'lesson') assert.equal(m.id, step.id, c.n + ': the hero names the step\'s lesson');
    if (c.expect && c.expect.any && step.kind === 'lesson' && !fresh) assert.equal(m.id, c.expect.any.id, c.n + ': the table\'s lesson');
  }
  const at = n => states.find(c => c.n === n);
  assert.equal(model(at(1).state, at(1).today).first, true, 'fresh: first-run hero');
  assert.equal(model(at(2).state, at(2).today).first, true, 'one question answered: still the first-run hero');
  const m3 = model(at(3).state, at(3).today);
  assert.deepEqual([m3.kind, m3.cta, m3.id], ['lesson', 'Start', I.order(MAIN)[1]]); assert.equal(m3.eyebrow, 'Next up · ' + D.subjectById[MAIN].name);
  const m4 = model(at(4).state, at(4).today);
  assert.deepEqual([m4.kind, m4.cta, m4.id], ['lesson', 'Resume', I.order(MAIN)[6]]);
  const m5 = model(at(5).state, at(5).today);
  assert.deepEqual([m5.kind, m5.cta, m5.id], ['lesson', 'Resume', I.order(MAIN)[6]], 'a 2-second peek never takes over the hero');
  const m7 = model(at(7).state, at(7).today);
  assert.ok(m7.kind !== 'test' && !/^#\/test\/run\//.test(m7.href), 'a live diagnostic does not take over Home');
  const m11 = model(at(11).state, at(11).today);
  assert.deepEqual([m11.kind, m11.cta, m11.id], ['lesson', 'Revise', I.order(MAIN)[0]]); assert.match(m11.eyebrow, /^10 days to .+ · final stretch$/);
});

test('home: time on a page alone keeps a profile fresh: first-run hero and the first-run page order (P0-22)', () => {
  const idle = blank(); idle.act['2026-10-13'] = { s: 900, q: 0, c: 0, l: 0 };
  assert.equal(H.hasProgress(idle), false, 'time spent on a page is not progress');
  assert.equal(ST.hasProgress(idle), H.hasProgress(idle), 'Home uses the one predicate');
  assert.equal(model(idle, '2026-10-16').first, true);
  assert.deepEqual(H.sections(idle, H.stepFor(idle, D, I, { today: '2026-10-16' })), H.ORDER.first);
  assert.deepEqual(H.ORDER.returning, ['hero', 'strip', 'practice', 'bento', 'findings', 'labs', 'footer'], 'D2: hero, my numbers, practice row, papers, findings, labs');
  assert.deepEqual(H.ORDER.first, ['hero', 'strip', 'bento', 'practice', 'findings', 'labs', 'footer']);
});

test('home: sections with no data hide themselves: practice and the findings wait for ICAI questions', () => {
  assert.deepEqual(H.sectionsFor(true, D0), ['hero', 'strip', 'bento', 'labs', 'footer'], 'no bank: no practice row, no findings');
  assert.deepEqual(H.sectionsFor(false, D0), ['hero', 'strip', 'bento', 'labs', 'footer']);
  assert.deepEqual(H.sectionsFor(true, D), H.ORDER.first, 'with questions every section is back');
  assert.deepEqual(H.sectionsFor(false, D), H.ORDER.returning);
  assert.equal(H.bankEmpty(D0), true); assert.equal(H.bankEmpty(D), false);
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/home.js'), 'utf8');
  assert.match(src, /const order = sectionsFor\(firstRun, D\);/, 'the view renders exactly sectionsFor()');
  assert.match(src, /cards = safe\(\(\) => I\.labCards\(\), \[\]\)\.filter\(c => c\.status !== 'planned'\)/, 'labs come from the catalogue, planned ones left out');
  assert.match(src, /if \(!pick\.length\) return '';/, 'no ready lab: no lab section');
});

test('home: the first-run hero\'s coral is the shared "Start here" in two lines, with an "or pick a paper" link (P1-32, D1, P1-03)', () => {
  const today = '2026-10-16', m = model(blank(), today), step = H.stepFor(blank(), D, I, { today });
  assert.equal(m.first, true); assert.equal(m.href, step.href); assert.equal(step.label, 'Start here');
  const L = D.lessonById[step.id], sj = D.subjectById[L.subject];
  assert.equal(m.kicker, `Start here · ${H.medName(sj.name)} · ${L.minutes} min`, 'line 1: the step, its paper and its minutes');
  assert.equal(m.line, L.title, 'line 2: the lesson it opens');
  assert.equal(L.subject, MAIN, 'the top paper\'s first lesson');
  assert.deepEqual(m.alt, { href: '#/#hm-subjects', label: 'or pick a paper' }, 'a real link that also works in a new tab');
  assert.equal(m.eyebrow, 'CA Inter Group II · 84 days to Paper 4', 'the countdown to the first Group II paper');
  assert.equal(m.top.length, 2); assert.deepEqual(m.top.map(x => x.id), ['cma', 'aud'], 'the two 100-mark papers, syllabus order between equals');
  I.subjects.filter(x => !m.top.includes(x)).forEach(x => assert.ok(H.perPaper(x) <= H.perPaper(m.top[1]), x.id));
  assert.deepEqual(m.top.map(H.perPaper), [100, 100], 'weights are the papers\' marks');
  assert.deepEqual(m.pool, ['cma', 'aud'], 'the try-one question comes from the same two papers');
  assert.equal(H.csRank(I)[0], 'cma');
  assert.equal(m.noLessons, false);
});

test('home: with no lesson written yet the first-run hero opens the syllabus and lists the four papers with their marks and exam days', () => {
  const today = '2026-10-20';
  for (const st of [blank(), Object.assign(blank(), { lessons: { 'cma.mc.bep': { done: now } } })]) {
    const m = H.heroModel(st, D0, I0, { today, now, exam: ST.exam(st, D0.exam, today) });
    assert.equal(m.first, true, 'every learner sees the first-run hero while no lesson exists');
    assert.deepEqual([m.href, m.line, m.kicker], ['#/syllabus', 'Open the syllabus', `Papers 4, 5 and 6 · ${NSUB} sub-topics`]);
    assert.equal(m.eyebrow, 'CA Inter Group II · 80 days to Paper 4'); assert.equal(m.noLessons, true);
  }
  const step = H.stepFor(blank(), D0, I0, { today });
  assert.ok(!/^#\/(test|pyq|q)\b/.test(step.href), 'no step names a test or a question while the bank is empty: ' + step.href);
  assert.deepEqual(H.papersModel(I0, D0, today, ST).map(p => [p.id, p.label, p.marks, p.day, p.days]), [
    ['cma', 'Paper 4', 100, '2027-01-08', 80], ['aud', 'Paper 5', 100, '2027-01-10', 82], ['fm', 'Paper 6A', 50, '2027-01-12', 84], ['sm', 'Paper 6B', 50, '2027-01-12', 84]]);
  assert.deepEqual(H.groupFacts(I0, D0), { total: 300, paper: 40, all: 150, six: true }, 'Group II is 300 marks; pass 40 in each paper and 150 in all');
  assert.equal(H.papersText(I0.subjects), 'Papers 4, 5 and 6'); assert.equal(H.papersText([{ paper: 'P4' }]), 'Paper 4');
  assert.equal(H.paperLabel('P6A'), 'Paper 6A'); assert.equal(H.paperLabel(''), '');
  const items = H.stripItems(I0, blank(), D0, {});
  assert.deepEqual(items.map(x => [x.n, x.label]), [[NSUB, 'sub-topics in the syllabus']], 'only counts that are not zero (the view drops a strip of one)');
  assert.deepEqual(H.stripItems(I0, blank(), D0, { mine: true }).map(x => x.k), ['subtopics']);
});

test('home: with no ICAI bank a test or question step becomes the flashcards (or the syllabus); with a bank the step is untouched', () => {
  const mock = { kind: 'mock', rule: 'end', label: 'Take a full mock', title: 'Full-length mock', href: '#/test?new=mock', minutes: 180 };
  const a = H.honestStep(mock, D0);
  assert.deepEqual([a.label, a.href, a.title], ['Open the syllabus', '#/syllabus', 'Every lesson so far is done'], 'no cards either: the syllabus');
  const D1 = Object.assign({}, D0, { cards: [{ id: 'x#1' }] });
  assert.deepEqual([H.honestStep(mock, D1).label, H.honestStep(mock, D1).href], ['Review flashcards', '#/flash']);
  const retry = { kind: 'retry', rule: 'retry', label: 'Retry', title: '5 missed questions', href: '#/pyq?retry=1' };
  assert.equal(H.honestStep(retry, D1).href, '#/flash');
  assert.equal(H.honestStep(mock, D), mock, 'a bank: the shared step as it is');
  const lesson = { kind: 'lesson', label: 'Start here', href: '#/l/cma.mc.bep' };
  assert.equal(H.honestStep(lesson, D0), lesson, 'a lesson step is always real');
  assert.equal(H.honestStep(null, D0), null);
});

test('home: the lesson hero prints only what the state holds; Resume opens the last section read (P1-01)', () => {
  const today = '2026-10-16', now2 = Date.UTC(2026, 9, 16, 12);
  const l0 = I.order(MAIN)[3], info = I.lessonInfo(l0), L = D.lessonById[l0];
  const open = blank();
  open.lessons[l0] = { first: now2 - 864e5 * 3, last: now2 - 864e5 * 2, done: null, secs: 300, visits: 2, quiz: { a: { n: 1, ok: 1 }, b: { n: 2, ok: 1 }, c: { n: 0, ok: 0 } } };
  open.lessons[D.lessons[1].id] = { first: now2 - 864e5 * 5, last: now2 - 864e5 * 5, done: null, secs: 10, visits: 1, quiz: {} };
  const m = H.heroModel(open, D, I, { today, now: now2, exam: exOf(open, today) });
  assert.deepEqual([m.kind, m.id, m.cta, m.first], ['lesson', l0, 'Resume', false]);
  assert.equal(m.title, L.title); assert.equal(m.eyebrow, 'Continue · ' + D.subjectById[L.subject].name);
  assert.deepEqual(m.segs, { total: info.quiz, done: 2 }, 'segments = the lesson\'s self-checks, the answered ones filled');
  assert.equal(m.lead, `2 of ${info.quiz} self-checks`);
  assert.equal(m.rest, `about ${L.minutes - 5} min left`, 'estimated reading time minus the time actually spent');
  assert.equal(m.when, 'opened 2 days ago');
  assert.equal(m.marks, info.marks); assert.equal(m.papers, info.papers);
  assert.equal(m.figure, 'diagram', 'every lesson: its own most legible diagram');
  assert.equal(m.alt.href, '#/s/' + L.subject);
  open.lessons[l0].at = { h: 'how-it-works', t: now2 - 864e5 * 2 + 5000 };
  assert.match(H.heroModel(open, D, I, { today, now: now2 }).href, new RegExp('^#/l/' + l0.replace(/\./g, '\\.') + '(\\?focus=1)?#how-it-works$'), 'Resume opens #/l/<id>#<section>');
  open.lessons[l0].secs = (L.minutes + 5) * 60;
  assert.match(H.heroModel(open, D, I, { today, now: now2 }).rest, /^\d+ min read so far$/, 'time beyond the estimate never prints a negative "left"');
  const fin = blank(); fin.lessons[l0] = { first: now2 - 1000, last: now2 - 500, done: now2 - 400, secs: 900, visits: 2, quiz: {} };
  const n = H.heroModel(fin, D, I, { today, now: now2 });
  assert.equal(n.kind, 'lesson'); assert.notEqual(n.id, l0); assert.equal(n.cta, 'Start'); assert.match(n.eyebrow, /^Next up · /);
  assert.equal(n.rest, `${D.lessonById[n.id].minutes} min read`); assert.ok(n.when, 'a real reason: ' + n.when);
  const lv = Object.assign(blank(), { lessons: open.lessons }); lv.live = { id: 'abc', title: 'A test', qids: ['a', 'b', 'c'], responses: { a: 1, c: 'B' }, marked: { b: true }, cur: 1, limitMs: 36e5, elapsedMs: 6e5 };
  const tm = H.heroModel(lv, D, I, { today, now: now2 });
  assert.deepEqual([tm.kind, tm.id, tm.cta], ['lesson', l0, 'Resume'], 'the lesson to continue, not the test');
  assert.deepEqual(H.sections(lv, H.stepFor(lv, D, I, { today })), H.ORDER.returning);
});

test('home: the hero follows the season around the Group II papers: final stretch, the eve, a paper day, between papers, after the last (P1-61, D20)', () => {
  const at = (st, day) => H.heroModel(st, D, I, { today: day, now: Date.UTC(+day.slice(0, 4), +day.slice(5, 7) - 1, +day.slice(8, 10), 12), exam: ST.exam(st, D.exam, day) });
  const order = I.order(MAIN);
  // 10 days to Paper 4 (8 Jan 2027, an official paper day) with a lesson open: Continue it, under the countdown
  const a = blank(); a.lessons[order[0]] = { first: Date.UTC(2026, 11, 28), last: Date.UTC(2026, 11, 28), done: null, secs: 600, visits: 1, quiz: {} };
  const ma = at(a, '2026-12-29');
  assert.equal(ma.season, 'final'); assert.equal(ma.cta, 'Resume'); assert.equal(ma.id, order[0]);
  assert.equal(ma.eyebrow, '10 days to Paper 4 · final stretch');
  const b = blank(); b.cards[D.cards[0].id] = { due: '2027-01-20', ivl: 9, ease: 2.5, reps: 3, lapses: 0, last: '2026-12-30' };
  const me = at(b, '2027-01-07');
  assert.deepEqual([me.season, me.title], ['eve', 'Paper 4 is tomorrow.']); assert.match(me.note.text, /admit card/);
  assert.equal(me.eyebrow, 'CA Inter January 2027 · Friday 8 January', 'the eyebrow names the paper\'s day');
  assert.equal(me.href, ST.nextStep(b, D, { today: '2027-01-07', I }).href, 'the season\'s own step');
  const md = at(b, '2027-01-08');
  assert.deepEqual([md.season, md.title, md.mood], ['day', 'Paper 4 is today.', 'happy']);
  assert.equal(md.note.text, 'The paper runs 2 to 5 PM IST, with reading time from 1.45 PM.', 'the hours from ICAI\'s announcement');
  const mb = at(b, '2027-01-09');
  assert.deepEqual([mb.season, mb.title], ['eve', 'Paper 5 is tomorrow.'], 'between papers: the next paper\'s eve');
  const m6 = at(b, '2027-01-12');
  assert.deepEqual([m6.season, m6.title], ['day', 'Paper 6 is today.'], 'Papers 6A and 6B are one Paper 6');
  const mx = at(b, '2027-01-15');
  assert.equal(mx.season, 'done');
  if (mx.kind === 'task') assert.equal(mx.title, 'CA Inter January 2027 is over.');
  assert.equal(mx.note, null, 'no results day is published: no results line');
  const lv = blank(); lv.live = { id: 't1', title: 'Test', qids: ['a'], responses: {}, limitMs: 6e5, elapsedMs: 0 };
  assert.deepEqual([at(lv, '2027-01-07').kind, at(lv, '2027-01-07').href], [at(blank(), '2027-01-07').kind, at(blank(), '2027-01-07').href], 'a live test never takes over Home');
});

test('home: the local stand-in follows the same precedence as nextStep (live test, Continue skipping peeks, the current paper, Start here)', () => {
  const states = NS.states(D, I);
  for (const n of [1, 2, 3, 4, 5, 7, 8, 9]) {
    const c = states.find(x => x.n === n), mine = H.localStep(c.state, D, I, { today: c.today });
    assert.ok(mine && mine.href, n + ' a step');
    const ref = ST.nextStep(c.state, D, { today: c.today, I });
    assert.deepEqual([mine.label, mine.id], [ref.label, ref.id], `${n} ${c.name}`);
  }
  assert.equal(H.isReal({ secs: 2 }), false, 'a 2-second peek'); assert.equal(H.isReal({ secs: 130 }), true);
  assert.equal(H.isReal({ quiz: { a: { n: 1 } } }), true); assert.equal(H.isReal({ at: { h: 'x' } }), true); assert.equal(H.isReal({ done: 1 }), true);
  const E = ST.exam(blank(), D.exam, '2026-10-20');
  assert.equal(H.untilExam(E), '80 days to Paper 4');
  assert.equal(H.untilExam(ST.exam(blank(), D.exam, '2027-01-07')), 'Paper 4 is tomorrow');
  assert.equal(H.untilExam(ST.exam(blank(), D.exam, '2027-01-08')), 'Paper 4 is today');
  assert.equal(H.untilExam(null), '');
  assert.equal(H.taskTitle({ label: 'Retry', title: '5 missed questions' }), 'Retry 5 missed questions');
  assert.equal(H.taskTitle({ label: 'Quick 20', title: 'cards you know least' }), 'Quick 20: cards you know least');
  assert.equal(H.taskTitle({ label: 'Take a full mock', title: 'Full-length mock' }), 'Full-length mock');
});

test('home: the number strip: catalogue totals that are not zero for a first run, a returning learner\'s own counts over the totals (P2-02)', () => {
  const T = I.totals, a = H.stripItems(I, blank(), D, {});
  // an ICAI bank counts every item and document (the insights' totals are the exam papers': docs/ICAI_BANK.md §7)
  const icai = D.questions.length > 0 && D.questions.every(q => q.icai);
  const want = [['lessons', T.lessons], ['pyqs', icai ? D.questions.length : T.questions], ['papers', icai ? D.papers.length : T.papers], ['labs', T.readyLabs], ['cards', T.cards]].filter(x => x[1] > 0);
  assert.deepEqual(a.map(x => [x.k, x.n]), want.slice(0, 5), 'a catalogue cell for every count that is not zero: ' + JSON.stringify(a.map(x => [x.k, x.n])));
  assert.ok(a.every(x => x.of === null), 'a first run sees the catalogue');
  assert.equal(a.find(x => x.k === 'pyqs').label, 'ICAI questions');
  if (icai) assert.equal(a.find(x => x.k === 'papers').label, 'ICAI documents');
  else assert.deepEqual(a.find(x => x.k === 'papers').yr, '2025–2026', 'the year range, kept on one line');
  const s = blank();
  s.lessons[D.lessons[0].id] = { done: now }; s.lessons[D.lessons[1].id] = { done: null, visits: 1 };
  s.q[D.questions[0].id] = { n: 1 }; s.q[D.questions[1].id] = { n: 3 }; s.q[D.questions[2].id] = { n: 0, bm: 1 };
  s.tests = [{ paper: D.papers[0].id, finished: 1 }, { paper: D.papers[0].id, finished: 2 }, { kind: 'mock', finished: 3 }];
  s.cards = { c1: {}, c2: {} };
  const b = H.stripItems(I, s, D, { mine: true });
  assert.ok(!b.some(x => x.k === 'cards'), 'no flashcards cell: "due" lives only in the nav chip');
  assert.deepEqual(b.filter(x => x.of != null).map(x => [x.k, x.n, x.of, x.label]), [['lessons', 1, T.lessons, 'lessons done'], ['pyqs', 2, icai ? D.questions.length : T.questions, 'questions attempted'], ['papers', 1, icai ? D.papers.filter(p => p.sittable).length : T.papers, 'papers sat']]);   // ICAI: out of the documents that can be sat (not RTPs)
  const planned = H.stripItems({ totals: { lessons: 0, subtopics: NSUB, questions: 0, papers: 0, labs: 30, readyLabs: 0, cards: 0, years: [null, null] } }, blank(), { lessonById: {}, qById: {}, paperById: {} }, {});
  assert.deepEqual(planned.map(x => x.k), ['subtopics'], 'planned labs are not counted: only ready ones');
  const one = { totals: { lessons: 1, subtopics: NSUB, questions: 0, papers: 0, labs: 1, readyLabs: 1, cards: 8, years: [null, null] } };
  assert.deepEqual(H.stripItems(one, blank(), { lessonById: {}, qById: {}, paperById: {} }, {}).map(x => x.n + ' ' + x.label),
    ['1 lesson', `${NSUB} sub-topics in the syllabus`, '1 interactive lab', '8 flashcards'], 'singular labels, and the syllabus\'s size while lessons are being written');
});

test('home: papers by weight are ranked and sized by their ICAI marks (100, 100, 50, 50)', () => {
  const tiles = H.bentoTiles(I.subjects);
  assert.deepEqual(tiles.map(t => [t.s.id, t.v, t.k]), [['cma', 100, 1], ['aud', 100, 1], ['fm', 50, 0.5], ['sm', 50, 0.5]]);
  for (let i = 1; i < tiles.length; i++) assert.ok(H.perPaper(tiles[i - 1].s) >= H.perPaper(tiles[i].s), 'biggest first');
  assert.deepEqual(H.bentoTiles(I0.subjects).map(t => t.v), [100, 100, 50, 50], 'the same with no content at all');
  assert.notEqual(tiles.map(t => t.s), I.subjects, 'a copy, never the shared array');
  assert.equal(H.perPaper({ paperMarks: 100, perPaper: 7 }), 100, 'the paper\'s marks win over a question-based metric');
});

test('home: medium subject names and progress rings', () => {
  assert.equal(H.medName('Cost and Management Accounting'), 'Costing', 'a CA paper by the name students use (the syllabus short name)');
  assert.equal(H.medName('Programming & Data Structures'), 'Programming & DS', 'the shortening rules still work');
  assert.equal(H.medName('Auditing and Ethics'), 'Audit'); assert.equal(H.medName('Financial Management'), 'FM');
  D.subjects.forEach(s => assert.ok(H.medName(s.name).length <= 32, s.name));
  assert.deepEqual(H.ringOf(null), { p: 0, label: '', state: 'new', fresh: true, tip: 'Not started' }, 'an empty track, no "New" label (P3-02)');
  Stats.subjects(blank(), D, '2026-10-13').forEach(r => assert.deepEqual([H.ringOf(r).state, H.ringOf(r).label], ['new', ''], r.id));
  const one = blank(), qs = D.questions.filter(x => x.subject === 'cma' && x.hasKey);
  one.q[qs[0].id] = { n: 1, ok: 1, last: now, lastOk: 1, firstOk: 1 };
  const r1 = H.ringOf(Stats.subjects(one, D, '2026-10-13').find(r => r.id === 'cma'));
  assert.deepEqual([r1.state, r1.label, r1.p], ['started', 'Started', 0]); assert.equal(r1.tip, 'Started: 1 answer · 1 right');
  qs.slice(1, 5).forEach(q => (one.q[q.id] = { n: 1, ok: 0, last: now, lastOk: 0, firstOk: 0 }));
  const r5 = H.ringOf(Stats.subjects(one, D, '2026-10-13').find(r => r.id === 'cma'));
  assert.equal(r5.state, 'mastery', 'five answered questions are evidence'); assert.equal(r5.label, r5.p + '%');
  assert.deepEqual(H.EVIDENCE, { pyq: 5, lessons: 1, cards: 10 });
  const s = blank(), ls = D.lessons.filter(l => l.subject === 'cma');
  ls.slice(0, 4).forEach(l => (s.lessons[l.id] = { first: now, last: now, done: now, secs: 600, visits: 1, quiz: {} }));
  const row = Stats.subjects(s, D, '2026-10-13').find(r => r.id === 'cma'), r = H.ringOf(row);
  assert.equal(r.fresh, false); assert.equal(r.p, Math.round(row.mastery * 100)); assert.match(r.tip, new RegExp(`4 of ${ls.length} lessons done`));
});

test('home: inline questions are answerable on the card: keyed, no figure, short, MCQ or NAT, and grade against their own key', () => {
  const C = D.questions.filter(H.isCandidate);
  assert.ok(C.length >= 40, 'a pool from the bank');
  C.forEach(m => { assert.ok(m.hasKey && !m.hasFig && !m.grouped && !m.special && !m.review && !m.legacy); assert.ok(m.type === 'MCQ' || m.type === 'NAT'); });
  assert.equal(H.isCandidate(null), false);
  const mcq = { id: 'x', type: 'MCQ', stem: 'What is the P/V ratio?', options: ['3', '4', '5', '6'], answer: { kind: 'single', value: 'B' } };
  assert.equal(H.isShort(mcq), true);
  assert.equal(H.isShort(Object.assign({}, mcq, { stem: 'x'.repeat(400) })), false, 'long stem');
  assert.equal(H.isShort(Object.assign({}, mcq, { stem: '| a | b |\n|---|---|' })), false, 'table');
  assert.equal(H.isShort(Object.assign({}, mcq, { options: ['a', 'b', 'c'] })), false, 'three options');
  assert.equal(H.isShort(Object.assign({}, mcq, { options: ['a', 'b', 'c', 'y'.repeat(90)] })), false, 'long option');
  assert.equal(H.isShort(Object.assign({}, mcq, { figures: [{ file: 'f.png' }] })), false, 'figure');
  assert.equal(H.isShort(Object.assign({}, mcq, { answer: { kind: 'multi', value: ['A', 'B'] } })), false, 'multi key');
  assert.equal(H.isShort({ id: 'n', type: 'NAT', stem: 'How many units?', answer: { kind: 'range', min: 2, max: 2 } }), true);
  assert.equal(H.isShort({ id: 'n', type: 'NAT', stem: 'How many?', answer: { kind: 'oneof', alts: [] } }), false);
  let n = 0;
  for (const p of D.papers.slice(0, 3)) for (const q of fullQ(p.id).filter(q => H.isCandidate(D.qById[q.id]) && H.isShort(q))) {
    n++;
    assert.equal(sc.mark(q, q.answer.value).state, 'correct', q.id);
    assert.equal(sc.mark(q, 'ABCD'.replace(q.answer.value, '')[0]).state, 'wrong', q.id);
    assert.ok(H.lessonFor(D, D.qById[q.id]), q.id + ': Learn this has a lesson');
  }
  // an ICAI bank's MCQs are mostly case-scenario MCQs (a shared case is never short): the card may have none to offer
  if (!(D.questions.length && D.questions.every(q => q.icai))) assert.ok(n >= 15, 'short questions in three papers: ' + n);
  const pool = H.csRank(I).slice(0, 2);
  const firsts = D.questions.filter(m => H.isFirstRunQ(m, pool));
  firsts.forEach(m => { assert.equal(m.marks, 1); assert.equal(m.diff, 'easy'); assert.ok(pool.includes(m.subject)); });
  assert.equal(H.isCandidate(Object.assign({}, C[0], { disputed: true })), false, 'a disputed key is never asked inline');
  assert.equal(H.isCandidate(Object.assign({}, C[0], { mta: true })), false, 'nor a marks-to-all question');
  assert.match(H.lessonFor(D, C[0]).href, /^#\/l\/[a-z0-9.]+$/);
});

test('home: pickQuestion prefers what the learner has not tried and never repeats an avoided one', () => {
  const list = [{ id: 'a' }, { id: 'b' }, { id: 'c' }], s = blank();
  s.q.a = { n: 2 }; s.q.b = { n: 1 };
  for (let i = 0; i < 20; i++) assert.equal(H.pickQuestion(list, s, Math.random).id, 'c');
  assert.equal(H.pickQuestion(list, s, () => 0, new Set(['c'])).id, 'a', 'all tried: any, minus the avoided');
  assert.equal(H.pickQuestion(list, s, Math.random, new Set(['a', 'b', 'c'])), null);
  assert.equal(H.pickQuestion([], s, Math.random), null);
});


test('home: the tests card reads the generated blueprint and the learner\'s own scores', () => {
  const F = H.mockFacts(D, TG);
  if (F) { const t = TG.mock(D, { seed: 1 }); assert.equal(F.n, t.qids.length, 'the facts are the generated mock\'s'); assert.equal(F.hours, Math.round((t.limitMs / 36e5) * 10) / 10); }
  const F0 = H.mockFacts(D0, TG);
  assert.ok(!F0 || !F0.n, 'no bank: no mock to describe (the practice row is hidden anyway)');
  assert.deepEqual(H.sparkModel([], D).pts, []);
  const [p1, p2] = D.papers;
  const tests = [{ kind: 'mock', finished: 3, score: 52.7, max: 100 }, { kind: 'paper', paper: p1.id, finished: 1, score: 38.67, max: 100 }, { kind: 'paper', paper: p2.id, finished: 2, score: 44, max: 100 },
    { kind: 'mock', finished: 4, score: 0, max: 0 }, { kind: 'diagnostic', finished: 5, score: 6, max: 15 }];
  const S = H.sparkModel(tests, D);
  assert.equal(S.pts.length, 3, 'unscored sittings and short tests (the diagnostic) left out (P2-34)');
  assert.deepEqual(S.pts.map(p => p.v), [38.7, 44, 52.7]); assert.equal(S.pts[2].label, 'mock 1');
  assert.deepEqual(S.pts.map(p => p.pct), ['39%', '44%', '53%'], 'labels in the one percent format');
  assert.deepEqual(H.fullSittings(tests, D).map(x => x.t.finished), [1, 2, 3], 'the one rule: scored papers and mocks, oldest first');
  const many = Array.from({ length: 9 }, (_, i) => ({ kind: 'mock', finished: i + 1, score: 30 + i, max: 100 }));
  assert.deepEqual(H.sparkModel(many, D, 6).pts.map(p => p.label), ['mock 4', 'mock 5', 'mock 6', 'mock 7', 'mock 8', 'mock 9'], 'mock numbers count the earlier ones too');
  const G = H.diagFacts(D, TG);
  if (G) { const t = TG.diagnostic(D, {}); assert.equal(G.n, t.qids.length); assert.equal(G.minutes, Math.round(t.limitMs / 60000)); }
});

/* lesson text: one file per lesson (P1-60, D13), or the fixture's sample text */
function lessonRec(id) {
  const l = D.lessonById[id]; if (!l) return null;
  const one = path.join(ROOT, 'data/lessons', l.subject, id + '.js');
  if (fs.existsSync(one)) { const box = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } }; new Function('GAD', fs.readFileSync(one, 'utf8'))(box); if (box.lesson && box.lesson[id]) return box.lesson[id]; }
  return (BOX.lesson || {})[id] || null;
}

test('home: firstDiagram finds a lesson\'s first diagram and the section it sits in; the kit draws it', () => {
  const md = '## In plain words\n\nText.\n\n## How it works\n\n::: diagram Two boxes\n{"type":"array","items":[1,2]}\n:::\n\nMore.\n\n## Later part\n\n::: diagram Later\n{"type":"array","items":[3]}\n:::';
  assert.deepEqual(H.firstDiagram(md), { title: 'Two boxes', spec: { type: 'array', items: [1, 2] }, section: 'How it works' });
  assert.deepEqual(H.diagramsOf(md).map(d => d.section), ['How it works', 'Later part']);
  assert.equal(H.firstDiagram('## A\n\nno figures'), null);
  assert.equal(H.firstDiagram('::: diagram Bad\n{not json\n:::'), null);
  require('../app/js/viz/diagram.js');
  const L = lessonRec(I.order(MAIN)[0]), d = H.firstDiagram(L.md);
  assert.ok(d && d.spec.type, 'the lesson has a diagram');
  const at = L.md.search(/^::: *diagram/m), heads = L.md.slice(0, at).match(/^## .+$/gm);
  assert.equal(d.section, heads[heads.length - 1].slice(3).trim(), 'the H2 above the first diagram');
  assert.match(GA.diagram.render(d.spec), /^<(svg|figure|div)[\s\S]*>$/);
  assert.deepEqual(H.svgSize('<svg class="dgs" viewBox="0 0 640 72" width="640">'), { w: 640, h: 72 });
  assert.deepEqual(H.svgSize('<svg viewBox="0 0 600 300" width="300">'), { w: 300, h: 150 });
  assert.equal(H.svgSize('<div class="dg-table"><table></table></div>'), null, 'HTML output has no intrinsic size here');
});

test('home: bestDiagram picks the first drawing that stays legible in the hero, never blown up past 1.3x (P1-34)', () => {
  const box = { w: 504, h: 220 }, F = H.FIT;
  // a thin strip that would fit goes after a real figure that fits
  let p = H.bestDiagram([{ w: 560, h: 72 }, { w: 400, h: 200 }], box);
  assert.deepEqual([p.i, p.mode], [1, 'fit']); approx(p.scale, 1.1, 1e-9);
  // the first one that fits at 0.85x or more wins; a small drawing is capped at 1.3x
  p = H.bestDiagram([{ w: 900, h: 400 }, { w: 200, h: 100 }, { w: 300, h: 200 }], box);
  assert.deepEqual([p.i, p.scale, p.mode], [1, F.max, 'fit']);
  // nothing fits: the first one at 0.8x, cropped from the top-left
  p = H.bestDiagram([{ w: 1000, h: 500 }, { w: 1200, h: 300 }], box);
  assert.deepEqual([p.i, p.scale, p.mode], [0, F.crop, 'crop']);
  p = H.bestDiagram([{ w: 610, h: 230 }], box);                       // fits at 0.826: drawn at that size, no crop needed
  assert.equal(p.mode, 'fit'); approx(p.scale, 0.826, 1e-3);
  // the most legible: a fitting drawing whose labels would be under 10 px gives way to a later fitting one with legible labels
  p = H.bestDiagram([{ w: 560, h: 200, font: 10 }, { w: 500, h: 200, font: 11 }], box);   // 0.9 x 10 = 9 px vs 1.0 x 11 = 11 px
  assert.deepEqual([p.i, p.mode], [1, 'fit']);
  p = H.bestDiagram([{ w: 560, h: 200, font: 10 }, { w: 560, h: 200, font: 9 }], box);    // none legible: the largest labels of those that fit
  assert.equal(p.i, 0);
  p = H.bestDiagram([{ w: 560, h: 200, font: 9 }, { w: 560, h: 200, font: 10.5 }], box);
  assert.equal(p.i, 1, '8.1 px vs 9.45 px: the larger labels');
  p = H.bestDiagram([{ w: 560, h: 200, font: 9 }, { w: 560, h: 100, font: 11 }], box);     // a thin strip with bigger labels still goes after a real figure
  assert.equal(p.i, 0);
  p = H.bestDiagram([{ w: 560, h: 200 }, { w: 500, h: 200, font: 11 }], box);             // unknown label size: fitting is enough
  assert.equal(p.i, 0);
  assert.equal(H.labelPx('<svg class="dgs" viewBox="0 0 400 100" width="200"><text font-size="12">a</text><text font-size="14">b</text><text font-size="20">c</text></svg>'), 7, 'median 14 user units at half size');
  assert.equal(H.labelPx('<svg viewBox="0 0 10 10" width="10"></svg>'), null); assert.equal(H.labelPx('<div></div>'), null);
  // HTML tables only: their own size, measured in the page
  assert.deepEqual(H.bestDiagram([{ w: null, h: null }], box), { i: 0, scale: 1, mode: 'crop', fit: null });
  assert.equal(H.bestDiagram([], box), null); assert.equal(H.bestDiagram([{ w: 10, h: 10 }], { w: 0, h: 0 }), null);
  // every lesson: what the hero would draw in the desktop panel (532 px wide, 260 px of height with a two-line title) and in the tightest one
  require('../app/js/viz/diagram.js');
  for (const bx of [{ w: 532, h: 260 }, { w: 504, h: 220 }]) {
  const big = bx.h > 220, n = { fit: 0, crop: 0, none: 0, table: 0, firstOk: 0, oldTiny: 0, legible: 0, labelled: 0, first10: 0 };
  for (const l of D.lessons) {
    const L = lessonRec(l.id); if (!L) continue;
    const c = H.diagramsOf(L.md).map(d => { const html = GA.diagram.render(d.spec); return Object.assign({ font: H.labelPx(html) }, H.svgSize(html) || { w: null, h: null }); });
    const pick = H.bestDiagram(c, bx);
    if (!pick) { n.none++; continue; }
    const k = c[pick.i];
    if (!k.w) { n.table++; continue; }
    assert.ok(pick.scale <= F.max + 1e-9, l.id + ' never blown up past 1.3x');
    assert.ok(pick.scale >= F.crop - 1e-9, l.id + ' never drawn below 0.8x: ' + pick.scale);
    if (pick.mode === 'fit') { n.fit++; if (pick.scale >= F.min - 1e-9) n.firstOk++; } else n.crop++;
    const f0 = c.find(x => x.w); if (f0 && Math.min(bx.w / f0.w, bx.h / f0.h) < 0.6) n.oldTiny++;
    if (k.font) { n.labelled++; if (k.font * pick.scale >= F.label - 1e-9) n.legible++; }
    const spec = c.map((x, i) => i).filter(i => c[i].w && c[i].w / c[i].h <= F.thin).concat(c.map((x, i) => i).filter(i => c[i].w && c[i].w / c[i].h > F.thin))
      .find(i => Math.min(bx.w / c[i].w, bx.h / c[i].h) >= F.min);               // the plain rule: the first that fits at 0.85x
    if (spec != null && c[spec].font && c[spec].font * Math.min(F.max, Math.min(bx.w / c[spec].w, bx.h / c[spec].h)) >= F.label - 1e-9) n.first10++;
  }
  assert.ok(n.legible >= n.first10, 'preferring legible labels never loses a legible pick: ' + JSON.stringify(n));
  if (big) assert.ok(n.legible >= 0.6 * n.labelled, 'most picks draw their labels at 10 px or more: ' + JSON.stringify(n));
  if (big) assert.ok(n.firstOk >= 0.75 * (n.fit + n.crop),   // CA lessons lead with wider tables and flows than the GATE set (0.8 there)
    'most lessons have a drawing that fits at 0.85x or more: ' + JSON.stringify(n));
  assert.ok(n.none === 0, 'every lesson has a diagram: ' + JSON.stringify(n));
  }
});


test('home: a NAT answer is graded only when it is a number; a comma is never read as a decimal point (P0-16)', () => {
  assert.equal(H.natProblem('-2'), null); assert.equal(H.natProblem('0.75'), null); assert.equal(H.natProblem('12'), null); assert.equal(H.natProblem('.5'), null);
  assert.match(H.natProblem('0,75'), /decimal point/);
  assert.match(H.natProblem('abc'), /^Type a number like 12 or −0\.5\.$/);
  assert.match(H.natProblem('12abc'), /^Type a number/);
  assert.match(H.natProblem(''), /^Type a number/); assert.match(H.natProblem('-'), /^Type a number/);
  assert.equal(H.cleanNat('12'), '12'); assert.equal(H.cleanNat('-0.5'), '-0.5'); assert.equal(H.cleanNat('−2'), '-2');
  assert.equal(H.cleanNat('a1b2'), '12'); assert.equal(H.cleanNat('5-'), '5');
});


test('home: a comma typed key by key holds grading back until a point is typed or the box is emptied (P0-16, like the question card)', () => {
  // type a string into the box one key at a time, the way the input event sees it; returns the box text, the hold and the line shown
  const type = (keys, st) => {
    st = st || { text: '', hold: false, warn: '' };
    for (const k of keys) { const n = H.natInput(st.text + k, st.hold); st = n; }
    return st;
  };
  let st = type('0,75');
  assert.deepEqual([st.text, st.hold, st.warn], ['075', true, H.NAT_MSG.comma], "'0,75' keeps '075' but the comma line stays after the next digits");
  assert.equal(H.natProblem(st.text, st.hold), H.NAT_MSG.commaCheck, 'Check refuses it: never graded as 75');
  st = type('-0,5');
  assert.deepEqual([st.text, st.hold], ['-05', true]); assert.equal(H.natProblem(st.text, st.hold), H.NAT_MSG.commaCheck, "'-0,5' is never graded as -5");
  // the learner fixes it: a point clears the hold, and the number grades
  st = H.natInput('-0.5', st.hold);
  assert.deepEqual([st.text, st.hold, st.warn], ['-0.5', false, '']); assert.equal(H.natProblem(st.text, st.hold), null);
  // emptying the box clears it too
  st = type('1,'); assert.equal(st.hold, true); st = H.natInput('', st.hold); assert.deepEqual([st.text, st.hold, st.warn], ['', false, '']);
  // a pasted '0,75' is held at once; letters are dropped with their own line and no hold
  st = H.natInput('0,75', false); assert.deepEqual([st.text, st.hold], ['075', true]);
  st = type('12abc'); assert.deepEqual([st.text, st.hold, st.warn], ['12', false, H.NAT_MSG.chars], 'letters are dropped, named, and hold nothing');
  assert.equal(H.natInput('12a', false).warn, H.NAT_MSG.chars, 'a refused letter is named');
  assert.equal(H.natInput('1.2.', false).text, '1.2', 'one point only'); assert.equal(H.natInput('5-', false).text, '5', 'a minus only in front');
  assert.equal(H.natInput('−2', false).text, '-2', 'a typographic minus is a minus');
  st = type('-2'); assert.deepEqual([st.text, st.hold], ['-2', false]); assert.equal(H.natProblem(st.text, st.hold), null, 'a negative answer grades');
  for (const s of ['', '-', '.']) assert.equal(H.natProblem(s, false), H.NAT_MSG.notNumber, JSON.stringify(s) + ' is not graded');
});


test('home: open solutions and long options can never widen the card or the page (P0-24 CSS guards)', () => {
  const css = fs.readFileSync(path.join(ROOT, 'app/css/home.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const rule = sel => { const m = new RegExp('(?:^|\\})\\s*' + sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^}]*)\\}', 'm').exec(css); return m ? m[1] : ''; };
  assert.match(rule('.hm-opts'), /grid-template-columns:\s*minmax\(0,\s*1fr\)/, 'the options grid has one shrinkable column (an implicit auto column grows to the widest option)');
  assert.match(rule('.hm-sol'), /min-width:\s*0/, 'the solution fold may shrink below its content');
  assert.match(rule('.hm-qfoot > *'), /min-width:\s*0/);
  assert.match(rule('.hm-qcard'), /min-width:\s*0/);
  assert.match(rule('.hm-hero'), /grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(0,\s*1\.02fr\)/, 'hero columns shrink');
  assert.doesNotMatch(rule('.hm-sol-b'), /max-height|overflow:\s*auto/, 'no inner 420 px scroll box (P1-33): the cap is a desktop-only fade');
  // Part B layout guards: the page width (P2-05), equal-height practice cards (P2-05), no dimming opacity on text (P2-29), and the phone
  // layout of P2-01 (the ranked paper list keeps every ring, 2-up findings and labs)
  assert.match(rule('.hm'), /max-width:\s*var\(--page-max/, 'Home uses the page width every page uses');
  assert.match(rule('.hm-duo-row'), /align-items:\s*stretch/);
  for (const sel of ['.hm-res', '.hm-op.dim', '.hm-wrap .k', '.hm-cap .mono', '.hm-pp-t span', '.hm-pp-f']) assert.doesNotMatch(rule(sel), /opacity/, sel + ' is never dimmed with opacity');
  assert.doesNotMatch(css, /\.hint\b/, 'the dead .hint rules are gone');
  const phone = css.split('@media (max-width: 700px) {').slice(1).map(b => b.split('@media (prefers-reduced-motion')[0]).join('\n');
  // papers by weight (2026-10-18): one ranked card, two columns on wide screens, one column below 980 px; every row keeps its ring
  assert.match(rule('.hm-rank'), /grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 980px\) \{[^@]*\.hm-rank \{ grid-template-columns: 1fr;/, 'one column below 980 px');
  assert.match(phone, /\.hm-rk \.hm-ring \{ width: 32px; height: 32px; \} \.hm-rk \.hm-ring b \{ display: none; \}/, 'phones: a 32 px ring per row, no label under 36 px');
  assert.match(phone, /\.hm-finds \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/); assert.match(phone, /\.hm-labs \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(phone, /\.hm-lab:nth-child\(n\+3\), \.hm-lab:nth-child\(3\):last-child \{ display: none; \}/, 'phones: one row of two lab cards (D4), no orphan third card');
  assert.match(phone, /\.hm \{ padding-top: 0; padding-bottom: 0; \}/, 'phones: the shell already pads the page clear of the tab bar');
  assert.match(phone, /\.hm-qcard:not\(\[data-done="1"\]\) > \.hm-qfoot \{ display: none; \}/, 'phones: before an answer the bank link ends the meta line');
  assert.match(phone, /\.hm-qcard:not\(\[data-done="1"\]\) \.hm-qmeta \.hm-qbank \{ display: inline-flex; \}/);
  assert.match(phone, /\.hm-hero:not\(\.hm-first\) \.hm-hero-r \{ display: none/, 'no cobalt band in the phone resume hero');
  const fg = rule('.hm-figbox .hm-dg');
  assert.ok(!/\.hm-(gantt|prg|bits|slots|seek|ipv|xl8)\b/.test(css), 'the GATE lab previews and the paging figure are gone');
  assert.match(fg, /padding:\s*0/, 'P1-34: the hero figure drops the lesson sheet\'s .dg padding, so a drawing sized to the room is never cut at the right');
  assert.match(fg, /overflow:\s*hidden/, 'and it never scrolls sideways');
  // the drawing's build-in moves its parts with the translate property: a CSS transform would override a kit group's own transform
  // attribute while it runs (304 of the 1,555 lesson drawings place a part that way, e.g. every plot's rotated axis label), so those parts
  // would swing in from the drawing's corner
  const build = (/@keyframes hm-build\s*\{([^@]*?\})\s*\}/.exec(css) || [])[1] || '';
  assert.match(build, /translate:\s*0 6px/, 'the rise is the translate property');
  assert.doesNotMatch(build, /transform/, 'never transform on the kit\'s elements');
  assert.match(rule('.hm-figbox.play svg.dgs > *'), /animation:\s*hm-build/);
  assert.match(css, /@media \(min-width: 701px\)\s*\{\s*\.hm-sol\.cap \.hm-sol-b \{[^}]*max-height: 420px[^}]*overflow: hidden/, 'the capped fold is desktop-only and fades instead of scrolling');
});


test('home: the view file only links to routes the shell knows', () => {
  const T = require('../app/js/shell.js'), src = fs.readFileSync(path.join(ROOT, 'app/js/views/home.js'), 'utf8');
  const routes = T.ROUTES.map(([pat]) => new RegExp('^' + pat.replace(/\/:[a-z]+/gi, '/[^/?#]+') + '/?$'));
  const hrefs = Array.from(src.matchAll(/(?:'|href=")#(\/[a-z0-9/]*)/g)).map(m => m[1].replace(/\/$/, '') || '/');
  assert.ok(hrefs.length > 10);
  ['/wrapped', '/test', '/pyq', '/labs', '/syllabus', '/about', '/flash'].forEach(r => assert.ok(hrefs.includes(r), 'links ' + r));
  hrefs.forEach(h => assert.ok(routes.some(r => r.test(h)) || routes.some(r => r.test(h + '/x')), 'route for ' + h));
});

test('home: no GATE wording on screen: every string the view prints is CA Inter, ICAI or Group II', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/home.js'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  for (const w of [/\bGATE\b/, /\bPYQs?\b/, /\bIIT\b/, /negative marking/, /\bCS marks\b/, /General Aptitude/, /Peak\b/]) assert.doesNotMatch(src, w, 'no ' + w);
});

test('home: the Worked-solution fold turns the card\'s fold chevron, never the link arrow (P1-33, P3-33)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/home.js'), 'utf8');
  // the chevron a fold summary carries: GA.icon('<name>', 'qc-chev') or a literal <svg class="i qc-chev"><use href="#i-<name>"/></svg>
  const chev = s => { const m = /icon\('([\w-]+)',\s*'qc-chev'\)/.exec(s) || /class="i qc-chev"[^>]*>\s*<use href="#i-([\w-]+)"/.exec(s); return m ? m[1] : null; };
  const sum = (/<details class="qc-sd hm-sol"><summary>([\s\S]*?)<\/summary>/.exec(src) || [])[1];
  assert.ok(sum, 'found the fold summary');
  assert.equal(chev(sum), 'chev-d', 'the fold chevron points down; views.css turns every open .qc-sd chevron over');
  for (const m of src.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/g)) assert.doesNotMatch(m[1], /arrow-r/, 'arrow-r is for links, never in a fold summary');
  // parity with the question card's own fold (read-only: qcard.js belongs to the card), when its markup can be read
  const card = fs.readFileSync(path.join(ROOT, 'app/js/views/qcard.js'), 'utf8');
  const cs = (/<details class="qc-sd"[^>]*><summary>([\s\S]*?)<\/summary>/.exec(card) || [])[1], cc = cs && chev(cs);
  if (cc) assert.equal(chev(sum), cc, 'Home\'s fold shows the chevron the question card\'s fold shows');
});


test('home: each hero\'s CTA row holds only the coral (and Tick); its secondary link has a line of its own, so Tick\'s gaze lands on the coral (P3-03)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'app/js/views/home.js'), 'utf8');
  const fn = name => { const i = src.indexOf(`function ${name}(`); assert.ok(i >= 0, 'found ' + name); const j = src.indexOf('\n  function ', i + 9); return src.slice(i, j < 0 ? undefined : j); };
  for (const [name, id] of [['heroFirst', 'hm-start'], ['heroReturning', 'hm-resume']]) {
    const body = fn(name), row = /<div class="hm-cta-row">([\s\S]*?)\n\s*<\/div>/.exec(body);
    assert.ok(row, name + ': found the CTA row');
    const links = Array.from(row[1].matchAll(/<a\b[^>]*>/g)).map(m => m[0]);
    // the primary action first; the first visit adds one secondary button beside it ('Pick a paper', 2026-10-18), the returning hero none
    assert.equal(links.length, name === 'heroFirst' ? 2 : 1, name + ': the CTA row\'s links');
    assert.match(links[0], new RegExp(`class="btn pop lg hm-cta[^"]*"[^>]*id="${id}"`), name + ': and the first is the primary');
    if (name === 'heroFirst') assert.match(links[1], /class="btn lg hm-alt" href="\$\{esc\(m\.alt\.href\)\}" id="hm-pick"/, 'the secondary is a plain button');
    assert.doesNotMatch(row[1], /hm-mascot/, name + ': no mascot');
  }
  // the returning hero: 'More in …' sits under the meta line, above the coral
  const ret = fn('heroReturning');
  assert.ok(ret.indexOf('class="hm-more"') > ret.indexOf('class="hm-meta"') && ret.indexOf('class="hm-more"') < ret.indexOf('class="hm-cta-row"'), '"More in …" sits under the meta line');
  const css = fs.readFileSync(path.join(ROOT, 'app/css/home.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  assert.match(css, /\.hm-first \.hm-cta-row \{[^}]*margin-top:\s*\d+px/, 'the first-visit actions keep their gap under the lead');
});
