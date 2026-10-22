<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p6-pyq-sep2025
paper: p6
section: fm
kind: pyq
attempt: sep2025
qfile: new/p6/pyq-sep2025-a.pdf
afile: new/p6/pyq-sep2025-a.pdf
paperfile: new/p6/pyq-sep2025-q.pdf
choice: q1; any 2 of q2-q4
q: 1, 8
status: checked
by: tx-05
date: 2026-10-20
accept: 9, 10, 11, 12, 13, 14, 15, 16, 16
note: Section A (Financial Management) of ICAI's Suggested Answers, which reproduce every question before its answer (qfile and afile); the question-paper scan (paperfile) holds Part II only and was not used for the text. Section B is the SM import's file (n-p6-pyq-sep2025.sm.md). Part I: ICAI prints MCQs 1 to 8 (Financial Management) and 9 to 16 (Strategic Management) in one run and answers them only in one Answer Key table on p.7 (correct option, no workings), so the MCQ items carry the key and no Answer text. Instructions: the Part headings (p.1, p.8) and Section A's instructions printed on p.8. Accepted numbers: 6 is the paper's title on p.1 (PAPER – 6); 1 to 4 are the Part II question numbers, which the Suggested Answers print once (Question N, before the reproduced question) and not again before the answer, while check.py expects them on the answer side too; 9 to 16 (16 twice) are on p.7, which is shared with Section B: MCQ 16 and the Answer Key rows 9 to 16 belong to the SM file; 8 is the numerator of 8/45 in the Q1(a) answer, the first line of p.10, which check.py takes for a page number; 0 (six times), 20 (four times), 50 and 55 against 20,20,000 (twice), 50,00,000 and 55,00,000 are the stacked fractions of Q1(b)(ii) and (iii) on p.11, which ICAI's equation typesetting spaces as 20, 20, 000 / 55, 00, 000 / 50, 00, 000 in the text layer; the rendered page reads 20,20,000, 55,00,000 and 50,00,000. Marks: Q1(a) (2 + 1 + 2 = 5 Marks) and Q1(b) (1 x 5 = 5 Marks) are one item each (see their notes); Q2(a), Q2(b) and Q3(b) are split per requirement as ICAI marks and answers them. ICAI's text kept as printed: the Q2(a) and Q2(b) data tables (see the case notes), Taxes @ 40% in the Q3(a) answer against the 30% of the question, and the label of Q4 "Answer the following:" is left out as a heading (it introduces (a) to (c) and carries no content).
---
#### Instructions
**Part I – Multiple Choice Questions**

**Part II – Descriptive Questions**

**SECTION A: FINANCIAL MANAGEMENT**

Question No. **1** is compulsory.

Attempt any **two** questions out of the remaining **three** questions.

In case, any candidate answers extra question(s)/ sub-question(s) over and above the required number, then only the requisite number of questions first answered in the answer book shall be valued and subsequent extra question(s) answered shall be ignored.

Working notes should form part of the answer.

---
case: c1
qno: 1-5
label: Case Scenario - I
q: 1
a: 7
---
#### Case
RG Limited has estimated that number of operating cycle in year 2025-26 will be 3.

The amount of working capital required after taking an estimated 5% unforeseen contingency is ₹ 1,01,850. Other information is as under:

Opening stock of Finished goods is ₹ 31,100 and the closing stock will be lesser by ₹ 4,200 from the opening stock.

Opening stock of Raw Material is ₹ 24,450 and Closing stock of Raw material will be ₹ 28,200.

Opening stock of Work in Progress is ₹ 20,500 and Closing stock of Work in Progress will be more by ₹ 1,800 from the Opening stock.

Wages and Manufacturing expenses during the year will be ₹ 1,12,800.

Selling and Distribution expenses during the year will be ₹ 30,000.

Average Creditors for the year is ₹ 26,170.

All Purchases will be done on credit basis only.

Assume a 360 days year.

Using above information, you are required to answer the following questions 1 to 5:

---
item: m1
case: c1
qno: 1
marks: 2
type: mcq
key: B
tags: fm.wc.basics, fm.wc.estimate
difficulty: medium
q: 1
a: 7
---
#### Question
What will be the Total Operating Expenses and Cost of Goods Sold for the year?
#### Options
(A) ₹ 2,61,000 and ₹ 2,91,000
(B) ₹ 2,91,000 and ₹ 2,61,000
(C) ₹ 2,75,500 and ₹ 2,61,000
(D) ₹ 2,58,500 and ₹ 2,88,000
#### Approach
Strip the 5% contingency out of the working capital first, then use the number of operating cycles to get the year's total operating expenses; cost of goods sold is what is left after selling and distribution expenses.

---
item: m2
case: c1
qno: 2
marks: 2
type: mcq
key: D
tags: fm.wc.basics
difficulty: medium
q: 2
a: 7
---
#### Question
What will be the Cost of Production and Finished Goods storage period?
#### Options
(A) ₹ 2,58,600 and 45 Days
(B) ₹ 2,58,600 and 40 Days
(C) ₹ 2,56,800 and 45 Days
(D) ₹ 2,56,800 and 40 Days
#### Approach
Cost of production is cost of goods sold adjusted for the change in finished goods stock; the storage period uses average finished goods stock against cost of goods sold.

---
item: m3
case: c1
qno: 3
marks: 2
type: mcq
key: C
tags: fm.wc.basics
difficulty: medium
q: 2
a: 7
---
#### Question
What will be the Raw Material Consumed and Credit purchases?
#### Options
(A) ₹ 1,52,500 and ₹ 1,50,550
(B) ₹ 1,49,500 and ₹ 1,52,500
(C) ₹ 1,45,800 and ₹ 1,49,550
(D) ₹ 1,52,000 and ₹ 1,45,800
#### Approach
Work backwards from cost of production: take out wages and manufacturing expenses and the change in work in progress to reach materials consumed, then adjust for the change in raw material stock to reach purchases.

---
item: m4
case: c1
qno: 4
marks: 2
type: mcq
key: B
tags: fm.wc.basics
difficulty: medium
q: 2
a: 7
---
#### Question
What will be the Raw material storage period and Work in Progress conversion period?
#### Options
(A) 62 Days and 32 Days
(B) 65 Days and 30 Days
(C) 63 Days and 33 Days
(D) 63 Days and 45 Days
#### Approach
Average stock divided by the daily figure each stage is measured against (materials consumed for raw material, cost of production for work in progress), on a 360-day year.

---
item: m5
case: c1
qno: 5
marks: 2
type: mcq
key: B
tags: fm.wc.basics
difficulty: medium
q: 2
a: 7
---
#### Question
What will be the Creditors Payment period and Debtors Collection period?
#### Options
(A) 60 Days and 50 Days
(B) 63 Days and 48 Days
(C) 62 Days and 45 Days
(D) 65 Days and 47 Days
#### Approach
The creditors period comes from average creditors and credit purchases; the debtors period is what remains of the operating cycle's length once the other periods are known.

---
item: m6
qno: 6
marks: 2
type: mcq
key: A
tags: fm.cs.theories
difficulty: medium
q: 2-3
a: 7
---
#### Question
PRAX Ltd. is an all-equity financed company, currently valued at ₹ 2,100 lakhs, with a cost of capital of 18%. The company is contemplating a strategic financial restructuring by:

(i) Repurchasing ₹ 325 lakhs of equity shares.

(ii) Replacing the repurchased equity with 16% debentures.

The Company maintains constant Earnings Before Interest and Taxes (EBIT) and following a policy of distributing entire earnings as dividend. Corporate tax rate is 35%.

What would be the market value of Equity after structure modification as per Modigliani and Miller (MM) Approach?
#### Options
(A) ₹ 1,888.75 Lakh
(B) ₹ 2,213.75 Lakh
(C) ₹ 1,456.75 Lakh
(D) ₹ 2,538.75 Lakh
#### Approach
Under MM with taxes the levered firm is worth the unlevered value plus the tax shield on the debt; the equity is that value less the debt.

---
item: m7
qno: 7
marks: 2
type: mcq
key: C
tags: fm.capbud.npv
difficulty: medium
q: 3
a: 7
---
#### Question
KL Limited is replacing an existing machine. The replacement cost of the machine is ₹ 1,00,000 now and it requires maintenance of ₹ 20,000 at the end of every year for five years. At the end of Fifth year, it would have a salvage value of 10,000. The cost of capital is 14%.

$\text{PVIFA}_{0.14,5}$ is 3.433 and $\text{PVIF}_{0.14,5}$ is 0.519.

What will be the Equivalent Annual Cost (EAC) for the machine?
#### Options
(A) ₹ 57,617
(B) ₹ 45,217
(C) ₹ 47,617
(D) ₹ 60,217
#### Approach
Find the present value of all costs net of the discounted salvage value, then spread it over the five years with the annuity factor.

---
item: m8
qno: 8
marks: 1
type: mcq
key: A
tags: fm.ratio.liquidity, fm.ratio.prepare
difficulty: easy
q: 3
a: 7
---
#### Question
ABC Limited gives you the following information as on 31st March, 2025:

Current Liability : ₹ 1,60,000

Current ratio : 2.5

Liquid ratio (Quick ratio): 2

What will be the value of Stock?
#### Options
(A) ₹ 80,000
(B) ₹ 1,20,000
(C) ₹ 1,60,000
(D) ₹ 64,000
#### Approach
The two ratios share the same current liabilities, so the stock is the gap between current assets and liquid assets.

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.coc.wacc, fm.coc.equity, fm.coc.debt
difficulty: medium
q: 8
a: 9-10
note: ICAI prints the marks as (2 + 1 + 2 = 5 Marks) for requirements (i) to (iii); its answer gives (i) to (iii) and then an alternative (ii) and (iii) taking the current market price, so it does not split cleanly at the requirements and is one item of 5 marks.
---
#### Question
The capital structure of RSA Limited is as under:

| | (₹) |
|---|---:|
| Equity Shares (₹ 10 per share) | 1,00,00,000 |
| 8% Irredeemable Preference Shares (₹100 per share) | 5,00,00,000 |

Additional Information:

(i) Equity shares are quoted at ₹ 60 each and a new issue priced at ₹ 60 will be fully subscribed; flotation cost will be ₹ 4 per share.

(ii) Issue price of the 8% Irredeemable preference shares was ₹ 45.

(iii) Current market price of the 8% irredeemable preference shares is ₹ 55.

RSA Limited has been paying dividend to its equity shareholders at a constant growth rate of 5% per year and the dividend paid this year was ₹ 2 per equity share.

You are required to calculate:

(i) The cost of equity using Gordon's model

(ii) The cost of the irredeemable preference share

(iii) The weighted average cost of capital using market value weights.
#### Answer
(i) $K_e = \dfrac{D_1}{P_0 - F} + g$

$= \dfrac{2(1 + 0.05)}{60 - 4} + 5$

= 8.75%

(ii) $K_P = \dfrac{PD}{P_0}$

$= \dfrac{8}{45}$

= 17.78%

(iii) **Calculation of WACC using market value weights**

| Source of capital | Market Value | Weights | Cost of capital | WACC ($K_o$) |
|---|---:|---:|---:|---:|
| | **(₹)** | **(a)** | **(b)** | **(c) = (a)×(b)** |
| Equity shares | 6,00,00,000 | 0.6857 | 0.0875 | 0.0600 |
| Preference shares | 2,75,00,000 | 0.3143 | 0.1778 | 0.0559 |
| | 8,75,00,000 | 1 | | 0.1159 |

WACC ($K_o$) = 0.1159% or 11.59%

If $P_0$ is taken as current market price for calculation of preference share

(ii) $K_P = \dfrac{PD}{P_0}$

$= \dfrac{8}{55}$

= 14.55%

(iii) **Calculation of WACC using market value weights**

| Source of capital | Market Value | Weights | Cost of capital | WACC ($K_o$) |
|---|---:|---:|---:|---:|
| | **(₹)** | **(a)** | **(b)** | **(c) = (a)×(b)** |
| Equity shares | 6,00,00,000 | 0.6857 | 0.0875 | 0.06 |
| Preference shares | 2,75,00,000 | 0.3143 | 0.1455 | 0.0457 |
| | 8,75,00,000 | 1 | | 0.1057 |

WACC ($K_o$) = 0.1057% or 10.57%
#### Approach
Gordon's model needs next year's dividend and the net proceeds after flotation cost; the weights are market values, so value each class at its market price first.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.ratio.profit, fm.ratio.activity
difficulty: easy
q: 8-9
a: 11-12
note: ICAI prints the marks as (1 x 5 = 5 Marks) for requirements (i) to (v), which all rest on the income statement of (i); one item of 5 marks.
---
#### Question
Diwan Limited has outlined its financial projections for the fiscal year 2025-26. The company plans to utilize total assets amounting to ₹ 50,00,000, with 35% of assets financed through debt at interest rate of 10.50% per annum. Projected sales revenue is ₹ 55,00,000. Direct costs are estimated at ₹ 30,00,000 and other operating expenses are estimated at ₹ 4,80,000. The applicable tax rate is 33%

You are required to calculate:

(i) Profit After Tax (PAT)

(ii) Net profit margin (After tax)

(iii) Return on Assets (After tax)

(iv) Asset turnover ratio

(v) Return on Equity
#### Answer
(i) **Income Statement**

| Particulars | (₹) |
|---|---:|
| Sales | 55,00,000 |
| *Less:* Direct Cost | 30,00,000 |
| Gross Profit | 25,00,000 |
| *Less:* Operating Expenses | 4,80,000 |
| EBIT | 20,20,000 |
| *Less:* Interest (50,00,000 x 35% x 10.5%) | 1,83,750 |
| Profit Before Tax | 18,36,250 |
| *Less:* Tax @ 33% | 6,05,963 |
| Profit After Tax | 12,30,287 |

(ii) Net Profit Margin after tax $= \dfrac{\text{Net Profit after taxes}}{\text{Sales}}$

$= \dfrac{12{,}30{,}287}{55{,}00{,}000} = 22.37\%$

**OR**

$= \dfrac{\text{EBIT}(1 - t)}{\text{Sales}}$

$= \dfrac{20{,}20{,}000\ (1 - 0.33)}{55{,}00{,}000} = 24.61\%$

(iii) Return on Assets (ROA) $= \dfrac{\text{EBIT}(1 - t)}{\text{Average total assets}}$

$= \dfrac{20{,}20{,}000\ (1 - 0.33)}{50{,}00{,}000} = 27.07\%$

(iv) Asset turnover $= \dfrac{\text{Sales}}{\text{Assets}} = \dfrac{55{,}00{,}000}{50{,}00{,}000} = 1.1 \text{ times}$

(v) Return on equity $= \dfrac{\text{Net Profit after taxes}}{\text{Owners' equity}}$

$= \dfrac{₹\ 12{,}30{,}287}{65\% \text{ of } ₹\ 50{,}00{,}000}$

$= \dfrac{12{,}30{,}287}{32{,}50{,}000} = 37.85\%$
#### Approach
Build the income statement down to profit after tax first (interest is on the 35% of assets financed by debt); equity is the other 65% of assets.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: hard
q: 9
a: 12-13
---
#### Question
Global Beverage Corporation is considering replacing one of its bottling machines with a newer and more efficient model. The existing machine was purchased five years ago for ₹ 16,00,000 and has a total useful life of ten years. Currently, the company can sell this machine for ₹ 9,60,000. The new machine costs ₹ 32,00,000 having an estimated salvage value of ₹ 3,20,000 and a useful life of five years. With the new machine, annual contribution margin is projected to increase from ₹ 16,00,000 to ₹ 18,40,000 and operating efficiencies are expected to yield further annual savings of ₹ 3,20,000. Depreciation is calculated on a straight-line method over the machine's five-year life. The company's cost of capital is 12% and corporate tax rate is 33%.

You are required to calculate the Net Present Value of new machine.

Given: $\text{PVIFA}_{0.12,5}$ is 3.605 and $\text{PVIF}_{0.12,5}$ is 0.567
#### Answer
**Calculation of Net Initial Cash Outflows:**

| Particulars | ₹ |
|---|---:|
| Cost of new machine | 32,00,000 |
| *Less:* Sale proceeds of existing machine | (9,60,000) |
| *Add:* Tax paid on sale of existing machine {(9,60,000 – 8,00,000) x 33%} | 52,800 |
| Net initial cash outflows | 22,92,800 |

**Calculation of Net Present Value of new machine**

| Particulars | ₹ |
|---|---:|
| Incremental Contribution | 2,40,000 |
| *Add:* Cost saving | 3,20,000 |
| **Savings** | **5,60,000** |
| *Less:* Incremental Depreciation {5,76,000-1,60,000) | 4,16,000 |
| Incremental Profit Before Tax | 1,44,000 |
| *Less:* Tax @ 33% | 47,520 |
| Profit After Tax | 96,480 |
| *Add:* Depreciation | 4,16,000 |
| Cash Inflow | 5,12,480 |
| PVIFA | 3.605 |
| **PV of Cash Inflow** | **18,47,490** |
| *Add:* PV of Salvage Value of new machine (₹ 3,20,000 x 0.567) | 1,81,440 |
| **Total PV of Cash Inflow** | **20,28,930** |
| *Less:* Initial Cash Outflow | 22,92,800 |
| **NPV** | **(2,63,870)** |

**If Tax on sale of existing machine is not taken**

**Calculation of Net Initial Cash Outflows:**

| Particulars | ₹ |
|---|---:|
| Cost of new machine | 32,00,000 |
| *Less:* Sale proceeds of existing machine | (9,60,000) |
| Net initial cash outflows | 22,40,000 |

Accordingly, NPV Will be ₹ 20,28,930 - ₹ 22,40,000 = (₹ 2,11,070)
#### Approach
Net the sale of the old machine (and the tax on its gain over book value) against the new machine's cost, then discount the incremental after-tax cash flows, depreciation being the difference between the two machines' charges.

---
case: c2
qno: 2
q: 13
note: ICAI prints the marks as (1 + 1 + 2 + 2 + 1 = 7 Marks), one per requirement, and answers each requirement under its own label: one item per requirement. ICAI's table prints the row "Corporate Tax Rate" twice, with 3.84 and with 30%; its answer uses 3.84 as the combined leverage. Transcribed as printed.
---
#### Case
M/s KRY Limited is a mid-sized company engaged in manufacturing and sales of Industrial equipment. The capital structure of the company is as under:

| | |
|---|---:|
| Equity Share Capital (12,500 Shares of ₹100 each) | ₹12,50,000 |
| 6% Debentures | ₹ 50,00,000 |
| 8% Bank of Loan | XXXXX |
| Other information are as under: | |
| Total Sales | ₹ 75,00,000 |
| P/V Ratio | 40% |
| Operating Leverage | 2.4 |
| Corporate Tax Rate | 3.84 |
| Corporate Tax Rate | 30% |
| P/E Ratio | 8 |

You are required to calculate following:

---
item: q2a-i
case: c2
qno: 2
part: (a)(i)
marks: 1
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 13
a: 14
---
#### Question
Earnings Before Interest and Tax
#### Answer
Operating Leverage $= \dfrac{\text{Contribution}}{\text{EBIT}}$

2.4 $= \dfrac{75{,}00{,}000 \text{ x } 0.40}{\text{EBIT}}$

EBIT = 12,50,000
#### Approach
Contribution comes from sales and the P/V ratio; operating leverage links contribution to EBIT.

---
item: q2a-ii
case: c2
qno: 2
part: (a)(ii)
marks: 1
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 13
a: 14
---
#### Question
Fixed Cost excluding interest
#### Answer
Fixed Cost excluding interest= Contribution – EBIT

= 30,00,000 – 12,50,000 = 17,50,000

---
item: q2a-iii
case: c2
qno: 2
part: (a)(iii)
marks: 2
type: descriptive
tags: fm.lev.leverage
difficulty: medium
q: 13
a: 14
---
#### Question
Amount of Bank Loan and Bank Interest
#### Answer
Combined Leverage $= \dfrac{\text{Contribution}}{\text{EBT}}$

3.84 $= \dfrac{30{,}00{,}000}{\text{EBT}}$

EBT = 7,81,250

Total Interest = EBIT – EBT = 4,68,750

Interest on bank loan = Total Interest – Interest on debentures

= 4,68,750 – 3,00,000 = 1,68,750

Amount of bank loan = 1,68,750/8%

= 21,09,375
#### Approach
Combined leverage gives EBT; the gap between EBIT and EBT is the total interest, and what the debentures do not account for is the bank's.

---
item: q2a-iv
case: c2
qno: 2
part: (a)(iv)
marks: 2
type: descriptive
tags: fm.lev.leverage, fm.ratio.profit
difficulty: easy
q: 13
a: 15
---
#### Question
Earning Per Share
#### Answer
| Particulars | (₹) |
|---|---:|
| EBT (Earnings before tax) | 7,81,250 |
| *Less:* Tax @ 30% | 2,34,375 |
| PAT (Profit after tax) | 5,46,875 |
| No. of shares | 12,500 |
| Earnings per share (EPS) | 43.75 |

---
item: q2a-v
case: c2
qno: 2
part: (a)(v)
marks: 1
type: descriptive
tags: fm.ratio.profit
difficulty: easy
q: 13
a: 15
---
#### Question
Market Price Per Share
#### Answer
Market price per share = EPS x PE Ratio

= 43.75 x 8 = 350

---
case: c3
qno: 2
q: 13-14
note: ICAI prints the marks as (2 + 1 = 3 Marks) and answers (i) and (ii) under their own labels: one item each. ICAI's table prints ₹ 159.09 against "Cost of Capital" and 8% against "Market price per share using Gordon’s Model"; its answer uses 159.09 as the market price and 8% as the cost of capital. Transcribed as printed.
---
#### Case
Saraswati Ltd. has started its business a year back with a paid-up equity capital of ₹ 50,00,000. The other details are as under:

| | |
|---|---:|
| Earnings of company | ₹ 5,00,000 |
| Cost of Capital | ₹ 159.09 |
| Market price per share using Gordon’s Model | 8% |
| Internal rate of return on investment | 12% |
| Number of shares | 50,000 |

You are required to:

---
item: q2b-i
case: c3
qno: 2
part: (b)(i)
marks: 2
type: descriptive
tags: fm.div.models
difficulty: medium
q: 14
a: 15
---
#### Question
Calculate the Dividend paid per share using Gordon's Model.
#### Answer
$P_0 = \dfrac{E(1-b)}{K_e - br}$

159.09 $= \dfrac{10(1-b)}{0.08 - 0.12b}$

159.09(0.08−0.12b) = 10(1−b)

12.7272−10 = 19.0908b−10b

2.7272 = 9.0908b

B (retained earning ratio) = 0.30

Dividend payout ratio= (1-b) = 0.70

Dividend per share = EPS x (1−b) = 10×0.70 = ₹ 7
#### Approach
Put the market price, earnings per share, r and the cost of capital into Gordon's formula and solve it for the retention ratio b.

---
item: q2b-ii
case: c3
qno: 2
part: (b)(ii)
marks: 1
type: descriptive
tags: fm.div.models
difficulty: easy
q: 14
a: 15
---
#### Question
What will be Optimum dividend pay-out ratio according to Gordon's Model when r = $K_e$?
#### Answer
When r = $K_e$, There is no optimum ratio

---
item: q3a
qno: 3
part: (a)
marks: 7
type: descriptive
tags: fm.cs.ebiteps
difficulty: medium
q: 15-16
a: 16-17
note: The question states a tax rate of 30%; ICAI's answer computes "Taxes @ 40%". Transcribed as printed.
---
#### Question
AVS Limited is planning to diversify its cotton manufacturing business. The Chief Financial Officer (CFO) intends to raise fund of ₹ 22,00,000 for this project. The current estimates of Earnings Before Interest and Taxes (EBIT) from the new project are ₹ 5,00,000 per annum. The company's share is currently selling at ₹ 120 and is expected to decline to ₹ 110, in case the funds are borrowed more than ₹ 10,00,000. It is stated that the cost of debt will be 14% up to ₹ 8,00,000, 16% for additional amount of ₹ 2,00,000 above ₹ 8,00,000 and 18% for additional amount above ₹ 10,00,000. The tax rate applicable to the company is 30%. the following options are in consideration of the company.

| Option | Debt | Equity |
|---|---:|---:|
| I | 60% | 40% |
| II | 50% | 50% |
| III | 40% | 60% |

Considering the objective of maximising Earning Per Share (EPS), which option of financing should the company choose?
#### Answer
| Particulars | Options | | |
|---|---:|---:|---:|
| | **Option-I: 60% Debt** | **Option-II: 50% Debt** | **Option-III: 40% Debt** |
| | **₹** | **₹** | **₹** |
| Debt | 13,20,000 | 11,00,000 | 8,80,000 |
| Equity | 8,80,000 | 11,00,000 | 13,20,000 |
| EBIT | 5,00,000 | 5,00,000 | 5,00,000 |
| Interest on Debts: | | | |
| - on debt upto ₹ 8 lacs @14% | (1,12,000) | (1,12,000) | (1,12,000) |
| - on debt above 8 lacs and upto 10 lacs @ 16% | (32,000) | (32,000) | (12,800) |
| - on debt above 10 lacs @ 18% | (57,600) | (18,000) | --- |
| Profit before taxes | 2,98,400 | 3,38,000 | 3,75,200 |
| Taxes @ 40% | (89,520) | (1,01,400) | (1,12,560) |
| Profit after taxes | 2,08,880 | 2,36,600 | 2,62,640 |
| Number of shares | 8,000 | 10,000 | 11,000 |
| **Earnings per share** | **26.11** | **23.66** | **23.88** |

Since Option 1 i.e 60% debt provide the maximum EPS, company should choose Option 1 (60% debt and 40% equity) for financing.
#### Approach
For each option split the ₹ 22,00,000 into debt and equity, apply the interest slabs to the debt and the right share price (it falls once debt passes ₹ 10,00,000) to the equity, then compare EPS.

---
case: c4
qno: 3
q: 16
note: ICAI prints the marks as (2 + 1 = 3 Marks) and answers (i) and (ii) under their own labels: one item each.
---
#### Case
A company issues 20,000, 18% Debentures of ₹100 each. The debentures are redeemable after a period of 8 years. The cost of debentures using approximation method is 14.58%. The corporate tax rate is 30%. You are required to calculate:

---
item: q3b-i
case: c4
qno: 3
part: (b)(i)
marks: 2
type: descriptive
tags: fm.coc.debt
difficulty: medium
q: 16
a: 17
---
#### Question
Issue price of the Debentures, if redeemable at par.
#### Answer
Cost of Redeemable Debenture ($K_d$) $= \dfrac{I(1-t) + \dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

0.1458 $= \dfrac{18(1-0.3) + \dfrac{(100-NP)}{8}}{\dfrac{(100+NP)}{2}}$

0.1458 $= \dfrac{(100.8+100-NP)\times 2}{800+8NP}$

116.64 + 1.166NP = 401.6 – 2NP

3.166 NP = 284.96

NP = 90
#### Approach
Write the approximation formula with the issue price (net proceeds) as the unknown and solve it.

---
item: q3b-ii
case: c4
qno: 3
part: (b)(ii)
marks: 1
type: descriptive
tags: fm.coc.debt
difficulty: easy
q: 16
a: 17
---
#### Question
Revised Cost of Debentures using approximation method, if redeemable at 10% Premium after 8 years.
#### Answer
Revised Cost of Redeemable Debenture ($K_d$) $= \dfrac{I(1-t) + \dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

$= \dfrac{18(1-0.3) + \dfrac{(110-90)}{8}}{\dfrac{(110+90)}{2}}$

= 15.1%

---
item: q4a
qno: 4
part: (a)
marks: 4
type: descriptive
tags: fm.div.basics
difficulty: easy
q: 18
a: 18
---
#### Question
Discuss any 2 advantages and limitations of Stock Splits.
#### Answer
**Advantages of Stock Splits**

1. It makes the share affordable to small investors.
2. Number of shares may increase the number of shareholders; hence the potential of investment may increase.

**Limitations of Stock Splits**

1. Additional expenditure needs to be incurred on the process of stock split.
2. Low share price may attract speculators or short term investors, which are generally not preferred by any company

---
item: q4b
qno: 4
part: (b)
marks: 4
type: descriptive
tags: fm.sources.modern, fm.sources.long
difficulty: easy
q: 18
a: 18-19
---
#### Question
Explain in brief the following types of bonds:

(i) Callable Bonds

(ii) Puttable Bonds

(iii) Masala Bonds

(iv) Drop Lock Bonds
#### Answer
(i) **Callable bonds:** A callable bond has a call option which gives the issuer the right to redeem the bond before maturity at a predetermined price known as the call price (Generally at a premium).

(ii) **Puttable bonds:** Puttable bonds give the investor a put option (i.e. the right to sell the bond) back to the company before maturity.

(iii) **Masala Bonds:** Masala (means spice) bond is an Indian name used for Rupee denominated bond that Indian corporate borrowers can sell to investors in overseas markets.

(iv) **Drop Lock Bond**: It is a Floating Rate Note with a normal floating rate. The floating rate bond would be automatically converted into fixed rate bond if interest rate falls below a predetermined level. The new fixed rate stays till the drop lock bond reaches its maturity.
#### Approach
For each bond, say who holds the option (issuer or investor) or what is special about it (currency, conversion of the rate).

---
item: q4c
qno: 4
part: (c)
marks: 2
type: descriptive
tags: fm.intro.role
difficulty: easy
q: 18
a: 19
---
#### Question
Explain two basic functions of Financial Management.
#### Answer
**Basic function of financial management:**

(a) **Investment decisions (I)**: These decisions relate to the selection of assets in which funds will be invested by a firm.

(b) **Financing decisions (F):** These decisions relate to acquiring the optimum finance to meet financial objectives and seeing that fixed and working capital are effectively managed.

(c) **Dividend decisions (D):** These decisions relate to the determination as to how much and how frequently cash can be paid out of the profits of an organisation as income for its owners/shareholders.

(d) **Working Capital Management (WCM):** Generally short term decision are reduced to management of current asset and current liability

---
item: q4c-or
qno: 4
part: (c)
marks: 2
type: descriptive
alt: q4c
tags: fm.intro.objectives
difficulty: easy
q: 18
a: 19
note: ICAI prints this as an OR alternative to Q4(c), with its own (2 Marks).
---
#### Question
Explain any two limitations of profit maximization objective of Financial Management.
#### Answer
**Limitations of profit maximisation objective:**

(i) The term profit is vague. It does not clarify what exactly it means.

(ii) Profit maximisation has to be attempted with a realisation of risks involved.

(iii) Profit maximisation as an objective does not take into account the time pattern of returns.

(iv) Profit maximisation as an objective is too narrow.
