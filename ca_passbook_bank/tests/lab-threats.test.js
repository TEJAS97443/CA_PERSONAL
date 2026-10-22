/* Independence Threats Lab (app/js/labs/threats.js): every card's classification is checked against the ICAI Study Material (Paper 5,
   Ch 11: Test Your Understanding 1–5 with their answers, the Case Study's answer key 1-c 2-d 3-b 4-d 5-a, and §6's own examples) and
   against real ICAI questions with their Suggested Answers / keys (PYQ Jan 2025 Q2(b); PYQ Sep 2024 CS1 Q4, Q5; PYQ Jan 2026 CS1 Q1,
   CS2 Q9; PYQ May 2024 Q5(c); RTP Jan 2025 Q7; RTP May 2025 Q7; RTP Jan 2026 Q20; MTP Sep 2026 S2 Q11; MTP May 2025 S1 Q9;
   MTP Sep 2024 S2 Q10), plus whole-deck invariants and the safeguard question's options on many seeds. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
const diagram = require('../app/js/viz/diagram.js');
const LAB = require('../app/js/labs/threats.js');
const { sortDeck, CARDS, DECKS, THREATS, PRINCIPLES, SAFEGUARDS, compute, def } = LAB;
const card = id => { const c = CARDS.find(x => x.id === id); assert.ok(c, id); return c; };
const ans = id => card(id).a;

test('SM Ch 11 Test Your Understanding 3-5 (answers): inherited shares and 40% fees are self-interest, bookkeeping then audit is self-review', () => {
  assert.equal(ans('sm-shares'), 'self-interest');
  assert.match(card('sm-shares').sgText, /selling the shares immediately, before accepting/);
  assert.equal(ans('sm-fees40'), 'self-interest');
  assert.equal(ans('sm-ngo'), 'self-review');
});
test('SM Ch 11 Case Study key (2-d, 5-a): the marketing blitz is advocacy; the IT contract is self-review only', () => {
  assert.equal(ans('sm-blitz'), 'advocacy');
  assert.equal(ans('sm-it'), 'self-review');
});
test('SM Ch 11 §6 examples land in the Study Material\'s own lists', () => {
  const want = { 'sm-loan': 'self-interest', 'sm-contingent': 'self-interest', 'sm-job': 'self-interest', 'sm-venture': 'self-interest', 'sm-director': 'self-review',
    'sm-trade': 'advocacy', 'sm-court': 'advocacy', 'sm-relative': 'familiarity', 'sm-years': 'familiarity', 'sm-gifts': 'familiarity',
    'sm-replace': 'intimidation', 'sm-squeeze': 'intimidation', 'sm-sue': 'intimidation' };
  for (const [id, a] of Object.entries(want)) assert.equal(ans(id), a, id);
  assert.equal(card('sm-years').sg, 'sg-rotate', 'rotation of auditors mainly addresses familiarity threats');
});
test('PYQ Jan 2025 Q2(b) (HK & Co.): ICAI\'s six classifications', () => {
  assert.deepEqual(['pyq-take', 'pyq-happy', 'pyq-chennai', 'pyq-chalk', 'pyq-arbitrator', 'pyq-trf'].map(ans),
    ['self-review', 'self-interest', 'familiarity', 'intimidation', 'advocacy', 'self-interest']);
});
test('ICAI MCQ keys: PYQ Sep 2024 CS1 Q5 (C), RTP Jan 2025 Q7 (b), RTP May 2025 Q7 (b), PYQ Jan 2026 CS2 Q9 (B), MTP Sep 2026 S2 Q11 (D)', () => {
  assert.equal(ans('pyq-ghb'), 'self-interest');
  assert.equal(ans('rtp-rao'), 'intimidation');
  assert.equal(ans('rtp-ramesh'), 'familiarity');
  assert.deepEqual([ans('pyq-gift'), ans('pyq-loanteam')], ['familiarity', 'self-interest'], 'familiarity and self-interest respectively');
  assert.equal(ans('mtp-bank'), 'intimidation');
});
test('fundamental principles: SM TYU 1-2 and Case Study 3-b, 4-d; PYQ May 2024 Q5(c); RTP Jan 2026 Q20; PYQ Sep 2024 Q4 (A) and Q6(b); PYQ Jan 2026 Q1 (B); MTP keys', () => {
  const want = { 'sm-letter': 'behaviour', 'sm-cert': 'integrity', 'sm-walker': 'behaviour', 'sm-cfs': 'pcdc',
    'pyq-sister': 'objectivity', 'pyq-insider': 'confidentiality', 'pyq-lawchange': 'pcdc',
    'rtp-jatin1': 'objectivity', 'rtp-jatin2': 'pcdc', 'rtp-jatin3': 'integrity', 'pyq-deadline': 'pcdc', 'sm-evidence': 'confidentiality',
    'pyq-skilledge': 'behaviour', 'mtp-misleading': 'integrity', 'mtp-declaration': 'confidentiality' };
  for (const [id, a] of Object.entries(want)) {
    const c = CARDS.find(x => x.id === id && x.kind === 'principles');
    assert.ok(c, id); assert.equal(c.a, a, id);
  }
  assert.match(card('sm-evidence').why, /not violated/, 'PYQ Sep 2024 Q6(b): disclosure required by law does not breach confidentiality');
});

/* ---------------------------------------------------------------- data invariants */
test('every card: a valid answer, its clue words really on the card, a source, and a text that does not name its answer', () => {
  const ids = new Set();
  for (const c of CARDS) {
    const key = c.kind + ':' + c.id;
    assert.ok(!ids.has(c.id), 'card ids are unique across both modes: ' + c.id); ids.add(c.id);
    const bins = c.kind === 'threats' ? THREATS : PRINCIPLES;
    assert.ok(bins.some(b => b[0] === c.a), key);
    assert.ok(DECKS.some(d => d[0] === c.deck), key);
    assert.ok(c.clue.length >= 1 && c.clue.every(cl => c.text.includes(cl)), `${key}: a clue is not in the text`);
    assert.ok(c.src && c.why && c.title, key);
    for (const b of bins) assert.ok(!new RegExp('\\b' + b[1].replace(/ /g, '\\s+') + '\\b', 'i').test(c.text), `${key} names "${b[1]}" in its text`);
    if (c.kind === 'threats') { assert.ok(SAFEGUARDS[c.sg], key); assert.ok(SAFEGUARDS[c.sg].for.includes(c.a), `${key}: its safeguard answers its threat`); }
  }
});
test('every deck in both modes has at least four cards and every threat and principle has at least three cards overall', () => {
  for (const kind of ['threats', 'principles']) {
    for (const [d] of DECKS) assert.ok(sortDeck(kind, d).placed.length >= 4, `${kind}/${d}`);
    for (const b of kind === 'threats' ? THREATS : PRINCIPLES) assert.ok(CARDS.filter(c => c.kind === kind && c.a === b[0]).length >= 3, b[0]);
  }
  for (const b of THREATS) assert.ok(CARDS.some(c => c.kind === 'threats' && c.deck === 'icai' && c.a === b[0]), 'the ICAI deck has every threat: ' + b[0]);
  for (const b of PRINCIPLES) assert.ok(CARDS.some(c => c.kind === 'principles' && c.deck === 'icai' && c.a === b[0]), 'the ICAI deck has every principle: ' + b[0]);
});
test('a deck animates one card per frame: start, n cards, the summary; the bins hold every card exactly once; views draw', () => {
  for (const mode of ['threats', 'principles']) for (const [deck] of DECKS) {
    const r = compute({ mode, deck, focus: '' }), n = r.sim.placed.length;
    assert.equal(r.frames.length, n + 2);
    r.frames.forEach(f => { assert.ok(f.caption.length > 30); f.view.forEach(v => { if (!v.html) assert.ok(diagram.render(v).length > 50); }); });
    const lastBins = r.frames[n + 1].view[0];
    const listed = lastBins.rows.map(row => (row[1] === '—' ? 0 : row[1].split('; ').length)).reduce((a, b) => a + b, 0);
    assert.equal(listed, n);
    assert.equal(r.stats.reduce((a, s) => a + +s.value, 0), n);
    for (let i = 1; i <= n; i++) assert.ok(/<mark>/.test(r.frames[i].view[0].html), 'the clue is marked');
    if (mode === 'threats') assert.match(r.frames[n + 1].caption, /desist[\s\S]*eliminate[\s\S]*safeguards[\s\S]*must not accept/);
  }
});
test('one card only: a card from the other mode is ignored; unknown decks and cards fail plainly', () => {
  assert.equal(compute({ mode: 'threats', deck: 'icai', focus: 'pyq-chalk' }).sim.placed.length, 1);
  assert.equal(compute({ mode: 'threats', deck: 'icai', focus: 'pyq-sister' }).sim.placed.length, CARDS.filter(c => c.kind === 'threats' && c.deck === 'icai').length);
  assert.throws(() => sortDeck('threats', 'nope'), /Pick a deck/);
  assert.throws(() => sortDeck('threats', 'icai', 'nope'), /not in the lab/);
  assert.throws(() => sortDeck('ethics', 'icai'), /Choose threats/);
});

/* ---------------------------------------------------------------- the challenge */
test('challenge: threat, safeguard and principle questions on 400 seeds per mode; one right button; wrong safeguards answer other threats', () => {
  for (const mode of ['threats', 'principles']) {
    compute({ mode, deck: 'sm-a', focus: '' });                       // the mode being explored
    const asks = new Set();
    for (let s = 1; s <= 400; s++) {
      const v = Object.assign({ mode, deck: 'sm-a', focus: '' }, def.challenge.gen(GA.util.rng(s)));
      const res = compute(v), want = def.challenge.solve(res, v), ch = def.challenge.choices(v, res), c = res.sim.placed[0].card;
      assert.equal(v.mode, mode); asks.add(v.ask);
      assert.equal(res.sim.placed.length, 1); assert.equal(c.id, v.focus, 'the problem is the drawn card');
      assert.equal(ch.filter(x => x[0] === want).length, 1, `${c.id}/${v.ask}`);
      if (v.ask === 'safeguard') {
        assert.ok(ch.length >= 3);
        ch.filter(x => x[0] !== want).forEach(x => { assert.ok(!SAFEGUARDS[x[0]].for.includes(c.a), `${c.id}: ${x[0]} could answer it`); assert.ok(!(c.alsoOk || []).includes(x[0])); });
      }
      assert.ok(def.challenge.prompt(v, res).length > 30 && def.challenge.explain(res, v).length > 30);
      assert.equal(def.challenge.view(res).length, 1);
      assert.ok(!/<mark>/.test(def.challenge.view(res)[0].html), 'the test card does not mark the clue');
    }
    assert.deepEqual([...asks].sort(), mode === 'threats' ? ['safeguard', 'threat'] : ['principle']);
  }
});
test('presets compute and cite ICAI documents', () => {
  def.presets.forEach(p => compute(Object.assign({ focus: '' }, p.values)));
  assert.ok(def.presets.filter(p => /\b(PYQ|RTP|MTP) /.test(p.label)).length >= 2);
  assert.ok(def.presets.some(p => /Tapri/.test(p.label)));
});
