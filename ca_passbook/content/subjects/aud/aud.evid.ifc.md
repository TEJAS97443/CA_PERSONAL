---
id: aud.evid.ifc
title: Internal financial controls and ICFR
minutes: 15
needs: aud.risk.ic
tags: internal financial controls, IFC, ICFR, section 143(3)(i), section 134(5)(e), audit committee, independent directors
labs:
summary: What internal financial controls are, who answers for them under the Companies Act, 2013, which companies' auditors must report on them, and why IFC is wider than internal control over financial reporting.
---

## In plain words

### Kesar reads the small print

It is May, and Tapri Tea Co. Ltd's board is approving the annual report. Kesar, pen in hand, stops at the Directors' Responsibility Statement: the directors "had laid down internal financial controls to be followed by the company and that such internal financial controls are adequate and were operating effectively".

> **Kesar:** Adequate *and* working? I am signing that? Dev, what are these internal financial controls? The lock on the cash box?
> **Dev:** The lock, the purchase approvals, the GST calendar, the fraud hotline. Everything that keeps the money and the numbers honest.
> **Kesar:** And Lakshmi-ji writes about them also?
> **Dev:** In a separate annexure to her report. The present value of skipping that is very negative.

**Internal financial controls (IFC)** are the policies and procedures a company puts in place to make five things happen: reliable financial reporting, effective and efficient operations, compliance with laws, safe assets, and the prevention and detection of fraud. The Companies Act, 2013 makes four groups answer for them: the directors (in a listed company, they say so in the Directors' Responsibility Statement), the audit committee (it evaluates them), the independent directors (they satisfy themselves that financial controls are robust), and the statutory auditor (who reports whether they are adequate and operating effectively). Management and directors build and run the controls; the auditor checks and reports.

There is also a narrower term. **Internal control over financial reporting (ICFR)** is only the part of the controls that keeps the financial statements right. When an auditor gives an opinion on ICFR, it is a second opinion, separate from the opinion on the financial statements.

::: analogy The school and the report card
A school runs many controls: attendance registers, lab safety rules, fee receipts, exam invigilation. Together they are its internal controls. A few of them make sure the marks printed on each report card are correct: double marking, checked totals, a locked marks register. Those few are the report card controls. A parent can ask "is the school well run?" or the narrower "can I trust this report card?": IFC answers the first question, ICFR the second.
:::

::: key
==IFC is a wider term; ICFR is narrower==, restricted to internal controls over financial reporting. Directors and management have primary responsibility for internal financial controls; the auditor evaluates, validates and reports on their design and operating effectiveness, in a report separate from the opinion on the financial statements.
:::

## How it works

### 1. What internal financial controls are

::: definition Internal financial controls (IFC)
The policies and procedures put in place by companies for ensuring (SM 3.63):

- reliability of financial reporting;
- effectiveness and efficiency of operations;
- compliance with applicable laws and regulations;
- safeguarding of assets;
- prevention and detection of frauds.
:::

The Companies Act, 2013 has placed a greater emphasis on the effective implementation of, and reporting on, internal controls for a company, and uses the term "internal financial controls" at several places to cast responsibilities (SM 3.63).

### 2. Four provisions, four responsibilities

*Reproduce this table from memory: provision, party, responsibility (SM 3.63–3.64).*

| Provision of the Companies Act, 2013 | Nature of responsibility |
|---|---|
| **Section 134(5)(e)**: directors | In the case of listed companies, the Directors' Responsibility Statement shall state that the directors had laid down internal financial controls to be followed by the company and that such internal financial controls are adequate and were operating effectively. |
| **Section 143(3)(i)**: auditor | The auditor's report shall state whether the company has an adequate internal financial controls system in place and the operating effectiveness of such controls (not applicable to certain private companies, below). |
| **Section 177(4)(vii)**: audit committee | Every audit committee shall act in accordance with the terms of reference specified in writing by the Board, which shall, inter alia, include evaluation of internal financial controls and risk management systems. |
| **Section 149(8)**: independent directors | The company and independent directors shall abide by Schedule IV, the Code for Independent Directors, under which independent directors shall satisfy themselves on the integrity of financial information and that financial controls and the systems of risk management are robust and defensible. |

The directors and management have **primary responsibility** for implementing and maintaining an effective internal controls framework; auditors are expected to **evaluate, validate and report on the design and operating effectiveness** of internal financial controls (SM 3.64).

::: diagram Who answers for internal financial controls
{"type": "layers", "layers": [{"label": "Directors", "note": "listed company: DRS says IFC laid down, adequate, operating effectively", "right": "s 134(5)(e)"}, {"label": "Audit committee", "note": "terms of reference include evaluation of IFC and risk management systems", "right": "s 177(4)(vii)"}, {"label": "Independent directors", "note": "satisfy themselves that financial controls are robust and defensible", "right": "s 149(8), Sch IV"}, {"label": "Statutory auditor", "note": "reports on adequacy and operating effectiveness", "right": "s 143(3)(i)"}], "caption": "Directors and management implement and maintain the controls; the audit committee and independent directors oversee them; the auditor evaluates, validates and reports. DRS: Directors' Responsibility Statement."}
:::

### 3. The auditor's report, and who is exempt

Under section 143(3)(i), the auditor's report shall state whether the company has adequate internal financial controls **with reference to financial statements** in place and the operating effectiveness of such controls (SM 8.70). The requirement does **not** apply to a **private company** which is (SM 3.63–3.64, 8.70):

- (i) a One Person Company; or
- (ii) a small company; or
- (iii) a company having turnover less than ₹50 crore as per its latest audited financial statements **and** aggregate borrowings from banks or financial institutions or any body corporate at any point of time during the financial year less than ₹25 crore.

::: diagram Must the auditor report on IFC under section 143(3)(i)?
{"type": "flow", "w": 430, "nodes": [{"id": "s", "kind": "start", "label": "Company audit\nunder the Act"}, {"id": "p", "kind": "decision", "label": "Private\ncompany?"}, {"id": "r1", "kind": "end", "label": "Report on IFC", "color": "d"}, {"id": "o", "kind": "decision", "label": "OPC or small\ncompany?"}, {"id": "x1", "kind": "end", "label": "Not required", "color": "mute"}, {"id": "t", "kind": "decision", "label": "Turnover < ₹50 cr\nand borrowings\n< ₹25 cr?"}, {"id": "x2", "kind": "end", "label": "Not required", "color": "mute"}, {"id": "r2", "kind": "end", "label": "Report on IFC", "color": "d"}], "edges": [["s", "p"], ["p", "r1", "no"], ["p", "o", "yes"], ["o", "x1", "yes"], ["o", "t", "no"], ["t", "x2", "yes"], ["t", "r2", "no"]], "caption": "Orange: the auditor reports on IFC; grey: the exemption applies. Turnover is as per the latest audited financial statements; borrowings are from banks, financial institutions or any body corporate, at any point of time during the year, and both limits must be met."}
:::

::: warning
The section 143(3)(i) exemption and its limits are stated as the Study Material gives them. The small-company limits in section 2(85) were raised (paid-up capital not exceeding ₹10 crore and turnover not exceeding ₹100 crore) by notification G.S.R 880(E) of 1 December 2025; ICAI lists this under Paper 2, and Paper 5 answers follow the Study Material. Verify against the Study Material and Statutory Update for your attempt.
:::

### 4. Where IFC shows up in the auditor's report

The illustrative company auditor's report in the Study Material mentions internal financial controls three times:

1. **Management's responsibility**: the Board's responsibility includes the design, implementation and maintenance of adequate internal financial controls that were operating effectively for ensuring the accuracy and completeness of the accounting records, relevant to the preparation and presentation of the financial statements (SM 8.16–8.17).
2. **Auditor's responsibilities**: after "obtain an understanding of internal control relevant to the audit…", the report adds that under section 143(3)(i) the auditor is also responsible for expressing an opinion on whether the company has adequate internal financial controls system in place and the operating effectiveness of such controls (SM 8.29).
3. **Report on Other Legal and Regulatory Requirements**, clause (i): "With respect to the adequacy of the internal financial controls over financial reporting of the Company and the operating effectiveness of such controls, refer to our separate Report in 'Annexure A'" (SM 8.32).

For banks registered as companies, the statutory central auditors give a report on the adequacy and operating effectiveness of internal controls over financial reporting in terms of section 143(3)(i), normally as an annexure to the main audit report, as per ICAI's Guidance Note on Audit of Internal Financial Controls over Financial Reporting (SM 10.7).

Information technology adds a reason to care: if IT-related risks are not addressed, then, because of the regulatory requirements on internal financial controls, the auditor's report may have to be modified in some instances (SM 3.56). The controls themselves are in [[aud.risk.it|internal control in an IT environment]].

### 5. IFC versus ICFR

The Study Material draws the distinction this way (SM 4.43):

- **Internal financial controls** refers to the policies and procedures put in place by companies for ensuring reliability of financial reporting, effectiveness and efficiency of operations, compliance with applicable laws and regulations, safeguarding of assets and prevention and detection of frauds.
- **Internal control over financial reporting** is required where auditors are required to express an opinion on the effectiveness of an entity's internal controls over financial reporting; such opinion is ==in addition to and distinct from the opinion== expressed by the auditor on the financial statements.
- Therefore "internal financial control" is a **wider** term, whereas "internal controls over financial reporting" is a **narrower** term, restricted to the entity's internal controls over financial reporting only.

::: diagram IFC holds ICFR
{"type": "nest", "w": 420, "root": {"title": "Internal financial controls (IFC)", "note": "wider term", "color": "mute", "mono": false, "children": [{"title": "ICFR", "note": "narrower term", "lines": ["internal controls over financial reporting only"], "hl": true, "color": "a", "mono": false}, {"title": "Operations", "lines": ["effectiveness and efficiency"], "color": "b", "mono": false}, {"title": "Compliance", "lines": ["applicable laws and regulations"], "color": "c", "mono": false}, {"title": "Assets", "lines": ["safeguarding of assets"], "color": "e", "mono": false}, {"title": "Fraud", "lines": ["prevention and detection of frauds"], "color": "f", "mono": false}]}, "caption": "Highlighted: ICFR, the part of IFC restricted to financial reporting. Simplified: in practice one control can serve more than one purpose."}
:::

::: compare Distinguish IFC and ICFR
| Point | Internal financial controls | Internal control over financial reporting |
|---|---|---|
| Meaning | Policies and procedures for five purposes | Internal controls over financial reporting only |
| Scope | Wider term | Narrower term |
| Purposes | Financial reporting, operations, compliance, assets, frauds | Reliable financial reporting |
| Where it matters | The Companies Act, 2013 uses the term to cast responsibilities on directors, the audit committee, independent directors and the auditor | Where auditors must express an opinion on its effectiveness: that opinion is in addition to and distinct from the opinion on the financial statements |
:::

## Worked examples

:::: example Five companies, one clause
Iyer & Associates audit the following companies for 2025-26. None is a small company unless stated. State, with reasons, whether the auditor's report must include reporting under section 143(3)(i) of the Companies Act, 2013.

(a) Tapri Tea Co. Ltd, listed on NSE and BSE.

(b) Kulhad Cups Pvt Ltd: turnover ₹46 crore as per its latest audited financial statements; its bank cash credit peaked at ₹27.50 crore in October 2025 and stood at ₹18 crore on 31 March 2026.

(c) Masala Route Pvt Ltd: turnover ₹38 crore as per its latest audited financial statements; its only borrowing, a bank term loan, never exceeded ₹12 crore during the year.

(d) Kesar Ventures (OPC) Pvt Ltd, which holds Kesar's personal trademarks.

(e) Narmada Cold Chain Ltd, an unlisted public company with turnover of ₹20 crore and no borrowings.

::: answer Model answer
**Relevant provision.** As per section 143(3)(i) of the Companies Act, 2013, the auditor's report shall state whether the company has adequate internal financial controls with reference to financial statements in place and the operating effectiveness of such controls. This does not apply to a private company which is a One Person Company, or a small company, or a company having turnover less than ₹50 crore as per its latest audited financial statements and aggregate borrowings from banks, financial institutions or any body corporate at any point of time during the financial year less than ₹25 crore.

| Company | Reporting under 143(3)(i) | Reason |
|---|---|---|
| (a) Tapri | Required | A public company: the exemption is only for private companies |
| (b) Kulhad Cups | Required | Turnover below ₹50 crore, but borrowings reached ₹27.50 crore during the year |
| (c) Masala Route | Not required | Private; turnover below ₹50 crore and borrowings below ₹25 crore throughout |
| (d) Kesar Ventures | Not required | A One Person Company |
| (e) Narmada Cold Chain | Required | A public company, whatever its size |

**Conclusion.** The auditor reports on internal financial controls for (a), (b) and (e). In (b), the year-end balance of ₹18 crore is irrelevant: the test is borrowings at any point of time during the year, and both conditions must be met for the exemption.
:::
::::

:::: example Minutes that need correcting
Bunty is reading the minutes of Tapri's audit committee meeting of 14 February 2026. Three lines catch his eye:

1. "Internal financial controls are management's business. The committee will not take up their evaluation; the statutory auditors report on them anyway."
2. "Independent directors have no role in internal financial controls; their job is to attend board meetings and vote."
3. "Dev will draft the Directors' Responsibility Statement saying the controls are adequate and operating effectively. Since Tapri listed only in 2024, the statement is optional this year."

Required: Comment on each line with reference to the Companies Act, 2013 as explained in the Study Material, and state who has the primary responsibility for internal financial controls.

::: answer Model answer
The Companies Act, 2013 has placed a greater emphasis on the effective implementation and reporting on the internal controls of a company, and casts responsibilities through the term "internal financial controls" (SM 3.63).

1. **Incorrect.** Under section 177(4)(vii), every audit committee shall act in accordance with the terms of reference specified in writing by the Board, which shall, inter alia, include evaluation of internal financial controls and risk management systems. The auditor's report under section 143(3)(i), on whether the company has adequate internal financial controls with reference to financial statements in place and the operating effectiveness of such controls, does not take the place of the committee's own evaluation.
2. **Incorrect.** Under section 149(8), the company and independent directors shall abide by Schedule IV, the Code for Independent Directors, under which independent directors shall satisfy themselves on the integrity of financial information and that financial controls and the systems of risk management are robust and defensible.
3. **Incorrect.** Under section 134(5)(e), in the case of listed companies, the Directors' Responsibility Statement shall state that the directors had laid down internal financial controls to be followed by the company and that such internal financial controls are adequate and were operating effectively. Tapri is listed, so the statement is required, however recently it listed; and it is the directors' statement, whoever drafts it.

**Primary responsibility.** The directors and management have the primary responsibility for implementing and maintaining an effective internal controls framework; the auditor evaluates, validates and reports on the design and operating effectiveness of internal financial controls (SM 3.64).
:::
::::

:::: example Bunty's three claims
State, with reasons, whether each of Bunty's statements is correct or incorrect.

(i) "IFC and ICFR mean the same thing, so the two terms can be used interchangeably."

(ii) "Since we report on Tapri's internal financial controls, our opinion on the financial statements already covers the controls; there is no separate opinion."

(iii) "Under the Companies Act, 2013, the statutory auditor is primarily responsible for Tapri's internal financial controls."

::: answer Model answer
**(i) Incorrect.** Internal financial controls are the policies and procedures put in place by companies for ensuring reliability of financial reporting, effectiveness and efficiency of operations, compliance with applicable laws and regulations, safeguarding of assets and prevention and detection of frauds. Internal control over financial reporting is restricted to the entity's internal controls over financial reporting only. IFC is the wider term and ICFR the narrower one.

**(ii) Incorrect.** Where auditors are required to express an opinion on the effectiveness of an entity's internal controls over financial reporting, that opinion is in addition to and distinct from the opinion on the financial statements. In the company auditor's report, clause (i) of the Report on Other Legal and Regulatory Requirements refers to a separate report (Annexure A) on the adequacy and operating effectiveness of these controls.

**(iii) Incorrect.** The directors and management have the primary responsibility for implementing and maintaining an effective internal controls framework; the directors of a listed company also state in the Directors' Responsibility Statement that the controls are adequate and operating effectively (section 134(5)(e)). The auditor evaluates, validates and reports on their design and operating effectiveness under section 143(3)(i).
:::
::::

## Under the hood

### From older ICAI answers: the Act's own wording

*Not in the current Study Material.* Two suggested answers from the earlier scheme (Paper 6, Auditing and Assurance: January 2021 Q3(b) and RTP May 2022 Q14) quote the explanation in section 134(5)(e), under which internal financial controls means "the policies and procedures adopted by the company for ensuring the orderly and efficient conduct of its business, including adherence to company's policies, the safeguarding of its assets, the prevention and detection of frauds and errors, the accuracy and completeness of the accounting records, and the timely preparation of reliable financial information." It does not contradict the Study Material: the purposes overlap, and the Study Material's own MCQ on the objectives of IFC policies uses the same terms ("efficient conduct of business", "prevention and detection of frauds and errors"; SM 4.122). In a Paper 5 answer, write the Study Material's five purposes (SM 3.63); the Act's wording helps you recognise a question that quotes it.

### From older ICAI answers: interim financial statements

*Not in the current Study Material.* Earlier-scheme questions (November 2019 Q1(a); MTP July 2021 Series II Q4(a); MTP May 2023 Series II Q1(v)) said that the auditor's reporting on internal financial controls applies to interim financial statements, and ICAI's answers marked this incorrect: the reporting is a requirement specified in the Act, so it applies only to financial statements prepared under the Act and reported on under section 143, and not to interim financial statements such as quarterly or half-yearly ones, unless another law or regulation requires it. This fits the Study Material, which places the requirement in the auditor's report under section 143(3) (SM 8.69–8.70).

### Neighbours

How internal control works (components, limitations, evaluation) is in [[aud.risk.ic|internal control]]; the full list of matters in section 143(3), and the auditor's report format, in [[aud.report.companies|company auditor's reporting]]. Internal audit often tests these controls; when the statutory auditor may use that work is [[aud.evid.sa610|SA 610]].

## Exam angle

::: exam Where IFC appeared
In the documents read for this lesson, IFC was examined in 3 new-scheme papers and 6 earlier-scheme ones (Paper 6, Auditing and Assurance).

- **New scheme.** The four responsibilities (directors, independent directors, audit committee) by section number: May 2024 Q1(c) (3 marks). A case MCQ, "which of the following does not fall within the nature of responsibility": the distractor was a board-appointed expert certifying that IFC is commensurate with the business: September 2024 MCQ 3, repeated almost word for word as May 2026 MCQ 14 (2 marks each).
- **Study Material MCQs.** Who maintains effective IFC: management (SM 3.79–3.81, Test Your Knowledge MCQ 3). Which is not an objective of IFC policies: "assessing audit risk" (SM 4.122, 4.127, MCQ 3).
- **Earlier scheme.** Distinguish IFC and ICFR: January 2021 Q3(b) (4 marks). IFC reporting and interim financial statements: November 2019 Q1(a), MTP July 2021 Series II Q4(a), MTP May 2023 Series II Q1(v). Meaning, the reporting requirement and its applicability: RTP May 2022 Q14. The auditor reports on internal financial controls, not internal controls in general: MTP November 2020 Series I Q1.
:::

::: exam How the marks are earned
For the responsibilities question, ICAI's answer is the Study Material's table reproduced: section number, then the responsibility in the Act's words. For "distinguish", the marks are for the meaning of each, the "in addition to and distinct from" point and the "wider versus narrower" conclusion.
:::

::: trick 134, 177, 149, 143: who does what
**134** the board *states*, **177** the audit committee *evaluates*, **149** independent directors *satisfy themselves*, **143** the auditor *reports*. Conditions: the section 134(5)(e) statement is for listed companies; the section 143(3)(i) report is not required for the exempt private companies.
:::

## Answer frame

### "Explain the responsibilities under the Companies Act, 2013 for IFC"

1. Opening line: the Act places greater emphasis on effective implementation and reporting on internal controls, and uses "internal financial controls" to cast responsibilities.
2. The four provisions, each with its party and the responsibility in the Act's words (the table in section 2 above).
3. Closing line: directors and management have primary responsibility; auditors evaluate, validate and report on design and operating effectiveness.

### "Is reporting under section 143(3)(i) required?"

1. The provision and the three exemptions, in full.
2. The facts: public or private; OPC or small; turnover as per the latest audited financial statements; the highest borrowings at any point of time during the year.
3. Conclusion for each company, saying which test fails.

## Common mistakes

::: mistake Hall of Shame: the year-end borrowing balance
Bunty exempts a private company because its bank loan is ₹18 crore on 31 March, though it touched ₹27.50 crore in October. **Fix:** the limit is for borrowings at any point of time during the financial year, and turnover and borrowings must both be below their limits.
:::

::: mistake Exempting a small public company
"Turnover is only ₹20 crore, so no IFC reporting." **Fix:** the exemptions are for private companies only. A public company, listed or not, gets IFC reporting whatever its size.
:::

::: mistake Making the auditor the owner of the controls
**Fix:** directors and management implement and maintain internal financial controls; the auditor evaluates, validates and reports on them.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Indore Kulfi Pvt Ltd is not a One Person Company or a small company. Its turnover as per its latest audited financial statements is ₹44 crore. Its borrowings from a bank were ₹9 crore on 1 April 2025, ₹26 crore in December 2025 and ₹14 crore on 31 March 2026. Which statement about reporting under section 143(3)(i) is correct?
- [ ] Not required, because turnover is below ₹50 crore
- [ ] Not required, because year-end borrowings are below ₹25 crore
- [x] Required, because borrowings exceeded ₹25 crore at a point of time during the year
- [ ] Required only if the company is a subsidiary of a public company
> The exemption needs turnover below ₹50 crore and borrowings below ₹25 crore at any point of time during the year. December's ₹26 crore breaks the second condition.

Q: Case scenario. Bunty's draft of Tapri's separate report under section 143(3)(i) reads: "In our opinion, the Company has effective internal financial controls over all its operations and over its compliance with laws and regulations." What is wrong with it?
- [ ] Nothing: internal financial controls cover operations and compliance, so the auditor reports on all of them
- [ ] It should report only on the design of the controls, not on whether they operated effectively
- [ ] It should be part of the opinion paragraph on the financial statements, not a separate report
- [x] Section 143(3)(i) asks whether the company has adequate internal financial controls with reference to financial statements in place and the operating effectiveness of such controls, not about controls over all operations and compliance
> The reporting is with reference to financial statements (SM 8.70): the narrower internal control over financial reporting, though the term internal financial controls is wider (SM 4.43). The report covers adequacy and operating effectiveness, and it is in addition to and distinct from the opinion on the financial statements, given in a separate annexure (SM 8.32).

Q: Which statement on IFC and ICFR is correct?
- [ ] ICFR is the wider term and includes compliance with laws and regulations
- [x] IFC is the wider term; ICFR is restricted to internal controls over financial reporting only
- [ ] The auditor's opinion on ICFR is part of the opinion on the financial statements
- [ ] The two terms mean the same thing
> IFC covers five purposes; ICFR only financial reporting. An opinion on ICFR is in addition to and distinct from the opinion on the financial statements.

Q: Case scenario. Tapri's payroll team must check, every month, that provident fund and ESI contributions are deposited by their statutory due dates, and the head of HR signs off the check. Which purpose of internal financial controls does this control primarily serve?
- [ ] Reliability of financial reporting
- [ ] Safeguarding of assets
- [x] Compliance with applicable laws and regulations
- [ ] Prevention and detection of frauds
> Depositing statutory contributions on time is a matter of complying with the law. The five purposes of internal financial controls are reliability of financial reporting, effectiveness and efficiency of operations, compliance with applicable laws and regulations, safeguarding of assets, and prevention and detection of frauds (SM 3.63).

:::

## Recap

- IFC: policies and procedures for reliable financial reporting, effective and efficient operations, compliance with laws, safeguarding of assets, and prevention and detection of frauds.
- Section 134(5)(e): in listed companies, the Directors' Responsibility Statement says IFC was laid down, is adequate and was operating effectively.
- Section 177(4)(vii): the audit committee evaluates IFC and risk management systems. Section 149(8) with Schedule IV: independent directors satisfy themselves that financial controls are robust and defensible.
- Section 143(3)(i): the auditor reports on adequate IFC with reference to financial statements and their operating effectiveness, in a separate report (Annexure A).
- Exempt: private companies that are OPCs, small companies, or have turnover below ₹50 crore (latest audited) and borrowings below ₹25 crore at all times in the year.
- Directors and management have primary responsibility; auditors evaluate, validate and report.
- IFC is the wider term; ICFR the narrower; an ICFR opinion is in addition to and distinct from the opinion on the financial statements.

## Flashcards

Q:: What are internal financial controls, as per the Study Material?
A:: The policies and procedures put in place by companies for ensuring reliability of financial reporting, effectiveness and efficiency of operations, compliance with applicable laws and regulations, safeguarding of assets, and prevention and detection of frauds.

Q:: IFC: what does section 134(5)(e) require?
A:: In listed companies, the Directors' Responsibility Statement shall state that the directors had laid down internal financial controls to be followed by the company and that they are adequate and were operating effectively.

Q:: IFC: what does section 177(4)(vii) require?
A:: Every audit committee shall act in accordance with written terms of reference from the Board, which include evaluation of internal financial controls and risk management systems.

Q:: IFC: what does section 149(8) with Schedule IV require of independent directors?
A:: They shall satisfy themselves on the integrity of financial information and that financial controls and the systems of risk management are robust and defensible.

Q:: Section 143(3)(i): what must the auditor's report state?
A:: Whether the company has adequate internal financial controls with reference to financial statements in place and the operating effectiveness of such controls.

Q:: Section 143(3)(i): which companies are exempt from IFC reporting?
A:: A private company which is a One Person Company, or a small company, or has turnover less than ₹50 crore as per its latest audited financial statements and aggregate borrowings from banks, financial institutions or any body corporate less than ₹25 crore at any point of time during the year.

Q:: Who has primary responsibility for internal financial controls?
A:: The directors and management, who implement and maintain them; auditors evaluate, validate and report on their design and operating effectiveness.

Q:: Distinguish IFC and ICFR in one line.
A:: IFC is the wider term covering five purposes; ICFR is the narrower term restricted to internal controls over financial reporting only.

Q:: How does an opinion on ICFR relate to the opinion on the financial statements?
A:: It is in addition to and distinct from the opinion on the financial statements.

Q:: Where in the company auditor's report is IFC reported?
A:: Clause (i) of the Report on Other Legal and Regulatory Requirements refers to a separate report, "Annexure A", on the adequacy and operating effectiveness of internal financial controls over financial reporting.
