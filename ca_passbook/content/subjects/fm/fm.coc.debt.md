---
id: fm.coc.debt
title: Cost of debt and of preference capital
minutes: 35
needs: fm.sources.long
tags: cost of debt, cost of preference shares, YTM, redeemable debentures, convertible debentures, flotation cost, tax shield
labs: wacc
summary: What a loan, a debenture or a preference share really costs: net proceeds, after-tax interest, the approximation formula, YTM, convertibles and preference capital.
---

## In plain words

### Kesar finds the "cheap" money

Tapri Tea Co. Ltd needs ₹60 crore for 40 new kulhad cafés and a cold-chain fleet, and Kesar has two offers on his desk.

> **Kesar:** The bank wants 12% interest. Preference shareholders want only 10% dividend. Preference is cheaper. Done!
> **Dev:** Interest is a tax-deductible expense. At our 25% tax rate the taxman pays a quarter of every interest rupee, so the loan really costs 12% × 0.75 = 9%. Preference dividend is paid out of profit after tax: 10% stays 10%.
> **Kesar:** So the expensive one is the cheap one?
> **Dev:** And our old 9% debentures trade at ₹90, not ₹100. Anyone buying them today expects more than 9%. A source costs what its providers expect, not what is printed on it.

Every rupee a company raises has a price: the **cost of capital**, the return the providers of the money expect as compensation for it (SM 4.2). For a loan or a debenture it is the **cost of debt (Kd)**; for preference shares, the **cost of preference capital (Kp)**.

Three things decide it. First, what the company actually receives: a ₹100 debenture sold at ₹96, with ₹2 of brokerage, brings in only ₹94, its **net proceeds**. Second, what it pays out: interest every year and the redemption amount at the end. Third, tax: interest saves tax, a preference dividend does not. The cost is the rate at which what comes in today equals the present value of what goes out later, after tax.

::: analogy The "no-cost EMI"
A shop sells a ₹30,000 phone on a "no-cost EMI" of ₹2,500 a month for a year, plus a ₹1,500 processing fee on day one. The sticker says 0%, yet you pay ₹31,500 for ₹30,000 of phone: the real rate is the one that equates what you got with what you pay. A debenture's coupon is the sticker; its cost is the real rate after the discount, the brokerage and any redemption premium. And if the government refunded a quarter of every interest rupee you paid, your real rate would drop by a quarter: that refund is the tax shield.
:::

::: key
The cost of debt is the rate at which the net proceeds received today equal the present value of the after-tax interest and the redemption value. Interest is tax-deductible, so Kd is an after-tax cost; preference dividend is not, so Kp gets no tax adjustment.
:::

## How it works

### Cost is what the market expects

ICAI's own example (SM 4.3): a company issues 9% debentures, but investors expect 10%, so they subscribe only at a discount and the cost is not 9% but 10%. Commission and brokerage paid to intermediaries push it above 10%; the tax deductibility of interest pulls it down. To find the cost, identify three kinds of cash flow (SM 4.3–4.4):

1. the inflow of the amount received at the beginning;
2. the outflows of payment of interest, dividend, redemption amount and so on;
3. the inflow of tax benefit on interest, or the outflow of payment of dividend tax.

The rate at which the present value of the outflows equals the inflow is an IRR. In investment decisions the IRR is an income, because an outflow comes first; here an inflow comes first, so ==the IRR represents cost== (SM 4.4). The shortcut formulas are easier, but they give approximate answers.

### What a debenture carries

Five features decide its cash flows (SM 4.5–4.6): **face value** (interest is calculated on it), **interest (coupon) rate** (fixed, except for zero coupon and deep discount bonds), **maturity period** (taken as infinite for irredeemable debentures), **redemption value** (fixed by the debt covenants; it may differ from face value) and the **tax shield**: interest is allowed as an expense for corporate tax, so it saves tax. In ICAI's Example 1, ₹40 lakh of interest at 35% tax saves ₹14 lakh, so the effective interest is ₹26 lakh.

A loan from a financial institution is costed like a redeemable debenture (SM 4.5); a term loan taken and repaid at par costs simply I(1 − t), as the Suggested Answers compute it (May 2024: 11% × 0.75 = 8.25%; January 2025: 12% × 0.70 = 8.4%).

### Six steps from a term sheet to a cost

::: steps
1. **Net proceeds (NP)** = issue price − flotation cost. No issue price given: use the current market price, which is also the figure for existing debt. No issue expenses given: take them as zero (SM 4.7).
2. **After-tax interest** = I(1 − t), with I the coupon on the face value.
3. **Irredeemable debentures**: Kd = I(1 − t) ÷ NP.
4. **Redeemable debentures**: to the after-tax interest add the gap between the redemption value (RV) and NP spread over the remaining life, (RV − NP) ÷ n, and divide by the average of RV and NP (the **approximation method**); or find the **yield to maturity (YTM)**, the IRR of the cash flows.
5. **Convertible debentures**: RV is the higher of the cash value and the value of the shares at maturity, as holders choose the more attractive option (SM 4.15).
6. **Preference shares**: the same formulas with the dividend in place of interest, and no tax adjustment.
:::

::: diagram Which formula for a debt instrument?
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "A debt instrument"},
  {"id": "d1", "kind": "decision", "label": "Redeemable?"},
  {"id": "ir", "kind": "end", "label": "I(1 − t) ÷ NP", "color": "a"},
  {"id": "rv", "kind": "process", "label": "Fix RV (step 5\nfor convertibles)"},
  {"id": "d3", "kind": "decision", "label": "RV far from NP, or\ngradual redemption?"},
  {"id": "y", "kind": "end", "label": "YTM (IRR)", "color": "b"},
  {"id": "d4", "kind": "decision", "label": "Discount, premium\ntax-deductible?"},
  {"id": "f2", "kind": "end", "label": "Formula 2", "color": "c"},
  {"id": "f1", "kind": "end", "label": "Formula 1", "color": "d"}],
 "edges": [["s", "d1"], ["d1", "ir", "no"], ["d1", "rv", "yes"], ["rv", "d3"], ["d3", "y", "yes"], ["d3", "d4", "no"], ["d4", "f2", "yes"], ["d4", "f1", "no"]],
 "caption": "Formula 1 taxes only the interest; Formula 2 also gives tax relief on the discount and premium (both in Formats and formulas). With no information on that, either may be used with a logical assumption (SM 4.9). The approximations lose accuracy as RV and NP move apart and do not suit gradual redemption; the YTM is the superior method (SM 4.12)."}
:::

::: lab wacc {"part":"debt","dtype":"red","coupon":10,"issue":110,"rv":100,"years":5,"tax":35,"method":"approx"}
Step through Study Material Illustration 2 by Formula 1: the after-tax interest, the premium spread over five years, then the average of RV and NP.
:::

### The YTM: the debenture's own IRR

The YTM is the internal rate of return at which the current price of a debt equals the present value of all its cash flows (SM 4.11). Take Tapri's existing 10% debentures: quoted at ₹92, redeemable at par in 6 years, tax 25%. Year 0 is ₹92 received (the price, as for existing debt); years 1 to 6 carry ₹7.50 of after-tax interest; year 6 also carries the ₹100 redemption. Discount these at two rates, one giving a positive and one a negative NPV, and interpolate between them (SM 4.11–4.12).

::: diagram Tapri's 10% debentures: NPV at each discount rate
{"type": "plot", "h": 330, "x": [4, 16], "y": [-25, 30],
 "xlabel": "discount rate (%)", "ylabel": "NPV per debenture (₹)",
 "xticks": [4, 6, 8, 10, 12, 14, 16], "yticks": [-20, -10, 0, 10, 20, 30],
 "series": [
  {"label": "NPV of the cash flows", "fn": "-92 + 7.5*(1 - 1/(1+x/100)^6)/(x/100) + 100/(1+x/100)^6", "color": "a"},
  {"label": "chord, 8% to 10%", "pts": [[8, 5.69], [10, -2.89]], "color": "g"},
  {"label": "chord, 6% to 14%", "pts": [[6, 15.38], [14, -17.28]], "color": "d", "dash": true},
  {"pts": [[4, 0], [16, 0]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 9.30, "y": 0, "label": "YTM 9.30%", "pos": "below"}, {"x": 9.77, "y": 0, "label": "9.77%", "pos": "above"}],
 "caption": "Blue: the NPV curve; it cuts zero at the true YTM, 9.30%. Interpolation puts a straight chord between two trial rates instead: the green one from 8% to 10% hugs the curve and cuts zero at 9.33%; the dashed orange one from 6% to 14% cuts it at 9.77%. The wider the gap between the two rates, the less accurate the answer (SM 4.12)."}
:::

### Preference capital

Preference shareholders are paid a dividend at a specified rate on face value. Paying it is not mandatory, but it has priority over the equity dividend, and it is an appropriation of after-tax profit, so it does not reduce the tax liability (SM 4.16). An **irredeemable preference share** is a perpetuity: Kp = dividend ÷ net proceeds. A **redeemable preference share** uses the approximation formula with the dividend in place of after-tax interest, or the discount rate that equates the net proceeds with the present value of future dividends and redemption (SM 4.18).

## Formats and formulas

*Reproduce each formula, its symbols and the YTM layout from memory.*

::: formula Irredeemable debentures (SM 4.7)
$$K_d = \frac{I\,(1-t)}{NP}$$
Kd = cost of debt after tax; I = annual interest payment; NP = net proceeds of debentures or current market price; t = tax rate.
:::

::: formula Redeemable debentures: Formula 1, only interest tax-deductible (SM 4.8)
$$K_d = \frac{I\,(1-t) + \dfrac{RV - NP}{n}}{\dfrac{RV + NP}{2}}$$
RV = redemption value; n = remaining life of the debentures.
:::

::: formula Redeemable debentures: Formula 2, discount and premium also tax-deductible (SM 4.9)
$$K_d = \frac{\left(I + \dfrac{RV - NP}{n}\right)(1-t)}{\dfrac{RV + NP}{2}}$$
:::

::: formula YTM by interpolation (SM 4.12)
$$K_d = L + \frac{NPV_L}{NPV_L - NPV_H} \times (H - L)$$
L and H = the lower and higher trial rates; $NPV_L$ and $NPV_H$ = the NPVs of the cash flows at those rates.
:::

::: formula Zero coupon and deep discount bonds (SM 4.12)
$$RV = NP \times (1 + K_d)^{n}$$
No interest is paid, so the whole return is the gap between issue price and redemption value.
:::

::: formula Value of an amortised bond (SM 4.13)
$$V_B = \sum_{t=1}^{n} \frac{C_t}{(1+K_d)^{t}}$$
$C_t$ = principal repaid in year t + interest on the amount outstanding; the cost of such a bond is the rate that equates these uneven flows with its net proceeds.
:::

::: formula Convertible debentures: redemption value (SM 4.15)
$$RV = \text{higher of} \qquad \big(\text{cash value},\ N \times P_0 (1+g)^{n}\big)$$
N = shares per debenture; $P_0$ = current share price; g = its expected growth rate; n = years to maturity. Then apply Formula 1 or the YTM.
:::

::: formula Preference shares (SM 4.17–4.18)
$$K_p = \frac{PD}{P_0} \qquad K_p = \frac{PD + \dfrac{RV - NP}{n}}{\dfrac{RV + NP}{2}}$$
PD = annual preference dividend; $P_0$ or NP = net proceeds from the issue. The first is for irredeemable shares, the second for redeemable ones.
:::

::: definition Flotation cost
The new issue of a security (debt or equity) involves some expenditure in the form of underwriting or brokerage fees, legal and administrative charges, registration fees, printing expenses etc. The sum of all these costs is known as floatation cost. (SM 4.7)
:::

::: definition Net proceeds
Issue price less issue expenses or floatation cost. If the issue price is not given, it may be assumed equal to the current market price; if issue expenses are not given, they are taken as zero. (SM 4.7)
:::

::: definition Yield to maturity (YTM)
The annual return of an investment from the current date till maturity date: the internal rate of return at which the current price of a debt equals the present value of all cash flows. (SM 4.11)
:::

### The YTM working, ICAI's layout

| Year | Cash flow | PV at L (₹) | PV at H (₹) |
|---|---|---:|---:|
| 0 | NP (new issue) or P0 (existing debt) | (NP) × 1.000 | (NP) × 1.000 |
| 1 to n | Interest net of tax, I(1 − t) | × PVAF (L, n) | × PVAF (H, n) |
| n | Redemption value, RV | × PVF (L, n) | × PVF (H, n) |
| | **NPV** | **+ (NPV at L)** | **− (NPV at H)** |

ICAI prints each discount factor in its own column (six columns in all); write it that way on paper. Then interpolate.

::: lab wacc {"part":"debt","dtype":"red","coupon":10,"issue":80,"rv":100,"years":5,"tax":35,"method":"ytm","lo":10,"hi":15}
The same layout on Study Material Example 2: NPV at 10% and at 15%, then the interpolated YTM beside the true yield.
:::

## Worked examples

:::: example Tapri's new debenture, priced three ways
Tapri Tea Co. Ltd plans to issue 11% debentures of ₹100 each at a discount of 4%, redeemable at a premium of 5% after 8 years. Flotation cost is 2% of the face value, and the tax rate is 25%. Tapri's existing 9% irredeemable debentures of ₹100 each are quoted at ₹90.

PV factors: PVAF (8%, 8 years) 5.747 and PVF (8%, year 8) 0.540; PVAF (10%, 8 years) 5.335 and PVF (10%, year 8) 0.467.

**Required:**

(i) Calculate the cost of the new debentures by the approximation method, taking only the interest as tax-deductible.

(ii) Recalculate it if the discount on issue and the premium on redemption are also tax-deductible.

(iii) Calculate the cost of the new debentures by the YTM method.

(iv) Calculate the current cost of the existing irredeemable debentures.

::: answer Show the working
**Working note.** NP = ₹100 − ₹4 discount − ₹2 flotation = **₹94**; RV = **₹105**; n = 8; I = ₹11; I(1 − t) = ₹11 × 0.75 = **₹8.25**; (RV − NP) ÷ n = ₹11 ÷ 8 = ₹1.375; (RV + NP) ÷ 2 = ₹99.50.

**(i) Approximation method, Formula 1**

$$K_d = \frac{8.25 + \dfrac{105 - 94}{8}}{\dfrac{105 + 94}{2}} \qquad = \frac{9.625}{99.50} = 0.0967 \text{ or } 9.67\%$$

**(ii) Formula 2, discount and premium tax-deductible**

$$K_d = \frac{\left(11 + 1.375\right)(1 - 0.25)}{99.50} \qquad = \frac{9.281}{99.50} = 0.0933 \text{ or } 9.33\%$$

**(iii) YTM method**

| Year | Cash flow (₹) | PV @ 8% (₹) | PV @ 10% (₹) |
|---|---:|---:|---:|
| 0 | (94.00) | (94.00) | (94.00) |
| 1 to 8 | 8.25 | 47.41 | 44.01 |
| 8 | 105.00 | 56.70 | 49.04 |
| **NPV** | | **+10.11** | **−0.95** |

$$K_d = 8\% + \frac{10.11}{10.11 - (-0.95)} \times (10\% - 8\%) \qquad = 8\% + 1.83\% = 9.83\%$$

**(iv) Existing irredeemable debentures**, on the current market price:

$$K_d = \frac{9 \times (1 - 0.25)}{90} = \frac{6.75}{90} = 7.50\%$$

**Comment.** The approximation (9.67%) is 0.16 percentage points below the YTM (9.83%; a financial calculator gives 9.81%); the YTM is the superior method (SM 4.12). The old debentures cost 7.50%, not 6.75%: they trade below par, so today's investors expect more than the coupon. Rounding: factors to three decimals as given (the annuity factors are the table's, rounded once; adding the eight yearly factors gives 5.746 and 5.334 and the same 9.83%), present values to two, rates to two.
:::
::::

:::: example Kulhad Capital: a convertible, a term loan and two preference shares
Dev is pricing four sources for the café expansion. The tax rate is 25%.

(A) 9% convertible debentures of ₹100 each, to be issued at ₹98 with a flotation cost of ₹1 per debenture, maturing in 5 years. At maturity each holder may take ₹110 in cash or 3 equity shares. Tapri's share is quoted at ₹28 and is expected to grow at 5% a year.

(B) A 10.5% term loan of ₹5 crore from Indore Sahakari Bank, repayable in one sum after 4 years. The bank deducts a processing fee of 2% of the loan when it pays out.

(C) 9% irredeemable preference shares of ₹100 each, issued at par years ago and now quoted at ₹75.

(D) New 10% preference shares of ₹100 each, to be issued at par with a flotation cost of 3%, redeemable at a premium of 5% after 6 years.

**Required:** Calculate the cost of each source, using the approximation method where a formula is needed.

::: answer Show the working
**(A) Convertible debentures**

Value of 3 shares after 5 years = ₹28 × (1.05)⁵ × 3 = ₹35.736 × 3 = ₹107.21. This is lower than the cash option of ₹110, so holders will take the cash: **RV = ₹110**. NP = ₹98 − ₹1 = ₹97; n = 5; I(1 − t) = ₹9 × 0.75 = ₹6.75.

$$K_d = \frac{6.75 + \dfrac{110 - 97}{5}}{\dfrac{110 + 97}{2}} \qquad = \frac{6.75 + 2.60}{103.50} = 0.0903 \text{ or } 9.03\%$$

**(B) Term loan.** The fee means Tapri receives only ₹98 for every ₹100 it repays, so the loan is costed like a redeemable debenture (SM 4.5): NP = ₹98, RV = ₹100, n = 4, I(1 − t) = ₹10.50 × 0.75 = ₹7.875.

$$K_d = \frac{7.875 + \dfrac{100 - 98}{4}}{\dfrac{100 + 98}{2}} \qquad = \frac{8.375}{99} = 0.0846 \text{ or } 8.46\%$$

Without the fee it would be 10.5% × 0.75 = 7.875%.

**(C) Irredeemable preference shares**, on the current market price: Kp = ₹9 ÷ ₹75 = **12.00%**.

**(D) Redeemable preference shares**

NP = ₹100 − 3% = **₹97**; RV = **₹105**; n = 6.

$$K_p = \frac{10 + \dfrac{105 - 97}{6}}{\dfrac{105 + 97}{2}} \qquad = \frac{11.333}{101} = 0.1122 \text{ or } 11.22\%$$

**Comment.** Both preference issues (11.22% and 12.00%) cost more than either debt (9.03% and 8.46%): there is no tax shield on a dividend. The convertible's conversion option is worth less than the cash at maturity, so its cost is set by the ₹110 redemption, exactly as for a redeemable debenture.
:::
::::

::: lab wacc {"part":"pref","ptype":"red","face":1000,"prate":10,"issue":1000,"rv":1065.4,"years":3,"pmethod":"ytm","lo":10,"hi":14}
Here is May 2025 Q2(a): a redeemable preference share whose cost is found by YTM between 10% and 14%.
:::

## Under the hood

### Deep discount bonds: the whole return at the end

A zero coupon or deep discount bond pays no interest, so RV and NP are far apart and the approximation formula should not be used: solve FV = PV × (1 + r)ⁿ by trial (SM 4.12–4.13). A ₹1,00,000 bond issued at ₹40,000 for 10 years, with no tax: (1 + r)¹⁰ = 2.5. At 9%, (1.09)¹⁰ = 2.367; at 10%, 2.594. Interpolating, r = 9% + (2.5 − 2.367) ÷ (2.594 − 2.367) × 1% = **9.59%** (exactly 9.60%).

### Amortised bonds: shrinking interest

When principal is repaid every year, interest is on the outstanding amount and the cash flows are uneven (SM 4.13); the approximation formulas do not suit such gradual redemption (SM 4.9). ICAI's Illustration 5 values a ₹5,000, 8%, five-year bond repaid ₹1,000 a year: the outflows run ₹1,400, ₹1,320, ₹1,240, ₹1,160, ₹1,080, and at an investor's 6% they are worth ₹5,262.62 (ICAI's figure, with the divisors rounded to four decimals; unrounded, ₹5,262.55). To the issuer, the cost of such a bond is the rate that equates its net proceeds with these uneven outflows (interest net of tax where tax applies), found by trial and error: MTP Series I for September 2024 MCQ 3 asked exactly this, with tax ignored.

### Why the two formulas differ

Formula 1 gives tax relief only on the interest, so the yearly share of the discount or premium, (RV − NP) ÷ n, enters at its full amount; Formula 2 lets the tax rate act on it too. With a discount on issue, Formula 2 is lower (Tapri: 9.33% against 9.67%); with an issue premium and redemption at par, (RV − NP) is negative and Formula 2 is higher. Name the formula you use.

### Next door

The instruments themselves (debentures, bonds, term loans, preference shares) are described in [[fm.sources.long|long-term sources of finance]]. The YTM is an IRR, and interpolating between two trial rates is taught in full in [[fm.capbud.irr|IRR and MIRR]]. The cost of equity comes next in [[fm.coc.equity|the cost of equity and retained earnings]], and every cost in this lesson is weighted into [[fm.coc.wacc|the WACC]].

## Exam angle

::: exam Where these costs appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, a cost of debt or of preference capital came up 16 times in 13 documents, usually for 1–3 marks inside a 5–8 mark question that also asks for the cost of equity or the WACC:
- **Convertible debentures**: May 2024 Q2(a) (6 marks), January 2025 Q2(a) (7 marks), January 2026 MCQs 2–3, RTP January 2026 Q6 (May 2024's question again), MTP Series II for May 2025 Q1(b) (5 marks, approximation and YTM, with 75% of holders converting).
- **Theory**: "EXPLAIN any four Features of Debentures or Bonds", MTP Series II for May 2025 Q4(b) (4 marks); the Suggested Answer is the Study Material's five features almost word for word.
- **YTM**: September 2024 Q2(a) (8 marks, debentures); May 2025 Q2(a) (8 marks, preference shares, then the debenture rate solved backwards from a given WACC of 14%).
- **Irredeemable preference and reverse problems**: September 2025 Q1(a) (5 marks) and Q3(b) (3 marks: the issue price from a given Kd of 14.58%).
- **MCQs**: January 2026 MCQ 1 (Kp net of 4% flotation), MTP Series I for May 2025 MCQ 8 (issue at a premium), MTP Series I for September 2024 MCQ 3 (an amortised debenture by IRR), September 2026 MCQ 1 (a tax holiday).
- **RTPs**: January 2025 Q5, May 2026 Q5 (Formula 2, then the tax rate solved backwards).
:::

::: exam The traps ICAI used
- **Which price is NP for an existing security?** September 2025 Q1(a): the Suggested Answer used the issue price, ₹45 (Kp 17.78%), and the market price, ₹55 (14.55%), as an alternative. January 2025 Q2(a): market value ₹108 (19.52%), alternative ₹100 (20.55%). January 2026 MCQ 3's key (30.74%) uses ₹100 though a market price of ₹150 is given. The Study Material uses the current market price for existing debt (SM 4.10): say which you use.
- **A missing redemption value**: May 2024 Q2(a)'s preference shares, "redeemable after eight years", were solved two ways (7% and 17%); RTP January 2026 Q6 repeats it with "at par".
- **Remaining life**: debentures issued on 1.4.2023 for 6 years and costed on 31.3.2024 have n = 5 (May 2024 Q2(a) and RTP January 2026 Q6).
- **A tax holiday** (September 2026 MCQ 1 asks for the after-tax cost of debt during and after one): with no tax there is no shield, so during the holiday Kd is the pre-tax rate.
- **Annuity factors**: ICAI's answers do it both ways. September 2024 Q2(a) gave yearly factors and the answer added them (3.790 at 10% for 5 years, where the annuity table prints 3.791); May 2025 Q2(a) gave yearly factors but used the table's 2.487 and 2.322 for 3 years (the yearly factors add up to 2.486 and 2.321). Say which you use; the interpolated rate barely moves.
:::

::: trick When NP equals RV
If a debt is issued at par (net of costs) and redeemed at par, (RV − NP) is zero and both the approximation and the YTM give exactly I(1 − t) ÷ NP: the term-loan case. Condition: interest paid annually on the face value.
:::

## Answer frame

**EXPLAIN the YTM approach of calculating cost of debt** (SM 4.11–4.12), in this order:

1. Kd is found by discounting the relevant cash flows using the internal rate of return; YTM is the annual return from the current date till maturity, the IRR at which the current price equals the present value of all cash flows.
2. Cash flows: year 0, net proceeds (new issue) or current market price (existing debt); years 1 to n, interest net of tax, I(1 − t); year n, redemption value.
3. Steps: identify the cash flows; calculate NPVs at two discount rates; calculate the IRR by interpolation.
4. It is superior to the approximation method and preferred in finance; the wider the gap between the two rates, the lower the accuracy.

**DISCUSS amortisation of bond** (SM 4.13): principal repaid every year rather than at maturity; interest on the outstanding amount, so the cash flows are uneven; value = the sum of each year's interest plus principal discounted at Kd; a two-line example.

**EXPLAIN any four features of debentures or bonds** (4 marks in MTP Series II for May 2025; SM 4.5–4.6). One heading and two lines each, in ICAI's order:

1. **Face value**: the denominated value of the debenture; interest is calculated on it (9% debentures of ₹100: interest @ 9% on ₹100).
2. **Interest (coupon) rate**: a fixed rate on the face value (except zero coupon and deep discount bonds), paid periodically (annually, semi-annually, etc.).
3. **Maturity period**: a fixed period for redemption; for irredeemable debentures it is not defined and is taken as infinite.
4. **Redemption value**: determined by the debt covenants and paid on the maturity date; it may vary from the face value.
5. **Benefit of tax shield**: interest is allowed as an expense for corporate tax, so it saves tax; the saving is the tax shield.

Write four of the five; ICAI's answer gave all five.

## Common mistakes

::: mistake Hall of Shame: the preference dividend that got a tax refund
Writing Kp = 10% × (1 − 0.25) = 7.5%. **Fix:** preference dividend is an appropriation of after-tax profit and saves no tax; only interest gets the (1 − t).
:::

::: mistake The face value in the denominator
Tapri's 9% irredeemable debentures quoted at ₹90: 6.75 ÷ 100 = 6.75% is the coupon after tax, not the cost. **Fix:** divide by the net proceeds, or the current market price for existing debt: 6.75 ÷ 90 = 7.50%.
:::

::: mistake The convertible that forgot to grow
Taking today's share price (4 × ₹24 = ₹96, below the ₹100 cash option) instead of the price at maturity. **Fix:** grow the price to maturity, ₹24 × (1.06)⁶, multiply by the shares per debenture, then take the higher of that and the cash value.
:::

::: mistake Interest on the wrong base, life from the wrong date
Interest is the coupon on the **face value**, not on the issue price or NP; n is the **remaining** life on the date of costing, not the original tenure.
:::

## Practice

::: quiz Check yourself
Q: Tapri's 12% irredeemable debentures of ₹100 each are quoted at ₹96 and the tax rate is 25%. What is their current cost of debt, in % to two decimals?
= 9.37..9.38
> Kd = I(1 − t) ÷ market price = ₹12 × 0.75 ÷ ₹96 = ₹9 ÷ ₹96 = 9.375%. Dividing by the face value gives 9.00%, the coupon after tax, not the cost.

Q: Case scenario. Tapri's 12% term loan has an after-tax cost of 9% at today's 25% tax rate. The Finance Bill proposes to cut the corporate tax rate to 22%. Kesar is pleased: "Lower tax, cheaper loan." Which of the following is correct?
- [ ] Kesar is right: the after-tax cost falls to 8.64%
- [x] The after-tax cost rises to 9.36%, because each rupee of interest now saves less tax
- [ ] The after-tax cost stays at 9%, because the coupon is fixed
- [ ] The after-tax cost rises to 12%, because the tax shield is lost
> Kd = I(1 − t): 12% × (1 − 0.22) = 9.36%. A lower tax rate shrinks the tax shield on interest, so debt becomes dearer after tax; the shield is smaller, not lost. 8.64% is 12% × (1 − 0.28): the three-point change applied the wrong way.

Q: Why is the cost of preference shares not multiplied by (1 − t)?
- [ ] Because preference dividend is fixed in amount
- [x] Because preference dividend is an appropriation of after-tax profit and does not reduce the tax liability
- [ ] Because preference shares are redeemable
- [ ] Because preference shareholders pay tax on the dividend themselves
> Interest is a tax-deductible expense; a preference dividend comes out of profit after tax (SM 4.16). A fixed amount or redeemability changes nothing about tax.

Q: A convertible debenture can be redeemed after 5 years for ₹160 in cash or 5 equity shares. The share is quoted at ₹30 and grows at 4% a year; (1.04)⁵ = 1.2167. What redemption value is used for its cost?
- [ ] ₹160.00
- [ ] ₹150.00
- [x] ₹182.50
- [ ] ₹342.50
> Value of the shares = 5 × ₹30 × 1.2167 = 5 × ₹36.50 = ₹182.50, higher than ₹160 in cash, and holders take the more attractive option. ₹150 is the shares at today's price, ignoring growth; ₹342.50 adds the two options.

Q: Which of these lower the net proceeds of a new debenture issue? Select all that apply.
- [x] Underwriting commission
- [x] Issue at a discount
- [ ] A premium payable on redemption
- [x] Printing and registration expenses
> NP = issue price − flotation cost; underwriting, printing and registration are flotation costs and a discount lowers the issue price. A redemption premium raises RV, the amount paid back later, not NP.
:::

## Recap

- Cost of capital: the return expected by the providers of capital; cost is the market's expectation, not the coupon (SM 4.2–4.3).
- NP = issue price − flotation cost; no issue price, use the market price; existing debt, the market price.
- Irredeemable: Kd = I(1 − t) ÷ NP; Kp = PD ÷ NP.
- Redeemable, approximation: [I(1 − t) + (RV − NP) ÷ n] ÷ [(RV + NP) ÷ 2]; if the discount and premium are tax-deductible, [I + (RV − NP) ÷ n](1 − t) ÷ average.
- YTM: year 0 NP, years 1 to n I(1 − t), year n RV; NPVs at two rates; interpolate. Superior to the approximation.
- Convertible: RV = higher of cash and shares × P₀(1 + g)ⁿ.
- No tax shield on a preference dividend, or in a tax holiday. (The taxman only chips in on interest.)

## Flashcards

Q:: Formula: cost of irredeemable debentures?
A:: Kd = I(1 − t) ÷ NP, where NP = net proceeds (issue price − flotation cost) or the current market price.

Q:: Formula: cost of redeemable debentures by the approximation method (only interest tax-deductible)?
A:: Kd = [I(1 − t) + (RV − NP) ÷ n] ÷ [(RV + NP) ÷ 2].

Q:: Formula: cost of redeemable debentures when discount on issue and premium on redemption are also tax-deductible?
A:: Kd = [I + (RV − NP) ÷ n] × (1 − t) ÷ [(RV + NP) ÷ 2].

Q:: ICAI's definition of flotation cost?
A:: The sum of the expenditure on a new issue of a security, such as underwriting or brokerage fees, legal and administrative charges, registration fees and printing expenses; it is deducted to arrive at net proceeds.

Q:: YTM approach: the relevant cash flows, by year?
A:: Year 0: net proceeds (new issue) or current market price (existing debt); years 1 to n: interest net of tax, I(1 − t); year n: redemption value.

Q:: When should the approximation formula for Kd not be used?
A:: When the difference between RV and NP is very high (e.g. deep discount bonds), and for gradual redemption (amortised bonds); use the YTM / trial-and-error method.

Q:: Convertible debentures: which redemption value is used?
A:: The higher of the cash value of the debenture and the value of the shares at maturity (shares per debenture × current price × (1 + g)ⁿ).

Q:: Why is preference dividend not adjusted for tax?
A:: It is an appropriation of after-tax profit, not an expense, so it does not reduce the tax liability.

Q:: Formula: cost of redeemable preference shares (approximation)?
A:: Kp = [PD + (RV − NP) ÷ n] ÷ [(RV + NP) ÷ 2].

Q:: What is the tax shield on interest?
A:: The saving in tax liability because interest is allowed as an expense: interest × tax rate (₹40 lakh × 35% = ₹14 lakh in ICAI's Example 1).

Q:: The five features of debentures or bonds, in ICAI's order?
A:: Face value; interest (coupon) rate; maturity period; redemption value; benefit of tax shield.

Q:: How is the cost of a zero coupon (deep discount) bond found?
A:: By trial and error from RV = NP × (1 + r)ⁿ, since no interest is paid; not by the approximation formula.
