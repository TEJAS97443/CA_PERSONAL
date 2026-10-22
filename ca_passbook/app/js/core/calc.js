/* PassBook — GA.calc: the exam calculator (owner: WP10; audit P0-15). A small evaluator for the GATE (TCS iON) virtual scientific
   calculator's key set, checked against the exam's own calculator page (digialm.com/OnlineAssessment/ScientificCalculator, Oct 2026):
   Deg / Rad (Deg by default, as in the exam), sin cos tan and their inverses, sinh cosh tanh and their inverses, log ln log₂x, logᵧx, 10ˣ eˣ,
   x² x³ xʸ, √ ∛ ʸ√x, 1/x, n!, mod, |x|, %, π e, Exp, ±, brackets and the five memory keys; plus Ans and ⌊x⌋, which the app's earlier
   calculator had. logᵧx, ʸ√x and Exp go between two numbers as in the exam (8 logᵧx 2 = 3, 27 ʸ√x 3 = 3, 6.02 Exp 23 = 6.02e23). It never
   uses eval or Function: an expression is a list of key tokens, read by a recursive-descent parser. Pure and Node-tested
   (tests/calc.test.js); views/test.js draws the panel and dispatches keys through press().

   API
     GA.calc.KEYS                      the panel's layout: {band: [[6] [6]] (memory + Ans, hyperbolic), grid: [[8] x 6] (functions at the left and
                                       on top, C ⌫ right above the digit block 7 8 9 ÷ / 4 5 6 × / 1 2 3 − / 0 . = +), pad: the digit block,
                                       top: [C ⌫]}
     GA.calc.label(id) / name(id)      the key cap ('sin⁻¹', '÷') and its spoken name ('inverse sine', 'divide')
     GA.calc.init(saved?)              → state {toks, ans, mem, deg, out, err, done} (a saved state from a live test is restored and checked)
     GA.calc.press(state, id)          → the next state (pure); id = a key id ('7', '+', 'sin', 'eq', 'clear', 'back', 'deg', 'mplus', …)
     GA.calc.keyOf(event.key)          → the key id a physical key types, or null
     GA.calc.display(state)            → the expression line as shown ('sin(30)×2')
     GA.calc.evaluate(toks, {deg, ans}) → number (throws Error with .calc = 'syntax' | 'math')
     GA.calc.format(number)            → the result line ('0.5', '6.02e23', '−3'); at most 12 significant digits
     GA.calc.save(state)               → the part worth keeping with the live test {toks, ans, mem, deg, done}
   Classic script, UMD: index.html loads it after scoring.js; require() in Node returns GA.calc. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  /* ------------------------------------------------------------------ keys */
  const KEYS = {
    // a quieter band of rarely needed keys: the memory keys with Ans, then the hyperbolic functions
    band: [['mc', 'mr', 'ms', 'mplus', 'mminus', 'ans'], ['sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh']],
    // eight columns in reading order: functions at the left (each inverse right under its function) and on top, C and ⌫ right above
    // the digit block, the operators in the last column
    grid: [
      ['sin', 'cos', 'tan', 'log', 'pi', 'e', 'ee', 'mod'],
      ['asin', 'acos', 'atan', 'pow10', '(', ')', 'clear', 'back'],
      ['sq', 'cube', 'pow', 'ln', '7', '8', '9', '/'],
      ['sqrt', 'cbrt', 'root', 'exp', '4', '5', '6', '*'],
      ['log2', 'logy', 'fact', 'recip', '1', '2', '3', '-'],
      ['abs', 'floor', 'pct', 'pm', '0', '.', 'eq', '+']
    ],
    top: ['clear', 'back'],
    pad: [['7', '8', '9', '/'], ['4', '5', '6', '*'], ['1', '2', '3', '-'], ['0', '.', 'eq', '+']]
  };
  const LABEL = { '/': '÷', '*': '×', '-': '−', '+': '+', eq: '=', clear: 'C', back: '⌫', deg: 'Deg', sin: 'sin', cos: 'cos', tan: 'tan', log: 'log', ln: 'ln',
    asin: 'sin⁻¹', acos: 'cos⁻¹', atan: 'tan⁻¹', sinh: 'sinh', cosh: 'cosh', tanh: 'tanh', asinh: 'sinh⁻¹', acosh: 'cosh⁻¹', atanh: 'tanh⁻¹',
    log2: 'log₂x', logy: 'logᵧx', pow10: '10ˣ', exp: 'eˣ', sq: 'x²', cube: 'x³', pow: 'xʸ', sqrt: '√', cbrt: '∛', root: 'ʸ√x', recip: '1/x', fact: 'n!',
    mod: 'mod', abs: '|x|', floor: '⌊x⌋', pi: 'π', e: 'e', ee: 'Exp', '(': '(', ')': ')', pm: '±', ans: 'Ans', pct: '%',
    mc: 'MC', mr: 'MR', ms: 'MS', mplus: 'M+', mminus: 'M−', '.': '.' };
  const NAME = { '/': 'divide', '*': 'multiply', '-': 'minus', '+': 'plus', eq: 'equals', clear: 'clear', back: 'delete the last key', '.': 'decimal point',
    sin: 'sine', cos: 'cosine', tan: 'tangent', log: 'log base 10', ln: 'natural log', asin: 'inverse sine', acos: 'inverse cosine', atan: 'inverse tangent',
    sinh: 'hyperbolic sine', cosh: 'hyperbolic cosine', tanh: 'hyperbolic tangent', asinh: 'inverse hyperbolic sine', acosh: 'inverse hyperbolic cosine',
    atanh: 'inverse hyperbolic tangent', log2: 'log base 2', logy: 'log to base y: the number, this key, then the base',
    pow10: 'ten to the power', exp: 'e to the power', sq: 'square', cube: 'cube', pow: 'to the power', sqrt: 'square root', cbrt: 'cube root',
    root: 'y-th root: the number, this key, then y', recip: 'one over', fact: 'factorial', mod: 'modulo', abs: 'absolute value', floor: 'floor, the whole part',
    pi: 'pi', e: 'e', ee: 'Exp, times ten to the power', '(': 'open bracket', ')': 'close bracket', pm: 'change sign', ans: 'last answer', pct: 'percent',
    mc: 'memory clear', mr: 'memory recall', ms: 'memory store', mplus: 'memory add', mminus: 'memory subtract' };
  const label = id => (LABEL[id] != null ? LABEL[id] : String(id));
  const name = id => NAME[id] || label(id);

  /* token kinds: d = a digit or '.', op = + - * / ^ mod ee (Exp) root (ʸ√x) logy (logᵧx), fn = a function with its opening bracket,
     open / close = brackets, c = a constant (pi, e), ans, lit = a number recalled from memory, pf = a postfix key (x² x³ n! 1/x %) */
  const FN = { sin: 'sin(', cos: 'cos(', tan: 'tan(', asin: 'sin⁻¹(', acos: 'cos⁻¹(', atan: 'tan⁻¹(', sinh: 'sinh(', cosh: 'cosh(', tanh: 'tanh(',
    asinh: 'sinh⁻¹(', acosh: 'cosh⁻¹(', atanh: 'tanh⁻¹(', log: 'log(', ln: 'ln(', log2: 'log₂(', sqrt: '√(', cbrt: '∛(', abs: 'abs(', floor: 'floor(',
    exp: 'e^(', pow10: '10^(' };
  const PF = { sq: '²', cube: '³', fact: '!', recip: '⁻¹', pct: '%' };
  // the expression line writes the two-number keys the way the exam's own display does (27 yroot 3); Exp reads as ×10^
  const OPS = { '+': '+', '-': '−', '*': '×', '/': '÷', '^': '^', mod: ' mod ', ee: '×10^', root: ' yroot ', logy: ' log base ' };
  const BINARY = { '+': '+', '-': '-', '*': '*', '/': '/', pow: '^', mod: 'mod', ee: 'ee', root: 'root', logy: 'logy' };
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const tokDisplay = t => t.k === 'd' ? t.s : t.k === 'op' ? OPS[t.s] : t.k === 'fn' ? FN[t.s] : t.k === 'open' ? '(' : t.k === 'close' ? ')'
    : t.k === 'c' ? (t.s === 'pi' ? 'π' : 'e') : t.k === 'ans' ? 'Ans' : t.k === 'lit' ? fmt(t.v) : t.k === 'pf' ? PF[t.s] : '';

  /* ------------------------------------------------------------------ evaluate (no eval) */
  function err(kind, msg) { const e = new Error(msg || (kind === 'math' ? 'Math error' : 'Syntax error')); e.calc = kind; return e; }
  const RAD = Math.PI / 180;
  /** trig in degrees with exact values at the quarter turns (sin 180° = 0, tan 90° is undefined) */
  function trig(f, x, deg) {
    if (deg) {
      const r = ((x % 360) + 360) % 360;
      if (Math.abs(r - Math.round(r)) < 1e-12 && Math.round(r) % 90 === 0) {
        const q = Math.round(r) / 90 % 4;
        if (f === 'sin') return [0, 1, 0, -1][q];
        if (f === 'cos') return [1, 0, -1, 0][q];
        if (q % 2) throw err('math'); return 0;
      }
      x *= RAD;
    }
    const v = Math[f](x);
    return Math.abs(v) < 1e-14 ? 0 : v;
  }
  function inv(f, x, deg) {
    const v = Math[f](x);
    if (!isFinite(v)) throw err('math');
    return deg ? v / RAD : v;
  }
  function fact(n) {
    if (!(n >= 0) || Math.abs(n - Math.round(n)) > 1e-9 || n > 170) throw err('math', 'n! needs a whole number from 0 to 170');
    let p = 1;
    for (let i = 2; i <= Math.round(n); i++) p *= i;
    return p;
  }
  const finite = v => { if (typeof v !== 'number' || !isFinite(v)) throw err('math'); return v; };
  /** a value rounded the way the result line shows it (12 significant digits): ⌊x⌋ of 2.9999999999999996 (= log 1000 / log 10) is 3, as shown */
  const shown = v => Number(v.toPrecision(12));
  function applyFn(f, x, deg) {
    switch (f) {
      case 'sin': case 'cos': case 'tan': return trig(f, x, deg);
      case 'asin': case 'acos': if (x < -1 || x > 1) throw err('math'); return inv(f, x, deg);
      case 'atan': return inv(f, x, deg);
      // hyperbolic functions take plain numbers (no angle unit), as in the exam
      case 'sinh': case 'cosh': case 'tanh': case 'asinh': return Math[f](x);
      case 'acosh': if (x < 1) throw err('math'); return Math.acosh(x);
      case 'atanh': if (x <= -1 || x >= 1) throw err('math'); return Math.atanh(x);
      case 'log': if (x <= 0) throw err('math'); return Math.log10(x);
      case 'ln': if (x <= 0) throw err('math'); return Math.log(x);
      case 'log2': if (x <= 0) throw err('math'); return Math.log2(x);
      case 'sqrt': if (x < 0) throw err('math'); return Math.sqrt(x);
      case 'cbrt': return Math.cbrt(x);
      case 'abs': return Math.abs(x);
      case 'floor': return Math.floor(shown(x));
      case 'exp': return Math.exp(x);
      case 'pow10': return Math.pow(10, x);
    }
    throw err('syntax');
  }
  function pow(a, b) {
    if (a === 0 && b < 0) throw err('math');
    if (a < 0 && Math.abs(b - Math.round(b)) > 1e-12) {
      // a real odd root of a negative number (x^(1/3)); anything else has no real value
      const inv3 = 1 / b;
      if (Math.abs(inv3 - Math.round(inv3)) < 1e-9 && Math.round(inv3) % 2) return -Math.pow(-a, b);
      throw err('math');
    }
    return Math.pow(a, b);
  }
  /** x ʸ√x y: the y-th root of x (an odd root of a negative number is real; an even one, or the 0th, is a math error) */
  function nroot(x, y) {
    if (y === 0 || (x === 0 && y < 0)) throw err('math');
    if (x < 0) {
      if (Math.abs(y - Math.round(y)) < 1e-12 && Math.abs(Math.round(y)) % 2 === 1) return -Math.pow(-x, 1 / y);
      throw err('math');
    }
    return Math.pow(x, 1 / y);
  }
  /** x logᵧx y: the log of x to base y (bases 10, 2 and e use their own exact functions) */
  function logBase(x, y) {
    if (!(x > 0) || !(y > 0) || y === 1) throw err('math');
    return y === 10 ? Math.log10(x) : y === 2 ? Math.log2(x) : y === Math.E ? Math.log(x) : Math.log(x) / Math.log(y);
  }

  /** merge digit tokens into numbers: [{k: 'num', v}] plus the other tokens unchanged */
  function lex(toks) {
    const out = [];
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i];
      if (t.k !== 'd') { out.push(t); continue; }
      let s = '';
      while (i < toks.length && toks[i].k === 'd') s += toks[i++].s;
      i--;
      if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) throw err('syntax');
      out.push({ k: 'num', v: Number(s) });
    }
    return out;
  }
  /** evaluate a token list: + − (lowest), × ÷ mod logᵧx and implied × (left to right, as in the exam), unary minus, then xʸ, ʸ√x and Exp
      (right to left), postfix keys (² ³ ! ⁻¹ %), then numbers, constants, Ans, brackets and functions. Missing closing brackets at the end are
      added, as the exam calculator does. */
  function evaluate(toks, o) {
    o = o || {};
    const deg = o.deg !== false, ans = typeof o.ans === 'number' && isFinite(o.ans) ? o.ans : 0;
    const T = lex(Array.isArray(toks) ? toks : []);
    if (!T.length) throw err('syntax');
    let i = 0;
    const peek = () => T[i], next = () => T[i++];
    const starts = t => !!t && (t.k === 'num' || t.k === 'c' || t.k === 'ans' || t.k === 'lit' || t.k === 'open' || t.k === 'fn');
    function primary() {
      const t = next();
      if (!t) throw err('syntax');
      if (t.k === 'num' || t.k === 'lit') return t.v;
      if (t.k === 'c') return t.s === 'pi' ? Math.PI : Math.E;
      if (t.k === 'ans') return ans;
      if (t.k === 'open' || t.k === 'fn') {
        const v = expr();
        if (peek() && peek().k === 'close') next();
        else if (peek()) throw err('syntax');
        return t.k === 'fn' ? finite(applyFn(t.s, v, deg)) : v;
      }
      throw err('syntax');
    }
    function postfix() {
      let v = primary();
      while (peek() && peek().k === 'pf') {
        const p = next().s;
        if (p === 'recip' && v === 0) throw err('math');
        v = p === 'sq' ? v * v : p === 'cube' ? v * v * v : p === 'fact' ? fact(v) : p === 'recip' ? 1 / v : v / 100;
      }
      return v;
    }
    function power() {
      const b = postfix(), t = peek();
      if (t && t.k === 'op' && (t.s === '^' || t.s === 'ee' || t.s === 'root')) {
        next();
        const r = unary();
        return finite(t.s === '^' ? pow(b, r) : t.s === 'root' ? nroot(b, r) : b * Math.pow(10, r));
      }
      return b;
    }
    function unary() {
      const t = peek();
      if (t && t.k === 'op' && (t.s === '-' || t.s === '+')) { next(); const v = unary(); return t.s === '-' ? -v : v; }
      return power();
    }
    function term() {
      let v = unary();
      for (;;) {
        const t = peek();
        if (t && t.k === 'op' && (t.s === '*' || t.s === '/' || t.s === 'mod' || t.s === 'logy')) {
          next();
          const r = unary();
          if (t.s === '*') v *= r;
          else if (t.s === 'logy') v = finite(logBase(v, r));
          else if (r === 0) throw err('math');
          else v = t.s === '/' ? v / r : v % r;
        } else if (starts(t)) v *= unary();            // implied multiplication: 2π, 3(4), 2sin(30)
        else return v;
      }
    }
    function expr() {
      let v = term();
      while (peek() && peek().k === 'op' && (peek().s === '+' || peek().s === '-')) { const s = next().s, r = term(); v = s === '+' ? v + r : v - r; }
      return v;
    }
    const v = expr();
    if (i < T.length) throw err('syntax');
    return finite(v === 0 ? 0 : v);
  }

  /** the result line: up to 12 significant digits, exponent form for very large or small numbers, a real minus sign */
  const expo = v => v.toExponential(9).replace(/\.?0+e/, 'e').replace('e+', 'e');
  function fmt(v) {
    if (typeof v !== 'number' || !isFinite(v)) return 'Error';
    if (v === 0) return '0';
    const a = Math.abs(v);
    let s = a >= 1e12 || a < 1e-9 ? expo(v) : String(Number(v.toPrecision(12)));
    if (/e/.test(s)) s = expo(v);
    return s.replace(/^-/, '−').replace('e-', 'e−');
  }

  /* ------------------------------------------------------------------ the key reducer */
  const DIGITS = /^[0-9.]$/;
  const isOperand = t => !!t && (t.k === 'd' || t.k === 'c' || t.k === 'ans' || t.k === 'lit' || t.k === 'close' || t.k === 'pf');
  /** where the operand that ends just before `end` starts (end itself when there is none): digits, a constant, Ans, a recalled number, a
      bracket or function group, with any postfix keys after it */
  function operandStart(toks, end) {
    const t = toks[end - 1];
    if (!t) return end;
    if (t.k === 'd') { let j = end - 1; while (j > 0 && toks[j - 1].k === 'd') j--; return j; }
    if (t.k === 'c' || t.k === 'ans' || t.k === 'lit') return end - 1;
    if (t.k === 'pf') { const j = operandStart(toks, end - 1); return j === end - 1 ? end : j; }
    if (t.k === 'close') {
      let depth = 0;
      for (let j = end - 1; j >= 0; j--) {
        if (toks[j].k === 'close') depth++;
        else if (toks[j].k === 'open' || toks[j].k === 'fn') { depth--; if (!depth) return j; }
      }
      return end;
    }
    return end;
  }
  /** a saved token this version can read (a damaged or unknown one is dropped) */
  const okTok = t => !!t && typeof t === 'object' && (
    t.k === 'd' ? typeof t.s === 'string' && /^[0-9.]$/.test(t.s)
      : t.k === 'op' ? has(OPS, t.s) : t.k === 'fn' ? has(FN, t.s) : t.k === 'pf' ? has(PF, t.s) : t.k === 'c' ? t.s === 'pi' || t.s === 'e'
        : t.k === 'lit' ? typeof t.v === 'number' && isFinite(t.v) : t.k === 'open' || t.k === 'close' || t.k === 'ans');
  function init(saved) {
    const s = { toks: [], ans: 0, mem: 0, deg: true, out: '0', err: null, done: false };
    if (saved && typeof saved === 'object') {
      if (Array.isArray(saved.toks)) s.toks = saved.toks.filter(okTok).slice(0, 200);
      if (typeof saved.ans === 'number' && isFinite(saved.ans)) s.ans = saved.ans;
      if (typeof saved.mem === 'number' && isFinite(saved.mem)) s.mem = saved.mem;
      if (typeof saved.deg === 'boolean') s.deg = saved.deg;
      s.done = saved.done === true && s.toks.length > 0;
      s.out = fmt(s.ans);
    }
    return s;
  }
  const save = s => ({ toks: s.toks.slice(), ans: s.ans, mem: s.mem, deg: s.deg, done: !!s.done });
  /** the value the memory keys work with: the expression's value if it reads, else the last answer */
  function current(s) { try { return s.toks.length ? evaluate(s.toks, s) : s.ans; } catch (e) { return null; } }

  function press(state, id) {
    const s = Object.assign({}, state, { toks: state.toks.slice(), err: null });
    const fresh = () => { if (s.done) { s.toks = []; s.done = false; } };
    const carry = () => { if (s.done) { s.toks = [{ k: 'ans' }]; s.done = false; } };     // an operator after '=' goes on from the answer
    const push = t => { if (s.toks.length < 200) s.toks.push(t); };
    if (DIGITS.test(id)) { fresh(); push({ k: 'd', s: id }); }
    else if (has(BINARY, id)) { carry(); push({ k: 'op', s: BINARY[id] }); }
    else if (has(FN, id)) { fresh(); push({ k: 'fn', s: id }); }
    else if (has(PF, id)) { carry(); push({ k: 'pf', s: id }); }
    else if (id === 'pi' || id === 'e') { fresh(); push({ k: 'c', s: id }); }
    else if (id === 'ans') { fresh(); push({ k: 'ans' }); }
    else if (id === '(') { fresh(); push({ k: 'open' }); }
    else if (id === ')') { s.done = false; push({ k: 'close' }); }
    else if (id === 'pm') {
      carry();
      // flip the sign of the operand being typed (a number, a constant, Ans, a bracket or function group): insert or remove the minus before it
      const j = operandStart(s.toks, s.toks.length), before = s.toks[j - 1];
      const unaryPos = j - 1 === 0 || (j - 2 >= 0 && !isOperand(s.toks[j - 2]));
      if (j < s.toks.length && before && before.k === 'op' && before.s === '-' && unaryPos) s.toks.splice(j - 1, 1);
      else if (s.toks.length < 200) s.toks.splice(j, 0, { k: 'op', s: '-' });
    }
    else if (id === 'back') { s.done = false; s.toks.pop(); }
    else if (id === 'clear') { s.toks = []; s.out = '0'; s.done = false; }
    else if (id === 'deg') s.deg = !s.deg;
    else if (id === 'eq') {
      if (!s.toks.length) { s.out = fmt(s.ans); return s; }
      try { const v = evaluate(s.toks, s); s.ans = v; s.out = fmt(v); s.done = true; }
      catch (e) { s.err = e.calc === 'math' ? (e.message || 'Math error') : 'Syntax error'; s.out = 'Error'; }
    }
    else if (id === 'mc') s.mem = 0;
    else if (id === 'mr') { fresh(); push({ k: 'lit', v: s.mem }); }
    else if (id === 'ms' || id === 'mplus' || id === 'mminus') {
      // like '=' first: the expression's value becomes the answer, then goes into memory; the next digit starts a new entry
      const v = current(s);
      if (v == null) { s.err = 'Syntax error'; s.out = 'Error'; }
      else { s.mem = id === 'ms' ? v : id === 'mplus' ? s.mem + v : s.mem - v; s.ans = v; s.out = fmt(v); s.done = s.toks.length > 0; }
    }
    return s;
  }

  /** the key id a physical key types (digits, operators, brackets, ^ ! %, Enter or =, Backspace, Delete), or null */
  function keyOf(key) {
    if (/^[0-9.]$/.test(key)) return key;
    const m = { '+': '+', '-': '-', '−': '-', '*': '*', '×': '*', '/': '/', '÷': '/', '^': 'pow', '(': '(', ')': ')', '!': 'fact', '%': 'pct',
      Enter: 'eq', '=': 'eq', Backspace: 'back', Delete: 'clear' };
    return Object.prototype.hasOwnProperty.call(m, key) ? m[key] : null;
  }
  const display = s => s.toks.map(tokDisplay).join('');

  const Calc = { KEYS, label, name, init, press, keyOf, display, evaluate, format: fmt, save };
  g.GA.calc = Calc;
  if (typeof module !== 'undefined' && module.exports) module.exports = Calc;
})(typeof window !== 'undefined' ? window : globalThis);
