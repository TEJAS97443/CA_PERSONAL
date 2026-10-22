/* Audit Sampling Lab (app/js/labs/sampling.js): SA 530 as the Study Material teaches it (Paper 5, Ch 4 §3, pp. 4.44–4.67), real ICAI
   questions with their Suggested Answers, and brute-force checks on random inputs. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const S = require('../app/js/labs/sampling.js');
const { randomPick, systematicPick, musPick, haphazardPick, blockPick, parseStarts, parseAmounts, ledger, tableWidth, sizeEffect, stratify, compute, def, FACTORS } = S;
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const V = over => Object.assign(L._defaults(def), over);
const preset = re => { const p = def.presets.find(x => re.test(x.label)); assert.ok(p, 'preset ' + re); return V(p.values); };

/* ---------------------------------------------------------------- systematic (interval) selection */
test('sampling: PYQ May 2026, Q1(b) (Ocean Ltd): 100 of 1,000 accounts from account 5: interval 10, picks 5, 15, …, 995 (Suggested Answer)', () => {
  const r = systematicPick(1000, 100, 5, 1, 1);
  assert.equal(r.k, 10, '"10 is the sampling interval in given situation (1000/100)"');
  assert.equal(r.picks.length, 100);
  assert.deepEqual(r.picks.slice(0, 4), [5, 15, 25, 35]);
  assert.equal(r.picks[99], 995);
  const res = compute(preset(/PYQ May 2026, Q1\(b\) \(Ocean/));
  assert.equal(res.stats.find(s => s.label === 'Sampling interval').value, '10');
  assert.ok(res.frames.length <= 120);
});
test('sampling: MTP Sep 2025 Series I, Q5: 20 confirmations from 100 receivables, every 5th: population, interval, sample = 100, 5, 20, key (a)', () => {
  const v = preset(/MTP Sep 2025 Series I/), r = compute(v).sim;
  assert.deepEqual([v.pop, r.k, r.picks.length], [100, 5, 20]);
  assert.ok(r.starts[0] >= 1 && r.starts[0] <= 5, 'one balance chosen at random, then every 5th');
});
test('sampling: MTP May 2025 Series II, Q3: every 11th of 550 creditors gives 50 balances: systematic sampling, key (b)', () => {
  const r = compute(preset(/MTP May 2025 Series II, Q3/)).sim;
  assert.equal(r.k, 11); assert.equal(r.picks.length, 50); assert.ok(r.picks.every(x => x <= 550));
  assert.equal(def.controls.find(c => c.id === 'method').options.find(o => o[0] === 'systematic')[1], 'Systematic (interval)');
});
test('sampling: MTP Sep 2024 Series II, Q1(b): software picking every 10th of 1,000 records is systematic, interval 1000/100 = 10', () => {
  assert.equal(systematicPick(1000, 100, 0, 1, 7).k, 10);
});
test('sampling: a pattern that matches the interval puts all or none of its items in the sample; two random starts break the lock-step (SM p. 4.62)', () => {
  const one = compute(preset(/one café and the interval is 10/)).sim;
  assert.ok(one.hits === 0 || one.hits === 10, 'one start: all or none');
  for (let seed = 1; seed < 300; seed++) { const h = systematicPick(100, 10, 0, 1, seed).picks.filter(x => x % 10 === 0).length; assert.ok(h === 0 || h === 10); }
  const two = compute(preset(/two random starts/)).sim;
  assert.equal(two.m, 2); assert.equal(two.picks.length, 10);
  assert.ok(two.hits > 0 && two.hits < 10, 'the example shows a mixed sample');
});
test('sampling: systematic selection on 3,000 random cases: n distinct picks, inside the population, each run steps by starts × interval', () => {
  const r = lcg(5);
  for (let k = 0; k < 3000; k++) {
    const n0 = 1 + Math.floor(r() * 60), m = 1 + Math.floor(r() * 4), n = n0 * m, N = Math.min(2000, n + Math.floor(r() * 1500));
    if (N < 10) continue;
    const x = systematicPick(N, n, 0, m, 1 + Math.floor(r() * 999));
    assert.equal(x.picks.length, n); assert.equal(new Set(x.picks).size, n);
    assert.ok(x.picks.every(p => p >= 1 && p <= N));
    assert.equal(x.k, Math.floor(N / n)); assert.equal(x.K, x.k * m);
    x.starts.forEach(s => { assert.ok(s >= 1 && s <= x.K); for (let i = 0; i < x.per; i++) assert.ok(x.picks.includes(s + i * x.K)); });
  }
});

/* ---------------------------------------------------------------- simple random selection */
test('sampling: the random number table is read in d-digit numbers; for 100 vouchers two digits with 00 = 100', () => {
  assert.deepEqual(tableWidth(100), { d: 2, zeroIs: 100 });
  assert.deepEqual(tableWidth(150), { d: 3, zeroIs: null });
  assert.deepEqual(tableWidth(1000), { d: 3, zeroIs: 1000 });
  const r = randomPick(100, 4, 1, '37 92 37 00 05');
  assert.deepEqual(r.picks, [37, 92, 100, 5], '37 repeats and is skipped; 00 stands for 100');
  assert.deepEqual(r.draws.map(t => t.why), ['ok', 'ok', 'repeat', 'ok', 'ok']);
  const q = randomPick(50, 2, 1, '73 07 51 50');
  assert.deepEqual(q.picks, [7, 50]);
  assert.throws(() => randomPick(50, 3, 1, '73 07'), /ran out/);
  assert.throws(() => randomPick(50, 3, 1, '7a'), /digits only/);
});
test('sampling: simple random selection gives every voucher an equal chance (4,000 draws, brute force)', () => {
  const N = 50, count = Array(N + 1).fill(0);
  for (let seed = 1; seed <= 4000; seed++) randomPick(N, 5, seed).picks.forEach(x => count[x]++);
  const exp = (4000 * 5) / N;
  for (let x = 1; x <= N; x++) assert.ok(Math.abs(count[x] - exp) < 0.25 * exp, `voucher ${x}: ${count[x]} vs ${exp}`);
  for (let seed = 1; seed <= 300; seed++) { const p = randomPick(150, 12, seed).picks; assert.equal(new Set(p).size, 12); assert.ok(p.every(x => x >= 1 && x <= 150)); }
});

/* ---------------------------------------------------------------- monetary unit sampling */
test('sampling: monetary unit sampling hits the voucher whose cumulative range holds each point; vouchers at or above the interval are always picked (SM p. 4.56)', () => {
  const a = [5000, 60000, 2000, 150000, 3000, 30000];          // total 2,50,000; n = 5 → interval 50,000
  const r = musPick(a, 5, 20000, 1);
  assert.equal(r.total, 250000); assert.equal(r.J, 50000);
  assert.deepEqual(r.points.map(x => x.p), [20000, 70000, 120000, 170000, 220000]);
  assert.deepEqual(r.points.map(x => x.v), [2, 4, 4, 4, 5], 'the ₹1,50,000 voucher holds three points; rupee 2,20,000 is the last rupee of voucher 5');
  assert.deepEqual(r.picks, [2, 4, 5]); assert.deepEqual(r.sure, [2, 4]);
  const rnd = lcg(9);
  for (let k = 0; k < 1500; k++) {
    const N = 2 + Math.floor(rnd() * 60), amts = Array.from({ length: N }, () => Math.floor(rnd() * (rnd() < 0.1 ? 500000 : 30000))), n = 1 + Math.floor(rnd() * N);
    if (amts.reduce((s, x) => s + x, 0) < n) continue;
    const m = musPick(amts, n, 0, 1 + Math.floor(rnd() * 999));
    assert.equal(m.points.length, n);
    m.points.forEach(x => { let c = 0, v = 0; for (let i = 0; i < N; i++) { c += amts[i]; if (c >= x.p) { v = i + 1; break; } } assert.equal(x.v, v, 'linear scan agrees'); });
    m.sure.forEach(v => assert.ok(m.picks.includes(v), 'an item at least the interval is always picked'));
    assert.ok(m.start >= 1 && m.start <= m.J);
  }
});
test('sampling: RTP Jan 2025, Q1 key (c): random number tables = random, no structure = haphazard, selection by value = monetary unit, first 200 invoices = block', () => {
  /* the lab's value-weighted selection makes large items the likeliest picks, the point of ICAI's monetary unit answer */
  const a = ledger(40), J = Math.floor(a.reduce((s, x) => s + x, 0) / 12), big = a.map((x, i) => (x >= J ? i + 1 : 0)).filter(Boolean);
  for (let seed = 1; seed < 50; seed++) big.forEach(v => assert.ok(musPick(a, 12, 0, seed).picks.includes(v)));
  const block = blockPick(1000, 200, [1]); assert.deepEqual([block.picks[0], block.picks[199]], [1, 200]);
  assert.ok(def.controls.find(c => c.id === 'method').options.map(o => o[0]).join() === 'random,systematic,mus,haphazard,block');
});

/* ---------------------------------------------------------------- haphazard and block */
test('sampling: RTP May 2025, Q3 key (c): no structured approach is haphazard selection; the lab says it is not for statistical sampling', () => {
  const res = compute(preset(/RTP May 2025, Q3/));
  assert.equal(res.stats.find(s => s.label === 'Statistical?').value, 'No');
  assert.match(res.frames[res.frames.length - 1].caption, /not appropriate for statistical sampling/);
  const h = haphazardPick(60, 8, 6); assert.equal(new Set(h.picks).size, 8);
});
test('sampling: PYQ Sep 2024, Q1(b)(ii): 50 consecutive cheques is block selection; PYQ May 2026, Q1(b)(iii): the first 150 accounts (Suggested Answers)', () => {
  const a = compute(preset(/PYQ Sep 2024, Q1\(b\)\(ii\)/)).sim;
  assert.equal(a.picks.length, 50); assert.ok(a.picks.every((x, i) => !i || x === a.picks[i - 1] + 1), 'contiguous');
  const b = compute(preset(/PYQ May 2026, Q1\(b\)\(iii\)/)).sim;
  assert.deepEqual([b.picks[0], b.picks[149]], [1, 150]);
  const four = blockPick(1000, 200, parseStarts('1, 301, 601, 901'));
  assert.deepEqual(four.blocks, [[1, 50], [301, 350], [601, 650], [901, 950]], 'SM p. 4.64: four blocks of 50');
  assert.throws(() => blockPick(100, 30, [1, 10]), /overlap/);
  assert.throws(() => blockPick(100, 30, [90]), /runs past/);
  assert.throws(() => blockPick(100, 31, [1, 50]), /divide/);
});

/* ---------------------------------------------------------------- sample size factors (SA 530 Appendix, SM pp. 4.57–4.60) */
test('sampling: PYQ Jan 2026, Q2 key (B) and MTP Sep 2024 Series I, Q8 key (a): a higher tolerable misstatement decreases the sample', () => {
  assert.equal(sizeEffect('tod', 'tolerable', 'up').effect, 'smaller');
  assert.equal(compute(preset(/PYQ Jan 2026, Q2/)).sim.effect, 'smaller');
  assert.equal(compute(preset(/MTP Sep 2024 Series I, Q8/)).sim.effect, 'smaller');
});
test('sampling: PYQ May 2026, Q3(a)(ii): Beta (6% expected deviation) needs the larger sample than Alpha (2%) (Suggested Answer)', () => {
  assert.equal(sizeEffect('toc', 'expected', 'up').effect, 'larger');
  assert.equal(sizeEffect('toc', 'expected', 'down').effect, 'smaller');
});
test('sampling: PYQ Sep 2025, Q5 key (C): more reliance on controls INCREASES the tests-of-controls sample, so "decrease" is the incorrect statement', () => {
  assert.equal(sizeEffect('toc', 'reliance', 'up').effect, 'larger');
  assert.equal(sizeEffect('toc', 'tolerable', 'up').effect, 'smaller', 'option (B) is correct');
  assert.equal(sizeEffect('toc', 'expected', 'up').effect, 'larger', 'option (D) is correct');
  assert.equal(sizeEffect('toc', 'risk', 'down').effect, 'larger', 'option (A): the lower the risk accepted, the greater the sample');
});
test('sampling: every factor matches the Study Material\'s list, and reversing a factor reverses its effect (negligible stays negligible)', () => {
  const want = { toc: { reliance: 'larger', tolerable: 'smaller', expected: 'larger', assurance: 'larger', risk: 'smaller', units: 'negligible' },
    tod: { romm: 'larger', other: 'smaller', assurance: 'larger', tolerable: 'smaller', expected: 'larger', strata: 'smaller', risk: 'smaller', units: 'negligible' } };
  for (const t of ['toc', 'tod']) {
    assert.deepEqual(Object.fromEntries(FACTORS[t].map(f => [f.id, f.up])), want[t]);
    FACTORS[t].forEach(f => { const u = sizeEffect(t, f.id, 'up').effect, d = sizeEffect(t, f.id, 'down').effect; assert.equal(d, u === 'larger' ? 'smaller' : u === 'smaller' ? 'larger' : 'negligible'); });
  }
});

/* ---------------------------------------------------------------- stratification (SM pp. 4.55, 4.61–4.62) */
test('sampling: the Study Material\'s five groups: all of the top group, 25%, 10%, then 2% of the lowest', () => {
  const R = stratify(preset(/receivables in five groups/).strata);
  assert.deepEqual(R.S.map(s => s.pct), [100, 25, 10, 5, 2]);
  assert.deepEqual(R.S.map(s => s.take), [6, 3, 3, 4, 8]);
  assert.equal(R.take, 24); assert.equal(R.count, 528);
  assert.ok(R.valueShare > 3 * R.itemShare, 'effort goes to the larger balances');
});
test('sampling: stratification on 2,000 random cases: each group takes ⌈count × %⌉, never more than it has; totals add up', () => {
  const r = lcg(13);
  for (let k = 0; k < 2000; k++) {
    const g = 2 + Math.floor(r() * 4), rows = Array.from({ length: g }, (_, i) => [`G${i}`, 1 + Math.floor(r() * 500), 1e5 + Math.floor(r() * 1e8), 1 + Math.floor(r() * 100)]);
    const R = stratify(rows);
    R.S.forEach(s => { assert.equal(s.take, Math.ceil((s.count * s.pct) / 100 - 1e-9)); assert.ok(s.take >= 1 && s.take <= s.count); });
    assert.equal(R.take, R.S.reduce((a, s) => a + s.take, 0));
    assert.ok(R.covered <= R.value + 1e-6);
  }
  assert.throws(() => stratify([['only one', 10, 100, 10]]), /at least two/);
  assert.throws(() => stratify([['a', 10, 100, 0], ['b', 5, 100, 10]]), /percentage/);
});

/* ---------------------------------------------------------------- inputs, drawings and the challenge */
test('sampling: plain-language errors and forgiving amounts', () => {
  assert.throws(() => compute(V({ method: 'random', pop: 50, n: 60 })), /larger than the population/);
  assert.throws(() => compute(V({ method: 'random', pop: 5 })), /from 10/);
  assert.throws(() => compute(V({ method: 'systematic', pop: 100, n: 10, start: 11 })), /first interval: 1 to 10/);
  assert.throws(() => compute(V({ method: 'systematic', pop: 100, n: 10, starts: 3 })), /divide by 3/);
  assert.throws(() => compute(V({ method: 'mus', pop: 500, n: 10, amounts: '' })), /up to 200/);
  assert.deepEqual(parseAmounts('12,500\n4,800, 1,20,000;700'), [12500, 4800, 120000, 700]);
  assert.throws(() => parseAmounts('12,500\nabc'), /not an amount/);
});
test('sampling: the defaults and every example compute and draw, with at most 120 frames, each with a caption', () => {
  for (const v of [L._defaults(def)].concat(def.presets.map(p => V(p.values)))) {
    const res = compute(L.prepare(def, v));
    assert.ok(res.frames.length >= 3 && res.frames.length <= 120, `${res.frames.length} frames`);
    res.frames.forEach(f => { assert.ok(f.caption.length > 15); f.view.forEach(x => diagram.render(x)); });
  }
  assert.ok(def.presets.filter(p => /(MTP|RTP|PYQ) [A-Z][a-z]{2} \d{4}/.test(p.label)).length >= 6, 'ICAI examples named in their labels');
});
test('sampling: a grid never exceeds 10 × 10 cells: one per voucher up to 100, bands beyond', () => {
  const g1 = compute(V({ method: 'systematic', pop: 100, n: 10 })).frames[0].view[0];
  assert.equal(g1.rows.length, 10); assert.equal(g1.rows[0].length, 10); assert.deepEqual(g1.rows[0], ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  const g2 = compute(V({ method: 'systematic', pop: 2000, n: 40 })).frames[0].view[0];
  assert.ok(g2.rows.length <= 10 && g2.rows.every(r => r.length === 11));
});
test('sampling: the challenge answers come from the same compute as the stage, and agree with an independent working', () => {
  const r = lcg(21), modes = [['select', 'systematic'], ['select', 'random'], ['select', 'mus'], ['select', 'block'], ['size'], ['strata']];
  for (let k = 0; k < 360; k++) {
    const [mode, method] = modes[k % modes.length];
    compute(V(Object.assign({ mode }, method ? { method, pop: 40, n: 8 } : {})));   // Test yourself follows the mode (and method) being explored
    const g = def.challenge.gen(r), v = L.prepare(def, V(g));
    assert.equal(v.mode, mode);
    let res; try { res = compute(v); } catch (e) { continue; }
    const want = def.challenge.solve(res, v);
    if (v.mode === 'select' && v.method === 'systematic') assert.equal(want, v.start + (v.ask - 1) * Math.floor(v.pop / v.n));
    if (v.mode === 'select' && v.method === 'block') { const st = parseStarts(v.blocks).sort((a, b) => a - b); assert.equal(want, st[v.ask - 1] + v.n / st.length - 1); }
    if (v.mode === 'select' && v.method === 'random') {
      const nums = String(v.digits).trim().split(/\s+/).map(Number), seen = [];
      for (const x of nums) { const y = x === 0 && v.pop === 100 ? 100 : x; if (y >= 1 && y <= v.pop && !seen.includes(y)) seen.push(y); if (seen.length === v.ask) break; }
      assert.equal(want, seen[v.ask - 1]);
    }
    if (v.mode === 'strata') assert.equal(want, v.strata.reduce((s, row) => s + Math.ceil((row[1] * row[3]) / 100 - 1e-9), 0));
    if (v.mode === 'size') assert.ok(['larger', 'smaller', 'negligible'].includes(want));
    assert.ok(def.challenge.explain(res, v).length > 10);
  }
});
