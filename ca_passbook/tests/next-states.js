/* The 12 learner states of docs/ARCHITECTURE.md §10.3 (WP4). Not a .test.js file: tests/run.js does not run it on its own. Every package
   that names a next step adds its agreement check against these states in its own test file (Home's hero model, the planner's first learn
   row, palette row 1), so no package waits for another:

     const NS = require('./next-states.js');
     for (const c of NS.states(D, I)) assert.equal(myTarget(c.state, D, c.today), GA.stats.nextStep(c.state, D, {today: c.today, I}).href);

   states(D, I, today = NS.TODAY) → [{n, name, state, today, expect: {any: {label, id}, lesson: {label, id}}}]
   catalogue() → {D, I, M, shipped}: the shipped catalogue once it has the lessons and questions these states need, else the fixture
   (tests/fixtures/catalogue.js: every CA sub-topic, a small synthetic MCQ bank); I = GA.insights.build(D, M.stats). `today` must sit in the
   normal season (more than 14 days before Paper 4 on 8 Jan 2027); the default is pinned so the states do not depend on the wall clock.
   The states use the top-ranked paper (MAIN, I.ranking[0]: Paper 4) where the GATE version used Programming & DS, and another paper's
   lesson for the 2-second peek.
   States are built here, not through store.js, so they stay valid while the store evolves; blank() mirrors the store's blank profile.
   expect holds the table's ids for today's content; state 12 (the demo) is computed from the seeded state itself (see tests/next.test.js). */
'use strict';
const path = require('path'), cp = require('child_process');
const ROOT = path.join(__dirname, '..');
const TODAY = '2026-10-16';
const FX = require('./fixtures/catalogue.js');

/** the shipped manifest when it can carry these states (enough lessons in the top paper, a crash route, keyed MCQs), else the fixture */
function enough(M) { return M && M.lessons.length >= 40 && M.pyq && M.pyq.rows.length >= 40; }
function catalogue() {
  const GA = globalThis.GA || (globalThis.GA = {});
  require('../app/js/core/util.js'); const Data = require('../app/js/core/data.js'); const Ins = require('../app/js/core/insights.js');
  const real = FX.real(), shipped = enough(real), M = shipped ? real : FX.manifest();
  const D = Data.buildCatalogue(JSON.parse(JSON.stringify(M)));
  return { D, I: Ins.build(D, M.stats), M, shipped };
}

function blank() {
  return {
    v: 3, created: 0,
    profile: { name: '', examDate: null, examSet: false, goals: { questions: 15, cards: 20, minutes: 90, lessons: 1 }, theme: 'auto', sidebar: 'full', calc: true, route: null, focus: null, lastExport: null },
    lessons: {}, q: {}, log: [], tests: [], cards: {}, nb: {}, act: {}, plan: null, live: null, labs: {}, seen: {}, eng: { v: 1, frozen: [] }, logArch: null
  };
}

function helpers(today) {
  const day = n => { const d = new Date(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10)); d.setDate(d.getDate() + n); return d; };
  const key = n => { const d = day(n); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const ts = (n, h) => day(n).getTime() + (h == null ? 10 : h) * 3600e3;          // a timestamp n days from today, at h o'clock
  return { key, ts };
}

/** the demo profile (core/demo.js), seeded in a child process with the date pinned to `today`; null when the seeder cannot run */
const demoMemo = {};
function demoState(today) {
  if (today in demoMemo) return demoMemo[today];
  const script = `
    const R = ${JSON.stringify(ROOT + '/')}, TODAY = ${JSON.stringify(today)};
    globalThis.GAD = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } }; globalThis.GA = {};
    { const FX = require(R + 'tests/fixtures/catalogue.js'), real = FX.real();
      if (${enough.toString().replace(/^function enough\(M\) \{ return /, '(M => ').replace(/; \}$/, ')')}(real)) require(R + 'data/manifest.js'); else FX.register(GAD); }
    require(R + 'app/js/core/util.js'); GA.util.today = () => TODAY;
    const opt = (m, stub) => { try { require(R + 'app/js/core/' + m + '.js'); } catch (e) { stub(); } };
    opt('srs', () => { throw new Error('srs.js did not load'); });
    opt('scoring', () => { GA.scoring = { mark: () => ({ state: 'skipped', score: 0 }) }; });
    opt('testgen', () => { GA.testgen = { fromPaper: () => ({ qids: [] }), summarise: () => ({}) }; });
    require(R + 'app/js/core/data.js');
    GA.util.loadScript = src => { require(R + src); return Promise.resolve(); };
    const D = GA.data.init();
    const blank = ${blank.toString()};
    const S = { profile: 'demo', state: blank(), reset() { this.state = blank(); }, update(f) { f(this.state); }, flushNow() {} };
    require(R + 'app/js/core/demo.js');
    GA.demo.seed(S, D).catch(() => {}).then(() => process.stdout.write(JSON.stringify(S.state)));`;
  let st = null;
  try { st = JSON.parse(cp.execFileSync(process.execPath, ['-e', script], { maxBuffer: 64 << 20 }).toString()); } catch (e) { st = null; }
  return (demoMemo[today] = st);
}

function states(D, I, today) {
  const T = today || TODAY, { key, ts } = helpers(T);
  const MAIN = I.ranking[0], OTHER = I.ranking.find(id => id !== MAIN && I.order(id).length);
  const pds = I.order(MAIN), crash = I.path('crash').lessons;
  const cn = I.order(OTHER).find(id => D.lessonById[id].status === 'in');
  const done = (s, id, n, extra) => (s.lessons[id] = Object.assign({ first: ts(n, 9), last: ts(n, 9), done: ts(n, 10), secs: 900, visits: 1, quiz: {} }, extra));
  const open = (s, id, n, extra) => (s.lessons[id] = Object.assign({ first: ts(n, 9), last: ts(n, 9), done: null, secs: 600, visits: 1, quiz: {} }, extra));
  const mid = () => { const s = blank(); pds.slice(0, 6).forEach((id, i) => done(s, id, -14 + i)); open(s, pds[6], -1); return s; };
  const pq = D.questions.filter(q => q.subject === MAIN && q.hasKey && q.type === 'MCQ');
  const L = (any, lesson) => ({ any, lesson: lesson || any });
  const out = [];
  const add = (name, state, expect, t) => out.push({ n: out.length + 1, name, state, today: t || T, expect });

  add('fresh', blank(), L({ label: 'Start here', id: pds[0] }));
  { const s = blank(), q = pq[0]; s.q[q.id] = { n: 1, ok: 1, last: ts(0, 11), lastOk: 1, firstOk: 1, ms: 60000, streak: 1, bm: 0 }; s.log.push([ts(0, 11), q.id, 1, 60000, 'p']); s.act[T] = { s: 120, q: 1, c: 0, l: 0 };
    add('one PYQ answered', s, L({ label: 'Start here', id: pds[0] })); }
  { const s = blank(); done(s, pds[0], -1); add('first lesson done', s, L({ label: 'Next up', id: pds[1] })); }
  add('mid-subject: Paper 4 steps 1–6 done, step 7 open', mid(), L({ label: 'Continue', id: pds[6] }));
  { const s = mid(); s.lessons[cn] = { first: ts(0, 12), last: ts(0, 12), done: null, secs: 2, visits: 1, quiz: {} };
    add('state 4 plus a 2-second peek at another paper\'s lesson', s, L({ label: 'Continue', id: pds[6] })); }
  { const s = blank(); s.profile.route = 'crash'; done(s, crash[0], -3); done(s, crash[1], -2);
    add('route crash chosen, its first 2 lessons done', s, L({ label: 'Next up', id: crash[2] })); }
  { const s = blank(), qids = pq.slice(0, 10).map(q => q.id), responses = {};
    qids.slice(0, 3).forEach(id => (responses[id] = 'A'));
    s.live = { id: 'diag-1', kind: 'diagnostic', title: 'Diagnostic', qids, limitMs: 27 * 60000, startedAt: ts(0, 9), elapsedMs: 8 * 60000, cur: 3, responses, visited: {}, marked: {}, times: {} };
    add('a live diagnostic, 3 of 10 answered', s, { any: { label: 'Resume test', id: 'diag-1' }, lesson: { label: 'Start here', id: pds[0] } }); }
  { const s = mid(); D.cards.slice(0, 12).forEach(c => (s.cards[c.id] = { due: key(-1), ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: key(-4) }));
    add('state 4 plus 12 cards due', s, L({ label: 'Continue', id: pds[6] })); }
  { const s = mid(); pq.slice(10, 16).forEach(q => { s.q[q.id] = { n: 1, ok: 0, last: ts(-3), lastOk: 0, firstOk: 0, ms: 60000, streak: 0, bm: 0, srs: { due: key(-1), ivl: 1, ease: 2.3, reps: 0, lapses: 1, last: key(-3) } };
      s.nb[q.id] = { reason: null, note: '', added: ts(-3), resolved: null, misses: 1 }; });
    add('state 4 plus 6 notebook misses due', s, L({ label: 'Continue', id: pds[6] })); }
  { const s = mid(); s.profile.examDate = key(10); s.profile.examSet = true;
    add('10 days to a learner-set date, step 7 open', s, L({ label: 'Continue', id: pds[6] })); }
  { const s = blank(); s.profile.examDate = key(10); s.profile.examSet = true; done(s, pds[0], -20); done(s, pds[1], -1);
    add('10 days to a learner-set date, nothing open, a lesson due for a re-read', s, L({ label: 'Revise', id: pds[0] })); }
  const demo = demoState(T);
  if (demo) add('the demo profile', demo, null);
  return out;
}

module.exports = { states, blank, demoState, catalogue, enough, TODAY };
