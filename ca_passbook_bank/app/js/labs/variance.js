/* PassBook — Variance Analysis Lab (Paper 4, Standard Costing: ICAI Study Material, chapter 13).
   Pure part: material(), labour(), voh(), foh() return every variance of one element; compute(values) -> {frames, stats, table, note}.
   Every variance is written "standard minus actual" (SM 13.12): a positive amount is favourable (F), a negative one adverse (A).
     Material  (SM 13.14 – 13.17): cost = SQ×SP − AQ×AP; price = (SP − AP)×AQ; usage = (SQ − AQ)×SP; mix = (RSQ − AQ)×SP; yield = (SQ − RSQ)×SP
     Labour    (SM 13.25 – 13.28): cost = SH×SR − AH paid×AR; rate = (SR − AR)×AH paid; idle time = −idle hours×SR;
                                   efficiency = (SH − AH worked)×SR; mix (gang) = (RSH − AH worked)×SR; yield (sub-efficiency) = (SH − RSH)×SR
     Variable overhead (SM 13.36): cost = SR×SH − actual; expenditure = SR×AH − actual; efficiency = SR×(SH − AH)
     Fixed overhead (SM 13.41):    cost = absorbed − actual; expenditure = budgeted − actual; volume = absorbed − budgeted;
                                   efficiency = SR×(SH − AH); capacity = SR×(AH − revised budgeted hours); calendar = rate per day×(actual − budgeted days)
   Node: require('app/js/labs/variance.js') -> {material, labour, voh, foh, compute, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const U = () => GA.util || {};
  const EPS = 0.005;
  const inr = n => (U().inr ? U().inr(n) : '₹' + (Math.round(n * 100) / 100));
  /** a quantity with Indian grouping and at most two decimals: 80.888… -> '80.89', 300000 -> '3,00,000' */
  const qf = n => { const x = Math.round(n * 100) / 100; return Math.abs(x) < 1e-9 ? '0' : x.toLocaleString('en-IN', { maximumFractionDigits: 2 }); };
  const tag = v => (Math.abs(v) < EPS ? 'Nil' : v > 0 ? 'F' : 'A');
  /** a variance as ICAI writes it: '₹10,500 A', '₹9 F', 'Nil' */
  const fv = v => (Math.abs(v) < EPS ? 'Nil' : inr(Math.abs(v)) + ' ' + tag(v));
  const tone = v => (Math.abs(v) < EPS ? 'mute' : v > 0 ? 'ok' : 'bad');
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  /** a number typed or stored: accepts 12,50,000 and spaces; '' and junk read as NaN */
  const num = x => (typeof x === 'number' ? x : parseFloat(String(x == null ? '' : x).replace(/[₹,\s]/g, '')));
  const nz = x => { const n = num(x); return Number.isFinite(n) ? n : 0; };
  const plural = (n, w) => `${qf(n)} ${w}${Math.abs(n - 1) < 1e-9 ? '' : 's'}`;

  /* ================================================================== the variances, element by element (pure) */
  /** rows: [{name, sq (standard quantity in the standard mix), sp, aq (actual quantity used), ap, pq (quantity bought, 0 = as used)}];
      out = actual output, stdOut = the output the standard mix gives (1 for a standard per unit). */
  function material(rows, out, stdOut) {
    if (!(out > 0)) throw new Error('Enter the actual output (more than 0).');
    if (!(stdOut > 0)) throw new Error('Enter the output of the standard mix (more than 0): 1 if the standard quantities are per unit of output.');
    const M = rows.map((r, i) => ({ name: String(r.name || '').trim() || String.fromCharCode(65 + i), sq: nz(r.sq), sp: nz(r.sp), aq: nz(r.aq), ap: nz(r.ap), pq: nz(r.pq) }))
      .filter(m => m.sq || m.aq || m.sp || m.ap);
    if (!M.length) throw new Error('Add at least one material.');
    M.forEach(m => { if (m.sq < 0 || m.sp < 0 || m.aq < 0 || m.ap < 0 || m.pq < 0) throw new Error(`${m.name}: quantities and prices cannot be negative.`); });
    const sumStd = sum(M, m => m.sq);
    if (!(sumStd > 0)) throw new Error('Give at least one material a standard quantity.');
    if (!(sum(M, m => m.sq * m.sp) > 0)) throw new Error('Give the materials a standard price: the standard cost is nil.');
    if (new Set(M.map(m => m.name.toLowerCase())).size !== M.length) throw new Error('Give every material a different name.');
    const k = out / stdOut, TAQ = sum(M, m => m.aq);
    M.forEach(m => {
      m.SQ = m.sq * k; m.RSQ = (TAQ * m.sq) / sumStd; m.PQ = m.pq > 0 ? m.pq : m.aq;
      m.sc = m.SQ * m.sp; m.ac = m.aq * m.ap; m.rc = m.RSQ * m.sp; m.aqsp = m.aq * m.sp;
      m.cost = m.sc - m.ac; m.price = (m.sp - m.ap) * m.aq; m.priceBought = (m.sp - m.ap) * m.PQ;
      m.usage = m.sp * (m.SQ - m.aq); m.mix = m.sp * (m.RSQ - m.aq); m.yield = m.sp * (m.SQ - m.RSQ);
    });
    const R = { rows: M, out, stdOut, k, sumStd, TSQ: sum(M, m => m.SQ), TAQ, SC: sum(M, m => m.sc), AC: sum(M, m => m.ac) };
    ['cost', 'price', 'priceBought', 'usage', 'mix', 'yield'].forEach(key => (R[key] = sum(M, m => m[key])));
    R.bought = M.some(m => m.pq > 0 && Math.abs(m.pq - m.aq) > 1e-9);
    R.scpu = sum(M, m => m.sq * m.sp) / stdOut;                       // standard cost of one unit of output
    R.stdYield = (TAQ * stdOut) / sumStd;                               // the output the actual input should have given
    R.yieldOut = R.scpu * (out - R.stdYield);                           // yield variance on the output basis (the same amount)
    return R;
  }

  /** rows: [{name, sh (standard hours for stdOut units of output), sr, ah (hours paid), idle (abnormal idle hours), ar}] */
  function labour(rows, out, stdOut) {
    if (!(out > 0)) throw new Error('Enter the actual output (more than 0).');
    if (!(stdOut > 0)) throw new Error('Enter the output the standard hours are for (more than 0): 1 if they are per unit.');
    const L = rows.map((r, i) => ({ name: String(r.name || '').trim() || 'Grade ' + (i + 1), sh: nz(r.sh), sr: nz(r.sr), ah: nz(r.ah), idle: nz(r.idle), ar: nz(r.ar) }))
      .filter(x => x.sh || x.ah || x.sr || x.ar);
    if (!L.length) throw new Error('Add at least one grade of labour.');
    L.forEach(x => {
      if (x.sh < 0 || x.sr < 0 || x.ah < 0 || x.idle < 0 || x.ar < 0) throw new Error(`${x.name}: hours and rates cannot be negative.`);
      if (x.idle > x.ah + 1e-9) throw new Error(`${x.name}: idle hours (${qf(x.idle)}) cannot exceed the hours paid (${qf(x.ah)}).`);
    });
    const sumStd = sum(L, x => x.sh);
    if (!(sumStd > 0)) throw new Error('Give at least one grade standard hours.');
    if (!(sum(L, x => x.sh * x.sr) > 0)) throw new Error('Give the grades a standard rate: the standard labour cost is nil.');
    if (new Set(L.map(x => x.name.toLowerCase())).size !== L.length) throw new Error('Give every grade a different name.');
    const k = out / stdOut;
    L.forEach(x => { x.SH = x.sh * k; x.AW = x.ah - x.idle; });
    const TAW = sum(L, x => x.AW);
    L.forEach(x => {
      x.RSH = (TAW * x.sh) / sumStd; x.sc = x.SH * x.sr; x.ac = x.ah * x.ar;
      x.cost = x.sc - x.ac; x.rate = (x.sr - x.ar) * x.ah; x.idleV = -x.idle * x.sr;
      x.eff = x.sr * (x.SH - x.AW); x.mix = x.sr * (x.RSH - x.AW); x.yield = x.sr * (x.SH - x.RSH);
    });
    const R = { rows: L, out, stdOut, k, sumStd, TSH: sum(L, x => x.SH), TAH: sum(L, x => x.ah), TIdle: sum(L, x => x.idle), TAW, SC: sum(L, x => x.sc), AC: sum(L, x => x.ac) };
    [['cost', 'cost'], ['rate', 'rate'], ['idle', 'idleV'], ['eff', 'eff'], ['mix', 'mix'], ['yield', 'yield']].forEach(([key, f]) => (R[key] = sum(L, x => x[f])));
    return R;
  }

  /** o: {budOut, budHrs (0 = no hours given), bud, out, actHrs, act} */
  function voh(o) {
    const { budOut, budHrs, bud, out, actHrs, act } = o;
    if (!(budOut > 0)) throw new Error('Enter the budgeted output (more than 0).');
    if (!(out > 0)) throw new Error('Enter the actual output (more than 0).');
    if (!(bud >= 0) || !(act >= 0)) throw new Error('Overhead amounts cannot be negative.');
    const R = { budOut, budHrs, bud, out, actHrs, act, hours: budHrs > 0 };
    R.SRu = bud / budOut; R.absorbed = R.SRu * out; R.cost = R.absorbed - act;
    if (R.hours) {
      if (!(actHrs >= 0)) throw new Error('Enter the actual hours worked.');
      R.SRh = bud / budHrs; R.SH = (budHrs / budOut) * out; R.stdAH = R.SRh * actHrs;
      R.exp = R.stdAH - act; R.eff = R.SRh * (R.SH - actHrs);
    }
    return R;
  }

  /** o: {bud, budOut, budHrs (0 = no hours given), budDays (0 = not given), act, out, actHrs, actDays} */
  function foh(o) {
    const { bud, budOut, budHrs, budDays, act, out, actHrs, actDays } = o;
    if (!(budOut > 0)) throw new Error('Enter the budgeted output (more than 0).');
    if (!(out > 0)) throw new Error('Enter the actual output (more than 0).');
    if (!(bud > 0)) throw new Error('Enter the budgeted fixed overheads (more than 0).');
    if (!(act >= 0)) throw new Error('Actual fixed overheads cannot be negative.');
    const R = { bud, budOut, budHrs, budDays, act, out, actHrs, actDays, hours: budHrs > 0, days: budDays > 0 };
    if (R.days && !(actDays > 0)) throw new Error('Enter the actual working days (or set the budgeted days to 0).');
    R.SRu = bud / budOut; R.absorbed = R.SRu * out;
    R.cost = R.absorbed - act; R.exp = bud - act; R.vol = R.absorbed - bud;
    if (R.days) { R.SRd = bud / budDays; R.cal = R.SRd * (actDays - budDays); R.possible = R.SRd * actDays; }
    if (R.hours) {
      if (!(actHrs >= 0)) throw new Error('Enter the actual hours worked.');
      R.SRh = bud / budHrs; R.SH = (budHrs / budOut) * out; R.std = R.SRh * actHrs;
      R.eff = R.SRh * (R.SH - actHrs);
      R.RBH = R.days ? (budHrs / budDays) * actDays : budHrs;            // revised budgeted hours (SM 13.41 note)
      R.cap = R.SRh * (actHrs - R.RBH);
    } else if (R.days) R.rest = R.vol - R.cal;                            // capacity and efficiency together: hours are needed to split them
    return R;
  }

  /* ================================================================== drawing helpers */
  /** a branch of the tree: its name, its amount (F / A) and its formula, all inside the box (a note under a parent would sit on its edges) */
  const node = (name, v, formula, kids) => Object.assign({ label: formula ? `${name}\n${fv(v)}\n${formula}` : `${name}\n${fv(v)}`, color: tone(v) }, kids && kids.length ? { children: kids } : {});
  const tree = (title, root) => ({ type: 'tree', title, root, gapX: 18 });
  const amtCol = n => (Math.abs(n) < EPS ? '0' : qf(n));
  const fxTable = (title, rows) => ({ type: 'table', title, head: ['Quantity', 'Formula', 'Value'], rows, align: ['left', 'left', 'right'] });
  const check = ok => (ok ? 'The parts add up to the parent' : 'The parts do not add up');

  /* ---------------------------------------------------------------- material */
  function matView(R, stage, bought) {
    const multi = R.rows.length > 1;
    const head = ['Material', 'SQ', 'SP (₹)', 'SQ × SP (₹)'].concat(stage >= 1 ? ['AQ', 'AP (₹)', 'AQ × AP (₹)'] : []).concat(stage >= 2 ? ['RSQ', 'RSQ × SP (₹)'] : []);
    const rows = R.rows.map(m => [m.name, qf(m.SQ), qf(m.sp), amtCol(m.sc)].concat(stage >= 1 ? [qf(m.aq), qf(m.ap), amtCol(m.ac)] : []).concat(stage >= 2 ? [qf(m.RSQ), amtCol(m.rc)] : []));
    if (multi) rows.push(['**Total**', `**${qf(R.TSQ)}**`, '', `**${amtCol(R.SC)}**`].concat(stage >= 1 ? [`**${qf(R.TAQ)}**`, '', `**${amtCol(R.AC)}**`] : []).concat(stage >= 2 ? [`**${qf(R.TAQ)}**`, `**${amtCol(sum(R.rows, m => m.rc))}**`] : []));
    const cells = {};
    if (stage >= 2) R.rows.forEach((m, i) => { cells[i + ',' + 7] = 'hl'; });
    const t = { type: 'table', title: stage >= 1 ? 'Standard for the actual output, and actual' : 'Standard for the actual output', head, rows, cells, align: head.map((h, i) => (i ? 'right' : 'left')) };
    if (bought && stage >= 1) t.title += ' (quantities used)';
    return t;
  }
  function matTree(R, stage, onBought) {
    if (stage < 1) return null;
    const pv = onBought ? R.priceBought : R.price;
    const kids = [];
    if (stage >= 2) kids.push(node(onBought ? 'Price (on bought)' : 'Price', pv, 'AQ × (SP − AP)'));
    if (stage >= 3) kids.push(node('Usage', R.usage, 'SP × (SQ − AQ)', stage >= 4 ? [node('Mix', R.mix, 'SP × (RSQ − AQ)')].concat(stage >= 5 ? [node('Yield', R.yield, 'SP × (SQ − RSQ)')] : []) : []));
    return tree('Material variances', node('Material cost', R.cost, 'SQ × SP − AQ × AP', kids));
  }
  const each = (R, f) => R.rows.map(f).join('; ');
  function matFrames(R, onBought) {
    const F = [], multi = R.rows.length > 1, pv = onBought ? R.priceBought : R.price;
    const per = R.stdOut === 1 ? `per unit of output` : `in the standard mix that gives ${qf(R.stdOut)} units of output`;
    const v = (stage, t) => [matTree(R, t, onBought), matView(R, stage, R.bought)].filter(Boolean);
    F.push({ caption: `First the **standard quantity for the actual output** (SQ): the standard quantities are ${per}, so ${qf(R.out)} units need ${R.stdOut === 1 ? qf(R.out) : `${qf(R.out)} ÷ ${qf(R.stdOut)} = ${qf(R.k)}`} times them: ${each(R, m => `${m.name} ${qf(m.sq)} × ${qf(R.k)} = ${qf(m.SQ)}`)}. At standard prices that output should cost **${inr(R.SC)}**.`, view: v(0, 0) });
    F.push({ caption: `Now the actual: what was really used (AQ) at what it really cost (AP). ${each(R, m => `${m.name} ${qf(m.aq)} × ${inr(m.ap)} = ${inr(m.ac)}`)}; actual cost **${inr(R.AC)}**.`, view: v(1, 0) });
    F.push({ caption: `**Material cost variance** = standard cost of the actual output − actual cost = ${inr(R.SC)} − ${inr(R.AC)} = **${fv(R.cost)}**. ${R.cost < -EPS ? 'Adverse: the output cost more than its standard.' : R.cost > EPS ? 'Favourable: the output cost less than its standard.' : 'No difference at all.'} Two things can cause it: the price paid and the quantity used.`, view: v(1, 1) });
    F.push({ caption: onBought
      ? `**Price variance** on the quantity **bought** (the Study Material's rule when purchases are given: report the purchase department's variance when the material is bought): ${each(R, m => `${m.name} ${qf(m.PQ)} × (${qf(m.sp)} − ${qf(m.ap)}) = ${fv(m.priceBought)}`)}. Total **${fv(R.priceBought)}**.`
      : `**Price variance** = AQ × (SP − AP), the purchase department's part: each unit actually used, priced at the standard minus the actual price. ${each(R, m => `${m.name} ${qf(m.aq)} × (${qf(m.sp)} − ${qf(m.ap)}) = ${fv(m.price)}`)}. Total **${fv(R.price)}**.`, view: v(1, 2) });
    F.push({ caption: `**Usage variance** = SP × (SQ − AQ), the production department's part: more material than the standard allows, valued at the standard price (so price changes do not leak in). ${each(R, m => `${m.name} ${qf(m.sp)} × (${qf(m.SQ)} − ${qf(m.aq)}) = ${fv(m.usage)}`)}. Total **${fv(R.usage)}**.`, view: v(1, 3) });
    const ok = Math.abs(pv + R.usage - R.cost) < 0.01;
    F.push({ caption: ok ? `Check: price + usage = ${fv(pv)} + ${fv(R.usage)} = **${fv(R.cost)}** = cost variance. ${check(true)}.`
      : `Check: price (on bought) + usage = ${fv(pv + R.usage)}, not the cost variance ${fv(R.cost)}. The gap, ${fv(pv - R.price)}, is the price variance on material bought but not used (still in stock); on the quantity used the price variance is ${fv(R.price)} and price + usage = cost.`, view: v(1, 3) });
    if (multi) {
      F.push({ caption: `Two or more materials: split usage into **mix** and **yield**. **Revised standard quantity** (RSQ) = the actual total input (${qf(R.TAQ)}) shared in the standard proportion ${R.rows.map(m => qf(m.sq)).join(' : ')}: ${each(R, m => `${m.name} ${qf(R.TAQ)} × ${qf(m.sq)}/${qf(R.sumStd)} = ${qf(m.RSQ)}`)}.`, view: v(2, 3) });
      F.push({ caption: `**Mix variance** = SP × (RSQ − AQ): the same total input, but in the actual proportion instead of the standard one. ${each(R, m => `${m.name} ${qf(m.sp)} × (${qf(m.RSQ)} − ${qf(m.aq)}) = ${fv(m.mix)}`)}. Total **${fv(R.mix)}**${R.mix < -EPS ? ': more of the dearer material than the standard mix' : R.mix > EPS ? ': more of the cheaper material than the standard mix' : ''}.`, view: v(2, 4) });
      F.push({ caption: `**Yield variance** (sub-usage) = SP × (SQ − RSQ): the standard mix itself, but more or less output than ${qf(R.TAQ)} of input should give. ${each(R, m => `${m.name} ${qf(m.sp)} × (${qf(m.SQ)} − ${qf(m.RSQ)}) = ${fv(m.yield)}`)}. Total **${fv(R.yield)}**. The output way gives the same: standard cost per unit ${inr(R.scpu)} × (actual output ${qf(R.out)} − standard output from the actual input ${qf(R.stdYield)}) = ${fv(R.yieldOut)}.`, view: v(2, 5) });
      F.push({ caption: `Check: mix + yield = ${fv(R.mix)} + ${fv(R.yield)} = **${fv(R.usage)}** = usage variance, and price + usage = **${fv(R.cost)}**. ${check(Math.abs(R.mix + R.yield - R.usage) < 0.01)}.`, view: v(2, 5) });
    } else F[F.length - 1].caption += ' With one material there is no mix to change, so usage is not split further.';
    return F;
  }

  /* ---------------------------------------------------------------- labour */
  function labView(R, stage) {
    const multi = R.rows.length > 1;
    const head = ['Grade', 'SH', 'SR (₹)', 'SH × SR (₹)'].concat(stage >= 1 ? ['Hours paid', 'Idle', 'Hours worked', 'AR (₹)', 'Paid × AR (₹)'] : []).concat(stage >= 2 ? ['RSH'] : []);
    const rows = R.rows.map(x => [x.name, qf(x.SH), qf(x.sr), amtCol(x.sc)].concat(stage >= 1 ? [qf(x.ah), qf(x.idle), qf(x.AW), qf(x.ar), amtCol(x.ac)] : []).concat(stage >= 2 ? [qf(x.RSH)] : []));
    if (multi) rows.push(['**Total**', `**${qf(R.TSH)}**`, '', `**${amtCol(R.SC)}**`].concat(stage >= 1 ? [`**${qf(R.TAH)}**`, `**${qf(R.TIdle)}**`, `**${qf(R.TAW)}**`, '', `**${amtCol(R.AC)}**`] : []).concat(stage >= 2 ? [`**${qf(R.TAW)}**`] : []));
    const cells = {};
    if (stage >= 2) R.rows.forEach((x, i) => { cells[i + ',' + 9] = 'hl'; });
    return { type: 'table', title: stage >= 1 ? 'Standard hours for the actual output, and actual' : 'Standard hours for the actual output', head, rows, cells, align: head.map((h, i) => (i ? 'right' : 'left')) };
  }
  function labTree(R, stage) {
    if (stage < 1) return null;
    const kids = [];
    if (stage >= 2) kids.push(node('Rate', R.rate, 'AH paid × (SR − AR)'));
    if (stage >= 3) kids.push(node('Idle time', R.idle, 'idle hours × SR'));
    if (stage >= 4) kids.push(node('Efficiency', R.eff, 'SR × (SH − AH worked)', stage >= 5 ? [node('Mix (gang)', R.mix, 'SR × (RSH − AH worked)')].concat(stage >= 6 ? [node('Yield', R.yield, 'SR × (SH − RSH)')] : []) : []));
    return tree('Labour variances', node('Labour cost', R.cost, 'SH × SR − AH paid × AR', kids));
  }
  function labFrames(R) {
    const F = [], multi = R.rows.length > 1;
    const v = (stage, t) => [labTree(R, t), labView(R, stage)].filter(Boolean);
    F.push({ caption: `First the **standard hours for the actual output** (SH): ${R.stdOut === 1 ? 'the standard hours are per unit' : `the standard hours are for ${qf(R.stdOut)} units`}, so ${qf(R.out)} units allow ${each(R, x => `${x.name} ${qf(x.sh)} × ${qf(R.k)} = ${qf(x.SH)} h`)}. At standard rates: **${inr(R.SC)}**.`, view: v(0, 0) });
    F.push({ caption: `The actual: hours **paid** (the wage bill) and hours **worked** (paid minus abnormal idle time). ${each(R, x => `${x.name} ${qf(x.ah)} paid, ${qf(x.idle)} idle, ${qf(x.AW)} worked, at ${inr(x.ar)}`)}; wages paid **${inr(R.AC)}**.`, view: v(1, 0) });
    F.push({ caption: `**Labour cost variance** = standard cost of the actual output − actual wages = ${inr(R.SC)} − ${inr(R.AC)} = **${fv(R.cost)}**. Three things can cause it: the rate paid, hours paid but not worked, and hours worked beyond the standard.`, view: v(1, 1) });
    F.push({ caption: `**Rate variance** = hours **paid** × (SR − AR): every hour paid, idle or not, cost a different rate. ${each(R, x => `${x.name} ${qf(x.ah)} × (${qf(x.sr)} − ${qf(x.ar)}) = ${fv(x.rate)}`)}. Total **${fv(R.rate)}**.`, view: v(1, 2) });
    F.push({ caption: `**Idle time variance** = abnormal idle hours × SR: hours paid for but not worked are a pure loss, so this variance is ${R.TIdle > 0 ? 'always adverse' : 'nil here (no idle time)'}. ${each(R, x => `${x.name} ${qf(x.idle)} × ${qf(x.sr)} = ${fv(x.idleV)}`)}. Total **${fv(R.idle)}**.`, view: v(1, 3) });
    F.push({ caption: `**Efficiency variance** = SR × (SH − hours **worked**): the hours actually worked against the hours the output allows, at the standard rate. ${each(R, x => `${x.name} ${qf(x.sr)} × (${qf(x.SH)} − ${qf(x.AW)}) = ${fv(x.eff)}`)}. Total **${fv(R.eff)}**.`, view: v(1, 4) });
    F.push({ caption: `Check: rate + idle time + efficiency = ${fv(R.rate)} + ${fv(R.idle)} + ${fv(R.eff)} = **${fv(R.rate + R.idle + R.eff)}** = cost variance. ${check(Math.abs(R.rate + R.idle + R.eff - R.cost) < 0.01)}.`, view: v(1, 4) });
    if (multi) {
      F.push({ caption: `Several grades: split efficiency into **mix (gang)** and **yield**. **Revised standard hours** (RSH) = the hours actually worked (${qf(R.TAW)}) shared in the standard proportion ${R.rows.map(x => qf(x.sh)).join(' : ')}: ${each(R, x => `${x.name} ${qf(x.RSH)}`)}.`, view: v(2, 4) });
      F.push({ caption: `**Mix (gang) variance** = SR × (RSH − hours worked): the same total hours, but a different team. ${each(R, x => `${x.name} ${qf(x.sr)} × (${qf(x.RSH)} − ${qf(x.AW)}) = ${fv(x.mix)}`)}. Total **${fv(R.mix)}**${R.mix < -EPS ? ': more of the dearer grades than the standard gang' : R.mix > EPS ? ': more of the cheaper grades than the standard gang' : ''}.`, view: v(2, 5) });
      F.push({ caption: `**Yield (sub-efficiency) variance** = SR × (SH − RSH): the standard team, but more or fewer hours than the output allows. ${each(R, x => `${x.name} ${qf(x.sr)} × (${qf(x.SH)} − ${qf(x.RSH)}) = ${fv(x.yield)}`)}. Total **${fv(R.yield)}**.`, view: v(2, 6) });
      F.push({ caption: `Check: mix + yield = ${fv(R.mix)} + ${fv(R.yield)} = **${fv(R.eff)}** = efficiency variance; rate + idle time + efficiency = **${fv(R.cost)}**. ${check(Math.abs(R.mix + R.yield - R.eff) < 0.01)}.`, view: v(2, 6) });
    } else F[F.length - 1].caption += ' With one grade there is no gang mix, so efficiency is not split further.';
    return F;
  }

  /* ---------------------------------------------------------------- variable overhead */
  function vohBasics(R) {
    const rows = [['Standard rate per unit', 'budgeted VOH ÷ budgeted output', `${inr(R.bud)} ÷ ${qf(R.budOut)} = ${inr(R.SRu)}`], ['Standard VOH for actual output', 'rate per unit × actual output', `${inr(R.SRu)} × ${qf(R.out)} = ${inr(R.absorbed)}`]];
    if (R.hours) rows.splice(1, 0, ['Standard rate per hour (SR)', 'budgeted VOH ÷ budgeted hours', `${inr(R.bud)} ÷ ${qf(R.budHrs)} = ${inr(R.SRh)}`], ['Standard hours for actual output (SH)', 'budgeted hours ÷ budgeted output × actual output', `${qf(R.budHrs)} ÷ ${qf(R.budOut)} × ${qf(R.out)} = ${qf(R.SH)}`], ['Standard VOH for actual hours', 'SR × actual hours', `${inr(R.SRh)} × ${qf(R.actHrs)} = ${inr(R.stdAH)}`]);
    return fxTable('Variable overheads: basic calculations', rows);
  }
  function vohTree(R, stage) {
    if (stage < 1) return null;
    const kids = [];
    if (R.hours && stage >= 2) kids.push(node('Expenditure', R.exp, 'SR × AH − actual VOH'));
    if (R.hours && stage >= 3) kids.push(node('Efficiency', R.eff, 'SR × (SH − AH)'));
    return tree('Variable overhead variances', node('VOH cost', R.cost, 'SR × SH − actual VOH', kids));
  }
  function vohFrames(R) {
    const F = [], v = t => [vohTree(R, t), vohBasics(R)].filter(Boolean);
    F.push({ caption: R.hours ? `Variable overheads move with hours, so first the **standard rate per hour** (${inr(R.SRh)}) and the **standard hours for the actual output** (${qf(R.SH)}).` : 'No hours are given, so variable overheads can only be absorbed per unit of output.', view: v(0) });
    F.push({ caption: `**VOH cost variance** = standard VOH for the actual output − actual VOH = ${inr(R.absorbed)} − ${inr(R.act)} = **${fv(R.cost)}**.${R.hours ? '' : ' Without hours it cannot be split into expenditure and efficiency.'}`, view: v(1) });
    if (R.hours) {
      F.push({ caption: `**Expenditure (spending) variance** = standard VOH for the hours actually worked − actual VOH = ${inr(R.stdAH)} − ${inr(R.act)} = **${fv(R.exp)}**: for the hours worked, was the spending right?`, view: v(2) });
      F.push({ caption: `**Efficiency variance** = SR × (SH − AH) = ${inr(R.SRh)} × (${qf(R.SH)} − ${qf(R.actHrs)}) = **${fv(R.eff)}**: every hour worked beyond the standard drags its variable overheads with it.`, view: v(3) });
      F.push({ caption: `Check: expenditure + efficiency = ${fv(R.exp)} + ${fv(R.eff)} = **${fv(R.cost)}** = cost variance. ${check(Math.abs(R.exp + R.eff - R.cost) < 0.01)}.`, view: v(3) });
    }
    return F;
  }

  /* ---------------------------------------------------------------- fixed overhead */
  function fohBasics(R) {
    const rows = [['Standard rate per unit', 'budgeted FOH ÷ budgeted output', `${inr(R.bud)} ÷ ${qf(R.budOut)} = ${inr(R.SRu)}`], ['Absorbed (recovered) FOH', 'rate per unit × actual output', `${inr(R.SRu)} × ${qf(R.out)} = ${inr(R.absorbed)}`]];
    if (R.hours) rows.push(['Standard rate per hour (SR)', 'budgeted FOH ÷ budgeted hours', `${inr(R.bud)} ÷ ${qf(R.budHrs)} = ${inr(R.SRh)}`], ['Standard hours for actual output (SH)', 'budgeted hours ÷ budgeted output × actual output', `${qf(R.budHrs)} ÷ ${qf(R.budOut)} × ${qf(R.out)} = ${qf(R.SH)}`]);
    if (R.days) rows.push(['Standard rate per day', 'budgeted FOH ÷ budgeted days', `${inr(R.bud)} ÷ ${qf(R.budDays)} = ${inr(R.SRd)}`]);
    if (R.hours && R.days) rows.push(['Revised budgeted hours', 'budgeted hours ÷ budgeted days × actual days', `${qf(R.budHrs)} ÷ ${qf(R.budDays)} × ${qf(R.actDays)} = ${qf(R.RBH)}`]);
    return fxTable('Fixed overheads: basic calculations', rows);
  }
  function fohTree(R, stage) {
    if (stage < 1) return null;
    const vk = [];
    if (stage >= 4) {
      if (R.hours) {
        vk.push(node('Efficiency', R.eff, 'SR × (SH − AH)'));
        if (stage >= 5) vk.push(node(R.days ? 'Capacity (revised)' : 'Capacity', R.cap, R.days ? 'SR × (AH − revised BH)' : 'SR × (AH − BH)'));
        if (stage >= 6 && R.days) vk.push(node('Calendar', R.cal, 'rate per day × (AD − BD)'));
      } else if (R.days) {
        vk.push(node('Calendar', R.cal, 'rate per day × (AD − BD)'));
        if (stage >= 5) vk.push(node('Capacity + efficiency', R.rest, 'not split: no hours'));
      }
    }
    const kids = [];
    if (stage >= 2) kids.push(node('Expenditure', R.exp, 'budgeted − actual FOH'));
    if (stage >= 3) kids.push(node('Volume', R.vol, 'absorbed − budgeted FOH', vk));
    return tree('Fixed overhead variances', node('FOH cost', R.cost, 'absorbed − actual FOH', kids));
  }
  function fohFrames(R) {
    const F = [], v = t => [fohTree(R, t), fohBasics(R)].filter(Boolean);
    F.push({ caption: `Fixed overheads do not change with output, but each unit made **absorbs** a standard share of them: ${inr(R.SRu)} a unit (${inr(R.bud)} ÷ ${qf(R.budOut)} budgeted units)${R.hours ? `, or ${inr(R.SRh)} an hour` : ''}. ${qf(R.out)} units absorb **${inr(R.absorbed)}**.`, view: v(0) });
    F.push({ caption: `**FOH cost variance** = absorbed − actual = ${inr(R.absorbed)} − ${inr(R.act)} = **${fv(R.cost)}**: it is just the ${R.cost < -EPS ? 'under' : 'over'}-absorption. Two causes: spending more or less than the budget, and making more or fewer units to absorb it.`, view: v(1) });
    F.push({ caption: `**Expenditure (budget) variance** = budgeted − actual = ${inr(R.bud)} − ${inr(R.act)} = **${fv(R.exp)}**: output does not matter here, a fixed budget stays fixed.`, view: v(2) });
    F.push({ caption: `**Volume variance** = absorbed − budgeted = ${inr(R.absorbed)} − ${inr(R.bud)} = **${fv(R.vol)}**: ${R.vol < -EPS ? 'fewer units than budgeted, so part of the fixed cost was never recovered' : R.vol > EPS ? 'more units than budgeted, so the units recovered more than the budget' : 'output equalled the budget'}. Check: expenditure + volume = **${fv(R.exp + R.vol)}** = cost variance.`, view: v(3) });
    if (R.hours) {
      F.push({ caption: `Why was the volume different? **Efficiency variance** = SR × (SH − AH) = ${inr(R.SRh)} × (${qf(R.SH)} − ${qf(R.actHrs)}) = **${fv(R.eff)}**: the hours worked made ${R.eff < -EPS ? 'fewer' : R.eff > EPS ? 'more' : 'exactly the'} units ${Math.abs(R.eff) < EPS ? 'they should' : 'than they should have'}.`, view: v(4) });
      F.push({ caption: R.days ? `**Capacity variance** (revised) = SR × (AH − revised budgeted hours) = ${inr(R.SRh)} × (${qf(R.actHrs)} − ${qf(R.RBH)}) = **${fv(R.cap)}**: on the days actually worked, were more or fewer hours worked than planned? (Revised budgeted hours = ${qf(R.budHrs)} ÷ ${qf(R.budDays)} × ${qf(R.actDays)} days.)`
        : `**Capacity variance** = SR × (AH − BH) = ${inr(R.SRh)} × (${qf(R.actHrs)} − ${qf(R.budHrs)}) = **${fv(R.cap)}**: more or fewer hours worked than budgeted.`, view: v(5) });
      if (R.days) F.push({ caption: `**Calendar variance** = rate per day × (actual − budgeted days) = ${inr(R.SRd)} × (${qf(R.actDays)} − ${qf(R.budDays)}) = **${fv(R.cal)}**: ${R.actDays < R.budDays ? 'fewer working days than the budget, each one a day of fixed cost unabsorbed' : R.actDays > R.budDays ? 'extra working days, each one absorbing a day of fixed cost' : 'the days were as budgeted'}.`, view: v(6) });
      const tot = R.eff + R.cap + (R.days ? R.cal : 0);
      F.push({ caption: `Check: efficiency + capacity${R.days ? ' + calendar' : ''} = ${[R.eff, R.cap].concat(R.days ? [R.cal] : []).map(fv).join(' + ')} = **${fv(tot)}** = volume variance. ${check(Math.abs(tot - R.vol) < 0.01)}.`, view: v(6) });
    } else if (R.days) {
      F.push({ caption: `**Calendar variance** = rate per day × (actual − budgeted days) = ${inr(R.SRd)} × (${qf(R.actDays)} − ${qf(R.budDays)}) = **${fv(R.cal)}**.`, view: v(4) });
      F.push({ caption: `The rest of the volume variance, **${fv(R.rest)}**, is capacity and efficiency together: without hours worked it cannot be split. Check: calendar + rest = ${fv(R.cal + R.rest)} = volume variance.`, view: v(5) });
    } else F[F.length - 1].caption += ' No hours or days are given, so the volume variance is not split further.';
    return F;
  }

  /* ---------------------------------------------------------------- total cost (all four elements) and the reconciliation */
  /** the leaf variances of the whole tree (Fig 13.1), price on the quantity used so that they add up to the total */
  function leaves(M, L, V, Fh) {
    const out = [];
    const mm = M.rows.length > 1;
    out.push(['Material price', M.price]);
    if (mm) out.push(['Material mix', M.mix], ['Material yield', M.yield]); else out.push(['Material usage', M.usage]);
    out.push(['Labour rate', L.rate], ['Labour idle time', L.idle]);
    if (L.rows.length > 1) out.push(['Labour mix (gang)', L.mix], ['Labour yield', L.yield]); else out.push(['Labour efficiency', L.eff]);
    if (V.hours) out.push(['VOH expenditure', V.exp], ['VOH efficiency', V.eff]); else out.push(['VOH cost', V.cost]);
    out.push(['FOH expenditure', Fh.exp]);
    if (Fh.hours) { out.push(['FOH efficiency', Fh.eff], [Fh.days ? 'FOH capacity (revised)' : 'FOH capacity', Fh.cap]); if (Fh.days) out.push(['FOH calendar', Fh.cal]); }
    else if (Fh.days) out.push(['FOH calendar', Fh.cal], ['FOH capacity and efficiency', Fh.rest]);
    else out.push(['FOH volume', Fh.vol]);
    return out;
  }
  function totalFrames(T) {
    const { M, L, V, F: Fh } = T;
    const els = [['Material', M.SC, M.AC, M.cost, `price ${fv(M.price)}, usage ${fv(M.usage)}`], ['Labour', L.SC, L.AC, L.cost, `rate ${fv(L.rate)}, idle time ${fv(L.idle)}, efficiency ${fv(L.eff)}`],
      ['Variable overhead', V.absorbed, V.act, V.cost, V.hours ? `expenditure ${fv(V.exp)}, efficiency ${fv(V.eff)}` : 'not split'], ['Fixed overhead', Fh.absorbed, Fh.act, Fh.cost, `expenditure ${fv(Fh.exp)}, volume ${fv(Fh.vol)}`]];
    const summary = n => ({ type: 'table', title: 'Standard cost of the actual output against actual cost', head: ['Element', 'Standard (₹)', 'Actual (₹)', 'Variance'],
      rows: els.map((e, i) => [e[0], amtCol(e[1]), i < n ? amtCol(e[2]) : '', i < n ? fv(e[3]) : '']).concat(n >= 4 ? [['**Total**', `**${amtCol(T.SC)}**`, `**${amtCol(T.AC)}**`, `**${fv(T.total)}**`]] : []),
      cells: Object.fromEntries(els.map((e, i) => (i < n ? [[i + ',3', tone(e[3]) === 'ok' ? 'ok' : tone(e[3]) === 'bad' ? 'bad' : 'mute']] : [])).flat()), align: ['left', 'right', 'right', 'right'] });
    const ttree = (n, root) => tree('Total cost variance (Fig 13.1, top two levels)', root ? node('Total cost', T.total, 'standard − actual cost', els.slice(0, n).map(e => node(e[0] === 'Variable overhead' ? 'Variable OH' : e[0] === 'Fixed overhead' ? 'Fixed OH' : e[0], e[3]))) : { label: 'Total cost\nvariance', color: 'mute', children: els.slice(0, n).map(e => node(e[0] === 'Variable overhead' ? 'Variable OH' : e[0] === 'Fixed overhead' ? 'Fixed OH' : e[0], e[3])) });
    const F = [{ caption: `The **standard cost of the actual output**, element by element: what ${qf(M.out)} units should have cost, ${inr(T.SC)} in all. Every variance explains part of the gap between this and the actual cost.`, view: [summary(0)] }];
    els.forEach((e, i) => F.push({ caption: `**${e[0]}**: standard ${inr(e[1])} against actual ${inr(e[2])}, a cost variance of **${fv(e[3])}** (${e[4]}).`, view: [ttree(i + 1, false), summary(i + 1)] }));
    F.push({ caption: `**Total cost variance** = ${els.map(e => fv(e[3])).join(' + ')} = **${fv(T.total)}** = standard cost ${inr(T.SC)} − actual cost ${inr(T.AC)}.`, view: [ttree(4, true), summary(4)] });
    const lv = T.leaves, adv = lv.filter(x => x[1] < -EPS), fav = lv.filter(x => x[1] > EPS);
    const sa = -sum(adv, x => x[1]), sf = sum(fav, x => x[1]);
    const rec = n => {
      const rows = [['Standard cost of actual output', '', amtCol(T.SC)]], cells = { '0,2': 'hl' };
      if (n >= 1) { rows.push(['**Add: adverse variances**', '', '']); adv.forEach(x => rows.push([x[0], amtCol(-x[1]), ''])); rows.push(['', '', amtCol(sa)]); cells[(rows.length - 1) + ',2'] = 'bad'; }
      if (n >= 2) { rows.push(['**Less: favourable variances**', '', '']); fav.forEach(x => rows.push([x[0], amtCol(x[1]), ''])); rows.push(['', '', '(' + amtCol(sf) + ')']); cells[(rows.length - 1) + ',2'] = 'ok'; }
      if (n >= 3) { rows.push(['**Actual cost**', '', `**${amtCol(T.SC + sa - sf)}**`]); cells[(rows.length - 1) + ',2'] = 'hl'; }
      return { type: 'table', title: 'Reconciliation: standard cost to actual cost', head: ['Particulars', '₹', '₹'], rows, cells, align: ['left', 'right', 'right'] };
    };
    F.push({ caption: 'The **reconciliation statement** starts from the standard cost of the actual output.', view: [rec(0)] });
    F.push({ caption: `Adverse variances made the output cost more than standard, so they are **added**: ${adv.length ? adv.map(x => `${x[0].toLowerCase()} ${inr(-x[1])}`).join(', ') : 'none here'}; ${inr(sa)} in all.`, view: [rec(1)] });
    F.push({ caption: `Favourable variances made it cost less, so they are **deducted**: ${fav.length ? fav.map(x => `${x[0].toLowerCase()} ${inr(x[1])}`).join(', ') : 'none here'}; ${inr(sf)} in all.`, view: [rec(2)] });
    F.push({ caption: `${inr(T.SC)} + ${inr(sa)} − ${inr(sf)} = **${inr(T.SC + sa - sf)}**, the actual cost. ${Math.abs(T.SC + sa - sf - T.AC) < 0.01 ? 'The statement closes: every rupee of difference is explained by a variance.' : 'The statement does not close.'}`, view: [ttree(4, true), rec(3)] });
    return F;
  }

  /* ================================================================== compute */
  const MODES = [['material', 'Material'], ['labour', 'Labour'], ['voh', 'Variable overhead'], ['foh', 'Fixed overhead'], ['total', 'All four: total and reconciliation']];
  const isM = v => v.mode === 'material' || v.mode === 'total', isL = v => v.mode === 'labour' || v.mode === 'total';
  const isV = v => v.mode === 'voh' || v.mode === 'total', isF = v => v.mode === 'foh' || v.mode === 'total', isO = v => isV(v) || isF(v);
  /** the standard table and the actual table, matched by name (case and spaces ignored): a standard row with no actual row was not used;
      an actual row with no standard row is a material or grade outside the standard (standard quantity 0) */
  const key = s => String(s == null ? '' : s).trim().toLowerCase();
  function join(std, act, mk) {
    const out = [], by = new Map();
    (std || []).forEach((r, i) => { const name = String(r[0] == null ? '' : r[0]).trim() || '#' + (i + 1); const row = mk(name, r, null); if (by.has(key(name))) throw new Error(`"${name}" appears twice in the standard table.`); by.set(key(name), row); out.push(row); });
    const seen = new Set();
    (act || []).forEach((r, i) => {
      const name = String(r[0] == null ? '' : r[0]).trim() || '#' + (i + 1), k = key(name);
      if (seen.has(k)) throw new Error(`"${name}" appears twice in the actual table.`);
      seen.add(k);
      if (by.has(k)) mk(name, null, r, by.get(k)); else out.push(mk(name, null, r));
    });
    return out;
  }
  const matRows = v => join(v.mStd, v.mAct, (name, s, a, row) => Object.assign(row || { name, sq: 0, sp: 0, aq: 0, ap: 0, pq: 0 }, s ? { sq: s[1], sp: s[2] } : {}, a ? { aq: a[1], ap: a[2], pq: a[3] } : {}));
  const labRows = v => join(v.lStd, v.lAct, (name, s, a, row) => Object.assign(row || { name, sh: 0, sr: 0, ah: 0, idle: 0, ar: 0 }, s ? { sh: s[1], sr: s[2] } : {}, a ? { ah: a[1], idle: a[2], ar: a[3] } : {}));
  /** presets and generators write one row per material [name, std qty, std price, qty used, actual price, qty bought] (and per grade
      [name, std hours, std rate, hours paid, idle hours, actual rate]); the inputs hold them as a standard and an actual table */
  const M6 = rows => ({ mStd: rows.map(r => [r[0], r[1], r[2]]), mAct: rows.map(r => [r[0], r[3], r[4], r[5] || 0]) });
  const L6 = rows => ({ lStd: rows.map(r => [r[0], r[1], r[2]]), lAct: rows.map(r => [r[0], r[3], r[4], r[5]]) });
  const vohIn = v => ({ budOut: nz(v.budOut), budHrs: nz(v.budHrs), bud: nz(v.vBud), out: nz(v.out), actHrs: nz(v.actHrs), act: nz(v.vAct) });
  const fohIn = v => ({ bud: nz(v.fBud), budOut: nz(v.budOut), budHrs: nz(v.budHrs), budDays: nz(v.budDays), act: nz(v.fAct), out: nz(v.out), actHrs: nz(v.actHrs), actDays: nz(v.actDays) });
  let lastMode = 'material';
  const stat = (label, v, hint) => ({ label, value: fv(v), hint, tone: tone(v) === 'mute' ? '' : tone(v) });
  const rowTable = (R, cols, name) => ({ head: [name].concat(cols.map(c => c[0])), rows: R.rows.map(x => [x.name].concat(cols.map(c => fv(x[c[1]])))).concat(R.rows.length > 1 ? [{ cls: 'avgrow', cells: ['Total'].concat(cols.map(c => fv(R[c[2] || c[1]]))) }] : []) });
  const CONV = '**Conventions.** Every variance is standard minus actual, so a positive amount is favourable (F) and a negative one adverse (A). ';

  function compute(v) {
    const mode = MODES.some(m => m[0] === v.mode) ? v.mode : 'total';
    const out = nz(v.out);
    let res;
    if (mode === 'material') {
      const R = material(matRows(v), out, nz(v.stdOut)), onB = R.bought && v.pvOn === 'bought';
      res = { frames: matFrames(R, onB), sim: { mode, M: R },
        stats: [stat('Material cost variance', R.cost, 'SQ × SP − AQ × AP'), stat(onB ? 'Price variance (on bought)' : 'Price variance', onB ? R.priceBought : R.price, 'AQ × (SP − AP)'), stat('Usage variance', R.usage, 'SP × (SQ − AQ)')]
          .concat(R.rows.length > 1 ? [stat('Mix variance', R.mix, 'SP × (RSQ − AQ)'), stat('Yield variance', R.yield, 'SP × (SQ − RSQ)')] : []),
        table: rowTable(R, [['Price', onB ? 'priceBought' : 'price'], ['Usage', 'usage']].concat(R.rows.length > 1 ? [['Mix', 'mix'], ['Yield', 'yield']] : []).concat([['Cost', 'cost']]), 'Material'),
        note: CONV + `Standard quantity for the actual output = standard quantity in the standard mix × actual output ÷ output of the standard mix. Revised standard quantity = the actual total input in the standard proportion. ${R.bought ? (onB ? 'Price variance is on the quantity bought (the Study Material\'s rule when purchases are given), so price + usage differs from the cost variance by the price variance on the stock not used.' : 'Price variance is on the quantity used, so price + usage = cost; choose "quantity bought" to report it when the material is bought.') : 'Price variance is on the quantity used (no separate purchase quantity is given).'}` };
    } else if (mode === 'labour') {
      const R = labour(labRows(v), out, nz(v.lStdOut));
      res = { frames: labFrames(R), sim: { mode, L: R },
        stats: [stat('Labour cost variance', R.cost, 'SH × SR − AH paid × AR'), stat('Rate variance', R.rate, 'AH paid × (SR − AR)'), stat('Idle time variance', R.idle, 'idle hours × SR'), stat('Efficiency variance', R.eff, 'SR × (SH − AH worked)')]
          .concat(R.rows.length > 1 ? [stat('Mix (gang) variance', R.mix, 'SR × (RSH − AH worked)'), stat('Yield variance', R.yield, 'SR × (SH − RSH)')] : []),
        table: rowTable(R, [['Rate', 'rate'], ['Idle time', 'idleV', 'idle'], ['Efficiency', 'eff']].concat(R.rows.length > 1 ? [['Mix', 'mix'], ['Yield', 'yield']] : []).concat([['Cost', 'cost']]), 'Grade'),
        note: CONV + 'Rate variance is on the hours paid; efficiency, mix and yield are on the hours worked (paid minus abnormal idle hours). Revised standard hours = the actual hours worked in the standard proportion.' };
    } else if (mode === 'voh') {
      const R = voh(vohIn(v));
      res = { frames: vohFrames(R), sim: { mode, V: R },
        stats: [stat('VOH cost variance', R.cost, 'standard VOH for actual output − actual VOH')].concat(R.hours ? [stat('Expenditure variance', R.exp, 'SR × AH − actual VOH'), stat('Efficiency variance', R.eff, 'SR × (SH − AH)'), { label: 'Standard rate per hour', value: inr(R.SRh), hint: 'budgeted VOH ÷ budgeted hours' }] : []),
        table: { head: ['Variance', 'Amount'], rows: [['Cost', fv(R.cost)]].concat(R.hours ? [['Expenditure', fv(R.exp)], ['Efficiency', fv(R.eff)]] : []) },
        note: CONV + 'Variable overheads are absorbed on the hours worked (the Study Material\'s basis when none is named), at budgeted VOH ÷ budgeted hours.' };
    } else if (mode === 'foh') {
      const R = foh(fohIn(v));
      res = { frames: fohFrames(R), sim: { mode, F: R },
        stats: [stat('FOH cost variance', R.cost, 'absorbed − actual FOH'), stat('Expenditure variance', R.exp, 'budgeted − actual FOH'), stat('Volume variance', R.vol, 'absorbed − budgeted FOH')]
          .concat(R.hours ? [stat('Efficiency variance', R.eff, 'SR × (SH − AH)'), stat(R.days ? 'Capacity variance (revised)' : 'Capacity variance', R.cap, R.days ? 'SR × (AH − revised budgeted hours)' : 'SR × (AH − BH)')] : [])
          .concat(R.days ? [stat('Calendar variance', R.cal, 'rate per day × (actual − budgeted days)')] : []),
        table: { head: ['Variance', 'Amount'], rows: [['Cost', fv(R.cost)], ['Expenditure', fv(R.exp)], ['Volume', fv(R.vol)]].concat(R.hours ? [['Efficiency', fv(R.eff)], ['Capacity', fv(R.cap)]] : []).concat(R.days ? [['Calendar', fv(R.cal)]] : []).concat(!R.hours && R.days ? [['Capacity and efficiency (not split)', fv(R.rest)]] : []) },
        note: CONV + `Fixed overheads are absorbed at budgeted FOH ÷ budgeted output a unit${R.hours ? ' (budgeted FOH ÷ budgeted hours an hour)' : ''}. ${R.days ? 'With working days given, the capacity variance is against the revised budgeted hours (budgeted hours a day × actual days) and the calendar variance takes the difference in days.' : 'No working days are given, so there is no calendar variance.'}` };
    } else {
      const M = material(matRows(v), out, nz(v.stdOut)), L = labour(labRows(v), out, nz(v.lStdOut)), V = voh(vohIn(v)), Fh = foh(fohIn(v));
      const T = { M, L, V, F: Fh, SC: M.SC + L.SC + V.absorbed + Fh.absorbed, AC: M.AC + L.AC + V.act + Fh.act };
      T.total = T.SC - T.AC; T.leaves = leaves(M, L, V, Fh);
      res = { frames: totalFrames(T), sim: { mode, M, L, V, F: Fh, T },
        stats: [stat('Total cost variance', T.total, 'standard cost of actual output − actual cost'), { label: 'Standard cost of actual output', value: inr(T.SC) }, { label: 'Actual cost', value: inr(T.AC) },
          stat('Material cost variance', M.cost, 'price + usage'), stat('Labour cost variance', L.cost, 'rate + idle time + efficiency'), stat('Overhead cost variance', V.cost + Fh.cost, 'variable + fixed')],
        table: { head: ['Variance', 'Amount'], rows: T.leaves.map(x => [x[0], fv(x[1])]).concat([{ cls: 'avgrow', cells: ['Total cost variance', fv(T.total)] }]) },
        note: CONV + 'All four elements use the same actual output. The reconciliation takes material price variance on the quantity used, so that the variances add up to the difference between standard and actual cost. Overheads use the hours entered for them (labour or machine hours).' };
    }
    lastMode = mode;
    return res;
  }

  /* ================================================================== presets (ICAI documents named in the label; the cast for the rest) */
  const TAPRI = {
    out: 18000, stdOut: 90, ...M6([['Tea', 40, 300, 8500, 310, 0], ['Milk', 60, 200, 11800, 190, 0]]), pvOn: 'used',
    lStdOut: 100, ...L6([['Mixer', 2, 150, 372, 12, 155], ['Packer', 3, 90, 528, 18, 88]]),
    budOut: 20000, budHrs: 1000, actHrs: 950, vBud: 50000, vAct: 46000, fBud: 100000, fAct: 98000, budDays: 25, actDays: 26
  };
  const presets = [
    { label: 'Tapri chai premix: all four elements and the reconciliation', values: Object.assign({ mode: 'total' }, TAPRI) },
    { label: 'Tapri chai premix: material mix and yield', values: Object.assign({ mode: 'material' }, TAPRI) },
    { label: 'Tapri chai premix: two grades with idle time', values: Object.assign({ mode: 'labour' }, TAPRI) },
    { label: 'ICAI PYQ September 2024, Q4(a) (BG company): materials A and B for 1,600 packets', values: { mode: 'material', out: 1600, stdOut: 1, ...M6([['A', 4, 50, 7000, 40, 0], ['B', 8, 40, 12500, 45, 0]]), pvOn: 'used' } },
    { label: 'ICAI PYQ September 2024, Q4(a) (BG company): labour with 5% of time paid lost', values: { mode: 'labour', out: 1600, lStdOut: 1, ...L6([['Workers', 6, 20, 10000, 500, 23]]) } },
    { label: 'ICAI PYQ May 2026, Q1(b) (EXA Ltd): material at ₹42.50 a kg', values: { mode: 'material', out: 2000, stdOut: 1, ...M6([['Raw material', 5, 30, 14000, 42.5, 0]]), pvOn: 'used' } },
    { label: 'ICAI PYQ May 2026, Q1(b) (EXA Ltd): labour, 6,000 hours for ₹3,24,000', values: { mode: 'labour', out: 2000, lStdOut: 1, ...L6([['Labour', 2.5, 50, 6000, 0, 54]]) } },
    { label: 'ICAI MTP May 2025 Series I, Q2: labour mix of three grades (weeks)', values: { mode: 'labour', out: 1, lStdOut: 1, ...L6([['Skilled', 9000, 120, 8960, 0, 140], ['Semi-skilled', 5400, 80, 3840, 0, 100], ['Unskilled', 7200, 60, 10240, 0, 40]]) } },
    { label: 'ICAI PYQ May 2026, Q3(b) (Alpha Ltd): fixed overheads over 28 working days', values: { mode: 'foh', out: 315000, budOut: 300000, budHrs: 300000, actHrs: 350000, fBud: 600000, fAct: 624000, budDays: 25, actDays: 28 } },
    { label: 'ICAI PYQ May 2025, Q4(b): fixed overheads with working days but no hours', values: { mode: 'foh', out: 4560, budOut: 4800, budHrs: 0, actHrs: 0, fBud: 48000, fAct: 46800, budDays: 25, actDays: 27 } },
    { label: 'ICAI PYQ May 2025, Q4(b): variable overheads without hours', values: { mode: 'voh', out: 4560, budOut: 4800, budHrs: 0, actHrs: 0, vBud: 14400, vAct: 14400 } },
    { label: 'Study Material Illustration 3: chemical mixture with a 10% standard loss', values: { mode: 'material', out: 182, stdOut: 90, ...M6([['A', 40, 20, 90, 18, 0], ['B', 60, 30, 110, 34, 0]]), pvOn: 'used' } },
    { label: 'Study Material Illustration 7 (NPX Ltd): three grades with idle time', values: { mode: 'labour', out: 10000, lStdOut: 1, ...L6([['Skilled', 2, 6, 18000, 500, 7], ['Semi-skilled', 3, 4, 33000, 700, 3.5], ['Unskilled', 5, 3, 58000, 800, 4]]) } },
    { label: 'Study Material Illustration 8: a gang of 50 working a 40-hour week', values: { mode: 'labour', out: 1800, lStdOut: 50, ...L6([['Skilled', 32, 3, 1120, 0, 4], ['Semi-skilled', 12, 2, 720, 0, 3], ['Unskilled', 6, 1, 160, 0, 2]]) } },
    { label: 'Study Material Illustration 9 (G Ltd): variable overheads', values: { mode: 'voh', out: 5900, budOut: 6000, budHrs: 12000, actHrs: 11600, vBud: 120000, vAct: 122000 } },
    { label: 'Study Material Illustration 11: 120 machines, 24 of 25 days worked', values: { mode: 'foh', out: 5305, budOut: 6000, budHrs: 24000, actHrs: 20160, fBud: 144000, fAct: 142000, budDays: 25, actDays: 24 } },
    { label: 'Study Material Illustration 13: fixed overheads, 21 days against 20', values: { mode: 'foh', out: 3800, budOut: 4000, budHrs: 8000, actHrs: 7800, fBud: 400000, fAct: 390000, budDays: 20, actDays: 21 } }
  ];

  /* ================================================================== challenge */
  const ASK = {
    material: [['cost', 'material cost variance'], ['price', 'material price variance'], ['usage', 'material usage variance'], ['mix', 'material mix variance'], ['yield', 'material yield variance']],
    labour: [['cost', 'labour cost variance'], ['rate', 'labour rate variance'], ['idle', 'labour idle time variance'], ['eff', 'labour efficiency variance'], ['mix', 'labour mix (gang) variance'], ['yield', 'labour yield (sub-efficiency) variance']],
    voh: [['cost', 'variable overhead cost variance'], ['exp', 'variable overhead expenditure variance'], ['eff', 'variable overhead efficiency variance']],
    foh: [['cost', 'fixed overhead cost variance'], ['exp', 'fixed overhead expenditure variance'], ['vol', 'fixed overhead volume variance'], ['eff', 'fixed overhead efficiency variance'], ['cap', 'fixed overhead capacity variance (revised for the days)'], ['cal', 'fixed overhead calendar variance']],
    total: [['total', 'total cost variance'], ['mcost', 'material cost variance'], ['lcost', 'labour cost variance'], ['vcost', 'variable overhead cost variance'], ['fcost', 'fixed overhead cost variance']]
  };
  function answerOf(sim, ask) {
    const R = sim.mode === 'material' ? sim.M : sim.mode === 'labour' ? sim.L : sim.mode === 'voh' ? sim.V : sim.mode === 'foh' ? sim.F : null;
    if (sim.mode === 'total') return { total: sim.T.total, mcost: sim.M.cost, lcost: sim.L.cost, vcost: sim.V.cost, fcost: sim.F.cost }[ask];
    return R ? R[ask] : undefined;
  }
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  /** shares of a total in a ratio, each moved by up to ±spread %, the largest nudged so that the total is a multiple of the ratio's sum
      (then every revised standard quantity, and so every variance, is a whole number) */
  function spread(r, total, parts, pct) {
    const P = parts.reduce((a, b) => a + b, 0);
    const xs = parts.map(p => Math.max(1, Math.round((total * p) / P * (1 + ri(r, -pct, pct) / 100))));
    const big = xs.indexOf(Math.max(...xs)), s = xs.reduce((a, b) => a + b, 0);
    xs[big] -= s % P;
    return xs;
  }
  function genMat(r) {
    const n = ri(r, 2, 3), parts = Array.from({ length: n }, () => ri(r, 1, 5)), P = parts.reduce((a, b) => a + b, 0);
    const scale = pick(r, [10, 20]), stdOut = pick(r, [1, P * scale, P * scale * 0.9, P * scale * 0.8]);
    const K = ri(r, 5, 30) * 10;                                         // standard mixes in the actual output
    const aq = spread(r, P * scale * K * (1 + ri(r, -6, 8) / 100), parts, 8);
    return Object.assign({ out: stdOut * K, stdOut, pvOn: 'used' }, M6(parts.map((p, i) => { const sp = ri(r, 2, 12) * 5; return ['ABC'[i], p * scale, sp, aq[i], sp + ri(r, -4, 4), 0]; })));
  }
  /** grades whose hours worked total a multiple of the ratio's sum; out given = the same output as the materials (standard per unit) */
  function genLab(r, outGiven) {
    const n = ri(r, 2, 3), parts = Array.from({ length: n }, () => ri(r, 1, 4)), P = parts.reduce((a, b) => a + b, 0);
    const lStdOut = outGiven ? 1 : pick(r, [1, 10, 100]), out = outGiven || lStdOut * ri(r, 2, 12) * 10, K = out / lStdOut;
    const aw = spread(r, P * 2 * K * (1 + ri(r, -8, 8) / 100), parts, 10);
    return Object.assign({ out, lStdOut }, L6(parts.map((p, i) => {
      const sr = ri(r, 4, 30) * 5, idle = r() < 0.6 ? ri(r, 0, Math.max(1, Math.round(aw[i] * 0.06))) : 0;
      return [['Skilled', 'Semi-skilled', 'Unskilled'][i], p * 2, sr, aw[i] + idle, idle, sr + ri(r, -5, 5)];
    })));
  }
  /** budget and actual overheads with whole-rupee rates per hour, per unit and per day; out given = the materials' output */
  function genOh(r, outGiven) {
    const budDays = pick(r, [20, 24, 25, 26]), hpu = pick(r, [1, 2, 4, 5]);
    let budOut, hpd;
    if (outGiven) { budOut = Math.max(budDays, Math.round((outGiven * (1 + ri(r, -8, 12) / 100)) / budDays) * budDays); hpd = (budOut * hpu) / budDays; }
    else { hpd = ri(r, 4, 40) * 10; budOut = (budDays * hpd) / hpu; if (!Number.isInteger(budOut)) { hpd = ri(r, 4, 40) * 20; budOut = (budDays * hpd) / hpu; } }
    const budHrs = budDays * hpd, out = outGiven || Math.round((budOut * (1 + ri(r, -12, 10) / 100)) / 10) * 10;
    const actDays = budDays + pick(r, [-2, -1, 1, 2, 0]), actHrs = Math.round((hpu * out * (1 + ri(r, -6, 6) / 100)) / 10) * 10;
    const vr = ri(r, 2, 12), fr = ri(r, 4, 30);
    return { out, budOut, budHrs, actHrs, budDays, actDays, vBud: vr * budHrs, vAct: Math.round((vr * actHrs * (1 + ri(r, -8, 8) / 100)) / 100) * 100, fBud: fr * budHrs, fAct: Math.round((fr * budHrs * (1 + ri(r, -6, 6) / 100)) / 100) * 100 };
  }
  const SIGN = 'Type a favourable variance as a positive number and an adverse one with a minus sign (−1500 means ₹1,500 A).';
  function givenView(v) {
    const mode = v.mode, out = [];
    if (mode === 'material' || mode === 'total') out.push({ type: 'table', title: `Materials (standard mix gives ${qf(nz(v.stdOut))} units; actual output ${qf(nz(v.out))} units)`, head: ['Material', 'Std qty', 'Std price (₹)', 'Actual qty', 'Actual price (₹)'], rows: matRows(v).map(r => [r.name, qf(nz(r.sq)), qf(nz(r.sp)), qf(nz(r.aq)), qf(nz(r.ap))]), align: ['left', 'right', 'right', 'right', 'right'] });
    if (mode === 'labour' || mode === 'total') out.push({ type: 'table', title: `Labour (standard hours for ${qf(nz(v.lStdOut))} units; actual output ${qf(nz(v.out))} units)`, head: ['Grade', 'Std hours', 'Std rate (₹)', 'Hours paid', 'Idle hours', 'Actual rate (₹)'], rows: labRows(v).map(r => [r.name, qf(nz(r.sh)), qf(nz(r.sr)), qf(nz(r.ah)), qf(nz(r.idle)), qf(nz(r.ar))]), align: ['left', 'right', 'right', 'right', 'right', 'right'] });
    if (mode === 'voh' || mode === 'foh' || mode === 'total') {
      const rows = [['Output (units)', qf(nz(v.budOut)), qf(nz(v.out))], ['Hours', qf(nz(v.budHrs)), qf(nz(v.actHrs))]];
      if (mode !== 'foh') rows.push(['Variable overheads (₹)', qf(nz(v.vBud)), qf(nz(v.vAct))]);
      if (mode !== 'voh') rows.push(['Fixed overheads (₹)', qf(nz(v.fBud)), qf(nz(v.fAct))], ['Working days', qf(nz(v.budDays)), qf(nz(v.actDays))]);
      out.push({ type: 'table', title: 'Overheads', head: ['', 'Budget', 'Actual'], rows, align: ['left', 'right', 'right'] });
    }
    return out;
  }

  const def = {
    id: 'variance', title: 'Variance Analysis Lab',
    blurb: 'Split a cost variance branch by branch: material, labour and overheads, each part with its formula, F or A.',
    controls: [
      { id: 'mode', type: 'select', label: 'Variances of', value: 'material', options: MODES },
      { id: 'out', type: 'number', label: 'Actual output (units)', value: TAPRI.out, min: 0, max: 1e12, step: 'any' },
      { id: 'stdOut', type: 'number', label: 'Output of the standard mix (1 if the standard is per unit)', short: 'Standard mix output', value: TAPRI.stdOut, min: 0, max: 1e12, step: 'any', show: isM,
        help: 'The standard quantities below make this much output. A 100 kg mix with a 10% standard loss gives 90; if the standard is "4 kg per unit", enter 1.' },
      { id: 'mStd', type: 'table', label: 'Standard mix: quantity and price of each material', short: 'Standard mix', max: 6, show: isM, rows: TAPRI.mStd.map(r => r.slice()),
        cols: [{ id: 'name', label: 'Material', type: 'text', auto: n => String.fromCharCode(65 + n) }, { id: 'sq', label: 'Std qty', type: 'number', min: 0, max: 1e12, def: 10 }, { id: 'sp', label: 'Std price ₹', type: 'number', min: 0, max: 1e9, def: 10 }] },
      { id: 'mAct', type: 'table', label: 'Actual: matched to the standard by name', short: 'Actual materials', max: 6, show: isM, rows: TAPRI.mAct.map(r => r.slice()),
        cols: [{ id: 'name', label: 'Material', type: 'text', auto: n => String.fromCharCode(65 + n) }, { id: 'aq', label: 'Qty used', type: 'number', min: 0, max: 1e12, def: 10 }, { id: 'ap', label: 'Price ₹', type: 'number', min: 0, max: 1e9, def: 10 }, { id: 'pq', label: 'Bought (0 = used)', type: 'number', min: 0, max: 1e12, def: 0 }] },
      { id: 'pvOn', type: 'select', label: 'Material price variance on', value: 'used', options: [['used', 'quantity used'], ['bought', 'quantity bought']], show: v => (v.mode === 'material') && (v.mAct || []).some(r => nz(r[3]) > 0 && Math.abs(nz(r[3]) - nz(r[1])) > 1e-9) },
      { id: 'lStdOut', type: 'number', label: 'Output the standard hours are for (1 if per unit)', short: 'Standard hours are for', value: TAPRI.lStdOut, min: 0, max: 1e12, step: 'any', show: isL,
        help: 'The standard hours below produce this much output: 1 for "6 hours per unit", 25 for "100 workers make 25 units an hour" with 100 standard hours.' },
      { id: 'lStd', type: 'table', label: 'Standard gang: hours and rate of each grade', short: 'Standard gang', max: 6, show: isL, rows: TAPRI.lStd.map(r => r.slice()),
        cols: [{ id: 'name', label: 'Grade', type: 'text', auto: n => 'Grade ' + (n + 1) }, { id: 'sh', label: 'Std hours', type: 'number', min: 0, max: 1e12, def: 1 }, { id: 'sr', label: 'Std rate ₹', type: 'number', min: 0, max: 1e9, def: 10 }] },
      { id: 'lAct', type: 'table', label: 'Actual: matched to the standard by grade', short: 'Actual labour', max: 6, show: isL, rows: TAPRI.lAct.map(r => r.slice()),
        cols: [{ id: 'name', label: 'Grade', type: 'text', auto: n => 'Grade ' + (n + 1) }, { id: 'ah', label: 'Hours paid', type: 'number', min: 0, max: 1e12, def: 10 }, { id: 'idle', label: 'Idle hours', type: 'number', min: 0, max: 1e12, def: 0 }, { id: 'ar', label: 'Rate ₹', type: 'number', min: 0, max: 1e9, def: 10 }] },
      { id: 'budOut', type: 'number', label: 'Budgeted output (units)', value: TAPRI.budOut, min: 0, max: 1e12, step: 'any', show: isO },
      { id: 'budHrs', type: 'number', label: 'Budgeted hours (0 = not given)', short: 'Budgeted hours', value: TAPRI.budHrs, min: 0, max: 1e12, step: 'any', show: isO },
      { id: 'actHrs', type: 'number', label: 'Actual hours worked', value: TAPRI.actHrs, min: 0, max: 1e12, step: 'any', show: v => isO(v) && nz(v.budHrs) > 0 },
      { id: 'vBud', type: 'number', label: 'Budgeted variable overheads (₹)', short: 'Budgeted VOH', value: TAPRI.vBud, min: 0, max: 1e13, step: 'any', show: isV },
      { id: 'vAct', type: 'number', label: 'Actual variable overheads (₹)', short: 'Actual VOH', value: TAPRI.vAct, min: 0, max: 1e13, step: 'any', show: isV },
      { id: 'fBud', type: 'number', label: 'Budgeted fixed overheads (₹)', short: 'Budgeted FOH', value: TAPRI.fBud, min: 0, max: 1e13, step: 'any', show: isF },
      { id: 'fAct', type: 'number', label: 'Actual fixed overheads (₹)', short: 'Actual FOH', value: TAPRI.fAct, min: 0, max: 1e13, step: 'any', show: isF },
      { id: 'budDays', type: 'number', label: 'Budgeted working days (0 = not given)', short: 'Budgeted days', value: TAPRI.budDays, min: 0, max: 400, show: isF },
      { id: 'actDays', type: 'number', label: 'Actual working days', short: 'Actual days', value: TAPRI.actDays, min: 0, max: 400, show: v => isF(v) && nz(v.budDays) > 0 }
    ],
    presets, compute,
    challenge: {
      title: 'Compute a variance',
      gen(r) {
        const mode = lastMode, base = { mode };
        if (mode === 'material' || mode === 'total') Object.assign(base, genMat(r));
        if (mode === 'labour') Object.assign(base, genLab(r));
        if (mode === 'total') Object.assign(base, genLab(r, base.out));
        if (mode === 'voh' || mode === 'foh') Object.assign(base, genOh(r));
        if (mode === 'total') Object.assign(base, genOh(r, base.out));
        base.ask = pick(r, ASK[mode])[0];
        return base;
      },
      prompt(v) {
        const a = (ASK[v.mode] || []).find(x => x[0] === v.ask) || ['', 'variance'];
        return `Find the **${a[1]}** from the data shown. ${SIGN}`;
      },
      solve: (res, v) => answerOf(res.sim, v.ask), tol: 1, unit: '₹', kind: 'num', signed: true,
      view: (res, v) => givenView(v),
      explain(res, v) {
        const S = res.sim, a = v.ask;
        const lines = {
          material: { cost: () => `SQ × SP − AQ × AP = ${inr(S.M.SC)} − ${inr(S.M.AC)} = ${fv(S.M.cost)}.`, price: () => `AQ × (SP − AP): ${each(S.M, m => `${m.name} ${qf(m.aq)} × (${qf(m.sp)} − ${qf(m.ap)}) = ${fv(m.price)}`)}; total ${fv(S.M.price)}.`,
            usage: () => `SP × (SQ − AQ): ${each(S.M, m => `${m.name} ${qf(m.sp)} × (${qf(m.SQ)} − ${qf(m.aq)}) = ${fv(m.usage)}`)}; total ${fv(S.M.usage)}.`,
            mix: () => `RSQ = ${qf(S.M.TAQ)} in the ratio ${S.M.rows.map(m => qf(m.sq)).join(' : ')}; SP × (RSQ − AQ): ${each(S.M, m => `${m.name} ${qf(m.sp)} × (${qf(m.RSQ)} − ${qf(m.aq)}) = ${fv(m.mix)}`)}; total ${fv(S.M.mix)}.`,
            yield: () => `SP × (SQ − RSQ): ${each(S.M, m => `${m.name} ${qf(m.sp)} × (${qf(m.SQ)} − ${qf(m.RSQ)}) = ${fv(m.yield)}`)}; total ${fv(S.M.yield)}.` },
          labour: { cost: () => `SH × SR − AH paid × AR = ${inr(S.L.SC)} − ${inr(S.L.AC)} = ${fv(S.L.cost)}.`, rate: () => `AH paid × (SR − AR): ${each(S.L, x => `${x.name} ${qf(x.ah)} × (${qf(x.sr)} − ${qf(x.ar)}) = ${fv(x.rate)}`)}; total ${fv(S.L.rate)}.`,
            idle: () => `Idle hours × SR: ${each(S.L, x => `${x.name} ${qf(x.idle)} × ${qf(x.sr)}`)}; total ${fv(S.L.idle)}.`, eff: () => `SR × (SH − AH worked): ${each(S.L, x => `${x.name} ${qf(x.sr)} × (${qf(x.SH)} − ${qf(x.AW)}) = ${fv(x.eff)}`)}; total ${fv(S.L.eff)}.`,
            mix: () => `RSH = ${qf(S.L.TAW)} hours worked in the ratio ${S.L.rows.map(x => qf(x.sh)).join(' : ')}; SR × (RSH − AH worked): ${each(S.L, x => `${x.name} ${fv(x.mix)}`)}; total ${fv(S.L.mix)}.`,
            yield: () => `SR × (SH − RSH): ${each(S.L, x => `${x.name} ${qf(x.sr)} × (${qf(x.SH)} − ${qf(x.RSH)}) = ${fv(x.yield)}`)}; total ${fv(S.L.yield)}.` },
          voh: { cost: () => `SR × SH − actual = ${inr(S.V.absorbed)} − ${inr(S.V.act)} = ${fv(S.V.cost)}.`, exp: () => `SR × AH − actual = ${inr(S.V.SRh)} × ${qf(S.V.actHrs)} − ${inr(S.V.act)} = ${fv(S.V.exp)}.`, eff: () => `SR × (SH − AH) = ${inr(S.V.SRh)} × (${qf(S.V.SH)} − ${qf(S.V.actHrs)}) = ${fv(S.V.eff)}.` },
          foh: { cost: () => `Absorbed − actual = ${inr(S.F.absorbed)} − ${inr(S.F.act)} = ${fv(S.F.cost)}.`, exp: () => `Budgeted − actual = ${inr(S.F.bud)} − ${inr(S.F.act)} = ${fv(S.F.exp)}.`, vol: () => `Absorbed − budgeted = ${inr(S.F.absorbed)} − ${inr(S.F.bud)} = ${fv(S.F.vol)}.`,
            eff: () => `SR × (SH − AH) = ${inr(S.F.SRh)} × (${qf(S.F.SH)} − ${qf(S.F.actHrs)}) = ${fv(S.F.eff)}.`, cap: () => `SR × (AH − revised budgeted hours) = ${inr(S.F.SRh)} × (${qf(S.F.actHrs)} − ${qf(S.F.RBH)}) = ${fv(S.F.cap)}.`, cal: () => `Rate per day × (actual − budgeted days) = ${inr(S.F.SRd)} × (${qf(S.F.actDays)} − ${qf(S.F.budDays)}) = ${fv(S.F.cal)}.` },
          total: { total: () => `Standard cost of actual output − actual cost = ${inr(S.T.SC)} − ${inr(S.T.AC)} = ${fv(S.T.total)}.`, mcost: () => `${inr(S.M.SC)} − ${inr(S.M.AC)} = ${fv(S.M.cost)}.`, lcost: () => `${inr(S.L.SC)} − ${inr(S.L.AC)} = ${fv(S.L.cost)}.`, vcost: () => `${inr(S.V.absorbed)} − ${inr(S.V.act)} = ${fv(S.V.cost)}.`, fcost: () => `${inr(S.F.absorbed)} − ${inr(S.F.act)} = ${fv(S.F.cost)}.` }
        };
        const f = (lines[S.mode] || {})[a];
        return (f ? f() : '') + ' Favourable is entered as positive, adverse as negative.';
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { material, labour, voh, foh, compute, def, fv, _lastMode: () => lastMode };
  g.__lab_def_variance = def;
})(typeof window !== 'undefined' ? window : globalThis);
