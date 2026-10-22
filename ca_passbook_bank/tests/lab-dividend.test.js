/* Dividend Models Lab (app/js/labs/dividend.js): the ICAI Study Material's illustrations (Paper 6A, Chapter 8), real ICAI questions with
   their Suggested Answers, identities on random inputs, the frames and the challenge. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const LAB = require('../app/js/labs/dividend.js');
const { walterPrice, walterPayoutFor, gordonPrice, gordonRetentionFor, mm, compute, def } = LAB;
const dflt = () => Object.fromEntries(def.controls.map(c => [c.id, c.value]));
const run = v => compute(Object.assign(dflt(), v));
const preset = re => { const p = def.presets.find(x => re.test(x.label)); assert.ok(p, 'preset ' + re); return run(p.values); };
const r2 = x => Math.round(x * 100) / 100;
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };
const stat = (res, re) => { const s = res.stats.find(x => re.test(x.label)); assert.ok(s, 'stat ' + re); return s.value; };
const caps = res => res.frames.map(f => f.caption).join('\n');

/* ---------------------------------------------------------------- Study Material illustrations */
test('SM Ill. 2 (Walter, E ₹10, r 12%, Ke 10%): optimum payout 0% at ₹120; ₹115, ₹110, ₹105, ₹100 at 25/50/75/100% payout', () => {
  assert.equal(walterPrice(10, 0.12, 0.10, 0), 120);
  [[2.5, 115], [5, 110], [7.5, 105], [10, 100]].forEach(([D, P]) => approx(walterPrice(10, 0.12, 0.10, D), P, 1e-9));
  const res = preset(/Ill\. 2/);
  assert.equal(res.optimum, 0); approx(res.optPrice, 120); approx(res.price, 115);
  assert.deepEqual(res.table.rows.map(r => r[2]), ['₹120', '₹115', '₹110', '₹105', '₹100']);
  assert.equal(stat(res, /Optimum payout/), '0%');
});
test('SM Ill. 3 (Walter, E ₹6, r 20%, Ke 16%): a ₹42 price needs D = ₹3.12, a 52% payout', () => {
  const t = walterPayoutFor(6, 0.20, 0.16, 42);
  assert.ok(t.ok); approx(t.D, 3.12, 1e-9); approx(t.payout, 0.52, 1e-9);
});
test('SM Ill. 4 (Gordon, E ₹6, r 20%, Ke 16%): ₹150 at 25% payout, ₹50 at 50%, ₹37.50 at 100%', () => {
  approx(gordonPrice(6, 0.20, 0.16, 0.75), 150, 1e-9); approx(gordonPrice(6, 0.20, 0.16, 0.5), 50, 1e-9); approx(gordonPrice(6, 0.20, 0.16, 0), 37.5, 1e-9);
  const res = preset(/Ill\. 4/);
  assert.deepEqual(res.table.rows.map(r => r[3]), ['undefined', '₹150', '₹50', '₹40.91', '₹37.50']);   // 0% payout: g = 20% > Ke, the formula breaks down
  assert.equal(res.optimum, 0);
  assert.match(caps(res), /Payout 0%: b = 100%, so g = 100% × 20% = 20% is not below Ke = 16%/);
});
test('SM Ill. 5–7 (constant-growth form) agree with E(1 − b)/(Ke − br) when D0(1 + g) = E(1 − b) and g = br', () => {
  // Ill. 7: D0 ₹2, g 5%, Ke 15% -> ₹21; g 8% -> ₹30.86; g 3% -> ₹17.17. Take E = D1/(1 − b) with b = 0.5, r = g / b.
  for (const [g, P] of [[0.05, 21], [0.08, 30.86], [0.03, 17.17]]) { const D1 = 2 * (1 + g), b = 0.5; assert.equal(r2(gordonPrice(D1 / (1 - b), g / b, 0.15, b)), P); }
  approx(gordonPrice(2 * 1.02 / 0.5, 0.04, 0.15, 0.5), 15.6923, 1e-4);              // Ill. 6: ₹15.69
});
test('SM Ill. 1 (MM, AB Engineering): P1 ₹110 / ₹105, Δn 909.09 / 1,428.57 shares, value ₹10,00,000 in both cases', () => {
  const A = mm(10000, 100, 0.10, 0, 100000, 200000), B = mm(10000, 100, 0.10, 5, 100000, 200000);
  approx(A.P1, 110); approx(B.P1, 105); approx(A.funds, 100000); approx(B.funds, 150000);
  approx(A.dn, 100000 / 110); approx(B.dn, 150000 / 105); approx(A.value, 1000000, 1e-6); approx(B.value, 1000000, 1e-6);
  const res = preset(/Ill\. 1/);
  assert.equal(stat(res, /Value of the firm/), '₹10,00,000'); assert.equal(stat(res, /New shares \(dividend paid\)/), '1,428.57'); assert.equal(stat(res, /New shares \(not paid\)/), '909.09');
});
test('SM Example 2 (Dev Ltd, MM): 2 lakh shares at ₹10, Ke 10%, ₹3 dividend, nothing retained: P1 ₹11 / ₹8, 75,000 new shares, value ₹20,00,000', () => {
  const A = mm(200000, 10, 0.10, 0, 0, 0), B = mm(200000, 10, 0.10, 3, 0, 0);
  approx(A.P1, 11); approx(B.P1, 8); approx(B.dn, 75000); approx(B.value, 2000000, 1e-6); approx(A.value, 2000000, 1e-6);
});

/* ---------------------------------------------------------------- real ICAI questions with their Suggested Answers */
test('PYQ Jan 2025 Q1(c) (LP Ltd): EPS ₹7, Walter price ₹51.33 at 50% payout; the payout for ₹48 is 85.714%', () => {
  const res = preset(/PYQ Jan 2025/);
  assert.equal(r2(res.price), 51.33); assert.equal(stat(res, /Price at 50% payout/), '₹51.33');
  approx(res.target.D, 6, 1e-9); assert.equal(Math.round(res.target.payout * 100000) / 1000, 85.714);
  assert.equal(stat(res, /Payout for ₹48/), '85.71%');
  assert.match(caps(res), /\[₹3\.50 \+ \(0\.18\/0\.15\) × \(₹7 − ₹3\.50\)\] \/ 0\.15 = \[₹3\.50 \+ ₹4\.20\] \/ 0\.15 = \*\*₹51\.33\*\*/);
});
test('PYQ May 2026 Q3(a) (K Ltd): EPS ₹6, Walter at 20% retention ₹45.33; ₹60 needs D = ₹1.50, retention 75%; Gordon optimum 0% (r > Ke)', () => {
  const res = preset(/PYQ May 2026/);
  assert.equal(r2(res.price), 45.33); approx(res.target.D, 1.5, 1e-9); approx(1 - res.target.payout, 0.75, 1e-9);
  assert.match(caps(res), /retention 75%/);
  const g = run({ model: 'gordon', eps: 6, r: 25, ke: 15, payout: 80, target: 0 });
  assert.equal(g.optimum, 0); assert.equal(stat(g, /Optimum payout/), '0%');
});
test('PYQ May 2025 Q2(b) (H Ltd): EPS ₹3, r 20%, Ke 15%: Walter maximum ₹26.67 (D = 0), minimum ₹20 (D = E)', () => {
  const res = preset(/PYQ May 2025/);
  assert.equal(r2(res.optPrice), 26.67); assert.equal(r2(walterPrice(3, 0.2, 0.15, 3)), 20);
  assert.match(caps(res), /Highest price ₹26\.67 \(and the lowest, ₹20, at 100%\)/);
});
test('PYQ Sep 2025 Q2(b) (Saraswati Ltd): EPS ₹10, Ke 8%, r 12%, Gordon price ₹159.09 -> b = 0.30, payout 70%, DPS ₹7; r = Ke has no optimum', () => {
  const res = preset(/PYQ Sep 2025/);
  assert.ok(res.target.ok); assert.equal(r2(res.target.b), 0.3); assert.equal(r2(res.target.payout * 100), 70);
  assert.match(caps(res), /dividend of ₹7 per share/);
  const eq = run({ model: 'gordon', eps: 10, r: 8, ke: 8, payout: 50, target: 0 });
  assert.equal(eq.optimum, null); assert.equal(stat(eq, /Optimum payout/), 'none');
});
test('PYQ Jan 2026 Q1(c) (PQR Ltd): Gordon D0 ₹10, g 20%, Ke 25% -> ₹240; MM P1 = 240 × 1.25 − 12 = ₹288; the earnings that keep nP0 ₹24,00,000 with 1,000 new shares and ₹5,00,000 invested: ₹3,32,000', () => {
  const D1 = 10 * 1.2, b = 0.5;                                  // the growth form: E(1 − b) = D1 and g = br = 20%
  approx(gordonPrice(D1 / (1 - b), 0.2 / b, 0.25, b), 240, 1e-9);
  const P1 = mm(10000, 240, 0.25, 12, 0, 0).P1; approx(P1, 288);
  // nP0 = [(n + Δn)P1 − I + E] / (1 + Ke)  ->  E = nP0(1 + Ke) − (n + Δn)P1 + I
  approx(10000 * 240 * 1.25 - 11000 * 288 + 500000, 332000, 1e-6);
  // and the lab's MM identity: with E = ₹3,32,000 and the ₹12 dividend, the funds to raise buy exactly 1,000 shares at ₹288
  const B = mm(10000, 240, 0.25, 12, 332000, 500000 + 0); approx(B.funds, 500000 - (332000 - 120000)); approx(B.dn, 1000);
});
test('RTP May 2024 Q6 (MCO Ltd, MM): 1,00,000 shares at ₹20, Ke 15%, E ₹5,20,000, I ₹7,50,000: P1 ₹23 / ₹20.50, Δn 10,000 / 23,414.63, value ₹20,00,000', () => {
  const res = preset(/RTP May 2024/);
  approx(res.noDiv.P1, 23); approx(res.div.P1, 20.5); approx(res.noDiv.funds, 230000); approx(res.div.funds, 480000);
  approx(res.noDiv.dn, 10000); assert.equal(r2(res.div.dn), 23414.63);
  approx(res.noDiv.value, 2000000, 1e-6); approx(res.div.value, 2000000, 1e-6);
  const last = res.frames[res.frames.length - 2].view[0];
  assert.equal(last.rows[8][1], '₹23,00,000 / 1.15 = **₹20,00,000**');
});

/* ---------------------------------------------------------------- identities and brute force on random inputs */
test('Walter on 3000 random firms: the price is linear in D, flat when r = Ke, and the optimum payout is the best of 101 payouts (0%, 100% or any)', () => {
  const rnd = lcg(7);
  for (let i = 0; i < 3000; i++) {
    const E = 1 + Math.floor(rnd() * 40), k = 0.05 + Math.floor(rnd() * 20) / 100, r = rnd() < 0.15 ? k : Math.max(0, k + (Math.floor(rnd() * 21) - 10) / 100);
    const P = q => walterPrice(E, r, k, E * q), grid = Array.from({ length: 101 }, (_, j) => P(j / 100));
    approx(P(0.5), (P(0) + P(1)) / 2, 1e-9);                                       // linear
    approx(P(1), E / k, 1e-9);                                                      // full payout: E / Ke
    const res = run({ model: 'walter', eps: E, r: r * 100, ke: k * 100, payout: 50, target: 0 });
    const best = Math.max(...grid);
    if (Math.abs(r - k) < 1e-12) { assert.equal(res.optimum, null); assert.ok(grid.every(x => Math.abs(x - E / k) < 1e-9)); }
    else { assert.equal(res.optimum, r > k ? 0 : 1); approx(res.optPrice, best, 1e-9); approx(P(res.optimum), best, 1e-9); }
  }
});
test('Walter and Gordon backwards: the payout found for a target price gives that price back (2000 random cases)', () => {
  const rnd = lcg(99);
  let w = 0, gd = 0;
  for (let i = 0; i < 2000; i++) {
    const E = 1 + Math.floor(rnd() * 30), k = 0.06 + Math.floor(rnd() * 15) / 100, r = Math.max(0.01, k + (Math.floor(rnd() * 13) - 6) / 100), q = Math.floor(rnd() * 101) / 100;
    if (Math.abs(r - k) < 1e-12) continue;
    const tw = walterPayoutFor(E, r, k, walterPrice(E, r, k, E * q));
    assert.ok(tw.ok); approx(tw.payout, q, 1e-9); w++;
    const P = gordonPrice(E, r, k, 1 - q);
    if (P == null || q === 0) continue;
    const tg = gordonRetentionFor(E, r, k, P);
    assert.ok(tg.ok, JSON.stringify({ E, r, k, q })); approx(tg.payout, q, 1e-9); gd++;
  }
  assert.ok(w > 1500 && gd > 800);
});
test('Gordon on 3000 random firms: needs Ke > br; price rises as payout falls when r > Ke, falls when r < Ke, constant E / Ke when r = Ke', () => {
  const rnd = lcg(3);
  for (let i = 0; i < 3000; i++) {
    const E = 1 + Math.floor(rnd() * 40), k = 0.05 + Math.floor(rnd() * 20) / 100, r = rnd() < 0.15 ? k : Math.max(0, k + (Math.floor(rnd() * 21) - 10) / 100);
    const pts = []; for (let j = 1; j <= 100; j++) { const y = gordonPrice(E, r, k, 1 - j / 100); if (y != null) pts.push(y); }
    approx(gordonPrice(E, r, k, 0), E / k, 1e-9);
    for (let j = 1; j < pts.length; j++) {
      if (Math.abs(r - k) < 1e-12) approx(pts[j], E / k, 1e-6);
      else if (r > k) assert.ok(pts[j] < pts[j - 1] + 1e-9); else assert.ok(pts[j] > pts[j - 1] - 1e-9);
    }
    for (let j = 0; j <= 100; j++) { const b = 1 - j / 100; assert.equal(gordonPrice(E, r, k, b) == null, !(k - b * r > 1e-9)); }
  }
});
test('MM on 3000 random firms: the value of the firm today is n × P0 whatever the dividend, and the old shareholder gets P0(1 + Ke) per share', () => {
  const rnd = lcg(5);
  for (let i = 0; i < 3000; i++) {
    const n = 1000 + Math.floor(rnd() * 1e6), P0 = 5 + Math.floor(rnd() * 500), k = 0.05 + Math.floor(rnd() * 20) / 100, E = Math.floor(rnd() * 1e7), I = Math.floor(rnd() * 2e7);
    const D = Math.floor(rnd() * P0 * 100) / 100;
    const x = mm(n, P0, k, D, E, I);
    approx(x.value / (n * P0), 1, 1e-9);
    approx(x.P1 + D, P0 * (1 + k), 1e-9);
    approx(x.dn * x.P1, I - (E - n * D), 1e-6);
  }
});

/* ---------------------------------------------------------------- frames, inputs and the definition */
test('frames: one point per payout (0, 25, 50, 75, 100%), then the line, the three cases, the optimum and the target; captions say why', () => {
  const res = preset(/PYQ Jan 2025/);
  assert.equal(res.frames.length, 10);
  const plots = res.frames.map(f => f.view.find(x => x.type === 'plot'));
  assert.deepEqual(plots.slice(0, 6).map(p => p.points.length), [0, 1, 2, 3, 4, 5]);
  assert.equal(plots[0].series.length, 0); assert.equal(plots[6].series.length, 1); assert.equal(plots[7].series.length, 3);
  assert.match(res.frames[0].caption, /r > Ke.*more than the 15% shareholders want/);
  assert.match(res.frames[7].caption, /with r = Ke the line is flat at E \/ Ke = ₹46\.67/);
  assert.match(res.frames[8].caption, /\*\*0%\*\*: retain everything/);
  assert.match(res.frames[9].caption, /D = ₹6 and a payout of D \/ E = ₹6 \/ ₹7 = \*\*85\.71%\*\*/);
  assert.ok(res.frames.every(f => f.caption.length > 40 && f.view.length >= 1));
  // r < Ke: the line rises and 100% is optimum
  const lo = run({ model: 'walter', eps: 10, r: 8, ke: 12, payout: 40, target: 0 });
  assert.equal(lo.optimum, 1); assert.match(caps(lo), /\*\*100%\*\*: pay everything/);
  const eq = run({ model: 'walter', eps: 10, r: 12, ke: 12, payout: 40, target: 0 });
  assert.equal(eq.optimum, null); assert.match(caps(eq), /\*\*any payout\*\*/);
});
test('targets out of reach and bad inputs say what is wrong', () => {
  assert.match(caps(run({ model: 'walter', eps: 7, r: 18, ke: 15, payout: 50, target: 100 })), /no payout between 0% and 100% gives it .*from ₹46\.67 to ₹56/);
  assert.match(caps(run({ model: 'walter', eps: 6, r: 15, ke: 15, payout: 50, target: 30 })), /no payout reaches ₹30/);
  assert.throws(() => run({ model: 'gordon', eps: 6, r: 20, ke: 16, payout: 10 }), /needs Ke > g = b × r.*raise the payout above 20%/);
  assert.throws(() => run({ model: 'walter', eps: 0 }), /Earnings per share/);
  assert.throws(() => run({ model: 'mm', shares: 100, p0: 10, ke: 10, dps: 20, earn: 0, invest: 0 }), /dividend is larger/);
  assert.throws(() => run({ model: 'mm', shares: 0 }), /shares outstanding/);
});
test('definition: controls show per model, every preset computes, at least 3 presets cite real ICAI documents, frames stay under 120', () => {
  const ctl = id => def.controls.find(c => c.id === id);
  assert.ok(ctl('eps').show({ model: 'walter' }) && ctl('eps').show({ model: 'gordon' }) && !ctl('eps').show({ model: 'mm' }));
  assert.ok(ctl('shares').show({ model: 'mm' }) && !ctl('shares').show({ model: 'walter' }));
  assert.ok(def.presets.length >= 3);
  assert.ok(def.presets.filter(p => /^(PYQ|RTP|MTP) /.test(p.label)).length >= 4);
  def.presets.forEach(p => { const res = run(p.values); assert.ok(res.frames.length > 3 && res.frames.length <= 120, p.label); assert.ok(res.stats.length >= 3 && res.stats.length <= 6, p.label); });
  assert.ok(def.presets.every(p => !/→/.test(p.label)));
});
test('challenge: 300 problems per model build, answer from the same result the stage shows, and the explanation names the numbers', () => {
  for (const model of ['walter', 'gordon', 'mm']) {
    compute(Object.assign(dflt(), { model }));
    const rnd = lcg(11);
    for (let i = 0; i < 300; i++) {
      const v = Object.assign(dflt(), { model }, def.challenge.gen(rnd)), res = def.compute(v), want = def.challenge.solve(res, v);
      assert.ok(typeof want === 'number' && isFinite(want) && want >= 0, model + JSON.stringify(v));
      const p = def.challenge.prompt(v, res);
      if (model === 'mm') assert.match(p, /MM hypothesis/); else if (v.ask === 'target') { assert.match(p, /payout ratio/); approx(want, res.target.payout * 100, 0.0051); }
      else { assert.match(p, /price per share/); approx(want, res.price, 0.0051); }
      assert.ok(def.challenge.explain(res, v).length > 20);
    }
  }
});
