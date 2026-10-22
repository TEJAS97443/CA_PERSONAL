<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-pyq-nov2023
paper: p8
kind: pyq
attempt: nov2023
qfile: old/p8/pyq-nov2023-a.pdf
afile: old/p8/pyq-nov2023-a.pdf
paperfile: old/p8/pyq-nov2023-q.pdf
choice: q1; any 4 of q2-q6
minutes: 108
q: 1
accept: 2023, 2023, 2023, 2023
status: checked
by: tx-36
date: 2026-10-20
note: Old-scheme Paper 8 (Financial Management and Economics for Finance), November 2023: Section A (Financial Management, 60 marks) only, transcribed from ICAI's Suggested Answers (qfile and afile, pp.1-18), which reproduce every question before its answer; Section B (Economics for Finance, from p.19) is not part of PassBook. The question-paper scan (OCR text) is linked as paperfile and was not used for the text. Instructions: the Section A box on p.1, which gives the choice rule. minutes: 108 is ours (ICAI's 3 hours for the 100-mark paper, pro rata for Section A's 60 marks). Q1(c)(i) and (ii) carry their own marks (2 and 3) and are separate items; Q6(c) has an OR alternative (q6c-or). ICAI's text kept as printed: "Form the above information" (q1a), "K Textiles Lid," (q2), "0 .7843" (q1b), "upto" (q4). Accepted numbers (check.py): the running heads of pp.1-18 are not dropped by check.py because ICAI prints them in three variants across the 28 pages ("PAPER – 8 : …" with the page number on odd pages 3-17, "PAPER 8: …" in Section B, "INTERMEDIATE EXAMINATION: NOVEMBER, 2023" on even pages 2-18 but "NOVEMBER 2023" without the comma in Section B), so no variant reaches check.py's 40 % threshold; the accepted 8s (six) are the "PAPER – 8" of the title on p.1 and the heads of pp.3, 5, 7, 9 plus page number 8; 2023 (four) is the even-page head; 3 to 18 are the page numbers of pp.3-18; 1, 3, 4, 5 and 6 are also question numbers, which the Suggested Answers print once ("Question N" before the reproduced question) while check.py expects them on the answer side too (qno 2 is offset by the page number 2).
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
tags: fm.ratio.prepare, fm.ratio.activity
difficulty: medium
q: 1
a: 2-3
---
#### Question
You are available with following information of Brave Ltd:

| | |
|---|---|
| Debtor’s velocity | 3 months |
| Stock velocity | 6 months |
| Creditor’s velocity | 2 months |
| Gross profit ratio | 20% |

The gross profit for the year ended 31st March,2023 was ₹ 10,00,000. Stock for the same period was ₹ 40,000 more than what it was at the beginning of the year. Bills receivable were ₹ 1,20,000.

Form the above information you are required to calculate:

(i) Sales

(ii) Sundry debtors

(iii) Closing stock
#### Answer
**(i) Determination of Sales:**

Gross Profit Ratio = $\dfrac{\text{Gross Profit}}{\text{Sales}} \times 100$

Or, $\dfrac{20}{100}$ = $\dfrac{\text{₹ } 10{,}00{,}000}{\text{Sales}}$

Or, Sales = $\dfrac{10{,}00{,}00{,}000}{20}$ = ₹ 50,00,000

Cost of Goods Sold = Sales – Gross Profit

= ₹ 50,00,000 - ₹ 10,00,000 = ₹ 40,00,000

**(ii) Determination of Sundry Debtors:**

Debtors’ velocity is 3 months or Debtors’ collection period is 3 months,

So, Debtors’ turnover ratio = $\dfrac{12 \text{months}}{3 \text{months}}$ = 4

Debtors’ turnover ratio = $\dfrac{\text{Credit Sales}}{\text{Average Accounts Receivable}}$

= $\dfrac{\text{₹ } 50{,}00{,}000}{\text{Bills Receivable + Sundry Debtors}}$ = 4

Or, Sundry Debtors + Bills receivable = ₹ 12,50,000

Sundry Debtors = ₹ 12,50,000 – ₹ 1,20,000 = ₹ 11,30,000

**(iii) Determination of Closing Stock**

Stock velocity is 6 months so Stock Turnover Ratio=2

Stock Turnover Ratio = $\dfrac{\text{Cost of Goods Sold}}{\text{Average Stock}} = \dfrac{\text{₹ } 40{,}00{,}000}{\text{Average Stock}}$ =2

So, Average Stock = ₹ 20,00,000

Now Average Stock = $\dfrac{\text{Opening Stock + Closing Stock}}{2}$

Or $\dfrac{\text{Opening Stock + (Opening Stock + ₹ 40,000)}}{2}$ = ₹ 20,00,000

Or, Opening Stock + ₹ 20,000 = ₹ 20,00,000

Or, Opening Stock = ₹ 19,80,000

So, Closing Stock = ₹ 19,80,000 + ₹ 40,000 = ₹ 20,20,000
#### Approach
Turn each velocity into a turnover ratio (12 months divided by the period). Sales comes from the gross profit ratio; remember that bills receivable are part of the receivables that the debtors' turnover is measured on.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.lev.leverage, fm.ratio.activity
difficulty: medium
q: 1-2
a: 3-4
---
#### Question
The following details of Shiva Ltd. for the year ended 31st March,2023 are given below:

| | |
|---|---:|
| Operating Leverage | 1.4 |
| Combined Leverage | 2.8 |
| Fixed Cost (Excluding Interest) | ₹ 2.04 lakhs |
| Sales | ₹ 30 lakhs |
| 12% Debentures of ₹ 10 each | ₹ 21.25 lakhs |
| Equity Share Capital of ₹ 10 each | ₹ 17.00 lakhs |
| Income Tax Rate | 30% |

**Required:**

(i) Calculate P/V ratio and Earning Per Share (EPS)

(ii) If the company belongs to an industry, whose assets turnover is 1.5, does it have a high or low assets turnover?

(iii) Financial Leverage
#### Answer
**(i) P/V Ratio and Earning per share (EPS)**

Operating leverage = $\dfrac{\text{Contribution(C)}}{\text{Contribution - Fixed Cost (FC)}}$

1.4 = $\dfrac{\text{C}}{\text{C - 2,04,000}}$

Or, C = 1.4 (C – 2,04,000)

Or, C = 1.4 C – 2,85,600

Or, Contribution = ₹ 7,14,000

Now, P/V ratio = $\dfrac{\text{Contribution (C)}}{\text{Sales (S)}} \times 100 = \dfrac{7{,}14{,}000}{30{,}00{,}000} \times 100$ = 23.8%

Therefore, P/V Ratio = 23.80%

EBT = Contribution – Fixed Cost – Interest

= ₹ 7,14,000 – ₹ 2,04,000 – (12% × ₹ 21,25,000)

= ₹ 5,10,000 – ₹ 2,55,000

= ₹ 2,55,000

PAT = EBT(1-T) = ₹ 2,55,000(1-0.3) = ₹ 1,78,500

EPS = $\dfrac{\text{Profit after tax}}{\text{No. of equity shares}}$

EPS = $\dfrac{\text{₹ } 1{,}78{,}500}{1{,}70{,}000 \text{ shares}}$ = ₹ 1.05

**(ii) Assets turnover**

Assets turnover = $\dfrac{\text{Sales}}{\text{Total Assets*}} = \dfrac{\text{₹ } 30{,}00{,}000}{\text{₹ } 17{,}00{,}000 + \text{₹ } 21{,}25{,}000}$ = 0 .7843

0.7843 < 1.5 means lower than industry turnover.

\*Total Asset = Equity share capital + 12% Debentures

**(iii) Financial leverage**

Combined Leverage = Operating Leverage (OL) × Financial Leverage (FL)

2.8 = 1.4 × FL

Or, FL = 2

Financial Leverage = 2
#### Approach
Operating leverage is contribution over (contribution less fixed cost): solve it for contribution, then work down to EBT and EPS. Financial leverage is the combined leverage divided by the operating leverage.

---
item: q1c-i
qno: 1
part: (c)(i)
marks: 2
type: descriptive
tags: fm.div.models
difficulty: easy
q: 2
a: 4-5
---
#### Question
EPS of a company is ₹ 60 and Dividend payout ratio is 60%. Multiplier is 5. Determine price per share as per Graham & Dodd model.
#### Answer
Price per share (P) = $m\left(D+\dfrac{E}{3}\right)$

Where,

m = Multiplier

D = Dividend

E = EPS

P = $5\left(60 \times 0.6+\dfrac{60}{3}\right)$

P = 5(36 +20) = ₹ 280

---
item: q1c-ii
qno: 1
part: (c)(ii)
marks: 3
type: descriptive
tags: fm.div.models
difficulty: easy
q: 2
a: 5
---
#### Question
Last year's dividend is ₹ 6.34, adjustment factor is 45%, target payout ratio is 60% and current year's EPS is ₹ 12. Compute current year's dividend using Linter's model.
#### Answer
D₁ = Dₒ + [(EPS ×Target payout) - Dₒ] × Adjustment factor

D₁ = 6.34 + [(12 × 60%) – 6.34] × 0.45

D₁ = 6.34 + 0.387 = ₹ 6.727
#### Approach
Lintner's model moves this year's dividend from last year's towards the target (EPS × target payout) by the adjustment factor.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.wc.estimate
difficulty: medium
q: 2
a: 5-7
---
#### Question
X Ltd. has furnished following cost sheet of per unit cost;

| | |
|---|---:|
| Raw material cost | ₹ 150 |
| Direct labour cost | ₹ 40 |
| Overhead cost | ₹ 60 |
| Total Cost | ₹ 250 |
| Profit | ₹ 50 |
| Selling Price | ₹ 300 |

The company keeps raw material in stock on an average for 2 months; work in progress on an average for 3 months and finished goods in stock on an average 1 month. The credit allowed by suppliers is 1.5 months and company allows 2 months credit to its debtors. The lag in payment of wages is 1 month and lag in payment of overhead expenses is 1.5 months. The company sells 25% of the output against cash and maintain cash in hand at bank put together at ₹ 1,50,000. Production is carried on evenly throughout the year and wages and overheads also similarly. Work in progress stock is 75% complete in all respects. Prepare statement showing estimate of working capital requirements to finance an activity level of 15,000 units of production.
#### Answer
**Statement showing Estimate of Working Capital Needs**

**(Receivables (Debtors) are calculated based on Cost of goods sold)**

| | | (₹) | (₹) |
|---|---|---:|---:|
| **A.** | **Current Assets** | | |
| (i) | Inventories: | | |
| | Raw material (2 months) (15,000 units × ₹ 150/12 months × 2 months) | 3,75,000 | |
| | WIP Inventory (3 months) (15,000 units × ₹ 250/12 months × 3 months) × 0.75 | 7,03,125 | |
| | Finished goods inventory (1 months) (15,000 units × ₹ 250/12 months × 1months) | 3,12,500 | 13,90,625 |
| (ii) | Receivables (Debtors) (2 months) (15,000 units × ₹ 250/12 months × 2 months) x 0.75 | | 4,68,750 |
| (iii) | Cash and bank balance | | 1,50,000 |
| | Total Current Assets | | 20,09,375 |
| **B.** | **Current Liabilities:** | | |
| (i) | Payables (Creditors) for materials (1.5 months) (15,000 units × ₹ 150/12 months × 1.5 months) | | 2,81,250 |
| (ii) | Outstanding wages (1 months) (15,000 units × ₹ 40/12 months × 1months) | | 50,000 |
| (iii) | Outstanding overheads (1.5 months) (15,000 units × ₹ 60/12 months × 1.5 months) | | 1,12,500 |
| | Total Current Liabilities | | 4,43,750 |
| | Net Working Capital Needs (A – B) | | 15,65,625 |

**Alternative Solution**

**Statement showing Estimate of Working Capital Needs**

**(Receivables (Debtors) are calculated based on Selling price)**

| | | (₹) | (₹) |
|---|---|---:|---:|
| **A.** | **Current Assets** | | |
| (i) | Inventories: | | |
| | Raw material (2 months) (15,000 units × ₹ 150/12 months × 2 months) | 3,75,000 | |
| | WIP Inventory (3 months) (15,000 units × ₹ 250/12 months × 3 months) × 0.75 | 7,03,125 | |
| | Finished goods inventory (1 months) (15,000 units × ₹ 250/12 months × 1months) | 3,12,500 | 13,90,625 |
| (ii) | Receivables (Debtors) (2 months) (15,000 units × ₹ 300/12 months × 2 months) x 0.75 | | 5,62,500 |
| (iii) | Cash and bank balance | | 1,50,000 |
| | Total Current Assets | | 21,03,125 |
| **B.** | **Current Liabilities:** | | |
| (i) | Payables (Creditors) for materials (1.5 months) (15,000 units × ₹ 150/12 months × 1.5 months) | | 2,81,250 |
| (ii) | Outstanding wages (1 months) (15,000 units × ₹ 40/12 months × 1months) | | 50,000 |
| (iii) | Outstanding overheads (1.5 months) (15,000 units × ₹ 60/12 months × 1.5 months) | | 1,12,500 |
| | Total Current Liabilities | | 4,43,750 |
| | Net Working Capital Needs (A – B) | | 16,59,375 |
#### Approach
Value each holding period at its own cost base (materials at material cost, WIP and finished goods at total cost, WIP at its stage of completion), and remember only the credit-sale share of output creates debtors.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.cs.ebiteps, fm.cs.planning
difficulty: hard
q: 7
a: 7-9
---
#### Question
The data of K Textiles Lid, are given as follows:

| Particulars | Amount (₹) |
|---|---:|
| Profit Before Interest and Tax | 50,00,000 |
| Less: Interest on debentures @ 10% | 10,00,000 |
| Profit before tax | 40,00,000 |
| Less: Income tax @ 50% | 20,00,000 |
| Profit after tax | 20,00,000 |
| No. of equity shares ( ₹ 10 each) | 10,00,000 |
| EPS | 2 |
| PE Ratio | 10 |
| Market price per share | 20 |

The Company is planning to start a new project needs to be having a total capital outlay of ₹ 40,00,000. You are informed that a debt equity ratio [D/D+E] higher than 36% pushes the Ke (cost of equity) up to 12.5%, means reducing the PE ratio to 8 and rises the interest rate on additional amount borrowed to 12%. Retained earnings of the company is ₹ 1.4 crores.

Find out the probable price of share if:

- The additional funds are raised as a loan
- The amount is raised by issuing equity shares.
#### Answer
In this question, EBIT after proposed extension is not given. Therefore, we can assume that existing return on capital employed will be maintained.

**Working notes:**

1. Return on Capital Employed = $\dfrac{\text{EBIT}}{\text{Capital Employed}} = \dfrac{\text{₹ } 50{,}00{,}000}{\text{₹ } 3{,}40{,}00{,}000}$ =14.70%

Capital Employed = Debt + Equity

= ₹ 1,00,00,000 + (₹ 1,00,00,000 + ₹ 1,40,00,000)

= ₹ 3,40,00,000

2. Proposed EBIT = Proposed Capital Employed x Return on capital employed

= (₹ 3,40,00,000 + ₹ 40,00,000) x 14.70% = ₹ 55,86,000

3. Debt Equity Ratio = $\dfrac{\text{Debt}}{\text{Debt + Equity}}$

**Option1: Loan option**

Debt = ₹ 1,00,00,000 + ₹ 40,00,000 = ₹ 1,40,00,000

Equity = ₹ 2,40,00,000

Debt Equity ratio= $\dfrac{\text{1.4 cr.}}{\text{1.4 cr.+ 2.40 cr.}}$ = 36.84%

Debt equity ratio has crossed the limit of 36%, hence, PE ratio in this case will be 8 times and additional borrowing will be at the rate of 12%.

**Option2: Equity option**

Debt = ₹ 1,00,00,000

Equity = ₹ 2,40,00,000 + ₹ 40,00,000 = ₹ 2,80,00,000

Debt Equity ratio = $\dfrac{\text{1 cr.}}{\text{1 cr.+ 2.8 cr.}}$ =26.32%

Debt equity ratio has not crossed the limit of 36% hence PE ratio in this case will remain at 10 times.

4. Number of equity shares to be issued in case of equity option @ ₹ 20 per share

= ₹ 40,00,000 / ₹ 20 = 2,00,000

**Calculation of EPS and MPS under two financial options**

| Particulars | Financial Options | |
|---|---:|---:|
| | **Option I** | **Option II** |
| | **12% additional loan of 40,00,000** | **10,00,000 equity shares @ ₹ 10 and 2,00,000 equity shares @ ₹ 20** |
| | **(₹)** | **(₹)** |
| Profit before interest and Tax (PBIT) | 55,86,000 | 55,86,000 |
| Less: Interest on old debentures @ 10% | 10,00,000 | 10,00,000 |
| Less: Interest on additional loan (new) @ 12% on ₹ 40,00,000 | 4,80,000 | Nil |
| Profit before tax | 41,06,000 | 45,86,000 |
| Less: Taxes @ 50% | 20,53,000 | 22,93,000 |
| Earnings for equity shareholders (EAT/Profit after tax) | 20,53,000 | 22,93,000 |
| Number of Equity Shares | 10,00,000 | 12,00,000 |
| Earnings per Share (EPS) | 2.05 | 1.91 |
| Price/ Earnings ratio | 8 | 10 |
| Market price per share (MPS) | 16.42 | 19.11 |
#### Approach
With no new EBIT given, assume the present return on capital employed (debt plus equity plus retained earnings) carries over to the enlarged capital. Then test each option's debt ratio against the 36% limit to pick its interest rate and PE multiple before computing EPS and price.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.capbud.npv, fm.capbud.payback, fm.capbud.cashflows
difficulty: medium
q: 9
a: 10-11
---
#### Question
ABC Ltd. is considering to purchase a machine which is priced at ₹ 5,00,000. The estimated life of machine is 5 years and has an expected salvage value of ₹ 45,000 at the end of 5 years. It is expected to generate revenues of ₹ 1,50,000 per annum for five years. The annual operating cost of the machine is ₹ 28,125, Corporate Tax Rate is 20% and the cost of capital is 10%.

You are required to analyse whether it would be profitable for the company to purchase the machine by using;

(i) Payback period Method

(ii) Net Present value method

(iii) Profitability Index Method
#### Answer
**Computation of Annual Cash Flows**

| Particular | (₹) |
|---|---:|
| Revenue | 1,50,000 |
| Less: Operating Cost | (28,125) |
| Less: Depreciation (5,00,000 - 45,000)/5 | (91,000) |
| Profit before Tax | 30,875 |
| Less: Tax | (6,175) |
| Profit after Tax | 24,700 |
| Add: Depreciation | 91,000 |
| **Annual Cash Inflows** | 1,15,700 |

**(i) Computation of Payback Period**

| Year | Cash Flows | Cumulative Present Value |
|---|---:|---:|
| 1 | 1,15,700 | 1,15,700 |
| 2 | 1,15,700 | 2,31,400 |
| 3 | 1,15,700 | 3,47,100 |
| 4 | 1,15,700 | 4,62,800 |
| 5 (Including Salvage) | 1,60,700 | 6,23,500 |

Amount to be recovered in 5th year cash flow = ₹ 5,00,000 – ₹ 4,62,800 = ₹ 37,200

Payback period = 4 years + $\dfrac{37{,}200}{1{,}60{,}700}$ = 4.23 years

Since the payback period is less than the life of machinery, the company may purchase the machine.

**(ii) Computation of Net Present Value**

| Year | Cash Flows | PVF @10% | Present Value |
|---|---:|---:|---:|
| 0 | (5,00,000) | 1.000 | (5,00,000) |
| 1 - 5 | 1,15,700 | 3.791 | 4,38,594 |
| 5 | 45,000 | 0.621 | 27,941 |
| Net Present Value | | | (33,465) |

Since the net present value (NPV) is negative, the company should not purchase the machine.

**(iii) Computation of Profitability Index (PI)**

Profitability Index (PI) = $\dfrac{\text{Sum of present value of net cash inflow}}{\text{Initial cash outflow}}$

= $\dfrac{\text{₹}4{,}38{,}594 + \text{₹ } 27{,}941}{\text{₹ } 5{,}00{,}000}$ = 0.93

Since the profitability index is less than 1, the company should not purchase the machine.
#### Approach
Build the annual cash inflow first: profit after tax with straight-line depreciation on cost less salvage, then add the depreciation back. The salvage value is an extra inflow in the last year for all three methods.

---
item: q4
qno: 4
marks: 10
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: medium
q: 11
a: 12-14
---
#### Question
Z Ltd. wishes to raise additional fund of ₹ 25,00,000 for meeting its investment plan. It has ₹ 5,25,000 in the form of retained earnings available for investment purposes. Further details are as following:

| | |
|---|---|
| Combination of debt and equity | 2:3 |
| Cost of debt | |
| Upto ₹ 2,50,000 | 8% (before tax) |
| Above ₹ 2,50,000 and to upto ₹ 5,00,000 | 10% (before tax) |
| Beyond ₹ 5,00,000 | 12% (after tax) |
| Earning of company | ₹ 50,00,000 |
| Retention Ratio | 40% |
| Expected growth of dividend | 15% |
| Market price per share | ₹ 500 |
| Number of outstanding equity shares | 1,00,000 |
| Tax Rate | 30% |

You are required to calculate:

i. Cost of debt

ii. Cost of retained earnings and cost of equity

iii. Weighted average cost of capital
#### Answer
| | | |
|---|---|---|
| Equity | 60% of ₹ 25,00,000 | = ₹ 15,00,000 |
| Debt | 40% of ₹ 25,00,000 | = ₹ 10,00,000 |

The capital structure after raising additional finance:

| | | (₹) |
|---|---|---:|
| **Shareholders’ funds** | | |
| Equity Capital | (₹ 15,00,000 – ₹ 5,25,000) | 9,75,000 |
| Retained earnings | | 5,25,000 |
| Debt (Interest at 8% p.a.) | | 2,50,000 |
| (Interest at 10% p.a.) | (₹ 5,00,000 – ₹ 2,50,000) | 2,50,000 |
| (Interest at 12% p.a.) | (₹ 10,00,000 – ₹ 5,00,000) | 5,00,000 |
| Total Funds | | 25,00,000 |

**(i) Determination of post-tax average cost of additional debt:**

$K_d$ = I (1 – t)

Where,

I = Interest Rate

t = tax-rate

On ₹ 2,50,000 = 8% (1 – 0.3) = 5.6% or 0.056

On ₹ 2,50,000 = 10% (1 – 0.3) = 7% or 0.07

On ₹ 5,00,000 = 12% or 0.12

**Average Cost of Debt**

= $\dfrac{(\text{₹ } 2{,}50{,}000 \times 0.056) + (\text{₹ } 2{,}50{,}000 \times 0.07) + (\text{₹ } 5{,}00{,}000 \times 0.12)}{\text{₹ } 10{,}00{,}000} \times 100$ = 9.15%

**(ii) Determination of cost of retained earnings and cost of equity by applying Dividend growth model**:

$K_e$ or $K_r$ = $\dfrac{D_1}{P_0} + g = \dfrac{D_0 (1 + g)}{P_0} + g$

Where,

$D_0$ = Dividend paid = 60% of EPS = 60% × ₹ 50 = ₹ 30

g = Growth rate = 15%

$P_0$ = Current market price per share = ₹ 500

So, **$K_e$ or $K_r$** = $\dfrac{\text{₹ } 30\ (1+ 0.15)}{\text{₹ } 500} + 0.15$ = 0.069 + 0.15 = 21.9%

**(iii) Computation of overall weighted average after tax cost of additional finance:**

| Particulars | (₹) | Weights | Cost of funds | Weighted Cost (%) |
|---|---:|---:|---:|---:|
| Equity (including retained earnings) | 15,00,000 | 0.60 | 21.9% | 13.14 |
| Debt | 10,00,000 | 0.40 | 9.15% | 3.66 |
| **WACC** | 25,00,000 | | | **16.80** |

**Alternative Presentation**

| Particulars (1) | (₹) (2) | Cost of funds (3) | Product (2) x (3) |
|---|---:|---:|---:|
| **Equity** (including retained earnings) | 15,00,000 | 21.9% | 3,28,500 |
| **Debt** | 10,00,000 | 9.15% | 91,500 |
| **Total** | 25,00,000 | | 4,20,000 |

**WACC =** (Product / Total book value) x 100 = (4,20,000 / 25,00,000) x 100 = **16.8%**

**Alternative Solution for 4(ii) and 4(iii)**

**If we assume expected growth rate of Dividend as 5%.**

**(i) Determination of cost of retained earnings and cost of equity by applying Dividend growth model**:

$K_e$ or $K_r$ = $\dfrac{D_1}{P_0} + g = \dfrac{D_0 (1 + g)}{P_0} + g$

Where,

$D_0$ = Dividend paid = 60% of EPS = 60% × ₹ 50 = ₹ 30

g = Growth rate = 5%

$P_0$ = Current market price per share = ₹ 500

So, **$K_e$ or $K_r$** = $\dfrac{\text{₹ } 30\ (1+ 0.05)}{\text{₹ } 500} + 0.05$ = 0.063 + 0.05 = 11.3%

**(ii) Computation of overall weighted average after tax cost of additional finance:**

| Particulars | (₹) | Weights | Cost of funds | Weighted Cost (%) |
|---|---:|---:|---:|---:|
| Equity (including retained earnings) | 15,00,000 | 0.60 | 11.3% | 6.78 |
| Debt | 10,00,000 | 0.40 | 9.15% | 3.66 |
| **WACC** | 25,00,000 | | | **10.44** |

**Alternative Presentation**

| Particulars (1) | (₹) (2) | Cost of funds (3) | (2) x (3) |
|---|---:|---:|---:|
| Equity (including retained earnings) | 15,00,000 | 11.3% | 1,69,500 |
| Debt | 10,00,000 | 9.15% | 91,500 |
| **Total** | 25,00,000 | | 2,61,000 |

**WACC =** (Product / Total book value) x 100 = (2,61,000 / 25,00,000) x 100 = **10.44%**
#### Approach
Split the ₹ 25 lakh in the 2:3 debt-equity mix, use the retained earnings first for the equity part, and slice the debt into its interest slabs (the last slab's cost is already after tax). Dividend per share comes from the earnings and the retention ratio.

---
item: q5a
qno: 5
part: (a)
marks: 5
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: medium
q: 14
a: 15-16
note: Out of syllabus (old scheme): requirement b, the sensitivity analysis of the NPV to a 1% adverse change in each variable, is Risk Analysis in Capital Budgeting, which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material (its Investment Decisions chapter teaches payback, ARR, NPV, PI, IRR, MIRR, discounted payback, capital rationing and unequal lives, with no risk analysis). Requirement a (the NPV decision) is in syllabus: the tag names it. ICAI prints one (5 Marks) for both requirements, so the item is not split.
---
#### Question
BSB Ltd. is considering its new project with the following details:

| Sr. No. | Particulars | Amount |
|---|---|---:|
| 1 | Initial capital cost | 5,00,00,000 |
| 2 | Annual unit sales | 6,00,000 |
| 3 | Selling price per unit (in ₹) | 120 |
| 4 | Variable cost per unit (in ₹) | 80 |
| 5 | Fixed cost per year | 36,00,000 |
| 6 | Discount Rate | 10% |

**Required:**

a. To advise the company whether to invest in the new project or not based on the NPV concept.

b. Compute the impact on the project's NPV considering a 1% adverse variance in each variable. Which variable is having minimum effect?

Consider Life of the project as 3 years.

| Year | 1 | 2 | 3 |
|---|---:|---:|---:|
| PVF @ 10% | 0.909 | 0.826 | 0.751 |
| PVF @ 11% | 0.901 | 0.812 | 0.731 |
#### Answer
**1. Calculation of Net Cash Inflow per year**

| | Particulars | Amount (₹) |
|---|---|---:|
| A | Selling price per unit | 120 |
| B | Variable cost per unit | 80 |
| C | Contribution per unit (A - B) | 40 |
| D | Number of units sold per year | 6 lakhs |
| E | Total Contribution (C × D) | ₹ 240 lakhs |
| F | Fixed cost per year | ₹ 36 lakhs |
| G | Net cash inflow per year (E - F) | ₹ 204 lakhs |

**Calculation of Net Present Value (NPV) of the Project**

| Year | Year Cash Flow (₹ in lakhs) | PV factor @ 10% | Present Value (PV) (₹ in lakhs) |
|---|---:|---:|---:|
| 0 | (500.00) | 1.000 | (500.00) |
| 1 | 204 | 0.909 | 185.44 |
| 2 | 204 | 0.826 | 168.50 |
| 3 | 204 | 0.751 | 153.20 |
| Net Present Value | | | 7.14 |

Since the NPV of the project is positive, the company should invest in the new project.

**2. Sensitivity Analysis considering 1 % Adverse Variance in each variable**

| | Particulars | Base | Initial capital cost increased to ₹ 505 lakhs | Selling Price per Unit Reduced to ₹ 118.8 | Variable Cost Per Unit increased to ₹ 80.80 | Fixed Cost per year increased to ₹ 36.36 lakhs | Units sold per year reduced to 5.94 lakhs |
|---|---|---:|---:|---:|---:|---:|---:|
| | | **(₹)** | **(₹)** | **(₹)** | **(₹)** | **(₹)** | **(₹)** |
| A | Selling price per unit | 120 | 120 | 118.8 | 120 | 120 | 120 |
| B | Variable cost per unit | 80 | 80 | 80 | 80.8 | 80 | 80 |
| C | Contribution per unit (A - B) | 40 | 40 | 38.8 | 39.2 | 40 | 40 |
| | | **(₹ in lakhs)** | **(₹ in lakhs)** | **(₹ in lakhs)** | **(₹ in lakhs)** | **(₹ in lakhs)** | **(₹ in lakhs)** |
| D | Number of units sold per year (units in lakhs) | 6 | 6 | 6 | 6 | 6 | 5.94 |
| E | Total Contribution (C × D) | 240 | 240 | 232.8 | 235.2 | 240 | 237.6 |
| F | Fixed cost per year | 36 | 36 | 36 | 36 | 36.36 | 36 |
| G | Net Cash Inflow per year (E - F) | 204 | 204 | 196.8 | 199.2 | 203.64 | 201.6 |
| H | PV of Net cash Inflow per year (G × 2.486) | 507.14 | 507.14 | 489.24 | 495.21 | 506.25 | 501.18 |
| I | Initial capital cost | 500 | 505 | 500 | 500 | 500 | 500 |
| J | NPV (H - I) | 7.14 | 2.14 | -10.76 | -4.79 | 6.25 | 1.18 |
| K | Percentage Change in NPV | - | -69.99% | -250.55% | -167.03% | -12.53% | -83.52% |

The above table shows that by changing one variable at a time by 1% (adverse) while keeping the others constant, the impact in percentage terms on the NPV of the project can be calculated. Thus, it can be seen that the change in fixed cost has the minimum effect on the NPV by 12.53%.

---
item: q5b
qno: 5
part: (b)
marks: 5
type: descriptive
tags: fm.div.models, fm.coc.equity
difficulty: medium
q: 15
a: 16-17
---
#### Question
INFO Ltd is a listed company having share capital of ₹ 2400 Crores of ₹ 5 each.

During the year 2022-23

| | |
|---|---|
| Dividend distributed | 1000% |
| Expected Annual growth rate in dividend | 14% |
| Expected rate of return on its equity capital | 18% |

**Required:**

(a) Calculate price of share applying Gordon's growth Model.

(b) What will be the price of share if the Annual growth rate in dividend is only 10%?

(c) According to Gordon's growth Model, if Internal Rate of Return is 25%, then what should be the optimum dividend payout ratio in case of growing stage of company? Comment.
#### Answer
(a) In the present situation, the current MPS is as follows:

P = $\dfrac{D_0 (1+ g)}{K_e - g}$

Where

P = Market price per share

D0 = current year dividend

g = growth rate of dividends

Ke = cost of equity capital/ expected rate of return

P = $\dfrac{50(1+ 0.14)}{0.18 - 0.14}$ = ₹ 1425

(b) The impact of changes in growth rate to 10% on MPS will be as follows:

P = $\dfrac{50(1+ 0.10)}{0.18 - 0.10}$ = ₹ 687.5

(c) If Internal rate of return, r = 25% and Ke = 18%

As per Gordon’s model, when r > Ke, optimum dividend payout ratio is ‘Zero’. When IRR is greater than cost of capital, the price per share increases and dividend pay-out decreases.
#### Approach
The dividend rate is a percentage of the face value of a share, which gives the rupee dividend per share. Then apply the Gordon growth formula on next year's dividend, and compare the return on investment with the cost of equity for the payout question.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.sources.modern
difficulty: easy
q: 17
a: 17
---
#### Question
Write the main features of Bulldog Bond.
#### Answer
**Features of Bulldog Bond**

- It is denominated in Bulldog Pound Sterling/Great Britain Pound (GBP)
- Issued in London
- Issuer Non- UK Company
- Regulations: Great Britain
- Purpose: Access of capital available in UK market
- Issue proceeds can be used to fund UK operation
- Issue proceeds can be used to fund a company’s local opportunities

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.wc.banking, fm.sources.short
difficulty: easy
q: 17
a: 18
---
#### Question
What do you understand by Spontaneous Sources of finance and explain its sources of finance?
#### Answer
Spontaneous sources of finance are those which naturally arise in the course of business operations. Trade credit, credit from employees, credit from suppliers of services, etc. are some of the examples which may be quoted in this respect.

**Spontaneous Sources of Finance**

**(i) Trade Credit:** Trade credit is a spontaneous source of finance which is normally extended to the purchaser organization by the sellers or services providers. It contributes to about one-third of the total short-term requirements.

**(ii) Bills Payable:** In the case of “Bills Payable” the purchaser will have to give a written promise to pay the amount of the bill/invoice either on demand or at a fixed future date to the seller or the bearer of the note.

**(iii) Accrued Expenses:** The accrued expenses refer to the services availed by the firm, but the payment for which has yet to be made. It is a built in and an automatic source of finance as most of the services like wages, salaries, taxes, duties etc., are paid at the end of the period.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.cs.planning
difficulty: easy
q: 17
a: 18
---
#### Question
What are the causes of over-capitalization?
#### Answer
**Over-capitalisation arises due to following reasons:**

(i) Raising more money through issue of shares or debentures than company can employ profitably.

(ii) Borrowing huge amount at higher rate than rate at which company can earn.

(iii) Excessive payment for the acquisition of fictitious assets such as goodwill etc.

(iv) Improper provision for depreciation, replacement of assets and distribution of dividends at a higher rate.

(v) Wrong estimation of earnings and capitalization

---
item: q6c-or
qno: 6
part: (c)
marks: 2
type: descriptive
alt: q6c
tags: fm.intro.objectives
difficulty: easy
q: 17
a: 18
note: ICAI prints this as an OR alternative to Q6(c), with its own (2 Marks).
---
#### Question
What are disadvantages of Profit Maximization?
#### Answer
Disadvantages of Profit Maximisation objective of financial management.

(i) Emphasizes the short-term gains

(ii) Ignores risk or uncertainty

(iii) Ignores the timing of returns

(iv) Requires immediate resources.
