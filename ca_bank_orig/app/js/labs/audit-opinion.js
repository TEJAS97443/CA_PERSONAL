/* PassBook — Audit Opinion Lab (Paper 5, aud.report). Pure part: decide(facts) walks ICAI's decision path (SA 705 nature → material →
   pervasive; SA 705 para 5.5 for a management-imposed limitation; SA 570 for going concern) to an opinion, then SA 706 (Emphasis of
   Matter, Other Matter) and SA 701 (Key Audit Matters), and outline(R) lays out the report's sections. compute(values) turns that into
   frames: a decision tree whose path lights up node by node, SA 705's two-by-two table, the report additions and the report outline.
   Source: ICAI Study Material, Paper 5, Ch 8 §2, §5–7 (SA 700, SA 705, SA 706, SA 701) and Ch 7 §2.11 (SA 570 reporting).
   Node-testable: require('app/js/labs/audit-opinion.js') exposes {decide, outline, caseOf, CASES, compute, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const OPINION = { unmodified: 'Unmodified', qualified: 'Qualified', adverse: 'Adverse', disclaimer: 'Disclaimer', withdraw: 'Withdraw' };
  const OPINION_LONG = { unmodified: 'an unmodified opinion', qualified: 'a qualified opinion', adverse: 'an adverse opinion', disclaimer: 'a disclaimer of opinion', withdraw: 'withdrawal from the engagement' };
  const NATURE = {
    none: 'No material problem found',
    mis: 'Financial statements are misstated (evidence obtained)',
    scope: 'Unable to obtain sufficient appropriate audit evidence',
    gc: 'Going concern doubt (SA 570)',
    multi: 'Multiple uncertainties (extremely rare)'
  };
  const NATURE_SHORT = { none: 'No issue', mis: 'Misstatement', scope: 'No sufficient evidence', gc: 'Going concern', multi: 'Multiple uncertainties' };
  const PARA = { EOM: 'Emphasis of Matter paragraph', OM: 'Other Matter paragraph', KAM: 'Key Audit Matter', MURGC: 'Material Uncertainty Related to Going Concern section' };

  /* ---------------------------------------------------------------- the decision trees (one per kind of matter, so each stays narrow) */
  const leaf = (id, label, out) => ({ id, label, out });
  const node = (id, label, kids) => ({ id, label, kids });
  const TREES = {
    none: node('r', 'Evidence sufficient,\nno material misstatement', [['', leaf('U', 'Unmodified', 'unmodified')]]),
    mis: node('r', 'Misstatement found\n(evidence obtained)', [['', node('m', 'Material?', [['no', leaf('U', 'Unmodified', 'unmodified')],
      ['yes', node('p', 'Pervasive?', [['no', leaf('Q', 'Qualified', 'qualified')], ['yes', leaf('A', 'Adverse', 'adverse')]])]])]]),
    scope: node('r', 'Evidence not obtained', [['', node('alt', 'Alternative procedures\ngive the evidence?', [['yes', leaf('N', 'No modification', 'unmodified')],
      ['no', node('m', 'Possible effects\nmaterial?', [['no', leaf('U', 'Unmodified', 'unmodified')],
        ['yes', node('p', 'Pervasive?', [['no', leaf('Q', 'Qualified', 'qualified')], ['yes', leaf('D', 'Disclaimer', 'disclaimer')]])]])]])]]),
    imposed: node('r', 'Management limits\nthe scope', [['', node('rem', 'Limitation removed\nwhen requested?', [['yes', leaf('G', 'Audit goes on', 'unmodified')],
      ['no', node('alt', 'Tell TCWG; alternative\nprocedures work?', [['yes', leaf('N', 'No modification', 'unmodified')],
        ['no', node('p', 'Possible effects\npervasive?', [['no', leaf('Q', 'Qualified', 'qualified')], ['yes', leaf('W', 'Withdraw or\ndisclaimer', 'wd')]])]])]])]]),
    gc: node('r', 'Going concern doubt', [['', node('b', 'Going concern basis\nappropriate?', [['no', leaf('A1', 'Adverse', 'adverse')],
      ['yes', node('mu', 'Material\nuncertainty?', [['no', leaf('U', 'Unmodified', 'unmodified')],
        ['yes', node('d', 'Adequately\ndisclosed?', [['yes', leaf('MU', 'Unmodified +\nMU section', 'unmodified')],
          ['no', node('p', 'Pervasive?', [['no', leaf('Q', 'Qualified', 'qualified')], ['yes', leaf('A2', 'Adverse', 'adverse')]])]])]])]])]]),
    gcno: node('r', 'Management will not\nassess going concern', [['', node('p', 'Possible effects\npervasive?', [['no', leaf('Q', 'Qualified', 'qualified')], ['yes', leaf('D', 'Disclaimer', 'disclaimer')]])]]),
    multi: node('r', 'Multiple uncertainties', [['', node('o', 'Opinion possible despite\ntheir interaction?', [['yes', leaf('U', 'Opinion as usual', 'unmodified')], ['no', leaf('D', 'Disclaimer', 'disclaimer')]])]])
  };
  const TREE_TITLE = {
    none: 'SA 700: form the opinion', mis: 'SA 705: a misstatement', scope: 'SA 705: evidence not obtained', imposed: 'SA 705 para 5.5: a limitation imposed by management',
    gc: 'SA 570: going concern in the report', gcno: 'SA 570: no going concern assessment', multi: 'SA 705: multiple uncertainties'
  };

  /* generic reasons, in the Study Material's words; a case card can replace any of them with its own (case.why) */
  const WHY = {
    'mis.r': 'The auditor **has** sufficient appropriate audit evidence, and it shows that the financial statements are misstated. That is the first row of SA 705’s table: the question is how much it matters.',
    'mis.m.yes': 'The uncorrected misstatements, individually or in aggregate, are **material**: they could reasonably be expected to influence the economic decisions of users. A clean opinion is no longer possible.',
    'mis.m.no': 'The uncorrected misstatements, individually and in aggregate, are **not material**, so the financial statements are still prepared, in all material respects, in accordance with the framework.',
    'p.no': 'The effects are confined to specific elements, accounts or items and are not a substantial proportion of the financial statements: **material but not pervasive**.',
    'p.yes': 'The effects are **pervasive**: not confined to specific elements, accounts or items, or, if confined, a substantial proportion of the financial statements (or, for disclosures, fundamental to users’ understanding).',
    'scope.r': 'The auditor **could not obtain** sufficient appropriate audit evidence, so nobody knows whether the item is right. That is the second row of SA 705’s table.',
    'alt.yes': 'Alternative audit procedures gave sufficient appropriate audit evidence after all, so there is nothing left to modify for.',
    'alt.no': 'Alternative audit procedures cannot provide the evidence either, so the inability stands.',
    'scope.m.yes': 'The **possible effects** of undetected misstatements, if any, **could be material**: the opinion must be modified.',
    'scope.m.no': 'Even if the unverified item were wrong, its possible effects could not be material, so the opinion need not be modified.',
    'imposed.r': 'After accepting the engagement, the auditor finds that **management has limited the scope** in a way likely to lead to a qualified opinion or a disclaimer. SA 705 first asks the auditor to **request management to remove the limitation**.',
    'rem.yes': 'Management removed the limitation, so the auditor simply proceeds with the audit procedures.',
    'rem.no': 'Management refuses. The auditor **communicates the matter to those charged with governance** (unless all of them manage the entity) and tries **alternative procedures**.',
    'gc.r': 'Events or conditions cast doubt on the entity’s ability to continue as a going concern. SA 570 first asks whether management’s **use of the going concern basis of accounting is appropriate**.',
    'b.no': 'The financial statements use the going concern basis, but in the auditor’s judgement that basis is **inappropriate**: SA 570 requires an **adverse opinion**.',
    'b.yes': 'The going concern basis is appropriate. Next: does a **material uncertainty** exist about the entity’s ability to continue as a going concern?',
    'mu.no': 'Events or conditions were identified but no material uncertainty exists. The auditor still checks that the financial statements disclose these events or conditions adequately; the opinion is unmodified.',
    'mu.yes': 'A **material uncertainty exists**. Everything now depends on whether the financial statements disclose it adequately.',
    'd.yes': 'The uncertainty is **adequately disclosed**, so the opinion is **unmodified**, and the report adds a separate section headed **“Material Uncertainty Related to Going Concern”**.',
    'd.no': 'The uncertainty is **not adequately disclosed**: that is a misstatement, so SA 570 sends the auditor to SA 705 for a **qualified or adverse** opinion, as appropriate.',
    'gcno.r': 'Management is **unwilling to make or extend its assessment** of going concern when asked. The auditor cannot obtain sufficient appropriate audit evidence about the going concern basis: SA 570 says a **qualified opinion or a disclaimer** may be appropriate.',
    'multi.r': 'There are several uncertainties. The auditor has sufficient appropriate audit evidence about **each one**, but their possible **interaction and cumulative effect** may still make an opinion impossible (SA 705 calls this extremely rare).',
    'o.yes': 'An opinion can still be formed, so the usual rules apply (the uncertainties must be disclosed in the financial statements).',
    'o.no': 'It is not possible to form an opinion because of the potential interaction of the uncertainties: SA 705 requires a **disclaimer of opinion**, even though each uncertainty is evidenced.',
    'none.r': 'Sufficient appropriate audit evidence has been obtained and uncorrected misstatements are not material: the auditor concludes that the financial statements are prepared, in all material respects, in accordance with the framework.'
  };
  const LEAF_WHY = {
    unmodified: 'SA 700: **unmodified opinion**, the financial statements give a true and fair view.',
    qualified: 'SA 705: **qualified opinion**, “except for” the matter.',
    adverse: 'SA 705: **adverse opinion**, the financial statements do not give a true and fair view.',
    disclaimer: 'SA 705: **disclaimer of opinion**, the auditor does not express an opinion.',
    withdraw: 'SA 705 para 5.5: **withdraw from the audit**, because withdrawal is practicable and possible under law. Before withdrawing, the auditor tells those charged with governance about any misstatements identified that would have led to a modification.',
    wdDisclaim: 'Withdrawal before issuing the report is **not practicable or possible**, so SA 705 para 5.5 requires a **disclaimer of opinion**.'
  };

  /* ---------------------------------------------------------------- facts → decision */
  const FACT_KEYS = ['nature', 'material', 'pervasive', 'imposed', 'removed', 'altok', 'withdraw', 'gcBasis', 'mu', 'disclosed', 'formable', 'listed', 'kam', 'eom', 'eomKam', 'om'];
  function normFacts(f) {
    const o = {};
    FACT_KEYS.forEach(k => (o[k] = f[k]));
    if (!NATURE[o.nature]) throw new Error('Choose what the audit found: no problem, a misstatement, no sufficient evidence, a going concern doubt or multiple uncertainties.');
    if (o.nature === 'gc' && !['appropriate', 'inappropriate', 'unwilling'].includes(o.gcBasis)) throw new Error('Say whether the going concern basis is appropriate, inappropriate, or not assessed by management.');
    ['material', 'pervasive', 'imposed', 'removed', 'altok', 'withdraw', 'mu', 'disclosed', 'formable', 'listed', 'kam', 'eom', 'eomKam', 'om'].forEach(k => (o[k] = !!o[k]));
    return o;
  }

  /** the path through the tree and the opinion. why(key, fallback) lets a case card explain a step in its own facts */
  function decide(facts, why) {
    const f = normFacts(facts), W = (k, d) => (why && why[k]) || d || WHY[k] || '';
    const path = ['r'], says = [];
    let tree = f.nature, out = null, basis = null;
    const step = (to, text) => { says.push(text); path.push(to); };
    switch (f.nature) {
      case 'none': step('U', W('nature', WHY['none.r'])); out = 'unmodified'; break;
      case 'mis':
        step('m', W('nature', WHY['mis.r']));
        if (!f.material) { step('U', W('material', WHY['mis.m.no'])); out = 'unmodified'; break; }
        step('p', W('material', WHY['mis.m.yes'])); basis = 'mis';
        if (f.pervasive) { step('A', W('pervasive', WHY['p.yes'])); out = 'adverse'; } else { step('Q', W('pervasive', WHY['p.no'])); out = 'qualified'; }
        break;
      case 'scope':
        if (f.imposed) {
          tree = 'imposed';
          step('rem', W('nature', WHY['imposed.r']));
          if (f.removed) { step('G', W('removed', WHY['rem.yes'])); out = 'unmodified'; break; }
          step('alt', W('removed', WHY['rem.no']));
          if (f.altok) { step('N', W('altok', WHY['alt.yes'])); out = 'unmodified'; break; }
          step('p', W('altok', WHY['alt.no'])); basis = 'scope';
          if (f.pervasive) { step('W', W('pervasive', WHY['p.yes']) + ' A qualification would be inadequate to communicate the gravity of the situation.'); out = f.withdraw ? 'withdraw' : 'disclaimer'; }
          else { step('Q', W('pervasive', WHY['p.no'])); out = 'qualified'; }
          break;
        }
        step('alt', W('nature', WHY['scope.r']));
        if (f.altok) { step('N', W('altok', WHY['alt.yes'])); out = 'unmodified'; break; }
        step('m', W('altok', WHY['alt.no']));
        if (!f.material) { step('U', W('material', WHY['scope.m.no'])); out = 'unmodified'; break; }
        step('p', W('material', WHY['scope.m.yes'])); basis = 'scope';
        if (f.pervasive) { step('D', W('pervasive', WHY['p.yes'])); out = 'disclaimer'; } else { step('Q', W('pervasive', WHY['p.no'])); out = 'qualified'; }
        break;
      case 'gc':
        if (f.gcBasis === 'unwilling') {
          tree = 'gcno'; basis = 'gcno';
          step('p', W('nature', WHY['gcno.r']));
          if (f.pervasive) { step('D', W('pervasive', WHY['p.yes'])); out = 'disclaimer'; } else { step('Q', W('pervasive', WHY['p.no'])); out = 'qualified'; }
          break;
        }
        step('b', W('nature', WHY['gc.r']));
        if (f.gcBasis === 'inappropriate') { step('A1', W('gcBasis', WHY['b.no'])); out = 'adverse'; basis = 'gcbasis'; break; }
        step('mu', W('gcBasis', WHY['b.yes']));
        if (!f.mu) { step('U', W('mu', WHY['mu.no'])); out = 'unmodified'; break; }
        step('d', W('mu', WHY['mu.yes']));
        if (f.disclosed) { step('MU', W('disclosed', WHY['d.yes'])); out = 'unmodified'; break; }
        step('p', W('disclosed', WHY['d.no'])); basis = 'gcdisc';
        if (f.pervasive) { step('A2', W('pervasive', WHY['p.yes'])); out = 'adverse'; } else { step('Q', W('pervasive', WHY['p.no'])); out = 'qualified'; }
        break;
      case 'multi':
        step('o', W('nature', WHY['multi.r']));
        if (f.formable) { step('U', W('formable', WHY['o.yes'])); out = 'unmodified'; } else { step('D', W('formable', WHY['o.no'])); out = 'disclaimer'; basis = 'multi'; }
        break;
    }
    const lastWhy = out === 'withdraw' ? LEAF_WHY.withdraw : tree === 'imposed' && path[path.length - 1] === 'W' ? LEAF_WHY.wdDisclaim : LEAF_WHY[out];
    says.push(lastWhy);
    const murgc = f.nature === 'gc' && f.gcBasis === 'appropriate' && f.mu && f.disclosed;
    /* SA 706 and SA 701. SA 701 applies to listed entities (or when the auditor decides, or law requires, to communicate KAMs) */
    const kamApplies = f.listed && out !== 'withdraw';
    const eom = !f.eom || out === 'withdraw' ? 'no' : kamApplies && f.eomKam ? 'kam' : 'yes';
    const om = f.om && out !== 'withdraw' ? 'yes' : 'no';
    let kam;
    if (!f.listed || out === 'withdraw') kam = 'na';
    else if (out === 'disclaimer') kam = 'barred';
    else kam = f.kam || eom === 'kam' ? 'section' : 'none';
    const modified = out === 'qualified' || out === 'adverse' || out === 'disclaimer';
    return { facts: f, tree, path, says, opinion: out, basis, murgc, eom, om, kam, kamApplies, modified,
      matrix: basis === 'mis' || basis === 'gcdisc' ? 0 : basis === 'scope' || basis === 'gcno' ? 1 : null };
  }

  /* ---------------------------------------------------------------- the report: SA 700's sections as SA 705 / 706 / 701 / 570 change them */
  function outline(R, entity) {
    const o = R.opinion, scopeLike = R.basis === 'scope' || R.basis === 'gcno' || R.basis === 'multi', rows = [];
    if (o === 'withdraw') {
      rows.push(['No auditor’s report', 'The auditor withdraws from the engagement (SA 705 para 5.5), having first communicated to those charged with governance any misstatements identified that would have given rise to a modification of the opinion.']);
      return rows;
    }
    rows.push(['Title', 'Independent Auditor’s Report']);
    rows.push(['Addressee', `To the Members of ${entity}`]);
    const head = { unmodified: 'Opinion', qualified: 'Qualified Opinion', adverse: 'Adverse Opinion', disclaimer: 'Disclaimer of Opinion' }[o];
    const words = {
      unmodified: 'In our opinion … the financial statements **give a true and fair view** … in accordance with the applicable financial reporting framework.',
      qualified: scopeLike ? 'In our opinion, **except for the possible effects of** the matter described in the Basis for Qualified Opinion section, the financial statements give a true and fair view …'
        : 'In our opinion, **except for the effects of** the matter described in the Basis for Qualified Opinion section, the financial statements give a true and fair view …',
      adverse: 'In our opinion, **because of the significance of** the matter described in the Basis for Adverse Opinion section, the financial statements **do not give a true and fair view** …',
      disclaimer: 'We **were engaged to audit** the financial statements … We **do not express an opinion** on them. Because of the significance of the matter described in the Basis for Disclaimer of Opinion section, we have not been able to obtain sufficient appropriate audit evidence to provide a basis for an audit opinion.'
    }[o];
    rows.push([head, words]);
    let basis;
    if (o === 'unmodified') basis = 'SAs followed; independence and other ethical responsibilities met; the audit evidence obtained **is sufficient and appropriate** to provide a basis for our opinion.';
    else if (o === 'disclaimer') basis = 'The **reasons for the inability** to obtain sufficient appropriate audit evidence. It **omits** the statement that the evidence is sufficient and appropriate and the reference to the auditor’s responsibilities section; it still describes any other matter that would have required a modification.';
    else {
      const what = R.basis === 'gcdisc' ? 'That a **material uncertainty** exists that may cast significant doubt on the entity’s ability to continue as a going concern, and that the financial statements **do not adequately disclose** it.'
        : R.basis === 'gcbasis' ? 'Why management’s use of the **going concern basis of accounting is inappropriate**.'
          : scopeLike ? 'The **reasons for the inability** to obtain sufficient appropriate audit evidence.'
            : 'A description of the matter and a **quantification of its financial effects** (or a statement that quantification is not practicable).';
      basis = `${what} The evidence is sufficient and appropriate to provide a basis for our **${o}** opinion.`;
    }
    rows.push([{ unmodified: 'Basis for Opinion', qualified: 'Basis for Qualified Opinion', adverse: 'Basis for Adverse Opinion', disclaimer: 'Basis for Disclaimer of Opinion' }[o], basis]);
    if (R.murgc) rows.push(['Material Uncertainty Related to Going Concern', 'Draws attention to the note that discloses the matter; states that a material uncertainty exists that may cast significant doubt on the entity’s ability to continue as a going concern, and that **our opinion is not modified** in respect of the matter.']);
    if (R.eom === 'yes') rows.push(['Emphasis of Matter', 'We draw attention to Note … (a clear reference to where the matter is disclosed; only information in the financial statements). **Our opinion is not modified** in respect of this matter.']);
    if (R.kam === 'section') rows.push(['Key Audit Matters', 'Matters of most significance in the audit of the current period, addressed in the context of the audit as a whole; **no separate opinion** on them.' + (R.modified || R.murgc ? ' The matter in the ' + (R.murgc ? 'Material Uncertainty' : 'Basis for ' + head) + ' section is reported there, not here.' : '')]);
    if (R.kam === 'none') rows.push(['Key Audit Matters', (R.modified || R.murgc ? `Except for the matter described in the ${R.murgc ? 'Material Uncertainty Related to Going Concern' : 'Basis for ' + head} section, we` : 'We') + ` have determined that there are no ${R.modified || R.murgc ? 'other ' : ''}key audit matters to communicate in our report.`]);
    rows.push(['Responsibilities of Management', 'For preparing financial statements that give a true and fair view, and for internal control.']);
    rows.push(['Auditor’s Responsibilities', o === 'disclaimer' ? 'Amended to say **only**: our responsibility is to audit in accordance with SAs and issue a report; because of the matter, we could not obtain sufficient appropriate audit evidence to provide a basis for an opinion; and the independence statement.'
      : 'To obtain reasonable assurance about whether the financial statements as a whole are free from material misstatement, and to issue a report that includes our opinion.']);
    if (R.om === 'yes') rows.push(['Other Matter', 'The matter (not presented or disclosed in the financial statements) relevant to users’ understanding of the audit, the auditor’s responsibilities or the report. Our opinion is not modified in respect of this matter.']);
    rows.push(['Signature, place and date', 'Signed by the engagement partner, with the place of signature and the date of the report.']);
    return rows;
  }

  /** the report additions as a table of verdicts: [element, Standard, included?, why] */
  function additions(R) {
    const f = R.facts, wd = R.opinion === 'withdraw';
    const mu = R.murgc ? ['yes', 'Going concern basis appropriate, a material uncertainty exists and it is adequately disclosed: a separate section, opinion unmodified.']
      : f.nature === 'gc' && R.basis === 'gcdisc' ? ['no', 'Not adequately disclosed: reported in the Basis for ' + OPINION[R.opinion] + ' Opinion section instead.']
        : ['no', f.nature === 'gc' ? 'Only when the uncertainty exists and is adequately disclosed.' : 'No material uncertainty about going concern in this case.'];
    const eom = !f.eom ? ['no', 'No disclosed matter is fundamental to users’ understanding.'] : wd ? ['no', 'No report is issued.']
      : R.eom === 'kam' ? ['no', 'The matter was determined to be a key audit matter, so it is described there (SA 706 allows an EOM only for a matter that is not a KAM).']
        : ['yes', 'A matter appropriately presented or disclosed in the financial statements is fundamental to users’ understanding; the opinion is not modified because of it.'];
    const om = !f.om ? ['no', 'No matter outside the financial statements needs to be communicated.'] : wd ? ['no', 'No report is issued.']
      : ['yes', 'A matter not presented or disclosed in the financial statements is relevant to users’ understanding of the audit, the auditor’s responsibilities or the report (and law does not prohibit it).'];
    const kam = R.kam === 'na' ? ['no', wd ? 'No report is issued.' : 'The entity is not listed: SA 701 applies to listed entities (or when the auditor decides, or law requires, to communicate key audit matters).']
      : R.kam === 'barred' ? ['no', 'SA 705: a report that **disclaims** an opinion shall not include a Key Audit Matters section (unless law or regulation requires it).']
        : R.kam === 'section' ? ['yes', 'SA 701 applies and matters that required significant auditor attention were of most significance in the audit.' + (R.eom === 'kam' ? ' The emphasised matter is one of them.' : '')]
          : ['yes', 'SA 701 applies but there is nothing more to report, so the section states that there are no (other) key audit matters.'];
    return [['Material Uncertainty Related to Going Concern', 'SA 570', mu], ['Emphasis of Matter', 'SA 706', eom], ['Key Audit Matters', 'SA 701', kam], ['Other Matter', 'SA 706', om]];
  }

  /* ---------------------------------------------------------------- case cards */
  /* f: facts as decide() reads them; why: the case's own reasons for steps (nature, material, pervasive, removed, altok, gcBasis, mu,
     disclosed); ask: 'opinion' (which opinion?) or 'para' (which paragraph or section?); icai: ICAI's answer, for the results;
     practice: false keeps a case whose ICAI answer leaves the choice open ('qualified or adverse') out of Test yourself */
  const F = o => Object.assign({ nature: 'none', material: false, pervasive: false, imposed: false, removed: false, altok: false, withdraw: false, gcBasis: 'appropriate', mu: false, disclosed: false, formable: false, listed: false, kam: false, eom: false, eomKam: false, om: false }, o);
  const CASES = [
    /* ICAI Study Material, Paper 5, Ch 8 */
    { id: 'sm-loans', group: 'From the Study Material', title: 'Super Duper Ltd: the loans that were never split', src: 'ICAI Study Material, Ch 8, Illustration 9',
      entity: 'Super Duper Ltd', auditor: 'M/s Young Old & Associates', ask: 'opinion',
      facts: 'Super Duper Ltd. manufactures office furniture. M/s Young Old & Associates are its statutory auditors for FY 2021-22. CA Young notices that the company has not bifurcated its loans into long term and short term. CA Young understands that the misstatement is material, though it is not pervasive.',
      f: F({ nature: 'mis', material: true, pervasive: false }),
      why: { material: 'Not splitting the loans into long term and short term misstates the balance sheet, and CA Young judges the misstatement **material**.', pervasive: 'It is confined to the classification of one item, borrowings, and CA Young judges it **not pervasive**.' },
      icai: 'M/s Young Old & Associates should give a qualified opinion as the effect of the misstatement on account of the non-bifurcation of loans into long term and short term loans, is material but not pervasive.' },
    { id: 'sm-polex', group: 'From the Study Material', title: 'Polex Ltd: watches, stocks and a cashier', src: 'ICAI Study Material, Ch 8, Illustration 10',
      entity: 'Polex Ltd', auditor: 'M/s Taj Raj & Associates', ask: 'opinion',
      facts: 'Polex Ltd. manufactures premium watches. CA Taj, the engagement partner of M/s Taj Raj & Associates, finds that the company’s stocks and debtors, about 80% of its total assets, are not realisable. The cashier has also committed a fraud during the year. Neither fact is reflected in the financial statements for the year ending 31.03.2022.',
      f: F({ nature: 'mis', material: true, pervasive: true }),
      why: { material: 'Stocks and debtors that cannot be realised, and an unrecorded fraud, are not reflected in the financial statements: the misstatements are clearly **material**.', pervasive: 'Stocks and debtors are about **80% of total assets**, a substantial proportion of the financial statements, so the effect is **pervasive**: the statements present a distorted view.' },
      icai: 'CA Taj should give an adverse opinion. Further, CA Taj should also consider the reporting responsibilities under CARO 2020 and section 143(12) of the Companies Act, 2013.' },
    { id: 'sm-sap', group: 'From the Study Material', title: 'Delightful Ltd: the switch to SAP', src: 'ICAI Study Material, Ch 8, Illustration 11',
      entity: 'Delightful Ltd', auditor: 'the statutory auditor', ask: 'opinion',
      facts: 'Delightful Ltd. makes smiley balls. During FY 2021-22 it moved its accounts from a manual system to SAP. Employees were not well versed with SAP, so there were many errors during the transition, and the auditors could not extract correct data and reports from the system. The data was not available manually either, and the employees and management were not supportive in providing information.',
      f: F({ nature: 'scope', material: true, pervasive: true }),
      why: { nature: 'The auditor cannot get correct data or reports out of SAP: this is an **inability to obtain sufficient appropriate audit evidence**, not a known misstatement.', altok: 'The data is **not available manually** either, and staff do not help, so there is no alternative source of evidence.', material: 'The accounts as a whole came through the faulty transition, so the possible effects **could be material**.', pervasive: 'The problem affects the whole accounting system, not one item: the possible effects are **pervasive**.' },
      icai: 'When the statutory auditor of the company is unable to obtain sufficient and appropriate audit evidence, the auditor should give disclaimer of opinion as per SA 705.' },
    { id: 'sm-sarasbhai', group: 'From the Study Material', title: 'CA Sarasbhai Patel: non-cooperation all around', src: 'ICAI Study Material, Ch 8, Test Your Understanding 3 (also RTP May 2024, Q19)',
      entity: 'the entity', auditor: 'CA Sarasbhai Patel', ask: 'opinion',
      facts: 'CA Sarasbhai Patel gets no support to attend the year-end inventory count. The CFO withholds the present addresses and e-mail ids of customers and suppliers, “for business confidentiality”, so no external confirmations can be sent. Revenues cannot be verified for lack of details, and staff make lame excuses when bills are asked for. Higher management was told, to no avail. The possible effects of misstatements would be material and affect many aspects of the financial statements. It is not possible to withdraw from the engagement.',
      f: F({ nature: 'scope', imposed: true, removed: false, altok: false, material: true, pervasive: true, withdraw: false }),
      why: { nature: 'Management (the CFO and staff) blocks the count, the confirmations and the vouchers after the engagement was accepted: a **limitation imposed by management**. The auditor first asks management to remove it.', removed: 'The matter went to higher management, **to no avail**: the limitation stays. The auditor tells those charged with governance and looks for alternative procedures.', altok: 'Without addresses, details and bills there is nothing to perform alternative procedures on: the evidence **cannot be obtained**.', pervasive: 'The possible effects are material and **affect many aspects** of the financial statements: **pervasive**, so a qualification would be inadequate.' },
      icai: 'The auditor should disclaim an opinion when withdrawal from the audit is not practicable or possible (SA 705 para 5.5; RTP May 2024 Q19: withdraw where practicable and possible under law, otherwise disclaim).' },
    { id: 'sm-fire', group: 'From the Study Material', title: 'Lomaxe Ltd: fire at the candle factory', src: 'ICAI Study Material, Ch 8, Illustration 14',
      entity: 'Lomaxe Ltd', auditor: 'CA Kamalnath', ask: 'para',
      facts: 'Lomaxe Ltd. makes candles. During FY 2021-22 a fire in its factory destroyed some plant and machinery. The company disclosed this in the notes to accounts for the year ending 31.03.2022. CA Kamalnath, the statutory auditor, thinks the matter is so important that it is fundamental to users’ understanding of the financial statements. The financial statements are otherwise fine.',
      f: F({ nature: 'none', eom: true }),
      icai: 'There is a need to add an Emphasis of Matter paragraph: “Emphasis of Matter – Effects of Fire in Company’s Factory. We draw attention to Note Y of the financial statements, which describes the effects of a fire in the Company’s factory. Our opinion is not modified in respect of this matter.”' },
    /* ICAI past papers, RTPs and MTPs (new scheme) */
    { id: 'pyq-megapower', group: 'From ICAI papers', title: 'Mega Power Ltd: solar lanterns and a cash crunch', src: 'PYQ Sep 2024, Paper 5, Case Scenario 3, Q11',
      entity: 'Mega Power Ltd', auditor: 'the auditor', ask: 'opinion',
      facts: 'Mega Power Ltd. makes solar lanterns for villages without reliable power, but government power projects have cut demand. It could not raise ₹2 crore of working capital, paid suppliers late and now has to pay cash on delivery. The going concern basis of accounting is appropriate, but a material uncertainty exists, and management makes adequate disclosure of it in the financial statements.',
      f: F({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: true }),
      icai: 'Answer key (C): Unmodified opinion (with a separate “Material Uncertainty Related to Going Concern” section, SA 570).' },
    { id: 'pyq-wrep', group: 'From ICAI papers', title: 'Mega Power Ltd: representations the auditor cannot trust', src: 'PYQ Sep 2024, Paper 5, Case Scenario 3, Q12',
      entity: 'Mega Power Ltd', auditor: 'the auditor', ask: 'opinion',
      facts: 'At Mega Power Ltd. the auditor has concerns about the ethical values and diligence of management, and about the reliability of management’s representations and the audit evidence in general. The auditor concludes that the written representations from management are not reliable.',
      f: F({ nature: 'scope', material: true, pervasive: true }),
      why: { nature: 'Doubts about management’s integrity undermine **all** the evidence, so the auditor cannot obtain sufficient appropriate audit evidence (SA 580).', altok: 'No alternative procedure can replace reliable representations from a management whose integrity is in doubt.', material: 'The doubt reaches every assertion that rests on management’s word: the possible effects **could be material**.', pervasive: 'It is not confined to any account: **pervasive**. SA 580 requires a disclaimer when written representations are not reliable.' },
      icai: 'Answer key (A): Disclaimer of opinion.' },
    { id: 'pyq-ghb', group: 'From ICAI papers', title: 'GHB Ltd: the warehouse cut off by a calamity', src: 'PYQ Sep 2024, Paper 5, Case Scenario 1, Q1', practice: false,
      entity: 'GHB Ltd', auditor: 'CA B', ask: 'opinion',
      facts: 'GHB Ltd., a listed tea company, holds its inventory in a central warehouse near the Himachal Pradesh border. A natural calamity made CA B’s attendance at the physical count on 31 March 2024 impracticable, and alternative audit procedures to obtain evidence about the existence and condition of the inventory were impossible. (The lab assumes the possible effects are material but confined to inventory.)',
      f: F({ nature: 'scope', material: true, pervasive: false, listed: true, kam: false }),
      why: { nature: 'The calamity, not management, keeps the auditor from the count: an **inability to obtain sufficient appropriate audit evidence** about inventory.', altok: 'Alternative procedures were **impossible**, so the inability stands.', material: 'The lab assumes the inventory is material (ICAI’s answer only says the opinion must be modified).', pervasive: 'Assumed confined to inventory and not a substantial proportion: **not pervasive**.' },
      icai: 'Answer key (D): Modify the opinion in the auditor’s report in accordance with SA 705 as a result of the scope limitation. (ICAI does not choose between qualified and disclaimer; the lab’s assumption gives qualified.)' },
    { id: 'pyq-rubber', group: 'From ICAI papers', title: 'Rubber Industries Ltd: debtors nobody will confirm', src: 'PYQ Jan 2025, Paper 5, Q3(c)', practice: false,
      entity: 'Rubber Industries Ltd', auditor: 'Singh & Associates', ask: 'opinion',
      facts: 'Debtors of Rubber Industries Limited are sixty percent of its total assets and do not pay invoice-wise. Singh & Associates asked management for external confirmations of all debtors above ₹1.00 lakh. Management resisted and no confirmations were made available; withdrawing from the audit is not possible. (ICAI’s question states that the firm has decided to disclaim and asks how the report changes.)',
      f: F({ nature: 'scope', imposed: true, removed: false, altok: false, material: true, pervasive: true, withdraw: false }),
      why: { nature: 'Management **resists** the confirmations the auditor needs: a limitation imposed by management after acceptance.', removed: 'Management does not provide the confirmations, so the limitation stays.', altok: 'No confirmations were made available and no other evidence is mentioned.', pervasive: 'Debtors are **sixty percent of total assets**, a substantial proportion of the financial statements: the possible effects are **pervasive**.' },
      icai: 'Amend the heading “Basis for Opinion” to “Basis for Disclaimer of Opinion” and describe the matter; omit (i) the reference to the section describing the auditor’s responsibilities and (ii) the statement that the evidence obtained is sufficient and appropriate.' },
    { id: 'pyq-op', group: 'From ICAI papers', title: 'OP Ltd: the uncertainty left out of the notes', src: 'PYQ Jan 2026, Paper 5, Q11 (MCQ)', practice: false,
      entity: 'OP Ltd', auditor: 'Mr. Paras', ask: 'opinion',
      facts: 'During the audit of OP Ltd., Mr. Paras concludes that the financial statements do not provide adequate disclosure of a material uncertainty related to going concern. (The lab assumes the effect is not pervasive.)',
      f: F({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: false, pervasive: false }),
      icai: 'Answer key (B): The auditor shall express a qualified opinion or adverse opinion, as appropriate, in accordance with SA 705. (Turn on “pervasive” in Your own facts to see the adverse branch.)' },
    { id: 'pyq-stu', group: 'From ICAI papers', title: 'STU Ltd: the fire after the year end', src: 'PYQ Jan 2026, Paper 5, Q3(a)',
      entity: 'STU Ltd', auditor: 'the auditor', ask: 'para',
      facts: 'The auditor of STU Ltd. concludes that the financial statements are true and fair and need no modification. The notes disclose that a major fire shortly after the year end had a significant effect on the entity’s financial position; the disclosure is complete and no adjustment is needed. The auditor believes users should be specifically alerted to this matter.',
      f: F({ nature: 'none', eom: true }),
      icai: 'There is a need to add an “Emphasis of Matter Paragraph (EOM)” in the auditor’s report as per SA 706 (Revised).' },
    { id: 'rtp-byn', group: 'From ICAI papers', title: 'BYN Ltd: a lost market, adequately disclosed', src: 'RTP Sep 2024, Paper 5, Q16',
      entity: 'BYN Ltd', auditor: 'CA Y', ask: 'para',
      facts: 'BYN Limited has lost a key market and important customers, and several highly successful competitors have emerged. A material uncertainty exists, but CA Y finds the going concern basis of accounting appropriate. The company has disclosed the material uncertainty adequately in the notes to accounts.',
      f: F({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: true }),
      icai: 'The auditor shall express an unmodified opinion and the auditor’s report shall include a separate section under the heading “Material Uncertainty Related to Going Concern”.' },
    { id: 'mtp-fan', group: 'From ICAI papers', title: 'FAN Pvt Ltd: no going concern assessment', src: 'MTP Jan 2026, Series I, Q15 (MCQ)', practice: false,
      entity: 'FAN Pvt Ltd', auditor: 'the auditor', ask: 'opinion',
      facts: 'FAN Pvt. Ltd. has defaulted on loan repayments and cannot pay creditors on time. Management refuses to make any assessment of its going concern status, so the auditor cannot obtain sufficient appropriate audit evidence about management’s use of the going concern basis. (The lab assumes the possible effects are pervasive.)',
      f: F({ nature: 'gc', gcBasis: 'unwilling', pervasive: true }),
      icai: 'Answer key (b): Issue a disclaimer or qualified opinion. (Turn off “pervasive” in Your own facts for the qualified branch.)' },
    { id: 'pyq-sun', group: 'From ICAI papers', title: 'SUN Ltd: last year’s figures, someone else’s audit', src: 'PYQ May 2026, Paper 5, Q6(b)',
      entity: 'SUN Ltd', auditor: 'the auditor', ask: 'para',
      facts: 'The financial statements of SUN Ltd. for the year ended 31 March 2026 include corresponding figures for 2024-25, which were audited by a predecessor auditor. Law and regulation permit the current auditor to refer to the predecessor auditor’s report, and the auditor decides to do so. The current year’s opinion is unmodified.',
      f: F({ nature: 'none', om: true }),
      icai: 'The auditor shall include an “Other Matter paragraph”, stating that the prior period was audited by the predecessor auditor, the type of opinion expressed (with reasons if modified) and the date of that report (SA 710).' },
    /* the PassBook cast */
    { id: 'tapri-premix', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri: the expired premix', src: 'PassBook case',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'opinion',
      facts: 'Bunty finds 40,000 cartons of expired chai premix at Tapri’s Dewas warehouse, carried at cost of ₹38 lakh although they can only be sold as cattle feed for ₹2 lakh. Kesar refuses to write them down (“Sab adjust ho jayega”). Iyer & Associates set materiality at ₹15 lakh. Inventory is 9% of total assets; nothing else is affected.',
      f: F({ nature: 'mis', material: true, pervasive: false }),
      why: { material: 'Inventory is overstated by ₹36 lakh (₹38 lakh cost less ₹2 lakh realisable value), more than twice the ₹15 lakh materiality: **material**.', pervasive: 'Only inventory (9% of total assets) and the profit figure through it are affected: confined to specific items, **not pervasive**.' },
      icai: '' },
    { id: 'tapri-repairs', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri: repairs in the machinery account', src: 'PassBook case (the ₹5 lakh repair is the Study Material’s own example of a misstatement, Ch 7 §3.3)',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'opinion',
      facts: 'Tapri has capitalised ₹5 lakh of repairs to the samosa fryers as plant and machinery, overstating profit. Kesar will not correct it before the deadline. Iyer & Associates set overall materiality at ₹20 lakh, and this is the only uncorrected misstatement. All the evidence Ms. Iyer asked for has been obtained.',
      f: F({ nature: 'mis', material: false }),
      why: { material: 'The only uncorrected misstatement is ₹5 lakh against materiality of ₹20 lakh: individually and in aggregate it is **not material**.' },
      icai: '' },
    { id: 'tapri-giftcards', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri: gift cards booked as sales', src: 'PassBook case',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'opinion',
      facts: 'In all 40 cities, Tapri’s kulhad cafés book festival gift cards as revenue the day they are sold, though most are redeemed next year. Correcting it removes ₹8 crore of revenue, turns the reported profit of ₹6 crore into a loss of ₹2 crore, and changes liabilities, tax and earnings per share. Kesar will not restate.',
      f: F({ nature: 'mis', material: true, pervasive: true }),
      why: { material: 'Revenue is overstated by ₹8 crore and the profit is really a loss: **material** on any measure.', pervasive: 'It is not confined to one account: revenue, liabilities, tax and EPS all change, and the profit becomes a loss. The effect is **pervasive**.' },
      icai: '' },
    { id: 'tapri-flood', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri: the flooded stores at the samosa factory', src: 'PassBook case',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'opinion',
      facts: 'A flood on 2 April destroyed the stores records and most of the raw material at Tapri’s samosa factory, before Iyer & Associates could attend the count. The stores were ₹2.4 crore at the year end, 6% of total assets, against materiality of ₹50 lakh. No count, roll-back or other alternative procedure is possible now. Every other area is fully evidenced.',
      f: F({ nature: 'scope', material: true, pervasive: false }),
      why: { nature: 'Nobody knows whether the ₹2.4 crore was right: the auditor **could not obtain** evidence. The flood, not management, caused it.', altok: 'With the goods and the records gone, no alternative procedure is possible.', material: '₹2.4 crore is well above the ₹50 lakh materiality: the possible effects **could be material**.', pervasive: 'Only the stores balance (6% of total assets) is in doubt: **not pervasive**.' },
      icai: '' },
    { id: 'tapri-kesar', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri: “No confirmations this year”', src: 'PassBook case',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'opinion',
      facts: 'Halfway through the audit, Kesar forbids Iyer & Associates from sending confirmations to banks, distributors and suppliers, and from seeing the cash books of the 40 cities. Ms. Iyer asks him in writing to lift the ban; he refuses. She informs the audit committee, but cash, receivables, payables and borrowings, most of the balance sheet, stay unverified. Tapri’s articles and the law do not let the firm resign before reporting.',
      f: F({ nature: 'scope', imposed: true, removed: false, altok: false, material: true, pervasive: true, withdraw: false }),
      why: { nature: 'The ban comes from **management, after the engagement was accepted**: a limitation imposed by management. Ms. Iyer first requests that it be removed.', removed: 'Kesar refuses in writing. Ms. Iyer informs the audit committee (those charged with governance) and looks for alternative procedures.', altok: 'Without confirmations or cash books there is no other evidence for cash, receivables, payables and borrowings.', pervasive: 'The unverified balances are **most of the balance sheet**: pervasive.' },
      icai: '' },
    { id: 'tapri-coldchain', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri Cold Chain: the lost contract, disclosed', src: 'PassBook case',
      entity: 'Tapri Cold Chain Pvt Ltd', auditor: 'Iyer & Associates', ask: 'para',
      facts: 'Tapri Cold Chain Pvt Ltd lost its biggest customer, and a term loan instalment is overdue. Its going concern basis is still appropriate: Dev has a funding plan with the parent company. A material uncertainty exists, and Note 34 discloses the events, the plan and the uncertainty clearly.',
      f: F({ nature: 'gc', gcBasis: 'appropriate', mu: true, disclosed: true }),
      icai: '' },
    { id: 'tapri-windup', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri Cold Chain: wound up, but not in the accounts', src: 'PassBook case',
      entity: 'Tapri Cold Chain Pvt Ltd', auditor: 'Iyer & Associates', ask: 'opinion',
      facts: 'Before the report date, Tapri’s board resolved to wind up its cold-chain subsidiary and sell the trucks. The subsidiary’s financial statements are still prepared on the going concern basis, with assets at book value.',
      f: F({ nature: 'gc', gcBasis: 'inappropriate' }),
      why: { gcBasis: 'Management intends to liquidate the subsidiary, so the going concern basis of accounting is **inappropriate**, yet the statements use it: SA 570 requires an **adverse opinion**.' },
      icai: '' },
    { id: 'tapri-brewbucks', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri: BrewBucks goes to court', src: 'PassBook case',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'para',
      facts: 'BrewBucks has sued Tapri for ₹40 crore over the “Tapri Brew” name. The outcome of this exceptional litigation is uncertain, and Note 41 describes it fully and correctly. Tapri is not listed. Ms. Iyer thinks the case is fundamental to users’ understanding of the financial statements; otherwise the audit is clean.',
      f: F({ nature: 'none', eom: true }),
      icai: '' },
    { id: 'tapri-branches', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri: twelve cafés audited by others', src: 'PassBook case (the Other Matter wording follows the Study Material’s illustrative report, Ch 8)',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'para',
      facts: 'The returns of 12 kulhad-café branches were audited by branch auditors, whose reports have been furnished to Iyer & Associates. Ms. Iyer’s opinion, so far as it relates to those branches, rests on their reports, and she wants users to know it. The audit is otherwise clean.',
      f: F({ nature: 'none', om: true }),
      icai: '' },
    { id: 'tapri-app', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri (listed): the delivery app’s goodwill', src: 'PassBook case',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'para',
      facts: 'Assume Tapri’s shares are listed. Its ₹90 crore goodwill on the delivery app rests on Dev’s growth forecasts, with high estimation uncertainty. Iyer & Associates spent the most effort of the audit on it and discussed it at length with the audit committee. They are satisfied the figure is fairly stated and the opinion is unmodified.',
      f: F({ nature: 'none', listed: true, kam: true }),
      icai: '' },
    { id: 'tapri-firekam', group: 'Tapri Tea Co. Ltd (PassBook cast)', title: 'Tapri (listed): the fire that took the most audit effort', src: 'PassBook case',
      entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'para',
      facts: 'Assume Tapri’s shares are listed. A fire destroyed part of the premix plant, and Note 38 discloses it fully. Valuing the insurance claim and the damaged machines took the most audit effort and was discussed with the audit committee; Ms. Iyer determines it was of most significance in the audit. The opinion is unmodified.',
      f: F({ nature: 'none', listed: true, eom: true, eomKam: true }),
      icai: '' }
  ];
  const CASE_BY = Object.fromEntries(CASES.map(c => [c.id, c]));

  /* a generated practice case: one Tapri balance, a materiality, and how far the problem spreads (seeded, so it reproduces) */
  const rngOf = seed => { let a = (seed >>> 0) || 1; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const ITEMS = [
    { item: 'inventory', verb: 'is', misPart: 'part of the closing inventory is expired chai premix carried at cost instead of net realisable value, an overstatement of',
      misAll: 'the whole closing inventory is expired chai premix that cannot be sold, yet it is carried at cost of', scopePart: 'the inventory at the Dewas warehouse (one of five) could not be counted or verified; it stands at',
      scopeAll: 'none of the closing inventory could be counted or verified; it stands at', many: 'cash, receivables and revenue' },
    { item: 'trade receivables', verb: 'are', misPart: 'no allowance has been made for one distributor that has gone into insolvency, overstating receivables by',
      misAll: 'every distributor owing money has gone into insolvency, yet trade receivables are carried in full at', scopePart: 'two large distributors did not reply to confirmations and no alternative evidence exists for their balances of',
      scopeAll: 'no distributor replied to confirmations and no alternative evidence exists for trade receivables of', many: 'inventory, cash and revenue' },
    { item: 'plant and machinery', verb: 'are', misPart: 'depreciation on the new samosa line has not been charged, overstating plant and machinery by',
      misAll: 'the whole samosa plant was scrapped in March, yet plant and machinery are still carried at', scopePart: 'the asset register of one packing unit was lost in a server crash, leaving unverified plant and machinery of',
      scopeAll: 'the fixed asset register of every unit was lost in a server crash, leaving unverified plant and machinery of', many: 'inventory, receivables and payables' },
    { item: 'investments', verb: 'are', misPart: 'mutual fund units are carried at cost although their value has fallen, overstating investments by',
      misAll: 'every mutual fund scheme Tapri holds has collapsed to nil, yet investments are carried at cost of', scopePart: 'the custodian has not confirmed one block of mutual fund units and no statement is available for',
      scopeAll: 'the custodian has confirmed none of the mutual fund units and no statement is available for investments of', many: 'cash, receivables and other income' }
  ];
  const capFirst = s => s[0].toUpperCase() + s.slice(1);
  function genCase(seed) {
    const r = rngOf(seed), pick = a => a[Math.floor(r() * a.length)];
    const it = pick(ITEMS), kind = r() < 0.5 ? 'mis' : 'scope';
    const ta = 100 * (20 + Math.floor(r() * 41));                                         // total assets ₹2,000–6,000 lakh
    const mat = 5 * Math.round((ta * (0.005 + 0.005 * r())) / 5);                           // materiality about 0.5–1% of total assets
    const roll = r(), spread = roll < 0.3 ? 'small' : roll < 0.65 ? 'one' : roll < 0.85 ? 'subst' : 'many';
    const amt = spread === 'small' ? Math.max(1, Math.round(mat * (0.2 + 0.5 * r()))) : spread === 'subst' ? 5 * Math.round((ta * (0.55 + 0.25 * r())) / 5) : Math.round(mat * (1.5 + 2.5 * r()));
    const pct = Math.round((100 * amt) / ta);
    const phrase = spread === 'subst' ? it[kind + 'All'] : it[kind + 'Part'];
    const where = spread === 'subst' ? `That is about ${pct}% of total assets.`
      : spread === 'many' ? (kind === 'mis' ? `Ms. Iyer finds similar uncorrected errors in ${it.many}; together they turn the reported profit into a loss.` : `The same gap in evidence covers ${it.many} as well: most of the financial statements.`)
        : 'Nothing else is affected.';
    const extra = kind === 'scope' ? ' No alternative procedure is possible, and management is not the cause.' : ' Kesar will not correct it.';
    const facts = `Tapri Tea Co. Ltd’s total assets are ₹${ta.toLocaleString('en-IN')} lakh and Iyer & Associates set materiality at ₹${mat} lakh. Bunty reports that ${phrase} ₹${amt.toLocaleString('en-IN')} lakh.${extra} ${where}`;
    const material = amt >= mat, pervasive = material && (spread === 'subst' || spread === 'many');
    const f = F({ nature: kind, material, pervasive });
    const per = pervasive ? (spread === 'subst' ? `It is about ${pct}% of total assets, a substantial proportion of the financial statements: **pervasive**.`
      : kind === 'mis' ? 'The errors are not confined to one account and together turn the profit into a loss: **pervasive**.' : 'The gap covers most of the financial statements: **pervasive**.')
      : `Only ${it.item} ${it.verb} affected and the amount is about ${pct}% of total assets, not a substantial proportion: **not pervasive**.`;
    const why = kind === 'mis'
      ? { material: material ? `₹${amt} lakh is above the ₹${mat} lakh materiality: **material**.` : `₹${amt} lakh is below the ₹${mat} lakh materiality and nothing else is uncorrected: **not material**.`, pervasive: per }
      : { nature: `The auditor **could not obtain** evidence for ${it.item}; nobody knows whether the figure is wrong.`, altok: 'No alternative procedure is possible.',
        material: material ? `The unverified ₹${amt} lakh is above the ₹${mat} lakh materiality: the possible effects **could be material**.` : `Even if the ₹${amt} lakh were wrong, it is below the ₹${mat} lakh materiality: **not material**.`, pervasive: per };
    return { id: 'gen', group: 'Practice', title: `Tapri practice case #${seed}`, src: 'Generated practice case', entity: 'Tapri Tea Co. Ltd', auditor: 'Iyer & Associates', ask: 'opinion', facts, f, why, icai: '', spread, amt, mat, ta };
  }
  function caseOf(v) {
    if (v.case === 'gen') return genCase(Math.max(1, Math.round(+v.seed || 1)));
    const c = CASE_BY[v.case];
    if (!c) throw new Error('Pick a case card from the list.');
    return c;
  }

  /* ---------------------------------------------------------------- drawing */
  const OUT_COLOR = { unmodified: 'ok', qualified: 'warn', adverse: 'bad', disclaimer: 'bad', wd: 'bad' };
  /** the tree spec with path[0..upto] lit: path nodes and the edges into them in the accent, the reached leaf in its outcome colour */
  function treeSpec(key, path, upto, title) {
    const on = new Set(path.slice(0, upto + 1)), last = path[upto];
    const walk = (n, edge) => {
      const o = { label: n.label };
      if (edge) o.edge = edge;
      if (on.has(n.id)) {
        o.color = n.out && n.id === last ? OUT_COLOR[n.out] : 'a';
        if (edge != null && n.id !== path[0]) o.edgeColor = 'a';
      }
      if (n.kids) o.children = n.kids.map(([e, k]) => walk(k, e));
      return o;
    };
    return { type: 'tree', title, alt: 'Decision tree: ' + title + '; the path taken is coloured', root: walk(TREES[key], null) };
  }
  const matrixSpec = row => ({ type: 'table', title: 'SA 705: nature of the matter × pervasiveness', head: ['Nature of the matter', 'Material but not pervasive', 'Material and pervasive'],
    rows: [['Financial statements are materially misstated', 'Qualified opinion', 'Adverse opinion'], ['Inability to obtain sufficient appropriate audit evidence', 'Qualified opinion', 'Disclaimer of opinion']],
    rowLabels: true, cells: row == null ? {} : { [row.r + ',' + row.c]: 'hl', [row.r + ',0']: 'hl' } });
  const card = (c, own) => ({ html: `<div class="ex ao-card"><div class="ex-h"><span class="ex-tag">${own ? 'Your facts' : 'Case'}</span><b>${esc(c.title)}</b></div><div class="ex-b"><p>${esc(c.facts)}</p>${c.src && !own ? `<p><small>${esc(c.src)}</small></p>` : ''}</div></div>` });

  function ownFacts(v) {
    const f = F({});
    FACT_KEYS.forEach(k => { if (v[k] !== undefined) f[k] = v[k]; });
    const yes = (b, t, n) => (b ? t : n);
    const bits = [NATURE[f.nature] + '.'];
    if (f.nature === 'mis') bits.push(yes(f.material, 'Material', 'Not material') + (f.material ? yes(f.pervasive, ' and pervasive.', ', not pervasive.') : '.'));
    if (f.nature === 'scope') {
      if (f.imposed) bits.push('Imposed by management after acceptance; ' + yes(f.removed, 'removed when requested.', 'not removed.'));
      if (!(f.imposed && f.removed)) bits.push(yes(f.altok, 'Alternative procedures work.', 'Alternative procedures fail.'));
      if (!(f.imposed && f.removed) && !f.altok) bits.push((f.imposed ? 'Possible effects material' : yes(f.material, 'Possible effects material', 'Possible effects not material')) + ((f.imposed || f.material) ? yes(f.pervasive, ' and pervasive.', ', not pervasive.') : '.'));
      if (f.imposed && !f.removed && !f.altok && f.pervasive) bits.push(yes(f.withdraw, 'Withdrawal is possible.', 'Withdrawal is not possible.'));
    }
    if (f.nature === 'gc') bits.push({ appropriate: 'Going concern basis appropriate.', inappropriate: 'Going concern basis inappropriate.', unwilling: 'Management will not assess going concern.' }[f.gcBasis] || '');
    if (f.nature === 'gc' && f.gcBasis === 'appropriate') bits.push(yes(f.mu, 'A material uncertainty exists, ' + yes(f.disclosed, 'adequately disclosed.', 'not adequately disclosed' + yes(f.pervasive, ' (pervasive).', ' (not pervasive).')), 'No material uncertainty.'));
    if (f.nature === 'gc' && f.gcBasis === 'unwilling') bits.push(yes(f.pervasive, 'Possible effects pervasive.', 'Possible effects not pervasive.'));
    if (f.nature === 'multi') bits.push(yes(f.formable, 'An opinion can still be formed.', 'No opinion can be formed.'));
    if (f.eom) bits.push('A disclosed matter is fundamental to users’ understanding' + yes(f.listed && f.eomKam, ' (and is a key audit matter).', '.'));
    if (f.om) bits.push('A matter outside the financial statements is relevant to users’ understanding of the audit.');
    bits.push(yes(f.listed, 'Listed entity' + yes(f.kam, '; matters of most significance exist.', '.'), 'Not listed.'));
    return { id: 'own', title: 'Your own facts', facts: bits.join(' '), src: '', entity: 'Tapri Tea Co. Ltd', auditor: 'the auditor', ask: 'opinion', f, why: null, icai: '' };
  }

  function compute(v) {
    const own = v.mode === 'own', C = own ? ownFacts(v) : caseOf(v);
    const R = decide(C.f, C.why);
    const key = R.tree, title = TREE_TITLE[key];
    const crd = card(C, own);
    const frames = [];
    const n = R.path.length;
    /* 1. walk the tree: one frame per node on the path */
    for (let i = 0; i < n; i++) {
      frames.push({ caption: (i === 0 ? '**Start.** ' : '') + R.says[i], view: [crd, treeSpec(key, R.path, i, title)] });
    }
    const tree = treeSpec(key, R.path, n - 1, title);
    /* 2. SA 705's table (when the matter reached it) */
    if (R.matrix != null && R.modified) {
      const c = R.opinion === 'qualified' ? 1 : 2;
      frames.push({ caption: `SA 705’s table in one look: the **nature** of the matter (row) and its **pervasiveness** (column) fix the opinion: **${OPINION_LONG[R.opinion]}**.` + (R.basis === 'gcdisc' ? ' (A going concern uncertainty that is not adequately disclosed is a misstatement: first row.)' : R.basis === 'gcno' ? ' (No going concern assessment from management means no evidence: second row.)' : ''),
        view: [crd, tree, matrixSpec({ r: R.matrix, c })] });
    }
    /* 3. what else the report carries: one row at a time */
    const add = additions(R), shown = [];
    const addSpec = k => ({ type: 'table', title: 'What else goes into the report', head: ['Report element', 'Standard', 'Included?', 'Why'],
      rows: add.map((a, i) => (i <= k ? [a[0], a[1], a[2][0] === 'yes' ? '✓ yes' : '✗ no', a[2][1]] : [a[0], a[1], '…', ''])),
      cells: Object.fromEntries(add.flatMap((a, i) => (i <= k ? [[i + ',2', a[2][0] === 'yes' ? 'ok' : 'mute']] : []))), align: ['left', 'left', 'left', 'left'] });
    add.forEach((a, i) => {
      shown.push(a);
      const cap = { 0: 'SA 570: does the report need a **Material Uncertainty Related to Going Concern** section?', 1: 'SA 706: an **Emphasis of Matter** paragraph?', 2: 'SA 701: **Key Audit Matters**?', 3: 'SA 706: an **Other Matter** paragraph?' }[i];
      frames.push({ caption: `${cap} **${a[2][0] === 'yes' ? 'Yes' : 'No'}.** ${a[2][1]}`, view: [crd, tree, addSpec(i)] });
    });
    /* 4. the report, section by section (two frames: the top, then the whole) */
    const rows = outline(R, C.entity);
    const repSpec = upto => ({ type: 'table', title: R.opinion === 'withdraw' ? 'Outcome' : 'The auditor’s report, section by section', head: ['Section', 'What it says'], rows: rows.slice(0, upto),
      cells: Object.fromEntries(rows.slice(0, upto).flatMap((r, i) => (/Opinion|Basis|Material Uncertainty|Emphasis|Key Audit|Other Matter|No auditor/.test(r[0]) || (R.opinion === 'disclaimer' && /Auditor’s Responsibilities/.test(r[0])) ? [[i + ',0', 'hl']] : []))), align: ['left', 'left'] });
    if (R.opinion !== 'withdraw') frames.push({ caption: `The report opens with the **${rows[2][0]}** section and the **${rows[3][0]}** section directly after it.` + (R.opinion === 'disclaimer' ? ' A disclaimer says the auditor “was engaged to audit” and does not express an opinion.' : ''), view: [crd, tree, repSpec(4)] });
    const tcwg = [];
    if (R.modified) tcwg.push('the circumstances that led to the expected modification and its wording (SA 705)');
    if (R.eom === 'yes' || R.om === 'yes') tcwg.push(`the expected ${[R.eom === 'yes' ? 'Emphasis of Matter' : '', R.om === 'yes' ? 'Other Matter' : ''].filter(Boolean).join(' and ')} paragraph and its wording (SA 706)`);
    if (R.kam === 'section' || R.kam === 'none') tcwg.push(R.kam === 'section' ? 'the key audit matters (SA 701)' : 'the determination that there are no key audit matters (SA 701)');
    frames.push({ caption: (R.opinion === 'withdraw' ? 'No report is issued: the auditor withdraws. ' : 'The whole report. ') + (tcwg.length ? `Before signing, the auditor communicates with those charged with governance: ${tcwg.join('; ')}.` : 'Nothing in it needs a special communication with those charged with governance.'),
      view: [crd, tree, repSpec(rows.length)] });

    const added = add.filter(a => a[2][0] === 'yes').map(a => ({ 'Material Uncertainty Related to Going Concern': 'MU section', 'Emphasis of Matter': 'EOM', 'Key Audit Matters': 'KAM', 'Other Matter': 'OM' }[a[0]]));
    const f = R.facts;
    const reachedP = R.path.includes('p'), reachedM = R.path.includes('m');
    const mat = reachedP ? 'Yes' : reachedM ? (f.material ? 'Yes' : 'No') : '—', per = reachedP ? (f.pervasive ? 'Yes' : 'No') : '—';
    const mp = mat === '—' && per === '—' ? '—' : `${mat} / ${per}`;
    const stats = [
      { label: 'Opinion', value: R.opinion === 'withdraw' ? 'Withdraw' : OPINION[R.opinion], hint: R.opinion === 'withdraw' ? 'SA 705 para 5.5' : R.modified ? 'SA 705' : 'SA 700' },
      { label: 'Nature of the matter', value: NATURE_SHORT[f.nature], hint: 'misstatement, or inability to obtain sufficient appropriate audit evidence' },
      { label: 'Material / pervasive', value: mp, hint: 'pervasive: not confined to specific items, or a substantial proportion, or fundamental disclosures' },
      { label: 'Added to the report', value: added.length ? added.join(', ') : 'nothing', hint: 'SA 570 MU section, SA 706 EOM / OM, SA 701 KAM' }
    ];
    const note = '**Conventions.** The path follows the ICAI Study Material (Paper 5, Ch 8 §5–7 and Ch 7 §2.11): SA 705 decides the opinion from the nature of the matter and its pervasiveness; SA 570 decides going concern reporting; SA 706 and SA 701 decide the extra paragraphs and sections. ' +
      'A limitation imposed by management is taken to be one that is likely to lead to a qualified opinion or a disclaimer (SA 705 para 5.5); not material, it would need no modification. ' +
      'Key Audit Matters apply to listed entities here (SA 701 also applies when the auditor decides, or law requires, to communicate them). ' +
      'The Emphasis of Matter paragraph is shown after the Basis for Opinion and Other Matter after the auditor’s responsibilities, as in the Study Material’s illustrative report; the exact place is the auditor’s judgement.' +
      (C.icai ? ` **ICAI’s answer (${C.src}).** ${C.icai}` : '');
    /* the results: the decision trail, one row per question answered, then the report additions */
    const plain = t => String(t).replace(/\*\*/g, '').replace(/\n/g, ' ');
    const byId = {}, edgeIn = {}; (function index(nd) { byId[nd.id] = nd; (nd.kids || []).forEach(k => { edgeIn[k[1].id] = k[0]; index(k[1]); }); })(TREES[key]);
    const trail = [];
    for (let i = 0; i < n - 1; i++) trail.push([plain(byId[R.path[i]].label), edgeIn[R.path[i + 1]] || '→', plain(R.says[i])]);
    trail.push(['Opinion', R.opinion === 'withdraw' ? 'withdraw' : OPINION[R.opinion], plain(R.says[n - 1])]);
    add.forEach(a => trail.push([`${a[0]} (${a[1]})`, a[2][0], plain(a[2][1])]));
    return { frames, stats, table: { head: ['Question', 'Answer', 'Why'], rows: trail }, note, sim: R, card: C, report: rows };
  }

  /* ---------------------------------------------------------------- definition */
  const caseOpts = CASES.map(c => [c.id, c.title, c.group])
    .concat([['gen', 'A random Tapri practice case', 'Practice']]);
  const shownOwn = v => v.mode === 'own';
  const def = {
    id: 'audit-opinion', title: 'Audit Opinion Lab',
    blurb: 'Step a case down SA 705’s tree to unmodified, qualified, adverse or disclaimer, then add the SA 706 and SA 701 items.',
    controls: [
      { id: 'mode', type: 'seg', label: 'Explore', value: 'case', options: [['case', 'Case cards'], ['own', 'Your own facts']] },
      { id: 'case', type: 'select', label: 'Case card', value: 'sm-loans', options: caseOpts, show: v => v.mode !== 'own' },
      { id: 'seed', type: 'number', label: 'Practice case number', value: 1, min: 1, max: 99999, show: v => v.mode !== 'own' && v.case === 'gen' },
      { id: 'nature', type: 'select', label: 'What the audit found', value: 'mis', options: Object.entries(NATURE), show: shownOwn },
      { id: 'imposed', type: 'toggle', label: 'Limitation imposed by management after acceptance', short: 'Imposed by management', value: false, show: v => shownOwn(v) && v.nature === 'scope' },
      { id: 'removed', type: 'toggle', label: 'Management removes the limitation when asked', short: 'Limitation removed', value: false, show: v => shownOwn(v) && v.nature === 'scope' && v.imposed },
      { id: 'altok', type: 'toggle', label: 'Alternative procedures give sufficient appropriate evidence', short: 'Alternative procedures work', value: false, show: v => shownOwn(v) && v.nature === 'scope' && !(v.imposed && v.removed) },
      { id: 'gcBasis', type: 'select', label: 'Going concern basis of accounting', value: 'appropriate', options: [['appropriate', 'Appropriate'], ['inappropriate', 'Inappropriate (but used)'], ['unwilling', 'Not assessed: management refuses']], show: v => shownOwn(v) && v.nature === 'gc' },
      { id: 'mu', type: 'toggle', label: 'A material uncertainty exists', value: true, show: v => shownOwn(v) && v.nature === 'gc' && v.gcBasis === 'appropriate' },
      { id: 'disclosed', type: 'toggle', label: 'The uncertainty is adequately disclosed', short: 'Adequately disclosed', value: true, show: v => shownOwn(v) && v.nature === 'gc' && v.gcBasis === 'appropriate' && v.mu },
      { id: 'formable', type: 'toggle', label: 'An opinion can still be formed despite their interaction', short: 'Opinion can be formed', value: false, show: v => shownOwn(v) && v.nature === 'multi' },
      { id: 'material', type: 'toggle', label: 'The effect (or possible effect) is material', short: 'Material', value: true, show: v => shownOwn(v) && (v.nature === 'mis' || (v.nature === 'scope' && !v.imposed && !v.altok)) },
      { id: 'pervasive', type: 'toggle', label: 'The effect (or possible effect) is pervasive', short: 'Pervasive', value: false,
        show: v => shownOwn(v) && ((v.nature === 'mis' && v.material) || (v.nature === 'scope' && !v.altok && (v.imposed ? !v.removed : v.material)) || (v.nature === 'gc' && (v.gcBasis === 'unwilling' || (v.gcBasis === 'appropriate' && v.mu && !v.disclosed)))) },
      { id: 'withdraw', type: 'toggle', label: 'Withdrawal is practicable and possible under law', short: 'Withdrawal possible', value: false, show: v => shownOwn(v) && v.nature === 'scope' && v.imposed && !v.removed && !v.altok && v.pervasive },
      { id: 'eom', type: 'toggle', label: 'A matter disclosed in the financial statements is fundamental to users’ understanding', short: 'Fundamental disclosed matter', value: false, show: shownOwn },
      { id: 'om', type: 'toggle', label: 'A matter not in the financial statements is relevant to users’ understanding of the audit', short: 'Matter outside the statements', value: false, show: shownOwn },
      { id: 'listed', type: 'toggle', label: 'Listed entity (SA 701 applies)', short: 'Listed', value: false, show: shownOwn },
      { id: 'kam', type: 'toggle', label: 'Some matters required significant auditor attention and were of most significance', short: 'Matters of most significance', value: false, show: v => shownOwn(v) && v.listed },
      { id: 'eomKam', type: 'toggle', label: 'The fundamental disclosed matter is itself a key audit matter', short: 'That matter is a KAM', value: false, show: v => shownOwn(v) && v.listed && v.eom }
    ],
    presets: [
      { label: 'Study Material Illustration 9: Super Duper Ltd’s loans', values: { mode: 'case', case: 'sm-loans' } },
      { label: 'Study Material Illustration 10: Polex Ltd', values: { mode: 'case', case: 'sm-polex' } },
      { label: 'Study Material Illustration 11: Delightful Ltd’s SAP switch', values: { mode: 'case', case: 'sm-sap' } },
      { label: 'PYQ Sep 2024 Q12: unreliable written representations', values: { mode: 'case', case: 'pyq-wrep' } },
      { label: 'PYQ Sep 2024 Q11: Mega Power Ltd’s going concern', values: { mode: 'case', case: 'pyq-megapower' } },
      { label: 'PYQ Jan 2025 Q3(c): debtors nobody will confirm', values: { mode: 'case', case: 'pyq-rubber' } },
      { label: 'PYQ Jan 2026 Q3(a): a fire after the year end', values: { mode: 'case', case: 'pyq-stu' } },
      { label: 'RTP May 2024 Q19: non-cooperation, withdrawal possible', values: { mode: 'own', nature: 'scope', imposed: true, removed: false, altok: false, pervasive: true, withdraw: true, eom: false, om: false, listed: false } },
      { label: 'Tapri: the expired premix', values: { mode: 'case', case: 'tapri-premix' } },
      { label: 'Tapri: “No confirmations this year”', values: { mode: 'case', case: 'tapri-kesar' } },
      { label: 'Tapri (listed): the fire that took the most audit effort', values: { mode: 'case', case: 'tapri-firekam' } }
    ],
    compute,
    challenge: {
      title: 'Which opinion? Which paragraph?',
      gen(r) {
        const pool = CASES.filter(c => c.practice !== false), x = r();
        if (x < 0.45) return { mode: 'case', case: 'gen', seed: 1 + Math.floor(r() * 99999) };
        return { mode: 'case', case: pool[Math.min(pool.length - 1, Math.floor(((x - 0.45) / 0.55) * pool.length))].id };
      },
      prompt(v, res) {
        const C = res.card;
        return C.ask === 'para'
          ? `Read the case card. Besides the opinion, what must ${C.auditor} add to the report for this matter: an **Emphasis of Matter** paragraph (EOM), an **Other Matter** paragraph (OM), a **Key Audit Matter** (KAM), or a **Material Uncertainty Related to Going Concern** section (MURGC)?`
          : `Read the case card. Which opinion should ${C.auditor} express: **unmodified**, **qualified**, **adverse**, or a **disclaimer** of opinion?`;
      },
      kind: 'choice',
      choices: (v, res) => (res.card.ask === 'para' ? [['EOM', 'Emphasis of Matter'], ['OM', 'Other Matter'], ['KAM', 'Key Audit Matter'], ['MURGC', 'Material uncertainty (going concern)']]
        : [['Unmodified', 'Unmodified'], ['Qualified', 'Qualified'], ['Adverse', 'Adverse'], ['Disclaimer', 'Disclaimer']]),
      solve(res) {
        const R = res.sim;
        if (res.card.ask === 'para') return R.murgc ? 'MURGC' : R.kam === 'section' && (R.eom === 'kam' || R.facts.kam) ? 'KAM' : R.eom === 'yes' ? 'EOM' : R.om === 'yes' ? 'OM' : null;
        return OPINION[R.opinion] === 'Withdraw' ? null : OPINION[R.opinion];
      },
      view: (res) => [card(res.card, false)],
      explain(res) {
        const R = res.sim;
        const path = R.says.slice(0, -1).map(s => s.replace(/\*\*/g, '')).join(' ');
        return res.card.ask === 'para'
          ? `${R.murgc ? 'SA 570: going concern basis appropriate, material uncertainty adequately disclosed: unmodified opinion with a separate “Material Uncertainty Related to Going Concern” section.' : R.kam === 'section' && R.eom === 'kam' ? 'The disclosed matter was of most significance in the audit, so it is a key audit matter, and SA 706 allows an Emphasis of Matter only for a matter that is not a KAM.' : R.kam === 'section' ? 'SA 701: a listed entity, and the matter required significant auditor attention and was of most significance: a Key Audit Matter.' : R.eom === 'yes' ? 'SA 706: the matter is appropriately disclosed in the financial statements and fundamental to users’ understanding, and the opinion is not modified because of it: an Emphasis of Matter paragraph.' : 'SA 706: the matter is not in the financial statements but is relevant to users’ understanding of the audit: an Other Matter paragraph.'}`
          : `${path} So: **${OPINION_LONG[R.opinion]}**.`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { decide, outline, additions, caseOf, genCase, CASES, TREES, compute, def };
  g.__lab_def_audit_opinion = def;
})(typeof window !== 'undefined' ? window : globalThis);
