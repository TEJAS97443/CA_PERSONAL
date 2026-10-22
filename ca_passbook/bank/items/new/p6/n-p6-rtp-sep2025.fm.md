<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p6-rtp-sep2025
paper: p6
section: fm
kind: rtp
attempt: sep2025
qfile: new/p6/rtp-sep2025-qa.pdf
afile: new/p6/rtp-sep2025-qa.pdf
status: checked
by: tx-31
date: 2026-10-20
accept: 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025
note: Paper 6A (Financial Management) of ICAI's Revision Test Paper for the September 2025 examination: questions pp.1-9, Suggested Answers/Hints pp.9-27; the SM half (pp.28-43) is n-p6-rtp-sep2025.sm.md. ICAI prints Division A (the case scenario Q1 (i)-(v) and the MCQs Q2 and Q3) and Division B (descriptive, Q4-Q10) with no marks, as every RTP. The headings "6A: FINANCIAL MANAGEMENT", "QUESTIONS", "Case Scenarios", "Division B: Descriptive Questions", the chapter headings before each question (Ratio Analysis and Leverages, Cost of Capital, Financial Analysis & Planning – Ratio Analysis, Financing Decision - Cost of Capital, Financing Decision – Capital Structure, Financing Decision – Leverages, Dividend Decision, Management of Working Capital, Miscellaneous), "SUGGESTED ANSWERS/HINTS" and "Division A: Case Scenario" are headings, not question text, and are not transcribed. ICAI prints the MCQ options as (a)-(d): written as (A)-(D); the answers keep ICAI's lower-case letter. ICAI answers Q1 (i)-(v) in a key table ("Q. No. | Hints") and then one working for the whole case (Calculation of CFAT, Working Note, Terminal Value, Total PV, IRR, pp.10-13); following §9.3b each item's answer is its row of the key table, and the working, printed after the key of (v), is in q1v's answer although it serves all five. Q4-Q9 each ask several requirements on one set of data and ICAI answers them in one connected solution (no marks to split by): one item each. Q10 (a), (b) and (c) are separate questions: three items. ICAI's text kept as printed: MCQ 1 (i) asks the "CFAT for year 1" and ICAI's key (a) -15,33,50,000 is the Net CFAT (I) row of its table (the CFAT (H) row reads 1,66,50,000); the Total PV table uses PVAF 0.833 and the IRR table 0.8333 for year 1; Q4's Balance Sheet prints "15% Debentures 70,00,000" while its Working Note (ii) gives ₹ 7,00,000 and the totals 29,60,000; Q5 (c) prints "2 (1+0.6)" in the Ke line (g = 0.06); Q7 prints "₹ 2, 70,000" (spaced), "is same that of companies X" and "of the following reasons"; Q9 prints "₹ 160,00,000"; Q10 (b) "On the light of the statement"; MCQ (iii) "Calculate the terminal value" and Q9 (ii) end without a question mark; MCQ (iv) "the mint technologies". Superscripts ("31st") are written inline; subscripts ICAI sets (Kd, Ke, Kr, D0, D1, P0, b1, NPVL, NPVH) are written as KaTeX subscripts. check.py: the numbers accepted on this block are (1) the paper title on p.1, not transcribed: "PAPER – 6: FINANCIAL MANAGEMENT AND STRATEGIC MANAGEMENT" and "6A: FINANCIAL MANAGEMENT" (6 twice); (2) the running foot "SEPTEMBER 2025 EXAMINATION" of the even pages 2-26, which check.py does not strip there because the page number is printed on the line below it (2025 thirteen times: pp.2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26).
---

---
case: c1
qno: 1
q: 1-2
a: 9-13
---
#### Case
Mint Technologies, a startup in the IT infrastructure space, is planning to enter the computer networking market with a specialized offering—VPN connectivity solutions for enterprises with distributed office networks. The company recently won a significant tender from a major national bank to set up secure VPN connections across 100 branches. The leadership team is excited but cautious, as this move requires significant upfront investment and ongoing operational capability.

To evaluate the financial viability of this project, you have been hired as a consultant.

- They have forecasted their numbers for 5 years and they have assumed that they will grow at industry average (3%) afterwards.
- Mint will invest all the money for CAPEX in the infrastructure and equipment. Mint is planning to issue 50Mn shares in lieu of the amount.
- Mint will have to keep upgrading the infrastructure and equipment to cover different offices of various clients.
- Mint expects an initial investment of around ₹ 150 Mn in network access as an initial setup cost for connecting different offices. Mint needs to invest additional ₹10 Mn every year starting from beginning and is expected to grow 10% every year.
- The equipment investment varies with number of branches/ offices. This varies with time and currently it is ₹ 0.1 Mn per office.
- Initially, Mint has won a tender of 100 branches of a bank and expecting it to grow at 30% for next 5 years.
- Mint is expecting to have a maintenance cost of 10% for equipment and 15% for network.
- To handle all this, current manpower cost is ₹ 1 Mn
- Mint has entered into an agreement with local authority and has agreed to share 15% of the revenue with the same.
- Mint is expecting to generate revenue of ₹ 0.5 Mn per office and to remain competitive in the market, it is not going to increase with inflation.
- Capital expenditure and operating expenses will grow 10% every year.
- Tax slab in the country is 30% and depreciation of the equipment and network is assumed to be 10%. Discounting rate is 20%.
- Assume all the expenditure including initial setup cost from year 1.

**Based on the above information, you are required to answer following 5 MCQs:**

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: A
tags: fm.capbud.cashflows
difficulty: hard
q: 2
a: 9
note: ICAI's key (a) -15,33,50,000 is the "Net CFAT (I)" (after capex) of Year 1 in ICAI's working (q1v's answer); the "CFAT (H)" row of the same table reads 1,66,50,000. The key is ICAI's, kept as printed.
---
#### Question
What is the CFAT for year 1?
#### Options
(A) -15,33,50,000
(B) 1,00,17,000
(C) 1,75,73,810
(D) 2,74,29,367
#### Answer
**(a)** -15,33,50,000
#### Approach
Build the five-year table first: offices growing at 30% (whole offices), revenue less the local authority's share, manpower and the two maintenance costs, depreciation and tax; then add back depreciation and deduct the year's capex.

---
item: q1ii
case: c1
qno: 1
part: (ii)
type: mcq
key: C
tags: fm.capbud.cashflows
difficulty: hard
q: 2-3
a: 9
---
#### Question
What is the CFAT for year 5?
#### Options
(A) -15,33,50,000
(B) 1,00,17,000
(C) 4,02,25,268
(D) 2,74,29,367
#### Answer
**(c)** 4,02,25,268
#### Approach
Carry the same table to Year 5, growing network and equipment capex at 10% inflation and charging equipment capex only for the additional offices of each year.

---
item: q1iii
case: c1
qno: 1
part: (iii)
type: mcq
key: A
tags: fm.capbud.cashflows, fm.capbud.npv
difficulty: medium
q: 3
a: 9
---
#### Question
Calculate the terminal value
#### Options
(A) ₹ 24,37,17,801
(B) ₹ 9,79,74,556
(C) ₹ 6,38,54,064
(D) ₹ 21,32,20,955
#### Answer
**(a)** ₹ 24,37,17,801
#### Approach
Grow the Year 5 cash flow by the industry rate and divide by the discount rate less that growth (Gordon growth model).

---
item: q1iv
case: c1
qno: 1
part: (iv)
type: mcq
key: C
tags: fm.capbud.npv, fm.capbud.cashflows
difficulty: medium
q: 3
a: 9
---
#### Question
What is the total present value of the mint technologies?
#### Options
(A) ₹ 1,89,77,337
(B) ₹ 1,32,20,955
(C) ₹ 1,67,06,548
(D) ₹ 89,97,791
#### Answer
**(c)** ₹ 1,67,06,548
#### Approach
Discount each year's net cash flow at 20% and add the terminal value discounted with the Year 5 factor.

---
item: q1v
case: c1
qno: 1
part: (v)
type: mcq
key: D
tags: fm.capbud.irr, fm.capbud.npv
difficulty: medium
q: 3
a: 9-13
---
#### Question
Calculate the IRR for the company
#### Options
(A) 22.60%
(B) 15.39%
(C) 20.25%
(D) 24.68%
#### Answer
**(d)** 24.68%

**Calculation of CFAT**

| Particulars | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---:|---:|---:|---:|---:|
| Number of Offices (A) | 100 | 130 | 169 | 219\* | 284\* |
| Revenue Per office (B) | 5,00,000 | 5,00,000 | 5,00,000 | 5,00,000 | 5,00,000 |
| **Total Revenue (C) (A x B)** | 5,00,00,000 | 6,50,00,000 | 8,45,00,000 | 10,95,00,000 | 14,20,00,000 |
| **Operating Cost** | | | | | |
| Share of Local Authority | 75,00,000 | 97,50,000 | 1,26,75,000 | 1,64,25,000 | 2,13,00,000 |
| Manpower Cost | 10,00,000 | 14,30,000 | 20,44,900 | 29,14,890 | 41,58,044 |
| Maintenance Cost for Equipment | 10,00,000 | 13,30,000 | 18,01,900 | 24,67,400 | 34,19,065 |
| Maintenance Cost for Network | 2,40,00,000 | 2,56,50,000 | 2,74,65,000 | 2,94,61,500 | 3,16,57,650 |
| **Total Operating Cost (D)** | 3,35,00,000 | 3,81,60,000 | 4,39,86,800 | 5,12,68,790 | 6,05,34,759 |
| **EBITDA (E) (C-D)** | 1,65,00,000 | 2,68,40,000 | 4,05,13,200 | 5,82,31,210 | 8,14,65,241 |
| Less: Depreciation | 1,70,00,000 | 1,84,30,000 | 2,01,11,900 | 2,21,08,400 | 2,45,24,165 |
| **EBIT (F)** | -5,00,000 | 84,10,000 | 2,04,01,300 | 3,61,22,810 | 5,69,41,076 |
| Less: Taxes | -1,50,000 | 25,23,000 | 61,20,390 | 1,08,36,843 | 1,70,82,323 |
| **PAT (G)** | -3,50,000 | 58,87,000 | 1,42,80,910 | 2,52,85,967 | 3,98,58,753 |
| Add: Depreciation | 1,70,00,000 | 1,84,30,000 | 2,01,11,900 | 2,21,08,400 | 2,45,24,165 |
| **CFAT (H)** | 1,66,50,000 | 2,43,17,000 | 3,43,92,810 | 4,73,94,367 | 6,43,82,918 |
| Less: Capex | 17,00,00,000 | 1,43,00,000 | 1,68,19,000 | 1,99,65,000 | 2,41,57,650 |
| **Net CFAT (I)** | -15,33,50,000 | 1,00,17,000 | 1,75,73,810 | 2,74,29,367 | 4,02,25,268 |

**\*Note:** Since offices cannot be represented in fractions, the number should be rounded down to the nearest whole number.

**Working Note**

| Particulars | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---:|---:|---:|---:|---:|
| **Cost** | | | | | |
| Manpower Cost (With Inflation) | 10,00,000 | 11,00,000 | 12,10,000 | 13,31,000 | 14,64,100 |
| Manpower Cost per office (With Inflation) | 10,000 | 11,000 | 12,100 | 13,310 | 14,641 |
| **CAPEX** | | | | | |
| Additional Branches | 100 | 30 | 39 | 50 | 65 |
| Network CAPEX w/o inflation | 16,00,00,000 | 1,00,00,000 | 1,00,00,000 | 1,00,00,000 | 1,00,00,000 |
| Network CAPEX With inflation | 16,00,00,000 | 1,10,00,000 | 1,21,00,000 | 1,33,10,000 | 1,46,41,000 |
| Additional Equipment CAPEX/Branch (with inflation) | 1,00,000 | 1,10,000 | 1,21,000 | 1,33,100 | 1,46,410 |
| **CAPEX Schedule** | | | | | |
| Network Capex | 16,00,00,000 | 1,10,00,000 | 1,21,00,000 | 1,33,10,000 | 1,46,41,000 |
| Cumulative Capex in Network | 16,00,00,000 | 17,10,00,000 | 18,31,00,000 | 19,64,10,000 | 21,10,51,000 |
| Additional Equipment CAPEX (in the Year) | 1,00,00,000 | 33,00,000 | 47,19,000 | 66,55,000 | 95,16,650 |
| Cumulative Additional Equipment CAPEX | 1,00,00,000 | 1,33,00,000 | 1,80,19,000 | 2,46,74,000 | 3,41,90,650 |

Terminal Value (TV) using Gordon Growth Model (GGM)

Terminal Value = $\dfrac{\text{Terminal Year Cash Flow x }(1+g)}{Ke-g}$

= $\dfrac{4{,}02{,}25{,}268\ (1+0.03)}{20\%-3\%}$ = ₹ 24,37,17,801

**Calculation of Total PV**

| Year | CF | PVAF@20% | PV |
|---|---:|---:|---:|
| 1 | -15,33,50,000 | 0.833 | -12,77,86,555 |
| 2 | 1,00,17,000 | 0.694 | 69,51,798 |
| 3 | 1,75,73,810 | 0.579 | 1,01,75,236 |
| 4 | 2,74,29,367 | 0.482 | 1,32,20,955 |
| 5 | 4,02,25,268 | 0.402 | 1,61,70,558 |
| 5 | 24,37,17,801 | 0.402 | 9,79,74,556 |
| **Total PV** | | | **1,67,06,548** |

**Calculation of IRR**

| Year | Cash Flows | PVAF@20% | PV | PVAF@25% | PV |
|---|---:|---:|---:|---:|---:|
| 1 | -15,33,50,000 | 0.8333 | -12,77,86,555 | 0.800 | -12,26,80,000 |
| 2 | 1,00,17,000 | 0.694 | 69,51,798 | 0.640 | 64,10,880 |
| 3 | 1,75,73,810 | 0.579 | 1,01,75,236 | 0.512 | 89,97,791 |
| 4 | 2,74,29,367 | 0.482 | 1,32,20,955 | 0.410 | 1,12,46,040 |
| 5 | 4,02,25,268 | 0.402 | 1,61,70,558 | 0.328 | 1,31,93,888 |
| 5 | 24,37,17,801 | 0.402 | 9,79,74,556 | 0.262 | 6,38,54,064 |
| | | | **1,67,06,548** | | **-1,89,77,337** |

IRR = $L + \dfrac{NPV_L}{NPV_L - NPV_H}(H-L)$

H = Higher rate = 25%

L = Lower rate = 20%

IRR = $20 + \dfrac{1{,}67{,}06{,}548}{1{,}67{,}06{,}548-(-1{,}89{,}77{,}337)}(25-20)$

= 20 + 4.68= 24.68%
#### Approach
Discount the same cash flows (with the terminal value) at a second, higher rate so that the NPV turns negative, then interpolate between the two rates.

---
item: q2
qno: 2
type: mcq
key: B
tags: fm.lev.leverage, fm.ratio.liquidity
difficulty: medium
q: 3-4
a: 13
---
#### Question
A manufacturing company which is presently growing at a good rate has a Financial Leverage of 3. Its present borrowings are as follows:

| | |
|---|---:|
| 12% Term Loan | ₹ 60,00,000 |
| Bank borrowings@10% | ₹ 40,00,000 |
| Public Deposits@8% | ₹ 20,00,000 |

The Interest Coverage Ratio will be
#### Options
(A) 1.0
(B) 1.5
(C) 2.0
(D) 2.5
#### Answer
**(b)** **Working Notes**

**Calculation of Interest**

| | |
|---|---:|
| 12% Term Loan | ₹ 7,20,000 |
| Bank borrowings@10% | ₹ 4,00,000 |
| Public Deposits@8% | ₹ 1,60,000 |
| Total Interest | ₹ 12,80,000 |

Financial Leverage = EBIT/EBIT – Interest

3 = EBIT/EBIT – 12,80,000

Or EBIT = 19,20,000

So, Interest Coverage Ratio = EBIT/Interest

= 19,20,000/12,80,000

= 1.5
#### Approach
Total the interest on the three borrowings, solve the financial leverage equation for EBIT, then divide EBIT by the interest.

---
item: q3
qno: 3
type: mcq
key: D
tags: fm.coc.debt, fm.ratio.liquidity
difficulty: easy
q: 4
a: 13
---
#### Question
Consider the below mentioned statements:

1. A debt-equity ratio of 2:1 indicates that for every 1 unit of equity, the company can raise 2 units of debt.
2. The cost of floating a debt is greater than the cost of floating an equity issue.

State True or False:
#### Options
(A) 1-True, 2-True
(B) 1-False, 2-True
(C) 1-False, 2-False
(D) 1-True, 2-False
#### Answer
**(d) 1-True, 2-False**

---
item: q4
qno: 4
type: descriptive
tags: fm.ratio.prepare
difficulty: medium
q: 4-5
a: 13-15
---
#### Question
Jamunapati Limited has furnished the following ratios and information relating to the year ended 31st March, 2024:

| | |
|---|---:|
| Sales | ₹ 70,00,000 |
| Return on net worth | 25% |
| Rate of income tax | 30% |
| Share capital to reserves | 7:3 |
| Current ratio | 2 |
| Net profit to sales | 7% |
| Inventory turnover | 10 |
| Cost of goods sold | ₹ 24,00,000 |
| Interest on 15% debentures | ₹ 1,05,000 |
| Receivables | ₹ 3,00,000 |
| Payables | ₹ 3,00,000 |

You are required to:

(a) CALCULATE the operating expenses for the year ended 31st March, 2024.

(b) PREPARE a Balance Sheet as on 31st March, 2024 in the following format:

**Balance Sheet as on 31st March, 2024**

| Liabilities | ₹ | Assets | ₹ |
|---|---:|---|---:|
| Share Capital | | Fixed Assets | |
| Reserve and Surplus | | Current Assets | |
| 15% Debentures | | Stock | |
| Payables | | Receivables | |
| | | Cash | |
#### Answer
(a) **Calculation of Operating Expenses for the year ended 31st March, 2024**

| | (₹) |
|---|---:|
| Net Profit [@ 7% of Sales] | 4,90,000 |
| Add: Income Tax (@ 30% of PBT) | 2,10,000 |
| **Profit Before Tax (PBT)** | 7,00,000 |
| Add: Debenture Interest | 1,05,000 |
| **Profit before interest and tax (PBIT)** | 8,05,000 |
| Now, Sales (given) | 70,00,000 |
| Less: Cost of goods sold | 24,00,000 |
| **Gross Profit** | 46,00,000 |
| *Less:* PBIT | 8,05,000 |
| **Operating Expenses** | **37,95,000** |

(b) **Balance Sheet as on 31st March, 2024**

| Liabilities | ₹ | Assets | ₹ |
|---|---:|---|---:|
| Share Capital | 13,72,000 | Fixed Assets | 23,60,000 |
| Reserve and Surplus | 5,88,000 | Current Assets: | |
| 15% Debentures | 70,00,000 | Stock | 2,40,000 |
| Payables | 3,00,000 | Receivables | 3,00,000 |
| | | Cash | 60,000 |
| | **29,60,000** | | **29,60,000** |

**Working Notes:**

(i) **Share Capital and Reserves and Surplus**

The return on net worth is 25%. Therefore, the profit after tax of ₹ 4,90,000 should be equivalent to 25% of the net worth.

Net worth × $\dfrac{25}{100}$ = ₹ 4,90,000

∴ Net worth = $\dfrac{\text{₹ }4{,}90{,}000 \times 100}{25}$ = ₹ 19,60,000

The ratio of share capital to reserves is 7:3

Share Capital = 19,60,000 × $\dfrac{7}{10}$ = ₹ 13,72,000

Reserves and Surplus = 19,60,000 × $\dfrac{3}{10}$ = ₹ 5,88,000

(ii) **Debentures**

Interest on Debentures @ 15% = ₹ 1,05,000

∴ Debentures = $\dfrac{1{,}05{,}000 \times 100}{15}$ = ₹ 7,00,000

(iii) **Current Assets**

Current Ratio = 2

Payables = ₹ 3,00,000

∴ Current Assets = 2 Current Liabilities

= 2 × 3,00,000

= ₹ 6,00,000

It is assumed that current liabilities include payables only.

(iv) **Fixed Assets**

| | ₹ |
|---|---:|
| Share capital | 13,72,000 |
| Reserves and Surplus | 5,88,000 |
| Debentures | 7,00,000 |
| Payables | 3,00,000 |
| Total Liabilities | 29,60,000 |
| Less: Current Assets | 6,00,000 |
| Fixed Assets | 23,60,000 |

(v) **Composition of Current Assets**

Inventory Turnover = 10

$\dfrac{\text{Cost of goods sold}}{\text{Closing stock}}$ = 10

Closing stock = $\dfrac{\text{₹ }24{,}00{,}000}{10}$ = ₹ 2,40,000

| Composition | ₹ |
|---|---:|
| Stock | 2,40,000 |
| Receivables | 3,00,000 |
| Cash (balancing figure) | 60,000 |
| Total Current Assets | 6,00,000 |
#### Approach
Work up from net profit to PBT and PBIT, and down from sales to gross profit, to isolate operating expenses. For the balance sheet, net worth comes from the return on net worth, debentures from their interest, and current assets from the current ratio.

---
item: q5
qno: 5
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: medium
q: 5-6
a: 16-17
---
#### Question
Lavanya Limited wishes to raise additional finance of ₹ 20 lakhs for meeting its investment plans. It has ₹ 4,20,000 in the form of retained earnings available for investment purposes. Further details are as following:

| | | |
|---|---|---:|
| (1) | Debt / Equity mix | 3:7 |
| (2) | Cost of debt: | |
| | Upto ₹ 3,60,000 | 8% (before tax) |
| | Beyond ₹ 3,60,000 | 12% (before tax) |
| (3) | Earnings per share | ₹ 5 |
| (4) | Dividend pay out | 40% of earnings |
| (5) | Retained Earnings | 60% |
| (6) | Rate of Return on Retained Earnings | 10% |
| (7) | Current market price per share | ₹ 53 |
| (8) | Tax rate | 30% |

You are required to:

(a) DETERMINE the pattern for raising the additional finance.

(b) DETERMINE the post-tax average cost of additional debt.

(c) DETERMINE the cost of retained earnings and cost of equity.

(d) COMPUTE the overall weighted average after tax cost of additional finance.
#### Answer
(a) **Pattern for raising the additional finance:**

| | | |
|---|---|---|
| Equity | 70% of ₹ 20,00,000 | = ₹14,00,000 |
| Debt | 30% of ₹ 20,00,000 | = ₹ 6,00,000 |

The capital structure after raising additional finance:

| | | (₹) |
|---|---|---:|
| **Shareholders’ funds** | | |
| Equity Capital | (₹ 14,00,000 – ₹ 4,20,000) | 9,80,000 |
| Retained earnings | | 4,20,000 |
| Debt (Interest at 8% p.a.) | | 3,60,000 |
| (Interest at 12% p.a.) | (₹ 6,00,000 – ₹ 3,60,000) | 2,40,000 |
| Total Funds | | 20,00,000 |

(b) **Determination of post-tax average cost of additional debt:**

$K_d$ = I (1 – t)

Where,

I = Interest Rate

t = Corporate tax-rate

On ₹ 3,60,000 =8% (1 – 0.3) =5.6% or 0.056

On ₹ 2,40,000 =12% (1 – 0.3) = 8.4% or 0.084

Average Cost of Debt

= $\dfrac{(\text{₹ }3{,}60{,}000 \times 0.056)+(\text{₹ }2{,}40{,}000 \times 0.084)}{\text{₹ }6{,}00{,}000} \times 100$ = 6.72%

(c) **Determination of cost of retained earnings and cost of equity by applying Dividend growth model:**

$K_e$ or $K_r$ = $\dfrac{D_1}{P_0} + g = \dfrac{D_0(1+g)}{P_0} + g$

Where,

$D_0$ = Dividend paid = 40% of EPS = 40% × ₹ 5 = ₹ 2

g = Growth rate = Retained Earnings x Rate of Return

= 0.6 x 0.10 = 0.06 or 6%

$P_0$ = Current market price per share = ₹ 53

$K_e$ or $K_r$ = $\dfrac{2\ (1+0.6)}{53} = \dfrac{2.12}{53}$ +0.06 = 0.04 + 0.06 = 0.10 or 10%

(d) **Computation of overall weighted average after tax cost of additional finance:**

| Particulars | Amount (₹) | Weights | Cost of funds | Weighted Cost (%) |
|---|---:|---:|---:|---:|
| Equity (including retained earnings) | 14,00,000 | 0.70 | 10% | 7 |
| Debt | 6,00,000 | 0.30 | 6.72% | 2.016 |
| WACC | 20,00,000 | | | **9.016** |
#### Approach
Split the new finance by the debt-equity mix, letting retained earnings fund equity first and the cheaper debt slab come first. Cost of equity and of retained earnings both follow the dividend growth model with g = retention × return on retained earnings.

---
item: q6
qno: 6
type: descriptive
tags: fm.cs.ebiteps, fm.coc.wacc, fm.cs.planning
difficulty: hard
q: 6-7
a: 17-20
---
#### Question
ABC Ltd. is planning to raise ₹50,00,000 for a major expansion project. The firm is evaluating three financing options:

(i) Equity Financing Only

Issuing new shares at ₹10 each (Issue price: ₹10, but flotation cost per share: ₹0.50).

Existing equity shares: 10,00,000.

Market price per share: ₹20.

(ii) Debt Financing Only

Borrow ₹50,00,000 at 12% interest.

Flotation cost on debt: 2% of the face value.

The lender imposes a debt covenant limiting the interest coverage ratio (EBIT/Interest) to a minimum of 2.5.

(iii) Mix of Equity and Debt Financing

Raise ₹25,00,000 through equity (floatation cost: ₹0.50/share at ₹ 10 issue price).

Raise ₹25,00,000 through debt at 12% interest (floatation cost: 2%).

Additional Information

(i) Project EBIT: ₹15,00,000 annually.

(ii) Corporate tax rate: 30%.

(iii) Existing shares: 10,00,000.

(iv) Risk-free rate: 6%, Market return: 14%, Equity beta: 1.2.

From the above information:

1. CALCULATE the net proceeds from each financing method (after floatation costs) and determine the number of new shares issued in Option (i) and Option (iii).
2. For debt options, CHECK if the interest coverage ratio complies with the covenant (minimum 2.5).
3. COMPUTE EPS under each option.
4. COMPUTE the WACC under each option, considering the impact of floatation costs on capital raised.

ADVISE which financing option is best from both an EPS and WACC perspective.
#### Answer
(i) **Calculation of Net Proceeds after Floatation Cost and Number of New Shares in Option (i) and (iii)**

**Equity Option**

Net proceeds per share = ₹ 10 – ₹ 0.50 = ₹9.50

Number of shares issued = ₹ 50,00,000 / ₹ 9.50 = **5,26,316 shares**

**Debt Option**

Flotation cost = 2% of ₹ 50,00,000 = ₹1,00,000

Net proceeds = ₹ 50,00,000 – ₹1,00,000 = **₹49,00,000**

But project requires ₹ 50,00,000.

So gross borrowing = ₹50,00,000 / (1 – 0.02) = **₹51,02,041**

Interest = 12% × ₹51,02,041 = **₹6,12,245**

**Mix Option (₹25 lakh Equity, ₹25 lakh Debt)**

**Equity**

Net proceeds/share = ₹ 9.50

Shares issued = ₹ 25,00,000 / ₹ 9.50 = **2,63,158 shares**

**Debt**

Net debt proceeds = ₹ 25,00,000.

Gross borrowing = ₹25,00,000 / (1 – 0.02) = ₹25,51,020

Interest = 12% × ₹25,51,020 = **₹3,06,122**

(ii) **Calculation of Interest Coverage Ratio (ICR)**

**ICR = EBIT / Interest**

**Debt Option:**

EBIT = ₹ 15,00,000

Interest = ₹ 6,12,245

ICR = ₹ 15,00,000 / ₹ 6,12,245 ≈ **2.45 (Fails covenant)**

**Mix of Equity and Debt Option**

Interest = ₹ 3,06,122

ICR = ₹ 15,00,000 / ₹ 3,06,122 ≈ **4.90 (Passes covenant)**

(iii) **Calculation of Earnings Per Share (EPS)**

EPS = $\dfrac{\text{(EBIT-Interest) (1-Tax)}}{\text{Total Shares}}$

**Equity Option**

Interest = ₹ 0

Net Income = ₹ 15,00,000 × (1 – 0.30) = ₹ 10,50,000

Total Shares = 10,00,000 + 5,26,316 = **15,26,316**

EPS = ₹ 10,50,000 / 15,26,316 = **₹ 0.688**

**Debt Option (Fails covenant)**

Interest = ₹ 6,12,245

Net Income = (₹ 15,00,000 – ₹ 6,12,245) × (1 – 0.30)

= ₹ 6,21,428.5

Total Shares = 10,00,000

EPS = ₹ 6,21,428.5 / 10,00,000

= **₹ 0.621** (But violates ICR)

**Mix Option**

Interest = ₹ 3,06,122

Net Income = (₹ 15,00,000 – ₹ 3,06,122) × 0.70 = ₹ 8,35,714.6

Total Shares = 10,00,000 + 2,63,158 = **12,63,158**

EPS = ₹ 8,35,714.6 / 12,63,158 ≈ **₹ 0.662**

(iv) **Calculation of WACC**

Cost of Equity (Using CAPM)

Cost of Equity = Rf+β(Rm–Rf)

= 6%+1.2 × (14%–6%) = 6%+9.6%=15.6%

Now, WACC = (EV×Ke) + (DV×Kd×(1−t))

**Equity Option**

E = ₹ 50,00,000

D = ₹ 0

WACC = 15.6%

**Debt Option**

E = ₹ 0

D = ₹ 51,02,041

Kd = 12%

After-tax cost of debt = 12% × (1 – 0.30) = 8.4%

WACC = 8.4% (Lowest WACC but fails covenant)

**Mix Option**

E = ₹ 25,00,000, D = ₹ 25,51,020

Total Value = ₹ 50,51,020

Ke = 15.6%, Kd (after tax) = 8.4%

WACC = (Weight of Ke x Cost of Equity) + (Weight of Kd x Cost of Debt)

= (0.495 x 0.156) + (0.505 x 0.084)

= 0.0772 + 0.0424 = 0.1196 or 11.96%

**Conclusion & Recommendation**

| Option | EPS | WACC | Covenant Compliant |
|---|---:|---:|---|
| Equity | ₹ 0.688 | 15.6% | Not Applicable |
| Debt | ₹ 0.621 | 8.4% | **No** (ICR < 2.5) |
| Mix | ₹ 0.662 | 11.96% | Yes |

Hence, the recommended option is Mixed Financing as it complies with the debt covenant, has higher EPS than Debt Option, and lower WACC than Equity Option.
#### Approach
Gross up the debt so that net proceeds after flotation still cover the project, and test each debt option against the interest cover covenant before comparing EPS. Take the cost of equity from CAPM and weight the after-tax costs for WACC.

---
item: q7
qno: 7
type: descriptive
tags: fm.lev.leverage
difficulty: medium
q: 7
a: 20-22
---
#### Question
X Limited and Y Limited are two mid-sized companies operating in the same competitive industry. Both companies have recently undergone a financial performance review to assess their operational efficiency, cost structure, and overall financial risk. You, as a financial analyst, have been provided with selective financial indicators and are required to draw insights and comparisons based on leverage analysis and income statement reconstruction.

The management of X Limited has disclosed that the company is currently operating with a Margin of Safety (M/S) ratio of 0.1667. In contrast, Y Limited has a Margin of Safety that is twice as high as that of X Limited.

Both companies maintain a Financial Leverage of 3. Their variable cost ratios are 60% for X Limited and 50% for Y Limited.

In terms of financing costs, X Limited incurs an annual interest expense of ₹30,000. Y Limited, however, incurs an interest cost that is 300% higher than X Limited. Both companies are subject to a corporate tax rate of 30%, which affects their net profitability after interest and taxes.

You are required to PREPARE Income statement for both the companies and IDENTIFY the company which is better placed with reasons based on leverages.
#### Answer
**Company X**

(i) Financial Leverage = $\dfrac{\text{EBIT}}{\text{EBT i.e EBIT – Interest}}$

So, 3 = $\dfrac{\text{EBIT}}{\text{EBIT – ₹ 30,000}}$

Or, 3 (EBIT – 30,000) = EBIT

Or, 2 EBIT = 90,000

Or, EBIT = 45,000

(ii) Margin of safety = 0.1667

Operating Leverage = 1/Margin of safety

= 1/0.1667 = 6

= $\dfrac{\text{Contribution}}{\text{EBIT}}$

Or, 6 = $\dfrac{\text{Contribution}}{\text{₹ 45,000}}$

Or, Contribution = ₹ 2, 70,000

Sales = $\dfrac{\text{contribution}}{\text{P/V Ratio(1 – variable cost ratio)}}$

= $\dfrac{\text{₹ 2,70,000}}{40\%}$ = ₹ 6,75,000

(iii) Fixed Cost = Contribution – EBIT

= ₹ 2,70,000 – 45,000

Or, Fixed cost = ₹ 2,25,000

**Company Y**

(i) Financial Leverage = $\dfrac{\text{EBIT}}{\text{EBT i.e EBIT – Interest}}$

So, 3 = $\dfrac{\text{EBIT}}{\text{EBIT – ₹ 1,20,000}}$

Or, 3 (EBIT – ₹ 1,20,000) = EBIT

Or, 3 EBIT – ₹ 3,60,000 = EBIT

Or, EBIT = ₹ 1,80,000

(ii) Margin of safety = 0.1667 x 2 = 0.3333

Operating Leverage = 1/Margin of safety

= 1/0.3333 = 3

= $\dfrac{\text{Contribution}}{\text{EBIT}}$

Or, 3 = $\dfrac{\text{Contribution}}{\text{₹ 1,80,000}}$

Or, Contribution = ₹ 5,40,000

Sales = $\dfrac{\text{Contribution}}{\text{P/V Ratio (1 - variable cost ratio)}}$

= $\dfrac{\text{₹ 5,40,000}}{50\%}$ = ₹ 10,80,000

(iii) Fixed Cost = Contribution – EBIT

= ₹ 5,40,000 – ₹ 1,80,000

Or, Fixed cost = ₹ 3,60,000

(iv) Interest = ₹ 30,000+₹ 30,000x300% = ₹ 1,20,000

**Income Statements of X Ltd and Y Ltd**

| | X Ltd (₹) | Y Ltd (₹) |
|---|---:|---:|
| Sales | 6,75,000 | 10,80,000 |
| Less: Variable cost | 4,05,000 | 5,40,000 |
| Contribution | 2,70,000 | 5,40,000 |
| Less: Fixed Cost | 2,25,000 | 3,60,000 |
| Earnings before interest and tax (EBIT) | 45,000 | 1,80,000 |
| Less: Interest | 30,000 | 1,20,000 |
| Earnings before tax (EBT) | 15,000 | 60,000 |
| Less: Tax @ 30% | 4,500 | 18,000 |
| Earnings after tax (EAT) | 10,500 | 42,000 |

**Comment based on Leverage**

Comment based on leverage – Company Y is better than company X of the following reasons:

(i) Capacity of Company Y to meet interest liability is same that of companies X (from EBIT/Interest ratio)

[X = $\dfrac{\text{₹ 45,000}}{\text{₹ 30,000}}$ = 1.5, Y = $\dfrac{\text{₹ 1,80,000}}{\text{₹ 1,20,000}}$ = 1.5]

(ii) However, Company Y has lesser financial risk as the total risk (business and financial) of company Y is lower (combined leverage of Company X is 18 and Company Y is 9).
#### Approach
Financial leverage with the known interest gives EBIT; operating leverage is the reciprocal of the margin of safety, which gives contribution and, through the P/V ratio, sales. Compare the companies on interest cover and combined leverage.

---
item: q8
qno: 8
type: descriptive
tags: fm.div.models, fm.coc.equity
difficulty: medium
q: 8
a: 23
---
#### Question
In the month of April of the current Financial Year, shares of PQR Ltd. were sold for ₹ 1,570 per share. A long-term earnings growth rate of 8% is anticipated. PQR Ltd. paid dividend of ₹ 25 per share.

(i) CALCULATE rate of return an investor can expect to earn assuming that dividends are expected to grow along with earnings at 8% per year in perpetuity.

(ii) It is expected that PQR Ltd. will earn about 10% on retained earnings and shall retain 60% of earnings. In this case, STATE whether, there would be any change in growth rate and cost of Equity?
#### Answer
(i) According to Dividend Discount Model approach, the firm’s expected or required return on equity is computed as follows:

$K_e = \dfrac{D_1}{P_0} + g$

$K_e = \dfrac{25\ (1 + 0.08)}{1{,}570} + 0.08$

= 0.0172 + 0.08 = 0.0972 or 9.72%

(ii) With rate of return on retained earnings (r) is 10% and retention ratio (b) is 60%, new growth rate will be as follows:

g = br = 0.10 × 0.60 = 0.06

Accordingly, dividend will also get changed and to calculate this, first we shall calculate previous retention ratio ($b_1$) and then EPS assuming that rate of return on retained earnings (r) is same.

With previous Growth Rate of 8% and r =10%, the retention ratio comes out to be:

0.08 = $b_1$ × 0.10

$b_1$ = 0.80. So, payout ratio = 0.20

With 0.20 payout ratio the EPS will be as follows:

$\dfrac{\text{₹ 25}}{0.20}$ = ₹ 125

With new 0.40 (1 – 0.60) payout ratio, the new dividend will be

$D_1$ = ₹ 125 × 0.40 = ₹ 50

Accordingly, new $K_e$ will be

$K_e = \dfrac{50}{1{,}570} + 0.06$

or, $K_e$ = 9.18%
#### Approach
Grow the dividend paid by one year before applying the dividend growth model. For (ii), the old growth rate and r give the old retention and so EPS; the new payout on that EPS gives the new dividend for the new Ke.

---
item: q9
qno: 9
type: descriptive
tags: fm.wc.receivables
difficulty: medium
q: 8
a: 24-25
---
#### Question
A firm has a total sale of ₹ 200 lakhs of which 80% is on credit. It is offering credit terms of 2/40, net 120. Of the total, 50% of customers avail of discount and the balance pay in 120 days. Past experience indicates that bad debt losses are around 1.5% of credit sales. The firm spends about ₹ 2,40,000 per annum to administer its credit sales. These are avoidable as a factor is prepared to buy the firm's receivables. He will charge 2% commission. He will pay advance against receivables to the firm at an interest rate of 18% after withholding 10% as reserve.

(i) DETERMINE the effective cost of factoring? Consider year as 360 days.

(ii) If bank finance for working capital is available at 12% interest, ADVISE, should the firm avail of factoring service
#### Answer
| Particulars | (₹) |
|---|---:|
| Total Sales | ₹ 200 lakhs |
| Credit Sales (80%) | ₹ 160 lakhs |
| Receivables for 40 days | ₹ 80 lakhs |
| Receivables for 120 days | ₹ 80 lakhs |
| Average collection period [(40 x 0.5) + (120 ×0.5)] | 80 days |
| Average level of Receivables (₹ 1,60,00,000 × 80/360) | ₹ 35,55,556 |
| Factoring Commission (₹ 35,55,556 × 2/100) | ₹ 71,111 |
| Factoring Reserve (₹ 35,55,556 × 10/100) | ₹ 3,55,556 |
| Amount available for advance {₹ 35,55,556 - (3,55,556 + 71,111)} | ₹ 31,28,889 |
| • Factor will deduct his interest @ 18%: | |
| • Interest = $\dfrac{\text{₹ 31,28,889 ×18×80}}{\text{100 × 360}}$ | ₹ 1,25,156 |
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
| | Bad Debts (₹ 160,00,000 x 1.5/100) avoided | 2,40,000 |
| | Total | 4,80,000 |
| C. | Net Cost to the firm (A – B) (₹ 8,83,200 – ₹ 4,80,000) | 4,03,200 |

Effective cost of factoring = $\dfrac{\text{₹ 4,03,200}}{\text{₹30,03,733}} \times 100$ = 13.42\* %

\* If cost of factoring is calculated on the basis of total amount available for advance, then, it will be = $\dfrac{\text{₹4,03,200}}{\text{₹31,28,889}} \times 100$ = 12.89%

(ii) If Bank finance for working capital is available at 12%, firm will not avail factoring service as 12% is less than 13.42% (or 12.89%)
#### Approach
Find the average receivables from the weighted collection period, then the commission, reserve and the factor's interest on the advance. Annualise the factor's costs, deduct the savings, and express the net cost as a percentage of the advance received.

---
item: q10a
qno: 10
part: (a)
type: descriptive
tags: fm.sources.long, fm.sources.modern, fm.sources.short, fm.sources.other
difficulty: easy
q: 8-9
a: 25
---
#### Question
Contemplate the list of features given below and IDENTIFY each one of them with the most relevant sources of funds:

(i) It is the most expensive source of funds.

(ii) It entails a high degree of risk since they have to be repaid as per the terms of agreement.

(iii) It supports businesses in their routine activities.

(iv) Business enterprise has options to raise capital from International markets also.

(v) This source of finance sometimes is the last option for startups which doesn’t qualify for bank funding
#### Answer
**The most relevant sources of funds:**

| Feature | Sources of Fund |
|---|---|
| (i) It is the most expensive source of funds. | **Equity** |
| (ii) It entails a high degree of risk since they have to be repaid as per the terms of agreement. | **Debentures** |
| (iii) It supports businesses in their routine activities. | **Funding from Banks** |
| (iv) Business enterprise has options to raise capital from International markets also. | **International Funding** |
| (v) This source of finance sometimes is the last option for startups which doesn’t qualify for bank funding | **Angel Financing** |

---
item: q10b
qno: 10
part: (b)
type: descriptive
tags: fm.sources.short, fm.wc.banking
difficulty: easy
q: 9
a: 25-26
---
#### Question
Trade credit and bank overdraft are two commonly used short-term financing sources but each has distinct features. On the light of the statement SHOW the difference between trade credit and bank overdraft.
#### Answer
Trade credit and bank overdraft are two commonly used short-term financing sources but each has distinct features which are shown below:

| S. No. | Trade credit | Bank overdraft |
|---|---|---|
| **1.** | Trade credit is the credit extended by suppliers, allowing the firm to delay payment for goods or services. | Under this facility, customers are allowed to withdraw in excess of credit balance standing in their Current Account. |
| **2.** | The usual duration of such credit is 15 to 90 days. | Though overdrafts are repayable on demand, they generally continue for long periods by annual renewals of the limits. |
| **3.** | Trade credit is a type of interest free loan, therefore failure to avail this facility has an interest cost. | Interest is charged on daily balances |
| **4.** | It generates automatically in the course of business and is common to almost all business operations. | Borrower need to apply to bank for Bank overdraft facility and are operated in the same way as cash credit and current accounts. |
| **5.** | It enhances automatically with the increase in the volume of business and fast payment. | A fixed limit is, therefore, granted to the borrower within which the borrower is allowed to overdraw his account. |

---
item: q10c
qno: 10
part: (c)
type: descriptive
tags: fm.wc.basics
difficulty: medium
q: 9
a: 26-27
---
#### Question
ABC Ltd. is a manufacturing company experiencing rapid sales growth. To meet the increased demand, the company has started maintaining higher inventory levels and offering more generous credit terms to customers. However, its cash reserves are depleting, and it is facing difficulties in paying suppliers on time. As a financial analyst, apply your understanding of the scope of working capital management to ANALYZE the trade-offs the company is making between different components of working capital (inventory, receivables, advances, payables, and cash).
#### Answer
The trade-off between the components of working capital can be summarised as follows:

| Component of Working Capital | Advantages of higher side (Profitability) | Trade-off (between Profitability and Liquidity) | Advantages of lower side (Liquidity) |
|---|---|---|---|
| Inventory | Fewer stock-outs increase the profitability. | Use techniques like EOQ, JIT etc. to carry optimum level of inventory. | Lower inventory requires less capital but endangered stock-out and loss of goodwill. |
| Receivables | Higher Credit period attract customers and increase revenue (but can result in more bad debts) | Evaluate the credit policy; use the services of debt management (factoring) agencies. | Cash sales provide liquidity but fails to boost sales and revenue (due to lower credit period) |
| Pre-payment of expenses | Reduces uncertainty and profitable in inflationary environment. | Cost-benefit analysis required | Improves or maintains liquidity. |
| Cash and Cash equivalents | Payables are honoured in time, improves the goodwill and helpful in getting future discounts. | Cash budgets and other cash management techniques can be used | Cash can be invested in some other investment avenues |
| Payables and Expenses | Capital can be used in some other investment avenues | Evaluate the credit policy and related cost. | Payables are honoured in time, improves the goodwill and helpful in getting future discounts. |
#### Approach
Take each component in turn and set what holding more of it does for profitability against what holding less does for liquidity.
