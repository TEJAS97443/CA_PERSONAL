<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p6-pyq-may2026
paper: p6
section: fm
kind: pyq
attempt: may2026
qfile: new/p6/pyq-may2026-a.pdf
afile: new/p6/pyq-may2026-a.pdf
paperfile: new/p6/pyq-may2026-q.pdf
choice: q1; any 2 of q2-q4
q: 9
accept: 9, 10, 11, 12, 13, 14, 15, 16, 16
status: checked
by: tx-02
date: 2026-10-20
note: Section A (Financial Management) of ICAI's Suggested Answers for May 2026 Paper 6, which reproduce every question with its marks; the question-paper scan is linked as paperfile. The SM half is n-p6-pyq-may2026.sm.md. Part I prints the FM MCQs 1-8 (Case Scenario - I = MCQs 1-5, then MCQs 6-8, pp.1-3), then the SM MCQs 9-16, then one Answer Key table for all 16 (p.8: correct options only, no workings), so the MCQs' Answer sections are empty and a: cites p.8. Part II Section A = Questions 1-4 (pp.9-23). Items: Q1(a), Q1(c), Q3(a) and Q3(b) print marks per requirement ("(2 + 3 = 5 Marks)") and ICAI answers each requirement under its own label, so each requirement is an item under a shared case (the working ICAI prints before the first label is the case's Answer). Q2(a) (4 + 3 = 7 Marks) stays one item: the PVIF / PVIA table that both requirements need is printed after requirement (ii). Q4(b) (1 + 3 = 4 Marks) stays one item: ICAI answers (i) and (ii) in one run without labels. MCQ 6: ICAI sets the four options as a table with the columns "Incremental Investment in debtors" and "Impact on Post -tax profitability"; the column heads are kept as a header-only table in the question and each option lists its two cells in that order, separated by a comma. ICAI's own wording kept as printed: "Runing cost per year" (Q2(a)); "PVIA" in the question's table and "PVIFA" in the answer (Q2(a)); "= Rs 22,500" (Q1(a)(i) answer); "share price of 6O" with a letter O (Q3(a)(ii) answer); "Walters model" (Q3(a)(i) answer); "Equity share capital of 10 each" with no ₹ (Q1(c)). check.py: the numbers accepted are (1) on pages this file shares with the SM half: p.1 the paper's title "PAPER – 6: FINANCIAL MANAGEMENT AND STRATEGIC MANAGEMENT" (6); p.8 SM MCQ 16 and the Answer Key rows of the SM MCQs 9-16 (9-15, 16 twice); (2) the question numbers 1-4 that check.py counts a second time on the answer side, where ICAI heads each answer "Answer" without its number.
---
#### Instructions
**PART – II Descriptive Questions**

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
---
#### Case
XYZ Ltd. is engaged in manufacturing of an electronic component, to be used by industries producing electronic gadgets for domestic use. The company is a leveraged company, currently paying annual interest of ₹ 33 lakhs on its 11% debt. The company is financially prudent. It has a balance of ₹ 50 lakhs as retained earnings. The company maintains Long-term Debt to Equity ratio of 2: 1. The face value per share of the company is ₹ 10.

Due to operating in a competitive market, the marketing manager of the company has submitted a report exhibiting significant potential for sales growth. The production manager has endorsed the idea and has suggested adopting latest technology at the workplace. In case the company implements new technology, the production efficiency will increase which will bring down the overall cost of production. To procure and install this new technology, the company requires an additional fund of ₹ 3 crores. This additional fund will be arranged in such a manner that it will not impact the present Long-term Debt to Equity ratio. The additional debt will carry interest rate of 12% p.a. As a result of implementing the new technology, it is anticipated that ROI will increase by 3% from present ROI of 15%. Applicable tax rate is 30%.

**Based on the facts mentioned above pertaining to XYZ Ltd., you are required to answer the following questions 1 to 5:**

---
item: m1
case: c1
qno: 1
marks: 2
type: mcq
key: A
tags: fm.cs.planning, fm.ratio.liquidity
difficulty: easy
q: 1
a: 8
---
#### Question
What is the equity share capital outstanding before the additional fund is introduced?
#### Options
(A) ₹ 1.00 crores
(B) ₹ 1.50 crores
(C) ₹ 0.50 crores
(D) ₹ 2.00 crores
#### Answer
#### Approach
The interest and its rate give the debt; the debt to equity ratio then gives total equity, and retained earnings are part of that equity.

---
item: m2
case: c1
qno: 2
marks: 2
type: mcq
key: C
tags: fm.cs.planning
difficulty: easy
q: 2
a: 8
---
#### Question
What is the total capital employed before and after additional financing?
#### Options
(A) ₹ 4.00 crores and ₹7.00 crores
(B) ₹ 5.00 crores and ₹8.00 crores
(C) ₹ 4.50 crores and ₹ 7.50 crores
(D) ₹ 5.50 crores and ₹ 8.50 crores
#### Answer

---
item: m3
case: c1
qno: 3
marks: 2
type: mcq
key: A
tags: fm.cs.ebiteps
difficulty: hard
q: 2
a: 8
---
#### Question
Compute the EPS after additional financing. What will be the percentage increase in EPS of the company, after introducing the additional fund?
#### Options
(A) ₹ 2.73, 13.04%
(B) ₹ 2.18, 35.65%
(C) ₹ 2.73, 11.54%
(D) ₹ 2.18, 26.28%
#### Answer
#### Approach
EBIT = ROI × capital employed (before and after); deduct the old and the new interest, then tax, and divide by the shares outstanding at face value, remembering that the new fund keeps the same debt to equity ratio.

---
item: m4
case: c1
qno: 4
marks: 2
type: mcq
key: B
tags: fm.cs.ebiteps, fm.ratio.profit
difficulty: medium
q: 2
a: 8
---
#### Question
What will be the expected MPS after the change in funds, if company expects a P/E ratio of 20?
#### Options
(A) ₹ 43.68
(B) ₹ 54.60
(C) ₹ 70.00
(D) ₹ 47.60
#### Answer

---
item: m5
case: c1
qno: 5
marks: 2
type: mcq
key: D
tags: fm.coc.debt, fm.coc.wacc
difficulty: medium
q: 2
a: 8
---
#### Question
What will be the post-tax weighted average cost of debt after additional financing?
#### Options
(A) 7.70%
(B) 8.05%
(C) 9.00%
(D) 7.98%
#### Answer
#### Approach
Weight the old debt at its rate and the new debt at its rate by their amounts, and take the after-tax figure.

---
item: m6
qno: 6
marks: 2
type: mcq
key: D
tags: fm.wc.receivables
difficulty: medium
q: 2-3
a: 8
---
#### Question
A company has credit sales of ₹ 20,00,000 with an average collection period of 35 days. It wants to liberalize its existing credit terms which are expected to increase sales to ₹ 25,00,000. However, average collection period is expected to decline to 10 days. Profit Volume ratio is 20% and opportunity cost (post-tax) is 6%. Tax rate is 40%. Assume 360 days in a year.

What is the incremental investment in debtors and its impact on post-tax profitability?

| | Incremental Investment in debtors | Impact on Post -tax profitability |
|---|---:|---:|
#### Options
(A) ₹ (1,25,000), ₹ 7,500
(B) ₹ (1,00,000), ₹ (6,000)
(C) ₹ (1,25,000), ₹ (7,500)
(D) ₹ (1,00,000), ₹ 6,000
#### Answer
#### Approach
Compare the debtors balance (sales × collection days ÷ 360) before and after; the profit effect is the post-tax contribution on the extra sales plus the post-tax opportunity cost saved on the change in debtors.

---
item: m7
qno: 7
marks: 2
type: mcq
key: C
tags: fm.coc.equity, fm.capbud.npv
difficulty: easy
q: 3
a: 8
---
#### Question
FG Ltd. is appraising a one-year investment plan, which requires an initial outlay of ₹ 1,00,000. At the end of term, it will be matured at ₹ 1,25,000. The plan has a beta of 1.3, risk free rate of return 10% and market rate of return 18%. Calculate the required rate of return and decide whether the plan is worthwhile.
#### Options
(A) 25%, The plan is not worthwhile.
(B) 20.4%, The plan is not worthwhile.
(C) 20.4%, The plan is worthwhile.
(D) 25%, The plan is worthwhile.
#### Answer
#### Approach
Required return by CAPM: risk-free rate + beta × (market return – risk-free rate); compare it with the plan's own one-year return.

---
item: m8
qno: 8
marks: 1
type: mcq
key: B
tags: fm.capbud.irr
difficulty: easy
q: 3
a: 8
---
#### Question
Details of a project are given below:

| | |
|---|---|
| Initial outlay | ₹ 800 lakhs |
| NPV at 16% discount rate | ₹ 50.71 lakhs |
| NPV at 20% discount rate | ₹ (26.84) lakhs |

What will be Internal rate of return (IRR) of the project? If cost of capital is 18.50%, should the project be accepted?
#### Options
(A) 16.00%, Yes
(B) 18.62%, Yes
(C) 18.00%, Yes
(D) 18.62%, No
#### Answer
#### Approach
Interpolate between the two discount rates in proportion to the NPVs, and accept the project if the IRR exceeds the cost of capital.

---
case: c2
qno: 1
q: 9
---
#### Case
Finance manager of A Ltd. noticed that a 5% increase in sales leads to increase of ₹ 9,000 in operating profit. The company operates with a contribution margin of 40%, fixed annual operating cost of ₹1,35,000 and interest obligation of ₹ 30,000.

You are required to calculate:

---
item: q1a-i
case: c2
qno: 1
part: (a)(i)
marks: 2
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 9
a: 10-11
---
#### Question
Current level of sales of the company.
#### Answer
**Current level of Sales:**

Let the present sales be = ₹X

or 5% of Sales×40% = 9,000

or 0.05X x 0.40 = 9,000

or 0.02X = 9,000

Current Sales (X) = ₹ 4,50,000

P/V ratio = Change in profit/ Change in sales

0.40 = 9,000/X

X = 9,000/0.40

= Rs 22,500

Hence, total sales;

= Change in sales/ % change in sales

= ₹ 22,500/0.05

= ₹ 4,50,000

Income Statement

| Particulars | (₹) |
|---|---:|
| Sales | 4,50,000 |
| Contribution (40%) | 1,80,000 |
| *Less:* Fixed annual operating cost | (1,35,000) |
| EBIT (Earnings before interest and tax) | 45,000 |
| *Less:* Interest | (30,000) |
| EBT (Earnings before tax) | 15,000 |
#### Approach
The rise in operating profit equals the contribution on the extra sales, so the contribution margin turns it into the change in sales.

---
item: q1a-ii
case: c2
qno: 1
part: (a)(ii)
marks: 3
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 9
a: 11
---
#### Question
Operating, financial and combined leverage.
#### Answer
**Leverage**

**Operating Leverage** = $\dfrac{\text{Contribution}}{\text{EBIT}} = \dfrac{\text{₹ 1,80,000}}{\text{₹ 45,000}}$ = 4

**Financial Leverage** = $\dfrac{\text{EBIT}}{\text{EBT}} = \dfrac{\text{₹ 45,000}}{\text{₹ 15,000}}$ = 3

**Combined Leverage** = Operating Leverage × Financial Leverage

= 4 × 3 = 12

**Or,**

Combined Leverage = $\dfrac{\text{Contribution}}{\text{EBT}} = \dfrac{\text{₹ 1,80,000}}{\text{₹ 15,000}}$ = 12

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.coc.debt, fm.coc.equity
difficulty: hard
q: 9-10
a: 12
---
#### Question
Z Ltd. has issued 8% convertible debentures of ₹ 100 each with a remaining maturity period of five years. The current market price per debenture is ₹ 85. At the time of maturity, debenture holders have an option to either redeem it at a premium of 5% or to convert each debenture into 5 equity shares. Current market price per equity share is ₹16. The company has just paid dividend of ₹ 8.03 per equity share. Seven years ago, it paid dividend of ₹ 5.00 per equity share.

Applicable tax rate is 30%.

Compute the post-tax cost of debentures using present value method.

| Year | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|---:|
| $\text{PVIF}_{0.10{,}t}$ | 0.909 | 0.826 | 0.751 | 0.683 | 0.621 | 0.564 | 0.513 |
| $\text{PVIF}_{0.12{,}t}$ | 0.893 | 0.797 | 0.712 | 0.636 | 0.567 | 0.507 | 0.452 |

| Interest Rate | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| $\text{FVIF}_{i{,}5}$ | 1.051 | 1.104 | 1.159 | 1.217 | 1.276 | 1.338 | 1.403 | 1.469 | 1.539 |
| $\text{FVIF}_{i6}$ | 1.062 | 1.126 | 1.194 | 1.265 | 1.340 | 1.419 | 1.501 | 1.587 | 1.677 |
| $\text{FVIF}_{i7}$ | 1.072 | 1.149 | 1.230 | 1.316 | 1.407 | 1.504 | 1.606 | 1.714 | 1.828 |
#### Answer
**Calculation of growth rate in dividend**

8.03 = $5\,(1+g)^{7}$

1.606 = $(1+g)^{7}$

g = 7%

Price of share after 5 years

$P_5$ = 16 x FVIF 7%,5

= 16 x 1.403 = 22.45

Conversion value of shares = 22.45 × 5 = ₹ 112.25 (RV)

Redemption Value of Debenture (RV) = 100+5% premium = ₹ 105

Since, conversion value is higher, debenture holders will prefer conversion.

After-tax Interest = 8(1−0.30) = ₹ 5.60

| Year | Cash Inflow (₹) | PVIF @ 10% | PV (₹) | PVIF @12% | PV (₹) |
|---|---|---:|---:|---:|---:|
| 0 | 85 (Current Market Price) | 1 | (85) | 1 | (85) |
| 1-5 | 5.60 (Interest) | 3.79 | 21.224 | 3.605 | 20.188 |
| 5 | 112.25 (Conversion Value) | 0.621 | 69.707 | 0.567 | 63.646 |
| Total PV | | | 5.931 | | -1.166 |

IRR = $L + \dfrac{NPV_L}{NPV_L - NPV_H}(H - L)$

= $10\% + \dfrac{5.931}{5.931-(-1.166)}(12\% - 10\%)$ = 11.67%
#### Approach
First decide what the holder receives at maturity: find the dividend growth rate from the two dividends, project the share price five years on and compare the conversion value with the redemption value; then find the IRR of the post-tax cash flows.

---
case: c3
qno: 1
q: 10
a: 12
---
#### Case
Following information is related to Exe Ltd. for the year ended 31st March, 2026:

| | |
|---|---|
| Total dividend coverage ratio | 2.863 times |
| Dividend yield on the equity shares | 4% |
| Market price per equity share | ₹ 40.00 |
| Equity share capital of 10 each | 12,00,000 |
| Preference share capital of 10 each | ₹ 3,00,000 |
| Price-earnings ratio | 8 times |

You are required to calculate:
#### Answer
Dividend per Equity Share (DPS) = 4 % of ₹40.00 = ₹1.60

No. of Equity Shares = ₹12,00,000 / ₹10 = 1,20,000 shares

---
item: q1c-i
case: c3
qno: 1
part: (c)(i)
marks: 1
type: descriptive
tags: fm.ratio.profit
difficulty: easy
q: 10
a: 12
---
#### Question
Total dividend paid to equity shareholders
#### Answer
**Total Dividend Paid to Equity Shareholders**

1,20,000 × ₹1.60 = ₹1,92,000

---
item: q1c-ii
case: c3
qno: 1
part: (c)(ii)
marks: 1
type: descriptive
tags: fm.ratio.profit
difficulty: easy
q: 10
a: 13
---
#### Question
Earnings per share
#### Answer
**Calculation of Earnings Per Share (EPS)**

P/E ratio = $\dfrac{\text{MPS}}{\text{EPS}}$

8 = 40 / EPS

EPS = ₹5

---
item: q1c-iii
case: c3
qno: 1
part: (c)(iii)
marks: 2
type: descriptive
tags: fm.ratio.profit
difficulty: medium
q: 10
a: 13
---
#### Question
Rate of preference dividend
#### Answer
**Rate of Preference Dividend**

Profit Available to Equity Shareholders

EPS × No. of Equity Shares = ₹5 × 1,20,000 = ₹6,00,000

Let preference dividend = P

Then, PAT = 6,00,000 + P

Total dividend =Equity Dividend+ Preference Dividend

=1,92,000 + P

Dividend coverage ratio = 2.863

2.863 = $\dfrac{(6{,}00{,}000+P)}{(1{,}92{,}000+P)}$

6,00,000+P = 2.863(1,92,000+P)

6,00,000+P = 5,49,696+2.863P

50,304 =1.863P

P = ₹ 27,000

Rate of Preference Dividend= 27,000/3,00,000 x 100=9%
#### Approach
Total dividend coverage = profit after tax ÷ (equity dividend + preference dividend); write PAT as the equity earnings plus the unknown preference dividend and solve.

---
item: q1c-iv
case: c3
qno: 1
part: (c)(iv)
marks: 1
type: descriptive
tags: fm.ratio.profit
difficulty: easy
q: 10
a: 13
---
#### Question
Total profit after tax
#### Answer
**Total Profit after Tax**

PAT = ₹6,00,000 + ₹27000 = ₹6,27,000

---
item: q2a
qno: 2
part: (a)
marks: 7
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: medium
note: ICAI prints (4 + 3 = 7 Marks) for requirements (i) and (ii); one item, because the PVIF / PVIA table both requirements need is printed after requirement (ii).
q: 13-14
a: 14-16
---
#### Question
R Ltd. wants to reduce the dependency of manual workforce in the operation of its factory by adopting automatic machine. It has two options under consideration Machine M and Machine N. Both the machines serve the same job and are also able to satisfy the purpose of the company.

Details of both the machines are given below:

| | Machine M | Machine N |
|---|---:|---:|
| Purchase cost (₹) | 4,50,000 | 3,50,000 |
| Estimated useful life | 5 years | 7 years |
| Estimated salvage value (% of cost) | 10% | 10% |
| Annual saving to wages (₹) | 11,00,000 | 12,00,000 |
| Runing cost per year (excl. depreciation) (₹) | 9,00,000 | 11,00,000 |
| Annual saving in scrap due to use of machine in place of manual work force (₹) | 1,00,000 | 1,20,000 |

The Company's cost of capital is 9%. Corporate tax rate is 25%. Depreciation will be charged on SLM basis.

(i) Calculate NPV and Profitability index for each machine.

(ii) Which machine should be selected on the basis of Equivalent Annualized Criterion?

| Year | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|---:|
| $\text{PVIF}_{0.09{,}\ t}$ | 0.917 | 0.842 | 0.772 | 0.708 | 0.650 | 0.596 | 0.547 |
| $\text{PVIA}_{0.09{,}\ t}$ | 0.917 | 1.759 | 2.531 | 3.239 | 3.889 | 4.485 | 5.032 |
#### Answer
**Evaluation of Alternatives**

**Working Notes:**

Depreciation on Machine M = $\dfrac{(4{,}50{,}000 - 45{,}000)}{5}$ = ₹ 81,000

Depreciation on Machine N = $\dfrac{(3{,}50{,}000 - 35{,}000)}{7}$ = ₹ 45,000

**(i) NPV and PI for each machine**

| Particulars | Machine M (₹) | Machine N (₹) |
|---|---:|---:|
| Annual Savings: | | |
| Direct Wages | 11,00,000 | 12,00,000 |
| Scraps | 1,00,000 | 1,20,000 |
| Total Savings (A) | 12,00,000 | 13,20,000 |
| Annual Running Cost (B) | 9,00,000 | 11,00,000 |
| Annual Cash Savings (A-B) | 3,00,000 | 2,20,000 |
| Less: Depreciation | 81,000 | 45,000 |
| Annual Savings before Tax | 2,19,000 | 1,75,000 |
| *Less:* Tax @ 25% | 54,750 | 43,750 |
| Annual Savings /Profits after tax | 1,64,250 | 1,31,250 |
| *Add:* Depreciation | 81,000 | 45,000 |
| Annual Cash Inflows | 2,45,250 | 1,76,250 |
| PVIFA | 3.889 | 5.032 |
| PV of Annual Cash Inflows | 9,53,777.25 | 8,87,890 |
| PV of Salvage Value | 45,000 x 0.650 = ₹ 29,250 | 35,000 x 0.547 = ₹ 19,145 |
| Total PV of Inflows | 9,83,027.25 | 9,06,035 |
| NPV | 9,83,027.25- 4,50,000 = ₹ 5,33,027.25 | 9,06,035- 3,50,000 = ₹ 5,56,035 |
| PV Index = Present Value of Cash Inflow/Investment | 9,83,027.25/4,50,000 =2.18 | 9,06,035/3,50,000 =2.59 |

**(ii) Equivalent Annualized NPV**

Machine M = $\dfrac{5{,}33{,}027.25}{3.889}$ = ₹ 1,37,060/-

Machine N = $\dfrac{5{,}56{,}035}{5.032}$ = ₹ 1,10,500/-

So machine M should be selected on the basis of Equivalent Annualized Criterion.
#### Approach
Build the annual cash inflow (savings less running cost, tax on the saving after depreciation, depreciation added back) for each machine; because the lives differ, compare NPVs per year by dividing by each machine's annuity factor.

---
item: q2b
qno: 2
part: (b)
marks: 3
type: descriptive
tags: fm.wc.payables
difficulty: easy
q: 14
a: 16
---
#### Question
B Ltd. has received an offer to get a discount of 2% on an invoice value of ₹75,000, if payment is made within one month instead of normal credit terms of 3 months. If the company makes early payment, it will need to finance the payment through a bank overdraft of 10% p.a. Tax rate is 30%.

Whether B Ltd. should accept the offer? Support your decision with calculations.
#### Answer
Discount on early payment = 2% x 75,000 = ₹1,500

Net Benefit (A) = ₹ 1,500 - Tax (30%) = ₹ 1,050

The company must borrow the discounted invoice amount via a bank overdraft for the 2-month period.

Amount to be Borrowed= 75,000 − 1,500 = ₹ 73,500

Bank overdraft interest for 2 months:

= P × R × T

= 73,500 × 10% × 2/12

= ₹ 1,225

After tax interest cost = 1,225 × (1−0.30)

= 1,225 × 0.70

= ₹ 857.50

Net Saving = Net Benefit – Net Interest Cost

= ₹ 1,050 – ₹ 857.50

= ₹ 192.50 (Net Saving)

Since the company gains a net benefit of ₹ 192.50 by making early payment, B Ltd. should accept the discount offer.

Alternatively, the question can be solved as below:

Annualized benefit of discount

= $\dfrac{\text{Discount \%}}{\text{100-Discount \%}} \times \dfrac{\text{12 months}}{\text{Credit Period – Discount Period}}$

= 2/98 x 12/2 x 100 =12.245 %

Post tax benefit = 12.245 x (1-0.3) =8.571

Post tax Bank OD rate = 10% x (1-0.3) =7%

Benefit of discount is more than cost of OD. Hence, discount should be accepted.
#### Approach
Compare the after-tax discount gained with the after-tax overdraft interest on the amount paid early, for the months by which payment is advanced.

---
case: c4
qno: 3
q: 17
a: 18
---
#### Case
K Ltd. provides the following information:

| | |
|---|---|
| Net profit | ₹ 50,00,000 |
| 10% Preference share capital @ ₹100 each | ₹ 2,00,00,000 |
| Number of equity share outstanding | 5,00,000 |
| Rate of return on investment | 25% |
| Cost of equity | 15% |

You are required to:
#### Answer
| | (₹) in lakhs |
|---|---:|
| Net Profit | 50 |
| *Less:* Preference dividend | 20 |
| Earning for equity shareholders | 30 |

---
item: q3a-i
case: c4
qno: 3
part: (a)(i)
marks: 2
type: descriptive
tags: fm.div.models
difficulty: easy
q: 17
a: 18
---
#### Question
Calculate EPS and also calculate market price per equity share as per Walter's Model with the retention ratio of 20%.
#### Answer
Earning per share = 30,00,000/5,00,000 = ₹ 6.00

Market Price as per Walters model

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e}$

P = $\dfrac{4.8 + \dfrac{0.25}{0.15}(6 - 4.8)}{0.15}$

P = ₹ 45.33
#### Approach
Earnings for equity come after the preference dividend; a retention ratio of 20% means the dividend is 80% of EPS.

---
item: q3a-ii
case: c4
qno: 3
part: (a)(ii)
marks: 1
type: descriptive
tags: fm.div.models
difficulty: medium
q: 17
a: 18-19
---
#### Question
If the company aims to keep the market price of its equity share at ₹ 60 each, what retention ratio should be adopted?
#### Answer
Retention ratio when market price is ₹ 60 each

Let, the dividend per share be D to get share price of 6O

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e}$

or 60 = $\dfrac{D + \dfrac{0.25}{0.15}(6 - D)}{0.15}$

or 9 = $\dfrac{0.15D + 1.5 - 0.25D}{0.15}$

or 1.35 = 0.15D +1.5 - 0.25D

or 0.10D = 0.15

D = ₹ 1.50

Retention ratio= 4.5/6 = 0.75 = 75%

---
item: q3a-iii
case: c4
qno: 3
part: (a)(iii)
marks: 1
type: descriptive
tags: fm.div.models
difficulty: easy
q: 17
a: 19
---
#### Question
What would be optimum dividend payout ratio as per Gordon's Model?
#### Answer
As per Gordon’s model, when r > Ke, optimum dividend payout ratio is ‘Zero’.

---
case: c5
qno: 3
q: 17
---
#### Case
AR Ltd. has given following data for the year ended 31st March, 2026:

- Receivables are collected on an average after 60 days,
- Inventories are held for average period of 90 days before being sold.
- The company usually settles its payables with suppliers after 30 days.
- The total sales of the company amounts to ₹ 200 lakhs, which is earned evenly throughout the year. All sales are credit sales. Net profit margin is 10%. The company has not incurred any non-operating expenses during the year.
- Tax rate is 30%.
- Assume 360 days in a year.
- Opportunity cost of investment is 12%.

On the basis of the above data:

---
item: q3b-i
case: c5
qno: 3
part: (b)(i)
marks: 2
type: descriptive
tags: fm.wc.cash, fm.wc.basics
difficulty: easy
q: 17
a: 19
---
#### Question
Calculate the cash cycle and the minimum cash balance to be maintained to meet its obligations.
#### Answer
Cash cycle = 60 days + 90 days – 30 days =120 days (4 months)

Cash turnover = 12 months (360 days)/4months (120 days) = 3.

Total Cash Outlay = Sales – Net Profit

= 200 Lakhs−20 Lakhs = ₹ 180 Lakhs

Minimum operating cash = Total operating annual outlay/cash turnover

= ₹ 180 lakhs/3 = ₹ 60 lakhs.
#### Approach
Cash cycle = receivable days + inventory days – payable days; the annual cash outlay (sales less profit) divided by the number of cycles in a year is the cash to hold.

---
item: q3b-ii
case: c5
qno: 3
part: (b)(ii)
marks: 4
type: descriptive
tags: fm.wc.receivables, fm.wc.cash
difficulty: medium
q: 18
a: 19-21
---
#### Question
The company is planning to propose a scheme, whereby it will offer a cash discount of 2% to debtors to reduce the debtors' collection period by 30 days. It is expected that 60% of the debtors will avail the scheme.

(A) What will be reduction in the minimum cash to be maintained to meet obligation after the proposed scheme is adopted?

(B) What will be net saving due to such scheme?

(C) Should the company adopt the scheme?
#### Answer
**(A) Reduction in Minimum Cash Balance**

First, we calculate the new average collection period and the new cash cycle.

New Average Collection Period: 30 days

New Cash Cycle: 30 + 90 −30 = 90 days

New Cash Turnover: 360/90 = 4 times

New Minimum Cash Balance: 180/4 = ₹ 45 Lakhs

Reduction in Cash Balance: 60 Lakhs−45 Lakhs = ₹ 15 Lakhs

**(B) Net Saving Due to Scheme**

Opportunity Cost Saving = 12% of reduction in cash balance (15 Lakhs) x (1-0.30) = ₹ 1.26Lakhs

Cost of Cash Discount = 2% of 60 % of Total Sales x (1-0.30)

= 0.02 × 0.60 × 200 Lakhs = ₹ 1.68 Lakhs

Net Saving =1.26 Lakhs−1.68 Lakhs = ₹ (0.42 Lakhs)

**(C) Recommendation**

No, the company should not adopt the scheme.

**Solution for part (ii) can be done in following alternative way:**

If we assume

- 60% of debtors will pay 30 days early (Collection period = 30 days).
- The remaining 40% of debtors will *not* avail the scheme and will continue to pay after the normal 60 days.

Therefore, the New Average Collection Period:

= (60%×30 days) + (40% × 60 days) = 18 days+24 days = 42 days

Cash Cycle & Cash Balance:

- New Cash Cycle = 90 (Inventory) + 42 (New Debtors) - 30 (Payables) = 102 days
- New Cash Turnover = 360 / 102 = 3.529 times
- New Minimum Cash Balance = ₹ 180 Lakhs / 3.529 = ₹ 51 Lakhs
- Reduction in Cash Balance = ₹ 60 Lakhs - ₹ 51 Lakhs = ₹ 9 Lakhs

(B) Net Savings:

- Opportunity Cost Saving: ₹ 9 Lakhs × 12% × (1 - 0.30) = ₹ 0.756 Lakhs
- Cost of Cash Discount: 2% × 60% × 200 Lakhs × (1 - 0.30) = ₹ 1.68 Lakhs
- Net Saving: ₹ 0.756 Lakhs - ₹ 1.68 Lakhs = (₹ 0.924 Lakhs) or (Net Loss of ₹ 92,400)

**(C)** No, the company should not adopt the scheme, because it results in a net financial loss of ₹ 0.924 Lakhs.
#### Approach
Rework the cash cycle with the shorter collection period, then weigh the post-tax opportunity saving on the smaller cash balance against the post-tax cost of the discount.

---
item: q4a
qno: 4
part: (a)
marks: 4
type: descriptive
tags: fm.div.models
difficulty: easy
q: 21
a: 21-22
---
#### Question
MM Hypothesis of dividend policy is based on certain assumptions. What are those assumptions without which the hypothesis cannot hold? Explain briefly.
#### Answer
MM hypothesis is based on the following assumptions:

- **Perfect capital markets:** The firm operates in a market in which all investors are rational and information is freely available to all.
- **No taxes:** There are no taxes or no tax discrimination between dividend income and capital appreciation (capital gain). It means there is no difference in taxation of dividend income or capital gain. This assumption is necessary for the universal applicability of the theory, since the tax rates may be different in different countries.
- **Fixed investment policy:** It is necessary to assume that all investment should be financed through equity only, since implication after using debt as a source of finance may be difficult to understand. Further, the impact will be different in different cases.
- **No floatation or transaction cost:** Similarly, these costs may differ from country to country or market to market.
- **Risk of uncertainty does not exist**. Investors are able to forecast future prices and dividend with certainty and one discount rate is appropriate for all securities and all time periods.

---
item: q4b
qno: 4
part: (b)
marks: 4
type: descriptive
tags: fm.sources.short, fm.wc.banking
difficulty: easy
note: ICAI prints (1 + 3 = 4 Marks) for requirements (i) and (ii) but answers them in one run without labels, so this is one item of 4 marks.
q: 21
a: 22
---
#### Question
An Indian exporter has shipped goods to a foreign buyer, but the export proceeds are yet to be realised. He approaches the bank for immediate finance assistance.

(i) Identify the type of finance involved.

(ii) Explain any three forms of such type of finance.
#### Answer
**Post-shipment Finance** is the type of finance involved:

It takes the following forms:

(a) ***Purchase/discounting of documentary export bills***: Finance is provided to exporters by purchasing export bills drawn payable at sight or by discounting usance export bills covering confirmed sales and backed by documents including documents of the title of goods such as bill of lading, post parcel receipts, or air consignment notes.

(b) ***E.C.G.C. Guarantee:*** Post-shipment finance, given to an exporter by a bank through purchase, negotiation or discount of an export bill against an order, qualifies for post-shipment export credit guarantee. It is necessary, however, that exporters should obtain a shipment or contracts risk policy of E.C.G.C. Banks insist on the exporters to take a contracts shipments (comprehensive risks) policy covering both political and commercial risks. The Corporation, on acceptance of the policy, will fix credit limits for individual exporters and the Corporation’s liability will be limited to the extent of the limit so fixed for the exporter concerned irrespective of the amount of the policy.

(c) ***Advance against export bills sent for collection:*** Finance is provided by banks to exporters by way of advance against export bills forwarded through them for collection, taking into account the creditworthiness of the party, nature of goods exported, usance, standing of drawee etc.

(d) ***Advance against duty draw backs, cash subsidy, etc.:*** To finance export losses sustained by exporters, bank advance against duty draw-back, cash subsidy etc., receivable by them against export performance. Such advances are of clean nature; hence necessary precaution should be exercised.

---
item: q4c
qno: 4
part: (c)
marks: 2
type: descriptive
tags: fm.intro.objectives
difficulty: easy
q: 21
a: 22-23
---
#### Question
How do the concepts of profit maximization and wealth maximization differ in terms of objective, risk, time horizon and sustainability?
#### Answer
| Particular | Profit Maximization | Wealth Maximisation |
|---|---|---|
| **Objective** | Large amount of profits. | Highest market value of shares. |
| **Risk** | Ignores risk or uncertainty | Recognises risk or certainty |
| **Time Horizon** | Emphasizes the short term gains. | Emphasizes the long term gains. |
| **Sustainability** | Not sustainable in long term. Sustainability is low. | Critical for the very existence of the business enterprise. Sustainability is high. |

---
item: q4c-or
alt: q4c
qno: 4
part: (c)
marks: 2
type: descriptive
tags: fm.sources.long
difficulty: easy
q: 21
a: 23
---
#### Question
What are Junk Bonds and why are they called 'High Yield Bonds'?
#### Answer
**High Yield Bonds (or Junk Bonds):** Junk Bond is a bond that is rated below investment grade by credit rating agencies. It has a low credit rating and a high risk of default.

Because of the higher risk, investors are compensated with higher interest rates, which is why junk bonds are also called high-yield bonds.
