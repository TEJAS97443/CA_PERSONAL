<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-pyq-may2023
paper: p8
kind: pyq
attempt: may2023
qfile: old/p8/pyq-may2023-a.pdf
afile: old/p8/pyq-may2023-a.pdf
paperfile: old/p8/pyq-may2023-q.pdf
choice: q1; any 4 of q2-q6
q: 1
status: checked
by: tx-34
date: 2026-10-20
accept: 2023, 2023, 2023, 2023
note: Old-scheme Paper 8 (Financial Management and Economics for Finance), May 2023: only Section A Financial Management (pp.1-21 of ICAI's Suggested Answers) is transcribed; Section B Economics for Finance (pp.22-35) is not (no blocks cite it). Text from the Suggested Answers (qfile and afile), which reproduce every question (in italics) before its answer; the question-paper booklet scan (OCR text) is linked as paperfile and was not used for the text. Instructions: ICAI's Section A box on p.1 ("Question No. 1 is compulsory. Attempt any four questions out of the remaining five questions."), which gives the choice rule; Section A carries 60 marks (Q1 20 + four of Q2-Q6 at 10 each). ICAI prints no separate time for Section A (3 hours for the whole paper), so minutes: is left out. Item model: Q1 (a)-(d) are separate 5-mark questions; Q4's requirements (i) and (ii) carry one marks note (10) and one connected answer, so Q4 is one item; Q6(c) has an OR alternative (q6c-or, alt: q6c). Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics; no item is out of syllabus. Q1(c) uses best / most likely / worst case figures; scenario analysis as a risk-analysis technique is not in the new Intermediate syllabus, but the item asks only for NPV computations from the given cash flows, so it is tagged fm.capbud.npv and not marked oos. ICAI's own wording kept as printed: "Following information are given" (Q1(a)); "the company want to liberalize", "Due to which" (Q1(b)); "will result EPS to zero" (Q1(d)); "The company is proposed to take up" and "whereas;" (Q3); "Vendor of this machine is agreed", "at the beginning of year", "Advice, whether" and "PVIF0.12, t" (Q5); "in order to issue of bonus shares" (Q6(a)); in the answers: "$k_e$= r" with a small k, and "D1", "Ke" without subscripts in the (v) formula (Q1(a)); "Reserves &Surplus", and "Long-term debt *(B/F)" whose asterisk has no footnote (Q2); "Debt Equity ratio(Debt/Shareholders fund)" (Q3); the second alternative presentation of Q4 labelled "(i)" by ICAI although it answers (ii); "PBTD" as the column heading, "106,125", "1,87,625.0", "641307.420", "additional deprecation", "Replaced cost of old machine" and two asterisks without footnote in the incremental NPV table (Q5); "fulfill", "Securities Exchange Board of India", "Article of Association" (Q6(a)); the mismatched quotes ‘trading on equity” (Q6(c)). Repaired extraction damage only: the ∴ signs and the minus / plus signs of Q4's preference-share formula, which the text layer drops (read from the rendered pages); the superscripts of "31st March"; "w ould" (Q6(b)); the subscripts of $K_e$, $D_0$, $D_1$, $P_0$ and of PVIF / FVIF written in KaTeX; the Rupee-font backtick as ₹. Not transcribed: underline rules under totals. check.py: the numbers accepted are the paper's title "PAPER – 8" on p.1 (8) and the running heads of pp.2-21, which check.py does not drop because each carries its page number: the odd pages' "PAPER – 8 : FINANCIAL MANAGEMENT AND ECONOMICS FOR FINANCE n" (8, up to four times in a page group with the 8 of p.8's page number, and the page numbers 3 … 21) and the even pages' "n INTERMEDIATE EXAMINATION: MAY, 2023" (the page numbers 2 … 20 and 2023, up to four times in a group); and the question numbers 1 to 6 on the answer side, which the Suggested Answers print once ("Question N" before the reproduced question, then "Answer" without a number) while check.py expects them on both sides.
---
#### Instructions
**SECTION A: FINANCIAL MANAGEMENT**

Question No. **1** is compulsory.

Attempt any **four** questions out of the remaining **five** questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the answer.

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: medium
q: 1
a: 2-4
---
#### Question
Following information are given for a company:

| | |
|---|---:|
| Earnings per share | ₹ 10 |
| P/E ratio | 12.5 |
| Rate of return on investment | 12% |
| Market price per share as per Walter’s Model | ₹ 130 |

You are required to calculate:

(i) Dividend payout ratio.

(ii) Market price of share at optimum dividend payout ratio.

(iii) P/E ratio, at which the dividend policy will have no effect on the price of share.

(iv) Market price of share at this P/E ratio.

(v) Market price of share using Dividend growth model.
#### Answer
**(i)** The EPS of the firm is ₹ 10, r =12%. The P/E Ratio is given at 12.5 and the cost of capital ($K_e$) may be taken as the inverse of P/E ratio. Therefore, $K_e$ is 8% (i.e., 1/12.5). The value of the share is ₹ 130 which may be equated with Walter Model as follows:

P = $\dfrac{D+\dfrac{r}{K_e}(E-D)}{K_e}$ or P = $\dfrac{D+\dfrac{12\%}{8\%}(10-D)}{8\%}$

or [D+1.5(10-D)]/0.08=130

or D+15-1.5D=10.4

or -0.5D=-4.6

So, D = ₹ 9.2

The firm has a dividend pay-out of 92% (i.e., 9.2/10).

**(ii)** Since the rate of return of the firm (r) is 12% and it is more than the Ke of 8%, therefore, by distributing 92% of earnings, the firm is not following an optimal dividend policy. The optimal dividend policy for the firm would be to pay zero dividend and in such a situation, the market price would be:

P = $\dfrac{0+\dfrac{12\%}{8\%}(10-0)}{8\%}$

P = ₹ 187.5

So, theoretically the market price of the share can be increased by adopting a zero pay-out.

**(iii)** The P/E ratio at which the dividend policy will have no effect on the value of the share is such at which the $K_e$ would be equal to the rate of return (r) of the firm. The $K_e$ would be 12% (= r) at the P/E ratio of 1/12%=8.33. Therefore, at the P/E ratio of 8.33, the dividend policy would have no effect on the value of the share.

**(iv)** If the P/E is 8.33 instead of 12.5, then the $K_e$ which is the inverse of P/E ratio, would be 12% and in such a situation $k_e$= r and the market price, as per Walter’s model would be:

P = $\dfrac{D+\dfrac{r}{K_e}(E-D)}{K_e}$ = $\dfrac{9.2+\dfrac{0.12}{0.12}(10-9.2)}{0.12}$ = ₹ 83.33

**(v) Dividend Growth Model applying growth on dividend**

$K_e$ = 8%, r = 12%, $D_0$ = 9.2, b = 0.08

g = b.r

g = 0.08 x 0.12=0.96%

$D_1$ = $D_0$ (1+g) = 9.2 (1+0.0096) = ₹ 9.2883

**P** = $\dfrac{D1}{(Ke-g)}$ = 9.2883/(0.08 – 0.0096) = 9.2883/0.0704 = ₹ 131.936

**Alternative**

**Alternatively, without applying growth on dividend**

**P** = $\dfrac{E(1-b)}{Ke-br}$ = $\dfrac{10(1-0.08)}{0.08-(0.08 \times 0.12)}$ = ₹ 130.68
#### Approach
Take the cost of equity as the inverse of the P/E ratio and solve Walter's formula for the dividend; then compare r with the cost of equity to find the optimum payout.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.wc.receivables
difficulty: medium
q: 1
a: 4-5
---
#### Question
A company has current sale of ₹ 12 lakhs per year. The profit-volume ratio is 20% and post-tax cost of investment in receivables is 15%. The current credit terms are 1/10, net 50 days and average collection period is 40 days. 50% of customers in terms of sales revenue are availing cash discount and bad debt is 2% of sales.

In order to increase sales, the company want to liberalize its existing credit terms to 2/10, net 35 days. Due to which, expected sales will increase to ₹ 15 lakhs. Percentage of default in sales will remain same. Average collection period will decrease by 10 days. 80% of customers in terms of sales revenue are expected to avail cash discount under this proposed policy.

Tax rate is 30%.

ADVISE, should the company change its credit terms. (Assume 360 days in a year.)
#### Answer
**(i) Calculation of Cash Discount**

Cash Discount = Total credit sales × % of customers who take up discount × Rate

Present Policy = $\dfrac{12{,}00{,}000 \times 50 \times 0.01}{100}$ = ₹ 6,000

Proposed Policy = 15,00,000 × 0.80 × 0.02 = ₹ 24,000

**(ii) Opportunity Cost of Investment in Receivables**

Present Policy: Opportunity Cost = Total Cost × $\dfrac{\text{Collection period}}{360} \times \dfrac{\text{Rate of Return}}{100}$

= 9,60,000 × $\dfrac{40}{360} \times \dfrac{15}{100}$ = ₹ 16,000

Proposed Policy: = Total Cost × $\dfrac{\text{Collection period}}{360} \times \dfrac{\text{Rate of Return}}{100}$

= 12,00,000 × $\dfrac{30}{360} \times \dfrac{15}{100}$ = ₹ 15,000

**Statement showing Evaluation of Credit Policies**

| Particulars | Present Policy | Proposed Policy |
|---|---:|---:|
| Credit Sales | 12,00,000 | 15,00,000 |
| Variable Cost @ 80%\* of sales | 9,60,000 | 12,00,000 |
| Bad Debts @ 2% | 24,000 | 30,000 |
| Cash Discount | 6,000 | 24,000 |
| **Profit before tax** | **2,10,000** | **2,46,000** |
| Tax @ 30% | 63,000 | 73,800 |
| **Profit after Tax** | **1,47,000** | **1,72,200** |
| Opportunity Cost of Investment in Receivables | 16,000 | 15,000 |
| **Net Profit** | **1,31,000** | **1,57,200** |

\*Only relevant or variable costs are considered for calculating the opportunity costs on the funds blocked in receivables. Since 20% is profit-volume ratio, hence the relevant costs are taken to be 80% of the respective sales.

**Advise:** Proposed policy should be adopted since the net benefit is increased by (₹ 1,57,200 - ₹ 1,31,000) = ₹ 26,200.

**Alternative presentation using incremental approach**

| | ₹ |
|---|---:|
| Incremental sales (15,00,000 – 12,00,000) | 3,00,000 |
| Less: Incremental variable cost (12,00,000 – 9,60,000) | 2,40,000 |
| Less: Incremental Bad debts (30,000 – 24,000) | 6,000 |
| Less: Incremental Cash discount (24,000 – 6,000) | 18,000 |
| **Increase in Profit Before Tax** | **36,000** |
| Less: Tax @ 30% | 10,800 |
| **Increase in Profit After Tax** | **25,200** |
| Add: **Savings in opportunity cost** (16,000 - 15,000) | **1,000** |
| **Increase in Net Profit** | **26,200** |

**Advise:** Proposed policy should be adopted since the net benefit is increased by (₹ 1,57,200 - ₹ 1,31,000)

= ₹ 26,200.
#### Approach
Compare the two policies item by item: cash discount, bad debts and the opportunity cost of the funds locked in receivables, costed at variable cost (the profit-volume ratio gives it).

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
oos: yes
difficulty: medium
q: 2
a: 5-7
note: Lead ruling 2026-10-20: risk analysis in capital budgeting (scenario / best-worst-case NPVs, expected NPV, sensitivity, certainty equivalent, risk-adjusted discount rate) is not in the January 2027 Study Material, so this item is out of syllabus (oos) and keeps the nearest tag fm.capbud.npv; items with only one such part keep their tag.
---
#### Question
A company wants to invest in a project. This requires an initial investment of ₹ 4,50,000. Salvage value after estimated useful life of 5 years is ₹ 50,000. Other details of project are as follows:

| | Worst case | Most likely | Best case |
|---|---:|---:|---:|
| Contribution (₹) | 3,30,000 | 5,40,000 | 6,31,250 |
| Fixed cost (excluding depreciation) (₹) | 75,000 | 1,50,000 | 2,00,000 |

Tax rate is 40%. Expected cost of capital of project is 12%. Ignore tax on capital gain.

(i) Calculate NPV in each scenario.

(ii) The company is certain about most likely result in first two years, but uncertain about remaining period. In such a situation, calculate NPV expecting worst case scenario during next two years and best case scenario in the remaining period.

| Years | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|
| PVIF$_{0.12{,}t}$ | 0.893 | 0.797 | 0.712 | 0.636 | 0.567 |
| PVIFA$_{0.12{,}t}$ | 0.893 | 1.690 | 2.402 | 3.038 | 3.605 |
#### Answer
**(i)** Initial Investment = ₹ 4,50,000

Salvage Value = ₹ 50,000

Useful Life = 5 years

**Calculation of cash flow in each scenario**

| Particulars | Scenario | | |
|---|---:|---:|---:|
| | **Worst case** | **Most Likely** | **Best case** |
| Contribution | 3,30,000 | 5,40,000 | 6,31,250 |
| Less: Fixed Cost | 75,000 | 1,50,000 | 2,00,000 |
| Less: Depreciation | 80,000 | 80,000 | 80,000 |
| Profit before tax | 1,75,000 | 3,10,000 | 3,51,250 |
| Less: Taxes | 70,000 | 1,24,000 | 1,40,500 |
| Profit after tax | 1,05,000 | 1,86,000 | 2,10,750 |
| Add: Depreciation | 80,000 | 80,000 | 80,000 |
| **Cash Flow After Tax** | **1,85,000** | **2,66,000** | **2,90,750** |

The possible outcomes will be as follows:

| Year | PVF @ 12% | Worst Case | | Most likely | | Best case | |
|---|---:|---:|---:|---:|---:|---:|---:|
| | | **Cash Flow** | **PV** | **Cash Flow** | **PV** | **Cash Flow** | **PV** |
| 0 | 1 | (4,50,000) | (4,50,000) | (4,50,000) | (4,50,000) | (4,50,000) | (4,50,000) |
| 1-5 | 3.605 | 1,85,000 | 6,66,925 | 2,66,000 | 9,58,930 | 2,90,750 | 10,48,153.75 |
| 5 | 0.567 | 50,000 | 28,350 | 50,000 | 28,350 | 50,000 | 28,350 |
| **NPV** | | | **2,45,275** | | **5,37,280** | | **6,26,503.75** |

**Alternative presentation**

**(i) Computation of NPV of different scenarios**

| Years | DF | Worst case | | Most-likely case | | Best case | |
|---|---:|---:|---:|---:|---:|---:|---:|
| | | **CF** | **DCF** | **CF** | **DCF** | **CF** | **DCF** |
| 0 | 1.000 | (450000) | (450000) | (450000) | (450000) | (450000) | (450000) |
| 1 | 0.893 | 185000 | 165205 | 266000 | 237538 | 290750 | 259640 |
| 2 | 0.797 | 185000 | 147445 | 266000 | 212002 | 290750 | 231728 |
| 3 | 0.712 | 185000 | 131720 | 266000 | 189392 | 290750 | 207014 |
| 4 | 0.636 | 185000 | 117660 | 266000 | 169176 | 290750 | 184917 |
| 5 | 0.567 | 185000 | 104895 | 266000 | 150822 | 290750 | 164855 |
| 5 | 0.567 | 50000 | 28350 | 50000 | 28350 | 50000 | 28350 |
| | NPV | | **2,45,275** | | **5,37,280** | | **6,26,504** |

**(ii)** If the company is certain about the most likely result in first two years but uncertain about the remaining period, then, NPV expecting worst case scenario during next two years and best-case scenario in remaining period will be as follows:

= - 4,50,000+ $\dfrac{\text{₹}2{,}66{,}000}{(1+0.12)} + \dfrac{\text{₹}2{,}66{,}000}{(1+0.12)^2} + \dfrac{\text{₹}1{,}85{,}000}{(1+0.12)^3} + \dfrac{\text{₹}1{,}85{,}000}{(1+0.12)^4} + \dfrac{\text{₹}2{,}90{,}750}{(1+0.12)^5} + \dfrac{\text{₹}50{,}000}{(1+0.12)^5}$

= -4,50,000 + (2,66,000 × 0.893) + (2,66,000 × 0.797) + (1,85,000 × 0.712) + (1,85,000 × 0.636) + (2,90,750 × 0.567) + (50,000 × 0.567)

= -4,50,000 + 2,37,538 + 2,12,002 + 1,31,720 + 1,17,660 + 1,64,855 + 28,350

= ₹ 4,42,125

**Alternative presentation**

**(ii) Computation of NPV on the basis of fixed scenarios**

| Years | Scenarios | DF | CF | DCF (DF\*CF) |
|---|---|---:|---:|---:|
| 0 | Initial Outflow | 1.000 | (450000) | **(450000)** |
| 1 | Most-likely case | 0.893 | 266000 | **237538** |
| 2 | Most-likely case | 0.797 | 266000 | **212002** |
| 3 | Worst case | 0.712 | 185000 | **131720** |
| 4 | Worst case | 0.636 | 185000 | **117660** |
| 5 | Best case | 0.567 | 290750 | **164855** |
| 5 | Salvage | 0.567 | 50000 | **28350** |
| | | | | **4,42,125** |

**(All figures are in ₹)**
#### Approach
Build the annual cash flow after tax for each scenario (contribution less fixed cost and depreciation, tax, then add back depreciation), discount it with the annuity factor and add the discounted salvage; for (ii) discount each year's flow separately.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.lev.leverage
difficulty: medium
q: 2
a: 7-8
---
#### Question
Following information is given for X Ltd.:

| | |
|---|---:|
| Total contribution (₹) | 4,25,000 |
| Operating leverage | 3.125 |
| 15% Preference shares (₹ 100 each) | 1,000 |
| Number of equity shares | 2,500 |
| Tax rate | 50% |

Calculate EPS of X Ltd., if 40% decrease in sales will result EPS to zero.
#### Answer
**(i)** Operating Leverage (OL) = $\dfrac{\text{Contribution}}{\text{EBIT}}$ Or, 3.125 = $\dfrac{\text{₹ 4{,}25{,}000}}{\text{EBIT}}$ Or EBIT

= ₹ 1,36,000

**(ii)** Degree of Combined Leverage (CL) = $\dfrac{\text{\% Change in EPS}}{\text{\% Change in Sales}} = \dfrac{100}{40}$ = 2.5

**(iii)** Combined Leverage = OL × FL = 3.125 × FL

So, Financial Leverage = 2.5 /3.125 = 0.8

**(iv)** Financial Leverage = $\dfrac{\text{EBIT}}{\text{EBT}} = \dfrac{1{,}36{,}000}{\text{EBT}}$ = 0.8

So, EBT = $\dfrac{1{,}36{,}000}{0.80}$ = ₹ 1,70,000

**Calculation of EPS of X Ltd**

| Particulars | (₹) |
|---|---:|
| EBT | 1,70,000 |
| Less: Tax (50%) | 85,000 |
| EAT | 85,000 |
| Preference Dividend | 15,000 |
| Net Earnings for Equity Shareholders | 70,000 |
| Number of equity shares | 2,500 |
| **EPS** | **28** |
#### Approach
A fall in sales that wipes out EPS entirely gives the combined leverage directly; with the operating leverage you get EBIT and the financial leverage, and from them EBT.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.ratio.prepare
difficulty: medium
q: 8
a: 9-11
---
#### Question
Following information and ratios are given in respect of AQUA Ltd. for the year ended 31st March, 2023:

| | |
|---|---:|
| Current ratio | 4.0 |
| Acid test ratio | 2.5 |
| Inventory turnover ratio (based on sales) | 6 |
| Average collection period (days) | 70 |
| Earnings per share | ₹ 3.5 |
| Current liabilities | ₹ 3,10,000 |
| Total assets turnover ratio (based on sales) | 0.96 |
| Cash ratio | 0.43 |
| Proprietary ratio | 0.48 |
| Total equity dividend | ₹ 1,75,000 |
| Equity dividend coverage ratio | 1.60 |

Assume 360 days in a year.

You are required to complete Balance Sheet as on 31st March, 2023.

**Balance Sheet as on 31st March, 2023.**

| Liabilities | ₹ | Assets | ₹ |
|---|---:|---|---:|
| Equity share capital (₹10 per share) | XXX | Fixed assets | XXX |
| Reserves & surplus | XXX | Inventory | XXX |
| Long-term debt | XXX | Debtors | XXX |
| Current liabilities | 3,10,000 | Loans & advances | XXX |
| | | Cash & bank | XXX |
| Total | XXX | Total | XXX |
#### Answer
**(i)** Current Ratio = 4

$\dfrac{\text{Current Assets}}{\text{Current Liabilities}}$ = 4

∴ $\dfrac{\text{Current Assets}}{3{,}10{,}000}$ = 4

∴ Current Assets = ₹ 12,40,000

**(ii)** Acid Test Ratio = 2.5

$\dfrac{\text{Current Assets - Inventory}}{\text{Current Liabilities}}$ = 2.5

∴ $\dfrac{12{,}40{,}000 - \text{Inventory}}{3{,}10{,}000}$ = 2.5

∴ 12,40,000 – Inventory = ₹ 7,75,000

Inventory = ₹ 4,65,000

**(iii)** Inventory Turnover Ratio (on Sales) = 6

$\dfrac{\text{Sales}}{\text{Inventory}}$ = 6

$\dfrac{\text{Sales}}{4{,}65{,}000}$ = 6

∴ Sales = ₹ 27,90,000

**(iv)** Debtors Collection Period = 70 days

∴ (Debtors / sales) x 360 = 70

∴ (Debtors / 27,90,000) x 360 = 70

Debtors = ₹ 5,42,500

**(v)** Total Assets Turnover Ratio (on Sales) = 0.96

∴ $\dfrac{\text{Sales}}{\text{Total Assets}}$ = 0.96

∴ $\dfrac{27{,}90{,}000}{\text{Total Assets}}$ = 0.96

Total Assets = ₹ 29,06,250

**(vi)** Fixed Assets (FA) = Total Assets – Current Assets

= 29,06,250 – 12,40,000

Fixed Assets = ₹ 16,66,250

**(vii)** Cash Ratio = $\dfrac{\text{Cash}}{\text{Current Liabilities}}$ = 0.43

∴ $\dfrac{\text{Cash}}{3{,}10{,}000}$ = 0.43

∴ Cash = ₹ 1,33,300

**(viii)** Proprietary Ratio = $\dfrac{\text{Proprietary Fund}}{\text{Total Assets}}$ = 0.48

∴ $\dfrac{\text{Proprietary Fund}}{29{,}06{,}250}$ = 0.48

∴ Proprietary Fund = ₹ 13,95,000

**(ix)** Equity Dividend Coverage Ratio = 1.6

or $\dfrac{\text{EPS}}{\text{DPS}} = \dfrac{3.5}{\text{DPS}}$

∴ DPS = ₹ 2.1875

DPS = $\dfrac{\text{Total Dividend}}{\text{Number of Equity Shares}}$

∴ 2.1875 = $\dfrac{1{,}75{,}000}{\text{Number of Equity Shares}}$

∴ Number of Equity Shares = 80,000

∴ Equity Share Capital = 80,000 x 10 = ₹ 8,00,000

∴ Reserves &Surplus = 13,95,000 - 8,00,000 = ₹ 5,95,000

**(x)** Loans and Advances = Current Assets - (Inventory + Receivables + Cash & Bank)

= ₹ 12,40,000 - (₹ 4,65,000 + 5,42,500 + 1,33,300) = ₹ 99,200

**Balance Sheet as on 31st March 2023**

| Liabilities | ₹ | Assets | ₹ |
|---|---:|---|---:|
| Equity Share Capital (₹ 10 per share) | 8,00,000 | Fixed Assets | 16,66,250 |
| Reserves & Surplus | 5,95,000 | Inventory | 4,65,000 |
| Long-term debt \*(B/F) | 12,01,250 | Receivables | 5,42,500 |
| Current Liabilities | 3,10,000 | Loans & Advances | 99,200 |
| | | Cash & Bank | 1,33,300 |
| **Total** | **29,06,250** | **Total** | **29,06,250** |
#### Approach
Start from the given current liabilities: the current, acid test and cash ratios give current assets, inventory and cash; turnover ratios give sales, debtors and total assets; the dividend data give the number of shares. Long-term debt is the balancing figure.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.cs.ebiteps, fm.cs.planning
difficulty: medium
q: 11
a: 12-13
---
#### Question
The following information pertains to CIZA Ltd.:

| | ₹ |
|---|---:|
| Capital Structure: | |
| Equity share capital (₹ 10 each) | 8,00,000 |
| Retained earnings | 20,00,000 |
| 9% Preference share capital (₹ 100 each) | 12,00,000 |
| 12% Long-term loan | 10,00,000 |
| Interest coverage ratio | 8 |
| Income tax rate | 30% |
| Price – earnings ratio | 25 |

The company is proposed to take up an expansion plan, which requires an additional investment of ₹ 34,50,000. Due to this proposed expansion, earnings before interest and taxes of the company will increase by ₹ 6,15,000 per annum. The additional fund can be raised in following manner:

- By issue of equity shares at present market price, or
- By borrowing 16% Long-term loans from bank.

You are informed that Debt-equity ratio (Debt/ Shareholders' fund) in the range of 50% to 80% will bring down the price-earnings ratio to 22 whereas; Debt-equity ratio over 80% will bring down the price-earnings ratio to 18.

Required:

Advise which option is most suitable to raise additional capital so that the Market Price per Share (MPS) is maximized.
#### Answer
**Working notes:**

**(i)** Interest Coverage ratio = 8

$\dfrac{\text{EBIT}}{\text{Interest}}$ = 8

$\dfrac{\text{EBIT}}{1{,}20{,}000}$ = 8

So, EBIT = ₹ 9,60,000

**(ii)** Proposed Earnings Before Interest & Tax = 9,60,000 + 6,15,000 = ₹ 15,75,000

**Option 1: Equity option**

Debt = ₹ 10,00,000

Shareholders Fund = 8,00,000+20,00,000+12,00,000+34,50,000 = ₹ 74,50,000

Debt Equity ratio(Debt/Shareholders fund) = $\dfrac{10{,}00{,}000}{74{,}50{,}000}$ = 13.42%

P/E ratio in this case will be 25 times

**Option 2: Debt option**

Debt = 10,00,000+34,50,000 = ₹ 44,50,000

Shareholders Fund = 8,00,000+20,00,000+12,00,000 = ₹ 40,00,000

**Debt Equity ratio(Debt/Shareholders fund)** = $\dfrac{44{,}50{,}000}{40{,}00{,}000}$ = 111.25%

Debt equity ratio has crossed the limit of 80% hence PE ratio in this case will remain at 18 times.

**Number of Equity Shares to be issued** = ₹ 34,50,000/ ₹ 150 = 23,000

**(iii)** Calculation of Earnings per Share and Market Price per share

| Particulars | ₹ |
|---|---:|
| Current Earnings Before Interest & Tax | 9,60,000 |
| Less: Interest | 1,20,000 |
| Earnings Before Tax | 8,40,000 |
| Less: Taxes | 2,52,000 |
| Earnings After Tax | 5,88,000 |
| Less: Preference Dividend (@9%) | 1,08,000 |
| Net earnings for Equity shareholders | 4,80,000 |
| Number of equity shares | 80,000 |
| **Earnings Per Share** | **6** |
| Price-earnings ratio | 25 |
| **Market Price per share** | **150** |

**Calculation of EPS and MPS under two financial options**

| Particulars | Financial Options | |
|---|---:|---:|
| | **Option I** | **Option II** |
| | **Equity Shares Issued (₹)** | **16% Long Term Debt Raised (₹)** |
| Earnings before interest and Tax (EBIT) | 15,75,000 | 15,75,000 |
| *Less:* Interest on old debentures @ 12% | 1,20,000 | 1,20,000 |
| *Less:* Interest on additional loan (new) @ 16% on ₹ 34,50,000 | NIL | 5,52,000 |
| Earnings before tax | 14,55,000 | 9,03,000 |
| *Less:* Taxes @ 30% | 4,36,500 | 2,70,900 |
| **(EAT/Profit after tax)** | **10,18,500** | **6,32,100** |
| *Less:* Preference Dividend (@9%) | 1,08,000 | 1,08,000 |
| **Net Earnings available to Equity shareholders** | **9,10,500** | **5,24,100** |
| Number of Equity Shares | 1,03,000 | 80,000 |
| **Earnings per Share (EPS)** | **8.84** | **6.55** |
| Price/ Earnings ratio | 25 | 18 |
| **Market price per share (MPS)** | **221** | **117.9** |

**Advise:** Equity option has higher Market Price per Share therefore company should raise additional fund through equity option.
#### Approach
Find the present EBIT from the interest coverage ratio and the present market price from EPS and the P/E ratio (it fixes the issue price of new shares); then work out each option's debt-equity ratio to pick its P/E ratio before comparing the market prices.

---
item: q4
qno: 4
marks: 10
type: descriptive
tags: fm.coc.wacc, fm.coc.equity, fm.coc.debt
difficulty: medium
q: 13-14
a: 14-16
---
#### Question
Capital structure of D Ltd. as on 31st March, 2023 is given below:

| Particulars | ₹ |
|---|---:|
| Equity share capital (₹ 10 each) | 30,00,000 |
| 8% Preference share capital (₹ 100 each) | 10,00,000 |
| 12% Debentures (₹ 100 each) | 10,00,000 |

- Current market price of equity share is ₹ 80 per share. The company has paid dividend of ₹ 14.07 per share. Seven years ago, it paid dividend of ₹ 10 per share. Expected dividend is ₹ 16 per share.
- 8% Preference shares are redeemable at 6% premium after five years. Current market price per preference share is ₹ 104.
- 12% debentures are redeemable at 20% premium after 10 years. Flotation cost is ₹ 5 per debenture.
- The company is in 40% tax bracket.
- In order to finance an expansion plan, the company intends to borrow 15% Long-term loan of ₹ 30,00,000 from bank. This financial decision is expected to increase dividend on equity share from ₹ 16 per share to ₹ 18 per share. However, the market price of equity share is expected to decline from ₹ 80 to ₹ 72 per share, because investors' required rate of return is based on current market conditions.

Required:

(i) Determine the existing Weighted Average Cost of Capital (WACC) taking book value weights.

(ii) Compute Weighted Average Cost of Capital (WACC) after the expansion plan taking book value weights.

| Interest Rate | 1% | 2% | 3% | 4% | 5% | 6% | 7% |
|---|---:|---:|---:|---:|---:|---:|---:|
| FVIF$_{i{,}5}$ | 1.051 | 1.104 | 1.159 | 1.217 | 1.276 | 1.338 | 1.403 |
| FVIF$_{i{,}6}$ | 1.062 | 1.126 | 1.194 | 1.265 | 1.340 | 1.419 | 1.501 |
| FVIF$_{i{,}7}$ | 1.072 | 1.149 | 1.230 | 1.316 | 1.407 | 1.504 | 1.606 |
#### Answer
**(i) (a) Growth rate in Dividends**

14.07 = 10 x FVIF (i,7 years)

FVIF (i,7 years) = 1.407

FVIF (5%, 7 years) = 1.407

i = 5%

Growth rate in dividend= 5%

**(b) Cost of Equity**

Ke = $\dfrac{D_1}{P_0}$+g

Ke = $\dfrac{16}{80}$+0.05

Ke = 25%

**(c) Cost of Preference Shares**

Kp = $\dfrac{PD+\dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

Kp = $\dfrac{8+\dfrac{(106-104)}{5}}{\dfrac{(106+104)}{2}}$

Kp = 8.4/105

Kp = 8%

**(d) Cost of Debt**

Kd = $\dfrac{I(1-t)+\dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

Kd = $\dfrac{12(1-0.4)+\dfrac{(120-95)}{10}}{\dfrac{(120+95)}{2}}$

Kd = (7.2+2.5)/107.5 = 9.02%

Kd = 9.02%

**Calculation of existing Weighted Average Cost of Capital (WACC)**

| Capital | Amount (₹) | Weights | Cost | WACC |
|---|---:|---:|---:|---:|
| Equity Share Capital | 30,00,000 | 0.6 | 25% | 15.00% |
| Preference Share Capital | 10,00,000 | 0.2 | 8% | 1.60% |
| Debenture | 10,00,000 | 0.2 | 9.02% | 1.80% |
| | 50,00,000 | 1 | | **18.40%** |

**Alternative presentation**

**(i) Computation of existing WACC on book value weights**

| Source (1) | Book value (₹) (2) | Weight (3) | Cost of capital (%) (4) | Product (2) x (4) |
|---|---:|---:|---:|---:|
| Equity share capital | 30,00,000 | 0.60 | 25 | 7,50,000 |
| Preference share capital | 10,00,000 | 0.20 | 8 | 80,000 |
| Debentures | 10,00,000 | 0.20 | 9.02 | 90,200 |
| **Total** | **50,00,000** | **1.00** | | **9,20,200** |

**WACC =** (Product / Total book value) x 100 = (9,20,200 /50,00,000) x 100 = **18.4%**

**(ii) Cost of Long Term Debt =** 15% (1-0.4) = 9%

**Revised Ke** = $\dfrac{18}{72}$ + 0.05 = 30%

**Calculation of WACC after expansion taking book value weights**

| Capital | Amount | Weights | Cost | W.C |
|---|---:|---:|---:|---:|
| Equity Share Capital | 30,00,000 | 0.3750 | 30% | 11.25% |
| Preference Share Capital | 10,00,000 | 0.1250 | 8% | 1.00% |
| Debenture | 10,00,000 | 0.1250 | 9.02% | 1.13% |
| Long Term Debt | 30,00,000 | 0.3750 | 9.00% | 3.38% |
| | 80,00,000 | 1.0000 | | **16.76%** |

**Alternative presentation**

**(i) Computation of WACC on book value weights after expansion**

| Source (1) | Book value (₹) (2) | Weight (3) | Cost of capital (%) (4) | Product (2) x (4) |
|---|---:|---:|---:|---:|
| Equity share capital | 30,00,000 | 0.375 | 30 | 9,00,000 |
| Preference share capital | 10,00,000 | 0.125 | 8 | 80,000 |
| Debentures | 10,00,000 | 0.125 | 9.02 | 90,200 |
| Long term loan | 30,00,000 | 0.375 | 9 | 2,70,000 |
| **Total** | **80,00,000** | **1.00** | | **13,40,200** |

**WACC =** (Product / Total book value) x 100 = (13,40,200 / 80,00,000) x 100 **= 16.76%**
#### Approach
Find the dividend growth rate from the FVIF table (seven years of growth), then each component's cost (Gordon for equity, the redemption-yield shortcut for preference shares and debentures); after the expansion only the new loan and the revised cost of equity change, and the weights stay at book value.

---
item: q5
qno: 5
marks: 10
type: descriptive
tags: fm.capbud.cashflows, fm.capbud.npv
difficulty: hard
q: 17
a: 17-20
---
#### Question
Four years ago, Z Ltd. had purchased a machine of ₹ 4,80,000 having estimated useful life of 8 years with zero salvage value. Depreciation is charged using SLM method over the useful life. The company want to replace this machine with a new machine. Details of new machine are as below:

- Cost of new machine is ₹ 12,00,000, Vendor of this machine is agreed to take old machine at a value of ₹ 2,40,000. Cost of dismantling and removal of old machine will be ₹ 40,000. 80% of net purchase price will be paid on spot and remaining will be paid at the end of one year.
- Depreciation will be charged @ 20% p.a. under WDV method.
- Estimated useful life of new machine is four years and it has salvage value of ₹ 1,00,000 at the end of year four.
- Incremental annual sales revenue is ₹ 12,25,000.
- Contribution margin is 50%.
- Incremental indirect cost (excluding depreciation) is ₹ 1,18,750 per year.
- Additional working capital of ₹ 2,50,000 is required at the beginning of year and ₹ 3,00,000 at the beginning of year three. Working capital at the end of year four will be nil.
- Tax rate is 30%.
- Ignore tax on capital gain.

Z Ltd. will not make any additional investment, if it yields less than 12%

Advice, whether existing machine should be replaced or not.

| Year | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|
| PVIF$_{0.12{,}\ t}$ | 0.893 | 0.797 | 0.712 | 0.636 | 0.567 |
#### Answer
**Working Notes:**

**(i) Calculation of Net Initial Cash Outflow**

| Particulars | ₹ |
|---|---:|
| Cost of New Machine | 12,00,000 |
| Less: Sale proceeds of existing machine | 2,00,000 |
| Net Purchase Price | 10,00,000 |
| Paid in year 0 | 8,00,000 |
| Paid in year 1 | 2,00,000 |

**(ii) Calculation of Additional Depreciation**

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| | **₹** | **₹** | **₹** | **₹** |
| Opening WDV of machine | 10,00,000 | 8,00,000 | 6,40,000 | 5,12,000 |
| Depreciation on new machine @ 20% | 2,00,000 | 1,60,000 | 1,28,000 | 1,02,400 |
| Closing WDV | 8,00,000 | 6,40,000 | 5,12,000 | 4,09,600 |
| Depreciation on old machine (4,80,000/8) | 60,000 | 60,000 | 60,000 | 60,000 |
| **Incremental depreciation** | **1,40,000** | **1,00,000** | **68,000** | **42,400** |

**(iii) Calculation of Annual Profit before Depreciation and Tax (PBDT)**

| Particulars | Incremental Values (₹) |
|---|---:|
| Sales | 12,25,000 |
| Contribution | 6,12,500 |
| Less: Indirect Cost | 1,18,750 |
| Profit before Depreciation and Tax (PBDT) | 4,93,750 |

**Calculation of Incremental NPV**

| Year | PVF @ 12% | PBTD (₹) | Incremental Depreciation (₹) | PBT (₹) | Tax @ 30% (₹) | Cash Inflows (₹) | PV of Cash Inflows (₹) |
|---|---:|---:|---:|---:|---:|---:|---:|
| | **(1)** | **(2)** | **(3)** | **(4)** | **(5) = (4) x 0.30** | **(6) = (4) – (5) + (3)** | **(7) = (6) x (1)** |
| 1 | 0.893 | 4,93,750 | 1,40,000 | 3,53,750 | 106,125 | 3,87,625 | 3,46,149.125 |
| 2 | 0.797 | 4,93,750 | 1,00,000 | 3,93,750 | 1,18,125 | 3,75,625 | 2,99,373.125 |
| 3 | 0.712 | 4,93,750 | 68,000 | 4,25,750 | 1,27,725 | 3,66,025 | 2,60,609.800 |
| 4 | 0.636 | 4,93,750 | 42,400 | 4,51,350 | 1,35,405 | 3,58,345 | 2,27,907.420 |
| | | | \* | | | \* | **11,34,039.470** |
| Add: PV of Salvage (₹ 1,00,000 x 0.636) | | | | | | | 63,600 |
| Less: **Initial Cash Outflow** - Year 0 | | | | | | | **8,00,000** |
| Year 1 (₹ 2,00,000 × 0.893) | | | | | | | **1,78,600** |
| Less: Working Capital - Year 0 | | | | | | | 2,50,000 |
| Year 2 (₹ 3,00,000 × 0.797) | | | | | | | 2,39,100 |
| Add: Working Capital released - Year 4 (₹ 5,50,000 × 0.636) | | | | | | | 3,49,800 |
| **Incremental Net Present Value** | | | | | | | **79,739.470** |

Since the incremental NPV is positive, existing machine should be replaced.

**Alternative Presentation**

**Computation of Outflow for new Machine:**

| | ₹ |
|---|---:|
| Cost of new machine | 12,00,000 |
| Replaced cost of old machine | 2,40,000 |
| Cost of removal | 40,000 |
| **Net Purchase price** | **10,00,000** |
| Outflow at year 0 | 8,00,000 |
| Outflow at year 1 | 2,00,000 |

**Computation of additional deprecation**

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| | **₹** | **₹** | **₹** | **₹** |
| Opening WDV of machine | 10,00,000 | 8,00,000 | 6,40,000 | 5,12,000 |
| Depreciation on new machine @ 20% | 2,00,000 | 1,60,000 | 1,28,000 | 1,02,400 |
| Closing WDV | 8,00,000 | 6,40,000 | 5,12,000 | 4,09,600 |
| Depreciation on old machine (4,80,000/8) | 60,000 | 60,000 | 60,000 | 60,000 |
| **Incremental depreciation** | **1,40,000** | **1,00,000** | **68,000** | **42,400** |

**Computation of NPV**

| | Year | 0 | 1 | 2 | 3 | 4 |
|---|---|---:|---:|---:|---:|---:|
| | | **₹** | **₹** | **₹** | **₹** | **₹** |
| 1. | Increase in sales revenue | | 12,25,000 | 12,25,000 | 12,25,000 | 12,25,000 |
| 2. | Contribution | | 6,12,500 | 6,12,500 | 6,12,500 | 6,12,500 |
| 3. | Increase in fixed cost | | 1,18,750 | 1,18,750 | 1,18,750 | 1,18,750 |
| 4. | Incremental Depreciation | | 1,40,000 | 1,00,000 | 68,000 | 42,400 |
| 5. | Net profit before tax [1-(2+3+4)] | | 3,53,750 | 3,93,750 | 4,25,750 | 4,51,350 |
| 6. | Net Profit after tax (5 x 70%) | | 2,47,625 | 2,75,625 | 2,98,025 | 3,15,945 |
| 7. | Add: Incremental depreciation | | 1,40,000 | 1,00,000 | 68,000 | 42,400 |
| 8. | Net Annual cash inflows (6 + 7) | | 3,87,625 | 3,75,625 | 3,66,025 | 3,58,345 |
| 9. | Release of salvage value | | | | | 1,00,000 |
| 10. | (investment)/disinvestment in working capital | (2,50,000) | | (3,00,000) | | 5,50,000 |
| 11. | Initial cost | (8,00,000) | (2,00,000) | | | |
| 12. | Total net cash flows | (10,50,000) | 1,87,625.0 | 75,625 | 3,66,025 | 10,08,345 |
| 13. | Discounting Factor | 1 | 0.893 | 0.797 | 0.712 | 0.636 |
| 14. | Discounted cash flows (12 x 13) | (10,50,000) | 1,67,549.125 | 60,273.125 | 2,60,609.800 | 641307.420 |

**NPV** = (1,67,549 + 60,273 + 2,60,610 + 6,41,307) - 10,50,000 = **₹ 79,739**

Since the NPV is positive, existing machine should be replaced.
#### Approach
Work out the net purchase price after the old machine's exchange value and removal cost, and the incremental depreciation (new WDV less old SLM); then lay out each year's cash flows, including the deferred payment, the working capital invested and released, and the salvage, before discounting.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.div.basics
difficulty: easy
q: 20
a: 20-21
---
#### Question
List out the conditions, framed by SEBI, which a company needs to fulfil in order to issue of bonus shares.
#### Answer
To issue Bonus shares, a Company needs to fulfill all the conditions given by Securities Exchange Board of India (SEBI):

(i) As per SEBI, the bonus shares are issued not in lieu of cash dividends.

(ii) A bonus issue should be authorized by Article of Association (AOA) and not to be declared unless all partly paid-up shares have been converted into fully paid-up shares.

(iii) The Company should not have defaulted on re-payment of loan, interest, and any statutory dues.

(iv) Bonus shares are to be issued only from share premium and free reserves and not from capital reserve on account of fixed assets revaluation.
#### Approach
Think of what SEBI guards against: a bonus in place of cash dividend, partly paid shares, defaults, and the reserves a bonus may come from.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.wc.basics
difficulty: easy
q: 20
a: 21
---
#### Question
“Permanent working capital and fluctuating (temporary) working capital, both are necessary to facilitate production and sales through the operating cycle.” - Describe.
#### Answer
Both kinds of working capital i.e. permanent and fluctuating (temporary) are necessary to facilitate production and sales through the operating cycle:

Permanent working capital refers to the base working capital, which is the minimum level of investment in the current assets that is carried by the entity at all times to carry its day to day activities. It generally stays invested in the business unless the operations are scaled up or down permanently which would also result in increase or decrease in permanent working capital. It is generally financed by long term sources of finance.

Temporary working capital refers to that part of total working capital, which is required by an entity in addition to the permanent working capital. It is also called variable or fluctuating working capital which is used to finance the short-term working capital requirements which arises due to fluctuation in sales volume. For instance, an organization would maintain increased levels of inventory to meet increased seasonal demand.
#### Approach
Define each kind (the minimum level always held, and the extra that rises and falls with sales) and say how each is usually financed.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 20
a: 21
---
#### Question
Briefly explain concept of "Trading on Equity" in financial leverage analysis.
#### Answer
**Financial Leverage as ‘Trading on Equity’:**

Financial leverage indicates the use of funds with fixed cost like long term debts and preference share capital along with equity share capital which is known as trading on equity. The basic aim of financial leverage is to increase the earnings available to equity shareholders using fixed cost fund. A firm is known to have a positive/favourable leverage when its earnings are more than the cost of debt. If earnings are equal to or less than cost of debt, it will be a negative/unfavourable leverage. When the quantity of fixed cost fund is relatively high in comparison to equity capital it is said that the firm is ‘trading on equity”.
#### Approach
Explain why fixed-cost funds can raise the equity holders' earnings, and when the leverage turns favourable or unfavourable.

---
item: q6c-or
qno: 6
part: (c)
alt: q6c
marks: 2
type: descriptive
tags: fm.sources.other
difficulty: easy
q: 20
a: 21
---
#### Question
Discuss features of Secured Premium Notes.
#### Answer
**Features of Secured Premium Notes:**

- SPN instruments are issued with a detachable warrant.
- These instruments are redeemable after a notified period of say 4 to 7 years.
- No interest is paid during the lock in period.
- The conversion of detachable warrant into equity shares will have to be done within time period notified by the company.
#### Approach
Cover the instrument's structure: the detachable warrant, redemption after a lock-in, no interest meanwhile, and the conversion of the warrant.
