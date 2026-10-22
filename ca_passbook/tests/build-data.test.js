/* The build's data fields (WP13; docs/ARCHITECTURE.md §10.11): the shipped data/ tree is read in a sandbox (no globals touched) and checked
   against its sources, and the build's own modules are unit-tested in Python (tests/py/test_buildlib.py, run here in a child process).
   P0-04 marks to all · P0-21 key provenance · P1-15 answers below the fold, plain givens · P1-20 figure tones and grey paper · P1-26 search vocabulary · P1-38 lab
   citations · P1-46 exam calendar · P1-58 content stamps · P1-60 one file per lesson · P2-20 colour words · P2-24 key notes · P2-28 key note
   organiser · P2-35 official results · P2-77 badge bits · P3-14 diagram names · P3-51 card-id aliases · P0-17 display-maths lint · P3-37 KaTeX
   glyphs · P3-38 figure sizes. A test that reads data/ checks the last full build (python3 build.py). */
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = rel => fs.existsSync(path.join(ROOT, rel));
const PY = (() => { for (const p of ['python3', 'python']) { try { cp.execFileSync(p, ['-c', '0'], { stdio: 'ignore' }); return p; } catch (e) { /* next */ } } return null; })();

/* ---------------------------------------------------------------- the shipped data, registered into a sandbox
   (read once, guarded: a missing or half-built data/ tree fails the tests that need it, never the whole run) */
const FLAG = { FIG: 1, SOL: 2, KEY: 4, SPECIAL: 8, REVIEW: 16, GROUP: 32, LEGACY: 64, MTA: 128, CHECKED: 256, DISPUTE: 512 };
const REG = {}, LESSON_FILES = [], QS = {}, SOL = {};   // QS: id -> question record from data/pyq/<paper>.js; SOL: id -> {s, d, c}
let M = null, COL = {}, ROWS = [], rt = null, jsNorm = null, LOAD_ERR = null;
try {
  const sandbox = vm.createContext({ GAD: { reg(ns, key, val) { (REG[ns] = REG[ns] || {})[key] = val; } } });
  const run = rel => vm.runInContext(read(rel), sandbox, { filename: rel });
  run('data/manifest.js');
  run('data/search-pyq.js');
  M = REG.manifest.main;
  const dirOf = d => (fs.existsSync(path.join(ROOT, 'data', d)) ? fs.readdirSync(path.join(ROOT, 'data', d)) : []);   // an empty bank or no lessons: no folder
  for (const dir of ['pyq', 'sol', 'cards']) for (const f of dirOf(dir)) if (f.endsWith('.js')) run(`data/${dir}/${f}`);
  for (const s of dirOf('lessons')) {
    const full = path.join(ROOT, 'data', 'lessons', s);
    if (fs.statSync(full).isDirectory()) for (const f of fs.readdirSync(full)) if (f.endsWith('.js')) { LESSON_FILES.push(`data/lessons/${s}/${f}`); run(`data/lessons/${s}/${f}`); }
    else LESSON_FILES.push(`data/lessons/${s}`);
  }
  COL = Object.fromEntries(M.pyq.cols.map((c, i) => [c, i]));
  ROWS = M.pyq.rows;
  for (const qs of Object.values(REG.pyq || {})) for (const q of qs) QS[q.id] = q;
  for (const m of Object.values(REG.sol || {})) Object.assign(SOL, m);
  /* the runtimes' own normalisation, loaded into a second sandbox */
  rt = vm.createContext({ console });
  for (const f of ['app/js/core/util.js', 'app/js/core/pyqlib.js', 'app/js/core/search.js']) vm.runInContext(read(f), rt, { filename: f });
  jsNorm = rt.GA.pyqLib.norm;
} catch (e) { LOAD_ERR = e; }
const need = () => { if (LOAD_ERR) throw new Error('cannot read the built data or the runtimes (run python3 build.py): ' + LOAD_ERR.message); };
const has = (r, bit) => !!(r[COL.flags] & bit);

/* ---------------------------------------------------------------- the Python unit tests of tools/buildlib */
test('build: tools/buildlib unit tests (tests/py/test_buildlib.py)', () => {
  if (!PY) { console.log('       (skipped: no python3 on PATH)'); return; }
  const r = cp.spawnSync(PY, ['-I', '-m', 'unittest', 'discover', '-s', 'tests/py', '-p', 'test_buildlib.py'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000 });
  assert.equal(r.status, 0, (r.stderr || r.stdout || '').slice(-2500));
});

/* ---------------------------------------------------------------- P0-04 */

/* ---------------------------------------------------------------- P0-21 */

/* ---------------------------------------------------------------- P1-15 */
/* the lint, loaded in a child process (it sets globals for the renderer) */
function lintRun(code) {
  const script = `const L = require(${JSON.stringify(path.join(ROOT, 'tools/lint_content.js'))}), fs = require('fs'), path = require('path');
    const base = ${JSON.stringify(path.join(ROOT, 'content/subjects'))};
    const lessons = []; for (const d of fs.readdirSync(base)) { const dd = path.join(base, d); if (!fs.statSync(dd).isDirectory()) continue;
      for (const f of fs.readdirSync(dd)) if (f.endsWith('.md')) lessons.push([f, fs.readFileSync(path.join(dd, f), 'utf8').replace(/^---\\n[\\s\\S]*?\\n---\\n/, '').split('\\n')]); }
    const T = s => L.answerAboveFold(s.split('\\n')).map(w => w.why);
    process.stdout.write(JSON.stringify((() => { ${code} })()));`;
  return JSON.parse(cp.execFileSync(process.execPath, ['-e', script], { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20, timeout: 300000 }).toString());
}
test('P1-15: no worked example shows its answer above "Show the working"; only a given stays there, and its words state no result', () => {
  const r = lintRun(`
    const hits = [], gantt = [], above = {};
    for (const [f, body] of lessons) {
      L.answerAboveFold(body).forEach(w => hits.push(f + ':' + w.line + ' ' + w.why));
      const walk = cs => cs.forEach(c => { if (c.kind === 'example') { const fold = c.children.find(k => k.kind === 'answer');
        const ds = []; const down = k => k.children.forEach(x => { if (x.kind === 'diagram' && fold && x.open < fold.open) ds.push(x); down(x); }); down(c);
        ds.forEach(k => { if (/"type"\\s*:\\s*"gantt"/.test(body[k.open + 1])) gantt.push(f); });
        above[f.replace(/\\.md$/, '') + ' | ' + c.title] = ds.map(k => k.title); }
        walk(c.children); });
      walk(L.containerTree(body));
    }
    const ex = (prompt, diagram, opts) => (opts && opts.nest ? '::::: example A\\n' : ':::: example A\\n') + prompt + '\\n\\n::: diagram ' + (opts && opts.title || 'G') + '\\n' + diagram + '\\n:::\\n\\n' +
      (opts && opts.nest ? ':::: answer Show the working\\nx\\n::::\\n' + (opts.after || '') + ':::::' : '::: answer Show the working\\nx\\n:::\\n' + (opts && opts.after || '') + '::::');
    const G = '{"type":"gantt","blocks":[]}', GR = '{"type":"graph","nodes":[{"id":"S"},{"id":"A"}],"edges":[{"from":"S","to":"A","label":"2"}]}';
    const syn = {
      ganttAbove: T(ex('Find the Gantt chart.', G)),
      inside: T('::::: example A\\nFind the Gantt chart.\\n\\n:::: answer Show the working\\n::: diagram G\\n' + G + '\\n:::\\nx\\n::::\\n:::::'),
      givenChart: T(ex('The chart below shows a schedule. Find the waiting time.', G)),
      yesno: T(ex('Is the set schedulable?', G)),
      graphNotGiven: T(ex('Find the shortest path from S.', GR)),
      graphBelow: T(ex('Find the shortest path from S in the graph below.', GR)),
      tableToWrite: T(ex('Write the table and classify the operation.', '{"type":"table","head":["*","R"],"rows":[["R","R"]]}')),
      resultTitle: T(ex('Run Prim from S on this graph.', GR, { title: "Prim's tree: the MST, weight 8" })),
      flagged: T(ex('Find the shortest path from S.', GR.replace('{"type":"graph"', '{"type":"graph","given":true'))),
      concludes: T(ex('Is F self-dual? Use the table below.', '{"type":"table","head":["x"],"rows":[["0"]],"caption":"F takes opposite values on every pair, so it is self-dual."}')),
      path: T(ex('List the cycles of the graph below.', GR.replace('}]}', '}],"caption":"The cycle S → A → S."}'))),
      highlighted: T(ex('Which path is critical in the circuit below?', '{"type":"circuit","parts":[],"wires":[],"path":["A","g1"]}')),
      colon: T(ex('After six insertions the table is:', '{"type":"array","cells":[1,2]}')),
      second: T(':::: example A\\nFind the shortest path in the graph below.\\n\\n::: diagram G\\n' + GR + '\\n:::\\n\\n::: diagram H\\n' + GR + '\\n:::\\n\\n::: answer Show the working\\nx\\n:::\\n::::'),
      afterFold: T(ex('The chart below shows a schedule. Find the waiting time.', G, { nest: true, after: '\\nA closing remark.\\n' })) };
    return { hits, gantt, above, syn };`);
  assert.deepEqual(r.hits, []);
  assert.deepEqual(r.syn, { ganttAbove: ['not-given'], inside: [], givenChart: [], yesno: ['not-given'], graphNotGiven: ['not-given'], graphBelow: [],
    tableToWrite: ['not-given'], resultTitle: ['states-result'], flagged: [], concludes: ['states-result'], path: ['states-result'],
    highlighted: ['states-result'], colon: [], second: ['not-given'], afterFold: ['after-fold'] });
});

test('P1-15 (part C): a given singles nothing out by colour or line style its words do not explain, and its labels state no asked-for count', () => {
  const r = lintRun(`
    const U = (spec, prompt) => L.unexplainedMarks(spec, prompt), C = (spec, prompt) => L.countGiven(spec, prompt);
    const N = (fills, extra) => Object.assign({ type: 'graph', nodes: fills.map((f, i) => (f ? { id: 'n' + i, fill: f } : { id: 'n' + i })), edges: [] }, extra || {});
    const ex = (prompt, diagram) => ':::: example A\\n' + prompt + '\\n\\n::: diagram G\\n' + diagram + '\\n:::\\n\\n::: answer Show the working\\nx\\n:::\\n::::';
    const FLOW = '{"type":"graph","given":true,"nodes":[{"id":"1","fill":"a","start":true},{"id":"2","fill":"b"},{"id":"3"},{"id":"5","fill":"c"}],"edges":[{"from":"1","to":"2"}]}';
    return {
      subset: U(N(['a', 'b', null, 'c']), 'Find the dominators of this flow graph with entry node n0.'),
      grouped: U(N(['b', 'd', 'a', 'a', 'b']), 'For each of n0, n1, n2, n3, n4: is it NP-hard?'),
      legend: U(N(['b', 'd', 'a', 'a', 'b'], { caption: 'Teal: the guesses, orange: SAT, blue: the targets.' }), 'Which are NP-hard?'),
      colours: U(N(['a', 'a', 'b', 'b']), 'Colours mark the regions. Give the table.'),
      rainbow: U(N(['mute', 'a', 'b', 'c', 'mute']), 'Find IN and OUT of every block.'),
      uniform: U(N(['a', 'a', 'a']), 'How many orders?'),
      start: U({ type: 'graph', nodes: [{ id: 'S', fill: 'a' }, { id: 'A' }], edges: [] }, 'Run Prim from S on this graph.'),
      bareNumber: U(N([null, null, 'd'], { nodes: [{ id: '1' }, { id: '2' }, { id: '8', fill: 'd' }] }), 'The DFA below has 8 states.'),
      dashed: U({ type: 'graph', nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }], edges: [{ from: 'A', to: 'B', style: 'dashed' }, { from: 'B', to: 'C' }] }, 'Minimise the DFA below.'),
      dashedLegend: U({ type: 'graph', nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }], edges: [{ from: 'A', to: 'B', style: 'dashed' }, { from: 'B', to: 'C' }], caption: 'The dashed link fails.' }, 'Track the distances.'),
      cells: U({ type: 'table', head: ['a', 'b'], rows: [['1', 'NULL'], ['2', '3']], cells: { '0,1': 'c' } }, 'How many rows does each query return?'),
      cellsLegend: U({ type: 'table', head: ['a', 'b'], rows: [['1', 'NULL'], ['2', '3']], cells: { '0,1': 'c' }, caption: 'Amber: the NULL.' }, 'How many rows?'),
      treeHl: U({ type: 'tree', root: { label: 'r', children: [{ label: 'x', hl: true }, { label: 'y' }] } }, 'Insert 5 into the tree below.'),
      count: C({ type: 'tree', root: { label: '⋈', children: [{ label: '∪ (5 tuples)', children: [{ label: 'P (3)' }, { label: 'Q (4)' }] }, { label: 'T (2)' }] } }, 'How many tuples does the join contain?'),
      countGiven: C({ type: 'tree', root: { label: 'R (5 tuples)' } }, 'R has 5 tuples. How many tuples does the projection contain?'),
      flaggedStillChecked: T(ex('Find the dominators and the natural loops of this flow graph.', FLOW)),
      plainFlagged: T(ex('Find the dominators and the natural loops of this flow graph.', FLOW.replace(/,"fill":"[a-h]"/g, ''))),
      flaggedConcludes: T(ex('Find a minimal expression for F.', '{"type":"circuit","parts":[],"wires":[],"given":true,"caption":"Both inputs are tied to B, so it is an inverter."}')),
      flaggedNumbers: T(ex('Sketch Q for each.', '{"type":"wave","lanes":[],"given":true,"caption":"CLK is high for 4 units after each edge."}')) };`);
  assert.equal(r.subset, 'blue nodes n0; teal nodes n1; amber nodes n3', 'the two loop headers filled');
  assert.equal(r.grouped, 'teal nodes n0, n4; orange nodes n1; blue nodes n2, n3', 'the answer\'s split in two colours');
  for (const k of ['legend', 'colours', 'rainbow', 'uniform', 'start', 'dashedLegend', 'cellsLegend', 'countGiven']) assert.equal(r[k], '', k);
  assert.equal(r.bareNumber, 'orange nodes 8', 'a number in the prompt ("8 states") does not name state 8');
  assert.equal(r.dashed, 'dashed edges A–B');
  assert.equal(r.cells, 'amber cells 0,1');
  assert.equal(r.treeHl, 'amber nodes x');
  assert.match(r.count, /"5 tuples", the count the prompt asks for/);
  assert.deepEqual(r.flaggedStillChecked, ['unexplained-marks'], '"given": true does not skip the colour check');
  assert.deepEqual(r.plainFlagged, []);
  assert.deepEqual(r.flaggedConcludes, ['states-result'], 'a flagged given may not conclude ("so it is an inverter")');
  assert.deepEqual(r.flaggedNumbers, [], 'the author vouches for a flagged given\'s numbers');
});

/* ---------------------------------------------------------------- P2-20, P3-14 */
test('P2-20: captions name the v3 colours (no indigo; "sky blue" next to "blue"; d is orange), and the lint checks colour words', () => {
  const r = lintRun(`
    const P = (text, spec) => L.colourWordProblems(text, L.drawnColours(spec)).map(p => p.word);
    const indigo = [];
    for (const [f, body] of lessons) body.forEach((l, i) => { if (/\\bindigo\\b/i.test(l)) indigo.push(f + ':' + (i + 1)); });
    return { indigo,
      drawn: [...L.drawnColours({ type: 'graph', nodes: [{ fill: 'a' }, { fill: 'e' }], edges: [{ color: 'ok' }] })].sort(),
      table: [...L.drawnColours({ type: 'table', cells: { '0,1': 'a', '1,1': 'd' } })].sort(),
      gantt: [...L.drawnColours({ type: 'gantt', blocks: [{ p: 'P1' }, { p: 'idle' }, { p: 'P2' }] })].sort(),
      oldName: P('Indigo: the heap', { type: 'array', cells: [{ v: 1, hl: 'a' }] }),
      ok: P('Blue: the heap. Green: the sorted tail.', { type: 'array', cells: [{ v: 1, hl: 'a' }, { v: 2, hl: 'ok' }] }),
      notDrawn: P('Teal: the cover', { type: 'graph', nodes: [{ fill: 'a' }] }),
      ambiguous: P('Teal and blue: the two domains', { type: 'graph', nodes: [{ fill: 'b' }, { fill: 'e' }, { fill: 'a' }] }),
      cued: P('Teal and sky blue: the two domains. Blue: the router.', { type: 'graph', nodes: [{ fill: 'b' }, { fill: 'e' }, { fill: 'a' }] }),
      objects: P('An urn with 3 red and 2 blue balls', { type: 'tree', root: { label: 'x' } }),
      dOrange: [...L.drawnColours({ type: 'graph', nodes: [{ fill: 'd' }], edges: [{ color: 'bad' }] })].sort(),
      oldRose: P('Rose edges are requests', { type: 'graph', nodes: [], edges: [{ color: 'd' }] }),
      orangeOk: P('Orange edges are requests', { type: 'graph', nodes: [], edges: [{ color: 'd' }] }),
      redBad: P('Red: the bridge', { type: 'graph', nodes: [], edges: [{ color: 'bad' }] }),
      orangeAmber: P('Orange: the strip', { type: 'graph', nodes: [{ fill: 'c' }], edges: [] }),
      corpus: (() => { const bad = []; for (const [f, body] of lessons) { const txt = body.join('\\n');
        for (const m of txt.matchAll(/^(:{3,})\\s*diagram([^\\n]*)\\n([\\s\\S]*?)\\n\\1\\s*$/gm)) { let s; try { s = JSON.parse(m[3]); } catch (e) { continue; }
          for (const p of L.colourWordProblems([m[2].trim() || s.title || '', s.caption || ''].join(' '), L.drawnColours(s))) bad.push(f + ':' + txt.slice(0, m.index).split('\\n').length + ' ' + p.word); } }
        return bad; })() };`);
  assert.deepEqual(r.indigo, [], 'no lesson names indigo');
  assert.deepEqual(r.drawn, ['blue', 'green', 'sky blue']);
  assert.deepEqual(r.table, ['blue', 'green'], 'table cells: a green, d blue');
  assert.deepEqual(r.gantt, ['blue', 'teal'], 'Gantt processes take a, b, ... by position');
  assert.deepEqual(r.oldName, ['indigo']);
  assert.deepEqual(r.ok, []);
  assert.deepEqual(r.notDrawn, ['teal']);
  assert.deepEqual(r.ambiguous, ['blue']);
  assert.deepEqual(r.cued, []);
  assert.deepEqual(r.objects, []);
  // v3 draws d burnt orange (P2-06: --viz-d #C2410C light, #F97316 dark), so 'orange' names d and 'rose' / 'red' name bad only
  assert.deepEqual(r.dOrange, ['orange', 'rose']);
  assert.deepEqual(r.oldRose, ['rose']);
  assert.deepEqual(r.orangeOk, []);
  assert.deepEqual(r.redBad, []);
  assert.deepEqual(r.orangeAmber, ['orange'], 'amber (c) is not orange');
  assert.deepEqual(r.corpus, [], 'every caption names colours its drawing draws');
  assert.match(read('app/css/base.css'), /--viz-d: #C2410C;[\s\S]*--viz-d: #F97316;/, 'the guide follows the tokens: d is a burnt orange');
  const guide = read('docs/CONTENT_GUIDE.md');
  assert.match(guide, /draw \*\*blue, teal, amber, orange, sky blue, violet, green, pink\*\*/);
  assert.ok(!/\bd rose\b|amber, rose, sky blue/.test(guide), 'the guide no longer calls d rose');
  assert.ok(!/\(indigo, teal/.test(guide), 'the guide no longer names the old palette');
});


test('P3-14: every lesson drawing has an accessible name (a title, a caption or an alt)', () => {
  const r = lintRun(`
    const bad = [];
    for (const [f, body] of lessons) { const txt = body.join('\\n');
      for (const m of txt.matchAll(/^(:{3,})\\s*diagram([^\\n]*)\\n([\\s\\S]*?)\\n\\1\\s*$/gm)) { let s; try { s = JSON.parse(m[3]); } catch (e) { continue; }
        if (s.type !== 'table' && !m[2].trim() && !s.title && !s.caption && !s.alt) bad.push(f + ':' + txt.slice(0, m.index).split('\\n').length); } }
    return bad;`);
  assert.deepEqual(r, []);
});

/* ---------------------------------------------------------------- P0-17, P3-37: the maths checks (GA.md.displayLint and GA.md.glyphs, WP8's md.js) */
const nodeRun = (args) => cp.spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 300000, maxBuffer: 64 << 20 });
/** fn(file) on a throwaway lesson holding body (in the system temp dir, removed afterwards) */
function withLesson(body, fn) {
  const dir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'wp13-math-'));
  try { const f = path.join(dir, 'x.demo.md'); fs.writeFileSync(f, '---\nid: x.demo\ntitle: T\n---\n' + body); return fn(f); }
  finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
test('P0-17: the lint names a display formula a top-level \\qquad cannot split into rows that wrap on a phone, and only that', () => {
  const body = ['## In plain words', '', 'Rows: $$a = 1 \\\\ b = 2 \\qquad c = 3$$', '', 'Colour: $$\\color{red} x \\qquad y$$', '',
    'Splits: $$a = 1 \\qquad b = 2$$', '', 'Spacing only: $$\\left( a \\qquad b \\right)$$', '', 'Long: $$' + 'x + '.repeat(40) + 'x$$', ''].join('\n');
  withLesson(body, f => {
    const r = nodeRun(['tools/lint_content.js', f]), lint = r.stdout.split('\n').filter(l => /display formula/.test(l));
    assert.equal(r.status, 0, 'warnings only: ' + r.stdout);
    assert.equal(lint.length, 2, r.stdout);
    assert.match(lint[0], /^WARN .*display formula at body line 3 .*because it has its own rows/);
    assert.match(lint[1], /^WARN .*display formula at body line 5 .*because it switches colour/);
    assert.match(nodeRun(['tools/lint_content.js', '--long', '120', f]).stdout, /body line 11 .*a long display formula \(\d+ characters of TeX\) with no top-level/);
    const cm = nodeRun(['tools/check_math.js', f]);
    assert.equal(cm.status, 0, 'a display note never fails check_math.js: ' + cm.stdout);
    assert.equal((cm.stdout.match(/^MATH NOTE .*display formula/gm) || []).length, 2, cm.stdout);
  });
  assert.match(read('tools/lint_content.js'), /ML\.displayFindings\(md, html/, 'the lint uses the renderer\'s own rule');
});
test('P3-37: KaTeX has metrics for every character of the maths but the known signs (₹, the outer joins); a new one is named by both checks', () => {
  // every lesson and every question text, through the site's renderer; the only known extra glyphs are ₹ (CONTENT_GUIDE §3) and ⟕ ⟖ ⟗
  const all = nodeRun(['tools/check_math.js']);
  assert.equal(all.status, 0, all.stdout.slice(-3000));
  const glyphs = [...all.stdout.matchAll(/^MATH NOTE {2}"(.)" \(U\+[0-9A-F]{4,6}, /gm)].map(m => m[1]);
  assert.ok(glyphs.every(g => '₹⟕⟖⟗'.includes(g)), 'only known glyphs: ' + glyphs.join(' '));
  assert.ok(!/^MATH NOTE .*display formula/m.test(all.stdout), 'no display formula a \\qquad cannot split, in lessons or questions');
  withLesson('Join: $R ⟕ S$, rupees: $\\text{₹}40$, a new sign: $x ⋿ y$.\n', f => {
    const cm = nodeRun(['tools/check_math.js', f]);
    assert.equal(cm.status, 1, cm.stdout);
    assert.match(cm.stdout, /^MATH WARN {2}"⋿" \(U\+22FF\): KaTeX has no metrics/m);
    assert.match(cm.stdout, /^MATH NOTE {2}"⟕" \(U\+27D5, left outer join\)/m);
    assert.ok(!/No character metrics/.test(cm.stderr), 'KaTeX\'s own console line is replaced by the report');
    const lint = nodeRun(['tools/lint_content.js', f]);
    assert.match(lint.stdout, /^WARN .*KaTeX has no metrics for "⋿" \(U\+22FF\) in 1 formula/m);
    assert.ok(!/"⟕"|"₹"/.test(lint.stdout), 'the outer-join signs and ₹ are known');
  });
});

/* ---------------------------------------------------------------- P3-38 */
/** [width, height] in pixels from a PNG or WebP header (lossy VP8, lossless VP8L, extended VP8X), or null */
function imageSize(b) {
  if (b.length >= 24 && b.readUInt32BE(0) === 0x89504e47 && b.toString('ascii', 12, 16) === 'IHDR') return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
  const kind = b.toString('ascii', 12, 16);
  if (kind === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (kind === 'VP8 ' && b[23] === 0x9d && b[24] === 0x01 && b[25] === 0x2a) return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (kind === 'VP8L' && b[20] === 0x2f) { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >>> 14) & 0x3fff)]; }
  return null;
}


/* ---------------------------------------------------------------- P1-26 */
test('P1-26: the search index holds topic names and alphanumeric tokens; the vocabulary ships in the manifest', () => {
  need();
  const post = REG.search.pyq, stop = new Set(M.search.stop);      // the ICAI bank is empty for now: the postings are checked as far as they go
  for (const [w, ids] of Object.entries(post)) {
    assert.ok(!stop.has(w) && w.length >= 3, 'indexed: ' + w);
    assert.ok(ids.length <= 600 && ids.every(i => Number.isInteger(i) && i >= 0 && i < ROWS.length), w);
  }
  // a question is found by the words of its sub-topic's name (Round Robin questions by 'robin')
  const nodes = {};
  for (const s of M.syllabus.subjects) for (const t of s.topics) { nodes[t.id] = t; for (const n of t.subtopics) nodes[n.id] = n; }
  let pairs = 0, found = 0;
  ROWS.forEach((r, i) => { for (const id of [r[COL.topic], r[COL.subtopic]]) if (id && nodes[id]) for (const w of jsNorm(nodes[id].name).split(' ')) if (w.length >= 3 && !stop.has(w) && post[w]) { pairs++; if (post[w].includes(i)) found++; } });
  assert.equal(found, pairs, 'every topic-name word that is indexed lists its questions');
  // the vocabulary: aliases expand shorthand; subject codes and names stay subjects
  const A = M.search.alias;
  for (const s of M.syllabus.subjects) for (const k of [s.id, String(s.short || '').toLowerCase()]) assert.ok(!(jsNorm(k) in A), 'subject word aliased: ' + k);
  for (const k of ['cma', 'aud', 'fm', 'sm', 'set', 'q']) assert.ok(!(k in A), k);
  for (const [k, v] of Object.entries(A)) assert.ok(k === jsNorm(k) && Array.isArray(v) && v.length && v.every(x => typeof x === 'string' && x === jsNorm(x)), k);
  // the runtimes never skip a word the build indexes: their copies of the build's stop list are in the shipped one
  for (const f of ['app/js/core/pyqlib.js', 'app/js/core/search.js']) {
    const m = /BUILD_STOP = new Set\('([^']+)'/.exec(read(f));
    if (m) for (const w of m[1].split(' ')) assert.ok(stop.has(w), `${f} BUILD_STOP ${w}`);
  }
});

test('P1-26: the build normalises text exactly like the runtimes (tools/buildlib/textnorm.py = pyqlib.norm = search.norm)', () => {
  need();
  if (!PY) { console.log('       (skipped: no python3 on PATH)'); return; }
  const texts = ["SA 705: qualified opinion", "P/V ratio & BEP", 'EBIT-EPS indifference point', "Walter's model", 'Porter’s five forces', 'ABC, FSN & VED',
    'CARO 2020, clause 3(i)', '₹12,50,000 (cost of production)', 'naïve Bayes', 'Déjà vu (x+1)', 'LR(1) and LL(1)', 'B+ tree vs B-tree'];
  for (const q of Object.values(QS)) texts.push([q.stem || '', (q.options || []).join(' '), (q.group && q.group.context) || ''].join(' '));
  for (const l of M.lessons) texts.push(l.title, (l.tags || []).join(' '));
  // the texts go through a file, not stdin: a multi-megabyte `input` to execFileSync can stall on macOS under load (the child waits on a
  // stdin that is never closed), and a stalled test hangs every package's run
  const dir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'wp13-norm-')), inp = path.join(dir, 'texts.json');
  let out;
  try {
    fs.writeFileSync(inp, JSON.stringify(texts));
    out = cp.execFileSync(PY, ['-I', '-c', 'import sys, json; sys.path.insert(0, "tools"); from buildlib.textnorm import norm; ' +
      'print(json.dumps([norm(t) for t in json.load(open(sys.argv[1], encoding="utf-8"))]))', inp],
      { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 << 20, timeout: 120000 }).toString();
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  const py = JSON.parse(out), searchNorm = rt.GA.search.norm;
  const bad = texts.map((t, i) => [t, py[i], jsNorm(t), searchNorm(t)]).filter(([, p, j, s]) => p !== j || j !== s);
  assert.deepEqual(bad.slice(0, 3), [], `${bad.length} texts normalise differently`);
});

/* ---------------------------------------------------------------- P1-46 */
test('P1-46: manifest.exam ships content/exam.json, sorted and ISO-dated, matching the app fallback for CA Inter January 2027', () => {
  need();
  const src = JSON.parse(read('content/exam.json')).cycles;
  assert.ok(M.exam && Array.isArray(M.exam.cycles) && M.exam.cycles.length === src.length);
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  M.exam.cycles.forEach((c, i) => {
    for (const k of ['id', 'label', 'organiser', 'days', 'result', 'source', 'checked']) assert.deepEqual(c[k], src[i][k], c.id + ' ' + k);
    assert.ok(c.days.every(d => iso.test(d)) && c.days.join() === [...c.days].sort().join(), c.id + ' days sorted');
    assert.ok(Object.values(c.papers).every(pd => pd.every(d => c.days.includes(d))), c.id + ' paper days are exam days');
    assert.ok(c.result == null || c.result > c.days[c.days.length - 1]);
    assert.ok(/^https:\/\//.test(c.source) && c.note);
  });
  assert.ok(M.exam.cycles.every((c, i, a) => !i || a[i - 1].days[a[i - 1].days.length - 1] < c.days[0]), 'cycles sorted, not overlapping');
  const ctx = vm.createContext({ console });
  for (const f of ['app/js/core/util.js', 'app/js/core/srs.js', 'app/js/core/stats.js']) vm.runInContext(read(f), ctx, { filename: f });
  const fb = ctx.GA.stats.EXAM_FALLBACK;
  assert.ok(fb && fb.cycles && fb.cycles.length, 'GA.stats.EXAM_FALLBACK');
  {
    const a = fb.cycles[0], b = M.exam.cycles.find(c => c.id === a.id);
    assert.ok(b, 'the fallback cycle ships');
    for (const k of ['days', 'result', 'source', 'organiser', 'papers']) assert.deepEqual(a[k], b[k], 'EXAM_FALLBACK.' + k);
  }
  // ICAI's January 2027 announcement: Group II on 8, 10 and 12 January 2027 (Papers 4, 5, 6), 2 to 5 PM IST, reading time from 1.45 PM
  const jan = M.exam.cycles.find(c => c.id === 'icai-inter-2027-01');
  assert.deepEqual(jan.days, ['2027-01-08', '2027-01-10', '2027-01-12']);
  assert.deepEqual(jan.papers, { P4: ['2027-01-08'], P5: ['2027-01-10'], P6: ['2027-01-12'] });
  assert.deepEqual(jan.time, { start: '14:00', end: '17:00', reading: '13:45', zone: 'IST' });
});

/* ---------------------------------------------------------------- P1-58 */
test('P1-58: manifest.files hashes every shipped data file; manifest.ver is one stamp', () => {
  need();
  const F = M.files;
  assert.ok(F && typeof F === 'object' && /^[0-9a-f]{8}$/.test(M.ver));
  const walk = (dir, out) => { for (const f of fs.readdirSync(path.join(ROOT, dir))) { const rel = dir + '/' + f; if (f.startsWith('.')) continue;
    if (fs.statSync(path.join(ROOT, rel)).isDirectory()) walk(rel, out); else out.push(rel); } return out; };
  const data = walk('data', []).filter(f => f !== 'data/manifest.js');
  const sha8 = rel => crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex').slice(0, 8);
  for (const f of data) assert.equal(F[f], sha8(f), f);
  const listed = Object.keys(F).filter(f => f.startsWith('data/'));
  assert.equal(listed.length, data.length, 'no data file missing or extra');
  assert.ok(!('data/manifest.js' in F));
  for (const f of ['app/js/core/data.js', 'app/js/shell.js', 'app/css/base.css', 'vendor/katex/katex.min.js']) assert.ok(/^[0-9a-f]{8}$/.test(F[f] || ''), f);
  assert.ok(Object.values(F).every(v => /^[0-9a-f]{8}$/.test(v)));
});

/* ---------------------------------------------------------------- P1-60 */
test('P1-60: one file per lesson, data/lessons/<subject>/<id>.js, each registering just that lesson', () => {
  need();
  assert.equal(M.lessonFiles, 'split');
  const want = M.lessons.map(l => `data/lessons/${l.subject}/${l.id}.js`).sort();
  assert.deepEqual(LESSON_FILES.slice().sort(), want, 'no subject files, no strays');
  for (const l of M.lessons) {
    const rec = (REG.lesson || {})[l.id];
    assert.ok(rec && rec.id === l.id && rec.title === l.title && typeof rec.md === 'string' && rec.md.length > 500, l.id);
  }
  assert.equal(Object.keys(REG.lesson || {}).length, M.lessons.length);
  const card = Object.keys(REG.cards || {}), withCards = new Set(M.lessons.filter(l => l.cards).map(l => l.subject));
  assert.deepEqual(card.sort(), [...withCards].sort(), 'card files stay per subject (one per paper that has cards)');
});

/* ---------------------------------------------------------------- P3-51 */
test('P3-51: card-id aliases point from an edited card\'s old id to a current card; the ledger matches the shipped decks', () => {
  need();
  const ids = new Set(M.cards.map(c => c[0]));
  assert.ok(M.cardAliases && typeof M.cardAliases === 'object');
  for (const [a, b] of Object.entries(M.cardAliases)) { assert.ok(ids.has(b), b); assert.ok(!ids.has(a), a); }
  const led = JSON.parse(read('content/card-ids.json'));
  const byLesson = {};
  for (const [id, l] of M.cards) (byLesson[l] = byLesson[l] || []).push(id);
  for (const [l, list] of Object.entries(byLesson)) assert.deepEqual(led.lessons[l], list, l);
  for (const d of Object.values(REG.cards || {})) for (const c of d) assert.ok(ids.has(c.id));
});
