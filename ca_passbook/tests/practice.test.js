/* Practice screens: the pure helpers behind the calm bank rows (GA.pyqLib, core/pyqlib.js) and the question card's decisions (GA.qcard.lib,
   views/qcard.js): one radio group, safe keys, NAT entry, the engine's marking notes, the D17 reveal, no-key questions and the Trap line.
   PassBook ships no question yet; these pin the machinery the ICAI bank will run on, with made-up question records. */
globalThis.GA = globalThis.GA || {};
require('../app/js/core/util.js');
require('../app/js/core/scoring.js');
const libPath = (() => { try { const L = require('../app/js/core/pyqlib.js'); if (L && L.texPlain) return '../app/js/core/pyqlib.js'; } catch (e) { /* not moved yet */ } return '../app/js/views/pyq.js'; })();
const P = require(libPath);
require('../app/js/views/qcard.js');
const QC = globalThis.GA.qcard, QL = QC.lib, SC = globalThis.GA.scoring;
const fs = require('fs'), path = require('path');
const SRC = fs.readFileSync(path.join(__dirname, '../app/js/views/qcard.js'), 'utf8');

/* the bank's preview helpers moved to core/pyqlib.js (WP9b) and were rewritten for P2-25 (Unicode sub/superscripts, bracketed fractions, code and
   table previews); tests/pyq.test.js owns them, these pin what the practice screens rely on */
test('practice: texPlain turns inline TeX into readable text', () => {
  assert.equal(P.texPlain('\\Theta(n \\log n)'), 'Θ(n log n)');
  assert.equal(P.texPlain('\\frac{1}{3}'), '1/3');
  assert.equal(P.texPlain('2^{n}'), '2ⁿ');
  assert.equal(P.texPlain('L = \\{a^n b^n \\mid n \\geq 0\\}'), 'L = {aⁿ bⁿ | n ≥ 0}');   // set braces survive, grouping braces go
  assert.equal(P.texPlain('\\left( x \\right)'), '( x )');
  assert.equal(P.texPlain('\\mathcal{R}'), 'R');
  assert.equal(P.texPlain('a \\le b \\neq c'), 'a ≤ b ≠ c');
  assert.equal(P.texPlain('f(x) = \\begin{cases} ax + b & x < 1 \\\\ x^3 & x \\ge 1 \\end{cases}'), 'f(x) = ax + b x < 1; x³ x ≥ 1');   // environments and alignment marks go
  assert.equal(P.texPlain(''), '');
  assert.equal(P.texPlain('\\frac{1}{3\\sqrt{2\\pi}} \\exp(-x^2/18), \\qquad x'), '1/(3√(2π)) exp(-x²/18), x');   // nested braces, \\qquad
  assert.equal(P.texPlain('\\frac12 + \\dfrac{n}{2}'), '1/2 + n/2');
});

test('practice: plain() keeps maths and punctuation, marks code and tables, drops Markdown syntax', () => {
  const t = P.plain('Let $L$ be a **regular** language and $f(x) = x^2$. Which `x` is _true_?\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\nDone.');
  assert.equal(t, 'Let L be a regular language and f(x) = x². Which x is true? [table: a · b] Done.');
  assert.equal(P.plain('Run:\n```c\nint x;\n```\nthen'), 'Run: [code: int x;] then');
  assert.equal(P.plain('See [[os.mem.paging|paging]] and [this](http://x).'), 'See paging and this.');
});

test('practice: snippet() cuts long stems at a word with an ellipsis, short ones untouched', () => {
  const long = 'word '.repeat(80);
  const s = P.snippet({ stem: long });
  assert.ok(s.length <= 191 && s.endsWith('…') && !/\s…$/.test(s), s);
  assert.equal(P.snippet({ stem: 'Short $x$ stem.' }), 'Short x stem.');
  assert.equal(P.snippet({ group: { context: 'Passage only' } }), 'Passage only');
  assert.equal(P.snippet({}), '');
});

test('practice: the marking note states the engine\'s rule for each answer type (its objective-question model: MCQ, MSQ, NAT)', () => {
  assert.match(QC.markingNote({ type: 'MCQ', marks: 1 }), /\+1<\/b> if right, <b class="n">−1\/3<\/b> if wrong/);
  assert.match(QC.markingNote({ type: 'MCQ', marks: 2 }), /−2\/3/);
  assert.match(QC.markingNote({ type: 'MSQ', marks: 2 }), /^2-mark MSQ: .*No partial credit, no negative marking\./);
  assert.match(QC.markingNote({ type: 'NAT', marks: 1 }), /^1-mark NAT: .*No negative marking\./);
  for (const t of ['MSQ', 'NAT']) assert.ok(!/−/.test(QC.markingNote({ type: t, marks: 2 })), t + ' has no negative marks');
});

/* ---------------------------------------------------------------- P0-04: linked pairs, marks to all and papers without a key */
test('practice (P0-04): marking notes and hints are true for linked pairs, marks to all and papers without a key', () => {
  const second = { type: 'MCQ', marks: 2, hasKey: true, group: { kind: 'linked', role: 'second' } };
  const first = { type: 'MCQ', marks: 2, hasKey: true, group: { kind: 'linked', role: 'first' } };
  assert.ok(!/−/.test(QC.markingNote(second)) && /no negative marking/.test(QC.markingNote(second)), QC.markingNote(second));
  assert.match(QC.markingNote(first), /−2\/3<\/b> if wrong/);
  assert.match(QC.markingNote(first), /second part counts only if this one is right/);
  // the catalogue entry (no answer record) and the full record agree
  const mtaMeta = { type: 'MCQ', marks: 1, hasKey: true, mta: true }, mtaFull = { type: 'MCQ', marks: 1, answer: { kind: 'mta' } };
  for (const q of [mtaMeta, mtaFull]) { assert.match(QC.markingNote(q), /marks to all/); assert.ok(!/−/.test(QC.markingNote(q))); assert.ok(!/−/.test(QL.hintText(q))); }
  const nokey9 = { type: 'MCQ', marks: 2, year: 2009, hasKey: false }, nokey7 = { type: 'MCQ', marks: 2, year: 2007, answer: null };
  assert.match(QC.markingNote(nokey9), /practice only and nothing is scored/);
  assert.match(QC.markingNote(nokey9), /−2\/3/);
  assert.match(QC.markingNote(nokey7), /−0\.5/);                         // GATE 2007–08: 0.25 / 0.5 per wrong answer
  assert.match(QC.markingNote({ type: 'MCQ', marks: 1, year: 2008, hasKey: false }), /−0\.25/);
  assert.equal(QL.hintText(nokey9), 'Pick one · practice only, not scored (no official key for this paper)');
  assert.ok(!/−/.test(QL.hintText(second)), QL.hintText(second));
  assert.equal(QL.hintText({ type: 'MCQ', marks: 1, hasKey: true }), 'Pick one · −1/3 if wrong');   // P3-18: 'Pick one · −2/3 if wrong'
  assert.equal(QL.hintText({ type: 'MCQ', marks: 2, hasKey: true }), 'Pick one · −2/3 if wrong');
  assert.equal(QL.hintText({ type: 'MSQ', marks: 2, hasKey: true }), 'Pick one or more · no negative marking, no partial credit');
  assert.equal(QL.hintText({ type: 'NAT', marks: 1, hasKey: true }), 'Type a number · no negative marking');
  assert.match(QL.hintText(mtaMeta), /^Pick one · practice only, not scored/);
});

test('practice (P0-04): a wrong second answer of a linked pair scores 0, never −2/3', () => {
  const q = { type: 'MCQ', marks: 2, answer: { kind: 'single', value: 'B' }, group: { kind: 'linked', role: 'second' } };
  const m = QL.markOf(q, 'C');
  assert.equal(m.state, 'wrong'); assert.equal(m.score, 0); assert.equal(m.negative, 0);
  assert.match(QL.marksText(q, m), /^0 marks \(second part of a linked pair/);
  const plainQ = { type: 'MCQ', marks: 2, answer: { kind: 'single', value: 'B' } };
  assert.equal(QL.marksText(plainQ, QL.markOf(plainQ, 'C')), '−2/3 mark');
  assert.equal(QL.marksText(plainQ, QL.markOf(plainQ, 'B')), '+2 marks');
  const msq = { type: 'MSQ', marks: 1, answer: { kind: 'multi', value: ['A', 'C'] } };
  assert.equal(QL.marksText(msq, QL.markOf(msq, ['A'])), '0 marks (no negative marking)');
});

/* ---------------------------------------------------------------- P0-01: one radio group per card */
test('practice (P0-01): every option of a card shares one radio name, made once per card (not one per option)', () => {
  const m = /<input type="\$\{multi \? 'checkbox' : 'radio'\}" name="([^"]+)"/.exec(SRC);
  assert.ok(m, 'the option input template is found');
  assert.equal(m[1], '${uid}', 'the name is the card-wide uid');
  assert.ok(!/name="[^"]*U\.uid\(\)/.test(SRC), 'no per-option U.uid() in a name');
  assert.ok(/const uid = 'qc' \+ \(\+\+seq\)/.test(SRC), 'uid is made once in create()');
  // the response of a radio group is one letter, an MSQ's a sorted list
  assert.deepEqual(QL.picksOf('c'), ['C']); assert.deepEqual(QL.picksOf(['C', 'a']), ['A', 'C']); assert.deepEqual(QL.picksOf(null), []); assert.deepEqual(QL.picksOf('148'), []);
});

/* ---------------------------------------------------------------- P0-13: keys */
test('practice (P0-13): Enter grades only from an option, the card itself or the NAT box; arrows on an option stay with the radio group', () => {
  const R = (key, tag, type, role) => QL.keyRole(key, { tag, type, role });
  for (const [tag, type] of [['BUTTON', 'button'], ['A', ''], ['SUMMARY', ''], ['TEXTAREA', ''], ['SELECT', '']]) assert.equal(R('Enter', tag, type).check, false, 'Enter on ' + tag + ' never grades');
  assert.equal(R('Enter', 'DIV', '', 'button').check, false, 'a role=button control never grades');
  assert.equal(R('Enter', 'INPUT', 'radio').check, true);
  assert.equal(R('Enter', 'INPUT', 'checkbox').check, true);
  assert.equal(R('Enter', 'ARTICLE', '').check, true);
  assert.deepEqual(R('Enter', 'INPUT', 'text'), { check: true, own: true, nat: true });
  for (const k of ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp']) {
    assert.equal(R(k, 'INPUT', 'radio').own, true, k + ' on a radio is the group\'s');
    assert.equal(R(k, 'INPUT', 'radio').check, false);
    assert.equal(R(k, 'BUTTON', 'button').own, false, k + ' on a button is left to the page');
  }
  assert.deepEqual(R('j', 'INPUT', 'radio'), { check: false, own: false, nat: false }, 'J/K and letters reach the page');
  // the card's exposed check() is guarded by the key being dispatched
  assert.ok(/check\(\) \{ if \(kd && !kd\.check\) return; check\(\); \}/.test(SRC), 'api.check is guarded');
  assert.ok(/kd = \{ check: role\.check && !e\.repeat \}/.test(SRC), 'a repeated key never grades');
});

/* ---------------------------------------------------------------- P0-16: NAT entry */
test('practice (P0-16): a NAT box keeps only digits, one point and a leading minus; only a real number is graded', () => {
  assert.equal(QL.natClean('12abc'), '12');
  assert.equal(QL.natClean('abc'), '');
  assert.equal(QL.natClean('−2'), '-2');
  assert.equal(QL.natClean('1.2.3'), '1.23');
  assert.equal(QL.natClean('3-4'), '34');
  assert.equal(QL.natClean('-0.5'), '-0.5');
  assert.deepEqual(QL.natRead('0,75'), { clean: '075', value: 75, why: 'comma' }, 'a comma is refused and named');
  assert.equal(QL.natRead('-').value, null); assert.equal(QL.natRead('-').why, 'partial');
  assert.equal(QL.natRead('.').why, 'partial');
  assert.equal(QL.natRead('12abc').why, 'chars');
  assert.deepEqual(QL.natRead('-2'), { clean: '-2', value: -2, why: null });
  assert.equal(QL.natRead('').value, null); assert.equal(QL.natRead('').why, null);
  assert.equal(QL.natValue('0,75'), null, 'never reinterpret a comma');
  assert.equal(QL.natValue('−2.5'), -2.5);
  assert.equal(QL.natValue('.5'), 0.5);
  assert.equal(QL.natValue('12abc'), null);
  // graded against the key's range only as a number
  const q = { type: 'NAT', marks: 1, answer: { kind: 'range', min: -2, max: -2 } };
  assert.equal(SC.mark(q, '-2').state, 'correct');
  assert.ok(/inputmode="decimal"/.test(SRC) && /data-a="pm"/.test(SRC), 'decimal pad plus a ± key');
});

/* ---------------------------------------------------------------- P1-40 / D17 option C: the reveal */
const mcq = { type: 'MCQ', marks: 1, options: ['w', 'x', 'y', 'z'], answer: { kind: 'single', value: 'D' } };
test('practice (P1-40, D17 C): after a miss the pick keeps its fill, the correct option is filled green, the rest dim', () => {
  assert.deepEqual(QL.optionStates(mcq, 'B', { correct: false }), { A: 'dim', B: 'bad', C: 'dim', D: 'ok' });
  assert.deepEqual(QL.optionStates(mcq, 'D', { correct: true }), { A: 'dim', B: 'dim', C: 'dim', D: 'ok' });
  assert.deepEqual(QL.optionStates(mcq, null, {}), { A: 'dim', B: 'dim', C: 'dim', D: 'ok' }, 'a peek shows the answer filled');
  const msq = { type: 'MSQ', marks: 2, options: ['w', 'x', 'y', 'z'], answer: { kind: 'multi', value: ['A', 'C'] } };
  assert.deepEqual(QL.optionStates(msq, ['A', 'B'], { correct: false }), { A: 'ok', B: 'bad', C: 'miss', D: 'dim' }, 'a missed MSQ option stays dashed');
  const either = { type: 'MCQ', marks: 1, options: ['w', 'x', 'y', 'z'], answer: { kind: 'oneof', alts: [{ kind: 'single', value: 'C' }, { kind: 'single', value: 'D' }] } };
  assert.deepEqual(QL.optionStates(either, 'C', { correct: true }), { A: 'dim', B: 'dim', C: 'ok', D: 'miss' }, 'another accepted answer is dashed');
  assert.deepEqual(QL.optionStates(either, 'A', { correct: false }), { A: 'bad', B: 'dim', C: 'ok', D: 'ok' });
  assert.deepEqual(QL.optionStates({ type: 'NAT', answer: { kind: 'range', min: 1, max: 1 } }, '2', {}), {});
});

test('practice (P1-40, D17 C): a miss gets a neutral banner with the penalty and the Trap line; never a red banner', () => {
  const m = QL.markOf(mcq, 'B');
  const f = QL.feedback(mcq, 'B', m, { trap: '(B) labels the offset bits as the index.' });
  assert.equal(f.cls, 'miss'); assert.ok(f.open, 'a miss opens the worked solution');
  assert.match(f.html, /class="qc-v miss"/); assert.ok(!/qc-v bad/.test(f.html));
  assert.match(f.html, /Not quite<\/b> <span>· −1\/3 mark<\/span>/);
  assert.match(f.html, /<span class="qc-trap"><b>Trap:<\/b> \(B\) labels the offset bits as the index\.<\/span>/);   // CONTENT_GUIDE §2b: 'Trap: …'
  assert.match(f.html, /Official answer <b>D<\/b>.*Your answer <b>B<\/b>/);
  assert.match(f.say, /^Not quite\. −1\/3 mark\. The answer is D\./);
  const ok = QL.feedback(mcq, 'D', QL.markOf(mcq, 'D'), {});
  assert.equal(ok.cls, 'ok'); assert.equal(ok.open, false, 'a correct answer keeps the solution closed (P1-19)');
  const peek = QL.feedback(mcq, null, QL.markOf(mcq, null), { peek: true });
  assert.equal(peek.cls, 'muted'); assert.ok(peek.open); assert.match(peek.html, /Answer shown<\/b> <span>· not counted<\/span>/);   // P3-18: neutral, never 'Not attempted'
  assert.ok(!/Not attempted|qc-v warn/.test(peek.html));
});

test('practice (P1-40, D17 C): the Trap line only after a keyed, undisputed MCQ or MSQ miss, never in the runner or for a NAT', () => {
  const wrong = { state: 'wrong' };
  assert.equal(QL.trapWanted(mcq, wrong, 'practice', {}), true);
  assert.equal(QL.trapWanted(mcq, wrong, 'embed', null), true);
  assert.equal(QL.trapWanted(mcq, wrong, 'exam', {}), false);
  assert.equal(QL.trapWanted(mcq, wrong, 'practice', { dispute: 'reason' }), false, 'never on a disputed key');
  assert.equal(QL.trapWanted(Object.assign({}, mcq, { disputed: true }), wrong, 'practice', {}), false);
  assert.equal(QL.trapWanted(mcq, { state: 'correct' }, 'practice', {}), false);
  assert.equal(QL.trapWanted({ type: 'NAT', answer: { kind: 'range', min: 1, max: 1 } }, wrong, 'practice', {}), false);
  assert.equal(QL.trapWanted({ type: 'MCQ', answer: null }, wrong, 'practice', {}), false, 'never on a paper without a key');
  // GA.pyqLib.trapLine (WP9b) when it is loaded; the card passes the solution text and the picks
  const sol = { s: '**Idea.** x.\n\n**Trap.** (B) labels the 4 offset bits as the index. (A) and (C) take them away twice.\n\n**Answer: D**' };
  if (globalThis.GA.pyqLib && globalThis.GA.pyqLib.trapLine) {
    assert.equal(QL.trapFor(sol, ['B']), '(B) labels the 4 offset bits as the index.');
    assert.equal(QL.trapFor(sol, ['D']), null);
  }
  const keep = globalThis.GA.pyqLib; globalThis.GA.pyqLib = {};
  assert.equal(QL.trapFor(sol, ['B']), null, 'no lib, no line');
  globalThis.GA.pyqLib = keep;
});

/* ---------------------------------------------------------------- P1-23 / D9: papers without a key, marks to all */
test('practice (P1-23, D9): no key means practice only, our worked answer with a dashed outline, never ok / bad colours', () => {
  const q = { type: 'MCQ', marks: 1, options: ['w', 'x', 'y', 'z'], answer: null };
  assert.equal(QL.kindOf(q), 'nokey');
  const blind = QL.blindOf(q, { blind: 'B', by: 'blind-solve' });
  assert.deepEqual(blind, { text: 'B', letters: ['B'] });
  assert.deepEqual(QL.optionStates(q, 'B', { blind }), { A: 'dim', B: 'ours', C: 'dim', D: 'dim' });
  assert.deepEqual(QL.optionStates(q, 'C', { blind }), { A: 'dim', B: 'ours', C: '', D: 'dim' }, 'the pick keeps its selection, no fill');
  const m = QL.markOf(q, 'C');
  assert.equal(m.state, 'ungraded');
  const same = QL.feedback(q, 'B', QL.markOf(q, 'B'), { blind });
  assert.equal(same.cls, 'muted'); assert.match(same.html, /Our worked answer <b>B<\/b>.*same as yours/); assert.equal(same.open, false);
  const diff = QL.feedback(q, 'C', m, { blind });
  assert.match(diff.html, /yours <b>C<\/b>.* · not an official key/); assert.equal(diff.open, true, 'a different answer opens the solution');
  assert.ok(!/qc-v (ok|bad|miss)/.test(same.html + diff.html), 'no graded banner');
  assert.ok(!/−/.test(same.html + diff.html), 'no penalty text');
  assert.match(QL.feedback(q, 'C', m, { keyNote: 'The IIT organisers never published an answer key for this paper' }).html, /never published an answer key/);
  // marks to all: practice only too
  const mta = { type: 'MCQ', marks: 1, options: ['w', 'x', 'y', 'z'], answer: { kind: 'mta' } };
  assert.equal(QL.kindOf(mta), 'mta');
  assert.match(QL.feedback(mta, 'A', QL.markOf(mta, 'A'), {}).html, /Marks to all<\/b> <span>· The official key gave every candidate the marks/);
  assert.match(QL.feedback(mta, 'A', QL.markOf(mta, 'A'), { paper: { organiser: 'IIT Delhi', year: 2012 } }).html, /IIT Delhi(&#39;|')s official key gave every candidate the marks/);   // P2-28
  // NAT and MSQ blind answers
  assert.deepEqual(QL.blindOf({ type: 'NAT' }, { blind: '148' }), { text: '148', num: 148 });
  assert.deepEqual(QL.blindOf({ type: 'MSQ' }, { blind: 'A;C' }), { text: 'A, C', letters: ['A', 'C'] });
  assert.equal(QL.sameAsBlind({ type: 'NAT' }, '148.0', { num: 148 }), true);
  assert.equal(QL.sameAsBlind({ type: 'MSQ' }, ['C', 'A'], { letters: ['A', 'C'] }), true);
  assert.equal(QL.sameAsBlind({ type: 'MCQ' }, null, { letters: ['A'] }), null);
  assert.equal(QL.blindOf(q, { by: 'key-only' }), null);
  // a check without a usable key records 'seen' only (D9), never an attempt
  assert.ok(/if \(kind === 'keyed'\) A\.attempt\(/.test(SRC) && /else if \(A\.setSeen\) A\.setSeen\(q\.id\)/.test(SRC));
});

/* ---------------------------------------------------------------- P1-21, P1-18: numbering and the phone header line */
test('practice (P1-21, P1-18): progress reads "i of n"; the phone header line names the paper unless the page does', () => {
  assert.ok(/<span>\$\{P\.i\} of \$\{P\.n\}<\/span>/.test(SRC) && !/Question \$\{/.test(SRC), 'no "Question 47" beside a printed Q37');
  const p2021 = { year: 2021, set: 1, label: 'GATE 2021 CS · Set 1' }, p2019 = { year: 2019, set: 1, label: 'GATE 2019 CS' };
  assert.equal(QL.shortId({ section: 'CS', no: 11 }, p2021), '2021 Set 1 · Q11');
  assert.equal(QL.shortId({ section: 'GA', no: 5 }, p2019), '2019 · GA Q5');
  assert.equal(QL.shortId({ section: 'CS', no: 37 }, p2019, true), 'Q37');
});

/* ---------------------------------------------------------------- D5, P1-19, P1-55: naming, one fold, touch-safe tips */
test('practice (D5, P1-19, P1-55): "Bookmark" outside the runner, no duplicate Show solution, provenance as an info tip', () => {
  assert.ok(!/Mark<span class="qc-xl"> for review/.test(SRC) && !/Marked for review/.test(SRC), 'no "Mark for review" outside the runner');
  assert.ok(/'Bookmarked' : 'Bookmark'/.test(SRC));
  assert.ok(!/data-a="sol"/.test(SRC) && !/Show solution/.test(SRC), 'the fold is the only solution control');
  assert.deepEqual(QL.badgeOf('keyed', { agrees: true }).slice(0, 3), ['ok', 'check', 'official key · cross-checked']);
  assert.equal(QL.badgeOf('keyed', { dispute: 'x' })[2], 'key questioned');
  assert.equal(QL.badgeOf('nokey', { blind: 'B' })[2], 'our answer');
  assert.equal(QL.badgeOf('nokey', null)[2], 'no official key');
  assert.equal(QL.badgeOf('mta', null)[2], 'marks to all');
  assert.ok(/infoTip\(b\[3\]/.test(SRC), 'the badge is GA.ui.infoTip');
});

/* ---------------------------------------------------------------- review mode: the stored state of a sitting wins (P0-04) */
test('practice (P0-04): in review, a linked second the sitting did not evaluate says so and is never "Not quite"', () => {
  const q = { type: 'MCQ', marks: 2, options: ['w', 'x', 'y', 'z'], answer: { kind: 'single', value: 'B' }, group: { kind: 'linked', role: 'second' } };
  const f = QL.feedback(q, 'C', { score: 0, state: 'notevaluated', negative: 0 }, { state: 'notevaluated' });
  assert.equal(f.cls, 'warn'); assert.match(f.html, /Not evaluated<\/b>/); assert.ok(!/Not quite/.test(f.html));
  const skip = QL.feedback(q, null, QL.markOf(q, null), {});
  assert.match(skip.html, /Not attempted<\/b> <span>· 0 marks<\/span>/); assert.equal(skip.open, false);
});

/* ---------------------------------------------------------------- P1-18, P1-19, P1-22: the answer loop stays in view after a check */
test('practice (P1-18, P1-22): after a check the verdict is scrolled just above the bottom docks, never under the top bar', () => {
  const band = { top: 72, bottom: 696 };                                   // below the sticky top bar, above the docked Next (or a set's end panel)
  assert.equal(QL.scrollNeed(759, 682, band), 63, 'a verdict half under the docked Next moves up by what it needs');
  assert.equal(QL.scrollNeed(690, 610, band), 0, 'already in view: no scroll');
  assert.equal(QL.scrollNeed(697, 610, band), 0, 'a pixel is not worth a scroll');
  assert.equal(QL.scrollNeed(1400, 300, band), 228, 'a tall box: its top stops at the top of the band');
  assert.equal(QL.scrollNeed(60, 20, band), 0, 'a box above the screen is left alone');
  // the card: a correct answer keeps its verdict in view after the page has docked its own panel; a miss scrolls once, when its fold opens
  assert.ok(/if \(!f\.open\) setTimeout\(keepVerdict, \d+\)/.test(SRC), 'check() keeps the verdict in view when no fold opens');
  assert.ok(/bringUp\(r\.bottom, fb\.hidden \? r\.top : Math\.min\(r\.top, fb\.getBoundingClientRect\(\)\.top\)\)/.test(SRC), 'the fold title comes up without pushing the verdict under the top bar');
  assert.ok(/elementFromPoint\(cx, y\)/.test(SRC) && /if \(mode === 'review' \|\| !el\.isConnected\) return;/.test(SRC), 'page docks are found by hit-testing; review never scrolls');
});

/* ================================================================ Part B (P2 / P3) */
const CSS = fs.readFileSync(path.join(__dirname, '../app/css/views.css'), 'utf8');
/** the body of the first `@media (max-width: 700px)` block that holds `marker` */
const phoneBlock = marker => { const i = CSS.indexOf(marker); const a = CSS.lastIndexOf('@media (max-width: 700px)', i); return i > 0 && a >= 0 ? CSS.slice(a, i + marker.length) : ''; };

/* ---------------------------------------------------------------- verifier flags after Part A */
test('practice (P1-18 flag): a missing answer is said under the options, never in a toast over the docked Check; toasts rise above the dock', () => {
  assert.ok(!/toast\('Choose an answer first/.test(SRC), 'no toast for a missing answer');
  assert.ok(/needSay\(q\.type === 'MSQ' \? 'Choose at least one option first\.' : 'Choose an answer first\.'\)/.test(SRC));
  assert.ok(/<p class="qc-need" id="\$\{uid\}-n" aria-live="polite"><\/p>/.test(SRC), 'an in-place live line under the options');
  const blk = phoneBlock('body:has(.qc[data-dock]) .toast { pointer-events: none; }');
  assert.ok(blk && /body:has\(\.qc\[data-dock\]\) \.toasts \{ bottom: calc\(80px \+ var\(--tabbar, 0px\)/.test(blk), 'phones: the toast stack sits above the docked main action');
});
test('practice (P0-13 flag): every fold inside the card is marked loaded, so a page that opens rows on a capture-phase toggle skips it', () => {
  const folds = SRC.match(/<details class="qc-[a-z]+"[^>]*>/g) || [];
  assert.ok(folds.length >= 2, 'the worked solution and the key note');
  folds.forEach(d => assert.ok(/data-loaded="1"/.test(d), d));
});

/* ---------------------------------------------------------------- P2-38: XP where it is earned */
test('practice (P2-38): a right answer says what it earned, from GA.engage.xpFor; a miss, a peek and no key never show XP', () => {
  const ok = QL.feedback(mcq, 'D', QL.markOf(mcq, 'D'), { xp: { n: 10 } });
  assert.match(ok.html, /<b>Correct<\/b> <span>· \+1 mark · \+10 XP<\/span>/);
  assert.equal(ok.say, 'Correct. +1 mark. +10 XP.');
  assert.match(QL.feedback(mcq, 'D', QL.markOf(mcq, 'D'), { xp: { n: 3, again: true } }).html, /<b>Correct again<\/b> <span>· \+1 mark · \+3 XP<\/span>/);
  assert.match(QL.feedback(mcq, 'D', QL.markOf(mcq, 'D'), { xp: { n: 3, hint: true } }).html, /<b>Correct<\/b> <span>· \+1 mark · \+3 XP \(hint used\)<\/span>/);
  assert.ok(!/XP/.test(QL.feedback(mcq, 'D', QL.markOf(mcq, 'D'), {}).html), 'no engine, no XP line');
  assert.ok(!/XP/.test(QL.feedback(mcq, 'B', QL.markOf(mcq, 'B'), { xp: { n: 1 } }).html), 'never on a wrong answer');
  assert.ok(!/XP/.test(QL.feedback(mcq, null, QL.markOf(mcq, null), { peek: true, xp: { n: 10 } }).html), 'never on a peek');
  // read before the attempt is recorded, never for a test answer; a hinted answer is flagged to the store and the engine
  assert.ok(/E\.xpFor\(S\.state, 'pyq', q\.id, true, \{ hint: hinted \}\)/.test(SRC) && /\(o\.attemptMode \|\| 'p'\) === 't'\) return null/.test(SRC));
  assert.ok(SRC.indexOf('xpInfo = xpOf(ok);') < SRC.indexOf("A.attempt({ id: q.id, marks: q.marks, type: q.type }, r, ok, ms, o.attemptMode || 'p', { hint: hinted })"), 'XP is read before the attempt');
});
test('practice (P2-38): the inline XP agrees with the engine (first right 10, again 3, after a hint 3)', () => {
  let E = null;
  try { require('../app/js/core/stats.js'); E = require('../app/js/core/engage.js'); } catch (e) { E = null; }
  if (!E || typeof E.xpFor !== 'function') return;
  const fresh = { q: {}, log: [], lessons: {}, cards: {}, labs: {}, tests: [], act: {} };
  assert.equal(E.xpFor(fresh, 'pyq', 'cs-2019:CS1', true, {}), 10);
  assert.equal(E.xpFor(fresh, 'pyq', 'cs-2019:CS1', true, { hint: true }), 3);
  const again = Object.assign({}, fresh, { log: [[Date.now() - 864e5, 'cs-2019:CS1', 1, 30000, 'p']] });
  const n = E.xpFor(again, 'pyq', 'cs-2019:CS1', true, {});
  assert.equal(n, 3);
  assert.ok(E.XP && E.XP.pyqAgain === 3, 'the card names "Correct again" from E.XP.pyqAgain');
});

/* ---------------------------------------------------------------- P2-24: a questioned key */
test('practice (P2-24): a questioned key gets one warn line that never says which reading is right, and opens the solution', () => {
  const sol = { s: '**Idea.** x.\n\n**Answer: C** by the Karp-reduction definition. The official key gives **D**.', c: { agrees: false, blind: 'C', dispute: 'why' } };
  const q = Object.assign({}, mcq, { answer: { kind: 'single', value: 'D' } });
  assert.equal(QL.solAnswer(sol.s), 'C');
  assert.equal(QL.oursOf(q, sol), 'C');
  const line = QL.disputeLine(q, sol, { mode: 'practice' });
  assert.match(line, /This key is questioned\.<\/b> Our worked solution argues for <b>C<\/b>; you are graded against the official key\./);
  assert.match(line, /href="#\/about#ab-disp-h"/, 'links the list of disputed keys (P2-48)');
  assert.ok(!/\b(right|correct|wrong)\b/i.test(line.replace(/<[^>]+>/g, '')), 'never says which reading is right');
  assert.match(QL.disputeLine(q, sol, { mode: 'review' }), /you were graded/);
  assert.match(QL.disputeLine(q, sol, { peek: true }), /answers are graded/);
  // the solution teaches the key's reading (or none of the options): name nothing
  const keyReading = { s: '**Answer: D** (official key; C if …)', c: { blind: 'C', dispute: 'ambiguous' } };
  assert.equal(QL.oursOf(q, keyReading), '');
  assert.match(QL.disputeLine(q, keyReading, {}), /The worked solution sets out both readings; you are graded against the official key\./);
  assert.equal(QL.oursOf(q, { s: '**Answer: none of the options (deadlock needs $N \\ge 6$); the official key says D**', c: { blind: 'A', dispute: 'x' } }), '');
  const nat = { type: 'NAT', marks: 2, answer: { kind: 'range', min: 7, max: 7 } };
  assert.equal(QL.oursOf(nat, { s: '**Answer: 6** (official key: 7)', c: { blind: '6', dispute: 'x' } }), '6');
  assert.equal(QL.oursOf(nat, { s: '**Answer: 19.2** (official key)', c: { blind: '12', dispute: 'x' } }), '');
  assert.equal(QL.disputeLine(q, null, {}).includes('both readings'), true, 'before the solution arrives');
  // the line rides on the feedback and opens the worked solution even after a right answer; no Trap line on a questioned key (D17)
  const right = QL.feedback(q, 'D', QL.markOf(q, 'D'), { dispute: line });
  assert.ok(right.html.includes('qc-disp') && right.open === true);
  assert.equal(QL.trapWanted(q, { state: 'wrong' }, 'practice', sol.c), false);
  // the build's key note is a 'How we read the key' disclosure in the source footer, never under the verdict
  assert.ok(!/qc-note/.test(SRC) && /How we read the key/.test(SRC) && /paintKeyNote\(true\)/.test(SRC));
});
test('practice (P2-24): against the real solutions, every disputed key names our answer only when the worked solution ends on it', () => {
  const ROOT = path.join(__dirname, '../data');
  if (!fs.existsSync(path.join(ROOT, 'sol')) || !fs.existsSync(path.join(ROOT, 'pyq'))) return;
  const reg = {}, keep = globalThis.GAD;
  globalThis.GAD = { reg(ns, k, v) { (reg[ns] = reg[ns] || {})[k] = v; } };
  const load = f => new Function('GAD', fs.readFileSync(f, 'utf8'))(globalThis.GAD);
  fs.readdirSync(path.join(ROOT, 'pyq')).forEach(f => load(path.join(ROOT, 'pyq', f)));
  fs.readdirSync(path.join(ROOT, 'sol')).forEach(f => load(path.join(ROOT, 'sol', f)));
  globalThis.GAD = keep;
  const qs = {}; Object.values(reg.pyq || {}).forEach(list => list.forEach(x => (qs[x.id] = x)));
  const sols = Object.assign({}, ...Object.values(reg.sol || {}));
  let named = 0, plain = 0;
  for (const id in sols) {
    const s = sols[id], q = qs[id];
    if (!q || !s.c || !s.c.dispute) continue;
    const ours = QL.oursOf(q, s), b = QL.blindOf(q, s.c);
    if (ours) { named++; assert.equal(ours, b.text, id); } else plain++;
    const line = QL.disputeLine(q, s, {});
    assert.ok(!/\b(right|correct|wrong)\b/i.test(line.replace(/<[^>]+>/g, '')), id);
  }
  assert.ok(named + plain >= 1, 'the data has questioned keys');
});

/* ---------------------------------------------------------------- P2-64: the Hint */
test('practice (P2-64): the Hint is the solution\'s Idea paragraph, never one that gives the answer away', () => {
  const s = '**Idea.** A counting semaphore lets $k$ processes in at once.\n\n1. Work.\n\n**Answer: B**';
  assert.equal(QL.ideaOf(s), 'A counting semaphore lets $k$ processes in at once.');
  assert.equal(QL.ideaOf('No idea paragraph here.'), '');
  const q = { type: 'MCQ', marks: 1, options: ['Lowest point', 'Highest point', 'Middle', 'Edge'], answer: { kind: 'single', value: 'A' } };
  assert.equal(QL.givesAway(q, 'Vocabulary: a nadir is the lowest point of a curve.'), true, "the correct option's own words");
  assert.equal(QL.givesAway(q, '(A) is the definition.'), true, 'its letter in brackets');
  assert.equal(QL.givesAway(q, 'Compare option A with the others.'), true, 'option A');
  assert.equal(QL.givesAway(q, 'So the answer is **A**.'), true);
  assert.equal(QL.givesAway(q, 'A nadir is the opposite of a zenith.'), false, "a capital A at a sentence start is not option A");
  const nat = { type: 'NAT', marks: 2, answer: { kind: 'range', min: 99, max: 99 } };
  assert.equal(QL.givesAway(nat, 'Any spanning tree of 100 vertices has 99 edges.'), true, 'a number inside the key range');
  assert.equal(QL.givesAway(nat, 'Use a lower bound and a matching tree.'), false);
  assert.equal(QL.givesAway({ type: 'NAT', answer: { kind: 'range', min: 0.74, max: 0.76 } }, 'It comes to $0.75$ here.'), true);
  const msq = { type: 'MSQ', options: ['w', 'x', 'y', 'z'], answer: { kind: 'multi', value: ['A', 'C'] } };
  assert.equal(QL.givesAway(msq, 'Options B and C are the ones to test.'), true);
  // no official key: our worked answer counts as the answer
  const nokey = { type: 'MCQ', options: ['connect()', 'listen()', 'accept()', 'bind()'], answer: null };
  assert.equal(QL.givesAway(nokey, 'The client calls `connect()` first.', { letters: ['A'], text: 'A' }), true);
  assert.deepEqual(QL.hintOf(q, { s }), { md: 'A counting semaphore lets $k$ processes in at once.' }, 'an Idea that names no option is the hint');
  assert.deepEqual(QL.hintOf(q, { s: '**Idea.** Think about curves.\n\nMore.' }), { md: 'Think about curves.' });
  assert.equal(QL.hintOf(q, { s: '**Idea.** The lowest point is the nadir.' }), null);
});
test('practice (P2-64): on the question page the Hint takes the pre-check Show answer slot, then gives it back; a hinted answer is flagged', () => {
  // the engine's hint needs a worked solution; an ICAI item's hint is PassBook's approach note (docs/ICAI_BANK.md §5)
  assert.ok(/const hintOn = \(o\.hint != null \? !!o\.hint : mode === 'practice' && o\.cta === 'pop'\) && \(icai \? !!\(q\.ours && q\.ours\.approach\) : !!meta\.hasSol\);/.test(SRC));
  assert.ok(/const slot = hintOn && \(hintSt == null \|\| hintSt === 'loading'\)/.test(SRC), 'Hint while not yet asked for, then Show answer');
  assert.ok(/data-a="reveal">\$\{icon\('eye'\)\}<span>Show answer<\/span>/.test(SRC), 'Show answer stays the slot everywhere else (bank rows, lessons)');
  assert.ok(/hb\.hidden = true;   \/\/ the worked solution starts with the same idea/.test(SRC));
});
test('practice (P2-64): across the bank, at most 1 in 10 Idea paragraphs is held back as giving the answer away', () => {
  const ROOT = path.join(__dirname, '../data');
  if (!fs.existsSync(path.join(ROOT, 'sol'))) return;
  const reg = {}, keep = globalThis.GAD;
  globalThis.GAD = { reg(ns, k, v) { (reg[ns] = reg[ns] || {})[k] = v; } };
  const load = f => new Function('GAD', fs.readFileSync(f, 'utf8'))(globalThis.GAD);
  fs.readdirSync(path.join(ROOT, 'pyq')).forEach(f => load(path.join(ROOT, 'pyq', f)));
  fs.readdirSync(path.join(ROOT, 'sol')).forEach(f => load(path.join(ROOT, 'sol', f)));
  globalThis.GAD = keep;
  const qs = {}; Object.values(reg.pyq || {}).forEach(list => list.forEach(x => (qs[x.id] = Object.assign({ answer: null }, x))));
  const sols = Object.assign({}, ...Object.values(reg.sol || {}));
  let n = 0, held = 0;
  for (const id in sols) {
    const q = qs[id]; if (!q || !QL.ideaOf(sols[id].s)) continue;
    n++;
    const h = QL.hintOf(q, sols[id]);
    if (!h) { held++; continue; }
    for (const x of QL.keyLetters(q.answer)) assert.ok(!new RegExp(`\\(\\s*${x}\\s*\\)`).test(h.md), id + ' hints at (' + x + ')');
  }
  assert.ok(n > 100 && held / n < 0.1, `${held} of ${n} held back`);
});

/* ---------------------------------------------------------------- P2-66, P2-28, P3-21, P2-77: the honesty facts as text, from the catalogue */
test('practice (P2-66, P2-28): the badge names the body that published the key; no key and our answer say who published nothing', () => {
  const p08 = { organiser: 'Fixture board', year: 2008 }, p25 = { organiser: 'ICAI', year: 2025 };
  assert.equal(QL.badgeOf('keyed', { agrees: true }, p25)[3], 'ICAI published this answer, and our independent solution reached the same answer');
  assert.equal(QL.badgeOf('keyed', null, p25)[3], 'ICAI published this answer with the 2025 paper');
  assert.match(QL.badgeOf('nokey', { blind: 'B' }, p08)[3], /^Fixture board published no answer key for this paper/);
  assert.match(QL.badgeOf('mta', null, { organiser: 'ICAI', year: 2012 })[3], /^ICAI's official key gave every candidate the marks/);
  for (const k of ['keyed', 'nokey', 'mta']) assert.ok(!/GATE|\bIITs?\b|IISc/.test(QL.badgeOf(k, { blind: 'B' }, p08)[3]), 'no GATE organiser wording');
  assert.equal(QL.badgeOf('keyed', null, null)[3], 'The examining body published this answer');
  assert.ok(!/\bthe IITs\b|organised GATE/.test(SRC));
});
test('practice (P2-77): the badge comes from the catalogue\'s CHECKED / DISPUTE bits; the solution file loads only after Check, Show answer or the Hint, or in review', () => {
  const B = (kind, meta) => QL.badgeOf(kind, QL.flagCheck(meta, kind))[2];
  assert.equal(B('keyed', { checked: true }), 'official key · cross-checked');
  assert.equal(B('keyed', { checked: false }), 'official key');
  assert.equal(B('keyed', { disputed: true }), 'key questioned');
  assert.equal(B('nokey', { checked: true }), 'our answer');
  assert.equal(B('nokey', {}), 'no official key');
  assert.equal(B('mta', { checked: false }), 'marks to all');
  // the only eager load is for an older build without the bits
  assert.ok(/if \(!flagsOk && showBadge && meta\.hasSol\) solution\(\)/.test(SRC));
  assert.ok(!/if \(mode !== 'exam' && \(showBadge \|\| kind !== 'keyed'\)/.test(SRC), 'no load just to draw a badge');
});
test('practice (P2-66, P3-21): difficulty reads "Medium · our estimate" on a neutral ramp; legacy reads "not in the current syllabus"', () => {
  assert.ok(/\$\{esc\(U\.cap\(d\)\)\} · \$\{esc\(str\('ourEstimate', 'our estimate'\)\)\}/.test(SRC));
  assert.ok(/str\('legacy', 'not in the current syllabus'\)/.test(SRC));
  assert.ok(/\.diff\.qc-dg\.l1 i:nth-child\(1\), \.diff\.qc-dg\.l2 i:nth-child\(-n\+2\), \.diff\.qc-dg\.l3 i \{ background: var\(--muted\); \}/.test(CSS), 'no error red for Hard');
  assert.ok(/const why = b && \(b\[0\] \|\| kind !== 'keyed'\) \?/.test(SRC), "the solution's first line explains every badge but a plain official key, in every mode");
});

/* ---------------------------------------------------------------- P3-18, P3-06: the answering line, the option group, the heading */
test('practice (P3-18, P3-06): the answering line sits above the options and describes the named option group; the id line is the page h2', () => {
  assert.ok(/\$\{hintLine\('div'\)\}<div class="qc-opts/.test(SRC), 'the line comes before the options');
  assert.ok(/aria-label="Options for \$\{esc\(qName\)\}" aria-describedby="\$\{hint \? `\$\{uid\}-h ` : ''\}\$\{uid\}-n">/.test(SRC), 'described by the answering line and the missing-answer line');
  assert.ok(/const qName = icai \? `question \$\{q\.label \|\| q\.no\}` : `\$\{q\.section === 'GA' \? 'GA ' : ''\}question \$\{q\.no\}`;/.test(SRC));
  assert.ok(/const hl = o\.heading != null \? \+o\.heading : mode === 'practice' && o\.cta === 'pop' \? 2 : 0;/.test(SRC));
  assert.ok(!/\.qc\.locked \.qc-hint \{ display: none; \}/.test(CSS), 'the line stays after Check (no jump of the options)');
});

/* ---------------------------------------------------------------- P2-65, P3-48, P3-38 */
test('practice (P2-65, P3-48, P3-38): "Bookmarked · N"; Report a problem through GA.ui.report; figures keep their build size', () => {
  assert.ok(/const n = A\.setBookmark\(q\.id, on\);/.test(SRC) && /`Bookmarked\$\{typeof n === 'number' && n > 0 \? ` · \$\{U\.nf \? U\.nf\(n\) : n\}` : ''\} · find them in Questions › Bookmarked`/.test(SRC));
  assert.ok(/const canReport = mode !== 'exam' && \(typeof ui\.report === 'function' \|\| typeof ui\.modal === 'function'\);/.test(SRC) && /ui\.report\(\{ kind: 'question', id: q\.id, from: b \}\)/.test(SRC));
  assert.ok(!/ui\.report\s*=[^=]/.test(SRC), "never defines WP1's API");
  assert.ok(/const w = \+\(f\.w \|\| f\.width\), h = \+\(f\.h \|\| f\.height\);/.test(SRC));
});

/* ---------------------------------------------------------------- views.css: P2-26, P2-29, P3-22, P3-33, P3-40 */
test('practice (P2-26, P2-29, P3-22, P3-33, P3-40): stem tables fit, dimming keeps contrast, figure options two-up, folds chevron down, no key hints on touch', () => {
  assert.ok(/:is\(\.qc-body, \.qc-ctx, \.qc-t, \.qc-sb\) > \.tw:not\(\.tw-cards\) \{ width: fit-content; max-width: 100%; \}/.test(CSS));
  assert.ok(/:is\(\.qc-body, \.qc-ctx, \.qc-t\) table:not\(\.tw > table\) \{ display: block;/.test(CSS), 'only a bare table is a block');
  assert.ok(/\.qc-o\.dim, \.qc-o\.dim \.qc-t, \.qc-o\.dim \.qc-t :is\(strong, b, code, a\) \{ color: var\(--muted\); \}/.test(CSS), 'the option text itself is muted (.md sets its own ink)');
  const dimRules = CSS.match(/[^}]*\.qc-o\.dim[^{]*\{[^}]*\}/g) || [];
  dimRules.forEach(r => assert.ok(!/opacity\s*:/.test(r), r));
  assert.ok(!/\.rd\.past \{ opacity/.test(CSS), 'the unused road rules are gone');
  assert.ok(/\.qc-opts\.figs \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/.test(CSS) && /@media \(max-width: 520px\) \{ \.qc-opts\.figs \{ grid-template-columns: minmax\(0, 1fr\); \} \}/.test(CSS));
  assert.ok(/<use href="#i-chev-d"\/><\/svg><\/summary><div class="qc-sb/.test(SRC) && !/<use href="#i-arrow-r"\/><\/svg><\/summary>/.test(SRC));
  assert.ok(/\.qc-sd\[open\] > summary \.qc-chev, \.qc-knd\[open\] > summary \.qc-chev \{ transform: rotate\(180deg\); \}/.test(CSS));
  assert.ok(/@media \(hover: none\) and \(pointer: coarse\) \{ \.pr-keys \{ display: none; \} \}/.test(CSS));
});

/* ---------------------------------------------------------------- Part C (verifier flags) */
test('practice (P1-27 flag): the note toast names the error notebook only when the notebook lists the question', () => {
  assert.equal(QL.noteToast('Watch the off-by-one', true), 'Note saved · it shows on this question and in your error notebook');
  assert.equal(QL.noteToast('Watch the off-by-one', false), 'Note saved · it shows on this question and in Questions › Has my note');
  assert.equal(QL.noteToast('   ', true), 'Note deleted');
  assert.equal(QL.noteToast('', false), 'Note deleted');
  assert.ok(/ui\.toast\(noteToast\(v, !!\(S\.state\.nb && S\.state\.nb\[q\.id\]\)\), 'ok'\)/.test(SRC), 'the card asks the notebook store, not a fixed sentence');
  assert.ok(!/Note saved: it shows on this question and in your error notebook/.test(SRC));
  // the bank's status filter the toast names exists under that label
  assert.ok(P.STATUS ? P.STATUS.some(x => x[0] === 'noted' && x[1] === 'Has my note') : true);
});
test('practice (P1-19 flag): a worked solution that loads only on Try again still opens by itself after a miss', () => {
  assert.ok(/const reopen = autoOpen \|\| !!\(retried && retried\.open\);/.test(SRC), 'the failure keeps what the miss wanted');
  assert.ok(/retry: \(\) => loadSolution\(\{ open: reopen \}\)/.test(SRC), 'Try again passes it on');
  assert.ok(/if \(retried && retried\.open\) autoOpen = true;/.test(SRC), 'a successful Try again opens the fold');
  assert.ok(/sm\.focus\(\{ preventScroll: true \}\)/.test(SRC), 'focus lands on the fold title, not on the page body');
});
test('practice (cosmetic flag): the official answer writes a negative number with a true minus, like the learner\'s answer', () => {
  assert.equal(QL.minus('-2'), '−2');
  assert.equal(QL.minus('-0.5 to -0.4'), '−0.5 to −0.4');
  assert.equal(QL.minus('-1 or 1'), '−1 or 1');
  assert.equal(QL.minus('-.5'), '−.5');
  assert.equal(QL.minus('A, C'), 'A, C');
  assert.equal(QL.minus('12'), '12');
  assert.equal(QL.minus('1e-7'), '1e-7', 'an exponent is not a sign');
  const nat = { type: 'NAT', marks: 1, answer: { kind: 'range', min: -2, max: -2 } };
  const ok = QL.feedback(nat, '-2', QL.markOf(nat, '-2'), {});
  assert.match(ok.html, /Official answer <b>−2<\/b>.*Your answer <b>−2<\/b>/);
  assert.ok(!/<b>-2<\/b>/.test(ok.html), 'no hyphen-minus beside a true minus');
  const miss = QL.feedback(nat, '3', QL.markOf(nat, '3'), {});
  assert.match(miss.say, /The answer is −2\./);
  const range = { type: 'NAT', marks: 2, answer: { kind: 'range', min: -0.55, max: -0.45 } };
  assert.match(QL.feedback(range, null, QL.markOf(range, null), { peek: true }).html, /Official answer <b>−0\.55 to −0\.45<\/b>/);
});
test('practice (P1-18 flag): in paper order the phone line drops the paper the page h1 already names', () => {
  assert.ok(/<span class="qc-idp">\$\{esc\(sid\.slice\(0, sid\.length - sq\.length\)\)\}<\/span>\$\{esc\(sq\)\}/.test(SRC), 'the paper part is its own span');
  const blk = (CSS.match(/@media \(max-width: 700px\) \{[\s\S]*?\n\}/g) || []).join('\n');
  assert.ok(/\.qpage:not\(\.in-q\) \.qc-idp \{ display: none; \}/.test(blk), 'hidden on phones in paper order (a practice set keeps it)');
  // the split is exact: prefix + 'Q38' is the whole line
  const p2014 = { year: 2014, label: 'GATE 2014 CS · Set 1' }, q = { section: 'CS', no: 38 };
  const sid = QL.shortId(q, p2014), sq = QL.shortId(q, p2014, true);
  assert.equal(sid, '2014 Set 1 · Q38'); assert.equal(sq, 'Q38'); assert.ok(sid.endsWith(sq));
  assert.equal(sid.slice(0, sid.length - sq.length), '2014 Set 1 · ');
});
test('practice (P3-48 flag): Report a problem works without GA.ui.report: a copy-only text with the id, paper, build date and the learner\'s words', () => {
  const q = { id: 'cs-2019:CS37', no: 37 };
  const t = QL.reportText(q, { label: 'GATE 2019 CS · Q37', paper: 'GATE 2019 CS · IIT Madras · question paper page 12', built: '2026-10-17', words: '  The key says C, but the working shows B.  ' });
  assert.equal(t, 'PassBook · problem report\nQuestion: GATE 2019 CS · Q37 (id cs-2019:CS37)\nPaper: GATE 2019 CS · IIT Madras · question paper page 12\nData: built 2026-10-17\nWhat looks wrong: The key says C, but the working shows B.');
  assert.match(QL.reportText(q, {}), /^PassBook · problem report\nQuestion: Q37 \(id cs-2019:CS37\)\nWhat looks wrong: \(not described\)$/);
  assert.match(QL.reportText(q, { words: 'line one\nline two' }), /What looks wrong: \nline one\nline two$/);
  assert.ok(/else if \(typeof ui\.modal === 'function'\) reportSheet\(b\);/.test(SRC), 'the card opens its own sheet when the shell has none');
  assert.ok(/navigator\.clipboard\.writeText\(text\)/.test(SRC) && /document\.execCommand\('copy'\)/.test(SRC), 'clipboard first, then a selected box');
  const sheet = SRC.slice(SRC.indexOf('function reportSheet('), SRC.indexOf('function bookmark('));
  assert.ok(sheet.length > 200 && !/fetch\(|XMLHttpRequest|sendBeacon|localStorage|A\.set/.test(sheet), 'no network, nothing stored');
  assert.ok(!/ui\.report\s*=[^=]/.test(SRC), "never defines WP1's API");
});
test('practice (P3-40, P3-48): when copying is blocked, the line names this device\'s way to copy; no keyboard hint on touch screens', () => {
  assert.equal(QL.copyHint(true, true), 'This browser blocked copying. The report is selected above: press and hold it, then choose Copy.');
  assert.equal(QL.copyHint(true, false), QL.copyHint(true, true), 'touch wording does not depend on the platform');
  assert.equal(QL.copyHint(false, true), 'This browser blocked copying. The report is selected above: press ⌘C to copy it.');
  assert.equal(QL.copyHint(false, false), 'This browser blocked copying. The report is selected above: press Ctrl+C to copy it.');
  [true, false].forEach(t => assert.ok(!/!/.test(QL.copyHint(t, false)), 'no exclamation marks (D19)'));
  assert.ok(/st\.textContent = copyHint\(!!ui\.touch, /.test(SRC), 'the dialog reads GA.ui.touch when it shows the line');
});

/* ---------------------------------------------------------------- Part C flags: lesson references, dialog focus, the NAT placeholder, option figures */
test('practice (P2-64 flag): a lesson reference reads as the lesson\'s title, never its raw id; one without a title is dropped with its framing', () => {
  const T = { 'coa.cache.mapping': 'Direct, associative and set-associative mapping', 'os.mem.paging': 'Paging', 'cn.routing.dv': 'Distance-vector routing' };
  const t = id => T[id];
  assert.equal(QL.labelRefs('tag + offset ([[coa.cache.mapping]]).', t), 'tag + offset ([[coa.cache.mapping|Direct, associative and set-associative mapping]]).');
  assert.equal(QL.labelRefs('Inside the request. See [[os.mem.paging]].', t), 'Inside the request. See [[os.mem.paging|Paging]].');
  // dropped (no title known): the brackets go with what only framed them, the rest of the text is untouched
  const d = s => QL.labelRefs(s, t);
  assert.equal(d('tag + offset ([[x.y]]).'), 'tag + offset.');
  assert.equal(d('to ([[x.y]], [[x.z]]).'), 'to.');
  assert.equal(d('Inside the request. See [[x.y]]. Then more.'), 'Inside the request. Then more.');
  assert.equal(d('cost per word [[x.y]].'), 'cost per word.');
  assert.equal(d('cost per word. [[x.y]]\n\nNext'), 'cost per word.\n\nNext');
  assert.equal(d('the index ([[x.y]]) decides'), 'the index decides');
  assert.equal(d('the index ([[x.y]]): it decides'), 'the index: it decides');
  assert.equal(d('as before, see [[x.y]], and then'), 'as before, and then');
  assert.equal(d('mixed ([[x.y]], [[os.mem.paging]]).'), 'mixed ([[os.mem.paging|Paging]]).');
  assert.equal(d('a ratio 3 : 4 and `for (i = 0 ; i < n ; i++)` [[x.y]].'), 'a ratio 3 : 4 and `for (i = 0 ; i < n ; i++)`.', 'spacing is mended only where a reference went');
  assert.equal(QL.labelRefs('tag ([[os.mem.paging]]).'), 'tag.', 'without titles every reference is dropped');
  assert.equal(QL.labelRefs('labelled [[os.mem.paging|paging]] stays', t), 'labelled [[os.mem.paging|paging]] stays');
  assert.equal(QL.labelRefs('no references ( a , b ).', t), 'no references ( a , b ).');
  assert.equal(QL.labelRefs(null, t), '');
  // code and maths are left as md.js reads them ('$M[[R2] + 20]$' is maths), and only an id with a dot (or q: / lab:) is a reference
  assert.equal(d('The operand is $M[[R2]]$ and `[[x.y]]`, see [[x.y]].'), 'The operand is $M[[R2]]$ and `[[x.y]]`.');
  assert.equal(d('double indirection [[R2]] here'), 'double indirection [[R2]] here');
  assert.equal(QL.labelRefs('$$[[os.mem.paging]]$$ [[os.mem.paging]]', t), '$$[[os.mem.paging]]$$ [[os.mem.paging|Paging]]');
  // the Hint names the lesson; a title that would name the answer drops the reference instead of the hint
  const q = { type: 'MCQ', marks: 1, options: ['Paging', 'Segmentation', 'Swapping', 'Overlays'], answer: { kind: 'single', value: 'B' } };
  assert.deepEqual(QL.hintOf(q, { s: '**Idea.** Split the address into fields ([[coa.cache.mapping]]).\n\nMore.' }, t), { md: 'Split the address into fields ([[coa.cache.mapping|Direct, associative and set-associative mapping]]).' });
  assert.deepEqual(QL.hintOf({ ...q, answer: { kind: 'single', value: 'A' } }, { s: '**Idea.** Pages map to frames ([[os.mem.paging]]).' }, t), { md: 'Pages map to frames.' }, 'the title "Paging" is the answer');
  const race = { type: 'MCQ', marks: 1, options: ['race', 'deadlock', 'livelock', 'starvation'], answer: { kind: 'single', value: 'A' } };
  assert.deepEqual(QL.hintOf(race, { s: '**Idea.** Two writers interleave ([[os.sync.race]]).' }, () => ''), { md: 'Two writers interleave.' }, "an id is never read as words: 'os.sync.race' does not name option A");
  // the card names references in the hint, the worked solution and the Trap line, and speaks the title
  assert.ok(/const h = s \? hintOf\(q, s, refTitle\) : null;/.test(SRC));
  assert.ok(/MD\(\)\.render\(refs\(s\.s\), \{\}\)/.test(SRC) && /trapHtml = MD\(\)\.inline\(refs\(t\), \{\}\)/.test(SRC));
  assert.equal(P.plain('tag ([[coa.cache.mapping|Direct, associative and set-associative mapping]]).'), 'tag (Direct, associative and set-associative mapping).');
});
test('practice (P2-64 flag): against the real data, no hint or worked solution shows a raw lesson id', () => {
  const ROOT = path.join(__dirname, '../data');
  if (!fs.existsSync(path.join(ROOT, 'sol')) || !fs.existsSync(path.join(ROOT, 'manifest.js'))) return;
  const reg = {}, keep = globalThis.GAD;
  globalThis.GAD = { reg(ns, k, v) { (reg[ns] = reg[ns] || {})[k] = v; } };
  const load = f => new Function('GAD', fs.readFileSync(f, 'utf8'))(globalThis.GAD);
  load(path.join(ROOT, 'manifest.js'));
  fs.readdirSync(path.join(ROOT, 'pyq')).forEach(f => load(path.join(ROOT, 'pyq', f)));
  fs.readdirSync(path.join(ROOT, 'sol')).forEach(f => load(path.join(ROOT, 'sol', f)));
  globalThis.GAD = keep;
  const man = (reg.manifest || {}).main; if (!man) return;
  const title = Object.fromEntries(man.lessons.map(l => [l.id, l.title])), t = id => title[id.split('#')[0]];
  const qs = {}; Object.values(reg.pyq || {}).forEach(list => list.forEach(x => (qs[x.id] = Object.assign({ answer: null }, x))));
  const sols = Object.assign({}, ...Object.values(reg.sol || {}));
  const RAW = /\[\[(?![^\]]*\|)[^\]]*\]\]/;
  let refs = 0, hints = 0;
  for (const id in sols) {
    const s = sols[id].s || '';
    if (!/\[\[/.test(s)) continue;
    refs++;
    const named = QL.labelRefs(s, t), bare = QL.labelRefs(s);
    assert.ok(!RAW.test(named), id + ': an unlabelled reference is left');
    // dropping never adds an empty '()' or a space before punctuation (the text had its own: '`send()`')
    const n = (re, x) => (x.match(re) || []).length;
    assert.ok(!/\[\[[a-z0-9_.\-:#]+(?:\|[^\]]*)?\]\]/i.test(bare) && n(/\(\s*\)/g, bare) <= n(/\(\s*\)/g, s) && n(/[ \t][.,;:)]/g, bare) <= n(/[ \t][.,;:)]/g, s), id + ': dropping leaves stray punctuation');
    const q = qs[id], h = q && QL.hintOf(q, sols[id], t);
    if (h && /\[\[/.test(QL.ideaOf(s))) {
      hints++;
      const said = P.plain(h.md), ids = [...QL.ideaOf(s).matchAll(/\[\[([^\]|]+)\]\]/g)].map(m => m[1]);
      assert.ok(!RAW.test(h.md) && ids.every(x => !said.includes(x)), id + ': the hint reads ' + said);
    }
  }
  assert.ok(refs > 100 && hints > 100, `${refs} solutions and ${hints} hints with lesson references`);
});
test('practice (P1-47 flag): the note and report dialogs leave first focus to GA.ui.modal (the dialog itself on touch screens)', () => {
  const calls = SRC.match(/ui\.modal\(\{[\s\S]*?actions:/g) || [];
  assert.equal(calls.length, 2, 'the note and the report dialog');
  calls.forEach(c => assert.ok(!/\bfocus\s*:/.test(c.replace(/\/\/[^\n]*/g, '')), 'no focus override: ' + c.slice(0, 60)));
});
test('practice (NAT flag, P3-38): the NAT placeholder fits beside the ± key; option figures keep their shape with their build size', () => {
  const ph = /<input class="input" type="text" inputmode="decimal"[^>]*placeholder="([^"]*)"/.exec(SRC);
  assert.ok(ph && ph[1].length <= 12, 'about 155 px at 18 px mono: fits a 240 px box (360 px phone or a lesson, beside the ± key)');
  assert.ok(/\.qc-nat input \{[^}]*text-overflow: ellipsis;/.test(CSS));
  const rule = (CSS.match(/(?:^|\n)\.qc-optfig \{[^}]*\}/) || [''])[0];
  assert.ok(/height: auto;/.test(rule) && /object-fit: contain;/.test(rule) && /max-height: 192px;/.test(rule), rule);
  // content-box: the build's width and height are the image's own pixels and the 4 px padding goes around them (a 165 px option draws at
  // 165 px, not 157); where the height cap binds, the width stops at the figure's shape (no letterbox; the box is kept before it loads)
  assert.ok(/box-sizing: content-box;/.test(rule), 'the padding sits outside the image');
  assert.ok(/max-width: calc\(100% - 8px\); max-width: min\(calc\(100% - 8px\), calc\(192px \* var\(--r, 1000\)\)\);/.test(rule) && /padding: 4px;/.test(rule), 'the caps leave room for the 4 px padding');
  assert.ok(/\$\{shape \? ` style="--r:\$\{\+\(w \/ h\)\.toFixed\(4\)\}"` : ''\}/.test(SRC) && /\$\{dims\(fg, true\)\}>/.test(SRC), 'option figures carry --r');
  assert.ok(/\.qc-fig img \{[^}]*height: auto;[^}]*object-fit: contain;/.test(CSS), 'stem figures too');
});
