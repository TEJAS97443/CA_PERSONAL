---
id: cma.oh.underover
title: Under- and over-absorption of overheads
minutes: 28
needs: cma.oh.absorb
tags: under-absorption, over-absorption, supplementary rate, pre-determined rate, overhead variance, idle capacity, costing profit and loss account
labs:
summary: Why absorbed overheads never equal actual ones, how to measure the gap after removing abnormal items, and ICAI's treatments: Costing P&L, supplementary rates and, in its answers, carry forward.
---

## In plain words

### The ₹66,350 that nobody can find

In March, Ritu fixed Frying's rate at ₹169.25 a fryer hour: budgeted overheads of ₹10,15,500 over 6,000 budgeted hours ([[cma.oh.absorb|absorption rates]]). In April the fryer worked 5,800 hours, so the samosa orders absorbed 5,800 × ₹169.25 = ₹9,81,650. The bills for April came to ₹10,48,000.

> **Kesar:** We charged the samosas ₹9,81,650 and spent ₹10,48,000. Where did ₹66,350 go?
> **Ritu:** Nowhere. We under-absorbed it: the rate recovered less than we spent.
> **Kesar:** Put it in miscellaneous. Sab adjust ho jayega.
> **Ritu:** Where it goes depends on why it happened.

Overheads are charged to products at a **pre-determined rate**, fixed before the period from estimates. The **absorbed** overhead is that rate times the actual base (hours, units). It almost never equals the **actual** overhead. When less is absorbed than spent, the overhead is **under-absorbed** (a debit balance left in the overhead account); when more is absorbed than spent, it is **over-absorbed** (a credit balance). ICAI also calls either one an **overhead variance**.

The gap has two possible causes: the overheads were not what was estimated, or the activity was not. What to do with it depends on its size and its reason. A small gap, or one caused by something abnormal (faulty planning, inefficiency), goes to the **Costing Profit and Loss Account**. A large gap caused by an estimate that was wrong for unavoidable reasons (a gas price rise nobody could foresee) is spread back over the products with a **supplementary rate**, to the goods sold and to the goods still in stock.

::: analogy The hostel mess advance
A hostel mess collects ₹3,000 from each student at the start of the month, from the expected grocery bill and head count. If vegetable prices rise and the true cost is ₹3,200 a head, the mess asks every student for ₹200 more, including those who have already gone home: that is a supplementary rate over cost of sales and stock. If the cook burns 20 kg of rice, the warden pays from the mess fund, not the students: an abnormal loss to Costing P&L. If the difference is ₹5 a head, nobody chases it.
:::

::: key
Under- or over-absorption = actual overheads − absorbed overheads (actual base × pre-determined rate), after removing items that are not this period's normal overheads. The abnormal part and any small balance go to Costing P&L; a large balance from an unavoidable estimating error is spread by a supplementary rate over cost of sales, finished goods and work-in-progress.
:::

## How it works

### Why the two never match

Production overheads are determined in advance to fix selling prices, quote tenders and prepare budgets, so the rate is pre-determined, and the actual rate will rarely coincide with it (SM 4.41–4.42):

1. Overheads as estimated, but more units produced than budgeted: the actual rate is lower, so **over-absorption**; fewer units: **under-absorption**.
2. Units as budgeted, but actual overheads more than estimated: **under-absorption**; less: **over-absorption**.
3. Both change in different proportions: under- or over-absorption, depending on the figures.
4. Both change in the same proportion: **neither**.

When the absorbed amount is less than the actual amount it is called **under-absorption**; when more, **over-absorption**. ICAI's table, at a pre-determined rate of ₹100 ÷ 100 units = ₹1 (SM 4.42–4.43):

| Budget ₹ / units | Actual ₹ / units | Absorbed (₹) | Actual − absorbed (₹) | Result |
|---|---|---:|---:|---|
| 100 / 100 | 110 / 100 | 100 | 10 | Under-absorption |
| 100 / 100 | 90 / 100 | 100 | −10 | Over-absorption |
| 100 / 100 | 100 / 90 | 90 | 10 | Under-absorption |
| 100 / 100 | 100 / 110 | 110 | −10 | Over-absorption |
| 100 / 100 | 90 / 90 | 90 | 0 | Neither |
| 100 / 100 | 110 / 110 | 110 | 0 | Neither |
| 100 / 100 | 110 / 90 | 90 | 20 | Under-absorption |
| 100 / 100 | 90 / 110 | 110 | −20 | Over-absorption |

Even when every rupee of overhead behaves exactly as budgeted, a change in activity alone opens a gap, because the fixed part of the rate is recovered only at the budgeted level:

::: diagram Frying: absorbed against actual overheads, if costs behave as budgeted
{"type": "plot", "h": 320, "x": [0, 9000], "y": [0, 1600000],
 "xlabel": "fryer hours worked", "ylabel": "overheads (₹)",
 "xticks": [[0, "0"], [3000, "3,000"], [6000, "6,000"], [9000, "9,000"]],
 "yticks": [[0, "0"], [400000, "4,00,000"], [800000, "8,00,000"], [1200000, "12,00,000"], [1600000, "16,00,000"]],
 "legend": "outside",
 "series": [
  {"label": "absorbed: ₹169.25 × hours", "fn": "169.25*x", "color": "a"},
  {"label": "actual: ₹6,09,000 + ₹67.75 × hours", "fn": "609000+67.75*x", "color": "d"},
  {"pts": [[6000, 0], [6000, 1015500]], "color": "mute", "dash": true, "legend": false}
 ],
 "areas": [
  {"between": [1, 0], "from": 0, "to": 6000, "color": "bad", "label": "under-absorbed"},
  {"between": [0, 1], "from": 6000, "to": 9000, "color": "g", "label": "over-absorbed"}
 ],
 "points": [{"x": 6000, "y": 1015500, "label": "budget: 6,000 hours", "pos": "left"}],
 "caption": "Blue: overhead absorbed at ₹169.25 a fryer hour; orange: overheads incurred (fixed ₹6,09,000 plus ₹67.75 an hour). Below the budgeted 6,000 hours part of the fixed cost is not recovered (rose); above it, more than the actual is recovered (green)."}
:::

### What to do with the balance

As regards the treatment of the balances (SM 4.43–4.45):

- If the balances are **small**, they are transferred to the **Costing Profit and Loss Account**; product costs are not increased or reduced, as they would be representing normal cost.
- If the difference is **large and due to wrong estimation** (estimation wrong for unavoidable reasons), the cost of products manufactured should be adjusted, as otherwise cost figures would convey a misleading impression. Such adjustments take the form of **supplementary rates**.
- Over- or under-recovery due to **abnormal reasons** (such as abnormal over- or under-capacity utilisation) is transferred to the **Costing Profit and Loss Account**.

::: diagram Treatment of under- or over-absorption
{"type": "flow", "w": 420, "nodes": [
 {"id": "s", "kind": "start", "label": "Actual − absorbed\n≠ 0", "color": "mute"},
 {"id": "d1", "kind": "decision", "label": "Amount small?", "color": "mute"},
 {"id": "p1", "kind": "end", "label": "Costing P&L A/c", "color": "c"},
 {"id": "d2", "kind": "decision", "label": "Due to abnormal\nreasons?", "color": "mute"},
 {"id": "p2", "kind": "end", "label": "Costing P&L A/c", "color": "c"},
 {"id": "sr", "kind": "end", "label": "Supplementary rate:\ncost of sales, FG, WIP", "color": "a"}],
 "edges": [["s", "d1"], ["d1", "p1", "yes"], ["d1", "d2", "no"], ["d2", "p2", "yes"], ["d2", "sr", "no"]],
 "caption": "Amber: written off to the Costing Profit and Loss Account; blue: spread over cost of sales, finished goods and work-in-progress, for a large balance from an estimate that was wrong for unavoidable reasons. When a question splits the balance by reasons, each part takes its own branch."}
:::

### Six steps through a question

::: steps
1. **Clean the actual overheads.** ICAI's answers deduct items that are not this period's normal production overheads: wages paid for a strike period under an award, an amount paid under a labour court award or court order (assumed non-recurring), expenses of the previous year booked in the current year, obsolete stores written off (SM practical problems 7 and 11; PYQ May 2024). Normal overtime wages stay in (MTP May 2025 Series II MCQ 12).
2. **Absorbed overheads** = actual base × pre-determined rate: actual hours, never budgeted hours.
3. **The balance**: net actual − absorbed. Positive: under-absorbed (debit); negative: over-absorbed (credit).
4. **Split by reason**: the part due to defective planning, factory inefficiency or other abnormal causes goes to Costing P&L; the part due to normal cost increases is spread.
5. **Supplementary rate** = the part to spread ÷ units produced, counting work-in-progress in equivalent completed units.
6. **Distribute**: finished goods stock (units × rate), work-in-progress (equivalent units × rate), cost of sales (units sold × rate); debit for under-absorption, credit for over-absorption.
:::

### Idle capacity costs

The cost of capacity left idle (installed, normal and abnormal idle capacity are defined in [[cma.oh.absorb|absorption rates]]) is a common reason for under-absorption. ICAI's three treatments (SM 4.59):

| Cause of idle capacity cost | Treatment |
|---|---|
| (a) Unavoidable reasons: repairs, maintenance, changeover of job | A supplementary overhead rate: the cost is charged to the production capacity utilised |
| (b) Avoidable reasons: faulty planning, power failure | Charged to the Costing Profit and Loss Account |
| (c) Seasonal factors | Charged to the cost of production by inflating overhead rates |

The machine hour rate has a built-in alarm here: under-absorption of machine overheads indicates the extent to which machines were idle (SM 4.35).

## Formats and formulas

*Reproduce the calculation statement and the accounting table from memory.*

::: formula Absorbed overheads and the balance
$$\text{Absorbed} = \text{Actual base} \times \text{Pre-determined rate} \qquad \text{Under (+) or over (−)} = \text{Actual overheads} - \text{Absorbed}$$
Actual base: the actual hours or units of the period. Actual overheads: after removing the abnormal and other-period items.
:::

::: formula Supplementary rate (SM 4.44)
$$\text{Supplementary rate} = \frac{\text{Under- or over-absorbed overheads}}{\text{Units produced}}$$
Units produced = finished units (sold and in stock) + equivalent completed units in work-in-progress.
:::

### Calculation of under- or over-absorption

| Particulars | Amount (₹) |
|---|---:|
| Actual production overheads incurred | xxx |
| Less: wages for strike period; previous year's expenses; obsolete stores written off | (xxx) |
| **Net production overheads actually incurred (A)** | **xxx** |
| Overheads absorbed (actual base × pre-determined rate) (B) | xxx |
| **Under-absorption (A − B) or over-absorption (B − A)** | **xxx** |

### The accounting (SM 4.44)

| Account | Under-absorption | Over-absorption | Amount |
|---|---|---|---|
| 1. Stock of finished goods A/c | Debit | Credit | Units of finished stock × supplementary rate |
| 2. Stock of semi-finished goods (WIP) A/c | Debit | Credit | Equivalent completed units × supplementary rate |
| 3. Cost of sales A/c | Debit | Credit | Units sold × supplementary rate |

The journal entry for an under-absorption, as in ICAI's suggested answer to old-scheme December 2021 Q5(b):

| Journal entry | Dr (₹) | Cr (₹) |
|---|---:|---:|
| Work-in-progress Control A/c Dr. | xxx | |
| Finished Goods Control A/c Dr. | xxx | |
| Cost of Sales A/c Dr. | xxx | |
| Costing Profit and Loss A/c Dr. (abnormal part) | xxx | |
| To Overhead Control A/c | | xxx |

For an over-absorption the entry is reversed: Overhead Control A/c is debited, and the three accounts (and Costing P&L for any abnormal part) are credited.

::: definition Under- and over-absorption
When the absorbed amount is less than the actual amount it is called under-absorption. Similarly, when the absorbed amount is more than the actual amount it is called over-absorption. Over-absorption is represented by a credit balance in the accounts and under-absorption by a debit balance; either may be termed overhead variance. (SM 4.42)
:::

## Worked examples

::::: example The year the gas price jumped
The samosa factory absorbs production overheads at a pre-determined ₹160 per machine hour. For 2025-26:

| Particulars | Data |
|---|---|
| Actual production overheads incurred | ₹1,30,40,000 |
| Included in them: wages paid for a strike period under an award | ₹4,20,000 |
| Included in them: expenses of 2024-25 booked in 2025-26 | ₹1,20,000 |
| Included in them: obsolete stores written off | ₹60,000 |
| Actual machine hours | 70,000 |
| Cartons completed; sold | 2,90,000; 2,50,000 (no opening stock) |
| Work-in-progress at year end | 40,000 cartons, 50% complete in all respects |

On investigation, 25% of the under-absorption was due to defective production planning; the rest was due to a normal increase in the price of gas and indirect labour.

> **Bunty:** So the whole gap goes to Costing P&L and we close the books?
> **Ritu:** First find out why it happened, Bunty. The reason decides the account.

**Required:**

(i) Calculate the under-absorption of production overheads for 2025-26.

(ii) Show its treatment in cost accounts.

(iii) Pass the journal entry.

:::: answer Show the working
**(i) Amount of under-absorption**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Total production overheads actually incurred | | 1,30,40,000 |
| Less: wages paid for strike period under an award | 4,20,000 | |
| Less: expenses of the previous year booked in the current year | 1,20,000 | |
| Less: obsolete stores written off | 60,000 | 6,00,000 |
| **Net production overheads actually incurred (A)** | | **1,24,40,000** |
| Overheads absorbed (70,000 hours × ₹160) (B) | | 1,12,00,000 |
| **Under-absorption (A − B)** | | **12,40,000** |

**(ii) Treatment**

1. 25% of ₹12,40,000 = **₹3,10,000**, due to defective planning, is abnormal: debited to the Costing Profit and Loss Account.
2. The balance of 75% = **₹9,30,000**, due to a normal increase in costs, is distributed over work-in-progress, finished goods and cost of sales by a supplementary rate.

Working note: equivalent completed units = 2,50,000 sold + 40,000 in stock + (40,000 × 50%) in work-in-progress = 3,10,000. Supplementary rate = ₹9,30,000 ÷ 3,10,000 = **₹3 per carton**.

| Apportionment of ₹9,30,000 | Equivalent units | Amount (₹) |
|---|---:|---:|
| Work-in-progress (40,000 × 50% × ₹3) | 20,000 | 60,000 |
| Finished goods (40,000 × ₹3) | 40,000 | 1,20,000 |
| Cost of sales (2,50,000 × ₹3) | 2,50,000 | 7,50,000 |
| **Total** | **3,10,000** | **9,30,000** |

::: diagram Where the ₹12,40,000 went
{"type": "tree", "gapX": 26, "root": {"label": "Under-absorbed\n₹12,40,000", "children": [
 {"label": "Defective planning\n₹3,10,000", "note": "Costing P&L", "color": "c"},
 {"label": "Normal cost rise\n₹9,30,000", "note": "₹3 a carton", "color": "a", "children": [
  {"label": "Cost of sales\n₹7,50,000", "color": "a"},
  {"label": "Finished\ngoods\n₹1,20,000", "color": "a"},
  {"label": "WIP\n₹60,000", "color": "a"}]}]},
 "caption": "Amber: the abnormal part, written off; blue: the normal part, spread by the supplementary rate."}
:::

**(iii) Journal entry**

| Particulars | Dr (₹) | Cr (₹) |
|---|---:|---:|
| Work-in-progress Control A/c Dr. | 60,000 | |
| Finished Goods Control A/c Dr. | 1,20,000 | |
| Cost of Sales A/c Dr. | 7,50,000 | |
| Costing Profit and Loss A/c Dr. | 3,10,000 | |
| To Overhead Control A/c | | 12,40,000 |

Profit falls by ₹10,60,000 this year (₹7,50,000 through cost of sales and ₹3,10,000 written off); stocks rise by ₹1,80,000, which reaches profit next year as the stock is sold.
::::
:::::

:::: example The premix plant absorbs too much
The trial balance of Tapri's premix plant at 30 September shows:

| Account | Amount (₹) |
|---|---:|
| Manufacturing overheads | 48,60,000 Dr. |
| Manufacturing overheads applied | 52,20,000 Cr. |
| Work-in-progress | 9,00,000 Dr. |
| Finished goods stock | 21,00,000 Dr. |
| Cost of goods sold | 60,00,000 Dr. |

**Required:**

(i) Compute the under- or over-absorption of manufacturing overheads.

(ii) State its treatment by both methods, apportioning on the values of the three balances where needed, and the effect on profit.

::: answer Show the working
**(i)** Applied ₹52,20,000 − actual ₹48,60,000 = **₹3,60,000 over-absorbed** (a credit balance).

**(ii) Method 1: write off to the Costing Profit and Loss Account.** The whole ₹3,60,000 is credited to Costing P&L; profit for the period rises by ₹3,60,000 and stock values are unchanged.

**Method 2: supplementary rate.** The over-absorption is credited back to the three accounts in proportion to their balances: ₹3,60,000 ÷ ₹90,00,000 = 4%.

| Account | Balance (₹) | Over-absorption credited (₹) | Adjusted (₹) |
|---|---:|---:|---:|
| Work-in-progress | 9,00,000 | 36,000 | 8,64,000 |
| Finished goods stock | 21,00,000 | 84,000 | 20,16,000 |
| Cost of goods sold | 60,00,000 | 2,40,000 | 57,60,000 |
| **Total** | **90,00,000** | **3,60,000** | **86,40,000** |

Profit for the period rises by ₹2,40,000 and stocks fall by ₹1,20,000, which reaches profit when they are sold. ICAI's answer to MTP January 2026 Series I Q1(b) apportioned on the values of the balances in this way, noting that direct labour hours or machine hours may also be used as the basis.
:::
::::

::::: example Order H-26's factory at the month end
In the samosa factory of [[cma.oh.absorb|the order H-26 example]], the blanket rate was 187.5% of direct wages, and the recommended departmental rates were Frying ₹45 per machine hour, Shaping ₹6 and Packing ₹9 per labour hour. The month's actual results:

| Actual | Frying | Shaping | Packing |
|---|---:|---:|---:|
| Wages (₹) | 1,30,000 | 4,50,000 | 2,10,000 |
| Overheads (₹) | 11,20,000 | 2,30,000 | 1,90,000 |
| Labour hours | 6,500 | 37,500 | 21,000 |
| Machine hours | 25,000 | 1,900 | – |

**Required:** Calculate the department-wise and total under- or over-recovery of overheads (a) under the blanket rate and (b) under the departmental rates, and comment.

:::: answer Show the working
**(a) Under the blanket rate**

| Particulars | Frying (₹) | Shaping (₹) | Packing (₹) | Total (₹) |
|---|---:|---:|---:|---:|
| Recovered (187.5% of actual wages) (A) | 2,43,750 | 8,43,750 | 3,93,750 | 14,81,250 |
| Actual overheads (B) | 11,20,000 | 2,30,000 | 1,90,000 | 15,40,000 |
| **(Under) / over (A − B)** | **(8,76,250)** | **6,13,750** | **2,03,750** | **(58,750)** |

**(b) Under the departmental rates**

| Particulars | Frying (₹) | Shaping (₹) | Packing (₹) | Total (₹) |
|---|---:|---:|---:|---:|
| Hours worked | 25,000 MH | 37,500 LH | 21,000 LH | |
| Recovered (A) | 11,25,000 | 2,25,000 | 1,89,000 | 15,39,000 |
| Actual overheads (B) | 11,20,000 | 2,30,000 | 1,90,000 | 15,40,000 |
| **(Under) / over (A − B)** | **5,000** | **(5,000)** | **(1,000)** | **(1,000)** |

::: diagram Department-wise over (+) and under (−) recovery
{"type": "plot", "h": 300, "x": [0.4, 3.6], "y": [-1000000, 800000],
 "xlabel": "department", "ylabel": "over (+) or under (−) recovery (₹)",
 "xticks": [[1, "Frying"], [2, "Shaping"], [3, "Packing"]],
 "yticks": [[-1000000, "−10,00,000"], [-500000, "−5,00,000"], [0, "0"], [500000, "5,00,000"]],
 "series": [
  {"label": "blanket rate", "bars": true, "bw": 0.32, "values": true, "color": "a", "pts": [[0.82, -876250, "−8,76,250"], [1.82, 613750, "6,13,750"], [2.82, 203750, "2,03,750"]]},
  {"label": "departmental rates", "bars": true, "bw": 0.32, "values": true, "color": "d", "pts": [[1.18, 5000, "5,000"], [2.18, -5000, "−5,000"], [3.18, -1000, "−1,000"]]}
 ],
 "caption": "Blue: blanket rate; orange: departmental rates, almost on the zero line. The blanket rate's small total hides large errors in every department."}
:::

**Comment.** The blanket rate's total under-recovery of ₹58,750 looks harmless, but it nets an under-recovery of ₹8,76,250 in Frying against over-recoveries of ₹8,17,500 in Shaping and Packing: every product was mis-costed. The departmental rates recover within ₹5,000 in each department, so their small balance can simply go to the Costing Profit and Loss Account.
::::
:::::

## Under the hood

### Three treatments in ICAI's answers

Asked to "EXPLAIN the treatment of over and under absorption of overheads in cost accounts" (MTP May 2024 Series I Q6(a), 5 marks), ICAI's answer lists three methods: (i) writing off to Costing P&L (small differences; a large difference is investigated and the abnormal loss or gain transferred to Costing P&L); (ii) the supplementary rate; (iii) **carry forward to the subsequent year**, in the expectation that next year's position will be corrected automatically. The chapter text itself describes only the first two, so carry forward is the third point, never the first.

### Where the flow chart and the text differ

The Study Material's flow chart sends a large difference "due to wrong estimation and abnormal reasons" to Costing P&L (SM 4.43), while its text, its illustrations and every suggested answer read for this lesson send a large difference from an unavoidable wrong estimate to a supplementary rate and only the abnormal part to Costing P&L (SM 4.44–4.46). Follow the text and the answers, as this lesson does.

### Units or values

The Study Material divides by units produced; MTP January 2026 Series I Q1(b) gave only account balances and apportioned on their values. Use units when the question gives units, values when it gives only balances, and say which.

### The same idea elsewhere

In absorption costing statements the under- or over-absorption is adjusted in cost of goods sold ([[cma.mc.absorb|marginal versus absorption costing]]); in standard costing, a fixed overhead variance is an under- or over-absorption ([[cma.std.foh|fixed overhead variances]]). The balance sits in the overhead control account of the cost ledger ([[cma.sys.ledgers|non-integrated and integrated accounts]]), and in a reconciliation of cost and financial profit it is a reconciling item ([[cma.sys.recon|reconciling cost and financial profit]]).

## Exam angle

::: exam How ICAI asks under- and over-absorption
In the 13 documents read for this lesson it came up as follows:

- **Compute and treat, 6–10 marks**: PYQ May 2024 Q4(b) (6 marks: obsolete stores excluded, 20% defective planning, work-in-progress 40% complete); old scheme December 2021 Q5(b) (10 marks: strike-period wages and previous-year expenses excluded, 40% factory inefficiency, journal entry).
- **From a trial balance, 5 marks**: MTP January 2026 Series I Q1(b), apportioned on values.
- **Complete the accounting table, 3 marks**: PYQ September 2025 Q5(c), the Dr/Cr and amount columns of SM 4.44.
- **Case-scenario MCQs**: RTP May 2024 case scenario (rate, absorbed amount, over-absorption after four exclusions, supplementary rate, the share of work-in-progress), the Study Material's own case scenario 1.
- **Single MCQs, 2 marks**: MTP May 2025 Series II MCQ 12 and MTP September 2026 Series II MCQ 15 (strike wages out, overtime in, one-third to Costing P&L); MTP May 2024 Series I MCQ 6 and MTP September 2026 Series I MCQ 14 (absorbed on actual hours); RTP September 2024 MCQ 3.
- **Inside larger questions**: MTP January 2025 Series II Q1(a)(iv); MTP September 2024 Series II Q4(d) (4 marks, department-wise, blanket against departmental).
- **Theory**: MTP May 2024 Series I Q6(a) (5 marks, the three treatments); MTP May 2025 Series II Q4(c) (2 marks) and old-scheme RTP November 2023, idle capacity costs.
:::

::: exam Traps
- Absorbed = **actual** hours × rate. Budgeted overheads minus actual overheads is not the under-absorption: in MTP September 2026 Series I MCQ 14 that shortcut leads to the ₹5,000 distractor, while ICAI's answer is ₹8,800 under-absorbed.
- Exclude strike-period wages, court-award payments, previous-year expenses and obsolete stores before comparing; keep normal overtime.
- Work-in-progress enters the supplementary rate at equivalent completed units (40,000 cartons at 50% = 20,000).
- "Transferred to Costing P&L" in an MCQ usually means only the abnormal share of the balance.
:::

::: trick Sign check
Under-absorption: the accounts are short of cost, so debit the products (and Costing P&L) and credit Overhead Control. Over-absorption: the reverse. Condition: a debit balance on the overhead account is always under-absorption.
:::

## Answer frame

**"Explain the treatment of over- and under-absorption of overheads in cost accounts"** (5 marks):

1. Meaning: absorbed at pre-determined rates; actual differs; under = absorbed less than actual (debit balance), over = absorbed more than actual (credit balance).
2. Small balances: Costing P&L, product costs not disturbed, as they represent normal cost.
3. Large balances due to wrong estimation for unavoidable reasons: supplementary rate = under/over-absorbed ÷ units produced, applied to finished goods, WIP (equivalent units) and cost of sales.
4. Abnormal reasons (abnormal over- or under-capacity utilisation, defective planning): Costing P&L.
5. Carry forward to the subsequent year (ICAI's answer to MTP May 2024 Series I Q6(a)).

**"How would you treat idle capacity costs?"** (2 marks in MTP May 2025 Series II Q4(c)): the three causes and treatments in the table above, in ICAI's order: unavoidable (supplementary rate), avoidable (Costing P&L), seasonal (inflated overhead rates).

### Three answers to the gas-price question

::: cols
**Loses marks**

"Under-absorption ₹18,40,000; charge to Costing P&L."

No exclusions, no split by reason, no supplementary rate.
---
**Passes**

The ₹12,40,000 is right and split 25 : 75, but the supplementary rate divides by finished cartons only.

Work-in-progress missed: the apportionment fails.
---
**Full marks**

The calculation statement with each exclusion named; the split by reason, each part's treatment stated; the working note for equivalent units and the rate; the apportionment table; the journal entry if asked.
:::

## Common mistakes

::: mistake Hall of Shame: budget minus actual
A rate of ₹30 an hour was budgeted on ₹7,20,000 for 24,000 hours; the factory worked 23,100 hours and spent ₹7,05,000. Comparing budgeted with actual overheads (₹15,000 "over") ignores the hours actually worked. **Fix:** absorbed = 23,100 actual hours × ₹30 = ₹6,93,000, against actual ₹7,05,000: ₹12,000 under-absorbed.
:::

::: mistake The strike that was charged to samosas
Leaving strike-period wages, previous-year expenses and obsolete stores inside actual overheads inflates the under-absorption and spreads abnormal costs into stock. **Fix:** deduct them first, and name each one in the statement.
:::

::: mistake The forgotten half-made cartons
Dividing the normal part only by finished units (2,90,000) gives ₹3.21 a carton and leaves work-in-progress at the old cost. **Fix:** add work-in-progress at equivalent completed units: 3,10,000 units, ₹3 each.
:::

::: mistake Everything to Costing P&L
Writing off a large, normal under-absorption leaves every product undercosted and stock undervalued. **Fix:** only small balances and abnormal parts go to Costing P&L; a large normal balance is spread by a supplementary rate.
:::

## Practice

::: quiz Check yourself
Q: Budgeted overheads were ₹5,40,000 for 18,000 machine hours. The factory worked 17,000 machine hours and incurred ₹5,30,000 of overheads. What is the result?
- [ ] ₹10,000 over-absorbed
- [ ] ₹10,000 under-absorbed
- [x] ₹20,000 under-absorbed
- [ ] ₹20,000 over-absorbed
> Rate = ₹5,40,000 ÷ 18,000 = ₹30; absorbed = 17,000 × ₹30 = ₹5,10,000; actual ₹5,30,000 exceeds it by ₹20,000: under-absorbed. ₹10,000 compares budgeted with actual overheads and ignores the hours.

Q: Case scenario. Tapri's kulhad unit absorbed ₹16,80,000 of overheads. Its actual overheads of ₹18,40,000 include ₹60,000 of wages paid for a strike period under an award and ₹25,000 of normal overtime premium. Ritu finds that one-fourth of the under-absorption was due to faulty planning. How much of the under-absorption should be charged to the Costing Profit and Loss Account?
- [ ] ₹40,000
- [x] ₹25,000
- [ ] ₹18,750
- [ ] ₹75,000
> Net actual = ₹18,40,000 − ₹60,000 = ₹17,80,000; under-absorption = ₹1,00,000; one-fourth = ₹25,000. ₹40,000 forgets to remove the strike wages; ₹18,750 also removes the overtime, which is a normal cost; ₹75,000 is the part spread by a supplementary rate.

Q: How does ICAI treat idle capacity cost caused by seasonal factors?
- [ ] Charged to the Costing Profit and Loss Account
- [x] Charged to the cost of production by inflating overhead rates
- [ ] Recovered by a supplementary rate on the capacity utilised
- [ ] Carried forward to the next year
> SM 4.59: seasonal idle capacity cost is charged to cost of production by inflating overhead rates. A supplementary rate is for unavoidable causes such as repairs and changeovers; Costing P&L for avoidable causes such as faulty planning.

Q: Which items do ICAI's answers deduct from actual production overheads before computing the under-absorption? Select all that apply.
- [x] Wages paid for a strike period under an award
- [x] Expenses of the previous year booked in the current year
- [x] Obsolete stores written off
- [ ] Normal overtime wages of indirect workers
> The first three are abnormal or belong to another period. Normal overtime is a normal cost of the period and stays in (MTP May 2025 Series II MCQ 12).

Q: A normal under-absorption of ₹54,000 is to be spread by a supplementary rate. 16,000 units were completed (12,000 sold) and 4,000 units are in progress, 50% complete. How much is charged to work-in-progress (₹)?
= 6000
> Equivalent units = 16,000 + 4,000 × 50% = 18,000; rate = ₹54,000 ÷ 18,000 = ₹3; work-in-progress = 2,000 × ₹3 = ₹6,000.
:::

## Recap

- Absorbed = actual base × pre-determined rate; under = actual > absorbed (debit balance); over = absorbed > actual (credit balance); both are "overhead variance".
- Causes: overheads differ from estimate, activity differs from budget, or both in different proportions; a proportional change in both gives neither.
- First remove strike wages, court awards, previous-year expenses and obsolete stores; keep normal overtime.
- Small balance: Costing P&L. Abnormal part: Costing P&L. Large normal part: supplementary rate.
- Supplementary rate = balance ÷ units produced (WIP at equivalent units); applied to finished goods, WIP and cost of sales.
- Idle capacity: unavoidable, supplementary rate; avoidable, Costing P&L; seasonal, inflated overhead rates.
- ICAI's answers add a third treatment: carry forward to the next year.
- The mess asks every student for the vegetable price rise, not for the burnt rice.

## Flashcards

Q:: Define under-absorption and over-absorption.
A:: Under-absorption: the absorbed amount is less than the actual amount (debit balance). Over-absorption: the absorbed amount is more than the actual amount (credit balance). Either may be termed overhead variance.

Q:: Formula: supplementary rate?
A:: Under- or over-absorbed overheads ÷ units produced (finished units plus equivalent completed units in WIP).

Q:: Which accounts receive the supplementary rate, and on what quantities?
A:: Stock of finished goods (units in stock), stock of semi-finished goods or WIP (equivalent completed units) and cost of sales (units sold); debited for under-absorption, credited for over-absorption.

Q:: Treatment of a small under- or over-absorbed balance?
A:: Transferred to the Costing Profit and Loss Account; product costs are not adjusted, as they represent normal cost.

Q:: Treatment of a large under-absorption due to wrong estimation for unavoidable reasons?
A:: Adjust product costs through a supplementary rate over cost of sales, finished goods and work-in-progress.

Q:: Treatment of under- or over-absorption due to abnormal reasons?
A:: Transferred to the Costing Profit and Loss Account (for example abnormal over- or under-capacity utilisation, defective planning, factory inefficiency).

Q:: Name four items ICAI's answers deduct from actual overheads before computing under-absorption.
A:: Wages paid for a strike period under an award; amounts paid under a labour court award (non-recurring); expenses of the previous year booked in the current year; obsolete stores written off.

Q:: Treatment of idle capacity costs: three cases?
A:: Unavoidable reasons (repairs, maintenance, changeover): supplementary overhead rate on capacity utilised. Avoidable reasons (faulty planning, power failure): Costing P&L. Seasonal factors: charged to cost of production by inflating overhead rates.

Q:: When do actual and pre-determined rates give neither under- nor over-absorption?
A:: When actual overheads and actual units change in the same proportion (or both equal the budget).

Q:: Journal entry for under-absorption spread by a supplementary rate, with an abnormal part?
A:: WIP Control A/c, Finished Goods Control A/c, Cost of Sales A/c and Costing P&L A/c Dr.; To Overhead Control A/c.
