<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-rtp-nov2019
paper: p8
kind: rtp
attempt: nov2019
qfile: old/p8/rtp-nov2019-qa.pdf
afile: old/p8/rtp-nov2019-qa.pdf
status: checked
by: tx-63
date: 2026-10-20
note: Old-scheme Paper 8 (Financial Management and Economics for Finance) Revision Test Paper for the November 2019 examination (ICAI's running heads "PAPER – 8: FINANCIAL MANAGEMENT AND ECONOMICS FOR FINANCE" / "INTERMEDIATE (NEW) EXAMINATION: NOVEMBER, 2019"). ICAI's own copy is gone; the file is the cacult.com mirror named in bank/sources.json, with no mirror banner (the original Word export). Only Section A Financial Management is transcribed (questions pp.1-5, "SUGGESTED HINTS/ANSWERS" pp.6-16); Section B Economics for Finance (from p.17) is not, which is check.py's info line on pp.17-24. ICAI prints no marks and no instructions, as every RTP. ICAI's chapter headings before the questions (Ratio Analysis, Cost of Capital, Capital Structure, Leverage, Capital Budgeting, Risk Analysis in Capital Budgeting, Dividend Decision, Management of Working Capital (twice), Miscellaneous) are headings, not question text, and are not transcribed. Item model: Q1-Q9 are one numerical problem each (their requirements, e.g. Q1 (i)-(x), Q3's EPS, financial break-even and indifference points, Q8 (i)-(ii), work on the same data and are answered as one connected working, so they stay inside one item); Q10 (a)-(c) are separate short notes under the shared lead-in "Write short notes on the following:" (case c1): 12 items, all descriptive. Every table was rebuilt from the rendered pages; ICAI's stacked fractions are written in KaTeX (inside table cells inline with a slash) with ICAI's own words, numbers and symbols (the ÷ and × the text layer drops, read from the pages), the subscripts of D1, P0 and Ke as KaTeX subscripts in formulas and as plain letters in running text; the words the equation editor sets without spaces ("Grossprofit", "Operatingcos t", "Capitalemployed", "Totalassets", "40,00,000shares") written with their spaces; the • bullets of Q3 as a list; the Rupee-font backtick as ₹, and ICAI's "(₹ )" column heads kept with their space. Q10(b)'s numbered functions are written "1\." … "5\." so that Markdown does not renumber them around their paragraphs. ICAI's own slips are kept and noted on their items (Q1's "Operating ratio" and "Current liablities", Q5's 12% discount factors against the 15% cost of capital in the question, Q7's "R" beside r, Q8's Year 2 total of current liabilities printed a line lower). check.py: clean (no numbers accepted). Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics; Q6 (NPV at the risk-free and the risk-adjusted discount rate) is out of syllabus, nearest tag fm.capbud.npv (lead ruling), see its note.
---

---
item: q1
qno: 1
type: descriptive
tags: fm.ratio.profit, fm.ratio.liquidity, fm.ratio.activity
difficulty: medium
q: 1-2
a: 6-7
note: Ours: requirement (iii) is "Operating cost ratio"; ICAI's answer heads it "Operating ratio" and writes "Current liablities" in (vi) and (vii); kept as printed.
---
#### Question
The following is the Profit and loss account and Balance sheet of KLM LLP.

**Trading and Profit & Loss Account**

| Particulars | Amount (₹ ) | Particulars | Amount (₹ ) |
|---|---:|---|---:|
| To Opening stock | 12,46,000 | By Sales | 1,96,56,000 |
| To Purchases | 1,56,20,000 | By Closing stock | 14,28,000 |
| To Gross profit c/d | 42,18,000 | | |
| | 2,10,84,000 | | 2,10,84,000 |
| | | By Gross profit b/d | 42,18,000 |
| To Administrative expenses | 18,40,000 | By Interest on investment | 24,600 |
| To Selling & distribution expenses | 7,56,000 | By Dividend received | 22,000 |
| To Interest on loan | 2,60,000 | | |
| To Net profit | 14,08,600 | | |
| | 42,64,600 | | 42,64,600 |

**Balance Sheet as on……….**

| Capital & Liabilities | Amount (₹ ) | Assets | Amount (₹ ) |
|---|---:|---|---:|
| Capital | 20,00,000 | Plant & machinery | 24,00,000 |
| Retained earnings | 42,00,000 | Building | 42,00,000 |
| General reserve | 12,00,000 | Furniture | 12,00,000 |
| Term loan from bank | 26,00,000 | Sundry receivables | 13,50,000 |
| Sundry Payables | 7,20,000 | Inventory | 14,28,000 |
| Other liabilities | 2,80,000 | Cash & Bank balance | 4,22,000 |
| | 1,10,00,000 | | 1,10,00,000 |

You are required to COMPUTE:

(i) Gross profit ratio (ii) Net profit ratio (iii) Operating cost ratio

(iv) Operating profit ratio (v) Inventory turnover ratio (vi) Current ratio

(vii) Quick ratio (viii) Interest coverage ratio (ix) Return on capital employed

(x) Debt to assets ratio.
#### Answer
(i) Gross profit ratio = $\dfrac{\text{Gross profit}}{\text{Sales}} \times 100$ = $\dfrac{\text{₹42,18,000}}{\text{₹1,96,56,000}} \times 100$ = 21.46%

(ii) Net profit ratio = $\dfrac{\text{Net profit}}{\text{Sales}} \times 100$ = $\dfrac{\text{₹14,08,600}}{\text{₹1,96,56,000}} \times 100$ = 7.17%

(iii) Operating ratio = $\dfrac{\text{Operating cost}}{\text{Sales}} \times 100$

Operating cost = Cost of goods sold + Operating expenses

Cost of goods sold = Sales – Gross profit

= 1,96,56,000 - 42,18,000 = 1,54,38,000

Operating expenses = Administrative expenses + Selling & distribution expenses

= 18,40,000 + 7,56,000 = 25,96,000

Therefore, Operating ratio = $\dfrac{\text{1,54,38,000} + \text{25,96,000}}{\text{1,96,56,000}} \times 100$

= $\dfrac{\text{1,80,34,000}}{\text{1,96,56,000}} \times 100$ = 91.75%

(iv) Operating profit ratio = 100 – Operating cost ratio

= 100 – 91.75% = 8.25%

(v) Inventory turnover ratio = $\dfrac{\text{Cost of goods sold}}{\text{Average stock}}$

= $\dfrac{\text{1,54,38,000}}{(\text{14,28,000} + \text{12,46,000}) / 2}$

= $\dfrac{\text{1,54,38,000}}{\text{13,37,000}}$ = 11.55 times

(vi) Current ratio = $\dfrac{\text{Current assets}}{\text{Current liablities}}$

Current assets = Sundry receivables + Inventory + Cash & Bank balance

= 13,50,000 + 14,28,000 + 4,22,000 = 32,00,000

Current liabilities = Sundry Payables + Other liabilities

= 7,20,000 + 2,80,000 = 10,00,000

Current ratio = $\dfrac{\text{32,00,000}}{\text{10,00,000}}$ = 3.2 times

(vii) Quick Ratio = $\dfrac{\text{Current assets} - \text{Inventories}}{\text{Current liablities}}$

= $\dfrac{\text{32,00,000} - \text{14,28,000}}{\text{10,00,000}}$ =1.77 times

(viii) Interest coverage ratio = $\dfrac{\text{EBIDT}}{\text{Interest}}$ = $\dfrac{\text{Net profit} + \text{Interest}}{\text{Interest}}$

= $\dfrac{\text{14,08,600} + \text{2,60,000}}{\text{2,60,000}}$ = 6.42 times

(ix) Return on capital employed (ROCE) = $\dfrac{\text{EBIT}}{\text{Capital employed}} \times 100$

Capital employed = Capital + Retained earnings + General reserve + Term loan

= 20,00,000 + 42,00,000 + 12,00,000 + 26,00,000

= 1,00,00,000

Therefore, ROCE = $\dfrac{\text{16,68,600}}{\text{1,00,00,000}} \times 100$ = 16.69%

(x) Debt to assets ratio = $\dfrac{\text{Debts}}{\text{Total assets}} \times 100$ = $\dfrac{\text{26,00,000}}{\text{1,10,00,000}} \times 100$ =23.64%
#### Approach
Derive cost of goods sold (sales less gross profit) and operating expenses first; most ratios reuse them. Capital employed here is capital, reserves and the term loan.

---
item: q2
qno: 2
type: descriptive
tags: fm.coc.wacc, fm.coc.equity
difficulty: medium
q: 2
a: 7-8
---
#### Question
KM Ltd. has the following capital structure on September 30, 2019:

| Sources of capital | (₹ ) |
|---|---:|
| Equity Share Capital (40,00,000 Shares of ₹ 10 each) | 4,00,00,000 |
| Reserves & Surplus | 4,00,00,000 |
| 12% Preference Shares | 2,00,00,000 |
| 9% Debentures | 6,00,00,000 |
| | 16,00,00,000 |

The market price of equity share is ₹60. It is expected that the company will pay next year a dividend of ₹6 per share, which will grow at 10% forever. Assume 40% income tax rate.

You are required to COMPUTE weighted average cost of capital using market value weights.
#### Answer
**Workings:**

(i) Cost of Equity (Ke) = $\dfrac{D_1}{P_0} + g$ = $\dfrac{\text{₹6}}{\text{₹60}}$ + 0.10 = 0.20 = 20%

(ii) Cost of Debentures (Kd) = I (1 - t) = 0.09 (1 - 0.4) = 0.054 or 5.4%

**Computation of Weighted Average Cost of Capital (WACC using market value weights)**

| Source of capital | Market Value of capital (₹) | Weight | Cost of capital (%) | WACC (%) |
|---|---:|---:|---:|---:|
| 9% Debentures | 6,00,00,000 | 0.1875 | 5.40 | 1.01 |
| 12% Preference Shares | 2,00,00,000 | 0.0625 | 12.00 | 0.75 |
| Equity Share Capital (₹60 × 40,00,000 shares) | 24,00,00,000 | 0.7500 | 20.00 | 15.00 |
| Total | 32,00,00,000 | 1.00 | | 16.76 |
#### Approach
With market value weights, equity (share capital and reserves together) is valued at the share price times the number of shares; debentures and preference shares stay at book value as no market price is given.

---
item: q3
qno: 3
type: descriptive
tags: fm.cs.ebiteps
difficulty: medium
q: 2
a: 8-9
---
#### Question
The management of RT Ltd. wants to raise its funds from market to meet out the financial demands of its long-term projects. The company has various combinations of proposals to raise its funds. You are given the following proposals of the company:

| Proposal | Equity shares (%) | Debts (%) | Preference shares (%) |
|---|---:|---:|---:|
| P | 100 | - | - |
| Q | 50 | 50 | - |
| R | 50 | - | 50 |

(i) Cost of debt and preference shares is 12% each.

(ii) Tax rate –40%

(iii) Equity shares of the face value of ₹10 each will be issued at a premium of ₹10 per share.

(iv) Total investment to be raised ₹8,00,00,000.

(v) Expected earnings before interest and tax ₹3,60,00,000.

From the above proposals the management wants to take advice from you for appropriate plan after computing the following:

- Earnings per share
- Financial break-even-point

COMPUTE the EBIT range among the plans for indifference.
#### Answer
**(i) Computation of Earnings per Share (EPS)**

| Plans | P (₹ ) | Q (₹) | R (₹ ) |
|---|---:|---:|---:|
| Earnings before interest & tax (EBIT) | 3,60,00,000 | 3,60,00,000 | 3,60,00,000 |
| *Less:* Interest charges | -- | (48,00,000) | -- |
| Earnings before tax (EBT) | 3,60,00,000 | 3,12,00,000 | 3,60,00,000 |
| *Less* : Tax @ 40% | (1,44,00,000) | (1,24,80,000) | (1,44,00,000) |
| Earnings after tax (EAT) | 2,16,00,000 | 1,87,20,000 | 2,16,00,000 |
| *Less :* Preference share dividend | -- | -- | (48,00,000) |
| Earnings available for equity shareholders | 2,16,00,000 | 1,87,20,000 | 1,68,00,000 |
| No. of equity shares | 40,00,000 | 20,00,000 | 20,00,000 |
| E.P.S | 5.40 | 9.36 | 8.40 |

**(ii) Computation of Financial Break-even Points**

Proposal ‘P’ = 0

Proposal ‘Q’ = ₹48,00,000 (Interest charges)

Proposal ‘R’ = Earnings required for payment of preference share dividend i.e. ₹48,00,000 ÷ 0.6 = ₹80,00,000

**(iii) Computation of Indifference Point between the Proposals**

Combination of Proposals

(a) Indifference point where EBIT of proposal “P” and proposal ‘Q’ is equal

$\dfrac{\text{EBIT}(1 - 0.4)}{\text{40,00,000 shares}} = \dfrac{(\text{EBIT} - \text{₹48,00,000})(1 - 0.4)}{\text{20,00,000 shares}}$

0.6 EBIT = 1.2 EBIT – ₹57,60,000

EBIT = ₹96,00,000

(b) Indifference point where EBIT of proposal ‘P’ and proposal ‘R’ is equal:

$\dfrac{\text{EBIT}(1 - 0.40)}{\text{40,00,000 shares}} = \dfrac{\text{EBIT}(1 - 0.40) - \text{₹48,00,000}}{\text{20,00,000 shares}}$

$\dfrac{\text{0.6EBIT}}{\text{40,00,000 shares}} = \dfrac{\text{0.6EBIT} - \text{₹48,00,000}}{\text{20,00,000 shares}}$

0.30 EBIT = 0.6 EBIT – ₹48,00,000

EBIT = $\dfrac{\text{₹48,00,000}}{0.30}$ =₹1,60,00,000

(c) Indifference point where EBIT of proposal ‘Q’ and proposal ‘R’ are equal

$\dfrac{(\text{EBIT} - \text{₹48,00,000})(1 - 0.4)}{\text{20,00,000 shares}} = \dfrac{\text{EBIT}(1 - 0.4) - \text{₹48,00,000}}{\text{20,00,000 shares}}$

There is no indifference point between proposal ‘Q’ and proposal ‘R’
#### Approach
At ₹ 20 a share (₹ 10 face plus ₹ 10 premium), ₹ 8 crore buys 40 lakh shares under P and 20 lakh under Q and R. Preference dividend is paid out of profit after tax, so its break-even is the dividend grossed up by (1 – tax).

---
item: q4
qno: 4
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 3
a: 9
note: Ours: ICAI's answer to (i) ends "It is level specific." and gives no further comment; kept as printed.
---
#### Question
The following summarises the percentage changes in operating income, percentage changes in revenues, and betas for four listed firms.

| Firm | Change in revenue | Change in operating income | Beta |
|---|---:|---:|---:|
| A Ltd. | 35% | 22% | 1.00 |
| B Ltd. | 24% | 35% | 1.65 |
| C Ltd. | 29% | 26% | 1.15 |
| D Ltd. | 32% | 30% | 1.20 |

Required:

(i) CALCULATE the degree of operating leverage for each of these firms. Comment also.

(ii) Use the operating leverage to EXPLAIN why these firms have different beta.
#### Answer
**(i)** Degree of operating leverage = $\dfrac{\text{\% Change in Operating income}}{\text{\% Change in Revenues}}$

| | | | | |
|---|---|---:|---|---:|
| A Ltd. | = | 0.22 / 0.35 | = | 0.63 |
| B Ltd. | = | 0.35 / 0.24 | = | 1.46 |
| C Ltd. | = | 0.26 / 0.29 | = | 0.90 |
| D Ltd. | = | 0.30 / 0.32 | = | 0.94 |

It is level specific.

**(ii)** High operating leverage leads to high beta. So when operating leverage is lowest i.e. 0.63, Beta is minimum (1) and when operating leverage is maximum i.e. 1.46, beta is highest i.e. 1.65

---
item: q5
qno: 5
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: medium
q: 3
a: 9-10
note: Ours: the question gives a cost of capital of 15 percent, but ICAI's answer heads its discount column "12% discount factor" and uses the 12% factors (0.892 … 0.567); ICAI's figures are kept as printed, not corrected.
---
#### Question
MTR Limited is considering buying a new machine which would have a useful economic life of five years, at a cost of ₹25,00,000 and a scrap value of ₹3,00,000, with 80 per cent of the cost being payable at the start of the project and 20 per cent at the end of the first year. The machine would produce 75,000 units per annum of a new product with an estimated selling price of ₹300 per unit. Direct costs would be ₹285 per unit and annual fixed costs, including depreciation calculated on a straight- line basis, would be ₹8,40,000 per annum.

In the first year and the second year, special sales promotion expenditure, not included in the above costs, would be incurred, amounting to ₹1,00,000 and ₹1,50,000 respectively.

EVALUATE the project using the NPV method of investment appraisal, assuming the company’s cost of capital to be 15 percent.
#### Answer
**Calculation of Net Cash flows**

Contribution = (300 – 285) × 75,000 = ₹11,25,000

Fixed costs = 8,40,000 – [(25,00,000 – 3,00,000)/5] = ₹4,00,000

| Year | Capital (₹ ) | Contribution (₹ ) | Fixed costs (₹) | Adverts (₹) | Net cash flow (₹) |
|---:|---:|---:|---:|---:|---:|
| 0 | (20,00,000) | | | | (20,00,000) |
| 1 | (5,00,000) | 11,25,000 | (4,00,000) | (1,00,000) | 1,25,000 |
| 2 | | 11,25,000 | (4,00,000) | (1,50,000) | 5,75,000 |
| 3 | | 11,25,000 | (4,00,000) | | 7,25,000 |
| 4 | | 11,25,000 | (4,00,000) | | 7,25,000 |
| 5 | 3,00,000 | 11,25,000 | (4,00,000) | | 10,25,000 |

**Calculation of Net Present Value**

| Year | Net cash flow (₹ ) | 12% discount factor | Present value (₹) |
|---:|---:|---:|---:|
| 0 | (20,00,000) | 1.000 | (20,00,000) |
| 1 | 1,25,000 | 0.892 | 1,11,500 |
| 2 | 5,75,000 | 0.797 | 4,58,275 |
| 3 | 7,25,000 | 0.711 | 5,15,475 |
| 4 | 7,25,000 | 0.635 | 4,60,375 |
| 5 | 10,25,000 | 0.567 | 5,81,175 |
| | | | 1,26,800 |

The net present value of the project is ₹1,26,800.
#### Approach
The fixed costs include depreciation, which is not a cash flow: take it out first. Then lay out the capital outflows (80% now, 20% at the end of year 1), the scrap value and the promotion spend year by year.

---
item: q6
qno: 6
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: easy
q: 3-4
a: 10-11
note: Out of syllabus (old scheme, ours; lead ruling for old Paper 8): ICAI prints this question under its heading "Risk Analysis in Capital Budgeting"; it asks for the NPV at the risk-free rate and at the risk-adjusted discount rate, which is risk analysis in capital budgeting, not in the new-scheme Paper 6A syllabus or the January 2027 Study Material; nearest tag fm.capbud.npv. ICAI's answer heads the second table "Initial investment" without "Less:"; kept as printed.
---
#### Question
SL Ltd. has invested ₹1,000 lakhs in a project. The risk-free rate of return is 5%. Risk premium expected by the Management is 10%. The life of the project is 5 years. Following are the cash flows that are estimated over the life of the project.

| Year | Cash flows (₹ in lakhs) |
|---:|---:|
| 1 | 125 |
| 2 | 300 |
| 3 | 375 |
| 4 | 400 |
| 5 | 325 |

CALCULATE Net Present Value of the project based on Risk free rate and also on the basis of Risks adjusted discount rate.
#### Answer
The Present Value of the Cash Flows for all the years by discounting the cash flow at 5% is calculated as below:

| Year | Cash flows ₹ in lakhs | Discounting Factor @5% | Present value of Cash Flows ₹ In Lakhs |
|---:|---:|---:|---:|
| 1 | 125 | 0.952 | 119.00 |
| 2 | 300 | 0.907 | 272.10 |
| 3 | 375 | 0.863 | 323.62 |
| 4 | 400 | 0.822 | 328.80 |
| 5 | 325 | 0.783 | 254.47 |
| | Total of present value of Cash flow | | 1,297.99 |
| | Less: Initial investment | | 1,000.00 |
| | Net Present Value (NPV) | | 297.99 |

Now when the risk-free rate is 5% and the risk premium expected by the Management is 10%. So the risk adjusted discount rate is 5% + 10% =15%.

Discounting the above cash flows using the Risk Adjusted Discount Rate would be as below:

| Year | Cash flows ₹ in Lakhs | Discounting Factor@15% | Present Value of Cash Flows ₹in lakhs |
|---:|---:|---:|---:|
| 1 | 125 | 0.869 | 108.62 |
| 2 | 300 | 0.756 | 226.80 |
| 3 | 375 | 0.657 | 246.37 |
| 4 | 400 | 0.571 | 228.40 |
| 5 | 325 | 0.497 | 161.52 |
| | Total of present value of Cash flow | | 971.71 |
| | Initial investment | | 1,000.00 |
| | Net present value (NPV) | | (28.29) |

---
item: q7
qno: 7
type: descriptive
tags: fm.div.models
difficulty: easy
q: 4
a: 11
note: Ours: (i) and (ii) end with question marks; ICAI's answer defines "R = Return earned on investment" although its formula writes r; kept as printed.
---
#### Question
The following information pertains to SD Ltd.

| | |
|---|---:|
| Earnings of the Company | ₹ 50,00,000 |
| Dividend Payout ratio | 60% |
| No. of shares outstanding | 10,00,000 |
| Equity capitalization rate | 12% |
| Rate of return on investment | 15% |

(i) COMPUTE the market value per share as per Walter’s model?

(ii) COMPUTE the optimum dividend payout ratio according to Walter’s model and the market value of Company’s share at that payout ratio?
#### Answer
(i) Walter’s model is given by

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e}$

Where

P = Market price per share.

E = Earnings per share = ₹ 5

D = Dividend per share = ₹ 3

R = Return earned on investment = 15%

Ke = Cost of equity capital = 12%

P = $\dfrac{3 + \dfrac{0.15}{0.12}(5 - 3)}{0.12}$ = ₹ 45.83

(ii) According to Walter’s model when the return on investment is more than the cost of equity capital, the price per share increases as the dividend pay-out ratio decreases. Hence, the optimum dividend pay-out ratio in this case is nil.

So, at a pay-out ratio of zero, the market value of the company’s share will be:

P = $\dfrac{0 + \dfrac{0.15}{0.12}(5 - 0)}{0.12}$ = ₹52.08

---
item: q8
qno: 8
type: descriptive
tags: fm.wc.estimate
difficulty: hard
q: 4-5
a: 11-13
note: Ours: the question writes "2 month’s average sales" and "1 month’s average purchase"; ICAI's answer prints the Year 2 "Total Current Liabilities: (B)" figure 2,42,000 a line below Year 1's 1,84,000 (written in one row); kept as printed.
---
#### Question
Following are cost information of KG Ltd., which has commenced a new project for an annual production of 24,000 units which is the full capacity:

| | Costs per unit (₹) |
|---|---:|
| Materials | 80.00 |
| Direct labour and variable expenses | 40.00 |
| Fixed manufacturing expenses | 12.00 |
| Depreciation | 20.00 |
| Fixed administration expenses | 8.00 |
| | 160.00 |

The selling price per unit is expected to be ₹192 and the selling expenses ₹10 per unit, 80% of which is variable.

In the first two years of operations, production and sales are expected to be as follows:

| Year | Production (No. of units) | Sales (No. of units) |
|---:|---:|---:|
| 1 | 12,000 | 10,000 |
| 2 | 18,000 | 17,000 |

To assess the working capital requirements, the following additional information is available:

| | | |
|---|---|---|
| (a) | Stock of materials | 2 months’ average consumption |
| (b) | Work-in-process | Nil |
| (c) | Debtors | 2 month’s average sales. |
| (d) | Cash balance | ₹ 1,00,000 |
| (e) | Creditors for supply of materials | 1 month’s average purchase during the year. |
| (f) | Creditors for expenses | 1 month’s average of all expenses during the year. |

PREPARE, for the two years:

(i) A projected statement of Profit/Loss (Ignoring taxation); and

(ii) A projected statement of working capital requirements
#### Answer
**(i) Projected Statement of Profit / Loss**

**(Ignoring Taxation)**

| | Year 1 | Year 2 |
|---|---:|---:|
| Production (Units) | 12,000 | 18,000 |
| Sales (Units) | 10,000 | 17,000 |

| | (₹) | (₹) |
|---|---:|---:|
| Sales revenue (A) (Sales unit × ₹192) | 19,20,000 | 32,64,000 |
| **Cost of production:** | | |
| Materials cost (Units produced × ₹80) | 9,60,000 | 14,40,000 |
| Direct labour and variable expenses (Units produced × ₹40) | 4,80,000 | 7,20,000 |
| Fixed manufacturing expenses (Production Capacity: 24,000 units × ₹12) | 2,88,000 | 2,88,000 |
| Depreciation (Production Capacity : 24,000 units × ₹20) | 4,80,000 | 4,80,000 |
| Fixed administration expenses (Production Capacity : 24,000 units × ₹8) | 1,92,000 | 1,92,000 |
| Total Costs of Production | 24,00,000 | 31,20,000 |
| *Add*: Opening stock of finished goods (Year 1 : Nil; Year 2 : 2,000 units) | --- | 4,00,000 |
| Cost of Goods available for sale (Year 1: 12,000 units; Year 2: 20,000 units) | 24,00,000 | 35,20,000 |
| *Less*: Closing stock of finished goods at average cost (year 1: 2000 units, year 2 : 3000 units) (Cost of Production × Closing stock/ units produced) | (4,00,000) | (5,28,000) |
| Cost of Goods Sold | 20,00,000 | 29,92,000 |
| *Add*: Selling expenses – Variable (Sales unit × ₹8) | 80,000 | 1,36,000 |
| *Add:* Selling expenses -Fixed (24,000 units × ₹2) | 48,000 | 48,000 |
| Cost of Sales : (B) | 21,28,000 | 31,76,000 |
| Profit (+) / Loss (-): (A - B) | (-) 2,08,000 | (+) 88,000 |

**Working Notes:**

**1. Calculation of creditors for supply of materials:**

| | Year 1 (₹ ) | Year 2 (₹) |
|---|---:|---:|
| Materials consumed during the year | 9,60,000 | 14,40,000 |
| *Add*: Closing stock (2 month’s average consumption) | 1,60,000 | 2,40,000 |
| | 11,20,000 | 16,80,000 |
| *Less:* Opening Stock | --- | 1,60,000 |
| Purchases during the year | 11,20,000 | 15,20,000 |
| Average purchases per month (Creditors) | 93,333 | 1,26,667 |

**2. Creditors for expenses:**

| | Year 1 (₹) | Year 2 (₹ ) |
|---|---:|---:|
| Direct labour and variable expenses | 4,80,000 | 7,20,000 |
| Fixed manufacturing expenses | 2,88,000 | 2,88,000 |
| Fixed administration expenses | 1,92,000 | 1,92,000 |
| Selling expenses (variable + fixed) | 1,28,000 | 1,84,000 |
| Total | 10,88,000 | 13,84,000 |
| Average per month | 90,667 | 1,15,333 |

**(ii) Projected Statement of Working Capital requirements**

| | Year 1 (₹ ) | Year 2 (₹) |
|---|---:|---:|
| **Current Assets:** | | |
| Inventories: | | |
| -Stock of materials (2 month’s average consumption) | 1,60,000 | 2,40,000 |
| -Finished goods | 4,00,000 | 5,28,000 |
| Debtors (2 month’s average sales) (including profit) | 3,20,000 | 5,44,000 |
| Cash | 1,00,000 | 1,00,000 |
| Total Current Assets/ Gross working capital (A) | 9,80,000 | 14,12,000 |
| **Current Liabilities:** | | |
| Creditors for supply of materials (Refer to working note 1) | 93,333 | 1,26,667 |
| Creditors for expenses (Refer to working note 2) | 90,667 | 1,15,333 |
| Total Current Liabilities: (B) | 1,84,000 | 2,42,000 |
| Estimated Working Capital Requirements: (A-B) | 7,96,000 | 11,70,000 |
#### Approach
Fixed costs are incurred on full capacity (24,000 units) whatever the output; closing finished stock is valued at the year's average cost of production. Purchases (for creditors) are consumption plus closing stock less opening stock of materials.

---
item: q9
qno: 9
type: descriptive
tags: fm.wc.receivables
difficulty: medium
q: 5
a: 13-14
note: Ours: ICAI's recommendation ends without a full stop; kept as printed.
---
#### Question
A regular customer of your company has approached to you for extension of credit facility for purchasing of goods. On analysis of past performance and on the basis of information supplied, the following pattern of payment schedule emerges:

**Pattern of Payment Schedule**

| | |
|---|---|
| At the end of 30 days | 20% of the bill |
| At the end of 60 days | 30% of the bill. |
| At the end of 90 days | 30% of the bill. |
| At the end of 100 days | 18% of the bill. |
| Non-recovery | 2% of the bill. |

The customer wants to enter into a firm commitment for purchase of goods of ₹30 lakhs in 2019, deliveries to be made in equal quantities on the first day of each quarter in the calendar year. The price per unit of commodity is ₹300 on which a profit of ₹10 per unit is expected to be made. It is anticipated that taking up of this contract would mean an extra recurring expenditure of ₹10,000 per annum. If the opportunity cost is 18% per annum, would you as the finance manager of the company RECOMMEND the grant of credit to the customer? Assume 1 year = 360 days.
#### Answer
**Statement showing the Evaluation of credit Policies**

| Particulars | Proposed Policy ₹ |
|---|---:|
| **A. Expected Profit:** | |
| (a) Credit Sales | 30,00,000 |
| (b) Total Cost | |
| (i) Variable Costs | 29,00,000 |
| (ii) Recurring Costs | 10,000 |
| | 29,10,000 |
| (c) Bad Debts | 60,000 |
| (d) Expected Profit [(a) – (b) – (c)] | 30,000 |
| **B. Opportunity Cost of Investments in Receivables** | 1,00,395 |
| **C. Net Benefits (A – B)** | (70,395) |

**Recommendation:** The Proposed Policy should not be adopted since the net benefits under this policy are negative

**Working Note: Calculation of Opportunity Cost of Average Investments**

Opportunity Cost = Total Cost × $\dfrac{\text{Collection period}}{360} \times \dfrac{\text{Rate of Return}}{100}$

| Particulars | 20% | 30% | 30% | 18% | Total |
|---|---:|---:|---:|---:|---:|
| A. Total Cost | 5,82,000 | 8,73,000 | 8,73,000 | 5,23,800 | 28,51,800 |
| B. Collection period | 30/360 | 60/360 | 90/360 | 100/360 | |
| C. Required Rate of Return | 18% | 18% | 18% | 18% | |
| D. Opportunity Cost (A × B × C) | 8,730 | 26,190 | 39,285 | 26,190 | 1,00,395 |
#### Approach
Weigh the expected profit (sales less cost, the extra expenditure and the 2% bad debts) against the cost of the money tied up in receivables, using the share of the bill collected at each date.

---
case: c1
qno: 10
q: 5
---
#### Case
Write short notes on the following:

---
item: q10a
case: c1
qno: 10
part: (a)
type: descriptive
tags: fm.capbud.payback
difficulty: easy
q: 5
a: 14-15
---
#### Question
STATE the meaning of Payback Reciprocal.
#### Answer
As the name indicates it is the reciprocal of payback period. A major drawback of the payback period method of capital budgeting is that it does not indicate any cut off period for the purpose of investment decision. It is, however, argued that the reciprocal of the payback would be a close approximation of the Internal Rate of Return (later discussed in detail) if the life of the project is at least twice the payback period and the project generates equal amount of the annual cash inflows. In practice, the payback reciprocal is a helpful tool for quick estimation of rate of return of a project provided its life is at least twice the payback period.

The payback reciprocal can be calculated as follows:

Payback Reciprocal = $\dfrac{\text{Average annual cash in flow}}{\text{Initial investment}}$

---
item: q10b
case: c1
qno: 10
part: (b)
type: descriptive
tags: fm.wc.cash
difficulty: easy
q: 5
a: 15
note: Ours: ICAI's answer reads "Treasury department carry out negotiations"; kept as printed.
---
#### Question
STATE the functions of treasury department.
#### Answer
1\. **Cash Management:** It involves efficient cash collection process and managing payment of cash both inside the organisation and to third parties.

There may be complete centralization within a group treasury or the treasury may simply advise subsidiaries and divisions on policy matter viz., collection/payment periods, discounts, etc.

Treasury will also manage surplus funds in an investment portfolio. Investment policy will consider future needs for liquid funds and acceptable levels of risk as determined by company policy.

2\. **Currency Management:** The treasury department manages the foreign currency risk exposure of the company. In a large multinational company (MNC) the first step will usually be to set off intra-group indebtedness. The use of matching receipts and payments in the same currency will save transaction costs. Treasury might advise on the currency to be used when invoicing overseas sales.

The treasury will manage any net exchange exposures in accordance with company policy. If risks are to be minimized then forward contracts can be used either to buy or sell currency forward.

3\. **Fund Management:** Treasury department is responsible for planning and sourcing the company’s short, medium and long-term cash needs. Treasury department will also participate in the decision on capital structure and forecast future interest and foreign currency rates.

4\. **Banking:** It is important that a company maintains a good relationship with its bankers. Treasury department carry out negotiations with bankers and act as the initial point of contact with them. Short-term finance can come in the form of bank loans or through the sale of commercial paper in the money market.

5\. **Corporate Finance:** Treasury department is involved with both acquisition and divestment activities within the group. In addition, it will often have responsibility for investor relations. The latter activity has assumed increased importance in markets where share-price performance is regarded as crucial and may affect the company’s ability to undertake acquisition activity or, if the price falls drastically, render it vulnerable to a hostile bid.

---
item: q10c
case: c1
qno: 10
part: (c)
type: descriptive
tags: fm.intro.role
difficulty: easy
q: 5
a: 15-16
note: Ours: the question writes "Inter relationship" without a hyphen; ICAI's answer reads "This have an influence" and ends without a full stop; kept as printed.
---
#### Question
DESCRIBE the Inter relationship between investment, financing and dividend decisions.
#### Answer
**Inter-relationship between Investment, Financing and Dividend Decisions:** The finance functions are divided into three major decisions, viz., investment, financing and dividend decisions. It is correct to say that these decisions are inter-related because the underlying objective of these three decisions is the same, i.e. maximisation of shareholders’ wealth. Since investment, financing and dividend decisions are all interrelated, one has to consider the joint impact of these decisions on the market price of the company’s shares and these decisions should also be solved jointly. The decision to invest in a new project needs the finance for the investment. The financing decision, in turn, is influenced by and influences dividend decision because retained earnings used in internal financing deprive shareholders of their dividends. An efficient financial management can ensure optimal joint decisions. This is possible by evaluating each decision in relation to its effect on the shareholders’ wealth.

The above three decisions are briefly examined below in the light of their inter-relationship and to see how they can help in maximising the shareholders’ wealth i.e. market price of the company’s shares.

**Investment decision**: The investment of long term funds is made after a careful assessment of the various projects through capital budgeting and uncertainty analysis. However, only that investment proposal is to be accepted which is expected to yield at least so much return as is adequate to meet its cost of financing. This have an influence on the profitability of the company and ultimately on its wealth.

**Financing decision**: Funds can be raised from various sources. Each source of funds involves different issues. The finance manager has to maintain a proper balance between long-term and short-term funds. With the total volume of long-term funds, he has to ensure a proper mix of loan funds and owner’s funds. The optimum financing mix will increase return to equity shareholders and thus maximise their wealth.

**Dividend decision**: The finance manager is also concerned with the decision to pay or declare dividend. He assists the top management in deciding as to what portion of the profit should be paid to the shareholders by way of dividends and what portion should be retained in the business. An optimal dividend pay-out ratio maximises shareholders’ wealth.

The above discussion makes it clear that investment, financing and dividend decisions are interrelated and are to be taken jointly keeping in view their joint effect on the shareholders’ wealth
