globalThis.GA = globalThis.GA || {};
require('../app/js/core/md.js');
const D = require('../app/js/viz/diagram.js');
const ex = require('../docs/diagram-examples.json');

function wellFormed(svg) {
  // minimal XML sanity: every open tag has a matching close, self-closing tags ignored
  const st = []; const re = /<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g; let m;
  while ((m = re.exec(svg))) {
    if (m[4] === '/' || /^(path|rect|circle|line|polyline|polygon|marker|br|input)$/.test(m[2]) && m[1] === '') { if (m[4] !== '/' && !/^(path|rect|circle|line|polyline|polygon)$/.test(m[2])) st.push(m[2]); continue; }
    if (m[1]) { const top = st.pop(); if (top !== m[2]) return `mismatched </${m[2]}> after <${top}>`; } else st.push(m[2]);
  }
  return st.length ? 'unclosed ' + st.join(',') : null;
}
ex.forEach(e => test('renders: ' + e.name, () => {
  const out = D.render(e.spec);
  assert.ok(out.length > 100);
  if (e.spec.type !== 'table') { assert.match(out, /^<svg /); assert.equal(wellFormed(out), null); assert.ok(!/NaN|undefined|Infinity/.test(out), 'NaN/undefined leaked into the SVG'); }
}));
test('unknown type and unknown nodes fail loudly', () => {
  assert.throws(() => D.render({ type: 'nope' }));
  assert.throws(() => D.render({ type: 'graph', nodes: [{ id: 'a', x: 1, y: 1 }], edges: [{ from: 'a', to: 'zz' }] }));
  assert.throws(() => D.render({ type: 'flow', nodes: [{ id: 'a', label: 'x' }], edges: [['a', 'b']] }));
});
test('plot expressions: precedence, functions, errors', () => {
  const f = D.compileExpr('2*x^2+3');
  assert.equal(f(2), 11);
  assert.equal(D.compileExpr('log2(x)')(8), 3);
  assert.equal(D.compileExpr('-x+1')(3), -2);
  assert.equal(D.compileExpr('max(x,2)*2')(5), 10);
  assert.throws(() => D.compileExpr('x +'));
  assert.throws(() => D.compileExpr('process.exit()'));
});
test('diagrams are embedded by the markdown renderer', () => {
  const md = require('../app/js/core/md.js');
  const h = md.render('::: diagram Demo\n' + JSON.stringify(ex[0].spec) + '\n:::');
  assert.match(h, /<figure class="dg dg-gantt"/);
  const bad = md.render('::: diagram\n{not json}\n:::');
  assert.match(bad, /Diagram error/);
});
test('round-robin example is the correct schedule', () => {
  // AT/BT: P1 0/5, P2 1/3, P3 2/8, q = 4 -> P1 0-4, P2 4-7, P3 7-11, P1 11-12, P3 12-16
  const blocks = ex[0].spec.blocks;
  assert.deepEqual(blocks.map(b => [b.p, b.from, b.to]), [['P1', 0, 4], ['P2', 4, 7], ['P3', 7, 11], ['P1', 11, 12], ['P3', 12, 16]]);
});

/* ---------- kmap ---------- */
const noNaN = out => assert.ok(!/NaN|undefined|Infinity/.test(out), 'NaN/undefined leaked into the SVG');
const svgOk = out => { assert.match(out, /^<svg /); assert.equal(wellFormed(out), null); noNaN(out); };
test('kmap: Gray-coded cells and terms', () => {
  const K = D.geom.kmap({ type: 'kmap', vars: 'ABCD', m: [15] });
  assert.deepEqual(K.cellAt[0].map(r => r.join(',')), ['0,1,3,2', '4,5,7,6', '12,13,15,14', '8,9,11,10']);
  assert.equal(K.val[15], 1); assert.equal(K.val[14], 0);
  assert.deepEqual(D.geom.kmapTerm("B'D'", ['A', 'B', 'C', 'D']).cells, [0, 2, 8, 10]);
  assert.deepEqual(D.geom.kmapTerm("(A + C' + D)", ['A', 'B', 'C', 'D']), { sum: true, cells: [2, 6] });
  assert.deepEqual(D.geom.kmapTerm("x1x2'", ['x1', 'x2', 'x3']).cells, [4, 5]);
  const K3 = D.geom.kmap({ type: 'kmap', vars: 'ABC', m: [0, 4, 5, 6], groups: [{ cells: [0, 4] }, { cells: [0, 2, 4, 6], wrong: true }] });
  assert.equal(K3.groups[0].label, "B'C'");
  const g = D.geom.kmap({ type: 'kmap', vars: 'ABC', grid: ['0110', '001X'], groups: [{ cells: [0, 2, 4, 6] }] }).groups[0];
  assert.equal(g.sum, true); assert.equal(g.label, 'C');
});
test('kmap: groups wrap round edges and corners as split pieces', () => {
  const K = D.geom.kmap({ type: 'kmap', vars: 'ABCD', m: [0, 2, 8, 10, 5, 7, 13, 15, 4, 6], groups: [{ term: "B'D'" }, { term: 'BD' }, { cells: [4, 6] }] });
  const [corners, mid, side] = K.groups;
  assert.equal(corners.pieces.length, 4);
  corners.pieces.forEach(p => { assert.equal(p.open.t || p.open.b, true); assert.equal(p.open.l || p.open.r, true); });
  assert.deepEqual(corners.pieces.map(p => [p.r0, p.c0].join()).sort(), ['0,0', '0,3', '3,0', '3,3']);
  assert.equal(mid.pieces.length, 1); assert.deepEqual(mid.pieces[0].open, { t: false, b: false, l: false, r: false });
  assert.equal(side.pieces.length, 2);
  assert.deepEqual(side.pieces.map(p => [p.c0, p.open.l, p.open.r]), [[3, false, true], [0, true, false]]);
  const K5 = D.geom.kmap({ type: 'kmap', vars: 'ABCDE', m: [0, 2, 8, 10, 16, 18, 24, 26], groups: [{ term: "C'E'" }] });
  assert.equal(K5.groups[0].pieces.length, 8);
  assert.deepEqual([...new Set(K5.groups[0].pieces.map(p => p.map))], [0, 1]);
  const out = D.render({ type: 'kmap', vars: 'ABCDE', m: [1, 17], d: [3], index: true, groups: [{ term: "B'C'D'E" }] });
  svgOk(out); assert.equal((out.match(/data-m="/g) || []).length, 32);
});
test('kmap: invalid specs give plain errors', () => {
  const bad = (spec, re) => assert.throws(() => D.render(Object.assign({ type: 'kmap' }, spec)), re);
  bad({ vars: 'ABCDEF' }, /2 to 5 variables/);
  bad({ vars: 'AB', m: [4] }, /0 to 3/);
  bad({ vars: 'ABC', m: [0, 1, 2], groups: [{ cells: [0, 1, 2] }] }, /not a rectangle/);
  bad({ vars: 'ABC', m: [0, 1, 3], groups: [{ cells: [0, 3] }] }, /not a rectangle/);
  bad({ vars: 'ABC', m: [0], groups: [{ cells: [0, 1] }] }, /both 1s and 0s/);
  bad({ vars: 'ABC', m: [0, 1], groups: [{ term: "A'Q" }] }, /cannot read/);
  bad({ vars: 'ABC', grid: ['0110'] }, /2 rows/);
  bad({ vars: 'ABC', m: [1], d: [1] }, /both m and d/);
});

/* ---------- circuit ---------- */
const ckEx = name => ex.find(e => e.name.startsWith(name)).spec;
test('circuit: gate pins sit on the body outline', () => {
  const M = D.geom.circuit({ type: 'circuit', grid: [70, 46], parts: [{ id: 'g', kind: 'and', at: [2, 1] }, { id: 'n', kind: 'nand', n: 3, at: [4, 1] }, { id: 'o', kind: 'or', at: [2, 3] }, { id: 'x', kind: 'xor', at: [4, 3], neg: [2] }] });
  const g = M.parts.g.pins, n = M.parts.n.pins, o = M.parts.o.pins, x = M.parts.x.pins;
  assert.deepEqual([g['1'].x, g['1'].y, g['2'].x, g['2'].y, g.y.x, g.y.y], [122, 39, 122, 53, 158, 46]);
  assert.equal(g['1'].d, 'l'); assert.equal(g.y.d, 'r');
  assert.deepEqual([n['1'].y, n['2'].y, n['3'].y], [34, 46, 58]);
  assert.equal(n.y.x, 280 + 39 / 2 + 7, 'NAND output pin is past the bubble (body 39 wide, bubble 7)');
  assert.ok(o['1'].x > 121 && o['1'].x < 126, 'OR inputs end on the curved back');
  assert.ok(x['2'].x < x['1'].x - 6, 'a bubbled input pin moves left by the bubble');
});
test('circuit: block pins (mux, flip-flop, adder, box)', () => {
  const M = D.geom.circuit({ type: 'circuit', parts: [{ id: 'm', kind: 'mux', n: 4, at: [2, 2] }, { id: 'f', kind: 'jkff', at: [5, 2], pre: true }, { id: 'a', kind: 'fa', chain: true, at: [8, 2] }, { id: 'b', kind: 'box', pins: { l: ['p', 'q:Q'], b: ['op:F'] }, at: [10, 2] }] });
  const m = M.parts.m.pins, f = M.parts.f.pins, a = M.parts.a.pins, b = M.parts.b.pins;
  assert.deepEqual(['d0', 'd1', 'd2', 'd3'].map(k => m[k].d), ['l', 'l', 'l', 'l']);
  assert.ok(m.d0.y < m.d1.y && m.d2.y < m.d3.y && m.d0.x === m.d3.x);
  assert.ok(m.s1.x < m.s0.x && m.s1.d === 'b' && m.y.d === 'r');
  assert.ok(f.j.y < f.clk.y && f.clk.y < f.k.y && f.q.y < f.qn.y && f.pre.d === 't' && f.clk.x === f.j.x);
  assert.deepEqual([a.a.d, a.b.d, a.cin.d, a.cout.d, a.s.d], ['t', 't', 'r', 'l', 'b']);
  assert.ok(b.p && b.q && b.op.d === 'b');
});
test('circuit: wires are orthogonal, end on pins, and junctions get dots', () => {
  const s = ckEx('circuit — two-level');
  const M = D.geom.circuit(s);
  M.routes.forEach(r => {
    const [fp, tp] = [r.from, r.to].map(k => { const [id, pn] = k.split('.'); return M.parts[id].pins[pn]; });
    assert.deepEqual(r.pts[0], [fp.x, fp.y]); assert.deepEqual(r.pts[r.pts.length - 1], [tp.x, tp.y]);
    for (let i = 1; i < r.pts.length; i++) assert.ok(r.pts[i][0] === r.pts[i - 1][0] || r.pts[i][1] === r.pts[i - 1][1], 'diagonal wire segment');
  });
  assert.equal(M.dots.length, 3, 'one dot where each input line branches');
  const xs = ['A', 'B', 'C'].map(id => M.routes.find(r => r.from === id + '.p').pts[0][0]);
  assert.equal(new Set(xs).size, 3);
  assert.ok(M.routes.some(r => r.color) && M.routes.filter(r => r.color).every(r => /^(B|g2|g4)\./.test(r.from)));
  const two = D.geom.circuit({ type: 'circuit', parts: [{ id: 'g1', kind: 'and', at: [2, 0] }, { id: 'g2', kind: 'and', at: [2, 2] }, { id: 'A', kind: 'in', at: [0, 0.5] }, { id: 'B', kind: 'in', at: [0, 1.5] }], wires: [{ from: 'A', to: ['g1.2', 'g2.1'] }, { from: 'B', to: ['g1.1', 'g2.2'] }] });
  const tA = two.routes.find(r => r.from === 'A.p').pts[1][0], tB = two.routes.find(r => r.from === 'B.p').pts[1][0];
  assert.ok(Math.abs(tA - tB) >= 8, 'trunks of different nets in one gap are spread apart');
  const sync = D.geom.circuit(ckEx('circuit — synchronous'));
  assert.equal(sync.dots.filter(d => Math.abs(d.y - 2.3 * 46) < 0.01).length, 2, 'two clock taps get dots; the last riser is a corner');
});
test('circuit: every example renders without NaN and invalid specs give plain errors', () => {
  ex.filter(e => e.spec.type === 'circuit').forEach(e => svgOk(D.render(e.spec)));
  const bad = (spec, re) => assert.throws(() => D.render(Object.assign({ type: 'circuit' }, spec)), re);
  bad({ parts: [] }, /needs "parts"/);
  bad({ parts: [{ id: 'g', kind: 'nandd', at: [0, 0] }] }, /unknown kind "nandd"/);
  bad({ parts: [{ id: 'g', kind: 'and' }] }, /needs "at"/);
  bad({ parts: [{ id: 'g', kind: 'and', at: [0, 0] }], wires: [['g', 'h.1']] }, /no part "h"/);
  bad({ parts: [{ id: 'g', kind: 'and', at: [0, 0] }, { id: 'h', kind: 'and', at: [2, 0] }], wires: [['g', 'h.3']] }, /h has no pin "3"/);
  bad({ parts: [{ id: 'g', kind: 'and', at: [0, 0] }, { id: 'h', kind: 'and', at: [2, 0] }], wires: [['g', 'h']] }, /say which pin of h/);
  bad({ parts: [{ id: 'm', kind: 'mux', n: 3, at: [0, 0] }] }, /2, 4, 8 or 16/);
  bad({ parts: [{ id: 'A', kind: 'in', at: [0, 'g.1'] }, { id: 'g', kind: 'and', at: [1, 0] }] }, /yet/);
  bad({ parts: [{ id: 'g', kind: 'and', at: [0, 0] }, { id: 'g', kind: 'or', at: [1, 0] }] }, /two parts are called "g"/);
});

/* ---------- wave ---------- */
test('wave: every lane spans the same time and width', () => {
  ex.filter(e => e.spec.type === 'wave').forEach(e => {
    const M = D.geom.wave(e.spec), real = M.lanes.filter(l => !l.gap);
    real.forEach(l => {
      assert.equal(l.segs[0].t0, 0); assert.equal(l.segs[l.segs.length - 1].t1, M.T, e.name + ': lane ' + l.name + ' ends early');
      l.segs.forEach((sg, i) => i && assert.equal(sg.t0, l.segs[i - 1].t1));
    });
    assert.equal(new Set(real.map(l => l.x2 - l.x1)).size, 1);
    const out = D.render(e.spec); svgOk(out);
    const ends = [...out.matchAll(/<path d="M([\d.]+) [\d.]+ [^"]*?L([\d.]+) [\d.]+" class="wv-s"\/>/g)].map(m => [+m[1], +m[2]]);
    ends.forEach(([a, b]) => { assert.ok(Math.abs(a - M.X(0)) < 0.2 || a > M.X(0)); assert.ok(b <= M.X(M.T) + 0.2); });
  });
  const M = D.geom.wave({ type: 'wave', lanes: [{ name: 'a', bits: '01' }, { name: 'b', bits: '0110x1z.' }, { name: 'c', clk: 2 }] });
  assert.equal(M.T, 8);
  assert.deepEqual(M.lanes[0].segs.map(s => [s.t0, s.t1, s.v]), [[0, 1, '0'], [1, 8, '1']]);
  assert.deepEqual(M.lanes[1].segs.map(s => s.v), ['0', '1', '0', 'x', '1', 'z']);
  assert.equal(M.lanes[1].segs[5].t1, 8);
});
test('wave: clock edges, bus values', () => {
  const M = D.geom.wave({ type: 'wave', t: 8, lanes: [{ name: 'CLK', clk: 2, phase: 1 }, { name: 'K', clk: 4, inv: true }, { name: 'B', bus: 'x=.2z', data: ['A', 'B'] }] });
  assert.deepEqual(M.lanes[0].segs.filter(s => s.v === '1').map(s => s.t0), [1, 3, 5, 7]);
  assert.deepEqual(M.lanes[1].segs.map(s => [s.t0, s.v]), [[0, '0'], [2, '1'], [4, '0'], [6, '1']]);
  const b = M.lanes[2].segs;
  assert.deepEqual(b.map(s => (typeof s.v === 'string' ? s.v : s.v.d)), ['x', 'A', 'B', 'z']);
  assert.deepEqual([b[1].t0, b[1].t1, b[2].v.c], [1, 3, 'k0']);
  assert.equal(b[3].t1, 8);
});
test('wave: invalid specs give plain errors', () => {
  const bad = (spec, re) => assert.throws(() => D.render(Object.assign({ type: 'wave' }, spec)), re);
  bad({}, /needs "lanes"/);
  bad({ lanes: [{ name: 'a', bits: '01q' }] }, /unknown character "q"/);
  bad({ lanes: [{ name: 'a', bits: '.1' }] }, /cannot come first/);
  bad({ t: 4, lanes: [{ name: 'a' }] }, /needs clk/);
  bad({ lanes: [{ name: 'a' }] }, /cannot tell the length/);
  bad({ lanes: [{ name: 'a', bits: '01' }], arrows: [{ from: ['a', 0], to: ['zz', 1] }] }, /no lane "zz"/);
  bad({ lanes: [{ name: 'a', bits: '01' }], marks: [{ t: 9 }] }, /between 0 and 2/);
  bad({ lanes: [{ name: 'a', clk: -1 }] }, /clock period/);
});

/* ---------- shapes ---------- */
const near = (p, q) => assert.ok(Math.abs(p[0] - q[0]) < 1e-9 && Math.abs(p[1] - q[1]) < 1e-9, `${JSON.stringify(p)} != ${JSON.stringify(q)}`);
const afAp = (M, p) => [M[0] * p[0] + M[2] * p[1] + M[4], M[1] * p[0] + M[3] * p[1] + M[5]];
test('shapes: transforms rotate, mirror, scale and compose in order', () => {
  const t = list => p => afAp(D.geom.tf(list), p);
  near(t([['rotate', 90]])([1, 0]), [0, 1]);
  near(t([['rotate', -90, [1, 1]]])([1, 2]), [2, 1]);
  near(t([['mirror', 'v', 2]])([1, 5]), [3, 5]);
  near(t([['mirror', 'h', -1]])([4, 1]), [4, -3]);
  near(t([['mirror', [0, 0], [1, 1]]])([1, 0]), [0, 1]);
  near(t([['scale', 2, [1, 1]]])([2, 2]), [3, 3]);
  near(t([['scale', 2, 3]])([1, 1]), [2, 3]);
  near(t([['translate', 1, 0], ['rotate', 90]])([0, 0]), [0, 1]);
  near(t([['rotate', 90], ['translate', 1, 0]])([0, 0]), [1, 0]);
  const M = D.geom.shapes({ type: 'shapes', items: [{ kind: 'group', id: 'F', def: true, items: [{ kind: 'poly', pts: [[0, 0], [2, 0], [0, 1]] }] }, { kind: 'use', ref: 'F', tf: [['mirror', 'v', 0]] }, { kind: 'use', ref: 'F', tf: [['rotate', 180]] }] });
  assert.equal(M.ops.length, 2, 'def:true draws nothing');
  const pts = op => op.segs.filter(s => s[0] !== 'Z').map(s => s[1]);
  pts(M.ops[0]).forEach((p, i) => near(p, [[0, 0], [-2, 0], [0, 1]][i]));
  pts(M.ops[1]).forEach((p, i) => near(p, [[0, 0], [-2, 0], [0, -1]][i]));
  const svg = D.render({ type: 'shapes', items: [{ kind: 'group', tf: [['mirror', 'v', 0]], items: [{ kind: 'text', at: [1, 0], t: 'R', flip: true }, { kind: 'text', at: [1, 1], t: 'up' }] }] });
  assert.equal((svg.match(/transform="matrix\(-1 0 0 1 /g) || []).length, 1, 'only the flip:true text is mirrored');
});
test('shapes: cube stacks skip hidden faces, nets dash fold lines, dice have pips', () => {
  const faces = spec => D.geom.shapes({ type: 'shapes', items: [spec] }).ops.filter(o => o.t === 'path' && o.st.shade).length;
  assert.equal(faces({ kind: 'cubes', cells: [[0, 0, 0]] }), 3);
  assert.equal(faces({ kind: 'cubes', cells: [[0, 0, 0], [1, 0, 0]] }), 5);
  assert.equal(faces({ kind: 'cubes', h: [[2]] }), 5);
  const net = D.geom.shapes({ type: 'shapes', items: [{ kind: 'net', cells: [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], labels: [1, 2, 3, 4, 5, 6], fold: true }] }).ops;
  assert.equal(net.filter(o => o.t === 'path' && o.st.dash).length, 5, 'a cross net has five fold edges');
  assert.equal(net.filter(o => o.t === 'text').length, 6);
  const pips = n => D.geom.shapes({ type: 'shapes', items: [{ kind: 'die', n }] }).ops.filter(o => o.st && o.st.fill === 'kpip').length;
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(pips), [1, 2, 3, 4, 5, 6]);
  assert.equal(D.geom.shapes({ type: 'shapes', items: [{ kind: 'die', iso: [1, 2, 3] }] }).ops.filter(o => o.st && o.st.fill === 'kpip').length, 6);
  ex.filter(e => e.spec.type === 'shapes').forEach(e => svgOk(D.render(e.spec)));
});
test('shapes: the viewBox fits the figure and invalid specs give plain errors', () => {
  const svg = D.render({ type: 'shapes', u: 50, items: [{ kind: 'rect', at: [0, 0], w: 4, h: 2 }] });
  const [, , w, h] = /viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/.exec(svg).slice(1).map(Number);
  assert.equal(w, 4 * 50 + 20); assert.equal(h, 2 * 50 + 8 + 2 + 10);
  const bad = (items, re) => assert.throws(() => D.render({ type: 'shapes', items }), re);
  bad([{ kind: 'blob' }], /unknown kind "blob"/);
  bad([{ kind: 'circle', c: [0], r: 1 }], /needs a point/);
  bad([{ kind: 'circle', c: [0, 0] }], /needs r/);
  bad([{ kind: 'use', ref: 'nope' }], /no group with id "nope"/);
  bad([{ kind: 'group', tf: [['spin', 3]], items: [] }], /unknown transform "spin"/);
  bad([{ kind: 'die', n: 7 }], /1 to 6/);
  bad([{ kind: 'cubes' }], /needs h/);
  assert.throws(() => D.render({ type: 'shapes' }), /needs "items"/);
});

/* ---------- venn ---------- */
test('venn: region expressions name the right pieces', () => {
  const e2 = x => D.geom.vennExpr(x, ['A', 'B']), e3 = x => D.geom.vennExpr(x, ['A', 'B', 'C']);
  assert.deepEqual(e2('A&!B'), [1]); assert.deepEqual(e2('B-A'), [2]); assert.deepEqual(e2('A|B'), [1, 2, 3]);
  assert.deepEqual(e2('U-(A|B)'), [0]); assert.deepEqual(e2("A'"), [0, 2]); assert.deepEqual(e2('A ∩ B'), [3]);
  assert.deepEqual(e3('A&B'), [3, 7]); assert.deepEqual(e3("(A|B)'&C"), [4]); assert.deepEqual(e3('!A&!B&!C'), [0]);
  assert.deepEqual(D.geom.vennExpr('Tea&!Coffee', ['Tea', 'Coffee']), [1]);
});
test('venn: region text sits inside its own piece and never overlaps', () => {
  ex.filter(e => e.spec.type === 'venn').forEach(e => {
    const M = D.geom.venn(e.spec);
    M.atoms.forEach(a => assert.equal(M.atomOf(a.x, a.y), a.atom, `${e.name}: "${a.text}" is outside ${a.key}`));
    const boxes = M.atoms.map(a => { const w = a.text.length * a.size * 0.28; return [a.x - w, a.y - 6, a.x + w, a.y + 6]; });
    boxes.forEach((p, i) => boxes.forEach((q, j) => j > i && assert.ok(p[2] <= q[0] || q[2] <= p[0] || p[3] <= q[1] || q[3] <= p[1], `${e.name}: labels ${i} and ${j} overlap`)));
    const out = D.render(e.spec); svgOk(out);
    const shaded = Object.keys(M.shade).length;
    assert.equal((out.match(/clip-path="url\(#vn[a-z0-9]+-i0\)"|clip-path="url\(#vn[a-z0-9]+-o0\)"/g) || []).length, shaded);
  });
});
test('venn: invalid specs give plain errors', () => {
  const bad = (spec, re) => assert.throws(() => D.render(Object.assign({ type: 'venn' }, spec)), re);
  bad({ sets: ['A'] }, /2 or 3 sets/);
  bad({ sets: ['A', 'B', 'C', 'D'] }, /2 or 3 sets/);
  bad({ sets: ['A', 'B', 'C'], regions: { 'A&B': '5' } }, /2 pieces/);
  bad({ sets: ['A', 'B'], shade: ['A&Q'] }, /cannot read "Q"/);
  bad({ sets: ['A', 'B'], shade: ['(A|B'] }, /missing \)/);
});

/* ---------- plot additions: bars, areas, regions, explicit ticks ---------- */
const sha1 = t => require('crypto').createHash('sha1').update(t).digest('hex');
// the drawing as the kit wrote it before P2-63 (one shared id="ah" marker pair in every drawing, no data-dg): later changes to wrap() only
const OLD_DEFS = '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1 9 5 0 9z" class="ar"/></marker><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1 9 5 0 9z" class="ar2"/></marker></defs>';
const legacy = out => out.replace(/ data-dg="[^"]*"/, '').replace(/url\(#ah(2?)-[a-z0-9]+\)/g, 'url(#ah$1)').replace(/<marker id="ah(2?)-[a-z0-9]+"/g, '<marker id="ah$1"')
  .replace(/^(<svg\b[^>]*>)(?!<defs><marker id="ah")/, (m, t) => t + OLD_DEFS);
test('plot and tree: output without the new keys is byte-identical to before', () => {
  assert.equal(sha1(legacy(D.render(ckEx('plot — growth rates'))).replace(/ style="min-width:[\d.]+px"/, '')), '8ed5ecab99b08fd963e4ddc2613b7c6ae973b58d');   // the phone min-width (QA 2026-10-13) is the only change
  assert.equal(sha1(legacy(D.render(ckEx('tree — binary search tree')))), '7495f0bb6d565918a85992311b99f057e42ec69c');
});
test('plot: bars, value labels and explicit ticks', () => {
  const s = ckEx('plot — bars');
  const out = D.render(s); svgOk(out);
  const bars = [...out.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="2" class="nb"\/>/g)].map(m => m.slice(1).map(Number)).filter(b => b[2] > 12);   // not the 10 px legend swatch
  assert.equal(bars.length, 5);
  const h = bars.map(b => b[3]); approx(h[1] / h[0], 4, 0.05); approx(h[2] / h[0], 6, 0.05);
  bars.forEach(b => approx(b[1] + b[3], bars[0][1] + bars[0][3], 0.11));
  ['1/16', '4/16', '6/16'].forEach(t => assert.ok(out.includes(`>${t}</tspan>`)));
  assert.ok(out.includes('>0.125</tspan>'), 'explicit ytick keeps its value');
  const tk = D.render({ type: 'plot', x: [0, 6.3], series: [{ fn: 'sin(x)' }], xticks: [0, [3.14159, 'π'], [6.28318, '2π']] });
  assert.ok(tk.includes('>π</tspan>') && tk.includes('>2π</tspan>'));
});
test('plot: areas under and between curves, and polygon regions', () => {
  const norm = D.render(ckEx('plot — area under')); svgOk(norm);
  const d = /<path d="(M[^"]+)" class="pf"\/>/.exec(norm)[1], xs = [...d.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map(m => [+m[1], +m[2]]);
  const L = 46, W = 560, X = x => L + ((x + 3.5) / 7) * (W - L - 16);
  approx(Math.min(...xs.map(p => p[0])), X(-1), 0.11); approx(Math.max(...xs.map(p => p[0])), X(1), 0.11);
  assert.ok(norm.includes('>0.683</tspan>'));
  svgOk(D.render(ckEx('plot — area between')));
  const meet = D.render(ckEx('plot — a 2-D region')); svgOk(meet);
  assert.equal((meet.match(/class="pf"/g) || []).length, 1); assert.equal((meet.match(/class="pfo"/g) || []).length, 2); assert.ok(/fill="url\(#plh/.test(meet));
  const bad = (spec, re) => assert.throws(() => D.render(Object.assign({ type: 'plot', x: [0, 1], series: [{ fn: 'x' }] }, spec)), re);
  bad({ areas: [{ under: 3 }] }, /no series 3/);
  bad({ areas: [{ from: 0, to: 1 }] }, /needs under/);
  bad({ areas: [{ under: 0, from: 1, to: 0.5 }] }, /from must be less than to/);
  bad({ regions: [{ pts: [[0, 0], [1, 1]] }] }, /at least 3 points/);
  bad({ xticks: ['a'] }, /not a number/);
});

/* ---------- tree edge labels ---------- */
test('tree: edge labels sit beside their edges, clear of nodes', () => {
  const s = ckEx('tree — probability tree');
  const out = D.render(s); svgOk(out);
  ['3/5', '2/5', '2/4', '3/4', '1/4'].forEach(t => assert.ok(out.includes(`>${t}</tspan>`), t));
  const labs = [...out.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*class="dt del tr-el"><tspan[^>]*>([^<]*)</g)].map(m => [+m[1], +m[2], m[3]]);
  assert.equal(labs.length, 6);
  const nodes = [...out.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="18"/g)].map(m => [+m[1], +m[2]]);
  labs.forEach(([x, y, t]) => nodes.forEach(([cx, cy]) => {
    const w = t.length * 11 * 0.28 + 3;
    const dx = Math.max(Math.abs(x - cx) - w, 0), dy = Math.max(Math.abs(y - cy) - 7.5, 0);
    assert.ok(Math.hypot(dx, dy) >= 18, `label ${t} touches the node at ${cx},${cy}`);
  }));
  const l35 = labs.find(l => l[2] === '3/5'), l25 = labs.find(l => l[2] === '2/5'), [R, B] = nodes.filter(n => n[1] === Math.min(...nodes.map(q => q[1])));
  assert.ok(l35[0] < R[0] + 37 && l25[0] > B[0] - 37 && l35[0] < l25[0], 'left-branch label on the left, right-branch label on the right');
  assert.ok(/class="k3 tr-c"><line/.test(out), 'edgeColor colours the edge');
  svgOk(D.render(ckEx('tree — unbalanced')));
});

/* ---------- er (Chen notation) ---------- */
test('er: every shape kind, double lines, keys', () => {
  const out = D.render(ckEx('er — entities, attributes, an M:N relationship')); svgOk(out);
  assert.equal((out.match(/<ellipse /g) || []).length, 10, '9 attributes, phone drawn twice (multivalued)');
  assert.equal((out.match(/class="er-s plain er-dash"/g) || []).length, 1, 'derived attribute: dashed oval');
  assert.equal((out.match(/class="er-u"/g) || []).length, 2, 'two keys underlined');
  assert.equal((out.match(/class="er-l2"/g) || []).length, 1, 'one total participation (double line)');
  ['>M</tspan>', '>N</tspan>', '>Enrols</tspan>', '>first</tspan>'].forEach(t => assert.ok(out.includes(t), t));
  const weak = D.render(ckEx('er — weak entity and identifying relationship')); svgOk(weak);
  assert.equal((weak.match(/<rect [^>]*class="er-in"/g) || []).length, 1, 'weak entity: double rectangle');
  assert.equal((weak.match(/<path [^>]*class="er-in"/g) || []).length, 1, 'identifying relationship: double diamond');
  assert.ok(/class="er-u er-dash"/.test(weak), 'partial key: dashed underline');
  const isa = D.render(ckEx('er — specialisation: disjoint, total (circle)')); svgOk(isa);
  assert.ok(/<circle [^>]*class="er-s plain"/.test(isa) && isa.includes('>d</tspan>') && /class="er-l2"/.test(isa));
  const tri = D.render(ckEx('er — ISA triangle, overlapping, partial')); svgOk(tri);
  assert.ok(tri.includes('>ISA</tspan>') && tri.includes('>overlapping</tspan>') && !/er-l2/.test(tri));
  const agg = D.render(ckEx('er — aggregation')); svgOk(agg);
  assert.ok(/class="er-agg"/.test(agg));
  ['er — recursive relationship with roles and (min,max)', 'er — arrows for one, elbow connectors'].forEach(n => svgOk(D.render(ckEx(n))));
  assert.ok(/class="er-ah"/.test(D.render(ckEx('er — arrows for one, elbow connectors'))));
});
test('er: geometry — lines end on the outlines, labels clear of every shape', () => {
  const inPoly = (p, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) if ((P[i][1] > p[1]) !== (P[j][1] > p[1]) && p[0] < ((P[j][0] - P[i][0]) * (p[1] - P[i][1])) / (P[j][1] - P[i][1]) + P[i][0]) c = !c; return c; };
  ex.filter(e => e.spec.type === 'er').forEach(e => {
    const M = D.geom.er(e.spec);
    M.labels.forEach(l => {
      const [x1, y1, x2, y2] = l.box, pts = [];
      for (let i = 0; i <= 4; i++) for (let j = 0; j <= 2; j++) pts.push([x1 + ((x2 - x1) * i) / 4, y1 + ((y2 - y1) * j) / 2]);
      M.shapes.filter(sh => sh.kind !== 'agg').forEach(sh => assert.ok(!pts.some(p => inPoly(p, sh.poly)), `${e.name}: label ${l.text} overlaps ${sh.label}`));
      M.labels.forEach(k => assert.ok(k === l || !(k.box[0] < x2 && k.box[2] > x1 && k.box[1] < y2 && k.box[3] > y1), `${e.name}: labels ${l.text} and ${k.text} overlap`));
    });
    M.links.forEach(L => {
      const on = (sh, p) => { const dx = p[0] - sh.x, dy = p[1] - sh.y; return sh.form === 'rect' ? Math.abs(Math.max(Math.abs(dx) / sh.hw, Math.abs(dy) / sh.hh) - 1) < 0.02 : sh.form === 'diamond' ? Math.abs(Math.abs(dx) / sh.hw + Math.abs(dy) / sh.hh - 1) < 0.02 : sh.form === 'ellipse' ? Math.abs((dx / sh.hw) ** 2 + (dy / sh.hh) ** 2 - 1) < 0.03 : sh.form === 'circle' ? Math.abs(Math.hypot(dx, dy) - sh.hw) < 0.2 : true; };
      assert.ok(on(L.A, L.pts[0]) && on(L.B, L.pts[L.pts.length - 1]), `${e.name}: line ${L.A.label} -> ${L.B.label} ends on both outlines`);
    });
  });
  const M = D.geom.er({ type: 'er', entities: [{ id: 'E', at: [0, 0] }], rels: [{ id: 'R', at: [2, 0], links: [{ to: 'E', via: [[2, -1], [0, -1]] }] }] });
  assert.deepEqual(M.links[0].pts.map(p => p.map(Math.round)), [[220, -25], [220, -70], [0, -70], [0, -18]], 'orthogonal route through via points');
  const bad = (spec, re) => assert.throws(() => D.render(Object.assign({ type: 'er' }, spec)), re);
  bad({ entities: [{ id: 'A' }] }, /needs "at"/);
  bad({ entities: [{ id: 'A', at: [0, 0] }], rels: [{ id: 'R', at: [1, 0], links: [['B', '1']] }] }, /no item "B"/);
  bad({ entities: [{ id: 'A', at: [0, 0] }, { id: 'A', at: [1, 0] }] }, /two items are called "A"/);
  bad({ entities: [{ id: 'A', at: [0, 0] }], rels: [{ id: 'R', at: [1, 0] }] }, /needs links/);
  bad({ entities: [{ id: 'A', at: [0, 0] }], attrs: [{ label: 'x', at: [0, 1] }] }, /needs of/);
  bad({ entities: [{ id: 'A', at: [0, 0] }], isa: [{ at: [0, 1], super: 'A' }] }, /needs super .* and subs/);
});

/* ---------- plot: arrows, markers, dashes, legend position, log axes, clipping ---------- */
test('plot: vectors, arrowheads, hollow markers, dashed series, point-label positions', () => {
  const v = D.render(ckEx('plot — vectors and arrows on a curve')); svgOk(v);
  assert.equal((v.match(/class="pah"/g) || []).length, 4, 'three vectors and one series arrow');
  assert.equal((v.match(/class="pl dashed"/g) || []).length, 1);
  assert.ok(v.includes('>u + v</tspan>') && (v.match(/>v<\/tspan>/g) || []).length === 2);
  const pw = D.render(ckEx('plot — hollow markers for a piecewise')); svgOk(pw);
  assert.equal((pw.match(/class="pd open"/g) || []).length, 1);
  assert.equal((pw.match(/class="pd"/g) || []).length, 1);
  assert.ok(/clip-path="url\(#plc/.test(pw), 'clip: true clips the curves');
  const lab = [...pw.matchAll(/<text x="([\d.]+)" y="([\d.]+)" text-anchor="(\w+)"[^>]*>(?:<tspan[^>]*>)([^<]*)/g)].map(m => [+m[1], +m[2], m[3], m[4]]);
  const l3 = lab.find(l => l[3].startsWith('limit')), f2 = lab.find(l => l[3].startsWith('f(2)'));
  assert.equal(l3[2], 'end'); assert.equal(f2[2], 'start');
  const dots = D.render({ type: 'plot', x: [0, 3], y: [0, 3], series: [{ pts: [[0, 0], [1, 1], [2, 2]], dots: 'open' }, { pts: [[0, 1], [2, 1]], dots: true, legend: false, label: 'hidden' }] });
  svgOk(dots);
  assert.equal((dots.match(/class="pds open"/g) || []).length, 3);
  assert.equal((dots.match(/class="pds"/g) || []).length, 2);
  assert.ok(!dots.includes('>hidden<'), 'legend: false keeps a series out of the legend');
  assert.throws(() => D.render({ type: 'plot', x: [0, 1], series: [{ fn: 'x' }], points: [{ x: 0, y: 0, label: 'a', pos: 'up' }] }), /pos is "above"/);
  assert.throws(() => D.render({ type: 'plot', x: [0, 1], series: [{ fn: 'x' }], vectors: [{ from: [0, 0] }] }), /needs to/);
});
test('plot: legend positions and log axes', () => {
  const pos = p => { const out = D.render({ type: 'plot', w: 400, h: 200, x: [0, 2], y: [0, 2], legend: p, series: [{ fn: 'x', label: 'f' }] }); svgOk(out); const m = /<rect x="([-\d.]+)" y="([-\d.]+)" width="12"/.exec(out); return m && [+m[1], +m[2]]; };
  const tl = pos('top-left'), tr = pos('top-right'), bl = pos('bottom-left'), br = pos('bottom-right');
  assert.deepEqual(tl, pos(undefined), 'top-left is the default');
  assert.ok(tr[0] > tl[0] && tr[1] === tl[1] && bl[0] === tl[0] && bl[1] > tl[1] && br[0] === tr[0] && br[1] === bl[1]);
  assert.equal(pos('none'), null); assert.equal(pos(false), null);
  const outside = D.render({ type: 'plot', w: 400, h: 200, x: [0, 2], y: [0, 2], legend: 'outside', series: [{ fn: 'x', label: 'f' }] });
  assert.match(outside, /viewBox="0 0 400 223"/, 'an outside legend makes the figure taller');
  assert.throws(() => D.render({ type: 'plot', x: [0, 1], legend: 'left', series: [{ fn: 'x' }] }), /legend is "top-left"/);
  const lg = D.render(ckEx('plot — log-log axes')); svgOk(lg);
  assert.ok(lg.includes('>10</tspan>') && lg.includes('>1000</tspan>') && /<tspan dy="-[\d.]+" font-size="[\d.]+"[^>]*>8<\/tspan>/.test(lg), 'decade ticks, 10^8 as a power');
  const g = D.render({ type: 'plot', w: 400, h: 200, x: [1, 100], y: [1, 100], xlog: 10, ylog: 10, series: [{ pts: [[1, 1], [10, 10], [100, 100]] }] });
  const pts = /points="([^"]+)"/.exec(g)[1].split(' ').map(s => s.split(',').map(Number));
  approx(pts[1][0] - pts[0][0], pts[2][0] - pts[1][0], 1e-6);
  approx(pts[0][1] - pts[1][1], pts[1][1] - pts[2][1], 1e-6);
  assert.throws(() => D.render({ type: 'plot', x: [0, 10], xlog: 10, series: [{ fn: 'x' }] }), /x range must be positive/);
  assert.throws(() => D.render({ type: 'plot', x: [1, 10], y: [0, 10], ylog: 10, series: [{ fn: 'x' }] }), /y range must be positive/);
  assert.throws(() => D.render({ type: 'plot', x: [1, 10], xlog: 1, series: [{ fn: 'x' }] }), /base of a logarithmic axis/);
});

/* ---------- graph: where self-loops go ---------- */
test('graph: self-loop sides (node loop, edge loop), default unchanged', () => {
  const g = (node, edge) => D.render({ type: 'graph', w: 300, h: 200, nodes: [Object.assign({ id: 'a', x: 150, y: 100 }, node)], edges: [Object.assign({ from: 'a', to: 'a', label: 'x' }, edge)] });
  const loop = svg => /<path d="(M[^"]*C[^"]*)" class="de"/.exec(svg)[1].match(/-?[\d.]+/g).map(Number);
  const lab = svg => { const m = /<text x="([\d.]+)" y="([\d.]+)" text-anchor="(\w+)"[^>]*class="dt del"/.exec(svg); return [+m[1], +m[2], m[3]]; };
  const def = g();
  assert.deepEqual(loop(def), [138, 84, 120, 40, 180, 40, 162, 84], 'the classic loop: above the node (r = 20)');
  assert.deepEqual(lab(def), [150, 50, 'middle']);
  assert.match(def, /viewBox="0 0 300 200"/);
  const below = g({}, { loop: 'below' });
  assert.ok(loop(below).filter((v, i) => i % 2).every(y => y > 100) && lab(below)[1] > 150);
  const left = g({ loop: 'left' });
  assert.ok(loop(left).filter((v, i) => !(i % 2)).every(x => x < 150)); assert.equal(lab(left)[2], 'end');
  const right = g({ loop: 'left' }, { loop: 'right' });
  assert.ok(loop(right).filter((v, i) => !(i % 2)).every(x => x > 150), 'an edge loop beats the node loop'); assert.equal(lab(right)[2], 'start');
  const low = D.render({ type: 'graph', w: 200, h: 120, nodes: [{ id: 'a', x: 100, y: 90, loop: 'below' }], edges: [{ from: 'a', to: 'a', label: 'x' }] });
  const vb = +/viewBox="0 0 [\d.]+ ([\d.]+)"/.exec(low)[1];
  assert.ok(vb > 160 && vb >= loop(low)[1] + 6, 'a loop below the bottom edge makes the figure taller');
  assert.throws(() => g({ loop: 'up' }), /loop is "above", "below", "left" or "right"/);
});
test('graph: a default self-loop never covers another edge label', () => {
  const spec = ckEx('graph — a self-loop steps aside');
  const out = D.render(spec); svgOk(out);
  const ys = /<path d="(M[^"]*C[^"]*)" class="de"/.exec(out)[1].match(/-?[\d.]+/g).map(Number).filter((v, i) => i % 2);
  assert.ok(ys.every(y => y > 80), 'B3 (y = 80) has its loop underneath, away from the back-edge label');
  const dfa = D.render(ckEx('graph — DFA'));
  [...dfa.matchAll(/<path d="(M[^"]*C[^"]*)" class="de"/g)].forEach(m => { const ys2 = m[1].match(/-?[\d.]+/g).map(Number).filter((v, i) => i % 2); assert.ok(ys2.every(y => y < 95), 'free loops stay above their nodes (y = 95)'); });
  const two = D.render({ type: 'graph', w: 300, h: 220, nodes: [{ id: 'p', x: 150, y: 110 }], edges: [{ from: 'p', to: 'p', label: 'a' }, { from: 'p', to: 'p', label: 'b' }] });
  const loops = [...two.matchAll(/<path d="(M[^"]*C[^"]*)" class="de"/g)].map(m => m[1].match(/-?[\d.]+/g).map(Number));
  assert.ok(loops[0][1] < 110 && loops[1][1] > 110, 'a second loop on the same node takes another side');
});

/* ---------- labels: multi-line tree nodes, lone children, wide trees, gantt margins, flow diamonds, maths ---------- */
test('tree: multi-line labels, lone binary children, phone shrink', () => {
  const ml = D.render(ckEx('tree — multi-line labels')); svgOk(ml);
  assert.equal((ml.match(/<rect [^>]*height="41"/g) || []).length, 7, 'two-line labels sit in 41 px boxes');
  const ys = [...new Set([...ml.matchAll(/<rect [^>]*y="([\d.]+)" width="[\d.]+" height="41"/g)].map(m => +m[1]))].sort((a, b) => a - b);
  assert.equal(ys.length, 3); assert.ok(ys[1] - ys[0] >= 41 + 26, 'levels move apart to fit the boxes');
  const pos = spec => { const out = D.render(spec); return Object.fromEntries([...out.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="18"[^>]*\/><text[^>]*><tspan[^>]*>(\w+)</g)].map(m => [m[3], [+m[1], +m[2]]])); };
  const lone = (k, gap) => ({ type: 'tree', binary: true, gap, root: { label: 'p', children: k ? [{ label: 'c' }, null] : [null, { label: 'c' }] } });
  let P = pos(lone(true)); approx(P.p[0] - P.c[0], 29, 1e-6);                   // (gapX 14 + a leaf's 44 px slot) / 2
  P = pos(lone(false)); approx(P.c[0] - P.p[0], 29, 1e-6);
  P = pos(lone(true, 18)); approx(P.p[0] - P.c[0], 16, 1e-6);                   // gap = r: the old, nearly-straight look
  P = pos({ type: 'tree', root: { label: 'p', children: [{ label: 'c' }] } }); approx(P.p[0], P.c[0], 1e-6);   // general trees: a single child stays below
  const two = pos({ type: 'tree', binary: true, root: { label: 'p', children: [{ label: 'a' }, { label: 'b' }] } });
  approx(two.p[0] - two.a[0], 29, 1e-6);                                         // a pair of leaves: the same offset
  const css = require('fs').readFileSync(require('path').join(__dirname, '../app/css/lesson.css'), 'utf8');
  assert.match(D.render(ckEx('tree — binary search tree')), /^<svg [^>]* style="max-width:[\d.]+px"/, 'the inline max-width stays (the BST lab rewrites it) ...');
  assert.ok(css.includes('.dg svg.dgs[style^="max-width:"] { max-width: 100% !important; }'), '... and the stylesheet lets trees shrink to the column on phones');
  assert.ok(D.render({ type: 'tree', title: 'Parse tree of a#b$c$d', root: { label: '$' } }).includes('>Parse tree of a#b$c$d<'), 'a $ after a letter is a dollar sign');
});
test('gantt: long lane names widen the left margin; short names keep 64 px', () => {
  const x0 = names => { const out = D.render({ type: 'gantt', lanes: 'by-process', blocks: names.map((p, i) => ({ p, from: i, to: i + 1 })) }); return +/<rect x="([\d.]+)"/.exec(out)[1]; };
  assert.equal(x0(['P1', 'P2']), 64);
  assert.equal(x0(['Disk ISR', 'stealing']), 64, 'eight characters still fit');
  const L = x0(['DMA controller', 'CPU']);
  assert.ok(L > 64 && L - 8 - 14 * 12 * 0.56 >= 0, 'the longest name starts inside the figure');
  svgOk(D.render(ckEx('gantt — long lane names')));
});
test('flow: decision text keeps a margin inside its diamond', () => {
  const check = spec => {
    const out = D.render(spec); svgOk(out);
    const ds = [...out.matchAll(/<path d="M([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+) L[\d.]+ [\d.]+ L[\d.]+ [\d.]+Z" class="nb"\/><text[^>]*>(.*?)<\/text>/g)];
    assert.ok(ds.length >= 1);
    ds.forEach(m => {
      const hw = +m[3] - +m[1], hh = +m[4] - +m[2], lines = [...m[5].matchAll(/<tspan x="[\d.]+" ?(?:dy="[\d.]+")?>(.*?)<\/tspan>(?=<tspan x=|$)/g)].map(q => q[1].replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, 'x'));
      const t = Math.max(...lines.map(l => l.length * 12 * 0.56)), th = lines.length * 15;
      assert.ok((t / 2 + 4) / hw + (th / 2 + 0.5) / hh <= 1.0001, `"${lines.join(' / ')}" fits its diamond`);
    });
    return ds.map(m => (m[5].match(/<tspan x=/g) || []).length);
  };
  assert.deepEqual(check(ckEx('flow — decision questions')), [2, 2], 'long questions go on two lines');
  check(ckEx('flow — flowchart'));
  assert.deepEqual(check({ type: 'flow', nodes: [{ id: 'a', kind: 'decision', label: 'x < 3?' }, { id: 'b', kind: 'decision', label: 'Is this one\nreally long enough to wrap?' }], edges: [['a', 'b']] }), [1, 2]);
  const short = D.render({ type: 'flow', nodes: [{ id: 'a', kind: 'decision', label: 'x < 3?' }] });
  assert.match(short, /<path d="M\d+(\.\d)? \d+(\.\d)? L[\d.]+ [\d.]+ L/); assert.ok(/L[\d.]+ [\d.]+ L[\d.]+ [\d.]+ L[\d.]+ [\d.]+Z/.test(short));
  const sp = /<path d="M([\d.]+) [\d.]+ L([\d.]+) ([\d.]+) L[\d.]+ ([\d.]+)/.exec(short);
  assert.equal(+sp[2] - +sp[1], 48, 'a short question keeps the 96 x 54 diamond'); assert.equal(+sp[4] - +sp[3], 27);
});
test('maths in SVG labels: sub/superscripts, overlines, primes and symbols as tspans', () => {
  const lab = t => { const out = D.render({ type: 'graph', w: 200, h: 100, nodes: [{ id: 'a', x: 50, y: 50 }, { id: 'b', x: 150, y: 50 }], edges: [{ from: 'a', to: 'b', label: t }] }); return /<text[^>]*class="dt del">(.*?)<\/text>/.exec(out)[1]; };
  assert.match(lab('$q_0$'), /<tspan font-style="italic">q<\/tspan><tspan dy="[\d.]+" font-size="7.9">0<\/tspan>/);
  assert.match(lab('$2^{n}$'), /<tspan>2<\/tspan><tspan dy="-[\d.]+" font-size="7.9" font-style="italic">n<\/tspan>/);
  assert.match(lab('$n^{k+1}$'), /<tspan dy="-[\d.]+" font-size="7.9" font-style="italic">k<\/tspan><tspan font-size="7.9">\+1<\/tspan>/);
  assert.match(lab('$\\overline{x}$'), /text-decoration="overline">x</);
  assert.match(lab("$x'$"), />x<\/tspan><tspan>′</);
  const sym = { '\\alpha': 'α', '\\omega': 'ω', '\\varepsilon': 'ε', '\\le': '≤', '\\ge': '≥', '\\ne': '≠', '\\to': '→', '\\cdot': '·', '\\times': '×', '\\infty': '∞', '\\emptyset': '∅', '\\in': '∈', '\\cup': '∪', '\\cap': '∩', '\\neg': '¬', '\\land': '∧', '\\lor': '∨', '\\oplus': '⊕', '\\equiv': '≡', '\\not\\equiv': '≢' };
  Object.entries(sym).forEach(([k, v]) => assert.ok(lab('$' + k + '$').replace(/<[^>]+>/g, '') === v, k));
  assert.equal(lab('a, b'), '<tspan x="98.5" >a, b</tspan>', 'no $: exactly as before');
  ['$5 and $10', 'cost: $', '$t0, $t1', 'a#b$c$d'].forEach(t => assert.equal(lab(t).replace(/<[^>]+>/g, ''), t, t));
  const x = lab('then $x_1$ and $y$ end');
  assert.match(x, /^<tspan x="98.5" >then <tspan font-style="italic">x<\/tspan><tspan dy="([\d.]+)" font-size="7.9">1<\/tspan><tspan dy="-\1"> and <\/tspan><tspan font-style="italic">y<\/tspan> end<\/tspan>$/, 'the baseline comes back after a subscript');
  const g = D.render(ckEx('graph — maths in labels')); svgOk(g);
  assert.ok(g.includes('aria-label="An ε-NFA for a*b"'), 'aria text shows the maths as plain characters');
  ['tree — multi-line', 'flow — decision questions'].forEach(n => svgOk(D.render(ckEx(n))));
  const k = D.render({ type: 'kmap', vars: 'AB', m: [1, 3], groups: [{ cells: [1, 3], label: '$\\overline{A}B$' }] }); svgOk(k);
  assert.ok(/text-decoration="overline"/.test(k));
});

/* ---------- nest (nested labelled boxes) ---------- */
test('nest: boxes sit inside their parents, siblings apart, arrows end on box edges', () => {
  ex.filter(e => e.spec.type === 'nest').forEach(e => {
    const M = D.geom.nest(e.spec), out = D.render(e.spec); svgOk(out);
    const inside = (a, b, m) => a.x >= b.x + m - 1e-6 && a.y >= b.y + m - 1e-6 && a.x + a.w <= b.x + b.w - m + 1e-6 && a.y + a.h <= b.y + b.h - m + 1e-6;
    const walk = B => {
      B.kids.forEach(k => { if (!B.ghost) assert.ok(inside(k, B, 10), `${e.name}: ${k.title} inside ${B.title}`); walk(k); });
      B.kids.forEach((k, i) => B.kids.slice(i + 1).forEach(q => assert.ok(k.x + k.w <= q.x || q.x + q.w <= k.x || k.y + k.h <= q.y || q.y + q.h <= k.y, `${e.name}: ${k.title} and ${q.title} overlap`)));
      if (B.dir === 'h' && B.kids.length > 1) { assert.ok(B.kids.every(k => k.y === B.kids[0].y && k.h === B.kids[0].h), 'dir h: one row, equal heights'); }
      B.items.forEach(it => assert.ok(it.y > B.y + 8 && it.y < B.y + B.h, `${e.name}: line inside ${B.title}`));
    };
    walk(M.root);
    const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(out).slice(1).map(Number);
    M.arrows.forEach(a => {
      const p0 = a.pts[0], p1 = a.pts[a.pts.length - 1];
      assert.ok([a.A.B.x, a.A.B.x + a.A.B.w].some(x => Math.abs(x - p0[0]) < 1e-6) && [a.B.B.x, a.B.B.x + a.B.B.w].some(x => Math.abs(x - p1[0]) < 1e-6), `${e.name}: arrow ends on box edges`);
      if (a.pts.length === 4) assert.ok(a.pts[1][0] > M.root.x + M.root.w || a.pts[1][0] < M.root.x, 'side arrows run outside the outer box');
    });
    const gut = M.arrows.filter(a => a.pts.length === 4).map(a => a.pts[1][0]);
    assert.equal(new Set(gut).size, gut.length, `${e.name}: every side arrow has its own lane`);
    assert.ok(M.bb[2] - Math.min(0, M.bb[0] - 8) <= vb[0] + 1e-6, `${e.name}: the figure holds every arrow and label`);
  });
  const c = D.render(ckEx('nest — block scopes'));
  assert.equal((c.match(/class="ns-l"/g) || []).length, 1, 'one highlighted line');
  assert.ok(c.includes('class="dt ns-m"') && c.includes('>int y = x + 1;<'));
  const st = D.render(ckEx('nest — call stack'));
  assert.equal((st.match(/class="ns-b ns-on"/g) || []).length, 1, 'hl box'); assert.ok(/class="ns-a ns-dash"/.test(st));
  assert.equal((st.match(/class="ns-b[ "]/g) || []).length, 3, 'boxes: three frames, no box drawn round them');
  assert.ok(!D.render(ckEx('nest — set containment')).includes('ns-m'), 'mono: false uses the ordinary font');
});
test('nest: options and errors', () => {
  const M = D.geom.nest({ type: 'nest', w: 400, root: { id: 'r', title: 'R', dir: 'h', children: [{ id: 'a', title: 'A', lines: ['x', 'y'] }, { id: 'b', title: 'B' }] }, arrows: [{ from: 'a.2', to: 'b', straight: true }] });
  assert.equal(M.root.w, 384, 'w widens the outer box'); approx(M.ids.a.w, M.ids.b.w, 1e-6);
  const ar = M.arrows[0];
  assert.deepEqual(ar.pts.map(p => p.map(v => Math.round(v))), [[Math.round(M.ids.a.x + M.ids.a.w), Math.round(M.ids.a.items[1].y)], [Math.round(M.ids.b.x), Math.round(M.ids.b.y + 12)]], 'straight: facing edges, line 2 to the title bar');
  const bad = (spec, re) => assert.throws(() => D.render(Object.assign({ type: 'nest' }, spec)), re);
  bad({}, /needs "root"/);
  bad({ root: { id: 'a', children: [{ id: 'a' }] } }, /two boxes are called "a"/);
  bad({ root: { id: 'a.b' } }, /without dots/);
  bad({ root: { id: 'a', lines: ['x'] }, arrows: [{ from: 'a.3', to: 'a' }] }, /has 1 lines and rows/);
  bad({ root: { id: 'a' }, arrows: [{ from: 'a', to: 'zz' }] }, /no box "zz"/);
  bad({ root: { id: 'a', dir: 'x' } }, /dir is "v"/);
  bad({ root: { id: 'a', children: ['oops'] } }, /is not a box/);
  bad({ root: { id: 'a', rows: [5] } }, /row 1 is \["key", "value"\]/);
});

/* ---------- phone re-layout (WP8, audit P1-12) ---------- */
const sizesOf = out => [...out.matchAll(/<text [^>]*font-size="([\d.]+)"/g)].map(m => +m[1]);
const widthOf = out => +/^<svg[^>]* width="([\d.]+)"/.exec(out)[1];
test('phone layout: gantt, plot, memory and layers redraw at the given width with labels of 10.5 px or more', () => {
  assert.deepEqual(D.relayoutTypes.slice().sort(), ['gantt', 'layers', 'memory', 'plot']);
  assert.ok(D.canRelayout({ type: 'plot' }) && !D.canRelayout({ type: 'graph' }) && !D.canRelayout(null));
  const specs = [
    ex[0].spec,
    { type: 'gantt', lanes: 'by-process', title: 'FCFS with a long title that has to wrap on a phone', blocks: [{ p: 'P1', from: 0, to: 3 }, { p: 'P2', from: 3, to: 4 }, { p: 'P3', from: 4, to: 40 }], marks: [{ t: 4, label: 'P2 done' }] },
    { type: 'plot', w: 580, x: [0, 40], y: [0, 300], xlabel: 'n', series: [{ label: 'j from i to n (quadratic)', fn: 'x^2/6' }, { label: 'j += i (n log n)', fn: 'x*log2(x+1)' }, { label: 'linear', fn: '4*x' }] },
    { type: 'memory', orientation: 'h', w: 700, blocks: [{ label: 'Preamble', note: '7 bytes', size: 1.6 }, { label: 'SFD', note: '1', size: 0.8 }, { label: 'Destination', note: '6 bytes', size: 1.5, addr: '8' }, { label: 'Payload (+ pad)', note: '46 to 1500 bytes', size: 3.4 }], brackets: [{ label: 'the frame check covers everything from the destination address to the end of the payload' }] },
    { type: 'memory', w: 580, blocks: [{ label: 'fact(1)', note: 'n = 1: returns 1', addr: 'top of stack' }, { label: 'fact(2)', note: 'n = 2, waiting' }, { label: 'main', kind: 'free' }], brackets: [{ from: 0, to: 1, label: '2 frames' }] },
    { type: 'layers', w: 640, side: [{ label: 'data flows down', arrow: 'down' }], layers: [{ label: '1. Lexical analysis', note: 'characters into tokens; spaces and comments dropped', right: 'token stream' }, { label: 'IR', right: 'x' }] }
  ];
  for (const s of specs) for (const w of [300, 340]) {
    const out = D.render(Object.assign({}, s, { phone: true, w }));
    svgOk(out);
    assert.strictEqual(widthOf(out), w, s.type + ' draws at the width asked for');
    // every label is 10.5 px or more (sub- and superscripts of maths are drawn smaller on purpose; these specs have none)
    sizesOf(out).forEach(z => assert.ok(z >= 10.5, `${s.type} at ${w}: a ${z} px label`));
  }
  // without the flag every kind draws exactly as before
  for (const s of specs) assert.strictEqual(D.render(Object.assign({}, s, { phone: false })), D.render(s));
});
test('phone layout: gantt ticks thin out so their numbers stay apart; a plot legend that would overflow goes under the plot', () => {
  const g = D.render({ type: 'gantt', phone: true, w: 300, blocks: [{ p: 'A', from: 0, to: 40 }], axis: { step: 1 } });
  const xs = [...g.matchAll(/<text x="([\d.]+)" y="[\d.]+" text-anchor="middle" dominant-baseline="central" font-size="10.5" class="dt dtm">/g)].map(m => +m[1]);
  assert.ok(xs.length >= 3 && xs.length <= 15, 'labelled ticks: ' + xs.length);
  for (let i = 1; i < xs.length; i++) assert.ok(xs[i] - xs[i - 1] >= 18, 'tick labels at least 18 px apart');
  const s = { type: 'plot', w: 560, x: [0, 10], series: [{ label: 'first series label', fn: 'x' }, { label: 'second series label', fn: '2*x' }, { label: 'third one', fn: '3*x' }] };
  const wide = D.render(s), narrow = D.render(Object.assign({}, s, { phone: true, w: 320 }));
  assert.ok(+/viewBox="0 0 [\d.]+ ([\d.]+)"/.exec(narrow)[1] > +/viewBox="0 0 [\d.]+ ([\d.]+)"/.exec(wide)[1], 'the legend rows add height under the plot');
});
test('phone layout: a vertical memory map becomes one block per row across the width; layers move a long right label under the name', () => {
  const m = D.render({ type: 'memory', phone: true, w: 320, blocks: [{ label: 'IP', size: 20, addr: '14' }, { label: 'TCP', size: 20, addr: '34' }, { label: 'application data', size: 100, addr: '54' }] });
  const rects = [...m.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" class="nb/g)].map(r => r.slice(1).map(Number));
  assert.strictEqual(rects.length, 3);
  assert.ok(rects.every(r => r[0] === rects[0][0] && r[2] === rects[0][2]), 'same column, same width');
  assert.ok(rects[1][1] > rects[0][1] && rects[2][3] > rects[0][3], 'stacked top to bottom, sizes become heights');
  const l = D.render({ type: 'layers', phone: true, w: 300, layers: [{ label: '3. Semantic analysis', note: 'declarations, types, conversions', right: 'annotated syntax tree' }] });
  assert.ok(/text-anchor="start"[^>]*font-size="10.5" font-weight="650" class="dt dtm"><tspan[^>]*>annotated syntax tree/.test(l), 'the right label sits under the name');
});
test('shapes: numbers on solid fills switch those fills to a text-safe tone; plain solid fills and dice pips do not (P1-14)', () => {
  const lab = D.render({ type: 'shapes', items: [{ kind: 'rect', at: [0, 0], w: 1, h: 1, fill: 'a', solid: true }, { kind: 'rect', at: [1, 0], w: 1, h: 1, fill: 'b', solid: true }, { kind: 'text', at: [0.5, 0.5], t: '1' }] });
  assert.strictEqual((lab.match(/class="sh-solid sh-tx"/g) || []).length, 2, 'every solid fill of that figure');
  const plain = D.render({ type: 'shapes', items: [{ kind: 'rect', at: [0, 0], w: 1, h: 1, fill: 'a', solid: true }, { kind: 'text', at: [3, 3], t: 'outside' }] });
  assert.ok(/class="sh-solid"/.test(plain) && !/sh-tx/.test(plain));
});

/* ---------- label and stroke contrast from the real tokens and rules (WP8, audit P1-14) ---------- */
{
  const fs = require('fs'), path = require('path');
  const base = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'base.css'), 'utf8');
  const content = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'content.css'), 'utf8');
  const lesson = fs.readFileSync(path.join(__dirname, '..', 'app', 'css', 'lesson.css'), 'utf8');
  const block = sel => { const i = base.indexOf(sel + ' {'); return base.slice(i, base.indexOf('}', i)); };
  const toks = b => Object.fromEntries([...b.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]));
  const LIGHT = toks(block(':root')), DARK = Object.assign({}, LIGHT, toks(block('[data-theme="dark"]')));
  const rgb = (v, T) => { v = v.trim(); if (v.startsWith('var(')) return rgb(T[/var\(--([^)]+)\)/.exec(v)[1]], T); if (v[0] === '#') return [1, 3, 5].map(i => parseInt(v.slice(i, i + 2), 16)).concat(1); const p = /\(([^)]+)\)/.exec(v)[1].split(',').map(Number); return [p[0], p[1], p[2], p[3] == null ? 1 : p[3]]; };
  const over = (a, b) => [0, 1, 2].map(i => a[i] * a[3] + b[i] * (1 - a[3])).concat(1);
  const mix = (a, p, b) => [0, 1, 2].map(i => a[i] * p + b[i] * (1 - p)).concat(1);
  const lum = c => c.slice(0, 3).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const SERIES = ['viz-a', 'viz-b', 'viz-c', 'viz-d', 'viz-e', 'viz-f', 'viz-g', 'viz-h', 'ok', 'bad', 'warn'];
  const pct = (src, re) => { const m = re.exec(src); assert.ok(m, 'rule not found: ' + re); return +m[1] / 100; };
  test('contrast: series-coloured diagram text is mixed toward the ink and reads at 4.5:1 or more on the surface and every kit tint', () => {
    const p = pct(content, /:is\(\.vn-t, \.sh-tc, \.ns-t, \.ns-al, \.pfl\)[^{]*\{ fill: color-mix\(in srgb, var\(--c\) (\d+)%, var\(--ink\)\)/);
    // the tints text can sit on: node boxes 20 %, shapes 22 %, nest labels 26 %, venn 30 % (lesson.css)
    const tints = [...lesson.matchAll(/color-mix\(in srgb, var\(--c\) (\d+)%, var\(--surface\)\)/g)].map(m => +m[1] / 100).filter(t => t <= 0.3);
    assert.ok(tints.includes(0.2) && tints.includes(0.3), 'tints found in lesson.css');
    for (const [name, T] of [['light', LIGHT], ['dark', DARK]]) {
      const S = rgb(T.surface, T), INK = rgb(T.ink, T);
      for (const k of SERIES) {
        const c = rgb(T[k], T), text = mix(c, p, INK);
        assert.ok(ratio(text, S) >= 6.3, `${name} ${k} text on the surface: ${ratio(text, S).toFixed(2)}`);
        for (const t of tints) assert.ok(ratio(text, mix(c, t, S)) >= 4.5, `${name} ${k} text on its ${t * 100} % tint: ${ratio(text, mix(c, t, S)).toFixed(2)}`);
      }
    }
  });
  test('contrast: ink on text-carrying solid fills, dark-theme sub-labels on tints, and structural strokes', () => {
    const pl = pct(content, /svg\.dgs \.sh-solid\.sh-tx \{ fill: color-mix\(in srgb, var\(--c\) (\d+)%, var\(--surface\)\)/);
    const pd = pct(content, /\[data-theme="dark"\] svg\.dgs \.sh-solid\.sh-tx \{ fill: color-mix\(in srgb, var\(--c\) (\d+)%, var\(--surface\)\)/);
    for (const [name, T, p] of [['light', LIGHT, pl], ['dark', DARK, pd]]) {
      const S = rgb(T.surface, T), INK = rgb(T.ink, T);
      for (const k of SERIES) assert.ok(ratio(INK, mix(rgb(T[k], T), p, S)) >= 4.5, `${name} ink on the ${k} text-safe solid: ${ratio(INK, mix(rgb(T[k], T), p, S)).toFixed(2)}`);
      // structural strokes: --faint (the older --line-2 was 1.5:1)
      assert.ok(ratio(rgb(T.faint, T), S) >= 3, `${name} faint strokes: ${ratio(rgb(T.faint, T), S).toFixed(2)}`);
      assert.ok(ratio(over(rgb(T['line-2'], T), S), S) < 3, 'the old stroke colour really was too faint');
    }
    assert.match(content, /svg\.dgs \.dg-axis, svg\.dgs \.dg-life \{ stroke: var\(--faint\); \}/);
    assert.match(content, /svg\.dgs \.km-c \{ stroke: var\(--faint\); \}/);
    assert.match(content, /\[data-theme="dark"\] svg\.dgs g\[class\^="k"\] \.dtm, \[data-theme="dark"\] svg\.dgs g\[class\*=" k"\] \.dtm, \[data-theme="dark"\] svg\.dgs \.km-x \{ fill: var\(--ink-2\); \}/);
    const S = rgb(DARK.surface, DARK), INK2 = rgb(DARK['ink-2'], DARK);
    for (const k of SERIES) for (const t of [0.2, 0.22, 0.3]) assert.ok(ratio(INK2, mix(rgb(DARK[k], DARK), t, S)) >= 4.5, `dark ink-2 on ${k} ${t}`);
  });
  test('contrast: labels the kit marks on-tint (a venn universe on its shaded outside, K-map don\'t-cares under highlights and stacked loops) (verifier, P1-14)', () => {
    const vU = shade => /class="([^"]*)"><tspan[^>]*>U<\/tspan>/.exec(D.render({ type: 'venn', sets: ['A', 'B'], universe: true, r: 60, shade, color: 'b' }))[1];
    assert.strictEqual(vU(['!A']), 'dt dtm on-tint', 'the outside is shaded: the U sits on the tint');
    assert.strictEqual(vU(['A&B']), 'dt dtm', 'the outside is not shaded');
    // dl.min.kmap 'BCD digit >= 5': the X at 15 lies under all three loops, 13 and 14 under two, 10, 11, 12 under the A loop only
    const bcd = D.render({ type: 'kmap', vars: 'ABCD', m: [5, 6, 7, 8, 9], d: [10, 11, 12, 13, 14, 15], index: true, groups: [{ term: 'A', color: 'a' }, { term: 'BD', color: 'b' }, { term: 'BC', color: 'c' }] });
    const xs = [...bcd.matchAll(/class="(dt km-x[^"]*)"/g)].map(m => m[1]).sort();
    assert.deepStrictEqual(xs, ['dt km-x on-tint', 'dt km-x on-tint', 'dt km-x on-tint', 'dt km-x on-tint', 'dt km-x on-tint', 'dt km-x on-tint on-tint-3']);
    const free = D.render({ type: 'kmap', vars: 'ABC', m: [0, 1], d: [7], groups: [{ cells: [0, 1] }] });
    assert.match(free, /class="dt km-x"><tspan[^>]*>X</, 'a don\'t-care outside every loop keeps the muted tone');
    assert.match(D.render({ type: 'kmap', vars: 'ABC', m: [0, 1], d: [7], hl: [7] }), /class="dt km-x on-tint"><tspan[^>]*>X</, 'a highlighted cell is a tint');
    // the rules, and the contrast they give on the real tints (lesson.css: venn shading 30 %, highlighted cell 22 %, loop fill 14 % over it)
    assert.match(content, /svg\.dgs \.dtm\.on-tint, svg\.dgs \.km-x\.on-tint \{ fill: var\(--ink-2\); \}/);
    assert.match(content, /\[data-theme="dark"\] svg\.dgs \.km-x\.on-tint-3 \{ fill: var\(--ink\); \}/);
    const vf = pct(lesson, /svg\.dgs \.vn-fill \{ fill: color-mix\(in srgb, var\(--c\) (\d+)%, var\(--surface\)\)/);
    const hf = pct(lesson, /svg\.dgs \.km-c\.km-hl \{ fill: color-mix\(in srgb, var\(--c\) (\d+)%, var\(--surface\)\)/);
    const lf = pct(lesson, /svg\.dgs \.km-gf \{ fill: color-mix\(in srgb, var\(--c\) (\d+)%, transparent\)/);
    const KIT = SERIES.slice(0, 8);
    for (const [name, T] of [['light', LIGHT], ['dark', DARK]]) {
      const S = rgb(T.surface, T), INK = rgb(T.ink, T), INK2 = rgb(T['ink-2'], T), MUTED = rgb(T.muted, T);
      for (const k of KIT) assert.ok(ratio(INK2, mix(rgb(T[k], T), vf, S)) >= 4.5, `${name} U on the ${k} venn shading`);
      // every stack of up to three tints under one cell (a highlight counts as one): the ink the rules give, by depth
      const stacks = [];
      const grow = (bg, d, hlUsed) => { if (d) stacks.push([bg, d]); if (d === 3) return; KIT.forEach(k => grow(mix(rgb(T[k], T), lf, bg), d + 1, hlUsed)); if (!d) KIT.forEach(k => grow(mix(rgb(T[k], T), hf, S), 1, true)); };
      grow(S, 0, false);
      for (const [bg, d] of stacks) {
        const ink = name === 'dark' && d >= 3 ? INK : INK2;
        assert.ok(ratio(ink, bg) >= 4.5, `${name} don't-care under ${d} tint(s): ${ratio(ink, bg).toFixed(2)}`);
      }
      assert.ok(stacks.some(([bg]) => ratio(MUTED, bg) < 4.5), `${name}: the muted tone really failed on some stacks`);
    }
  });
}

/* ---------- WP8 part B: phone memory strips, own arrowheads, descriptions, label sizes (verifier, P2-63, P3-14, P3-10) ---------- */
const rectsOf = out => [...out.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" class="nb[^"]*"/g)].map(r => r.slice(1).map(Number));
test('phone memory, horizontal: the bar wraps in strips, offsets stay above their blocks and widths stay to scale (verifier, P1-12)', () => {
  const spec = { type: 'memory', orientation: 'h', w: 700, blocks: [{ label: 'Ethernet', note: '14 B', size: 14, addr: '0' }, { label: 'IP', note: '20 B', size: 20, addr: '14' }, { label: 'TCP', note: '20 B', size: 20, addr: '34' }, { label: 'application data', note: '100 B', size: 100, addr: '54' }, { label: 'FCS', note: '4 B', size: 6.5, addr: '154' }], brackets: [{ label: '58 of the 158 bytes are headers' }] };
  const out = D.render(Object.assign({}, spec, { phone: true, w: 346, w0: 700 }));
  svgOk(out);
  assert.strictEqual(+/width="([\d.]+)"/.exec(out)[1], 346);
  const r = rectsOf(out);
  assert.ok(r.every(b => b[0] >= 8 - 0.01 && b[0] + b[2] <= 346 - 8 + 0.01), 'every piece inside the strip');
  const ys = [...new Set(r.map(b => b[1]))];
  assert.ok(ys.length >= 2, 'more than one strip: ' + ys.length);
  const [eth, ip, tcp] = r;
  assert.ok(Math.abs(ip[2] - tcp[2]) < 0.01, 'two 20-byte headers draw alike');
  assert.ok(ip[2] / eth[2] > 1.15 && ip[2] / eth[2] <= 20 / 14 + 0.01, 'the 14-byte header is narrower, nearly to scale (no narrower than its label): ' + (ip[2] / eth[2]).toFixed(2));
  const data = r.filter(b => b[2] > 150).reduce((a, b) => a + b[2], 0) + r.filter((b, i) => i > 3 && b[2] < 150 && b[2] > ip[2]).reduce((a, b) => a + b[2], 0);
  assert.ok(data / ip[2] > 4.5 && data / ip[2] < 5.5, 'the 100-byte block is about five 20-byte headers long: ' + (data / ip[2]).toFixed(2));
  // offsets sit above the left edge of their block
  for (const [addr, i] of [['0', 0], ['14', 1], ['34', 2], ['54', 3]]) {
    const t = new RegExp(`<text x="([\\d.]+)" y="([\\d.]+)" text-anchor="start"[^>]*><tspan[^>]*>${addr}</tspan>`).exec(out);
    assert.ok(t && Math.abs(+t[1] - (r[i][0] + 1)) < 0.2 && +t[2] < r[i][1], `offset ${addr} above its block`);
  }
  assert.match(out, /class="nb mm-cut"/, 'a block cut by a strip end says it continues (a dashed open edge)');
  assert.match(out, /data …<\/tspan>|>…<\/tspan>/, 'its next piece says it is continued');
  const sizes = [...out.matchAll(/font-size="([\d.]+)"/g)].map(m => +m[1]);
  assert.ok(sizes.every(z => z >= 10.5), 'labels of 10.5 px or more: ' + sizes.join(','));
  // a map whose labels fit one strip at the column's width stays one bar
  const one = D.render({ type: 'memory', orientation: 'h', phone: true, w: 346, blocks: [{ label: 'header', size: 4, addr: '0' }, { label: 'slot array', size: 5 }, { label: 'free space', size: 9, kind: 'hole' }, { label: 'rec 3', size: 3 }, { label: 'rec 2', size: 4 }, { label: 'rec 1', size: 3 }] });
  assert.strictEqual(new Set(rectsOf(one).map(b => b[1])).size, 1, 'one strip');
  const w1 = rectsOf(one).reduce((a, b) => a + b[2], 0);
  assert.ok(Math.abs(w1 - 330) < 0.5, 'the strip is filled: ' + w1);
});
test('desktop memory, horizontal: the bands above and below the bar are only there for offsets and bracket notes (P3-10)', () => {
  const bare = D.render({ type: 'memory', orientation: 'h', blocks: [{ label: 'a', size: 1 }, { label: 'b', size: 1 }] });
  assert.strictEqual(+/viewBox="0 0 [\d.]+ ([\d.]+)"/.exec(bare)[1], 8 + 8 + 54 + 10, 'was 8 + 24 + 54 + 40');
  const full = D.render({ type: 'memory', orientation: 'h', blocks: [{ label: 'a', size: 1, addr: '0' }, { label: 'b', size: 1 }], brackets: [{ label: 'x' }] });
  assert.strictEqual(+/viewBox="0 0 [\d.]+ ([\d.]+)"/.exec(full)[1], 8 + 24 + 54 + 40);
});
test('each drawing names its own arrowheads, from what it draws, so a render repeats exactly (P2-63)', () => {
  const g1 = D.render({ type: 'graph', nodes: [{ id: 'a', x: 40, y: 40 }, { id: 'b', x: 200, y: 40 }], edges: [{ from: 'a', to: 'b' }] });
  const g2 = D.render({ type: 'graph', nodes: [{ id: 'a', x: 40, y: 40 }, { id: 'c', x: 200, y: 90 }], edges: [{ from: 'a', to: 'c' }] });
  const id1 = /<marker id="ah-([a-z0-9]+)"/.exec(g1)[1], id2 = /<marker id="ah-([a-z0-9]+)"/.exec(g2)[1];
  assert.notStrictEqual(id1, id2, 'two drawings, two marker ids');
  assert.ok([...g1.matchAll(/url\(#([^)]+)\)/g)].every(m => m[1] === 'ah-' + id1 || m[1] === 'ah2-' + id1), 'every reference is to its own marker');
  assert.ok(!/url\(#ah\)/.test(g1) && !/id="ah"/.test(g1));
  assert.strictEqual(D.render({ type: 'graph', nodes: [{ id: 'a', x: 40, y: 40 }, { id: 'b', x: 200, y: 40 }], edges: [{ from: 'a', to: 'b' }] }), g1, 'repeatable');
  assert.ok(!/<marker/.test(D.render({ type: 'array', cells: [1, 2] })), 'a drawing without arrows carries no markers');
  assert.match(g1, /^<svg [^>]*data-dg="graph"/, 'the kind is on the drawing (GA.fit, P2-60)');
});
test('describe: the facts of a drawing in words, for a hidden list beside it (P3-14)', () => {
  const d = s => D.describe(s);
  assert.deepEqual(d({ type: 'gantt', blocks: [{ p: 'P1', from: 0, to: 3 }, { p: 'idle', from: 3, to: 4 }, { p: 'P2', from: 4, to: 6 }], arrivals: [{ p: 'P1', t: 0 }, { p: 'P2', t: 2 }] }),
    { intro: 'Timeline from 0 to 6:', items: ['P1: 0 to 3', 'idle: 3 to 4', 'P2: 4 to 6', 'Arrivals: P1 at 0, P2 at 2'] });
  assert.deepEqual(d({ type: 'memory', orientation: 'h', blocks: [{ label: 'IP', note: '20 B', addr: '14' }, { label: 'hole', kind: 'hole' }] }), { intro: '2 blocks, left to right:', items: ['IP, 20 B, at 14', 'hole, free'] });
  assert.deepEqual(d({ type: 'bits', fields: [{ label: 'tag', bits: 20 }, { label: 'offset', bits: 12, sub: '4 KB page' }] }), { intro: '32 bits:', items: ['tag: 20 bits', 'offset: 12 bits (4 KB page)'] });
  assert.deepEqual(d({ type: 'array', cells: [5, { v: 3, hl: 'a' }], pointers: [{ at: 1, label: 'i' }] }), { intro: '2 cells:', items: ['[0] 5', '[1] 3 (marked)', 'i points to [1]'] });
  const k = d({ type: 'kmap', vars: 'AB', m: [1, 3], groups: [{ term: 'B' }] });
  assert.deepEqual(k, { intro: 'K-map of A, B, cells numbered by minterm:', items: ['1s at 1, 3', 'Group B: cells 1, 3'] });
  assert.deepEqual(d({ type: 'tree', binary: true, root: { label: '50', children: [{ label: '30' }, null] } }), { intro: 'Tree with root 50:', items: ['50: left 30, no right child'] });
  assert.deepEqual(d({ type: 'graph', directed: false, nodes: [{ id: 'a' }, { id: 'b', label: 'B' }], edges: [{ from: 'a', to: 'b', label: '4' }] }), { intro: 'Graph, 2 nodes (a, B), edges:', items: ['a and B (4)'] });
  assert.deepEqual(d({ type: 'seq', lanes: ['Client', 'Server'], events: [{ from: 'Client', to: 'Server', text: 'SYN' }, { note: 'wait', over: ['Server'] }] }), { intro: 'Between Client, Server, in order:', items: ['Client to Server: SYN', 'Note over Server: wait'] });
  assert.deepEqual(d({ type: 'layers', layers: [{ label: 'Application', note: 'HTTP' }, { label: 'Transport' }] }), { intro: '2 layers, top to bottom:', items: ['Application (HTTP)', 'Transport'] });
  assert.strictEqual(d({ type: 'plot', x: [0, 1], series: [] }), null, 'kinds without a useful reading');
  assert.strictEqual(d({ type: 'gantt', alt: 'given', blocks: [{ p: 'A', from: 0, to: 1 }] }), null, "an author's alt wins");
  assert.strictEqual(d({ type: 'kmap', vars: 'Q' }), null, 'a spec the kit rejects has no description');
  // every example of the documented kinds describes without throwing
  ex.forEach(e => { const r = D.describe(e.spec); if (r) assert.ok(typeof r.intro === 'string' && Array.isArray(r.items)); });
});
test('index and secondary labels are 10 px or more (P3-10, P2-60: a lab stage draws at 100 %, so its floor is the drawn size)', () => {
  const b = D.render({ type: 'bits', width: 8, fields: [{ label: 'x', bits: 8, sub: 'low byte' }] });
  assert.ok([...b.matchAll(/font-size="([\d.]+)"/g)].every(m => +m[1] >= 10), 'bits');
  const b32 = D.render({ type: 'bits', width: 32, fields: [{ label: 'tag', bits: 20 }, { label: 'offset', bits: 12 }] });
  assert.ok([...b32.matchAll(/font-size="([\d.]+)"/g)].every(m => +m[1] >= 10), 'bits, 32 wide');
  const k = D.render({ type: 'kmap', vars: 'ABCD', m: [0, 5], index: true });
  assert.ok([...k.matchAll(/font-size="([\d.]+)"[^>]*class="dt dtm km-i"/g)].every(m => +m[1] >= 10) && /km-i/.test(k), 'K-map indices');
  const c = D.render({ type: 'circuit', parts: [{ id: 'm', kind: 'mux', n: 4, at: [120, 80], label: 'MUX' }, { id: 'g', kind: 'and', at: [40, 60], label: 'G1' }] });
  const pl = [...c.matchAll(/font-size="([\d.]+)"[^>]*class="dt ck-pl"/g)].map(m => +m[1]);
  assert.ok(pl.length >= 6 && pl.every(z => z >= 10), 'circuit pin and gate labels: ' + pl.join(','));
});

/* ---------- numbered K-map loops for colour-blind reading (kit option for WP12's lab, audit P2-61) ---------- */
test('numbered K-map loops (number: true, or a group n): one badge per loop in a free top-right cell corner, the legend repeats it, the description says it', () => {
  const spec = { type: 'kmap', vars: 'ABCD', m: [0, 2, 5, 7, 8, 10, 13, 15], index: true, groups: [{ term: "B'D'" }, { term: 'BD' }, { cells: [5, 7] }] };
  assert.ok(!/km-nb/.test(D.render(spec)), 'off by default: lesson maps are unchanged');
  const out = D.render(Object.assign({}, spec, { number: true }));
  svgOk(out);
  const bs = [...out.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="7.5" class="km-nb"\/>/g)].map(m => [+m[1], +m[2]]);
  assert.strictEqual(bs.length, 6, 'three on the map, three in the legend');
  assert.deepEqual([...out.matchAll(/class="dt km-n"><tspan[^>]*>([^<]+)</g)].map(m => m[1]), ['1', '2', '3', '1', '2', '3']);
  const cells = [...out.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" class="km-c[^"]*" data-m="(\d+)"\/>/g)].map(m => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4], t: +m[5] }));
  const cellAt = ([x, y]) => cells.find(c => x > c.x && x < c.x + c.w && y > c.y && y < c.y + c.h);
  const want = [[0, 2, 8, 10], [5, 7, 13, 15], [5, 7]];
  const seen = new Set();
  bs.slice(0, 3).forEach((b, i) => {
    const c = cellAt(b);
    assert.ok(c && want[i].includes(c.t), `badge ${i + 1} sits in a cell of its own loop (cell ${c && c.t})`);
    assert.ok(b[0] - c.x > c.w / 2 && b[1] - c.y < c.h / 2, `badge ${i + 1} is in the top-right quarter (the index is top-left, the value in the middle)`);
    assert.ok(!seen.has(c.t), 'never two badges in one corner'); seen.add(c.t);
  });
  const right = Math.max(...cells.map(c => c.x + c.w)), bottom = Math.max(...cells.map(c => c.y + c.h));
  assert.ok(bs.slice(3).every(b => b[0] > right || b[1] > bottom), 'the legend badges sit outside the map (beside it, or under it)');
  const below = D.render(Object.assign({}, spec, { number: true, legend: 'below' }));
  const bb = [...below.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="7.5" class="km-nb"\/>/g)].map(m => [+m[1], +m[2]]);
  assert.ok(bb.slice(3).every(b => b[1] > bottom) && +/width="([\d.]+)"/.exec(below)[1] < +/width="([\d.]+)"/.exec(out)[1], 'a legend below keeps the map narrow');
  const own = D.render(Object.assign({}, spec, { groups: [{ term: "B'D'", n: 'A' }, { term: 'BD' }] }));
  assert.deepEqual([...own.matchAll(/class="dt km-n"><tspan[^>]*>([^<]+)</g)].map(m => m[1]), ['A', 'A'], "a group's own n numbers it alone");
  const d = D.describe(Object.assign({}, spec, { number: true }));
  assert.ok(d.items.filter(x => /^Group \d, /.test(x)).length === 3, 'the description names each loop by its number: ' + d.items.join(' | '));
  // the number takes the text-safe tone the contrast test checks for series text (65 % toward the ink) on a surface-filled badge
  const content = require('fs').readFileSync(require('path').join(__dirname, '..', 'app', 'css', 'content.css'), 'utf8');
  const series = /:is\(\.vn-t, \.sh-tc, \.ns-t, \.ns-al, \.pfl\)[^{]*\{ fill: color-mix\(in srgb, var\(--c\) (\d+)%, var\(--ink\)\)/.exec(content)[1];
  assert.match(content, new RegExp(`svg\\.dgs \\.dt\\.km-n \\{ fill: color-mix\\(in srgb, var\\(--c\\) ${series}%, var\\(--ink\\)\\); \\}`));
  assert.match(content, /svg\.dgs \.km-nb \{ fill: var\(--surface\);/);
});

/* integration (P1-14, WP8's open flag: ga.spatial.fold 'Three views'): a letter on a shaded die face marks that face sh-ftx, the text-safe tone
   content.css gives it in dark (the lit top face was 3.97:1 under the light ink); pips and unlettered faces keep their plain shading */
test('shapes: a lettered die face carries the text-safe tone class; pips and blank faces do not (P1-14)', () => {
  const svg = D.render({ type: 'shapes', items: [{ kind: 'die', iso: ['A', 2, ''], fill: 'e' }] });
  const classes = [...svg.matchAll(/class="(sh-c[^"]*)"/g)].map(m => m[1]);
  assert.deepEqual(classes, ['sh-ct sh-ftx', 'sh-cl', 'sh-cr'], classes.join(' | '));
  const plain = D.render({ type: 'shapes', items: [{ kind: 'die', iso: [1, 2, 3], fill: 'e' }] });
  assert.ok(!/sh-ftx/.test(plain), 'pips only: unchanged');
  const css = require('fs').readFileSync(require('path').join(__dirname, '..', 'app', 'css', 'content.css'), 'utf8');
  assert.match(css, /\[data-theme="dark"\] svg\.dgs \.sh-ct\.sh-ftx \{ fill: color-mix\(in srgb, var\(--c\) 40%, var\(--surface\)\); \}/);
});
