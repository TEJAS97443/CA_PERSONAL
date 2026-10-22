/* core/data.js (WP4): the catalogue's new build fields and the loaders that reject on failure (P1-59), the per-lesson split (P1-60) and
   versioned figure URLs (P1-58). Loaders are exercised with a stubbed U.loadScript; global state is restored after each test. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const Data = require('../app/js/core/data.js');
const U = GA.util;

function manifest(extra) {
  return Object.assign({
    built: '2026-10-16', topicMarks: {}, labs: [],
    syllabus: { subjects: [{ id: 'os', name: 'Operating Systems', topics: [{ id: 'os.a', name: 'A', status: 'in', subtopics: [{ id: 'os.a.x', name: 'X' }] }] }] },
    lessons: [{ id: 'os.a.x', title: 'X', subject: 'os', topic: 'os.a', minutes: 10, status: 'in', needs: [] }],
    cards: [['c1', 'os.a.x']],
    papers: [{ id: 'p1', year: 2020, set: 1 }],
    pyq: { cols: ['id', 'paper', 'sec', 'no', 'marks', 'type', 'subject', 'topic', 'subtopic', 'diff', 'flags'],
           rows: [['p1:1', 0, 1, 1, 1, 0, 'os', 'os.a', 'os.a.x', 0, 2 | 4], ['p1:2', 0, 1, 2, 2, 0, 'os', 'os.a', 'os.a.x', 1, 4 | 128 | 256 | 512], ['p1:3', 0, 1, 3, 1, 2, 'os', 'os.a', 'os.a.x', -1, 0]] }
  }, extra || {});
}
/** run f with a fresh GAD, a scripted U.loadScript (files: {path: () => register}; a missing path is a network failure) and Data.D = catalogue */
async function withLoader(M, files, f) {
  const saved = { GAD: globalThis.GAD, load: U.loadScript, D: Data.D }, calls = [];
  globalThis.GAD = { reg(ns, k, v) { (this[ns] = this[ns] || {})[k] = v; } };
  U.loadScript = src => { calls.push(src); const r = files[src]; if (!r) return Promise.reject(new Error('Failed to load ' + src)); r(); return Promise.resolve(); };
  Data.D = Data.buildCatalogue(M);
  try { await f(calls); } finally { globalThis.GAD = saved.GAD; U.loadScript = saved.load; Data.D = saved.D; }
}
const rejects = async (p, file, re) => { let err = null; try { await p; } catch (e) { err = e; } assert.ok(err, 'rejects: ' + file); assert.equal(err.file, file); if (re) assert.match(err.message, re); };
/* tests/run.js is synchronous (it exits as soon as the files are required), so the promise-based checks run in a child process and report back */
function atest(name, fn) {
  test(name, () => {
    const cp = require('child_process'), path = require('path');
    const script = `globalThis.GA = {}; const assert = require('assert');
      require(${JSON.stringify(path.join(__dirname, '../app/js/core/util.js'))}); const Data = require(${JSON.stringify(path.join(__dirname, '../app/js/core/data.js'))}); const U = GA.util;
      ${manifest.toString()}\n${withLoader.toString()}\nconst rejects = ${rejects.toString()};
      (${fn.toString()})().then(() => process.stdout.write('ok'), e => process.stdout.write(String(e && e.stack || e)));`;
    const out = cp.execFileSync(process.execPath, ['-e', script]).toString();
    assert.equal(out, 'ok', out);
  });
}

test('data: question flags expose marks-to-all, checked and disputed bits; new manifest fields pass through or default', () => {
  const D = Data.buildCatalogue(manifest());
  const [a, b, c] = D.questions;
  assert.deepEqual([a.hasSol, a.hasKey, a.mta, a.checked, a.disputed], [true, true, false, false, false]);
  assert.deepEqual([b.hasKey, b.mta, b.checked, b.disputed, b.diff], [true, true, true, true, 'medium']);
  assert.deepEqual([c.type, c.diff, c.hasKey], ['NAT', null, false]);
  assert.deepEqual([Data.FLAG.MTA, Data.FLAG.CHECKED, Data.FLAG.DISPUTE], [128, 256, 512]);
  assert.deepEqual([D.exam, D.search, D.results, D.files, D.ver, D.lessonFiles, D.cardAliases], [undefined, null, [], null, null, null, null]);
  const X = { cycles: [{ label: 'GATE 2027', days: ['2027-02-06'] }] };
  const E = Data.buildCatalogue(manifest({ exam: X, search: { alias: { kmap: ['karnaugh'] }, stop: ['the'] }, results: [{ exam: 'GATE 2026' }], files: { 'data/figs/a.png': 'abcd1234' }, ver: 'v1', lessonFiles: 'split', cardAliases: { old: 'new' } }));
  assert.equal(E.exam, X); assert.deepEqual(E.search.alias.kmap, ['karnaugh']); assert.equal(E.results.length, 1);
  assert.deepEqual([E.files['data/figs/a.png'], E.ver, E.lessonFiles, E.cardAliases.old], ['abcd1234', 'v1', 'split', 'new']);
});

test('data: figure URLs carry ?v=<sha8> only when the build lists the file', () => {
  const saved = Data.D;
  try {
    Data.D = Data.buildCatalogue(manifest({ files: { 'data/figs/cs-2020/q1.png': '0f1e2d3c' } }));
    assert.equal(Data.figUrl('cs-2020/q1.png'), 'data/figs/cs-2020/q1.png?v=0f1e2d3c');
    assert.equal(Data.figUrl('cs-2020/q2.png'), 'data/figs/cs-2020/q2.png');
    const f = Data.figUrl; assert.equal(f('cs-2020/q1.png'), 'data/figs/cs-2020/q1.png?v=0f1e2d3c', 'works detached (map callbacks)');
    Data.D = Data.buildCatalogue(manifest());
    assert.equal(Data.figUrl('x.png'), 'data/figs/x.png');
  } finally { Data.D = saved; }
});

test('data: the manifest error names build.py only on file://', () => {
  const saved = { GAD: globalThis.GAD, loc: globalThis.location, D: Data.D };
  try {
    globalThis.GAD = {};
    assert.throws(() => Data.init(), e => e.file === 'data/manifest.js' && !/build\.py/.test(e.message));
    globalThis.location = { protocol: 'file:' };
    assert.throws(() => Data.init(), e => /run `python3 build\.py`/.test(e.message));
    globalThis.location = { protocol: 'https:' };
    assert.throws(() => Data.init(), e => /did not load/.test(e.message) && !/build\.py/.test(e.message));
  } finally { globalThis.GAD = saved.GAD; if (saved.loc === undefined) delete globalThis.location; else globalThis.location = saved.loc; Data.D = saved.D; }
});

atest('data: loaders reject with err.file on a failed or silent file, resolve null for unknown ids, and a retry re-requests', async () => {
  await withLoader(manifest(), {}, async calls => {
    await rejects(Data.lesson('os.a.x'), 'data/lessons/os.js', /Failed to load/);
    await rejects(Data.paper('p1'), 'data/pyq/p1.js');
    await rejects(Data.question('p1:1'), 'data/pyq/p1.js');
    await rejects(Data.questions(['p1:1', 'p1:2']), 'data/pyq/p1.js');
    await rejects(Data.solution('p1:1'), 'data/sol/os.js');
    await rejects(Data.cardsOf('os'), 'data/cards/os.js');
    await rejects(Data.solutionsOf('os'), 'data/sol/os.js');
    await rejects(Data.searchPostings(), 'data/search-pyq.js');
    await rejects(Data.lessonsOf('os'), 'data/lessons/os.js');
    for (const p of [Data.lesson('nope'), Data.paper('nope'), Data.question('nope'), Data.solution('nope'), Data.solution('p1:3'), Data.cardsOf('nope'), Data.solutionsOf('nope'), Data.lessonsOf('nope')])
      assert.equal(await p, null, 'unknown ids and a question without a solution resolve null');
    assert.deepEqual(await Data.questions(['nope']), []);
    const n = calls.filter(c => c === 'data/lessons/os.js').length;
    await rejects(Data.lesson('os.a.x'), 'data/lessons/os.js');
    assert.equal(calls.filter(c => c === 'data/lessons/os.js').length, n + 1, 'a retry asks for the file again');
  });
  await withLoader(manifest(), { 'data/lessons/os.js': () => {}, 'data/pyq/p1.js': () => GAD.reg('pyq', 'p1', []) }, async () => {
    await rejects(Data.lesson('os.a.x'), 'data/lessons/os.js', /did not register lessons\.os/);
    assert.equal(await Data.question('p1:1'), null, 'a paper file without that question: not found');
  });
  await withLoader(manifest(), { 'data/lessons/os.js': () => GAD.reg('lessons', 'os', {}) }, async () => {
    await rejects(Data.lesson('os.a.x'), 'data/lessons/os.js', /has no lesson os\.a\.x/);
  });
});

atest('data: loaders resolve the registered records (subject files, papers merged with the catalogue, solutions, the per-lesson split)', async () => {
  const files = {
    'data/lessons/os.js': () => GAD.reg('lessons', 'os', { 'os.a.x': { id: 'os.a.x', md: '# X' } }),
    'data/pyq/p1.js': () => GAD.reg('pyq', 'p1', [{ id: 'p1:1', text: 'Q1' }, { id: 'p1:2', text: 'Q2' }]),
    'data/sol/os.js': () => GAD.reg('sol', 'os', { 'p1:1': { md: 'because' } }),
    'data/cards/os.js': () => GAD.reg('cards', 'os', [{ id: 'c1', q: 'front' }]),
    'data/search-pyq.js': () => GAD.reg('search', 'pyq', { tok: [0] })
  };
  await withLoader(manifest(), files, async calls => {
    assert.equal((await Data.lesson('os.a.x')).md, '# X');
    const q = await Data.question('p1:2'); assert.deepEqual([q.text, q.marks, q.mta, q.year], ['Q2', 2, true, 2020]);
    assert.deepEqual((await Data.questions(['p1:2', 'p1:1', 'nope'])).map(x => x.id), ['p1:2', 'p1:1']);
    assert.equal((await Data.solution('p1:1')).md, 'because'); assert.equal(await Data.solution('p1:2'), null, 'hasSol is off');
    assert.equal((await Data.cardsOf('os'))[0].q, 'front'); assert.deepEqual(await Data.searchPostings(), { tok: [0] });
    const before = calls.length; await Data.lesson('os.a.x'); assert.equal(calls.length, before, 'a registered file is not requested again');
  });
  const split = { 'data/lessons/os/os.a.x.js': () => GAD.reg('lesson', 'os.a.x', { id: 'os.a.x', md: '# split' }) };
  await withLoader(manifest({ lessonFiles: 'split' }), split, async calls => {
    assert.equal((await Data.lesson('os.a.x')).md, '# split');
    assert.deepEqual(calls, ['data/lessons/os/os.a.x.js'], 'one lesson, one file');
  });
  await withLoader(manifest({ lessonFiles: 'split' }), {}, async () => { await rejects(Data.lesson('os.a.x'), 'data/lessons/os/os.a.x.js'); });
});

