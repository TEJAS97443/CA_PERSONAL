---
id: cma.bud.cash
title: Cash budget
minutes: 30
needs: cma.bud.functional
tags: cash budget, cash receipts, cash payments, collection from debtors, minimum cash balance, financial budget
labs: budget
summary: The month-by-month plan of cash receipts and payments that shows in advance when cash will run short or pile up, laid out the way ICAI's answers lay it out.
---

## In plain words

### Twenty lakh of profit and a call from the bank

Kesar launched Diwali gift boxes this year, as he launches something every festival. They sold out.

> **Kesar:** ₹20 lakh of profit by the end of November, Dev. So why is the bank manager calling me?
> **Dev:** Because profit is a promise and cash is a fact. The distributors pay us sixty days after the sale. The sweet-makers wanted their money in the month we sold.
> **Ritu:** Per month, please. In October and November we paid out ₹22 lakh and ₹34 lakh. Not one rupee came in until December.

The figures: boxes worth ₹30 lakh were sold in October, ₹50 lakh in November and ₹10 lakh in December. The boxes cost 60% of their price and the suppliers were paid in the month of sale; rent and staff cost ₹4 lakh a month; distributors pay two months after the sale. The line started September with ₹5 lakh in the bank.

The profit statement records a sale when the box is sold. The bank account records it when the distributor pays. So at the end of November the gift-box line has earned ₹20 lakh of profit and has a bank balance of minus ₹55 lakh: an overdraft. The cash arrives in December and January, two months too late for the bank manager's mood.

A **cash budget** would have shown this in August. For each month it lists the cash that will come in (the **receipts**), the cash that will go out (the **payments**) and the balance left at the end. It counts only cash, and it counts it in the month the cash actually moves.

That is its whole value: a shortage seen three months early can be arranged (a bank limit, a delayed purchase, a push on collections); a shortage discovered on salary day cannot.

::: analogy The fuel gauge on a road trip
The route map says Indore to Goa is a fine trip: that is the profit budget. The fuel gauge says on which stretch of highway the tank runs dry: that is the cash budget. A careful driver reads the gauge before leaving and plans the petrol pumps. A trip can be worth taking and still end on the shoulder of the highway with an empty tank.
:::

::: key
A cash budget is a month-by-month plan of cash receipts and cash payments: only cash, and only in the month it moves. It shows in advance when cash will be short (so borrowing is arranged in time) and when it will be in excess (so it can be invested).
:::

## How it works

### What ICAI means by a cash budget

The **cash budget** is a detailed budget of cash receipts and cash payments ==incorporating both revenue and capital items== for the budget period (SM 15.54). It is usually in two parts:

- **Cash receipts**, estimated monthly: estimated cash sales, collections from debtors and anticipated receipts from other sources such as sale of assets and borrowings.
- **Cash disbursements**: estimated cash purchases, payments to creditors, employees' remuneration, bonus, advances to suppliers, budgeted capital expenditure for expansion, and so on.

It is the plan of receipts and payments of cash for the budget period, analysed to show the monthly flow of cash, drawn up in such a way that the balance can be forecasted at regular intervals.

The cash budget is the last of ICAI's fifteen functional budgets (SM 15.19) and one of the **financial budgets** of a budgetary control system, beside the capital expenditure budget and the budgeted balance sheet (SM 15.14). In the chapter's own MCQ it is the budget that is usually short-term (SM 15.74, key at 15.83). The gift boxes show why it is needed even when the profit budget looks healthy:

::: diagram Gift boxes: profit earned against cash in the bank
{"type": "plot", "h": 320, "x": [0.5, 6.5], "y": [-60, 30], "ylabel": "amount (₹ lakh)", "legend": "outside",
 "xticks": [[1, "Sep"], [2, "Oct"], [3, "Nov"], [4, "Dec"], [5, "Jan"], [6, "Feb"]],
 "yticks": [[-60, "−60"], [-40, "−40"], [-20, "−20"], [0, "0"], [20, "20"]],
 "series": [
  {"label": "profit to date", "pts": [[1, -4], [2, 4], [3, 20], [4, 20], [5, 16], [6, 12]], "color": "a", "dots": true},
  {"label": "closing bank balance", "pts": [[1, 1], [2, -21], [3, -55], [4, -35], [5, 11], [6, 17]], "color": "d", "dots": true},
  {"pts": [[0.5, 0], [6.5, 0]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 3, "y": -55, "label": "Nov: −55", "pos": "right", "color": "d"}, {"x": 3, "y": 20, "label": "Nov: +20", "pos": "above", "color": "a"}],
 "caption": "Blue: profit earned to date; orange: the bank balance at each month end. In November the line has earned ₹20 lakh and owes the bank ₹55 lakh, because sales are collected two months later while suppliers are paid in the month of sale. Only in January does the cash catch up."}
:::

Its numbers come from the other budgets: the sales budget, the direct materials purchases budget and the selling and administrative expenses budget feed it, and so do the capital expenditure budget, dividend policies and plans for equity or long-term debt financing (SM 15.54–15.55; the capital expenditure budget "enables the cash budget to be completed", SM 15.46). The functional budgets are built in [[cma.bud.functional|functional budgets and the master budget]]; this lesson re-times them into cash.

::: diagram Where the cash budget's figures come from
{"type": "flow", "w": 420, "nodes": [{"id": "o", "kind": "start", "label": "Operating budgets:\nsales and costs"}, {"id": "t", "kind": "process", "label": "Timing schedules:\nwhen cash moves"}, {"id": "k", "kind": "process", "label": "Add capital spending,\ndividends, loans"}, {"id": "c", "kind": "process", "label": "Cash budget:\nmonth by month"}, {"id": "d", "kind": "decision", "label": "Below the\nminimum balance?"}, {"id": "b", "kind": "end", "label": "Arrange borrowing\nin advance"}, {"id": "i", "kind": "end", "label": "Invest the surplus\nor repay"}], "edges": [["o", "t"], ["t", "k"], ["k", "c"], ["c", "d"], ["d", "b", "yes"], ["d", "i", "no"]], "caption": "The timing schedules are the working notes of every ICAI answer: collections from debtors, payments to creditors, wages and overheads, each moved to the month the cash moves. The closing balance of each month then goes into the budgeted balance sheet."}
:::

### Seven steps from a sales forecast to a closing balance

::: steps
1. **Set the columns**: one per month of the budget period (a quarter or six months in most questions).
2. **Receipts from sales.** Split sales into cash and credit. Cash sales are received in the month of sale. Credit sales are collected according to the collection pattern ("60% in the month after sale, 38% in the second month"): a working note spreads each month's credit sales over the months it is collected in. Any part written off as bad debts is never received.
3. **Other receipts**: sale of assets (the proceeds), loans raised, issue of shares or debentures, dividends from a subsidiary, and similar items, in the month they arrive.
4. **Payments for purchases.** Work out the purchases (questions often tie them to sales or production: "bought one month before sale", "50% of next month's sales"), split cash and credit, and apply the creditors' payment pattern in a second working note.
5. **Other payments**: wages (often part this month, part next), overheads (only the cash part, with their own lag), payments that fall only in some months (debenture interest, advance tax, GST), and special payments (dividends, loan repayments, capital expenditure, instalments on an asset).
6. **Leave out what is not cash**: depreciation, bad debts, provisions, and the profit or loss on selling an asset (only the proceeds are cash).
7. **Balance each month**: opening balance + receipts − payments = closing balance, which becomes next month's opening balance. Compare it with the minimum cash balance the business wants to keep: a shortfall is met by borrowing arranged in advance, a surplus can be invested or used to repay the borrowing.
:::

::: lab budget {"mode":"cash"}
Step through it yourself: one receipt or payment per frame, with the working note that spreads each lag, then each month from opening to closing balance.
:::

### Cash, not profit: what goes in and what stays out

| Item | In the cash budget? | When or how much |
|---|---|---|
| Credit sales | Yes | In the months collected |
| Bad debts | No | Never received |
| Cash discount allowed | Net amount | The cash actually received |
| Credit purchases | Yes | In the months paid |
| Depreciation, amortisation | No | Not a cash payment |
| Sale of a fixed asset | Proceeds only | Month of receipt |
| Asset bought on instalments | Each instalment | Month it is paid |
| Advance tax, interest, dividend | Yes | Month it is paid |
| Loan raised or repaid | Yes | Month it moves |

## Formats and formulas

### ICAI's cash budget format

The Paper 6A Study Material prints this format, headed "… Co. Ltd., Cash Budget, Period …" (FM Study Material 9.43–9.44); the suggested answer to RTP May 2026 Case Scenario 1 uses the same layout in Paper 4. *Reproduce it from memory.*

| Particulars | Month 1 (₹) | Month 2 (₹) | Month 3 (₹) |
|---|---:|---:|---:|
| **Receipts:** | | | |
| 1. Opening balance | xxx | xxx | xxx |
| 2. Collection from debtors | xxx | xxx | xxx |
| 3. Cash sales | xxx | xxx | xxx |
| 4. Loans from banks | xxx | xxx | xxx |
| 5. Proceeds from issue of shares, debentures etc. | xxx | xxx | xxx |
| 6. Miscellaneous receipts | xxx | xxx | xxx |
| 7. Other items | xxx | xxx | xxx |
| **Total** | **xxx** | **xxx** | **xxx** |
| **Payments:** | | | |
| 1. Payments to creditors | xxx | xxx | xxx |
| 2. Wages | xxx | xxx | xxx |
| 3. Overheads (factory rent, administration, selling and distribution) | xxx | xxx | xxx |
| 4. Interest | xxx | xxx | xxx |
| 5. Dividend | xxx | xxx | xxx |
| 6. Corporate tax | xxx | xxx | xxx |
| 7. Capital expenditure | xxx | xxx | xxx |
| 8. Other items | xxx | xxx | xxx |
| **Total** | **xxx** | **xxx** | **xxx** |
| **Closing balance [Surplus (+) / Shortfall (−)]** | **xxx** | **xxx** | **xxx** |

### The second layout: net cash flow first

Several Paper 4 suggested answers (MTP Series I for January 2025 Q4(b), MTP Series II for May 2025 Q5(b)) keep the opening balance out of the receipts:

| Particulars | Month 1 (₹) | Month 2 (₹) |
|---|---:|---:|
| Total receipts (A) | xxx | xxx |
| Total payments (B) | xxx | xxx |
| **Net cash flow (A − B)** | **xxx** | **xxx** |
| Add: Opening balance | xxx | xxx |
| **Closing balance** | **xxx** | **xxx** |

Both earn full marks. Pick one and never mix them: an opening balance counted inside the receipts *and* added again below is counted twice.

### The working notes

Every cash budget answer stands on two schedules, shown as working notes:

| Credit sales of | Amount (₹) | Collected in month 1 | Collected in month 2 |
|---|---:|---:|---:|
| Month −1 | xxx | xxx (2nd month %) | — |
| Month 0 | xxx | xxx (1st month %) | xxx (2nd month %) |
| Month 1 | xxx | — | xxx (1st month %) |
| **Collection from debtors** | | **xxx** | **xxx** |

The payments to creditors follow the same pattern, with purchases in place of sales.

::: formula Closing balance
$$\text{Closing balance} = \text{Opening balance} \qquad + \text{Total receipts} - \text{Total payments}$$
Each month's closing balance is the next month's opening balance.
:::

::: formula Collection from debtors in a month
$$\text{Collection}_{t} = \sum_{k \ge 0} \text{Credit sales}_{t-k} \times p_{k}$$
$p_k$ = the share of a month's credit sales collected $k$ months after the sale ($k = 0$ is the month of sale). The shares add up to 100% less the bad debts.
:::

::: formula Collections and payments from opening and closing balances
$$\text{Receipts from debtors} = \text{Opening debtors} \qquad + \text{Credit sales} - \text{Closing debtors}$$
$$\text{Purchases} = \text{Cost of goods sold} \qquad + \text{Closing stock} - \text{Opening stock}$$
$$\text{Payment to creditors} = \text{Opening creditors} \qquad + \text{Credit purchases} - \text{Closing creditors}$$
Used when a question gives budgeted balances instead of collection patterns (FM Study Material 9.48). Bad debts written off are also deducted from the receipts.
:::

::: formula Surplus or deficit against a minimum balance
$$\text{Surplus or (deficit)} = \text{Opening balance} + \text{Receipts} \qquad - \text{Payments} - \text{Minimum cash balance}$$
A deficit is borrowed (or investments liquidated); a surplus is invested or repays the borrowing. The closing balance is then the minimum balance, or above it (FM Study Material 9.46).
:::

::: definition Cash budget
A detailed budget of cash receipts and cash payments incorporating both revenue and capital items for the budget period. It represents the cash requirements of the business during the budget period: the plan of receipts and payments of cash, analysed to show the monthly flow of cash, drawn up in such a way that the balance can be forecasted at regular intervals. (SM 15.54)
:::

## Worked examples

::::: example Chai premix, April to June: the full budget
Tapri's chai premix division gives you the following for 2026:

| Month | Sales (₹) |
|---|---:|
| February | 40,00,000 |
| March | 45,00,000 |
| April | 50,00,000 |
| May | 60,00,000 |
| June | 55,00,000 |

1. 20% of sales are for cash. Of the credit sales, 60% are collected in the month after the sale and 38% in the second month after the sale; the rest is written off as bad debts.
2. Materials are bought in the month before the sale, at 50% of the sales value, all on credit. Creditors are paid in the second month after the purchase.
3. Wages are ₹6,00,000 a month; a wage revision raises them by 10% from 1 May. 80% of each month's wages are paid in that month and 20% in the next month.
4. Overheads are ₹8,00,000 a month, including depreciation of ₹1,50,000. They are paid in the month after they are incurred.
5. A packing machine costing ₹45,00,000 will be bought in April, payable in three equal instalments starting in the month after purchase.
6. An old delivery van with a book value of ₹3,00,000 will be sold for ₹2,50,000 in May.
7. Advance tax of ₹5,00,000 is payable in June.
8. The cash balance on 1 April 2026 is expected to be ₹3,00,000.

**Required:**

(i) Prepare a cash budget for April, May and June 2026.

(ii) Tapri keeps a minimum cash balance of ₹5,00,000. Identify any month in which the division needs finance, and how much.

:::: answer Show the working
::: diagram Which month's credit sales are collected when
{"type": "table", "head": ["Credit sales of", "Amount (₹)", "Apr (₹)", "May (₹)", "Jun (₹)"], "rows": [["Feb", "32,00,000", "12,16,000", "—", "—"], ["Mar", "36,00,000", "21,60,000", "13,68,000", "—"], ["Apr", "40,00,000", "—", "24,00,000", "15,20,000"], ["May", "48,00,000", "—", "—", "28,80,000"], ["Collected", "", "33,76,000", "37,68,000", "44,00,000"]], "rowLabels": true, "align": ["left", "right", "right", "right", "right"], "cells": {"1,2": "d", "2,3": "d", "3,4": "d", "0,2": "c", "1,3": "c", "2,4": "c", "4,2": "hl", "4,3": "hl", "4,4": "hl"}, "caption": "Working note 1. Credit sales are 80% of sales. Blue cells: 60% collected in the month after the sale; amber cells: 38% collected in the second month. The 2% bad debts (₹64,000 of February's, ₹72,000 of March's) never reach a column."}
:::

**Working note 2: payments to creditors.** Purchases of a month = 50% of the next month's sales, paid two months later. So April pays February's purchases (50% of March sales of ₹45,00,000); May pays March's (50% of ₹50,00,000); June pays April's (50% of ₹60,00,000).

| Paid in | Purchases of | Amount (₹) |
|---|---|---:|
| April | February | 22,50,000 |
| May | March | 25,00,000 |
| June | April | 30,00,000 |

**Working note 3: wages paid.** Wages are ₹6,00,000 for March and April and ₹6,60,000 from May.

| Month | 80% now (₹) | 20% of last (₹) | Paid (₹) |
|---|---:|---:|---:|
| April | 4,80,000 | 1,20,000 | 6,00,000 |
| May | 5,28,000 | 1,20,000 | 6,48,000 |
| June | 5,28,000 | 1,32,000 | 6,60,000 |

**Working note 4: overheads.** Cash overheads = ₹8,00,000 − ₹1,50,000 depreciation = ₹6,50,000 a month, each paid the following month. The machine instalments are ₹45,00,000 ÷ 3 = ₹15,00,000 in May, June and July.

**(i) Cash budget for April to June 2026**

| Particulars | Apr (₹) | May (₹) | Jun (₹) |
|---|---:|---:|---:|
| **Receipts:** | | | |
| Cash sales | 10,00,000 | 12,00,000 | 11,00,000 |
| Debtors (WN 1) | 33,76,000 | 37,68,000 | 44,00,000 |
| Sale of van | — | 2,50,000 | — |
| **Total (A)** | **43,76,000** | **52,18,000** | **55,00,000** |
| **Payments:** | | | |
| Creditors (WN 2) | 22,50,000 | 25,00,000 | 30,00,000 |
| Wages (WN 3) | 6,00,000 | 6,48,000 | 6,60,000 |
| Overheads (WN 4) | 6,50,000 | 6,50,000 | 6,50,000 |
| Machine | — | 15,00,000 | 15,00,000 |
| Advance tax | — | — | 5,00,000 |
| **Total (B)** | **35,00,000** | **52,98,000** | **63,10,000** |
| **Net (A − B)** | **8,76,000** | **(80,000)** | **(8,10,000)** |
| Opening balance | 3,00,000 | 11,76,000 | 10,96,000 |
| **Closing balance** | **11,76,000** | **10,96,000** | **2,86,000** |

**(ii) Finance needed.** The closing balance stays above ₹5,00,000 in April and May. In June it falls to ₹2,86,000, so the division needs **₹2,14,000** (₹5,00,000 − ₹2,86,000) of short-term finance, arranged in advance for June. July brings the last machine instalment of ₹15,00,000, so Dev should look at July before choosing a one-month loan.

Notes: depreciation is left out (not cash); the van brings ₹2,50,000 in cash, and its ₹50,000 loss on sale does not appear; no July sales figure is needed, because the purchases made in June (for July's sales) are paid only in August.
::::
:::::

::: lab budget {"mode":"cash","months":"Apr May Jun Jul Aug Sep","hist":3,"open":135000,"minBal":0,"flows":"Cash sales: in 5,40,000 5,40,000 5,85,000 6,75,000 7,20,000 8,10,000\nCredit sales: in 22,50,000 22,50,000 22,50,000 23,40,000 23,40,000 25,20,000; collected 0 80 10 8\nCredit purchases: out 15,30,000 16,20,000 16,20,000 18,00,000 18,00,000 18,00,000; paid 0 75 25\nOther operating costs: out 8,10,000 8,10,000 8,10,000 10,98,000 11,07,000 11,07,000\nPallet jacks: out Jul 9,00,000; paid 0 25 25 25 25"}
Here is MTP May 2025 Series II Q5(b): credit sales collected over three months, purchases paid over two, and pallet jacks paid in instalments.
:::

::::: example Kulhad cafés: a minimum balance and an overdraft
Tapri's kulhad cafés in Pune expect these sales:

| Month | Sales (₹) |
|---|---:|
| June | 20,00,000 |
| July | 18,00,000 |
| August | 16,00,000 |
| September | 22,00,000 |
| October | 30,00,000 |

1. 75% of sales are received in cash and UPI on the day; 25% are corporate catering orders, collected in the following month.
2. Purchases of milk, tea and snacks are 40% of each month's sales, half paid in the month of purchase and half in the following month.
3. Staff salaries are ₹5,00,000 a month, paid in the same month; a Diwali bonus of ₹3,00,000 is paid in October.
4. Rent and other expenses are ₹3,50,000 a month, including depreciation of ₹50,000, paid in the same month.
5. The fit-out of a new café, ₹8,00,000, is paid in August.
6. The cash balance on 1 July is ₹2,50,000. The cafés keep a minimum balance of ₹2,00,000. Any shortfall is met by a bank overdraft taken at the end of the month, repaid out of the first surplus above the minimum. Ignore interest.

**Required:** Prepare a cash budget for July to October, showing the overdraft taken and repaid.

:::: answer Show the working
**Working notes**

1. Corporate collections (25% of last month's sales): July ₹5,00,000; August ₹4,50,000; September ₹4,00,000; October ₹5,50,000.
2. Purchases (40% of sales): June ₹8,00,000; July ₹7,20,000; August ₹6,40,000; September ₹8,80,000; October ₹12,00,000. Paid: July 3,60,000 + 4,00,000 = ₹7,60,000; August 3,20,000 + 3,60,000 = ₹6,80,000; September 4,40,000 + 3,20,000 = ₹7,60,000; October 6,00,000 + 4,40,000 = ₹10,40,000.
3. Cash part of rent and other expenses: ₹3,50,000 − ₹50,000 = ₹3,00,000 a month.

**Cash budget, July to October**

| Particulars | Jul (₹) | Aug (₹) | Sep (₹) | Oct (₹) |
|---|---:|---:|---:|---:|
| Opening balance | 2,50,000 | 5,40,000 | 2,00,000 | 4,00,000 |
| Cash, UPI sales | 13,50,000 | 12,00,000 | 16,50,000 | 22,50,000 |
| Corporate (WN 1) | 5,00,000 | 4,50,000 | 4,00,000 | 5,50,000 |
| **Available (A)** | **21,00,000** | **21,90,000** | **22,50,000** | **32,00,000** |
| Purchases (WN 2) | 7,60,000 | 6,80,000 | 7,60,000 | 10,40,000 |
| Salaries, bonus | 5,00,000 | 5,00,000 | 5,00,000 | 8,00,000 |
| Rent etc. (WN 3) | 3,00,000 | 3,00,000 | 3,00,000 | 3,00,000 |
| Café fit-out | — | 8,00,000 | — | — |
| **Payments (B)** | **15,60,000** | **22,80,000** | **15,60,000** | **21,40,000** |
| **Before financing (A − B)** | **5,40,000** | **(90,000)** | **6,90,000** | **10,60,000** |
| Overdraft taken (C) | — | 2,90,000 | — | — |
| Overdraft repaid (D) | — | — | 2,90,000 | — |
| **Closing (A − B + C − D)** | **5,40,000** | **2,00,000** | **4,00,000** | **10,60,000** |

::: diagram Balance before financing against the minimum
{"type": "plot", "h": 280, "x": [0.4, 4.6], "y": [-2, 12], "ylabel": "amount (₹ lakh)", "legend": "outside",
 "xticks": [[1, "Jul"], [2, "Aug"], [3, "Sep"], [4, "Oct"]],
 "yticks": [[0, "0"], [2, "2"], [4, "4"], [6, "6"], [8, "8"], [10, "10"]],
 "series": [
  {"label": "balance before financing", "bars": true, "bw": 0.55, "values": true, "color": "a", "pts": [[1, 5.4, "5.40"], [3, 6.9, "6.90"], [4, 10.6, "10.60"]]},
  {"label": "shortfall month", "bars": true, "bw": 0.55, "values": true, "color": "d", "pts": [[2, -0.9, "−0.90"]]},
  {"label": "minimum balance ₹2 lakh", "pts": [[0.4, 2], [4.6, 2]], "color": "mute", "dash": true}
 ],
 "caption": "Blue bars: the balance before any financing; orange bar: August, the one month below the grey dashed minimum. August needs 2.90 lakh (from −0.90 up to 2.00); September's surplus repays it."}
:::

August's fit-out pushes the balance to minus ₹90,000, so the overdraft is ₹2,00,000 − (−₹90,000) = **₹2,90,000**: enough to restore the minimum, not merely to reach zero. September's ₹6,90,000 is ₹4,90,000 above the minimum, enough to repay all ₹2,90,000. Depreciation is left out throughout.
::::
:::::

## Under the hood

### Three ways to build a cash budget

The Paper 6A Study Material names three methods (FM Study Material 9.41–9.42):

1. **Receipts and payments method**: all expected receipts and payments of the budget period, including those of the capital expenditure budget, are listed; accruals and adjustments do not affect it. Anticipated cash inflow is added to the opening balance and all payments are deducted to arrive at the closing balance. It is the method commonly used in business, and the one every worked example here uses.
2. **Adjusted income method**: the annual cash flows are found by adjusting sales revenue and cost figures for delays in receipts and payments (the change in debtors and creditors) and eliminating non-cash items such as depreciation.
3. **Adjusted balance sheet method**: the budgeted balance sheet is predicted by expressing each asset (except cash and bank) and short-term liability as a percentage of expected sales; it then shows whether additional finance is needed or a cash balance will build up.

### A long-period cash forecast

For several years ahead the forecast resembles a sources and application of funds statement (FM Study Material 9.50–9.51): start with the cash at the beginning of the year; add the trading profit before tax, depreciation and other amounts written off, sale proceeds of assets, proceeds of fresh issues of shares or debentures and any reduction in working capital (current assets other than cash, less current liabilities); deduct dividends, the cost of assets to be bought, taxes, redemptions of debentures or preference shares and any increase in working capital.

### The same skill in Paper 6A

In Financial Management the cash budget is a tool of cash planning, with the minimum balance, short-term borrowing and investment of surplus cash at its centre, and the floats that speed up collections and slow down payments: [[fm.wc.cash|treasury and cash management, Paper 6A]].

## Exam angle

::: exam Where the cash budget appeared, May 2024 to September 2026
In the Paper 4 documents read for this lesson, cash budgets came up in 4 documents, always as a numerical:

- **Descriptive.** A six-month cash budget for a toy maker, MTP Series I for January 2025 Q4(b) (8 marks): sales invoiced on the last day of the month and collected 50% one month and 50% two months later; toys produced two months before sale and materials paid two months after production; wages 75% in the month and 25% in the next, with a 25% rise from 1 March; variable overheads paid in the month after production and up 25% from April; a freehold property sold for ₹20,00,000 and a machine bought for ₹5,00,000 in June; depreciation given but not used; corporation tax in March. A three-month budget, MTP Series II for May 2025 Q5(b) (6 marks): collections of 80%, 10% and 8% in the three months after sale, the balance written off as bad debts; creditors 75% after one month and the balance after two; pallet jacks paid in four equal instalments "following the month of purchase".
- **Multiple choice, 2 marks each.** Sales receipts for one month from a cash and credit split, MTP Series II for September 2025 MCQ 15. A five-MCQ case scenario, RTP May 2026 Case Scenario 1: credit sales twice cash sales, a 3% discount on cash sales, goods bought a month before sale at a 20% margin on selling price, 40% cash purchases, an advance tax instalment, and the closing cash balance.
- **Paper 6A** examines the same layout with a minimum balance, a short-term loan and investment of the excess: January 2025 Q1(a) (5 marks).
- **Theory.** No document read asked the objectives or advantages of the cash budget; they are in the Study Material (SM 15.55), set out in the Answer frame.
:::

::: exam The wording traps ICAI used
- "Invoiced on the last day of the month" and "paid one month after the sale": nothing is received in the month of sale.
- "Produced two months before they are sold, creditors paid two months after production" (MTP January 2025): the two lags cancel, and materials are paid in the month of sale. Draw the time line before writing a figure.
- A wage rise "from 1st March" applies to March's wages, so the 25% of March wages paid in April is at the new rate too.
- "Instalments following the month of purchase" (MTP May 2025): an order in July is first paid in August.
- Bad debts are the part of credit sales that never arrives: 80% + 10% + 8% leaves 2% that appears in no month.
- RTP May 2026: a 3% discount on cash sales means the cash received is 97% of them; "20% profit margin on the selling price" makes purchases 80% of sales, not 100 ÷ 120. Its answer key prints ₹3,17,750 beside option (B) for the closing balance; option (B) and the working note both give ₹3,71,250.
- The paper's own instruction: "Working notes should form part of the answer."
:::

::: trick The time-line row
Before any figure, write the months across the page and draw an arrow from each sale to the month it is collected, and from each purchase to the month it is paid. Every lag error is visible on the arrows. It works for any pattern of lags, as long as each month's collections are added from the arrows that land in it.
:::

## Answer frame

### The theory parts

**Objectives of preparing a cash budget** (SM 15.55), in ICAI's order:

1. The probable cash position resulting from planned operations is assessed, so the excess or shortage of cash becomes clear; this helps in arranging short-term borrowings in advance for a shortage, or investments when cash is in excess.
2. Cash can be coordinated in relation to total working capital, sales investment and debt.
3. A sound basis for credit and for current control of the cash position is established.
4. The effect of sudden and seasonal requirements, large stocks, delay in collection of receipts, etc. on the cash position of the organisation is revealed to the management.

**Advantages of a cash budget** (SM 15.55):

1. It aids in securing the optimum working capital needed for smooth running of the operations, and in planning payments to shareholders (the Study Material prints "option working capital").
2. It eases the strains of a cash shortage.
3. It facilitates temporary investment of cash wherever, and to whatever extent, it is found in excess.
4. It provides for normal growth.

**"Define cash budget"**: the definition above, then its two parts (receipts and disbursements, with three examples of each) and that it is a financial budget prepared month by month.

### The numerical: three answers to the same question

::: cols
**Loses marks**

A single table of figures: "Collection from debtors, June: 44,00,000."

If one lag is wrong, nothing shows the method, and nothing earns method marks.
---
**Passes**

The cash budget with every line, but no working notes; depreciation correctly left out without a word.

The examiner cannot see whether 44,00,000 came from the right months.
---
**Full marks**

Working notes first (collections, creditors, wages, overheads), each showing which month's figure is paid when; then the budget in one consistent layout; a closing line on any shortfall against the minimum balance, and one sentence on items deliberately left out (depreciation, loss on sale).
:::

## Common mistakes

::: mistake Hall of Shame: depreciation paid out of the bank
Treating ₹8,00,000 of overheads as cash in the premix example takes ₹1,50,000 a month out of the budget that never leaves the bank: June closes ₹4,50,000 too low. **Fix:** deduct depreciation (and any amortisation or provision) from the expense before it enters the payments.
:::

::: mistake The lag that slipped a month
"Collected in the month after sale" put into the month of sale, or "paid two months after purchase" put one month after. Every later month shifts with it. **Fix:** write the time line first, label each credit sale with the month it is collected, and check one figure by hand: April collects February's second instalment and March's first.
:::

::: mistake Collecting the bad debts anyway
Spreading 60% and 40% when the question says 60% and 38% and "the rest is written off". **Fix:** the collection percentages add up to less than 100%; the bad debts never become receipts.
:::

::: mistake The opening balance counted twice
Listing the opening balance as the first receipt and then adding it again below the net cash flow. **Fix:** choose one layout (opening balance inside the receipts, or net cash flow plus opening balance) and keep it for every month.
:::

::: mistake The asset's profit in place of its price
Entering the ₹50,000 loss on the van, or its ₹3,00,000 book value, as the receipt. **Fix:** a cash budget records the ₹2,50,000 actually received; profit or loss on sale is not cash.
:::

## Practice

::: quiz Check yourself
Q: A Tapri distributor's sales are ₹6,00,000 in January, ₹8,00,000 in February and ₹10,00,000 in March. 30% of sales are for cash, on which a 2% cash discount is allowed. Credit sales are collected 60% in the month after the sale and 37% in the second month; the rest is bad. What are the total cash receipts from sales in March, in rupees?
= 785400
> Cash sales of March: 30% × ₹10,00,000 = ₹3,00,000, less the 2% discount: ₹2,94,000. February's credit sales, ₹5,60,000, are 60% collected: ₹3,36,000. January's credit sales, ₹4,20,000, are 37% collected: ₹1,55,400. Total ₹7,85,400; the 3% bad debts never arrive.

Q: Case scenario. Tapri Retail prices its packaged snacks at cost plus 25%. It keeps closing stock each month equal to half of the next month's cost of sales. All purchases are on credit and paid in the month after purchase. Sales are ₹8,00,000 in March, ₹10,00,000 in April, ₹12,00,000 in May and ₹9,00,000 in June. What is the payment to creditors in May?
- [ ] ₹8,25,000
- [x] ₹8,80,000
- [ ] ₹8,00,000
- [ ] ₹8,40,000
> At cost plus 25%, cost of sales is 100 ÷ 125 = 80% of sales: ₹6,40,000, ₹8,00,000, ₹9,60,000 and ₹7,20,000. May pays April's purchases = April's cost of sales + April's closing stock − April's opening stock = ₹8,00,000 + 50% × ₹9,60,000 − 50% × ₹8,00,000 = ₹8,80,000. ₹8,25,000 reads 25% as a margin on the selling price; ₹8,00,000 ignores the stock policy; ₹8,40,000 pays May's own purchases in May.

Q: Which of the following does not appear in a cash budget?
- [ ] Proceeds from the sale of an old machine
- [ ] An instalment paid on a new machine
- [ ] Interest paid on a term loan
- [x] Depreciation on the machines
> Depreciation is a non-cash expense. The sale proceeds, the instalment and the interest are all cash moving in or out in a particular month.

Q: Debtors are ₹12,00,000 at the start of the quarter and are budgeted at ₹14,50,000 at its end. Credit sales for the quarter are ₹30,00,000, and ₹50,000 of debts will be written off as bad. What are the budgeted receipts from debtors for the quarter, in rupees?
= 2700000
> Receipts = opening debtors + credit sales − bad debts written off − closing debtors = ₹12,00,000 + ₹30,00,000 − ₹50,000 − ₹14,50,000 = ₹27,00,000. Forgetting the bad debts gives ₹27,50,000: money that never arrives.

Q: Which of these are objectives of preparing a cash budget as listed by ICAI? Select all that apply.
- [x] To assess the probable cash position, so that short-term borrowing or investment can be arranged in advance
- [x] To reveal the effect of seasonal requirements, large stocks and delayed collections on the cash position
- [ ] To compute the profit of each month on an accrual basis
- [x] To coordinate cash with total working capital, sales, investment and debt
> ICAI's four objectives (SM 15.55) are the three ticked and establishing a sound basis for credit and current control of the cash position. Profit on an accrual basis is the budgeted income statement's job; the cash budget ignores accruals.
:::

## Recap

- Cash budget (SM 15.54): a detailed budget of cash receipts and cash payments, revenue and capital, for the budget period; two parts, receipts and disbursements; a financial budget, usually short-term and monthly.
- Only cash, only when it moves: credit sales in the months collected, purchases in the months paid; depreciation, bad debts and profit or loss on sale stay out.
- Working notes first: collections from debtors, payments to creditors, wages and overheads, each re-timed to the month of payment.
- Closing balance = opening balance + receipts − payments; it becomes next month's opening balance.
- Two layouts: opening balance inside the receipts (FM Study Material 9.43), or net cash flow plus opening balance; never both.
- Against a minimum balance: borrow the shortfall so the minimum is restored, repay or invest out of later surpluses.
- Objectives (SM 15.55): probable cash position (borrow or invest in time), coordination with working capital, basis for credit and cash control, effect of seasonal needs and delayed collections revealed.
- Profit is a promise, cash is a fact: read the fuel gauge before the trip.

## Flashcards

Q:: ICAI's definition of a cash budget?
A:: A detailed budget of cash receipts and cash payments incorporating both revenue and capital items for the budget period, analysed to show the monthly flow of cash so that the balance can be forecasted at regular intervals.

Q:: The two parts of a cash budget, with examples?
A:: Cash receipts (cash sales, collections from debtors, sale of assets, borrowings) and cash disbursements (cash purchases, payments to creditors, employees' remuneration, bonus, advances to suppliers, capital expenditure).

Q:: Under which component of a budgetary control system does the cash budget fall?
A:: Financial budgets, with the capital expenditure budget and the budgeted balance sheet.

Q:: Which budgets and policies affect the cash budget?
A:: The operating budgets (sales, direct materials purchases, selling and administrative expenses) and the capital expenditure budget, dividend policies and plans for equity or long-term debt financing.

Q:: ICAI's four objectives of preparing a cash budget?
A:: Assess the probable cash position (excess or shortage, so borrowing or investment is arranged in advance); coordinate cash with total working capital, sales, investment and debt; establish a sound basis for credit and current control of cash; reveal the effect of seasonal requirements, large stocks and delayed collections on the cash position.

Q:: ICAI's four advantages of a cash budget?
A:: Helps secure optimum working capital and plan payments to shareholders; eases the strains of a cash shortage; facilitates temporary investment of excess cash; provides for normal growth.

Q:: Four items that never enter a cash budget?
A:: Depreciation (and amortisation), bad debts written off, provisions, and the profit or loss on sale of an asset (only its proceeds).

Q:: Receipts from debtors when only balances are given?
A:: Opening debtors + credit sales − closing debtors (− bad debts written off).

Q:: The three methods of preparing a cash budget (FM Study Material)?
A:: Receipts and payments method; adjusted income method; adjusted balance sheet method.

Q:: How much is borrowed when the balance before financing is below the minimum cash balance?
A:: The minimum balance minus the balance before financing (from minus ₹90,000 to a minimum of ₹2,00,000 is ₹2,90,000), so the minimum is restored, not merely zero.
