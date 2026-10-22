---
id: cma.sys.recon
title: Reconciling cost and financial profit
minutes: 36
needs: cma.sys.ledgers, cma.oh.underover
tags: reconciliation statement, memorandum reconciliation account, cost and financial profit, notional cost, under-absorption, over-absorption, stock valuation
labs:
summary: Why the cost books and the financial books show different profits, the four causes ICAI lists, and how to reconcile them item by item in a reconciliation statement or a Memorandum Reconciliation Account.
---

## In plain words

### Two profits for one year

At the year-end review Kesar holds two sheets of paper. Ritu's costing profit and loss account says the premix division earned ₹6.25 lakh; Dev's financial statements say ₹4.5 lakh.

> **Kesar:** Same division, same premix, same year. Put the ₹1.75 lakh difference in miscellaneous expenses and let us go for lunch.
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

::: formula The identity behind every reconciliation
$$\text{Financial profit} \qquad = \text{Cost profit} + \text{Additions} - \text{Deductions}$$
Additions are the items that make the financial profit higher than the cost profit; deductions, those that make it lower. A balancing item (one missing difference) is found by solving this identity for it (May 2025 Q4(a)).
:::

## Worked examples

:::: example The premix division's statement, with one item lost
For 2025-26, Tapri's premix division shows a net profit of ₹6,25,000 in its cost accounts and ₹4,50,000 in its financial accounts. Ritu finds:

| Particulars | ₹ |
|---|---:|
| Factory overheads under-absorbed in cost accounts | 42,000 |
| Administrative overheads over-absorbed in cost accounts | 18,000 |
| Depreciation: charged in financial accounts 1,60,000; recovered in cost accounts | 1,45,000 |
| Interest on bank loan | 64,000 |
| Dividend received | 22,000 |
| Loss on sale of an old delivery van | 26,000 |
| Income tax provided | 1,80,000 |
| Notional rent of own premises charged in cost accounts | 96,000 |
| Closing finished stock: cost accounts 4,20,000; financial accounts (lower of cost or market) | 3,96,000 |
| Opening raw material stock: cost accounts 2,10,000; financial accounts | 2,30,000 |

The cost accounts also charged notional interest on capital, but the page with its amount was lost under Bunty's chai.

**Required:**

(i) Prepare a statement reconciling the two profits, taking the profit as per cost accounts as the base.

(ii) Find the notional interest on capital charged in the cost accounts.

::: answer Show the working
**(i) and (ii) Statement of reconciliation**

| Particulars | ₹ | ₹ |
|---|---:|---:|
| **Net profit as per cost accounts** | | **6,25,000** |
| Add: Administrative overheads over-absorbed | 18,000 | |
| Dividend received (financial accounts only) | 22,000 | |
| Notional rent of own premises (cost accounts only) | 96,000 | |
| Notional interest on capital (cost accounts only; balancing figure, WN) | 60,000 | 1,96,000 |
| | | 8,21,000 |
| Less: Factory overheads under-absorbed | 42,000 | |
| Depreciation under-charged in cost accounts (1,60,000 − 1,45,000) | 15,000 | |
| Interest on bank loan | 64,000 | |
| Loss on sale of delivery van | 26,000 | |
| Income tax provided | 1,80,000 | |
| Over-valuation of closing stock in cost accounts (4,20,000 − 3,96,000) | 24,000 | |
| Under-valuation of opening stock in cost accounts (2,30,000 − 2,10,000) | 20,000 | (3,71,000) |
| **Net profit as per financial accounts** | | **4,50,000** |

**Working note: the missing item.** Without it, ₹6,25,000 + ₹1,36,000 − ₹3,71,000 = ₹3,90,000. The financial profit is ₹4,50,000, so the notional interest is ₹4,50,000 − ₹3,90,000 = **₹60,000**, an addition because it was charged only in the cost accounts.

Reasons for the stock items: a higher closing stock raises profit, so the cost books' ₹24,000 extra is deducted; a lower opening stock also raises profit (less cost carried in), so the cost books' ₹20,000 shortfall is deducted too.
:::
::::

::::: example The samosa factory: both profits from scratch
From the financial records of Tapri's samosa factory for the year:

| Particulars | ₹ |
|---|---:|
| Sales (1,00,000 boxes) | 1,50,00,000 |
| Direct materials consumed | 64,00,000 |
| Direct wages | 25,00,000 |
| Factory overheads | 21,60,000 |
| Administrative overheads (production-related) | 9,90,000 |
| Selling and distribution overheads | 11,20,000 |
| Interest on term loan | 1,80,000 |
| Preliminary expenses written off | 50,000 |
| Dividend received | 40,000 |
| Closing stock: finished goods (10,000 boxes) | 9,80,000 |
| Closing stock: work-in-process | 4,00,000 |

There was no opening stock; 1,10,000 boxes were produced. In the cost records factory overheads are absorbed at 80% of direct wages, administrative overheads at 10% of works cost, and selling and distribution overheads at ₹12 per box sold. Work-in-process is valued at the same amount in both sets of books.

**Required:**

(i) Prepare the profit and loss account as per the financial records.

(ii) Prepare a cost sheet and find the profit as per the cost records.

(iii) Reconcile the two profits.

:::: answer Show the working
**(i) Profit and loss account**

::: cols Profit & Loss Account (financial records)
| Dr. | ₹ |
|---|---:|
| To Direct materials | 64,00,000 |
| To Direct wages | 25,00,000 |
| To Factory overheads | 21,60,000 |
| To Administrative overheads | 9,90,000 |
| To Selling & distribution overheads | 11,20,000 |
| To Interest on term loan | 1,80,000 |
| To Preliminary expenses written off | 50,000 |
| To Net profit | 30,20,000 |
| **Total** | **1,64,20,000** |
---
| Cr. | ₹ |
|---|---:|
| By Sales (1,00,000 boxes) | 1,50,00,000 |
| By Closing stock: finished goods | 9,80,000 |
| By Closing stock: work-in-process | 4,00,000 |
| By Dividend received | 40,000 |
| **Total** | **1,64,20,000** |
:::

**(ii) Cost sheet**

| Particulars | ₹ |
|---|---:|
| Direct materials | 64,00,000 |
| Direct wages | 25,00,000 |
| **Prime cost** | **89,00,000** |
| Add: Factory overheads (80% of ₹25,00,000) | 20,00,000 |
| **Gross works cost** | **1,09,00,000** |
| Less: Closing work-in-process | (4,00,000) |
| **Works cost (1,10,000 boxes)** | **1,05,00,000** |
| Add: Administrative overheads (10% of works cost) | 10,50,000 |
| **Cost of production (₹105 a box)** | **1,15,50,000** |
| Less: Closing finished goods (10,000 × ₹105) | (10,50,000) |
| **Cost of goods sold (1,00,000 boxes)** | **1,05,00,000** |
| Add: Selling and distribution overheads (₹12 × 1,00,000) | 12,00,000 |
| **Cost of sales** | **1,17,00,000** |
| **Profit** | **33,00,000** |
| **Sales** | **1,50,00,000** |

**(iii) Statement of reconciliation**

| Particulars | ₹ | ₹ |
|---|---:|---:|
| **Profit as per cost records** | | **33,00,000** |
| Add: Administrative overheads over-absorbed (10,50,000 − 9,90,000) | 60,000 | |
| Selling and distribution overheads over-absorbed (12,00,000 − 11,20,000) | 80,000 | |
| Dividend received | 40,000 | 1,80,000 |
| | | 34,80,000 |
| Less: Factory overheads under-absorbed (21,60,000 − 20,00,000) | 1,60,000 | |
| Interest on term loan | 1,80,000 | |
| Preliminary expenses written off | 50,000 | |
| Over-valuation of closing finished goods in cost records (10,50,000 − 9,80,000) | 70,000 | (4,60,000) |
| **Profit as per financial records** | | **30,20,000** |
::::
:::::

::::: example Chai Express: a Memorandum Reconciliation Account from a loss
Chai Express Logistics, Tapri's cold-chain subsidiary, shows a net loss of ₹2,40,000 in its cost accounts for the year. A scrutiny of both sets of books reveals:

| Particulars | ₹ |
|---|---:|
| Operating overheads over-recovered in cost accounts | 12,000 |
| Administration overheads under-recovered in cost accounts | 7,000 |
| Depreciation: charged in financial accounts 90,000; recovered in cost accounts | 1,05,000 |
| Interest received on fixed deposits (not in cost accounts) | 18,000 |
| Bad debts written off (financial accounts only) | 22,000 |
| Goodwill written off | 30,000 |
| Transfer fees received (credited in financial books) | 2,500 |
| Closing stock under-valued in cost accounts | 9,000 |

**Required:** Prepare a Memorandum Reconciliation Account and find the result as per the financial accounts.

:::: answer Show the working
::: cols Memorandum Reconciliation Account
| Dr. | ₹ |
|---|---:|
| To Net loss as per cost accounts | 2,40,000 |
| To Administration overheads under-recovered in cost accounts | 7,000 |
| To Bad debts written off in financial accounts | 22,000 |
| To Goodwill written off | 30,000 |
| **Total** | **2,99,000** |
---
| Cr. | ₹ |
|---|---:|
| By Operating overheads over-recovered in cost accounts | 12,000 |
| By Depreciation over-charged in cost accounts (1,05,000 − 90,000) | 15,000 |
| By Interest received on fixed deposits | 18,000 |
| By Transfer fees received | 2,500 |
| By Closing stock under-valued in cost accounts | 9,000 |
| By Net loss as per financial accounts (balancing figure) | 2,42,500 |
| **Total** | **2,99,000** |
:::

The financial accounts show a **net loss of ₹2,42,500**. Check: −₹2,40,000 + ₹56,500 (credits other than the balancing figure) − ₹59,000 (debits other than the opening loss) = −₹2,42,500.
::::
:::::

## Under the hood

### Under- or over-absorbed? Read the account, not the label

In SM Illustration 7 (SM 7.36–7.39), the Overhead Control A/c is debited with ₹1,43,000 of overheads incurred and credited with ₹1,20,000 absorbed into WIP: the ₹23,000 balance carried down is overhead incurred but not absorbed, that is, **under-absorbed**. The reconciliation then adds it to the financial loss of ₹3,000 to reach the costing profit of ₹20,000, which is right for an under-absorption (the cost books charged less, so their profit is higher). The statement's line calls it "overheads over absorbed"; the figures fit only the under-absorbed reading. Work out the label from the account: incurred > absorbed means under-absorbed.

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
3. "Add:" items with a working in brackets for every computed difference (₹1,60,000 − ₹1,45,000); subtotal.
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
Adding ₹1,05,000 and deducting ₹90,000 as two items. **Fix:** only the difference matters: ₹15,000 over-charged in cost accounts, added.
:::

::: mistake Closing stock and opening stock with the same sign
**Fix:** closing stock over-valued in cost accounts: deduct (it inflated the cost profit); opening stock over-valued in cost accounts: add (it inflated the cost of goods sold). The MTP January 2026 Series II answer debits "under valuation of opening stock in cost accounts", a deduction.
:::

::: mistake Losing the minus sign of a loss
Treating a costing loss of ₹2,40,000 as a profit and "adding" deductions to it. **Fix:** a loss is a negative profit; in a Memorandum Reconciliation Account it sits on the debit side and the financial result is the balancing figure.
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
