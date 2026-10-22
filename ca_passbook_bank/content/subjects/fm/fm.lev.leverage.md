---
id: fm.lev.leverage
title: Operating, financial and combined leverage
minutes: 35
needs: cma.mc.bep, fm.cs.ebiteps
tags: operating leverage, financial leverage, combined leverage, DOL, DFL, DCL, business risk, financial risk, trading on equity
labs:
summary: How fixed operating costs magnify a change in sales into a bigger change in EBIT (DOL), fixed financial charges magnify EBIT into EPS (DFL), and both together (DCL = DOL × DFL).
---

## In plain words

### Ten per cent more chai, eighty per cent more EPS

Tapri Kulhad Cafés Ltd, Tapri's café subsidiary, sells ₹50 crore a year. Milk, tea and kulhads take 60% of sales; rent, salaries and machine leases are ₹15 crore whatever the sales; interest is ₹2.50 crore; tax is 25%; there are 50 lakh shares. EBIT is ₹5 crore and EPS ₹3.75.

> **Kesar:** Diwali sales are up 10%. So profit is up 10%, right?
> **Dev:** EBIT is up 40% and EPS 80%. Fixed costs do not grow with sales, so every extra rupee of contribution falls straight through.
> **Kesar:** Then let us open three hundred more cafés!
> **Dev:** The lever works both ways. A fall of 12.5% in sales wipes out EPS altogether. Even my optimism is discounted.

**Leverage** is the influence of one financial variable over another: the percentage change in one divided by the percentage change in the other. Fixed costs are what create it:

- **Operating leverage** links sales and EBIT. Fixed operating costs (rent, salaries) make EBIT change faster than sales. It indicates **business risk**: the uncertainty about future operating income.
- **Financial leverage** links EBIT and EPS. Fixed financial charges (interest, preference dividend) make EPS change faster than EBIT. It indicates **financial risk**: the extra risk shareholders bear because the company uses debt.
- **Combined leverage** links sales and EPS: the two levers multiplied. It indicates total risk.

At Tapri's cafés the operating lever is 4 (EBIT moves four times as fast as sales) and the financial lever 2 (EPS moves twice as fast as EBIT), so the combined lever is 8.

::: analogy The bicycle gears
Pedal once and the back wheel turns several times: that is a gear ratio. Sales are the pedals, EBIT is the middle sprocket and EPS is the back wheel. Fixed operating costs set the first gear (DOL), fixed interest the second (DFL), and the total ratio is the product of the two (DCL). High gears are glorious going downhill and brutal uphill: when sales fall, the same gears turn a small dip into a crash.
:::

::: key
Fixed costs are the lever. Fixed operating costs make EBIT move faster than sales (operating leverage, business risk); fixed financial charges make EPS move faster than EBIT (financial leverage, financial risk); the two multiply into combined leverage (total risk). Each degree of leverage is a multiplier on a percentage change, and it magnifies falls exactly as much as rises.
:::

## How it works

### Two risks, three levers

**Business risk** refers to the risk associated with the firm's operations: the uncertainty about the future operating income (EBIT), i.e. how well can the operating income be predicted. **Financial risk** refers to the additional risk placed on the firm's shareholders because of use of debt, the additional risk a shareholder bears when a company uses debt in addition to equity financing; companies that issue more debt instruments would have higher financial risk (SM 6.2).

$$\text{Leverage of Y with X} = \frac{\Delta Y \div Y}{\Delta X \div X}$$

The three commonly used measures (SM 6.3–6.4): **operating leverage**, the relationship between sales and EBIT, indicating business risk; **financial leverage**, between EBIT and EPS, indicating financial risk; **combined leverage**, between sales and EPS, indicating total risk.

::: diagram Tapri's cafés: a 10% rise in sales, through both gears
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "Sales up 10%\n(₹50 crore → ₹55 crore)"},
  {"id": "e", "kind": "process", "label": "EBIT up 40%\n(₹5 crore → ₹7 crore)"},
  {"id": "p", "kind": "end", "label": "EPS up 80%\n(₹3.75 → ₹6.75)", "color": "g"}],
 "edges": [["s", "e", "× DOL 4"], ["e", "p", "× DFL 2"]],
 "caption": "Contribution rises ₹2 crore with no rise in fixed costs, so EBIT rises 40%; interest stays ₹2.50 crore, so EBT rises from ₹2.50 crore to ₹4.50 crore and EPS 80%. DCL = 4 × 2 = 8. A 10% fall gives −40% and −80%."}
:::

### Operating leverage: the fixed-cost gear

**Operating leverage (OL)** means the tendency of operating income (EBIT) to change disproportionately with change in sales volume, caused by operating fixed cost, which does not change with sales; it is the use of assets for which a company pays a fixed cost (SM 6.5). It is a function of three factors: (i) amount of fixed cost, (ii) variable contribution margin, and (iii) volume of sales.

The **degree of operating leverage (DOL)** is the percentage change in EBIT with respect to the percentage change in sales quantity. With EBIT = Q (S − V) − F and no change in fixed cost, it simplifies to (SM 6.5–6.6):

$$\text{DOL} = \frac{\%\ \text{change in EBIT}}{\%\ \text{change in sales}} \qquad = \frac{\text{Contribution}}{\text{Contribution} - \text{Fixed cost}} = \frac{\text{Contribution}}{\text{EBIT}}$$

**Operating leverage and the break-even point.** A firm with high leverage has a higher break-even point; high fixed cost means a high degree of operating leverage (SM 6.7). **Operating leverage and the margin of safety**: multiply and divide the MOS ratio by the P/V ratio and MOS = (contribution − fixed cost) ÷ contribution = EBIT ÷ contribution, so ==DOL = 1 ÷ margin of safety== (SM 6.8). Tapri's cafés: break-even sales = ₹15 crore ÷ 40% = ₹37.50 crore; MOS = (50 − 37.50) ÷ 50 = 25%; DOL = 1 ÷ 0.25 = 4. A higher margin of safety means lower business risk and a lower DOL.

**Sign and size of DOL** (SM 6.9–6.11): with no fixed cost, DOL = 1 (no operating leverage); above the break-even level it is positive and sales and EBIT move together; at the break-even point, where contribution = fixed cost, it is undefined (infinite); below break-even it is negative and EBIT is negative. DOL can never be between zero and one.

::: diagram DOL at different sales levels, Tapri's cafés
{"type": "plot", "h": 320, "x": [0, 100], "y": [-10, 12], "clip": true,
 "xlabel": "sales (₹ crore)", "ylabel": "DOL (times)",
 "xticks": [[0, "0"], [25, "25"], [37.5, "37.5"], [50, "50"], [75, "75"], [100, "100"]],
 "yticks": [-10, -5, 0, 5, 10],
 "legend": "none",
 "series": [
  {"pts": [[0, 0], [6, -0.19], [12, -0.471], [18, -0.923], [24, -1.778], [28, -2.947], [30, -4.0], [32, -5.818], [33, -7.333], [34, -9.714], [34.5, -11.5], [35, -14.0], [35.5, -17.75], [36, -24.0], [36.3, -30.25]], "color": "d"},
  {"pts": [[38.7, 32.25], [39, 26.0], [39.5, 19.75], [40, 16.0], [41, 11.714], [42, 9.333], [43, 7.818], [45, 6.0], [47.5, 4.75], [50, 4.0], [55, 3.143], [60, 2.667], [70, 2.154], [80, 1.882], [90, 1.714], [100, 1.6]], "color": "a"},
  {"pts": [[37.5, -10], [37.5, 12]], "color": "mute", "dash": true},
  {"pts": [[0, 1], [100, 1]], "color": "mute", "dash": true}
 ],
 "points": [{"x": 50, "y": 4}],
 "caption": "Contribution 40% of sales, fixed cost ₹15 crore; the dot is today, sales ₹50 crore and DOL 4. Grey dashed vertical: the operating BEP, ₹37.5 crore, where DOL is undefined. Blue: above it DOL is positive and falls towards 1 (grey dashed horizontal) as sales grow; orange: below it DOL is negative and rises towards zero at zero sales."}
:::

### Financial leverage: the fixed-interest gear

**Financial leverage (FL)** may be defined as "the use of funds with a fixed cost in order to increase earnings per share": funds obtained at a fixed cost in the hope of increasing the return to common stockholders (SM 6.14). The **degree of financial leverage (DFL)** is the ratio of the percentage increase in EPS to the percentage increase in EBIT; FL is also "the ability of a firm to use fixed financial charges to magnify the effect of changes in EBIT on EPS". Since EPS = [(EBIT − I)(1 − t) − Dp] ÷ number of shares (SM 6.15):

$$\text{DFL} = \frac{\%\ \text{change in EPS}}{\%\ \text{change in EBIT}} \qquad = \frac{\text{EBIT}}{\text{EBIT} - I - \frac{D_p}{1-t}}$$

Without preference shares, DFL = EBIT ÷ (EBIT − interest) = EBIT ÷ PBT. When DFL is more than one, financial leverage exists. A positive DFL means the firm operates above its **financial break-even point** (the EBIT at which EPS is zero; without preference shares, simply the interest) and EBIT and EPS move in the same direction; at the financial BEP it is undefined; below it, it is negative and EPS is negative (SM 6.15–6.19). Like DOL, DFL can never be between zero and one.

**Trading on equity.** Financial leverage indicates the use of funds with fixed cost, like long-term debts and preference share capital, along with equity share capital, which is known as trading on equity. A firm has a positive or favourable leverage when its earnings are more than the cost of debt; if earnings are equal to or less than the cost of debt, it is a negative or unfavourable leverage. When the quantity of fixed cost fund is relatively high in comparison to equity capital, the firm is said to be "trading on equity" (SM 6.17).

**A double-edged sword.** When the cost of the fixed cost fund is less than the return on investment, financial leverage helps to increase return on equity and EPS, and the firm also saves tax on interest. When the cost of debt is more than the return, it affects return on equity and EPS unfavourably and the firm can be under financial distress. Hence financial leverage is called a "double edged sword" (SM 6.18): ROI > interest, favourable, an advantage; ROI < interest, unfavourable, a disadvantage; ROI = interest, neutral.

::: diagram Financial leverage cuts both ways
{"type": "tree", "gapX": 40, "gapY": 92, "root": {"label": "Financial leverage", "children": [
  {"label": "ROI > Kd:\nfavourable", "color": "g", "children": [{"label": "ROI 18%, Kd 12%:\n6% surplus to\nequity, EPS up", "color": "g"}]},
  {"label": "ROI < Kd:\nunfavourable", "color": "bad", "children": [{"label": "ROI 9%, Kd 12%:\n3% deficit borne\nby equity, EPS down", "color": "bad"}]}]},
 "caption": "Green: the favourable edge; rose: the unfavourable edge. The same debt that lifts EPS when the cafés earn 18% drags it down when they earn 9%."}
:::

### Combined leverage: both gears together

**Combined leverage** may be defined as the potential use of fixed costs, both operating and financial, which magnifies the effect of sales volume change on the EPS of the firm. The **degree of combined leverage (DCL)** is the ratio of percentage change in EPS to the percentage change in sales: it indicates the effect the changes in sales will have on EPS (SM 6.19–6.20).

$$\text{DCL} = \text{DOL} \times \text{DFL} \qquad = \frac{\text{Contribution}}{\text{EBIT}} \times \frac{\text{EBIT}}{\text{EBT}} \qquad = \frac{\text{Contribution}}{\text{EBT}} \qquad = \frac{\%\ \text{change in EPS}}{\%\ \text{change in sales}}$$

Combined leverage measures total risk, the combination of operating and financial risk (SM 6.20):

::: compare
| DOL | DFL | Comment |
|---|---|---|
| Low | Low | Lower total risk. Cannot take advantage of trading on equity. |
| High | High | Higher total risk. Very risky combination. |
| High | Low | Moderate total risk. Not a good combination: lower EBIT due to higher DOL and lower advantage of trading on equity due to low DFL. |
| Low | High | Moderate total risk. Best combination: higher financial risk is balanced by lower business risk. |
:::

## Formats and formulas

*Reproduce this statement from memory: ICAI prints it as the "chart showing" the three leverages, with a bracket beside the part of the statement each one covers (SM 6.4). The right-hand column marks where each measure starts and ends.*

| Profitability statement | ₹ | Leverage |
|---|---:|---|
| Sales | xxx | DOL and DCL start |
| Less: Variable cost | (xxx) | |
| **Contribution** | **xxx** | |
| Less: Fixed cost | (xxx) | |
| **Operating profit / EBIT** | **xxx** | DOL ends, DFL starts |
| Less: Interest | (xxx) | |
| **Earnings before tax (EBT)** | **xxx** | |
| Less: Tax | (xxx) | |
| Profit after tax (PAT) | xxx | |
| Less: Preference dividend (if any) | (xxx) | |
| Net earnings available to equity shareholders | xxx | |
| Number of equity shares (N) | xxx | |
| **Earnings per share (EPS) = PAT ÷ N** | **xxx** | DFL and DCL end |

::: formula Degree of operating leverage
$$\text{DOL} = \frac{\text{Contribution}}{\text{EBIT}} \qquad = \frac{\%\ \Delta\ \text{EBIT}}{\%\ \Delta\ \text{sales}} = \frac{1}{\text{Margin of safety ratio}}$$
Contribution = sales − variable cost; EBIT = contribution − fixed operating cost (SM 6.6, 6.8).
:::

::: formula Degree of financial leverage
$$\text{DFL} = \frac{\text{EBIT}}{\text{EBT}} \qquad = \frac{\%\ \Delta\ \text{EPS}}{\%\ \Delta\ \text{EBIT}}$$
With preference dividend Dp: DFL = EBIT ÷ [EBIT − interest − Dp ÷ (1 − t)] (SM 6.15).
:::

::: formula Degree of combined leverage
$$\text{DCL} = \text{DOL} \times \text{DFL} \qquad = \frac{\text{Contribution}}{\text{EBT}} = \frac{\%\ \Delta\ \text{EPS}}{\%\ \Delta\ \text{sales}}$$
(SM 6.19–6.20)
:::

::: definition Business risk and financial risk
Business risk refers to the risk associated with the firm's operations: the uncertainty about the future operating income (EBIT). Financial risk refers to the additional risk placed on the firm's shareholders because of use of debt, i.e. the additional risk a shareholder bears when a company uses debt in addition to equity financing. (SM 6.2)
:::

::: definition Operating leverage
The tendency of operating income (EBIT) to change disproportionately with change in sale volume, caused by operating fixed cost; the employment of an asset with a fixed cost so that enough revenue can be generated to cover all the fixed and variable costs. (SM 6.5)
:::

::: definition Financial leverage
The use of funds with a fixed cost in order to increase earnings per share. (SM 6.14)
:::

### DOL, DFL and DCL side by side (SM 6.27)

| Point | DOL | DFL | DCL |
|---|---|---|---|
| Shows | business risk | financial risk | total (combined) risk |
| Depends on | fixed cost | interest and preference dividend | fixed cost, interest and preference dividend |
| Measures % change in | EBIT from 1% change in sales | EPS from 1% change in EBIT | EPS from 1% change in sales |
| Example | DOL 3, output +8%: EBIT +24% | DFL 2, EBIT +5%: EPS +10% | DCL 6, sales +8%: EPS +48% |
| Unique for | each level of output | each level of EBIT | each level of sales |
| Undefined at | operating BEP | financial BEP | financial BEP |

## Worked examples

:::: example Dhaba Dairy: leverages from a balance sheet
Dhaba Dairy Ltd, Tapri's milk supplier, gives you its balance sheet as on 31 March 2026:

| Liabilities | ₹ crore | Assets | ₹ crore |
|---|---:|---|---:|
| Equity share capital (20,00,000 shares of ₹10) | 2.00 | Fixed assets (net) | 6.50 |
| Reserves and surplus | 1.00 | Current assets | 3.50 |
| 12% debentures | 5.00 | | |
| Current liabilities | 2.00 | | |
| **Total** | **10.00** | **Total** | **10.00** |

Fixed costs per annum (excluding interest) are ₹6 crore, the variable operating cost ratio is 65%, the total assets turnover ratio is 3 and the tax rate is 25%.

**Required:**

(i) Calculate the EPS, operating leverage, financial leverage and combined leverage, and comment on each.

(ii) Calculate the percentage change in EPS if sales fall by 10%, and verify it with a revised statement.

::: answer Show the working
**Working note:** sales = total assets × total assets turnover = ₹10 crore × 3 = **₹30 crore**.

**Computation of PAT** (₹ crore)

| Particulars | Amount |
|---|---:|
| Sales | 30.000 |
| Less: Variable operating cost @ 65% | 19.500 |
| **Contribution** | **10.500** |
| Less: Fixed cost (other than interest) | 6.000 |
| **EBIT** | **4.500** |
| Less: Interest on debentures (12% × ₹5 crore) | 0.600 |
| **PBT** | **3.900** |
| Less: Tax @ 25% | 0.975 |
| **PAT** | **2.925** |

**(i)**

- **EPS** = ₹2.925 crore ÷ 20,00,000 shares = **₹14.63**. It is what the company earns per share; investors use it to value the share and compare firms.
- **Operating leverage** = contribution ÷ EBIT = 10.500 ÷ 4.500 = **2.33**. A 1% change in sales changes EBIT by 2.33%; the fixed cost of ₹6 crore makes business risk moderate.
- **Financial leverage** = EBIT ÷ PBT = 4.500 ÷ 3.900 = **1.15**. Comfortable: the debt service obligation is small against EBIT.
- **Combined leverage** = contribution ÷ PBT = 10.500 ÷ 3.900 = **2.69** (= 2.33 × 1.15). A 1% change in sales changes EPS by 2.69%.

**(ii)** % change in EPS = DCL × % change in sales = 2.6923 × (−10%) = **−26.92%**.

Verification at sales of ₹27 crore: contribution ₹9.450 crore; EBIT ₹3.450 crore; PBT ₹2.850 crore; tax ₹0.7125 crore; PAT ₹2.1375 crore; EPS = ₹10.69. Fall = (14.625 − 10.6875) ÷ 14.625 = **26.92%**.
:::
::::

:::: example Chai Express: working backwards from the leverages
Chai Express Logistics Ltd, Tapri's delivery subsidiary, has sales of ₹1,60,00,000 at a P/V ratio of 30%. Its degree of operating leverage is 2.5, and a 25% decline in sales would wipe out its EPS. It has no preference shares and 4,00,000 equity shares, pays interest at 12% on its debt, and is taxed at 25%.

**Required:**

(i) Calculate the fixed cost and EBIT.

(ii) Calculate the degrees of combined and financial leverage.

(iii) Calculate the interest and the amount of debt.

(iv) Prepare the income statement and calculate the EPS. Verify that a 25% fall in sales wipes out EPS.

::: answer Show the working
**(i)** Contribution = ₹1,60,00,000 × 30% = ₹48,00,000. DOL = contribution ÷ EBIT, so 2.5 = ₹48,00,000 ÷ EBIT and **EBIT = ₹19,20,000**. Fixed cost = contribution − EBIT = **₹28,80,000**.

**(ii)** "Wipe out EPS" means EPS falls by 100%: DCL = % change in EPS ÷ % change in sales = 100% ÷ 25% = **4**. DCL = DOL × DFL, so 4 = 2.5 × DFL and **DFL = 1.6**.

**(iii)** DFL = EBIT ÷ (EBIT − interest): 1.6 = ₹19,20,000 ÷ (₹19,20,000 − I), so EBT = ₹12,00,000 and **interest = ₹7,20,000**. Debt × 12% = ₹7,20,000, so **debt = ₹60,00,000**.

**(iv) Income statement**

| Particulars | Present (₹) | Sales down 25% (₹) |
|---|---:|---:|
| Sales | 1,60,00,000 | 1,20,00,000 |
| Less: Variable cost (70%) | 1,12,00,000 | 84,00,000 |
| Contribution | 48,00,000 | 36,00,000 |
| Less: Fixed cost | 28,80,000 | 28,80,000 |
| EBIT | 19,20,000 | 7,20,000 |
| Less: Interest | 7,20,000 | 7,20,000 |
| EBT | 12,00,000 | Nil |
| Less: Tax @ 25% | 3,00,000 | Nil |
| PAT | 9,00,000 | Nil |
| Equity shares | 4,00,000 | 4,00,000 |
| **EPS** | **₹2.25** | **Nil** |

At sales of ₹1,20,00,000, EBT and EPS are nil: the 25% fall wipes out EPS, as given.
:::
::::

:::: example Sugar & Spice Foods: leverage with preference shares
Sugar & Spice Foods Ltd has sales of ₹80,00,000, a variable cost ratio of 55% and fixed operating costs of ₹18,00,000. Its capital includes 10% debentures of ₹60,00,000, 9% preference shares of ₹30,00,000 and 3,00,000 equity shares. The tax rate is 25%.

**Required:**

(i) Calculate EPS and the degrees of operating, financial and combined leverage.

(ii) Calculate the level of sales at which EPS will be zero, and the level at which EBT will be zero.

::: answer Show the working
**Income statement**

| Particulars | ₹ |
|---|---:|
| Sales | 80,00,000 |
| Less: Variable cost (55%) | 44,00,000 |
| Contribution | 36,00,000 |
| Less: Fixed cost | 18,00,000 |
| EBIT | 18,00,000 |
| Less: Interest (10% × ₹60,00,000) | 6,00,000 |
| EBT | 12,00,000 |
| Less: Tax @ 25% | 3,00,000 |
| PAT | 9,00,000 |
| Less: Preference dividend (9% × ₹30,00,000) | 2,70,000 |
| Earnings for equity shareholders | 6,30,000 |
| **EPS (÷ 3,00,000 shares)** | **₹2.10** |

**(i) Leverages.** Pre-tax preference dividend = ₹2,70,000 ÷ (1 − 0.25) = ₹3,60,000.

- DOL = ₹36,00,000 ÷ ₹18,00,000 = **2.00**.
- DFL = EBIT ÷ [EBT − Dp ÷ (1 − t)] = ₹18,00,000 ÷ (₹12,00,000 − ₹3,60,000) = ₹18,00,000 ÷ ₹8,40,000 = **2.14**.
- DCL = 2.00 × 2.1429 = **4.29** (= ₹36,00,000 ÷ ₹8,40,000).

**(ii) Sales levels.**

- **EPS zero** means a 100% fall in EPS: sales must fall by 100 ÷ 4.2857 = 23.33%, to ₹80,00,000 × 76.67% = **₹61,33,333**. Check: (fixed cost + interest + pre-tax preference dividend) ÷ P/V ratio = (18,00,000 + 6,00,000 + 3,60,000) ÷ 45% = ₹61,33,333.
- **EBT zero** uses the combined leverage without the preference dividend, contribution ÷ EBT = 36,00,000 ÷ 12,00,000 = 3: sales must fall by 33.33%, to **₹53,33,333**. Check: (18,00,000 + 6,00,000) ÷ 45% = ₹53,33,333.

Note: if preference dividend is ignored in DFL (as some answers do), DFL = 1.50 and DCL = 3.00. State the treatment you use.
:::
::::

## Under the hood

### One firm, many DOLs

There is a unique DOL for each level of output, a unique DFL for each level of EBIT and a unique DCL for each level of sales (SM 6.27). When sales are much higher than break-even sales, DOL is slightly more than one; as sales fall, DOL rises; at break-even it is infinite; just below break-even it is negative infinite, and it moves towards zero as sales fall further, reaching zero at zero sales (SM 6.11). DFL behaves the same way around the financial BEP (SM 6.19). So the percentage-change formula and contribution ÷ EBIT agree only when contribution ÷ EBIT is taken at the **starting** level: in ICAI's answer to May 2024 Q1(b), sales falling 15% gave DOL = 28.125% ÷ 15% = 1.875 (contribution ÷ EBIT at the original sales), while contribution ÷ EBIT at the reduced sales gave 2.22; the answer showed both.

### Where the leverages hide in the data

- **DOL from the margin of safety** (1 ÷ MOS), and MOS from DOL (SM 6.8; Paper 4's [[cma.mc.bep|break-even point]]).
- **Sales from total assets turnover**, with total assets either from the balance sheet total (January 2025) or as debt + equity when only the capital is given (SM Practical Problem 10).
- **Fixed cost from DOL**: C = DOL × EBIT, fixed cost = C − EBIT.
- **Sales at which EBT is zero**: present sales × (1 − 1 ÷ DCL), or (fixed cost + interest) ÷ P/V ratio. The two agree when the data are consistent; in the Study Material's Practical Problem 10 the given leverages and the given interest do not match, the two routes give ₹30,00,000 and ₹42,79,412, and the answer notes that results vary with the method.
- **"Operating risk is associated with cost structure, financial risk with capital structure"**: one of the chapter's own theory questions (SM 6.31). Cost structure (fixed against variable costs) decides DOL; capital structure (debt and preference against equity) decides DFL. The capital structure side is the subject of [[fm.cs.ebiteps|EBIT-EPS analysis]].

## Exam angle

### What ICAI asks

::: exam In the ICAI documents read for this lesson (new scheme, May 2024 to September 2026)
Leverages appeared in all 32 question sets searched: every past paper (8 of 8), every RTP (8 of 8) and every MTP (16 of 16).

- **Past papers, descriptive, usually 5 marks**: May 2024 Q1(b) (EPS, DOL and DFL if sales fall 15% and 20%); September 2024 Q1(a) (contribution, MOS and sales of two companies from CL and FL); January 2025 Q1(b) (EPS, OL, FL, CL from a balance sheet and asset turnover); May 2025 Q1(c) (income statement from P/V ratio, OL 2, FL 1.5 and interest; % change in EPS); September 2025 Q2(a) (7 marks: EBIT, fixed cost, bank loan and its interest from OL 2.4 and CL 3.84; EPS; MPS); January 2026 Q2(a) (with preference shares; sales at which EBT is zero); May 2026 Q1(a) (sales from a 5% rise giving ₹9,000 more EBIT; OL, FL, CL); September 2026 Q1(a) (leverages from year-on-year % changes; debt; FL after expansion).
- **Short questions, 2 marks**: May 2025 MCQ 6 (FL from net worth and debt-equity ratio); May 2025 Q4(c) OR and MTP Series I for May 2026 Q4(c) (comment on DOL-DFL combinations, the table above); January 2026 Q3(b) ("Explain in what ways financial leverage operates as a double edged sword"); MTPs: "Differentiate between business risk and financial risk", "Explain financial leverage as trading on equity".
- **In MTPs**: % change in EBIT and in EBT from a profitability statement (MTP Series II for January 2025 Q1(c), 5 marks); % change in EPS from DOL × DFL × % change in sales; earnings after tax from contribution, OL and CL; DOL from sales and break-even sales; sales from ROCE, DOL and P/V ratio.
:::

::: exam The traps in those answers
- "Wipe out EPS" means a 100% fall: DCL = 100% ÷ % fall in sales (SM Practical Problem 5).
- Fixed cost in leverage questions is "excluding interest"; when a question says all operating expenses other than depreciation are variable, depreciation is the fixed cost (SM Practical Problem 6).
- With preference shares, ICAI's January 2026 answer used DCL = contribution ÷ (EBT − pre-tax preference dividend) = 3.84 and, as an alternative, contribution ÷ EBT = 3.2, giving different "EBT zero" sales. Name the treatment you use; strictly, the first gives the sales at which EPS is zero.
- Percentage changes are measured from the present level (May 2024 Q1(b)).
- Comments carry marks when asked: MTP Series II for September 2026 says "comment on what each result means", and the Study Material's answer to Practical Problem 7 writes a line on what each leverage indicates. ICAI's January 2025 answer shows leverages to three decimals (1.363, 1.128, 1.538).
:::

::: trick The leverage ladder
Contribution ÷ EBIT ÷ EBT: each leverage is "the line above ÷ the line below" in the profitability statement, and DCL skips the middle rung (contribution ÷ EBT). With preference shares, the bottom rung is EBT − Dp ÷ (1 − t). Valid at any level of sales away from the break-even points.
:::

## Answer frame

### "Differentiate between business risk and financial risk"

The points of ICAI's answer to MTP Series I for January 2026 Q2(b), with the Study Material's definitions (SM 6.2):

| Basis | Business risk | Financial risk |
|---|---|---|
| Meaning | risk associated with the firm's operations; unavoidable, because of the environment in which the firm operates | additional risk placed on the firm's shareholders as a result of debt use in financing |
| Represented by | variability of EBIT, influenced by revenues and expenses (demand for products, variations in prices, proportion of fixed cost in total cost) | the use of debt: companies issuing more debt instruments have higher financial risk than companies financed mostly by equity |
| Indicated by | operating leverage (SM 6.3) | financial leverage (SM 6.3); measured by ratios such as the financial leverage multiplier and total debt to assets ratio |

### "Explain financial leverage as a double-edged sword" (2 marks)

When the cost of fixed cost funds is less than the return on investment, financial leverage increases return on equity and EPS, with a tax saving on interest; when the cost of debt is more than the return, it affects return on equity and EPS unfavourably and the firm can be under financial distress. Hence "double edged sword": ROI > interest favourable, ROI < interest unfavourable, ROI = interest neutral.

### Three answers to "Calculate the operating leverage"

::: cols
**Loses marks**

"OL = 2.33."

No statement: an error in sales or contribution leaves nothing to mark.
---
**Passes**

Income statement, then OL = 10.5 ÷ 4.5 = 2.33.

Correct, but no comment where the question asks to "comment".
---
**Full marks**

Working note for sales; income statement to EBIT; formula, figures and result to two decimals; one line on what it indicates (business risk, % change in EBIT for 1% change in sales).
:::

## Common mistakes

::: mistake Hall of Shame: interest in the fixed cost
Adding ₹60 lakh of debenture interest to Dhaba Dairy's ₹6 crore fixed cost gives EBIT of ₹3.9 crore and a DOL of 2.69: the combined leverage passed off as operating leverage. **Fix:** operating leverage uses fixed operating cost only; interest belongs below EBIT, in financial leverage.
:::

::: mistake DOL multiplied when it should be divided
"A 25% fall in sales wipes out EPS; DCL = 25% × 100%." **Fix:** DCL = % change in EPS ÷ % change in sales = 100 ÷ 25 = 4, and DFL = DCL ÷ DOL.
:::

::: mistake Preference dividend ignored without saying so
Using DFL = EBIT ÷ EBT when the company has preference shares, with no note. **Fix:** use EBIT ÷ [EBT − Dp ÷ (1 − t)] (SM 6.15), or state that you have ignored it, as ICAI's alternative answers do.
:::

::: mistake A DOL of 0.6
DOL can never be between zero and one. A figure like 0.6 means sales and EBIT are swapped (EBIT ÷ contribution). **Fix:** DOL = contribution ÷ EBIT, which is at least 1 above the break-even point.
:::

## Practice

::: quiz Check yourself
Q: A company has sales of ₹40,00,000, variable cost of 60%, fixed operating cost of ₹10,00,000 and interest of ₹2,00,000. What is its degree of combined leverage? (Answer to two decimals.)
= 3.98..4.02
> Contribution = ₹16,00,000; EBIT = ₹6,00,000; EBT = ₹4,00,000. DCL = 16 ÷ 4 = 4.00 (DOL 2.67 × DFL 1.50).

Q: Case scenario. Ritu reports that Tapri's packaged premix division has a margin of safety of 20% and a financial leverage of 1.5. Kesar wants to know how much EPS will rise if premix sales rise by 6%. Which figure should Ritu give?
- [ ] 9%
- [x] 45%
- [ ] 30%
- [ ] 1.8%
> DOL = 1 ÷ MOS = 1 ÷ 0.20 = 5; DCL = 5 × 1.5 = 7.5; % change in EPS = 7.5 × 6% = 45%. 9% uses only DFL; 30% only DOL; 1.8% multiplies MOS by 6% and 1.5.

Q: Which statement about the degree of operating leverage is correct?
- [ ] It is highest when sales are far above the break-even point
- [ ] It can lie between 0 and 1 for a firm with low fixed costs
- [x] It is undefined at the break-even point and negative below it
- [ ] It depends on the interest the firm pays
> At break-even, contribution = fixed cost and EBIT = 0, so DOL is undefined; below it, EBIT is negative and so is DOL. Far above break-even it approaches 1; it is never between 0 and 1; interest affects DFL, not DOL.

Q: A company's DOL is 3 and its DCL is 4.5. Its interest is ₹2,00,000. What is its EBIT, in rupees?
= 600000
> DFL = 4.5 ÷ 3 = 1.5 = EBIT ÷ (EBIT − 2,00,000), so 1.5 EBIT − 3,00,000 = EBIT and EBIT = ₹6,00,000.

Q: Which combination of operating and financial leverage does the Study Material call the best?
- [ ] High DOL, high DFL
- [ ] High DOL, low DFL
- [x] Low DOL, high DFL
- [ ] Low DOL, low DFL
> Low DOL with high DFL: moderate total risk, the higher financial risk balanced by lower business risk, and the firm still benefits from trading on equity. High-high is very risky; high-low is "not a good combination"; low-low cannot take advantage of trading on equity.
:::

## Recap

- Business risk: uncertainty about EBIT (operating leverage). Financial risk: extra risk to shareholders from debt (financial leverage).
- DOL = contribution ÷ EBIT = % Δ EBIT ÷ % Δ sales = 1 ÷ MOS; function of fixed cost, contribution margin and sales volume.
- DFL = EBIT ÷ EBT = % Δ EPS ÷ % Δ EBIT; with preference shares, EBIT ÷ [EBT − Dp ÷ (1 − t)].
- DCL = DOL × DFL = contribution ÷ EBT = % Δ EPS ÷ % Δ sales.
- No fixed cost: DOL = 1; at the operating BEP: undefined; below it: negative. Same for DFL around the financial BEP. Never between 0 and 1.
- Financial leverage is a double-edged sword: ROI > Kd favourable, ROI < Kd unfavourable.
- Best combination: low DOL, high DFL. Riskiest: high DOL, high DFL.
- "Wipe out EPS" = a 100% fall: DCL = 100 ÷ % fall in sales. (Gears up, gears down.)

## Flashcards

Q:: Define business risk and financial risk (ICAI).
A:: Business risk: the risk associated with the firm's operations, i.e. uncertainty about future operating income (EBIT). Financial risk: the additional risk placed on shareholders because of use of debt.

Q:: Operating leverage is a function of which three factors?
A:: Amount of fixed cost, variable contribution margin and volume of sales.

Q:: Three formulas for DOL?
A:: % change in EBIT ÷ % change in sales; contribution ÷ EBIT; 1 ÷ margin of safety ratio.

Q:: Define financial leverage (ICAI).
A:: The use of funds with a fixed cost in order to increase earnings per share.

Q:: Formula: DFL with preference shares?
A:: EBIT ÷ [EBIT − interest − preference dividend ÷ (1 − t)]; without preference shares, EBIT ÷ EBT.

Q:: Formula: degree of combined leverage, three ways?
A:: DOL × DFL; contribution ÷ EBT; % change in EPS ÷ % change in sales.

Q:: DOL when there is no fixed cost, at break-even, and below break-even?
A:: 1 (no operating leverage); undefined (infinite); negative.

Q:: Can DOL or DFL lie between 0 and 1?
A:: No. Each is zero or less, or one or more.

Q:: What is trading on equity?
A:: The use of funds with fixed cost, like long-term debt and preference share capital, along with equity share capital to increase earnings for equity shareholders; favourable when earnings exceed the cost of debt.

Q:: Why is financial leverage called a double-edged sword?
A:: When the cost of fixed cost funds is below the return on investment it raises ROE and EPS; when above, it reduces them and can lead to financial distress.

Q:: DOL-DFL combinations: best and riskiest?
A:: Best: low DOL, high DFL (moderate risk). Riskiest: high DOL, high DFL.

Q:: A 20% fall in sales would wipe out EPS. What is the DCL?
A:: 100% ÷ 20% = 5.
