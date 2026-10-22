/* PassBook — Overhead Distribution Lab (Paper 4, cma.oh): primary distribution (overhead items allocated or apportioned on bases, the
   table filling cell by cell), secondary distribution of the service departments by the direct, step, repeated distribution, simultaneous
   equations and trial-and-error methods (ICAI Study Material ch. 4, §4.4), then absorption rates (machine hour / labour hour) and the
   overhead a job absorbs.
   Pure part: parse*, primary(), secondary(), absorb(), split(); compute(values) -> {frames, stats, table, note}. Node: require() it.
   Rounding follows ICAI's worked answers: every apportioned amount is a whole rupee and a row's rounding difference goes to the share with
   the largest fraction, so each row adds up exactly (the 'round' toggle switches to exact arithmetic). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const EPS = 1e-9;

  /* ------------------------------------------------------------------ numbers in, numbers out */
  const fmt = (x, dp) => {
    if (x == null || !isFinite(x)) return '—';
    const d = dp == null ? 0 : dp, r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
    const s = Math.abs(r).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
    return (r < 0 ? '−' : '') + s;
  };
  const inr = (x, dp) => (x < 0 ? '−₹' + fmt(-x, dp) : '₹' + fmt(x, dp));
  const pct = x => { const r = Math.round(x * 10000) / 100; return (Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/0$/, '')) + '%'; };
  const dec = x => String(Math.round(x * 1e6) / 1e6);                 // an equation coefficient: 0.05, 0.2, 0.142857
  const INDIAN = /^\d{1,2}(,\d{2})*,\d{3}(\.\d+)?$/, WESTERN = /^\d{1,3}(,\d{3})+(\.\d+)?$/;
  /** one typed amount: '12,50,000', '₹ 4,75,000', '1500.5', '-' (= 0). NaN when it is not a number */
  function num(x) {
    if (typeof x === 'number') return x;
    let s = String(x == null ? '' : x).trim().replace(/₹|rs\.?|inr/gi, '').replace(/%$/, '').trim();
    if (s === '') return NaN;
    if (/^[-–—]$|^nil$/i.test(s)) return 0;
    s = s.replace(/\s+/g, '');
    if (s.indexOf(',') >= 0) { if (INDIAN.test(s) || WESTERN.test(s)) s = s.replace(/,/g, ''); else return NaN; }
    return /^[-−]?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s.replace('−', '-')) : NaN;
  }
  /** a list of numbers, one per department: '2,000 800 400 1,600', '5:3:2', '45% 15% 30% - 10%', '20,30,40' (commas between
      numbers are separators unless they are digit grouping) → [numbers], or null if a token is not a number */
  function numList(x) {
    if (Array.isArray(x)) return x.map(num);
    const toks = String(x == null ? '' : x).replace(/₹/g, ' ').trim().split(/[\s;|:\/]+/).filter(Boolean);
    const out = [];
    for (const t0 of toks) {
      const t = t0.replace(/%$/, '');
      if (/^[-–—]$|^nil$/i.test(t)) { out.push(0); continue; }
      if (t.indexOf(',') >= 0 && !INDIAN.test(t) && !WESTERN.test(t)) {
        for (const p of t.split(',').filter(Boolean)) { const n = num(p); if (isNaN(n)) return null; out.push(n); }
        continue;
      }
      const n = num(t);
      if (isNaN(n)) return null;
      out.push(n);
    }
    return out;
  }
  const looksNumeric = s => /^[\s\d,.:;%₹|\/–—-]*$/.test(String(s == null ? '' : s)) && /\d/.test(String(s));

  /* ------------------------------------------------------------------ rounding: ICAI's whole rupees, each row adding up */
  const roundU = (x, unit) => (unit ? Math.round(x / unit + EPS) * unit : x);
  /** `amount` shared in proportion to `w` (weights ≥ 0). unit 0 = exact; unit 1 = whole rupees by the largest-remainder rule: everyone gets
      the rupees below their exact share, and the rupees left over go to the largest fractions (ties: the earlier department) */
  function split(amount, w, unit) {
    const W = w.reduce((a, b) => a + b, 0);
    if (!(W > 0)) throw new Error('Nothing to share in.');
    if (!unit) return w.map(x => (amount * x) / W);
    const A = Math.round(amount / unit), neg = A < 0, a = Math.abs(A);
    const raw = w.map(x => (a * x) / W), fl = raw.map(x => Math.floor(x + 1e-6));
    let rem = a - fl.reduce((s, x) => s + x, 0);
    const ord = raw.map((x, i) => [x - fl[i], i]).filter(p => w[p[1]] > 0).sort((p, q) => (Math.abs(q[0] - p[0]) > 1e-7 ? q[0] - p[0] : p[1] - q[1]));
    for (let k = 0; rem > 0 && ord.length; k = (k + 1) % ord.length, rem--) fl[ord[k][1]]++;
    return fl.map(x => (neg ? -x : x) * unit);
  }
  const sum = a => a.reduce((s, x) => s + x, 0);
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  /** ICAI's ratio line '(5:2:1:4)' / '(45:15:30:—:10)': simplified when every figure is a whole number, a dash where nothing is received */
  function ratioText(w, dash) {
    const ints = w.every(x => Math.abs(x - Math.round(x)) < 1e-9);
    let ws = w;
    if (ints && Math.abs(sum(w) - 100) < 1e-9) ws = w;                // percentages read as ICAI prints them: (45:15:30:—:10)
    else if (ints) { const gg = w.filter(x => x > 0).reduce((a, b) => gcd(a, Math.round(b)), 0) || 1; ws = w.map(x => Math.round(x) / gg); }
    else ws = w.map(x => Math.round(x * 100) / 100);
    return ws.map((x, i) => (dash && dash[i] ? '—' : x > 0 ? fmt(x, ints ? 0 : 2).replace(/\.00$/, '') : '—')).join(':');
  }

  /* ------------------------------------------------------------------ parsing the inputs */
  const norm = s => String(s == null ? '' : s).toLowerCase().replace(/\b(no|number|of|the|total|in|per|value|sq|ft|metres?|meters?|sqm)\b\.?/g, ' ').replace(/[^a-z0-9]+/g, '').replace(/s$/, '');
  const LH = new Set(['labourhour', 'laborhour', 'directlabourhour', 'dlh', 'lh', 'labourhr', 'workinghour', 'manhour', 'directlabourhr']);
  const MH = new Set(['machinehour', 'machinehr', 'mh', 'directmachinehour', 'machinerunninghour']);
  const ALLOC = new Set(['allocated', 'allocation', 'actual', 'direct', 'given', 'actuals', 'allocate']);
  const nameKey = s => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g, '');
  const isP = t => /^p/i.test(String(t || '').trim());
  const isS = t => /^s/i.test(String(t || '').trim());

  function parseDepts(rows) {
    if (!Array.isArray(rows) || !rows.length) throw new Error('Add the departments: at least one production department.');
    const D = rows.map((r, i) => {
      const name = String(r[0] == null ? '' : r[0]).trim() || 'Dept ' + (i + 1);
      const t = String(r[1] == null ? '' : r[1]).trim();
      if (!isP(t) && !isS(t)) throw new Error(`${name}: type P for a production department or S for a service department.`);
      const given = String(r[2] == null ? '' : r[2]).trim() === '' ? 0 : num(r[2]);
      if (isNaN(given)) throw new Error(`${name}: the overheads already allocated must be an amount, like 2,40,000.`);
      return { name, P: isP(t), given, lh: 0, mh: 0, i };
    });
    if (D.length > 8) throw new Error('At most 8 departments.');
    if (!D.some(d => d.P)) throw new Error('At least one department must be a production department (type P).');
    const seen = new Set();
    D.forEach(d => { const k = nameKey(d.name) || d.name; if (seen.has(k)) throw new Error(`Two departments are called "${d.name}": give each a different name.`); seen.add(k); });
    return D;
  }
  function parseBases(rows, D) {
    const B = [];
    (rows || []).forEach((r, i) => {
      const label = String(r[0] == null ? '' : r[0]).trim();
      if (!label && !String(r[1] || '').trim()) return;
      const q = numList(r[1]);
      if (!label) throw new Error(`Basis row ${i + 1}: give the basis a name, like "Floor area".`);
      if (!q) throw new Error(`${label}: write one number for each department, separated by spaces (for example 2,000 800 400 1,600).`);
      if (q.length !== D.length) throw new Error(`${label}: give ${D.length} figures, one for each department (${D.map(d => d.name).join(', ')}); you gave ${q.length}.`);
      if (q.some(x => x < 0)) throw new Error(`${label}: a basis cannot be negative.`);
      B.push({ label, key: norm(label), q });
    });
    /* the hours for the rates are rows of this table too, as ICAI's data tables list them: 'Machine hours', 'Labour hours' */
    const hb = set => B.find(b => set.has(b.key));
    const mh = hb(MH), lh = hb(LH);
    D.forEach((d, j) => { d.mh = mh ? mh.q[j] : 0; d.lh = lh ? lh.q[j] : 0; });
    D.hasMH = !!mh; D.hasLH = !!lh;
    return B;
  }
  /** a basis named in an item or a service row: a row of the bases table, the departments' labour or machine hours, or a product of two
      ('HP × machine hours', ICAI's power basis in SM Illustration 4) → {label, q} or null */
  function findBasis(name, D, B) {
    const raw = String(name == null ? '' : name).trim();
    if (!raw) return null;
    const parts = raw.split(/\s*[×*]\s*|\s+x\s+/i).filter(Boolean);
    if (parts.length > 1) {
      const fs = parts.map(p => findBasis(p, D, B));
      if (fs.some(f => !f)) return null;
      return { label: fs.map(f => f.label).join(' × '), q: D.map((_, i) => fs.reduce((a, f) => a * f.q[i], 1)), product: fs };
    }
    const k = norm(raw);
    let b = B.find(x => x.key === k);
    if (b) return b;
    if (LH.has(k) || MH.has(k)) return null;                        // hours are a row of the bases table
    b = (k.length >= 2 && B.find(x => x.key.indexOf(k) === 0)) || B.find(x => x.key.length >= 3 && k.indexOf(x.key) === 0) || (k.length >= 4 && B.find(x => x.key.indexOf(k) >= 0));
    return b || null;
  }
  function parseItems(rows, D, B) {
    const out = [];
    (rows || []).forEach((r, i) => {
      const label = String(r[0] == null ? '' : r[0]).trim(), amt = String(r[1] == null ? '' : r[1]).trim(), bas = String(r[2] == null ? '' : r[2]).trim();
      if (!label && !amt && !bas) return;
      const name = label || 'Item ' + (i + 1);
      if (ALLOC.has(norm(bas))) {
        const a = numList(amt);
        if (!a || a.length !== D.length) throw new Error(`${name} is allocated: give ${D.length} amounts, one for each department in table order (0 or - where none).`);
        out.push({ label: name, kind: 'alloc', basis: 'Allocation', cells: a, total: sum(a) });
        return;
      }
      const a = num(amt);
      if (isNaN(a)) throw new Error(`${name}: the amount must be one total, like 12,000 (or set the basis to "allocated" and give one amount per department).`);
      const f = findBasis(bas, D, B);
      if (!f) throw new Error(`${name}: no basis called "${bas || '(blank)'}". Use a row of the bases table (add a "Machine hours" or "Labour hours" row for hours), a product such as "HP × Machine hours", or "allocated".`);
      if (!(sum(f.q) > 0)) throw new Error(`${name}: the basis ${f.label} is zero for every department.`);
      out.push({ label: name, kind: 'apportion', basis: f.label, w: f.q, total: a, product: f.product });
    });
    if (out.length > 12) throw new Error('At most 12 overhead items.');
    return out;
  }
  /** how each service department's cost is shared: a list of figures (percentages or a ratio, one per department in table order; its own
      entry is ignored) or the name of a basis → {s: dept index, w: weights over all departments (own = 0), label, basis?} */
  function parseService(rows, D, B) {
    const S = D.filter(d => !d.P), out = [], seen = new Set();
    (rows || []).forEach((r, i) => {
      const nm = String(r[0] == null ? '' : r[0]).trim(), sh = String(r[1] == null ? '' : r[1]).trim();
      if (!nm && !sh) return;
      const d = D.find(x => nameKey(x.name) === nameKey(nm)) || D.find(x => nameKey(nm).length >= 3 && nameKey(x.name).indexOf(nameKey(nm)) === 0);
      if (!d) throw new Error(`Service row ${i + 1}: "${nm}" is not one of the departments (${D.map(x => x.name).join(', ')}).`);
      if (d.P) throw new Error(`${d.name} is a production department; only service departments (type S) are re-apportioned.`);
      if (seen.has(d.i)) throw new Error(`${d.name} has two rows in the service table: keep one.`);
      seen.add(d.i);
      let w, basis = null;
      if (looksNumeric(sh)) {
        w = numList(sh);
        if (!w) throw new Error(`${d.name}: write one share for each department, separated by spaces (for example 60 30 - 10).`);
        if (w.length !== D.length) throw new Error(`${d.name}: give ${D.length} shares, one for each department (${D.map(x => x.name).join(', ')}), with - for itself; you gave ${w.length}.`);
      } else {
        const f = findBasis(sh, D, B);
        if (!f) throw new Error(`${d.name}: "${sh}" is neither a list of shares nor a basis from the bases table.`);
        w = f.q.slice(); basis = f.label;
      }
      if (w.some(x => x < 0)) throw new Error(`${d.name}: a share cannot be negative.`);
      w = w.map((x, j) => (j === d.i ? 0 : x));
      if (!(sum(w) > 0)) throw new Error(`${d.name}: its shares give nothing to any other department.`);
      out.push({ s: d.i, w, basis });
    });
    S.forEach(d => { if (!seen.has(d.i)) throw new Error(`Say how ${d.name}'s cost is shared: add a row for it in the service departments table.`); });
    return out;
  }

  /* ------------------------------------------------------------------ primary distribution */
  function primary(D, items, unit) {
    const n = D.length, totals = D.map(d => roundU(d.given, unit)), rows = [];
    if (D.some(d => d.given)) rows.push({ label: 'Allocated overheads', basis: 'Allocation', kind: 'given', cells: totals.slice(), total: sum(totals) });
    items.forEach(it => {
      const cells = it.kind === 'alloc' ? it.cells.map(x => roundU(x, unit)) : split(roundU(it.total, unit), it.w, unit);
      cells.forEach((c, j) => (totals[j] += c));
      rows.push(Object.assign({}, it, { cells, total: sum(cells), ratio: it.kind === 'alloc' ? '' : ratioText(it.w) }));
    });
    return { rows, totals, n };
  }

  /* ------------------------------------------------------------------ secondary distribution */
  /** service order for the step method: as listed; 'most' = the one serving the most other service departments first (ICAI's rule), ties to
      the larger cost; 'cost' = the largest cost first ('some authors', SM §4.4) */
  function stepOrder(svc, D, start, how) {
    const list = svc.slice();
    if (how === 'most') {
      const serves = r => svc.filter(o => o.s !== r.s && r.w[o.s] > 0).length;
      list.sort((a, b) => serves(b) - serves(a) || start[b.s] - start[a.s] || svc.indexOf(a) - svc.indexOf(b));
    } else if (how === 'cost') list.sort((a, b) => start[b.s] - start[a.s] || svc.indexOf(a) - svc.indexOf(b));
    return list;
  }
  /** Gaussian elimination with partial pivoting; null when singular */
  function solve(M, b) {
    const n = b.length, A = M.map((r, i) => r.concat([b[i]]));
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      if (Math.abs(A[p][c]) < 1e-12) return null;
      [A[c], A[p]] = [A[p], A[c]];
      for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k]; }
    }
    return A.map((r, i) => r[n] / r[i]);
  }
  /** rows of the secondary distribution statement, each {kind, label, s, ratio, cells (Δ per department), after (balances)}; final balances */
  function secondary(D, start, svc, o) {
    const n = D.length, unit = o.unit, method = o.method, rows = [], bal = start.slice();
    const prodW = r => r.w.map((x, j) => (D[j].P ? x : 0));
    const push = (row, cells) => { cells.forEach((c, j) => (bal[j] += c)); rows.push(Object.assign(row, { cells, after: bal.slice() })); };
    const out = { rows, method, order: svc.map(r => r.s) };
    if (!svc.length) { out.final = bal.slice(); return out; }
    if (method === 'direct') {
      svc.forEach(r => {
        const w = prodW(r);
        if (!(sum(w) > 0)) throw new Error(`${D[r.s].name} gives nothing to a production department, so the direct method has nowhere to put its cost.`);
        const amt = bal[r.s], cells = split(amt, w, unit); cells[r.s] = -amt;
        push({ kind: 'dist', s: r.s, label: D[r.s].name, bname: r.basis, amount: amt, w, ratio: ratioText(w, D.map(d => !d.P)), ignored: r.w.some((x, j) => x > 0 && !D[j].P) }, cells);
      });
    } else if (method === 'step') {
      const order = stepOrder(svc, D, start, o.order), closed = new Set();
      out.order = order.map(r => r.s);
      order.forEach((r, k) => {
        const w = r.w.map((x, j) => (closed.has(j) || j === r.s ? 0 : x));
        if (!(sum(w) > 0)) throw new Error(`When ${D[r.s].name} is closed, none of the departments it serves is still open: change the order or its shares.`);
        const amt = bal[r.s], cells = split(amt, w, unit); cells[r.s] = -amt;
        const dash = D.map((d, j) => closed.has(j) || j === r.s);
        push({ kind: 'dist', s: r.s, label: D[r.s].name, bname: r.basis, amount: amt, w, ratio: ratioText(w, dash), step: k + 1, closedBefore: [...closed], lost: r.w.some((x, j) => x > 0 && closed.has(j)) }, cells);
        closed.add(r.s);
      });
    } else if (method === 'repeated') {
      const stop = Math.max(+o.stop || 0, unit || 0.01), cap = 40;
      let round = 0;
      while (svc.some(r => Math.abs(bal[r.s]) > EPS)) {
        round++;
        for (const r of svc) {
          const amt = bal[r.s];
          if (Math.abs(amt) <= EPS) continue;
          const pw = prodW(r), small = (Math.abs(amt) < stop || round > cap) && sum(pw) > 0;
          const w = small ? pw : r.w, cells = split(amt, w, unit); cells[r.s] = -amt;
          push({ kind: small ? 'close' : 'dist', s: r.s, label: D[r.s].name, bname: r.basis, amount: amt, w, ratio: ratioText(w, D.map((d, j) => j === r.s || (small && !d.P))), round }, cells);
        }
        if (round > cap + 2) throw new Error('The service departments only serve each other, so their costs never reach a production department.');
      }
      out.rounds = round; out.stop = stop;
    } else if (method === 'simultaneous' || method === 'trial') {
      const S = svc.map(r => r.s), k = S.length;
      const q = (from, to) => { const r = svc.find(x => x.s === from); return r.w[to] / sum(r.w); };    // share of `from` that `to` receives
      let T;
      if (method === 'simultaneous') {
        const M = S.map((s, a) => S.map((t, b) => (a === b ? 1 : -q(t, s))));
        const x = solve(M, S.map(s => start[s]));
        if (!x || x.some(v => !isFinite(v) || v < -EPS)) throw new Error('These service departments only serve each other, so the equations have no solution: give at least one of them a share to a production department.');
        out.exact = x.slice();
        T = x.map(v => roundU(v, unit));
        out.eqs = S.map((s, a) => ({ s, c: start[s], terms: S.filter(t => t !== s && q(t, s) > 0).map(t => ({ t, k: q(t, s) })) }));
      } else {
        const stop = Math.max(+o.stop || 0, unit || 0.01), tot = S.map(s => start[s]), fresh = tot.slice(), iter = [];
        for (let pass = 0; pass < 60; pass++) {
          let moved = false;
          S.forEach((s, a) => {
            if (!fresh[a]) return;
            const gives = S.map((t, b) => (b === a ? 0 : roundU(fresh[a] * q(s, t), unit)));
            if (!gives.some(x => Math.abs(x) >= Math.max(stop, EPS))) return;
            gives.forEach((x, b) => { tot[b] += x; fresh[b] += x; });
            iter.push({ from: s, base: fresh[a], gives: gives.slice(), after: tot.slice() });
            fresh[a] = 0; moved = true;
          });
          if (!moved) break;
        }
        T = tot; out.iter = iter; out.pending = fresh.reduce((s2, f, a) => s2 + f * S.reduce((x, t) => x + (t === S[a] ? 0 : q(S[a], t)), 0), 0);
        out.stop = stop;
      }
      out.T = T; out.S = S;
      push({ kind: 'totals', label: method === 'trial' ? 'Totals after trial and error' : 'Totals from the equations' }, D.map(() => 0));
      svc.forEach((r, a) => {
        const amt = T[S.indexOf(r.s)], parts = split(amt, r.w, unit), cells = D.map((d, j) => (d.P ? parts[j] : 0));
        cells[r.s] = -start[r.s];                                     // its own primary leaves; the shares between service departments are inside T
        push({ kind: 'final', s: r.s, label: D[r.s].name, bname: r.basis, amount: amt, w: r.w, inner: D.map((d, j) => (!d.P && j !== r.s ? parts[j] : 0)), ratio: ratioText(r.w, D.map((d, j) => j === r.s)) }, cells);
      });
    } else throw new Error('Choose a method.');
    out.final = bal.slice();
    return out;
  }

  /* ------------------------------------------------------------------ absorption */
  function absorb(D, final, rate, jobText) {
    const rows = D.map((d, j) => {
      if (!d.P) return null;
      const by = rate === 'lh' ? 'lh' : rate === 'mh' ? 'mh' : d.mh >= d.lh ? 'mh' : 'lh', h = d[by];
      return { j, name: d.name, by, hours: h, total: final[j], rate: h > 0 ? final[j] / h : null, other: by === 'mh' ? d.lh : d.mh };
    }).filter(Boolean);
    let job = null;
    const jt = String(jobText == null ? '' : jobText).trim();
    if (jt) {
      const h = numList(jt);
      if (!h || h.length !== rows.length) throw new Error(`Job hours: give ${rows.length} figures, the hours the job spends in each production department (${rows.map(r => r.name).join(', ')}).`);
      const lines = rows.map((r, i) => { const r2 = r.rate == null ? null : Math.round(r.rate * 100) / 100; return { name: r.name, by: r.by, h: h[i], rate: r2, amt: r2 == null ? 0 : r2 * h[i] }; });
      if (lines.some((l, i) => h[i] > 0 && l.rate == null)) throw new Error('Job hours: a department the job uses has no hours to set its rate on.');
      job = { lines, total: sum(lines.map(l => l.amt)) };
    }
    return { rows, job };
  }

  /* ------------------------------------------------------------------ the frames */
  const BASIS_WHY = [
    [/floor|area|space|cubic|volume/i, 'it is spent on space, so each department bears it in proportion to the space it occupies'],
    [/employee|worker|staff|head|people/i, 'it serves people, so it follows the number of employees'],
    [/h\.?p|horse|power|kwh|watt/i, 'it follows the power each department\'s machines draw'],
    [/capital|plant|investment|asset|machine.*val|value.*machine/i, 'it rises with the value of the assets, so it follows their capital value'],
    [/light|point/i, 'it follows the number of light points'],
    [/radiator|heat/i, 'heating follows the radiator sections in each department'],
    [/wage/i, 'wage-related costs follow direct wages'],
    [/machine hour/i, 'it follows the time the machines run'],
    [/labour hour|working hour/i, 'it follows the hours worked'],
    [/requisition|stores|material/i, 'it follows the materials each department draws']];
  const whyBasis = b => { const m = BASIS_WHY.find(([re]) => re.test(b)); return m ? m[1] : 'that basis measures the benefit each department receives'; };
  const METHOD = { direct: 'Direct re-distribution', step: 'Step method (non-reciprocal)', repeated: 'Repeated distribution', simultaneous: 'Simultaneous equations', trial: 'Trial and error' };

  function compute(v) {
    const D = parseDepts(v.depts), n = D.length, unit = v.round === false ? 0 : 1, dp = unit ? 0 : 2;
    const B = parseBases(v.bases, D), items = parseItems(v.items, D, B), svc = parseService(v.service, D, B);
    const method = METHOD[v.method] ? v.method : 'repeated', part = ['primary', 'secondary', 'rates'].includes(v.part) ? v.part : 'all';
    const P = primary(D, items, unit);
    const S = secondary(D, P.totals, svc, { method, order: v.order, stop: v.stop, unit });
    const A = absorb(D, S.final, v.rate, v.job);
    const names = D.map(d => d.name), prodIdx = D.map((d, j) => j).filter(j => D[j].P), servIdx = D.map((d, j) => j).filter(j => !D[j].P);
    const a = x => fmt(x, dp), money = x => inr(x, dp);
    const frames = [];

    /* ---- primary distribution: the table fills cell by cell (row by row if the table is large) */
    const primTable = (upto, cellUpto, extraTotal) => {
      const rows = [], cells = {};
      P.rows.slice(0, upto + 1).forEach((r, ri) => {
        const last = ri === upto, show = j => !last || cellUpto == null || j <= cellUpto;
        rows.push([r.label, r.kind === 'given' || r.kind === 'alloc' ? 'Allocation' : `${r.basis} (${r.ratio})`, a(r.total)]
          .concat(r.cells.map((c, j) => (show(j) ? (c ? a(c) : '—') : ''))));
        if (last) r.cells.forEach((c, j) => { if (show(j) && (cellUpto == null || j === cellUpto)) cells[ri + ',' + (3 + j)] = 'hl'; });
      });
      if (extraTotal) {
        const ri = rows.length;
        rows.push(['**Total (primary distribution)**', '', a(sum(P.totals))].concat(P.totals.map(x => `**${a(x)}**`)));
        cells[ri + ',0'] = 'd'; P.totals.forEach((x, j) => (cells[ri + ',' + (3 + j)] = 'd'));
      }
      return { type: 'table', title: 'Primary distribution of overheads (₹)', head: ['Item', 'Basis', 'Total'].concat(names), rows, cells, align: ['left', 'left', 'right'].concat(names.map(() => 'right')) };
    };
    const showPrimary = (part === 'all' || part === 'primary') && items.length > 0;
    if (showPrimary) {
      const nCells = P.rows.filter(r => r.kind === 'apportion').length * n, byCell = nCells <= 48;
      frames.push({ caption: `**Primary distribution.** Every factory overhead is charged to the departments: **allocated** when it belongs wholly to one department, **apportioned** on a basis when several share it. Service departments get their share too; they pass it on later. Press ▶ to fill the table.`,
        view: [{ type: 'table', title: 'Primary distribution of overheads (₹)', head: ['Item', 'Basis', 'Total'].concat(names), rows: P.rows.map(r => [r.label, r.kind === 'apportion' ? r.basis : 'Allocation', a(r.total)].concat(names.map(() => ''))), align: ['left', 'left', 'right'].concat(names.map(() => 'right')) }] });
      P.rows.forEach((r, ri) => {
        if (r.kind !== 'apportion' || !byCell) {
          const why = r.kind === 'apportion' ? `**${r.label}** (${money(r.total)}) is apportioned on **${r.basis}** (${r.ratio}): ${whyBasis(r.basis)}.` :
            r.kind === 'given' ? `**Allocated overheads**: these already belong to one department each (indirect wages, consumables of that department), so they are charged whole, with no basis.` :
              `**${r.label}** is allocated: each department's own amount is charged to it whole, with no basis needed.`;
          frames.push({ caption: why + (r.kind === 'apportion' ? ' ' + r.cells.map((c, j) => `${names[j]} ${money(c)}`).join(', ') + '.' : ''), view: [primTable(ri, null)] });
          return;
        }
        const W = sum(r.w);
        r.cells.forEach((c, j) => {
          const first = j === 0, tail = r.product ? ` (${r.product.map(f => fmt(f.q[j], 2).replace(/\.00$/, '')).join(' × ')})` : '';
          const cap = (first ? `**${r.label}** (${money(r.total)}) is apportioned on **${r.basis}**, ${r.ratio}: ${whyBasis(r.basis)}. ` : '') +
            (r.w[j] > 0 ? `**${names[j]}** has ${fmt(r.w[j], 2).replace(/\.00$/, '')}${tail} of ${fmt(W, 2).replace(/\.00$/, '')}, so it bears ${money(r.total)} × ${fmt(r.w[j], 2).replace(/\.00$/, '')} ⁄ ${fmt(W, 2).replace(/\.00$/, '')} = **${money(c)}**.`
              : `**${names[j]}** has none of the ${r.basis.toLowerCase()}, so it bears nothing of ${r.label.toLowerCase()}.`) +
            (j === n - 1 && unit && Math.abs(sum(r.w.map(x => (r.total * x) / W)) - r.total) < 1e-6 && r.w.some(x => Math.abs((r.total * x) / W - Math.round((r.total * x) / W)) > 1e-6) ? ' (Shares are rounded to whole rupees so the row still adds up to the total.)' : '');
          frames.push({ caption: cap, view: [primTable(ri, j)] });
        });
      });
      frames.push({ caption: `**Primary totals.** Adding down each column gives each department's overheads after primary distribution: ${D.map((d, j) => `${d.name} ${money(P.totals[j])}`).join(', ')} (total ${money(sum(P.totals))}). ${servIdx.length ? 'The service departments\' totals still have to reach the production departments.' : ''}`,
        view: [primTable(P.rows.length - 1, null, true)] });
    }

    /* ---- secondary distribution */
    const ratioOf = r => (r.ratio ? `${r.bname ? r.bname + ' ' : ''}(${r.ratio})` : '');
    const secTable = (upto, finalRow) => {
      const rows = [['As per primary distribution', ''].concat(P.totals.map(x => a(x)))], cells = {};
      S.rows.slice(0, upto + 1).forEach((r, ri) => {
        const cur = ri === upto && !finalRow, R = rows.length;
        if (r.kind === 'totals') {
          rows.push([`**${r.label}**`, '(service departments)'].concat(D.map((d, j) => (S.S.includes(j) ? `**${a(S.T[S.S.indexOf(j)])}**` : ''))));
          S.S.forEach(j => (cells[R + ',' + (2 + j)] = 'd'));
          return;
        }
        const lab = r.kind === 'final' ? `${r.label}: total ${a(r.amount)} shared` : r.kind === 'close' ? `${r.label} (closing)` : method === 'repeated' ? `${r.label} (round ${r.round})` : method === 'step' ? `${r.label} (step ${r.step})` : r.label;
        rows.push([lab, ratioOf(r)].concat(r.cells.map((c, j) => {
          if (r.kind === 'final' && r.inner && r.inner[j]) return `[${a(r.inner[j])}]`;
          if (j === r.s) return `(${a(r.kind === 'final' ? r.amount : -c)})`;
          return c ? a(c) : '—';
        })));
        if (cur) r.cells.forEach((c, j) => { if (j === r.s) cells[R + ',' + (2 + j)] = 'd'; else if (c) cells[R + ',' + (2 + j)] = 'hl'; });
        if (r.kind === 'final' && r.inner) r.inner.forEach((x, j) => { if (x) cells[R + ',' + (2 + j)] = 'mute'; });
      });
      const last = upto >= 0 ? S.rows[Math.min(upto, S.rows.length - 1)].after : P.totals, R = rows.length;
      rows.push([finalRow ? '**Total overheads**' : '*Balance now*', ''].concat(last.map((x, j) => (finalRow ? (D[j].P ? `**${a(x)}**` : '—') : Math.abs(x) < 1e-9 && !D[j].P ? 'nil' : a(x)))));
      if (finalRow) prodIdx.forEach(j => (cells[R + ',' + (2 + j)] = 'ok'));
      else D.forEach((d, j) => { if (!d.P) cells[R + ',' + (2 + j)] = Math.abs(last[j]) < 1e-9 ? 'mute' : 'hl'; });
      return { type: 'table', title: `Secondary distribution: ${METHOD[method].toLowerCase()} (₹)`, head: ['Particulars', 'Basis'].concat(names), rows, cells, align: ['left', 'left'].concat(names.map(() => 'right')) };
    };
    const showSecondary = (part === 'all' || part === 'secondary') && servIdx.length > 0;
    const svcName = j => D[j].name;
    const balTxt = after => servIdx.map(j => `${svcName(j)} ${money(after[j])}`).join(', ');
    if (showSecondary) {
      const intro = {
        direct: `**Direct re-distribution**: each service department's cost goes straight to the production departments, ignoring any service it renders to other service departments. Simple, but it ignores those inter-service flows.`,
        step: `**Step method**: service departments are closed one at a time. A closed department's cost goes to every department still open, including later service departments, and it never receives anything back. Order: ${S.order.map(svcName).join(' → ')}${v.order === 'most' ? ' (the one serving the most other service departments first)' : v.order === 'cost' ? ' (largest cost first)' : ' (as listed)'}.`,
        repeated: `**Repeated distribution**: each service department's balance is shared among all the departments it serves, service departments included, round after round, until the service balances are too small to matter (below ${money(S.stop || 0)}); that last small balance goes to the production departments only, as ICAI's answers do.`,
        simultaneous: `**Simultaneous equations**: each service department's total cost = its own cost + its share of the other service departments' totals. Solving the equations gives the totals at once, then each total is shared among the production departments.`,
        trial: `**Trial and error**: the service departments pass shares only to each other, again and again, until the amounts passed are negligible (below ${money(S.stop || 0)}). Their totals are then shared among the production departments.`
      }[method];
      frames.push({ caption: `**Secondary distribution.** ${intro}`, view: [secTable(-1)] });
      if (method === 'simultaneous') {
        const eqTxt = e => `${svcName(e.s)} = ${a(e.c)}${e.terms.map(t => ` + ${dec(t.k)} × ${svcName(t.t)}`).join('')}`;
        const eqView = (k, sol) => ({ type: 'table', title: 'Equations (T = total cost of a service department)', head: ['Service department', 'Equation', 'Total'], rows: S.eqs.slice(0, k).map((e, i) => [svcName(e.s), eqTxt(e), sol ? `**${a(S.T[i])}**` : '']), cells: sol ? Object.fromEntries(S.eqs.map((e, i) => [i + ',2', 'd'])) : {}, align: ['left', 'left', 'right'] });
        S.eqs.forEach((e, k) => frames.push({ caption: `**Equation for ${svcName(e.s)}**: its total is its own ${money(e.c)}${e.terms.length ? ' plus ' + e.terms.map(t => `${pct(t.k)} of ${svcName(t.t)}'s total`).join(' and ') : ''}, because ${e.terms.length ? e.terms.map(t => `${svcName(t.t)} spends ${pct(t.k)} of its service on ${svcName(e.s)}`).join(' and ') : 'no other service department serves it'}.`, view: [eqView(k + 1, false)] }));
        let how = '';
        if (S.eqs.length === 2) {
          const [e1, e2] = S.eqs, k12 = (e1.terms.find(t => t.t === e2.s) || { k: 0 }).k, k21 = (e2.terms.find(t => t.t === e1.s) || { k: 0 }).k;
          const c2 = e2.c + k21 * e1.c, kk = k21 * k12;
          const fx = x => fmt(x, Math.abs(x - Math.round(x)) < 1e-9 ? 0 : 2);
          how = `Substituting ${svcName(e1.s)}'s equation in ${svcName(e2.s)}'s: ${svcName(e2.s)} = ${a(e2.c)} + ${dec(k21)} × (${a(e1.c)} + ${dec(k12)} × ${svcName(e2.s)}) = ${fx(c2)} + ${dec(kk)} × ${svcName(e2.s)}, so ${svcName(e2.s)} = ${fx(c2)} ⁄ ${dec(1 - kk)} = **${money(S.T[1])}**; then ${svcName(e1.s)} = ${a(e1.c)} + ${dec(k12)} × ${a(S.T[1])} = **${money(S.T[0])}**.`;
        } else how = `Solving the ${S.eqs.length} equations together gives ${S.eqs.map((e, i) => `${svcName(e.s)} = **${money(S.T[i])}**`).join(', ')}.`;
        frames.push({ caption: how + (unit ? ' (Rounded to whole rupees, as ICAI does.)' : ''), view: [eqView(S.eqs.length, true)] });
      }
      if (method === 'trial') {
        const it = S.iter, Sx = S.S;
        const trTable = k => ({ type: 'table', title: 'Trial and error between the service departments (₹)', head: ['Particulars'].concat(Sx.map(svcName)),
          rows: [['As per primary distribution'].concat(Sx.map(j => a(P.totals[j])))].concat(it.slice(0, k).map(x => [`${svcName(x.from)}'s ${a(x.base)} passed on`].concat(x.gives.map((gv, b) => (Sx[b] === x.from ? '—' : gv ? a(gv) : '—')))))
            .concat([['*Totals so far*'].concat((k ? it[k - 1].after : Sx.map(j => P.totals[j])).map(x => a(x)))]),
          cells: k ? Object.fromEntries(it[k - 1].gives.map((gv, b) => [k + ',' + (1 + b), gv ? 'hl' : 'mute'])) : {}, align: ['left'].concat(Sx.map(() => 'right')) });
        it.forEach((x, k) => frames.push({ caption: `**${svcName(x.from)}** passes on ${k < Sx.length ? 'its balance' : 'what it has just received'}, ${money(x.base)}: ${x.gives.map((gv, b) => (Sx[b] === x.from || !gv ? null : `${money(gv)} to ${svcName(Sx[b])}`)).filter(Boolean).join(', ')}. Totals so far: ${Sx.map((j, b) => `${svcName(j)} ${money(x.after[b])}`).join(', ')}.`, view: [trTable(k + 1)] }));
        frames.push({ caption: `The next amounts to pass would be below ${money(S.stop)}, so the trials stop: ${Sx.map((j, b) => `${svcName(j)} ${money(S.T[b])}`).join(', ')}.${S.pending > 0.5 ? ` About ${money(S.pending, 0)} is never passed on, which is why trial and error is slightly short of the simultaneous-equation answer.` : ''}`, view: [trTable(it.length)] });
      }
      S.rows.forEach((r, ri) => {
        let cap;
        if (r.kind === 'totals') cap = `These totals now replace the service departments' own costs: each one is shared among the production departments in its ratio.`;
        else if (r.kind === 'final') {
          const inner = r.inner.map((x, j) => (x ? `${money(x)} to ${names[j]}` : null)).filter(Boolean);
          cap = `**${r.label}**'s total ${money(r.amount)} is shared ${ratioOf(r)}: ${prodIdx.filter(j => r.cells[j]).map(j => `${names[j]} ${money(r.cells[j])}`).join(', ')}.` +
            (inner.length ? ` Its share to the other service department${inner.length > 1 ? 's' : ''} (${inner.join(', ')}, shown in [brackets]) is not added again: it is already inside their totals.` : '');
        } else if (r.kind === 'close') cap = `**Closing**: ${r.label}'s ${money(r.amount)} is below ${money(S.stop)}, so instead of another round it goes to the production departments only, in its production ratio ${ratioOf(r)}: ${prodIdx.filter(j => r.cells[j]).map(j => `${names[j]} ${money(r.cells[j])}`).join(', ')}.`;
        else {
          const to = r.cells.map((c, j) => (j !== r.s && c ? `${names[j]} ${money(c)}` : null)).filter(Boolean).join(', ');
          if (method === 'direct') cap = `**${r.label}**: its ${money(r.amount)} goes to the production departments only, ${ratioOf(r)}${r.basis ? ' on ' + r.basis : ''}: ${to}.${r.ignored ? ' Its service to other service departments is ignored, which is the weakness of this method.' : ''}`;
          else if (method === 'step') cap = `**Step ${r.step}: close ${r.label}.** Its ${money(r.amount)} goes to every department still open ${ratioOf(r)}: ${to}.${r.lost ? ' Its service to departments already closed is ignored: a closed department takes nothing back.' : ''}${r.step < S.order.length ? ` ${svcName(S.order[r.step])} now carries ${money(r.after[S.order[r.step]])}.` : ''}`;
          else cap = `**Round ${r.round}, ${r.label}**: its whole balance ${money(r.amount)} is shared ${ratioOf(r)}: ${to}. Service balances now: ${balTxt(r.after)}.`;
        }
        frames.push({ caption: cap, view: [secTable(ri)] });
      });
      const ok = Math.abs(sum(prodIdx.map(j => S.final[j])) - sum(P.totals));
      frames.push({ caption: `**After secondary distribution** all overheads sit in the production departments: ${prodIdx.map(j => `${names[j]} ${money(S.final[j])}`).join(', ')}. ` +
        (ok < 0.5 ? `Check: they add up to ${money(sum(P.totals))}, the total overheads.` : `They add up to ${money(sum(prodIdx.map(j => S.final[j])))}, ${money(ok)} short of the ${money(sum(P.totals))} total: that small amount is still bouncing between the service departments (trial and error stops early).`),
        view: [secTable(S.rows.length - 1, true)] });
    }

    /* ---- absorption rates */
    const showRates = part === 'all' || part === 'rates';
    if (part === 'rates') frames.push({ caption: `**Absorption.** Start from each production department's overheads after secondary distribution (${prodIdx.map(j => `${names[j]} ${money(S.final[j])}`).join(', ')}); dividing by its hours gives the rate at which jobs absorb them.`, view: [servIdx.length ? secTable(S.rows.length - 1, true) : primTable(P.rows.length - 1, null, true)] });
    const rateTable = k => ({ type: 'table', title: 'Overhead absorption rates', head: ['Department', 'Overheads (₹)', 'Hours', 'Rate (₹)'],
      rows: A.rows.slice(0, k).map(r => [r.name, a(r.total), r.hours ? `${fmt(r.hours)} ${r.by === 'mh' ? 'MH' : 'LH'}` : '—', r.rate == null ? '—' : `**${fmt(r.rate, 2)}** / ${r.by === 'mh' ? 'MH' : 'LH'}`]),
      cells: k ? { [(k - 1) + ',3']: 'ok' } : {}, align: ['left', 'right', 'right', 'right'] });
    if (showRates && !A.rows.some(r => r.hours > 0) && (D.hasMH || D.hasLH))
      frames.push({ caption: `No ${v.rate === 'lh' ? 'labour' : v.rate === 'mh' ? 'machine' : ''} hours are given for the production departments, so no absorption rate is worked out. Add a "${v.rate === 'lh' ? 'Labour' : 'Machine'} hours" row to the bases table to see it.`, view: [secTable(S.rows.length - 1, true)] });
    if (showRates && A.rows.some(r => r.hours > 0)) {
      A.rows.forEach((r, k) => {
        const why = v.rate === 'more' ? (r.by === 'mh' ? `**${r.name}** works mainly with machines (${fmt(r.hours)} machine hours against ${fmt(r.other)} labour hours), so its overheads are absorbed per machine hour` : `**${r.name}** works mainly by hand (${fmt(r.hours)} labour hours against ${fmt(r.other)} machine hours), so its overheads are absorbed per labour hour`)
          : `**${r.name}**'s overheads are absorbed per ${r.by === 'mh' ? 'machine' : 'labour'} hour`;
        frames.push({ caption: r.rate == null ? `${r.name} has no ${r.by === 'mh' ? 'machine' : 'labour'} hours given, so no rate can be set for it.` : `${why}: ${money(r.total)} ÷ ${fmt(r.hours)} hours = **₹${fmt(r.rate, 2)} per ${r.by === 'mh' ? 'machine' : 'labour'} hour**.`, view: [rateTable(k + 1)] });
      });
      if (A.job) {
        const J = A.job;
        frames.push({ caption: `**A job absorbs overheads at these rates**: ${J.lines.filter(l => l.h).map(l => `${fmt(l.h, 2).replace(/\.00$/, '')} ${l.by === 'mh' ? 'machine' : 'labour'} hours in ${l.name} × ₹${fmt(l.rate, 2)} = ₹${fmt(l.amt, 2)}`).join('; ')}. Overhead charged to the job: **₹${fmt(J.total, 2)}**.`,
          view: [rateTable(A.rows.length), { type: 'table', title: 'Overhead absorbed by the job', head: ['Department', 'Hours', 'Rate (₹)', 'Overhead (₹)'], rows: J.lines.map(l => [l.name, `${fmt(l.h, 2).replace(/\.00$/, '')} ${l.by === 'mh' ? 'MH' : 'LH'}`, fmt(l.rate, 2), fmt(l.amt, 2)]).concat([['**Total**', '', '', `**${fmt(J.total, 2)}**`]]), cells: { [J.lines.length + ',3']: 'ok' }, align: ['left', 'right', 'right', 'right'] }] });
      }
    }
    if (!frames.length) frames.push({ caption: part === 'primary' ? 'No overhead items to apportion: the departments\' overheads are as given. Add items to the overheads table to see the primary distribution.' : 'Nothing to distribute: add service departments or overhead items.', view: [secTable(-1)] });

    /* ---- tiles, results, conventions */
    const finalOf = j => (part === 'primary' ? P.totals[j] : S.final[j]);
    const stats = prodIdx.slice(0, 3).map(j => ({ label: part === 'primary' ? `${names[j]} after primary` : `${names[j]} total overheads`, value: money(finalOf(j)), hint: part === 'primary' ? 'allocated + apportioned overheads' : 'primary share + service departments\' costs re-apportioned' }));
    if (showRates || part === 'all') A.rows.slice(0, 3).forEach(r => { if (r.rate != null) stats.push({ label: `${r.name} rate per ${r.by === 'mh' ? 'machine' : 'labour'} hour`, value: '₹' + fmt(r.rate, 2), hint: `overheads ÷ ${r.by === 'mh' ? 'machine' : 'labour'} hours` }); });
    if (A.job && showRates && stats.length < 6) stats.push({ label: 'Overhead absorbed by the job', value: '₹' + fmt(A.job.total, 2), hint: 'Σ hours × rate in each department' });
    const withRates = (part === 'all' || part === 'rates') && A.rows.some(r => r.rate != null);
    const table = { head: ['Department', 'Type', 'After primary (₹)'].concat(part === 'primary' ? [] : ['After secondary (₹)'], withRates ? ['Rate (₹ per hour)'] : []),
      rows: D.map((d, j) => { const r = A.rows.find(x => x.j === j); return [d.name, d.P ? 'production' : 'service', a(P.totals[j])].concat(part === 'primary' ? [] : [d.P ? a(S.final[j]) : '—'], withRates ? [r && r.rate != null ? `${fmt(r.rate, 2)} / ${r.by === 'mh' ? 'MH' : 'LH'}` : '—'] : []); }) };
    const note = `**Conventions.** A service department's shares (percentages or a basis) are scaled to 100% over the departments that receive under the method; its share of itself is ignored. ` +
      (unit ? 'Every apportioned amount is a whole rupee, the rupee left over by rounding going to the largest fraction, so each row adds up exactly (as in ICAI\'s answers); switch rounding off for exact figures. ' : 'Amounts are exact (shown to paise). ') +
      'Direct method: production departments only. Step method: a closed department receives nothing back; order as listed unless chosen otherwise. Repeated distribution: balances go round in the listed order; a balance below the stop amount goes to the production departments only. Trial and error: service departments pass shares to each other until the amount to pass is below the stop amount. Simultaneous equations: exact totals, rounded to whole rupees when rounding is on. ' +
      'Rates: overheads ÷ hours, two decimals; "larger base" uses machine hours where a department has more machine hours than labour hours. A job\'s overhead uses the rates to two decimals. Direct material and direct wages of production departments are direct costs, not overheads: leave them out (a service department\'s own wages are its overhead).';
    return { frames, stats: stats.slice(0, 6), table, note, sim: { D, primary: P, secondary: S, absorb: A, method, part, unit } };
  }

  /* ------------------------------------------------------------------ inputs, examples, challenge */
  const DEPT_COLS = [{ id: 'name', label: 'Name', type: 'text', auto: n => 'D' + (n + 1) }, { id: 'type', label: 'P / S', type: 'text', auto: () => 'P' },
    { id: 'given', label: 'Allocated ₹', type: 'text' }];
  const TAPRI = {
    method: 'repeated', part: 'all', order: 'listed', stop: 100, round: true, rate: 'more', job: '12 20',
    depts: [['Blending', 'P', '2,40,000'], ['Packing', 'P', '1,60,000'], ['Boiler house', 'S', '90,000'], ['Maintenance', 'S', '60,000']],
    bases: [['Floor area', '3,000 2,000 500 500'], ['HP of machines', '60 30 5 5'], ['Plant value', '50 30 15 5'], ['Employees', '30 40 5 5'], ['Labour hours', '3,000 6,000 - -'], ['Machine hours', '8,000 2,000 - -']],
    items: [['Factory rent', '1,20,000', 'Floor area'], ['Power', '1,50,000', 'HP of machines'], ['Depreciation of plant', '2,00,000', 'Plant value'], ['Canteen subsidy', '40,000', 'Employees']],
    service: [['Boiler house', '60 30 - 10'], ['Maintenance', '50 30 20 -']]
  };
  const presets = [
    { label: 'Tapri premix plant, Indore: primary, then repeated distribution (Blending, Packing; boiler house, maintenance)', values: TAPRI },
    { label: 'Tapri premix plant: the same data by simultaneous equations', values: Object.assign({}, TAPRI, { method: 'simultaneous' }) },
    { label: 'Tapri samosa factory: step method with three service departments', values: {
      method: 'step', part: 'all', order: 'listed', stop: 100, round: true, rate: 'lh', job: '',
      depts: [['Mixing', 'P', '4,20,000'], ['Frying', 'P', '6,10,000'], ['Packing', 'P', '2,70,000'], ['Stores', 'S', '96,000'], ['Canteen', 'S', '72,000'], ['Maintenance', 'S', '1,08,000']],
      bases: [['Requisitions', '120 180 60 0 40 100'], ['Employees', '25 30 15 4 0 6'], ['Labour hours', '2,500 3,200 1,800 - - -'], ['Machine hours', '900 2,400 600 - - -']], items: [],
      service: [['Stores', 'Requisitions'], ['Canteen', 'Employees'], ['Maintenance', '30 50 20 - - -']] } },
    { label: 'SM Illustrations 4 and 5 (Sanz Ltd): primary distribution, repeated distribution, machine hour rates', values: {
      method: 'repeated', part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '',
      depts: [['A', 'P', ''], ['B', 'P', ''], ['C', 'P', ''], ['X', 'S', ''], ['Y', 'S', '']],
      bases: [['Area (sq ft)', '500 250 500 250 500'], ['Capital value (₹ lakh)', '20 40 20 10 10'], ['HP of machines', '50 40 20 15 25'], ['Machine hours', '1,000 2,000 4,000 1,000 1,000']],
      items: [['Direct material of X and Y', '0 0 0 2,00,000 1,00,000', 'allocated'], ['Direct wages of X and Y', '0 0 0 1,00,000 2,00,000', 'allocated'], ['Factory rent', '4,00,000', 'Area'],
        ['Power', '2,50,000', 'HP × machine hours'], ['Depreciation', '1,00,000', 'Capital value'], ['Other overheads', '9,00,000', 'Machine hours']],
      service: [['X', '45 15 30 - 10'], ['Y', '60 35 - 5 -']] } },
    { label: 'SM Illustration 4 (Sanz Ltd): trial and error between X and Y', values: {
      method: 'trial', part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '',
      depts: [['A', 'P', '2,70,000'], ['B', 'P', '3,70,000'], ['C', 'P', '6,00,000'], ['X', 'S', '4,75,000'], ['Y', 'S', '5,35,000']],
      bases: [['Machine hours', '1,000 2,000 4,000 - -']], items: [], service: [['X', '45 15 30 - 10'], ['Y', '60 35 - 5 -']] } },
    { label: 'RTP Sep 2026 Q1 (Apex Mobility): primary distribution, step method, recovery rates and Job AMS-101', values: {
      method: 'step', part: 'all', order: 'listed', stop: 100, round: true, rate: 'more', job: '250 200',
      depts: [['Fabrication', 'P', '18,20,000'], ['Assembly', 'P', '9,60,000'], ['Stores', 'S', '3,00,000'], ['Maintenance', 'S', '2,40,000']],
      bases: [['Floor area (sq m)', '30,000 12,000 3,000 5,000'], ['Plant value', '20,00,000 10,00,000 1,00,000 2,00,000'], ['Employees', '150 100 40 20'], ['Store requisitions', '4,000 2,000 - -'], ['Maintenance hours', '3,000 2,500 500 -'], ['Labour hours', '80,000 30,00,000 - -'], ['Machine hours', '35,00,000 80,000 - -']],
      items: [['Factory rent', '18,00,000', 'Floor area'], ['Building insurance', '2,00,000', 'Floor area'], ['Plant insurance', '2,40,000', 'Plant value'], ['Depreciation on machinery', '3,20,000', 'Plant value'], ['Canteen subsidy', '5,00,000', 'Employees']],
      service: [['Maintenance', 'Maintenance hours'], ['Stores', 'Store requisitions']] } },
    { label: 'MTP May 2026 Series I Q3(b) (Union Ltd): primary distribution, then simultaneous equations', values: {
      method: 'simultaneous', part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '',
      depts: [['Machine shop', 'P', ''], ['Packing', 'P', ''], ['General plant', 'S', ''], ['Stores', 'S', '']],
      bases: [['Floor space', '2,000 800 400 1,600'], ['Radiator sections', '45 90 30 60'], ['Employees', '20 12 4 8'], ['Investment', '8,00,000 2,40,000 80,000 1,60,000'], ['HP hours', '3,500 500 - 1,000']],
      items: [['Indirect labour', '8,000 6,000 4,000 11,000', 'allocated'], ['Maintenance material', '3,400 1,600 2,100 2,800', 'allocated'], ['Misc. supplies', '1,500 2,900 900 600', 'allocated'],
        ['Supervisor\'s salary', '0 0 16,000 0', 'allocated'], ['Cost & payroll salary', '0 0 80,000 0', 'allocated'], ['Power', '78,000', 'HP hours'], ['Rent', '72,000', 'Floor space'],
        ['Fuel and heat', '60,000', 'Radiator sections'], ['Insurance', '12,000', 'Investment'], ['Taxes', '8,400', 'Investment'], ['Depreciation', '1,20,000', 'Investment']],
      service: [['Stores', '50 20 30 -'], ['General plant', 'Employees']] } },
    { label: 'Exam Sep 2025 Q2(b): S1 and S2 serve each other; simultaneous equations', values: {
      method: 'simultaneous', part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '',
      depts: [['P1', 'P', '0'], ['P2', 'P', '0'], ['P3', 'P', '0'], ['S1', 'S', '1,60,000'], ['S2', 'S', '2,40,000']],
      bases: [], items: [], service: [['S1', '25 35 20 - 20'], ['S2', '35 30 25 10 -']] } },
    { label: 'MTP Sep 2025 Series II Q2(a) (IOT Solutions): Finance and IT fixed costs on budgeted hours, step method', values: {
      method: 'step', part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '',
      depts: [['MD', 'P', '0'], ['DS', 'P', '0'], ['Finance', 'S', '22,96,800'], ['IT', 'S', '30,30,500']],
      bases: [], items: [], service: [['Finance', '4,500 2,250 - 750'], ['IT', '67,500 75,000 7,500 -']] } },
    { label: 'SM Practical Problem 3 (Deccan Manufacturing): step ladder with four service departments, labour hour rates', values: {
      method: 'step', part: 'all', order: 'listed', stop: 100, round: true, rate: 'lh', job: '',
      depts: [['X', 'P', '1,93,000'], ['Y', 'P', '64,000'], ['Z', 'P', '83,000'], ['P', 'S', '45,000'], ['Q', 'S', '75,000'], ['R', 'S', '1,05,000'], ['S', 'S', '30,000']],
      bases: [['Employees', '100 125 85 10 50 40 50'], ['Area (sq m)', '3,000 1,500 1,500 500 1,500 1,000 1,000'], ['Labour hours', '4,000 3,000 4,000 1,000 5,000 6,000 3,000']], items: [],
      service: [['P', 'Employees'], ['Q', 'Labour hours'], ['R', 'Area'], ['S', 'Labour hours']] } },
    { label: 'SM Illustration 1 (XL Ltd): direct re-distribution of four service departments', values: {
      method: 'direct', part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '',
      depts: [['A', 'P', '30,00,000'], ['B', 'P', '26,00,000'], ['C', 'P', '24,00,000'], ['Stores', 'S', '4,00,000'], ['Time-keeping and accounts', 'S', '3,00,000'], ['Power', 'S', '1,60,000'], ['Canteen', 'S', '1,00,000']],
      bases: [['HP of machines', '300 300 200 - - - -'], ['Workers', '20 15 15 - - - -'], ['Stores requisitions (₹)', '2,50,000 1,50,000 1,00,000 - - - -']], items: [],
      service: [['Stores', 'Stores requisitions'], ['Time-keeping and accounts', 'Workers'], ['Power', 'HP of machines'], ['Canteen', 'Workers']] } },
    { label: 'SM Practical Problem 1 (ABC Company): primary distribution, repeated distribution of stores and general plant', values: {
      method: 'repeated', part: 'all', order: 'listed', stop: 100, round: true, rate: 'mh', job: '',
      depts: [['Machine shop', 'P', '6,200'], ['Packing', 'P', '4,700'], ['General plant', 'S', '17,170'], ['Stores & maintenance', 'S', '7,350']],
      bases: [['Floor space', '2,000 800 400 1,600'], ['Radiator sections', '45 90 30 60'], ['Employees', '20 10 3 5'], ['Investment', '6,40,000 2,00,000 10,000 1,50,000'], ['HP hours', '3,500 500 - 1,000']],
      items: [['Power', '8,000', 'HP hours'], ['Rent', '12,000', 'Floor space'], ['Fuel and heat', '6,000', 'Radiator sections'], ['Insurance', '1,000', 'Investment'], ['Trade licence fees', '2,000', 'Investment'], ['Depreciation', '1,00,000', 'Investment']],
      service: [['Stores & maintenance', '50 20 30 -'], ['General plant', 'Employees']] } }
  ];

  /* the challenge: a production department's total after secondary distribution, or the overhead a job absorbs */
  const PNAMES = [['Blending', 'Packing', 'Roasting'], ['Mixing', 'Frying', 'Packing'], ['Machining', 'Assembly', 'Finishing'], ['Cutting', 'Stitching', 'Pressing']];
  const SNAMES = [['Boiler house', 'Maintenance'], ['Stores', 'Canteen'], ['Power house', 'Tool room'], ['Stores', 'Maintenance']];
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  function shares(r, nP, other) {                                   // percentages in steps of 5 summing to 100: nP production + `other` to the other service dept
    const o = other ? 5 * ri(r, 1, 4) : 0;
    let left = 100 - o; const out = [];
    for (let i = 0; i < nP - 1; i++) { const x = 5 * ri(r, 2, Math.max(2, Math.floor(left / 5) - 2 * (nP - 1 - i))); out.push(x); left -= x; }
    out.push(left);
    return { p: out, o };
  }
  function gen(r, method) {
    const set = ri(r, 0, 3), nP = ri(r, 2, 3), P = PNAMES[set].slice(0, nP), S = SNAMES[set];
    const m = ['direct', 'step', 'simultaneous'].includes(method) ? method : ['direct', 'step', 'simultaneous'][ri(r, 0, 2)];
    const a = shares(r, nP, true), b = shares(r, nP, m !== 'step' || r() < 0.5);
    const amt = (lo, hi) => (ri(r, lo, hi) * 10000).toLocaleString('en-IN');
    const depts = P.map(nm => [nm, 'P', amt(10, 60)]).concat([[S[0], 'S', amt(4, 20)], [S[1], 'S', amt(3, 15)]]);
    const hrs = () => P.map(() => (ri(r, 4, 40) * 100).toLocaleString('en-IN')).concat(['-', '-']).join(' ');
    const bases = [['Labour hours', hrs()], ['Machine hours', hrs()]];
    const row = (sh, self) => sh.p.concat(self === 0 ? ['-', String(sh.o)] : [String(sh.o), '-']).join(' ');
    const ask = r() < 0.7 ? 'total' : 'job';
    return { method: m, part: ask === 'job' ? 'all' : 'secondary', order: 'listed', stop: 100, round: true, rate: 'more', depts, bases, items: [],
      service: [[S[0], row(a, 0)], [S[1], row(b, 1)]], job: ask === 'job' ? P.map(() => String(ri(r, 2, 40))).join(' ') : '', _ask: ask, _k: ri(r, 0, nP - 1) };
  }

  const def = {
    id: 'oh-distribution', title: 'Overhead Distribution Lab',
    blurb: 'Watch overheads move: primary distribution, then direct, step, repeated or simultaneous re-apportionment, then rates.',
    controls: [
      { id: 'method', type: 'select', label: 'Secondary distribution method', value: 'repeated', options: Object.entries(METHOD) },
      { id: 'part', type: 'select', label: 'Show', value: 'all', options: [['all', 'All three steps'], ['primary', 'Primary distribution only'], ['secondary', 'Secondary distribution only'], ['rates', 'Absorption rates only']] },
      { id: 'order', type: 'select', label: 'Order of the step method', value: 'listed', show: v => v.method === 'step', options: [['listed', 'As listed in the service table'], ['most', 'The one serving most other service departments first'], ['cost', 'Largest cost first']] },
      { id: 'stop', type: 'number', label: 'Stop the rounds below ₹ (repeated, trial and error)', short: 'Stop below ₹', value: 100, min: 0, max: 100000, show: v => v.method === 'repeated' || v.method === 'trial',
        help: 'ICAI\'s answers stop when the amounts left are "too small a figure". A repeated-distribution balance below this goes to the production departments only; trial and error stops when the amount to pass on is below it.' },
      { id: 'round', type: 'toggle', label: 'Round each amount to whole rupees (as ICAI\'s answers do)', short: 'Whole rupees', value: true },
      { id: 'rate', type: 'select', label: 'Absorption rate', value: 'more', options: [['mh', 'Machine hour rate'], ['lh', 'Labour hour rate'], ['more', 'Larger base per department']], help: '"Larger base": machine hours for a department that runs more machine hours than labour hours, labour hours otherwise (ICAI\'s "most appropriate rate"). The hours are the "Machine hours" and "Labour hours" rows of the bases table.' },
      { id: 'depts', type: 'table', label: 'Departments (P = production, S = service) and the overheads already allocated to them', short: 'Departments', max: 8, rows: TAPRI.depts, cols: DEPT_COLS },
      { id: 'bases', type: 'table', label: 'Bases: one figure per department, in table order (rows named Machine hours and Labour hours also set the rates)', short: 'Bases', max: 10, rows: TAPRI.bases,
        cols: [{ id: 'b', label: 'Basis', type: 'text' }, { id: 'q', label: 'Figures per department', type: 'text' }] },
      { id: 'items', type: 'table', label: 'Overheads to distribute (basis: a basis name, a product like "HP × Machine hours", or "allocated" with one amount per department)', short: 'Overheads', max: 12, rows: TAPRI.items,
        cols: [{ id: 'i', label: 'Item', type: 'text' }, { id: 'a', label: 'Amount ₹', type: 'text' }, { id: 'b', label: 'Basis', type: 'text' }] },
      { id: 'service', type: 'table', label: 'Service departments, in the order they are distributed: shares to each department (%, a ratio or a basis name)', short: 'Service shares', max: 6, rows: TAPRI.service,
        cols: [{ id: 's', label: 'Service department', type: 'text' }, { id: 'w', label: 'Shares (or basis)', type: 'text' }] },
      { id: 'job', type: 'text', label: 'Hours a job spends in each production department (optional)', short: 'Job hours', value: '12 20', placeholder: 'e.g. 250 200' }
    ],
    presets, compute,
    challenge: {
      title: 'Distribute and absorb',
      gen: r => gen(r, null),
      prompt: (v, res) => {
        const S = res.sim, prod = S.D.filter(d => d.P), k = Math.min(v._k || 0, prod.length - 1);
        const how = `Using the **${METHOD[S.method].toLowerCase()}**${S.method === 'step' ? ` (close ${S.D[S.secondary.order[0]].name} first)` : ''}`;
        if (v._ask === 'job' && S.absorb.job) {
          const hs = S.absorb.job.lines.map(l => `${l.h} ${l.by === 'mh' ? 'machine' : 'labour'} hours in ${l.name}`).join(', ');
          return `${how}, find each production department's overheads and its rate per hour (machine hours where it runs more machine hours than labour hours, else labour hours; rates to two decimals). A job uses ${hs}. **How much overhead does the job absorb (₹)?**`;
        }
        return `${how}, re-apportion both service departments (whole rupees). **What are ${prod[k].name}'s total overheads after secondary distribution (₹)?**`;
      },
      solve: (res, v) => {
        const S = res.sim, prod = S.D.map((d, j) => j).filter(j => S.D[j].P), k = Math.min(v._k || 0, prod.length - 1);
        if (v._ask === 'job' && S.absorb.job) return Math.round(S.absorb.job.total * 100) / 100;
        return Math.round(S.secondary.final[prod[k]]);
      },
      tol: 3, unit: '₹', kind: 'num',
      view: (res, v) => {
        const S = res.sim, D = S.D, names = D.map(d => d.name);
        const rows = [['Overheads after primary (₹)'].concat(S.primary.totals.map(x => fmt(x)))];
        (v.service || []).forEach(rw => { const d = D.find(x => norm(x.name) === norm(rw[0])); rows.push([`${d ? d.name : rw[0]} shares (%)`].concat(String(rw[1]).split(/\s+/))); });
        rows.push(['Labour hours'].concat(D.map(d => (d.P ? fmt(d.lh) : '—'))), ['Machine hours'].concat(D.map(d => (d.P ? fmt(d.mh) : '—'))));
        return [{ type: 'table', title: 'Given', head: ['Particulars'].concat(names), rows, align: ['left'].concat(names.map(() => 'right')) }];
      },
      explain: (res, v) => {
        const S = res.sim, D = S.D, prod = D.map((d, j) => j).filter(j => D[j].P), sec = S.secondary;
        const lines = sec.rows.filter(r => r.kind !== 'totals').map(r => `${r.label}${r.kind === 'final' ? ` (total ₹${fmt(r.amount)})` : ''}: ${prod.map(j => `${D[j].name} ₹${fmt(r.cells[j])}`).join(', ')}`);
        const eq = sec.eqs ? ` Equations: ${sec.eqs.map(e => `${D[e.s].name} = ${fmt(e.c)}${e.terms.map(t => ` + ${dec(t.k)} ${D[t.t].name}`).join('')}`).join('; ')}, so ${sec.S.map((s, i) => `${D[s].name} = ₹${fmt(sec.T[i])}`).join(', ')}.` : '';
        const tot = prod.map(j => `${D[j].name} ₹${fmt(sec.final[j])}`).join(', ');
        const job = v._ask === 'job' && S.absorb.job ? ` Rates: ${S.absorb.rows.map(r => `${r.name} ₹${fmt(r.total)} ÷ ${fmt(r.hours)} = ₹${fmt(r.rate, 2)}`).join('; ')}. Job: ${S.absorb.job.lines.map(l => `${l.h} × ₹${fmt(l.rate, 2)} = ₹${fmt(l.amt, 2)}`).join(' + ')} = **₹${fmt(S.absorb.job.total, 2)}**.` : '';
        return `${eq} ${lines.join('; ')}. Totals: ${tot}.${job}`.trim();
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { num, numList, split, ratioText, parseDepts, parseBases, parseItems, parseService, findBasis, primary, secondary, absorb, solve, stepOrder, compute, def, presets, gen };
  g.__lab_def_oh_distribution = def;
})(typeof window !== 'undefined' ? window : globalThis);
