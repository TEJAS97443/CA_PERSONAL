<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p6-pyq-may2023
paper: p6
kind: pyq
attempt: may2023
qfile: old/p6/pyq-may2023-a.pdf
afile: old/p6/pyq-may2023-a.pdf
paperfile: old/p6/pyq-may2023-q.pdf
choice: q1; any 4 of q2-q6; q1: any 7 of (a)-(h)
q: 1
status: checked
by: tx-39
date: 2026-10-20
note: Old-scheme Intermediate Paper 6 Auditing and Assurance, May 2023. Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question before its answer; the question-paper scan is linked as paperfile and was not used for the text (its wording differs slightly in places, e.g. "audit evidences" in Q1(a)). ICAI published only the 70-mark descriptive part (Q1-Q6): the 30-mark Part I MCQ booklet and its answers are in neither file, so this document has no MCQ items. Instructions: the lines printed under the paper's title on p.1. No choice rule: Q1 says "Answer any seven" of its eight 2-mark statements (a)-(h) "(7 x 2 = 14 Marks)", a choice inside a question that choice: cannot express (q1; any 4 of q2-q6 would count 16 marks for Q1 and a maximum of 72), so, as with o-p7-mtp-may2018-s1 and o-p6-pyq-nov2023, the paper is practice only and never sat; each Q1 statement is an item of 2 marks under the shared stem c1. Q5(b) has an OR alternative (q5b-or); ICAI prints one (4 Marks), after the OR question. Bold lead-ins and headings of ICAI's answers are kept as **bold**; the "OR" lines between Q5(b) and its alternative (question and answer) are left out, the alternative being its own item. Old-scheme mapping (ours): Q1(d) (remuneration of a company auditor, section 142) and Q6(a) (which companies must constitute an Audit Committee) are flagged out of syllabus, see their notes. Accepted numbers (each read on the page): 6 is the paper's title on p.1 (PAPER – 6 : AUDITING AND ASSURANCE); 1 to 6 are the question numbers, which the Suggested Answers print once (Question N, before the reproduced question) and not again before the answer (headed only Answer), while check.py expects each number on the answer side as well. check.py's marks rule for "any n" questions accounts for Q1's eighth 2-mark statement against its (7 x 2 = 14 Marks). | choice: added by choice-ext from ICAI's printed instruction (2026-10-20): Question No. 1 is compulsory and any four questions from the remaining five (the Instructions), and Q1's "(Answer any seven)" over its eight 2-mark statements (a)-(h), written q1: any 7 of (a)-(h); the paper can now be sat (maximum 70, as ICAI prints), and the "No choice rule" above predates the part-choice syntax.
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
tags: aud.plan.sa300, aud.doc.sa230
difficulty: easy
q: 1
a: 1
---
#### Question
The "documentation of the overall audit strategy" is a record of the audit evidence considered necessary to properly plan the audit and to assign various audit functions to the engagement team.
#### Answer
**Incorrect:** The documentation of the overall audit strategy is a record of the key decisions considered necessary to properly plan the audit and to communicate significant matters to the engagement team.
#### Approach
Recall what SA 300 says the documentation of the overall audit strategy records, and compare it word for word with the statement.

---
item: q1b
case: c1
qno: 1
part: (b)
marks: 2
type: descriptive
tags: aud.report.sa701
difficulty: easy
q: 1
a: 1
---
#### Question
Communicating key audit matters in the auditor's report is a separate opinion on individual matters.
#### Answer
**Incorrect:** Communicating key audit matters in the auditor’s report are in the context of the auditor having formed an opinion on the financial statements as a whole. Communicating key audit matters in the auditor’s report is not a separate opinion on individual matters.

**Alternative solution**

**Incorrect:** Communicating key audit matters in the auditor’s report is not a separate opinion on individual matters. The auditor shall describe each key audit matter, using an appropriate subheading, in a separate section of the auditor’s report under the heading “Key Audit Matters”.

---
item: q1c
case: c1
qno: 1
part: (c)
marks: 2
type: descriptive
tags: aud.items.expenses, aud.items.ppe
difficulty: easy
q: 1
a: 2
---
#### Question
Amortization represents systematic allocation of the depreciable amount of an item of Property, Plant and Equipment (PPE) over its useful life.
#### Answer
**Incorrect:** Depreciation represents systematic allocation of the depreciable value of an item of PPE over its useful life whereas amortisation represents systematic allocation of the depreciable amount of an intangible asset over its useful life.
#### Approach
Ask which kind of asset is amortised and which is depreciated.

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
note: Old scheme, out of syllabus (ours): the remuneration of a company's auditor under section 142 of the Companies Act, 2013 was part of old Paper 6's Company Audit chapter (appointment, remuneration, rights and duties of the auditor); neither the new-scheme Paper 5 syllabus nor the January 2027 Study Material teaches it (the Study Material cites section 142 only for who fixes a banking company auditor's remuneration). No tag.
---
#### Question
As per section 142 of Companies Act, 2013, the remuneration to the auditor shall also include any facility provided to him.
#### Answer
**Correct:** The remuneration, in addition to the fee payable to an auditor, includes the expenses, if any, incurred by the auditor in connection with the audit of the company and any facility extended to him.

However, it does not include any remuneration paid to him for any other service rendered by him at the request of the company.

---
item: q1e
case: c1
qno: 1
part: (e)
marks: 2
type: descriptive
tags: aud.evid.sa500
difficulty: easy
q: 1
a: 2
---
#### Question
Appropriateness is the measure of the quantity of audit evidence.
#### Answer
**Incorrect:** Appropriateness is the measure of the quality of audit evidence, that is, its relevance and its reliability in providing support for the conclusions on which the auditor’s opinion is based.

Sufficiency is the measure of the quantity of audit evidence.
#### Approach
SA 500 pairs two words with quantity and quality: decide which belongs to which.

---
item: q1f
case: c1
qno: 1
part: (f)
marks: 2
type: descriptive
tags: aud.evid.sa520
difficulty: easy
q: 1
a: 2
note: ICAI prints two answers, the first "Correct", then an "Alternative solution" "Incorrect" (every auditor, not only experienced ones, uses analytical procedures in all stages); both are transcribed as printed.
---
#### Question
Analytical procedures are used in all stages of audit by experienced auditors.
#### Answer
**Correct:** Experienced auditors use analytical procedures in all stages of the audit. Analytical Procedures are required in the planning phase and it is often done during the testing phase. In addition, these are also required during the completion phase.

**Alternative solution**

**Incorrect:** Every auditor shall use analytical procedures in all stages of the audit. Analytical Procedures are required in the planning phase and it is often done during the testing phase. In addition, these are also required during the completion phase.

---
item: q1g
case: c1
qno: 1
part: (g)
marks: 2
type: descriptive
tags: aud.entities.firms
difficulty: easy
q: 1
a: 2
---
#### Question
In the case of Co-operative societies, contribution to Education fund is a charge on profits and not an appropriation.
#### Answer
**Correct**: Some of the State Acts provide that every society shall contribute annually towards the Education Fund of the State Federal Society, at the appropriate rate as per the class of the society. Therefore, contribution to Education Fund is a charge on profits and not an appropriation.

---
item: q1h
case: c1
qno: 1
part: (h)
marks: 2
type: descriptive
tags: aud.risk.it
difficulty: easy
q: 1
a: 2
---
#### Question
If a company uses an integrated enterprise resource planning system (ERP) viz., SAP, Oracle etc., then it is considered less complex and easy to audit compared to using an off-the-shelf accounting software.
#### Answer
**Incorrect:** If a company uses an integrated enterprise resource planning system (ERP) viz., SAP, Oracle etc., then it is considered more complex to audit.

On the other hand, if a company is using off-the-shelf accounting software, then it is likely to be less automated, less complex and easy to audit.

---
item: q2a
qno: 2
part: (a)
marks: 4
type: descriptive
tags: aud.evid.sa530, aud.risk.model
difficulty: easy
q: 2
a: 3
---
#### Question
While designing an audit sample, the auditor shall determine a sample size sufficient to reduce the sampling risk to an acceptably low level. In this context, explain sampling risk and non-sampling risk.
#### Answer
**Sampling risk –** The risk that the auditor’s conclusion based on a sample may be different from the conclusion if the entire population were subjected to the same audit procedure.

Sampling risk can lead to two types of erroneous conclusions:

(i) In the case of a test of controls, that controls are more effective than they actually are, or in the case of a test of details, that a material misstatement does not exist when in fact it does. The auditor is primarily concerned with this type of erroneous conclusion because it affects audit effectiveness and is more likely to lead to an inappropriate audit opinion.

(ii) In the case of a test of controls, that controls are less effective than they actually are, or in the case of a test of details, that a material misstatement exists when in fact it does not. This type of erroneous conclusion affects audit efficiency as it would usually lead to additional work to establish that initial conclusions were incorrect.

**Non-sampling risk –** The risk that the auditor reaches an erroneous conclusion for any reason not related to sampling risk.

Examples of non-sampling risk include the use of inappropriate audit procedures, misinterpretation of audit evidence, human mistakes and failure to recognise a misstatement or deviation, relying on erroneous information.
#### Approach
Define each risk, then give the two wrong conclusions sampling can lead to (one hurts effectiveness, the other efficiency) and a few examples of non-sampling risk.

---
item: q2b
qno: 2
part: (b)
marks: 4
type: descriptive
tags: aud.risk.model
difficulty: easy
q: 2
a: 3-4
---
#### Question
You are appointed as an auditor of Gama Ltd. Your audit assistant wants to understand the meaning of Audit Risk. Explain him the meaning of Audit Risk with example. Also guide him as to what is not included in Audit Risk.
#### Answer
**Audit risk** means the risk that the auditor gives an inappropriate audit opinion when the financial statements are materially misstated. Audit risk is a function of the risks of material misstatement and detection risk. Thus, it is the risk that the auditor may fail to express an appropriate opinion in an audit assignment.

**Example**

Gama Limited purchased a Plant and Machinery for ₹ 2 Crores in the financial year 2021-2022. The accountant of Gama limited debited ₹ 2 crores in the repair and maintenance account in the statement of Profit and loss instead of taking it to the balance sheet as PPE and claim depreciation on it. While auditing the accounts of this company the auditor may not notice this and consequently may not report anything regarding the plant and machinery. Therefore, opinion given by the auditor would be inappropriate resulting in audit risk.

**What is not included in Audit Risk?**

(i) Audit risk does not include the risk that the auditor might express an opinion that the financial statements are materially misstated when they are not. This risk is ordinarily insignificant.

(ii) Further, audit risk is a technical term related to the process of auditing. It does not refer to the auditor’s business risks such as loss from litigation, adverse publicity, or other events arising in connection with the audit of financial statements.
#### Approach
Give the definition (an inappropriate opinion on materially misstated statements), make up a misstatement the auditor misses, then the two things the term leaves out.

---
item: q2c
qno: 2
part: (c)
marks: 3
type: descriptive
tags: aud.risk.sa320
difficulty: easy
q: 2
a: 4
---
#### Question
An auditor has to exercise professional judgement in determining materiality. Explain the factors that may affect the identification of an appropriate benchmark in determining materiality for the financial statements as whole.
#### Answer
**Use of Benchmarks in Determining Materiality for the Financial Statements as a Whole:** Determining materiality involves the exercise of professional judgment. A percentage is often applied to a chosen benchmark as a starting point in determining materiality for the financial statements as a whole. Factors that may affect the identification of an appropriate benchmark include the following:

1. The elements of the financial statements

**Example**

Assets, liabilities, equity, revenue, expenses;

2. Whether there are items on which the attention of the users of the particular entity’s financial statements tend to be focused.

**Example**

For the purpose of evaluating financial performance users may tend to focus on profit, revenue or net assets.

3. The nature of the entity where the entity is at in its life cycle and the industry and economic environment in which the entity operates. The entity’s ownership structure and the way it is financed.

**Example**

If an entity is financed solely by debt rather than equity, users may put more emphasis on assets and claims on them than on the entity’s earnings.

4. The relative volatility of the benchmark.
#### Approach
Think of what decides which figure (profit, revenue, assets) the users of the statements watch, and how stable that figure is.

---
item: q2d
qno: 2
part: (d)
marks: 3
type: descriptive
tags: aud.risk.digital
difficulty: easy
q: 3
a: 4-5
---
#### Question
While auditing in an automated environment, how data analytics can be used in testing electronic records and data residing in IT systems using spread sheets and specialised audit tools?
#### Answer
**Data analytics** can be used in testing of electronic records and data residing in IT systems using spreadsheets and specialized audit tools viz., IDEA and ACL to perform the following:

1. Check completeness of data and population that is used in either test of controls or substantive audit tests.
2. Selection of audit samples – random sampling, systematic sampling.
3. Re-computation of balances – reconstruction of trial balance from transaction data.
4. Reperformance of mathematical calculations – depreciation, bank interest calculation.
5. Analysis of journal entries as required by SA 240.
6. Fraud investigation.
7. Evaluating impact of control deficiencies.
#### Approach
List what a tool such as IDEA or ACL does with a whole data file: completeness, samples, recomputation, reperformance, journal entries, fraud, control deficiencies.

---
item: q3a
qno: 3
part: (a)
marks: 4
type: descriptive
tags: aud.evid.sa505
difficulty: easy
q: 5
a: 5
---
#### Question
CA P is the auditor of MN Ltd. While scrutinising the accounts of MN Ltd., he observed that the company had large volume of Trade payable outstanding in the Balance sheet as on 31st March, 2023 for which external confirmations are not available, CA P wants to send external confirmation request to selected Trade payables but management of MN Ltd. refused for the same. Discuss how CA P should deal in this regard as per relevant Standard on Auditing.
#### Answer
**If management refuses to allow the auditor to send a confirmation request, CA P should deal in this regard in the manner prescribed in SA 505 explained hereunder:**

(a) Inquire as to management’s reasons for the refusal and seek audit evidence as to their validity and reasonableness;

(b) Evaluate the implications of management’s refusal on the auditor’s assessment of the relevant risks of material misstatement, including the risk of fraud, and on the nature, timing and extent of other audit procedures; and

(c) Perform alternative audit procedures designed to obtain relevant and reliable audit evidence.

If the auditor concludes that management’s refusal to allow the auditor to send a confirmation request is unreasonable or the auditor is unable to obtain relevant and reliable audit evidence from alternative audit procedures, the auditor shall communicate with those charged with governance in accordance with SA 260.

The auditor shall also determine the implications for the audit and the auditor’s opinion in accordance with SA 705.
#### Approach
SA 505 gives three steps when management refuses (inquire, evaluate, alternative procedures), then what follows if the refusal is unreasonable.

---
item: q3b
qno: 3
part: (b)
marks: 4
type: descriptive
tags: aud.items.equity
difficulty: easy
q: 5
a: 6
---
#### Question
Management of D Ltd. has issued shares at a discount to its creditors. Explain the provisions of the Companies Act, 2013 when shares are issued at a discount to creditors? As an auditor what will be your concern of checking in such a case?
#### Answer
According to Section 53 of the Companies Act, 2013,

(1) A company shall not issue shares at a discount, except in the case of an issue of sweat equity shares given under Section 54 of the Companies Act, 2013.

(2) Any share issued by a company at a discounted price shall be void.

(2A) Notwithstanding anything contained in sub-section (1) and (2), a company may issue shares at a discount to its creditors when its debt is converted into shares in pursuance of any statutory resolution plan or debt restructuring scheme in accordance with any guidelines or directions or regulations specified by the Reserve Bank of India under the Reserve Bank of India Act, 1934 or the Banking (Regulation) Act, 1949.

**Concern of Checking as an Auditor** : The auditor should verify that whether the company has issued shares at a discount to its creditors when its debt is converted into shares in pursuance of any statutory resolution plan or debt restructuring scheme in accordance with any guidelines or directions or regulations specified by the Reserve Bank of India under the Reserve Bank of India Act, 1934 or the Banking (Regulation) Act, 1949.
#### Approach
Start from section 53's general bar on a discount issue, then the exception that lets a company issue at a discount to creditors, and turn that exception into what the auditor checks.

---
item: q3c
qno: 3
part: (c)
marks: 3
type: descriptive
tags: aud.items.revenue
difficulty: easy
q: 5
a: 6
---
#### Question
X Ltd. is a hardware manufacturing company. At each and every stage of production processes, large amount of scrap is generated in the factory and subsequently sold. As an auditor how will you vouch/ verify the sale of scrap?
#### Answer
**Vouching/Verification of the Sale of Scrap by Auditor would be undertaken as under:**

(i) Review the internal control as regards generation, storage and disposal of scrap.

(ii) Check whether the organization is maintaining reasonable record for generation of scrap.

(iii) Analyze the raw material used, production and generation pattern of scrap and compare the same with figures of earlier year.

(iv) Check the rates at which scrap has been sold and compare the rate with previous year.

(v) Vouch sales with invoices raised, advertisement for tender, rate contract with scrap dealers.

(vi) Ensure that there exists a proper control procedure to identify scrap and good units and they are not mixed up and sold as scrap.

(vii) Make an overall assessment of the value of realization from scrap as to its reasonableness.
#### Approach
Follow the scrap from generation to storage to sale: controls and records first, then quantities against production, rates against last year and the sale documents.

---
item: q3d
qno: 3
part: (d)
marks: 3
type: descriptive
tags: aud.items.liabilities
difficulty: medium
q: 5
a: 6-7
note: ICAI's answer says "whether probable or possible or remote as defined above", though no definition precedes it in this answer; kept as printed.
---
#### Question
CA Q, the auditor of XYZ Ltd, while conducting audit observes that the company has made various provisions in the books of account. What are the audit procedures that CA Q will follow to verify the existence, completeness, and valuation of the provisions made?
#### Answer
**Audit Procedures that CA Q will follow to verify the existence, completeness, and valuation of provisions made are given hereunder:**

**Existence**

1. Obtain a list of all provisions and compare them with balances in the ledger.
2. Inspect the underlying agreements like agreements with customers to assess warranty commitments, any legal and other claims on the entity i.e. litigations.

**Valuation**

3. Wherever required, obtain the expert’s report, calculation and underlying working for the provision amount. For example - for warranty involving complex calculations, some entities get that valued through an actuary.

In such a case, the auditor may request the management to share the actuarial valuation report and in case of any matter under legal dispute, the auditor should request for assessment made by a legal expert in relation to likelihood of a liability devolving on the entity i.e. whether probable or possible or remote as defined above. The auditor should then verify the underlying assumptions used by the expert with the data shared by the management.

**Completeness**

4. Obtain the underlying working and the basis for each of the provisions made from the management and verify whether the same is complete and accurate.
5. The auditor shall obtain a written representation from the management that it has made all the provisions which were required to be made as per the recognized accounting principles.
#### Approach
Answer under the three assertions the question names, one or two procedures each: the list and the agreements, the expert's working, the basis and a written representation.

---
item: q4a
qno: 4
part: (a)
marks: 4
type: descriptive
tags: aud.risk.sa315
difficulty: easy
q: 7
a: 8
---
#### Question
CA D has been appointed as an auditor of LMP Ltd. Before developing an overall audit plan, CA D wants to get an understanding and knowledge of the Client's business including applicable financial reporting framework. Guide CA D in understanding of the same with reference to the relevant Standard on Auditing.
#### Answer
**Understanding and Knowledge of the Client’s Business**

It is one of the important principles in developing an overall audit plan. In fact without adequate knowledge of client’s business, a proper audit is not possible. As per SA-315, “Identifying and Assessing the Risk of Material Misstatement through Understanding the Entity and Its Environment”, the auditor shall obtain an understanding of the following:

(1) Relevant industry, regulatory and other external factors including the applicable financial reporting framework.

(2) The nature of the entity, including:

(i) its operations;

(ii) its ownership and governance structures;

(iii) the types of investments that the entity is making and plans to make, including investments in special-purpose entities; and

(iv) the way the entity is structured and how it is financed;

to enable the auditor to understand the classes of transactions, account balances, and disclosures to be expected in the financial statements.

(3) The entity’s selection and application of accounting policies including the reasons for changes thereto. The auditor shall evaluate whether the entity’s accounting policies are appropriate for its business and consistent with the applicable financial reporting framework and accounting policies used in the relevant industry.

(4) The entity’s objectives and strategies and those related business risks that may result in risks of material misstatement.

(5) The measurement and review of the entity’s financial performance.
#### Approach
Name SA 315 and walk through what the auditor must understand, from the outside in: industry and regulation, the entity itself, its accounting policies, its objectives and risks, and how its performance is measured.

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
note: ICAI's table runs over pp.8-9; its cell "Lender-wise details to be provided in case of defaults to banks, financial institutions and Government." is one cell under "Name of lender".
---
#### Question
ABC Ltd. is a public company, which has availed various loans and cash credit facilities from Banks and other financial institutions. The company has defaulted in repayments of such borrowings during the year under audit. What are the reporting requirements in this regard under the Companies (Auditor's Report) Order, 2020?
#### Answer
**As per Clause (ix) of CARO, 2020,** reporting requirements in case of default by the company in repayments of borrowings would be:

(a) Whether the company has defaulted in repayment of loans or other borrowings or in the payment of interest thereon to any lender, if yes, the period and the amount of default to be reported as per the format below:-

| Nature of borrowing, including debt securities | Name of lender | Amount not paid on due date | Whether principal or interest | No. of days delay or unpaid | Remarks, if any |
|---|---|---|---|---|---|
| | Lender-wise details to be provided in case of defaults to banks, financial institutions and Government. | | | | |

(b) Whether the company is a declared wilful defaulter by any bank or financial institution or other lender;

(c) Whether term loans were applied for the purpose for which the loans were obtained; if not, the amount of loan so diverted and the purpose for which it is used may be reported;

(d) Whether funds raised on short term basis have been utilised for long term purposes, if yes, the nature and amount to be indicated;
#### Approach
Find the CARO 2020 clause on borrowings and go through its sub-clauses: default and its format, wilful defaulter, term loans used for their purpose, short-term funds used long term.

---
item: q4c
qno: 4
part: (c)
marks: 3
type: descriptive
tags: aud.evid.sa520
difficulty: easy
q: 7
a: 9
---
#### Question
The reliability of data is influenced by its source and nature and is dependent on the circumstances under which it is obtained. Explain the factors that are relevant when determining whether data is reliable for purposes of designing substantive analytical procedures.
#### Answer
**The reliability of data** is influenced by its source and nature and is dependent on the circumstances under which it is obtained.

Accordingly, the following points are relevant when determining whether data is reliable for purposes of designing substantive analytical procedures:

(i) Source of the information available. For example, information may be more reliable when it is obtained from independent sources outside the entity;

(ii) Comparability of the information available. For example, broad industry data may need to be supplemented to be comparable to that of an entity that produces and sells specialised products;

(iii) Nature and relevance of the information available. For example, whether budgets have been established as results to be expected rather than as goals to be achieved; and

(iv) Controls over the preparation of the information that are designed to ensure its completeness, accuracy and validity. For example, controls over the preparation, review and maintenance of budgets.
#### Approach
SA 520 gives four tests of the data behind an expectation: where it comes from, whether it is comparable, what it is, and the controls over its preparation. Give an example with each.

---
item: q4d
qno: 4
part: (d)
marks: 3
type: descriptive
tags: aud.risk.sa315
difficulty: easy
q: 7
a: 9-10
---
#### Question
As a part of Risk assessment, the auditor shall determine whether any of the risks identified are in the auditor's judgement a significant risk. Mention any three guiding factors to judge as to which risks are significant risks?
#### Answer
**In exercising judgment as to which risks are significant risks, the auditor shall consider at least the following:**

(a) Whether the risk is a risk of fraud;

(b) Whether the risk is related to recent significant economic, accounting, or other developments like changes in regulatory environment, etc., and, therefore, requires specific attention;

(c) The complexity of transactions;

(d) Whether the risk involves significant transactions with related parties;

(e) The degree of subjectivity in the measurement of financial information related to the risk, especially those measurements involving a wide range of measurement uncertainty; and

(f) Whether the risk involves significant transactions that are outside the normal course of business of the entity or that otherwise appear to be unusual.
#### Approach
Think of what makes a risk need special audit attention: fraud, recent developments, complexity, related parties, subjective measurement, unusual transactions.

---
item: q5a
qno: 5
part: (a)
marks: 4
type: descriptive
tags: aud.complete.sa570, aud.report.sa705
difficulty: medium
q: 10
a: 11
note: ICAI's answer ends "... do not adequately disclose this matter" without a full stop; kept as printed.
---
#### Question
S Ltd., a large textile manufacturing company, due to heavy recession in the market was unable to collect amount of huge receivables in time and also holding large amounts of stock of raw materials and finished goods since last 9 months of the Financial Year 2022-23.

From your primary observations of audit evidence, you feel that there is a material uncertainty existing about going concern.

How will you deal in your audit report?

What will be the effect on your audit opinion in the following situations?

(i) If adequate disclosure of such material uncertainty is already made in the financial statements.

(ii) If adequate disclosure of such material uncertainty is not made in the financial statements.
#### Answer
**The Auditor of S Ltd shall deal in the following manner in his Audit Report:**

**Use of the Going Concern Basis of Accounting is Appropriate but a Material Uncertainty Exists**

The identification of a material uncertainty is a matter that is important to users’ understanding of the financial statements. The use of a separate section with a heading that includes reference to the fact that a material uncertainty related to going concern exists alerts users to this circumstance.

**(1) Adequate Disclosure of a Material Uncertainty is made in the Financial Statements**

If adequate disclosure about the material uncertainty is made in the financial statements, the auditor shall express an unmodified opinion and the auditor’s report shall include a separate section under the heading “Material Uncertainty Related to Going Concern.”

**(2) Adequate Disclosure of a Material Uncertainty is Not Made in the Financial Statements**

If adequate disclosure about the material uncertainty is not made in the financial statements, the auditor shall:

**(a)** Express a qualified opinion or adverse opinion, as appropriate, in accordance with SA 705 (Revised); and

**(b)** In the Basis for Qualified (Adverse) Opinion section of the auditor’s report, state that a material uncertainty exists that may cast significant doubt on the entity’s ability to continue as a going concern and that the financial statements do not adequately disclose this matter
#### Approach
The going concern basis is still appropriate here; what changes the report is whether the uncertainty is adequately disclosed. Take the two cases of SA 570 one by one.

---
item: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
tags: aud.report.companies, aud.report.caro
difficulty: medium
q: 10
a: 11-12
note: ICAI prints this question's (4 Marks) once, after its OR alternative (q5b-or). Ours: the auditor's duties (section 143(12) and Rule 13(3), CARO 2020 clause (xi)) are in the January 2027 Study Material; the disclosure in the Board's report (Rule 13(4)) is not taught there, but the question is not flagged.
---
#### Question
During the course of audit of PQR Ltd, the statutory auditor CA G came across payments made to various creditors aggregating to ₹ 75 lakhs. On verifying the same it is found that the accounts manager had accounted for fake invoices of credit purchases for ₹ 25 lakhs in the books of account in the name of one bogus creditor Mr. X.

Discuss the duties of auditor with reference to the provisions of Companies Act, 2013 and also the disclosure requirements in the Board's Report.
#### Answer
**The auditor shall report under clause (xi) of the CARO, 2020 that:**

Whether any fraud by the company or any fraud on the company has been noticed or reported during the year, if yes, the nature and the amount involved is to be indicated;

**Reporting to the Audit Committee or Board:** Sub-section (12) of section 143 of the Companies Act, 2013 further prescribes that in case of a fraud involving lesser than the specified amount [i.e. less than ₹ 1 crore], the auditor shall report the matter to the audit committee constituted under section 177 or to the Board in other cases within such time and in such manner as may be prescribed.

In this regard, sub-rule (3) of Rule 13 of the Companies (Audit and Auditors) Rules, 2014 states that in case of a fraud involving lesser than the amount specified in sub- rule (1) **[i.e. less than ₹ 1 crore]**, the auditor shall report the matter to Audit Committee constituted under section 177 or to the Board immediately but not later than 2 days of his knowledge of the fraud and he shall report the matter specifying the following:

(i) Nature of Fraud with description;

(ii) Approximate amount involved; and

(iii) Parties involved.

**Disclosure in the Board’s Report:** Sub-section (12) of section 143 of the Companies Act, 2013 furthermore prescribes that the companies, whose auditors have reported frauds under this sub-section (12) to the audit committee or the Board, but not reported to the Central Government, shall disclose the details about such frauds in the Board’s report in such manner as may be prescribed.

In this regard, sub-rule (4) of Rule 13 of the Companies (Audit and Auditors) Rules, 2014 states that in the Board’s Report the following details of each of the fraud reported to the Audit Committee or the Board under sub- rule (3) during the year:

(i) Nature of Fraud with description;

(ii) Approximate Amount involved;

(iii) Parties involved, if remedial action not taken; and

(iv) Remedial actions taken.
#### Approach
Compare the size of the fraud with the limit in section 143(12) to decide whom the auditor reports it to and how soon, add the CARO clause on frauds, then what the Board's report must disclose.

---
item: q5b-or
alt: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
tags: aud.entities.firms
difficulty: easy
q: 10
a: 12
note: ICAI prints this as the OR alternative to Q5(b), followed by the pair's (4 Marks). ICAI's answer writes "CA, Z" and "Multi State" (the question: "CA. Z.", "Multi-State"); kept as printed.
---
#### Question
CA. Z. a Chartered Accountant is the Senior manager of a Multi-State Co-operative Society in Mumbai. He is proposed to be appointed as an auditor of the said Multi-State Co-operative Society. Analyse the provisions of the Multi-State Co-operative Societies Act, 2002 and comment on validity of proposed appointment.
#### Answer
**Section 72 of the Multi-State Co-operative Societies Act, 2002** states that a person who is a Chartered Accountant within the meaning of the Chartered Accountants Act, 1949 can only be appointed as auditor of Multi-State co-operative society.

Considering the facts given in the question, the following persons are not eligible for appointment as auditors of a Multi-State co-operative society-

(a) An officer or employee of the Multi-State co-operative society.

(b) A person who is a member or who is in the employment, of an officer or employee of the Multi-State co-operative society.

In view of above, CA, Z being officer of Multi State Co-operative Society is not eligible for appointment as Auditor and therefore proposed appointment of CA Z is not valid.
#### Approach
Being a chartered accountant is necessary but not enough: check who the Act disqualifies, and whether a senior manager of the society is one of them.

---
item: q5c
qno: 5
part: (c)
marks: 3
type: descriptive
tags: aud.report.sa705
difficulty: easy
q: 10
a: 12-13
---
#### Question
Elucidate the circumstances when a modification to the Auditor's opinion is required. Also state the factors for making the decision regarding which type of modified opinion is appropriate.
#### Answer
**Circumstances When a Modification to the Auditor’s Opinion Is Required**

The auditor shall modify the opinion in the auditor’s report in the following circumstances:

1. The auditor concludes that, based on the audit evidence obtained, the financial statements as a whole are not free from material misstatement; or
2. The auditor is unable to obtain sufficient appropriate audit evidence to conclude that the financial statements as a whole are free from material misstatement.

**The decision regarding which type of modified opinion is appropriate depends upon:**

(a) The nature of the matter giving rise to the modification, that is, whether the financial statements are materially misstated or, in the case of an inability to obtain sufficient appropriate audit evidence, may be materially misstated; and

(b) The auditor’s judgement about the pervasiveness of the effects or possible effects of the matter on the financial statements.
#### Approach
SA 705 gives two triggers (a material misstatement, or no sufficient appropriate evidence) and two factors for the type of opinion (the nature of the matter and how pervasive it is).

---
item: q5d
qno: 5
part: (d)
marks: 3
type: descriptive
tags: aud.risk.sa315
difficulty: easy
q: 10
a: 13
note: Ours: ICAI's answer is SA 240's list of "others within the entity" to ask about fraud; SA 240 is not in the new-scheme syllabus, but the January 2027 Study Material teaches the same inquiries of management and others within the entity about risks of material misstatement due to fraud or error under SA 315 (SM 3.13-3.14), with three of ICAI's six examples (employees with different levels of authority, employees initiating, processing or recording complex or unusual transactions, in-house legal counsel), so the item is tagged there and not flagged.
---
#### Question
Management is often in the best position to perpetrate fraud. As an auditor you are suspecting existence or suspicion of fraud from management. Give any three examples of "others within the entity" to whom direct inquiries can be made.
#### Answer
**Examples of others within the entity** to whom the auditor may direct inquiries about the existence or suspicion of fraud include:

1. Operating personnel not directly involved in the financial reporting process.
2. Employees with different levels of authority.
3. Employees involved in initiating, processing or recording complex or unusual transactions and those who supervise or monitor such employees.
4. In-house legal counsel.
5. Chief ethics officer or equivalent person.
6. The person or persons charged with dealing with allegations of fraud.
#### Approach
Think of people outside the financial reporting chain who would see or hear of a fraud by management.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
oos: yes
difficulty: easy
q: 13
a: 14
note: Old scheme, out of syllabus (ours): which companies must constitute an Audit Committee under section 177 of the Companies Act, 2013 (listed public companies and public companies above the paid-up capital, turnover or borrowing limits) was part of old Paper 6's Company Audit chapter; neither the new-scheme Paper 5 syllabus nor the January 2027 Study Material teaches it (the Study Material names the audit committee only as the body to which an auditor reports a fraud below ₹ 1 crore). No tag.
---
#### Question
ATM Ltd. is a public company, with a paid-up capital of ₹ 12 crore. The company has made a turnover of ₹ 105 crore in the Financial Year 2021-22. The outstanding loan as on 31-03-2022 was ₹ 32 crore. Whether ATM Ltd. is required to constitute an Audit Committee in the financial year 2022-23? Analyse the provisions of Companies Act, 2013 and give your comments.
#### Answer
**In addition to listed public companies, the following classes of companies shall constitute an Audit Committee -**

(i) all public companies with a paid-up capital of ten crore rupees or more;

(ii) all public companies having turnover of one hundred crore rupees or more;

(iii) all public companies, having in aggregate, outstanding loans or borrowings or debentures or deposits exceeding fifty crore rupees or more.

**Explanation:** The paid-up share capital or turnover or outstanding loans, or borrowings or debentures or deposits, as the case may be, as existing on the date of the last audited Financial Statements shall be taken into account for the purposes of this rule.

Therefore, provisions of the constitution of the audit committee are applicable only to listed companies and public companies satisfying the criteria as stated above.

Applying the above, ATM Ltd., a public company having paid up capital of ₹ 12 crores and turnover of ₹ 105 crores will be required to constitute an Audit Committee under section 177 even if its outstanding loan is below ₹ 50 crores because the requirement for constitution of Audit Committee arises if the company falls into any of the prescribed categories.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: aud.entities.govt
difficulty: easy
q: 13
a: 14
---
#### Question
SK & Co, a Chartered Accountant firm has been appointed an auditor of Metro Rail project in City A. Since the project is on large scale, it involves a high volume of resources (financial, human and physical resources). The appointing authority C&AG requires an objective examination of the financial and operational performance of the Metro Rail project. Explain the nature and scope of audit that SK & Co will undertake.
#### Answer
**Performance audit** - The scope of the audit has been extended to cover efficiency, economy and effectiveness audit or performance audit, or **full scope audit.**

**Efficiency audit** looks into whether the various schemes/projects are executed and their operations conducted economically and whether they are yielding the results expected of them, *i.e.,* the relationship between goods and services produced and resources used to produce them; and examination aimed to find out the extent to which operations are carried out in an economical and efficient manner.

**Economy audit** looks into whether the government has acquired the financial, human and physical resources in an economical manner, and whether the sanctioning and spending authorities have observed economy.

**Effectiveness audit** is an appraisal of the performance of programmes, schemes, projects with reference to the overall targeted objectives as well as efficiency of the means adopted for the attainment of the objectives.

**Efficiency- cum-performance audit**, wherever used, is an objective examination of the financial and operational performance of an organisation, programme, authority or function and is oriented towards identifying opportunities for greater economy, and effectiveness.
#### Approach
"An objective examination of the financial and operational performance" is the C&AG's definition of one kind of audit: name it, then explain its parts (efficiency, economy, effectiveness).

---
item: q6c
qno: 6
part: (c)
marks: 3
type: descriptive
tags: aud.bank.advances
difficulty: easy
q: 13
a: 15
---
#### Question
A Ltd. has availed Cash Credit facilities against Stock and Book Debt, Term Loan for machineries and Bank Guarantee from Big Bank Ltd. A Ltd. furnishes stock statements and age wise list of debtors to Big Bank Ltd. on regular basis. Concurrent Auditors of Big Bank Ltd. mentioned about wrong calculation of Drawing Power by the Bank Branch along with sanctioned limit, and balances overdrawn due to wrong calculation of Drawing Power (DP) in the monthly report. Explain the meaning of drawing power and how it differs from sanctioned limit? What is to be ensured while computing Drawing Power (DP)?
#### Answer
**Meaning of Drawing Power** generally addressed as “DP” is an important concept for Cash Credit (CC) facility availed from banks and financial institutions. Drawing power is the limit up to which a firm or company can withdraw from the working capital limit sanctioned.

**Different from Sanctioned Limit**: The Sanctioned limit is the total exposure that a bank can take on a particular client for facilities like cash credit, overdraft, export packing credit, non-funded exposures etc. On the other hand, Drawing Power refers to the amount calculated based on primary security less margin as on a particular date.

**Computation of DP:** It needs to be ensured that the drawing power is calculated as per the extant guidelines formulated by the Board of Directors of the respective bank and agreed upon by the concerned statutory auditors. Special consideration should be given to proper reporting of sundry creditors for the purposes of calculating drawing power.
#### Approach
The sanctioned limit is the ceiling the bank agrees to; drawing power is what the security (stock and debtors, less margin) supports on a date. Then say whose guidelines govern its computation.

---
item: q6d
qno: 6
part: (d)
marks: 3
type: descriptive
tags: aud.entities.npo
difficulty: easy
q: 14
a: 15
---
#### Question
CA B is appointed as the auditor of a Public Charitable Trust. Guide him the focus area of attention relating to the vouching and verification of expenditure of charitable institution.
#### Answer
**Focus area of attention relating to vouching and verification of Expenditure of charitable institution**

(i) Vouching payment of grants, also verifying that the grants have been paid only for a charitable purpose or purposes falling within the purview of the objects for which the charitable institution has been set up and that no trustee, director or member of the Managing Committee has benefited there from either directly or indirectly.

(ii) Verifying the schedules of securities held, as well as inventories of properties both movable and immovable by inspecting the securities and title deeds of property and by physical verification of the movable properties on a test- basis.

(iii) Verifying the cash and bank payments.

(iv) Ascertaining that any funds contributed for a special purpose have been utilised for the purpose.
#### Approach
For a charity the key question is whether money went to its objects and to nobody inside it: start with grants, then the properties and securities, payments and earmarked funds.
