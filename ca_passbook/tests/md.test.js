globalThis.GA = globalThis.GA || {};
const katex = require('../vendor/katex/katex.min.js'); globalThis.katex = katex;
const md = require('../app/js/core/md.js');

test('inline basics', () => {
  assert.equal(md.inline('a **b** *c* `d<e>`'), 'a <strong>b</strong> <em>c</em> <code>d&lt;e&gt;</code>');
  assert.match(md.inline('x $a^2$ y'), /<span class="m"/);
  assert.match(md.inline('cost is \\$5 and $x$'), /\$5/);
  assert.ok(!md.inline('<script>alert(1)</script>').includes('<script>'));
});
test('math failure degrades gracefully', () => {
  assert.match(md.inline('$\\frac{1}{$'), /m-err|m"/);
});
test('code spans protect markup', () => {
  assert.equal(md.inline('`**not bold**`'), '<code>**not bold**</code>');
});
test('headings, lists, tables', () => {
  const h = md.render('## Title\n\n- a\n- b\n  - c\n\n1. x\n2. y\n\n| h1 | h2 |\n|---|:-:|\n| 1 | 2 |');
  assert.match(h, /<h2 id="title">Title<\/h2>/);
  assert.match(h, /<ul><li>a<\/li><li>b<ul><li>c<\/li><\/ul><\/li><\/ul>/);
  assert.match(h, /<ol><li>x<\/li><li>y<\/li><\/ol>/);
  assert.match(h, /<th class="kc">h1<\/th><th class="kc" style="text-align:center">h2<\/th>/);   // "h1" has a digit: shown as typed, not "H1"
});
test('callouts and nesting', () => {
  const h = md.render('::: trick Fast way\nuse **this**\n:::\n\n:::: example Demo\ntext\n::: answer\nforty-two\n:::\n::::');
  assert.match(h, /co co-trick/);
  assert.match(h, /class="ex"/);
  assert.match(h, /<details class="rev rev-answer"><summary>Show answer<\/summary>/);
});
test('code fences are highlighted and escaped', () => {
  const h = md.render('```c\nint main() { /* x */ return 0; }\n```');
  assert.match(h, /<span class="k">int<\/span>/);
  assert.match(h, /<span class="c">\/\* x \*\/<\/span>/);
});
test('quiz block parsing', () => {
  const qs = md.parseQuiz('Q: 2+2?\n- [ ] 3\n- [x] 4\n> because\n\nQ: pi to one decimal?\n= 3.1');
  assert.equal(qs.length, 2);
  assert.deepEqual(qs[0].opts.map(o => o.ok), [false, true]);
  assert.equal(qs[1].ans, '3.1');
  const h = md.render('::: quiz Warm-up\nQ: 2+2?\n- [ ] 3\n- [x] 4\n:::', { lessonId: 'x.y' });
  assert.match(h, /class="ga-quiz fit-late"/, 'the self-check is fitted wherever the lesson page moves it (GA.fit.all fits .fit-late blocks)');
  assert.match(h, /data-key="B"/);
});
test('sections wrapper', () => {
  const h = md.render('intro\n\n## One\nx\n\n## Two\ny', { sections: true });
  assert.equal((h.match(/<section class="lsec"/g) || []).length, 2);
});
test('toText strips markup', () => {
  assert.equal(md.toText('**Hi** `x` $y$ [[os.a|link]]'), 'Hi x link');
});
test('table inside container inside list does not crash', () => {
  md.render('::: compare\n| a | b |\n|---|---|\n| 1 | 2 |\n:::\n\n- item\n\n  more');
});

test('table cells: bars inside maths, code and [[id|label]] links do not split the row', () => {
  const md = globalThis.GA.md;
  const html = md.render('| a | b |\n|---|---|\n| $|x|$ | `p|q` |\n| [[os.sched.rr|Round Robin]] | c \\| d |');
  const rows = html.split('<tr>').slice(1);
  assert.strictEqual(rows.length, 3);
  rows.forEach(r => assert.strictEqual((r.match(/<t[dh]/g) || []).length, 2, r));
  assert.ok(/c \| d/.test(html), 'escaped bar is a literal bar');
});

test('table cells: currency dollars do not swallow the next column', () => {
  const md = globalThis.GA.md;
  const html = md.render('| item | cost |\n|---|---|\n| tea $5 | coffee $7 |');
  const row = html.split('<tr>')[2];
  assert.strictEqual((row.match(/<td/g) || []).length, 2, row);
});

test('code highlighting: plain text is not coloured, -- is a comment only in SQL', () => {
  const md = globalThis.GA.md;
  const t = md.render('```text\n-rw-r--r-- 1 asha  # not a comment\n```');
  assert.ok(!/class="c"/.test(t), t);
  const c = md.render('```c\nint x; // yes\n```');
  assert.ok(/class="c"/.test(c));
  const q = md.render('```sql\nSELECT 1 -- yes\n```');
  assert.ok(/class="c"/.test(q));
  const p = md.render('```python\nx = 1 -- y\n```');
  assert.ok(!/class="c">--/.test(p));
});

test('table headers: only ordinary words are capitalised; maths, symbols, digits and variables keep their case', () => {
  const md = globalThis.GA.md;
  ['i = 1', 'ε', 'q0', 'µs', 'Time (ms)', "x'", 'n^2', 'a_i', 'Value of $n$', 'x-coordinate', 'Step 1', 'δ(q, a)', 'Read/Write', 'SR max W', 'a', 'is a key']
    .forEach(h => assert.strictEqual(md.headKeep(h), true, h));
  ['Process', 'Burst time', 'Arrival, burst', '**Total**', '*state*', 'Non-preemptive', 'CPU', 'P1', '$n$', '`fork()` calls', '`x`', '', '—', 'Ω', 'Phase<br>one', '[[os.sched.rr|Round robin]] cost']
    .forEach(h => assert.strictEqual(md.headKeep(h), false, h));
  const h = md.render('| i = 1 | Process | ε | $q_0$ | Time (µs) |\n|---|---|---|---|---|\n| 1 | 2 | 3 | 4 | 5 |');
  assert.match(h, /<th class="kc">i = 1<\/th><th>Process<\/th><th class="kc">ε<\/th><th>/);
  assert.match(h, /<th class="kc">Time \(µs\)<\/th>/);
  assert.ok(!/<td class="kc"/.test(h), 'body cells are never marked');
});
test('diagram table: column heads and rowLabels use the same header rule', () => {
  require('../app/js/viz/diagram.js');
  const out = globalThis.GA.diagram.render({ type: 'table', head: ['state', 'a', 'b'], rows: [['q0', 'q1', 'q0'], ['ε', 'x', 'y'], ['Start', 'p', 'q']], rowLabels: true, cells: { '1,0': 'hl' } });
  assert.match(out, /<th>state<\/th><th class="kc">a<\/th><th class="kc">b<\/th>/);
  assert.match(out, /<th scope="row" class="kc">q0<\/th>/);
  assert.match(out, /<th scope="row" class="tc-hl kc">ε<\/th>/);
  assert.match(out, /<th scope="row">Start<\/th>/);
  assert.match(out, /<td>q1<\/td>/);
});

/* ---------- WP8 (audit P0-16, P0-17, P0-18, P1-11, P1-12, P1-13) ---------- */
test('maths: KaTeX writes MathML for screen readers, the TeX stays in data-tex, no aria-label (P0-18)', () => {
  const h = md.inline('the page size is $P = 2^d$');
  assert.match(h, /<span class="m" data-tex="P = 2\^d"><span class="katex"><span class="katex-mathml"><math/);
  assert.match(h, /<span class="katex-html" aria-hidden="true">/);
  assert.ok(!/aria-label/.test(h), 'no aria-label on maths: screen readers read the MathML');
  const d = md.render('$$a^2 + b^2 = c^2$$');
  assert.match(d, /<div class="mblock"><span class="m md" data-tex="a\^2 \+ b\^2 = c\^2"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math/);
  assert.match(md.inline('$x < y$'), /data-tex="x &lt; y"/, 'TeX is escaped in the attribute');
});
test('maths: renders are memoised per KaTeX object, so a linter stub never sees or leaves real output (P1-11)', () => {
  const a = md.inline('$\\sum_{i=1}^{n} i$'), b = md.inline('$\\sum_{i=1}^{n} i$');
  assert.strictEqual(a, b);
  const real = globalThis.katex;
  let calls = 0;
  globalThis.katex = { renderToString: () => { calls++; return '⟦M⟧'; } };
  try {
    assert.strictEqual(md.inline('$\\sum_{i=1}^{n} i$'), '<span class="m" data-tex="\\sum_{i=1}^{n} i">⟦M⟧</span>');
    md.inline('$\\sum_{i=1}^{n} i$');
    assert.strictEqual(calls, 1, 'the stub is memoised too, separately');
  } finally { globalThis.katex = real; }
  assert.strictEqual(md.inline('$\\sum_{i=1}^{n} i$'), a, 'back to the real renderer: the real output');
  assert.match(md.inline('$\\frac{1}{$'), /m-err/, 'errors still show as errors');
});
test('maths: display TeX splits only at top-level \\qquad (P0-17)', () => {
  const S = md.splitQquad;
  assert.deepEqual(S('a = b, \\qquad c = d.'), ['a = b,', 'c = d.']);
  assert.deepEqual(S('x \\qquad y \\qquad z'), ['x', 'y', 'z']);
  assert.strictEqual(S('a \\quad b'), null, 'never at \\quad');
  assert.strictEqual(S('\\text{a \\qquad b}'), null, 'never inside braces');
  assert.strictEqual(S('\\begin{gathered} a \\qquad b \\\\ c \\end{gathered}'), null, 'never inside an environment');
  assert.strictEqual(S('\\left( a \\qquad b \\right)'), null, 'never inside \\left … \\right');
  assert.strictEqual(S('a \\qquad b \\\\ c'), null, 'not when the formula has its own rows');
  assert.strictEqual(S('a & b \\qquad c'), null, 'not with alignment');
  assert.strictEqual(S('a \\qquad b \\tag{1}'), null, 'not with a tag');
  assert.strictEqual(S('\\color{red} a \\qquad b'), null, 'not with a colour switch');
  assert.strictEqual(S('a \\qquad'), null, 'one part is nothing to split');
  assert.deepEqual(S('f\\!\\left(\\frac{n}{b}\\right), \\qquad \\text{depth} = \\log_b n'), ['f\\!\\left(\\frac{n}{b}\\right),', '\\text{depth} = \\log_b n']);
  const h = md.render('$$S(m) = 2S(m/2) + m, \\qquad S(1) = 1.$$');
  assert.match(h, /<span class="m md mrows" data-tex="S\(m\) = 2S\(m\/2\) \+ m, \\qquad S\(1\) = 1\.">/);
  assert.strictEqual((h.match(/<span class="mrow"><span class="katex-display">/g) || []).length, 2);
  // a part that cannot stand alone falls back to the formula as written
  const f = md.render('$$x^\\qquad{2}$$');
  assert.ok(!/mrows/.test(f) && /class="m md"|m-err/.test(f), f.slice(0, 120));
});
test('tables: prose tables are flagged for row cards on phones (P1-13)', () => {
  const P = md.proseTable;
  assert.strictEqual(P(['a', 'b'], [['x'.repeat(60), 'y']]), false, 'two columns never');
  assert.strictEqual(P(['Delete', 'What happens', 'After'], [['a key', 'the leaf underflows, so we borrow from a sibling or merge with it', 'one level less']]), true);
  assert.strictEqual(P(['n', '1/2', '1', '3/2'], [['1', '2', '3', '4'], ['5', '6', '7', '8']]), false, 'numbers are not prose');
  assert.strictEqual(P(['a', 'b', 'c'], [['$\\frac{a}{b} + \\frac{c}{d}$', 'x', 'y']]), false, 'maths counts a third of its TeX');
  const h = md.render('| Problem | Sort key | A small change that defeats greedy |\n|---|---|---|\n| activity selection | finish time | give each activity a value (weighted) |');
  assert.match(h, /<div class="tw" data-prose="1"><table>/);
  assert.match(md.render('| a | b | c |\n|---|---|---|\n| 1 | 2 | 3 |'), /<div class="tw"><table>/);
});
test('self-check NAT box: ± key and a message slot, and the GATE keypad rule for what can be typed (P0-16)', () => {
  const h = md.render('::: quiz\nQ: the answer?\n= -2\n:::', { lessonId: 'x.y' });
  assert.match(h, /<div class="qz-nat"><input type="text" inputmode="decimal"[^>]*aria-label="Numerical answer"><button type="button" class="qz-pm" data-nat-pm aria-label="Add or remove the minus sign">±<\/button><span class="qz-nat-msg" aria-live="polite"><\/span><\/div>/);
  const C = md.natClean;
  assert.strictEqual(C('12abc'), '12');
  assert.strictEqual(C('-0.5'), '-0.5');
  assert.strictEqual(C('−2'), '-2', 'the typographic minus');
  assert.strictEqual(C('1.2.3'), '1.23', 'one decimal point');
  assert.strictEqual(C('5-3'), '53', 'a minus only in front');
  assert.strictEqual(C('0,75'), '075', 'a comma is never a decimal point (the box says so)');
  assert.strictEqual(C(' 4 2 '), '42');
});
test('diagrams: kinds the kit can redraw at phone width keep their spec on the figure (P1-12)', () => {
  require('../app/js/viz/diagram.js');
  const spec = { type: 'gantt', blocks: [{ p: 'P1', from: 0, to: 4 }, { p: 'P2', from: 4, to: 7 }], caption: 'x' };
  const h = md.render('::: diagram Round robin\n' + JSON.stringify(spec) + '\n:::');
  const m = /<figure class="dg dg-gantt" data-diagram="gantt" data-spec="([^"]*)">/.exec(h);
  assert.ok(m, h.slice(0, 160));
  const back = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'));
  assert.deepEqual(back, Object.assign({}, spec, { title: '', alt: 'Round robin' }), 'the kept spec draws without its title (HTML above it, P2-18)');
  assert.ok(!/data-spec/.test(md.render('::: diagram\n{"type":"graph","nodes":[{"id":"a","x":1,"y":1}],"edges":[]}\n:::')), 'other kinds do not');
  assert.ok(!/data-spec/.test(md.render('::: diagram\n{"type":"gantt","w":320,"blocks":[{"p":"A","from":0,"to":2}]}\n:::')), 'nor a figure narrow enough already');
});
test('GA.fit decisions: figures keep 80 %, redraw when they can, maths steps to 85 / 75 %, prose tables become cards under 600 px', () => {
  const F = require('../app/js/core/fit.js').plan;
  assert.deepEqual(F.figure({ W: 640, avail: 600 }), { mode: 'fit' });
  assert.deepEqual(F.figure({ W: 640, avail: 512 }), { mode: 'fit' }, 'exactly 80 %');
  assert.deepEqual(F.figure({ W: 640, avail: 330 }), { mode: 'wide', minWidth: 512 });
  assert.deepEqual(F.figure({ W: 640, base: 560, avail: 540 }), { mode: 'wide', minWidth: 560 }, "the kit's own minimum wins");
  assert.deepEqual(F.figure({ W: 640, avail: 330, relayout: true }), { mode: 'relayout', w: 330, wide: false });
  assert.deepEqual(F.figure({ W: 640, avail: 334, relayout: true, fitW: 330 }), { mode: 'relayout', w: 330, same: true, wide: false }, 'small moves keep the drawing');
  assert.deepEqual(F.figure({ W: 640, avail: 200, relayout: true }), { mode: 'relayout', w: 240, wide: true }, 'never drawn narrower than 240 px');
  assert.deepEqual(F.figure({ W: 640, avail: 0 }), { mode: 'skip' }, 'hidden: left for later');
  assert.deepEqual(F.maths({ natural: 300, avail: 400 }), { scale: 1, wide: false });
  assert.deepEqual(F.maths({ natural: 440, avail: 400 }), { scale: 0.9, wide: false });
  assert.deepEqual(F.maths({ natural: 520, avail: 400 }), { scale: 0.85, wide: true }, 'desktop floor 85 %');
  assert.deepEqual(F.maths({ natural: 520, avail: 400, phone: true }), { scale: 0.76, wide: false });
  assert.deepEqual(F.maths({ natural: 716, avail: 328, phone: true }), { scale: 0.75, wide: true }, 'phone floor 75 %, then it scrolls');
  assert.strictEqual(F.table({ natural: 900, avail: 340, prose: true, cols: 3 }), 'cards', 'a prose table that would scroll');
  assert.strictEqual(F.table({ natural: 330, avail: 340, prose: true, cols: 4 }), 'cards', 'four columns of prose');
  assert.strictEqual(F.table({ natural: 330, avail: 340, prose: true, cols: 3, rowH: 120 }), 'cards', 'rows of five lines and more');
  assert.strictEqual(F.table({ natural: 330, avail: 340, prose: true, cols: 3, rowH: 44 }), 'fit', 'a short prose table stays a table');
  assert.strictEqual(F.table({ natural: 0, avail: 380, prose: true, cols: 3, cards: true }), 'cards', 'cards stay cards on a phone');
  assert.strictEqual(F.table({ natural: 900, avail: 690, prose: true, cols: 4, cards: true }), 'wide', 'back to a table at 600 px and up');
  assert.strictEqual(F.table({ natural: 900, avail: 340 }), 'wide');
  assert.strictEqual(F.table({ natural: 340, avail: 340 }), 'fit');
  assert.strictEqual(F.texFits(4, 20, 150), true);
  assert.strictEqual(F.texFits(40, 20, 150), false);
});
test('sections: a lesson renders one H2 part at a time and the parts join to the whole render (P1-11)', () => {
  const src = 'intro $x$\n\n## One\ntext\n\n```c\n## not a heading\n```\n\n::: example Demo\n## inside a box\n:::\n\n### sub\n\n## Two\n$$a \\qquad b$$';
  const ps = md.sections(src, { lessonId: 't' });
  assert.deepEqual(ps.map(p => p.id), ['', 'one', 'two']);
  assert.match(ps[1].html, /^<section class="lsec" id="s-one" data-sec="one"><h2 id="one" data-sec="one">One<\/h2>/);
  assert.ok(ps[1].html.includes('## not a heading') && ps[1].html.includes('inside a box'), 'fences and ::: blocks never split');
  const flat = s => s.replace(/\n/g, '');
  // (render() would cut a section at the H2 inside the ::: box; lessons have none, so for them the two agree exactly)
  const fs = require('fs'), path = require('path'), dir = path.join(__dirname, '..', 'content', 'subjects');
  // the fixture lesson (every container), plus up to three shipped lessons once the writers have some
  const real = fs.existsSync(dir) ? [].concat(...fs.readdirSync(dir).filter(d => fs.statSync(path.join(dir, d)).isDirectory())
    .map(d => fs.readdirSync(path.join(dir, d)).filter(f => f.endsWith('.md')).map(f => path.join(dir, d, f)))).sort().slice(0, 3) : [];
  for (const f of [path.join(__dirname, 'fixtures', 'lesson-sample.md')].concat(real)) {
    const body = fs.readFileSync(f, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
    assert.strictEqual(flat(md.sections(body, { lessonId: f }).map(p => p.html).join('')), flat(md.render(body, { sections: true, lessonId: f })), f);
  }
});

/* ---------- WP8 part B (verifier flags, P2-18, P2-19, P3-14, P3-37) ---------- */
test('maths in words: what a screen reader says for a formula that names a control (P0-18)', () => {
  const S = md.speak;
  assert.strictEqual(S('n^2'), 'n squared');
  assert.strictEqual(S('2^n'), '2 to the n');
  assert.strictEqual(S('2^{2^n}'), '2 to the (2 to the n)');
  assert.strictEqual(S('2^{n^2}'), '2 to the (n squared)');
  assert.strictEqual(S('\\Theta(\\log n)'), 'Theta (log n)');
  assert.strictEqual(S('\\frac{n(n+1)}{2}'), '(n (n plus 1)) over 2');
  assert.strictEqual(S('\\log_2 n'), 'log base 2 n');
  assert.strictEqual(S('x_{i+1} \\le y'), 'x sub (i plus 1) less than or equal to y');
  assert.strictEqual(S('\\sum_{i=1}^{n} i'), 'the sum from i equals 1 to n of i');
  assert.strictEqual(S('R \\mathbin{⟕} S'), 'R left outer join S');
  assert.strictEqual(S('|\\text{Student}|'), '| Student |');
  assert.strictEqual(S('f^{-1}(x)'), 'f inverse (x)');
  assert.strictEqual(S('\\{0, 1\\}^*'), '{0, 1} star');
  assert.strictEqual(S('\\sqrt{n}'), 'the square root of n');
  assert.strictEqual(S('-0.5'), 'minus 0.5');
  assert.strictEqual(S(''), '');
  assert.strictEqual(S('\\unknowncommand x'), 'unknowncommand x', 'an unknown command is said by its name');
});
test('maths in a control label: the drawing plus its words, no MathML (P0-18)', () => {
  const h = md.inline('$n^2$', { label: true });
  assert.match(h, /^<span class="m" data-tex="n\^2" data-said="1"><span class="katex"><span class="katex-html" aria-hidden="true">/);
  assert.match(h, /<span class="sr m-say"> n squared <\/span><\/span>$/);
  assert.ok(!/<math/.test(h), 'no MathML: Chrome would leave it out of the name anyway');
  assert.match(md.inline('$n^2$'), /<math/, 'running text keeps its MathML');
  const q = md.render('::: quiz\nQ: Which grows fastest?\n- [ ] $n^2$\n- [x] $2^n$\n:::', { lessonId: 'x.y' });
  assert.strictEqual((q.match(/data-said="1"/g) || []).length, 2, 'self-check options are labels');
  assert.match(q, /<span class="qz-k">B<\/span><span class="qz-t"><span class="m" data-tex="2\^n" data-said="1">/);
  assert.ok(!/<div class="qz-s">[\s\S]*data-said[\s\S]*<div class="qz-opts">/.test(q), 'the stem keeps MathML');
});
test('a short formula keeps the punctuation after it on its line (P2-18)', () => {
  assert.match(md.inline('LCM $+r$, LCM $-k$, HCF'), /<span class="m-nw"><span class="m" data-tex="-k">[\s\S]*?<\/span>,<\/span> HCF/);
  assert.match(md.inline('as in ($x$)'), /<span class="m-nw">\(<span class="m"[\s\S]*?\)<\/span>/, 'brackets on both sides');
  assert.match(md.inline('an $n$-bit adder'), /<span class="m-nw"><span class="m" data-tex="n">[\s\S]*?<\/span>-bit<\/span> adder/);
  assert.ok(!/m-nw/.test(md.inline('plain $x$ text')), 'nothing to keep together');
  assert.ok(!/m-nw/.test(md.inline('$' + 'a + '.repeat(10) + 'b$,')), 'a long formula still breaks between its terms');
  assert.ok(!/m-nw/.test(md.inline('`x`, y')), 'code is not maths');
});
test('figures: the title is HTML above the drawing, which keeps it as its name; a hidden list says what it shows (P2-18, P3-14)', () => {
  require('../app/js/viz/diagram.js');
  const h = md.render('::: diagram Round robin, $q = 2$\n{"type":"gantt","blocks":[{"p":"P1","from":0,"to":2},{"p":"P2","from":2,"to":5}],"caption":"x"}\n:::');
  assert.match(h, /^<figure class="dg dg-gantt" data-diagram="gantt" data-spec="[^"]*"><div class="dg-tt" aria-hidden="true">Round robin, <span class="m" data-tex="q = 2">/);
  assert.match(h, /data-spec="[^"]*&quot;title&quot;:&quot;&quot;,&quot;alt&quot;:&quot;Round robin, \$q = 2\$&quot;/, 'the kept spec redraws without the title');
  assert.match(h, /<svg class="dgs"[^>]* role="img" aria-label="Round robin, q = 2"/);
  assert.ok(!/class="dt dtt"/.test(h), 'no title inside the drawing');
  assert.match(h, /<\/svg><div class="sr dg-sr">Timeline from 0 to 5:<ul><li>P1: 0 to 2<\/li><li>P2: 2 to 5<\/li><\/ul><\/div><figcaption>x<\/figcaption><\/figure>$/);
  const a = md.render('::: diagram\n{"type":"gantt","alt":"Three processes, round robin","blocks":[{"p":"P1","from":0,"to":2}]}\n:::');
  assert.ok(!/dg-sr/.test(a) && /aria-label="Three processes, round robin"/.test(a), "an author's alt names the drawing and stands alone");
  const t = md.render('::: diagram States\n{"type":"table","head":["a","b"],"rows":[["1","2"]]}\n:::');
  assert.match(t, /<div class="tw dg-table"><div class="dg-tt">States<\/div>/, 'a table keeps its own title');
  assert.ok(!/<div class="dg-tt" aria-hidden/.test(t));
});
test('code: programs come one span per line with their indent, so long lines wrap under it; text blocks keep their columns (P2-19)', () => {
  const h = md.render('```c\nint main() {\n    /* a long\n       comment */\n\n\treturn 0;\n}\n```');
  assert.match(h, /^<div class="code code-w"><pre><code class="lang-c">/);
  const lines = [...h.matchAll(/<span class="cl"(?: style="--i:(\d+)")?>/g)].map(m => +(m[1] || 0));
  assert.deepEqual(lines, [0, 4, 7, 0, 4, 0], 'one span per line, a tab counts four columns');
  assert.match(h, /<span class="cl" style="--i:4">    <span class="c">\/\* a long<\/span>\n<\/span><span class="cl" style="--i:7"><span class="c">       comment \*\/<\/span>/, 'a comment over two lines is closed and reopened');
  assert.match(h, /<span class="n">0<\/span>;\n<\/span><span class="cl">}<\/span><\/code>/, 'every line ends in its newline but the last');
  assert.strictEqual(md.codeLines('a\nb', 'a\nb'), '<span class="cl">a\n</span><span class="cl">b</span>');
  const t = md.render('```text\n0101 | 1100\n```');
  assert.match(t, /^<div class="code"><pre><code class="lang-text">0101 \| 1100<\/code><\/pre><\/div>$/, 'text blocks unchanged');
  assert.match(md.render('```sql\nSELECT 1\n```'), /code code-w/);
  assert.match(md.render('```pseudo\nfor i\n```'), /code code-w/);
});
test('KaTeX has no metrics for the outer-join signs: their warning stays off the console and they are listed (P3-37)', () => {
  const warn = console.warn, seen = [];
  console.warn = m => seen.push(String(m));
  try {
    const h = md.inline('$R \\mathbin{⟖} S$');
    assert.match(h, /⟖/);
  } finally { console.warn = warn; }
  assert.ok(!seen.some(m => /No character metrics/.test(m)), seen.join(' | '));
  assert.ok(md.glyphs().includes('⟖'));
});
test('display-maths lint: says why a top-level \\qquad cannot split, or a part cannot stand alone (P0-17, for tools/lint_content.js)', () => {
  const L = md.displayLint;
  assert.strictEqual(L('a = b, \\qquad c = d.'), null, 'splits fine');
  assert.strictEqual(L('\\frac{p \\vee A \\qquad \\neg p \\vee B}{A \\vee B}'), null, 'a \\qquad inside braces is spacing');
  assert.strictEqual(L('\\begin{aligned} a &= b \\qquad x \\\\ c &= d \\end{aligned}'), null, 'inside an environment too');
  assert.match(L('a \\qquad b \\tag{1}'), /cannot split[\s\S]*\\tag/);
  assert.match(L('a & b \\qquad c'), /alignment/);
  assert.match(L('a \\qquad b \\\\ c'), /own rows/);
  assert.match(L('x^\\qquad{2}'), /does not render on its own/);
  assert.strictEqual(L('a + '.repeat(40) + 'b'), null, 'a long formula is not reported by default');
  assert.match(L('a + '.repeat(40) + 'b', { long: 90 }), /long display formula/);
  // the lessons as they are: nothing to report
  const fs = require('fs'), path = require('path'), dir = path.join(__dirname, '..', 'content', 'subjects');
  const bad = [];
  for (const s of fs.readdirSync(dir)) for (const f of fs.readdirSync(path.join(dir, s))) if (f.endsWith('.md'))
    for (const m of fs.readFileSync(path.join(dir, s, f), 'utf8').matchAll(/\$\$([\s\S]+?)\$\$/g)) { const w = L(m[1]); if (w) bad.push(f + ': ' + w); }
  assert.deepEqual(bad, []);
});
