<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p6-mtp-jan2026-s1
paper: p6
section: fm
kind: mtp
attempt: jan2026
series: s1
qfile: new/p6/mtp-jan2026-s1-q.pdf
afile: new/p6/mtp-jan2026-s1-a.pdf
choice: q1; any 2 of q2-q4
q: 1, 4
status: checked
by: tx-18
date: 2026-10-20
accept: 2025, 2025
note: Paper 6A (Financial Management) of ICAI's Mock Test Paper Series I for January 2026 (printed "Mock Test Paper - Series I: November, 2025", date of paper 28th November 2025): questions from the question paper (pp.1-7), answers from ICAI's Suggested Answers/ Hints (pp.1-16); the SM half is n-p6-mtp-jan2026-s1.sm.md. Part I: Case Scenario I (MCQs 1-5, "(5 x 2 = 10 Marks)") and three independent MCQs 6 (2 Marks), 7 (2 Marks) and 8 (1 Mark), 15 marks; Part II: Q1 (a)-(c) compulsory, then any two of Q2-Q4, 35 marks (choice: from the printed instruction on p.4). Instructions: p.1 (time, marks, the four printed notes, the Part I heading and its instruction) and p.4 (the Part II heading and its two instruction lines). ICAI prints the MCQ options and keys as (A)-(D) in both files. MCQ answers: ICAI prints the key and the option's text in bold on the key's line; each MCQ's working is ICAI's own, under its number. Formulas ICAI sets as stacked fractions are written in KaTeX with ICAI's symbols and numbers; where the text layer splits a number with a space ("₹ 86, 40,000") it is kept as printed. check.py: the numbers accepted on this block are the header lines of p.1 of both PDFs, which are not transcribed: "Mock Test Paper - Series I: November, 2025" and "Date of Paper: 28th November, 2025" (2025 twice, 28), "Time of Paper: 10 A.M. to 1 P.M." (10, 1) and the paper titles "PAPER – 6A : FINANCIAL MANAGEMENT & STRATEGIC MANAGEMENT" / "PAPER 6A: FINANCIAL MANAGEMENT" (question paper) and "PAPER – 6: …" / "PAPER 6A : FINANCIAL MANAGEMENT" (answers) (6 twice). The 12, 1 and 2 accepted on q4c-or are ICAI's "1₂" (the text layer reads "12"), written 1 with a subscript 2 as printed.
---
#### Instructions
Time Allowed – 3 Hours (Total time for 6A and 6B) Maximum Marks – 50

1\. The question paper comprises two parts, Part I and Part II.

2\. Part I comprises Case Scenario based Multiple Choice Questions (MCQs)

3\. Part II comprises questions which require descriptive type answers.

4\. Working note should form part of the answer. Wherever necessary, suitable assumptions may be made by the candidates and disclosed by way of note. However, in answers to Questions in Division A, working notes are not required.

**PART I – Case Scenario based MCQs (15 Marks)**

Write the most appropriate answer to each of the following multiple choice questions by choosing one of the four options given. All questions are compulsory.

**PART II – Descriptive Questions (35 Marks)**

*Question No. **1** is compulsory.*

*Attempt any **two** questions out of the remaining **three** questions.*

---
case: c1
qno: 1-5
label: Case Scenario I
q: 1-2
a: 1-3
---
#### Case
ABC Ltd is a growing renewable energy manufacturing company specializing in Parabolic Solar Cookers, which are widely used for rural cooking programs, NGO sustainability projects, and government-sponsored green initiatives. Over the past few years, ABC Ltd has seen a steady rise in demand due to increasing awareness of clean energy solutions and state-level subsidies.

Currently, ABC Ltd fabricates the metal frame, stand, and support structures of the solar cooker at their facility. However, one critical component—the Concentrator Dish (the reflective parabola that focuses sunlight)—is being purchased from an external vendor, PQR Ltd, at a cost of ₹ 2,000 per unit.

Recently, ABC Ltd has faced several operational challenges with the outsourced dish supplier like Supply Delays, Quality Inconsistency, Rising Procurement Costs, large government order requiring strict timelines and quality standards.

Because of these concerns, management is considering backward integration—bringing dish manufacturing in-house to gain greater control over cost, quality, and delivery.

To produce the concentrator dishes internally, management is evaluating the cost structure:

- Raw Material: ₹ 700 per unit
- Labour Cost: ₹ 300 per unit
- Other Variable Costs: ₹ 100 per unit

Total Variable Cost per unit = ₹ 1,100

To manufacture the dish internally, ABC Ltd must purchase new machinery costing ₹ 25,00,000 with:

- Useful life: 5 years
- Depreciation rate: 20% per year (straight-line)
- Tax rate: 30%
- Discount rate: 10%
- Expected annual production: 1,000 units
- Present value annuity factor for 10% over 5 years: 3.7908

The leadership team wants to understand whether in-house manufacturing is financially viable compared to continuing purchases from PQR Ltd. Based on the above facts you are required to answer the following questions (MCQs 1 to 5):

---
item: m1
case: c1
qno: 1
marks: 2
type: mcq
key: D
tags: fm.capbud.cashflows, fm.capbud.npv
difficulty: easy
q: 2
a: 1
note: Option (C) is printed "31,25.852" (a point for the second comma), kept as printed.
---
#### Question
What is present value of outflow incase of concentrator dish purchased from PQR Ltd for 5 years after considering taxes?
#### Options
(A) 50,40,325
(B) 43,52,789
(C) 31,25.852
(D) 53,07,120
#### Answer
**(D) 53,07,120**

Total Cost per year = 2,000 per unit x 1,000 units

= 20,00,000

Total Cost after adjusting taxes = 20,00,000 x (1-0.3) = 14,00,000

Present Value of cost at discount rate of 10% p. a

= Cost per Anum x Annuity factor

= 14,00,000 x 3.7908

= 53,07,120/-
#### Approach
The purchase price is a tax-deductible expense: take the annual cost after tax and discount it with the 5-year annuity factor.

---
item: m2
case: c1
qno: 2
marks: 2
type: mcq
key: B
tags: fm.capbud.cashflows, fm.capbud.npv
difficulty: medium
q: 2
a: 1-2
note: ICAI's table prints "Total cost net of taxes (16,00,000x x70/100)", kept as printed.
---
#### Question
What is present value of outflow after considering taxes if ABC Ltd is planning to manufacture concentrator dish?
#### Options
(A) 45,80,296
(B) 48,50,296
(C) 46,85,029
(D) 53,25,841
#### Answer
**(B) 48,50,296**

1\. Cost of Machinery = ₹ 25,00,000/- outflow in year 0.

2\. Present value of cost of machinery = ₹ 25,00,000

3\. Annual outflows

| | |
|---|---:|
| Raw Material | 700 |
| Labour | 300 |
| Other Variable Cost | 100 |
| Variable Cost | 1,100 |
| Total Cost (1,100 x 1,000 units) | 11,00,000 |
| *Add:* Depreciation | 5,00,000 |
| Total Cost | 16,00,000 |
| Total cost net of taxes (16,00,000x x70/100) | 11,20,000 |
| *Less:* Depreciation | 5,00,000 |
| Net Cash Outflow | 6,20,000 |

Present Value of cash outflow for 5 years = 6,20,000 x annuity factor

= 6,20,000 x 3.7908

= 23,50,296

Total Outflows = 25,00,000+23,50,296

= 48,50,296
#### Approach
The machine is a year-0 outflow; each year's variable cost is net of tax, and depreciation only saves tax, so add the tax shield back before discounting.

---
item: m3
case: c1
qno: 3
marks: 2
type: mcq
key: A
tags: fm.capbud.cashflows
difficulty: medium
q: 3
a: 2
---
#### Question
Suppose only 700 units are needed in a particular year. Which conclusion is correct?
#### Options
(A) The investment is still cash-positive even at 700 units
(B) The investment becomes cash-negative at 700 units
(C) The depreciation cancels out tax benefits at 700 units
(D) ABC should outsource if output falls below 900 units
#### Answer
**(A) The investment is still cash-positive even at 700 units**

Fixed investment cost (depreciation) = ₹ 5,00,000

Per-unit variable savings = ₹ 2,000 – ₹ 1,100 = ₹ 900

Actual annual savings = 700 × 900 = ₹ 6,30,000

Profit before tax = 6,30,000 − 5,00,000 = 1,30,000

Tax = 30% → 39,000

Profit after tax = 91,000

Add back depreciation = 5,00,000

Cash inflow = ₹ 5,91,000
#### Approach
Work out the yearly saving per unit (purchase price less variable cost) at 700 units, deduct depreciation, tax the result and add depreciation back.

---
item: m4
case: c1
qno: 4
marks: 2
type: mcq
key: A
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: medium
q: 3
a: 2-3
---
#### Question
ABC Ltd has found 2 new vendors selling concentrator dish. XYZ Ltd for ₹ 2100/- per unit and UVW Ltd for ₹1900/- per unit. Which option should ABC Ltd choose to minimize the cost?
#### Options
(A) Manufacture the Concentrator dish inhouse
(B) Purchase from PQR Ltd
(C) Purchase from XYZ Ltd
(D) Purchase from UVW Ltd
#### Answer
**(A) Manufacture the Concentrator dish inhouse**

1\. Manufacture of Concentrator dish

Total Outflows after adjusting taxes = 48,50,296

2\. Purchase from PQR Ltd.

Total Outflows after adjusting taxes = 53,07,120

3\. Purchase from XYZ Ltd.

Cost per unit charged by XYZ Ltd. is ₹ 2100/- per unit which is greater than PQR Ltd. Cost of purchasing from PQR Ltd. is already greater than manufacturing it. So, this need not be calculated.

4\. Purchase from UVW Ltd.

Cost per Unit = 1,900

Total Cost = 1,900 x 1,000 units = 19,00,000

Total cost after adjusting taxes = 19,00,000 x 70/100

= 13,30,000

Present Value of cost at discount rate of 10% p.a. = Cost per Anum x Annuity factor

= 13,30,000 x 3.7908

= 50,41,764
#### Approach
Put every option on the same footing, the present value of after-tax outflows over 5 years, and pick the lowest.

---
item: m5
case: c1
qno: 5
marks: 2
type: mcq
key: C
tags: fm.capbud.npv
difficulty: medium
q: 3
a: 3
note: ICAI's working prints the fraction "12,79,491 over 70 x 100" for the cost including taxes, kept as printed.
---
#### Question
UVW Ltd is negotiating with ABC Ltd and asking for final price for which they would want to purchase it. What should be price per unit at which ABC Ltd can purchase it from UVW Ltd?
#### Options
(A) 2,000
(B) 1,965
(C) 1,828
(D) 1,900
#### Answer
**(C) 1,828**

So, the cost of Manufacturing is least considering all options and so ABC Ltd should be purchasing it from UVW Ltd only if total cost of purchasing it from UVW Ltd is equal to manufacturing it.

Total outflow of manufacturing concentrator dish = 48,50,296

Lets do a reverse calculation

PV of cost at discount rate of 10% p.a. = Cost per Annum x Annuity factor

48,50,296 = Cost per Annum x 3.7908

Cost per Annum = 48,50,296/3.7908 = 12,79,491

Cost including Taxes = $\dfrac{12{,}79{,}491}{70 \text{ x } 100}$ = 18,27,845

Cost per unit = $\dfrac{18{,}27{,}845}{1000}$ = 1,827.8
#### Approach
Work backwards: the purchase price at which the present value of after-tax purchase costs equals the cost of making in-house is the most ABC Ltd should pay.

---
item: m6
qno: 6
marks: 2
type: mcq
key: D
tags: fm.lev.leverage
difficulty: easy
q: 3
a: 3-4
---
#### Question
Consider the following information for Atharv Ltd.:

| | ₹ in lakhs |
|---|---:|
| EBIT (Earnings before Interest and Tax) | 15,750 |
| Earnings before Tax (EBT): | 7,000 |
| Fixed Operating costs: | 1,575 |

Calculate percentage change in earnings per share, if sales increase by 5%.
#### Options
(A) 20%
(B) 19.65%
(C) 18.5%
(D) 12.375%
#### Answer
**(D) 12.375%**

**Operating Leverage (OL)**

= $\dfrac{\text{Contribution}}{\text{EBIT}} = \dfrac{\text{EBIT + Fixed Cost}}{\text{EBIT}} = \dfrac{\text{₹ } 15{,}750 + \text{₹ } 1{,}575}{15{,}750}$ = 1.1

**Financial Leverage (FL)**

= $\dfrac{\text{EBIT}}{\text{EBT}} = \dfrac{15{,}750}{7{,}000}$ = 2.25

**Combined Leverage (CL)**

= 1.1 × 2.25 = 2.475

**Percentage Change in Earnings per share**

DCL = $\dfrac{\text{\% change in EPS}}{\text{\% change in Sales}}$

2.475 = $\dfrac{\text{\% change in EPS}}{5\%}$

∴ % change in EPS = 12.375%.

Hence if sales is increased by 5%, EPS will be increased by 12.375%.
#### Approach
Combined leverage (operating × financial) is the percentage change in EPS for a 1% change in sales.

---
item: m7
qno: 7
marks: 2
type: mcq
key: D
tags: fm.wc.basics
difficulty: easy
q: 4
a: 4
---
#### Question
Calculate number of operating cycles in a year from the information given below:

| | |
|---|---:|
| Raw material inventory consumed during the year | ₹ 6,00,000 |
| Average stock of raw material | ₹ 41,667 |
| Work-in-progress holding period | 18 days |
| Finished Goods storage period | 25 days |
| Average collection period from debtors | 45 days |
| Average credit period availed | 30 days |
| No. of days in a year | 360 days |
#### Options
(A) 67
(B) 5.37
(C) 74
(D) 4.34
#### Answer
**(D) 4.34**

1\. **Raw-material holding period**

RM holding period = $\dfrac{\text{Average RM stock}}{\text{RM consumed}} \times 360 = \dfrac{41{,}667}{6{,}00{,}000} \times 360$

= 0.06945 × 360 = 25 days

2\. **Operating Cycle (OC)**

OC = RM period + WIP + FG + Debtors − Creditors

= 25 + 18 + 25 + 45 - 30 = 83 days

3\. **Number of Operating Cycles in a Year**

No. of cycles = $\dfrac{360}{83}$ = 4.34
#### Approach
Convert the raw material stock into a holding period in days first, then build the operating cycle and divide the year by it.

---
item: m8
qno: 8
marks: 1
type: mcq
key: C
tags: fm.coc.wacc, fm.coc.debt
difficulty: easy
q: 4
a: 4
---
#### Question
A company has a financial structure where equity is 60% of its total debt plus equity. Its cost of equity is 10% and gross loan interest is 9%. Corporation tax is paid at 30%. What is the company’s weighted average cost of capital (WACC)?
#### Options
(A) 7.55%
(B) 7.80%
(C) 8.52%
(D) 8.05%
#### Answer
**(C) 8.52%**

After-tax cost of debt

Kd = 9% (1-0.30) = 6.3%

WACC = (E/V) Ke + (D/V) Kd

= 0.6 (10%) + 0.4 (6.3%)

= 6% + 2.52% = 8.52%

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.coc.wacc, fm.coc.equity, fm.coc.debt
difficulty: medium
q: 4-5
a: 5
---
#### Question
Divine Limited has the following capital structure, which it considers to be optimal:

| Capital Structure | Weightage (in percentage) |
|---|---:|
| Debt | 25 |
| Preference Shares | 15 |
| Equity Shares | 60 |
| | 100 |

Divine Limited’s expected net income this year is ₹34,285.72, its established dividend payout ratio is 30 per cent, its tax rate is 40 per cent, and investors expect earnings and dividends to grow at a constant rate of 9 per cent in the future. It paid a dividend of ₹ 3.60 per share last year, and its shares currently sell at a price of ₹ 54 per share.

Divine Limited requires additional funds which it can obtain in the following ways:

- Preference Shares: New preference shares with a dividend of ₹ 11 can be sold to the public at a price of ₹95 per share.
- Debt: Debt can be sold at an interest rate of 12 per cent.

You are required to:

(i) DETERMINE the cost of each capital structure component; and

(ii) COMPUTE the weighted average cost of capital (WACC) of Divine Limited.
#### Answer
**(i) Computation of Costs of Different Components of Capital Equity Shares**

$K_e = \dfrac{D_1}{P_0} + g = \dfrac{D_0 (1 + g)}{P_0} + g$

= $\dfrac{\text{₹ } 3.60 (1.09)}{\text{₹ } 54}$ + 0.09 = 0.0727 + 0.09 = 16.27%.

**Preference Shares**

$K_p = \dfrac{\text{Preference Share Dividend}}{P_0} = \dfrac{\text{₹}11}{\text{₹ } 95}$ = 11.58%.

**Debt at K$_d$ = 12%**

K$_d$ (1 – T) = 12 (1 – 0.4) = 12% (0.6) = 7.20%.

**(ii) Weighted Average Cost of Capital (WACC)**

WACC = W$_d$K$_d$ (1 – T) + W$_p$K$_p$ + W$_e$K$_e$

WACC = 0.25 (7.2%) + 0.15 (11.58%) + 0.60 (16.27%)

= 1.8 + 1.737 + 9.762 = 13.30%.
#### Approach
Grow last year's dividend by g to get D1 for the cost of equity; take debt after tax; then weight each cost by the optimal capital structure.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.ratio.prepare, fm.ratio.activity
difficulty: medium
q: 5
a: 5-7
note: ICAI's answer heads the balance sheet "Balance Sheet of T Ltd as on……" (the question names Prashuk Ltd.), kept as printed.
---
#### Question
Following information is given for Prashuk Ltd.:

| | |
|---|---:|
| Fixed assets turnover ratio (Based on cost of sales) | 8 times |
| Capital turnover ratio (Based on cost of sales) | 2 times |
| Inventory Turnover | 8 times |
| Receivable turnover | 4 times |
| Payable turnover | 6 times |
| GP Ratio | 25% |

Gross profit during the year amounts to ₹ 8,00,000. There is no long-term loan or overdraft. Reserve and surplus amount to ₹ 2,00,000. Ending inventory of the year is ₹ 20,000 above the beginning inventory. Based on the above information, DETERMINE the various assets and liabilities of the company.
#### Answer
(a) G.P. ratio = $\dfrac{\text{Gross Profit}}{\text{Sales}}$ = 25%

Sales = $\dfrac{\text{Gross Profit}}{25} \times 100 = \dfrac{\text{₹ } 8{,}00{,}000}{25} \times 100$ = ₹ 32,00,000

(b) Cost of Sales = Sales − Gross profit

= ₹ 32,00,000 - ₹ 8,00,000

= ₹ 24,00,000

(c) Receivable turnover = $\dfrac{\text{Sales}}{\text{Debtors}}$ = 4

= Debtors = $\dfrac{\text{Sales}}{4} = \dfrac{\text{₹ } 32{,}00{,}000}{4}$ = ₹ 8,00,000

(d) Fixed assets turnover = $\dfrac{\text{Cost of Sales}}{\text{Fixed Assets}}$ = 8

Fixed assets = $\dfrac{\text{Cost of Sales}}{8} = \dfrac{\text{₹ } 24{,}00{,}000}{8}$ = ₹ 3,00,000

(e) Inventory turnover = $\dfrac{\text{Cost of Sales}}{\text{Average Stock}}$ = 8

Average Stock = $\dfrac{\text{Cost of Sales}}{8} = \dfrac{\text{₹}24{,}00{,}000}{8}$ = ₹ 3,00,000

Average Stock = $\dfrac{\text{Opening Stock + Closing Stock}}{2}$

Average Stock = $\dfrac{\text{Opening Stock + Opening Stock + 20,000}}{2}$

Average Stock = Opening Stock + ₹ 10,000

Opening Stock = Average Stock - ₹ 10,000

= ₹ 3,00,000 - ₹10,000

= ₹ 2,90,000

Closing Stock = Opening Stock + ₹ 20,000

= ₹ 2,90,000 + ₹ 20,000 = ₹ 3,10,000

(f) Payable turnover = $\dfrac{\text{Purchase}}{\text{Creditors}}$ = 6

Purchases = Cost of Sales + Increase in Stock

= ₹ 24,00,000 + ₹ 20,000 = ₹ 24,20,000

Creditors = $\dfrac{\text{Purchase}}{6} = \dfrac{\text{₹}24{,}20{,}000}{6}$ = ₹ 4,03,333

(g) Capital turnover = $\dfrac{\text{Cost of Sales}}{\text{Capital Employed}}$ = 2

Capital Employed = $\dfrac{\text{Cost of Sales}}{2} = \dfrac{\text{₹ } 24{,}00{,}000}{2}$ = ₹ 12,00,000

(h) Capital = Capital Employed – Reserves & Surplus

= ₹ 12,00,000 – ₹ 2,00,000 = ₹ 10,00,000

**Balance Sheet of T Ltd as on……**

| Liabilities | Amount (₹) | Assets | Amount (₹) |
|---|---:|---|---:|
| Capital | 10,00,000 | Fixed Assets | 3,00,000 |
| Reserve & Surplus | 2,00,000 | Stock | 3,10,000 |
| Creditors | 4,03,333 | Debtors | 8,00,000 |
| | | Other Current Assets | 1,93,333 |
| | 16,03,333 | | 16,03,333 |
#### Approach
Start from the gross profit and GP ratio to get sales and cost of sales; every other turnover ratio then gives one balance-sheet figure, and other current assets is the balancing figure.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: medium
q: 5
a: 7-8
note: ICAI's table labels both the market price row and the row "No. of new shares to be issued (ii)" with (ii), kept as printed.
---
#### Question
Perfact Ltd. has 8 lakhs equity shares outstanding at the beginning of the year. The current market price per share is ₹ 120. The Board of Directors of the company is contemplating ₹ 6.4 per share as dividend. The rate of capitalisation, appropriate to the risk-class to which the company belongs, is 9.6%:

(i) Based on M-M Approach, CALCULATE the market price of the share of the company, when the dividend is – (a) declared; and (b) not declared.

(ii) DETERMINE, how many new shares are to be issued by the company, if the company desires to fund an investment budget of ₹ 3.20 crores by the end of the year assuming net income for the year will be ₹ 1.60 crores?
#### Answer
**Modigliani and Miller (M-M) – Dividend Irrelevancy Model:**

$P_0 = \dfrac{P_1 + D_1}{1 + K_e}$

Where,

P$_o$ = Existing market price per share i.e. ₹ 120

P$_1$ = Market price of share at the year-end (to be determined)

D$_1$ = Contemplated dividend per share i.e. ₹ 6.4

K$_e$ = Capitalisation rate i.e. 9.6%.

**(i) (a) Calculation of share price when dividend is declared:**

$P_0 = \dfrac{P_1 + D_1}{1 + K_e}$

$120 = \dfrac{P_1 + 6.4}{1 + 0.096}$

120 × 1.096 = P$_1$ + 6.4

P$_1$ = 120 × 1.096 – 6.4

= 125.12

**(b) Calculation of share price when dividend is not declared:**

$P_0 = \dfrac{P_1 + D_1}{1 + K_e}$

$120 = \dfrac{P_1 + 0}{1 + 0.096}$

120 × 1.096 = P$_1$ + 0

P$_1$ = 131.52

**(ii) Calculation of No. of shares to be issued:**

*(₹ in lakhs)*

| Particulars | If dividend declared | If dividend not declared |
|---|---:|---:|
| Net Income | 160 | 160 |
| Less: Dividend paid | 51.20 | ------ |
| Retained earnings | 108.80 | 160 |
| Investment budget | 320 | 320 |
| Amount to be raised by issue of new shares (i) | 211.20 | 160 |
| Market price per share (ii) | 125.12 | 131.52 |
| No. of new shares to be issued (ii) | 1,68,797.95 | 1,21,654.50 |
| Or say | 1,68,798 | 1,21,655 |
#### Approach
Under MM, P0 = (P1 + D1)/(1 + Ke): solve for P1 with and without the dividend; the new shares fill the gap between the investment and the retained earnings, issued at P1.

---
item: q2a
qno: 2
part: (a)
marks: 8
type: descriptive
tags: fm.wc.estimate
difficulty: hard
q: 6
a: 8-10
note: ICAI's working note 3 prints "₹ 86, 40,000" (a space after the first comma), kept as printed. The underline rule ICAI prints under 8,07,471 in its statement is a layout rule and is not transcribed.
---
#### Question
A newly formed company has applied to the commercial bank for the first time for financing its working capital requirements. The following information is available about the projections for the current year:

Estimated level of activity: 1,04,000 completed units of production plus 4,000 units of work-in-progress. Based on the above activity, estimated cost per unit is:

| | |
|---|---:|
| Raw material | ₹ 80 per unit |
| Direct wages | ₹ 30 per unit |
| Overheads (exclusive of depreciation) | ₹ 60 per unit |
| Total cost | ₹ 170 per unit |
| Selling price | ₹ 200 per unit |

Raw materials in stock: Average 4 weeks consumption, work-in-progress (assume 50% completion stage in respect of conversion cost) (materials issued at the start of the processing).

| | |
|---|---:|
| Finished goods in stock | 8,000 units |
| Credit allowed by suppliers | Average 4 weeks |
| Credit allowed to debtors/receivables | Average 8 weeks |
| Lag in payment of wages | Average 1 $\dfrac{1}{2}$ weeks |

Cash at banks (for smooth operation) is expected to be ₹ 25,000

Assume that production is carried on evenly throughout the year (52 weeks) and wages and overheads accrue similarly. All sales are on credit basis only.

CALCULATE Net Working Capital.
#### Answer
**Estimate of the Requirement of Working Capital**

| | | (₹) | (₹) |
|---|---|---:|---:|
| **A.** | **Current Assets:** | | |
| | Raw material stock | 6,64,615 | |
| | (Refer to Working note 3) | | |
| | Work in progress stock | 5,00,000 | |
| | (Refer to Working note 2) | | |
| | Finished goods stock | 13,60,000 | |
| | (Refer to Working note 4) | | |
| | Debtors | 25,10,769 | |
| | (Refer to Working note 5) | | |
| | Cash and Bank balance | 25,000 | 50,60,384 |
| **B.** | **Current Liabilities**: | | |
| | Creditors for raw materials | 7,15,740 | |
| | (Refer to Working note 6) | | |
| | Creditors for wages | 91,731 | 8,07,471 |
| | (Refer to Working note 7) | | |
| | Net Working Capital (A - B) | | 42,52,913 |

**Working Notes:**

1\. **Annual cost of production**

| | ₹ |
|---|---:|
| Raw material requirements (1,04,000 units × ₹ 80) | 83,20,000 |
| Direct wages (1,04,000 units × ₹ 30) | 31,20,000 |
| Overheads (exclusive of depreciation) (1,04,000 × ₹ 60) | 62,40,000 |
| | 1,76,80,000 |

2\. **Work in progress stock**

| | ₹ |
|---|---:|
| Raw material requirements (4,000 units × ₹ 80) | 3,20,000 |
| Direct wages (50% × 4,000 units × ₹ 30) | 60,000 |
| Overheads (50% × 4,000 units × ₹ 60) | 1,20,000 |
| | 5,00,000 |

3\. **Raw material stock**

It is given that raw material in stock is average 4 weeks’ consumption. Since, the company is newly formed, the raw material requirement for production and work in progress will be issued and consumed during the year.

Hence, the raw material consumption for the year (52 weeks) is as follows:

| | ₹ |
|---|---:|
| For Finished goods | 83,20,000 |
| For Work in progress | 3,20,000 |
| | 86,40,000 |

Raw material stock = $\dfrac{\text{₹ } 86, 40{,}000}{52 \text{ weeks}}$ × 4 weeks i.e. ₹ 6,64,615

4\. **Finished goods stock**

8,000 units @ ₹ 170 per unit = ₹13,60,000

5\. **Debtors for sale**

| | |
|---|---|
| Credit allowed to debtors | Average 8 weeks |
| Credit sales for year (52 weeks) i.e. (1,04,000 units - 8,000 units) | 96,000 units |
| Cost per unit | ₹ 170 |
| Credit sales for the year (96,000 units × ₹170) | ₹ 1,63,20,000 |
| Debtors | ₹1,63,20,000/52 weeks × 8 weeks i.e. ₹ 25,10,769 |

6\. **Creditors for raw material:**

| | |
|---|---|
| Credit allowed by suppliers | Average 4 weeks |
| Purchases during the year (52 weeks) i.e. (₹83,20,000 + ₹3,20,000 + ₹6,64,615) (Refer to Working notes 1,2 and 3 above) | ₹ 93,04,615 |
| Creditors | ₹93,04,615/52 weeks × 4 weeks i.e. ₹ 7,15,740 |

7\. **Creditors for wages**

| | |
|---|---|
| Lag in payment of wages | Average 1 $\dfrac{1}{2}$ weeks |
| Direct wages for the year (52 weeks) i.e. (₹ 31,20,000 + ₹ 60,000) (Refer to Working notes 1 and 2 above) | ₹ 31,80,000 |
| Creditors | ₹31,80,000/52 weeks × 1 $\dfrac{1}{2}$ weeks i.e. ₹ 91,731 |
#### Approach
Value each current asset and liability for its holding period on a 52-week year: work-in-progress carries full material but half the conversion cost, and debtors are at cost of the units sold.

---
item: q2b
qno: 2
part: (b)
marks: 2
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 6
a: 10
---
#### Question
DIFFERENTIATE between Business risk and Financial risk.
#### Answer
**Business Risk and Financial Risk:** Business risk refers to the risk associated with the firm’s operations. It is an unavoidable risk because of the environment in which the firm has to operate and the business risk is represented by the variability of earnings before interest and tax (EBIT). The variability in turn is influenced by revenues and expenses. Revenues and expenses are affected by demand of firm’s products, variations in prices and proportion of fixed cost in total cost.

Whereas, Financial risk refers to the additional risk placed on firm’s shareholders as a result of debt use in financing. Companies that issue more debt instruments would have higher financial risk than companies financed mostly by equity. Financial risk can be measured by ratios such as firm’s financial leverage multiplier, total debt to assets ratio etc.

---
item: q3a
qno: 3
part: (a)
marks: 6
type: descriptive
tags: fm.cs.theories, fm.coc.wacc
difficulty: hard
q: 6-7
a: 11-13
note: ICAI's question prints "is currently a levered a company", "It’s Earnings", "It's cost of equity" and "It’s cost of capital", kept as printed.
---
#### Question
Vastupal Limited is currently a levered a company having 15% convertible debt of ₹ 250 lakhs in its capital structure. The current market value of Vastupal Limited stands at ₹ 1500 lakhs with the overall capitalization rate for the common stock holders is at 20% considering financial and non-financial risks.

Owing to the regulatory norms applicable to Vastupal Limited, the company is planning to become an all equity financed company gradually over a period of time. Currently, company plans to convert 70% of debt to equity and the balance after 3 years. It’s Earnings before Interest & Taxes (EBIT) are expected to remain constant in future as well. The entire earnings are distributed to the common stock holders and the applicable corporate tax rate is at 20%.

You are required to calculate the impact on the following on account of the change in the capital structure as per Modigliani and Miller (MM) Hypothesis:

(i) The market value of the company and its impact

(ii) It's cost of equity, and its impact

(iii) It’s cost of capital and its impact

Also CALCULATE the market value of the totally unlevered company & the cost of equity i.e. after 3 years when the balance 30% convertible debt is also fully converted to equity.
#### Answer
**(i) Market Value of Vastupal Limited (After conversion)**

Value of Levered Co (VL) = Value of Substantial Unlevered Co (VU) + Tax advantage

1,500 lakhs = VU + (250 x 70% x 20%)

∴ Market Value of Substantial Unlevered Co (VU) = 1,465 Lakhs

**Alternatively, Market Value of Substantial Unlevered Co (VU) can be calculated as below:**

MV of Substantial Unlevered Co (30% Debt)

= MV of Totally Unlevered Co + Tax advantage

= {1500−0.20(250)} + (250 x 30% x 20%)

= 1,450 + 15

Market Value of Substantial Unlevered Co (VU) = 1,465 Lakhs

The impact is that the market value of the company has decreased by 35 lakhs (1500 lakhs - 1465 lakhs)

**(ii) Cost of Equity (Ke) – After conversion**

WN-1 Preparation of Income Statement

| Particulars | Before Conversion | After Conversion |
|---|---:|---:|
| EBIT | 350.00 | 350.00 |
| (-) Int | (37.50)<br>(250 x 15%) | (11.25)<br>(250 x 30% x 15%) |
| EBT | 312.50 | 338.75 |
| (-) Tax @ 20% | (62.50) | (67.75) |
| Dividend | 250.00 | 271.00 |

MV of Equity (Before conversion) = $\dfrac{\text{Dividend}}{\text{Ke}}$

(1,500 – 250) = $\dfrac{\text{Dividend}}{0.2}$

∴ Dividend = 250 Lakhs

**MV of Equity (Before Conversion)** = MV of Co (Before conversion) - MV of Debt

= 1,500 – 250 = 1,250

**MV of Equity (After Conversion)** = MV of Co (After conversion) - MV of Remaining Debt

= 1,465 - {250 x 30%}

= 1,390 lakhs

**∴ Ke (after Conversion)** = $\dfrac{\text{Dividend}}{\text{MV of Equity}}$

= 271/ 1,390

= 19.49%

The impact is that cost of equity has fallen by 0.50% i.e. 20.00% - 19.49% due to reduction in the financial risk.

**(iii) Cost of Capital (Ko) – After Conversion**

| Components | Amount (in lakhs) | Weights (W) | Cost of Capital (K) | WACC (W x K) |
|---|---:|---:|---:|---:|
| Equity | 1390.00 | 0.9488 | 19.49 | 18.49 |
| Debt | 75.00 | 0.0512 | 12.00<br>15 (1 – 0.2) | 0.61 |
| | 1465.00 | | | 19.10% |

**Cost of Capital (Ko) – Before Conversion**

| Components | Amount (in lakhs) | Weights (W) | Cost of Capital (K) | WACC (W x K) |
|---|---:|---:|---:|---:|
| Equity | 1250.00 | 0.8333 | 20.00 | 16.67 |
| Debt | 250.00 | 0.1667 | 12.00<br>15 (1 – 0.2) | 2.00 |
| | 1500.00 | | | 18.67% |

The impact is that the overall cost of capital has increased by 0.43% i.e. 19.10% - 18.67% due to non-availability of tax benefit owing to the reduction in the debt.

**WN-2: Calculation of Market Value of the company & Ke after the end of 3 years**

MV of Substantial Unlevered Co = MV of Totally Unlevered Co + Tax advantage

1,465 lakhs = MV of Totally Unlevered Co + (250 x 30% x 20%)

**∴ MV of Totally Unlevered Co = 1,450 lakhs**

**Calculation of Ke of Totally Unlevered Co**

Ke = $\dfrac{\text{Dividend}}{\text{MV of Equity}}$

| Particulars | Amount |
|---|---:|
| EBIT | 350.00 |
| (-) Int | 0.00 |
| EBT | 350.00 |
| (-) Tax @20% | (70.00) |
| Dividend | 280.00 |

∴ Ke = 280/1,450

**∴ Ke = 19.31%**
#### Approach
With tax, MM says VL = VU + tax shield (debt × tax rate): converting 70% of the debt removes that part of the shield. Back out EBIT from the current dividend to equity, then recompute Ke and Ko on the new values.

---
item: q3b
qno: 3
part: (b)
marks: 4
type: descriptive
tags: fm.lev.leverage, fm.ratio.liquidity
difficulty: medium
q: 7
a: 13-14
---
#### Question
The Capital structure of Magnus Ltd. is as follows:

| | (₹) |
|---|---:|
| Equity Share of ₹ 10 each | 8,00,000 |
| 10% Preference Share of ₹ 100 each | 5,00,000 |
| 12% Debentures of ₹ 100 each | 7,00,000 |
| | 20,00,000 |

Additional Information:

- Profit after tax (Tax Rate 30%) are ₹ 2,80,000
- Operating Expenses (including Depreciation ₹ 96,800) are 1.5 times of EBIT
- Equity Dividend paid is 15%
- Market price of Equity Share is ₹ 23

CALCULATE:

(i) Operating and Financial Leverage

(ii) Cover for preference and equity dividend
#### Answer
**Working Notes:**

| | (₹) |
|---|---:|
| Net Profit after Tax | 2,80,000 |
| Tax @ 30% | 1,20,000 |
| EBT | 4,00,000 |
| Interest on Debentures | 84,000 |
| EBIT | 4,84,000 |
| Operating Expenses (1.5 times of EBIT) | 7,26,000 |
| Sales | 12,10,000 |

(i) **Operating Leverage**

= $\dfrac{\text{Contribution}}{\text{EBIT}} = \dfrac{\text{₹ } (12{,}10{,}000 - 6{,}29{,}200)}{\text{₹ } 4{,}84{,}000} = \dfrac{\text{₹ } 5{,}80{,}800}{\text{₹ } 4{,}84{,}000}$ = 1.2 times

**Financial Leverage** = $\dfrac{\text{EBIT}}{\text{EBT}} = \dfrac{4{,}84{,}000}{4{,}00{,}000}$ = 1.21 times

(ii) **Cover for Preference Dividend**

= $\dfrac{\text{PAT}}{\text{Preference Share Dividend}}$

= $\dfrac{\text{₹ } 2{,}80{,}000}{\text{₹ } 50{,}000}$ = 5.6 times

**Cover for Equity Dividend**

= $\dfrac{\text{(PAT - Preference Dividend)}}{\text{Equity Share Dividend}} = \dfrac{\text{₹ } (2{,}80{,}000 - 50{,}000)}{\text{₹ } 1{,}20{,}000}$

= $\dfrac{\text{₹ } 2{,}30{,}000}{\text{₹ } 1{,}20{,}000}$ = 1.92 times
#### Approach
Work up from PAT: gross up for tax to EBT, add debenture interest for EBIT, and get sales from operating expenses at 1.5 times EBIT; depreciation is the fixed cost that separates contribution from EBIT.

---
item: q4a
qno: 4
part: (a)
marks: 4
type: descriptive
tags: fm.intro.role
difficulty: easy
q: 7
a: 14
---
#### Question
DIFFERENTIATE between Financial Management and Financial Accounting.
#### Answer
**Differentiation between Financial Management and Financial Accounting**: Though financial management and financial accounting are closely related, still they differ in the treatment of funds and also with regards to decision - making.

*Treatment of Funds:* In accounting, the measurement of funds is based on the accrual principle. The accrual based accounting data do not reflect fully the financial conditions of the organisation. An organisation which has earned profit (sales less expenses) may said to be profitable in the accounting sense but it may not be able to meet its current obligations due to shortage of liquidity as a result of say, uncollectible receivables. Whereas, the treatment of funds, in financial management is based on cash flows. The revenues are recognised only when cash is actually received (i.e. cash inflow) and expenses are recognised on actual payment (i.e. cash outflow). Thus, cash flow based returns help financial managers to avoid insolvency and achieve desired financial goals.

*Decision-making:* The chief focus of an accountant is to collect data and present the data while the financial manager’s primary responsibility relates to financial planning, controlling and decision-making. Thus, in a way it can be stated that financial management begins where financial accounting ends.

---
item: q4b
qno: 4
part: (b)
marks: 4
type: descriptive
tags: fm.sources.other
difficulty: easy
q: 7
a: 14-15
---
#### Question
EXPLAIN the methods of venture capital financing.
#### Answer
**Some common methods of venture capital financing are as follows:**

**(i)** ***Equity financing:*** The venture capital undertakings generally require funds for a longer period but may not be able to provide returns to the investors during the initial stages. Therefore, the venture capital finance is generally provided by way of equity share capital. The equity contribution of venture capital firm does not exceed 49% of the total equity capital of venture capital undertakings so that the effective control and ownership remains with the entrepreneur.

**(ii)** ***Conditional loan:*** A conditional loan is repayable in the form of a royalty after the venture is able to generate sales. No interest is paid on such loans. In India venture capital financiers charge royalty ranging between 2 and 15 per cent; actual rate depends on other factors of the venture such as gestation period, cash flow patterns, risk and other factors of the enterprise. Some Venture capital financiers give a choice to the enterprise of paying a high rate of interest (which could be well above 20 per cent) instead of royalty on sales once it becomes commercially sound.

**(iii)** ***Income note:*** It is a hybrid security which combines the features of both conventional loan and conditional loan. The entrepreneur has to pay both interest and royalty on sales but at substantially low rates. IDBI’s VCF provides funding equal to 80 – 87.50% of the projects cost for commercial application of indigenous technology.

**(iv)** ***Participating debenture:*** Such security carries charges in three phases — in the start-up phase no interest is charged, next stage a low rate of interest is charged up to a particular level of operation, after that, a high rate of interest is required to be paid.

---
item: q4c
qno: 4
part: (c)
marks: 2
type: descriptive
tags: fm.div.models
difficulty: easy
q: 7
a: 15
---
#### Question
STATE the Limitations of Walter’s Model
#### Answer
**Limitations of Walter’s Model**

1\. The formula **does not consider all the factors** affecting dividend policy and share prices. Moreover, determination of market capitalisation rate is difficult.

2\. Further, the formula **ignores such factors as taxation,** various legal and contractual obligations, management policy and attitude towards dividend policy and so on.

---
item: q4c-or
alt: q4c
qno: 4
part: (c)
marks: 2
type: descriptive
tags: fm.cs.ebiteps
difficulty: easy
q: 7
a: 15-16
accept: 12, 1, 2
note: ICAI's list of symbols prints "1₂" for I₂ (the interest charges in Alternative 2), kept as printed.
---
#### Question
DISCUSS financial break-even and EBIT-EPS indifference analysis.
#### Answer
**Financial Break-even and EBIT-EPS Indifference Analysis**

Financial break-even point is the minimum level of EBIT needed to satisfy all the fixed financial charges i.e. interest and preference dividend. It denotes the level of EBIT for which firm’s EPS equals zero. If the EBIT is less than the financial breakeven point, then the EPS will be negative but if the expected level of EBIT is more than the breakeven point, then more fixed costs financing instruments can be taken in the capital structure, otherwise, equity would be preferred.

EBIT-EPS analysis is a vital tool for designing the optimal capital structure of a firm. The objective of this analysis is to find the EBIT level that will equate EPS regardless of the financing plan chosen.

$\dfrac{(\text{EBIT} - I_1)(1 - T)}{E_1} = \dfrac{(\text{EBIT} - I_2)(1 - T\ )}{E_2}$

Where,

| | | |
|---|---|---|
| EBIT | = | Indifference point |
| E$_1$ | = | Number of equity shares in Alternative 1 |
| E$_2$ | = | Number of equity shares in Alternative 2 |
| I$_1$ | = | Interest charges in Alternative 1 |
| 1$_2$ | = | Interest charges in Alternative 2 |
| T | = | Tax-rate |
