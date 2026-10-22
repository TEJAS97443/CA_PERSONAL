<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-pyq-nov2020
paper: p8
kind: pyq
attempt: nov2020
qfile: old/p8/pyq-nov2020-a.pdf
afile: old/p8/pyq-nov2020-a.pdf
paperfile: old/p8/pyq-nov2020-q.pdf
choice: q1; any 4 of q2-q6
minutes: 108
q: 1
status: checked
by: tx-39
date: 2026-10-20
accept: 4, 14, 1
note: Old-scheme Paper 8 (Financial Management and Economics for Finance), November 2020: only Section A Financial Management (pp.1-14 of the Suggested Answers) is transcribed; Section B Economics for Finance (from p.15) is not part of PassBook. Text from ICAI's Suggested Answers (qfile and afile), which reproduce every question before its answer; ICAI's own copy is no longer online and the file is a mirror copy (cacult.com; see bank/sources.json, which records why it is taken as unmodified). The question-paper scan (OCR text) is linked as paperfile and was not used for the text. Instructions: ICAI's Section A lines on p.1, which give the choice rule; Section A carries 60 marks (Q1 20 + four of Q2-Q6 at 10 each). minutes: 108 is ours (ICAI's 3 hours for the 100-mark paper, pro rata for Section A's 60 marks). Item model: Q1 (a)-(d) are separate 5-mark questions, each with one marks note for its requirements; Q2-Q5 each carry one (10 Marks) and one connected answer, so each is one item; Q6(c) has an OR alternative (q6c-or, alt: q6c). Old-scheme mapping (ours): Q4 (expected value, variance, standard deviation and coefficient of variation of project cash flows) and Q6(c)'s OR (the risk-adjusted discount rate) are flagged out of syllabus, see their notes. Repaired extraction damage only: the × and ÷ signs the text layer drops (read from the rendered pages), stacked fractions, superscripts and the subscripts of Ke, Kd, NPVL, NPVH written in KaTeX, table columns rebuilt from the rendered pages, the superscripts of "1st" / "5th". Bold headings, bold results and ICAI's bold words are kept as **bold**; underline rules under totals are not transcribed. Accepted numbers (each read on the page): the odd pages' running head "PAPER – 8: FINANCIAL MANAGEMENT AND ECONOMICS FOR FINANCE n", which check.py does not drop because Section B prints it as "PAPER 8: …" so neither form reaches its threshold (its 8, up to four in a page group, plus the title's 8 on p.1, and the page numbers 3, 5, 7, 9, 11 and 13); the question numbers 1 to 6, which the Suggested Answers print once (Question N before the reproduced question) while check.py expects them on the answer side as well; and 14 with 1 and 4: Q1(c)'s D/P ratio ₹ 1/₹ 4 × 100, a small stacked fraction the text layer reads as "₹₹ 14".
---
#### Instructions
**SECTION – A: FINANCIAL MANAGEMENT**

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
tags: fm.ratio.profit, fm.ratio.activity
difficulty: easy
q: 1
a: 3
note: ICAI's answer prints "Interest changes" (for interest charges); kept as printed.
---
#### Question
Following information relates to RM Co. Ltd.

| | (₹) |
|---|---:|
| Total Assets employed | 10,00,000 |
| Direct Cost | 5,50,000 |
| Other Operating Cost | 90,000 |

Goods are sold to the customers at 150% of direct costs.

50% of the assets being financed by borrowed capital at an interest cost of 8% per annum.

Tax rate is 30%.

You are required to calculate :

(i) Net profit margin

(ii) Return on Assets

(iii) Asset turnover

(iv) Return on owners' equity
#### Answer
**Computation of net profit:**

| Particulars | (₹) |
|---|---:|
| Sales (150% of ₹ 5,50,000) | 8,25,000 |
| Direct Costs | 5,50,000 |
| Gross profit | 2,75,000 |
| Other Operating Costs | 90,000 |
| Operating profit (EBIT) | 1,85,000 |
| Interest changes (8% of ₹ 5,00,000) | 40,000 |
| Profit before taxes (EBT) | 1,45,000 |
| Taxes (@ 30%) | 43,500 |
| **Net profit after taxes (EAT)** | **1,01,500** |

(i) Net profit margin (After tax) = $\dfrac{\text{Profit after taxes}}{\text{Sales}} = \dfrac{\text{₹ 1,01,500}}{\text{₹ 8,25,000}}$ = **0.12303 or 12.303%**

Net profit margin (Before tax)= $\dfrac{\text{Profit before taxes}}{\text{Sales}} = \dfrac{\text{₹ 1,45,000}}{\text{₹ 8,25,000}}$ = **0.17576 or 17.576%**

(ii) Return on assets = $\dfrac{\text{EBIT (1 -T)}}{\text{Total Assets}} = \dfrac{\text{₹ 1,85,000 (1 - 0.3)}}{\text{₹ 10,00,000}}$ = **0.1295 or 12.95%**

(iii) Asset turnover = $\dfrac{\text{Sales}}{\text{Assets}} = \dfrac{\text{₹ 8,25,000}}{\text{₹ 10,00,000}}$ = **0.825 times**

(iv) Return on owner's equity= $\dfrac{\text{Profit after taxes}}{\text{Owners equity}} = \dfrac{\text{₹ 1,01,500}}{\text{50\% × ₹ 10,00,000}}$ = **0.203 or 20.3%**
#### Approach
Build the income statement first: sales at 150% of direct cost, interest on the borrowed half of the assets, then tax. Each ratio is one line of it over sales, assets or owners' equity.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: easy
q: 1-2
a: 3-4
---
#### Question
CK Ltd. is planning to buy a new machine. Details of which are as follows:

| | |
|---|---|
| Cost of the Machine at the commencement | ₹ 2,50,000 |
| Economic Life of the Machine | 8 year |
| Residual Value | Nil |
| Annual Production Capacity of the Machine | 1,00,000 units |
| Estimated Selling Price per unit | ₹ 6 |
| Estimated Variable Cost per unit | ₹ 3 |
| Estimated Annual Fixed Cost (Excluding depreciation) | ₹ 1,00,000 |
| Advertisement Expenses in 1st year in addition of annual fixed cost | ₹ 20,000 |
| Maintenance Expenses in 5th year in addition of annual fixed cost | ₹ 30,000 |
| Cost of Capital | 12% |

Ignore Tax.

Analyse the above mentioned proposal using the Net Present Value Method and advice.

P.V. factor @ 12% are as under:

| Year | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| PV Factor | 0.893 | 0.797 | 0.712 | 0.636 | 0.567 | 0.507 | 0.452 | 0.404 |
#### Answer
**Calculation of Net Cash flows**

Contribution = (₹ 6 – ₹ 3) × 1,00,000 units = **₹ 3,00,000**

Fixed costs (excluding depreciation) = ₹ 1,00,000

| Year | Capital (₹) | Contribution (₹) | Fixed costs (₹) | Advertisement/ Maintenance expenses (₹) | Net cash flow (₹) |
|---|---:|---:|---:|---:|---:|
| 0 | (2,50,000) | | | | (2,50,000) |
| 1 | | 3,00,000 | (1,00,000) | (20,000) | 1,80,000 |
| 2 | | 3,00,000 | (1,00,000) | | 2,00,000 |
| 3 | | 3,00,000 | (1,00,000) | | 2,00,000 |
| 4 | | 3,00,000 | (1,00,000) | | 2,00,000 |
| 5 | | 3,00,000 | (1,00,000) | (30,000) | 1,70,000 |
| 6 | | 3,00,000 | (1,00,000) | | 2,00,000 |
| 7 | | 3,00,000 | (1,00,000) | | 2,00,000 |
| 8 | | 3,00,000 | (1,00,000) | | 2,00,000 |

**Calculation of Net Present Value**

| Year | Net cash flow (₹) | 12% discount factor | Present value (₹) |
|---|---:|---:|---:|
| 0 | (2,50,000) | 1.000 | (2,50,000) |
| 1 | 1,80,000 | 0.893 | 1,60,740 |
| 2 | 2,00,000 | 0.797 | 1,59,400 |
| 3 | 2,00,000 | 0.712 | 1,42,400 |
| 4 | 2,00,000 | 0.636 | 1,27,200 |
| 5 | 1,70,000 | 0.567 | 96,390 |
| 6 | 2,00,000 | 0.507 | 1,01,400 |
| 7 | 2,00,000 | 0.452 | 90,400 |
| 8 | 2,00,000 | 0.404 | 80,800 |
| | | | 7,08,730 |

**Advise:** CK Ltd. should buy the new machine, as the net present value of the proposal is positive i.e ₹ 7,08,730.
#### Approach
Each year's cash flow is contribution less fixed cost; take off the one-off advertisement and maintenance expenses in their own years, then discount and set against the cost.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: medium
q: 2
a: 4-5
---
#### Question
The following figures are extracted from the annual report of RJ Ltd.:

| | |
|---|---|
| Net Profit | ₹ 50 Lakhs |
| Outstanding 13% preference shares | ₹ 200 Lakhs |
| No. of Equity Shares | 6 Lakhs |
| Return on Investment | 25% |
| Cost of Capital ($K_e$) | 15% |

You are required to compute the approximate dividend pay-out ratio by keeping the share price at ₹ 40 by using Walter's Model.
#### Answer
| Particulars | ₹ in lakhs |
|---|---:|
| Net Profit | 50 |
| Less: Preference dividend (₹ 200,00,000 x 13%) | 26 |
| Earning for equity shareholders | 24 |
| Therefore, earning per share = ₹ 24 lakh /6 lakh shares = **₹ 4** | |

Let, the dividend per share be D to get share price of ₹ 40

P = $\dfrac{D+\dfrac{r}{Ke}(E-D)}{K_e}$

₹ 40 = $\dfrac{D+\dfrac{0.25}{0.15}(\text{₹ 4}-D)}{0.15}$

6 = $\dfrac{0.15D+1-0.25D}{0.15}$

0.1D = 1 – 0.9

D = ₹ 1

D/P ratio = $\dfrac{\text{DPS}}{\text{EPS}}$ × 100 = $\dfrac{\text{₹ 1}}{\text{₹ 4}} \times 100$ = **25%**

So, the required dividend pay-out ratio will be = 25%
#### Approach
Find the earnings per equity share after the preference dividend, then put the price of ₹ 40 into Walter's formula and solve it for D.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.coc.debt
difficulty: medium
q: 2
a: 5
---
#### Question
TT Ltd. issued 20,000, 10% convertible debenture of ₹ 100 each with a maturity period of 5 years. At maturity the debenture holders will have the option to convert debentures into equity shares of the company in ratio of 1:5 (5 shares for each debenture). The current market price of the equity share is ₹ 20 each and historically the growth rate of the share is 4% per annum. Assuming tax rate is 25%. Compute the cost of 10% convertible debenture using Approximation Method and Internal Rate of Return Method.

PV Factor are as under:

| Year | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|
| PV Factor @ 10% | 0.909 | 0.826 | 0.751 | 0.683 | 0.621 |
| PV Factor @ 15% | 0.870 | 0.756 | 0.658 | 0.572 | 0.497 |
#### Answer
**Determination of Redemption value:**

Higher of-

(i) The cash value of debentures = ₹100

(ii) Value of equity shares = 5 shares × ₹ 20 $(1+0.04)^5$

= 5 shares × ₹ 24.333

= **₹121.665 rounded to ₹121.67**

₹121.67 will be taken as redemption value as it is higher than the cash option and attractive to the investors.

**Calculation of Cost of 10% Convertible debenture**

**(i) Using Approximation Method:**

$K_d$ = $\dfrac{I(1-t)+\dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}} = \dfrac{10(1-0.25)+\dfrac{(121.67-100)}{5}}{\dfrac{(121.67+100)}{2}} = \dfrac{7.5+4.334}{110.835}$

= **10.676%**

**(ii) Using Internal Rate of Return Method**

| Year | Cash flows (₹) | Discount factor @ 10% | Present Value | Discount factor @ 15% | Present Value (₹) |
|---|---:|---:|---:|---:|---:|
| 0 | 100 | 1.000 | (100.00) | 1.000 | (100.00) |
| 1 to 5 | 7.5 | 3.790 | 28.425 | 3.353 | 25.148 |
| 5 | 121.67 | 0.621 | 75.557 | 0.497 | 60.470 |
| NPV | | | **+3.982** | | **-14.382** |

IRR = $L+\dfrac{NPV_L}{NPV_L-NPV_H}(H-L) = 10\%+\dfrac{3.982}{3.982-(-14.382)}(15\%-10\%)$

= **0.11084 or 11.084% (approx.)**
#### Approach
The redemption value is the higher of the cash value and the value of the five shares after five years' growth; then use it with the after-tax interest in the approximation formula, and in an NPV at two rates for the IRR.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.wc.estimate
difficulty: medium
q: 6
a: 6-7
---
#### Question
PK Ltd., a manufacturing company, provides the following information:

| | (₹) |
|---|---:|
| Sales | 1,08,00,000 |
| Raw Material Consumed | 27,00,000 |
| Labour Paid | 21,60,000 |
| Manufacturing Overhead (Including Depreciation for the year ₹ 3,60,000) | 32,40,000 |
| Administrative & Selling Overhead | 10,80,000 |

Additional Information:

(a) Receivables are allowed 3 months' credit.

(b) Raw Material Supplier extends 3 months' credit.

(c) Lag in payment of Labour is 1 month.

(d) Manufacturing Overhead are paid one month in arrear.

(e) Administrative & Selling Overhead is paid 1 month advance.

(f) Inventory holding period of Raw Material & Finished Goods are of 3 months.

(g) Work-in-Progress is Nil.

(h) PK Ltd. sells goods at Cost plus 33⅓%.

(i) Cash Balance ₹ 3,00,000.

(j) Safety Margin 10%.

You are required to compute the Working Capital Requirements of PK Ltd. on Cash Cost basis.
#### Answer
**Statement showing the requirements of Working Capital (Cash Cost basis)**

| Particulars | (₹) | (₹) |
|---|---:|---:|
| **A. Current Assets:** | | |
| Inventory: | | |
| Stock of Raw material (₹ 27,00,000 × 3/12) | 6,75,000 | |
| Stock of Finished goods (₹ 77,40,000 × 3/12) | 19,35,000 | |
| Receivables (₹ 88,20,000 × 3/12) | 22,05,000 | |
| Administrative and Selling Overhead (₹ 10,80,000 × 1/12) | 90,000 | |
| Cash in Hand | 3,00,000 | |
| **Gross Working Capital** | 52,05,000 | **52,05,000** |
| **B. Current Liabilities:** | | |
| Payables for Raw materials\* (₹ 27,00,000 × 3/12) | 6,75,000 | |
| Outstanding Expenses: | | |
| Wages Expenses (₹ 21,60,000 × 1/12) | 1,80,000 | |
| Manufacturing Overhead (₹ 28,80,000 × 1/12) | 2,40,000 | |
| Total Current Liabilities | 10,95,000 | 10,95,000 |
| **Net Working Capital (A-B)** | | **41,10,000** |
| *Add:* Safety margin @ 10% | | 4,11,000 |
| **Total Working Capital requirements** | | **45,21,000** |

**Working Notes:**

**(i)**

| (A) | Computation of Annual Cash Cost of Production | (₹) |
|---|---|---:|
| | Raw Material consumed | 27,00,000 |
| | Wages (Labour paid) | 21,60,000 |
| | Manufacturing overhead (₹ 32,40,000 - ₹ 3,60,000) | 28,80,000 |
| | Total cash cost of production | 77,40,000 |
| **(B)** | **Computation of Annual Cash Cost of Sales** | **(₹)** |
| | Cash cost of production as in (A) above | 77,40,000 |
| | Administrative & Selling overhead | 10,80,000 |
| | Total cash cost of sales | 88,20,000 |

\*Purchase of Raw material can also be calculated by adjusting Closing Stock and Opening Stock (assumed nil). In that case Purchase will be Raw material consumed +Closing Stock-Opening Stock i.e ₹27,00,000 + ₹6,75,000 - Nil = ₹33,75,000. Accordingly, Total Working Capital requirements (₹ 43,35,375) can be calculated.
#### Approach
On the cash cost basis depreciation and profit are left out: work out the cash cost of production and of sales first, then value each current asset and liability for its period.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.cs.ebiteps
difficulty: medium
q: 7-8
a: 8-9
note: ICAI's question prints "The-key information"; kept as printed.
---
#### Question
J Ltd. is considering three financing plans. The-key information is as follows:

(a) Total investment to be raised ₹ 4,00,000.

(b) Plans showing the Financing Proportion:

| Plans | Equity | Debt | Preference Shares |
|---|---|---|---|
| X | 100% | - | - |
| Y | 50% | 50% | - |
| Z | 50% | - | 50% |

(c) Cost of Debt 10%

Cost of preference shares 10%

(d) Tax Rate 50%

(e) Equity shares of the face value of ₹10 each will be issued at a premium of ₹ 10 per share.

(f) Expected EBIT is ₹ 1,00,000.

You are required to compute the following for each plan :

(i) Earnings per share (EPS)

(ii) Financial break even point

(iii) Indifference Point between the plans and indicate if any of the plans dominate.
#### Answer
**(i) Computation of Earnings per Share (EPS)**

| Plans | X (₹) | Y (₹) | Z (₹) |
|---|---:|---:|---:|
| Earnings before interest & tax (EBIT) | 1,00,000 | 1,00,000 | 1,00,000 |
| *Less:* Interest charges (10% of ₹ 2,00,000) | -- | (20,000) | -- |
| Earnings before tax (EBT) | 1,00,000 | 80,000 | 1,00,000 |
| *Less:* Tax @ 50% | (50,000) | (40,000) | (50,000) |
| Earnings after tax (EAT) | 50,000 | 40,000 | 50,000 |
| *Less:* Preference share dividend (10% of ₹2,00,000) | -- | -- | (20,000) |
| Earnings available for equity shareholders (A) | 50,000 | 40,000 | 30,000 |
| No. of equity shares (B)<br>Plan X = ₹ 4,00,000/ ₹ 20<br>Plan Y = ₹ 2,00,000 / ₹ 20<br>Plan Z = ₹ 2,00,000 / ₹ 20 | 20,000 | 10,000 | 10,000 |
| **E.P.S (A ÷ B)** | **2.5** | **4** | **3** |

**(ii) Computation of Financial Break-even Points**

Financial Break-even point = Interest + Preference dividend/(1 - tax rate)

Proposal ‘X’ = **0**

Proposal ‘Y’ = **₹ 20,000** (Interest charges)

Proposal ‘Z’ = Earnings required for payment of preference share dividend = ₹ 20,000 ÷ (1- 0.5 Tax Rate) = **₹ 40,000**

**(iii) Computation of Indifference Point between the plans**

Combination of Proposals

(a) Indifference point where EBIT of proposal “X” and proposal ‘Y’ is equal

$\dfrac{\text{(EBIT)(1-0.5)}}{\text{20,000 shares}} = \dfrac{\text{(EBIT- ₹ 20,000)(1-0.5)}}{\text{10,000 shares}}$

0.5 EBIT = EBIT – ₹ 20,000

EBIT = **₹ 40,000**

(b) Indifference point where EBIT of proposal ‘X’ and proposal ‘Z’ is equal:

$\dfrac{\text{(EBIT)(1-0.5)}}{\text{20,000 shares}} = \dfrac{\text{EBIT(1-0.5) - ₹ 20,000}}{\text{10,000 shares}}$

0.5 EBIT = EBIT- ₹ 40,000

0.5 EBIT = ₹ 40,000

EBIT = $\dfrac{\text{₹ 40,000}}{0.5}$ = **₹ 80,000**

(c) Indifference point where EBIT of proposal ‘Y’ and proposal ‘Z’ are equal

$\dfrac{\text{(EBIT- ₹ 20,000)(1-0.5)}}{\text{10,000 shares}} = \dfrac{\text{EBIT(1-0.5) - ₹ 20,000}}{\text{10,000 shares}}$

0.5 EBIT – ₹ 10,000 = 0.5 EBIT – ₹ 20,000

There is no indifference point between proposal ‘Y’ and proposal ‘Z’

**Analysis**: It can be seen that financial proposal ‘Y’ dominates proposal ‘Z’, since the financial break-even-point of the former is only ₹ 20,000 but in case of latter, it is ₹ 40,000. EPS of plan ‘Y’ is also higher.
#### Approach
The number of shares follows from the issue price (face value plus premium); for each pair of plans set their EPS expressions equal and solve for EBIT, remembering that preference dividend is paid out of profit after tax.

---
item: q4
qno: 4
marks: 10
type: descriptive
oos: yes
difficulty: medium
q: 9-10
a: 10-11
note: Old scheme, out of syllabus (ours): risk analysis in capital budgeting by statistical measures (expected net cash flow, variance, standard deviation and coefficient of variation of a project's cash flow distribution) was part of old Paper 8's Investment Decisions; neither the new-scheme Paper 6A syllabus nor the January 2027 Study Material teaches it. No tag. ICAI's table (d) uses 8,306.24 for Project X's standard deviation, which (c) gives as 8,306.624; both kept as printed.
---
#### Question
A Ltd. is considering two mutually exclusive projects X and Y.

You have been given below the Net Cash flow probability distribution of each project:

| Project-X | | Project-Y | |
|---|---:|---:|---:|
| **Net Cash Flow (₹)** | **Probability** | **Net Cash Flow (₹)** | **Probability** |
| 50,000 | 0.30 | 1,30,000 | 0.20 |
| 60,000 | 0.30 | 1,10,000 | 0.30 |
| 70,000 | 0.40 | 90,000 | 0.50 |

(i) Compute the following :

(a) Expected Net Cash Flow of each project.

(b) Variance of each project.

(c) Standard Deviation of each project.

(d) Coefficient of Variation of each project.

(ii) Identify which project do you recommend ? Give reason.
#### Answer
**(i) (a) Calculation of Expected Net Cash Flow (ENCF) of Project X and Project Y**

| Project X | | | Project Y | | |
|---|---:|---:|---:|---:|---:|
| **Net Cash Flow (₹)** | **Probability** | **Expected Net Cash Flow (₹)** | **Net Cash Flow (₹)** | **Probability** | **Expected Net Cash Flow (₹)** |
| 50,000 | 0.30 | 15,000 | 1,30,000 | 0.20 | 26,000 |
| 60,000 | 0.30 | 18,000 | 1,10,000 | 0.30 | 33,000 |
| 70,000 | 0.40 | 28,000 | 90,000 | 0.50 | 45,000 |
| **ENCF** | | **61,000** | | | **1,04,000** |

**(b) Variance of Projects**

**Project X**

Variance ($\sigma^2$) = $(50{,}000 - 61{,}000)^2 \times (0.3) + (60{,}000 - 61{,}000)^2 \times (0.3) + (70{,}000 - 61{,}000)^2 \times (0.4)$

= 3,63,00,000 + 3,00,000 + 3,24,00,000 = **6,90,00,000**

**Project Y**

Variance($\sigma^2$) = $(1{,}30{,}000 - 1{,}04{,}000)^2 \times (0.2) + (1{,}10{,}000 - 1{,}04{,}000)^2 \times (0.3) + (90{,}000 - 1{,}04{,}000)^2 \times (0.5)$

= 13,52,00,000 + 1,08,00,000 + 9,80,00,000 = **24,40,00,000**

**(c) Standard Deviation of Projects**

**Project X**

Standard Deviation (σ) = $\sqrt{\text{Variance}(\sigma^2)} = \sqrt{6{,}90{,}00{,}000}$ = **8,306.624**

**Project Y**

Standard Deviation (σ) = $\sqrt{\text{Variance}(\sigma^2)} = \sqrt{24{,}40{,}00{,}000}$ = **15,620.499**

**(d) Coefficient of Variation of Projects**

| Projects | Coefficient of variation ($\dfrac{\text{Standard Deviation}}{\text{Expected Net Cash Flow}}$) | Risk | Expected Net Cash Flow |
|---|---|---|---|
| X | $\dfrac{8{,}306.24}{61{,}000}$ = **0.136 or 13.60%** | Less | Less |
| Y | $\dfrac{15{,}620.499}{1{,}04{,}000}$ = **0.150 or 15.00%** | More | More |

**(ii)** In project X risk per rupee of cash flow is 0.136 (approx.) while in project Y it is 0.15 (approx.). Therefore, Project X is better than Project Y.

---
item: q5
qno: 5
marks: 10
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 11
a: 11-13
---
#### Question
The following data is available for Stone Ltd. :

| | (₹) |
|---|---:|
| Sales | 5,00,000 |
| (-) Variable cost @ 40% | 2,00,000 |
| Contribution | 3,00,000 |
| (-) Fixed cost | 2,00,000 |
| EBIT | 1,00,000 |
| (-) Interest | 25,000 |
| Profit before tax | 75,000 |

Using the concept of leverage, find out

(i) The percentage change in taxable income if EBIT increases by 10%.

(ii) The percentage change in EBIT if sales increases by 10%.

(iii) The percentage change in taxable income if sales increases by 10%.

Also verify the results in each of the above case.
#### Answer
**(i)** Degree of Financial Leverage = $\dfrac{\text{EBIT}}{\text{EBT}} = \dfrac{\text{₹ 1,00,000}}{\text{₹ 75,000}}$ = **1.333 times**

So, If EBIT increases by 10% then Taxable Income (EBT) will be increased by 1.333 × 10 = **13.33% (approx.)**

***Verification***

| Particulars | Amount (₹) |
|---|---:|
| New EBIT after 10% increase (₹ 1,00,000 + 10%) | 1,10,000 |
| *Less:* Interest | 25,000 |
| Earnings before Tax after change (EBT) | 85,000 |

Increase in Earnings before Tax = ₹ 85,000 - ₹ 75,000 = ₹ 10,000

So, percentage change in Taxable Income (EBT) = $\dfrac{\text{₹ 10,000}}{\text{₹ 75,000}} \times 100$ = **13.333%, hence verified**

**(ii)** Degree of Operating Leverage = $\dfrac{\text{Contribution}}{\text{EBIT}} = \dfrac{\text{₹ 3,00,000}}{\text{₹ 1,00,000}}$ = **3 times**

So, if sale is increased by 10% then EBIT will be increased by 3 × 10 = **30%**

***Verification***

| Particulars | Amount (₹) |
|---|---:|
| New Sales after 10% increase (₹ 5,00,000 + 10%) | 5,50,000 |
| *Less:* Variable cost (40% of ₹ 5,50,000) | 2,20,000 |
| Contribution | 3,30,000 |
| *Less:* Fixed costs | 2,00,000 |
| Earnings before interest and tax after change (EBIT) | 1,30,000 |

Increase in Earnings before interest and tax (EBIT) = ₹ 1,30,000 - ₹ 1,00,000 = ₹ 30,000

So, percentage change in EBIT = $\dfrac{\text{₹ 30,000}}{\text{₹ 1,00,000}} \times 100$ = **30%, hence verified.**

**(iii)** Degree of Combined Leverage = $\dfrac{\text{Contribution}}{\text{EBT}} = \dfrac{\text{₹ 3,00,000}}{\text{₹ 75,000}}$ = **4 times**

So, if sale is increased by 10% then Taxable Income (EBT) will be increased by 4 × 10 = **40%**

***Verification***

| Particulars | Amount (₹) |
|---|---:|
| New Sales after 10% increase (₹ 5,00,000 + 10%) | 5,50,000 |
| *Less:* Variable cost (40% of ₹ 5,50,000) | 2,20,000 |
| Contribution | 3,30,000 |
| *Less:* Fixed costs | 2,00,000 |
| Earnings before interest and tax (EBIT) | 1,30,000 |
| *Less:* Interest | 25,000 |
| Earnings before tax after change (EBT) | 1,05,000 |

Increase in Earnings before tax (EBT) = ₹ 1,05,000 - ₹ 75,000 = ₹ 30,000

So, percentage change in Taxable Income (EBT) = $\dfrac{\text{₹ 30,000}}{\text{₹ 75,000}} \times 100$ = **40%, hence verified**
#### Approach
Financial leverage links EBIT to taxable income, operating leverage links sales to EBIT, combined leverage links sales to taxable income: multiply the 10% by the right one, then rebuild the statement after the change to verify.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.intro.role
difficulty: easy
q: 13
a: 13
---
#### Question
List out the role of Chief Financial Officer in today's World.
#### Answer
**Role of Chief Financial Officer (CFO) in Today’s World:** Today, the role of chief financial officer, or CFO, is no longer confined to accounting, financial reporting and risk management. It’s about being a strategic business partner of the chief executive officer, or CEO. Some of the role of a CFO in today’s world are as follows-

- Budgeting
- Forecasting
- Managing M&As
- Profitability analysis (for example, by customer or product)
- Pricing analysis
- Decisions about outsourcing
- Overseeing the IT function.
- Overseeing the HR function.
- Strategic planning (sometimes overseeing this function).
- Regulatory compliance.
- Risk management
#### Approach
Go beyond accounting and reporting: think of the CFO as the CEO's strategic partner and list the business decisions and functions that now fall to the role.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.sources.other
difficulty: easy
q: 13
a: 14
---
#### Question
Explain in brief the methods of Venture Capital Financing.
#### Answer
Methods of Venture Capital Financing: Some common methods of venture capital financing are as follows-

**(i) Equity financing:** The venture capital undertakings generally require funds for a longer period but may not be able to provide returns to the investors during the initial stages. Therefore, the venture capital finance is generally provided by way of equity share capital. The equity contribution of venture capital firm does not exceed 49% of the total equity capital of venture capital undertakings so that the effective control and ownership remains with the entrepreneur.

**(ii) Conditional loan:** A conditional loan is repayable in the form of a royalty after the venture is able to generate sales. No interest is paid on such loans. In India venture capital financiers charge royalty ranging between 2 and 15 per cent; actual rate depends on other factors of the venture such as gestation period, cash flow patterns, risk and other factors of the enterprise. Some Venture capital financiers give a choice to the enterprise of paying a high rate of interest (which could be well above 20 per cent) instead of royalty on sales once it becomes commercially sound.

**(iii) Income note:** It is a hybrid security which combines the features of both conventional loan and conditional loan. The entrepreneur has to pay both interest and royalty on sales but at substantially low rates. IDBI’s VCF provides funding equal to 80 – 87.50% of the projects cost for commercial application of indigenous technology.

**(iv) Participating debenture:** Such security carries charges in three phases — in the start-up phase no interest is charged, next stage a low rate of interest is charged up to a particular level of operation, after that, a high rate of interest is required to be paid.
#### Approach
Name the four instruments and say how the financier is paid in each: equity, royalty on a conditional loan, interest plus royalty on an income note, and rising interest on a participating debenture.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.coc.equity
difficulty: easy
q: 13
a: 14
---
#### Question
Distinguish between Unsystematic Risk & Systematic Risk.
#### Answer
**(i) Unsystematic Risk:** This is also called company specific risk as the risk is related with the company’s performance. This type of risk can be reduced or eliminated by diversification of the securities portfolio. This is also known as diversifiable risk.

**(ii) Systematic Risk:** It is the macro-economic or market specific risk under which a company operates. This type of risk cannot be eliminated by the diversification hence, it is non-diversifiable. The examples are inflation, Government policy, interest rate etc.

---
item: q6c-or
alt: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
oos: yes
difficulty: easy
q: 13
a: 14
note: ICAI prints this as the OR alternative to Q6(c), with its own (2 Marks). Old scheme, out of syllabus (ours): the risk-adjusted discount rate, a technique of risk analysis in capital budgeting in old Paper 8's Investment Decisions, is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material. No tag.
---
#### Question
What is Risk Adjusted Discount Rate ?
#### Answer
**Risk Adjusted Discount Rate:** A risk adjusted discount rate is a sum of risk-free rate and risk premium. The Risk Premium depends on the perception of risk by the investor of a particular investment and risk aversion of the Investor.

So, Risks adjusted discount rate = Risk free rate+ Risk premium.
