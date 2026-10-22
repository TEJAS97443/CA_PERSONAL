---
id: fm.capbud.irr
title: IRR, MIRR and the NPV-IRR conflict
minutes: 40
needs: fm.capbud.npv
tags: internal rate of return, IRR, interpolation, MIRR, modified internal rate of return, NPV-IRR conflict, crossover rate, multiple IRR
labs:
summary: The discount rate at which NPV becomes zero, found by interpolation; MIRR, which reinvests at the cost of capital; and why NPV and IRR can rank mutually exclusive projects differently.
---

## In plain words

### "Just tell me the percentage, Dev"

> **Kesar:** Dev, the board does not want a lecture on present values. The app upgrade: what return does it give? One number, in per cent.
> **Dev:** At our 12% cost of capital its NPV is ₹62,300, so it earns more than 12%. To find how much more, I keep raising the discount rate until the NPV falls to zero.
> **Ritu:** And where does it fall to zero?
> **Dev:** Just under 15%. That is the project's own rate of return.

The app upgrade from [[fm.capbud.npv|the NPV lesson]] costs ₹10 lakh and brings back ₹3, 4, 4 and 3 lakh over four years. Discounted at 12%, the inflows are worth ₹62,300 more than the outlay. At 14% they are worth only ₹18,300 more; at 15% they fall ₹1,800 short. Somewhere in between, at about 14.9%, the present value of the inflows exactly equals the ₹10 lakh paid. That rate is the **internal rate of return (IRR)**: "internal" because it comes from the project's own cash flows, not from the market. Tapri accepts the upgrade because its IRR is above the 12% the money costs, the **cut-off rate**.

Two things can go wrong with that single percentage. First, IRR quietly assumes that every rupee the project throws off is reinvested at 14.9%, though Tapri can only count on 12%. The **modified internal rate of return (MIRR)** fixes this: it carries each inflow forward to year 4 at the cost of capital (₹16.71 lakh in all) and asks what single rate turns ₹10 lakh into that sum: 13.70%. Second, when two projects compete for the same site, a percentage can mislead: a small project with a high IRR can add fewer rupees to the owners' wealth than a large one with a lower IRR. Then NPV decides.

::: analogy The project's own FD rate
A bank fixed deposit pays you interest at a stated rate. Imagine a deposit that, for ₹10 lakh placed today, paid back exactly ₹3, 4, 4 and 3 lakh over four years. The interest rate on that deposit, about 14.9%, is the project's IRR. If your money costs you 12%, a 14.9% deposit is worth taking. MIRR is the same deposit with an honest footnote: the interest you receive along the way is redeposited at the 12% you can actually get.
:::

::: key
IRR is the discount rate at which NPV is zero. Accept a project when its IRR is at least the cost of capital: for a single project this always agrees with NPV. When mutually exclusive projects differ in size, timing or life, IRR and NPV can rank them differently, and the NPV ranking is the one consistent with wealth maximisation.
:::

## How it works

::: definition Internal rate of return
Internal rate of return for an investment proposal is the discount rate that equates the present value of the expected cash inflows with the initial cash outflow. (SM 7.32)
:::

Like NPV, the method considers the time value of money, the initial investment and all cash flows. Unlike NPV, it does not start from the desired rate of return: it estimates the rate that makes the present value of the inflows equal to the investment, and then compares that IRR with a criterion rate of return, the organisation's desired rate for evaluating capital investments (SM 7.32–7.33).

::: diagram The app upgrade: NPV at every discount rate
{"type": "plot", "h": 300, "x": [0, 24], "y": [-2, 4.5],
 "xlabel": "discount rate (%)", "ylabel": "NPV (₹ lakh)",
 "xticks": [0, 4, 8, 12, 16, 20, 24], "yticks": [-2, -1, 0, 1, 2, 3, 4],
 "series": [
  {"label": "NPV", "fn": "3/(1+x/100)+4/(1+x/100)^2+4/(1+x/100)^3+3/(1+x/100)^4-10", "color": "a"},
  {"pts": [[12, -2], [12, 0.62]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 12, "y": 0.62, "label": "k = 12%", "pos": "right"}, {"x": 14.9, "y": 0, "label": "IRR", "pos": "below"}],
 "legend": "none",
 "caption": "The NPV profile: NPV falls as the discount rate rises. Where the blue curve crosses zero, at about 14.9%, is the IRR. Any cost of capital k to the left of it (such as 12%, grey dashed, NPV ₹0.62 lakh) gives a positive NPV."}
:::

### Two ways to find the rate

The procedure depends on the pattern of the cash flows (SM 7.33–7.34).

**Scenario 1: uniform cash inflows.** Total initial investment = annual cash inflow × annuity discount factor (PVAF) for the life, so:

::: steps
1. Compute A = initial investment ÷ annual cash inflow. This is the approximate payback period, also called the **fake payback period**.
2. Look for A in the PVAF table in the row for the project's life. If it is there exactly, that rate is the IRR; usually it falls between two rates.
3. Discount the cash flows at those two rates (NPV at each).
4. Interpolate between them with the formula below.
:::

**Scenario 2: uneven cash inflows.** Trial and error:

::: steps
1. Discount the cash flows at any random rate, say 10%, 15% or 20%.
2. If the NPV is negative, discount again at a lower rate to make it positive; if positive, at a higher rate to make it negative.
3. Interpolate between the rate with a positive NPV (the lower rate, LR) and the rate with a negative NPV (the higher rate, HR).
:::

$$\text{IRR} = LR + \frac{\text{NPV at } LR}{\text{NPV at } LR - \text{NPV at } HR} \times (HR - LR)$$

Because NPV at HR is negative, the denominator is the **sum** of the two NPVs without their signs. For the app upgrade (three-decimal factors): NPV at 14% = +₹18,300, at 15% = −₹1,800, so IRR = 14% + 18,300 ÷ 20,100 × 1% = **14.91%** (the exact rate is 14.90%).

### The acceptance rule

The IRR is compared with the required rate of return, the **cut-off rate** (SM 7.37–7.38):

| Condition | Decision |
|---|---|
| IRR ≥ cut-off rate or WACC | Accept the proposal |
| IRR < cut-off rate or WACC | Reject the proposal |

At IRR = cut-off rate the firm is indifferent. For one project, IRR ≥ cost of capital and NPV ≥ 0 are the same test: the NPV profile is above zero exactly to the left of the IRR.

### Mutually exclusive projects: where the percentage misleads

Projects are **mutually exclusive** when the selection of one precludes the selection of the others, for example a plot of land that can be used either for project S or for project L (SM 7.38). The trouble is that IRR is expressed in percentage and does not take into account the scale of investment or the quantum of money earned.

Tapri's Nagpur plot can take either a quick-service kiosk project Q or a premix warehouse L, each costing ₹20 lakh. Q returns ₹16, 8 and 2 lakh over three years; L returns ₹2, 10 and 18 lakh.

::: diagram Projects Q and L: two NPV profiles that cross
{"type": "plot", "h": 320, "x": [0, 26], "y": [-3, 10.5], "legend": "outside",
 "xlabel": "discount rate (%)", "ylabel": "NPV (₹ lakh)",
 "xticks": [0, 5, 10, [14.29, "14.29"], 20, 25], "yticks": [-2, 0, 2, 4, 6, 8, 10],
 "series": [
  {"label": "Q (cash early)", "fn": "-20+16/(1+x/100)+8/(1+x/100)^2+2/(1+x/100)^3", "color": "a"},
  {"label": "L (cash late)", "fn": "-20+2/(1+x/100)+10/(1+x/100)^2+18/(1+x/100)^3", "color": "d"},
  {"pts": [[14.29, -3], [14.29, 1.46]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 14.29, "y": 1.46}, {"x": 20.2, "y": 0, "label": "IRR Q 20.2%", "pos": "above"}, {"x": 17.6, "y": 0, "label": "IRR L 17.6%", "pos": "below"}],
 "caption": "Blue: Q; orange: L. The dot on the grey dashed line is the crossover rate, 14.29%, where both NPVs are ₹1.46 lakh. Left of it L has the higher NPV; right of it Q does. Q's IRR is higher whatever the cost of capital. At a 10% cost of capital NPV picks L (₹3.61 lakh against ₹2.66 lakh) while IRR picks Q."}
:::

As long as the cost of capital is above the **crossover rate**, the rate at which the two NPVs are equal, NPV and IRR both pick the same project. Below it, NPV ranks one project first and IRR the other (SM 7.38). The Study Material's Example 8 shows the size version: project A (₹1,00,000 for ₹1,50,000 a year later) earns 50% and project B (₹5,00,000 for ₹6,25,000) only 25%, yet at 10% B's NPV is ₹68,180 against A's ₹36,360. Choosing A gives up ₹31,820 of shareholders' wealth (SM 7.39). And it is not safe to choose by IRR even when the larger project also has the higher IRR (Example 9, SM 7.39–7.40).

### Why they disagree: the reinvestment assumption

The NPV technique assumes that all cash flows can be reinvested at the discount rate used for calculating the NPV, a logical assumption since NPV accepts every project that beats that rate. The IRR technique assumes that all cash flows are reinvested at the project's IRR. So IRR favours projects with heavy cash flows in the early years over projects with larger cash flows in the later years (SM 7.40–7.41): Q over L above.

### Multiple IRRs

When project cash flows change signs during the life, for example an initial outflow, then inflows, then a major outflow, there may be more than one IRR. If the cost of capital is less than both IRRs a decision can be made easily; otherwise the IRR rule may mislead, because the project should be invested in only if the cost of capital lies **between IRR₁ and IRR₂** (SM 7.41).

::: diagram Chai Mela: one project, two IRRs
{"type": "plot", "h": 300, "x": [0, 40], "y": [-32, 12],
 "xlabel": "discount rate (%)", "ylabel": "NPV (₹ thousand)",
 "xticks": [0, 10, 20, 30, 40], "yticks": [-30, -20, -10, 0, 10],
 "series": [
  {"label": "NPV", "fn": "100*(-10+24/(1+x/100)-14.3/(1+x/100)^2)", "color": "f"}
 ],
 "points": [{"x": 10, "y": 0, "label": "IRR₁ 10%", "pos": "left"}, {"x": 30, "y": 0, "label": "IRR₂ 30%", "pos": "right"}],
 "legend": "none",
 "caption": "Tapri pays ₹10 lakh for a stadium festival, collects ₹24 lakh from stall-holders in year 1 and pays ₹14.3 lakh to restore the ground in year 2. The signs change twice (−, +, −), so the violet NPV curve crosses zero at 10% and at 30%: the project adds value only for a cost of capital between the two."}
:::

### What IRR does well, and where it fails

**Advantages of IRR** (SM 7.41–7.42):

- It makes use of the concept of time value of money.
- All the cash flows in the project are considered.
- It is easier to use: comparing it with the cost of capital gives an instantaneous understanding of desirability.
- It helps in achieving the objective of maximisation of shareholders' wealth.

**Limitations of IRR** (SM 7.42):

- The calculation is tedious if there is more than one cash outflow interspersed between the inflows; there can be multiple IRRs, whose interpretation is difficult.
- It creates a peculiar situation when two projects with different inflow/outflow patterns are compared.
- It assumes all future cash inflows are reinvested at a rate equal to the IRR, ignoring the firm's ability to reinvest in a portfolio of different rates.
- With mutually exclusive projects of considerably different cash outlays, a project with a larger fund commitment but lower IRR contributes more absolute NPV and increases shareholders' wealth more; decisions based only on IRR may then not be correct.

### MIRR: the reinvestment problem, repaired

The **modified internal rate of return (MIRR)**, also called the **terminal value method**, addresses some of these deficiencies: it eliminates multiple IRR rates, addresses the reinvestment rate issue and produces results consistent with the NPV method (SM 7.43).

::: steps
1. Bring every cash flow except the initial investment to the terminal (last) year at an appropriate rate, usually the cost of capital: an inflow of year t is multiplied by (1 + k)ⁿ⁻ᵗ, so the last year's inflow by 1.
2. Add them: a single cash inflow in the terminal year, the **terminal value**.
3. The MIRR is the discount rate that equates the present value of this terminal inflow with the single outflow of year 0.
4. Decide as with IRR: accept if MIRR is larger than the required rate of return, reject if lower (SM 7.44).
:::

::: diagram The app upgrade: each inflow carried to year 4 at 12%
{"type": "plot", "h": 290, "x": [0.4, 4.6], "y": [0, 6],
 "xlabel": "year", "ylabel": "amount (₹ lakh)",
 "xticks": [1, 2, 3, 4], "yticks": [0, 1, 2, 3, 4, 5, 6],
 "series": [
  {"label": "cash flow", "bars": true, "bw": 0.34, "values": true, "color": "a", "pts": [[0.82, 3], [1.82, 4], [2.82, 4], [3.82, 3]]},
  {"label": "value at year 4 at 12%", "bars": true, "bw": 0.34, "values": true, "color": "c", "pts": [[1.18, 4.215, "4.21"], [2.18, 5.018, "5.02"], [3.18, 4.48, "4.48"], [4.18, 3, "3.00"]]}
 ],
 "caption": "Blue: the cash flow; amber: its value at the end of year 4, reinvested at 12%. The earlier the rupee, the longer it grows. The amber bars add up to the terminal value, ₹16.71 lakh, against ₹10 lakh paid today: MIRR is the fourth root of 1.6712, less 1, which is 13.70%."}
:::

MIRR (13.70%) sits between the cost of capital (12%) and the IRR (14.90%): reinvesting at 12% instead of 14.9% pulls the return down.

### NPV and IRR side by side

**Similarities** (SM 7.45): both are discounted cash flow methods that consider the time value of money, and both consider all cash flows over the expected useful life.

**Where they reach different conclusions** (SM 7.45–7.51), with the Study Material's own illustrations:

| Scenario | Why they differ | ICAI's figures |
|---|---|---|
| Scale or size disparity | IRR is relative, NPV absolute | Ill. 10: NPV ₹25,050 vs ₹59,300; IRR 24.26% vs 21.48% |
| Time disparity in cash flows | Early cash flows favoured by IRR | Ill. 11: NPV ₹51,950 vs ₹53,350; IRR 24.87% vs 17.60% |
| Unequal lives | Short life, high IRR, less NPV | Ill. 12: NPV ₹1,69,750 vs ₹3,36,400; IRR 50% vs 43.07% |

**Which to follow.** Between the two, ==the NPV rule generally gives consistent results in conformity with the wealth maximization principle==, so on a conflict between mutually exclusive projects the Study Material's illustrations select by NPV (SM 7.39, 7.59). For independent projects with no capital rationing either method can be used: the same set of projects is accepted (SM 7.59). When lives differ, compare equivalent annualised NPVs or use a common life ([[fm.capbud.npv|equivalent annualised criterion]], SM 7.55–7.56).

**ICAI's summary table** (SM 7.52) gives the IRR rule as: independent project, accept when IRR ≥ K and reject when IRR < K; mutually exclusive projects, the project with the maximum IRR. That is the rule when IRR is the method asked for. When a question asks you to choose after computing both, and they conflict, say so and follow NPV, giving the reason above.

::: diagram Which rule decides?
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "NPV and IRR\ncomputed"},
  {"id": "d1", "kind": "decision", "label": "Mutually\nexclusive?"},
  {"id": "ind", "kind": "end", "label": "Accept all with\nIRR ≥ k (NPV ≥ 0)", "color": "ok"},
  {"id": "d2", "kind": "decision", "label": "Rankings\nconflict?"},
  {"id": "same", "kind": "end", "label": "Both agree:\nchoose it", "color": "b"},
  {"id": "d3", "kind": "decision", "label": "Lives\nequal?"},
  {"id": "npv", "kind": "end", "label": "Choose the\nhigher NPV", "color": "f"},
  {"id": "ean", "kind": "end", "label": "Higher EAN", "color": "c"}],
 "edges": [["s", "d1"], ["d1", "ind", "no"], ["d1", "d2", "yes"], ["d2", "same", "no"], ["d2", "d3", "yes"], ["d3", "npv", "yes"], ["d3", "ean", "no"]],
 "caption": "k: the cost of capital or cut-off rate; EAN: equivalent annualised NPV. Green: independent projects, where IRR and NPV accept the same set; teal: no conflict; violet and amber: a conflict, settled by NPV, annualised when lives differ."}
:::

## Formats and formulas

*Reproduce these from memory.*

::: formula Internal rate of return
$$\sum_{t=1}^{n} \frac{C_t}{(1+r)^t} - I = 0$$
r is the IRR: the rate at which the present value of the inflows Cₜ equals the investment I (SM 7.32).
:::

::: formula Fake payback factor (uniform inflows)
$$A = \frac{\text{Total initial investment}}{\text{Annual (equal) cash inflow}}$$
Look up A in the PVAF table in the row for the project's life (SM 7.33).
:::

::: formula Interpolation
$$\text{IRR} = LR + \frac{\text{NPV at } LR}{\text{NPV at } LR - \text{NPV at } HR} \times (HR - LR)$$
or, with present values,
$$\text{IRR} = LR + \frac{\text{PV at } LR - CI}{\text{PV at } LR - \text{PV at } HR} \times (HR - LR)$$
LR = lower rate, HR = higher rate, CI = capital investment (SM 7.33).
:::

::: formula Modified internal rate of return
$$\text{MIRR} = \left(\frac{\text{TV}}{\text{Initial outflow}}\right)^{1/n} - 1$$
TV, the terminal value: each inflow compounded to year n at the cost of capital, (1 + k)ⁿ⁻ᵗ. Alternatively, find outflow ÷ terminal value in the year-n row of the PV table (SM 7.45).
:::

::: definition Modified internal rate of return
Under this method, all cash flows, apart from the initial investment, are brought to the terminal value using an appropriate discount rate (usually the Cost of Capital). This results in a single stream of cash inflow in the terminal year. The discount rate which equates the present value of the terminal cash inflow to the zero year outflow is called the MIRR. (SM 7.43)
:::

**IRR working** (one table for each trial rate, as in SM 7.35–7.36)

| Year | Cash flow (₹) | PV factor @ r | Present value (₹) |
|---|---:|---:|---:|
| 0 | (xxx) | 1.000 | (xxx) |
| 1 … n | xxx | x.xxx | xxx |
| **NPV at r** | | | **xxx** |

Then the interpolation line, with LR, HR and both NPVs written out.

**MIRR working** (SM 7.44)

| Year | Cash flow (₹) | Reinvestment factor @ k | Terminal value (₹) |
|---|---:|---:|---:|
| 1 | xxx | (1 + k)ⁿ⁻¹ | xxx |
| … | | | |
| n | xxx | 1.000 | xxx |
| **Total terminal value** | | | **xxx** |

**Decision rules**

| Technique | Independent project | Mutually exclusive projects |
|---|---|---|
| IRR | Accept if IRR ≥ k; reject if IRR < k | Maximum IRR (SM 7.52); on a conflict with NPV, the higher NPV |
| MIRR | Accept if MIRR > required rate; reject if lower | As IRR |

## Worked examples

All working uses ICAI's three-decimal PV factors, and rates are rounded to two decimals.

:::: example The kulhad press: one rate from a table
Tapri plans an automatic kulhad press costing ₹12,00,000, with a life of 5 years and no salvage value. It will produce a net operating income after depreciation (straight-line) of ₹1,60,000 a year. The tax rate is 25% and the cut-off rate 14%. Cumulative PV factors for 5 years: 14%: 3.433; 15%: 3.352; 16%: 3.274.

**Required:**

(i) Calculate the annual cash inflow.

(ii) Compute the internal rate of return.

(iii) Advise Tapri. Would the advice change if the cut-off rate were 16%?

::: answer Show the working
**(i) Cash inflow per annum**

| Particulars | Amount (₹) |
|---|---:|
| Net operating income | 1,60,000 |
| Less: Tax @ 25% | (40,000) |
| Profit after tax | 1,20,000 |
| Add: Depreciation (₹12,00,000 ÷ 5) | 2,40,000 |
| **Cash inflow** | **3,60,000** |

**(ii) IRR.** Fake payback factor = ₹12,00,000 ÷ ₹3,60,000 = 3.333, which lies between 3.352 (15%) and 3.274 (16%).

| Particulars | 15% | 16% |
|---|---:|---:|
| Cumulative factor | 3.352 | 3.274 |
| PV of inflows (₹) | 12,06,720 | 11,78,640 |
| Less: Initial outlay (₹) | 12,00,000 | 12,00,000 |
| **NPV (₹)** | **6,720** | **(21,360)** |

$$\text{IRR} = 15\% + \frac{6{,}720}{6{,}720 + 21{,}360} \times (16\% - 15\%) \qquad = 15\% + 0.24\% = 15.24\%$$

**(iii) Advice.** IRR 15.24% exceeds the cut-off rate of 14%: **buy the press**. Check: NPV at 14% = ₹3,60,000 × 3.433 − ₹12,00,000 = ₹35,880, positive. At a cut-off rate of 16% the IRR is below it, so the press would be **rejected** (its NPV at 16% is −₹21,360).

Factors as given (once-rounded annuity factors). Summing the five yearly factors at 15% gives 3.353 and an IRR of 15.25%; the advice does not change.
:::
::::

:::: example Working backwards: the cold-chain vans
Tapri's dealer quotes a price for a fleet of cold-chain vans and promises "a 14% return". Ritu has the route plan below and wants to know the price at which that promise holds:

| Particulars | Amount |
|---|---:|
| Cash inflow, year 1 | ₹3,00,000 |
| Cash inflow, year 2 | ₹4,00,000 |
| Cash inflows, years 3 and 4 | ₹5,00,000 a year |
| Useful life | 4 years |
| Salvage value at the end of year 4 | ₹80,000 |
| Internal rate of return | 14% |
| Cost of capital | 10% |

| Year | PVIF @ 14% | PVIF @ 10% | FVIF @ 10% | FVIF @ 14% |
|---|---:|---:|---:|---:|
| 1 | 0.877 | 0.909 | 1.100 | 1.140 |
| 2 | 0.769 | 0.826 | 1.210 | 1.300 |
| 3 | 0.675 | 0.751 | 1.331 | 1.482 |
| 4 | 0.592 | 0.683 | 1.464 | 1.689 |

**Required:**

(i) Calculate the initial investment.

(ii) Calculate the net present value and the profitability index at the cost of capital.

(iii) Calculate the MIRR, reinvesting at the cost of capital.

(iv) Dev recomputes the MIRR reinvesting the inflows at 14% instead. Calculate his figure and comment on what it shows.

::: answer Show the working
**(i) Initial investment.** At the IRR the NPV is zero, so the investment equals the present value of the inflows at 14%.

| Year | Cash inflow (₹) | PVF @ 14% | PV (₹) |
|---|---:|---:|---:|
| 1 | 3,00,000 | 0.877 | 2,63,100 |
| 2 | 4,00,000 | 0.769 | 3,07,600 |
| 3 | 5,00,000 | 0.675 | 3,37,500 |
| 4 | 5,80,000 (incl. salvage) | 0.592 | 3,43,360 |
| **Initial investment** | | | **12,51,560** |

**(ii) NPV and PI at the cost of capital**

| Year | Cash inflow (₹) | PVF @ 10% | PV (₹) |
|---|---:|---:|---:|
| 1 | 3,00,000 | 0.909 | 2,72,700 |
| 2 | 4,00,000 | 0.826 | 3,30,400 |
| 3 | 5,00,000 | 0.751 | 3,75,500 |
| 4 | 5,80,000 | 0.683 | 3,96,140 |
| | **PV of inflows** | | **13,74,740** |

NPV = ₹13,74,740 − ₹12,51,560 = **₹1,23,180**. Profitability index = ₹13,74,740 ÷ ₹12,51,560 = **1.098**.

**(iii) MIRR at 10%.** Each inflow is reinvested at 10% to the end of year 4:

| Year | Cash inflow (₹) | Factor @ 10% | Terminal value (₹) |
|---|---:|---:|---:|
| 1 | 3,00,000 | 1.331 | 3,99,300 |
| 2 | 4,00,000 | 1.210 | 4,84,000 |
| 3 | 5,00,000 | 1.100 | 5,50,000 |
| 4 | 5,80,000 | 1.000 | 5,80,000 |
| **Total terminal value** | | | **20,13,300** |

$$\text{MIRR} = \left(\frac{20{,}13{,}300}{12{,}51{,}560}\right)^{1/4} - 1 \qquad = (1.6086)^{1/4} - 1 = 12.62\%$$

Or: ₹12,51,560 ÷ ₹20,13,300 = 0.622, which in the year-4 row of the PV table lies between 12% (0.636) and 13% (0.613): about 12.6%. Year 4's inflow takes a factor of 1 (it is already at the terminal year), so the FVIF of 1.464 is not needed.

**(iv) Reinvesting at 14%.** Terminal value = 3,00,000 × 1.482 + 4,00,000 × 1.300 + 5,00,000 × 1.140 + 5,80,000 × 1.000 = ₹21,14,600.

$$\text{MIRR at 14\%} = \left(\frac{21{,}14{,}600}{12{,}51{,}560}\right)^{1/4} - 1 \qquad = 14.01\%$$

**Comment.** Reinvesting at the IRR gives back the IRR itself (14%; the 0.01% is factor rounding). That is the reinvestment assumption hidden inside IRR, made visible. Tapri can only count on reinvesting at its 10% cost of capital, so the realistic return on the fleet is the MIRR of 12.62%: still above 10%, consistent with the positive NPV, but not the 14% the dealer advertises.
:::
::::

::::: example One plot, two plans: the kiosks or the café
Tapri owns one vacant plot in Bhopal. It can build a cluster of chai kiosks (A) or a kulhad café (B), not both. The cost of capital is 12%.

| Year | Project A (₹ lakh) | Project B (₹ lakh) |
|---|---:|---:|
| 0 | (10) | (30) |
| 1 | 7 | 6 |
| 2 | 6 | 18 |
| 3 | 3 | 22 |

| PV factor | Year 1 | Year 2 | Year 3 |
|---|---:|---:|---:|
| 12% | 0.893 | 0.797 | 0.712 |
| 15% | 0.870 | 0.756 | 0.658 |
| 20% | 0.833 | 0.694 | 0.579 |
| 25% | 0.800 | 0.640 | 0.512 |
| 30% | 0.769 | 0.592 | 0.455 |
| 35% | 0.741 | 0.549 | 0.406 |

**Required:**

(i) Calculate the NPV of each project at 12%.

(ii) Calculate the IRR of each project.

(iii) Which project should Tapri choose? Give reasons.

(iv) Calculate the rate at which both projects have the same NPV, and state over what range of cost of capital NPV and IRR would rank them the same way.

:::: answer Show the working
**(i) NPV at 12%** (₹ lakh)

| Year | PVF @ 12% | PV of A | PV of B |
|---|---:|---:|---:|
| 1 | 0.893 | 6.251 | 5.358 |
| 2 | 0.797 | 4.782 | 14.346 |
| 3 | 0.712 | 2.136 | 15.664 |
| | **PV of inflows** | **13.169** | **35.368** |
| | Less: Outlay | 10.000 | 30.000 |
| | **NPV** | **3.169** | **5.368** |

**(ii) IRR.** A is still positive at 30% (PV 10.300, NPV +0.300) and negative at 35% (PV 9.699, NPV −0.301):

$$\text{IRR}_A = 30\% + \frac{0.300}{0.300 + 0.301} \times 5\% = 32.50\%$$

B is positive at 20% (PV 30.228, NPV +0.228) and negative at 25% (PV 27.584, NPV −2.416):

$$\text{IRR}_B = 20\% + \frac{0.228}{0.228 + 2.416} \times 5\% = 20.43\%$$

**(iii) Choice**

| | Project A | Project B |
|---|---:|---:|
| NPV @ 12% (₹) | 3,16,900 | 5,36,800 |
| IRR | 32.50% | 20.43% |
| Rank by NPV | 2 | 1 |
| Rank by IRR | 1 | 2 |

The rankings conflict because the projects differ in size (₹10 lakh against ₹30 lakh) and in timing (A's cash comes early). The projects are mutually exclusive, so the decision follows NPV, which is consistent with wealth maximisation: **choose the café (B)**. It adds ₹2,19,900 more to shareholders' wealth. A earns a higher percentage, but on a third of the money; the extra ₹20 lakh that B needs earns more than the 12% it costs (16.5%, part (iv)).

**(iv) Crossover rate.** It is the IRR of the difference in cash flows, B − A: (20), (1), 12, 19.

At 15%: −20 − 0.870 + 9.072 + 12.502 = +0.704; at 20%: −20 − 0.833 + 8.328 + 11.001 = −1.504.

$$\text{Crossover rate} = 15\% + \frac{0.704}{0.704 + 1.504} \times 5\% = 16.59\%$$

(The exact crossover rate is 16.50%.)

::: diagram The kiosks and the café: NPV profiles
{"type": "plot", "h": 320, "x": [0, 40], "y": [-9, 17], "legend": "outside",
 "xlabel": "discount rate (%)", "ylabel": "NPV (₹ lakh)",
 "xticks": [0, 10, [16.5, "16.5"], 30, 40], "yticks": [-8, -4, 0, 4, 8, 12, 16],
 "series": [
  {"label": "A: kiosks", "fn": "-10+7/(1+x/100)+6/(1+x/100)^2+3/(1+x/100)^3", "color": "a"},
  {"label": "B: café", "fn": "-30+6/(1+x/100)+18/(1+x/100)^2+22/(1+x/100)^3", "color": "d"},
  {"pts": [[12, -9], [12, 5.37]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[16.5, -9], [16.5, 2.33]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 16.5, "y": 2.33}, {"x": 32.4, "y": 0, "label": "IRR A", "pos": "above"}, {"x": 20.4, "y": 0, "label": "IRR B", "pos": "below"}],
 "caption": "Blue: A; orange: B. Grey dashed lines: the 12% cost of capital and the 16.5% crossover rate (the dot, where both NPVs are ₹2.33 lakh). Left of 16.5% B has the higher NPV, so NPV and IRR disagree; between 16.5% and B's IRR of 20.4% both prefer A; above 20.4% only A is acceptable."}
:::

Below 16.5%, NPV ranks B first while IRR ranks A first. At a cost of capital above 16.5% (up to 20.43%), both rank A first; above 20.43% B is rejected outright. At Tapri's 12% the conflict is real, and NPV settles it.
::::
:::::

## Under the hood

### Interpolation draws a straight line through a curve

The NPV profile bends (it is convex), so the straight line between two trial rates crosses zero a little to the right of the true IRR: interpolation slightly **overstates** the IRR, and more so the wider the gap. For the app upgrade, 14% and 15% give 14.91%; 12% and 20% give 15.14%; the true rate is 14.90%. The Study Material's Illustration 12 interpolates project B between 15% and 50% and prints 43.07%; the cash flows' exact IRR is 40.00%. In an exam, use the rates the question gives; on your own, bracket the IRR with rates one or two points apart.

### ICAI's printed figures, checked

- Illustration 6 (SM 7.34): the interpolation as printed, 12% + 27,750 ÷ 28,250, works out to 12.982%; the printed 12.978% is the exact IRR.
- Illustration 9 (SM 7.44–7.45): the terminal value ₹2,13,587 on ₹1,36,000 over 5 years gives $(1.5705)^{1/5} - 1$ = 9.45%; the Study Material reads "9%" off the year-5 row of the table.
- May 2025 Q3(a): $(4{,}72{,}100 \div 3{,}08{,}640)^{1/4} - 1$ = 11.21%; the suggested answer writes "around 11.20%".

### MIRR still cannot see size

MIRR fixes the reinvestment rate, and with a single outlay at year 0, MIRR > k exactly when NPV > 0, so accept-reject decisions always agree with NPV. Ranking projects of different sizes is another matter: at 12%, the kiosks' MIRR is 22.76% and the café's 18.31%, still the opposite of the NPV ranking. A percentage cannot see that one project is three times the other.

### Next door

The crossover rate as the IRR of the incremental cash flows is not in the Study Material, which reads it off the graph; it is a quick check of where the profiles cross. The payback reciprocal approximates the IRR of a long-lived project with even inflows ([[fm.capbud.payback|payback, discounted payback and ARR]]). The "r" of Walter's and Gordon's dividend models is the internal rate of return the firm earns on retained earnings ([[fm.div.models|dividend theories]]). Choosing among positive-NPV projects within a budget is [[fm.capbud.rationing|capital rationing]].

## Exam angle

::: exam Where IRR and MIRR appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, IRR or MIRR came up in 10 new-scheme documents and 2 old-scheme ones:

- **Descriptive**: initial investment from an IRR of 12%, then NPV, PI, discounted payback and MIRR (May 2025 Q3(a); 2 of the 6 marks for MIRR). NPV, IRR (18.89%, between 16% and 20%) and desirability factor with WDV depreciation and a capital loss (RTP January 2025 Q9). IRR of a replacement decision (RTP May 2024 Q5). DPP, NPV and IRR of two mutually exclusive machines (RTP September 2026 Q7).
- **MCQs**: IRR from NPVs of ₹50.71 lakh at 16% and (₹26.84 lakh) at 20%, 18.62%, then accept at a cost of capital of 18.50% (May 2026 MCQ 8); cost of a project from its IRR, then payback (MTP Series I for January 2025, MCQ 7, 2 marks); IRR in a start-up case with a terminal value (RTP September 2025, case 1(v)).
- **Theory, 2 to 4 marks**: define MIRR (MTP Series I for January 2025 Q4(c), 2 marks); short note on IRR (MTP Series II for May 2025 Q3(b), 2 marks); acceptance rule of IRR (RTP May 2026 Q10(c)); limitations of IRR (old scheme, May 2022 Q6(a), 4 marks); NPV versus IRR (old scheme, MTP Series II for November 2022 Q6(a)).
- **A reverse MIRR**: MIRR 10.9% and a terminal value of ₹11,43,589 given, investment backed out as ₹5,00,000 (RTP January 2026 Q9).
:::

::: exam The traps ICAI used
- Reverse questions: "IRR 12%" means the investment is the PV of the inflows at 12% (May 2025 Q3(a); MTP Series I for January 2025 MCQ 7). Include salvage in the last year.
- MIRR with a terminal value: the last year's inflow takes factor 1. May 2025 Q3(a) printed FVIFs up to year 4 although only years 1–3 are needed.
- RTP September 2026 Q7 ranked Machine I first on discounted payback and IRR and Machine II first on NPV (₹1,18,074 against ₹86,909), and recommended Machine I on the majority of rankings. The Study Material's rule for mutually exclusive projects is the higher NPV, and with lives of 5 and 6 years the equivalent annualised NPV (SM 7.56): both point to Machine II. If you meet such a question, state the rule you follow.
:::

::: trick The two-line IRR sanity check
NPV positive at a rate means the IRR is above that rate; NPV negative means below. So the IRR must lie between LR and HR, and nearer the rate whose NPV is smaller in size. Condition: conventional cash flows (one sign change). If your answer falls outside the bracket, the signs in the denominator are wrong.
:::

## Answer frame

**"Write a short note on IRR"** (MTP Series II for May 2025, 2 marks; ICAI's points): the rate at which discounted cash inflows equal discounted cash outflows, the rate that discounts the cash flows to zero; it can be stated as discounted inflows ÷ discounted outflows = 1; found by trial and error, since the rate is unknown while the cash flows are known; compared with the cut-off rate: accept if more, otherwise reject.

**"Identify the limitations of IRR"** (old scheme May 2022, 4 marks): the four points of SM 7.42 in ICAI's order (tedious with interspersed outflows and multiple IRRs; peculiar results with different inflow/outflow patterns; reinvestment at the IRR; mutually exclusive projects with different outlays).

**"Describe MIRR"** (SM theory question 6; MTP Series I for January 2025, 2 marks): what it addresses (multiple IRRs, the reinvestment rate, consistency with NPV); the terminal value method in ICAI's words; the single outflow and single inflow; the decision rule.

**"Distinguish between NPV and IRR"**

| Point | NPV | IRR |
|---|---|---|
| Result | Absolute amount (₹) | Percentage |
| Discount rate | Cost of capital, given | Found; then compared with the cost of capital |
| Reinvestment assumed at | The discount rate | The project's IRR |
| Multiple results | One NPV at a given rate | Several IRRs possible when signs change |
| Mutually exclusive projects | Highest NPV; consistent with wealth maximisation | May conflict with NPV (size, timing, lives) |

## Common mistakes

::: mistake Hall of Shame: the minus sign that sank the IRR
NPV is ₹2,400 at 18% and −₹1,600 at 20%. Bunty's classmate writes 18% + 2,400 ÷ (2,400 − 1,600) × 2% = 24%, outside the bracket. **Fix:** the denominator is NPV at LR − NPV at HR = 2,400 − (−1,600) = 4,000, so IRR = 18% + 1.2% = 19.2%.
:::

::: mistake Choosing the mutually exclusive project with the higher IRR
The kiosks' 32.50% beats the café's 20.43%, so the hurried answer picks the kiosks and gives up ₹2,19,900 of NPV. **Fix:** with mutually exclusive projects that conflict, choose the higher NPV and give the reason: NPV is consistent with wealth maximisation; IRR ignores scale and assumes reinvestment at the IRR.
:::

::: mistake Compounding the last year's inflow, or the outlay
In MIRR, the year-n inflow is multiplied by 1, not by (1 + k); the year-0 outlay is not compounded at all, it is what the terminal value is compared with. **Fix:** an inflow of year t takes (1 + k)ⁿ⁻ᵗ; check that the year-1 inflow has the largest factor.
:::

::: mistake Reading the fake payback factor as the answer
For uneven cash flows, investment ÷ average inflow only suggests where to start. **Fix:** discount the actual cash flows at two rates and interpolate.
:::

## Practice

::: quiz Check yourself
Q: A project's NPV is ₹45,000 at 14% and −₹15,000 at 16%. What is its IRR by interpolation, in %?
= 15.5
> IRR = 14% + 45,000 ÷ (45,000 + 15,000) × 2% = 14% + 1.5% = 15.5%.

Q: Tapri invests ₹5,00,000 today. Its inflows, reinvested at the 10% cost of capital, are worth ₹8,81,171 at the end of year 5. What is the MIRR, in % (two decimals)?
= 11.95..12.05
> 8,81,171 ÷ 5,00,000 = 1.7623, whose fifth root is 1.1200: MIRR = 12.00%. It exceeds the 10% cost of capital: accept.

Q: Case scenario. Tapri's samosa factory has room for one new fryer. Fryer X costs ₹15 lakh, has an NPV of ₹4.2 lakh and an IRR of 26%; fryer Y costs ₹40 lakh, has an NPV of ₹6.8 lakh and an IRR of 19%. Both last five years; the cost of capital is 11%. Kesar asks Dev which fryer to buy. Which of the following is correct?
- [ ] Fryer X, because its IRR is higher
- [x] Fryer Y, because between mutually exclusive projects the higher NPV is consistent with wealth maximisation
- [ ] Both fryers, because both IRRs exceed 11%
- [ ] Neither, until the crossover rate equals the cost of capital
> The fryers are mutually exclusive and the rankings conflict (scale disparity); NPV decides. Both would be accepted only if they were independent.

Q: Which pairing of a technique with the reinvestment rate it implicitly assumes is correct?
- [ ] IRR: the cost of capital
- [x] IRR: the project's own IRR; NPV: the discount rate used
- [ ] NPV: the project's IRR; MIRR: the IRR
- [ ] MIRR: the project's IRR
> NPV assumes reinvestment at the discount rate, IRR at the IRR (which is why it favours early cash flows), and MIRR at an appropriate rate, usually the cost of capital.

Q: Which statements about multiple IRRs are correct? Select all that apply.
- [x] They can arise when cash flows change sign more than once, such as an outflow at the end of the life
- [x] With two IRRs, the project adds value only if the cost of capital lies between them
- [ ] They arise whenever cash inflows are uneven
- [x] MIRR eliminates the problem of multiple IRR rates
> Sign reversals, not unevenness, cause multiple IRRs (SM 7.41); MIRR produces a single rate (SM 7.43).
:::

## Recap

- IRR: the discount rate that equates the PV of the expected cash inflows with the initial cash outflow (NPV = 0).
- Uniform inflows: fake payback = investment ÷ annual inflow, read in the PVAF row for the life, then interpolate. Uneven inflows: trial and error at two rates, then interpolate.
- IRR = LR + NPV at LR ÷ (NPV at LR − NPV at HR) × (HR − LR); the IRR lies between LR and HR.
- Accept if IRR ≥ cut-off rate (WACC), reject if lower; for one project this always agrees with NPV ≥ 0.
- NPV and IRR can conflict for mutually exclusive projects: size disparity, time disparity, unequal lives. Follow NPV (wealth maximisation); for unequal lives, the equivalent annualised NPV.
- Reinvestment: NPV at the discount rate, IRR at the IRR; sign changes can give multiple IRRs.
- MIRR (terminal value method): compound inflows to year n at the cost of capital; MIRR = $(\text{TV} \div \text{outlay})^{1/n} - 1$; accept if MIRR > required rate.
- State your factors: once-rounded annuity factors and summed yearly factors differ in the last digit. (A project's own FD rate is impressive only if you can redeposit at it.)

## Flashcards

Q:: ICAI's definition of internal rate of return?
A:: The discount rate that equates the present value of the expected cash inflows with the initial cash outflow.

Q:: Formula: IRR by interpolation?
A:: LR + [NPV at LR ÷ (NPV at LR − NPV at HR)] × (HR − LR), where LR and HR are the lower and higher trial rates.

Q:: IRR with uniform cash inflows: the first step?
A:: Compute the fake (approximate) payback period, investment ÷ annual cash inflow, and look it up in the PVAF table in the row for the project's life.

Q:: IRR acceptance rule?
A:: Accept if IRR ≥ cut-off rate or WACC; reject if IRR < cut-off rate; indifferent if equal.

Q:: Reinvestment assumption of NPV and of IRR?
A:: NPV: cash flows reinvested at the discount rate used for NPV. IRR: cash flows reinvested at the project's IRR, so IRR favours projects with heavy early cash flows.

Q:: When do multiple IRRs arise, and when should such a project be accepted?
A:: When cash flows change signs during the life (for example a major outflow at the end); accept only if the cost of capital lies between IRR₁ and IRR₂.

Q:: Three scenarios in which NPV and IRR give different conclusions?
A:: Scale or size disparity; time disparity in cash flows; disparity in lives (unequal lives).

Q:: NPV and IRR conflict for mutually exclusive projects: which is followed, and why?
A:: NPV: it generally gives consistent results in conformity with the wealth maximisation principle (it measures the absolute addition to shareholders' wealth).

Q:: What is MIRR, and what is its other name?
A:: The rate that equates the PV of the terminal value of all inflows (compounded at usually the cost of capital) with the year-0 outflow; also called the terminal value method.

Q:: Formula: MIRR?
A:: The nth root of (terminal value of the inflows ÷ initial outflow), minus 1; n = life in years.

Q:: Three deficiencies of IRR that MIRR addresses (ICAI)?
A:: It eliminates multiple IRR rates; it addresses the reinvestment rate issue; it produces results consistent with the NPV method.

Q:: Four advantages of IRR (ICAI)?
A:: Uses the time value of money; considers all cash flows; easier to use, as comparison with the cost of capital gives instant understanding of desirability; helps achieve maximisation of shareholders' wealth.
