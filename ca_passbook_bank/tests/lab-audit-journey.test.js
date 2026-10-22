/* Audit Journey Lab (app/js/labs/audit-journey.js): the engagement in the Study Material's order, the Standards in scope for January 2027
   (~/CA_PERSONAL/ca_sources/APPLICABILITY.md §3), the rules ICAI's Suggested Answers rely on, and the "which Standard?" bank. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const L = require('../app/js/labs/framework.js');
const J = require('../app/js/labs/audit-journey.js');
const { journey, opinionOf, STEPS, SCENES, PHASES, compute, def } = J;
const V = over => Object.assign(L._defaults(def), over);
const ALL = { upto: 'file', listed: true, initial: true, ia: true, gc: 'mu-ok', opinion: 'qualified', eom: true };
const sasOf = s => s.sa.split(' · ');
/* the Standards the Paper 5 syllabus names for January 2027 (APPLICABILITY.md §3) */
const IN_SCOPE = ['SA 200', 'SA 210', 'SA 220', 'SA 230', 'SA 260', 'SA 265', 'SA 300', 'SA 315', 'SA 320', 'SA 330', 'SA 450', 'SA 500', 'SA 501', 'SA 505', 'SA 510', 'SA 520',
  'SA 530', 'SA 550', 'SA 560', 'SA 570', 'SA 580', 'SA 610', 'SA 700', 'SA 701', 'SA 705', 'SA 706', 'SA 710', 'SQC 1'];

test('audit-journey: the steps follow the engagement in order: acceptance → planning → risk and materiality → responses → evidence → completion → report → file', () => {
  const steps = journey(V(ALL)), idx = s => PHASES.findIndex(p => p[0] === s.phase);
  steps.forEach((s, i) => { if (i) assert.ok(idx(s) >= idx(steps[i - 1]), `${s.id} after ${steps[i - 1].id}`); });
  const first = sa => steps.findIndex(s => sasOf(s).includes(sa));
  const chain = ['SQC 1', 'SA 210', 'SA 300', 'SA 315', 'SA 320', 'SA 330', 'SA 500', 'SA 530', 'SA 450', 'SA 560', 'SA 570', 'SA 580', 'SA 700', 'SA 230'];
  chain.forEach((sa, i) => { if (i) assert.ok(first(sa) > first(chain[i - 1]), `${sa} comes after ${chain[i - 1]}`); });
  assert.equal(steps[steps.length - 1].sa, 'SA 230', 'the final audit file closes the journey');
});
test('audit-journey: every Standard in the January 2027 syllabus governs a step (SA 200 frames the journey), and nothing outside it does', () => {
  const sas = new Set(journey(V(ALL)).flatMap(sasOf).concat(['SA 200']));
  assert.deepEqual([...sas].sort(), IN_SCOPE.slice().sort());
  STEPS.flatMap(sasOf).forEach(sa => assert.ok(IN_SCOPE.includes(sa), sa));
});
test('audit-journey: conditional steps appear only when they apply', () => {
  const ids = o => journey(V(Object.assign({}, ALL, o))).map(s => s.id);
  assert.ok(ids({}).includes('kam') && !ids({ listed: false }).includes('kam'), 'SA 701 for a listed entity');
  assert.ok(ids({}).includes('open') && !ids({ initial: false }).includes('open'), 'SA 510 in an initial engagement');
  assert.ok(ids({}).includes('ia') && !ids({ ia: false }).includes('ia'), 'SA 610 with an internal audit function');
  assert.ok(ids({}).includes('mod') && !ids({ opinion: 'unmodified', gc: 'none' }).includes('mod'), 'SA 705 only for a modified opinion');
  assert.ok(ids({}).includes('eom') && !ids({ eom: false }).includes('eom'), 'SA 706 only when a matter needs emphasis');
  assert.deepEqual(journey(V({ upto: 'plan' })).map(s => s.id), ['accept', 'terms', 'plan'], 'cut after planning');
  assert.equal(journey(V({ upto: 'respond' })).pop().sa, 'SA 330');
});
test('audit-journey: SA 570 (SM pp. 7.21–7.22) and PYQ Jan 2026, Q11 key (B): an inadequately disclosed material uncertainty cannot leave the opinion unmodified', () => {
  const bad = opinionOf(V({ gc: 'mu-bad', opinion: 'unmodified' }));
  assert.equal(bad.op, 'qualified'); assert.match(bad.why, /qualified or adverse/);
  assert.equal(opinionOf(V({ gc: 'mu-bad', opinion: 'adverse' })).op, 'adverse', 'an adverse choice stands');
  const ok = compute(V({ gc: 'mu-ok', opinion: 'unmodified' }));
  assert.equal(ok.sim.opinion.op, 'unmodified');
  assert.ok(ok.frames.some(f => /Material Uncertainty Related to Going Concern/.test(f.caption)), 'adequate disclosure: unmodified, with the separate section');
  assert.ok(journey(V({ gc: 'mu-bad', opinion: 'unmodified' })).some(s => s.id === 'mod'), 'SA 705 step appears');
});
test('audit-journey: the rules ICAI\'s Suggested Answers rely on are stated at their step', () => {
  const rule = id => STEPS.find(s => s.id === id).rule, does = id => { const s = STEPS.find(x => x.id === id); return typeof s.does === 'function' ? s.does(V({})) : s.does; };
  assert.match(rule('wr'), /near as practicable to, but not after, the date of the report/, 'PYQ May 2026, Q1(c)');
  assert.match(rule('sub'), /cannot be dated earlier than the date they are approved/, 'PYQ Sep 2024, Q1(a)');
  assert.match(does('file'), /within 60 days/); assert.match(does('file'), /at least seven years/, 'PYQ Jan 2026, Q10 key (C); SM p. 6.16');
  assert.match(rule('plan'), /significant change/, 'RTP Jan 2026, Q1 key (d)');
  assert.match(rule('op'), /Basis for Opinion section comes directly after the Opinion section/, 'PYQ May 2026, Q3(b)');
  assert.match(rule('respond'), /each material class of transactions/, 'SA 330 (SM p. 3.70)');
  assert.match(rule('ia'), /alone is responsible for the opinion/, 'SA 610 (SM p. 4.35)');
});
test('audit-journey: each frame lights one more Standard; the documentation bar runs underneath the whole way', () => {
  const v = V(ALL), steps = journey(v), res = compute(v);
  assert.equal(res.frames.length, steps.length + 1);
  res.frames.forEach((f, k) => {
    const g = f.view[0], real = g.blocks.filter(b => b.p !== 'Throughout' && b.to > b.from);
    assert.equal(real.length, steps.slice(0, k).filter(s => s.id !== 'file').length, `frame ${k}`);
    const doc = g.blocks.find(b => b.p === 'Throughout' && b.from === 0 && b.to > 0);
    if (k) assert.ok(doc && doc.to === Math.min(k, steps.length - 1), 'SA 230 runs from the start to the current step');
    diagram.render(g); f.view.slice(1).forEach(x => diagram.render(x));
    if (k) assert.ok(f.caption.includes(steps[k - 1].sa));
  });
  assert.equal(res.table.rows.length, steps.length);
});
test('audit-journey: the "which Standard?" bank: each answer is its step\'s Standard, four distinct choices, and the text never names the answer', () => {
  for (const S of SCENES) {
    const st = STEPS.find(x => x.id === S.step);
    if (st) assert.ok(sasOf(st).includes(S.sa), `${S.sa} belongs to step ${S.step}`); else assert.equal(S.sa, 'SA 200');
    const ch = [S.sa].concat(S.alt);
    assert.equal(new Set(ch).size, 4, S.text);
    ch.forEach(x => assert.ok(IN_SCOPE.includes(x), x));
    const num = S.sa.replace(/^(SA|SQC) /, '');
    assert.ok(!new RegExp('\\b' + num + '\\b').test(S.text), `"${S.text}" names ${S.sa}`);
  }
  const covered = new Set(SCENES.map(s => s.sa));
  IN_SCOPE.forEach(sa => assert.ok(covered.has(sa), `${sa} has a scene`));
});
test('audit-journey: the scenes taken from ICAI papers carry the Standard of the Suggested Answer', () => {
  const want = { 'MTP May 2024 Series I, Q3.2': 'SA 330', 'RTP Jan 2026, Q1': 'SA 300', 'RTP Jan 2026, Q3': 'SA 320', 'PYQ Jan 2026, Q11': 'SA 705', 'PYQ May 2026, Q1(c)': 'SA 580',
    'PYQ Sep 2024, Q1(a)': 'SA 560', 'MTP Sep 2024 Series II, Q5': 'SA 560', 'MTP Sep 2024 Series I, Q12': 'SA 505', 'PYQ Jan 2026, Q2': 'SA 530', 'PYQ May 2026, Q1(b)': 'SA 530',
    'MTP Sep 2024 Series II, Q6': 'SA 450', 'PYQ Jan 2026, Q10': 'SA 230', 'PYQ May 2026, Q3(b)': 'SA 700', 'MTP Sep 2024 Series I, Q10': 'SA 210' };
  for (const [src, sa] of Object.entries(want)) { const S = SCENES.find(x => x.src === src); assert.ok(S, src); assert.equal(S.sa, sa, src); }
});
test('audit-journey: the challenge offers the answer among four Standards and explains it; the test picture hides the Standards', () => {
  const r = (() => { let s = 5; return () => (s = (s * 48271) % 2147483647) / 2147483647; })();
  for (let k = 0; k < 200; k++) {
    const v = L.prepare(def, V(def.challenge.gen(r))), res = compute(v), want = def.challenge.solve(res, v), ch = def.challenge.choices(v, res);
    assert.equal(ch.length, 4); assert.ok(ch.some(c => c[0] === want));
    assert.ok(!def.challenge.prompt(v).includes(want));
    assert.ok(def.challenge.explain(res, v).startsWith(`**${want}**`));
    const html = diagram.render(def.challenge.view(res, v)[0]);
    assert.ok(!/>\s*(\d{3}|SA \d{3})\s*</.test(html), 'no Standard numbers on the hidden timeline');
  }
});
test('audit-journey: the defaults and every example compute and draw', () => {
  for (const v of [L._defaults(def)].concat(def.presets.map(p => V(p.values)))) {
    const res = compute(L.prepare(def, v));
    assert.ok(res.frames.length >= 3 && res.frames.length <= 40);
    res.frames.forEach(f => f.view.forEach(x => diagram.render(x)));
  }
  assert.ok(def.presets.some(p => /(MTP|RTP|PYQ) [A-Z][a-z]{2} \d{4}/.test(p.label)));
});
