---
id: aud.items.expenses
title: Audit of expenses
minutes: 34
needs: aud.evid.assertions, aud.items.revenue
tags: purchases, employee benefits expense, payroll, depreciation and amortisation, other expenses, vouching, three-way match, CSR disclosure
labs:
summary: How the auditor tests purchases, employee benefits, depreciation and other expenses: the controls, the assertion-wise procedures, the six vouching attributes and the Schedule III disclosures.
---

## In plain words

### Kesar's favourite ledger

Every company has one ledger its founder loves. At Tapri it is "Miscellaneous expenses".

> **Kesar:** Lakshmi-ji, why so many questions? Put all of it in miscellaneous. Sab adjust ho jayega.
> **Lakshmi:** Bunty, what is this ₹75,000 under "Repairs and maintenance"?
> **Bunty:** *(reading the bill this time, before ticking it)* Ma'am, it is a new air conditioner for Kesar-ji's cabin.
> **Lakshmi:** Then it is not a repair, and it is not miscellaneous either. It is an asset.

Tapri's statement of profit and loss has four big kinds of expense: **purchases** (tea leaves, milk powder, cardamom), **employee benefits** (salaries of staff in 40 cities, their provident fund, gratuity and bonus), **depreciation and amortisation** (kilns, fryers, the delivery app) and **other expenses** (café rent, power, insurance, legal fees, travel).

Revenue is usually at risk of being too big; an expense can go wrong in more ways. It can be **fake** (a vendor who does not exist, an employee nobody has met), **personal** (Kesar's family holiday billed as "travel"), from **another year**, **capital** dressed as revenue (the air conditioner), or under the **wrong head**. The auditor's tests are built to catch each of these.

::: analogy The flatmates' expense sheet
Four flatmates split costs, and one of them keeps the sheet. Before paying your share you check that each item was actually bought (a real bill), was bought this month, is for the flat and not for his girlfriend's birthday, is a running cost and not the new TV he will take with him, sits under the right column (groceries, not "misc"), and was agreed by everyone. Those are the six questions the Study Material asks of every expense voucher.
:::

::: key
Expenses are audited for **occurrence** (real, authorised, for the business), **cut-off** (this period) and **classification** (revenue not capital, the right head). Purchases and payroll lean on controls and analytical procedures; depreciation is recomputed; other expenses are vouched against six attributes.
:::

## How it works

### 1. Four captions, four worries

::: diagram Tapri's expenses and the auditor's main worry in each
{"type": "layers", "layers": [{"label": "Purchases", "note": "fictitious vendors; cut-off", "right": "GRN, 3-way match"}, {"label": "Employee benefits", "note": "fictitious employees; accruals", "right": "payroll reasonability"}, {"label": "Depreciation and amortisation", "note": "rate, residual value, start date", "right": "recompute"}, {"label": "Other expenses", "note": "personal, capital, wrong period", "right": "vouch six attributes"}]}
:::

For purchases and employee benefits the Study Material uses the same approach as for sales (see [[aud.items.revenue|the audit of revenue]]): understand the business and its control points, test the controls (if they are effective, the auditor can reduce substantive testing), examine a random sample of transactions, and perform substantive procedures, which are a must, including substantive analytical procedures that set an expectation and compare it with the client's records (SM 5.99–5.100, 5.104–5.105).

### 2. Purchases

The purchases and disbursement cycle begins when an order for goods or services is placed on the requirement of the production or user department and ends when the entity receives the product and pays the vendor in full (SM 5.99).

::: steps
1. **Understand** the production centres: the goods and services procured, sources (domestic or overseas), general availability, terms and conditions, major vendors, credit period, quality checks, purchase terms (credit or cash) (SM 5.99–5.100).
2. **Identify the control points**: segregation of duties; competitive quotes; a purchase committee that authorises the price; who issues and authorises purchase orders; how goods are received and acknowledged; who checks quality, quantity and specifications and prepares the **Goods Receipt Note (GRN)**; who approves the vendor invoice; whether a **2-way or 3-way match** (purchase order, GRN and vendor invoice) exists; how purchases are recognised in the system (SM 5.100).
3. **Test the controls**: competitive quotations for shortlisting vendors, numbered purchase orders, purchase order authorisation above a limit, GRN on receipt, quality inspection, 2-way or 3-way match, authorisation of purchase invoices, appropriate authority to recognise purchases. The sample is examined with purchase orders, GRNs, purchase invoices, the inward gate entry register and vendor reconciliations or statements (SM 5.100).
4. **Set a purchase expectation** in relation to the sales of the period: at a purchase price of ₹100 and 15,000 units received, expected purchases are ₹15,00,000; a variance leads to discounts received or price changes on some orders (SM 5.100).
:::

::: diagram The 3-way match behind a genuine purchase
{"type": "flow", "w": 420, "nodes": [{"id": "po", "kind": "start", "label": "Purchase order\nauthorised"}, {"id": "g", "kind": "process", "label": "Goods at gate:\ninward register"}, {"id": "q", "kind": "process", "label": "Quality check;\nGRN signed"}, {"id": "i", "kind": "io", "label": "Vendor invoice\n(original)"}, {"id": "m", "kind": "decision", "label": "PO, GRN and\ninvoice agree?"}, {"id": "x", "kind": "end", "label": "Investigate", "color": "bad"}, {"id": "a", "kind": "process", "label": "Approve\n(DoA)"}, {"id": "r", "kind": "end", "label": "Record purchase;\nstock updated", "color": "ok"}], "edges": [["po", "g"], ["g", "q"], ["q", "i"], ["i", "m"], ["m", "x", "no"], ["m", "a", "yes"], ["a", "r"]], "caption": "Each box is a document the auditor asks for when testing occurrence: the purchase order, the gate inward entry, the GRN, the original invoice and its approval as per the delegation of authority (DoA). Green: the purchase may be recorded; rose: a mismatch to investigate."}
:::

**Occurrence: recorded purchases represent goods actually received or services availed during the period** (SM 5.101):

- Whether any **fictitious vendors** have been booked or purchases recorded, by reviewing the vendor selection process and performing procedures to ensure the vendors exist.
- Whether the goods were received at the factory gate, with an entry in the **security gate inward register**.
- Whether quality inspection of goods was done.
- Whether a **GRN** was prepared and signed by an appropriate client personnel.
- Whether the purchase invoice was approved as per the delegation of authority and a 3-way or 2-way match was done.
- Whether the stock record has been updated by the stores personnel.

**Special considerations** (SM 5.101–5.102): the invoice should be the **original** (not a photocopy or carbon copy); it should be booked only once the risk and reward of ownership has been transferred (with specific consideration of terms such as F.O.B. and C.I.F.); it should be in the name of the entity (or the appropriate branch); input tax should be booked in the input tax ledger and agreed to the tax returns; purchases from related parties or allied concerns need approval of the Board (appropriate authority), sample verification and analytical procedures on price to confirm arm's length; the auditor should judge whether a purchase should be **capitalised or expensed**; and journal entries should be reviewed for unusual transactions.

**Completeness and measurement: all purchases were recorded, with no understatement or overstatement** (SM 5.102–5.104). In addition to the occurrence procedures:

- Perform a **cut-off test**: examine material inward records (say the last 5 transactions at the period end) to check that all corresponding invoices are entered in the purchases book.
- Ensure correct accounting of **goods in transit** as per the agreed terms on transfer of risk and reward.
- Obtain a **written representation** that all purchases of the year have been properly recorded.
- Perform analytical procedures on the overall reasonableness of purchase quantity and price: **consumption analysis** (raw material consumed as per the manufacturing account compared with previous years and closing stock), **stock composition analysis** (raw materials as a percentage of total stock, compared with the previous year), **ratios** (creditors turnover and stock turnover against previous years), and a review of the **quantitative reconciliation** of closing stock with opening stock, purchases and consumption.

### 3. Employee benefits expense

==Employee benefits expenses, commonly called payroll expenses, represent the aggregate sum an entity pays to its employees for their labour or efforts, along with associated expenses== such as perquisites and benefits, post-employment benefits (gratuity, superannuation, leave encashment, provident fund contribution) and expenses on their hiring, welfare and training. In many industries it is the biggest expense (SM 5.104). Payroll documents themselves are covered in [[cma.emp.payroll|attendance and payroll (Paper 4)]].

The auditor tests the controls around the payment process (attendance records, employee master, authorisation and approval of monthly payroll processing and disbursement, computation of deductions such as payroll taxes, accrual of gratuity, leave encashment and bonus), examines a random sample with appointment letters, appraisal letters, attendance records, HR policies and the employee master, and performs substantive analytical procedures: monthly expense reasonability, comparison with the previous period, and an expectation compared with the business operations and the industry trend (SM 5.104–5.105).

The procedures, in ICAI's order (SM 5.105–5.107):

1. Understand the process of capturing attendance. Against the risk of **fictitious employees**, meet employees in person on a sample basis, or ask payroll to share the bank details or identity proofs of a sample of employees.
2. Obtain the list of employees at the period end with a **monthly movement** split between new hires, leavers and continuing employees.
3. For a random sample of **new hires**, check from the appointment letter that the first and later months' salary was processed as per the agreed terms.
4. For a random sample of **resigned employees**, check the full and final computation: all dues, including gratuity and leave encashment, paid, and the employee's acknowledgement obtained.
5. From the 12 monthly salary registers compile a **payroll reasonability**: average salary per employee per month, compared with the previous year and the preceding month; variances may come from annual increments, a senior employee joining or leaving, or a bonus pay-out.
6. Verify that **accruals or provisions** have been made for all employee benefits and obligations such as bonus, gratuity and leave encashment.
7. Where **PF and ESI** apply, compile a reasonability by applying the rate to the basic wages, compare with the books and analyse variances; check the monthly challans to see that each month's liability was deposited within the timelines.
8. Perform analytical procedures such as **production per employee** (units produced per employee against previous years and industry trends), asking management to explain significant variations.

### 4. Depreciation and amortisation

**Depreciation** is the systematic allocation of the depreciable value of an item of PPE over its useful life; **amortisation** is the systematic allocation of the depreciable amount of an intangible asset over its useful life (SM 5.107). The auditor considers these attributes (SM 5.107–5.108):

- the entity's accounting policy for depreciation and amortisation, and whether it is as per the Companies Act, 2013 and the applicable accounting standards;
- whether the policy is applied consistently year on year, with any change adequately disclosed;
- whether depreciation is calculated after adjusting the **residual value** from the cost;
- whether the charges are valid, accurately calculated and recorded, and recorded in the appropriate period;
- whether each part of an item of PPE with a cost significant in relation to the total is **depreciated separately** (for example the airframe and engines of an aircraft), and with the most appropriate method for each component.

The procedures (SM 5.108–5.110):

1. Understand the entity's process of charging depreciation and amortisation.
2. Obtain the **fixed asset register**. There is a risk of capitalising revenue expenses to raise profit, or charging capital expenditure to revenue to reduce it: check the nature of assets. There is a risk of fake assets: physically verify at least the material ones. Obtain the list of additions and deletions with their approvals.
3. For a sample selected on materiality, verify the rates and the calculations; obtain management's list of components.
4. Ensure intangibles such as patents, goodwill and copyrights are properly amortised.
5. Ensure depreciation is charged from the date the asset is **ready to use**, not from the date of actual usage: depreciation begins when the asset is available for use, that is, in the location and condition necessary for it to be capable of operating in the manner intended by management.
6. Ensure depreciation on the revalued amount is properly accounted from the revaluation reserve.
7. For depreciation as per the Income-tax Act, 1961, tally additions with those as per the Companies Act, 2013 and the opening WDV with the tax audit schedule of the preceding assessment year.
8. Recompute the year's depreciation; ensure charges follow the useful lives, residual values are verified, and changes in useful lives are applied **prospectively**.

The assets themselves belong to [[aud.items.ppe|the audit of PPE and intangibles]].

### 5. Other expenses

Rent, power and fuel, repairs and maintenance, insurance, travelling, legal and professional and miscellaneous expenses are essential and incidental to running the business. The auditor may analyse monthly trends for expenses like rent and power and fuel, but generally prefers to **vouch** other expenses to verify these six attributes (SM 5.110–5.111):

::: diagram Vouching an expense: the six attributes
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "An expense voucher"}, {"id": "q1", "kind": "decision", "label": "This period?"}, {"id": "n1", "kind": "end", "label": "Wrong period", "color": "bad"}, {"id": "q2", "kind": "decision", "label": "Revenue, not\ncapital?"}, {"id": "n2", "kind": "end", "label": "Capitalise", "color": "bad"}, {"id": "q3", "kind": "decision", "label": "Valid\nsupport?"}, {"id": "n3", "kind": "end", "label": "Get evidence", "color": "bad"}, {"id": "q4", "kind": "decision", "label": "Correct head?"}, {"id": "n4", "kind": "end", "label": "Reclassify", "color": "bad"}, {"id": "q5", "kind": "decision", "label": "Authorised\nas per DoA?"}, {"id": "n5", "kind": "end", "label": "Investigate", "color": "bad"}, {"id": "q6", "kind": "decision", "label": "For the\nbusiness?"}, {"id": "n6", "kind": "end", "label": "Personal", "color": "bad"}, {"id": "ok", "kind": "end", "label": "Accept", "color": "ok"}], "edges": [["s", "q1"], ["q1", "n1", "no"], ["q1", "q2", "yes"], ["q2", "n2", "no"], ["q2", "q3", "yes"], ["q3", "n3", "no"], ["q3", "q4", "yes"], ["q4", "n4", "no"], ["q4", "q5", "yes"], ["q5", "n5", "no"], ["q5", "q6", "yes"], ["q6", "n6", "no"], ["q6", "ok", "yes"]], "caption": "The six attributes in the Study Material's order: current period, revenue not capital, valid supporting documents (travel tickets, insurance policy, third-party invoice), correct expense head, authorised as per the delegation of authority (DoA) matrix, business and not personal. Rose: the voucher fails that attribute; green: it passes all six."}
:::

The procedures by expense (SM 5.111–5.113):

| Expense | What the auditor does |
|---|---|
| Rent | Month-wise schedule with the rent agreements; recorded for all 12 months at the agreed amount; the **escalation clause**, to see if rent was required to be recorded on a straight-line basis; agreement in the entity's name, for premises used in its business |
| Power and fuel | Month-wise schedule with power bills, all 12 months; month-wise units consumed × rate, checking each bill's arithmetic; units consumed linked to finished goods produced, with reasons for variances in monthly trends |
| Insurance | Summary of policies with their validity period; expense correctly split between prepaid and expense for the period, by number of days |
| Legal and professional | Month-wise and consultant-wise summary; monthly retainers recorded for all 12 months; vouch a sample of non-recurring items; be cautious, as legal expenses **may highlight a dispute** for which no provision has been made and which was not discussed with the auditor |
| Travel, repairs, printing and stationery, miscellaneous | Vouch a sample for the six attributes; where possible, prepare a monthly summary and compare trends |

Finally, analytical procedures such as **expenditure per unit of production**, compared with previous years and industry trends, with reasons from management for significant variations.

## Formats and formulas

### The disclosures to verify

*Reproduce these lists in this order: "state the disclosures" questions give a mark a head.*

| Caption | Disclosure the auditor ensures (SM 5.104, 5.107, 5.110, 5.113) |
|---|---|
| Purchases (Schedule III, Part II) | Purchases of stock-in-trade specifically disclosed; changes in inventories of finished goods, stock-in-trade and work-in-progress specifically disclosed; related party transactions disclosed in the notes |
| Employee benefits expense (Schedule III, Part II) | Showing separately (i) salaries and wages, (ii) contribution to provident and other funds, (iii) expense on Employee Stock Option Scheme (ESOP) and Employee Stock Purchase Plan (ESPP), (iv) staff welfare expenses |
| Depreciation and amortisation | Accounting policy; useful lives of assets as per Schedule II to the Companies Act, 2013; residual value; depreciation method |
| Other expenses | Classified under rent; insurance; power and fuel; repairs and maintenance (building, plant and machinery, others); legal and professional; printing and stationery; travel expenses; miscellaneous expenses |

**Corporate Social Responsibility** (Additional Information, for a company covered under section 135; SM 5.113–5.114):

- (a) amount required to be spent by the company during the year;
- (b) amount of expenditure incurred;
- (c) shortfall at the end of the year;
- (d) total of previous years' shortfall;
- (e) reason for shortfall;
- (f) nature of CSR activities;
- (g) details of related party transactions, for example a contribution to a trust controlled by the company in relation to CSR expenditure;
- (h) where a provision is made with respect to a liability incurred by entering into a contractual obligation, the movements in the provision during the year shown separately.

**Crypto currency or virtual currency** (Additional Information; SM 5.114): (a) profit or loss on transactions involving it; (b) amount held at the reporting date; (c) deposits or advances from any person for trading or investing in it.

::: warning Version-sensitive
CSR and Schedule III requirements are stated as the Study Material gives them. Verify against the Study Material and Statutory Update for your attempt.
:::

### The arithmetic the auditor redoes

::: formula Payroll reasonability
$$\text{Average salary} = \qquad \frac{\text{Salary expense for the month}}{\text{Employees on the payroll}}$$
Per employee per month, compared with the previous year and the preceding month.
:::

::: formula PF (or ESI) reasonability
$$\text{Expected contribution} = \qquad \text{Basic wages} \times \text{Applicable rate}$$
The rate is the one applicable to the entity, as given in the question.
:::

::: formula Depreciation, straight-line method
$$\text{Annual depreciation} = \qquad \frac{\text{Cost} - \text{Residual value}}{\text{Useful life}}$$
Charged from the date the asset is available for use.
:::

::: formula Insurance expense for the period
$$\text{Expense} = \qquad \text{Premium} \times \frac{\text{Days of cover in the period}}{\text{Days of cover in the policy}}$$
The rest of the premium is prepaid.
:::

## Worked examples

::::: example The payroll that grew faster than the staff
Tapri's kulhad café division had an average of 1,200 employees in 2024-25 and a salary expense of ₹57,60,00,000. In 2025-26 the average headcount is 1,248 and the salary expense ₹71,88,48,000. HR confirms an annual increment of 8% for all staff and no change in pay structure. Bunty also finds 46 employee IDs, each paid ₹45,000 a month for all 12 months, that do not appear in the HR employee master. Basic wages are ₹28,00,00,000 and the PF contribution recorded is ₹3,10,00,000; take the contribution rate as 12% of basic wages.

Required:

(a) Prepare a payroll reasonability and comment.

(b) Which assertion do the 46 IDs affect?

(c) State the further audit procedures.

:::: answer Model answer
**(a) Payroll reasonability**

::: diagram Average salary per employee per month
{"type": "table", "head": ["Particulars", "2024-25", "2025-26"], "rows": [["Salary expense (₹)", "57,60,00,000", "71,88,48,000"], ["Average headcount", "1,200", "1,248"], ["Average per employee per month (₹)", "40,000", "48,000"], ["Expected at 8% increment (₹)", "", "43,200"], ["Expected expense: 43,200 × 1,248 × 12 (₹)", "", "64,69,63,200"], ["Unexplained excess (₹)", "", "7,18,84,800"]], "cells": {"5,2": "b"}, "align": ["left", "right", "right"], "caption": "Headcount rose 4% but the salary expense 24.8%; the average salary rose 20% against an 8% increment. Rose: the excess that needs explanation."}
:::

The 46 IDs account for 46 × ₹45,000 × 12 = ₹2,48,40,000 of the excess; the remaining ₹4,70,44,800 is still unexplained (other unauthorised revisions, bonuses or labour subcontracting recorded as salaries, or errors). PF: expected ₹28,00,00,000 × 12% = ₹3,36,00,000 against ₹3,10,00,000 recorded, a shortfall of ₹26,00,000.

**(b) Assertion.** Payments to IDs that are not in the employee master raise doubt over **occurrence**: employee benefit expense must have been incurred in respect of personnel employed by the entity and must not include the cost of any unauthorised personnel.

**(c) Further procedures.** As per the Study Material, the auditor should: understand the attendance process and, against the risk of fictitious employees, meet a sample of employees in person and obtain bank details and identity proofs for the 46 IDs; obtain the list of employees with the monthly movement of new hires, leavers and continuing staff; check the salary of a sample of new hires with their appointment letters and the full and final settlements of a sample of leavers; analyse the monthly salary registers month by month to locate when the excess arose; verify accruals for bonus, gratuity and leave encashment; recompute PF and ESI on basic wages and verify the monthly challans and their timeliness; and perform a production-per-employee analysis. Payments to non-existent employees may indicate fraud, to be communicated and reported as the Standards require.
::::
:::::

:::: example Kesar's miscellaneous drawer
Bunty vouches five items in Tapri's other expenses for 2025-26:

(i) ₹75,000 for a new air conditioner in Kesar's cabin, under "Repairs and maintenance".

(ii) ₹2,40,000 under "Travel": Kesar's family holiday in Goa.

(iii) Insurance premium of ₹14,60,000 paid on 1 January 2026 for cover up to 31 December 2026, fully charged as expense.

(iv) Rent of the Bhopal café: a three-year lease from 1 April 2025 at ₹2,00,000 a month in year 1, rising 10% a year; ₹24,00,000 charged. Tapri's accounting policy records lease rent on a straight-line basis over the lease term.

(v) ₹3,50,000 paid to counsel defending a consumer case filed by a customer scalded at a café; no provision has been made and the case was not mentioned to the auditor.

Required: Comment on each item, stating the attribute it affects and the correct treatment.

::: answer Model answer
While vouching other expenses the auditor verifies whether the expenditure pertained to the current period, qualified as revenue and not capital expenditure, had valid supporting documents, was classified under the correct head, was authorised as per the delegation of authority matrix, and related to the entity's business and not personal expenditure (SM 5.111).

**(i)** An air conditioner is an asset, not a repair: the expenditure does not qualify as revenue expenditure. It should be capitalised as PPE and depreciated.

**(ii)** A family holiday is personal expenditure, not related to Tapri's business. It should not be charged as Tapri's travel expense; the auditor should examine its authorisation and take the matter up with management and those charged with governance.

**(iii)** Cover in 2025-26 is 1 January to 31 March 2026, 90 days of 365. Expense = ₹14,60,000 × 90/365 = ₹3,60,000; prepaid insurance = ₹11,00,000. Charging the full premium overstates the expense by ₹11,00,000: the current period attribute fails.

**(iv)** Rent over the lease: ₹2,00,000, ₹2,20,000 and ₹2,42,000 a month, an average of ₹2,20,666.67. The straight-line charge for 2025-26 is 12 × ₹2,20,666.67 = ₹26,48,000; ₹24,00,000 was charged, so rent is understated by ₹2,48,000. The escalation clause required a straight-line charge under Tapri's policy.

**(v)** The fee itself is a valid legal expense, but it highlights a dispute for which no provision has been made and which was not brought to the auditor's attention. The auditor should enquire of management, obtain the legal expert's assessment of the likelihood of a liability (probable, possible or remote), and consider whether a provision or a contingent liability disclosure is required (see [[aud.items.liabilities|provisions]] and [[aud.items.contingent|contingent liabilities]]).
:::
::::

:::: example The fryer that waited for orders
Tapri installed a new samosa fryer line costing ₹1,46,00,000. Trials were completed and the line was ready for use on 1 May 2025, but for want of orders it went into actual operation only on 1 November 2025. Tapri charged depreciation from 1 November 2025. Useful life is 10 years, residual value ₹6,00,000, method straight-line; depreciation is computed in months.

Required: Is the treatment proper? Compute the correct depreciation for 2025-26.

::: answer Model answer
**Provision.** Depreciation of an asset begins when it is available for use, that is, when it is in the location and condition necessary for it to be capable of operating in the manner intended by management. It is charged from the date the asset is ready for use and not from the date of actual usage (SM 5.109). The auditor also verifies that depreciation is calculated after adjusting the residual value.

**Facts and computation.** The line was ready for use on 1 May 2025, so 11 months fall in 2025-26.

| Particulars | ₹ |
|---|---|
| Cost | 1,46,00,000 |
| Less: residual value | 6,00,000 |
| Depreciable amount | 1,40,00,000 |
| Annual depreciation (÷ 10 years) | 14,00,000 |
| Correct charge: 11 months (May to March) | 12,83,333 |
| Charged: 5 months (November to March) | 5,83,333 |
| **Depreciation understated** | **7,00,000** |

**Conclusion.** The treatment is not proper. Depreciation of ₹12,83,333 should be charged for 2025-26; depreciation is understated, and profit and the carrying amount of PPE overstated, by ₹7,00,000.
:::
::::

## Under the hood

### Three classic "vouch" questions

**Foreign travel expenses** (SM 5.127): examine the travelling allowance bills (details of the tour and of the expenses); verify that the tour programme was authorised by the competent authority; check the bills with air tickets, travel agents' and hotel bills against the internal entitlement rules, and that they are properly passed; see that a tour report accompanies the bill and that its purpose conforms to the authorisation; check Reserve Bank of India permission, if necessary, for the foreign exchange; foreign exchange spent is disclosed as per Schedule III and AS 11.

**Advertisement expenses** (SM 5.129–5.130): verify the agency's bills against the contracted rates; see that the advertisement relates to the client's business; inspect the agency's receipt; ascertain whether the expenditure is revenue or capital and recorded properly; ascertain the period covered, carrying any prepaid amount to the balance sheet; see that all outstanding bills are provided for.

**Material and wages on construction** (SM 5.124): material and wages incurred on constructing a building are capital expenditure under AS 10, added to the cost of the building, not expensed.

### The other half of payroll

The PF, ESI and TDS payable at the year end, and the reporting of statutory dues under CARO 2020, are verified with the liabilities (see [[aud.items.liabilities|trade payables and other liabilities]] and [[aud.report.caro|CARO 2020]]).

## Exam angle

::: exam Where this topic appeared
In the ICAI documents read for this lesson (listed in the report):

- **Descriptive, 3 to 5 marks.** Occurrence of purchases, "any five points": MTP May 2026 Series I Q2(a) (5 marks). Employee benefit expense procedures, "any five points": MTP May 2026 Series I Q5(b) (5 marks; the answer adds a detailed variance analysis where the expense has risen). Analytical procedures for purchase quantity and price: May 2024 Q4(d) (3 marks) and MTP September 2025 Series II Q5(c) (4 marks). Rent expense: MTP September 2025 Series II Q6(b) (5 marks). Depreciation attributes for an aircraft with a single rate and an undisclosed change in amortisation method: MTP January 2026 Series I Q6(b) (5 marks). CSR disclosures, "any four such matters": May 2025 Q6(c) (4 marks, an internal choice).
- **Capital charged to revenue as a misstatement**: machinery parts that extend useful life charged to repairs, January 2026 Q4(a) (1 + 4 marks).
- **Multiple choice, 2 marks.** Trend analysis of a 43% salary rise, fictitious employees, and occurrence against completeness of employee benefits: MTP January 2026 Series II MCQs 1–5. Bifurcating employee benefits into salaries, PF, ESOP and staff welfare: the **disclosure** assertion (September 2024 MCQ 2). Depreciation "from the date of actual usage" as the incorrect statement (May 2025 MCQ 8). An air conditioner under repairs: the revenue-not-capital attribute (MTP May 2026 Series I MCQ 7). A director's foreign travel: bills in the company's name and business purpose (MTP January 2026 Series I MCQ 5).
- **Identify the assertion, 1 mark.** "Employee benefit expenses do not include the cost of any unauthorised personnel": occurrence (January 2025 Q4(b)(i)).
:::

::: trick The vouching mantra: "Period, Capital, Paper, Head, Boss, Business"
This period? Revenue, not capital? Valid paper? Right head? Authorised by the right boss (delegation of authority)? For the business, not personal? Condition: it covers the Study Material's six attributes for other expenses; purchases and payroll have their own procedure lists.
:::

## Answer frame

### "Explain the audit procedures for [purchases / employee benefits / rent]"

1. **Name the assertion** where the question does ("to verify the occurrence of purchases").
2. **List the Study Material's procedures in its order**, one line each, with the document named (gate inward register, GRN, appointment letter, rent agreement).
3. **Apply to the case**: the weak controls, the increase, the escalation clause.
4. **Conclude**: if the evidence is satisfactory the assertion is addressed; otherwise the reporting consequences.

### A "comment on the treatment" case

1. **Provision**: the attribute or rule (six attributes; ready for use; straight-line rent under the policy).
2. **Facts**: the item and its amount.
3. **Analysis**: which attribute fails; compute the correct figure.
4. **Conclusion**: the correct treatment and the misstatement.

## Common mistakes

::: mistake Hall of Shame: Bunty's tick on the air conditioner
Ticking a bill because it exists, without asking what it bought. **Fix:** a valid document is one attribute of six; "revenue, not capital" and "for the business" are separate questions.
:::

::: mistake Depreciation from the day the machine got busy
Charging depreciation from actual use. **Fix:** depreciation begins when the asset is available for use, even if orders arrive later.
:::

::: mistake Occurrence and completeness swapped
Calling "IDs not in the employee master" a completeness problem. **Fix:** occurrence asks whether recorded expense is real and relates to the entity's personnel (overstatement); completeness asks whether all genuine expense has been recorded (understatement).
:::

::: mistake Legal fees vouched and forgotten
Vouching a legal bill and moving on. **Fix:** legal expenses may reveal a dispute with no provision; follow it into provisions and contingent liabilities.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. While vouching Ujjain Kulhad Works Pvt Ltd's expenses, the auditor finds a laptop costing ₹85,000 for the accounts manager recorded under "Printing and stationery". Which of the following is correct?
- [ ] The current-period attribute is affected; the laptop was bought this year, so no adjustment is needed
- [x] The revenue-not-capital attribute is affected; the laptop should be capitalised
- [ ] The valid-document attribute is affected; the invoice should be in the manager's name
- [ ] Only the correct-head attribute is affected; reclassify it to "Repairs and maintenance"
> A laptop gives benefits over several years: it is capital expenditure, recorded as PPE and depreciated. Moving it to another expense head would still leave it in the profit and loss account.

Q: Tapri paid an insurance premium of ₹7,30,000 on 1 December 2025 for one year's cover (365 days). What is the insurance expense (₹) for the year ended 31 March 2026? (Count days of cover from 1 December 2025 to 31 March 2026.)
= 242000
> Cover in 2025-26: 31 + 31 + 28 + 31 = 121 days. ₹7,30,000 × 121/365 = ₹2,42,000; the remaining ₹4,88,000 is prepaid.

Q: Salary payments are found to employee IDs that are not in the employee master. Which assertion for employee benefit expense is chiefly in doubt?
- [x] Occurrence
- [ ] Completeness
- [ ] Cut-off
- [ ] Presentation and disclosure
> Occurrence requires that the expense relates to personnel employed by the entity and includes no cost of unauthorised personnel. Completeness is the opposite worry: genuine expense left out.

Q: Which of the following are procedures the Study Material lists for the occurrence of purchases? Select all that apply.
- [x] Whether the goods were received at the factory gate, with an entry in the security gate inward register
- [x] Whether a goods receipt note was prepared and signed by an appropriate client personnel
- [x] Whether the purchase invoice was approved as per the delegation of authority and a 3-way or 2-way match done
- [ ] Examining the last 5 inward transactions at the period end to check that their invoices are in the purchases book
> The last option is the cut-off test, listed under completeness: it starts from the goods and looks for the invoice. Occurrence starts from the recorded purchase and looks for the goods.

Q: A machine was ready for use on 1 June 2025 but first used on 1 September 2025. From which date should depreciation be charged?
- [x] 1 June 2025, when it was available for use
- [ ] 1 September 2025, when it was first used
- [ ] 1 April 2025, the beginning of the year of purchase
- [ ] 31 March 2026, so that the first year carries no charge
> Depreciation begins when the asset is in the location and condition necessary for it to operate as intended by management, not when it is actually used.
:::

## Recap

- Purchases: control points (quotes, PO, GRN, 2-way or 3-way match, invoice approval); occurrence: fictitious vendors, gate inward register, quality check, signed GRN, approval and match, stock record; original invoice, risk and reward, input tax, related parties at arm's length, capitalise or expense.
- Purchases completeness: cut-off on the last 5 inward transactions, goods in transit, written representation; analytics: consumption, stock composition, ratios, quantitative reconciliation.
- Employee benefits: meet sample employees against fictitious employees; monthly movement; new hires and leavers; average salary per employee per month; accruals for bonus, gratuity, leave encashment; PF and ESI reasonability and challans; production per employee.
- Depreciation: residual value deducted; significant components separately; from the date available for use; on revalued amount from revaluation reserve; change in useful life prospectively.
- Other expenses, six attributes: current period, revenue not capital, valid documents, correct head, authorised as per DoA, business not personal. (Kesar's air conditioner fails the second.)
- Disclosures: employee benefits in four parts; other expenses under eight heads; CSR (a) to (h); crypto (a) to (c).

## Flashcards

Q:: Audit of purchases: what is a 3-way match?
A:: A tally of the purchase order, the goods receipt note and the vendor invoice before the invoice is approved and recorded.

Q:: Audit of purchases: list the occurrence checks the Study Material gives.
A:: Fictitious vendors (vendor selection and existence); goods received at the gate with a security gate inward entry; quality inspection; GRN prepared and signed; invoice approved per delegation of authority with 3-way or 2-way match; stock record updated.

Q:: Which analytical procedures check the overall reasonableness of purchase quantity and price?
A:: Consumption analysis, stock composition analysis, ratios (creditors turnover and stock turnover), and review of the quantitative reconciliation of closing stock with opening stock, purchases and consumption.

Q:: How does the auditor address the risk of fictitious employees?
A:: Understand the attendance process; meet employees in person on a sample basis; ask payroll for bank details or identity proofs of a sample of employees.

Q:: What is a monthly payroll reasonability?
A:: Average salary per employee per month from the 12 salary registers, compared with the previous year and the preceding month, with variances explained (increments, senior joiners or leavers, bonus pay-outs).

Q:: When does depreciation of an asset begin?
A:: When it is available for use: in the location and condition necessary for it to operate in the manner intended by management, not from the date of actual usage.

Q:: List the six attributes the auditor vouches for other expenses.
A:: Current period; revenue not capital; valid supporting documents; correct expense head; authorised as per the delegation of authority matrix; business and not personal.

Q:: Why should the auditor be cautious while vouching legal expenses?
A:: They may highlight a dispute for which no provision has been made and which was not discussed with the auditor.

Q:: Schedule III: how is employee benefits expense shown?
A:: Showing separately (i) salaries and wages, (ii) contribution to provident and other funds, (iii) expense on ESOP and ESPP, (iv) staff welfare expenses.

Q:: Schedule III: what CSR details are disclosed?
A:: Amount required to be spent; amount spent; shortfall at year end; total of previous years' shortfall; reason for shortfall; nature of CSR activities; related party transactions; movements in any provision for a contractual obligation.

Q:: Audit of rent expense: what does the auditor check?
A:: A month-wise schedule with the agreements; all 12 months at the agreed amount; the escalation clause for straight-line recording; agreement in the entity's name for premises used in its business.
