<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-rtp-nov2020
paper: p8
kind: rtp
attempt: nov2020
qfile: old/p8/rtp-nov2020-qa.pdf
afile: old/p8/rtp-nov2020-qa.pdf
status: checked
by: tx-69
date: 2026-10-20
note: check.py: the nine numbers accepted (3, 5, 7, 9, 11, 13, 15, 17, 19) are the page numbers of the odd pages pp.3-19, printed beside the running head "PAPER – 8: FINANCIAL MANAGEMENT & ECONOMICS FOR FINANCE"; the Economics pages print the head as "... MANAGEMENT AND ECONOMICS ...", so neither variant is on enough of the file's 27 pages for check.py to read it as a running head. Old-scheme Paper 8 Part A (Financial Management) of ICAI's Revision Test Paper for the November 2020 examination (one file: 8A questions pp.1-5, "Suggested Hints/Answers" pp.6-19); Section B Economics for Finance (from p.20) is not part of PassBook (no blocks cite it). ICAI's own copy is no longer online; the file is the cacult.com mirror recorded in bank/sources.json. RTP: ICAI prints no marks and no instructions. ICAI's chapter headings (Ratio Analysis, Cost of Capital, Capital Structure, Leverage, Investment Decisions, Management of Receivables (Debtors), Risk Analysis in Capital Budgeting, Dividend Decisions, Management of working Capital, Miscellaneous) are headings, not question text, and are not transcribed; nor are the title lines on p.1 ("PAPER – 8: FINANCIAL MANAGEMENT & ECONOMICS FOR FINANCE", "PART A: FINANCIAL MANAGEMENT", "QUESTIONS") and the answers' "SUGGESTED HINTS/ANSWERS" (p.6). Item model: Q1-Q9 are one item each (their lettered requirements stay in the question and ICAI answers each on one set of data); Q10 (a) and (b) are two items. Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics; Q7 (certainty-equivalent approach) is out of syllabus (oos, see its note). Repaired extraction damage only, read from the rendered pages: stacked fractions written in KaTeX with ICAI's symbols and numbers; subscripts ($K_e$, $K_d$, $K_p$, $K_o$, $P_0$, $D_1$, $E_1$, $N_1$, $N_2$) in KaTeX; the ∴, × and − signs the text layer drops, read from the rendered pages; "31st" and "4th" superscripts as plain text; the equation editor's "Inventorie s", "liabilitie s" and "Div idend" spacing restored; tables that run over a page joined into one table (see the items' notes); table cells printed on two lines joined with a space; ICAI's diamond bullets as "- " lists; the Rupee-font backtick as ₹. ICAI's own wording kept as printed (see the items' notes).
---

---
item: q1
qno: 1
type: descriptive
tags: fm.ratio.prepare, fm.ratio.liquidity
difficulty: medium
q: 1
a: 6-7
note: As printed: "Fixed Assets to Proprietary ratio", "Current liability" in the singular, "[FA+NWC = PF]" and "PF- FA [(i.e. .75 PF)]". ICAI prints "₹ 3, 20,000" and "₹ 4, 80,000" in working note (ii) with a space after the first comma; written 3,20,000 and 4,80,000.
---
#### Question
Following information has been provided from the books of M/s Laxmi & Co. for the year ending on 31st March, 2020:

| | |
|---|---|
| Net Working Capital | ₹ 4,80,000 |
| Bank overdraft | ₹ 80,000 |
| Fixed Assets to Proprietary ratio | 0.75 |
| Reserves and Surplus | ₹ 3,20,000 |
| Current ratio | 2.5 |
| Liquid ratio (Quick Ratio) | 1.5 |

You are required to PREPARE a summarised Balance Sheet as at 31st March, 2020.
#### Answer
**Working notes:**

**(i) Current Assets and Current Liabilities computation:**

$\dfrac{\text{Current assets}}{\text{Current liabilities}} = \dfrac{2.5}{1}$

Or Current assets = 2.5 Current liabilities

Now, Working capital = Current assets − Current liabilities

Or ₹ 4,80,000 = 2.5 Current liability − Current liability

Or 1.5 Current liability = ₹ 4,80,000

∴ Current Liabilities = ₹ 3,20,000

So, Current Assets = ₹ 3,20,000 × 2.5 = ₹ 8,00,000

**(ii) Computation of stock**

Liquid ratio = $\dfrac{\text{Liquid assets}}{\text{Current liabilities}}$

Or 1.5 = $\dfrac{\text{Current assets - Inventories}}{\text{₹ } 3{,}20{,}000}$

Or 1.5 × ₹ 3,20,000 = ₹ 8,00,000 − Inventories

Or Inventories = ₹ 8,00,000 – ₹ 4,80,000

Or Stock = ₹ 3,20,000

**(iii) Computation of Proprietary fund; Fixed assets; Capital and Sundry creditors**

Fixed Asset to Proprietary ratio = $\dfrac{\text{Fixed assets}}{\text{Proprietary fund}} = 0.75$

∴ Fixed Assets = 0.75 Proprietary fund (PF)[FA+NWC = PF]

or NWC = PF- FA [(i.e. .75 PF)]

and Net Working Capital (NWC) = 0.25 Proprietary fund

Or ₹ 4,80,000/0.25 = Proprietary fund

Or Proprietary fund = ₹ 19,20,000

and Fixed Assets = 0.75 proprietary fund

= 0.75 × ₹ 19,20,000 = ₹ 14,40,000

Capital = Proprietary fund − Reserves & Surplus

= ₹ 19,20,000 − ₹ 3,20,000 = ₹ 16,00,000

Sundry Creditors = (Current liabilities − Bank overdraft)

= (₹ 3,20,000 − ₹ 80,000) = ₹ 2,40,000

**Balance Sheet as at 31st March, 2020**

| Liabilities | ₹ | Assets | ₹ |
|---|---:|---|---:|
| Capital | 16,00,000 | Fixed Assets | 14,40,000 |
| Reserves & Surplus | 3,20,000 | Stock | 3,20,000 |
| Bank overdraft | 80,000 | Other Current Assets | 4,80,000 |
| Sundry creditors | 2,40,000 | | |
| | 22,40,000 | | 22,40,000 |
#### Approach
Start from net working capital and the current ratio to fix current assets and liabilities, then use the liquid ratio for stock. Fixed assets plus net working capital make up the proprietary fund, so the fixed assets to proprietary ratio gives the proprietary fund.

---
item: q2
qno: 2
type: descriptive
tags: fm.coc.wacc, fm.coc.debt, fm.coc.equity
difficulty: hard
q: 1-2
a: 7-9
note: As printed: "floatation", "Equity shares has ₹ 4 floatation cost", "The firm has practice of paying all earnings in the form of dividend", and the answer's parts (i)-(iii) (the component costs) followed by (a) and (b) (the two WACCs). The market-value WACC table runs from p.8 to p.9 and is joined into one table.
---
#### Question
CALCULATE the WACC using the following data by using:

(a) Book value weights

(b) Market value weights

The capital structure of the company is as under:

| Particulars | (₹) |
|---|---:|
| Debentures (₹ 100 per debenture) | 5,00,000 |
| Preference shares (₹ 100 per share) | 5,00,000 |
| Equity shares (₹ 10 per share) | 10,00,000 |
| | 20,00,000 |

The market prices of these securities are:

| | |
|---|---|
| Debentures | ₹ 105 per debenture |
| Preference shares | ₹ 110 per preference share |
| Equity shares | ₹ 24 each. |

Additional information:

(i) ₹ 100 per debenture redeemable at par, 10% coupon rate, 4% floatation costs, 10-year maturity.

(ii) ₹ 100 per preference share redeemable at par, 5% coupon rate, 2% floatation cost and 10-year maturity.

(iii) Equity shares has ₹ 4 floatation cost and market price ₹ 24 per share.

The next year expected dividend is ₹ 1 with annual growth of 5%. The firm has practice of paying all earnings in the form of dividend.

Corporate tax rate is 30%. Use YTM method to calculate cost of debentures and preference shares.
#### Answer
**(i) Cost of Equity ($K_e$)**

$= \dfrac{D_1}{P_0 - F} + g = \dfrac{\text{₹ } 1}{\text{₹ } 24 - \text{₹ } 4}$ + 0.05 = 0.1 or 10%

**(ii) Cost of Debt ($K_d$)**

Current market price ($P_0$) – floatation cost = I(1-t) × PVAF(r,10) + RV × PVIF(r,10)

₹ 105 – 4% of ₹ 105 = ₹ 10 (1-0.3) × PVAF (r,10) + ₹ 100 × PVIF (r,10)

Calculation of NPV at discount rate of 5% and 7%

| Year | Cash flows (₹) | Discount factor @ 5% | Present Value | Discount factor @ 7% | Present Value (₹) |
|---|---:|---:|---:|---:|---:|
| 0 | 100.8 | 1.000 | (100.8) | 1.000 | (100.8) |
| 1 to 10 | 7 | 7.722 | 54.05 | 7.024 | 49.17 |
| 10 | 100 | 0.614 | 61.40 | 0.508 | 50.80 |
| NPV | | | +14.65 | | -0.83 |

**Calculation of IRR**

IRR = $5\% + \dfrac{14.65}{14.65 - (-0.83)}(7\% - 5\%) = 5\% + \dfrac{14.65}{15.48}(7\% - 5\%)$ = 6.89%

Cost of Debt ($K_d$) = 6.89%

**(iii) Cost of Preference shares ($K_p$)**

Current market price ($P_0$) – floatation cost = PD × PVAF(r,10) + RV × PVIF(r,10)

₹ 110 – 2% of ₹ 110 = ₹ 5 × PVAF (r,10) + ₹ 100 × PVIF (r,10)

Calculation of NPV at discount rate of 3% and 5%

| Year | Cash flows (₹) | Discount factor @ 3% | Present Value | Discount factor @ 5% | Present Value (₹) |
|---|---:|---:|---:|---:|---:|
| 0 | 107.8 | 1.000 | (107.8) | 1.000 | (107.8) |
| 1 to 10 | 5 | 8.530 | 42.65 | 7.722 | 38.61 |
| 10 | 100 | 0.744 | 74.40 | 0.614 | 61.40 |
| NPV | | | +9.25 | | -7.79 |

**Calculation of IRR**

IRR = $3\% + \dfrac{9.25}{9.25 - (-7.79)}(5\% - 3\%) = 3\% + \dfrac{9.25}{17.04}(5\% - 3\%)$ = 4.08%

Cost of Preference Shares ($K_p$) = 4.08%

**(a) Calculation of WACC using book value weights**

| Source of capital | Book Value | Weights | After tax cost of capital | WACC ($K_o$) |
|---|---:|---:|---:|---:|
| | **(₹)** | **(a)** | **(b)** | **(c) = (a)×(b)** |
| 10% Debentures | 5,00,000 | 0.25 | 0.0689 | 0.01723 |
| 5% Preference shares | 5,00,000 | 0.25 | 0.0408 | 0.0102 |
| Equity shares | 10,00,000 | 0.50 | 0.10 | 0.05000 |
| | 20,00,000 | 1.00 | | 0.07743 |

WACC ($K_o$) = 0.07743 or 7.74%

**(b) Calculation of WACC using market value weights**

| Source of capital | Market Value | Weights | After tax cost of capital | WACC ($K_o$) |
|---|---:|---:|---:|---:|
| | **(₹)** | **(a)** | **(b)** | **(c) = (a)×(b)** |
| 10% Debentures (₹ 105× 5,000) | 5,25,000 | 0.151 | 0.0689 | 0.0104 |
| 5% Preference shares (₹ 110× 5,000) | 5,50,000 | 0.158 | 0.0408 | 0.0064 |
| Equity shares (₹ 24× 1,00,000) | 24,00,000 | 0.691 | 0.10 | 0.0691 |
| | 34,75,000 | 1.000 | | 0.0859 |

WACC ($K_o$) = 0.0859 or 8.59%
#### Approach
Cost each source first: the dividend growth model net of flotation cost for equity, and the YTM of the net proceeds (an IRR found by trying two rates) for the debentures and the preference shares. Then weight the three costs by book values and again by market values.

---
item: q3
qno: 3
type: descriptive
tags: fm.cs.ebiteps
difficulty: medium
q: 2
a: 9
note: As printed: the question's equity capital of "8,00,000" in "Equity shares of ₹ 10 each" while ICAI's answer divides by "80,00,000 shares"; the unclosed brackets in "(EBIT (1 - t) - Preference Dividend" and "(₹ 3,02,400"; the "x" in the second line beside "×" in the last two. The equation editor's "Div idend" is re-joined.
---
#### Question
Xylo Ltd. is considering two alternative financing plans as follows:

| Particulars | Plan – A (₹) | Plan – B (₹) |
|---|---:|---:|
| Equity shares of ₹ 10 each | 8,00,000 | 8,00,000 |
| Preference Shares of ₹ 100 each | - | 4,00,000 |
| 12% Debentures | 4,00,000 | - |
| | 12,00,000 | 12,00,000 |

The indifference point between the plans is ₹ 4,80,000. Corporate tax rate is 30%. CALCULATE the rate of dividend on preference shares.
#### Answer
**Computation of Rate of Preference Dividend**

$\dfrac{\text{(EBIT - Interest) (1 - t)}}{\text{No. of Equity Shares } (N_1)} = \dfrac{\text{(EBIT (1 - t) - Preference Dividend}}{\text{No. of Equity Shares } (N_2)}$

$\dfrac{(\text{₹ } 4{,}80{,}000 - \text{₹ } 48{,}000) \text{ x } (1 - 0.30)}{80{,}00{,}000 \text{ shares}} = \dfrac{\text{₹ } 4{,}80{,}000 (1 - 0.30) - \text{Preference Dividend}}{80{,}00{,}000 \text{ shares}}$

$\dfrac{(\text{₹ } 3{,}02{,}400}{80{,}00{,}000 \text{ shares}} = \dfrac{\text{₹ } 3{,}36{,}000 - \text{Preference Dividend}}{80{,}00{,}000 \text{ shares}}$

₹ 3,02,400 = ₹ 3,36,000 – Preference Dividend

Preference Dividend = ₹ 3,36,000 – ₹ 3,02,400 = ₹ 33,600

Rate of Dividend = $\dfrac{\text{Preference Dividend}}{\text{Preference share capital}} \times 100$

= $\dfrac{\text{₹ } 33{,}600}{4{,}00{,}000} \times 100$ = 8.4%
#### Approach
At the indifference point the EPS under the two plans is equal: write each plan's EPS at the given EBIT and solve the equation for the preference dividend.

---
item: q4
qno: 4
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 2
a: 9-10
note: ICAI answers the question's requirements (a), (b) and (c) as (i), (ii) and (iii); kept. As printed: "consisted as follows", "= x 100 = 44.44%", and the leading "=" that ICAI prints before some of the fractions in the second table and not before others.
---
#### Question
The capital structure of PS Ltd. for the year ended 31st March, 2020 consisted as follows:

| Particulars | Amount in ₹ |
|---|---:|
| Equity share capital (face value ₹ 100 each) | 10,00,000 |
| 10% debentures (₹ 100 each) | 10,00,000 |

During the year 2019-20, sales decreased to 1,00,000 units as compared to 1,20,000 units in the previous year. However, the selling price stood at ₹ 12 per unit and variable cost at ₹ 8 per unit for both the years. The fixed expenses were at ₹ 2,00,000 p.a. and the income tax rate is 30%.

You are required to CALCULATE the following:

(a) The degree of financial leverage at 1,20,000 units and 1,00,000 units.

(b) The degree of operating leverage at 1,20,000 units and 1,00,000 units.

(c) The percentage change in EPS.
#### Answer
| Sales in units | 1,20,000 | 1,00,000 |
|---|---:|---:|
| | **(₹)** | **(₹)** |
| Sales Value | 14,40,000 | 12,00,000 |
| Variable Cost | (9,60,000) | (8,00,000) |
| Contribution | 4,80,000 | 4,00,000 |
| Fixed expenses | (2,00,000) | (2,00,000) |
| EBIT | 2,80,000 | 2,00,000 |
| Debenture Interest | (1,00,000) | (1,00,000) |
| EBT | 1,80,000 | 1,00,000 |
| Tax @ 30% | (54,000) | (30,000) |
| Profit after tax (PAT) | 1,26,000 | 70,000 |

| | | |
|---|---|---|
| (i) Financial Leverage= $\dfrac{\text{EBIT}}{\text{EBT}}$ | $= \dfrac{\text{₹ } 2{,}80{,}000}{\text{₹ } 1{,}80{,}000}$ = 1.56 | $= \dfrac{\text{₹ } 2{,}00{,}000}{\text{₹ } 1{,}00{,}000}$ = 2 |
| (ii) Operating leverage = $\dfrac{\text{Contribution}}{\text{EBIT}}$ | $\dfrac{\text{₹ } 4{,}80{,}000}{\text{₹ } 2{,}80{,}000}$ = 1.71 | $= \dfrac{\text{₹ } 4{,}00{,}000}{\text{₹ } 2{,}00{,}000}$ = 2 |
| (iii) Earnings per share (EPS) | $\dfrac{\text{₹ } 1{,}26{,}000}{\text{₹ } 10{,}000}$ = ₹ 12.6 | $\dfrac{\text{₹ } 70{,}000}{\text{₹ } 10{,}000}$ = ₹ 7 |
| Decrease in EPS | = ₹ 12.6 – ₹ 7 = ₹ 5.6 | |
| % decrease in EPS | $\dfrac{5.6}{12.6}$ = x 100 = 44.44% | |
#### Approach
Draw up the income statement at both volumes down to profit after tax; financial leverage is EBIT over EBT, operating leverage is contribution over EBIT, and EPS is PAT over the number of equity shares.

---
item: q5
qno: 5
type: descriptive
tags: fm.capbud.cashflows, fm.capbud.npv
difficulty: hard
q: 3
a: 10-11
note: ICAI's Statement of Incremental Cash Flows runs from p.10 to p.11 and is joined into one table. As printed: "(₹ In lakh)" in the question beside "(₹ in lakh)" in the answer, "Sales :(A)", "Total cost: (B)", "year - 1" and "year - 2", and the notes' "Apportioned factory overheads are not relevant only insurance charges of this project are relevant".
---
#### Question
A large profit making company is considering the installation of a machine to process the waste produced by one of its existing manufacturing process to be converted into a marketable product. At present, the waste is removed by a contractor for disposal on payment by the company of ₹ 150 lakh per annum for the next four years. The contract can be terminated upon installation of the aforesaid machine on payment of a compensation of ₹ 90 lakh before the processing operation starts. This compensation is not allowed as deduction for tax purposes.

The machine required for carrying out the processing will cost ₹ 600 lakh to be financed by a loan repayable in 4 equal instalments commencing from end of the year 1. The interest rate is 14% per annum. At the end of the 4th year, the machine can be sold for ₹ 60 lakh and the cost of dismantling and removal will be ₹ 45 lakh.

Sales and direct costs of the product emerging from waste processing for 4 years are estimated as under:

(₹ In lakh)

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| Sales | 966 | 966 | 1,254 | 1,254 |
| Material consumption | 90 | 120 | 255 | 255 |
| Wages | 225 | 225 | 255 | 300 |
| Other expenses | 120 | 135 | 162 | 210 |
| Factory overheads | 165 | 180 | 330 | 435 |
| Depreciation (as per income tax rules) | 150 | 114 | 84 | 63 |

Initial stock of materials required before commencement of the processing operations is ₹ 60 lakh at the start of year 1. The stock levels of materials to be maintained at the end of year 1, 2 and 3 will be ₹ 165 lakh and the stocks at the end of year 4 will be nil. The storage of materials will utilise space which would otherwise have been rented out for ₹ 30 lakh per annum. Labour costs include wages of 40 workers, whose transfer to this process will reduce idle time payments of ₹ 45 lakh in the year - 1 and ₹ 30 lakh in the year - 2. Factory overheads include apportionment of general factory overheads except to the extent of insurance charges of ₹ 90 lakh per annum payable on this venture. The company’s tax rate is 30%.

Present value factors for four years are as under:

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| PV factors @14% | 0.877 | 0.769 | 0.674 | 0.592 |

ADVISE the management on the desirability of installing the machine for processing the waste. All calculations should form part of the answer.
#### Answer
**Statement of Operating Profit from processing of waste** (₹ in lakh)

| Year | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|
| Sales :(A) | 966 | 966 | 1,254 | 1,254 |
| Material consumption | 90 | 120 | 255 | 255 |
| Wages | 180 | 195 | 255 | 300 |
| Other expenses | 120 | 135 | 162 | 210 |
| Factory overheads (insurance only) | 90 | 90 | 90 | 90 |
| Loss of rent on storage space (opportunity cost) | 30 | 30 | 30 | 30 |
| Interest @14% | 84 | 63 | 42 | 21 |
| Depreciation (as per income tax rules) | 150 | 114 | 84 | 63 |
| Total cost: (B) | 744 | 747 | 918 | 969 |
| Profit (C)=(A)-(B) | 222 | 219 | 336 | 285 |
| Tax (30%) | 66.6 | 65.7 | 100.8 | 85.5 |
| Profit after Tax (PAT) | 155.4 | 153.3 | 235.2 | 199.5 |

**Statement of Incremental Cash Flows** (₹ in lakh)

| Year | 0 | 1 | 2 | 3 | 4 |
|---|---:|---:|---:|---:|---:|
| Material stock | (60) | (105) | - | - | 165 |
| Compensation for contract | (90) | - | - | - | - |
| Contract payment saved | - | 150 | 150 | 150 | 150 |
| Tax on contract payment | - | (45) | (45) | (45) | (45) |
| Incremental profit | - | 222 | 219 | 336 | 285 |
| Depreciation added back | - | 150 | 114 | 84 | 63 |
| Tax on profits | - | (66.6) | (65.7) | (100.8) | (85.5) |
| Loan repayment | - | (150) | (150) | (150) | (150) |
| Profit on sale of machinery (net) | - | - | - | - | 15 |
| Total incremental cash flows | (150) | 155.4 | 222.3 | 274.2 | 397.5 |
| Present value factor | 1.00 | 0.877 | 0.769 | 0.674 | 0.592 |
| Present value of cash flows | (150) | 136.28 | 170.95 | 184.81 | 235.32 |
| Net present value | | | | | 577.36 |

**Advice:** Since the net present value of cash flows is ₹ 577.36 lakh which is positive the management should install the machine for processing the waste.

**Notes:**

(i) Material stock increases are taken in cash flows.

(ii) Idle time wages have also been considered.

(iii) Apportioned factory overheads are not relevant only insurance charges of this project are relevant.

(iv) Interest calculated at 14% based on 4 equal instalments of loan repayment.

(v) Sale of machinery- Net income after deducting removal expenses taken. Tax on Capital gains ignored.

(vi) Saving in contract payment and income tax thereon considered in the cash flows.
#### Approach
Keep only incremental, relevant flows: the rent forgone on storage space and the idle-time saving count, the apportioned general overheads do not. The contract payment saved is an inflow (taxed), the compensation is not tax-deductible, and the stock build-up and its release at the end are cash flows.

---
item: q6
qno: 6
type: descriptive
tags: fm.wc.receivables
difficulty: hard
q: 4
a: 11-14
note: ICAI's Total Approach table runs from p.11 to p.12 and its Incremental Approach table from p.12 to p.13; each is joined into one table. ICAI prints the figures of row (f) of the Incremental Approach table in bold. As printed: "Present default anticipated" (the question's column of default rates), "After certain researches", "Opportunity Cost of Average Investments", and "(d) Incremental Expected Profit (a – b –c)]" with its unopened bracket.
---
#### Question
A company wants to follow a more prudent policy to improve its sales for the region which is ₹ 9 lakhs per annum at present, having an average collection period of 45 days. After certain researches, the management consultant of the company reveals the following information:

| Credit Policy | Increase in collection period | Increase in sales | Present default anticipated |
|---|---|---:|---:|
| W | 15 days | ₹ 60,000 | 1.5% |
| X | 30 days | ₹ 90,000 | 2% |
| Y | 45 days | ₹ 1,50,000 | 3% |
| Z | 70 days | ₹ 2,10,000 | 4% |

The selling price per unit is ₹ 3. Average cost per unit is ₹ 2.25 and variable costs per unit are ₹ 2. The current bad debt loss is 1%. Required return on additional investment is 20%. (Assume 360 days year)

ANALYSE which of the above policies would you recommend for adoption?
#### Answer
**A. Statement showing the Evaluation of Debtors Policies (Total Approach)**

(Amount in ₹)

| Particulars | | Present Policy 45 days | Proposed Policy W 60 days | Proposed Policy X 75 days | Proposed Policy Y 90 days | Proposed Policy Z 115 days |
|---|---|---:|---:|---:|---:|---:|
| I. | **Expected Profit:** | | | | | |
| | (a) Credit Sales | 9,00,000 | 9,60,000 | 9,90,000 | 10,50,000 | 11,10,000 |
| | (b) Total Cost other than Bad Debts | | | | | |
| | (i) Variable Costs [Sales × 2/ 3] | 6,00,000 | 6,40,000 | 6,60,000 | 7,00,000 | 7,40,000 |
| | (ii) Fixed Costs | 75,000 | 75,000 | 75,000 | 75,000 | 75,000 |
| | | 6,75,000 | 7,15,000 | 7,35,000 | 7,75,000 | 8,15,000 |
| | (c) Bad Debts | 9,000 | 14,400 | 19,800 | 31,500 | 44,400 |
| | (d) Expected Profit [(a) – (b) – (c)] | 2,16,000 | 2,30,600 | 2,35,200 | 2,43,500 | 2,50,600 |
| II. | **Opportunity Cost of Investments in Receivables** | 16,875 | 23,833 | 30,625 | 38,750 | 52,069 |
| III. | **Net Benefits (I – II)** | 1,99,125 | 2,06,767 | 2,04,575 | 2,04,750 | 1,98,531 |

**Recommendation:** The Proposed Policy W (i.e. increase in collection period by 15 days or total 60 days) should be adopted since the net benefits under this policy are higher as compared to other policies.

**Working Notes:**

**(i) Calculation of Fixed Cost** = [Average Cost per unit – Variable Cost per unit] × No. of Units sold

= [₹ 2.25 - ₹ 2.00] × (₹ 9,00,000/3)

= ₹ 0.25 × 3,00,000 = ₹ 75,000

**(ii) Calculation of Opportunity Cost of Average Investments**

Opportunity Cost = Total Cost × $\dfrac{\text{Collection period}}{360} \times \dfrac{\text{Rate of Return}}{100}$

Present Policy = 6,75,000 × $\dfrac{45}{360} \times \dfrac{20}{100}$= 16,875

Policy W = 7,15,000 × $\dfrac{60}{360} \times \dfrac{20}{100}$= 23,833

Policy X = 7,35,000 × $\dfrac{75}{360} \times \dfrac{20}{100}$= 30,625

Policy Y = 7,75,000 × $\dfrac{90}{360} \times \dfrac{20}{100}$= 38,750

Policy Z = 8,15,000 × $\dfrac{115}{360} \times \dfrac{20}{100}$= 52,069

**B.** Another method of solving the problem is **Incremental Approach**. Here we assume that sales are all credit sales.

(Amount in ₹)

| Particulars | | Present Policy 45 days | Proposed Policy W 60 days | Proposed Policy X 75 days | Proposed Policy Y 90 days | Proposed Policy Z 115 days |
|---|---|---:|---:|---:|---:|---:|
| I. | **Incremental Expected Profit:** | | | | | |
| | (a) Incremental Credit Sales | 0 | 60,000 | 90,000 | 1,50,000 | 2,10,000 |
| | (b) Incremental Costs | | | | | |
| | (i) Variable Costs | 6,00,000 | 40,000 | 60,000 | 1,00,000 | 1,40,000 |
| | (ii) Fixed Costs | 75,000 | - | - | - | - |
| | (c) Incremental Bad Debt Losses | 9,000 | 5,400 | 10,800 | 22,500 | 35,400 |
| | (d) Incremental Expected Profit (a – b –c)] | | 14,600 | 19,200 | 27,500 | 34,600 |
| II. | **Required Return on Incremental Investments:** | | | | | |
| | (a) Cost of Credit Sales | 6,75,000 | 7,15,000 | 7,35,000 | 7,75,000 | 8,15,000 |
| | (b) Collection period | 45 | 60 | 75 | 90 | 115 |
| | (c) Investment in Receivable (a × b/360) | 84,375 | 1,19,167 | 1,53,125 | 1,93,750 | 2,60,347 |
| | (d) Incremental Investment in Receivables | - | 34,792 | 68,750 | 1,09,375 | 1,75,972 |
| | (e) Required Rate of Return (in %) | | 20 | 20 | 20 | 20 |
| | (f) Required Return on Incremental Investments (d × e) | **-** | **6,958** | **13,750** | **21,875** | **35,194** |
| III. | **Net Benefits (I – II)** | - | 7,642 | 5,450 | 5,625 | (594) |

**Recommendation:** The Proposed Policy W should be adopted since the net benefits under this policy are higher than those under other policies.

**C.** Another method of solving the problem is by computing the **Expected Rate of Return.**

Expected Rate of Return = $\dfrac{\text{Incremental Expected Profit}}{\text{Incremental Investment in Receivables}} \times 100$

For Policy W = $\dfrac{\text{₹ } 14{,}600}{\text{₹ } 34{,}792}$ x 100 = 41.96%

For Policy X = $\dfrac{\text{₹ } 19{,}200}{\text{₹ } 68{,}750}$ x 100 = 27.93%

For Policy Y = $\dfrac{\text{₹ } 27{,}500}{\text{₹ } 1{,}09{,}375}$ x 100 = 25.14%

For Policy Z = $\dfrac{\text{₹ } 34{,}600}{\text{₹ } 1{,}75{,}972}$ x 100 = 19.66%

**Recommendation:** The Proposed Policy W should be adopted since the Expected Rate of Return (41.96%) is more than the Required Rate of Return (20%) and is highest among the given policies compared.
#### Approach
For each policy work out the expected profit (sales less variable and fixed costs and bad debts), then charge the required return on the investment in receivables, measured at cost for the collection period. Recommend the policy with the highest net benefit.

---
item: q7
qno: 7
type: descriptive
tags: fm.capbud.npv
oos: yes
difficulty: medium
q: 4
a: 14
note: Out of syllabus (old scheme): the certainty-equivalent approach to risk in capital budgeting is Risk Analysis in Capital Budgeting (ICAI prints the question under that chapter heading in this RTP), which is not in the new-scheme Paper 6A syllabus or the January 2027 Study Material (its Investment Decisions chapter has no risk-analysis section); tagged with the nearest sub-topic, fm.capbud.npv (lead ruling). As printed: "Projects- X and Y", "(C.E)" in the question, and "₹ 5,56,605/-".
---
#### Question
A&R Ltd. is considering one of two mutually exclusive proposals, Projects- X and Y, which require cash outlays of ₹ 42,50,000 and ₹ 41,25,000 respectively. The certainty-equivalent (C.E) approach is used in incorporating risk in capital budgeting decisions. The current yield on government bonds is 5.5% and this is used as the risk-free rate. The expected net cash flows and their certainty equivalents are as follows:

| | Project X | | Project Y | |
|---|---:|---:|---:|---:|
| **Year-end** | **Cash Flow (₹)** | **C.E.** | **Cash Flow (₹)** | **C.E.** |
| 1 | 16,50,000 | 0.8 | 16,50,000 | 0.9 |
| 2 | 15,00,000 | 0.7 | 16,50,000 | 0.8 |
| 3 | 15,00,000 | 0.5 | 15,00,000 | 0.7 |
| 4 | 20,00,000 | 0.4 | 10,00,000 | 0.8 |
| 5 | 21,00,000 | 0.6 | 8,00,000 | 0.9 |

The Present value (PV) factor @ 5.5% is as follows:

| Year | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|---:|
| PV factor | 1 | 0.947 | 0.898 | 0.851 | 0.807 | 0.765 |

Required:

DETERMINE the project that should be accepted?
#### Answer
**Calculation of Net Present Value (NPV) of Project X**

| Year end | Cash Flow (₹) (a) | C.E. (b) | Adjusted Cash flow (₹) (c) = (a) × (b) | Present value factor at 5.5% (d) | Total Present value (₹) (e) = (c) × (d) |
|---|---:|---:|---:|---:|---:|
| 1 | 16,50,000 | 0.8 | 13,20,000 | 0.947 | 12,50,040 |
| 2 | 15,00,000 | 0.7 | 10,50,000 | 0.898 | 9,42,900 |
| 3 | 15,00,000 | 0.5 | 7,50,000 | 0.851 | 6,38,250 |
| 4 | 20,00,000 | 0.4 | 8,00,000 | 0.807 | 6,45,600 |
| 5 | 21,00,000 | 0.6 | 12,60,000 | 0.765 | 9,63,900 |
| PV of total cash inflows | | | | | 44,40,690 |
| Less: Initial Investment | | | | | (42,50,000) |
| **Net Present Value** | | | | | **1,90,690** |

**Calculation of Net Present Value (NPV) of Project Y**

| Year end | Cash Flow (₹) (a) | C.E. (b) | Adjusted Cash flow (₹) (c) = (a) × (b) | Present value factor at 5.5% (d) | Total Present value (₹) (e) = (c) × (d) |
|---|---:|---:|---:|---:|---:|
| 1 | 16,50,000 | 0.9 | 14,85,000 | 0.947 | 14,06,295 |
| 2 | 16,50,000 | 0.8 | 13,20,000 | 0.898 | 11,85,360 |
| 3 | 15,00,000 | 0.7 | 10,50,000 | 0.851 | 8,93,550 |
| 4 | 10,00,000 | 0.8 | 8,00,000 | 0.807 | 6,45,600 |
| 5 | 8,00,000 | 0.9 | 7,20,000 | 0.765 | 5,50,800 |
| PV of total cash inflows | | | | | 46,81,605 |
| Less: Initial Investment | | | | | (41,25,000) |
| **Net Present Value** | | | | | **5,56,605** |

Project Y has NPV of ₹ 5,56,605/- which is higher than the NPV of Project X. Thus, A&R Ltd. should accept Project Y.
#### Approach
Convert each year's expected cash flow to its certainty equivalent (cash flow × C.E. coefficient), discount at the risk-free rate, and compare the two NPVs.

---
item: q8
qno: 8
type: descriptive
tags: fm.div.models
difficulty: easy
q: 5
a: 15
note: As printed: Gordon's working "0.15 – 0.70 × 0.2", "Ke = Cost of capital" in the Gordon key, and ICAI's Walter formula and working, set in bold equation type (written in plain KaTeX here).
---
#### Question
The following information is given for QB Ltd.

| | |
|---|---|
| Earnings per share | ₹ 120 |
| Dividend per share | ₹ 36 |
| Cost of capital | 15% |
| Internal Rate of Return on investment | 20% |

CALCULATE the market price per share using

(a) Gordon’s formula

(b) Walter’s formula
#### Answer
(a) As per **Gordon’s Model**, Price per share is computed using the formula:

$P_0 = \dfrac{E_1(1 - b)}{K_e - br}$

Where,

$P_0$ = Price per share

$E_1$ = Earnings per share

b = Retention ratio; (1 - b = Pay-out ratio)

$K_e$ = Cost of capital

r = IRR

br = Growth rate (g)

Applying the above formula, price per share

$P_0 = \dfrac{120(1 - 0.7)}{0.15 - 0.70 \times 0.2} = \dfrac{36}{0.01}$ = ₹ 3,600

**(b) As per Walter’s Model, Price per share is computed using the formula:**

Price (P) = $\dfrac{D + \dfrac{r}{Ke}(E - D)}{K_e}$

Where,

P = Market Price of the share.

E = Earnings per share.

D = Dividend per share.

$K_e$ = Cost of equity/ rate of capitalization/ discount rate.

r = Internal rate of return/ return on investment

Applying the above formula, price per share

P = $\dfrac{36 + \dfrac{0.20}{0.15}(120 - 36)}{0.15}$

Or, P = $\dfrac{36 + 112}{0.15}$ = ₹ 986.67
#### Approach
The retention ratio is one minus the payout (DPS over EPS), and Gordon's growth rate is retention × the return on investment; Walter's model needs only D, E, r and the cost of capital.

---
item: q9
qno: 9
type: descriptive
tags: fm.ratio.prepare, fm.wc.estimate
difficulty: hard
q: 5
a: 15-18
note: ICAI's Statement Showing Working Capital Requirement runs from p.17 to p.18 and is joined into one table. As printed: "Reserves and Share Capital = Net worth" and "Net worth = 1 + 1.5 = 2.5" in working note (ix), "₹14,62,500", "₹30,00,000" and "₹23,62,500" without a space, and the balance sheet's column "Figures as at 31-03-2019 (₹)", which holds dashes only.
---
#### Question
The following figures and ratios are related to a company:

| | |
|---|---:|
| (i) Sales for the year (all credit) | ₹ 90,00,000 |
| (ii) Gross Profit ratio | 35 percent |
| (iii) Fixed assets turnover (based on cost of goods sold) | 1.5 |
| (iv) Stock turnover (based on cost of goods sold) | 6 |
| (v) Liquid ratio | 1.5:1 |
| (vi) Current ratio | 2.5:1 |
| (vii) Receivables (Debtors) collection period | 1 month |
| (viii) Reserves and surplus to Share capital | 1:1.5 |
| (ix) Capital gearing ratio | 0.7875 |
| (x) Fixed assets to net worth | 1.3 : 1 |

You are required to PREPARE:

(a) Balance Sheet of the company on the basis of above details.

(b) The statement showing working capital requirement, if the company wants to make a provision for contingencies @ 15 percent of net working capital.
#### Answer
**Working Notes:**

(i) Cost of Goods Sold = Sales – Gross Profit (35% of Sales)

= ₹ 90,00,000 – ₹ 31,50,000

= ₹ 58,50,000

(ii) Closing Stock = Cost of Goods Sold / Stock Turnover

= ₹ 58,50,000/6 = ₹ 9,75,000

(iii) Fixed Assets = Cost of Goods Sold / Fixed Assets Turnover

= ₹ 58,50,000/1.5

= ₹ 39,00,000

(iv) Current Assets:

Current Ratio = 2.5 and Liquid Ratio = 1.5

Inventories (Stock) = 2.5 – 1.5 = 1

Current Assets = Amount of Inventories (Stock) × 2.5/1

= ₹ 9,75,000 × 2.5/1 = ₹ 24,37,500

(v) Liquid Assets (Receivables and Cash)

= Current Assets – Inventories (Stock)

= ₹ 24,37,500 – ₹ 9,75,000

= ₹14,62,500

(vi) Receivables (Debtors) = Sales × Debtors Collection period /12

= ₹ 90,00,000 × 1/12

= ₹ 7,50,000

(vii) Cash = Liquid Assets – Receivables (Debtors)

= ₹14,62,500 – ₹ 7,50,000 = ₹ 7,12,500

(viii) Net worth = Fixed Assets /1.3

= ₹ 39,00,000/1.3 = ₹ 30,00,000

(ix) Reserves and Surplus

Reserves and Share Capital = Net worth

Net worth = 1 + 1.5 = 2.5

Reserves and Surplus = ₹ 30,00,000 × 1/2.5

= ₹ 12,00,000

(x) Share Capital = Net worth – Reserves and Surplus

= ₹ 30,00,000 – ₹ 12,00,000

= ₹ 18,00,000

(xi) Current Liabilities = Current Assets/ Current Ratio

= ₹ 24,37,500/2.5 = ₹ 9,75,000

(xii) Long-term Debts

Capital Gearing Ratio = Long-term Debts / Equity Shareholders’ Fund

Long-term Debts = ₹30,00,000 × 0.7875 = ₹23,62,500

**(a) Balance Sheet of the Company**

| Particulars | Figures as at 31-03-2020 (₹) | Figures as at 31-03-2019 (₹) |
|---|---:|---:|
| **I. EQUITY AND LIABILITIES** | | |
| **Shareholders’ funds** | | |
| (a) Share capital | 18,00,000 | - |
| (b) Reserves and surplus | 12,00,000 | - |
| **Non-current liabilities** | | |
| (a) Long-term borrowings | 23,62,500 | - |
| **Current liabilities** | 9,75,000 | - |
| **TOTAL** | **63,37,500** | **-** |
| **II. ASSETS** | | |
| **Non-current assets** | | |
| Fixed assets | 39,00,000 | - |
| **Current assets** | | |
| Inventories | 9,75,000 | - |
| Trade receivables | 7,50,000 | - |
| Cash and cash equivalents | 7,12,500 | - |
| **TOTAL** | **63,37,500** | **-** |

**(b) Statement Showing Working Capital Requirement**

| Particulars | (₹) | (₹) |
|---|---:|---:|
| A. Current Assets | | |
| (i) Inventories (Stocks) | | 9,75,000 |
| (ii) Receivables (Debtors) | | 7,50,000 |
| (iii) Cash in hand & at bank | | 7,12,500 |
| Total Current Assets | | 24,37,500 |
| B. Current Liabilities: | | |
| Total Current Liabilities | | 9,75,000 |
| Net Working Capital (A – B) | | 14,62,500 |
| Add: Provision for contingencies (15% of Net Working Capital) | | 2,19,375 |
| Working capital requirement | | 16,81,875 |
#### Approach
Work outward from sales: the gross profit ratio gives cost of goods sold, and the two turnover ratios then give stock and fixed assets. The current and liquid ratios fix current assets and liabilities, and the net-worth ratios split share capital, reserves and long-term debt.

---
item: q10a
qno: 10
part: (a)
type: descriptive
tags: fm.intro.agency
difficulty: easy
q: 5
a: 18
note: As printed: "maximise their individual goal", "the chances that managers may place personal goals", "Agency Costs are of four types (i) monitoring (ii) bonding (iii) opportunity (iv) structuring" without a closing full stop, "manager’s interests", "Employee is also designed to address the issue" and "Effecting monitoring can be done".
---
#### Question
EXPLAIN agency problem and agency cost. How to address the issues of the same.
#### Answer
Though in a sole proprietorship firm, partnership etc., owners participate in management but in corporates, owners are not active in management so, there is a separation between owner/ shareholders and managers. In theory managers should act in the best interest of shareholders, however, in reality, managers may try to maximise their individual goal like salary, perks etc., so there is a **principal agent relationship between managers and owners, which is known as Agency Problem**. In a nutshell, Agency Problem is the chances that managers may place personal goals ahead of the goal of owners. Agency Problem leads to Agency Cost. Agency cost is the additional cost borne by the shareholders to monitor the manager and control their behaviour so as to maximise shareholders wealth. Generally, Agency Costs are of four types (i) monitoring (ii) bonding (iii) opportunity (iv) structuring

**Addressing the agency problem**

The agency problem arises if manager’s interests are not aligned to the interests of the debt lender and equity investors. The agency problem of debt lender would be addressed by imposing negative covenants i.e. the managers cannot borrow beyond a point. This is one of the most important concepts of modern day finance and the application of this would be applied in the Credit Risk Management of Bank, Fund Raising, Valuing distressed companies.

Agency problem between the managers and shareholders can be addressed if the interests of the managers are aligned to the interests of the shareholders. It is easier said than done.

However, following efforts have been made to address these issues:

- Managerial compensation is linked to profit of the company to some extent and also with the long term objectives of the company.
- Employee is also designed to address the issue with the underlying assumption that maximisation of the stock price is the objective of the investors.
- Effecting monitoring can be done.

---
item: q10b
qno: 10
part: (b)
type: descriptive
tags: fm.sources.other
difficulty: easy
q: 5
a: 19
note: As printed: the question's "COMPARE between Financial Lease and Operating Lease" beside the answer's head "Finance Lease", "Risk incident to ownership belong wholly to the lessor", "to other willing lessor", and "cancelable" beside "non-cancellable".
---
#### Question
COMPARE between Financial Lease and Operating Lease.
#### Answer
| | Finance Lease | Operating Lease |
|---|---|---|
| 1. | The risk and reward incident to ownership are passed on to the lessee. The lessor only remains the legal owner of the asset. | The lessee is only provided the use of the asset for a certain time. Risk incident to ownership belong wholly to the lessor. |
| 2. | The lessee bears the risk of obsolescence. | The lessor bears the risk of obsolescence. |
| 3. | The lessor is interested in his rentals and not in the asset. He must get his principal back along with interest. Therefore, the lease is non-cancellable by either party. | As the lessor does not have difficulty in leasing the same asset to other willing lessor, the lease is kept cancelable by the lessor. |
| 4. | The lessor enters into the transaction only as financier. He does not bear the cost of repairs, maintenance or operations. | Usually, the lessor bears cost of repairs, maintenance or operations. |
| 5. | The lease is usually full payout, that is, the single lease repays the cost of the asset together with the interest. | The lease is usually non-payout, since the lessor expects to lease the same asset over and over again to several users. |
