---
id: cma.mc.keyfactor
title: Limiting factor and product mix
minutes: 30
needs: cma.mc.basics
tags: limiting factor, key factor, product mix, contribution per unit of key factor, scarce resource, make or buy
labs: key-factor
summary: When one resource runs short, rank products by contribution per unit of that resource, fill demand in rank order, and earn the most from what you have.
---

## In plain words

### One fryer, two favourites

Tapri's Indore factory has one big fryer, and it is booked solid: 2,000 hours a month. Paneer rolls leave ₹30 of contribution a pack, aloo samosas ₹20.

> **Kesar:** Rolls earn ₹30, samosas ₹20. Fry rolls. Simple.
> **Ritu:** Per unit, please, and today the unit is the fryer hour. A pack of rolls needs half an hour of fryer, a pack of samosas a quarter of an hour.
> **Kesar:** So in one hour I get two packs of rolls or four packs of samosas... the samosa was the topper all along?

Two packs of rolls earn ₹60 in that hour; four packs of samosas earn ₹80. Fill the fryer with rolls and the month's contribution is 4,000 packs × ₹30 = ₹1,20,000; fill it with samosas and it is 8,000 packs × ₹20 = ₹1,60,000.

The fryer is the **limiting factor**, also called the **key factor**: the thing that stops Tapri making and selling more. Once something is short, the question is no longer "which product earns most per pack?" but "which product earns most from one unit of the scarce thing?" That figure is the **contribution per unit of the limiting factor**. Rank the products on it, give the scarce resource to the top one until its demand is met, then to the next, and so on.

::: analogy The exam-hall clock
In a three-hour paper, time is your limiting factor. A 10-mark question you can finish in 20 minutes earns half a mark a minute; a 16-mark question that eats an hour earns about a quarter. When the clock is short, you rank questions by marks per minute, not by marks, and you do the half-a-mark-a-minute ones first.
:::

::: key
When a resource is scarce, rank products by contribution per unit of that resource, not by contribution (or profit) per unit of product. Fixed costs that stay the same whatever the mix never change the ranking.
:::

## How it works

ICAI defines it in one line: ==limiting factor is anything which limits the activity of an entity==; because it decides the level of sales and production, it is also known as the **key factor** (SM 14.36). The Study Material lists product mix under resource constraints among the short-term decisions "related with excess demand": demand is there, the resources are not (SM 14.36).

::: diagram Where limiting factors come from
{"type": "nest", "w": 420, "root": {"title": "Limiting (key) factor", "mono": false, "children": [
  {"title": "Supply side", "mono": false, "color": "a", "lines": ["Men (employees)", "Materials (raw material or supplies)", "Machine (capacity)", "Money (availability of fund or budget)"]},
  {"title": "Demand side", "mono": false, "color": "b", "lines": ["Demand for the product", "Nature of product", "Regulatory and environmental requirement"]}]},
 "caption": "ICAI's list, in ICAI's order (SM 14.36). Management's objective is to optimise the key resource to the maximum possible extent."}
:::

### Five steps from scarce hours to the best mix

::: steps
1. **Contribution per unit** of each product = selling price − variable cost. Leave fixed costs out: they are the same whatever the mix.
2. **Check that the factor really limits.** Work out how much of the resource the full demand needs. If there is enough, make every product with a positive contribution up to its demand; no ranking is needed.
3. **Contribution per unit of the limiting factor** = contribution per unit ÷ quantity of the factor one unit uses. If the question hides the quantity, derive it: hours = variable overhead per unit ÷ variable overhead rate per hour; kg = material cost per unit ÷ price per kg; labour hours = labour cost per unit ÷ wage rate per hour.
4. **Rank and allocate.** Highest contribution per unit of the factor first. Give the factor first to any minimum commitment (a contract, a product that must be made), then in rank order up to each product's maximum demand; the last product gets the balance.
5. **Statement of profit.** Contribution of the chosen mix, less fixed costs.
:::

::: diagram The ranking method
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Products compete for\none resource"},
  {"id": "c", "kind": "process", "label": "Contribution per unit\n(fixed costs out)"},
  {"id": "d", "kind": "decision", "label": "Resource short for\nfull demand?"},
  {"id": "all", "kind": "end", "label": "Make full demand", "color": "g"},
  {"id": "k", "kind": "process", "label": "Contribution per\nunit of factor"},
  {"id": "r", "kind": "process", "label": "Commitments first,\nthen rank to demand"},
  {"id": "p", "kind": "end", "label": "Contribution of mix\nless fixed costs"}],
 "edges": [["s", "c"], ["c", "d"], ["d", "all", "no"], ["d", "k", "yes"], ["k", "r"], ["r", "p"]],
 "caption": "Green: no constraint, so every product with a positive contribution is made up to its demand. Otherwise the answer ends with the profit statement of the chosen mix."}
:::

In the fryer story the ranking flips the moment you divide by the scarce hours:

::: diagram Per pack against per fryer hour
{"type": "plot", "h": 260, "x": [0, 6], "y": [0, 100], "ylabel": "contribution (₹)",
 "xticks": [[1.5, "per pack"], [4.5, "per fryer hour"]], "yticks": [0, 20, 40, 60, 80, 100],
 "series": [
  {"label": "paneer roll", "bars": true, "values": true, "bw": 0.8, "color": "d", "pts": [[1, 30], [4, 60]]},
  {"label": "aloo samosa", "bars": true, "values": true, "bw": 0.8, "color": "a", "pts": [[2, 20], [5, 80]]}
 ],
 "caption": "Orange: paneer roll; blue: aloo samosa. Per pack the roll leads, ₹30 to ₹20; per fryer hour the samosa leads, ₹80 to ₹60. With the fryer full, the per-hour bars decide."}
:::

::: lab key-factor {"mode":"mix"}
Step through the five steps yourself: a column per frame up to the rank, then the scarce resource fills product by product and the profit statement closes it.
:::

### Which measure ranks the products

ICAI's formula is **profitability = contribution ÷ key factor** (SM 14.28). Put the scarce thing under the line:

| What is short | Rank by |
|---|---|
| Nothing (enough of every resource) | No ranking: make every product with a positive contribution, up to demand |
| Machine or labour hours | Contribution per hour |
| Total units of capacity, shared (each unit of any product takes one) | Contribution per unit |
| Raw material | Contribution per kg (or per unit of material) |
| Total sales value | P/V ratio (contribution per rupee of sales) |
| Choosing to make or buy with scarce hours | Saving per hour = (buy price − variable cost of making) ÷ hours |

This is why ICAI counts **dependence on key factors** among the limitations of marginal costing: the contribution of a product by itself is not a guide to optimum profitability unless it is linked with the key factor (SM 14.10).

## Formats and formulas

*Reproduce these three statements from memory; ICAI's suggested answers are built from them.*

::: formula Contribution per unit of the limiting factor
$$\text{Profitability} = \frac{\text{Contribution per unit}}{\text{Key factor per unit}}$$
ICAI writes it as Profitability = Contribution ÷ Key factor (SM 14.28). Key factor per unit: hours, kg, metres or any other unit of the scarce resource one unit of product uses.
:::

::: formula Recovering the quantity of the factor
$$\text{Hours per unit} = \frac{\text{VOH per unit}}{\text{VOH rate per hour}} \qquad \text{Kg per unit} = \frac{\text{Material cost per unit}}{\text{Price per kg}}$$
VOH = variable overhead. Labour hours per unit = labour cost per unit ÷ wage rate per hour, in the same way.
:::

**Statement 1: ranking**

| Particulars | Product A | Product B | Product C |
|---|---:|---:|---:|
| Selling price per unit | xxx | xxx | xxx |
| Less: Variable cost per unit | xxx | xxx | xxx |
| **Contribution per unit** | **xxx** | **xxx** | **xxx** |
| Key factor per unit (hours, kg) | xx | xx | xx |
| **Contribution per unit of key factor** | **xx** | **xx** | **xx** |
| Rank | II | I | III |

**Statement 2: optimum product mix**

| Product (in rank order) | Units | Key factor used | Key factor left |
|---|---:|---:|---:|
| Minimum commitment, if any | xxx | xxx | xxx |
| Rank I (up to demand) | xxx | xxx | xxx |
| Rank II (up to demand) | xxx | xxx | xxx |
| Rank III (balance) | xxx | xxx | nil |

**Statement 3: profit**

| Product | Units | Contribution per unit (₹) | Total contribution (₹) |
|---|---:|---:|---:|
| A | xxx | xx | xxx |
| B | xxx | xx | xxx |
| **Total contribution** | | | **xxx** |
| Less: Fixed costs | | | xxx |
| **Profit** | | | **xxx** |

::: definition Limiting factor (key factor)
Limiting factor is anything which limits the activity of an entity. The factor is a key to determine the level of sale and production, thus it is also known as Key factor. (SM 14.36, 14.49)
:::

## Worked examples

::::: example Three snacks, a fryer and a packing line
Tapri's Indore factory fries and packs three snacks. Data per pack:

| Particulars | Aloo samosa | Paneer roll | Kachori |
|---|---:|---:|---:|
| Selling price (₹) | 120 | 200 | 150 |
| Variable cost (₹) | 80 | 140 | 105 |
| Fryer hours | 0.5 | 1.0 | 0.6 |
| Packing-line hours | 0.3 | 0.5 | 0.4 |
| Maximum demand a month (packs) | 10,000 | 6,000 | 5,000 |

The fryer can run 12,000 hours and the packing line 9,000 hours a month. Fixed overheads are ₹5,00,000 a month.

**Required:**

(i) Identify the key factor, and rank the products.

(ii) Determine the optimum product mix and calculate the maximum profit.

(iii) Kesar wants to fry in the order of contribution per pack. Calculate the profit under his plan and the profit it gives up.

:::: answer Show the working
**(i) Key factor and ranking**

| Resource | Hours for the full demand | Hours available | Short? |
|---|---:|---:|---|
| Fryer: 10,000 × 0.5 + 6,000 × 1.0 + 5,000 × 0.6 | 14,000 | 12,000 | Yes |
| Packing line: 10,000 × 0.3 + 6,000 × 0.5 + 5,000 × 0.4 | 8,000 | 9,000 | No |

Only the fryer falls short of the full demand: **fryer hours are the key factor**. The packing line has spare hours whatever mix is chosen, so it does not affect the ranking.

| Particulars | Aloo samosa | Paneer roll | Kachori |
|---|---:|---:|---:|
| **Contribution per pack (₹)** | **40** | **60** | **45** |
| Fryer hours per pack | 0.5 | 1.0 | 0.6 |
| **Contribution per fryer hour (₹)** | **80** | **60** | **75** |
| Rank | I | III | II |

**(ii) Optimum mix and profit**

| Product (rank order) | Packs | Fryer hours | Hours left |
|---|---:|---:|---:|
| Aloo samosa (full demand) | 10,000 | 5,000 | 7,000 |
| Kachori (full demand) | 5,000 | 3,000 | 4,000 |
| Paneer roll (balance, 4,000 ÷ 1.0) | 4,000 | 4,000 | nil |

Check on the packing line: 10,000 × 0.3 + 5,000 × 0.4 + 4,000 × 0.5 = 7,000 hours, within the 9,000 available.

| Product | Packs | Contribution per pack (₹) | Contribution (₹) |
|---|---:|---:|---:|
| Aloo samosa | 10,000 | 40 | 4,00,000 |
| Kachori | 5,000 | 45 | 2,25,000 |
| Paneer roll | 4,000 | 60 | 2,40,000 |
| **Total contribution** | | | **8,65,000** |
| Less: Fixed overheads | | | 5,00,000 |
| **Maximum profit** | | | **3,65,000** |

**(iii) Kesar's order: paneer roll, kachori, aloo samosa**

Paneer roll 6,000 packs use 6,000 hours; kachori 5,000 packs use 3,000; the last 3,000 hours make 6,000 packs of aloo samosa. Contribution = ₹3,60,000 + ₹2,25,000 + ₹2,40,000 = ₹8,25,000; profit = **₹3,25,000**, which is **₹40,000** less. Check: 2,000 fryer hours moved from samosas (₹80 an hour) to rolls (₹60 an hour) lose 2,000 × ₹20.

::: diagram Filling 12,000 fryer hours, two ways
{"type": "plot", "h": 320, "x": [0, 12000], "y": [0, 900000],
 "xlabel": "fryer hours used", "ylabel": "cumulative contribution (₹)",
 "xticks": [[0, "0"], [3000, "3,000"], [6000, "6,000"], [9000, "9,000"], [12000, "12,000"]],
 "yticks": [[0, "0"], [300000, "3,00,000"], [600000, "6,00,000"], [900000, "9,00,000"]],
 "legend": "bottom-right",
 "series": [
  {"label": "per hour order: ₹8,65,000", "pts": [[0, 0], [5000, 400000], [8000, 625000], [12000, 865000]], "color": "a", "dots": true},
  {"label": "per pack order: ₹8,25,000", "pts": [[0, 0], [6000, 360000], [9000, 585000], [12000, 825000]], "color": "d", "dots": true}
 ],
 "caption": "Blue: hours given in rank order of contribution per fryer hour (samosa, kachori, roll); orange: Kesar's order of contribution per pack (roll, kachori, samosa). Each segment's slope is that product's contribution per hour. Both paths use all 12,000 hours; the blue one ends ₹40,000 higher."}
:::
::::
:::::

:::: example Tea dust, a hotel contract and a broker
Tapri's premix division makes three chai premixes. Data per carton for the coming quarter:

| Particulars (₹ per carton) | Masala | Elaichi | Ginger |
|---|---:|---:|---:|
| Selling price | 900 | 1,200 | 800 |
| Tea dust @ ₹500 per kg | 250 | 400 | 200 |
| Other variable costs | 230 | 320 | 300 |
| Fixed overheads absorbed | 120 | 150 | 100 |
| Profit | 300 | 330 | 200 |
| Maximum demand (cartons) | 30,000 | 20,000 | 25,000 |

The fixed overheads, absorbed above on budgeted demand, total ₹91,00,000 for the quarter and do not change with the mix. A poor Assam crop limits tea dust to 28,000 kg for the quarter. Tapri has a contract to supply 5,000 cartons of Elaichi to a hotel chain.

**Required:**

(i) Rank the products for the use of tea dust.

(ii) Determine the optimum mix and the profit for the quarter.

(iii) Calculate the contribution the hotel contract costs Tapri this quarter.

(iv) A broker offers 4,000 kg more tea dust at ₹650 per kg, all or nothing. Advise Tapri.

::: answer Show the working
**(i) Ranking.** The absorbed fixed overhead is added back: contribution = price − tea dust − other variable costs.

| Particulars | Masala | Elaichi | Ginger |
|---|---:|---:|---:|
| Contribution per carton (₹) | 420 | 480 | 300 |
| Tea dust per carton (kg) | 0.5 | 0.8 | 0.4 |
| **Contribution per kg (₹)** | **840** | **600** | **750** |
| Rank | I | III | II |

By profit per carton Elaichi looks best (₹330); per kg of the scarce tea dust it is last.

**(ii) Optimum mix.** Tea dust for the full demand = 15,000 + 16,000 + 10,000 = 41,000 kg, against 28,000 kg available.

| Product | Cartons | Tea dust (kg) | Kg left |
|---|---:|---:|---:|
| Elaichi (contract) | 5,000 | 4,000 | 24,000 |
| Masala (rank I, full demand) | 30,000 | 15,000 | 9,000 |
| Ginger (rank II, balance 9,000 ÷ 0.4) | 22,500 | 9,000 | nil |

| Product | Cartons | Contribution (₹) |
|---|---:|---:|
| Masala | 30,000 | 1,26,00,000 |
| Ginger | 22,500 | 67,50,000 |
| Elaichi | 5,000 | 24,00,000 |
| **Total contribution** | | **2,17,50,000** |
| Less: Fixed overheads | | 91,00,000 |
| **Profit** | | **1,26,50,000** |

**(iii) Cost of the contract.** Without it, Ginger would get 10,000 kg (all 25,000 cartons) and Elaichi the last 3,000 kg (3,750 cartons): contribution ₹2,19,00,000. The contract costs **₹1,50,000**: 1,000 kg moved from Ginger (₹750 a kg) to Elaichi (₹600 a kg).

**(iv) The broker's offer.** The first 1,000 kg complete Ginger's demand (2,500 cartons × ₹300 = ₹7,50,000); the other 3,000 kg make 3,750 more cartons of Elaichi (₹18,00,000). Extra contribution = ₹25,50,000, already counting tea dust at ₹500 a kg. The premium is 4,000 × ₹150 = ₹6,00,000, so profit rises by **₹19,50,000**: accept the offer. Before any tea dust cost the 4,000 kg earn ₹25,50,000 + 4,000 × ₹500 = ₹45,50,000, so the lot is worth buying at any price up to ₹45,50,000 ÷ 4,000 = ₹1,137.50 a kg.
:::
::::

::: lab key-factor {"mode":"mix","kfName":"hectares","avail":210,"fixed":2145000,"kfProducts":[["Wheat",40000,28000,1,160,100],["Rice",20000,6500,1,50,40],["Maize",25000,15000,1,60,10]]}
Minimum commitments first: step through an ICAI farm (November 2022, old scheme) where every crop gets its minimum hectares before the rest goes in rank order.
:::

:::: example A ₹8,50,000 bank limit for the Diwali counters
Tapri's festive counters resell four bought-in gift items. The bank has sanctioned a seasonal limit of ₹8,50,000, which can be used only to pay suppliers for the goods; packing and other variable costs are paid out of daily collections. Every other resource is plentiful.

| Item (per unit) | Selling price (₹) | Purchase cost (₹) | Other variable cost (₹) | Maximum demand (units) |
|---|---:|---:|---:|---:|
| Dry-fruit box | 1,200 | 800 | 40 | 600 |
| Kulhad gift set | 600 | 250 | 50 | 1,000 |
| Honey jar | 450 | 300 | 30 | 800 |
| Masala tin | 300 | 120 | 30 | 1,500 |

Fixed costs of the counters for the season are ₹4,00,000.

**Required:**

(i) Identify the key factor and rank the items.

(ii) Determine the quantities to buy and the profit for the season.

(iii) The dry-fruit supplier offers to take half the price of each box on 60 days' credit, paid out of collections after the season. Revise the plan and state the gain.

::: answer Show the working
**(i) Key factor.** Purchases for the full demand = 600 × ₹800 + 1,000 × ₹250 + 800 × ₹300 + 1,500 × ₹120 = ₹11,50,000, against a limit of ₹8,50,000. The scarce resource is money (availability of funds, one of the Study Material's supply-side limiting factors, SM 14.36): rank by contribution per rupee of the bank limit used.

| Particulars | Dry-fruit box | Kulhad gift set | Honey jar | Masala tin |
|---|---:|---:|---:|---:|
| Contribution per unit (₹) | 360 | 300 | 120 | 150 |
| Bank limit used per unit (₹) | 800 | 250 | 300 | 120 |
| **Contribution per ₹ of limit** | **0.45** | **1.20** | **0.40** | **1.25** |
| Rank | III | II | IV | I |

The dry-fruit box earns the most per unit but ties up ₹800 of scarce funds for every box.

**(ii) Purchase plan**

| Item (rank order) | Units | Limit used (₹) | Limit left (₹) | Contribution (₹) |
|---|---:|---:|---:|---:|
| Masala tin (full demand) | 1,500 | 1,80,000 | 6,70,000 | 2,25,000 |
| Kulhad gift set (full demand) | 1,000 | 2,50,000 | 4,20,000 | 3,00,000 |
| Dry-fruit box (balance, ₹4,20,000 ÷ ₹800) | 525 | 4,20,000 | nil | 1,89,000 |
| Honey jar | nil | — | — | — |
| **Total contribution** | | | | **7,14,000** |
| Less: Fixed costs | | | | 4,00,000 |
| **Profit** | | | | **3,14,000** |

**(iii) With credit on half of each dry-fruit box.** Each box now uses only ₹400 of the limit: contribution per rupee = ₹360 ÷ ₹400 = 0.90. The ranking becomes masala tin (1.25), kulhad gift set (1.20), dry-fruit box (0.90), honey jar (0.40).

| Item | Units | Limit used (₹) | Contribution (₹) |
|---|---:|---:|---:|
| Masala tin | 1,500 | 1,80,000 | 2,25,000 |
| Kulhad gift set | 1,000 | 2,50,000 | 3,00,000 |
| Dry-fruit box (full demand) | 600 | 2,40,000 | 2,16,000 |
| Honey jar (balance, ₹1,80,000 ÷ ₹300) | 600 | 1,80,000 | 72,000 |
| **Total** | | **8,50,000** | **8,13,000** |

Profit = ₹8,13,000 − ₹4,00,000 = ₹4,13,000: the credit offer adds **₹99,000** to profit, because it releases ₹2,10,000 of the bank limit (75 more boxes need ₹30,000; the other ₹1,80,000 buys 600 honey jars). Accept the offer, provided the supplier charges nothing extra for the credit.
:::
::::

## Under the hood

### Two scarce resources at once

ICAI's Illustration 12 (SM 14.39–14.41) has two machines and an alloy, all limited, and one part to choose. For each part, the number it can make is the **minimum** of what each resource allows; the part with the higher total contribution on that number wins. When several products share two scarce resources, rank on the one that binds, then check that the chosen mix also fits the other. If it does not, the simple ranking is not enough.

### Only one product can be chosen

When the plant can make only one product in a year, compare total contributions (units = lower of capacity and demand), and the **opportunity cost** of each choice is the highest contribution of the best rejected product (Illustration 10, SM 14.36–14.37). Example: if A can earn ₹9,000, B ₹7,000 and C ₹5,000, choosing A costs ₹7,000 of forgone contribution; choosing B or C costs ₹9,000.

### Product-specific fixed costs

The ranking ignores fixed costs. But if a product drops out of the mix altogether and some fixed cost exists only for it, that cost is saved: check whether the product's small allocation still covers its own fixed cost. The keep-or-drop test is in [[cma.mc.decisions|short-term decisions]]; ICAI's September 2025 answer deducts each product's own fixed overhead in the profit statement, and September 2026 Q1(a) turns on exactly this test.

### The same idea in budgets

The **key budget factor** is the factor that sets a limit to the total activity, such as non-availability of power or lack of demand; preparing a budget includes identifying it and estimating its influence on production and sales (SM 15.16): see [[cma.bud.basics|budgets and the key factor]].

## Exam angle

::: exam Where the limiting factor appeared
In the ICAI documents read for this lesson it drove the answer in eight:

- **September 2026 Q1(a), 7 marks**: two products share a capacity of 770 units "put together", each has its own fixed expenses "incurred only if" it is made, and other fixed expenses continue anyway: "Calculate the optimum profit for the year in rupees giving the product mix (in units)." Each unit uses one unit of capacity, so contribution per unit ranks; then check that the product given the leftover capacity still covers its own fixed expenses.
- **September 2025 Q3(b), 6 marks**: "Determine the optimum product mix, considering material as the limiting factor, to generate maximum profit and calculate the maximum profit." Kg per unit came from the material cost at ₹20 per kg.
- **RTP September 2025 Q16**: machine hours fully used; the "total costs" per unit included fixed overheads absorbed per machine hour, to be added back; then a new product priced to replace the weaker one.
- **MTP Series I for September 2025 Q4(a), 6 marks**: make in-house or outsource three components with labour limited to 4,000 hours; rank by saving per labour hour, and buy outright the one cheaper outside.
- **MTP Series I for May 2026 Q4(a)(ii)**: capacity cut to 10,000 units, so a special order displaces regular sales (see [[cma.mc.decisions|short-term decisions]]).
- **Old scheme**: May 2023 Q4(c), 5 marks (machine hours hidden in "variable overheads ₹4 per machine hour"); May 2022 Q3(a), 10 marks (labour hours, and "production of either garment must be at least 25% of the production of the other"); MTP Series II for November 2023 Q5(b), 10 marks (best product mix with bought-in prices; one product not available outside).
:::

::: exam The wording traps
- Quantities hidden in rupees: "variable overheads ₹40", absorbed at ₹4 per machine hour, is 10 hours, not 40.
- "Total cost" or "profit" per unit that includes absorbed fixed overheads: add them back before ranking.
- "Maximum sales potential" or "demand": a cap, so rank I rarely takes all the hours.
- A fixed ratio ("at least 25% of the other") or a contract: allocate it first, then rank.
- Fixed expenses "incurred only if" a product is made: compare the profit with and without that product before settling the mix.
- Two resources given: test each against the full demand; only the one that falls short is the key factor.
:::

::: trick Divide by what is short
Rank on contribution ÷ (quantity of the scarce input per unit); for make-or-buy, on saving ÷ (scarce input per unit). Conditions: one binding resource, constant price and variable cost per unit, and known demand caps.
:::

## Answer frame

### "What is a limiting factor?"

1. Definition in ICAI's words: anything which limits the activity of an entity; it determines the level of sale and production, hence key factor.
2. Supply side: men, materials, machine, money; demand side: demand, nature of product, regulatory and environmental requirements.
3. Management's objective: optimise the key resource to the maximum possible extent.
4. Decision rule: rank products by contribution per unit of the key factor (profitability = contribution ÷ key factor).
5. A two-line example with figures.

### The numerical: three answers to "Determine the optimum mix"

::: cols
**Loses marks**

"Rank by contribution per pack: rolls, kachoris, samosas; profit ₹3,25,000."

Ranked per pack, not per fryer hour: the arithmetic is right, the mix is wrong, and only the contribution line earns marks.
---
**Passes**

Ranking per fryer hour, then "10,000 samosas, 5,000 kachoris, 4,000 rolls; profit ₹3,65,000."

Right answer, but the hours per pack appear from nowhere and there is no allocation table: a slip anywhere would leave no method marks.
---
**Full marks**

Working note on hours per pack; ranking statement per fryer hour; the check that the hours fall short; allocation in rank order within demand; profit statement with fixed costs deducted.
:::

## Common mistakes

::: mistake Hall of Shame: the paneer roll that hogged the fryer
Ranking by contribution per pack (or by P/V ratio) when a resource is scarce. Kesar's order lost ₹40,000 a month. **Fix:** divide each contribution by the scarce quantity it uses, and rank on that.
:::

::: mistake Profit per unit dressed up as contribution
RTP-style data give "total cost" or "profit" per unit after fixed overhead absorption. Ranking on ₹330 profit put Elaichi first; on contribution per kg it was last. **Fix:** strip out absorbed fixed overheads; the total fixed cost is deducted once, at the end.
:::

::: mistake The rank I product that ate the whole factory
Giving all the hours to the top product when it can sell only 10,000 packs. **Fix:** allocate up to each product's maximum demand, then pass the balance down the ranking.
:::

::: mistake Rupees read as hours
"Variable overheads ₹12 per pack, absorbed at ₹24 per fryer hour" is half an hour, not 12 hours. **Fix:** divide the rupees by the rate per hour (or per kg) before dividing the contribution.
:::

## Practice

::: quiz Check yourself
Q: Product A has a contribution of ₹36 a unit and needs 3 machine hours; product B has ₹30 and needs 2 hours. Demand is 2,000 units of A and 3,000 of B, and 11,400 machine hours are available. What is the maximum total contribution (₹)?
= 154800
> Per hour: A ₹12, B ₹15, so B first: 3,000 units use 6,000 hours (₹90,000). The other 5,400 hours make 1,800 units of A (₹64,800). Total ₹1,54,800.

Q: Case scenario. Ritu's distributor will take Tapri's products only up to a total invoice value of ₹50 lakh a month; every resource inside the factory is plentiful. Kesar asks which measure should rank the products. Which is correct?
- [ ] Contribution per unit
- [x] P/V ratio
- [ ] Contribution per machine hour
- [ ] Profit per unit after absorbed fixed overheads
> The scarce thing is sales value, so profitability = contribution ÷ key factor becomes contribution per rupee of sales: the P/V ratio. Machine hours are not short, and absorbed profit is never a ranking measure.

Q: A kachori pack has variable overheads of ₹18, absorbed at ₹30 per fryer hour, and a contribution of ₹48. What is its contribution per fryer hour (₹)?
= 80
> Fryer hours per pack = ₹18 ÷ ₹30 = 0.6 hours; contribution per hour = ₹48 ÷ 0.6 = ₹80. Dividing ₹48 by 18 "hours" is the classic slip.

Q: Which of these does the Study Material list as supply-side limiting factors? Select all that apply.
- [x] Availability of skilled employees
- [x] Machine capacity
- [ ] Demand for the product
- [x] Availability of funds
- [ ] Regulatory and environmental requirements
> Supply side: men, materials, machine, money. Demand for the product and regulatory or environmental requirements are on the demand side (SM 14.36).

Q: Two products both have spare demand. X earns ₹50 a unit using 2 kg of a scarce chemical; Y earns ₹40 a unit using 1 kg. Kesar says "X first, it earns more." What should Ritu reply?
- [ ] Agree: X has the higher contribution per unit
- [ ] Make equal quantities of both
- [x] Y first: it earns ₹40 a kg against X's ₹25 a kg
- [ ] Decide on the products' fixed overheads
> With the chemical short, the ranking is per kg: Y ₹40, X ₹25. Fixed overheads do not change with the mix.
:::

## Recap

- Limiting (key) factor: anything which limits the activity of an entity; it decides the level of sale and production (SM 14.36).
- Supply side: men, materials, machine, money; demand side: demand, nature of product, regulatory and environmental requirements.
- Profitability = contribution ÷ key factor: rank by contribution per unit of the scarce resource.
- First check the resource really falls short of the full demand; if not, make everything with a positive contribution.
- Derive hidden quantities: hours = VOH ÷ rate per hour; kg = material cost ÷ price per kg.
- Allocate commitments first, then rank order up to each product's demand; the last product takes the balance.
- Fixed costs: ignored in ranking, deducted once in the profit statement; absorbed fixed overhead per unit is added back. A product's own fixed cost is saved only if it drops out altogether.
- Make or buy with a scarce resource: rank by saving per unit of the resource; buy outright anything cheaper outside. (Marks per minute, not marks.)

## Flashcards

Q:: ICAI's definition of limiting factor?
A:: Limiting factor is anything which limits the activity of an entity. The factor is a key to determine the level of sale and production, thus it is also known as key factor.

Q:: Supply-side limiting factors listed by the Study Material?
A:: Men (employees), materials (raw material or supplies), machine (capacity) and money (availability of fund or budget).

Q:: Demand-side limiting factors listed by the Study Material?
A:: Demand for the product, and other factors like nature of product, regulatory and environmental requirements.

Q:: ICAI formula for profitability with a key factor?
A:: Profitability = Contribution ÷ Key factor, i.e. contribution per unit of the limiting factor.

Q:: With a scarce resource, how are products ranked?
A:: By contribution per unit of the limiting factor (per hour, per kg), highest first; not by contribution or profit per unit of product.

Q:: Ranking measure when total sales value is the key factor?
A:: P/V ratio (contribution per rupee of sales).

Q:: How are machine hours per unit found when only variable overhead per unit and the rate per machine hour are given?
A:: Hours per unit = variable overhead per unit ÷ variable overhead rate per machine hour.

Q:: In what order is a limited resource allocated?
A:: Minimum commitments first, then products in rank order up to each one's maximum demand; the last product gets the balance.

Q:: Make or buy with scarce machine hours: ranking measure?
A:: Saving per machine hour = (buy price − variable cost of making) ÷ machine hours per unit; items cheaper to buy are bought outright.

Q:: Which limitation of marginal costing concerns key factors?
A:: Dependence on key factors: contribution of a product itself is not a guide for optimum profitability unless it is linked with the key factor.
