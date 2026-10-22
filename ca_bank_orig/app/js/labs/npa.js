/* PassBook — Bank Advances Lab (Paper 5, aud.bank). Pure part: classify(v) dates an advance's irregularity (the oldest unpaid due of a
   term loan or bill, the start of a cash credit's out-of-order spell, a crop loan's crop seasons), walks it through SMA-0/1/2 → NPA →
   sub-standard → doubtful D1/D2/D3 to the classification date, applies the Study Material's special rules (advances against deposits,
   government guarantees, borrower-wise classification, erosion of security, loss identified) and computes the provision the Study Material
   gives (sub-standard 15%; doubtful 25% / 40% / 100% of the secured portion + 100% of the unsecured portion; loss 100%).
   Source: ICAI Study Material, Paper 5, Ch 10 §3 (income recognition), §12.6–12.11 (prudential norms), §13 (drawing power), §14 (audit of
   advances). Amounts are in ₹ lakh. Node-testable: require('app/js/labs/npa.js') exposes {parseDate, fmt, addMonths, classify, provision,
   compute, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------------------------------------------------------- dates as whole days (UTC, so no time zone or DST can move them) */
  const DAY = 864e5;
  const ymd = n => { const d = new Date(n * DAY); return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]; };
  const dayOf = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / DAY);
  /** 'dd.mm.yyyy' (or dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd) → a day number; '' → null; anything else throws a plain message */
  function parseDate(s, what) {
    const t = String(s == null ? '' : s).trim();
    if (!t) return null;
    let m = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(t), y, mo, d;
    if (m) { d = +m[1]; mo = +m[2]; y = +m[3]; }
    else if ((m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t))) { y = +m[1]; mo = +m[2]; d = +m[3]; }
    else throw new Error(`${what}: write the date as dd.mm.yyyy, for example 31.03.2026.`);
    const n = dayOf(y, mo, d), back = ymd(n);
    if (mo < 1 || mo > 12 || back[0] !== y || back[1] !== mo || back[2] !== d || y < 1990 || y > 2100) throw new Error(`${what}: ${t} is not a real date.`);
    return n;
  }
  const fmt = n => { const [y, m, d] = ymd(n); return `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`; };
  /** the same day k months later; a day the month lacks becomes its last day (31.01 + 1 month = 28/29.02) */
  function addMonths(n, k) {
    const [y, m, d] = ymd(n), t = (m - 1) + k, Y = y + Math.floor(t / 12), M = ((t % 12) + 12) % 12 + 1;
    const last = new Date(Date.UTC(Y, M, 0)).getUTCDate();
    return dayOf(Y, M, Math.min(d, last));
  }
  const lakh = x => '₹' + (Math.round(x * 100) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' lakh';

  /* ---------------------------------------------------------------- the categories, mildest first */
  const CATS = ['std', 'sma0', 'sma1', 'sma2', 'sub', 'd1', 'd2', 'd3', 'loss'];
  const CAT_NAME = { std: 'Standard', sma0: 'Standard (SMA-0)', sma1: 'Standard (SMA-1)', sma2: 'Standard (SMA-2)', sub: 'Sub-standard', d1: 'Doubtful D1', d2: 'Doubtful D2', d3: 'Doubtful D3', loss: 'Loss' };
  const CAT_SHORT = { std: 'Standard', sma0: 'SMA-0', sma1: 'SMA-1', sma2: 'SMA-2', sub: 'Sub-standard', d1: 'D1', d2: 'D2', d3: 'D3', loss: 'Loss' };
  const COLOR = { Standard: 'ok', 'SMA-0': 'e', 'SMA-1': 'f', 'SMA-2': 'warn', 'Sub-standard': 'c', D1: 'd', D2: 'b', D3: 'bad', Loss: 'bad', Overdue: 'warn' };
  const isNpa = c => CATS.indexOf(c) >= CATS.indexOf('sub');
  const worse = (a, b) => (CATS.indexOf(a) >= CATS.indexOf(b) ? a : b);
  const ANSWER = { std: 'Standard', sma0: 'Standard', sma1: 'Standard', sma2: 'Standard', sub: 'Sub-standard', d1: 'Doubtful D1', d2: 'Doubtful D2', d3: 'Doubtful D3', loss: 'Loss' };

  const FAC = {
    term: 'Term loan (instalment or interest)', cc: 'Cash credit / overdraft', bills: 'Bill purchased or discounted',
    agriS: 'Crop loan: short-duration crop', agriL: 'Crop loan: long-duration crop'
  };
  const FAC_SHORT = { term: 'term loan', cc: 'cash credit account', bills: 'bill', agriS: 'crop loan (short-duration crop)', agriL: 'crop loan (long-duration crop)' };

  /** one facility's timeline: the start of its irregularity, the NPA date and the dated milestones up to the classification date T.
      f: {facility, start (day), kind ('due' | 'excess' | 'nocredit' | 'short'), season (months)}. Day counting (see the note):
      a due date or the first day in excess is day 1; for "no credits" the day after the last credit is day 1 */
  function timeline(f, T) {
    const ms = [];
    if (f.start == null) return { start: null, npa: null, ms, cat: 'std', days: 0 };
    const S = f.start;                                         // day 1 of the irregularity
    if (S > T) return { start: S, npa: null, ms, cat: 'std', days: 0, future: true };
    const days = T - S + 1;
    const agri = f.facility === 'agriS' || f.facility === 'agriL';
    let N;
    if (agri) N = addMonths(f.due, (f.facility === 'agriS' ? 2 : 1) * f.season);     // overdue for two crop seasons (short) / one (long)
    else if (f.facility === 'cc') N = S + 89;                  // out of order once the irregularity has run "continuously for 90 days"
    else N = S + 90;                                           // term loan, bill: NPA when overdue for more than 90 days (day 91)
    const push = (day, cat, ev) => { if (day <= T) ms.push({ day, cat, ev }); };
    if (agri) push(S, 'std', 'due');
    else { push(S, 'sma0', 'sma0'); if (S + 30 < N) push(S + 30, 'sma1', 'sma1'); if (S + 60 < N) push(S + 60, 'sma2', 'sma2'); }
    push(N, 'sub', 'npa');
    const D1 = addMonths(N, 12), D2 = addMonths(N, 24), D3 = addMonths(N, 48);
    push(D1, 'd1', 'd1'); push(D2, 'd2', 'd2'); push(D3, 'd3', 'd3');
    const cat = ms.length ? ms[ms.length - 1].cat : 'std';
    return { start: S, npa: N, d1: D1, d2: D2, d3: D3, ms, cat, days };
  }

  /** the provision the Study Material gives for a category, on the outstanding balance split into secured and unsecured portions */
  function provision(cat, outstanding, security) {
    const sec = Math.min(Math.max(0, security), outstanding), uns = outstanding - sec;
    const R = { sub: [0.15, 0.15], d1: [0.25, 1], d2: [0.40, 1], d3: [1, 1], loss: [1, 1] }[cat];
    if (!R) return { rateSec: null, rateUns: null, sec, uns, amount: null };
    if (cat === 'sub' || cat === 'loss') return { rateSec: R[0], rateUns: R[1], sec, uns, amount: R[0] * outstanding, flat: true };
    return { rateSec: R[0], rateUns: R[1], sec, uns, amount: R[0] * sec + R[1] * uns };
  }

  /* ---------------------------------------------------------------- inputs → classification */
  function readFacility(v, T) {
    const fac = v.facility;
    if (!FAC[fac]) throw new Error('Choose the kind of advance.');
    const f = { facility: fac, kind: 'due', start: null, season: null };
    if (fac === 'cc') {
      f.kind = v.ccTest;
      if (f.kind === 'regular') return f;
      if (f.kind === 'excess') f.start = parseDate(v.excessSince, 'Above the limit or drawing power since');
      else if (f.kind === 'nocredit') { const L = parseDate(v.lastCredit, 'Last credit into the account on'); f.start = L == null ? null : L + 1; f.lastCredit = L; }
      else if (f.kind === 'short') {
        if (!(+v.interest > 0)) throw new Error('Give the interest debited in the period (more than 0).');
        if (!(+v.credits >= 0)) throw new Error('Credits cannot be negative.');
        f.interest = +v.interest; f.credits = +v.credits;
        if (f.credits >= f.interest) { f.kind = 'shortok'; return f; }
        const S = parseDate(v.shortSince, 'Credits have not covered the interest since');
        f.start = S == null ? T - 89 : S;                      // blank: the 90-day period ending on the classification date
      } else throw new Error('Choose which out-of-order test applies.');
      if (f.start == null) throw new Error('Give the date the irregularity began (dd.mm.yyyy).');
      return f;
    }
    f.due = parseDate(v.due, fac === 'bills' ? 'Bill due date' : 'Oldest unpaid due date');
    f.start = f.due;
    if (fac === 'agriS' || fac === 'agriL') {
      const s = +v.season;
      if (!(s >= 1 && s <= 60)) throw new Error('Give the crop season in months (1 to 60).');
      if (fac === 'agriS' && s > 12) throw new Error('A crop season longer than one year makes it a long-duration crop: choose “Crop loan: long-duration crop”.');
      if (fac === 'agriL' && s <= 12) throw new Error('A long-duration crop has a crop season longer than one year (more than 12 months).');
      f.season = s;
    }
    return f;
  }

  function classify(v) {
    const T = parseDate(v.asof, 'Classify as on');
    if (T == null) throw new Error('Give the classification (balance sheet) date, for example 31.03.2026.');
    const out = +v.outstanding, sec = v.unsecured ? 0 : +v.security, assessed = v.unsecured ? 0 : +v.assessed;
    if (!(out > 0)) throw new Error('The outstanding balance must be more than 0.');
    if (!(sec >= 0) || !(assessed >= 0)) throw new Error('Security values cannot be negative.');
    const f = readFacility(v, T), tl = timeline(f, T);
    const steps = [];                                          // the special rules applied after the timeline, in order
    let cat = tl.cat, income = isNpa(cat) ? 'receipt' : 'accrual';
    const ageCat = cat;
    /* borrower-wise: the other loan of the same borrower (its oldest unpaid due) */
    let other = null;
    if (v.otherSince && String(v.otherSince).trim()) {
      const o = { facility: 'term', kind: 'due', start: parseDate(v.otherSince, 'The other loan’s oldest unpaid due') };
      other = timeline(o, T);
      if (isNpa(other.cat) || isNpa(cat)) {
        const both = worse(cat, other.cat);
        if (both !== cat) steps.push({ rule: 'borrower', from: cat, to: both });
        cat = both; other.final = both;
      } else other.final = other.cat;
    }
    /* advances against term deposits, NSCs, KVP/IVP, life policies with adequate margin: need not be treated as NPA */
    if (v.deposits && isNpa(cat)) { steps.push({ rule: 'deposits', from: cat, to: 'std' }); cat = 'std'; income = 'accrual'; }
    /* government guarantees */
    if (v.guarantee === 'central' && isNpa(cat)) { steps.push({ rule: 'central', from: cat, to: 'std' }); cat = 'std'; income = 'receipt'; }
    if (v.guarantee === 'state' && isNpa(cat)) steps.push({ rule: 'state', from: cat, to: cat });
    /* erosion of security and loss (the Study Material applies these to NPAs) */
    if (isNpa(cat) && !v.unsecured && sec < 0.1 * out) { steps.push({ rule: 'ten', from: cat, to: 'loss' }); cat = 'loss'; }
    else if (isNpa(cat) && !v.unsecured && assessed > 0 && sec < 0.5 * assessed && CATS.indexOf(cat) < CATS.indexOf('d1')) { steps.push({ rule: 'fifty', from: cat, to: 'd1' }); cat = 'd1'; }
    if (v.lossFound && cat !== 'loss') { steps.push({ rule: 'lossFound', from: cat, to: 'loss' }); cat = 'loss'; }
    if (isNpa(cat)) income = 'receipt';
    const P = provision(cat, out, sec);
    return { T, f, tl, ageCat, cat, steps, other, income, out, sec, assessed, P, unsecured: !!v.unsecured };
  }

  /* ---------------------------------------------------------------- drawing */
  const EVENT = {
    due: (C, m) => `**${fmt(m.day)}**: the instalment falls due and is not paid. A crop loan is not an NPA until it stays overdue for ${C.f.facility === 'agriS' ? 'two crop seasons' : 'one crop season'} (${C.f.facility === 'agriS' ? 2 * C.f.season : C.f.season} months here).`,
    sma0: (C, m) => C.f.facility === 'cc'
      ? `**${fmt(m.day)}**: ${C.f.kind === 'excess' ? 'the balance goes above the sanctioned limit or drawing power' : C.f.kind === 'nocredit' ? `the first day with no credit after the last one on ${fmt(C.f.lastCredit)}` : 'the period in which credits do not cover the interest debited begins'}. The account is irregular but still **standard**: an SMA-0, showing stress signals.`
      : `**${fmt(m.day)}**: the ${C.f.facility === 'bills' ? 'bill' : 'instalment or interest'} is not paid on the due date fixed by the bank, so it is **overdue** (day 1). Still **standard**: SMA-0, showing stress signals.`,
    sma1: (C, m) => `**${fmt(m.day)}**: day 31 → **SMA-1** (31–60 days). The auditor reviews the SMA list: these accounts may slip from standard into NPA.`,
    sma2: (C, m) => `**${fmt(m.day)}**: day 61 → **SMA-2** (61–90 days). One more month and it is an NPA.`,
    npa: (C, m) => (C.f.facility === 'cc'
      ? `**${fmt(m.day)}**: day 90 of the irregularity: the account is **out of order** (${C.f.kind === 'excess' ? 'continuously above the limit or drawing power' : C.f.kind === 'nocredit' ? 'no credits continuously for 90 days' : 'credits not enough to cover the interest debited in the period'}), so it is an **NPA**.`
      : C.f.facility === 'agriS' || C.f.facility === 'agriL' ? `**${fmt(m.day)}**: overdue for ${C.f.facility === 'agriS' ? 'two crop seasons' : 'one crop season'}: an **NPA**.`
        : `**${fmt(m.day)}**: day 91, overdue for **more than 90 days**: an **NPA**.`) +
      ' It is **sub-standard** (NPA for up to 12 months), provision 15%. From now on interest is booked only when actually received, and unrealised interest of past periods is reversed or provided for.',
    d1: (C, m) => `**${fmt(m.day)}**: 12 months as sub-standard → **doubtful D1** (doubtful up to 1 year): 25% of the secured portion + 100% of the unsecured portion.`,
    d2: (C, m) => `**${fmt(m.day)}**: one year in the doubtful category → **D2** (1 to 3 years): 40% of the secured portion + 100% of the unsecured portion.`,
    d3: (C, m) => `**${fmt(m.day)}**: three years in the doubtful category → **D3** (more than 3 years): 100% of both portions.`
  };
  const RULE = {
    borrower: (C, s) => `**Borrower-wise.** The same borrower’s other loan is ${CAT_NAME[C.other.cat].toLowerCase()} (oldest unpaid due ${fmt(C.other.start)}). Classification is borrower-wise, not facility-wise, so this facility becomes **${CAT_NAME[s.to]}** too, however regular it is on its own.`,
    deposits: () => '**Advance against term deposits / NSCs / KVP / IVP / life policies** with adequate margin: it need not be treated as an NPA, so it stays **standard**.',
    central: () => '**Central Government guarantee**, not invoked or repudiated: the advance is classified as a **standard asset** (no NPA provision), but it is regarded as an **NPA for income recognition**: interest only when received.',
    state: () => '**State Government guarantee**: no relief. Overdue for more than 90 days, it is an NPA for both provisioning and income recognition.',
    ten: (C) => `**Erosion: loss.** The realisable value of the security (${lakh(C.sec)}) is less than 10% of the outstanding (${lakh(C.out)}): the security is ignored and the account is straight away a **loss asset**, to be written off or fully provided for.`,
    fifty: (C) => `**Erosion: doubtful.** The realisable value of the security (${lakh(C.sec)}) is less than 50% of the value assessed earlier (${lakh(C.assessed)}): significant erosion, so the NPA goes **straight to the doubtful category** (D1 at least) with doubtful-asset provisioning.`,
    lossFound: () => '**Loss identified** by the bank, its internal or external auditors or the RBI inspection, but not written off: a **loss asset**, 100% provision.'
  };
  const card = (v, C) => {
    const f = C.f, kind = f.facility === 'cc' ? { excess: `Above the limit / drawing power since ${fmt(f.start)}`, nocredit: `Last credit on ${fmt(f.lastCredit)}`, short: `Interest debited ${lakh(f.interest)}, credits ${lakh(f.credits)}${String(v.shortSince || '').trim() ? ' since ' + fmt(f.start) : ' in the last 90 days'}`, shortok: `Interest debited ${lakh(f.interest)}, credits ${lakh(f.credits)}`, regular: 'Within the limit and drawing power, with regular credits' }[f.kind]
      : f.due != null ? `Oldest unpaid ${f.facility === 'bills' ? 'bill due' : 'due'} on ${fmt(f.due)}` : 'Nothing overdue';
    const bits = [`<b>${esc(FAC[f.facility])}</b>${f.season ? ` (crop season ${f.season} months)` : ''}`, kind, `Outstanding ${lakh(C.out)}`, C.unsecured ? 'Unsecured' : `Security realisable ${lakh(C.sec)}${C.assessed > 0 ? ` (assessed earlier at ${lakh(C.assessed)})` : ''}`];
    if (C.other) bits.push(`Same borrower’s other loan: oldest unpaid due ${fmt(C.other.start)}`);
    if (v.deposits) bits.push('Against term deposits / NSCs with adequate margin');
    if (v.guarantee === 'central') bits.push('Central Government guarantee (not invoked)');
    if (v.guarantee === 'state') bits.push('State Government guarantee');
    if (v.lossFound) bits.push('Loss identified, not written off');
    return { html: `<div class="ex npa-card"><div class="ex-h"><span class="ex-tag">Account</span><b>Classify as on ${fmt(C.T)}</b></div><div class="ex-b"><p>${bits.join(' · ')}</p></div></div>` };
  };

  /** the timeline as a one-lane Gantt chart: each status a coloured block from its milestone to the next (or to the date shown) */
  function gantt(tl, T, upto, title) {
    if (tl.start == null || tl.future) return null;
    const S = tl.start, end = T - S + 1, ms = tl.ms;
    const blocks = [];
    ms.forEach((m, i) => {
      if (m.day > upto) return;
      const to = Math.min(i + 1 < ms.length ? ms[i + 1].day : T + 1, upto + 1);
      const p = m.cat === 'std' ? 'Overdue' : CAT_SHORT[m.cat];
      blocks.push({ p, from: m.day - S, to: to - S, label: p });
    });
    const step = [30, 90, 180, 365, 730].find(s => end / s <= 9) || 1460;
    const colors = {}; blocks.forEach(b => (colors[b.p] = COLOR[b.p] || 'a'));
    const marks = [{ t: end, label: 'as on' }];
    if (tl.npa != null && tl.npa <= T) marks.push({ t: tl.npa - S, label: 'NPA' });
    return { type: 'gantt', title, alt: `${title}: status by day since day 1 of the irregularity`, w: 640, blocks: blocks.filter(b => b.to > b.from), axis: { min: 0, max: Math.max(end, 1), step }, marks: marks.filter(m => m.t > 0 && m.t <= end), colors };
  }
  function msTable(C, upto, rows) {
    return { type: 'table', title: 'The account’s history', head: ['Date', 'Day', 'What happens', 'Status'], rows: rows.slice(0, upto),
      cells: upto ? { [(upto - 1) + ',3']: 'hl' } : {}, align: ['left', 'right', 'left', 'left'] };
  }

  let lastFacility = 'term';
  function compute(v) {
    if (FAC[v.facility]) lastFacility = v.facility;           // Test yourself follows the kind of advance being explored
    const C = classify(v), f = C.f, tl = C.tl, T = C.T;
    const frames = [], crd = card(v, C);
    const rows = tl.ms.map(m => [fmt(m.day), m.cat === 'std' && m.ev === 'due' ? 'due' : String(m.day - tl.start + 1), { due: 'instalment due, unpaid', sma0: 'irregular / overdue', sma1: 'day 31', sma2: 'day 61', npa: 'becomes an NPA', d1: '12 months as NPA', d2: '24 months as NPA', d3: '48 months as NPA' }[m.ev], m.ev === 'due' ? 'Standard (overdue)' : CAT_NAME[m.cat]]);
    const TITLE = 'This account';
    const view = (upto, k, extra) => [crd].concat([gantt(tl, T, upto, TITLE)].filter(Boolean), [msTable(C, k, rows)], extra || []);
    const intro = f.facility === 'cc'
      ? (f.kind === 'regular' || f.kind === 'shortok' ? 'A cash credit or overdraft is an NPA only when it is **out of order**. ' : 'A cash credit or overdraft becomes an NPA when it is **out of order**: continuously above the sanctioned limit or drawing power, no credits continuously for 90 days, or credits not enough to cover the interest debited. ')
      : f.facility === 'agriS' || f.facility === 'agriL' ? `A crop loan for a ${f.facility === 'agriS' ? 'short' : 'long'}-duration crop becomes an NPA when the instalment of principal or interest stays overdue for **${f.facility === 'agriS' ? 'two crop seasons' : 'one crop season'}**. `
        : `A ${FAC_SHORT[f.facility]} becomes an NPA when ${f.facility === 'bills' ? 'the bill' : 'interest and/or an instalment of principal'} stays **overdue for more than 90 days**. Classification rests on the **record of recovery**, not on the security or the borrower’s net worth. `;
    frames.push({ caption: `**Start.** ${intro}${tl.start == null ? 'Here nothing is irregular.' : tl.future ? `The first irregular day (${fmt(tl.start)}) is after ${fmt(T)}, so nothing is overdue yet.` : `Press ▶ to walk the account from ${fmt(tl.start)} to ${fmt(T)}.`}`,
      view: [crd].concat([gantt(tl, T, tl.start == null || tl.future ? T : tl.start - 1, TITLE)].filter(Boolean), [msTable(C, 0, rows)]) });
    tl.ms.forEach((m, i) => frames.push({ caption: EVENT[m.ev](C, m), view: view(m.day, i + 1) }));
    /* as on the classification date */
    const ageTxt = tl.start == null || tl.future ? 'nothing is irregular' : f.facility === 'agriS' || f.facility === 'agriL' ? `overdue for ${tl.days} days (${C.f.facility === 'agriS' ? 'two crop seasons' : 'one crop season'} = until ${fmt(tl.npa)})` : `day ${tl.days} of the irregularity`;
    frames.push({ caption: `**As on ${fmt(T)}**: ${ageTxt}. By age the account is **${CAT_NAME[C.ageCat]}**${f.kind === 'shortok' ? ': the credits cover the interest debited, so the account is not out of order' : ''}.` + (C.steps.length ? ' Now the special rules.' : ''),
      view: view(T, rows.length) });
    /* special rules, one frame each */
    let otherView = null;
    if (C.other) otherView = gantt(C.other, T, T, 'The same borrower’s other loan');
    C.steps.forEach(s => frames.push({ caption: RULE[s.rule](C, s), view: view(T, rows.length, s.rule === 'borrower' && otherView ? [otherView] : []) }));
    /* provision */
    const P = C.P;
    const provRows = !isNpa(C.cat) ? [['Standard asset', C.cat === 'std' && C.steps.some(s => s.rule === 'central') ? 'standard (Central Government guarantee)' : CAT_NAME[C.cat], 'The Study Material gives no rate for standard assets', '—']]
      : P.flat ? [[CAT_NAME[C.cat], lakh(C.out), `${Math.round(P.rateSec * 100)}% of the outstanding`, lakh(P.amount)]]
        : [['Secured portion', lakh(P.sec), `${Math.round(P.rateSec * 100)}%`, lakh(P.rateSec * P.sec)], ['Unsecured portion', lakh(P.uns), '100%', lakh(P.uns)], ['Total provision', lakh(C.out), CAT_NAME[C.cat], lakh(P.amount)]];
    const provSpec = { type: 'table', title: 'Provision (Study Material Ch 10 §12.6)', head: ['Part', 'Amount', 'Rate', 'Provision'], rows: provRows, align: ['left', 'right', 'left', 'right'], cells: { [(provRows.length - 1) + ',3']: 'hl' } };
    /* the auditor's checks for this account */
    const checks = [['Record of recovery', 'Classify on the record of recovery; do not let the security or the borrower’s or guarantor’s net worth keep an overdue account standard.']];
    if (C.other || isNpa(C.cat)) checks.push(['Borrower-wise', 'Check every other facility of the same borrower: one NPA makes all of them NPAs.']);
    checks.push(['Year-end credits', 'Examine credits just before and transactions just after the balance sheet date: a solitary credit that is reversed soon after does not regularise an account with inherent weakness.']);
    if (f.facility === 'cc') checks.push(['Drawing power', 'Recompute drawing power from stock statements not older than three months (paid stocks and eligible debtors less margins); review stock audit reports (funded exposure above ₹5 crore).']);
    if (isNpa(C.cat) || C.sec > 0) checks.push(['Security', 'Examine the existence, enforceability and valuation of the security; compare its realisable value with the value assessed earlier (erosion) and with the outstanding.']);
    if (isNpa(C.cat) || C.income === 'receipt') checks.push(['Income', 'Interest on NPAs is booked only on actual receipt; interest debited but not realised is reversed or provided for.']);
    if (isNpa(C.cat)) checks.push(['Provision', `Recompute the provision (${lakh(P.amount)}) against the norms; ICAI treats both under- and over-provision as not proper.`]);
    if (v.guarantee && v.guarantee !== 'none') checks.push(['Guarantee', 'Confirm whether the guarantee has been invoked or repudiated, and whether it is the Central or a State Government’s.']);
    frames.push({ caption: `**The auditor’s checks** for this account (Study Material Ch 10 §12.6 and §14).`, view: [{ type: 'table', title: 'What the bank’s auditor checks', head: ['Check', 'What to do'], rows: checks, align: ['left', 'left'] }] });

    const RULE_ROW = { borrower: 'borrower-wise: the other loan is an NPA', deposits: 'against deposits with adequate margin', central: 'Central Government guarantee', state: 'State Government guarantee: no relief', ten: 'security below 10% of the outstanding', fifty: 'security below 50% of its earlier value', lossFound: 'loss identified, not written off' };
    const table = { head: ['Date', 'Day', 'What happens', 'Status'], rows: rows.concat([[fmt(T), tl.start == null || tl.future ? '—' : String(tl.days), 'classification date (by age)', CAT_NAME[C.ageCat]]],
      C.steps.map(st => [fmt(T), '', RULE_ROW[st.rule], CAT_NAME[st.to]])) };
    /* the answer: the classification and its provision (the frame the lab opens on) */
    const finalTable = { type: 'table', title: 'The account’s history and the rules applied', head: table.head, rows: table.rows, cells: { [(table.rows.length - 1) + ',3']: 'hl' }, align: ['left', 'right', 'left', 'left'] };
    frames.push({ caption: isNpa(C.cat) ? `**${CAT_NAME[C.cat]}** → provision **${lakh(P.amount)}**${P.flat ? '' : ` = ${Math.round(P.rateSec * 100)}% × ${lakh(P.sec)} secured + 100% × ${lakh(P.uns)} unsecured`}. Interest on this NPA is income only when actually received.`
      : `**${CAT_NAME[C.cat]}**: no NPA provision.${C.income === 'receipt' ? ' But interest is recognised only when received (Central Government guarantee).' : ' Interest is accrued as usual.'}`,
    view: [crd].concat([gantt(tl, T, T, TITLE)].filter(Boolean), C.steps.some(st => st.rule === 'borrower') && otherView ? [otherView] : [], [provSpec, finalTable]) });
    const stats = [
      { label: 'Classification', value: CAT_NAME[C.cat], hint: 'standard / sub-standard / doubtful D1–D3 / loss' },
      isNpa(C.cat) && tl.npa != null && tl.npa <= T ? { label: 'NPA since', value: fmt(tl.npa), hint: f.facility === 'cc' ? 'out of order for 90 days' : f.facility === 'agriS' || f.facility === 'agriL' ? 'overdue for the crop seasons' : 'overdue for more than 90 days' }
        : { label: 'Days irregular', value: String(tl.start == null || tl.future ? 0 : tl.days), hint: 'the due date (or the first irregular day) is day 1' },
      { label: 'Provision', value: isNpa(C.cat) ? lakh(P.amount) : '—', hint: 'sub-standard 15%; D1 25% / D2 40% / D3 100% of secured + 100% of unsecured; loss 100%' },
      { label: 'Interest income', value: C.income === 'receipt' ? 'On receipt only' : 'Accrued', hint: 'income from NPAs is booked only when actually received' }
    ];
    const note = '**Conventions.** Amounts are in ₹ lakh. Days are counted the way RBI counts them: the due date of an unpaid instalment (or the first day a cash credit is above its limit or drawing power) is day 1, so a term loan or bill is overdue for more than 90 days on day 91 (due 31.03 → NPA on 29.06). For “no credits continuously for 90 days” the day after the last credit is day 1, and the account is out of order on day 90. ' +
      'SMA-0 is days 1–30, SMA-1 31–60 and SMA-2 61–90 (the Study Material describes SMA-0 as accounts showing stress signals). ' +
      'Sub-standard means NPA for up to 12 months; doubtful D1, D2 and D3 start 12, 24 and 48 months after the NPA date. ' +
      'Erosion is tested only for an NPA: realisable security below 10% of the outstanding makes it a loss asset; below 50% of the value assessed earlier sends it straight to doubtful (D1 at least). ' +
      'Classification is borrower-wise; once an account is an NPA the lab does not upgrade it (the Study Material does not cover upgradation). ' +
      'The Study Material gives provision rates for NPAs only: sub-standard 15% of the outstanding; D1, D2, D3 25%, 40%, 100% of the secured portion plus 100% of the unsecured portion; loss 100%.';
    return { frames, stats, table, note, sim: C };
  }

  /* ---------------------------------------------------------------- definition */
  const isCC = v => v.facility === 'cc';
  const def = {
    id: 'npa', title: 'Bank Advances Lab',
    blurb: 'Watch an advance age from overdue to SMA, NPA, sub-standard, doubtful D1–D3 or loss, with its provision and checks.',
    controls: [
      { id: 'facility', type: 'select', label: 'Kind of advance', value: 'term', options: Object.entries(FAC) },
      { id: 'asof', type: 'text', label: 'Classify as on (balance sheet date)', value: '31.03.2026', placeholder: 'dd.mm.yyyy' },
      { id: 'ccTest', type: 'select', label: 'Out-of-order test', value: 'nocredit', options: [['excess', 'Balance continuously above the limit / drawing power'], ['nocredit', 'No credits into the account'], ['short', 'Credits less than the interest debited'], ['regular', 'None: the account is in order']], show: isCC },
      { id: 'due', type: 'text', label: 'Oldest unpaid instalment, interest or bill: due on (blank: nothing overdue)', short: 'Unpaid since', value: '15.09.2024', placeholder: 'dd.mm.yyyy', show: v => !isCC(v) },
      { id: 'excessSince', type: 'text', label: 'Continuously above the limit / drawing power since', short: 'Above the limit since', value: '20.11.2025', placeholder: 'dd.mm.yyyy', show: v => isCC(v) && v.ccTest === 'excess' },
      { id: 'lastCredit', type: 'text', label: 'Last credit into the account on', short: 'Last credit', value: '31.12.2025', placeholder: 'dd.mm.yyyy', show: v => isCC(v) && v.ccTest === 'nocredit' },
      { id: 'shortSince', type: 'text', label: 'Credits have not covered the interest since (blank: the last 90 days)', short: 'Credits short since', value: '', placeholder: 'dd.mm.yyyy', show: v => isCC(v) && v.ccTest === 'short' },
      { id: 'interest', type: 'number', label: 'Interest debited in the period (₹ lakh)', value: 6, min: 0, max: 1e6, int: false, show: v => isCC(v) && v.ccTest === 'short' },
      { id: 'credits', type: 'number', label: 'Credits in the same period (₹ lakh)', value: 4, min: 0, max: 1e6, int: false, show: v => isCC(v) && v.ccTest === 'short' },
      { id: 'season', type: 'number', label: 'Crop season (months, as fixed by the State Level Bankers’ Committee)', short: 'Crop season (months)', value: 4, min: 1, max: 60, show: v => v.facility === 'agriS' || v.facility === 'agriL' },
      { id: 'outstanding', type: 'number', label: 'Outstanding balance (₹ lakh)', value: 140, min: 0, max: 1e7, int: false },
      { id: 'unsecured', type: 'toggle', label: 'Unsecured advance (no security was taken)', short: 'Unsecured', value: false },
      { id: 'security', type: 'number', label: 'Realisable value of the security now (₹ lakh)', value: 80, min: 0, max: 1e7, int: false, show: v => !v.unsecured },
      { id: 'assessed', type: 'number', label: 'Value of the security when last assessed by the bank or RBI (₹ lakh; 0 = not known)', short: 'Security value assessed earlier', value: 0, min: 0, max: 1e7, int: false, show: v => !v.unsecured },
      { id: 'otherSince', type: 'text', label: 'Same borrower’s other loan: oldest unpaid due (blank: none, or regular)', short: 'Other loan overdue since', value: '', placeholder: 'dd.mm.yyyy' },
      { id: 'deposits', type: 'toggle', label: 'Advance against term deposits / NSCs / KVP / IVP / life policies, adequate margin', short: 'Against deposits, adequate margin', value: false },
      { id: 'guarantee', type: 'select', label: 'Government guarantee', value: 'none', options: [['none', 'None'], ['central', 'Central Government (not invoked or repudiated)'], ['state', 'State Government']] },
      { id: 'lossFound', type: 'toggle', label: 'Loss identified by the bank, auditors or RBI, not written off', short: 'Loss identified', value: false }
    ],
    presets: [
      { label: 'MTP Sep 2024 Series I Q6(a): Sun Industries’ cash credit, last credit 31.12.2023', values: { facility: 'cc', ccTest: 'nocredit', asof: '31.03.2024', lastCredit: '31.12.2023', outstanding: 24.754, unsecured: false, security: 30, assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'PYQ Jan 2026 Q6(a)(i): JT Mills’ term loan, ₹140 lakh, security ₹80 lakh, D1 (dates set to make it D1)', values: { facility: 'term', asof: '31.03.2025', due: '30.06.2023', outstanding: 140, unsecured: false, security: 80, assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'PYQ Jan 2026 Q6(a)(ii): Z Pvt Ltd, ₹65 lakh outstanding, security ₹6 lakh', values: { facility: 'term', asof: '31.03.2025', due: '30.06.2023', outstanding: 65, unsecured: false, security: 6, assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'RTP Sep 2026 Q19: Crest Infrastructure, doubtful for 30 months (dates set to match)', values: { facility: 'term', asof: '31.03.2026', due: '02.07.2022', outstanding: 200, unsecured: false, security: 120, assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'SM Case Study Q5 / MTP Jan 2025 S2 Q7: car loan 60 days and housing loan 120 days overdue', values: { facility: 'term', asof: '31.03.2024', due: '01.02.2024', outstanding: 6, unsecured: false, security: 5, assessed: 0, otherSince: '03.12.2023', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'SM Case Study Q1: Kisan Credit Card paddy loan, no transaction for 90 days', values: { facility: 'agriS', asof: '31.03.2024', due: '02.01.2024', season: 4, outstanding: 20, unsecured: false, security: 25, assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'MTP Sep 2024 Series I Q2: Central Government guarantee, 95 days overdue', values: { facility: 'term', asof: '31.03.2024', due: '28.12.2023', outstanding: 50, unsecured: false, security: 40, assessed: 0, otherSince: '', deposits: false, guarantee: 'central', lossFound: false } },
      { label: 'Tapri Cold Chain’s truck loan at Malwa Bank: the trucks lose value', values: { facility: 'term', asof: '31.03.2026', due: '10.07.2025', outstanding: 1000, unsecured: false, security: 240, assessed: 600, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'Tapri’s cash credit at Malwa Bank: above drawing power since November', values: { facility: 'cc', ccTest: 'excess', asof: '31.03.2026', excessSince: '20.11.2025', outstanding: 860, unsecured: false, security: 950, assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } },
      { label: 'Tapri’s samosa-line loan, unpaid since 2021', values: { facility: 'term', asof: '31.03.2026', due: '30.09.2021', outstanding: 150, unsecured: false, security: 40, assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false } }
    ],
    compute,
    challenge: {
      title: 'Classify the account (or find its provision)',
      gen(r) {
        const fac = lastFacility, T = dayOf(2025 + Math.floor(r() * 2), 3, 31);
        const out = 10 * (2 + Math.floor(r() * 40)), secPct = 0.3 + 0.6 * r();
        const v = { facility: fac, asof: fmt(T), due: '', lastCredit: '', excessSince: '', shortSince: '', outstanding: out, unsecured: false, security: Math.round(out * secPct), assessed: 0, otherSince: '', deposits: false, guarantee: 'none', lossFound: false, ccTest: 'nocredit', season: 4, interest: 6, credits: 4 };
        /* a start date well clear of every boundary (±4 days), so the day-count convention never decides the answer */
        const pickStart = () => {
          for (let k = 0; k < 50; k++) {
            const days = 5 + Math.floor(r() * 1900), S = T - days + 1;
            const probe = Object.assign({}, v, fac !== 'cc' ? { due: fmt(S) } : v.ccTest === 'nocredit' ? { lastCredit: fmt(S - 1) } : { excessSince: fmt(S) });
            const tl = timeline(readFacility(probe, T), T);
            const near = [tl.start + 30, tl.start + 60, tl.npa, tl.d1, tl.d2, tl.d3].filter(x => x != null).some(x => Math.abs(x - T) <= 4);
            if (!near) return probe;
          }
          return Object.assign({}, v, { due: fmt(T - 400), lastCredit: fmt(T - 400), excessSince: fmt(T - 400) });
        };
        if (fac === 'agriS') v.season = 3 + Math.floor(r() * 8);
        if (fac === 'agriL') v.season = 14 + Math.floor(r() * 10);
        if (fac === 'cc') v.ccTest = r() < 0.5 ? 'nocredit' : 'excess';
        Object.assign(v, pickStart());
        const twist = r();
        if (twist < 0.12) v.security = Math.max(0, Math.floor(out * 0.08));                 // below 10% of the outstanding
        else if (twist < 0.22) { v.assessed = Math.round(v.security * (2.2 + r())); }      // eroded below half its earlier value
        v.ask = r() < 0.3 ? 'provision' : 'class';
        return v;
      },
      prompt(v, res) {
        const C = res.sim, f = C.f;
        const what = f.facility === 'cc' ? (f.kind === 'excess' ? `has been continuously above its drawing power since ${fmt(f.start)}` : `last received a credit on ${fmt(f.lastCredit)}`)
          : `has an unpaid ${f.facility === 'bills' ? 'bill due' : 'instalment due'} on ${fmt(f.due)}${f.season ? ` (crop season ${f.season} months)` : ''}`;
        const sec = `Outstanding ${lakh(C.out)}; realisable security ${lakh(C.sec)}${C.assessed > 0 ? `, assessed at ${lakh(C.assessed)} at the last inspection` : ''}.`;
        return v.ask === 'provision' && isNpa(C.cat)
          ? `A ${FAC_SHORT[f.facility]} ${what}. ${sec} What provision (₹ lakh, two decimals) do the norms in the Study Material require as on ${fmt(C.T)}?`
          : `A ${FAC_SHORT[f.facility]} ${what}. ${sec} How is it classified as on ${fmt(C.T)}: standard, sub-standard, doubtful D1, D2 or D3, or loss?`;
      },
      kind: (v, res) => (v.ask === 'provision' && isNpa(res.sim.cat) ? 'num' : 'choice'),
      choices: () => ['Standard', 'Sub-standard', 'Doubtful D1', 'Doubtful D2', 'Doubtful D3', 'Loss'].map(x => [x, x]),
      solve(res, v) { const C = res.sim; return v && v.ask === 'provision' && isNpa(C.cat) ? Math.round(C.P.amount * 100) / 100 : ANSWER[C.cat]; },
      tol: 0.011, unit: '₹ lakh',
      view: (res, v) => [card(v, res.sim)],
      explain(res) {
        const C = res.sim, tl = C.tl;
        const age = tl.npa != null && tl.npa <= C.T ? `It became an NPA on ${fmt(tl.npa)}; by ${fmt(C.T)} that makes it ${CAT_NAME[C.ageCat].toLowerCase()} by age` : `It is not an NPA by ${fmt(C.T)} (${CAT_NAME[C.ageCat].toLowerCase()})`;
        const rules = C.steps.map(s => RULE[s.rule](C, s).replace(/\*\*/g, '')).join(' ');
        return `${age}. ${rules} Classification: **${CAT_NAME[C.cat]}**${isNpa(C.cat) ? `; provision ${lakh(C.P.amount)}${C.P.flat ? '' : ` (${Math.round(C.P.rateSec * 100)}% of ${lakh(C.P.sec)} + 100% of ${lakh(C.P.uns)})`}` : ''}.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { parseDate, fmt, addMonths, dayOf, timeline, readFacility, classify, provision, CATS, compute, def };
  g.__lab_def_npa = def;
})(typeof window !== 'undefined' ? window : globalThis);
