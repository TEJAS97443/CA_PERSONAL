<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-rtp-jul2021
paper: p8
kind: rtp
attempt: jul2021
qfile: old/p8/rtp-jul2021-qa.pdf
afile: old/p8/rtp-jul2021-qa.pdf
status: checked
by: tx-58
date: 2026-10-20
accept: 7, 7
note: Old-scheme Paper 8 (Financial Management and Economics for Finance) Revision Test Paper for the May 2021 examination (ICAI's running heads "INTERMEDIATE (NEW) EXAMINATION: MAY, 2021"; that examination was deferred and held in July 2021, attempt jul2021). ICAI's own copy is gone; the file is the cacult.com mirror named in bank/sources.json, with no mirror banner (the original Word export). Only Part A Financial Management is transcribed (questions pp.1-7, "Suggested Answers" pp.7-22); Section B Economics for Finance (from p.23) is not. ICAI prints no marks and no instructions, as every RTP. ICAI's chapter headings before the questions (Ratio Analysis, Cost of Capital, Capital Structure, Leverage, Investment Decisions, Risk Analysis in Capital Budgeting, Dividend Decision, Management of Working Capital, Miscellaneous) are headings, not question text, and are not transcribed. Item model: Q1-Q9 are one numerical problem each (their requirements, e.g. Q2 (A)-(D) and Q3 (i)-(ii), work on the same data and are answered as one connected working, so they stay inside one item); Q10 (i) and (ii) are separate theory questions (q10i, q10ii). Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics. Q6 is out of syllabus (oos): ICAI's own heading for it is "Risk Analysis in Capital Budgeting" (expected NPV and sensitivity analysis), which is not in the new Paper 6A syllabus or the January 2027 Study Material; nearest tag fm.capbud.npv (lead ruling). Every table was rebuilt from the rendered pages; ICAI's stacked fractions are written in KaTeX (inside table cells inline with a slash) with ICAI's own words, numbers and symbols, and its subscripts (Kd, Ke, Ko, P0, D1, Wd, We) as KaTeX subscripts in formulas and as plain letters in running text, as the text layer reads them. ICAI's own slips are kept and noted on their items. Accepted numbers (check.py; each read on the page): 7 twice, the hidden "7B" that the text layer carries in the PV factor tables of Q5 (p.4) and Q6 (p.5), which the rendered pages do not show (not transcribed). check.py's info line on pp.23-28 is Section B Economics for Finance, not transcribed.
---

---
item: q1
qno: 1
type: descriptive
tags: fm.ratio.profit, fm.ratio.liquidity, fm.wc.basics
difficulty: medium
q: 1
a: 7-8
note: Kept as printed: "for each of the financing policy" (question), "Advise:" and "aggressive financial policy" (answer). In the Return on owner's equity table ICAI's text layer splits "Net Pr ofit"; the rendered page reads "Net Profit".
---
#### Question
Given below are the estimations for the next year by Niti Ltd.:

| Particulars | (₹ in crores) |
|---|---|
| Fixed Assets | 5.20 |
| Current Liabilities | 4.68 |
| Current Assets | 7.80 |
| Sales | 23.00 |
| EBIT | 2.30 |

The company will issue equity funds of ₹ 5 crores in the next year. It is also considering the debt alternatives of ₹ 3.32 crores for financing the assets. The company wants to adopt one of the policies given below:

**(₹ in crores)**

| Financing Policy | Short term debt @ 12% | Long term debt @ 16% | Total |
|---|---:|---:|---:|
| Conservative | 1.08 | 2.24 | 3.32 |
| Moderate | 2.00 | 1.32 | 3.32 |
| Aggressive | 3.00 | 0.32 | 3.32 |

Assuming corporate tax rate at 30%, CALCULATE the following for each of the financing policy:

(i) Return on total assets

(ii) Return on owner's equity

(iii) Net Working capital

(iv) Current Ratio

Also advise which Financing policy should be adopted if the company wants high returns.
#### Answer
**(i) Return on total assets**

Return on total assets = $\dfrac{\text{EBIT (1 - T)}}{\text{Total assets (FA + CA)}}$

= $\dfrac{\text{₹ 2.30 crores (1- 0.3)}}{\text{₹ 5.20 crores + ₹ 7.80 crores}}$

= $\dfrac{\text{₹ 1.61crores}}{\text{₹ 13 crores}}$ = 0.1238 or 12.38%

**(ii) Return on owner's equity**

(Amount in ₹)

| | Financing policy (₹) | | |
|---|---:|---:|---:|
| | **Conservative** | **Moderate** | **Aggressive** |
| Expected EBIT | 2,30,00,000 | 2,30,00,000 | 2,30,00,000 |
| *Less:* Interest | | | |
| Short term Debt @ 12% | 12,96,000 | 24,00,000 | 36,00,000 |
| Long term Debt @ 16% | 35,84,000 | 21,12,000 | 5,12,000 |
| Earnings before tax (EBT) | 1,81,20,000 | 1,84,88,000 | 1,88,88,000 |
| *Less:* Tax @ 30% | 54,36,000 | 55,46,400 | 56,66,400 |
| Earnings after Tax (EAT) | 1,26,84,000 | 1,29,41,600 | 1,32,21,600 |
| Owner's Equity | 5,00,00,000 | 5,00,00,000 | 5,00,00,000 |
| Return on owner's equity = Net Profit after taxes (EAT)/Owners'equity | = 1,26,84,000/5,00,00,000<br>= 0.2537 or 25.37% | = 1,29,41,600/5,00,00,000<br>= 0.2588 or 25.88% | = 1,32,21,600/5,00,00,000<br>= 0.2644 or 26.44% |

**(iii) Net Working capital**

(₹ in crores)

| | Financing policy | | |
|---|---:|---:|---:|
| | **Conservative** | **Moderate** | **Aggressive** |
| Current Liabilities (Excluding Short Term Debt) | 4.68 | 4.68 | 4.68 |
| Short term Debt | 1.08 | 2.00 | 3.00 |
| Total Current Liabilities | 5.76 | 6.68 | 7.68 |
| Current Assets | 7.80 | 7.80 | 7.80 |
| Net Working capital<br>= Current Assets - Current Liabilities | 7.80 - 5.76<br>= 2.04 | 7.80 - 6.68<br>= 1.12 | 7.80 - 7.68<br>= 0.12 |

**(iv) Current ratio**

(₹ in crores)

| | Financing policy | | |
|---|---:|---:|---:|
| | **Conservative** | **Moderate** | **Aggressive** |
| Current Ratio = Current Assets/Current Liabilities | = 7.80/5.76 = 1.35 | = 7.80/6.68 = 1.17 | = 7.80/7.68 = 1.02 |

**Advise**: It is advisable to adopt aggressive financial policy, if the company wants high return as the return on owner's equity is maximum in this policy i.e. 26.44%.
#### Approach
Return on total assets uses EBIT after tax over all assets; for owner's equity deduct each policy's interest first, and remember short-term debt is a current liability.

---
item: q2
qno: 2
type: descriptive
tags: fm.coc.wacc, fm.coc.equity, fm.coc.debt
difficulty: medium
q: 1-2
a: 8-10
note: ICAI's requirements (A)-(D) work on the same data and its answer runs on from (A) to (D) (the cost of new equity of (A)(iii) and the proportions of (B) are reused in (D)), so Q2 is one item. Kept as printed: "New equity share (assuming new equity from retained earnings)" (question) and its answer's heading "Cost of new equity shares"; "Preference Share" / "Preference Shares" in the two tables. The text layer prints a stray "S" before "So, ₹ 23,600" in (C) and omits the "∴" before "The cost of new issue" in (D); written as the rendered page shows them.
---
#### Question
Indel Ltd. has the following capital structure, which is considered to be optimum as on 31st March, 2021:

| Particulars | (₹) |
|---|---:|
| 14% Debentures | 60,000 |
| 11% Preference shares | 20,000 |
| Equity Shares (10,000 shares) | 3,20,000 |
| | 4,00,000 |

The company share has a market price of ₹ 47.20. Next year dividend per share is 50% of year 2020 EPS. The following is the uniform trend of EPS for the preceding 10 years which is expected to continue in future.

| Year | EPS (₹) | Year | EPS (₹) |
|---|---:|---|---:|
| 2011 | 2.00 | 2016 | 3.22 |
| 2012 | 2.20 | 2017 | 3.54 |
| 2013 | 2.42 | 2018 | 3.90 |
| 2014 | 2.66 | 2019 | 4.29 |
| 2015 | 2.93 | 2020 | 4.72 |

The company issued new debentures carrying 16% rate of interest and the current market price of debenture is ₹ 96.

Preference shares of ₹ 18.50 (with annual dividend of ₹ 2.22 per share) were also issued. The company is in 30% tax bracket.

(A) CALCULATE after tax:

(i) Cost of new debt

(ii) Cost of new preference shares

(iii) New equity share (assuming new equity from retained earnings)

(B) CALCULATE marginal cost of capital when no new shares are issued.

(C) DETERMINE the amount that can be spent for capital investment before new ordinary shares must be sold, assuming that the retained earnings for next year’s investment is 50 percent of earnings of 2020.

(D) COMPUTE marginal cost of capital when the fund exceeds the amount calculated in (C), assuming new equity is issued at ₹ 40 per share?
#### Answer
(A) (i) Cost of new debt

$K_d$ = $\dfrac{I(1- t)}{P_0}$

= $\dfrac{\text{₹ } 16(1 - 0.3)}{\text{₹ 96}}$ = 0.11667

(ii) Cost of new preference shares

$K_p$ = $\dfrac{\text{₹ 2.22}}{\text{₹ 18.5}}$ = 0.12

(iii) Cost of new equity shares

$K_e$ = $\dfrac{D_1}{P_0} + g$

= $\dfrac{\text{₹ 2.36}}{\text{₹ 47.20}} + 0.10$

= 0.05 + 0.10 = 0.15

Calculation of g when there is a uniform trend (on the basis of EPS)

= $\dfrac{\text{EPS (2012) - EPS (2011)}}{\text{EPS (2011)}}$ = $\dfrac{\text{₹ 2.20} - \text{₹ 2.00}}{\text{₹ 2.00}}$ = 0.10 or 10%

Calculation of $D_1$

$D_1$ = 50% of 2020 EPS = 50% of ₹ 4.72 = ₹ 2.36

(B) Calculation of marginal cost of capital

| Type of Capital | Proportion | Specific Cost | Product |
|---|---:|---:|---:|
| **(1)** | **(2)** | **(3)** | **(2) × (3) = (4)** |
| Debentures | 0.15 | 0.11667 | 0.0175 |
| Preference Share | 0.05 | 0.1200 | 0.0060 |
| Equity Share | 0.80 | 0.1500 | 0.1200 |
| | | Marginal cost of capital | 0.1435 |

(C) The company can spend the following amount without increasing marginal cost of capital and without selling the new shares:

Retained earnings = 50% of EPS of 2020 × outstanding equity shares

= 50% of ₹ 4.72 × 10,000 shares = ₹ 23,600

The ordinary equity (Retained earnings in this case) is 80% of total capital.

So, ₹ 23,600 = 80% of Total Capital

∴ Capital investment before issuing equity shares = $\dfrac{\text{₹ 23,600}}{0.80}$ = ₹ 29,500

(D) If the company spends in excess of ₹ 29,500, it will have to issue new equity shares at ₹ 40 per share.

∴ The cost of new issue of equity shares will be:

$K_e$ = $\dfrac{D_1}{P_0} + g$ = $\dfrac{\text{₹ 2.36}}{\text{₹ 40}} + 0.10$ = 0.159

The marginal cost of capital will be:

| Type of Capital | Proportion | Specific Cost | Product |
|---|---:|---:|---:|
| **(1)** | **(2)** | **(3)** | **(2) × (3) = (4)** |
| Debentures | 0.15 | 0.11667 | 0.0175 |
| Preference Shares | 0.05 | 0.1200 | 0.0060 |
| Equity Shares (New) | 0.80 | 0.1590 | 0.1272 |
| | | Marginal cost of capital | 0.1507 |
#### Approach
Read g from the steady EPS trend (each year 10% above the last) and D1 as half of the 2020 EPS; retained earnings are the 80% equity slice, so they fix how much can be raised before new shares are needed.

---
item: q3
qno: 3
type: descriptive
tags: fm.cs.theories
difficulty: medium
q: 2-3
a: 10-11
note: The question numbers its requirements (i) and (ii); ICAI's answer labels them (a) and (b); both kept. The column heads of the answer's tables are two-level (the name, then (a), (b) ... or (1), (2) ...), written as a header row and a bold second row (§9.3); the last head of the MM statement is ICAI's stacked "Ke = Ko + (Ko - Kd) Debt/Equity", written inline.
---
#### Question
Zordon Ltd. has net operating income of ₹ 5,00,000 and total capitalization of ₹ 50,00,000 during the current year. The company is contemplating to introduce debt financing in capital structure and has various options for the same. The following information is available at different levels of debt value:

| Debt value (₹) | Interest rate (%) | Equity capitalization rate (%) |
|---:|---:|---:|
| 0 | - | 10.00 |
| 5,00,000 | 6.0 | 10.50 |
| 10,00,000 | 6.0 | 11.00 |
| 15,00,000 | 6.2 | 11.30 |
| 20,00,000 | 7.0 | 12.40 |
| 25,00,000 | 7.5 | 13.50 |
| 30,00,000 | 8.0 | 16.00 |

Assuming no tax and that the firm always maintains books at book values, you are REQUIRED to calculate:

(i) Amount of debt to be employed by firm as per traditional approach.

(ii) Equity capitalization rate, if MM approach is followed.
#### Answer
**(a) Amount of debt to be employed by firm as per traditional approach**

**Calculation of Equity, $W_d$ and $W_e$**

| Total Capital (₹) | Debt (₹) | $W_d$ | Equity value (₹) | $W_e$ |
|---:|---:|---:|---:|---:|
| **(a)** | **(b)** | **(b)/(a)** | **(c) = (a) - (b)** | **(c)/(a)** |
| 50,00,000 | 0 | - | 50,00,000 | 1.0 |
| 50,00,000 | 5,00,000 | 0.1 | 45,00,000 | 0.9 |
| 50,00,000 | 10,00,000 | 0.2 | 40,00,000 | 0.8 |
| 50,00,000 | 15,00,000 | 0.3 | 35,00,000 | 0.7 |
| 50,00,000 | 20,00,000 | 0.4 | 30,00,000 | 0.6 |
| 50,00,000 | 25,00,000 | 0.5 | 25,00,000 | 0.5 |
| 50,00,000 | 30,00,000 | 0.6 | 20,00,000 | 0.4 |

**Statement of Weighted Average Cost of Capital (WACC)**

| $K_e$ | $W_e$ | $K_d$ | $W_d$ | $K_e W_e$ | $K_d W_d$ | $K_o$ |
|---:|---:|---:|---:|---:|---:|---:|
| **(1)** | **(2)** | **(3)** | **(4)** | **(5) = (1) x (2)** | **(6) = (3) x (4)** | **(7) = (5) + (6)** |
| 0.100 | 1.0 | - | - | 0.100 | - | 0.100 |
| 0.105 | 0.9 | 0.060 | 0.1 | 0.095 | 0.006 | 0.101 |
| 0.110 | 0.8 | 0.060 | 0.2 | 0.088 | 0.012 | 0.100 |
| 0.113 | 0.7 | 0.062 | 0.3 | 0.079 | 0.019 | 0.098 |
| 0.124 | 0.6 | 0.070 | 0.4 | 0.074 | 0.028 | 0.102 |
| 0.135 | 0.5 | 0.075 | 0.5 | 0.068 | 0.038 | 0.106 |
| 0.160 | 0.4 | 0.080 | 0.6 | 0.064 | 0.048 | 0.112 |

So, amount of Debt to be employed = ₹ 15,00,000 as WACC is minimum at this level of debt i.e. 9.8%.

**(b)** As per MM approach, cost of the capital (Ko) remains constant and cost of equity increases linearly with debt.

Value of a firm = $\dfrac{\text{Net Operating Income (NOI)}}{K_0}$

₹ 50,00,000 = $\dfrac{\text{₹ 5,00,000}}{K_o}$

$K_o$ = $\dfrac{\text{₹ 5,00,000}}{\text{₹ 50,00,000}}$ = 10%

**Statement of Equity Capitalization rate (ke) under MM approach**

| Debt (₹) | Equity (₹) | Debt/Equity | $K_o$ | $K_d$ | $K_o$ - $K_d$ | $K_e$ = $K_o$ + ($K_o$ - $K_d$) Debt/Equity |
|---:|---:|---:|---:|---:|---:|---:|
| **(1)** | **(2)** | **(3) = (1)/(2)** | **(4)** | **(5)** | **(6) = (4) -(5)** | **(7) = (4) + (6) x (3)** |
| 0 | 50,00,000 | 0 | 0.10 | - | 0.100 | 0.100 |
| 5,00,000 | 45,00,000 | 0.11 | 0.10 | 0.060 | 0.040 | 0.104 |
| 10,00,000 | 40,00,000 | 0.25 | 0.10 | 0.060 | 0.040 | 0.110 |
| 15,00,000 | 35,00,000 | 0.43 | 0.10 | 0.062 | 0.038 | 0.116 |
| 20,00,000 | 30,00,000 | 0.67 | 0.10 | 0.070 | 0.030 | 0.120 |
| 25,00,000 | 25,00,000 | 1.00 | 0.10 | 0.075 | 0.025 | 0.125 |
| 30,00,000 | 20,00,000 | 1.50 | 0.10 | 0.080 | 0.020 | 0.130 |
#### Approach
Under the traditional approach find the debt level with the lowest WACC; under MM the overall rate stays at NOI ÷ firm value, so Ke rises with the debt-equity ratio.

---
item: q4
qno: 4
type: descriptive
tags: fm.lev.leverage
difficulty: medium
q: 3
a: 11-14
note: Kept as printed: "if sales is increased" and "if sales is decreased" (answer), "if EBIT increase by 15%" (question). ICAI prints the 15% sales-increase answer's final result and "hence verified." in bold, and each "Verification" heading in bold italics.
---
#### Question
Following information has been extracted from the accounts of newly incorporated Textyl Pvt. Ltd. for the Financial Year 2020-21:

| | |
|---|---:|
| Sales | ₹ 15,00,000 |
| P/V ratio | 70% |
| Operating Leverage | 1.4 times |
| Financial Leverage | 1.25 times |

Using the concept of leverage, find out and verify in each case:

(i) The percentage change in taxable income if sales increase by 15%.

(ii) The percentage change in EBIT if sales decrease by 10%.

(iii) The percentage change in taxable income if EBIT increase by 15%.
#### Answer
**Workings:**

1. Contribution = Sales x P/V ratio

   = ₹ 15,00,000 x 70% = ₹ 10,50,000

2. Operating Leverage = $\dfrac{\text{Contribution}}{\text{Earnings before interest and tax (EBIT)}}$

   Or, 1.4 = $\dfrac{\text{₹ 10,50,000}}{\text{EBIT}}$

   EBIT = ₹ 7,50,000

3. Financial leverage = $\dfrac{\text{EBIT}}{\text{EBT}}$

   Or, 1.25 = $\dfrac{\text{₹ 7,50,000}}{\text{EBT}}$

   EBT = ₹ 6,00,000

4. Fixed Cost = Contribution – EBIT

   = ₹ 10,50,000 – ₹ 7,50,000 = ₹ 3,00,000

5. Interest = EBIT – EBT

   = ₹ 7,50,000 – ₹ 6,00,000 = ₹ 1,50,000

6. Income Statement

| Particulars | Amount (₹) |
|---|---:|
| Sales | 15,00,000 |
| Less: Variable cost (30% of ₹ 15,00,000) | 4,50,000 |
| Contribution (70% of ₹ 15,00,000) | 10,50,000 |
| Less: Fixed costs | 3,00,000 |
| Earnings before interest and tax (EBIT) | 7,50,000 |
| Less: Interest | 1,50,000 |
| Earnings before tax (EBT) | 6,00,000 |

**(i)** Combined Leverage = $\dfrac{\text{Contribution}}{\text{EBT}}$ = $\dfrac{\text{₹ 10,50,000}}{\text{₹ 6,00,000}}$ = **1.75 times**

*Or,* Combined Leverage = Operating Leverage x Financial Leverage

= 1.4 x 1.25 = **1.75 times**

So, if sales is increased by 15% then taxable income (EBT) will be increased by 1.75 × 15% = **26.25%**

***Verification***

| Particulars | Amount (₹) |
|---|---:|
| New Sales after 15% increase (₹ 15,00,000 + 15% of ₹ 15,00,000) | 17,25,000 |
| *Less:* Variable cost (30% of ₹ 17,25,000) | 5,17,500 |
| Contribution (70% of ₹ 17,25,000) | 12,07,500 |
| *Less:* Fixed costs | 3,00,000 |
| Earnings before interest and tax (EBIT) | 9,07,500 |
| *Less:* Interest | 1,50,000 |
| Earnings before tax after change (EBT) | 7,57,500 |

Increase in Earnings before tax (EBT) = ₹ 7,57,500 - ₹ 6,00,000 = ₹ 1,57,500

So, percentage change in Taxable Income (EBT) = $\dfrac{\text{₹ 1,57,500}}{\text{₹ 6,00,000}}$ × 100 = **26.25%, hence verified.**

**(ii)** Degree of Operating Leverage (Given) = **1.4 times**

So, if sales is decreased by 10% then EBIT will be decreased by 1.4 × 10% = **14%**

***Verification***

| Particulars | Amount (₹) |
|---|---:|
| New Sales after 10% decrease (₹ 15,00,000 - 10% of ₹ 15,00,000) | 13,50,000 |
| *Less:* Variable cost (30% of ₹ 13,50,000) | 4,05,000 |
| Contribution (70% of ₹ 13,50,000) | 9,45,000 |
| *Less:* Fixed costs | 3,00,000 |
| Earnings before interest and tax after change (EBIT) | 6,45,000 |

Decrease in Earnings before interest and tax (EBIT) = ₹ 7,50,000 - ₹ 6,45,000 = ₹ 1,05,000

So, percentage change in EBIT = $\dfrac{\text{₹ 1,05,000}}{\text{₹ 7,50,000}} \times 100$ = **14%, hence verified.**

**(iii)** Degree of Financial Leverage (Given) = **1.25 times**

So, if EBIT increases by 15% then Taxable Income (EBT) will be increased by 1.25 × 15% = **18.75%**

***Verification***

| Particulars | Amount (₹) |
|---|---:|
| New EBIT after 15% increase (₹ 7,50,000 + 15% of ₹ 7,50,000) | 8,62,500 |
| *Less:* Interest | 1,50,000 |
| Earnings before Tax after change (EBT) | 7,12,500 |

Increase in Earnings before Tax = ₹ 7,12,500 - ₹ 6,00,000 = ₹ 1,12,500

So, percentage change in Taxable Income (EBT) = $\dfrac{\text{₹ 1,12,500}}{\text{₹ 6,00,000}} \times 100$ = **18.75%, hence verified.**
#### Approach
Work back from the leverages: contribution from the P/V ratio, EBIT from operating leverage, EBT from financial leverage; then a % change in sales moves EBT by combined leverage times it.

---
item: q5
qno: 5
type: descriptive
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: medium
q: 3-4
a: 14-15
note: The question's PV factor table carries a hidden "7B" in its text layer (pp.4-5, also in Q6) that the rendered page does not show; not transcribed. Kept as printed: "reducing labour , maintenance" and "The annual cost are as follows" (question), "Advise:" (answer).
---
#### Question
The General Manager of Merry Ltd. is considering the replacement of five-year-old equipment. The company has to incur excessive maintenance cost of the equipment. The equipment has zero written down value. It can be modernized at a cost of ₹ 1,40,000 enhancing its economic life to 5 years. The equipment could be sold for ₹ 30,000 after 5 years. The modernization would help in material handling and in reducing labour , maintenance & repairs costs.

The company has another alternative to buy a new machine at a cost of ₹ 3,50,000 with an economic life of 5 years and salvage value of ₹ 60,000. The new machine is expected to be more efficient in reducing costs of material handling, labour, maintenance & repairs, etc.

The annual cost are as follows:

| | Existing Equipment (₹) | Modernization (₹) | New Machine (₹) |
|---|---:|---:|---:|
| Wages & Salaries | 45,000 | 35,500 | 15,000 |
| Supervision | 20,000 | 10,000 | 7,000 |
| Maintenance | 25,000 | 5,000 | 2,500 |
| Power | 30,000 | 20,000 | 15,000 |
| | 1,20,000 | 70,500 | 39,500 |

Assuming tax rate of 50% and required rate of return of 10%, should the company modernize the equipment or buy a new machine?

PV factor at 10% are as follows:

| Year | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|
| PV factor | 0.909 | 0.826 | 0.751 | 0.683 | 0.621 |
#### Answer
**Workings:**

**Calculation of Depreciation:**

On Modernized Equipment = $\dfrac{\text{₹ 1,40,000} - \text{₹ 30,000}}{\text{5 years}}$ = ₹ 22,000 p.a.

On New machine = $\dfrac{\text{₹ 3,50,000} - \text{₹ 60,000}}{\text{5 years}}$ = ₹ 58,000 p.a.

**(i) Calculation of Incremental annual cash inflows/ savings:**

| Particulars | Existing Equipment (₹) | Modernization | | New Machine | |
|---|---:|---:|---:|---:|---:|
| | | **Amount (₹)** | **Savings (₹)** | **Amount (₹)** | **Savings (₹)** |
| | **(1)** | **(2)** | **(3)=(1)-(2)** | **(4)** | **(5)=(1)-(4)** |
| Wages & Salaries | 45,000 | 35,500 | 9,500 | 15,000 | 30,000 |
| Supervision | 20,000 | 10,000 | 10,000 | 7,000 | 13,000 |
| Maintenance | 25,000 | 5,000 | 20,000 | 2,500 | 22,500 |
| Power | 30,000 | 20,000 | 10,000 | 15,000 | 15,000 |
| **Total** | **1,20,000** | **70,500** | **49,500** | **39,500** | **80,500** |
| *Less:* Depreciation (Refer Workings) | | | 22,000 | | 58,000 |
| **Total Savings** | | | **27,500** | | **22,500** |
| *Less*: Tax @ 50% | | | 13,750 | | 11,250 |
| **After Tax Savings** | | | **13,750** | | **11,250** |
| *Add*: Depreciation | | | 22,000 | | 58,000 |
| **Incremental Annual Cash Inflows** | | | **35,750** | | **69,250** |

**(ii) Calculation of Net Present Value (NPV)**

| Particulars | Year | Modernization (₹) | New Machine (₹) |
|---|---|---:|---:|
| Initial Cash outflow (A) | 0 | 1,40,000.00 | 3,50,000.00 |
| Incremental Cash Inflows | 1-5 | 1,35,492.50<br>(₹ 35,750 x 3.790) | 2,62,457.50<br>(₹ 69,250 x 3.790) |
| Salvage value | 5 | 18,630.00<br>(₹ 30,000 x 0.621) | 37,260.00<br>(₹ 60,000 x 0.621) |
| PV of Cash inflows (B) | | 1,54,122.50 | 2,99,717.50 |
| Net Present Value (B - A) | | 14,122.50 | (50,282.50) |

**Advise:** The company should modernize its existing equipment and not buy a new machine because NPV is positive in modernization of equipment.
#### Approach
The existing equipment's costs are the base: each option's saving over them, less tax after depreciation, plus depreciation back, gives its annual cash inflow.

---
item: q6
qno: 6
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: hard
q: 4-5
a: 15-16
note: Out of syllabus (old scheme): ICAI's own heading for this question is "Risk Analysis in Capital Budgeting"; it asks for the expected NPV and a sensitivity analysis of NPV to each variable, which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material; nearest tag fm.capbud.npv (lead ruling). The PV factor table carries the same hidden "7B" in its text layer as Q5; not transcribed. Kept as printed: "Sensitivity Analysis under variable different value", "Year Cash Flow", "1205.09" and "1400" without commas; ICAI prints "(in Crores)" in italics in the sensitivity table (answer).
---
#### Question
X Ltd is considering installation of new machine with the following details:

| Sr. No. | Particulars | Figures |
|---|---|---:|
| 1 | Initial Investment | ₹ 1400 Crore |
| 2 | Annual unit sales | 100 Crore |
| 3 | Selling price per unit | ₹ 40 |
| 4 | Variable cost per unit | ₹ 20 |
| 5 | Annual Fixed costs | ₹ 500 Crore |
| 6 | Depreciation | ₹ 200 Crore |
| 7 | Discount Rate | 12% |
| 8 | Tax rate | 30% |

Consider Life of the project as 4 years with no salvage value.

Required:

(i) CALCULATE the expected NPV of the project.

(ii) COMPUTE the impact on the project’s NPV if change in variables is as under and also compute which variable is having maximum impact on NPV.

| Sr. No. | Variable | Figures |
|---|---|---:|
| 1 | Unit sold per year | 85 Crore |
| 2 | Selling price per unit | ₹ 39 |
| 3 | Variable cost per unit | ₹ 22 |
| 4 | Annual Fixed costs | ₹ 575 Crore |

PV factor at 12% are as follows:

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| PV factor | 0.893 | 0.797 | 0.712 | 0.636 |
#### Answer
**(i) Calculation of Net Cash Inflow per year:**

| | Particulars | Amount (₹) |
|---|---|---:|
| A | Selling Price Per Unit (A) | 40 |
| B | Variable Cost Per Unit (B) | 20 |
| C | Contribution Per Unit (C = A - B) | 20 |
| D | Number of Units Sold Per Year | 100 Crore |
| E | Total Contribution (E = C × D) | 2,000 Crore |
| F | Annual Fixed costs | 500 Crore |
| G | Depreciation | 200 Crore |
| H | Net Profit before taxes (H = E - F - G) | 1,300 Crore |
| I | Tax @ 30% of H | 390 Crore |
| J | Net Cash Inflow Per Year (J = H - I + G) | 910 Crore |

**Calculation of expected Net Present Value (NPV) of the Project:**

| Year | Year Cash Flow (₹ in Crore) | PVAF @ 12% | Present Value (PV) (₹ in Crore) |
|---|---:|---:|---:|
| 0 | (1400.00) | 1.000 | (1400.00) |
| 1-4 | 910.00 | 3.038 | 2,764.58 |
| | | Net Present Value | 1,364.58 |

**(ii) Sensitivity Analysis under variable different value:**

| | Changes in variable | Base | Units sold per year is 85 Crore | Selling price per unit is ₹ 39 | Variable cost per unit is ₹ 22 | Annual Fixed costs is ₹ 575 Crore |
|---|---|---:|---:|---:|---:|---:|
| | **Particulars** | **(₹)** | **(₹)** | **(₹)** | **(₹)** | **(₹)** |
| A | Selling Price Per Unit | 40 | 40 | 39 | 40 | 40 |
| B | Variable Cost Per Unit | 20 | 20 | 20 | 22 | 20 |
| C | Contribution Per Unit (C = A - B) | 20 | 20 | 19 | 18 | 20 |
| D | Number of Units Sold Per Year *(in Crores)* | 100 | 85 | 100 | 100 | 100 |
| E | Total Contribution (E = C × D) | 2,000 | 1,700 | 1,900 | 1,800 | 2,000 |
| F | Annual Fixed Cost *(in Crores)* | 500 | 500 | 500 | 500 | 575 |
| G | Depreciation *(in Crores)* | 200 | 200 | 200 | 200 | 200 |
| H | Net Profit before taxes (H = E - F - G) | 1,300 | 1,000 | 1,200 | 1,100 | 1,225 |
| I | Tax @ 30% of H | 390 | 300 | 360 | 330 | 367.50 |
| J | Net Cash Inflow Per Year (J = H - I + G) | 910 | 700 | 840 | 770 | 857.50 |
| K | (J × 3.038) | 2,764.58 | 2,126.60 | 2,551.92 | 2,339.26 | 2,605.09 |
| L | Initial Cash Flow | 1400 | 1400 | 1400 | 1400 | 1400 |
| M | NPV (K - L) | 1,364.58 | 726.60 | 1,151.92 | 939.26 | 1205.09 |
| N | Change in NPV | - | (637.98) | (212.66) | (425.32) | (159.49) |
| O | Percentage Change in NPV | - | -46.75% | -15.58% | -31.17% | -11.69% |

The above table shows that by varying one variable at a time while keeping the others constant, the impact in percentage terms on the NPV of the project. Thus, it can be seen that the change in units sold per year has the maximum effect on the NPV by 46.75%.

---
item: q7
qno: 7
type: descriptive
tags: fm.div.models
difficulty: medium
q: 5
a: 16-17
note: Kept as printed: "Therefore, Ke is 8 (i.e., 1/12.5)" (for 8%), ". the value of the share" (lower case after the full stop), "would be 12.5 and in such a situation ke> r" (answer (iii), for 12.5%).
---
#### Question
The following information is supplied to you:

| | (₹) |
|---|---:|
| Total Earnings | 2,00,000 |
| No. of equity shares (of ₹ 100 each) | 20,000 |
| Dividend paid | 1,50,000 |
| Price/ Earnings ratio | 12.5 |

Applying Walter’s Model:

(i) ANALYSE whether the company is following an optimal dividend policy.

(ii) COMPUTE P/E ratio at which the dividend policy will have no effect on the value of the share.

(iii) Will your decision change if the P/E ratio is 8 instead of 12.5? ANALYSE.
#### Answer
**(i)** The EPS of the firm is ₹ 10 (i.e., ₹ 2,00,000/ 20,000) and r = 2,00,000/ (20,000 shares × ₹100) = 10%. The P/E Ratio is given at 12.5 and the cost of capital, Ke, may be taken at the inverse of P/E ratio. Therefore, Ke is 8 (i.e., 1/12.5). The firm is distributing total dividends of ₹ 1,50,000 among 20,000 shares, giving a dividend per share of ₹ 7.50. the value of the share as per Walter’s model may be found as follows:

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e}$ = $\dfrac{7.5 + \dfrac{0.1}{0.08}(10 - 7.5)}{0.08}$ = ₹ 132.81

The firm has a dividend payout of 75% (i.e., ₹ 1,50,000) out of total earnings of ₹ 2,00,000. Since, the rate of return of the firm, r, is 10% and it is more than the Ke of 8%, therefore, by distributing 75% of earnings, the firm is not following an optimal dividend policy. The optimal dividend policy for the firm would be to pay zero dividend and in such a situation, the market price would be-

= $\dfrac{0 + \dfrac{0.1}{0.08}(10 - 0)}{0.08}$ = ₹ 156.25

So, theoretically the market price of the share can be increased by adopting a zero payout.

**(ii)** The P/E ratio at which the dividend policy will have no effect on the value of the share is such at which the Ke would be equal to the rate of return, r, of the firm. The Ke would be 10% (= r) at the P/E ratio of 10. Therefore, at the P/E ratio of 10, the dividend policy would have no effect on the value of the share.

**(iii)** If the P/E is 8 instead of 12.5, then the Ke which is the inverse of P/E ratio, would be 12.5 and in such a situation ke> r and the market price, as per Walter’s model would be:

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e}$ = $\dfrac{7.5 + \dfrac{0.1}{0.125}(10 - 7.5)}{0.125}$ = ₹ 76
#### Approach
Take Ke as the inverse of the P/E ratio and compare it with r = EPS ÷ book value per share: under Walter, r above Ke favours retaining everything.

---
item: q8
qno: 8
type: descriptive
tags: fm.wc.estimate
difficulty: hard
q: 5-6
a: 17-19
note: Kept as printed: "till 31.3.202 1" (question, a space inside the year), "2,000units" and "4,500 units." (answer workings (4) and (5)). ICAI's stacked fractions in workings (2)-(5) are written in KaTeX; the text layer splits "Pr imeCost" and "TotalCost", which the rendered page reads "Prime Cost" and "Total Cost".
---
#### Question
MT Ltd. has been operating its manufacturing facilities till 31.3.202 1 on a single shift working with the following cost structure:

| | Per unit (₹) |
|---|---:|
| Cost of Materials | 24 |
| Wages (out of which 60% variable) | 20 |
| Overheads (out of which 20% variable) | 20 |
| | 64 |
| Profit | 8 |
| Selling Price | 72 |

As at 31.3.2021 with the sales of ₹ 17,28,000, the company held:

| | (₹) |
|---|---:|
| Stock of raw materials (at cost) | 1,44,000 |
| Work-in-progress (valued at prime cost) | 88,000 |
| Finished goods (valued at total cost) | 2,88,000 |
| Sundry debtors | 4,32,000 |

In view of increased market demand, it is proposed to double production by working an extra shift. It is expected that a 10% discount will be available from suppliers of raw materials in view of increased volume of business. Selling price will remain the same. The credit period allowed to customers will remain unaltered. Credit availed from suppliers will continue to remain at the present level i.e. 2 months. Lag in payment of wages and overheads will continue to remain at one month.

You are required to CALCULATE the additional working capital requirements, if the policy to increase output is implemented, to assess the impact of double shift for long term as a matter of production policy.
#### Answer
**Workings:**

(1) Statement of cost at single shift and double shift working

| | 24,000 units | | 48,000 Units | |
|---|---:|---:|---:|---:|
| | **Per unit (₹)** | **Total (₹)** | **Per unit (₹)** | **Total (₹)** |
| Raw materials | 24 | 5,76,000 | 21.6 | 10,36,000 |
| Wages: | | | | |
| Variable | 12 | 2,88,000 | 12 | 5,76,000 |
| Fixed | 8 | 1,92,000 | 4 | 1,92,000 |
| Overheads: | | | | |
| Variable | 4 | 96,000 | 4 | 1,92,000 |
| Fixed | 16 | 3,84,000 | 8 | 3,84,000 |
| Total cost | 64 | 15,36,000 | 49.6 | 23,80,800 |
| Profit | 8 | 1,92,000 | 22.4 | 10,75,200 |
| Sales | 72 | 17,28,000 | 72 | 34,56,000 |

(2) Sales in units 2020-21 = $\dfrac{\text{Sales}}{\text{Unit selling price}}$ = $\dfrac{\text{₹ 17,28,000}}{\text{₹ 72}}$ = 24,000 units

(3) Stock of Raw Materials in units on 31.3.2021

= $\dfrac{\text{Value of stock}}{\text{Cost per unit}}$ = $\dfrac{\text{₹ 1,44,000}}{\text{₹ 24}}$ = 6,000 units

(4) Stock of work-in-progress in units on 31.3.2021

= $\dfrac{\text{Value of work-in-progress}}{\text{Prime Cost per unit}}$ = $\dfrac{\text{₹ 88,000}}{\text{₹ (24 + 20)}}$ = 2,000units

(5) Stock of finished goods in units 2020-21

= $\dfrac{\text{Value of stock}}{\text{Total Cost per unit}}$ = $\dfrac{\text{₹ 2,88,000}}{\text{₹ 64}}$ = 4,500 units.

**Comparative Statement of Working Capital Requirement**

| | Single Shift (24,000 units) | | | Double Shift (48,000 units) | | |
|---|---:|---:|---:|---:|---:|---:|
| | **Units** | **Rate (₹)** | **Amount (₹)** | **Units** | **Rate (₹)** | **Amount (₹)** |
| **Current Assets** | | | | | | |
| Inventories: | | | | | | |
| Raw Materials | 6,000 | 24 | 1,44,000 | 12,000 | 21.6 | 2,59,200 |
| Work-in-Progress | 2,000 | 44 | 88,000 | 2,000 | 37.6 | 75,200 |
| Finished Goods | 4,500 | 64 | 2,88,000 | 9,000 | 49.6 | 4,46,400 |
| Sundry Debtors | 6,000 | 64 | 3,84,000 | 12,000 | 49.6 | 5,95,200 |
| Total Current Assets (A) | | | 9,04,000 | | | 13,76,000 |
| **Current Liabilities** | | | | | | |
| Creditors for Materials | 4,000 | 24 | 96,000 | 8,000 | 21.6 | 1,72,800 |
| Creditors for Wages | 2,000 | 20 | 40,000 | 4,000 | 16 | 64,000 |
| Creditors for Overheads | 2,000 | 20 | 40,000 | 4,000 | 12 | 48,000 |
| Total Current Liabilities (B) | | | 1,76,000 | | | 2,84,800 |
| **Working Capital (A) – (B)** | | | **7,28,000** | | | **10,91,200** |

**Analysis:** Additional Working Capital requirement = ₹ 10,91,200 – ₹ 7,28,000 = ₹3,63,200, if the policy to increase output is implemented.
#### Approach
Turn each balance into units (stock values ÷ their cost basis, debtors at cost), then value the doubled units at the new per-unit costs: material falls 10% and fixed costs spread over twice the output.

---
item: q9
qno: 9
type: descriptive
tags: fm.wc.estimate
difficulty: hard
q: 6-7
a: 19-21
note: ICAI's stacked fractions inside the statement's cells are written inline with a slash, ICAI's numbers and symbols as printed (e.g. "X (1,50,000units × ₹ 30/12 months × 2 months)"). Kept as printed: "Y– 1 months" (question (a)), "1 months and ½ months" (question (f)), "The credit allowed by debtors is 2 months" (question (e)), "Amount in (₹)" (answer), "1,50,000units" without a space.
---
#### Question
While applying for financing of working capital requirements to a commercial bank, TN Industries Ltd. projected the following information for the next year:

| Cost Element | Per unit (₹) | Per unit (₹) |
|---|---:|---:|
| Raw materials | | |
| X | 30 | |
| Y | 7 | |
| Z | 6 | 43 |
| Direct Labour | | 25 |
| Manufacturing and administration overheads (excluding depreciation) | | 20 |
| Depreciation | | 10 |
| Selling overheads | | 15 |
| | | 113 |

Additional Information:

(a) Raw Materials are purchased from different suppliers leading to different credit period allowed as follows:

X – 2 months; Y– 1 months; Z – ½ month

(b) Production cycle is of ½ month. Production process requires full unit of X and Y in the beginning of the production. Z is required only to the extent of half unit in the beginning and the remaining half unit is needed at a uniform rate during the production process.

(c) X is required to be stored for 2 months and other materials for 1 month.

(d) Finished goods are held for 1 month.

(e) 25% of the total sales is on cash basis and remaining on credit basis. The credit allowed by debtors is 2 months.

(f) Average time lag in payment of all overheads is 1 months and ½ months for direct labour.

(g) Minimum cash balance of ₹ 8,00,000 is to be maintained.

CALCULATE the estimated working capital required by the company on cash cost basis if the budgeted level of activity is 1,50,000 units for the next year. The company also intends to increase the estimated working capital requirement by 10% to meet the contingencies. (You may assume that production is carried on evenly throughout the year and direct labour and other overheads accrue similarly.)
#### Answer
**Statement showing Working Capital Requirements of TN Industries Ltd. (on cash cost basis)**

| | Amount in (₹) | Amount in (₹) |
|---|---:|---:|
| **A. Current Assets** | | |
| (i) Inventories: | | |
| Raw material | | |
| X (1,50,000units × ₹ 30/12 months × 2 months) | 7,50,000 | |
| Y (1,50,000units × ₹ 7/12 months × 1 month) | 87,500 | |
| Z (1,50,000units × ₹ 6/12 months × 1 month) | 75,000 | |
| WIP (1,50,000units × ₹ 64/12 months × 0.5 month) | 4,00,000 | |
| Finished goods (1,50,000units × ₹ 88/12 months × 1 month) | 11,00,000 | 24,12,500 |
| (ii) Receivables (Debtors)<br>(1,50,000units × ₹ 103/12 months × 2 months) × 0.75 | | 19,31,250 |
| (iii) Cash and bank balance | | 8,00,000 |
| **Total Current Assets** | | **51,43,750** |
| **B. Current Liabilities:** | | |
| (i) Payables (Creditors) for Raw materials | | |
| X (1,50,000units × ₹ 30/12 months × 2 months) | 7,50,000 | |
| Y (1,50,000units × ₹ 7/12 months × 1 month) | 87,500 | |
| Z (1,50,000units × ₹ 6/12 months × 0.5 month) | 37,500 | 8,75,000 |
| (ii) Outstanding Direct Labour<br>(1,50,000units × ₹ 25/12 months × 0.5 month) | | 1,56,250 |
| (iii) Outstanding Manufacturing and administration overheads<br>(1,50,000units × ₹ 20/12 months × 1 month) | | 2,50,000 |
| (iv) Outstanding Selling overheads<br>(1,50,000units × ₹ 15/12 months × 1 month) | | 1,87,500 |
| **Total Current Liabilities** | | **14,68,750** |
| **Net Working Capital Needs (A – B)** | | **36,75,000** |
| **Add:** Provision for contingencies @ 10% | | 3,67,500 |
| **Working capital requirement** | | **40,42,500** |

**Workings:**

**1.**

| (i) Computation of Cash Cost of Production | Per unit (₹) |
|---|---:|
| Raw Material consumed | 43 |
| Direct Labour | 25 |
| Manufacturing and administration overheads | 20 |
| Cash cost of production | 88 |
| **(ii) Computation of Cash Cost of Sales** | **Per unit (₹)** |
| Cash cost of production as in (i) above | 88 |
| Selling overheads | 15 |
| Cash cost of sales | 103 |

**2. Calculation of cost of WIP**

| Particulars | Per unit (₹) |
|---|---:|
| Raw material (added at the beginning): | |
| X | 30 |
| Y | 7 |
| Z (₹ 6 x 50%) | 3 |
| Cost during the year: | |
| Z {(₹ 6 x 50%) x 50%} | 1.5 |
| Direct Labour (₹ 25 x 50%) | 12.5 |
| Manufacturing and administration overheads (₹ 20 x 50%) | 10 |
| | 64 |
#### Approach
On a cash cost basis leave depreciation out of every cost; WIP carries full X and Y, half of Z at the start and half of the rest (Z's second half, labour and overheads) over the half-month cycle.

---
item: q10i
qno: 10
part: (i)
type: descriptive
tags: fm.intro.objectives
difficulty: easy
q: 7
a: 21
note: Kept as printed: "Profit Maximization" and "Profit maximisation" (both spellings), "the returns flow is more early and quick".
---
#### Question
"Profit Maximization cannot be the sole objective of a company". COMMENT.
#### Answer
**Following are the reasons due to which Profit Maximization cannot be the sole objective of a company:**

**(a) The term profit is vague. It does not clarify what exactly it means.** It conveys a different meaning to different people. For example, profit may be in short term or long-term period; it may be total profit or rate of profit etc.

**(b) Profit maximisation has to be attempted with a realisation of risks involved.** There is a direct relationship between risk and profit. Many risky propositions yield high profit. Higher the risk, higher is the possibility of profits. If profit maximisation is the only goal, then risk factor is altogether ignored. This implies that finance manager will accept highly risky proposals also, if they give high profits. In practice, however, risk is very important consideration and has to be balanced with the profit objective.

**(c) Profit maximisation as an objective does not take into account the time pattern of returns.** Proposal A may give a higher amount of profits as compared to proposal B, yet if the returns of proposal A begin to flow say 10 years later, proposal B may be preferred which may have lower overall profit but the returns flow is more early and quick.

**(d) Profit maximisation as an objective is too narrow.** It fails to take into account the social considerations as also the obligations to various interests of workers, consumers, society, as well as ethical trade practices. If these factors are ignored, a company cannot survive for long. Profit maximization at the cost of social and moral obligations is a short sighted policy.

---
item: q10ii
qno: 10
part: (ii)
type: descriptive
tags: fm.sources.long
difficulty: easy
q: 7
a: 21-22
note: Kept as printed: "does not force a company into liquidity" and "where dividend payment are in arrears".
---
#### Question
DISCUSS the advantages and disadvantages of raising funds by issue of preference shares.
#### Answer
**Advantages and disadvantages of raising funds by issue of preference shares**

**Advantages**

(i) No dilution in EPS on enlarged capital base – On the other hand if equity shares are issued it reduces EPS, thus affecting the market perception about the company.

(ii) There is also the advantage of leverage as it bears a fixed charge (because companies are required to pay a fixed rate of dividend in case of issue of preference shares). Non-payment of preference dividends does not force a company into liquidity.

(iii) There is no risk of takeover as the preference shareholders do not have voting rights except where dividend payment are in arrears.

(iv) The preference dividends are fixed and pre-decided. Hence preference shareholders cannot participate in surplus profits as the ordinary shareholders can except in case of participating preference shareholders.

(v) Preference capital can be redeemed after a specified period.

**Disadvantages**

(i) One of the major disadvantages of preference shares is that preference dividend is not tax deductible and so does not provide a tax shield to the company. Hence, preference shares are costlier to the company than debt e.g. debenture.

(ii) Preference dividends are cumulative in nature. This means that if in a particular year preference dividends are not paid they shall be accumulated and paid later. Also, if these dividends are not paid, no dividend can be paid to ordinary shareholders. The non-payment of dividend to ordinary shareholders could seriously impair the reputation of the concerned company.
