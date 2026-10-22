/* Incentive Plans Lab (app/js/labs/incentives.js): the ICAI Study Material's illustrations (Paper 4, chapter 3, §8 and §11), ICAI
   Suggested Answers (new scheme; one old-scheme RTP for the new-recruitment and accession flux), identities and brute force on random
   inputs, and bad input. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const I = require('../app/js/labs/incentives.js');
const { def } = I;
const near = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= (eps == null ? 1e-6 : eps), `${msg || ''} expected ${b}, got ${a}`);
const run = v => def.compute(L.prepare(def, Object.assign(L._defaults(def), v)));
const job = (S, T, R, more) => run(Object.assign({ mode: 'plans', units: 1, std: S, taken: T, rate: R, share: 50, piece: 0, mat: 0, oh: 0 }, more || {})).sim;
const counts = o => run(Object.assign({ mode: 'turnover', tbasis: 'counts', open: 0, close: 0, avg: 0, left: 0, disch: 0, repl: 0, newj: 0, period: 'year' }, o)).sim;
const rates = o => run(Object.assign({ mode: 'turnover', tbasis: 'rates', kAvg: 0, kSep: 0, kRepl: 0, rFlux: 0, rRepl: 0, rSep: 0, period: 'year' }, o)).sim;
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ================================================================ incentive plans: Study Material */
test('Plans: SM Illustrations 6 and 7 — 8 hours allowed, 6 taken at ₹60: Halsey ₹360 + ₹60 = ₹420, Rowan ₹360 + ₹90 = ₹450', () => {
  const s = job(8, 6, 60);
  near(s.halsey.basic, 360); near(s.halsey.bonus, 60); near(s.halsey.earn, 420);
  near(s.rowan.bonus, 90); near(s.rowan.earn, 450);
});
test('Plans: SM Illustration 9 — the whole statement for 8 hours at ₹8: bonuses, earnings and hourly earnings at 8 … 1 hours taken', () => {
  const want = [[8, 0, 0, 64, 64, 8, 8], [7, 4, 7, 60, 63, 8.57, 9], [6, 8, 12, 56, 60, 9.33, 10], [5, 12, 15, 52, 55, 10.4, 11], [4, 16, 16, 48, 48, 12, 12], [3, 20, 15, 44, 39, 14.67, 13], [2, 24, 12, 40, 28, 20, 14], [1, 28, 7, 36, 15, 36, 15]];
  for (const [AH, bh, br, eh, er, hh, hr] of want) {
    const s = job(8, AH, 8);
    near(s.halsey.bonus, bh); near(s.rowan.bonus, br); near(s.halsey.earn, eh); near(s.rowan.earn, er);
    near(s.halsey.rate, hh, 0.005); near(s.rowan.rate, hr, 0.005);
  }
  /* and the lab's own statement table for that job holds the same rows */
  const res = run({ mode: 'plans', units: 1, std: 8, taken: 4, rate: 8, share: 50, piece: 0 });
  const t = res.frames.find(f => /Study Material's statement/.test(f.caption)).view[0];
  assert.deepEqual(t.rows.map(r => r.slice(0, 7)), want.map(w => [w[0], 8 - w[0], w[0] * 8, w[1], w[2], w[3], w[4]].map(String)));
});
test('Plans: SM Illustration 9(a) — the Halsey 50% and Rowan bonuses are equal exactly when the time taken is half the time allowed', () => {
  const s = job(8, 4, 8); near(s.equalT, 4); near(s.halsey.bonus, s.rowan.bonus);
});
test('Plans: SM Illustration 8 — factory cost ₹3,490 for A (Rowan, 30 h) and ₹3,600 for B (Halsey, 40 h) at ₹20 an hour, material ₹2,500, overhead ₹5 an hour', () => {
  const a = job(50, 30, 20, { mat: 2500, oh: 5 }), b = job(50, 40, 20, { mat: 2500, oh: 5 });
  near(a.rowan.bonus, 240); near(a.fc(a.rowan.earn), 3490);
  near(b.halsey.bonus, 100); near(b.fc(b.halsey.earn), 3600);
});
test('Plans: SM Illustration 10 / MTP May 2024 Series II Q1(c) — Rowan at ₹37.50 an hour means 3 of 4 hours; Halsey would pay ₹105, ₹35 an hour', () => {
  let T = null; for (let t = 0.01; t < 4; t += 0.01) if (Math.abs(job(4, t, 30).rowan.rate - 37.5) < 1e-6) T = t;   // the working note solves 37.5 = 30 + (4 − T) × 7.5
  near(T, 3, 0.011);
  const s = job(4, 3, 30); near(s.rowan.rate, 37.5); near(s.halsey.earn, 105); near(s.halsey.rate, 35);
});
test('Plans: SM Illustration 11 — Rowan bonuses ₹3.75, ₹5, ₹3.75 at 3, 2 and 1 of 4 hours (₹5 an hour), and only ₹10.50 if 10 hours are allowed by mistake', () => {
  near(job(4, 3, 5).rowan.bonus, 3.75); near(job(4, 2, 5).rowan.bonus, 5); near(job(4, 1, 5).rowan.bonus, 3.75); near(job(10, 3, 5).rowan.bonus, 10.5);
});

/* ================================================================ incentive plans: ICAI Suggested Answers */
test('Plans: PYQ Jan 2025 Q2(b) — 9 hours allowed, 6 taken at ₹25: Halsey ₹187.50, Rowan ₹200 (Rowan ₹12.50 better)', () => {
  const s = job(9, 6, 25); near(s.halsey.earn, 187.5); near(s.rowan.earn, 200);
});
test('Plans: PYQ May 2025 Q2(b) — 12,500 units at 2.5 hours, 25,600 hours: Halsey ₹8,52,750 (₹33.31 an hour, ₹68.22 a unit), Rowan ₹9,06,854.40 (₹35.42, ₹72.55)', () => {
  const s = run({ mode: 'plans', units: 12500, std: 2.5, taken: 25600, rate: 30, share: 50, piece: 0 }).sim;
  near(s.S, 31250); near(s.saved, 5650); near(s.halsey.bonus, 84750); near(s.halsey.earn, 852750); near(s.rowan.bonus, 138854.4); near(s.rowan.earn, 906854.4);
  near(s.halsey.rate, 33.31, 0.005); near(s.rowan.rate, 35.424, 0.0005); near(s.halsey.perUnit, 68.22, 0.005); near(s.rowan.perUnit, 72.55, 0.005);
  near(s.S / s.T * 100, 122.07, 0.005, 'efficiency 122.07%');
});
test('Plans: PYQ Sep 2024 MCQ 13 — Raj (Rowan, 90 of 150 h at ₹30) earns ₹3,780; Bhuvan (Halsey, 120 h) matches it at ₹28 an hour (option D)', () => {
  const raj = job(150, 90, 30); near(raj.rowan.earn, 3780);
  let rate = null; for (let r = 20; r <= 30; r += 0.5) if (Math.abs(job(150, 120, r).halsey.earn - raj.rowan.earn) < 1e-6) rate = r;
  near(rate, 28);
});
test('Plans: PYQ Sep 2026 MCQ 12 — Halsey at ₹75 an hour on a 72-hour job at ₹60 means 48 hours taken (option C; Sep 2026 answers not yet published)', () => {
  near(job(72, 48, 60).halsey.rate, 75);
});

/* ================================================================ identities and brute force */
test('Plans: on 3,000 random jobs — Halsey 50% equals Rowan at T = S/2, Rowan pays more before and less after; no saving means the time wage; piece = units × rate', () => {
  const r = lcg(13);
  for (let k = 0; k < 3000; k++) {
    const S = 1 + Math.floor(r() * 200), R = 1 + Math.floor(r() * 200), T = S * (0.02 + r() * 1.3), N = 1 + Math.floor(r() * 50), p = r() < 0.5 ? 0.5 : 0.05 + r() * 0.9;
    const s = I.plans({ S, T, R, p, N, pr: (S / N) * R });
    if (T >= S) { near(s.halsey.earn, T * R); near(s.rowan.earn, T * R); continue; }
    if (Math.abs(T - p * S) < 1e-9) near(s.halsey.bonus, s.rowan.bonus);
    if (T > p * S + 1e-9) assert.ok(s.rowan.bonus > s.halsey.bonus - 1e-9, `#${k}: Rowan pays more when less than ${p} of the time is saved`);
    if (T < p * S - 1e-9) assert.ok(s.rowan.bonus < s.halsey.bonus + 1e-9, `#${k}: Halsey pays more beyond`);
    near(s.piece.earn, N * ((S / N) * R), 1e-6);
    assert.ok(s.rowan.rate < 2 * R, 'Rowan never doubles the time rate');
    assert.ok(s.rowan.bonus <= (S * R) / 4 + 1e-9, 'Rowan bonus peaks at a quarter of the standard wage');
    const H = I.plans({ S, T, R, p: 0.5, N, pr: 0 }), sum = H.halsey.earn;                     // with a 50% share: Halsey earnings = (T + S) / 2 × R
    near(sum, ((T + S) / 2) * R, 1e-6);
  }
});
test('Plans: brute force over whole hours — the Rowan bonus is largest when half the time is saved', () => {
  for (const S of [4, 8, 10, 50, 150]) {
    let best = -1, at = null; for (let T = 1; T < S; T++) { const b = I.rowan(S, T, 10).bonus; if (b > best + 1e-9) { best = b; at = T; } }
    near(at, Math.floor(S / 2) === S / 2 ? S / 2 : at); near(best, I.rowan(S, S / 2, 10).bonus, S % 2 ? 10 : 1e-9);
  }
});

/* ================================================================ employee turnover */
test('Turnover: SM Illustration 14 — 10%, 5% and 3% for a quarter, 30 replaced: average 600, 42 recruited and joined, 18 left; annual 40%, 20%, 12%', () => {
  const s = rates({ rFlux: 10, rRepl: 5, rSep: 3, kRepl: 30, period: 'quarter' });
  near(s.avg, 600); near(s.acc, 42); near(s.sep, 18); near(s.annual.flux, 40); near(s.annual.repl, 20); near(s.annual.sep, 12);
});
test('Turnover: PYQ May 2026 Q4(b) — 12%, 6%, 4%, 54 replaced: average 900, 72 recruited and joined, 36 left and discharged', () => {
  const s = rates({ rFlux: 12, rRepl: 6, rSep: 4, kRepl: 54, period: 'quarter' }); near(s.avg, 900); near(s.acc, 72); near(s.sep, 36);
});
test('Turnover: RTP Sep 2024 Q8 — 14%, 8%, 6%, 36 replaced: average 450, 36 joined, 27 separated', () => {
  const s = rates({ rFlux: 14, rRepl: 8, rSep: 6, kRepl: 36, period: 'quarter' }); near(s.avg, 450); near(s.acc, 36); near(s.sep, 27);
});
test('Turnover: MTP Jan 2025 Series I MCQ 11 — 200 on roll at 9%, 15% and 30%: 30 replaced, 18 left and discharged, 42 recruited (option c)', () => {
  const s = rates({ kAvg: 200, rFlux: 30, rRepl: 15, rSep: 9 }); near(s.repl, 30); near(s.sep, 18); near(s.acc, 42);
});
test('Turnover: PYQ May 2025 Q1(c) — 28 separated at 3.5% gives 800 on roll; 78 replaced: replacement 9.75%, flux 13.25%', () => {
  const s = rates({ kSep: 28, rSep: 3.5, kRepl: 78 }); near(s.avg, 800); near(s.replRate, 9.75); near(s.flux, 13.25);
});
test('Turnover: PYQ Sep 2024 MCQ 14 — 150 at the start, 35 separated, 15 replaced: 130 at the end, average 140, separation rate 25% (option C)', () => {
  const s = counts({ open: 150, left: 30, disch: 5, repl: 15 }); near(s.close, 130); near(s.avg, 140); near(s.sepRate, 25);
});
test('Turnover: old-scheme RTP May 2020 Q2 — separation 4.33%, replacement 4.06%, new recruitment 5.41%, flux with accessions 13.80%', () => {
  const s = counts({ open: 3600, close: 3790, left: 40, disch: 120, repl: 150, newj: 200 });
  near(s.avg, 3695); near(s.sepRate, 4.33, 0.005); near(s.replRate, 4.06, 0.005); near(s.newRate, 5.41, 0.005); near(s.fluxAcc, 13.8, 0.005);
});
test('Turnover: identities on 2,000 random workforces — flux = separation + replacement; with joinings = flux + new recruitment; working back from the rates gives the numbers back', () => {
  const r = lcg(29);
  for (let k = 0; k < 2000; k++) {
    const open = 20 + Math.floor(r() * 5000), sep = Math.floor(r() * open * 0.3), repl = Math.floor(r() * (sep + 1)), newj = Math.floor(r() * open * 0.2);
    const C = I.turnoverCounts({ open, close: 0, avgGiven: 0, left: sep, disch: 0, repl, newj });
    near(C.close, open - sep + repl + newj); near(C.flux, C.sepRate + C.replRate, 1e-9); near(C.fluxAcc, C.flux + C.newRate, 1e-9);
    if (!(repl > 0 && sep > 0)) continue;
    const B = I.turnoverRates({ avgGiven: 0, cRepl: repl, cSep: 0, rRepl: C.replRate, rSep: C.sepRate, rFlux: C.fluxAcc });
    near(B.avg, C.avg, 1e-6); near(B.sep, sep, 1e-6); near(B.acc, repl + newj, 1e-6); near(B.newj, newj, 1e-6);
    for (const [per, days] of [['quarter', 0], ['month', 0], ['days', 73]]) near(I.annualOf(C.flux, per, days), per === 'quarter' ? C.flux * 4 : per === 'month' ? C.flux * 12 : C.flux * 5, 1e-9);
  }
});

/* ================================================================ the lab as the app runs it */
test('every example and both modes compute, draw every frame and keep their tiles readable', () => {
  const sets = [L._defaults(def)].concat(def.presets.map(p => Object.assign(L._defaults(def), p.values)), [Object.assign(L._defaults(def), { mode: 'turnover' }), Object.assign(L._defaults(def), { mode: 'turnover', tbasis: 'rates' })]);
  for (const v of sets) {
    const res = def.compute(L.prepare(def, v));
    assert.ok(res.frames.length >= 3 && res.frames.length <= 120);
    res.frames.forEach((f, i) => {
      assert.ok(f.caption && f.caption.length > 20); assert.doesNotMatch(f.caption, /NaN|undefined|Infinity/, f.caption);
      (f.view || []).forEach(sp => { const html = diagram.render(sp); assert.ok(html && !/NaN|undefined/.test(html), `${v.mode} frame ${i} ${sp.type}`); });
    });
    assert.ok(res.stats.length >= 3 && res.stats.length <= 6);
    res.stats.forEach(s => assert.doesNotMatch(String(s.value), /NaN|undefined|Infinity/));
  }
});
test('the work-back mode opens on the Study Material\'s Illustration 14 (average 600, 42 joined, 18 left)', () => {
  const s = run({ mode: 'turnover', tbasis: 'rates' }).sim; near(s.avg, 600); near(s.acc, 42); near(s.sep, 18);
});
test('the default Tapri examples: packing 50 crates in 7 of 10 hours at ₹90 pays ₹765 (Halsey) or ₹819 (Rowan); café turnover 7.2%, 5.6%, 12.8%', () => {
  const s = run({}).sim; near(s.halsey.earn, 765); near(s.rowan.earn, 819); near(s.piece.earn, 900); near(s.time.earn, 630);
  const t = run({ mode: 'turnover' }).sim; near(t.avg, 500); near(t.sepRate, 7.2); near(t.replRate, 5.6); near(t.flux, 12.8); near(t.fluxAcc, 22.4);
});
test('a job over its standard time earns the guaranteed time wage under both premium plans, and the captions say so', () => {
  const res = run({ mode: 'plans', units: 1, std: 8, taken: 10, rate: 50 });
  near(res.sim.halsey.earn, 500); near(res.sim.rowan.earn, 500); near(res.sim.saved, 0);
  assert.ok(res.frames.some(f => /no time saved, so no bonus/.test(f.caption)));
});
test('bad input says what to fix', () => {
  assert.throws(() => run({ mode: 'plans', std: 0 }), /Standard time a unit must be more than 0/);
  assert.throws(() => run({ mode: 'plans', taken: 0 }), /Time taken must be more than 0/);
  assert.throws(() => run({ mode: 'plans', rate: -5 }), /cannot be negative/);
  assert.throws(() => run({ mode: 'plans', share: 120 }), /between 1% and 100%/);
  assert.throws(() => run({ mode: 'turnover', open: 10, left: 30, close: 0, repl: 0, newj: 0 }), /More employees left/);
  assert.throws(() => run({ mode: 'turnover', repl: 50, left: 10, disch: 0 }), /cannot exceed/);
  assert.throws(() => run({ mode: 'turnover', tbasis: 'rates', rFlux: 10, rRepl: 5, rSep: 3, kRepl: 0 }), /To work back/);
  assert.throws(() => run({ mode: 'turnover', tbasis: 'rates', rFlux: 2, rRepl: 5, rSep: 3, kRepl: 30 }), /lower than the separation rate|fewer than the/);
  assert.throws(() => run({ mode: 'turnover', period: 'days', days: 0 }), /number of days/);
});
test('Test yourself: 150 problems per mode compute with a positive answer the lab shows', () => {
  for (const mode of ['plans', 'turnover']) for (let s = 1; s <= 150; s++) {
    const P = L.problem(def, Object.assign(L._defaults(def), { mode }), s * 32452843);
    assert.equal(P.values.mode, mode);
    assert.ok(typeof P.want === 'number' && Number.isFinite(P.want) && P.want > 0, `${mode}#${s}: ${P.want}`);
    assert.doesNotMatch(def.challenge.prompt(P.values, P.result), /NaN|undefined/);
  }
});
