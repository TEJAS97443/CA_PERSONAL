/* PassBook — Markdown dialect renderer (lessons, solutions, question text). Pure: string in, HTML string out.
   Works in the browser and in Node (tests, content lint). Math uses KaTeX when present (global `katex`), else shows the TeX.
   Raw HTML in the source is never passed through. See docs/CONTENT_GUIDE.md for the dialect. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = s => String(s).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* ------------------------------------------------------------------ math */
  /* KaTeX writes visual HTML (aria-hidden) plus MathML, so screen readers hear the maths (P0-18); the TeX stays in data-tex for copying and for
     GA.fit's cheap width estimate. Results are memoised per KaTeX object (P1-11): a lesson repeats $n$, $O(n)$ … dozens of times, and the content
     linters swap in a stub renderer, which must never see (or leave behind) real output. */
  const KOPT = { throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' };
  const memo = typeof WeakMap === 'function' ? new WeakMap() : null;
  const MEMO_MAX = 6000;
  const memoOf = kt => {
    if (!memo || !kt || (typeof kt !== 'object' && typeof kt !== 'function')) return null;
    let c = memo.get(kt);
    if (!c) memo.set(kt, (c = new Map()));
    return c;
  };
  /** Display TeX split at its top-level \qquad into rows that wrap on narrow screens (P0-17). Returns the parts, or null when there is nothing to
      split or splitting could change the meaning: never at \quad, inside braces, \begin…\end or \left…\right, and never when the formula has
      top-level rows or alignment (\\, &), a \tag, a % comment or a colour switch. */
  function splitQquad(tex) { return qquadScan(tex).parts; }
  /** the scan behind splitQquad: {parts, top: a \qquad at the top level was seen, why: what stopped the split ('rows', 'align', 'tag',
      'color', 'comment') or null} (the display-maths lint names why, P0-17) */
  function qquadScan(tex) {
    const t = String(tex == null ? '' : tex), no = why => ({ parts: null, top, why });
    let top = false;
    if (t.indexOf('\\qquad') < 0) return no(null);
    const parts = [];
    let depth = 0, env = 0, lr = 0, last = 0, i = 0, why = /(^|[^\\])%/.test(t) ? 'comment' : /\\(tag|displaylines)\b/.test(t) ? 'tag' : /\\color\b/.test(t) ? 'color' : null;
    while (i < t.length) {
      const c = t[i];
      if (c === '\\') {
        const m = /^\\([A-Za-z]+|[\s\S])/.exec(t.slice(i));
        const name = m ? m[1] : '';
        if (name === 'begin') env++;
        else if (name === 'end') env = Math.max(0, env - 1);
        else if (name === 'left') lr++;
        else if (name === 'right') lr = Math.max(0, lr - 1);
        else if ((name === '\\' || name === 'cr' || name === 'newline') && !depth && !env) why = why || 'rows';
        else if (name === 'qquad' && !depth && !env && !lr) { top = true; parts.push(t.slice(last, i)); last = i + m[0].length; }
        i += m ? m[0].length : 1;
        continue;
      }
      if (c === '{') depth++;
      else if (c === '}') depth = Math.max(0, depth - 1);
      else if (c === '&' && !depth && !env) why = why || 'align';
      i++;
    }
    if (why) return no(why);
    parts.push(t.slice(last));
    const out = parts.map(p => p.trim()).filter(Boolean);
    return { parts: out.length > 1 ? out : null, top, why: null };
  }
  // KaTeX's MathML carries the TeX again in an <annotation>; data-tex already holds it, so the DOM is one node lighter per formula (P1-11)
  const ANN = /<annotation encoding="application\/x-tex">[\s\S]*?<\/annotation>/g;
  /* KaTeX warns on the console for a character it has no metrics for, though it draws it from a system font. The outer-join signs of the
     database lessons (⟕ ⟖ ⟗) are the app's only case (P3-37): their warning is kept off the console, and every such character is listed in
     GA.md.glyphs() for tools/check_math.js; a new one still warns. */
  const QUIET = /^[⟕⟖⟗₹]$/, glyphSeen = new Set();     // ₹ (CONTENT_GUIDE §3: \text{₹} in maths) is in every phone's system font
  const render0 = (kt, t, o) => {
    if (!/[^\x00-\x7f]/.test(t) || typeof console === 'undefined') return kt.renderToString(t, o);
    const warn = console.warn;
    console.warn = function (m) {
      const x = typeof m === 'string' && /^No character metrics for '([\s\S]+?)'/.exec(m);
      if (x) { glyphSeen.add(x[1]); if (QUIET.test(x[1])) return; }
      return warn.apply(console, arguments);
    };
    try { return kt.renderToString(t, o); } finally { console.warn = warn; }
  };
  const ktex = (kt, t, display) => render0(kt, t, Object.assign({ displayMode: !!display }, KOPT)).replace(ANN, '');
  // maths inside a control's label (an option, a button, a link): the drawing plus its words. Chrome leaves MathML out of a control's name,
  // so a radio labelled with maths alone was named 'A' (P0-18); a name is flat text anyway, so the MathML goes and the words stand in
  const klabel = (kt, t) => render0(kt, t, Object.assign({ displayMode: false }, KOPT, { output: 'html' }));
  function renderMath(kt, t, display, label) {
    const err = e => `<span class="m-err" title="${esc(String(e.message || e).slice(0, 160))}">${esc(display ? '$$' + t + '$$' : '$' + t + '$')}</span>`;
    if (label && !display) {
      try { return `<span class="m" data-tex="${esc(t)}" data-said="1">${klabel(kt, t)}<span class="sr m-say"> ${esc(speak(t))} </span></span>`; }
      catch (e) { return err(e); }
    }
    if (display) {
      const rows = splitQquad(t);
      if (rows) {
        try { return `<span class="m md mrows" data-tex="${esc(t)}">${rows.map(r => `<span class="mrow">${ktex(kt, r, true)}</span>`).join('')}</span>`; }
        catch (e) { /* a part does not stand alone: fall back to the formula as written */ }
      }
    }
    try { return `<span class="m${display ? ' md' : ''}" data-tex="${esc(t)}">${ktex(kt, t, display)}</span>`; }
    catch (e) { return err(e); }
  }
  function math(tex, display, label) {
    const t = tex.trim();
    const kt = (typeof katex !== 'undefined' && katex) || (g.katex);
    if (kt) {
      const c = memoOf(kt), key = (display ? 'D' : label ? 'L' : 'I') + t;
      if (c && c.has(key)) return c.get(key);
      const html = renderMath(kt, t, display, label);
      if (c) { if (c.size >= MEMO_MAX) c.clear(); c.set(key, html); }
      return html;
    }
    return `<span class="m-raw">${esc(display ? '$$' + t + '$$' : '$' + t + '$')}</span>`;
  }

  /* ------------------------------------------------------------------ maths in words (P0-18) */
  /* speak(tex): what a screen reader should say for a formula that names a control ('A, n squared'), and for any text that must be flat (an
     announcement, an aria-label). Operators and relations become words, scripts 'squared', 'to the n', 'sub i', fractions 'a over b'; brackets
     stay. Written for the maths in exam questions and lessons; anything it does not know is said by its name. */
  const SAY = {
    alpha: 'alpha', beta: 'beta', gamma: 'gamma', delta: 'delta', epsilon: 'epsilon', varepsilon: 'epsilon', zeta: 'zeta', eta: 'eta', theta: 'theta',
    vartheta: 'theta', iota: 'iota', kappa: 'kappa', lambda: 'lambda', mu: 'mu', nu: 'nu', xi: 'xi', pi: 'pi', varpi: 'pi', rho: 'rho', varrho: 'rho',
    sigma: 'sigma', varsigma: 'sigma', tau: 'tau', upsilon: 'upsilon', phi: 'phi', varphi: 'phi', chi: 'chi', psi: 'psi', omega: 'omega',
    Gamma: 'Gamma', Delta: 'Delta', Theta: 'Theta', Lambda: 'Lambda', Xi: 'Xi', Pi: 'Pi', Sigma: 'Sigma', Upsilon: 'Upsilon', Phi: 'Phi', Psi: 'Psi', Omega: 'Omega',
    le: 'less than or equal to', leq: 'less than or equal to', leqslant: 'less than or equal to', ge: 'greater than or equal to', geq: 'greater than or equal to',
    geqslant: 'greater than or equal to', ne: 'not equal to', neq: 'not equal to', lt: 'less than', gt: 'greater than', ll: 'much less than', gg: 'much greater than',
    approx: 'approximately', equiv: 'equivalent to', sim: 'similar to', simeq: 'similar to', cong: 'congruent to', propto: 'proportional to',
    to: 'to', rightarrow: 'arrow', longrightarrow: 'arrow', leftarrow: 'from', gets: 'gets', Rightarrow: 'implies', Longrightarrow: 'implies', implies: 'implies',
    Leftarrow: 'is implied by', Leftrightarrow: 'if and only if', iff: 'if and only if', leftrightarrow: 'both ways', mapsto: 'maps to', uparrow: 'up', downarrow: 'down',
    times: 'times', cdot: 'times', ast: 'times', div: 'divided by', pm: 'plus or minus', mp: 'minus or plus', star: 'star', circ: 'composed with', bullet: 'dot',
    oplus: 'xor', otimes: 'tensor', odot: 'dot', in: 'in', notin: 'not in', ni: 'contains', cup: 'union', cap: 'intersection', setminus: 'minus', subset: 'subset of',
    subseteq: 'subset of or equal to', subsetneq: 'proper subset of', supset: 'superset of', supseteq: 'superset of or equal to', emptyset: 'the empty set',
    varnothing: 'the empty set', infty: 'infinity', neg: 'not', lnot: 'not', land: 'and', wedge: 'and', lor: 'or', vee: 'or', forall: 'for all',
    exists: 'there exists', nexists: 'there is no', ldots: 'dot dot dot', dots: 'dot dot dot', cdots: 'dot dot dot', vdots: 'dot dot dot', ddots: 'dot dot dot',
    lceil: 'ceiling of', rceil: 'end ceiling', lfloor: 'floor of', rfloor: 'end floor', langle: 'angle', rangle: 'end angle', mid: 'such that', vert: '|',
    lvert: '|', rvert: '|', Vert: '‖', parallel: 'parallel to', perp: 'perpendicular to', bowtie: 'join', Join: 'join', ltimes: 'left semijoin', rtimes: 'right semijoin',
    top: 'true', bot: 'false', vdash: 'proves', models: 'models', partial: 'partial', nabla: 'nabla', ell: 'l', hbar: 'h bar', prime: 'prime', square: 'square',
    Box: 'square', checkmark: 'tick', colon: ':', dagger: 'dagger', aleph: 'aleph', angle: 'angle', triangle: 'triangle', therefore: 'therefore', because: 'because',
    log: 'log', ln: 'ln', lg: 'log', exp: 'exp', sin: 'sin', cos: 'cos', tan: 'tan', sec: 'sec', csc: 'cosec', cot: 'cot', max: 'max', min: 'min', sup: 'sup',
    inf: 'inf', det: 'det', gcd: 'gcd', lcm: 'lcm', deg: 'degree', dim: 'dim', ker: 'ker', Pr: 'P', arg: 'arg', mod: 'mod', bmod: 'mod',
    cdotp: 'dot', ldotp: 'dot', ',': ' ', ';': ' ', ':': ' ', '!': '', ' ': ' ', quad: ' ', qquad: ' ', enspace: ' ', thinspace: ' ', '{': '{', '}': '}',
    '%': 'percent', '#': '#', '&': 'and', $: 'dollar', _: 'underscore', '|': '‖', '\\': ', '
  };
  const OPS = { '+': 'plus', '-': 'minus', '−': 'minus', '=': 'equals', '<': 'less than', '>': 'greater than', '*': 'times', '/': 'over', '×': 'times', '·': 'times',
    '≤': 'less than or equal to', '≥': 'greater than or equal to', '≠': 'not equal to', '→': 'to', '⇒': 'implies', '∈': 'in', '∪': 'union', '∩': 'intersection',
    '⟕': 'left outer join', '⟖': 'right outer join', '⟗': 'full outer join', '⋈': 'join', '₹': 'rupees', '∞': 'infinity', '∅': 'the empty set', '¬': 'not', '∧': 'and', '∨': 'or' };
  const OPW = new Set(Object.values(OPS).concat(['divided by', 'plus or minus', 'xor', 'mod', 'if and only if', 'subset of', 'subset of or equal to', 'equivalent to',
    'approximately', 'arrow', 'not in', 'such that']));
  const FONT = new Set(['text', 'textrm', 'textbf', 'textit', 'textsf', 'texttt', 'textnormal', 'mathrm', 'mathbf', 'mathit', 'mathsf', 'mathtt', 'mathnormal', 'mathcal',
    'mathscr', 'mathfrak', 'mathbb', 'boldsymbol', 'bm', 'operatorname', 'mbox', 'hbox', 'emph', 'underline']);
  const WRAPC = new Set(['mathbin', 'mathrel', 'mathop', 'mathord', 'mathpunct', 'mathopen', 'mathclose', 'mathinner', 'boxed', 'fbox']);
  const ACC = { overline: 'bar', bar: 'bar', hat: 'hat', widehat: 'hat', tilde: 'tilde', widetilde: 'tilde', vec: 'vector', dot: 'dot', ddot: 'double dot',
    overrightarrow: 'vector', underbrace: '', overbrace: '' };
  const DROP = new Set(['left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'bigl', 'bigr', 'Bigl', 'Bigr', 'biggl', 'biggr', 'middle', 'limits', 'nolimits', 'displaystyle',
    'textstyle', 'scriptstyle', 'scriptscriptstyle', 'nonumber', 'notag', 'cr', 'hline', 'quad', 'qquad', 'phantom', 'hphantom', 'vphantom', 'mathstrut', 'strut',
    'normalsize', 'small', 'large', 'Large', 'tiny', 'scriptsize', 'footnotesize', 'huge']);
  const BIG = { sum: 'the sum', prod: 'the product', int: 'the integral', oint: 'the integral', bigcup: 'the union', bigcap: 'the intersection', lim: 'the limit',
    bigoplus: 'the xor', bigvee: 'the or', bigwedge: 'the and', coprod: 'the coproduct' };
  const OVER = { max: 'the max', min: 'the min', sup: 'the sup', inf: 'the inf' };
  const FN = /^(log|ln|lg|exp|sin|cos|tan|sec|csc|cot|det|gcd|lcm|deg|dim|ker|Pr|arg)$/;
  function speak(tex) {
    const s = String(tex == null ? '' : tex);
    let i = 0;
    const ws = () => { while (i < s.length && /\s/.test(s[i])) i++; };
    const join = a => a.filter(x => x && x.t).map(x => x.t).join(' ');
    const multi = a => a.filter(x => x && x.t).length > 1 || a.some(x => x && (x.op || x.cx));
    const wrapG = a => (multi(a) ? '(' + join(a) + ')' : join(a));
    function arg() {                                                        // one argument: {group}, \command or a single character
      ws();
      if (s[i] === '{') { i++; const a = seq('}'); i++; return a; }
      const a = atom();
      return a ? [a] : [];
    }
    function optArg() { ws(); if (s[i] !== '[') return null; i++; const a = seq(']'); i++; return a; }
    function script(base) {                                                 // ^ and _ after an atom, in either order; primes
      let sub = null, sup = null;
      for (;;) {
        ws();
        if (s[i] === '^' && sup == null) { i++; sup = arg(); continue; }
        if (s[i] === '_' && sub == null) { i++; sub = arg(); continue; }
        if (s[i] === "'") { i++; base = { t: (base ? base.t + ' ' : '') + 'prime' }; continue; }
        break;
      }
      if (!sub && !sup) return base;
      let t = base ? base.t : '';
      if (base && base.big) {
        const from = sub ? join(sub) : '', to = sup ? join(sup) : '';
        if (base.big === 'the limit') return { t: 'the limit' + (from ? ' as ' + from : '') + ' of' };
        if (base.over) return { t: base.big + (from ? ' over ' + from : '') + ' of' };
        return { t: base.big + (from ? ' from ' + from : '') + (to ? ' to ' + to : '') + ' of' };
      }
      if (sub) t += (base && base.fn ? ' base ' : ' sub ') + wrapG(sub);
      if (sup) {
        const p = join(sup), neg = sup.length === 2 && sup[0] && sup[0].t === 'minus' && sup[1] && !sup[1].op && !sup[1].cx, one = !multi(sup) || neg;
        if (neg && sup[1].t === '1' && base && /^[A-Za-z]$/.test(base.t)) return { t: t + ' inverse', cx: true };
        t += p === '2' ? ' squared' : p === '3' ? ' cubed' : p === 'times' || p === 'star' ? ' star' : p === 'plus' ? ' plus' : p === 'T' ? ' transpose'
          : p === 'R' ? ' reversed' : p === 'prime' ? ' prime' : ' to the ' + (one ? p : '(' + p + ')');
      }
      return { t: t.trim(), cx: true };
    }
    function command() {
      const m = /^\\([A-Za-z]+|[\s\S])/.exec(s.slice(i));
      if (!m) { i++; return null; }
      i += m[0].length;
      const c = m[1];
      if (/^[dtc]?frac$/.test(c)) { const a = arg(), b = arg(); return { t: wrapG(a) + ' over ' + wrapG(b), op: true }; }
      if (/^[dt]?binom$/.test(c)) { const a = arg(), b = arg(); return { t: wrapG(a) + ' choose ' + wrapG(b), op: true }; }
      if (c === 'sqrt') { const n = optArg(), a = arg(), k = n ? join(n) : ''; return { t: (k === '3' ? 'the cube root of ' : k ? 'the ' + k + '-th root of ' : 'the square root of ') + wrapG(a) }; }
      if (c === 'pmod') { const a = arg(); return { t: 'mod ' + join(a), op: true }; }
      if (c === 'not') { ws(); const a = atom(); return { t: 'not ' + (a ? a.t : ''), op: true }; }
      if (c === 'begin' || c === 'end') { arg(); return null; }
      if (FONT.has(c)) {                                                    // text reads as written ('\text{Student}' is a word); a group with commands is parsed
        ws();
        const w = s[i] === '{' && /^\{([^{}\\$]*)\}/.exec(s.slice(i));
        if (w) { i += w[0].length; return w[1].trim() ? { t: w[1].trim() } : null; }
        const a = arg(); return { t: join(a), op: multi(a) };
      }
      if (WRAPC.has(c)) { const a = arg(); return a.length === 1 ? a[0] : { t: join(a), op: multi(a) }; }
      if (c in ACC) { const a = arg(); return { t: (ACC[c] === 'vector' ? 'vector ' + join(a) : join(a) + (ACC[c] ? ' ' + ACC[c] : '')).trim() }; }
      if (c === 'stackrel' || c === 'overset' || c === 'underset') { const a = arg(), b = arg(); return { t: join(b) + ' ' + join(a) }; }
      if (c === 'color') { arg(); return null; }
      if (c === 'textcolor') { arg(); const a = arg(); return { t: join(a) }; }
      if (/^(hspace|vspace|kern|mkern|mskip|hskip)$/.test(c)) { arg(); return null; }
      if (DROP.has(c)) return null;
      if (c in BIG) return { t: BIG[c], big: BIG[c] };
      if (c in OVER) { ws(); return s[i] === '_' ? { t: OVER[c], big: OVER[c], over: true } : { t: SAY[c], fn: true }; }
      if (FN.test(c)) return { t: SAY[c], fn: true };
      if (Object.prototype.hasOwnProperty.call(SAY, c)) { const w = SAY[c]; return w.trim() ? { t: w.trim() === ',' ? ',' : w, op: OPW.has(w) || /^(to|in|union|intersection|times|implies|join|and|or|not)$/.test(w) } : null; }
      return { t: c };
    }
    function atom() {
      ws();
      if (i >= s.length) return null;
      const ch = s[i];
      if (ch === '\\') return command();
      if (ch === '{') { i++; const a = seq('}'); i++; return { t: join(a), op: multi(a) }; }
      if (/[0-9]/.test(ch)) { const m = /^[0-9]+(?:\.[0-9]+)?/.exec(s.slice(i)); i += m[0].length; return { t: m[0] }; }
      i++;
      if (/[A-Za-z]/.test(ch)) return { t: ch };
      if (Object.prototype.hasOwnProperty.call(OPS, ch)) return { t: OPS[ch], op: true };
      if (ch === '!') return { t: 'factorial' };
      if (ch === "'") return { t: 'prime' };
      if (ch === '&' || ch === '~') return null;
      return { t: ch };
    }
    function seq(stop) {
      const out = [];
      for (;;) { ws(); if (i >= s.length || s[i] === stop) break; out.push(script(atom())); }
      return out;
    }
    return join(seq(null)).replace(/\s+([,.;:)\]}])/g, '$1').replace(/([([{])\s+/g, '$1').replace(/\s+/g, ' ').trim();
  }
  /** a label's markdown as words: $maths$ spoken, [[links]] to their text, emphasis marks and the kit's ~X overline ('X bar') dropped */
  const sayMd = t => String(t == null ? '' : t).replace(/(?<![\\$])\$(?!\s)((?:[^$\\\n]|\\.)+?)(?<!\s)\$(?!\d)/g, (m, x) => ' ' + speak(x) + ' ')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, a, b) => b || a).replace(/~\{([^}]*)\}|~([A-Za-z0-9]+)/g, (m, a, b) => (a != null ? a : b) + ' bar')
    .replace(/\*\*|__|`/g, '').replace(/\s+/g, ' ').replace(/\s+([,.;:!?)])/g, '$1').trim();

  /* ------------------------------------------------------------------ code highlighting */
  const KW = {
    c: 'auto break case char const continue default do double else enum extern float for goto if inline int long register return short signed sizeof static struct switch typedef union unsigned void volatile while NULL true false bool size_t',
    java: 'abstract boolean break byte case catch char class continue default do double else enum extends final finally float for if implements import instanceof int interface long new null package private protected public return short static super switch synchronized this throw throws try void volatile while true false var String',
    python: 'False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield self print range len',
    sql: 'SELECT FROM WHERE GROUP BY HAVING ORDER JOIN LEFT RIGHT FULL INNER OUTER CROSS NATURAL ON AS INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE VIEW INDEX DROP ALTER ADD PRIMARY KEY FOREIGN REFERENCES CHECK UNIQUE NOT NULL DEFAULT AND OR IN EXISTS BETWEEN LIKE IS DISTINCT UNION INTERSECT EXCEPT ALL ANY LIMIT OFFSET COUNT SUM AVG MIN MAX CASE WHEN THEN ELSE END ASC DESC BEGIN COMMIT ROLLBACK GRANT REVOKE',
    pseudo: 'if then else elseif endif for to downto do endfor while endwhile repeat until return procedure function begin end and or not mod div true false null',
    text: ''
  };
  KW.cpp = KW.c; KW.js = KW.java; KW.pseudocode = KW.pseudo; KW.algorithm = KW.pseudo;
  const TOK = /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\/\*[\s\S]*?\*\/|\/\/[^\n]*|--[^\n]*|#(?!include|define|ifdef|ifndef|endif|undef|if\b|else|pragma)[^\n]*)|(^[ \t]*#\s*(?:include|define|ifdef|ifndef|endif|undef|if|else|pragma)[^\n]*)|(\b0[xX][0-9a-fA-F]+\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|([A-Za-z_][A-Za-z_0-9]*)/gm;
  function highlight(code, lang) {
    lang = (lang || 'text').toLowerCase();
    const kws = new Set((KW[lang] || '').split(/\s+/).filter(Boolean));
    if (lang === 'text' || (!kws.size && !(lang in KW))) return esc(code);      // plain text is never coloured (command output, tables of bits, grammars)
    const sqlLike = lang === 'sql';
    const hashComment = lang === 'python' || lang === 'text';
    let out = '', last = 0, m;
    TOK.lastIndex = 0;
    while ((m = TOK.exec(code))) {
      out += esc(code.slice(last, m.index));
      const [all, str, com, pre, num, word] = m;
      if (str) out += `<span class="s">${esc(str)}</span>`;
      else if (com && com.startsWith('--') && !sqlLike) { out += '--'; last = TOK.lastIndex = m.index + 2; continue; }   // `top--` in C/Java: only `--` is skipped, the rest of the line is still tokenised
      else if (com) { if (com[0] === '#' && !hashComment && lang !== 'pseudo') out += esc(com); else out += `<span class="c">${esc(com)}</span>`; }
      else if (pre) out += lang === 'c' || lang === 'cpp' ? `<span class="p">${esc(pre)}</span>` : esc(pre);
      else if (num) out += `<span class="n">${esc(num)}</span>`;
      else if (word) out += kws.has(sqlLike ? word.toUpperCase() : word) ? `<span class="k">${esc(word)}</span>` : esc(word);
      last = m.index + all.length;
    }
    return out + esc(code.slice(last));
  }
  /* programs wrap their long lines on narrow screens instead of hiding the end-of-line comments (P2-19): one span per line, so the wrapped
     part hangs under the line's own indent (content.css, --i = the indent in columns); 'text' blocks (tables of bits, output, grammars) keep
     their columns and scroll with GA.fit's cue */
  const CODE_WRAP = new Set(['c', 'cpp', 'java', 'js', 'sql', 'pseudo', 'pseudocode', 'algorithm', 'python']);
  function codeLines(html, src) {
    const raw = String(src).split('\n'), parts = String(html).split('\n'), TAG = /<span class="[a-z]+">|<\/span>/g;
    let open = '';
    return parts.map((ln, k) => {
      let cur = open, m;
      TAG.lastIndex = 0;
      while ((m = TAG.exec(ln))) cur = m[0] === '</span>' ? '' : m[0];          // the highlighter's spans never nest
      const body = open + ln + (cur ? '</span>' : '');
      open = cur;
      const ind = /^[ \t]*/.exec(raw[k] || '')[0].replace(/\t/g, '    ').length;
      return `<span class="cl"${ind ? ` style="--i:${ind}"` : ''}>${body}${k < parts.length - 1 ? '\n' : ''}</span>`;
    }).join('');
  }

  /* ------------------------------------------------------------------ inline */
  // a short formula keeps the punctuation after it (a comma, a closing bracket, '-bit') and a bracket before it on its line: KaTeX's boxes are
  // inline-blocks, after which a browser may wrap even a comma (P2-18). Longer formulas still break inside, between their terms.
  const NW_MAX = 30;
  const NW = /((?:[([“‘]|&quot;|&#39;)+)?\u0000(\d+)\u0000((?:[,.;:!?)\]’”…%]|&quot;|&#39;s\b|&#39;)+|-[A-Za-z]{1,14}(?![A-Za-z]))?/g;
  // protect code spans and math with placeholders so emphasis/links never touch them. opts.label: the text labels a control (an option, a
  // button), so its maths carries words instead of MathML (P0-18)
  function inline(src, opts) {
    opts = opts || {};
    const keep = [], short = new Set();
    const stash = html => { keep.push(html); return '\u0000' + (keep.length - 1) + '\u0000'; };
    let s = String(src == null ? '' : src);
    s = s.replace(/\\`/g, () => stash('`'));          // '\`' a literal backtick (ICAI's stray Rupee-font tick kept as printed), never a code span or a backslash
    s = s.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (_, __, c) => stash(`<code>${esc(c.trim())}</code>`));
    s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => stash(math(t, true)));
    s = s.replace(/(?<![\\$])\$(?!\s)((?:[^$\\\n]|\\.)+?)(?<!\s)\$(?!\d)/g, (_, t) => { const k = stash(math(t, false, opts.label)); if (t.trim().length <= NW_MAX) short.add(keep.length - 1); return k; });
    s = s.replace(/\\\$/g, () => stash('$'));
    // Markdown backslash escapes ('\*' a literal asterisk, '2\.' a number that is not a list): the character, never markup
    s = s.replace(/\\([*_~=#.!+\-[\]()|\\])/g, (_, c) => stash(esc(c)));
    s = esc(s);
    s = s.replace(/\[\[([a-z0-9_.\-:#]+)(?:\|([^\]]+))?\]\]/gi, (_, id, label) => {
      if (/^q:/.test(id)) return `<a class="xref xq" href="#/q/${esc(id.slice(2))}">${label || esc(id.slice(2))}</a>`;
      if (/^lab:/.test(id)) return `<a class="xref xl" href="#/lab/${esc(id.slice(4))}">${label || esc(id.slice(4))}</a>`;
      return `<a class="xref" href="#/l/${esc(id)}" data-ref="${esc(id)}">${label || esc(id)}</a>`;
    });
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|#[^)\s]*|mailto:[^)\s]+)\)/g, (_, t, u) => `<a href="${u}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
    s = s.replace(/\*\*(?=\S)([\s\S]+?)(?<=\S)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(?<![\w*])\*(?=[^\s*])([\s\S]+?)(?<=[^\s*])\*(?![\w*])/g, '<em>$1</em>');
    s = s.replace(/(?<![\w_])_(?=[^\s_])([^_\n]+?)(?<=[^\s_])_(?![\w_])/g, '<em>$1</em>');
    s = s.replace(/==(?=\S)([\s\S]+?)(?<=\S)==/g, '<mark>$1</mark>');
    s = s.replace(/~~(?=\S)([\s\S]+?)(?<=\S)~~/g, '<del>$1</del>');
    s = s.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
    s = s.replace(/ -- /g, ' — ').replace(/\.\.\./g, '…');
    if (opts.br) s = s.replace(/\n/g, '<br>');
    if (short.size) s = s.replace(NW, (m, pre, n, post) => ((pre || post) && short.has(+n) ? `<span class="m-nw">${m}</span>` : m));
    return s.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[+i]);
  }

  /* ------------------------------------------------------------------ callouts */
  const CALL = {
    note: ['Note', 'info'], key: ['Key idea', 'key'], analogy: ['Think of it like', 'bulb'], trick: ['Trick', 'bolt'],
    mistake: ['Common mistake', 'alert'], exam: ['In the exam', 'target'], definition: ['Definition', 'book'],
    formula: ['Formula', 'sigma'], warning: ['Careful', 'alert'], tip: ['Tip', 'bulb'], tldr: ['In one breath', 'zap'], recap: ['Recap', 'check']
  };
  const ico = n => `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;

  /* ------------------------------------------------------------------ blocks */
  const OPEN = /^(:{3,})\s*([a-z][a-z0-9-]*)?\s*(.*)$/;
  function findClose(lines, i, n) {
    for (let j = i + 1; j < lines.length; j++) if (new RegExp('^:{' + n + '}\\s*$').test(lines[j].trim())) return j;
    return -1;
  }
  const isTableSep = l => /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(l) && l.includes('-');
  /** split a table row into cells; bars inside `code`, $maths$ and [[id|label]] links do not split, and \| is a literal bar */
  const cells = l => {
    let s = l.trim();
    if (s.startsWith('|')) s = s.slice(1);
    if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
    const out = []; let cur = '', i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (ch === '\\' && s[i + 1] === '|') { cur += '|'; i += 2; continue; }
      if (ch === '\\') { cur += ch + (s[i + 1] || ''); i += 2; continue; }
      let m = null;
      if (ch === '`') m = /^`[^`]*`/.exec(s.slice(i));
      else if (ch === '$') m = /^\$(?!\s)((?:[^$\\\n]|\\.)+?)(?<!\s)\$(?!\d)/.exec(s.slice(i));   // same rule as inline maths below
      else if (ch === '[' && s[i + 1] === '[') m = /^\[\[[^\]]*\]\]/.exec(s.slice(i));
      if (m) { cur += m[0]; i += m[0].length; continue; }
      if (ch === '|') { out.push(cur.trim()); cur = ''; i++; continue; }
      cur += ch; i++;
    }
    out.push(cur.trim());
    return out;
  };

  // header cells are shown in capitals by CSS, which would turn "µs" into "ΜS" (reads as "MS"): keep µ/μ lower-case
  const keepCase = h => h.split(/(<[^>]*>)/).map(p => (p[0] === '<' ? p : p.replace(/[\u00b5\u03bc]/g, c => `<span class="kc">${c}</span>`))).join('');

  /** Header cells are set in capitals by CSS. That is safe only for ordinary words, so a header keeps its exact case (class "kc") when it holds
      digits, a one-letter word (a variable), Greek or other non-ASCII letters, a maths symbol (= < > + * / ^ _ ' ( ) | ...) or inline $maths$.
      Takes the cell's markdown source; emphasis, links and <br> are looked through; `code` and $maths$ keep their case anyway.
      True only when keeping the case changes what is shown (some lower-case letter outside code and maths). */
  const headKeep = src => {
    let t = String(src == null ? '' : src).replace(/(`+)[\s\S]*?\1/g, ' ');
    const shown = t.replace(/\$\$[\s\S]+?\$\$/g, ' ').replace(/(?<![\\$])\$(?!\s)((?:[^$\\\n]|\\.)+?)(?<!\s)\$(?!\d)/g, ' ');
    if (shown === shown.toUpperCase()) return false;
    if (shown !== t) return true;                                                     // inline maths
    t = t.replace(/&lt;br\s*\/?&gt;|<br\s*\/?>/gi, ' ').replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1').replace(/\[([^\]]+)\]\((?:https?:|#|mailto:)[^)\s]*\)/g, '$1')
      .replace(/\*\*(?=\S)([\s\S]+?)(?<=\S)\*\*/g, '$1').replace(/(?<![\w*])\*(?=[^\s*])([\s\S]+?)(?<=[^\s*])\*(?![\w*])/g, '$1')
      .replace(/(?<![\w_])_(?=[^\s_])([^_\n]+?)(?<=[^\s_])_(?![\w_])/g, '$1').replace(/==(?=\S)([\s\S]+?)(?<=\S)==/g, '$1').replace(/~~(?=\S)([\s\S]+?)(?<=\S)~~/g, '$1');
    if (!/^[A-Za-z\s.,:;!?&"–—-]*$/.test(t)) return true;                  // only letters, spaces and simple punctuation may be capitalised
    return (t.match(/[A-Za-z]+/g) || []).some(w => w.length < 2);                    // ... and only words of two or more letters
  };
  const thKc = src => (headKeep(src) ? ' class="kc"' : '');

  /** the shown length of a cell's markdown, roughly: maths counts a third of its TeX, markup and link targets count nothing */
  const textLen = c => String(c == null ? '' : c).replace(/\$\$?[^$]*\$\$?/g, m => 'x'.repeat(Math.ceil(m.length / 3))).replace(/`([^`]*)`/g, '$1')
    .replace(/\[\[[^|\]]*\|([^\]]*)\]\]/g, '$1').replace(/\[\[([^\]]*)\]\]/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<br\s*\/?>|[*_=~]/gi, '').trim().length;
  /** A prose table: three or more columns and at least one column whose body cells average 24 or more characters. On phones GA.fit shows it as
      row cards instead of a sideways-scrolling grid (P1-13); other wide tables keep scrolling with a sticky first column. */
  function proseTable(head, body) {
    if (!head || head.length < 3 || !body || !body.length) return false;
    for (let c = 0; c < head.length; c++) {
      let sum = 0;
      body.forEach(r => (sum += textLen(r[c])));
      if (sum / body.length >= 24) return true;
    }
    return false;
  }

  function renderTable(rows, o) {
    const head = cells(rows[0]);
    const al = cells(rows[1]).map(c => (/^:-+:$/.test(c) ? 'center' : /-+:$/.test(c) ? 'right' : ''));
    const td = (c, i, t) => `<${t}${t === 'th' ? thKc(c) : ''}${al[i] ? ` style="text-align:${al[i]}"` : ''}>${inline(c, o)}</${t}>`;
    const brows = rows.slice(2).map(cells);
    const body = brows.map(r => '<tr>' + r.map((c, i) => td(c, i, 'td')).join('') + '</tr>').join('');
    // a header row with no text at all (a source table that has none, as in ICAI's papers: '| | |' then '|---|---|') draws no empty head
    const thead = head.some(c => String(c).trim()) ? `<thead><tr>${head.map((c, i) => td(c, i, 'th')).join('')}</tr></thead>` : '';
    return `<div class="tw"${proseTable(head, brows) ? ' data-prose="1"' : ''}><table${thead ? '' : ' class="nohead"'}>${thead}<tbody>${body}</tbody></table></div>`;
  }

  function renderList(items, ordered, o, start) {
    // items: [{text, kids:[{...}], more?: [lines]}] built by parseList; an ordered list that does not begin at 1 keeps its first number
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag}${ordered && start > 1 ? ` start="${start}"` : ''}>` + items.map(it => {
      const task = /^\[( |x|X)\]\s+/.exec(it.text);
      const t = task ? it.text.slice(task[0].length) : it.text;
      // more: the item's follow-on blocks (paragraphs, lists) after a blank line, indented under it; rendered inside the item, in order
      return `<li${task ? ` class="task${task[1] !== ' ' ? ' done' : ''}"` : ''}>${inline(t, o)}${it.kids.length ? renderList(it.kids, it.kidsOrdered, o, it.kidsStart) : ''}${it.more ? block(dedent(it.more), o) : ''}</li>`;
    }).join('') + `</${tag}>`;
  }
  /** lines with their common leading spaces removed (blank lines kept) */
  function dedent(ls) {
    const n = Math.min(...ls.filter(l => l.trim()).map(l => /^ */.exec(l)[0].length));
    return ls.map(l => l.slice(Math.min(n, /^ */.exec(l)[0].length))).join('\n');
  }
  function parseList(lines, i, o) {
    const re = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
    const base = re.exec(lines[i])[1].length;
    const ordered = /\d/.test(re.exec(lines[i])[2]);
    const start = ordered ? parseInt(re.exec(lines[i])[2], 10) : 1;
    const items = [];
    let num = start - 1;
    const ind = l => /^\s*/.exec(l)[0].length;
    while (i < lines.length) {
      const m = re.exec(lines[i]);
      if (!m) {
        const last = items[items.length - 1];
        if (lines[i].trim() && last && !last.more && /^\s{2,}\S/.test(lines[i]) && !re.test(lines[i])) { last.text += ' ' + lines[i].trim(); i++; continue; }
        // a blank line inside the list (bank answers, ICAI's layout): what comes after it decides
        if (!lines[i].trim() && last) {
          let j = i; while (j < lines.length && !lines[j].trim()) j++;
          if (j < lines.length && ind(lines[j]) >= base + 2) {
            // an indented follow-on block (a paragraph, a nested list): it stays inside the item, up to the next line at the list's own indent
            let k = j; const more = [];
            while (k < lines.length && (!lines[k].trim() || ind(lines[k]) > base)) more.push(lines[k++]);
            while (more.length && !more[more.length - 1].trim()) more.pop();
            last.more = (last.more || []).concat(last.more ? [''] : [], more);
            i = k - (k < lines.length && !lines[k - 1].trim() ? 1 : 0);
            continue;
          }
          const nm = j < lines.length ? re.exec(lines[j]) : null;
          // the next item of the same list after a blank line: the list goes on (an ordered list when the number follows on, a bullet list
          // whose items carry follow-on blocks), so its numbers never restart at 1
          if (nm && nm[1].length === base && /\d/.test(nm[2]) === ordered && (ordered ? parseInt(nm[2], 10) === num + 1 : items.some(x => x.more))) { i = j; continue; }
        }
        break;
      }
      const d = m[1].length;
      if (d < base) break;
      if (d > base) {
        const sub = parseList(lines, i, o);
        const last = items[items.length - 1];
        if (last && last.more) last.more = last.more.concat(lines.slice(i, sub.next));     // after a follow-on block: keeps its place
        else if (last) { last.kids = sub.items; last.kidsOrdered = sub.ordered; last.kidsStart = sub.start; }
        i = sub.next;
        continue;
      }
      if (/\d/.test(m[2]) !== ordered) break;
      items.push({ text: m[3], kids: [], kidsOrdered: false });
      num = ordered ? parseInt(m[2], 10) : num + 1;
      i++;
    }
    return { items, ordered, start, next: i };
  }

  /* quiz parsing -------------------------------------------------------- */
  function parseQuiz(body) {
    const qs = [];
    let cur = null;
    const push = () => { if (cur) { qs.push(cur); cur = null; } };
    body.split('\n').forEach(raw => {
      const l = raw.trimEnd();
      let m;
      if ((m = /^Q\d*[:.]\s*(.*)$/.exec(l))) { push(); cur = { stem: m[1], opts: [], ans: null, exp: '' }; }
      else if (!cur) return;
      else if ((m = /^[-*]\s+\[( |x|X)\]\s+(.*)$/.exec(l))) cur.opts.push({ t: m[2], ok: m[1] !== ' ' });
      else if ((m = /^=\s*(.+)$/.exec(l))) cur.ans = m[1].trim();
      else if ((m = /^>\s?(.*)$/.exec(l))) cur.exp += (cur.exp ? '\n' : '') + m[1];
      else if (l.trim()) { if (cur.opts.length || cur.ans) cur.exp += (cur.exp ? '\n' : '') + l; else cur.stem += '\n' + l; }
    });
    push();
    return qs;
  }
  function renderQuiz(qs, title, o) {
    const id = o.lessonId || 'quiz';
    const items = qs.map((q, k) => {
      const multi = q.opts.filter(x => x.ok).length > 1;
      const kind = q.opts.length ? (multi ? 'msq' : 'mcq') : 'nat';
      const opts = q.opts.length
        ? `<div class="qz-opts">${q.opts.map((x, j) => `<label class="qz-o"><input type="${multi ? 'checkbox' : 'radio'}" name="${esc(id)}-qz${k}" value="${'ABCDEFGH'[j]}"><span class="qz-k">${'ABCDEFGH'[j]}</span><span class="qz-t">${inline(x.t, { ...o, label: true })}</span></label>`).join('')}</div>`
        : `<div class="qz-nat"><input type="text" inputmode="decimal" placeholder="Your answer" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" aria-label="Numerical answer"><button type="button" class="qz-pm" data-nat-pm aria-label="Add or remove the minus sign">±</button><span class="qz-nat-msg" aria-live="polite"></span></div>`;
      const key = q.opts.length ? q.opts.map((x, j) => (x.ok ? 'ABCDEFGH'[j] : '')).join('') : q.ans;
      return `<div class="qz-q" data-k="${k}" data-kind="${kind}" data-key="${esc(key)}"><div class="qz-s"><span class="qz-n">${k + 1}</span><div>${inline(q.stem, { ...o, br: true })}</div></div>${opts}<div class="qz-bar"><button type="button" class="btn sm" data-qz="check">Check</button><span class="qz-res" aria-live="polite"></span></div><div class="qz-exp" hidden>${q.exp ? block(q.exp, o) : ''}</div></div>`;
    }).join('');
    // fit-late: GA.fit.all fits the quiz on its next pass wherever it is, once it is laid out (the lesson page moves it into Worked examples
    // after that part was fitted, so a long stem formula stayed clipped at phone widths)
    return `<section class="ga-quiz fit-late" data-quiz="${esc(id)}" data-n="${qs.length}"><header><b>${ico('check')} Check yourself</b>${title && !/^\s*check yourself\s*$/i.test(title) ? ' · ' + inline(title, o) : ''}<span class="qz-score"></span></header>${items}</section>`;
  }

  /* container rendering ------------------------------------------------- */
  function container(kind, title, inner, o) {
    kind = (kind || 'note').toLowerCase();
    if (CALL[kind]) {
      const [label, ic] = CALL[kind];
      return `<aside class="co co-${kind}"><div class="co-h">${ico(ic)}<b>${label}</b>${title ? `<span class="co-t">${inline(title, o)}</span>` : ''}</div><div class="co-b">${block(inner, o)}</div></aside>`;
    }
    switch (kind) {
      case 'example': {
        return `<section class="ex"><div class="ex-h"><span class="ex-tag">Worked example</span>${title ? `<b>${inline(title, o)}</b>` : ''}</div><div class="ex-b">${block(inner, o)}</div></section>`;
      }
      case 'answer': case 'solution': case 'details': {
        const label = kind === 'details' ? (title || 'Details') : (title || (kind === 'solution' ? 'Show solution' : 'Show answer'));
        return `<details class="rev rev-${kind}"><summary>${inline(label, o)}</summary><div class="rev-b">${block(inner, o)}</div></details>`;
      }
      case 'steps': {
        const lines = inner.split('\n');
        const items = []; let cur = null;
        lines.forEach(l => { const m = /^\s*(\d+)[.)]\s+(.*)$/.exec(l); if (m) { cur = { t: m[2] }; items.push(cur); } else if (cur) cur.t += '\n' + l; });
        return `<ol class="steps">${items.map(it => `<li><div>${block(it.t.trim(), o)}</div></li>`).join('')}</ol>`;
      }
      case 'cols': {
        const parts = inner.split(/\n-{3,}\s*\n/);
        // a title ("::: cols Process I Account") is drawn above the columns: two-sided ICAI accounts name themselves
        return `${title ? `<div class="cols-t">${inline(title, o)}</div>` : ''}<div class="cols c${parts.length}${title ? ' has-t' : ''}">${parts.map(p => `<div>${block(p, o)}</div>`).join('')}</div>`;
      }
      case 'compare': return `${title ? `<div class="cols-t">${inline(title, o)}</div>` : ''}<div class="compare">${block(inner, o)}</div>`;
      case 'quiz': return renderQuiz(parseQuiz(inner), title, o);
      case 'diagram': {
        let spec;
        try { spec = JSON.parse(inner); } catch (e) { return `<div class="co co-warning"><div class="co-h"><b>Diagram error</b></div><div class="co-b"><code>${esc(e.message)}</code></div></div>`; }
        if (title && !spec.title) spec.title = title;
        const D = GA.diagram;
        // the title is HTML above the drawing (P2-18): it keeps its size when the drawing is scaled and stays in view when a wide one scrolls;
        // the drawing keeps it as its accessible name (alt), so the visible copy is hidden from screen readers. Tables draw their own title.
        const tt = spec.title && spec.type !== 'table' ? String(spec.title) : '';
        const draw = tt ? Object.assign({}, spec, { title: '', alt: spec.alt || tt }) : spec;
        let svg;
        try { svg = D ? D.render(draw) : '<!-- diagram module missing -->'; } catch (e) { svg = `<div class="co co-warning"><div class="co-h"><b>Diagram error</b></div><div class="co-b"><code>${esc(e.message)}</code></div></div>`; }
        // kinds the kit can redraw at phone width keep their spec, so GA.fit re-lays them out instead of shrinking them (P1-12)
        const W = +((/^<svg\b[^>]*?\swidth="([\d.]+)"/.exec(svg) || [])[1] || 0);
        const keep = D && D.canRelayout && W > 340 && D.canRelayout(draw) ? ` data-spec="${esc(JSON.stringify(draw))}"` : '';
        // what the drawing shows, in words, for screen readers (P3-14); an author's alt is the drawing's name and stands alone
        const d = D && D.describe && /^<svg\b/.test(svg) && !spec.alt ? D.describe(spec) : null;
        const desc = d ? `<div class="sr dg-sr">${esc(sayMd(d.intro))}${d.items.length ? `<ul>${d.items.map(x => `<li>${esc(sayMd(x))}</li>`).join('')}</ul>` : ''}</div>` : '';
        return `<figure class="dg dg-${esc(spec.type || 'x')}" data-diagram="${esc(spec.type || '')}"${keep}>${tt && /^<svg\b/.test(svg) ? `<div class="dg-tt" aria-hidden="true">${inline(tt, o)}</div>` : ''}${svg}${desc}${spec.caption ? `<figcaption>${inline(spec.caption, o)}</figcaption>` : ''}</figure>`;
      }
      case 'lab': {
        const m = /^([a-z0-9-]+)\s*(\{[\s\S]*\})?\s*$/i.exec(title || '');
        const id = m ? m[1] : '';
        let cfg = m && m[2] ? m[2] : '{}';
        return `<div class="ga-lab-embed" data-lab="${esc(id)}" data-cfg="${esc(cfg)}">${inner.trim() ? `<p class="lab-cap">${inline(inner.trim(), o)}</p>` : ''}</div>`;
      }
      case 'pyq': {
        const ids = (title + ' ' + inner).split(/[\s,]+/).filter(x => /:/.test(x));
        // the lesson page hydrates the list from the bank; until then (and in previews, or while the ICAI bank is empty) it says so honestly
        return `<section class="ga-pyq-embed" data-ids="${esc(ids.join(' '))}"><header><b>${ico('target')} ICAI questions</b><span>${ids.length}</span></header><div class="pq-list"><p class="pq-none">ICAI past papers, RTPs and MTPs are being added.</p></div></section>`;
      }
      case 'timeline': case 'raw': return `<div>${block(inner, o)}</div>`;
      default: return `<aside class="co co-note"><div class="co-h">${ico('info')}<b>${esc(U(kind))}</b>${title ? `<span class="co-t">${inline(title, o)}</span>` : ''}</div><div class="co-b">${block(inner, o)}</div></aside>`;
    }
  }
  const U = s => s.charAt(0).toUpperCase() + s.slice(1);

  function block(src, o) {
    o = o || {};
    const lines = String(src == null ? '' : src).replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const t = line.trim();
      if (!t) { i++; continue; }
      // fenced code
      let m = /^(`{3,}|~{3,})\s*([\w+#-]*)\s*(.*)$/.exec(t);
      if (m) {
        const fence = m[1], lang = m[2] || 'text';
        const buf = []; i++;
        while (i < lines.length && !lines[i].trim().startsWith(fence)) buf.push(lines[i++]);
        i++;
        const title = /title="([^"]+)"/.exec(m[3]);
        if (lang === 'diagram') { out.push(container('diagram', title ? title[1] : '', buf.join('\n'), o)); continue; }   // ```diagram fences draw like ::: diagram (used in PYQ solutions)
        const src = buf.join('\n'), wrapL = CODE_WRAP.has(lang.toLowerCase());
        out.push(`<div class="code${wrapL ? ' code-w' : ''}">${title ? `<div class="code-t">${esc(title[1])}</div>` : ''}<pre><code class="lang-${esc(lang)}">${wrapL ? codeLines(highlight(src, lang), src) : highlight(src, lang)}</code></pre></div>`);
        continue;
      }
      // container
      m = OPEN.exec(t);
      if (m && m[1].length >= 3 && (m[2] || /^:{3,}\s/.test(t) === false)) {
        const n = m[1].length;
        const j = findClose(lines, i, n);
        if (j > 0) {
          out.push(container(m[2], m[3].trim(), lines.slice(i + 1, j).join('\n'), o));
          i = j + 1;
          continue;
        }
      }
      // heading
      m = /^(#{1,4})\s+(.*?)\s*#*$/.exec(t);
      if (m) {
        const lv = m[1].length;
        const id = slug(m[2]);
        out.push(`<h${lv} id="${id}"${o.sections ? ` data-sec="${id}"` : ''}>${inline(m[2], o)}</h${lv}>`);
        i++;
        continue;
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(t)) { out.push('<hr>'); i++; continue; }
      // table
      if (t.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        const rows = [lines[i], lines[i + 1]]; i += 2;
        while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(lines[i++]);
        out.push(renderTable(rows, o));
        continue;
      }
      // blockquote
      if (t.startsWith('>')) {
        const buf = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) buf.push(lines[i++].trim().replace(/^>\s?/, ''));
        /* dialogue (CONTENT_GUIDE §2): each `> **Speaker:** line` is its own paragraph, so a two-line exchange never runs together */
        const SPK = /^\*\*[^*\n]{1,40}:\*\*\s/, said = buf.filter(l => SPK.test(l)).length;
        const lines2 = said ? buf.reduce((a, l) => { if (SPK.test(l) && a.length && a[a.length - 1].trim() !== '') a.push(''); a.push(l); return a; }, []) : buf;
        out.push(`<blockquote${said >= 2 ? ' class="dlg"' : ''}>${block(lines2.join('\n'), o)}</blockquote>`);
        continue;
      }
      // list
      if (/^(\s*)([-*+]|\d+[.)])\s+/.test(line)) {
        const r = parseList(lines, i, o);
        out.push(renderList(r.items, r.ordered, o, r.start));
        i = r.next;
        continue;
      }
      // display math on its own lines
      if (t.startsWith('$$') && !(t.length > 3 && t.endsWith('$$'))) {
        const buf = [t.slice(2)]; i++;
        while (i < lines.length && !lines[i].includes('$$')) buf.push(lines[i++]);
        if (i < lines.length) buf.push(lines[i++].split('$$')[0]);
        out.push(`<div class="mblock">${math(buf.join('\n'), true)}</div>`);
        continue;
      }
      // paragraph
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(```|~~~|#{1,4}\s|>|:{3,}|(-{3,}|\*{3,})$)/.test(lines[i].trim()) &&
             !(buf.length && /^(\s*)([-*+]|\d+[.)])\s+/.test(lines[i])) && !(lines[i].includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1]))) buf.push(lines[i++]);
      if (!buf.length) { buf.push(lines[i++]); }
      const para = buf.join('\n');
      if (/^\$\$[\s\S]+\$\$$/.test(para.trim())) out.push(`<div class="mblock">${math(para.trim().slice(2, -2), true)}</div>`);
      else out.push(`<p>${inline(para, o)}</p>`);
    }
    return out.join('\n');
  }

  function render(src, opts) {
    const o = opts || {};
    let html = block(src, o);
    if (o.sections) {
      // wrap every <h2 ...>…</h2> and what follows it, up to the next h2, in <section class="lsec">
      const parts = html.split(/(?=<h2 id=")/);
      html = parts.map(p => {
        const m = /^<h2 id="([^"]+)"/.exec(p);
        return m ? `<section class="lsec" id="s-${m[1]}" data-sec="${m[1]}">${p}</section>` : p;
      }).join('');
    }
    return html;
  }

  /** The lesson split at its top-level H2s, each part rendered on its own (P1-11): [{id, html}], where the first part (id '') holds anything
      before the first H2. Joined, the parts are render(src, {sections: true}) (newlines between blocks aside), so a view can insert the first
      sections at once and render the rest (their KaTeX and diagrams included) in later tasks. An H2 inside a code fence or a ::: block never
      splits. */
  function sections(src, opts) {
    const o = Object.assign({}, opts, { sections: true });
    const lines = String(src == null ? '' : src).replace(/\r\n?/g, '\n').split('\n');
    const parts = [];
    let cur = [], fence = null, box = 0;
    const flush = () => { if (cur.length) parts.push(cur); cur = []; };
    lines.forEach(l => {
      const t = l.trim();
      if (fence) { if (t.startsWith(fence)) fence = null; cur.push(l); return; }
      if (box) { if (new RegExp('^:{' + box + '}\\s*$').test(t)) box = 0; cur.push(l); return; }
      const fm = /^(`{3,}|~{3,})/.exec(t);
      if (fm) { fence = fm[1]; cur.push(l); return; }
      const cm = OPEN.exec(t);
      if (cm && cm[1].length >= 3 && cm[2]) { box = cm[1].length; cur.push(l); return; }
      if (/^##\s+\S/.test(t) && !/^###/.test(t)) flush();
      cur.push(l);
    });
    flush();
    return parts.map(p => {
      const html = block(p.join('\n'), o);
      const m = /^<h2 id="([^"]+)"/.exec(html);
      return m ? { id: m[1], html: `<section class="lsec" id="s-${m[1]}" data-sec="${m[1]}">${html}</section>` } : { id: '', html };
    });
  }

  /** plain text for search/indexing: drops code, math and markup */
  function toText(src) {
    return String(src || '').replace(/```[\s\S]*?```/g, ' ').replace(/\$\$[\s\S]*?\$\$/g, ' ').replace(/\$[^$\n]+\$/g, ' ')
      .replace(/^:{3,}.*$/gm, ' ').replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, '$2').replace(/[*_`#>|~=\[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /* ------------------------------------------------------------------ NAT answers (lesson self-checks, P0-16) */
  /** a numeric answer box's text kept to what an exam keypad allows: digits, one '.', a leading minus (the typographic minus counts as one). A comma is
      dropped, never read as a decimal point. GA.scoring.natClean (WP10) is the shared rule; this is the same rule for when it is not loaded. */
  function natClean(s) {
    if (GA.scoring && typeof GA.scoring.natClean === 'function') return GA.scoring.natClean(s);
    let out = '', dot = false;
    for (const ch of String(s == null ? '' : s).replace(/[−‒–]/g, '-')) {
      if (ch >= '0' && ch <= '9') out += ch;
      else if (ch === '.' && !dot) { out += ch; dot = true; }
      else if (ch === '-' && !out) out += ch;
    }
    return out;
  }
  const natValue = s => {
    if (GA.scoring && typeof GA.scoring.parseNat === 'function') return GA.scoring.parseNat(s);
    const t = String(s == null ? '' : s).trim();
    return /^-?(\d+\.?\d*|\.\d+)$/.test(t) && isFinite(+t) ? +t : null;
  };

  /* ------------------------------------------------------------------ browser behaviour of this markup (installed once, delegated on document) */
  if (typeof document !== 'undefined' && document.addEventListener) {
    // the line under a NAT box; bad = a refused Check (red, and a shake unless motion is reduced: content.css)
    const say = (inp, text, bad) => {
      const box = inp.closest('.qz-nat'), m = box && box.querySelector('.qz-nat-msg');
      if (m && m.textContent !== text) m.textContent = text;
      if (!box) return;
      if (bad && text) { box.classList.remove('qz-nat-bad'); void box.offsetWidth; box.classList.add('qz-nat-bad'); }
      else box.classList.remove('qz-nat-bad');
    };
    const COMMA = 'Use a decimal point (.), not a comma.';
    // a NAT box only ever holds a number in the making (P0-16): filter as the learner types or pastes, and say why a key did nothing. A refused
    // comma holds (data-comma) until a point is typed or the box is emptied, so '0,75' typed key by key never quietly becomes 75
    document.addEventListener('input', e => {
      const t = e.target;
      if (!t || !t.matches || !t.matches('.qz-nat input')) return;
      const v = t.value, c = natClean(v), comma = /,/.test(v);
      if (c !== v) {
        const at = t.selectionStart == null ? v.length : t.selectionStart, caret = natClean(v.slice(0, at)).length;
        t.value = c;
        try { t.setSelectionRange(caret, caret); } catch (err) { /* not focused */ }
      }
      if (comma) t.dataset.comma = '1';
      else if (!c || c.indexOf('.') >= 0) delete t.dataset.comma;
      say(t, comma || t.dataset.comma ? COMMA : c !== v.replace(/[−‒–]/g, '-') ? 'Only digits, one decimal point and a leading minus.' : '');
    }, true);
    // ± (shown on touch screens, whose number pads lack a minus): keep the keyboard open, then flip the sign
    const pm = e => (e.target && e.target.closest ? e.target.closest('.qz-nat [data-nat-pm]') : null);
    const hold = e => { if (pm(e)) e.preventDefault(); };
    document.addEventListener('pointerdown', hold, true);
    document.addEventListener('mousedown', hold, true);
    document.addEventListener('click', e => {
      const b = pm(e);
      if (b) {
        const inp = b.parentElement.querySelector('input');
        if (!inp || inp.disabled) return;
        inp.value = inp.value.startsWith('-') ? inp.value.slice(1) : '-' + inp.value;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        try { inp.focus({ preventScroll: true }); inp.setSelectionRange(inp.value.length, inp.value.length); } catch (err) { /* ignore */ }
        return;
      }
      // Check on a NAT self-check grades only a real number; anything else is explained, never marked wrong (a held comma included)
      const chk = e.target && e.target.closest ? e.target.closest('.qz-q[data-kind="nat"]:not([data-done]) [data-qz="check"]') : null;
      if (!chk) return;
      const inp = chk.closest('.qz-q').querySelector('.qz-nat input');
      if (!inp) return;
      const raw = inp.value.trim();
      if (!inp.dataset.comma && natValue(raw) != null) { say(inp, ''); return; }
      e.preventDefault(); e.stopImmediatePropagation();
      say(inp, inp.dataset.comma ? 'Use a decimal point (.), not a comma: type 0.75, not 0,75.' : raw ? 'Type a number like 12 or −0.5' : 'Type your answer first: a number like 12 or −0.5', true);
      try { inp.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
    }, true);
    // copying maths gives its TeX ($…$, $$…$$) as plain text; the rich copy keeps the rendered maths with its MathML (P0-18)
    document.addEventListener('copy', e => {
      const sel = g.getSelection && g.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount || !e.clipboardData) return;
      const r = sel.getRangeAt(0).cloneRange();
      const outer = n => { const el = n && (n.nodeType === 1 ? n : n.parentElement); return el && el.closest ? el.closest('.m[data-tex]') : null; };
      const a = outer(r.startContainer), b = outer(r.endContainer);
      if (a) r.setStartBefore(a);
      if (b) r.setEndAfter(b);
      const frag = r.cloneContents();
      if (!frag.querySelector || !frag.querySelector('.m[data-tex]')) return;
      const html = Array.prototype.map.call(frag.childNodes, n => (n.nodeType === 1 ? n.outerHTML : n.nodeType === 3 ? esc(n.textContent) : '')).join('');
      frag.querySelectorAll('.m[data-tex]').forEach(m => m.replaceWith(document.createTextNode(m.classList.contains('md') ? `$$${m.getAttribute('data-tex')}$$` : `$${m.getAttribute('data-tex')}$`)));
      e.clipboardData.setData('text/html', html);
      e.clipboardData.setData('text/plain', frag.textContent);
      e.preventDefault();
    });
  }

  /** the words of rendered markup, for an announcement or a flat label (P0-18): every formula said once (speak, from its data-tex), never
      twice as textContent gives it (KaTeX's MathML and its aria-hidden drawing); other aria-hidden copies are left out, .sr text is kept */
  function textOf(node) {
    if (!node || !node.cloneNode) return '';
    const c = node.cloneNode(true), d = c.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!d || !c.querySelectorAll) return String(c.textContent || '').replace(/\s+/g, ' ').trim();
    c.querySelectorAll('.m[data-tex]').forEach(m => m.replaceWith(d.createTextNode(' ' + speak(m.getAttribute('data-tex')) + ' ')));
    c.querySelectorAll('.katex-mathml, [aria-hidden="true"], script, style, template').forEach(x => x.remove());
    return String(c.textContent || '').replace(/\s+/g, ' ').replace(/\s+([,.;:!?)])/g, '$1').trim();
  }
  /** the characters KaTeX had no metrics for so far (they draw from a system font); tools/check_math.js can list them (P3-37) */
  const glyphs = () => [...glyphSeen];
  /** the lint warning for a display formula (P0-17), for tools/lint_content.js: null when it is fine, else why it will not wrap on a phone.
      A top-level \qquad splits a formula into rows that wrap; one that cannot (the formula has its own rows \\, alignment &, a \tag, a
      colour switch or a % comment) and a part that does not render on its own (the formula is then drawn unsplit) are named. A \qquad inside
      braces, an environment or \left…\right is spacing, not a split point, and passes. opts.long (off by default): also name formulas of
      that many TeX characters or more with nothing to split at. */
  function displayLint(tex, opts) {
    const t = String(tex == null ? '' : tex).trim(), long = opts && opts.long;
    const kt = (typeof katex !== 'undefined' && katex) || g.katex;
    const sc = qquadScan(t), rows = sc.parts;
    const WHY = { rows: 'has its own rows (\\\\)', align: 'has alignment (&)', tag: 'has a \\tag', color: 'switches colour', comment: 'has a % comment' };
    if (sc.top && sc.why) return `a top-level \\qquad cannot split this formula into rows because it ${WHY[sc.why]}: on a phone it stays one wide row`;
    if (rows && kt && kt.renderToString) {
      for (const r of rows) { try { kt.renderToString(r, Object.assign({ displayMode: true }, KOPT)); } catch (e) { return `the part "${r.slice(0, 40)}" between \\qquad does not render on its own, so the formula is drawn unsplit`; } }
      return null;
    }
    if (long && !rows && t.length >= long && !/\\begin\{/.test(t)) return `a long display formula (${t.length} characters of TeX) with no top-level \\qquad to split at: on a phone it shrinks and then scrolls`;
    return null;
  }

  GA.md = { render, sections, inline, block, highlight, math, toText, slug, esc, parseQuiz, keepCase, headKeep, splitQquad, proseTable, natClean, speak, sayMd, textOf, glyphs, codeLines, displayLint };
  if (typeof module !== 'undefined' && module.exports) module.exports = GA.md;
})(typeof window !== 'undefined' ? window : globalThis);
