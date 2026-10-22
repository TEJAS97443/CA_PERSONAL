---
id: cma.sys.recon
title: Reconciling cost and financial profit
minutes: 36
needs: cma.sys.ledgers, cma.oh.underover
tags: reconciliation statement, memorandum reconciliation account, cost and financial profit, notional cost, under-absorption, over-absorption, stock valuation
labs: recon
summary: Why the cost books and the financial books show different profits, the four causes ICAI lists, and how to reconcile them item by item in a reconciliation statement or a Memorandum Reconciliation Account.
---

## In plain words

### Two profits for one year

At the year-end review Kesar holds two sheets of paper: Ritu's Costing Profit and Loss Account and Dev's financial statements. Both are for the premix division, and they show two different profits.

> **Kesar:** Same division, same premix, same year. Put the difference in miscellaneous expenses and let us go for lunch.
> **Ritu:** Miscellaneous is where differences go to hide, Kesar-ji. Give me ten minutes and I will show you every rupee of it.
> **Dev:** And the present value of your lunch falls with every minute we argue.

The two profits differ because, under a [[cma.sys.ledgers|non-integrated system]], the two sets of books record some things differently:

1. **Items only in the financial books**: interest on the term loan, income tax, donations, dividends received, a profit or loss on selling an old delivery van. They are not costs or revenues of making premix, so the cost books ignore them.
2. **Items only in the cost books**: **notional** charges that nobody pays, like rent for Tapri's own building or interest on the owners' capital, added so that product costs are comparable.
3. **Items treated differently**: depreciation by a different method, or stores issued at LIFO in the cost books.
4. **Different stock values**: the financial books value stock at cost or market price, whichever is lower; the cost books at cost.

On top of these, the cost books charge overheads at predetermined rates. If they absorbed less than was actually spent (**under-absorption**), the costing profit is higher than the real one; if more (**over-absorption**), it is lower.

A **reconciliation** starts from one profit and adds or subtracts each difference until it reaches the other. Nothing is changed in either set of books: the statement only explains the gap.

::: analogy The bank passbook
You did this in Class 11. Your cash book says ₹12,000 in the bank; the passbook says ₹10,500. Neither is wrong: a cheque has not been cleared, the bank charged a fee you have not recorded. You list each item and add or subtract it until the two agree. ICAI says the reconciliation of cost and financial profit "is similar to those which are followed for reconciling bank balance as per bank ledger with the balance as shown in bank statement" (SM 7.31).
:::

::: key
Each difference changes one profit and not the other. For every item ask: did it make the financial profit higher or lower than the costing profit? Starting from the costing profit, add what made the financial profit higher and subtract what made it lower.
:::

## How it works

### Why reconcile, and how

"When the cost and financial accounts are kept separately, it is imperative that these should be reconciled to make the cost accounts reliable" (SM 7.31). For this, the financial accounts should analyse expenses the same way as the cost accounts, so that the differences can be located. The differences are collected in a **Memorandum Reconciliation Account** (or a reconciliation statement): items charged in one set of accounts but not in the other, or charged in excess, are added to or subtracted from the profit of one set until it equals the other (SM 7.31).

**Procedure for reconciliation** (SM 7.33), in three steps:

1. Ascertainment of profit as per financial accounts.
2. Ascertainment of profit as per cost accounts.
3. Reconciliation of both the profits.

**When it can be avoided** (SM 7.33): when the cost and financial accounts are integrated, there is no need for a separate reconciliation statement; integration means that the same set of accounts fulfils the requirement of both.

### The causes of difference, in ICAI's order

::: diagram Causes of differences in financial and cost accounts (SM 7.31–7.32)
{"type": "nest", "w": 420, "root": {"title": "Why the two profits differ", "mono": false, "children": [{"title": "1. Financial accounts only", "mono": false, "color": "d", "children": [{"title": "(a) Purely financial expenses", "mono": false, "lines": ["interest on loans; share and debenture issue costs", "capital losses; loss on sale of assets", "income tax, donations, subscriptions", "share transfer office"]}, {"title": "(b) Purely financial income", "mono": false, "lines": ["interest and dividends received", "profit on sale of assets", "transfer fees; rent receivable"]}]}, {"title": "2. Cost accounts only (notional)", "mono": false, "color": "a", "lines": ["rent of own premises; interest on capital", "proprietor's salary; depreciation on", "fully depreciated assets"]}, {"title": "3. Treated differently", "mono": false, "color": "c", "lines": ["LIFO in cost accounts; other depreciation methods"]}, {"title": "4. Varying basis of valuation", "mono": false, "color": "f", "lines": ["financial: cost or market, lower; cost: at cost"]}]}, "caption": "The four causes in ICAI's order. The illustrations add one more source of difference: under- and over-absorbed overheads, because the cost books charge overheads at predetermined rates and the financial books at actual."}
:::

In ICAI's words (SM 7.31–7.32):

1. **Items included in financial accounts only.** (a) *Purely financial expenses*: (i) interest on loans or bank mortgages; (ii) expenses and discounts on issue of shares, debentures etc.; (iii) other capital losses, i.e. loss by fire not covered by insurance etc.; (iv) losses on the sales of fixed assets and investments; (v) income tax, donations, subscriptions; (vi) expenses of the company's share transfer office, if any. (b) *Purely financial income*: (i) interest received on bank deposits, loans and investments; (ii) dividends received; (iii) profits on the sale of fixed assets and investments; (iv) transfer fee received; (v) rent receivables.
2. **Items included in cost accounts only (notional expenses)**: (i) charges in lieu of rent where premises are owned; (ii) interest on capital at notional figure though not incurred; (iii) salary for the proprietor at notional figure though not incurred; (iv) notional depreciation on the assets fully depreciated for which book value is nil.
3. **Items whose treatment is different in the two sets of accounts**: cost accounting serves management's decisions and control, financial accounting conforms to external reporting requirements. LIFO is not recommended by Accounting Standards for financial reporting but may be adopted in cost accounts ([[cma.mat.issues|pricing material issues]]); cost accounts may use a different method of depreciation.
4. **Varying basis of valuation**: in financial accounts stock is valued at cost or market price, whichever is lower; in cost accounts only at cost.

### Which way each item moves

Starting from the **profit as per cost accounts**, going to the profit as per financial accounts:

| Item | Financial profit is | From cost profit |
|---|---|---|
| Expense or loss in financial accounts only (interest paid, income tax, donations, write-offs, loss on sale of assets) | Lower | Less |
| Income in financial accounts only (interest and dividends received, profit on sale of assets, transfer fees) | Higher | Add |
| Notional cost charged in cost accounts only (rent of own premises, interest on capital) | Higher | Add |
| Overheads under-absorbed in cost accounts (actual exceeded the charge) | Lower | Less |
| Overheads over-absorbed in cost accounts | Higher | Add |
| Depreciation (or any expense) over-charged in cost accounts | Higher | Add |
| Closing stock over-valued in cost accounts | Lower | Less |
| Closing stock under-valued in cost accounts | Higher | Add |
| Opening stock over-valued in cost accounts | Higher | Add |
| Opening stock under-valued in cost accounts | Lower | Less |
| Excess material consumption shown in cost accounts | Higher | Add |

Starting from the **profit as per financial accounts**, every sign reverses. A **loss** is a negative profit: "add" reduces it, "less" increases it (May 2026 Q1(c): net loss as per cost accounts ₹4,20,000; add ₹2,10,000; less ₹2,50,000; net loss as per financial accounts ₹4,60,000).

This is not the marginal-versus-absorption reconciliation of [[cma.mc.absorb|marginal and absorption costing]], which explains a difference in stock valuation between two costing methods: here two sets of books are compared.

::: lab recon {"layout":"cost","costProfit":1250000,"items":[["Works overheads (absorbed vs actual)","E",840000,905000],["Notional rent of the owned factory","E",120000,0],["Interest on bank loan","E",0,72000],["Closing stock of premix","CS",465000,440000]]}
Step through four of Tapri's items: each caption names why the two profits differ, and so whether the item is added or deducted.
:::

## Formats and formulas

*Reproduce both layouts from memory. Use the one the question names; when it only says "reconcile", ICAI's answers use the statement (SM Illustrations 6 to 8).*

**Reconciliation statement** (SM 7.35–7.36)

| Particulars | ₹ | ₹ |
|---|---:|---:|
| **Profit as per cost accounts** | | xxx |
| Add: Overheads over-absorbed in cost accounts | xxx | |
| Add: Income in financial accounts only | xxx | |
| Add: Notional expenses charged in cost accounts | xxx | xxx |
| | | xxx |
| Less: Overheads under-absorbed in cost accounts | xxx | |
| Less: Expenses in financial accounts only | xxx | |
| Less: Over-valuation of closing stock in cost accounts | xxx | (xxx) |
| **Profit as per financial accounts** | | **xxx** |

**Memorandum Reconciliation Account**, starting from a costing profit: the costing profit and the additions are credited, the deductions debited, and the financial profit is the balancing figure on the debit side. Starting from a costing **loss**, the loss is debited and the financial result is the balancing figure on the credit side (SM 7.61):

::: cols Memorandum Reconciliation Account (costing profit as base)
| Dr. | ₹ |
|---|---:|
| To Deductions (under-absorption, financial-only expenses, over-valued closing stock) | xxx |
| To Net profit as per financial accounts (balancing figure) | xxx |
| **Total** | **xxx** |
---
| Cr. | ₹ |
|---|---:|
| By Net profit as per cost accounts | xxx |
| By Additions (over-absorption, financial-only income, notional costs) | xxx |
| **Total** | **xxx** |
:::

::: lab recon {"layout":"memo","costProfit":1250000,"items":[["Works overheads (absorbed vs actual)","E",840000,905000],["Notional rent of the owned factory","E",120000,0],["Interest on bank loan","E",0,72000],["Closing stock of premix","CS",465000,440000]]}
The same four items as a Memorandum Reconciliation Account: watch each one land on its side, with the financial profit as the balancing figure.
:::

::: formula The identity behind every reconciliation
$$\text{Financial profit} \qquad = \text{Cost profit} + \text{Additions} - \text{Deductions}$$
Additions are the items that make the financial profit higher than the cost profit; deductions, those that make it lower. A balancing item (one missing difference) is found by solving this identity for it (May 2025 Q4(a)).
:::

## Worked examples

:::: example The premix division's two books, side by side
Dev's financial accounts show a net profit of ₹12,00,000 for Tapri's premix division for 2025-26. Ritu's cost accounts are not yet closed, but she has the figures each set of books used for the items on which they differ:

| Item | Cost accounts (₹) | Financial accounts (₹) |
|---|---:|---:|
| Raw materials consumed (cost books issue at LIFO, financial books at FIFO) | 48,60,000 | 47,90,000 |
| Works overheads (absorbed in cost; actual in financial) | 18,40,000 | 19,15,000 |
| Administration overheads (absorbed in cost; actual in financial) | 6,20,000 | 6,02,000 |
| Depreciation of plant | 4,20,000 | 3,80,000 |
| Rent of the division's own building | 2,40,000 | — |
| Interest on term loan | — | 1,10,000 |
| Interest received on fixed deposits | — | 36,000 |
| Opening finished stock | 5,40,000 | 5,10,000 |
| Closing finished stock (financial: lower of cost and net realisable value) | 7,25,000 | 6,90,000 |

Everything else is the same in both books.

**Required:**

(i) Prepare a statement reconciling the two profits, starting from the profit as per financial accounts, and find the profit as per cost accounts.

(ii) Explain why the materials item appears at all, when both books record the same purchases.

::: answer Show the working
**(i) Statement of reconciliation of profit as per financial accounts with profit as per cost accounts**

For each item: did it make the *cost* profit higher or lower than the financial profit? Higher: add. Lower: deduct.

| Particulars | ₹ | ₹ |
|---|---:|---:|
| **Net profit as per financial accounts** | | **12,00,000** |
| Add: Works overheads under-absorbed in cost accounts (19,15,000 − 18,40,000) | 75,000 | |
| Interest on term loan (financial accounts only) | 1,10,000 | |
| Closing stock valued higher in cost accounts (7,25,000 − 6,90,000) | 35,000 | 2,20,000 |
| | | 14,20,000 |
| Less: Materials consumed higher in cost accounts (48,60,000 − 47,90,000) | 70,000 | |
| Administration overheads over-absorbed in cost accounts (6,20,000 − 6,02,000) | 18,000 | |
| Depreciation charged higher in cost accounts (4,20,000 − 3,80,000) | 40,000 | |
| Notional rent of own building (cost accounts only) | 2,40,000 | |
| Interest received on fixed deposits (financial accounts only) | 36,000 | |
| Opening stock valued higher in cost accounts (5,40,000 − 5,10,000) | 30,000 | (4,34,000) |
| **Net profit as per cost accounts** | | **9,86,000** |

**(ii) The materials item** is an item "treated differently" (SM 7.32): both books bought the same materials, but the cost books priced issues at LIFO, which management may adopt for cost accounting though the Accounting Standards do not accept it for financial reporting (SM 7.32). In a period of rising prices LIFO charges the latest, dearer purchases to production, so the cost books show ₹70,000 more consumed and ₹70,000 less in closing raw-material stock; the costing profit is lower by that amount.

Check by the stock items: a higher closing stock raises a profit, so the cost books' extra ₹35,000 makes the costing profit higher (add); a higher opening stock lowers a profit, so their extra ₹30,000 makes it lower (deduct).
:::
::::

::::: example Mehra Kulhad Works: both profits from one year's records
Kesar's cousin Rohit Mehra runs Mehra Kulhad Works, a proprietary firm that supplies Tapri with kulhads. Its financial records for 2025-26:

| Particulars | ₹ |
|---|---:|
| Sales (4,00,000 kulhads at ₹4.50) | 18,00,000 |
| Clay and glaze consumed | 5,60,000 |
| Direct wages | 3,20,000 |
| Factory overheads | 3,90,000 |
| Administration overheads (all related to production) | 1,10,000 |
| Selling and distribution overheads | 1,30,000 |
| Bank charges and interest on overdraft | 24,000 |
| Rent received for sub-letting part of the godown | 36,000 |
| Closing work-in-process | 40,000 |

There was no opening stock. 4,40,000 kulhads were made; the 40,000 unsold include 8,000 of a discontinued design that can be sold only at ₹1.50 each, and the financial books value closing finished stock at the lower of cost and net realisable value. The cost records absorb factory overheads at ₹90 a kiln hour (4,000 kiln hours were worked), administration overheads at 10% of works cost and selling and distribution overheads at ₹0.30 a kulhad sold; they also charge a notional salary of ₹1,80,000 for Rohit's own work as general administration. Work-in-process is valued at the same amount in both books.

**Required:**

(i) Prepare a cost sheet and find the profit as per the cost records.

(ii) Prepare the profit and loss account as per the financial records.

(iii) Reconcile the two profits.

:::: answer Show the working
**(i) Cost sheet** (output 4,40,000 kulhads; sold 4,00,000)

| Particulars | ₹ |
|---|---:|
| Clay and glaze consumed | 5,60,000 |
| Direct wages | 3,20,000 |
| **Prime cost** | **8,80,000** |
| Add: Factory overheads (4,000 kiln hours × ₹90) | 3,60,000 |
| **Gross works cost** | **12,40,000** |
| Less: Closing work-in-process | (40,000) |
| **Works cost** | **12,00,000** |
| Add: Administration overheads (10% of works cost) | 1,20,000 |
| **Cost of production (₹3 a kulhad)** | **13,20,000** |
| Less: Closing finished stock (40,000 × ₹3) | (1,20,000) |
| **Cost of goods sold** | **12,00,000** |
| Add: Selling and distribution (4,00,000 × ₹0.30) | 1,20,000 |
| Add: Notional salary of the proprietor | 1,80,000 |
| **Cost of sales** | **15,00,000** |
| **Profit** | **3,00,000** |
| **Sales** | **18,00,000** |

**(ii) Profit and loss account**

Closing finished stock in the financial books = 32,000 × ₹3 + 8,000 × ₹1.50 = ₹96,000 + ₹12,000 = ₹1,08,000.

::: cols Profit & Loss Account (financial records)
| Dr. | ₹ |
|---|---:|
| To Clay and glaze consumed | 5,60,000 |
| To Direct wages | 3,20,000 |
| To Factory overheads | 3,90,000 |
| To Administration overheads | 1,10,000 |
| To Selling & distribution overheads | 1,30,000 |
| To Bank charges and interest | 24,000 |
| To Net profit | 4,50,000 |
| **Total** | **19,84,000** |
---
| Cr. | ₹ |
|---|---:|
| By Sales | 18,00,000 |
| By Closing stock: finished goods | 1,08,000 |
| By Closing stock: work-in-process | 40,000 |
| By Rent received | 36,000 |
| **Total** | **19,84,000** |
:::

**(iii) Statement of reconciliation**

| Particulars | ₹ | ₹ |
|---|---:|---:|
| **Profit as per cost records** | | **3,00,000** |
| Add: Administration overheads over-absorbed (1,20,000 − 1,10,000) | 10,000 | |
| Notional salary of the proprietor (cost records only) | 1,80,000 | |
| Rent received (financial records only) | 36,000 | 2,26,000 |
| | | 5,26,000 |
| Less: Factory overheads under-absorbed (3,90,000 − 3,60,000) | 30,000 | |
| Selling and distribution under-absorbed (1,30,000 − 1,20,000) | 10,000 | |
| Bank charges and interest (financial records only) | 24,000 | |
| Closing stock valued higher in cost records (1,20,000 − 1,08,000) | 12,000 | (76,000) |
| **Profit as per financial records** | | **4,50,000** |

A proprietor's notional salary is one of ICAI's items "included in cost accounts only" (SM 7.32): Rohit's financial profit includes the reward for his own work, while his cost sheet charges it so that the kulhad's cost is comparable with a company that pays a manager.
::::
:::::

::::: example Tapri Cold Chain: a costing profit that became a loss
Tapri Cold Chain Pvt Ltd, Tapri's cold-chain subsidiary, shows a net profit of ₹1,20,000 in its cost accounts for the year. A scrutiny of both sets of books reveals:

| Particulars | ₹ |
|---|---:|
| Depreciation of reefer trucks: the cost accounts recover ₹6 per km for the 1,50,000 km run; the financial accounts charge 20% on the trucks' written-down value of ₹50,00,000 | |
| Operating overheads over-recovered in cost accounts | 18,000 |
| Penalty paid to a hotel chain for late deliveries | 45,000 |
| Interest on vehicle loans | 96,000 |
| Profit on sale of an old reefer truck | 30,000 |
| Notional interest on capital charged in cost accounts | 60,000 |
| Closing stock of fuel and spares: cost accounts 62,000; financial accounts (lower of cost and net realisable value) 58,000 | |

**Required:**

(i) Calculate the depreciation difference.

(ii) Prepare a Memorandum Reconciliation Account and find the result as per the financial accounts.

:::: answer Show the working
**(i) Depreciation.** Cost accounts: 1,50,000 km × ₹6 = ₹9,00,000. Financial accounts: 20% × ₹50,00,000 = ₹10,00,000. Depreciation is under-recovered in the cost accounts by ₹1,00,000: a different method of depreciation in the two books (SM 7.32).

**(ii) Memorandum Reconciliation Account**

::: cols Memorandum Reconciliation Account
| Dr. | ₹ |
|---|---:|
| To Depreciation under-recovered in cost accounts | 1,00,000 |
| To Penalty for late deliveries (financial accounts only) | 45,000 |
| To Interest on vehicle loans (financial accounts only) | 96,000 |
| To Closing stock over-valued in cost accounts (62,000 − 58,000) | 4,000 |
| **Total** | **2,45,000** |
---
| Cr. | ₹ |
|---|---:|
| By Net profit as per cost accounts | 1,20,000 |
| By Operating overheads over-recovered in cost accounts | 18,000 |
| By Profit on sale of reefer truck (financial accounts only) | 30,000 |
| By Notional interest on capital (cost accounts only) | 60,000 |
| By Net loss as per financial accounts (balancing figure) | 17,000 |
| **Total** | **2,45,000** |
:::

The financial accounts show a **net loss of ₹17,000**. The deductions (₹2,45,000) exceed the costing profit and the additions (₹2,28,000), so the balancing figure falls on the credit side: a loss, not a profit. Check: ₹1,20,000 + ₹1,08,000 − ₹2,45,000 = −₹17,000.

A penalty is not a cost (SM 6.9), and interest on loans is a purely financial charge (SM 7.31), so the cost accounts rightly leave both out; together with the depreciation that the per-km rate under-recovered, they turn the costing profit into a financial loss.
::::
:::::

## Under the hood

### Under- or over-absorbed? Read the account, not the label

In SM Illustration 7 (SM 7.36–7.39), the Overhead Control A/c is debited with ₹1,43,000 of overheads incurred and credited with ₹1,20,000 absorbed into WIP: the ₹23,000 balance carried down is overhead incurred but not absorbed, that is, **under-absorbed**. The reconciliation then adds it to the financial loss of ₹3,000 to reach the costing profit of ₹20,000, which is right for an under-absorption (the cost books charged less, so their profit is higher). The statement's line calls it "overheads over absorbed"; the figures fit only the under-absorbed reading. Work out the label from the account: incurred > absorbed means under-absorbed.

::: lab recon {"layout":"fin","finProfit":1208000,"items":[["Works overheads (absorbed vs actual)","E",840000,905000],["Notional rent of the owned factory","E",120000,0],["Interest on bank loan","E",0,72000],["Closing stock of premix","CS",465000,440000]]}
Start from the financial profit instead: the same four items, every sign reversed, and each caption says why.
:::

### Notional items in the cost books

The cost ledger can carry notional costs because it is separate from the financial books ([[cma.sys.ledgers|non-integrated accounts]]); ICAI's MCQ asks which item is included in cost accounts, and the answer is notional rent (SM 7.45). Donations, transfers to reserves and rent receivable belong to the financial books only.

### Normal capacity absorption as a cause

When fixed overheads are absorbed on normal capacity and actual output is lower, the cost books under-charge them, and each under-charge is deducted from the costing profit (SM Practical Problem 4, answer at 7.59–7.60; January 2026 Q4(b)). The same arithmetic is the [[cma.oh.underover|under-absorption of overheads]] seen from the reconciliation side.

## Exam angle

::: exam How ICAI asked this, May 2024 to September 2026
In the documents read for this lesson, reconciliation was asked in 13 questions, including 7 of the 8 past papers from May 2024 to September 2026 (September 2025 asked the ledgers instead):

- **Statement from a list of differences**: May 2024 Q3(b), 7 marks (from cost profit, plus "when is reconciliation not required"); September 2024 Q1(b), 5 marks (from financial profit to cost profit); May 2025 Q4(a), 8 marks (from a cost loss, with a balancing item, "excess of material consumption in cost accounts", and closing stock at ₹41,000 in cost against market ₹80 × 500 units); May 2026 Q1(c), 4 marks (net loss as base, then the financial loss); September 2026 Q3(a): from cost profit, "maintaining the serial order given above" (answers not yet published).
- **Both profits from raw data**: January 2026 Q4(b), 7 marks: cost sheet with fixed overheads absorbed on normal capacity, then the statement; MTP May 2026 Series II Q3(b), 8 marks: both profits with opening finished stock at ₹125 a unit in cost accounts and an abnormal inventory loss excluded from costs, then the statement.
- **Memorandum Reconciliation Account**: MTP January 2026 Series I Q3(b), 5 marks (loss base); MTP January 2026 Series II Q1(a), 5 marks (loss base, opening and closing stock both valued differently); MTP May 2026 Series I Q1(b), 5 marks (the same data again).
- **Theory**: January 2025 Q6(a), 5 marks (3 + 2): the three steps and when reconciliation can be avoided; MTP May 2024 Series II Q4(c), 2 marks: when is it not required; old-scheme November 2022 Q6(b): classify items as cost accounts or financial accounts.
:::

::: exam The traps
- "Notional rent of own premises charged in cost accounts" is **added** to the costing profit to reach the financial profit (May 2024); starting from the financial profit it is deducted (September 2024).
- Stock "valued at ₹41,000 in cost accounts whereas market price ₹80 per unit" for 500 units (May 2025): the financial books take ₹40,000, so cost over-values by ₹1,000: deduct.
- Read the base: "taking net loss as per cost accounts as base" (May 2025), "to arrive at net profit/loss as per cost accounts" (September 2024: start from financial profit, reverse every sign).
- ICAI's MCQ: costing loss ₹5,600 with administrative overhead under-absorbed ₹600 gives a financial loss of ₹6,200 (SM 7.45).
:::

::: trick The "who got poorer" test
For every item ask: which book shows the lower profit because of it? If it is the financial book (an expense only Dev records, an overhead Ritu under-charged, closing stock Ritu valued higher), the item is deducted from the cost profit. If it is the cost book (a notional charge, an over-absorption, closing stock Ritu valued lower, an income only Dev records), it is added. Conditions: the base is the profit as per cost accounts (from the financial profit, reverse it), and opening stock works the other way round: opening stock Ritu valued higher makes the cost book poorer.
:::

## Answer frame

### Theory questions, in ICAI's order

- **Why is reconciliation necessary?** When cost and financial accounts are kept separately, they must be reconciled to make the cost accounts reliable; the financial accounts should analyse expenses as the cost accounts do, so that differences and their reasons can be located; the differences are collected in a Memorandum Reconciliation Account (SM 7.31).
- **Reasons for disagreement** (or "list the financial expenses not included in cost"): the four causes, with ICAI's sub-lists (SM 7.31–7.32).
- **Procedure and when it can be avoided** (January 2025, 3 + 2 marks): the three steps; then integrated accounts, where the same set of accounts fulfils both requirements (SM 7.33).

### A numerical answer

1. Heading: "Statement of Reconciliation of profit as per cost accounts and financial accounts" (or the account, if asked).
2. Start from the base the question names, with its sign.
3. "Add:" items with a working in brackets for every computed difference (₹19,15,000 − ₹18,40,000); subtotal.
4. "Less:" items, the same way; total in brackets.
5. End on the other profit, labelled, and check it against the figure given.

::: cols
**Loses marks**

A list of items with plus and minus signs and a final figure, no labels, no workings.

The examiner cannot see why the stock item was deducted.
---
**Passes**

The statement with Add and Less, but "Depreciation 1,60,000" and "1,45,000" both entered as separate items.

Half the depreciation logic is wrong.
---
**Full marks**

Base labelled; each item named with "(cost accounts only)", "under-absorbed", "over-valued in cost accounts"; computed differences shown; subtotals; final profit labelled and matching.
:::

## Common mistakes

::: mistake Hall of Shame: the notional rent that was deducted
"Notional rent is an expense, so less." **Fix:** it was charged only in the cost books, so the cost profit is the lower one; going to the financial profit, add it back.
:::

::: mistake Entering both depreciation figures
Deducting ₹4,20,000 and adding ₹3,80,000 as two items for the premix division. **Fix:** only the difference matters: the cost accounts charged ₹40,000 more, so the costing profit is ₹40,000 lower; from the financial profit, deduct ₹40,000 (from the costing profit, add it).
:::

::: mistake Closing stock and opening stock with the same sign
**Fix:** closing stock over-valued in cost accounts: deduct (it inflated the cost profit); opening stock over-valued in cost accounts: add (it inflated the cost of goods sold). The MTP January 2026 Series II answer debits "under valuation of opening stock in cost accounts", a deduction.
:::

::: mistake Losing the minus sign of a loss
Writing Tapri Cold Chain's balancing figure of ₹17,000 on the debit side as a "profit as per financial accounts". **Fix:** a loss is a negative profit. With the costing profit as base, the balancing figure goes on whichever side is short: on the debit side it is a profit, on the credit side (deductions larger than the base and the additions) it is a loss. A costing loss as base sits on the debit side.
:::

## Practice

::: quiz Check yourself
Q: Profit as per cost accounts is ₹3,80,000. Factory overheads were over-absorbed by ₹25,000, interest on debentures paid was ₹40,000, and notional interest on capital of ₹30,000 was charged in the cost accounts. What is the profit as per financial accounts (₹)?
= 395000
> ₹3,80,000 + ₹25,000 (over-absorption) + ₹30,000 (notional, cost only) − ₹40,000 (financial only) = ₹3,95,000.

Q: Case scenario. Dev's financial accounts show a profit of ₹9,10,000. Ritu's cost accounts valued closing stock at ₹2,80,000; the financial accounts valued it at ₹2,65,000, being market price. Starting from the financial profit, how is this item treated to reach the profit as per cost accounts?
- [ ] Deduct ₹15,000, because closing stock is over-valued in the cost accounts
- [x] Add ₹15,000, because the cost accounts' higher closing stock gives them a higher profit
- [ ] Add ₹2,80,000 and deduct ₹2,65,000 as two items
- [ ] Ignore it, because stock valuation does not affect profit
> Higher closing stock means higher profit. The cost books valued it ₹15,000 higher, so the cost profit is ₹15,000 above the financial one: from the financial profit, add. (From the cost profit it would be deducted.)

Q: Which of the following are included in the financial accounts only? Select all that apply.
- [x] Interest received on bank deposits
- [ ] Notional depreciation on a fully depreciated machine
- [x] Expenses on issue of debentures
- [x] Loss by fire not covered by insurance
> Interest received is purely financial income; issue expenses and uninsured fire losses are purely financial expenses (SM 7.31–7.32). Notional depreciation appears in the cost accounts only.

Q: Costing profit is ₹2,10,000; administrative overheads were under-absorbed by ₹14,000 and selling overheads over-absorbed by ₹6,000. Nothing else differs. What is the financial profit?
- [ ] ₹2,30,000
- [x] ₹2,02,000
- [ ] ₹2,18,000
- [ ] ₹1,90,000
> Under-absorption means actual overheads exceeded the cost charge, so the financial profit is lower: −₹14,000. Over-absorption is the reverse: +₹6,000. ₹2,10,000 − ₹14,000 + ₹6,000 = ₹2,02,000.

Q: In which situation is a reconciliation of cost and financial profit not needed?
- [ ] When the cost accounts use LIFO
- [ ] When there are no notional costs
- [x] When the cost and financial accounts are integrated
- [ ] When overheads are absorbed at actual rates
> With integrated accounts the same set of books serves both purposes, so there is only one profit (SM 7.33). The other options remove only one cause of difference.
:::

## Recap

- Reconciliation is needed when cost and financial accounts are kept separately (non-integrated); not when they are integrated.
- Procedure: profit as per financial accounts; profit as per cost accounts; reconcile the two.
- Causes, in ICAI's order: financial-only items (expenses and income); cost-only notional items; items treated differently; varying basis of stock valuation (financial: lower of cost or market; cost: at cost).
- From cost profit: add over-absorption, notional costs, financial-only income, cost over-charges, closing stock under-valued in cost; deduct the opposites.
- Opening stock works the other way round from closing stock.
- From financial profit, reverse every sign; a loss is a negative profit.
- Memorandum Reconciliation Account: base on its side, the other result as the balancing figure. (Miscellaneous expenses is not a reconciling item.)

## Flashcards

Q:: Reconciliation of cost and financial accounts: the three steps (SM 7.33)?
A:: Ascertainment of profit as per financial accounts; ascertainment of profit as per cost accounts; reconciliation of both the profits.

Q:: When can the reconciliation statement be avoided?
A:: When the cost and financial accounts are integrated: the same set of accounts fulfils the requirements of both.

Q:: The four causes of differences between financial and cost accounts, in ICAI's order?
A:: Items in financial accounts only; items in cost accounts only (notional); items treated differently in the two sets; varying basis of valuation.

Q:: Purely financial expenses: ICAI's six?
A:: Interest on loans or bank mortgages; expenses and discounts on issue of shares, debentures etc.; other capital losses (e.g. uninsured fire loss); losses on sale of fixed assets and investments; income tax, donations, subscriptions; expenses of the share transfer office.

Q:: Purely financial income: ICAI's five?
A:: Interest received on bank deposits, loans and investments; dividends received; profits on sale of fixed assets and investments; transfer fee received; rent receivables.

Q:: Items in cost accounts only (notional): ICAI's four?
A:: Charges in lieu of rent where premises are owned; notional interest on capital; notional salary of the proprietor; notional depreciation on fully depreciated assets.

Q:: Stock valuation as a cause of difference?
A:: Financial accounts value stock at cost or market price, whichever is lower; cost accounts value it only at cost.

Q:: From profit as per cost accounts: is under-absorbed overhead added or deducted?
A:: Deducted: actual overheads exceeded the amount charged in the cost accounts, so the financial profit is lower.

Q:: From profit as per cost accounts: is closing stock over-valued in cost accounts added or deducted? And opening stock over-valued?
A:: Closing stock over-valued in cost accounts: deducted. Opening stock over-valued in cost accounts: added.

Q:: Memorandum Reconciliation Account with a costing profit as base: where do the base and the balancing figure go?
A:: Profit as per cost accounts on the credit side with the additions; deductions on the debit side; profit as per financial accounts as the balancing figure on the debit side.
