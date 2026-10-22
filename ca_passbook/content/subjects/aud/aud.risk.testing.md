---
id: aud.risk.testing
title: Testing internal control: walkthroughs, tests of controls and reporting
minutes: 25
needs: aud.risk.ic, aud.risk.sa330
tags: tests of controls, walkthrough, reperformance, inspection, inquiry, observation, control deficiency, management letter
labs:
summary: How the auditor checks that controls actually worked through the year: walkthroughs, the four kinds of test, what deviations mean, and how control deficiencies are assessed and reported.
---

## In plain words

### "The manual says so, Ma'am"

Bunty has marked Tapri's bank reconciliation control "effective". His evidence: the finance manual says reconciliations are prepared every month and reviewed by the senior accountant.

> **Bunty:** Ma'am, the manual says it is done every month. Control effective. Tick.
> **Lakshmi:** A manual is a promise, Bunty. Show me twelve reconciliations, who signed them, and redo one yourself.
> **Bunty:** Redo it? Myself?
> **Lakshmi:** That is reperformance. The best evidence you will ever get.

Understanding a control tells the auditor what it is meant to do and that it exists. It does not show that the control **worked all year**. **Tests of controls** do that, in four ways: **ask** people (inquiry), **watch** them (observation), **look** at the papers or screens the control leaves behind (inspection), and **redo** it (reperformance). A **walkthrough** follows one transaction from start to finish to see the controls along its path.

Tests find slips, called **deviations**. The auditor asks why, makes sure the testing covers the troubled period, and if the control cannot be trusted, does more substantive work. At the end, every finding is weighed: deficiencies go to management in an **internal controls memo** or **management letter**, and significant ones go **in writing** to those charged with governance.

::: analogy The kitchen inspection
A hygiene inspector reads the policy on the wall (design) and sees that a hand-wash basin exists (implementation). Then the real work: asking the cook (inquiry), watching the lunch rush (observation, true only for that hour), reading the cleaning log signed each night (inspection) and swabbing the counter herself (reperformance). Following one order from the waiter's pad to the plate is her walkthrough. Small lapses go in a note to the manager; serious ones go in writing to the owner.
:::

::: key
Tests of controls are performed to obtain audit evidence about the effectiveness of the design of the internal control system and of its operation throughout the period. Inquiry alone is never sufficient. Deviations can change the assessment of control risk, and with it the nature, timing and extent of substantive procedures.
:::

## How it works

### 1. Understanding is not testing

When obtaining an understanding, the auditor evaluates the **design** of a control (is it capable of effectively preventing, or detecting and correcting, material misstatements?) and its **implementation** (does it exist, and is the entity using it?). Obtaining that understanding is **not sufficient to test operating effectiveness**, unless some automation provides for the consistent operation of the control: evidence about a manual control at a point in time says nothing about other times in the period. Because of the inherent consistency of IT processing, determining that an automated control has been implemented **may serve as a test of its operating effectiveness**, depending on the auditor's assessment and testing of controls such as those over program changes (SM 3.40–3.41).

::: diagram Three questions about a control
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "A relevant control"}, {"id": "d1", "kind": "decision", "label": "Well designed?"}, {"id": "x1", "kind": "end", "label": "Deficiency", "color": "bad"}, {"id": "d2", "kind": "decision", "label": "Implemented:\nexists, in use?"}, {"id": "x2", "kind": "end", "label": "Deficiency", "color": "bad"}, {"id": "d3", "kind": "decision", "label": "Operated all\nperiod?"}, {"id": "x3", "kind": "end", "label": "Deficiency", "color": "bad"}, {"id": "ok", "kind": "end", "label": "Supports reliance", "color": "ok"}], "edges": [["s", "d1"], ["d1", "x1", "no"], ["d1", "d2", "yes"], ["d2", "x2", "no"], ["d2", "d3", "yes"], ["d3", "x3", "no"], ["d3", "ok", "yes"]], "caption": "The first two questions belong to understanding the control (SM 3.40); tests of controls answer the third (SM 3.52). Rose ends: a deficiency in internal control, since the control cannot prevent, or detect and correct, misstatements on a timely basis (SM 3.65). Green end: evidence that supports reliance."}
:::

When tests of controls are compulsory (reliance intended, or substantive procedures alone insufficient), and their extent and timing, are set by [[aud.risk.sa330|SA 330]].

### 2. What tests of controls are

After assimilating the internal control system, the auditor examines whether, and how far, it is actually in operation. This is done on a **selective basis**, and can be planned so that all the important areas are covered over a period of, say, **three years** (SM 3.52). Tests of controls are performed to obtain audit evidence about the effectiveness of the (SM 3.52):

- (i) **design** of the accounting and internal control system; and
- (ii) **operation** of the internal control **throughout the period**.

They include tests of elements of the control environment, where its strengths are used to reduce control risk. Procedures performed to obtain the understanding may also serve as tests of control: understanding the cash system through inquiry and observation may give evidence that the bank reconciliation process works. The auditor may use that evidence, provided it is sufficient to support a control risk assessment at less than a high level (SM 3.52).

### 3. The procedures that test a control

Tests of control may include (SM 3.53):

| Procedure | Example in the Study Material | At Tapri |
|---|---|---|
| Inspection of documents supporting transactions and other events | Verifying that a transaction has been authorised | Purchase invoices carry the purchase manager's approval |
| Inquiries about, and observation of, controls that leave no audit trail | Who actually performs each function, not merely who is supposed to | Who really counts the café cash at closing |
| Re-performance: the auditor's independent execution of procedures or controls originally performed as part of internal control | Reconciliation of bank accounts | Bunty prepares March's bank reconciliation himself |
| Testing controls over specific computerised applications or the IT function | Access or program change controls | Who can change the ERP's price master |

### 4. Which test, and in what combination

There are basically four types of audit tests: **inquiry, observation, inspection and reperformance** (SM 3.58).

| Test | What the Study Material says |
|---|---|
| Inquiry | The most efficient test, but gives the least audit evidence; always combine it with another method; ==inquiry alone is not sufficient== (SM 3.59) |
| Observation | Pertinent only at the point in time at which it is made (SM 3.67) |
| Inspection | Inquiry combined with inspection generally gives the most effective and efficient audit evidence (SM 3.59); where operating effectiveness is evidenced by documentation, the auditor may inspect it (SM 3.67) |
| Reperformance | The most effective test, giving the best audit evidence; but very time consuming, and least efficient most of the time (SM 3.59) |

Inquiry combined with inspection or reperformance may provide more assurance than inquiry and observation (SM 3.67). Which test to use, when and in what combination is a matter of **professional judgment**, varying with the risk assessment, the control environment, the desired level of evidence, the history of errors or misstatements, the complexity of the business and the assertions being addressed. The auditor documents the nature of the test (or combination) applied and the judgments in the audit file (SM 3.59).

### 5. The walkthrough

When testing in an automated environment, the more common methods are (SM 3.59):

- obtain an understanding of how an automated transaction is processed by doing a **walkthrough of one end-to-end transaction**, using a combination of inquiry, observation and inspection;
- observe how a user processes transactions under different scenarios; and
- inspect the configuration defined in an application.

::: diagram A walkthrough of one delivery-app order
{"type": "seq", "lanes": ["Bunty", "Order and billing", "Accounts"], "events": [{"from": "Bunty", "to": "Order and billing", "text": "inquiry: billing steps?"}, {"lane": "Order and billing", "text": "credit check, numbering"}, {"lane": "Bunty", "text": "observes billing"}, {"from": "Order and billing", "to": "Accounts", "text": "posts to ledger"}, {"from": "Bunty", "to": "Accounts", "text": "inspects invoice, entry"}, {"lane": "Accounts", "text": "exceptions reviewed"}], "caption": "One transaction followed end to end, using inquiry, observation and inspection at each step (SM 3.59). The steps at Tapri are illustrative."}
:::

Where general IT controls do not exist or are ineffective, the auditor assesses the impact of IT risks and the complexity of the automated environment, and plans alternative audit procedures in order to rely on system-based information (SM 3.59); see [[aud.risk.it|internal control in an IT environment]].

In the Study Material's audit approach for an automated environment, walkthroughs belong to the second of four stages, **understand and evaluate** (understanding the design of controls by performing walkthroughs of the end-to-end process), followed by these two (SM 3.61):

| Test for operating effectiveness | Reporting |
|---|---|
| Assess the nature, timing and extent (NTE) of controls testing | Evaluate control deficiencies |
| Assess the reliability of source data; completeness of population | Significant deficiencies, material weaknesses |
| Test key reports and spreadsheets | Remediation of control weaknesses |
| Sample testing | Internal controls memo (ICM) or management letter |
| Consider the competence and independence of the staff performing controls testing | Auditor's report |

### 6. When the test finds deviations

While testing, the auditor considers **how** the controls were applied, the **consistency** with which they were applied during the period, and **by whom**. Effective operation recognises that some deviations may have occurred. They may be caused by **changes in key personnel, significant seasonal fluctuations in the volume of transactions, and human error** (SM 3.53).

::: diagram Deviations found: what happens next
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Deviations\ndetected"}, {"id": "q", "kind": "process", "label": "Specific inquiries:\ntiming of staff changes"}, {"id": "c", "kind": "process", "label": "Tests cover the period\nof change or fluctuation"}, {"id": "d1", "kind": "decision", "label": "Preliminary control\nrisk supported?"}, {"id": "k", "kind": "end", "label": "Assessment\nstands", "color": "ok"}, {"id": "d2", "kind": "decision", "label": "Other tests of\ncontrol support it?"}, {"id": "k2", "kind": "end", "label": "Assessment\nstands", "color": "ok"}, {"id": "r", "kind": "process", "label": "Revise the assessed\ncontrol risk"}, {"id": "m", "kind": "end", "label": "Modify nature, timing,\nextent of substantive work", "color": "bad"}], "edges": [["s", "q"], ["q", "c"], ["c", "d1"], ["d1", "k", "yes"], ["d1", "d2", "no"], ["d2", "k2", "yes"], ["d2", "r", "no"], ["r", "m"]], "caption": "SM 3.53–3.54. Green ends: the preliminary assessment of control risk is kept; rose end: it is revised and the planned substantive procedures change."}
:::

Based on the results, the auditor evaluates whether the controls are designed and operating as contemplated in the **preliminary assessment of control risk**. If the deviations mean that assessment is not supported, the auditor amends it, **unless audit evidence from other tests of control supports it**, and modifies the nature, timing and extent of planned substantive procedures. Before the conclusion of the audit, the auditor considers, on the results of substantive procedures and other evidence, whether the assessment of control risk is confirmed (SM 3.53–3.54). A control that is not working as planned cannot prevent misstatements: it represents a **control deficiency** (SM 3.85).

### 7. Assessing and reporting the findings

At the conclusion of each audit there may be findings or exceptions in the IT environment and IT controls that need to be assessed and reported to management and those charged with governance (the Board of Directors, the Audit Committee). Points to consider (SM 3.65):

- Are there any weaknesses in IT controls?
- What is the impact of these weaknesses on the overall audit?
- Report deficiencies to management: **internal controls memo or management letter**.
- Communicate **in writing** any **significant deficiencies** to those charged with governance.

The auditor assesses each finding or exception to determine its impact on the audit and whether it results in a deficiency in internal control. This involves professional judgment on **quantitative and qualitative** measures; each finding is looked at **individually and in the aggregate** with other findings (SM 3.65).

::: definition Deficiency in internal control
Exists when (i) a control is designed, implemented or operated in such a way that it is unable to prevent, or detect and correct, misstatements in the financial statements on a timely basis; or (ii) a control necessary to prevent, or detect and correct, misstatements on a timely basis is missing (SM 3.65, 7.46).
:::

::: definition Significant deficiency in internal control (SA 265)
A deficiency or combination of deficiencies in internal control that, in the auditor's professional judgment, is of sufficient importance to merit the attention of those charged with governance (SM 7.46–7.47).
:::

Its significance depends not only on whether a misstatement has occurred, but on the **likelihood** that one could occur and its potential **magnitude**: a significant deficiency may exist even though no misstatement was found (SM 7.47). Under SA 265 the auditor communicates significant deficiencies **in writing to those charged with governance on a timely basis**, and to management at an appropriate level both those (in writing, unless inappropriate) and other deficiencies of sufficient importance. The written communication describes the deficiencies and explains their **potential effects**, with enough context, including that the audit considered internal control to design procedures, not to express an opinion on its effectiveness (SM 7.49). The detail is in [[aud.complete.sa260|SA 260 and SA 265]].

::: diagram Who hears about a deficiency
{"type": "seq", "lanes": ["Audit team", "Management", "Audit committee"], "events": [{"lane": "Audit team", "text": "assess each finding"}, {"lane": "Audit team", "text": "significant?"}, {"from": "Audit team", "to": "Management", "text": "memo or management letter"}, {"from": "Audit team", "to": "Audit committee", "text": "significant ones, in writing"}, {"lane": "Management", "text": "remediation"}], "caption": "Those charged with governance (here the audit committee) receive significant deficiencies in writing on a timely basis; management receives those and other deficiencies worth its attention (SM 3.65, 7.49)."}
:::

### 8. A favourite: tests of controls over sales, for trade receivables

It is important to carry out tests of controls for checking the effectiveness of internal control over sales as part of the debtors' audit. The points to be considered in respect of trade receivables (SM 5.37–5.38):

1. Only bona fide sales lead to trade receivables.
2. All such sales are made to approved customers.
3. All such sales are properly recorded in the books of account.
4. Once recorded, the debtors can be settled only by receipt of cash or on the authority of a responsible official.
5. Segregation of duties at every point in the sales transaction (accounting for debtors, collecting payments, sending reminders).
6. Debtors are collected on time.
7. If not collected in time, reminders are sent and legal action taken if required.
8. Balances are regularly reviewed.
9. A proper system of follow-up exists and, if necessary, adequate provision for bad debts is made by preparing an adequate ageing schedule.

After these tests, the auditor decides on the procedures to verify the debtors' balances (SM 5.38); see [[aud.items.current|audit of receivables]].

## Worked examples

:::: example Four tests in one afternoon
At Tapri Tea Co. Ltd, for 2025-26, Iyer & Associates intend to rely on the controls over purchases and café cash:

(a) Bunty takes 25 paid supplier invoices and himself repeats the three-way match of purchase order, goods received note and invoice that Tapri's accounts clerk performed before each payment.

(b) Lakshmi asks him to find out who actually counts the cash at the Bhopal café at closing time, a step that leaves no paper behind.

(c) He inspects 40 purchase orders for the purchase manager's signature of approval.

(d) The firm's IT specialist examines the ERP's log of changes to the price master and the list of users permitted to make them.

Required: (i) Identify the test of control in each case. (ii) Which test gives the best audit evidence, which the least, and how should the weakest be used?

::: answer Model answer
**Relevant provision.** After assimilating the internal control system, the auditor examines whether and how far it is actually in operation. Tests of controls are performed to obtain audit evidence about the effectiveness of (i) the design of the accounting and internal control system and (ii) the operation of internal control throughout the period.

**(i)(a) Re-performance:** the auditor's independent execution of procedures or controls that were originally performed as part of the entity's internal control, here the three-way match before payment, to ensure they were correctly performed by the entity.

**(b) Inquiries about, and observation of,** internal controls which leave no audit trail: determining who actually performs each function and not merely who is supposed to perform it.

**(c) Inspection** of documents supporting transactions to gain audit evidence that internal controls have operated properly, here verifying that each purchase was authorised.

**(d) Testing of internal control operating on specific computerised applications** or over the overall information technology function, here access and program change controls over the price master.

**(ii)** Re-performance is the most effective test and gives the best audit evidence, but it could be very time consuming and least efficient most of the time. Inquiry is the most efficient test but gives the least audit evidence, so it should always be used in combination with another method: inquiry alone is not sufficient. Generally, inquiry combined with inspection gives the most effective and efficient audit evidence. Which test to use, when and in what combination is a matter of professional judgment, documented in the audit file.
:::
::::

:::: example Diwali, and the deposits that waited
Tapri's control: each café's cash is deposited in the bank on the next working day, and the area manager signs the deposit slip after matching it with the day's sales report. Iyer & Associates intend to rely on this control. Bunty tests 60 café-days spread over the year: 51 comply. All 9 deviations fall between 20 October and 15 November 2025 at the Bhopal and Indore cafés, when both area managers were transferred and festival sales doubled. Of the 60 café-days, 12 fall in that window.

Required: (i) What do the deviations represent? (ii) How should the auditor proceed?

::: answer Model answer
**(i)** The deviation rate is 9 ÷ 60 = 15% for the year, but 9 ÷ 12 = 75% in the festival window and 0 ÷ 48 outside it. In that window the control was not working as planned: it could not prevent, or detect and correct, misstatement of cash and bank, so it represents a **deficiency in internal control**.

**(ii) Relevant provision.** While obtaining evidence about the effective operation of controls, the auditor considers how they were applied, the consistency with which they were applied during the period and by whom. Deviations may be caused by changes in key personnel, significant seasonal fluctuations in the volume of transactions and human error. When deviations are detected, the auditor makes specific inquiries, particularly about the timing of staff changes in key internal control functions, and ensures that the tests of control appropriately cover such a period of change or fluctuation. The auditor evaluates whether the controls are designed and operating as contemplated in the preliminary assessment of control risk; if not, the assessed control risk is revised and the nature, timing and extent of planned substantive procedures are modified.

**Application.** Both causes named in the Study Material are present: the transfer of the two area managers and the festival surge. Bunty's sample already covers the window with 12 café-days; Iyer & Associates should confirm through inquiry exactly when the new managers took charge, and test whether the control resumed afterwards.

**Conclusion.** For Bhopal and Indore in the festival period, the control cannot support the preliminary assessment of control risk unless other tests of control support it. The auditor should revise control risk for that period and modify the substantive procedures, for example by testing cash sales and bank deposits for those cafés and weeks in detail, and report the deficiency to management, considering under SA 265 whether it is significant.
:::
::::

:::: example Four findings, three letters
At the close of Tapri's 2025-26 audit, Iyer & Associates list four findings on café cash and the books:

(a) At 3 of the 40 cafés visited, petty cash is counted at closing by the café manager alone; the shortages found there total ₹2,400.

(b) Since October 2025, nobody in the finance team has reviewed the monthly café cash reports, which would show such shortages.

(c) Last year's audit communicated to the audit committee, as a significant deficiency, that journal entries above ₹10 lakh are posted without a second approval. Nothing has changed: 14 such entries were posted in the last week of March 2026.

(d) The monthly bank reconciliation review in January found a duplicate supplier payment of ₹4,20,000, which was recovered in February.

Required:

(i) State, with reasons, whether each finding (alone or with another) is a deficiency in internal control, a significant deficiency, or neither.

(ii) How, and to whom, should Iyer & Associates communicate them?

::: answer Model answer
**Relevant provision.** As per SA 265, a deficiency in internal control exists when a control is designed, implemented or operated in such a way that it is unable to prevent, or detect and correct, misstatements in the financial statements on a timely basis, or a control necessary to do so is missing. A significant deficiency is a deficiency or combination of deficiencies that, in the auditor's professional judgment, is of sufficient importance to merit the attention of those charged with governance. Its significance depends not only on whether a misstatement has actually occurred, but also on the likelihood that one could occur and its potential magnitude. Matters the auditor may consider include the susceptibility to loss or fraud of the related asset, the interaction of the deficiency with other deficiencies, and the importance of the controls to the financial reporting process (such as controls over the period-end process and non-recurring journal entries); management's failure to implement remedial action on significant deficiencies previously communicated is an indicator of a significant deficiency.

**(i) Classification.**

| Finding | Classification | Reason |
|---|---|---|
| (a) Single-person count | Deficiency | One person counting cannot prevent or detect a shortage; small amounts alone |
| (b) No review since October | Deficiency | The detective control over café cash is not operating |
| (a) and (b) together | Significant deficiency | Neither prevention nor detection over cash, an asset highly susceptible to loss or fraud, across the cafés |
| (c) Journal entry approval | Significant deficiency | Previously communicated and not remedied; a period-end control over large non-recurring entries |
| (d) Duplicate payment | Neither | The control detected and corrected the misstatement on a timely basis: it worked |

The small size of the shortages in (a) does not settle the matter: significance turns on the likelihood and potential magnitude of misstatement, judged with the interaction of (a) and (b).

**(ii) Communication.** The auditor shall communicate in writing the significant deficiencies (the combination of (a) and (b), and (c)) to those charged with governance, here the audit committee, on a timely basis, and also communicate them in writing to management at an appropriate level of responsibility. The written communication shall include a description of the deficiencies and an explanation of their potential effects, and enough information for the audit committee and management to understand its context: that the purpose of the audit was to express an opinion on the financial statements; that the audit included consideration of internal control in order to design appropriate audit procedures, not to express an opinion on its effectiveness; and that the matters reported are limited to the deficiencies identified during the audit that the auditor concluded are of sufficient importance to report. For (c), the communication should also note that the deficiency was reported last year and remains unremedied. Finding (d) needs no communication as a deficiency.
:::
::::

## Under the hood

### The Study Material's own case

In Case Study 2 (SM 3.75–3.77) the best test of control for insurance of inventories inspects the policies for comprehensive cover, compares the **sum insured with the value of inventories** and checks that the **policy period has not expired**; the best test for inventory counts obtains the counting procedure, checks the count follows it, **attends the count and performs test counts**; and the best description of a control deficiency states the lapse, its cause, and **its possible effect on the financial statements** ("it may result in misstatement of cash and bank balance").

### Evidence that does not exist

The absence of misstatements detected by substantive procedures does not provide audit evidence that the related controls are effective; a material misstatement detected by the auditor's procedures is a strong indicator of a significant deficiency (SM 3.69). How many items to test, and the tolerable rate of deviation, are in [[aud.evid.sa530|SA 530: audit sampling]].

## Exam angle

::: exam What ICAI asked, May 2024 to September 2026
In the 9 ICAI documents read for this lesson, testing internal control or reporting findings was examined 12 times.

- **The four tests and walkthroughs, 4 or 5 marks.** Re-performance of a bank reconciliation, plus the other procedures in tests of control: September 2024 Q2(a), 4 marks. The four audit tests in an automated environment and the role of judgment: January 2025 Q6(c) (an OR question), 4 marks. Ways of testing in an automated environment and the most effective combination: May 2026 Q4(a), 5 marks. Testing methods and what to do when general IT controls are ineffective: MTP May 2026 Series II Q6(c), 4 marks. Inspection as a test of controls (evidence of authorisation): MTP January 2026 Series II Q3(a).
- **Reporting findings, 4 marks.** Points to consider in assessing and reporting IT findings: September 2025 Q6(c). Assess and report findings and deficiencies in an automated environment: MTP September 2026 Series I Q6(c).
- **Tests of controls over sales for receivables, 4 or 5 marks**: MTP May 2024 Series II Q4(a), May 2025 Q4(c), MTP September 2026 Series I Q5(b), each answered with the Study Material's nine points.
- **Communicating deficiencies.** A one-line description of significant deficiencies is not proper: MTP May 2024 Series II Q6(b). Significant deficiencies must go in writing to those charged with governance, not an oral briefing: MTP January 2026 Series II MCQ 15.
:::

::: exam How the marks are earned
"What kind of test?" questions are answered by naming the test and quoting its definition with the Study Material's example (bank reconciliation for re-performance; authorisation for inspection). The automated-environment questions are answered with the four tests, the inquiry/reperformance trade-off, "inquiry combined with inspection gives the most effective and efficient audit evidence", the judgment factors, documentation, and the three common methods, walkthrough first.
:::

::: trick Ask, watch, look, redo
Inquiry, observation, inspection, reperformance. ICAI ranks only the two ends: **ask** is the cheapest and weakest (never alone), **redo** the strongest and dearest. **Watch** proves only the moment you watched; **ask + look** is the usual best buy. Which one to use in a given case is still the auditor's judgment.
:::

## Answer frame

### "What test of control is the auditor performing?"

1. **Purpose**: tests of controls give evidence about the effectiveness of the design and of the operation of internal control throughout the period.
2. **Name the test** and give its definition with the Study Material's example.
3. **Apply** it to the facts.
4. **Add the other procedures** (inspection; inquiry and observation; re-performance; tests of computerised controls) if asked.

### "How are findings assessed and reported?"

| Step | What to write |
|---|---|
| Consider | Weaknesses in IT controls? Impact on the overall audit? |
| Assess | Each finding: impact on the audit; is it a deficiency (definition)? |
| Judge | Quantitative and qualitative; individually and in the aggregate |
| Report | Management: internal controls memo or management letter |
| Escalate | Significant deficiencies: in writing to those charged with governance |

## Common mistakes

::: mistake Hall of Shame: the manual that tested itself
Bunty reads the procedure manual and calls the control effective. **Fix:** understanding design and implementation is not a test of operating effectiveness; the auditor needs evidence that the control operated throughout the period (SM 3.41, 3.52).
:::

::: mistake "The staff said they always do it"
**Fix:** inquiry is the most efficient test but gives the least evidence; inquiry alone is not sufficient, so combine it with observation, inspection or reperformance (SM 3.59).
:::

::: mistake "No misstatements found, so the controls work"
**Fix:** the absence of misstatements detected by substantive procedures does not provide evidence that controls are effective (SM 3.69).
:::

::: mistake The one-line management letter
"Controls over sales are not followed." **Fix:** a written communication of significant deficiencies describes them and explains their potential effects, with enough context to understand it (SM 7.49).
:::

## Practice

::: quiz Check yourself
Q: Case scenario. CA Farhan tests Rangoli Snacks Ltd's control that the stores manager approves every material issue. He asks the stores manager how issues are approved, then watches the issues made on one morning, and concludes the control operated effectively for the whole year. Which of the following is correct?
- [ ] Proper: inquiry and observation together are sufficient
- [x] Not proper: one morning's observation proves only that morning; he should also inspect approved issue notes across the year
- [ ] Proper: tests of controls need not cover the whole period
- [ ] Not proper: he should have relied on inquiry alone, the most efficient test
> Observation covers only that morning (SM 3.67), and tests of controls look for evidence of operation throughout the period (SM 3.52). Inquiry alone is never sufficient (SM 3.59).

Q: Which test of control gives the best audit evidence but is usually the least efficient?
- [ ] Inquiry
- [ ] Observation
- [ ] Inspection
- [x] Reperformance
> Reperformance is the most effective test and gives the best evidence, but is very time consuming (SM 3.59).

Q: Tests of control at a café chain found deviations in 6 of 40 café-days sampled. What deviation rate did the sample show (in %)?
= 15
> 6 ÷ 40 = 0.15, so 15%. A rate alone does not settle reliance: the auditor also asks why, and whether the tests cover the period of change.

Q: Select all that the Study Material names as possible causes of deviations from prescribed controls.
- [x] Changes in key personnel
- [x] Significant seasonal fluctuations in volume of transactions
- [x] Human error
- [ ] An unmodified audit opinion in the previous year
> The three causes are named at SM 3.53; the auditor then makes specific inquiries, particularly about the timing of staff changes.

Q: Case scenario. Lakshmi finds that anyone in Tapri's accounts team can change a supplier's bank account details in the ERP without approval. Her tests find no misstatement. Bunty says: "No misstatement, so it cannot be a significant deficiency." Which of the following is correct?
- [ ] Bunty is right: a deficiency is significant only if it has caused a misstatement
- [ ] Bunty is right, unless management agrees that the deficiency is significant
- [x] Bunty is wrong: significance depends also on the likelihood and potential magnitude of a misstatement, so a significant deficiency may exist even though no misstatement has been identified
- [ ] Bunty is wrong: every deficiency in internal control is a significant deficiency
> SM 7.47: the significance of a deficiency depends not only on whether a misstatement has actually occurred, but also on the likelihood that one could occur and its potential magnitude. Unapproved changes to suppliers' bank details expose every payment to diversion, an asset highly susceptible to loss or fraud. Whether a deficiency is significant is the auditor's professional judgment, not management's, and not every deficiency is significant.
:::

## Recap

- Tests of controls give evidence about the effectiveness of the design and the operation of internal control throughout the period; planned selectively, important areas covered over, say, three years.
- Understanding design and implementation is not a test of operating effectiveness, except that an implemented automated control may serve as one if program change controls are effective.
- Procedures: inspection (authorisation), inquiry and observation (controls with no audit trail), re-performance (bank reconciliation), tests of computerised controls (access, program change).
- Inquiry: most efficient, least evidence, never alone. Reperformance: best evidence, least efficient. Inquiry plus inspection: generally the most effective and efficient.
- Walkthrough: one end-to-end transaction traced with inquiry, observation and inspection.
- Deviations (staff changes, seasonal volume, human error): specific inquiries, cover the period, revise control risk if needed and modify substantive procedures.
- Report deficiencies to management in an internal controls memo or management letter; significant deficiencies in writing to those charged with governance.
- (Bunty now redoes one reconciliation before he ticks twelve.)

## Flashcards

Q:: Why are tests of controls performed?
A:: To obtain audit evidence about the effectiveness of (i) the design of the accounting and internal control system and (ii) the operation of internal control throughout the period.

Q:: Name the procedures that tests of control may include.
A:: Inspection of documents supporting transactions (e.g. authorisation); inquiries about, and observation of, controls that leave no audit trail; re-performance (e.g. bank reconciliation); testing controls over computerised applications or the IT function (access, program change).

Q:: Define re-performance, with the Study Material's example.
A:: The auditor's independent execution of procedures or controls originally performed as part of the entity's internal control, for example reconciliation of bank accounts, to ensure they were correctly performed.

Q:: Which audit test is most efficient, and which gives the best evidence?
A:: Inquiry is the most efficient but gives the least evidence; reperformance is the most effective and gives the best evidence but is time consuming. Inquiry combined with inspection generally gives the most effective and efficient evidence.

Q:: What is a walkthrough in an automated environment?
A:: Obtaining an understanding of how an automated transaction is processed by following one end-to-end transaction, using a combination of inquiry, observation and inspection.

Q:: What can cause deviations from prescribed controls?
A:: Changes in key personnel, significant seasonal fluctuations in the volume of transactions, and human error.

Q:: Deviations make the preliminary control risk assessment unsupported. What follows?
A:: The auditor revises the assessed control risk (unless other tests of control support it) and modifies the nature, timing and extent of planned substantive procedures.

Q:: Define a deficiency in internal control.
A:: A control designed, implemented or operated so that it is unable to prevent, or detect and correct, misstatements on a timely basis; or a necessary control that is missing.

Q:: How are IT audit findings reported?
A:: Deficiencies to management in an internal controls memo or management letter; significant deficiencies in writing to those charged with governance.

Q:: Can understanding a control ever serve as a test of its operating effectiveness?
A:: For an automated control, yes: because of the inherent consistency of IT processing, determining that it is implemented may serve as a test of operating effectiveness, depending on the testing of controls such as program change controls.
