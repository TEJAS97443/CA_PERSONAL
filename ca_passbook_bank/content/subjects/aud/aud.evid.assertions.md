---
id: aud.evid.assertions
title: Financial statement assertions and audit procedures
minutes: 26
needs: aud.evid.sa500
tags: assertions, existence, completeness, occurrence, cut-off, valuation, rights and obligations, audit procedures, inspection, reperformance
labs:
summary: The claims hidden in every line of the financial statements (assertions), the seven procedures auditors use to test them, and why each procedure proves some assertions and not others.
---

## In plain words

### Six promises in one line

Bunty is reading Tapri Tea Co. Ltd's draft balance sheet. One line says "Inventories ₹38 crore".

> **Lakshmi:** What is that line telling you, Bunty?
> **Bunty:** That Tapri has ₹38 crore of stock, ma'am.
> **Lakshmi:** It is telling you at least six things. Which one will you test first?
> **Bunty:** Is that a trick question?

It is not. By printing that line, management is claiming that the stock **exists**; that Tapri **owns** it (a supplier's coffee premix lying in Tapri's godown on consignment is not in it); that **all** of Tapri's stock is in it, including tea lying with a blender; that it is at the **right amount** (cost, or less if it will not sell for cost); that it belongs to **this year**; and that it is **properly described** in the notes. These claims, stated or merely implied, are management's **assertions**, and the auditor's work is to test them one by one.

The tests are **audit procedures**: looking at documents and assets, watching people work, writing to outsiders, redoing calculations and controls, comparing figures, and asking. The catch is that each procedure proves some assertions and not others. Counting the cartons in the Dewas warehouse proves they exist. It proves nothing about who owns them or what they are worth.

::: analogy The matrimonial biodata
"Software engineer in Bengaluru, owns a flat, six feet tall, non-smoker." Every line is an assertion, and a careful family tests each differently. Meeting him settles the height. A letter from the employer settles the job. The sale deed settles the flat (and shows it is his, not his uncle's). Asking the neighbour about smoking is the weakest test of all. Seeing that he is six feet tall tells you nothing about the flat.
:::

::: key
Financial statements are bundles of management's assertions. The auditor picks, for each assertion, a procedure that can actually prove it: evidence for one assertion (existence) is no substitute for evidence about another (ownership, valuation, cut-off).
:::

## How it works

### 1. What an assertion is

::: definition Assertions
==Representations by management, explicit or otherwise, that are embodied in the financial statements==, as used by the auditor to consider the different types of potential misstatements that may occur. (SM 4.23)
:::

In representing that the financial statements are in accordance with the applicable financial reporting framework, management implicitly or explicitly makes assertions about the recognition, measurement, presentation and disclosure of their elements. The auditor uses them, when obtaining evidence from substantive procedures, in three categories (SM 4.23–4.25):

**(a) Classes of transactions and events for the period**

| Assertion | Meaning (SM 4.24) |
|---|---|
| Occurrence | Transactions and events that have been recorded have occurred and pertain to the entity |
| Completeness | All transactions and events that should have been recorded have been recorded |
| Accuracy | Amounts and other data relating to recorded transactions and events have been recorded appropriately |
| Cut-off | Transactions and events have been recorded in the correct accounting period |
| Classification | Transactions and events have been recorded in the proper accounts |

**(b) Account balances at the period end**

| Assertion | Meaning (SM 4.24–4.25) |
|---|---|
| Existence | Assets, liabilities and equity interests exist |
| Rights and obligations | The entity holds or controls the rights to assets, and liabilities are the obligations of the entity |
| Completeness | All assets, liabilities and equity interests that should have been recorded have been recorded |
| Valuation and allocation | Assets, liabilities and equity interests are included at appropriate amounts and any resulting valuation or allocation adjustments are appropriately recorded |

**(c) Presentation and disclosure**

| Assertion | Meaning (SM 4.25) |
|---|---|
| Occurrence and rights and obligations | Disclosed events, transactions and other matters have occurred and pertain to the entity |
| Completeness | All disclosures that should have been included have been included |
| Classification and understandability | Financial information is appropriately presented and described, and disclosures are clearly expressed |
| Accuracy and valuation | Financial and other information are disclosed fairly and at appropriate amounts |

*Reproduce the three headings and their assertions in this order: they are marked as ICAI lists them.* The auditor may express the assertions differently, for example combining those about transactions with those about balances, provided all these aspects are covered (SM 4.25).

### 2. The second list: assertions by caption

Chapter 5 of the Study Material, which applies assertions to each item of the financial statements, groups them by caption (SM 5.4–5.10). ICAI's questions use both vocabularies, so know how they line up:

| Income statement captions (revenue and expense) | Balance sheet captions (assets, liabilities, equity) |
|---|---|
| Occurrence | Existence |
| Completeness | Completeness |
| Cut-off | Cut-off |
| Measurement (recorded accurately at appropriate amounts) | Valuation |
| Presentation and disclosure | Rights and obligations |
| | Presentation and disclosure |

The Study Material does not map one list onto the other, but "measurement" (recorded accurately at appropriate amounts) covers what Chapter 4 calls "accuracy", and "valuation" what it calls "valuation and allocation"; in a question, use the word of the list the question uses. Cut-off is a separate assertion because the substantive procedures to verify it are typically different from those for the other components of completeness (SM 5.6). Inventory held by the entity as a consignee is excluded (completeness; rights and obligations), while inventory held by a third party on the entity's behalf is included (SM 5.8–5.9). The audit of each caption is in [[aud.items.current|audit of inventories, receivables and cash]] and its sibling lessons.

### 3. The procedures: where tests come from

Audit evidence is obtained by performing **risk assessment procedures** and **further audit procedures**: **tests of controls** (when required by the SAs or chosen by the auditor) and **substantive procedures**, which include tests of details and substantive analytical procedures (SM 4.15, 4.20–4.22).

::: diagram The family of audit procedures (SM 4.22)
{"type": "nest", "w": 420, "root": {"title": "Audit procedures", "mono": false, "color": "mute", "children": [{"title": "Risk assessment procedures", "mono": false, "color": "e", "lines": ["understand the entity and its environment,", "including internal control; identify and", "assess risks of material misstatement"]}, {"title": "Further audit procedures", "mono": false, "color": "mute", "children": [{"title": "Tests of controls", "mono": false, "color": "a", "lines": ["operating effectiveness of controls"]}, {"title": "Substantive procedures", "mono": false, "color": "b", "lines": ["detect material misstatements at the assertion level"], "children": [{"title": "Tests of details", "mono": false, "color": "c", "rows": [["transactions", "vouching"], ["balances", "verification"]]}, {"title": "Substantive analytical procedures", "mono": false, "color": "g"}]}]}]}, "caption": "Sky blue: risk assessment procedures; blue: tests of controls; teal: substantive procedures, split into tests of details (amber: transactions, vouching; balances, verification) and substantive analytical procedures (green)."}
:::

::: definition Tests of controls and substantive procedures
A **test of controls** is an audit procedure designed to evaluate the operating effectiveness of controls in preventing, or detecting and correcting, material misstatements at the assertion level. A **substantive procedure** is an audit procedure designed to detect material misstatements at the assertion level; substantive procedures comprise tests of details (of classes of transactions, account balances and disclosures) and substantive analytical procedures. (SM 4.21–4.22)
:::

### 4. The seven procedures, in ICAI's order

Audit procedures to obtain audit evidence can include (SM 4.15–4.19):

| Procedure | What it is | Study Material's examples and limits |
|---|---|---|
| **Inspection** | Examining records or documents, internal or external, in paper, electronic or other media, or a physical examination of an asset | Records for evidence of authorisation (a test of controls). Inspecting a tangible asset gives reliable evidence of existence, not necessarily of rights and obligations or valuation; a stock or bond certificate shows existence, not necessarily ownership or value |
| **Observation** | Looking at a process or procedure being performed by others | Inventory counting by the entity's staff. Limited to the point in time observed, and being observed may change how people act |
| **External confirmation** | Audit evidence obtained as a direct written response to the auditor from a third party (the confirming party), on paper or electronic or other medium | Balances; terms of agreements; the absence of a "side agreement" ([[aud.evid.sa505|SA 505]]) |
| **Recalculation** | Checking the mathematical accuracy of documents or records, manually or electronically | Checking whether euro sales invoices were converted into rupees correctly (Case Study 2, SM 4.118–4.119) |
| **Reperformance** | The auditor's independent execution of procedures or controls originally performed as part of the entity's internal control | Re-performing the bank reconciliation; re-performing the ageing of receivables |
| **Analytical procedures** | Evaluations of financial information made by a study of plausible relationships among both financial and non-financial data, including investigating fluctuations that are inconsistent or deviate from predicted amounts | Gross profit ratio compared with past years and the industry ([[aud.evid.sa520|SA 520]]) |
| **Inquiry** | Seeking information of knowledgeable persons, financial and non-financial, within or outside the entity; from formal written to informal oral | Used throughout the audit; responses may need corroboration or written representations |

Two rules carry marks. First, ==inquiry alone ordinarily does not provide sufficient audit evidence of the absence of a material misstatement at the assertion level, nor of the operating effectiveness of controls== (SM 4.19). Second, the same procedure may be a risk assessment procedure, a test of controls or a substantive procedure, depending on the context in which the auditor applies it (SM 4.19).

### 5. Matching the procedure to the assertion

::: diagram What a procedure proves, and what it does not
{"type": "table", "head": ["Procedure", "Proves", "Not necessarily"], "rows": [["Inspecting a tangible asset", "Existence", "Rights and obligations; valuation"], ["Inspecting a share or bond certificate", "Existence", "Ownership; value"], ["Documents for collections after the period end", "Existence; valuation", "Cut-off"], ["Customer's confirmation of a receivable", "Existence; rights", "Valuation (will it be recovered?)"]], "cells": {"0,1": "a", "1,1": "a", "2,1": "a", "3,1": "a", "0,2": "b", "1,2": "b", "2,2": "b", "3,2": "b"}, "caption": "Green: what the procedure can prove; rose: what it does not necessarily prove (SM 4.9, 4.16, 4.123, 4.127). Evidence for one assertion is no substitute for evidence about another."}
:::

The direction of a test matters too: starting from the recorded items tests whether they are overstated (occurrence, existence), while finding unrecorded items needs a test that starts outside the records, as the accounts payable example in [[aud.evid.sa500|SA 500]] shows (SM 4.9).

## Worked examples

:::: example Bunty's year-end checklist
Identify and explain the assertion Iyer & Associates are testing in each procedure at Tapri Tea Co. Ltd for 2025-26.

(i) Selecting kulhad carton lines from the 31 March inventory records and counting those cartons at the Dewas warehouse.

(ii) Checking that twelve espresso machines, lying in Tapri's cafés on a sale-or-return trial from Brew-Tech Equipment Pvt Ltd, are not included in Tapri's property, plant and equipment.

(iii) Checking that samosa despatches of 29 to 31 March are invoiced in March and those of 1 April are not.

(iv) Recomputing the year-end restatement of a euro-denominated payable for an imported blending machine at the closing exchange rate.

(v) Tracing March goods received notes to the purchase ledger.

::: answer Model answer
**(i) Existence.** Assets, liabilities and equity interests exist. Starting from the records and finding the cartons in the warehouse shows that recorded inventory is physically there. (Counting cartons on the floor and looking for them in the records would test completeness instead.)

**(ii) Rights and obligations.** The entity holds or controls the rights to the assets it records. Machines on sale-or-return remain the supplier's until Tapri accepts them, so they must not be recorded as Tapri's assets.

**(iii) Cut-off.** Transactions and events have been recorded in the correct accounting period. Despatches either side of 31 March must fall in the right year.

**(iv) Valuation and allocation.** Liabilities are included at appropriate amounts, with valuation adjustments appropriately recorded. Restating the payable at the closing rate tests its amount; the procedure is recalculation.

**(v) Completeness.** All transactions that should have been recorded have been recorded. Starting from goods received and looking for them in the ledger finds purchases left out; starting from the ledger could not.
:::
::::

:::: example Name the procedure
Identify the audit procedure in each situation.

(i) Lakshmi watches the Indore café staff count the cash at closing time on 31 March.

(ii) Bunty independently prepares Tapri's bank reconciliation for March and compares it with the accountant's.

(iii) Bunty checks the totals and GST computed on 40 sales invoices.

(iv) The State Bank branch replies directly to Iyer & Associates confirming Tapri's loan balance.

(v) Lakshmi compares the cafés' milk purchases with cups sold, month by month.

::: answer Model answer
**(i) Observation**: looking at a process or procedure being performed by others; it is evidence for that point in time only.

**(ii) Reperformance**: the auditor's independent execution of a control (the bank reconciliation) originally performed as part of the entity's internal control.

**(iii) Recalculation**: checking the mathematical accuracy of documents or records.

**(iv) External confirmation**: audit evidence obtained as a direct written response to the auditor from a third party.

**(v) Analytical procedure**: evaluation of financial information through a study of plausible relationships between financial data (milk purchases) and non-financial data (cups sold).
:::
::::

:::: example Bunty's two shortcuts
(a) Bunty asked the head accountant whether bank reconciliations are prepared every month, as management's policy requires. The accountant said yes, and Bunty recorded "control operating effectively".

(b) Bunty saw Tapri's 120 delivery vans in the depot yard and recorded "vans: existence, ownership and value verified".

Comment on Bunty's conclusions.

::: answer Model answer
**Relevant provision.** As per SA 500, inquiry alone ordinarily does not provide sufficient audit evidence of the absence of a material misstatement at the assertion level, nor of the operating effectiveness of controls. Inspection of tangible assets may provide reliable audit evidence of their existence, but not necessarily about the entity's rights and obligations or the valuation of the assets.

**Facts of the case.** (a) The only evidence is an oral reply from the person responsible for the control. (b) The only procedure is physical inspection.

**Analysis.** (a) The oral reply must be corroborated: inspect the monthly reconciliations for preparation and review, and reperform one or more of them. (b) Seeing the vans shows they exist. Ownership needs inspection of registration certificates and purchase invoices in Tapri's name (and whether any van is hypothecated to a lender); valuation needs the cost records and a recalculation of depreciation.

**Conclusion.** Both conclusions go beyond the evidence. Bunty should record (a) "inquired; corroboration pending" and (b) "existence verified", and perform the further procedures above before concluding on the control and on rights, obligations and valuation.
:::
::::

## Under the hood

### Assertions that hide

- **Implied and explicit.** Most assertions are implied ("Cash in hand ₹10,000" implies the cash was there, was free for use, and agrees with the books). Explicit ones are made where the reader would otherwise get an incomplete or misleading picture: "Secured loans" needs the nature of security and, where relevant, the lender and interest rate (SM 4.26–4.27).
- **The Study Material's plant and machinery line.** "Plant and machinery (at cost) ₹2,00,000, less depreciation ₹83,000 (₹70,000 to the end of the previous year and ₹13,000 for the year), ₹1,17,000" asserts that the firm owns the plant; its historical cost is ₹2 lakh; it physically exists; it is used productively in the business; depreciation to date is ₹83,000, of which ₹13,000 relates to the year; and depreciation is calculated on a recognised basis and correctly (SM 4.26).
- **Negative assertions.** "There is no contingent liability" is an expressed negative assertion; the absence of a "Building" line implies the entity owned no building at the balance sheet date (SM 4.27).
- **The overall representation.** A statement of profit and loss presents "the results of operations", a balance sheet "financial position"; the auditor reaches that opinion only by judging many specific assertions (SM 4.27).
- **Government entities.** Where government is a major stakeholder, management may also assert that transactions were carried out in accordance with legislation or proper authority; such assertions may fall within the scope of the audit (SM 4.25; [[aud.entities.govt|government audit]]).
- **Electronic records.** Some data exist only electronically or only for a period, so the auditor may request retention of information or time the procedures to when it is available (SM 4.19–4.20).

## Exam angle

::: exam Where assertions and procedures appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, this topic was examined in 27 questions across 10 documents, most of them 2-mark MCQs inside case scenarios.

- **Name the assertion (MCQs).** MTP May 2024 Series II MCQs 1.1, 1.3–1.5 (employee benefits; allowance for doubtful debtors is valuation; invoices in a director's name fail rights and obligations; foreign currency balance restated is valuation). MTP January 2025 Series I MCQs 2–4 (answer "Measurement, Measurement", Chapter 5's word; consignee stock is completeness and rights and obligations). MTP January 2026 Series II MCQs 4–5 (occurrence against completeness). MTP September 2026 Series I MCQs 2 and 6 (loan restated at closing rate: valuation and allocation; original fixed deposit receipts: existence). RTP September 2026 MCQs 2, 4 and 6 (inadequate provision for doubtful debts; purchases near the year end untested, a cut-off risk; foreign currency loan restated, valuation). RTP January 2025 MCQ 8 (ageing analysis for doubtful debts: valuation).
- **Match four procedures to four assertions.** May 2026 MCQ 5, on receivables: ICAI's key pairs the confirmation requests with existence, the ageing review with valuation, the matching of invoices and despatch records around the reporting date with cut-off, and the remaining procedure (invoices selected from the ageing report and compared with supporting documents) with completeness. Place the pairs you are sure of first; the last one falls into place.
- **Name the procedure.** MTP May 2025 Series II Q1(c) (4 marks: inspection, observation, recalculation, analytical procedures). MTP September 2026 Series I MCQs 1 and 3 (reading published annual reports is inspection; confirmations are substantive). RTP January 2025 MCQs 2 and 4. MTP January 2026 Series II Q3(a) (5 marks: inspection, its reliability, and the assertions a physical inspection does not prove); MTP May 2026 Series II MCQ 13.
- **Descriptive "identify and explain".** MTP May 2025 Series II Q2(a) (5 marks, five procedures to five assertions; the suggested answer names each assertion and quotes its meaning in Chapter 5's words); its Q6(c) OR (4 marks, occurrence of purchases). MTP January 2026 Series I Q2(a) (5 marks): what the completeness assertion requires for inventory (stock with a third-party transporter included, consignment goods excluded) and the procedures to verify it.
:::

::: exam How the marks are earned
Name the assertion, then quote its meaning in ICAI's words ("Existence: assets, liabilities and equity interests exist"), then one line linking it to the facts. For procedures, name the procedure and give its definition. One-word answers lose most of the marks.
:::

::: trick Which way is the test pointing?
From the books to the evidence: "is what is recorded real?" (occurrence, existence). From the evidence to the books: "is everything real recorded?" (completeness). The Study Material's accounts payable example (SM 4.9) is this rule. Holds for tests of details; cut-off is tested at the year-end boundary in both directions. In a matching MCQ, settle the unambiguous pairs first (May 2026 MCQ 5, above).
:::

## Answer frame

### "Identify and explain the assertion" (1 mark a part)

1. **Name** the assertion in the Study Material's term (Chapter 4's list, or Chapter 5's where the question uses captions).
2. **Quote** its meaning: "Cut-off: transactions and events have been recorded in the correct accounting period."
3. **Apply**: one sentence on why the procedure tests it.

### "Distinguish tests of controls and substantive procedures"

| Point | Tests of controls | Substantive procedures |
|---|---|---|
| Designed to | Evaluate the operating effectiveness of controls | Detect material misstatements at the assertion level |
| Looks for | Performance of the control, and deviations | Misstatements in the assertion |
| Comprise | One kind of further audit procedure | Tests of details (transactions: vouching; balances: verification) and substantive analytical procedures |
| When | When required by the SAs or when the auditor has chosen to do so | For each material class of transactions, account balance and disclosure, irrespective of the assessed risks (SM 3.70) |

How the two are planned and combined is [[aud.risk.sa330|SA 330]].

## Common mistakes

::: mistake Hall of Shame: the van that was counted, so it must be ours
**Fix:** physical inspection gives reliable evidence of existence, not necessarily of ownership (rights and obligations) or amount (valuation); those need documents and calculations (SM 4.16).
:::

::: mistake Occurrence and completeness swapped
Occurrence asks whether *recorded* transactions happened; completeness asks whether *all* transactions were recorded. **Fix:** "no ghost employees on the payroll" is occurrence; "every employee's cost is accounted for" is completeness.
:::

::: mistake Reperformance called recalculation
**Fix:** recalculation checks arithmetic; reperformance independently redoes a procedure or control the entity performed (a reconciliation, an ageing).
:::

::: mistake Inquiry treated as proof
**Fix:** inquiry alone ordinarily does not give sufficient evidence of the absence of material misstatement or of the operating effectiveness of controls; corroborate it.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. At Tapri's Dewas warehouse, Lakshmi watches the count teams follow the count instructions, while Bunty counts 30 cartons himself and agrees them to the count sheets. Which statement is correct?
- [ ] Lakshmi is performing inspection and Bunty observation
- [x] Lakshmi is performing observation, which is limited to the point in time observed; Bunty's test counts are inspection of the inventory
- [ ] Both are inquiries, because the count teams explain their work
- [ ] Both procedures establish that Tapri owns the inventory counted
> Observation is looking at a process performed by others; physically examining an asset is inspection. Neither proves ownership.

Q: Which of the following are assertions about classes of transactions and events for the period? Select all that apply.
- [x] Occurrence
- [x] Cut-off
- [ ] Existence
- [x] Classification
> Existence is an assertion about account balances at the period end. The transaction assertions are occurrence, completeness, accuracy, cut-off and classification.

Q: Bunty asks the cashier whether cash is counted every evening, and she says yes. What follows?
- [ ] The control is operating effectively; inquiry is sufficient
- [x] Inquiry alone ordinarily does not provide sufficient evidence of operating effectiveness; it must be corroborated, for example by inspecting the count sheets or observing a count
- [ ] A written representation from the cashier completes the evidence
- [ ] Inquiry is not an audit procedure, so the reply is ignored
> Inquiry is a procedure, but on its own it ordinarily cannot prove that a control operated.

Q: Physically inspecting Tapri's 120 delivery vans gives reliable evidence of:
- [x] Their existence only
- [ ] Their existence and Tapri's ownership
- [ ] Their existence and valuation
- [ ] Existence, ownership and valuation
> Inspection of tangible assets gives evidence of existence, not necessarily of rights and obligations or valuation (SM 4.16).

Q: A confirmation received directly from a customer is LEAST likely to give evidence that the receivable:
- [ ] Exists
- [ ] Is a right of the company
- [x] Will be recovered in full
- [ ] Is agreed by the customer
> A confirmation shows the balance exists and is owed, not that it will be collected: recoverability is valuation (SM 4.123, 4.127).
:::

## Recap

- Assertions: representations by management, explicit or otherwise, embodied in the financial statements, used by the auditor to consider potential misstatements.
- Transactions: occurrence, completeness, accuracy, cut-off, classification. Balances: existence, rights and obligations, completeness, valuation and allocation. Disclosure: occurrence and rights and obligations, completeness, classification and understandability, accuracy and valuation.
- Chapter 5 captions: income statement (occurrence, completeness, cut-off, measurement, presentation and disclosure); balance sheet (existence, completeness, cut-off, valuation, rights and obligations, presentation and disclosure).
- Procedures: inspection, observation, external confirmation, recalculation, reperformance, analytical procedures, inquiry.
- Further audit procedures: tests of controls and substantive procedures (tests of details: transactions, balances; substantive analytical procedures).
- Inquiry alone ordinarily does not prove the absence of misstatement or that controls operated.
- Inspecting an asset proves existence, not necessarily ownership or value. (Seeing that he is six feet tall tells you nothing about the flat.)

## Flashcards

Q:: Define assertions.
A:: Representations by management, explicit or otherwise, that are embodied in the financial statements, as used by the auditor to consider the different types of potential misstatements that may occur.

Q:: Assertions about classes of transactions and events for the period?
A:: Occurrence, completeness, accuracy, cut-off and classification.

Q:: Assertions about account balances at the period end?
A:: Existence, rights and obligations, completeness, and valuation and allocation.

Q:: Assertions about presentation and disclosure?
A:: Occurrence and rights and obligations; completeness; classification and understandability; accuracy and valuation.

Q:: Occurrence assertion: meaning?
A:: Transactions and events that have been recorded have occurred and pertain to the entity.

Q:: Rights and obligations assertion: meaning?
A:: The entity holds or controls the rights to assets, and liabilities are the obligations of the entity.

Q:: Name the seven audit procedures in ICAI's order.
A:: Inspection, observation, external confirmation, recalculation, reperformance, analytical procedures, inquiry.

Q:: Reperformance: meaning, with an example?
A:: The auditor's independent execution of procedures or controls originally performed as part of the entity's internal control, e.g. re-performing the bank reconciliation or the ageing of receivables.

Q:: Does inquiry alone give sufficient evidence of the operating effectiveness of controls?
A:: No. Inquiry alone ordinarily does not provide sufficient audit evidence of the absence of a material misstatement at the assertion level, nor of the operating effectiveness of controls.

Q:: Inspection of a tangible asset gives evidence of which assertion, and not necessarily of which?
A:: Existence; not necessarily rights and obligations or valuation.

Q:: What is a test of controls?
A:: An audit procedure designed to evaluate the operating effectiveness of controls in preventing, or detecting and correcting, material misstatements at the assertion level.

Q:: Tests of details comprise what?
A:: Tests of transactions (vouching) and tests of balances (verification).
