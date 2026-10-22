---
id: cma.mc.bep
title: Break-even point, margin of safety and angle of incidence
minutes: 30
needs: cma.mc.basics
tags: break-even point, margin of safety, angle of incidence, P/V ratio, cash break-even, CVP analysis
labs: cvp
summary: The volume at which contribution has just paid the fixed cost, in units and rupees; how far sales can fall before a loss; and what the angle of incidence shows.
---

## In plain words

### The café with a queue and a loss

Tapri's new kulhad café in Pune has a queue every evening and a loss for its first month.

> **Kesar:** We sold 12,000 cups and still lost money? The queue reaches the parking lot!
> **Ritu:** Per unit, please. A cup sells for ₹30; milk, tea, kulhad and gas cost ₹18. Each cup leaves ₹12, so 12,000 cups left ₹1,44,000. Rent, salaries and the machine lease are ₹1,80,000 a month however many cups we sell.

The ₹12 each cup leaves is its **contribution**: the price minus the costs that rise with every cup (the **variable costs**). Before it becomes profit, contribution must pay the costs that stay the same whatever the volume (the **fixed costs**).

At 15,000 cups the contributions add up to exactly ₹1,80,000: no profit, no loss. That volume is the **break-even point**; from cup 15,001, every cup's ₹12 is profit. Kesar expects 24,000 cups next month, so 9,000 cups are his **margin of safety**: sales could fall that far before the café is back in a loss.

On a chart, the sales line crosses the total cost line at the break-even point and the two then open apart like scissors. The angle at which they cross is the **angle of incidence**: the wider it opens, the faster profit piles up.

::: analogy The bucket and the glass
Fixed cost is a bucket that must be full before anything reaches your glass, and every sale pours its contribution into it. Break-even is the moment the bucket is full; after that every pour overflows into the glass, which is profit. The margin of safety is how much pouring you could lose and still fill the bucket. The angle of incidence is the size of each pour.
:::

::: key
Contribution pays the fixed cost first; only what is left over is profit. The break-even point is the volume at which the fixed cost has just been paid, and the margin of safety is how far expected sales sit above it.
:::

## How it works

**Cost-volume-profit (CVP) analysis** studies how cost, selling price and volume decide profit. A generally used method of it, **break-even analysis**, finds the volume where total cost equals total sales revenue (the narrow sense) or the profit at any level of sales (the broad sense) (SM 14.14).

### Six steps from a price tag to a profit figure

::: steps
1. **Contribution per unit** = selling price − variable cost per unit: ₹30 − ₹18 = ₹12 a cup. Divided by the price it gives the **P/V ratio** (really a contribution-to-sales ratio): ₹12 ÷ ₹30 = 40%. Both are built in [[cma.mc.basics|the lesson on contribution and the P/V ratio]].
2. **Break-even point (BEP)** = fixed cost ÷ contribution per unit: ₹1,80,000 ÷ ₹12 = 15,000 cups. In rupees, the **break-even sales (BES)** are 15,000 × ₹30 = ₹4,50,000, or ₹1,80,000 ÷ 40%.
3. **A target profit** is added to the fixed cost before dividing: a profit of ₹60,000 needs (₹1,80,000 + ₹60,000) ÷ ₹12 = 20,000 cups.
4. **Margin of safety (MOS)** = expected sales − break-even sales: 24,000 − 15,000 = 9,000 cups, or ₹2,70,000. As a share of expected sales, 9,000 ÷ 24,000 = 37.5%: the **MOS ratio**.
5. **Profit comes straight from the margin of safety**, because only the cups above break-even earn it: 9,000 × ₹12 = ₹1,08,000, which is also ₹2,70,000 × 40%.
6. **On a break-even chart** (costs and revenues up the side, activity along the bottom), the sales line starts at the origin and the total cost line at the fixed cost. They cross at the BEP, and the angle at which they cross, the **angle of incidence**, shows ==the rate at which profit is earned once the break-even point is reached==.
:::

::: diagram Kulhad café: break-even chart
{"type": "plot", "h": 330, "x": [0, 30000], "y": [0, 900000],
 "xlabel": "cups sold in a month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [5000, "5,000"], [10000, "10,000"], [15000, "15,000"], [20000, "20,000"], [25000, "25,000"], [30000, "30,000"]],
 "yticks": [[0, "0"], [180000, "1,80,000"], [360000, "3,60,000"], [540000, "5,40,000"], [720000, "7,20,000"], [900000, "9,00,000"]],
 "series": [
  {"label": "sales", "fn": "30*x", "color": "a"},
  {"label": "total cost", "fn": "180000+18*x", "color": "d"},
  {"label": "fixed cost", "fn": "180000", "color": "mute", "dash": true},
  {"label": "margin of safety", "pts": [[15000, 70000], [24000, 70000]], "color": "f", "arrow": "both"},
  {"pts": [[15000, 0], [15000, 450000]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[24000, 0], [24000, 612000]], "color": "mute", "dash": true, "legend": false}
 ],
 "areas": [
  {"between": [1, 0], "from": 0, "to": 15000, "color": "bad", "label": "loss"},
  {"between": [0, 1], "from": 15000, "to": 21000, "color": "c", "label": "θ"},
  {"between": [0, 1], "from": 21000, "to": 30000, "color": "g", "label": "profit"}
 ],
 "points": [{"x": 15000, "y": 450000, "label": "BEP", "pos": "left"}],
 "caption": "Blue: sales; orange: total cost; grey dashed: fixed cost. The lines cross at the BEP, 15,000 cups (₹4,50,000). Rose: the loss area; green: the profit area; θ (amber) marks the angle of incidence. The violet arrow is the margin of safety, from 15,000 to the expected 24,000 cups."}
:::

The **cash break-even point** uses only the fixed costs payable in cash (depreciation and other non-cash fixed costs are left out), so it is never above the BEP.

::: lab cvp {"mode":"bep","price":100,"vc":60,"fixed":200000,"units":8000,"uname":"boxes","target":100000}
Step through the chart one feature at a time: sales line, cost lines, BEP, profit and loss areas, angle of incidence, margin of safety, cash BEP and the target-profit point.
:::

### What moves the break-even point

Each row changes one thing; the P/V column is ICAI's (Illustration 9, SM 14.29).

| Change, all else equal | P/V ratio | BEP | Margin of safety | Angle of incidence |
|---|---|---|---|---|
| Selling price per unit rises | rises | falls | rises | wider |
| Variable cost per unit rises | falls | rises | falls | narrower |
| Fixed cost rises | no change | rises | falls | no change |
| Units sold rise | no change | no change | rises | no change |

The angle depends only on how steep the two lines are, which price and variable cost per unit decide. More fixed cost lifts the whole total cost line: the BEP moves right, the angle stays.

::: lab cvp {"mode":"bep","price":24,"vc":11,"fixed":800000,"units":70000,"uname":"cartons","target":0,"dPrice":-6.25,"dFixed":18.75,"dUnits":20}
Here is RTP May 2025 Q18's price-cut plan on the sliders: price down 6.25%, fixed cost up 18.75% and volume up 20%, with the old lines kept dashed.
:::

## Formats and formulas

Every break-even answer starts from the marginal cost statement or one of these formulas. *Reproduce the statement and the formulas from memory.*

| Marginal cost statement | Amount (₹) |
|---|---:|
| Sales | xxx |
| Less: Variable cost | xxx |
| **Contribution** | **xxx** |
| Less: Fixed cost | xxx |
| **Profit** | **xxx** |

::: formula The marginal cost equation
$$S - V = C = F \pm P$$
S = sales, V = variable cost, C = contribution, F = fixed cost, P = profit or loss (SM 14.13). At the BEP, P = 0, so C = F.
:::

::: formula Break-even point in units
$$\text{BEP (units)} = \frac{\text{Fixed cost}}{\text{Contribution per unit}}$$
:::

::: formula Break-even sales in rupees
$$\text{BES} = \frac{\text{Fixed cost}}{\text{P/V ratio}} \qquad = \frac{\text{Fixed cost}}{\text{Contribution}} \times \text{Sales}$$
P/V ratio = contribution ÷ sales × 100.
:::

::: formula Cash break-even point
$$\text{Cash BEP (units)} = \frac{\text{Cash fixed costs}}{\text{Contribution per unit}}$$
ICAI: the break-even point "calculated only with those fixed costs which are payable in cash" (SM 14.15); depreciation and other non-cash fixed costs are left out.
:::

::: formula Sales for a target profit
$$\text{Units} = \frac{\text{Fixed cost} + \text{Desired profit}}{\text{Contribution per unit}} \qquad \text{Sales value} = \frac{\text{Fixed cost} + \text{Desired profit}}{\text{P/V ratio}}$$
:::

::: formula Margin of safety
$$\text{MOS} = \text{Total sales} - \text{BES} \qquad = \frac{\text{Profit}}{\text{P/V ratio}}$$
Total sales are the actual or budgeted sales; in units, units sold − BEP units.
:::

::: formula Margin of safety ratio and profit
$$\text{MOS ratio} = \frac{\text{Total sales} - \text{BES}}{\text{Total sales}} \times 100 \qquad \text{Profit} = \text{MOS} \times \text{P/V ratio}$$
:::

::: formula P/V ratio from two periods
$$\text{P/V ratio} = \frac{\text{Change in profit}}{\text{Change in sales}} \times 100$$
Valid when price, variable cost per unit and fixed cost are the same in both periods. A loss is a negative profit.
:::

### Which formula from which data

| You are given | Find first | Then |
|---|---|---|
| Price, variable cost per unit, fixed cost | Contribution per unit | BEP = fixed cost ÷ contribution per unit |
| Sales and profit of two periods | P/V = change in profit ÷ change in sales | Fixed cost = contribution − profit; BES = fixed cost ÷ P/V |
| Profit and P/V ratio | MOS = profit ÷ P/V | BES = sales − MOS |
| Fixed cost, P/V ratio, MOS ratio | BES = fixed cost ÷ P/V | Sales = BES ÷ (1 − MOS ratio) |
| MOS in units and in ₹, BEP units | Price = MOS (₹) ÷ MOS (units) | Sales = (MOS + BEP) units × price |

::: definition Break-even point (BEP)
The level of sales where an entity neither earns profit nor incurs loss. BEP is indicated in both quantity and monetary value terms. (SM 14.49)
:::

::: definition Margin of safety (MOS)
The margin between sales and the break-even sales is known as margin of safety. It can either be indicated in quantitative or monetary terms. (SM 14.49)
:::

::: definition Angle of incidence
This angle is formed by the intersection of sales line and total cost line at the break-even point. This angle shows the rate at which profit is earned once the break-even point is reached. (SM 14.31)
:::

## Worked examples

::::: example Samosa packs: read the chart, then cut the price
Tapri's Indore factory can make 50,000 frozen samosa packs a month, and its fixed costs are ₹6,00,000 a month. At full capacity, sales would be ₹25,00,000 and total cost ₹21,00,000. Ritu has drawn the sales and total cost lines on the chart below:

::: diagram Samosa packs: sales and total cost lines
{"type": "plot", "h": 330, "x": [0, 50000], "y": [0, 2500000],
 "xlabel": "packs a month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"], [50000, "50,000"]],
 "yticks": [[0, "0"], [500000, "5,00,000"], [1000000, "10,00,000"], [1500000, "15,00,000"], [2000000, "20,00,000"], [2500000, "25,00,000"]],
 "series": [
  {"label": "sales", "fn": "50*x", "color": "a"},
  {"label": "total cost", "fn": "600000+30*x", "color": "d"},
  {"label": "fixed cost", "fn": "600000", "color": "mute", "dash": true}
 ],
 "caption": "Blue: sales; orange: total cost; grey dashed: fixed cost."}
:::

**Required:**

(i) Calculate the selling price, variable cost and contribution per pack, and the P/V ratio.

(ii) Calculate the break-even point in packs and in rupees, and show it on the chart.

(iii) For a budget of 40,000 packs, calculate the margin of safety in packs, in rupees and as a percentage, and the profit.

(iv) Kesar wants to cut the price to ₹45 a pack and expects to sell all 50,000 packs. Calculate the new break-even point, margin of safety and profit, and comment on the angle of incidence.

:::: answer Show the working
::: diagram Samosa packs: the chart, marked
{"type": "plot", "h": 330, "x": [0, 50000], "y": [0, 2500000],
 "xlabel": "packs a month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"], [50000, "50,000"]],
 "yticks": [[0, "0"], [500000, "5,00,000"], [1000000, "10,00,000"], [1500000, "15,00,000"], [2000000, "20,00,000"], [2500000, "25,00,000"]],
 "series": [
  {"label": "sales", "fn": "50*x", "color": "a"},
  {"label": "total cost", "fn": "600000+30*x", "color": "d"},
  {"label": "fixed cost", "fn": "600000", "color": "mute", "dash": true},
  {"label": "margin of safety", "pts": [[30000, 250000], [40000, 250000]], "color": "f", "arrow": "both"},
  {"pts": [[30000, 0], [30000, 1500000]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[40000, 0], [40000, 1800000]], "color": "mute", "dash": true, "legend": false}
 ],
 "areas": [
  {"between": [1, 0], "from": 0, "to": 30000, "color": "bad", "label": "loss"},
  {"between": [0, 1], "from": 30000, "to": 38000, "color": "c", "label": "θ"},
  {"between": [0, 1], "from": 38000, "to": 50000, "color": "g", "label": "profit"}
 ],
 "points": [{"x": 30000, "y": 1500000, "label": "BEP", "pos": "left"}],
 "caption": "The BEP is where the blue sales line crosses the orange total cost line: 30,000 packs and ₹15,00,000. The violet arrow is the margin of safety at the budget of 40,000 packs; θ (amber) is the angle of incidence."}
:::

**(i) Working notes**

1. Selling price per pack = ₹25,00,000 ÷ 50,000 = **₹50**.
2. Variable cost per pack = (₹21,00,000 − ₹6,00,000) ÷ 50,000 = **₹30**.
3. Contribution per pack = ₹50 − ₹30 = **₹20**; P/V ratio = ₹20 ÷ ₹50 × 100 = **40%**.

**(ii) Break-even point**

$$\text{BEP} = \frac{\text{Fixed cost}}{\text{Contribution per pack}} = \frac{6{,}00{,}000}{20} = 30{,}000 \text{ packs}$$

Break-even sales = 30,000 × ₹50 = **₹15,00,000** (check: ₹6,00,000 ÷ 40%), 60% of capacity: on the chart, where the sales line crosses the total cost line.

**(iii) At the budget of 40,000 packs**

| Particulars | Packs | Amount (₹) |
|---|---:|---:|
| Budgeted sales | 40,000 | 20,00,000 |
| Less: Break-even sales | 30,000 | 15,00,000 |
| **Margin of safety** | **10,000** | **5,00,000** |

MOS ratio = ₹5,00,000 ÷ ₹20,00,000 × 100 = **25%**. Profit = ₹5,00,000 × 40% = **₹2,00,000**. Check: contribution 40,000 × ₹20 = ₹8,00,000, less fixed cost ₹6,00,000.

**(iv) Price cut to ₹45, 50,000 packs**

Contribution = ₹45 − ₹30 = ₹15 a pack; P/V ratio = 15 ÷ 45 = 33.33%.

| Particulars | ₹50, 40,000 packs | ₹45, 50,000 packs |
|---|---:|---:|
| BEP (packs) | 30,000 | 40,000 |
| BEP as % of capacity | 60% | 80% |
| Break-even sales (₹) | 15,00,000 | 18,00,000 |
| Margin of safety (packs) | 10,000 | 10,000 |
| Margin of safety (₹) | 5,00,000 | 4,50,000 |
| MOS ratio | 25% | 20% |
| **Profit (₹)** | **2,00,000** | **1,50,000** |

::: diagram Price ₹50 against ₹45: the angle of incidence, close up
{"type": "plot", "h": 340, "x": [25000, 50000], "y": [1000000, 2500000],
 "xlabel": "packs a month", "ylabel": "amount (₹)",
 "xticks": [[25000, "25,000"], [30000, "30,000"], [35000, "35,000"], [40000, "40,000"], [45000, "45,000"], [50000, "50,000"]],
 "yticks": [[1000000, "10,00,000"], [1500000, "15,00,000"], [2000000, "20,00,000"], [2500000, "25,00,000"]],
 "clip": true,
 "series": [
  {"label": "sales at ₹50", "fn": "50*x", "color": "a"},
  {"label": "sales at ₹45", "fn": "45*x", "color": "b"},
  {"label": "total cost", "fn": "600000+30*x", "color": "d"}
 ],
 "areas": [
  {"between": [0, 2], "from": 30000, "to": 38000, "color": "c", "label": "θ₁"},
  {"between": [1, 2], "from": 40000, "to": 48000, "color": "h", "label": "θ₂"}
 ],
 "points": [{"x": 30000, "y": 1500000, "label": "BEP₁", "pos": "left"}, {"x": 40000, "y": 1800000, "label": "BEP₂", "pos": "below"}],
 "caption": "Close-up of the right half of the chart. Blue: sales at ₹50; teal: sales at ₹45; orange: total cost. BEP₁ and the amber wedge θ₁ belong to the ₹50 price, BEP₂ and the pink wedge θ₂ to ₹45: θ₂ opens later and narrower."}
:::

**Comment.** The cut takes a quarter off the contribution per pack, so the sales line is flatter and the angle of incidence narrower: profit grows more slowly after break-even. The BEP moves from 60% to 80% of capacity, and even with every pack sold, profit falls by ₹50,000. On these figures the price cut is not advisable.
::::
:::::

:::: example Chai premix: two years, one of them a loss
Tapri's chai premix division gives you the following results. Selling price, variable cost per unit and fixed cost were the same in both years.

| Year | Sales (₹) | Profit / (Loss) (₹) |
|---|---:|---:|
| 2024-25 | 1,50,00,000 | (9,00,000) |
| 2025-26 | 2,50,00,000 | 21,00,000 |

**Required:**

(i) Calculate the P/V ratio and the fixed cost.

(ii) Calculate the break-even sales.

(iii) Calculate the margin of safety for 2025-26 in rupees and as a percentage of sales.

(iv) Calculate the profit or loss if sales are ₹3,00,00,000.

(v) To fight BrewBucks' new instant coffee, Dev proposes a 10% price cut for 2026-27, with variable cost per unit and fixed cost unchanged. Calculate the sales needed to earn the 2025-26 profit, and the new break-even sales.

::: answer Show the working
**(i) P/V ratio and fixed cost**

$$\text{P/V ratio} = \frac{\text{Change in profit}}{\text{Change in sales}} \times 100 = \frac{21{,}00{,}000 - (-9{,}00{,}000)}{2{,}50{,}00{,}000 - 1{,}50{,}00{,}000} \times 100 \qquad = \frac{30{,}00{,}000}{1{,}00{,}00{,}000} \times 100 = 30\%$$

Fixed cost = contribution − profit of 2025-26 = ₹2,50,00,000 × 30% − ₹21,00,000 = **₹54,00,000**. Check with 2024-25: ₹45,00,000 − ₹54,00,000 = loss of ₹9,00,000.

**(ii) Break-even sales** = ₹54,00,000 ÷ 30% = **₹1,80,00,000**.

**(iii) Margin of safety 2025-26** = ₹2,50,00,000 − ₹1,80,00,000 = **₹70,00,000**, which is **28%** of sales. Check: ₹70,00,000 × 30% = ₹21,00,000, the year's profit.

**(iv) Profit at sales of ₹3,00,00,000** = ₹90,00,000 − ₹54,00,000 = **₹36,00,000**.

**(v) After a 10% price cut**

Working note: take the old price as ₹100. With a P/V ratio of 30%, the variable cost is ₹70. The new price is ₹90, the contribution ₹20, and the new P/V ratio 20 ÷ 90 = 2/9 (22.22%).

Contribution needed = ₹54,00,000 + ₹21,00,000 = ₹75,00,000.

$$\text{Sales needed} = \frac{75{,}00{,}000}{2/9} = \text{₹}3{,}37{,}50{,}000 \qquad \text{New BES} = \frac{54{,}00{,}000}{2/9} = \text{₹}2{,}43{,}00{,}000$$

Divide by the fraction 2/9, not a rounded 22.22%. In volume, ₹3,37,50,000 at ₹90 against ₹2,50,00,000 at ₹100 is 50% more units, just to stand still on profit.
:::
::::

:::: example Diwali gift boxes: capacity, a semi-variable cost and the cash break-even
Kesar launches a new gift box every Diwali. This year's line can make 50,000 boxes and is selling 37,500 (75% of capacity) at ₹400 a box. The fixed part of packing and dispatch is paid in cash.

| Particulars | Amount |
|---|---:|
| Direct material | ₹150 per box |
| Direct labour | ₹60 per box |
| Variable overheads | ₹30 per box |
| Packing and dispatch, semi-variable (variable part ₹40 per box) | ₹21,00,000 at the current level |
| Fixed costs up to 80% capacity, including depreciation of ₹6,00,000 | ₹30,00,000 |
| Additional fixed cost beyond 80% capacity | ₹6,00,000 |

**Required:**

(i) Calculate the break-even point in boxes, in rupees and as a percentage of capacity.

(ii) Calculate the profit and the margin of safety at the current level.

(iii) Calculate the cash break-even point in boxes.

(iv) Kesar wants a profit of ₹15,00,000 with price and variable cost per box unchanged. Calculate the capacity utilisation needed and the margin of safety at that level.

::: answer Show the working
**Working notes**

1. Variable cost per box = ₹150 + ₹60 + ₹30 + ₹40 = ₹280; contribution = ₹400 − ₹280 = **₹120** a box; P/V ratio = 30%.
2. Fixed part of packing and dispatch = ₹21,00,000 − (37,500 × ₹40) = **₹6,00,000**.
3. Total fixed cost up to 80% capacity = ₹30,00,000 + ₹6,00,000 = **₹36,00,000**.

**(i)** BEP = ₹36,00,000 ÷ ₹120 = **30,000 boxes** = **₹1,20,00,000**, which is **60%** of capacity.

**(ii) At 37,500 boxes**

| Particulars | Amount (₹) |
|---|---:|
| Sales (37,500 × ₹400) | 1,50,00,000 |
| Less: Variable cost (37,500 × ₹280) | 1,05,00,000 |
| **Contribution** | **45,00,000** |
| Less: Fixed cost (WN 3) | 36,00,000 |
| **Profit** | **9,00,000** |

Margin of safety = 37,500 − 30,000 = **7,500 boxes** = **₹30,00,000**, which is **20%** of sales. Check: ₹30,00,000 × 30% = ₹9,00,000.

**(iii)** Cash fixed costs = ₹36,00,000 − ₹6,00,000 depreciation = ₹30,00,000; cash BEP = ₹30,00,000 ÷ ₹120 = **25,000 boxes**.

**(iv) Profit of ₹15,00,000**

Step 1. Within 80% capacity: (₹36,00,000 + ₹15,00,000) ÷ ₹120 = 42,500 boxes, more than the 40,000 boxes that 80% allows. So the additional fixed cost is incurred, and fixed cost becomes ₹42,00,000.

Step 2.
$$\text{Boxes needed} = \frac{42{,}00{,}000 + 15{,}00{,}000}{120} = 47{,}500 \qquad \text{Capacity utilisation} = \frac{47{,}500}{50{,}000} = 95\%$$

New BEP = ₹42,00,000 ÷ ₹120 = 35,000 boxes. Margin of safety = 47,500 − 35,000 = **12,500 boxes** = **₹50,00,000**, 26.32% of sales of ₹1,90,00,000.

Convention: the new BEP uses the higher fixed cost, which Kesar commits to when he plans for 95%; ICAI's suggested answer to May 2026 Q2(b) does the same.
:::
::::

## Under the hood

### The fine print: six assumptions behind every break-even figure

ICAI's list, in ICAI's order (SM 14.11–14.12); "Discuss basic assumptions of CVP analysis" is one of the chapter's own questions:

1. Revenues and costs change only with the number of units produced and sold: output is the only revenue and cost driver.
2. Total costs can be separated into a fixed and a variable component.
3. Total revenues and total costs are linear in output within a relevant range and time period.
4. Selling price, variable cost per unit and total fixed costs are known and constant within that range.
5. A single product, or a sales mix that stays constant as total units change.
6. Revenues and costs are compared without the time value of money.

The **limitations of break-even analysis** follow from them (SM 14.25): costs are not always linear, prices may differ at different sales levels, stocks do not stay constant, and inflation moves costs too.

### Next door

Several products need a composite BEP for the sales mix: [[cma.mc.multiproduct|multi-product break-even analysis]]. The contribution break-even chart and the profit-volume chart are drawn in [[cma.mc.charts|break-even and profit-volume charts]]. A target profit after tax is grossed up first: profit before tax = profit after tax ÷ (1 − tax rate).

### The margin of safety in Financial Management

Multiply and divide the MOS ratio by the P/V ratio and it becomes EBIT ÷ contribution. Operating leverage is contribution ÷ EBIT, so **degree of operating leverage = 1 ÷ MOS ratio** (FM Study Material 6.8): the café's 37.5% means 2.67. More in [[fm.lev.leverage|operating leverage, Paper 6A]].

### Why ICAI ties the angle to the P/V ratio

The Study Material gives no formula for the angle; it is read off the chart. It pictures the profit each extra rupee of sales brings after the BEP, which (profit = MOS × P/V ratio) is the P/V ratio: hence Illustration 9's item (x): an increase in the angle of incidence goes with a higher P/V ratio.

## Exam angle

### What the examiner keeps asking

::: exam Where break-even questions appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, break-even and margin of safety came up 15 times in 13 documents.

- **Descriptive, 3 to 7 marks.** Two years' sales and profit, then a changed cost: May 2024 Q5(b); MTP Series I Q1(c) for September 2025 and for September 2026 (4 marks each). Profit, P/V ratio, BES and fixed cost from a MOS in units and rupees: May 2026 Q5(b) (4 marks). Capacity, a semi-variable cost, cash BEP and a step in fixed cost: May 2026 Q2(b) (7 marks). BES of two machines: January 2025 Q1(a)(i) (3 marks). BES, profit and MOS%: RTP May 2024 Q11.
- **Multiple choice, 2 marks each**, often five on one case scenario: May 2026 MCQ 15, September 2025 MCQ 9, January 2026 MCQ 4 (multi-product); RTP January 2025 MCQ 7 (BEP, cash BEP, P/V ratio), RTP September 2025 MCQ 6; MTP Series I for September 2024 MCQs 6–10, Series II for January 2026 MCQ 3 and for May 2026 MCQ 11.
- **Angle of incidence**: in none of them, only in the Study Material's own exercises.
:::

::: exam The wording traps ICAI used
- "Sales could decrease by 50% before the company starts incurring losses" is a MOS ratio of 50% (RTP September 2025 MCQ 6).
- A loss in one of the two years (May 2024 Q5(b)): change in profit = profit − (−loss).
- "Variable cost will go up by 5%" (May 2024 Q5(b)): the suggested answer solved it both ways, 75% × 1.05 = 78.75% and 75% + 5% = 80%. State the reading you use.
- May 2026 Q2(b): split the semi-variable cost, take depreciation out of the cash BEP, and check whether the target crosses the step in fixed cost.
- The paper's own instruction: "Working notes should form part of the answer."
:::

::: trick The three-line identity
BES × P/V ratio = fixed cost; MOS × P/V ratio = profit; so sales × P/V ratio = fixed cost + profit. Any two of sales, BES and MOS give the third. Conditions: one product (or a constant mix), with price, variable cost per unit and fixed cost constant over the range.
:::

::: trick BES% + MOS% = 100%
On the same total sales, break-even sales and margin of safety are its two parts: if the MOS is 28% of sales, BES = sales × 72%.
:::

## Answer frame

### The theory parts

The chapter's own theory questions (SM 14.52) include these three. Write the points in this order.

**Short note on margin of safety**

1. Definition: expected (actual) sales minus break-even sales, in units or rupees.
2. Formulas: sales − BES; profit ÷ P/V ratio; MOS ratio = (sales − BES) ÷ sales.
3. Meaning: the larger the margin of safety, the higher the chances of making profits.
4. A large angle of incidence with a high margin of safety: an extremely favourable position.
5. A two-line numerical example.

**Short note on angle of incidence**

1. The angle formed by the intersection of the sales line and the total cost line at the BEP.
2. It shows the rate at which profit is earned once the BEP is reached (below the BEP, the rate of loss).
3. The wider the angle, the greater the rate of earning profit; it widens with the P/V ratio.
4. A large angle with a high margin of safety: an extremely favourable position.
5. A labelled sketch.

**Explain and illustrate the BEP with a break-even chart**

1. Definition: no profit, no loss; total cost equals total sales.
2. Formula in units and in rupees.
3. The chart: costs and revenues up the side, activity along the bottom; fixed cost, total cost and sales lines.
4. The BEP where sales cut total cost; margin of safety and profit read off.
5. A labelled sketch with figures.

### The numerical parts: three answers to the same question

::: cols
**Loses marks**

"BEP = 30,000 boxes."

A bare figure: if it is wrong, nothing earns method marks.
---
**Passes**

"BEP = Fixed cost ÷ Contribution per unit = ₹36,00,000 ÷ ₹120 = 30,000 boxes."

Formula and figures, but ₹36,00,000 comes from nowhere: the semi-variable split is invisible.
---
**Full marks**

Working notes first (contribution per box, fixed part of the semi-variable cost, total fixed cost); then formula, figures and result with its unit; any reading of ambiguous wording stated as an assumption.
:::

## Common mistakes

::: mistake Hall of Shame: the loss that lost its minus sign
A loss of ₹9,00,000, then a profit of ₹21,00,000. The hurried answer takes the change in profit as ₹12,00,000, a P/V ratio of 12%, and every later part falls with it. **Fix:** a loss is a negative profit, so the change is ₹21,00,000 − (−₹9,00,000) = ₹30,00,000 and the P/V ratio 30%.
:::

::: mistake The margin of safety measured against the wrong sales
9,000 ÷ 15,000 = 60% divides the café's margin of safety by its break-even sales. **Fix:** divide by the total (actual or budgeted) sales: 9,000 ÷ 24,000 = 37.5%. Test: BES% and MOS% must add up to 100%.
:::

::: mistake Depreciation smuggled into the cash break-even point
Using the full fixed cost for the cash BEP, or taking out rent and salaries along with depreciation. **Fix:** leave out depreciation and other non-cash fixed costs, and nothing else.
:::

::: mistake The semi-variable cost that stayed in one piece
Treating all ₹21,00,000 of packing and dispatch as variable gives ₹56 a box, a contribution of ₹104 and a BEP of about 28,846 boxes instead of 30,000. **Fix:** split it first; the variable part joins the variable cost per unit, the fixed part the fixed cost.
:::

## Practice

::: quiz Check yourself
Q: A Tapri kiosk earned a profit of ₹72,000 last month at a P/V ratio of 24%. What was its margin of safety in rupees?
= 300000
> Margin of safety = profit ÷ P/V ratio = ₹72,000 ÷ 24% = ₹3,00,000.

Q: Case scenario. Presenting next year's plan for the cold-chain division, Dev tells the board: "Our sales could fall by 40% before we make a loss. Every rupee of sales leaves 25 paise after variable costs. Fixed costs are ₹6,00,000." Ritu must put the projected sales on the slide. Which figure is correct?
- [ ] ₹24,00,000
- [x] ₹40,00,000
- [ ] ₹60,00,000
- [ ] ₹15,00,000
> 40% is the MOS ratio and 25 paise a rupee a P/V ratio of 25%. BES = ₹6,00,000 ÷ 25% = ₹24,00,000, the other 60% of sales, so sales = ₹24,00,000 ÷ 60% = ₹40,00,000. ₹24,00,000 is the BES itself; ₹60,00,000 divides by 40%.

Q: A division's sales were ₹40,00,000 with a loss of ₹1,50,000 in one year, and ₹60,00,000 with a profit of ₹4,50,000 in the next, with no change in prices, unit variable cost or fixed cost. What are its break-even sales?
- [ ] ₹30,00,000
- [ ] ₹50,00,000
- [x] ₹45,00,000
- [ ] ₹13,50,000
> P/V ratio = ₹6,00,000 ÷ ₹20,00,000 = 30%; fixed cost = ₹18,00,000 − ₹4,50,000 = ₹13,50,000; BES = ₹13,50,000 ÷ 30% = ₹45,00,000. Dropping the loss's minus sign gives P/V 15% and ₹30,00,000; ₹13,50,000 is the fixed cost.

Q: Which of these, on its own, widens the angle of incidence on a break-even chart?
- [ ] An increase in fixed costs
- [x] A decrease in the variable cost per unit
- [ ] An increase in the number of units sold
- [ ] A decrease in fixed costs
> A lower variable cost flattens the total cost line, so the lines open faster after the BEP (the P/V ratio rises). Fixed cost moves the total cost line without changing its slope; more units move along the same lines.

Q: Which of these fixed costs of the gift-box line are left out of its cash break-even point? Select all that apply.
- [x] Depreciation on the packing machine
- [ ] Salary of the warehouse supervisor, paid monthly
- [x] Amortisation of a design licence paid for two years ago
- [ ] Rent of the godown, paid monthly
> The cash BEP keeps only fixed costs payable in cash. Depreciation and amortisation are non-cash; salary and rent are paid in cash and stay in.
:::

## Recap

- Contribution per unit = price − variable cost per unit; P/V ratio = contribution ÷ sales × 100.
- BEP (units) = fixed cost ÷ contribution per unit; BES (₹) = fixed cost ÷ P/V ratio.
- Cash BEP = cash fixed costs ÷ contribution per unit (depreciation and other non-cash costs out).
- Target profit: (fixed cost + desired profit) ÷ contribution per unit, or ÷ P/V ratio for rupees.
- MOS = total sales − BES = profit ÷ P/V ratio; MOS ratio = MOS ÷ total sales; profit = MOS × P/V ratio.
- Two periods: P/V ratio = change in profit ÷ change in sales, and a loss is a negative profit.
- Angle of incidence: where the sales line cuts the total cost line at the BEP; the wider, the faster profit is earned. Large angle plus high MOS: extremely favourable.
- Fixed cost up: BEP rises, angle unchanged. (Bucket first, then the glass.)

## Flashcards

Q:: Formula: break-even point in units?
A:: Fixed cost ÷ contribution per unit (contribution per unit = selling price − variable cost per unit).

Q:: Formula: break-even sales in rupees, two ways?
A:: Fixed cost ÷ P/V ratio, or (fixed cost ÷ total contribution) × sales.

Q:: What is the cash break-even point, and what is left out of fixed cost for it?
A:: The break-even point calculated only with fixed costs payable in cash: cash fixed costs ÷ contribution per unit. Depreciation and other non-cash fixed costs are excluded.

Q:: ICAI's definition of margin of safety?
A:: The margin between sales and the break-even sales; it can be indicated in quantitative or monetary terms.

Q:: Margin of safety from profit and P/V ratio?
A:: Margin of safety = profit ÷ P/V ratio (so profit = margin of safety × P/V ratio).

Q:: Formula: margin of safety ratio?
A:: (Total sales − break-even sales) ÷ total sales × 100.

Q:: ICAI's definition of angle of incidence?
A:: The angle formed by the intersection of the sales line and the total cost line at the break-even point; it shows the rate at which profit is earned once the break-even point is reached.

Q:: What does a large angle of incidence with a high margin of safety indicate?
A:: An extremely favourable position.

Q:: P/V ratio from two periods' sales and profit?
A:: Change in profit ÷ change in sales × 100, valid when price, unit variable cost and fixed cost are unchanged; a loss counts as a negative profit.

Q:: Sales needed for a desired profit, in units and in rupees?
A:: Units = (fixed cost + desired profit) ÷ contribution per unit; sales value = (fixed cost + desired profit) ÷ P/V ratio.

Q:: Effect of an increase in fixed cost on the P/V ratio, the BEP and the angle of incidence?
A:: P/V ratio: no change. BEP: rises. Angle of incidence: no change.
