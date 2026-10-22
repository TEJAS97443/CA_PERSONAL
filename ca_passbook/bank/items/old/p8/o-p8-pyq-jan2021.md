<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-pyq-jan2021
paper: p8
kind: pyq
attempt: jan2021
qfile: old/p8/pyq-jan2021-a.pdf
afile: old/p8/pyq-jan2021-a.pdf
paperfile: old/p8/pyq-jan2021-q.pdf
choice: q1; any 4 of q2-q6
q: 1
status: checked
by: tx-43
date: 2026-10-20
note: Old-scheme Paper 8 (Financial Management and Economics for Finance), January 2021: only Section A Financial Management (pp.1-14 of ICAI's Suggested Answers) is transcribed; Section B Economics for Finance (pp.15-23) is not (no blocks cite it). Source: ICAI's own copy of the Suggested Answers is gone (404, no Wayback capture); the file is the cacult.com mirror recorded in bank/sources.json, whose text layer is the original Word export with no mirror marks. Text from the Suggested Answers (qfile and afile), which reproduce every question (in italics) before its answer; the question-paper booklet scan (OCR text) is linked as paperfile and was used only to confirm the OR alternative's missing marks. Instructions: ICAI's Section A box on p.1 ("Question No. 1 is compulsory. Attempt any four questions out of the remaining five questions."), which gives the choice rule; Section A carries 60 marks (Q1 20 + four of Q2-Q6 at 10 each). ICAI prints no separate time for Section A (3 hours for the whole paper), so minutes: is left out. Item model: Q1 (a)-(d) are separate 5-mark questions; Q2-Q5 are single 10-mark questions (Q3's (a)(i)-(ii) and (b)(i)-(ii) carry one marks note and one connected answer); Q6(c) has an OR alternative (q6c-or, alt: q6c) for which ICAI prints no marks, so it has marks: none. Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics. Q1(c) is out of syllabus (oos): the certainty equivalent method is Risk Analysis in Capital Budgeting, which is not in the new Paper 6A syllabus or the January 2027 Study Material; it keeps the nearest tag fm.capbud.npv. The operating cycle (Q1(d)), the NOI approach (Q3), the Electronic Cash Management System (Q6(b)) and callable / puttable bonds (Q6(c) OR) are all in the January 2027 Study Material. ICAI's own wording kept as printed: "Equity Shares Capital" in the question's balance sheet beside "Equity Share Capital" in the answer, "Long term Debt" beside "Long-term Debt", "Total Assets to Turnover" (Q1(a)); in the answer $P_o$ and $D_o$ with a letter o in the first Gordon formula and $D_0$ with a zero below, "0.75 X 0.22" and "3 X (1 – 0.75)" with a capital X, a small k in "k - br", "Earning for equity shareholders" (Q1(b)); "certainty equivalent method approach" and "The risk free rate" (Q1(c)); "Debt Collection period" (Q1(d)); "The information related to XYZ Company Ltd. ... are as follows", "Earning per share" and "Earning Yield" (Q2); "If X, owns 3 per cent", "Analyse why does it differ", and both "x" and "×" in the answer's tables as ICAI types them (Q3); "floatation" (Q4); "Define Internal Rate of Return (IRR)" without a full stop (Q6(c)). Repaired extraction damage only: the +, −, × and ∴ signs and the brackets of stacked formulas that the text layer drops ("0.75 (1  0.165)", "PD  RV  NP"), read from the rendered pages; "i f" (justified spacing, Q3) as "if"; "cost-efficient" and "now-a-days" re-joined across their line breaks; the superscripts of "31st March"; subscripts ($K_e$, $K_o$, $K_d$, $K_p$, $D_1$, $P_0$, $P_o$) written in KaTeX; stacked fractions in KaTeX with ICAI's symbols and numbers; the Rupee-font backtick as ₹. Two equation objects are clipped in the rendered PDF but whole in its text layer, which is followed: "Number of operating cycle" (Q1(d)(iii), shown as "cycl") and "(as calculated above)" (Q2, its closing bracket hidden). Not transcribed: the paper title, the "Answer" headings, the "OR" separator between the two Q6(c) answers (the alternative is its own item) and underline rules. check.py: the numbers accepted are (1) the paper's title "PAPER – 8 : ..." on p.1 and the odd pages' running head "PAPER – 8: FINANCIAL MANAGEMENT AND ECONOMICS FOR FINANCE n" on pp.3, 5, 7, 9, 11 and 13, which check.py does not drop (8 up to five times in a page group; the page numbers 5, 7, 9, 11, 13, and 3, which nets against a question number); (2) the question numbers 1 to 6, which check.py counts on both sides while it drops ICAI's "Question N" lines as a running head (the shape repeats on most pages), so each number is up to two more in the transcription; (3) three stacked-fraction denominators that are the last line of their page, which check.py takes for page numbers: 6 (p.5, Q1(d)(iii)), 100 (p.6, Q2 working 1) and 4 (p.11, Q5's depreciation of Machine B).
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
tags: fm.ratio.prepare
difficulty: medium
q: 1
a: 3
---
#### Question
From the following information, complete the Balance Sheet given below:

(i) Equity Share Capital : ₹ 2,00,000

(ii) Total debt to owner's equity : 0.75

(iii) Total Assets turnover : 2 times

(iv) Inventory turnover : 8 times

(v) Fixed Assets to owner's equity : 0.60

(vi) Current debt to total debt : 0.40

Balance Sheet of XYZ Co. as on March 31, 2020

| Liabilities | Amount (₹) | Assets | Amount (₹) |
|---|---:|---|---:|
| Equity Shares Capital | 2,00,000 | Fixed Assets | ? |
| Long term Debt | ? | Current Assets: | |
| Current Debt | ? | Inventory | ? |
| | | Cash | ? |
#### Answer
**Balance Sheet of XYZ Co. as on March 31, 2020**

| Liabilities | Amount (₹) | Assets | Amount (₹) |
|---|---:|---|---:|
| Equity Share Capital | 2,00,000 | Fixed Assets | 1,20,000 |
| Long-term Debt | 90,000 | **Current Assets:** | |
| Current Debt | 60,000 | Inventory | 87,500 |
| | | Cash (balancing figure) | 1,42,500 |
| | **3,50,000** | | **3,50,000** |

**Working Notes**

1\. Total Debt = 0.75 x Equity Share Capital = 0.75 x ₹ 2,00,000 = ₹ 1,50,000

Further, Current Debt to Total Debt = 0.40.

So, Current Debt = 0.40 x ₹ 1,50,000 = ₹ 60,000

Long term Debt = ₹ 1,50,000 - ₹ 60,000 = ₹ 90,000

2\. Fixed Assets = 0.60 x Equity Share Capital = 0.60 x ₹ 2,00,000 = ₹ 1,20,000

3\. Total Assets to Turnover = 2 times; Inventory Turnover = 8 times

Hence, Inventory /Total Assets = 2/8 =1/4

Further, Total Assets = ₹ 2,00,000 + ₹ 1,50,000 = ₹ 3,50,000

Therefore, Inventory = ₹ 3,50,000/4 = ₹ 87,500

Cash in Hand = Total Assets – Fixed Assets – Inventory

= ₹ 3,50,000 - ₹ 1,20,000 - ₹ 87,500 = ₹ 1,42,500
#### Approach
Start from the equity: total debt and fixed assets are both stated as multiples of it, and the debt splits into current and long-term by the given ratio. The two turnover ratios share the same sales figure, so their quotient links inventory to total assets; cash is the balancing figure.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: medium
q: 1-2
a: 3-5
---
#### Question
The following information is taken from ABC Ltd.

| | |
|---|---|
| Net Profit for the year | ₹ 30,00,000 |
| 12% Preference share capital | ₹ 1,00,00,000 |
| Equity share capital (Share of ₹ 10 each) | ₹ 60,00,000 |
| Internal rate of return on investment | 22% |
| Cost of Equity Capital | 18% |
| Retention Ratio | 75% |

Calculate the market price of the share using:

(1) Gordon's Model

(2) Walter's Model
#### Answer
Market price per share by-

**(1) Gordon’s Model:**

Present market price per share ($P_o$)\* = $\dfrac{D_o(1+g)}{K_e - g}$

**OR**

Present market price per share ($P_o$) = $\dfrac{D_1}{K_e - g}$

Where,

$P_o$ = Present market price per share.

g = Growth rate (br) = 0.75 X 0.22 = 0.165

b = Retention ratio (i.e., % of earnings retained)

r = Internal rate of return (IRR)

$D_0$ = E x (1 – b) = 3 X (1 – 0.75) = 0.75

E = Earnings per share

$P_o$ = $\dfrac{0.75\,(1+0.165)}{0.18-0.165} = \dfrac{0.874}{0.015}$ = **₹ 58.27 approx.**

\*Alternatively, $P_o$ can be calculated as $\dfrac{E(1 - b)}{k - br}$ = ₹ 50.

**(2) Walter’s Model:**

P = $\dfrac{D+\dfrac{r}{K_e}(E-D)}{K_e}$

= $\dfrac{0.75+\dfrac{0.22}{0.18}(3-0.75)}{0.18}$ = **₹ 19.44**

**Workings:**

**1\. Calculation of Earnings per share**

| Particulars | Amount (₹) |
|---|---:|
| Net Profit for the year | 30,00,000 |
| Less: Preference dividend (12% of ₹ 1,00,00,000) | (12,00,000) |
| Earnings for equity shareholders | 18,00,000 |
| No. of equity shares (₹ 60,00,000/₹10) | 6,00,000 |
| Therefore, Earnings per share $\left(\dfrac{\text{Earning for equity shareholders}}{\text{No. of equity shares}}\right)$ | ₹ 18,00,000/6,00,000 = **₹ 3.00** |

**2\. Calculation of Dividend per share**

| Particulars | |
|---|---:|
| Earnings per share | ₹ 3 |
| Retention Ratio (b) | 75% |
| Dividend pay-out ratio (1-b) | 25% |
| Dividend per share (Earnings per share x Dividend pay-out ratio) | ₹ 3 x 0.25 = **₹ 0.75** |
#### Approach
Earnings per share are what is left for equity after the preference dividend, divided by the number of shares; the dividend is the part not retained. Gordon needs the growth rate b × r, Walter needs r and the cost of equity.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: easy
q: 2
a: 5
note: Out of syllabus (old scheme): the item evaluates a project by the certainty equivalent method, which is Risk Analysis in Capital Budgeting. That topic is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material (its Investment Decisions chapter teaches payback, ARR, NPV, PI, IRR, MIRR, discounted payback, capital rationing and equivalent annual cost, with no risk analysis; the Study Material has no certainty equivalent). The tag names the nearest sub-topic: the NPV the answer computes.
---
#### Question
A project requires an initial outlay of ₹ 3,00,000.

The company uses certainty equivalent method approach to evaluate the project. The risk free rate is 7%.

Following information is available:

| Year | CFAT (Cash Flow After Tax) ₹ | CE (Certainty Equivalent Coefficient) |
|---|---:|---:|
| 1. | 1,00,000 | 0.90 |
| 2. | 1,50,000 | 0.80 |
| 3. | 1,15,000 | 0.60 |
| 4. | 1,00,000 | 0.55 |
| 5. | 50,000 | 0.50 |

PV Factor at 7%

| Year | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|
| PV Factor | 0.935 | 0.873 | 0.816 | 0.763 | 0.713 |

Evaluate the above. Is investment in the project beneficial?
#### Answer
**Statement Showing the Net Present Value of Project**

| Year end | CFAT (₹) | C.E. | Adjusted Cash flow (₹) | Present value factor @ 7% | Total Present value (₹) |
|---:|---:|---:|---:|---:|---:|
| | **(a)** | **(b)** | **(c) = (a) × (b)** | **(d)** | **(e) = (c) × (d)** |
| 1 | 1,00,000 | 0.90 | 90,000 | 0.935 | 84,150 |
| 2 | 1,50,000 | 0.80 | 1,20,000 | 0.873 | 1,04,760 |
| 3 | 1,15,000 | 0.60 | 69,000 | 0.816 | 56,304 |
| 4 | 1,00,000 | 0.55 | 55,000 | 0.763 | 41,965 |
| 5 | 50,000 | 0.50 | 25,000 | 0.713 | 17,825 |
| PV of Cash Inflow | | | | | 3,05,004 |
| Less: Initial Investment | | | | | (3,00,000) |
| **Net Present Value** | | | | | **5,004** |

**Since the NPV of the project is positive, it is beneficial to invest in the project.**
#### Approach
Multiply each year's cash flow by its certainty-equivalent coefficient first, then discount at the risk-free rate (the risk is already taken out of the cash flows) and compare with the outlay.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.wc.basics, fm.wc.estimate
difficulty: medium
q: 2-3
a: 5-6
---
#### Question
The following information is provided by MNP Ltd. for the year ending 31st March, 2020:

| | |
|---|---|
| Raw Material Storage period | 45 days |
| Work-in-Progress conversion period | 20 days |
| Finished Goods storage period | 25 days |
| Debt Collection period | 30 days |
| Creditors payment period | 60 days |
| Annual Operating Cost | ₹ 25,00,000 |
| (Including Depreciation of ₹ 2,50,000) | |

Assume 360 days in a year.

You are required to calculate:

(i) Operating Cycle period

(ii) Number of Operating Cycle in a year.

(iii) Amount of working capital required for the company on a cost basis.

(iv) The company is a market leader in its product and it has no competitor in the market. Based on a market survey it is planning to discontinue sales on credit and deliver products based on pre-payments in order to reduce its working capital requirement substantially. You are required to compute the reduction in working capital requirement in such a scenario.
#### Answer
**(i) Calculation of Operating Cycle Period:**

Operating Cycle Period = R + W + F + D – C

= 45 + 20 + 25 + 30 – 60 = **60 days**

**(ii) Number of Operating Cycle in a Year**

= $\dfrac{360}{\text{Operating cycle period}} = \dfrac{360}{60}$ = **6**

**(iii) Amount of Working Capital Required**

= $\dfrac{\text{Annual operating cost}}{\text{Number of operating cycle}} = \dfrac{\text{₹ 25,00,000 - ₹ 2,50,000}}{6}$

= $\dfrac{\text{₹ 22,50,000}}{6}$ = **₹ 3,75,000**

**(iv) Reduction in Working Capital**

Operating Cycle Period = R + W + F – C

= 45 + 20 + 25 – 60 = **30 days**

Amount of Working Capital Required = $\dfrac{\text{₹ 22,50,000}}{360}$ x 30 = ₹ 1,87,500

Reduction in Working Capital = ₹ 3,75,000 – ₹ 1,87,500 = **₹ 1,87,500**

**Note:** If we use Total Cost basis, then amount of Working Capital required will be ₹ 4,16,666.67 (approx.) and Reduction in Working Capital will be ₹ 2,08,333.33 (approx.)
#### Approach
The operating cycle adds the raw material, work-in-progress, finished goods and debtors periods and takes off the creditors period. "Cost basis" here means cash cost: leave depreciation out of the operating cost; with pre-payments the debtors period drops out of the cycle.

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
The information related to XYZ Company Ltd. for the year ended 31st March, 2020 are as follows:

| | |
|---|---|
| Equity Share Capital of ₹ 100 each | ₹ 50 Lakhs |
| 12% Bonds of ₹ 1000 each | ₹ 30 Lakhs |
| Sales | ₹ 84 Lakhs |
| Fixed Cost (Excluding Interest) | ₹ 7.5 Lakhs |
| Financial Leverage | 1.39 |
| Profit-Volume Ratio | 25% |
| Market Price per Equity Share | ₹ 200 |
| Income Tax Rate Applicable | 30% |

You are required to compute the following:

(i) Operating Leverage

(ii) Combined Leverage

(iii) Earning per share

(iv) Earning Yield
#### Answer
**Workings:**

1\. Profit Volume Ratio = $\dfrac{\text{Contribution}}{\text{Sales}}$ x 100

So, 25 = $\dfrac{\text{Contribution}}{\text{₹ 84,00,000}}$ x 100

Contribution = $\dfrac{\text{₹ 84,00,000 x 25}}{100}$ = ₹ 21,00,000

2\. Financial leverage = $\dfrac{\text{EBIT}}{\text{EBT}}$

Or, 1.39 = $\dfrac{\text{₹ 13,50,000 (as calculated above)}}{\text{EBT}}$

EBT = ₹ 9,71,223

3\. Income Statement

| Particulars | (₹) |
|---|---:|
| Sales | 84,00,000 |
| Less: Variable Cost (Sales - Contribution) | (63,00,000) |
| Contribution | 21,00,000 |
| Less: Fixed Cost | (7,50,000) |
| EBIT | 13,50,000 |
| Less: Interest (EBIT - EBT) | (3,78,777) |
| EBT | 9,71,223 |
| Less: Tax @ 30% | (2,91,367) |
| Profit after Tax (PAT) | **6,79,856** |

**(i) Operating Leverage** = $\dfrac{\text{Contribution}}{\text{Earnings before interest and tax (EBIT)}}$

= $\dfrac{\text{₹ 21,00,000}}{\text{₹ 13,50,000}}$ = **1.556** (approx.)

**(ii) Combined Leverage** = Operating Leverage x Financial Leverage

= 1.556 x 1.39 = **2.163** (approx.)

Or, $\dfrac{\text{Contribution}}{\text{EBT}}$ = $\dfrac{\text{₹ 21,00,000}}{\text{₹ 9,71,223}}$ = **2.162** (approx.)

**(iii) Earnings per Share (EPS)**

EPS = $\dfrac{\text{PAT}}{\text{No. of shares}} = \dfrac{\text{₹ 6,79,856}}{50{,}000}$ = **₹ 13.597**

**(iv) Earning Yield**

= $\dfrac{\text{EPS}}{\text{Market Price}}$ x 100 = $\dfrac{\text{₹ 13.597}}{\text{₹ 200}}$ x 100 = **6.80%** (approx.)

**Note:** The question has been solved considering Financial Leverage given in the question as the base for calculating total interest expense including the interest of 12% Bonds of ₹ 30 Lakhs. The question can also be solved in other alternative ways.
#### Approach
Contribution comes from the P/V ratio and EBIT from contribution less fixed cost; the given financial leverage then fixes EBT, so the interest is a balancing figure. EPS and earning yield follow from the income statement and the number of shares.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.cs.theories
difficulty: medium
q: 8
a: 8-9
note: ICAI prints one (10 Marks) for requirements (a)(i)-(ii) and (b)(i)-(ii), so Q3 is one item.
---
#### Question
A Limited and B Limited are identical except for capital structures. A Ltd. has 60 per cent debt and 40 per cent equity, whereas B Ltd. has 20 per cent debt and 80 per cent equity. (All percentages are in market-value terms.) The borrowing rate for both companies is 8 per cent in a no-tax world, and capital markets are assumed to be perfect.

(a) (i) If X, owns 3 per cent of the equity shares of A Ltd., determine his return if the Company has net operating income of ₹ 4,50,000 and the overall capitalization rate of the company, ($K_o$) is 18 per cent.

(ii) Calculate the implied required rate of return on equity of A Ltd.

(b) B Ltd. has the same net operating income as A Ltd.

(i) Calculate the implied required equity return of B Ltd.

(ii) Analyse why does it differ from that of A Ltd.
#### Answer
**(a)** Value of A Ltd. = $\dfrac{\text{NOI}}{K_o} = \dfrac{\text{₹ 4,50,000}}{18\%}$ = ₹ 25,00,000

**(i) Return on Shares of X on A Ltd.**

| Particulars | Amount (₹) |
|---|---:|
| Value of the company | 25,00,000 |
| Market value of debt (60% x ₹ 25,00,000) | 15,00,000 |
| Market value of shares (40% x ₹ 25,00,000) | **10,00,000** |
| **Particulars** | **Amount (₹)** |
| Net operating income | 4,50,000 |
| Interest on debt (8% × ₹ 15,00,000) | 1,20,000 |
| Earnings available to shareholders | **3,30,000** |
| Return on 3% shares (3% × ₹ 3,30,000) | **9,900** |

**(ii)** Implied required rate of return on equity of A Ltd. = $\dfrac{\text{₹ 3,30,000}}{\text{₹ 10,00,000}}$ = **33%**

**(b) (i) Calculation of Implied rate of return of B Ltd.**

| Particulars | Amount (₹) |
|---|---:|
| Total value of company | 25,00,000 |
| Market value of debt (20% × ₹ 25,00,000) | 5,00,000 |
| Market value of equity (80% × ₹ 25,00,000) | **20,00,000** |
| **Particulars** | **Amount (₹)** |
| Net operating income | 4,50,000 |
| Interest on debt (8% × ₹ 5,00,000) | 40,000 |
| Earnings available to shareholders | **4,10,000** |

Implied required rate of return on equity = $\dfrac{\text{₹ 4,10,000}}{\text{₹ 20,00,000}}$ = **20.5%**

**(ii)** Implied required rate of return on equity of B Ltd. is lower than that of A Ltd. because B Ltd. uses less debt in its capital structure. As the equity capitalisation is a linear function of the debt-to-equity ratio when we use the net operating income approach, the decline in required equity return offsets exactly the disadvantage of not employing so much in the way of “cheaper” debt funds.
#### Approach
Under the net operating income approach the firm's value is NOI capitalised at the overall rate, whatever the mix. Split that value into debt and equity by the given percentages; equity earns what is left after interest.

---
item: q4
qno: 4
marks: 10
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: medium
q: 9
a: 10
---
#### Question
The Capital structure of PQR Ltd. is as follows:

| | ₹ |
|---|---:|
| 10% Debenture | 3,00,000 |
| 12% Preference Shares | 2,50,000 |
| Equity Share (face value ₹ 10 per share) | 5,00,000 |
| | 10,50,000 |

Additional Information:

(i) ₹ 100 per debenture redeemable at par has 2% floatation cost & 10 years of maturity. The market price per debenture is ₹ 110.

(ii) ₹ 100 per preference share redeemable at par has 3% floatation cost & 10 years of maturity. The market price per preference share is ₹ 108.

(iii) Equity share has ₹ 4 floatation cost and market price per share of ₹ 25. The next year expected dividend is ₹ 2 per share with annual growth of 5%. The firm has a practice of paying all earnings in the form of dividends.

(iv) Corporate Income Tax rate is 30%.

Required:

Calculate Weighted Average Cost of Capital (WACC) using market value weights.
#### Answer
**Workings:**

1\. Cost of Equity ($K_e$) = $\dfrac{D_1}{P_0 - F} + g = \dfrac{\text{₹ 2}}{\text{₹ 25 - ₹ 4}} + 0.05$ = 0.145 (approx.)

2\. Cost of Debt ($K_d$) = $\dfrac{I(1-t)+\dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

= $\dfrac{10(1-0.3)+\dfrac{(100-98)}{10}}{\dfrac{(100+98)}{2}} = \dfrac{7+0.2}{99}$ = 0.073 (approx.)

3\. Cost of Preference Shares ($K_p$) = $\dfrac{PD+\dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

= $\dfrac{12+\dfrac{(100-97)}{10}}{\dfrac{(100+97)}{2}} = \dfrac{12+0.3}{98.5}$ = 0.125 (approx.)

**Calculation of WACC using market value weights**

| Source of capital | Market Value | Weights | After tax cost of capital | WACC ($K_o$) |
|---|---:|---:|---:|---:|
| | **(₹)** | **(a)** | **(b)** | **(c) = (a) × (b)** |
| 10% Debentures (₹ 110 × 3,000) | 3,30,000 | 0.178 | 0.073 | 0.013 |
| 12% Preference shares (₹ 108 × 2,500) | 2,70,000 | 0.146 | 0.125 | 0.018 |
| Equity shares (₹ 25 × 50,000) | 12,50,000 | 0.676 | 0.145 | 0.098 |
| | 18,50,000 | 1.00 | | **0.129** |

WACC ($K_o$) = **0.129 or 12.9%** (approx.)
#### Approach
Net proceeds are face value less the flotation cost (for equity, the market price less it); use the redemption-yield shortcut for the debenture and the preference share. The weights are market values: price times the number of securities.

---
item: q5
qno: 5
marks: 10
type: descriptive
tags: fm.capbud.npv, fm.capbud.payback, fm.capbud.cashflows
difficulty: medium
q: 11
a: 11-13
---
#### Question
A company wants to buy a machine, and two different models namely A and B are available. Following further particulars are available:

| Particulars | Machine-A | Machine-B |
|---|---:|---:|
| Original Cost (₹) | 8,00,000 | 6,00,000 |
| Estimated Life in years | 4 | 4 |
| Salvage Value (₹) | 0 | 0 |

The company provides depreciation under Straight Line Method. Income tax rate applicable is 30%.

The present value of ₹ 1 at 12% discounting factor and net profit before depreciation and tax are as under:

| Year | Net Profit Before Depreciation and tax | | PV Factor |
|---|---:|---:|---:|
| | **Machine-A ₹** | **Machine-B ₹** | |
| 1. | 2,30,000 | 1,75,000 | 0.893 |
| 2. | 2,40,000 | 2,60,000 | 0.797 |
| 3. | 2,20,000 | 3,20,000 | 0.712 |
| 4. | 5,60,000 | 1,50,000 | 0.636 |

Calculate:

1. NPV (Net Present Value)
2. Discounted pay-back period
3. PI (Profitability Index)

Suggest: Purchase of which machine is more beneficial under Discounted pay-back period method, NPV method and PI method.
#### Answer
**Workings:**

**(i) Calculation of Annual Depreciation**

Depreciation on Machine – A = $\dfrac{\text{₹ 8,00,000}}{4}$ = ₹ 2,00,000

Depreciation on Machine – B = $\dfrac{\text{₹ 6,00,000}}{4}$ = ₹ 1,50,000

**(ii) Calculation of Annual Cash Inflows**

| Particulars | Machine-A (₹) | | | |
|---|---:|---:|---:|---:|
| | **1** | **2** | **3** | **4** |
| Net Profit before Depreciation and Tax | 2,30,000 | 2,40,000 | 2,20,000 | 5,60,000 |
| Less: Depreciation | 2,00,000 | 2,00,000 | 2,00,000 | 2,00,000 |
| Profit before Tax | 30,000 | 40,000 | 20,000 | 3,60,000 |
| Less: Tax @ 30% | 9,000 | 12,000 | 6,000 | 1,08,000 |
| Profit after Tax | 21,000 | 28,000 | 14,000 | 2,52,000 |
| Add: Depreciation | 2,00,000 | 2,00,000 | 2,00,000 | 2,00,000 |
| **Annual Cash Inflows** | **2,21,000** | **2,28,000** | **2,14,000** | **4,52,000** |

| Particulars | Machine-B (₹) | | | |
|---|---:|---:|---:|---:|
| | **1** | **2** | **3** | **4** |
| Net Profit before Depreciation and Tax | 1,75,000 | 2,60,000 | 3,20,000 | 1,50,000 |
| Less: Depreciation | 1,50,000 | 1,50,000 | 1,50,000 | 1,50,000 |
| Profit before Tax | 25,000 | 1,10,000 | 1,70,000 | 0 |
| Less: Tax @ 30% | 7,500 | 33,000 | 51,000 | 0 |
| Profit after Tax | 17,500 | 77,000 | 1,19,000 | 0 |
| Add: Depreciation | 1,50,000 | 1,50,000 | 1,50,000 | 1,50,000 |
| **Annual Cash Inflows** | **1,67,500** | **2,27,000** | **2,69,000** | **1,50,000** |

**(iii) Calculation of PV of Cash Flows**

| | Machine – A | | | | Machine - B | | |
|---:|---:|---:|---:|---:|---:|---:|---:|
| **Year** | **PV of Re 1 @ 12%** | **Cash flow (₹)** | **PV (₹)** | **Cumulative PV (₹)** | **Cash flow (₹)** | **PV (₹)** | **Cumulative PV (₹)** |
| 1 | 0.893 | 2,21,000 | 1,97,353 | 1,97,353 | 1,67,500 | 1,49,578 | 1,49,578 |
| 2 | 0.797 | 2,28,000 | 1,81,716 | 3,79,069 | 2,27,000 | 1,80,919 | 3,30,497 |
| 3 | 0.712 | 2,14,000 | 1,52,368 | 5,31,437 | 2,69,000 | 1,91,528 | 5,22,025 |
| 4 | 0.636 | 4,52,000 | 2,87,472 | 8,18,909 | 1,50,000 | 95,400 | 6,17,425 |

**1\. NPV (Net Present Value)**

**Machine – A**

NPV = ₹ 8,18,909 - ₹ 8,00,000 = **₹ 18,909**

**Machine – B**

NPV = ₹ 6,17,425 – ₹ 6,00,000 = **₹ 17,425**

**2\. Discounted Payback Period**

**Machine – A**

Discounted Payback Period = 3 + $\dfrac{\text{₹ 8,00,000 − ₹ 5,31,437}}{\text{₹ 2,87,472}}$

= 3 + 0.934

= 3.934 years or 3 years 11.21 months

**Machine – B**

Discounted Payback Period = 3 + $\dfrac{\text{₹ 6,00,000 − ₹ 5,22,025}}{\text{₹ 95,400}}$

= 3 + 0.817

= 3.817 years or 3 years 9.80 months

**3\. PI (Profitability Index)**

**Machine – A**

Profitability Index = $\dfrac{\text{₹ 8,18,909}}{\text{₹ 8,00,000}}$ = 1.024

**Machine – B**

Profitability Index = $\dfrac{\text{₹ 6,17,425}}{\text{₹ 6,00,000}}$ = 1.029

**Suggestion**:

| Method | Machine - A | Machine - B | Suggested Machine |
|---|---:|---:|---|
| Net Present Value | ₹ 18,909 | ₹ 17,425 | **Machine A** |
| Discounted Payback Period | 3.934 years | 3.817 years | **Machine B** |
| Profitability Index | 1.024 | 1.029 | **Machine B** |
#### Approach
Turn the profits before depreciation and tax into cash inflows (deduct depreciation for tax, then add it back), discount them and keep a running total: the NPV, the discounted payback and the PI all read off that table.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.intro.role
difficulty: easy
q: 13
a: 14
---
#### Question
State four tasks involved to demonstrate the importance of good Financial Management.
#### Answer
**The best way to demonstrate the importance of good financial management is to describe some of the tasks that it involves:**

- **Taking care** not to over-invest in fixed assets
- **Balancing** cash-outflow with cash-inflows
- **Ensuring** that there is a sufficient level of short-term working capital
- **Setting** sales revenue targets that will deliver growth
- **Increasing** gross profit by setting the correct pricing for products or services
- **Controlling** the level of general and administrative expenses by finding more cost-efficient ways of running the day-to-day business operations, and
- **Tax planning** that will minimize the taxes a business has to pay.
#### Approach
Think of the everyday jobs of a finance function: investment in assets, cash balance, working capital, revenue and pricing, cost control and tax.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.wc.cash
difficulty: easy
q: 13
a: 14
---
#### Question
Explain Electronic Cash Management System.
#### Answer
**Electronic Cash Management System:** Most of the cash management systems now-a-days are electronically based, since ‘speed’ is the essence of any cash management system. Electronically, transfer of data as well as funds play a key role in any cash management system. Various elements in the process of cash management are linked through a satellite. Various places that are interlinked may be the place where the instrument is collected, the place where cash is to be transferred in company’s account, the place where the payment is to be transferred etc.
#### Approach
Start from why speed matters in cash management, then describe how electronic transfer links the places where money is collected, credited and paid.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.capbud.irr
difficulty: easy
q: 13
a: 14
---
#### Question
Define Internal Rate of Return (IRR)
#### Answer
**Internal rate of return:** Internal rate of return for an investment proposal is the discount rate that equates the present value of the expected cash inflows with the initial cash outflow.
#### Approach
Define it as a discount rate and say which two present values it makes equal.

---
item: q6c-or
qno: 6
part: (c)
alt: q6c
marks: none
type: descriptive
tags: fm.sources.long
difficulty: easy
q: 14
a: 14
note: ICAI prints this OR alternative to Q6(c) (2 Marks) with no marks of its own, both in the Suggested Answers (p.14) and in the question paper (paperfile p.8, where the Marks column is empty beside it). Its marks are not inferred.
---
#### Question
Explain in brief the following bonds:

(i) Callable Bonds

(ii) Puttable Bonds
#### Answer
**(i) Callable bonds:** A callable bond has a call option which gives the issuer the **right to redeem the bond before maturity** at a predetermined price known as the call price (Generally at a premium).

**(ii) Puttable bonds:** Puttable bonds give the investor a put option (i.e. the **right to sell** the bond) back to the company before maturity.
#### Approach
Ask who holds the option in each bond, the issuer or the investor, and what it lets them do before maturity.
