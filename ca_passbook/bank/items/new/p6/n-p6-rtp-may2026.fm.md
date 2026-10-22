<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p6-rtp-may2026
paper: p6
section: fm
kind: rtp
attempt: may2026
qfile: new/p6/rtp-may2026-qa.pdf
afile: new/p6/rtp-may2026-qa.pdf
status: checked
by: tx-30
date: 2026-10-20
note: Paper 6A (Financial Management) of ICAI's Revision Test Paper for the May 2026 examination: questions pp.1-11, Suggested Answers pp.11-29; the SM half (pp.30-43) is n-p6-rtp-may2026.sm.md. ICAI prints Part I (case scenario MCQs Q1 (i)-(v), and the MCQs Q2 and Q3) and Part II (descriptive, Q4-Q10) with no marks, as every RTP. The headings "PART I - Case Scenario based MCQs", "PART - II Descriptive Questions" and Part II's chapter headings (Ratio Analysis, Cost of Capital, Capital Structure, Leverage Analysis, Investment Decisions, Working Capital, Miscellaneous) are headings, not question text, and are not transcribed. ICAI prints the MCQ options as (A)-(D). Q4-Q9 each ask several requirements on one set of data and ICAI answers each in one connected solution (no marks to split by): one item each. Q6's answer labels only (a); its second half starts at the bold heading "Assuming 40% taxes as per MM Approach" and stays in the same item. Q10 (a), (b) and (c) are separate questions: three items. Subscripts ICAI prints (EPS2025, P0, D1, Ke, Kd, ko, Vu, VL, Rf, Rm) are written as KaTeX subscripts where ICAI sets them as subscripts; ICAI's "ß" for beta is kept. check.py: the numbers accepted are the paper's title on p.1, "PAPER – 6:" and "6A: FINANCIAL MANAGEMENT" (6 twice), not transcribed; and three numbers ICAI prints as the last line of a page, which check.py drops as a page number: the denominator 2 of the k_d formula at the foot of p.17 (Q5), the denominator 2 of the average debtors formula at the foot of p.26 (Q9) and the WACC total 11 in the last row of the book-value table at the foot of p.16 (Q5). Tables and formulas were re-read on the rendered pages (pp.4-10, 11-29).
---

---
case: c1
qno: 1
q: 1-2
---
#### Case
ABC Ltd, a newly incorporated company, commenced its operations in 2024 by issuing equity shares at face value. The company follows a pure equity capital structure and has 10,000 equity shares outstanding. During its first two years of operations, the company demonstrated stable financial performance. It earned a profit of ₹ 1,00,000 in 2024 and ₹ 1,04,000 in 2025, reflecting a consistent annual growth rate of 4%. The company’s cost of equity (Ke) is estimated at 8%. Based on the Gordon Growth Model, the market price per share at the end of 2025 has been valued at ₹ 162.24.

Although the company has been following a traditional dividend payout policy, the management is now concerned about whether this policy maximizes shareholders’ wealth. Specifically, the Board of Directors wants to assess whether the current dividend payout ratio is appropriate in light of the company’s growth prospects and return on retained earnings.

To support this decision, the finance team has been instructed to evaluate the firm’s dividend policy using both the Gordon Growth Model and Walter’s Model. The objective is to determine the impact of the existing and alternative dividend payout strategies on the company’s market price per share, growth rate, capital employed, and overall shareholder wealth maximization.

You are required to answer the following requirements:

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: B
tags: fm.div.models
difficulty: medium
q: 2
a: 11-12
---
#### Question
Based on the given information, what is the face value per share and the rate of return on retained earnings (r)?
#### Options
(A) ₹ 10 and 8%
(B) ₹ 100 and 10%
(C) ₹ 100 and 8%
(D) ₹ 10 and 10%
#### Answer
**(B) ₹ 100 and 10%**

**Working Note 1: Earnings per Share (EPS) and Growth rate**

$EPS_{2025} = \dfrac{1{,}04{,}000}{10{,}000}$ = ₹ 10.40

Growth rate (g) = $\dfrac{1{,}04{,}000 - 1{,}00{,}000}{1{,}00{,}000}$ = 4%

**Working Note 2: Dividend Payout Ratio & Retention Ratio**

Using Gordon Growth Model:

$P_0 = \dfrac{D_1}{Ke\text{-}g}$

$162.24 = \dfrac{D_1}{0.08\text{-}0.04} \Rightarrow D_1 = 6.4896$

$D_0 = \dfrac{6.4896}{1.04}$ = ₹ 6.24

**Dividend Payout Ratio (DPR)**

DPR = $\dfrac{6.24}{10.40}$ = 60%

**Retention Ratio (b)**

b = 1-0.60 = 40%

**Working Note 3: Rate of Return on Retained Earnings (r)**

g = b × r

0.04 = 0.40 × r ⇒ r = 10%

Earnings in 2024 = 1,00,000

Capital employed = $\dfrac{1{,}00{,}000}{10\%}$ = ₹ 10,00,000

Face value per share = $\dfrac{10{,}00{,}000}{10{,}000}$ = ₹ 100
#### Approach
Work back from the Gordon price to D1 and D0, which gives the payout and retention ratios; then g = b × r gives r, and the 2024 earnings at r give the capital and so the face value.

---
item: q1ii
case: c1
qno: 1
part: (ii)
type: mcq
key: C
tags: fm.div.models
difficulty: medium
q: 2
a: 12
---
#### Question
What is the market price per share in 2025 under Walter’s Model?
#### Options
(A) ₹ 162.24
(B) ₹ 150.00
(C) ₹ 143.00
(D) ₹ 170.00
#### Answer
**(C) ₹ 143.00**

**Market Price per Share under Walter’s Model (2025)**

P = $\dfrac{D + \dfrac{r}{Ke}(E-D)}{Ke}$

Where:

E = 10.40

D = 6.24

r = 10%

Ke = 8%

$\dfrac{r}{Ke}$ = 1.25

E-D = 4.16

P = $\dfrac{6.24+(1.25 \times 4.16)}{0.08}$

P = ₹ 143.00
#### Approach
Take E and D per share from the existing payout and the r found from g = b × r, and put them into Walter's formula.

---
item: q1iii
case: c1
qno: 1
part: (iii)
type: mcq
key: C
tags: fm.div.models
difficulty: easy
q: 2
a: 12-13
---
#### Question
If the firm’s return on retained earnings (10%) is greater than its cost of equity (8%), what is the optimum dividend payout ratio and corresponding market price per share?
#### Options
(A) 60% payout; ₹ 143.00
(B) 40% payout; ₹ 150.00
(C) 0% payout; ₹ 162.50
(D) 100% payout; ₹ 130.00
#### Answer
**(C) 0% payout; ₹ 162.50**

**Optimum Dividend Policy and Optimum Price (Walter’s Model)**

When r > Ke, optimum dividend payout ratio = 0%

D = 0

P = $\dfrac{\dfrac{r}{Ke} \times E}{Ke}$

P = $\dfrac{1.25 \times 10.40}{0.08}$ = ₹ 162.50
#### Approach
Under Walter's model a growth firm (r > Ke) maximises its price by retaining everything; price it at that payout.

---
item: q1iv
case: c1
qno: 1
part: (iv)
type: mcq
key: C
tags: fm.div.models
difficulty: medium
q: 2-3
a: 13
---
#### Question
What is the capital employed at the beginning of 2026, growth rate and estimated earnings for 2026 if company continue the existing (traditional) dividend payout ratio in 2025?
#### Options
(A) ₹ 11,24,864; 4%; ₹ 1,12,486
(B) ₹ 11,89,760; 10%; ₹ 1,18,976
(C) ₹ 10,81,600; 4%; ₹ 1,08,160
(D) ₹ 11,24,864; 10%; ₹ 1,18,976
#### Answer
**(C) ₹ 10,81,600; 4%; ₹ 1,08,160**

| Year | Capital Employed in Beginning (₹) | Retained Earning for the year (₹) |
|---|---:|---:|
| 2024 | ₹ 10,00,000 | 1,00,000 x 40% = ₹ 40,000 |
| 2025 | 10,00,000 + 40,000 = ₹ 10,40,000 | 1,04,000 x 40% = ₹ 41,600 |
| 2026 | 10,40,000 + 41,600 = ₹ 10,81,600 | - |

Earnings 2026 = 10,81,600 x 10% = ₹ 1,08,160

Growth rate = 4%
#### Approach
Roll the capital forward year by year, adding each year's retained earnings, and earn r on the capital at the start of 2026.

---
item: q1v
case: c1
qno: 1
part: (v)
type: mcq
key: D
tags: fm.div.models
difficulty: medium
q: 3
a: 13
note: ICAI's answer prints "(1,04,00 × 100%)" for the 2025 earnings retained (₹ 1,04,000 in the case); kept as printed. ICAI's option (D) and the answer separate the three figures with commas where the other options use semicolons; kept as printed.
---
#### Question
What is the capital employed at the beginning of 2026, growth rate and estimated earnings for 2026 if company adopts optimum dividend payout ratio in 2025?
#### Options
(A) ₹ 11,24,864; 4%; ₹ 1,12,486
(B) ₹ 11,89,760; 10%; ₹ 1,18,976
(C) ₹ 10,40,000; 8%; ₹ 1,04,000
(D) ₹ 11,44,000, 10%, ₹ 1,14,400
#### Answer
**(D) ₹ 11,44,000, 10%, ₹ 1,14,400**

**Revised Growth rate under optimum dividend policy**

G = b × r

G = 100 × 10% ⇒ g = 10%

Capital employed (Beginning 2026) = 10,40,000 + (1,04,00 × 100%) = ₹ 11,44,000

Earnings 2026 = 11,44,000 x 10% = ₹ 1,14,400

---
item: q2
qno: 2
type: mcq
key: B
tags: fm.ratio.liquidity
difficulty: easy
q: 3
a: 13-14
note: ICAI's question prints "The current liabilities of the firm are 3,00,000" with no ₹; kept as printed.
---
#### Question
A firm’s current liabilities comprise bank credit and other liabilities in the ratio of 2 : 1. The current liabilities of the firm are 3,00,000 and the current ratio is also 2 : 1. The quick ratio is 1 : 1. Thus, the amount of bank credit and inventory of the firm would be :
#### Options
(A) ₹ 3,00,000 and ₹ 1,00,000
(B) ₹ 2,00,000 and ₹ 3,00,000
(C) ₹ 3,00,000 and ₹ 2,00,000
(D) ₹ 1,00,000 and ₹ 3,00,000
#### Answer
**(B) ₹ 2,00,000 and ₹ 3,00,000**

**Calculation of Current Assets**

Current Ratio = $\dfrac{\text{Current Assets}}{\text{Current Liabilities}}$

Current Assets = Current Ratio × Current Liabilities

= 2 × ₹ 3,00,000 = ₹ 6,00,000

**Calculation of Quick Assets**

Quick Ratio = $\dfrac{\text{Quick Assets}}{\text{Current Liabilities}}$

Quick Assets = Quick Ratio × Current Liabilities

= 1 × ₹ 3,00,000 = ₹ 3,00,000

**Inventory**

Inventory = Current Assets - Quick Assets

= ₹ 6,00,000 - ₹ 3,00,000 = ₹ 3,00,000

**Calculation of Bank Credit**

Bank Credit: Other Liabilities = 2:1

Total Current Liabilities = ₹ 3,00,000

Bank Credit = ₹ 3,00,000 × 2/3 = ₹ 2,00,000
#### Approach
Inventory is the gap between current assets and quick assets; bank credit is two-thirds of the current liabilities.

---
item: q3
qno: 3
type: mcq
key: B
tags: fm.ratio.liquidity
difficulty: easy
q: 3
a: 14
---
#### Question
The capital structure of JKL Limited consists of 12% debentures of ₹ 50 lakhs, 10% preference shares of ₹ 25 lakhs, 14% term loan of ₹ 15 lakhs and equity share capital of ₹ 48 lakhs. Its reserves & surpluses are ₹ 24 lakhs. What would be the capital-gearing ratio?
#### Options
(A) 1.04
(B) 1.25
(C) 1.33
(D) 1.56
#### Answer
**(B) 1.25**

**Capital Gearing Ratio**

= $\dfrac{\text{Pref. Share Capital + Debentures + Other Borrowed Funds}}{\text{Equity Share Capital + Reserves and Surplus − Losses}}$

= $\dfrac{₹ 25 \text{ lakhs} + ₹ 50 \text{ lakhs} + ₹ 15 \text{ lakhs}}{₹ 48 \text{ lakhs} + ₹ 24 \text{ lakhs}}$

= $\dfrac{₹ 90 \text{ lakhs}}{₹ 72 \text{ lakhs}}$ = 1.25
#### Approach
Capital gearing puts all fixed-charge funds (preference capital, debentures, term loan) over equity shareholders' funds.

---
item: q4
qno: 4
type: descriptive
tags: fm.ratio.prepare, fm.ratio.profit, fm.ratio.liquidity
difficulty: medium
q: 4
a: 14-16
---
#### Question
The following information pertains to P Limited for the year ended 31st March, 2025 :

| Particulars | Amount / Ratio |
|---|---:|
| Sales | ₹ 3,60,00,000 |
| Rate of Income Tax | 40% |
| Return on Net Worth | 30% |
| Share Capital to Reserves Ratio | 6 : 4 |
| Current Ratio | 2 : 1 |
| Percentage of Net Profit to Sales | 8% |
| Inventory Turnover (based on cost of goods sold) | 12 |
| Cost of goods sold | ₹ 1,44,00,000 |
| Sundry Debtors | ₹ 12,00,000 |
| Sundry Creditors | ₹ 16,00,000 |
| Interest on 14% debentures | ₹ 3,36,000 |

You are required to CALCULATE:

(i) Operating Expenses

(ii) Share Capital and Reserves

(iii) Closing Stock

(iv) Fixed Assets
#### Answer
**(i) Operating Expenses**

| Net Profit = 8% on Sales = 8% x ₹ 3,60,00,000 | ₹ 28,80,000 |
|---|---:|
| *Add:* Income Tax = 40% x ₹ 28,80,000/60% | ₹ 19,20,000 |
| Profit Before tax | ₹ 48,00,000 |
| *Add:* Debenture Interest | ₹ 3,36,000 |
| Profit before interest and tax | ₹ 51,36,000 |
| Sales | ₹ 3,60,00,000 |
| *Less:* | |
| Cost of goods sold ₹ 1,44,00,000<br>Profit before interest & tax ₹ 51,36,000 | ₹ 1,95,36,000 |
| Operating Expenses | ₹ 1,64,64,000 |

**(ii) Share Capital and Reserves**

Return on Net worth is 30%, hence profit after tax of ₹ 28,80,000 is equivalent to 30% of Net Worth.

Net worth x 30/100 = ₹ 28,80,000

Net Worth = 28,80,000 x 100/30 = ₹ 96,00,000

Ratio of Share Capital to Reserves = 6:4

Share Capital = ₹ 96,00,000 x 6/10 = ₹ 57,60,000

Reserves =₹ 96,00,000 x 4/10 = ₹ 38,40,000

**(iii) Closing Stock**

Inventory Turnover (based on cost of goods sold) = 12

Cost of goods sold = ₹ 1,44,00,000

Inventory Turnover Ratio = Cost of goods sold/Closing Stock = 12

12 = ₹ 1,44,00,000/Closing Stock

Therefore, Closing Stock = ₹ 1,44,00,000/12

= ₹ 12,00,000

**(iv) Fixed Assets**

Calculation of Total liabilities

Interest on 14 % Debentures = ₹ 3,36,000

Therefore debentures = $\dfrac{₹ 3{,}36{,}000 \text{ x } 100}{14\%}$

= ₹ 24,00,000

**Total of Liabilities Side**

| | |
|---|---:|
| Share Capital | ₹ 57,60,000 |
| Reserves | ₹ 38,40,000 |
| Debentures | ₹ 24,00,000 |
| Sundry Creditors | ₹ 16,00,000 |
| Total Liabilities | ₹ 1,36,00,000 |

Current Ratio = 2:1

Sundry Creditors = ₹ 16,00,000

$\dfrac{\text{Current Assets}}{\text{Current Liabilities}}$ = 2

$\dfrac{\text{Current Assets}}{\text{Sundry Creditors}}$ = 2

$\dfrac{\text{Current Assets}}{₹ 16{,}00{,}000}$ = 2

Current Assets = 2 x ₹ 16,00,000

= ₹ 32,00,000

Fixed Assets = Total Liabilities – Current Assets

= ₹ 1,36,00,000 - ₹ 32,00,000

= ₹ 1,04,00,000
#### Approach
Build the profit and loss account upwards from net profit to PBIT, and get operating expenses as the balancing figure of sales; then net worth from the return on net worth, and fixed assets as total liabilities less current assets.

---
item: q5
qno: 5
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: hard
q: 4-5
a: 16-19
---
#### Question
Zebra Dynamics Ltd., a diversified engineering firm, is currently undergoing a strategic review of its capital financing. The Board of Directors has set strict hurdles for new project approvals. The Chief Financial Officer (CFO) has stated that the company's Cost of Capital based on Book Value weights is currently 11%, while the Cost of Capital based on Market Value weights is exactly 150 basis points higher.

**Market Benchmarking Data**

To determine the cost of equity, the finance team has gathered data on two comparable peers, A Ltd. and B Ltd, which operate in the same economic environment. Their returns are driven by the Capital Asset Pricing Model (CAPM):

| Security | Beta | Expected CAPM Return |
|---|---:|---:|
| A Ltd. | 1.2 | 15.20% |
| B Ltd. | 0.8 | 12.80% |

Capital Structure:

- Book Value Terms: The company maintains a traditional balance sheet with an equal ratio of Equity and Debt.
- Market Value Terms: Due to market optimism, the company's equity trades at a premium. The Market Value of Equity is 3 times its Book Value, while the debt trades at par (Market Value of Debt equals Book Value).

**Debt Instrument Details**

The company’s debt capital is raised entirely through Debentures with the following characteristics:

- Coupon Rate: 7% per annum.
- Issue Details: The debentures were issued at a discount of ₹ 10 for ₹ 90.
- Redemption: They are redeemable at Par (₹ 100).
- Tenure: The debentures mature in 4 years.

You have been hired as a financial consultant to

(i) PROVIDE a detailed breakdown of the component costs.

(ii) CALCULATE the corporate tax rate applicable to the company assuming Discount on issue or premium on redemption are tax deductible.

(iii) CALCULATE the Beta of the company.
#### Answer
**(i) Let the cost of Equity be ‘X’ and Cost of Debt be ‘Y’**

**Calculation of WACC using Book value weights**

| Source of Capital | Cost of capital | Weights | WACC ($K_o$) |
|---|---:|---:|---:|
| | **(a)** | **(b)** | **(c) = (a)×(b)** |
| Equity Share Capital | X | 0.5 | 0.5X |
| Long term debts | Y | 0.5 | 0.5Y |
| | | | 11 |

**Calculation of WACC using market value weights**

| Source of Capital | Cost of capital | MV Weights | WACC ($K_o$) |
|---|---:|---:|---:|
| | **(a)** | **(b)** | **(c) = (a)×(b)** |
| Equity Share Capital | X | 3/4 = 0.75 | 0.75X |
| Long term debts | Y | 1/4 = 0.25 | 0.25Y |
| | | | 11+1.5 = 12.5 |

0.5X + 0.5Y = 11 …..(1)

0.75X + 0.25Y = 12.5 …..(2)

Equating 1 & 2

Ke (X) = 14%

Substituting X in Eqn. 1

0.5x14 + 0.5Y = 11

7 + 0.5Y = 11

Post tax Kd (Y)= 8%

**(ii)** Pre Tax Cost of Redeemable Debenture ($K_d$) = $\dfrac{I + \dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

Where,

I = Interest payment

NP = Net proceeds

RV = Redemption value of debentures

n = Remaining life of debentures

$k_d = \dfrac{7+\dfrac{(100-90)}{4}}{\dfrac{(100+90)}{2}}$

$k_d = \dfrac{7+2.5}{95}$

Pre Tax Kd = 10%

Post tax Kd = Pre tax Kd (1–T)

8% = 10%(1–T)

Tax rate (T) = 20%

**(iii) According to CAPM**

Cost of Equity ($K_e$)= $R_f$ + ß ($R_m$ − $R_f$)

Where,

$K_e$ = Cost of equity capital

$R_f$ = Risk free rate of return

ß = Beta coefficient

$R_m$ = Rate of return on market portfolio

($R_m$ – $R_f$) = Market risk premium

14% = 8% + ß x 6%

Beta coefficient = 1

**Working Note:**

A Ltd

15.20 = $R_f$ + 1.2Rp ……(1)

B Ltd

12.80 = $R_f$ + 0.8Rp ……(2)

By solving Eqn. 1 & 2,

Rp =6

So Risk Premium = 6%

Substituting Rp = 6 in Eqn 1

15.20 = $R_f$ + 1.2x6%

$R_f$ = 15.20 – 7.20 = 8%

Hence, Risk Free Return = 8%

Rp = $R_m$ – $R_f$

6 = $R_m$ – 8%

$R_m$ = 14%
#### Approach
Write the two WACC equations (book weights 50 : 50, market weights 75 : 25) and solve them for Ke and the post-tax Kd; the pre-tax Kd of the debenture then gives the tax rate, and the two peers' CAPM returns give Rf and the risk premium for the beta.

---
item: q6
qno: 6
type: descriptive
tags: fm.cs.theories
difficulty: medium
q: 6
a: 19-21
---
#### Question
The following data relate to two companies belonging to the same risk class:

| Particulars | A Ltd. | B Ltd. |
|---|---:|---:|
| Expected Net Operating Income | ₹ 18,00,000 | ₹ 18,00,000 |
| 12% Debt | ₹ 54,00,000 | - |
| Equity Capitalization Rate | ? | 18 |

Required:

(a) DETERMINE the total market value, equity capitalization rate and weighted average cost of capital for each company assuming no taxes as per M.M. Approach.

(b) DETERMINE the total market value, equity capitalization rate and weighted average cost of capital for each company assuming 40% taxes as per M.M. Approach.
#### Answer
**(a) Assuming no tax as per MM Approach.**

Calculation of Value of Firms ‘A Ltd.’ and ‘B Ltd’ according to MM Hypothesis

Market Value of ‘B Ltd’ [Unlevered(u)]

Total Value of Unlevered Firm ($V_u$) = [ NOI/$k_e$]

= 18,00,000/0.18

= ₹ 1,00,00,000

$K_e$ of Unlevered Firm (given) = 0.18

$K_o$ of Unlevered Firm (Same as above) = $k_e$ (as there is no debt)

= 0.18

Market Value of ‘A Ltd’ [Levered Firm (I)]

Total Value of Levered Firm ($V_L$) = $V_u$ + (Debt× Nil)

= ₹ 1,00,00,000 + (54,00,000 × nil)

= ₹ 1,00,00,000

**Computation of Equity Capitalization Rate and Weighted Average Cost of Capital (WACC)**

| | Particulars | A Ltd. | B Ltd. |
|---|---|---:|---:|
| A | Net Operating Income (NOI) | 18,00,000 | 18,00,000 |
| B | *Less:* Interest on Debt (I) | 6,48,000 | - |
| C | Earnings of Equity Shareholders (NI) | 11,52,000 | 18,00,000 |
| D | Overall Capitalization Rate ($k_o$) | 0.18 | 0.18 |
| E | Total Value of Firm (V = NOI/$k_o$) | 1,00,00,000 | 1,00,00,000 |
| F | *Less:* Market Value of Debt | 54,00,000 | - |
| G | Market Value of Equity (S) | 46,00,000 | 1,00,00,000 |
| H | Equity Capitalization Rate [$k_e$ = NI /S] | 0.2504 | 0.18 |
| I | Weighted Average Cost of Capital [WACC] ($k_o$) | 0.18 | 0.18 |

**Assuming 40% taxes as per MM Approach**

**Calculation of Value of Firms ‘A Ltd.’ and ‘B Ltd’ according to MM Hypothesis Approach**

Market Value of ‘B Ltd’ [Unlevered(u)]

Total Value of unlevered Firm ($V_u$) = [NOI (1 - t)/ke]

= 18,00,000(1 – 0.40)] / 0.18

= ₹ 60,00,000

$K_e$ of unlevered Firm (given) = 0.18

$K_o$ of unlevered Firm (Same as above = $k_e$ as there is no debt)

= 0.18

Market Value of ‘A Ltd’ [Levered Firm (I)]

Total Value of Levered Firm ($V_L$) = $V_u$ + (Debt× Tax)

= ₹ 60,00,000 + (54,00,000 × 0.40)

= ₹ 81,60,000

**Computation of Weighted Average Cost of Capital (WACC) of ‘B Ltd.’**

= 18% (i.e. $K_e$ = $K_o$)

**Computation of Equity Capitalization Rate and Weighted Average Cost of Capital (WACC) of A Ltd**

| Particulars | A Ltd. |
|---|---:|
| Net Operating Income (NOI) | 18,00,000 |
| *Less:* Interest on Debt (I) | 6,48,000 |
| Earnings Before Tax (EBT) | 11,52,000 |
| *Less:* Tax @ 40% | 4,60,800 |
| Earnings for equity shareholders (NI) | 6,91,200 |
| Total Value of Firm (V) as calculated above | 81,60,000 |
| *Less:* Market Value of Debt | 54,00,000 |
| Market Value of Equity (S) | 27,60,000 |
| Equity Capitalization Rate [$k_e$ = NI/S] | 0.2504 |
| Weighted Average Cost of Capital ($k_o$)\* | 13.23 |

\*Computation of WACC A Ltd.

| Component of Capital | Amount | Weight | Cost of Capital | WACC |
|---|---:|---:|---:|---:|
| Equity | 27,60,000 | 0.338 | 0.2504 | 0.0846 |
| Debt | 54,00,000 | 0.662 | 0.072\* | 0.0477 |
| Total | 81,60,000 | | | 0.1323 |

\*$K_d$= 12% (1- 0.4) = 12% × 0.6 = 7.2%

WACC = 13.23%
#### Approach
Value the unlevered B Ltd. first at its 18% equity rate; under MM the levered A Ltd. is worth the same without taxes and that value plus the tax shield on its debt (debt × tax rate) with taxes. Equity is the firm value less debt, and ke = earnings for equity ÷ equity value.

---
item: q7
qno: 7
type: descriptive
tags: fm.lev.leverage, fm.coc.wacc
difficulty: hard
q: 6-8
a: 21-23
note: ICAI's question says the company has a special tax-free status that exempts it from corporate income tax, and also prints "General corporate tax is 25%"; ICAI's answer charges no tax (EBT / PAT). Both kept as printed. ICAI's answer does not label requirements i. to vii.
---
#### Question
ABC Manufacturing Limited produces industrial components with a well-established market presence. The company operates under a special tax-free status granted by the government, which exempts it from corporate income tax obligations.

Financial Information

The company's financial parameters for the current fiscal year are as follows:

Capital Structure Details

- Total Capital Invested: ₹ 20,00,000 (₹ 20 lakhs)
- Cost of Equity (Ke): 12% per annum
- Cost of Debt (Kd): 6% per annum
- Weighted Average Cost of Capital (WACC): 9% per annum

Operational Information

- Annual Sales Revenue: ₹ 24,00,000 (₹ 24 lakhs)
- Variable Costs: 50% of sales revenue
- Fixed Costs: ₹ 10,00,000 (₹ 10 lakhs) per annum

General corporate tax is 25%

As a financial analyst, you have been tasked with conducting a comprehensive financial analysis of ABC Manufacturing Limited. Specifically, you are required to:

i. DETERMINE the optimal debt-equity composition that results in the given weighted average cost of capital of 9%.

ii. PREPARE a comprehensive Income Statement showing the company's profitability from operations through net income when the cost of debt is 6%, 10% & 12%.

iii. CALCULATE the Return on Investment (ROI) to assess how efficiently the company is utilizing its total capital invested.

iv. CALCULATE the Return on Equity (ROE) to evaluate the returns generated for equity shareholders.

v. FIND the different leverages in the following format

| Leverages | Computation | Dependent on | Indicates effect of \_\_\_\_ on |
|---|---|---|---|
| Leverages showing level of business risk | | | |
| Leverages showing level of finance risk | | | |
| Leverages showing level of combined risk | | | |

vi. EXPLAIN the concept of Leverage as a double edged sword by explaining the Leverage Effect when ROI > Kd, ROI = Kd, ROI < Kd.

vii. DERIVE ROE from ROI in the following format –

| Cost of debt = | 6% | 10% | 12% |
|---|---|---|---|
| Return on Investment % of Equity | | | |
| Surplus / Deficit from debt payments in % | | | |
| Surplus / Deficit from debt payments in INR | | | |
| Return on Equity in INR=ROI + Surplus – Deficit | | | |
| Return on Equity in % = Return on Equity in INR/Equity | | | |
#### Answer
**Optimal debt-equity composition**

Let the weight of equity be W

| Item | Cost | Weight | Product |
|---|---:|---:|---:|
| Equity | 12 | W | 12W |
| Debt | 6 | 1–W | 6 – 6W |
| | | **1** | **9%** |

9 = 12W + 6 – 6W

3 = 6W

W = 0.5.

So, Weight of Equity is 0.50

So, Weight of Debt is 1 – 0.50 = 0.50

Total Capital = 20 Lakhs. Hence, Debt and equity 10 Lakhs each.

**Income Statement**

| Cost of debt = | 6% | 10% | 12% |
|---|---:|---:|---:|
| Sales | 24,00,000 | 24,00,000 | 24,00,000 |
| *Less:* Variable Costs (50%) | 12,00,000 | 12,00,000 | 12,00,000 |
| Contribution | 12,00,000 | 12,00,000 | 12,00,000 |
| *Less:* Fixed Costs (Given) | 10,00,000 | 10,00,000 | 10,00,000 |
| EBIT | 2,00,000 | 2,00,000 | 2,00,000 |
| *Less:* Interest | 60,000 | 1,00,000 | 1,20,000 |
| EBT / PAT | 1,40,000 | 1,00,000 | 80,000 |
| Return on Investment = EBIT/ Capital employed | 10% | 10% | 10% |
| Return on equity = PAT / Equity Capital | 14% | 10% | 8% |

**Leverages showing level of different risk**

| Leverages showing level of | Leverages | Computation | Dependent on | Indicates effect of … on … |
|---|---|---|---|---|
| Business risk | Operating Leverage (DOL) | Contribution ÷ EBIT = 12,00,000 ÷ 2,00,000 = 6 | Fixed Operating Costs | Sales on EBIT |
| Financial Risk | Financial Leverage (DFL) | EBIT ÷ EBT = 2,00,000 ÷1,40,000 = 1.43 | Fixed Financial Costs | EBIT on EPS |
| Combined Risk | Combined Leverage (DCL) | Contribution ÷ EBT or DOL × DFL = 6 × 1.43 = 8.58 | Both Fixed Operating & Fixed Financial Costs | Sales on EPS |

Return on Investment = EBIT/ Capital employed

= 2,00,000/20,00,000 =10%

When the cost of ‘fixed cost fund’ is less than the return on investment, financial leverage will help to increase return on equity and EPS. The firm will also benefit from the saving of tax on interest on debts etc. However, when cost of debt will be more than the return it will affect return of equity and EPS unfavourably and as a result firm can be under financial distress. Therefore, financial leverage is also known as “**double edged sword**”.

Effect on EPS and ROE:

When, ROI (10%) > Interest (6%) – Favourable – Advantage

When, ROI (10%) < Interest (12%) – Unfavourable – Disadvantage

When, ROI (10%) = Interest (10%) – Neutral – Neither advantage nor disadvantage

**Income Statement**

| Cost of debt = | 6% | 10% | 12% |
|---|---:|---:|---:|
| Return on Investment = 10% of Equity | 1,00,000 | 1,00,000 | 1,00,000 |
| Surplus / Deficit from debt payments in % | 10 – 6 = 4% | 10 – 10 = 0 | 10 – 12 =- 2% |
| Surplus / Deficit from debt payments in INR = % of Debt | 40,000 | Nil | (20,000) |
| Return on Equity in INR = ROI + Surplus – Deficit | 1,40,000 | 1,00,000 | 80,000 |
| Return on Equity in % = Return on Equity in INR / Equity | 14% | 10% | 8% |
#### Approach
Solve 12W + 6(1 – W) = 9 for the weights, which fixes debt at ₹ 10 lakhs; then build one income statement per cost of debt and read ROI, ROE and the three leverages from it.

---
item: q8
qno: 8
type: descriptive
tags: fm.sources.other, fm.capbud.cashflows
difficulty: hard
q: 8-9
a: 23-25
note: ICAI's answer prints "2,50,000 Lakhs x 25%" (the annual depreciation is ₹ 2,50,000) and, in the question, "with the following informations"; kept as printed.
---
#### Question
EquipLease Financial Services Ltd. is a specialized equipment leasing company that has been operating in the industrial equipment financing space for over 15 years. The company's business model involves purchasing high-value machinery and leasing it to manufacturing companies, thereby earning returns through lease rentals while retaining ownership of the assets. The company has built a strong reputation for providing flexible financing solutions tailored to clients' cash flow patterns and business cycles. Their leasing arrangements help clients conserve capital while accessing state-of-the-art equipment.

EquipLease has recently purchased a specialized CNC precision machine with the following informations:

- **Purchase Cost:** ₹ 10,00,000 (paid upfront)
- **Expected Useful Life:** 4 years
- **Residual/Salvage Value:** Nil (technology becomes obsolete)
- **Depreciation for Tax Purposes:** Can be claimed by EquipLease under Straight line method (SLM) or Units of Production method(UOP)
- **Lease Rentals** earned by company is subject to tax.
- **EquipLease's Cost of Capital:** 10% per annum
- **Corporate Tax Rate:** 25%

TechManufacture Industries Ltd., a growing precision engineering company, has approached EquipLease expressing interest in leasing this CNC machine. TechManufacture has provided detailed information about their expected utilization pattern:

The machine's usage will follow a graduated ramp-up pattern based on TechManufacture's order book projections:

| Year | Production Capacity Utilization | Relative Units |
|---|---|---|
| 1 | Low (Initial phase) | 1 unit |
| 2 | Medium | 2 units |
| 3 | High | 3 units |
| 4 | Peak | 4 units |

This pattern is typical for businesses scaling up production with new equipment - starting slow as operators are trained and processes are optimized, then ramping up to full capacity. The Client wants the company to charge lease rentals based on the client's utilization pattern 1:2:3:4.

Mr. Vikram Malhotra, the Chief Credit Officer at EquipLease, is tasked with structuring an appropriate lease arrangement. He faces several strategic decisions:

i. HOW MUCH portion of the cost is recovered from tax savings on depreciation under both the methods viz. SLM & units of production method.

ii. FIND the portion of investment to be recovered from lease rentals under both the assumptions i.e. Depreciation under both the methods viz. SLM & units of production method.

iii. DETERMINE minimum lease rentals needed to recover the balance cost of investment after adjusting the Tax shields on the depreciation under both the depreciation methods if -

- EquipLease charge uniform (equal) rentals over 4 years
- Lease rentals follow the client's utilization pattern (1:2:3:4)
#### Answer
**Calculation of PV of Tax savings under Straight line method (SLM)**

| Particulars | Result |
|---|---|
| Annual Depreciation | 10 Lakhs / 4 Years = 2,50,000 |
| PV of Tax savings on above | 2,50,000 Lakhs x 25% x PVAF @ 10% i.e. 3.170 = 1,98,125 |

**Calculation of PV of Tax savings under Units of Production (UOP)**

| Year | Depreciation | Tax savings | PVF @ 10% | PV of Tax Savings |
|---|---:|---:|---:|---:|
| 1 | 1,00,000 | 25,000 | 0.909 | 22,725 |
| 2 | 2,00,000 | 50,000 | 0.826 | 41,300 |
| 3 | 3,00,000 | 75,000 | 0.751 | 56,325 |
| 4 | 4,00,000 | 1,00,000 | 0.683 | 68,300 |
| | | | | **1,88,650** |

Let lease rental of 1st year be X

**PV of after tax Lease rentals charged as per client's utilization pattern**

| Year | Lease rentals | After Tax Lease Rentals | PVF @ 10% | PV of Lease Rentals |
|---|---:|---:|---:|---:|
| 1 | X | 0.75X | 0.909 | 0.682X |
| 2 | 2X | 1.5X | 0.826 | 1.239X |
| 3 | 3X | 2.25X | 0.751 | 1.690X |
| 4 | 4X | 3X | 0.683 | 2.049X |
| | | | | **5.660X** |

**PV of after tax Lease rentals charged equally**

Let annual lease rental be X

X x (1 – 25%) x 3.17(PVAF @ 10%) = 2.378X

**Investment to be recovered from lease rentals**

| | In UOP Ratio | | Equally | |
|---|---:|---:|---:|---:|
| **Particulars** | **SLM** | **UOP** | **SLM** | **UOP** |
| Investment | 10,00,000 | 10,00,000 | 10,00,000 | 10,00,000 |
| PV of Tax savings on Depreciation | 1,98,125 | 1,88,650 | 1,98,125 | 1,88,650 |
| Investment to be recovered | 8,01,875 | 8,11,350 | 8,01,875 | 8,11,350 |
| PV of after-tax Lease rentals | 5.660X | 5.660X | 2.378X | 2.378X |
| Lease rentals = X | 1,41,674 | 1,43,348 | 3,37,206 | 3,41,190 |

**Statement Showing PV of yearly lease rentals when charged in UOP Ratio**

| Year | Particulars | SLM | UOP |
|---|---|---:|---:|
| | **Lease rentals = X** | **1,41,674** | **1,43,348** |
| 1 | 0.682X | 96,622 | 97,763 |
| 2 | 1.239X | 1,75,534 | 1,77,608 |
| 3 | 1.690X | 2,39,429 | 2,42,258 |
| 4 | 2.049X | 2,90,290 | 2,93,720 |
| | PV of Total after tax lease rental | **8,01,875** | **8,11,350** |

**Statement Showing PV of yearly lease rentals when charged Equally**

| Year | Particulars | SLM | UOP |
|---|---|---:|---:|
| | **Lease rentals = X** | 3,37,206 | 3,41,190 |
| 1 | 0.682X (0.909 x 0.75) | 2,29,974 | 2,32,692 |
| 2 | 0.620X (0.826 x 0.75) | 2,09,068 | 2,11,538 |
| 3 | 0.563X (0.751 x 0.75) | 1,89,847 | 1,92,090 |
| 4 | 0.512X (0.683 x 0.75) | 1,72,649 | 1,74,689 |
| | PV of Total after tax lease rental | **8,01,539\*** | **8,11,009\*** |

**\* Difference is due to rounding off in PVAF**
#### Approach
Find the present value of the depreciation tax shield under each method; the rest of the cost must come from the present value of the after-tax rentals, so write the rentals as X (equal) or X, 2X, 3X, 4X and solve for X.

---
item: q9
qno: 9
type: descriptive
tags: fm.wc.basics, fm.wc.estimate
difficulty: medium
q: 10
a: 25-27
note: ICAI's question says "for the year ending 31st March, 2025" while its table is headed "Balance as at 1st April, 20X6" and "Balance as at 31st March, 20X7"; ICAI's answer prints "₹ 70, 469" and "₹ 2, 23,845.42" with a space after the first comma. All kept as printed.
---
#### Question
Following information is forecasted by the Puja Limited for the year ending 31st March, 2025:

| | Balance as at 1st April, 20X6 | Balance as at 31st March, 20X7 |
|---|---:|---:|
| | **(₹)** | **(₹)** |
| Raw Material | 45,000 | 65,356 |
| Work-in-progress | 35,000 | 51,300 |
| Finished goods | 60,181 | 70,175 |
| Debtors | 1,12,123 | 1,35,000 |
| Creditors | 50,079 | 70,469 |
| Annual purchases of raw material (all credit) | | 4,00,000 |
| Annual cost of production | | 7,50,000 |
| Annual cost of goods sold | | 9,15,000 |
| Annual operating cost | | 9,50,000 |
| Annual sales (all credit) | | 11,00,000 |

You may take one year as equal to 365 days.

You are required to CALCULATE:

(i) Net operating cycle period.

(ii) Number of operating cycles in the year.

(iii) Amount of working capital requirement using operating cycles.
#### Answer
**Working Notes:**

**1. Raw Material Storage Period (R)**

= $\dfrac{\text{Average Stock of Raw Material}}{\text{Annual Consumption of Raw Material}} \times 365$

= $\dfrac{\dfrac{₹ 45{,}000 + ₹ 65{,}356}{2}}{₹ 3{,}79{,}644} \times 365$

= 53 days.

Annual Consumption of Raw Material

= Opening Stock +Purchases- Closing Stock

= ₹ 45,000 + ₹ 4,00,000 – ₹ 65,356

= ₹ 3,79,644

**2. Work-in-Progress (WIP) Conversion Period (W)**

WIP Conversion Period = $\dfrac{\text{Average Stock of WIP}}{\text{Annual Cost of Production}} \times 365$

= $\dfrac{\dfrac{₹ 35{,}000+₹ 51{,}300}{2}}{₹ 7{,}50{,}000} \times 365$

= 21 days

**3. Finished Stock Storage Period (F)**

= $\dfrac{\text{Average Stock of Finished Goods}}{\text{Cost of Goods Sold}} \times 365$

= $\dfrac{₹ 65{,}178}{₹ 9{,}15{,}000} \times 365$ = 26 days.

Average Stock = $\dfrac{₹ 60{,}181+ ₹ 70{,}175}{2}$

= ₹ 65,178.

**4. Debtors Collection Period (D)**

= $\dfrac{\text{Average Debtors}}{\text{Annual Credit Sales}} \times 365$

= $\dfrac{₹ 1{,}23{,}561.50}{₹ 11{,}00{,}000} \times 365$

= 41 days

Average debtors = $\dfrac{₹ 1{,}12{,}123+ ₹ 1{,}35{,}000}{2}$ = ₹1,23,561.50

**5. Creditors Payment Period (C)**

= $\dfrac{\text{Average Creditors}}{\text{Annual Net Credit Purchases}} \times 365$

= $\dfrac{\left(\dfrac{₹ 50{,}079+ ₹ 70{,}\ 469}{2}\right)}{₹ 4{,}00{,}000} \times 365$

= 55 days

**(i) Operating Cycle Period**

= R + W + F+ D - C

= 53 + 21 + 26 + 41 - 55

= 86 days

**(ii) Number of Operating Cycles in the Year**

= $\dfrac{365}{\text{Operating Cycle Period}} = \dfrac{365}{86}$ = 4.244

**(iii) Amount of Working Capital Required**

= $\dfrac{\text{Annual Operating Cost}}{\text{Number of Operating Cycles}} = \dfrac{₹ 9{,}50{,}000}{4.244}$ = ₹ 2, 23,845.42
#### Approach
Find each period (raw material, WIP, finished goods, debtors, creditors) as average balance ÷ its annual flow × 365, net off the creditors' period, then divide the annual operating cost by the number of cycles.

---
item: q10a
qno: 10
part: (a)
type: descriptive
tags: fm.sources.modern, fm.sources.other
difficulty: easy
q: 10
a: 27-28
---
#### Question
DISCUSS the features of international funding and angel financing in the context of corporate financing.
#### Answer
**International Funding:** With liberalization and globalization a business enterprise has options to raise capital from International markets also. Foreign Direct Investment (FDI) and Foreign Institutional Investors (FII) are two major routes for raising funds from foreign sources besides ADR’s (American depository receipts) and GDR’s (Global depository receipts). Obviously, the mechanism of procurement of funds has to be modified in the light of the requirements of foreign investors.

**Angel Financing:** Angel Financing is a form of an equity-financing where an angel investor is a wealthy individual who provides capital for start-up or expansion, in exchange for an ownership/equity in the company. Typically, angels, as they are known as, will invest around 25 to 60 per cent to help a company get started. This source of finance sometimes is the last option for startups which doesn’t qualify for bank funding and are too small for venture capital financing.

---
item: q10b
qno: 10
part: (b)
type: descriptive
tags: fm.wc.cash
difficulty: easy
q: 11
a: 28-29
---
#### Question
“The treasury department of a business concern has evolved its importance over the years from being responsible for only cash handling issues to technical areas revolving around hedging forex risks and composition of capital structure.” In the light of this statement, EXPLAIN briefly the fundamental tasks for which treasury department is responsible.
#### Answer
**The fundamental tasks for which treasury department of any enterprise is responsible are:**

1\. **Cash Management:** It involves efficient cash collection process and managing payment of cash both inside the organisation and to third parties.

Treasury will also manage surplus funds in an investment portfolio. Investment policy will consider future needs for liquid funds and acceptable levels of risk as determined by company policy.

2\. **Currency Management:** The treasury department manages the foreign currency risk exposure of the company. In a large multinational company (MNC) the first step will usually be to set off intra-group indebtedness. The use of matching receipts and payments in the same currency will save transaction costs and also will save the organization from any unfavorable exchange movements.

The treasury will manage any net exchange exposures in accordance with company policy. If risks are to be minimized then forward contracts can be used either to buy or sell currency forward.

3\. **Fund Management:** Treasury department is responsible for planning and sourcing the company’s short, medium and long-term cash needs. They also facilitate temporary investment of surplus funds by mapping the time gap between funds inflow and outflow.

4\. **Banking:** It is important that a company maintains a good relationship with its bankers. Treasury department carry out negotiations with bankers with respect to interest rates, foreign exchange rates etc. and act as the initial point of contact with them.

5\. **Corporate Finance:** Treasury department is involved with both acquisition and divestment activities within the group. In addition, it will often have responsibility for investor relations.

---
item: q10c
qno: 10
part: (c)
type: descriptive
tags: fm.capbud.irr
difficulty: easy
q: 11
a: 29
---
#### Question
STATE the acceptance rule under Internal Rate of Return (IRR) method of capital budgeting.
#### Answer
**Acceptance Rule of IRR method.**

The use of IRR, as a criterion to accept capital investment decision involves a comparison of IRR with the required rate of return known as cut-off rate.

| | |
|---|---|
| If IRR ≥ Cut-off Rate or WACC | Accept the Proposal |
| If IRR < Cut-off Rate or WACC | Reject the Proposal |
