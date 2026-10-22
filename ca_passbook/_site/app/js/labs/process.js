/* PassBook — Process Costing Lab (cma.proc; ICAI Study Material Paper 4, Chapter 10).
   Two modes, both pure and Node-testable (`require('app/js/labs/process.js')` exposes the helpers and compute):
     loss  process accounts with normal loss (credited at scrap value), abnormal loss and abnormal gain, one or more processes in a chain
           (the output of one is the input of the next), then the Normal Loss, Abnormal Loss and Abnormal Gain accounts
     wip   statement of equivalent production, statement of cost, statement of evaluation and the process account, with opening and
           closing work-in-process, under FIFO or weighted average
   Conventions follow the Study Material (stated in each result's note): cost per normal unit = (cost − scrap value of normal loss) ÷
   (input − normal loss units); abnormal loss and gain are valued like good units; normal loss has no equivalent units and its scrap value
   is deducted from the first cost element (material); abnormal gain is 100 % complete; amounts are rounded to the rupee (a control). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const nf = n => (GA.util && GA.util.nf ? GA.util.nf(n) : String(n));
  const inr = n => (GA.util && GA.util.inr ? GA.util.inr(n) : '₹' + n);

  /* ================================================================== small pure helpers */
  /** a forgiving number: 12,50,000 · ' 40 ' · ₹500 · 60% → number; blank or junk → NaN */
  function num(x) {
    if (typeof x === 'number') return x;
    const s = String(x == null ? '' : x).replace(/[₹,\s%]/g, '').replace(/[−–]/g, '-');
    return s === '' ? NaN : Number(s);
  }
  const num0 = x => { const n = num(x); return Number.isFinite(n) ? n : 0; };
  const clean = x => (Math.abs(x) < 1e-9 ? 0 : x);
  /** an amount as posted: to the rupee (ICAI's answers) or to the paisa */
  const money = (x, rupees) => clean(rupees ? Math.round(x + 1e-9) : Math.round(x * 100 + 1e-7) / 100);
  /** the cost per unit used for valuing: exact, or rounded to dp decimals as some ICAI answers do */
  const rateAt = (x, dp) => (dp === 2 || dp === 3 || dp === 4 ? Math.round(x * 10 ** dp + 1e-9 * Math.sign(x)) / 10 ** dp : x);
  /** an amount in a table cell (₹ is in the column head): Indian grouping, paise only when there are some */
  const amt = x => { const v = clean(x); return v.toLocaleString('en-IN', { maximumFractionDigits: 2 }); };
  /** a cost per unit as ICAI prints it: whole rupees, two decimals, or four when two would hide a difference */
  function rate(x) {
    const near = k => Math.abs(x - Math.round(x * 10 ** k) / 10 ** k) < (k > 2 ? 5e-8 : 5e-6);
    const d = near(0) ? 0 : near(2) ? 2 : near(3) ? 3 : 4;
    return (x < 0 ? '−' : '') + '₹' + Math.abs(x).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  /** units and equivalent units: Indian grouping, up to two decimals (33⅓ % of 6,000 is 2,000) */
  const un = x => { const v = clean(Math.round(x * 100) / 100); return v.toLocaleString('en-IN', { maximumFractionDigits: 2 }); };
  const pc = x => `${+(+x).toFixed(2)}%`;
  const plural = (n, w) => `${un(n)} ${w}${Math.abs(n) === 1 ? '' : 's'}`;

  /* ================================================================== mode 1: process accounts with losses */
  /** rows of the processes table [name, normal loss %, scrap ₹ a unit, output units, units passed on (0 = all)] → processes in order */
  function parseProcesses(rows) {
    const out = [], seen = new Set();
    (rows || []).forEach((r, i) => {
      const name = String(r && r[0] != null ? r[0] : '').trim();
      if (!name) throw new Error(`Row ${i + 1} of the processes table needs a name (I, II, or P, Q …).`);
      const key = name.toLowerCase();
      if (seen.has(key)) throw new Error(`Two processes are called "${name}": give each process its own name.`);
      seen.add(key);
      const nl = num0(r[1]), scrap = num0(r[2]), output = num(r[3]), next = num0(r[4]);
      if (!(nl >= 0 && nl < 100)) throw new Error(`Process ${name}: the normal loss must be a percentage from 0 to below 100.`);
      if (scrap < 0) throw new Error(`Process ${name}: the scrap value cannot be negative.`);
      if (!(output > 0)) throw new Error(`Process ${name}: give its actual output in units (more than 0).`);
      if (next < 0) throw new Error(`Process ${name}: the units passed on cannot be negative.`);
      out.push({ name, key, nl, scrap, output, next });
    });
    if (!out.length) throw new Error('Add at least one process.');
    return out;
  }
  /** rows of the cost table [process, item, units (material put in), ₹] → lines grouped by process key */
  function parseCostLines(rows, procs) {
    const by = new Map(procs.map(p => [p.key, []]));
    (rows || []).forEach((r, i) => {
      const pn = String(r && r[0] != null ? r[0] : '').trim(), item = String(r[1] == null ? '' : r[1]).trim() || 'Costs';
      const units = num0(r[2]), amount = num0(r[3]);
      if (!pn && !units && !amount) return;                              // an empty row
      if (!by.has(pn.toLowerCase())) throw new Error(`Cost line ${i + 1} is charged to process "${pn}", which is not in the processes table.`);
      if (units < 0 || amount < 0) throw new Error(`Cost line ${i + 1} (${item}): units and amounts cannot be negative.`);
      by.get(pn.toLowerCase()).push({ item, units, amount });
    });
    return by;
  }

  /** the whole chain: every process account line, the cost per normal unit, abnormal loss / gain, and the loss accounts */
  function processChain(procs, lines, o) {
    const rupees = !o || o.rupees !== false, M = x => money(x, rupees), dp = o && +o.dp;
    const res = [];
    let carryU = 0, carryV = 0, carryFrom = null;
    procs.forEach((p, k) => {
      const own = lines.get(p.key) || [];
      const dr = [];
      if (carryFrom) dr.push({ p: `To Process ${carryFrom} A/c`, u: carryU, v: carryV, kind: 'in' });
      own.forEach(l => dr.push({ p: `To ${l.item}`, u: l.units || null, v: l.amount, kind: 'cost' }));
      const input = carryU + own.reduce((a, l) => a + l.units, 0);
      const cost = carryV + own.reduce((a, l) => a + l.amount, 0);
      if (!(input > 0)) throw new Error(`Process ${p.name} has no units put in: give the units of material in its cost lines${k ? ' (or pass units on from the previous process)' : ''}.`);
      const nlU = Math.round(input * p.nl / 100 + 1e-9);
      const nlV = M(nlU * p.scrap);
      const normalOut = input - nlU;
      if (!(normalOut > 0)) throw new Error(`Process ${p.name}: the normal loss leaves no good units.`);
      if (p.output > input + 1e-9) throw new Error(`Process ${p.name}: the output (${un(p.output)}) cannot be more than the units put in (${un(input)}).`);
      const rExact = (cost - nlV) / normalOut, r = rateAt(rExact, dp);
      const ab = normalOut - p.output;                                  // > 0 abnormal loss, < 0 abnormal gain
      const alU = ab > 1e-9 ? ab : 0, agU = ab < -1e-9 ? -ab : 0;
      const alV = M(alU * r), agV = M(agU * r);
      const last = k === procs.length - 1;
      if (!last && p.next > p.output + 1e-9) throw new Error(`Process ${p.name}: it cannot pass on ${un(p.next)} units when its output is ${un(p.output)}.`);
      const passU = last ? 0 : p.next > 0 ? p.next : p.output, soldU = last ? 0 : p.output - passU;
      const nextName = last ? null : procs[k + 1].name;
      if (agU) dr.push({ p: 'To Abnormal Gain A/c', u: agU, v: agV, kind: 'gain' });
      const drU = input + agU, drV = cost + agV;
      const cr = [{ p: 'By Normal Loss A/c', u: nlU, v: nlV, kind: 'normal' }];
      if (alU) cr.push({ p: 'By Abnormal Loss A/c', u: alU, v: alV, kind: 'abloss' });
      /* the main output line takes the balancing figure (any rupee of rounding), as ICAI's answers carry the account's own total on */
      let soldV = 0;
      if (passU > 0 && soldU > 1e-9) { soldV = M(soldU * r); cr.push({ p: 'By Finished Stock A/c (not passed on)', u: soldU, v: soldV, kind: 'sold' }); }
      const mainU = passU > 0 ? passU : p.output;
      const mainV = M(drV - nlV - alV - soldV);
      const exact = mainU * r;
      cr.push({ p: passU > 0 ? `By Process ${nextName} A/c` : 'By Finished Stock A/c', u: mainU, v: mainV, kind: 'out' });
      res.push({ name: p.name, input, cost, nl: p.nl, scrap: p.scrap, nlU, nlV, normalOut, rate: r, rateExact: rExact, output: p.output, alU, alV, agU, agV,
        passU, soldU, soldV, mainU, mainV, roundDiff: M(mainV - exact), next: nextName, dr, cr, drU, drV, own });
      carryU = passU; carryV = passU > 0 ? mainV : 0; carryFrom = passU > 0 ? p.name : null;
    });
    /* the loss accounts (all processes together, a line each) */
    const nlAcc = { dr: [], cr: [] }, alAcc = { dr: [], cr: [] }, agAcc = { dr: [], cr: [] };
    let toPL_loss = 0, toPL_gain = 0;
    res.forEach(P => {
      if (P.nlU && P.nlV) {
        nlAcc.dr.push({ p: `To Process ${P.name} A/c`, u: P.nlU, v: P.nlV });
        if (P.agU) nlAcc.cr.push({ p: 'By Abnormal Gain A/c', u: P.agU, v: M(P.agU * P.scrap) });
        const realU = P.nlU - P.agU;
        if (realU > 0) nlAcc.cr.push({ p: `By Bank (scrap of ${P.name} sold)`, u: realU, v: M(P.nlV - M(P.agU * P.scrap)) });
      }
      if (P.alU) {
        const sale = M(P.alU * P.scrap), net = M(P.alV - sale);
        alAcc.dr.push({ p: `To Process ${P.name} A/c`, u: P.alU, v: P.alV });
        if (sale) alAcc.cr.push({ p: `By Bank (scrap of ${P.name} sold)`, u: P.alU, v: sale });
        alAcc.cr.push({ p: 'By Costing P&L A/c', u: null, v: net });
        toPL_loss += net;
      }
      if (P.agU) {
        const lost = M(P.agU * P.scrap), net = M(P.agV - lost);
        if (lost) agAcc.dr.push({ p: 'To Normal Loss A/c', u: P.agU, v: lost });
        agAcc.dr.push({ p: 'To Costing P&L A/c', u: null, v: net });
        agAcc.cr.push({ p: `By Process ${P.name} A/c`, u: P.agU, v: P.agV });
        toPL_gain += net;
      }
    });
    return { procs: res, nlAcc, alAcc, agAcc, toPL_loss: M(toPL_loss), toPL_gain: M(toPL_gain), rupees, dp: dp || 0 };
  }

  /* ---- drawing helpers */
  /** a two-sided ledger account: Dr lines left, Cr lines right (`hl` marks lines, `total` closes it). Returns its views: the ICAI layout, and
      on phones (under 600 px; the "lab: process" block of labs.css) the same account stacked, Dr lines then Cr lines, so nothing scrolls sideways */
  function account(title, dr, cr, o) {
    o = o || {};
    const n = Math.max(dr.length, cr.length), rows = [], cells = {};
    const tone = { gain: 'ok', abloss: 'bad' };
    const tOf = x => (x.hl ? 'hl' : o.tones !== false && tone[x.kind] ? tone[x.kind] : null);
    const cellsOf = x => [x.p, x.u != null ? un(x.u) : '', amt(x.v)];
    for (let i = 0; i < n; i++) {
      const a = dr[i], b = cr[i];
      rows.push((a ? cellsOf(a) : ['', '', '']).concat(b ? cellsOf(b) : ['', '', '']));
      [[a, 0], [b, 3]].forEach(([x, c]) => { const t = x && tOf(x); if (t) for (let j = 0; j < 3; j++) cells[`${i},${c + j}`] = t; });
    }
    const T = o.total, tot = T ? [['**Total**', T.u != null ? `**${un(T.u)}**` : '', `**${amt(T.v)}**`], ['**Total**', T.u != null ? `**${un(T.u)}**` : '', `**${amt(T.v)}**`]] : null;
    if (T) {
      rows.push(tot[0].concat(tot[1]));
      if (o.totalHl) for (let j = 0; j < 6; j++) cells[`${rows.length - 1},${j}`] = 'hl';
    }
    const wide = { type: 'table', title, head: ['Dr. Particulars', 'Units', '₹', 'Cr. Particulars', 'Units', '₹'], rows, cells, align: ['left', 'right', 'right', 'left', 'right', 'right'] };
    const D = GA.diagram;
    if (!D || typeof D.render !== 'function') return [wide];
    const nrows = [], ncells = {};
    const side = (label, list) => {
      nrows.push([`**${label}**`, '', '']);
      list.forEach(x => { nrows.push(cellsOf(x)); const t = tOf(x); if (t) for (let j = 0; j < 3; j++) ncells[`${nrows.length - 1},${j}`] = t; });
      if (!list.length) nrows.push(['—', '', '']);
      if (T) { nrows.push(tot[0].slice()); if (o.totalHl) for (let j = 0; j < 3; j++) ncells[`${nrows.length - 1},${j}`] = 'hl'; }
    };
    side('Dr. (debit side)', dr); side('Cr. (credit side)', cr);
    const narrow = { type: 'table', title, head: ['Particulars', 'Units', '₹'], rows: nrows, cells: ncells, align: ['left', 'right', 'right'] };
    const fig = t => `<figure class="dg" data-diagram="table">${D.render(t)}</figure>`;
    return [{ html: `<div class="pc-acc pc-wide">${fig(wide)}</div>` }, { html: `<div class="pc-acc pc-narrow">${fig(narrow)}</div>` }];
  }
  /** where one process's units went, as a tree: stage 0 the units put in; 1 expected good output and normal loss; 2 what actually came out */
  function unitBar(P, stage) {
    const share = n => pc(Math.round((n / P.input) * 1000) / 10), kids = [];
    const node = (label, n, color, note) => Object.assign({ label: `${label}\n${un(n)} units`, edge: share(n) }, color ? { color } : {}, note ? { note } : {});
    if (stage >= 1 && (stage < 2 || (!P.alU && !P.agU))) kids.push(node(stage < 2 ? 'Expected output' : 'Good output', P.normalOut, 'a'), node('Normal loss', P.nlU, 'mute', P.scrap ? `scrap ${rate(P.scrap)} a unit` : 'no scrap value'));
    else if (stage >= 2 && P.alU) kids.push(node('Good output', P.output, 'a'), node('Abnormal loss', P.alU, 'bad', `at ${rate(P.rate)} a unit`), node('Normal loss', P.nlU, 'mute', P.scrap ? `scrap ${rate(P.scrap)} a unit` : 'no scrap value'));
    else if (stage >= 2) kids.push(node('Good output', P.output, 'a', `expected ${un(P.normalOut)} + gain ${un(P.agU)}`), node('Actual loss', P.nlU - P.agU, 'mute', `normal ${un(P.nlU)} − gain ${un(P.agU)}`));
    const root = { label: `Process ${P.name}\n${un(P.input)} units in`, color: 'b', children: kids };
    if (stage >= 2 && P.agU) root.children[0].children = [{ label: `Abnormal gain\n${un(P.agU)} units`, color: 'ok', note: `at ${rate(P.rate)} a unit` }];
    return { type: 'tree', title: `Process ${P.name}: where the units went`, root };
  }
  const fx = (rows, title) => ({ type: 'table', title, head: ['Quantity', 'Formula', 'Value'], rows, align: ['left', 'left', 'right'] });

  function computeLoss(v) {
    const procs = parseProcesses(v.processes), lines = parseCostLines(v.costLines, procs);
    const S = processChain(procs, lines, { rupees: v.rupees !== false, dp: +v.rateDp || 0 });
    const frames = [];
    const many = S.procs.length > 1;
    frames.push({ caption: `Start: ${many ? `${S.procs.length} processes in a chain; the output of each is the input of the next` : 'one process'}. Each process account collects what went into the process on the debit side and what came out on the credit side. Press ▶ to post it line by line.`,
      view: [unitBar(S.procs[0], 0), ...account(`Process ${S.procs[0].name} Account`, [], [])] });
    S.procs.forEach((P, k) => {
      const dr = [], drAll = P.dr.filter(x => x.kind !== 'gain');
      drAll.forEach((line, i) => {
        dr.push(line);
        const why = line.kind === 'in' ? `The ${un(line.u)} units passed on by Process ${S.procs[k - 1].name} arrive at their cost, **${inr(line.v)}**: they are this process's raw material.`
          : line.u ? `**${line.p.replace(/^To /, '')}**: ${un(line.u)} units put in at ${inr(line.v)}.` : `**${line.p.replace(/^To /, '')}** ${inr(line.v)} is charged to the process.`;
        frames.push({ caption: `Process ${P.name}, debit side: ${why}${i === drAll.length - 1 ? ` Total cost so far: **${inr(P.cost)}** for ${plural(P.input, 'unit')}.` : ''}`,
          view: [unitBar(P, 0), ...account(`Process ${P.name} Account`, dr.map((x, j) => Object.assign({}, x, { hl: j === dr.length - 1 })), [])] });
      });
      const crNL = [P.cr[0]];
      frames.push({ caption: `**Normal loss** = ${pc(P.nl)} of ${un(P.input)} units = **${plural(P.nlU, 'unit')}**. It is expected, so its cost is absorbed by the good units; the process is credited only with its scrap value${P.scrap ? `: ${un(P.nlU)} × ${rate(P.scrap)} = ${inr(P.nlV)}` : ', which is nil here'}.`,
        view: [unitBar(P, 1), ...account(`Process ${P.name} Account`, dr, crNL.map(x => Object.assign({}, x, { hl: true })))] });
      frames.push({ caption: `**Cost per normal unit**: spread the cost, less what the normal loss fetches, over the units that were expected to come out: (${inr(P.cost)} − ${inr(P.nlV)}) ÷ (${un(P.input)} − ${un(P.nlU)}) = **${rate(P.rate)}** a unit. Abnormal loss and gain are valued at this rate too.`,
        view: [unitBar(P, 1), ...account(`Process ${P.name} Account`, dr, crNL), fx([['Cost to spread', 'total cost − scrap value of normal loss', `${inr(P.cost)} − ${inr(P.nlV)} = ${inr(P.cost - P.nlV)}`], ['Normal output', 'units put in − normal loss units', `${un(P.input)} − ${un(P.nlU)} = ${un(P.normalOut)}`], ['Cost per normal unit', 'cost to spread ÷ normal output', `**${rate(P.rate)}**`]], `Process ${P.name}: cost per unit`)] });
      const cr = crNL.slice();
      if (P.alU) {
        cr.push(P.cr[1]);
        frames.push({ caption: `Expected output ${un(P.normalOut)} but actual output only ${un(P.output)}: **${plural(P.alU, 'unit')} of abnormal loss**. It is not part of the product's cost: valued like good units (${un(P.alU)} × ${rate(P.rate)} = **${inr(P.alV)}**), it is credited to the process and debited to the Abnormal Loss account.`,
          view: [unitBar(P, 2), ...account(`Process ${P.name} Account`, dr, cr.map((x, j) => Object.assign({}, x, { hl: j === cr.length - 1 })))] });
      } else if (P.agU) {
        dr.push(P.dr.find(x => x.kind === 'gain'));
        frames.push({ caption: `Actual output ${un(P.output)} beats the expected ${un(P.normalOut)}: **${plural(P.agU, 'unit')} of abnormal gain**. They are valued like good units (${un(P.agU)} × ${rate(P.rate)} = **${inr(P.agV)}**) and debited to the process, with the credit to the Abnormal Gain account; the normal loss line stays at its expected figure.`,
          view: [unitBar(P, 2), ...account(`Process ${P.name} Account`, dr.map((x, j) => Object.assign({}, x, { hl: j === dr.length - 1 })), cr)] });
      } else {
        frames.push({ caption: `Actual output ${un(P.output)} = expected output: the loss was exactly normal, so there is no abnormal loss or gain.`, view: [unitBar(P, 2), ...account(`Process ${P.name} Account`, dr, cr)] });
      }
      const outs = P.cr.filter(x => x.kind === 'sold' || x.kind === 'out');
      outs.forEach(x => cr.push(x));
      const where = P.passU > 0 ? `**${un(P.passU)} units go on to Process ${P.next}**${P.soldU ? ` and ${un(P.soldU)} units go to finished stock` : ''}` : `the **${un(P.output)} good units go to finished stock**`;
      frames.push({ caption: `The good output leaves at ${rate(P.rate)} a unit: ${where}, worth **${inr(P.mainV)}**${P.soldU && P.passU ? ` (and ${inr(P.soldV)})` : ''}.${P.roundDiff ? ` (${un(P.mainU)} × ${rate(P.rate)} is ${amt(P.mainU * P.rate)}; the line takes the balancing figure, a rounding difference of ${inr(Math.abs(P.roundDiff))}.)` : ''} Both sides now total **${inr(P.drV)}** for ${plural(P.drU, 'unit')}: the account balances.`,
        view: [unitBar(P, 2), ...account(`Process ${P.name} Account`, dr, cr.map(x => Object.assign({}, x, { hl: x.kind === 'out' || x.kind === 'sold' })), { total: { u: P.drU, v: P.drV } })] });
    });
    /* the loss accounts */
    const accViews = [];
    if (S.nlAcc.dr.length) {
      const t = S.nlAcc.dr.reduce((a, x) => a + x.v, 0);
      accViews.push(...account('Normal Loss Account', S.nlAcc.dr, S.nlAcc.cr, { total: { u: S.nlAcc.dr.reduce((a, x) => a + x.u, 0), v: t }, tones: false }));
    }
    if (S.alAcc.dr.length) accViews.push(...account('Abnormal Loss Account', S.alAcc.dr, S.alAcc.cr, { total: { u: S.alAcc.dr.reduce((a, x) => a + x.u, 0), v: S.alAcc.dr.reduce((a, x) => a + x.v, 0) }, tones: false }));
    if (S.agAcc.cr.length) accViews.push(...account('Abnormal Gain Account', S.agAcc.dr, S.agAcc.cr, { total: { u: S.agAcc.cr.reduce((a, x) => a + x.u, 0), v: S.agAcc.cr.reduce((a, x) => a + x.v, 0) }, tones: false }));
    if (accViews.length) {
      const bits = [];
      if (S.alAcc.dr.length) bits.push(`the abnormal loss account sells the lost units for scrap and sends the rest, **${inr(S.toPL_loss)}**, to the Costing P&L as a loss`);
      if (S.agAcc.cr.length) bits.push(`the abnormal gain account gives back the scrap those units would have fetched as normal loss and credits the rest, **${inr(S.toPL_gain)}**, to the Costing P&L`);
      if (!bits.length) bits.push('the normal loss account records the scrap sold');
      frames.push({ caption: `Closing the loss accounts: ${bits.join('; ')}. Only abnormal items reach the Costing P&L; normal loss stays inside the cost of good units.`, view: accViews.slice() });
    }
    const lastP = S.procs[S.procs.length - 1];
    frames.push({ caption: `Done. ${S.procs.map(P => `Process ${P.name}: ${rate(P.rate)} a unit`).join('; ')}. Finished stock: **${un(lastP.mainU)} units, ${inr(lastP.mainV)}**.`,
      view: [].concat(...S.procs.map(P => account(`Process ${P.name} Account`, P.dr, P.cr, { total: { u: P.drU, v: P.drV } })), accViews) });

    const rows = S.procs.map(P => [P.name, un(P.input), un(P.nlU), un(P.output), P.alU ? `${un(P.alU)} loss` : P.agU ? `${un(P.agU)} gain` : '—', rate(P.rate), P.alU ? amt(P.alV) : P.agU ? amt(P.agV) : '—', amt(P.mainV + P.soldV)]);
    return {
      frames, sim: S, mode: 'loss',
      stats: [
        { label: `Cost per normal unit${many ? ` (Process ${lastP.name})` : ''}`, value: rate(lastP.rate), hint: '(total cost − scrap value of normal loss) ÷ (units put in − normal loss units)' },
        ...(() => {
          const al = S.procs.reduce((a, P) => a + P.alV, 0), ag = S.procs.reduce((a, P) => a + P.agV, 0), out = [];
          if (al || !ag) out.push({ label: `Abnormal loss${many ? ' (all processes)' : ''}`, value: inr(al), hint: 'abnormal loss units × cost per normal unit', tone: al ? 'bad' : '' });
          if (ag) out.push({ label: `Abnormal gain${many ? ' (all processes)' : ''}`, value: inr(ag), hint: 'abnormal gain units × cost per normal unit', tone: 'ok' });
          return out;
        })(),
        { label: 'Finished stock', value: inr(lastP.mainV), hint: `${un(lastP.mainU)} units out of the last process` },
        { label: 'Net to Costing P&L', value: inr(S.toPL_gain - S.toPL_loss), hint: 'net abnormal gain (+) or abnormal loss (−), after the scrap value of the units' }
      ],
      table: { head: ['Process', 'Units in', 'Normal loss', 'Output', 'Abnormal', 'Per unit', 'Abnormal ₹', 'Output ₹'], rows },
      note: `**Conventions.** Normal loss is a percentage of the units put into each process (including units passed on), rounded to whole units, and is credited at its scrap value. Cost per normal unit = (total cost − scrap value of normal loss) ÷ (units put in − normal loss units), as in the Study Material. Abnormal loss and abnormal gain are valued at that cost per unit${S.dp ? `, rounded to ${S.dp} decimals` : ''}; the Costing P&L gets them net of the scrap value of the units. Amounts are ${S.rupees ? 'rounded to the rupee' : 'kept to the paisa'}, and the transfer line takes the balancing figure.`
    };
  }

  /* ================================================================== mode 2: equivalent production with WIP */
  /** a list of percentages, one per cost element ("100, 40, 40"; a single number applies to every element) */
  function pctList(txt, els, what) {
    const parts = (Array.isArray(txt) ? txt : String(txt == null ? '' : txt).split(/[\s,;/]+/)).filter(x => String(x).trim() !== '').map(num);
    if (!parts.length || parts.some(x => !(x >= 0 && x <= 100))) throw new Error(`Give the ${what} % of completion as numbers from 0 to 100, one per cost element (e.g. 100, 60, 60).`);
    if (parts.length === 1) return els.map(() => parts[0]);
    if (parts.length !== els.length) throw new Error(`Give ${els.length} percentages for the ${what}, one per cost element (${els.map(e => e.name).join(', ')}).`);
    return parts;
  }
  /** rows of the cost-element table [element, opening WIP ₹, cost added ₹] with the opening and closing WIP's % of completion */
  function parseElements(rows, openPct, closePct) {
    const out = [], seen = new Set();
    (rows || []).forEach((r, i) => {
      const name = String(r && r[0] != null ? r[0] : '').trim();
      if (!name) throw new Error(`Row ${i + 1} of the cost elements needs a name (Material, Labour, Overheads …).`);
      if (seen.has(name.toLowerCase())) throw new Error(`Two cost elements are called "${name}".`);
      seen.add(name.toLowerCase());
      const open = num0(r[1]), added = num0(r[2]);
      if (open < 0 || added < 0) throw new Error(`${name}: costs cannot be negative.`);
      out.push({ name, open, added });
    });
    if (!out.length) throw new Error('Add at least one cost element (for example Material).');
    const o = pctList(openPct, out, 'opening WIP'), w = pctList(closePct, out, 'closing WIP');
    out.forEach((e, j) => { e.o = o[j]; e.w = w[j]; });
    return out;
  }
  /** the abnormal loss units' degree of completion per element */
  function abnormalPct(els, basis, txt) {
    if (basis === 'close') return els.map(e => e.w);
    if (basis !== 'own') return els.map(() => 100);
    return pctList(txt, els, 'abnormal loss units');
  }

  /** the full working: units, equivalent units, costs, rates, values and the process account */
  function equivalent(d) {
    const fifo = d.method !== 'avg', M = x => money(x, d.rupees !== false);
    const els = d.elements, O = d.open, I = d.introduced, C = d.completed, W = d.close;
    [[O, 'Opening WIP'], [I, 'Units introduced'], [C, 'Units completed'], [W, 'Closing WIP']].forEach(([x, what]) => { if (!(x >= 0)) throw new Error(`${what} must be 0 or more units.`); });
    if (!(I > 0)) throw new Error('Units introduced must be more than 0.');
    if (!(d.nlPct >= 0 && d.nlPct < 100)) throw new Error('The normal loss must be a percentage from 0 to below 100.');
    if (!(d.scrap >= 0)) throw new Error('The scrap value cannot be negative.');
    if (fifo && C < O - 1e-9) throw new Error(`Under FIFO the units completed (${un(C)}) come first from the opening WIP (${un(O)}): completed units cannot be fewer.`);
    const base = d.nlBase === 'total' ? O + I : I;
    const NL = Math.round(base * d.nlPct / 100 + 1e-9);
    const AB = O + I - C - NL - W;                                         // + abnormal loss, − abnormal gain
    if (C + W > O + I + 1e-9) throw new Error(`Units completed + closing WIP (${un(C + W)}) are more than the units available (${un(O + I)}): check the units.`);
    const AL = AB > 1e-9 ? AB : 0, AG = AB < -1e-9 ? -AB : 0;
    const ab = abnormalPct(els, d.abBasis, d.abPct);
    const scrapV = M(NL * d.scrap);
    const rows = [];                                                         // output rows of the statement of equivalent production
    if (fifo) {
      if (O) rows.push({ key: 'openDone', label: 'Opening WIP completed', units: O, pct: els.map(e => 100 - e.o) });
      rows.push({ key: 'fresh', label: O ? 'Fresh units completed' : 'Units completed', units: C - O, pct: els.map(() => 100) });
    } else rows.push({ key: 'done', label: 'Units completed', units: C, pct: els.map(() => 100) });
    rows.push({ key: 'normal', label: 'Normal loss', units: NL, pct: null });
    if (AL) rows.push({ key: 'abloss', label: 'Abnormal loss', units: AL, pct: ab.slice() });
    if (AG) rows.push({ key: 'abgain', label: 'Less: abnormal gain', units: -AG, pct: els.map(() => 100) });
    rows.push({ key: 'close', label: 'Closing WIP', units: W, pct: els.map(e => e.w) });
    rows.forEach(r => { r.eu = r.pct ? r.pct.map(p => (r.units * p) / 100) : els.map(() => 0); });
    const EU = els.map((e, j) => rows.reduce((a, r) => a + r.eu[j], 0));
    const cost = els.map((e, j) => (fifo ? 0 : e.open) + e.added - (j === 0 ? scrapV : 0));
    els.forEach((e, j) => {
      if (EU[j] < -1e-9) throw new Error(`${e.name}: the equivalent units come out negative; check the units and percentages.`);
      if (EU[j] <= 1e-9 && Math.abs(cost[j]) > 1e-9) throw new Error(`${e.name} has a cost but no equivalent units: check its % of completion.`);
    });
    const dp = +d.dp || 0, Rexact = els.map((e, j) => (EU[j] > 1e-9 ? cost[j] / EU[j] : 0)), R = Rexact.map(x => rateAt(x, dp));
    const Rsum = R.reduce((a, b) => a + b, 0);
    const openCost = els.reduce((a, e) => a + e.open, 0), addedCost = els.reduce((a, e) => a + e.added, 0);
    const valRow = key => { const r = rows.find(x => x.key === key); return r ? r.eu.map((u, j) => u * R[j]) : els.map(() => 0); };
    const sum = a => a.reduce((x, y) => x + y, 0);
    let openWork = 0, openTotal = 0, freshV = 0, transfer;
    if (fifo) {
      openWork = M(sum(valRow('openDone'))); openTotal = M(openCost + openWork); freshV = M(sum(valRow('fresh')));
      transfer = M(openTotal + freshV);
    } else transfer = M(sum(valRow('done')));
    const alV = M(sum(valRow('abloss'))), agV = M(AG * Rsum), closeV = M(sum(valRow('close')));
    const drV = M(openCost + addedCost + agV), crV0 = M(scrapV + alV + transfer + closeV), diff = M(drV - crV0);
    return { fifo, els, O, I, C, W, NL, base, AL, AG, ab, scrapV, rows, EU, cost, R, Rexact, dp, Rsum, openCost, addedCost, openWork, openTotal, freshV,
      transfer, alV, agV, closeV, drV, diff, accTransfer: M(transfer + diff), drU: O + I + AG, M };
  }

  function computeWip(v) {
    const els = parseElements(v.wipElements, v.openPct, v.closePct);
    const d = { method: v.method, elements: els, open: num0(v.openUnits), introduced: num0(v.introduced), completed: num0(v.completed), close: num0(v.closeUnits),
      nlPct: num0(v.nlPct), nlBase: v.nlBase, scrap: num0(v.scrap), abBasis: v.abBasis, abPct: v.abPct, rupees: v.rupees !== false, dp: +v.rateDp || 0 };
    const E = equivalent(d), fifo = E.fifo, nm = fifo ? 'FIFO' : 'weighted average';
    const frames = [];
    /* step 1: physical flow */
    const inRows = [['Opening WIP', un(E.O)], ['Units introduced', un(E.I)]];
    const outAll = E.rows.map(r => [r.label + (r.key === 'abloss' || r.key === 'abgain' ? ' (balancing figure)' : r.key === 'normal' ? ` (${pc(d.nlPct)} of ${un(E.base)})` : ''), un(r.units)]);
    const flow = (k, hlRow) => {
      const n = Math.max(2, outAll.length), rows = [], cells = {};
      for (let i = 0; i < n; i++) rows.push([inRows[i] ? inRows[i][0] : '', inRows[i] ? inRows[i][1] : '', i < k ? outAll[i][0] : '', i < k ? outAll[i][1] : '']);
      rows.push(['**Total**', `**${un(E.O + E.I)}**`, k >= outAll.length ? '**Total**' : '', k >= outAll.length ? `**${un(E.rows.reduce((a, r) => a + r.units, 0))}**` : '']);
      if (hlRow != null) { cells[`${hlRow},2`] = 'hl'; cells[`${hlRow},3`] = 'hl'; }
      return { type: 'table', title: 'Step 1 · Physical flow of units', head: ['Input', 'Units', 'Output', 'Units'], rows, cells, align: ['left', 'right', 'left', 'right'] };
    };
    frames.push({ caption: `**${nm}**. Step 1 is the physical flow: every unit that came in (opening WIP ${un(E.O)} + introduced ${un(E.I)} = ${un(E.O + E.I)}) must be accounted for on the output side. Press ▶ to watch.`, view: [flow(0)] });
    E.rows.forEach((r, i) => {
      let why;
      if (r.key === 'openDone') why = `Under FIFO the first units finished are the ${un(E.O)} opening WIP units: they were already part-done last period.`;
      else if (r.key === 'fresh') why = O0(E) ? `The other ${un(r.units)} of the ${un(E.C)} completed units were started and finished this period (${un(E.C)} − ${un(E.O)}).` : `${un(E.C)} units were completed and transferred.`;
      else if (r.key === 'done') why = `All ${un(E.C)} units completed are taken together: weighted average does not separate the opening WIP.`;
      else if (r.key === 'normal') why = `Normal loss = ${pc(d.nlPct)} of ${d.nlBase === 'total' ? 'total input including opening WIP' : 'units introduced'} (${un(E.base)}) = ${un(E.NL)} units${E.NL !== E.base * d.nlPct / 100 ? ' (rounded to whole units)' : ''}.`;
      else if (r.key === 'abloss') why = `Input ${un(E.O + E.I)} − completed ${un(E.C)} − normal loss ${un(E.NL)} − closing WIP ${un(E.W)} leaves **${un(E.AL)} units of abnormal loss** (the balancing figure).`;
      else if (r.key === 'abgain') why = `Completed + normal loss + closing WIP exceed the input by **${un(E.AG)} units: an abnormal gain** (the balancing figure, shown as a minus on the output side).`;
      else why = `${un(E.W)} units are still in process at the end (closing WIP).${i === E.rows.length - 1 ? ` Output = input = ${un(E.O + E.I)}.` : ''}`;
      frames.push({ caption: why, view: [flow(i + 1, i)] });
    });
    /* step 2: equivalent production */
    const eps = (k, hl) => {
      const head = ['Output', 'Units'].concat(E.els.map(e => `${e.name}: EU (% done)`));
      const rows = E.rows.map((r, i) => [r.label, un(r.units)].concat(E.els.map((e, j) => (i < k ? (r.pct ? `${un(r.eu[j])} (${pc(r.pct[j])})` : '—') : ''))));
      if (k >= E.rows.length) rows.push(['**Equivalent units**', ''].concat(E.els.map((e, j) => `**${un(E.EU[j])}**`)));
      const cells = {};
      if (hl != null) for (let c = 0; c < head.length; c++) cells[`${hl},${c}`] = 'hl';
      return { type: 'table', title: `Step 2 · Statement of equivalent production (${nm})`, head, rows, cells, align: ['left'].concat(head.slice(1).map(() => 'right')) };
    };
    E.rows.forEach((r, i) => {
      let why;
      const list = E.els.map((e, j) => `${e.name} ${un(r.units)} × ${pc(r.pct ? r.pct[j] : 0)} = ${un(r.eu[j])}`).join('; ');
      if (r.key === 'openDone') why = `The opening WIP was already done to ${E.els.map(e => `${pc(e.o)} for ${e.name.toLowerCase()}`).join(', ')}; this period only finishes the rest: ${list}.`;
      else if (r.key === 'fresh' || r.key === 'done') why = `Completed units are 100 % complete for every element: ${un(r.units)} equivalent units each.`;
      else if (r.key === 'normal') why = 'Normal loss gets **no equivalent units**: its cost is carried by the good units.';
      else if (r.key === 'abloss') why = `Abnormal loss units count as far as they were processed before they were lost (${E.els.map((e, j) => pc(E.ab[j])).join(', ')}): ${list}.`;
      else if (r.key === 'abgain') why = `Abnormal gain is treated as 100 % complete for every element and is **deducted**: ${un(-r.units)} units each.`;
      else why = `Closing WIP counts only the work done on it: ${list}.`;
      if (i === E.rows.length - 1) why += ` Total equivalent units: ${E.els.map((e, j) => `${e.name} ${un(E.EU[j])}`).join(', ')}.`;
      frames.push({ caption: `Step 2: ${why}`, view: [eps(i + 1, i)] });
    });
    /* step 3–4: cost per equivalent unit */
    const coh = fifo ? ['Element', 'Cost this period', 'Less: scrap of normal loss', 'Cost to spread', 'Equivalent units', 'Cost per EU'] : ['Element', 'Opening WIP', 'Cost this period', 'Less: scrap of normal loss', 'Cost to spread', 'Equivalent units', 'Cost per EU'];
    const costT = (k, hl) => {
      const rows = E.els.map((e, j) => (j < k ? [e.name].concat(fifo ? [] : [amt(e.open)], [amt(e.added), j === 0 && E.scrapV ? `(${amt(E.scrapV)})` : '—', amt(E.cost[j]), un(E.EU[j]), rate(E.R[j])]) : [e.name].concat(coh.slice(1).map(() => ''))));
      if (k >= E.els.length) rows.push(['**Total**'].concat(fifo ? [] : [amt(E.openCost)], [amt(E.addedCost), E.scrapV ? `(${amt(E.scrapV)})` : '—', amt(E.cost.reduce((a, b) => a + b, 0)), '', `**${rate(E.Rsum)}**`]));
      const cells = {};
      if (hl != null) for (let c = 0; c < coh.length; c++) cells[`${hl},${c}`] = 'hl';
      return { type: 'table', title: `Steps 3–4 · Statement of cost and cost per equivalent unit (${nm})`, head: coh, rows, cells, align: ['left'].concat(coh.slice(1).map(() => 'right')) };
    };
    E.els.forEach((e, j) => {
      const parts = (fifo ? [] : [`opening WIP ${inr(e.open)}`]).concat([`this period ${inr(e.added)}`], j === 0 && E.scrapV ? [`less scrap of normal loss ${inr(E.scrapV)}`] : []);
      const lead = j === 0 ? (fifo ? 'Under FIFO only this period\'s cost is spread: the opening WIP\'s own cost stays with the opening WIP. ' : 'Weighted average pools the opening WIP\'s cost with this period\'s. ') : '';
      frames.push({ caption: `${lead}**${e.name}**: ${parts.join(', ')} = ${inr(E.cost[j])}, over ${un(E.EU[j])} equivalent units = **${rate(E.R[j])}** per EU.${j === 0 && E.scrapV ? ' (The scrap value of normal loss is taken off material, as ICAI\'s answers do.)' : ''}${j === E.els.length - 1 ? ` Cost of one complete unit: ${rate(E.Rsum)}.` : ''}`,
        view: [eps(E.rows.length), costT(j + 1, j)] });
    });
    /* step 5: evaluation */
    const evH = ['Particulars', 'EU × cost per EU', '₹', 'Total ₹'];
    const ev = [], evHl = [];
    const elemRows = (label, key) => {
      const r = E.rows.find(x => x.key === key), list = [];
      E.els.forEach((e, j) => { if (Math.abs(r.eu[j]) > 1e-9) list.push([`${label}: ${e.name}`, `${un(Math.abs(r.eu[j]))} × ${rate(E.R[j])}`, amt(E.M(Math.abs(r.eu[j]) * E.R[j])), '']); });
      return list;
    };
    const blocks = [];
    if (fifo) {
      if (E.O) {
        const b = elemRows('Opening WIP completed', 'openDone');
        b.push(['Add: cost of opening WIP b/f', '', amt(E.openCost), '']);
        b.push([`**Opening WIP, ${un(E.O)} units complete**`, '', '', `**${amt(E.openTotal)}**`]);
        blocks.push({ rows: b, cap: `**Opening WIP**: the work done on it this period (${inr(E.openWork)}) plus the cost it brought in (${inr(E.openCost)}) = **${inr(E.openTotal)}**.` });
      }
      const fr = E.rows.find(x => x.key === 'fresh');
      blocks.push({ rows: [[`${E.O ? 'Fresh units' : 'Units'} completed`, `${un(fr.units)} × ${rate(E.Rsum)}`, '', amt(E.freshV)], [`**Transferred: ${un(E.C)} units**`, '', '', `**${amt(E.transfer)}**`]],
        cap: `${E.O ? 'Fresh units' : 'Completed units'} are complete for every element: ${un(fr.units)} × ${rate(E.Rsum)} = ${inr(E.freshV)}. ${E.O ? `So the ${un(E.C)} units transferred cost ${inr(E.openTotal)} + ${inr(E.freshV)} = ` : 'Transferred: '}**${inr(E.transfer)}**.` });
    } else {
      blocks.push({ rows: [['Units completed and transferred', `${un(E.C)} × ${rate(E.Rsum)}`, '', `**${amt(E.transfer)}**`]], cap: `Completed units are complete for every element: ${un(E.C)} × ${rate(E.Rsum)} = **${inr(E.transfer)}** transferred.` });
    }
    if (E.AL) { const b = elemRows('Abnormal loss', 'abloss'); b.push([`**Abnormal loss, ${un(E.AL)} units**`, '', '', `**${amt(E.alV)}**`]); blocks.push({ rows: b, tone: 'bad', cap: `**Abnormal loss** is valued element by element at its equivalent units: **${inr(E.alV)}**, credited to the process and charged to the Abnormal Loss account (and from there, less its scrap value, to the Costing P&L).` }); }
    if (E.AG) blocks.push({ rows: [['Abnormal gain', `${un(E.AG)} × ${rate(E.Rsum)}`, '', `**${amt(E.agV)}**`]], tone: 'ok', cap: `**Abnormal gain**: ${un(E.AG)} complete units × ${rate(E.Rsum)} = **${inr(E.agV)}**, debited to the process.` });
    { const b = elemRows('Closing WIP', 'close'); b.push([`**Closing WIP, ${un(E.W)} units**`, '', '', `**${amt(E.closeV)}**`]); blocks.push({ rows: b, cap: `**Closing WIP** is valued at its equivalent units${fifo ? ' at this period\'s rates (FIFO values closing stock at current cost)' : ''}: **${inr(E.closeV)}**.` }); }
    blocks.forEach((b, bi) => {
      const start = ev.length;
      b.rows.forEach(r => ev.push(r));
      evHl.length = 0; for (let i = start; i < ev.length; i++) evHl.push(i);
      const cells = {}; evHl.forEach(i => { for (let c = 0; c < 4; c++) cells[`${i},${c}`] = b.tone && i === ev.length - 1 ? b.tone : 'hl'; });
      frames.push({ caption: `Step 5: ${b.cap}`, view: [costT(E.els.length), { type: 'table', title: `Step 5 · Statement of evaluation (${nm})`, head: evH, rows: ev.slice(), cells, align: ['left', 'right', 'right', 'right'] }] });
    });
    /* the process account */
    const dr = [];
    if (E.O) dr.push({ p: 'To Opening WIP b/f', u: E.O, v: E.openCost, kind: 'in' });
    E.els.forEach((e, j) => dr.push({ p: `To ${e.name}`, u: j === 0 ? E.I : null, v: e.added, kind: 'cost' }));
    if (E.AG) dr.push({ p: 'To Abnormal Gain A/c', u: E.AG, v: E.agV, kind: 'gain' });
    const cr = [{ p: 'By Normal Loss A/c', u: E.NL, v: E.scrapV, kind: 'normal' }];
    if (E.AL) cr.push({ p: 'By Abnormal Loss A/c', u: E.AL, v: E.alV, kind: 'abloss' });
    cr.push({ p: 'By Transfer to next process / finished stock', u: E.C, v: E.accTransfer, kind: 'out' }, { p: 'By Closing WIP c/d', u: E.W, v: E.closeV, kind: 'close' });
    const acc = account('Process Account', dr, cr, { total: { u: E.drU, v: E.drV }, totalHl: true });
    const evFinal = { type: 'table', title: `Statement of evaluation (${nm})`, head: evH, rows: ev.slice(), align: ['left', 'right', 'right', 'right'] };
    frames.push({ caption: `Step 5 ends in the **process account**: debit what came in (opening WIP ${inr(E.openCost)}, this period's costs ${inr(E.addedCost)}${E.AG ? `, abnormal gain ${inr(E.agV)}` : ''}), credit what went out. Both sides total **${inr(E.drV)}**.${E.diff ? ` (A rounding difference of ${inr(Math.abs(E.diff))} is put into the transfer line so the account balances.)` : ''}`,
      view: acc.concat([evFinal]) });

    const stats = [
      { label: 'Cost per equivalent unit', value: rate(E.Rsum), hint: E.els.map((e, j) => `${e.name} ${rate(E.R[j])}`).join(' + ') },
      { label: `Transferred (${un(E.C)} units)`, value: inr(E.transfer), hint: fifo ? 'opening WIP cost + work to finish it + fresh units completed' : 'units completed × cost per EU' },
      { label: 'Closing WIP', value: inr(E.closeV), hint: 'equivalent units of closing WIP × cost per EU, element by element' }
    ];
    if (E.AL) stats.push({ label: `Abnormal loss (${un(E.AL)} units)`, value: inr(E.alV), tone: 'bad', hint: 'its equivalent units × cost per EU, element by element' });
    if (E.AG) stats.push({ label: `Abnormal gain (${un(E.AG)} units)`, value: inr(E.agV), tone: 'ok', hint: 'units × full cost per EU (100 % complete)' });
    return {
      frames, sim: E, mode: 'wip', stats,
      table: { head: ['Element', 'Equivalent units', 'Cost to spread', 'Cost per EU'], rows: E.els.map((e, j) => [e.name, un(E.EU[j]), amt(E.cost[j]), rate(E.R[j])]).concat([{ cls: 'avgrow', cells: ['total', '', amt(E.cost.reduce((a, b) => a + b, 0)), rate(E.Rsum)] }]) },
      note: `**Conventions.** ${fifo ? 'FIFO: units completed come first from the opening WIP, which needs only the rest of its work this period; only this period\'s costs are spread, and the opening WIP keeps its own cost.' : 'Weighted average: the opening WIP is not shown separately; its cost is pooled with this period\'s and spread over all completed units.'} Normal loss is ${pc(d.nlPct)} of ${d.nlBase === 'total' ? 'units introduced plus opening WIP' : 'units introduced'}, rounded to whole units, and gets no equivalent units. Its scrap value is deducted from the first cost element (${E.els[0].name}). Abnormal loss units count at ${d.abBasis === 'close' ? 'the closing WIP\'s degree of completion' : d.abBasis === 'own' ? 'the percentages given' : '100 % for every element'}; abnormal gain is 100 % complete. Amounts are ${d.rupees !== false ? 'rounded to the rupee' : 'kept to the paisa'}; cost per EU is ${E.dp ? `rounded to ${E.dp} decimals, and the transfer line absorbs any rounding difference` : 'not rounded'}.`
    };
  }
  const O0 = E => E.O > 0;

  function compute(v) {
    return v.mode === 'wip' ? computeWip(v) : computeLoss(v);
  }

  /* ================================================================== presets */
  const L = (p, item, u, amount) => [p, item, u, amount];
  const presets = [
    /* mode 1 */
    { label: 'Tapri chai premix: one process with an abnormal loss', values: { mode: 'loss', rupees: true,
      costLines: [L('Blend', 'Tea dust and milk powder', 10000, 600000), L('Blend', 'Wages', 0, 180000), L('Blend', 'Overheads', 0, 125500)],
      processes: [['Blend', 5, 6, 9300, 0]] } },
    { label: 'Tapri samosa line: two processes, an abnormal gain in the second', values: { mode: 'loss', rupees: true,
      costLines: [L('Mix', 'Flour and filling', 20000, 400000), L('Mix', 'Wages', 0, 96000), L('Mix', 'Overheads', 0, 62400), L('Fry', 'Oil and spices', 0, 90000), L('Fry', 'Wages', 0, 70000), L('Fry', 'Overheads', 0, 50900)],
      processes: [['Mix', 4, 2, 19000, 0], ['Fry', 10, 5, 17400, 0]] } },
    { label: 'ICAI Study Material Ch. 10, Illustration 2 (three processes)', values: { mode: 'loss', rupees: true,
      costLines: [L('I', 'Materials', 10000, 40000), L('I', 'Labour', 0, 6000), L('I', 'Manufacturing overhead', 0, 10000), L('II', 'Materials', 0, 20000), L('II', 'Labour', 0, 4000), L('II', 'Manufacturing overhead', 0, 10000), L('III', 'Materials', 0, 10000), L('III', 'Labour', 0, 1000), L('III', 'Manufacturing overhead', 0, 15000)],
      processes: [['I', 2, 0, 9750, 0], ['II', 5, 0, 9400, 0], ['III', 10, 0, 8000, 0]] } },
    { label: 'ICAI past paper May 2024, Q4(a): Processes P and Q (data)', values: { mode: 'loss', rupees: true,
      costLines: [L('P', 'Material', 10000, 800000), L('P', 'Wages', 0, 52000), L('P', 'Direct expenses', 0, 8600), L('P', 'Production overheads', 0, 120000), L('Q', 'Wages', 0, 78000), L('Q', 'Direct expenses', 0, 11100), L('Q', 'Production overheads', 0, 180000)],
      processes: [['P', 6, 5, 9200, 6900], ['Q', 10, 8, 6400, 0]] } },
    { label: 'ICAI Study Material Ch. 10, Illustration 3 (RST Ltd., two processes)', values: { mode: 'loss', rupees: true, rateDp: '4',
      costLines: [L('I', 'Raw materials', 7500, 450000), L('I', 'Direct wages', 0, 135750), L('I', 'Direct expenses', 0, 81450), L('I', 'Manufacturing overhead', 0, 27150), L('II', 'Direct wages', 0, 129250), L('II', 'Direct expenses', 0, 84013), L('II', 'Manufacturing overhead', 0, 19387)],
      processes: [['I', 5, 12.5, 7050, 0], ['II', 10, 37.5, 6525, 0]] } },
    /* mode 2 */
    { label: 'Tapri kulhad glaze: FIFO with opening and closing WIP', values: { mode: 'wip', method: 'fifo', rupees: true, openUnits: 2000, introduced: 18000, completed: 17000, closeUnits: 1500, nlPct: 5, nlBase: 'fresh', scrap: 4, abBasis: 'full', abPct: '',
      wipElements: [['Material', 30000, 362700], ['Labour', 6000, 177000], ['Overheads', 4000, 123900]], openPct: '100, 40, 40', closePct: '100, 60, 60' } },
    { label: 'ICAI Study Material Ch. 10, Illustration 4 (FIFO, one cost)', values: { mode: 'wip', method: 'fifo', rupees: true, rateDp: '2', openUnits: 1000, introduced: 10000, completed: 9000, closeUnits: 800, nlPct: 10, nlBase: 'total', scrap: 10, abBasis: 'full', abPct: '',
      wipElements: [['Process cost', 110000, 1930000]], openPct: '60', closePct: '75' } },
    { label: 'ICAI Study Material Ch. 10, Illustration 5 (the same, weighted average)', values: { mode: 'wip', method: 'avg', rupees: true, rateDp: '2', openUnits: 1000, introduced: 10000, completed: 9000, closeUnits: 800, nlPct: 10, nlBase: 'total', scrap: 10, abBasis: 'full', abPct: '',
      wipElements: [['Process cost', 110000, 1930000]], openPct: '60', closePct: '75' } },
    { label: 'ICAI past paper Sep 2024, Case Scenario I (FIFO, units scrapped at 70 %)', values: { mode: 'wip', method: 'fifo', rupees: true, openUnits: 12000, introduced: 74500, completed: 82000, closeUnits: 2600, nlPct: 2, nlBase: 'total', scrap: 2, abBasis: 'own', abPct: '100, 70, 70',
      wipElements: [['Material', 166200, 476465], ['Labour', 0, 370395], ['Overheads', 0, 296316]], openPct: '100, 80, 80', closePct: '100, 60, 60' } },
    { label: 'ICAI Study Material Ch. 10, Practical Problem 4 (XYZ Co., average method)', values: { mode: 'wip', method: 'avg', rupees: true, openUnits: 2000, introduced: 38000, completed: 35000, closeUnits: 2000, nlPct: 5, nlBase: 'total', scrap: 20, abBasis: 'close', abPct: '',
      wipElements: [['Materials', 80000, 1480000], ['Labour', 15000, 359000], ['Overheads', 45000, 1077000]], openPct: '100, 80, 80', closePct: '100, 80, 80' } },
    { label: 'ICAI MTP March 2026 (Series I), Case Scenario 1 (FIFO)', values: { mode: 'wip', method: 'fifo', rupees: true, openUnits: 1000, introduced: 6000, completed: 4500, closeUnits: 1600, nlPct: 15, nlBase: 'fresh', scrap: 4.666667, abBasis: 'full', abPct: '',
      wipElements: [['Material', 50000, 300000], ['Labour', 36000, 315900], ['Overheads', 18000, 174960]], openPct: '100, 60, 60', closePct: '100, 60, 60' } }
  ];

  /* ================================================================== challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const ri = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  /** a fresh problem for both modes (the mode being explored decides which one is asked); every rate is a whole rupee, so the answer is exact */
  function gen(r) {
    /* mode 1: one process */
    const input = ri(r, 40, 160) * 100, nl = pick(r, [2, 4, 5, 8, 10]), nlU = input * nl / 100, scrap = ri(r, 1, 9);
    const rateU = ri(r, 30, 140), normalOut = input - nlU, total = rateU * normalOut + nlU * scrap;
    const mat = Math.round(total * 0.55 / 100) * 100, wages = Math.round(total * 0.27 / 100) * 100, oh = total - mat - wages;
    const swing = Math.round(normalOut * pick(r, [0.01, 0.02, 0.03]) / 10) * 10 || 10;
    const output = r() < 0.65 ? normalOut - swing : Math.min(input, normalOut + Math.min(swing, nlU));
    /* mode 2: three elements, whole-rupee rates */
    const method = r() < 0.5 ? 'fifo' : 'avg';
    const O = ri(r, 5, 30) * 100, I = ri(r, 80, 300) * 100, nlP = pick(r, [0, 2, 5, 10]), NL = I * nlP / 100;
    const W = ri(r, 5, 40) * 100, A = r() < 0.6 ? ri(r, 1, 10) * 10 : 0, C = O + I - NL - W - A;
    const o = [100, pick(r, [20, 40, 50, 60, 75]), 0], w = [100, pick(r, [25, 40, 50, 60, 80]), 0];
    o[2] = o[1]; w[2] = w[1];
    const rates = [ri(r, 10, 60), ri(r, 5, 30), ri(r, 4, 25)], sc = pick(r, [0, 2, 5]);
    const fifo = method === 'fifo';
    const eu = j => (fifo ? O * (100 - o[j]) / 100 + (C - O) : C) + A + W * w[j] / 100;
    const opens = [O * ri(r, 8, 40), O * ri(r, 2, 15), O * ri(r, 2, 12)];
    const els = ['Material', 'Labour', 'Overheads'].map((name, j) => {
      const pool = rates[j] * eu(j) + (j === 0 ? NL * sc : 0);
      return [name, opens[j], fifo ? pool : pool - opens[j]];
    });
    if (els.some(e => e[2] <= 0)) els.forEach((e, j) => { e[1] = 0; e[2] = rates[j] * eu(j) + (j === 0 ? NL * sc : 0); });
    return { rupees: true, rateDp: 'exact',
      costLines: [['A', 'Materials', input, mat], ['A', 'Wages', 0, wages], ['A', 'Overheads', 0, oh]], processes: [['A', nl, scrap, output, 0]],
      method, openUnits: O, introduced: I, completed: C, closeUnits: W, nlPct: nlP, nlBase: 'fresh', scrap: sc, abBasis: 'full', abPct: '', wipElements: els,
      openPct: o.join(', '), closePct: w.join(', '), ask: pick(r, ['a', 'b', 'c']) };
  }
  const ASK = {
    loss: { a: ['the **cost per normal unit**', res => res.sim.procs[0].rate], b: ['the **value of the abnormal loss or abnormal gain**', res => res.sim.procs[0].alV + res.sim.procs[0].agV], c: ['the **value of the good output transferred**', res => res.sim.procs[0].mainV] },
    wip: { a: ['the **value of closing WIP**', res => res.sim.closeV], b: ['the **value of the units completed and transferred**', res => res.sim.transfer], c: ['the **cost per equivalent unit of material**', res => res.sim.R[0]] }
  };
  /** the test state's picture: the given data only (no working) */
  function givenView(v) {
    if (v.mode === 'wip') {
      return [{ type: 'table', title: `Given (${v.method === 'avg' ? 'weighted average' : 'FIFO'})`, head: ['Item', 'Value'], rows: [['Opening WIP units', un(num0(v.openUnits))], ['Units introduced', un(num0(v.introduced))], ['Units completed and transferred', un(num0(v.completed))], ['Closing WIP units', un(num0(v.closeUnits))], ['Normal loss', `${pc(num0(v.nlPct))} of units introduced`], ['Scrap value a unit', rate(num0(v.scrap))]], align: ['left', 'right'] },
        { type: 'table', title: 'Cost elements', head: ['Element', 'Opening WIP ₹', 'Cost this period ₹', 'Opening WIP done', 'Closing WIP done'], rows: (v.wipElements || []).map((e, j) => [e[0], amt(num0(e[1])), amt(num0(e[2])), pc(num0(String(v.openPct).split(/[\s,;/]+/)[j])), pc(num0(String(v.closePct).split(/[\s,;/]+/)[j]))]), align: ['left', 'right', 'right', 'right', 'right'] }];
    }
    const p = (v.processes || [])[0] || [];
    return [{ type: 'table', title: 'Given', head: ['Item', 'Units', '₹'], rows: (v.costLines || []).map(l => [l[1], l[2] ? un(num0(l[2])) : '', amt(num0(l[3]))]).concat([['Normal loss', `${pc(num0(p[1]))} of input`, ''], ['Scrap value a unit', '', rate(num0(p[2]))], ['Actual output', un(num0(p[3])), '']]), align: ['left', 'right', 'right'] }];
  }

  const def = {
    id: 'process', title: 'Process Costing Lab',
    blurb: 'Build process accounts with normal loss, abnormal loss and gain, then equivalent units under FIFO and average.',
    controls: [
      { id: 'mode', type: 'seg', label: 'What to build', value: 'loss', options: [['loss', 'Process accounts'], ['wip', 'WIP and EU']] },
      { id: 'costLines', type: 'table', label: 'Costs charged to each process (units: material put in)', short: 'Costs', max: 16, show: v => v.mode !== 'wip',
        help: 'One line per cost: the process it is charged to, what it is, the units of material it brings in (0 for wages and overheads), and the amount. A later process also receives the units passed on by the one before it.',
        rows: [L('Blend', 'Tea dust and milk powder', 10000, 600000), L('Blend', 'Wages', 0, 180000), L('Blend', 'Overheads', 0, 125500)],
        cols: [{ id: 'p', label: 'Process', type: 'text', auto: () => 'I' }, { id: 'item', label: 'Item', type: 'text', auto: () => 'Overheads' }, { id: 'u', label: 'Units', type: 'number', min: 0, def: 0 }, { id: 'amt', label: '₹', type: 'number', min: 0, def: 0 }] },
      { id: 'processes', type: 'table', label: 'Each process: normal loss %, scrap ₹ a unit, output units, units passed on (0 = all)', short: 'Processes', max: 4, show: v => v.mode !== 'wip',
        help: 'In the order the material flows. Normal loss is a % of the units put in. Output is the actual good output. "To next": how many of the output units go on to the next process (0 = all of them); the rest go to finished stock.',
        rows: [['Blend', 5, 6, 9300, 0]],
        cols: [{ id: 'name', label: 'Process', type: 'text', auto: n => ['I', 'II', 'III', 'IV'][n] || 'P' + (n + 1) }, { id: 'nl', label: 'NL %', type: 'number', min: 0, max: 99, def: 5 }, { id: 'scrap', label: 'Scrap ₹', type: 'number', min: 0, def: 0 }, { id: 'out', label: 'Output', type: 'number', min: 0, def: 0 }, { id: 'next', label: 'To next', type: 'number', min: 0, def: 0 }] },
      { id: 'method', type: 'seg', label: 'Method', value: 'fifo', options: [['fifo', 'FIFO'], ['avg', 'Weighted average']], show: v => v.mode === 'wip' },
      { id: 'openUnits', type: 'number', label: 'Opening WIP (units)', value: 2000, min: 0, max: 1e8, show: v => v.mode === 'wip' },
      { id: 'introduced', type: 'number', label: 'Units introduced this period', short: 'Introduced', value: 18000, min: 0, max: 1e8, show: v => v.mode === 'wip' },
      { id: 'completed', type: 'number', label: 'Units completed and transferred', short: 'Completed', value: 17000, min: 0, max: 1e8, show: v => v.mode === 'wip' },
      { id: 'closeUnits', type: 'number', label: 'Closing WIP (units)', value: 1500, min: 0, max: 1e8, show: v => v.mode === 'wip' },
      { id: 'nlPct', type: 'number', label: 'Normal loss (%)', value: 5, min: 0, max: 99, show: v => v.mode === 'wip' },
      { id: 'nlBase', type: 'select', label: 'Normal loss is a % of', value: 'fresh', options: [['fresh', 'units introduced (fresh input)'], ['total', 'units introduced + opening WIP']], show: v => v.mode === 'wip' },
      { id: 'scrap', type: 'number', label: 'Scrap value of a lost unit (₹)', short: 'Scrap ₹', value: 4, min: 0, max: 1e6, show: v => v.mode === 'wip' },
      { id: 'wipElements', type: 'table', label: 'Cost elements: cost in opening WIP and cost this period (₹)', short: 'Elements', max: 5, show: v => v.mode === 'wip',
        help: 'One row per cost element (Material, Labour, Overheads; or Material and Conversion). The first element, usually material, is credited with the scrap value of normal loss. Under FIFO only the total cost of opening WIP matters.',
        rows: [['Material', 30000, 362700], ['Labour', 6000, 177000], ['Overheads', 4000, 123900]],
        cols: [{ id: 'name', label: 'Element', type: 'text', auto: () => 'Overheads' }, { id: 'open', label: 'Opening WIP ₹', type: 'number', min: 0, def: 0 }, { id: 'added', label: 'This period ₹', type: 'number', min: 0, def: 0 }] },
      { id: 'openPct', type: 'text', label: 'Opening WIP: % complete, one per element', short: 'Opening WIP done', value: '100, 40, 40', placeholder: 'e.g. 100, 40, 40', show: v => v.mode === 'wip',
        help: 'In the order of the cost elements; one number applies to every element. Material put in at the start of the process is 100 % complete.' },
      { id: 'closePct', type: 'text', label: 'Closing WIP: % complete, one per element', short: 'Closing WIP done', value: '100, 60, 60', placeholder: 'e.g. 100, 60, 60', show: v => v.mode === 'wip' },
      { id: 'abBasis', type: 'select', label: 'Abnormal loss units are', short: 'Abnormal loss', value: 'full', show: v => v.mode === 'wip',
        options: [['full', '100 % complete (lost at the end)'], ['close', 'as complete as closing WIP'], ['own', 'complete to my own % per element']] },
      { id: 'abPct', type: 'text', label: 'Abnormal loss % complete, one per element', value: '', placeholder: 'e.g. 100, 70, 70', show: v => v.mode === 'wip' && v.abBasis === 'own' },
      { id: 'rateDp', type: 'select', label: 'Round the cost per unit to', short: 'Cost per unit', value: 'exact', options: [['exact', 'no rounding (exact)'], ['2', '2 decimals'], ['3', '3 decimals'], ['4', '4 decimals']],
        help: 'ICAI\'s answers sometimes value output at a cost per unit rounded to 2, 3 or 4 decimals (₹210.88). The account then needs a small rounding adjustment, which goes into the transfer line.' },
      { id: 'rupees', type: 'toggle', label: 'Round amounts to the rupee (as ICAI\'s answers do)', short: 'To the rupee', value: true }
    ],
    presets, compute,
    challenge: {
      title: 'Value the output',
      gen,
      prompt: (v, res) => {
        const m = res.mode === 'wip' ? 'wip' : 'loss', a = ASK[m][v.ask] || ASK[m].a;
        return m === 'wip' ? `Using the **${v.method === 'avg' ? 'weighted average' : 'FIFO'}** method (abnormal loss units 100 % complete, normal loss with no equivalent units and its scrap value deducted from material), find ${a[0]} in ₹.`
          : `For the process in the table (normal loss credited at scrap value), find ${a[0]} in ₹.`;
      },
      solve: (res, v) => { const m = res.mode === 'wip' ? 'wip' : 'loss'; return (ASK[m][v.ask] || ASK[m].a)[1](res); },
      tol: 0.5, unit: '₹', kind: 'num',
      view: (res, v) => givenView(v),
      explain: (res, v) => {
        if (res.mode === 'wip') {
          const E = res.sim;
          return `Equivalent units: ${E.els.map((e, j) => `${e.name} ${un(E.EU[j])}`).join(', ')}. Cost per EU: ${E.els.map((e, j) => `${e.name} ${inr(E.cost[j])} ÷ ${un(E.EU[j])} = ${rate(E.R[j])}`).join('; ')}. Transferred ${inr(E.transfer)}, closing WIP ${inr(E.closeV)}${E.AL ? `, abnormal loss ${inr(E.alV)}` : ''}.`;
        }
        const P = res.sim.procs[0];
        return `Normal loss ${un(P.nlU)} units (scrap ${inr(P.nlV)}); cost per normal unit = (${inr(P.cost)} − ${inr(P.nlV)}) ÷ ${un(P.normalOut)} = ${rate(P.rate)}. ${P.alU ? `Abnormal loss ${un(P.alU)} × ${rate(P.rate)} = ${inr(P.alV)}` : P.agU ? `Abnormal gain ${un(P.agU)} × ${rate(P.rate)} = ${inr(P.agV)}` : 'No abnormal loss or gain'}; output ${un(P.mainU)} × ${rate(P.rate)} = ${inr(P.mainV)}.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { num, money, rate, pctList, parseProcesses, parseCostLines, processChain, parseElements, abnormalPct, equivalent, compute, gen, def };
  g.__lab_def_process = def;
})(typeof window !== 'undefined' ? window : globalThis);
