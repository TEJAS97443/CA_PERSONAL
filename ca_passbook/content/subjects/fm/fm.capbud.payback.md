---
id: fm.capbud.payback
title: Payback, discounted payback and ARR
minutes: 35
needs: fm.capbud.cashflows
tags: payback period, discounted payback, payback reciprocal, accounting rate of return, ARR, average investment, cut-off rate
labs: capbud
summary: How long a project takes to return its cash (payback, and discounted payback in today's rupees), the payback reciprocal, and the accountant's average rate of return, with their decision rules and limits.
---

## In plain words

### "When do I get my money back?"

Tapri is choosing a format for its Lucknow cafés, and Kesar has one question.

> **Kesar:** Forget the jargon, Dev. When do I get my ₹24 lakh back?
> **Dev:** In four years, if the cash comes in as planned. But rupees in year four are worth less than rupees today.
> **Ritu:** And the books will show a profit only after depreciation. Per year, please, not per lifetime.

Kesar's question is the **payback period**: the time a project takes to recover the cash put into it. It is easy to grasp, and a short payback means less waiting and less risk. But it treats a rupee received in year four as equal to a rupee today, and it stops looking the day the money is back: a format that pays back fast and then dies looks better than one that pays back slowly and earns for twenty years.

Dev's fix is the **discounted payback period**: the same count, using the present value of each year's cash. Ritu's view is the **accounting rate of return (ARR)**: the average yearly profit, after depreciation, as a percentage of the money invested.

::: analogy The cousin's loan
You lend your cousin ₹1 lakh for his shop. Payback asks how soon the ₹1 lakh is back. Discounted payback asks how soon it is back in rupees worth what they were when you lent them. ARR asks what average yearly income the loan earned, by the accountant's book. Only the second cares when the money came; only the third looks past the day you were repaid.
:::

::: key
Payback measures how fast the initial cash outlay is recovered: a guide to liquidity and risk, blind to the time value of money and to every cash flow after payback. Discounted payback cures the first blindness, not the second. ARR covers the whole life but uses accounting profit and ignores the time value of money.
:::

## How it works

### Two families of techniques

ICAI divides capital budgeting techniques into two families (SM 7.17–7.18). The first two do not discount future cash flows; this lesson covers them and the discounted payback period.

::: diagram Capital budgeting techniques
{"type": "nest", "w": 420, "root": {"title": "Capital budgeting techniques", "color": "mute", "children": [
  {"title": "Traditional or non-discounting", "color": "c", "mono": false, "lines": ["Payback period", "Accounting rate of return (ARR)"]},
  {"title": "Time-adjusted or discounted cash flows", "color": "a", "mono": false, "lines": ["Net present value (NPV)", "Profitability index (PI)", "Internal rate of return (IRR)", "Discounted payback period", "Modified internal rate of return (MIRR)"]}]},
 "caption": "Amber box: the traditional techniques; blue box: the discounting techniques (SM 7.18)."}
:::

### Payback period

The payback period is the length of time required for the cumulative total net cash flows from the investment to equal the total initial cash outlays (SM 7.18–7.19). The steps: (a) determine the total initial capital investment (cash outflow); (b) estimate the annual expected after-tax cash flows.

::: steps
1. **Uniform cash flows**: divide the total initial investment by the annual after-tax cash flow. ₹24,00,000 ÷ ₹6,00,000 a year = 4 years.
2. **Non-uniform cash flows**: add the cash inflows year by year. Where the cumulative total equals the outlay, that is the payback; otherwise find the year in which it falls and add the fraction of that year: unrecovered amount ÷ that year's cash inflow.
3. Tapri's delivery e-bikes cost ₹6,00,000 and bring ₹2,00,000, ₹2,50,000, ₹2,00,000 and ₹1,00,000. Two years recover ₹4,50,000; the remaining ₹1,50,000 is ¾ of year 3's ₹2,00,000. **Payback = 2.75 years.**
:::

The fraction assumes the year's cash arrives evenly through the year.

**Advantages** (SM 7.21): it is easy to compute; it is easy to understand, as a quick estimate of the time needed to recoup the cash invested; the length of the payback period can serve as an estimate of a project's risk (the longer, the riskier, since long-term predictions are less reliable), which matters with high obsolescence risk, as in software, or when an organisation is short on cash.

**Limitations** (SM 7.21): it ignores the time value of money; it fails to consider an investment's total profitability, ignoring cash flows after the payback period; and its emphasis on short payback periods ignores long-term projects.

::: diagram Same payback, different futures
{"type": "plot", "h": 300, "x": [0.4, 4.6], "y": [0, 9], "legend": "outside",
 "xlabel": "year", "ylabel": "cash inflow (₹ lakh)",
 "xticks": [1, 2, 3, 4], "yticks": [0, 2, 4, 6, 8],
 "series": [
  {"label": "project A", "bars": true, "bw": 0.34, "values": true, "color": "a", "pts": [[0.82, 5], [1.82, 5], [2.82, 1]]},
  {"label": "project B", "bars": true, "bw": 0.34, "values": true, "color": "b", "pts": [[1.18, 5], [2.18, 5], [3.18, 8], [4.18, 8]]},
  {"label": "payback reached", "pts": [[2.5, 0], [2.5, 9]], "color": "mute", "dash": true}
 ],
 "caption": "Blue: project A; teal: project B; both cost ₹10 lakh. Each recovers it in exactly 2 years (grey dashed line), so payback ranks them equal, though B then earns ₹16 lakh more and A only ₹1 lakh."}
:::

### Payback reciprocal

The payback method gives no cut-off period for decisions. Its reciprocal, average annual cash inflow ÷ initial investment, is argued to be a close approximation of the internal rate of return ==if the life of the project is at least twice the payback period== and the project generates equal annual cash inflows (SM 7.21–7.22). A ₹24 lakh café returning ₹6 lakh a year has a payback reciprocal of 25%.

### Accounting (book) rate of return

The ARR measures the average annual net income of the project (incremental income) as a percentage of the investment (SM 7.22). The numerator is the average annual net income over the useful life, after depreciation. The denominator can be either the **initial investment** (including installation cost) or the **average investment**, the average amount of funds blocked over the life: ½ (initial investment − salvage value) + salvage value, plus any additional working capital (SM 7.24). Some organisations prefer the initial investment because it is objective, not influenced by the depreciation method or the salvage estimate; either may be used, but the same method for all investments under consideration (SM 7.24). The rate is compared with a minimum, the **cut-off rate** (SM 7.26).

**Advantages** (SM 7.24–7.25): it uses readily available data routinely generated for financial reports; it may mirror the method used to evaluate performance, ensuring consistency; it considers all net incomes over the entire life and gives a measure of profitability.

**Limitations** (SM 7.25): it ignores the time value of money; it uses accounting numbers that depend on accounting procedures such as the depreciation method; it ignores cash flows, though net cash flow is a better measure of performance; and the book value of the asset ignores commitments of working capital and other outlays.

### Discounted payback period

The discounted payback period is the payback period computed on cash flows discounted at a predetermined rate (SM 7.42). It is considered superior to simple payback because it takes the time value of money into account. The Study Material's example: a ₹30,000 outlay returning ₹6,000 a year pays back in 5 years, but discounted at 15% it takes about 10 years; as the required rate of return increases, the distortion between simple and discounted payback grows (SM 7.42–7.43). Like simple payback, it ignores the cash flows after the discounted payback period; the shorter the period, the better (ICAI's answer to MTP Series II for May 2024 Q4(c)).

::: lab capbud {"mode":"payback","rate":12,"flows":[["0",-1000000],["1",301500],["2",301500],["3",301500],["4",301500],["5",301500]]}
Step through RTP September 2026 Q7's Machine I: the cumulative line crosses zero at 3.32 years, the discounted one only at 4.49.
:::

### Decision rules

| Technique | Independent project | Mutually exclusive projects |
|---|---|---|
| Payback | Accept if payback ≤ maximum acceptable payback period; reject if longer | Least payback period |
| ARR | Accept if ARR ≥ minimum acceptable rate of return; reject if lower | Maximum ARR |

(SM 7.52)

## Formats and formulas

*Reproduce these from memory.*

::: formula Payback period, uniform cash flows
$$\text{Payback period} = \frac{I}{C}$$
I = total initial capital investment; C = annual expected after-tax net cash flow (SM 7.19).
:::

::: formula Payback period, non-uniform cash flows
$$\text{Payback} = Y + \frac{U}{C_{Y+1}}$$
Y = full years before the outlay is recovered; U = unrecovered outlay (outlay − cumulative inflows of those Y years); C with subscript Y + 1 = cash inflow of the next year.
:::

::: formula Payback reciprocal
$$\text{Payback reciprocal} = \frac{\bar{C}}{I} \times 100$$
C̄ = average annual cash inflow; I = initial investment (SM 7.22).
:::

::: formula Accounting rate of return
$$\text{ARR} = \frac{\text{Average annual net income}}{\text{Investment}}$$
Expressed as a percentage (× 100). Net income = profit after depreciation (and after tax where tax is given). Investment = initial or average investment, as the question says (SM 7.22).
:::

::: formula Average investment
$$\tfrac{1}{2}(I - S) + S + W$$
I = initial investment, S = salvage value, W = additional working capital (SM 7.24). With no working capital this is (I + S) ÷ 2.
:::

**The three versions of ARR** (SM 7.23–7.24)

| Version | Numerator | Denominator |
|---|---|---|
| 1. Annual basis | Profit after depreciation of each year | Investment at the beginning of that year; then average the yearly rates |
| 2. Total investment basis | Average annual profit | Investment in the beginning |
| 3. Average investment basis | Average annual profit | Average investment |

**Discounted payback: the working table** (SM 7.43)

| Year | Cash flow (₹) | PV factor | PV (₹) | Cumulative PV (₹) |
|---|---:|---:|---:|---:|
| 1 | xxx | x.xxx | xxx | xxx |
| 2 | xxx | x.xxx | xxx | xxx |
| … | | | | |

Discounted payback = years before the cumulative PV reaches the outlay + unrecovered amount ÷ that year's PV.

::: definition Payback period
Time required to recover the initial cash-outflow is called pay-back period. (SM 7.18)
:::

::: definition Discounted payback period
The payback period calculated after discounting the cash flows by a predetermined rate. (SM 7.20, 7.42)
:::

## Worked examples

:::: example Kulhad Corner or Express Kiosk?
Tapri can open its Lucknow outlets in one of two formats. Each costs ₹24,00,000, has no salvage value, and is depreciated on the straight-line method over its life. The cash flows after tax are:

| Format | Life | Annual cash flows after tax |
|---|---|---|
| Kulhad Corner | 8 years | ₹6,00,000 every year |
| Express Kiosk | 5 years | ₹9,00,000, ₹8,00,000, ₹5,00,000, ₹4,00,000, ₹2,00,000 |

**Required:**

(i) Calculate the payback period of each format, and the payback reciprocal of Kulhad Corner.

(ii) Calculate the ARR of each format on initial investment and on average investment.

(iii) Rank the formats by each method and comment.

::: answer Show the working
**(i) Payback**

Kulhad Corner: ₹24,00,000 ÷ ₹6,00,000 = **4 years**. Payback reciprocal = ₹6,00,000 ÷ ₹24,00,000 × 100 = **25%**; the life (8 years) is twice the payback, so ICAI's condition for using it as a rough estimate of the IRR holds.

Express Kiosk:

| Year | Cash flow (₹) | Cumulative (₹) |
|---|---:|---:|
| 1 | 9,00,000 | 9,00,000 |
| 2 | 8,00,000 | 17,00,000 |
| 3 | 5,00,000 | 22,00,000 |
| 4 | 4,00,000 | 26,00,000 |
| 5 | 2,00,000 | 28,00,000 |

Payback = 3 years + (₹24,00,000 − ₹22,00,000) ÷ ₹4,00,000 = **3.5 years**.

**(ii) ARR**

| Particulars | Kulhad Corner (₹) | Express Kiosk (₹) |
|---|---:|---:|
| Total cash flows | 48,00,000 | 28,00,000 |
| Less: Total depreciation (= cost, no salvage) | 24,00,000 | 24,00,000 |
| Total profit | 24,00,000 | 4,00,000 |
| Average annual profit | 3,00,000 (÷ 8) | 80,000 (÷ 5) |
| ARR on initial investment (₹24,00,000) | **12.50%** | **3.33%** |
| ARR on average investment (₹12,00,000) | **25.00%** | **6.67%** |

Average investment = ½ (₹24,00,000 − 0) + 0 = ₹12,00,000.

**(iii) Ranking and comment**

| Method | First | Second |
|---|---|---|
| Payback | Express Kiosk (3.5 years) | Kulhad Corner (4 years) |
| ARR (either base) | Kulhad Corner | Express Kiosk |

Payback prefers the kiosk because it recovers the outlay half a year sooner, but it ignores what follows: after payback the kiosk earns only ₹4,00,000 more, Kulhad Corner ₹24,00,000 more. ARR looks at the whole life and reverses the ranking. Neither method considers the time value of money; a discounted technique ([[fm.capbud.npv|NPV]]) should make the final choice.
:::
::::

::::: example The refrigerated vans and Kesar's four-year rule
Tapri's cold-chain division plans to buy refrigerated vans for ₹60,00,000, with a salvage value of ₹6,00,000 at the end of 5 years. They need working capital of ₹4,00,000 at the start, released at the end of year 5. Depreciation is on the straight-line method; tax is 25%; the cost of capital is 12%.

| Year | Earnings before depreciation and tax (₹) |
|---|---:|
| 1 | 18,00,000 |
| 2 | 22,00,000 |
| 3 | 26,00,000 |
| 4 | 24,00,000 |
| 5 | 20,00,000 |

PV factors at 12%: 0.893, 0.797, 0.712, 0.636, 0.567. Tapri's policy: maximum payback 4 years; minimum ARR 20% on average investment.

**Required:**

(i) Calculate the cash flows after tax.

(ii) Calculate the payback period and the discounted payback period.

(iii) Calculate the ARR on average investment.

(iv) Advise whether the vans meet Tapri's policy.

:::: answer Show the working
**Working note.** Depreciation = (₹60,00,000 − ₹6,00,000) ÷ 5 = ₹10,80,000 a year. Initial outlay = ₹60,00,000 + ₹4,00,000 = ₹64,00,000.

**(i) Cash flows after tax**

PBT = EBDT − depreciation ₹10,80,000; CFAT = PAT + depreciation.

| Year | PBT (₹) | Tax @ 25% (₹) | PAT (₹) | CFAT (₹) |
|---|---:|---:|---:|---:|
| 1 | 7,20,000 | 1,80,000 | 5,40,000 | 16,20,000 |
| 2 | 11,20,000 | 2,80,000 | 8,40,000 | 19,20,000 |
| 3 | 15,20,000 | 3,80,000 | 11,40,000 | 22,20,000 |
| 4 | 13,20,000 | 3,30,000 | 9,90,000 | 20,70,000 |
| 5 | 9,20,000 | 2,30,000 | 6,90,000 | 17,70,000 |

Year 5 also brings salvage ₹6,00,000 and working capital ₹4,00,000: a total inflow of ₹27,70,000.

**(ii) Payback and discounted payback**

| Year | Cash flow (₹) | Cumulative (₹) |
|---|---:|---:|
| 1 | 16,20,000 | 16,20,000 |
| 2 | 19,20,000 | 35,40,000 |
| 3 | 22,20,000 | 57,60,000 |
| 4 | 20,70,000 | 78,30,000 |
| 5 | 27,70,000* | 1,06,00,000 |

| Year | PV factor @ 12% | PV (₹) | Cumulative PV (₹) |
|---|---:|---:|---:|
| 1 | 0.893 | 14,46,660 | 14,46,660 |
| 2 | 0.797 | 15,30,240 | 29,76,900 |
| 3 | 0.712 | 15,80,640 | 45,57,540 |
| 4 | 0.636 | 13,16,520 | 58,74,060 |
| 5 | 0.567 | 15,70,590* | 74,44,650 |

*Includes salvage and the release of working capital, as ICAI's answers do.

$$\text{Payback} = 3 + \frac{64{,}00{,}000 - 57{,}60{,}000}{20{,}70{,}000} = 3.31 \text{ years}$$

$$\text{Discounted payback} = 4 + \frac{64{,}00{,}000 - 58{,}74{,}060}{15{,}70{,}590} = 4.33 \text{ years}$$

::: diagram Vans: recovering ₹64 lakh, in cash and in present value
{"type": "plot", "h": 320, "x": [0, 5], "y": [-70, 50],
 "xlabel": "year", "ylabel": "cumulative position (₹ lakh)",
 "xticks": [0, 1, 2, 3, 4, 5], "yticks": [-60, -40, -20, 0, 20, 40],
 "series": [
  {"label": "cumulative cash", "pts": [[0, -64], [1, -47.8], [2, -28.6], [3, -6.4], [4, 14.3], [5, 42]], "color": "a", "dots": true},
  {"label": "cumulative present value", "pts": [[0, -64], [1, -49.53], [2, -34.23], [3, -18.42], [4, -5.26], [5, 10.45]], "color": "d", "dots": true}
 ],
 "points": [{"x": 3.31, "y": 0, "label": "payback 3.31", "pos": "left"}, {"x": 4.33, "y": 0, "label": "DPP 4.33", "pos": "below"}],
 "caption": "Blue: cumulative cash, crossing zero at 3.31 years. Orange: cumulative present value at 12%, crossing at 4.33 years. The orange line ends ₹10.45 lakh above zero: the NPV."}
:::

**(iii) ARR on average investment**

Average annual PAT = (₹5,40,000 + ₹8,40,000 + ₹11,40,000 + ₹9,90,000 + ₹6,90,000) ÷ 5 = ₹42,00,000 ÷ 5 = **₹8,40,000**.

Average investment = ½ (₹60,00,000 − ₹6,00,000) + ₹6,00,000 + working capital ₹4,00,000 = **₹37,00,000**.

The working capital stays blocked for the whole life and comes back in full, so it is added at its full amount, like the salvage. Treating it as part of the outlay gives the same figure: ½ (₹64,00,000 − ₹10,00,000) + ₹10,00,000 = ₹37,00,000. (The Study Material's formula adds "additional working capital", SM 7.24; state the working capital you include.)

ARR = ₹8,40,000 ÷ ₹37,00,000 × 100 = **22.70%**.

**(iv) Advice**

| Test | Policy | Result | Meets policy? |
|---|---|---|---|
| Payback | ≤ 4 years | 3.31 years | Yes |
| ARR (average investment) | ≥ 20% | 22.70% | Yes |
| Discounted payback | ≤ 4 years | 4.33 years | No |

The vans meet Tapri's stated policy (payback and ARR). Once the time value of money is counted they take 4.33 years to recover their cost in present-value terms, beyond four years; but they do recover it within their life, and the cumulative present value ends ₹10,44,650 above the outlay, a positive [[fm.capbud.npv|NPV]]. Dev would accept the vans and suggest a discounted payback limit in the policy.
::::
:::::

:::: example Two vending machines, three ARRs
Tapri must choose one tea-vending machine for its office-tower kiosks. Both cost ₹4,80,000, last 4 years and are depreciated on the straight-line method.

| Particulars | Kulhad-Mini | Steel-Pro |
|---|---:|---:|
| Salvage value at the end of year 4 (₹) | nil | 1,60,000 |
| Profit after depreciation and tax, year 1 (₹) | 30,000 | 64,000 |
| Year 2 (₹) | 50,000 | 64,000 |
| Year 3 (₹) | 70,000 | 64,000 |
| Year 4 (₹) | 90,000 | 64,000 |

**Required:**

(i) Calculate the ARR of each machine by each of ICAI's three versions.

(ii) Rank the machines under each version and comment on which basis Tapri should use.

::: answer Show the working
Depreciation: Kulhad-Mini ₹4,80,000 ÷ 4 = ₹1,20,000 a year; Steel-Pro (₹4,80,000 − ₹1,60,000) ÷ 4 = ₹80,000 a year.

**Version 1: annual basis** (profit ÷ investment at the beginning of the year)

| Year | Kulhad-Mini: investment (₹) | ARR | Steel-Pro: investment (₹) | ARR |
|---|---:|---:|---:|---:|
| 1 | 4,80,000 | 6.25% | 4,80,000 | 13.33% |
| 2 | 3,60,000 | 13.89% | 4,00,000 | 16.00% |
| 3 | 2,40,000 | 29.17% | 3,20,000 | 20.00% |
| 4 | 1,20,000 | 75.00% | 2,40,000 | 26.67% |
| **Average ARR** | | **31.08%** | | **19.00%** |

**Version 2: total investment basis.** Average annual profit: Kulhad-Mini ₹2,40,000 ÷ 4 = ₹60,000; Steel-Pro ₹64,000.

- Kulhad-Mini: ₹60,000 ÷ ₹4,80,000 × 100 = **12.50%**
- Steel-Pro: ₹64,000 ÷ ₹4,80,000 × 100 = **13.33%**

**Version 3: average investment basis.**

- Kulhad-Mini: average investment = (₹4,80,000 + 0) ÷ 2 = ₹2,40,000; ARR = ₹60,000 ÷ ₹2,40,000 × 100 = **25.00%**
- Steel-Pro: average investment = (₹4,80,000 + ₹1,60,000) ÷ 2 = ₹3,20,000; ARR = ₹64,000 ÷ ₹3,20,000 × 100 = **20.00%**

**(ii) Ranking**

| Version | Kulhad-Mini | Steel-Pro | First |
|---|---:|---:|---|
| 1: annual basis | 31.08% | 19.00% | Kulhad-Mini |
| 2: total investment | 12.50% | 13.33% | Steel-Pro |
| 3: average investment | 25.00% | 20.00% | Kulhad-Mini |

**Comment.** The answer depends on the base. Kulhad-Mini wins on versions 1 and 3 only because it has no salvage, so its book value (the denominator) falls faster; its year-4 rate of 75% is earned on a book value of just ₹1,20,000. On the initial investment, which is the same for both, Steel-Pro earns more profit a year and comes first. The Study Material notes that some organisations prefer the initial investment because it is objectively determined and is not influenced by the choice of the depreciation method or the estimation of the salvage value, and that the same method must be used for all investments under consideration (SM 7.24). ARR also ignores timing: Steel-Pro's profits arrive earlier, which no version of ARR rewards. A discounted method settles the choice.
:::
::::

::: lab capbud {"mode":"payback","rate":12,"basis":"pat","salvage":240000,"flows":[["0",-2400000],["1",495000],["2",1095000],["3",945000],["4",795000]]}
Here is January 2026 Q2(b), Algo Steel: profits after tax turned into cash flows, the paybacks, then the ARR on initial and on average investment.
:::

## Under the hood

### How close is the payback reciprocal?

For equal annual cash flows, the true IRR is always below the reciprocal, and approaches it only as the life grows. For Kulhad Corner (payback 4 years, reciprocal 25%):

| Life of the project | 8 years | 10 years | 16 years | 30 years |
|---|---:|---:|---:|---:|
| IRR | 18.62% | 21.41% | 24.22% | 24.97% |

So treat the reciprocal as a quick upper estimate, and in a theory answer quote ICAI's two conditions: life at least twice the payback, and equal annual cash inflows.

### Payback with later outlays

Cash needed during the project (an overhaul, extra working capital, a second instalment of the machine price) reduces the cumulative total in the year it is paid; payback is reached when the net cumulative total first equals the outlay. A tax holiday raises the early cash flows: in September 2026's Case Scenario I, three tax-free years of ₹220 lakh and then ₹184 lakh a year pay back ₹800 lakh in 3 + 140 ÷ 184 = 3.76 years.

### Payback in reverse

Given the IRR and equal cash flows, the investment is cash flow × PVAF at the IRR, so the payback equals that PVAF in years. MTP Series I for January 2025 MCQ 7 used exactly this: PVAF 3.79 gives a payback of 3.79 years.

## Exam angle

::: exam Where payback and ARR appeared, May 2024 to September 2026
The 12 ICAI documents read for this lesson used them like this, usually as one part of a larger capital budgeting question:

- **Theory, 2 marks**: "Discuss the relevance of payback reciprocal in capital budgeting decisions" (May 2024 Q4(c)); "Explain the concept of discounted payback period" (MTP Series II for May 2024 Q4(c)); "Write a short note on cut-off rate" (MTP Series I for May 2024 Q2(b)).
- **Descriptive parts**: discounted payback in May 2024 Q3(a)(ii) and May 2025 Q3(a)(iv) (1 mark), and for two machines in RTP September 2026 Q7; ARR on average investment with NPV in January 2026 Q2(b) (5 marks).
- **MCQs, 1–2 marks**: payback reciprocal (MTP Series II for May 2024 MCQ 4: the Study Material's own numbers); payback from the IRR (MTP Series I for January 2025 MCQ 7); payback, ARR and PI of two machines (RTP May 2025 Q1; MTP Series II for May 2026 MCQs 1–3); payback with a tax holiday (September 2026 MCQ 4).
:::

::: exam The traps ICAI used
- ARR "based on average investment" (January 2026 Q2(b)): average investment = (₹24,00,000 + ₹2,40,000) ÷ 2, with ARR on average PAT.
- RTP January 2026 Q9 worked backwards: the initial investment from the MIRR and the terminal value (₹5,00,000), the annual cash flow from the simple payback of 5 years (₹1,00,000), and the WACC from the discounted payback of 7 years (PVAF for 7 years = 5, so 9%); then NPV, PI and ARR (profit after depreciation ÷ initial investment, 7.5%).
- Salvage and working capital released are added to the last year's inflow in the discounted payback table, marked "includes salvage value" (SM 7.89; May 2025 Q3(a)).
- State the denominator of ARR you use; the answers accept initial or average investment when the question is silent (MTP Series I for September 2024 Q3(a)).
:::

::: trick Discounted payback is never shorter
With an outlay at the start, positive inflows and a positive discount rate, every present value is smaller than its cash flow, so the discounted payback is always at least the simple payback. A discounted payback shorter than the payback is an arithmetic slip.
:::

## Answer frame

**Relevance of payback reciprocal** (May 2024 Q4(c), ICAI's points): reciprocal of the payback is a close approximation of the IRR if the life is at least twice the payback period and the cash inflows are equal; a helpful tool for quick estimation of the rate of return; formula: average annual cash flow ÷ initial investment, or 1 ÷ payback period.

**Concept of discounted payback period** (MTP Series II for May 2024 Q4(c)): payback is the time to recover the investment from project cash flows, focused on liquidity, ignoring time value and profitability; discounted payback uses cash flows discounted at the cost of capital; the period in which discounted cash flows equal the initial outflow; shorter is better; it still ignores cash flows after that period.

**Short note on cut-off rate** (MTP Series I for May 2024 Q2(b), ICAI's points): the minimum rate of return the management wishes to have from any project; usually based on the cost of capital; the management gains only if a project returns more than the cut-off rate; so it can be used as the discount rate or opportunity cost rate. Add the Study Material's example: a proposal yielding less than the cut-off rate is automatically rejected (SM 7.26).

**Advantages and limitations** of payback or ARR: ICAI's lists above, in ICAI's order, a line each.

## Common mistakes

::: mistake Hall of Shame: the payback that rounded itself up
Writing "payback: in the 4th year" or "4 years" when three years recover ₹57,60,000 of ₹64,00,000. **Fix:** add the fraction: unrecovered ₹6,40,000 ÷ year 4's ₹20,70,000 = 0.31, so 3.31 years. Divide by that year's cash flow, not by the cumulative total.
:::

::: mistake ARR on cash instead of profit
Putting the average cash flow after tax in the ARR numerator: ₹19,20,000 ÷ ₹37,00,000 = 51.89% for the vans. **Fix:** ARR uses average annual net income after depreciation (₹8,40,000), giving 22.70%.
:::

::: mistake The average investment that lost its salvage
Taking half the initial investment (₹30,00,000) as the average investment. **Fix:** ½ (initial − salvage) + salvage + working capital = ₹37,00,000; salvage and working capital stay blocked to the end.
:::

::: mistake The discount that shortened payback
Discounting the outlay as well, or reading PV factors from the wrong row, and getting a discounted payback below the simple payback. **Fix:** only future inflows are discounted; the year-0 outlay stays at face value, and the discounted payback is never shorter.
:::

## Practice

::: quiz Check yourself
Q: A Tapri app feature costs ₹9,00,000 and brings cash flows after tax of ₹3,00,000, ₹4,00,000, ₹3,00,000 and ₹2,00,000 in years 1 to 4. What is its payback period in years (2 decimals)?
= 2.66..2.67
> Two years recover ₹7,00,000; the remaining ₹2,00,000 is 2/3 of year 3's ₹3,00,000. Payback = 2.67 years.

Q: Case scenario. Tapri's e-rickshaw fleet costs ₹10,00,000 and brings ₹4,00,000 a year for 4 years. The cost of capital is 10% (PV factors 0.909, 0.826, 0.751, 0.683). Ritu presents the payback and discounted payback to the board. Which of the following is correct?
- [x] Payback 2.50 years; discounted payback 3.02 years
- [ ] Payback 2.50 years; discounted payback 2.27 years
- [ ] Payback 3.02 years; discounted payback 2.50 years
- [ ] Payback 2.50 years; discounted payback 4.00 years
> Payback = ₹10,00,000 ÷ ₹4,00,000 = 2.5 years. PVs: 3,63,600; 3,30,400; 3,00,400; 2,73,200; three years recover ₹9,94,400, so DPP = 3 + 5,600 ÷ 2,73,200 = 3.02 years. A DPP below the payback is impossible; the third option swaps them.

Q: Which of the following is NOT a limitation of the payback period method?
- [ ] It ignores the time value of money
- [ ] It ignores cash flows after the payback period
- [ ] Its emphasis on short payback periods ignores long-term projects
- [x] It depends on accounting procedures such as the depreciation method
> The last is a limitation of ARR (SM 7.25). Payback works on cash flows; the other three are ICAI's limitations of payback (SM 7.21).

Q: A machine costs ₹8,00,000, has no salvage value and a 4-year life, and is depreciated on the straight-line method. Its cash flow after tax is ₹2,60,000 a year. What is its ARR on average investment?
- [ ] 65%
- [ ] 32.5%
- [x] 15%
- [ ] 7.5%
> Average profit = ₹2,60,000 − ₹2,00,000 depreciation = ₹60,000; average investment = ₹4,00,000; ARR = 15%. 65% puts cash in the numerator; 7.5% divides profit by the initial investment.

Q: A project costs ₹10,00,000, has a salvage value of ₹2,00,000 and needs additional working capital of ₹1,00,000 during its life. What is its average investment (₹)?
= 700000
> ½ (₹10,00,000 − ₹2,00,000) + ₹2,00,000 + ₹1,00,000 = ₹7,00,000 (SM 7.24).
:::

## Recap

- Payback = initial investment ÷ annual cash flow after tax (uniform); otherwise cumulate and add the fraction: unrecovered ÷ that year's cash flow.
- Payback: easy, a guide to risk and liquidity; ignores time value, cash flows after payback, long-term projects.
- Payback reciprocal = average annual cash inflow ÷ initial investment; approximates IRR only if life ≥ 2 × payback and inflows are equal.
- ARR = average annual net income (after depreciation) ÷ initial or average investment; the same base for every project.
- Average investment = ½ (initial − salvage) + salvage + additional working capital.
- Discounted payback: payback on discounted cash flows; considers time value; still ignores later cash flows; never shorter than payback.
- Accept: payback ≤ maximum acceptable; ARR ≥ minimum acceptable (cut-off). Mutually exclusive: least payback, highest ARR.
- Last year of a payback or discounted payback table: add salvage and working capital released to that year's inflow. (The cousin's loan: how soon back, how soon back in today's rupees, what it earned by the book.)

## Flashcards

Q:: ICAI's definition of payback period?
A:: Time required to recover the initial cash-outflow; the length of time for the cumulative net cash flows to equal the total initial cash outlays.

Q:: Payback period with non-uniform cash flows: how is the fraction of the last year found?
A:: Unrecovered outlay at the start of that year ÷ cash inflow of that year.

Q:: Three advantages of the payback period (ICAI)?
A:: Easy to compute; easy to understand as a quick estimate of the time to recoup the cash invested; its length can serve as an estimate of risk.

Q:: Three limitations of the payback period (ICAI)?
A:: Ignores the time value of money; ignores total profitability (cash flows after payback); emphasis on short payback ignores long-term projects.

Q:: Formula and conditions for the payback reciprocal?
A:: Average annual cash inflow ÷ initial investment; a close approximation of IRR if the life is at least twice the payback period and annual cash inflows are equal.

Q:: ICAI's definition of ARR?
A:: The average annual net income of the project (incremental income) as a percentage of the investment (initial or average).

Q:: Formula: average investment for ARR?
A:: ½ (initial investment − salvage value) + salvage value, plus additional working capital if any.

Q:: Four limitations of ARR (ICAI)?
A:: Ignores the time value of money; depends on accounting procedures such as depreciation; ignores cash flows; book value ignores working capital and other outlays.

Q:: What is the discounted payback period, and why is it considered superior to simple payback?
A:: The payback period computed on cash flows discounted at a predetermined rate; it takes the time value of money into account.

Q:: As the required rate of return increases, what happens to the gap between simple and discounted payback?
A:: The distortion between them grows.

Q:: Decision rule for payback and ARR, independent and mutually exclusive projects?
A:: Payback: accept if ≤ maximum acceptable payback; choose the least payback. ARR: accept if ≥ minimum acceptable rate; choose the maximum ARR.
