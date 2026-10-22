---
id: cma.mc.basics
title: Marginal cost, contribution and the P/V ratio
minutes: 35
needs: cma.intro.behaviour
tags: marginal cost, marginal costing, contribution, P/V ratio, period cost, product cost, marginal cost equation
labs:
summary: What one more unit really costs, why fixed costs are charged to the period, how contribution pays fixed cost and profit, and the P/V ratio that links contribution to sales.
---

## In plain words

### The ₹95 jar that was never ₹95

Tapri's cookie unit in Indore bakes 20,000 jars a month and sells them at ₹100. Kesar has just seen the cost report.

> **Kesar:** Each jar costs us ₹95? Then a hotel order at ₹90 is a loss. Cancel it. And next month, when we make 30,000 jars, why does the report say ₹85? Did the butter get cheaper?
> **Ritu:** Per unit, please, but the right unit. Flour, butter, the jar and the gas cost ₹65 a jar. The other ₹30 is this month's ₹6,00,000 of rent, oven lease and salaries, spread over 20,000 jars. Spread it over 30,000 and it becomes ₹20. The butter did not change; the spreading did.

The ₹65 is the **marginal cost** of a jar: what the total cost goes up by when one more jar is made. It is the same at 20,000 jars and at 30,000. The ₹6,00,000 is a **fixed cost**: it is the cost of the month, not of any jar, and it stays the same however many jars are baked.

So every jar sold at ₹100 leaves ₹35 after its own marginal cost. That ₹35 is its **contribution**: it contributes first to paying the month's fixed cost and then to profit. Twenty thousand jars contribute ₹7,00,000, the fixed cost takes ₹6,00,000, and ₹1,00,000 is profit. And the hotel order at ₹90 is not a loss at all: if the oven has spare capacity and the fixed cost does not change, each of those jars still leaves ₹25.

Ritu has one more number: ₹35 out of ₹100 is 35%. Every rupee of cookie sales leaves 35 paise of contribution. That is the **P/V ratio**, and it gives the contribution from any sales figure without counting jars.

Keeping the two kinds of cost apart, valuing products and stock at variable cost only and charging fixed costs to the period, is **marginal costing**.

::: analogy The auto-rickshaw and the meter
An auto driver pays ₹600 a day to rent his auto whether he drives one passenger or thirty. Each ride costs him only the CNG it burns. Ask him what one more ride costs and he says "the gas", not "₹600 divided by today's rides", a number that changes every evening. The CNG is his marginal cost, fare minus CNG is the ride's contribution, and the rent is the day's fixed cost, which the rides pay off before he takes anything home.
:::

::: key
Marginal cost is what one more unit adds to total cost: its variable cost. Price minus marginal cost is contribution, which pays the period's fixed costs first and becomes profit only after they are covered. The P/V ratio is contribution as a share of sales.
:::

## How it works

### Five ideas, in the order ICAI builds them

::: steps
1. **Split every cost by behaviour.** Variable costs change with output; fixed costs stay the same in total; semi-variable costs are split into both parts first ([[cma.intro.behaviour|cost behaviour]]). Absorption costing classifies by function instead (factory, office, selling).
2. **Marginal cost** is the variable cost of one more unit: "the sum of prime cost and variable overhead" (SM 14.3). The cookie jar: ₹65, at any volume within the range.
3. **Product costs and period costs.** Only variable manufacturing costs are **product (inventoriable) costs**: they go into the product and the value of closing stock and WIP. All fixed costs, manufacturing or not, are **period costs**: charged to the profit and loss account of the period in which they are incurred.
4. **Contribution** = sales − all variable costs, manufacturing and non-manufacturing. It is a fund for fixed costs and profit: contribution − fixed cost = profit; if fixed cost is larger, the shortfall is the loss.
5. **P/V ratio** (contribution to sales ratio) = contribution ÷ sales × 100: the share of each rupee of sales left to cover fixed costs and profit. It also works from two periods: change in contribution (or in profit) ÷ change in sales × 100.
:::

::: diagram Where the cookie unit's ₹20,00,000 of sales goes
{"type": "tree", "root": {"label": "Sales\n₹20,00,000 (100%)", "color": "a", "children": [
  {"label": "Variable cost\n₹13,00,000 (65%)", "color": "mute"},
  {"label": "Contribution\n₹7,00,000 (35%)", "color": "b", "children": [
    {"label": "Fixed cost\n₹6,00,000", "color": "c"},
    {"label": "Profit\n₹1,00,000", "color": "g"}]}]},
 "caption": "20,000 jars at ₹100. Sales split into variable cost and contribution (the P/V ratio is the 35%); contribution splits into fixed cost and profit. This is the marginal cost equation S − V = C = F + P."}
:::

### Why the "cost per jar" kept changing

When each jar carries a share of fixed cost, its cost moves with volume: ₹95 at 20,000 jars, ₹85 at 30,000. ICAI's point (SM 14.6): costing can say an item costs ₹20 one day and ₹18 the next only because volume changed, which makes decisions difficult. Marginal cost does not move.

::: diagram Cookie jar: total cost per jar against marginal cost per jar
{"type": "plot", "h": 300, "x": [10000, 40000], "y": [0, 140],
 "xlabel": "jars made in a month", "ylabel": "cost per jar (₹)",
 "xticks": [[10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"]],
 "yticks": [[0, "0"], [35, "35"], [65, "65"], [100, "100"], [125, "125"]],
 "legend": "top-right",
 "series": [
  {"label": "total cost per jar", "fn": "65+600000/x", "color": "a"},
  {"label": "marginal cost per jar", "fn": "65", "color": "d"},
  {"label": "selling price", "fn": "100", "color": "mute", "dash": true}
 ],
 "points": [{"x": 20000, "y": 95, "label": "₹95", "pos": "below"}, {"x": 30000, "y": 85, "label": "₹85", "pos": "above"}],
 "caption": "Blue: total cost per jar (₹65 plus ₹6,00,000 spread over the jars) falls as volume rises. Orange: marginal cost stays at ₹65. The grey dashed line is the ₹100 price; the gap between it and the orange line is the ₹35 contribution."}
:::

### Marginal cost is a unit-level idea

ICAI warns that "direct costing" and "marginal costing" are used as synonyms, but costs behave at different levels (SM 14.3–14.5). Tapri fills chai premix boxes on a machine that is set up once for every run of 500 boxes:

::: diagram Chai premix: the levels at which costs change
{"type": "layers", "layers": [
  {"label": "Unit level", "note": "materials, labour, variable overhead: ₹60 a box", "right": "changes with every box"},
  {"label": "Batch level", "note": "machine set-up: ₹2,400 a run of 500 boxes", "right": "changes with every run"},
  {"label": "Product level", "note": "depreciation of the premix filling machine: ₹30,000", "right": "changes only if the product is dropped"},
  {"label": "Department level", "note": "apportioned fixed overheads: ₹2,00,000", "right": "does not change with the product"}
 ],
 "caption": "Only the unit-level ₹60 is the marginal cost of a box. The other levels are direct to a batch, a product or a department, but they do not move with one more box."}
:::

Going from 9,999 to 10,000 boxes adds ₹60. Going from 10,000 to 10,001 starts a 21st run and adds ₹2,460: that is the **incremental cost** of the extra box (one more batch), while its **marginal cost** is still ₹60. Incremental cost can be for one unit or a whole change in volume or process; **differential cost** is the difference between the costs of two levels or alternatives.

### What moves the P/V ratio

The ratio depends only on price and variable cost per unit (SM Illustration 9):

| Change, on its own | P/V ratio |
|---|---|
| Physical sales volume rises or falls | no change |
| Fixed cost rises or falls | no change |
| Variable cost per unit falls | rises |
| Selling price per unit rises | rises |
| Contribution margin falls | falls |
| Price and variable cost per unit both rise by the same percentage | no change |
| Price rises 10%, volume falls 10% | rises (price raises it; volume cannot move it) |
| Angle of incidence widens | rises |

## Formats and formulas

ICAI's **Cost and Profit Statement under Marginal Costing** (SM 14.7). *Reproduce the headings and their order from memory.*

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Revenue (A) | | xxx |
| Product cost: | | |
| − Direct materials | xxx | |
| − Direct employee (labour) | xxx | |
| − Direct expenses | xxx | |
| − Variable manufacturing overheads | xxx | |
| **Product (inventoriable) costs (B)** | **xxx** | **xxx** |
| **Product contribution margin {A − B}** | | **xxx** |
| − Variable administration overheads | xxx | |
| − Variable selling and distribution overheads | xxx | xxx |
| **Contribution margin (C)** | | **xxx** |
| Period cost (D): | | |
| Fixed manufacturing expenses | xxx | |
| Fixed non-manufacturing expenses | xxx | xxx |
| **Profit / (loss) {C − D}** | | **xxx** |

The short form is the **marginal cost statement**: Sales, less variable cost, = contribution, less fixed cost, = profit (SM 14.13).

::: formula The marginal cost equation
$$S - V = C = F \pm P$$
S = sales value, V = variable cost, C = contribution, F = fixed cost, P = profit (+) or loss (−) (SM 14.13). If C = F there is no profit or loss; at zero output the loss equals F.
:::

::: formula Contribution
$$\text{Contribution} = \text{Sales revenue} - \text{Total variable cost} \qquad = \text{Fixed cost} + \text{Profit}$$
Variable cost here means all of it, manufacturing and non-manufacturing (variable selling commission included).
:::

::: formula P/V ratio (contribution to sales ratio)
$$\text{P/V ratio} = \frac{\text{Contribution}}{\text{Sales}} \times 100 \qquad = \frac{\text{Change in contribution or profit}}{\text{Change in sales}} \times 100$$
The change form is valid when price, variable cost per unit and fixed cost are the same in both periods.
:::

::: formula Transpositions
$$C = S \times \text{P/V ratio} \qquad S = \frac{C}{\text{P/V ratio}} \qquad \text{Variable cost ratio} = 100\% - \text{P/V ratio}$$
The first two are ICAI's (SM 14.14). The third follows because sales are variable cost plus contribution: a P/V ratio of 40% means variable cost is 60% of sales.
:::

::: formula Fixed cost from any period
$$F = C - P \qquad = (S \times \text{P/V ratio}) - P$$
:::

::: definition Marginal cost
The amount at any given volume of output by which aggregate costs increases if the volume of output is increased or decreased by one unit. (SM 1.34) In Chapter 14: the incremental cost of production for producing one additional unit, measured by the total variable cost attributable to one additional unit. (SM 14.2–14.3)
:::

::: definition Marginal costing
A costing system where products or services and inventories are ==valued at variable costs only==. It does not take consideration of fixed costs. Also known as direct costing. (SM 14.3) As a technique: the ascertainment of marginal cost by differentiating between fixed and variable costs; it is used to ascertain the effect of changes in volume or type of output on profit. (SM 1.39)
:::

::: definition Contribution
Contribution or contribution margin is the difference between sales revenue and total variable costs ==irrespective of manufacturing or non-manufacturing==. (SM 14.8)
:::

::: definition Period cost
Costs which are not assigned to the products but are charged as expenses against the revenue of the period in which they are incurred. All fixed costs, either manufacturing or non-manufacturing, are recognised as period costs in marginal costing. (SM 14.9)
:::

::: definition P/V ratio
This ratio shows the proportion of sales available to cover fixed costs and profit. (SM 14.13)
:::

## Worked examples

:::: example Chai premix: two levels, one statement
Tapri's chai premix line sells boxes at ₹250. Ritu has the cost records at two levels of activity:

| Particulars | 60,000 boxes (₹) | 80,000 boxes (₹) |
|---|---:|---:|
| Direct materials | 48,00,000 | 64,00,000 |
| Direct employee cost | 18,00,000 | 24,00,000 |
| Direct expenses (royalty) | 3,00,000 | 4,00,000 |
| Manufacturing overheads | 33,00,000 | 36,00,000 |
| Administration overheads | 9,00,000 | 10,00,000 |
| Selling and distribution overheads | 16,00,000 | 18,00,000 |

**Required:**

(i) Separate each overhead into its fixed and variable parts.

(ii) Prepare the Cost and Profit Statement under marginal costing for a budget of 90,000 boxes, and state the contribution per box and the P/V ratio.

(iii) Kesar notes that the total cost per box is ₹211.67 at 60,000 boxes and ₹195 at 80,000. Calculate the marginal cost per box and explain the difference.

::: answer Show the working
**(i) Working note 1: splitting the overheads** (variable part = change in cost ÷ change in boxes; fixed part = total − variable part)

| Overhead | Change in cost (₹) | Variable per box (₹) | Fixed (₹) |
|---|---:|---:|---:|
| Manufacturing | 3,00,000 | 15 | 24,00,000 |
| Administration | 1,00,000 | 5 | 6,00,000 |
| Selling and distribution | 2,00,000 | 10 | 10,00,000 |

Each change is over 20,000 boxes; e.g. manufacturing ₹33,00,000 − 60,000 × ₹15 = ₹24,00,000. Materials (₹80), employee cost (₹30) and royalty (₹5) per box are the same at both levels: wholly variable.

**(ii) Cost and Profit Statement under marginal costing, 90,000 boxes**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Revenue (90,000 × ₹250) (A) | | 2,25,00,000 |
| Product cost: | | |
| Direct materials (₹80) | 72,00,000 | |
| Direct employee cost (₹30) | 27,00,000 | |
| Direct expenses (₹5) | 4,50,000 | |
| Variable manufacturing overheads (₹15) | 13,50,000 | |
| **Product (inventoriable) costs (B)** | | **1,17,00,000** |
| **Product contribution margin {A − B}** | | **1,08,00,000** |
| Variable administration overheads (₹5) | 4,50,000 | |
| Variable selling and distribution overheads (₹10) | 9,00,000 | 13,50,000 |
| **Contribution margin (C)** | | **94,50,000** |
| Period cost (D): | | |
| Fixed manufacturing expenses | 24,00,000 | |
| Fixed non-manufacturing expenses (₹6,00,000 + ₹10,00,000) | 16,00,000 | 40,00,000 |
| **Profit {C − D}** | | **54,50,000** |

Contribution per box = ₹94,50,000 ÷ 90,000 = **₹105** (₹250 − ₹145). P/V ratio = ₹105 ÷ ₹250 × 100 = **42%**. The product cost per box, the value of a box in closing stock under marginal costing, is ₹130: variable administration and selling costs are not inventoried.

**(iii) Marginal cost and total cost per box**

| Boxes | Variable cost at ₹145 (₹) | Fixed cost (₹) | Total cost (₹) | Per box (₹) |
|---:|---:|---:|---:|---:|
| 60,000 | 87,00,000 | 40,00,000 | 1,27,00,000 | 211.67 |
| 80,000 | 1,16,00,000 | 40,00,000 | 1,56,00,000 | 195.00 |

The marginal cost is **₹145 a box** at both levels (₹80 + ₹30 + ₹5 + ₹15 + ₹5 + ₹10). Total cost per box falls only because the same ₹40,00,000 of fixed cost is spread over more boxes: the extra 20,000 boxes added ₹29,00,000, exactly 20,000 × ₹145. The fixed cost belongs to the period and is recovered out of total contribution.
:::
::::

:::: example Monsoon pakora combo: what a 10% price cut really costs
Tapri's app sells a monsoon pakora combo at ₹30. Last season it sold 2,40,000 combos at a P/V ratio of 25%, with fixed costs of ₹12,00,000. BrewBucks has launched a cheaper snack box, and Dev proposes a 10% price cut for the coming season, variable cost per combo unchanged.

**Required:**

(i) Calculate the variable cost and contribution per combo, and last season's profit.

(ii) Calculate the new P/V ratio after the price cut.

(iii) Calculate the sales value and the number of combos needed to keep last season's total contribution, and the percentage increase in each.

(iv) Kesar expects volume to rise by only 30% after the cut. Calculate the profit.

(v) Ritu's alternative is to drop the price cut and hold the P/V ratio at 25%. If oil prices push the variable cost per combo up by 6%, calculate the selling price needed.

::: answer Show the working
**(i)** Variable cost = 75% of ₹30 = **₹22.50**; contribution = **₹7.50** a combo.

| Particulars | Amount (₹) |
|---|---:|
| Sales (2,40,000 × ₹30) | 72,00,000 |
| Less: Variable cost (2,40,000 × ₹22.50) | 54,00,000 |
| **Contribution** | **18,00,000** |
| Less: Fixed cost | 12,00,000 |
| **Profit** | **6,00,000** |

**(ii)** New price = ₹27; contribution = ₹27 − ₹22.50 = ₹4.50; P/V ratio = 4.50 ÷ 27 × 100 = **16.67%** (1/6).

**(iii) Keeping the contribution of ₹18,00,000**

$$\text{Sales value} = \frac{C}{\text{P/V ratio}} = \frac{18{,}00{,}000}{1/6} = \text{₹}1{,}08{,}00{,}000 \qquad \text{Combos} = \frac{18{,}00{,}000}{4.50} = 4{,}00{,}000$$

Sales value must rise by **50%** (₹72,00,000 to ₹1,08,00,000) and the number of combos by **66.67%** (2,40,000 to 4,00,000). Check: 4,00,000 × ₹27 = ₹1,08,00,000.

**(iv) Volume up 30%:** 3,12,000 combos × ₹4.50 = ₹14,04,000 contribution, less ₹12,00,000 fixed cost = profit of **₹2,04,000**, against ₹6,00,000 last season.

**(v)** New variable cost = ₹22.50 × 1.06 = ₹23.85. To keep a P/V ratio of 25%, variable cost must stay 75% of price:

$$\text{Price} = \frac{23.85}{75\%} = \text{₹}31.80$$

The price rises by the same 6% as the variable cost. Left at ₹30, the P/V ratio would fall to 20.5%.

**Comment.** The 10% price cut removes 40% of each combo's contribution (₹7.50 to ₹4.50), so two-thirds more combos are needed just to stand still; any smaller rise in volume reduces profit.
:::
::::

:::: example Lohri frozen parathas: a cost sheet in percentages
Kesar launched frozen parathas for Lohri (he launches something every festival) and handed Ritu last year's cost analysis. There was no opening or closing stock, and 38,000 packs were sold at ₹80.

| Element of cost | Variable portion | Fixed portion (₹) |
|---|---|---:|
| Direct material | 40% of cost of goods sold | – |
| Direct labour | 20% of cost of goods sold | – |
| Factory overheads | 10% of cost of goods sold | 6,00,000 |
| Administration overheads | – | 1,50,000 |
| Selling and distribution overheads | 5% of cost of sales | 1,30,000 |

Cost of goods sold is made up of the first three elements; cost of sales adds administration and selling and distribution overheads.

**Required:**

(i) Calculate the cost of goods sold and the cost of sales.

(ii) Prepare a marginal cost statement showing the contribution and the profit.

(iii) Calculate the contribution per pack and the P/V ratio.

(iv) Calculate the profit if the number of packs sold falls by 10%, and the percentage fall in profit.

(v) Calculate the sales needed to earn a profit of 25% of sales, assuming capacity is available.

::: answer Show the working
**Working note 1: cost of goods sold (COGS)**

COGS = 0.40 COGS + 0.20 COGS + (0.10 COGS + ₹6,00,000), so 0.30 COGS = ₹6,00,000 and **COGS = ₹20,00,000**.

**Working note 2: cost of sales (COS)**

COS = ₹20,00,000 + ₹1,50,000 + (0.05 COS + ₹1,30,000), so 0.95 COS = ₹22,80,000 and **COS = ₹24,00,000**.

**Working note 3: variable and fixed costs**

| Element | Variable (₹) | Fixed (₹) |
|---|---:|---:|
| Direct material (40% × ₹20,00,000) | 8,00,000 | – |
| Direct labour (20% × ₹20,00,000) | 4,00,000 | – |
| Factory overheads (10% × ₹20,00,000) | 2,00,000 | 6,00,000 |
| Administration overheads | – | 1,50,000 |
| Selling and distribution overheads (5% × ₹24,00,000) | 1,20,000 | 1,30,000 |
| **Total** | **15,20,000** | **8,80,000** |

Check: ₹15,20,000 + ₹8,80,000 = ₹24,00,000, the cost of sales.

**(ii) Marginal cost statement**

| Particulars | Amount (₹) |
|---|---:|
| Sales (38,000 × ₹80) | 30,40,000 |
| Less: Variable cost (WN 3) | 15,20,000 |
| **Contribution** | **15,20,000** |
| Less: Fixed cost (WN 3) | 8,80,000 |
| **Profit** | **6,40,000** |

Check: sales − cost of sales = ₹30,40,000 − ₹24,00,000 = ₹6,40,000.

**(iii)** Contribution per pack = ₹15,20,000 ÷ 38,000 = **₹40**; P/V ratio = ₹15,20,000 ÷ ₹30,40,000 × 100 = **50%**.

**(iv) Packs down 10% to 34,200:** contribution = 34,200 × ₹40 = ₹13,68,000; profit = ₹13,68,000 − ₹8,80,000 = **₹4,88,000**. Profit falls by ₹1,52,000, which is **23.75%**: a 10% fall in volume costs almost a quarter of the profit, because fixed cost does not fall with it.

**(v) Profit of 25% of sales:** contribution (50% of sales) must cover fixed cost and a profit of 25% of sales, so fixed cost = 25% of sales.

$$\text{Sales} = \frac{\text{Fixed cost}}{\text{P/V ratio} - \text{Profit \%}} = \frac{8{,}80{,}000}{50\% - 25\%} = \text{₹}35{,}20{,}000$$

That is 44,000 packs. Check: ₹35,20,000 × 50% − ₹8,80,000 = ₹8,80,000, which is 25% of ₹35,20,000.
:::
::::

## Under the hood

### Three facts ICAI states about marginal costing

1. **Not a distinct method:** not a method like job or process costing but a technique for decision making, used with any method and with standard costing or budgetary control.
2. **Cost ascertainment:** by the nature (behaviour) of costs, not their function.
3. **Decision making:** total unit cost is constant only if output and mix stay the same; as they keep changing, so does unit cost, hence marginal costing's wide use in decisions (SM 14.6).

### Why contribution, and not profit, per product

ICAI's reason (SM 14.8): the contribution concept rests on the theory that the profit and fixed expenses of a business are a "joint cost" which cannot be equitably apportioned to its different segments. So contribution serves as the measure of efficiency of each segment, and forms a fund for fixed expenses and profit. A higher P/V ratio means contribution grows faster with sales: once the break-even point is reached, profit grows faster than for a product with a lower ratio (SM 14.14).

### CVP analysis: what the equation is for

**Cost-volume-profit (CVP) analysis** is a managerial tool showing the relationship between the ingredients of profit planning: cost, selling price and volume of activity (SM 14.11). It provides information about (SM 14.12):

1. The behaviour of cost in relation to volume.
2. The volume of production or sales at which the business will break even.
3. The sensitivity of profits to variation in output.
4. The amount of profit for a projected sales volume.
5. The quantity of production and sales for a target profit level.

It shows the impact on net profit of (i) changes in selling prices, (ii) changes in volume of sales, (iii) changes in variable cost and (iv) changes in fixed cost (SM 14.12–14.13). Its six assumptions are listed in [[cma.mc.bep|the break-even lesson]].

### Where the idea goes next

Fixed cost ÷ contribution per unit (or ÷ P/V ratio) is the break-even point: [[cma.mc.bep|break-even point and margin of safety]], drawn in [[cma.mc.charts|break-even and profit-volume charts]]. Products and departments are judged by contribution (characteristic 6), so the decision lessons rank by it: [[cma.mc.keyfactor|limiting factor]] and [[cma.mc.decisions|short-term decisions]]. How fixed costs in stock change profit: [[cma.mc.absorb|marginal versus absorption costing]].

## Exam angle

### How ICAI tests the basics

::: exam What the papers asked, May 2024 to September 2026
In the documents read for this lesson, the basics came up in 12 places in 9 documents, always as a step inside a bigger question or as theory.

- **Contribution per unit as the first step, 2–5 marks.** January 2025 Q1(b) (contribution per good unit after a 3% rejection with scrap, then monthly profit: 3 + 2 marks). September 2025 MCQs 6–10 (one case: absorption cost of production, total variable cost, contribution per unit, BES, profit at 10% lower sales; 2 marks each). RTP January 2025 MCQ 7 (variable cost from the average cost at two volumes).
- **Splitting costs first.** RTP May 2024 Q11 (variable portions as percentages of cost of goods sold and of cost of sales, then P/V ratio, BES and profit); MTP Series II for May 2025, MCQ case (total variable and fixed cost "as per marginal costing income statement").
- **Theory, 4–5 marks.** RTP January 2025 Q19(a) "DISCUSS advantages of Marginal Costing"; MTP Series II for September 2026 Q6(c) "Elaborate the practical application of Marginal Costing" (4 marks); "DISCUSS any five types of costs categorised based on its use in Managerial Decision Making", where marginal, differential and product cost are answer points (MTP Series I for May 2025 Q6(a), MTP Series II for September 2026 Q6(b), 5 marks each; RTP January 2026 Q19(a)); RTP May 2026 Q17(a), the same costs in a decision scenario.
:::

::: exam The traps
- Contribution deducts variable administration and selling costs too (September 2025 MCQ 7: total variable cost included the variable general and administration and the variable selling overheads).
- "Profit as a % of sales" targets: MTP Series II for September 2026 Q5(b)(d) solved fixed cost ÷ (P/V ratio − profit %).
:::

::: trick P/V ratio does the counting for you
Profit at any sales = sales × P/V ratio − fixed cost: no units needed. A target profit of p% of sales needs sales = fixed cost ÷ (P/V ratio − p%). Conditions: one product (or a constant mix); price, variable cost per unit and fixed cost unchanged.
:::

::: trick The same percentage up, the same P/V ratio
Price and variable cost per unit moved by the same percentage leave the P/V ratio unchanged (SM Illustration 9, item vii). So the price that keeps a P/V ratio is new variable cost ÷ (1 − P/V ratio).
:::

## Answer frame

### "Discuss the advantages of marginal costing" (ICAI's seven, in ICAI's order)

1. **Simplified pricing policy:** marginal cost per unit is constant in the short run, so firm pricing decisions can be taken.
2. **Proper recovery of overheads:** no under- or over-recovery of fixed overheads absorbed at predetermined rates.
3. **Shows realistic profit:** stock and WIP at marginal cost, fixed expenses written off as period cost.
4. **How much to produce:** break-even analysis shows the effect of more or less production on profit.
5. **More control over expenditure:** actual variable expenses compared with budget through variances.
6. **Helps in decision making:** make or buy, discontinuance of a product, replacement of machines.
7. **Short-term profit planning:** through break-even charts.

### "Discuss the limitations of marginal costing" (ICAI's seven)

1. **Difficulty in classifying fixed and variable elements:** most expenses are neither wholly fixed nor wholly variable.
2. **Dependence on key factors:** contribution is no guide to optimum profitability unless linked with the key factor.
3. **Scope for low profitability:** sales staff may mistake marginal cost for total cost and sell at a loss.
4. **Faulty valuation:** fixed overheads cannot be wholly excluded from WIP, particularly in large contracts.
5. **Unpredictable nature of cost:** fixed cost and variable cost per unit do change in reality.
6. **Ignores time factor and investment:** two jobs with the same marginal cost may take different time and machines.
7. **Understating of WIP:** stocks and work-in-progress are understated.

### "Elaborate the practical application of marginal costing"

ICAI's suggested answer (MTP Series II for September 2026, 4 marks) has four points: **pricing policy** (constant marginal cost permits firm short-term pricing decisions), **decision making** (make or buy, discontinuance, replacement), **ascertaining realistic profit** (stock at marginal cost, fixed cost as period cost) and **determination of production level** (break-even analysis). The Study Material's own answer key to "Discuss the practical application of marginal costing" points instead to its "facts about marginal costing" (SM 14.6, under the hood): a fuller answer adds them after the four points.

### "Explain the characteristics of marginal costing" (ICAI's six)

(1) All costs classified into fixed and variable, semi-variable costs split; (2) variable costs are the cost of the product; (3) finished goods and WIP at marginal cost only, variable selling and distribution excluded; (4) fixed costs are period costs; (5) prices set with reference to marginal cost and contribution; (6) profitability of departments and products judged by contribution.

## Common mistakes

::: mistake Hall of Shame: the fixed overhead that sneaked into marginal cost
Writing "marginal cost per box = ₹145 + ₹40,00,000 ÷ 90,000 = ₹189.44". That is the total cost per box at one volume, and it changes with every volume. **Fix:** marginal cost is prime cost plus variable overheads; fixed costs are deducted from total contribution, never from a unit.
:::

::: mistake Contribution that forgot the salesman
Stopping at sales minus variable *manufacturing* cost (₹1,08,00,000 in the premix example) and calling it contribution. That is ICAI's **product contribution margin**. **Fix:** contribution is after *all* variable costs: deduct variable administration and selling costs too (₹94,50,000).
:::

::: mistake Closing stock valued with the selling commission in it
Valuing a box of premix in closing stock at ₹145 under marginal costing. **Fix:** stock is valued at variable manufacturing cost only (₹130); variable selling and distribution costs are excluded from inventory.
:::

## Practice

::: quiz Check yourself
Q: Tapri's kulhad ice-cream has a variable cost ratio of 65% and a contribution of ₹14 a cup. What is its selling price per cup (₹)?
= 40
> P/V ratio = 100% − 65% = 35%. Price = contribution ÷ P/V ratio = ₹14 ÷ 35% = ₹40.

Q: Case scenario. Tapri's cold-chain division had sales of ₹50,00,000 at a P/V ratio of 30% and fixed costs of ₹9,00,000. Dev tells the board that sales will rise by 20% next year with prices, variable cost per unit and fixed costs unchanged, and "so profit will rise by 20% too". Which statement is correct?
- [ ] Profit rises by 20%, from ₹6,00,000 to ₹7,20,000
- [x] Profit rises by 50%, from ₹6,00,000 to ₹9,00,000
- [ ] Profit stays at ₹6,00,000, because the P/V ratio does not change
- [ ] The P/V ratio rises to 36%, so profit becomes ₹12,60,000
> Contribution = sales × 30%: ₹15,00,000 now, ₹18,00,000 at sales of ₹60,00,000. Fixed cost stays ₹9,00,000, so profit goes from ₹6,00,000 to ₹9,00,000, a 50% rise. The extra ₹3,00,000 of contribution is all profit; volume does not move the P/V ratio.

Q: Under marginal costing, which of these is a period cost?
- [ ] Direct materials of the units produced
- [ ] Variable factory power
- [x] Rent of the factory building
- [ ] Royalty paid per unit produced
> All fixed costs, manufacturing or non-manufacturing, are period costs under marginal costing. Materials, variable power and a per-unit royalty are variable manufacturing (product) costs.

Q: Which of these, on its own, changes the P/V ratio? Select all that apply.
- [x] The selling price rises by 5%
- [ ] Fixed costs rise by ₹2,00,000
- [ ] Units sold fall by 10%
- [x] Variable cost per unit falls by ₹3
> Price and variable cost per unit decide the P/V ratio. Fixed cost is not in it, and volume changes sales and contribution in the same proportion.

Q: A product sells at ₹500; direct materials ₹180, direct labour ₹70, variable factory overheads ₹50, variable selling commission ₹20, and fixed factory overheads absorbed at ₹60 per unit. What is its contribution per unit?
- [ ] ₹200
- [x] ₹180
- [ ] ₹120
- [ ] ₹140
> Contribution = price − all variable costs, manufacturing and non-manufacturing: ₹500 − (₹180 + ₹70 + ₹50 + ₹20) = ₹180. ₹200 leaves out the variable commission (it is the product contribution margin); ₹140 and ₹120 also deduct the absorbed fixed overhead of ₹60, which is a period cost, never part of contribution.
:::

## Recap

- Marginal cost = the variable cost of one more unit (prime cost + variable overheads); it is the same at every volume within the range.
- Marginal costing values products and stock at variable (manufacturing) cost only; all fixed costs are period costs charged to the period's profit and loss account.
- Contribution = sales − all variable costs = fixed cost + profit. Marginal cost equation: S − V = C = F ± P.
- Product contribution margin = revenue − variable manufacturing costs; contribution margin also deducts variable administration and selling costs.
- P/V ratio = contribution ÷ sales × 100, or change in contribution (profit) ÷ change in sales × 100; C = S × P/V; variable cost ratio = 100% − P/V.
- The P/V ratio moves only with price and variable cost per unit; volume and fixed cost leave it alone; equal % changes in both leave it alone too.
- Unit total cost wobbles with volume (₹95 at 20,000 jars, ₹85 at 30,000); marginal cost does not.

## Flashcards

Q:: ICAI's definition of marginal cost (Chapter 1)?
A:: The amount at any given volume of output by which aggregate costs increases if the volume of output is increased or decreased by one unit.

Q:: ICAI's definition of marginal costing?
A:: A costing system where products or services and inventories are valued at variable costs only; it does not take consideration of fixed costs (also called direct costing).

Q:: Contribution: ICAI's definition?
A:: The difference between sales revenue and total variable costs, irrespective of manufacturing or non-manufacturing.

Q:: The marginal cost equation?
A:: S − V = C = F ± P (sales − variable cost = contribution = fixed cost ± profit or loss).

Q:: P/V ratio: the two formulas?
A:: Contribution ÷ sales × 100; or change in contribution (or profit) ÷ change in sales × 100.

Q:: Under marginal costing, which costs are product (inventoriable) costs?
A:: Variable manufacturing costs only: direct materials, direct employee cost, direct expenses and variable manufacturing overheads.

Q:: Are variable selling and distribution costs included in the value of closing stock under marginal costing?
A:: No. They are deducted in arriving at contribution but excluded from the valuation of finished goods and WIP.

Q:: In the "profit-volume ratio", what does the word "profit" actually refer to?
A:: It is a misnomer: it refers to contribution (sales revenue − variable costs), not to profit after fixed costs.

Q:: CVP analysis provides information about which five matters (ICAI)?
A:: Behaviour of cost in relation to volume; the volume at which the business breaks even; sensitivity of profits to variation in output; profit for a projected sales volume; production and sales for a target profit.

Q:: The seven advantages of marginal costing, in ICAI's order?
A:: Simplified pricing policy; proper recovery of overheads; shows realistic profit; how much to produce; more control over expenditure; helps in decision making; short-term profit planning.

Q:: The seven limitations of marginal costing, in ICAI's order?
A:: Difficulty in classifying fixed and variable elements; dependence on key factors; scope for low profitability; faulty valuation; unpredictable nature of cost; ignores time factor and investment; understating of WIP.


