<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p6-pyq-dec2021
paper: p6
kind: pyq
attempt: dec2021
qfile: old/p6/pyq-dec2021-a.pdf
afile: old/p6/pyq-dec2021-a.pdf
paperfile: old/p6/pyq-dec2021-q.pdf
choice: q1; any 4 of q2-q6; q1: any 7 of (a)-(h)
q: 1
status: checked
by: tx-44
date: 2026-10-20
note: Old-scheme Intermediate Paper 6 Auditing and Assurance, December 2021 (printed "INTERMEDIATE (NEW) EXAMINATION: DECEMBER, 2021", the 2017 scheme). Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question before its answer; the question-paper scan is linked as paperfile and was not used for the text (its wording differs slightly in places, e.g. "of a State Government" in Q6(a)(ii) and "Sec 143(3)(i)" in Q5(d)). ICAI published only the 70-mark descriptive part (Q1-Q6): the 30-mark Part I MCQ booklet and its answers are in neither file, so this document has no MCQ items. Instructions: the lines printed under the paper's title on p.1. No choice rule: Q1 says "Answer any seven" of its eight 2-mark statements (a)-(h), a choice inside a question that choice: cannot express (it would count 16 marks for Q1), so, as with o-p6-pyq-may2023 and o-p6-pyq-nov2023, the paper is practice only and never sat; each Q1 statement is an item of 2 marks under the shared stem c1. ICAI prints Q1's marks the other way round, "(2 x 7 = 14 Marks)" (2 marks x 7 statements); check.py now reads such a line either way and keeps the reading with fewer differences. Q6(a) is "(i) ... OR (ii) ...": (ii) is the OR alternative (q6a-ii, alt: q6a-i), sharing the (4 Marks) ICAI prints once after (i); the "OR" line is left out. Bold lead-ins and the bold words in ICAI's answers are kept as **bold**, the question text (italic in the PDF) as plain text. Words the PDF's justified spacing splits ("ye ars", "see king", "su gar", "depen ding", "membersh ip" ...) are re-joined; ICAI's own typos are kept and noted on their items. Old-scheme mapping (ours): Q4(a) (SA 250, laws and regulations), Q5(b) (resignation of a company auditor, section 140) and Q6(a)(i) (frauds already reported by the cost auditor) are flagged out of syllabus, see their notes; Q4(b) asks about CARO 2016, tagged to CARO 2020. Accepted numbers (each read on the page): 6 is the paper's title on p.1 (PAPER – 6 : AUDITING AND ASSURANCE); 1 to 6 are the question numbers, which the Suggested Answers print once (Question N, before the reproduced question) and not again before the answer (headed only Answer), while check.py expects each number on the answer side as well. | choice: added by choice-ext from ICAI's printed instruction (2026-10-20): Question No. 1 is compulsory and any four questions from the remaining five (the Instructions), and Q1's "(Answer any seven)" over its eight 2-mark statements (a)-(h), written q1: any 7 of (a)-(h); the paper can now be sat (maximum 70, as ICAI prints), and the "No choice rule" above predates the part-choice syntax.
---
#### Instructions
Question No.1 is compulsory.

Attempt any **four** questions from the remaining **five** questions.

---
case: c1
qno: 1
q: 1
---
#### Case
State with reasons whether the following statements are correct or incorrect. (Answer any **seven**)

---
item: q1a
case: c1
qno: 1
part: (a)
marks: 2
type: descriptive
tags: aud.risk.ic, aud.risk.model
difficulty: easy
q: 1
a: 1
---
#### Question
Internal control cannot eliminate risk of material misstatements in the financial statements.
#### Answer
**Correct:** Control risk is a function of the effectiveness of the design, implementation and maintenance of internal control by management. However, internal control can only reduce but not eliminate risks of material misstatement in the financial statements. This is because of the inherent limitations of internal control.

There is possibility of human errors or mistakes, or of controls being circumvented by collusion. Accordingly, some control risk will always exist.
#### Approach
Think of the inherent limitations of internal control (human error, collusion) and what they mean for control risk.

---
item: q1b
case: c1
qno: 1
part: (b)
marks: 2
type: descriptive
tags: aud.risk.sa320
difficulty: easy
q: 1
a: 2
---
#### Question
When Profit before tax from continuing operations is non-volatile, other benchmarks will be appropriate.
#### Answer
**Incorrect:** Profit before tax from continuing operations is often used for profit-oriented entities. When profit before tax from continuing operations is volatile, other benchmarks may be more appropriate, such as gross profit or total revenues.
#### Approach
Recall SA 320's guidance on choosing a benchmark for materiality and when profit before tax stops being a good one.

---
item: q1c
case: c1
qno: 1
part: (c)
marks: 2
type: descriptive
tags: aud.evid.sa501
difficulty: easy
q: 1
a: 2
---
#### Question
When inventory under the custody and control of a third party is material to the financial statements, the auditor can obtain sufficient appropriate audit evidence regarding the existence and condition of that inventory by taking written representation from management.
#### Answer
**Incorrect:** When inventory under the custody and control of a third party is material to the financial statements, the auditor shall obtain sufficient appropriate audit evidence regarding the existence and condition of that inventory by performing one or both of the following:

(a) Request confirmation from the third party as to the quantities and condition of inventory held on behalf of the entity.

(b) Perform inspection or other audit procedures appropriate in the circumstances.
#### Approach
Recall what SA 501 requires for inventory held by a third party, and ask whether a management representation is that kind of evidence.

---
item: q1d
case: c1
qno: 1
part: (d)
marks: 2
type: descriptive
tags: aud.evid.sa500
difficulty: easy
q: 1
a: 2
---
#### Question
While auditing the books of accounts of ABC Ltd., the auditor of the company looked at the inventory counting process to obtain audit evidence. In the present case, audit procedure used by the auditor is known as “Inspection”.
#### Answer
**Incorrect:** The audit procedure used by the auditor of ABC Ltd. is known as “observation”. Whereas inspection involves examining records or documents, whether internal or external, in paper form, electronic form, or other media, or a physical examination of an asset.
#### Approach
Distinguish the audit procedures of SA 500: watching a process being performed by others versus examining records or an asset.

---
item: q1e
case: c1
qno: 1
part: (e)
marks: 2
type: descriptive
tags: aud.evid.sa530
difficulty: easy
q: 1
a: 2
note: ICAI prints "without personal bias bias" in the statement; kept as printed.
---
#### Question
Statistical sampling being more scientific and without personal bias bias will always be appropriate to use under all circumstances.
#### Answer
**Incorrect:** Statistical sampling is widely accepted way of sampling as it is more scientific, without personal bias and the result of sample can be evaluated and projected in more reliable way.

Under some audit circumstances, statistical sampling methods may not be appropriate. The auditor should not attempt to use statistical sampling when another approach is either necessary or will provide satisfactory information in less time or with less effort. For instance, when exact accuracy is required or in case of legal requirements etc.
#### Approach
The word "always" is the trap: think of situations where another approach is needed or quicker.

---
item: q1f
case: c1
qno: 1
part: (f)
marks: 2
type: descriptive
tags: aud.entities.govt
difficulty: easy
q: 1
a: 2
note: Ours: the January 2027 Study Material (Government audit, audit of Government companies) says that the C&AG appoints the auditor of a Government company under section 139(5) or 139(7), which answers the statement; it does not give the 180-day period of ICAI's answer. Not flagged.
---
#### Question
As per section 139(5) of the Companies Act, 2013, in the case of a government company, board of directors shall appoint the subsequent auditor within a period of 60 days from the commencement of the financial year.
#### Answer
**Incorrect :** As per **section 139(5),** in the case of a Government company or any other company owned or controlled, directly or indirectly, by the Central Government, or by any State Government or Governments, or partly by the Central Government and partly by one or more State Governments, the Comptroller and Auditor-General of India shall, in respect of a financial year, appoint an auditor duly qualified to be appointed as an auditor of companies under this Act, within a period of 180 days from the commencement of the financial year, who shall hold office till the conclusion of the annual general meeting.
#### Approach
Ask who appoints the auditor of a Government company, and then check the time limit.

---
item: q1g
case: c1
qno: 1
part: (g)
marks: 2
type: descriptive
tags: aud.report.companies
difficulty: easy
q: 1
a: 2
---
#### Question
Auditor has to disclose the impact, if any, of the pending litigations on the financial position of the auditee in his audit report.
#### Answer
**Incorrect:** Rule 11 of the Companies (Audit and Auditors) Rules, 2014 prescribes the other matters to be included in auditor’s report. The auditor’s report shall also include their views and comments on - whether the company has disclosed the impact, if any, of pending litigations on its financial position in its financial statement.
#### Approach
Under Rule 11, who discloses the impact of pending litigations and what does the auditor do about it?

---
item: q1h
case: c1
qno: 1
part: (h)
marks: 2
type: descriptive
tags: aud.report.companies
difficulty: medium
q: 1
a: 2
note: Ours: the January 2027 Study Material teaches the auditor's reporting of frauds under section 143(12) read with Rule 13 (to the Central Government for ₹ 1 crore or above, to the Audit Committee or Board below it) but not the time limits of ICAI's answer (2 days, 45 days); the item is tagged there and not flagged. ICAI's "see king" is "seeking" split by the PDF's spacing.
---
#### Question
Reporting of fraud of INR 150 Lakhs by auditor will be done within three days of the fraud coming to the knowledge of the auditor to the Board or the Audit Committee along with remedial action taken.
#### Answer
**Incorrect:** The auditor shall report the matter to the Board or the Audit Committee, as the case may be, immediately but not later than 2 days of his knowledge of the fraud, seeking their reply or observations within 45 days. Company is bound to disclose remedial action taken in Board’s report.
#### Approach
Compare the amount with the ₹ 1 crore threshold of section 143(12), then check the time limit and who discloses the remedial action.

---
item: q2a
qno: 2
part: (a)
marks: 4
type: descriptive
tags: aud.ethics.sa210
difficulty: easy
q: 3
a: 3
---
#### Question
CA S is requested to accept the appointment as an auditor of Luck Ltd. With reference to SA 210, what should the auditor determine in order to establish whether the preconditions for an audit are present?
#### Answer
**SA 210 – Agreeing the Terms of Audit Engagements:**

In order to establish whether the preconditions for an audit are present, the auditor of Luck Ltd, CA S shall:

(1) Determine whether the financial reporting framework is acceptable; and

(2) Obtain the agreement of management that it acknowledges and understands its responsibility:

(i) For the preparation of the financial statements in accordance with the applicable financial reporting framework;

(ii) For the internal control as management considers necessary; and

(iii) To provide the auditor with:

- Access to all information such as records, documentation and other matters;
- Additional information that the auditor may request from management for the purpose of the audit; and
- Unrestricted access to persons within the entity from whom the auditor determines it necessary to obtain audit evidence.
#### Approach
Two preconditions: the framework, and management's acknowledgement of its responsibilities; list the three responsibilities.

---
item: q2b
qno: 2
part: (b)
marks: 4
type: descriptive
tags: aud.plan.program
difficulty: easy
q: 3
a: 4
note: ICAI's "ye ars" (question) and "a udit" (answer) are "years" and "audit" split by the PDF's spacing.
---
#### Question
M/s TP & Co., a firm of Chartered Accountants, is auditor of KSR Ltd. for many years. KSR Ltd. has diversified their business into newer areas during the last year. The senior member of the audit team handed over the standard audit programme of earlier years to the audit assistants and instructed them to follow the same. The assistants are conducting the audit accordingly. Whether the attitude of the audit assistants is justified or they are required to keep an open mind? Guide them.
#### Answer
**The Assistant Engaged – Be Encouraged to Keep an Open Mind:**

To start with, an auditor having regard to the nature, size and composition of the business and the dependability of the internal control and the given scope of work, should frame a programme which should aim at providing for a minimum essential work which may be termed as a standard programme. As experience is gained by actually carrying out the work, the programme may be altered to take care of situations which were left out originally, but are found relevant for the particular concern. Similarly, if any work originally provided for proves beyond doubt to be unnecessary or irrelevant, it may be dropped. The assistant engaged in the job should be encouraged to keep an open mind beyond the programme given to him. He should be instructed to note and report significant matters coming to his notice, to his seniors or to the partners or proprietor of the firm engaged for doing the audit.

In the given case, the attitude of assistants of TP & Co. is not justified. They should keep an open mind and go beyond the programme to take care of newer areas of the business of KSR Ltd. into which the Company has diversified.
#### Approach
A standard audit programme is a minimum; ask how it should change when the business changes and what the assistants should do beyond it.

---
item: q2c
qno: 2
part: (c)
marks: 3
type: descriptive
tags: aud.evid.sa530
difficulty: easy
q: 3
a: 4
note: ICAI's question reads "Stratification of the pollution." (for population); kept as printed.
---
#### Question
With reference to SA 530 “Audit Sampling”, explain briefly the following factors that the auditor may consider when determining the sample size for the Test of Details –

(i) The desired level of assurance

(ii) Stratification of the pollution.
#### Answer
**Examples of factors influencing Sample Size for Test of Details:**

(i) **Desired Level of Assurance:** An increase in the auditor’s desired level of assurance that tolerable misstatement is not exceeded by actual misstatement in the population will increase the sample size. Hence, greater the level of assurance that the auditor requires that the results of the sample are in fact indicative of the actual amount of misstatement in the population, the larger the sample size needs to be.

(ii) **Stratification of population:** When stratification of the population is appropriate then sample size will decrease as when there is a wide range (variability) in the monetary size of items in the population, it may be useful to stratify the population. When a population can be appropriately stratified, the aggregate of the sample sizes from the strata generally will be less than the sample size that would have been required to attain a given level of sampling risk, had one sample been drawn from the whole population.
#### Approach
For each factor say which way it moves the sample size and why.

---
item: q2d
qno: 2
part: (d)
marks: 3
type: descriptive
tags: aud.risk.it
difficulty: easy
q: 3
a: 4-5
note: Ours: the January 2027 Study Material teaches the automated environment and its key features (Risk Assessment and Internal Control) but not this list of functions; the topic is in the syllabus, so the item is not flagged. ICAI's answer says "Consider the following aspects instead of:"; kept as printed.
---
#### Question
When a business operates in a more automated environment, we are likely to see several business functions and activities happening within the systems. List down the business functions and activities happening within the systems.
#### Answer
**Relevance of Information Technology in an Audit:**

When a business operates in a more automated environment it is likely that we will see several business functions and activities happening within the systems. Consider the following aspects instead of:

(i) Computation and Calculations are automatically carried out (for example, bank interest computation and inventory valuation).

(ii) Accounting entries are posted automatically (for example, sub-ledger to GL postings is automatic).

(iii) Business policies and procedures, including internal controls, are applied automatically (for example, delegation of authority for journal approvals, customer credit limit checks are performed automatically).

(iv) Reports used in business are produced from systems. Management and other stakeholders rely on these reports and information produced (for example, debtors ageing report).

(v) User access and security are controlled by assigning system roles to users **(for example,** segregation of duties can be enforced effectively).
#### Approach
Walk through what a system does by itself: calculations, postings, controls, reports and access.

---
item: q3a
qno: 3
part: (a)
marks: 4
type: descriptive
tags: aud.complete.sa580
difficulty: easy
q: 5
a: 5-6
note: ICAI's "an d" (question) is "and" split by the PDF's spacing.
---
#### Question
CA K is re-appointed as the auditor of B Ltd. He wants to re-confirm certain matters and has asked the management to give written representations for the same. Under what circumstances can an auditor ask the management to reconfirm its acknowledgement and understanding of responsibilities in written representation?
#### Answer
**Other Written Representation:** Other SAs require the auditor to request written representations. If, in addition to such required representations, the auditor determines that it is necessary to obtain one or more written representations to support other audit evidence relevant to the financial statements or one or more specific assertions in the financial statements, the auditor shall request such other written representations.

The written representations draw on the agreed acknowledgement and understanding of management of its responsibilities by requesting confirmation that it has fulfilled them. **The auditor, CA K of B Ltd,** may also ask **management of B Ltd** to reconfirm its acknowledgement and understanding of those responsibilities in written representations. This is particularly appropriate when:

(i) Those who signed the terms of the audit engagement on behalf of the entity no longer have the relevant responsibilities;

(ii) The terms of the audit engagement were prepared in a previous year;

(iii) There is any indication that management misunderstands those responsibilities; or

(iv) Changes in circumstances make it appropriate to do so.
#### Approach
Think of SA 580 and the events that make the original acknowledgement (in the engagement letter) stale.

---
item: q3b
qno: 3
part: (b)
marks: 4
type: descriptive
tags: aud.items.ppe, aud.evid.assertions
difficulty: medium
q: 5
a: 6
note: ICAI's answer calls the company "B Ltd" (the question: QRS Ltd.), point (i) ends "authorized personnel" without a full stop, and point (iv) begins "n case"; all kept as printed.
---
#### Question
CA R is the statutory auditor of QRS Ltd. While performing testing of additions during the year, he wanted to verify that:

(i) All PPE (property, plant and equipment) are in the name of the entity he is auditing.

(ii) For all additions to land and building in particular, the auditor desires to have concrete about the ownership.

(iii) The auditor wants to know whether the entity has valid legal ownership rights over the PPE, where it is kept as security for any borrowings.

Advise the auditor on the audit procedure to be undertaken by him to establish the Rights and Obligations of the entity over the PPE.
#### Answer
**Audit procedure to establish Rights and Obligations of the entity over PPE:**

(i) In addition to the procedures undertaken for verifying completeness of additions to PPE during the period under audit, CA R, the statutory auditor of B Ltd, while performing testing of additions should also verify that all PPE purchase invoices are in the name of the entity that entitles legal title of ownership to the respective entity. Verify whether the PPE additions have been approved by authorized personnel

(ii) For all additions to land, building in particular, CA R, the statutory auditor of B Ltd, should obtain copies of conveyance deed/ sale deed to establish whether the entity is mentioned to be the legal and valid owner.

(iii) The auditor should insist and verify the original title deeds for all immoveable properties held as at the balance sheet date.

(iv) n case the entity has given such immoveable property as security for any borrowings and the original title deeds are not available with the entity, CA R, the statutory auditor of B Ltd should request the entity’s management for obtaining a confirmation from the respective lenders that they are holding the original title deeds of immoveable property as security.

(v) In addition, the auditor should also verify the register of charges, available with the entity to assess that any charge has been created against the PPE.
#### Approach
Match each of the three things the auditor wants to verify with the document that proves it: invoices, deeds, lenders' confirmations and the register of charges.

---
item: q3c
qno: 3
part: (c)
marks: 3
type: descriptive
tags: aud.items.expenses
difficulty: easy
q: 5
a: 6-7
note: ICAI's question begins "Proft and Loss account"; kept as printed.
---
#### Question
Proft and Loss account of an organization shows various types of expenses like rent, power and fuel, repairs and maintenance, insurance, travelling, miscellaneous expenses etc., that are essential and incidental to running of business operations. What are the attributes that an auditor generally prefers for vouching these types of expenses?
#### Answer
**Attributes to be preferred for vouching other expenses:**

While the auditor may choose to analyse the monthly trends for expenses like rent, power and fuel, an auditor generally prefers to vouch for other expenses to verify following attributes:

(i) Whether the expenditure pertained to current period under audit;

(ii) Whether the expenditure qualified as a revenue and not capital expenditure;

(iii) Whether the expenditure had a valid supporting documents like travel tickets, insurance policy, third party invoice etc.;

(iv) Whether the expenditure has been classified under the correct expense head;

(v) Whether the expenditure was authorised as per the delegation of authority matrix;

(vi) Whether the expenditure was in relation to the entity’s business and not a personal expenditure.
#### Approach
List what a voucher can prove about an expense: period, revenue nature, support, classification, authorisation and business purpose.

---
item: q3d
qno: 3
part: (d)
marks: 3
type: descriptive
tags: aud.items.current
difficulty: easy
q: 5
a: 7
note: ICAI's answer labels the last two classes "(c) Cash on hand;" and "(c) Others (specify nature)" and writes "Schedule III (Part 1)"; kept as printed.
---
#### Question
How is “Cash and cash equivalents” disclosed in the Financial Statements as required under Schedule III (part I) to Companies Act, 2013?
#### Answer
**Disclosure of Cash & Cash Equivalent in the Financial Statements:**

Regarding Cash and cash equivalents- Ensure whether the following disclosures as required under Schedule III (Part 1) to Companies Act, 2013 have been made:

(i) Cash and cash equivalents shall be classified as:

(a) Balances with banks;

(b) Cheques, drafts on hand;

(c) Cash on hand;

(c) Others (specify nature)

(ii) Earmarked balances with banks (for example, for unpaid dividend) shall be separately stated.

(iii) Balances with banks to the extent held as margin money or security against the borrowings, guarantees, other commitments shall be disclosed separately.

(iv) Repatriation restrictions, if any, in respect of cash and bank balances shall be separately stated.

(v) Bank deposits with more than 12 months’ maturity shall be disclosed separately.
#### Approach
Start with the classification of cash and cash equivalents, then the balances that must be shown separately.

---
item: q4a
qno: 4
part: (a)
marks: 4
type: descriptive
tags: aud.risk
oos: yes
difficulty: easy
q: 7
a: 8
note: Old scheme, out of syllabus (ours): the policies and procedures an entity may implement to prevent and detect non-compliance with laws and regulations are SA 250 (Consideration of Laws and Regulations in an Audit of Financial Statements), which old Paper 6 taught; the new-scheme Paper 5 syllabus does not name SA 250 and the January 2027 Study Material mentions it only in passing (Audit of Banks), so the item carries only its nearest chapter (risk assessment and internal control). ICAI's answer heading reads "Types of polices and procedures" and its list numbers the last two points "(vi)"; kept as printed.
---
#### Question
Statutory Auditors of TRB Ltd. observed various instances when either the TDS required to be deducted has not been deducted or deducted at lower than prescribed rates resulting in non-compliance of Income Tax provisions. Besides this, non-compliance under other acts like Labour Laws was also noticed by the auditor. What type of policies and procedures will you implement to assist in prevention and detection of non-compliance with laws and regulations?
#### Answer
**Types of polices and procedures to assist prevention and detection of non-compliance with laws & regulation:**

The following are examples of the types of policies and procedures, TRB Ltd may implement to assist in the prevention and detection of non-compliance with laws and regulations:

(i) Monitoring legal requirements and ensuring that operating procedures are designed to meet these requirements.

(ii) Instituting and operating appropriate systems of internal control.

(iii) Developing, publicizing and following a code of conduct.

(iv) Ensuring employees are properly trained and understand the code of conduct.

(v) Monitoring compliance with the code of conduct and acting appropriately to discipline employees who fail to comply with it.

(vi) Engaging legal advisors to assist in monitoring legal requirements.

(vi) Maintaining a register of significant laws and regulations with which the entity has to comply within its particular industry and a record of complaints.
#### Approach
Think of what management can put in place: monitoring the law, internal control, a code of conduct with training and discipline, legal advisers and a register of laws.

---
item: q4b
qno: 4
part: (b)
marks: 4
type: descriptive
tags: aud.report.caro
difficulty: medium
q: 7
a: 8-9
note: Ours: the question and ICAI's answer are on CARO 2016 (clauses (ix) and (xiv) of paragraph 3), which CARO 2020 superseded; the January 2027 Study Material teaches the same two matters under CARO 2020, clause (x)(a) and (b) of paragraph 3 (with section 62 added and term loans moved to clause (ix)), so the item is tagged there and not flagged.
---
#### Question
State the auditor’s reporting responsibilities under CARO 2016 when –

(i) The company has raised money by public issue.

(ii) The company has made private placement of shares.
#### Answer
**Auditor’s reporting responsibilities under CARO 2016:**

(i) **Clause (ix) para 3 of CARO, 2016 states -** whether moneys raised by way of initial public offer or further public offer (including debt instruments) and term loans were applied for the purposes for which those are raised. If not, the details together with delays or default and subsequent rectification, if any, as may be applicable, be reported.

(ii) **Clause (xiv) para 3 of CARO, 2016 states** - whether the company has made any preferential allotment or private placement of shares or fully or partly convertible debentures during the year under review and if so, as to whether the requirement of section 42 of the Companies Act, 2013 have been complied with and the amount raised have been used for the purposes for which the funds were raised. If not, provide the details in respect of the amount involved and nature of non-compliance.
#### Approach
Recall the CARO clause on the use of money raised by public offers and the one on preferential allotment or private placement.

---
item: q4c
qno: 4
part: (c)
marks: 3
type: descriptive
tags: aud.risk.sa315
difficulty: easy
q: 8
a: 9
note: ICAI's question begins "Auditor or Sunshine Ltd." and its answer prints "non- routine" in the first sentence; kept as printed.
---
#### Question
Auditor or Sunshine Ltd. is of the view that due to greater management intervention to specify accounting treatment, the risk of material misstatement is greater for non-routine transactions. Is the view of the auditor correct? Specify the other matters due to which the risk of material misstatement is greater for significant non-routine transactions.
#### Answer
**Risk of Material Misstatement – Greater for Significant Non-Routine Transactions:**

Significant risks often relate to significant non- routine transactions or judgmental matters. Non-routine transactions are transactions that are unusual, due to either size or nature, and that therefore occur infrequently.

Risks of Material Misstatement– Greater for Significant Non-Routine Transactions

Risks of material misstatement may be greater for significant non-routine transactions arising from matters such as the following:

(a) Greater management intervention to specify the accounting treatment.

(b) Greater manual intervention for data collection and processing.

(c) Complex calculations or accounting principles.

(d) The nature of non-routine transactions, which may make it difficult for the entity to implement effective controls over the risks.

Keeping in view above, view of Auditor of Sunshine Ltd is correct.
#### Approach
Recall SA 315 on significant risks: why unusual transactions are harder to control, besides management intervention.

---
item: q4d
qno: 4
part: (d)
marks: 3
type: descriptive
tags: aud.evid.sa520, aud.items.expenses
difficulty: easy
q: 8
a: 9
note: ICAI's "su gar" is "sugar" split by the PDF's spacing.
---
#### Question
Whether it is possible to independently verify the correctness of some of the items of expenses included in the statement of profit and loss? Explain with the help of some examples.
#### Answer
Often it is possible to independently verify the correctness of some of the items of expenses included in the Statement of Profit and Loss.

**For instance,** the cost of importing goods which are subjected to an ad-valorem duty at uniform rate can be verified from the amount of duty paid. Similarly, a quantity of sugar sold by sugar mill can be verified independently from the amount of excise duty/ GST paid.

Similarly, the amount of any income or expenses which has a direct relationship with the amount of profits or that of sales can be verified independently, *e.g.,* commission paid to a manager calculated on the basis of net profits, commission paid to a selling agent as percentage of sales, etc. Such calculation of ratios, trends and comparisons is also termed as analytical review.

Thus, it is important to note that Analytical procedures may help identify the existence of unusual transactions or events, and amounts, ratios, and trends that might indicate matters that have audit implications. Unusual or unexpected relationships that are identified may assist the auditor in identifying risks of material misstatement, especially risks of material misstatement due to fraud.
#### Approach
Look for expenses tied by a fixed relationship to another figure (duty paid, profits, sales) that can be recomputed.

---
item: q5a
qno: 5
part: (a)
marks: 4
type: descriptive
tags: aud.report.sa700
difficulty: easy
q: 9-10
a: 10
note: ICAI's question reads "F.Y. 2020 -2021" in the PDF's text, printed as 2020-2021; its answer point (a) has no full stop; kept as printed.
---
#### Question
M/s S & Associates are the Statutory Auditors of Real Ltd., a company engaged in the business of manufacturing of garments. The auditor has completed the audit and is in the process of forming an opinion on the financial statements for the F.Y. 2020-2021. CA K, the engagement partner, wants to conclude that whether the financial statements as a whole are free from material misstatements, whether due to fraud or error. What factors he should consider to reach that conclusion?
#### Answer
**Factors to be considered to form an opinion:**

The auditor shall form an opinion on whether the financial statements are prepared, in all material respects, in accordance with the applicable financial reporting framework.

In order to form that opinion, the auditor shall conclude as to whether the auditor has obtained reasonable assurance about whether the financial statements as a whole are free from material misstatement, whether due to fraud or error. That conclusion shall take into account:

(a) The auditor’s conclusion, in accordance with SA 330, whether sufficient appropriate audit evidence has been obtained

(b) The auditor’s conclusion, in accordance with SA 450, whether uncorrected misstatements are material, individually or in aggregate.

(c) The evaluations required

(i) The auditor shall evaluate whether the financial statements are prepared in accordance with the requirements of the applicable financial reporting framework.

(ii) This evaluation shall include consideration of the qualitative aspects of the entity’s accounting practices, including indicators of possible bias in management’s judgments.
#### Approach
Recall SA 700's reasonable-assurance conclusion and the three things it takes into account (SA 330, SA 450 and the evaluations).

---
item: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
oos: yes
difficulty: easy
q: 10
a: 11
note: Old scheme, out of syllabus (ours): the resignation of a company's auditor under section 140(2) and (3) of the Companies Act, 2013 (Form ADT-3 and the penalty) was part of old Paper 6's Company Audit chapter (appointment, removal and resignation of auditors); neither the new-scheme Paper 5 syllabus nor the January 2027 Study Material teaches it. No tag. ICAI's answer writes both "Form ADT–3" and "ADT-3", and both "Rs 35000" and "₹ 35000"; kept as printed.
---
#### Question
CA G was appointed as the auditor of RJ Ltd. at the remuneration of INR 35000. He resigned after 7 months on health grounds but failed to file the required statement with the Registrar of Companies. What are the responsibilities of CA G as per section 140(2) of the Companies Act, 2013? As per section 140(3) of the Companies Act, 2013, how much fine will be levied on CA G for non-compliance of Sec 140(2) of the Companies Act 2013?
#### Answer
**Casual Vacancy by Resignation:**

As per section 140(2) of the Act, the auditor CA G who has resigned from the company shall file within a period of 30 days from the date of resignation, a statement in the prescribed Form ADT–3 (as per Rule 8 of CAAR) with the company and the Registrar.

The auditor shall indicate the reasons and other facts as may be relevant with regard to his resignation.

In the given case, CA G, auditor of RJ Ltd resigned after 7 months on health grounds and also, he did not file ADT-3 with the Registrar. So, he did not fulfil his responsibilities as stated under Section 140(2).

So, the auditor CA G shall be liable to a penalty of fifty thousand rupees or the remuneration of the auditor Rs 35000, whichever is less i.e., ₹ 35000, and in case of continuing failure, with further penalty of five hundred rupees for each day after the first during which such failure continues, subject to a maximum of Two lakh rupees as per section 140(3).
#### Approach
State the filing duty (what, with whom, by when), then compare ₹ 50,000 with the remuneration for the penalty.

---
item: q5c
qno: 5
part: (c)
marks: 3
type: descriptive
tags: aud.evid.sa500
difficulty: easy
q: 10
a: 11
note: ICAI's "depen ding" and "exist ence" are "depending" and "existence" split by the PDF's spacing; "such as a inventory or bond" is as printed.
---
#### Question
CA K audited the books of accounts of E Ltd. for the financial year 2020-2021. The auditor used an audit procedure according to which all the documents and records maintained by the company were checked in detail to obtain audit evidence. Explain the audit procedure used by the auditor and its reliability.
#### Answer
**Audit Procedure:**

Inspection involves examining records or documents, whether internal or external, in paper form, electronic form, or other media, or a physical examination of an asset. Inspection of records and documents provides audit evidence of varying degrees of reliability, depending on their nature and source and, in the case of internal records and documents, on the effectiveness of the controls over their production.

Example of inspection used as a test of controls is inspection of records for evidence of authorisation.

Some documents represent direct audit evidence of the existence of an asset, for example, a document constituting a financial instrument such as a inventory or bond. Inspection of such documents may not necessarily provide audit evidence about ownership or value. In addition, inspecting an executed contract may provide audit evidence relevant to the entity’s application of accounting policies, such as revenue recognition. Inspection of tangible assets may provide reliable audit evidence with respect to their existence, but not necessarily about the entity’s rights and obligations or the valuation of the assets. Inspection of individual inventory items may accompany the observation of inventory counting.

In view of above, it can be concluded that CA K used Inspection as an audit procedure.
#### Approach
Name the SA 500 procedure for examining records and documents, then say what decides how reliable its evidence is.

---
item: q5d
qno: 5
part: (d)
marks: 3
type: descriptive
tags: aud.report.companies
difficulty: medium
q: 10
a: 11-12
note: ICAI's question (Suggested Answers) cites "Sec 143(3)(j)" and "Rule, 2014"; its answer numbers two points "(iv)" (the second is Rule 11(f) on dividends) and writes "it’s knowledge"; kept as printed.
---
#### Question
As per Sec 143(3)(j) of the Companies Act, 2013, the auditor’s report shall also include such other matters as may be prescribed by Rule 11 of the Companies (Audit and Auditors) Rule, 2014. Discuss those matters on which views and comments of the auditor are required.
#### Answer
**Others Matters prescribed by Rule 11 to include in Auditor’s Report:**

As per **section 143(3)(j)-** the auditor’s report shall also state such other matters as may be prescribed. Rule 11 of the Companies (Audit and Auditors) Rules, 2014 prescribes the other matters to be included in auditor’s report. The auditor’s report shall also include their views and comments on the following matters, namely:-

(i) whether the company has disclosed the impact, if any, of pending litigations on its financial position in its financial statement;

(ii) whether the company has made provision, as required under any law or accounting standards, for material foreseeable losses, if any, on long term contracts including derivative contracts;

(iii) whether there has been any delay in transferring amounts, required to be transferred, to the Investor Education and Protection Fund by the company.

(iv) **(1)** Whether the management has represented that, to the best of it’s knowledge and belief, other than as disclosed in the notes to the accounts, no funds have been advanced or loaned or invested (either from borrowed funds or share premium or any other sources or kind of funds) by the company to or in any other person(s) or entity(ies), including foreign entities (“Intermediaries”), with the understanding, whether recorded in writing or otherwise, that the Intermediary shall, whether, directly or indirectly lend or invest in other persons or entities identified in any manner whatsoever by or on behalf of the company (“Ultimate Beneficiaries”) or provide any guarantee, security or the like on behalf of the Ultimate Beneficiaries;

**(2)** Whether the management has represented, that, to the best of it’s knowledge and belief, other than as disclosed in the notes to the accounts, no funds have been received by the company from any person(s) or entity(ies), including foreign entities (“Funding Parties”), with the understanding, whether recorded in writing or otherwise, that the company shall, whether, directly or indirectly, lend or invest in other persons or entities identified in any manner whatsoever by or on behalf of the Funding Party (“Ultimate Beneficiaries”) or provide any guarantee, security or the like on behalf of the Ultimate Beneficiaries; and

**(3)** Based on such audit procedures that the auditor has considered reasonable and appropriate in the circumstances, nothing has come to their notice that has caused them to believe that the representations under sub-clause (i) and (ii) contain any material mis-statement.

(iv) Whether the dividend declared or paid during the year by the company is in compliance with section 123 of the Companies Act, 2013.
#### Approach
Go through Rule 11's clauses in order: pending litigations, foreseeable losses, IEPF transfers, the funding representations and dividends.

---
item: q6a-i
qno: 6
part: (a)(i)
marks: 4
type: descriptive
tags: aud.report
oos: yes
difficulty: medium
q: 12
a: 13-14
note: Old scheme, out of syllabus (ours): the auditor's duty for frauds already detected by management or already reported under section 143(12) by the cost auditor or secretarial auditor (ICAI's Guidance Note on Reporting on Fraud) was taught in old Paper 6; the January 2027 Study Material teaches only the basic reporting of frauds under section 143(12) and Rule 13 (Audit Report chapter) and none of this, so the item carries only its nearest chapter. ICAI prints (4 Marks) once, after (a)(i) and before the OR alternative (a)(ii) (q6a-ii). ICAI's "vis -à- vis" and "o ffence" are "vis-à-vis" and "offence" split by the PDF's spacing.
---
#### Question
CA R is the statutory auditor and Mr. P is the cost auditor of DEF Ltd., a company engaged in the production of tyres. Mr. P noticed a fraud of INR 1.25 crores done by the senior manager of the company and immediately informed the audit committee even before CA R was aware of the fraud. State the duty of CA R under section 143(12) of the Companies Act on reporting on frauds already detected and reported.
#### Answer
**Reporting on Frauds already detected and reported:**

The auditor, CA R should apply professional skepticism to evaluate/verify that the fraud was indeed identified/detected in all aspects by the management or through the company’s vigil/whistle blower mechanism so that distinction can be clearly made with respect to frauds identified/detected due to matters raised by the auditor vis-à-vis those identified/detected by the company through its internal control mechanism.

Since reporting on fraud under section 143(12) is required even by the cost auditor and the secretarial auditor of the company, it is possible that a suspected offence involving fraud may have been reported by them even before the auditor became aware of the fraud.

Here too, if a suspected offence of fraud has already been reported under section 143(12) by such other person, and the auditor becomes aware of such suspected offence involving fraud, he need not report the same since he has not per se identified the suspected offence of fraud.

However, in case of a fraud which involves or is expected to involve individually, an amount of ₹ 1 crore or more, the auditor should review the steps taken by the management/those charged with governance with respect to the reported instance of suspected offence of fraud stated above, and if he is not satisfied with such steps, he should state the reasons for his dissatisfaction in writing and request the management/ those charged with governance to perform additional procedures to enable the auditor to satisfy himself that the matter has been appropriately addressed. If the management/those charged with governance fail to undertake appropriate additional procedures within 45 days of his request, the auditor would need to evaluate if he should report the matter to the Central Government in accordance with Rule 13 of the Companies (Audit and Auditors) Rules, 2014.
#### Approach
Ask whether the auditor has himself identified the fraud, and what more he must do when the amount is ₹ 1 crore or above.

---
item: q6a-ii
alt: q6a-i
qno: 6
part: (a)(ii)
marks: 4
type: descriptive
tags: aud.entities.local
difficulty: easy
q: 13
a: 14
note: ICAI prints this as the OR alternative to Q6(a)(i), whose (4 Marks) (printed once, after (a)(i)) the pair shares. The Suggested Answers read "Local Fund Audit Wing of a State of a State Government" (the question-paper scan: "of a State Government"); kept as printed.
---
#### Question
Local Fund Audit Wing of a State of a State Government has appointed you to audit the accounts of one of the Local body governed by it. As an auditor, what will be your reporting areas?
#### Answer
**Reporting areas in audit of Local Fund:**

The external control of municipal expenditure is exercised by the state governments through the appointment of auditors to examine municipal accounts. However, the municipal corporations of Delhi, Mumbai and a few others have powers to appoint their own auditors for regular external audit.

The important objectives of audit are:

(a) reporting on the fairness of the content and presentation of financial statements;

(b) reporting upon the strengths and weaknesses of systems of financial control;

(c) reporting on the adherence to legal and/or administrative requirements;

(d) reporting upon whether value is being fully received on money spent; and

(e) detection and prevention of error, fraud and misuse of resources.
#### Approach
Recall the objectives of the audit of local bodies: the financial statements, financial control, compliance, value for money and fraud.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: aud.bank.advances
difficulty: medium
q: 13
a: 14-15
note: ICAI's answer prints "funded exposure of more than I 5 crores" (an I where the rupee sign would be, visible on the page); kept as printed. ICAI's "consider ed" (question) and "di fficulties" (answer) are split by the PDF's spacing.
---
#### Question
In a bank, all accounts should be kept within the drawing power and the sanctioned limit. The accounts which exceed the sanctioned limit or drawing power should be brought to the notice of the management regularly. Analyse the following points to be considered in the computation of drawing power in case of bank audit.

(i) Bank’s Duties

(ii) Auditor’s concern

(iii) Computation of DP

(iv) Stock audit
#### Answer
**Computation of Drawing Power:**

(i) **Bank’s Duties:** Banks should ensure that drawings in the working capital account are covered by the adequacy of the current assets. Drawing power is required to be arrived at based on current stock statement. However, considering the difficulties of large borrowers, stock statements relied upon by the banks for determining drawing power should not be older than three months. The outstanding in the account based on drawing power calculated from stock statements older than three months is deemed as irregular.

(ii) **Auditor’s Concern:** The stock statements, quarterly returns and other statements submitted by the borrower to the bank should be scrutinized in detail. The audited Annual Report submitted by the borrower should be scrutinized properly. The monthly stock statement of the month for which the audited accounts are prepared and submitted should be compared and the reasons for deviations, if any, should be ascertained.

(iii) **Computation of DP:** It needs to be ensured that the drawing power is calculated as per the extant guidelines formulated by the Board of Directors of the respective bank and agreed upon by the concerned statutory auditors. Special consideration should be given to proper reporting of sundry creditors for the purposes of calculating drawing power.

(iv) **Stock Audit:** The stock audit should be carried out by the bank for all accounts having funded exposure of more than I 5 crores. Auditors can also advise for stock audit in other cases if the situation warrants the same. Branches should obtain the stock audit reports from lead bank in the cases where the Bank is not leader of the consortium of working capital. The report submitted by the stock auditors should be reviewed during the course of the audit and special focus should be given to the comments made by the stock auditors on valuation of security and calculation of drawing power.
#### Approach
Take the four heads in turn: the age of stock statements, what the auditor compares, the bank's guidelines (and creditors), and when a stock audit is required.

---
item: q6c
qno: 6
part: (c)
marks: 3
type: descriptive
tags: aud.entities.govt
difficulty: easy
q: 13
a: 15
---
#### Question
In case of Government entities, audit of accounts of stores and inventories has been developed as a part of expenditure audit. Discuss about the duties and responsibilities entrusted to C&AG.
#### Answer
**Audit of Accounts of Stores and Inventories in Government Companies:**

Audit of the accounts of stores and inventories has been developed as a part of expenditure audit with reference to the duties and responsibilities entrusted to C&AG. Audit is conducted:-

(i) to ascertain whether the Regulations governing purchase, receipt and issue, custody, sale and inventory taking of stores are well devised and properly carried out.

(ii) to bring to the notice of the government any deficiencies in quantities of stores held or any defects in the system of control.

(iii) to verify that the purchases are properly sanctioned, made economical and in accordance with the Rules for purchase laid down by the competent authority.

(iv) to ensure that the prices paid are reasonable and are in agreement with those shown in the contract for the supply of stores, and that the certificates of quality and quantity are furnished by the inspecting and receiving units. Cases of uneconomical purchase of stores and losses attributable to defective or inferior quality of stores are specifically brought by the audit.

(v) to check the accounts of receipts, issues and balances regarding accuracy, correctness and reasonableness of balances in inventories with particular reference to the specified norms for level of consumption of inventory holding. Any excess or idle inventory is specifically mentioned in the report and periodical verification of inventory is also conducted to ensure their existence. When priced accounts are maintained, the auditor should see that the prices charged are reasonable and have been reviewed from time to time. The valuation of the inventories is seen carefully so that the value accounts tally with the physical accounts and that adjustment of profits or losses due to revaluation, inventory taking or other causes is carried out.
#### Approach
Follow stores through their life: the regulations, purchase and its sanction, prices and quality, then receipts, issues, balances and valuation.

---
item: q6d
qno: 6
part: (d)
marks: 3
type: descriptive
tags: aud.entities.npo
difficulty: easy
q: 13
a: 16
note: ICAI's question reads "a charitable institutions"; kept as printed. ICAI's "membersh ip" is "membership" split by the PDF's spacing.
---
#### Question
CA A is appointed as the auditor of a charitable institutions. Discuss the audit procedure undertaken by him while auditing the Subscription and Donation received by the charitable institution.
#### Answer
**Audit Procedure in audit of Subscriptions & donations:**

Audit Procedure to be undertaken by CA A in respect of Subscriptions and donations received by a Charitable Institution is:

(i) Ascertaining, if any, the changes made in amount of annual or life membership subscription during the year.

(ii) Whether official receipts are issued;

(a) confirming that adequate control is imposed over unused receipt books;

(b) obtaining all receipt books covering the period under review;

(c) test checking the counterfoils with the cash book; any cancelled receipts being specially looked into;

(d) obtaining the printed list of subscriptions and donations and agreeing them with the total collections shown in the accounts;

(e) examining the system of internal check regarding moneys received from box collections, flag days, etc. and checking the amount received from representatives, with the correspondence and the official receipts issued; paying special attention to the system of control exercised over collections and the steps taken to ensure that all collections made have been accounted for; and

(f) verifying the total subscriptions and donations received with any figures published in reports, etc. issued by the charity.
#### Approach
Think of how money comes in (rates, receipts, receipt books, box collections) and how each is controlled and agreed with the accounts.
