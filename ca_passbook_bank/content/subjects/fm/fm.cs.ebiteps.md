---
id: fm.cs.ebiteps
title: EBIT-EPS analysis, indifference point and financial break-even
minutes: 35
needs: fm.cs.planning
tags: EBIT-EPS analysis, indifference point, financial break-even point, EPS, MPS, trading on equity, financing plans
labs:
summary: How the same EBIT gives different EPS under equity, debt and preference financing; the financial break-even point where EPS is zero; and the indifference point where two plans tie.
---

## In plain words

### Three ways to pay for a samosa plant

Tapri Tea Co. Ltd needs ₹20 crore for an automated samosa plant. It has 1.5 crore equity shares and no debt, pays tax at 25%, and expects EBIT (earnings before interest and tax) of ₹30 crore once the plant runs. Dev puts three plans on the table: (A) 50 lakh new shares at ₹40 each; (B) 10% debentures; (C) 11% preference shares.

> **Kesar:** Shares, obviously. No interest, no tension.
> **Dev:** And 50 lakh new partners sharing every rupee of profit. Debentures cost ₹2 crore of interest, but the profit stays with 1.5 crore shares.
> **Kesar:** So debt always wins?
> **Dev:** Only while EBIT stays above ₹8 crore. Below that, the interest eats more than the new partners would have.

The figure that compares the plans is **earnings per share (EPS)**: what is left for equity shareholders after interest, tax and preference dividend, divided by the number of equity shares. Debt and preference shares carry a **fixed financial charge** (interest, preference dividend) that must be paid whatever the EBIT; in exchange, fewer shares share what is left. When the return on the assets is higher than the cost of that fixed-charge money, EPS rises: **favourable financial leverage**, or **trading on equity**. When it is lower, EPS falls.

Two EBIT levels matter. At the **financial break-even point** EBIT just covers the fixed financial charges and EPS is zero. At the **indifference point** two plans give the same EPS: above it the plan with more fixed-charge money gives higher EPS; below it, the plan with more equity does.

::: analogy The metro card and the monthly pass
A metro card charges per ride; a monthly pass costs a fixed fee and then each ride is cheaper. Ride rarely and the card wins; ride every day and the pass wins. The number of rides at which they cost the same is the indifference point. The pass's fixed fee is interest: pay it with zero rides and you are out of pocket, which is why EPS under debt goes negative below the financial break-even point.
:::

::: key
Hold EBIT fixed, deduct each plan's interest, tax and preference dividend, and divide by its number of shares: that is EBIT-EPS analysis. The financial break-even point is the EBIT where EPS is zero; the indifference point is the EBIT where two plans' EPS are equal. Expect EBIT above the indifference point: prefer the plan with more debt. Below it: prefer equity.
:::

## How it works

### Seven steps from EBIT to a decision

ICAI names three analyses for choosing the optimal capital structure: EBIT-EPS-MPS analysis, indifference point analysis and financial break-even point analysis (SM 5.32–5.33). The steps below run all three; the principles that sit beside them (control, risk, flexibility) are in [[fm.cs.planning|capital structure planning]].

::: steps
1. **Take the same EBIT for every plan** (SM 5.32): the expected EBIT after the new investment.
2. **Deduct interest** on existing and new debt to get EBT, then **tax** to get PAT.
3. **Deduct preference dividend**, existing and new, to get the earnings available to equity shareholders. It comes after tax because it is not tax-deductible.
4. **Divide by the number of equity shares**: existing shares plus new ones, where new shares = amount raised ÷ issue price (face value + premium).
5. **Convert EPS to market price per share (MPS)**: multiply by the price-earnings (PE) ratio or divide by the cost of equity. If the plans have different PE ratios, the plan with the highest MPS is chosen, not the highest EPS (SM 5.35).
6. **Find each plan's financial break-even point**: the EBIT at which its EPS is zero.
7. **Find the indifference point** between plans: the EBIT at which their EPS are equal. Compare it with the expected EBIT.
:::

### Tapri's three plans at EBIT of ₹30 crore

A: equity; B: 10% debentures; C: 11% preference shares. Interest under B = 10% × ₹20 crore; preference dividend under C = 11% × ₹20 crore.

| ₹ crore | A | B | C |
|---|---:|---:|---:|
| EBIT | 30.00 | 30.00 | 30.00 |
| Less: Interest | — | 2.00 | — |
| EBT | 30.00 | 28.00 | 30.00 |
| Less: Tax @ 25% | 7.50 | 7.00 | 7.50 |
| PAT | 22.50 | 21.00 | 22.50 |
| Less: Pref. dividend | — | — | 2.20 |
| Equity earnings | 22.50 | 21.00 | 20.30 |
| Shares (crore) | 2.00 | 1.50 | 1.50 |
| **EPS (₹)** | **11.25** | **14.00** | **13.53** |

Debt wins at this EBIT. It would beat preference shares even at the same rate (SM Illustration 11: 8% debt against 8% preference shares), because interest is deducted before tax and preference dividend after it. Theoretically the choice is tilted in favour of debt for two reasons: the explicit cost of debt (interest) is generally lower than the preference dividend rate, and interest is tax-deductible, so its real (after-tax) cost is lower (SM 5.33). Here 10% × (1 − 0.25) = 7.5% after tax, against 11% for the preference shares.

### The financial break-even point: where EPS hits zero

==Financial break-even point is the minimum level of EBIT needed to satisfy all the fixed financial charges==, i.e. interest and preference dividends; it is the level of EBIT at which EPS equals zero (SM 5.36):

$$\text{Financial BEP} = \text{Interest} + \frac{\text{Preference dividend}}{1 - t}$$

The preference dividend is grossed up because it is paid out of profit after tax. Tapri: plan A, nil; plan B, ₹2 crore; plan C, ₹2.20 crore ÷ 0.75 = ₹2.93 crore. If EBIT is below the financial BEP, EPS is negative; if the expected EBIT is comfortably above it, more fixed-cost financing can be taken; otherwise equity would be preferred.

### The indifference point: where two plans tie

Plot each plan's EPS against EBIT: each gives a straight line, starting at its financial BEP. Where two lines intersect is the **EPS equivalency point** or **indifference point**: between those two plans, EPS is the same at that EBIT (SM 5.36–5.37). Algebraically:

$$\frac{(\text{EBIT} - I_1)(1-t)}{E_1} = \qquad \frac{(\text{EBIT} - I_2)(1-t)}{E_2}$$

Tapri, A against B: EBIT × 0.75 ÷ 2 = (EBIT − 2) × 0.75 ÷ 1.5, so 1.5 EBIT = 2 EBIT − 4, and **EBIT = ₹8 crore** (EPS ₹3.00 under both). A against C, with the preference dividend deducted after tax: 0.75 EBIT ÷ 2 = (0.75 EBIT − 2.2) ÷ 1.5, so **EBIT = ₹11.73 crore** (EPS ₹4.40).

::: diagram Tapri's EBIT-EPS chart
{"type": "plot", "h": 330, "x": [0, 16], "y": [-2, 8],
 "xlabel": "EBIT (₹ crore)", "ylabel": "EPS (₹)",
 "xticks": [0, 2, 4, 6, 8, [11.733, "11.73"], 14, 16],
 "yticks": [-2, 0, 2, 4, 6, 8],
 "legend": "top-left",
 "series": [
  {"label": "A: equity", "fn": "0.375*x", "color": "a"},
  {"label": "B: 10% debentures", "fn": "0.5*x-1", "color": "d"},
  {"label": "C: 11% preference", "fn": "0.5*x-1.4667", "color": "f", "dash": true},
  {"pts": [[8, -2], [8, 3]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[11.733, -2], [11.733, 4.4]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 8, "y": 3}, {"x": 11.733, "y": 4.4}, {"x": 2, "y": 0}, {"x": 2.933, "y": 0}],
 "caption": "Blue: plan A; orange: plan B; violet dashed: plan C. Dots on the x-axis: the financial BEPs of B (₹2 crore) and C (₹2.93 crore). Grey dashed: the indifference points, A = B at ₹8 crore and A = C at ₹11.73 crore. B and C are parallel, so they never meet. Expected EBIT, ₹30 crore, lies far to the right."}
:::

**Same number of shares, no single indifference point.** If the amount of equity share capital is the same under two plans, one of two situations arises (SM 5.37–5.38):

1. **No indifference point**: if the after-tax cost of the other source is not the same under both plans, one plan is better than the other at all levels of EBIT. Plans B and C both have 1.5 crore shares, and B's after-tax cost (7.5%) is lower than C's (11%): B is better at every EBIT, so B dominates C.
2. **Many indifference points**: if the after-tax cost of the other source is the same under both plans, every EBIT is an indifference point.

### When leverage turns against you

At an EBIT of ₹6 crore, below both indifference points, the order reverses: EPS is ₹2.25 under A, ₹2.00 under B and ₹1.53 under C. When the rate of return on the total assets is less than the cost of debt, EPS falls with the degree of leverage (SM 5.35–5.36). That is why the expected EBIT must be compared with the indifference point, not just with today's figures: the further the expected EBIT sits above it, and the lower the chance of falling below it, the stronger the case for debt (SM 5.65).

## Formats and formulas

*Reproduce the EPS statement from memory; every EBIT-EPS answer starts with it.*

| Statement of EPS under alternative financing plans | Plan I (₹) | Plan II (₹) |
|---|---:|---:|
| EBIT | xxx | xxx |
| Less: Interest (existing + new) | (xxx) | (xxx) |
| EBT (PBT) | xxx | xxx |
| Less: Tax | (xxx) | (xxx) |
| PAT | xxx | xxx |
| Less: Preference dividend | (xxx) | (xxx) |
| Earnings available to equity shareholders | xxx | xxx |
| Number of equity shares (existing + new) | xxx | xxx |
| **EPS** | **xxx** | **xxx** |
| PE ratio | x | x |
| **MPS = EPS × PE ratio** | **xxx** | **xxx** |

::: formula Earnings per share
$$\text{EPS} = \frac{(\text{EBIT} - I)(1-t) - \text{PD}}{N}$$
I = interest, t = tax rate, PD = preference dividend, N = number of equity shares (existing + amount raised ÷ issue price).
:::

::: formula Financial break-even point
$$\text{Financial BEP} = I + \frac{\text{PD}}{1-t}$$
If the company has no preference shares, the financial BEP is simply the interest (SM 6.19).
:::

::: formula Indifference point between two plans
$$\frac{(\text{EBIT} - I_1)(1-t)}{E_1} = \qquad \frac{(\text{EBIT} - I_2)(1-t)}{E_2}$$
E₁, E₂ = number of equity shares and I₁, I₂ = interest under plans 1 and 2 (SM 5.37). With preference shares, deduct PD after tax: (EBIT − I₂)(1 − t) − PD₂ in the numerator.
:::

::: formula Market price per share
$$\text{MPS} = \text{EPS} \times \text{PE ratio} \qquad = \frac{\text{EPS}}{K_e}$$
(SM 5.32)
:::

::: definition Financial break-even point
Financial break-even point is the minimum level of EBIT needed to satisfy all the fixed financial charges i.e. interests and preference dividends. It denotes the level of EBIT for which the company's EPS equals zero. (SM 5.36)
:::

::: definition Indifference point
The EBIT at which the EPS lines of two alternatives of financing intersect: between the two given alternatives (regardless of leverage in the financial plans), EPS would be the same at that level of EBIT. Also called the EPS equivalency point. (SM 5.37)
:::

::: trick The one-line indifference formula
Write F for each plan's financial BEP (interest + PD ÷ (1 − t)) and E for its number of shares. Then EBIT at indifference = (E₁ × F₂ − E₂ × F₁) ÷ (E₁ − E₂). Tapri, A against C: (2 × 2.9333 − 1.5 × 0) ÷ 0.5 = ₹11.73 crore. Conditions: the same tax rate in both plans and E₁ ≠ E₂ (equal shares means no point or every point).
:::

## Worked examples

::::: example Kulhad Crafts: two mixes, one kiln
Kulhad Crafts Ltd, Tapri's pottery supplier, has 5,00,000 equity shares of ₹10 each and 10% debentures of ₹30,00,000. It needs ₹1,20,00,000 for a new kiln line and can issue equity shares of ₹10 at a premium of ₹10. Two plans are proposed:

| Particulars | Plan I (₹) | Plan II (₹) |
|---|---:|---:|
| Equity shares at ₹20 | 80,00,000 | 40,00,000 |
| 11% term loan | 40,00,000 | 80,00,000 |

The tax rate is 25%.

**Required:**

(i) Calculate the EBIT at the indifference point between the two plans and the EPS at that point.

(ii) Calculate the financial break-even point of each plan.

(iii) Calculate the EPS of each plan if EBIT after expansion is ₹36,00,000, and if it is only ₹18,00,000. State which plan is preferable in each case.

:::: answer Show the working
**Working notes**

1. Equity shares: Plan I = 5,00,000 + ₹80,00,000 ÷ ₹20 = **9,00,000**; Plan II = 5,00,000 + ₹40,00,000 ÷ ₹20 = **7,00,000**.
2. Interest: Plan I = ₹3,00,000 (existing) + 11% × ₹40,00,000 = **₹7,40,000**; Plan II = ₹3,00,000 + 11% × ₹80,00,000 = **₹11,80,000**.

**(i) Indifference point**

$$\frac{(\text{EBIT} - 7{,}40{,}000)(1 - 0.25)}{9{,}00{,}000} = \qquad \frac{(\text{EBIT} - 11{,}80{,}000)(1 - 0.25)}{7{,}00{,}000}$$

7 EBIT − 51,80,000 = 9 EBIT − 1,06,20,000, so 2 EBIT = 54,40,000 and **EBIT = ₹27,20,000**. EPS = (27,20,000 − 7,40,000) × 0.75 ÷ 9,00,000 = **₹1.65** under both plans.

**(ii) Financial break-even point** (no preference shares, so = interest): Plan I **₹7,40,000**; Plan II **₹11,80,000**.

**(iii) EPS at the two EBIT levels**

| EBIT of ₹36,00,000 | Plan I (₹) | Plan II (₹) |
|---|---:|---:|
| EBIT | 36,00,000 | 36,00,000 |
| Less: Interest | 7,40,000 | 11,80,000 |
| EBT | 28,60,000 | 24,20,000 |
| Less: Tax @ 25% | 7,15,000 | 6,05,000 |
| PAT | 21,45,000 | 18,15,000 |
| Equity shares | 9,00,000 | 7,00,000 |
| **EPS** | **2.38** | **2.59** |

| EBIT of ₹18,00,000 | Plan I (₹) | Plan II (₹) |
|---|---:|---:|
| EBIT | 18,00,000 | 18,00,000 |
| Less: Interest | 7,40,000 | 11,80,000 |
| EBT | 10,60,000 | 6,20,000 |
| Less: Tax @ 25% | 2,65,000 | 1,55,000 |
| PAT | 7,95,000 | 4,65,000 |
| Equity shares | 9,00,000 | 7,00,000 |
| **EPS** | **0.88** | **0.66** |

::: diagram Kulhad Crafts: the two EPS lines
{"type": "plot", "h": 300, "x": [0, 40], "y": [-1.5, 3.5],
 "xlabel": "EBIT (₹ lakh)", "ylabel": "EPS (₹)",
 "xticks": [0, 10, 20, 27.2, 36, 40], "yticks": [-1, 0, 1, 2, 3],
 "legend": "top-left",
 "series": [
  {"label": "Plan I", "fn": "0.75*(x-7.4)/9", "color": "a"},
  {"label": "Plan II", "fn": "0.75*(x-11.8)/7", "color": "d"},
  {"pts": [[27.2, -1.5], [27.2, 1.65]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 27.2, "y": 1.65}, {"x": 7.4, "y": 0}, {"x": 11.8, "y": 0}],
 "caption": "Blue: Plan I (more equity); orange: Plan II (more debt). Dots on the x-axis: the financial BEPs, ₹7.4 lakh and ₹11.8 lakh. Grey dashed: the indifference point, ₹27.2 lakh, where both EPS are ₹1.65. Below it Plan I gives the higher EPS; above it, Plan II."}
:::

**Comment.** At EBIT of ₹36,00,000, above the indifference point, Plan II gives the higher EPS: the use of more fixed-cost funds is beneficial and the financial leverage is favourable. At ₹18,00,000, below the indifference point, Plan I is preferable; Plan II's financial BEP of ₹11,80,000 also leaves less room before EPS turns negative.
::::
:::::

:::: example Tapri Cafés: EPS against MPS
Tapri Cafés Ltd, Tapri's listed café subsidiary, has a present capital structure of equity share capital of ₹10 crore (1,00,00,000 shares of ₹10 each), reserves of ₹50 crore and 10% debentures of ₹20 crore. Its shares sell at ₹135 at a PE ratio of 15. The tax rate is 25%.

Tapri Cafés needs ₹30 crore for 200 new kulhad cafés, which will add ₹7.50 crore a year to EBIT. Alternatives:

(I) Issue equity shares at ₹120 each (premium ₹110) for the whole amount.

(II) Issue equity shares at ₹120 for ₹15 crore and debentures for ₹15 crore.

(III) Issue debentures for the whole ₹30 crore.

New debentures carry 10% interest on the first ₹15 crore and 12% on any amount above it. If total debt exceeds 40% of (debt + net worth) at book value, the PE ratio will fall to 12; otherwise it stays at 15.

**Required:** Advise which alternative Tapri Cafés should choose to maximise the wealth of its shareholders.

::: answer Show the working
**Working note 1: present EBIT**

EPS = MPS ÷ PE = ₹135 ÷ 15 = ₹9; PAT = ₹9 × 1 crore shares = ₹9 crore; PBT = ₹9 crore ÷ (1 − 0.25) = ₹12 crore; EBIT = ₹12 crore + interest ₹2 crore = **₹14 crore**. After expansion, EBIT = ₹14 crore + ₹7.50 crore = **₹21.50 crore**.

**Working note 2: shares, interest and debt ratio**

| Particulars | I | II | III |
|---|---:|---:|---:|
| New shares (÷ ₹120) | 25,00,000 | 12,50,000 | — |
| Total shares | 1,25,00,000 | 1,12,50,000 | 1,00,00,000 |
| New interest (₹ crore) | — | 1.50 | 3.30 |
| Total debt (₹ crore) | 20 | 35 | 50 |
| Net worth (₹ crore) | 90 | 75 | 60 |
| Debt ratio | 18.18% | 31.82% | 45.45% |
| PE ratio | 15 | 15 | 12 |

Debt ratio = debt ÷ (debt + net worth). Interest under III = 10% × ₹15 crore + 12% × ₹15 crore = ₹1.50 crore + ₹1.80 crore = ₹3.30 crore; total interest = existing ₹2 crore + new.

**Statement of EPS and MPS** (₹ crore unless stated)

| Particulars | I | II | III |
|---|---:|---:|---:|
| EBIT | 21.500 | 21.500 | 21.500 |
| Less: Interest (WN 2) | 2.000 | 3.500 | 5.300 |
| EBT | 19.500 | 18.000 | 16.200 |
| Less: Tax @ 25% | 4.875 | 4.500 | 4.050 |
| PAT | 14.625 | 13.500 | 12.150 |
| Shares (crore) | 1.250 | 1.125 | 1.000 |
| **EPS (₹)** | **11.70** | **12.00** | **12.15** |
| PE ratio | 15 | 15 | 12 |
| **MPS (₹)** | **175.50** | **180.00** | **145.80** |

**Advice.** Alternative III gives the highest EPS (₹12.15), but its debt ratio of 45.45% crosses the 40% limit and the PE ratio falls to 12, so its MPS is the lowest. Alternative II gives the highest market price per share (₹180.00) and should be chosen: the objective is to maximise wealth, i.e. MPS, not EPS.
:::
::::

## Under the hood

### Reading the chart

Each EPS line has slope (1 − t) ÷ number of shares, so the plan with fewer shares (more debt or preference capital) is steeper, and it cuts the x-axis at its own financial BEP. A steeper line that starts further right must overtake the flatter one somewhere: that crossing is the indifference point. Two plans with the same number of shares give parallel lines, which is the Study Material's "no indifference point" case. The EBIT chart is also called the **range of earnings chart**, and EBIT-EPS break-even analysis is used for determining the appropriate amount of debt a company might carry (SM 5.36).

### Data that hides the EBIT

- **EBIT from the share price**: EPS = MPS ÷ PE, then PAT, then PBT = PAT ÷ (1 − t), then EBIT = PBT + interest (ICAI's answer to September 2024 Q3(b); Example 2 above).
- **EBIT after expansion not given**: assume the existing return on capital employed is maintained and apply it to the enlarged capital employed (SM Illustration 14).
- **"How much must EBIT rise before the next plan is best?"**: the indifference point minus the present EBIT (SM Practical Problem 5: ₹23,76,000 − ₹15,00,000 = ₹8,76,000 against equity).

### Back to the theory

Using EPS and then MPS with a PE ratio that falls as debt rises is the traditional approach of [[fm.cs.theories|capital structure theories]] in miniature: debt raises EPS, but beyond some point the market's capitalisation rate rises faster. The slope of an EPS line is also what the degree of financial leverage measures: with no preference shares, DFL = EBIT ÷ (EBIT − financial BEP); see [[fm.lev.leverage|operating, financial and combined leverage]].

## Exam angle

### What ICAI asks

::: exam In the ICAI documents read for this lesson (new scheme, May 2024 to September 2026)
EBIT-EPS analysis, the indifference point or the financial BEP appeared in 12 of the 32 question sets searched:

- **Case-scenario MCQs, 2 marks each**: January 2025 Case Scenario I, MCQs 1–5 (EPS, MPS at PE 12 and 15, financial BEP of ₹13,60,000 and ₹15,08,571, indifference point ₹34,40,000, EPS ₹1.30 at that point); MTP Series I for January 2025, MCQs 1–5 (three plans, two indifference points); single MCQs in MTP Series I for May 2024, Series II for January 2026 and Series II for May 2026 (find the preference dividend from a given indifference point).
- **Descriptive, 3–8 marks**: September 2024 Q3(b) (5 marks, EPS and MPS with a lower PE for the levered plan); MTP Series II for September 2024 Q1(a) (5 marks, debt-equity 2:1 insisted on by lenders); MTP Series I for May 2025 Q3(a) (3 marks, indifference with preference shares, plus financial BEP); MTP Series II for September 2026 Q3(a) (8 marks); RTP May 2025 Q6 (advise between two plans on earnings).
- **Theory, 2 marks**: "Discuss financial break-even and EBIT-EPS indifference analysis" (MTP Series I for January 2026); "Explain the relationship between EBIT-EPS-MPS" (MTP Series II for September 2024); "Discuss optimal capital structure and how to analyse it" (MTP Series I for May 2025, Series II for September 2025).
:::

::: exam The traps in those answers
- New shares are issued at a premium: divide the amount by the issue price, not the face value (January 2025, plan I: ₹30 lakh ÷ ₹25 = 1,20,000 shares).
- Existing interest and existing shares go into every plan (January 2025: the 15% debentures of ₹30 lakh appear in both plans).
- Financial BEP with preference shares grosses the dividend up: ₹11,00,000 + ₹2,86,000 ÷ 0.70 = ₹15,08,571 (January 2025, plan II).
- With different PE ratios, the decision is on MPS (September 2024 Q3(b); SM Illustration 14: "though loan option has higher EPS but equity option has higher MPS").
- "Find the preference dividend from the indifference point" (SM Practical Problem 2; MTP Series II for May 2026, MCQ 7) gives both plans the same number of equity shares. Equate the two EPS at the given EBIT: the answer is always interest × (1 − t) (₹24,000 × 0.70 = ₹16,800 in the MTP), because equal shares and equal after-tax costs make every EBIT an indifference point.
- ICAI's answer to MTP Series II for September 2024 Q1(a) sets the plans out as a statement in terms of E and adds "Presentation of solution may differ": the equation layout of the Study Material is equally acceptable, with working notes either way.
:::

## Answer frame

### The theory questions

**"Discuss financial break-even and EBIT-EPS indifference analysis"** (MTP Series I for January 2026; SM 5.36–5.37):

1. Financial BEP: the minimum EBIT needed to satisfy all fixed financial charges (interest and preference dividend); EBIT at which EPS = 0; formula interest + preference dividend ÷ (1 − t).
2. Below it EPS is negative; if expected EBIT is above it, more fixed-cost financing can be taken, otherwise equity is preferred.
3. EBIT-EPS indifference: the EBIT at which EPS is the same under two financing plans; formula (EBIT − I₁)(1 − t) ÷ E₁ = (EBIT − I₂)(1 − t) ÷ E₂, symbols defined.
4. It is a vital tool for designing the optimal capital structure.

**"Explain the relationship between EBIT-EPS-MPS"** (MTP Series II for September 2024; SM 5.33): the objective is the highest MPS, which depends on EPS; at a given EBIT, EPS differs with the financing mix because of fixed financial charges; if the return on assets exceeds the cost of fixed-charge funds, EPS rises (favourable leverage, trading on equity), otherwise it falls; debt is preferred to preference shares because of lower cost and tax-deductible interest.

### Three answers to "Calculate the indifference point"

::: cols
**Loses marks**

"EBIT = ₹27.2 lakh."

No equation, no shares, no interest: nothing to award if a figure slips.
---
**Passes**

The equation with figures, but 4,00,000 new shares (₹80 lakh ÷ ₹20) left out the existing 5,00,000.

Method marks only.
---
**Full marks**

Working notes for shares (existing + amount ÷ issue price) and interest (existing + new); the equation; the solution; the EPS at the point as a check; a one-line comment on which plan to prefer above and below it.
:::

## Common mistakes

::: mistake Hall of Shame: new shares at face value
₹80 lakh ÷ ₹10 = 8,00,000 new shares when the issue price is ₹20 doubles the dilution and wrecks every EPS. **Fix:** new shares = amount raised ÷ issue price (face value + premium).
:::

::: mistake Preference dividend treated like interest
Deducting the preference dividend before tax, or adding it to the financial BEP without grossing it up (₹2.20 crore instead of ₹2.93 crore for Tapri's plan C). **Fix:** it comes out of PAT; in the financial BEP, divide it by (1 − t).
:::

::: mistake The forgotten old loan
Writing only the new interest and the new shares into each plan. **Fix:** every plan carries the existing interest and the existing shares; only the new money differs.
:::

::: mistake Highest EPS crowned the winner
When the question gives a PE ratio that changes with leverage, the winner is the highest MPS. In Example 2 the all-debt plan has the best EPS and the worst MPS.
:::

## Practice

::: quiz Check yourself
Q: Plan X is all equity with 6,00,000 shares. Plan Y has 2,00,000 shares and debt with annual interest of ₹6,00,000. The tax rate is 30%. At what EBIT (₹) are the EPS of the two plans equal?
= 900000
> EBIT × 0.70 ÷ 6,00,000 = (EBIT − 6,00,000) × 0.70 ÷ 2,00,000, so 2 EBIT = 6 EBIT − 36,00,000 and EBIT = ₹9,00,000.

Q: A company pays interest of ₹4,00,000 and preference dividend of ₹2,10,000. The tax rate is 30%. What is its financial break-even point?
- [ ] ₹6,10,000
- [x] ₹7,00,000
- [ ] ₹6,73,000
- [ ] ₹4,00,000
> Interest + preference dividend ÷ (1 − t) = ₹4,00,000 + ₹2,10,000 ÷ 0.70 = ₹7,00,000. ₹6,10,000 forgets to gross up; ₹6,73,000 multiplies by 1.3 instead of dividing by 0.7; ₹4,00,000 ignores the preference dividend.

Q: Case scenario. Tapri's indifference point between all-equity plan A and debenture plan B is EBIT of ₹8 crore. After a poor monsoon, Ritu now expects EBIT of only ₹6 crore for the next few years. Which advice is correct?
- [ ] Plan B, because debt is always cheaper than equity
- [x] Plan A, because below the indifference point the equity plan gives the higher EPS
- [ ] Either plan, because EPS is equal below the indifference point
- [ ] Plan B, because its financial break-even point is lower than plan A's
> Below the indifference point the plan with less fixed-charge financing gives the higher EPS (₹2.25 against ₹2.00 at ₹6 crore). Plan B's financial BEP is ₹2 crore, higher than plan A's nil.

Q: Plan I: 60,000 equity shares of ₹10 and 10% debentures of ₹4,00,000. Plan II: 60,000 equity shares of ₹10 and preference shares of ₹4,00,000. The indifference point is EBIT of ₹3,00,000 and the tax rate is 25%. What is the rate of preference dividend?
- [ ] 10%
- [ ] 13.33%
- [x] 7.5%
- [ ] 5.625%
> (3,00,000 − 40,000) × 0.75 ÷ 60,000 = (3,00,000 × 0.75 − PD) ÷ 60,000, so 1,95,000 = 2,25,000 − PD and PD = ₹30,000, i.e. 7.5% of ₹4,00,000. 10% ignores tax; 13.33% divides the interest by (1 − t) instead of multiplying; 5.625% applies tax to the dividend again. With equal shares the EBIT drops out: PD = interest × (1 − t) = ₹40,000 × 0.75 whatever the EBIT, so the two plans tie at every EBIT (the Study Material's "many indifference points" case). ICAI sets this pattern too (SM Practical Problem 2).

Q: Which statements about EBIT-EPS analysis are correct? Select all that apply.
- [x] At the indifference point the EPS of the two plans are equal
- [x] Two plans with the same number of equity shares but different after-tax costs of the other source have no indifference point
- [ ] At the financial break-even point the EPS of the two plans are equal
- [x] Above the indifference point, the plan with more fixed-charge financing gives the higher EPS
> The financial BEP is where a plan's EPS is zero, not where two plans tie. The other three are the Study Material's rules.
:::

## Recap

- EPS = [(EBIT − I)(1 − t) − PD] ÷ N; new shares = amount ÷ issue price.
- Same EBIT for every plan; existing interest and shares go into every plan.
- Financial BEP = I + PD ÷ (1 − t): the EBIT at which EPS = 0.
- Indifference point: (EBIT − I₁)(1 − t) ÷ E₁ = (EBIT − I₂)(1 − t) ÷ E₂; deduct PD after tax where there are preference shares.
- Above the indifference point: more debt gives more EPS. Below: more equity.
- Same number of shares: no indifference point (different after-tax costs) or every EBIT is one (same costs).
- Debt beats preference shares: its rate is usually lower and its interest is tax-deductible, so it wins even at the same rate.
- Different PE ratios: choose the highest MPS, not the highest EPS. (The pass beats the card only if you ride enough.)

## Flashcards

Q:: Define the financial break-even point (ICAI).
A:: The minimum level of EBIT needed to satisfy all the fixed financial charges, i.e. interest and preference dividends; the EBIT at which EPS equals zero.

Q:: Formula: financial break-even point?
A:: Interest + preference dividend ÷ (1 − tax rate).

Q:: What is the indifference point?
A:: The EBIT at which EPS is the same under two financing alternatives: the point where their EPS lines intersect on the EBIT-EPS chart (EPS equivalency point).

Q:: Formula: indifference point between two plans with debt?
A:: (EBIT − I₁)(1 − t) ÷ E₁ = (EBIT − I₂)(1 − t) ÷ E₂, where E = number of equity shares and I = interest.

Q:: Two plans have the same equity share capital. When is there no indifference point?
A:: When the after-tax cost of the other source differs between the plans: one plan is better at every EBIT.

Q:: Two plans have the same equity share capital and the same after-tax cost of the other source. What follows?
A:: Every EBIT is an indifference point.

Q:: Why is debt generally preferred to preference shares in EBIT-EPS analysis?
A:: Interest is usually lower than the preference dividend rate, and interest is tax-deductible, so its after-tax cost is lower.

Q:: When does fixed-charge financing increase EPS?
A:: When the rate of return on assets is higher than the cost of the fixed-charge funds: favourable financial leverage, or trading on equity.

Q:: Plans have different PE ratios. Which plan is chosen?
A:: The one with the highest market price per share (EPS × PE ratio), even if its EPS is lower.

Q:: Number of new shares when shares of ₹10 are issued at a premium of ₹15?
A:: Amount raised ÷ ₹25, the issue price.

Q:: ICAI's three analyses for choosing an optimal capital structure?
A:: EBIT-EPS-MPS analysis, indifference point analysis and financial break-even point analysis.
