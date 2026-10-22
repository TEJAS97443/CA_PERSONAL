<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: o-p8-mtp-dec2021-s2
paper: p8
kind: mtp
attempt: dec2021
series: s2
qfile: old/p8/mtp-dec2021-s2-q.pdf
afile: old/p8/mtp-dec2021-s2-a.pdf
choice: q1; any 4 of q2-q6
q: 1
status: checked
by: tx-44
date: 2026-10-20
accept: 2021
note: Old-scheme Paper 8 (Financial Management and Economics for Finance) Mock Test Paper 2 of ICAI's Test Series November 2021 (for the December 2021 attempt): only Paper 8A Financial Management is transcribed (questions pp.1-5, answers "SUGGESTED ANSWERS/ HINTS" pp.1-10); Paper 8B Economics for Finance (questions pp.6-7, answers from p.11) is not. Source: ICAI's own copies are gone (404, no usable Wayback capture); both files are the castudynotes.com mirror (see the manifest), whose watermark and "Downloaded From www.castudynotes.com" banners are not ICAI's and are not transcribed. Instructions: ICAI's 8A box on question p.1, which gives the choice rule; 8A carries 60 marks (Q1 20 + four of Q2-Q6 at 10 each). ICAI prints no separate time for 8A (3 hours for 8A and 8B together), so minutes: is left out. Item model: Q1 (a)-(d) are separate 5-mark questions ("[4 × 5 Marks = 20 Marks]" after (d)); Q2, Q3 and Q4 are single 10-mark questions with their requirements inside the question; Q5 (a) 8 and (b) 2, Q6 (a) 4, (b) 4 and (c) 2 carry their own marks; Q6(c) has an OR alternative (q6c-or, alt: q6c), and ICAI prints the pair's [2 Marks] once, after the alternative. The lead-in "Answer the following:" of Q1 is not item text. Tags: every item is tagged to the current (new-scheme) Paper 6A sub-topics; Q5(a) (expected NPV under probabilities, worst and best case) is out of syllabus (oos), see its note. Formulas (cost of equity, IRR interpolation, the indifference-point equations, Walter's model) are written in KaTeX from the rendered pages with ICAI's symbols and numbers; stacked fractions inside table cells are written inline with a slash. ICAI's oddities are kept and noted on their items. Accepted numbers (each read on the page): 2 and 8 are the titles "MOCK TEST PAPER - 2" / "MOCK TEST PAPER 2" and "PAPER – 8: FINANCIAL MANAGEMENT & ECONOMICS FOR FINANCE" (p.1 of both files), and the second 8 the answers' "8A : FINANCIAL MANAGEMENT" heading (a p.1); 2021 is "Test Series: November, 2021" (p.1 of both files).
---
#### Instructions
**PAPER 8A: FINANCIAL MANAGEMENT**

Answers are to be given only in English except in the case of the candidates who have opted for Hindi medium. If a candidate has not opted for Hindi medium his/ her answers in Hindi will not be valued.

Question No. **1** is compulsory.

Attempt any **four** questions from the remaining **five** questions.

Working notes should form part of the answer.

**Time Allowed – 3 Hours (Total time for 8A and 8B)** **Maximum Marks – 60**

---
item: q1a
qno: 1
part: (a)
marks: 5
type: descriptive
tags: fm.coc.equity, fm.coc.debt
difficulty: medium
q: 1
a: 1
note: ICAI's formula reads "Expected dividend per share (D1)" over "Market price per share (P0)" plus "Growth rate (g)" (run together in the PDF's text); written in KaTeX with ICAI's subscripts.
---
#### Question
XYZ Company’s equity share is quoted in the market at ₹ 25 per share currently. The company pays a dividend of ₹ 5 per share and the investor’s market expects a growth rate of 5% per year.

You are required to:

(i) CALCULATE the company’s cost of equity capital.

(ii) If the company issues 12% debentures of face value of ₹ 100 each and realises ₹ 95 per debenture while the debentures are redeemable after 10 years at a premium of 12%, CALCULATE cost of debenture using YTM?

Assume tax rate to be 30%.
#### Answer
**(i) Cost of Equity Capital ($K_e$):**

$K_e = \dfrac{\text{Expected dividend per share} (D_1)}{\text{Market price per share} (P_0)} + \text{Growth rate} (g)$

$= \dfrac{\text{₹ 5} \times 1.05}{\text{₹ 25}} + 0.05$ = 26%

**(ii) Cost of Debenture ($K_d$):**

Using Present Value method (or YTM)

**Identification of relevant cash flows**

| Year | Cash flows |
|---|---|
| 0 | Current market price ($P_0$) = ₹ 95 |
| 1 to 10 | Interest net of tax [I(1-t)] = 12% of ₹ 100 (1 – 0.30) = ₹ 8.40 |
| 10 | Redemption value (RV) = ₹ 100 (1.12) = ₹ 112 |

**Calculation of Net Present Values (NPV) at two discount rates**

| Year | Cash flows | Discount factor @ 9% (L) | Present Value | Discount factor @ 10% (H) | Present Value |
|---|---:|---:|---:|---:|---:|
| 0 | (95) | 1.0000 | (95.00) | 1.0000 | (95.00) |
| 1 to 10 | 8.40 | 6.4176 | 53.91 | 6.1445 | 51.61 |
| 10 | 112 | 0.4224 | 47.31 | 0.3855 | 43.18 |
| NPV | | | +6.22 | | -0.21 |

**Calculation of IRR**

IRR = $L + \dfrac{NPV_L}{NPV_L - NPV_H}(H - L)$

$= 9\% + \dfrac{6.22}{6.22 - (- 0.21)}(10\% - 9\%) = 9\% + \dfrac{6.22}{6.43} = 9.97\%$

Therefore, $K_d$ = 9.97%
#### Approach
Cost of equity by the dividend growth model with next year's dividend; for the debenture find the rate that equates the net-of-tax interest and the redemption value with the price realised, by interpolating between two trial rates.

---
item: q1b
qno: 1
part: (b)
marks: 5
type: descriptive
tags: fm.cs.ebiteps
difficulty: easy
q: 1
a: 1-2
note: ICAI's answer heads the equation "The difference point between the two alternatives"; kept as printed.
---
#### Question
ABC Limited is setting up a project with a capital outlay of ₹ 90,00,000. It has two alternatives in financing the project cost.

Alternative-I: 100% equity finance by issuing equity shares of ₹ 10 each

Alternative-II: Debt-equity ratio 2:1 (issuing equity shares of ₹ 10 each)

The rate of interest payable on the debts is 18% p.a. The corporate tax rate is 30%. CALCULATE the indifference point between the two alternative methods of financing.
#### Answer
**Calculation of Indifference point between the two alternatives of financing.**

**Alternative-I** By issue of 9,00,000 equity shares of ₹10 each amounting to ₹ 90 lakhs. No financial charges are involved.

**Alternative-II** By raising the funds in the following way:

Debt = ₹ 60 lakhs

Equity = ₹ 30 lakhs (3,00,000 equity shares of ₹ 10 each)

Interest payable on debt = 60,00,000× $\dfrac{18}{100}$= ₹ 10,80,000

The difference point between the two alternatives is calculated by:

$\dfrac{(EBIT - I_1)(1 - T)}{E_1} = \dfrac{(EBIT - I_2)(1 - T)}{E_2}$

$\dfrac{(EBIT - 0)(1 - 0.30)}{9{,}00{,}000} = \dfrac{(EBIT - 10{,}80{,}000)(1 - 0.30)}{3{,}00{,}000}$

$\dfrac{(EBIT)(0.70)}{9{,}00{,}000} = \dfrac{(EBIT - 10{,}80{,}000)(0.70)}{3{,}00{,}000}$

$\dfrac{EBIT(0.70)}{3} = \dfrac{0.70(EBIT - 10{,}80{,}000)}{1}$

EBIT = 3EBIT−32,40,000

−2 EBIT = −32,40,000

EBIT = $\dfrac{32{,}40{,}000}{2}$

EBIT = ₹ 16,20,000

Therefore, at EBIT of ₹ 16,20,000, earnings per share for the two alternatives is equal.
#### Approach
Split the outlay into debt and equity for the 2:1 plan, then equate the EPS of the two plans and solve for EBIT.

---
item: q1c
qno: 1
part: (c)
marks: 5
type: descriptive
tags: fm.lev.leverage
difficulty: easy
q: 1-2
a: 2-3
---
#### Question
The capital structure of PS Ltd. for the year ended 31st March, 2021 consisted as follows:

| Particulars | Amount in ₹ |
|---|---:|
| Equity share capital (face value ₹ 10 each) | 10,000 |
| 10% debentures (₹ 100 each) | 1,00,000 |

During the year 2020-21, sales decreased to 10,000 units as compared to 12,000 units in the previous year. However, the selling price stood at ₹ 12 per unit and variable cost at ₹ 8 per unit for both the years. The fixed expenses were at ₹ 20,000 p.a. and the income tax rate is 30%.

You are required to CALCULATE the following:

(i) The degree of financial leverage at 12,000 units and 10,000 units.

(ii) The degree of operating leverage at 12,000 units and 10,000 units.

(iii) The percentage change in EPS due to change in units sold.
#### Answer
| Sales in units | 12,000 | 10,000 |
|---|---:|---:|
| | **(₹)** | **(₹)** |
| Sales Value | 1,44,000 | 1,20,000 |
| Variable Cost | (96,000) | (80,000) |
| Contribution | 48,000 | 40,000 |
| Fixed expenses | (20,000) | (20,000) |
| EBIT | 28,000 | 20,000 |
| Debenture Interest | (10,000) | (10,000) |
| EBT | 18,000 | 10,000 |
| Tax @ 30% | (5,400) | (3,000) |
| Profit after tax (PAT) | 12,600 | 7,000 |
| (i) Financial Leverage= EBIT/EBT | = ₹ 28,000/₹ 18,000 = 1.56 | = ₹ 20,000/₹ 10,000 = 2 |
| (ii) Operating leverage = Contribution/EBIT | = ₹ 48,000/₹ 28,000 = 1.71 | = ₹ 40,000/₹ 20,000 = 2 |
| (iii) Earnings per share (EPS) | = ₹ 12,600/₹ 1,000 = ₹ 12.6 | = ₹ 7,000/₹ 1,000 = ₹ 7 |
| Decrease in EPS | = ₹ 12.6 – ₹ 7 = ₹ 5.6 | |
| % decrease in EPS | = 5.6/12.6 X 100 = 44.44% | |
#### Approach
Build the income statement down to PAT at both volumes; the leverages are ratios read off it, and EPS needs the number of shares from the share capital.

---
item: q1d
qno: 1
part: (d)
marks: 5
type: descriptive
tags: fm.div.models
difficulty: medium
q: 2
a: 3
note: ICAI's answer writes "Ke is 8 (i.e., 1/12.5)" and, in (iii), "the Ke ... would be 12.5" (meaning 8% and 12.5%), "Ke" once without a subscript and "ke> r"; kept as printed.
---
#### Question
The following information is supplied to you:

| Particulars | ₹ |
|---|---:|
| Total Earnings | 5,00,000 |
| Equity shares (of ₹ 100 each) | 50,00,000 |
| Dividend paid | 3,75,000 |
| Price/ Earnings ratio | 12.5 |

Applying Walter’s Model:

(i) ANALYSE whether the company is following an optimal dividend policy.

(ii) COMPUTE P/E ratio at which the dividend policy will have no effect on the value of the share.

(iii) Will your decision change, if the P/E ratio is 8 instead of 12.5? ANALYSE.
#### Answer
**(i)** The EPS of the firm is ₹ 10 (i.e. ₹ 5,00,000/ 50,000). r = 5,00,000/ 50,00,000 = 10%. The P/E Ratio is given at 12.5 and the cost of capital, $K_e$, may be taken at the inverse of P/E ratio. Therefore, $K_e$ is 8 (i.e., 1/12.5). The firm is distributing total dividends of ₹ 3,75,000 among 50,000 shares, giving a dividend per share of ₹ 7.50. The value of the share as per Walter’s model may be found as follows:

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e} = \dfrac{7.5 + \dfrac{0.1}{0.08}(10 - 7.5)}{0.08}$ = ₹ 132.81

The firm has a dividend payout of 75% (i.e., ₹ 3,75,000) out of total earnings of ₹ 5,00,000. Since, the rate of return of the firm, r, is 10% and it is more than the $K_e$ of 8%, therefore, by distributing 75% of earnings, the firm is not following an optimal dividend policy. The optimal dividend policy for the firm would be to pay zero dividend and in such a situation, the market price would be,

$\dfrac{0 + \dfrac{0.1}{0.08}(10 - 0)}{0.08}$ = ₹ 156.25

So, theoretically, the market price of the share can be increased by adopting a zero payout.

**(ii)** The P/E ratio at which the dividend policy will have no effect on the value of the share is such at which the $K_e$ would be equal to the rate of return, r, of the firm. The $K_e$ would be 10% (= r) at the P/E ratio of 10. Therefore, at the P/E ratio of 10, the dividend policy would have no effect on the value of the share.

**(iii)** If the P/E is 8 instead of 12.5, then the Ke which is the inverse of P/E ratio, would be 12.5 and in such a situation $k_e$> r and the market price, as per Walter’s model would be:

P = $\dfrac{D + \dfrac{r}{K_e}(E - D)}{K_e} = \dfrac{7.5 + \dfrac{0.1}{0.125}(10 - 7.5)}{0.125}$ = ₹ 76
#### Approach
Find EPS, DPS and r from the data and take Ke as the inverse of the P/E ratio; under Walter, compare r with Ke to decide whether retention or payout raises the price.

---
item: q2
qno: 2
marks: 10
type: descriptive
tags: fm.ratio.liquidity, fm.ratio.activity, fm.ratio.profit
difficulty: medium
q: 2-3
a: 3-5
note: ICAI's question writes "Jensen and spencer pharmaceutical", "apprise the loan proposal" and "(In ₹ ‘000)"; its answer writes "Return on Total Asset(ROTA)" and "is in deterioration position"; all kept as printed. The ratio table's stacked fractions are written inline with a slash, with ICAI's numbers (the receivable and inventory denominators as ICAI prints them, e.g. "(600+600)/2").
---
#### Question
Jensen and spencer pharmaceutical is in the business of manufacturing pharmaceutical drugs including the newly invented Covid vaccine. Due to increase in demand of Covid vaccines, the production had increased at all time high level and the company urgently needs a loan to meet the cash and investment requirements. It had already submitted a detailed loan proposal and project report to Expo-Impo bank, along with the financial statements of previous three years as follows:

**Statement of Profit and Loss** **(In ₹ ‘000)**

| | 2018–19 | 2019–20 | 2020–21 |
|---|---:|---:|---:|
| Sales | | | |
| Cash | 400 | 960 | 1,600 |
| Credit | 3,600 | 8,640 | 14,400 |
| Total sales | 4,000 | 9,600 | 16,000 |
| Cost of goods sold | 2,480 | 5,664 | 9,600 |
| Gross profit | 1,520 | 3,936 | 6,400 |
| Operating expenses: | | | |
| General, administration, and selling expenses | 160 | 900 | 2,000 |
| Depreciation | 200 | 800 | 1,320 |
| Interest expenses (on borrowings) | 120 | 316 | 680 |
| Profit before tax (PBT) | 1,040 | 1,920 | 2,400 |
| Tax @ 30% | 312 | 576 | 720 |
| Profit after tax (PAT) | 728 | 1,344 | 1,680 |

**BALANCE SHEET** **(In ₹ ‘000)**

| | 2018–19 | 2019–20 | 2020–21 |
|---|---:|---:|---:|
| **Assets** | | | |
| Non-Current Assets | | | |
| Fixed assets (net of depreciation) | 3,800 | 5,000 | 9,400 |
| Current Assets | | | |
| Cash and cash equivalents | 80 | 200 | 212 |
| Accounts receivable | 600 | 3,000 | 4,200 |
| Inventories | 640 | 3,000 | 4,500 |
| **Total** | **5,120** | **11,200** | **18,312** |
| **Equity & Liabilities** | | | |
| Equity share capital (shares of ₹10 each) | 2,400 | 3,200 | 4,000 |
| Other Equity | 728 | 2,072 | 3,752 |
| Non-Current borrowings | 1,472 | 2,472 | 5,000 |
| Current liabilities | 520 | 3,456 | 5,560 |
| **Total** | **5,120** | **11,200** | **18,312** |

**INDUSTRY AVERAGE OF KEY RATIOS**

| Ratio | Sector Average |
|---|---:|
| Current ratio | 2.30:1 |
| Acid test ratio (quick ratio) | 1.20:1 |
| Receivable turnover ratio | 7 times |
| Inventory turnover ratio | 4.85 times |
| Long-term debt to total debt | 24% |
| Debt-to-equity ratio | 35% |
| Net profit ratio | 18% |
| Return on total assets | 10% |
| Interest coverage ratio (times interest earned) | 10 |

As a loan officer of Expo-Impo Bank, you are REQUIRED to apprise the loan proposal on the basis of comparison with industry average of key ratios considering closing balance for accounts receivable of ₹ 6,00,000 and inventories of ₹ 6,40,000 respectively as on 31st March, 2018.
#### Answer
**(In ₹ ‘000)**

| Ratio | Formula | 2018–19 | 2019–20 | 2020–21 | Industry Average |
|---|---|---:|---:|---:|---:|
| Current ratio | Current Assets/Current Liabilities | 1,320/520 = 2.54 | 6,200/3,456 = 1.80 | 8,912/5,560 = 1.60 | 2.30:1 |
| Acid test ratio (quick ratio) | Quick Assets/Current Liabilities | 680/520 = 1.31 | 3,200/3,456 = 0.93 | 4,412/5,560 = 0.79 | 1.20:1 |
| Receivable turnover ratio | Credit Sales/Average Accounts Receivable | 3,600/(600+600)/2 = 6 | 8,640/(600+ 3,000)/2 = 4.80 | 14,400/(3,000+ 4,200)/2 = 4 | 7 times |
| Inventory turnover ratio | COGS/Average Inventory | 2,480/(640+640)/2 = 3.88 | 5,664/(640+ 3,000)/2 = 3.11 | 9,600/(3,000+ 4,500)/2 = 2.56 | 4.85 times |
| Long-term debt to total debt | Long term Debt/Total Debt × 100 | 1,472/1,992 × 100 = 73.90% | 2,472/5,928 × 100 = 41.70% | 5,000/10,560 × 100 = 47.35% | 24% |
| Debt-to-equity ratio | Long term Debt/Shareholders' Equity × 100 | 1,472/3,128 × 100 = 47.06% | 2,472/5,272 × 100 = 46.89% | 5,000/7,752 × 100 = 64.50% | 35% |
| Net profit ratio | Net Profit/Sales ×100 | 728/4,000 × 100 = 18.2% | 1,344/9,600 × 100 = 14% | 1,680/16,000 × 100 = 10.5% | 18% |
| Return on total assets | Net Profit after taxes/Total assets ×100 | 728/5,120 × 100 = 14.22% | 1,344/11,200 × 100 = 12% | 1,680/18,312 × 100 = 9.17% | 10% |
| Interest coverage ratio (times interest earned) | EBIT/Interest | 1,160/120 = 9.67 | 2,236/316 = 7.08 | 3,080/680 = 4.53 | 10 |

**Conclusion:**

In the last two years, the current ratio and quick ratio are less than the ideal ratio (2:1 and 1:1 respectively) indicating that the company is not having enough resources to meet its current obligations. Receivables are growing slower. Inventory turnover is slowing down as well, indicating a relative build-up in inventories or increased investment in stock. High Long-term debt to total debt ratio and Debt to equity ratio compared to that of industry average indicates high dependency on long term debt by the company. The net profit ratio is declining substantially and is much lower than the industry norm. Additionally, though the Return on Total Asset(ROTA) is near to industry average, it is declining as well. The interest coverage ratio measures how many times a company can cover its current interest payment with its available earnings. A high interest coverage ratio means that an enterprise can easily meet its interest obligations, however, it is declining in the case of Jensen & Spencer and is also below the industry average indicating excessive use of debt or inefficient operations.

On overall comparison of the industry average of key ratios than that of Jensen & Spencer, the company is in deterioration position. The company’s profitability has declined steadily over the period. However, before jumping to the conclusion relying only on the key ratios, it is pertinent to keep in mind the industry, the company dealing in with i.e. manufacturing of pharmaceutical drugs. The pharmaceutical industry is one of the major contributors to the economy and is expected to grow further. After the covid situation, people are more cautious towards their health and are going to spend relatively more on health medicines. Thus, while analysing the loan proposal, both the factors, financial and non-financial, needs to be kept in mind.
#### Approach
Compute each of the nine industry ratios for all three years (the 31 March 2018 balances give the first year's averages), set them beside the sector average, and read the trend before concluding.

---
item: q3
qno: 3
marks: 10
type: descriptive
tags: fm.capbud.cashflows
difficulty: easy
q: 3-4
a: 5
note: Ours: an annual cost comparison of three ways of holding the budget meetings; the January 2027 Study Material has no such question, but it needs nothing outside the syllabus (the relevant annual costs of alternatives, Investment Decisions), so it is tagged there and not flagged. ICAI's question writes "averge cost"; kept as printed.
---
#### Question
Superb Ltd. constructs customized parts for satellites to be launched by USA and Canada. The parts are constructed in eight locations (including the central headquarter) around the world. The Finance Director, Ms. Kuthrapali, chooses to implement video conferencing to speed up the budget process and save travel costs. She finds that, in earlier years, the company sent two officers from each location to the central headquarter to discuss the budget twice a year. The average travel cost per person, including air fare, hotels and meals, is ₹ 27,000 per trip. The cost of using video conferencing is ₹ 8,25,000 to set up a system at each location plus ₹ 300 per hour average cost of telephone time to transmit signals. A total 48 hours of transmission time will be needed to complete the budget each year. The company depreciates this type of equipment over five years by using straight line method. An alternative approach is to travel to local rented video conferencing facilities, which can be rented for ₹ 1,500 per hour plus ₹ 400 per hour averge cost for telephone charges. You are Senior Officer of Finance Department. You have been asked by Ms. Kuthrapali to EVALUATE the proposal and SUGGEST if it would be worthwhile for the company to implement video conferencing.
#### Answer
**Option I : Cost of travel, in case Video Conferencing facility is not provided**

Total Trip = No. of Locations × No. of Persons × No. of Trips per Person = 7×2×2 = 28 Trips

Total Travel Cost (including air fare, hotel accommodation and meals) (28 trips × ₹ 27,000 per trip) **= ₹ 7,56,000**

**Option II : Video Conferencing Facility is provided by Installation of Own Equipment at Different Locations**

Cost of Equipment at each location (₹ 8,25,000 × 8 locations) = ₹ 66,00,000

Economic life of Machines (5 years). Annual depreciation (66,00,000/5) = ₹ 13,20,000

Annual transmission cost (48 hrs. transmission × 8 locations × ₹ 300 per hour) = ₹ 1,15,200

Annual cost of operation (13,20,000 + 1,15,200) **= ₹ 14,35,200**

**Option III : Engaging Video Conferencing Facility on Rental Basis**

Rental cost (48 hrs. × 8 location × ₹ 1,500 per hr) = ₹ 5,76,000

Telephone cost (48 hrs.× 8 locations × ₹ 400 per hr.) = ₹ 1,53,600

Total rental cost of equipment (5,76,000 + 1,53,600) **= ₹ 7,29,600**

**Analysis:** The annual cash outflow is minimum, if video conferencing facility is engaged on rental basis. Therefore, Option III is suggested.
#### Approach
Put the three options on the same annual basis: travel (who travels from where), own equipment (yearly depreciation plus transmission) and rented facilities.

---
item: q4
qno: 4
marks: 10
type: descriptive
tags: fm.wc.estimate
difficulty: hard
q: 4
a: 5-8
note: ICAI's question writes "the Board of Director of ABC Ltd." and "direct wages 10% overheads 20%"; its working capital table prints the half months as "1/2", "½", "6½" and "5 ½" and its balance sheet has an empty row before the totals (left out); kept as printed otherwise.
---
#### Question
On 01st April, 2020, the Board of Director of ABC Ltd. wish to know the amount of working capital that will be required to meet the programme they have planned for the year. From the following information, PREPARE a working capital requirement forecast and a forecast profit and loss account and balance sheet:

| | |
|---|---|
| Issued share capital | ₹ 6,00,000 |
| 10% Debentures | ₹ 1,00,000 |
| Fixed Assets | ₹ 4,50,000 |

Production during the previous year was 1,20,000 units; it is planned that this level of activity should be maintained during the present year.

The expected ratios of cost to selling price are: raw materials 60%, direct wages 10% overheads 20%

Raw materials are expected to remain in store for an average of two months before issue to production. Each unit of production is expected to be in process for one month. The time lag in wage payment is one month.

Finished goods will stay in the warehouse awaiting dispatch to customers for approximately three months.

Credit allowed by creditors is two months from the date of delivery of raw materials. Credit given to debtors is three months from the date of dispatch.

Selling price is ₹ 5 per unit.

There is a regular production and sales cycle and wages and overheads accrue evenly.
#### Answer
**Forecast Profit and Loss Account for the period 01.04.2020 to 31.03.2021**

| Particulars | ₹ | Particulars | ₹ |
|---|---:|---|---:|
| Materials consumed<br>1,20,000 @ ₹ 3 | 3,60,000 | By Sales 1,20,000 @ ₹ 5 | 6,00,000 |
| Direct wages :<br>1,20,000 @ ₹ 0.50 | 60,000 | | |
| Overheads :<br>1,20,000 @ ₹ 1 | 1,20,000 | | |
| Gross profit c/d | 60,000 | | |
| | **6,00,000** | | **6,00,000** |
| Debenture interest<br>(10% of 1,00,000) | 10,000 | By gross profit b/d | 60,000 |
| Net profit c/d | 50,000 | | |
| | **60,000** | | **60,000** |

**Working Capital Requirement Forecast for the year 01.04.2020 to 31.03.2021**

| Particulars | Period (Months) | Total (₹) | Current Assets (₹) | | | | Current Liabilities (₹) |
|---|---:|---:|---:|---:|---:|---:|---:|
| | | | Raw materials | Work-in-progress | Finished goods | Debtors | Creditors |
| **1. Material** | | | | | | | |
| In store | 2 | | 60,000 | | | | |
| In work-in-progress | 1 | | | 30,000 | | | |
| In finished goods | 3 | | | | 90,000 | | |
| Credit to debtors | 3 | | | | | 90,000 | |
| | 9 | | | | | | |
| Less : Credit from creditors | 2 | | | | | | 60,000 |
| **Net block period** | 7 | **2,10,000** | | | | | |
| **2. Wages:** | | | | | | | |
| In work-in-progress | 1/2 | | | 2,500 | | | |
| In finished goods | 3 | | | | 15,000 | | |
| Credit to debtors | 3 | | | | | 15,000 | |
| | 6½ | | | | | | |
| Less : Time lag in payment | 1 | | | | | | 5,000 |
| **Net block period** | **5 ½** | **27,500** | | | | | |
| **3. Overheads:** | | | | | | | |
| In work-in-progress | ½ | | | 5,000 | | | |
| In finished goods | 3 | | | | 30,000 | | |
| Credit to debtors | 3 | | | | | 30,000 | |
| **Net block period** | **6½** | **65,000** | | | | | |
| **4. Profit** | | | | | | | |
| Credit to debtors | 3 | | | | | 15,000 | |
| **Net block period** | **3** | **15,000** | | | | | |
| **Total (₹)** | | **3,17,500** | **60,000** | **37,500** | **1,35,000** | **1,50,000** | **65,000** |

**Forecast Balance Sheet as on 31.03.2021**

| | (₹) | | | (₹) |
|---|---:|---|---:|---:|
| Issued share capital | 6,00,000 | Fixed Assets | | 4,50,000 |
| Profit and Loss A/c | 50,000 | Current Assets: | | |
| 10% Debentures | 1,00,000 | Stock: | | |
| Sundry creditors | 65,000 | Raw materials | 60,000 | |
| Bank overdraft- | | Work-in-progress | 37,500 | |
| Balancing figure | 17,500 | Finished goods | 1,35,000 | 2,32,500 |
| | | Debtors | | 1,50,000 |
| | **8,32,500** | | | **8,32,500** |

The Total amount of working capital, thus, stands as follows:

| | ₹ |
|---|---:|
| Requirement as per working capital | 3,17,500 |
| Less: Bank overdraft as per balance sheet | 17,500 |
| Net requirement | 3,00,000 |

Notes:

1\. Average monthly production: 1,20,000 ÷ 12 = 10,000 units

2\. Average cost per month:

| | |
|---|---|
| Raw Material | 10,000 × (₹ 5 × 0.6) = ₹ 30,000 |
| Direct wages | 10,000 × (₹ 5 × 0.1) = ₹ 5,000 |
| Overheads | 10,000 × (₹ 5 × 0.2) = ₹ 10,000 |

3\. Average profit per month: 10,000 × (₹ 5 × 0.1) = ₹ 5,000

4\. Wages and overheads accrue evenly over the period and, hence, are assumed to be completely introduced for half the processing time.
#### Approach
Cost one month's output by element from the cost-to-price ratios, then multiply each element by the months it is locked up at each stage (half the processing month for wages and overheads); creditors and the wage lag reduce the need.

---
item: q5a
qno: 5
part: (a)
marks: 8
type: descriptive
tags: fm.capbud
oos: yes
difficulty: medium
q: 4
a: 8
note: Old scheme, out of syllabus (ours): the probable (expected) NPV from probability-weighted cash flows, worst- and best-case NPVs and the probability of the worst case under perfectly correlated cash flows are Risk Analysis in Capital Budgeting, which old Paper 8 taught; it is not in the new Paper 6A syllabus or the January 2027 Study Material (as o-p8-mtp-nov2022-s1 q4), so the item carries only its nearest chapter. ICAI's question asks for "the probability occurrence of the worst case"; kept as printed.
---
#### Question
PQR Ltd. has under its consideration a project with an initial investment of ₹ 2,25,00,000. Three probable cash inflow scenarios with their probabilities of occurrence have been estimated as below:

| | | | |
|---|---:|---:|---:|
| Annual cash inflow (₹) | 50,00,000 | 75,00,000 | 1,00,00,000 |
| Probability | 0.2 | 0.7 | 0.1 |

The project life is 5 years and the desired rate of return is 12%. The estimated terminal values for the project assets under the three probability alternatives are ₹ 0, ₹ 50,00,000 and ₹ 75,00,000 respectively.

You are required to:

(i) CALCULATE the probable NPV;

(ii) CALCULATE the worst-case NPV and the best-case NPV; and

(iii) STATE the probability occurrence of the worst case, if the cash flows are perfectly positively correlated over time.
#### Answer
**(i) Calculation of Net Present Value (NPV)**

| Year | Prob. = 0.2 | | Prob. = 0.7 | | Prob. = 0.1 | | | | |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| | **Cash flow** | **Probable cash flow** | **Cash flow** | **Probable cash flow** | **Cash flow** | **Probable cash flow** | **Total Cash flow** | **PVF@ 12%** | **PV of Total cash flow** |
| 0 | | | | | | | (2,25,00,000) | 1.0000 | (2,25,00,000) |
| 1 to 5 | 50,00,000 | 10,00,000 | 75,00,000 | 52,50,000 | 1,00,00,000 | 10,00,000 | 72,50,000 | 3.6048 | 2,61,34,800 |
| 5 | 0 | 0 | 50,00,000 | 35,00,000 | 75,00,000 | 7,50,000 | 42,50,000 | 0.5674 | 24,11,450 |
| **Net Present Value (NPV)** | | | | | | | | | **60,46,250** |

**(ii) Worst and Best case is the case where expected annual cash inflows are minimum and maximum respectively.**

**Calculation of Worst Case and Best Case NPV:**

| Year | PVF@ 12% | Worst case | | Best Case | |
|---|---:|---:|---:|---:|---:|
| | | **Cash flows** | **PV of Cash flows** | **Cash flows** | **PV of Cash flows** |
| 0 | 1.0000 | (2,25,00,000) | (2,25,00,000) | (2,25,00,000) | (2,25,00,000) |
| 1 to 5 | 3.6048 | 50,00,000 | 1,80,24,000 | 1,00,00,000 | 3,60,48,000 |
| 5 | 0.5674 | 0 | 0 | 75,00,000 | 42,55,500 |
| **NPV** | | | **(44,76,000)** | | **1,78,03,500** |

**Worst case NPV = ₹ (44,76,000)**

**Best Case NPV = ₹ 1,78,03,500**

**(iii)** The cash flows are perfectly positively correlated over time means cash flow in first year will be cash flows in subsequent years. The cash flow of ₹ 50,00,000 is the worst case cash flow and its probability is 20%, thus, possibility of worst case is 20%.
#### Approach
Weight each scenario's annual inflow and terminal value by its probability, discount them at 12% and deduct the outlay; for the worst and best cases discount the lowest and highest scenarios on their own.

---
item: q5b
qno: 5
part: (b)
marks: 2
type: descriptive
tags: fm.cs.theories
difficulty: easy
q: 5
a: 8-9
---
#### Question
‘Pecking order theory’ suggests manager to use various sources for raising of fund in certain order. BRIEF out that order.
#### Answer
Pecking order theory suggests that managers may use various sources for raising of fund in the following order:

1. Managers first choice is to use **internal finance.**

2. In absence of internal finance, they can use secured **debt**, unsecured debt, hybrid debt etc.

3. Managers may issue new **equity** shares as a last option.
#### Approach
Order the sources by how much information and cost each issue carries: internal funds, then debt, then new equity.

---
item: q6a
qno: 6
part: (a)
marks: 4
type: descriptive
tags: fm.sources.long
difficulty: easy
q: 5
a: 9
---
#### Question
BRIEF out any four types of Preference shares along with its feature.
#### Answer
| Sl. No. | Type of Preference Shares | Salient Features |
|---|---|---|
| 1 | Cumulative | Arrear Dividend will accumulate. |
| 2 | Non-cumulative | No right to arrear dividend. |
| 3 | Redeemable | Redemption should be done. |
| 4 | Participating | Can participate in the surplus which remains after payment to equity shareholders. |
| 5 | Non- Participating | Cannot participate in the surplus after payment of fixed rate of Dividend. |
| 6 | Convertible | Option of converting into equity Shares. |
#### Approach
Think in pairs: arrears of dividend (cumulative or not), surplus (participating or not), redemption and conversion.

---
item: q6b
qno: 6
part: (b)
marks: 4
type: descriptive
tags: fm.sources.short
difficulty: easy
q: 5
a: 9
note: ICAI's answer writes "pledge able interest" and "forward exchange contact"; kept as printed.
---
#### Question
EXPLAIN any four types of Packing Credit.
#### Answer
(i) **Clean packing credit:** This is an advance made available to an exporter only on production of a firm export order or a letter of credit without exercising any charge or control over raw material or finished goods. It is a clean type of export advance. Each proposal is weighed according to particular requirements of the trade and credit worthiness of the exporter. A suitable margin has to be maintained. Also, Export Credit Guarantee Corporation (ECGC) cover should be obtained by the bank.

(ii) **Packing credit against hypothecation of goods:** Export finance is made available on certain terms and conditions where the exporter has pledge able interest and the goods are hypothecated to the bank as security with stipulated margin. At the time of utilising the advance, the exporter is required to submit, along with the firm export order or letter of credit relative stock statements and thereafter continue submitting them every fortnight and/or whenever there is any movement in stocks.

(iii) **Packing credit against pledge of goods:** Export finance is made available on certain terms and conditions where the exportable finished goods are pledged to the banks with approved clearing agents who will ship the same from time to time as required by the exporter. The possession of the goods so pledged lies with the bank and is kept under its lock and key.

(iv) **E.C.G.C. guarantee:** Any loan given to an exporter for the manufacture, processing, purchasing, or packing of goods meant for export against a firm order qualifies for the packing credit guarantee issued by Export Credit Guarantee Corporation.

(v) **Forward exchange contract:** Another requirement of packing credit facility is that if the export bill is to be drawn in a foreign currency, the exporter should enter into a forward exchange contact with the bank, thereby avoiding risk involved in a possible change in the rate of exchange.
#### Approach
Packing credit is pre-shipment finance; classify it by the security the bank holds (none, hypothecation, pledge), then add the ECGC guarantee and the forward contract.

---
item: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.sources.long
difficulty: easy
q: 5
a: 9-10
note: ICAI prints the (c) pair's [2 Marks] once, after the OR alternative (q6c-or).
---
#### Question
EXPLAIN: Callable bonds and Puttable bonds.
#### Answer
**(i) Callable bonds:** A callable bond has a call option which gives the issuer the right to redeem the bond before maturity at a predetermined price known as the call price (Generally at a premium).

**(ii) Puttable bonds:** Puttable bonds give the investor a put option (i.e. the right to sell the bond) back to the company before maturity.
#### Approach
Ask who holds the option in each bond, the issuer or the investor, and what it lets them do before maturity.

---
item: q6c-or
alt: q6c
qno: 6
part: (c)
marks: 2
type: descriptive
tags: fm.sources.long, fm.sources.short
difficulty: easy
q: 5
a: 10
note: ICAI prints this as the OR alternative to Q6(c), followed by the pair's [2 Marks]. ICAI's answer ends "... on term loans" without a full stop; kept as printed.
---
#### Question
Briefly DESCRIBE bridge finance.
#### Answer
**Bridge Finance:** Bridge finance refers to loans taken by a company normally from commercial banks for a short period because of pending disbursement of loans sanctioned by financial institutions. Though it is of short-term nature but since it is an important step in the facilitation of long-term loan, therefore it is being discussed along with the long term sources of funds. Normally, it takes time for financial institutions to disburse loans to companies. However, once the loans are approved by the term lending institutions, companies, in order not to lose further time in starting their projects, arrange short term loans from commercial banks. The bridge loans are repaid/ adjusted out of the term loans as and when disbursed by the concerned institutions. Bridge loans are normally secured by hypothecating movable assets, personal guarantees and demand promissory notes. Generally, the rate of interest on bridge finance is higher as compared with that on term loans
#### Approach
Explain what gap the loan bridges (a sanctioned term loan not yet disbursed), who gives it, how it is repaid and secured, and its cost.
