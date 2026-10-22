<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-mtp-nov2022-s2
paper: p8
kind: mtp
attempt: nov2022
series: s2
qfile: old/p8/mtp-nov2022-s2-q.pdf
afile: old/p8/mtp-nov2022-s2-a.pdf
choice: q1; any 4 of q2-q6
q: 1
status: checked
by: tx-49
date: 2026-10-20
accept: 2000, 2022, 2000000, 2000000, 20800000
note: Old-scheme Paper 8A (Financial Management) of ICAI's Mock Test Paper 2, Test Series: October 2022 (for the November 2022 attempt): questions from the question paper (pp.1-4), answers from ICAI's Suggested Answers/ Hints (pp.1-10); Paper 8B Economics for Finance (question paper pp.5-6, answers from p.11) is not part of PassBook. Instructions: p.1 of the question paper (the 8A title, the medium note, the choice lines, time and marks), which give choice: q1; any 4 of q2-q6 (8A carries 60 marks: Q1 20 + four of Q2-Q6 at 10 each); minutes: is left out (ICAI's 3 hours cover 8A and 8B), as in o-p8-mtp-nov2023-s1. Not transcribed: the header lines of both PDFs ("Test Series: October 2022", "MOCK TEST PAPER - 2", "INTERMEDIATE: GROUP – II", "PAPER – 8: FINANCIAL MANAGEMENT & ECONOMICS FOR FINANCE"; the answers' "8A : FINANCIAL MANAGEMENT" and "SUGGESTED ANSWERS/ HINTS"). Marks: ICAI prints them in square brackets ("[4 × 5 Marks = 20 Marks]" after Q1(d) for Q1 (a)-(d), "[10 Marks]" for Q2-Q4, "[8 Marks]", "[2 Marks]", "[4 Marks]"), which check.py does not read; every item's marks: are ICAI's printed figures. Item model: Q1's lead-in "Answer the following:" is the shared stem of its four 5-mark items (case c1); Q2, Q3 and Q4 each carry one marks note and one connected answer, so each is one item (Q4's requirements (a) and (b) stay inside it, with ICAI's bold (a) and (b) labels kept in its answer); Q5(a) 8 marks and Q5(b) 2 marks are separate items; Q6(c) has an OR alternative (q6c-or, marks: none, see its note). Tags: every item is tagged to the current Paper 6A sub-topics; Q4 is flagged out of syllabus for its sensitivity analysis (see its note); seed capital assistance (Q5(b)), commercial paper (Q6(b)), the profitability index (Q6(c)) and the cut-off rate (OR) are in the January 2027 Study Material. Repaired extraction damage only, read from the rendered pages: stacked fractions written in KaTeX in the text and with a slash in table cells ("2,08,00,000 x 4/52", "13.56 (1.1)/158.2 =9.43%"; the 14% debentures' cost, whose numerator and denominator are sums, in KaTeX), subscripts (K_e, E_1, P_0) in KaTeX, the stacked "33 1/3 %" of Q2 as a KaTeX fraction; Rupee-font characters that the text layer carries but the page does not show ("400P" in Q1(a)'s cost table, "(₹)[" in Q2's EBIT table, "A ₹m" in Q4's sensitivity table) are left out, and the equation editor's "No.of sharesoutstanding" (Q5(a)) is written as the page shows it. Kept as printed: "₹100perunit" (Q1(a)); "Less:Preference dividend(120 lakhs@15%)" (Q1(d) answer); "35%.He" (Q2); "lncome statement" with a lower-case L (Q3); "3.6048.PV" (Q4); "₹ 1,00 each" (Q5(a)); in Q2's answer "10% + (1-0.25)" for the cost of the 10% long term debt, "= 10.5 + 1 / 10.5", "8000(1-0.25)/1,00,00 = 6%", "Alternate II" beside "Alternative I" and "Nil."; "50.00.000" (Q3, step 6); "[or Contribution per unit x1,50,000 units)" (Q4, row 6); the second combined-leverage line "Contribution/EBT = ₹ 20,60,000/₹13,29,032" (Q5(a)); "security charge" and no full stop after "thereafter" (Q5(b)); "cut - off" (OR answer). check.py: the numbers accepted are (1) the header lines above, not transcribed: 2 (MOCK TEST PAPER - 2), 8 (PAPER – 8 and the answers' 8A) and 2022 (Test Series: October 2022) on p.1 of each PDF; (2) figures inside equation-editor fractions that the text layer prints with spaces inside the grouping, so check.py reads them in pieces: "2, 08, 00, 000" in Q1(a)'s WIP formula (answers p.1: pieces 2, 8, 0, 0 against 2,08,00,000) and "₹20, 00,000" and "₹ 20,00, 000" in Q2's equity share capital formulas (answers p.3: pieces 20, 0, 2,000, 0 against 20,00,000 twice).
---
#### Instructions
**PAPER 8A: FINANCIAL MANAGEMENT**

*Answers are to be given only in English except in the case of the candidates who have opted for Hindi medium. If a candidate has not opted for Hindi medium his/ her answers in Hindi will not be valued.*

*Question No. **1** is compulsory.*

*Attempt any **four** questions from the remaining **five** questions.*

*Working notes should form part of the answer.*

**Time Allowed – 3 Hours (Total time for 8A and 8B)**

**Maximum Marks – 60**

---
case: c1
qno: 1
q: 1
---
#### Case
Answer the following:

---
item: q1a
case: c1
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.wc.estimate
difficulty: medium
q: 1
a: 1
---
#### Question
PREPARE a working capital estimate to finance an activity level of 52,000 units a year (52 weeks) based on the following data:

Raw Materials - ₹ 400 per unit

Direct Wages - ₹ 150 per unit

Overheads (Manufacturing) - ₹200 per unit

Overheads (Selling & Distribution) - ₹100perunit

Selling Price - ₹ 1,000 per unit, Raw materials & Finished Goods remain in stock for 4 weeks, Work in process takes 4 weeks. Debtors are allowed 8 weeks for payment whereas creditors allow us 4 weeks.

Minimum cash balance expected is ₹50,000. Receivables are valued at Selling Price.
#### Answer
| Cost Structure for 52000 units | |
|---|---:|
| **Particulars** | **Amount (₹)** |
| Raw Material @ ₹ 400 | 2,08,00,000 |
| Direct Wages @ ₹ 150 | 78,00,000 |
| Manufacturing Overheads@ ₹ 200 | 1,04,00,000 |
| Selling and Distribution OH@ ₹ 100 | 52,00,000 |
| Total Cost | 4,42,00,000 |
| Sales@₹1000 | 5,20,00,000 |

| Particulars | Calculation | Amount (₹) |
|---|---|---:|
| **A. Current Assets:** | | |
| Raw Material Stock | 2,08,00,000 x 4/52 | 16,00,000 |
| Work in Progress (WIP) Stock | 2,08,00,000 + (78,00,000 + 1,04,00,000)/2 x 4/52 | 23,00,000 |
| Finished Goods Stock | 4,42,00,000 x 4/52 | 34,00,000 |
| Receivables | 5,20,00,000 x 8/52 | 80,00,000 |
| Cash | | 50,000 |
| | Total Current Assets | 1,53,50,000 |
| **B. Current Liabilities:** | | |
| Creditors | 20800000 x 4/52 | 16,00,000 |
| C. **Working Capital Estimates(A-B)** | | 1,37,50,000 |
#### Approach
Cost each current asset at the right base (raw material at material cost, WIP at material plus half the conversion cost, finished goods at total cost, debtors at selling price), then deduct creditors.

---
item: q1b
case: c1
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.lev.leverage, fm.cs.ebiteps
difficulty: hard
q: 1
a: 1-2
---
#### Question
Axar Ltd. has a Sales of ₹ 68,00,000 with a Variable cost Ratio of 60%.

The company has fixed cost of ₹16,32,000. The capital of the company comprises of 12% long term debt, ₹1,00,000 Preference Shares of ₹ 10 each carrying dividend rate of 10% and 1,50,000 equity shares.

The tax rate applicable for the company is 30%.

At current sales level, DETERMINE the Interest, EPS and amount of debt for the firm if a 25% decline in Sales will wipe out all the EPS.
#### Answer
Break Even Sales = ₹ 6800000×0.75 = ₹ 51,00,000

**Income Statement** (Amount in ₹)

| | Original | Calculation of Interest at BEP (backward calculation) | Now at present level |
|---|---:|---:|---:|
| Sales | 68,00,000 | 51,00,000 | 68,00,000 |
| Less: Variable Cost | 40,80,000 | 30,60,000 | 40,80,000 |
| Contribution | 27,20,000 | 20,40,000 | 27,20,000 |
| Less: Fixed Cost | 16,32,000 | 16,32,000 | 16,32,000 |
| EBIT | 10,88,000 | 4,08,000 | 10,88,000 |
| Less: Interest (EBIT-PBT) | ? | **3,93,714** | **3,93,714** |
| PBT | ? | 14,286(10,000/70%) | 6,94,286 |
| Less: Tax @ 30%(or PBT-PAT) | ? | 4,286 | 2,08,286 |
| PAT | ? | 10,000(Nil+10,000) | 4,86,000 |
| Less: Preference Dividend | 10,000 | 10,000 | 10,000 |
| Earnings for Equity share holders | ? | **Nil (at BEP)** | 4,76,000 |
| Number of Equity Shares | 1,50,000 | 1,50,000 | 1,50,000 |
| EPS | ? | - | 3.1733 |

So Interest=₹3,93,714, EPS=₹3.1733, Amount of debt=3,93,714/12%=₹ 32,80,950
#### Approach
A 25% fall in sales that wipes out EPS puts the firm at its financial break-even: work backwards from that level, where profit after tax just covers the preference dividend, to find the interest.

---
item: q1c
case: c1
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.wc.receivables
difficulty: medium
q: 1-2
a: 2
---
#### Question
Avesh Pvt. Ltd. is considering relaxing its present credit policy for accounts receivable and is in the process of evaluating two proposed policies. Currently, the company has annual credit sales of ₹ 55 lakhs and accounts receivable turnover ratio of 5 times a year. The current level of loss due to bad debts is ₹ 2,00,000. The company is required to give a return of 15% on the investment in new accounts receivable. The company’s variable costs are 75% of the selling price. Given the following information, IDENTIFY which is the better policy?

**(Amount in ₹)**

| Particulars | Present Policy | Proposed Policy 1 | Proposed Policy 2 |
|---|---:|---:|---:|
| Annual credit sales | 55,00,000 | 65,00,000 | 70,00,000 |
| Accounts receivable turnover ratio | 5 times | 4 times | 3 times |
| Bad debt losses | 2,00,000 | 3,50,000 | 5,00,000 |
#### Answer
**Statement showing the Evaluation of Accounts Receivable Policies**

(Amount in ₹)

| | Particulars | Present Policy | Proposed Policy 1 | Proposed Policy 2 |
|---|---|---:|---:|---:|
| A | Expected Profit: | | | |
| | (a) Credit Sales | 55,00,000 | 65,00,000 | 70,00,000 |
| | (b) Total Cost other than Bad Debts: | | | |
| | (i) Variable Costs (75%) | 41,25,000 | 48,75,000 | 52,50,000 |
| | (c) Bad Debts | 2,00,000 | 3,50,000 | 5,00,000 |
| | (d) Expected Profit [(a) – (b) – (c)] | 11,75,000 | 12,75,000 | 12,50,000 |
| B | Opportunity Cost of Investments in Accounts Receivable (Working Note) | 1,23,750 | 1,82,813 | 2,62,500 |
| C | Net Benefits (A – B) | 10,51,250 | 10,92,187 | 9,87,500 |

**Recommendation**: The Proposed Policy 1 should be adopted since the net benefits under this policy are higher as compared to other policies.

**Working Note:**

Calculation of Opportunity Cost of Average Investments

Opportunity Cost = Total Cost × Collection period/12 × Rate of Return/100

Present Policy = ₹ 41,25,000 × 2.4/12 × 15% = ₹1,23,750

Proposed Policy 1 = ₹ 48,75,000× 3/12 × 15% = ₹ 1,82,813

Proposed Policy 2 = ₹ 52,50,000× 4/12 × 15% = ₹ 2,62,500
#### Approach
For each policy, compare the profit on its sales after bad debts with the cost of carrying its receivables, valued at variable cost for the collection period the turnover ratio implies.

---
item: q1d
case: c1
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: easy
q: 2
a: 2-3
---
#### Question
The annual report of XYZ Ltd. provides the following information for the Financial Year 2019-20:

| Particulars | Amount (₹) |
|---|---:|
| Net Profit | 78 lakhs |
| Outstanding 15% preference shares | 120 lakhs |
| No. of equity shares | 6 lakhs |
| Return on Investment | 20% |
| Cost of capital i.e. ($K_e$) | 16% |

CALCULATE price per share using Gordon’s Model when dividend pay-out is-

(i) 30%;

(ii) 50%;

(iii) 100%.
#### Answer
Price per share according to Gordon’s Model is calculated as follows:

| Particulars | Amount in ₹ |
|---|---:|
| Net Profit | 78 lakhs |
| Less:Preference dividend(120 lakhs@15%) | 18 lakhs |
| Earnings for equity shareholders | 60 lakhs |
| Earnings Per Share | 60 lakhs/6 lakhs = ₹ 10.00 |

Price per share according to Gordon’s Model is calculated as follows:

$P_0 = \dfrac{E_1(1-b)}{K_e - br}$

Here, $E_1$ = 10, $K_e$ = 16%

(i) When dividend pay-out is 30%

$P_0 = \dfrac{10 \times 0.30}{0.16-(0.70 \times 0.2)} = \dfrac{3}{0.16-0.14}$ = ₹150

(ii) When dividend pay-out is 50%

$P_0 = \dfrac{10 \times 0.5}{0.16-(0.5 \times 0.2)} = \dfrac{5}{0.16-0.10}$ = ₹83.33

(iii) When dividend pay-out is 100%

$P_0 = \dfrac{10 \times 1}{0.16-(0 \times 0.2)} = \dfrac{10}{0.16}$ =₹ 62.5
#### Approach
Find EPS after the preference dividend, then apply Gordon's formula with the retention ratio b = 1 − pay-out and r = the return on investment.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.cs.ebiteps, fm.coc.wacc, fm.lev.leverage
difficulty: hard
q: 2-3
a: 3-6
---
#### Question
The financial advisor of Sun Ltd is confronted with following two alternative financing plans for raising ₹ 10 lakhs that is needed for plant expansion and modernization

**Alternative I:** Issue 80% of funds with 14% Debenture [Face value (FV) ₹ 100] at par and redeem at a premium of 10% after 10 years and balance by issuing equity shares at 33$\dfrac{1}{3}$ % premium.

**Alternative II:** Raise 10% of funds required by issuing 8% Irredeemable Debentures [Face value (FV) ₹ 100] at par and the remaining by issuing equity shares at current market price of ₹125.

Currently, the firm has an Earnings per share (EPS) of ₹ 21

The modernization and expansion programme is expected to increase the firm’s Earnings before Interest and Taxation (EBIT) by ₹ 200,000 annually.

The firm’s condensed Balance Sheet for the current year is given below:

**Balance Sheet as on 31.3.2022**

| Liabilities | Amount (₹) | Assets | Amount (₹) |
|---|---:|---|---:|
| Current Liabilities | 5,00,000 | Current Assets | 16,00,000 |
| 10% Long Term Loan | 15,00,000 | Plant & Equipment (Net) | 34,00,000 |
| Reserves & Surplus | 10,00,000 | | |
| Equity Share Capital (FV: ₹ 100 each) | 20,00,000 | | |
| TOTAL | 50,00,000 | TOTAL | 50,00,000 |

However, the finance advisor is concerned about the effect that issuing of debt might have on the firm. The average debt ratio for firms in industry is 35%.He believes if this ratio is exceeded, the P/E ratio of the company will be 7 because of the potentially greater risk.

If the firm increases its equity capital by more than 10 %, he expects the P/E ratio of the company will increase to 8.5 irrespective of the debt ratio.

Assume Tax Rate of 25%. Assume target dividend pay-out under each alternative to be 60% for the next year and growth rate to be 10% for the purpose of calculating Cost of Equity

SUGGEST with reason which alternative is better on the basis of each of the below given criteria:

I. Earnings per share (EPS) & Market Price per share (MPS)

II. Financial Leverage

III. Weighted Average Cost of Capital & Marginal Cost of Capital (using Book Value weights)
#### Answer
**Calculation of Equity Share capital and Reserves and surplus**:

Alternative 1:

Equity Share capital = $\text{₹}20{,}00{,}000 + \dfrac{\text{₹}2{,}00{,}000 \text{ x } 100}{133.3333}$ =₹21,50,000

Reserves= $\text{₹}10{,}00{,}000 + \dfrac{\text{₹}2{,}00{,}000 \text{ x } 33.3333}{133.3333}$ =₹10,50,000

Alternative 2:

Equity Share capital = $\text{₹ }20{,}00{,}000 + \dfrac{\text{₹ }9{,}00{,}000\text{x}100}{125}$ =₹27,20,000

Reserves= $\text{₹}10{,}00{,}000 + \dfrac{\text{₹ }9{,}00{,}000 \text{ x}25}{125}$ =₹11,80,000

**Capital Structure Plans**

Amount in ₹

| Capital | Alternative 1 | Alternative 2 |
|---|---:|---:|
| Equity Share capital | 21,50,000 | 27,20,000 |
| Reserves and surplus | 10,50,000 | 11,80,000 |
| 10% long term debt | 15,00,000 | 15,00,000 |
| 14% Debentures | 8,00,000 | - |
| 8% Irredeemable Debentures | - | 1,00,000 |
| Total Capital Employed | 55,00,000 | 55,00,000 |

**Computation of Present Earnings before interest and tax (EBIT)**

| | |
|---|---:|
| EPS (₹) | 21 |
| No. of equity shares | 20,000 |
| Earnings for equity shareholders (I x II) (₹) | 4,20,000 |
| Profit Before Tax (III/75%) (₹) | 5,60,000 |
| Interest on long term loan (1500000 x 10%) (₹) | 1,50,000 |
| EBIT (IV + V) (₹) | 7,10,000 |

EBIT after expansion = ₹7,10,000 +₹ 2,00,000 = ₹9,10,000

**Evaluation of Financial Plans on the basis of EPS, MPS and Financial Leverage**

Amount in ₹

| Particulars | Alternative I | Alternate II |
|---|---:|---:|
| EBIT | 9,10,000 | 9,10,000 |
| Less: Interest: 10% on long term loan | (1,50,000) | (1,50,000) |
| 14% on Debentures | (1,12,000) | Nil |
| 8% on Irredeemable Debentures | Nil. | (8000) |
| PBT | 6,48,000 | 7,52,000 |
| Less: Tax @25% | (1,62,000) | (1,88,000) |
| PAT | 4,86,000 | 5,64,000 |
| No. of equity shares | 21,500 | 27,200 |
| **EPS** | **22.60** | **20.74** |
| Applicable P/E ratio (Working Note 1) | 7 | 8.5 |
| **MPS (EPS X P/E ratio)** | **158.2** | **176.29** |
| **Financial Leverage EBIT/PBT** | **1.40** | **1.21** |

**Working Note 1**

| | Alternative I | Alternative II |
|---|---:|---:|
| Debt: | | |
| ₹15,00,000 +₹8,00,000 | 23,00,000 | - |
| ₹15,00,000 +₹1,00,000 | - | 16,00,000 |
| Total capital Employed (₹) | 55,00,000 | 55,00,000 |
| Debt Ratio (Debt/Capital employed) | =0.4182 | =0.2909 |
| | **=41.82%** | =29.09% |
| Change in Equity: ₹21,50,000-₹20,00,000 | 1,50,000 | |
| ₹27,20,000-₹20,00,000 | | 7,20,000 |
| Percentage change in equity | 7.5% | **36%** |
| Applicable P/E ratio | **7** | **8.5** |

**Calculation of Cost of equity and various type of debt**

| | Alternative I | Alternative II |
|---|---|---|
| **A) Cost of equity** | | |
| EPS | 22.60 | 20.74 |
| DPS (EPS X 60%) | 13.56 | 12.44 |
| Growth (g) | 10% | 10% |
| Po (MPS) | 158.2 | 176.29 |
| Ke= Do (1 + g)/ Po | 13.56 (1.1)/158.2 =9.43% | 12.44 (1.1)/176.29 =7.76% |
| **B) Cost of Debt:** | | |
| 10% long term debt | 10% + (1-0.25) = 7.5% | 10% +(1-0.25) = 7.5% |
| 14% redeemable debentures | $\dfrac{14(1-0.25) + (110-100/10)}{110+100/2}$ = 10.5 + 1 / 10.5 = 10.95% | nil |
| 8% irredeemable debenture | NA | 8000(1-0.25)/1,00,00 = 6% |

**Calculation of Weighted Average cost of capital (WACC)**

| | Alternative 1 | | | Alternative 2 | | |
|---|---:|---:|---:|---:|---:|---:|
| **Capital** | **Weights** | **Cost (%)** | **WACC** | **Weights** | **Cost (%)** | **WACC** |
| Equity Share Capital | 0.3909 | 9.43 | 3.69% | 0.4945 | 7.76 | 3.84% |
| Reserves and Surplus | 0.1909 | 9.43 | 1.80% | 0.2145 | 7.76 | 1.66% |
| 10% Long term Debt | 0.2727 | 7.50 | 2.05% | 0.2727 | 7.50 | 2.05% |
| 14% Debenture | 0.1455 | 10.95 | 1.59% | | | |
| 8% Irredeemable Debentures | - | | | 0.0182 | 6 | 0.11% |
| | | | **9.12%** | | | **7.66%** |

**Calculation Marginal Cost of Capital (MACC)**

| | Alternative 1 | | | Alternative 2 | | |
|---|---:|---:|---:|---:|---:|---:|
| **Capital** | **Amount(weight)** | **Cost (%)** | **MACC** | **Amount (weight)** | **Cost (%)** | **MACC** |
| Equity Share Capital | ₹ 1,50,000(0.15) | 9.43 | 1.41% | ₹7,20,000(0.72) | 7.76 | 5.59% |
| Reserves and Surplus | ₹ 50,000(0.05) | 9.43 | 0.47% | ₹1,80,000(0.18) | 7.76 | 1.40% |
| 14% Debenture | ₹ 8,00,000(0.80) | 10.95 | 8.76% | - | | 0.00% |
| 8% Irredeemable Debentures | - | | | ₹1,00,000(0.10) | 6 | 0.60% |
| Total Capital Employed | ₹10,00,000 | | **10.65%** | ₹10,00,000 | | **7.58%** |

**Summary of solution:**

| | Alternate I | Alternate II |
|---|---:|---:|
| Earning per share (EPS) | 22.60 | 20.74 |
| Market price per share (MPS) | 158.20 | 176.29 |
| Financial leverage | 1.4043 | 1.2101 |
| Weighted Average cost of capital (WACC) | 9.12% | 7.66% |
| Marginal cost of capital (MACC) | 10.65% | 7.58% |

Alternative 1 of financing will be preferred under the criteria of EPS, whereas Alternative II of financing will be preferred under the criteria of MPS, Financial leverage, WACC and marginal cost of capital.
#### Approach
First rebuild each plan's capital structure (shares issued and premium), then compute EPS, the P/E that the debt-ratio and equity-increase conditions allow, financial leverage, and the costs of capital on book-value weights.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.ratio.prepare
difficulty: medium
q: 3
a: 6-7
---
#### Question
From the following information and ratios, PREPARE the Balance sheet as at 31st March 2022 and lncome statement for the year ended on that date for M/s Ganguly & Co -

| | |
|---|---:|
| Average Stock | ₹10 lakh |
| Current Ratio | 3:1 |
| Acid Test Ratio | 1:1 |
| PBIT to PBT | 2.2:1 |
| Average Collection period (Assume 360 days in a year) | 30 days |
| Stock Turnover Ratio (Use sales as turnover) | 5 times |
| Fixed assets turnover ratio | 0.8 times |
| Working Capital | ₹10 lakh |
| Net profit Ratio | 10% |
| Gross profit Ratio | 40% |
| Operating expenses (excluding interest) | ₹ 9 lakh |
| Long term loan interest | 12% |
| Tax | Nil |
#### Answer
1. Current Ratio = 3:1

   Current Assets (CA)/Current Liability (CL) = 3:1

   CA = 3CL

   WC = 10,00,000

   CA – CL = 10,00,000

   3CL – CL = 10,00,000

   2CL = 10,00,000

   CL = $\dfrac{10{,}00{,}000}{2}$

   **CL = ₹5,00,000**

   CA = 3 x 5,00,000

   **CA = ₹15,00,000**

2. Acid Test Ratio = CA – Stock / CL = 1:1

   = $\dfrac{15{,}00{,}000 \text{ - Stock}}{5{,}00{,}000}$ = 1

   15,00,000 – stock = 5,00,000

   **Stock = ₹10,00,000**

3. Stock Turnover ratio (on sales) = 5

   $\dfrac{\text{Sales}}{\text{Avg stock}}$ = 5

   $\dfrac{\text{Sales}}{10{,}00{,}000}$ = 5

   **Sales = ₹50,00,000**

4. **Gross Profit** = 50,00,000 x 40% = **₹20,00,000**

   **Net profit** (PBT) = 50,00,000 x 10% = **₹5,00,000**

5. PBIT/PBT = 2.2

   PBIT = 2.2 x 5,00,000

   PBIT= 11,00,000

   **Interest** = 11,00,000 – 5,00,000 = **₹6,00,000**

   **Long term loan** = $\dfrac{6{,}00{,}000}{0.12}$ = **₹50,00,000**

6. Average collection period = 30 days

   Receivables = $\dfrac{30}{360}$ x 50.00.000 = 4,16,667

7. Fixed Assets Turnover Ratio = 0.8

   50,00,000/ Fixed Assets = 0.8

   Fixed Assets = **₹62,50,000**

**Income Statement**

| | Amount (₹) |
|---|---:|
| Sales | 50,00,000 |
| Less: Cost of Goods Sold | 30,00,000 |
| Gross Profit | 20,00,000 |
| Less: Operating Expenses | 9,00,000 |
| Less: Interest. | 6,00,000 |
| Net Profit | 5,00,000 |

**Balance sheet**

| Liabilities | Amount (₹) | Assets | | Amount (₹) |
|---|---:|---|---:|---:|
| Equity share capital | 22,50,000 | Fixed asset | | 62,50,000 |
| Long term debt | 50,00,000 | Current assets: | | |
| Current liability | 5,00,000 | Stock | 10,00,000 | |
| | | Receivables | 4,16,667 | |
| | | Other | 83,333 | 15,00,000 |
| | 77,50,000 | | | 77,50,000 |
#### Approach
Chain the ratios: current ratio and working capital give current assets and liabilities, the acid-test ratio gives stock, stock turnover gives sales, and the profit ratios, PBIT to PBT and the interest rate give interest and the loan.

---
item: q4
qno: 4
marks: 10
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
oos: yes
difficulty: hard
q: 3
a: 7-8
note: Out of syllabus (old scheme): requirement (b), the sensitivity of the NPV to a 10% fall in selling price, a 10% rise in variable cost and a 10% rise in the cost of plant, is Risk Analysis in Capital Budgeting, which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material (as o-p8-mtp-nov2023-s2 q4 and o-p8-pyq-nov2023 q5a). Requirement (a), the NPV decision, is in syllabus: the tags name it. ICAI prints one [10 Marks] for both requirements, so the item is not split.
---
#### Question
The initial investment outlay for a capital investment project consists of ₹ 150 lacs for Plant & machinery and ₹ 60 lacs for Working Capital. Other details are summarized below:

Sales – 1.5 lakh units of output per year for years 1 to 5

Selling Price - 120 per unit of output

Variable cost - 60 per unit of output

Fixed overheads (excluding depreciation) - 22.5 lakhs per year for years 1 to 5

Salvage value of Plant & machinery Equal to the Written Down Value (WDV) at the end of year 5

Tax rate 40%

Time horizon 5 years

Post tax cut off rate 12%. PVAF (12%,5 Years) is 3.6048.PV @12% 5th year is 0.5674.

Rate of depreciation 20% on the Straight-Line Method (SLM)

Required:

(a) INDICATE the financial viability of the project by calculating the NPV

(b) DETERMINE the sensitivity of the project’s NPV under each of the following conditions:

(i) Decrease in selling price by 10%

(ii) Increase in variable cost by 10%

(iii) Increase in cost of Plant & machinery by 10%
#### Answer
**(a)** **Calculation of Cash Flow After Tax (CFAT) in original scenario**

| Sr. No. | Particulars | |
|---|---|---:|
| 1 | Sales units | 1,50,000 |
| | | (₹) |
| 2 | Sale Price p.u. | 120 |
| 3 | Sales | 1,80,00,000 |
| 4 | Variable Cost p.u. | 60 |
| 5 | Variable Cost | 90,00,000 |
| 6 | Contribution (3-4) | 90,00,000 |
| 7 | Fixed OH (Excluding Depreciation) | 22,50,000 |
| 8 | Depreciation | 30,00,000 |
| 9 | EBIT or PBT (6-7-8) | 37,50,000 |
| 10 | Tax@40% | 15,00,000 |
| 11 | Profit After Tax (PAT) | 22,50,000 |
| 12 | Add: Depreciation | 30,00,000 |
| 13 | CFAT | 52,50,000 |

**Calculation of NPV in original Scenario**

| Years | Particulars | Cash Flows | PVF | PV |
|---:|---|---:|---:|---:|
| 0 | Initial Investment | (1,50,00,000) | 1 | (1,50,00,000) |
| 0 | Initial WC introduced | (60,00,000) | 1 | (60,00,000) |
| 1 to 5 | CFAT | 52,50,000 | 3.6048 | 189,25,075 |
| 5 | WC released | 60,00,000 | 0.5674 | 34,04,561 |
| | NPV | | | 13,29,636 |

Since the NPV of the project is Positive the project is viable.

**(b)** **Sensitivity Analysis of the project under various conditions**

| Sr. No. | Particulars | (i)Selling Price reduced by 10% | (ii)Variable Cost increased by 10% | (iii)Plant &Machinery cost increased by 10% |
|---|---|---:|---:|---:|
| 1 | Sales units | 1,50,000 | 1,50,000 | 1,50,000 |
| | | ₹ | ₹ | ₹ |
| 2 | Sale Price p.u. | 108 | 120 | 120 |
| 3 | Sales | 162,00,000 | 180,00,000 | 180,00,000 |
| 4 | Variable Cost p.u. | 60 | 66 | 60 |
| 5 | Variable Cost | 90,00,000 | 99,00,000 | 90,00,000 |
| 6 | Contribution (3-4) [or Contribution per unit x1,50,000 units) | 72,00,000 | 81,00,000 | 90,00,000 |
| 7 | Fixed OH (Excluding Depreciation) | 22,50,000 | 22,50,000 | 22,50,000 |
| 8 | Depreciation | 30,00,000 | 30,00,000 | 33,00,000 |
| 9 | EBIT or PBT (6-7-8) | 19,50,000 | 28,50,000 | 34,50,000 |
| 10 | Tax | 7,80,000 | 11,40,000 | 13,80,000 |
| 11 | PAT | 11,70,000 | 17,10,000 | 20,70,000 |
| 12 | Add: Depreciation | 30,00,000 | 30,00,000 | 33,00,000 |
| 13 | CFAT | 41,70,000 | 47,10,000 | 53,70,000 |
| 14 | PV of CFAT (CFAT x3.6048) | 150,31,917 | 169,78,496 | 193,57,648 |
| 15 | WC released (60,00,000 x0.5674) | 34,04,561 | 34,04,561 | 34,04,561 |
| 16 | Initial Investment | (1,50,00,000) | (1,50,00,000) | (1,50,00,000) |
| 17 | Initial WC introduced | (60,00,000) | (60,00,000) | (60,00,000) |
| 18 | NPV (14+15-16-17) | (25,63,522) | (6,16,943) | 2,62,209 |
| 19 | % Change in NPV [Based on original NPV (13,29,636)] | -292.80% | -146.40% | -80.28% |

From the above calculations it can be seen that change in selling price is most sensitive and has the maximum effect on the NPV.
#### Approach
Build the yearly CFAT (depreciation on cost by SLM), discount it with the annuity factor and add the working capital released in year 5; repeat with each variable changed by 10% and compare the NPVs.

---
item: q5a
qno: 5
part: (a)
marks: 8
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 3-4
a: 9
---
#### Question
The following information is related to Navya Company Ltd. for the year ended 31st March 2022:

| | |
|---|---:|
| Equity share capital (₹ 10 each) | ₹ 65,50,000 |
| 12% Bonds of ₹ 1,00 each | ₹ 60,91,400 |
| Sales | ₹ 111 lakhs |
| Fixed cost (excluding interest) | ₹ 7,15,000 |
| Financial leverage | 1.55 |
| Profit-volume Ratio | 25% |
| Income Tax Applicable | 30% |

You are required to CALCULATE:

(i) Operating Leverage.

(ii) Combined leverage; and

(iii) Earnings per share.

Show calculations upto two decimal points.
#### Answer
**Income Statement**

| Particulars | Amount (₹) |
|---|---:|
| Sales | 1,11,00,000 |
| Contribution (Sales × P/V ratio) | 27,75,000 |
| Less: Fixed cost (excluding Interest) | (7,15,000) |
| EBIT (Earnings before interest and tax) | 20,60,000 |
| Less: Interest on debentures (12% × ₹ 60,91,400) | (7,30,968) |
| EBT (Earnings before tax) | 13,29,032 |
| Less: Tax @ 30% | 3,98,710 |
| PAT (Profit after tax) | 9,30,322 |

(i) Operating Leverage:

= $\dfrac{\text{Contribution}}{\text{EBIT}} = \dfrac{\text{₹}27{,}75{,}000}{\text{₹}20{,}60{,}000}$ = 1.35

(ii) Combined Leverage:

= Operating Leverage × Financial Leverage

= 1.35 × 1.55 = 2.09 (Approx)

**Or,**

Combined Leverage = $\dfrac{\text{Contribution}}{\text{EBIT}} \times \dfrac{\text{EBIT}}{\text{EBT}}$

Combined Leverage = $\dfrac{\text{Contribution}}{\text{EBT}} = \dfrac{\text{₹ }20{,}60{,}000}{\text{₹}13{,}29{,}032}$ = 2.09 (Approx)

(iii) Earnings per share (EPS):

= $\dfrac{\text{PAT}}{\text{No.of shares outstanding}} = \dfrac{\text{₹ }9{,}30{,}322}{6{,}55{,}000 \text{ equity shares}}$ = ₹ 1.42
#### Approach
Build the income statement from sales and the P/V ratio down to PAT, then read each leverage and EPS off it.

---
item: q5b
qno: 5
part: (b)
marks: 2
type: descriptive
tags: fm.sources.other
difficulty: easy
q: 4
a: 9
---
#### Question
Write a short note on seed capital assistance.
#### Answer
**Seed Capital Assistance**: The seed capital assistance has been designed by IDBI for professionally or technically qualified entrepreneurs. All the projects eligible for financial assistance from IDBI, directly or indirectly through refinance are eligible under the scheme. The project cost should not exceed ₹ 2 crores and the maximum assistance under the project will be restricted to 50% of the required promoter’s contribution or ₹ 15 lacs whichever is lower.

The seed capital assistance is interest free but carries a security charge of one percent per annum for the first five years and an increasing rate thereafter

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.capbud.irr, fm.capbud.npv
difficulty: easy
q: 4
a: 9-10
---
#### Question
DISTINGUISH between Net Present Value and Internal Rate of Return.
#### Answer
**NPV versus IRR**: NPV and IRR methods differ in the sense that the results regarding the choice of an asset under certain circumstances are mutually contradictory under two methods. In case of mutually exclusive investment projects, in certain situations, they may give contradictory results such that if the NPV method finds one proposal acceptable, IRR favours another. The different rankings given by the NPV and IRR methods could be due to size disparity problem, time disparity problem and unequal expected lives.

The net present value is expressed in financial values whereas internal rate of return (IRR) is expressed in percentage terms.

In the net present value cash flows are assumed to be re-invested at cost of capital rate. In IRR reinvestment is assumed to be made at IRR rates.
#### Approach
Compare the two methods on how they express the result, what reinvestment rate they assume, and why they can rank mutually exclusive projects differently.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.sources.short
difficulty: easy
q: 4
a: 10
---
#### Question
EXPLAIN in brief the features of Commercial Papers.
#### Answer
**Commercial Paper**: A Commercial Paper is an unsecured money market instrument issued in the form of a promissory note. The Reserve Bank of India introduced the commercial paper scheme in the year 1989 with a view to enabling highly rated corporate borrowers to diversify their sources of short- term borrowings and to provide an additional instrument to investors. Subsequently, in addition to the Corporate, Primary Dealers and All India Financial Institutions have also been allowed to issue Commercial Papers. Commercial papers are issued in denominations of ₹ 5 lakhs or multiples thereof and the interest rate is generally linked to the yield on the one-year government bond.

All eligible issuers are required to get the credit rating from Credit Rating Information Services of India Ltd, (CRISIL), or the Investment Information and Credit Rating Agency of India Ltd (ICRA) or the Credit Analysis and Research Ltd (CARE) or the FITCH Ratings India Pvt. Ltd or any such other credit rating agency as is specified by the Reserve Bank of India.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.capbud.npv
difficulty: easy
q: 4
a: 10
---
#### Question
What do you UNDERSTAND by desirability factor/profitability index?
#### Answer
**Desirability Factor/Profitability Index**

In certain cases, we have to compare a number of proposals each involving different amount of cash inflows. One of the methods of comparing such proposals is to work out what is known as the ‘Desirability factor’ or ‘Profitability index’. In general terms, a project is acceptable if its profitability index value is greater than 1.

Mathematically, the desirability factor is calculated as below:

$\dfrac{\text{Sum of Discounted Cash inflows}}{\text{Initial Cash outlay or Total Discounted Cash outflow (as the case may be)}}$

---
item: q6c-or
alt: q6c
qno: 6
part: (c)
marks: none
type: descriptive
tags: fm.capbud.irr, fm.coc.wacc
difficulty: easy
q: 4
a: 10
note: ICAI prints this OR alternative to Q6(c) [2 Marks] with no marks of its own (question paper p.4; the answers print none either, and label it "(c)" again). Its marks are not inferred.
---
#### Question
WRITE a short note on “Cut-off Rate”.
#### Answer
**Cut-off Rate**: It is the minimum rate which the management wishes to have from any project. Usually this is based upon the cost of capital. The management gains only if a project gives return of more than the cut - off rate. Therefore, the cut - off rate can be used as the discount rate or the opportunity cost rate.
