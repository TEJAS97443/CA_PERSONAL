<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p6-pyq-may2022
paper: p6
kind: pyq
attempt: may2022
qfile: old/p6/pyq-may2022-a.pdf
afile: old/p6/pyq-may2022-a.pdf
paperfile: old/p6/pyq-may2022-q.pdf
choice: q1; any 4 of q2-q6; q1: any 7 of (a)-(h)
q: 1
status: checked
by: tx-45
date: 2026-10-20
note: Old-scheme Intermediate Paper 6 Auditing and Assurance, May 2022. Transcribed from ICAI's Suggested Answers (qfile and afile), which reproduce every question before its answer; the question-paper scan is linked as paperfile and was not used for the text. ICAI published only the 70-mark descriptive part (Q1-Q6): the 30-mark Part I MCQ booklet and its answers are in neither file, so this document has no MCQ items. Instructions: the lines printed under the paper's title on p.1. No choice rule: Q1 says "Answer any seven" of its eight 2-mark statements (a)-(h) "(2 x 7 = 14 Marks)", a choice inside a question that choice: cannot express (q1; any 4 of q2-q6 would count 16 marks for Q1), so, as with o-p6-pyq-may2023 and o-p6-pyq-nov2023, the paper is practice only and never sat; each Q1 statement is an item of 2 marks under the shared stem c1. Q6(a) has an OR alternative (q6a-or). ICAI's answers often give an "Alternative Solution" (Q4(a), Q5(a), Q6(a), Q6(c), Q6(d)) and Q2(a) a second "Solution for HINDI Medium Students": each is kept inside its item's answer, in ICAI's order, with ICAI's heading. Bold lead-ins and the bold words in ICAI's answers are kept as **bold**; the "OR" lines between Q6(a) and its alternative (question and answer) are left out, the alternative being its own item. Old-scheme mapping (ours): Q1(g) (SA 240, misappropriation of assets), Q4(a) (sections 147 and 140(5) of the Companies Act, 2013), Q4(b) (manipulation of accounts), Q5(a) (the auditor's lien) and Q6(d) (classification of errors) are flagged out of syllabus, see their notes. Accepted numbers (each read on the page): the first 6 is the paper's title on p.1 (PAPER – 6 : AUDITING AND ASSURANCE); 1 to 6 are the question numbers, which the Suggested Answers print once (Question N, before the reproduced question) and not again before the answer (headed only Answer), while check.py expects each number on the answer side as well. Q1's marks line reads (2 x 7 = 14 Marks), marks first: check.py reads it as seven 2-mark statements, and its "any n" rule accounts for the eighth. | choice: added by choice-ext from ICAI's printed instruction (2026-10-20): Question No. 1 is compulsory and any four questions from the remaining five (the Instructions), and Q1's "(Answer any seven)" over its eight 2-mark statements (a)-(h), written q1: any 7 of (a)-(h); the paper can now be sat (maximum 70, as ICAI prints), and the "No choice rule" above predates the part-choice syntax.
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
State with reasons whether the following statements are correct or incorrect. (Answer any seven).

---
item: q1a
case: c1
qno: 1
part: (a)
marks: 2
type: descriptive
tags: aud.report.sa705
difficulty: easy
q: 1
a: 1
---
#### Question
Pervasive is a term used, in the context of misstatements, to describe the effects on the financial statements of misstatements or the possible effects on the financial statements of misstatements, if any, that are detected by obtaining sufficient appropriate audit evidence.
#### Answer
**Incorrect:** Pervasive is a term used, in the context of misstatements, to describe the effects on the financial statements of misstatements or the possible effects on the financial statements of misstatements, if any, that are undetected due to an inability to obtain sufficient appropriate audit evidence.
#### Approach
Recall SA 705's definition word for word and check which kind of misstatements it speaks of.

---
item: q1b
case: c1
qno: 1
part: (b)
marks: 2
type: descriptive
tags: aud.risk.testing, aud.risk.it
difficulty: easy
q: 1
a: 1
---
#### Question
Audit findings and control deficiencies can be evaluated or assessed arbitrarily.
#### Answer
**Incorrect:** Evaluation and assessment of audit findings and control deficiencies involves applying professional judgement that include considerations for quantitative and qualitative measures. Each finding should be looked at individually and in the aggregate by combining with other findings/deficiencies.
#### Approach
Ask what the auditor brings to the assessment of IT audit findings, and whether findings are judged alone or together.

---
item: q1c
case: c1
qno: 1
part: (c)
marks: 2
type: descriptive
tags: aud.risk.ic
difficulty: easy
q: 1
a: 1-2
---
#### Question
Inappropriate management can override internal controls of any organization.
#### Answer
**Correct:** Controls can be circumvented by the collusion of two or more people or inappropriate management override of internal control. **For example**, management may enter into side agreements with customers that alter the terms and conditions of the entity’s standard sales contracts, which may result in improper revenue recognition. Also, edit checks in a software program that are designed to identify and report transactions that exceed specified credit limits may be overridden or disabled.
#### Approach
This is one of the inherent limitations of internal control: support it with an example of an override.

---
item: q1d
case: c1
qno: 1
part: (d)
marks: 2
type: descriptive
tags: aud.plan.sa300
difficulty: easy
q: 1
a: 2
---
#### Question
Once the audit plan has been drafted and communicated, it is obligatory on the auditor to follow the same.
#### Answer
**Incorrect:** The auditor shall update and change the overall audit strategy and the audit plan as necessary during the course of the audit. As a result of unexpected events, changes in conditions, or the audit evidence obtained from the results of audit procedures, the auditor may need to modify the overall audit strategy and audit plan and thereby the resulting planned nature, timing and extent of further audit procedures, based on the revised consideration of assessed risks. This may be the case when information comes to the auditor’s attention that differs significantly from the information available when the auditor planned the audit procedures.
#### Approach
SA 300 treats planning as a continuous process: say what happens to the plan when the audit turns up something new.

---
item: q1e
case: c1
qno: 1
part: (e)
marks: 2
type: descriptive
tags: aud.report.caro
difficulty: easy
q: 1
a: 2
---
#### Question
According to CARO 2020, the company auditor is required to state that whether the title deeds of all immovable properties held in the name of the company are disclosed in its financial statements.
#### Answer
**Incorrect:** According to CARO, 2020, the company auditor is required to state whether the title deeds of all the immovable properties (other than properties where the company is the lessee and the lease agreements are duly executed in favour of the lessee) disclosed in the financial statements are held in the name of the company.
#### Approach
Read the statement against clause 3(i)(c) of CARO 2020: notice which way round the statement puts "disclosed" and "held in the name of the company".

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
---
#### Question
SA 520 deals with the auditor's use of analytical procedures as substantive procedures ("substantive analytical procedures"), and as procedures near the end of the audit, that assist the auditor in preparation of the financial statements.
#### Answer
**Incorrect:** SA 520 deals with the auditor’s use of analytical procedures as substantive procedures (“substantive analytical procedures”), and as procedures near the end of the audit that assist the auditor when forming an overall conclusion on the financial statements.
#### Approach
Recall the scope paragraph of SA 520 and ask whether an auditor ever prepares the financial statements.

---
item: q1g
case: c1
qno: 1
part: (g)
marks: 2
type: descriptive
tags: aud.risk
oos: yes
difficulty: easy
q: 1
a: 2
note: Out of syllabus (old scheme, ours): misappropriation of assets and its concealment are SA 240 (The Auditor's Responsibilities Relating to Fraud in an Audit of Financial Statements), which old Paper 6 taught; the new-scheme Paper 5 syllabus does not name SA 240 and the January 2027 Study Material mentions it only in passing, so the item carries only its nearest chapter (risk assessment), as o-p6-pyq-nov2023 does for SA 240.
---
#### Question
Misappropriation of assets is often accompanied by false or misleading records or documents in order to conceal the fact that the assets are missing or have been pledged with proper authorization.
#### Answer
**Incorrect:** Misappropriation of assets is often accompanied by false or misleading records or documents in order to conceal the fact that the assets are missing or have been pledged without proper authorization.
#### Approach
Read the last few words of the statement slowly: would anyone need to conceal a pledge that was properly authorised?

---
item: q1h
case: c1
qno: 1
part: (h)
marks: 2
type: descriptive
tags: aud.risk.sa320
difficulty: easy
q: 1
a: 2
---
#### Question
Materiality is not a matter of size.
#### Answer
**Incorrect:** Financial statements should disclose all ‘material items’, i.e., the items the knowledge of which might influence the decisions of the user of the financial statement. Materiality is not always a matter of relative size. For example -a small amount lost by fraudulent practices of certain employees can indicate a serious flaw in the enterprise’s internal control system requiring immediate attention to avoid greater losses in future. In certain cases, quantitative limits of materiality are specified.
#### Approach
Materiality has a quantitative and a qualitative side: the word "always" is what the statement leaves out.

---
item: q2a
qno: 2
part: (a)
marks: 4
type: descriptive
tags: aud.report.caro
difficulty: medium
q: 2
a: 3-4
note: ICAI's answer prints a second solution headed "Solution for HINDI Medium Students" (p.4), whose figures differ from the English one: it adds "₹ 250" (not ₹ 250 lakh) for the discontinuing operations, gives "8,50,00,250" and "₹ 850,00,250 Lakh", and concludes on the borrowings alone. Both are transcribed as printed, the Hindi-medium one keeping its own "(a)" label.
---
#### Question
G Pvt. Ltd. had fully paid up Capital and Reserves of ₹ 1.20 crore as at the end of F.Y. 2020-2021. During the F.Y 2021-2022, business was interrupted due to Covid restrictions and therefore the company incurred losses to the tune of ₹ 25 lacs. During the year, the company also borrowed ₹ 55 lakh each from a bank and a financial institution independently. It had a turnover of ₹ 850 lakh (other than revenue of ₹ 250 lakh from discontinuing operations). Ascertain whether CARO, 2020 is applicable to the company.
#### Answer
**Applicability of CARO, 2020 in case of Private Ltd. Company:** CARO, 2020 shall apply to every company including a foreign company **except**– a private limited company, not being a subsidiary or holding company of a public company,

(i) having a paid-up capital and reserves and surplus not more than one crore rupees as on the balance sheet date; and

(ii) which does not have total borrowings exceeding one crore rupees from any bank or financial institution at any point of time during the financial year; and

(iii) which does not have a total revenue as disclosed in Scheduled III to the Companies Act (including revenue from discontinuing operations) exceeding ten crore rupees during the financial year as per the financial statements.

Applying the above to the given case, G Pvt. Ltd., its paid-up capital and reserves are ₹ 95 Lakh (₹ 120 Lakh - ₹ 25 Lakh), borrowings from a Bank and financial institution are (₹ 55 Lakh + ₹ 55 Lakh) i.e., ₹ 1.10 Crore, turnover {including discontinuing operations (₹ 850 lakh + ₹ 250 Lakh)} ₹ 1100 Lakh i.e., ₹ 11 Crore.

Since its borrowings and turnover are exceeding the specified limit and therefore it is not exempt from the applicability of CARO, 2020.

**Solution for HINDI Medium Students**

**(a) Applicability of CARO, 2020 in case of Private Ltd. Company:** CARO, 2020 shall apply to every company including a foreign company **except**– a private limited company, not being a subsidiary or holding company of a public company,

(i) having a paid-up capital and reserves and surplus not more than one crore rupees as on the balance sheet date; and

(ii) which does not have total borrowings exceeding one crore rupees from any bank or financial institution at any point of time during the financial year; and

(iii) which does not have a total revenue as disclosed in Scheduled III to the Companies Act (including revenue from discontinuing operations) exceeding ten crore rupees during the financial year as per the financial statements.

Applying the above to the given case, G Pvt. Ltd., its paid-up capital and reserves are ₹ 95 Lakh (₹ 120 Lakh - ₹ 25 Lakh), Borrowings from a Bank and financial institution are (₹ 55 Lakh + ₹ 55 Lakh) i.e., ₹ 1.10 Crore, turnover {including discontinuing operations (₹ 850 Lakh + ₹ 250) 8,50,00,250} is ₹ 850,00,250 Lakh.

Since its borrowings are exceeding the specified limit and therefore it is not exempt from the applicability of CARO, 2020.
#### Approach
Test the private company exemption's three limits one by one (capital and reserves, borrowings from banks and financial institutions, revenue including discontinuing operations); failing any one of them is enough.

---
item: q2b
qno: 2
part: (b)
marks: 4
type: descriptive
tags: aud.evid.sa520
difficulty: easy
q: 3
a: 4
---
#### Question
Tree Limited presented its financial statements for the F.Y. 2021-2022 to its auditor for expressing an opinion thereon. The auditor while carrying out the audit started comparing various items of profit and loss account of the year under audit with previous financial years. What is auditor trying to achieve by carrying out those comparisons?
#### Answer
**Purpose of Applying Analytical Procedure:** Analytical procedures use comparisons and relationships to assess whether account balances or other data appear reasonable.

The auditor of Tree Ltd. would achieve the following by carrying out the comparison stated in the question:

(i) If balances included in the Statement of Profit and Loss of an entity are compared with those contained in the Statement of Profit and Loss with that of the previous period, it would be possible to find out the reasons for increase or decrease in the amount of profits of those years.

(ii) By setting up certain expenses’ ratios on the basis of balances included in the Statement of Profit and Loss, for the year under audit, comparing them with the same ratios for the previous year, it is possible to ascertain the extent of increase or decrease in various items of expenditure in relation to sales and that of trading profit in relation to sales.

(iii) If differences are found to be material, the auditor would ascertain the reasons thereof and assess whether the accounts have been manipulated to inflate or suppress profits.

(iv) It would be possible to identify the existence of unusual transactions, amounts, ratios and trends that might indicate matters that have audit implications.
#### Approach
Name the procedure the auditor is using, then say what year-on-year comparisons of profit and loss items can reveal.

---
item: q2c
qno: 2
part: (c)
marks: 3
type: descriptive
tags: aud.nature.sa200
difficulty: easy
q: 3
a: 5
---
#### Question
CA N is the auditor of SR Ltd. The auditor expressed his opinion on the financial statements without ascertaining as to whether the financial statements as a whole were free from material misstatements or not. In your opinion, whether CA N has complied with objectives of audit considering the applicability of relevant SA?
#### Answer
**Overall Objectives of the Independent Auditor:** As per SA-200 “Overall Objectives of the Independent Auditor”, in conducting an audit of financial statements, the overall objectives of the auditor are:

(i) To obtain reasonable assurance about whether the financial statements as a whole are free from material misstatement, whether due to fraud or error, thereby enabling the auditor to express an opinion on whether the financial statements are prepared, in all material respects, in accordance with an applicable financial reporting framework; and

(ii) To report on the financial statements, and communicate as required by the SAs, in accordance with the auditor’s findings.

In the given case of SR Ltd, CA N expressed his opinion on the financial statements of SR Ltd without obtaining reasonable assurance about whether the financial statements as a whole are free from material misstatement or not. Therefore, it can be concluded that CA N did not comply with the objective of audit as stated in SA 200.
#### Approach
State SA 200's two overall objectives, then test CA N's conduct against the first.

---
item: q2d
qno: 2
part: (d)
marks: 3
type: descriptive
tags: aud.bank.advances
difficulty: medium
q: 3
a: 5
---
#### Question
Compute the Drawing Power for Cash Credit A/c of S Limited for the month of March 2022 with following information:

| | (Amount in ₹) |
|---|---:|
| Stock | 50,000 |
| Debtors (Including Debtor of ₹ 5,000 for an invoice dated 17.11.2021) | 45,000 |
| Sundry creditors | 15,000 |
| Sanctioned Limit | 45,000 |

Margin on stock is 20% and on debtors is 50%.

Note: Debtors older than 3 months are ineligible for calculation of DP.
#### Answer
**Computation of Drawing Power:**

**Computation of Drawing Power for CC A/c of S Ltd.**

| Particulars of current assets | | Amount (₹) | DP Amt (₹) |
|---|---:|---:|---:|
| (A) Stocks: | | | |
| Stocks at realizable value | | 50,000 | |
| Less: Unpaid stocks: | | | |
| - Sundry creditors | 15000 | 15000 | |
| Paid for stocks | | 35000 | |
| Margin @ 20% | | 7000 | 28000 |
| (B) Debtors: | | | |
| Total Debtors | | 45000 | |
| Less: Ineligible debtors | | 5000 | |
| Eligible debtors | | 40000 | |
| Margin @ 50% | | 20000 | 20000 |
| **Total Drawing Power** | | | **48000** |

The sanctioned limit given in the question is ₹ 45000 whereas drawing power as per the above working is ₹ 48000. So, drawing power would be restricted to sanctioned limit i.e., ₹ 45000
#### Approach
Take out the unpaid stock (creditors) and the debtors older than three months before applying each margin, then compare the total with the sanctioned limit.

---
item: q3a
qno: 3
part: (a)
marks: 4
type: descriptive
tags: aud.evid.sa550
difficulty: easy
q: 6
a: 6
---
#### Question
P Ltd. is a company from a business group "ABCD" and is engaged in trading of garments. The promoters of the company are promoters and directors of some other group companies also. You have been appointed as an auditor of P Ltd. P Ltd has entered into various inter company transactions (within group companies) during the year which are outside its normal course of business. What will be your duties as an auditor in relation to those transactions?
#### Answer
**Duties of Auditor in identifying Significant Related Party Transactions:** For identified significant related party transactions outside the P Ltd.’s normal course of business, the auditor shall:

1. Inspect the underlying contracts or agreements, if any, and evaluate whether:

   (i) The business rationale (or lack thereof) of the transactions suggests that they may have been entered into to engage in fraudulent financial reporting or to conceal misappropriation of assets;

   (ii) The terms of the transactions are consistent with management’s explanations; and

   (iii) The transactions have been appropriately accounted for and disclosed in accordance with the applicable financial reporting framework; and

2. Obtain audit evidence that the transactions have been appropriately authorised and approved.
#### Approach
Group-company dealings outside the normal course of business are significant related party transactions under SA 550: recall the two things the auditor must do for them.

---
item: q3b
qno: 3
part: (b)
marks: 4
type: descriptive
tags: aud.items.expenses
difficulty: easy
q: 6
a: 6-7
---
#### Question
B Ltd. is covered u/s 135 of the Companies Act, 2013 i.e. Corporate Social Responsibility (CSR). What matters (other than the amount spent, amount not spent, amount required to be spent etc.) shall be disclosed by the company with regard to CSR activities done by the company?
#### Answer
**Corporate Social Responsibility (CSR):** Since B Ltd is covered under section 135 of the Companies Act, the following matters shall be disclosed by the B Ltd with regard to CSR activities:

(a) total of previous years shortfall,

(b) reason for shortfall,

(c) nature of CSR activities,

(d) details of related party transactions, e.g., contribution to a trust controlled by the company in relation to CSR expenditure as per relevant Accounting Standard,

(e) where a provision is made with respect to a liability incurred by entering into a contractual obligation, the movements in the provision during the year should be shown separately.
#### Approach
Recall Schedule III's additional information on CSR and leave out the amount items the question already excludes.

---
item: q3c
qno: 3
part: (c)
marks: 3
type: descriptive
tags: aud.evid.sa510
difficulty: easy
q: 6
a: 7
---
#### Question
The newly appointed auditor of BTN Limited wants to obtain sufficient appropriate audit evidence about whether the opening balances contain misstatements that materially affect the current period's financial statements. What audit procedures should he perform for this purpose?
#### Answer
**Audit Procedure Regarding Opening Balances:** The newly appointed auditor of BTN Ltd shall read the most recent financial statements, if any, and the predecessor auditor’s report thereon, if any, for information relevant to opening balances, including disclosures.

The auditor of BTN Ltd shall obtain sufficient appropriate audit evidence about whether the opening balances contain misstatements that materially affect the current period’s financial statements by:

(1) Determining whether the prior period’s closing balances have been correctly brought forward to the current period or, when appropriate, any adjustments have been disclosed as prior period items in the current year’s Statement of Profit and Loss.

(2) Determining whether the opening balances reflect the application of appropriate accounting policies; and

(3) Performing one or more of the following:

(i) Where the prior year financial statements were audited, perusing the copies of the audited financial statements including the other relevant documents relating to the prior period financial statements.

(ii) Evaluating whether audit procedures performed in the current period provide evidence relevant to the opening balances; or

(iii) Performing specific audit procedures to obtain evidence regarding the opening balances.
#### Approach
Work from SA 510: first what the auditor reads, then the three checks on the opening balances.

---
item: q3d
qno: 3
part: (d)
marks: 3
type: descriptive
tags: aud.risk.testing, aud.risk.it
difficulty: easy
q: 6
a: 7-8
---
#### Question
The Auditor of HK Limited completed the audit of the company in an automated environment. Management of the company requested the auditor to give an idea about any exceptions observed in IT environment that need to be assessed. How the auditor should consider this request and report in light of an audit perspective?
#### Answer
**Assess and report Audit Findings in audit in Automated Environment:** At the conclusion of each audit, it is possible that there will be certain findings or exceptions in IT environment and IT controls of the company that need to be assessed and reported to relevant stakeholders including management and those charged with governance viz., Board of directors, Audit committee. Some points to consider are as follows:

(1) Are there any weaknesses in IT controls?

(2) What is the impact of these weaknesses on overall audit?

(3) Report deficiencies to management – Internal Controls Memo or Management Letter.

(4) Communicate in writing any significant deficiencies to Those Charged with Governance.

The auditor of HK Ltd needs to assess each finding or exception to determine impact on the audit and evaluate if the exception results in a deficiency in internal control.
#### Approach
Think of the end of an IT audit: what the auditor asks about each exception, and to whom deficiencies are reported.

---
item: q4a
qno: 4
part: (a)
marks: 4
type: descriptive
oos: yes
difficulty: medium
q: 8
a: 8-9
note: Out of syllabus (old scheme, ours): the liability of an auditor who acts fraudulently (section 147 of the Companies Act, 2013) and the Tribunal's direction to change the auditor (section 140(5)) were part of old Paper 6's Company Audit chapter; neither the new-scheme Paper 5 syllabus nor the January 2027 Study Material teaches them (the Study Material cites neither section). No tag. The question names the auditor "CAB" and ICAI's answer "CA. B"; ICAI's answer also reads "colluded in an fraud" and "or in relation to or by"; all kept as printed.
---
#### Question
CAB, an auditor of DBF Limited engaged in the manufacturing and trading of hardware products, while auditing got aware of some secrets of the company. The auditor acted in an unlawful way in order to deceive or gain an advantage over others and also he encouraged and assisted directors to do something wrong, in particular to commit crime. Now company has requested you to guide it as to how such acts are covered under Companies Act, 2013 and what consequences auditor may face?
#### Answer
**Punishment for Non – Compliance/Contravention:** Section 147 of the Companies Act, 2013 prescribes punishments:

Where, in case of audit of a company being conducted by an audit firm, it is proved that the partner or partners of the audit firm has or have acted in a fraudulent manner or abetted or colluded in an fraud by, or in relation to or by, the company or its directors or officers, the liability, whether civil or criminal as provided in this Act or in any other law for the time being in force, for such act shall be of the partner or partners concerned of the audit firm and of the firm jointly and severally.

However, in case of criminal liability of an audit firm, in respect of liability other than fine, the concerned partner or partners, who acted in a fraudulent manner or abetted or, as the case may be, colluded in any fraud shall only be liable. In view of the above, CA. B would be liable for fine and imprisonment as per Companies Act, 2013.

**Alternative Solution:**

**Direction by Tribunal in case Auditor acted in a Fraudulent Manner:**

As per sub-section (5) of the section 140, the Tribunal either suo motu or on an application made to it by the Central Government or by any person concerned, if it is satisfied that the auditor of a company has, whether directly or indirectly, acted in a fraudulent manner or abetted or colluded in any fraud by, or in relation to, the company or its directors or officers, it may, by order, direct the company to change its auditors.

However, if the application is made by the Central Government and the Tribunal is satisfied that any change of the auditor is required, it shall within fifteen days of receipt of such application, make an order that he shall not function as an auditor and the Central Government may appoint another auditor in his place.

It may be noted that an auditor, whether individual or firm, against whom final order has been passed by the Tribunal under this section shall not be eligible to be appointed as an auditor of any company for a period of five years from the date of passing of the order and the auditor shall also be liable for action under section 447.
#### Approach
Read the facts as an auditor acting fraudulently and abetting a fraud, then look for the Companies Act provision that punishes it.

---
item: q4b
qno: 4
part: (b)
marks: 4
type: descriptive
tags: aud.risk
oos: yes
difficulty: easy
q: 8
a: 9
note: Out of syllabus (old scheme, ours): the reasons for manipulating accounts (fraudulent financial reporting) were taught in old Paper 6 under errors and frauds and SA 240; the new-scheme Paper 5 syllabus does not name SA 240 and the January 2027 Study Material has no section on why accounts are manipulated, so the item carries only its nearest chapter (risk assessment), as o-p6-pyq-nov2023 does for SA 240.
---
#### Question
The auditor of RMP Limited has identified a fraud that, in his opinion, causes a material misstatement in the financial statements. Management personnel in higher management cadre are associated with manipulation of accounts of the company. But the auditor has not been able to understand as to why this type of fraud is generally committed. Guide him with some reasons.
#### Answer
**Fraudulent Financial reporting – Manipulation of Accounts:** In the given case of RMP Ltd, the auditor identified fraud causing material misstatement in the financial statements. Auditor did not understand the reasons of the type of fraud given in the case of RMP Ltd.

Detection of manipulation of accounts with a view to presenting a false state of affairs is a task requiring great tact and intelligence because generally management personnel in higher management cadre are associated with this type of fraud and this is perpetrated in methodical way. This type of fraud is generally committed:

(1) to avoid incidence of income-tax or other taxes;

(2) for declaring a dividend when there are insufficient profits;

(3) to withhold declaration of dividend even when there is adequate profit (this is often done to manipulate the value of shares in stock market to make it possible for selected persons to acquire shares at a lower cost); and

(4) for receiving higher remuneration where managerial remuneration is payable by reference to profits.
#### Approach
Ask what senior management stands to gain from showing profits higher or lower than they are: taxes, dividends, share prices, remuneration.

---
item: q4c
qno: 4
part: (c)
marks: 3
type: descriptive
tags: aud.evid.sa501
difficulty: easy
q: 8
a: 9-10
---
#### Question
SPR Ltd has been into the media business since 1990. During the F.Y 2021-2022 many notices were received by the company for hurting public sentiments and financial claims were filed against the company. As an auditor of the company, you requested the management for arranging the meeting with company's external legal counsel. Management is of the view that such meetings are necessary in some certain circumstances only. Can you list down those certain circumstances?
#### Answer
**Circumstances when becoming necessary to meet with external legal counsel:** In the given case of SPR Ltd., Auditor requested the management for meeting with SPR’s external legal counsel.

In certain circumstances, the auditor also may judge it necessary to meet with the entity’s external legal counsel to discuss the likely outcome of the litigation or claims.

This may be the case, **for example**, where:

(i) The auditor determines that the matter is a significant risk.

(ii) The matter is complex.

(iii) There is disagreement between management and the entity’s external legal counsel.

Ordinarily, such meetings require management’s permission and are held with a representative of management in attendance.
#### Approach
Litigation and claims fall under SA 501: recall when a meeting with the entity's lawyer, rather than a letter, is warranted.

---
item: q4d
qno: 4
part: (d)
marks: 3
type: descriptive
tags: aud.bank.advances
difficulty: easy
q: 8
a: 10
---
#### Question
After becoming Chartered Accountant, you have got your first assignment as an auditor of a bank branch dealing in various types of advances. What are the areas which you will be looking for obtaining sufficient appropriate evidence (for advances) besides studying and evaluating internal controls?
#### Answer
**Audit Procedure in Audit of Advances in case of Bank Audit:** The auditor can obtain sufficient appropriate audit evidence about advances by study and evaluation of internal controls relating to advances, and by:

(i) examining the validity of the recorded amounts;

(ii) examining loan documentation.

(iii) reviewing the operation of the accounts;

(iv) examining the existence, enforceability and valuation of the security;

(v) checking compliance with RBI norms including appropriate classification and provisioning; and

(vi) carrying out appropriate analytical procedures.
#### Approach
Follow an advance through its life: the amount, the papers, the account's operation, the security and the RBI norms.

---
item: q5a
qno: 5
part: (a)
marks: 4
type: descriptive
tags: aud.doc
oos: yes
difficulty: medium
q: 10
a: 11
note: Out of syllabus (old scheme, ours): the auditor's right of lien on the client's books and documents was taught in old Paper 6; the January 2027 Study Material's Audit Documentation chapter teaches only that audit documentation is the auditor's property (SQC 1, SA 230) and never mentions a lien, so the item carries only its nearest chapter (audit documentation). ICAI's alternative solution reads "may has retain"; kept as printed.
---
#### Question
CA G, auditor of Sports Ltd., while auditing documented all the papers. He retained some of the documents of the company on which he has not worked along with the documents which were his working papers saying that as he was the auditor of the Company, so he has the right to retain all the documents as he may require them for future references. Comment on the action of the auditor.
#### Answer
**Right of Lien on the Books and Documents of the Company:** Under **section 128** of the Act, books of account of a company must be kept at the registered office. These provisions ordinarily make it impracticable for the auditor to have possession of the books and documents. The company provides reasonable facility to auditor for inspection of the books of account by directors and others authorised to inspect under the Act. Taking an overall view of the matter, it seems that though legally, auditor may exercise right of lien in cases of companies, it is mostly impracticable for legal and practicable constraints. His working papers being his own property, the question of lien, on them does not arise.

In view of above, CA G cannot retain the documents of the company and on which he did not work.

**Alternative Solution:**

In terms of the general principles of law, any person having the lawful possession of somebody else’s property, **on which he worked**, may has retain the property for non-payment of his dues on account of the work done on the property. On this premise, auditor can exercise lien on books and documents placed at his possession by the client for non-payment of fees, for work done on the books and documents. The Institute of Chartered Accountants in England and Wales has expressed a similar view on the following conditions:

(i) Documents retained must belong to the client who owes the money.

(ii) Documents must have come into possession of the auditor on the authority of the client. They must not have been received through irregular or illegal means. In case of a company client, they must be received on the authority of the Board of Directors.

(iii) The auditor can retain the documents only if he has done work on the documents assigned to him.

(iv) Such of the documents can be retained which are connected with the work on which fees have not been paid.

In view of above, CA G cannot retain the documents of the company and on which he did not work.
#### Approach
Separate the auditor's own working papers from the company's books and documents, and ask on what ground, if any, he may hold on to the latter.

---
item: q5b
qno: 5
part: (b)
marks: 4
type: descriptive
tags: aud.items.liabilities
difficulty: easy
q: 10
a: 11-12
---
#### Question
Proceedings have been initiated against False Limited for holding benami property under the Benami Transactions (Prohibition) Act, 1988 (45 of 1988) and the rules made thereunder, but such property is not recorded in books of accounts. As a consultant to the company, what will you advice to the company as far as disclosure requirements are concerned in relation to said proceedings?
#### Answer
**Disclosure in case of Benami Properties held by the Company:** Where any proceedings have been initiated or pending against the company for holding any benami property under the Benami Transactions (Prohibition) Act, 1988 (45 of 1988) and the rules made thereunder, the company shall disclose the following:

(a) Details of such property, including year of acquisition,

(b) Amount thereof,

(c) Details of Beneficiaries,

(d) If property is not in the books, then the fact shall be stated with reasons,

(e) Where there are proceedings against the company under this law as an abetter of the transaction or as the transferor, then the details shall be provided,

(f) Nature of proceedings, status of same and company’s view on same.
#### Approach
This is one of Schedule III's additional regulatory information items: list its disclosures, noting the one for property not in the books.

---
item: q5c
qno: 5
part: (c)
marks: 3
type: descriptive
tags: aud.evid.sa530
difficulty: medium
q: 10
a: 12
---
#### Question
The approach to audit and extent of checking are undergoing a progressive change in favour of more attention towards the questions of principle and controls with a curtailment of non-consequential routine checking. Discuss the given statement.
#### Answer
**Sampling: An Audit Procedure:** No conscious effort in human society is divested of economic considerations and auditing is no exception. There is a growing realisation that the traditional approach to audit is economically wasteful because all the efforts are directed to check all transactions without any exception. This invariably leads to more emphasis on routine checking, which often is not necessary in view of the time and the cost involved. With the shift in favour of formal internal controls in the management of affairs of organisations, the possibilities of routine errors and frauds have greatly diminished i.e., the internal controls as designed by the management are for the very purpose of Prevention, Detection and Correction of Frauds and Errors. Thus, the auditors often find extensive routine checking as nothing more than a ritual because it seldom reveals anything material. Now the approach to audit and the extent of checking are undergoing a progressive change in favour of more attention towards the questions of **principles and controls** with a curtailment of non-consequential routine checking. By routine checking, we traditionally think of extensive checking and vouching of all the entries, disregarding the concept of materiality.

The extent of the checking to be undertaken is primarily a matter of judgment of the auditor. There is nothing statutorily stated anywhere which specifies what work is to be done, how it is to be done and to what extent it has to be done. It is also not obligatory that the auditor must adopt the sampling technique. What he is to do as an auditor is to express his opinion on the financial statements and become bound by that.

To ensure good and reasonable standard of work, he should adopt standards and techniques that can lead him to an informed professional opinion. On consideration of this fact, it can be said that it is in the interest of the auditor that if he decides to form his opinion on the basis of a part checking (i.e., sampling), he should adopt standards and techniques which are widely followed and which have a recognised basis.

Since statistical theory of sampling is based on a scientific law, it can be relied upon to a greater extent than any arbitrary technique which lacks in basis and acceptability. This enables the auditor to make conclusions and express fair opinion without having to check all of the items within the financial statements.
#### Approach
The shift described is from checking everything to sampling: explain why (cost, internal controls) and why a recognised, statistical basis matters.

---
item: q5d
qno: 5
part: (d)
marks: 3
type: descriptive
tags: aud.entities.institutions, aud.entities.npo
difficulty: easy
q: 10-11
a: 13
---
#### Question
M/s T & Co. Chartered Accountants, a partnership firm, is appointed as an auditor of Treatment Hospital run by Smile Foundation, a charitable trust. Over and above the receipts of treatment of patients, during the year trust has received donations from various donors to treat COVID-19 patients and also incurred some capital expenditure for further development of the hospital. On some of the investment income, income tax has been deducted. What are the special points to be considered by M/s T & Co. while auditing such transactions of Treatment Hospital?
#### Answer
**Audit of a Hospital:**

**(A) Receipts from treatment of patients**

1. **Register of Patients:** Vouch the Register of patients with copies of bills issued to them. Verify bills for a selected period with the patients’ attendance record to see that the bills have been correctly prepared. Also see that bills have been issued to all patients from whom an amount was recoverable according to the rules of the hospital.

2. **Collection of Cash from patients**: Check cash collections as entered in the Cash Book with the receipts, counterfoils and other evidence for example, copies of patient’s bills.

**(B) Donations from donors to treat the patients:** Ascertain those legacies and donation received for a specific purpose have been applied in the manner agreed upon.

**(C) Capital Expenditure Incurred:** Verify the Capital Expenditure was incurred only with the prior sanction of the Trustees or the Managing Committee.

**(D) Where income-tax has been deducted from the Investment income**, it should be seen that a refund thereof has been obtained since charitable institutions are exempt from payment of Income-tax. This involves:

(i) vouching the Income-tax refund with the correspondence with the Income-tax Department; and

(ii) checking the calculation of the repayment of claims/refund claim.
#### Approach
Take the four kinds of transaction in the question one at a time (patient receipts, donations, capital expenditure, tax deducted) and give the hospital audit check for each.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: aud.report.sa706, aud.report.caro
difficulty: medium
q: 13
a: 14-15
---
#### Question
D Ltd. is a company engaged in publishing business magazines. CA P is the statutory auditor of the company. The company takes property in the barter deal from its real estate customers against publication of their advertisements. The properties obtained during the year through such barter deals have been considered in the books of accounts on the basis of possession letter only and have been included in PPE in the financial statements. Considering this matter of such importance that is fundamental to the users understanding, CA P has decided to communicate the same in his report. CA P seeks your guidance in reporting this matter in his audit report.
#### Answer
**Emphasis of Matter Paragraphs in the Auditor’s Report:** If the auditor considers it necessary to draw users’ attention to a matter presented or disclosed in the financial statements that, in the auditor’s judgement, is of such importance that it is fundamental to users’ understanding of the financial statements, the auditor shall include an Emphasis of Matter paragraph in the auditor’s report provided:

(i) The auditor would not be required to modify the opinion in accordance with SA 705 as a result of the matter; and

(ii) When SA 701 applies, the matter has not been determined to be a key audit matter to be communicated in the auditor’s report.

In the given case as the properties obtained during the year through barter deals and included in the PPE in the books of accounts on the basis of possession letter only, hence there is a need to add Emphasis on Matter Paragraph in the Auditor’s Report.

The draft of the same is as under:

Emphasis of Matter – Effect of Properties obtained through barter deals by the company

We draw attention to Note (Y) of the financial statements, which describes the effects of the properties obtained through barter by the company. Our opinion is not modified in respect of this matter.

**Alternative Solution:**

In the given case as the properties obtained during the year through barter deals and included in the PPE in the books of accounts on the basis of possession letter only, hence there is a need to report the same under Clause i(c) of Paragraph 3 Companies (Auditor's Report) Order,2020.

**Matters to be included in auditor's report -** The auditor's report on the accounts of a company to which this Order applies shall include a statement on the following matter, namely:

(i) (c) whether the title deeds of all the immovable properties (other than properties where the company is the lessee and the lease agreements are duly executed in favour of the lessee) disclosed in the financial statements are held in the name of the company,

if not, provide the details thereof in the format below:

| Description of property | Gross carrying value | Held in name of | Whether promoter, director or their relative or employee | Period held– indicate range, where appropriate | Reason for not being held in name of company\* \*also indicate if in dispute |
|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 |

The auditor should state in the Reason (column 6) for not being held in name of company as follows

“Properties obtained during the year through barter deals and included in the PPE in the books of accounts on the basis of possession letter only”
#### Approach
The wording "of such importance that it is fundamental to the users understanding" points to SA 706; check SA 706's two conditions before drafting the paragraph.

---
item: q6a-or
alt: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: aud.evid.sa610
difficulty: easy
q: 13
a: 15-16
note: ICAI prints this as the OR alternative inside Q6(a): its "(4 Marks)" stands after the first question, before the OR, and the alternative question has no marks line of its own (the question-paper scan likewise prints the margin mark 4 once, beside (a)); the alternative stands in the same 4-mark slot (a), so it carries those 4 marks.
---
#### Question
Internal audit not only analyses the effectiveness with which the internal control of a company is operating but also improves the effectiveness of internal control. Elucidate the statement.
#### Answer
**Improvement in Effectiveness of Internal Control: Internal Audit** means “An independent management function, which involves a continuous and critical appraisal of the functioning of an entity with a view to suggest improvements thereto and add value to and strengthen the overall governance mechanism of the entity, including the entity’s strategic risk management and internal control system”.

**Activities Relating to Internal Control:**

(i) **Evaluation of internal control:** The internal audit function may be assigned specific responsibility for reviewing controls, evaluating their operation and recommending improvements thereto. In doing so, the internal audit function provides assurance on the control. For example, the internal audit function might plan and perform tests or other procedures to provide assurance to management and those charged with governance regarding the design, implementation and operating effectiveness of internal control, including those controls that are relevant to the audit.

(ii) **Examination of financial and operating information:** The internal audit function may be assigned to review the means used to identify, recognize, measure, classify and report financial and operating information, and to make specific inquiry into individual items, including detailed testing of transactions, balances and procedures.

(iii) **Review of operating activities:** The internal audit function may be assigned to review the economy, efficiency and effectiveness of operating activities, including non-financial activities of an entity.

(iv) **Review of compliance with laws and regulations:** The internal audit function may be assigned to review compliance with laws, regulations and other external requirements, and with management policies and directives and other internal requirements.

Therefore, one of the important aspects of internal audit is not only to evaluate internal control system of an organization but also to suggest improvements for adding value and strengthening it.
#### Approach
Start from the definition of internal audit, then go through the activities of the internal audit function that touch internal control.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: aud.report.sa710
difficulty: medium
q: 13-14
a: 16
---
#### Question
The senior member of the firm Kaur & Associates, Chartered Accountants, informed to its auditing staff that at the time of audit reporting regarding corresponding figures, when corresponding figures are presented, the auditor's opinion shall not refer to the corresponding figures except in specified circumstances. What are those exceptional circumstances?
#### Answer
**Audit reporting Regarding Corresponding Figures:**

When corresponding figures are presented, the auditor’s opinion shall not refer to the corresponding figures except in the following circumstances:

1. **If the auditor’s report on the prior period, as previously issued, included a qualified opinion, a disclaimer of opinion, or an adverse opinion** and the matter which gave rise to the modification is unresolved, the auditor shall modify the auditor’s opinion on the current period’s financial statements. In the Basis for Modification paragraph in the auditor’s report, the auditor shall either:

   **(a)** Refer to both the current period’s figures and the corresponding figures in the description of the matter giving rise to the modification when the effects or possible effects of the matter on the current period’s figures are material; or

   **(b)** In other cases, explain that the audit opinion has been modified because of the effects or possible effects of the unresolved matter on the comparability of the current period’s figures and the corresponding figures.

2. **If the auditor obtains audit evidence that a material misstatement exists in the prior period financial statements** on which an unmodified opinion has been previously issued, the auditor shall verify whether the misstatement has been dealt with as required under the applicable financial reporting framework and, if that is not the case, the auditor shall express a qualified opinion or an adverse opinion in the auditor’s report on the current period financial statements, modified.

3. **Prior Period Financial Statements Not Audited-** If the prior period financial statements were not audited, the auditor shall state in an Other Matter paragraph in the auditor’s report that the corresponding figures are unaudited. Such a statement does not, however, relieve the auditor of the requirement to obtain sufficient appropriate audit evidence that the opening balances do not contain misstatements that materially affect the current period’s financial statements.
#### Approach
SA 710: think of the three things about the prior period that force a mention of the corresponding figures (an unresolved modification, a misstatement found now, figures never audited).

---
item: q6c
qno: 6
part: (c)
marks: 3
type: descriptive
tags: aud.risk.it, aud.risk.sa315
difficulty: medium
q: 14
a: 16-18
---
#### Question
When the company is working in an automated environment, it is not necessary for its auditor to understand its automated environment and depends upon the professional judgement of the auditor as to whether gaining knowledge of company's IT systems is required or not. Do you agree with this statement?
#### Answer
**Understanding and Documenting Automated Environment:** When a business operates in a more automated environment it is likely that auditor will see several business functions and activities happening within the systems. Consider the following aspects instead of:

(i) Computation and Calculations are automatically carried out (for example, bank interest computation and inventory valuation).

(ii) Accounting entries are posted automatically (for example, sub-ledger to GL postings is automatic).

(iii) Business policies and procedures, including internal controls, are applied automatically (for example, delegation of authority for journal approvals, customer credit limit checks are performed automatically).

(iv) Reports used in business are produced from systems. Management and other stakeholders rely on these reports and information produced (for example, debtors ageing report).

(v) User access and security are controlled by assigning system roles to users (**for example,** segregation of duties can be enforced effectively).

Companies derive benefit from the use of IT systems as an enabler to support various business operations and activities. Auditors need to understand the relevance of these IT systems to an audit of financial statements.

While it is true that the use of IT systems and automation benefit the business by making operations more accurate, reliable, effective and efficient, such systems also introduce certain new risks, including IT specific risks, which need to be considered, assessed and addressed by management.

To the extent that it is relevant to an audit of financial statements, even auditors are required to understand, assess and respond to such risks that arise from the use of IT systems.

From the above discussion, it is quite apparent that it is necessary for an auditor to understand the automated environment.

**Alternative Solution**

**Understanding and Documenting Automated Environment**: In an audit of financial statements, an auditor is required to understand the entity and its business, including IT as per SA 315. Understanding the entity and its automated environment involves understanding how IT department is organised, IT activities, the IT dependencies, relevant risks and controls.

Given below are some of the points that an auditor should consider to obtain an understanding of the company’s automated environment:

(i) Information systems being used (one or more application systems and what they are).

(ii) Their purpose (financial and non-financial).

(iii) Location of IT systems - local vs global.

(iv) Architecture (desktop based, client-server, web application, cloud based).

(v) Version (functions and risks could vary in different versions of same application).

(vi) Interfaces within systems (in case multiple systems exist).

(vii) In-house vs Packaged.

(viii) Outsourced activities (IT maintenance and support).

(ix) Key persons (CIO, CISO, Administrators).

The understanding of a company’s IT environment that is obtained should be documented.

From the above discussion, it is quite apparent that it is necessary for an auditor to understand the automated environment.
#### Approach
Disagree, and back it with SA 315's requirement to understand the entity including its IT, plus the new risks automation brings.

---
item: q6d
qno: 6
part: (d)
marks: 3
type: descriptive
oos: yes
difficulty: easy
q: 14
a: 18
note: Out of syllabus (old scheme, ours): the classification of errors (self-revealing errors, errors of commission, posting and casting errors) was part of old Paper 6's errors and frauds topic; neither the new-scheme Paper 5 syllabus nor the January 2027 Study Material teaches the types of errors. No tag.
---
#### Question
The accountant of CHB Limited observed that amount received from Mr. A has been recorded in the account of Mr. B and this mistake was found at the time of tallying account statement provided by Mr. A. What type of error is this? Can you give two more examples of such error and how the same will be detected?
#### Answer
**Self-Revealing Error:**

Situation mentioned in the case is a Self-Revealing Error. These are such errors the existence of which becomes apparent in the process of compilation of accounts.

Below are two more examples of such errors:

(a) Omission to post a part of a journal entry in to the ledger. (Trial Balance is thrown out of agreement) – Statement of account of parties will reveal the mistake.

(b) Wrong totalling of the Purchase register. Control Account (e.g., the Sundry Trade Payables Account) balances and the aggregate of the balance in the personal ledger will disagree.

**Alternative Solution:**

**Errors of Commission:** When a transaction has been mis-recorded either wholly or partially it is called as an error of commission. Error of commission can happen in the following ways-

(i) Errors in posting,

(ii) Errors in Casting,

(iii) Errors in carrying forward,

(iv) Errors occurring during extraction of balances, etc.

The case given in the question is an error of posting.

**Posting errors** may be of a wrong account, wrong amount or wrong file.

For example,

(i) Omission of posting of any part of the journal entry – Can be detected through trial balance.

(ii) Purchase of ₹ 360 from Mr. A posted in his account at ₹ 630 or sales returns from Mr. X posted as the debit of his account – This error can be detected by verifying entries with underlying vouchers.

Errors of posting in the wrong account may be detected by performing external confirmation as an audit procedure.
#### Approach
Ask how the mistake came to light (from the party's own statement) and name the class of error that reveals itself in that way.
