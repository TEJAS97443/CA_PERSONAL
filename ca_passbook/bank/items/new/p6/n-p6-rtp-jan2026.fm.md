<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p6-rtp-jan2026
paper: p6
section: fm
kind: rtp
attempt: jan2026
qfile: new/p6/rtp-jan2026-qa.pdf
afile: new/p6/rtp-jan2026-qa.pdf
status: checked
by: tx-27
date: 2026-10-20
note: Paper 6A (Financial Management) of ICAI's Revision Test Paper for the January 2026 examination (one file: 6A questions pp.1-11, answers pp.12-25; the SM half is n-p6-rtp-jan2026.sm.md). RTP: ICAI prints no marks and no instructions. ICAI's chapter headings (Case Scenarios, Ratio Analysis, Cost of Capital, Capital Structure, Leverage, Investment Decision, Dividend Decisions, Miscellaneous) are headings, not question text, and are not transcribed. Q1 is the case scenario with MCQs (i)-(v); Q2-Q4 are single MCQs under the Case Scenarios heading; Q5-Q10 are one item each (their numbered requirements stay in the question); Q11 (a)-(d) are four items. ICAI answers Q1(i) and (ii) with their keys first and then one set of Working Notes and the Statement of Working Capital requirements, so by docs/ICAI_BANK.md 9.3b that working sits in Q1(ii)'s answer although it also supports (i). ICAI's own wording and figures kept as printed: "₹ 38, 40,000" (Q1(ii) statement) and "18, 30, 000 - 2, 00, 000 - 5, 60, 000 - 10, 000", "4,10, 000", "38, 40, 000", "14, 20, 000" (Q1(iv), (v) answers); "The company has totally 1 Lakh Equity Shares", "Current assets comprises" (Q5); the Q5 answer's "PAES", "Depn" and its ratios as printed (Current Ratio 1.6, Quick Ratio 0.32); "11 % Term Loan" (Q6 table); "B = 1.54" for beta and "Value of share after 5 years" with n = 5 for the debenture whose question states a 6-year maturity (Q6 answer); "DCL = DOL × DFL = 1.27 × 1.38 = 1.75" (Q8 answer); "Appraisal technic", "Discount payback" and the Note "For ARR, use the formula Profit after tax" as printed (Q9), "Investment in the begining of the year" and "Profit after Depreciation" (Q9 answer); "walter’s model" (Q10), "Gordons model" and "Let r/ke be y & Ke be x." (Q10 answer); "Issuer Non- UK Company" (Q11(a) answer); "over-capitalization" / "Over-capitalisation" and "Maximization" / "Maximisation" (Q11 questions / answers). Formulas: ICAI's stacked fractions are written in KaTeX; subscripts printed as subscripts ($K_e$, $K_p$, $K_d$, $K_r$, $K_o$, $R_f$, $R_m$, $D_0$, $P_0$) are KaTeX subscripts, the ones ICAI prints on the line (Rf, Rm-Rf, Ke, ke in the CAPM working, Q7's question, Q10) stay plain; powers ((1.06)$^5$, (1+10.9%)$^8$) are superscripts; the fractions inside the Q1(ii) statement's cells are written inline with a slash (docs/ICAI_BANK.md 9.3). Extraction repairs only: equation-editor words run together in the text layer ("Costof GoodsSold") are written with their spaces; tables were rebuilt from the rendered pages. check.py: the numbers accepted on this block are the paper titles on p.1, not transcribed ("PAPER – 6:" and "6A: FINANCIAL MANAGEMENT": 6 twice); the 2 accepted on Q6 is the denominator of ICAI's Kp formula, the last line of p.17's text, which check.py drops as a page number.
---

---
case: c1
qno: 1
q: 1-2
---
#### Case
PPW Ltd is a mid-sized manufacturing company producing household appliances for the Indian market. With competition heating up, the company’s management is becoming increasingly conscious about liquidity management and efficient use of working capital.

During the last financial year, the company recorded annual sales of ₹ 48,00,000, offering its customers a 3-month credit period to encourage bulk orders. While this has boosted sales, it has also tied up significant funds in debtors.

On the production side, the company incurs the following annual costs:

- **Materials consumed**: ₹ 12,00,000 (suppliers allow 2 months’ credit)
- **Wages**: ₹ 9,60,000 (paid with a 1-month lag)
- **Cash manufacturing expenses**: ₹ 12,00,000 (settled 1 month in arrears)
- **Administrative expenses**: ₹ 3,60,000 (paid with a 1-month lag)
- **Sales promotion expenses**: ₹ 1,20,000 (paid monthly in advance to agencies)

The company sells its products at a gross profit margin of 20%. It also maintains 2 months’ stock of raw materials and 2 months’ stock of finished goods to ensure smooth production and timely delivery to distributors.

Further, depreciation is considered part of the cost of production, but since it does not require a cash outflow, management wants to ignore it while assessing the cash cost basis of working capital. A minimum cash balance of ₹ 1,00,000 is always retained for contingencies.

Now, the Board of Directors has asked the finance team to answer the following 5 questions:

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: C
tags: fm.wc.estimate
difficulty: medium
q: 2
a: 12
---
#### Question
What will be the gross working capital of the company on cash cost basis?
#### Options
(A) ₹ 16,00,000
(B) ₹ 17,20,000
(C) ₹ 18,30,000
(D) ₹ 19,60,000
#### Answer
**(C) ₹18,30,000**
#### Approach
On a cash cost basis every item is valued at cash cost, not at selling price: debtors at the cash cost of sales, finished goods at the cash cost of production; add the advance and the minimum cash balance.

---
item: q1ii
case: c1
qno: 1
part: (ii)
type: mcq
key: A
tags: fm.wc.estimate
difficulty: medium
q: 2
a: 12-13
---
#### Question
PPW Ltd wants to compute its working capital requirement on a cash cost basis (ignoring WIP), assuming a 15% margin. Based on the given financial data, what will be the working capital requirement?
#### Options
(A) ₹ 16,33,000
(B) ₹ 10,20,000
(C) ₹ 20,40,000
(D) ₹ 9,60,000
#### Answer
**(A) ₹16,33,000**

**Working Notes:**

| **(i) Computation of Annual Cash Cost of Production** | **(₹)** |
|---|---:|
| Material consumed | 12,00,000 |
| Wages | 9,60,000 |
| Manufacturing expenses | 12,00,000 |
| Total cash cost of production | **33,60,000** |
| **(ii) Computation of Annual Cash Cost of Sales:** | **(₹)** |
| Total Cash cost of production as in (i) above | 33,60,000 |
| Administrative Expenses | 3,60,000 |
| Sales promotion expenses | 1,20,000 |
| Total cash cost of sales | **38,40,000** |
| *Add:* Gross Profit @ 20% on sales (25% on cost of sales) | 9,60,000 |
| Sales Value | **48,00,000** |

**Statement of Working Capital requirements (cash cost basis)**

| | (₹) | (₹) |
|---|---:|---:|
| **A. Current Assets** | | |
| Inventory: | | |
| - Raw materials (₹ 12,00,000/12months ×2 months) | 2,00,000 | |
| - Finished Goods (₹ 33,60,000/12months ×2 months) | 5,60,000 | |
| Receivables (Debtors) (₹ 38, 40,000/12months ×3 months) | 9,60,000 | |
| Sales Promotion expenses paid in advance (₹ 1,20,000/12 months ×1 month) | 10,000 | |
| Cash balance | 1,00,000 | 18,30,000 |
| Gross Working Capital | | 18,30,000 |
| **B. Current Liabilities:** | | |
| Payables: | | |
| -Creditors for materials (₹ 12,00,000/12months ×2 months) | 2,00,000 | |
| Wages outstanding (₹ 9,60,000/12months ×1 month) | 80,000 | |
| Manufacturing expenses outstanding (₹ 12,00,000/12months ×1 month) | 1,00,000 | |
| Administrative expenses outstanding (₹ 3,60,000/12months ×1 month) | 30,000 | 4,10,000 |
| Net working capital (A - B) | | 14,20,000 |
| *Add*: Safety margin @ 15% | | 2,13,000 |
| Total Working Capital requirements | | 16,33,000 |
#### Approach
Net working capital is the cash-cost current assets less the current liabilities (creditors and the expenses paid in arrears); the 15% safety margin is added on the net figure.

---
item: q1iii
case: c1
qno: 1
part: (iii)
type: mcq
key: A
tags: fm.ratio.liquidity, fm.wc.estimate
difficulty: easy
q: 2
a: 13
---
#### Question
Excluding the 15% margin, what is the Current Ratio of PPW Ltd?
#### Options
(A) 4.46 : 1
(B) 3.8 : 1
(C) 2.0 : 1
(D) 2.2 : 1
#### Answer
**(A) 4.46 : 1**

Current Ratio = $\dfrac{\text{Current Assets}}{\text{Current Liabilities}}$

= $\dfrac{18{,}30{,}000}{4{,}10{,}000}$ = 4.46

---
item: q1iv
case: c1
qno: 1
part: (iv)
type: mcq
key: C
tags: fm.ratio.liquidity, fm.wc.estimate
difficulty: easy
q: 3
a: 14
---
#### Question
What is the Quick Ratio of PPW Ltd (excluding the 15% margin)?
#### Options
(A) 2.92 : 1
(B) 1.05 : 1
(C) 2.59 : 1
(D) 1.85 : 1
#### Answer
**(C) 2.59 : 1**

Quick Ratio or Acid Test Ratio = $\dfrac{\text{Quick Assets}}{\text{Current Liabilities}}$

Quick Assets = Current Assets − Inventories − Prepaid expenses

Quick Ratio = $\dfrac{9{,}60{,}000 + 1{,}00{,}000}{4{,}10{,}000}$

Or,

= $\dfrac{18, 30, 000 - 2, 00, 000 - 5, 60, 000 - 10, 000}{4,10, 000}$

= 2.59

---
item: q1v
case: c1
qno: 1
part: (v)
type: mcq
key: D
tags: fm.ratio.activity, fm.wc.estimate
difficulty: easy
q: 3
a: 14
---
#### Question
What is the Working Capital Turnover Ratio based on cash cost of sales?
#### Options
(A) 4 times
(B) 3.38 times
(C) 6.2 times
(D) 2.7 times
#### Answer
**(D) 2.7 times**

Working Capital Turnover Ratio = $\dfrac{\text{Sales / Cost of Goods Sold}}{\text{Working Capital excluding Margin}}$

= $\dfrac{38, 40, 000}{14, 20, 000}$

= 2.70

---
item: q2
qno: 2
type: mcq
key: A
tags: fm.capbud.npv
difficulty: easy
q: 3
a: 14
---
#### Question
Please consider the following data:

| Project | NPV (₹ ’000) | I (₹ ’000) |
|---|---:|---:|
| A | 15 | 60 |
| B | 20 | 100 |
| C | 25 | 150 |

Given that NPV = PV – I and PI = PV / I, where PV is the present value of future net cash inflows and I is the initial investment on a project. Based on the data furnished above, which one of the following statements is correct?
#### Options
(A) Project A is recommended based on PI criterion
(B) Project B is recommended based on NPV criterion
(C) Project C is recommended based on PI criterion
(D) Project A is recommended based on NPV criterion
#### Answer
**(A)** Project A is recommended based on PI criterion

**Project A**: PV = 15 + 60 = 75

**Project B**: PV = 20 + 100 = 120

**Project C**: PV = 25 + 150 = 175

PI = PV / I

**Project A**: PI = 75/60 = 1.25

**Project B**: PI = 120/100 = 1.20

**Project C**: PI = 175/150 ≈ 1.167
#### Approach
Recover each project's PV as NPV + I, then compare PI = PV / I; the highest NPV is not the same project as the highest PI.

---
item: q3
qno: 3
type: mcq
key: C
tags: fm.ratio.profit
difficulty: easy
q: 3-4
a: 14
---
#### Question
As per extended Du Pont analysis:

ROE = NPM × TATR × x/y

Where, ROE = Return on Equity

NPM = Net Profit Margin

TATR = Total Asset Turnover Ratio

Here, x/y represents:
#### Options
(A) Debt / Equity
(B) Total Assets / Sales
(C) Total Assets / Equity
(D) Equity / Debt
#### Answer
**(C) Total Assets / Equity**

---
item: q4
qno: 4
type: mcq
key: A
tags: fm.lev.leverage, fm.ratio.liquidity
difficulty: easy
q: 4
a: 15
---
#### Question
If Degree of Financial Leverage (DFL) = 5/4, which one of the following will be the interest coverage ratio?
#### Options
(A) 5
(B) 4
(C) 3/4
(D) 1.33
#### Answer
**(A) 5**

DFL = EBIT/(EBIT-I) = 5/4

4EBIT = 5EBIT -5I

EBIT = 5I

Interest Coverage Ratio = EBIT/Interest

= 5I/I = 5

---
item: q5
qno: 5
type: descriptive
tags: fm.ratio.prepare, fm.ratio.liquidity, fm.ratio.profit
difficulty: hard
q: 4-6
a: 15-17
---
#### Question
ABC Industries Ltd, a listed company, is a renowned player in the pharmaceutical sector. The company has availed various credit facilities from X bank, namely, Cash Credit Facility, Term Loan(s), Working Capital Demand Loan, Bank Guarantee(s) / Letter of Credit. This strategic mix of various credit facilities showcases the company's balanced approach to leveraging and risk management. The company has totally 1 Lakh Equity Shares of ₹ 10 each outstanding. The company’s shares are traded at a premium of 20%. The company's capital yields a healthy return rate, indicative of its operational efficiency and market competitiveness. However, it operates in a high-tax environment with an income-tax rate of 50%, which significantly impacts its net earnings and available reinvestment capital.

At the beginning of the year 2024-25, the company went in for re-organisation of capital structure, with share capital remaining the same as follows:

(a) Share capital - 40%,

(b) 12% Preference Share Capital – 10%

(c) Other Shareholders' funds - 15%

(d) 15% Term Loan - 10%

(e) Current Liabilities - 25%

Term Loan is repayable in 5 instalments starting from 31.03.2025. Since the first instalment is not yet paid, as part of periodic review by the Bank and in order to ensure compliance with their internal and regulatory requirements, the Bank requested the company to furnish a Financial Soundness Report duly certified by your Chartered Accountant/Auditor. The report should inter alia cover various Ratios that:

1. estimates whether the business can pay short term debts.
2. measures the ability to meet current debt immediately.
3. measures the ability to meet the commitment of various debt services like interest, instalment etc.
4. measures the ability of business to meet the interest obligations.
5. measures the ability of business to pay the preference dividend.
6. shows how many times the cash flow before interest and taxes covers all fixed financing charges.

The Chief Executive officer asked the Statutory auditor to prepare a reply letter quoting the proper ratio that covers the issues raised by the bank in this format –

| Issue | Ratio | Numerator | Denominator | Ideal Ratio/ Range | Ratio of the Company | Favourable/ Adverse |
|---|---|---|---|---|---|---|
| | | | | | | |

Closing fixed assets after providing 20% Depreciation constituted 60% of the total assets. Current assets comprises Inventories, Advance Tax, Prepaid Insurance and Receivables. The receivables (one-fifth of the current assets) to sales ratio revealed a credit period of 2 months. There were no cash sales. Operating profit margin being 15%. Also find out the ratios that

1. indicates composition of capital structure in terms of debt and equity
2. measures overall profits generated for each share in existence.
3. indicates market response of the equity shareholders’ investment.
4. Indicates expectations of the equity investors about the earnings of the firm.
#### Answer
| | | |
|---|---|---:|
| Equity Share Capital | 40% of Total = Given | 10,00,000 |
| Total Liabilities | 10,00,000 / 40% | 25,00,000 |
| Preference Share Capital | 25,00,000 x 10% | 2,50,000 |
| Other Shareholders' funds | 25,00,000 x 15% | 3,75,000 |
| 15% Term Loan | 25,00,000 x 10% | 2,50,000 |
| Current Liabilities | 25,00,000 x 25% | 6,25,000 |
| Total Assets | Total Liabilities | 25,00,000 |
| Fixed Assets | 60% of Total | 15,00,000 |
| Depreciation | $\dfrac{15{,}00{,}000}{80\%}$ x 20% | 3,75,000 |
| Current Assets | 40% of Total | 10,00,000 |
| Receivables | 1/5th of Current Assets | 2,00,000 |
| Stock, Advance Tax & Prepaid Insurance | Balance | 8,00,000 |
| Quick Assets | Only Receivables | 2,00,000 |
| Total Sales | $\dfrac{\text{Receivables}}{2}$ x 12 | 12,00,000 |
| EBIT | 12,00,000 x 15% | 1,80,000 |
| Interest | 2,50,000 x 15% | 37,500 |
| EBT | | 1,42,500 |
| PAT | 1,42,500 x 50% | 71,250 |
| Preference dividend | 2,50,000 x 12% | 30,000 |
| PAES | | 41,250 |
| EPS (ratio measures overall profits generated for each share in existence) | 41,250 / 1,00,000 | 0.41 |
| Debt Equity ratio (indicates composition of capital structure in terms of debt and equity) | 2,50,000 / 16,25,000 | 0.15 |
| MPS | FV 10 + 20% Premium | 12 |
| Market value to Book value (indicates market response of the equity shareholders’ investment) | 12 Lakhs / 13.75 Lakhs | 0.87 |
| PE Ratio (indicates expectations of the equity investors about the earnings of the firm) | 12/0.41 | 29.27 times |

| Issue | Ratio | Numerator | Denominator | Ideal Ratio/ Range | Ratio of the Company | Favourable/ Adverse |
|---|---|---|---|---:|---:|---|
| 1 | Current Ratio | Current Assets | Current Liabilities | 2 | 1.6 | Adverse |
| 2 | Quick Ratio | Quick Assets | Current Liabilities | 1 | 0.32 | Adverse |
| 3 | DSCR | Earnings available for Debt services | Interest & Instalments | 2 | 6.1 | Favourable |
| 4 | Interest coverage ratio | EBIT | Interest | > 1 | 4.8 | Favourable |
| 5 | Preference Dividend coverage ratio | PAT | Preference dividend | > 1 | 2.375 | Favourable |
| 6 | Fixed charges coverage ratio | EBIT + Depn | Interest + Repayment of loan | > 1 | 6.34 | Favourable |
| 7 | Debt equity ratio | Debt | Equity | Not applicable | 0.15 | |
| 8 | EPS | Profit available for equity holders | No. of Equity Shares | Not applicable | 0.41 | |
| 9 | MV/BV | MV of Equity Shares | BV of Equity Shares | Not applicable | 0.87 | |

Earnings available for Debt services = PAT + Interest + Depreciation + Instalments

= 71,250 + 37,500 + 3,75,000 + 50,000 = 5,33,750
#### Approach
Build the balance sheet from the share capital (40% of the total), then the profit statement from the receivables (two months' sales) and the 15% operating margin; each ratio then follows from these figures.

---
item: q6
qno: 6
type: descriptive
tags: fm.coc.equity, fm.coc.debt
difficulty: medium
q: 6-7
a: 17-19
note: The 2 accepted by check.py is the denominator 2 of ICAI's general Kp formula, printed as the last text line of p.17 (check.py drops a lone number there as a page number).
---
#### Question
The capital structure of Shine Ltd. as on 31.03.2024 is as under:

| Particulars | Amount (₹) |
|---|---:|
| Equity share capital of ₹ 10 each | 45,00,000 |
| 15% Preference share capital of ₹ 100 each | 36,00,000 |
| Retained earnings | 32,00,000 |
| 13% Convertible Debenture of ₹ 100 each | 67,00,000 |
| 11 % Term Loan | 20,00,000 |
| Total | 2,00,00,000 |

**Additional information:**

(A) Company issued 13% Convertible Debentures of ₹ 100 each on 01.04.2023 with a maturity period of 6 years. At maturity, the debenture holders will have an option to convert the debentures into equity shares of the company in the ratio of 1 : 4 (4 shares for each debenture). The market price of the equity share is ₹ 25 each as on 31.03.2024 and the growth rate of the share is 6% per annum.

(B) Preference stock, redeemable after eight years at par, is currently selling at ₹ 150 per share.

(C) The prevailing default-risk free interest rate on 10-year GOI treasury bonds is 6%. The average market risk premium is 8% and the Beta (β) of the company is 1.54.

Corporate tax rate is 25%.

You are required to calculate the cost of:

(i) Equity Share Capital

(ii) Preference Share Capital

(iii) Convertible Debenture

(iv) Retained Earnings

(v) Term Loan
#### Answer
(i) **Cost of Equity Share capital**

As per CAPM Model $K_e$ = $R_f$ + ß ($R_m$ − $R_f$)

Rf = 6%

B = 1.54

Rm-Rf = 8%

Ke = 6% + 1.54(8%)

Ke = **18.32%**

(ii) **Cost of Preference Share capital**

n = 8

Net Proceeds (NP) = 150

Redemption Value (RV) = 100

Preference Dividend (PD) = 15

$K_p$ = $\dfrac{PD+\dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

$K_p$ = $\dfrac{15+\left(\dfrac{100-150}{8}\right)}{\left(\dfrac{100+150}{2}\right)}$

$K_p$ = **7%**

(iii) **Cost of convertible debenture**

Cash Redemption Value (RV) = 100

Share Redemption Value (RV):

Value of share after 5 years = 25 x (1.06)$^5$ = 33.455

Share Redemption Value (RV) = 33.455 x 4 = 133.82

Therefore, investor will choose share redemption.

Redemption Value (RV) = 133.82

Net Proceeds (NP) = 100

n = 5

Interest (I) = 13

Tax (t) = 25%

$K_d$ = $\dfrac{I(1-t)+\dfrac{(RV-NP)}{n}}{\dfrac{(RV+NP)}{2}}$

= $\dfrac{13(1-0.25)+\dfrac{(133.82-100)}{5}}{\dfrac{(133.82+100)}{2}}$

$K_d$ = **14.13%**

(iv) **Cost of Retained Earnings**

$K_r$ = $K_e$ = **18.32%**

(v) **Cost of Term Loan**

= 11% x (1-0.25) = **8.25%**
#### Approach
CAPM gives the cost of equity (and of retained earnings); for the preference shares and the convertible debenture use the approximation formula, taking the higher of the cash and the conversion value as the redemption value.

---
item: q7
qno: 7
type: descriptive
tags: fm.cs.theories, fm.coc.wacc
difficulty: medium
q: 7
a: 19-20
---
#### Question
J Ltd. is an all equity financed company with a market value of ₹ 25,00,000 and cost of equity (Ke) 21%. The company wants to buyback equity shares worth ₹ 5,00,000 by issuing and raising 15% perpetual debt of the same amount. Rate of tax may be taken as 30%. After the capital restructuring and applying MM Model (with taxes), you are required to calculate:

(i) Market value of J Ltd.

(ii) Cost of Equity (Ke)

(iii) Weighted average cost of capital (using market weights) and comment on it.
#### Answer
Market Value of Equity = ₹ 25,00,000

$K_e$ = 21%

$\dfrac{\text{Net income (NI) for equity - holders}}{K_e}$ = Market Value of Equity

$\dfrac{\text{Net income (NI) for equity holders}}{0.21}$ = 25,00,000

Net income for equity holders = 5,25,000

EBIT= 5,25,000/0.7 = 7,50,000

| | All Equity | Debt and Equity |
|---|---:|---:|
| EBIT | 7,50,000 | 7,50,000 |
| Interest to debt-holders | - | (75,000) |
| EBT | 7,50,000 | 6,75,000 |
| Taxes (30%) | (2,25,000) | (2,02,500) |
| Income available to equity shareholders | 5,25,000 | 4,72,500 |
| Income to debt holders plus income available to shareholders | 5,25,000 | 5,47,500 |

Present value of tax-shield benefits = ₹ 5,00,000 × 0.30 = ₹ 1,50,000

(i) **Value of Restructured firm**

= ₹ 25,00,000 + ₹ 1,50,000 = ₹ 26,50,000

(ii) **Cost of Equity ($K_e$)**

Total Value = ₹ 26,50,000

*Less:* Value of Debt = ₹ 5,00,000

Value of Equity = ₹ 21,50,000

$K_e$ = $\dfrac{4{,}72{,}500}{21{,}50{,}000}$ = 0.219 = 21.98%

(iii) **WACC (on market value weight)**

Cost of Debt (after tax) = 15% (1- 0.3) = 0.15 (0.70) = 0.105 = 10.5%

| Components of Costs | Amount | Cost of Capital (%) | Weight | WACC (%) |
|---|---:|---:|---:|---:|
| Equity | 21,50,000 | 21.98 | 0.81 | 17.80 |
| Debt | 5,00,000 | 10.50 | 0.19 | 2.00 |
| | 26,50,000 | | | 19.80 |

**Comment:** At present the company is all equity financed. So, $K_e$ = $K_o$ i.e. 21%. However, after restructuring, the $K_o$ would be reduced to 19.80% and $K_e$ would increase from 21% to 21.98%.
#### Approach
Under MM with taxes the levered firm is worth the unlevered value plus the present value of the tax shield (debt × tax rate); the cost of equity is the income left for shareholders over the equity value that remains.

---
item: q8
qno: 8
type: descriptive
tags: fm.lev.leverage, fm.cs.ebiteps
difficulty: medium
q: 7-8
a: 20-21
---
#### Question
Following Balance Sheet and Income Statement have been obtained from the books of accounts of Pinaca Pvt. Ltd.

**Balance Sheet as on March 31st 2025**

| Liabilities | Amount (₹) | Assets | Amount (₹) |
|---|---:|---|---:|
| Equity Capital (₹ 10 per share) | 80,00,000 | Net Fixed Assets | 1,00,00,000 |
| 10% Debt | 60,00,000 | Current Assets | 90,00,000 |
| Retained Earnings | 35,00,000 | | |
| Current Liabilities | 15,00,000 | | |
| | 1,90,00,000 | | 1,90,00,000 |

**Income Statement for the year ending March 31st 2025**

| Particulars | Amount (₹) |
|---|---:|
| Sales | 34,00,000 |
| *Less:* Operating expenses (including ₹ 6,00,000 depreciation) | (12,00,000) |
| EBIT | 22,00,000 |
| Less: Interest | (6,00,000) |
| Earnings before tax | 16,00,000 |

The tax rate applicable to the company is 35 percent.

(i) DETERMINE the degree of operating, financial and combined leverages at the current sales level, if all operating expenses, other than depreciation, are variable costs.

(ii) If total assets remain at the same level, but sales (i) increase by 20 percent and (ii) decrease by 20 percent, COMPUTE the earnings per share at the new sales level?
#### Answer
(i) **Degree of operating, financial and combined leverages at the current sales level-**

DOL = $\dfrac{\text{Contribution}}{\text{EBIT}}$

= $\dfrac{₹ 34{,}00{,}000-₹ 6{,}00{,}000}{₹ 22{,}00{,}000}$ = 1.27

DFL = $\dfrac{\text{EBIT}}{\text{EBT}}$

= $\dfrac{₹ 22{,}00{,}000}{₹ 16{,}00{,}000}$ = 1.375

DCL = DOL × DFL = 1.27 × 1.38 = 1.75

(ii) **Earnings per share at the new sales level** **(Amount in ₹)**

| Particulars | Increase by 20% | Decrease by 20% |
|---|---:|---:|
| Sales level | 40,80,000 | 27,20,000 |
| *Less:* Variable expenses | 7,20,000 | 4,80,000 |
| *Less:* Fixed cost | 6,00,000 | 6,00,000 |
| Earnings before interest and taxes | 27,60,000 | 16,40,000 |
| *Less:* Interest | 6,00,000 | 6,00,000 |
| Earnings before taxes | 21,60,000 | 10,40,000 |
| *Less:* Taxes @35% | 7,56,000 | 3,64,000 |
| Earnings after taxes (EAT) | 14,04,000 | 6,76,000 |
| Number of equity shares | 8,00,000 | 8,00,000 |
| EPS | 1.76 | 0.85 |

**Working Notes:**

Variable Costs = ₹ 6,00,000 (total cost - depreciation)

Variable Costs at:

(i) Sales level, ₹ 40,80,000 = ₹ 7,20,000 (increase by 20%)

(ii) Sales level, ₹ 27,20,000 = ₹ 4,80,000 (decrease by 20%)
#### Approach
Only depreciation is fixed, so contribution is sales less the other operating expenses; at the new sales levels the variable costs move with sales while depreciation and interest stay put.

---
item: q9
qno: 9
type: descriptive
tags: fm.capbud.irr, fm.capbud.npv, fm.capbud.payback
difficulty: hard
q: 8-11
a: 21-22
---
#### Question
ABC Manufacturing Ltd is a mid–sized engineering and fabrication company that supplies precision components to the automobile and heavy machinery sectors. In order to maintain competitiveness and expand its market share, the company has proposed a new capital investment project involving the purchase and installation of advanced Computer Numerical Control (CNC) machines and automated assembly lines.

The estimated cost of the project is to be financed partly through internal accruals and largely through term loans from XYZ Bank. ABC Manufacturing has approached the bank requesting project financing of the initial outlay, citing strong growth potential in demand for precision-engineered products over the next decade.

**Financial Projections Provided by ABC Manufacturing Ltd.**

The company’s feasibility report outlines the following:

- The simple payback period is estimated at 5 years, assuming cumulative cash inflows cover the initial investment within that timeframe without considering the time value of money.
- The discounted payback period is calculated at 7 years, after discounting projected cash inflows at the weighted average cost of capital (WACC).
- The project’s Modified Internal Rate of Return (MIRR) is projected at 10.9%, which is much lower than the incremental borrowing rate.
- Terminal Value of the annual cash inflows reinvested at the rate of 10% is ₹ 11,43,589.
- Cash inflows are expected to be received equally and steadily at the end of every year over the life of the assets. However, the same Cash inflows are expected to be received even after the simple payback period due to efficiency gains, market expansion, and economies of scale.

(Note: Round off Initial investment to nearest Lakhs).

**Management’s Position**

ABC Manufacturing argues that:

1. The project is strategically essential for long-term survival in a competitive industry.
2. The simple payback of 5 years indicates that the investment risk is acceptable.
3. Although the discounted payback of 7 years is relatively long, the project will continue to generate positive inflows 1 year beyond this period.
4. MIRR of 10.9% should be interpreted in light of industry cyclicality, expected market growth, and non-financial benefits such as improved brand reputation and quality standards.

**Bank’s Concerns**

The credit appraisal team at XYZ Bank has raised several concerns:

- Reliance on payback methods alone ignores long-term profitability, and risk factors.
- Industry volatility, competition, and technological obsolescence may affect the reliability of projected cash flows.

The credit team must now prepare a recommendation on whether to finance the project and, if so, under what conditions. Assuming you were the credit analyst, prepare justification report with a reasoned argument based on other financial considerations namely, PI, NPV, IRR & ARR in the following format.

| Appraisal technic | Acceptable range | Outcome for this asset | Recommendation |
|---|---|---|---|
| NPV | | | |
| MIRR | | | |
| Simple payback | | | |
| Discount payback | | | |
| ARR | | | |
| PI | | | |

**Note:** For ARR, use the formula Profit after tax

**Consider the following PVAF:**

PVAF @ 9% for 7 years = 5 & PVAF @ 9% for 8 years = 5.535
#### Answer
Under MIRR, if the cash flows are equal over the life of the asset

Initial investment x (1 + MIRR)$^n$ = CFAT x FVAF

Terminal Value (CFAT x FVAF) = ₹ 11,43,589

Initial investment x (1+10.9%)$^8$ = ₹ 11,43,589

Initial investment = 11,43,589 / (1+10.9%)$^8$ = 5,00,000 (rounded off to nearest lakh)

Under simple payback period, if the cash flows are equal over the life of the asset

Payback Period = $\dfrac{\text{Total initial capital investment}}{\text{Annual expected after - tax net cash flow}}$

Initial investment = CFAT x Simple payback period in years

5,00,000 = 5 x CFAT

CFAT = 1,00,000

Under Discounted payback period, if the cash flows are equal over the life of the asset

PVAF = $\dfrac{\text{Total initial capital investment}}{\text{Annual expected after - tax net cash flow}}$

Initial investment = CFAT x PVAF @ WACC% for 7 years

5,00,000 = 1,00,000 x PVAF @ WACC% for 7 years

PVAF @ WACC% for 7 years = 5

So, WACC = 9%

NPV = Sum of Present Values of Cash inflows – Cost of the Project

= 1,00,000 x 5.535 – 5,00,000 = 53,500

Profitability Index = $\dfrac{\text{Sum of present value of net cash inflow}}{\text{Initial cash outflow}}$

= $\dfrac{₹5{,}53{,}500}{₹ 5{,}00{,}000}$ = 1.107

PAT = CFAT – Depreciation

= 1,00,000 - $\dfrac{5{,}00{,}000}{8}$ = 37,500

ARR = $\dfrac{\text{Profit after Depreciation}}{\text{Investment in the begining of the year}}$ x 100

= $\dfrac{37{,}500}{5{,}00{,}000}$= 7.5%

| Appraisal technic | Acceptable range | Outcome for this asset | Recommendation |
|---|---|---|---|
| NPV | > 0 | 53,500 | Accept |
| MIRR | MIRR > WACC | 10.9% > 9% | Accept |
| Simple payback | Payback < Life | 5 < 8 | Accept |
| Discount payback | Payback < Life | 7 < 8 | Accept |
| ARR | ARR > WACC | 7.5% < 9% | Reject |
| PI | > 1 | 1.107 | Accept |
#### Approach
Work backwards: the MIRR and the terminal value give the initial investment, the simple payback gives the annual cash flow, and the discounted payback with the PVAF table gives the WACC and the life; NPV, PI and ARR follow.

---
item: q10
qno: 10
type: descriptive
tags: fm.div.models
difficulty: hard
q: 11
a: 23-24
---
#### Question
For the year ending 31.03.2025, ABC Industries Ltd declared 40% dividend. The current market price of the share is quoted at ₹ 57.50. If the retention ratio is reduced by 20 percent, the market price dropped by ₹ 2.50. Face value of the shares is ₹ 10 per share.

1. Find the return on investment and cost of equity using walter’s model.
2. Comment on the dividend policy adopted by the company.
3. Find the limiting value of shares using walter’s model.
4. Also find the intrinsic value of the shares under Gordon’s Model.
5. Mr. X, the chief financial officer of the company, opines that the return on investment of the company is not having direct / indirect effect on the intrinsic value of the shares under Gordon’s Model. Only cost of equity will be considered for the computation of the intrinsic value of the shares under Gordon’s Model.
#### Answer
**1.** **Price under Walter’s Model** (P) = $\dfrac{D+\dfrac{r}{K_e}(E-D)}{K_e}$

| | Situation 1 | Situation 2 |
|---|---:|---:|
| 1. DP Ratio | 40% | 60% |
| 2. Retention Ratio | 60% | 60% - 20% = 40% |
| 3. Dividend per share = D | ₹ 4 | ₹ 6 |
| 4. Retention per share = (E-D) | ₹ 6 | ₹ 4 |
| 5. Market price per share = MPS | ₹ 57.50 | ₹ 57.50 – ₹ 2.50 = ₹ 55 |
| 6. Equation = Let r/ke be y & Ke be x. | 4 + 6y = 57.50x | 6 + 4y = 55x |
| 7. Equation for solving | 57.50x – 6y = 4 | 55x – 4y = 6 |

Equation 1 \* 4 = 230x – 24y = 16 …….(1)

Equation 2 \* 6 = 330x – 24y = 36 …….(2)

By solving, we get x = 20% and y = 1.25.

y = $\dfrac{r}{K_e}$ = 1.25

$\dfrac{r}{20\%}$ = 1.25.

Hence, r = 25%

**2.** Since r 25% > ke 20%, the company should retain 100%. Since the company pays 40% Dividend, the company is not following optimum dividend policy.

**3.**

| | Situation 1 | Situation 2 |
|---|---:|---:|
| 1. DP Ratio | 0% | 100% |
| 2. Retention Ratio | 100% | 0% |
| 3. Dividend per share = D | ₹ 0 | ₹ 10 |
| 4. Retention per share = (E-D) | ₹ 10 | ₹ 0 |
| 5. Market price per share = MPS | $\dfrac{10 \text{ x } 1.25}{0.2}$ = 62.50 | $\dfrac{10}{0.2}$ = 50 |

**4.** Price under Gordon’s Model

Market price per share$(P_0)$ = $\left[\dfrac{D_0(1+g)}{K_e - g}\right]$

| | Situation 1 | Situation 2 |
|---|---:|---:|
| **1. Dividend paid** | ₹ 4 | ₹ 6 |
| 2. Retention Ratio (b) | 60% | 40% |
| 3. Return on investment (r) | 25% | 25% |
| 4. Growth = g = br | 15% | 10% |
| 5. Market price per share = MPS | $\dfrac{4(1+0.15)}{0.2 - 0.15}$ = ₹ 92 | $\dfrac{6(1+0.10)}{0.2 - 0.1}$ = ₹ 66 |

**5.** Since, return on investment is used for computing growth rate, both cost of equity and return on investment are considered for computing price under Gordons model. Hence, the opinion of the chief financial officer is not valid.
#### Approach
Write Walter's price for both dividend payouts and solve the two equations together for Ke and r/Ke; the limiting values are the prices at 0% and 100% payout, and Gordon's growth is g = b × r.

---
item: q11a
qno: 11
part: (a)
type: descriptive
tags: fm.sources.modern
difficulty: easy
q: 11
a: 24
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
item: q11b
qno: 11
part: (b)
type: descriptive
tags: fm.sources.short
difficulty: easy
q: 11
a: 24-25
---
#### Question
What do you understand by Spontaneous Sources of finance and explain its sources of finance?
#### Answer
Spontaneous sources of finance are those which naturally arise in the course of business operations. Trade credit, credit from employees, credit from suppliers of services, etc. are some of the examples which may be quoted in this respect.

**Spontaneous Sources of Finance**

(i) **Trade Credit:** Trade credit is a spontaneous source of finance which is normally extended to the purchaser organization by the sellers or services providers. It contributes to about one-third of the total short-term requirements.

(ii) **Bills Payable:** In the case of “Bills Payable” the purchaser will have to give a written promise to pay the amount of the bill/invoice either on demand or at a fixed future date to the seller or the bearer of the note.

(iii) **Accrued Expenses:** The accrued expenses refer to the services availed by the firm, but the payment for which has yet to be made. It is a built in and an automatic source of finance as most of the services like wages, salaries, taxes, duties etc., are paid at the end of the period.

---
item: q11c
qno: 11
part: (c)
type: descriptive
tags: fm.cs.planning
difficulty: easy
q: 11
a: 25
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
item: q11d
qno: 11
part: (d)
type: descriptive
tags: fm.intro.objectives
difficulty: easy
q: 11
a: 25
---
#### Question
What are disadvantages of Profit Maximization?
#### Answer
**Disadvantages of Profit Maximisation objective of financial management.**

(i) Emphasizes the short-term gains

(ii) Ignores risk or uncertainty

(iii) Ignores the timing of returns

(iv) Requires immediate resources.
