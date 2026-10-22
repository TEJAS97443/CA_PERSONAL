/* PassBook — Ratio Analysis Lab (Paper 6A: fm.ratio).
   The givens are typed one per line as equations in plain words ('sales = 150 lakh', 'current ratio = 1.5', 'stock turnover = 6',
   'collection period = 2 months', 'fixed assets / current assets = 5/7'). parseLine() turns each into a linear equation over the balance
   sheet and P&L items; solve() adds the accounting identities (current assets = stock + receivables + cash …, the balance sheet balances,
   gross profit = sales − cost of goods sold …) and works out every item it can, one at a time, falling back to solving two or more
   equations together when no single one has a lone unknown. Three modes read the same givens: a ratio dashboard (SM ch. 3 §3, formulas as
   in §8 'Summary of ratios'), the DuPont tree (§3.4.2), and 'Build from ratios', the balance sheet filled in step by step.
   Node-testable: require('app/js/labs/ratios.js') exposes {parseLine, parseLines, solve, ratiosOf, compute, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const UT = () => GA.util || {};
  const grp = (x, d) => Number(x).toLocaleString('en-IN', { maximumFractionDigits: d == null ? 2 : d });
  const sg = (x, d) => (x < 0 ? '−' : '') + grp(Math.abs(x), d);
  const r2 = x => (x < 0 ? -1 : 1) * Math.round(Math.abs(x) * 100 + 1e-7) / 100;
  const inr = n => (UT().inr ? UT().inr(n) : (n < 0 ? '−' : '') + '₹' + grp(Math.abs(Math.round(n * 100) / 100)));
  const am = x => sg(r2(x));
  const f2 = x => (x < 0 ? '−' : '') + Math.abs(x).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ================================================================== the items (variables) and their names */
  const V = {
    sales: { n: 'sales', a: ['net sales', 'total sales', 'revenue', 'turnover', 'sales'] },
    csales: { n: 'credit sales', a: ['credit sales'] },
    cogs: { n: 'cost of goods sold', a: ['cost of goods sold', 'cost of sales', 'cogs'] },
    gp: { n: 'gross profit', a: ['gross profit'] },
    opex: { n: 'operating expenses', a: ['operating expenses', 'operating expense', 'other expenses', 'expenses'] },
    ebit: { n: 'EBIT', a: ['profit before interest and tax', 'earnings before interest and tax', 'operating profit', 'ebit', 'pbit'] },
    int: { n: 'interest', a: ['interest on debt', 'interest'], zero: true },
    pbt: { n: 'profit before tax', a: ['profit before tax', 'earnings before tax', 'pbt', 'ebt'] },
    tax: { n: 'tax', a: ['income tax', 'tax'], zero: true },
    pat: { n: 'net profit', a: ['profit after tax', 'earnings after tax', 'net profit', 'net income', 'pat', 'eat'] },
    pdiv: { n: 'preference dividend', a: ['preference dividend'], zero: true },
    ediv: { n: 'equity dividend', a: ['equity dividend', 'dividend'] },
    purch: { n: 'purchases', a: ['purchases'] },
    cpurch: { n: 'credit purchases', a: ['credit purchases'] },
    shares: { n: 'number of equity shares', a: ['number of equity shares', 'no of equity shares', 'equity shares', 'no of shares', 'shares'], cnt: true },
    mps: { n: 'market price per share', a: ['market price per share', 'market price', 'mps'], ps: true },
    esc: { n: 'equity share capital', a: ['equity share capital', 'share capital'] },
    rs: { n: 'reserves and surplus', a: ['reserves and surplus', 'retained earnings', 'reserves'] },
    nw: { n: 'net worth', a: ['equity shareholders funds', 'shareholders funds', 'shareholders equity', 'owners equity', 'net worth', 'equity', 'capital'] },
    pref: { n: 'preference share capital', a: ['preference share capital', 'preference capital', 'preference shares'], zero: true },
    pfund: { n: 'proprietary fund', a: ['proprietary fund', 'proprietors funds'] },
    ltd: { n: 'long-term debt', a: ['long term debt', 'long term loans', 'long term loan', 'debentures', 'term loan', 'debt'] },
    ol: { n: 'outside liabilities', a: ['total outside liabilities', 'outside liabilities'] },
    cl: { n: 'current liabilities', a: ['current liabilities'] },
    cred: { n: 'creditors', a: ['trade payables', 'sundry creditors', 'accounts payable', 'creditors', 'payables'] },
    ocl: { n: 'other current liabilities', a: ['other current liabilities'], zero: true },
    tl: { n: 'balance sheet total', a: ['balance sheet total', 'total liabilities'] },
    fa: { n: 'fixed assets', a: ['net fixed assets', 'fixed assets', 'net block'] },
    inv: { n: 'stock', a: ['closing inventory', 'closing stock', 'inventories', 'inventory', 'stock'] },
    oinv: { n: 'opening stock', a: ['opening inventory', 'opening stock'] },
    avginv: { n: 'average stock', a: ['average inventory', 'average stock'] },
    rec: { n: 'receivables', a: ['trade receivables', 'accounts receivable', 'sundry debtors', 'receivables', 'debtors'] },
    orec: { n: 'opening receivables', a: ['opening receivables', 'opening debtors'] },
    avgrec: { n: 'average receivables', a: ['average receivables', 'average debtors'] },
    ocred: { n: 'opening creditors', a: ['opening creditors', 'opening payables'] },
    avgcred: { n: 'average creditors', a: ['average creditors', 'average payables'] },
    cash: { n: 'cash and bank', a: ['cash and bank', 'cash at bank', 'cash', 'bank'] },
    oca: { n: 'other current assets', a: ['other current assets'], zero: true },
    ca: { n: 'current assets', a: ['total current assets', 'current assets'] },
    qa: { n: 'quick assets', a: ['quick assets', 'liquid assets'] },
    ta: { n: 'total assets', a: ['total assets'] },
    wc: { n: 'working capital', a: ['net working capital', 'working capital'] },
    ce: { n: 'capital employed', a: ['capital employed', 'net assets'] }
  };
  /* ratio names usable on the left of '=': each stands for a ratio of items (×100 is not needed: '25%' already means 0.25) */
  const SHORT = [
    { a: ['current ratio', 'working capital ratio'], num: { ca: 1 }, den: { cl: 1 } },
    { a: ['quick ratio', 'acid test ratio', 'liquid ratio', 'quick assets ratio'], num: { qa: 1 }, den: { cl: 1 } },
    { a: ['cash ratio', 'absolute liquidity ratio'], num: { cash: 1 }, den: { cl: 1 } },
    { a: ['gross profit ratio', 'gross profit margin', 'gp ratio'], num: { gp: 1 }, den: { sales: 1 } },
    { a: ['net profit ratio', 'net profit margin', 'np ratio'], num: { pat: 1 }, den: { sales: 1 } },
    { a: ['operating profit ratio'], num: { ebit: 1 }, den: { sales: 1 } },
    { a: ['operating ratio'], num: { cogs: 1, opex: 1 }, den: { sales: 1 } },
    { a: ['stock turnover ratio', 'stock turnover', 'inventory turnover ratio', 'inventory turnover'], num: { cogs: 1 }, den: { avginv: 1 } },
    { a: ['debtors turnover ratio', 'debtors turnover', 'receivables turnover ratio', 'receivables turnover'], num: { csales: 1 }, den: { avgrec: 1 } },
    { a: ['creditors turnover ratio', 'creditors turnover', 'payables turnover ratio', 'payables turnover'], num: { cpurch: 1 }, den: { avgcred: 1 } },
    { a: ['average collection period', 'debtors collection period', 'collection period', 'credit period allowed to customers'], num: { avgrec: 1 }, den: { csales: 1 }, days: true },
    { a: ['average payment period', 'creditors payment period', 'payment period'], num: { avgcred: 1 }, den: { cpurch: 1 }, days: true },
    { a: ['total assets turnover ratio', 'total assets turnover', 'total asset turnover', 'assets turnover'], num: { sales: 1 }, den: { ta: 1 } },
    { a: ['fixed assets turnover ratio', 'fixed assets turnover'], num: { sales: 1 }, den: { fa: 1 } },
    { a: ['capital turnover ratio', 'capital turnover', 'net assets turnover'], num: { sales: 1 }, den: { ce: 1 } },
    { a: ['working capital turnover ratio', 'working capital turnover'], num: { sales: 1 }, den: { wc: 1 } },
    { a: ['debt equity ratio', 'debt to equity ratio', 'debt to equity', 'debt equity'], num: { ltd: 1 }, den: { nw: 1 } },
    { a: ['proprietary ratio'], num: { pfund: 1 }, den: { ta: 1 } },
    { a: ['return on net worth', 'return on equity', 'return on shareholders funds', 'roe'], num: { pat: 1, pdiv: -1 }, den: { nw: 1 } },
    { a: ['return on total assets', 'return on assets', 'roa'], num: { pat: 1 }, den: { ta: 1 } },
    { a: ['return on capital employed', 'roce'], num: { ebit: 1 }, den: { ce: 1 } },
    { a: ['interest coverage ratio', 'interest coverage'], num: { ebit: 1 }, den: { int: 1 } },
    { a: ['earnings per share', 'eps'], num: { pat: 1, pdiv: -1 }, den: { shares: 1 } }
  ];
  const norm = s => String(s == null ? '' : s).toLowerCase().replace(/[’‘`]/g, "'").replace(/'/g, '').replace(/&/g, ' and ').replace(/[–—−]/g, '-').replace(/([a-z])-([a-z])/g, '$1 $2').replace(/\s+/g, ' ').trim();
  const NAMES = [];
  Object.entries(V).forEach(([id, x]) => x.a.forEach(a => NAMES.push({ t: norm(a), id })));
  SHORT.forEach((x, i) => x.a.forEach(a => NAMES.push({ t: norm(a), sc: i })));
  NAMES.sort((p, q) => q.t.length - p.t.length);
  const FILLER = new Set(['times', 'time', 'rupees', 'rs', 'inr', 'the', 'approximately', 'is', 'was', 'per', 'annum', 'year']);
  const MULT = { lakh: 1e5, lakhs: 1e5, lac: 1e5, lacs: 1e5, crore: 1e7, crores: 1e7, thousand: 1e3 };

  /* ================================================================== a tiny parser for linear equations */
  const lin = (k, c) => ({ L: 1, k: k || {}, c: c || 0 });
  const isConst = x => x.L && Object.keys(x.k).every(v => Math.abs(x.k[v]) < 1e-15);
  const addL = (a, b, s) => { const k = Object.assign({}, a.k); Object.entries(b.k).forEach(([v, c]) => (k[v] = (k[v] || 0) + s * c)); return lin(k, a.c + s * b.c); };
  const scaleL = (a, s) => lin(Object.fromEntries(Object.entries(a.k).map(([v, c]) => [v, c * s])), a.c * s);
  function tokenize(src, yd, fail) {
    const s = norm(src).replace(/₹/g, ' ').replace(/×|\bx\b/g, '*').replace(/÷/g, '/').replace(/per cent|percent/g, '%');
    const out = [];
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (ch === ' ') { i++; continue; }
      if (/[\d.]/.test(ch)) { const m = /^(\d[\d,]*(?:\.\d+)?|\.\d+)/.exec(s.slice(i)); if (!m) fail(`cannot read the number at "${s.slice(i, i + 8)}"`); out.push({ t: 'n', v: Number(m[1].replace(/,/g, '')) }); i += m[1].length; continue; }
      if ('+-*/()%:='.includes(ch)) { out.push({ t: ch }); i++; continue; }
      if (/[a-z]/.test(ch)) {
        const hit = NAMES.find(nm => s.startsWith(nm.t, i) && !/[a-z0-9]/.test(s[i + nm.t.length] || ''));
        if (hit) { out.push(hit.id ? { t: 'v', id: hit.id } : { t: 's', sc: hit.sc }); i += hit.t.length; continue; }
        const w = /^[a-z']+/.exec(s.slice(i))[0];
        if (w === 'of') out.push({ t: '*' });
        else if (MULT[w]) out.push({ t: 'm', v: MULT[w] });
        else if (/^months?$/.test(w)) out.push({ t: 'm', v: yd / 12 });
        else if (/^weeks?$/.test(w)) out.push({ t: 'm', v: yd / 52 });
        else if (/^days?$/.test(w)) { /* days are the unit of a period */ }
        else if (!FILLER.has(w)) fail(`I do not know "${w}". Use the names in the help (sales, current assets, stock, receivables …)`);
        i += w.length; continue;
      }
      fail(`unexpected "${ch}"`);
    }
    return out;
  }
  /** parse one line: {label, text, eq: linear form (= 0)} */
  function parseLine(raw, yd) {
    yd = yd || 360;
    let text = String(raw).trim(), label = '';
    const fail = m => { throw new Error(`"${text}": ${m}.`); };
    const eqAt = text.indexOf('=');
    if (eqAt < 0) fail('write it as an equation with "=", e.g. current ratio = 1.5');
    const colon = text.indexOf(':');
    if (colon >= 0 && colon < eqAt && /[a-z]/i.test(text.slice(0, colon)) && !/\d\s*$/.test(text.slice(0, colon))) { label = text.slice(0, colon).trim(); text = text.slice(colon + 1).trim(); }
    const toks = tokenize(text, yd, fail);
    const named = [...new Set(toks.filter(t => t.t === 'v').map(t => t.id))];   // items written by name (a ratio name brings its items in, but does not count as giving them)
    let p = 0;
    const peek = () => toks[p], take = t => (toks[p] && toks[p].t === t ? toks[p++] : null);
    const binop = (a, op, b) => {
      if (op === '+' || op === '-') { if (!a.L || !b.L) fail('a ratio can only be set equal to a number'); return addL(a, b, op === '+' ? 1 : -1); }
      if (op === '*') {
        if (a.L && b.L) { if (isConst(a)) return scaleL(b, a.c); if (isConst(b)) return scaleL(a, b.c); fail('two unknown amounts cannot be multiplied'); }
        const R = a.L ? b : a, c = a.L ? a : b; if (!isConst(c)) fail('a ratio can only be scaled by a number'); return { R: 1, num: scaleL(R.num, c.c), den: R.den };
      }
      if (a.L && b.L) { if (isConst(b)) { if (Math.abs(b.c) < 1e-15) fail('division by zero'); return scaleL(a, 1 / b.c); } return { R: 1, num: a, den: b }; }
      if (!a.L && b.L && isConst(b)) return { R: 1, num: a.num, den: scaleL(a.den, b.c) };
      fail('only one division by an unknown amount is allowed on each side');
    };
    function primary() {
      const t = peek();
      if (!t) fail('the line ends too soon');
      if (take('(')) { const e = expr(); if (!take(')')) fail('a bracket is not closed'); return e; }
      if (t.t === 'n') {
        p++;
        let v = t.v;
        if (take(':')) { const b = take('n'); if (!b) fail('a ratio a : b needs two numbers'); v = v / b.v; }
        return lin({}, v);
      }
      if (t.t === 'v') { p++; return lin({ [t.id]: 1 }); }
      if (t.t === 's') {
        p++; const S = SHORT[t.sc];
        return { R: 1, num: scaleL(lin(S.num), S.days ? yd : 1), den: lin(S.den) };
      }
      fail(`unexpected "${t.t}"`);
    }
    function postfix() {
      let x = primary();
      for (;;) {
        if (take('%')) x = binop(x, '*', lin({}, 0.01));
        else if (peek() && peek().t === 'm') x = binop(x, '*', lin({}, toks[p++].v));
        else return x;
      }
    }
    function factor() { if (take('-')) return binop(lin({}, 0), '-', factor()); if (take('+')) return factor(); return postfix(); }
    function term() { let x = factor(); for (;;) { const t = peek(); if (t && (t.t === '*' || t.t === '/')) { p++; x = binop(x, t.t, factor()); } else return x; } }
    function expr() { let x = term(); for (;;) { const t = peek(); if (t && (t.t === '+' || t.t === '-')) { p++; x = binop(x, t.t, term()); } else return x; } }
    const lhs = expr();
    if (!take('=')) fail('put one "=" between the two sides');
    const rhs = expr();
    if (p < toks.length) fail('there is something extra at the end');
    let eq;
    if (lhs.L && rhs.L) eq = addL(lhs, rhs, -1);
    else if (!lhs.L && rhs.L && isConst(rhs)) eq = addL(lhs.num, scaleL(lhs.den, rhs.c), -1);
    else if (lhs.L && !rhs.L && isConst(lhs)) eq = addL(rhs.num, scaleL(rhs.den, lhs.c), -1);
    else fail('a ratio must be equal to a number');
    Object.keys(eq.k).forEach(v => { if (Math.abs(eq.k[v]) < 1e-15) delete eq.k[v]; });
    if (!Object.keys(eq.k).length) fail('it names no balance-sheet or P&L item');
    return { label, text, eq, vars: Object.keys(eq.k), named };
  }
  function parseLines(src, yd) {
    const lines = String(src == null ? '' : src).split(/\n|;/).map(l => l.replace(/#.*$/, '').trim()).filter(Boolean);
    if (!lines.length) throw new Error('Type the given figures and ratios, one per line (see the help).');
    if (lines.length > 40) throw new Error('At most 40 lines.');
    return lines.map(l => parseLine(l, yd));
  }

  /* ================================================================== the identities and the solver */
  const E = (label, k, c) => ({ label, eq: lin(k, c || 0), id: true });
  function identities(mentioned) {
    const has = v => mentioned.has(v);
    const out = [
      E('gross profit = sales − cost of goods sold', { gp: 1, sales: -1, cogs: 1 }), E('EBIT = gross profit − operating expenses', { ebit: 1, gp: -1, opex: 1 }),
      E('profit before tax = EBIT − interest', { pbt: 1, ebit: -1, int: 1 }), E('net profit = profit before tax − tax', { pat: 1, pbt: -1, tax: 1 }),
      E('current assets = stock + receivables + cash + other current assets', { ca: 1, inv: -1, rec: -1, cash: -1, oca: -1 }), E('total assets = fixed assets + current assets', { ta: 1, fa: -1, ca: -1 }),
      E('current liabilities = creditors + other current liabilities', { cl: 1, cred: -1, ocl: -1 }), E('net worth = equity share capital + reserves and surplus', { nw: 1, esc: -1, rs: -1 }),
      E('outside liabilities = long-term debt + current liabilities', { ol: 1, ltd: -1, cl: -1 }), E('balance sheet total = net worth + preference capital + outside liabilities', { tl: 1, nw: -1, pref: -1, ol: -1 }),
      E('the balance sheet balances: total assets = balance sheet total', { ta: 1, tl: -1 }), E('quick assets = current assets − stock', { qa: 1, ca: -1, inv: 1 }),
      E('working capital = current assets − current liabilities', { wc: 1, ca: -1, cl: 1 }), E('capital employed = net worth + preference capital + long-term debt', { ce: 1, nw: -1, pref: -1, ltd: -1 }),
      E('proprietary fund = net worth + preference capital', { pfund: 1, nw: -1, pref: -1 })
    ];
    out.push(has('oinv') ? E('average stock = (opening stock + closing stock) ÷ 2', { avginv: 1, oinv: -0.5, inv: -0.5 }) : E('no opening stock is given, so average stock = closing stock', { avginv: 1, inv: -1 }));
    out.push(has('orec') ? E('average receivables = (opening + closing) ÷ 2', { avgrec: 1, orec: -0.5, rec: -0.5 }) : E('no opening receivables are given, so average = closing receivables', { avgrec: 1, rec: -1 }));
    out.push(has('ocred') ? E('average creditors = (opening + closing) ÷ 2', { avgcred: 1, ocred: -0.5, cred: -0.5 }) : E('no opening creditors are given, so average = closing creditors', { avgcred: 1, cred: -1 }));
    if (!has('csales')) out.push(E('no split of sales is given, so all sales are credit sales', { csales: 1, sales: -1 }));
    if (has('purch') || has('oinv')) out.push(E('purchases = cost of goods sold + closing stock − opening stock', { purch: 1, cogs: -1, inv: -1, oinv: 1 }));
    if (!has('cpurch')) out.push(E('all purchases are on credit', { cpurch: 1, purch: -1 }));
    Object.entries(V).forEach(([id, x]) => { if (x.zero && !has(id)) out.push(Object.assign(E(`${x.n} is not given, so it is nil`, { [id]: 1 }), { nil: true })); });
    return out;
  }
  /** Gauss-Jordan on the remaining equations: the unknowns they pin down (an underdetermined system may still fix some) */
  function determined(eqs, known) {
    const vars = [...new Set(eqs.flatMap(e => Object.keys(e.eq.k).filter(v => !(v in known))))];
    if (!vars.length) return {};
    const M = eqs.map(e => { let rhs = -e.eq.c; const row = vars.map(v => e.eq.k[v] || 0); Object.entries(e.eq.k).forEach(([v, c]) => { if (v in known) rhs -= c * known[v]; }); return row.concat([rhs]); });
    const n = vars.length, scale = Math.max(1, ...M.flat().map(Math.abs));
    let r = 0; const piv = [];
    for (let c = 0; c < n && r < M.length; c++) {
      let best = r; for (let i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[best][c])) best = i;
      if (Math.abs(M[best][c]) < 1e-12) continue;
      [M[r], M[best]] = [M[best], M[r]];
      const d = M[r][c]; for (let j = c; j <= n; j++) M[r][j] /= d;
      for (let i = 0; i < M.length; i++) if (i !== r && Math.abs(M[i][c]) > 0) { const f = M[i][c]; for (let j = c; j <= n; j++) M[i][j] -= f * M[r][j]; }
      piv.push([r, c]); r++;
    }
    const out = {};
    piv.forEach(([ri, c]) => { if (vars.every((v, j) => j === c || Math.abs(M[ri][j]) < 1e-9)) out[vars[c]] = Math.abs(M[ri][n]) < 1e-9 * scale ? 0 : M[ri][n]; });
    return out;
  }
  /** solve the givens: {known, steps:[{vars, eqs, how}], conflicts, mentioned} */
  function solve(given) {
    const mentioned = new Set(given.flatMap(l => l.named || l.vars));
    const eqs = given.map((l, i) => ({ label: l.label, text: l.text, eq: l.eq, line: i + 1 })).concat(identities(mentioned));
    const known = {}, steps = [], used = new Set(), taint = new Set();   // taint: figures that rest on an item taken as nil
    const unknownsOf = e => Object.keys(e.eq.k).filter(v => !(v in known));
    for (let guard = 0; guard < 200; guard++) {
      let progressed = false;
      for (const e of eqs) {
        if (used.has(e)) continue;
        const u = unknownsOf(e);
        if (u.length !== 1) continue;
        const v = u[0]; let rest = e.eq.c;
        Object.entries(e.eq.k).forEach(([w, c]) => { if (w !== v) rest += c * known[w]; });
        const x = -rest / e.eq.k[v];
        known[v] = Math.abs(x) < 1e-9 ? 0 : x; used.add(e); steps.push({ vars: [v], eqs: [e], how: 'one' }); progressed = true;
        if (e.nil || Object.keys(e.eq.k).some(w => w !== v && taint.has(w))) taint.add(v);
        break;                                                    // restart from the top so the givens are used before the identities
      }
      if (progressed) continue;
      const rest = eqs.filter(e => !used.has(e) && unknownsOf(e).length);
      const D = determined(rest, known);
      const vs = Object.keys(D);
      if (!vs.length) break;
      const inv = rest.filter(e => { const u = unknownsOf(e); return u.length && u.every(v => v in D); });
      vs.forEach(v => (known[v] = D[v]));
      inv.forEach(e => used.add(e));
      if (inv.some(e => e.nil || Object.keys(e.eq.k).some(w => !vs.includes(w) && taint.has(w)))) vs.forEach(v => taint.add(v));
      steps.push({ vars: vs, eqs: inv, how: 'together' });
    }
    const conflicts = eqs.filter(e => !e.nil && Object.keys(e.eq.k).every(v => v in known)).filter(e => {
      let s = e.eq.c, mag = Math.abs(e.eq.c); Object.entries(e.eq.k).forEach(([v, c]) => { s += c * known[v]; mag = Math.max(mag, Math.abs(c * known[v])); });
      return Math.abs(s) > 1e-6 * Math.max(1, mag);
    });
    return { known, steps, conflicts, mentioned, eqs, taint };
  }

  /* ================================================================== the ratio catalogue (SM ch. 3 §8) */
  const GROUPS = [['liq', 'Liquidity'], ['lev', 'Capital structure and coverage'], ['act', 'Activity (turnover)'], ['prof', 'Profitability'], ['mkt', 'Market and per share']];
  const RATIOS = [
    { g: 'liq', id: 'cr', n: 'Current ratio', f: 'current assets ÷ current liabilities', need: ['ca', 'cl'], val: k => k.ca / k.cl, u: ':1', why: x => (x >= 2 ? 'at or above the conventional 2 : 1, a comfortable cushion for short-term creditors' : x >= 1 ? 'below the conventional 2 : 1: current assets cover current liabilities with a thin margin' : 'below 1: current liabilities exceed current assets') },
    { g: 'liq', id: 'qr', n: 'Quick (acid-test) ratio', f: '(current assets − stock) ÷ current liabilities', need: ['qa', 'cl'], val: k => k.qa / k.cl, u: ':1', why: x => (x >= 1 ? 'at or above 1 : 1: the near-cash assets alone can pay the current liabilities' : 'below 1 : 1: without selling stock the firm cannot meet its current liabilities') },
    { g: 'liq', id: 'cash', n: 'Cash ratio', f: '(cash and bank + marketable securities) ÷ current liabilities', need: ['cash', 'cl'], val: k => k.cash / k.cl, u: ':1', why: () => 'absolute liquidity: what could be paid today from cash alone' },
    { g: 'liq', id: 'nwc', n: 'Net working capital', f: 'current assets − current liabilities', need: ['ca', 'cl'], val: k => k.ca - k.cl, u: '₹', why: x => (x >= 0 ? 'positive: long-term funds finance part of the current assets' : 'negative: current assets are financed partly by current liabilities') },
    { g: 'lev', id: 'de', n: 'Debt-equity ratio', f: 'long-term debt ÷ shareholders\' equity', need: ['ltd', 'nw'], val: k => k.ltd / k.nw, u: ':1', why: x => (x > 2 ? 'high: lenders have put in more than twice what the owners have' : 'the lower it is, the wider the cushion for lenders') },
    { g: 'lev', id: 'tolnw', n: 'Total outside liabilities to equity', f: '(long-term debt + current liabilities) ÷ shareholders\' equity', need: ['ol', 'nw'], val: k => k.ol / k.nw, u: ':1', why: () => 'all outsiders\' claims per rupee of owners\' funds' },
    { g: 'lev', id: 'dr', n: 'Debt ratio', f: 'long-term debt ÷ capital employed (net assets)', need: ['ltd', 'ce'], val: k => k.ltd / k.ce, u: ':1', why: x => (x > 1 ? 'above 1: more of the assets are funded by debt than by the long-term funds' : 'the share of the long-term funds that is debt') },
    { g: 'lev', id: 'er', n: 'Equity ratio', f: 'shareholders\' equity ÷ capital employed (net assets)', need: ['nw', 'ce'], val: k => k.nw / k.ce, u: ':1', why: () => 'the higher it is, the lower the risk for lenders' },
    { g: 'lev', id: 'prop', n: 'Proprietary ratio', f: 'proprietary fund (equity + preference capital) ÷ total assets', need: ['pfund', 'ta'], val: k => k.pfund / k.ta, u: ':1', why: () => 'the share of the total assets financed by the shareholders: the higher, the less risky' },
    { g: 'lev', id: 'gear', n: 'Capital gearing ratio', f: '(preference capital + long-term debt) ÷ equity shareholders\' funds', need: ['pref', 'ltd', 'nw'], val: k => (k.pref + k.ltd) / k.nw, u: ':1', why: x => (x > 1 ? 'highly geared: fixed-cost funds exceed the equity' : 'low gearing: equity exceeds the fixed-cost funds') },
    { g: 'lev', id: 'icr', n: 'Interest coverage ratio', f: 'EBIT ÷ interest', need: ['ebit', 'int'], val: k => k.ebit / k.int, u: 'times', why: x => `EBIT covers the interest ${sg(r2(x))} times: the higher, the safer the lenders` },
    { g: 'lev', id: 'pdc', n: 'Preference dividend coverage', f: 'net profit after tax ÷ preference dividend', need: ['pat', 'pdiv'], val: k => k.pat / k.pdiv, u: 'times', why: () => 'the margin of safety for the preference shareholders' },
    { g: 'act', id: 'it', n: 'Inventory turnover', f: 'cost of goods sold ÷ average stock', need: ['cogs', 'avginv'], val: k => k.cogs / k.avginv, u: 'times', why: (x, yd) => `stock is sold and replaced ${sg(r2(x))} times a year, about every ${sg(r2(yd / x))} days` },
    { g: 'act', id: 'rt', n: 'Receivables turnover', f: 'credit sales ÷ average receivables', need: ['csales', 'avgrec'], val: k => k.csales / k.avgrec, u: 'times', why: () => 'a high turnover means customers pay quickly' },
    { g: 'act', id: 'acp', n: 'Average collection period', f: 'average receivables ÷ credit sales per day', need: ['avgrec', 'csales'], val: (k, yd) => k.avgrec / (k.csales / yd), u: 'days', why: x => `customers take about ${sg(r2(x))} days to pay; compare it with the credit period allowed` },
    { g: 'act', id: 'pt', n: 'Payables turnover', f: 'credit purchases ÷ average creditors', need: ['cpurch', 'avgcred'], named: ['purch', 'cpurch'], val: k => k.cpurch / k.avgcred, u: 'times', why: () => 'a low turnover means suppliers give liberal credit' },
    { g: 'act', id: 'app', n: 'Average payment period', f: 'average creditors ÷ credit purchases per day', need: ['avgcred', 'cpurch'], named: ['purch', 'cpurch'], val: (k, yd) => k.avgcred / (k.cpurch / yd), u: 'days', why: x => `suppliers are paid after about ${sg(r2(x))} days` },
    { g: 'act', id: 'tat', n: 'Total assets turnover', f: 'sales ÷ total assets', need: ['sales', 'ta'], val: k => k.sales / k.ta, u: 'times', why: x => `each rupee of assets generates ₹${sg(r2(x))} of sales` },
    { g: 'act', id: 'fat', n: 'Fixed assets turnover', f: 'sales ÷ fixed assets', need: ['sales', 'fa'], val: k => k.sales / k.fa, u: 'times', why: () => 'how hard the fixed assets are worked' },
    { g: 'act', id: 'ct', n: 'Capital turnover', f: 'sales ÷ capital employed', need: ['sales', 'ce'], val: k => k.sales / k.ce, u: 'times', why: () => 'sales per rupee of long-term funds' },
    { g: 'act', id: 'wct', n: 'Working capital turnover', f: 'sales ÷ working capital', need: ['sales', 'wc'], val: k => k.sales / k.wc, u: 'times', why: x => (x < 0 ? 'negative working capital makes this ratio meaningless' : 'sales per rupee of working capital; very high may mean too little working capital') },
    { g: 'prof', id: 'gpr', n: 'Gross profit ratio', f: 'gross profit ÷ sales × 100', need: ['gp', 'sales'], val: k => k.gp / k.sales * 100, u: '%', why: () => 'what is left of each rupee of sales after the cost of the goods sold' },
    { g: 'prof', id: 'opr', n: 'Operating profit ratio', f: 'EBIT ÷ sales × 100', need: ['ebit', 'sales'], val: k => k.ebit / k.sales * 100, u: '%', why: () => 'the margin after all operating costs, before interest and tax' },
    { g: 'prof', id: 'oer', n: 'Operating expenses ratio', f: 'operating expenses ÷ sales × 100', need: ['opex', 'sales'], val: k => k.opex / k.sales * 100, u: '%', why: () => 'administration, selling and other operating costs per rupee of sales' },
    { g: 'prof', id: 'or', n: 'Operating ratio', f: '(cost of goods sold + operating expenses) ÷ sales × 100', need: ['cogs', 'opex', 'sales'], val: k => (k.cogs + k.opex) / k.sales * 100, u: '%', why: () => 'operating ratio + operating profit ratio = 100%' },
    { g: 'prof', id: 'npr', n: 'Net profit ratio', f: 'net profit after tax ÷ sales × 100', need: ['pat', 'sales'], val: k => k.pat / k.sales * 100, u: '%', why: () => 'the share of revenue that ends as profit' },
    { g: 'prof', id: 'roa', n: 'Return on assets (ROA)', f: 'net profit after tax ÷ total assets × 100', need: ['pat', 'ta'], val: k => k.pat / k.ta * 100, u: '%', why: () => 'the Study Material also uses (net profit + interest) or EBIT(1 − t) over total assets' },
    { g: 'prof', id: 'roce', n: 'ROCE (pre-tax)', f: 'EBIT ÷ capital employed × 100', need: ['ebit', 'ce'], val: k => k.ebit / k.ce * 100, u: '%', why: () => 'should be above the rate at which the firm borrows' },
    { g: 'prof', id: 'roe', n: 'Return on equity (ROE)', f: '(net profit after tax − preference dividend) ÷ equity shareholders\' funds × 100', need: ['pat', 'pdiv', 'nw'], val: k => (k.pat - k.pdiv) / k.nw * 100, u: '%', why: () => 'the return on the owners\' own money' },
    { g: 'mkt', id: 'eps', n: 'Earnings per share (EPS)', f: '(net profit after tax − preference dividend) ÷ number of equity shares', need: ['pat', 'pdiv', 'shares'], val: k => (k.pat - k.pdiv) / k.shares, u: '₹ps', why: () => 'the profit that belongs to each equity share' },
    { g: 'mkt', id: 'dps', n: 'Dividend per share (DPS)', f: 'equity dividend ÷ number of equity shares', need: ['ediv', 'shares'], val: k => k.ediv / k.shares, u: '₹ps', why: () => 'the part of EPS actually paid out' },
    { g: 'mkt', id: 'dpr', n: 'Dividend pay-out ratio', f: 'DPS ÷ EPS × 100', need: ['ediv', 'pat', 'pdiv'], val: k => k.ediv / (k.pat - k.pdiv) * 100, u: '%', why: x => `${sg(r2(100 - x))}% of the earnings are retained` },
    { g: 'mkt', id: 'pe', n: 'Price-earnings (P/E) ratio', f: 'market price per share ÷ EPS', need: ['mps', 'pat', 'pdiv', 'shares'], val: k => k.mps / ((k.pat - k.pdiv) / k.shares), u: 'times', why: () => 'what investors pay for a rupee of earnings' },
    { g: 'mkt', id: 'dy', n: 'Dividend yield', f: 'DPS ÷ market price per share × 100', need: ['ediv', 'shares', 'mps'], val: k => k.ediv / k.shares / k.mps * 100, u: '%', why: () => 'the cash return at today\'s price' },
    { g: 'mkt', id: 'ey', n: 'Earnings yield', f: 'EPS ÷ market price per share × 100', need: ['pat', 'pdiv', 'shares', 'mps'], val: k => (k.pat - k.pdiv) / k.shares / k.mps * 100, u: '%', why: () => 'the inverse of the P/E ratio' },
    { g: 'mkt', id: 'mvbv', n: 'Market value to book value', f: 'market price per share ÷ (equity ÷ number of shares)', need: ['mps', 'nw', 'shares'], val: k => k.mps / (k.nw / k.shares), u: 'times', why: x => (x > 1 ? 'the market values each share above its book value' : 'the market values each share below its book value') }
  ];
  const fmtR = (x, u) => (u === '₹' ? inr(r2(x)) : u === '₹ps' ? (x < 0 ? '−₹' : '₹') + f2(Math.abs(x)) : u === '%' ? sg(r2(x)) + '%' : u === 'days' ? sg(r2(x)) + ' days' : u === ':1' ? sg(r2(x)) + ' : 1' : sg(r2(x)) + ' times');
  function ratiosOf(known, yd, groups, taint, mentioned) {
    return RATIOS.filter(R => !groups || groups.includes(R.g)).map(R => {
      if (!R.need.every(v => v in known && Number.isFinite(known[v]))) return null;
      if (R.named && mentioned && !R.named.some(v => mentioned.has(v))) return null;     // purchases are only worked out by assumption: show these when purchases are given
      const x = R.val(known, yd);
      if (!Number.isFinite(x)) return null;
      return Object.assign({}, R, { x, assumed: taint ? R.need.filter(v => taint.has(v) || (V[v] && V[v].zero && taint.has(v))) : [] });
    }).filter(Boolean);
  }

  /* ================================================================== drawing the statements */
  const nm = id => (V[id] ? V[id].n : id);
  const fmtV = (id, x) => (V[id] && V[id].cnt ? grp(r2(x)) : V[id] && V[id].ps ? (x < 0 ? '−₹' : '₹') + f2(Math.abs(x)) : inr(r2(x)));
  function bsTable(known0, mark, title) {
    const known = Object.assign({}, known0);                  // a local copy: the balancing row is added to it
    const K = v => (v in known ? am(known[v]) : '?'), has = v => v in known, nz = v => has(v) && Math.abs(known[v]) > 1e-9;
    const L = [];
    if (has('esc') || has('rs') || !has('nw')) { L.push(['Equity share capital', 'esc']); L.push(['Reserves and surplus', 'rs']); } else L.push(['Net worth (shareholders\' funds)', 'nw']);
    if (nz('pref')) L.push(['Preference share capital', 'pref']);
    if (!has('ltd') && !has('cl') && has('ol')) L.push(['Outside liabilities', 'ol']); else { L.push(['Long-term debt', 'ltd']); L.push([nz('ocl') || !has('cred') ? 'Current liabilities' : 'Current liabilities (creditors)', 'cl']); }
    const A = [['Fixed assets', 'fa']];
    const caParts = ['inv', 'rec', 'cash'], kn = caParts.filter(has);
    if (kn.length === 3 || !has('ca')) { A.push(['Stock (inventory)', 'inv'], ['Receivables', 'rec'], ['Cash and bank', 'cash']); if (nz('oca')) A.push(['Other current assets', 'oca']); }
    else if (!kn.length) A.push(['Current assets', 'ca']);
    else {                                                     // ICAI's 'other current assets (balancing figure)'
      kn.forEach(v => A.push([{ inv: 'Stock (inventory)', rec: 'Receivables', cash: 'Cash and bank' }[v], v]));
      known.__bal = known.ca - kn.reduce((t, v) => t + known[v], 0) - (known.oca || 0);
      A.push([`${caParts.filter(v => !has(v)).map(v => ({ inv: 'stock', rec: 'receivables', cash: 'cash' }[v])).join(' and ').replace(/^./, c => c.toUpperCase())} (balancing figure)`, '__bal']);
    }
    const n = Math.max(L.length, A.length), rows = [], cells = {};
    for (let i = 0; i < n; i++) {
      const l = L[i], a = A[i];
      rows.push([l ? l[0] : '', l ? K(l[1]) : '', a ? a[0] : '', a ? K(a[1]) : '']);
      if (l && (mark || []).includes(l[1])) { cells[i + ',0'] = 'd'; cells[i + ',1'] = 'd'; }
      if (a && (mark || []).includes(a[1])) { cells[i + ',2'] = 'd'; cells[i + ',3'] = 'd'; }
    }
    rows.push(['**Total**', has('tl') ? `**${am(known.tl)}**` : '?', '**Total**', has('ta') ? `**${am(known.ta)}**` : '?']);
    for (let c = 0; c < 4; c++) cells[n + ',' + c] = (mark || []).some(v => v === 'ta' || v === 'tl') && c % 2 ? 'd' : 'hl';
    return { type: 'table', title: title || 'Balance sheet', head: ['Liabilities', '₹', 'Assets', '₹'], rows, cells, align: ['left', 'right', 'left', 'right'] };
  }
  const PL = [['sales', 'Sales'], ['cogs', 'Less: Cost of goods sold'], ['gp', 'Gross profit'], ['opex', 'Less: Operating expenses'], ['ebit', 'EBIT'], ['int', 'Less: Interest'], ['pbt', 'Profit before tax'], ['tax', 'Less: Tax'], ['pat', 'Net profit after tax']];
  function plTable(known, mark) {
    const rows = PL.map(([v, l]) => [/^(gp|ebit|pbt|pat)$/.test(v) ? `**${l}**` : l, v in known ? am(known[v]) : '?']);
    const cells = {}; PL.forEach(([v], i) => { if ((mark || []).includes(v)) cells[i + ',1'] = 'd'; else if (/^(gp|ebit|pbt|pat)$/.test(v)) cells[i + ',1'] = 'hl'; });
    return { type: 'table', title: 'Income statement', head: ['Particulars', '₹'], rows, cells, align: ['left', 'right'] };
  }
  const plUsed = S => PL.some(([v]) => S.mentioned.has(v) || (v in S.known && !['int', 'tax'].includes(v) && S.known[v] !== 0));
  /** the givens; withRead adds the lab's reading of each line (the first frame of 'Build'); the test state shows only the lines as typed */
  function givenTable(given, withRead) {
    return withRead ? { type: 'table', title: 'Given', head: ['Given', 'Read as'], rows: given.map(l => [(l.label ? `${l.label}: ` : '') + l.text, eqText(l.eq)]), align: ['left', 'left'] }
      : { type: 'table', title: 'Given', head: ['Given'], rows: given.map(l => [(l.label ? `${l.label}: ` : '') + l.text]), align: ['left'] };
  }
  function eqText(eq) {
    const parts = Object.entries(eq.k).map(([v, c], i) => { const a = Math.abs(c), s = c < 0 ? '−' : '+'; return `${i ? ` ${s} ` : c < 0 ? '−' : ''}${Math.abs(a - 1) < 1e-12 ? '' : sg(+a.toPrecision(6)) + ' × '}${nm(v)}`; });
    return parts.join('') + ' = ' + sg(+(-eq.c).toPrecision(10));
  }
  function stepCaption(st, known) {
    const val = st.vars.map(v => `**${nm(v)} = ${fmtV(v, known[v])}**`).join(', ');
    if (st.how === 'together') {
      const what = st.eqs.map(e => (e.id ? e.label : e.label || e.text)).join('; ');
      return `No single line has just one unknown left, so these are solved together: ${what}. That gives ${val}.`;
    }
    const e = st.eqs[0], v = st.vars[0];
    const others = Object.keys(e.eq.k).filter(w => w !== v);
    const withKnown = others.length ? ` with ${others.slice(0, 3).map(w => `${nm(w)} ${fmtV(w, known[w])}`).join(', ')}${others.length > 3 ? ' …' : ''}` : '';
    if (e.nil) return `${e.label.charAt(0).toUpperCase() + e.label.slice(1)}.`;
    if (e.id) return `Since ${e.label}${withKnown}: ${val}.`;
    return `From **${e.label || 'line ' + e.line}** (${e.text})${withKnown}: ${val}.`;
  }

  /* ================================================================== compute */
  let lastMode = 'dash';
  const yearOf = v => (+v.ydays === 365 ? 365 : 360);
  function base(v) {
    const yd = yearOf(v), given = parseLines(v.given, yd), S = solve(given);
    return { yd, given, S };
  }
  function computeDash(v) {
    const { yd, given, S } = base(v);
    const groups = v.group && v.group !== 'all' ? [v.group] : null;
    const R = ratiosOf(S.known, yd, groups, S.taint, S.mentioned);
    if (!R.length) throw new Error('No ratio can be worked out from these lines yet: give the balance-sheet and P&L items, or the ratios that fix them.');
    const derived = S.steps.filter(st => st.eqs.some(e => !e.nil)).length;
    const views0 = [bsTable(S.known)].concat(plUsed(S) ? [plTable(S.known)] : []);
    const frames = [{ caption: derived ? `The statements, completed from the ${given.length} given lines (${derived} items worked out on the way: switch to Build from ratios to watch how).` : 'The statements as given.', view: views0 }];
    const rowsUpTo = (k, withF) => {
      const rows = [], cells = {};
      let gPrev = null;
      R.slice(0, k).forEach((r, i) => {
        if (r.g !== gPrev && !groups) { rows.push([`**${GROUPS.find(x => x[0] === r.g)[1]}**`, '', '']); gPrev = r.g; }
        rows.push([r.n, withF ? r.f : '', fmtR(r.x, r.u)]);
        if (i === k - 1) cells[(rows.length - 1) + ',2'] = 'd';
      });
      return { type: 'table', title: groups ? GROUPS.find(x => x[0] === groups[0])[1] + ' ratios' : 'Ratio dashboard', head: ['Ratio', 'Formula', 'Value'], rows, cells, align: ['left', 'left', 'right'] };
    };
    R.forEach((r, i) => {
      const num = r.need.map(w => `${nm(w)} ${fmtV(w, S.known[w])}`).join(', ');
      const nil = r.assumed.length ? ` (This rests on ${r.assumed.map(nm).join(' and ')}, worked out with interest, tax or another item taken as nil because it was not given.)` : '';
      frames.push({ caption: `**${r.n} = ${r.f} = ${fmtR(r.x, r.u)}** (${num}): ${r.why(r.x, yd)}.${nil}`, view: [rowsUpTo(i + 1, true)] });
    });
    const missing = RATIOS.filter(r => (!groups || groups.includes(r.g)) && !R.some(x => x.id === r.id)).map(r => r.n);
    if (missing.length) frames[frames.length - 1].caption += ` Not shown (their items are not given): ${missing.slice(0, 6).join(', ')}${missing.length > 6 ? ' …' : ''}.`;
    const pick = ['cr', 'qr', 'de', 'it', 'acp', 'gpr', 'npr', 'roe', 'eps', 'tat', 'icr'];
    const stats = R.filter(r => pick.includes(r.id)).slice(0, 5).map(r => ({ label: r.n, value: fmtR(r.x, r.u), hint: r.f }));
    if (stats.length < 3) R.slice(0, 3 - stats.length).forEach(r => stats.push({ label: r.n, value: fmtR(r.x, r.u), hint: r.f }));
    return {
      frames, stats, table: { head: ['Ratio', 'Formula', 'Value', 'Reading'], rows: R.map(r => [r.n, r.f, fmtR(r.x, r.u), r.why(r.x, yd)]) },
      note: conv(yd) + conflictNote(S),
      sim: { mode: 'dash', S, R, yd, given }
    };
  }
  function conv(yd) {
    return `**Conventions.** Formulas as in the Study Material's summary of ratios. Averages use (opening + closing) ÷ 2 when an opening balance is given, else the closing figure. Inventory turnover is on cost of goods sold and a period is in days of a ${yd}-day year (a "months" figure is converted). Debt is long-term debt; net worth (equity) is equity share capital plus reserves; capital employed is net worth plus preference capital plus long-term debt. Items not given are left out, except interest, tax, preference capital and dividend, other current assets and other current liabilities, which are taken as nil.`;
  }
  const conflictNote = S => (S.conflicts.length ? ` **Check the data.** The given lines contradict each other; the check that fails: ${S.conflicts.map(e => (e.id ? e.label : e.label || e.text)).join('; ')}.` : '');
  function computeDupont(v) {
    const { yd, given, S } = base(v), k = S.known;
    ['pat', 'sales', 'ta', 'nw'].forEach(x => { if (!(x in k)) throw new Error(`DuPont needs ${nm(x)}: give it, or the ratios that fix it.`); });
    if (!(k.sales > 0) || !(k.ta > 0) || !(k.nw > 0)) throw new Error('DuPont needs positive sales, total assets and net worth.');
    const ni = k.pat - (k.pdiv || 0), npm = ni / k.sales, at = k.sales / k.ta, em = k.ta / k.nw, roe = npm * at * em;
    const P = x => sg(r2(x * 100)) + '%', T = x => sg(+x.toFixed(4), 4);
    const leaf = (l, x) => ({ label: `${l}\n${inr(r2(x))}`, color: 'mute' });
    const node = (lab, val, f, kids, col) => ({ label: `${lab}\n${val}`, color: col, children: kids });   // formulas live in the captions: a note under a node would sit on its edges
    const tree = n => ({ type: 'tree', title: 'ROE = net profit margin × asset turnover × equity multiplier', root: node('ROE', n >= 5 ? P(roe) : '?', 'NPM × AT × EM', [
      n >= 1 ? node('Net profit margin', P(npm), 'net profit ÷ sales', n >= 4 ? [leaf(k.pdiv ? 'net profit for equity' : 'net profit', ni), leaf('sales', k.sales)] : undefined, 'a') : null,
      n >= 2 ? node('Asset turnover', T(at), 'sales ÷ total assets', n >= 4 ? [leaf('sales', k.sales), leaf('total assets', k.ta)] : undefined, 'b') : null,
      n >= 3 ? node('Equity multiplier', T(em), 'total assets ÷ equity', n >= 4 ? [leaf('total assets', k.ta), leaf('equity', k.nw)] : undefined, 'c') : null].filter(Boolean).map(x => (x.children === undefined ? (delete x.children, x) : x)), 'd') });
    const frames = [
      { caption: 'The DuPont model splits return on equity into three drivers, so you can see where it comes from: margin, the use of assets, and borrowing.', view: [tree(0)] },
      { caption: `**Net profit margin = ${k.pdiv ? 'net profit for equity' : 'net profit'} ÷ sales = ${inr(r2(ni))} ÷ ${inr(r2(k.sales))} = ${P(npm)}**: how much of each rupee of sales is profit.`, view: [tree(1)] },
      { caption: `**Asset turnover = sales ÷ total assets = ${T(at)}**: how many rupees of sales each rupee of assets produces.`, view: [tree(2)] },
      { caption: `**Equity multiplier = total assets ÷ equity = ${T(em)}**: assets per rupee of owners' money. Above 1, debt is doing part of the work: it is the financial-leverage part of ROE.`, view: [tree(3)] },
      { caption: 'Each driver is a ratio of two figures from the statements.', view: [tree(4)] },
      { caption: `**ROE = ${P(npm)} × ${T(at)} × ${T(em)} = ${P(roe)}**, the same as ${k.pdiv ? 'net profit for equity' : 'net profit'} ÷ equity directly. Without the debt (equity multiplier 1) the return would be the ROA, ${P(npm * at)}: the other ${sg(r2((roe - npm * at) * 100))} percentage points come from borrowing.`, view: [tree(5)] }
    ];
    return {
      frames, stats: [{ label: 'Return on equity', value: P(roe), hint: 'NPM × asset turnover × equity multiplier' }, { label: 'Net profit margin', value: P(npm), hint: 'net profit ÷ sales' }, { label: 'Asset turnover', value: T(at), hint: 'sales ÷ total assets' }, { label: 'Equity multiplier', value: T(em), hint: 'total assets ÷ shareholders\' equity' }],
      table: { head: ['Driver', 'Formula', 'Value'], rows: [['Net profit margin', 'net profit ÷ sales', P(npm)], ['Asset turnover', 'sales ÷ total assets', T(at)], ['Equity multiplier', 'total assets ÷ equity', T(em)], ['Return on equity', 'product of the three', P(roe)], ['Return on assets', 'margin × turnover', P(npm * at)]] },
      note: '**Conventions.** DuPont as in the Study Material: ROE = net profit margin × asset turnover × equity multiplier, with assets = total assets and equity = shareholders\' equity (net worth); net profit is after tax and preference dividend.' + conflictNote(S),
      sim: { mode: 'dupont', S, npm, at, em, roe, yd, given }
    };
  }
  function computeBuild(v) {
    const { yd, given, S } = base(v), k = S.known;
    const showPL = plUsed(S);
    const views = (kn, mark) => [bsTable(kn, mark)].concat(showPL ? [plTable(kn, mark)] : []);
    const frames = [{ caption: `${given.length} lines are given. Each step below uses one of them, or one of the accounting identities (the balance sheet balances, current assets = stock + receivables + cash …), to fix one more figure.`, view: [givenTable(given, true)] }];
    const partial = {};
    const shown = S.steps.filter(st => !(st.eqs.length === 1 && st.eqs[0].nil && Math.abs(k[st.vars[0]]) < 1e-12));
    S.steps.forEach(st => {
      st.vars.forEach(x => (partial[x] = k[x]));
      if (!shown.includes(st)) return;
      if (st.vars.every(x => ['avginv', 'avgrec', 'avgcred', 'csales', 'cpurch', 'pfund', 'qa', 'wc', 'ce', 'ol', 'purch'].includes(x)) && st.eqs.every(e => e.id)) { frames.length && (frames[frames.length - 1].caption += ' ' + stepCaption(st, k)); return; }
      frames.push({ caption: stepCaption(st, k), view: views(Object.assign({}, partial), st.vars) });
    });
    const bsv = bsTable(Object.assign({}, k));
    const open = bsv.rows.filter(rw => rw[1] === '?' || rw[3] === '?').flatMap(rw => [rw[1] === '?' ? rw[0] : null, rw[3] === '?' ? rw[2] : null]).filter(Boolean).map(x => x.replace(/\*\*/g, '').toLowerCase());
    let fin;
    if ('ta' in k && 'tl' in k && Math.abs(k.ta - k.tl) < 1e-6 * Math.max(1, k.ta) && !open.length) fin = `**Balance check:** total liabilities ${inr(r2(k.tl))} = total assets ${inr(r2(k.ta))}. The balance sheet is complete.`;
    else fin = open.length ? `Not fixed by the data: ${open.join(', ')}. Add a line for each (an amount or a ratio that involves it).` : 'Done.';
    if (S.conflicts.length) fin += ` **Check the data:** the given lines contradict each other (the check that fails: ${S.conflicts.map(e => (e.id ? e.label : e.label || e.text)).join('; ')}). One of the ratios does not fit the others.`;
    frames.push({ caption: fin, view: views(k) });
    const stats = [['ta', 'Balance sheet total'], ['ca', 'Current assets'], ['fa', 'Fixed assets'], ['sales', 'Sales'], ['inv', 'Stock'], ['rec', 'Receivables'], ['cash', 'Cash and bank']]
      .filter(([x]) => x in k).slice(0, 5).map(([x, l]) => ({ label: l, value: inr(r2(k[x])), hint: 'worked out from the given lines' }));
    if (stats.length < 3) Object.keys(k).filter(x => !['int', 'tax', 'pref', 'pdiv', 'oca', 'ocl'].includes(x)).slice(0, 3 - stats.length).forEach(x => stats.push({ label: nm(x), value: fmtV(x, k[x]) }));
    return {
      frames, stats,
      table: { head: ['Item', 'Amount (₹)', 'How it was found'], rows: S.steps.filter(st => shown.includes(st)).flatMap(st => st.vars.map(x => [nm(x), am(k[x]), st.how === 'together' ? 'solved together' : st.eqs[0].id ? st.eqs[0].label : st.eqs[0].label || st.eqs[0].text])) },
      note: conv(yd) + conflictNote(S),
      sim: { mode: 'build', S, yd, given, blank: givenTable(given) }
    };
  }
  function compute(v) {
    const m = v.mode === 'dupont' ? 'dupont' : v.mode === 'build' ? 'build' : 'dash';
    lastMode = m;
    return m === 'dupont' ? computeDupont(v) : m === 'build' ? computeBuild(v) : computeDash(v);
  }

  /* ================================================================== presets */
  const L = a => a.join('\n');
  const TAPRI = L(['sales = 4,80,00,000', 'cost of goods sold = 3,36,00,000', 'operating expenses = 72,00,000', 'interest = 12,00,000', 'tax = 15,00,000', 'equity dividend = 18,00,000',
    'number of equity shares = 30,00,000', 'market price per share = 30', 'equity share capital = 3,00,00,000', 'reserves and surplus = 1,20,00,000', 'debentures = 1,20,00,000',
    'creditors = 48,00,000', 'other current liabilities = 12,00,000', 'fixed assets = 4,20,00,000', 'stock = 72,00,000', 'opening stock = 64,00,000', 'receivables = 60,00,000', 'cash = 48,00,000']);
  const presets = [
    { label: 'Tapri Tea Co.: Dev\'s year-end dashboard', values: { mode: 'dash', group: 'all', ydays: 360, given: TAPRI } },
    { label: 'Study Material Illustration 1: HPCL Ltd, 2022-23 (365 days)', values: { mode: 'dash', group: 'all', ydays: 365, given: L(['sales = 3,74,000', 'credit sales = 3,42,000', 'cost of goods sold = 2,98,000', 'operating expenses = 57,000',
      'fixed assets = 40,000', 'receivables = 82,000', 'opening receivables = 50,000', 'cash = 7,000', 'stock = 94,000', 'opening stock = 60,000', 'creditors = 76,000', 'share capital = 75,000', 'reserves = 42,000', 'debentures = 30,000']) } },
    { label: 'Study Material Illustration 5: ABC Company, 2022-23 (365 days)', values: { mode: 'dash', group: 'all', ydays: 365, given: L(['sales = 38,00,000', 'cost of goods sold = 33,00,000', 'net profit = 1,00,000', 'cash = 5,000', 'receivables = 2,90,000', 'opening receivables = 2,60,000',
      'stock = 6,00,000', 'opening stock = 4,80,000', 'fixed assets = 8,00,000', 'creditors = 3,80,000', 'other current liabilities = 2,25,000 + 1,40,000', 'long term debt = 3,00,000', 'share capital = 1,00,000', 'retained earnings = 5,50,000']) } },
    { label: 'MTP Sep 2025 (Series I), Q1(b): Gagan Pvt. Ltd\'s quick ratio, fixed assets turnover, proprietary ratio and EPS', values: { mode: 'dash', group: 'all', ydays: 360, given: L(['current ratio = 2.5 : 1', 'debt equity ratio = 1 : 2', 'return on total assets = 15%', 'total assets turnover = 2',
      'gross profit ratio = 25%', 'stock turnover = 5', 'working capital = 15,00,000', 'fixed assets = 30,00,000', 'number of equity shares = 1,80,000', 'preference share capital = 6,00,000', 'preference dividend = 10% of preference share capital', 'opening stock = 16,00,000']) } },
    { label: 'Study Material Example 1 (ch. 3): XYZ Company\'s ROE by DuPont', values: { mode: 'dupont', group: 'all', ydays: 360, given: L(['sales = 29,261', 'net profit = 4,212', 'total assets = 27,987', 'net worth = 13,572']) } },
    { label: 'Tapri Tea Co.: where does Dev\'s ROE come from?', values: { mode: 'dupont', group: 'all', ydays: 360, given: TAPRI } },
    { label: 'PYQ Jan 2025, MCQs 6–7: VP Ltd\'s inventory, receivables, current assets and liabilities', values: { mode: 'build', group: 'all', ydays: 360, given: L(['sales = 150 lakh', 'credit sales = 80% of sales', 'current ratio = 1.5 : 1', 'quick ratio = 1 : 1',
      'inventory turnover = 6', 'collection period = 2 months', 'gross profit ratio = 20%']) } },
    { label: 'PYQ Sep 2024, Q1(c): complete MNP Ltd\'s balance sheet', values: { mode: 'build', group: 'all', ydays: 360, given: L(['equity share capital = 6,00,000', 'reserves and surplus = 3,00,000', 'creditors = 3,00,000',
      'inventory turnover = 7.5', 'total assets turnover = 2.5', 'long term debt / shareholders funds = 0.6', 'collection period = 30 days', 'gross profit ratio = 25%', 'current ratio = 2.9']) } },
    { label: 'Study Material Illustration 2: Alpha Ltd\'s projected balance sheet', values: { mode: 'build', group: 'all', ydays: 360, given: L(['share capital = 1,00,000', 'share capital = 50% of total liabilities', 'reserves = 15% of total liabilities', 'debentures = 10% of total liabilities',
      'current liabilities = 25% of total liabilities', 'fixed assets = 60% of total assets', 'working capital ratio = 8 : 5', 'quick ratio = 1 : 1', 'receivables = 4/5 of quick assets', 'collection period = 2 months',
      'return on net worth = 10%', 'gross profit ratio = 15%', 'interest = 5% of debentures']) } },
    { label: 'Study Material Illustration 4: Aebece Company from seven ratios', values: { mode: 'build', group: 'all', ydays: 360, given: L(['fixed assets = 40,00,000', 'closing stock = 4,00,000', 'stock turnover = 10', 'average stock = (opening stock + closing stock) / 2', 'gross profit ratio = 25%', 'net profit ratio = 20%', 'net profit / capital = 1/5',
      'capital / outside liabilities = 1/2', 'fixed assets / capital = 5/4', 'fixed assets / current assets = 5/7']) } },
    { label: 'Tapri Tea Co.: Kesar lost the balance sheet, Dev kept the ratios', values: { mode: 'build', group: 'all', ydays: 360, given: L(['share capital = 3,00,00,000', 'net worth = 4,20,00,000', 'debt equity ratio = 2 : 7', 'current ratio = 3 : 1', 'quick ratio = 1.8 : 1',
      'total assets turnover = 0.8', 'fixed assets turnover = 8/7', 'gross profit ratio = 30%', 'collection period = 45 days']) } }
  ];

  /* ================================================================== the challenge */
  const pk = (r, a) => a[Math.floor(r() * a.length)];
  const rs = x => grp(Math.round(x));
  /** a random business with round figures, written as lines (dashboard and DuPont) */
  function genStatements(r) {
    for (let t = 0; t < 50; t++) {
      const S = pk(r, [60, 80, 100, 120, 150, 200, 240, 300]) * 1e5, gpp = pk(r, [0.2, 0.25, 0.3, 0.4]), cogs = S * (1 - gpp), opex = S * pk(r, [0.05, 0.08, 0.1, 0.12]);
      const ltd = pk(r, [0, 10, 20, 25, 40]) * 1e5, rate = pk(r, [0.1, 0.12]), int = ltd * rate, ebit = S * gpp - opex, pbt = ebit - int, tax = Math.max(0, pbt * pk(r, [0.25, 0.3]));
      const fa = S * pk(r, [0.4, 0.5, 0.6]), inv = cogs / pk(r, [4, 5, 6, 8]), rec = S * pk(r, [30, 36, 45, 60]) / 360, cash = pk(r, [2, 3, 5]) * 1e5;
      const cred = cogs * pk(r, [30, 45, 60]) / 360, ta = fa + inv + rec + cash, esc = pk(r, [10, 20, 25, 40]) * 1e5, rsv = ta - cred - ltd - esc;
      if (!(pbt > 0) || !(rsv > 0)) continue;
      const shares = esc / 10, mps = pk(r, [40, 50, 60, 80, 100]);
      const lines = [`sales = ${rs(S)}`, `cost of goods sold = ${rs(cogs)}`, `operating expenses = ${rs(opex)}`, `interest = ${rs(int)}`, `tax = ${rs(tax)}`, `number of equity shares = ${rs(shares)}`, `market price per share = ${mps}`,
        `equity share capital = ${rs(esc)}`, `reserves and surplus = ${rs(rsv)}`, `long term debt = ${rs(ltd)}`, `creditors = ${rs(cred)}`, `fixed assets = ${rs(fa)}`, `stock = ${rs(inv)}`, `receivables = ${rs(rec)}`, `cash = ${rs(cash)}`];
      return lines.join('\n');
    }
    return TAPRI;
  }
  /** a 'build from ratios' problem from a hidden balance sheet with round figures (MNP-style or VP-style) */
  function genBuild(r) {
    for (let t = 0; t < 80; t++) {
      if (r() < 0.5) {                                      // MNP-style: capital given, the rest from ratios
        const esc = pk(r, [5, 6, 8, 10, 12]) * 1e5, rsv = pk(r, [2, 3, 4, 5]) * 1e5, nw = esc + rsv, de = pk(r, [0.4, 0.5, 0.6, 0.8]), cred = pk(r, [2, 3, 4]) * 1e5;
        const ltd = nw * de, ta = nw + ltd + cred, ato = pk(r, [2, 2.5, 3]), S = ta * ato, gpp = pk(r, [20, 25]), cogs = S * (1 - gpp / 100), itr = pk(r, [5, 6, 7.5, 8, 10]);
        const inv = cogs / itr, days = pk(r, [30, 36, 45]), rec = S * days / 360, need = (inv + rec) / cred, cr = Math.ceil(need * 10 + pk(r, [1, 2, 3])) / 10;
        const ca = cr * cred, fa = ta - ca;
        if (!(fa > 0.2 * ta)) continue;
        return { given: [`equity share capital = ${rs(esc)}`, `reserves and surplus = ${rs(rsv)}`, `creditors = ${rs(cred)}`, `long term debt / shareholders funds = ${de}`, `total assets turnover = ${ato}`, `gross profit ratio = ${gpp}%`,
          `inventory turnover = ${itr}`, `collection period = ${days} days`, `current ratio = ${cr}`].join('\n'), askB: pk(r, ['ltd', 'fa', 'inv', 'rec', 'cash', 'sales']) };
      }
      const S = pk(r, [60, 90, 120, 150, 180, 240]) * 1e5, cp = pk(r, [100, 80, 75]), gpp = pk(r, [20, 25, 30]), itr = pk(r, [4, 5, 6, 8]), mo = pk(r, [1, 1.5, 2]);
      const inv = S * (1 - gpp / 100) / itr, rec = S * cp / 100 * mo / 12, qr = pk(r, [1, 1.2, 1.5]), cr = qr + pk(r, [0.5, 0.75, 1]);
      const cl = inv / (cr - qr), ca = cr * cl;
      if (!(ca - inv - rec >= 0)) continue;
      return { given: [`sales = ${rs(S)}`].concat(cp === 100 ? [] : [`credit sales = ${cp}% of sales`]).concat([`current ratio = ${cr} : 1`, `quick ratio = ${qr} : 1`, `inventory turnover = ${itr}`, `collection period = ${mo} months`, `gross profit ratio = ${gpp}%`]).join('\n'),
        askB: pk(r, ['inv', 'rec', 'ca', 'cl', 'cash']) };
    }
    return { given: presets[6].values.given, askB: 'ca' };
  }
  function gen(r) {
    const out = { ydays: 360, group: 'all' };
    if (lastMode === 'build') return Object.assign(out, genBuild(r));
    out.given = genStatements(r);
    out.askD = pk(r, ['cr', 'qr', 'de', 'it', 'acp', 'gpr', 'npr', 'roe', 'eps', 'tat', 'icr', 'roce']);
    out.askP = pk(r, ['roe', 'em', 'at', 'npm']);
    return out;
  }
  const BUILD_ASK = { ltd: 'long-term debt', fa: 'fixed assets', inv: 'stock (inventory)', rec: 'receivables', cash: 'cash and bank', sales: 'sales', ca: 'current assets', cl: 'current liabilities' };
  function solveCh(res, v) {
    const s = res.sim;
    if (s.mode === 'build') { const x = s.S.known[v.askB || 'ca']; return Number.isFinite(x) ? x / 1e5 : null; }
    if (s.mode === 'dupont') { const a = v.askP || 'roe'; return a === 'em' ? s.em : a === 'at' ? s.at : a === 'npm' ? s.npm * 100 : s.roe * 100; }
    const R = s.R.find(x => x.id === (v.askD || 'cr'));
    return R ? R.x : null;
  }
  function promptCh(v, res) {
    const s = res && res.sim, lines = String(v.given).split('\n').filter(Boolean).join('; ');
    if (s && s.mode === 'build') return `Given: ${lines}. 360-day year. Work out the **${BUILD_ASK[v.askB || 'ca']}**, in ₹ lakh to two decimals.`;
    if (s && s.mode === 'dupont') { const a = v.askP || 'roe'; return `From these figures: ${lines}. What is the **${{ roe: 'return on equity (%)', em: 'equity multiplier', at: 'total assets turnover', npm: 'net profit margin (%)' }[a]}** in the DuPont model? Two decimals.`; }
    const R = RATIOS.find(x => x.id === (v.askD || 'cr'));
    return `From these figures: ${lines}. 360-day year; averages are closing figures. What is the **${R.n.toLowerCase()}**${R.u === '%' ? ' (in %)' : R.u === 'days' ? ' (in days)' : R.u === '₹ps' ? ' (₹)' : ''}? Two decimals.`;
  }
  function explainCh(res, v) {
    const s = res.sim, k = s.S.known;
    if (s.mode === 'build') { const x = v.askB || 'ca', st = s.S.steps.find(q => q.vars.includes(x)); return `${st ? stepCaption(st, k) : ''} So ${nm(x)} = ${inr(r2(k[x]))} = **${sg(r2(k[x] / 1e5))} lakh**.`; }
    if (s.mode === 'dupont') return `Net profit margin ${sg(r2(s.npm * 100))}% × asset turnover ${sg(+s.at.toFixed(4))} × equity multiplier ${sg(+s.em.toFixed(4))} = ROE **${sg(r2(s.roe * 100))}%**.`;
    const R = s.R.find(x => x.id === (v.askD || 'cr'));
    return `${R.n} = ${R.f}: ${R.need.map(w => `${nm(w)} ${fmtV(w, k[w])}`).join(', ')} → **${fmtR(R.x, R.u)}**.`;
  }

  /* ================================================================== the definition */
  const HELP = 'One fact per line, as an equation in words: "sales = 150 lakh", "credit sales = 80% of sales", "current ratio = 1.5 : 1", "stock turnover = 6" (on cost of goods sold), "collection period = 2 months", "fixed assets / current assets = 5/7". Items: sales, credit sales, cost of goods sold, gross profit, operating expenses, EBIT, interest, tax, net profit, preference dividend, equity dividend, number of equity shares, market price per share, equity share capital, reserves and surplus, net worth (capital), preference share capital, long-term debt (debentures), outside liabilities, current liabilities, creditors, fixed assets, stock, opening stock, receivables, cash, current assets, quick assets, total assets, working capital, capital employed. Ratio names (current ratio, quick ratio, debt equity ratio, proprietary ratio, gross profit ratio, total assets turnover, return on net worth, EPS …) may stand on the left. A label before a colon is kept for the captions.';
  const def = {
    id: 'ratios', title: 'Ratio Analysis Lab',
    blurb: 'Build a balance sheet from ICAI-style ratios step by step, read a ratio dashboard, and split ROE the DuPont way.',
    controls: [
      { id: 'mode', type: 'select', label: 'What to explore', value: 'dash', options: [['dash', 'Ratio dashboard'], ['dupont', 'DuPont analysis of ROE'], ['build', 'Build from ratios']] },
      { id: 'group', type: 'select', label: 'Ratios to show', value: 'all', options: [['all', 'All groups']].concat(GROUPS), show: v => (v.mode || 'dash') === 'dash' },
      { id: 'ydays', type: 'seg', label: 'Days in a year', value: 360, options: [[360, '360'], [365, '365']] },
      { id: 'given', type: 'textarea', label: 'Given figures and ratios (one per line)', short: 'Given', rows: 10, value: TAPRI, help: HELP, placeholder: 'sales = 150 lakh\ncurrent ratio = 1.5 : 1' }
    ],
    presets, compute,
    challenge: {
      title: 'Work out the ratio or the missing figure',
      gen, solve: solveCh, prompt: promptCh, explain: explainCh, tol: 0.011, unit: '', kind: 'num',
      signed: (v, res) => { const w = solveCh(res, v); return typeof w === 'number' && w < 0; },
      view: (res) => (res && res.sim ? [res.sim.mode === 'build' ? res.sim.blank : givenTable(res.sim.given)] : null)
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { parseLine, parseLines, solve, ratiosOf, RATIOS, compute, def, presets };
  g.__lab_def_ratios = def;
})(typeof window !== 'undefined' ? window : globalThis);
