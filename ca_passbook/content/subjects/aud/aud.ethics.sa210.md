---
id: aud.ethics.sa210
title: SA 210: agreeing the terms of audit engagements
minutes: 32
needs: aud.nature.sa200
tags: SA 210, engagement letter, preconditions for an audit, terms of engagement, change in terms, recurring audits, limitation on scope
labs:
summary: The preconditions the auditor must establish before accepting an audit, the engagement letter and what it contains, refusing a crippling scope limitation, requests to change the terms, and when recurring audits need revised terms.
---

## In plain words

### Pammi's audit, with conditions

Kesar's neighbour Pammi Arora runs Arora Mithai & Sons, a partnership firm. Its bank wants audited accounts, so Pammi calls Iyer & Associates.

> **Pammi:** Lakshmi-ji, do the audit. But your team talks only to munim-ji, and controls are his department, not mine.
> **Lakshmi:** Before I say yes, Pammi-ji, you will sign that the accounts and the controls are yours, and that my team can see anything and anyone.
> **Bunty:** Ma'am, can't we start now and sort the letter out later?
> **Lakshmi:** "Later" is where audits go to die, Bunty.

An audit stands on a premise: management prepares the accounts on a recognised basis, runs the controls needed to keep them free of material misstatement, and opens every door to the auditor. The auditor checks before saying yes. These are the **preconditions for an audit**: the accounts are prepared under an **acceptable financial reporting framework**, and management **agrees** that these responsibilities are its own. If either is missing, the auditor does not accept, unless the law requires it.

Then the agreed terms go into an **engagement letter**, sent by the auditor to the client: what the audit covers, who does what, which framework applies, and what the report should look like (warning that it may differ). SA 210 also stops a client from crippling the audit before it starts, or shrinking it midway to escape a bad report. In later years the letter is revised, or the client reminded, when things change.

::: analogy The tailor's order slip
Before cutting cloth, a good tailor writes an order slip: what will be stitched, from which fabric (he will not promise a suit from cloth that cannot hold one), what the customer must do (bring the cloth, come for trials) and what he will do, and roughly how it will look, with "subject to fitting" at the bottom. A customer who says "no trials" does not get a fitted suit. Switching to "just alter it" midway is fine if the occasion changed; it is not fine because the cloth turned out short. And a regular customer gets a new slip when he wants something new.
:::

::: key
Accept or continue an audit only when its basis is agreed: the preconditions are present (an acceptable framework, and management's acknowledgement of its responsibilities) and the terms are commonly understood and recorded in an engagement letter or other written agreement.
:::

## How it works

### 1. Scope and objective

SA 210, "Agreeing the Terms of Audit Engagements", deals with the auditor's responsibilities in agreeing the terms of the audit engagement with management and, where appropriate, those charged with governance, including establishing that certain preconditions for an audit, responsibility for which rests with management, are present (SM 11.14).

**Objective.** To accept or continue an audit engagement only when the basis upon which it is to be performed has been agreed, through (SM 11.15):

- (A) establishing whether the preconditions for an audit are present; and
- (B) confirming that there is a common understanding between the auditor and management and, where appropriate, those charged with governance of the terms of the audit engagement.

### 2. The preconditions

::: definition Preconditions for an audit
The use by management of an acceptable financial reporting framework in the preparation of the financial statements and the agreement of management and, where appropriate, those charged with governance to the premise on which an audit is conducted (SM 11.15).
:::

To establish whether the preconditions are present, the auditor shall (SM 11.15–11.16):

- (a) determine whether the financial reporting framework is acceptable; and
- (b) obtain the agreement of management that it acknowledges and understands its responsibility:
  - (i) for the preparation of the financial statements in accordance with the applicable financial reporting framework, including where relevant their fair presentation;
  - (ii) for such internal control as management considers necessary to enable the preparation of financial statements that are free from material misstatement, whether due to fraud or error; and
  - (iii) to provide the auditor with: access to all information of which management is aware that is relevant to the preparation of the financial statements, such as records, documentation and other matters; additional information that the auditor may request for the purpose of the audit; and ==unrestricted access to persons within the entity== from whom the auditor determines it necessary to obtain audit evidence.

### 3. When the auditor shall not accept

**Preconditions not present.** The auditor shall discuss the matter with management. Unless required by law or regulation to do so, the auditor shall not accept the proposed audit engagement (SM 11.21):

- (a) if the financial reporting framework to be applied is unacceptable; or
- (b) if management's agreement on its responsibilities (preparation of the financial statements, internal control, access to information and persons) is not obtained.

**Limitation on scope before acceptance.** If management or those charged with governance impose a limitation on the scope of the auditor's work in the terms of a proposed audit engagement such that the auditor believes it will result in a **disclaimer of opinion**, the auditor shall not accept such a limited engagement as an audit engagement, unless required by law or regulation to do so (SM 11.21). (A limitation imposed *after* acceptance is handled by [[aud.report.sa705|SA 705]].)

::: diagram Before saying yes
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Proposed audit\nengagement"}, {"id": "p", "kind": "decision", "label": "Preconditions\npresent?"}, {"id": "dm", "kind": "process", "label": "Discuss with\nmanagement"}, {"id": "l", "kind": "decision", "label": "Proposed limitation\nwould lead to a\ndisclaimer?"}, {"id": "law", "kind": "decision", "label": "Required by law\nor regulation?"}, {"id": "t", "kind": "process", "label": "Agree the terms;\nengagement letter"}, {"id": "acc", "kind": "end", "label": "Accept, as\nlaw requires", "color": "c"}, {"id": "no", "kind": "end", "label": "Do not accept\nas an audit", "color": "bad"}, {"id": "go", "kind": "end", "label": "Accept the\naudit", "color": "ok"}], "edges": [["s", "p"], ["p", "dm", "no"], ["p", "l", "yes"], ["dm", "law"], ["l", "law", "yes"], ["l", "t", "no"], ["law", "acc", "yes"], ["law", "no", "no"], ["t", "go"]], "caption": "Preconditions: an acceptable framework, and management's agreement to its three responsibilities. Green: the normal path. Rose: the auditor does not accept. Amber: the rare case where law or regulation requires acceptance."}
:::

### 4. Agreeing the terms: the engagement letter

Except where law requires accounts to be audited (for example, companies), an audit is a matter of contract between auditor and client; each party should be clear about the nature of the engagement, which must be reduced to writing and should exactly specify the scope of the work (SM 11.16).

The auditor shall agree the terms of the audit engagement with management or those charged with governance, as appropriate. The agreed terms shall be recorded in an **audit engagement letter or other suitable form of written agreement**. The letter is **sent by the auditor to the client**; issuing it is in the interest of both, so that the possibility of misunderstanding is reduced to a great extent (SM 11.16). It includes (SM 11.16–11.17):

- (a) the objective and scope of the audit of the financial statements;
- (b) the responsibilities of the auditor;
- (c) the responsibilities of management;
- (d) identification of the applicable financial reporting framework for the preparation of the financial statements; and
- (e) reference to the expected form and content of any reports to be issued by the auditor, and a statement that there may be circumstances in which a report may differ from its expected form and content.

**When law prescribes the terms.** If law or regulation prescribes the terms of the audit engagement in sufficient detail, the auditor need not record them in a written agreement, except for the fact that such law or regulation applies and that management acknowledges and understands its responsibilities (SM 11.17).

Sending the engagement letter is also one of the auditor's **preliminary engagement activities** before planning the audit ([[aud.plan.sa300|SA 300]]; SM 2.9).

### 5. A request to change the terms

The auditor shall not agree to a change in the terms of the audit engagement where there is **no reasonable justification** for doing so (SM 11.21).

**Why a client asks.** A request may result from a change in circumstances affecting the need for the service, a misunderstanding as to the nature of an audit as originally requested, or a restriction on the scope of the engagement, whether imposed by management or caused by other circumstances. The auditor considers the justification, particularly the implications of a scope restriction (SM 11.21–11.22).

- **May be reasonable**: a change in circumstances that affects the entity's requirements, or a misunderstanding concerning the nature of the service originally requested.
- **May not be reasonable**: a change that appears to relate to information that is incorrect, incomplete or otherwise unsatisfactory. ICAI's example: the auditor cannot obtain sufficient appropriate audit evidence regarding receivables, and the entity asks for the audit to be changed to a review engagement ==to avoid a qualified opinion or a disclaimer of opinion== (SM 11.22).

**Moving to a lower level of assurance.** If, before completing the audit, the auditor is asked to change it to an engagement conveying lower assurance (a review or a related service), the auditor shall determine whether there is reasonable justification, and may also need to assess any legal or contractual implications of the change. If it is justified, the audit work done to date may be relevant to the changed engagement, but the work required and the report issued are those appropriate to the revised engagement. To avoid confusing the reader, the report on the related service would not refer to (a) the original audit engagement or (b) any procedures performed in it, except where the change is to an engagement to undertake agreed-upon procedures, where reference to the procedures performed is a normal part of the report (SM 11.22–11.23).

**New terms in writing.** If the terms are changed, the auditor and management shall agree on and record the new terms in an engagement letter or other suitable written agreement (SM 11.23).

**No agreement, no continuation.** If the auditor is unable to agree to a change and is not permitted by management to continue the original audit engagement, the auditor shall (SM 11.23):

- (a) withdraw from the audit engagement where possible under applicable law or regulation; and
- (b) determine whether there is any obligation, either contractual or otherwise, to report the circumstances to other parties, such as those charged with governance, owners or regulators.

::: diagram A request to change the terms
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Request to\nchange terms"}, {"id": "j", "kind": "decision", "label": "Reasonable\njustification?"}, {"id": "a", "kind": "end", "label": "Agree; record the\nnew terms in writing", "color": "ok"}, {"id": "c", "kind": "decision", "label": "Original audit\nmay continue?"}, {"id": "k", "kind": "end", "label": "Continue the\noriginal audit", "color": "ok"}, {"id": "w", "kind": "end", "label": "Withdraw where\nlaw permits", "color": "bad"}], "edges": [["s", "j"], ["j", "a", "yes"], ["j", "c", "no"], ["c", "k", "yes"], ["c", "w", "no"]], "caption": "Before agreeing to a lower level of assurance, the auditor may also need to assess legal or contractual implications; the work and report are those of the revised engagement, and the report does not mention the original audit or its procedures (except for agreed-upon procedures). Rose: withdrawal where possible under law, after which the auditor determines whether to report the circumstances to those charged with governance, owners or regulators."}
:::

### 6. Recurring audits

On recurring audits, the auditor shall assess whether circumstances require the terms to be revised, and whether there is a need to remind the entity of the existing terms. The auditor may decide not to send a new engagement letter or other written agreement each period. The following factors may make it appropriate to **revise the terms or remind the entity** (SM 11.23–11.24):

1. Any indication that the entity misunderstands the objective and scope of the audit.
2. Any revised or special terms of the audit engagement.
3. A recent change of senior management.
4. A significant change in ownership.
5. A significant change in nature or size of the entity's business.
6. A change in legal or regulatory requirements.
7. A change in the financial reporting framework adopted in the preparation of the financial statements.
8. A change in other reporting requirements.

## Formats and formulas

### ICAI's example engagement letter (SM 11.17–11.20)

*Reproduce the headings in order, and the auditor's and management's responsibilities point by point: May 2026 asked for five of the auditor's responsibilities for 5 marks. ICAI's example is from PJ Shrimali & Co. to Pristine Products Limited; the wording below is ICAI's, with Tapri's names put in.*

*Iyer & Associates, Chartered Accountants, Indore. [Date]*

To the Board of Directors of Tapri Tea Co. Ltd

**The objective and scope of the audit**

You have requested that we audit the financial statements of Tapri Tea Co. Ltd, which comprise the Balance Sheet as at March 31st, 20XX, the Statement of Profit & Loss, Cash Flow Statement for the year then ended, and notes to the financial statements, including a summary of significant accounting policies and other explanatory information.

We are pleased to confirm our acceptance and our understanding of this audit engagement by means of this letter. The objectives of our audit are to obtain reasonable assurance about whether the financial statements as a whole are free from material misstatement, whether due to fraud or error, and to issue an auditor's report that includes our opinion. Reasonable assurance is a high level of assurance, but is not a guarantee that an audit conducted in accordance with Standards on Auditing (SAs) will always detect a material misstatement when it exists. Misstatements can arise from fraud or error and are considered material if, individually or in the aggregate, they could reasonably be expected to influence the economic decisions of users taken on the basis of these financial statements.

**The responsibilities of the auditor**

We will conduct our audit in accordance with Standards on Auditing (SAs) issued by the Institute of Chartered Accountants of India (ICAI). Those Standards require that we comply with ethical requirements. As part of an audit in accordance with SAs, we exercise professional judgment and maintain professional skepticism throughout the audit. We also:

- Identify and assess the risks of material misstatement of the financial statements, whether due to fraud or error, design and perform audit procedures responsive to those risks, and obtain audit evidence that is sufficient and appropriate to provide a basis for our opinion. The risk of not detecting a material misstatement resulting from fraud is higher than for one resulting from error, as fraud may involve collusion, forgery, intentional omissions, misrepresentations, or the override of internal control.
- Obtain an understanding of internal control relevant to the audit in order to design audit procedures that are appropriate in the circumstances but not for the purpose of expressing an opinion on the effectiveness of the company's internal control. However, we will communicate to you in writing concerning any significant deficiencies in internal control relevant to the audit of the financial statements that we have identified during the audit.
- Evaluate the appropriateness of accounting policies used and the reasonableness of accounting estimates and related disclosures made by management.
- Conclude on the appropriateness of management's use of the going concern basis of accounting and, based on the audit evidence obtained, whether a material uncertainty exists related to events or conditions that may cast significant doubt on the company's ability to continue as a going concern. If we conclude that a material uncertainty exists, we are required to draw attention in our auditor's report to the related disclosures in the financial statements or, if such disclosures are inadequate, to modify our opinion. Our conclusions are based on the audit evidence obtained up to the date of our auditor's report. However, future events or conditions may cause the company to cease to continue as a going concern.
- Evaluate the overall presentation, structure and content of the financial statements, including the disclosures, and whether the financial statements represent the underlying transactions and events in a manner that achieves fair presentation.

Because of the inherent limitations of an audit, together with the inherent limitations of internal control, there is an unavoidable risk that some material misstatements may not be detected, even though the audit is properly planned and performed in accordance with SAs.

**The responsibilities of management**

Our audit will be conducted on the basis that management and, where appropriate, those charged with governance acknowledge and understand that they have responsibility:

- (a) For the preparation of financial statements that give a true and fair view in accordance with the financial reporting Standards. This includes:
  - The responsibility for the preparation of financial statements on a going concern basis.
  - The responsibility for selection and consistent application of appropriate accounting policies, including implementation of applicable accounting standards along with proper explanation relating to any material departures from those accounting standards.
  - The responsibility for making judgments and estimates that are reasonable and prudent so as to give a true and fair view of the state of affairs of the entity at the end of the financial year and of the profit or loss of the entity for that period.
- (b) For such internal control as management determines is necessary to enable the preparation of financial statements that are free from material misstatement, whether due to fraud or error; and
- (c) To provide us with:
  - (i) Access, at all times, to all information, including the books, accounts, vouchers and other records and documentation, of the company, whether kept at the head office of the company or elsewhere, of which management is aware that is relevant to the preparation of the financial statements such as records, documentation and other matters;
  - (ii) Additional information that we may request from management for the purpose of the audit; and
  - (iii) Unrestricted access to persons within the entity from whom we determine it necessary to obtain audit evidence. This includes our entitlement to require from the officers of the company such information and explanations as we may think necessary for the performance of our duties as auditor. As part of our audit process, we will request from management and, where appropriate, those charged with governance, written confirmation concerning representations made to us in connection with the audit.

**Fees**

Our fees bill for ₹ XXXXXX (plus applicable taxes) and out of pocket expenses will be raised after completion of audit work.

**Reporting**

We will report to the members of Tapri Tea Co. Ltd as a body, whether in our opinion, the financial statements give the information required by the Companies Act, 2013 in the manner so required and give a true and fair view in conformity with the accounting principles generally accepted in India, of the state of affairs of the company as at March 31, 20XX, and its profit/loss, and its cash flows for the year ended on that date. The form and content of our report may need to be amended in the light of our audit findings.

Please sign and return the attached copy of this letter to indicate your acknowledgement of, and agreement with, the arrangements for our audit of the financial statements including our respective responsibilities.

For Iyer & Associates, Chartered Accountants. Firm's Registration Number. (Signature) (Name of the Member) (Designation)

## Worked examples

:::: example Pammi signs, then adds a line
Arora Mithai & Sons, a partnership firm whose four partners all work in the business, offers Iyer & Associates the audit of its 2025-26 accounts, which its bank requires under its loan agreement. The partners sign the draft engagement letter, acknowledging every responsibility in it, but Pammi Arora, the managing partner, adds in her own hand: "Excluding the Kanpur factory (70% of the business), run by my brother. Its books will not be shown to the auditors."

Required:

(a) Advise Lakshmi under SA 210 whether to accept the engagement. Does it matter that the bank insists on audited accounts?

(b) Suppose instead that the letter had been signed without the added line, and that three weeks into the audit Pammi's brother refuses the team access to the Kanpur books. How does Lakshmi's position differ?

::: answer Model answer
**(a) Relevant provision.** As per SA 210, if management or those charged with governance impose a limitation on the scope of the auditor's work in the terms of a proposed audit engagement such that the auditor believes the limitation will result in the auditor disclaiming an opinion on the financial statements, the auditor shall not accept such a limited engagement as an audit engagement, unless required by law or regulation to do so (SM 11.21).

**Facts and analysis.** The added line is a limitation imposed in the proposed terms. The Kanpur factory carries 70% of the business, so the possible effects of undetected misstatements there would be both material and pervasive: Lakshmi would expect to disclaim an opinion. The line also takes back, for 70% of the business, the access to information acknowledged above it, a precondition (SM 11.16). The bank's insistence comes from a loan agreement, not from a law or regulation requiring Lakshmi to accept, so the exception does not apply.

**Conclusion.** Lakshmi should discuss the matter with the partners and, unless the line is withdrawn, **not accept** the engagement as an audit engagement.

**(b) After acceptance.** A limitation imposed after the auditor has accepted the engagement falls under SA 705 ([[aud.report.sa705|SA 705]]; SM 8.40–8.41). Lakshmi shall request the partners to remove it. If they refuse, she communicates the matter to those charged with governance, unless all of them are involved in managing the entity (here all four partners manage it), and determines whether alternative procedures can provide sufficient appropriate audit evidence. If they cannot, the possible effects on 70% of the business are both material and pervasive: she withdraws from the audit where practicable and possible under applicable law or regulation, or, if withdrawal is not practicable or possible, disclaims an opinion.
:::
::::

:::: example Two requests to change the terms
Iyer & Associates are three weeks into each of these audits.

(a) Ramesh Kirana Stores, a sole proprietorship that no law or lender requires to be audited, signed an audit engagement letter. It now emerges that Ramesh had wanted his accounts compiled for his income-tax return, believing that this was what an "audit" meant, and he asks for the engagement to be changed to a compilation.

(b) Narmada Agro Traders, a partnership firm, is audited because its loan agreement with Indore Co-operative Bank requires audited accounts every year until the loan is repaid in 2027. The audit has found nothing unusual, but the partners ask for a review instead, "because the audit fee is too high".

Required: Comment on each request under SA 210, and state what Lakshmi should do if, in situation (b), the partners will not let the audit continue.

::: answer Model answer
**Relevant provision.** As per SA 210, the auditor shall not agree to a change in the terms of the audit engagement where there is no reasonable justification for doing so. A change in circumstances that affects the entity's requirements, or a misunderstanding concerning the nature of the service originally requested, may be considered a reasonable basis for requesting a change; a change may not be considered reasonable if it appears to relate to information that is incorrect, incomplete or otherwise unsatisfactory. Before agreeing to change an audit engagement to a review or a related service, the auditor may also need to assess any legal or contractual implications of the change (SM 11.21–11.22).

**(a) A misunderstanding.** Ramesh asked for an audit while wanting a different service: a misunderstanding concerning the nature of the service originally requested, which may be a reasonable basis for the change. Nothing in law or contract requires an audit. Lakshmi may agree. The audit work done may be relevant to the compilation, but the work performed and the report issued will be those appropriate to a compilation, and the report will not refer to the original audit engagement or to the procedures performed in it. The new terms shall be agreed and recorded in an engagement letter or other suitable form of written agreement (SM 11.23).

**(b) The fee.** The firm's requirements have not changed: the loan agreement still requires audited accounts until 2027, and nobody misunderstood the service. A lower fee is not a change in circumstances affecting the need for an audit, and a review would not meet the bank's requirement, a contractual implication to assess and point out. There is **no reasonable justification**: she should not agree.

**If, in (b), the partners do not permit the audit to continue.** Being unable to agree to the change and not permitted to continue the original engagement, Lakshmi shall withdraw from the audit engagement where possible under applicable law or regulation, and determine whether there is any obligation, contractual or otherwise, to report the circumstances to other parties, such as those charged with governance, owners or regulators (SM 11.23).
:::
::::

:::: example Kesar's email before the third year
Iyer & Associates have audited Tapri Tea Co. Ltd for several years; after Tapri's listing, the terms were revised and recorded in a fresh engagement letter in 2024. Before the 2026-27 audit begins, Kesar emails Lakshmi:

1. "Please include in this year's report your view on whether our 40 new kulhad cafés will be profitable. Investors keep asking."
2. "Our promoter family has sold 26% of Tapri's shares to Saffron Growth Fund, a private equity investor."
3. "We want your report by 15 May 2027 this time, two weeks earlier than usual, so that we can announce results before the festival season."

Bunty says: "We revised the letter in 2024. Nothing to send this year."

Required: Comment, with reference to SA 210.

::: answer Model answer
**Relevant provision.** As per SA 210, on recurring audits the auditor shall assess whether circumstances require the terms of the audit engagement to be revised and whether there is a need to remind the entity of the existing terms. The auditor may decide not to send a new audit engagement letter each period, but factors such as any indication that the entity misunderstands the objective and scope of the audit, any revised or special terms of the audit engagement and a significant change in ownership may make it appropriate to revise the terms or to remind the entity of them (SM 11.23–11.24; the eight factors are listed above).

**Facts and analysis.**

1. **The profitability view.** An audit gives an opinion on whether the financial statements as a whole are free from material misstatement, not a view on whether new cafés will be profitable: the request indicates that the entity misunderstands the objective and scope of the audit.
2. **The private equity investor.** The sale of 26% of the shares is a significant change in ownership.
3. **The earlier deadline.** A report due on 15 May 2027 is a revised term of the engagement.

**Conclusion.** Bunty's view is not correct: three factors are present. Iyer & Associates should remind Tapri of the objective and scope of the audit, revise the terms, and record them in an engagement letter or other written agreement agreed with management and, as appropriate, those charged with governance.
:::
::::

## Under the hood

### Links that ICAI questions cross

| Topic | What it adds |
|---|---|
| Terms, not an investigation | A clause in the appointment letter making the auditor responsible for detecting frauds is outside the scope of an audit, which is not an investigation (September 2024 Q1(c), 3 marks; [[aud.nature.sa200|SA 200]]) |
| Ethics | Not sending an engagement letter, so that the client expects absolute assurance, is a failure of professional competence and due care in ICAI's suggested answer (MTP September 2024 Series I Q4(b)) |
| SA 700 | The report describes management's responsibilities as agreed under SA 210, because that explains the premise on which an audit is conducted (SM 8.16, 8.26) |
| SA 580 | Written representations on management's responsibilities are described as in the terms of the engagement (SM 7.32) |
| LLP audits | The auditor should get definite instructions in writing on the work to be performed (SM 9.39) |

## Exam angle

::: exam Where SA 210 appeared, May 2024 to September 2026
In the documents read for this lesson, SA 210 was examined in 18.

- **Preconditions, 4 or 5 marks**: May 2025 Q3(c) (4 marks), MTP September 2025 Series I Q4(b), MTP January 2026 Series II Q4(b), MTP May 2026 Series I Q6(b) (5 marks each; refusal to acknowledge responsibilities, access only on request, an internally designed framework), RTP May 2024 Q24 (a partnership firm that calls internal control the auditor's job).
- **The engagement letter, 3 to 5 marks.** What it is and contains: September 2024 Q5(d) (3 marks), MTP May 2024 Series II Q5(d) (3 marks), MTP January 2025 Series I Q2(a) (5 marks, with the law-prescribed exception). The auditor's responsibilities in the letter, any five: May 2026 Q6(a) (5 marks).
- **Change of terms to a review, 5 marks**: September 2026 Q1(a) (inventory inconsistencies found, then a request citing time and cost), MTP January 2025 Series II Q2(a) and MTP September 2026 Series I Q6(b) (receivables unsupported: not justified); RTP May 2025 Q20 (a request after diversification).
- **Recurring audits**: the eight factors, September 2025 Q3(b) (5 marks); RTP September 2025 Q20; MCQs in January 2025 (MCQ 1: the replacement of the engagement partner within the audit firm is not one of the factors), MTP January 2025 Series I MCQ 13, MTP May 2024 Series II MCQ 2.3 (a "modest" change is not a factor: the word is "significant") and RTP September 2026 MCQ 5.
- **Other MCQs**: the letter is sent by the auditor and states that the report may differ, MTP September 2024 Series I MCQ 10; a scope limitation before acceptance, MTP September 2025 Series I MCQ 14 and MTP May 2024 Series II MCQ 2.1 (do not accept).
:::

::: exam The traps
Who sends the letter (the auditor, to the client: the Study Material's Correct/Incorrect question); "significant", not "modest", change in nature or size; the missing preconditions in MCQ options are usually responsibility for internal control and for preparing the financial statements; and "unless required by law or regulation" belongs in every answer on not accepting.
:::

::: trick Framework + PIA, and "Only Auditors Make Fine Reports"
Preconditions: an acceptable **Framework**, plus management's acknowledgement of **PIA**: **P**reparation of the financial statements, **I**nternal control, **A**ccess (information and persons). The letter's five, in order: **O**bjective and scope, **A**uditor's responsibilities, **M**anagement's responsibilities, **F**ramework, **R**eport (expected form, and that it may differ). Condition: both follow the Study Material's order.
:::

## Answer frame

### A case question on acceptance or change of terms

1. **Relevant provision**: "As per SA 210, …": the preconditions and the consequence of their absence; or the reasonable-justification rule and its examples; or the recurring-audit factors.
2. **Facts of the case**: what management refused, limited or requested, and why.
3. **Analysis**: which precondition fails; would the limitation lead to a disclaimer; is the reason a change in circumstances or misunderstanding (reasonable), or unsatisfactory information (not reasonable); which recurring-audit factor is present.
4. **Conclusion**: accept or not (with "unless required by law or regulation"); agree or not, and the consequences (new terms in writing; or withdraw where possible and consider reporting); revise or remind.

### "What should the auditor consider before agreeing to change to a lower level of assurance?"

| Point | What earns the mark |
|---|---|
| Justification | Determine whether there is reasonable justification |
| Implications | Assess any legal or contractual implications |
| Work done | May be relevant to the changed engagement |
| Report | Appropriate to the revised engagement; no reference to the original audit or its procedures (except agreed-upon procedures) |
| Terms | Agree and record the new terms in writing |
| If refused | Withdraw where possible under law; decide whether to report to those charged with governance, owners or regulators |

## Common mistakes

::: mistake Hall of Shame: the engagement letter sent by the client
**Fix:** the audit engagement letter is sent **by the auditor to the client**. (The Study Material's own Correct/Incorrect question.)
:::

::: mistake Accepting first, fixing the preconditions later
Starting fieldwork while management refuses to acknowledge its responsibilities. **Fix:** discuss the matter, and unless required by law or regulation, do not accept the engagement.
:::

::: mistake Agreeing to a review to rescue the client from a qualified opinion
**Fix:** a request that relates to incorrect, incomplete or unsatisfactory information has no reasonable justification. If the client then refuses to let the audit continue, withdraw where possible under law and consider reporting the circumstances.
:::

::: mistake "We audit them every year, so no new letter"
**Fix:** a new letter is not needed every period, but the auditor must assess whether to revise the terms or remind the entity, and the eight factors (a significant change in ownership or business, new laws, a new framework, new reporting requirements …) make it appropriate.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Konkan Cashews Pvt Ltd asks CA Rao to accept its statutory audit for 2025-26. The proposed terms give the auditor the trial balance and summaries certified by the CFO, but no access to vouchers, bank statements or the general ledger. CA Rao believes the limitation would result in a disclaimer of opinion. Management argues: "A company's audit is compulsory under the Companies Act, so you have to accept." Which is correct?
- [ ] Accept, because the company is required by law to be audited, and disclaim the opinion at the end
- [x] Do not accept such a limited engagement as an audit engagement: the exception "unless required by law or regulation" applies when the auditor is required to accept, and nothing requires CA Rao to accept
- [ ] Accept, and deal with the restriction under SA 705 as a limitation imposed after acceptance
- [ ] Accept, relying on the CFO's certified summaries supported by a written representation
> A limitation in the terms of a proposed engagement that the auditor believes will result in a disclaimer means the auditor shall not accept such a limited engagement as an audit engagement, unless required by law or regulation to do so. The company's duty to be audited is not a duty on CA Rao to accept a crippled audit. (The terms also withhold the access to information that is a precondition for an audit.) SA 705's route is for limitations imposed after acceptance.

Q: Case scenario. Before accepting the audit of Godavari Foods Ltd, CA Joshi sends the draft engagement letter. Management's replies are below. Which reply means that a precondition for an audit is NOT present?
- [x] Management acknowledges responsibility for internal control at the head office only, not at the three factories
- [ ] Management asks that requests for additional information go through the CFO's office, with replies within two working days
- [ ] Management asks that half the audit fee be paid after the auditor's report is issued
- [ ] Management asks that factory visits be moved from the Diwali production peak to November
> Management must acknowledge its responsibility for the preparation of the financial statements, for the internal control needed for them, and for access to information and persons (SM 11.15–11.16); an acknowledgement that stops at the head office is not that agreement. Routing requests through one office still gives the information; fees and visit timing are terms to agree, not preconditions.

Q: Case scenario. Iyer & Associates are about to begin a recurring audit of Tapri. Which ONE of the following makes it appropriate under SA 210 to revise the terms of the engagement or remind Tapri of them?
- [ ] Tapri opened 18 new cafés during the year, taking the total from 412 to 430
- [ ] Bunty has been promoted to semi-senior on the engagement team
- [ ] Iyer & Associates now record their time on new software
- [x] Dev Malhotra has retired as CFO, and a new CFO took charge in July
> A recent change of senior management is one of SA 210's eight factors (SM 11.24). Growth of about 4% in the number of cafés is not a significant change in the nature or size of the business, and changes inside the audit firm are not among the factors.

Q: Case scenario. Three weeks into the audit of Kaveri Handlooms, a partnership firm, the partners agree to sell the business. The buyer needs no audited accounts, only agreed-upon procedures on the debtors' ledger, and the partners ask CA Rao to change the engagement accordingly. She finds reasonable justification. Which statement about the report on the changed engagement is correct?
- [ ] It must describe the original audit engagement, so that readers know its history
- [x] It may refer to the procedures performed, which is a normal part of an agreed-upon procedures report, but it does not refer to the original audit engagement
- [ ] It must contain an audit opinion on the debtors' ledger, because audit work had been done
- [ ] None of the audit work performed before the change may be used
> To avoid confusing the reader, the report on the changed engagement would not refer to the original audit engagement or to procedures performed in it, except that, for agreed-upon procedures, reference to the procedures performed is a normal part of the report. Audit work done to the date of change may be relevant to the changed engagement.

Q: Case scenario. The law under which Kaveri Water Board is audited prescribes the terms of its audit engagement in sufficient detail. What does SA 210 still require the auditor to record in writing?
- [ ] Nothing at all, since the law already sets out the terms
- [ ] A full engagement letter repeating every term the law prescribes
- [x] The fact that such law applies and that management acknowledges and understands its responsibilities
- [ ] Only the audit fee and the date by which the report will be issued
> If law or regulation prescribes the terms in sufficient detail, the auditor need not record them in a written agreement, except for the fact that such law or regulation applies and that management acknowledges and understands its responsibilities (SM 11.17).

:::

## Recap

- Objective: accept or continue an audit only when its basis is agreed: preconditions present, terms commonly understood.
- Preconditions: an acceptable framework, and management's acknowledgement of responsibility for preparing the financial statements, for internal control, and for giving access to information and unrestricted access to persons.
- Preconditions absent: discuss; unless required by law or regulation, do not accept. A proposed limitation leading to a disclaimer: do not accept as an audit.
- Terms recorded in an engagement letter (or other written agreement) sent by the auditor to the client: objective and scope; auditor's and management's responsibilities; framework; expected report and that it may differ.
- Law prescribing the terms: record only that the law applies and that management acknowledges its responsibilities.
- Change of terms: only with reasonable justification (changed circumstances, misunderstanding), never to escape a modified opinion; new terms in writing; if refused and the audit is stopped, withdraw where possible and consider reporting.
- Recurring audits: assess revising or reminding; eight factors, from misunderstanding to new reporting requirements.
- No trials, no fitted suit.

## Flashcards

Q:: SA 210: what is the objective of the auditor?
A:: To accept or continue an audit engagement only when the basis for it has been agreed, by establishing whether the preconditions for an audit are present and confirming a common understanding of the terms with management and, where appropriate, those charged with governance.

Q:: SA 210: what are the "preconditions for an audit"?
A:: The use by management of an acceptable financial reporting framework in preparing the financial statements, and the agreement of management (and, where appropriate, those charged with governance) to the premise on which an audit is conducted.

Q:: SA 210: which three responsibilities must management acknowledge?
A:: (i) Preparing the financial statements in accordance with the framework, including fair presentation; (ii) such internal control as necessary for financial statements free from material misstatement; (iii) providing access to all relevant information, additional information requested, and unrestricted access to persons within the entity.

Q:: SA 210: what if the preconditions are not present?
A:: Discuss the matter with management; unless required by law or regulation, do not accept the proposed audit engagement.

Q:: SA 210: what if the proposed terms limit the scope so that a disclaimer would result?
A:: Do not accept such a limited engagement as an audit engagement, unless required by law or regulation.

Q:: SA 210: what does the audit engagement letter include?
A:: The objective and scope of the audit; the auditor's responsibilities; management's responsibilities; the applicable financial reporting framework; the expected form and content of reports, with a statement that a report may differ.

Q:: SA 210: who sends the engagement letter to whom?
A:: The auditor sends it to the client.

Q:: SA 210: when may the auditor not record the terms in a written agreement?
A:: When law or regulation prescribes them in sufficient detail; the auditor then records only that the law applies and that management acknowledges and understands its responsibilities.

Q:: SA 210: when may a request to change the terms be reasonable, and when not?
A:: Reasonable: a change in circumstances affecting the entity's requirements, or a misunderstanding about the service requested. Not reasonable: a change relating to incorrect, incomplete or otherwise unsatisfactory information, e.g. to avoid a modified opinion.

Q:: SA 210: what if the auditor cannot agree to a change and may not continue the original audit?
A:: Withdraw where possible under applicable law or regulation, and determine whether there is any obligation to report the circumstances to those charged with governance, owners or regulators.

Q:: SA 210: list the factors that may require revised terms or a reminder in a recurring audit.
A:: Misunderstanding of objective and scope; revised or special terms; recent change of senior management; significant change in ownership; significant change in nature or size of business; change in legal or regulatory requirements; change in the financial reporting framework; change in other reporting requirements.
