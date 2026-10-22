<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-mtp-nov2023-s2
paper: p8
kind: mtp
attempt: nov2023
series: s2
qfile: old/p8/mtp-nov2023-s2-q.pdf
afile: old/p8/mtp-nov2023-s2-a.pdf
choice: q1; any 4 of q2-q6
q: 1
accept: 2023
status: checked
by: tx-40
date: 2026-10-20
note: Old-scheme Paper 8A (Financial Management) of ICAI's Mock Test Paper 2 for the November 2023 examination (printed "Test Series: October, 2023", "MOCK TEST PAPER - 2"): questions from the question paper (pp.1-4), answers from ICAI's Suggested Answers/ Hints (pp.1-9); Paper 8B Economics for Finance (question paper p.5, answers pp.10-13) is not part of PassBook. Instructions: p.1 of the question paper (the paper title, the medium note, the choice lines, time and marks), which give choice: q1; any 4 of q2-q6 (Section 8A carries 60 marks: Q1 20 + four of Q2-Q6 at 10 each); minutes: is left out (ICAI's 3 hours cover 8A and 8B; the build prorates 108 minutes). Not transcribed: the header lines "Test Series: October, 2023", "MOCK TEST PAPER - 2", "INTERMEDIATE: GROUP – II" and "PAPER – 8: FINANCIAL MANAGEMENT & ECONOMICS FOR FINANCE" of both PDFs and the answers' "8A: FINANCIAL MANAGEMENT", "Suggested Answers/ Hints". Marks: ICAI prints them in square brackets ("[4 × 5 Marks = 20 Marks]" for Q1 (a)-(d), "[10 Marks]" ...), which check.py does not read; every item's marks: are ICAI's printed figures, Q6(c) and its OR alternative sharing one [2 Marks] (see q6c's note). Item model: Q2, Q3 and Q4 each carry one marks note and one connected answer, so each is one item; Q5(a) 8 marks and Q5(b) 2 marks are separate items. Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics; Q4 (sensitivity analysis) and Q6(b) (risk adjusted discount rate) are out of syllabus (oos, see their notes). ICAI's text kept as printed: the two "(i)" labels (Financial Leverage, Operating Leverage) in Q1(a)'s answer, "PVA F5 r" and "Internal outlay" (Q1(c)); "Advise to the Company" (Q2); see also the notes on q2, q3, q4 and q6b. Repaired extraction damage only, read from the rendered pages: stacked fractions, subscripts (K_e, K_d, D_1, P_0, PVAF_5) and powers written in KaTeX; the equation editor's run-together words ("Expecteddividend", "Cos t of goods sold", "AverageInventory", "Clo sing", "Netproceeds") and the text layer's "r isk", "risk -free", "work -in-progress" re-joined or separated; "31 st" as 31st. check.py: the accepted numbers are (1) the header lines above, not transcribed: 2 (MOCK TEST PAPER - 2), 8 (PAPER – 8, and the answers' 8A) and 2023 on p.1 of each PDF; (2) the figures of Q1(a)'s leverage and EPS fractions on answers p.1, which the text layer prints with spaces inside the grouping ("₹ 4, 80, 000", "₹ 2,10, 000", "20, 000"), so check.py reads them as 4, 80, 0 ... instead of 4,80,000 (4,80,000 and 4,00,000 twice, 3,80,000, 3,00,000, 8,80,000, 8,00,000, 2,66,000, 2,10,000, and 20,000 twice, against their pieces 0, 2, 3, 4, 8, 20, 66, 80 and 210); (3) "Rs.8,00,000" and "Rs.40,00,000" in Q2's ROCE formula (answers p.3), which check.py reads as 0 because of the point before the figure.
---
#### Instructions
**PAPER 8A: FINANCIAL MANAGEMENT**

*Answers are to be given only in English except in the case of the candidates who have opted for Hindi medium. If a candidate has not opted for Hindi medium his/ her answers in Hindi will not be valued.*

Question No. **1** is compulsory.

Attempt any **four** questions from the remaining **five** questions.

Working notes should form part of the answer.

**Time Allowed – 3 Hours (Total time for 8A and 8B)**

**Maximum Marks – 60**

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 1
a: 1
---
#### Question
The capital structure of AB Ltd. for the year ended 31st March, 2023 consisted as follows:

| Particulars | Amount in ₹ |
|---|---:|
| Equity share capital (face value ₹ 100 each) | 20,00,000 |
| 10% debentures (₹ 100 each) | 10,00,000 |

During the year 2022-23, sales decreased to 2,00,000 units as compared to 2,20,000 units in the previous year. However, the selling price stood at ₹ 10 per unit and variable cost at ₹ 6 per unit for both the years. The fixed expenses were at ₹ 4,00,000 p.a. and the income tax rate is 30%.

You are required to CALCULATE the following:

(i) The degree of financial leverage at 2,20,000 units and 2,00,000 units.

(ii) The degree of operating leverage at 2,20,000 units and 2,00,000 units.

(iii) The percentage change in EPS.
#### Answer
**Income Statement with required calculations**

| Particulars | (₹) | (₹) |
|---|---:|---:|
| Sales in units | 2,20,000 | 2,00,000 |
| Sales Value | 22,00,000 | 20,00,000 |
| Variable Cost | (13,20,000) | (12,00,000) |
| Contribution | 8,80,000 | 8,00,000 |
| Fixed expenses | (4,00,000) | (4,00,000) |
| EBIT | 4,80,000 | 4,00,000 |
| Debenture Interest | (1,00,000) | (1,00,000) |
| EBT | 3,80,000 | 3,00,000 |
| Tax @ 30% | (1,14,000) | (90,000) |
| Profit after tax (PAT) | 2,66,000 | 2,10,000 |
| No. of shares | 20,000 | 20,000 |
| (i) Financial Leverage $= \dfrac{\text{EBIT}}{\text{EBT}}$ | $= \dfrac{\text{₹ } 4{,}80{,}000}{\text{₹ } 3{,}80{,}000}$ = 1.26 | $= \dfrac{\text{₹ } 4{,}00{,}000}{\text{₹ } 3{,}00{,}000}$ = 1.33 |
| (i) Operating Leverage $= \dfrac{\text{Contribution}}{\text{EBIT}}$ | $= \dfrac{\text{₹ } 8{,}80{,}000}{\text{₹ } 4{,}80{,}000}$ = 1.83 | $= \dfrac{\text{₹ } 8{,}00{,}000}{\text{₹ } 4{,}00{,}000}$ = 2 |
| (iii) Earnings per share (EPS) $= \dfrac{\text{PAT}}{\text{No. of shares}}$ | $= \dfrac{\text{₹ } 2{,}66{,}000}{20{,}000}$ = ₹ 13.3 | $= \dfrac{\text{₹ } 2{,}10{,}000}{20{,}000}$ = ₹ 10.5 |
| Decrease in EPS | = ₹ 13.3 – ₹ 10.5 = ₹ 2.8 | |
| % decrease in EPS | $= \dfrac{2.8}{13.3} \times 100$ = 21.05% | |
#### Approach
Build one income statement for each year down to EPS (20,000 shares of ₹ 100); financial leverage is EBIT ÷ EBT and operating leverage contribution ÷ EBIT.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.div.models, fm.coc.equity
difficulty: medium
q: 1
a: 1-2
---
#### Question
PQR Ltd. is a blue-chip company listed in NSE in India with a face value of ₹ 100 per share. The company is expected to grow @ 15% p.a. for next four years then 5% for an indefinite period. The shareholders expect 20% return on their share investments. Company paid ₹ 150 as dividend per share for the current Financial Year. The shares of the company traded at an average price of ₹ 2,052 on last day. FIND out the intrinsic value per share and state whether shares are overpriced or underpriced.
#### Answer
**As per Dividend discount model, the price of share is calculated as follows:**

P= $\dfrac{D_1}{(1+K_e)^1} + \dfrac{D_2}{(1+K_e)^2} + \dfrac{D_3}{(1+K_e)^3} + \dfrac{D_4}{(1+K_e)^4} + \dfrac{D_5}{(K_e\text{-}g)} \times \dfrac{1}{(1+K_e)^4}$

Where,

P = Price per share

$K_e$ = Required rate of return on equity

g = Growth rate

P = $\dfrac{\text{₹}150\text{x}1.15}{(1+ 0.2)^1} + \dfrac{\text{₹}172.5\text{x}1.15}{(1+ 0.2)^2} + \dfrac{\text{₹}198.38\text{x}1.15}{(1+ 0.2)^3} + \dfrac{\text{₹}228.13\text{x}1.15}{(1+ 0.2)^4} + \dfrac{\text{₹}262.35\text{x}1.05}{(0.2 - 0.05)^1} \times \dfrac{1}{(1+ 0.2)^4}$

P = 143.75 + 137.76 + 132.02 + 126.52 + 885.63 = ₹ 1425.68

Intrinsic value of share is ₹ 1425.68 as compared to latest market price of ₹ 2052. Market price of a share is overpriced by ₹ 626.32.
#### Approach
Grow the current dividend at 15% for four years and discount each at 20%; the fifth year's dividend (grown at 5%) gives the constant-growth value at the end of year 4, which is discounted back four years.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.capbud.irr, fm.capbud.cashflows
difficulty: easy
q: 1
a: 2
---
#### Question
A company proposes to install a machine involving a Capital Cost of ₹72,00,000. The life of the machine is 5 years and its salvage value at the end of the life is nil. The machine will produce the net operating income after depreciation of ₹13,60,000 per annum. The Company’s tax rate is 35%.

The Net Present Value factors for 5 years are as under:

| | | | | | | | |
|---|---|---|---|---|---|---|---|
| Discounting Rate | : | 14 | 15 | 16 | 17 | 18 | 19 |
| Cumulative factor | : | 3.43 | 3.35 | 3.27 | 3.20 | 3.13 | 3.06 |

You are required to COMPUTE the internal rate of return (IRR) of the proposal.
#### Answer
| Computation of cash inflow per annum | ₹ |
|---|---:|
| Net operating income per annum | 13,60,000 |
| Less: Tax @ 35% | 4,76,000 |
| Profit after tax | 8,84,000 |
| Add: Depreciation (₹72,00,000 / 5 years) | 14,40,000 |
| Cash inflow | 23,24,000 |

The IRR of the investment can be found as follows:

NPV = – ₹ 72,00,000 + ₹ 23,24,000 ($\text{PVAF}_5$, r) = 0

or PVA $F_5$ r ( Cumulative factor) = $\dfrac{\text{₹}72{,}00{,}000}{\text{₹}23{,}24{,}000}$ = 3.09

**Computation of Internal Rate of Return (IRR)**

| | | |
|---|---:|---:|
| Discounting rate | 15% | 19% |
| Cumulative factor | 3.35 | 3.06 |
| Total NPV (₹) | 77,85,400 (₹23,24,000 × 3.35) | 71,11,440 (₹23,24,000 × 3.06) |
| Internal outlay (₹) | 72,00,000 | 72,00,000 |
| Surplus (Deficit) (₹) | 5,85,400 | (88,560) |

IRR = LR + $\dfrac{\text{NPV at LR}}{\text{NPV at LR - NPV at HR}} \times (\text{HR -LR})$

= 15% + $\dfrac{5{,}85{,}400}{5{,}85{,}400 - (-88{,}560)} \times (19\% -15\%)$

= 15% +3.47 =18.47%

**Note:** Lower rate can be 18% or less than 18%. However, there will be no change in the final answer.
#### Approach
Add the depreciation back to the after-tax income to get the annual cash inflow; outlay ÷ inflow gives the annuity factor to look up, and interpolation between two rates gives the IRR.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.ratio.activity, fm.ratio.liquidity
difficulty: easy
q: 2
a: 2-3
---
#### Question
ABC Ltd. has total sales of 12,00,000 all of which are credit sales. It has a gross profit ratio of 20% on sales and a current ratio of 2. The company’s current liabilities are ₹ 3,00,000. Further, it has inventories of ₹ 1,00,000, marketable securities of ₹ 70,000 and cash of ₹ 50,000. From the above information:

(i) CALCULATE the average inventory if the expected inventory turnover ratio is three times?

(ii) Also CALCULATE the average collection period if the opening balance of debtors is expected to be ₹ 1,20,000.

Assume 360 days a year.
#### Answer
**(i) Calculation of Average Inventory**

Since gross profit is 20% of sales, the cost of goods sold should be 80% of the sales.

Cost of goods sold = 12,00,000 x $\dfrac{80}{100}$ = 9,60,000

Inventory Turnover = $\dfrac{\text{Cost of goods sold}}{\text{Average Inventory}}$

3 = $\dfrac{9{,}60{,}000}{\text{Average Inventory}}$

Average Inventory = $\dfrac{9{,}60{,}000}{3}$ = 3,20,000

**(ii) Calculation of Average Collection Period**

Average Collection Period = $\dfrac{\text{Average Receivables}}{\text{Credit Sales}}$ x 360

Where, Average Receivables = $\dfrac{\text{Opening Receivables + Closing Receivables}}{2}$

**Calculation of Closing balance of Receivables**

| | ₹ | ₹ |
|---|---:|---:|
| Current Assets (2 x 3,00,000) | | 6,00,000 |
| Less: Inventories | 1,00,000 | |
| Less: Marketable Securities | 70,000 | |
| Less: Cash | 50,000 | 2,20,000 |
| **Receivables (Closing Balance)** | | **3,80,000** |

Now, Average Receivables = $\dfrac{1{,}20{,}000 + 3{,}80{,}000}{2}$ = 2,50,000

So, Average Collection Period = $\dfrac{2{,}50{,}000}{12{,}00{,}000}$ x 360 = 75 days
#### Approach
Inventory turnover is measured on cost of goods sold (80% of sales). For the debtors, current assets come from the current ratio; what is left after inventories, securities and cash is the closing receivables.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.cs.ebiteps
difficulty: medium
q: 2
a: 3-4
note: ICAI's own text kept as printed: the question gives the new debt "at the rate of 12%", while ICAI's answer charges the new capital's interest as "(₹10,00,000 × 10%)" = 1,00,000; "Rs." in Working Note 3 and "Advise to the Company" are as printed. Not corrected.
---
#### Question
A Company earns a profit of ₹7,00,000 per annum after meeting its interest liability of ₹1,00,000 on 10% debentures. The Tax rate is 40%. The number of Equity Shares of ₹10 each are 1,00,000 and the retained earnings amount to ₹20,00,000. The company proposes to take up an expansion scheme for which a sum of ₹10,00,000 is required. It is anticipated that after expansion, the company will be able to achieve the same return on investment as at present. The funds required for expansion can be raised either through debt at the rate of 12% or by issuing equity shares at par.

Required:

(i) COMPUTE the Earnings per Share (EPS), if:

- The additional funds were raised as debt
- The additional funds were raised by issue of equity shares.

(ii) ADVISE the company as to which source of finance is preferable.
#### Answer
**Working Notes:**

**1. Capital employed before expansion plan:**

| | (₹) |
|---|---:|
| Equity shares (₹10 × 1,00,000 shares) | 10,00,000 |
| Debentures {(₹1,00,000/10) × 100} | 10,00,000 |
| Retained earnings | 20,00,000 |
| Total capital employed | 40,00,000 |

**2. Earnings before the payment of interest and tax (EBIT):**

| | (₹) |
|---|---:|
| Profit (EBT) | 7,00,000 |
| Add: Interest | 1,00,000 |
| EBIT | 8,00,000 |

**3. Return on Capital Employed (ROCE):**

ROCE = $\dfrac{\text{EBIT}}{\text{Capital employed}} \times 100 = \dfrac{\text{Rs.}8{,}00{,}000}{\text{Rs.}40{,}00{,}000} \times 100$ = 20%

**4. Earnings before interest and tax (EBIT) after expansion scheme:**

After expansion, capital employed = ₹40,00,000 + ₹10,00,000

= ₹ 50,00,000

Desired EBIT = 20% × ₹50,00,000 = ₹10,00,000

**(i) Computation of Earnings Per Share (EPS) under the following options:**

| | Present situation | Expansion scheme Additional funds raised as | |
|---|---:|---:|---:|
| | | **Debt** | **Equity** |
| | **(₹)** | **(₹)** | **(₹)** |
| Earnings before Interest and Tax (EBIT) | 8,00,000 | 10,00,000 | 10,00,000 |
| Less: Interest - Old capital | 1,00,000 | 1,00,000 | 1,00,000 |
| - New capital | -- | 1,00,000 (₹10,00,000 × 10%) | -- |
| Earnings before Tax (EBT) | 7,00,000 | 8,00,000 | 9,00,000 |
| Less: Tax (40% of EBT) | 2,80,000 | 3,20,000 | 3,60,000 |
| PAT | 4,20,000 | 4,80,000 | 5,40,000 |
| No. of shares outstanding | 1,00,000 | 1,00,000 | 2,00,000 |
| Earnings per Share (EPS) | 4.20 $\left(\dfrac{\text{₹}4{,}20{,}000}{1{,}00{,}000}\right)$ | 4.80 $\left(\dfrac{\text{₹}4{,}80{,}000}{1{,}00{,}000}\right)$ | 2.70 $\left(\dfrac{\text{₹}5{,}40{,}000}{2{,}00{,}000}\right)$ |

**(ii) Advise to the Company**: When the expansion scheme is financed by additional debt, the EPS is higher. Hence, the company should finance the expansion scheme by raising debt.
#### Approach
Find the present return on capital employed (EBIT over equity, debentures and retained earnings) and apply it to the enlarged capital to get the new EBIT; then compare EPS under each financing option.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.coc.wacc, fm.coc.equity, fm.coc.debt
difficulty: medium
q: 2
a: 4-5
note: ICAI's own text kept as printed: Working Note 2 is headed "Cost of 10% Debentures" for the 11% debentures (its working uses ₹ 22,00,000, 11% of ₹ 2,00,00,000); the equation editor's run-together "Expecteddividend" and "Current Market Pr ice" are written as separate words.
---
#### Question
Q Ltd. has the following capital structure at book-value as on 31st March 2022:

| Particulars | (₹) |
|---|---:|
| Equity share capital (10,00,000 shares) | 4,00,00,000 |
| 12% Preference shares | 80,00,000 |
| 11% Debentures | 2,00,00,000 |
| | 6,80,00,000 |

The equity shares of the company are sold for ₹ 400. It is expected that the company will pay next year a dividend of ₹ 20 per equity share, which is expected to grow by 5% p.a. forever. Assume a 30% corporate tax rate.

Required:

(i) COMPUTE weighted average cost of capital (WACC) of the company based on the existing capital structure.

(ii) COMPUTE the new WACC, if the company raises an additional ₹ 50 lakhs debt by issuing 12% debentures. This would result in increasing the expected equity dividend to ₹ 25 and leave the growth rate unchanged, but the price of equity share will fall to ₹ 300 per share.
#### Answer
**(i) Computation of Weighted Average Cost of Capital based on existing capital structure**

| Source of Capital | Existing Capital structure (₹) | Weights (a) | After tax cost of capital (%) (b) | WACC (%) (a) × (b) |
|---|---:|---:|---:|---:|
| Equity share capital (W.N.1) | 4,00,00,000 | 0.588 | 10.00 | 5.88 |
| 12% Preference share capital | 80,00,000 | 0.118 | 12.00 | 1.42 |
| 11% Debentures (W.N.2) | 2,00,00,000 | 0.294 | 7.70 | 2.26 |
| Total | 6,80,00,000 | 1.000 | | 9.56 |

**Working Notes:**

1\. Cost of Equity Capital:

$K_e$ = $\dfrac{\text{Expected dividend } (D_1)}{\text{Current Market Price } (P_0)}$ + Growth(g)

= $\dfrac{20}{400}$ + 0.05

= 10%

2\. Cost of 10% Debentures

$K_d$ = $\dfrac{\text{Interest}(1-t)}{\text{Net proceeds}}$

= $\dfrac{22{,}00{,}000\ (1\text{-} 0.30)}{2{,}00{,}00{,}000}$

= 0.077 or 7.7%

**(ii) Computation of Weighted Average Cost of Capital based on new capital structure**

| Source of Capital | New Capital structure (₹) | Weights (a) | After tax cost of capital (%) (b) | WACC (%) (a) x (b) |
|---|---:|---:|---:|---:|
| Equity share capital (W.N.3) | 4,00,00,000 | 0.548 | 13.33 | 7.30 |
| 12% Preference share capital | 80,00,000 | 0.110 | 12.00 | 1.32 |
| 11% Debentures (W.N.2) | 2,00,00,000 | 0.274 | 7.70 | 2.11 |
| 12% Debentures (W.N.4) | 50,00,000 | 0.068 | 8.40 | 0.57 |
| Total | 7,30,00,000 | 1.000 | | 11.30 |

**Working Notes:**

3\. Cost of Equity Capital:

$K_e$ = $\dfrac{25}{300}$ + 0.05

= 13.33%

4\. Cost of 12% Debentures

$K_d$ = $\dfrac{6{,}00{,}000\ (1\text{-} 0.30)}{50{,}00{,}000}$

= 0.084 or 8.4%
#### Approach
Book-value weights; the cost of equity is D1 ÷ P0 + g, and the new dividend and price change it in part (ii). Preference capital has no tax shield, debentures do.

---
item: q4
qno: 4
marks: 10
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
oos: yes
difficulty: hard
q: 2-3
a: 5-7
note: Out of syllabus (old scheme): requirement (ii), the sensitivity of the NPV to a 10% fall in selling price and a 10% rise in the cost of plant, is Risk Analysis in Capital Budgeting, which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material (as o-p8-pyq-nov2023 q5a). Requirement (i), the NPV decision, is in syllabus: the tags name it. ICAI prints one [10 Marks] for both requirements, so the item is not split. ICAI's own figures kept as printed: "1383.71" in the NPV sum where the table prints 1,381.71; "1936.16", "1024", "1660", "1162" and the like without grouping; the bracketing "(3172.44-1997.95/3172.44)" and "(3,172.44 - 2,999.13/3172.44)".
---
#### Question
A&R Ltd. has undertaken a project which has an initial investment of ₹2,000 lakhs in plant & machinery and ₹ 600 lakhs for working capital. The plant & machinery would have a salvage value of ₹ 525 lakhs at the end of the fifth year. The plant & machinery would depreciate at the rate of 20% p.a. on the WDV method. The other details of the project for the five-year period are as follows:

| | |
|---|---|
| Sales | 10,00,000 units p.a. |
| Selling price per unit | ₹500 |
| Variable cost | 50% of selling price |
| Fixed overheads (excluding depreciation) | ₹400 lakh p.a. |
| Corporate tax rate | 30% |
| Rate of interest on bank loan | 12% |
| After tax required rate of return | 15% |

Required:

(i) CALCULATE net present value (NPV) of the project and DETERMINE the viability of the project.

(ii) DETERMINE the sensitivity of project’s NPV under each of the following condition:

a. Decrease in selling price by 10%.

b. Increase in cost of plant & machinery by 10%.

| PV factor | Year-1 | Year-2 | Year-3 | Year-4 | Year-5 |
|---|---|---|---|---|---|
| **12%** | 0.892 | 0.797 | 0.711 | 0.635 | 0.567 |
| **15%** | 0.869 | 0.756 | 0.657 | 0.571 | 0.497 |
#### Answer
**(i) Calculation of Net Present Value (NPV):**

| | Year-1 | Year-2 | Year-3 | Year-4 | Year-5 |
|---|---:|---:|---:|---:|---:|
| Sales volume (Qty. in lakh) | 10 | 10 | 10 | 10 | 10 |
| Contribution per unit (₹) (Selling price – variable cost) | 250 | 250 | 250 | 250 | 250 |
| Total contribution (₹in lakh) | 2,500 | 2,500 | 2,500 | 2,500 | 2,500 |
| Less: Fixed overheads (₹ In lakh) | 400 | 400 | 400 | 400 | 400 |
| PBDT | 2,100 | 2,100 | 2,100 | 2,100 | 2,100 |
| Less: Depreciation (₹ in lakh) (Working note 1) | 400 | 320 | 256 | 204.8 | 163.84 |
| PBT | 1,700 | 1,780 | 1,844 | 1,895.2 | 1936.16 |
| Less: Tax @ 30% | 510 | 534 | 553.2 | 568.56 | 580.85 |
| PAT | 1,190 | 1,246 | 1,290.8 | 1,326.64 | 1,355.31 |
| Add: Depreciation | 400 | 320 | 256 | 204.8 | 163.84 |
| Add: Salvage value of plant & machinery | - | - | - | - | 525 |
| Add: Working capital | - | - | - | - | 600 |
| Net Cash inflow | 1,590 | 1,566 | 1,546.8 | 1,531.44 | 2,644.15 |
| P.V factor @15% | 0.869 | 0.756 | 0.657 | 0.571 | 0.497 |
| P.V of cash inflows | 1,381.71 | 1,183.90 | 1,016.24 | 874.45 | 1,314.14 |

Net Present Value = P.V of cash inflows – P.V of cash outflows

= ₹ (1383.71+1183.9+1016.24+874.45+1314.14) – (₹2,000 + ₹ 600)

= 5772.44 – 2600 = ₹3172.44 lakh

The NPV of the project is positive, hence, the project is viable.

**Working note 1:**

| | Year-1 (₹ in lakhs) | Year-2 (₹ in lakhs) | Year-3 (₹ in lakhs) | Year-4 (₹ in lakhs) | Year-5 (₹ in lakhs) |
|---|---:|---:|---:|---:|---:|
| Opening balance | 2,000 | 1,600 | 1,280 | 1024 | 819.20 |
| Depreciation @20% | 400 | 320 | 256 | 204.8 | 163.84 |
| Closing WDV | 1,600 | 1,280 | 1024 | 819.2 | 655.36 |

**(ii) Determination of sensitivity of NPV w.r.t.**

**a. Decrease in selling price by 10%**

| | Year-1 | Year-2 | Year-3 | Year-4 | Year-5 |
|---|---:|---:|---:|---:|---:|
| Sales volume (Qty. in lakh) | 10 | 10 | 10 | 10 | 10 |
| New Selling price | 450 | 450 | 450 | 450 | 450 |
| Variable cost | 250 | 250 | 250 | 250 | 250 |
| Contribution per unit (₹) (Selling price – variable cost) | 200 | 200 | 200 | 200 | 200 |
| Total contribution (₹in lakh) | 2,000 | 2,000 | 2,000 | 2,000 | 2,000 |
| Less: Fixed overheads (₹ In lakh) | 400 | 400 | 400 | 400 | 400 |
| PBDT | 1,600 | 1,600 | 1,600 | 1,600 | 1,600 |
| Less: Depreciation (₹ in lakh) (Working note 1) | 400 | 320 | 256 | 204.8 | 163.84 |
| PBT | 1,200 | 1,280 | 1,344 | 1,395.2 | 1,436.16 |
| Less: Tax @ 30% | 360 | 384 | 403.2 | 418.56 | 430.85 |
| PAT | 840 | 896 | 940.8 | 976.64 | 1,005.31 |
| Add: Depreciation | 400 | 320 | 256 | 204.8 | 163.84 |
| Add: Salvage value of plant & machinery | - | - | - | - | 525 |
| Add: Working capital | - | - | - | - | 600 |
| Net Cash inflow | 1,240 | 1,216 | 1,196.8 | 1,181.44 | 2,294.15 |
| P.V factor @15% | 0.869 | 0.756 | 0.657 | 0.571 | 0.497 |
| P.V of cash inflows | 1,077.56 | 919.30 | 786.30 | 674.60 | 1,140.19 |

NPV = ₹ (1,077.56+919.30+786.30+674.60+1,140.19) – (₹ 2,000 + ₹ 600)

= ₹ 4,597.95 – ₹ 2,600 = ₹1,997.95 lakh

**10% reduction in selling price reduces the NPV by 37.02% (3172.44-1997.95/3172.44)**

**b. Increase in project cost by 10%**

| | Year-1 | Year-2 | Year-3 | Year-4 | Year-5 |
|---|---:|---:|---:|---:|---:|
| PBDT | 2,100 | 2,100 | 2,100 | 2,100 | 2,100 |
| Less: Depreciation (₹ in lakh) (Working note 2) | 440 | 352 | 281.6 | 225.28 | 180.22 |
| PBT | 1660 | 1748 | 1818.4 | 1874.72 | 1919.78 |
| Less: Tax @ 30% | 498 | 524.40 | 545.52 | 562.42 | 575.93 |
| PAT | 1162 | 1223.6 | 1272.88 | 1312.30 | 1343.85 |
| Add: Depreciation | 440 | 352 | 281.60 | 225.28 | 180.22 |
| Add: Salvage value of plant & machinery | - | - | - | - | 525 |
| Add: Working capital | - | - | - | - | 600 |
| Net Cash inflow | 1,602 | 1,575.6 | 1,554.48 | 1,537.58 | 2,649.07 |
| P.V factor @15% | 0.869 | 0.756 | 0.657 | 0.571 | 0.497 |
| P.V of cash inflows | 1,392.14 | 1,191.15 | 1,021.29 | 877.96 | 1316.59 |

NPV = ₹ (1,392.14+1,191.15+1,021.29+877.96+1,316.59) – (₹ 2,200 + ₹ 600)

= ₹ 5,799.13 – ₹ 2,800 = ₹2,999.13 lakh

**10% increase in project cost reduces the NPV only by 5.46% (3,172.44 - 2,999.13/3172.44)**

**Working note 2:**

| | Year-1 | Year-2 | Year-3 | Year-4 | Year-5 |
|---|---:|---:|---:|---:|---:|
| Opening balance | 2,200 | 1,760 | 1408 | 1126.4 | 901.12 |
| Depreciation @20% | 440 | 352 | 281.6 | 225.28 | 180.22 |
| Closing WDV | 1,760 | 1408 | 1126.40 | 901.12 | 702.90 |
#### Approach
Build the yearly cash flows (contribution less fixed overheads, tax after WDV depreciation, depreciation added back, salvage and working capital released in year 5) and discount at the 15% after-tax rate; for each sensitivity, change one input and recompute.

---
item: q5a
qno: 5
part: (a)
marks: 8
type: descriptive
tags: fm.wc.estimate
difficulty: medium
q: 3
a: 7-8
---
#### Question
Cost sheet of X&Y Ltd. provides the following particulars:

| | Amount per unit (₹) |
|---|---:|
| Raw materials cost | 260.00 |
| Direct labour cost | 125.00 |
| Overheads cost | 200.00 |
| Total cost | 585.00 |
| Profit | 75.00 |
| Selling Price | 660.00 |

The Company keeps raw material in stock, on an average for four weeks; work-in-progress, on an average for one week; and finished goods in stock, on an average for two weeks.

The credit allowed by suppliers is three weeks and company allow four weeks credit to its debtors. The lag in payment of wages is one week and lag in payment of overhead expenses is two weeks.

The Company sells one-fifth of the output against cash and maintains cash-in-hand and at bank put together at ₹ 2,70,000.

Required:

PREPARE a statement showing estimate of Working Capital needed to finance an activity level of 2,40,000 units of production. Assume that production is carried on evenly throughout the year, and wages and overheads accrue similarly. Work-in-progress stock is 75% complete in all respects.
#### Answer
**Statement showing Estimate of Working Capital Needs**

| | (Amount in ₹) | (Amount in ₹) |
|---|---:|---:|
| **A. Current Assets** | | |
| (i) Inventories: | | |
| Raw material (4 weeks) $\left(\dfrac{2{,}40{,}000 \text{ units} \times \text{₹}260}{52 \text{ weeks}} \times 4 \text{ weeks}\right)$ | 48,00,000 | |
| WIP Inventory (1 week) $\left(\dfrac{2{,}40{,}000 \text{ units} \times \text{₹}585}{52 \text{ weeks}} \times 1 \text{ week}\right) \times 0.75$ | 20,25,000 | |
| Finished goods inventory (2 weeks) $\left(\dfrac{2{,}40{,}000 \text{ units} \times \text{₹}585}{52 \text{ weeks}} \times 2 \text{ weeks}\right)$ | 54,00,000 | **1,22,25,000** |
| (ii) Receivables (Debtors) (4 weeks) $\left(\dfrac{2{,}40{,}000 \text{ units} \times \text{₹}585}{52 \text{ weeks}} \times 4 \text{ weeks}\right) \times \dfrac{4}{5}$ | | 86,40,000 |
| (iii) Cash and bank balance | | 2,70,000 |
| Total Current Assets | | 2,11,35,000 |
| **B. Current Liabilities:** | | |
| (i) Payables (Creditors) for materials (3 weeks) $\left(\dfrac{2{,}40{,}000 \text{ units} \times \text{₹}260}{52 \text{ weeks}} \times 3 \text{ weeks}\right)$ | | 36,00,000 |
| (ii) Outstanding wages (1 week) $\left(\dfrac{2{,}40{,}000 \text{ units} \times \text{₹}125}{52 \text{ weeks}} \times 1 \text{ week}\right)$ | | 5,76,923 |
| (iii) Outstanding overheads (2 weeks) $\left(\dfrac{2{,}40{,}000 \text{ units} \times \text{₹}200}{52 \text{ weeks}} \times 2 \text{ weeks}\right)$ | | 18,46,154 |
| Total Current Liabilities | | 60,23,077 |
| Net Working Capital Needs (A – B) | | 1,51,11,923 |
#### Approach
Convert each holding or credit period in weeks into a share of the annual figure (units × cost per unit ÷ 52); value WIP at 75% of total cost and debtors at cost on the four-fifths sold on credit.

---
item: q5b
qno: 5
part: (b)
marks: 2
type: descriptive
tags: fm.wc.basics
difficulty: easy
q: 3-4
a: 8
---
#### Question
The following information is provided by the Shrishti Ltd. for the year ending 31st March 2022.

| | |
|---|---|
| Raw Material storage period | 54 days |
| Work in progress conversion period | 20 days |
| Finished Goods storage period | 22 days |
| Debt Collection period | 74 days |
| Creditors' payment period | 25 days |
| Annual Operating Cost | 45 crore |

(Including depreciation of ₹42,00,000)

(1 year = 360 days)

You are required to CALCULATE Operating Cycle period and Number of Operating Cycles in a year.
#### Answer
**Calculation of Operating Cycle Period and number of Operating Cycle in a Year**

Operating Cycle Period = R + W + F + D – C

= 54 + 20 + 22 + 74 – 25 = 145 days

Number of Operating Cycle in a Year = $\dfrac{360}{\text{Operating Cycle Period}}$

= 360/145 = 2.48 times
#### Approach
Add the raw material, WIP, finished goods and debtors periods and subtract the creditors' period; the annual operating cost is not needed for this.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.sources.short
difficulty: easy
q: 4
a: 8-9
---
#### Question
DESCRIBE the different types of packing credit.
#### Answer
**Different types of packing credit are-**

**(i) Clean packing credit:** This is an advance made available to an exporter only on production of a firm export order or a letter of credit without exercising any charge or control over raw material or finished goods. It is a clean type of export advance. Each proposal is weighed according to particular requirements of the trade and credit worthiness of the exporter. A suitable margin has to be maintained. Also, Export Credit Guarantee Corporation (ECGC) cover should be obtained by the bank.

**(ii) Packing credit against hypothecation of goods:** Export finance is made available on certain terms and conditions where the exporter has pledgeable interest and the goods are hypothecated to the bank as security with stipulated margin. At the time of utilising the advance, the exporter is required to submit, along with the firm export order or letter of credit relative stock statements and thereafter continue submitting them every fortnight and/or whenever there is any movement in stocks.

**(iii) Packing credit against pledge of goods:** Export finance is made available on certain terms and conditions where the exportable finished goods are pledged to the banks with approved clearing agents who will ship the same from time to time as required by the exporter. The possession of the goods so pledged lies with the bank and is kept under its lock and key.

**(iv) E.C.G.C. guarantee:** Any loan given to an exporter for the manufacture, processing, purchasing, or packing of goods meant for export against a firm order qualifies for the packing credit guarantee issued by Export Credit Guarantee Corporation.

**(v) Forward exchange contract:** Another requirement of packing credit facility is that if the export bill is to be drawn in a foreign currency, the exporter should enter into a forward exchange contact with the bank, thereby avoiding risk involved in a possible change in the rate of exchange.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.capbud
oos: yes
difficulty: easy
q: 4
a: 9
note: Out of syllabus (old scheme): the risk adjusted discount rate is Risk Analysis in Capital Budgeting, which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material; tagged with the nearest chapter, Investment Decisions. ICAI's own text kept as printed: "investors demands", "So Risks adjusted discount rate".
---
#### Question
EXPLAIN the concept of risk adjusted discount rate.
#### Answer
**Risk Adjusted Discount Rate:** The use of risk adjusted discount rate (RADR) is based on the concept that investors demands higher returns from the risky projects. The required rate of return on any investment should include compensation for delaying consumption plus compensation for inflation equal to risk free rate of return, plus compensation for any kind of risk taken. If the risk associated with any investment project is higher than risk involved in a similar kind of project, discount rate is adjusted upward in order to compensate this additional risk borne.

A risk adjusted discount rate is a **sum of risk free rate and risk premium.** The Risk Premium depends on the perception of risk by the investor of a particular investment and risk aversion of the Investor.

So Risks adjusted discount rate = Risk free rate+ Risk premium

**Risk Free Rate:** It is the rate of return on Investments that bear no risk. For e.g., Government securities yield a return of 6 % and bear no risk. In such case, 6 % is the risk-free rate.

**Risk Premium:** It is the rate of return over and above the risk-free rate, expected by the Investors as a reward for bearing extra risk. For high risk project, the risk premium will be high and for low risk projects, the risk premium would be lower.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.intro.role
difficulty: easy
q: 4
a: 9
note: ICAI prints one [2 Marks] for Q6(c) and its OR alternative together, at the end of the alternative; the 2 marks are the (c) slot's and are given to both items.
---
#### Question
Write a short note on role of finance controller.
#### Answer
**Role of Financial Controller:** The role of financial controller has undergone changes over the years. Until the middle of this century, its scope was limited to procurement of funds under major events in the life of the enterprise such as promotion, expansion, merger, etc. In the modern times, the role of financial controller includes besides procurement of funds, the three different kinds of decisions as well, namely, investment, financing and dividend.

The financial controller, in a bid to maximize shareholders’ wealth, should strive to maximize returns in relation to the given risk; he should seek courses of actions that avoid unnecessary risks. To ensure maximum return, funds flowing in and out of the firm should be constantly monitored to assure that they are safeguarded and properly utilized.

---
item: q6c-or
qno: 6
part: (c)
marks: 2
type: descriptive
alt: q6c
tags: fm.coc.equity
difficulty: easy
q: 4
a: 9
note: ICAI prints this as an OR alternative to Q6(c); its [2 Marks] is printed at the end of this alternative and covers either.
---
#### Question
DISCUSS the dividend-price approach to estimate cost of equity capital.
#### Answer
In dividend price approach, cost of equity capital is computed by dividing the expected dividend by market price per share. This ratio expresses the cost of equity capital in relation to what yield the company should pay to attract investors. It is computed as:

$K_e = \dfrac{D_1}{P_0}$

Where,

$D_1$ = Dividend per share in period 1

$P_0$ = Market price per share today.
