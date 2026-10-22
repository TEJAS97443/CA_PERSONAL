/* PassBook — Audit Sampling Lab (Paper 5, aud.evid.sa530; docs/LAB_GUIDE.md).
   Pure part (Node-testable through module.exports):
     randomPick(N, n, seed, digits)       simple random selection from a random number table (typed digits, or a seeded generator's)
     systematicPick(N, n, start, m, seed) interval sampling: interval = N ÷ n, one or m random starting points (Study Material p. 4.62)
     musPick(amounts, n, start, seed)     monetary unit (value-weighted) selection: every J-th rupee, J = total ÷ n (p. 4.56)
     haphazardPick(N, n, seed)            no structured technique (simulated; the chance of each voucher is unknown)
     blockPick(N, n, starts)              contiguous blocks (p. 4.63)
     sizeEffect(test, factor, change)     the direction of a factor's effect on sample size (SA 530 Appendix, pp. 4.57–4.60)
     stratify(rows)                       items examined in each stratum and the share of value they carry (pp. 4.55, 4.61)
   Sources: ICAI Study Material, Paper 5, Ch 4 §3 (Audit sampling, SA 530), pp. 4.44–4.67. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const inr = n => (GA.util && GA.util.inr ? GA.util.inr(n) : '₹' + Math.round(n).toLocaleString('en-IN'));
  const nf = n => (GA.util && GA.util.nf ? GA.util.nf(n) : Number(n).toLocaleString('en-IN'));
  const rng = seed => (GA.util && GA.util.rng ? GA.util.rng(seed) : (() => { let a = seed >>> 0 || 1; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })());
  const pc = x => `${+(+x).toFixed(1)}%`;
  const MAXN = 2000, MAXMUS = 200;

  function checkSize(N, n) {
    if (!(Number.isInteger(N) && N >= 10 && N <= MAXN)) throw new Error(`The population must be a whole number of vouchers from 10 to ${nf(MAXN)}.`);
    if (!(Number.isInteger(n) && n >= 1)) throw new Error('The sample size must be a whole number of at least 1.');
    if (n > N) throw new Error('The sample cannot be larger than the population.');
  }

  /* ---------------------------------------------------------------- random number table */
  /** how the table is read for a population of N: d-digit numbers; when N is a power of ten, d − 1 digits with 0…0 standing for N (00 = 100) */
  function tableWidth(N) { const p = Math.log10(N); return Number.isInteger(p) ? { d: p, zeroIs: N } : { d: String(N).length, zeroIs: null }; }
  /** the first `count` numbers of the random number table for draw `seed` (digits from a seeded generator) */
  function tableNumbers(N, seed, count) {
    const { d } = tableWidth(N), r = rng(((seed >>> 0) * 7919 + 17) >>> 0 || 1);
    return Array.from({ length: count }, () => { let s = ''; for (let k = 0; k < d; k++) s += Math.floor(r() * 10); return s; });
  }
  /** the digit stream: typed digits (spaces and line breaks ignored) or a seeded generator's */
  function digitStream(seed, digits) {
    const typed = String(digits == null ? '' : digits).replace(/\s+/g, '');
    if (typed && !/^\d+$/.test(typed)) throw new Error('The random number table takes digits only (spaces and new lines are ignored).');
    if (typed) { let i = 0; return () => (i < typed.length ? +typed[i++] : null); }
    const r = rng(((seed >>> 0) * 7919 + 17) >>> 0 || 1);
    return () => Math.floor(r() * 10);
  }
  function randomPick(N, n, seed, digits) {
    checkSize(N, n);
    const { d, zeroIs } = tableWidth(N), next = digitStream(seed, digits), got = new Set(), draws = [];
    let guard = 0;
    while (got.size < n) {
      if (++guard > 200000) throw new Error('The random number table ran out (try another draw).');
      let s = '';
      for (let k = 0; k < d; k++) { const x = next(); if (x == null) throw new Error(`The table ran out after ${got.size} picks: type more digits, or a smaller sample.`); s += x; }
      const x = +s === 0 && zeroIs ? zeroIs : +s;
      const why = x < 1 || x > N ? 'out' : got.has(x) ? 'repeat' : 'ok';
      if (why === 'ok') got.add(x);
      draws.push({ s, x, why });
    }
    return { picks: draws.filter(t => t.why === 'ok').map(t => t.x), draws, d, zeroIs, typed: !!String(digits || '').trim() };
  }

  /* ---------------------------------------------------------------- systematic */
  function systematicPick(N, n, start, m, seed) {
    checkSize(N, n);
    m = Math.max(1, Math.round(+m || 1));
    if (m > 4) throw new Error('Use at most 4 starting points.');
    if (n % m) throw new Error(`With ${m} starting points the sample size must divide by ${m} (each start picks the same number of vouchers).`);
    const k = Math.floor(N / n), K = k * m, r = rng(((seed >>> 0) * 104729 + 3) >>> 0 || 1);
    let starts;
    if (m === 1 && +start > 0) {
      if (+start > k) throw new Error(`The starting voucher must lie within the first interval: 1 to ${k}.`);
      starts = [+start];
    } else {
      const s = new Set(); let guard = 0;
      while (s.size < m && ++guard < 10000) s.add(1 + Math.floor(r() * K));
      starts = [...s].sort((a, b) => a - b);
    }
    const per = n / m, picks = [];
    for (let i = 0; i < per; i++) starts.forEach(s => picks.push(s + i * K));
    return { picks: picks.sort((a, b) => a - b), k, K, starts, per, m, random: !(m === 1 && +start > 0) };
  }

  /* ---------------------------------------------------------------- monetary unit sampling */
  /** Tapri's sample ledger: a skewed set of voucher amounts (many small, a few large), fixed for a population size */
  function ledger(N) {
    const r = rng(9001 + N), out = [];
    for (let i = 0; i < N; i++) {
      const u = r();
      const a = u < 0.7 ? 1000 + r() * 19000 : u < 0.94 ? 20000 + r() * 80000 : 100000 + r() * 400000;
      out.push(Math.round(a / 100) * 100);
    }
    return out;
  }
  function parseAmounts(txt) {
    const parts = String(txt == null ? '' : txt).split(/[\n;]+|,(?!\d{2,3}\b)|\s+/).map(x => x.replace(/[₹,\s]/g, '')).filter(Boolean);
    return parts.map(p => { const x = Number(p); if (!(x >= 0) || !isFinite(x)) throw new Error(`"${p}" is not an amount: type the amounts in rupees, one per line.`); return x; });
  }
  function musPick(amounts, n, start, seed) {
    const N = amounts.length;
    if (N < 2) throw new Error('Give at least two voucher amounts.');
    if (N > MAXMUS) throw new Error(`Monetary unit sampling here draws up to ${MAXMUS} vouchers.`);
    if (!(Number.isInteger(n) && n >= 1 && n <= N)) throw new Error('The sample size must be a whole number from 1 to the number of vouchers.');
    const cum = []; let t = 0;
    amounts.forEach(a => { t += a; cum.push(t); });
    if (!(t > 0)) throw new Error('The vouchers add up to nothing: give some amounts above zero.');
    const J = Math.floor(t / n);
    if (J < 1) throw new Error('The interval would be below ₹1: use a smaller sample.');
    let r0 = +start || 0;
    if (r0 > J) throw new Error(`The random start must lie within the first interval: ₹1 to ${inr(J)}.`);
    const randomStart = !(r0 > 0);
    if (randomStart) r0 = 1 + Math.floor(rng(((seed >>> 0) * 15485863 + 11) >>> 0 || 1)() * J);
    const points = [];
    for (let i = 0; i < n; i++) {
      const p = r0 + i * J;
      let lo = 0, hi = N - 1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] >= p) hi = mid; else lo = mid + 1; }
      points.push({ p, v: lo + 1, from: lo ? cum[lo - 1] + 1 : 1, to: cum[lo] });
    }
    const picks = [...new Set(points.map(x => x.v))].sort((a, b) => a - b);
    const hits = {}; points.forEach(x => (hits[x.v] = (hits[x.v] || 0) + 1));
    const value = picks.reduce((s, v) => s + amounts[v - 1], 0);
    const sure = amounts.map((a, i) => (a >= J ? i + 1 : 0)).filter(Boolean);
    return { picks, points, J, start: r0, randomStart, total: t, cum, hits, value, sure };
  }

  /* ---------------------------------------------------------------- haphazard and block */
  function haphazardPick(N, n, seed) {
    checkSize(N, n);
    const r = rng(((seed >>> 0) * 2654435761 + 5) >>> 0 || 1), got = new Set(), order = [];
    let guard = 0;
    while (order.length < n && ++guard < 100000) { const x = 1 + Math.floor(r() * N); if (!got.has(x)) { got.add(x); order.push(x); } }
    return { picks: order.slice().sort((a, b) => a - b), order };
  }
  function parseStarts(txt) {
    const xs = String(txt == null ? '' : txt).split(/[\s,;]+/).filter(Boolean).map(Number);
    if (!xs.length || xs.some(x => !Number.isInteger(x) || x < 1)) throw new Error('Type the first voucher of each block as whole numbers, e.g. "1" or "1, 301, 601".');
    return xs;
  }
  function blockPick(N, n, starts) {
    checkSize(N, n);
    const S = starts.slice().sort((a, b) => a - b);
    if (n % S.length) throw new Error(`${S.length} blocks: the sample size must divide by ${S.length} (equal blocks).`);
    const len = n / S.length, picks = [], blocks = [];
    S.forEach((s, j) => {
      if (s + len - 1 > N) throw new Error(`The block starting at ${s} runs past the last voucher (${N}).`);
      if (j && s <= S[j - 1] + len - 1) throw new Error('The blocks overlap: space their first vouchers further apart.');
      blocks.push([s, s + len - 1]);
      for (let x = s; x < s + len; x++) picks.push(x);
    });
    return { picks, blocks, len };
  }

  /* ---------------------------------------------------------------- sample size factors (SA 530 Appendix as in the Study Material) */
  const FACTORS = {
    toc: [
      { id: 'reliance', name: 'Reliance on the operating effectiveness of controls in the risk assessment', up: 'larger',
        why: 'The more assurance the auditor intends to obtain from the operating effectiveness of controls, the greater the extent of the tests of controls.' },
      { id: 'tolerable', name: 'Tolerable rate of deviation', up: 'smaller', why: 'The lower the tolerable rate of deviation, the larger the sample needs to be; so a higher tolerable rate means a smaller sample.' },
      { id: 'expected', name: 'Expected rate of deviation in the population', up: 'larger', why: 'A higher expected rate needs a larger sample for a reasonable estimate of the actual rate of deviation.' },
      { id: 'assurance', name: 'Desired assurance that the actual deviation rate does not exceed the tolerable rate', up: 'larger', why: 'The greater the assurance the auditor wants that the sample shows the true deviation rate, the larger the sample.' },
      { id: 'risk', name: 'Sampling risk the auditor is willing to accept', up: 'smaller', why: 'The lower the risk the auditor is willing to accept, the greater the sample size.' },
      { id: 'units', name: 'Number of sampling units in the population (a large population)', up: 'negligible', why: 'For large populations the actual size of the population has little, if any, effect on sample size.' }
    ],
    tod: [
      { id: 'romm', name: 'Assessed risk of material misstatement', up: 'larger', why: 'A higher assessed risk needs a lower detection risk, so more evidence from tests of details.' },
      { id: 'other', name: 'Use of other substantive procedures on the same assertion', up: 'smaller', why: 'The more the auditor relies on other substantive procedures (tests of details or analytical procedures), the less assurance is needed from sampling.' },
      { id: 'assurance', name: 'Desired assurance that tolerable misstatement is not exceeded', up: 'larger', why: 'The greater the assurance wanted that the sample shows the actual misstatement, the larger the sample.' },
      { id: 'tolerable', name: 'Tolerable misstatement', up: 'smaller', why: 'The lower the tolerable misstatement, the larger the sample; so a higher tolerable misstatement means a smaller sample.' },
      { id: 'expected', name: 'Misstatement the auditor expects to find in the population', up: 'larger', why: 'The more misstatement expected, the larger the sample needed to estimate the actual amount reasonably.' },
      { id: 'strata', name: 'Stratification of the population (where appropriate)', up: 'smaller', why: 'When a population with a wide range of values is stratified, the strata\'s samples together are generally smaller than one sample for the whole.' },
      { id: 'risk', name: 'Sampling risk the auditor is willing to accept', up: 'smaller', why: 'The lower the risk the auditor is willing to accept, the greater the sample size.' },
      { id: 'units', name: 'Number of sampling units in the population (a large population)', up: 'negligible', why: 'For large populations the size has little, if any, effect (with monetary unit sampling, a larger total value does raise the sample, unless materiality rises in proportion).' }
    ]
  };
  const FLIP = { larger: 'smaller', smaller: 'larger', negligible: 'negligible' };
  const SAY = { larger: 'Sample size increases', smaller: 'Sample size decreases', negligible: 'Little or no effect' };
  const ARROW = { larger: '↑ larger', smaller: '↓ smaller', negligible: '≈ negligible' };
  function sizeEffect(test, factor, change) {
    const F = (FACTORS[test] || []).find(f => f.id === factor);
    if (!F) throw new Error('Choose a factor from the list.');
    if (change !== 'up' && change !== 'down') throw new Error('Choose whether the factor increases or decreases.');
    return { F, effect: change === 'up' ? F.up : FLIP[F.up] };
  }

  /* ---------------------------------------------------------------- stratification */
  function stratify(rows) {
    const S = (rows || []).map((r, i) => ({ name: String(r[0] || '').trim() || `Group ${i + 1}`, count: +r[1], value: +String(r[2]).replace(/[₹,\s]/g, ''), pct: +r[3] }))
      .filter(s => s.count || s.value);
    if (S.length < 2) throw new Error('Give at least two groups (strata).');
    S.forEach(s => {
      if (!(Number.isInteger(s.count) && s.count >= 1)) throw new Error(`${s.name}: the number of balances must be a whole number of at least 1.`);
      if (!(s.value > 0)) throw new Error(`${s.name}: give the total value of the group in rupees.`);
      if (!(s.pct > 0 && s.pct <= 100)) throw new Error(`${s.name}: the percentage examined must be above 0 and at most 100.`);
      s.take = Math.min(s.count, Math.ceil((s.count * s.pct) / 100 - 1e-9));
      s.covered = (s.value * s.take) / s.count;                           // expected value examined: the group's average balance × items taken
    });
    const count = S.reduce((a, s) => a + s.count, 0), value = S.reduce((a, s) => a + s.value, 0), take = S.reduce((a, s) => a + s.take, 0), covered = S.reduce((a, s) => a + s.covered, 0);
    return { S, count, value, take, covered, itemShare: (take / count) * 100, valueShare: (covered / value) * 100 };
  }

  /* ================================================================== drawings */
  const W10 = 10;
  /** the population as a grid of at most 10 × 10 cells: one cell per voucher (N ≤ 100) or one per band of w vouchers (N > 100) */
  function grid(N, picked, latest, pattern, title) {
    const P = new Set(picked), last = new Set(latest || []);
    const cells = {}, rows = [];
    if (N <= 100) {
      for (let r0 = 0; r0 * W10 < N; r0++) {
        const row = [`${r0 * W10 + 1}–${Math.min(N, r0 * W10 + W10)}`];
        for (let c = 0; c < W10; c++) {
          const x = r0 * W10 + c + 1;
          if (x > N) { row.push(''); continue; }
          const pat = pattern > 0 && x % pattern === 0;
          row.push(String(x) + (pat ? '•' : ''));
          const k = last.has(x) ? 'a' : P.has(x) ? (pat ? 'b' : 'd') : pat ? 'c' : null;
          if (k) cells[`${r0},${c + 1}`] = k;
        }
        rows.push(row);
      }
      /* each cell is its own voucher number, so no header row and no row labels: ten narrow columns fit a phone (CSS: lab: sampling) */
      rows.forEach(r => r.shift());
      Object.keys(cells).forEach(k => { const [a, b] = k.split(','); cells[`${a},${b - 1}`] = cells[k]; delete cells[k]; });
      return { type: 'table', title: title || `The population: ${nf(N)} vouchers`, head: [], rows, cells, rowClass: rows.map(() => 'smp-g'), align: Array(W10).fill('center') };
    }
    const w = Math.ceil(N / 100), per = 10 * w, nb = Math.ceil(N / w);
    for (let r0 = 0; r0 * 10 < nb; r0++) {
      const lo = r0 * per + 1, hi = Math.min(N, (r0 + 1) * per);
      const row = [`${nf(lo)}–${nf(hi)}`];
      for (let c = 0; c < 10; c++) {
        const b = r0 * 10 + c;
        if (b >= nb) { row.push(''); continue; }
        const a = b * w + 1, z = Math.min(N, a + w - 1), inside = [];
        for (let x = a; x <= z; x++) if (P.has(x)) inside.push(x);
        row.push(inside.length ? (inside.length > 2 ? `${inside.slice(0, 2).join(', ')} +${inside.length - 2}` : inside.join(', ')) : '·');
        if (inside.some(x => last.has(x))) cells[`${r0},${c + 1}`] = 'a'; else if (inside.length) cells[`${r0},${c + 1}`] = 'd';
      }
      rows.push(row);
    }
    return { type: 'table', title: title || `The population: ${nf(N)} vouchers in bands of ${w}; a cell lists the vouchers picked in its band`,
      head: [], rows, rowLabels: true, cells, rowClass: rows.map(() => 'smp-g'), align: ['left'].concat(Array(10).fill('center')) };
  }
  /** the random number table as read so far, ten numbers to a row (the last `rows` rows): kept numbers coloured, skipped ones faint */
  function numTable(draws, upto, latest, rows, plain) {
    const seen = draws.slice(0, upto), R = Math.ceil(seen.length / 10), from = Math.max(0, R - (rows || 5)), cells = {}, out = [], last = new Set(latest || []);
    for (let q = from; q < R; q++) {
      const row = [`row ${q + 1}`];
      for (let c = 0; c < 10; c++) {
        const i = q * 10 + c, t = seen[i];
        row.push(t ? t.s : '');
        if (t && !plain) cells[`${q - from},${c + 1}`] = t.why !== 'ok' ? 'mute' : last.has(i) ? 'a' : 'd';
      }
      out.push(row);
    }
    return { type: 'table', title: `Random number table, read left to right${from ? ` (rows ${from + 1}–${R})` : ''}`, head: [], rows: out, rowLabels: true, cells, rowClass: out.map(() => 'smp-g'), align: ['left'].concat(Array(10).fill('center')) };
  }
  const brief = n => (n >= 1e7 ? `₹${+(n / 1e7).toFixed(2)} crore` : n >= 1e5 ? `₹${+(n / 1e5).toFixed(2)} lakh` : inr(n));
  /** a y axis from 0 with 4–6 round ticks labelled in lakh / crore */
  function niceAxis(maxv) {
    const raw = (Math.max(1, maxv) * 1.12) / 4, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
    const step = (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p, top = Math.ceil((Math.max(1, maxv) * 1.12) / step) * step, ticks = [];
    for (let v = 0; v <= top + step / 1e6; v += step) ticks.push([v, v ? brief(v) : '0']);
    return { top, ticks };
  }
  function amountsPlot(amounts, J, picked, latest) {
    const P = new Set(picked), last = new Set(latest || []), N = amounts.length;
    const ax = niceAxis(Math.max(J, ...amounts));
    const ser = [['rest', 'mute', 'not picked'], ['pick', 'b', 'picked'], ['new', 'a', 'just picked']].map(([k, c, lab]) => ({ k, label: lab, bars: true, color: c, bw: 0.7,
      pts: amounts.map((a, i) => [i + 1, a]).filter(([x]) => (k === 'new' ? last.has(x) : k === 'pick' ? P.has(x) && !last.has(x) : !P.has(x))) })).filter(s => s.pts.length);
    const step = N <= 20 ? 1 : N <= 50 ? 5 : N <= 100 ? 10 : 20;
    const xt = []; for (let x = step === 1 ? 1 : step; x <= N; x += step) xt.push(x);
    return { type: 'plot', alt: 'Voucher amounts as bars, with the sampling interval as a line', title: `Voucher amounts; the dashed line is the interval ${inr(J)}`, w: 600, h: 280,
      x: [0.3, N + 0.7], y: [0, ax.top], yticks: ax.ticks, legend: 'outside', xlabel: 'voucher number', ylabel: 'amount', xticks: xt,
      series: [{ label: `interval ${inr(J)}: anything taller is always picked`, fn: String(J), color: 'warn', dash: true }].concat(ser.map(s => ({ label: s.label, bars: s.bars, color: s.color, bw: s.bw, pts: s.pts }))) };
  }
  function pointsTable(S, upto, show) {
    const rows = S.points.slice(0, upto).map((x, i) => [String(i + 1), inr(x.p), `${inr(x.from)} – ${inr(x.to)}`, `#${x.v}`]);
    const from = Math.max(0, rows.length - show);
    return { type: 'table', title: `Selection points: start ${inr(S.start)}, then every ${inr(S.J)}${from ? ` (last ${show})` : ''}`, head: ['#', 'Rupee', 'Falls in the range', 'Voucher'], rows: rows.slice(from), align: ['right', 'right', 'right', 'left'] };
  }

  /* ================================================================== compute: pick the sample */
  const METHOD = {
    random: { name: 'Simple random selection', stat: 'Yes: each voucher has a known, equal chance' },
    systematic: { name: 'Systematic (interval) selection', stat: 'Yes, with a random start' },
    mus: { name: 'Monetary unit sampling', stat: 'Yes: value-weighted, the conclusion is in rupees' },
    haphazard: { name: 'Haphazard selection', stat: 'No: not appropriate for statistical sampling' },
    block: { name: 'Block selection', stat: 'No: rarely valid for conclusions about the whole population' }
  };
  /** a results table of picks, ten to a row */
  const pickRows = (list, head) => { const rows = []; for (let i = 0; i < list.length; i += 10) rows.push([`${i + 1}–${Math.min(list.length, i + 10)}`, list.slice(i, i + 10).join(', ')]); return { head: [head || 'Picks', 'Vouchers'], rows }; };
  /** frames for picks revealed in order: one frame per pick, grouped when there are many (≤ 60 pick frames) */
  const chunks = (list, max) => { const k = Math.max(1, Math.ceil(list.length / max)), out = []; for (let i = 0; i < list.length; i += k) out.push(list.slice(i, i + k)); return out; };

  function computeSelect(v) {
    const method = v.method, N = Math.round(+v.pop), n = Math.round(+v.n), seed = Math.max(1, Math.round(+v.seed || 1));
    const frames = [];
    let stats = [], table = null, note = '', sim = { method };
    if (method === 'random') {
      const S = randomPick(N, n, seed, v.digits);
      const okIdx = S.draws.map((t, i) => (t.why === 'ok' ? i : -1)).filter(i => i >= 0);
      frames.push({ caption: `**Simple random selection.** Every voucher has an equal chance. Read the random number table in ${S.d}-digit numbers${S.zeroIs ? ` (${'0'.repeat(S.d)} stands for ${nf(S.zeroIs)})` : ''}; keep a number that names a voucher from 1 to ${nf(N)}, skip the rest and any repeat.`,
        view: [numTable(S.draws.map(t => Object.assign({}, t, { why: 'ok' })), Math.min(20, S.draws.length), [], 2, true), grid(N, [])] });
      const groups = chunks(okIdx, 60);
      let prev = -1;
      groups.forEach(gp => {
        const end = gp[gp.length - 1], skipped = S.draws.slice(prev + 1, end + 1).filter(t => t.why !== 'ok');
        const took = gp.map(i => S.draws[i].x), sofar = S.draws.slice(0, end + 1).filter(t => t.why === 'ok').map(t => t.x);
        const sk = skipped.length ? ` Skipped ${skipped.slice(0, 6).map(t => `${t.s} (${t.why === 'out' ? (t.x === 0 ? 'no voucher 0' : 'above ' + nf(N)) : 'repeat'})`).join(', ')}${skipped.length > 6 ? ` and ${skipped.length - 6} more` : ''}.` : '';
        frames.push({ caption: `${gp.length > 1 ? `Picks ${sofar.length - gp.length + 1}–${sofar.length}` : `Pick ${sofar.length}`}: ${took.map(x => `voucher **${x}**`).join(', ')}.${sk}`,
          view: [numTable(S.draws, end + 1, gp), grid(N, sofar, took)] });
        prev = end;
      });
      const out = S.draws.filter(t => t.why === 'out').length, rep = S.draws.filter(t => t.why === 'repeat').length;
      frames[frames.length - 1].caption += ` Done: ${nf(n)} vouchers from ${nf(S.draws.length)} table numbers (${nf(out)} out of range, ${nf(rep)} repeat${rep === 1 ? '' : 's'}). Random selection suits a homogeneous population.`;
      stats = [{ label: 'Vouchers picked', value: nf(n) }, { label: 'Table numbers read', value: nf(S.draws.length), hint: `${S.d}-digit numbers` }, { label: 'Share of items', value: pc((n / N) * 100) }, { label: 'Statistical?', value: 'Yes', hint: METHOD.random.stat }];
      table = pickRows(okIdx.map(i => S.draws[i].x));
      note = `**Conventions.** ${S.typed ? 'The random number table is the digits typed.' : 'The random number table\'s digits come from a seeded generator (change the draw number for another table).'} It is read in ${S.d}-digit numbers${S.zeroIs ? `, with ${'0'.repeat(S.d)} standing for ${nf(S.zeroIs)}` : ''}; out-of-range numbers and repeats are skipped (selection without replacement).`;
      sim = Object.assign(sim, S);
    } else if (method === 'systematic') {
      const S = systematicPick(N, n, v.start, v.starts, seed), pattern = Math.max(0, Math.round(+v.pattern || 0));
      const order = [];
      for (let i = 0; i < S.per; i++) S.starts.forEach(s => order.push(s + i * S.K));
      frames.push({ caption: `**Systematic selection.** Interval = population ÷ sample size = ${nf(N)} ÷ ${nf(n)} = **${nf(S.k)}**${N % n ? ` (rounded down; ${nf(N - S.k * n)} vouchers at the end can still be reached only through the start)` : ''}. ${S.m > 1 ? `With ${S.m} random starts, each start steps ${nf(S.m)} × ${nf(S.k)} = ${nf(S.K)}.` : S.random ? 'The start is drawn at random within the first interval.' : 'The start is given.'}${pattern ? ` • marks a hidden pattern: every ${pattern}th voucher comes from the Bhopal café.` : ''}`,
        view: [grid(N, [], [], pattern)] });
      frames.push({ caption: S.m > 1 ? `Starting points: **${S.starts.join(', ')}**, all within the first ${nf(S.K)} vouchers. More than one random start lowers the risk that the interval matches a pattern in the population.` : `Start at voucher **${S.starts[0]}** (within 1–${nf(S.k)}), then take every ${nf(S.k)}th voucher.`,
        view: [grid(N, S.starts, S.starts, pattern)] });
      const rest = order.filter(x => !S.starts.includes(x)), groups = chunks(rest, 55);
      const shown = S.starts.slice();
      groups.forEach(gp => {
        gp.forEach(x => shown.push(x));
        frames.push({ caption: gp.length > 1 ? `Next: vouchers ${gp.join(', ')} (each ${nf(S.K)} after the one before in its run).` : `Next: voucher **${gp[0]}** = ${gp[0] - S.K} + ${nf(S.K)}.`, view: [grid(N, shown, gp, pattern)] });
      });
      const hits = pattern ? S.picks.filter(x => x % pattern === 0).length : 0, expect = pattern ? (n / pattern) : 0;
      let tail = ` Done: ${nf(n)} vouchers.`;
      if (pattern) {
        const fair = `a fair share would be about ${+expect.toFixed(1)}`;
        if (hits === 0 || hits === n) tail += ` **The interval lines up with the pattern:** the sample holds ${hits === 0 ? 'none' : 'only'} of the Bhopal café's vouchers (${fair}). The Study Material's warning: check that the population is not structured to match the interval; more than one random start lowers this risk.`;
        else if (S.m > 1) tail += ` With ${S.m} random starts the sample holds ${hits} of the Bhopal café's vouchers: no longer all or none, though still not a fair share (${fair}). The real safeguard is to check that the population is not structured to match the interval.`;
        else tail += ` The sample holds ${hits} of the Bhopal café's vouchers (${fair}).`;
      }
      frames[frames.length - 1].caption += tail;
      stats = [{ label: 'Sampling interval', value: nf(S.k), hint: 'sampling units in the population ÷ sample size' }, { label: S.m > 1 ? 'Random starts' : 'Start', value: S.starts.join(', ') }, { label: 'Vouchers picked', value: nf(n) }]
        .concat(pattern ? [{ label: 'Pattern vouchers in the sample', value: `${hits} of ${nf(n)}`, tone: hits === 0 || hits === n ? 'bad' : 'ok', hint: `every ${pattern}th voucher is from one café` }] : [{ label: 'Statistical?', value: 'Yes', hint: METHOD.systematic.stat }]);
      table = pickRows(S.picks);
      note = '**Conventions.** Interval = population ÷ sample size, rounded down. A start of 0 means a random start within the first interval. With several starts, each start steps by (number of starts × interval) so the sample size is unchanged.';
      sim = Object.assign(sim, S, { hits, pattern });
    } else if (method === 'mus') {
      const amounts = String(v.amounts || '').trim() ? parseAmounts(v.amounts) : ledger(Math.min(N, MAXMUS));
      if (!String(v.amounts || '').trim() && N > MAXMUS) throw new Error(`Monetary unit sampling here draws up to ${MAXMUS} vouchers: lower the population.`);
      const S = musPick(amounts, n, v.mstart, seed), NN = amounts.length;
      frames.push({ caption: `**Monetary unit sampling.** The sampling unit is each rupee, not each voucher: ${nf(NN)} vouchers total **${inr(S.total)}**. Interval = ${inr(S.total)} ÷ ${nf(n)} = **${inr(S.J)}**; ${S.randomStart ? 'a random start' : 'the start'} of ${inr(S.start)} gives the selection points.`,
        view: [amountsPlot(amounts, S.J, [], [])] });
      const groups = chunks(S.points.map((x, i) => i), 50);
      groups.forEach(gp => {
        const upto = gp[gp.length - 1] + 1, sofar = [...new Set(S.points.slice(0, upto).map(x => x.v))], newV = [...new Set(gp.map(i => S.points[i].v))];
        const say = gp.map(i => { const x = S.points[i], again = S.points.slice(0, i).some(y => y.v === x.v); return `rupee ${inr(x.p)} falls in voucher **#${x.v}** (${inr(amounts[x.v - 1])})${again ? ', already picked: a large voucher can hold several points' : ''}`; });
        frames.push({ caption: `${gp.length > 1 ? `Points ${gp[0] + 1}–${upto}` : `Point ${upto}`}: ${say.slice(0, 3).join('; ')}${say.length > 3 ? `; and ${say.length - 3} more` : ''}.`, view: [amountsPlot(amounts, S.J, sofar, newV), pointsTable(S, upto, 6)] });
      });
      frames[frames.length - 1].caption += ` Done: ${nf(S.picks.length)} vouchers carry ${pc((S.value / S.total) * 100)} of the value. Larger vouchers have a greater chance of selection${S.sure.length ? `; the ${S.sure.length} at or above the interval were certain to be picked` : ''}.`;
      stats = [{ label: 'Interval', value: inr(S.J), hint: 'total value ÷ sample size' }, { label: 'Vouchers picked', value: `${S.picks.length} of ${nf(NN)}`, hint: 'fewer than the sample size when a voucher holds several points' },
        { label: 'Value covered', value: pc((S.value / S.total) * 100), hint: 'the picked vouchers\' share of the total' }, { label: 'Sure to be picked', value: String(S.sure.length), hint: 'vouchers at or above the interval' }];
      table = { head: ['Point', 'Rupee', 'Voucher', 'Amount (₹)'], rows: S.points.map((x, i) => [String(i + 1), inr(x.p), `#${x.v}`, inr(amounts[x.v - 1])]) };
      note = `**Conventions.** Interval = total value ÷ sample size, rounded down to a rupee; selection points are start, start + interval, …; a start of 0 means a random start within the first interval.${String(v.amounts || '').trim() ? '' : ' Without typed amounts, the vouchers come from Tapri\'s sample ledger (many small, a few large).'}`;
      sim = Object.assign(sim, S, { amounts });
    } else if (method === 'haphazard') {
      const S = haphazardPick(N, n, seed);
      frames.push({ caption: '**Haphazard selection.** Bunty picks vouchers without any structured technique, yet without conscious bias: he does not skip hard-to-find vouchers, and does not always choose (or avoid) the first or last entry on a page.', view: [grid(N, [])] });
      const groups = chunks(S.order, 50), sofar = [];
      groups.forEach(gp => { gp.forEach(x => sofar.push(x)); frames.push({ caption: `${gp.length > 1 ? 'He picks' : 'He picks voucher'} **${gp.join(', ')}**: no table, no interval.`, view: [grid(N, sofar, gp)] }); });
      frames[frames.length - 1].caption += ' Done. With no structure, the chance of each voucher is unknown: fine for non-statistical sampling, **not appropriate for statistical sampling** (SA 530).';
      stats = [{ label: 'Vouchers picked', value: nf(n) }, { label: 'Share of items', value: pc((n / N) * 100) }, { label: 'Statistical?', value: 'No', tone: 'warn', hint: METHOD.haphazard.stat }];
      table = pickRows(S.order, 'Picked');
      note = '**Conventions.** The lab simulates a person\'s unstructured picks with a seeded generator, so a draw can be repeated; a real haphazard selection has no generator and no known chance of selection.';
      sim = Object.assign(sim, S);
    } else if (method === 'block') {
      const S = blockPick(N, n, parseStarts(v.blocks));
      frames.push({ caption: `**Block selection.** ${S.blocks.length > 1 ? `${S.blocks.length} blocks` : 'One block'} of ${nf(S.len)} contiguous vouchers. Once the first item of a block is chosen, the rest of the block follows.`, view: [grid(N, [])] });
      const sofar = [];
      S.blocks.forEach(([a, b], j) => {
        const items = []; for (let x = a; x <= b; x++) items.push(x);
        chunks(items, Math.max(2, Math.floor(12 / S.blocks.length))).forEach((gp, q) => {
          gp.forEach(x => sofar.push(x));
          frames.push({ caption: q ? `Block ${j + 1} continues: ${gp[0]}–${gp[gp.length - 1]}.` : `Block ${j + 1}: from voucher **${a}** to **${b}**.`, view: [grid(N, sofar.slice(), gp)] });
        });
      });
      frames[frames.length - 1].caption += ` Done: ${nf(n)} vouchers, all in ${S.blocks.length > 1 ? 'a few runs' : 'one run'}. Items in a sequence tend to be alike, so a block rarely supports a valid conclusion on the whole population, and a client who knows the pattern can steer misstatements around it.`;
      stats = [{ label: 'Vouchers picked', value: nf(n) }, { label: 'Blocks', value: S.blocks.map(([a, b]) => `${a}–${b}`).join(', ') }, { label: 'Statistical?', value: 'No', tone: 'warn', hint: METHOD.block.stat }];
      table = { head: ['Block', 'From', 'To'], rows: S.blocks.map(([a, b], j) => [String(j + 1), String(a), String(b)]) };
      note = '**Conventions.** Blocks are equal: the sample size is divided by the number of blocks; blocks may not overlap.';
      sim = Object.assign(sim, S);
    } else throw new Error('Choose a selection method.');
    return { frames, stats, table, note, sim };
  }

  /* ================================================================== compute: sample size factors */
  function computeSize(v) {
    const test = v.test === 'tod' ? 'tod' : 'toc', fid = test === 'toc' ? v.factorC : v.factorD;
    const E = sizeEffect(test, fid, v.change), list = FACTORS[test];
    const name = test === 'toc' ? 'tests of controls' : 'tests of details';
    const rows = list.map(f => [f.name, '']), cells = {};
    const tbl = (k, hlRow) => ({ type: 'table', title: `Factors influencing sample size for ${name} (SA 530)`, head: ['Factor', 'If it increases, the sample is'], rows: rows.map((r, i) => (i < k ? [r[0], ARROW[list[i].up]] : [r[0], ''])), cells: Object.assign({}, cells, hlRow != null ? { [`${hlRow},0`]: 'hl', [`${hlRow},1`]: 'hl' } : {}), align: ['left', 'left'] });
    const frames = [{ caption: `**SA 530:** the sample must be large enough to reduce sampling risk to an acceptably low level. The factors below, for ${name}, are considered together; each changes the size the same way whether the approach is statistical or not.`, view: [tbl(0)] }];
    list.forEach((f, i) => frames.push({ caption: `**${f.name}** up → ${f.up === 'negligible' ? 'little or no effect on the sample size' : `a **${f.up}** sample`}. ${f.why}`, view: [tbl(i + 1)] }));
    const at = list.indexOf(E.F), dir = v.change === 'up' ? 'increases' : 'decreases';
    const before = 100, after = E.effect === 'larger' ? 130 : E.effect === 'smaller' ? 70 : 100;
    const gauge = { type: 'plot', alt: 'Sample size before and after the change, direction only', title: 'Direction only (not a computed size)', w: 360, h: 220, x: [0.3, 2.7], y: [0, 150], yticks: [], xticks: [[1, 'before'], [2, 'after']], legend: 'none',
      series: [{ label: 'sample', bars: true, color: E.effect === 'larger' ? 'bad' : E.effect === 'smaller' ? 'ok' : 'mute', bw: 0.6, pts: [[1, before], [2, after]] }] };
    frames.push({ caption: `**Here:** ${E.F.name.toLowerCase()} ${dir}, so the sample size **${E.effect === 'negligible' ? 'barely changes' : E.effect === 'larger' ? 'increases' : 'decreases'}**${v.change === 'down' && E.F.up !== 'negligible' ? ' (the factor moves down, so the effect is reversed)' : ''}.`, view: [tbl(list.length, at), gauge] });
    return {
      frames,
      stats: [{ label: 'Effect on sample size', value: SAY[E.effect], tone: E.effect === 'larger' ? 'warn' : 'ok' }, { label: 'Test', value: test === 'toc' ? 'Tests of controls' : 'Tests of details' }, { label: 'Factor', value: E.F.name }],
      table: { head: ['Factor', 'If it increases', 'Why'], rows: list.map(f => [f.name, SAY[f.up], f.why]) },
      note: '**Conventions.** Directions follow the examples in SA 530\'s Appendix as the Study Material lists them (pp. 4.57–4.60), each with the other factors held constant. The bars show the direction only.',
      sim: E
    };
  }

  /* ================================================================== compute: stratification */
  function computeStrata(v) {
    const R = stratify(v.strata), frames = [];
    const hdr = ['Group', 'Balances', 'Value (₹)', '% examined', 'Examined'];
    const tbl = (k, cells) => ({ type: 'table', title: 'Stratified sampling', head: hdr, rows: R.S.slice(0, k).map(s => [s.name, nf(s.count), inr(s.value), pc(s.pct), nf(s.take)]).concat(k === R.S.length ? [['Total', nf(R.count), inr(R.value), '', nf(R.take)]] : []), cells: cells || {}, align: ['left', 'right', 'right', 'right', 'right'] });
    const share = k => ({ type: 'plot', alt: 'Each group\'s share of the items and of the value', title: 'Share of items vs share of value, by group', w: 560, h: 270, x: [0.4, R.S.length + 0.6], y: [0, 100], legend: 'outside', ylabel: '% of the population',
      xticks: R.S.map((s, i) => [i + 1, String(i + 1)]), series: [
        { label: '% of the items', bars: true, values: true, color: 'b', bw: 0.36, pts: R.S.slice(0, k).map((s, i) => [i + 0.8, +((s.count / R.count) * 100).toFixed(1), pc((s.count / R.count) * 100)]) },
        { label: '% of the value', bars: true, values: true, color: 'd', bw: 0.36, pts: R.S.slice(0, k).map((s, i) => [i + 1.2, +((s.value / R.value) * 100).toFixed(1), pc((s.value / R.value) * 100)]) }] });
    frames.push({ caption: `**${nf(R.count)} balances worth ${inr(R.value)}**, from a few large ones to many small ones: a heterogeneous population. One random sample would treat a big balance like a small one, so the auditor divides it into groups (strata) of similar balances.`, view: [share(0)] });
    R.S.forEach((s, i) => {
      frames.push({ caption: `**${s.name}:** ${nf(s.count)} balances, ${pc((s.count / R.count) * 100)} of the items but ${pc((s.value / R.value) * 100)} of the value. Examine ${pc(s.pct)}: ${s.pct >= 100 ? '**all of them**' : `${nf(s.count)} × ${pc(s.pct)} = **${nf(s.take)}**`}${s.pct < 100 && s.take !== (s.count * s.pct) / 100 ? ' (rounded up)' : ''}, chosen at random within the group.`,
        view: [tbl(i + 1, { [`${i},0`]: 'hl', [`${i},4`]: 'hl' }), share(i + 1)] });
    });
    frames.push({ caption: `**Total: ${nf(R.take)} balances (${pc(R.itemShare)} of the items), expected to carry about ${pc(R.valueShare)} of the value.** Effort goes where the money is. A group's results are projected only to that group; the auditor combines the groups to conclude on the whole.`,
      view: [tbl(R.S.length, { [`${R.S.length},4`]: 'hl' }), share(R.S.length)] });
    return {
      frames,
      stats: [{ label: 'Balances examined', value: nf(R.take), hint: 'the sum over the groups' }, { label: 'Share of items', value: pc(R.itemShare) }, { label: 'Expected share of value', value: pc(R.valueShare), hint: 'each group\'s value × its share examined' }, { label: 'Groups', value: String(R.S.length) }],
      table: { head: hdr, rows: R.S.map(s => [s.name, nf(s.count), inr(s.value), pc(s.pct), nf(s.take)]) },
      note: '**Conventions.** Items examined in a group = balances × percentage, rounded up. The share of value examined is an expectation (the group\'s average balance × the items examined); a group examined in full is exact.',
      sim: R
    };
  }

  /* ================================================================== the lab */
  let lastMode = 'select', lastMethod = 'systematic';   // the last good compute: challenge.gen follows its mode and method (framework: problem())
  function compute(v) {
    const res = v.mode === 'size' ? computeSize(v) : v.mode === 'strata' ? computeStrata(v) : computeSelect(v);
    lastMode = v.mode === 'size' || v.mode === 'strata' ? v.mode : 'select';
    if (lastMode === 'select') lastMethod = v.method;
    return res;
  }
  const isSel = v => v.mode === 'select', isSize = v => v.mode === 'size', isStr = v => v.mode === 'strata';
  const SM_STRATA = [['Above ₹10,00,000', 6, 7200000, 100], ['₹7,75,001 to ₹10,00,000', 12, 10500000, 25], ['₹5,50,001 to ₹7,75,000', 30, 19500000, 10], ['₹2,25,001 to ₹5,50,000', 80, 30000000, 5], ['₹2,25,000 and below', 400, 24000000, 2]];
  const presets = [
    { label: 'Tapri\'s purchase vouchers: 100 vouchers, a sample of 10 from the random number table', values: { mode: 'select', method: 'random', pop: 100, n: 10, seed: 1 } },
    { label: 'PYQ May 2026, Q1(b) (Ocean Ltd): 100 of 1,000 receivable accounts, starting at account 5', values: { mode: 'select', method: 'systematic', pop: 1000, n: 100, start: 5, starts: 1, pattern: 0, seed: 1 } },
    { label: 'MTP Sep 2025 Series I, Q4–5: confirmations to 20 of 100 trade receivables, a random start', values: { mode: 'select', method: 'systematic', pop: 100, n: 20, start: 0, starts: 1, pattern: 0, seed: 4 } },
    { label: 'MTP May 2025 Series II, Q3: every 11th of 550 creditors\' balances', values: { mode: 'select', method: 'systematic', pop: 550, n: 50, start: 0, starts: 1, pattern: 0, seed: 2 } },
    { label: 'The Study Material\'s warning: every 10th sale is from one café and the interval is 10', values: { mode: 'select', method: 'systematic', pop: 100, n: 10, start: 0, starts: 1, pattern: 10, seed: 5 } },
    { label: 'The same pattern, two random starts', values: { mode: 'select', method: 'systematic', pop: 100, n: 10, start: 0, starts: 2, pattern: 10, seed: 5 } },
    { label: 'Monetary unit sampling: 12 of Tapri\'s 40 debtor balances', values: { mode: 'select', method: 'mus', pop: 40, n: 12, mstart: 0, seed: 5, amounts: '' } },
    { label: 'Modelled on RTP May 2025, Q3: loans and advances picked with no structured approach', values: { mode: 'select', method: 'haphazard', pop: 60, n: 8, seed: 6 } },
    { label: 'PYQ Sep 2024, Q1(b)(ii): 50 consecutive cheques out of 600', values: { mode: 'select', method: 'block', pop: 600, n: 50, blocks: '201' } },
    { label: 'PYQ May 2026, Q1(b)(iii): the first 150 of 1,000 customer accounts', values: { mode: 'select', method: 'block', pop: 1000, n: 150, blocks: '1' } },
    { label: 'PYQ Jan 2026, Q2 (Skill Edge): tolerable misstatement raised from ₹1,00,000 to ₹2,00,000', values: { mode: 'size', test: 'tod', factorD: 'tolerable', change: 'up' } },
    { label: 'MTP Sep 2024 Series I, Q8 (Priority Ltd): tolerable misstatement raised from ₹5 lakh to ₹10 lakh', values: { mode: 'size', test: 'tod', factorD: 'tolerable', change: 'up' } },
    { label: 'PYQ May 2026, Q3(a): Beta Engineering expects a 6% deviation rate, Alpha 2%', values: { mode: 'size', test: 'toc', factorC: 'expected', change: 'up' } },
    { label: 'PYQ Sep 2025, Q5 (CA Rajesh): more reliance on the operating effectiveness of controls', values: { mode: 'size', test: 'toc', factorC: 'reliance', change: 'up' } },
    { label: 'Study Material pp. 4.61–4.62: receivables in five groups (counts, values and the fourth group\'s 5% are illustrative)', values: { mode: 'strata', strata: SM_STRATA } },
    { label: 'Modelled on PYQ Sep 2024, Q1(b)(i): receivables above ₹20 lakh, ₹10–20 lakh and below ₹10 lakh', values: { mode: 'strata', strata: [['Above ₹20 lakh', 8, 24000000, 100], ['₹10 lakh to ₹20 lakh', 40, 52000000, 25], ['Below ₹10 lakh', 600, 66000000, 5]] } }
  ];

  /* ---------------------------------------------------------------- challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const ordinal = k => k + (k % 100 >= 11 && k % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][k % 10] || 'th');
  function genSelect(r) {
    const method = ['systematic', 'random', 'mus', 'block'].includes(lastMethod) && r() < 0.7 ? lastMethod : pick(r, ['systematic', 'systematic', 'random', 'mus', 'block']);
    if (method === 'systematic') {
      const n = pick(r, [10, 20, 25, 40, 50]), k = 2 + Math.floor(r() * 18), N = n * k + Math.floor(r() * k), start = 1 + Math.floor(r() * k);
      return { mode: 'select', method, pop: Math.min(N, MAXN), n, start, starts: 1, pattern: 0, seed: 1, ask: 2 + Math.floor(r() * (n - 2)) };
    }
    if (method === 'random') {
      const N = pick(r, [50, 60, 80, 90, 100]), seed = 1 + Math.floor(r() * 500), nx = digitStream(seed);
      const d = tableWidth(N).d, digits = Array.from({ length: 40 }, () => Array.from({ length: d }, () => nx()).join('')).join(' ');
      return { mode: 'select', method, pop: N, n: 4, seed, digits, ask: 2 + Math.floor(r() * 3) };
    }
    if (method === 'mus') {
      const N = 8 + Math.floor(r() * 5), amounts = Array.from({ length: N }, () => (1 + Math.floor(r() * 40)) * 1000), n = 4;
      const t = amounts.reduce((a, b) => a + b, 0), J = Math.floor(t / n);
      return { mode: 'select', method, pop: N, n, mstart: 1 + Math.floor(r() * J), seed: 1, amounts: amounts.join('\n'), ask: 2 + Math.floor(r() * 3) };
    }
    const N = pick(r, [200, 300, 500, 600]), len = pick(r, [10, 20, 25, 50]), m = pick(r, [1, 2, 3]);
    const gap = Math.floor(N / m), starts = Array.from({ length: m }, (_, j) => j * gap + 1 + Math.floor(r() * (gap - len)));
    return { mode: 'select', method: 'block', pop: N, n: len * m, blocks: starts.join(', '), ask: m };
  }
  const challenge = {
    title: 'Which items, and which way does the sample move?',
    gen(r) {
      const mode = lastMode;
      if (mode === 'select') return genSelect(r);
      if (mode === 'size') { const test = pick(r, ['toc', 'tod']); return { mode, test, factorC: pick(r, FACTORS.toc).id, factorD: pick(r, FACTORS.tod).id, change: r() < 0.6 ? 'up' : 'down' }; }
      const groups = [['Above ₹20 lakh', 100], ['₹10 lakh to ₹20 lakh', pick(r, [50, 25, 20])], ['₹2 lakh to ₹10 lakh', pick(r, [10, 5])], ['Below ₹2 lakh', pick(r, [5, 2, 1])]].slice(0, 3 + Math.floor(r() * 2));
      return { mode, strata: groups.map(([n, p], i) => [n, (i ? 20 * (1 + Math.floor(r() * (5 * i + 4))) : 2 + Math.floor(r() * 8)), (5 - i) * 10000000 + Math.floor(r() * 100) * 100000, p]) };
    },
    kind: v => (v.mode === 'size' ? 'choice' : 'num'),
    choices: () => [['larger', 'Sample size increases'], ['smaller', 'Sample size decreases'], ['negligible', 'Little or no effect']],
    prompt(v) {
      if (v.mode === 'size') { const f = (FACTORS[v.test].find(x => x.id === (v.test === 'toc' ? v.factorC : v.factorD)) || {}).name; return `In ${v.test === 'toc' ? 'tests of controls' : 'tests of details'}, **${f.toLowerCase()}** ${v.change === 'up' ? 'goes up' : 'goes down'}, other things being equal. What happens to the sample size?`; }
      if (v.mode === 'strata') return 'The auditor examines the stated percentage of the balances in each group (rounding up). How many balances does he examine in all?';
      if (v.method === 'systematic') return `Systematic selection: ${v.n} of ${v.pop} vouchers, starting at voucher ${v.start}. Which voucher is the ${ordinal(v.ask)} pick?`;
      if (v.method === 'random') { const W = tableWidth(v.pop); return `Read the random number table (the digits given), in ${W.d}-digit numbers${W.zeroIs ? ` (${'0'.repeat(W.d)} = ${v.pop})` : ''}, keeping numbers from 1 to ${v.pop} and skipping repeats. Which voucher is the ${ordinal(v.ask)} pick?`; }
      if (v.method === 'mus') return `Monetary unit sampling of ${v.n} from the vouchers listed: interval = total ÷ ${v.n}, rounded down to a rupee, and the first point is rupee ${v.mstart}. Which voucher holds the ${ordinal(v.ask)} selection point?`;
      return `Block selection: ${v.n} vouchers in equal blocks starting at ${v.blocks}. What is the last voucher of the ${ordinal(v.ask)} block?`;
    },
    solve(res, v) {
      if (v.mode === 'size') return res.sim.effect;
      if (v.mode === 'strata') return res.sim.take;
      if (v.method === 'random') return res.sim.draws.filter(t => t.why === 'ok')[v.ask - 1].x;
      if (v.method === 'systematic') return res.sim.picks[v.ask - 1];
      if (v.method === 'mus') return res.sim.points[v.ask - 1].v;
      return res.sim.blocks[v.ask - 1][1];
    },
    tol: 0, unit: '',
    view(res, v) {
      if (v.mode === 'size') return [{ type: 'table', title: 'The factors', head: ['Factor'], rows: FACTORS[v.test].map(f => [f.name]), align: ['left'] }];
      if (v.mode === 'strata') return null;
      if (v.method === 'random') {
        const { d } = tableWidth(v.pop), t = String(v.digits || '').replace(/\s+/g, ''), nums = [];
        for (let i = 0; i + d <= t.length; i += d) nums.push(t.slice(i, i + d));
        const rows = []; for (let q = 0; q * 10 < nums.length; q++) rows.push([`row ${q + 1}`].concat(nums.slice(q * 10, q * 10 + 10)));
        return [{ type: 'table', title: 'Random number table', head: [], rows, rowLabels: true, rowClass: rows.map(() => 'smp-g'), align: ['left'].concat(Array(10).fill('center')) }];
      }
      if (v.method === 'mus') { let c = 0; return [{ type: 'table', title: 'The vouchers', head: ['Voucher', 'Amount (₹)', 'Cumulative (₹)'], rows: res.sim.amounts.map((a, i) => { c += a; return [`#${i + 1}`, inr(a), inr(c)]; }), align: ['left', 'right', 'right'] }]; }
      return null;
    },
    explain(res, v) {
      if (v.mode === 'size') { const E = res.sim; return `${E.F.why} So when it ${v.change === 'up' ? 'goes up' : 'goes down'}: **${SAY[E.effect].toLowerCase()}**.`; }
      if (v.mode === 'strata') return res.sim.S.map(s => `${s.name}: ${s.count} × ${s.pct}% = ${s.take}`).join('; ') + `. Total **${res.sim.take}**.`;
      if (v.method === 'systematic') return `Interval = ${v.pop} ÷ ${v.n} = ${res.sim.k}. Picks: ${v.start}, ${v.start + res.sim.k}, … so the ${ordinal(v.ask)} is ${v.start} + ${v.ask - 1} × ${res.sim.k} = **${res.sim.picks[v.ask - 1]}**.`;
      if (v.method === 'random') { const ok = res.sim.draws.filter(t => t.why === 'ok').slice(0, v.ask).map(t => t.x); return `Keeping in-range, new numbers in order: ${ok.join(', ')}; the ${ordinal(v.ask)} is **${ok[v.ask - 1]}**.`; }
      if (v.method === 'mus') { const S = res.sim, x = S.points[v.ask - 1]; return `Total ${inr(S.total)} ÷ ${v.n} = interval ${inr(S.J)}. Point ${v.ask} = ${inr(S.start)} + ${v.ask - 1} × ${inr(S.J)} = ${inr(x.p)}, which falls in the cumulative range ${inr(x.from)}–${inr(x.to)}: voucher **#${x.v}**.`; }
      const b = res.sim.blocks[v.ask - 1]; return `Each block holds ${v.n} ÷ ${res.sim.blocks.length} = ${res.sim.len} vouchers, so the block starting at ${b[0]} ends at ${b[0]} + ${res.sim.len} − 1 = **${b[1]}**.`;
    }
  };

  const def = {
    id: 'sampling', title: 'Audit Sampling Lab',
    blurb: 'Watch random, systematic, monetary unit, haphazard and block selection pick vouchers; see what moves the sample size.',
    controls: [
      { id: 'mode', type: 'select', label: 'What to explore', value: 'select', options: [['select', 'Pick the sample (selection methods)'], ['size', 'What changes the sample size'], ['strata', 'Stratify the population']] },
      { id: 'method', type: 'select', label: 'Selection method', value: 'systematic', show: isSel, options: [['random', 'Simple random (random number table)'], ['systematic', 'Systematic (interval)'], ['mus', 'Monetary unit (value-weighted)'], ['haphazard', 'Haphazard'], ['block', 'Block']] },
      { id: 'pop', type: 'number', label: `Vouchers in the population (10–${nf(MAXN)})`, short: 'Population', value: 100, min: 10, max: MAXN, show: v => isSel(v) && !(v.method === 'mus' && String(v.amounts || '').trim()) },
      { id: 'n', type: 'number', label: 'Sample size', value: 10, min: 1, max: MAXN, show: isSel },
      { id: 'start', type: 'number', label: 'Starting voucher (0 = random start)', short: 'Start', value: 0, min: 0, max: MAXN, show: v => isSel(v) && v.method === 'systematic' && +v.starts <= 1 },
      { id: 'starts', type: 'number', label: 'Random starting points (1–4)', short: 'Starting points', value: 1, min: 1, max: 4, show: v => isSel(v) && v.method === 'systematic' },
      { id: 'pattern', type: 'number', label: 'Hidden pattern: every …th voucher is from one café (0 = none)', short: 'Pattern every', value: 0, min: 0, max: 200, show: v => isSel(v) && v.method === 'systematic' && +v.pop <= 100 },
      { id: 'mstart', type: 'number', label: 'Starting rupee (0 = random start)', short: 'Start (₹)', value: 0, min: 0, max: 1e10, show: v => isSel(v) && v.method === 'mus' },
      { id: 'amounts', type: 'textarea', label: 'Voucher amounts in ₹, one per line (blank = Tapri\'s sample ledger)', short: 'Amounts', value: '', rows: 4, placeholder: '12,500\n4,800\n1,20,000', show: v => isSel(v) && v.method === 'mus' },
      { id: 'digits', type: 'textarea', label: 'Random number table: digits to read (blank = generated from the draw number)', short: 'Table', value: '', rows: 3, placeholder: '37 92 05 18 64 …', show: v => isSel(v) && v.method === 'random' },
      { id: 'blocks', type: 'text', label: 'First voucher of each block', short: 'Blocks start at', value: '1', placeholder: 'e.g. 1 or 1, 301, 601', show: v => isSel(v) && v.method === 'block' },
      { id: 'seed', type: 'number', label: 'Draw number (another number, another draw)', short: 'Draw', value: 1, min: 1, max: 9999, show: v => isSel(v) && ((v.method === 'random' && !String(v.digits || '').trim()) || v.method === 'haphazard' || (v.method === 'systematic' && !(+v.start > 0 && +v.starts <= 1)) || (v.method === 'mus' && !(+v.mstart > 0))) },
      { id: 'test', type: 'seg', label: 'Test', value: 'tod', show: isSize, options: [['toc', 'Tests of controls'], ['tod', 'Tests of details']] },
      { id: 'factorC', type: 'select', label: 'Factor', value: 'expected', show: v => isSize(v) && v.test === 'toc', options: FACTORS.toc.map(f => [f.id, f.name]) },
      { id: 'factorD', type: 'select', label: 'Factor', value: 'tolerable', show: v => isSize(v) && v.test === 'tod', options: FACTORS.tod.map(f => [f.id, f.name]) },
      { id: 'change', type: 'seg', label: 'The factor', value: 'up', show: isSize, options: [['up', 'Increases'], ['down', 'Decreases']] },
      { id: 'strata', type: 'table', label: 'Groups (strata)', max: 6, show: isStr, rows: SM_STRATA.map(r => r.slice()),
        cols: [{ id: 'name', label: 'Group', type: 'text', auto: n => `Group ${n + 1}` }, { id: 'count', label: 'Balances', type: 'number', min: 1, def: 10 }, { id: 'value', label: 'Value (₹)', type: 'number', min: 0, def: 1000000 }, { id: 'pct', label: '% examined', type: 'number', min: 1, max: 100, def: 10 }] }
    ],
    presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { randomPick, systematicPick, musPick, haphazardPick, blockPick, parseStarts, parseAmounts, ledger, tableWidth, tableNumbers, sizeEffect, stratify, compute, def, FACTORS };
  g.__lab_def_sampling = def;
})(typeof window !== 'undefined' ? window : globalThis);
