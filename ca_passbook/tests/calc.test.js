/* GA.calc (app/js/core/calc.js): the exam calculator's keypad layout and its no-eval evaluator (audit P0-15, WP10). The key set follows the
   GATE (TCS iON) virtual scientific calculator: Deg / Rad (Deg by default), trig and inverse trig, hyperbolic and inverse hyperbolic, log ln
   log₂x logᵧx, 10ˣ eˣ, x² x³ xʸ, √ ∛ ʸ√x, 1/x, n!, mod, |x|, %, π e, Exp, ±, brackets and memory keys; plus Ans and ⌊x⌋ from the app's
   earlier calculator. */
globalThis.GA = globalThis.GA || {};
const fsC = require('fs'), pathC = require('path');
const C = require('../app/js/core/calc.js');
const keys = list => list.reduce((s, k) => C.press(s, k), C.init());
const out = list => keys(list).out;
const typed = str => keys(str.split(' '));

test('calc: the digits line up in a 4-column block (7 8 9 ÷ / 4 5 6 × / 1 2 3 − / 0 . = +) with C and ⌫ above it', () => {
  assert.deepEqual(C.KEYS.pad, [['7', '8', '9', '/'], ['4', '5', '6', '*'], ['1', '2', '3', '-'], ['0', '.', 'eq', '+']]);
  C.KEYS.pad.forEach(row => assert.equal(row.length, 4));
  assert.deepEqual(C.KEYS.pad.slice(0, 3).map(r => r.slice(0, 3).map(Number)), [[7, 8, 9], [4, 5, 6], [1, 2, 3]], 'a phone-style digit grid, never scrambled');
  assert.deepEqual(C.KEYS.pad.map(r => r[3]).map(C.label), ['÷', '×', '−', '+'], 'operators in one column');
  assert.deepEqual(C.KEYS.top, ['clear', 'back']);
  assert.equal(C.label('eq'), '='); assert.equal(C.label('clear'), 'C'); assert.equal(C.label('back'), '⌫');
  // the panel's own grid: eight columns, the digit block in the last four columns of the last four rows, C and ⌫ right above 9 and ÷
  const G = C.KEYS.grid;
  assert.equal(G.length, 6); G.forEach(row => assert.equal(row.length, 8, 'eight columns in every row'));
  assert.deepEqual(G.slice(2).map(r => r.slice(4)), C.KEYS.pad, 'the digit block sits at the bottom right, in its four columns');
  assert.deepEqual(G[1].slice(6), C.KEYS.top, 'C and ⌫ right above 9 and ÷');
  C.KEYS.band.forEach(row => assert.equal(row.length, 6));
  const all = [].concat(...C.KEYS.band, ...G);
  assert.equal(all.length, 60);
  assert.equal(new Set(all).size, all.length, 'every key once');
  all.forEach(k => { assert.ok(C.label(k), 'a cap for ' + k); assert.ok(C.name(k), 'a spoken name for ' + k); });
  // every key of the exam's calculator (digialm.com/OnlineAssessment/ScientificCalculator), plus Ans and ⌊x⌋ from the earlier one
  ['mod', 'mc', 'mr', 'ms', 'mplus', 'mminus', 'sinh', 'cosh', 'tanh', 'ee', '(', ')', 'back', 'clear', 'pm', 'sqrt', 'asinh', 'acosh', 'atanh', 'log2', 'ln', 'log',
    '7', '8', '9', '/', 'pct', 'pi', 'e', 'fact', 'logy', 'exp', 'pow10', '4', '5', '6', '*', 'recip', 'sin', 'cos', 'tan', 'pow', 'cube', 'sq', '1', '2', '3', '-',
    'asin', 'acos', 'atan', 'root', 'cbrt', 'abs', '0', '.', '+', 'eq', 'ans', 'floor']
    .forEach(k => assert.ok(all.includes(k), 'the key ' + k));
  assert.deepEqual(['log2', 'logy', 'root', 'cube', 'ee', 'floor', 'asinh'].map(C.label), ['log₂x', 'logᵧx', 'ʸ√x', 'x³', 'Exp', '⌊x⌋', 'sinh⁻¹']);
  // each inverse sits right under its function: sin over sin⁻¹, log over 10ˣ, x² over √, xʸ over ʸ√x, ln over eˣ
  const at = k => { for (let r = 0; r < G.length; r++) { const c = G[r].indexOf(k); if (c >= 0) return [r, c]; } return null; };
  [['sin', 'asin'], ['cos', 'acos'], ['tan', 'atan'], ['log', 'pow10'], ['sq', 'sqrt'], ['cube', 'cbrt'], ['pow', 'root'], ['ln', 'exp']]
    .forEach(([f, i]) => { const a = at(f), b = at(i); assert.deepEqual([b[0] - a[0], b[1] - a[1]], [1, 0], i + ' under ' + f); });
});

test('calc: degrees by default (sin 30 = 0.5), exact quarter turns, radians on request', () => {
  assert.equal(C.init().deg, true);
  assert.equal(typed('sin 3 0 ) eq').out, '0.5');
  assert.equal(typed('cos 6 0 eq').out, '0.5', 'a missing ) is added at =');
  assert.equal(typed('tan 4 5 eq').out, '1');
  assert.equal(typed('sin 1 8 0 eq').out, '0'); assert.equal(typed('cos 9 0 eq').out, '0'); assert.equal(typed('sin 2 7 0 eq').out, '−1');
  assert.equal(typed('tan 9 0 eq').err, 'Math error');
  assert.equal(typed('asin 0 . 5 eq').out, '30'); assert.equal(typed('acos 0 eq').out, '90'); assert.equal(typed('atan 1 eq').out, '45');
  assert.equal(typed('acos 2 eq').err, 'Math error');
  const r = typed('deg sin pi eq');
  assert.equal(r.deg, false); assert.equal(r.out, '0');
  assert.equal(typed('deg sin 3 0 eq').out, '−0.988031624093');
});

test('calc: arithmetic, precedence, implied multiplication and the result format', () => {
  assert.equal(typed('7 * 8 eq').out, '56');
  assert.equal(typed('2 + 3 * 4 eq').out, '14');
  assert.equal(typed('( 2 + 3 ) * 4 eq').out, '20');
  assert.equal(typed('1 0 - 4 - 3 eq').out, '3', 'left to right');
  assert.equal(typed('2 pow 3 pow 2 eq').out, '512', 'powers right to left');
  assert.equal(typed('- 2 sq eq').out, '−4', 'unary minus below powers');
  assert.equal(typed('2 pow - 2 eq').out, '0.25');
  assert.equal(typed('2 pi eq').out, '6.28318530718', 'implied ×, 12 significant digits');
  assert.equal(typed('3 ( 4 ) eq').out, '12'); assert.equal(typed('2 sin 3 0 eq').out, '1');
  assert.equal(typed('1 / 3 eq').out, '0.333333333333');
  assert.equal(typed('6 . 0 2 * 1 0 pow 2 3 eq').out, '6.02e23');
  assert.equal(typed('1 / 1 0 pow 1 2 eq').out, '1e−12');
  assert.equal(typed('. 5 + . 2 5 eq').out, '0.75');
  assert.equal(typed('1 / 0 eq').err, 'Math error');
  assert.equal(typed('2 + eq').err, 'Syntax error'); assert.equal(typed('( ) eq').err, 'Syntax error');
  assert.equal(C.format(-0), '0'); assert.equal(C.format(1e15), '1e15'); assert.equal(C.format(-12.5), '−12.5');
});

test('calc: n!, mod, roots, logs, powers of 10 and e, 1/x, |x| and percent', () => {
  assert.equal(typed('5 fact eq').out, '120'); assert.equal(typed('0 fact eq').out, '1');
  assert.equal(typed('2 . 5 fact eq').err, 'n! needs a whole number from 0 to 170'); assert.equal(typed('1 7 1 fact eq').out, 'Error');
  assert.equal(typed('1 7 mod 5 eq').out, '2'); assert.equal(typed('1 7 mod 0 eq').err, 'Math error');
  assert.equal(typed('sqrt 1 4 4 eq').out, '12'); assert.equal(typed('sqrt - 4 eq').err, 'Math error'); assert.equal(typed('cbrt - 2 7 eq').out, '−3');
  assert.equal(typed('- 8 pow ( 1 / 3 ) eq').out, '−2', 'a real odd root of a negative number');
  assert.equal(typed('log 1 0 0 0 eq').out, '3'); assert.equal(typed('ln e eq').out, '1'); assert.equal(typed('log 0 eq').err, 'Math error');
  assert.equal(typed('pow10 3 eq').out, '1000'); assert.equal(typed('exp 0 eq').out, '1');
  assert.equal(typed('4 recip eq').out, '0.25'); assert.equal(typed('abs - 3 eq').out, '3'); assert.equal(typed('5 0 pct eq').out, '0.5');
  assert.equal(typed('2 sq sq eq').out, '16');
});

test('calc: Ans, ±, backspace, clear and the five memory keys', () => {
  let s = typed('sqrt 9 eq');
  assert.equal(s.out, '3'); assert.equal(s.ans, 3); assert.equal(s.done, true);
  assert.equal(C.press(s, '+').toks[0].k, 'ans', 'an operator after = goes on from the answer');
  assert.equal(['+', '1', 'eq'].reduce(C.press, s).out, '4');
  assert.equal(['7', 'eq'].reduce(C.press, s).out, '7', 'a digit after = starts again');
  assert.equal(['pm', 'eq'].reduce(C.press, s).out, '−3');
  assert.equal(typed('5 pm eq').out, '−5'); assert.equal(typed('5 pm pm eq').out, '5');
  assert.equal(typed('2 + 3 pm eq').out, '−1');
  assert.equal(typed('( 2 + 3 ) pm eq').out, '−5', '± flips a bracket group');
  assert.equal(C.display(typed('1 2 3 back')), '12');
  assert.equal(C.display(typed('sin back')), '');
  s = typed('1 2 clear'); assert.equal(C.display(s), ''); assert.equal(s.out, '0');
  s = typed('5 ms clear mr + 1 eq'); assert.equal(s.out, '6'); assert.equal(s.mem, 5);
  s = typed('5 ms 2 mplus'); assert.equal(s.mem, 7, 'a memory key ends the entry: the next digit starts a new one'); assert.equal(s.out, '2');
  s = typed('5 ms clear 2 mminus'); assert.equal(s.mem, 3);
  assert.equal(typed('5 ms mc').mem, 0);
  assert.equal(typed('eq').out, '0', '= with nothing typed keeps the last answer');
});

test('calc: a live test keeps its calculator (save / init round trip) and keys map from the keyboard', () => {
  const s = typed('deg 2 + 3 eq 5 ms');
  const back = C.init(JSON.parse(JSON.stringify(C.save(s))));
  assert.deepEqual([back.deg, back.ans, back.mem, C.display(back)], [false, 5, 5, C.display(s)]);
  assert.deepEqual(C.init({ toks: [{ k: 'bogus' }, { k: 'd', s: '4' }], ans: 'x', mem: NaN, deg: 'yes' }).toks, [{ k: 'd', s: '4' }], 'a damaged saved state is cleaned');
  assert.equal(C.keyOf('7'), '7'); assert.equal(C.keyOf('Enter'), 'eq'); assert.equal(C.keyOf('='), 'eq'); assert.equal(C.keyOf('Backspace'), 'back');
  assert.equal(C.keyOf('^'), 'pow'); assert.equal(C.keyOf('!'), 'fact'); assert.equal(C.keyOf('*'), '*'); assert.equal(C.keyOf('a'), null); assert.equal(C.keyOf('Tab'), null);
});

test('calc: the exam-only keys: logᵧx, ʸ√x and Exp go between two numbers; log₂x, x³, ⌊x⌋ and the hyperbolic functions', () => {
  assert.equal(typed('8 logy 2 eq').out, '3', 'x logᵧx y = the log of x to base y');
  assert.equal(typed('1 0 0 0 logy 1 0 eq').out, '3'); assert.equal(typed('8 1 logy 3 eq').out, '4');
  assert.equal(typed('2 * 8 logy 2 eq').out, '4', 'logᵧx is read left to right with × ÷, as the exam does');
  assert.equal(typed('8 logy 1 eq').err, 'Math error'); assert.equal(typed('0 logy 2 eq').err, 'Math error'); assert.equal(typed('8 logy - 2 eq').err, 'Math error');
  assert.equal(typed('2 7 root 3 eq').out, '3', 'x ʸ√x y = the y-th root of x');
  assert.equal(typed('1 6 root 4 eq').out, '2'); assert.equal(typed('3 2 root 5 eq').out, '2');
  assert.equal(typed('( - 2 7 ) root 3 eq').out, '−3', 'an odd root of a negative number');
  assert.equal(typed('( - 1 6 ) root 2 eq').err, 'Math error'); assert.equal(typed('2 root 0 eq').err, 'Math error');
  assert.equal(typed('6 . 0 2 ee 2 3 eq').out, '6.02e23', 'x Exp y = x × 10^y');
  assert.equal(typed('1 . 6 ee - 1 9 eq').out, '1.6e−19'); assert.equal(typed('6 . 0 2 ee 2 3 pm eq').out, '6.02e−23', '± flips the exponent being typed');
  assert.equal(typed('2 + 3 ee 2 eq').out, '302', 'Exp binds before + − × ÷');
  assert.equal(C.display(typed('6 . 0 2 ee 2 3')), '6.02×10^23'); assert.equal(C.display(typed('2 7 root 3')), '27 yroot 3'); assert.equal(C.display(typed('8 logy 2')), '8 log base 2');
  assert.equal(typed('log2 1 0 2 4 eq').out, '10'); assert.equal(typed('log2 0 eq').err, 'Math error');
  assert.equal(typed('3 cube eq').out, '27'); assert.equal(typed('- 2 cube eq').out, '−8'); assert.equal(C.display(typed('3 cube')), '3³');
  assert.equal(typed('floor 2 . 7 eq').out, '2'); assert.equal(typed('floor - 2 . 5 eq').out, '−3');
  assert.equal(typed('floor 1 0 0 0 logy 1 0 eq').out, '3', '⌊x⌋ floors the number as shown, so ⌊log 1000 ÷ log 10⌋ is 3');
  assert.equal(typed('floor log2 1 0 0 0 eq').out, '9', '⌊log₂ 1000⌋ = 9');
  assert.equal(typed('sinh 0 eq').out, '0'); assert.equal(typed('cosh 0 eq').out, '1'); assert.equal(typed('tanh 1 eq').out, '0.761594155956');
  assert.equal(typed('sinh 1 eq').out, '1.17520119364'); assert.equal(typed('asinh 1 eq').out, '0.88137358702'); assert.equal(typed('acosh 1 eq').out, '0');
  assert.equal(typed('atanh 0 . 5 eq').out, '0.549306144334');
  assert.equal(typed('acosh 0 eq').err, 'Math error'); assert.equal(typed('atanh 1 eq').err, 'Math error'); assert.equal(typed('sinh 1 0 0 0 eq').err, 'Math error');
  assert.equal(typed('deg sinh 1 eq').out, typed('sinh 1 eq').out, 'hyperbolic functions ignore the angle unit');
  // a saved state from an older or damaged copy keeps only tokens this version can read
  assert.deepEqual(C.init({ toks: [{ k: 'fn', s: 'gamma' }, { k: 'op', s: 'xor' }, { k: 'pf', s: 'cube' }, { k: 'd', s: '12' }, { k: 'op', s: 'logy' }] }).toks,
    [{ k: 'pf', s: 'cube' }, { k: 'op', s: 'logy' }]);
});

test('calc: no eval, no Function, no network in the evaluator', () => {
  const src = fsC.readFileSync(pathC.join(__dirname, '..', 'app/js/core/calc.js'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assert.ok(!/\beval\s*\(|new\s+Function|\bFunction\s*\(|fetch\s*\(|XMLHttpRequest/.test(src));
});
