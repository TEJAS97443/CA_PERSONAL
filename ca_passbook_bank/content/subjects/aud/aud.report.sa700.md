---
id: aud.report.sa700
title: SA 700: forming an opinion and the auditor's report
minutes: 34
needs: aud.nature.sa200, aud.evid.sa500
tags: SA 700, unmodified opinion, auditor's report, basis for opinion, elements of audit report, UDIN, fair presentation framework
labs:
summary: How the auditor concludes that the financial statements are true and fair, and the fourteen elements of the written report, heading by heading, in ICAI's order.
---

## In plain words

### The one-line report

Bunty hands Lakshmi his draft report on Tapri Tea Co. Ltd.

> **Bunty:** Ma'am, done. "Accounts checked. All OK. Bunty."
> **Kesar:** Make it "true and fair, subject to management's explanations". Sab adjust ho jayega.
> **Lakshmi:** This page is all the shareholders will ever see of our work. And "subject to" is a phrase a clean opinion never uses.

SA 700 gives the auditor two jobs. The first is **deciding**: has the audit given **reasonable assurance** (high, but not a guarantee) that the accounts as a whole are free from material misstatement? That needs enough good evidence, uncorrected errors too small to matter, and a step back to judge the accounts as a whole. Yes: an **unmodified opinion**, the clean report. No: [[aud.report.sa705|SA 705]].

The second is **telling**: a written report with fixed headings in a fixed order, recognisable anywhere.

::: analogy The doctor's fitness certificate
A doctor examines you, then writes a certificate in a set form: who it is for, the verdict, the tests done, a signature with registration number, place and date. "Fit, subject to what the patient told me" is no certificate, and it is never dated before the check-up.
:::

::: key
An unmodified opinion is earned, not assumed: reasonable assurance from sufficient appropriate evidence, immaterial uncorrected misstatements and an evaluation of the statements as a whole. The report says so under SA 700's headings, opinion first, dated no earlier than the evidence is complete.
:::

## How it works

SA 700 (Revised), "Forming an Opinion and Reporting on Financial Statements", deals with the auditor's responsibility to form an opinion on the financial statements, and with the form and content of the auditor's report issued as a result of an audit (SM 8.4).

Its requirements aim at an appropriate balance between the need for **consistency and comparability** in auditor reporting globally and the need to increase the value of auditor reporting by making the information in the report **more relevant to users**. The SA promotes consistency, but recognises the need for **flexibility** to accommodate the particular circumstances of individual jurisdictions. Consistency, when the audit is conducted in accordance with SAs, promotes credibility in the global marketplace by making more readily identifiable those audits conducted in accordance with globally recognised standards; it also helps to promote the user's understanding and to identify unusual circumstances when they occur (SM 8.4).

### 1. The objectives

The objectives of the auditor are (SM 8.4): (a) to form an opinion on the financial statements based on an evaluation of the conclusions drawn from the audit evidence obtained; and (b) to express clearly that opinion through a written report. (ICAI's MTP September 2026 answer adds "that also describes the basis for that opinion".)

### 2. Forming the opinion

The auditor shall form an opinion on whether the financial statements are prepared, ==in all material respects, in accordance with the applicable financial reporting framework==. To do so, the auditor shall conclude whether **reasonable assurance** has been obtained that the financial statements as a whole are free from material misstatement, whether due to fraud or error. That conclusion shall take into account (SM 8.5):

- (a) whether sufficient appropriate audit evidence has been obtained;
- (b) whether uncorrected misstatements are material, individually or in aggregate; and
- (c) the evaluations.

::: diagram Forming the opinion under SA 700
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Audit evidence obtained"}, {"id": "d1", "kind": "decision", "label": "Sufficient\nappropriate?"}, {"id": "m1", "kind": "end", "label": "Modify:\nSA 705", "color": "bad"}, {"id": "d2", "kind": "decision", "label": "Uncorrected\nmisstatements\nmaterial?"}, {"id": "m2", "kind": "end", "label": "Modify:\nSA 705", "color": "bad"}, {"id": "d3", "kind": "decision", "label": "Evaluations:\nprepared per\nframework?"}, {"id": "m3", "kind": "end", "label": "Modify:\nSA 705", "color": "bad"}, {"id": "u", "kind": "end", "label": "Unmodified\nopinion", "color": "ok"}], "edges": [["s", "d1"], ["d1", "m1", "no"], ["d1", "d2", "yes"], ["d2", "m2", "yes"], ["d2", "d3", "no"], ["d3", "m3", "no"], ["d3", "u", "yes"]], "caption": "Green: the clean opinion; rose: each answer that blocks reasonable assurance sends the auditor to SA 705, where the nature of the matter and its pervasiveness pick the modified opinion."}
:::

### 3. The evaluations: qualitative aspects and bias

The auditor shall evaluate whether the statements are prepared in accordance with the framework's requirements, including the **qualitative aspects of the entity's accounting practices, including indicators of possible bias in management's judgements** (SM 8.5–8.6):

1. Management makes a number of judgements about the amounts and disclosures in the financial statements.
2. SA 260 (Revised) contains a discussion of the qualitative aspects of accounting practices.
3. In considering them, the auditor may become aware of possible bias in management's judgements, and may conclude that the cumulative effect of a **lack of neutrality**, together with the effect of uncorrected misstatements, causes the financial statements as a whole to be materially misstated. Indicators of a lack of neutrality include:
   - (i) **the selective correction of misstatements** brought to management's attention during the audit, for example correcting those that increase reported earnings but not those that decrease them; and
   - (ii) **possible management bias in the making of accounting estimates**.
4. SA 540 addresses possible management bias in accounting estimates. Its indicators are not misstatements of individual estimates, but may affect the evaluation of whether the financial statements as a whole are free from material misstatement.

### 4. Specific evaluations

In particular, the auditor shall evaluate whether (SM 8.6):

- (a) the financial statements adequately disclose the significant accounting policies selected and applied;
- (b) the policies selected and applied are consistent with the applicable framework and are appropriate;
- (c) the accounting estimates made by management are reasonable;
- (d) the information presented is relevant, reliable, comparable and understandable;
- (e) the financial statements provide adequate disclosures to enable the intended users to understand the effect of material transactions and events on the information conveyed in the financial statements; and
- (f) the terminology used, including the title of each financial statement, is appropriate.

Under a **fair presentation framework**, the auditor shall also evaluate whether the statements achieve fair presentation, considering (a) their overall presentation, structure and content, and (b) whether they, including the notes, represent the underlying transactions and events in a manner that achieves fair presentation. Finally, the auditor shall evaluate whether the statements adequately refer to or describe the applicable framework (SM 8.7).

::: definition Fair presentation framework and compliance framework
**General purpose financial statements** are financial statements prepared in accordance with a general purpose framework. A **general purpose framework** is a financial reporting framework designed to meet the common financial information needs of a wide range of users; it may be a fair presentation framework or a compliance framework. A **fair presentation framework** requires compliance with the framework and (i) acknowledges, explicitly or implicitly, that management may need to give disclosures beyond those specifically required, or (ii) acknowledges explicitly that management may need to depart from a requirement, only in extremely rare circumstances. A **compliance framework** requires compliance but has neither acknowledgement (SM 8.7–8.8).
:::

::: diagram Two kinds of general purpose framework
{"type": "tree", "gapX": 40, "gapY": 90, "root": {"label": "General purpose\nframework", "children": [{"label": "Fair presentation\nframework", "note": "compliance plus", "color": "a"}, {"label": "Compliance\nframework", "note": "compliance only", "color": "d"}]}, "caption": "Both require compliance with the framework. The \"plus\": only the fair presentation framework acknowledges extra disclosures (or, in extremely rare cases, departures) to achieve fair presentation."}
:::

### 5. Form of opinion

The auditor shall express an **unmodified opinion** when the auditor concludes that the financial statements are prepared, in all material respects, in accordance with the applicable framework; otherwise the opinion is modified under SA 705 (SM 8.8–8.9).

### 6. The report: fourteen elements in a fixed order

The report **shall be in writing**. SA 700 requires specific headings, intended to make an auditor's report on an audit conducted in accordance with SAs more recognisable (SM 8.9).

| No. | Element | What SA 700 requires |
|---|---|---|
| 1 | Title | Clearly an independent auditor's: "Independent Auditor's Report" |
| 2 | Addressee | As the engagement requires: company "To the Members of …"; firm, its partners |
| 3 | Auditor's Opinion | First section, heading "Opinion" |
| 4 | Basis for Opinion | Directly after the Opinion |
| 5 | Going Concern | Where applicable, as per [[aud.complete.sa570|SA 570 (Revised)]] |
| 6 | Key Audit Matters | Listed entities, or as law requires or the auditor decides: [[aud.report.sa701|SA 701]] |
| 7 | Other Information | Where applicable, as per SA 720 (Revised) |
| 8 | Responsibilities for the Financial Statements | "Responsibilities of Management for the Financial Statements" |
| 9 | Auditor's Responsibilities for the Audit of the Financial Statements | Three groups of statements |
| 10 | Location of that description | Body, appendix, or an authority's website |
| 11 | Other Reporting Responsibilities | "Report on Other Legal and Regulatory Requirements" |
| 12 | Signature of the Auditor | Partner's name, firm, membership number, FRN, UDIN |
| 13 | Place of Signature | Ordinarily the city where signed |
| 14 | Date of the Auditor's Report | No earlier than sufficient appropriate evidence is obtained |

::: diagram Tapri's report, top to bottom
{"type": "nest", "w": 420, "root": {"title": "Independent Auditor's Report", "note": "To the Members", "color": "mute", "mono": false, "children": [{"title": "Report on the Audit of the FS", "color": "a", "mono": false, "lines": ["Opinion", "Basis for Opinion", "Going concern section (if any)", "Key Audit Matters", "Other Information (if any)", "Responsibilities of Management", "Auditor's Responsibilities"]}, {"title": "Report on Other Legal and Regulatory Requirements", "color": "d", "mono": false, "lines": ["CARO 2020 annexure", "Section 143(3) matters", "Rule 11 matters"]}, {"title": "Sign-off", "color": "g", "mono": false, "rows": [["Firm", "name and FRN"], ["Partner", "name, membership no."], ["UDIN", "18 characters"], ["Place, date", "Indore, 22 May 2026"]]}]}, "caption": "Blue: the Report on the Audit of the Financial Statements; orange: the law's extra reporting, which follows it; green: the sign-off (signature, place, date). Based on ICAI's illustrative report for a listed company (SM 8.25–8.33)."}
:::

### 7. The elements that carry the marks

**Opinion.** The section shall also (a) identify the entity; (b) state that the financial statements have been audited; (c) identify the title of each statement; (d) refer to the notes, including the summary of significant accounting policies; and (e) specify the date of, or period covered by, each statement. An unmodified opinion uses, unless law or regulation requires otherwise, one of two **equivalent** phrases: the statements "**present fairly, in all material respects**" or "**give a true and fair view**", in accordance with the framework. Phrases such as "**with the foregoing explanation**" or "**subject to**" are not appropriate: they suggest a conditional opinion or a weakening or modification of it (SM 8.10–8.11).

**Basis for Opinion**, directly following the Opinion, shall (SM 8.12):

1. state that the audit was conducted in accordance with Standards on Auditing;
2. refer to the section of the report that describes the auditor's responsibilities under the SAs;
3. include a statement that the auditor is independent of the entity in accordance with the relevant ethical requirements and has fulfilled the auditor's other ethical responsibilities; and
4. state whether the auditor believes that the evidence obtained is sufficient and appropriate to provide a basis for the opinion.

It ==provides important context about the auditor's opinion==, so it appears even when the opinion is unmodified (SM 8.100).

**Responsibilities of Management for the Financial Statements** shall describe management's responsibility for (SM 8.15):

- (a) preparing the financial statements in accordance with the applicable financial reporting framework, and for such internal control as management determines is necessary to enable the preparation of financial statements that are free from material misstatement, whether due to fraud or error (because of the possible effects of fraud on other aspects of the audit, materiality does not apply to management's acknowledgement of its responsibility for the design, implementation and maintenance of internal control to prevent and detect fraud); and
- (b) assessing the entity's ability to continue as a going concern and whether the use of the going concern basis of accounting is appropriate, as well as disclosing, if applicable, matters relating to going concern. The explanation shall include a description of when the use of the going concern basis of accounting is appropriate.

Describing both responsibilities explains to users the premise of [[aud.nature.sa200|SA 200]] on which an audit is conducted; [[aud.ethics.sa210|SA 210]] requires them to be agreed in an engagement letter or other written agreement. When those responsible for oversight of the financial reporting process differ from management, this section shall also identify them, and its heading shall also refer to "Those Charged with Governance" or an appropriate term (SM 8.15–8.16).

**Auditor's Responsibilities for the Audit of the Financial Statements** has three groups of statements (SM 8.17–8.20):

::: steps
1. **The aim.** The section shall state (a) that the objectives of the auditor are to (i) obtain reasonable assurance about whether the financial statements as a whole are free from material misstatement, whether due to fraud or error, and (ii) issue an auditor's report that includes the auditor's opinion; (b) that reasonable assurance is a high level of assurance, but is **not a guarantee** that an audit conducted in accordance with SAs will always detect a material misstatement when it exists; and (c) that misstatements can arise from fraud or error, and either (i) describe that they are considered material if, individually or in the aggregate, they could reasonably be expected to influence the economic decisions of users taken on the basis of these financial statements, or (ii) provide a definition or description of materiality in accordance with the applicable framework.
2. **The work.** It shall further (a) state that, as part of an audit in accordance with SAs, the auditor exercises professional judgement and maintains professional skepticism throughout the audit; and (b) describe an audit by stating that the auditor's responsibilities are: (i) to identify and assess the risks of material misstatement, whether due to fraud or error, design and perform audit procedures responsive to those risks, and obtain sufficient appropriate audit evidence (the risk of not detecting a material misstatement resulting from fraud is higher than for one resulting from error, as fraud may involve collusion, forgery, intentional omissions, misrepresentations, or the override of internal control); (ii) to obtain an understanding of internal control relevant to the audit in order to design procedures appropriate in the circumstances; (iii) to evaluate the appropriateness of accounting policies used and the reasonableness of accounting estimates and related disclosures made by management; (iv) to conclude on the appropriateness of management's use of the going concern basis of accounting and, based on the evidence obtained, whether a material uncertainty exists that may cast significant doubt on the entity's ability to continue as a going concern; (v) under a fair presentation framework, to evaluate the overall presentation, structure and content of the financial statements, including the disclosures, and whether they represent the underlying transactions and events in a manner that achieves fair presentation. (c) When SA 600 applies, it describes the division of responsibility, indicating the extent to which components audited by other auditors are included (for example the number of branches or subsidiaries they audited).
3. **The talking.** It also shall (a) state that the auditor communicates with those charged with governance regarding, among other matters, the planned scope and timing of the audit and significant audit findings, including any significant deficiencies in internal control identified during the audit; (b) for listed entities, state that the auditor provides those charged with governance with a statement of compliance with relevant ethical requirements regarding independence, and communicates all relationships and other matters that may reasonably be thought to bear on independence and, where applicable, related safeguards; and (c) for listed entities and others whose key audit matters are communicated under SA 701, state that from the matters communicated with those charged with governance the auditor determines the key audit matters, and describes them unless law or regulation precludes public disclosure.
:::

This description sits **within the body** of the report, **in an appendix** referred to in the report, or, where law, regulation or national auditing standards expressly permit, at a specific reference to **a website of an appropriate authority** (SM 8.20).

**Other reporting responsibilities** (SM 8.21):

- Responsibilities in addition to those under the SAs shall be addressed in a separate section headed "**Report on Other Legal and Regulatory Requirements**" (or as appropriate to its content), unless they address the same topics as the elements required by the SAs, in which case they may be presented in the same section.
- If presented in the same section, the report shall clearly differentiate them from the reporting required by the SAs.
- If there is a separate section, the SA elements go under the heading "**Report on the Audit of the Financial Statements**", and the "Report on Other Legal and Regulatory Requirements" follows it.

For a company, that second part carries the reporting under [[aud.report.companies|the Companies Act, 2013]] and [[aud.report.caro|CARO 2020]].

**Signature, place and date.** The engagement partner signs in his personal name and, where a firm is appointed, in the firm's name, with his **membership number**, the **firm registration number** and the **UDIN** (SM 8.21–8.23). The place is ordinarily the city of signing. The date is **no earlier than** the date on which the auditor has obtained sufficient appropriate evidence, including evidence that (i) all the statements, including the notes, have been prepared and (ii) those with the recognised authority have asserted that they have taken responsibility for them. The date tells users that the auditor has considered the effect of events and transactions of which the auditor became aware and that occurred up to that date; events after it fall under [[aud.complete.sa560|SA 560]] (SM 8.22).

**UDIN** (Unique Document Identification Number): a system-generated 18-digit alphanumeric number, introduced by ICAI to curb non-CAs posing as CAs and forging CAs' signatures; it helps secure documents issued by practising CAs. Mandatory for all certificates from 1st February 2019; generated on the UDIN portal by CAs holding a full-time certificate of practice; stated on audit reports and certificates (SM 8.22–8.23, 8.100).

## Formats and formulas

### Opinion and Basis for Opinion, ready to draft

*Reproduce from memory (ICAI's Illustrations 3 and 4, SM 8.12–8.13, 8.26–8.27).*

**Opinion.** We have audited the standalone financial statements of Tapri Tea Co. Ltd ("the Company"), which comprise the Balance Sheet as at 31st March 2026, the Statement of Profit and Loss, the Statement of Changes in Equity and the Statement of Cash Flows for the year then ended, and notes to the financial statements, including a summary of significant accounting policies and other explanatory information. In our opinion and to the best of our information and according to the explanations given to us, the aforesaid standalone financial statements give the information required by the Act in the manner so required and give a true and fair view in conformity with the accounting principles generally accepted in India, of the state of affairs of the Company as at 31st March 2026, and profit, changes in equity and its cash flows for the year ended on that date.

**Basis for Opinion.** We conducted our audit in accordance with the Standards on Auditing (SAs) specified under section 143(10) of the Companies Act, 2013. Our responsibilities under those Standards are further described in the Auditor's Responsibilities for the Audit of the Financial Statements section of our report. We are independent of the Company in accordance with the Code of Ethics issued by the Institute of Chartered Accountants of India together with the ethical requirements that are relevant to our audit of the financial statements under the provisions of the Companies Act, 2013 and the Rules thereunder, and we have fulfilled our other ethical responsibilities in accordance with these requirements and the Code of Ethics. We believe that the audit evidence we have obtained is sufficient and appropriate to provide a basis for our opinion.

ICAI's "according to the explanations given to us" is not a "subject to": the opinion stays unconditional.

## Worked examples

:::: example Bunty's draft, marked in red
Bunty's draft of the 2025-26 report on Tapri Tea Co. Ltd reads:

1. Title "Audit Report", addressed "To the Board of Directors".
2. Opinion: "In our opinion, subject to the explanations given by management, the financial statements give a true and fair view …".
3. No Basis for Opinion section, "since the opinion is clean".
4. Signed "Iyer & Associates" only: no partner's name, membership number, UDIN or place.
5. Dated 14 May 2026, the last day of fieldwork; the board approves the financial statements on 22 May 2026.

Point out the deficiencies with reference to SA 700 (Revised).

::: answer Model answer
**Relevant provision.** SA 700 (Revised) requires a written report with specific headings: a title indicating an independent auditor; an addressee (for a company, its shareholders); Opinion, directly followed by Basis for Opinion; signature, place and date. An unmodified opinion says "give a true and fair view" or "present fairly, in all material respects", never "subject to". The report is dated no earlier than sufficient appropriate evidence, including evidence that those with the recognised authority have taken responsibility for the financial statements.

**Facts and analysis.**

1. Title: "Independent Auditor's Report"; addressee: "To the Members of Tapri Tea Co. Ltd".
2. "Subject to" suggests a conditional or weakened opinion; a clean opinion says plainly "give a true and fair view".
3. Basis for Opinion is required with every opinion, as it provides context about the opinion.
4. The engagement partner signs in her personal name and the firm's name, with membership number, firm registration number and UDIN; the place is stated.
5. Until the board approves the statements on 22 May 2026, those with the recognised authority have not taken responsibility for them: 14 May is too early.

**Conclusion.** The draft does not comply with SA 700 (Revised). Correct each element and date the report no earlier than 22 May 2026.
:::
::::

:::: example Kesar's favourite corrections
In Tapri's 2025-26 audit (overall materiality ₹1.50 crore), Iyer & Associates proposed five adjustments. Management booked the two that increase profit (interest on fixed deposits not accrued, ₹31 lakh; an expense entered twice, ₹22 lakh) and refused the three that reduce it (unrecorded credit notes for sales returns, ₹44 lakh; depreciation short-charged, ₹36 lakh; a missed freight accrual, ₹28 lakh). Every estimate sits at the profit-friendly end of an acceptable range.

> **Kesar:** The three you want are only ₹1.08 crore together. Your materiality is ₹1.50 crore. Clean report, please.

Can Lakshmi conclude that the financial statements are free from material misstatement merely because uncorrected misstatements are below materiality? Discuss with reference to SA 700 (Revised).

::: answer Model answer
**Relevant provision.** As per SA 700 (Revised), the conclusion on reasonable assurance takes into account the evidence, whether uncorrected misstatements are material individually or in aggregate, and the evaluations, including indicators of possible bias in management's judgements. The cumulative effect of lack of neutrality, together with uncorrected misstatements, may cause the financial statements as a whole to be materially misstated. Indicators include the selective correction of misstatements (correcting those that increase reported earnings but not those that decrease them) and possible bias in accounting estimates.

**Facts of the case.** Uncorrected misstatements total ₹44 + ₹36 + ₹28 = ₹108 lakh, 72% of materiality. Both corrected items (₹53 lakh) increase profit; all three refused items reduce it; every estimate leans towards higher profit.

**Analysis.** The arithmetic test is passed, but that is not enough. Correcting only profit-increasing items is the Study Material's own example of lack of neutrality; consistently favourable estimates indicate possible bias. Neither indicator is itself a misstatement, but both bear on the statements as a whole.

**Conclusion.** No. Lakshmi must evaluate the cumulative effect of the lack of neutrality together with the ₹1.08 crore of uncorrected misstatements. If the financial statements as a whole are materially misstated, she cannot express an unmodified opinion and shall modify it in accordance with SA 705.
:::
::::

## Under the hood

### When law or regulation prescribes the layout

When law or regulation requires a specific layout or wording, differing from SAs only in layout and wording, the report shall refer to Standards on Auditing only if it includes, at a minimum (SM 8.24–8.25):

- (a) a title;
- (b) an addressee, as required by the circumstances of the engagement;
- (c) an Opinion section containing an expression of opinion and a reference to the applicable financial reporting framework;
- (d) an identification of the entity's financial statements that have been audited;
- (e) a statement that the auditor is independent and has fulfilled other ethical responsibilities, referring to ICAI's Code of Ethics;
- (f) where applicable, a going concern section not inconsistent with SA 570 (Revised);
- (g) where applicable, a Basis for Qualified (or Adverse) Opinion section not inconsistent with SA 570 (Revised)'s going concern reporting;
- (h) where applicable, the information required by SA 701, or additional information prescribed by law or regulation not inconsistent with it;
- (i) a description of management's responsibilities and an identification of those responsible for oversight of financial reporting, not inconsistent with SA 700;
- (j) a reference to Standards on Auditing and the law or regulation, and a description of the auditor's responsibilities, not inconsistent with SA 700;
- (k) the auditor's signature;
- (l) the place of signature; and
- (m) the date of the auditor's report.

Other SA 700 requirements, such as the order of the Opinion and Basis for Opinion sections, then need not be applied (SM 8.24).

## Exam angle

::: exam Where SA 700 appeared, May 2024 to September 2026
SA 700 appeared in 9 of the new-scheme documents read:

- **Descriptive, 3 to 5 marks.** Basis for Opinion: MTP January 2026 Series I Q4(c) (4 marks); May 2026 Q3(b) (1 + 4). Factors in the reasonable assurance conclusion: MTP May 2024 Series II Q4(b) (4). Specific evaluations and fair presentation: MTP May 2026 Series I Q5(a) (5). Management's responsibilities: MTP May 2025 Series I Q4(a) (5). Consistency, flexibility and the objectives: MTP September 2026 Series I Q5(a) (5). Opinion phrases: September 2024 Q4(c) (3).
- **UDIN**: RTP January 2025 Q17; September 2024 MCQ 15 (ICAI's key: UDIN for the export sales certificate, not for balance confirmation letters).
- **Via SA 705**: elements dropped in a disclaimer, January 2025 Q3(c) (4).

Old-scheme RTPs and MTPs asked for the lack-of-neutrality indicators, "with examples".
:::

::: trick Fourteen elements in six moves
"Name it, judge it, flag it, split the blame, add the law, sign it." Title, addressee; opinion, basis; going concern, key audit matters, other information; management's and auditor's responsibilities and where the latter sit; other reporting responsibilities; signature, place, date. Condition: the order for an audit under SAs (SM 8.9); a layout prescribed by law may differ.
:::

## Answer frame

### "Explain what this section contains"

Heading in quotation marks, its position ("directly following the Opinion section"), its points in ICAI's order and words, then why it matters ("provides important context about the auditor's opinion"). A draft-report case: provision, facts, analysis, the corrected element.

### "Distinguish between a fair presentation framework and a compliance framework"

| Point | Fair presentation framework | Compliance framework |
|---|---|---|
| Compliance with the framework | Required | Required |
| Disclosures beyond the framework | Acknowledged as possibly necessary | No such acknowledgement |
| Departure from a requirement | Acknowledged explicitly, extremely rare | No such acknowledgement |
| Auditor's extra evaluation | Whether fair presentation is achieved | Not required |

## Common mistakes

::: mistake Hall of Shame: the clean opinion "subject to" Kesar's explanations
**Fix:** "give a true and fair view" or "present fairly, in all material respects"; "subject to" suggests a conditional opinion (SM 8.11).
:::

::: mistake "The opinion is clean, so no Basis for Opinion"
**Fix:** the Basis for Opinion section is in every report under SA 700, modified or not (SM 8.12, 8.100).
:::

::: mistake Dating the report on the last day of fieldwork
**Fix:** no earlier than sufficient appropriate evidence, including that those with the recognised authority have taken responsibility for the statements (SM 8.22).
:::


## Practice

::: quiz Check yourself
Q: Case scenario. CA Rohan Desai audits Nagpur Namkeen Ltd: evidence sufficient and appropriate, uncorrected misstatements immaterial, evaluations clear. Which opinion sentence is appropriate?
- [ ] "Subject to the explanations given by management, the financial statements give a true and fair view …"
- [ ] "With the foregoing explanation, the financial statements present fairly, in all material respects, …"
- [x] "The accompanying financial statements give a true and fair view of … in accordance with [the framework]."
- [ ] "Except for the matters explained to us orally, the financial statements give a true and fair view …"
> "Subject to" and "with the foregoing explanation" suggest a conditional opinion; "except for" is qualified wording.

Q: Fieldwork on Masala Mills Ltd ends on 12 May 2026, its board approves the financial statements on 18 May, and the last evidence (a lawyer's reply) arrives on 21 May. What is the earliest date the report may carry?
- [ ] 31 March 2026
- [ ] 12 May 2026
- [ ] 18 May 2026
- [x] 21 May 2026
> Sufficient appropriate evidence, including the board taking responsibility, is complete only on 21 May.

Q: Which statements belong in the Basis for Opinion section? Select all that apply.
- [x] The audit was conducted in accordance with Standards on Auditing
- [x] A reference to the section describing the auditor's responsibilities
- [x] The auditor is independent and has fulfilled other ethical responsibilities
- [ ] The materiality figure used in the audit
- [x] Whether the evidence obtained is sufficient and appropriate to provide a basis for the opinion
> SM 8.12's four statements. Materiality is only described, in the auditor's responsibilities section.

Q: Where may the description of the auditor's responsibilities NOT be placed?
- [ ] An appendix referred to in the report
- [ ] An appropriate authority's website, where expressly permitted
- [x] The company's own web page, to shorten the report
- [ ] Within the body of the report
> Only the body, an appendix, or an appropriate authority's website where expressly permitted.
:::

## Recap

- Objectives: form an opinion from an evaluation of the conclusions drawn from the evidence; express it clearly in a written report.
- Reasonable assurance: sufficient appropriate evidence; uncorrected misstatements not material; the evaluations, including bias.
- Lack of neutrality: selective correction of misstatements; possible bias in estimates.
- Specific evaluations: policies disclosed and appropriate, estimates reasonable, information relevant, reliable, comparable and understandable, disclosures adequate, terminology appropriate.
- Unmodified: "true and fair view" or "present fairly, in all material respects"; never "subject to" or "with the foregoing explanation".
- Fourteen elements, title to date; Basis for Opinion follows the Opinion in every report.
- Dated no earlier than complete evidence; partner's signature, membership number, FRN, UDIN. (No certificate before the check-up.)

## Flashcards

Q:: SA 700: what are the objectives of the auditor?
A:: To form an opinion on the financial statements based on an evaluation of the conclusions drawn from the audit evidence obtained; and to express clearly that opinion through a written report.

Q:: SA 700: the conclusion on reasonable assurance takes into account which three things?
A:: (a) Whether sufficient appropriate audit evidence has been obtained; (b) whether uncorrected misstatements are material, individually or in aggregate; (c) the evaluations.

Q:: SA 700: two indicators of a lack of neutrality?
A:: (i) Selective correction of misstatements brought to management's attention (e.g. correcting those that increase earnings but not those that decrease them); (ii) possible management bias in making accounting estimates.

Q:: SA 700: the six specific evaluations?
A:: Whether (a) significant accounting policies are adequately disclosed; (b) policies are consistent with the framework and appropriate; (c) estimates are reasonable; (d) information is relevant, reliable, comparable and understandable; (e) disclosures are adequate; (f) terminology, including statement titles, is appropriate.

Q:: SA 700: the extra evaluation under a fair presentation framework?
A:: Whether fair presentation is achieved, considering (a) the overall presentation, structure and content, and (b) whether the statements, including notes, represent the underlying transactions and events in a manner that achieves fair presentation.

Q:: SA 700: fair presentation framework versus compliance framework?
A:: Both require compliance with the framework; a fair presentation framework also acknowledges that extra disclosures, or in extremely rare cases departures, may be necessary to achieve fair presentation. A compliance framework has no such acknowledgements.

Q:: SA 700: the fourteen elements of the auditor's report, in order?
A:: Title; addressee; opinion; basis for opinion; going concern; key audit matters; other information; responsibilities for the financial statements; auditor's responsibilities; location of that description; other reporting responsibilities; signature; place; date.

Q:: SA 700: besides the opinion, what must the Opinion section do?
A:: Identify the entity; state that the financial statements have been audited; identify the title of each statement; refer to the notes, including the summary of significant accounting policies; specify the date of, or period covered by, each statement.

Q:: SA 700: what does the Basis for Opinion section state?
A:: That the audit was conducted per SAs; a reference to the auditor's responsibilities section; the independence and ethics statement; whether the evidence is sufficient and appropriate to provide a basis for the opinion.

Q:: SA 700: which phrases may not be used with an unmodified opinion, and why?
A:: "With the foregoing explanation" or "subject to": they suggest a conditional opinion or a weakening or modification of the opinion.

Q:: SA 700: the report is dated no earlier than when?
A:: The date on which sufficient appropriate audit evidence has been obtained, including evidence that all the statements, including notes, have been prepared and that those with the recognised authority have asserted responsibility for them.

Q:: SA 700: where may the description of the auditor's responsibilities be located?
A:: Within the body of the report; in an appendix referred to in the report; or by a specific reference to a website of an appropriate authority where law, regulation or national auditing standards expressly permit.
