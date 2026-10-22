/* PassBook — Audit Journey Lab (Paper 5: aud.plan, aud.complete, aud.report; docs/LAB_GUIDE.md).
   The whole engagement as a timeline: acceptance and terms (SQC 1, SA 220, SA 210) → planning (SA 300) → risk assessment and materiality
   (SA 315, SA 320) → responses (SA 330) → evidence (SA 500-series, SA 530, SA 610) → completion (SA 450, SA 560, SA 570, SA 580,
   SA 260 / 265) → the report (SA 700, 701, 705, 706, 710), with documentation (SA 230) running throughout and SA 200 framing it all.
   Pure part (Node-testable through module.exports):
     journey(values)   the steps that apply to this engagement (a listed company has key audit matters, a first-year audit checks opening
                       balances, …), cut at the phase asked for
     opinionOf(values) the opinion the report carries (SA 570: an inadequately disclosed material uncertainty cannot leave it unmodified)
     SCENES            the "which Standard governs this step?" bank, each with its answer and three plausible wrong ones
   Sources: ICAI Study Material, Paper 5: Ch 1 (SA 200), Ch 2 (SA 300), Ch 3 (SA 315, 320, 330), Ch 4 (SA 500, 501, 505, 510, 520, 530, 550,
   610), Ch 6 (SA 230), Ch 7 (SA 450, 560, 570, 580, 260, 265), Ch 8 (SA 700, 701, 705, 706, 710), Ch 11 (SA 210, SQC 1, SA 220). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  const PHASES = [['accept', 'Acceptance and terms'], ['plan', 'Planning'], ['risk', 'Risk assessment and materiality'], ['respond', 'Responses'],
    ['evidence', 'Evidence'], ['complete', 'Completion'], ['report', 'The report'], ['file', 'The final audit file']];
  const PH = Object.fromEntries(PHASES);
  const LANE = { accept: 'Acceptance', plan: 'Plan and risk', risk: 'Plan and risk', respond: 'Response, evidence', evidence: 'Response, evidence', complete: 'Completion', report: 'Report', file: 'Throughout' };
  const LANES = ['Acceptance', 'Plan and risk', 'Response, evidence', 'Completion', 'Report', 'Throughout'];
  const COLORS = { Acceptance: 'a', 'Plan and risk': 'b', 'Response, evidence': 'c', Completion: 'd', Report: 'e', Throughout: 'g' };
  const OPIN = { unmodified: 'Unmodified', qualified: 'Qualified', adverse: 'Adverse', disclaimer: 'Disclaimer of opinion' };

  /** the opinion the report carries, and why if the lab had to change the one chosen */
  function opinionOf(v) {
    let op = OPIN[v.opinion] ? v.opinion : 'unmodified', why = '';
    if (v.gc === 'mu-bad' && op === 'unmodified') { op = 'qualified'; why = 'SA 570: a material uncertainty that is not adequately disclosed calls for a qualified or adverse opinion (SA 705); the lab takes qualified.'; }
    return { op, label: OPIN[op], why, modified: op !== 'unmodified' };
  }

  /* every step: phase, the Standard, a short block label, what the auditor does, the rule examiners test, and when it applies */
  const STEPS = [
    { id: 'accept', phase: 'accept', sa: 'SQC 1 · SA 220', num: '220', title: 'Accept or continue the client',
      does: v => `The firm's policies (SQC 1) ask three things before accepting: the client's integrity, the firm's competence (capabilities, time and resources) and compliance with ethical requirements, independence included. Ms. Iyer, the engagement partner, satisfies herself that they were followed (SA 220).${v.initial ? ' A first audit: Iyer & Associates also write to the previous auditor before accepting.' : ''}`,
      rule: 'SA 220 rests on SQC 1: the firm sets the quality system, the engagement partner owns the quality of this audit.' },
    { id: 'terms', phase: 'accept', sa: 'SA 210', num: '210', title: 'Preconditions and the engagement letter',
      does: () => 'Check the preconditions: an acceptable financial reporting framework, and management\'s agreement that it is responsible for the financial statements, for internal control and for giving the auditor access. Then record the agreed terms in an engagement letter.',
      rule: 'Without the preconditions the auditor does not accept the audit, unless law or regulation requires it.' },
    { id: 'plan', phase: 'plan', sa: 'SA 300', num: '300', title: 'Overall audit strategy and audit plan',
      does: () => 'Set the overall audit strategy (the scope, timing and direction of the audit, and where the experienced people go) and develop the audit plan (the nature, timing and extent of the risk assessment procedures and the further audit procedures).',
      rule: 'Planning is continuous and iterative: the strategy, the plan and any significant change to them, with the reasons, are documented.' },
    { id: 'risk', phase: 'risk', sa: 'SA 315', num: '315', title: 'Understand the entity and assess the risks',
      does: () => 'Understand Tapri and its environment, including internal control, through risk assessment procedures (inquiries of management and others, analytical procedures, observation and inspection), and identify and assess the risks of material misstatement at the financial statement and assertion levels.',
      rule: 'Risk assessment procedures alone do not give sufficient appropriate evidence for the opinion.' },
    { id: 'mat', phase: 'risk', sa: 'SA 320', num: '320', title: 'Materiality and performance materiality',
      does: () => 'Set materiality for the financial statements as a whole (a percentage of a benchmark such as profit before tax) and performance materiality below it.',
      rule: 'Materiality is revised if the actual results turn out substantially different from those it was based on.' },
    { id: 'respond', phase: 'respond', sa: 'SA 330', num: '330', title: 'Responses to the assessed risks',
      does: () => 'Design overall responses at the financial statement level and further audit procedures at the assertion level: tests of controls where the assessment relies on them, and substantive procedures, more persuasive the higher the risk.',
      rule: 'Whatever the assessed risk, there are substantive procedures for each material class of transactions, account balance and disclosure.' },
    { id: 'evid', phase: 'evidence', sa: 'SA 500', num: '500', title: 'Sufficient appropriate audit evidence',
      does: () => 'Gather evidence on the assertions by inspection, observation, external confirmation, recalculation, reperformance, analytical procedures and inquiry, and judge whether it is enough (sufficiency) and good enough (appropriateness: relevance and reliability).',
      rule: 'Inquiry alone is not sufficient evidence of the absence of a material misstatement or of the operating effectiveness of controls.' },
    { id: 'ap', phase: 'evidence', sa: 'SA 520', num: '520', title: 'Analytical procedures',
      does: () => 'Use substantive analytical procedures where the relationships are predictable (rent from the number of cafés and the rates), and analytical procedures near the end of the audit to form an overall conclusion.',
      rule: 'Analytical procedures used to assess risks at the start belong to SA 315; SA 520 covers substantive ones and those near the end.' },
    { id: 'sample', phase: 'evidence', sa: 'SA 530', num: '530', title: 'Audit sampling',
      does: () => 'Apply procedures to less than 100% of a population so that every sampling unit has a chance of selection; then project the misstatements found and evaluate the sample.',
      rule: 'The sample must be large enough to reduce sampling risk to an acceptably low level.' },
    { id: 'ia', phase: 'evidence', sa: 'SA 610', num: '610', title: 'Using the work of internal auditors', when: v => !!v.ia,
      does: () => 'Before using Tapri\'s internal audit work, evaluate the function\'s objectivity, its competence and whether it applies a systematic and disciplined approach.',
      rule: 'The external auditor alone is responsible for the opinion; using internal audit does not reduce that responsibility.' },
    { id: 'inv', phase: 'evidence', sa: 'SA 501', num: '501', title: 'Inventory, litigation and segments',
      does: () => 'Attend the physical inventory count at Tapri\'s warehouses at the year end, ask about litigation and claims (writing to the external lawyers if a risk is assessed) and check the segment information.',
      rule: 'Where inventory is material, the auditor attends the count unless that is impracticable.' },
    { id: 'conf', phase: 'evidence', sa: 'SA 505', num: '505', title: 'External confirmations',
      does: () => 'Send confirmation requests (trade receivables, banks), keep control over them and evaluate the replies and the exceptions.',
      rule: 'If management refuses to let a request be sent, the auditor asks why, evaluates the reasons and performs alternative procedures.' },
    { id: 'open', phase: 'evidence', sa: 'SA 510', num: '510', title: 'Opening balances (a first audit)', when: v => !!v.initial,
      does: () => 'In this first audit, obtain evidence that the opening balances carry no misstatement that materially affects this year, and that the accounting policies were applied consistently.',
      rule: 'If last year was audited by a predecessor, reading those audited financial statements and schedules may give the evidence; the closing balances are ordinarily relied on unless a misstatement is indicated.' },
    { id: 'rp', phase: 'evidence', sa: 'SA 550', num: '550', title: 'Related parties',
      does: () => 'Identify Tapri\'s related parties and its transactions with them, and check that they are properly accounted for and disclosed.',
      rule: 'SA 320 names related-party transactions as an area where amounts below overall materiality can influence users.' },
    { id: 'mis', phase: 'complete', sa: 'SA 450', num: '450', title: 'Evaluate the misstatements',
      does: () => 'Accumulate the misstatements found (except clearly trivial ones), communicate them to management and ask for correction; then evaluate the uncorrected ones, individually and in aggregate, against materiality.',
      rule: 'If the aggregate approaches materiality, the strategy and the plan are reconsidered.' },
    { id: 'sub', phase: 'complete', sa: 'SA 560', num: '560', title: 'Subsequent events',
      does: () => 'Cover the period from the date of the financial statements to the date of the report: inquiries of management, the minutes of later meetings, the latest interim figures. Then respond to facts that become known after the report date.',
      rule: 'A new report on amended financial statements cannot be dated earlier than the date they are approved.' },
    { id: 'gc', phase: 'complete', sa: 'SA 570', num: '570', title: 'Going concern',
      does: v => `Evaluate management's assessment of Tapri's ability to continue as a going concern and conclude whether a material uncertainty exists.${v.gc === 'mu-ok' ? ' Here one exists and is adequately disclosed: the opinion stays unmodified, with a separate section headed "Material Uncertainty Related to Going Concern".' : v.gc === 'mu-bad' ? ' Here one exists but is **not adequately disclosed**: a qualified or adverse opinion (SA 705).' : ' Here none is found.'}`,
      rule: 'If the going concern basis is inappropriate, the opinion is adverse.' },
    { id: 'wr', phase: 'complete', sa: 'SA 580', num: '580', title: 'Written representations',
      does: () => 'Request written representations from management: that it has fulfilled its responsibility for the financial statements and given the auditor all information and access.',
      rule: 'They are dated as near as practicable to, but not after, the date of the report; they support other evidence and are not enough on their own.' },
    { id: 'tcwg', phase: 'complete', sa: 'SA 260 · SA 265', num: '260', title: 'Communicate with those charged with governance',
      does: () => 'Tell Tapri\'s audit committee the auditor\'s responsibilities, the planned scope and timing and the significant findings (SA 260); report significant deficiencies in internal control in writing (SA 265).',
      rule: 'Significant deficiencies go to those charged with governance in writing, on a timely basis.' },
    { id: 'op', phase: 'report', sa: 'SA 700', num: '700', title: 'Form the opinion and report',
      does: v => { const O = opinionOf(v); return `Evaluate whether the financial statements are prepared, in all material respects, in accordance with the framework. ${O.modified ? `The evidence does not support a clean report: the opinion will be **${O.label.toLowerCase()}**.` : 'They are: an **unmodified** opinion.'}`; },
      rule: 'The Basis for Opinion section comes directly after the Opinion section.' },
    { id: 'mod', phase: 'report', sa: 'SA 705', num: '705', title: 'Modify the opinion', when: v => opinionOf(v).modified,
      does: v => { const O = opinionOf(v); return `Express a **${O.label.toLowerCase()}** opinion, with a "Basis for ${O.op === 'disclaimer' ? 'Disclaimer of' : O.label} Opinion" section explaining the matter. ${O.why}`; },
      rule: 'Material and pervasive misstatement: adverse; material but not pervasive: qualified; no sufficient evidence and possibly pervasive: disclaimer.' },
    { id: 'kam', phase: 'report', sa: 'SA 701', num: '701', title: 'Key audit matters', when: v => !!v.listed,
      does: () => 'Tapri is listed, so the report communicates the key audit matters: those of most significance in the audit, chosen from the matters communicated with those charged with governance.',
      rule: 'Key audit matters are not a substitute for a modified opinion or for the disclosures management must make.' },
    { id: 'eom', phase: 'report', sa: 'SA 706', num: '706', title: 'Emphasis of matter', when: v => !!v.eom,
      does: () => 'Add an Emphasis of Matter paragraph drawing users\' attention to a matter properly presented in the financial statements that is fundamental to their understanding (here, an uncertain lawsuit).',
      rule: 'An Emphasis of Matter paragraph does not modify the opinion.' },
    { id: 'comp', phase: 'report', sa: 'SA 710', num: '710', title: 'Comparative information',
      does: () => 'Check that last year\'s figures shown beside this year\'s agree with last year\'s financial statements and follow the same policies.',
      rule: 'With corresponding figures the opinion refers to the current period only; with comparative financial statements it refers to each period presented.' },
    { id: 'file', phase: 'file', sa: 'SA 230', num: '230', title: 'Assemble the final audit file',
      does: () => 'Assemble the final audit file within 60 days of the report date, an administrative step with no new audit procedures, and keep it for at least seven years from the report date.',
      rule: 'After assembly nothing is deleted or discarded before the retention period ends; the working papers belong to the auditor.' }
  ];

  /** the steps that apply, cut after the phase asked for */
  function journey(v) {
    const upto = PH[v.upto] ? v.upto : 'file', last = PHASES.findIndex(p => p[0] === upto);
    return STEPS.filter(s => (!s.when || s.when(v)) && PHASES.findIndex(p => p[0] === s.phase) <= last);
  }
  const stepText = (s, v) => (typeof s.does === 'function' ? s.does(v) : s.does);

  /* ---------------------------------------------------------------- drawings */
  /** the timeline after k steps (k = 0: empty): one block per Standard in its phase's lane, the documentation bar growing beneath */
  function gantt(steps, k, opts) {
    const o = opts || {}, n = steps.length, fileAt = steps.findIndex(s => s.id === 'file');
    const end = fileAt >= 0 ? fileAt + 3 : n;                               // the file assembly takes three units of the axis (up to 60 days)
    const blocks = LANES.map(l => ({ p: l, from: 0, to: 0, label: ' ' }));   // every lane from the first frame, in a fixed order
    steps.slice(0, k).forEach((s, i) => {
      if (s.id === 'file') blocks.push({ p: 'Throughout', from: i, to: i + 3, label: o.bare ? ' ' : '≤ 60 days' });
      else blocks.push({ p: LANE[s.phase], from: i, to: i + 1, label: o.bare ? ' ' : s.num });
    });
    const docTo = Math.min(k, fileAt >= 0 ? fileAt : n);
    if (docTo > 0) blocks.push({ p: 'Throughout', from: 0, to: docTo, label: o.bare ? ' ' : docTo >= 4 ? 'SA 230 working papers' : '230' });
    const cur = k > 0 ? steps[k - 1] : null;
    const marks = o.bare || !cur ? [] : [{ t: cur.id === 'file' ? k - 1 : k - 0.5, label: cur.sa }];
    return { type: 'gantt', alt: 'The audit engagement as a timeline: one block per Standard, in the lane of its phase; documentation runs along the bottom throughout',
      title: o.title || 'Tapri Tea Co. Ltd: the audit, one Standard after another', lanes: 'by-process', w: 760,
      blocks, axis: { min: 0, max: Math.max(end, 4), step: 5 }, marks, colors: COLORS };
  }
  /** the last few steps as a list, the newest highlighted */
  function card(steps, k, show) {
    const from = Math.max(0, k - (show || 4)), rows = steps.slice(from, k).map((s, i) => [String(from + i + 1), s.sa, s.title]), cells = {};
    if (rows.length) [0, 1, 2].forEach(c => (cells[`${rows.length - 1},${c}`] = 'hl'));
    return { type: 'table', title: k ? 'The journey so far (newest last)' : 'SA 200 frames the journey', head: ['#', 'Standard', 'Step'],
      rows: rows.length ? rows : [['', 'SA 200', 'Throughout: reasonable assurance, professional skepticism and professional judgment']], cells, align: ['right', 'left', 'left'] };
  }

  function compute(v) {
    const steps = journey(v), O = opinionOf(v), frames = [];
    if (!steps.length) throw new Error('Choose a phase to show the journey up to.');
    frames.push({ caption: '**SA 200 frames the whole journey:** obtain reasonable assurance that the financial statements as a whole are free from material misstatement, by gathering sufficient appropriate evidence, with professional skepticism and professional judgment throughout. Watch each Standard take its turn.',
      view: [gantt(steps, 0), card(steps, 0)] });
    steps.forEach((s, i) => {
      const newPhase = !i || steps[i - 1].phase !== s.phase;
      frames.push({ caption: `${newPhase ? `**${PH[s.phase]}.** ` : ''}**${s.sa}: ${s.title}.** ${stepText(s, v)} *${s.rule}*`, view: [gantt(steps, i + 1), card(steps, i + 1)] });
    });
    const reached = ph => steps.some(s => s.phase === ph), sas = new Set(steps.flatMap(s => s.sa.split(' · ')));
    const lastS = steps[steps.length - 1];
    frames[frames.length - 1].caption += lastS.id === 'file' ? ` The journey is complete: ${sas.size} Standards, with SA 230 documentation running underneath from the first day to the last.` : ` The journey continues with ${PH[PHASES[PHASES.findIndex(p => p[0] === lastS.phase) + 1][0]].toLowerCase()}.`;
    return {
      frames,
      stats: [{ label: 'Steps', value: String(steps.length) }, { label: 'Standards met', value: String(sas.size), hint: 'SQC 1 and the SAs that governed a step' },
        { label: 'Opinion', value: reached('report') ? O.label : 'not yet', tone: reached('report') ? (O.modified ? 'bad' : 'ok') : '' },
        { label: 'Key audit matters', value: v.listed ? 'Yes (listed)' : 'No', hint: 'SA 701: listed entities, or where law requires or the auditor decides' }],
      table: { head: ['#', 'Phase', 'Standard', 'What the auditor does'], rows: steps.map((s, i) => [String(i + 1), PH[s.phase], s.sa, stepText(s, v).replace(/\*\*/g, '')]) },
      note: '**Conventions.** One block per Standard, in the order the Study Material teaches them; the time axis shows the order, not real durations (planning, for one, continues to the end). Steps that do not apply are left out: SA 510 only in a first audit, SA 610 only with an internal audit function, SA 701 for a listed company, SA 705 and SA 706 only when the report needs them.',
      sim: { steps: steps.map(s => s.id), sas: [...sas], opinion: O }
    };
  }

  /* ---------------------------------------------------------------- "which Standard governs this step?" */
  const SCENES = [
    { sa: 'SQC 1', step: 'accept', alt: ['SA 210', 'SA 300', 'SA 230'], text: 'Before taking Tapri on, Iyer & Associates check the integrity of its promoters and whether the firm has the people, time and resources for the audit, under its own quality control policies.' },
    { sa: 'SA 220', step: 'accept', alt: ['SA 210', 'SA 300', 'SA 230'], text: 'Ms. Iyer, the engagement partner, takes responsibility for the overall quality of the Tapri audit, within her firm\'s system of quality control.' },
    { sa: 'SA 210', step: 'terms', alt: ['SA 220', 'SA 300', 'SA 580'], src: 'MTP Sep 2024 Series I, Q10', text: 'The firm sends Tapri a letter setting out the objective and scope of the audit and the responsibilities of the auditor and of management.' },
    { sa: 'SA 210', step: 'terms', alt: ['SA 220', 'SA 315', 'SA 580'], text: 'Before accepting, Ms. Iyer confirms that Tapri uses an acceptable financial reporting framework and that management accepts its responsibility for the financial statements.' },
    { sa: 'SA 300', step: 'plan', alt: ['SA 315', 'SA 330', 'SA 230'], text: 'Ms. Iyer sets the scope, timing and direction of the audit, which then guides the more detailed audit plan.' },
    { sa: 'SA 300', step: 'plan', alt: ['SA 220', 'SA 315', 'SA 500'], src: 'RTP Jan 2026, Q1', text: 'Midway through the audit, new information makes the team change the audit plan; the change and the reasons are recorded.' },
    { sa: 'SA 315', step: 'risk', alt: ['SA 330', 'SA 450', 'SA 710'], src: 'Study Material Ch 2, TYU 3', text: 'While planning, Bunty asks Tapri\'s in-house legal counsel about pending litigation, to identify and assess the risks of material misstatement.' },
    { sa: 'SA 315', step: 'risk', alt: ['SA 330', 'SA 500', 'SA 450'], src: 'Study Material Ch 3, TYU 5', text: 'At the start, the team compares this year\'s current ratio with last year\'s to see where the risks of misstatement might lie.' },
    { sa: 'SA 320', step: 'mat', alt: ['SA 450', 'SA 315', 'SA 330'], text: 'Ms. Iyer sets materiality for the financial statements as a whole at 5% of Tapri\'s profit before tax.' },
    { sa: 'SA 320', step: 'mat', alt: ['SA 450', 'SA 530', 'SA 300'], src: 'RTP Jan 2026, Q3', text: 'The team sets an amount below overall materiality, so that undetected and uncorrected misstatements together stay below it.' },
    { sa: 'SA 330', step: 'respond', alt: ['SA 500', 'SA 300', 'SA 315'], src: 'MTP May 2024 Series I, Q3.2', text: 'Having assessed a high risk of material misstatement in small-ticket loans, CA B decides to perform both tests of controls and substantive tests.' },
    { sa: 'SA 330', step: 'respond', alt: ['SA 315', 'SA 610', 'SA 265'], text: 'Because the audit plan relies on the cold-room control, the team tests whether it operated effectively throughout the year.' },
    { sa: 'SA 500', step: 'evid', alt: ['SA 530', 'SA 505', 'SA 520'], text: 'Bunty inspects purchase invoices, goods received notes and gate entries to vouch Tapri\'s purchases.' },
    { sa: 'SA 500', step: 'evid', alt: ['SA 580', 'SA 610', 'SA 230'], text: 'The team judges whether the evidence gathered is enough in quantity and good enough in quality to support the opinion.' },
    { sa: 'SA 520', step: 'ap', alt: ['SA 315', 'SA 500', 'SA 530'], text: 'Bunty predicts the rent from the number of cafés and the rent rates, and compares the prediction with the rent booked.' },
    { sa: 'SA 520', step: 'ap', alt: ['SA 700', 'SA 450', 'SA 330'], text: 'Near the end of the audit, the team runs analytical procedures to check that the financial statements agree with its understanding of Tapri.' },
    { sa: 'SA 530', step: 'sample', alt: ['SA 500', 'SA 505', 'SA 520'], src: 'PYQ May 2026, Q1(b)', text: 'CA R selects every 10th of 1,000 receivable accounts, starting at the 5th.' },
    { sa: 'SA 530', step: 'sample', alt: ['SA 320', 'SA 450', 'SA 330'], src: 'PYQ Jan 2026, Q2', text: 'The tolerable misstatement for testing online-course revenue is raised from ₹1,00,000 to ₹2,00,000, so fewer transactions are tested.' },
    { sa: 'SA 610', step: 'ia', alt: ['SA 220', 'SA 500', 'SA 265'], text: 'Before using Tapri\'s internal audit reports, Ms. Iyer evaluates the internal audit function\'s objectivity and competence.' },
    { sa: 'SA 501', step: 'inv', alt: ['SA 500', 'SA 505', 'SA 560'], text: 'The team attends Tapri\'s physical inventory count at the Indore warehouse on 31 March.' },
    { sa: 'SA 501', step: 'inv', alt: ['SA 550', 'SA 580', 'SA 260'], src: 'MTP Jan 2025 Series II, Q5(b)', text: 'Having assessed a risk from a legal claim, the auditor writes to the company\'s external legal counsel about it.' },
    { sa: 'SA 505', step: 'conf', alt: ['SA 500', 'SA 530', 'SA 501'], src: 'MTP Sep 2025 Series I, case scenario 1', text: 'Bunty sends balance confirmation requests to 20 of Tapri\'s 100 trade receivables and keeps control of the replies.' },
    { sa: 'SA 505', step: 'conf', alt: ['SA 580', 'SA 550', 'SA 500'], src: 'MTP Sep 2024 Series I, Q12', text: 'Management will not let the auditor write to a disputed supplier; the auditor asks why, weighs the reasons and plans alternative procedures.' },
    { sa: 'SA 510', step: 'open', alt: ['SA 710', 'SA 560', 'SA 300'], text: 'In its first year as Tapri\'s auditor, the firm checks that last year\'s closing balances were brought forward correctly and that the policies did not change.' },
    { sa: 'SA 550', step: 'rp', alt: ['SA 501', 'SA 505', 'SA 260'], text: 'The team finds that Tapri buys its kulhads from a firm owned by Kesar\'s brother and checks how the purchases are disclosed.' },
    { sa: 'SA 450', step: 'mis', alt: ['SA 320', 'SA 705', 'SA 580'], src: 'MTP Sep 2024 Series II, Q6', text: 'Uncorrected misstatements of ₹10 lakh and ₹20 lakh are totalled and evaluated against materiality of ₹25 lakh.' },
    { sa: 'SA 450', step: 'mis', alt: ['SA 265', 'SA 260', 'SA 320'], text: 'The team lists every misstatement found except the clearly trivial ones and asks management to correct them.' },
    { sa: 'SA 560', step: 'sub', alt: ['SA 570', 'SA 501', 'SA 450'], src: 'MTP Sep 2024 Series II, Q5', text: 'A fire destroys stock a month after the year end, before the report is signed; the auditor asks whether the notes disclose it.' },
    { sa: 'SA 560', step: 'sub', alt: ['SA 710', 'SA 700', 'SA 580'], src: 'PYQ Sep 2024, Q1(a)', text: 'After the report is signed but before the financial statements are issued, the board amends them for a ₹5 crore incentive and asks for a fresh report.' },
    { sa: 'SA 570', step: 'gc', alt: ['SA 560', 'SA 450', 'SA 315'], src: 'Study Material Ch 7, TYU 3', text: 'Tapri\'s bankers will not renew its loans and creditors go unpaid; the auditor evaluates whether a material uncertainty exists about its future.' },
    { sa: 'SA 580', step: 'wr', alt: ['SA 210', 'SA 500', 'SA 260'], src: 'PYQ May 2026, Q1(c)', text: 'Ms. Iyer obtains a letter in which management confirms it has given her all relevant information, dated the same day as her report.' },
    { sa: 'SA 260', step: 'tcwg', alt: ['SA 265', 'SA 580', 'SA 701'], text: 'The auditor tells Tapri\'s audit committee the planned scope and timing of the audit and, later, the significant findings.' },
    { sa: 'SA 265', step: 'tcwg', alt: ['SA 260', 'SA 330', 'SA 450'], text: 'A significant deficiency in Tapri\'s payroll controls is reported in writing to the audit committee.' },
    { sa: 'SA 700', step: 'op', alt: ['SA 705', 'SA 701', 'SA 706'], src: 'PYQ May 2026, Q3(b)', text: 'The audit senior explains where the Basis for Opinion section goes in the report and what it contains.' },
    { sa: 'SA 701', step: 'kam', alt: ['SA 706', 'SA 700', 'SA 260'], text: 'For listed Tapri, the report describes the valuation of franchise fees as one of the matters of most significance in the audit.' },
    { sa: 'SA 705', step: 'mod', alt: ['SA 706', 'SA 700', 'SA 701'], src: 'PYQ Jan 2026, Q11', text: 'The material uncertainty about OP Ltd\'s going concern is not adequately disclosed, so the auditor expresses a qualified or an adverse opinion.' },
    { sa: 'SA 705', step: 'mod', alt: ['SA 450', 'SA 706', 'SA 700'], text: 'Management refuses to correct a misstatement that is material but not pervasive, and the opinion is qualified.' },
    { sa: 'SA 706', step: 'eom', alt: ['SA 701', 'SA 705', 'SA 570'], text: 'Without modifying the opinion, the auditor draws users\' attention to a note on an uncertain lawsuit against Tapri.' },
    { sa: 'SA 710', step: 'comp', alt: ['SA 510', 'SA 560', 'SA 700'], text: 'The auditor checks that last year\'s figures printed beside this year\'s agree with last year\'s audited financial statements.' },
    { sa: 'SA 230', step: 'file', alt: ['SA 220', 'SA 580', 'SA 300'], text: 'The team assembles the final audit file within 60 days of the report date.' },
    { sa: 'SA 230', step: 'file', alt: ['SA 500', 'SA 220', 'SA 580'], src: 'PYQ Jan 2026, Q10', text: 'The working papers recording the procedures, the evidence and the conclusions are kept for at least seven years from the report date.' },
    { sa: 'SA 200', step: null, alt: ['SA 220', 'SA 230', 'SA 315'], text: 'Ms. Iyer reminds Bunty that an audit gives reasonable, not absolute, assurance, and that he must keep professional skepticism throughout.' }
  ];
  const saKey = s => { const m = /^(SQC|SA) (\d+)/.exec(s); return m ? (m[1] === 'SQC' ? -1 : +m[2]) : 0; };

  const presets = [
    { label: 'Tapri Tea Co. Ltd (listed): the whole engagement, unmodified opinion', values: { upto: 'file', listed: true, initial: false, ia: true, gc: 'none', opinion: 'unmodified', eom: false } },
    { label: 'Modelled on PYQ Jan 2026, Q1: a new auditor replaces CA S at Skill Edge (first-year audit, unlisted)', values: { upto: 'file', listed: false, initial: true, ia: false, gc: 'none', opinion: 'unmodified', eom: false } },
    { label: 'Modelled on PYQ Jan 2026, Q11: a going-concern uncertainty is not adequately disclosed', values: { upto: 'report', listed: true, initial: false, ia: true, gc: 'mu-bad', opinion: 'unmodified', eom: false } },
    { label: 'A material uncertainty on going concern, adequately disclosed', values: { upto: 'report', listed: true, initial: false, ia: true, gc: 'mu-ok', opinion: 'unmodified', eom: false } },
    { label: 'Modelled on MTP May 2024 Series I, Q3.2: up to the response to a high assessed risk', values: { upto: 'respond', listed: false, initial: false, ia: false, gc: 'none', opinion: 'unmodified', eom: false } },
    { label: 'Planning only (SA 300): acceptance, terms, strategy and plan', values: { upto: 'plan', listed: true, initial: false, ia: true, gc: 'none', opinion: 'unmodified', eom: false } },
    { label: 'An uncertain lawsuit: unmodified opinion with an Emphasis of Matter paragraph', values: { upto: 'report', listed: true, initial: false, ia: true, gc: 'none', opinion: 'unmodified', eom: true } },
    { label: 'Management will not correct a material misstatement: a qualified opinion', values: { upto: 'report', listed: false, initial: false, ia: true, gc: 'none', opinion: 'qualified', eom: false } }
  ];

  const def = {
    id: 'audit-journey', title: 'Audit Journey Lab',
    blurb: 'Watch the whole audit engagement light up, step by step, with the Standard on Auditing that governs each step.',
    controls: [
      { id: 'upto', type: 'select', label: 'Show the journey up to', value: 'file', options: PHASES.map(([k, l], i) => [k, i === PHASES.length - 1 ? 'The final audit file (the whole journey)' : l]) },
      { id: 'listed', type: 'toggle', label: 'Listed company (key audit matters, SA 701)', short: 'Listed', value: true },
      { id: 'initial', type: 'toggle', label: 'First audit of this client (initial engagement)', short: 'First-year audit', value: false },
      { id: 'ia', type: 'toggle', label: 'Tapri has an internal audit function (SA 610)', short: 'Internal audit function', value: true },
      { id: 'gc', type: 'select', label: 'Going concern', value: 'none', options: [['none', 'No material uncertainty'], ['mu-ok', 'Material uncertainty, adequately disclosed'], ['mu-bad', 'Material uncertainty, not adequately disclosed']] },
      { id: 'opinion', type: 'select', label: 'Opinion the evidence supports', short: 'Opinion', value: 'unmodified', options: Object.entries(OPIN) },
      { id: 'eom', type: 'toggle', label: 'A matter needs emphasis (SA 706)', short: 'Emphasis of matter', value: false }
    ],
    presets, compute,
    challenge: {
      title: 'Which Standard governs this step?',
      gen(r) { const i = Math.floor(r() * SCENES.length); return { ask: i }; },
      kind: 'choice',
      choices: v => { const S = SCENES[v.ask] || SCENES[0]; return [S.sa].concat(S.alt).sort((a, b) => saKey(a) - saKey(b)).map(x => [x, x]); },
      prompt: v => `**Which Standard governs this step?** ${(SCENES[v.ask] || SCENES[0]).text}`,
      solve: (res, v) => (SCENES[v.ask] || SCENES[0]).sa,
      view: (res, v) => [gantt(journey(v), journey(v).length, { bare: true, title: 'The journey (Standards hidden)' })],
      explain: (res, v) => {
        const S = SCENES[v.ask] || SCENES[0], st = STEPS.find(x => x.id === S.step);
        return `**${S.sa}**${st ? ` (${PH[st.phase].toLowerCase()}: ${st.title.toLowerCase()})` : ' (the overall objectives of the independent auditor)'}. ${st ? st.rule : 'Reasonable assurance is a high, but not absolute, level of assurance; professional skepticism is maintained throughout the audit.'}${S.src ? ` (${S.src}.)` : ''}`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { journey, opinionOf, STEPS, SCENES, PHASES, LANE, compute, def };
  g.__lab_def_audit_journey = def;
})(typeof window !== 'undefined' ? window : globalThis);
