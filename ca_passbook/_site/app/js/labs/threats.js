/* PassBook — Independence Threats Lab (Paper 5, aud.ethics). A deck of scenario cards is sorted one card per frame: in "threats" mode
   into the five threats to independence (self-interest, self-review, advocacy, familiarity, intimidation) with the safeguard for each,
   in "principles" mode into the five fundamental principles (integrity, objectivity, professional competence and due care,
   confidentiality, professional behaviour). The clue words of each card are marked, and the caption says why.
   Source: ICAI Study Material, Paper 5, Ch 11 §4 (principles), §6 (threats, with the Study Material's own examples), §7 (safeguards),
   §17B and §18B (SQC 1 / SA 220: eliminate, safeguard or withdraw), Test Your Understanding 1–5 and the Case Study; and ICAI papers.
   Node-testable: require('app/js/labs/threats.js') exposes {sortDeck, CARDS, DECKS, THREATS, PRINCIPLES, SAFEGUARDS, compute, def}. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* the five threats and the five principles, in the Study Material's order and words */
  const THREATS = [
    ['self-interest', 'Self-interest', 'the firm, a partner or an associate could benefit from a financial interest in the client'],
    ['self-review', 'Self-review', 'the auditor reviews a judgement or work of a previous engagement, or a team member was recently a director or senior employee of the client'],
    ['advocacy', 'Advocacy', 'the auditor promotes, or is seen to promote, the client’s position'],
    ['familiarity', 'Familiarity', 'a close relationship makes the auditor too sympathetic to the client'],
    ['intimidation', 'Intimidation', 'pressure (threat of replacement, of litigation, of a fee squeeze) deters the auditor from acting objectively']
  ];
  const PRINCIPLES = [
    ['integrity', 'Integrity', 'straightforward and honest; never knowingly associated with false or misleading information'],
    ['objectivity', 'Objectivity', 'no compromise of professional judgement because of bias, conflict of interest or undue influence'],
    ['pcdc', 'Professional competence and due care', 'keep knowledge and skill current; act diligently, carefully, thoroughly and on time'],
    ['confidentiality', 'Confidentiality', 'respect information acquired in professional relationships; disclose only when law requires or permits, or a professional duty or right exists'],
    ['behaviour', 'Professional behaviour', 'comply with laws and regulations; avoid conduct that discredits the profession']
  ];
  const NAME = Object.fromEntries(THREATS.concat(PRINCIPLES).map(t => [t[0], t[1]]));

  /* safeguards: the Study Material's responses (§7: desist, eliminate the threat, or apply safeguards that reduce it to an acceptable level,
     recorded; otherwise do not accept), made specific the way its answers make them. for: the threats a safeguard answers (a challenge
     never offers a safeguard as a wrong option for a card it could answer); remove and consult answer any threat, so they are never wrong */
  const SAFEGUARDS = {
    'sg-elim': { label: 'Eliminate the interest first', for: ['self-interest'], text: 'Eliminate the threat: give up the interest or relationship (sell the shares, repay or refuse the loan, end the business tie, refuse the contingent fee) before acting; otherwise do not accept the work.' },
    'sg-fees': { label: 'Safeguards, recorded; tell TCWG the fees', for: ['self-interest'], text: 'Apply safeguards that reduce the threat to an acceptable level and record them; for a listed entity tell those charged with governance the total fees and the safeguards applied (SA 260); if no safeguard is adequate, do not accept or continue.' },
    'sg-stop': { label: 'Drop the non-audit service', for: ['self-review'], text: 'Do not provide (or stop) the service whose results the audit would review; otherwise do not accept the audit.' },
    'sg-remove': { label: 'Take that person off the team', for: ['self-interest', 'self-review', 'advocacy', 'familiarity', 'intimidation'], text: 'Remove the person from the engagement team, so someone without the interest or relationship does the work.' },
    'sg-desist': { label: 'Decline the role', for: ['advocacy'], text: 'Desist from the task: decline the role that promotes the client (the marketing tie-up, the arbitration, the brief in the dispute, the dealing in its shares).' },
    'sg-rotate': { label: 'Rotate the auditor', for: ['familiarity'], text: 'Rotate the auditor after the permitted period: the Companies Act, 2013 rotation provisions mainly address familiarity threats.' },
    'sg-decline': { label: 'Refuse the gifts and hospitality', for: ['familiarity'], text: 'Eliminate the threat: refuse significant gifts and hospitality from the client.' },
    'sg-consult': { label: 'Document, consult the firm, tell TCWG', for: ['self-interest', 'self-review', 'advocacy', 'familiarity', 'intimidation'], text: 'Do not give in: document the matter, report it within the firm (the engagement partner reports to the relevant persons in the firm, SA 220) and communicate with those charged with governance; withdraw from the engagement if it cannot be resolved and law permits.' }
  };
  const GENERAL = 'When threats exist, the auditor should either **desist** from the task, or **eliminate** the threat, or at the very least put in place **safeguards** that reduce the threats to an acceptable level, and **record** them. If credible and adequate safeguards cannot be implemented, the auditor **must not accept** the work (Study Material Ch 11 §7; SQC 1 and SA 220 add: or withdraw).';

  /* ---------------------------------------------------------------- the cards. a: the answer; why: the reason in the Study Material's
     words; sg: the safeguard (threats); clue: phrases marked on the card; src: where the scenario and its answer come from */
  const T = (id, deck, title, text, a, clue, why, sg, src, more) => Object.assign({ id, kind: 'threats', deck, title, text, a, clue, why, sg, src }, more || {});
  const P = (id, deck, title, text, a, clue, why, src) => ({ id, kind: 'principles', deck, title, text, a, clue, why, src });
  const SMT = 'ICAI Study Material, Ch 11 §6 (its examples of ';
  const CARDS = [
    /* Study Material, set 1 */
    T('sm-shares', 'sm-a', 'Shares from an uncle', 'CA Raman Gupta is offered the audit of a company. Before he accepts, his distant uncle dies and Raman finds he is the nominee of the uncle’s shares in that company, of substantial value.', 'self-interest',
      ['nominee of the uncle’s shares', 'substantial value'], 'Holding shares is a **financial interest** in the client: the auditor could benefit from it.', 'sg-elim', 'ICAI Study Material, Ch 11, Test Your Understanding 3 (also RTP Jan 2025 Q20)',
      { sgText: 'Eliminate the threat by **selling the shares immediately, before accepting** the appointment; otherwise do not accept it (ICAI’s answer).' }),
    T('sm-fees40', 'sm-a', 'Forty percent from one client', 'A Chartered Accountant receives about 40% of his total audit fees from a single client.', 'self-interest',
      ['40% of his total audit fees', 'single client'], '**Undue dependence on a client’s fees** creates a fear of losing the client (ICAI’s answer: self-interest).', 'sg-fees', 'ICAI Study Material, Ch 11, Test Your Understanding 4'),
    T('sm-ngo', 'sm-a', 'The NGO’s books', 'CA Murli Madhavan keeps the accounts and books of a leading environmental NGO. He is now offered the audit of the NGO’s accounts.', 'self-review',
      ['keeps the accounts and books', 'offered the audit'], 'As auditor he would be **reviewing his own work** (ICAI’s answer: self-review).', 'sg-stop', 'ICAI Study Material, Ch 11, Test Your Understanding 5 (also RTP Sep 2024 Q6)'),
    T('sm-blitz', 'sm-a', 'The marketing blitz', 'A prospective client is launching a paid weather-forecasting service and asks its new audit firm, Das & Co., to be visibly associated with the marketing blitz.', 'advocacy',
      ['visibly associated', 'marketing blitz'], 'Being seen to back the client’s product means **promoting the client**: people may believe objectivity is compromised.', 'sg-desist', 'ICAI Study Material, Ch 11, Case Study Q2 (answer d)'),
    T('sm-director', 'sm-a', 'Last year’s director', 'A member of the audit team was a director of the client company until a few months ago.', 'self-review',
      ['was a director of the client'], 'Someone who was recently a **director or senior officer** of the client would review decisions taken on their own watch.', 'sg-remove', SMT + 'self-review threats)'),
    T('sm-years', 'sm-a', 'Many years together', 'The same audit partner and the client’s finance team have worked together on the audit for many years and have grown close.', 'familiarity',
      ['many years', 'grown close'], '**Long association** between specific auditors and their client counterparts makes the auditor too sympathetic.', 'sg-rotate', SMT + 'familiarity threats)'),
    T('sm-replace', 'sm-a', 'Agree, or be replaced', 'The client tells the auditor it will replace the firm if it keeps disagreeing about how an accounting principle is applied.', 'intimidation',
      ['replace the firm', 'disagreeing'], 'The **threat of replacement over a disagreement** on accounting principles is meant to deter the auditor from acting objectively.', 'sg-consult', SMT + 'intimidation threats)'),
    T('sm-gifts', 'sm-a', 'Generous hospitality', 'The audit team accepts significant gifts and hospitality from the client’s directors.', 'familiarity',
      ['significant gifts and hospitality'], 'Accepting **significant gifts or hospitality** from the client, its directors or employees is a familiarity threat in the Study Material.', 'sg-decline', SMT + 'familiarity threats)', { alsoOk: ['sg-rotate'] }),
    /* Study Material, set 2 */
    T('sm-loan', 'sm-b', 'A loan from the client', 'The engagement partner has taken a personal loan from the audit client.', 'self-interest',
      ['personal loan from the audit client'], 'A **loan or guarantee to or from the client** is a financial interest in the client.', 'sg-elim', SMT + 'self-interest threats)'),
    T('sm-contingent', 'sm-b', 'Paid only if…', 'The client offers to pay the audit fee only if the audit report is clean.', 'self-interest',
      ['only if the audit report is clean'], 'A **contingent fee** for the audit gives the firm a stake in the outcome.', 'sg-elim', SMT + 'self-interest threats)'),
    T('sm-job', 'sm-b', 'An offer from the client', 'An audit manager on the engagement is in talks to join the client as its finance head next year.', 'self-interest',
      ['in talks to join the client'], '**Potential employment with the client** gives the manager a personal interest in pleasing it.', 'sg-remove', SMT + 'self-interest threats)'),
    T('sm-venture', 'sm-b', 'Partners in business', 'The audit firm and the client run a joint venture that sells accounting software.', 'self-interest',
      ['joint venture'], 'A **close business relationship** with an audit client is a self-interest threat (PYQ Sep 2025 Q6(c): self-interest, not familiarity).', 'sg-elim', SMT + 'self-interest threats; also PYQ Sep 2025 Q6(c)(i))'),
    T('sm-it', 'sm-b', 'The IT contract', 'The client also offers its auditors a contract for IT services on the company’s information system.', 'self-review',
      ['IT services', 'information system'], 'The auditors would later rely on, and so **review, a system they built**: a self-review threat (ICAI: not advocacy).', 'sg-stop', 'ICAI Study Material, Ch 11, Case Study Q5 (answer a)'),
    T('sm-trade', 'sm-b', 'Trading the client’s shares', 'The auditor actively buys and sells the shares of the company he audits.', 'advocacy',
      ['buys and sells the shares'], 'The Study Material lists **dealing in the shares or securities** of the audited company under advocacy: the auditor can be seen as backing the client.', 'sg-desist', SMT + 'advocacy threats; also PYQ Sep 2025 Q6(c)(iii))', { alsoOk: ['sg-elim'] }),
    T('sm-court', 'sm-b', 'In court for the client', 'The auditor agrees to represent the client in its dispute with a third party.', 'advocacy',
      ['represent the client', 'dispute'], 'Becoming the **client’s advocate in litigation and third-party disputes** means championing its cause.', 'sg-desist', SMT + 'advocacy threats)'),
    T('sm-relative', 'sm-b', 'A relative upstairs', 'An audit team member’s brother is the client’s chief financial officer.', 'familiarity',
      ['brother', 'chief financial officer'], 'A **close relative of the audit team in a senior position** at the client makes the team too sympathetic.', 'sg-remove', SMT + 'familiarity threats)'),
    T('sm-squeeze', 'sm-b', 'Less fee, less work', 'The client cuts the audit fee and presses the firm to cut its audit work far more than the fee cut would justify.', 'intimidation',
      ['presses the firm to cut its audit work'], '**Pressure to disproportionately reduce work** in response to reduced fees deters the auditor from acting objectively.', 'sg-consult', SMT + 'intimidation threats)'),
    T('sm-sue', 'sm-b', 'A lawyer’s letter', 'The client threatens to sue the auditor if a qualified report is issued.', 'intimidation',
      ['threatens to sue'], '**Being threatened with litigation** is an intimidation threat.', 'sg-consult', SMT + 'intimidation threats)'),
    /* ICAI papers */
    T('pyq-take', 'icai', 'Audit plus other work', 'CA J, a partner of HK & Co., performed the statutory audit as well as a non-audit engagement for M/s Take Away Private Limited.', 'self-review',
      ['statutory audit as well as a non-audit engagement'], 'Non-audit work for an audit client puts the auditor in a position to **review it**.', 'sg-stop', 'PYQ Jan 2025, Paper 5, Q2(b)(i)'),
    T('pyq-happy', 'icai', 'An indirect interest', 'CA M, a partner of HK & Co., did the income-tax audit of M/s Happy Associates, in which CA M has a materially significant indirect financial interest.', 'self-interest',
      ['materially significant indirect financial interest'], 'A **materially significant indirect financial interest** in the client is a self-interest threat.', 'sg-elim', 'PYQ Jan 2025, Paper 5, Q2(b)(ii)'),
    T('pyq-chennai', 'icai', 'The family trip', 'The client stationed at Chennai bore the air travel and hotel stay of the audit team’s family members during the Chennai audit.', 'familiarity',
      ['family members', 'bore the air travel and hotel stay'], 'Hospitality from the client, even for the team’s families, makes the team sympathetic: ICAI classifies it as **familiarity**.', 'sg-decline', 'PYQ Jan 2025, Paper 5, Q2(b)(iii)', { alsoOk: ['sg-rotate'] }),
    T('pyq-chalk', 'icai', 'The expected credit loss row', 'M/s Chalk Limited threatened to replace HK & Co. as auditors because the audit team insisted on a provision for expected credit loss that the company did not want to make.', 'intimidation',
      ['threatened to replace'], 'A **threat of replacement** over an accounting disagreement.', 'sg-consult', 'PYQ Jan 2025, Paper 5, Q2(b)(iv)'),
    T('pyq-arbitrator', 'icai', 'The arbitrator', 'CA N, who audited M/s NM Private Limited, became arbitrator for a dispute between NM Private Limited and one of its vendors.', 'advocacy',
      ['became arbitrator'], 'Taking a role in the **client’s dispute** with a third party: ICAI classifies it as **advocacy**.', 'sg-desist', 'PYQ Jan 2025, Paper 5, Q2(b)(v)'),
    T('pyq-trf', 'icai', 'A fee that depends', 'CA N accepted the tax audit of TRF Industries; management agreed to pay him a contingent fee for it.', 'self-interest',
      ['contingent fee'], 'A **contingent fee** gives the auditor a stake in the result.', 'sg-elim', 'PYQ Jan 2025, Paper 5, Q2(b)(vi)'),
    T('pyq-ghb', 'icai', 'Certify without checking', 'CA B certifies the debtors of GHB Ltd. for the bank without checking them, as most of his professional income comes from GHB Ltd.', 'self-interest',
      ['most of his professional income'], '**Undue dependence on the client’s fees** (answer key: self-interest threat).', 'sg-fees', 'PYQ Sep 2024, Paper 5, Case Scenario 1, Q5 (key C)'),
    T('rtp-rao', 'icai', 'No more engagements', 'The CFO of ABC Ltd. tells CA Rao that if the firm reports certain deficiencies, it may not be considered for future engagements.', 'intimidation',
      ['may not be considered for future engagements'], 'The CFO uses the **threat of losing future work** to deter the auditor (answer key b).', 'sg-consult', 'RTP Jan 2025, Paper 5, Q7 (MCQ)'),
    T('rtp-ramesh', 'icai', 'Ten years with the CEO', 'CA Ramesh has audited XYZ Ltd. for 10 years and has a personal relationship with its CEO. He has accepted gifts from the company and feels uncomfortable reporting the discrepancies he finds.', 'familiarity',
      ['10 years', 'personal relationship', 'accepted gifts'], '**Long association** and a personal relationship make him too sympathetic (answer key b).', 'sg-rotate', 'RTP May 2025, Paper 5, Q7 (MCQ)', { alsoOk: ['sg-decline'] }),
    T('pyq-gift', 'icai', 'Gift and hospitality', 'During an assurance engagement, one team member accepted significant gifts and hospitality from the client.', 'familiarity',
      ['significant gifts and hospitality'], 'Significant gifts and hospitality: **familiarity** (answer key B).', 'sg-decline', 'PYQ Jan 2026, Paper 5, Case Scenario 2, Q9 (key B)', { alsoOk: ['sg-rotate'] }),
    T('pyq-loanteam', 'icai', 'A loan to a team member', 'On the same engagement, another team member had taken a loan from the client.', 'self-interest',
      ['taken a loan from the client'], 'A loan from the client: **self-interest** (answer key B).', 'sg-elim', 'PYQ Jan 2026, Paper 5, Case Scenario 2, Q9 (key B)'),
    T('mtp-bank', 'icai', 'The Executive Director’s warning', 'A bank’s Executive Director says that if the auditors keep questioning asset classification, the bank will recommend another firm next year, cut future fees and consider legal proceedings.', 'intimidation',
      ['recommend another firm', 'cut future fees', 'legal proceedings'], 'Replacement, a fee squeeze and litigation are all used as **pressure** (answer key D). The partner refused, documented the matter and consulted the firm’s Ethics Partner.', 'sg-consult', 'MTP Sep 2026, Paper 5, Series II, Q11 (key D)'),
    /* the PassBook cast: Iyer & Associates at Tapri Tea Co. Ltd */
    T('tp-dad', 'tapri', 'Bunty’s father’s portfolio', 'Bunty’s father holds a large block of Tapri Tea Co. Ltd shares, and Bunty is on the Tapri audit team.', 'self-interest',
      ['holds a large block of Tapri'], 'A close family member’s **financial interest** in the client gives Bunty a stake in Tapri’s results.', 'sg-remove', 'PassBook case'),
    T('tp-far', 'tapri', 'The fixed asset register', 'Kesar asks Iyer & Associates to prepare Tapri’s fixed asset register and depreciation workings, which they will then audit.', 'self-review',
      ['prepare Tapri’s fixed asset register', 'then audit'], 'The firm would be **auditing figures it produced**.', 'sg-stop', 'PassBook case'),
    T('tp-tribunal', 'tapri', 'Before the trademark tribunal', 'Kesar wants Ms. Iyer to argue Tapri’s side before the trademark tribunal in the “Tapri Brew” case against BrewBucks.', 'advocacy',
      ['argue Tapri’s side'], 'Arguing the client’s case in a dispute is **championing its cause**.', 'sg-desist', 'PassBook case'),
    T('tp-eleven', 'tapri', 'Eleven years of chai', 'Ms. Iyer has led the Tapri audit for eleven years and spends Diwali with Kesar’s family.', 'familiarity',
      ['eleven years', 'Diwali with Kesar’s family'], '**Long association** and a close personal tie make the auditor too sympathetic.', 'sg-rotate', 'PassBook case'),
    T('tp-friday', 'tapri', 'Sign by Friday', 'Kesar: “Sign the clean report by Friday, or next year we appoint another firm.”', 'intimidation',
      ['or next year we appoint another firm'], 'A **threat of replacement** to force the opinion.', 'sg-consult', 'PassBook case'),
    T('tp-hamper', 'tapri', 'The Diwali hamper', 'Every member of the audit team receives a Diwali hamper from Tapri with a 10-gram gold coin inside.', 'familiarity',
      ['10-gram gold coin'], 'A **significant gift** from the client.', 'sg-decline', 'PassBook case', { alsoOk: ['sg-rotate'] }),
    T('tp-half', 'tapri', 'More than half the revenue', 'Tapri’s audit and tax fees are 55% of Iyer & Associates’ total revenue.', 'self-interest',
      ['55% of Iyer & Associates’ total revenue'], '**Undue dependence** on one client’s fees.', 'sg-fees', 'PassBook case'),
    T('tp-ritu', 'tapri', 'Ritu changes sides', 'Ritu Sharma, who prepared Tapri’s cost records last year as its cost accountant, joins Iyer & Associates and is put on this year’s Tapri audit team.', 'self-review',
      ['prepared Tapri’s cost records last year', 'this year’s Tapri audit team'], 'A team member who was recently a **senior employee** of the client would review her own work.', 'sg-remove', 'PassBook case'),

    /* fundamental principles: Study Material */
    P('sm-letter', 'sm-a', 'The unanswered letter', 'CA P. Suryakantam does not reply to a letter from ICAI about one of his audits, despite reminders.', 'behaviour',
      ['does not reply', 'despite reminders'], 'Failure to reply to the professional body smacks of lack of courtesy and professional responsibility: **professional behaviour** is disregarded.', 'ICAI Study Material, Ch 11, Test Your Understanding 1'),
    P('sm-cert', 'sm-a', 'Nine crore, not fifteen', 'To save a client some regulatory fees, a Chartered Accountant certifies the original cost of its plant and machinery as ₹9 crore, though the client’s records show ₹15 crore.', 'integrity',
      ['certifies', '₹9 crore', '₹15 crore'], 'A false certificate is **knowingly** issued: the principle of **integrity** is violated.', 'ICAI Study Material, Ch 11, Test Your Understanding 2'),
    P('sm-walker', 'sm-a', 'The silent predecessor', 'Das & Co. write to the previous auditors, Walker & Co., asking whether there is any professional reason not to accept the audit. Walker & Co. do not reply.', 'behaviour',
      ['do not reply'], 'Not replying to the incoming auditor is a lapse of **professional behaviour** (Case Study answer b; also PYQ Jan 2026 Q1).', 'ICAI Study Material, Ch 11, Case Study Q3 (answer b)'),
    P('sm-cfs', 'sm-a', 'The forgotten consolidation', 'Das & Co. know that their client has acquired all the shares of another company, so consolidated financial statements must be prepared and audited, but they fail to advise the client.', 'pcdc',
      ['fail to advise'], 'Not advising on a known legal requirement is a failure of knowledge applied with diligence: **professional competence and due care** (Case Study answer d).', 'ICAI Study Material, Ch 11, Case Study Q4 (answer d)'),
    P('sm-false', 'sm-b', 'The misleading note', 'A Chartered Accountant signs off on a report he knows omits information, so that the report misleads its readers.', 'integrity',
      ['knows omits information', 'misleads'], 'Integrity: never **knowingly** associated with information that omits or obscures required information in a misleading way.', 'ICAI Study Material, Ch 11 §4 (integrity)'),
    P('sm-bias', 'sm-b', 'The undue influence', 'A Chartered Accountant accepts an assignment knowing that a relationship with the client will unduly influence his judgement.', 'objectivity',
      ['unduly influence his judgement'], 'Objectivity: do not undertake an activity if a circumstance or relationship **unduly influences** professional judgement.', 'ICAI Study Material, Ch 11 §4 (objectivity)'),
    P('sm-rushed', 'sm-b', 'The rushed assignment', 'A Chartered Accountant finishes an assignment carelessly and late, without applying the current technical standards.', 'pcdc',
      ['carelessly and late', 'current technical standards'], 'Diligence means acting **carefully, thoroughly and on a timely basis**, with current knowledge: professional competence and due care.', 'ICAI Study Material, Ch 11 §4 (professional competence and due care)'),
    P('sm-evidence', 'sm-b', 'Documents for the court', 'CA P, employed by a company, hands over the company’s documents as evidence in legal proceedings, because the law requires their disclosure.', 'confidentiality',
      ['law requires their disclosure'], 'Confidentiality is the principle in play, and it is **not violated**: information may be disclosed when the law requires it (PYQ Sep 2024 Q6(b)).', 'ICAI Study Material, Ch 11 §4 (confidentiality); PYQ Sep 2024 Q6(b)'),
    P('sm-discredit', 'sm-b', 'The rule-breaker', 'A Chartered Accountant knowingly runs a side business that breaks the law and could bring the profession into disrepute.', 'behaviour',
      ['breaks the law', 'disrepute'], 'Professional behaviour: comply with laws and regulations and **avoid conduct that discredits** the profession.', 'ICAI Study Material, Ch 11 §4 (professional behaviour)'),
    /* fundamental principles: ICAI papers */
    P('pyq-sister', 'icai', 'Auditing the sister’s firm', 'A Chartered Accountant in practice accepts the appointment as auditor of a firm in which his sister is a partner.', 'objectivity',
      ['his sister is a partner'], 'The relationship **unduly influences** judgement: objectivity is violated (ICAI’s answer).', 'PYQ May 2024, Paper 5, Q5(c)(1)'),
    P('pyq-insider', 'icai', 'A friend’s request', 'A Chartered Accountant’s friend asks him for insider information about a company that is his client, and he cannot refuse.', 'confidentiality',
      ['insider information', 'cannot refuse'], 'Information acquired from a client must not be passed to third parties: **confidentiality** is violated.', 'PYQ May 2024, Paper 5, Q5(c)(2)'),
    P('pyq-lawchange', 'icai', 'The change in law', 'A Chartered Accountant in practice fails to inform his client about a change in the laws that apply to the client.', 'pcdc',
      ['fails to inform', 'change in the laws'], 'Knowledge must be kept current with **relevant legislation**: professional competence and due care.', 'PYQ May 2024, Paper 5, Q5(c)(3)'),
    P('rtp-jatin1', 'icai', 'The brother-in-law’s firm', 'CA Jatin is the auditor of XYZ Pharma, his brother-in-law’s partnership firm.', 'objectivity',
      ['brother-in-law’s'], 'The family relationship is a **conflict of interest** that could unduly influence his judgement (ICAI’s answer).', 'RTP Jan 2026, Paper 5, Q20(i)'),
    P('rtp-jatin2', 'icai', 'The missed deduction', 'Preparing a company’s tax return, CA Jatin does not check the latest Income-tax provision allowing a major new deduction, and the client overpays tax.', 'pcdc',
      ['does not check the latest', 'overpays'], 'Not keeping up with **current legislation**: professional competence and due care (ICAI’s answer).', 'RTP Jan 2026, Paper 5, Q20(ii)'),
    P('rtp-jatin3', 'icai', 'Understate the sales', 'A client instructs CA Jatin, who prepares its GST returns, to intentionally understate the sales figures to reduce its tax.', 'integrity',
      ['intentionally understate'], 'Being associated with a **knowingly false** return violates integrity (ICAI’s answer).', 'RTP Jan 2026, Paper 5, Q20(iii)'),
    P('pyq-deadline', 'icai', 'The deadline', 'Under time pressure, CA B has insufficient time to properly perform the audit, yet is under pressure to issue a clean report in the limited time.', 'pcdc',
      ['insufficient time to properly perform'], 'Not acting **diligently and thoroughly** as the assignment requires (answer key A).', 'PYQ Sep 2024, Paper 5, Case Scenario 1, Q4 (key A)'),
    P('mtp-misleading', 'icai', 'Reword the disclosures', 'The CEO asks the auditors to modify the financial statement disclosures in a misleading manner.', 'integrity',
      ['in a misleading manner'], 'Associating with **misleading** information breaches integrity (answer key a).', 'MTP May 2025, Paper 5, Series I, Q9 (key a)'),
    P('mtp-declaration', 'icai', 'The bank’s declaration', 'A bank asks its auditor for a declaration that the auditor will not share any information about the bank’s affairs with outsiders.', 'confidentiality',
      ['will not share any information'], 'The declaration is about **confidentiality** of information acquired in the engagement (answer key b).', 'MTP Sep 2024, Paper 5, Series II, Q10 (key b)'),
    P('pyq-skilledge', 'icai', 'No reply from CA S', 'Skill Edge Learning Pvt. Ltd. replaces its auditor CA S with M/s T & Associates, who send CA S the formal communication before accepting. CA S does not respond.', 'behaviour',
      ['does not respond'], 'Failing to respond to the incoming auditor’s communication is unethical: a violation of **professional behaviour** (answer key B).', 'PYQ Jan 2026, Paper 5, Case Scenario 1, Q1 (key B)'),
    /* fundamental principles: the PassBook cast */
    P('tp-whatsapp', 'tapri', 'The WhatsApp group', 'Bunty posts Tapri’s unreleased quarterly results in his college WhatsApp group.', 'confidentiality',
      ['unreleased quarterly results', 'WhatsApp group'], 'Client information shared with **third parties** without legal duty or right: confidentiality.', 'PassBook case'),
    P('tp-turnover', 'tapri', 'A bigger turnover', 'Kesar asks Iyer & Associates to certify Tapri’s turnover at ₹180 crore for a bank loan, though the books show ₹140 crore.', 'integrity',
      ['₹180 crore', '₹140 crore'], 'Certifying a figure known to be **false**: integrity.', 'PassBook case'),
    P('tp-gst', 'tapri', 'The old GST rules', 'Ms. Iyer’s new partner signs Tapri’s tax audit report using last year’s checklist, without reading the amendments made this year.', 'pcdc',
      ['without reading the amendments'], 'Knowledge not kept current with **relevant legislation**: professional competence and due care.', 'PassBook case'),
    P('tp-brother', 'tapri', 'The CFO’s brother', 'Dev Malhotra, Tapri’s CFO, is the brother of the partner proposed to sign Tapri’s audit report.', 'objectivity',
      ['brother'], 'A close relationship with the client’s CFO is a **conflict of interest** that could unduly influence judgement.', 'PassBook case'),
    P('tp-rival', 'tapri', 'Talking down a rival', 'At a Tapri board meeting, Bunty calls a rival audit firm “certificate sellers” to win more work for Iyer & Associates.', 'behaviour',
      ['certificate sellers'], 'Conduct that could **discredit the profession**: professional behaviour.', 'PassBook case')
  ];
  const CARD_BY = Object.fromEntries(CARDS.map(c => [c.id, c]));
  const DECKS = [['sm-a', 'Study Material examples, set 1'], ['sm-b', 'Study Material examples, set 2'], ['icai', 'ICAI papers'], ['tapri', 'Iyer & Associates at Tapri']];

  /** the cards of a deck (or one card, focus), each with its bin; checks the data as it goes */
  function sortDeck(kind, deck, focus) {
    if (kind !== 'threats' && kind !== 'principles') throw new Error('Choose threats to independence or fundamental principles.');
    const bins = kind === 'threats' ? THREATS : PRINCIPLES;
    let cards;
    if (focus) {
      const c = CARD_BY[focus];
      if (!c) throw new Error('That card is not in the lab.');
      if (c.kind !== kind) throw new Error('That card belongs to the other mode.');
      cards = [c];
    } else {
      if (!DECKS.some(d => d[0] === deck)) throw new Error('Pick a deck of cards.');
      cards = CARDS.filter(c => c.kind === kind && c.deck === deck);
    }
    const placed = cards.map(c => {
      const bin = bins.findIndex(b => b[0] === c.a);
      if (bin < 0) throw new Error(`Card ${c.id} has no ${kind === 'threats' ? 'threat' : 'principle'}.`);
      if (kind === 'threats' && !SAFEGUARDS[c.sg]) throw new Error(`Card ${c.id} has no safeguard.`);
      return { card: c, bin };
    });
    return { kind, bins, placed };
  }

  /* ---------------------------------------------------------------- drawing */
  const mark = (text, clues) => {
    let h = esc(text);
    (clues || []).slice().sort((a, b) => b.length - a.length).forEach(cl => { const e = esc(cl); if (h.includes(e)) h = h.split(e).join(`<mark>${e}</mark>`); });
    return h;
  };
  const cardHtml = (c, i, total, marked) => ({ html: `<div class="ex th-card"><div class="ex-h"><span class="ex-tag">Card ${i + 1} of ${total}</span><b>${esc(c.title)}</b></div><div class="ex-b"><p>${marked ? mark(c.text, c.clue) : esc(c.text)}</p><p><small>${esc(c.src)}</small></p></div></div>` });
  const binTitle = S => (S.kind === 'threats' ? 'Threats to independence (Study Material Ch 11 §6)' : 'Fundamental principles (Study Material Ch 11 §4)');
  /** the five bins and the cards sorted into them so far (hl: the card just placed) */
  function binTable(S, upto, hl) {
    const rows = S.bins.map(b => [b[1], S.placed.slice(0, upto).map((p, i) => (p.card.a === b[0] ? `${i + 1}. ${p.card.title}` : null)).filter(Boolean).join('; ') || '—']);
    const cells = {};
    if (hl != null) { cells[S.placed[hl].bin + ',0'] = 'hl'; cells[S.placed[hl].bin + ',1'] = 'hl'; }
    return { type: 'table', title: binTitle(S), head: [S.kind === 'threats' ? 'Threat' : 'Principle', 'Cards'], rows, rowLabels: true, cells, align: ['left', 'left'] };
  }
  /** the opening frame: what each bin means, in the Study Material's words */
  const defTable = S => ({ type: 'table', title: binTitle(S), head: [S.kind === 'threats' ? 'Threat' : 'Principle', 'What it is'], rows: S.bins.map(b => [b[1], b[2]]), rowLabels: true, align: ['left', 'left'] });

  let lastKind = 'threats';                    // the mode of the last good compute: Test yourself asks about the mode being explored
  function compute(v) {
    const kind = v.mode === 'principles' ? 'principles' : 'threats';
    const focus = v.focus && CARD_BY[v.focus] && CARD_BY[v.focus].kind === kind ? v.focus : '';
    const S = sortDeck(kind, v.deck, focus), n = S.placed.length, isT = kind === 'threats';
    lastKind = kind;
    const frames = [{ caption: isT ? `**${n} card${n === 1 ? '' : 's'} to sort.** The Study Material names five threats to independence; each card shows a situation. Press ▶ to sort them one by one: the marked words are the clue, the caption gives the reason and the safeguard.`
      : `**${n} card${n === 1 ? '' : 's'} to sort.** A professional accountant shall comply with each of the five fundamental principles. Press ▶ to see which principle each situation tests.`,
    view: [defTable(S)] }];
    S.placed.forEach((p, i) => {
      const c = p.card, sg = isT ? SAFEGUARDS[c.sg] : null;
      const cap = isT ? `**Card ${i + 1}: ${NAME[c.a]} threat.** ${c.why} **Safeguard:** ${c.sgText || sg.text}`
        : `**Card ${i + 1}: ${NAME[c.a]}.** ${c.why}`;
      frames.push({ caption: cap, view: [cardHtml(c, i, n, true), binTable(S, i + 1, i)] });
    });
    if (n > 1 || !focus) {
      const sum = isT ? { type: 'table', title: 'The safeguard for each card', head: ['Card', 'Threat', 'Safeguard'], rows: S.placed.map((p, i) => [`${i + 1}. ${p.card.title}`, NAME[p.card.a], SAFEGUARDS[p.card.sg].label]), align: ['left', 'left', 'left'] } : null;
      frames.push({ caption: isT ? GENERAL : 'The five principles are the standard of behaviour expected of every professional accountant, in practice or in service; any deviation brings the disciplinary mechanism into action (Study Material Ch 11 §2, §4).',
        view: [binTable(S, n, null)].concat(sum ? [sum] : []) });
    }
    const count = S.bins.map(b => S.placed.filter(p => p.card.a === b[0]).length);
    const stats = S.bins.map((b, i) => ({ label: b[1], value: String(count[i]), hint: b[2] }));
    const table = isT ? { head: ['#', 'Card', 'Threat', 'Safeguard'], rows: S.placed.map((p, i) => [i + 1, p.card.title, NAME[p.card.a], (p.card.sgText || SAFEGUARDS[p.card.sg].text).replace(/\*\*/g, '')]) }
      : { head: ['#', 'Card', 'Principle', 'Why'], rows: S.placed.map((p, i) => [i + 1, p.card.title, NAME[p.card.a], p.card.why.replace(/\*\*/g, '')]) };
    const note = isT ? '**Conventions.** Each card is sorted into the one threat ICAI’s answer (or the Study Material’s list of examples) gives it; real situations can carry two threats at once, as in MTP Jan 2026 Series I Q13. The safeguard is the specific form of the Study Material’s rule: desist, eliminate the threat, or apply safeguards that reduce it to an acceptable level and record them, otherwise do not accept the work.'
      : '**Conventions.** Each card is sorted into the principle ICAI’s answer (or the Study Material’s definition) names; a situation can touch more than one principle, as in MTP May 2026 Series I Q12 (integrity and objectivity).';
    return { frames, stats, table, note, sim: S };
  }

  /* ---------------------------------------------------------------- definition */
  const def = {
    id: 'threats', title: 'Independence Threats Lab',
    blurb: 'Place scenario cards in the five threats to independence, with a safeguard each, or in the five fundamental principles.',
    controls: [
      { id: 'mode', type: 'seg', label: 'Sort into', value: 'threats', options: [['threats', 'Threats'], ['principles', 'Principles']] },
      { id: 'deck', type: 'select', label: 'Deck', value: 'sm-a', options: DECKS },
      { id: 'focus', type: 'select', label: 'Show one card only', value: '', options: [['', 'No: the whole deck']].concat(CARDS.map(c => [c.id, c.title, (c.kind === 'threats' ? 'Threat cards: ' : 'Principle cards: ') + DECKS.find(d => d[0] === c.deck)[1]])) }
    ],
    presets: [
      { label: 'Study Material examples of the five threats', values: { mode: 'threats', deck: 'sm-a', focus: '' } },
      { label: 'PYQ Jan 2025 Q2(b) and other ICAI questions: name the threat', values: { mode: 'threats', deck: 'icai', focus: '' } },
      { label: 'PYQ May 2024 Q5(c), RTP Jan 2026 Q20 and other ICAI questions: name the principle', values: { mode: 'principles', deck: 'icai', focus: '' } },
      { label: 'Iyer & Associates at Tapri: eight threats', values: { mode: 'threats', deck: 'tapri', focus: '' } },
      { label: 'Iyer & Associates at Tapri: five principles', values: { mode: 'principles', deck: 'tapri', focus: '' } },
      { label: 'Study Material Test Your Understanding 3: the inherited shares', values: { mode: 'threats', deck: 'sm-a', focus: 'sm-shares' } }
    ],
    compute,
    challenge: {
      title: 'Name the threat, the safeguard or the principle',
      gen(r) {
        const pool = CARDS.filter(c => c.kind === lastKind), x = r();
        const c = pool[Math.min(pool.length - 1, Math.floor(x * pool.length))];
        return { mode: lastKind, deck: c.deck, focus: c.id, ask: lastKind === 'threats' && r() < 0.4 ? 'safeguard' : lastKind === 'threats' ? 'threat' : 'principle', pick: Math.floor(r() * 1e6) };
      },
      prompt(v, res) {
        const c = res.sim.placed[0].card;
        if (v.ask === 'safeguard') return `Read the card: it is a **${NAME[c.a].toLowerCase()} threat**. Which safeguard fits this situation?`;
        if (v.ask === 'principle') return 'Read the card. Which fundamental principle does it test: integrity, objectivity, professional competence and due care, confidentiality, or professional behaviour?';
        return 'Read the card. Which threat to independence does it create: self-interest, self-review, advocacy, familiarity, or intimidation?';
      },
      kind: 'choice',
      choices(v, res) {
        const c = res.sim.placed[0].card;
        if (v.ask === 'principle') return PRINCIPLES.map(p => [p[0], p[1]]);
        if (v.ask !== 'safeguard') return THREATS.map(t => [t[0], t[1]]);
        const ok = new Set([c.sg].concat(c.alsoOk || []));
        const wrong = Object.keys(SAFEGUARDS).filter(k => !ok.has(k) && !SAFEGUARDS[k].for.includes(c.a));
        const r = (s => () => (s = (s * 48271) % 2147483647) / 2147483647)(((+v.pick || 1) % 2147483646) + 1);
        const pick = [];
        while (pick.length < 3 && wrong.length) pick.push(wrong.splice(Math.floor(r() * wrong.length), 1)[0]);
        const all = pick.concat([c.sg]);
        const at = Math.floor(r() * all.length); all.splice(at, 0, all.pop());   // the right one at a seeded place
        return all.map(k => [k, SAFEGUARDS[k].label]);
      },
      solve(res, v) { const c = res.sim.placed[0].card; return v && v.ask === 'safeguard' ? c.sg : c.a; },
      view: res => [cardHtml(res.sim.placed[0].card, 0, 1, false)],
      explain(res, v) {
        const c = res.sim.placed[0].card;
        if (v && v.ask === 'safeguard') return `${(c.sgText || SAFEGUARDS[c.sg].text)} The other options answer other threats.`;
        return `**${NAME[c.a]}${c.kind === 'threats' ? ' threat' : ''}.** ${c.why}${c.kind === 'threats' ? ` Safeguard: ${c.sgText || SAFEGUARDS[c.sg].text}` : ''}`;
      }
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { sortDeck, CARDS, DECKS, THREATS, PRINCIPLES, SAFEGUARDS, GENERAL, compute, def };
  g.__lab_def_threats = def;
})(typeof window !== 'undefined' ? window : globalThis);
