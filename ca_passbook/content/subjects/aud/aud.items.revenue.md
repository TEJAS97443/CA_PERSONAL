---
id: aud.items.revenue
title: Audit of revenue and other income
minutes: 32
needs: aud.evid.assertions, aud.risk.sa315
tags: sales, revenue from operations, cut-off, occurrence, other income, interest on fixed deposits, dividend income, Schedule III
labs:
summary: How the auditor tests sales (occurrence, completeness, cut-off, measurement), builds a sales expectation, verifies interest, dividends and mutual fund gains, and checks Schedule III disclosure.
---

## In plain words

### The best March in Tapri's history

It is the first week of April 2026, and Kesar is delighted. His new "Chai Champions" distributor scheme, launched in time for the March wedding season, has made March the biggest month ever for masala premix.

> **Kesar:** Lakshmi-ji, ₹1.52 crore of premix in one month! Put that in your report.
> **Lakshmi:** Before anyone celebrates, Bunty: the March invoices, the transporters' delivery receipts, the scheme letters and every credit note issued in April.
> **Bunty:** *(already ticking)* Ma'am, the invoices all look perfect.
> **Lakshmi:** Invoices are Tapri's own paper, Bunty. They always look perfect.

Revenue is the number management most wants to be large, so it is where the auditor looks hardest. For every rupee of sales the auditor asks five questions, the **assertions** for income statement items (see [[aud.evid.assertions|financial statement assertions]]):

- Did the sale really happen, to a real customer? (**occurrence**)
- Has every sale been recorded? (**completeness**)
- Is it in the right year? (**cut-off**)
- Is it at the right amount, after discounts? (**measurement**)
- Is it shown under the right heading in the notes? (**presentation and disclosure**)

**Other income** (interest on fixed deposits, dividends, gains on mutual funds) is income from outside the main business. Its audit is calmer: the auditor recomputes it and agrees it to statements from the bank, the tax department and the mutual fund.

::: analogy The wedding caterer's bill
A caterer bills a family for 500 plates. The family checks that 500 guests actually ate (occurrence), that the sweets counter is billed too (completeness), that the sangeet's plates are not added to the reception bill of the next day (cut-off), that the rate per plate is the agreed one less the discount (measurement), and that the bill shows food, décor and service separately (presentation). The auditor reads Tapri's sales with the same suspicion, and Kesar is the caterer.
:::

::: key
In revenue the first danger is **overstatement**: sales that never happened, or that belong to the next year. So the auditor's sharpest tests are for occurrence and cut-off, and other income is verified by recomputing it and agreeing it to third-party records.
:::

## How it works

### 1. Why sales get extra attention

The sales and collections cycle is the set of processes that begins when a customer purchases goods or services and ends when the entity receives complete payment against the sales. Sales is one of the most important items in the financial statements, with a considerable effect on the profit generated and on closing stock; and **as per SA 315, the risk of material misstatement in case of revenue items is generally high** (SM 5.91). So the auditor tests sales transactions, and the internal controls over them, to ensure that the entity is not materially misstating its revenues or receivables (see [[aud.risk.sa315|SA 315]]).

### 2. The approach, in ICAI's order

::: steps
1. **Understand the organisation and its revenue centres**: the type of services or products, their demand, the major selling product or service, new product lines, discontinued products, major customers, and sales terms (credit or cash) (SM 5.92).
2. **Understand the management control (internal control) over sales**: whether segregation of duties exists, who checks the credit limit, who authorises sales orders, who raises the invoice, when and how goods are despatched or services provided, who collects and records amounts received from debtors, who ensures that risks and rewards pass to the customer, and how sales are recognised in the system (SM 5.92).
3. **Test the controls** to see how strong and reliable they are. Common controls: pre-numbered sales invoices, proper authority for approval of orders, execution of sales orders, authorisation of customer purchase orders above a limit, and authorisation of receivables write-offs. The auditor examines a random sample of customer purchase orders, invoices and customer statements (for example, that every number in a sequence is accounted for). Strong, effective controls let the auditor reduce substantive testing; deficiencies are communicated as per SA 265 (SM 5.92–5.93).
4. **Perform substantive procedures, which are a must**: substantive analytical procedures (sales trend analysis, comparison with the previous period, category-wise sales analysis and, most important of all, **building a sales expectation** and comparing it with the client's records), then tests of details for each assertion (SM 5.93).
:::

::: diagram The auditor's path through sales
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Understand entity and\nrevenue centres"}, {"id": "c", "kind": "process", "label": "Understand controls\nover sales"}, {"id": "t", "kind": "process", "label": "Test the controls"}, {"id": "d", "kind": "decision", "label": "Strong and\neffective?"}, {"id": "r", "kind": "process", "label": "Reduce\ntesting"}, {"id": "x", "kind": "process", "label": "Extend testing;\nreport"}, {"id": "a", "kind": "process", "label": "Build a sales\nexpectation"}, {"id": "v", "kind": "process", "label": "Tests of details\nby assertion"}, {"id": "e", "kind": "end", "label": "Conclude on revenue"}], "edges": [["s", "c"], ["c", "t"], ["t", "d"], ["d", "r", "yes"], ["d", "x", "no"], ["r", "a"], ["x", "a"], ["a", "v"], ["v", "e"]], "caption": "Controls decide how much substantive work is needed, never whether it is needed: substantive procedures on sales are a must (SM 5.93). Deficiencies found are reported as per SA 265."}
:::

### 3. Building a sales expectation

The auditor needs the sales prices over the year, the monthly average sales price per product or service and the discount policy, then multiplies: if product X sells at ₹10 on average and 1,500 units were sold in a month, expected sales are ₹15,000. Variances are discussed with the client (discounts, or sales wrongly booked), and the auditor must understand how sales discounts and sales returns are accounted for and how they affect gross sales (SM 5.93).

Bunty did this for Tapri's 1-kg masala premix box, average net price ₹240, using the boxes despatched as per the stock records:

::: diagram
{"type": "plot", "title": "Masala premix: recorded sales against the auditor's expectation", "w": 460, "h": 300, "x": [0.4, 12.6], "y": [0, 170], "xticks": [[1, "Apr"], [2, "May"], [3, "Jun"], [4, "Jul"], [5, "Aug"], [6, "Sep"], [7, "Oct"], [8, "Nov"], [9, "Dec"], [10, "Jan"], [11, "Feb"], [12, "Mar"]], "yticks": [0, 40, 80, 120, 160], "xlabel": "month of 2025-26", "ylabel": "sales (₹ lakh)", "legend": "outside", "series": [{"label": "recorded sales", "bars": true, "color": "a", "bw": 0.6, "pts": [[1, 98.4], [2, 94.8], [3, 86.4], [4, 92.4], [5, 96.0], [6, 105.6], [7, 147.0], [8, 124.8], [9, 112.8], [10, 108.0], [11, 103.2], [12, 152.4]]}, {"label": "expected: boxes despatched × ₹240", "color": "d", "dots": true, "pts": [[1, 98.4], [2, 94.8], [3, 86.4], [4, 92.4], [5, 96.0], [6, 105.6], [7, 146.4], [8, 124.8], [9, 112.8], [10, 108.0], [11, 103.2], [12, 110.4]]}], "caption": "Blue bars: sales recorded in the books; orange line: boxes despatched as per stock records × the average net price of ₹240. Every month agrees within ₹0.60 lakh except March, where recorded sales of ₹152.40 lakh exceed the expectation of ₹110.40 lakh by ₹42 lakh (38%)."}
:::

October's ₹0.60 lakh is explained: Kesar's Diwali gift edition (he launches a product every festival) sold above the average price. March's ₹42 lakh is not: recorded sales with no boxes behind them point at the occurrence and cut-off tests below. An analytical procedure raises the question; tests of details answer it (see [[aud.evid.sa520|SA 520]]).

### 4. Tests of details, assertion by assertion

The Study Material groups the procedures under the assertion they prove (SM 5.94–5.96). Learn them in this order.

**Occurrence: recorded sales represent goods shipped or services performed during the period.** Ensure revenue is not overstated:

- Check whether a single sales invoice is recorded twice, or a cancelled sales invoice is also recorded.
- Test check a few invoices with their entries in the sales journal.
- Obtain confirmation from a few customers to ensure the genuineness of sales transactions.
- Check whether any fictitious customers and sales have been recorded.
- Check whether any shipments were made without the consent and agreement of the customer, especially at the year end, to inflate sales.
- Check whether unearned revenue has been recorded as earned.
- Check whether any substantial uncertainty exists about collectability.
- Check whether customer obligations are contingent on other actions (financing, resale, etc.).

Then: review the **sequence of sales invoices**; review **journal entries for unusual transactions**; calculate the **ratio of sales returns to sales**, compare it with the previous year and enquire into the reasons; and check sales returns with the sales invoice, challan, credit note and stock register.

**Completeness: all sales made during the period were recorded, with no understatement or overstatement.**

- Perform **cut-off procedures**, so that revenue is recognised in the current period and sales were not tampered with towards the period end. ==Cut-off errors usually arise when revenue is recognised on the date the sales invoice is generated rather than the date the risks and rewards are transferred to the buyer==; the auditor must understand the specific cut-off risk of each engagement.
- Verify **credit notes issued after the period**: sales staff may book fictitious sales before the year end to meet targets and cancel them with a post-year-end credit note.
- **Trace from the shipping documents to the sales journal.**
- Check that quantities appear in the sales register, and reconcile total sales or goods despatched as per stock records, financial records and statutory records such as GST.
- Review GST returns and reconcile them with revenue in the statement of profit and loss; test the reasonability of GST by applying the applicable rate to gross sales and analyse any variance.

**Measurement: sales are measured as per the applicable accounting standards and correctly journalised, summarised and posted.**

- Trace a few transactions from inception to completion (**examination in depth**): from the sales order to the receipt of the receivable, checking every document and all incentives and discounts, as per the entity's revenue recognition policy.
- For export sales, ensure compliance with AS 11.
- Understand the client's operations and related GAAP issues, for example point-of-sale recognition against percentage of completion.
- Compare the rate of sales to related parties, and review them for collectability, proper authorisation, and whether they were reasonable and at arm's length (see [[aud.evid.sa550|SA 550]]).

### 5. Other income

Any income not linked to the entity's core business operations is generally classified as **other income**: for example, interest on surplus funds in fixed deposits (the entity not being a bank or financial institution), interest on loans to third parties or within the group, and returns on mutual fund investments (SM 5.97). Its recognition rules decide its audit:

| Item | Recognised (SM 5.97) | Audit procedure (SM 5.97–5.99) |
|---|---|---|
| Interest on fixed deposits | On a time proportion basis, on the amount outstanding at the applicable rate | List of deposits with rate and days; recompute; trace year-end deposits to bank confirmations; bank's confirmation of interest; reconcile with Form 26AS |
| Dividends | Only when (i) the right to receive payment is established; (ii) the economic benefits are probable; (iii) the amount can be measured reliably | Verify that it is recognised only when the right to receive payment is established |
| Gain or loss on mutual funds | On transfer of title from the entity; redemption price less carrying value | Obtain the mutual fund statement and trace the gain or loss in the books to it |

For fixed deposits, the five procedures in order: (1) obtain a listing of deposits opened during the period with the applicable rate and the number of days outstanding; (2) verify the arithmetical accuracy by recomputing (deposit × rate × days); (3) trace deposits outstanding at the period end to the direct confirmations from the banks; (4) obtain a confirmation of interest income from the bank and reconcile it to the entity's calculation; (5) obtain Form 26AS (tax withheld by the bank) and reconcile the interest shown in it to the calculation (SM 5.97–5.98).

## Formats and formulas

### The notes ICAI asks you to list

*Reproduce these lists from memory, in this order; each head is a mark in a "state the disclosure" question.*

**Revenue from operations** (Schedule III, Part II; SM 5.96–5.97):

| (A) Company other than a finance company | (B) Finance company |
|---|---|
| (a) Sale of products | (a) Interest |
| (b) Sale of services | (b) Other financial services |
| (ba) Grants or donations received (section 8 companies only) | |
| (c) Other operating revenues | |
| Less: (d) Excise duty | |

Revenue under each head is disclosed separately in the notes, to the extent applicable. The auditor also checks that brokerage and discount on sales, other than the usual trade discount, are disclosed, and that related party transactions are disclosed.

**Other income** shall be classified as (SM 5.99):

1. Interest income (in case of a company other than a finance company);
2. Dividend income;
3. Net gain or loss on sale of investments;
4. Other non-operating income (net of expenses directly attributable to such income).

**Undisclosed income** (Additional Information, SM 5.99): details of any transaction not recorded in the books that has been surrendered or disclosed as income during the year in tax assessments under the Income Tax Act, 1961 (search, survey or any other relevant provision), unless there is immunity for disclosure under any scheme; and whether the previously unrecorded income and related assets have been properly recorded in the books during the year.

### The arithmetic the auditor redoes

::: formula Sales expectation
$$\text{Expected sales} = \qquad \text{Units sold} \times \text{Average net price}$$
Units come from despatch or stock records; the price is the monthly average net price per unit, after the discount policy.
:::

::: formula Interest on a fixed deposit
$$\text{Interest} = \qquad \text{Deposit} \times \text{Rate} \times \frac{\text{Days outstanding}}{365}$$
Days outstanding: the days the deposit was held during the year.
:::

::: formula Gain or loss on redemption of mutual fund units
$$\text{Gain or loss} = \qquad \text{Redemption price} - \text{Carrying value}$$
Carrying value of the units redeemed; recognised only on transfer of title from the entity.
:::

::: formula Sales return ratio
$$\text{Sales return ratio} = \qquad \frac{\text{Sales returns}}{\text{Sales}} \times 100$$
Compared with the previous year; a sharp rise asks whether earlier sales were real.
:::

## Worked examples

::::: example The Chai Champions quarter
Iyer & Associates are auditing Tapri Tea Co. Ltd for 2025-26. Revenue from operations is ₹900 crore and overall materiality is ₹1.50 crore. Tapri's accounting policy recognises revenue when the risks and rewards of ownership pass to the buyer, net of discounts and incentives. Kesar's "Chai Champions" distributor scheme ran from 1 January to 31 March 2026. Bunty finds:

(i) A distributor whose purchases in the quarter exceed ₹1.50 crore earns a rebate of 6% on all its purchases of the quarter, settled by credit notes in April. Thirty-eight distributors qualified, with purchases in the quarter of ₹75 crore. Nothing has been accounted for at 31 March; Dev says the rebate "belongs to April, when the credit notes go out".

(ii) To open the Assam market, premix invoiced at ₹2.30 crore (cost ₹1.61 crore) was delivered on 26–31 March 2026 to four new distributors, under letters saying that they will pay only for what they resell by 30 June 2026 and may send back the rest. Their stock statements at 31 March show none of it resold. The ₹2.30 crore is in March sales.

(iii) Export sales of ₹3.40 crore to a Dubai retailer were shipped on 27 March 2026 on terms under which the risks and rewards pass on shipment. They are recorded at the exchange rate of the date of shipment, and the receivable is restated at the closing rate.

Required:

(a) Which assertion does each item test?

(b) State the audit procedures Iyer & Associates should perform on items (i) and (ii).

(c) Comment on the effect on the financial statements and, if management refuses to adjust, on the auditor's report.

:::: answer Model answer
**(a) Assertions.**

- (i) **Measurement**: sales must be measured as per the applicable accounting standards, taking into consideration all the incentives and discounts (SM 5.95–5.96).
- (ii) **Occurrence**: whether unearned revenue has been recorded as earned, and whether the customers' obligations are contingent on other actions such as resale (SM 5.94).
- (iii) **Cut-off and measurement**: whether the risks and rewards passed before the year end, and compliance with AS 11 for export sales (SM 5.95–5.96).

**(b) Procedures.** As per the Study Material's procedures for sales:

1. **Item (i).** Obtain the scheme circular and its approval; understand how the entity accounts for sales discounts and how they affect gross sales (SM 5.93); recompute each distributor's purchases in the quarter and the rebate from the sales ledger; trace a few transactions from the sales order to settlement, considering all incentives and discounts (examination in depth); trace the credit notes issued in April to the computation; and check that brokerage and discount on sales other than the usual trade discount are disclosed (SM 5.97).
2. **Item (ii).** Read the letters; obtain confirmations from the four distributors of the terms and of the stock they hold; check whether the shipments at the year end were made with the consent and agreement of the customers, whether their obligations are contingent on resale, and whether unearned revenue has been recorded as earned; review returns and credit notes after the year end; and, as for goods sent out on sale or return, verify that goods lying with the distributors at the year end are included in closing inventory (SM 5.94, 5.125).

::: diagram What the tests show
{"type": "table", "head": ["Item", "Finding", "Revenue (₹ crore)"], "rows": [["(i) Rebate", "Earned, not accounted", "4.50 over"], ["(ii) Assam", "Payment depends on resale", "2.30 over"], ["(iii) Dubai", "Risks passed on 27 March", "nil"], ["Revenue overstated", "", "6.80"]], "cells": {"0,1": "b", "1,1": "b", "3,2": "hl"}, "align": ["left", "left", "right"], "caption": "Rose cells: the reason each of the first two items misstates 2025-26 revenue; amber: the total, above overall materiality of ₹1.50 crore."}
:::

**(c) Effect.**

- (i) The distributors earned the rebate on purchases made by 31 March, so it reduces 2025-26 revenue whenever the credit notes are issued: 6% × ₹75 crore = ₹4.50 crore. Revenue from operations is overstated by ₹4.50 crore, and the amount due to the distributors (a liability, or a reduction of their receivable balances) is unrecorded.
- (ii) The distributors pay only for what they resell and may return the rest: in substance the goods are on sale or return, and the risks and rewards have not passed. Revenue and trade receivables are overstated by ₹2.30 crore, closing inventory is understated by the cost of ₹1.61 crore, and profit is overstated by ₹0.69 crore.
- (iii) The risks and rewards passed on 27 March, before the year end: correctly recorded, subject to the AS 11 checks.

Revenue from operations is overstated by ₹6.80 crore and profit before tax by ₹5.19 crore (₹4.50 crore + ₹0.69 crore), both above materiality of ₹1.50 crore. The auditor should ask management to correct the misstatements. If they are not corrected, they are material; but they are confined to revenue, receivables, inventory and the amount due to distributors, and are not a substantial proportion of the financial statements (₹6.80 crore is under 1% of revenue): not pervasive. The auditor should express a **qualified opinion** as per [[aud.report.sa705|SA 705]].
::::
:::::

:::: example Dev's fixed deposits
Dev Malhotra presents Tapri's "Other income" for 2025-26 as one figure of ₹1,17,65,000. His working shows:

| Deposit (₹) | Rate; days | In books (₹) |
|---|---|---|
| FD-1: 5,00,00,000 | 7.30%; 365 | 36,50,000 |
| FD-2: 3,00,00,000 | 6.57%; 182 | 19,71,000 |
| FD-3: 2,00,00,000 | 7.30%; 76 | 3,04,000 |

FD-1 was held all year, FD-2 was opened on 1 October 2025 and FD-3 on 15 January 2026; all three are outstanding at the year end. The working also includes:

- an interim dividend of Malwa Dairy Ltd, declared by its board on 10 February 2026 and received on 5 March 2026: ₹20,00,000 in books;
- a final dividend of Malwa Dairy Ltd, recommended by its board on 20 May 2026: ₹30,00,000 in books;
- a gain on mutual fund units redeemed on 24 March 2026 for ₹2,06,40,000, carrying value ₹1,98,00,000: ₹8,40,000 in books.

Required:

(a) Recompute other income and show its classification as per Schedule III.

(b) State the audit procedures for interest on fixed deposits.

::: answer Show the working
**Working note 1: interest on fixed deposits** (deposit × rate × days ÷ 365)

| Deposit | Computation | Interest (₹) |
|---|---|---|
| FD-1 | 5,00,00,000 × 7.30% × 365/365 | 36,50,000 |
| FD-2 | 3,00,00,000 × 6.57% × 182/365 | 9,82,800 |
| FD-3 | 2,00,00,000 × 7.30% × 76/365 | 3,04,000 |
| **Total** | | **49,36,800** |

FD-2 has been taken for a full year although it was outstanding for 182 days: interest is overstated by ₹19,71,000 − ₹9,82,800 = ₹9,88,200. Interest is recognised on a time proportion basis.

**Working note 2: dividends.** The interim dividend was declared during the year, so the right to receive it was established: ₹20,00,000 is correctly recognised. The final dividend was only recommended by Malwa's board on 20 May 2026; dividends are recommended by the board and declared by the shareholders, so at 31 March 2026 no right to receive payment existed. ₹30,00,000 is not income of 2025-26.

**Working note 3: mutual fund.** Title passed on 24 March 2026; gain = ₹2,06,40,000 − ₹1,98,00,000 = ₹8,40,000, correctly recorded.

**(a) Other income as per Schedule III**

| Head | ₹ |
|---|---|
| (a) Interest income | 49,36,800 |
| (b) Dividend income | 20,00,000 |
| (c) Net gain on sale of investments | 8,40,000 |
| **Other income** | **77,76,800** |

Other income in the books is overstated by ₹1,17,65,000 − ₹77,76,800 = ₹39,88,200, and showing it as one consolidated figure does not meet the classification Schedule III requires.

**(b) Procedures for interest on fixed deposits.** Obtain a listing of deposits opened during the period with the applicable rate and the number of days outstanding; recompute the interest (deposit × rate × days); trace deposits outstanding at the year end (here all three) to the direct confirmations from the banks; obtain a confirmation of interest income from each bank and reconcile it to the entity's calculation; and reconcile the interest shown in Form 26AS to the calculation. Here the bank confirmations and Form 26AS would show ₹49,36,800, exposing the error in FD-2.
:::
::::

:::: example Where did the scrap go?
Tapri's samosa factory sells scrap (empty oil tins, damaged cartons) to local dealers. Last year scrap was 3.2% of the 4,80,000 kg of packing material consumed and sold at ₹31 per kg. This year consumption is the same and the process unchanged, but recorded scrap is 1.9% of consumption, sold at ₹24 per kg, while dealers' market rates are steady.

Required: How will you vouch and verify the sale of scrap? Comment on the trends.

::: answer Model answer
**Vouching and verification of the sale of scrap** (SM 5.130):

1. Review the internal control as regards generation, storage and disposal of scrap.
2. Check whether the organisation maintains a reasonable record of the generation of scrap.
3. Analyse the raw material used, production and the generation pattern of scrap, and compare with the figures of the earlier year.
4. Check the rates at which scrap has been sold and compare them with the previous year.
5. Vouch sales with the invoices raised, advertisements for tender and rate contracts with scrap dealers.
6. Ensure a proper control procedure exists to identify scrap and good units, so that they are not mixed up and sold as scrap.
7. Make an overall assessment of the value realised from scrap as to its reasonableness.

**Comment on the trends.** At last year's yield and rate, scrap would be 15,360 kg (3.2% of 4,80,000 kg) worth ₹4,76,160; the books show 9,120 kg (1.9%) sold for ₹2,18,880. With the same consumption and process and steady market rates, both the fall in quantity and the fall in rate are unexplained. The auditor should obtain explanations from management, examine the scrap generation records, dealer contracts and tender papers, and consider whether part of the scrap sales is unrecorded, an indicator of possible fraud to be dealt with under the auditor's responsibilities relating to fraud.
:::
::::

## Under the hood

### Receipts that look like sales but are not (yet)

**Goods sent out on sale or return** (SM 5.125): (i) check that a separate memoranda record is maintained, the party being debited only after the goods are sold and the sales account credited; (ii) verify that the price of such goods is removed from the sales account and the receivables record, and that on each acceptance the party's account is debited and sales credited; (iii) ensure that goods whose approval period expired by the year end have been received back or the customers debited; (iv) confirm that goods with customers whose approval period had not expired are included in closing inventory.

**Goods sent on consignment** (SM 5.126–5.127): the consignee's account sales, a reconciliation of goods on hand with the pro forma invoices and account sales, a confirmation from the consignee at the balance sheet date, commission and expenses as per the agreement, and valuation of goods with the consignee at cost plus proportionate non-recurring expenses (or net realisable value, if lower), shown separately under inventories. The inventory side belongs to [[aud.items.current|the audit of inventories]].

**Receipt of capital subsidy** (SM 5.128): check the application for the claim (purpose and scheme), the grant documents and their conditions (whether for a specific asset or for a factory at a specific location), the entries for receipt, and compliance with AS 12, "Accounting for Government Grants".

### Two quieter corners

An entity's revenue policy may be point-of-sale or percentage of completion; the auditor must understand which applies before testing measurement (SM 5.96). And a finance company's revenue from operations is interest and other financial services: interest is its core business, not "other income".

## Exam angle

::: exam Where this topic appeared
In the ICAI documents read for this lesson (listed in the report), revenue and other income were examined in these ways:

- **Descriptive, 3 to 5 marks.** Interest on fixed deposits: MTP January 2026 Series II Q5(b) (5 marks, interest "significantly higher than the previous year" with no bank confirmations) and old-scheme November 2020 Q4(a) (4 marks). Fictitious sales, "revenue not overstated": MTP September 2025 Series I Q2(a) (5 marks) and RTP May 2026 Q14 (occurrence of revenue). Recognition of interest, dividend and mutual fund gains: old-scheme January 2021 Q4(c) (3 marks). Dividend income recognition and undisclosed income: September 2026 Q3(c) (2 + 2 marks; suggested answers not yet published). Sale of scrap: old-scheme May 2023 Q3(c) (3 marks). Goods on sale or return: old-scheme November 2020 Q4(d) (3 marks).
- **Identify the assertion, 1 mark each.** "Sales are recorded correctly in the books based on the invoices; discounts have been properly adjusted": measurement (January 2025 Q4(b)(iii)).
- **Case with a number.** MTP September 2024 Series II Q1(a) (5 marks): dividend and interest credited net of tax and shown as one "Other income" figure; the answer grosses them up and reclassifies them under Schedule III.
- **Multiple choice, 2 marks.** Revenue billed on 30 March but despatched on 2 April: defer to April (MTP September 2025 Series II MCQ 6). Revenue from operations of a test-centre company, with interest disclosed apart (MTP May 2024 Series I MCQ 1.4).
:::

::: trick Which way do you trace?
**Occurrence** starts from the books and goes out to the evidence (invoice to despatch, confirmation). **Completeness** starts from the evidence and comes into the books (shipping documents to the sales journal). Condition: this is the direction of testing; cut-off tests look both ways around the year end.
:::

## Answer frame

### "How will you verify sales / other income?"

1. **Open with the assertion** in the Study Material's words: "Recorded sales represent goods shipped or services performed during the period (occurrence)".
2. **List the procedures** under each assertion asked, in the Study Material's order (occurrence: duplicate or cancelled invoices, test check with the sales journal, confirmations, fictitious customers…).
3. **Apply them to the facts**: name the document the case points at (gate register, credit notes after the year end, Form 26AS).
4. **Close with disclosure** if the question allows: the Schedule III heads.

### A case question

1. **Relevant provision**: the procedure or recognition rule ("Dividends are recognised only when the right to receive payment is established…").
2. **Facts of the case**: dates, amounts, who did what.
3. **Analysis**: which assertion fails; compute the correct figure.
4. **Conclusion**: the correct treatment and, if material and uncorrected, the effect on the opinion.

### Three answers to "verify interest on fixed deposits" (5 marks)

::: cols
**Loses marks**

"Check the bank statements and the interest certificate."

One vague line; no recomputation, no confirmation, no 26AS.
---
**Passes**

"Obtain a list of FDs, recompute interest, get the bank's interest certificate."

Three of the five points, none applied to the case.
---
**Full marks**

All five points in order (listing with rate and days; recomputation; confirmation of year-end deposits; bank's confirmation of interest; Form 26AS), then a line applying them to the case (the deposits outstanding at the year end, the jump over last year).
:::

## Common mistakes

::: mistake Hall of Shame: the invoice that travelled faster than the truck
Treating the invoice date as the date of sale. **Fix:** revenue belongs to the period in which the risks and rewards pass to the buyer; compare the invoice date with the gate register, lorry receipts or delivery proof.
:::

::: mistake The dividend that arrived before it was declared
Booking a dividend recommended after the year end, or booking dividend net of tax deducted. **Fix:** recognise a dividend only when the right to receive payment is established, the benefits are probable and the amount is reliable; record it gross, the tax deducted being recoverable.
:::

::: mistake One line called "Other income"
Lumping interest, dividends and investment gains into one figure. **Fix:** Schedule III classifies other income as interest income, dividend income, net gain or loss on sale of investments, and other non-operating income (net of directly attributable expenses).
:::

::: mistake Stopping at the analytical procedure
"Sales are in line with expectations, so revenue is fine", or "March is 38% above expectation, so revenue is overstated". **Fix:** an analytical procedure points to where to look; the conclusion comes from the tests of details that follow.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Kulhad Crafts Ltd recognises revenue when the risks and rewards of ownership pass to the buyer. Its contract with Rangoli Stores says that they pass when the goods are unloaded at Rangoli's Guwahati warehouse. Clay cups invoiced at ₹18 lakh left Kulhad's factory on 28 March 2026 and were unloaded at Guwahati on 3 April 2026. Which of the following is correct for the 2025-26 accounts?
- [ ] Recognise ₹18 lakh in 2025-26, because the goods were invoiced and despatched before the year end
- [ ] Recognise ₹18 lakh in 2025-26 and disclose the date of delivery in the notes
- [ ] Recognise half in each year, because the goods were on the road across the year end
- [x] Recognise ₹18 lakh in 2026-27; at 31 March the cups are Kulhad's goods in transit, included in its closing inventory
> The contract ties the passing of risks and rewards to unloading, on 3 April, so the sale belongs to 2026-27. Neither the invoice date nor the despatch date decides it: recognising revenue on the date the invoice is generated rather than when the risks and rewards transfer is the cut-off error the Study Material warns about (SM 5.95).

Q: Tapri's deposit of ₹2,50,00,000 at 7.30% p.a. was outstanding for 146 days of 2025-26. What interest income (₹) should be recognised for the year? (Use a 365-day year.)
= 730000
> ₹2,50,00,000 × 7.30% × 146/365 = ₹7,30,000. Interest is recognised on a time proportion basis.

Q: An auditor traces a sample of lorry receipts and gate-out entries of March into the sales journal. Which assertion is this procedure chiefly designed to test?
- [ ] Occurrence
- [x] Completeness
- [ ] Measurement
- [ ] Presentation and disclosure
> Tracing from shipping documents to the sales journal tests whether every despatch has been recorded: completeness. Occurrence runs the other way, from recorded invoices out to evidence of shipment.

Q: Which of the following are conditions for recognising dividend income in the statement of profit and loss? Select all that apply.
- [x] The entity's right to receive payment of the dividend is established
- [x] It is probable that the economic benefits associated with the dividend will flow to the entity
- [x] The amount of the dividend can be measured reliably
- [ ] The dividend has been received in the entity's bank account
> All three conditions in the Study Material must hold. Receipt in the bank is not one of them: a dividend declared before the year end and paid after it is still income of the year.

Q: Tapri lets out the terrace of one café for advertising hoardings and earns ₹6 lakh, with ₹1 lakh of directly attributable maintenance. Under which head of "Other income" in Schedule III is it shown, and at what amount?
- [ ] Revenue from operations: sale of services, ₹6 lakh
- [ ] Other income: interest income, ₹5 lakh
- [x] Other income: other non-operating income (net of directly attributable expenses), ₹5 lakh
- [ ] Other income: other non-operating income, ₹6 lakh, with the expense under other expenses
> It is not Tapri's core business, so it is other income; the fourth head is "other non-operating income (net of expenses directly attributable to such income)": ₹6 lakh − ₹1 lakh = ₹5 lakh.
:::

## Recap

- Revenue: the risk of material misstatement is generally high (SA 315); the main fear is overstatement.
- Approach: understand the entity and revenue centres → understand and test controls → substantive analytical procedures (build a sales expectation: units × average price) → tests of details.
- Occurrence: duplicate or cancelled invoices, customer confirmations, fictitious customers, year-end shipments without consent, invoice sequence, unusual journals, sales return ratio.
- Completeness and cut-off: invoice date is not the sale date; check post-year-end credit notes; trace shipping documents to the sales journal; reconcile with stock records and GST returns. (Kesar's best March is only as good as the gate register.)
- Other income: FD interest on time proportion (recompute; bank confirmation; Form 26AS); dividends only when the right to receive is established; mutual fund gain on transfer of title.
- Schedule III: revenue from operations (products, services, grants for section 8 companies, other operating revenues, less excise duty); other income (interest, dividend, net gain on investments, other non-operating income net of direct expenses).

## Flashcards

Q:: Audit of sales: what does the occurrence assertion require?
A:: That recorded sales represent goods shipped or services performed during the period, so revenue is not overstated.

Q:: Audit of sales: list four checks the Study Material gives to ensure revenue is not overstated.
A:: Any of: an invoice recorded twice or a cancelled invoice recorded; test check invoices with the sales journal; confirmations from customers; fictitious customers and sales; year-end shipments without the customer's consent; unearned revenue recorded as earned; substantial uncertainty about collectability; customer obligations contingent on other actions.

Q:: Why do sales cut-off errors usually arise?
A:: Because revenue is recognised on the date the sales invoice is generated rather than the date the risks and rewards are transferred to the buyer.

Q:: Why does the auditor verify credit notes issued after the year end?
A:: Sales staff may book fictitious sales before the year end to meet targets and cancel them with a credit note after the year end.

Q:: What are substantive analytical procedures for sales?
A:: Sales trend analysis, comparison with the previous period, category-wise sales analysis and, most important, building a sales expectation (units × average price, after the discount policy) and comparing it with the client's records.

Q:: How is interest on fixed deposits recognised, and how does the auditor verify it?
A:: On a time proportion basis. Listing with rate and days; recompute; trace year-end deposits to bank confirmations; bank's confirmation of interest; reconcile with Form 26AS.

Q:: When is dividend income recognised in the statement of profit and loss?
A:: Only when the right to receive payment is established, it is probable that the economic benefits will flow to the entity, and the amount can be measured reliably.

Q:: When is a gain or loss on sale of mutual fund units recorded, and at what amount?
A:: On transfer of title from the entity; redemption price less carrying value of the investment.

Q:: Schedule III: the heads of revenue from operations for a company other than a finance company?
A:: (a) Sale of products; (b) sale of services; (ba) grants or donations received (section 8 companies only); (c) other operating revenues; less (d) excise duty.

Q:: Schedule III: how is other income classified?
A:: (a) Interest income (company other than a finance company); (b) dividend income; (c) net gain or loss on sale of investments; (d) other non-operating income (net of expenses directly attributable to such income).

Q:: Schedule III: what must be disclosed about undisclosed income?
A:: Transactions not recorded in the books but surrendered or disclosed as income in tax assessments (search, survey etc.), unless immune under a scheme, and whether the previously unrecorded income and related assets are now recorded in the books.
