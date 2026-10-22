<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-mtp-jul2021-s1
paper: p8
kind: mtp
attempt: jul2021
series: s1
qfile: old/p8/mtp-jul2021-s1-q.pdf
afile: old/p8/mtp-jul2021-s1-a.pdf
choice: q1; any 4 of q2-q6
q: 1
accept: 8
status: checked
by: tx-59
date: 2026-10-20
note: Old-scheme Paper 8 (Financial Management and Economics for Finance) Mock Test Paper 1 of ICAI's Test Series March 2021 (for the May 2021 examination, held July 2021): only Paper 8A Financial Management is transcribed (questions pp.1-5, answers "Suggested Answers/Hints" pp.1-9); Paper 8B Economics for Finance (questions from p.6, answers from p.10) is not. ICAI's own copies are no longer online: both files are the castudynotes.com mirror named in bank/sources.json, which stamps a "Downloaded From www.castudynotes.com" banner, a "Join Us on Telegram" banner and a diagonal watermark on every page; none of them is ICAI's and none is transcribed. ICAI prints amounts as "Rs." (not ₹) throughout this paper; kept as printed. Instructions: ICAI's 8A box on question p.1, which gives the choice rule ("Question No. 1 is compulsory. Attempt any four questions from the remaining five questions."); 8A carries 60 marks (Q1 20 + four of Q2-Q6 at 10 each). ICAI prints 3 hours for both parts of Paper 8 together, so minutes: is left out. Item model: Q1 (a)-(d) are separate 5-mark questions ("(4 × 5 Marks = 20 Marks)" after (d)); Q1(a)'s (i)/(ii), Q1(c)'s (i)/(ii) and Q1(d)'s alternatives (i)/(ii) stay inside their items; Q2 and Q3 are single 10-mark questions; Q4 (a) 8 and (b) 2 carry their own marks; Q5 is one 10-mark question whose requirements (i) and (ii) ICAI answers as one connected solution; Q6 (a)-(c) carry their own marks; Q6(c) has an OR alternative (q6c-or, alt: q6c), and ICAI prints the pair's (2 Marks) once, after the alternative. Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics. Q4(a) and Q4(b) are out of syllabus (oos): the certainty equivalent approach is Risk Analysis in Capital Budgeting, not in the new Paper 6A syllabus or the January 2027 Study Material; nearest tag fm.capbud.npv (lead ruling). Q5 is kept in syllabus: it is the equivalent annual cost of machines with unequal lives (in the syllabus: "equivalent annual cost"); its rent alternative is costed by the same present value of cash outflows, with no lease tax shields or lease-or-buy analysis. ICAI's own wording and figures kept as printed: "his/ her answer in Hindi" and "(For both the part of paper 8)" (instructions); "Following information are related" (Q1(c)); "Life of machine (Rs.)" in Q5's table header; "Following new 3D sonography machine of two different brands with same features is available" and "STATE which of the option is most economical" (Q5); "Security Premium Notes" in Q6(c)'s question (the answer says "Secured Premium Notes"); in the answers, "∴ CA" (Q1(b)), the dividend symbols "$P_o$", "$D_o$" and "$D_0$" as ICAI mixes them (Q1(a)), "each modeI" (the PDF's text has a capital I; Q5), the residual and scrap values written "[Rs. 15,00,000 – (1 - 0.10)]" (Q5), "Rs.120× 10,000" for the preference shares (Q2), and "Closing cash balance (A + D - B)" (Q3). Repaired extraction damage only: the stacked fractions and subscripts of the formulas, read from the rendered pages and written in KaTeX with ICAI's symbols and numbers; "31 st" re-joined as 31st (Q1(b)); "%changeinOperatingIncome" and similar headers of Q1(c)'s answer table re-spaced; "3D s onography" re-joined (Q5); "10 - year" re-joined as "10-year" (Q2); the Q1(c) and Q5 PVF tables (question pp.1-2 and pp.4-5) and the collection-from-debtors working of Q3 (answer pp.5-6) joined across the page break; tables rebuilt from the rendered pages. Not transcribed: the paper headers ("Test Series: March, 2021", "MOCK TEST PAPER –1", "INTERMEDIATE (NEW): GROUP – II", and on the answers "SUGGESTED ANSWERS/HINTS"), Q1's "Answer the following:", the "Or" separator of Q6(c) and the page numbers. check.py: the numbers accepted are (1) the header's 8 ("PAPER – 8A" on answer p.1; the other header numbers are now left out by check.py itself); (2) answer p.2's 8, the denominator of "Rs.21,33,333.33/8", the page's last text line, which check.py drops as a page number; (3) a tooling false positive: in the answers' text layer many table cells and stacked-fraction denominators stand on a line of their own ("1,13,778", "0.907"), and these line shapes ("#,#,#", "#.#") recur on more than 40% of the 13 pages, so check.py's running-head filter removes every such line; all the other accepted numbers (Q1(a) 0.13, 0.19, 0.24; Q1(b), Q1(d), Q2, Q3, Q4(a) and Q5 table values and denominators) are such lines. Each was read on the rendered answer pages 1-8, and a check.py run with that filter limited to non-numeric lines reports nothing else.
---
#### Instructions
**PAPER – 8A: FINANCIAL MANAGEMENT**

Answers are to be given only in English except in the case of the candidates who have opted for Hindi medium. If a candidate has not opted for Hindi medium his/ her answer in Hindi will not be valued.

Question No. **1** is compulsory.

Attempt any **four** questions from the remaining **five** questions.

Working notes should form part of the answer.

**Time Allowed – 3 Hours (For both the part of paper 8)**

**Maximum Marks – 60**

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: easy
q: 1
a: 1
---
#### Question
The following information is given:

| | |
|---|---|
| Dividend per share (DPS) | Rs. 9 |
| Cost of capital ($K_e$) | 19% |
| Internal rate of return on investment | 24% |
| Retention Ratio | 25% |

CALCULATE the market price per share by using:

(i) Walter’s formula

(ii) Gordon’s formula (Dividend Growth model)
#### Answer
**Working:**

**Calculation of Earnings per share (EPS):**

EPS = $\dfrac{\text{DPS}}{\text{Dividend Payout Ratio}}$

EPS= $\dfrac{\text{Rs. } 9}{1\text{-}0.25}$ = Rs.12

**Market price per share by**

**(i) Walter’s model:**

P = $\dfrac{D + \frac{r}{Ke}(E - D)}{K_e}$

= $\dfrac{\text{Rs. } 9 + \frac{0.24}{0.19}(\text{Rs. } 12 - \text{Rs. } 9)}{0.19}$

= Rs. 67.31

**(ii) Gordon’s model (Dividend Growth model):**

$P_o = \dfrac{D_o(1+g)}{K_e\text{-}g}$

Where,

$P_o$ = Present market price per share.

g = Growth rate (br) = 0.25 × 0.24 = 0.06

b = Retention ratio

k = Cost of Capital

r = Internal rate of return (IRR)

$D_0$ = Dividend per share

E = Earnings per share

= $\dfrac{\text{Rs. } 9(1+0.06)}{0.19\text{-}0.06}$

= $\dfrac{\text{Rs. } 9.54}{0.13}$= Rs.73.38

**Alternatively,**

$P_o$ = $\dfrac{E(1 - b)}{k - br}$

$P_o$ = $\dfrac{12\ (1\text{-}0.25)}{0.19 - 0.06}$ = $\dfrac{9}{0.13}$ = Rs. 69.23
#### Approach
A 25% retention ratio leaves a 75% payout, so EPS is DPS divided by the payout ratio; then apply Walter with r and Ke, and Gordon with g = b × r.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.ratio.prepare
difficulty: medium
q: 1
a: 2-3
---
#### Question
SN Ltd. has furnished the following ratios and information relating to the year ended 31st March 2021:

| | |
|---|---|
| Share Capital | Rs. 6,25,000 |
| Working Capital | Rs. 2,00,000 |
| Gross Margin | 25% |
| Inventory Turnover | 5 times |
| Average Collection Period | 1.5 months |
| Current Ratio | 1.5:1 |
| Quick Ratio | 0.7:1 |
| Reserves & Surplus to Bank & Cash | 3 times |

Further, the assets of the company consist of fixed assets and current assets, while its current liabilities comprise bank credit and others in the ratio of 3:1. Assume 360 days in a year.

You are required to PREPARE the Balance Sheet as on 31st March 2021.

*(Note- Balance sheet may be prepared in traditional T Format.)*
#### Answer
**Workings:**

1. Current Ratio = $\dfrac{\text{Current Assets(CA)}}{\text{Current Liabilities(CL)}} = \dfrac{1.5}{1}$

∴ CA = 1.5 CL

Also, CA - CL = Rs. 2,00,000

1.5 CL- CL = Rs. 2,00,000

CL = $\dfrac{\text{Rs. } 2{,}00{,}000}{0.5}$= Rs. 4,00,000

CA = 1.5 × Rs. 4,00,000 = Rs. 6,00,000

2. Bank Credit (BC) to Other Current Liabilities (OCL) ratio = 3:1

$\dfrac{\text{Bank Credit (BC)}}{\text{Other Current Liabilities (OCL)}} = \dfrac{3}{1}$

BC = 3 OCL

Also, BC + OCL = CL

3 OCL + OCL = Rs. 4,00,000

OCL = $\dfrac{\text{Rs. } 4{,}00{,}000}{4}$= Rs. 1,00,000

Bank Credit = 3 × Rs. 1,00,000 = Rs. 3,00,000

3. Quick Ratio = $\dfrac{\text{Current Assets - Inventories}}{\text{Current Liabilities}}$

0.7 = $\dfrac{\text{Rs. } 6{,}00{,}000\text{-Inventories}}{\text{Rs. } 4{,}00{,}000}$

Inventories = Rs. 6,00,000 – Rs. 2,80,000 = Rs. 3,20,000

4. Inventory Turnover = 5 times

Inventory Turnover = $\dfrac{\text{Cost of goods sold (COGS)}}{\text{Average Inventory}}$

Average Inventory = $\dfrac{\text{Cost of goods sold (COGS)}}{\text{Inventory Turnover}}$

COGS = Rs. 3,20,000 × 5 = Rs. 16,00,000

5. Gross Margin = $\dfrac{\text{Sales - COGS}}{\text{Sales}}$ × 100 = 25%

Sales = $\dfrac{16{,}00{,}000}{0.75}$ = Rs. 21,33,333.33

6. Average Collection Period (ACP) = 1.5 months = 45 days

Debtors Turnover = $\dfrac{360}{\text{ACP}} = \dfrac{360}{45}$ = 8 times

Also, Debtors Turnover = $\dfrac{\text{Sales}}{\text{Average Debtors}}$

Hence, Debtors = $\dfrac{\text{Rs.21,33,333.33}}{8}$= Rs.2,66,667

7. Bank & Cash = CA - (Debtors + Inventory)

= Rs. 6,00,000 – (Rs. 2,66,667 + 3,20,000) = Rs. 13,333

8. $\dfrac{\text{Reserves \& Surplus}}{\text{Bank \& Cash}}$ = 3

Reserves & Surplus = 3 × Rs. 13,333 = Rs. 40,000

**Balance Sheet of SN Ltd. as on 31st March 2021**

| Liabilities | (Rs.) | Assets | (Rs.) |
|---|---:|---|---:|
| Share Capital | 6,25,000 | Fixed Assets (Balancing Figure) | 4,65,000 |
| Reserves & Surplus | 40,000 | | |
| Current Liabilities: | | Current Assets: | |
| Bank Credit | 3,00,000 | Inventories | 3,20,000 |
| Other Current Liabilities | 1,00,000 | Debtors | 2,66,667 |
| | | Bank & Cash | 13,333 |
| | 10,65,000 | | 10,65,000 |
#### Approach
Start from working capital and the current ratio to get current assets and liabilities; the quick ratio then gives inventory, the turnover and gross margin give sales, and fixed assets are the balancing figure.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 1-2
a: 3
---
#### Question
Following information are related to four firms of the same industry:

| Firm | Change in Revenue | Change in Operating Income | Change in Earning per Share |
|---|---:|---:|---:|
| P | 25% | 23% | 30% |
| Q | 27% | 30% | 26% |
| R | 24% | 36% | 20% |
| S | 20% | 30% | 20% |

For all the firms, FIND OUT:

(i) Degree of operating leverage, and

(ii) Degree of combined leverage.
#### Answer
**Calculation of Degree of Operating leverage and Degree of Combined leverage**

| Firm | Degree of Operating Leverage (DOL) = % change in Operating Income/% change in Revenue | Degree of Combined Leverage (DCL) = % change in EPS/% change in Revenue |
|---|---|---|
| P | 23%/25% = 0.92 | 30%/25% = 1.2 |
| Q | 30%/27% = 1.11 | 26%/27% = 0.96 |
| R | 36%/24% = 1.50 | 20%/24% = 0.83 |
| S | 30%/20% = 1.50 | 20%/20% = 1.00 |
#### Approach
Use the percentage-change definitions: DOL compares the change in operating income with the change in revenue, DCL the change in EPS with the change in revenue.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.cs.ebiteps
difficulty: medium
q: 2
a: 3-4
---
#### Question
HN Limited is considering total investment of Rs. 20 lakhs. You are required to CALCULATE the level of earnings before interest and tax (EBIT) at which the EPS indifference point between the following financing alternatives will occur:

(i) Equity share capital of Rs. 12,00,000 and 14% debentures of Rs. 8,00,000.

Or

(ii) Equity share capital of Rs. 8,00,000, 16% preference share capital of Rs. 4,00,000 and 14% debentures of Rs. 8,00,000.

Assume the corporate tax rate is 30% and par value of equity share is Rs.10 in each case.
#### Answer
**Computation of level of earnings before interest and tax (EBIT)**

In case alternative (i) is accepted, then the EPS of the firm would be:

$\text{EPS}_{\text{Alternative (i)}} = \dfrac{(\text{EBIT} - \text{Interest})\ (1 - \text{tax rate})}{\text{No. of equity shares}} = \dfrac{(\text{EBIT} - 0.14 \times 8{,}00{,}000)\ (1 - 0.3)}{1{,}20{,}000 \text{ shares}}$

In case the alternative (ii) is accepted, then the EPS of the firm would be

$\text{EPS}_{\text{Alternative (ii)}} = \dfrac{(\text{EBIT} - \text{Interest})\ (1 - \text{tax rate}) - \text{PD}}{\text{No. of equity shares}}$

$= \dfrac{(\text{EBIT} - 0.14 \times 8{,}00{,}000)\ (1 - 0.3) - 0.16 \times 4{,}00{,}000}{80{,}000 \text{ shares}}$

In order to determine the indifference level of EBIT, the EPS under the two alternative plans should be equated as follows:

$\dfrac{(\text{EBIT} - 0.14 \times 8{,}00{,}000)\ (1 - 0.3)}{1{,}20{,}000 \text{ shares}} = \dfrac{(\text{EBIT} - 0.14 \times 8{,}00{,}000)\ (1 - 0.3) - 0.16 \times 4{,}00{,}000}{80{,}000 \text{ shares}}$

Or, $\dfrac{0.7\text{EBIT} - 78{,}400}{1{,}20{,}000} = \dfrac{0.7\text{EBIT} - 1{,}42{,}400}{80{,}000}$

Or 1.40 EBIT – Rs. 1,56,800 = 2.10 EBIT – Rs. 4,27,200

Or 0.70 EBIT = Rs. 2,70,400

Or EBIT = $\dfrac{2{,}70{,}400}{0.7}$

Or EBIT = Rs. 3,86,285.71 (approx.)
#### Approach
Write EPS for each plan with the same debenture interest, subtract the preference dividend after tax only in plan (ii), and equate the two expressions.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: hard
q: 2
a: 4-5
---
#### Question
CALCULATE the WACC by using Market value weights.

The capital structure of the company is as under:

| | (Rs.) |
|---|---:|
| Debentures (Rs.100 per debenture) | 10,00,000 |
| Preference shares (Rs.100 per share) | 10,00,000 |
| Equity shares (Rs.10 per share) | 20,00,000 |
| | 40,00,000 |

The market prices of these securities are:

| | |
|---|---|
| Debentures | Rs. 115 per debenture |
| Preference shares | Rs. 120 per preference share |
| Equity shares | Rs. 265 each. |

Additional information:

(1) Rs.100 per debenture redeemable at par, 10% coupon rate, 2% floatation cost, 10-year maturity.

(2) Rs.100 per preference share redeemable at par, 5% coupon rate, 2% floatation cost and 10-year maturity.

(3) Equity shares have a floatation cost of Rs. 1 per share.

The next year expected dividend is Rs. 5 with an annual growth of 15%. The firm has the practice of paying all earnings in the form of dividend.

Corporate tax rate is 30%. Use YTM method to calculate cost of debentures and preference shares.
#### Answer
**(i) Cost of Equity ($K_e$)**

$= \dfrac{D_1}{P_0\text{-}F} + g = \dfrac{\text{Rs. 5}}{\text{Rs.265-Re.1}} + 0.15$ = 0.1689 or 16.89%

**(ii) Cost of Debt ($K_d$)**

Calculation of NPV at discount rate of 5% and 7%

| Year | Cash flows (Rs.) | Discount factor @ 5% | Present Value | Discount factor @ 7% | Present Value (Rs.) |
|---|---:|---:|---:|---:|---:|
| 0 | 112.7 | 1.000 | (112.7) | 1.000 | (112.7) |
| 1 to 10 | 7 | 7.722 | 54.05 | 7.024 | 49.17 |
| 10 | 100 | 0.614 | 61.40 | 0.508 | 50.80 |
| NPV | | | +2.75 | | -12.73 |

**Calculation of IRR**

IRR = $5\% + \dfrac{2.75}{2.75\text{-}(\text{-}12.73)}(7\%\text{ - }5\%) = 5\% + \dfrac{2.75}{15.48}(7\%\text{ - }5\%)$ = 5.36%

Cost of Debt ($K_d$) = 5.36%

**(iii) Cost of Preference shares ($K_p$)**

Calculation of NPV at discount rate of 2% and 5%

| Year | Cash flows (Rs.) | Discount factor @ 2% | Present Value | Discount factor @ 5% | Present Value (Rs.) |
|---|---:|---:|---:|---:|---:|
| 0 | 117.6 | 1.000 | (117.6) | 1.000 | (117.6) |
| 1 to 10 | 5 | 8.983 | 44.92 | 7.722 | 38.61 |
| 10 | 100 | 0.820 | 82.00 | 0.614 | 61.40 |
| NPV | | | +9.32 | | -17.59 |

**Calculation of IRR**

IRR = $2\% + \dfrac{9.32}{9.32\text{-}(\text{-}17.59)}(5\%\text{-}2\%) = 2\% + \dfrac{9.32}{26.91}(5\%\text{-}2\%)$= 3.04%

Cost of Preference Shares ($K_p$) = 3.04%

**Calculation of WACC using market value weights**

| Source of capital | Market Value | Weights | After tax cost of capital | WACC (Ko) |
|---|---:|---:|---:|---:|
| | **(Rs.)** | **(a)** | **(b)** | **(c) = (a)×(b)** |
| 10% Debentures (Rs.115× 10,000) | 11,50,000 | 0.021 | 0.0536 | 0.00113 |
| 5% Preference shares (Rs.120× 10,000) | 12,00,000 | 0.022 | 0.0304 | 0.00067 |
| Equity shares (Rs.265 × 2,00,000) | 5,30,00,000 | 0.957 | 0.1689 | 0.16164 |
| | 5,53,50,000 | 1.000 | | 0.16344 |

WACC ($K_o$) = 0.16344 or 16.344%
#### Approach
Find each component cost first: Gordon's model on net price for equity, and YTM by interpolating NPV at two rates for the debentures (after-tax interest) and the preference shares, both on net proceeds; then weight by market values.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.wc.cash
difficulty: medium
q: 3
a: 5-6
---
#### Question
PREPARE monthly cash budget for the first six months of 2021 on the basis of the following information:

(i) Actual and estimated monthly sales are as follows:

| Actual | (Rs.) | Estimated | (Rs.) |
|---|---:|---|---:|
| October 2020 | 2,00,000 | January 2021 | 60,000 |
| November 2020 | 2,20,000 | February 2021 | 80,000 |
| December 2020 | 2,40,000 | March 2021 | 1,00,000 |
| | | April 2021 | 1,20,000 |
| | | May 2021 | 80,000 |
| | | June 2021 | 60,000 |
| | | July 2021 | 1,20,000 |

(ii) Operating Expenses (including salary & wages) are estimated to be payable as follows:

| Month | (Rs.) | Month | (Rs.) |
|---|---:|---|---:|
| January 2021 | 22,000 | April 2021 | 30,000 |
| February 2021 | 25,000 | May 2021 | 25,000 |
| March 2021 | 30,000 | June 2021 | 24,000 |

(iii) Of the sales, 75% is on credit and 25% for cash. 60% of the credit sales are collected after one month, 30% after two months and 10% after three months.

(iv) Purchases amount to 80% of sales and are made on credit and paid for in the month preceding the sales.

(v) The firm has 12% debentures of Rs.1,00,000. Interest on these has to be paid quarterly in January, April and so on.

(vi) The firm is to make an advance payment of tax of Rs. 5,000 in April.

(vii) The firm had a cash balance of Rs. 40,000 at 31st Dec. 2020, which is the minimum desired level of cash balance. Any cash surplus/deficit above/below this level is made up by temporary investments/liquidation of temporary investments or temporary borrowings at the end of each month (interest on these to be ignored).
#### Answer
**Monthly Cash Budget for first six months of 2021**

(Amount in Rs.)

| Particulars | Jan. | Feb. | Mar. | April | May | June |
|---|---:|---:|---:|---:|---:|---:|
| Opening balance | 40,000 | 40,000 | 40,000 | 40,000 | 40,000 | 40,000 |
| **Receipts:** | | | | | | |
| Cash sales | 15,000 | 20,000 | 25,000 | 30,000 | 20,000 | 15,000 |
| Collection from debtors | 1,72,500 | 97,500 | 67,500 | 67,500 | 82,500 | 70,500 |
| Total cash available (A) | 2,27,500 | 1,57,500 | 1,32,500 | 1,37,500 | 1,42,500 | 1,25,500 |
| **Payments:** | | | | | | |
| Purchases | 64,000 | 80,000 | 96,000 | 64,000 | 48,000 | 96,000 |
| Operating Expenses | 22,000 | 25,000 | 30,000 | 30,000 | 25,000 | 24,000 |
| Interest on debentures | 3,000 | - | - | 3,000 | - | - |
| Tax payment | - | - | - | 5,000 | - | - |
| Total payments (B) | 89,000 | 1,05,000 | 1,26,000 | 1,02,000 | 73,000 | 1,20,000 |
| Minimum cash balance desired | 40,000 | 40,000 | 40,000 | 40,000 | 40,000 | 40,000 |
| Total cash needed (C) | 1,29,000 | 1,45,000 | 1,66,000 | 1,42,000 | 1,13,000 | 1,60,000 |
| Surplus/(deficit) (A - C) | 98,500 | 12,500 | (33,500) | (4,500) | 29,500 | (34,500) |
| **Investment/financing** | | | | | | |
| Temporary Investments | (98,500) | (12,500) | - | - | (29,500) | - |
| Liquidation of temporary investments or temporary borrowings | | | 33,500 | 4,500 | - | 34,500 |
| Total effect of investment/financing(D) | (98,500) | (12,500) | 33,500 | 4,500 | (29,500) | 34,500 |
| Closing cash balance (A + D - B) | 40,000 | 40,000 | 40,000 | 40,000 | 40,000 | 40,000 |

**Workings:**

1. **Collection from debtors:**

(Amount in Rs.)

| | Year 2020 | | | Year 2021 | | | | | |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| | **Oct.** | **Nov.** | **Dec.** | **Jan.** | **Feb.** | **Mar.** | **April** | **May** | **June** |
| Total sales | 2,00,000 | 2,20,000 | 2,40,000 | 60,000 | 80,000 | 1,00,000 | 1,20,000 | 80,000 | 60,000 |
| Credit sales (75% of total sales) | 1,50,000 | 1,65,000 | 1,80,000 | 45,000 | 60,000 | 75,000 | 90,000 | 60,000 | 45,000 |
| Collections: | | | | | | | | | |
| One month | | 90,000 | 99,000 | 1,08,000 | 27,000 | 36,000 | 45,000 | 54,000 | 36,000 |
| Two months | | | 45,000 | 49,500 | 54,000 | 13,500 | 18,000 | 22,500 | 27,000 |
| Three months | | | | 15,000 | 16,500 | 18,000 | 4,500 | 6,000 | 7,500 |
| **Total collections** | | | | **1,72,500** | **97,500** | **67,500** | **67,500** | **82,500** | **70,500** |

2. **Payment to Creditors:**

(Amount in Rs.)

| | Year 2021 | | | | | | |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **Jan** | **Feb** | **Mar** | **Apr** | **May** | **Jun** | **Jul** |
| Total sales | 60,000 | 80,000 | 1,00,000 | 1,20,000 | 80,000 | 60,000 | 1,20,000 |
| Purchases (80% of total sales) | 48,000 | 64,000 | 80,000 | 96,000 | 64,000 | 48,000 | 96,000 |
| **Payment:** | | | | | | | |
| **One month prior** | **64,000** | **80,000** | **96,000** | **64,000** | **48,000** | **96,000** | |
#### Approach
Build the debtors' collection schedule from October 2020 first (credit sales collected over three months), and pay each month for the next month's purchases; then hold the balance at the Rs. 40,000 minimum with temporary investments or borrowings.

---
item: q4a
qno: 4
part: (a)
marks: 8
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: easy
q: 3-4
a: 6
note: Out of syllabus (old scheme): the item evaluates two projects by the certainty equivalent approach, which is Risk Analysis in Capital Budgeting. That topic is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material (its Investment Decisions chapter has no risk-analysis section); tagged with the nearest sub-topic, fm.capbud.npv (lead ruling).
---
#### Question
N&B Ltd. is considering one of two mutually exclusive proposals, Projects A and B, which require cash outlays of Rs. 34,00,000 and Rs. 33,00,000 respectively. The certainty-equivalent (C.E) approach is used in incorporating risk in capital budgeting decisions. The current yield on government bonds is 5% and this is used as the risk free rate. The expected net cash flows and their certainty equivalents are as follows:

| Year-end | Project A | | Project B | |
|---:|---:|---:|---:|---:|
| | **Cash Flow (Rs.)** | **C.E.** | **Cash Flow (Rs.)** | **C.E.** |
| 1 | 16,75,000 | 0.8 | 16,75,000 | 0.9 |
| 2 | 15,00,000 | 0.7 | 15,00,000 | 0.8 |
| 3 | 15,00,000 | 0.5 | 15,00,000 | 0.7 |
| 4 | 20,00,000 | 0.4 | 10,00,000 | 0.8 |
| 5 | 21,20,000 | 0.6 | 9,00,000 | 0.9 |

PV factor at 5% are as follows:

| Year | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|
| PV factor | 0.952 | 0.907 | 0.864 | 0.823 | 0.784 |

DETERMINE which project should be accepted.
#### Answer
**Statement Showing the Net Present Value of Project A**

| Year end | Cash Flow (Rs.) | C.E. | Adjusted Cash flow (Rs.) | Present value factor at 5% | Total Present value (Rs.) |
|---:|---:|---:|---:|---:|---:|
| | **(a)** | **(b)** | **(c) = (a) × (b)** | **(d)** | **(e) = (c) ×(d)** |
| 1 | 16,75,000 | 0.8 | 13,40,000 | 0.952 | 12,75,680 |
| 2 | 15,00,000 | 0.7 | 10,50,000 | 0.907 | 9,52,350 |
| 3 | 15,00,000 | 0.5 | 7,50,000 | 0.864 | 6,48,000 |
| 4 | 20,00,000 | 0.4 | 8,00,000 | 0.823 | 6,58,400 |
| 5 | 21,20,000 | 0.6 | 12,72,000 | 0.784 | 9,97,248 |
| PV of total Cash Inflows | | | | | 45,31,678 |
| *Less:* Initial Investment | | | | | 34,00,000 |
| **Net Present Value** | | | | | **11,31,678** |

**Statement Showing the Net Present Value of Project B**

| Year end | Cash Flow (Rs.) | C.E. | Adjusted Cash flow (Rs.) | Present value factor at 5% | Total Present value (Rs.) |
|---:|---:|---:|---:|---:|---:|
| | **(a)** | **(b)** | **(c) = (a) × (b)** | **(d)** | **(e) = (c) ×(d)** |
| 1 | 16,75,000 | 0.9 | 15,07,500 | 0.952 | 14,35,140 |
| 2 | 15,00,000 | 0.8 | 12,00,000 | 0.907 | 10,88,400 |
| 3 | 15,00,000 | 0.7 | 10,50,000 | 0.864 | 9,07,200 |
| 4 | 10,00,000 | 0.8 | 8,00,000 | 0.823 | 6,58,400 |
| 5 | 9,00,000 | 0.9 | 8,10,000 | 0.784 | 6,35,040 |
| PV of total Cash Inflows | | | | | 47,24,180 |
| *Less:* Initial Investment | | | | | 33,00,000 |
| **Net Present Value** | | | | | **14,24,180** |

Project B has NPV of Rs. 14,24,180 which is higher than the NPV of Project A. Thus, N&B Ltd. should accept Project B.
#### Approach
Multiply each year's cash flow by its certainty equivalent, discount the certain flows at the risk-free 5%, and compare the two NPVs.

---
item: q4b
qno: 4
part: (b)
marks: 2
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: easy
q: 4
a: 7
note: Out of syllabus (old scheme): the advantages of the certainty equivalent method belong to Risk Analysis in Capital Budgeting, which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material; tagged with the nearest sub-topic, fm.capbud.npv (lead ruling).
---
#### Question
DISCUSS the advantages of Certainty Equivalent Method.
#### Answer
**Advantages of Certainty Equivalent Method:**

1. The certainty equivalent method is simple and easy to understand and apply.
2. It can easily be calculated for different risk levels applicable to different cash flows. For example, if in a particular year, a higher risk is associated with the cash flow, it can be easily adjusted and the NPV can be recalculated accordingly.

---
item: q5
qno: 5
marks: 10
type: descriptive
tags: fm.capbud.npv
difficulty: hard
q: 4-5
a: 7-8
note: ICAI prints one (10 Marks) for the question; its requirements (i) and (ii) are answered as one connected solution on the same data and stay one item. Ours: the question is the equivalent annual cost of machines with unequal lives, which the January 2027 Study Material teaches (Investment Decisions, Equivalent Annualized Criterion); the rent alternative is costed by the same present value of outflows (no lease tax shields), so the item is not flagged as a lease-or-buy problem.
---
#### Question
GG Pathology Lab Ltd. is using 2D sonography machine which has reached the end of its useful life. The lab is intending to upgrade along with the technology by investing in 3D sonography machine as per the choices preferred by the patients. Following new 3D sonography machine of two different brands with same features is available in the market:

| Brand | Cost of machine | Life of machine | Maintenance Cost (Rs.) | | | SLM Depreciation rate |
|---|---:|---:|---:|---:|---:|---:|
| | **(Rs.)** | **(Rs.)** | **Year 1-5** | **Year 6-10** | **Year 11-15** | **(%)** |
| X | 15,00,000 | 15 | 50,000 | 70,000 | 98,000 | 6 |
| Y | 10,00,000 | 10 | 70,000 | 1,15,000 | - | 6 |

Residual Value of machines shall be dropped by 10% and 40% of Purchase price for Brand X and Y respectively in the first year and thereafter shall be depreciated at the rate mentioned above on the original cost.

Alternatively, the machine of Brand Y can also be taken on rent to be returned back to the owner after use on the following terms and conditions:

- Annual Rent shall be paid in the beginning of each year and for first year it shall be Rs. 2,24,000. Annual Rent for the subsequent 4 years shall be Rs. 2,25,000.
- Annual Rent for the final 5 years shall be Rs. 2,70,000.
- The Rent/Agreement can be terminated by GG Labs by making a payment of Rs. 2,20,000 as penalty. This penalty would be reduced by Rs. 22,000 each year of the period of rental agreement.

You are required to:

(i) ADVISE which brand of 3D sonography machine should be acquired assuming that the use of machine shall be continued for a period of 20 years.

(ii) STATE which of the option is most economical if machine is likely to be used for a period of 5 years?

The cost of capital of GG Labs is 12%.

The present value factor of Rs. 1 @ 12% for different years is given as under:

| Year | PVF | Year | PVF |
|---:|---:|---:|---:|
| 1 | 0.893 | 9 | 0.361 |
| 2 | 0.797 | 10 | 0.322 |
| 3 | 0.712 | 11 | 0.287 |
| 4 | 0.636 | 12 | 0.257 |
| 5 | 0.567 | 13 | 0.229 |
| 6 | 0.507 | 14 | 0.205 |
| 7 | 0.452 | 15 | 0.183 |
| 8 | 0.404 | 16 | 0.163 |
#### Answer
Since the life span of each machine is different and time span exceeds the useful lives of each modeI, we shall use Equivalent Annual Cost method to decide which brand should be chosen.

**(i) If machine is used for 20 years**

(a) Residual value of machine of brand X

= [Rs. 15,00,000 – (1 - 0.10)] - (Rs. 15,00,000 × 0.06 × 14) = Rs. 90,000

(b) Residual value of machine of brand Y

= [Rs. 10,00,000 – (1 - 0.40)] - (Rs. 10,00,000 × 0.06 × 9) = Rs. 60,000

**Present Value (PV) of cost if machine of brand X is purchased**

| Period | Cash Outflow (Rs.) | PVF @ 12% | PV (Rs.) |
|---|---:|---:|---:|
| 0 | 15,00,000 | 1.000 | 15,00,000 |
| 1-5 | 50,000 | 3.605 | 1,80,250 |
| 6-10 | 70,000 | 2.046 | 1,43,220 |
| 11-15 | 98,000 | 1.161 | 1,13,778 |
| 15 | (90,000) | 0.183 | (16,470) |
| | | | 19,20,778 |

PVAF for 1-15 years = 6.812

Equivalent Annual Cost = $\dfrac{\text{Rs.19,20,778}}{6.812}$ = Rs. 2,81,969.76

**Present Value (PV) of cost if machine of brand Y is purchased**

| Period | Cash Outflow (Rs.) | PVF @ 12% | PV (Rs.) |
|---|---:|---:|---:|
| 0 | 10,00,000 | 1.000 | 10,00,000 |
| 1-5 | 70,000 | 3.605 | 2,52,350 |
| 6-10 | 1,15,000 | 2.046 | 2,35,290 |
| 10 | (60,000) | 0.322 | (19,320) |
| | | | 14,68,320 |

PVAF for 1-10 years = 5.651

Equivalent Annual Cost = $\dfrac{\text{Rs.14,68,320}}{5.651}$ = Rs. 2,59,833.66

**Present Value (PV) of cost if machine of brand Y is taken on rent**

| Period | Cash Outflow (Rs.) | PVF @ 12% | PV (Rs.) |
|---|---:|---:|---:|
| 0 | 2,24,000 | 1.000 | 2,24,000 |
| 1-4 | 2,25,000 | 3.038 | 6,83,550 |
| 5-9 | 2,70,000 | 2.291 | 6,18,570 |
| | | | 15,26,120 |

PVAF for 1-10 years = 5.651

Equivalent Annual Cost = $\dfrac{\text{Rs.15,26,120}}{5.651}$ = Rs. 2,70,061.94

**Decision:** Since Equivalent Annual Cash Outflow is least in case of purchase of Machine of brand Y the same should be purchased.

**(ii) If machine is used for 5 years**

(a) Scrap value of machine of brand X

= [Rs. 15,00,000 – (1 - 0.10)] - (Rs. 15,00,000 × 0.06 × 4) = Rs. 9,90,000

(b) Scrap value of machine of brand Y

= [Rs. 10,00,000 – (1 - 0.40)] - (Rs. 10,00,000 × 0.06 × 4) = Rs. 3,60,000

**Present Value (PV) of cost if machine of brand X is purchased**

| Period | Cash Outflow (Rs.) | PVF @ 12% | PV (Rs.) |
|---|---:|---:|---:|
| 0 | 15,00,000 | 1.000 | 15,00,000 |
| 1-5 | 50,000 | 3.605 | 1,80,250 |
| 5 | (9,90,000) | 0.567 | (5,61,330) |
| | | | 11,18,920 |

**Present Value (PV) of cost if machine of brand Y is purchased**

| Period | Cash Outflow (Rs.) | PVF @ 12% | PV (Rs.) |
|---|---:|---:|---:|
| 0 | 10,00,000 | 1.000 | 10,00,000 |
| 1-5 | 70,000 | 3.605 | 2,52,350 |
| 5 | (3,60,000) | 0.567 | (2,04,120) |
| | | | 10,48,230 |

**Present Value (PV) of cost if machine of brand Y is taken on rent**

| Period | Cash Outflow (Rs.) | PVF @ 12% | PV (Rs.) |
|---|---:|---:|---:|
| 0 | 2,24,000 | 1.000 | 2,24,000 |
| 1-4 | 2,25,000 | 3.038 | 6,83,550 |
| 5 | 1,10,000\* | 0.567 | 62,370 |
| | | | 9,69,920 |

\* [Rs. 2,20,000 - (Rs. 22,000 × 5) = Rs. 1,10,000]

**Decision:** Since Cash Outflow is least in case of rent of Machine of brand Y the same should be taken on rent.
#### Approach
The lives differ, so compare equivalent annual costs over each machine's own life for the 20-year case; for 5 years compare the present value of all outflows, netting the residual value or the reduced termination penalty at year 5.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.intro.objectives
difficulty: easy
q: 5
a: 8-9
---
#### Question
DISCUSS the advantages and disadvantages of Wealth maximization principle.
#### Answer
**Advantages and disadvantages of Wealth maximization principle.**

***Advantages:***

(i) Emphasizes the long term gains

(ii) Recognises risk or uncertainty

(iii) Recognises the timing of returns

(iv) Considers shareholders’ return.

***Disadvantages:***

(i) Offers no clear relationship between financial decisions and share price.

(ii) Can lead to management anxiety and frustration.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.sources.long
difficulty: easy
q: 5
a: 9
---
#### Question
DISCUSS in brief the characteristics of Debentures.
#### Answer
**Characteristics of Debentures are as follows:**

- Normally, debentures are issued on the basis of a debenture trust deed which lists the terms and conditions on which the debentures are floated.
- Debentures are either secured or unsecured.
- May or may not be listed on the stock exchange.
- The cost of capital raised through debentures is quite low since the interest payable on debentures can be charged as an expense before tax.
- From the investors' point of view, debentures offer a more attractive prospect than the preference shares since interest on debentures is payable whether or not the company makes profits.
- Debentures are thus instruments for raising long-term debt capital.
- The period of maturity normally varies from 3 to 10 years and may also increase for projects having high gestation period.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.sources.other
difficulty: easy
q: 5
a: 9
note: ICAI prints one (2 Marks) for Q6(c), after its OR alternative (q6c-or); both alternatives carry it. The question says "Security Premium Notes"; ICAI's answer defines Secured Premium Notes; kept as printed.
---
#### Question
DEFINE Security Premium Notes.
#### Answer
**Secured Premium Notes:** Secured Premium Notes is issued along with a detachable warrant and is redeemable after a notified period of say 4 to 7 years. The conversion of detachable warrant into equity shares will have to be done within time period notified by the company.

---
item: q6c-or
qno: 6
part: (c)
marks: 2
type: descriptive
alt: q6c
tags: fm.sources.modern
difficulty: easy
q: 5
a: 9
note: ICAI prints this as the OR alternative to Q6(c), followed by the pair's (2 Marks).
---
#### Question
DEFINE Masala bond.
#### Answer
**Masala bond:** Masala (means spice) bond is an Indian name used for Rupee denominated bond that Indian corporate borrowers can sell to investors in overseas markets. These bonds are issued outside India but denominated in Indian Rupees. NTPC raised Rs. 2,000 crore via masala bonds for its capital expenditure in the year 2016.
