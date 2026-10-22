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

::::: example The fryer line's short year: hours lost, prices risen
The samosa factory set its production overhead rate for 2025-26 on a normal capacity of 80,000 machine hours: budgeted fixed overheads ₹72,00,000 (₹90 an hour) plus variable overheads of ₹30 an hour, a pre-determined rate of ₹120 per machine hour. The year's actuals:

| Particulars | Data |
|---|---|
| Machine hours worked | 68,000 |
| Fixed overheads incurred (an insurance premium rose) | ₹73,09,000 |
| Variable overheads incurred (gas and oil at ₹32 an hour) | ₹21,76,000 |

The 12,000 hours lost against normal capacity were: 8,000 hours in the monsoon, when demand always falls; 2,500 hours of a strike that followed the management's delay in signing a wage agreement; and 1,500 hours for the planned changeover to a new oil-filtration system. Output was 2,75,000 equivalent cartons: 2,20,000 sold, 40,000 in finished stock and 30,000 in work-in-progress, 50% complete.

**Required:**

(i) Calculate the under- or over-absorption for the year.

(ii) Analyse it by cause and state the treatment of each part.

(iii) Calculate the supplementary rate and apportion the amount to be spread.

:::: answer Show the working
**(i) Under-absorption**

| Particulars | Amount (₹) |
|---|---:|
| Actual overheads (₹73,09,000 + ₹21,76,000) (A) | 94,85,000 |
| Absorbed (68,000 hours × ₹120) (B) | 81,60,000 |
| **Under-absorption (A − B)** | **13,25,000** |

**(ii) Analysis by cause and treatment**

| Cause | Working | Amount (₹) | Treatment (SM 4.45, 4.59) |
|---|---|---:|---|
| Seasonal idle capacity (monsoon) | 8,000 × ₹90 | 7,20,000 | Seasonal: charged to the cost of production (by inflating overhead rates) |
| Idle capacity, strike from management's delay | 2,500 × ₹90 | 2,25,000 | Avoidable: Costing Profit and Loss Account |
| Idle capacity, planned changeover | 1,500 × ₹90 | 1,35,000 | Unavoidable: supplementary rate on the capacity utilised |
| Rise in variable overhead prices | 68,000 × (₹32 − ₹30) | 1,36,000 | Normal increase in costs: supplementary rate |
| Rise in fixed overheads | ₹73,09,000 − ₹72,00,000 | 1,09,000 | Normal increase in costs: supplementary rate |
| **Total** | | **13,25,000** | |

Each hour short of normal capacity leaves ₹90 of fixed overhead unabsorbed; the variable rate recovers its cost on every hour actually worked, so lost hours affect only the fixed part.

::: diagram Where the ₹13,25,000 goes
{"type": "tree", "gapX": 26, "root": {"label": "Under-absorbed\n₹13,25,000", "children": [
 {"label": "Strike\n₹2,25,000", "note": "Costing P&L", "color": "c"},
 {"label": "Seasonal,\nchangeover,\nprice rises\n₹11,00,000", "note": "₹4 a carton", "color": "a", "children": [
  {"label": "Cost of sales\n₹8,80,000", "color": "a"},
  {"label": "Finished\ngoods\n₹1,60,000", "color": "a"},
  {"label": "WIP\n₹60,000", "color": "a"}]}]},
 "caption": "Amber: the avoidable part, written off; blue: the parts charged to production through the supplementary rate."}
:::

**(iii) Supplementary rate** = ₹11,00,000 ÷ 2,75,000 equivalent cartons = **₹4 a carton** (work-in-progress counts as 30,000 × 50% = 15,000).

| Apportionment of ₹11,00,000 | Equivalent cartons | Amount (₹) |
|---|---:|---:|
| Cost of sales (2,20,000 × ₹4) | 2,20,000 | 8,80,000 |
| Finished goods (40,000 × ₹4) | 40,000 | 1,60,000 |
| Work-in-progress (15,000 × ₹4) | 15,000 | 60,000 |
| **Total** | **2,75,000** | **11,00,000** |

Profit falls by ₹11,05,000 this year (₹8,80,000 through cost of sales and ₹2,25,000 written off); stocks rise by ₹2,20,000, which reaches profit next year as the stock is sold.
::::
:::::

:::: example Which capacity for the rate? Kesar's slow-year proposal
Tapri's fryer line has fixed overheads of ₹60,00,000 a year and variable overheads of ₹25 per machine hour. Its capacities are: practical capacity 96,000 machine hours; normal capacity (the average expected over the next few years) 75,000; this year's budget, a slow year, 60,000. The line actually worked 64,000 hours, and actual overheads were as budgeted for those hours.

> **Kesar:** This year will be slow, so set the rate on 60,000 hours. Then the rate recovers everything.

**Required:**

(i) Calculate the pre-determined rate on each of the three capacities, and the under- or over-absorption each gives this year.

(ii) Advise which capacity the rate should be based on, and state the treatment of this year's balance on that basis.

::: answer Show the working
Actual overheads = ₹60,00,000 + 64,000 × ₹25 = **₹76,00,000**.

**(i) Rates and absorption**

| Capacity used for the rate | Fixed rate (₹) | Total rate (₹) | Absorbed: 64,000 × rate (₹) | (Under) / over (₹) |
|---|---:|---:|---:|---:|
| Practical, 96,000 hours | 62.50 | 87.50 | 56,00,000 | (20,00,000) |
| Normal, 75,000 hours | 80.00 | 105.00 | 67,20,000 | (8,80,000) |
| This year's budget, 60,000 hours | 100.00 | 125.00 | 80,00,000 | 4,00,000 |

**(ii) Advice.** Set the rate on **normal capacity**, ₹105 an hour. The Study Material defines normal capacity as the production achieved or achievable on an average over a period under normal circumstances, taking into account planned maintenance (SM 4.58), and a pre-determined rate on normal capacity keeps the difference between actual and absorbed overheads to a minimum over the years (SM 4.66, MCQ 9).

- Kesar's rate of ₹125 would make every carton fried this year carry ₹20 an hour more fixed overhead than in a normal year, only because fewer cartons are being made. Product costs and quotations would rise in the very year demand is weak, and the rate would change every year with volume.
- A rate on practical capacity (₹87.50) assumes a level of activity the line does not normally reach, so it under-absorbs year after year (₹20,00,000 this year) and undercosts every product.

On the normal-capacity rate, this year's ₹8,80,000 is entirely fixed overhead left unabsorbed by 11,000 hours of capacity below normal (75,000 − 64,000 = 11,000 × ₹80). Under-recovery due to abnormal under-capacity utilisation is transferred to the **Costing Profit and Loss Account** (SM 4.45); it is the cost of idle capacity, not a cost of the cartons made.
:::
::::

::::: example The kulhad unit's overhead control account
For the quarter ended 30 June, the kulhad unit's cost ledger shows these production overheads: indirect materials issued ₹3,20,000; indirect wages ₹5,50,000; depreciation of kilns ₹2,40,000; power and other expenses paid ₹3,60,000. Overheads are absorbed at ₹150 per kiln hour, and the kilns worked 9,000 hours.

Of the balance, ₹30,000 arose from a two-day power failure caused by an unpaid electricity bill; the rest is due to normal cost increases and is to be spread by a supplementary rate. Output was 18,000 equivalent units: 14,000 sold, 2,000 in finished stock and 4,000 in work-in-progress, 50% complete.

**Required:**

(i) Prepare the Production Overhead Control Account for the quarter.

(ii) Pass the journal entry to close its balance.

:::: answer Show the working
**Working notes**

1. Actual overheads = ₹3,20,000 + ₹5,50,000 + ₹2,40,000 + ₹3,60,000 = ₹14,70,000; absorbed = 9,000 × ₹150 = ₹13,50,000; **under-absorbed ₹1,20,000**.
2. Power failure from an unpaid bill: avoidable, ₹30,000 to Costing P&L (SM 4.59). Normal part ₹90,000 ÷ 18,000 equivalent units = **₹5 a unit**: cost of sales 14,000 × ₹5 = ₹70,000; finished goods 2,000 × ₹5 = ₹10,000; work-in-progress (4,000 × 50%) 2,000 × ₹5 = ₹10,000.

**(i) Production Overhead Control Account**

::: cols Production Overhead Control Account
| Dr. | ₹ |
|---|---:|
| To Stores Ledger Control A/c (indirect materials) | 3,20,000 |
| To Wages Control A/c (indirect wages) | 5,50,000 |
| To Cost Ledger Control A/c (depreciation) | 2,40,000 |
| To Cost Ledger Control A/c (power and other expenses) | 3,60,000 |
| **Total** | **14,70,000** |
---
| Cr. | ₹ |
|---|---:|
| By Work-in-Progress Control A/c (absorbed: 9,000 × ₹150) | 13,50,000 |
| By Costing P&L A/c (power failure) | 30,000 |
| By Cost of Sales A/c (supplementary) | 70,000 |
| By Finished Goods Control A/c (supplementary) | 10,000 |
| By Work-in-Progress Control A/c (supplementary) | 10,000 |
| **Total** | **14,70,000** |
:::

The debit side collects the actual overheads; the credit side shows what was absorbed. The difference before closing, ₹1,20,000 on the debit side, is the under-absorption; the last four credits close it.

**(ii) Journal entry**

| Particulars | Dr (₹) | Cr (₹) |
|---|---:|---:|
| Costing Profit and Loss A/c Dr. | 30,000 | |
| Cost of Sales A/c Dr. | 70,000 | |
| Finished Goods Control A/c Dr. | 10,000 | |
| Work-in-Progress Control A/c Dr. | 10,000 | |
| To Production Overhead Control A/c | | 1,20,000 |
| (Being under-absorbed overheads closed: the avoidable part written off, the normal part spread by a supplementary rate of ₹5 a unit) | | |
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
- Work-in-progress enters the supplementary rate at equivalent completed units (30,000 cartons at 50% = 15,000).
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

### Three answers to the fryer-line question

::: cols
**Loses marks**

"Under-absorption ₹13,25,000; charge to Costing P&L."

No analysis by cause, no supplementary rate.
---
**Passes**

The ₹13,25,000 is right and split by cause, but the supplementary rate divides by finished cartons only.

Work-in-progress missed: the apportionment fails.
---
**Full marks**

The calculation statement; the analysis by cause (hours lost × fixed rate, price rises), each part's treatment stated with its reason; the working note for equivalent units and the rate; the apportionment table; the journal entry if asked.
:::

## Common mistakes

::: mistake Hall of Shame: budget minus actual
A rate of ₹30 an hour was budgeted on ₹7,20,000 for 24,000 hours; the factory worked 23,100 hours and spent ₹7,05,000. Comparing budgeted with actual overheads (₹15,000 "over") ignores the hours actually worked. **Fix:** absorbed = 23,100 actual hours × ₹30 = ₹6,93,000, against actual ₹7,05,000: ₹12,000 under-absorbed.
:::

::: mistake The strike that was charged to samosas
Leaving strike-period wages, previous-year expenses and obsolete stores inside actual overheads inflates the under-absorption and spreads abnormal costs into stock. **Fix:** deduct them first, and name each one in the statement.
:::

::: mistake The forgotten half-made cartons
Dividing the part to be spread only by finished cartons (2,60,000) gives ₹4.23 a carton and leaves work-in-progress at the old cost. **Fix:** add work-in-progress at equivalent completed units: 2,75,000 cartons, ₹4 each.
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
