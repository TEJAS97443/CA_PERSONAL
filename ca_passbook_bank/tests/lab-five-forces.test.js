/* Five Forces Lab (app/js/labs/five-forces.js): Porter's five forces with the Study Material's drivers (Paper 6B chapter 2, 2.5.1-2.5.2),
   checked against ICAI's Suggested Answers, plus brute-force checks of the rating rule and of the case / toggle synchronisation. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const LAB = require('../app/js/labs/five-forces.js');
const { rateForces, compute, def, FORCES, DRIVERS, CASES, FACTS, sync, levelOf } = LAB;
const base = () => L._defaults(def);
const run = v => compute(L.prepare(def, Object.assign(base(), v)));
const row = (res, id) => res.sim.rows.find(r => r.id === id);
const lcg = seed => { let s = seed; return () => (s = (s * 48271) % 2147483647) / 2147483647; };

/* ---------------------------------------------------------------- the model and its drivers (Study Material) */
test('the five areas of competitive pressure, PYQ January 2026 Q8(a): rivalry, new entrants, substitutes, suppliers and buyers', () => {
  assert.deepEqual(FORCES.map(F => F.name).sort(), ['Bargaining power of buyers', 'Bargaining power of suppliers', 'Rivalry among existing firms', 'Threat of new entrants', 'Threat of substitutes']);
  const fig = run({ case: 'cafes' }).frames[0].view[0];
  const t = fig.items.filter(i => i.kind === 'text').map(i => i.t);
  assert.deepEqual(['New entrants', 'Buyers', 'Suppliers', 'Rivalry', 'Substitutes'].filter(x => t.includes(x)).length, 5);
  const at = n => fig.items.find(i => i.kind === 'text' && i.t === n).at;
  assert.ok(at('New entrants')[1] > at('Rivalry')[1] && at('Substitutes')[1] < at('Rivalry')[1] && at('Suppliers')[0] < at('Rivalry')[0] && at('Buyers')[0] > at('Rivalry')[0], 'the Study Material\'s figure: entrants above, substitutes below, suppliers left, buyers right');
});
test('barriers to entry, PYQ September 2024 Q8(a) and MTP January 2026 Series II: capital requirements, economies of scale, product differentiation, switching costs, brand identity, access to distribution channels, aggressive retaliation', () => {
  const sm = FORCES.find(F => F.id === 'entrants').drivers.map(d => d[2]);
  for (const b of ['capital requirements', 'economies of scale', 'product differentiation', 'switching costs', 'brand identity', 'access to distribution channels', 'possibility of aggressive retaliation']) assert.ok(sm.includes(b), b);
});
test('cut-throat rivalry, PYQ January 2025 Q8(a) and RTP January 2026 Q10: industry leader, number of competitors, fixed costs, exit barriers, product differentiation, slow growth', () => {
  assert.deepEqual(FORCES.find(F => F.id === 'rivalry').drivers.map(d => d[2]), ['(i) industry leader', '(ii) number of competitors', '(iii) fixed costs', '(iv) exit barriers', '(v) product differentiation', '(vi) slow growth']);
});
test('buyers\' and suppliers\' power: the Study Material\'s conditions are all there', () => {
  assert.equal(FORCES.find(F => F.id === 'buyers').drivers.length, 6);
  assert.deepEqual(FORCES.find(F => F.id === 'suppliers').drivers.map(d => d[2]).slice(0, 3), ['(i) crucial, no substitutes', '(ii) high switching costs', '(iii) concentrated, limited in number']);
});

/* ---------------------------------------------------------------- ICAI cases */
test('RTP September 2026 Q9 (SwiftDeliver): in-house delivery → new entrants, fuel prices → suppliers, drone start-ups → substitutes, large clients → buyers; a highly competitive industry', () => {
  const C = CASES.swift, force = id => DRIVERS.find(d => d.id === id).force;
  const map = Object.fromEntries(Object.entries(C.yes).map(([id, t]) => [t.split(' ').slice(0, 3).join(' '), force(id)]));
  assert.equal(map['Many e-commerce firms'], 'entrants'); assert.equal(map['Fuel prices have'], 'suppliers');
  assert.equal(map['Drone-based last-mile delivery'], 'substitutes'); assert.equal(map['Large e-commerce clients'], 'buyers');
  const res = run({ case: 'swift' });
  assert.equal(row(res, 'buyers').level, 'strong'); assert.equal(row(res, 'suppliers').level, 'strong', 'ICAI: "strong bargaining power of buyers and suppliers"');
  assert.equal(row(res, 'rivalry').known, false, 'the case gives no fact about rivalry');
  assert.equal(res.sim.verdict, 'unattractive', 'ICAI: "a highly competitive environment"');
});
test('RTP September 2024 Q10 (Rajiv Arya, vacuum cleaners): rivalry is the significant force; patents keep entrants out; many small suppliers have little power; buyers not stated; house maids as a substitute', () => {
  const res = run({ case: 'vacuum' });
  assert.deepEqual(res.sim.strongest, ['rivalry']);
  assert.equal(row(res, 'entrants').level, 'weak'); assert.equal(row(res, 'suppliers').level, 'weak');
  assert.equal(row(res, 'buyers').known, false); assert.ok(row(res, 'substitutes').n === 1);
  assert.match(res.frames.find(f => /new entrants\*\* is \*\*weak/.test(f.caption)).caption, /patents/);
  assert.match(res.note, /RTP September 2024 Q10/);
});
test('RTP May 2026 MCQ 1(iii) (EcoRide, budget scooters, intense competition and thin margins): competitive rivalry, option (c)', () => {
  assert.deepEqual(run({ case: 'scooters' }).sim.strongest, ['rivalry']);
});
test('RTP May 2026 MCQ 3 (a few makers control specialised OLED screens, no alternative supplier): bargaining power of suppliers, option (c)', () => {
  const f = FACTS.find(x => /OLED/.test(x.text));
  assert.equal(f.force, 'suppliers'); assert.equal(f.src, 'RTP May 2026 MCQ 3');
});
test('Study Material examples: coir and synthetic fibre, and the alternatives to common stocks, are substitutes; industrial users who band together are buyers', () => {
  assert.equal(FACTS.find(x => /Coir/.test(x.text)).force, 'substitutes');
  assert.equal(FACTS.find(x => /common stocks/.test(x.text)).force, 'substitutes');
  assert.equal(FACTS.find(x => /industrial product/.test(x.text)).force, 'buyers');
});
test('the cast cases: rivalry is strongest among Tapri\'s cafés (moderately attractive); suppliers among airlines (unattractive)', () => {
  const c = run({ case: 'cafes' }), a = run({ case: 'airlines' });
  assert.deepEqual(c.sim.strongest, ['rivalry']); assert.equal(c.sim.verdict, 'moderately attractive');
  assert.deepEqual(a.sim.strongest, ['suppliers']); assert.equal(row(a, 'suppliers').level, 'fierce'); assert.equal(a.sim.verdict, 'unattractive');
});

/* ---------------------------------------------------------------- the rating rule */
test('levels: none weak, up to a fifth moderate, up to half strong, more than half fierce', () => {
  assert.deepEqual([0, 0.1, 0.2, 0.21, 0.5, 0.51, 1].map(f => levelOf(f).id), ['weak', 'moderate', 'moderate', 'strong', 'strong', 'fierce', 'fierce']);
});
test('brute force on 3,000 random driver sets: the levels, the strongest force and the verdict follow the stated rule, computed independently', () => {
  const r = lcg(29);
  for (let k = 0; k < 3000; k++) {
    const on = DRIVERS.filter(() => r() < 0.3).map(d => d.id), unknown = FORCES.filter(() => r() < 0.15).map(F => F.id);
    if (unknown.length === 5) continue;
    const R = rateForces(on, unknown);
    const pts = [], fr = {};
    FORCES.forEach(F => {
      if (unknown.includes(F.id)) return;
      const n = F.drivers.filter(d => on.includes(d[0])).length, f = n / F.drivers.length;
      const p = n === 0 ? 0 : 5 * n <= F.drivers.length ? 1 : 2 * n <= F.drivers.length ? 2 : 3;
      assert.equal(R.rows.find(x => x.id === F.id).pts, p, F.id + ' ' + n);
      pts.push(p); fr[F.id] = f;
    });
    const mean = pts.reduce((a, b) => a + b, 0) / pts.length;
    const want = pts.includes(3) || mean >= 1.5 ? 'unattractive' : mean < 1 && !pts.some(p => p >= 2) ? 'attractive' : 'moderately attractive';
    assert.equal(R.verdict, want);
    const top = Math.max(...Object.values(fr));
    assert.deepEqual(R.strongest, top > 0 ? Object.keys(fr).filter(id => fr[id] === top) : []);
  }
});
test('monotone: switching one more driver on never weakens its force and never makes the industry more attractive', () => {
  const rank = { attractive: 0, 'moderately attractive': 1, unattractive: 2 }, r = lcg(7);
  for (let k = 0; k < 1500; k++) {
    const on = DRIVERS.filter(() => r() < 0.3).map(d => d.id), off = DRIVERS.filter(d => !on.includes(d.id));
    if (!off.length) continue;
    const d = off[Math.floor(r() * off.length)], A = rateForces(on), B = rateForces(on.concat(d.id));
    assert.ok(B.rows.find(x => x.id === d.force).pts >= A.rows.find(x => x.id === d.force).pts);
    assert.ok(rank[B.verdict] >= rank[A.verdict]);
  }
});

/* ---------------------------------------------------------------- frames, inputs and the case / toggle sync */
test('frames: the blank model, then each force driver by driver and its rating, then the verdict with the summary table', () => {
  const res = run({ case: 'cafes' }), present = Object.keys(CASES.cafes.yes).length;
  const emptyForces = FORCES.filter(F => !F.drivers.some(d => d[0] in CASES.cafes.yes)).length;
  assert.equal(res.frames.length, 1 + present + emptyForces + 5 + 1);
  res.frames.forEach(f => { assert.ok(f.caption.length > 30); f.view.forEach(x => diagram.render(x)); });
  const last = res.frames[res.frames.length - 1];
  assert.equal(last.view[1].rows.length, 5); assert.match(last.caption, /Attractiveness is relative/);
  assert.equal(run({ case: 'vacuum' }).frames.filter(f => /not stated/.test(f.caption)).length, 1);
});
test('the case and the toggles stay in step: a case copies its drivers; editing a driver turns it into your own industry', () => {
  const v = L.prepare(def, Object.assign(base(), { case: 'airlines' }));
  DRIVERS.forEach(d => assert.equal(!!v[d.id], d.id in CASES.airlines.yes, d.id));
  v.r_slow = true; sync(v);
  assert.equal(v.case, 'custom');
  const res = compute(v);
  assert.equal(row(res, 'rivalry').n, Object.keys(CASES.airlines.yes).filter(id => id[0] === 'r').length + 1, 'the edited set is what is rated');
  v.case = 'cafes'; sync(v);
  assert.equal(v.case, 'cafes'); assert.equal(!!v.r_slow, false);
  const c = run({ case: 'custom', b_big: true, b_conc: true });
  assert.equal(row(c, 'buyers').n, 2); assert.equal(c.sim.rows.filter(x => x.n).length, 1);
});

/* ---------------------------------------------------------------- the challenge */
test('challenge: "which force" facts and "strongest force" sets each have one right answer; the strongest is unambiguous under any reasonable scale', () => {
  for (let s = 1; s <= 200; s++) {
    const P = L.problem(def, base(), s * 7919);
    const spec = L.answerSpec(def, P.values, P.result, P.want);
    assert.equal(spec.choices.filter(c => L.check(spec, c[0], P.want).ok).length, 1);
    const q = P.values.quiz;
    assert.ok(q && P.values.case === 'custom', 'the problem keeps its facts while it is asked');
    if (q.type === 'strongest') {
      const R = P.result.sim, top = R.rows.find(r => r.id === R.strongest[0]);
      assert.equal(R.strongest.length, 1); assert.ok(top.n / top.of > 0.5);
      R.rows.filter(r => r !== top).forEach(r => assert.ok(r.n / r.of <= 0.2, 'every other force at most a fifth'));
    } else assert.equal(P.want, FORCES.find(F => F.id === q.force).name);
    assert.ok(def.controls.filter(c => c.type === 'toggle').every(c => !c.show(P.values)), 'the toggles (which name each fact\'s force) hide while the problem is asked');
    assert.ok(!/Threat of|Bargaining power|Rivalry among/.test(JSON.stringify(def.challenge.view(P.result, P.values))), 'the facts do not name the answer');
  }
});
test('the "which force?" facts: one per case driver except the ambiguous ones, plus the Study Material\'s and ICAI\'s examples', () => {
  const { AMBIGUOUS } = LAB;
  FACTS.forEach(f => { assert.ok(!AMBIGUOUS.has(f.driver) && !AMBIGUOUS.has(f.from + '.' + f.driver), f.text); assert.equal(DRIVERS.find(d => d.id === f.driver).force, f.force, f.text); });
  assert.ok(FACTS.length >= 30, FACTS.length + ' facts');
  assert.ok(FACTS.some(f => /in-house delivery/.test(f.text) && f.force === 'entrants'), 'ICAI\'s SwiftDeliver reading of in-house delivery');
});
test('presets: every example computes and three cite ICAI RTPs', () => {
  for (const p of def.presets) assert.ok(run(p.values).frames.length >= 6, p.label);
  assert.equal(def.presets.filter(p => /^RTP (September|May) 20\d\d/.test(p.label)).length, 3);
});
