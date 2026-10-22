<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p6-rtp-sep2026
paper: p6
section: fm
kind: rtp
attempt: sep2026
qfile: new/p6/rtp-sep2026-qa.pdf
afile: new/p6/rtp-sep2026-qa.pdf
status: checked
by: tx-21
date: 2026-10-20
accept: 1, 2026, 2026, 2026, 2026, 2026, 2026
note: Paper 6A (Financial Management) part of ICAI's RTP for September 2026 (questions pp.1-10, Suggested Answers/Hints pp.10-27 of the per-paper file; the 6B half, pp.28-42, is n-p6-rtp-sep2026.sm.md, so check.py's uncited pages 28-39 are SM pages). ICAI prints no marks, as every RTP. ICAI's chapter headings in the 6A questions ("Case Scenarios", "Ratio", "Leverage", "Dividend decision", "Capital Budgeting Decision", "Working Capital Management", "Miscellaneous") and in the answers ("SUGGESTED ANSWERS/HINTS", "Division A: Case Scenario") are headings, not question text, and are not transcribed. Q1 is a case with five MCQs (q1i-q1v); Q2 and Q3 are single MCQs; Q4-Q9 are one descriptive item each (ICAI answers each as one connected solution); Q10 has three parts. ICAI's own text and figures kept as printed: "answer the following the questions" (Q1); the total "46,00,000" of the WACC table in Q1(ii)'s answer (the capital employed is 46,00,00,000); "(C) 13% Solution:" (Q1(iii) answer); Q2's answer line "(b) ROCE = EBIT / Total Capital Employed"; Q3's answer, which uses the cost of goods sold ₹ 12,60,000 without deriving it; "(All sales are on credit)" set as a line of the Q4 data list; "10,00,0000" in the IRR working for Machine I (Q7 answer); "Advise to the Management" and "Advise:" (Q7 answer); the effective cost "16.09*%" in Q8(i) against "16.08% (or 15.44%)" in Q8(ii); "₹ 160,00,000" (Q8 answer); "Total outflows 2 to 6)" and the unconverted "400,000" style figures of the second table (Q9 answer); "reach at its full potentials" (Q10(a) answer); "the later one" (Q10(b) answer). Stacked fractions are written in KaTeX with ICAI's figures; the subscripts of D₁ and P₀ in the Q1(i) answer are kept as the text prints them ("D1", "P0" in the formula). check.py: the numbers accepted are the paper title on p.1 ("PAPER – 6: FINANCIAL MANAGEMENT AND STRATEGIC MANAGEMENT", "6A: FINANCIAL MANAGEMENT": 6, 6), not transcribed; the running foot "SEPTEMBER 2026 EXAMINATION" of the even pages (2, 4, ..., 26), which check.py's running-head filter misses because the odd pages print it with the page number on the same line (2026, up to six times per page group); and the question number 1, which check.py expects in Q1's answer, where ICAI prints only the heading "Division A: Case Scenario" and the labels (i)-(v).
---

---
case: c1
qno: 1
q: 1-2
---
#### Case
AURO Engineering Pvt. Ltd. is engaged in the manufacturing of industrial machinery and heavy engineering equipment used in infrastructure, automobile, and renewable-energy projects. Over the last few years, the company has achieved stable growth in revenues and profitability due to increasing demand from domestic and export markets. The management is presently evaluating its long-term financing strategy in view of its proposed expansion into high-capacity precision engineering equipment.

The General Manager - Finance of the company CA Jenisha K informed the Board of Directors that the company has been maintaining a balanced capital structure consisting of equity shares, preference shares, and long-term debentures. However, with the proposed expansion plans, the company is considering additional debt financing to take advantage of financial leverage and tax benefits associated with debt capital.

As on 31st March, 2026, the company had the following capital structure at book values:

| Particulars | Amount (₹) |
|---|---:|
| Equity Share Capital (1,00,00,000 shares) | 30,00,00,000 |
| 11.5% Preference Shares | 6,00,00,000 |
| 10% Debentures | 10,00,00,000 |
| Total Capital Employed | 46,00,00,000 |

The equity shares of the company are currently quoted at ₹ 300 per share in the stock market. The company expects to pay a dividend of ₹ 15 per equity share next year, and the dividend is expected to grow at a constant rate of 5% per annum indefinitely. The applicable corporate tax rate for the company is 35%.

The management is now considering raising additional debt of ₹ 5,00,00,000 by issuing 12% debentures. The Finance Director expects that the proposed increase in financial leverage may improve shareholders’ returns in the short run. As a result of the revised financing plan, the expected dividend per share is estimated to increase to ₹ 20 per share, while the dividend growth rate is expected to remain unchanged at 5% per annum. However, due to increased financial risk arising from higher leverage, the market price of the company’s equity shares is expected to decline to ₹ 250 per share.

The Board of Directors has requested the finance team to evaluate the impact of the proposed financing decision on the company’s overall cost of capital and advise whether the revised capital structure would be financially beneficial for the company.

You are required to answer the following the questions:

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: B
tags: fm.coc.equity
difficulty: easy
q: 2
a: 10
---
#### Question
What will be the Cost of Equity (Ke) under the existing capital structure?
#### Options
(A) 9%
(B) 10%
(C) 10.25%
(D) 11%
#### Answer
**(B) 10%**

Using Dividend Growth Model:

Ke = $\dfrac{D1}{P0}$ + g

Where:

- D₁ = ₹ 15
- P₀ = ₹ 300
- g = 5%

Ke = $\dfrac{15}{300}$ +0.05

= 0.05 + 0.05

= 10%

---
item: q1ii
case: c1
qno: 1
part: (ii)
type: mcq
key: B
tags: fm.coc.wacc, fm.coc.debt
difficulty: medium
q: 2-3
a: 10-11
---
#### Question
What will be the existing Weighted Average Cost of Capital (WACC) of the company?
#### Options
(A) 9.12%
(B) 9.43%
(C) 9.85%
(D) 10.20%
#### Answer
**(B) 9.43%**

**Cost of Preference Shares**

Kp = 11.5/100 = 11.5%

**After-tax Cost of Debentures**

Kd = 10% (1 - 0.35) = 6.5%

**WACC Computation**

| Source | Amount (₹) | Weight (W) | Cost (C) | Weighted Cost (W x C) |
|---|---:|---:|---:|---:|
| Equity Shares | 30,00,00,000 | 0.6522 | 10% | 6.52% |
| Preference Shares | 6,00,00,000 | 0.1304 | 11.5% | 1.50% |
| Debentures | 10,00,00,000 | 0.2174 | 6.5% | 1.41% |
| Total | 46,00,000 | 1.0000 | | 9.43% |
#### Approach
Weight each source by its book value; preference capital costs its dividend rate and debentures their interest rate net of tax.

---
item: q1iii
case: c1
qno: 1
part: (iii)
type: mcq
key: C
tags: fm.coc.equity
difficulty: easy
q: 3
a: 11
---
#### Question
What will be the revised Cost of Equity (Ke) after raising additional debt?
#### Options
(A) 11%
(B) 12%
(C) 13%
(D) 14%
#### Answer
**(C) 13% Solution:**

Using Dividend Growth Model:

Ke = $\dfrac{20}{250}$ +0.05

= 0.08 + 0.05

= 13%

---
item: q1iv
case: c1
qno: 1
part: (iv)
type: mcq
key: C
tags: fm.coc.debt
difficulty: easy
q: 3
a: 11
---
#### Question
What will be the after-tax cost of the newly issued debentures?
#### Options
(A) 6.80%
(B) 7.20%
(C) 7.80%
(D) 8.40%
#### Answer
**(C) 7.80%**

Kd = 12% (1 − 0.35)

= 7.8%

---
item: q1v
case: c1
qno: 1
part: (v)
type: mcq
key: C
tags: fm.coc.wacc, fm.cs.planning
difficulty: medium
q: 3
a: 11-12
---
#### Question
What will be the revised Weighted Average Cost of Capital (WACC) after the proposed debt financing?
#### Options
(A) 10.12%
(B) 10.48%
(C) 11.04%
(D) 11.62%
#### Answer
**(C) 11.04%**

**Revised Capital Structure**

| Particulars | Amount (₹) |
|---|---:|
| Equity Share Capital | 30,00,00,000 |
| Preference Shares | 6,00,00,000 |
| Existing Debentures | 10,00,00,000 |
| New Debentures | 5,00,00,000 |
| Total Capital | 51,00,00,000 |

**Revised WACC Computation**

| Source | Weight (W) | Cost (C) | Weighted Cost (W x C) |
|---|---:|---:|---:|
| Equity Shares | 0.5882 | 13% | 7.65% |
| Preference Shares | 0.1176 | 11.5% | 1.35% |
| Existing Debentures | 0.1961 | 6.5% | 1.27% |
| New Debentures | 0.0981 | 7.8% | 0.77% |
| Total | 1.0000 | | 11.04% |
#### Approach
Re-weight on the enlarged capital base and use the revised cost of equity for the whole of the equity, with each debenture issue at its own after-tax cost.

---
item: q2
qno: 2
type: mcq
key: B
tags: fm.lev.leverage, fm.ratio.profit
difficulty: medium
q: 3
a: 12
---
#### Question
Total Assets & Current liabilities of the Manju Limited are 50 lakhs & 10 lakhs respectively. ROCE is 15%, measure of business operating risk is at 3.5 & P/V ratio is 70%. Calculate Sales.
#### Options
(A) 21 lakhs
(B) 30 lakhs
(C) 37.50 lakhs
(D) 40 lakhs
#### Answer
**(B) ROCE = EBIT / Total Capital Employed**

Total Capital Employed = Total Assets – Current Liabilities

= 50 lakhs – 10 lakhs

= 40 lakhs

EBIT = 40 lakhs x 15%

= 6 lakhs

Now, OL of 3.5 = Contribution / EBIT

Therefore Contribution = 6 Lakhs X 3.5 = 21 lakhs

Sales = Contribution/PV Ratio=21 lakhs/0.7=30 lakhs
#### Approach
The "measure of business operating risk" is the operating leverage; work from capital employed to EBIT, then to contribution and sales.

---
item: q3
qno: 3
type: mcq
key: A
tags: fm.ratio.activity
difficulty: easy
q: 4
a: 12
---
#### Question
MT Ltd.’s opening stock was ₹ 3,20,000 and the closing stock was ₹ 4,80,000. Sales during the year were ₹ 18,00,000 and the gross profit ratio was 30% on sales. Average accounts payable are ₹ 1,20,000.

Creditors Turnover Ratio = ?
#### Options
(A) 11.83
(B) 13.75
(C) 14.00
(D) 15.50
#### Answer
**(A) 11.83**

Creditors Turnover Ratio = Purchases / Average Accounts Payable

Cost of Goods Sold = Opening Stock+ Purchases - Closing Stock

Purchases = ₹ 12,60,000 + ₹ 4,80,000 − ₹ 3,20,000

Purchases = ₹ 14,20,000

Average Accounts Payable = ₹ 1,20,000

Creditors Turnover Ratio = Purchases/Average Accounts Payable

Creditors Turnover Ratio = ₹ 14,20,000 / ₹ 1,20,000

Creditors Turnover Ratio = 11.833

Therefore, the Creditors Turnover Ratio is 11.833.
#### Approach
Get the cost of goods sold from sales and the gross profit ratio, then the purchases from the stock movement.

---
item: q4
qno: 4
type: descriptive
tags: fm.ratio.prepare
difficulty: hard
q: 4-5
a: 13-15
---
#### Question
The following information of ASD Ltd. relate to the year ended 31st March, 2026:

| | |
|---|---|
| Net profit | 8% of sales |
| Raw materials consumed | 20% of Cost of Goods Sold |
| Direct wages | 10% of Cost of Goods Sold |
| Stock of raw materials | 3 months’ usage |
| Stock of finished goods | 6% of Cost of Goods Sold |
| Gross Profit | 15% of Sales |
| Debt collection period | 2 Months |
| (All sales are on credit) | |
| Current ratio | 2 : 1 |
| Fixed assets to Current assets | 13 : 11 |
| Fixed assets to sales | 1 : 3 |
| Long-term loans to Current liabilities | 2 : 1 |
| Capital to Reserves and Surplus | 1 : 4 |

You are required to PREPARE-

(a) Profit & Loss Statement of ASD Limited for the year ended 31st March, 2026 in the following format.

| Particulars | (₹) | Particulars | (₹) |
|---|---:|---|---:|
| To Direct Materials consumed | ? | By Sales | ? |
| To Direct Wages | ? | | |
| To Works (Overhead) | ? | | |
| To Gross Profit c/d | ? | | |
| | ? | | ? |
| To Selling and Distribution Expenses | ? | By Gross Profit b/d | ? |
| To Net Profit | ? | | |
| | ? | | ? |

(b) Balance Sheet as on 31st March, 2026 in the following format.

| Liabilities | (₹) | Assets | (₹) |
|---|---:|---|---:|
| Share Capital | ? | Fixed Assets | 1,30,00,000 |
| Reserves and Surplus | ? | Current Assets: | |
| Long term loans | ? | Stock of Raw Material | ? |
| Current liabilities | ? | Stock of Finished Goods | ? |
| | | Debtors | ? |
| | | Cash | ? |
| | ? | | ? |
#### Answer
**Working Notes:**

(i) Calculation of Sales

$\dfrac{\text{Fixed Assets}}{\text{Sales}} = \dfrac{1}{3}$

$\therefore \dfrac{1{,}30{,}00{,}000}{\text{Sales}} = \dfrac{1}{3} \Rightarrow$ Sales = ₹ 3,90,00,000

(ii) Calculation of Current Assets

$\dfrac{\text{Fixed Assets}}{\text{Current Assets}} = \dfrac{13}{11}$

$\therefore \dfrac{1{,}30{,}00{,}000}{\text{Current Assets}} = \dfrac{13}{11} \Rightarrow$ Current Assets = ₹ 1,10,00,000

(iii) Calculation of Raw Material Consumption and Direct Wages

| | ₹ |
|---|---:|
| Sales | 3,90,00,000 |
| *Less:* Gross Profit (15 % of Sales) | 58,50,000 |
| Cost of Goods sold | 3,31,50,000 |

Raw Material Consumption (20% of Cost of Goods Sold) ₹ 66,30,000

Direct Wages (10% of Cost of Goods Sold) ₹ 33,15,000

(iv) Calculation of Stock of Raw Materials (= 3 months usage)

= 66,30,000 × $\dfrac{3}{12}$ = ₹ 16,57,500

(v) Calculation of Stock of Finished Goods (= 6% of Cost of Goods Sold)

= 3,31,50,000 × $\dfrac{6}{100}$ = ₹ 19,89,000

(vi) Calculation of Current Liabilities

$\dfrac{\text{Current Assets}}{\text{Current Liabilities}} = 2$

$\dfrac{1{,}10{,}00{,}000}{\text{Current Liabilities}} = 2 \Rightarrow$ Current Liabilities = ₹ 55,00,000

(vii) Calculation of Debtors

Average collection period = $\dfrac{\text{Debtors}}{\text{Credit Sales}}$ × 12 months

$\dfrac{\text{Debtors}}{3{,}90{,}00{,}000}$ × 12 = 2 ⇒Debtors = ₹ 65,00,000

(viii) Calculation of Long-term Loan

$\dfrac{\text{Long term Loan}}{\text{Current Liabilities}} = \dfrac{2}{1}$

$\dfrac{\text{Long term loan}}{55{,}00{,}000} = \dfrac{2}{1} \Rightarrow$ Long term loan = ₹ 1,10,00,000

(ix) Calculation of Cash Balance

| | | ₹ |
|---|---:|---:|
| Current assets | | 1,10,00,000 |
| *Less:* Debtors | 65,00,000 | |
| Raw materials stock | 16,57,500 | |
| Finished goods stock | 19,89,000 | 1,01,46,500 |
| Cash balance | | 8,53,500 |

(x) Calculation of Net worth

| | | |
|---|---:|---:|
| Fixed Assets | | 1,30,00,000 |
| Current Assets | | 1,10,00,000 |
| Total Assets | | 2,40,00,000 |
| *Less:* Long term Loan | 1,10,00,000 | |
| Current Liabilities | 55,00,000 | 1,65,00,000 |
| Net worth | | 75,00,000 |

Net worth = Share capital + Reserves = ₹ 75,00,000

$\dfrac{\text{Capital}}{\text{Reserves and Surplus}} = \dfrac{1}{4} \Rightarrow$ Share Capital = ₹ 75,00,000 × $\dfrac{1}{5}$

= ₹ 15,00,000

Reserves and Surplus = ₹ 75,00,000 × $\dfrac{4}{5}$ = ₹ 60,00,000

**Profit and Loss Statement of ASD Ltd.**

**for the year ended 31st March, 2026**

| Particulars | (₹) | Particulars | (₹) |
|---|---:|---|---:|
| To Direct Materials consumed | 66,30,000 | By Sales | 3,90,00,000 |
| To Direct Wages | 33,15,000 | | |
| To Works (Overhead) (Bal. fig.) | 2,32,05,000 | | |
| To Gross Profit c/d (15% of Sales) | 58,50,000 | | |
| | 3,90,00,000 | | 3,90,00,000 |
| To Selling and Distribution Expenses (Bal. fig.) | 27,30,000 | By Gross Profit b/d | 58,50,000 |
| To Net Profit (8% of Sales) | 31,20,000 | | |
| | **58,50,000** | | **58,50,000** |

**Balance Sheet of ASD Ltd. as at 31st March, 2026**

| Liabilities | (₹) | Assets | (₹) |
|---|---:|---|---:|
| Share Capital | 15,00,000 | Fixed Assets | 1,30,00,000 |
| Reserves and Surplus | 60,00,000 | Current Assets: | |
| Long term loans | 1,10,00,000 | Stock of Raw Material | 16,57,500 |
| Current liabilities | 55,00,000 | Stock of Finished Goods | 19,89,000 |
| | | Debtors | 65,00,000 |
| | | Cash | 8,53,500 |
| | 2,40,00,000 | | 2,40,00,000 |
#### Approach
Start from the one figure given in money, the fixed assets: the fixed-assets ratios give sales and current assets, and every other ratio then hangs off sales, cost of goods sold or current assets.

---
item: q5
qno: 5
type: descriptive
tags: fm.lev.leverage, fm.ratio.profit
difficulty: medium
q: 5-6
a: 16-17
---
#### Question
Anirban Ltd. is a well-established manufacturing company engaged in producing industrial components for various engineering industries. The management intends to assess the company's financial performance and capital structure efficiency using key financial ratios and leverage measures. The following information has been extracted from the company's latest financial statements.

**Capital Structure of Anirban Ltd.**

| Source of Finance | Amount (₹) |
|---|---:|
| Equity Share Capital (₹10 per share) | 8,00,000 |
| 10% Preference Share Capital (₹100 per share) | 5,00,000 |
| 12% Debentures (₹100 each) | 7,00,000 |
| Total Capital Employed | 20,00,000 |

Additional Information:

1. The company reported a Profit After Tax (PAT) of ₹ 2,80,000 during the year.
2. The applicable corporate tax rate is 30%.
3. Total operating expenses, including depreciation of ₹ 96,800, are equal to 1.5 times the Earnings Before Interest and Tax (EBIT).
4. Equity shareholders were paid a dividend at the rate of 15%.
5. The market price per equity share is ₹ 23.

Required:

Based on the information provided above, calculate the following:

(i) Operating Leverage and Financial Leverage.

(ii) Preference Dividend Cover and Equity Dividend Cover.

(iii) Earnings Yield Ratio.

(iv) Price–Earnings (P/E) Ratio.

Show all necessary workings and assumptions clearly.
#### Answer
**Working Notes:**

| | (₹) |
|---|---:|
| Net Profit after Tax | 2,80,000 |
| Tax @ 30% | 1,20,000 |
| EBT | 4,00,000 |
| Interest on Debentures | 84,000 |
| EBIT | 4,84,000 |
| Total Operating Expenses (1.5 times of EBIT) | 7,26,000 |
| Sales | 12,10,000 |

(i) **Operating Leverage**

Variable operating expenses=₹ 7,26,000-96,800=₹6,29,200

= $\dfrac{\text{Contribution}}{\text{EBIT}}$ = $\dfrac{\text{₹ }(12{,}10{,}000 - 6{,}29{,}200)}{\text{₹ }4{,}84{,}000}$ = $\dfrac{\text{₹ }5{,}80{,}800}{\text{₹ }4{,}84{,}000}$ = 1.2 times

**Financial Leverage** = $\dfrac{\text{EBIT}}{\text{EBT}}$ = $\dfrac{4{,}84{,}000}{4{,}00{,}000}$ = 1.21 times

(ii) **Cover for Preference Dividend**

= $\dfrac{\text{PAT}}{\text{Preference Share Dividend}}$ = $\dfrac{\text{₹ }2{,}80{,}000}{\text{₹ }50{,}000}$ = 5.6 times

**Cover for Equity Dividend**

= $\dfrac{\text{(PAT - Preference Dividend)}}{\text{Equity Share Dividend}}$ = $\dfrac{\text{₹ }(2{,}80{,}000 - 50{,}000)}{\text{₹ }1{,}20{,}000}$

= $\dfrac{\text{₹ }2{,}30{,}000}{\text{₹ }1{,}20{,}000}$ = 1.92 times

(iii) **Earning Yield Ratio**

= $\dfrac{\text{EPS}}{\text{Market Price}}$ × 100

= $\left(\dfrac{\dfrac{2{,}30{,}000}{80{,}000}}{23} \times 100\right)$

= $\dfrac{2.875}{23}$ × 100 = 12.5%

(iv) **Price – Earnings Ratio (PE Ratio)**

= $\dfrac{\text{Market Price}}{\text{EPS}} = \dfrac{23}{2.875}$

= 8 times

**Note:** All operating expenses, other than depreciation, are variable costs.
#### Approach
Work up the income statement from PAT: gross up for tax, add the debenture interest to reach EBIT, then use the operating-expense relation for sales. Treat the operating expenses other than depreciation as variable for the contribution.

---
item: q6
qno: 6
type: descriptive
tags: fm.div.models
difficulty: medium
q: 6-7
a: 17
---
#### Question
The stocks of Firms A and B are considered to be equally risky. Investors expect the share of Firm A, which does not intend to pay any dividend, to be worth ₹ 100 one year from now.

Similarly, investors expect a total payoff of ₹ 100 from the share of Firm B after one year, comprising ₹ 10 as dividend income and ₹ 90 as the expected share price.

Dividends are taxed at 25 percent, while capital gains are taxed at 12 percent.

Assuming that each stock is expected to provide a post-tax rate of return of 18 percent and that the radical position holds, determine the current market prices of the shares of Firms A and B.
#### Answer
| | A | B |
|---|---|---|
| Next year’s price | 100 | 90 |
| Dividend | 0 | 10 |
| Let the current price be | A | B |
| Post-tax capital appreciation | 0.88(100-A) | 0.88 (90-B) |
| Post-tax dividend income | 0 | 0.75 x 10 |
| Total return | $\dfrac{0.88 (100\text{-}A)}{A}$ = 18% | $\dfrac{0.88 (90\text{-}B) + 7.5}{B}$ =18% |
| Current price (obtained by solving the preceding equation) | A = ₹ 83.02 | B = ₹ 81.79 |
#### Approach
Under the radical view investors care about post-tax returns: tax the capital gain and the dividend at their own rates and set each share's post-tax return equal to the required rate.

---
item: q7
qno: 7
type: descriptive
tags: fm.capbud.payback, fm.capbud.npv, fm.capbud.irr
difficulty: hard
q: 7-8
a: 17-20
---
#### Question
The management of P Limited is evaluating two mutually exclusive investment alternatives, namely Machine I and Machine II, for acquisition. The company has a cost of capital of 12% and is subject to a corporate tax rate of 30%.

The relevant details of the two machines are provided below:

| Particulars | Machine I | Machine II |
|---|---:|---:|
| Initial Cost of Machine | ₹ 10,00,000 | ₹ 15,00,000 |
| Useful Life | 5 years | 6 years |
| Annual Income Before Depreciation and Tax | ₹ 3,45,000 | ₹ 4,55,000 |

Additional Information:

- Depreciation is to be charged using the Straight-Line Method (SLM) over the useful life of each machine.

Required:

(i) Compute the following capital budgeting indicators for each machine:

- Discounted Payback Period (DPP)
- Net Present Value (NPV)
- Internal Rate of Return (IRR)

(ii) Based on the results obtained, recommend which machine should be selected by the management of P Limited, providing appropriate justification.

The present value factors of Re. 1 are as follows:

| Year | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---:|---:|---:|---:|---:|---:|
| At 12% | .893 | .797 | .712 | .636 | .567 | .507 |
| At 13% | .885 | .783 | .693 | .613 | .543 | .480 |
| At 14% | .877 | .769 | .675 | .592 | .519 | .456 |
| At 15% | .870 | .756 | .658 | .572 | .497 | .432 |
| At 16% | .862 | .743 | .641 | .552 | .476 | .410 |
#### Answer
(i) **Computation of Discounted Payback Period, Net Present Value (NPV) and Internal Rate of Return (IRR) for Two Machines**

**Calculation of Cash Inflows**

| | Machine - I (₹) | Machine - II (₹) |
|---|---:|---:|
| Annual Income before Tax and Depreciation | 3,45,000 | 4,55,000 |
| *Less*: Depreciation | | |
| Machine – I: 10,00,000 /5 | 2,00,000 | - |
| Machine – II: 15,00,000 / 6 | - | 2,50,000 |
| Income before Tax | 1,45,000 | 2,05,000 |
| *Less*: Tax @ 30 % | 43,500 | 61,500 |
| Income after Tax | 1,01,500 | 1,43,500 |
| *Add*: Depreciation | 2,00,000 | 2,50,000 |
| Annual Cash Inflows | 3,01,500 | 3,93,500 |

| | | Machine – I | | | Machine – II | | |
|---|---:|---:|---:|---:|---:|---:|---:|
| **Year** | **P.V. of Re.1 @12%** | **Cash flow** | **P.V.** | **Cumulative P.V** | **Cash flow** | **P.V.** | **Cumulative P.V.** |
| 1 | 0.893 | 3,01,500 | 2,69,240 | 2,69,240 | 3,93,500 | 3,51,396 | 3,51,396 |
| 2 | 0.797 | 3,01,500 | 2,40,296 | 5,09,536 | 3,93,500 | 3,13,620 | 6,65,016 |
| 3 | 0.712 | 3,01,500 | 2,14,668 | 7,24,204 | 3,93,500 | 2,80,172 | 9,45,188 |
| 4 | 0.636 | 3,01,500 | 1,91,754 | 9,15,958 | 3,93,500 | 2,50,266 | 11,95,454 |
| 5 | 0.567 | 3,01,500 | 1,70,951 | 10,86,909 | 3,93,500 | 2,23,115 | 14,18,569 |
| 6 | 0.507 | - | - | - | 3,93,500 | 1,99,505 | 16,18,074 |

**Discounted Payback Period for:**

**Machine – I**

Discounted Payback Period = 4+ $\dfrac{(10{,}00{,}000 - 9{,}15{,}958)}{1{,}70{,}951}$

= 4+ $\dfrac{84{,}042}{1{,}70{,}951}$ = 4 + 0.4916

= 4.49 years or 4 years and 5.9 months

**Machine – II**

Discounted Payback Period = 5+ $\dfrac{(15{,}00{,}000 - 14{,}18{,}569)}{1{,}99{,}505}$ = 5+ $\dfrac{81{,}431}{1{,}99{,}505}$

= 5 + 0.4082

= 5.41 years or 5 years and 4.9 months

**Net Present Value for:**

**Machine – I**

NPV = ₹ 10,86,909 – 10,00,000 = ₹ 86,909

**Machine – II**

NPV = ₹ 16,18,074 – 15,00,000 = ₹ 1,18,074

**Internal Rate of Return (IRR) for:**

**Machine – I**

P.V. Factor = $\dfrac{\text{Initial Investment}}{\text{Annual Cash Inflow}} = \dfrac{10{,}00{,}000}{3{,}01{,}500}$ = 3.3167

PV factor falls between 15% and 16%

Present Value of Cash inflow at 15% and 16% will be:

Present Value at 15% = 3.353 x 3,01,500 = 10,10,930

Present Value at 16% = 3.274 x 3,01,500 = 9,87,111

IRR = 15 + $\dfrac{10{,}10{,}930 - 10{,}00{,}0000}{10{,}10{,}930 - 9{,}87{,}111}$ × (16 - 15) = 15 + $\dfrac{10{,}930}{23{,}819}$ ×1

= 15.4588%

= 15.46%

**Machine - II**

P.V. Factor = $\dfrac{15{,}00{,}000}{3{,}93{,}500}$ = 3.8119

Present Value of Cash inflow at 14% and 15% will be:

Present Value at 14% = 3.888 x 3,93,500 = 15,29,928

Present Value at 15% = 3.785 x 3,93,500 = 14,89,398

IRR = 14 + $\dfrac{15{,}29{,}928 - 15{,}00{,}000}{15{,}29{,}928 - 14{,}89{,}398}$ × (15 - 14) = 14 + $\dfrac{29{,}928}{40{,}530}$ ×1= 14.7384%

= 14.74%

(ii) **Advise to the Management**

**Ranking of Machines in terms of the Three Methods**

| | Machine - I | Machine - II |
|---|---|---|
| Discounted Payback Period | I | II |
| Net Present Value | II | I |
| Internal Rate of Return | I | II |

**Advise:** Since Machine - I has better ranking than Machine – II, therefore, Machine – I should be selected
#### Approach
Find the annual cash inflow (profit after tax plus depreciation), discount it at 12% for the payback and the NPV, and use the annuity factor of the investment to bracket the IRR between two rates before interpolating.

---
item: q8
qno: 8
type: descriptive
tags: fm.wc.receivables
difficulty: hard
q: 8
a: 20-21
---
#### Question
A firm has total annual sales of ₹ 200 lakhs, of which 80% are made on credit. The company offers credit terms of 2/40, net 120. Out of the total credit customers, 50% avail themselves of the cash discount, while the remaining customers settle their accounts after 120 days.

Based on past experience, bad debt losses amount to approximately 1% of credit sales. In addition, the firm incurs ₹ 2,40,000 per annum in administering its credit sales. These costs can be avoided because a factor is willing to purchase the firm's receivables.

The factor will charge a 2% commission and provide advances against receivables at an interest rate of 18%, while retaining 10% of the receivables as a reserve.

Required:

(i) Determine the effective cost of factoring. Assume a 360-day year.

(ii) If bank finance for working capital is available at an interest rate of 14%, advise whether the firm should avail itself of the factoring service.
#### Answer
| Particulars | (₹) |
|---|---:|
| Total Sales | ₹ 200 lakhs |
| Credit Sales (80%) | ₹ 160 lakhs |
| Receivables for 40 days | ₹ 80 lakhs |
| Receivables for 120 days | ₹ 80 lakhs |
| Average collection period [(40 x 0.5) + (120 × 0.5)] | 80 days |
| Average level of Receivables (₹ 1,60,00,000 × 80/360) | ₹ 35,55,556 |
| Factoring Commission (₹ 35,55,556 × 2/100) | ₹ 71,111 |
| Factoring Reserve (₹ 35,55,556 × 10/100) | ₹ 3,55,556 |
| Amount available for advance {₹ 35,55,556 - (3,55,556 + 71,111)} | ₹ 31,28,889 |
| • Factor will deduct his interest @ 18% :<br>• Interest = $\dfrac{\text{₹}31{,}28{,}889 \times 18 \times 80}{100 \times 360}$ | ₹ 1,25,156 |
| • Advance to be paid (₹ 31,28,889 – ₹ 1,25,156) | ₹ 30,03,733 |

(i) **Statement Showing Evaluation of Factoring Proposal**

| | | ₹ |
|---|---|---:|
| A. | **Annual Cost of Factoring to the Firm:** | |
| | Factoring commission (₹ 71,111 × 360/80) | 3,20,000 |
| | Interest charges (₹ 1,25,156 × 360/80) | 5,63,200 |
| | Total | 8,83,200 |
| B. | **Firm’s Savings on taking Factoring Service:** | ₹ |
| | Cost of credit administration saved | 2,40,000 |
| | Bad Debts (₹ 160,00,000 x 1/100) avoided | 1,60,000 |
| | Total | 4,00,000 |
| C. | Net Cost to the firm (A – B) (₹ 8,83,200 – ₹ 4,00,000) | 4,83,200 |

Effective cost of factoring = $\dfrac{\text{₹ }4{,}83{,}200}{\text{₹}30{,}03{,}733}$ ×100 = 16.09\*%

\* If cost of factoring is calculated on the basis of total amount available for advance, then, it will be

= $\dfrac{\text{₹}4{,}83{,}200}{\text{₹}31{,}28{,}889}$ ×100 = 15.44%

(ii) If Bank finance for working capital is available at 14%, firm will not avail factoring service as 14 % is less than 16.08% (or 15.44%)
#### Approach
Find the average receivables from the weighted collection period, then the commission, reserve and interest per collection cycle; annualise them, deduct the costs the factor saves, and express the net cost over the advance actually received.

---
item: q9
qno: 9
type: descriptive
tags: fm.wc.cash
difficulty: easy
q: 8-9
a: 21-22
---
#### Question
You have been asked to prepare a cash budget for the next quarter, January through March, for Jahanara Fashions. They have provided you with the following information:

a. Sales are expected to be: ₹ 400,000 in January, ₹ 400,000 in February, and ₹ 600,000 in March. All sales will be in cash.

b. The estimated purchases are: ₹380,000 in January, ₹ 360,000 in February, and ₹ 450,000 in March. Payments for purchases will be made after a lag of one month. Outstanding on account of purchases in December last are ₹ 350,000.

c. The rent per month is ₹ 10,000 and the partners’ personal withdrawal per month is ₹25,000.

d. Salaries and other expenses, payable in cash, are expected to be: ₹ 25,000 in January, ₹ 20,000 in February, and ₹ 30,000 in March.

e. They plan to buy furniture worth ₹ 40,000 on cash payment in January.

f. The cash balance at present is ₹ 6,000. Their target cash balance, however, is ₹ 15,000. What will be surplus/ deficit of cash in relation to their target cash balance?
#### Answer
The projected cash inflows and outflows for the quarter, January through March, is shown below:

| Month | December (₹) | January (₹) | February (₹) | March (₹) |
|---|---:|---:|---:|---:|
| **Inflows:** | | | | |
| Sales collection | | 4,00,000 | 4,00,000 | 6,00,000 |
| **Outflows:** | | | | |
| Payment to sundry creditors | | 3,50,000 | 3,80,000 | 3,60,000 |
| Rent | | 10,000 | 10,000 | 10,000 |
| Drawings | | 25,000 | 25,000 | 25,000 |
| Salaries & other expenses | | 25,000 | 20,000 | 30,000 |
| Purchase of furniture | | 40,000 | | |
| **Total outflows 2 to 6)** | | **4,50,000** | **4,35,000** | **4,25,000** |

Given an opening cash balance of ₹6,000 and a target cash balance of ₹ 15,000, the surplus/deficit in relation to the target cash balance is worked out below:

| | January (₹) | February (₹) | March (₹) |
|---|---:|---:|---:|
| 1\. Opening balance | 6,000 | | |
| 2\. Inflows | 400,000 | 400,000 | 600,000 |
| 3\. Outflows | 450,000 | 435,000 | 425,000 |
| 4\. Net cash flow (2 - 3) | (50,000) | (35,000) | 175,000 |
| 5\. Cumulative net cash flow | (50,000) | (85,000) | 90,000 |
| 6\. Opening balance + Cumulative net cash flow | (44,000) | (79,000) | 96,000 |
| 7\. Minimum cash balance required | 15,000 | 15,000 | 15,000 |
| 8\. Surplus/(Deficit) | (59,000) | (94,000) | 81,000 |

---
item: q10a
qno: 10
part: (a)
type: descriptive
tags: fm.intro.role, fm.intro.objectives
difficulty: easy
q: 9
a: 22-23
---
#### Question
PQR Ltd. expanded its business by purchasing new machinery and increasing production. However, due to poor financial planning, the company is facing cash shortages, rising expenses, and difficulty managing its working capital. The management is now focusing on better budgeting, cost control, and cash flow management.

In the light of the above case, explain the importance of financial management and how it helps a business achieve growth, profitability, and financial stability.
#### Answer
Importance of Financial Management cannot be over-emphasized. It is, indeed, the key to successful business operations. Without proper administration of finance, no business enterprise can reach at its full potentials for growth and success. Money is to an enterprise, what oil is to an engine.

Financial Management is all about planning investment, funding the investment, monitoring expenses against budget and managing gains from the investments. Financial management means management of all matters related to an organization’s finances.

The best way to demonstrate the importance of good financial management is to describe some of the tasks that it involves:-

(a) **Taking care** not to over-invest in fixed assets

(b) **Balancing** cash-outflow with cash-inflows

(c) **Ensuring** that there is a sufficient level of short-term working capital

(d) **Setting** sales revenue targets that will deliver growth

(e) **Increasing** gross profit by setting the correct pricing for products or services

(f) **Controlling** the level of general and administrative expenses by finding more cost-efficient ways of running the day-to-day business operations, and

(g) **Tax planning** that will minimize the taxes a business has to pay.

---
item: q10b
qno: 10
part: (b)
type: descriptive
tags: fm.sources.modern
difficulty: medium
q: 9
a: 23-26
---
#### Question
Global Infra Ltd., an Indian infrastructure company, plans to raise funds from international markets for its expansion project. The Finance Director is evaluating various foreign bond options.

Explain various foreign bonds for Global Infra Ltd. and their key features.
#### Answer
**Foreign Bonds**

| Sl. No. | Name of Bond | Salient Features |
|---|---|---|
| 1\. | Foreign Currency Convertible Bond (FCCB) | • This bond comes at a very low rate of interest.<br>• The advantage to the issuer is that the issuer can get foreign currency at a very low cost.<br>• The risk is that in case the bond has to be redeemed on the date of maturity, the issuer has to make the payment and at that time the issuer may not have the money. |
| 2\. | Plain Vanilla Bond | • The issuer would pay the principal amount along with the interest rate.<br>• This type of bond would not have any options.<br>• This bond can be issued in the form of discounted bond or can be issued in the form of coupon bearing bond. |
| 3\. | Convertible Floating Rate Notes (FRN) | • A convertible FRN is issued by giving its holder an option to convert it into a longer term debt security with a specified coupon<br>• It protects an investor against falling interest rate<br>• The long- term debt security can be sold in the market and the investor can earn profit<br>• Capital gain is not applicable to FRN |
| 4\. | Drop Lock Bond | • It is a Floating Rate Note with a normal floating rate<br>• The floating rate bond would be automatically converted into fixed rate bond if interest rate falls below a predetermined level<br>• The new fixed rate stays till the drop lock bond reaches its maturity<br>• The difference between the convertible floating rate note and drop lock bond is that the former is a long option structure and the later one is a short option structure |
| 5\. | Variable Rate Demand Obligations | • A normal floating rate note with a nominal maturity<br>• The holder of the floating rate note can sell the obligation back to the trustee at par plus accrued interest<br>• It gives the investor an option to exit, so it is more liquid than the normal FRN |
| 6\. | Yield Curve Note (YCN) | • It is a structured debt security<br>• Yield increases when prevailing interest rate declines<br>• Yield decreases when prevailing interest rate increases<br>• This is used to hedge the interest rate<br>• This works like inverse floater |
| 7\. | Euro Bond | • Euro bonds are issued or traded in a country using a currency other than the one in which the bond is denominated. This means that the bond uses a certain currency, but operates outside the jurisdiction of the Central Bank that issues that currency.<br>• Eurobonds are issued by multinational corporations, for example, a British company may issue a Eurobond in Germany, denominating it in U.S. dollars.<br>• It is important to note that the term has nothing to do with the euro, and the prefix "euro-" is used more generally to refer to deposit outside the jurisdiction of the domestic central bank |

---
item: q10c
qno: 10
part: (c)
type: descriptive
tags: fm.wc.basics
difficulty: easy
q: 9-10
a: 26-27
---
#### Question
Sunrise Healthcare Pvt. Ltd. operates a chain of pharmacies across India. The company has recently experienced rising raw material costs, fluctuations in exchange rates affecting imported medicines, and increasing inventory levels due to uncertain demand. Management is also reviewing its credit policy to improve cash flows and is considering various short-term financing options to meet working capital needs.

In the context of the above case, discuss the factors that should be considered by Sunrise Healthcare Pvt. Ltd. while planning its working capital requirements.
#### Answer
**Some of the factors which need to be considered while planning for working capital requirement are:**

1. **Need for Cash:** Identify the cash balance which allows for the business to **meet day-to-day expenses** but reduces cash holding costs (example - loss of interest on long term investment had the surplus cash invested therein).
2. **Desired level of Inventory: Identify the level of inventory** which allows for uninterrupted production but reduces the investment in raw materials and hence increases cash flow. The techniques like Just in Time (JIT) and Economic order quantity (EOQ) are used for this.
3. **Receivables:** Identify the **appropriate credit policy**, i.e., credit terms which will attract customers, such that any impact on cash flows and the cash conversion cycle will be offset by increased revenue and hence Return on Capital (or vice versa). The tools like Early Payment Discounts and allowances are used for this.
4. **Short-term Financing Options:** Inventory is ideally financed by credit granted by the supplier. However, depending on the cash conversion cycle, it may be necessary to utilize a bank loan (or overdraft), or to “convert debtors to cash” through “factoring” in order to finance working capital requirements.
5. **Nature of Business:** For e.g. in a business of restaurant, most of the sales are in Cash. Therefore, need for working capital is very less. On the other hand, there would be a higher inventory in case of a pharmacy or a bookstore.
6. **Market and Demand Conditions:** For e.g. if an item’s demand far exceeds its production, the working capital requirement would be less as investment in finished goods inventory would be very less with continuous sales.
7. **Technology and Manufacturing Policies:** For e.g. in some businesses the **demand for goods is seasonal**, in that case a business may follow a policy for steady production throughout the whole year or rather may choose a policy of production only during the demand season.
8. **Operating Efficiency:** A company can reduce the working capital requirement by **eliminating waste, improving coordination, process improvements** etc.
9. **Price Level Changes & Exchange Rate Fluctuations:** For e.g. **rising prices necessitate the use of more funds** for maintaining an existing level of activity. For the same level of current assets, higher cash outlays are required. Therefore, the effect of rising prices is that a higher amount of working capital is required. Another example would be unfavorable exchange rate movement in case of imported raw materials would warrant additional cost of same.
