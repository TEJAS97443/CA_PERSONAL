/* GA.mapviz pure layout: squarified treemap, label fitting, layering, metro layout, edge routing, year binning + matrix, annotations,
   the syllabus model (recomputed from the raw catalogue and cross-checked with GA.insights), constellation layout. */
globalThis.window = globalThis.window || globalThis;
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const V = require('../app/js/core/mapviz.js');

/* the fixture catalogue (tests/fixtures/catalogue.js: the real CA syllabus, a lesson for every sub-topic, a small synthetic MCQ bank), built
   exactly as the app builds the shipped one, so the layouts are tested whatever the writers and the ICAI bank have shipped; D0 = shipped */
require('../data/boot.js');
const FX = require('./fixtures/catalogue.js');
const Data = require('../app/js/core/data.js');
const MF = FX.manifest();
globalThis.GAD.reg('manifest', 'main', MF);
const D = Data.buildCatalogue(JSON.parse(JSON.stringify(MF)));
const M0 = FX.real(), D0 = Data.buildCatalogue(JSON.parse(JSON.stringify(M0)));
let I = null;
try { I = require('../app/js/core/insights.js').build(D, MF.stats || null); } catch (e) { I = null; }
const sum = a => a.reduce((s, x) => s + x, 0);
const near = (a, b, eps, msg) => { if (Math.abs(a - b) > (eps == null ? 1e-6 : eps)) throw new Error(`${msg || ''} expected ${b}, got ${a}`); };
const overlap = (a, b) => Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 1e-6 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 1e-6;
const inside = (r, R, eps = 1e-6) => r.x >= R.x - eps && r.y >= R.y - eps && r.x + r.w <= R.x + R.w + eps && r.y + r.h <= R.y + R.h + eps;

/* ------------------------------------------------------------------ squarify */
test('squarify: rects tile the box exactly, areas are proportional, order is kept, zeros get no area', () => {
  const vals = [6, 6, 4, 3, 2, 2, 1, 0], R = { x: 10, y: 20, w: 600, h: 400 }, rs = V.squarify(vals, R), tot = sum(vals);
  assert.strictEqual(rs.length, vals.length);
  near(sum(rs.map(r => r.w * r.h)), R.w * R.h, 1e-6, 'total area');
  vals.forEach((v, i) => near(rs[i].w * rs[i].h, (v / tot) * R.w * R.h, 1e-6, 'area ' + i));
  assert.strictEqual(rs[7].w * rs[7].h, 0);
  rs.forEach(r => assert.ok(inside(r, R), 'inside'));
  for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) assert.ok(!overlap(rs[i], rs[j]), `rects ${i} and ${j} overlap`);
});
test('squarify: squarified aspect ratios stay reasonable on real subject marks', () => {
  const vals = D.subjects.map(s => sum(D.questions.filter(q => q.subject === s.id).map(q => q.marks)));
  const rs = V.squarify(vals, { x: 0, y: 0, w: 800, h: 550 });
  const worst = Math.max(...rs.map(r => Math.max(r.w / r.h, r.h / r.w)));
  assert.ok(worst < 4, 'worst aspect ' + worst);
});
test('squarify: empty or zero input returns zero rects', () => {
  assert.deepStrictEqual(V.squarify([], { x: 0, y: 0, w: 10, h: 10 }), []);
  V.squarify([0, 0], { x: 0, y: 0, w: 10, h: 10 }).forEach(r => assert.strictEqual(r.w * r.h, 0));
});

/* ------------------------------------------------------------------ labels */
test('fitLabel: wraps at spaces and hyphens, never cuts inside a word, never exceeds the box', () => {
  const o = { charW: 6, lineH: 15, padX: 8, padY: 6 };
  const a = V.fitLabel('Propositions, connectives and truth tables', 140, 60, o);
  assert.ok(a && a.full); a.lines.forEach(l => assert.ok(l.length <= Math.floor((140 - 16) / 6)));
  assert.strictEqual(a.lines.join(' '), 'Propositions, connectives and truth tables');
  const b = V.fitLabel('First-Come-First-Served', 90, 60, o);                 // hyphenated word wraps after a hyphen
  assert.ok(b && b.lines.length >= 2 && b.lines[0].endsWith('-'));
  assert.strictEqual(V.fitLabel('Asymptotic analysis', 60, 60, o), null);      // "Asymptotic" cannot fit: no garbled "Asymp…"
  const c = V.fitLabel('Shortest Job First and SRTF', 120, 28, o);           // one line: ellipsis after a whole word
  assert.ok(c && !c.full && c.lines.length === 1 && /…$/.test(c.lines[0]) && 'Shortest Job First and SRTF'.startsWith(c.lines[0].slice(0, -1)));
  assert.strictEqual(V.fitLabel('Anything', 20, 60, o), null);                 // too narrow
  assert.strictEqual(V.fitLabel('Anything', 200, 10, o), null);                // too short
});

test('fitLabel: balanced lines, "&" never starts a line, a single over-wide word gives no label (never "Minim…")', () => {
  const o = { charW: 6, lineH: 15, padX: 8, padY: 6 };
  assert.deepStrictEqual(V.fitLabel('Programming in C', 100, 60, o).lines, ['Programming', 'in C']);          // not "Programming in" / "C"
  const amp = V.fitLabel('Memory hierarchy & interfacing', 120, 80, o);
  assert.ok(amp.full && amp.lines.every(l => !/^&/.test(l)), JSON.stringify(amp.lines));
  assert.strictEqual(V.fitLabel('Minimization', 60, 60, o), null);
  assert.strictEqual(V.fitLabel('Undecidability', 70, 60, o), null);
  const c = V.fitLabel('Shortest Job First and SRTF', 140, 28, o);                                      // the ellipsis never follows "and"
  assert.ok(c && !/\band…$/.test(c.lines[0]), c.lines[0]);
});
test('fitLabel: o.measure (px widths) replaces the per-character estimate', () => {
  const wide = s => s.length * 10, o = { measure: wide, lineH: 15, padX: 0, padY: 0 };
  assert.deepStrictEqual(V.fitLabel('Round Robin', 120, 15, o).lines, ['Round Robin']);                // 110 px fits in 120
  assert.deepStrictEqual(V.fitLabel('Round Robin', 100, 15, Object.assign({ maxLines: 1 }, o)), { lines: ['Round…'], full: false });   // one line allowed
  assert.deepStrictEqual(V.fitLabel('Round Robin', 100, 30, o).lines, ['Round', 'Robin']);
});
test('shortForms: whole-word heads, longest first; cut lists keep an ellipsis', () => {
  assert.deepStrictEqual(V.shortForms('Concurrency & synchronization'), ['Concurrency']);
  assert.deepStrictEqual(V.shortForms('Numerical methods (older papers)'), ['Numerical methods']);
  assert.deepStrictEqual(V.shortForms('Root finding: bisection, Newton-Raphson, secant'), ['Root finding']);
  assert.deepStrictEqual(V.shortForms('Bubble, selection and insertion sort'), ['Bubble, selection…']);
  assert.deepStrictEqual(V.shortForms('Undecidability'), []);
  D.subjects.forEach(s => s.topics.forEach(t => t.subtopics.concat([t]).forEach(n => V.shortForms(n.name).forEach(f => {
    assert.ok(f.length < n.name.length, f);
    assert.ok(n.name.replace(/\s*\([^)]*\)/g, '').startsWith(f.replace(/…$/, '')), `${f} is not a prefix of ${n.name}`);
    assert.ok(!/\s(and|or|of|the|&)…?$/.test(f), 'ends in a connector: ' + f);
  }))));
});
test('shortName: compact subject names, unchanged when already short', () => {
  assert.strictEqual(V.shortName('Discrete Mathematics', 16), 'Discrete Maths');
  assert.strictEqual(V.shortName('Computer Organization & Architecture'), 'Computer Org.');
  assert.strictEqual(V.shortName('Programming & Data Structures'), 'Programming & DS');
  assert.strictEqual(V.shortName('Algorithms'), 'Algorithms');
  assert.strictEqual(V.shortName('Cost and Management Accounting'), 'Cost and Mgmt Acctg');
  assert.strictEqual(V.shortName('Financial Management'), 'Financial Mgmt');
  assert.strictEqual(V.shortName('Auditing and Ethics'), 'Auditing and Ethics');
  D.subjects.forEach(s => assert.ok(V.shortName(s.name).length <= 21, s.name));
});
test('labelFor: full name first, then a short form, then a 2-word ellipsis, else nothing', () => {
  const o = { charW: 6, lineH: 15, padX: 8, padY: 6, maxLines: 3 };
  assert.deepStrictEqual(V.labelFor('Cache memory', 120, 40, o), { lines: ['Cache memory'], text: 'Cache memory', full: true });
  const k = V.labelFor('Concurrency & synchronization', 100, 28, o);
  assert.strictEqual(k.text, 'Concurrency'); assert.strictEqual(k.full, false);
  assert.strictEqual(V.labelFor('Undecidability', 60, 60, o), null);
  const e = V.labelFor('Strongly connected components and cut vertices', 200, 28, o);
  assert.ok(e && e.lines.length === 1 && e.text.startsWith('Strongly connected'), JSON.stringify(e));
});

/* ------------------------------------------------------------------ graphs */
const E = [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'a', to: 'c' }, { from: 'c', to: 'd' }, { from: 'x', to: 'd' }];
test('layer: longest-path levels, roots at 0, every edge goes to a higher level', () => {
  const L = V.layer(['a', 'b', 'c', 'd', 'x'], E);
  assert.deepStrictEqual(L.level, { a: 0, b: 1, c: 2, d: 3, x: 0 });
  assert.strictEqual(L.levels, 4);
});
test('layer: cycle-safe (a cycle terminates and still yields finite levels)', () => {
  const L = V.layer(['p', 'q', 'r'], [{ from: 'p', to: 'q' }, { from: 'q', to: 'r' }, { from: 'r', to: 'p' }]);
  ['p', 'q', 'r'].forEach(id => assert.ok(Number.isFinite(L.level[id])));
  assert.ok(L.levels >= 1 && L.levels <= 3);
});
test('ancestors / descendants / topoOrder / longestChain', () => {
  const G = V.index(['a', 'b', 'c', 'd', 'x'], E);
  assert.deepStrictEqual([...V.ancestors(G, 'd')].sort(), ['a', 'b', 'c', 'x']);
  assert.deepStrictEqual([...V.descendants(G, 'b')].sort(), ['c', 'd']);
  const ord = V.topoOrder(['d', 'c', 'x', 'b', 'a'], E);
  E.forEach(e => assert.ok(ord.indexOf(e.from) < ord.indexOf(e.to), `${e.from} before ${e.to}`));
  assert.deepStrictEqual(V.longestChain(['a', 'b', 'c', 'd', 'x'], E), ['a', 'b', 'c', 'd']);
});

const M = V.model(D);
test('metroLayout (real data, one lane per topic): prerequisites sit left of dependents, stations never collide, lanes do not overlap', () => {
  ['cma', 'aud', 'fm'].forEach(sid => {
    const ids = D.lessons.filter(l => l.subject === sid).map(l => l.id), set = new Set(ids);
    const nodes = ids.map(id => ({ id, lane: D.lessonById[id].topic, rank: M.rankOf(id) }));
    const edges = M.edges.filter(e => set.has(e.from) && set.has(e.to));
    const lay = V.metroLayout(nodes, edges, { lanes: D.subjectById[sid].topics.map(t => t.id), colW: 160, rowH: 60 });
    edges.forEach(e => assert.ok(lay.pos[e.from].x < lay.pos[e.to].x, `${e.from} -> ${e.to}`));
    const seen = new Set(); ids.forEach(id => { const k = lay.pos[id].x + ':' + lay.pos[id].y; assert.ok(!seen.has(k), 'collision at ' + k); seen.add(k); });
    for (let i = 1; i < lay.lanes.length; i++) assert.ok(lay.lanes[i].y >= lay.lanes[i - 1].y + lay.lanes[i - 1].h, 'lanes overlap');
    ids.forEach(id => { const p = lay.pos[id], ln = lay.lanes.find(l => l.key === D.lessonById[id].topic); assert.ok(p.y >= ln.y && p.y <= ln.y + ln.h, 'station outside its lane'); });
    assert.ok(lay.width > 0 && lay.height > 0);
  });
});
test('metroLayout (every lesson, centred dense mode): every lesson placed once, no collisions, all edges left to right', () => {
  const nodes = D.lessons.map(l => ({ id: l.id, lane: 'all', rank: M.rankOf(l.id) }));
  const lay = V.metroLayout(nodes, M.edges, { lanes: ['all'], colW: 50, rowH: 15, align: 'center' });
  assert.strictEqual(Object.keys(lay.pos).length, D.lessons.length);
  const seen = new Set(); Object.values(lay.pos).forEach(p => { const k = p.x + ':' + p.y; assert.ok(!seen.has(k)); seen.add(k); });
  let back = 0; M.edges.forEach(e => { if (!(lay.pos[e.from].x < lay.pos[e.to].x)) back++; });
  assert.strictEqual(back, 0, 'edges pointing backwards');
});
test('metroLayout: a preset level is respected (used to pull outside prerequisites next to their dependents)', () => {
  const lay = V.metroLayout([{ id: 'a', lane: 'L', rank: 0 }, { id: 'b', lane: 'L', rank: 1 }, { id: 'c', lane: 'X', rank: 2, level: 1 }], [{ from: 'a', to: 'b' }, { from: 'b', to: 'z' }], { lanes: ['X', 'L'] });
  assert.strictEqual(lay.pos.c.level, 1);
});
test('route: straight run on a free row, detour when a station is in the way, curve between rows', () => {
  const o = { r: 6, colW: 160, labelW: 110, rowH: 60 };
  assert.ok(/^M[\d.]+,100H[\d.]+$/.test(V.route({ x: 100, y: 100, level: 0 }, { x: 420, y: 100, level: 2 }, o)));
  const det = V.route({ x: 100, y: 100, level: 0 }, { x: 420, y: 100, level: 2 }, Object.assign({ blocked: () => true }, o));
  assert.ok(det.includes('C') && det.includes(',90'), 'detours through the corridor above');
  const s = V.route({ x: 100, y: 100, level: 0 }, { x: 260, y: 220, level: 1 }, o);
  assert.ok(s.startsWith('M106,100') && s.includes(',220') && /254(,220)?$/.test(s));
});
test('spatial: nearest rect in each direction', () => {
  const rs = [{ x: 0, y: 0, w: 10, h: 10 }, { x: 20, y: 0, w: 10, h: 10 }, { x: 0, y: 20, w: 10, h: 10 }, { x: 20, y: 20, w: 10, h: 10 }];
  assert.strictEqual(V.spatial(rs, 0, 'right'), 1); assert.strictEqual(V.spatial(rs, 0, 'down'), 2);
  assert.strictEqual(V.spatial(rs, 3, 'left'), 2); assert.strictEqual(V.spatial(rs, 3, 'up'), 1); assert.strictEqual(V.spatial(rs, 0, 'left'), -1);
});

/* ------------------------------------------------------------------ years */
test('binYears: covers every year once; the most recent bin is full', () => {
  const ys = Array.from({ length: 20 }, (_, i) => 2007 + i);
  const b = V.binYears(ys, 4);
  assert.strictEqual(b.length, 5); assert.deepStrictEqual(b[4], [2023, 2024, 2025, 2026]);
  assert.deepStrictEqual(b.flat(), ys);
  const c = V.binYears(ys.slice(0, 18), 4);
  assert.strictEqual(c[0].length, 2); assert.strictEqual(c[c.length - 1].length, 4);
  assert.deepStrictEqual(V.binYears([2009, 2007, 2008], 1), [[2007], [2008], [2009]]);
});
test('trendSplit: first half vs second half, the middle point of an odd series is ignored', () => {
  const t = V.trendSplit([1, 2, 100, 5, 6]);
  near(t.first, 1.5); near(t.second, 5.5); near(t.delta, 4);
  assert.strictEqual(V.trendSplit([3]).delta, 0);
});
const PAPERS = [{ id: 'p1', year: 2010, marks: 100, ga: 10 }, { id: 'p2a', year: 2011, marks: 100, ga: 10 }, { id: 'p2b', year: 2011, marks: 100, ga: 10 }, { id: 'p3', year: 2012, marks: 150, ga: 0 }];
const QS = [{ year: 2010, marks: 2, s: 'A' }, { year: 2011, marks: 2, s: 'A' }, { year: 2011, marks: 1, s: 'A' }, { year: 2011, marks: 1, s: 'A' }, { year: 2012, marks: 3, s: 'A' }, { year: 2012, marks: 1, s: 'B' }];
test('yearMatrix: multi-paper years are averaged, share metric divides by the papers’ marks, n/a cells drop out', () => {
  const mx = V.yearMatrix(QS, PAPERS, [{ key: 'A' }, { key: 'B' }], q => q.s, {});
  const A = mx.rows[0];
  assert.deepStrictEqual(A.cells.map(c => c.v), [2, 2, 3]);                     // 2011: (2+1+1) / 2 papers
  near(A.avg, 9 / 4); assert.strictEqual(A.n, 5); assert.strictEqual(A.asked, 3);
  const sh = V.yearMatrix(QS, PAPERS, [{ key: 'A' }], q => q.s, { metric: 'share' });
  near(sh.rows[0].cells[2].v, 2);                                               // 3 of 150 marks
  near(sh.rows[0].avg, (100 * 9) / 450);
  const na = V.yearMatrix(QS, PAPERS, [{ key: 'B' }], q => q.s, { na: (r, c) => c.list.every(p => !p.ga) });
  assert.strictEqual(na.rows[0].cells[2].na, false, 'a cell with questions is never n/a');
  const na2 = V.yearMatrix(QS.filter(q => q.s === 'A'), PAPERS, [{ key: 'B' }], q => q.s, { na: (r, c) => c.list.every(p => !p.ga) });
  assert.strictEqual(na2.rows[0].cells[2].na, true); assert.strictEqual(na2.rows[0].cells[2].v, null); assert.strictEqual(na2.rows[0].span, 2);
});
test('yearMatrix: the brushed range sets inRange, the row averages and the trend', () => {
  const mx = V.yearMatrix(QS, PAPERS, [{ key: 'A' }], q => q.s, { from: 2011, to: 2012 });
  assert.deepStrictEqual(mx.cols.map(c => c.inRange), [false, true, true]);
  near(mx.rows[0].avg, 7 / 3); assert.strictEqual(mx.rows[0].span, 2);
  const b = V.yearMatrix(QS, PAPERS, [{ key: 'A' }], q => q.s, { bin: 2 });
  assert.strictEqual(b.cols.length, 2); assert.deepStrictEqual(b.cols[1].years, [2011, 2012]); near(b.rows[0].cells[1].v, 7 / 3);
});
test('yearMatrix on the real bank: cells add back up to every subject’s marks and match GA.insights.yearSubject()', () => {
  const rows = D.subjects.map(s => ({ key: s.id, node: M.nodes[s.id] }));
  const mx = V.yearMatrix(D.questions, D.papers, rows, q => q.subject, { na: (r, c) => r.key === 'ga' && c.list.every(p => !p.ga) });
  mx.rows.forEach(r => assert.strictEqual(sum(r.cells.map(c => c.marks)), M.nodes[r.key].marks, r.key));
  assert.strictEqual(sum(mx.cols.map(c => c.papers)), D.papers.length);
  if (I) {
    const ys = I.yearSubject();
    mx.rows.forEach((r, si) => r.cells.forEach((c, yi) => { if (!c.na) near(c.v, ys.cells[yi][ys.subjects.indexOf(r.key)], 0.006, `${r.key} ${mx.cols[yi].key}`); }));
    mx.rows.forEach(r => near(r.avg, r.marks / D.papers.length, 0.006, 'per paper ' + r.key));   // the range average over all years (insights' marksPerPaper is the paper's fixed marks)
  }
});
/* ------------------------------------------------------------------ audit P0-11: the exam map's findings do not depend on the screen width */
const YEARS = Array.from(new Set(D.papers.map(p => p.year))).sort((a, b) => a - b), Y0 = YEARS[0], Y1 = YEARS[YEARS.length - 1];
const RANGES = [[Y0, Y1], [Y1, Y1], [Y0, Y0]];
const examRows = by => (by === 'subject' ? M.root.children : M.nodes.cma.children.filter(t => t.kind === 'topic')).map(n => ({ key: n.id, name: n.name, node: n }));
const examKey = by => (by === 'subject' ? q => q.subject : q => q.topic);
const examMx = (by, o) => V.yearMatrix(D.questions, D.papers, examRows(by), examKey(by), Object.assign({ has: (r, p) => V.hasSection(r.node.subject, p) }, o));
const noteKey = a => JSON.stringify({ kind: a.kind, key: a.key || null, keys: a.keys || null, value: Math.round(a.value * 1e6) / 1e6, halves: a.halves || null, of: a.of || null });
const rowKey = r => JSON.stringify({ k: r.key, marks: r.marks, n: r.n, avg: Math.round(r.avg * 1e9), asked: r.asked, span: r.span, last: r.last, d: Math.round(r.trend.delta * 1e9), s: r.series.map(v => (v == null ? null : Math.round(v * 1e9))) });

test('binYears with a range: every year once, no bin straddles the range, short bins only at an edge', () => {
  const ys = Array.from({ length: 20 }, (_, i) => 2007 + i);
  assert.deepStrictEqual(V.binYears(ys, 4, { from: 2007, to: 2026 }), V.binYears(ys, 4), 'the full range bins as before');
  for (const size of [2, 3, 4]) for (const [from, to] of [[2022, 2026], [2017, 2026], [2010, 2015], [2013, 2021], [2007, 2007], [2026, 2026]]) {
    const b = V.binYears(ys, size, { from, to });
    assert.deepStrictEqual(b.flat(), ys, `${size} ${from}-${to}: every year once, in order`);
    b.forEach(bin => { assert.ok(bin.length >= 1 && bin.length <= size); assert.ok(bin.every(y => y >= from && y <= to) || bin.every(y => y < from || y > to), `${bin} straddles ${from}-${to}`); });
    const inside = b.filter(x => x[0] >= from && x[0] <= to), before = b.filter(x => x[0] < from), after = b.filter(x => x[0] > to);
    inside.slice(1).forEach(x => assert.strictEqual(x.length, size, 'inside the range only the oldest bin may be short'));
    before.slice(1).forEach(x => assert.strictEqual(x.length, size, 'before the range only the outer bin may be short'));
    after.slice(0, -1).forEach(x => assert.strictEqual(x.length, size, 'after the range only the outer bin may be short'));
  }
});
test('P0-11 exam map: notes, per-paper column, trends and sparklines are identical at bin 1, 2 and 4', () => {
  for (const by of ['subject', 'topic']) for (const metric of ['marks', 'share']) for (const [from, to] of RANGES) {
    const one = examMx(by, { bin: 1, from, to, metric }), notes1 = V.annotate(examMx(by, { bin: 1, from, to, metric: 'share' }), { minDelta: 0.5 }).map(noteKey);
    for (const bin of [2, 4]) {
      const mx = examMx(by, { bin, from, to, metric }), tag = `${by} ${metric} ${from}-${to} bin ${bin}`;
      assert.deepStrictEqual(mx.rows.map(rowKey), one.rows.map(rowKey), tag + ': row numbers');
      assert.deepStrictEqual(V.annotate(examMx(by, { bin, from, to, metric: 'share' }), { minDelta: 0.5 }).map(noteKey), notes1, tag + ': notes');
      mx.cols.forEach(c => assert.ok(c.years.every(y => y >= from && y <= to) === c.inRange && c.years.some(y => y >= from && y <= to) === c.inRange, tag + ': a bin is wholly in or out of the range'));
      mx.rows.forEach(r => assert.strictEqual(sum(r.cells.map(c => c.marks)), sum(one.rows.find(x => x.key === r.key).cells.map(c => c.marks)), tag + ': binned cells keep every mark'));
    }
  }
});
test('annotate: rising / falling / every year / gone quiet are computed from the matrix and never repeat a row', () => {
  const papers = Array.from({ length: 8 }, (_, i) => ({ id: 'p' + i, year: 2010 + i, marks: 100, ga: 10 }));
  const qs = [];
  for (let i = 0; i < 8; i++) { qs.push({ year: 2010 + i, marks: i < 4 ? 1 : 5, s: 'UP' }); qs.push({ year: 2010 + i, marks: i < 4 ? 6 : 2, s: 'DOWN' }); if (i < 3) qs.push({ year: 2010 + i, marks: 2, s: 'OLD' }); }
  const mx = V.yearMatrix(qs, papers, [{ key: 'UP' }, { key: 'DOWN' }, { key: 'OLD' }], q => q.s, { metric: 'share' });
  const a = V.annotate(mx), by = k => a.find(x => x.kind === k);
  assert.strictEqual(by('up').key, 'UP'); near(by('up').value, 4); assert.deepStrictEqual(by('up').halves, [[2010, 2013], [2014, 2017]]);
  assert.strictEqual(by('every').value, 2); assert.deepStrictEqual(by('every').keys.sort(), ['DOWN', 'UP']);
  assert.strictEqual(by('quiet').key, 'OLD'); assert.strictEqual(by('quiet').value, 2012);
  assert.strictEqual(by('down').key, 'DOWN');
  const keys = a.filter(x => x.key).map(x => x.key); assert.strictEqual(new Set(keys).size, keys.length);
});

/* ------------------------------------------------------------------ the syllabus model */
test('model: every count is recomputed from the raw catalogue', () => {
  assert.strictEqual(M.root.marks, sum(D.questions.map(q => q.marks)));
  assert.strictEqual(M.root.pyqs, D.questions.length);
  assert.strictEqual(M.root.lessons, D.lessons.length);
  assert.strictEqual(M.root.minutes, sum(D.lessons.map(l => l.minutes || 0)));
  assert.strictEqual(M.root.children.length, D.subjects.length);
  M.root.children.forEach(s => {
    assert.strictEqual(s.marks, sum(D.questions.filter(q => q.subject === s.id).map(q => q.marks)), s.id);
    assert.strictEqual(s.marks, sum(s.children.map(t => t.marks)), 'subject = sum of topics ' + s.id);
    s.children.forEach(t => {
      assert.strictEqual(t.marks, sum(D.questions.filter(q => q.topic === t.id).map(q => q.marks)), t.id);
      assert.strictEqual(t.marks, sum(t.children.map(n => n.marks)), 'topic = sum of leaves ' + t.id);
      assert.strictEqual(t.lessons, D.lessons.filter(l => l.topic === t.id).length);
    });
    assert.ok(s.papers.size <= M.papersFor(s));
  });
  assert.strictEqual(M.edges.length, D.lessons.reduce((n, l) => n + new Set((l.needs || []).filter(x => D.lessonById[x] && x !== l.id)).size, 0));
});
test('model: per-paper averages divide by the papers, agree with GA.insights, and every node counts its syllabus sub-topics', () => {
  assert.strictEqual(M.gaPapers, 0, 'ICAI papers have no General Aptitude section');
  M.root.children.forEach(s => near(M.perPaper(s), s.marks / D.papers.length, 1e-9, s.id));
  if (I) M.root.children.forEach(s => { assert.strictEqual(s.pyqs, I.subject(s.id).pyqs); assert.strictEqual(s.paperMarks, I.subject(s.id).paperMarks); });
  M.root.children.forEach(s => { assert.strictEqual(s.subs, D.subjectById[s.id].topics.reduce((n, t) => n + t.subtopics.length, 0), s.id + ' sub-topics'); assert.strictEqual(M.value(s, 'subs'), s.subs); });
  assert.strictEqual(M.root.subs, Object.values(D.nodes).filter(n => n.kind === 'sub').length);
  assert.strictEqual(M.root.paperMarks, 300);
  assert.strictEqual(V.defSize(M), 'marks', 'with a bank the map sizes by marks');
  const M0 = V.model(D0);
  assert.strictEqual(V.defSize(M0), D0.questions.length ? 'marks' : 'subs', 'without one, by sub-topics');
  if (!D0.questions.length) { assert.strictEqual(V.okSize(M0, 'marks'), 'subs'); assert.strictEqual(V.okSize(M0, 'pyqs'), 'subs'); assert.strictEqual(V.okSize(M0, 'lessons'), 'lessons'); }
});
test('linksOf: subject links aggregate every cross-subject "needs" edge', () => {
  const L = V.linksOf(M, null);
  const cross = M.edges.filter(e => D.lessonById[e.from].subject !== D.lessonById[e.to].subject);
  assert.strictEqual(sum(L.map(l => l.w)), cross.length);
  L.forEach(l => assert.ok(l.a < l.b && M.nodes[l.a] && M.nodes[l.b]));
  const T = V.linksOf(M, 'cma');
  T.forEach(l => { assert.strictEqual(M.nodes[l.a].subject, 'cma'); assert.strictEqual(M.nodes[l.b].kind, 'topic'); });
});
test('tmLayout: every cell sits inside the canvas and inside its group; siblings never overlap', () => {
  [[M.root, 'marks'], [M.nodes.cma, 'marks'], [M.nodes['cma.mc'], 'marks'], [M.root, 'lessons'], [M.nodes.aud, 'minutes'], [M.root, 'subs'], [M.nodes.fm, 'subs']].forEach(([V0, size]) => {
    const W = 800, H = 550, items = V.tmLayout(M, V0, size, W, H, {});
    const box = { x: 0, y: 0, w: W, h: H }, byId = {};
    items.forEach(it => { byId[it.node.id] = it; assert.ok(inside(it.rect, box), 'outside canvas ' + it.node.id); });
    items.filter(it => it.parent).forEach(it => assert.ok(inside(it.rect, byId[it.parent].rect), 'outside its group ' + it.node.id));
    const top = items.filter(it => !it.parent);
    for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) assert.ok(!overlap(top[i].rect, top[j].rect));
    assert.ok(items.every(it => M.value(it.node, size) > 0), 'no zero-size cells');
  });
});

/* ------------------------------------------------------------------ constellation */
test('constellation: deterministic, inside the box, and stars never overlap', () => {
  const nodes = M.root.children.map(s => { const r = 12 + 20 * Math.sqrt(s.marks / 405); return { id: s.id, r, R: V.satellites(r, s.children.map(() => 2), { gap: 4 }).ext }; });
  const links = V.linksOf(M, null), o = { w: 560, h: 440, pad: 8, seed: 11 };
  const A = V.constellation(nodes, links, o), B = V.constellation(nodes, links, o);
  assert.deepStrictEqual(A, B);
  nodes.forEach(n => { const p = A[n.id]; assert.ok(p.x - n.R >= o.pad - 1 && p.x + n.R <= o.w - o.pad + 1 && p.y - n.R >= o.pad - 1 && p.y + n.R <= o.h - o.pad + 1, 'out of bounds ' + n.id); });
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i], b = nodes[j], d = Math.hypot(A[a.id].x - A[b.id].x, A[a.id].y - A[b.id].y);
    assert.ok(d >= a.R + b.R - 1.5, `${a.id} overlaps ${b.id} (${d.toFixed(1)} < ${(a.R + b.R).toFixed(1)})`);
  }
});
test('constellation with label boxes: names under the discs never overlap and stay inside', () => {
  const nodes = M.root.children.map(s => { const r = 6 + 12 * Math.sqrt(s.marks / 405), half = Math.max(r + 1, (V.shortName(s.name).length * 6.3) / 2 / 1.6 + 3);
    return { id: s.id, r, box: { l: half, r: half, t: r + 1, b: r + 5 + 26 + 2 }, R: Math.max(half, r + 15) }; });
  const links = V.linksOf(M, null), o = { w: 640, h: 460, pad: 6, seed: 11, gap: 5 };
  const P = V.constellation(nodes, links, o);
  assert.deepStrictEqual(P, V.constellation(nodes, links, o));
  assert.strictEqual(V.layoutClash(P, nodes, { w: o.w, h: o.h, pad: o.pad - 1, gap: 2 }), 0);
});
test('layoutClash: counts overlapping footprints and nodes outside the box', () => {
  const n = [{ id: 'a', r: 10 }, { id: 'b', r: 10 }, { id: 'c', r: 10, box: { l: 30, r: 30, t: 10, b: 30 } }];
  assert.strictEqual(V.layoutClash({ a: { x: 20, y: 20 }, b: { x: 60, y: 20 }, c: { x: 120, y: 60 } }, n, { w: 200, h: 120 }), 0);
  assert.strictEqual(V.layoutClash({ a: { x: 20, y: 20 }, b: { x: 30, y: 20 }, c: { x: 120, y: 60 } }, n, { w: 200, h: 120 }), 1);
  assert.strictEqual(V.layoutClash({ a: { x: 20, y: 20 }, b: { x: 60, y: 20 }, c: { x: 185, y: 60 } }, n, { w: 200, h: 120 }), 1);
});
test('satellites: golden-angle spiral outside the star, halo covers every satellite', () => {
  const s = V.satellites(20, [3, 2, 2, 1.5, 1], { gap: 4 });
  assert.strictEqual(s.list.length, 5);
  s.list.forEach(p => { const d = Math.hypot(p.x, p.y); assert.ok(d - p.r >= 20 + 4 - 0.1 && d + p.r <= s.ext + 0.11); });
});
test('cleanState: drops defaults and empties so URLs stay short', () => {
  assert.deepStrictEqual(V.cleanState({ lens: 'syllabus', size: '', view: 'map', subject: '', node: 'cma.mc', only: '', vals: 1 }), { node: 'cma.mc', vals: 1 });
  assert.deepStrictEqual(V.cleanState({ lens: 'syllabus', size: 'subs', view: 'map' }), { size: 'subs' }, 'a chosen size stays in the URL');
  assert.deepStrictEqual(V.cleanState({ lens: 'exam', by: 'topic', subject: 'aud', from: 2025, metric: 'marks' }), { lens: 'exam', subject: 'aud', by: 'topic', from: 2025 });
});

/* ------------------------------------------------------------------ series colours (--viz-* tokens, one per subject family) */
test('seriesOf: every paper gets its own --viz token (Paper 6A and 6B differ), named in the legend', () => {
  const tok = D.subjects.map(s => V.seriesOf(s.id));
  tok.forEach((t, i) => assert.ok(/^[a-h]$/.test(t), D.subjects[i].id + ' -> ' + t));
  assert.equal(new Set(tok).size, D.subjects.length, 'one colour per paper');
  D.subjects.forEach(s => assert.ok(/^Paper \d[AB]? · /.test(V.SERIES_NAME[V.seriesOf(s.id)]) && V.SERIES_NAME[V.seriesOf(s.id)].includes(s.name), s.id + ' legend name'));
  assert.equal(V.seriesOf('nope'), 'a', 'unknown ids fall back to the primary series');
  const M = V.model(D);
  Object.values(M.nodes).forEach(n => { if (n.kind !== 'root') assert.equal(n.sc, V.seriesOf(n.subject), n.id); });
  Object.keys(V.SERIES_NAME).forEach(k => assert.ok(/^[a-h]$/.test(k) && V.SERIES_NAME[k]));
});

/* ------------------------------------------------------------------ audit P1-02: the map's subject and topic panels list lessons in I.order */
test('P1-02 map panels: subject and topic lesson lists follow the one learning order (I.order), never a second topological order', () => {
  if (!I) return;
  let topics = 0;
  M.root.children.forEach(s => {
    const ord = I.order(s.id);
    assert.deepStrictEqual(V.panelOrder(M, s, I), ord.filter(id => s.lessonIds.includes(id)), s.id);
    s.children.filter(t => t.kind === 'topic' && t.lessonIds.length).forEach(t => {
      topics++;
      const got = V.panelOrder(M, t, I);
      assert.deepStrictEqual(got, ord.filter(id => t.lessonIds.includes(id)), t.id);
      const pos = Object.fromEntries(got.map((id, i) => [id, i]));
      got.forEach((id, i) => (D.lessonById[id].needs || []).forEach(p => { if (pos[p] != null) assert.ok(pos[p] < i, `${t.id}: ${id} after ${p}`); }));
    });
  });
  assert.ok(topics >= 30, topics + ' topic panels');
  const noI = V.panelOrder(M, M.nodes.cma, { order: null });                      // without the insights: the old order, still prerequisites-first
  assert.strictEqual(noI.length, M.nodes.cma.lessonIds.length);
});

/* ------------------------------------------------------------------ audit WP5 part B */
test('P2-11 prerequisite lens: opens on the current subject (focus, else the shared next step), a picked lesson opens its own subject, all = explicit', () => {
  const M = V.model(D), blank = { profile: {} };
  assert.strictEqual(V.prereqStart(M, {}, blank, { subject: 'cma' }), 'cma', 'fresh: the shared next step names the paper');
  assert.strictEqual(V.prereqStart(M, {}, { profile: { focus: 'aud' } }, { subject: 'cma' }), 'aud', 'profile.focus wins');
  assert.strictEqual(V.prereqStart(M, {}, { profile: { focus: 'nope' } }, () => ({ subject: 'fm' })), 'fm', 'an unknown focus is ignored');
  assert.strictEqual(V.prereqStart(M, { subject: 'sm' }, { profile: { focus: 'aud' } }, null), 'sm', 'the URL subject wins');
  assert.strictEqual(V.prereqStart(M, { subject: 'all' }, { profile: { focus: 'aud' } }, { subject: 'cma' }), '', "subject=all is the explicit 'All papers'");
  const l = D.lessons.find(x => x.subject === 'fm');
  assert.strictEqual(V.prereqStart(M, { node: l.id }, { profile: { focus: 'aud' } }, null), 'fm', 'a picked lesson opens on its own paper');
  const t = D.subjects.find(x => x.id === 'sm').topics[0];
  assert.strictEqual(V.prereqStart(M, { node: t.id }, blank, null), 'sm', 'a topic opens on its paper');
  assert.strictEqual(V.prereqStart(M, {}, blank, null), '', 'nothing next: all subjects');
  assert.strictEqual(V.prereqStart(M, { subject: 'all' }, blank, null), '');
  assert.ok(V.cleanState({ lens: 'prereq', subject: 'all' }).subject === 'all', 'the explicit choice survives in the URL');
});

test('P2-06 map tints: the rendered fills of any two data series differ by ΔE2000 >= 8 at every pair of tint steps, labels stay legible (light and dark)', () => {
  const fs = require('fs'), path = require('path'), css = f => fs.readFileSync(path.join(__dirname, '..', 'app', 'css', f), 'utf8');
  const base = css('base.css'), map = css('map.css');
  const block = re => { const m = re.exec(base), t = {}; m[1].replace(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi, (x, k, v) => { t[k] = v.trim(); return x; }); return t; };
  const light = block(/:root\s*\{([\s\S]*?)\n\}/), dark = Object.assign({}, light, block(/\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/));
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lab = rgb => { const [r, g, b] = rgb.map(lin), f = t => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
    const X = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047, Y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b, Z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / 1.08883;
    return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]; };
  const rad = d => (d * Math.PI) / 180;
  const de = (x, y) => {   // CIEDE2000 on two sRGB triplets
    const [L1, a1, b1] = lab(x), [L2, a2, b2] = lab(y), Cb = (Math.hypot(a1, b1) + Math.hypot(a2, b2)) / 2, G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
    const p1 = (1 + G) * a1, p2 = (1 + G) * a2, C1 = Math.hypot(p1, b1), C2 = Math.hypot(p2, b2), hh = (u, v) => { const h = (Math.atan2(v, u) * 180) / Math.PI; return h < 0 ? h + 360 : h; };
    const h1 = hh(p1, b1), h2 = hh(p2, b2); let dh = h2 - h1; if (C1 * C2 === 0) dh = 0; else if (dh > 180) dh -= 360; else if (dh < -180) dh += 360;
    const dH = 2 * Math.sqrt(C1 * C2) * Math.sin(rad(dh / 2)), Lb = (L1 + L2) / 2, Cp = (C1 + C2) / 2;
    let hb = h1 + h2; if (C1 * C2 !== 0) hb = Math.abs(h1 - h2) > 180 ? (h1 + h2 + (h1 + h2 < 360 ? 360 : -360)) / 2 : (h1 + h2) / 2;
    const T = 1 - 0.17 * Math.cos(rad(hb - 30)) + 0.24 * Math.cos(rad(2 * hb)) + 0.32 * Math.cos(rad(3 * hb + 6)) - 0.2 * Math.cos(rad(4 * hb - 63));
    const th = 30 * Math.exp(-(((hb - 275) / 25) ** 2)), RC = 2 * Math.sqrt(Cp ** 7 / (Cp ** 7 + 25 ** 7)), SL = 1 + (0.015 * (Lb - 50) ** 2) / Math.sqrt(20 + (Lb - 50) ** 2), SC = 1 + 0.045 * Cp, SH = 1 + 0.015 * Cp * T;
    const dC = C2 - C1, dL = L2 - L1; return Math.sqrt((dL / SL) ** 2 + (dC / SC) ** 2 + (dH / SH) ** 2 - Math.sin(rad(2 * th)) * RC * (dC / SC) * (dH / SH)); };
  const lum = rgb => { const [r, g, b] = rgb.map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (x, y) => { const a = lum(x), b = lum(y); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
  assert.ok(Math.abs(de([255, 255, 255], [0, 0, 0]) - 100) < 0.01 && de([36, 80, 224], [36, 80, 224]) === 0, 'the ΔE helper');
  /* the tint steps exactly as the cascade applies them: .tm (and its dark twin) set the defaults on the map, a .tm-n[style*="viz-x"] rule sets a
     series on the cell itself (so it also wins in dark unless a [data-theme="dark"] .tm-n rule resets it) */
  const steps = s => s.match(/--tmA:\s*([\d.]+)%;\s*--tmB:\s*([\d.]+)%;\s*--tmC:\s*([\d.]+)%/).slice(1).map(Number);
  const defL = steps(/\n\.tm \{[^}]*\}/.exec(map)[0]), defD = steps(/\[data-theme="dark"\] \.tm \{[^}]*\}/.exec(map)[0]);
  assert.match(/\n\.tm \{[^}]*\}/.exec(map)[0], /--tmBase: var\(--mv-card, var\(--surface\)\)/); assert.match(/\[data-theme="dark"\] \.tm \{[^}]*\}/.exec(map)[0], /--tmBase: var\(--surface-2\)/);
  const per = { light: {}, dark: {} };
  map.replace(/^(\[data-theme="dark"\] )?\.tm-n((?::is\([^)]*\))|(?:\[style\*="viz-[a-h]"\]))\s*\{([^}]*)\}/gm, (x, dk, sel, body) => {
    if (!/--tmA/.test(body)) return x;
    (sel.match(/viz-([a-h])/g) || []).forEach(v => { const k = v.slice(4); if (dk) per.dark[k] = steps(body); else { per.light[k] = steps(body); } });
    return x;
  });
  assert.ok(Object.keys(per.light).length >= 2 && Object.keys(per.dark).length >= 3, 'per-series rules found: ' + JSON.stringify(per));
  const mix = (c, p, b) => c.map((v, i) => (v * p) / 100 + b[i] * (1 - p / 100));
  for (const [name, t, def, bse] of [['light', light, defL, light['--surface']], ['dark', dark, defD, dark['--surface-2']]]) {
    const fills = {};
    'abcdefgh'.split('').forEach(k => { const st = (name === 'dark' && per.dark[k]) || per.light[k] || def; fills[k] = st.map(p => mix(hex(t['--viz-' + k]), p, hex(bse))); });
    const ks = Object.keys(fills);
    for (let i = 0; i < ks.length; i++) for (let j = i + 1; j < ks.length; j++) for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
      const d = de(fills[ks[i]][a], fills[ks[j]][b]);
      assert.ok(d >= 8, `${name}: viz-${ks[i]} step ${'ABC'[a]} / viz-${ks[j]} step ${'ABC'[b]} ΔE2000 ${d.toFixed(2)}`);
    }
    ks.forEach(k => fills[k].forEach((f, s) => {
      assert.ok(ratio(hex(t['--ink']), f) >= 7, `${name}: --ink label on viz-${k} step ${'ABC'[s]} ${ratio(hex(t['--ink']), f).toFixed(2)}:1`);
      assert.ok(ratio(hex(t['--ink-2']), f) >= 4.5, `${name}: --ink-2 value on viz-${k} step ${'ABC'[s]} ${ratio(hex(t['--ink-2']), f).toFixed(2)}:1`);
    }));
  }
});

test('map panel: a one-lesson topic links its own lesson when the coral (the subject\'s next step) is elsewhere, and never twice', () => {
  const saved = { stats: GA.stats, store: GA.store };
  try {
    GA.store = { state: { lessons: {}, q: {}, profile: {} } };
    const ones = Object.values(M.nodes).filter(n => n.kind === 'topic' && n.lessonIds && n.lessonIds.length === 1);
    assert.ok(ones.length >= 3, 'one-lesson topics: ' + ones.map(n => n.id).join(' '));
    const pops = h => (h.match(/class="btn pop/g) || []).length, links = (h, id) => (h.match(new RegExp(`href="#/l/${id.replace(/\./g, '\\.')}"`, 'g')) || []).length;
    ones.forEach(t => {
      const own = t.lessonIds[0], other = D.lessons.find(l => l.subject === t.subject && l.id !== own);
      GA.stats = { nextStep: () => ({ kind: 'lesson', id: other.id, label: 'Start here', title: other.title, href: '#/l/' + other.id, minutes: other.minutes }) };
      let h = V.panelHtml(M, t, 'marks');
      assert.strictEqual(pops(h), 1, t.id + ': one coral'); assert.strictEqual(links(h, own), 1, t.id + ': its own lesson is linked once'); assert.ok(links(h, other.id) >= 1, t.id + ': the coral');
      GA.stats = { nextStep: () => ({ kind: 'lesson', id: own, label: 'Start here', title: D.lessonById[own].title, href: '#/l/' + own, minutes: 10 }) };
      h = V.panelHtml(M, t, 'marks');
      assert.strictEqual(pops(h), 1, t.id + ': one coral'); assert.strictEqual(links(h, own), 1, t.id + ': the coral is its lesson, no second row');
      GA.stats = { nextStep: () => null };                                    // the subject is finished: the coral offers its PYQs, the row stays
      GA.store.state.lessons[own] = { done: true };
      h = V.panelHtml(M, t, 'marks');
      assert.strictEqual(pops(h), 1, t.id + ': one coral when done'); assert.strictEqual(links(h, own), 1, t.id + ': the done lesson is still linked');
      delete GA.store.state.lessons[own];
    });
    delete GA.stats;                                                         // no nextStep (old builds): the coral opens the topic's own lesson
    const t = ones[0], h = V.panelHtml(M, t, 'marks');
    assert.strictEqual(pops(h), 1); assert.strictEqual(links(h, t.lessonIds[0]), 1);
  } finally { GA.stats = saved.stats; GA.store = saved.store; if (saved.stats === undefined) delete GA.stats; if (saved.store === undefined) delete GA.store; }
});

test('map panels on the shipped catalogue (no ICAI bank): one coral each, no GATE or PYQ words, no year range from an empty bank', () => {
  const saved = { stats: GA.stats, store: GA.store };
  try {
    GA.store = { state: { lessons: {}, q: {}, profile: {} } };
    GA.stats = { nextStep: () => null };
    const M0 = V.model(D0), size = V.defSize(M0);
    const nodes = [M0.root].concat(M0.root.children, M0.root.children.map(s => s.children[0]), M0.root.children.map(s => s.children[0].children[0]));
    nodes.forEach(n => {
      const h = V.panelHtml(M0, n, size);
      assert.strictEqual((h.match(/class="btn pop/g) || []).length, 1, n.id + ': one coral');
      assert.ok(!/\bGATE\b|\bPYQs?\b|undefined|NaN/.test(h.replace(/<[^>]+>/g, ' ')), n.id + ': ' + h.replace(/<[^>]+>/g, ' ').slice(0, 300));
      if (!D0.questions.length) assert.ok(!/#\/pyq|#\/test/.test(h), n.id + ': no link into an empty bank');
    });
  } finally { GA.stats = saved.stats; GA.store = saved.store; }
});
