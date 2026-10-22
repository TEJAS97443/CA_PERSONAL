---
id: cma.unit.unit
title: Unit costing
minutes: 25
needs: cma.sheet.mfg
tags: unit costing, single output costing, output costing, cost per unit, semi-variable cost, average selling price, defective work
labs:
summary: Where every unit of output is identical, cost is collected element-wise for a period and divided by the units produced; the statement of cost per unit then prices any output level.
---

## In plain words

### Ten lakh identical kulhads

Tapri's kulhad unit at Khurja turns out clay cups by the lakh, and every kulhad is the same: same clay, same mould, same hours in the kiln.

> **Kesar:** Ritu, I want a cost card for every kulhad. Each one is special to me.
> **Ritu:** Per unit, please, but one unit is like the next. Add up the month's clay, wages and kiln, divide by kulhads made, and every cup has its cost.

That is **unit costing**. When the output is identical, and each unit needs identical cost, there is nothing to trace to one cup rather than another. So costs are collected element by element for a period (a month, four weeks), arranged in a statement of cost, and divided by the number of units produced. Cement, paper, steel, mining and breweries work this way: nobody keeps a separate cost card for one bag of cement.

The interesting questions come next. What happens when some cups crack in the kiln? And what price should Tapri quote if next month's output is higher, when the rent and the supervisor's salary do not rise with it? For that Ritu splits the costs by behaviour, because a cost per unit is only true at the output it was worked out for.

::: analogy The sugarcane-juice cart
The juice-wallah outside the station sells only one thing: a glass of sugarcane juice. At night he adds up the cane, ice, lemons, the helper's wage and the cart's rent, and divides by glasses sold. He does not need a card for each glass. But if he expects twice the crowd during Navratri, he knows the cane and ice will double and the cart's rent will not, so his cost per glass will fall.
:::

::: key
Unit costing applies where the output is identical and each unit requires identical cost: cost per unit = total cost of production ÷ number of units produced. To price a different level of output, keep variable cost per unit, keep fixed cost in total, and split semi-variable costs first.
:::

## How it works

Industries fall into two groups (SM 8.2): those doing **job work** to customers' specifications, costed by job, contract and batch costing; and **continuous or process-type** industries making uniform products to standard specifications, costed by process costing, single output costing and operating costing.

::: definition Unit costing
Unit costing is that method of costing where the output produced is identical and each unit of output requires identical cost. Unit costing is synonymously known as single or output costing, but these are sub-division of unit costing method. (SM 8.3)
:::

It is followed by industries "which produce single output or few variants of a single output" (SM 8.3): **paper, cement, steel works, mining, breweries** (SM 8.3).

### How the costs are collected

::: diagram Where each element of cost is collected from (SM 8.3–8.4)
{"type": "layers", "layers": [
  {"label": "Materials", "note": "material requisition notes, accumulated for the period", "right": "cost sheet"},
  {"label": "Direct employee cost", "note": "job time cards, idle time cards, valued at rates", "right": "cost sheet"},
  {"label": "Indirect employee cost", "note": "payroll, posted to standing order numbers", "right": "overheads"},
  {"label": "Overheads", "note": "standing order numbers; apportioned to departments", "right": "absorbed"},
  {"label": "Cost per unit", "note": "total cost ÷ units produced", "right": "statement"}],
 "caption": "Top to bottom in the order the costs are gathered; service department overheads are transferred to production departments before absorption."}
:::

1. **Materials**: the cost of materials issued for production is collected from material requisition notes and accumulated for a period or volume of activity (SM 8.3).
2. **Employee cost**: direct employee cost is collected from job time cards or sheets; the time booked and the idle time cards are valued at appropriate rates. Indirect employee cost comes from the payroll books and is posted to standing order or expense code numbers (SM 8.4).
3. **Overheads** are collected under standing order numbers (selling and distribution against cost account numbers), apportioned to service and production departments, the service departments' costs transferred to production departments, and the production overheads applied to products on a realistic basis: machine hour, labour hour, percentage of direct wages, percentage of direct materials (SM 8.4). The absorption bases are in [[cma.oh.absorb|absorption rates and the machine hour rate]].
4. **Statement of cost per unit**: the cost sheet with a per-unit column, prime cost to cost of sales ([[cma.sheet.mfg|cost sheet for a manufacturer]]).

::: formula Cost per unit
$$\text{Cost per unit} = \frac{\text{Total cost of production}}{\text{Number of units produced}}$$
(SM 8.3)
:::

### When some units come out defective

ICAI's rule for spoiled and defective work in unit costing (SM 8.4):

::: diagram Spoiled and defective work in unit costing
{"type": "flow", "w": 430, "nodes": [
  {"id": "s", "kind": "start", "label": "Defective units"},
  {"id": "a", "kind": "decision", "label": "Abnormal\nreasons?"},
  {"id": "x", "kind": "end", "label": "Costing P&L", "color": "bad"},
  {"id": "n", "kind": "decision", "label": "Within\nnormal limit?"},
  {"id": "o", "kind": "end", "label": "Entire output", "color": "ok"},
  {"id": "e", "kind": "end", "label": "Excess to\nCosting P&L", "color": "c"}],
 "edges": [["s", "a"], ["a", "x", "yes"], ["a", "n", "no"], ["n", "o", "yes"], ["n", "e", "no"]],
 "caption": "Normal defectives within the limit are charged to the entire output, raising the cost of the good units; abnormal ones, and the excess over the normal limit, are written off in the Costing Profit and Loss Account (Costing P&L)."}
:::

| Circumstances | Treatment (SM 8.4) |
|---|---|
| Loss due to normal reasons, within the established normal rate | Cost of rectification or loss charged to the entire output |
| Normal reasons, but defectives substantially exceed the normal limit | Cost of rectification or loss beyond normal limits written off in Costing Profit and Loss Account |
| Loss due to abnormal reasons | Treated as abnormal cost; written off as loss in Costing Profit and Loss Account |

The wider treatment of spoilage and defectives is in [[cma.mat.losses|waste, scrap, spoilage and defectives]].

### Pricing a different level of output

A unit cost is only true at its own output. To find the cost and price at another level (SM Illustration 2, 8.6–8.7):

::: steps
1. **Variable costs** (direct material, direct labour) stay the same per unit: divide any week's cost by its output.
2. **Semi-variable costs** rise with output but not in proportion: variable rate = change in cost ÷ change in output; fixed part = total cost − output × variable rate ([[cma.intro.behaviour|cost behaviour]]).
3. **Fixed costs** stay the same in total at the new level.
4. **Price**: profit as a percentage of selling price is converted to a percentage of cost (20% of sales = 25% of cost).
:::

For a whole year's **production programme** (some months at 50% capacity, others at 80%), cost each period at its own level, including any **stepped** semi-variable cost ("₹4,00,000 for every 25% increase in capacity or part thereof"), add the desired profit to the total, and divide by total units for the **average selling price** (SM 8.18–8.19, 8.23).

::: formula Splitting a semi-variable cost
$$\text{Variable cost per unit} = \frac{\text{Change in cost}}{\text{Change in output}} \qquad \text{Fixed part} = \text{Total cost} - \text{Output} \times \text{Variable rate}$$
:::

::: formula Average selling price for a production programme
$$\text{Average selling price} = \frac{\text{Total cost of all periods} + \text{Desired profit}}{\text{Total units of all periods}}$$
:::

## Formats and formulas

ICAI's statement of cost per unit (SM Illustration 1, 8.5). *Reproduce it from memory.*

| Statement of cost per unit (units produced: …) | Cost per unit (₹) | Amount (₹) |
|---|---:|---:|
| Raw materials consumed | xxx | xxx |
| Direct wages | xxx | xxx |
| **Prime cost** | **xxx** | **xxx** |
| Add: Manufacturing overheads | xxx | xxx |
| **Works cost** | **xxx** | **xxx** |
| Add: Office overheads | xxx | xxx |
| **Cost of goods sold** | **xxx** | **xxx** |
| Add: Selling overheads | xxx | xxx |
| **Cost of sales / total cost** | **xxx** | **xxx** |
| Add: Profit (balancing figure) | xxx | xxx |
| **Sales** | **xxx** | **xxx** |

ICAI labels the line after office overheads "cost of goods sold": in SM Illustration 1 all 10,000 units are produced and sold, so it is also the cost of production. With stock, show cost of production first and adjust finished goods as in the full cost sheet.

## Worked examples

:::: example Khurja kulhads: a month's cost per cup, with cracks
In July 2026 Tapri's kulhad unit made 2,00,000 kulhads. Firing cracks are normal up to 2% of kulhads made; this month 5,000 cracked, and cracked kulhads have no value. Clay and colour consumed cost ₹2,40,000, direct wages ₹1,80,000, the kiln ran 600 hours at a rate of ₹250 an hour, and the production office cost ₹57,200. All the good kulhads were sold at ₹4.50 each, and selling overheads are ₹0.40 a kulhad sold.

**Required:**

(i) Prepare a statement of cost and find the cost per good kulhad.

(ii) Show the treatment of the cracked kulhads.

(iii) Calculate the cost of sales and the profit, in total and per kulhad sold.

::: answer Show the working
**Working note.** Normal cracks = 2% × 2,00,000 = 4,000; abnormal = 5,000 − 4,000 = 1,000. Normal output = 2,00,000 − 4,000 = 1,96,000 kulhads (the 1,95,000 good ones and the 1,000 abnormal ones). The cost of the normal cracks is charged to the entire output (SM 8.4), so cost per unit = cost of production ÷ 1,96,000.

**(i) Statement of cost, July 2026**

| Particulars | Amount (₹) |
|---|---:|
| Clay and colour consumed | 2,40,000 |
| Direct wages | 1,80,000 |
| **Prime cost** | **4,20,000** |
| Kiln overheads (600 hours × ₹250) | 1,50,000 |
| **Works cost** | **5,70,000** |
| Production office overheads | 57,200 |
| **Cost of production (2,00,000 made)** | **6,27,200** |
| Cost per kulhad of normal output (₹6,27,200 ÷ 1,96,000) | ₹3.20 |

**(ii) Cracked kulhads.** The 4,000 normal cracks carry no separate charge: their cost is in the ₹3.20. The 1,000 abnormal cracks, 1,000 × ₹3.20 = **₹3,200**, are written off to the Costing Profit and Loss Account. Good kulhads carry 1,95,000 × ₹3.20 = **₹6,24,000**.

**(iii) Cost of sales and profit**

| Particulars | Total (₹) | Per kulhad (₹) |
|---|---:|---:|
| Cost of 1,95,000 good kulhads | 6,24,000 | 3.20 |
| Selling overheads (₹0.40) | 78,000 | 0.40 |
| **Cost of sales** | **7,02,000** | **3.60** |
| Profit | 1,75,500 | 0.90 |
| **Sales (₹4.50)** | **8,77,500** | **4.50** |

Spreading the cost over all 2,00,000 kulhads made would give ₹3.136 and hide the cracks; spreading it over the 1,95,000 good ones alone (₹3.216) would push the abnormal cracks into stock and sales. Valuing the abnormal ones at the cost of normal output is the process-costing convention ([[cma.proc.accounts|normal and abnormal loss]]).
:::
::::

::::: example Dewas premix plant: one price for a year of shifts
Tapri's Dewas plant makes a single product, a 1 kg box of chai premix, to order (nothing is made for stock). One shift can make at most 10,000 boxes a month, and a shift is either run for the whole month or not at all. The order book for 2026-27:

| Months | Boxes ordered a month |
|---|---:|
| April to September (6 months) | 10,000 |
| October to January (4 months) | 28,000 |
| February and March (2 months) | 18,000 |

Costs:

- Direct material ₹42 and direct labour (piece rate) ₹14 a box.
- Each shift run in a month costs ₹1,20,000 for that month (shift supervisor, canteen and shift allowance).
- Plant fixed overheads (rent, depreciation, plant manager) ₹36,00,000 a year.
- Power is semi-variable. The bill was ₹2,30,000 in a month when 10,000 boxes were made and ₹4,10,000 in a month when 25,000 boxes were made.

Kesar wants one selling price for the whole year that earns a profit of 20% on the selling price.

**Required:**

(i) Prepare a statement of cost for each part of the year and determine the average selling price per box.

(ii) Calculate the cost per box in each part of the year, and explain the difference.

:::: answer Show the working
**Working notes**

1. Boxes: 10,000 × 6 = 60,000; 28,000 × 4 = 1,12,000; 18,000 × 2 = 36,000. Total 2,08,000.
2. Shifts needed (a part shift cannot be run): April to September 10,000 ÷ 10,000 = 1 shift; October to January 28,000 ÷ 10,000 = 2.8, so 3 shifts; February and March 18,000 ÷ 10,000 = 1.8, so 2 shifts. Shift costs: ₹1,20,000 × 1 × 6 = ₹7,20,000; ₹1,20,000 × 3 × 4 = ₹14,40,000; ₹1,20,000 × 2 × 2 = ₹4,80,000.
3. Power: variable rate = (₹4,10,000 − ₹2,30,000) ÷ (25,000 − 10,000) = ₹12 a box; fixed part = ₹2,30,000 − 10,000 × ₹12 = ₹1,10,000 a month.
4. Plant fixed overheads are spread by months: 6/12, 4/12 and 2/12 of ₹36,00,000.

**(i) Statement of cost for 2026-27**

| Particulars | Apr–Sep (₹) | Oct–Jan (₹) | Feb–Mar (₹) |
|---|---:|---:|---:|
| Boxes | 60,000 | 1,12,000 | 36,000 |
| Direct material (₹42) | 25,20,000 | 47,04,000 | 15,12,000 |
| Direct labour (₹14) | 8,40,000 | 15,68,000 | 5,04,000 |
| Power: variable (₹12) | 7,20,000 | 13,44,000 | 4,32,000 |
| Power: fixed (WN 3) | 6,60,000 | 4,40,000 | 2,20,000 |
| Shift costs (WN 2) | 7,20,000 | 14,40,000 | 4,80,000 |
| Plant fixed overheads | 18,00,000 | 12,00,000 | 6,00,000 |
| **Total cost** | **72,60,000** | **1,06,96,000** | **37,48,000** |

| Particulars | Year (₹) |
|---|---:|
| Total cost (72,60,000 + 1,06,96,000 + 37,48,000) | 2,17,04,000 |
| Add: Profit (20% on selling price = 25% of cost) | 54,26,000 |
| **Sales required** | **2,71,30,000** |
| **Average selling price (÷ 2,08,000 boxes)** | **₹130.43** |

**(ii) Cost per box by period**

::: diagram Cost per box in each part of the year
{"type": "plot", "h": 280, "x": [0.4, 3.6], "y": [0, 140],
 "xticks": [[1, "Apr–Sep, 1 shift"], [2, "Oct–Jan, 3 shifts"], [3, "Feb–Mar, 2 shifts"]],
 "yticks": [[0, "0"], [20, "20"], [40, "40"], [60, "60"], [80, "80"], [100, "100"], [120, "120"], [140, "140"]],
 "ylabel": "cost per box (₹)", "legend": "none",
 "series": [{"label": "cost per box", "bars": true, "values": true, "color": "a",
   "pts": [[1, 121, "121.00"], [2, 95.5, "95.50"], [3, 104.11, "104.11"]]}],
 "caption": "₹72,60,000 ÷ 60,000; ₹1,06,96,000 ÷ 1,12,000; ₹37,48,000 ÷ 36,000. Variable cost is ₹68 a box throughout; the fixed costs per box fall as monthly output rises."}
:::

| Cost per box (₹) | Apr–Sep | Oct–Jan | Feb–Mar |
|---|---:|---:|---:|
| Variable (₹42 + ₹14 + ₹12) | 68.00 | 68.00 | 68.00 |
| Plant fixed and fixed power | 41.00 | 14.64 | 22.78 |
| Shift costs | 12.00 | 12.86 | 13.33 |
| **Total** | **121.00** | **95.50** | **104.11** |

Variable cost is ₹68 a box in every period. The plant's fixed overheads (₹3,00,000 a month) and the fixed part of power (₹1,10,000 a month) do not change with output, so they are spread over 10,000, 28,000 and 18,000 boxes a month and fall from ₹41.00 to ₹14.64 a box. Shift costs are fixed per shift, not per box: a full shift costs ₹12.00 a box, but October to January's third shift and February and March's second shift each make only 8,000 boxes, so the shift cost rises to ₹12.86 and ₹13.33 a box. No single period's cost is the year's cost, which is why the price is averaged over the whole programme.
::::
:::::

## Under the hood

### Why the semi-variable split uses two weeks only

In SM Illustration 2 the factory overheads for weeks 1 and 2 give ₹2,000 ÷ 400 = ₹5 a unit and a fixed ₹25,000; week 3 (1,800 units, ₹34,000) agrees (1,800 × ₹5 + ₹25,000). Any two points give the same split when the cost is truly linear; check a third if it is given.

### "Or part thereof" and capacity steps

A step charged "for every 25% increase in capacity or part thereof" is counted upwards: 50% to 80% is 30%, which is one full 25% step and part of another, so two steps (SM 8.23). Without "or part thereof", only completed steps count. Read the clause twice.

### Unit costing next to the other methods

Job and contract costing price unique orders ([[cma.job.job|job costing]]); process costing follows uniform output through stages with losses and work-in-process ([[cma.proc.accounts|process accounts]]); operating costing does the same for services ([[cma.sheet.service|the service cost sheet]]).

## Exam angle

::: exam Where unit costing appeared, May 2024 to September 2026 (and the old scheme)
In the documents read for this lesson:

- **Theory, 4 to 5 marks:** "Describe Unit Costing and Batch Costing. Give three examples of industries for each method where these are used": May 2024 Q6(c) (4 marks); the same with "explain the costing procedure in batch costing": MTP Series II May 2026 Q6(b) (5 marks). Old scheme: "Describe Unit Costing. What kind of industries follow this method of costing?": MTP Series I November 2022 Q6(c).
- **Average selling price for a production programme, 5 to 10 marks (old scheme):** January 2021 Q3(b) (10 marks: 50%, 75% and 100% capacity in parts of the year, a semi-variable cost rising in steps, then whether to accept offers of ₹130 and ₹129 against the computed ₹128.45); MTP Series II December 2021 Q1(c) and MTP Series II November 2022 Q2(b) (10 marks), both "determine the average selling price at which each unit should be quoted".
- **Single-output cost statements** in the new scheme are set as cost sheet questions, such as May 2026 Q2(a) (cotton yarn, 1,500 kg): see [[cma.sheet.mfg|the manufacturer's cost sheet]].
:::

::: exam The traps ICAI set
- Capacity given at one level ("1,80,000 units at 60% capacity"): find 100% first (3,00,000), then each period's units.
- Semi-variable "for every 20% increase in the capacity or part thereof": 50% to 75% is two steps, not one (MTP Series II December 2021 and November 2022).
- Fixed costs are annual: take the months' share, not the full year, for each period.
:::

::: trick Units in a period
Units = annual capacity at 100% × months ÷ 12 × capacity %. Condition: the capacity is stated per annum; convert a monthly or a partial-capacity figure to 100% per annum first.
:::

## Answer frame

**Describe unit costing and batch costing, with three examples of industries for each** (May 2024 Q6(c), 4 marks). ICAI's suggested answer:

1. **Unit costing**: the method of costing where the output produced is identical and each unit of output requires identical cost; costs are collected and analysed element-wise, and cost per unit = total cost ÷ number of units produced. Used in paper, cement, steel works, mining, breweries.
2. **Batch costing**: a type of specific order costing where articles are manufactured in predetermined lots, known as batches; cost per unit in a batch = total cost of the batch ÷ units produced in that batch. ICAI's answer named pharmaceutical or drug industries, readymade garments and electronic parts of TV and radio sets ([[cma.unit.batch|batch costing]]).

**For an average-price question**, the marks are in: a working note for units by period, a working note for each step of the semi-variable cost, a statement of cost by period with a total column, profit added, and the average price with its division shown; then the advice ("accept, as ₹130 is above the required ₹128.45").

## Common mistakes

::: mistake Hall of Shame: one cost per unit for every output
Kesar's ₹121 a box (the one-shift cost of April to September) used for the whole year makes the price ₹121 × 1.25 = ₹151.25 instead of ₹130.43, and loses orders to competitors. **Fix:** at each level, take fixed costs in total; only variable costs stay the same per unit.
:::

::: mistake The semi-variable cost treated as fixed (or as variable)
Factory overheads of ₹31,000 at 1,200 units taken as ₹25.83 a unit at 2,000 units gives ₹51,667 instead of ₹35,000 (SM Illustration 2). **Fix:** split it: ₹5 a unit plus ₹25,000.
:::

::: mistake Annual fixed cost charged in full to each period
Putting the whole ₹36,00,000 of plant fixed overheads into each part of the year. **Fix:** months ÷ 12 of the annual figure for each period; a cost given per month (the shift cost, the fixed part of power) is multiplied by the months instead.
:::

::: mistake Abnormal defectives left in the cost of good units
Dividing the whole cost by the 1,95,000 good kulhads (₹3.216) makes the customers pay for the abnormal cracks. **Fix:** cost of abnormal defectives goes to the Costing Profit and Loss Account (SM 8.4).
:::

## Practice

::: quiz Check yourself
Q: A cement plant's statement of cost for April shows a total cost of production of ₹1,26,00,000 for 42,000 tonnes produced, with no defective output. What is the cost per tonne, in rupees?
= 300
> Cost per unit = total cost of production ÷ units produced = ₹1,26,00,000 ÷ 42,000 = ₹300 a tonne (SM 8.3).

Q: Factory overheads were ₹48,000 at 4,000 units and ₹54,000 at 6,000 units. What would they be at 7,000 units, in rupees?
= 57000
> Variable rate = ₹6,000 ÷ 2,000 = ₹3 a unit; fixed = ₹48,000 − 4,000 × ₹3 = ₹36,000. At 7,000 units: ₹36,000 + ₹21,000 = ₹57,000.

Q: Case scenario. A steel re-rolling mill, a cement plant and a brewery each make a single standard product in continuous runs. A furniture maker builds each piece to the customer's drawing. Ritu must recommend a costing method for the first three. Which is correct?
- [ ] Job costing, because each production run is a separate order
- [x] Unit (single or output) costing, because the output is identical and each unit requires identical cost
- [ ] Contract costing, because the plants are large
- [ ] Batch costing, because every product is made in lots to a customer's specification
> ICAI names paper, cement, steel works, mining and breweries for unit costing (SM 8.3). Job costing suits the furniture maker, whose pieces are unique.

Q: Semi-variable cost is ₹10,00,000 a year up to 50% capacity, plus ₹2,00,000 for every 20% increase in capacity or part thereof. What is it at 85% capacity?
- [ ] ₹13,50,000
- [ ] ₹12,00,000
- [x] ₹14,00,000
- [ ] ₹13,00,000
> 50% to 85% is 35%: one full 20% step and part of another, so two steps: ₹10,00,000 + 2 × ₹2,00,000 = ₹14,00,000. Counting only completed steps gives ₹12,00,000.

Q: In unit costing, which treatments of spoiled and defective work are correct? Select all that apply.
- [x] Normal defectives within the established rate: cost charged to the entire output
- [x] Defectives beyond the normal limit: the excess written off to Costing Profit and Loss Account
- [ ] Abnormal defectives: cost charged to the entire output
- [x] Loss due to abnormal reasons: treated as abnormal cost and written off to Costing Profit and Loss Account
> SM 8.4: normal within limits to the entire output; the excess beyond normal limits and all losses due to abnormal reasons to Costing Profit and Loss Account.
:::

## Recap

- Unit costing: output identical, each unit requires identical cost; also called single or output costing (SM 8.3).
- Cost per unit = total cost of production ÷ number of units produced.
- Industries: paper, cement, steel works, mining, breweries.
- Costs collected element-wise: materials from requisition notes, labour from time cards, overheads under standing order numbers, apportioned and absorbed (SM 8.3–8.4).
- Defectives: normal within limit to the entire output; excess and abnormal to Costing Profit and Loss Account (SM 8.4).
- New output level: variable per unit same, fixed in total same, semi-variable split by change in cost ÷ change in output.
- Production programme: cost each period at its own capacity (steps "or part thereof" round up), add profit, divide by total units.
- One juice cart, one product, one division.

## Flashcards

Q:: ICAI's definition of unit costing?
A:: The method of costing where the output produced is identical and each unit of output requires identical cost; also known as single or output costing.

Q:: Formula for cost per unit in unit costing?
A:: Total cost of production ÷ number of units produced.

Q:: Five industries ICAI names for unit costing?
A:: Paper, cement, steel works, mining, breweries.

Q:: Methods of costing for job-work industries and for continuous or process industries (SM 8.2)?
A:: Job work: job, contract and batch costing. Continuous or process type: process costing, single output costing, operating costing.

Q:: Unit costing: treatment of normal defectives within the established rate?
A:: The cost of rectification or loss is charged to the entire output.

Q:: Unit costing: treatment of defectives substantially exceeding normal limits, and of losses due to abnormal reasons?
A:: The cost beyond normal limits, and the whole loss from abnormal reasons, is written off in the Costing Profit and Loss Account.

Q:: Source documents for collecting material and labour cost in unit costing?
A:: Material requisition notes for materials; job time cards or sheets and idle time cards for direct labour; payroll books for indirect labour.

Q:: How do you split a semi-variable cost from two output levels?
A:: Variable rate = change in cost ÷ change in output; fixed part = total cost − output × variable rate.

Q:: Average selling price for a production programme?
A:: (Total cost of all periods + desired profit) ÷ total units of all periods.

Q:: "Extra ₹50,000 for every 15% increase in capacity or part thereof": how many steps from 40% to 75%?
A:: Three (two full 15% steps and part of a third).
