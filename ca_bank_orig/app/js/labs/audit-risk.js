/* PassBook — Audit Risk and Materiality Lab (Paper 5, aud.risk; docs/LAB_GUIDE.md).
   Pure part (Node-testable through module.exports):
     riskModel(ir, cr)            the qualitative chain: inherent and control risk (low / moderate / high) → risk of material misstatement
                                  (RoMM, five grades) → the detection risk the auditor can accept (the inverse grade) → the substantive work
     withEvent(ir, cr, eventId)   one thing happens (a Study Material / ICAI case): which component moves, and the model before and after
     illustrativeDR(ar, ir, cr)   the Study Material's product, Audit risk = IR × CR × DR, solved for DR (percentages; illustrative only)
     materiality(values)          SA 320 materiality from a benchmark, performance materiality, clearly trivial, and SA 450's verdict on
                                  each misstatement and on the aggregate of the uncorrected ones
   Sources: ICAI Study Material, Paper 5, Ch 3 §1 (audit risk, pp. 3.4–3.11), §2 (materiality, pp. 3.16–3.24), §16 (SA 330, pp. 3.65–3.72);
   Ch 7 §3 (SA 450, pp. 7.23–7.27). The SAs prescribe no grid and no formula: the grid and the percentages are labelled illustrative. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const inr = n => (GA.util && GA.util.inr ? GA.util.inr(n) : '₹' + Math.round(n).toLocaleString('en-IN'));
  const r2 = x => Math.round(x * 100) / 100;
  const pc = x => `${+(+x).toFixed(2)}%`;
  const cap = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
  /** a bar label that fits: ₹30,000 · ₹12.5 lakh · ₹1.2 crore */
  const brief = n => (n >= 1e7 ? `₹${+(n / 1e7).toFixed(2)} crore` : n >= 1e5 ? `₹${+(n / 1e5).toFixed(2)} lakh` : inr(n));
  /** a y axis from 0 with 4–6 round ticks labelled in lakh / crore */
  function niceAxis(maxv) {
    const raw = (Math.max(1, maxv) * 1.12) / 4, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
    const step = (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p, top = Math.ceil((Math.max(1, maxv) * 1.12) / step) * step, ticks = [];
    for (let v = 0; v <= top + step / 1e6; v += step) ticks.push([v, v ? brief(v) : '0']);
    return { top, ticks };
  }

  /* ================================================================== the audit risk model (qualitative) */
  const LV = ['low', 'moderate', 'high'];
  const ROMM = ['Very low', 'Low', 'Moderate', 'High', 'Very high'];          // combined risk of material misstatement, by rank 0–4
  const DRG = ['Highest', 'Higher', 'Medium', 'Lower', 'Lowest'];             // acceptable detection risk: the inverse (the classic teaching grid)
  const WORK = ['Least', 'Less', 'Moderate', 'More', 'Most'];                 // extent of substantive work
  const ILL = { low: 25, moderate: 50, high: 100 }, AR_ILL = 5;                // illustrative percentages (not in any SA)
  const lvIdx = (x, who) => { const i = LV.indexOf(String(x)); if (i < 0) throw new Error(`${who} must be low, moderate or high.`); return i; };

  /** the chain for one assessment: rank = level(IR) + level(CR), 0 … 4 */
  function riskModel(ir, cr) {
    const rank = lvIdx(ir, 'Inherent risk') + lvIdx(cr, 'Control risk');
    const irPct = ILL[ir], crPct = ILL[cr], rommPct = (irPct * crPct) / 100;
    return { ir, cr, rank, romm: ROMM[rank], dr: DRG[rank], work: WORK[rank], irPct, crPct, rommPct, drPct: Math.min(100, (AR_ILL * 100) / rommPct) };
  }
  const up = x => LV[Math.min(2, LV.indexOf(x) + 1)];

  /* one thing happens: the component it moves (comp) and why. ICAI's own cases are marked with their source (tests cite the answers) */
  const EVENTS = {
    stubble: { comp: 'ir', label: 'A start-up in an industry where many companies have gone bust', src: 'Study Material TYU 1 (p. 3.11); MTP May 2025 Series II, Q1(a)(i)',
      why: 'Business failures in the industry make every assertion more likely to be misstated, before any control is considered. That is **inherent risk**.' },
    complex: { comp: 'ir', label: 'A complex accounting standard that management may not understand', src: 'Study Material p. 3.6',
      why: 'A complex matter is more likely to be recorded wrongly, whatever the controls. That is **inherent risk**.' },
    obsolete: { comp: 'ir', label: 'New products may make Tapri\'s premix stock obsolete', src: 'Study Material p. 3.6 (technological developments)',
      why: 'An outside development can make inventory obsolete, so its valuation is more likely to be misstated. That is **inherent risk**.' },
    sensors: { comp: 'cr', label: 'Two staff watch the cold-room sensors and may not report deviations', src: 'Study Material TYU 2 (p. 3.11); MTP May 2025 Series II, Q1(a)(ii)',
      why: 'A control exists (sensors and two named people) but may not operate. That is **control risk**.' },
    access: { comp: 'cr', label: 'Production supervisors can get into the inventory system without authority', src: 'MTP Jan 2026 Series II, Q11',
      why: 'Unauthorised access means the system\'s controls may fail to prevent, or detect and correct, a misstatement. That is **control risk**.' },
    travel: { comp: 'cr', label: 'Travel-expense entries (30% of expenses) are made by unauthorised staff', src: 'MTP May 2025 Series I, Q5',
      why: 'The control (only authorised staff post expenses) is not followed for these entries. That is **control risk**.' },
    petty: { comp: 'cr', label: 'The ₹10,000 limit on petty-cash payments is not followed', src: 'Study Material p. 3.7',
      why: 'A control has been devised but is not being followed. That is **control risk**.' },
    sample: { comp: 'dr', label: 'The planned revenue procedures may not detect misstatements', src: 'Study Material TYU 3 (p. 3.12); MTP May 2025 Series II, Q1(a)(iii)',
      why: 'The risk lies in the auditor\'s own procedures, not in the entity. That is **detection risk**.',
      fix: 'Extend the procedures on revenue: a larger and representative sample, tested by competent, experienced staff.' },
    nocount: { comp: 'dr', label: 'The team plans to skip the count of a large work-in-progress stock', src: 'Study Material p. 3.8',
      why: 'Choosing alternative procedures over attending the count raises the chance that the audit misses a material misstatement. That is **detection risk**.',
      fix: 'Attend the physical inventory count (SA 501) rather than rely on alternative procedures.' }
  };
  const COMP = { ir: 'Inherent risk', cr: 'Control risk', dr: 'Detection risk' };

  /** the model before and after an event; for an IR or CR event the component moves up one level (it stays at high) */
  function withEvent(ir, cr, id) {
    const before = riskModel(ir, cr);
    if (!id || id === 'none') return { before, after: before, ev: null };
    const ev = EVENTS[id];
    if (!ev) throw new Error('Pick an event from the list.');
    const ir2 = ev.comp === 'ir' ? up(ir) : ir, cr2 = ev.comp === 'cr' ? up(cr) : cr;
    return { before, after: riskModel(ir2, cr2), ev: Object.assign({ id }, ev), moved: ev.comp !== 'dr' && (ir2 !== ir || cr2 !== cr) };
  }

  /** the SA 330 response for an assessment (Study Material pp. 3.8, 3.65–3.71) */
  function responses(m, ev) {
    const k = m.rank;
    const rows = [
      ['More persuasive evidence?', k >= 3 ? 'Yes: the most persuasive evidence, because SA 330 asks for more persuasive evidence the higher the assessed risk' : k === 2 ? 'Persuasive evidence from a mix of procedures' : 'Less persuasive evidence can do, though it must still be sufficient and appropriate'],
      ['Tests of controls', m.cr === 'high' ? 'Not planned: the assessment does not rely on controls, so the work is substantive (unless substantive procedures alone cannot give enough evidence)' : 'Required: the assessment expects controls to operate effectively, so their operating effectiveness is tested (SA 330)'],
      ['Substantive procedures', (k <= 1 ? 'Substantive analytical procedures may be enough, backed by the tests of controls' : k === 2 ? 'A combination of substantive analytical procedures and tests of details' : 'Mainly tests of details (vouching and verification) on more items') + '; always some for each material class, balance and disclosure'],
      ['Extent', `${WORK[k]} substantive work: ${k >= 3 ? 'larger samples, a wider area of checking' : k === 2 ? 'normal sample sizes' : 'smaller samples'}`],
      ['Team', k >= 3 ? 'Competent and experienced members on this area, with closer supervision and review' : 'Normal staffing and review']
    ];
    if (ev && ev.comp === 'dr') rows.push(['For this event', ev.fix]);
    return rows;
  }

  /* ---------------------------------------------------------------- drawings for the model */
  const tone = lv => (lv === 'high' ? 'bad' : lv === 'moderate' ? 'warn' : 'ok');
  const rankTone = k => (k >= 3 ? 'bad' : k === 2 ? 'warn' : 'ok');
  /** the Study Material's chart (p. 3.9) as a tree; s = {ir, cr, romm, dr, flag} with what is known so far */
  function riskTree(s) {
    const leaf = (name, lv) => ({ label: `${name}\n${lv ? cap(lv) : '?'}`, color: lv ? tone(lv) : null });
    return { type: 'tree', alt: 'Audit risk splits into the risk of material misstatement (inherent and control risk) and detection risk (sampling and non-sampling risk)',
      root: { label: s.ar ? `Audit risk\n${s.ar}` : 'Audit risk', color: s.arTone || null, children: [
        { label: `Risk of material\nmisstatement: ${s.romm || '?'}`, color: s.romm ? rankTone(ROMM.indexOf(s.romm)) : null, children: [leaf('Inherent risk', s.ir), leaf('Control risk', s.cr)] },
        { label: `Detection risk\n${s.dr ? 'accept: ' + s.dr : '?'}`, color: s.dr ? (s.flag ? 'bad' : rankTone(DRG.indexOf(s.dr))) : null, children: [{ label: 'Sampling\nrisk' }, { label: 'Non-sampling\nrisk' }] }] } };
  }
  /** the 3 × 3 grid: IR rows (high first), CR columns; what = 'romm' | 'dr'; cells = {'r,c': colour} */
  function grid(what, marks) {
    const rows = ['high', 'moderate', 'low'].map(ir => [`IR ${ir}`].concat(LV.map(cr => { const m = riskModel(ir, cr); return what === 'romm' ? m.romm : m.dr; })));
    const cells = {};
    (marks || []).forEach(([ir, cr, k]) => { cells[`${2 - LV.indexOf(ir)},${1 + LV.indexOf(cr)}`] = k; });
    return { type: 'table', title: what === 'romm' ? 'Risk of material misstatement (illustrative grid)' : 'Acceptable detection risk (illustrative grid)',
      head: ['', 'CR low', 'CR moderate', 'CR high'], rows, rowLabels: true, cells, align: ['left', 'center', 'center', 'center'] };
  }
  /** the illustrative curve DR = AR ÷ RoMM with points [{x, y, label, open}] */
  function curve(ar, pts, title) {
    return { type: 'plot', alt: 'Acceptable detection risk falls as the risk of material misstatement rises, for a fixed audit risk', title: title || `Illustrative only: audit risk held at ${pc(ar)}`,
      w: 540, h: 290, x: [0, 100], y: [0, 100], clip: true, legend: 'none', xticks: [0, 25, 50, 75, 100], yticks: [0, 25, 50, 75, 100],
      xlabel: 'risk of material misstatement = IR × CR (%)', ylabel: 'acceptable detection risk (%)',
      series: [{ label: 'DR = AR ÷ RoMM', fn: `min(100, ${ar * 100}/x)`, color: 'a' }],
      points: pts.map(p => ({ x: r2(p.x), y: r2(Math.min(100, p.y)), label: p.label, open: !!p.open, pos: p.pos || (p.x >= 60 ? 'above' : p.x >= 12 ? 'left' : 'right'), color: p.color })) };
  }
  const respTable = rows => ({ type: 'table', title: 'The auditor\'s response (SA 330)', head: ['Response', 'For this assessment'], rows, align: ['left', 'left'] });

  function computeModel(v) {
    const E = withEvent(v.ir, v.cr, v.event), A = E.before, B = E.after, ev = E.ev;
    const frames = [];
    const st = { };
    frames.push({ caption: '**Audit risk** is the risk that the auditor gives an inappropriate opinion when the financial statements are materially misstated. SA 200 asks the auditor to reduce it to an acceptably low level. Watch how the parts decide the work.', view: [riskTree(st)] });
    st.ir = A.ir;
    frames.push({ caption: `**Inherent risk: ${A.ir}.** The susceptibility of an assertion to a material misstatement *before* any control is considered. It is the entity's risk, and exists whether or not there is an audit.`, view: [riskTree(st)] });
    st.cr = A.cr;
    frames.push({ caption: `**Control risk: ${A.cr}.** The risk that internal control will not prevent, or detect and correct, a material misstatement on time. The better the controls work, the lower the control risk: an inverse relation.`, view: [riskTree(st)] });
    st.romm = A.romm;
    frames.push({ caption: `Together they make the **risk of material misstatement (RoMM): ${A.romm.toLowerCase()}**. The SAs usually speak of this combined risk (SA 315 identifies and assesses it). The auditor assesses it but cannot change it.`, view: [riskTree(st), grid('romm', [[A.ir, A.cr, 'hl']])] });
    st.dr = A.dr;
    frames.push({ caption: `The auditor can only influence **detection risk**. To keep audit risk acceptably low, a ${A.romm.toLowerCase()} RoMM leaves room for **${A.dr.toLowerCase()}** detection risk: the higher the RoMM, the lower the detection risk the auditor can accept.`, view: [riskTree(st), grid('dr', [[A.ir, A.cr, 'hl']])] });
    frames.push({ caption: `Illustration only: with audit risk held at ${AR_ILL}% and IR ${A.irPct}% × CR ${A.crPct}% = RoMM ${pc(A.rommPct)}, detection risk may be at most ${AR_ILL}% ÷ ${pc(A.rommPct)} = **${pc(A.drPct)}**${A.drPct >= 100 ? ' (capped: any detection risk keeps audit risk within 5%)' : ''}. The Study Material's product: audit risk = IR × CR × DR.`,
      view: [curve(AR_ILL, [{ x: A.rommPct, y: A.drPct, label: `DR ${pc(A.drPct)}` }])] });
    let M = A, flagged = false;
    if (ev) {
      const what = `**What happened:** ${ev.label}. ${ev.why}`;
      if (ev.comp === 'dr') {
        flagged = true;
        Object.assign(st, { flag: true });
        frames.push({ caption: `${what} The entity's risks are unchanged (RoMM stays ${A.romm.toLowerCase()}), but the procedures as planned would leave detection risk above the ${A.dr.toLowerCase()} level that is acceptable, so audit risk would rise above an acceptably low level.`, view: [riskTree(Object.assign({}, st, { ar: 'too high', arTone: 'bad' }))] });
        const yHigh = Math.min(100, A.drPct * 2);
        frames.push({ caption: `On the illustration the point sits **above** the curve: detection risk higher than ${pc(A.drPct)} makes audit risk exceed ${AR_ILL}%. The auditor must bring it back down by changing his own procedures. ${ev.fix}`,
          view: [curve(AR_ILL, [{ x: A.rommPct, y: yHigh, label: 'as planned', open: true, color: 'bad', pos: 'above' }, { x: A.rommPct, y: A.drPct, label: `needed: ${pc(A.drPct)}`, pos: 'right' }])] });
      } else {
        const name = COMP[ev.comp].toLowerCase(), from = A[ev.comp], to = B[ev.comp];
        st.ir = B.ir; st.cr = B.cr; st.romm = B.romm; st.dr = B.dr;
        frames.push({ caption: `${what} ${E.moved ? `So ${name} rises from ${from} to **${to}**.` : `${cap(name)} is already high, so it stays high; the new reason is noted.`}`, view: [riskTree(st)] });
        frames.push({ caption: E.moved ? `RoMM rises from ${A.romm.toLowerCase()} to **${B.romm.toLowerCase()}**, so the acceptable detection risk falls from ${A.dr.toLowerCase()} to **${B.dr.toLowerCase()}** (the shaded cell was the assessment before).` : `The cell does not move: RoMM stays ${B.romm.toLowerCase()} and detection risk stays ${B.dr.toLowerCase()}.`,
          view: [grid('dr', E.moved ? [[A.ir, A.cr, 'd'], [B.ir, B.cr, 'hl']] : [[B.ir, B.cr, 'hl']])] });
        frames.push({ caption: E.moved ? `Illustration: RoMM ${pc(A.rommPct)} → ${pc(B.rommPct)}, so the acceptable detection risk slides down the curve from ${pc(A.drPct)} to **${pc(B.drPct)}**.` : `Illustration: the point stays at RoMM ${pc(B.rommPct)}, detection risk ${pc(B.drPct)}.`,
          view: [curve(AR_ILL, (E.moved ? [{ x: A.rommPct, y: A.drPct, label: 'before', open: true, pos: 'right' }] : []).concat([{ x: B.rommPct, y: B.drPct, label: `DR ${pc(B.drPct)}` }]))] });
        M = B;
      }
    }
    const rows = responses(M, ev);
    const chg = (a, b) => (String(a) === String(b) ? cap(String(a)) : `${cap(String(a))} → ${cap(String(b))}`);
    frames.push({ caption: `**The response (SA 330):** ${M.work.toLowerCase()} substantive work. ${M.rank >= 3 ? 'A high assessed risk calls for more persuasive evidence: tests of details on more items, by experienced staff.' : M.rank === 2 ? 'A moderate assessed risk: a mix of analytical procedures and tests of details.' : 'A low assessed risk: lighter substantive work, backed by tests of controls.'} Whatever the risk, SA 330 requires substantive procedures for each material class of transactions, account balance and disclosure.`,
      view: [respTable(rows)] });
    return {
      frames,
      stats: [{ label: 'Risk of material misstatement', value: M.romm, hint: 'inherent risk combined with control risk', tone: rankTone(M.rank) },
        { label: 'Acceptable detection risk', value: M.dr, hint: 'the higher the RoMM, the lower the detection risk the auditor can accept' },
        { label: 'Substantive work', value: M.work, hint: 'SA 330: more persuasive evidence the higher the assessed risk' },
        { label: 'Illustrative detection risk', value: pc(M.drPct), hint: `audit risk ${AR_ILL}% ÷ (IR ${M.irPct}% × CR ${M.crPct}%), illustrative only` }]
        .concat(ev ? [{ label: 'Component that moved', value: COMP[ev.comp], tone: flagged ? 'bad' : 'warn' }] : []),
      table: { head: ['Part of the chain', ev && ev.comp !== 'dr' ? 'Before → after' : 'Assessment', 'Who owns it'], rows: [
        ['Inherent risk', chg(A.ir, M.ir), 'the entity'], ['Control risk', chg(A.cr, M.cr), 'the entity'], ['Risk of material misstatement', chg(A.romm, M.romm), 'the entity (the auditor assesses it)'],
        ['Acceptable detection risk', chg(A.dr, M.dr), 'the auditor'], ['Illustrative detection risk', chg(pc(A.drPct), pc(M.drPct)), 'illustration only'], ['Substantive work', chg(A.work, M.work), 'the auditor']]
        .concat(ev ? [['Event', `${COMP[ev.comp]}: ${ev.label}`, ev.src]] : []) },
      note: `**Conventions.** Inherent and control risk are judged as low, moderate or high; the SAs prescribe no grid and no formula. The grid ranks the combined risk by adding the two levels (the classic teaching grid), and the detection risk the auditor can accept is its inverse. An event raises the component it concerns by one level. The percentages (low 25%, moderate 50%, high 100%, audit risk 5%) are illustrative only.`,
      sim: { before: A, after: M, event: ev }
    };
  }

  /* ================================================================== the product, illustrated with numbers */
  /** DR = AR ÷ (IR × CR), all in per cent; dr is capped at 100% (any detection risk is then acceptable) */
  function illustrativeDR(ar, ir, cr) {
    [[ar, 'Audit risk'], [ir, 'Inherent risk'], [cr, 'Control risk']].forEach(([x, w]) => { if (!(x > 0 && x <= 100)) throw new Error(`${w} must be a percentage above 0 and at most 100.`); });
    const romm = (ir * cr) / 100, raw = (ar * 100) / romm;
    return { ar, ir, cr, romm, raw, dr: Math.min(100, raw), capped: raw > 100 };
  }
  function computeNumeric(v) {
    const ar = +v.ar, ir = +v.irp, cr = +v.crp, cr2 = +v.crp2 || 0;
    const A = illustrativeDR(ar, ir, cr), B = cr2 > 0 ? illustrativeDR(ar, ir, cr2) : null;
    const rows = [], fx = () => ({ type: 'table', title: 'Audit risk = IR × CR × DR (Study Material p. 3.10)', head: ['Quantity', 'Formula', 'Value'], rows: rows.slice(), align: ['left', 'left', 'right'] });
    const tree = s => ({ type: 'tree', alt: 'Audit risk with its components as percentages', root: { label: `Audit risk\n${s.ar || '?'}`, children: [
      { label: `RoMM\n${s.romm || '?'}`, children: [{ label: `Inherent risk\n${s.ir || '?'}` }, { label: `Control risk\n${s.cr || '?'}` }] }, { label: `Detection risk\n${s.dr || '?'}`, color: s.dr ? 'a' : null }] } });
    const frames = [];
    frames.push({ caption: 'Illustration with numbers: the Study Material writes **audit risk = inherent risk × control risk × detection risk**. The auditor fixes the audit risk he can accept and solves for the detection risk. (Real audits judge these risks; the numbers only show the direction.)', view: [tree({})] });
    rows.push(['Audit risk to accept', 'set by the auditor', pc(ar)]);
    frames.push({ caption: `First the target: audit risk at most **${pc(ar)}**, an acceptably low level.`, view: [tree({ ar: pc(ar) }), fx()] });
    rows.push(['Risk of material misstatement', `IR × CR = ${pc(ir)} × ${pc(cr)}`, pc(A.romm)]);
    frames.push({ caption: `The entity's risks: inherent risk ${pc(ir)} and control risk ${pc(cr)}, so RoMM = ${pc(ir)} × ${pc(cr)} = **${pc(A.romm)}**. The auditor cannot change these.`, view: [tree({ ar: pc(ar), ir: pc(ir), cr: pc(cr), romm: pc(A.romm) }), fx()] });
    rows.push(['Acceptable detection risk', `AR ÷ RoMM = ${pc(ar)} ÷ ${pc(A.romm)}`, A.capped ? '100% (capped)' : pc(A.dr)]);
    frames.push({ caption: A.capped ? `DR = ${pc(ar)} ÷ ${pc(A.romm)} is more than 100%: RoMM is already below the target, so any detection risk keeps audit risk within ${pc(ar)}. SA 330 still requires substantive procedures for each material item.` : `So detection risk may be at most ${pc(ar)} ÷ ${pc(A.romm)} = **${pc(A.dr)}**. Planning a riskier (cheaper) audit than that would push audit risk above ${pc(ar)}.`,
      view: [tree({ ar: pc(ar), ir: pc(ir), cr: pc(cr), romm: pc(A.romm), dr: pc(A.dr) }), fx()] });
    frames.push({ caption: `Every RoMM has its own acceptable detection risk on this curve: the higher the RoMM, the lower the detection risk, so the more (and the more persuasive) substantive work.`, view: [curve(ar, [{ x: A.romm, y: A.dr, label: `DR ${pc(A.dr)}` }], `Illustrative only: audit risk held at ${pc(ar)}`)] });
    if (B) {
      rows.push(['After the change: RoMM', `${pc(ir)} × ${pc(cr2)}`, pc(B.romm)], ['After the change: detection risk', `${pc(ar)} ÷ ${pc(B.romm)}`, B.capped ? '100% (capped)' : pc(B.dr)]);
      const dir = cr2 > cr ? 'rises' : cr2 < cr ? 'falls' : 'stays';
      frames.push({ caption: `Now control risk ${dir} from ${pc(cr)} to ${pc(cr2)}: RoMM becomes ${pc(B.romm)} and the acceptable detection risk ${B.dr < A.dr ? 'falls' : B.dr > A.dr ? 'rises' : 'stays'} to **${pc(B.dr)}**${B.dr < A.dr ? ': the auditor must plan more substantive work' : B.dr > A.dr ? ': less substantive work is needed' : ''}.`,
        view: [curve(ar, [{ x: A.romm, y: A.dr, label: 'before', open: true }, { x: B.romm, y: B.dr, label: `after: ${pc(B.dr)}` }], `Illustrative only: audit risk held at ${pc(ar)}`), fx()] });
    }
    const L = B || A;
    return {
      frames,
      stats: [{ label: 'RoMM (IR × CR)', value: pc(A.romm), hint: 'inherent risk × control risk' },
        { label: 'Acceptable detection risk', value: A.capped ? '100%' : pc(A.dr), hint: 'audit risk ÷ RoMM' }]
        .concat(B ? [{ label: 'Detection risk after the change', value: B.capped ? '100%' : pc(B.dr), hint: 'audit risk ÷ new RoMM', tone: B.dr < A.dr ? 'bad' : 'ok' }] : [])
        .concat([{ label: 'Audit risk achieved', value: pc((ir * (B ? cr2 : cr) * L.dr) / 10000), hint: 'IR × CR × DR' }]),
      table: { head: ['Quantity', 'Formula', 'Value'], rows },
      note: '**Conventions.** Illustrative only: the Study Material states audit risk = IR × CR × DR and allows assessments in percentages or in words; real audits judge the risks rather than compute them. Detection risk is capped at 100%.',
      sim: { A, B }
    };
  }

  /* ================================================================== materiality (SA 320) and misstatements (SA 450) */
  const BENCH = {
    pbt: { label: 'Profit before tax from continuing operations', opt: 'Profit before tax', short: 'profit before tax', sm: 5,
      why: 'Profit before tax from continuing operations is often used for profit-oriented entities, whose users focus on profit.' },
    revenue: { label: 'Total revenue', short: 'total revenue', sm: 1,
      why: 'Total revenue is used where profit is volatile, or where users focus on revenue; the Study Material\'s example applies 1% to total revenue or expenses of a not-for-profit entity.' },
    gp: { label: 'Gross profit', short: 'gross profit', sm: null,
      why: 'Gross profit is an alternative when profit before tax is volatile.' },
    expenses: { label: 'Total expenses', short: 'total expenses', sm: 1,
      why: 'Total expenses suit a not-for-profit entity; the Study Material\'s example applies 1%.' },
    equity: { label: 'Total equity or net asset value', opt: 'Total equity (net assets)', short: 'net assets', sm: null,
      why: 'Total equity or net asset value is used where users focus on net assets.' },
    assets: { label: 'Total assets', short: 'total assets', sm: null,
      why: 'Users of an entity financed by debt may put more emphasis on assets, and claims on them, than on earnings.' }
  };
  /** the Note column: blank (judged by size), "fixed" (management corrected it) or "nature" (material by its nature, at any size) */
  const flag = x => { const t = String(x == null ? '' : x).trim(); if (!t || /^[-–—]$|^(no|none|n)$/i.test(t)) return ''; if (/fix|corr/i.test(t)) return 'fixed'; if (/nat/i.test(t)) return 'nature';
    throw new Error(`Note "${t}": leave it blank, or type fixed (corrected by management) or nature (material by its nature).`); };
  const amt = x => { const n = Number(String(x == null ? '' : x).replace(/[₹,\s]/g, '')); return isFinite(n) ? n : NaN; };

  /** materiality, performance materiality, clearly trivial and the SA 450 verdicts */
  function materiality(v) {
    const B = BENCH[v.bench];
    if (!B) throw new Error('Choose a benchmark.');
    const base = +v.base, pct = +v.pct, pmPct = +v.pmPct, ctPct = +v.ctPct || 0;
    if (!(base > 0)) throw new Error('The benchmark amount must be more than zero (for a loss-making year, use another benchmark, such as revenue or normalised profit).');
    if (!(pct > 0 && pct <= 20)) throw new Error('The percentage applied to the benchmark must be above 0% and at most 20%.');
    if (!(pmPct > 0 && pmPct < 100)) throw new Error('Performance materiality is set below materiality: give a percentage of materiality above 0 and below 100.');
    if (ctPct < 0 || ctPct >= pmPct) throw new Error('The clearly trivial amount must be below performance materiality (0 = do not use one).');
    const M = Math.round((base * pct) / 100), PM = Math.round((M * pmPct) / 100), CT = Math.round((M * ctPct) / 100);
    const items = (v.mis || []).map((r, i) => ({ i, name: String(r[0] || '').trim() || `Misstatement ${i + 1}`, a: amt(r[1]), fixed: flag(r[2]) === 'fixed', nature: flag(r[2]) === 'nature' }))
      .filter(x => x.name || x.a);
    items.forEach(x => { if (!(x.a >= 0)) throw new Error(`${x.name}: type the amount as a number of rupees (for example 10,00,000).`); });
    items.forEach(x => {
      x.trivial = !x.nature && CT > 0 && x.a <= CT;
      x.status = x.fixed ? 'corrected' : x.trivial ? 'clearly trivial' : 'uncorrected';
      x.zone = x.a >= M ? 'over' : x.a >= PM ? 'buffer' : 'under';
      x.material = !x.fixed && (x.nature || x.a >= M);
    });
    const open = items.filter(x => !x.fixed && !x.trivial), U = open.reduce((s, x) => s + x.a, 0);
    const aggZone = U >= M ? 'over' : U >= PM ? 'buffer' : 'under';
    const byNature = open.some(x => x.nature), single = open.some(x => x.a >= M);
    const material = byNature || U >= M;
    return { bench: v.bench, B, base, pct, pmPct, ctPct, M, PM, CT, items, open, U, aggZone, byNature, single, material };
  }
  function computeMat(v) {
    const R = materiality(v), B = R.B, frames = [];
    const facts = [['Benchmark', B.label], ['Amount', inr(R.base)]];
    const ft = (extra, cells) => ({ type: 'table', title: 'Materiality for the financial statements as a whole (SA 320)', head: [], rows: facts.concat(extra || []), rowLabels: true, cells: cells || {}, align: ['left', 'right'] });
    const ax = niceAxis(Math.max(R.M, R.U, ...R.items.map(x => x.a), 1));
    const k = R.items.length;
    const zoneC = z => (z === 'over' ? 'bad' : z === 'buffer' ? 'warn' : 'ok');
    const chart = (shown, agg) => {
      const lines = [{ label: `materiality ${inr(R.M)}`, fn: String(R.M), color: 'bad', dash: true }, { label: `performance materiality ${inr(R.PM)}`, fn: String(R.PM), color: 'warn', dash: true }]
        .concat(R.CT ? [{ label: `clearly trivial ${inr(R.CT)}`, fn: String(R.CT), color: 'mute', dash: true }] : []);
      const bars = { under: [], buffer: [], over: [], fixed: [] };
      R.items.slice(0, shown).forEach((x, j) => (x.fixed || x.trivial ? bars.fixed : x.nature ? bars.over : bars[x.zone]).push([j + 1, x.a, brief(x.a)]));
      if (agg) bars[R.byNature ? 'over' : R.aggZone].push([k + 1, R.U, brief(R.U)]);
      const ser = [['under', 'ok', 'below performance materiality'], ['buffer', 'warn', 'between the two'], ['over', 'bad', 'material'], ['fixed', 'mute', 'corrected or clearly trivial']]
        .filter(([z]) => bars[z].length).map(([z, c, lab]) => ({ label: lab, bars: true, values: true, color: c, pts: bars[z], bw: 0.55 }));
      return { type: 'plot', alt: 'Each misstatement as a bar against the materiality and performance materiality lines', title: agg ? 'Uncorrected misstatements, one by one and in total' : 'Misstatements found, against the lines', w: 560, h: 300,
        x: [0.4, k + 1.6], y: [0, ax.top], yticks: ax.ticks, legend: 'outside', ylabel: 'amount',
        xticks: R.items.map((x, j) => [j + 1, String(j + 1)]).concat(agg ? [[k + 1, 'total']] : []), series: lines.concat(ser) };
    };
    frames.push({ caption: `**Benchmark: ${B.short}, ${inr(R.base)}.** ${B.why} Materiality is a matter of professional judgment: a percentage applied to a chosen benchmark is only the starting point.`, view: [ft()] });
    const pctNote = R.pct > 2 && /revenue|expenses|assets/.test(R.bench) ? ' (ICAI notes that a percentage applied to profit before tax is normally higher than one applied to total revenue: this one is high for the benchmark)' : '';
    facts.push(['Percentage', pc(R.pct)], ['Materiality', inr(R.M)]);
    frames.push({ caption: `**Materiality = ${pc(R.pct)} × ${inr(R.base)} = ${inr(R.M)}.** Misstatements, individually or in aggregate, of about this size could reasonably be expected to influence users' economic decisions${pctNote}.`, view: [ft([], { '3,0': 'hl', '3,1': 'hl' })] });
    facts.push(['Performance materiality', `${inr(R.PM)} (${pc(R.pmPct)} of materiality)`]);
    frames.push({ caption: `**Performance materiality ${inr(R.PM)}**, set *below* materiality, so that the aggregate of uncorrected and undetected misstatements is unlikely to exceed ${inr(R.M)}. SA 320 gives no percentage: ${pc(R.pmPct)} here is the auditor's judgment.`, view: [ft([], { '4,0': 'hl', '4,1': 'hl' }), chart(0, false)] });
    if (R.CT) {
      facts.push(['Clearly trivial', inr(R.CT)]);
      frames.push({ caption: `**Clearly trivial: ${inr(R.CT)}.** SA 450 asks the auditor to accumulate every misstatement found except clearly trivial ones, and to document this amount.`, view: [chart(0, false)] });
    }
    R.items.forEach((x, j) => {
      let why;
      if (x.fixed) why = 'management has corrected it, so it drops out of the uncorrected total (the auditor still checks that no misstatement remains).';
      else if (x.trivial) why = `at most ${inr(R.CT)}, it is clearly trivial: not accumulated.`;
      else if (x.nature) why = '**material by its nature**, whatever its size (for example a disclosure the law requires, or a fraud).';
      else if (x.zone === 'over') why = `at least materiality (${inr(R.M)}): **material on its own**.`;
      else if (x.zone === 'buffer') why = `below materiality but above performance materiality: not material alone, but it eats the buffer.`;
      else why = `below performance materiality: not material alone, but it is accumulated.`;
      frames.push({ caption: `**${j + 1}. ${x.name}: ${inr(x.a)}**: ${why}`, view: [chart(j + 1, false)] });
    });
    const left = R.M - R.U;
    let verdict;
    if (!R.open.length) verdict = 'No uncorrected misstatements remain: nothing to evaluate against materiality.';
    else if (R.byNature) verdict = `Uncorrected total ${inr(R.U)}${R.U >= R.M ? `, at least materiality ${inr(R.M)}: **material in aggregate**, and one item is also material by its nature` : `. One item is **material by its nature**, so the uncorrected misstatements are **material** whatever the total`}. The auditor asks management to correct them and, failing that, considers the effect on the opinion (SA 450, then SA 705).`;
    else if (R.U >= R.M) verdict = `Uncorrected total ${inr(R.U)}, at least materiality ${inr(R.M)}: **material in aggregate**${R.single ? '' : ', though each one alone is below materiality'}. The auditor communicates them, asks management to correct them, and considers their effect on the opinion (SA 450, then SA 705).`;
    else if (R.U >= R.PM) verdict = `Uncorrected total ${inr(R.U)}: **not material**, but above performance materiality, so the aggregate approaches materiality (${inr(left)} of headroom). SA 450 asks whether the overall audit strategy and audit plan need revising.`;
    else verdict = `Uncorrected total ${inr(R.U)}: below performance materiality, so **not material** in aggregate (${inr(left)} of headroom). The auditor still asks management to correct them and gets a written representation that they are immaterial.`;
    if (R.open.length) frames.push({ caption: `**Total of the uncorrected misstatements.** ${verdict}`, view: [chart(k, true)] });
    else frames[frames.length - 1].caption += ' ' + verdict;
    return {
      frames,
      stats: [{ label: 'Materiality', value: inr(R.M), hint: `${pc(R.pct)} × ${B.short}` },
        { label: 'Performance materiality', value: inr(R.PM), hint: `${pc(R.pmPct)} of materiality, set below it` },
        { label: 'Uncorrected total', value: inr(R.U), hint: 'misstatements not corrected, other than clearly trivial ones' },
        { label: 'In aggregate', value: R.open.length ? (R.material ? 'Material' : 'Not material') : 'Nothing left', tone: R.material ? 'bad' : 'ok', hint: 'SA 450: individually or in aggregate, by size and by nature' }],
      table: { head: ['#', 'Misstatement', 'Amount (₹)', 'Status', 'Alone'], rows: R.items.map((x, j) => [String(j + 1), x.name, inr(x.a), cap(x.status), x.fixed || x.trivial ? '—' : x.material ? 'Material' : 'Not material']) },
      note: '**Conventions.** A misstatement equal to or more than materiality is treated as material; one noted "nature" is material at any size. Corrected and clearly trivial items are left out of the uncorrected total. The percentages for performance materiality and the clearly trivial amount are the auditor\'s judgment (SA 320 and SA 450 give none).',
      sim: R
    };
  }

  /* ================================================================== the lab */
  let lastMode = 'model';                    // the mode of the last good compute: challenge.gen follows it (framework: problem())
  function compute(v) {
    const res = v.mode === 'numeric' ? computeNumeric(v) : v.mode === 'mat' ? computeMat(v) : computeModel(v);
    lastMode = v.mode === 'numeric' || v.mode === 'mat' ? v.mode : 'model';
    return res;
  }
  const LVOPT = [['low', 'Low'], ['moderate', 'Moderate'], ['high', 'High']];
  const isM = v => v.mode === 'model', isN = v => v.mode === 'numeric', isMat = v => v.mode === 'mat';
  const CHEAP_COST = [['Repairs of machinery capitalised', 1000000, ''], ['Work in progress overstated', 2000000, '']];
  const presets = [
    { label: 'Tapri\'s kulhad cafés: inherent risk moderate, control risk low', values: { mode: 'model', ir: 'moderate', cr: 'low', event: 'none' } },
    { label: 'Modelled on MTP Sep 2024 Series I, Q1(b): the gross profit ratio jumps from 14% to 24%, revenue risk assessed high', values: { mode: 'model', ir: 'high', cr: 'moderate', event: 'none' } },
    { label: 'Modelled on MTP May 2024 Series I, MCQ 1: an NGO with foreign funding and an untrained finance head', values: { mode: 'model', ir: 'high', cr: 'high', event: 'none' } },
    { label: 'Study Material TYU 1 (MTP May 2025 Series II, Q1(a)): a start-up where many rivals have gone bust', values: { mode: 'model', ir: 'moderate', cr: 'moderate', event: 'stubble' } },
    { label: 'MTP Jan 2026 Series II, Q11: supervisors get into the inventory system without authority', values: { mode: 'model', ir: 'moderate', cr: 'low', event: 'access' } },
    { label: 'Study Material TYU 3: the planned revenue procedures may miss misstatements', values: { mode: 'model', ir: 'moderate', cr: 'moderate', event: 'sample' } },
    { label: 'Numbers (illustrative): audit risk 5%, inherent risk 100%, control risk 50%', values: { mode: 'numeric', ar: 5, irp: 100, crp: 50, crp2: 0 } },
    { label: 'Tapri\'s cold chain: control risk rises from 50% to 80% (illustrative)', values: { mode: 'numeric', ar: 5, irp: 80, crp: 50, crp2: 80 } },
    { label: 'Modelled on MTP Sep 2024 Series II, Q6: Cheap Cost Pvt Ltd, profit before tax ₹5 crore at 5%', values: { mode: 'mat', bench: 'pbt', base: 50000000, pct: 5, pmPct: 75, ctPct: 0, mis: CHEAP_COST } },
    { label: 'Modelled on RTP Jan 2026, Q3: 5% of a profit before tax of ₹15 lakh, with performance materiality', values: { mode: 'mat', bench: 'pbt', base: 1500000, pct: 5, pmPct: 75, ctPct: 5, mis: [['Unrecorded freight bill', 30000, ''], ['Stock sheet totalling error', 20000, ''], ['Rounding in a ledger', 2500, '']] } },
    { label: 'Tapri Foundation (not-for-profit): 1% of total expenses of ₹2.4 crore', values: { mode: 'mat', bench: 'expenses', base: 24000000, pct: 1, pmPct: 70, ctPct: 5, mis: [['Grant expense booked twice', 90000, ''], ['Related-party donation not disclosed', 40000, 'nature'], ['Petty-cash shortage', 6000, 'fixed']] } }
  ];

  /* ---------------------------------------------------------------- challenge */
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const EV_IDS = Object.keys(EVENTS);
  function genMat(r) {
    const bench = pick(r, ['pbt', 'pbt', 'revenue', 'expenses']);
    const pct = bench === 'pbt' ? 5 : 1;
    const base = bench === 'pbt' ? (2 + Math.floor(r() * 39)) * 2500000 : (5 + Math.floor(r() * 46)) * 10000000;
    const M = (base * pct) / 100, n = 2 + Math.floor(r() * 3);
    const total = M * (r() < 0.5 ? 0.55 + r() * 0.3 : 1.12 + r() * 0.5);          // never within 10% of materiality: a clear verdict
    const w = Array.from({ length: n }, () => 0.5 + r()), s = w.reduce((a, b) => a + b, 0);
    const names = ['Repairs capitalised', 'Closing stock overvalued', 'Sales cut-off error', 'Expense not provided for', 'Depreciation undercharged'];
    const mis = w.map((x, i) => [names[i], Math.max(1000, Math.round((total * x) / s / 1000) * 1000), '']);
    return { mode: 'mat', bench, base, pct, pmPct: 75, ctPct: 0, mis, ask: r() < 0.5 ? 'm' : 'agg' };
  }
  const challenge = {
    title: 'Which risk moves, and is it material?',
    gen(r) {
      const mode = lastMode;
      if (mode === 'model') {
        const ev = r() < 0.45 ? 'none' : pick(r, EV_IDS);
        return { mode, ir: pick(r, LV), cr: pick(r, LV), event: ev };
      }
      if (mode === 'numeric') {
        const irp = pick(r, [100, 80, 60, 50]), crp = pick(r, [100, 80, 50, 40, 25]), ar = pick(r, [5, 4, 2, 10]);
        return { mode, ar, irp, crp, crp2: 0 };
      }
      return genMat(r);
    },
    kind: v => (v.mode === 'model' ? 'choice' : v.mode === 'mat' && v.ask !== 'm' ? 'yesno' : 'num'),
    choices: v => (v.mode === 'model' && v.event && v.event !== 'none' ? [['Inherent risk', 'Inherent risk'], ['Control risk', 'Control risk'], ['Detection risk', 'Detection risk']] : DRG.slice().reverse().map(x => [x, x])),
    tol: 0.01,
    prompt(v) {
      if (v.mode === 'model' && v.event && v.event !== 'none') return `Iyer & Associates audit Tapri. **${EVENTS[v.event].label}.** Which component of audit risk does this concern: inherent risk, control risk or detection risk?`;
      if (v.mode === 'model') return `Ms. Iyer assesses inherent risk as **${v.ir}** and control risk as **${v.cr}**. On the grid, what level of detection risk can she accept: lowest, lower, medium, higher or highest?`;
      if (v.mode === 'numeric') return `Illustration: audit risk is to be held at ${v.ar}%, inherent risk is ${v.irp}% and control risk ${v.crp}%. What is the highest detection risk (in %, two decimals) the auditor can accept?`;
      const B = BENCH[v.bench];
      if (v.ask === 'm') return `Materiality is set at ${v.pct}% of ${B.short} of ${inr(v.base)}. What is materiality for the financial statements as a whole, in rupees?`;
      return `Materiality is ${v.pct}% of ${B.short} of ${inr(v.base)}. None of the misstatements in the table has been corrected and none is material by its nature. Are the uncorrected misstatements material in aggregate?`;
    },
    solve(res, v) {
      if (v.mode === 'model') return v.event && v.event !== 'none' ? COMP[res.sim.event.comp] : res.sim.before.dr;
      if (v.mode === 'numeric') return r2(res.sim.A.dr);
      return v.ask === 'm' ? res.sim.M : res.sim.material ? 'yes' : 'no';
    },
    unit: '',
    view(res, v) {
      if (v.mode === 'model') return v.event && v.event !== 'none' ? null : [riskTree({ ir: v.ir, cr: v.cr })];
      if (v.mode === 'numeric') return [riskTree({})];
      return [{ type: 'table', title: 'The misstatements found', head: ['#', 'Misstatement', 'Amount (₹)'], rows: res.sim.items.map((x, j) => [String(j + 1), x.name, inr(x.a)]), align: ['left', 'left', 'right'] }];
    },
    explain(res, v) {
      if (v.mode === 'model' && v.event && v.event !== 'none') { const e = res.sim.event; return `${e.why.replace(/\*\*/g, '')} (${e.src}.)`; }
      if (v.mode === 'model') { const m = res.sim.before; return `Inherent ${m.ir} + control ${m.cr} gives a ${m.romm.toLowerCase()} risk of material misstatement; detection risk is its inverse: **${m.dr.toLowerCase()}**. The higher the RoMM, the lower the detection risk.`; }
      if (v.mode === 'numeric') { const A = res.sim.A; return `RoMM = ${v.irp}% × ${v.crp}% = ${pc(A.romm)}; DR = ${v.ar}% ÷ ${pc(A.romm)} = **${pc(A.dr)}**${A.capped ? ' (capped at 100%)' : ''}.`; }
      const R = res.sim;
      return v.ask === 'm' ? `${v.pct}% × ${inr(v.base)} = **${inr(R.M)}**.` : `Materiality = ${inr(R.M)}. Uncorrected total = ${R.open.map(x => inr(x.a)).join(' + ')} = ${inr(R.U)}, which is ${R.material ? 'at least materiality: **material in aggregate**' : 'below materiality: **not material**'}.`;
    }
  };

  const def = {
    id: 'audit-risk', title: 'Audit Risk and Materiality Lab',
    blurb: 'Watch inherent and control risk set the detection risk and the work, then test misstatements against materiality.',
    controls: [
      { id: 'mode', type: 'select', label: 'What to explore', value: 'model', options: [['model', 'Audit risk model'], ['numeric', 'Audit risk with numbers (illustrative)'], ['mat', 'Materiality and misstatements']] },
      { id: 'ir', type: 'seg', label: 'Inherent risk', value: 'moderate', options: LVOPT, show: isM, help: 'Susceptibility of an assertion to a material misstatement before considering any controls.' },
      { id: 'cr', type: 'seg', label: 'Control risk', value: 'low', options: LVOPT, show: isM, help: 'The risk that internal control will not prevent, or detect and correct, a material misstatement on time.' },
      { id: 'event', type: 'select', label: 'Then this happens', short: 'Event', value: 'none', show: isM, options: [['none', 'Nothing (just the assessment)']].concat(EV_IDS.map(k => [k, EVENTS[k].label])) },
      { id: 'ar', type: 'number', label: 'Audit risk to accept (%)', value: 5, min: 0.1, max: 50, step: 0.5, show: isN },
      { id: 'irp', type: 'number', label: 'Inherent risk (%)', value: 100, min: 1, max: 100, show: isN },
      { id: 'crp', type: 'number', label: 'Control risk (%)', value: 50, min: 1, max: 100, show: isN },
      { id: 'crp2', type: 'number', label: 'Control risk after a change (%, 0 = no change)', short: 'Control risk after', value: 0, min: 0, max: 100, show: isN },
      { id: 'bench', type: 'select', label: 'Benchmark', value: 'pbt', show: isMat, options: Object.keys(BENCH).map(k => [k, BENCH[k].opt || BENCH[k].label]),
        help: 'SA 320 examples: profit before tax for profit-oriented entities; total revenue, gross profit or total expenses; total equity or net assets.' },
      { id: 'base', type: 'number', label: 'Benchmark amount (₹)', value: 50000000, min: 0, max: 1e12, show: isMat },
      { id: 'pct', type: 'number', label: 'Percentage applied (%)', value: 5, min: 0.1, max: 20, step: 0.5, show: isMat, help: 'The Study Material\'s examples: 5% of profit before tax for a manufacturer; 1% of total revenue or total expenses for a not-for-profit entity.' },
      { id: 'pmPct', type: 'number', label: 'Performance materiality (% of materiality)', short: 'Performance materiality %', value: 75, min: 1, max: 99, show: isMat, help: 'Set below materiality; SA 320 gives no percentage.' },
      { id: 'ctPct', type: 'number', label: 'Clearly trivial (% of materiality, 0 = none)', short: 'Clearly trivial %', value: 0, min: 0, max: 50, show: isMat },
      { id: 'mis', type: 'table', label: 'Misstatements found', max: 8, show: isMat, rows: CHEAP_COST.map(r => r.slice()),
        help: 'Note: leave it blank to judge an item by its size, or type fixed (management has corrected it) or nature (material by its nature, at any size: a disclosure the law requires, a fraud).',
        cols: [{ id: 'item', label: 'Item', type: 'text', auto: n => `Misstatement ${n + 1}` }, { id: 'amt', label: 'Rupees', type: 'number', min: 0, def: 100000 },
          { id: 'note', label: 'Note', type: 'text', def: '' }] }
    ],
    presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { riskModel, withEvent, responses, illustrativeDR, materiality, compute, def, EVENTS, BENCH, ROMM, DRG, WORK, LV };
  g.__lab_def_audit_risk = def;
})(typeof window !== 'undefined' ? window : globalThis);
