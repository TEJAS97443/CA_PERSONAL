---
id: fm.capbud.rationing
title: Capital rationing
minutes: 22
needs: fm.capbud.npv
tags: capital rationing, NPV per rupee, profitability index, divisible projects, indivisible projects, capital budget limit
labs:
summary: When every project has a positive NPV but the budget cannot fund them all: rank divisible projects by NPV per rupee, and test combinations of indivisible ones for the highest total NPV.
---

## In plain words

### Five good ideas, one cheque book

Tapri's capital expenditure committee meets every March. This year five proposals have a positive NPV at the 12% cost of capital, together needing ₹165 lakh. The board has capped next year's capital spending at ₹100 lakh.

> **Kesar:** All five make money. Why can't we do all five?
> **Dev:** Because the board gave us ₹100 lakh, not ₹165 lakh. So the question changes: not "which projects are good?" but "which ₹100 lakh of projects add the most NPV?"
> **Ritu:** Then start with the biggest NPV, surely. The Pune café adds ₹17.5 lakh.
> **Dev:** It also eats half the budget. Per rupee, it is the second-worst on the list.

When a firm cannot take up every positive-NPV project because funds are limited, it faces **capital rationing**. The aim stays the same, maximise shareholders' wealth, but now within a budget: choose the package of projects with the **highest total NPV** that fits.

How you build that package depends on one question. If a project can be taken up in part (half a fleet of vans, a third of the solar panels), it is **divisible**: rank the projects by NPV per rupee invested and fill the budget from the top, taking a part of the last one. If a project is all or nothing (a café is either built or not), it is **indivisible**: try the combinations that fit and pick the one with the highest total NPV. The two answers can differ: Tapri's best whole-project package leaves out the third-ranked project.

::: analogy The airline baggage limit
You may check in 20 kg. If you are packing loose kaju katli, pack the sweets with the most value per kilo first and fill the last gap with part of a box. If you are packing whole items, a pressure cooker, a laptop and a carton of books, the item with the best value per kilo can leave an awkward gap; you have to try the sets that fit and take the most valuable set.
:::

::: key
Under capital rationing, maximise the total NPV the budget can buy. Divisible projects: rank by NPV per rupee (the profitability index) and fill the budget, the last project in part. Indivisible projects: examine the combinations within the budget and select the one with the highest total NPV, even if it skips a higher-ranked project.
:::

## How it works

::: definition Capital rationing
Capital rationing refers to a situation where funds are restricted and the management has to choose from amongst available alternative investments. (SM 7.73, MCQ 14; answer SM 7.86)
:::

If a project has a positive NPV, it should be accepted with an objective of maximisation of wealth of shareholders. But resource (capital) constraints may force a firm to select some projects among several, all having positive NPVs. Two scenarios decide the method (SM 7.53):

1. **Projects are independent of each other and divisible**: the NPV rule is modified, and projects are ranked on the basis of the **'NPV per rupee of capital'** method.
2. **Projects are not divisible**: projects are ranked on the basis of **absolute NPV** and mixed up to the point the available resources are exhausted; the combinations that fit are compared.

::: diagram Capital rationing: which method?
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Projects with\nNPVs computed", "color": "mute"},
  {"id": "x", "kind": "process", "label": "Drop projects\nwith NPV < 0", "color": "mute"},
  {"id": "d1", "kind": "decision", "label": "Funds\nlimited?", "color": "c"},
  {"id": "all", "kind": "end", "label": "Accept all", "color": "ok"},
  {"id": "d2", "kind": "decision", "label": "Divisible?", "color": "c"},
  {"id": "pi", "kind": "process", "label": "Rank by\nNPV per ₹1", "color": "a"},
  {"id": "part", "kind": "end", "label": "Fill budget;\nlast in part", "color": "a"},
  {"id": "co", "kind": "process", "label": "List combinations\nwithin budget", "color": "d"},
  {"id": "max", "kind": "end", "label": "Highest\ntotal NPV", "color": "d"}],
 "edges": [["s", "x"], ["x", "d1"], ["d1", "all", "no"], ["d1", "d2", "yes"], ["d2", "pi", "yes"], ["pi", "part"], ["d2", "co", "no"], ["co", "max"]],
 "caption": "Blue: divisible projects, ranked by NPV per rupee; orange: indivisible projects, compared as whole combinations. In both, a project with a negative NPV never enters, even to use up spare funds."}
:::

### Divisible projects: the most NPV per rupee first

::: steps
1. Compute each project's NPV at the cost of capital and drop any with a negative NPV.
2. Compute **NPV per ₹1 invested** = NPV ÷ investment, and rank the projects on it.
3. Take projects in that order until the next one no longer fits; take the fraction of it that the remaining funds allow, with the same fraction of its NPV.
:::

Tapri's five proposals are the app upgrade (A), cold-chain vans (V), a kulhad press line (K), the Pune café (C) and a solar roof (S). Budget ₹100 lakh; amounts in ₹ lakh, NPVs at 12%:

| Project | Investment | NPV | NPV per ₹1 | Rank |
|---|---:|---:|---:|---:|
| A | 20 | 10.0 | 0.50 | 1 |
| V | 30 | 13.5 | 0.45 | 2 |
| K | 40 | 16.0 | 0.40 | 3 |
| C | 50 | 17.5 | 0.35 | 4 |
| S | 25 | 7.5 | 0.30 | 5 |

A, V and K use ₹90 lakh and add ₹39.5 lakh of NPV. The last ₹10 lakh buys one-fifth of C, worth 17.5 × 10 ÷ 50 = ₹3.5 lakh. **Total NPV: ₹43.0 lakh**; S is not taken up.

Ranking by NPV per rupee is ranking by the profitability index (PI = 1 + NPV ÷ investment when the whole outlay is made at the start), so both give the same order. That is why ICAI calls PI ==a better evaluation technique than NPV in a situation of capital rationing== (RTP January 2025 Q11(c)).

### Indivisible projects: whole combinations

A café cannot be one-fifth built. With whole projects only, the order above suggests A + V + K (₹90 lakh, NPV ₹39.5 lakh), leaving ₹10 lakh idle. Other combinations that fit:

| Combination | Investment (₹ lakh) | Total NPV (₹ lakh) |
|---|---:|---:|
| A + V + K | 90 | 39.5 |
| **A + V + C** | **100** | **41.0** |
| K + V + S | 95 | 37.0 |
| A + C + S | 95 | 35.0 |
| K + C | 90 | 33.5 |

**A + V + C** wins: it drops K, ranked third, for C, ranked fourth, because C uses the whole budget. The Study Material's Illustration 13 makes the same point: E + B + D (NPV ₹49.2 thousand) beats E + B + C (₹48.1 thousand) "despite D ranking lower than C" (SM 7.54).

::: diagram What ₹100 lakh can buy
{"type": "plot", "h": 300, "x": [0, 170], "y": [0, 70],
 "xlabel": "cumulative investment (₹ lakh)", "ylabel": "cumulative NPV (₹ lakh)",
 "xticks": [0, 20, 50, 100, 140, 165], "yticks": [0, 10, 20, 30, 40, 50, 60, 70],
 "series": [
  {"label": "projects in order of NPV per ₹1", "pts": [[0, 0], [20, 10], [50, 23.5], [90, 39.5], [140, 57], [165, 64.5]], "color": "a"},
  {"pts": [[100, 0], [100, 43]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 100, "y": 43, "label": "43.0", "pos": "above"}, {"x": 100, "y": 41, "label": "41.0", "pos": "right", "color": "d"}, {"x": 90, "y": 39.5, "label": "39.5", "pos": "left"}],
 "legend": "none",
 "caption": "The blue line adds the projects in order A, V, K, C, S; each segment's slope is that project's NPV per rupee, so the line gets flatter. The grey dashed line is the ₹100 lakh budget. Divisible projects reach ₹43.0 lakh, on the line at the budget; the best whole-project package, A + V + C (orange dot), reaches ₹41.0 lakh, more than the ₹39.5 lakh of A + V + K (the blue dot at ₹90 lakh)."}
:::

### Where the profitability index falls short

PI ranks divisible projects correctly. The Study Material lists its limits (SM 7.32): it **fails as a guide in resolving capital rationing where projects are indivisible**; once a single large project with high NPV is selected, the possibility of accepting several small projects which together may have higher NPV is excluded; and a project with a lower PI may generate cash that lets another project start a year or two later, for a higher total NPV. So the PI approach cannot be used indiscriminately: all other alternatives have to be worked out.

Without rationing, none of this arises: for independent projects either IRR or NPV can be used, since the same set of projects is accepted by either method (SM 7.59). For mutually exclusive projects, see [[fm.capbud.irr|the NPV-IRR conflict]].

## Formats and formulas

*Reproduce these from memory.*

::: formula NPV per rupee of investment
$$\text{NPV per ₹1} = \frac{\text{NPV}}{\text{Investment}} \qquad \text{PI} = 1 + \frac{\text{NPV}}{\text{Investment}}$$
The PI form holds when the whole outlay is made at year 0; both give the same ranking (SM 7.53–7.54).
:::

::: formula NPV of a part project
$$\text{NPV of the part taken} = \text{NPV} \times \frac{\text{Funds remaining}}{\text{Investment}}$$
:::

**Step 1. Ranking** (SM 7.54)

| Project | Investment (₹) | NPV (₹) | NPV per ₹1 | Rank |
|---|---:|---:|---:|---:|
| A | xxx | xxx | x.xx | n |
| … | | | | |

**Step 2 (divisible). Building up the programme**

| Project (in rank order) | Investment (₹) | NPV (₹) |
|---|---:|---:|
| Rank 1 | xxx | xxx |
| … | | |
| Last: part (fraction) | xxx | xxx |
| **Total** | **Budget** | **xxx** |

**Step 2 (indivisible). Combinations within the limit**

| Combination | Investment (₹) | Total NPV (₹) |
|---|---:|---:|
| A + B + … | xxx | xxx |
| **Best** | | **xxx** |

## Worked examples

:::: example Indore Masala Mills: one shed, two ideas
Indore Masala Mills Pvt Ltd, one of Tapri's spice suppliers, can spend ₹60 lakh this year. Its five proposals all have positive NPVs at its cost of capital. A and B are two alternative uses of the same empty shed, so at most one of them can be undertaken; the others are independent.

| Project | Investment (₹ lakh) | NPV (₹ lakh) |
|---|---:|---:|
| A: cold-grind line (in the shed) | 25 | 9.0 |
| B: export packing hall (in the shed) | 15 | 6.0 |
| C: warehouse | 20 | 6.4 |
| D: solar roof | 10 | 2.5 |
| E: delivery vans | 30 | 8.7 |

**Required:**

(i) Optimise the package of projects within the capital spending limit if the projects are divisible (A or B may be taken in part, but not both).

(ii) Optimise the package if the projects are not divisible.

(iii) A bank offers ₹15 lakh more for a one-time arrangement fee of ₹5 lakh. Advise under (i) and under (ii).

::: answer Show the working
**(i) Divisible projects.** Computation of NPV per ₹1 of investment and ranking:

| Project | Investment (₹ lakh) | NPV (₹ lakh) | NPV per ₹1 | Rank |
|---|---:|---:|---:|---:|
| A | 25 | 9.0 | 0.36 | 2 |
| B | 15 | 6.0 | 0.40 | 1 |
| C | 20 | 6.4 | 0.32 | 3 |
| D | 10 | 2.5 | 0.25 | 5 |
| E | 30 | 8.7 | 0.29 | 4 |

A and B cannot both enter, so build the programme twice, once with each:

| Programme with B (no A) | Investment (₹ lakh) | NPV (₹ lakh) |
|---|---:|---:|
| B | 15 | 6.00 |
| C | 20 | 6.40 |
| E (25/30) | 25 | 7.25 |
| **Total** | **60** | **19.65** |

| Programme with A (no B) | Investment (₹ lakh) | NPV (₹ lakh) |
|---|---:|---:|
| A | 25 | 9.00 |
| C | 20 | 6.40 |
| E (15/30, one-half) | 15 | 4.35 |
| **Total** | **60** | **19.75** |

Undertake **A, C and one-half of E**; reject B and D. Total NPV ₹19.75 lakh. B has the best NPV per rupee, but A uses ₹10 lakh more than B and adds ₹3.0 lakh more NPV: 0.30 per rupee on those ₹10 lakh, which beats the 0.29 they would earn in E.

**(ii) Indivisible projects.** Combinations within ₹60 lakh, never A with B:

| Combination | Investment (₹ lakh) | Total NPV (₹ lakh) |
|---|---:|---:|
| **A + C + D** | **55** | **17.9** |
| A + E | 55 | 17.7 |
| C + D + E | 60 | 17.6 |
| B + D + E | 55 | 17.2 |
| A + C | 45 | 15.4 |
| C + E | 50 | 15.1 |

Undertake **A, C and D** (NPV ₹17.9 lakh) and reject B and E. C + D + E uses the whole ₹60 lakh but adds less: the test is total NPV, not an empty purse.

**(iii) The extra ₹15 lakh (budget ₹75 lakh)**

| Particulars | Divisible (₹ lakh) | Indivisible (₹ lakh) |
|---|---:|---:|
| Best package at ₹75 lakh | A + C + E: 24.10 | A + C + E: 24.10 |
| Best package at ₹60 lakh | 19.75 | 17.90 |
| Extra NPV from ₹15 lakh | 4.35 | 6.20 |
| Less: Arrangement fee | (5.00) | (5.00) |
| **Net gain / (loss)** | **(0.65)** | **1.20** |

With divisible projects the extra ₹15 lakh only completes E at 0.29 per rupee (₹4.35 lakh), less than the fee: **decline**. With indivisible projects it lets the mill swap D for the whole of E, adding ₹6.2 lakh: **accept**. (With B instead of A, ₹75 lakh buys B + C + D + E, NPV ₹23.6 lakh, which is lower.) The same ₹15 lakh is worth more when projects come only whole.
:::
::::

:::: example Tapri's capex budget: NPVs first, then the cut
Tapri's capital spending for 2026-27 is limited to ₹120 lakh. The cost of capital is 12%. Five independent proposals (cash inflows after tax, received evenly at the end of each year, no salvage):

| Proposal | Outlay (₹ lakh) | Annual inflow (₹ lakh) | Life (years) |
|---|---:|---:|---:|
| P: samosa line | 50 | 14 | 6 |
| Q: app features | 25 | 13 | 3 |
| R: airport kiosks | 70 | 21 | 4 |
| S: cold-chain vans | 45 | 17 | 4 |
| T: premix packing | 60 | 29 | 3 |

PVAF at 12%: 3 years 2.402; 4 years 3.037; 6 years 4.111.

**Required:**

(i) Calculate the NPV and profitability index of each proposal.

(ii) Which proposals should Tapri undertake if they are divisible?

(iii) Which, if they are indivisible?

(iv) Kesar suggests using any money left over on the airport kiosks. Comment.

::: answer Show the working
**(i) NPV and PI** (₹ lakh)

| Proposal | PV of inflows | NPV | PI | Rank by PI |
|---|---:|---:|---:|---:|
| P | 14 × 4.111 = 57.554 | 7.554 | 1.151 | 3 |
| Q | 13 × 2.402 = 31.226 | 6.226 | 1.249 | 1 |
| R | 21 × 3.037 = 63.777 | (6.223) | 0.911 | rejected |
| S | 17 × 3.037 = 51.629 | 6.629 | 1.147 | 4 |
| T | 29 × 2.402 = 69.658 | 9.658 | 1.161 | 2 |

R has a negative NPV (PI below 1) and is rejected whatever the budget.

**(ii) Divisible proposals**

| Proposal | Outlay (₹ lakh) | NPV (₹ lakh) |
|---|---:|---:|
| Q | 25 | 6.226 |
| T | 60 | 9.658 |
| P (35/50 = 70%) | 35 | 5.288 |
| **Total** | **120** | **21.172** |

Undertake Q, T and 70% of P; S is not taken up. Total NPV **₹21.17 lakh**.

**(iii) Indivisible proposals.** Combinations within ₹120 lakh:

| Combination | Outlay (₹ lakh) | Total NPV (₹ lakh) |
|---|---:|---:|
| **P + Q + S** | **120** | **20.409** |
| P + T | 110 | 17.212 |
| S + T | 105 | 16.287 |
| Q + T | 85 | 15.884 |
| P + S | 95 | 14.183 |

Undertake **P, Q and S** (NPV ₹20.41 lakh). The package leaves out T, which has the highest NPV of all and the second-highest PI: taking T (₹60 lakh) leaves room for only one of the others. Taking projects in PI order (Q, then T) would have stopped at ₹15.88 lakh, and taking them in NPV order (T, then P) at ₹17.21 lakh.

**(iv) Comment.** Funds left idle are not a reason to accept a negative-NPV project. The airport kiosks earn less than the 12% cost of capital (NPV −₹6.22 lakh), so they would reduce shareholders' wealth; in (iii) the chosen package uses the whole ₹120 lakh in any case.
:::
::::

## Under the hood

### Why the ranking works only when projects can be split

With divisible projects, every rupee can go to whichever project pays the most NPV for it, so the best rupees are spent first and the last rupee goes to the best project still available: no other order can beat it. With whole projects, the "best rupees first" order can strand money: Tapri's A + V + K leaves ₹10 lakh idle, and the ₹10 lakh could only have been used by giving up K for C. That is why the Study Material moves to combinations of whole projects, and why its PI section warns that PI fails where projects are indivisible (SM 7.32, 7.53).

### Checking ICAI's Illustration 13

Shiva Limited ranks E (0.55), B (0.47), C (0.40), D (0.37) and A (0.31) by NPV per ₹1 and, with ₹1,20,000, takes E, B, C and two-thirds of D for an NPV of ₹55.6 thousand (two-thirds of ₹11.2 thousand is ₹7.47 thousand, printed as 7.5). If indivisible, E + B + D (₹1,05,000, NPV ₹49.2 thousand) beats E + B + C (₹1,00,000, NPV ₹48.1 thousand) (SM 7.53–7.54).

### The neighbours

NPV and PI themselves are in [[fm.capbud.npv|NPV, profitability index and equivalent annual cost]]. Contingent decisions (a project that needs another, such as roads for a remote factory) are the third type of decision on the basis of situations, next to mutually exclusive and accept-reject decisions (SM 7.6–7.7): a package that includes one must include the other.

## Exam angle

::: exam Where capital rationing appeared
In the ICAI documents read for this lesson, capital rationing is rare:

- **New scheme (May 2024 to September 2026)**: no past paper, RTP or MTP among the 56 Paper 6 documents searched asks a capital rationing numerical. The topic appears once, in RTP January 2025 Q11(c): PI and NPV can conflict for mutually exclusive projects, and PI "is a better evaluation technique than NPV in a situation of capital rationing".
- **Old scheme**: November 2019 Q1(d) (5 marks) gave ₹1,00,000 and four projects with their investments and NPVs, and asked for the package "within the capital spending limit" if the projects are (i) divisible and (ii) not divisible. The suggested answer ranked by NPV per Re. 1 (C 0.50, E 0.48, D 0.35, F 0.30), took C, E and one-tenth of D (₹47,500), and for indivisible projects compared C + E (₹44,000), C + F (₹38,000) and D alone (₹35,000).
- **The Study Material's own questions**: MCQ 14 on the meaning of capital rationing (SM 7.73); Illustration 13 (SM 7.53–7.54); the PI limitations (SM 7.32), asked as "Describe the advantages and disadvantages of profitability index" (theory question 5).
:::

::: exam What earns the marks
The two-part layout of the suggested answers: a ranking table with NPV per rupee and the rank; a "building up" table ending with the fraction of the last project; then, for indivisible projects, a table of combinations with a one-line conclusion naming the projects to undertake and reject. In November 2019, C + E left ₹10,000 unused and still won: the test is total NPV, not using up the budget.
:::

::: trick NPV per rupee from PI
NPV per ₹1 = PI − 1, so a PI of 1.249 is 24.9 paise of NPV per rupee. Condition: the whole outlay at year 0 (otherwise PI's denominator is the PV of all outflows).
:::

## Answer frame

**"What is capital rationing? How are projects selected under it?"**

1. Meaning: funds are restricted, and management has to choose from amongst available alternative investments, all with positive NPVs.
2. Objective: maximise the total NPV obtainable within the funds available (wealth maximisation).
3. Independent and divisible projects: modify the NPV rule; rank by NPV per rupee of capital (equivalently PI); accept in order, the last project in part.
4. Indivisible projects: rank by absolute NPV, examine combinations within the limit, and select the combination with the highest total NPV.
5. Note PI's limitation for indivisible projects, and that negative-NPV projects are never included.

## Common mistakes

::: mistake Hall of Shame: ranking divisible projects by the size of their NPV
Taking Tapri's projects in NPV order, C (17.5), K (16.0), then a third of V (4.5), gives ₹38.0 lakh against ₹43.0 lakh. **Fix:** a rationed budget is spent rupee by rupee; rank divisible projects by NPV per rupee.
:::

::: mistake Taking indivisible projects in PI order and stopping
Q, then T, then nothing fits: ₹15.88 lakh, with ₹35 lakh idle. **Fix:** list the combinations that fit and compare their total NPVs; here P + Q + S gives ₹20.41 lakh.
:::

::: mistake Spending the leftover on a negative-NPV project
"The money is there anyway" does not make the airport kiosks worth doing. **Fix:** a project with NPV < 0 (PI < 1) is rejected under rationing as it is without it.
:::

::: mistake Taking the full NPV of a part project
Half of E adds half of its NPV (₹4.35 lakh), not ₹8.7 lakh. **Fix:** NPV of the part = NPV × funds remaining ÷ investment.
:::

## Practice

::: quiz Check yourself
Q: Tapri has ₹50 lakh for three divisible, independent projects: A (investment ₹20 lakh, NPV ₹8 lakh), B (₹30 lakh, ₹9 lakh) and C (₹25 lakh, ₹12.5 lakh). What is the maximum total NPV, in ₹ lakh?
= 22
> NPV per ₹1: C 0.50, A 0.40, B 0.30. C and A use ₹45 lakh (₹20.5 lakh NPV); the last ₹5 lakh buys one-sixth of B, ₹1.5 lakh. Total ₹22.0 lakh.

Q: Case scenario. Dev presents six positive-NPV proposals to Tapri's board. The capital budget is ₹1 crore, short of the ₹1.6 crore they need, and each proposal must be taken up whole or not at all. Ritu must recommend a method. Which of the following is correct?
- [ ] Rank by profitability index and accept in that order until the next one does not fit
- [x] Examine the combinations that fit within ₹1 crore and select the one with the highest total NPV
- [ ] Select the single proposal with the highest IRR, then the next highest, and so on
- [ ] Accept every proposal with a positive NPV and borrow the shortfall
> With indivisible projects, PI fails as a guide (SM 7.32): the ranking order can leave funds idle or exclude a better package. The last option ignores the constraint the board has set.

Q: Under capital rationing with divisible projects, which statements are correct? Select all that apply.
- [x] Projects are ranked on NPV per rupee of capital
- [x] When the whole outlay is at year 0, ranking by PI gives the same order
- [ ] A project with a negative NPV may be accepted to use up the budget
- [x] The last project selected may be taken up only in part, with that fraction of its NPV
> NPV per ₹1 = PI − 1 when the outlay is at the start. A negative-NPV project reduces wealth whatever the budget.

Q: Five indivisible projects: J (₹40 lakh, NPV ₹14 lakh), K (₹25 lakh, ₹10 lakh), L (₹35 lakh, ₹12.6 lakh), M (₹20 lakh, ₹6 lakh) and N (₹30 lakh, ₹9.3 lakh). The budget is ₹60 lakh. Which package should be chosen?
- [ ] J and M
- [x] K and L
- [ ] K and N
- [ ] L and M
> K + L uses ₹60 lakh for ₹22.6 lakh; J + M gives ₹20.0 lakh, K + N ₹19.3 lakh (₹55 lakh), L + M ₹18.6 lakh (₹55 lakh).

Q: Which of these is a capital rationing problem?
- [ ] Tapri's only plot in Nagpur can take a café or a premix warehouse, not both
- [x] The board caps next year's capital spending at ₹80 lakh, while the proposals with positive NPVs need ₹1.3 crore
- [ ] A new fryer is useful only if the factory extension it needs is also built
- [ ] An old delivery van is to be replaced by a new one that costs less to run
> Rationing means funds are restricted and management must choose among positive-NPV alternatives (SM 7.53). The plot is a mutually exclusive decision: the projects compete for the same use, not the same money. The fryer is a contingent decision (SM 7.7), and the van a replacement decision (SM 7.6).
:::

## Recap

- Capital rationing: funds are restricted, so management chooses among positive-NPV projects; the aim is the highest total NPV within the budget.
- Independent, divisible projects: rank by NPV per rupee of capital (NPV ÷ investment), accept in order, take the last in part with the same fraction of its NPV.
- NPV per ₹1 = PI − 1 when the outlay is at year 0: the same ranking; PI is the better technique under capital rationing.
- Indivisible projects: rank by absolute NPV, examine combinations within the limit, select the highest total NPV; a lower-ranked project may replace a higher-ranked one (Illustration 13: E + B + D beats E + B + C).
- PI fails as a guide where projects are indivisible (SM 7.32).
- Negative-NPV projects are never accepted, even with idle funds; unused budget is not a reason to accept.
- (Loose sweets go in by value per kilo; pressure cookers go in by trying the sets.)

## Flashcards

Q:: What is capital rationing (ICAI)?
A:: A situation where funds are restricted and the management has to choose from amongst available alternative investments.

Q:: Capital rationing: how are independent, divisible projects ranked?
A:: On the basis of NPV per rupee of capital (NPV ÷ investment); accept in rank order, the last project in part.

Q:: Capital rationing: how are indivisible projects selected?
A:: Rank on absolute NPV, examine the combinations within the funds available, and select the combination with the highest total NPV.

Q:: Relation between NPV per ₹1 and the profitability index?
A:: NPV per ₹1 = PI − 1 when the whole outlay is at year 0, so both rank projects the same way.

Q:: Which limitation of PI matters under capital rationing?
A:: It fails as a guide in resolving capital rationing where projects are indivisible.

Q:: Illustration 13 (Shiva Ltd): why does E + B + D beat E + B + C if projects are indivisible?
A:: Its total NPV is higher (₹49.2 thousand against ₹48.1 thousand), despite D ranking lower than C on NPV per rupee.

Q:: Under capital rationing, may a negative-NPV project be accepted to use up idle funds?
A:: No: it reduces shareholders' wealth; it is rejected with or without rationing.

Q:: NPV of a project taken up in part?
A:: Its NPV × (funds remaining ÷ its investment).
