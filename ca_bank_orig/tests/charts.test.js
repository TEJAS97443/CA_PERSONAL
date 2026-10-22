/* core/charts.js: the SVG chart kit used by the hub screens (owner: hubs). Pure string output, so it is checked here without a browser. */
globalThis.GA = globalThis.GA || {};
const path = require('path');
const C = require('../app/js/core/charts.js');
globalThis.GAD = globalThis.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };
if (!GAD.manifest) require(path.join(__dirname, '..', 'data/manifest.js'));
const subjects = GAD.manifest.main.syllabus.subjects;

test('charts.subj: every syllabus subject has its own glyph; unknown ids fall back to a book; output is a decorative stroke icon', () => {
  const seen = new Set();
  for (const s of subjects) {
    assert.ok(C.subj.ids.includes(s.id), 'glyph for ' + s.id);
    const svg = C.subj(s.id);
    assert.ok(/^<svg class="i sg" viewBox="0 0 24 24" aria-hidden="true">/.test(svg), s.id);
    assert.ok(!/#[0-9a-f]{3,6}\b|hsl\(|rgb\(/i.test(svg), 'no raw colour in ' + s.id);
    seen.add(svg);
  }
  assert.equal(seen.size, subjects.length, 'glyphs are distinct');
  assert.ok(/<path d="M5 4\.5A1\.5/.test(C.subj('nope')), 'fallback');
  assert.ok(C.subj('cma', 'x"y').includes('class="i sg x&quot;y"'), 'extra class is escaped');
  assert.equal(GA.subjIcon, C.subj);
});

test('charts.ring: dash offset encodes the share, clamps to 0..1, carries the circumference for the one-time sweep', () => {
  const r = (pct, o) => C.ring(Object.assign({ size: 60, stroke: 6, pct }, o));
  const circ = 2 * Math.PI * 27, num = (s, a) => +s.match(new RegExp(a + '="([\\d.]+)"'))[1];
  const half = r(0.5);
  approx(num(half, 'stroke-dasharray'), Math.round(circ * 100) / 100, 0.01);
  approx(num(half, 'stroke-dashoffset'), Math.round(circ * 50) / 100, 0.01);
  assert.ok(half.includes(`--rc:${Math.round(circ * 100) / 100}`));
  approx(num(r(2), 'stroke-dashoffset'), 0, 1e-9);
  assert.ok(/opacity="0"/.test(r(0)), 'an empty ring draws no cap dot');
  assert.ok(/<b>7&lt;%<\/b>/.test(r(0.1, { text: '7<%' })), 'text is escaped');
  assert.ok(r(0.3).includes('stroke="var(--accent)"'), 'primary by default');
});

test('charts.radar: dots use the primary token, untouched axes stay hollow', () => {
  const svg = C.radar([{ label: 'A', v: 0.5 }, { label: 'B', v: null }, { label: 'C', v: 1 }]);
  assert.ok(!/hsl\(/.test(svg));
  assert.equal((svg.match(/fill="var\(--accent\)" stroke/g) || []).length, 2);
  assert.equal((svg.match(/fill="var\(--surface\)" stroke="var\(--faint\)"/g) || []).length, 1);
});

test('charts: every value with an SVG <title> also carries the same text as data-ftip, the touch-safe tip (P1-55)', () => {
  const pairs = svg => {
    const out = [], re = /data-ftip="([^"]*)"[^>]*>\s*<title>([^<]*)<\/title>/g; let m;
    while ((m = re.exec(svg))) out.push([m[1], m[2]]);
    return { pairs: out, titles: (svg.match(/<title>/g) || []).length };
  };
  const charts = [
    C.bars([{ label: '2019', v: 9, tip: '2019\n9 marks' }, { label: '2020', v: 0 }]),
    C.line([{ x: '#1', y: 0.4, tip: 'Mock 1: 40/100 <a>' }, { x: '#2', y: 0.55 }]),
    C.radar([{ label: 'OS', v: 0.5, tip: 'OS 50%' }, { label: 'DB', v: null }, { label: 'CN', v: 1 }]),
    C.donut([{ v: 3, color: 'var(--ok)', label: 'right' }, { v: 1, color: 'var(--bad)', label: 'wrong' }])
  ];
  for (const svg of charts) {
    const r = pairs(svg);
    assert.ok(r.titles > 0);
    assert.equal(r.pairs.length, r.titles, 'one data-ftip per <title>: ' + svg.slice(0, 60));
    r.pairs.forEach(([a, b]) => assert.equal(a, b, 'same text'));
  }
  assert.ok(/data-ftip="Mock 1: 40\/100 &lt;a&gt;"/.test(charts[1]), 'escaped');
  const st = C.stack([{ v: 2, color: 'var(--ok)', label: 'right' }, { v: 0, color: 'red', label: 'skip' }]);
  assert.ok(/data-ftip="right: 2"/.test(st) && !/ title=/.test(st), 'stack parts use the tip, not a native title');
});

test('P2-33: a chart with text is never stretched; pixel-true charts carry .px; labels are thinned by the width they have', () => {
  const items = Array.from({ length: 30 }, (_, i) => ({ label: 'Q' + (i + 1), v: i % 7 }));
  const withText = C.bars(items, { w: 300 });
  assert.ok(!/preserveAspectRatio="none"/.test(withText), 'labels are never squeezed');
  assert.ok(/preserveAspectRatio="none"/.test(C.bars(items, { labels: false })), 'a bare bar strip may still fill its box');
  assert.ok(/class="chart px"/.test(C.bars(items, { w: 300, px: true })) && /class="chart"/.test(withText));
  const nLabels = svg => (svg.match(/class="ch-t">Q/g) || []).length;
  assert.ok(nLabels(C.bars(items, { w: 300 })) < nLabels(C.bars(items, { w: 900 })), 'fewer labels on a narrow chart');
  assert.ok(nLabels(C.bars(items, { w: 300 })) <= Math.floor(292 / (3 * 6.9 + 10)) + 1, 'no overlap at 300 px');
  const pts = Array.from({ length: 10 }, (_, i) => ({ x: (i + 1) + ' Oct', y: i / 10 }));
  const xl = svg => (svg.match(/text-anchor="middle" class="ch-t">\d+ Oct/g) || []).length;
  assert.equal(xl(C.line(pts, { w: 900 })), 10); assert.ok(xl(C.line(pts, { w: 300, px: true })) < 10, 'dates thinned at 300 px');
  assert.equal(C.every(10, 900, 6), 1); assert.ok(C.every(30, 300, 3) > 1);
});

test('P2-33: reference lines (time ÷ budget at 1× and 2×, a qualifying mark) are drawn with their labels and kept inside the scale', () => {
  const svg = C.bars([{ label: '1', v: 0.4 }, { label: '2', v: 2.6 }, { label: '3', v: 1.2 }], { w: 400, h: 150, refs: [{ v: 1, label: '1× budget' }, { v: 2, label: '2×' }] });
  assert.equal((svg.match(/class="ch-ref"/g) || []).length, 2);
  assert.ok(/class="ch-t ch-reft">1× budget</.test(svg) && /class="ch-t ch-reft">2×</.test(svg));
  const y = v => +svg.match(new RegExp(`y1="([\\d.]+)"[^>]*class="ch-ref"`, 'g'))[v].match(/y1="([\d.]+)"/)[1];
  assert.ok(y(0) > y(1), 'the 2× line sits above the 1× line');
  const ln = C.line([{ x: '#1', y: 0.2 }, { x: '#2', y: 0.45 }], { w: 320, px: true, yMax: 0.8, refs: [{ v: 0.3, label: 'GATE 2026 qualifying, General: 30' }] });
  assert.ok(/ch-reft">GATE 2026 qualifying, General: 30</.test(ln));
  const lone = C.bars([{ label: 'a', v: 0.2 }], { refs: [{ v: 2, label: '2×' }] });
  const ry = +lone.match(/y1="([\d.-]+)"[^>]*class="ch-ref"/)[1];
  assert.ok(ry >= 0, 'a reference above every bar still fits in the chart');
  assert.equal(typeof C.fit(null, () => ''), 'function', 'fit() without a host is a no-op that returns stop()');
});

/* ---- reference labels beside their lines, out of the data's way (P2-33) ---- */
const refBoxes = svg => {
  const out = [], re = /<text x="([\d.-]+)" y="([\d.-]+)" text-anchor="(start|end)" class="ch-t ch-reft">([^<]*)</g;
  const px = /class="chart px"/.test(svg), fs = px ? 11.5 : 10;
  let m;
  while ((m = re.exec(svg))) {
    const x = +m[1], y = +m[2], lw = m[4].length * fs * 0.6 + 4;
    out.push({ label: m[4], anchor: m[3], x0: m[3] === 'end' ? x - lw : x, x1: m[3] === 'end' ? x : x + lw, y0: y - fs * 0.78, y1: y + fs * 0.26 });
  }
  return out;
};
const inBox = (b, x, y) => x > b.x0 && x < b.x1 && y > b.y0 && y < b.y1;

test('P2-33: a reference label sits where the score line leaves room for it, and is drawn over the data', () => {
  // the My progress case: three sittings at 45%, 25% and 43% around a qualifying mark at 30%; the right end above the line is crossed by the
  // score line, the left end too, so the label goes below the line at the right end
  const pts = [{ x: '#1', y: 0.45 }, { x: '#2', y: 0.25 }, { x: '#3', y: 0.43 }];
  for (const w of [300, 330, 520]) {
    const svg = C.line(pts, { w, h: 180, px: true, yMax: 0.6, refs: [{ v: 0.3, label: 'Qualifying: 30' }] });
    const [b] = refBoxes(svg);
    assert.ok(b && b.label === 'Qualifying: 30', 'label drawn at ' + w);
    assert.ok(svg.lastIndexOf('ch-reft') > svg.indexOf('<polyline'), 'the label comes after the score line, so it is drawn over it');
    const poly = svg.match(/<polyline points="([^"]+)"/)[1].split(' ').map(p => p.split(',').map(Number));
    for (let i = 1; i < poly.length; i++) for (let t = 0; t <= 1.0001; t += 0.01) {
      const x = poly[i - 1][0] + (poly[i][0] - poly[i - 1][0]) * t, y = poly[i - 1][1] + (poly[i][1] - poly[i - 1][1]) * t;
      assert.ok(!inBox(b, x, y), `the score line stays out of the label at ${w} px`);
    }
    const ref = +svg.match(/y1="([\d.]+)"[^>]*class="ch-ref"/)[1];
    assert.ok(Math.min(Math.abs(b.y0 - ref), Math.abs(b.y1 - ref)) <= 7, 'the label stays beside its line');
    assert.ok(b.x0 >= 0 && b.x1 <= w && b.y0 >= 0 && b.y1 <= 180 - 26, 'inside the plot');
  }
  // room at the right end above the line: the label stays there (the old place)
  const calm = C.line([{ x: '#1', y: 0.1 }, { x: '#2', y: 0.12 }], { w: 320, px: true, yMax: 0.6, refs: [{ v: 0.3, label: 'Qualifying: 30' }] });
  const [c] = refBoxes(calm), cy = +calm.match(/y1="([\d.]+)"[^>]*class="ch-ref"/)[1];
  assert.ok(c.anchor === 'end' && c.y1 < cy, 'right end, above the line');
  // no free spot beside the line (a label as wide as the plot): a key in the top margin, right-aligned, where no data is drawn
  const busy = C.line(pts, { w: 300, h: 180, px: true, yMax: 0.6, refs: [{ v: 0.3, label: 'GATE 2026 qualifying, General: 30' }] });
  const [z] = refBoxes(busy), key = busy.match(/<line x1="([\d.]+)" x2="([\d.]+)" y1="([\d.]+)" y2="[\d.]+" class="ch-refk"/);
  assert.ok(z && z.anchor === 'end' && z.x1 <= 300 - 12 && z.y1 <= 18, 'the label sits in the top margin, above the plot');
  const textX = +busy.match(/<text x="([\d.]+)" y="[\d.]+" text-anchor="end" class="ch-t ch-reft">/)[1];
  assert.ok(key && +key[2] < textX - 33 * 11.5 * 0.45 && +key[3] < 18, 'a dashed key, left of the text, says which line it names');
  assert.equal((busy.match(/class="ch-ref"/g) || []).length, 1, 'the key is not counted as a second reference line');
  assert.ok(!/class="ch-refk"/.test(C.line(pts, { w: 330, h: 180, px: true, yMax: 0.6, refs: [{ v: 0.3, label: 'Qualifying: 30' }] })), 'no key while the label fits beside its line');
});

test('P2-33: bar-chart reference labels (1× and 2× the time budget) move off the bars that would stand in the text', () => {
  const items = [{ label: '1', v: 0.5 }, { label: '2', v: 0.8 }, { label: '3', v: 2.7 }, { label: '4', v: 2.5 }];
  const svg = C.bars(items, { w: 300, h: 150, px: true, max: 3, refs: [{ v: 1, label: '1× budget' }, { v: 2, label: '2×' }] });
  const boxes = refBoxes(svg);
  assert.equal(boxes.length, 2);
  const rects = [], re = /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g; let m;
  while ((m = re.exec(svg))) rects.push({ x0: +m[1], x1: +m[1] + +m[3], y0: +m[2], y1: +m[2] + +m[4] });
  for (const b of boxes) for (const r of rects) assert.ok(!(r.x0 < b.x1 && b.x0 < r.x1 && r.y0 < b.y1 && b.y0 < r.y1), `'${b.label}' is clear of every bar`);
  assert.ok(boxes.every(b => b.anchor === 'start'), 'the tall bars are on the right, so both labels sit at the left end');
  assert.ok(!(boxes[0].x0 < boxes[1].x1 && boxes[1].x0 < boxes[0].x1 && boxes[0].y0 < boxes[1].y1 && boxes[1].y0 < boxes[0].y1), 'labels never overlap each other');
});

test('P2-33: fit() draws at the host\'s content box (clientWidth minus its padding), at least o.min, and again on a change of 8 px or more', () => {
  const saved = { document: globalThis.document, gcs: globalThis.getComputedStyle, RO: globalThis.ResizeObserver, raf: globalThis.requestAnimationFrame };
  const frames = [], flush = () => { while (frames.length) frames.shift()(); };
  let observe = null;
  globalThis.document = {};
  globalThis.getComputedStyle = el => el.cs;
  globalThis.ResizeObserver = class { constructor(fn) { observe = fn; } observe() {} disconnect() { observe = null; } };
  globalThis.requestAnimationFrame = fn => { frames.push(fn); return frames.length; };
  try {
    // WP10's trend tile at 390: 334 px with 4 px + 12 px of padding, so the drawing gets 318 (it was drawn at 334 and shown at 318)
    const host = { isConnected: true, clientWidth: 334, cs: { paddingLeft: '4px', paddingRight: '12px' }, innerHTML: '' }, drawn = [];
    const stop = C.fit(host, w => { drawn.push(w); return `<svg viewBox="0 0 ${w} 100"></svg>`; }, { min: 260 });
    assert.deepEqual(drawn, [318], 'the content box, not clientWidth');
    assert.equal(host.innerHTML, '<svg viewBox="0 0 318 100"></svg>');
    host.clientWidth = 330; observe(); flush();
    assert.deepEqual(drawn, [318], 'a 4 px change is not redrawn');
    host.clientWidth = 290; observe(); observe(); flush();
    assert.deepEqual(drawn, [318, 274], 'one redraw per frame however many resize callbacks');
    host.clientWidth = 200; observe(); flush();
    assert.deepEqual(drawn, [318, 274, 260], 'never under o.min (the SVG then scales down instead)');
    host.clientWidth = 0; observe(); flush();
    assert.equal(drawn.length, 3, 'a host with no layout (a closed fold) is not drawn');
    stop();
    assert.equal(observe, null, 'stop() lets go of the observer');
    // no padding, no computed style: clientWidth as it is; the default minimum is 300
    const bare = { isConnected: true, clientWidth: 512, cs: { paddingLeft: '0px', paddingRight: '0px' }, innerHTML: '' }, d2 = [];
    C.fit(bare, w => { d2.push(w); return ''; })();
    globalThis.getComputedStyle = undefined;
    const old = { isConnected: true, clientWidth: 250, innerHTML: '' }, d3 = [];
    C.fit(old, w => { d3.push(w); return ''; })();
    assert.deepEqual([d2, d3], [[512], [300]]);
  } finally {
    Object.assign(globalThis, { document: saved.document, getComputedStyle: saved.gcs, ResizeObserver: saved.RO, requestAnimationFrame: saved.raf });
    for (const k of ['document', 'getComputedStyle', 'ResizeObserver', 'requestAnimationFrame']) if (globalThis[k] === undefined) delete globalThis[k];
  }
});
