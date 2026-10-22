<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-pyq-nov2019
paper: p8
kind: pyq
attempt: nov2019
qfile: old/p8/pyq-nov2019-a.pdf
afile: old/p8/pyq-nov2019-a.pdf
paperfile: old/p8/pyq-nov2019-q.pdf
choice: q1; any 4 of q2-q6
q: 1
status: checked
by: tx-42
date: 2026-10-20
accept: 1
note: Old-scheme Paper 8 (Financial Management and Economics for Finance), November 2019 (ICAI's "Intermediate (New) Examination"): only Section A Financial Management (pp.1-19 of the Suggested Answers) is transcribed; Section B Economics for Finance (pp.20-31) is not (no blocks cite it). Source: ICAI's own copy of the Suggested Answers is no longer online, so the qfile/afile is the cacult.com mirror recorded in bank/sources.json (see its notes); it reproduces every question (in italics) with its marks before the answer. The question-paper booklet scan (OCR text) is linked as paperfile and was not used for the text. Instructions: ICAI's Section A box on p.1, which gives the choice rule (Q1 20 marks + four of Q2-Q6 at 10 each = 60, Q6's (c) and its OR alternative counting once). ICAI prints no separate time for Section A, so minutes: is left out. ICAI heads Q1 "Question" without its number (p.1); it is Question No. 1 of the instructions. Item model: Q1 (a)-(d) are separate 5-mark questions; Q2, Q3 and Q5 each carry one marks note (10) over several requirements answered in one connected solution, so each is one item; Q6 (a) 3, (b) 3, (c) 4 marks, and (c) has an OR alternative (q6c-or, alt: q6c); the "OR" lines are not transcribed. Old-scheme mapping (ours): Q4 (lease or buy) is out of syllabus (the current Study Material leaves practical lease problems to the Final level; see the item's note) and carries no tag; Q1(b) (expected NPV) is out of syllabus and keeps the nearest tag fm.capbud.npv (see its note); every other item is tagged to current Paper 6A sub-topics. check.py: accepted numbers that ICAI prints but this file does not transcribe: "PAPER – 8" in the title on p.1 and in the running heads of the odd pages pp.3-19 (8, seven times in pp.7-19), the page numbers of those running heads (3, 5, 7, 9, 11, 13, 15, 17, 19), which check.py does not strip; and the question numbers 1-6, which ICAI prints once ("Question N") while check.py counts them for both the question and the answer of the same file (1 also for the instructions' "Question No. 1" against the unnumbered "Question" of p.1). ICAI's own wording and figures kept as printed are listed in each item's note. Repaired extraction damage only: the text layer's spaces before commas and full stops and inside words were removed (checked against the PDF's word geometry); the formulas (whose × signs the text layer drops) and every table were read from the rendered pages (pp.1, 3-18). Formulas set as stacked fractions are written in KaTeX with ICAI's own symbols and numbers; subscripts (Ke, Kd, D1, P0) as KaTeX subscripts.
---
#### Instructions
**SECTION – A: FINANCIAL MANAGEMENT**

Question No. **1** is compulsory.

Attempt any **four** questions out of the remaining **five** questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the answer

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.ratio.profit
difficulty: easy
q: 1
a: 3
note: Kept as printed: "the equity shares of which is trading" (question); "Earning per Shares (EPS)" and the denominator "₹ 1,00,000" for the number of equity shares (answer).
---
#### Question
Following information has been gathered from the books of Tram Ltd. the equity shares of which is trading in the stock market at ₹ 14.

| Particulars | Amount (₹) |
|---|---:|
| Equity Share Capital (face value ₹ 10) | 10,00,000 |
| 10% Preference Shares | 2,00,000 |
| Reserves | 8,00,000 |
| 10% Debentures | 6,00,000 |
| Profit before Interest and Tax for the year | 4,00,000 |
| Interest | 60,000 |
| Profit after Tax for the year | 2,40,000 |

Calculate the following:

(i) Return on Capital Employed

(ii) Earnings per share

(iii) PE ratio
#### Answer
**(i) Calculation of Return on capital employed (ROCE)**

Capital employed = Equity Shareholders’ funds + Debenture + Preference shares

= ₹ (10,00,000 + 8,00,000 + 6,00,000 + 2,00,000)

= ₹ 26,00,000

Return on capital employed [ROCE-(Pre-tax)] = $\dfrac{\text{PBIT}}{\text{Capital Employed}}$ x 100

= $\dfrac{₹ 4{,}00{,}000}{₹ 26{,}00{,}000}$ x 100

= 15.38% (approx.)

Return on capital employed [ROCE-(Post-tax)]= $\dfrac{\text{Profit after Tax}}{\text{Capital Employed}}$ x 100

= $\dfrac{₹ 2{,}40{,}000}{₹ 26{,}00{,}000}$ x 100

= 9.23% (approx.)

**(ii) Calculation of Earnings per share**

Earnings per share = $\dfrac{\text{Earnings available to equity shareholders}}{\text{No of equity shares}}$

= $\dfrac{\text{Profit after tax-preference Dividend}}{\text{No of equity shares}}$

= $\dfrac{₹ (2{,}40{,}000 - 20{,}000)}{₹ 1{,}00{,}000}$

= ₹ 2.20

**(iii) Calculation of PE ratio**

PE = $\dfrac{\text{Market Price per Share (MPS)}}{\text{Earning per Shares (EPS)}}$

= $\dfrac{₹ 14}{₹ 2.20}$ = 6.364 (approx.)
#### Approach
Capital employed here is equity funds (capital plus reserves) plus debentures plus preference shares; for EPS take the preference dividend out of profit after tax and divide by the number of shares, not the capital.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: medium
q: 1-2
a: 4
note: Old-scheme mapping (ours): the expected NPV from a probability distribution of cash flows belongs to risk analysis in capital budgeting, which the new-scheme Paper 6A syllabus and the January 2027 Study Material do not teach (its Investment Decisions chapter has no expected NPV or probability analysis), so the item is out of syllabus (oos, lead ruling 2026-10-20, consistent with the other old Paper 8 risk-analysis items) and keeps the nearest tag fm.capbud.npv.
---
#### Question
Door Ltd. is considering an investment of ₹ 4,00,000. This investment is expected to generate substantial cash inflows over the next five years. Unfortunately, the annual cash flows from this investment is uncertain, and the following profitability distribution has been established.

| Annual Cash Flow (₹) | Probability |
|---:|---:|
| 50,000 | 0.3 |
| 1,00,000 | 0.3 |
| 1,50,000 | 0.4 |

At the end of its 5 years life, the investment is expected to have a residual value of ₹ 40,000.

The cost of capital is 5%

(i) Calculate NPV under the three different scenarios.

(ii) Calculate Expected Net Present Value.

(iii) Advise Door Ltd. on whether the investment is to be undertaken.

| Year | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|
| DF @ 5% | 0.952 | 0.907 | 0.864 | 0.823 | 0.784 |
#### Answer
**(i) Calculation of NPV under three different scenarios** **(Amount in ₹)**

| Particulars | 1st Scenario | 2nd Scenario | 3rd Scenario |
|---|---:|---:|---:|
| Annual Cash Flow | 50,000 | 1,00,000 | 1,50,000 |
| PV of cash inflows (Annual Cash Flow × 4.33\*) | 2,16,500 | 4,33,000 | 6,49,500 |
| PV of Residual Value (₹ 40,000 × 0.784) | 31,360 | 31,360 | 31,360 |
| Total PV of Cash Inflow | 2,47,860 | 4,64,360 | 6,80,860 |
| Initial investment | 4,00,000 | 4,00,000 | 4,00,000 |
| **NPV** | **(1,52,140)** | **64,360** | **2,80,860** |

\* .952 + .907 + .864 + .823 + .784 = 4.33

**(ii) Calculation of Expected Net present Value under three different scenarios**

| Particulars | 1st Scenario | 2nd Scenario | 3rd Scenario | Total (₹) |
|---|---:|---:|---:|---:|
| Annual Cash Flow | ₹ 50,000 | ₹ 1,00,000 | ₹ 1,50,000 | |
| Probability | 0.3 | 0.3 | 0.4 | |
| Expected Value | ₹ 15,000 | ₹ 30,000 | ₹ 60,000 | 1,05,000 |
| PV of Expected value (1,05,000 × 4.33) | | | | 4,54,650 |
| PV of Residual Value (40,000 × 0.784) | | | | 31,360 |
| Total PV of Cash Inflow | | | | 4,86,010 |
| Initial investment | | | | 4,00,000 |
| **Expected Net Present Value** | | | | **86,010** |

**(iii)** Since the expected net present value of the Investment is positive, the Investment should be undertaken.
#### Approach
The annual cash flow is an annuity, so the sum of the five discount factors gives its present value; add the residual value discounted at year 5 and deduct the investment, once for each cash flow and once for the probability-weighted cash flow.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: medium
q: 2
a: 4-6
note: Kept as printed: "Rs 10,00,000 / 2,00,000" beside ₹ elsewhere, "may be taken at the inverse of P/E Ratio", "R = Return earned on investment" (lower-case r in the formula) and "Earnings per Shares" (answer).
---
#### Question
Following figures and information were extracted from the company A Ltd.

| | |
|---|---:|
| Earnings of the company | ₹ 10,00,000 |
| Dividend paid | ₹ 6,00,000 |
| No. of shares outstanding | 2,00,000 |
| Price Earnings Ratio | 10 |
| Rate of return on investment | 20% |

You are required to calculate:

(i) Current Market price of the share

(ii) Capitalisation rate of its risk class

(iii) What should be the optimum pay-out ratio?

(iv) What should be the market price per share at optimal pay-out ratio? (use Walter’s Model)
#### Answer
**(i) Current Market price of shares (applying Walter’s Model)**

- The EPS of the firm is ₹ 5 (i.e., Rs 10,00,000 / 2,00,000).
- Rate of return on Investment (r) = 20%.
- The Price Earnings (P/E) Ratio is given as 10, so capitalization rate ($K_e$), may be taken at the inverse of P/E Ratio. Therefore, $K_e$ is 10% or .10 (i.e., 1/10).
- The firm is distributing total dividends of ₹ 6,00,000 among 2,00,000 shares, giving a dividend per share of ₹ 3.

The value of the share as per Walter’s model may be found as follows:

Walter’s model is given by-

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e}$

Where,

P = Market price per share.

E = Earnings per share = ₹ 5

D = Dividend per share = ₹ 3

R = Return earned on investment = 20 %

$K_e$ = Cost of equity capital = 10% or .10

P = $\dfrac{3 + \dfrac{0.20}{0.10}(5 - 3)}{0.10}$ = ₹ 70

*Current Market Price of shares can also be calculated as follows:*

Price Earnings (P/E) Ratio = $\dfrac{\text{Market Price of Share}}{\text{Earnings per Shares}}$

Or, 10 = $\dfrac{\text{Market Price of Share}}{₹ 10{,}00{,}000 / 2{,}00{,}000}$

Or, 10 = $\dfrac{\text{Market Price of Share}}{₹ 5}$

Market Price of Share = ₹ 50

**(ii) Capitalization rate** ($K_e$) of its risk class is 10% or .10 (i.e., 1/10).

**(iii) Optimum dividend pay-out ratio**

According to Walter’s model when the return on investment is more than the cost of equity capital (10%), the price per share increases as the dividend pay-out ratio decreases. Hence, the optimum dividend pay-out ratio in this case is nil or 0 (zero).

**(iv) Market price per share at optimum dividend pay-out ratio**

At a pay-out ratio of zero, the market value of the company’s share will be:

P = $\dfrac{0 + \dfrac{0.20}{0.10}(5 - 0)}{0.10}$ = ₹ 100
#### Approach
The capitalisation rate is the inverse of the P/E ratio; compare it with the return on investment to see which way Walter's model pushes the pay-out.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.capbud.rationing
difficulty: easy
q: 2
a: 6
---
#### Question
A company has ₹ 1,00,000 available for investment and has identified the following four investments in which to invest.

| Project | Investment (₹) | NPV (₹) |
|---|---:|---:|
| C | 40,000 | 20,000 |
| D | 1,00,000 | 35,000 |
| E | 50,000 | 24,000 |
| F | 60,000 | 18,000 |

You are required to optimize the returns from a package of projects within the capital spending limit if-

(i) The projects are independent of each other and are divisible.

(ii) The projects are not divisible.
#### Answer
**(i) Optimizing returns when projects are independent and divisible.**

**Computation of NPVs per Re. 1 of Investment and Ranking of the Projects**

| Project | Investment (₹) | NPV (₹) | NPV per Re. 1 invested (₹) | Ranking |
|---|---:|---:|---:|---:|
| C | 40,000 | 20,000 | 0.50 | 1 |
| D | 1,00,000 | 35,000 | 0.35 | 3 |
| E | 50,000 | 24,000 | 0.48 | 2 |
| F | 60,000 | 18,000 | 0.30 | 4 |

**Building up of a Package of Projects based on their Rankings**

| Project | Investment (₹) | NPV (₹) |
|---|---:|---:|
| C | 40,000 | 20,000 |
| E | 50,000 | 24,000 |
| D (1/10th of Project) | 10,000 | 3,500 |
| Total | 1,00,000 | 47,500 |

The company would be well advised to invest in Projects C, E and D (1/10th) and reject Project F to optimise return within the amount of ₹ 1,00,000 available for investment.

**(ii) Optimizing returns when projects are indivisible.**

| Package of Project | Investment (₹) | Total NPV (₹) |
|---|---:|---:|
| C and E | 90,000 (40,000 + 50,000) | 44,000 (20,000 + 24,000) |
| C and F | 1,00,000 (40,000 + 60,000) | 38,000 (20,000 + 18,000) |
| Only D | 1,00,000 | 35,000 |

The company would be well advised to invest in Projects C and E to optimise return within the amount of ₹ 1,00,000 available for investment.
#### Approach
For divisible projects rank by NPV per rupee invested and fill the budget in that order, taking a fraction of the last one; for indivisible projects compare the total NPV of every package that fits the budget.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.lev.leverage, fm.cs.ebiteps
difficulty: medium
q: 7
a: 7-9
note: Kept as printed: ICAI's Degree of Financial Leverage line reads "EBIT/EBT = ₹ 9,60,000/₹ 7,60,000 = 1.033 (approx.)" and the first Degree of Combined Leverage line "= ₹ 9,60,000/₹ 7,60,000 = 1.304 (approx.)", although its own statement gives EBIT ₹ 7,60,000 and EBT ₹ 7,36,000 (the results 1.033 and 1.304 are those of the statement's figures); also "Earning before interest and tax", "If EPS is Re. 1" (answer).
---
#### Question
The Balance Sheet of Gitashree Ltd. is given below:

| Liabilities | | (₹) |
|---|---:|---:|
| Shareholders’ fund | | |
| Equity share capital of ₹ 10 each | ₹ 1,80,000 | |
| Retained earnings | ₹ 60,000 | 2,40,000 |
| Non-current liabilities 10% debt | | 2,40,000 |
| Current liabilities | | 1,20,000 |
| | | **6,00,000** |
| **Assets** | | |
| Fixed Assets | | 4,50,000 |
| Current Assets | | 1,50,000 |
| | | **6,00,000** |

The company's total asset turnover ratio is 4. Its fixed operating cost is ₹ 2,00,000 and its variable operating cost ratio is 60%. The income tax rate is 30%.

Calculate:

(i) (a) Degree of Operating leverage.

(b) Degree of Financial leverage.

(c) Degree of Combined leverage.

(ii) Find out EBIT if EPS is (a) ₹ 1 (b) ₹ 2 and (c) ₹ 0.
#### Answer
**Working Notes:**

Total Assets = ₹ 6,00,000

Total Asset Turnover Ratio i.e. = $\dfrac{\text{Total Sales}}{\text{Total Assets}}$ = 4

Hence, Total Sales = ₹ 6,00,000 × 4 = ₹ 24,00,000

**Computation of Profits after Tax (PAT)**

| Particulars | (₹) |
|---|---:|
| Sales | 24,00,000 |
| *Less*: Variable operating cost @ 60% | 14,40,000 |
| Contribution | 9,60,000 |
| *Less*: Fixed operating cost (other than Interest) | 2,00,000 |
| EBIT (Earning before interest and tax) | 7,60,000 |
| *Less*: Interest on debt (10% × 2,40,000) | 24,000 |
| EBT (Earning before tax) | 7,36,000 |
| *Less*: Tax 30% | 2,20,800 |
| EAT (Earning after tax) | 5,15,200 |

**(i) (a) Degree of Operating Leverage**

Degree of Operating leverage = $\dfrac{\text{Contribution}}{\text{EBIT}} = \dfrac{₹ 9{,}60{,}000}{₹ 7{,}60{,}000}$ = 1.263 (approx.)

**(b) Degree of Financial Leverage**

Degree of Financial Leverage = $\dfrac{\text{EBIT}}{\text{EBT}} = \dfrac{₹ 9{,}60{,}000}{₹ 7{,}60{,}000}$ = 1.033 (approx.)

**(c) Degree of Combined Leverage**

Degree of Combined Leverage = $\dfrac{\text{Contribution}}{\text{EBIT}} \times \dfrac{\text{EBIT}}{\text{EBT}} = \dfrac{\text{Contribution}}{\text{EBT}}$

= $\dfrac{₹ 9{,}60{,}000}{₹ 7{,}60{,}000}$ = 1.304 (approx.)

**Or**

Degree of Combined Leverage = Degree of Operating Leverage × Degree of Financial Leverage

= 1.263 × 1.033 = 1.304 (approx.)

**(ii) (a) If EPS is Re. 1**

EPS = $\dfrac{(\text{EBIT} - \text{Interest})(1 - \text{tax})}{\text{No of equity shares}}$

Or, 1 = $\dfrac{(\text{EBIT} - ₹ 24{,}000)\ (1 - 0.30)}{18{,}000}$

Or, EBIT = ₹ 49,714 (approx.)

**(b) If EPS is ₹ 2**

2 = $\dfrac{(\text{EBIT} - ₹ 24{,}000)\ (1 - 0.30)}{18{,}000}$

Or, EBIT = ₹ 75,429 (approx.)

**(c) If EPS is ₹ 0**

0 = $\dfrac{(\text{EBIT} - ₹ 24{,}000)\ (1 - 0.30)}{18{,}000}$

Or, EBIT = ₹ 24,000

**Alternatively,** if EPS is 0 (zero), EBIT will be equal to interest on debt i.e. ₹ 24,000.
#### Approach
Sales come from the asset turnover ratio and total assets; build the income statement down to EBT, then read the three leverages off it, and for (ii) solve the EPS formula for EBIT with the number of equity shares.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.wc.cash, fm.ratio.liquidity
difficulty: medium
q: 9
a: 9-11
note: Requirements (a) and (b) share one marks note (10) and one connected answer: one item.
---
#### Question
Slide Ltd. is preparing a cash flow forecast for the three months period from January to the end of March. The following sales volumes have been forecasted:

| Months | December | January | February | March | April |
|---|---:|---:|---:|---:|---:|
| **Sales (units)** | 1,800 | 1,875 | 1,950 | 2,100 | 2,250 |

Selling price per unit is ₹ 600. Sales are all on one month credit. Production of goods for sale takes place one month before sales. Each unit produced requires two units of raw materials costing ₹ 150 per unit. No raw material inventory is held. Raw materials purchases are on one month credit. Variable overheads and wages equal to ₹ 100 per unit are incurred during production and paid in the month of production. The opening cash balance on 1st January is expected to be ₹ 35,000. A long term loan of ₹ 2,00,000 is expected to be received in the month of March. A machine costing ₹ 3,00,000 will be purchased in March.

(a) Prepare a cash budget for the months of January, February and March and calculate the cash balance at the end of each month in the three months period.

(b) Calculate the forecast current ratio at the end of the three months period.
#### Answer
**Working Notes:**

**(1) Calculation of Collection from Trade Receivables:**

| Particulars | December | January | February | March |
|---|---:|---:|---:|---:|
| Sales (units) | 1,800 | 1,875 | 1,950 | 2,100 |
| Sales (@ ₹ 600 per unit) / Trade Receivables (Debtors) (₹) | 10,80,000 | 11,25,000 | 11,70,000 | 12,60,000 |
| Collection from Trade Receivables (Debtors) (₹) | | 10,80,000 | 11,25,000 | 11,70,000 |

**(2) Calculation of Payment to Trade Payables:**

| Particulars | December | January | February | March |
|---|---:|---:|---:|---:|
| Output (units) | 1,875 | 1,950 | 2,100 | 2,250 |
| Raw Material (2 units per output) (units) | 3,750 | 3,900 | 4,200 | 4,500 |
| Raw Material (@ ₹ 150 per unit) / Trade Payables (Creditors) (₹) | 5,62,500 | 5,85,000 | 6,30,000 | 6,75,000 |
| Payment to Trade Payables (Creditors) (₹) | | 5,62,500 | 5,85,000 | 6,30,000 |

**(3) Calculation of Variable Overheads and Wages:**

| Particulars | January | February | March |
|---|---:|---:|---:|
| Output (units) | 1,950 | 2,100 | 2,250 |
| Payment in the same month @ ₹ 100 per unit (₹) | 1,95,000 | 2,10,000 | 2,25,000 |

**(a) Preparation of Cash Budget**

| Particulars | January (₹) | February (₹) | March (₹) |
|---|---:|---:|---:|
| Opening Balance | 35,000 | 3,57,500 | 6,87,500 |
| **Receipts:** | | | |
| Collection from Trade Receivables (Debtors) | 10,80,000 | 11,25,000 | 11,70,000 |
| Receipt of Long-Term Loan | | | 2,00,000 |
| **Total (A)** | 11,15,000 | 14,82,500 | 20,57,500 |
| **Payments:** | | | |
| Trade Payables (Creditors) for Materials | 5,62,500 | 5,85,000 | 6,30,000 |
| Variable Overheads and Wages | 1,95,000 | 2,10,000 | 2,25,000 |
| Purchase of Machinery | | | 3,00,000 |
| **Total (B)** | 7,57,500 | 7,95,000 | 11,55,000 |
| Closing Balance (A – B) | **3,57,500** | **6,87,500** | **9,02,500** |

**(b) Calculation of Current Ratio**

| Particulars | March (₹) |
|---|---:|
| Output Inventory (i.e. units produced in March)<br>[(2,250 units x 2 units of raw material per unit of output x ₹ 150 per unit of raw material) + 2,250 units x ₹ 100 for variable overheads and wages]<br>**or,** [6,75,000 + 2,25,000] from Working Notes 2 and 3 | 9,00,000 |
| Trade Receivables (Debtors) | 12,60,000 |
| Cash Balance | 9,02,500 |
| **Current Assets** | **30,62,500** |
| Trade Payables (Creditors) | 6,75,000 |
| **Current Liabilities** | **6,75,000** |
| **Current Ratio (Current Assets / Current Liabilities)** | **4.537 approx.** |
#### Approach
Shift each flow by its lag: sales are collected a month later, production runs a month ahead of sales and materials are paid a month after purchase; at the end of March the unsold output, the March debtors and the cash are the current assets.

---
item: q4
qno: 4
marks: 10
type: descriptive
oos: yes
difficulty: hard
q: 11
a: 11-14
note: Out of syllabus (old scheme): a lease-or-buy evaluation (NPV of leasing over buying, with the depreciation and interest tax shields). The January 2027 Study Material for Paper 6A teaches lease financing only descriptively (Types of Financing, 6. Lease Financing) and says "Practical problems for lease financing are covered at Final level in paper - Financial Services and Capital Markets", so the item is flagged oos and carries no tag. Kept as printed: "had been purchases", "The valuation process involves – a) … and then, b) …", "equal installment", "Net of tax interest rate = 0.10X (1-.30)", the Table 2 row 4 interest "14,523 (bal. fig.)" (answer).
---
#### Question
Loft Ltd. is considering an investment in new technology that will reduce operating costs through increasing efficiency. The new technology will cost ₹ 5,00,000 and have a four year life at the end of which it will have a residual value of ₹ 50,000.

An annual license fee of ₹ 52,000 is payable to operate the machine. The purchase can be financed by 10% loan payable in equal installments at the end of each of four years. The depreciation is to be charged as per reducing balance method. The rate of depreciation is 25% per annum.

Alternatively, Loft Ltd. could lease the new technology. The Company would pay four annual lease rentals of ₹ 1,90,000 per year. The annual lease rentals include the cost of license fee. Tax rate is 30%. Compute the incremental cash flows under each option. What would be the appropriate rate at which these cash flows have to be discounted? Discount the incremental cash flows under each option and decide which option is better - buy or lease?

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| DF @ 7% | 0.935 | 0.873 | 0.816 | 0.763 |
| DF @ 10% | 0.909 | 0.826 | 0.751 | 0.683 |
#### Answer
(1) The buy or lease decision means computation of NPV arising from lease decision i.e. computation of valuation advantage of lease over buy. If the value is positive then we go for lease, otherwise we buy.

(2) The valuation process involves – a) finding incremental cash flow of lease over buy, and then, b) discounting the incremental cash flow by net of tax interest rate of equivalent loan (to purchase the asset in question).

If we go for lease, there would be cash outflow in the form of net of tax lease rent from year 1 to 4. Net of tax lease rent per annum = ₹ 1,90,000 x (1-.30) = ₹ 1,33,000.

Again, if the equipment had been purchases there would have been tax saving of depreciation = Depreciation x tax rate. Here, the tax saving or tax shield is available for 4 years. But under lease the benefit accrues to lessor. For lessee it is a negative cash flow as advantage is not available to him under lease arrangement as lessor is considered the legal owner of the asset for claiming depreciation under Income tax law. The depreciation schedule and tax shield on depreciation are given in table 1.

**Table 1**

| Year | Cost/ opening balance (₹) | Depreciation @ 25% (₹) | Closing balance (₹) | Tax shield (₹) |
|---:|---:|---:|---:|---:|
| 1 | 5,00,000 | 1,25,000 | 3,75,000 | 37,500 |
| 2 | 3,75,000 | 93,750 | 2,81,250 | 28,125 |
| 3 | 2,81,250 | 70,312.50 | 2,10,937.50 | 21,093.75 |
| 4 | 2,10,937.50 | 52,734.38 | 1,58,203.12 | 15,820.31 |

(3) Further, if the equipment had been purchased there would have been tax saving of interest on loan = interest on loan x tax rate. Here, the tax saving or tax shield is available for 4 years. For lessee it is a negative cash flow as advantage is not available to him under lease arrangement.

The loan amount would have been repayable together with the interest at the rate of 10% in equal installment at the end of each year. The PVAF at the rate of 10% for 4 years is 3.169 (.909 + .826 + .751 + .683), the amount payable would have been-

Annual Installment = $\dfrac{₹ 5{,}00{,}000}{3.169}$ = ₹ 1,57,778 (approx.)

The interest expense schedule and tax shield on interest expense are given in table 2.

**Table 2**

| Year | Total Installment (₹) | Interest (₹) | Principal (₹) | Principal amount outstanding (₹) | Tax shield (₹) |
|---:|---:|---:|---:|---:|---:|
| 1 | 1,57,778 | 50,000 | 1,07,778 | 3,92,222 | 15,000 |
| 2 | 1,57,778 | 39,222 | 1,18,556 | 2,73,666 | 11,766.6 |
| 3 | 1,57,778 | 27,367 | 1,30,411 | 1,43,255 | 8,210.1 |
| 4 | 1,57,778 | 14,523 (bal. fig.) | 1,43,255 | ------ | 4,356.9 |

(4) After 4 years the equipment is sold for ₹ 50,000 which is a cash outflow due to lease over buy

Loss on sale = ₹ (1,58,203.12 - 50,000)

= ₹ 1,08,203.12

Tax savings on loss = 30% of ₹ 1,08,203.12 = ₹ 32,460.94

This further tax shield has to be accounted for in the year 4.

(5) If the equipment is taken on lease, the cash outflow on a/c of lease rental, depreciation tax shield is given in table 3

**Table 3**

| Year | Net of tax lease rental (₹) | Depreciation tax shield (₹) (from Table 1) | Interest tax shield (₹) (from Table 2) | Total (₹) |
|---:|---:|---:|---:|---:|
| 1 | 1,33,000 | 37,500 | 15,000 | 1,85,500 |
| 2 | 1,33,000 | 28,125 | 11,766.6 | 1,72,891.6 |
| 3 | 1,33,000 | 21,093.75 | 8,210.1 | 1,62,303.85 |
| 4 | 1,33,000 | 15,820.31 | 4,356.9 | 1,53,177.21 |

(6) Net of tax interest rate = 0.10X (1-.30) = 0.07

**Calculation of NPV for lease over buy option** **(Amount in ₹)**

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| Loan Installment | 1,57,778 | 1,57,778 | 1,57,778 | 1,57,778 |
| License Fees (net of Taxes) | 36,400 | 36,400 | 36,400 | 36,400 |
| Amount from sale of Machine | | | | (50,000) |
| Tax saving on loss on sale | | | | (32,460.94) |
| Total Tax Shield on Lease Rent, Interest and Depreciation | (1,85,500) | (1,72,891.60) | (1,62,303.85) | (1,53,177.21) |
| Total Cash flow | 8,678.00 | 21,286.40 | 31,874.15 | (41,460.15) |
| Discounting Factor @7% | 0.935 | 0.873 | 0.816 | 0.763 |
| Discounted Cash Flow | 8,113.93 | 18,583.03 | 26,009.31 | (31,634.09) |
| **NPV** [8,113.93 + 18,583.03 + 26,009.31 + (31,634.09)] | | | | **21,072.17** |

Since, NPV or value of the lease is positive, the equipment should be taken on lease.

---
item: q5
qno: 5
marks: 10
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: medium
q: 14
a: 14-16
note: Requirements (a)-(d) share one marks note (10) and one connected answer: one item. Kept as printed: "₹ 1 crore earning" and "the ratio of 3: 1" (question); "D1 = DO (1+ g)" with a letter O, "(i.e = ₹ 2)", "Rs. 2 (1.05)" beside ₹ elsewhere and "Particular" as the WACC table's first heading (answer).
---
#### Question
A Company wants to raise additional finance of ₹ 5 crore in the next year. The company expects to retain ₹ 1 crore earning next year. Further details are as follows:

(i) The amount will be raised by equity and debt in the ratio of 3: 1.

(ii) The additional issue of equity shares will result in price per share being fixed at ₹ 25.

(iii) The debt capital raised by way of term loan will cost 10% for the first ₹ 75 lakh and 12% for the next ₹ 50 lakh.

(iv) The net expected dividend on equity shares is ₹ 2.00 per share. The dividend is expected to grow at the rate of 5%.

(v) Income tax rate is 25%.

**You are required:**

(a) To determine the amount of equity and debt for raising additional finance.

(b) To determine the post-tax average cost of additional debt.

(c) To determine the cost of retained earnings and cost of equity.

(d) To compute the overall weighted average cost of additional finance after tax.
#### Answer
**(a) Determination of the amount of equity and debt for raising additional finance:**

**Pattern of raising additional finance**

| | | |
|---|---|---|
| Equity | 3/4 of ₹ 5 Crore | **= ₹ 3.75 Crore** |
| Debt | 1/4 of ₹ 5 Crore | **= ₹ 1.25 Crore** |

**The capital structure after raising additional finance:**

| Particulars | | (₹ In crore) |
|---|---|---:|
| **Shareholders’ Funds** | | |
| Equity Capital | (3.75 – 1.00) | 2.75 |
| Retained earnings | | 1.00 |
| Debt (Interest at 10% p.a.) | | 0.75 |
| (Interest at 12% p.a.) | (1.25-0.75) | 0.50 |
| Total Funds | | 5.00 |

**(b) Determination of post-tax average cost of additional debt**

$K_d$ = I (1 – t)

Where,

I = Interest Rate

t = Corporate tax-rate

On ₹ 75,00,000 = 10% (1 – 0.25) = 7.5% or 0.075

On ₹ 50,00,000 = 12% (1 – 0.25) = 9% or 0.09

**Average Cost of Debt**

= $\dfrac{(₹ 75{,}00{,}000 \times 0.075) + (₹ 50{,}00{,}000 \times 0.09)}{1{,}25{,}00{,}000}$ x 100

= $\dfrac{₹ 5{,}62{,}500 + ₹ 4{,}50{,}000}{1{,}25{,}00{,}000}$ x 100 = 8.10%

**(c)** Determination of cost of retained earnings and cost of equity (Applying Dividend growth model):

$K_e = \dfrac{D_1}{P_0} + g$

Where,

$K_e$ = Cost of equity

$D_1 = D_O (1+ g)$

$D_0$ = Dividend paid (i.e = ₹ 2)

g = Growth rate

$P_0$ = Current market price per share

Then, $K_e = \dfrac{\text{Rs. } 2\ (1.05)}{\text{Rs. } 25} + 0.05 = \dfrac{\text{Rs. } 2.1}{\text{Rs. } 25}$ + 0.05 = 0.084 + 0.05 = 0.134 = 13.4%

Cost of retained earnings equals to cost of Equity i.e. 13.4%

**(d)** Computation of overall weighted average after tax cost of additional finance

| Particular | (₹) | Weights | Cost of funds | Weighted Cost (%) |
|---|---:|---:|---:|---:|
| Equity (including retained earnings) | 3,75,00,000 | 3/4 | 13.4% | 10.05 |
| Debt | 1,25,00,000 | 1/4 | 8.1% | 2.025 |
| WACC | 5,00,00,000 | | | **12.075** |
#### Approach
Split the ₹ 5 crore 3 : 1 first, so the debt falls into its two interest slabs and the equity is part retained earnings, part new issue; then cost each source after tax and weight them.

---
item: q6a
qno: 6
part: (a)
marks: 3
type: descriptive
tags: fm.intro.role
difficulty: easy
q: 16
a: 16-17
---
#### Question
Briefly explain the three finance function decisions.
#### Answer
**The finance functions are divided into long term and short term functions/ decisions:**

**Long term Finance Function Decisions**

**(i) Investment decisions (I)**: These decisions relate to the selection of assets in which funds will be invested by a firm. Funds procured from different sources have to be invested in various kinds of assets. Long term funds are used in a project for various fixed assets and also for current assets.

**(ii) Financing decisions (F):** These decisions relate to acquiring the optimum finance to meet financial objectives and seeing that fixed and working capital are effectively managed. The financial manager needs to possess a good knowledge of the sources of available funds and their respective costs and needs to ensure that the company has a sound capital structure, i.e. a proper balance between equity capital and debt.

**(iii) Dividend decisions (D):** These decisions relate to the determination as to how much and how frequently cash can be paid out of the profits of an organisation as income for its owners/shareholders. The owner of any profit-making organization looks for reward for his investment in two ways, the growth of the capital invested and the cash paid out as income; for a sole trader this income would be termed as drawings and for a limited liability company the term is *dividends*.

**Short- term Finance Decisions/Function**

**Working capital Management (WCM):** Generally short term decision is reduced to management of current asset and current liability (i.e., working capital Management).

---
item: q6b
qno: 6
part: (b)
marks: 3
type: descriptive
tags: fm.capbud.npv
difficulty: easy
q: 16
a: 17
---
#### Question
Explain the steps while using the equivalent annualized criterion.
#### Answer
**Equivalent Annualized Criterion**: This method involves the following steps-

(i) Compute NPV using the WACC or discounting rate.

(ii) Compute Present Value Annuity Factor (PVAF) of discounting factor used above for the period of each project.

(iii) Divide NPV computed under step (i) by PVAF as computed under step (ii) and compare the values.

---
item: q6c
qno: 6
part: (c)
marks: 4
type: descriptive
tags: fm.coc.wacc
difficulty: easy
q: 16
a: 17
note: Kept as printed: "a particulars project", "The performance of a project or business in compared against" and "customer of segment of customers" (answer).
---
#### Question
Explain the significance of Cost of Capital.
#### Answer
**Significance of the Cost of Capital:** The cost of capital is important to arrive at correct amount and helps the management or an investor to take an appropriate decision. The correct cost of capital helps in the following decision making:

**(i) Evaluation of investment options:** The estimated benefits (future cashflows) from available investment opportunities (business or project) are converted into the present value of benefits by discounting them with the relevant cost of capital. Here it is pertinent to mention that every investment option may have different cost of capital hence it is very important to use the cost of capital which is relevant to the options available. Here Internal Rate of Return (IRR) is treated as cost of capital for evaluation of two options (projects).

**(ii) Performance Appraisal:** Cost of capital is used to appraise the performance of a particulars project or business. The performance of a project or business in compared against the cost of capital which is known here as cut-off rate or hurdle rate.

**(iii) Designing of optimum credit policy:** While appraising the credit period to be allowed to the customers, the cost of allowing credit period is compared against the benefit/ profit earned by providing credit to customer of segment of customers. Here cost of capital is used to arrive at the present value of cost and benefits received.

---
item: q6c-or
qno: 6
part: (c)
alt: q6c
marks: 4
type: descriptive
tags: fm.sources.short
difficulty: easy
q: 16
a: 17-19
note: ICAI's answer lists eleven sources, more than the four asked, and lists Certificates of Deposit twice ((vi) and (x)); kept as printed, with "these receipts increases", "an important sources of short-term finance" and "socio- economic" (answer).
---
#### Question
Briefly describe any four sources of short-term finance.
#### Answer
**Sources of Short Term Finance:** There are various sources available to meet short-term needs of finance. The different sources are discussed below-

**(i) Trade Credit:** It represents credit granted by suppliers of goods, etc., as an incident of sale. The usual duration of such credit is 15 to 90 days. It generates automatically in the course of business and is common to almost all business operations. It can be in the form of an 'open account' or 'bills payable'.

**(ii) Accrued Expenses and Deferred Income:** Accrued expenses represent liabilities which a company has to pay for the services which it has already received like wages, taxes, interest and dividends. Such expenses arise out of the day-to-day activities of the company and hence represent a spontaneous source of finance.

**Deferred Income:** These are the amounts received by a company in lieu of goods and services to be provided in the future. Since these receipts increases a company’s liquidity, they are also considered to be an important sources of short-term finance.

**(iii) Advances from Customers:** Manufacturers and contractors engaged in producing or constructing costly goods involving considerable length of manufacturing or construction time usually demand advance money from their customers at the time of accepting their orders for executing their contracts or supplying the goods. This is a cost free source of finance and really useful.

**(iv) Commercial Paper:** A Commercial Paper is an unsecured money market instrument issued in the form of a promissory note. The Reserve Bank of India introduced the commercial paper scheme in the year 1989 with a view to enabling highly rated corporate borrowers to diversify their sources of short-term borrowings and to provide an additional instrument to investors.

**(v) Treasury Bills:** Treasury bills are a class of Central Government Securities. Treasury bills, commonly referred to as T-Bills are issued by Government of India to meet short term borrowing requirements with maturities ranging between 14 to 364 days.

**(vi) Certificates of Deposit (CD):** A certificate of deposit (CD) is basically a savings certificate with a fixed maturity date of not less than 15 days up to a maximum of one year.

**(vii) Bank Advances:** Banks receive deposits from public for different periods at varying rates of interest. These funds are invested and lent in such a manner that when required, they may be called back. Lending results in gross revenues out of which costs, such as interest on deposits, administrative costs, etc., are met and a reasonable profit is made. A bank's lending policy is not merely profit motivated but has to also keep in mind the socio- economic development of the country. Some of the facilities provided by banks are Short Term Loans, Overdraft, Cash Credits, Advances against goods, Bills Purchased/Discounted.

**(viii) Financing of Export Trade by Banks:** Exports play an important role in accelerating the economic growth of developing countries like India. Of the several factors influencing export growth, credit is a very important factor which enables exporters in efficiently executing their export orders. The commercial banks provide short-term export finance mainly by way of pre and post-shipment credit. Export finance is granted in Rupees as well as in foreign currency.

**(ix) Inter Corporate Deposits:** The companies can borrow funds for a short period say 6 months from other companies which have surplus liquidity. The rate of interest on inter corporate deposits varies depending upon the amount involved and time period.

**(x) Certificate of Deposit (CD):** The certificate of deposit is a document of title similar to a time deposit receipt issued by a bank except that there is no prescribed interest rate on such funds.

The main advantage of CD is that banker is not required to encash the deposit before maturity period and the investor is assured of liquidity because he can sell the CD in secondary market.

**(xi) Public Deposits:** Public deposits are very important source of short-term and medium term finances particularly due to credit squeeze by the Reserve Bank of India. A company can accept public deposits subject to the stipulations of Reserve Bank of India from time to time maximum up to 35 per cent of its paid up capital and reserves, from the public and shareholders. These deposits may be accepted for a period of six months to three years. Public deposits are unsecured loans; they should not be used for acquiring fixed assets since they are to be repaid within a period of 3 years. These are mainly used to finance working capital requirements.
