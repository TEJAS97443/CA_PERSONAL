<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-pyq-nov2022
paper: p8
kind: pyq
attempt: nov2022
qfile: old/p8/pyq-nov2022-a.pdf
afile: old/p8/pyq-nov2022-a.pdf
paperfile: old/p8/pyq-nov2022-q.pdf
choice: q1; any 4 of q2-q6
q: 1
accept: 150000
status: checked
by: tx-40
date: 2026-10-20
note: Old-scheme Paper 8 (Financial Management and Economics for Finance), November 2022: only Section A Financial Management (pp.1-16 of ICAI's Suggested Answers) is transcribed; Section B Economics for Finance (pp.17-27) is not part of PassBook (no blocks cite it). Text from the Suggested Answers (qfile and afile), which reproduce every question (in italics) before its answer; the question-paper booklet scan (OCR text) is linked as paperfile and was not used for the text. Instructions: ICAI's Section A box on p.1, which gives the choice rule (Q1 20 marks + four of Q2-Q6 at 10 each = 60). minutes: left out (ICAI prints 3 hours for the whole 100-mark paper; the build prorates 108 minutes for the FM section). Item model: Q1 (a)-(d) are separate 5-mark questions; Q2 (requirements (1) and (2)) and Q4 (situations (i) and (ii)) each carry one marks note and one connected answer, so each is one item; Q5(a) 4 marks and Q5(b) 6 marks are separate items; Q6(c) has an OR alternative (q6c-or, alt: q6c). Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics; Q1(d) (risk-adjusted discount rate) is out of syllabus (oos, see its note). ICAI's own text kept as printed: "0.4." in the Q1(d) table and "Co efficient of Variation" in its answer; the unmatched "]" in "x 100] = 12%" (Q1(b)); "WKT,", "1.5 EBIT -15000", the labels "3.," and "4.," and "60000" without commas in the Profit - Loss Statement (Q2); "equal to it written down value", "Thereafter the firm, can buy", "Advise:" and the year-5 figure "(60000 – 18985 – 1898) = 39,117" with its PV 22,179 printed without brackets (Q3); "considering to purchase", "purchasing of diagnostic machine" (Q4); "M -M approach", "(NOI/Ko) X 100", "5000" and "55005.5" without commas in the first table (Q5(a)); "the year 202I", "can be spend" (Q5(b)); "What this bond is called", "called as" (Q6(a), (c)); "Treasury department carry out" (Q6(b)). Repaired extraction damage only, read from the rendered pages: the ∴ and × signs (Symbol font, dropped by the text layer); the stacked fractions, roots and the subscripts of K_p, K_d, K_e, K_O, K_eu, D_1, P_O, P_1 written in KaTeX; the superscripts of 1st, 7th and 8th; the Rupee-font backtick as ₹. Not transcribed: the paper title "PAPER – 8 : FINANCIAL MANAGEMENT AND ECONOMICS FOR FINANCE" on p.1, underline rules under totals, and the "OR" / "(OR)" lines that separate Q6(c) from its alternative. Tables: the new-vehicle tax-shield table of Q3 prints its title inside the table, above the column heads (written as a two-level header); the second-hand table's fifth column (the scrap values printed beside the table) has no heading; in Q5(a) the two fractions ICAI prints under the first answer table are its last row (see the item note). check.py: the numbers accepted are the 8 of the paper's title on p.1; the question numbers 1 to 6, which check.py cannot see in the PDF because ICAI's "Question N" lines recur on so many pages that check.py takes them for a running head (so the question side and the answer side each count one too many, 1 once on each side of Q1 and 2 to 6 twice); and 1,50,000 in Q1(b)(iii)'s last formula, which the text layer splits as "1,50, 000" (giving 150 and 0) while the rendered page prints 1,50,000.
---
#### Instructions
**SECTION – A: FINANCIAL MANAGEMENT**

Question No. **1** is compulsory.

Attempt any **four** questions out of the remaining **five** questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the respective answers.

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.wc.cash
difficulty: easy
q: 1
a: 3
---
#### Question
K Ltd. has a Quarterly cash outflow of ₹ 9,00,000 arising uniformly during the Quarter. The company has an Investment portfolio of Marketable Securities. It plans to meet the demands for cash by periodically selling marketable securities. The marketable securities are generating a return of 12% p.a. Transaction cost of converting investments to cash is ₹ 60. The company uses Baumol model to find out the optimal transaction size for converting marketable securities into cash.

Consider 360 days in a year.

You are required to calculate

(i) Company's average cash balance,

(ii) Number of conversions each year and

(iii) Time interval between two conversions.
#### Answer
**(i) Computation of Average Cash balance:**

Annual cash outflow (U) = 9,00,000 x 4 = ₹ 36,00,000

Fixed cost per transaction (P) = ₹ 60

Opportunity cost of one rupee p.a. (S) = $\dfrac{12}{100}$ = 0.12

Optimum cash balance (C) = $\sqrt{\dfrac{2UP}{S}} = \sqrt{\dfrac{2 \times 36{,}00{,}000 \times 60}{0.12}}$ = ₹ 60,000

∴ Average Cash balance = $\dfrac{(0 + 60{,}000)}{2}$ = ₹ 30,000

**(ii) Number of conversions p.a.**

Annual cash outflow = ₹ 36,00,000

Optimum cash balance = ₹ 60,000

∴ No. of conversions p.a. = $\dfrac{36{,}00{,}000}{60{,}000}$ = 60

**(iii) Time interval between two conversions**

No. of days in a year = 360

No. of conversions p.a. = 60

∴ Time interval = $\dfrac{360}{60}$ = 6 days
#### Approach
In the Baumol model the annual cash need is four quarters' outflow, the opportunity cost is the securities' return, and the average balance is half the optimum conversion size.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.ratio.profit
difficulty: medium
q: 1-2
a: 3-5
---
#### Question
The following figures are related to the trading activities of M Ltd.

| | |
|---|---|
| Total assets | ₹ 10,00,000 |
| Debt to total assets | 50% |
| Interest cost | 10% per year |
| Direct Cost | 10 times of the interest cost |
| Operating Exp. | ₹ 1,00,000 |

The goods are sold to customers at a margin of 50% on the direct cost

Tax Rate is 30%

You are required to calculate

(i) Net profit margin

(ii) Net operating profit margin

(iii) Return on assets

(iv) Return on owner’s equity
#### Answer
**(i) Computation of Net Profit Margin**

Debt = (10,00,000 x 50%) = ₹ 5,00,000

Interest cost = 5,00,000 x $\left(\dfrac{10}{100}\right)$ = ₹ 50,000

Direct cost = 50,000 x 10 = ₹ 5,00,000

Sales = 5,00,000 x 150% = ₹ 7,50,000

| | (₹) |
|---|---:|
| Gross profit = 7,50,000 – 5,00,000 | = 2,50,000 |
| Less: Operating expenses | = 1,00,000 |
| ∴ EBIT | = 1,50,000 |
| Less: Interest | = 50,000 |
| ∴ EBT | = 1,00,000 |
| Less: Tax @ 30% | = 30,000 |
| ∴ PAT | = 70,000 |

Net profit margin = $\left(\dfrac{70{,}000}{7{,}50{,}000}\right) \times 100$ = 9.33%

**(ii) Net Operating Profit margin**

Net operating profit margin = $\left(\dfrac{\text{EBIT}}{\text{Sales}}\right) \times 100$

= $\left(\dfrac{1{,}50{,}000}{7{,}50{,}000}\right) \times 100$ = 20%

**(iii) Return on Assets**

Return on Assets = $\left[\left(\dfrac{\text{PAT + Interest}}{\text{Total Assets}}\right)\right]$ x 100

= $\left[\left(\dfrac{1{,}20{,}000}{10{,}00{,}000}\right)\right]$ x 100] = 12%

**(OR)**

Return on Assets = $\dfrac{\text{EBIT}}{\text{Assets}} \times 100$

= $\dfrac{1{,}50{,}000}{10{,}00{,}000} \times 100$ = 15%

**(OR)**

= $\dfrac{70{,}000}{10{,}00{,}000} \times 100$ = 7%

**(OR)**

= $\left[\dfrac{1{,}50{,}000(1-0.3)}{10{,}00{,}000}\right]$ x 100 = 10.5%

**(iv) Return on owner’s equity**

Return = $\left(\dfrac{\text{PAT}}{\text{Owner's equity}}\right)$ x 100

= $\left(\dfrac{70{,}000}{5{,}00{,}000}\right)$ x 100 = 14%
#### Approach
Build the income statement first: debt from the debt ratio, interest from debt, direct cost from interest, sales at a 50% mark-up on direct cost. Owner's equity is total assets less debt.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.coc.wacc, fm.coc.debt
difficulty: medium
q: 2
a: 5
---
#### Question
The following is the extract of the Balance Sheet of M/s KD Ltd.:

| Particulars | Amount (₹) |
|---|---:|
| Ordinary shares (Face Value ₹ 10/- per share) | 5,00,000 |
| Share Premium | 1,00,000 |
| Retained Profits | 6,00,000 |
| 8% Preference Shares (Face Value ₹ 25/- per share) | 4,00,000 |
| 12% Debentures (Face value ₹ 100/- each) | 6,00,000 |
| | 22,00,000 |

The ordinary shares are currently priced at ₹ 39 ex-dividend and preference share is priced at ₹ 18 cum-dividend. The debentures are selling at 120 percent ex-interest. The applicable tax rate to KD Ltd. is 30 percent. KD Ltd.'s cost of equity has been estimated at 19 percent. Calculate the WACC (weighted average cost of capital) of KD Ltd. on the basis of market value.
#### Answer
**Computation of WACC on the basis of market value**

W.N. 1

Cum-dividend price of Preference shares = ₹ 18

Less: Dividend (8/100) x 25 = ₹ 2

∴ Market Price of Preference shares = ₹ 16

$K_p$ = $\dfrac{2}{16}$ = 0.125 (or) 12.5%

No. of Preference shares = $\left(\dfrac{4{,}00{,}000}{25}\right)$ = 16,000

W.N. 2

Market price of Debentures = $\left(\dfrac{120}{100}\right)$ x 100 = ₹120

$K_d$ = $\left[\dfrac{12\ (1 - 0.3)}{120}\right]$ = 0.07 (or) 7%

No. of Debentures = $\left(\dfrac{6{,}00{,}000}{100}\right)$ = 6,000

W.N.3

Market Price of Equity shares = ₹39

$K_e$ (given) = 19% or 0.19

No. of Equity shares = $\dfrac{5{,}00{,}000}{10}$ = 50,000

| Sources | Market Value (₹) | Nos. | Total Market value (₹) | Weight | Cost of Capital | Product |
|---|---:|---:|---:|---:|---:|---:|
| Equity Shares | 39 | 50,000 | 19,50,000 | 0.6664 | 0.19 | 0.1266 |
| Preference Shares | 16 | 16,000 | 2,56,000 | 0.0875 | 0.125 | 0.0109 |
| Debentures | 120 | 6,000 | 7,20,000 | 0.2461 | 0.07 | 0.0172 |
| | | | | | WACC = | 0.1547 |

**WACC = 0.1547 or 15.47%**
#### Approach
Market values, not book values, give the weights: take the dividend out of the cum-dividend preference price, and value the debentures at 120% of face value. The retained profits and share premium are already inside the equity share price.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: easy
q: 2
a: 6
note: Out of syllabus (old scheme): the risk-adjusted discount rate chosen by the coefficient of variation is Risk Analysis in Capital Budgeting, which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material (its Investment Decisions chapter has no risk analysis). The NPV arithmetic itself is in syllabus: the tag names it. ICAI's own text kept as printed: "0.4." in the discount-rate table and "Co efficient of Variation" in the answer.
---
#### Question
Determine the Risk Adjusted Net Present Value of the following projects:

| | A | B | C |
|---|---:|---:|---:|
| Net cash outlays (₹) | 70,000 | 1,20,000 | 2,20,000 |
| Project life | 5 years | 5 years | 5 years |
| Annual cash inflow (₹) | 30,000 | 42,000 | 70,000 |
| Coefficient of Variation | 2.2 | 1.6 | 1.2 |

The company selects the risk-adjusted discount rate on the basis of the Coefficient of variation.

| Coefficient of Variation | Applicable Risk adjusted discount rate (i) | PVIFA (i,5) |
|---|---|---|
| 0 | 10% | 3.791 |
| 0.4. | 12% | 3.605 |
| 0.8 | 14% | 3.433 |
| 1.2 | 16% | 3.274 |
| 1.6 | 18% | 3.127 |
| 2 | 22% | 2.864 |
| >2.0 | 25% | 2.689 |

Which project should be selected by the company based on Risk Adjusted NPV?
#### Answer
**Selection of project on the basis of Risk Adjusted Net Present Value**

| Particulars | A | B | C |
|---|---:|---:|---:|
| Co efficient of Variation | 2.2 | 1.6 | 1.2 |
| Applicable discount rate (%) | 25 | 18 | 16 |
| Annual cash inflow (₹) | 30,000 | 42,000 | 70,000 |
| Relevant PVIFA | 2.689 | 3.127 | 3.274 |
| **PV of cash inflow (₹)** | **80,670** | **1,31,334** | **2,29,180** |
| Less: Cash outflow (₹) | 70,000 | 1,20,000 | 2,20,000 |
| **Risk adjusted NPV (₹)** | **10,670** | **11,334** | **9,180** |

**Conclusion:** Project B should be selected as its Risk adjusted NPV is high.
#### Approach
Read each project's discount rate and annuity factor off the table by its coefficient of variation (above 2.0 takes the last row), then NPV = annual inflow × PVIFA − outlay.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.lev.leverage, fm.ratio.profit
difficulty: medium
q: 6
a: 6-8
---
#### Question
The following information is available for SS Ltd.

| | |
|---|---|
| Profit volume (PV) ratio | 30% |
| Operating leverage | 2.00 |
| Financial leverage | 1.50 |
| Loan | ₹ 1,25,000 |
| Post-tax interest rate | 5.6% |
| Tax rate | 30% |
| Market Price per share (MPS) | ₹ 140 |
| Price Earnings Ratio (PER) | 10 |

You are required to:

(1) Prepare the Profit-Loss statement of SS Ltd. and

(2) Find out the number of equity shares.
#### Answer
**(1) Preparation of Profit – Loss Statement**

**Working Notes:**

| | |
|---|---:|
| 1. Post tax interest | 5.60% |
| Tax rate | 30% |
| Pre tax interest rate = (5.6/70) x 100 | 8% |
| Loan amount | ₹ 1,25,000 |
| Interest amount = 1,25,000 x 8% | ₹ 10,000 |

Financial Leverage (FL) = $\left(\dfrac{\text{EBIT}}{\text{EBT}}\right) = \left[\dfrac{\text{EBIT}}{(\text{EBIT} - \text{Interest})}\right] = \left[\dfrac{\text{EBIT}}{(\text{EBIT} - 10{,}000)}\right]$

1.5 = $\left[\dfrac{\text{EBIT}}{(\text{EBIT} - 10{,}000)}\right]$

1.5 EBIT -15000 = EBIT

1.5 EBIT – EBIT = 15,000

0.5 EBIT = 15,000

**∴ EBIT = ₹ 30,000**

EBT = EBIT – Interest = 30,000 – 10,000 = ₹ 20,000

2\. Operating Leverage (OL) = $\dfrac{\text{Contribution}}{\text{EBIT}}$

2 = $\dfrac{\text{Contribution}}{30{,}000}$

Contribution = ₹ 60,000

3., **Fixed cost** = Contribution – Profit

= 60,000 – 30,000 = **₹ 30,000**

4., Sales = $\dfrac{\text{Contribution}}{\text{PV Ratio}}$

= $\dfrac{60{,}000}{30\%}$ = **₹ 2,00,000**

5\. If PV ratio is 30%, then the variable cost is 70% on sales.

∴ **Variable cost** = 2,00,000 x 70% = **₹ 1,40,000**

**Profit – Loss Statement**

| Particulars | ₹ |
|---|---:|
| Sales | 2,00,000 |
| Less: Variable cost | 1,40,000 |
| Contribution | 60000 |
| Less: Fixed cost | 30,000 |
| EBIT | 30,000 |
| Less: Interest | 10,000 |
| EBT | 20,000 |
| Less: Tax @ 30% | 6,000 |
| EAT | **14,000** |

**(2) Calculation of no. of Equity shares**

Market Price per Share (MPS) = ₹140

Price Earnings Ratio (PER) = 10

WKT,

**EPS** = $\dfrac{\text{MPS}}{\text{PER}} = \dfrac{140}{10}$ = **₹ 14**

Total earnings (EAT) = ₹ 14,000

∴ No. of Equity Shares = 14,000 / 14 = **1000**
#### Approach
Work backwards from the bottom: gross up the post-tax interest rate to get the interest, use financial leverage to find EBIT, operating leverage to find contribution, and the P/V ratio to find sales. EPS comes from MPS ÷ PER.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: hard
q: 8
a: 8-10
---
#### Question
A firm is in need of a small vehicle to make deliveries. It is intending to choose between two options. One option is to buy a new three wheeler that would cost ₹ 1,50,000 and will remain in service for 10 years.

The other alternative is to buy a second hand vehicle for ₹ 80,000 that could remain in service for 5 years. Thereafter the firm, can buy another second hand vehicle for ₹ 60,000 that will last for another 5 years.

The scrap value of the discarded vehicle will be equal to it written down value (WDV). The firm pays 30% tax and is allowed to claim depreciation on vehicles @ 25% on WDV basis.

The cost of capital of the firm is 12%.

You are required to advise the best option.

Given:

| t | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| PVIF (t,12%) | 0.892 | 0.797 | 0.711 | 0.635 | 0.567 | 0.506 | 0.452 | 0.403 | 0.360 | 0.322 |
#### Answer
**Selection of Investment Decision**

| Tax shield on Purchase of New vehicle | | | |
|---|---:|---:|---:|
| **Year** | **WDV** | **Dep. @ 25%** | **Tax shield @ 30%** |
| 1 | 1,50,000 | 37,500 | 11,250 |
| 2 | 1,12,500 | 28,125 | 8,437 |
| 3 | 84,375 | 21,094 | 6,328 |
| 4 | 63,281 | 15,820 | 4,746 |
| 5 | 47,461 | 11,865 | 3,560 |
| 6 | 35,596 | 8,899 | 2,670 |
| 7 | 26,697 | 6,674 | 2,002 |
| 8 | 20,023 | 5,006 | 1,502 |
| 9 | 15,017 | 3,754 | 1,126 |
| 10 | 11,263 | 2,816 | 845 |
| 11 | 8,447 | Scrap value | |

**Tax shield on Purchase of Second hand vehicles**

| Year | WDV | Dep. @ 25% | Tax shield @ 30% | |
|---|---:|---:|---:|---|
| 1 | 80,000 | 20,000 | 6,000 | |
| 2 | 60,000 | 15,000 | 4,500 | |
| 3 | 45,000 | 11,250 | 3,375 | |
| 4 | 33,750 | 8,437 | 2,531 | |
| 5 | 25,313 | 6,328 | 1,898 | Scrap value = ₹ 18,985 |
| 6 | 60,000 | 15,000 | 4,500 | |
| 7 | 45,000 | 11,250 | 3,375 | |
| 8 | 33,750 | 8,437 | 2,531 | |
| 9 | 25,313 | 6,328 | 1,898 | |
| 10 | 18,985 | 4,746 | 1,424 | Scrap value = ₹ 14,239 |

**Calculation of PV of Net outflow of New Vehicle**

| Year | Cash OF/IF | PV Factor | PV of OF/IF |
|---|---:|---:|---:|
| 0 | 1,50,000 | 1 | 1,50,000 |
| 1 | (11,250) | 0.892 | (10,035) |
| 2 | (8,437) | 0.797 | (6,724) |
| 3 | (6,328) | 0.711 | (4,499) |
| 4 | (4,746) | 0.635 | (3,014) |
| 5 | (3,560) | 0.567 | (2,018) |
| 6 | (2,670) | 0.506 | (1,351) |
| 7 | (2,002) | 0.452 | (905) |
| 8 | (1,502) | 0.403 | (605) |
| 9 | (1,126) | 0.360 | (405) |
| 10 | (845 + 8447) | 0.322 | (2,992) |
| | | **PVNOF** | **1,17,452** |

**Calculation of PV of Net outflow of Second hand Vehicles**

| Year | Cash OF/IF | PV Factor | PV of OF/IF |
|---|---:|---:|---:|
| 0 | 80,000 | 1 | 80,000 |
| 1 | (6,000) | 0.892 | (5,352) |
| 2 | (4,500) | 0.797 | (3,587) |
| 3 | (3,375) | 0.711 | (2,400) |
| 4 | (2,531) | 0.635 | (1,607) |
| 5 | (60000 – 18985 – 1898) = 39,117 | 0.567 | 22,179 |
| 6 | (4,500) | 0.506 | (2,277) |
| 7 | (3,375) | 0.452 | (1,525) |
| 8 | (2,531) | 0.403 | (1,020) |
| 9 | (1,898) | 0.360 | (683) |
| 10 | (1424 + 14239) = (15,663) | 0.322 | (5,043) |
| | | **PVNOF** | **78,686** |

**Advise:** The PV of net outflow is low in case of buying the second hand vehicles. Therefore, it is advisable to buy second hand vehicles.
#### Approach
Both options cover the same 10 years, so compare the present value of net outflows: purchase price, less the depreciation tax shields each year, less the scrap value (the WDV) when a vehicle is discarded.

---
item: q4
qno: 4
marks: 10
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: medium
q: 10-11
a: 11-12
---
#### Question
A hospital is considering to purchase a diagnostic machine costing ₹ 80,000. The projected life of the machine is 8 years and has an expected salvage value of ₹ 6,000 at the end of 8 years. The annual operating cost of the machine is ₹ 7,500. It is expected to generate revenues of ₹ 40,000 per year for eight years. Presently, the hospital is outsourcing the diagnostic work and is earning commission income of ₹ 12,000 per annum.

Consider tax rate of 30% and Discounting Rate as 10%.

Advise:

Whether it would be profitable for the hospital to purchase the machine?

Give your recommendation as per Net Present Value method and Present Value Index method under below mentioned two situations:

(i) If Commission income of ₹ 12,000 p.a. is before taxes.

(ii) If Commission income of ₹ 12,000 p.a. is net of taxes.

Given:

| t | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| PVIF (t, 10%) | 0.909 | 0.826 | 0.751 | 0.683 | 0.621 | 0.564 | 0.513 | 0.467 |
#### Answer
**Analysis of Investment Decisions**

| **Determination of Cash inflows** | **Situation-(i) Commission Income before taxes** | **Situation-(ii) Commission Income after taxes** |
|---|---:|---:|
| Cash flow up-to 7th year: | | |
| Sales Revenue | 40,000 | 40,000 |
| Less: Operating Cost | (7,500) | (7,500) |
| | 32,500 | 32,500 |
| Less: Depreciation (80,000 – 6,000) ÷ 8 | (9,250) | (9,250) |
| Net Income | 23,250 | 23,250 |
| Tax @ 30% | (6,975) | (6,975) |
| Earnings after Tax (EAT) | 16,275 | 16,275 |
| Add: Depreciation | 9,250 | 9,250 |
| Cash inflow after tax per annum | 25,525 | 25,525 |
| Less: Loss of Commission Income | (8,400) | (12,000) |
| Net Cash inflow after tax per annum | 17,125 | 13,525 |
| In 8th Year: | | |
| Net Cash inflow after tax | 17,125 | 13,525 |
| Add: Salvage Value of Machine | 6,000 | 6,000 |
| **Net Cash inflow in year 8** | **23,125** | **19,525** |

**Calculation of Net Present Value (NPV) and Profitability Index (PI)**

| | **Particulars** | **PV factor @10%** | **Situation-(i) [Commission Income before taxes]** | **Situation-(ii) [Commission Income after taxes]** |
|---|---|---:|---:|---:|
| A | Present value of cash inflows (1st to 7th year) | 4.867 | 83,347.38 (17,125 × 4.867) | 65,826.18 (13,525 × 4.867) |
| B | Present value of cash inflow at 8th year | 0.467 | 10,799.38 (23,125 × 0.467) | 9,118.18 (19,525 × 0.467) |
| C | PV of cash inflows | | 94,146.76 | 74,944.36 |
| D | Less: Cash Outflow | 1.00 | (80,000) | (80,000) |
| E | **Net Present Value (NPV)** | | **14,146.76** | **(5,055.64)** |
| F | **PI = (C÷D)** | | **1.18** | **0.94** |

**Recommendation:** The hospital may consider purchasing of diagnostic machine in situation (i) where commission income is 12,000 before tax as NPV is positive and PI is also greater than 1. Contrary to situation (i), in situation (ii) where the commission income is net of tax, the recommendation is reversed to not purchase the machine as NPV is negative and PI is also less than 1.
#### Approach
The commission given up is an opportunity cost: deduct it from the machine's after-tax cash inflow, after tax in situation (i) and in full in situation (ii). Add the salvage value in year 8.

---
item: q5a
qno: 5
part: (a)
marks: 4
type: descriptive
tags: fm.cs.theories
difficulty: medium
q: 12
a: 13-14
note: ICAI prints the two fractions "5,000 / 9.09 x 100" below the first table of the answer, under columns A and B; they are written as the table's last row.
---
#### Question
The following are the costs and values for the firms A and B according to the traditional approach.

| | Firm A | Firm B |
|---|---:|---:|
| Total value of firm, V (in ₹) | 50,000 | 60,000 |
| Market value of debt, D (in ₹) | 0 | 30,000 |
| Market value of equity, E (in ₹) | 50,000 | 30,000 |
| Expected net operating income (in ₹) | 5,000 | 5,000 |
| Cost of debt (in ₹) | 0 | 1,800 |
| Net Income (in ₹) | 5,000 | 3,200 |
| Cost of equity, Ke = NI/V | 10.00% | 10.70% |

(i) Compute the Equilibrium value for Firm A and B in accordance with the M -M approach. Assume that (a) taxes do not exist and (b) the equilibrium value of Ke is 9.09%.

(ii) Compute Value of Equity and Cost of Equity for both the firms.
#### Answer
**(i) Computation of Equilibrium value of Firms A & B under MM Approach:**

As per MM approach $K_O$ is equal to $K_{eu}$

∴ $K_O = K_{eu}$ (1 – t) = 9.09 (1 – 0) = 9.09

| Particulars | A | B |
|---|---:|---:|
| EBIT (NOI) (₹) | 5000 | 5000 |
| $K_{O\ (\%)}$ | 9.09 | 9.09 |
| Equilibrium value (₹) (NOI/Ko) X 100 | 55005.5 | 55005.5 |
| | $\dfrac{5{,}000}{9.09}$ x 100 | $\dfrac{5{,}000}{9.09}$ x 100 |

**(ii) Computation of value of equity and cost of equity of Firms A & B**

| Particulars | A | B |
|---|---:|---:|
| Equilibrium value (₹) | 55,005.5 | 55,005.5 |
| Less: Value of Debt | - | 30,000 |
| Value of Equity | 55,005.5 | 25,005.5 |

Cost of Equity of Firm A (unlevered) = 9.09

Cost of Debt of Firm B ($K_d$) (levered) = (1800/30000) x 100 = 6%

Cost of Equity of Firm B (Levered) = $K_O$ + ($K_O$ - $K_d$ ) x (Debt / Equity)

= 9.09 + (9.09 – 6) x (30000/25005.5)

= 9.09 + 3.09 x 1.2 = 9.09 + 3.71 = **12.80%**

**(OR)**

Cost of Equity of Firm B (Levered) = $\left(\dfrac{\text{NI}}{\text{Value of Equity}}\right)$ x 100

= $\left(\dfrac{3200}{25005.5}\right)$ x 100 = **12.8%**
#### Approach
Under MM without taxes the value of every firm is NOI capitalised at the overall rate, whatever its debt. Equity is that value less debt; the levered firm's cost of equity rises with its debt-equity ratio.

---
item: q5b
qno: 5
part: (b)
marks: 6
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: medium
q: 12-13
a: 14-15
note: ICAI's own text kept as printed: "the year 202I" (a capital I for 1) in the question; "Amount that can be spend" in the answer. ICAI labels the answer's parts "(b) (a) (i)" … "(b)" … "(c)": the first (b) is this item's part label and is dropped; the answer's own (a), (b), (c) are kept, although the question prints the last requirement without a letter.
---
#### Question
MR Ltd. is having the following capital structure, which is considered to be optimum as on 31.03.2022.

| | |
|---|---:|
| Equity share capital (50,000 shares) | ₹ 8,00,000 |
| 12% Pref. share capital | ₹ 50,000 |
| 15% Debentures | ₹ 1,50,000 |
| | ₹ 10,00,000 |

The earnings per share (EPS) of the company were ₹ 2.50 in 2021 and the expected growth in equity dividend is 10% per year. The next year's dividend per share (DPS) is 50% of EPS of the year 202I. The current market price per share (MPS) is ₹ 25.00. The 15% new debentures can be issued by the company. The company's debentures are currently selling at ₹ 96 per debenture. The new 12% Pref. share can be sold at a net price of ₹ 91.50 (face value ₹ 100 each). The applicable tax rate is 30%.

You are required to calculate

(a) After tax cost of

(i) New debt,

(ii) New pref. share capital and

(iii) Equity shares assuming that new equity shares come from retained earnings.

(b) Marginal cost of capital,

How much can be spent for capital investment before sale of new equity shares assuming that retained earnings for next year investment is 50% of 2021?
#### Answer
**(a) (i) After tax cost of new Debt:**

$K_d = I \dfrac{(1-t)}{P_1} = 15 \dfrac{(1 - 0.3)}{96}$

= 0.1094 (or) **10.94%**

**(ii) After tax cost of New Preference share capital:**

$K_p = \dfrac{PD}{P_O} = \left(\dfrac{12}{91.5}\right)$ = 0.1311 (or) **13.11%**

**(iii) After tax cost of Equity shares:**

$K_e = \left(\dfrac{D_1}{P_O}\right) + g = \left[\dfrac{(2.50 \text{ x } 50\%)}{25}\right] + 0.10$

= **0.15 (or) 15%**

**(b) Marginal Cost of Capital**

| Type of capital | Proportions | Specific cost | Product |
|---|---:|---:|---:|
| Equity Shares | 0.80 | 0.15 | 0.12 |
| Preference Shares | 0.05 | 0.1311 | 0.0066 |
| Debentures | 0.15 | 0.1094 | 0.0164 |
| ∴ Marginal cost of capital | | | **0.1430** |

**(c) Amount that can be spend for capital investment**

**Retained earnings =** 50% of EPS x No. of outstanding Equity shares

= 1.25 x 50,000

**= ₹ 62,500**

Proportion of equity (Retained earnings here) capital is 80% of total capital. Therefore,

₹ 62,500 is 80% of total capital.

∴ Amount of Capital Investment = $\dfrac{62{,}500}{0.80}$ = **₹ 78,125**
#### Approach
Cost each source on its current market (net) price, weight them by the optimum capital structure, and find how much total investment the retained earnings can carry as the equity share of that structure.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.sources.modern
difficulty: easy
q: 15
a: 15
---
#### Question
These bonds are issued by non-US Banks and non-US corporations in US. What this bond is called and what are the other features of this Bond?
#### Answer
The Bond is called as Yankee Bond.

Features of the bond:

- These bonds are denominated in Dollars
- Bonds are to be registered in SEC (Securities and Exchange Commission)
- Bonds are issued in tranches
- Time taken can be up to 14 weeks

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.wc.cash
difficulty: easy
q: 15
a: 15-16
---
#### Question
Elucidate the fundamental tasks of treasury department of a firm.
#### Answer
Fundamental tasks of treasury department of a firm:

(i) Cash management: It involves efficient cash collection process and managing payment of cash both inside the organization and to third parties. Treasury will also manage surplus funds in an investment portfolio.

(ii) Currency management: The treasury department manages the foreign currency risk exposure of the company. In a large multi-national company, the first step will usually be to set off intra-group indebtedness. The use of matching receipts and payments in the same currency will save transaction costs and will save the organization from any unfavorable exchange movement.

(iii) Fund management: Treasury department is responsible for planning and sourcing the company’s short, medium and long-term cash needs. It also facilitates temporary investment of surplus funds by mapping the time gap between funds inflow and outflow.

(iv) Banking: It is important that a company maintains a good relationship with its bankers. Treasury department carry out negotiations with bankers with respect to interest rates, foreign exchange rates etc. and act as the initial point of contact with them.

(v) Corporate finance: Treasury department is involved with both acquisition and divestment activities within the group. In addition, it will often have responsibility for investors’ relations.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.cs.planning
difficulty: easy
q: 15
a: 16
---
#### Question
The firm has more capital than its requirements. What is this situation called? Give two consequences of it.
#### Answer
The situation is called as Over Capitalization.

Consequences of Over Capitalization:

- Considerable reduction in the rate of dividend and interest payments.
- Reduction in the market price of shares
- Resorting to “Window dressing”
- Some companies may opt for reorganization. However, sometimes the matter gets worse and the company may go into liquidation.

---
item: q6c-or
qno: 6
part: (c)
marks: 2
type: descriptive
alt: q6c
tags: fm.cs.planning
difficulty: easy
q: 15
a: 16
note: ICAI prints this as an OR alternative to Q6(c), with its own (2 Marks).
---
#### Question
What are the important factors considered for deciding the source and quantum of capital?
#### Answer
The source and quantum of capital is decided keeping in mind the following factors:

(i) Control: Capital structure should be designed in such a manner that existing shareholders continue to hold majority stake

(ii) Risk: Capital structure should be designed in such a manner that financial risk of a company does not increase beyond tolerable limit.

(iii) Cost: Overall cost of capital remains minimum.
