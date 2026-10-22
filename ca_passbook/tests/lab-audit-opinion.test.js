/* Audit Opinion Lab (app/js/labs/audit-opinion.js): the ICAI Study Material's illustrations (Paper 5, Ch 8 Illustrations 9, 10, 11, 14,
   Test Your Understanding 3; Ch 7 §2.11 for SA 570), real ICAI questions with their Suggested Answers / answer keys (PYQ Sep 2024 Q11, Q12;
   PYQ Jan 2025 Q3(c); PYQ Jan 2026 Q11, Q3(a); PYQ May 2026 Q6(b); RTP May 2024 Q19; RTP Sep 2024 Q16; MTP Jan 2026 Series I Q15), an
   independent re-statement of SA 705's table checked on every combination of the inputs, and the report-outline rules of SA 705 / 706 / 701. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const LAB = require('../app/js/labs/audit-opinion.js');
const { decide, outline, compute, CASES, genCase, def } = LAB;

const run = (id, extra) => compute(Object.assign({ mode: 'case', case: id }, extra || {}));
const own = facts => compute(Object.assign({ mode: 'own', nature: 'none', material: false, pervasive: false, imposed: false, removed: false, altok: false, withdraw: false,
  gcBasis: 'appropriate', mu: false, disclosed: false, formable: false, listed: false, kam: false, eom: false, eomKam: false, om: false }, facts));
const sections = res => Object.fromEntries(res.report.map(r => [r[0], r[1]]));

/* ---------------------------------------------------------------- the Study Material's illustrations */
test('SM Ch 8 Illustration 9 (Super Duper Ltd): material but not pervasive misstatement -> qualified, "except for the effects"', () => {
  const r = run('sm-loans');
  assert.equal(r.sim.opinion, 'qualified');
  assert.deepEqual(r.sim.path, ['r', 'm', 'p', 'Q']);
  const s = sections(r);
  assert.ok(s['Qualified Opinion'] && /except for the effects of/.test(s['Qualified Opinion']));
  assert.ok(/quantification of its financial effects/.test(s['Basis for Qualified Opinion']));
  assert.ok(/basis for our \*\*qualified\*\* opinion/.test(s['Basis for Qualified Opinion']), 'SA 705: the sufficiency statement says "qualified"');
});
test('SM Ch 8 Illustration 10 (Polex Ltd, stocks and debtors 80% of total assets not realisable, unrecorded fraud) -> adverse', () => {
  const r = run('sm-polex');
  assert.equal(r.sim.opinion, 'adverse');
  assert.ok(/do not give a true and fair view/.test(sections(r)['Adverse Opinion']));
  assert.ok(/CARO 2020 and section 143\(12\)/.test(r.note), 'ICAI\'s answer adds CARO and s.143(12)');
});
test('SM Ch 8 Illustration 11 (Delightful Ltd, SAP data not extractable, not available manually) -> disclaimer', () => {
  const r = run('sm-sap');
  assert.equal(r.sim.opinion, 'disclaimer');
  assert.deepEqual(r.sim.path, ['r', 'alt', 'm', 'p', 'D']);
});
test('SM Ch 8 TYU 3 (CA Sarasbhai Patel) and RTP May 2024 Q19: management-imposed, pervasive -> disclaim if withdrawal is not possible, else withdraw', () => {
  const r = run('sm-sarasbhai');
  assert.equal(r.sim.tree, 'imposed');
  assert.deepEqual(r.sim.path, ['r', 'rem', 'alt', 'p', 'W']);
  assert.equal(r.sim.opinion, 'disclaimer');
  const w = def.presets.find(p => /RTP May 2024 Q19/.test(p.label));
  const rw = compute(Object.assign({}, own({}).sim && {}, w.values));
  assert.equal(rw.sim.opinion, 'withdraw', 'RTP May 2024 Q19: withdraw where practicable and possible under law');
  assert.equal(rw.report.length, 1);
  assert.match(rw.report[0][1], /communicated to those charged with governance any misstatements/);
  assert.equal(compute(Object.assign({}, w.values, { withdraw: false })).sim.opinion, 'disclaimer', 'otherwise disclaim');
});
test('SM Ch 8 Illustration 14 (Lomaxe Ltd, fire disclosed in the notes) -> unmodified with an Emphasis of Matter paragraph', () => {
  const r = run('sm-fire');
  assert.equal(r.sim.opinion, 'unmodified');
  assert.equal(r.sim.eom, 'yes');
  assert.ok(/Our opinion is not modified/.test(sections(r)['Emphasis of Matter']));
  assert.equal(def.challenge.solve(r, {}), 'EOM');
});
test('SM Ch 8 §5.4 table: nature x pervasiveness gives the four modified opinions', () => {
  const T = { mis: { false: 'qualified', true: 'adverse' }, scope: { false: 'qualified', true: 'disclaimer' } };
  for (const nature of ['mis', 'scope']) for (const pervasive of [false, true]) assert.equal(decide({ nature, material: true, pervasive }).opinion, T[nature][pervasive], `${nature}/${pervasive}`);
  assert.equal(decide({ nature: 'mis', material: false, pervasive: true }).opinion, 'unmodified', 'not material: no modification, whatever the pervasive flag says');
  assert.equal(decide({ nature: 'scope', material: true, pervasive: true, altok: true }).opinion, 'unmodified', 'alternative procedures succeed: no inability left');
});
test('SM Ch 7 §2.11 (SA 570): inappropriate basis -> adverse; MU adequately disclosed -> unmodified + MU section; not disclosed -> qualified/adverse; no assessment -> qualified/disclaimer', () => {
  assert.equal(decide({ nature: 'gc', gcBasis: 'inappropriate' }).opinion, 'adverse');
  const d = decide({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: true });
  assert.equal(d.opinion, 'unmodified'); assert.equal(d.murgc, true);
  assert.equal(decide({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: false, pervasive: false }).opinion, 'qualified');
  assert.equal(decide({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: false, pervasive: true }).opinion, 'adverse');
  assert.equal(decide({ nature: 'gc', gcBasis: 'appropriate', mu: false }).opinion, 'unmodified');
  assert.equal(decide({ nature: 'gc', gcBasis: 'unwilling', pervasive: false }).opinion, 'qualified');
  assert.equal(decide({ nature: 'gc', gcBasis: 'unwilling', pervasive: true }).opinion, 'disclaimer');
  const nd = run('pyq-op');
  assert.match(sections(nd)['Basis for Qualified Opinion'], /do not adequately disclose/, 'SA 570: the Basis section states the uncertainty and the inadequate disclosure');
});
test('SM Ch 8 §5.3: multiple uncertainties that cannot be resolved into an opinion -> disclaimer (even though each one is evidenced)', () => {
  assert.equal(decide({ nature: 'multi', formable: false }).opinion, 'disclaimer');
  assert.equal(decide({ nature: 'multi', formable: true }).opinion, 'unmodified');
});

/* ---------------------------------------------------------------- real ICAI questions */
test('PYQ Sep 2024 Case Scenario 3 Q11 (Mega Power Ltd), key (C): unmodified opinion; the report carries the MU section', () => {
  const r = run('pyq-megapower');
  assert.equal(def.challenge.solve(r, {}), 'Unmodified');
  assert.ok(sections(r)['Material Uncertainty Related to Going Concern']);
});
test('PYQ Sep 2024 Case Scenario 3 Q12 (written representations not reliable), key (A): disclaimer of opinion', () => {
  assert.equal(def.challenge.solve(run('pyq-wrep'), {}), 'Disclaimer');
});
test('PYQ Sep 2024 Case Scenario 1 Q1 (GHB Ltd), key (D): modify the opinion under SA 705 (qualified under the lab\'s stated assumption)', () => {
  const r = run('pyq-ghb');
  assert.ok(r.sim.modified);
  assert.equal(r.sim.kam, 'none', 'a listed entity with nothing more to report states "no other key audit matters"');
  assert.match(sections(r)['Key Audit Matters'], /^Except for the matter described in the Basis for Qualified Opinion section, we have determined that there are no other key audit matters/);
});
test('PYQ Jan 2025 Q3(c) (Rubber Industries, debtors 60% of total assets, disclaimer): the report changes ICAI lists', () => {
  const r = run('pyq-rubber');
  assert.equal(r.sim.opinion, 'disclaimer');
  const s = sections(r);
  assert.ok(s['Basis for Disclaimer of Opinion'], 'heading amended to "Basis for Disclaimer of Opinion"');
  assert.ok(!/is sufficient and appropriate to provide a basis/.test(s['Basis for Disclaimer of Opinion']), 'no sufficiency statement');
  assert.match(s['Basis for Disclaimer of Opinion'], /omits\*\* the statement that the evidence is sufficient and appropriate and the reference to the auditor’s responsibilities section/);
  assert.match(s['Disclaimer of Opinion'], /were engaged to audit/);
  assert.match(s['Auditor’s Responsibilities'], /Amended to say \*\*only\*\*/);
});
test('PYQ Jan 2026 Q11 (OP Ltd, MU not adequately disclosed), key (B): qualified or adverse, as appropriate', () => {
  assert.equal(run('pyq-op').sim.opinion, 'qualified');
  assert.equal(own({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: false, pervasive: true }).sim.opinion, 'adverse');
});
test('PYQ Jan 2026 Q3(a) (STU Ltd, fire after the year end, fully disclosed): Emphasis of Matter paragraph', () => {
  const r = run('pyq-stu');
  assert.equal(r.sim.opinion, 'unmodified'); assert.equal(def.challenge.solve(r, {}), 'EOM');
});
test('PYQ May 2026 Q6(b) (SUN Ltd, predecessor auditor\'s corresponding figures): Other Matter paragraph, after the auditor\'s responsibilities', () => {
  const r = run('pyq-sun');
  assert.equal(def.challenge.solve(r, {}), 'OM');
  const names = r.report.map(x => x[0]);
  assert.ok(names.indexOf('Other Matter') > names.indexOf('Auditor’s Responsibilities'), 'as in the Study Material\'s illustrative report');
});
test('RTP Sep 2024 Q16 (BYN Ltd): unmodified opinion and a "Material Uncertainty Related to Going Concern" section', () => {
  const r = run('rtp-byn');
  assert.equal(r.sim.opinion, 'unmodified'); assert.equal(def.challenge.solve(r, {}), 'MURGC');
});
test('MTP Jan 2026 Series I Q15 (FAN Pvt Ltd, management refuses a going concern assessment), key (b): disclaimer or qualified', () => {
  assert.equal(run('mtp-fan').sim.opinion, 'disclaimer');
  assert.equal(own({ nature: 'gc', gcBasis: 'unwilling', pervasive: false }).sim.opinion, 'qualified');
});

/* ---------------------------------------------------------------- SA 706 / SA 701 rules */
test('SA 706: a disclosed fundamental matter that is a key audit matter goes in the KAM section, not an EOM (Tapri, listed)', () => {
  const r = run('tapri-firekam');
  assert.equal(r.sim.eom, 'kam'); assert.equal(r.sim.kam, 'section');
  const names = r.report.map(x => x[0]);
  assert.ok(!names.includes('Emphasis of Matter') && names.includes('Key Audit Matters'));
  assert.equal(def.challenge.solve(r, {}), 'KAM');
  assert.equal(own({ eom: true, eomKam: true, listed: false }).sim.eom, 'yes', 'SA 701 not applying: the matter is an EOM');
});
test('SA 705 §5.9: a disclaimer never carries a Key Audit Matters section; SA 701 applies only to listed entities here', () => {
  const r = own({ nature: 'scope', material: true, pervasive: true, listed: true, kam: true });
  assert.equal(r.sim.opinion, 'disclaimer'); assert.equal(r.sim.kam, 'barred');
  assert.ok(!r.report.some(x => x[0] === 'Key Audit Matters'));
  assert.equal(own({ listed: false, kam: true }).sim.kam, 'na');
  assert.equal(own({ listed: true, kam: false }).sim.kam, 'none');
  assert.match(sections(own({ listed: true, kam: false }))['Key Audit Matters'], /^We have determined that there are no key audit matters/);
});
test('a scope-limited qualified opinion says "except for the possible effects"; a misstatement-based one "except for the effects"', () => {
  assert.match(sections(own({ nature: 'scope', material: true }))['Qualified Opinion'], /except for the possible effects of/);
  assert.match(sections(own({ nature: 'mis', material: true }))['Qualified Opinion'], /except for the effects of/);
  assert.match(sections(own({ nature: 'scope', material: true }))['Basis for Qualified Opinion'], /reasons for the inability/);
});

/* ---------------------------------------------------------------- brute force over every combination of the inputs */
const BOOLS = ['material', 'pervasive', 'imposed', 'removed', 'altok', 'withdraw', 'mu', 'disclosed', 'formable', 'listed', 'kam', 'eom', 'eomKam', 'om'];
const SEV = { unmodified: 0, qualified: 1, adverse: 2, disclaimer: 2, withdraw: 3 };
/* an independent statement of the rules (Study Material Ch 8 §5.1–5.5, Ch 7 §2.11), written without the lab's trees */
function reference(f) {
  if (f.nature === 'none') return 'unmodified';
  if (f.nature === 'multi') return f.formable ? 'unmodified' : 'disclaimer';
  if (f.nature === 'gc') {
    if (f.gcBasis === 'inappropriate') return 'adverse';
    if (f.gcBasis === 'unwilling') return f.pervasive ? 'disclaimer' : 'qualified';
    if (!f.mu || f.disclosed) return 'unmodified';
    return f.pervasive ? 'adverse' : 'qualified';
  }
  if (f.nature === 'mis') return !f.material ? 'unmodified' : f.pervasive ? 'adverse' : 'qualified';
  if (f.imposed && f.removed) return 'unmodified';
  if (f.altok) return 'unmodified';
  if (!f.imposed && !f.material) return 'unmodified';
  if (!f.pervasive) return 'qualified';
  return f.imposed && f.withdraw ? 'withdraw' : 'disclaimer';
}
test('brute force: every one of the 5 natures x 3 going concern bases x 2^14 switches computes, matches the reference, and keeps the invariants', () => {
  let n = 0;
  const combos = 1 << BOOLS.length;
  for (const nature of ['none', 'mis', 'scope', 'gc', 'multi']) for (const gcBasis of nature === 'gc' ? ['appropriate', 'inappropriate', 'unwilling'] : ['appropriate']) {
    for (let m = 0; m < combos; m++) {
      const f = { nature, gcBasis }; BOOLS.forEach((k, i) => (f[k] = !!(m & (1 << i))));
      const R = decide(f);
      n++;
      assert.equal(R.opinion, reference(f), JSON.stringify(f));
      if (R.opinion === 'disclaimer') assert.ok(R.kam === 'barred' || R.kam === 'na');
      if (R.murgc) assert.equal(R.opinion, 'unmodified');
      if (R.eom === 'yes') assert.ok(!(f.listed && f.eomKam));
      if (R.opinion === 'withdraw') assert.ok(f.nature === 'scope' && f.imposed && f.pervasive && f.withdraw);
      assert.equal(R.path[0], 'r');
      assert.equal(R.says.length, R.path.length, 'one caption per node on the path');
      /* turning "pervasive" on never gives a milder opinion */
      if (!f.pervasive) assert.ok(SEV[decide(Object.assign({}, f, { pervasive: true })).opinion] >= SEV[R.opinion], JSON.stringify(f));
    }
  }
  assert.equal(n, 7 * combos);
});
test('the tree path is a real root-to-leaf path in the drawn tree, ending at the leaf of the opinion', () => {
  const kids = n => (n.kids || []).map(k => k[1]);
  for (const nature of ['none', 'mis', 'scope', 'gc', 'multi']) for (const gcBasis of ['appropriate', 'inappropriate', 'unwilling']) for (let m = 0; m < 64; m++) {
    const f = { nature, gcBasis, material: !!(m & 1), pervasive: !!(m & 2), imposed: !!(m & 4), removed: !!(m & 8), altok: !!(m & 16), withdraw: !!(m & 32), mu: !!(m & 1), disclosed: !!(m & 2), formable: !!(m & 4) };
    const R = decide(f);
    let cur = LAB.TREES[R.tree];
    for (let i = 1; i < R.path.length; i++) { cur = kids(cur).find(k => k.id === R.path[i]); assert.ok(cur, `${R.tree}: ${R.path.join('>')}`); }
    assert.ok(cur.out, 'ends at a leaf');
    assert.equal(cur.out === 'wd' ? (f.withdraw ? 'withdraw' : 'disclaimer') : cur.out, R.opinion);
  }
});
test('every own-facts combination renders: frames have captions and drawable views, the last frame shows the report', () => {
  for (const nature of ['none', 'mis', 'scope', 'gc', 'multi']) for (const gcBasis of ['appropriate', 'inappropriate', 'unwilling']) for (let m = 0; m < (1 << 8); m++) {
    const r = own({ nature, gcBasis, material: !!(m & 1), pervasive: !!(m & 2), imposed: !!(m & 4), removed: !!(m & 8), altok: !!(m & 16), mu: !!(m & 32), disclosed: !!(m & 64), listed: !!(m & 128), kam: !!(m & 1), eom: !!(m & 2), om: !!(m & 4), eomKam: !!(m & 8) });
    assert.ok(r.frames.length >= 6 && r.frames.length <= 20);
    r.frames.forEach(fr => { assert.ok(fr.caption && fr.caption.length > 20); fr.view.forEach(v => { if (!v.html) assert.ok(diagram.render(v).length > 50); }); });
    assert.equal(r.stats.length, 4);
    assert.equal(r.table.rows.length, r.sim.path.length + 4, 'the trail: one row per question, the opinion, four report additions');
    r.table.rows.forEach(row => assert.ok(!/\*\*/.test(row.join(' ')), 'results are plain text'));
  }
});

/* ---------------------------------------------------------------- generated practice cases and the challenge */
test('generated practice cases: material iff the amount reaches materiality; pervasive iff a substantial proportion or many accounts; never print the answer', () => {
  const ANS = { unmodified: 'Unmodified', qualified: 'Qualified', adverse: 'Adverse', disclaimer: 'Disclaimer' };
  const seen = new Set();
  for (let seed = 1; seed <= 600; seed++) {
    const c = genCase(seed), r = run('gen', { seed });
    const material = c.amt >= c.mat, pervasive = material && (c.spread === 'subst' || c.spread === 'many');
    const want = !material ? 'unmodified' : !pervasive ? 'qualified' : c.f.nature === 'mis' ? 'adverse' : 'disclaimer';
    assert.equal(r.sim.opinion, want, `#${seed}: ${c.facts}`);
    if (c.spread === 'subst') assert.ok(c.amt / c.ta >= 0.5, 'a "substantial proportion" is at least half the total assets');
    if (c.spread === 'one') assert.ok(c.amt / c.ta < 0.15);
    assert.ok(!/\b(unmodified|qualified|adverse|disclaim\w*|pervasive|material)\b/i.test(c.facts), `#${seed} gives the answer away: ${c.facts}`);
    seen.add(want);
  }
  assert.deepEqual([...seen].sort(), ['adverse', 'disclaimer', 'qualified', 'unmodified']);
});
test('challenge: 400 seeds give an answer that is one of the buttons, and every fixed case in the pool is reachable', () => {
  const ids = new Set();
  for (let s = 1; s <= 400; s++) {
    const r = GA.util.rng(s), v = Object.assign({}, def.challenge.gen(r));
    const res = compute(v), want = def.challenge.solve(res, v);
    assert.ok(want, JSON.stringify(v));
    assert.ok(def.challenge.choices(v, res).some(c => c[0] === want));
    assert.ok(def.challenge.prompt(v, res).length > 40);
    assert.ok(def.challenge.explain(res, v).length > 40);
    ids.add(v.case);
  }
  CASES.filter(c => c.practice !== false).forEach(c => assert.ok(ids.has(c.id), c.id + ' is drawn'));
  CASES.filter(c => c.practice === false).forEach(c => assert.ok(!ids.has(c.id), c.id + ' (ICAI leaves the choice open) is not drawn'));
});
test('every case card computes, its ICAI-sourced cases cite the paper, and presets cite ICAI documents', () => {
  for (const c of CASES) {
    const r = run(c.id);
    assert.ok(r.frames.length >= 6);
    if (c.group === 'From ICAI papers') assert.match(c.src, /^(PYQ|RTP|MTP) /);
    if (c.group === 'From the Study Material') assert.match(c.src, /^ICAI Study Material, Ch 8/);
  }
  assert.ok(def.presets.length >= 3);
  assert.ok(def.presets.filter(p => /^(PYQ|RTP|MTP) /.test(p.label)).length >= 2);
  assert.ok(def.presets.some(p => /Tapri/.test(p.label)));
  def.presets.forEach(p => compute(Object.assign({}, p.values)));
});
test('bad input fails with a plain message', () => {
  assert.throws(() => decide({ nature: 'oops' }), /Choose what the audit found/);
  assert.throws(() => decide({ nature: 'gc', gcBasis: 'maybe' }), /going concern basis/);
  assert.throws(() => compute({ mode: 'case', case: 'nope' }), /Pick a case card/);
});
