---
id: fm.capbud.npv
title: NPV, profitability index and equivalent annual cost
minutes: 40
needs: fm.capbud.cashflows, fm.coc.wacc
tags: net present value, NPV, profitability index, desirability factor, equivalent annual cost, equivalent annualised criterion, unequal lives, replacement chain
labs: capbud
summary: Bring every cash flow to today at the cost of capital: NPV and its decision rule, the profitability index for ranking, and equivalent annual figures for projects with unequal lives.
---

## In plain words

### Dev's favourite three letters

> **Ritu:** Nice tie, Dev.
> **Dev:** Thank you. A compliment received next year would be worth less, of course.
> **Kesar:** Focus. The app upgrade costs ₹10 lakh and brings back ₹3, 4, 4 and 3 lakh over four years. ₹14 lakh back, ₹4 lakh profit. Done?
> **Dev:** Not yet. Bring every rupee back to today at our 12% cost of capital, then subtract the ₹10 lakh. What is left is the NPV.

A rupee today is worth more than a rupee next year, because today's rupee could be invested and earn the cost of capital meanwhile. So a future cash flow is shrunk to its **present value** before it is added to anything. At 12%, the ₹3 lakh of year 1 is worth ₹2.68 lakh today and the ₹3 lakh of year 4 only ₹1.91 lakh. The four inflows together are worth ₹10.62 lakh today.

The **net present value (NPV)** is that ₹10.62 lakh minus the ₹10 lakh paid: ₹0.62 lakh, not ₹4 lakh. It is positive, so the upgrade earns more than the 12% the money costs, and Tapri's owners are ₹62,300 richer in today's money. The same comparison as a ratio, ₹10.62 lakh ÷ ₹10 lakh = 1.06, is the **profitability index**. And when two machines last different numbers of years, Dev turns each NPV, or each cost, into an equal amount per year before comparing: the **equivalent annual** figure.

::: analogy Converting currencies
You cannot add dollars, dirhams and rupees until you convert them into one currency. Rupees of 2027, 2028 and 2030 are different currencies too; the discount factor is the exchange rate into today's rupees. NPV is what is left after converting everything and paying the bill.
:::

::: key
NPV converts every cash flow into today's rupees at the cost of capital and nets them: accept a project when NPV ≥ 0, because a positive NPV is the addition to shareholders' wealth. PI is the same test as a ratio; equivalent annual figures make projects with different lives comparable.
:::

## How it works

### What a future rupee is worth today

Discounting techniques consider the time value of money and discount cash flows to their present value (SM 7.26). The discount rate is, in theory, the return the firm would earn by investing the same funds in the best available alternative investment of the same risk. That is hard to find in practice, so a firm may set a minimum rate of return that all projects must meet (based on an industry average or the cost of other investment opportunities), and many firms use the overall cost of capital, [[fm.coc.wacc|the WACC]] (SM 7.26–7.27). The present value factor for year t at rate k is 1 ÷ (1 + k)ᵗ; ICAI's tables give it to three decimals (0.893, 0.797, 0.712, 0.636 at 12%).

::: diagram The app upgrade: cash flows and their present values
{"type": "plot", "h": 300, "x": [0.4, 4.6], "y": [0, 4.6],
 "xlabel": "year", "ylabel": "amount (₹ lakh)",
 "xticks": [1, 2, 3, 4], "yticks": [0, 1, 2, 3, 4],
 "series": [
  {"label": "cash flow", "bars": true, "bw": 0.34, "values": true, "color": "a", "pts": [[0.82, 3], [1.82, 4], [2.82, 4], [3.82, 3]]},
  {"label": "present value at 12%", "bars": true, "bw": 0.34, "values": true, "color": "b", "pts": [[1.18, 2.679, "2.68"], [2.18, 3.188, "3.19"], [3.18, 2.848, "2.85"], [4.18, 1.908, "1.91"]]}
 ],
 "caption": "Blue: the cash flow; teal: its present value at 12%. The later the rupee, the more it shrinks. The teal bars add up to ₹10.62 lakh against the ₹10 lakh paid today."}
:::

### Net present value

The net present value of a project is the amount, in current value, ==the investment earns after paying cost of capital in each period== (SM 7.27). When further investment is needed during the life, NPV = present value of cash inflows − present value of cash outflows. ICAI's steps (SM 7.28):

::: steps
1. Determine the net cash inflow in each year of the investment ([[fm.capbud.cashflows|relevant cash flows]]).
2. Select the desired rate of return, discounting rate or weighted average cost of capital.
3. Find the discount factor for each year at that rate.
4. Multiply each year's net cash flow by its discount factor: the present value of the cash flows.
5. Total the present values: the NPV.
:::

**Decision rule** (SM 7.28): if NPV ≥ 0, accept the proposal; if NPV < 0, reject it. Between mutually exclusive projects, select the one with the higher NPV.

**Advantages** (SM 7.30): it takes into account the time value of money; the whole stream of cash flows is considered; the NPV can be seen as the addition to the wealth of shareholders, in conformity with basic financial objectives; and since it expresses cash flows in current rupees, NPVs of different projects can be compared, each project evaluated on its own merit.

**Limitations** (SM 7.30): it involves difficult calculations; it needs forecasts of cash flows and of the discount rate, and is only as accurate as they are; and it is an absolute measure, ignoring differences in initial outflows and size when mutually exclusive projects are compared.

The higher the discount rate, the lower the present values and the NPV:

::: diagram NPV of the app upgrade at different discount rates
{"type": "plot", "h": 300, "x": [0, 24], "y": [-2, 4.5],
 "xlabel": "discount rate (%)", "ylabel": "NPV (₹ lakh)",
 "xticks": [0, 4, 8, 12, 16, 20, 24], "yticks": [-2, -1, 0, 1, 2, 3, 4],
 "series": [
  {"label": "NPV", "fn": "3/(1+x/100)+4/(1+x/100)^2+4/(1+x/100)^3+3/(1+x/100)^4-10", "color": "a"}
 ],
 "points": [{"x": 12, "y": 0.62, "label": "12%: ₹0.62 lakh", "pos": "right"}, {"x": 14.9, "y": 0, "label": "zero near 14.9%", "pos": "right"}],
 "legend": "none",
 "caption": "At 0% the NPV is the undiscounted ₹4 lakh; at Tapri's 12% it is ₹0.62 lakh; near 14.9% it reaches zero. That rate is the project's IRR, the subject of the next lesson."}
:::

### Profitability index

The **profitability index (PI)**, also called the desirability factor or present value index, compares proposals with different cash flows: sum of discounted cash inflows ÷ initial cash outlay or total discounted cash outflow, as the case may be (SM 7.31). **Decision rule**: if PI ≥ 1, accept; if PI < 1, reject. In ICAI's illustration, a project with the largest inflows (₹1,00,30,000 against an outflow of ₹1,00,20,000) has the lowest desirability factor, 1.001: PI helps rank projects (SM 7.31–7.32).

Since PI is an extension of NPV it has the same advantages and limitations, and some of its own (SM 7.32). **Advantages**: it uses the time value of money; as present value of inflows ÷ present value of outflows, it is a relative measure of profitability. **Limitations**: it fails as a guide in resolving capital rationing where projects are indivisible; once a single large project with high NPV is selected, several small projects with a higher total NPV are excluded; and a project with a lower PI may generate cash that lets another project start a year or two later, for a higher total NPV. So PI cannot be used indiscriminately; all alternatives must be worked out.

NPV ≥ 0 and PI ≥ 1 are the same test, so they always agree on accepting or rejecting a single project. They can **rank** mutually exclusive projects differently: NPV in absolute rupees, PI as a ratio (ICAI's RTP for January 2025, Q11(c)). The Study Material's PI section says the project with the higher PI is selected among mutually exclusive projects (SM 7.31); its summary table narrows this to "when Net Present Value is same", and otherwise picks the project with the highest positive NPV (SM 7.52). Where its illustrations meet a ranking conflict (NPV against IRR) they follow NPV, which "generally gives consistent results in conformity with the wealth maximization principle" (SM 7.59). So when NPV and PI rank mutually exclusive projects differently, decide on NPV and say why. Under capital rationing, ranking by PI comes into its own: see [[fm.capbud.rationing|capital rationing]].

::: lab capbud {"mode":"npv","rate":10,"flows":[["0",-100000],["1",55000],["2",80000],["3",15000]]}
Step through Study Material Illustration 3: each year discounted bar by bar, then the NPV and the PI.
:::

### When lives differ

Comparing the NPV of a 3-year machine with that of a 6-year machine is unfair: the 3-year one could be bought again and earn a second NPV. For replacing an old asset, or choosing between mutually exclusive proposals with unequal lives, ICAI gives two methods (SM 7.54–7.56):

- **Replacement chain (common life) method**: repeat the shorter project until the lives match, then compare NPVs over the common life. Its drawback: a 3-year and a 5-year project need a 15-year analysis.
- **Equivalent annualised criterion**: (a) compute each NPV at the WACC or discount rate; (b) compute the present value annuity factor (PVAF) of that rate for each project's life; (c) divide (a) by (b) and compare. The higher equivalent annual NPV wins.

When the alternatives do the same job and only their costs differ, the same idea gives the **equivalent annual cost**: present value of all costs (net of salvage) ÷ PVAF for the life. The lower equivalent annual cost wins (SM 7.93, Test Your Knowledge practical problem 6; SM 7.100, problem 12).

::: diagram Which number decides?
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "Projects with NPVs"},
  {"id": "d1", "kind": "decision", "label": "Mutually\nexclusive?"},
  {"id": "ind", "kind": "end", "label": "Accept all\nwith NPV ≥ 0", "color": "ok"},
  {"id": "d2", "kind": "decision", "label": "Same\nlife?"},
  {"id": "hi", "kind": "end", "label": "Highest NPV\n(PI if tied)", "color": "f"},
  {"id": "d3", "kind": "decision", "label": "Only costs\ndiffer?"},
  {"id": "eac", "kind": "end", "label": "Lowest\nEAC", "color": "c"},
  {"id": "ean", "kind": "end", "label": "Highest\nEAN", "color": "c"}],
 "edges": [["s", "d1"], ["d1", "d2", "yes"], ["d1", "ind", "no"], ["d2", "d3", "no"], ["d2", "hi", "yes"], ["d3", "eac", "yes"], ["d3", "ean", "no"]],
 "caption": "EAC: equivalent annual cost; EAN: equivalent annualised NPV. Green: independent projects; violet: equal lives; amber: unequal lives. Under capital rationing, independent projects are ranked instead (next lessons)."}
:::

**Decision rules** (SM 7.52)

| Technique | Independent project | Mutually exclusive projects |
|---|---|---|
| NPV | Accept if NPV ≥ 0; reject if NPV < 0 | Highest positive NPV |
| PI | Accept if PI ≥ 1; reject if PI < 1 | When NPV is the same, highest PI |

## Formats and formulas

*Reproduce these from memory.*

::: formula Net present value
$$\text{NPV} = \sum_{t=1}^{n} \frac{C_t}{(1+k)^t} - I$$
Cₜ = cash flow of year t, k = discount rate, n = life of the project, I = investment (SM 7.27–7.28). With outflows later in the life: NPV = PV of cash inflows − PV of cash outflows.
:::

::: formula Profitability index
$$\text{PI} = \frac{\text{Sum of discounted cash inflows}}{\text{Discounted cash outflow}}$$
The denominator is the initial cash outlay or the total discounted cash outflow, as the case may be (SM 7.31).
:::

::: formula Equivalent annualised NPV and equivalent annual cost
$$\text{EAN} = \frac{\text{NPV}}{\text{PVAF}_{k,n}} \qquad \text{EAC} = \frac{\text{PV of costs}}{\text{PVAF}_{k,n}}$$
PVAF = present value annuity factor at the discount rate k for the project's own life n (SM 7.56). Higher EAN or lower EAC wins.
:::

**The NPV statement** (SM 7.29)

| Year | Net cash flow (₹) | PV factor @ k | Discounted cash flow (₹) |
|---|---:|---:|---:|
| 0 | (xxx) | 1.000 | (xxx) |
| 1 | xxx | x.xxx | xxx |
| … | | | |
| **Net present value** | | | **xxx** |

For equal yearly flows, one line: cash flow × PVAF for years 1 to n.

::: definition Net present value
The net present value of a project is the amount, in current value of amount, the investment earns after paying cost of capital in each period. (SM 7.27)
:::

## Worked examples

:::: example Two packaging lines, one floor
Tapri's premix plant has room for one sachet-packing line. Line P costs ₹80,00,000 and has a salvage value of ₹5,00,000 after 5 years; line Q costs ₹30,00,000 with no salvage after 5 years. Both are depreciated on the straight-line method; tax is 25% and the cost of capital 12% (PV factors 0.893, 0.797, 0.712, 0.636, 0.567). Earnings before depreciation and tax:

| Year | Line P (₹) | Line Q (₹) |
|---|---:|---:|
| 1 | 24,00,000 | 12,00,000 |
| 2 | 29,00,000 | 14,00,000 |
| 3 | 34,00,000 | 16,00,000 |
| 4 | 31,00,000 | 14,00,000 |
| 5 | 26,00,000 | 12,00,000 |

**Required:**

(i) Calculate the NPV and the profitability index of each line.

(ii) Which line should Tapri install? Would the answer change if the two lines were independent and could both be installed?

::: answer Show the working
**Working note. Depreciation**: P = (₹80,00,000 − ₹5,00,000) ÷ 5 = ₹15,00,000; Q = ₹30,00,000 ÷ 5 = ₹6,00,000. CFAT = (EBDT − depreciation) × 0.75 + depreciation.

**Line P**

| Year | CFAT (₹) | PV factor @ 12% | PV (₹) |
|---|---:|---:|---:|
| 1 | 21,75,000 | 0.893 | 19,42,275 |
| 2 | 25,50,000 | 0.797 | 20,32,350 |
| 3 | 29,25,000 | 0.712 | 20,82,600 |
| 4 | 27,00,000 | 0.636 | 17,17,200 |
| 5 | 23,25,000 + salvage 5,00,000 = 28,25,000 | 0.567 | 16,01,775 |
| | **PV of inflows** | | **93,76,200** |

NPV = ₹93,76,200 − ₹80,00,000 = **₹13,76,200**; PI = ₹93,76,200 ÷ ₹80,00,000 = **1.172**.

**Line Q**

| Year | CFAT (₹) | PV factor @ 12% | PV (₹) |
|---|---:|---:|---:|
| 1 | 10,50,000 | 0.893 | 9,37,650 |
| 2 | 12,00,000 | 0.797 | 9,56,400 |
| 3 | 13,50,000 | 0.712 | 9,61,200 |
| 4 | 12,00,000 | 0.636 | 7,63,200 |
| 5 | 10,50,000 | 0.567 | 5,95,350 |
| | **PV of inflows** | | **42,13,800** |

NPV = ₹42,13,800 − ₹30,00,000 = **₹12,13,800**; PI = ₹42,13,800 ÷ ₹30,00,000 = **1.405**.

**(ii) Decision**

| | Line P | Line Q |
|---|---:|---:|
| NPV (₹) | 13,76,200 | 12,13,800 |
| PI | 1.172 | 1.405 |
| Rank by NPV | 1 | 2 |
| Rank by PI | 2 | 1 |

The lines are mutually exclusive and the NPVs differ, so the higher NPV decides: **install line P**, which adds ₹1,62,400 more to shareholders' wealth. PI favours Q because it is a ratio and Q is smaller. If the lines were independent, both would be accepted: each has NPV > 0 and PI > 1.
:::
::::

::: lab capbud {"mode":"npv","rate":10,"salvage":50000,"flows":[["0",-308640],["1",100000],["2",100000],["3",80000],["4",80000]]}
Here is May 2025 Q3(a): four years of inflows and a salvage value discounted at 10%, ending on the NPV and the PI.
:::

::::: example The kulhad machines and the price tag that moves
Tapri must choose one of two kulhad-moulding machines (mutually exclusive). The cost of capital is 10%.

| Particulars | Machine K4 | Machine K8 |
|---|---:|---:|
| Cost (₹) | 12,00,000 | 22,00,000 |
| Life | 4 years | 8 years |
| Cash flow after tax, every year (₹) | 4,80,000 | 4,90,000 |

PVAF at 10%: 4 years 3.170; 8 years 5.335. PVF at 10%, year 4: 0.683. The supplier has told Ritu that a K4 bought at the end of year 4 will cost ₹15,60,000; its cash flows would be the same as the first one's.

**Required:**

(i) Calculate the NPV and PI of each machine.

(ii) Recommend a machine using the equivalent annualised criterion.

(iii) Evaluate the two machines over a common life of 8 years by the replacement chain method, using the supplier's price for the second K4, and advise.

:::: answer Show the working
**(i) NPV and PI**

| Particulars | K4 (₹) | K8 (₹) |
|---|---:|---:|
| PV of inflows | 15,21,600 | 26,14,150 |
| Less: Cost | 12,00,000 | 22,00,000 |
| **NPV** | **3,21,600** | **4,14,150** |
| PI | 1.27 | 1.19 |

PV of inflows: K4 ₹4,80,000 × 3.170; K8 ₹4,90,000 × 5.335. On NPV alone K8 looks better, but it runs twice as long. (Annuity factors as given; summing the rounded yearly factors gives 3.169 and 5.334, which lowers the NPVs by ₹480 and ₹490 and changes nothing below.)

**(ii) Equivalent annualised criterion**

| Particulars | K4 | K8 |
|---|---:|---:|
| NPV (₹) | 3,21,600 | 4,14,150 |
| PVAF at 10% for the machine's life | 3.170 | 5.335 |
| **Equivalent annualised NPV (₹)** | **1,01,451** | **77,629** |

On this criterion K4 earns more per year of service.

**(iii) Replacement chain over 8 years**

The second K4 is not a repeat of the first: it costs ₹15,60,000, not ₹12,00,000.

| Particulars | Amount (₹) |
|---|---:|
| NPV of the first K4 (year 0) | 3,21,600 |
| NPV of the second K4 at the end of year 4 (15,21,600 − 15,60,000) | (38,400) |
| PV of the second K4's NPV (× 0.683) | (26,227) |
| **NPV of the K4 chain over 8 years** | **2,95,373** |
| NPV of K8 over 8 years | 4,14,150 |

::: diagram K4 bought twice against K8
{"type": "plot", "h": 300, "x": [-0.6, 8.6], "y": [-24, 8], "legend": "outside",
 "xlabel": "year", "ylabel": "cash flow (₹ lakh)",
 "xticks": [0, 1, 2, 3, 4, 5, 6, 7, 8], "yticks": [-20, -15, -10, -5, 0, 5],
 "series": [
  {"label": "K4, bought twice", "bars": true, "bw": 0.34, "values": true, "color": "a", "pts": [[-0.18, -12], [0.82, 4.8], [1.82, 4.8], [2.82, 4.8], [3.82, -10.8], [4.82, 4.8], [5.82, 4.8], [6.82, 4.8], [7.82, 4.8]]},
  {"label": "K8", "bars": true, "bw": 0.34, "values": true, "color": "d", "pts": [[0.18, -22], [1.18, 4.9], [2.18, 4.9], [3.18, 4.9], [4.18, 4.9], [5.18, 4.9], [6.18, 4.9], [7.18, 4.9], [8.18, 4.9]]}
 ],
 "caption": "Blue: K4 and its dearer replacement; in year 4 the ₹4.8 lakh inflow and the second ₹15.6 lakh purchase net to −₹10.8 lakh. Orange: K8."}
:::

**Recommendation.** Machine K8. Over the same 8 years it adds ₹4,14,150 against ₹2,95,373 for the K4 chain. The equivalent annualised NPV pointed to K4 because it spreads each machine's own NPV over its own life, which compares the two fairly only if K4 can be bought again on the same terms. At the old price of ₹12,00,000 the chain would be worth ₹3,21,600 × 1.683 = ₹5,41,253 and would agree with the equivalent annualised NPV; K4 stays ahead only while its replacement costs less than about ₹13,86,000. When the second purchase is known to differ, lay out the common-life cash flows and decide on their NPV.
::::
:::::

:::: example Zippy or Volt: scooters that only cost
Tapri's delivery arm will buy electric scooters of one brand. Both do the same job; ignore tax. The cost of capital is 12%.

| Particulars | Zippy | Volt |
|---|---:|---:|
| Cost per scooter (₹) | 1,20,000 | 80,000 |
| Life | 4 years | 3 years |
| Running cost a year (₹) | 30,000 | 40,000 |
| Salvage at the end of life (₹) | 20,000 | nil |

PVAF at 12%: 4 years 3.037; 3 years 2.402. PVF at 12%, year 4: 0.636.

**Required:** Kesar compares the present value of each scooter's costs over its life and picks the cheaper. Calculate the equivalent annual cost of each and advise.

::: answer Show the working
| Particulars | Zippy (₹) | Volt (₹) |
|---|---:|---:|
| Cost now | 1,20,000 | 80,000 |
| Add: PV of running costs | 30,000 × 3.037 = 91,110 | 40,000 × 2.402 = 96,080 |
| Less: PV of salvage | 20,000 × 0.636 = (12,720) | nil |
| **PV of costs over the life** | **1,98,390** | **1,76,080** |
| PVAF for the life | 3.037 | 2.402 |
| **Equivalent annual cost** | **65,324** | **73,306** |

Kesar's comparison of ₹1,98,390 with ₹1,76,080 sets four years of Zippy against three years of Volt. Per year of service Zippy costs ₹65,324 and Volt ₹73,306: **buy Zippy**, the lower equivalent annual cost, saving about ₹7,982 a scooter every year. (Factors as given; the four rounded yearly factors at 12% sum to 3.038, which puts Zippy at ₹65,313.)
:::
::::

## Under the hood

### Rounded factors

ICAI's tables round each factor to three decimals, and its answers use both a printed annuity factor (4.111 for 12%, 6 years) and the sum of the yearly factors (4.112). Use the factors the question gives, say which, and expect small differences in the last digits.

### Equivalent annual figures with tax and rent

With taxes, compute the NPV of each option including the tax shields on depreciation and running costs, then divide by the PVAF: MTP Series I for September 2025 did this for two warehouses whose NPVs were both negative, and chose the one with the smaller negative equivalent annual figure. Rent paid at the start of each year is discounted from year 0 (MTP Series II for September 2025).

### NPV, PI and the next lessons

NPV and PI use the cost of capital as given. The rate at which NPV becomes zero is the [[fm.capbud.irr|internal rate of return]], where NPV and IRR can rank projects differently; choosing a set of projects within a budget is [[fm.capbud.rationing|capital rationing]].

## Exam angle

::: exam Where NPV, PI and equivalent annual figures appeared, May 2024 to September 2026
In the documents read for this lesson, NPV was the end point of most capital budgeting numericals:

- **Descriptive, 6 to 7 marks**: NPV and PI of a replacement (May 2024 Q3(a), 7 marks) and of a new plant (January 2025 Q3(a), 6 marks); NPV, PI, discounted payback and MIRR from an IRR (May 2025 Q3(a), 6 marks); NPV and PI of two machines with lives of 5 and 7 years, then the choice on the **equivalent annualised criterion** (May 2026 Q2(a), 7 marks: machine M won on EAN although N had the higher NPV).
- **MCQs, 2 marks each**: equivalent annual NPV of two proposals with lives of 5 and 3 years (May 2025 MCQ 7); NPV and equivalent annual cost of two warehouses (MTP Series I for September 2025, five MCQs); equivalent annual cost of buying two scanners or renting one (MTP Series II for September 2025, five MCQs); which project NPV and PI recommend (RTP January 2026 MCQ 2); PI of two machines (RTP May 2025 Q1(v)).
- **Theory**: "Do the profitability index and the NPV criterion lead to the same acceptance-rejection and ranking decisions? In what situations will they give conflicting results?" (RTP January 2025 Q11(c)).
:::

::: exam The traps ICAI used
- A subsidy received at the end of year 1 (May 2024 Q3(a)): shown as a reduction of the outlay, PI = 1.224; shown as a year-1 inflow, PI = 1.195. The NPV is ₹4,71,640 either way: state your treatment, since PI depends on it.
- Working capital "in year 1" (January 2025 Q3(a)): taken at year 0, PI 4.62; at the end of year 1, 4.70.
- Two mutually exclusive machines with lives of 5 and 6 years in RTP September 2026 Q7: ICAI's answer recommended Machine I because it ranked first on two of the three methods asked (discounted payback and IRR). On NPV (₹1,18,074 against ₹86,909), the Study Material's rule for mutually exclusive projects, Machine II comes first, and also on equivalent annualised NPV (₹28,714 against ₹24,108, dividing by 4.112 and 3.605, the sums of the RTP's yearly factors at 12%; these figures are our working, not the RTP's). When lives differ and the question asks which to choose, show the equivalent annual figure and state the rule you follow.
:::

::: trick NPV from PI, PI from NPV
PI = 1 + NPV ÷ outlay, and NPV = (PI − 1) × outlay, whenever the whole outlay is at year 0. RTP January 2026's MCQ needs only this: NPV 15 on 60 is a PI of 1.25.
:::

## Answer frame

**"Discuss NPV. How is it calculated?"** (SM 7.74, theory question 2): definition (the amount, in current value, the investment earns after paying cost of capital in each period); formula; ICAI's five steps; decision rule (accept if NPV ≥ 0; highest NPV among mutually exclusive projects); advantages and limitations, a line each.

**"Describe the advantages and disadvantages of profitability index"** (SM 7.74, question 5): the formula and its other names; two advantages; three limitations; the conclusion that PI cannot be used indiscriminately.

**PI and NPV: same decisions?** (RTP January 2025 Q11(c), ICAI's points): in most situations the same accept-reject decision (PI > 1 means NPV > 0); conflict in ranking mutually exclusive projects; a two-project example (larger NPV, smaller PI); reason: NPV is absolute, PI a ratio; PI is the better technique under capital rationing.

## Common mistakes

::: mistake Hall of Shame: the ₹4 lakh profit that was ₹62,300
Adding the app upgrade's ₹14 lakh of inflows and subtracting ₹10 lakh. **Fix:** discount each year's cash flow first. At 12% the inflows are worth ₹10,62,300 and the NPV is ₹62,300.
:::

::: mistake The eight-year machine that won on paper
Choosing K8 because its NPV (₹4,14,150) beats K4's (₹3,21,600). That sets eight years of one machine against four of the other. **Fix:** with unequal lives, compare equivalent annualised NPVs or NPVs over a common life. Here the two disagree, because K4's replacement costs more, and the common-life chain built on the supplier's price decides: K8, at ₹4,14,150 against ₹2,95,373.
:::

::: mistake Picking by PI when NPV should decide
Choosing line Q for its PI of 1.405. **Fix:** between mutually exclusive projects, the highest NPV is selected; PI decides only when NPVs are the same, or when capital is rationed.
:::

::: mistake The cheaper scooter that was dearer
Comparing PVs of cost over different lives (₹1,98,390 for four years against ₹1,76,080 for three). **Fix:** divide each by the PVAF for its own life; the lower equivalent annual cost wins.
:::

## Practice

::: quiz Check yourself
Q: A Tapri kiosk costs ₹5,00,000 and brings ₹2,00,000 a year for 3 years. The cost of capital is 10% (PVAF 2.487). What is its NPV (₹)?
= -2600
> PV of inflows = ₹2,00,000 × 2.487 = ₹4,97,400; NPV = ₹4,97,400 − ₹5,00,000 = −₹2,600. ₹6,00,000 comes back in cash, but not in today's rupees: reject.

Q: Case scenario. Dev must pick one of two café formats for a site (mutually exclusive). Format M: PV of inflows ₹54 lakh, outlay ₹40 lakh now. Format N: PV of inflows ₹31.2 lakh, outlay ₹12 lakh now and ₹12 lakh at the end of year 1 (PVF at 12%: 0.893). Which of the following is correct?
- [ ] N, because its PI is higher than M's
- [ ] M, because both its NPV and its PI are higher than N's
- [x] M, because its NPV is higher, although N's PI is higher
- [ ] Either, because both PIs exceed 1
> N's outflows have a PV of 12 + 12 × 0.893 = ₹22.716 lakh, so its NPV is ₹8.484 lakh and its PI 31.2 ÷ 22.716 = 1.37; M's NPV is ₹14 lakh and its PI 54 ÷ 40 = 1.35. For mutually exclusive projects whose NPVs differ, the highest NPV is selected (SM 7.52). "Both higher" is what you get by leaving N's year-1 outlay undiscounted (PI 31.2 ÷ 24 = 1.30).

Q: Machine A costs ₹3,00,000, lasts 3 years and costs ₹50,000 a year to run; machine B costs ₹4,00,000, lasts 5 years and costs ₹40,000 a year. Both do the same job; at 10%, PVAF is 2.487 for 3 years and 3.791 for 5 years; ignore tax and salvage. Which should Tapri buy?
- [ ] A, because the PV of its costs is lower
- [x] B, because its equivalent annual cost is lower
- [ ] A, because its equivalent annual cost is lower
- [ ] B, because the PV of its costs is lower
> PV of costs: A ₹4,24,350, B ₹5,51,640, over different lives. EAC: A ₹4,24,350 ÷ 2.487 = ₹1,70,627; B ₹5,51,640 ÷ 3.791 = ₹1,45,513. B is cheaper per year.

Q: A project has an NPV of ₹1,20,000 over 4 years at 12% (PVAF 3.037). What is its equivalent annualised NPV (₹, nearest rupee)?
= 39500..39520
> ₹1,20,000 ÷ 3.037 = ₹39,513.

Q: Which statements about the profitability index are correct? Select all that apply.
- [x] It is also called the desirability factor or present value index
- [x] For a single project with its whole outlay at the start, PI ≥ 1 exactly when NPV ≥ 0
- [ ] It is an absolute measure, so it favours larger projects
- [x] It fails as a guide in capital rationing where projects are indivisible
> PI is a relative measure (SM 7.32), which is why it can favour smaller projects; the other three are ICAI's statements or follow from PI = 1 + NPV ÷ outlay.
:::

## Recap

- Discount every cash flow to today at the cost of capital (WACC); PV factor = 1 ÷ (1 + k)ᵗ.
- NPV = PV of cash inflows − PV of cash outflows; accept if NPV ≥ 0; among mutually exclusive projects, the highest NPV.
- NPV is the addition to shareholders' wealth; its limitations: hard calculations, forecasts of cash flows and rate, an absolute measure.
- PI (desirability factor, present value index) = discounted inflows ÷ discounted outflow; accept if PI ≥ 1; it ranks by ratio and fails with indivisible projects under rationing.
- NPV and PI agree on accept-reject; they can conflict on ranking; with NPVs different, NPV decides.
- Unequal lives: replacement chain (common life) or equivalent annualised criterion, NPV ÷ PVAF for each life; the higher wins.
- Costs only: equivalent annual cost = PV of costs ÷ PVAF; the lower wins.
- Use the PV factors the question gives and say which: a printed annuity factor (4.111 at 12% for 6 years) and the sum of three-decimal yearly factors (4.112) differ in the last digits. (Convert the currencies first: a 2030 rupee is not a 2026 rupee.)

## Flashcards

Q:: ICAI's definition of net present value?
A:: The amount, in current value of amount, the investment earns after paying cost of capital in each period.

Q:: Formula: NPV when there are outflows during the project's life?
A:: Present value of cash inflows − present value of cash outflows.

Q:: The five steps for calculating NPV (ICAI)?
A:: Determine each year's net cash inflow; select the discount rate (WACC); find each year's discount factor; multiply cash flows by the factors; total the present values.

Q:: NPV decision rule for independent and mutually exclusive projects?
A:: Accept if NPV ≥ 0, reject if NPV < 0; among mutually exclusive projects, the highest positive NPV.

Q:: Three limitations of NPV (ICAI)?
A:: Difficult calculations; accuracy depends on forecasting cash flows and the discount rate; an absolute measure that ignores differences in initial outflow and size.

Q:: Profitability index: formula and its two other names?
A:: Sum of discounted cash inflows ÷ initial cash outlay or total discounted cash outflow; also called desirability factor and present value index.

Q:: PI decision rule for independent and mutually exclusive projects (ICAI's summary)?
A:: Accept if PI ≥ 1, reject if PI < 1; among mutually exclusive projects, when NPV is the same, the highest PI.

Q:: Three limitations of the profitability index (ICAI)?
A:: Fails in capital rationing with indivisible projects; choosing one large high-NPV project can exclude several small ones with a higher total NPV; a lower-PI project may release cash for another project later, for a higher total NPV.

Q:: Two methods for mutually exclusive projects with unequal lives?
A:: Replacement chain (common life) method and equivalent annualised criterion.

Q:: The three steps of the equivalent annualised criterion?
A:: Compute NPV at the WACC; compute the PVAF at that rate for each project's life; divide NPV by PVAF and compare.

Q:: Equivalent annual cost: formula and decision?
A:: PV of costs over the life (net of salvage) ÷ PVAF for that life; choose the lower equivalent annual cost.
