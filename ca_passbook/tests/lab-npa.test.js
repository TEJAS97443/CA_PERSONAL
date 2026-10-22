/* Bank Advances Lab (app/js/labs/npa.js): the ICAI Study Material's norms (Paper 5, Ch 10 §12.6–12.11: NPA definition, out of order,
   categories and provisioning, borrower-wise classification, government guarantees, erosion, advances against deposits, crop loans; the
   Case Study key 1-c and 5-a), real ICAI questions with their Suggested Answers / keys (MTP Sep 2024 S1 Q2, Q4, Q6(a); PYQ Sep 2024 Q3(c);
   PYQ Jan 2025 Q12; PYQ Jan 2026 Q6(a); PYQ May 2026 Q12; RTP Jan 2025 Q19; RTP May 2024 Q23; RTP Jan 2026 Q19; RTP Sep 2025 Q8, Q19;
   RTP Sep 2026 Q19; MTP Jan 2025 S2 Q6–Q9; MTP Sep 2025 S1 Q6, S2 Q3(c); MTP May 2026 S1 Q8, S2 Q2(b); MTP Jan 2026 S1 Q2(b)), RBI's
   day-count example, and a brute-force cross-check on random dates against an independent day-by-day reference. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const LAB = require('../app/js/labs/npa.js');
const { parseDate, fmt, addMonths, classify, provision, compute, def } = LAB;

const BASE = def.controls.reduce((o, c) => ((o[c.id] = c.value), o), {});
const acct = o => classify(Object.assign({}, BASE, { due: '', lastCredit: '', excessSince: '', shortSince: '', otherSince: '', assessed: 0, unsecured: false, deposits: false, guarantee: 'none', lossFound: false }, o));
/* a due date that makes the account `days` days overdue on T, counting the due date as day 1 */
const dueFor = (T, days) => fmt(parseDate(T) - days + 1);
const near = (a, b) => approx(a, b, 1e-6);

/* ---------------------------------------------------------------- dates and the day count */
test('dates: dd.mm.yyyy, dd/mm/yyyy, yyyy-mm-dd; impossible dates and junk fail plainly; month arithmetic clamps to the month end', () => {
  assert.equal(fmt(parseDate('31.03.2026')), '31.03.2026');
  assert.equal(parseDate('31/03/2026'), parseDate('2026-03-31'));
  assert.equal(parseDate(' 1.4.2026 '), parseDate('01.04.2026'));
  assert.equal(parseDate(''), null);
  assert.throws(() => parseDate('31.02.2026', 'X'), /not a real date/);
  assert.throws(() => parseDate('March 2026', 'X'), /dd\.mm\.yyyy/);
  assert.equal(fmt(addMonths(parseDate('31.01.2025'), 1)), '28.02.2025');
  assert.equal(fmt(addMonths(parseDate('29.02.2024'), 12)), '28.02.2025');
  assert.equal(fmt(addMonths(parseDate('30.09.2022'), 48)), '30.09.2026');
});
test('RBI\'s day count (circular of 12 Nov 2021): due 31.03 → SMA-1 on 30.04, SMA-2 on 30.05, NPA on 29.06', () => {
  const C = acct({ facility: 'term', due: '31.03.2021', asof: '31.03.2023', outstanding: 10, security: 10 });
  const at = ev => fmt(C.tl.ms.find(m => m.ev === ev).day);
  assert.deepEqual([at('sma0'), at('sma1'), at('sma2'), at('npa')], ['31.03.2021', '30.04.2021', '30.05.2021', '29.06.2021']);
  assert.equal(acct({ facility: 'term', due: '31.03.2021', asof: '28.06.2021', outstanding: 10, security: 10 }).cat, 'sma2', 'day 90: not yet more than 90 days');
  assert.equal(acct({ facility: 'term', due: '31.03.2021', asof: '29.06.2021', outstanding: 10, security: 10 }).cat, 'sub', 'day 91: an NPA');
});

/* ---------------------------------------------------------------- the Study Material's norms */
test('SM §12.6: sub-standard for up to 12 months as NPA, then D1 (up to 1 year doubtful), D2 (1-3 years), D3 (over 3 years)', () => {
  const due = '01.01.2020', N = parseDate(due) + 90;               // NPA on 31.03.2020
  const cat = d => acct({ facility: 'term', due, asof: fmt(d), outstanding: 100, security: 100 }).cat;
  assert.equal(cat(N - 1), 'sma2'); assert.equal(cat(N), 'sub');
  assert.equal(cat(addMonths(N, 12) - 1), 'sub'); assert.equal(cat(addMonths(N, 12)), 'd1');
  assert.equal(cat(addMonths(N, 24) - 1), 'd1'); assert.equal(cat(addMonths(N, 24)), 'd2');
  assert.equal(cat(addMonths(N, 48) - 1), 'd2'); assert.equal(cat(addMonths(N, 48)), 'd3');
});
test('SM §12.6 provisioning: sub-standard 15%; D1/D2/D3 25%/40%/100% of the secured portion + 100% unsecured; loss 100%; nothing for standard', () => {
  near(provision('sub', 100, 30).amount, 15);
  near(provision('d1', 100, 60).amount, 0.25 * 60 + 40);
  near(provision('d2', 100, 60).amount, 0.40 * 60 + 40);
  near(provision('d3', 100, 60).amount, 100);
  near(provision('loss', 100, 60).amount, 100);
  assert.equal(provision('std', 100, 60).amount, null);
  near(provision('d1', 100, 250).amount, 25, 'security above the balance: the whole balance is the secured portion');
});
test('SM §12.6 note 2 and Case Study Q5 (answer a; MTP Jan 2025 S2 Q7, RTP Sep 2024 Q7): housing loan 120 days, car loan 60 days → both NPAs', () => {
  const C = acct({ facility: 'term', asof: '31.03.2024', due: dueFor('31.03.2024', 60), otherSince: dueFor('31.03.2024', 120), outstanding: 6, security: 5 });
  assert.equal(C.tl.days, 60); assert.equal(C.ageCat, 'sma1');
  assert.equal(C.other.days, 120); assert.equal(C.other.cat, 'sub');
  assert.equal(C.cat, 'sub', 'borrower-wise, not facility-wise');
  const solo = acct({ facility: 'term', asof: '31.03.2024', due: dueFor('31.03.2024', 60), outstanding: 6, security: 5 });
  assert.equal(solo.cat, 'sma1', 'on its own the car loan is standard (SMA-1)');
});
test('SM Case Study Q1 (answer c; MTP Jan 2025 S2 Q9): KCC paddy loan (3-4 month crop), no transaction for 90 days → standard is proper', () => {
  for (const season of [3, 4]) assert.equal(acct({ facility: 'agriS', season, asof: '31.03.2024', due: dueFor('31.03.2024', 90), outstanding: 20, security: 25 }).cat, 'std');
});
test('SM §12.11 crop loans: short-duration NPA after two crop seasons overdue, long-duration after one; the season decides which kind it is', () => {
  const T = '31.03.2026';
  assert.equal(acct({ facility: 'agriS', season: 6, asof: T, due: fmt(addMonths(parseDate(T), -7)), outstanding: 5, security: 5 }).cat, 'std', 'RTP Sep 2025 Q19: overdue one crop season → not an NPA');
  assert.equal(acct({ facility: 'agriS', season: 6, asof: T, due: fmt(addMonths(parseDate(T), -13)), outstanding: 5, security: 5 }).cat, 'sub');
  assert.equal(acct({ facility: 'agriS', season: 12, asof: '31.03.2025', due: dueFor('31.03.2025', 120), outstanding: 12, security: 12 }).cat, 'std', 'MTP Sep 2025 S1 Q6 (sugarcane 10-12 months, 120 days)');
  assert.equal(acct({ facility: 'agriL', season: 18, asof: T, due: fmt(addMonths(parseDate(T), -17)), outstanding: 5, security: 5 }).cat, 'std');
  assert.equal(acct({ facility: 'agriL', season: 18, asof: T, due: fmt(addMonths(parseDate(T), -19)), outstanding: 5, security: 5 }).cat, 'sub');
  assert.throws(() => acct({ facility: 'agriS', season: 14, asof: T, due: '01.01.2025', outstanding: 5, security: 5 }), /long-duration crop/);
  assert.throws(() => acct({ facility: 'agriL', season: 12, asof: T, due: '01.01.2025', outstanding: 5, security: 5 }), /longer than one year/);
});
test('SM §12.6 government guarantees (MTP Sep 2024 S1 Q2, key c; PYQ May 2024 Q6(b)): Central → standard but NPA for income; State → NPA after 90 days', () => {
  const T = '31.03.2024';
  const c95 = acct({ facility: 'term', asof: T, due: dueFor(T, 95), guarantee: 'central', outstanding: 50, security: 40 });
  assert.equal(c95.cat, 'std'); assert.equal(c95.income, 'receipt'); assert.equal(c95.P.amount, null);
  const s80 = acct({ facility: 'term', asof: T, due: dueFor(T, 80), guarantee: 'state', outstanding: 50, security: 40 });
  assert.equal(s80.cat, 'sma2'); assert.equal(s80.income, 'accrual', '(ii) is wrong: an 80-day State-guaranteed advance is not an NPA for income either');
  assert.equal(acct({ facility: 'term', asof: T, due: dueFor(T, 95), guarantee: 'state', outstanding: 50, security: 40 }).cat, 'sub');
});
test('SM §12.8 and RTP Sep 2025 Q8 (key b): an advance against an NSC with adequate margin, overdue → not an NPA', () => {
  assert.equal(acct({ facility: 'term', asof: '31.03.2025', due: dueFor('31.03.2025', 200), deposits: true, outstanding: 5, security: 6 }).cat, 'std');
});

/* ---------------------------------------------------------------- cash credit: out of order */
test('MTP Sep 2024 S1 Q6(a) (Sun Industries): last credit 31.12.2023, no credits for 90 days on 31.03.2024 → NPA, sub-standard', () => {
  const p = def.presets.find(x => /Sun Industries/.test(x.label));
  const r = compute(Object.assign({}, BASE, p.values));
  assert.equal(r.sim.cat, 'sub'); assert.equal(fmt(r.sim.tl.npa), '30.03.2024');
  near(r.sim.P.amount, 0.15 * 24.754);
  assert.equal(acct({ facility: 'cc', ccTest: 'nocredit', lastCredit: '31.12.2023', asof: '29.03.2024', outstanding: 24.754, security: 30 }).cat, 'sma2', '89 days without a credit: not yet out of order');
});
test('PYQ Sep 2024 Q3(c) and MTP Sep 2026 S2 Q4(a): no credits in the last two quarters → out of order → NPA', () => {
  assert.equal(acct({ facility: 'cc', ccTest: 'nocredit', lastCredit: '30.09.2023', asof: '31.03.2024', outstanding: 2000, security: 2500 }).cat, 'sub');
  assert.equal(acct({ facility: 'cc', ccTest: 'nocredit', lastCredit: '30.09.2025', asof: '31.03.2026', outstanding: 2400, security: 2900 }).cat, 'sub');
});
test('MTP Sep 2025 S2 Q3(c) (interest 6, credits 4) and MTP May 2026 S2 Q2(b) (interest 7, credits 5): credits do not cover interest → NPA', () => {
  assert.equal(acct({ facility: 'cc', ccTest: 'short', interest: 6, credits: 4, asof: '31.03.2025', outstanding: 140, security: 145 }).cat, 'sub');
  assert.equal(acct({ facility: 'cc', ccTest: 'short', interest: 7, credits: 5, asof: '31.03.2025', outstanding: 75, security: 80 }).cat, 'sub');
  assert.equal(acct({ facility: 'cc', ccTest: 'short', interest: 6, credits: 6, asof: '31.03.2025', outstanding: 140, security: 145 }).cat, 'std', 'credits that cover the interest: in order');
});
test('MTP May 2026 S1 Q8 (key b): continuously above drawing power for more than 90 days → out of order', () => {
  assert.equal(acct({ facility: 'cc', ccTest: 'excess', excessSince: '15.12.2025', asof: '31.03.2026', outstanding: 860, security: 900 }).cat, 'sub');
  assert.equal(acct({ facility: 'cc', ccTest: 'excess', excessSince: '15.02.2026', asof: '31.03.2026', outstanding: 860, security: 900 }).cat, 'sma1');
});
test('PYQ May 2026 Q12 (key A): overdue 20, 30 and 85 days → SMA-0, SMA-0, SMA-2', () => {
  const T = '31.03.2026', cat = d => acct({ facility: 'term', asof: T, due: dueFor(T, d), outstanding: 10, security: 10 }).cat;
  assert.deepEqual([cat(20), cat(30), cat(85)], ['sma0', 'sma0', 'sma2']);
});

/* ---------------------------------------------------------------- erosion and loss */
test('SM §12.7 erosion: realisable security below 10% of the outstanding → loss (MTP Sep 2024 S1 Q4; PYQ Jan 2025 Q12; PYQ Jan 2026 Q6(a)(ii); MTP Jan 2026 S1 Q2(b) Gayatri)', () => {
  const T = '31.03.2025', due = dueFor(T, 200);
  for (const [out, sec] of [[25, 2.25], [308, 25], [65, 6], [500, 40]]) {
    const C = acct({ facility: 'term', asof: T, due, outstanding: out, security: sec });
    assert.equal(C.cat, 'loss', `${out}/${sec}`); near(C.P.amount, out);
  }
});
test('SM §12.7 erosion: below 50% of the value assessed earlier → straight to doubtful; the 10% test wins when both apply (MTP Jan 2026 S1 Q2(b) Neem Tree)', () => {
  const T = '31.03.2026', due = dueFor(T, 120);
  const C = acct({ facility: 'term', asof: T, due, outstanding: 1000, security: 240, assessed: 600 });
  assert.equal(C.ageCat, 'sub'); assert.equal(C.cat, 'd1'); near(C.P.amount, 0.25 * 240 + 760);
  /* ICAI's answer to Neem Tree (₹10 crore outstanding, ₹80 lakh realisable, ₹6 crore at the last inspection) says doubtful; ₹80 lakh is
     only 8% of the outstanding, so the Study Material's 10% rule makes it a loss asset, which is what the lab shows */
  assert.equal(acct({ facility: 'term', asof: T, due, outstanding: 1000, security: 80, assessed: 600 }).cat, 'loss');
  assert.equal(acct({ facility: 'term', asof: T, due: dueFor(T, 30), outstanding: 1000, security: 80, assessed: 600 }).cat, 'sma0', 'erosion is tested only for an NPA: classification rests on the record of recovery');
  assert.equal(acct({ facility: 'term', asof: T, due, outstanding: 100, unsecured: true, security: 0 }).cat, 'sub', 'an unsecured advance is not a loss merely for having no security');
});
test('RTP Sep 2026 Q19: Aarav sub-standard ₹12 lakh, Bright Metals D1 ₹52.5 lakh, Crest D2 ₹128 lakh, Delta D3 ₹150 lakh, Eagle loss ₹50 lakh', () => {
  const T = parseDate('31.03.2026');
  const npaFor = monthsAsNpa => fmt(addMonths(T, -monthsAsNpa) - 90);            // a due date whose NPA date is that many months before T
  const aarav = acct({ facility: 'term', asof: '31.03.2026', due: npaFor(8), outstanding: 80, unsecured: true, security: 0 });
  assert.equal(aarav.cat, 'sub'); near(aarav.P.amount, 12);
  const bright = acct({ facility: 'term', asof: '31.03.2026', due: npaFor(18), outstanding: 120, security: 90 });
  assert.equal(bright.cat, 'd1'); near(bright.P.amount, 52.5);
  const crest = acct({ facility: 'term', asof: '31.03.2026', due: npaFor(42), outstanding: 200, security: 120 });
  assert.equal(crest.cat, 'd2'); near(crest.P.amount, 128);
  const delta = acct({ facility: 'term', asof: '31.03.2026', due: npaFor(75), outstanding: 150, security: 40 });
  assert.equal(delta.cat, 'd3'); near(delta.P.amount, 150);
  const eagle = acct({ facility: 'term', asof: '31.03.2026', due: npaFor(5), outstanding: 50, security: 50, lossFound: true });
  assert.equal(eagle.cat, 'loss'); near(eagle.P.amount, 50);
});
test('PYQ Jan 2026 Q6(a)(i) JT Mills D1 ₹140/₹80 → ₹80 lakh (₹70 lakh is inadequate); RTP Jan 2026 Q19 D2 ₹150/₹100 → ₹90 lakh; RTP May 2024 Q23 D1 ₹50/₹40 → ₹20 lakh', () => {
  const jt = def.presets.find(p => /JT Mills/.test(p.label));
  const r = compute(Object.assign({}, BASE, jt.values));
  assert.equal(r.sim.cat, 'd1'); near(r.sim.P.amount, 80);
  near(provision('d2', 150, 100).amount, 90);
  near(provision('d1', 50, 40).amount, 20);
});
test('RTP Jan 2025 Q19 (MTP Jan 2025 S2 Q6, Q8): AK Industries D1 ₹10 lakh secured → ₹2.50 lakh; Jupiter sub ₹50 → ₹7.50; VT D2 ₹30 → ₹12; ASD loss ₹1 → ₹1', () => {
  near(provision('d1', 10, 10).amount, 2.5);
  near(provision('sub', 50, 50).amount, 7.5);
  near(provision('d2', 30, 30).amount, 12);
  near(provision('loss', 1, 0).amount, 1);
});

/* ---------------------------------------------------------------- brute force against an independent reference */
/* the reference counts days with Date objects stepping one day at a time and adds months with setUTCMonth (clamping by hand) */
function refDays(a, b) { const d = new Date(Date.UTC(+a.slice(6), +a.slice(3, 5) - 1, +a.slice(0, 2))), e = Date.UTC(+b.slice(6), +b.slice(3, 5) - 1, +b.slice(0, 2)); let n = 0; while (d.getTime() < e) { d.setUTCDate(d.getUTCDate() + 1); n++; } return n; }
function refAddMonths(dt, k) { const d = new Date(dt.getTime()), day = d.getUTCDate(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() + k); const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate(); d.setUTCDate(Math.min(day, last)); return d; }
function refCat(due, asof) {
  const dd = new Date(Date.UTC(+due.slice(6), +due.slice(3, 5) - 1, +due.slice(0, 2)));
  if (Date.UTC(+due.slice(6), +due.slice(3, 5) - 1, +due.slice(0, 2)) > Date.UTC(+asof.slice(6), +asof.slice(3, 5) - 1, +asof.slice(0, 2))) return 'std';   // not due yet
  const n = refDays(due, asof) + 1;                      // the due date is day 1
  if (n <= 30) return 'sma0'; if (n <= 60) return 'sma1'; if (n <= 90) return 'sma2';
  const npa = new Date(dd.getTime()); npa.setUTCDate(npa.getUTCDate() + 90);
  const t = Date.UTC(+asof.slice(6), +asof.slice(3, 5) - 1, +asof.slice(0, 2));
  if (t < refAddMonths(npa, 12).getTime()) return 'sub';
  if (t < refAddMonths(npa, 24).getTime()) return 'd1';
  if (t < refAddMonths(npa, 48).getTime()) return 'd2';
  return 'd3';
}
test('brute force: 3,000 random term loans classify as the day-by-day reference does; a later date is never a milder category', () => {
  const r = GA.util.rng(42), CATS = LAB.CATS;
  for (let k = 0; k < 3000; k++) {
    const T = parseDate('01.01.2020') + Math.floor(r() * 2500), due = T - Math.floor(r() * 2200) + 30;
    const C = acct({ facility: 'term', asof: fmt(T), due: fmt(due), outstanding: 100, security: 100 * r() + 10 });
    assert.equal(C.ageCat, refCat(fmt(due), fmt(T)), `${fmt(due)} → ${fmt(T)}`);
    const later = acct({ facility: 'term', asof: fmt(T + 1 + Math.floor(r() * 400)), due: fmt(due), outstanding: 100, security: 100 * r() + 10 });
    assert.ok(CATS.indexOf(later.ageCat) >= CATS.indexOf(C.ageCat));
    if (C.P.amount != null) { assert.ok(C.P.amount >= 0 && C.P.amount <= C.out + 1e-9); }
  }
});
test('provision never falls as the category worsens, for any balance and security', () => {
  const r = GA.util.rng(7), order = ['sub', 'd1', 'd2', 'd3', 'loss'];
  for (let k = 0; k < 2000; k++) {
    const out = 1 + r() * 999, sec = r() * 1200, vals = order.map(c => provision(c, out, sec).amount);
    for (let i = 1; i < vals.length; i++) assert.ok(vals[i] >= vals[i - 1] - 1e-9, `${out}/${sec}: ${vals}`);
  }
});

/* ---------------------------------------------------------------- frames, presets, the challenge */
test('frames: start, one per milestone reached, the classification date, one per special rule, the provision, the auditor\'s checks; all draw', () => {
  for (const p of def.presets) {
    const r = compute(Object.assign({}, BASE, p.values)), C = r.sim;
    assert.equal(r.frames.length, 1 + C.tl.ms.length + 1 + C.steps.length + 2, p.label);
    r.frames.forEach(f => { assert.ok(f.caption.length > 25, p.label); f.view.forEach(v => { if (!v.html) assert.ok(diagram.render(v).length > 50); }); });
    assert.match(r.frames[r.frames.length - 2].caption, /auditor’s checks/);
    assert.match(r.frames[r.frames.length - 1].caption, /provision|no NPA provision/i, 'the lab opens on the answer');
  }
  assert.ok(def.presets.filter(p => /^(PYQ|RTP|MTP|SM) /.test(p.label)).length >= 3);
  assert.ok(def.presets.some(p => /Tapri/.test(p.label)));
});
test('challenge: 300 problems per kind of advance; the answer is a button (or a provision), and moving the date ±3 days never changes it', () => {
  for (const [facility] of Object.entries({ term: 1, cc: 1, bills: 1, agriS: 1, agriL: 1 })) {
    const start = Object.assign({}, BASE, { facility, season: facility === 'agriL' ? 18 : 4 });
    compute(start);
    for (let s = 1; s <= 300; s++) {
      const v = Object.assign({}, start, def.challenge.gen(GA.util.rng(s * 7919)));
      assert.equal(v.facility, facility);
      const res = compute(v), want = def.challenge.solve(res, v), kind = def.challenge.kind(v, res);
      if (kind === 'choice') assert.ok(def.challenge.choices().some(c => c[0] === want), String(want));
      else assert.ok(typeof want === 'number' && want > 0);
      assert.ok(def.challenge.prompt(v, res).length > 40 && def.challenge.explain(res, v).length > 20);
      if (kind === 'choice') for (const dT of [-3, 3]) {
        const v2 = Object.assign({}, v, { asof: fmt(parseDate(v.asof) + dT) });
        assert.equal(def.challenge.solve(compute(v2), v2), want, `${facility}#${s}: the answer sits on a boundary`);
      }
    }
  }
});
test('bad input fails with a plain message', () => {
  assert.throws(() => acct({ facility: 'term', asof: '', due: '01.01.2025', outstanding: 10 }), /classification \(balance sheet\) date/);
  assert.throws(() => acct({ facility: 'term', asof: '31.03.2025', due: '01.01.2025', outstanding: 0 }), /more than 0/);
  assert.throws(() => acct({ facility: 'cc', ccTest: 'excess', excessSince: '', asof: '31.03.2025', outstanding: 10 }), /date the irregularity began/);
  assert.throws(() => acct({ facility: 'cc', ccTest: 'short', interest: 0, credits: 0, asof: '31.03.2025', outstanding: 10 }), /interest debited/);
  assert.equal(acct({ facility: 'term', asof: '31.03.2025', due: '', outstanding: 10, security: 5 }).cat, 'std', 'nothing overdue');
  assert.equal(acct({ facility: 'term', asof: '31.03.2025', due: '15.04.2025', outstanding: 10, security: 5 }).cat, 'std', 'due after the date: not overdue yet');
});
