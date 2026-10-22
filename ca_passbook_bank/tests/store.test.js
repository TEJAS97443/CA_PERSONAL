/* GA.store v3 and GA.actions (WP2): saving that fails loudly (P0-12), safe boot and import (P1-51), the one note (P1-27), lesson position (P1-01),
   unkeyed 'seen' (P1-23, D9), the exam-date fields (P1-46), the review cap (P0-26), phantom records (P0-02), the lab XP cap (P0-09), the plan snapshot
   (P0-19), and util's countdown line. A localStorage shim with a real quota stands in for the browser. */
globalThis.GA = globalThis.GA || {};
const path = require('path'), cp = require('child_process');
const U = require('../app/js/core/util.js'); require('../app/js/core/srs.js'); require('../app/js/core/scoring.js');
const Store = require('../app/js/core/store.js');
const ST = require('../app/js/core/stats.js');
const A = require('../app/js/core/actions.js');
const E = require('../app/js/core/engage.js');
const Data = require('../app/js/core/data.js');
globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
if (!GAD.manifest || !GAD.manifest.main) require(path.join(__dirname, '..', 'data/manifest.js'));
// the shipped catalogue once it has cards; the fixture (every CA sub-topic with three cards, tests/fixtures/catalogue.js) before that
const D = Data.buildCatalogue(GAD.manifest.main.cards.length >= 2 ? JSON.parse(JSON.stringify(GAD.manifest.main)) : require('./fixtures/catalogue.js').manifest());

/* ---------------------------------------------------------------- a browser localStorage with a quota (Chromium counts key + value lengths) */
function shim(quota) {
  const m = new Map();
  const used = () => { let n = 0; for (const [k, v] of m) n += k.length + v.length; return n; };
  return {
    m, quota: quota == null ? 5242880 : quota, writes: 0,
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem(k, v) {
      v = String(v);
      const before = m.has(k) ? k.length + m.get(k).length : 0;
      if (used() - before + k.length + v.length > this.quota) { const e = new Error('The quota has been exceeded.'); e.name = 'QuotaExceededError'; e.code = 22; throw e; }
      m.set(k, v); this.writes++;
    },
    removeItem: k => { m.delete(k); },
    key: i => { const k = Array.from(m.keys())[i]; return k === undefined ? null : k; },
    get length() { return m.size; },
    used
  };
}
/** run fn with this localStorage installed (null: none, 'blocked': access throws), always ending idle in memory mode */
function withLS(ls, fn) {
  const had = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  if (ls === 'blocked') Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw Object.assign(new Error('The operation is insecure.'), { name: 'SecurityError' }); } });
  else if (ls) Object.defineProperty(globalThis, 'localStorage', { configurable: true, writable: true, value: ls });
  try { return fn(ls); }
  finally {
    try { Store.flushNow(); } catch (e) { /* the test may have left it failing */ }
    if (had) Object.defineProperty(globalThis, 'localStorage', had); else delete globalThis.localStorage;
    Store.init({ profile: 'store-test-idle' });
  }
}
const K = p => 'passbook:' + p;
const doc = st => JSON.stringify(st);
const backup = st => JSON.stringify({ app: 'passbook', exported: new Date().toISOString(), profile: 'main', state: st });
const today = () => U.today();
const listen = (ev) => { const got = []; const off = Store.on(ev, (...a) => got.push(a)); return { got, off }; };

/* ---------------------------------------------------------------- P0-12: a refused write is reported, never swallowed */
test('P0-12: storage full — flush returns false, emits error and sets saveError; the next good write clears it and emits saved', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'full' });
    A.setLessonDone('os.x', true);
    assert.equal(Store.flushNow(), true);
    const saved1 = ls.getItem(K('full'));
    assert.ok(JSON.parse(saved1).lessons['os.x'].done);
    const err = listen('error'), ok = listen('saved');
    ls.quota = ls.used();                                              // another page fills the shared quota
    for (let i = 0; i < 40; i++) A.setLessonDone('os.l' + i, true);
    assert.equal(Store.flushNow(), false);
    assert.ok(Store.saveError, 'saveError is set'); assert.equal(Store.saveError.kind, 'quota'); assert.ok(Store.saveError.chars > saved1.length);
    assert.equal(err.got.length, 1); assert.equal(err.got[0][0], Store.saveError);
    assert.equal(ls.getItem(K('full')), saved1, 'the stored text is the last good one, not a silent half-write');
    assert.equal(Object.keys(Store.state.lessons).length, 41, 'the session keeps working in memory');
    assert.equal(Store.flushNow(), false); assert.equal(err.got.length, 2, 'every failed write reports');
    ls.quota = 5242880;                                                // space freed
    assert.equal(Store.flushNow(), true);
    assert.equal(Store.saveError, null);
    assert.equal(ok.got[ok.got.length - 1][0].recovered, true);
    assert.equal(Object.keys(JSON.parse(ls.getItem(K('full'))).lessons).length, 41, 'nothing was lost');
    err.off(); ok.off();
  });
});

test('P0-12: no localStorage at all (Node) is memory mode, not an error; blocked storage is an error but the session still works', () => {
  Store.init({ profile: 'memmode' }); A.setFlag('x', 1);
  assert.equal(Store.flushNow(), true); assert.equal(Store.saveError, null);
  withLS('blocked', () => {
    Store.init({ profile: 'blocked' });
    A.setLessonDone('os.y', true);
    assert.equal(Store.flushNow(), false);
    assert.equal(Store.saveError.kind, 'blocked');
    assert.ok(Store.state.lessons['os.y'].done);
  });
});

test('P0-12: each import keeps exactly one before-import copy (the newest); lastImport and undoImport swap it back', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'imp' });
    A.setNote('cs-2020:CS1', 'original');
    Store.flushNow();
    const mk = n => { const s = Store._blank(); s.q['cs-2020:CS' + n] = { n: 1, ok: 1, last: 1, lastOk: 1, firstOk: 1, ms: null, streak: 1, bm: 0 }; return backup(s); };
    for (let i = 1; i <= 4; i++) Store.importJSON(mk(i));
    const copies = Array.from(ls.m.keys()).filter(k => k.indexOf(K('imp') + ':before-import-') === 0);
    assert.equal(copies.length, 1, 'only the newest copy is kept: ' + copies.join());
    assert.ok(Store.state.q['cs-2020:CS4'], 'the last import is live');
    const li = Store.lastImport();
    assert.equal(li.key, copies[0]); assert.ok(Date.now() - li.at < 60e3);
    assert.ok(JSON.parse(ls.getItem(li.key)).q['cs-2020:CS3'], 'the copy is the progress before the last import');
    assert.equal(Store.undoImport({ reload: false }), true);
    assert.ok(Store.state.q['cs-2020:CS3'] && !Store.state.q['cs-2020:CS4'], 'undo restored the previous progress');
    const li2 = Store.lastImport();
    assert.ok(li2 && JSON.parse(ls.getItem(li2.key)).q['cs-2020:CS4'], 'the undone import is now the kept copy');
    assert.equal(Array.from(ls.m.keys()).filter(k => /:before-import-/.test(k)).length, 1);
  });
});

test('P0-12: usage() measures this app\'s keys from string lengths; dropKeys never deletes the live profile and retries a failed save', () => {
  withLS(shim(), ls => {
    ls.setItem('other-page', 'x'.repeat(1000));
    const t0 = Date.now() - 3600e3;
    ls.setItem(K('use') + ':before-import-' + t0, 'y'.repeat(6000));
    ls.setItem(K('use') + ':corrupt-' + (t0 + 1), 'z'.repeat(300));
    ls.setItem(K('demo'), '{}');
    Store.init({ profile: 'use' }); A.setFlag('a', 1); Store.flushNow();
    const u = Store.usage();
    const by = Object.fromEntries(u.keys.map(k => [k.key, k]));
    assert.equal(by[K('use')].kind, 'state'); assert.equal(by[K('use')].live, true);
    assert.equal(by[K('use') + ':before-import-' + t0].kind, 'before-import');
    assert.equal(by[K('use') + ':corrupt-' + (t0 + 1)].kind, 'corrupt');
    assert.equal(by[K('demo')].kind, 'state'); assert.equal(by[K('demo')].live, false);
    assert.ok(!by['other-page'], 'other pages\' keys are not listed as ours');
    assert.equal(u.chars, u.keys.reduce((a, k) => a + k.chars, 0));
    assert.equal(by[K('use') + ':corrupt-' + (t0 + 1)].chars, (K('use') + ':corrupt-' + (t0 + 1)).length + 300);
    assert.ok(!by[K('use') + ':theme'] && ls.getItem(K('use') + ':theme') === 'auto', 'the tiny theme key is written but not listed as a spare copy');
    assert.equal(u.all, ls.used(), 'all = every key in this storage (file:// pages share it)');
    assert.equal(u.quota, 5242880);
    // storage fills up; Free space drops the spare copies and the failed save goes through
    ls.quota = ls.used();
    for (let i = 0; i < 30; i++) A.setLessonDone('os.f' + i, true);
    assert.equal(Store.flushNow(), false);
    assert.deepEqual(Store.dropKeys([K('use'), 'other-page']), [], 'never the live key, never another page\'s key');
    const dropped = Store.dropKeys(u.keys.filter(k => !k.live && k.kind !== 'state').map(k => k.key));
    assert.equal(dropped.length, 2);
    assert.equal(Store.saveError, null, 'the retry after Free space saved');
    assert.equal(Object.keys(JSON.parse(ls.getItem(K('use'))).lessons).length, 30);
    assert.ok(ls.getItem('other-page'));
  });
});

test('P0-12/P1-51: import with no room for the copy, or for the backup itself, changes nothing and says so', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'room' }); A.setNote('cs-2021:CS2', 'mine'); Store.flushNow();
    const before = ls.getItem(K('room'));
    const big = Store._blank(); big.seen.pad = 'p'.repeat(4000);
    ls.quota = ls.used() + 100;                                        // no room for a copy of the current progress
    const err = listen('error');
    assert.throws(() => Store.importJSON(backup(big)), e => e.code === 'no-room' && /copy of your current progress/.test(e.message));
    assert.equal(ls.getItem(K('room')), before); assert.equal(Store.state.q['cs-2021:CS2'].note, 'mine');
    ls.quota = ls.used() + before.length + 200;                        // room for the copy, not for the bigger backup
    assert.throws(() => Store.importJSON(backup(big)), e => e.code === 'no-room' && /for this backup/.test(e.message));
    assert.equal(ls.getItem(K('room')), before, 'stored progress untouched'); assert.equal(Store.state.q['cs-2021:CS2'].note, 'mine', 'live progress untouched');
    assert.equal(Array.from(ls.m.keys()).filter(k => /:before-import-/.test(k)).length, 0, 'the pointless copy is removed again');
    assert.equal(err.got.length, 0, 'a refused import is an exception, not a failed save');
    assert.equal(Store.saveError, null);
    ls.quota = 5242880;
    const r = Store.importJSON(backup(big), { noCopy: true });
    assert.equal(r.copy, null); assert.equal(Store.state.seen.pad.length, 4000);
    err.off();
  });
});

/* ---------------------------------------------------------------- P1-51: one bad field never stops the app */
/** the readers a boot, a shell refresh and /settings run over the state (the shell's counts and chips, the Settings numbers) */
function readersRun(s) {
  const t = today();
  ST.subjects(s, D, t); ST.completion(s, D, t); ST.due(s, D, t); ST.weakTopics(s, D, t); ST.testTrend(s); ST.streak(s, t); ST.heatmap(s, 12, t);
  ST.timeStats(s, t); ST.todayGoals(s, t); ST.countdown(s, t); ST.nextLessons(s, D, 6); ST.overall(s, D, t); ST.recentAccuracy(s, 7, t);
  const c = E.compute(s, D, t); E.wrapped(s, D, { today: t }); E.ranges(s, t); E.recap(s, D, t);
  const nb = Object.values(s.nb).filter(n => n && !n.resolved).length;
  const settings = [Object.keys(s.q).length, s.tests.length, Object.keys(s.cards).length, Object.values(s.lessons).filter(e => e && e.done).length,
    ['questions', 'cards', 'lessons', 'minutes'].map(k => s.profile.goals[k]), U.esc(s.profile.name), U.esc(s.profile.examDate)];
  if (typeof GA.planner === 'object' && GA.planner && typeof GA.planner.todayTasks === 'function') { try { GA.planner.todayTasks(s, D, t); } catch (e) { /* WP6 mid-change */ } }
  return { c, nb, settings };
}
/** every container and entry has the type its readers expect */
function shapeOk(s) {
  const obj = x => !!x && typeof x === 'object' && !Array.isArray(x), num = x => typeof x === 'number' && isFinite(x);
  ['lessons', 'q', 'cards', 'nb', 'act', 'labs', 'seen', 'profile', 'eng'].forEach(k => assert.ok(obj(s[k]), k));
  ['log', 'tests'].forEach(k => assert.ok(Array.isArray(s[k]), k));
  assert.ok(s.plan === null || obj(s.plan)); assert.ok(s.live === null || obj(s.live));
  assert.ok(obj(s.profile.goals)); assert.ok(s.profile.examDate === null || /^\d{4}-\d{2}-\d{2}$/.test(s.profile.examDate)); assert.equal(typeof s.profile.examSet, 'boolean');
  for (const k in s.q) { const e = s.q[k]; assert.ok(obj(e), 'q.' + k); assert.ok(num(e.n) && num(e.ok), 'q.' + k); if (e.srs) assert.ok(/^\d{4}/.test(e.srs.due)); if ('note' in e) assert.equal(typeof e.note, 'string'); }
  for (const k in s.lessons) assert.ok(obj(s.lessons[k]), 'lessons.' + k);
  for (const k in s.cards) assert.ok(obj(s.cards[k]) && /^\d{4}-\d{2}-\d{2}$/.test(s.cards[k].due), 'cards.' + k);
  for (const k in s.nb) assert.ok(obj(s.nb[k]), 'nb.' + k);
  for (const k in s.act) { assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(k)); ['s', 'q', 'c', 'l'].forEach(f => assert.ok(num(s.act[k][f]), 'act.' + k + '.' + f)); }
  for (const k in s.labs) assert.ok(obj(s.labs[k]), 'labs.' + k);
  s.tests.forEach((t, i) => assert.ok(obj(t) && t.id != null, 'tests[' + i + ']'));
  s.log.forEach((r, i) => assert.ok(Array.isArray(r) && num(r[0]) && typeof r[1] === 'string', 'log[' + i + ']'));
}
const good = () => {
  const s = Store._blank(), t = Date.now(), d = today();
  s.q['cs-2020:CS1'] = { n: 2, ok: 1, last: t, lastOk: 1, firstOk: 0, ms: 40000, streak: 1, bm: 1, srs: { due: d, ivl: 1, ease: 2.5, reps: 1, lapses: 0, last: d } };
  s.lessons['os.sched.rr'] = { first: t, last: t, done: t, secs: 600, visits: 2, quiz: {} };
  s.cards[D.cards[0].id] = { due: d, ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: d };
  s.nb['cs-2020:CS1'] = { reason: 'calc', note: '', added: t, resolved: null, misses: 1 };
  s.act[d] = { s: 900, q: 3, c: 2, l: 1 };
  s.log.push([t, 'cs-2020:CS1', 1, 40000, 'p']);
  s.tests.push({ id: 't1', kind: 'topic', title: 'Quiz', started: t - 6e5, finished: t, score: 2, max: 4, attempted: 2, correct: 1, wrong: 1, total: 2, states: { a: 'correct', b: 'wrong' } });
  s.labs.paging = { runs: 2, ch: { n: 1, ok: 1 } };
  return s;
};
// the scenarios: one bad field each (the 17 of the audit and then some)
const SCENARIOS = [
  ['q: null', s => { s.q = null; }], ['q: []', s => { s.q = []; }], ['q: a string', s => { s.q = 'x'; }],
  ['one null question entry', s => { s.q['cs-2019:CS9'] = null; }], ['a question entry that is a number', s => { s.q['cs-2019:CS8'] = 7; }],
  ['a question with srs: "x"', s => { s.q['cs-2020:CS1'].srs = 'x'; }], ['a question with n: "two"', s => { s.q['cs-2020:CS1'].n = 'two'; }],
  ['one null notebook entry', s => { s.nb['cs-2018:CS3'] = null; }], ['nb: a string', s => { s.nb = 'oops'; }],
  ['log: null', s => { s.log = null; }], ['a log row that is not an array', s => { s.log.push({ t: 1 }); }], ['a log row with no time', s => { s.log.push([null, 'x', 1]); }],
  ['tests: null', s => { s.tests = null; }], ['a null test record', s => { s.tests.push(null); }], ['a test record with no id', s => { s.tests.push({ finished: 5, score: 1 }); }],
  ['lessons: []', s => { s.lessons = []; }], ['one null lesson record', s => { s.lessons['os.vm.pg'] = null; }], ['a lesson with quiz: null', s => { s.lessons['os.sched.rr'].quiz = null; }],
  ['cards: a string', s => { s.cards = 'c'; }], ['a card with no due date', s => { s.cards[D.cards[1].id] = { ivl: 3 }; }],
  ['act: null', s => { s.act = null; }], ['an act day that is null', s => { s.act['2026-10-01'] = null; }], ['an act key that is not a day', s => { s.act.yesterday = { s: 1, q: 1, c: 0, l: 0 }; }],
  ['labs: a string', s => { s.labs = 'l'; }], ['a lab with ch: null', s => { s.labs.paging.ch = null; }],
  ['profile: null', s => { s.profile = null; }], ['profile.goals: null', s => { s.profile.goals = null; }], ['examDate: "soon"', s => { s.profile.examDate = 'soon'; }],
  ['seen: null', s => { s.seen = null; }], ['plan: 5', s => { s.plan = 5; }], ['live: "x"', s => { s.live = 'x'; }], ['live without qids', s => { s.live = { id: 'L1' }; }],
  ['eng: junk', s => { s.eng = [1, 2]; }], ['logArch: a string', s => { s.logArch = 'junk'; }], ['created: "yesterday"', s => { s.created = 'yesterday'; }]
];

test('P1-51: every corrupt-field scenario boots: damage is dropped after the raw text is kept aside, and every reader runs', () => {
  assert.ok(SCENARIOS.length >= 17);
  withLS(shim(), ls => {
    for (const [name, spoil] of SCENARIOS) {
      const s = good(); spoil(s);
      const raw = doc(s);
      ls.m.clear(); ls.setItem(K('boot'), raw);
      let st;
      assert.doesNotThrow(() => { st = Store.init({ profile: 'boot' }); }, name);
      shapeOk(st);
      assert.doesNotThrow(() => readersRun(st), name);
      const iss = Store.issue;
      assert.ok(iss && iss.kind === 'repaired' && iss.count >= 1, name + ': reported');
      const copies = Array.from(ls.m.keys()).filter(k => k.indexOf(K('boot') + ':corrupt-') === 0);
      assert.equal(copies.length, 1, name + ': one corrupt copy'); assert.equal(ls.getItem(copies[0]), raw, name + ': the raw text is kept as it was');
      assert.doesNotThrow(() => JSON.parse(ls.getItem(K('boot'))), name + ': the repaired state replaced it');
      // the good parts survive
      if (!/^q:|^profile|question entry|srs|n: "two"/.test(name)) assert.ok(st.q['cs-2020:CS1'] && st.q['cs-2020:CS1'].n === 2, name + ': good data kept');
      // a second boot is clean (no new copy, no new report)
      Store.init({ profile: 'boot' });
      assert.equal(Store.issue, null, name + ': clean on the next boot');
      assert.ok(Store.state.profile && Store.state.profile.goals);
    }
  });
});

test('P1-51: unreadable text or a non-object root starts fresh with the text kept aside; the corrupt event waits for its first listener', () => {
  withLS(shim(), ls => {
    for (const raw of ['{"v":1,"q":', '[]', '"a string"', '42', 'null', '']) {
      ls.m.clear(); ls.setItem(K('bad'), raw);
      const st = Store.init({ profile: 'bad' });
      shapeOk(st); assert.deepEqual(st.q, {});
      assert.equal(Store.issue.kind, 'corrupt', JSON.stringify(raw));
      assert.equal(ls.getItem(Store.issue.key), raw);
      assert.equal(Store.rawText(), raw, 'Download my saved data gives the original text');
      const late = listen('corrupt'), later = listen('corrupt');
      assert.equal(late.got.length, 1, 'the shell may subscribe after init');
      assert.equal(later.got.length, 0, 'replayed once'); late.off(); later.off();
      A.setFlag('after', 1); Store.flushNow();
      assert.equal(JSON.parse(ls.getItem(K('bad'))).seen.after, 1, 'new progress saves');
    }
    // the copy rotates: two bad boots leave one copy
    ls.m.clear(); ls.setItem(K('bad'), '{x'); Store.init({ profile: 'bad' }); ls.setItem(K('bad'), '{y'); Store.init({ profile: 'bad' });
    assert.equal(Array.from(ls.m.keys()).filter(k => /:corrupt-/.test(k)).length, 1);
  });
});

test('P1-51: unreadable text and no room to keep it aside: nothing overwrites it until it can be kept (held), and the error says why', () => {
  withLS(shim(), ls => {
    ls.setItem(K('held'), '{"v":2,"q":{broken');
    ls.quota = ls.used() + 10;
    const st = Store.init({ profile: 'held' });
    assert.deepEqual(st.q, {});
    assert.equal(Store.saveError && Store.saveError.kind, 'held');
    const err = listen('error'); assert.equal(err.got.length, 1, 'the boot-time error waits for the banner'); err.off();
    A.setLessonDone('os.h', true);
    assert.equal(Store.flushNow(), false);
    assert.equal(ls.getItem(K('held')), '{"v":2,"q":{broken', 'the only copy of the old progress is never overwritten');
    assert.equal(Store.rawText(), '{"v":2,"q":{broken');
    ls.quota = 5242880;
    assert.equal(Store.flushNow(), true);
    const copy = Array.from(ls.m.keys()).find(k => /:corrupt-/.test(k));
    assert.equal(ls.getItem(copy), '{"v":2,"q":{broken', 'kept aside first'); assert.ok(JSON.parse(ls.getItem(K('held'))).lessons['os.h'].done);
  });
});

test('P1-51: importing q, nb, lessons, cards, log, tests, act and labs as null, [] or a string succeeds repaired; boot and every reader still work', () => {
  withLS(shim(), ls => {
    for (const f of ['q', 'nb', 'lessons', 'cards', 'log', 'tests', 'act', 'labs']) for (const bad of [null, [], 'oops']) {
      ls.m.clear();
      Store.init({ profile: 'impbad' }); A.setFlag('mine', 1); Store.flushNow();
      const s = good(); s[f] = bad;
      const r = Store.importJSON(backup(s));
      const wrongType = !(Array.isArray(bad) && (f === 'log' || f === 'tests'));      // [] is the right type for the log and the tests
      assert.equal(r.repaired >= 1, wrongType, f + ' ' + JSON.stringify(bad));
      shapeOk(Store.state); assert.doesNotThrow(() => readersRun(Store.state));
      const again = Store.init({ profile: 'impbad' });                   // a reload after the import
      shapeOk(again); assert.doesNotThrow(() => readersRun(again)); assert.equal(Store.issue, null, 'stored clean');
      assert.ok(Store.lastImport(), 'Undo last import stays possible');
    }
  });
});

test('P1-51: Import validates first: anything that is not a PassBook backup is refused before anything changes', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'val' }); A.setNote('cs-2022:CS5', 'keep'); Store.flushNow();
    const before = ls.getItem(K('val'));
    for (const f of ['not json', '[]', '{}', JSON.stringify({ app: 'other', state: {} }), JSON.stringify({ app: 'passbook' }), JSON.stringify({ app: 'passbook', state: [] }), JSON.stringify({ app: 'passbook', state: 'x' })])
      assert.throws(() => Store.importJSON(f), e => e.message === 'This file is not a PassBook backup', f);
    assert.equal(ls.getItem(K('val')), before); assert.equal(Store.state.q['cs-2022:CS5'].note, 'keep');
    assert.equal(Array.from(ls.m.keys()).filter(k => /:before-import-/.test(k)).length, 0);
  });
});

/* ---------------------------------------------------------------- P0-02: phantom and duplicate records */
test('P0-02: reviewCard ignores unknown ids and grades (no phantom review, no XP); finishTest ignores an id already stored', () => {
  Store.init({ profile: 'phantom' }); Store.reset();
  for (const id of [undefined, null, '', 'undefined', 'null', '1', '4', 42]) assert.equal(A.reviewCard(id, 2), null, String(id));
  assert.equal(A.reviewCard('c9', 7), null, 'a grade outside 0–3');
  assert.deepEqual(Store.state.cards, {}); assert.equal((Store.state.act[today()] || { c: 0 }).c, 0);
  assert.ok(A.reviewCard('c9', 2), 'any real-looking id without a catalogue');
  const prevD = GA.data.D; GA.data.D = D;
  try {
    assert.equal(A.reviewCard('os.nope#deadbeef', 2), null, 'with the catalogue loaded, only its card ids');
    assert.ok(A.reviewCard(D.cards[0].id, 2));
  } finally { GA.data.D = prevD; }
  assert.equal(Store.state.act[today()].c, 2);
  const q = { id: 'cs-2020:CS7', marks: 1, type: 'MCQ', answer: { kind: 'single', value: 'A' } };
  const t = { id: 'dup1', kind: 'paper', title: 'x', started: Date.now() - 1e6, finished: Date.now(), responses: { [q.id]: 'A' }, score: 1, max: 1, attempted: 1, correct: 1, wrong: 0, total: 1, states: { [q.id]: 'correct' } };
  assert.equal(A.finishTest(t, [q]), true);
  assert.equal(A.finishTest(Object.assign({}, t), [q]), false, 'a second Submit of the same test');
  assert.equal(Store.state.tests.length, 1); assert.equal(Store.state.log.filter(r => r[4] === 't').length, 1); assert.equal(Store.state.q[q.id].n, 1);
  assert.equal(A.finishTest(null), false); assert.equal(A.finishTest({ kind: 'x' }), false, 'no id');
  Store.flushNow();
});

test('P0-02: the v3 migration removes phantom card keys and duplicate test records (the first is kept), on load and on import', () => {
  const s = Store._blank();
  s.v = 2;
  s.cards = { undefined: { due: '2026-10-01', ivl: 1, ease: 2.5, reps: 1, lapses: 0, last: '2026-10-01' }, null: { due: '2026-10-01' }, '1': { due: '2026-10-01' }, ' ': { due: '2026-10-01' },
    'os.a#12ab34cd': { due: '2026-10-02', ivl: 3, ease: 2.5, reps: 2, lapses: 0, last: '2026-09-29' }, c9: { due: '2026-10-02' } };
  s.tests = [{ id: 'a', finished: 2, score: 1 }, { id: 'b', finished: 3 }, { id: 'a', finished: 4, score: 9 }];
  const m = Store._migrate(JSON.parse(JSON.stringify(s)));
  assert.deepEqual(Object.keys(m.cards).sort(), ['c9', 'os.a#12ab34cd']);
  assert.deepEqual(m.tests.map(t => [t.id, t.finished]), [['a', 2], ['b', 3]]);
  // and the XP ledger never pays a duplicate twice, even before a migration ran
  const x = Store._blank(); x.tests = [{ id: 'z', finished: Date.now(), score: 3, attempted: 3, correct: 3, wrong: 0, total: 3, states: { a: 'correct', b: 'correct', c: 'correct' } }];
  x.tests.push(Object.assign({}, x.tests[0]));
  assert.equal(E.ledger(x).total.tests, 103);
});

test('P3-51 (with the v3 migration): manifest card-id aliases move review history to the new id once, keeping the newer state', () => {
  const s = Store._blank();
  s.cards = { 'os.a#old1': { due: '2026-10-05', ivl: 5, ease: 2.5, reps: 3, lapses: 0, last: '2026-09-30' }, 'os.a#old2': { due: '2026-10-01', ivl: 1, ease: 2.5, reps: 1, lapses: 0, last: '2026-09-01' },
    'os.a#new2': { due: '2026-10-09', ivl: 9, ease: 2.6, reps: 4, lapses: 0, last: '2026-09-30' } };
  const al = { 'os.a#old1': 'os.a#new1', 'os.a#old2': 'os.a#new2' };
  const m = Store._migrate(s, [], { aliases: al });
  assert.deepEqual(Object.keys(m.cards).sort(), ['os.a#new1', 'os.a#new2']);
  assert.equal(m.cards['os.a#new1'].ivl, 5); assert.equal(m.cards['os.a#new2'].ivl, 9, 'the newer review wins');
  assert.deepEqual(Object.keys(Store._migrate(m, [], { aliases: al }).cards).sort(), ['os.a#new1', 'os.a#new2'], 'idempotent');
});

/* ---------------------------------------------------------------- P1-27: one note per question */
test('P1-27: setNote and the notebook write one note (q[id].note); blank deletes it; the notebook keeps no copy', () => {
  Store.init({ profile: 'notes' }); Store.reset();
  A.setNote('cs-2026-1:Q1', 'Read the question twice.  ');
  assert.equal(Store.state.q['cs-2026-1:Q1'].note, 'Read the question twice.');
  assert.equal(Store.state.q['cs-2026-1:Q1'].n, 0, 'a note before answering creates no attempt');
  A.attempt({ id: 'cs-2026-1:Q1', marks: 1, type: 'MCQ' }, 'B', false, 30000, 'p');
  assert.ok(Store.state.nb['cs-2026-1:Q1'] && !('note' in Store.state.nb['cs-2026-1:Q1']), 'a new notebook entry reads the one note, it keeps no copy');
  A.notebookSet('cs-2026-1:Q1', { note: 'Units: ms, not s.' });
  assert.equal(Store.state.q['cs-2026-1:Q1'].note, 'Units: ms, not s.', 'a note written in the notebook is the card\'s note');
  assert.ok(!('note' in Store.state.nb['cs-2026-1:Q1']));
  A.notebookSet('cs-2026-1:Q1', { reason: 'misread' });
  assert.equal(Store.state.nb['cs-2026-1:Q1'].reason, 'misread'); assert.equal(Store.state.q['cs-2026-1:Q1'].note, 'Units: ms, not s.');
  A.setNote('cs-2026-1:Q1', '   ');
  assert.ok(!('note' in Store.state.q['cs-2026-1:Q1'])); assert.ok(!('note' in Store.state.nb['cs-2026-1:Q1']), 'a deleted note stays deleted everywhere');
  A.setNote('cs-2026-1:Q2', ''); assert.ok(!Store.state.q['cs-2026-1:Q2'], 'a blank note on an untouched question stores nothing');
  A.setNote(undefined, 'x'); assert.ok(!Store.state.q.undefined);
  Store.flushNow();
});

test('P1-27: the v3 migration joins the card note and the notebook note once (different texts with a blank line)', () => {
  const s = { v: 2, profile: { examDate: '2027-02-06', goals: {} }, q: { a: { n: 1, ok: 0, note: 'card note' }, b: { n: 1, ok: 1, note: 'same' }, c: { n: 0, ok: 0 } },
    nb: { a: { reason: null, note: 'notebook note', added: 1, resolved: null, misses: 1 }, b: { note: 'same', added: 1 }, c: { note: '', added: 1 }, d: { note: 'only here', added: 1 } } };
  const m = Store._migrate(JSON.parse(JSON.stringify(s)));
  assert.equal(m.q.a.note, 'card note\n\nnotebook note'); assert.ok(!('note' in m.nb.a), 'the notebook reads q[id].note now (WP11): its copy is gone');
  assert.ok(Object.values(m.nb).every(n => !('note' in n)));
  assert.equal(m.q.b.note, 'same'); assert.equal(m.q.d.note, 'only here'); assert.equal(m.q.d.n, 0);
  assert.ok(!('note' in m.q.c));
  const again = Store._migrate(JSON.parse(JSON.stringify(m)));
  assert.equal(again.q.a.note, 'card note\n\nnotebook note', 'a v3 document is not joined again');
});

/* ---------------------------------------------------------------- P1-01, P1-23, P0-19, P2-49 writers */
test('P1-01 / P1-23 / P0-19: setLessonAt, setSeen (no attempt, schedule, notebook, activity or XP), setFlag, setPlan, lastExport', () => {
  Store.init({ profile: 'writers' }); Store.reset();
  A.setLessonAt('os.sched.rr', 'how-it-works');
  const at = Store.state.lessons['os.sched.rr'].at;
  assert.equal(at.h, 'how-it-works'); assert.ok(Date.now() - at.t < 5000);
  A.setLessonAt('os.sched.rr', null); assert.ok(!('at' in Store.state.lessons['os.sched.rr']));
  A.setLessonAt('', 'x'); A.setLessonAt(undefined, 'x'); assert.deepEqual(Object.keys(Store.state.lessons), ['os.sched.rr']);
  const xp0 = E.compute(Store.state, null, today()).xp.total;
  A.setSeen('cs-2007:Q12');
  const e = Store.state.q['cs-2007:Q12'];
  assert.ok(Date.now() - e.seen < 5000); assert.equal(e.n, 0); assert.equal(e.ok, 0); assert.ok(!e.srs);
  assert.equal(Store.state.log.length, 0); assert.deepEqual(Store.state.nb, {}); assert.ok(!Store.state.act[today()] || !Store.state.act[today()].q);
  assert.equal(E.compute(Store.state, null, today()).xp.total, xp0);
  A.setFlag('welcome'); assert.ok(Store.state.seen.welcome > 0); A.setFlag('milestone:lv2', 'x'); assert.equal(Store.state.seen['milestone:lv2'], 'x');
  A.setPlan({ day: today(), tasks: [] }); assert.equal(Store.state.plan.day, today());
  A.setPlan('nope'); assert.equal(Store.state.plan, null);
  A.lastExport(123); assert.equal(Store.state.profile.lastExport, 123); A.lastExport(); assert.ok(Store.state.profile.lastExport > 1e12);
  assert.equal(Store._blank().profile.lastExport, null); assert.equal(Store._blank().profile.route, null); assert.equal(Store._blank().profile.focus, null);
  Store.flushNow();
});

/* ---------------------------------------------------------------- P1-46: the exam date is only 'set' when the learner chose it */
test('P1-46: examSet — the untouched default is unset and stored as no date; any other stored date is set; setProfile with a date sets it, null clears it', () => {
  assert.equal(Store._blank().profile.examSet, false); assert.equal(Store._blank().profile.examDate, null, 'a new profile stores no date');
  const mig = p => Store._migrate({ v: 2, profile: Object.assign({ goals: {} }, p) }).profile;
  const d = mig({ examDate: '2027-02-06' });
  assert.equal(d.examSet, false); assert.equal(d.examDate, null, 'the untouched old default is cleared (P1-46)');
  assert.equal(mig({ examDate: '2027-02-13' }).examSet, true); assert.equal(mig({ examDate: '2027-02-13' }).examDate, '2027-02-13');
  const mine = mig({ examDate: '2027-02-06', examSet: true }); assert.equal(mine.examSet, true, 'a v3 profile keeps its flag'); assert.equal(mine.examDate, '2027-02-06', 'and the first day it chose');
  const n = mig({ examDate: null }); assert.equal(n.examDate, null); assert.equal(n.examSet, false);
  const j = mig({ examDate: 'soon', examSet: true }); assert.equal(j.examDate, null); assert.equal(j.examSet, false);
  // an unset profile counts to the first Group II paper day (Paper 4, 8 Jan 2027) through GA.stats.exam
  const E0 = ST.exam(Store._blank(), ST.EXAM_FALLBACK, '2026-10-16');
  assert.deepEqual([E0.date, E0.set, E0.basis, E0.paper && E0.paper.name], ['2027-01-08', false, 'official paper day', 'Paper 4']);
  Store.init({ profile: 'exam' }); Store.reset();
  A.setProfile({ examDate: '2027-02-06' }); assert.equal(Store.state.profile.examSet, true, 'choosing the first day is setting it');
  Store.flushNow(); Store.init({ profile: 'exam' }); assert.equal(Store.state.profile.examDate, '2027-02-06', 'a chosen first day survives the next load');
  A.setProfile({ examDate: null }); assert.equal(Store.state.profile.examSet, false); assert.equal(Store.state.profile.examDate, null);
  A.setProfile({ examDate: '2028-02-05' }); assert.equal(Store.state.profile.examSet, true);
  A.setProfile({ examDate: 'junk' }); assert.equal(Store.state.profile.examDate, '2028-02-05', 'a malformed date is ignored');
  A.setProfile({ route: 'crash', focus: 'os' }); assert.equal(Store.state.profile.route, 'crash'); assert.equal(Store.state.profile.focus, 'os');
  Store.flushNow();
});

test('P1-46: U.untilExam — today, tomorrow, N days, was on; no "1 days"; empty without a date', () => {
  const t = U.today(), E1 = n => ({ date: U.addDays(t, n), label: 'CA Inter January 2027', daysLeft: n });
  assert.equal(U.untilExam(E1(0)), 'CA Inter January 2027 is today');
  assert.equal(U.untilExam(E1(1)), 'CA Inter January 2027 is tomorrow');
  assert.equal(U.untilExam(E1(12)), '12 days to CA Inter January 2027');
  assert.equal(U.untilExam(E1(1200)), '1,200 days to CA Inter January 2027');
  const P = n => Object.assign(E1(n), { paper: { code: 'P4', name: 'Paper 4', day: U.addDays(t, n) } });   // a paper day names the paper
  assert.equal(U.untilExam(P(80)), '80 days to Paper 4'); assert.equal(U.untilExam(P(1)), 'Paper 4 is tomorrow'); assert.equal(U.untilExam(P(0)), 'Paper 4 is today');
  assert.equal(U.untilExam({ date: '2027-01-12', label: 'CA Inter January 2027', daysLeft: -3 }), 'CA Inter January 2027 was on 12 Jan');
  assert.equal(U.untilExam({ date: '2027-05-01', label: 'your exam', daysLeft: -1 }), 'Your exam was on 1 May 2027');
  assert.equal(U.untilExam({ date: '2027-05-01', daysLeft: 2 }), '2 days to your exam');
  assert.equal(U.untilExam({ date: '2027-05-01', label: 'your exam', daysLeft: 0 }), 'Your exam is today');
  assert.equal(U.untilExam({ date: null, label: 'GATE 2028', daysLeft: null }), ''); assert.equal(U.untilExam(null), '');
  for (let n = -3; n < 40; n++) assert.ok(!/\b1 days\b/.test(U.untilExam(E1(n))), String(n));
  assert.equal(U.medName('Programming & Data Structures'), 'Programming & DS'); assert.equal(U.medName('Computer Organization & Architecture'), 'CO & Architecture');
  assert.equal(U.medName('Algorithms'), 'Algorithms');
});

/* ---------------------------------------------------------------- P0-26: one review cap, from the exam date, that ends with the exam */
test('P0-26: card reviews and PYQ retries are capped at floor(days left / 2), with no 7-day floor and no cap from the eve on', () => {
  assert.equal(A._capFor(null), null); assert.equal(A._capFor(-5), null); assert.equal(A._capFor(0), null); assert.equal(A._capFor(1), null);
  assert.equal(A._capFor(2), 1); assert.equal(A._capFor(3), 1); assert.equal(A._capFor(10), 5); assert.equal(A._capFor(113), 56);
  Store.init({ profile: 'cap' }); Store.reset();
  const t = today(), mature = () => ({ due: t, ivl: 30, ease: 2.5, reps: 5, lapses: 0, last: U.addDays(t, -30) });
  const gap = id => U.daysBetween(t, Store.state.cards[id].due);
  const at = (n, id) => { A.setProfile({ examDate: U.addDays(t, n) }); Store.update(s => { s.cards[id] = mature(); }); A.reviewCard(id, 2); return gap(id); };
  assert.equal(at(10, 'c-a'), 5, '10 days left: due within 5');
  assert.equal(at(4, 'c-b'), 2, '4 days left: 2 (the old 7-day floor stored 3)');
  assert.equal(at(20, 'c-c'), 10);
  assert.ok(at(1, 'c-d') >= 30, 'the eve: natural spacing (the cards come back after GATE, on purpose)');
  assert.ok(at(0, 'c-e') >= 30, 'exam day');
  assert.ok(at(-3, 'c-f') >= 30, 'after the exam: natural spacing, never stuck at 3 days');
  // PYQ retries share the cap
  A.setProfile({ examDate: U.addDays(t, 6) });
  Store.update(s => { s.q['cs-2020:CS3'] = { n: 4, ok: 4, last: 1, lastOk: 1, firstOk: 1, ms: 30000, streak: 4, bm: 0, srs: mature() }; });
  A.attempt({ id: 'cs-2020:CS3', marks: 1, type: 'MCQ' }, 'A', true, 30000, 'p');
  assert.ok(U.daysBetween(t, Store.state.q['cs-2020:CS3'].srs.due) <= 3);
  A.setProfile({ examDate: U.addDays(t, -10) });
  A.attempt({ id: 'cs-2020:CS3', marks: 1, type: 'MCQ' }, 'A', true, 30000, 'p');
  assert.ok(U.daysBetween(t, Store.state.q['cs-2020:CS3'].srs.due) > 3, 'after the exam a retry is not capped');
  Store.flushNow();
});

/* ---------------------------------------------------------------- P0-09: lab XP only without Peek, at most 10 solves a day */
test('P0-09: lab challenge XP — 15 a solve, none with Peek, at most 10 solves a day; xpFor agrees; trimming the log keeps it', () => {
  Store.init({ profile: 'labxp' }); Store.reset();
  const xp = () => E.compute(Store.state, null, today()).xp.byKind.labs;
  assert.equal(E.xpFor(Store.state, 'lab', 'paging', true), 15);
  assert.equal(E.xpFor(Store.state, 'lab', 'paging', true, { peek: true }), 0, 'Peek forfeits it');
  A.labChallenge('paging', true, { peek: true }); assert.equal(xp(), 0);
  A.labChallenge('paging', false); assert.equal(xp(), 0);
  for (let i = 0; i < 12; i++) {
    const want = E.xpFor(Store.state, 'lab', 'paging', true), before = xp();
    A.labChallenge('paging', true);
    assert.equal(xp() - before, want, 'solve ' + (i + 1));
  }
  assert.equal(xp(), 150, '10 solves a day earn; the 11th and 12th do not');
  assert.equal(Store.state.labs.paging.ch.n, 14); assert.equal(Store.state.labs.paging.ch.ok, 13); assert.equal(Store.state.labs.paging.ch.peek, 1);
  assert.equal(Store.state.log.filter(r => r[4] === 'lx').length, 3, 'the peeked and over-cap solves');
  const w = E.wrapped(Store.state, null, { today: today() });
  assert.equal(w.labs.challenges, 14); assert.equal(w.labs.solved, 13, 'Wrapped still counts every checked challenge');
  const s = JSON.parse(JSON.stringify(Store.state));
  for (let i = 0; i < Store.LOG_CAP; i++) s.log.push([Date.now() + 1000 + i, 'q' + (i % 50), 1, 1000, 'z']);
  const before = E.ledger(s).total.labs; Store._trimLog(s);
  assert.equal(E.ledger(s).total.labs, before, 'archived lab rows keep their XP');
  Store.flushNow();
});

/* ---------------------------------------------------------------- the engine reads the store's sticky events and versions */
test('store events: listener errors never break saving; the change tags of quiet writes do not recompute the chips', () => {
  Store.init({ profile: 'events' }); Store.reset();
  const off = Store.on('change', () => { throw new Error('a broken listener'); });
  const ce = console.error; console.error = () => {};
  try { assert.doesNotThrow(() => A.setFlag('x', 1)); } finally { console.error = ce; off(); }
  assert.equal(Store.state.seen.x, 1); assert.equal(Store.flushNow(), true);
  const c1 = E.current(); A.setLessonAt('os.a', 'h1'); assert.equal(E.current(), c1, 'a saved position moves no number');
  A.setLessonDone('os.a', true); assert.notEqual(E.current(), c1);
  Store.flushNow();
});

test('P1-51: reset({keep}) keeps the stored text aside before starting fresh, and refuses when it cannot; keyText reads only this app\'s keys', () => {
  withLS(shim(), ls => {
    ls.setItem(K('fresh'), '{"v":3,"q":{"a":{"n":1,"ok":1}},"profile":{"goals":{}}}');
    ls.setItem('elsewhere', 'x');
    Store.init({ profile: 'fresh' });
    const raw = ls.getItem(K('fresh'));
    const k = Store.reset({ keep: true });
    assert.ok(k && ls.getItem(k) === raw, 'kept aside'); assert.deepEqual(Store.state.q, {});
    assert.equal(Store.keyText(k), raw); assert.equal(Store.keyText('elsewhere'), null);
    A.setFlag('z', 1); Store.flushNow();
    ls.quota = ls.used();
    assert.throws(() => Store.reset({ keep: true }), e => e.code === 'no-room');
    assert.equal(Store.state.seen.z, 1, 'nothing changed');
    ls.quota = 5242880;
    assert.equal(Store.reset(), null, 'a plain reset keeps nothing (Settings asks first)');
  });
});

test('P0-12: a copy that cannot be written never costs the older one (only Free space deletes a copy that is not replaced)', () => {
  withLS(shim(), ls => {
    const older = 'older copy ' + 'o'.repeat(3000);
    ls.setItem(K('rot') + ':corrupt-1700000000000', older);
    ls.setItem(K('rot'), '{not json');
    ls.quota = ls.used() + 5;
    Store.init({ profile: 'rot' });
    assert.equal(ls.getItem(K('rot') + ':corrupt-1700000000000'), older, 'kept although the new copy did not fit');
    assert.equal(Store.saveError.kind, 'held'); assert.equal(ls.getItem(K('rot')), '{not json');
    Store.dropKeys([K('rot') + ':corrupt-1700000000000']);              // the learner frees space: the held text goes aside and progress saves again
    assert.equal(Store.saveError, null);
    const copies = Array.from(ls.m.keys()).filter(k => /:corrupt-/.test(k));
    assert.equal(copies.length, 1); assert.equal(ls.getItem(copies[0]), '{not json');
  });
});

test('P1-58: U.verUrl stamps a project file with manifest.files[path] (else manifest.ver) once the build writes them; nothing before', () => {
  const M = GAD.manifest.main, had = { files: M.files, ver: M.ver };
  try {
    delete M.files; delete M.ver;
    assert.equal(U.verUrl('data/pyq/cs-2020.js'), 'data/pyq/cs-2020.js', 'today\'s manifest: unchanged URLs');
    M.files = { 'data/pyq/cs-2020.js': '1a2b3c4d' }; M.ver = '9f8e7d6c';
    assert.equal(U.verUrl('data/pyq/cs-2020.js'), 'data/pyq/cs-2020.js?v=1a2b3c4d');
    assert.equal(U.verUrl('./data/pyq/cs-2020.js'), './data/pyq/cs-2020.js?v=1a2b3c4d');
    assert.equal(U.verUrl('app/js/views/flash.js'), 'app/js/views/flash.js?v=9f8e7d6c', 'a file outside the map gets the build stamp');
    assert.equal(U.verUrl('x.js?y=1'), 'x.js?y=1', 'an explicit query is left alone');
  } finally { if (had.files === undefined) delete M.files; else M.files = had.files; if (had.ver === undefined) delete M.ver; else M.ver = had.ver; }
});

/* ---------------------------------------------------------------- Part B: the verifier's store flags */
test('P1-51 (flag): damaged but readable text with no room for its copy is held: never overwritten, saveError held, the copy is kept once there is room', () => {
  withLS(shim(), ls => {
    const s = good(); s.q['cs-2019:CS9'] = null; s.lessons['os.vm.pg'] = 7; s.seen.pad = 'p'.repeat(3000);
    const raw = doc(s);
    ls.setItem(K('rep'), raw);
    ls.quota = ls.used() + 200;                                       // room for small writes, not for a copy of the whole document
    const late = listen('repaired');
    const st = Store.init({ profile: 'rep' });
    assert.ok(st.q['cs-2020:CS1'] && !st.q['cs-2019:CS9'], 'the session runs on the repaired state');
    assert.equal(Store.issue.kind, 'repaired'); assert.equal(Store.issue.key, null); assert.equal(Store.issue.held, true);
    assert.equal(late.got.length, 1); assert.equal(late.got[0][0].held, true, 'the shell can tell nothing was kept aside'); late.off();
    assert.equal(Store.saveError && Store.saveError.kind, 'held'); assert.ok(/^Parts of your saved progress could not be read/.test(Store.saveError.message));
    assert.equal(ls.getItem(K('rep')), raw, 'the stored text is untouched');
    assert.equal(Array.from(ls.m.keys()).filter(k => /:corrupt-/.test(k)).length, 0);
    A.setLessonDone('os.r', true);
    assert.equal(Store.flushNow(), false); assert.equal(ls.getItem(K('rep')), raw, 'still never overwritten');
    assert.equal(Store.rawText(), raw, 'Download my saved data gives the original text');
    ls.quota = 5242880;
    assert.equal(Store.flushNow(), true);
    const copy = Array.from(ls.m.keys()).find(k => /:corrupt-/.test(k));
    assert.equal(ls.getItem(copy), raw, 'kept aside first'); assert.equal(Store.issue.key, copy); assert.equal(Store.issue.held, false);
    const now = JSON.parse(ls.getItem(K('rep')));
    assert.ok(now.lessons['os.r'].done && !now.q['cs-2019:CS9'], 'then the repaired state and the new progress are written');
  });
});

test('P0-12/P1-51 (flag): an import with room for the copy but not for the backup leaves the earlier import\'s copy in place; a copy in the way is freed for it', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'imp2' }); A.setNote('cs-2021:CS4', 'before both'); Store.flushNow();
    const first = Store._blank(); first.q['cs-2021:CS5'] = { n: 1, ok: 1, last: 1, lastOk: 1, firstOk: 1, ms: null, streak: 1, bm: 0 };
    Store.importJSON(backup(first));
    const earlier = Store.lastImport(), earlierText = ls.getItem(earlier.key), stored = ls.getItem(K('imp2'));
    const big = Store._blank(); big.seen.pad = 'p'.repeat(20000);
    ls.quota = ls.used() + stored.length + 400;                        // a new copy fits, the bigger backup does not (even without the old copy)
    assert.throws(() => Store.importJSON(backup(big)), e => e.code === 'no-room');
    assert.equal(ls.getItem(K('imp2')), stored, 'nothing changed'); assert.ok(Store.state.q['cs-2021:CS5']);
    assert.deepEqual(Store.lastImport(), earlier, 'the earlier import can still be undone'); assert.equal(ls.getItem(earlier.key), earlierText);
    assert.equal(Array.from(ls.m.keys()).filter(k => /:before-import-/.test(k)).length, 1);
    // now the backup fits only once the earlier copy is gone: the import frees it and lands, keeping its own copy
    const mid = Store._blank(); mid.seen.pad = 'm'.repeat(Math.max(0, earlierText.length - 300));
    ls.quota = ls.used() + stored.length + 600;
    const r = Store.importJSON(backup(mid));
    assert.ok(r.copy && ls.getItem(r.copy) === stored, 'the new copy is the progress before this import');
    assert.equal(ls.getItem(earlier.key), null); assert.equal(Store.state.seen.pad.length, mid.seen.pad.length);
  });
});

test('P2-75 (flag): undo with no room for the swap copy still undoes, then keeps the undone import in the freed room', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'undo2' }); A.setNote('cs-2022:CS1', 'old'); Store.flushNow();
    const nxt = Store._blank(); nxt.seen.pad = 'n'.repeat(5000); Store.importJSON(backup(nxt));
    ls.quota = ls.used() + 100;                                       // no room for a third document
    assert.equal(Store.undoImport({ reload: false }), true);
    assert.equal(Store.state.q['cs-2022:CS1'].note, 'old', 'undone');
    const li = Store.lastImport();
    assert.ok(li && JSON.parse(ls.getItem(li.key)).seen.pad.length === 5000, 'the undone import is the new kept copy');
    assert.equal(Array.from(ls.m.keys()).filter(k => /:before-import-/.test(k)).length, 1);
  });
});

/* ---------------------------------------------------------------- P2-75, P3-34, P3-38, P3-28, P2-65, P2-38 */
test('P2-75: copies kept before an import go at boot after 7 days (corrupt copies stay); a demo backup is refused outside the demo; Export is compact JSON', () => {
  withLS(shim(), ls => {
    const old = Date.now() - 8 * 864e5, young = Date.now() - 2 * 864e5;
    ls.setItem(K('age') + ':before-import-' + old, '{"v":3}'); ls.setItem(K('age') + ':corrupt-' + old, '{x');
    Store.init({ profile: 'age' });
    assert.equal(ls.getItem(K('age') + ':before-import-' + old), null, 'older than 7 days: deleted at boot');
    assert.equal(ls.getItem(K('age') + ':corrupt-' + old), '{x', 'unreadable data is never deleted without the learner');
    ls.setItem(K('age') + ':before-import-' + young, '{"v":3}'); Store.init({ profile: 'age' });
    assert.ok(ls.getItem(K('age') + ':before-import-' + young), 'younger copies stay for Undo'); assert.equal(Store.lastImport().at, young);
    A.setNote('cs-2023:CS2', 'mine'); Store.flushNow();
    const demo = JSON.stringify({ app: 'passbook', exported: new Date().toISOString(), profile: 'demo', state: Store._blank() });
    assert.throws(() => Store.importJSON(demo), e => e.code === 'demo' && /demo profile/.test(e.message));
    assert.equal(Store.state.q['cs-2023:CS2'].note, 'mine', 'nothing changed');
    const text = Store.exportJSON();
    assert.ok(!/\n/.test(text), 'one line'); const d = JSON.parse(text); assert.equal(d.app, 'passbook'); assert.equal(d.state.q['cs-2023:CS2'].note, 'mine');
    Store.init({ profile: 'demo' }); assert.doesNotThrow(() => Store.importJSON(demo), 'the demo profile takes a demo backup');
  });
});

test('P3-34: time on task saves at most once a minute (any other change within 250 ms carries it); a tiny theme key mirrors the theme for the first paint', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'lazy' }); A.setFlag('x', 1); Store.flushNow();
    const w0 = ls.writes;
    A.addActive(15);
    assert.ok(Store._due() > 50000, 'time alone waits about a minute: ' + Store._due());
    A.addActive(15); assert.ok(Store._due() > 50000, 'more time does not bring it forward');
    A.setLessonDone('os.lz', true); assert.ok(Store._due() <= 250, 'a real change is written within 250 ms');
    Store.flushNow(); assert.equal(Store._due(), null);
    assert.equal(JSON.parse(ls.getItem(K('lazy'))).act[today()].s, 30, 'the time went with it');
    assert.ok(ls.writes > w0);
    assert.equal(ls.getItem(K('lazy') + ':theme'), 'auto');
    A.setProfile({ theme: 'dark' }); Store.flushNow(); assert.equal(ls.getItem(K('lazy') + ':theme'), 'dark');
    const n = ls.writes; A.setFlag('y', 1); Store.flushNow(); assert.equal(ls.writes, n + 1, 'an unchanged theme is not rewritten');
    assert.equal(Store._kindOf(K('lazy') + ':theme'), 'meta'); assert.ok(!Store.usage().keys.some(k => k.kind === 'meta'), 'never offered as a spare copy');
  });
});

test('P3-38: while the page is being hidden every change is written at once, whatever the order of the hide listeners', () => {
  withLS(shim(), ls => {
    Store.init({ profile: 'hide' }); A.setFlag('x', 1); Store.flushNow();
    A.addActive(10);                                                   // pending: the lazy time write
    Store._hide(true);
    assert.equal(JSON.parse(ls.getItem(K('hide'))).act[today()].s, 10, 'the pending change was written on hide');
    A.addActive(7);                                                    // the time tracker's own pagehide handler, running after the store's
    assert.equal(JSON.parse(ls.getItem(K('hide'))).act[today()].s, 17, 'the last seconds are on disk');
    Store._hide(false);
    A.addActive(5); assert.equal(JSON.parse(ls.getItem(K('hide'))).act[today()].s, 17, 'back to the lazy write');
  });
});

test('P3-28: profile.dayStart is 0–6 (absent = 4 a.m.); setProfile sets and clears it; anything else is dropped', () => {
  Store.init({ profile: 'daystart' }); Store.reset();
  assert.ok(!('dayStart' in Store.state.profile)); assert.equal(U.dayStart(), 4);
  A.setProfile({ dayStart: 2 }); assert.equal(Store.state.profile.dayStart, 2); assert.equal(U.dayStart(), 2);
  A.setProfile({ dayStart: 9 }); assert.equal(Store.state.profile.dayStart, 2, 'out of range: ignored');
  A.setProfile({ dayStart: null }); assert.ok(!('dayStart' in Store.state.profile)); assert.equal(U.dayStart(), 4);
  const rep = [], m = Store._migrate({ profile: { dayStart: 'late' } }, rep);
  assert.ok(!('dayStart' in m.profile)); assert.ok(rep.includes('profile.dayStart'));
  assert.equal(Store._migrate({ profile: { dayStart: 0 } }).profile.dayStart, 0);
  Store.flushNow();
});

test('P2-65 / P2-38: setBookmark returns how many are bookmarked (the toast\'s count); setFlags writes several marks in one change', () => {
  Store.init({ profile: 'bm' }); Store.reset();
  assert.equal(A.setBookmark('cs-2024:CS1', true), 1); assert.equal(A.setBookmark('cs-2024:CS2', true), 2); assert.equal(A.setBookmark('cs-2024:CS1', false), 1);
  assert.equal(A.setBookmark(undefined, true), null);
  const tags = []; const off = Store.on('change', t => tags.push(t));
  A.setFlags({ 'ms:level': 3, 'ms:run': null, 'ms:v': 1 }); off();
  assert.deepEqual(tags, ['flag'], 'one quiet change'); assert.equal(Store.state.seen['ms:level'], 3); assert.equal(Store.state.seen['ms:run'], null);
  Store.flushNow();
});

test('P2-49: persist() asks only on http(s), silently (Chromium, Safari), Firefox desktop only from a button; null on file://; maybePersist waits for something to lose', () => {
  const script = `
    globalThis.GA = {}; const R = ${JSON.stringify(path.join(__dirname, '..', 'app', 'js', 'core'))} + '/';
    require(R + 'util.js'); require(R + 'srs.js'); require(R + 'stats.js'); const S = require(R + 'store.js'), A = require(R + 'actions.js');
    const calls = []; let answer = true, already = false;
    const nav = ua => ({ userAgent: ua, storage: { persisted: () => Promise.resolve(already), persist: () => { calls.push(ua.slice(0, 7)); return Promise.resolve(answer); } } });
    (async () => {
      const out = {};
      out.node = await S.persist();
      globalThis.location = { protocol: 'file:' }; globalThis.navigator = nav('Chrome/130');
      out.file = await S.persist();
      globalThis.location = { protocol: 'https:' };
      out.chrome = await S.persist(); out.after = S.persisted;
      globalThis.navigator = nav('Mozilla/5.0 (X11) Gecko Firefox/131.0');
      out.ffAuto = await S.persist(); out.ffAsk = await S.persist({ ask: true });
      already = true; out.already = await S.persist();
      out.calls = calls.slice();
      // maybePersist: nothing to lose yet, then the 10th answer
      already = false; calls.length = 0; globalThis.navigator = nav('Chrome/130');
      S.init({ profile: 'persist' }); S.reset();
      out.fresh = A.maybePersist('boot');
      for (let i = 0; i < 10; i++) A.attempt({ id: 'cs-2020:CS' + (i + 1), marks: 1, type: 'MCQ' }, 'A', true, 1000, 'p');
      await new Promise(r => setTimeout(r, 0));
      out.after10 = calls.length; out.again = A.maybePersist('attempt'); out.installed = A.maybePersist('installed');
      S.init({ profile: 'demo' }); out.demo = A.maybePersist('installed');
      process.stdout.write(JSON.stringify(out));
    })();`;
  const r = JSON.parse(cp.execFileSync(process.execPath, ['-e', script]).toString());
  assert.equal(r.node, null); assert.equal(r.file, null); assert.equal(r.chrome, true); assert.equal(r.after, true);
  assert.equal(r.ffAuto, false, 'Firefox desktop: not asked without the button'); assert.equal(r.ffAsk, true); assert.equal(r.already, true);
  assert.deepEqual(r.calls, ['Chrome/', 'Mozilla'], 'persist() itself only where it is silent, or from the button');
  assert.equal(r.fresh, false, 'nothing to lose yet'); assert.equal(r.after10, 1, 'asked once the 10th answer is in');
  assert.equal(r.again, false, 'once a session'); assert.equal(r.installed, true, 'again when the app is installed'); assert.equal(r.demo, false, 'never for the demo profile');
});

test('P3-26: the demo\'s tests agree with its notebook and bank: every graded test answer is in the log inside the test window and in the question records', () => {
  const script = `
    const R = ${JSON.stringify(path.join(__dirname, '..'))} + '/';
    globalThis.GAD = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } }; globalThis.GA = {};
    require(R + 'data/manifest.js');
    ['util', 'srs', 'scoring', 'store', 'actions', 'stats', 'testgen', 'data', 'engage'].forEach(m => require(R + 'app/js/core/' + m + '.js'));
    GA.util.loadScript = src => { require(R + src); return Promise.resolve(); };
    const D = GA.data.init(), S = GA.store; S.init({ profile: 'demo' }); require(R + 'app/js/core/demo.js');
    GA.demo.seed(S, D).then(() => {
      const s = S.state, bad = [];
      for (const t of s.tests) for (const id of Object.keys(t.states || {})) {
        const st = t.states[id]; if (st !== 'correct' && st !== 'wrong' && st !== 'partial') continue;
        const row = s.log.find(r => r[1] === id && r[4] === 't' && r[0] >= t.started && r[0] <= t.finished);
        if (!row) bad.push('no log row ' + t.id + ' ' + id);
        else if (!!row[2] !== (st === 'correct')) bad.push('wrong result ' + id);
        if (!s.q[id] || !(s.q[id].n >= 1)) bad.push('no question record ' + id);
        if ((st === 'wrong' || st === 'partial') && !s.nb[id]) bad.push('a test miss with no notebook entry ' + id);   // an ICAI Partly is a miss too
      }
      const byId = {}; s.log.filter(r => /^[prt]$/.test(r[4])).forEach(r => { byId[r[1]] = (byId[r[1]] || 0) + 1; });
      for (const id in s.q) if ((s.q[id].n | 0) !== (byId[id] | 0)) bad.push('count ' + id);
      process.stdout.write(JSON.stringify({ bad: bad.slice(0, 5), n: bad.length, tests: s.tests.length, papers: D.papers.length, t: s.log.filter(r => r[4] === 't').length, nb: Object.keys(s.nb).length }));
    });`;
  const r = JSON.parse(cp.execFileSync(process.execPath, ['-e', script]).toString());
  assert.equal(r.tests, r.papers ? 3 : 0, 'three demo tests once the ICAI bank has papers, none before');
  if (r.papers) assert.ok(r.t >= 10, 'test answers are logged: ' + r.t);   // ICAI: paper sittings, or 10-MCQ drills while no paper can be sat
  assert.equal(r.n, 0, r.bad.join('; '));
});

/* ---------------------------------------------------------------- P2-41 (D8): the notebook's spacing, the writer's half */
test('P2-41: attempt() stamps every miss (nb.missed) and closes an entry only 3 or more study days after the last miss, with or without stats.js', () => {
  const script = `
    globalThis.GA = {}; const R = ${JSON.stringify(path.join(__dirname, '..', 'app', 'js', 'core'))} + '/';
    require(R + 'util.js'); require(R + 'srs.js'); const S = require(R + 'store.js'), A = require(R + 'actions.js');
    const U = GA.util, q = { id: 'cs-2020:CS7', marks: 1, type: 'MCQ' }, realNow = Date.now;
    const at = (k, min) => +U.parseDay(k) + 8 * 3600e3 + (min || 0) * 60e3;     // 8 hours into study day k (04:00 + 8 h = noon)
    const run = () => {
      const out = [];
      const answer = (k, min, ok) => { Date.now = () => at(k, min); try { A.attempt(q, ok ? 'A' : 'B', ok, 20000, 'p'); } finally { Date.now = realNow; } const n = S.state.nb[q.id]; out.push([k, ok, !!n.resolved, n.misses, n.missed === at(k, min)]); };
      S.init({ profile: 'p241' }); S.reset();
      answer('2026-10-10', 0, false); answer('2026-10-10', 1, true); answer('2026-10-10', 2, true); answer('2026-10-11', 0, true);
      answer('2026-10-12', 0, true); answer('2026-10-13', 0, true); answer('2026-10-14', 0, false); answer('2026-10-16', 0, true); answer('2026-10-17', 0, true);
      // an entry written before nb.missed existed: the newest wrong row of the log stands in for it
      S.update(s => { delete s.nb[q.id].missed; s.nb[q.id].resolved = null; s.log.push([at('2026-10-20'), q.id, 0, 1000, 'p']); }, 't');
      Date.now = () => at('2026-10-22'); try { A.attempt(q, 'A', true, 20000, 'p'); } finally { Date.now = realNow; }
      out.push(['old entry +2', !!S.state.nb[q.id].resolved]);
      Date.now = () => at('2026-10-23'); try { A.attempt(q, 'A', true, 20000, 'p'); } finally { Date.now = realNow; }
      out.push(['old entry +3', !!S.state.nb[q.id].resolved]);
      S.flushNow(); S.reset();
      return out;
    };
    const local = run();                                   // stats.js not loaded: actions.js runs the same rule itself
    require(R + 'stats.js');
    const shared = typeof GA.stats.resolvesMiss === 'function' ? run() : null;
    process.stdout.write(JSON.stringify({ local, shared }));`;
  const r = JSON.parse(cp.execFileSync(process.execPath, ['-e', script]).toString());
  const want = [['2026-10-10', false, false, 1, true], ['2026-10-10', true, false, 1, false], ['2026-10-10', true, false, 1, false], ['2026-10-11', true, false, 1, false],
    ['2026-10-12', true, false, 1, false], ['2026-10-13', true, true, 1, false], ['2026-10-14', false, false, 2, true], ['2026-10-16', true, false, 2, false],
    ['2026-10-17', true, true, 2, false], ['old entry +2', false], ['old entry +3', true]];
  assert.deepEqual(r.local, want, 'the local rule');
  if (r.shared) assert.deepEqual(r.shared, want, 'GA.stats.resolvesMiss agrees');
});
test('P2-41: sanitize keeps nb.missed as a time stamp and drops a damaged one (the log then stands in)', () => {
  const s = Store._blank(), rep = [];
  s.nb['cs-2020:CS1'] = { reason: null, added: 5, resolved: null, misses: 1, missed: '1760000000000' };
  s.nb['cs-2020:CS2'] = { reason: null, added: 5, resolved: null, misses: 1, missed: 'soon' };
  const m = Store._migrate(s, rep);
  assert.equal(m.nb['cs-2020:CS1'].missed, 1760000000000, 'a lossless coercion');
  assert.ok(m.nb['cs-2020:CS2'] && !('missed' in m.nb['cs-2020:CS2']), 'a damaged stamp is dropped, the entry kept');
  assert.ok(rep.some(x => /nb\.cs-2020:CS2/.test(x)) && !rep.some(x => /nb\.cs-2020:CS1/.test(x)), rep.join(', '));
});

/* integration (WP12's P2-59 'Continue where you left off'): a lab record carries `at`, the time of its last run or check */
test('P2-59: labRun and labChallenge stamp the lab record with `at` (ms), and nothing else in the record changes shape', () => {
  Store.init({ profile: 'labat' }); Store.reset();
  const t0 = Date.now();
  A.labRun('paging');
  const r1 = Store.state.labs.paging;
  assert.ok(r1.at >= t0 && r1.at <= Date.now(), 'a run stamps at');
  assert.deepEqual([r1.runs, r1.ch.n, r1.ch.ok], [1, 0, 0]);
  A.labChallenge('cache', false);
  const r2 = Store.state.labs.cache;
  assert.ok(r2.at >= t0, 'a check stamps at on a lab never run');
  assert.deepEqual([r2.runs, r2.ch.n, r2.ch.ok], [0, 1, 0]);
  Store.flushNow();
});
