<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p6-pyq-nov2023
paper: p6
kind: pyq
attempt: nov2023
qfile: old/p6/pyq-nov2023-a.pdf
afile: old/p6/pyq-nov2023-a.pdf
paperfile: old/p6/pyq-nov2023-q.pdf
choice: q1; any 4 of q2-q6; q1: any 7 of (a)-(h)
q: 1
status: checked
by: tx-38
date: 2026-10-20
note: Old-scheme Intermediate Paper 6 Auditing and Assurance, November 2023. Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question before its answer; the question-paper scan is linked as paperfile and was not used for the text. ICAI published only the 70-mark descriptive part (Q1-Q6): the 30-mark Part I MCQ booklet and its answers are not in either file, so this document has no MCQ items. Instructions: the line printed under the paper's title on p.1. No choice rule: Q1 says "Answer any seven" of its eight 2-mark statements (a)-(h) "(7 x 2 = 14 Marks)", a choice inside a question that choice: cannot express (it would count 16 marks for Q1), so, as with o-p7-mtp-may2018-s1, the paper is practice only and never sat; each Q1 statement is an item of 2 marks. Q6(a) has an OR alternative (q6a-or), with its own (4 Marks). Q1's lead-in ("State with reasons whether the following statements are correct or incorrect. (Answer any seven)") is the shared stem of its eight items (case c1); Q2's lead-in "Answer the following questions:" is a heading of the question, not transcribed in the items. Bold lead-ins and the bold words in ICAI's answers are kept as **bold**; ICAI's "M/s BB·& Associates" (Q5(a), with a middle dot) and "Rule 11(g) of Companies (Audit and Auditors Rules), 2014):" (Q2(d) answer) are as printed. Old-scheme mapping (ours): Q1(d) (casual vacancy of a cost auditor, Form CRA-2), Q2(b) and Q4(c) (SA 240 fraud risk factors) are flagged out of syllabus, see their notes. Accepted numbers (each read on the page): 6 is the paper's title on p.1 (PAPER – 6: AUDITING AND ASSURANCE); 1 to 6 are the question numbers, which the Suggested Answers print once (Question N, before the reproduced question) and not again before the answer (headed only Answer), while check.py expects each number on the answer side as well. Marks: Q1's (7 x 2 = 14 Marks) covers eight 2-mark items because ICAI asks for any seven of them (check.py reads the "any seven" on the question page). | choice: added by choice-ext from ICAI's printed instruction (2026-10-20): Question No. 1 is compulsory and any four questions from the remaining five (the Instructions), and Q1's "(Answer any seven)" over its eight 2-mark statements (a)-(h), written q1: any 7 of (a)-(h); the paper can now be sat (maximum 70, as ICAI prints), and the "No choice rule" above predates the part-choice syntax.
---
#### Instructions
Question No.1 is compulsory.

Attempt any four questions from the remaining five questions.

---
case: c1
qno: 1
q: 1
---
#### Case
State with reasons whether the following statements are correct or incorrect. (Answer any seven)

---
item: q1a
case: c1
qno: 1
part: (a)
marks: 2
type: descriptive
tags: aud.evid.sa520, aud.entities.govt
difficulty: medium
q: 1
a: 1
note: Ours: the point is SA 520's consideration for public sector entities (analytical procedures); the January 2027 Study Material's SA 520 section does not reproduce that paragraph, but SA 520 itself is in the syllabus, so the item is not flagged.
---
#### Question
The relationships between individual financial statements items traditionally considered in the audit of business entities may not always be relevant in the audit of governments or other non-business public sector entities.
#### Answer
**Correct:** In many public sector entities, there may be little direct relationship between revenue and expenditure.

In addition, because expenditure on the acquisition of assets may not be capitalized, there may be no relationship between expenditures on, for example, inventories and fixed assets and the amount of those assets reported in the financial statements. Also, industry data or statistics for comparative purposes may not be available in the public sector.
#### Approach
Think of what analytical procedures rely on and ask whether a government entity offers it.

---
item: q1b
case: c1
qno: 1
part: (b)
marks: 2
type: descriptive
tags: aud.entities.npo
difficulty: easy
q: 1
a: 2
---
#### Question
NGOs registered under the Companies Act, 2013 are not allowed to maintain accounts on cash basis.
#### Answer
**Correct:** NGOs registered under the Companies Act, 2013 must maintain their books of account under the accrual basis as required by the provisions of section 128 of the said Act.

If the accounts are maintained on cash basis, it would amount to non-compliance of the provisions of the Companies Act, 2013.
#### Approach
Recall what section 128 of the Companies Act, 2013 requires of every company, whatever its objects.

---
item: q1c
case: c1
qno: 1
part: (c)
marks: 2
type: descriptive
tags: aud.evid.sa500
difficulty: easy
q: 1
a: 2
---
#### Question
Sales invoice is an example of external evidence.
#### Answer
**Incorrect:** Evidence which originates within the organisation being audited is called as internal evidence. The evidence that originates outside the client’s organization is known as external evidence.

In view of above, sales invoice is an example of internal evidence because it originates within the organisation.
#### Approach
Classify evidence by where it originates, then ask who prepares a sales invoice.

---
item: q1d
case: c1
qno: 1
part: (d)
marks: 2
type: descriptive
oos: yes
difficulty: easy
q: 1
a: 2
note: Out of syllabus (old scheme): the appointment of a cost auditor and the filling of a casual vacancy in that office (section 148 of the Companies Act, 2013 and the Companies (Cost Records and Audit) Rules, 2014, Form CRA-2) were part of old Paper 6's company audit chapter; the new-scheme Paper 5 syllabus and the January 2027 Study Material do not cover cost auditors (the Study Material mentions section 148 only in the CARO 2020 clause on cost records), so no sub-topic is tagged.
---
#### Question
Any casual vacancy in the office of a Cost Auditor, due to resignation, shall be filled in Annual General Meeting within 60 days of occurrence of such vacancy and the company shall inform the central government in Form CRA-2 within 45 days of such appointment of cost auditor.
#### Answer
**Incorrect:** Any casual vacancy in the office of a Cost Auditor, whether due to resignation, death or removal, shall be filled by the **Board of Directors within 30 days** of occurrence of such vacancy and the company shall inform the central government in Form CRA-2 **within 30 days** of such appointment of cost auditor.

---
item: q1e
case: c1
qno: 1
part: (e)
marks: 2
type: descriptive
tags: aud.entities.commercial
difficulty: easy
q: 1
a: 2
---
#### Question
Under 'finance lease', lease term generally extends to less than 75% of the projected useful life of the leased asset.
#### Answer
**Incorrect:** Under ‘Operating Lease’, lease term generally extends to less than 75% of the projected useful life of the leased asset.

On the other hand, under ‘Finance lease’, lease term is generally more than or equal to estimated economic life of the asset under the lease arrangement.
#### Approach
Recall which kind of lease transfers substantially all the risks and rewards, and what that implies for the lease term.

---
item: q1f
case: c1
qno: 1
part: (f)
marks: 2
type: descriptive
tags: aud.evid.sa530
difficulty: easy
q: 1
a: 2
---
#### Question
Block sampling does not involve judgement, does not even use the random number tables and has no structured approach.
#### Answer
**Incorrect:** Haphazard sampling has no structured approach, does not involve judgment and does not even use the random number tables.

On the other hand, Block sampling involves selection of a block(s) of contiguous items from within population. Such selection has a risk of bias and of establishing a pattern of selection. Therefore, block sampling involves use of judgment.
#### Approach
Separate the sample selection methods: which one is "no structure", and which one picks contiguous items?

---
item: q1g
case: c1
qno: 1
part: (g)
marks: 2
type: descriptive
tags: aud.entities.govt
difficulty: easy
q: 1
a: 2
---
#### Question
In government expenditure audit, audit against provision of funds aims at ensuring that each item of expenditure is covered by sanction, either general or special, of the competent authority.
#### Answer
**Incorrect**: In Government expenditure audit, audit against sanctions aims at ensuring that each item of expenditure is covered by a sanction, either general or special, of the competent authority.

On the other hand, audit against provision of funds aims at ascertaining that the expenditure incurred has been on the purpose for which the grant and appropriation had been provided and that the amount of such expenditure does not exceed the appropriation made.
#### Approach
List the elements of expenditure audit and match "covered by a sanction" to the right one.

---
item: q1h
case: c1
qno: 1
part: (h)
marks: 2
type: descriptive
tags: aud.evid.ifc
difficulty: easy
q: 1
a: 2
---
#### Question
Internal controls over financial reporting is required where auditors are required to express an opinion on the effectiveness of an entity's internal controls over financial reporting.
#### Answer
**Correct:** Internal controls over financial reporting is required where auditors are required to express an opinion on effectiveness of an entity’s internal controls over financial reporting.

Such opinion is in addition to and distinct from the opinion expressed by auditor on financial statements.
#### Approach
Recall the distinction between internal financial controls and ICFR, and when ICFR matters to the auditor.

---
item: q2a
qno: 2
part: (a)
marks: 4
type: descriptive
tags: aud.report.sa705, aud.report.sa700, aud.report.sa701
difficulty: medium
q: 3
a: 3-4
---
#### Question
M/s ABC & Associates, statutory auditors of Opaque Ltd., are in the process of finalizing the audit report of the company but in view of their inability to obtain sufficient appropriate audit evidence, they would like to disclaim their opinion on the financial statements. Explain reporting responsibilities of M/s ABC & Associates pursuant to SA 700 (Revised). How they will address key audit matters section in accordance with SA 701 when they are expressing disclaimer of an opinion on the financial statements?
#### Answer
**SA 700 requires that if the auditor is unable to obtain sufficient appropriate audit evidence** to conclude that financial statements as a whole are free from material misstatements, the auditor shall modify opinion in accordance with requirements of SA 705.

SA 705 requires that when the auditor disclaims an opinion on the financial statements due to an inability to obtain sufficient appropriate audit evidence, the auditor shall:

(i) State that the auditor does not express an opinion on the accompanying financial statements;

(ii) State that, because of the significance of the matters described in the Basis for Disclaimer of Opinion section, the auditor has not been able to obtain sufficient appropriate audit evidence to provide a basis for an audit opinion on the financial statements; and

(iii) Amend the statement required by SA 700 (Revised), which indicates that the financial statements have been audited, to state that the auditor was engaged to audit the financial statements.

SA 705 requires that unless required by law or regulation, when the auditor disclaims an opinion on the financial statements, the auditor’s report shall not include a Key Audit Matters section in accordance with SA 701.

**Alternative Solution**

(a) **When an auditor disclaims an opinion on the financial statements due to an inability to obtain sufficient appropriate audit evidence,** the auditor shall amend the description of the auditor's responsibilities required by SA 700 (Revised) to include only the following:

(i) A statement that the auditor's responsibility is to conduct an audit of the entity's financial statements in accordance with Standards on Auditing and to issue an auditor's report;

(ii) A statement that, however, because of the matter(s) described in the Basis for Disclaimer of Opinion section, the auditor was not able to obtain sufficient appropriate audit evidence to provide a basis for an audit opinion on the financial statements; and

(iii) The statement about auditor independence and other ethical responsibilities required by SA 700 (Revised).

Unless required by law or regulation, when the auditor disclaims an opinion on the financial statements, the auditor's report shall not include a Key Audit Matters section in accordance with SA 701.
#### Approach
Begin with SA 700's route to SA 705 when evidence is insufficient, then ask how a report with no opinion changes and whether a KAM section still makes sense.

---
item: q2b
qno: 2
part: (b)
marks: 4
type: descriptive
tags: aud.risk
oos: yes
difficulty: easy
q: 3
a: 4
note: Out of syllabus (old scheme): fraud risk factors relating to fraudulent financial reporting are SA 240 (The Auditor's Responsibilities Relating to Fraud in an Audit of Financial Statements), which old Paper 6 taught; the new-scheme Paper 5 syllabus does not name SA 240 and the January 2027 Study Material mentions it only in passing, so the item carries only its nearest chapter (risk assessment).
---
#### Question
Strained relationship between management and the current or predecessor auditor is one of the risk factors relating to misstatements arising from Fraudulent Financial Reporting. Mention such circumstances.
#### Answer
**Strained relationship between management and the current or predecessor auditor** is one of the risk factors relating to misstatements arising from fraudulent financial reporting, as exhibited by the following:

1. Frequent disputes with the current or predecessor auditor on accounting, auditing, or reporting matters.
2. Unreasonable demands on the auditor, such as unrealistic time constraints regarding the completion of the audit or the issuance of the auditor’s report.
3. Restrictions on the auditor that inappropriately limit access to people or information or the ability to communicate effectively with those charged with governance.
4. Domineering management behavior in dealing with the auditor, especially involving attempts to influence the scope of the auditor’s work or the selection or continuance of personnel assigned to or consulted on the audit engagement.

---
item: q2c
qno: 2
part: (c)
marks: 3
type: descriptive
tags: aud.ethics.qc, aud.ethics.independence
difficulty: easy
q: 3
a: 4-5
---
#### Question
The engagement partner shall form a conclusion on compliance with independence requirements that apply to an audit engagement. State the relevant requirements as per relevant SA 220- Quality control for an audit of Financial Statements.
#### Answer
**As per SA 220, the engagement partner shall form a conclusion on compliance with independence requirements that apply to the audit engagement.** In doing so, the engagement partner shall:

(a) Obtain relevant information from the firm to identify and evaluate circumstances and relationships that create threats to independence.

(b) Evaluate information on identified breaches, if any, of the firm’s independence policies and procedures to determine whether they create a threat to independence for the audit engagement; and

(c) Take appropriate action to eliminate such threats or reduce them to an acceptable level by applying safeguards, or, if considered appropriate, to withdraw from the audit engagement, where withdrawal is permitted by law or regulation. The engagement partner shall promptly report to the firm any inability to resolve the matter for appropriate action.
#### Approach
Think of the engagement partner's steps in order: gathering information on threats, judging what was found, then acting on it.

---
item: q2d
qno: 2
part: (d)
marks: 3
type: descriptive
tags: aud.evid.trail, aud.report.companies
difficulty: easy
q: 3
a: 5
---
#### Question
As per Rule 11(g) of the Companies (Audit and Auditors) Rules, 2014 auditor's report should state whether the accounting software used for maintaining its books of account has a feature of recording audit trail (edit log) facility. What are the reporting requirements under Rule 11(g)?
#### Answer
**The auditor’s report shall report on following matters in accordance with Rule 11(g) of Companies (Audit and Auditors Rules), 2014):**

Whether the company has used such accounting software for maintaining its books of account which has a feature of recording audit trail (edit log) facility and

1. the same has been operated throughout the year for all transactions recorded in the software and
2. the audit trail feature has not been tampered with and
3. the audit trail has been preserved by the company as per the statutory requirements for record retention.
#### Approach
Beyond whether the software has an edit log, ask what else the auditor must say about how that feature was used and kept during the year.

---
item: q3a
qno: 3
part: (a)
marks: 4
type: descriptive
tags: aud.report.caro, aud.items.current
difficulty: medium
q: 5
a: 6
---
#### Question
UVW Ltd. a biopharma company and global manufacturers of select critical care medical products has been sanctioned working capital limits of ₹ 5.99 crores from a nationalized bank on the basis of security of current assets. During the year under audit, the statutory auditor of UVW Ltd. considers that inventory is material to the financial statements and performs audit procedures over the company's final inventory records to determine whether they accurately reflect actual inventory count and without any major discrepancies for each class of inventory. What are the reporting requirements under CARO 2020 in this case?
#### Answer
**The auditor’s report, pursuant to CARO 2020, in respect of physical verification of inventory and in respect of sanctioned working capital, shall include the statements as follows:**

(a) Whether physical verification of inventory has been conducted at reasonable intervals by the management and whether in the opinion of the auditor, the coverage and procedure of such verification by the management is appropriate: whether any discrepancies of 10% or more in the aggregate for each class of inventory were noticed and if so whether such discrepancies have been properly dealt within the books of account.

(b) whether during any point of time of the year, the company has been sanctioned working capital limits in excess of five crore rupees, in aggregate, from banks or financial institutions on the basis of security of current assets; whether the quarterly returns or statements filed by the company with such banks or financial institutions are in agreement with the books of account of the Company, if not, give details.
#### Approach
Pick out the two facts in the case (inventory and a working capital sanction against current assets) and recall the CARO 2020 clause each one triggers.

---
item: q3b
qno: 3
part: (b)
marks: 4
type: descriptive
tags: aud.items.current
difficulty: easy
q: 5
a: 6
---
#### Question
Narrate the audit procedures to be performed by an auditor in order to ascertain that the Raw materials and consumables are valued appropriately and as per generally accepted accounting policies and practices.
#### Answer
**Audit procedures performed by an auditor in order to ascertain that raw material and consumables are valued appropriately in accordance with generally accepted accounting policies and practices are as under:**

1. Ascertain what elements of cost are included e.g. carriage inward, non-refundable duties etc.
2. If standard costs are used, enquire into basis of standards; how these are compared with actual costs and how variances are analyzed and accounted for/ treated in accounting records.
3. Test check cost prices used with purchase invoices received in the month(s) prior to counting.
4. Follow up valuation of all damaged or obsolete inventories noted during observance of physical counting with a view to establishing a realistic net realizable value.
#### Approach
Follow how the cost of materials is built up and checked, and do not forget items whose value may have fallen below cost.

---
item: q3c
qno: 3
part: (c)
marks: 3
type: descriptive
tags: aud.risk.digital, aud.risk.it
difficulty: easy
q: 5
a: 6
---
#### Question
Elucidate the impact on substantive audit if IT related risks are not mitigated in an automated environment.
#### Answer
**Impact on substantive audit**

1. Auditor cannot rely on the data obtained from systems where such risks exist.
2. This means, all forms of data, information or reports that we obtain from systems for the purpose of audit have to be thoroughly tested and corroborated for completeness and accuracy.
3. The auditor will be required to obtain more audit evidence and perform additional audit work.
#### Approach
Start from the consequence: if system-generated data cannot be trusted, what must the auditor do differently in substantive testing?

---
item: q3d
qno: 3
part: (d)
marks: 3
type: descriptive
tags: aud.evid.sa550
difficulty: easy
q: 5
a: 6-7
---
#### Question
The nature of related party relationships and transactions may, in some circumstances, give rise to higher risks of material misstatement of the financial statements than transactions with unrelated parties. Explain with the help of examples.
#### Answer
**Many related party transactions are in the normal course of business.** In such circumstances, they may carry no higher risk of material misstatement of the financial statements than similar transactions with unrelated parties. However, the nature of related party relationships and transactions may, in some circumstances, give rise to higher risks of material misstatement of the financial statements than transactions with unrelated parties.

**Examples are:**

1. Related parties may operate through an extensive and complex range of relationships and structures with a corresponding increase in the complexity of related party transactions.
2. Information systems may be ineffective at identifying or summarizing transactions and outstanding balances between an entity and its related parties.
3. Related party transactions may not be conducted under normal market terms and conditions. For example, some related party transactions may be conducted with no exchange of consideration.
#### Approach
Acknowledge first that many related party transactions are routine, then think of what makes some of them harder to identify or to value.

---
item: q4a
qno: 4
part: (a)
marks: 4
type: descriptive
tags: aud.risk.sa320
difficulty: easy
q: 7
a: 7-8
---
#### Question
The auditor's determination of materiality is a matter of professional judgement and is affected by the auditor's perception of the financial information needs of users of the financial statements. In this context, what are the assumptions that an auditor reasonably makes in respect of the users of the financial statements?
#### Answer
**The auditor’s determination of materiality is a matter of professional judgment** and is affected by the auditor’s perception of the financial information needs of users of the financial statements. In this context, it is reasonable for the auditor to assume that users:

(1) Have a reasonable knowledge of business and economic activities and accounting and a willingness to study the information in the financial statements with reasonable diligence;

(2) Understand that financial statements are prepared, presented and audited to levels of materiality;

(3) Recognize the uncertainties inherent in the measurement of amounts based on the use of estimates, judgment and the consideration of future events; and

(4) Make reasonable economic decisions on the basis of the information in the financial statements.
#### Approach
Recall SA 320's description of the 'reasonable user' of financial statements.

---
item: q4b
qno: 4
part: (b)
marks: 4
type: descriptive
tags: aud.items.equity
difficulty: easy
q: 7
a: 8
---
#### Question
How is "Short Term Borrowings" disclosed in the Financial Statements as required under Part I of Schedule III to the Companies Act, 2013?
#### Answer
(i) **Short-term borrowings shall be classified as:**

(1) Loans repayable on demand;

(A) from banks.

(B) from other parties.

(2) Loans and advances from related parties;

(3) Deposits;

(4) Other loans and advances (specify nature).

(ii) Borrowings shall further be sub-classified as secured and unsecured. Nature of security shall be specified separately in each case.

(iii) Where loans have been guaranteed by directors or others, the aggregate amount of such loans under each head shall be disclosed.

(iv) Period and amount of default as on the balance sheet date in repayment of loans and interest shall be specified separately in each case.

(v) Current maturities of Long term borrowings shall be disclosed separately.
#### Approach
Recall the Schedule III note for this line item: first its sub-heads, then the further disclosures it requires.

---
item: q4c
qno: 4
part: (c)
marks: 3
type: descriptive
tags: aud.risk
oos: yes
difficulty: easy
q: 7
a: 8
note: Out of syllabus (old scheme): circumstances that indicate the possibility of fraud (discrepancies in the accounting records) are SA 240 (The Auditor's Responsibilities Relating to Fraud in an Audit of Financial Statements), which old Paper 6 taught; the new-scheme Paper 5 syllabus does not name SA 240 and the January 2027 Study Material mentions it only in passing, so the item carries only its nearest chapter (risk assessment).
---
#### Question
Discrepancies in the accounting records, including transactions that are not recorded in a complete or timely manner or are improperly recorded as to amount, accounting period, classification or entity policy is one of the circumstances that indicate the possibility of fraud. Give four other examples relating to discrepancies in the accounting records which indicate the possibility of fraud.
#### Answer
**The following are other examples of discrepancies in accounting records which indicate possibility of fraud:**

1. Unsupported or unauthorized balances or transactions.
2. Last-minute adjustments that significantly affect financial results.
3. Evidence of employees’ access to systems and records inconsistent with that necessary to perform their authorized duties.
4. Tips or complaints to the auditor about alleged fraud.

---
item: q4d
qno: 4
part: (d)
marks: 3
type: descriptive
tags: aud.report.sa710
difficulty: easy
q: 7
a: 9
---
#### Question
The nature of the comparative information that is presented in an entity's financial statements, depends on the requirements of the applicable financial reporting framework. There are two broad approaches to the auditor's reporting responsibilities in respect of such comparative information. Mention those two approaches and also mention the essential audit reporting differences between the two.
#### Answer
**The nature of the comparative information that is presented in an entity’s financial statements** depends on the requirements of the applicable financial reporting framework.

There are two different broad **approaches** to the auditor’s reporting responsibilities in respect of such comparative information:

(1) Corresponding figures and

(2) Comparative financial statements.

The approach to be adopted is often specified by law or regulation but may also be specified in the terms of engagement.

The essential audit reporting **differences** between the approaches are:

(i) For corresponding figures, the auditor’s opinion on the financial statements refers to the current period only;

(ii) Whereas for comparative financial statements, the auditor’s opinion refers to each period for which financial statements are presented.
#### Approach
Name SA 710's two approaches, then compare the periods the auditor's opinion covers under each.

---
item: q5a
qno: 5
part: (a)
marks: 4
type: descriptive
tags: aud.evid.sa500
difficulty: easy
q: 9
a: 10
---
#### Question
You are the senior member of the engagement team of M/s BB·& Associates. Before starting the audit, you explained to other junior assistants about the meaning of Audit evidence. One of the junior assistant is of the view that audit evidence includes only information contained in the accounting records and no other information. You are of the opinion that a combination of tests of accounting records and other information is generally used by the auditor to support his opinion on the financial statements.

In the above context, illustrate with two appropriate examples of each:

(i) Information contained in the accounting records.

(ii) Other information that authenticates the accounting records.
#### Answer
**A combination of tests of accounting records and other information** is generally used by the auditor to support his opinion on the financial statements.

**Information contained in the accounting records:** Accounting records include:

- the records of initial accounting entries and supporting records, such as checks and records of electronic fund transfers;
- invoices;
- contracts;
- the general and subsidiary ledgers, journal entries and other adjustments to the financial statements that are not reflected in journal entries; and
- records such as work sheets and spreadsheets supporting cost allocations, computations, reconciliations and disclosures.

**Other information that authenticates the accounting records and also supports the auditor’s rationale behind the true and fair presentation of the financial statements:** Other information which the auditor may use as audit evidence includes, for example

- minutes of the meetings,
- written confirmations from trade receivables and trade payables,
- manuals containing details of internal control etc.
#### Approach
Use SA 500's split of audit evidence into the accounting records and other information, and give examples of each.

---
item: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
tags: aud.report.sa700, aud.ethics.sa210
difficulty: easy
q: 9
a: 10
---
#### Question
The auditor's report shall include a section with a heading “Responsibilities of Management for the Financial Statements.” Give a brief description about management's responsibilities in the auditor's report as it helps to explain the users the premise on which an audit is conducted.

Also state the requirement specified in Standard on Auditing 210 for the auditor to agree management's responsibilities.
#### Answer
**“Responsibilities of Management for the Financial Statements” section of the auditor’s report shall describe management’s responsibility for:**

**(i) Preparing the financial statements** in accordance with the applicable financial reporting framework, and for such internal control as management determines is necessary to enable the preparation of financial statements that are free from material misstatement, whether due to fraud or error and

**(ii) Assessing the entity’s ability to continue as a going concern** and whether the use of the going concern basis of accounting is appropriate as well as disclosing, if applicable, matters relating to going concern. The explanation of management’s responsibility for this assessment shall include a description of when the use of the going concern basis of accounting is appropriate.

SA 210 requires the auditor to agree the management’s responsibilities in an engagement letter or other suitable form of written agreement.
#### Approach
Recall what SA 700 requires this section of the report to describe, then where SA 210 requires those responsibilities to be agreed.

---
item: q5c
qno: 5
part: (c)
marks: 3
type: descriptive
tags: aud.evid.sa520
difficulty: easy
q: 9
a: 11
---
#### Question
While conducting the audit of PDP Ltd. for the financial year 2022-23, the statutory auditor identified certain inconsistencies while applying analytical procedures to the financial and non-financial data of PDP Ltd. Can statutory auditor investigate results of Analytical Procedures duly performed in accordance with SA 520? Discuss.
#### Answer
**If analytical procedures performed in accordance with SA 520** identify fluctuations or relationships that are inconsistent with other relevant information or that differ from expected values by a significant amount, the auditor shall investigate such differences by:

**(i) Inquiring of management and obtaining appropriate audit evidence relevant to management’s responses:** Audit evidence relevant to management’s responses may be obtained by evaluating those responses taking into account the auditor’s understanding of the entity and its environment, and with other audit evidence obtained during the course of the audit.

**(ii) Performing other audit procedures as necessary in the circumstances:** The need to perform other audit procedures may arise when, for example, management is unable to provide an explanation, or the explanation, together with the audit evidence obtained relevant to management’s response, is not considered adequate.
#### Approach
Answer yes, and then recall the procedures SA 520 requires when analytical procedures show unexpected differences.

---
item: q5d
qno: 5
part: (d)
marks: 3
type: descriptive
tags: aud.report.sa701
difficulty: easy
q: 9-10
a: 11
---
#### Question
The auditor shall determine, from the matters communicated with those charged with governance, those matters that required significant auditor attention in performing the audit. In making this determination, explain the areas of concern that an auditor should take into account.
#### Answer
**The auditor shall determine, from the matters communicated with those charged with governance,** those matters that required significant auditor attention in performing the audit. In making this determination, the auditor shall take into account the following:

(i) Areas of higher assessed risk of material misstatement, or significant risks identified in accordance with SA 315.

(ii) Significant auditor judgments relating to areas in the financial statements that involved significant management judgment, including accounting estimates that have been identified as having high estimation uncertainty.

(iii) The effect on the audit of significant events or transactions that occurred during the period.
#### Approach
This is the first step of SA 701's selection of key audit matters: recall what the auditor considers in deciding what needed significant attention.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: aud.entities.institutions
difficulty: easy
q: 11
a: 12
---
#### Question
CA Z is appointed as the auditor of Chanakya Open University which offers higher learning educational courses through the Distance Mode of Education. Discuss four steps involved in his audit of other receipts/grants and donations received by the University.
#### Answer
**Audit of Other Receipts/Grants & Donations by CA Z would involve the following steps:**

1. Verify rental income from landed property with the rent rolls, etc.
2. Vouch income from endowments and legacies, as well as interest and dividends from investment; also inspect the securities in respect of investments held.
3. Verify any Government or local authority grant with the memo of grant.
4. If any expense has been disallowed for purposes of grant, ascertain the reasons thereof.
#### Approach
Go through the university's sources of income other than fees, one at a time, and the document each is verified with.

---
item: q6a-or
alt: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: aud.entities.npo
difficulty: easy
q: 11
a: 12-13
---
#### Question
On 1st May 2022, NGO has been founded with the objective of disaster relief registered under section 8 of the Companies Act, 2013. In addition to corpus contribution, substantial foreign contributions also have been received by NGO. You have been appointed as the first auditor of the said NGO for the F.Y. 2022-23. While planning the audit of NGO, which points you will focus upon? Mention any four such points.
#### Answer
**While planning the audit, the auditor may concentrate on the following:**

(i) Knowledge of the NGO’s work, its mission and vision, areas of operations and environment in which it operate.

(ii) Updating knowledge of relevant statutes especially with regard to recent amendments, circulars, judicial decisions viz. Foreign Contribution (Regulation) Laws, Societies Registration Act, 1860, Income Tax Act 1961 etc. and the Rules related to the statutes.

(iii) Reviewing the legal form of the Organisation and its Memorandum of Association, Articles of Association, Rules and Regulations.

(iv) Reviewing the NGO’s Organisation chart, then Financial and Administrative Manuals, Project and Programme Guidelines, Funding Agencies Requirements and formats, budgetary policies if any.

(v) Examination of minutes of the Board/Managing Committee/Governing Body/ Management and Committees thereof to ascertain the impact of any decisions on the financial records.

(vi) Study the accounting system, procedures, internal controls and internal checks existing for the NGO and verify their applicability.

(vii) Setting of materiality levels for audit purposes.

(viii) The nature and timing of reports or other communications.

(ix) The involvement of experts and their reports.
#### Approach
Think of what the auditor must understand before an NGO audit begins: the organisation itself, the laws that bind it and how it keeps its accounts.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: aud.evid.sa530
difficulty: easy
q: 11
a: 13
---
#### Question
Mention any four factors that should be considered for deciding upon the extent of checking on sampling plan.
#### Answer
**The factors that should be considered for deciding upon the extent of checking on a sampling plan are following:**

(i) Size of the organisation under audit.

(ii) State of the internal control.

(iii) Adequacy and reliability of books and records.

(iv) Tolerable error range.

(v) Degree of the desired confidence.
#### Approach
Ask what makes an auditor test more items or fewer.

---
item: q6c
qno: 6
part: (c)
marks: 3
type: descriptive
tags: aud.ethics.qc
difficulty: easy
q: 12
a: 13
---
#### Question
An auditing firm should monitor compliance with quality control policies and procedures. Discuss the purpose of this.
#### Answer
**The purpose of monitoring compliance with quality control policies and procedures is to provide an evaluation of:**

(i) Adherence to professional standards and regulatory and legal requirements;

(ii) Whether the quality control system has been appropriately designed and effectively implemented; and

(iii) Whether the firm’s quality control policies and procedures have been appropriately applied so that reports that are issued by the firm or engagement partners are appropriate in the circumstances.
#### Approach
Monitoring is one element of the firm's quality control system under SQC 1: ask what it is meant to evaluate.

---
item: q6d
qno: 6
part: (d)
marks: 3
type: descriptive
tags: aud.items.ppe
difficulty: easy
q: 12
a: 13
---
#### Question
Mention any three expenses which are revenue in nature but qualify as capital expenditure.
#### Answer
**Certain revenue expenses also qualify as capital expenditure like:**

(i) wages on installation of machinery.

(ii) legal expenses in purchase of land and building.

(iii) freight inwards on purchase of assets.
#### Approach
Think of expenses incurred in acquiring or installing an asset that become part of the asset's cost.
