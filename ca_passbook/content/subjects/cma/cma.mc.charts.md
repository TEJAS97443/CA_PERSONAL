---
id: cma.mc.charts
title: Break-even and profit-volume charts
minutes: 30
needs: cma.mc.bep
tags: break-even chart, contribution break-even chart, profit-volume chart, P/V graph, profit path, CVP graphs
labs: cvp
summary: How to draw and read the three CVP pictures ICAI teaches: the break-even chart, the contribution break-even chart and the profit-volume chart, and what each shows that the others hide.
---

## In plain words

### Kesar does not read tables

The board meets at nine. Ritu has a page of break-even figures for Tapri's new cookie line; Kesar has his reading glasses in another city.

> **Kesar:** Ritu, no tables. Draw it. If I can see it, I can decide it.
> **Ritu:** Three lines, then. One for sales, one for total cost, one for the fixed cost we pay even if we sell nothing. Where sales cross total cost, we break even.
> **Dev:** And where do I see contribution on that? It's the number I actually manage.
> **Ritu:** Not on that one. Swap the fixed cost line for a variable cost line and it appears. And for you, Kesar, a single line: profit, starting at minus the fixed cost.

That is the whole lesson. A **break-even chart** puts rupees up the side and activity (units, or sales) along the bottom, and draws a sales line, a total cost line and a fixed cost line; the break-even point is where sales meet total cost. A **contribution break-even chart** draws the variable cost line instead of the fixed cost line, so contribution shows as the gap between sales and variable cost. A **profit-volume chart** throws away costs and revenues altogether and draws profit against activity: one line that starts at a loss equal to the fixed cost and crosses zero at the break-even point.

All three come from the same three numbers (price, variable cost per unit, fixed cost) and show the same break-even point. What differs is what you can read off them.

::: analogy Three cameras on one cricket chase
The wide-angle camera shows both teams' totals growing (the break-even chart: sales and total cost). The stump camera shows what each ball actually added (the contribution chart). The scoreboard shows one number, runs still needed, falling to zero and then the winning margin (the profit-volume chart: a loss that shrinks to break-even and becomes profit). Same match, three views, one moment of victory.
:::

::: key
Every CVP chart is straight lines through two easy points. The break-even point is where sales cross total cost (or the profit line crosses zero), and each chart is chosen for what it lets you read: the break-even chart shows costs, the contribution chart adds contribution, the profit-volume chart shows profit directly.
:::

## How it works

ICAI lists two methods of break-even analysis (SM 14.14): **(A) algebraic computations**, the formulas of [[cma.mc.bep|break-even point and margin of safety]], and **(B) graphic presentations**, the three charts of this lesson.

### Two points per line: drawing the break-even chart

Tapri's cookie line: price ₹250 a jar, variable cost ₹150, fixed cost ₹20,00,000 a month, capacity 40,000 jars, budget 30,000. ICAI's steps (SM 14.20):

::: steps
1. **Axes.** Costs and revenues on the vertical axis; the level of activity (here jars) on the horizontal axis. Choose a scale that reaches maximum activity and the highest sales figure.
2. **Fixed cost line**: horizontal at ₹20,00,000.
3. **Total cost line**: from the fixed cost on the vertical axis (₹20,00,000 at zero jars) to total cost at maximum activity (₹20,00,000 + 40,000 × ₹150 = ₹80,00,000).
4. **Sales line**: from the origin to sales at maximum activity (40,000 × ₹250 = ₹1,00,00,000).
5. **Read it.** The break-even point is where the sales line intersects the total cost line: 20,000 jars, ₹50,00,000. At the budget, the margin of safety (20,000 to 30,000 jars) and the profit (the gap between the lines, ₹75,00,000 − ₹65,00,000) can be measured off the chart.
:::

::: diagram Cookie line: break-even chart
{"type": "plot", "h": 330, "x": [0, 40000], "y": [0, 10000000],
 "xlabel": "jars a month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"]],
 "yticks": [[0, "0"], [2000000, "20,00,000"], [4000000, "40,00,000"], [6000000, "60,00,000"], [8000000, "80,00,000"], [10000000, "1,00,00,000"]],
 "series": [
  {"label": "sales", "fn": "250*x", "color": "a"},
  {"label": "total cost", "fn": "2000000+150*x", "color": "d"},
  {"label": "fixed cost", "fn": "2000000", "color": "mute", "dash": true},
  {"label": "margin of safety", "pts": [[20000, 900000], [30000, 900000]], "color": "f", "arrow": "both"},
  {"pts": [[20000, 0], [20000, 5000000]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[30000, 0], [30000, 7500000]], "color": "mute", "dash": true, "legend": false}
 ],
 "areas": [
  {"between": [1, 0], "from": 0, "to": 20000, "color": "bad", "label": "loss"},
  {"between": [0, 1], "from": 20000, "to": 40000, "color": "g", "label": "profit"}
 ],
 "points": [{"x": 20000, "y": 5000000, "label": "BEP", "pos": "left"}],
 "caption": "Blue: sales; orange: total cost; grey dashed: fixed cost. They cross at the BEP, 20,000 jars and ₹50,00,000. Rose: loss; green: profit. The violet arrow is the margin of safety, 10,000 jars, at the budget of 30,000."}
:::

::: lab cvp {"mode":"bep","chart":"be","price":500,"vc":300,"fixed":200000,"units":1700,"uname":"units","target":0}
Draw a break-even chart one feature at a time: sales line, fixed and total cost lines, BEP, loss and profit areas, the angle of incidence and the margin of safety.
:::

### The contribution break-even chart: where contribution becomes visible

ICAI's complaint about the chart above: it cannot show contribution, "literally the backbone of marginal costing" (SM 14.20). The **contribution break-even chart** keeps the sales and total cost lines and replaces the fixed cost line by a **variable cost line from the origin** (zero at zero activity; ₹60,00,000 at 40,000 jars). The total cost line runs parallel above it, ₹20,00,000 higher all the way. Contribution at any activity is the gap between the sales line and the variable cost line.

::: diagram Cookie line: contribution break-even chart
{"type": "plot", "h": 330, "x": [0, 40000], "y": [0, 10000000],
 "xlabel": "jars a month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"]],
 "yticks": [[0, "0"], [2000000, "20,00,000"], [4000000, "40,00,000"], [6000000, "60,00,000"], [8000000, "80,00,000"], [10000000, "1,00,00,000"]],
 "series": [
  {"label": "sales", "fn": "250*x", "color": "a"},
  {"label": "total cost", "fn": "2000000+150*x", "color": "d"},
  {"label": "variable cost", "fn": "150*x", "color": "b"},
  {"label": "contribution", "pts": [[30000, 4500000], [30000, 7500000]], "color": "f", "arrow": "both"},
  {"label": "fixed cost", "pts": [[37000, 5550000], [37000, 7550000]], "color": "h", "arrow": "both"}
 ],
 "legend": "outside",
 "areas": [{"between": [0, 2], "from": 0, "to": 40000, "color": "c"}],
 "points": [{"x": 20000, "y": 5000000, "label": "BEP", "pos": "left"}],
 "caption": "Blue: sales; orange: total cost; teal: variable cost. The amber area between sales and variable cost is contribution; the violet arrow measures it at 30,000 jars (₹30,00,000). The pink arrow is the fixed cost: the constant ₹20,00,000 gap between total cost and variable cost."}
:::

::: lab cvp {"mode":"bep","chart":"contrib","price":500,"vc":300,"fixed":200000,"units":1700,"uname":"units","target":0}
The same product on a contribution break-even chart: the variable cost line now starts at the origin, so contribution shows as the gap between the sales and variable cost lines.
:::

### The profit-volume chart: one line, no costs

In the **profit-volume (P/V) chart** the vertical axis is profit (above) and loss (below), and the horizontal axis is drawn at zero profit. The line starts at a loss equal to the fixed cost at nil activity (−₹20,00,000); the second point is the break-even point or the profit at any level (₹10,00,000 at 30,000 jars). The break-even point is where the line cuts the horizontal axis (SM 14.21–14.22).

::: diagram Cookie line: profit-volume chart
{"type": "plot", "h": 310, "x": [0, 40000], "y": [-2000000, 2000000],
 "xlabel": "jars a month", "ylabel": "profit / (loss) (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"]],
 "yticks": [[-2000000, "−20,00,000"], [-1000000, "−10,00,000"], [0, "0"], [1000000, "10,00,000"], [2000000, "20,00,000"]],
 "legend": "none",
 "series": [{"label": "profit line", "fn": "100*x-2000000", "color": "a"}],
 "areas": [
  {"under": 0, "from": 0, "to": 20000, "color": "bad", "label": "loss"},
  {"under": 0, "from": 20000, "to": 40000, "color": "g", "label": "profit"}
 ],
 "points": [{"x": 0, "y": -2000000, "label": "loss = fixed cost", "pos": "right"}, {"x": 20000, "y": 0, "label": "BEP", "pos": "above"}, {"x": 30000, "y": 1000000, "label": "₹10,00,000", "pos": "left"}],
 "caption": "The blue profit line starts at −₹20,00,000 (the fixed cost) and rises ₹100 for every jar, the contribution per jar. It cuts the horizontal axis at the BEP, 20,000 jars; rose is the loss area, green the profit area."}
:::

The slope of the profit line is the contribution per unit (₹100 a jar); with sales in rupees along the bottom it is the P/V ratio (40 paise of extra profit for every extra rupee of sales, with fixed cost unchanged): the chart draws the very relationship the ratio measures.

::: lab cvp {"mode":"bep","chart":"pv","price":30,"vc":15,"fixed":150000,"units":0,"uname":"units","target":20000}
Step through a P/V chart with sales in rupees along the bottom, so the slope of the profit line is the P/V ratio.
:::

### Where to read what

| To read | Break-even chart | Contribution chart | Profit-volume chart |
|---|---|---|---|
| Break-even point | sales line cuts total cost line | sales line cuts total cost line | profit line cuts the horizontal axis |
| Fixed cost | height of the fixed cost line | gap: total cost − variable cost | the loss at zero activity |
| Variable cost | gap: total cost − fixed cost | height of the variable cost line | not shown |
| Contribution | not shown | gap: sales − variable cost | height of the line above −F |
| Profit or loss | gap: sales − total cost | gap: sales − total cost | height of the line |
| Margin of safety | expected activity − BEP, along the bottom | the same | the same |

### What a change does to the profit line

ICAI calls this the P/V chart's biggest advantage: it shows clearly the effect of any change in the variables on profit and the break-even point (SM 14.22).

::: diagram Cookie line: a price rise and a fixed-cost rise on the P/V chart
{"type": "plot", "h": 330, "x": [0, 40000], "y": [-2500000, 3000000],
 "xlabel": "jars a month", "ylabel": "profit / (loss) (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [16000, "16,000"], [25000, "25,000"], [30000, "30,000"], [40000, "40,000"]],
 "yticks": [[-2500000, "−25,00,000"], [-2000000, "−20,00,000"], [0, "0"], [1500000, "15,00,000"], [2000000, "20,00,000"], [3000000, "30,00,000"]],
 "series": [
  {"label": "as now", "fn": "100*x-2000000", "color": "a"},
  {"label": "price ₹275", "fn": "125*x-2000000", "color": "g"},
  {"label": "fixed cost ₹25,00,000", "fn": "100*x-2500000", "color": "d", "dash": true}
 ],
 "points": [{"x": 20000, "y": 0, "label": "20,000", "pos": "below"}, {"x": 16000, "y": 0, "label": "16,000", "pos": "above"}, {"x": 25000, "y": 0, "label": "25,000", "pos": "below"}],
 "caption": "Blue: the present line. Green: price up to ₹275, so the line pivots on the same −₹20,00,000 and climbs faster; the BEP moves left to 16,000 jars. Orange dashed: fixed cost up to ₹25,00,000, so the line drops parallel; the BEP moves right to 25,000 jars."}
:::

| Change, all else equal | Profit line | BEP |
|---|---|---|
| Selling price up (or variable cost down) | steeper, same starting point | moves left |
| Selling price down (or variable cost up) | flatter, same starting point | moves right |
| Fixed cost up | parallel, lower | moves right |
| Fixed cost down | parallel, higher | moves left |
| Volume changes | a different point on the same line | no change |

## Formats and formulas

Each chart is plotted from a small table of points; write it as a working note above the graph. *Reproduce the line list for each chart from memory.*

| Chart | Lines to draw | Point at zero activity | Point at maximum activity |
|---|---|---|---|
| Break-even | fixed cost | F | F |
| | total cost | F | F + V × units |
| | sales | 0 | price × units |
| Contribution break-even | variable cost | 0 | V × units |
| | total cost | F | F + V × units |
| | sales | 0 | price × units |
| Profit-volume | profit | −F | C × units − F |

::: formula The lines as equations (x = units)
$$\text{Sales} = p\,x \qquad \text{Total cost} = F + v\,x \qquad \text{Variable cost} = v\,x \qquad \text{Profit} = (p - v)\,x - F$$
p = selling price per unit, v = variable cost per unit, F = fixed cost. With sales value S along the horizontal axis: profit = S × P/V ratio − F.
:::

::: formula Where two profit lines cross
$$\text{Units at which profits are equal} = \frac{F_2 - F_1}{C_2 - C_1}$$
C₁, C₂ = contribution per unit, F₁, F₂ = fixed costs of the two options. When the option with the higher contribution per unit also has the higher fixed cost (the usual trade-off), it earns more above this volume and the other earns more below it (the crossing in SM Example 5, 14.23; solved this way in January 2025 Q1(a)(ii)). If one option has both the higher contribution and the lower fixed cost, the lines never cross and it is better at every volume.
:::

::: definition Break-even chart
A breakeven chart records costs and revenues on the vertical axis and the level of activity on the horizontal axis. The breakeven point is that point where the sales revenue line intersects the total cost line. (SM 14.20)
:::

::: definition Contribution breakeven chart
Based on the same principles as a conventional breakeven chart except that it ==shows the variable cost line instead of the fixed cost line==; contribution can be read as the difference between the sales revenue line and the variable cost line. (SM 14.20–14.21)
:::

::: definition Profit-volume chart
A chart in which the vertical axis represents profits and losses and ==the horizontal axis is drawn at zero profit or loss==; the breakeven point is where the profit line intersects the horizontal axis. (SM 14.21)
:::

## Worked examples

::::: example The chart without the numbers: reading kulfi costs off a break-even chart
Ritu presented the kulfi line's contribution break-even chart to the board; the cost sheet behind it has gone missing. Capacity is 50,000 kulfis a month and expected sales are 40,000. Here is her chart:

::: diagram Kulfi line: contribution break-even chart (Ritu's slide)
{"type": "plot", "h": 320, "x": [0, 50000], "y": [0, 2000000], "given": true,
 "xlabel": "kulfis a month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"], [50000, "50,000"]],
 "yticks": [[0, "0"], [450000, "4,50,000"], [1250000, "12,50,000"], [1700000, "17,00,000"], [2000000, "20,00,000"]],
 "series": [
  {"label": "sales", "fn": "40*x", "color": "a"},
  {"label": "total cost", "fn": "450000+25*x", "color": "d"},
  {"label": "variable cost", "fn": "25*x", "color": "b"}
 ],
 "legend": "outside",
 "caption": "Blue: sales; orange: total cost; teal: variable cost. Each line is straight over the whole range."}
:::

**Required:**

(i) Read from the chart the selling price, the variable cost per kulfi and the fixed cost a month.

(ii) Calculate the break-even point and, at the expected sales, the margin of safety, the contribution and the profit; show them on the chart.

(iii) Kesar wants a profit of ₹2,40,000 a month at the same price. How many kulfis must be sold, and is it within capacity?

:::: answer Show the working
**(i) Readings from the chart**

| Line | At 0 kulfis (₹) | At 50,000 kulfis (₹) | Reading |
|---|---:|---:|---|
| Sales | 0 | 20,00,000 | Price = ₹20,00,000 ÷ 50,000 = **₹40** |
| Variable cost | 0 | 12,50,000 | Variable cost = ₹12,50,000 ÷ 50,000 = **₹25** a kulfi |
| Total cost | 4,50,000 | 17,00,000 | Fixed cost = total cost at nil activity = **₹4,50,000**; also the constant gap between total cost and variable cost (₹17,00,000 − ₹12,50,000) |

**(ii)** Contribution = ₹40 − ₹25 = ₹15 a kulfi; P/V ratio = 37.5%.

| Reading | Working | Amount |
|---|---|---:|
| Break-even point | ₹4,50,000 ÷ ₹15 | 30,000 kulfis (₹12,00,000) |
| Margin of safety | 40,000 − 30,000 | 10,000 kulfis (₹4,00,000), 25% |
| Contribution | 40,000 × ₹15 = ₹16,00,000 − ₹10,00,000 | ₹6,00,000 |
| Profit | ₹6,00,000 − ₹4,50,000 | ₹1,50,000 |

Check: margin of safety × P/V ratio = ₹4,00,000 × 37.5% = ₹1,50,000.

::: diagram Kulfi line: the readings marked
{"type": "plot", "h": 340, "x": [0, 50000], "y": [0, 2000000],
 "xlabel": "kulfis a month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"], [50000, "50,000"]],
 "yticks": [[0, "0"], [450000, "4,50,000"], [1000000, "10,00,000"], [1200000, "12,00,000"], [1600000, "16,00,000"], [2000000, "20,00,000"]],
 "series": [
  {"label": "sales", "fn": "40*x", "color": "a"},
  {"label": "total cost", "fn": "450000+25*x", "color": "d"},
  {"label": "variable cost", "fn": "25*x", "color": "b"},
  {"label": "contribution", "pts": [[40000, 1000000], [40000, 1600000]], "color": "c", "arrow": "both"},
  {"label": "margin of safety", "pts": [[30000, 150000], [40000, 150000]], "color": "f", "arrow": "both"},
  {"pts": [[30000, 0], [30000, 1200000]], "color": "mute", "dash": true, "legend": false}
 ],
 "legend": "outside",
 "areas": [{"between": [0, 1], "from": 30000, "to": 50000, "color": "g", "label": "profit"}],
 "points": [{"x": 30000, "y": 1200000, "label": "BEP", "pos": "left"}],
 "caption": "BEP at 30,000 kulfis (₹12,00,000), with a dotted line to the activity axis. At 40,000 kulfis the amber arrow is the contribution (₹16,00,000 − ₹10,00,000) and the height of the green wedge the profit (₹16,00,000 − ₹14,50,000). The violet arrow is the margin of safety."}
:::

**(iii) Target profit of ₹2,40,000**

$$\text{Kulfis} = \frac{\text{Fixed cost} + \text{Target profit}}{\text{Contribution per kulfi}} = \frac{4{,}50{,}000 + 2{,}40{,}000}{15} = 46{,}000$$

46,000 kulfis (sales of ₹18,40,000) is within the capacity of 50,000, but 6,000 above the expected sales: the target needs a 15% rise in volume at the present price.
::::
:::::

::::: example Cold coffee in summer and winter: two profit lines and a shut-down point
Tapri's cold coffee counters sell at ₹80 a cup from April to September and, to keep winter custom, at ₹70 from October to March. Variable cost is ₹50 a cup all year, and fixed costs are ₹6,00,000 for each half-year. Expected sales are 36,000 cups in summer and 28,000 cups in winter. If the counters were closed for the winter half-year, ₹2,50,000 of its fixed costs (lease and equipment) would still be incurred; the rest would be saved.

**Required:**

(i) Draw on one profit-volume graph a line for each half-year, and read each break-even point.

(ii) Read the profit or loss at the expected sales of each half-year.

(iii) Show on the graph the loss if the counters close for winter, and advise whether to close. Below what winter volume would closing be better?

:::: answer Show the working
**Working notes**

| Particulars | Summer | Winter |
|---|---:|---:|
| Contribution per cup (₹) | 30 | 20 |
| P/V ratio | 37.5% | 28.57% |
| Loss at nil activity (₹) | (6,00,000) | (6,00,000) |
| Break-even point (cups) | 20,000 | 30,000 |
| Profit / (loss) at expected sales (₹) | 4,80,000 | (40,000) |

Expected-sales points: summer 36,000 × ₹30 − ₹6,00,000 = ₹4,80,000; winter 28,000 × ₹20 − ₹6,00,000 = (₹40,000).

::: diagram Cold coffee: profit-volume graph for each half-year
{"type": "plot", "h": 340, "x": [0, 40000], "y": [-600000, 600000],
 "xlabel": "cups in the half-year", "ylabel": "profit / (loss) (₹)",
 "xticks": [[0, "0"], [10000, "10,000"], [20000, "20,000"], [30000, "30,000"], [40000, "40,000"]],
 "yticks": [[-600000, "−6,00,000"], [-250000, "−2,50,000"], [0, "0"], [480000, "4,80,000"]],
 "series": [
  {"label": "summer (₹30 a cup)", "fn": "30*x-600000", "color": "a"},
  {"label": "winter (₹20 a cup)", "fn": "20*x-600000", "color": "d"},
  {"label": "loss if closed in winter", "fn": "-250000", "color": "mute", "dash": true}
 ],
 "legend": "outside",
 "points": [{"x": 20000, "y": 0, "label": "BEP 20,000", "pos": "above"}, {"x": 30000, "y": 0, "label": "BEP 30,000", "pos": "right"}, {"x": 17500, "y": -250000, "label": "shut-down point, 17,500", "pos": "below"}, {"x": 28000, "y": -40000, "label": "winter at 28,000", "pos": "left"}],
 "caption": "Blue: summer; orange: winter. Both start at the same loss of ₹6,00,000; the winter line is flatter because each cup contributes ₹10 less, so it breaks even later. Grey dashed: the ₹2,50,000 loss that remains if the counters close; the winter line crosses it at 17,500 cups."}
:::

**(i)** Summer break-even point: 20,000 cups (₹16,00,000). Winter: 30,000 cups (₹21,00,000).

**(ii)** Summer: profit ₹4,80,000. Winter: loss ₹40,000, because the expected 28,000 cups are 2,000 short of the winter break-even point.

**(iii) Close for winter?** Closing saves the variable cost and ₹3,50,000 of fixed cost (₹6,00,000 − ₹2,50,000), but loses the winter contribution.

| Particulars | Stay open (₹) | Close (₹) |
|---|---:|---:|
| Contribution: 28,000 × ₹20 | 5,60,000 | — |
| Fixed costs | (6,00,000) | (2,50,000) |
| **Profit / (loss) for winter** | **(40,000)** | **(2,50,000)** |

Stay open: the winter loss is ₹2,10,000 smaller than the loss on closing. Closing is better only if winter sales fall below the volume whose contribution just covers the avoidable fixed cost: ₹3,50,000 ÷ ₹20 = **17,500 cups**, the point where the winter line meets the grey line.
::::
:::::

::::: example Four lines, one profit graph: the path and the line
Tapri's Bhopal outlets sell four lines. Fixed costs are ₹6,00,000 for the period.

| Line | Sales (₹) | Variable cost (₹) |
|---|---:|---:|
| Samosa | 8,00,000 | 6,00,000 |
| Kulhad chai | 12,00,000 | 4,80,000 |
| Cold coffee | 5,00,000 | 4,20,000 |
| Premix (retail) | 10,00,000 | 6,00,000 |

**Required:**

(i) Prepare a profit graph taking the lines in descending order of P/V ratio, and find the break-even point.

(ii) Kesar reads the break-even point as ₹10,00,000, where the path first crosses the axis. Explain why that is not the break-even point of the business.

(iii) Read from the graph the profit if only the two lines with the highest P/V ratios were sold, fixed costs unchanged.

:::: answer Show the working
**Statement showing cumulative sales and profit (lines in descending order of P/V ratio)**

| Line | Contribution (₹) | P/V ratio | Cumulative sales (₹) | Cumulative profit (₹) |
|---|---:|---:|---:|---:|
| Kulhad chai | 7,20,000 | 60% | 12,00,000 | 1,20,000 |
| Premix (retail) | 4,00,000 | 40% | 22,00,000 | 5,20,000 |
| Samosa | 2,00,000 | 25% | 30,00,000 | 7,20,000 |
| Cold coffee | 80,000 | 16% | 35,00,000 | 8,00,000 |

Cumulative profit = cumulative contribution − ₹6,00,000; at nil sales the loss is the fixed cost, ₹6,00,000.

::: diagram Four lines: profit graph
{"type": "plot", "h": 340, "x": [0, 3500000], "y": [-600000, 900000],
 "xlabel": "cumulative sales (₹)", "ylabel": "profit / (loss) (₹)",
 "xticks": [[0, "0"], [1000000, "10,00,000"], [1500000, "15,00,000"], [2200000, "22,00,000"], [3000000, "30,00,000"], [3500000, "35,00,000"]],
 "yticks": [[-600000, "−6,00,000"], [0, "0"], [120000, "1,20,000"], [520000, "5,20,000"], [800000, "8,00,000"]],
 "legend": "bottom-right",
 "series": [
  {"label": "profit path", "pts": [[0, -600000], [1200000, 120000], [2200000, 520000], [3000000, 720000], [3500000, 800000]], "color": "a", "dots": true},
  {"label": "profit line (overall P/V 40%)", "pts": [[0, -600000], [3500000, 800000]], "color": "d", "dash": true}
 ],
 "points": [{"x": 1500000, "y": 0, "label": "BEP ₹15,00,000", "pos": "below"}, {"x": 1000000, "y": 0, "label": "path crosses", "pos": "above"}, {"x": 2200000, "y": 520000, "label": "after premix", "pos": "above"}],
 "caption": "Blue: the profit path, one segment per line, its slope that line's P/V ratio, steepest first. Orange dashed: the profit line from −₹6,00,000 to the final ₹8,00,000; it cuts the axis at the break-even point."}
:::

**(i)** Total contribution ₹14,00,000 on sales of ₹35,00,000 gives an overall P/V ratio of 40%; break-even point = ₹6,00,000 ÷ 40% = **₹15,00,000** of sales, where the profit line cuts the horizontal axis.

**(ii)** The path crosses zero at ₹6,00,000 ÷ 60% = ₹10,00,000 only because it assumes that kulhad chai, the line with the highest P/V ratio, is sold first and alone. The business sells all four lines together in the present mix; the CVP assumption of a constant sales mix puts its break-even point on the straight profit line, whose slope is the overall P/V ratio. Read the break-even point off the line, not the path.

**(iii)** The point after the second segment: kulhad chai and premix alone earn a profit of **₹5,20,000** (contribution ₹11,20,000 − ₹6,00,000), ₹2,80,000 less than the ₹8,00,000 from all four lines. Every line has a positive contribution, so dropping any of them lowers profit unless fixed costs fall too; see [[cma.mc.decisions|short-term decisions]].
::::
:::::

## Under the hood

### Why the profit line, not the path, gives the break-even point

The path's first segment crosses zero at ₹10,00,000 of sales, but that is break-even only if Tapri sold nothing but kulhad chai. The break-even point of the business assumes the *mix* stays as it is (the CVP assumption of a constant sales mix), so it lies on the straight line through −F and the final total, whose slope is the overall P/V ratio. ICAI's illustration takes the products in the order given (SM 14.24–14.25), which there is also highest P/V ratio first; the example here takes them in descending order of P/V ratio, so the path bends downwards. The composite break-even arithmetic is in [[cma.mc.multiproduct|multi-product break-even analysis]].

### Units or rupees along the bottom

ICAI draws both. With units, the sales line's slope is the price and the profit line's slope the contribution per unit; with sales value (Illustration 6), the profit line's slope is the P/V ratio. The break-even point and margin of safety read the same either way.

### What the charts cannot do

The limitations of break-even analysis and break-even charts stem mostly from the CVP assumptions (SM 14.25): costs are drawn as straight lines, the selling price as constant at every level, stocks as constant from period to period, and activity as the only factor moving cost, whereas inflation and other factors move it too. A chart drawn far outside the relevant range is a picture of the assumptions, not of the business.

### The angle on the chart

On the break-even chart the angle at which the sales line cuts the total cost line is the **angle of incidence**; the wider it is, the faster profit is earned after the break-even point. It is read off the chart, not calculated: see [[cma.mc.bep|break-even point and angle of incidence]].

## Exam angle

### What ICAI has asked

::: exam Charts in the papers, May 2024 to September 2026
A search of the text of all 55 new-scheme Paper 4 documents (past papers with suggested answers, RTPs, MTPs) and all 56 old-scheme Paper 3 documents found no question that asks you to draw a chart. The chart questions are the Study Material's own: theory question 1, "EXPLAIN and ILLUSTRATE break-even point with the help of break-even chart"; practical problem 13, "DRAW a break-even chart showing the break-even point" and the new BEP after a price cut; Illustration 5, "DRAW a break-even chart showing contribution and profit"; Illustration 6, "PREPARE a profit graph"; Example 5, two profit-volume lines on one graph.

The numbers behind the charts are asked all the time: January 2025 Q1(a)(ii), the sales level at which two machines are equally profitable (where two profit lines cross, 2 marks); old-scheme RTP November 2023 Q12(b), which of two processes gives more profit at the expected volume; MTP Series I for September 2025 Q1(c), the P/V ratio, BEP and margin of safety of a first half-year, then the sales of a loss-making second half (4 marks).
:::

::: exam If a chart is asked: what ICAI's own solved charts show
With no chart in a recent paper there is no suggested answer to copy; the Study Material's solved charts (Example 5, Illustrations 5 and 6, practical problem 13) carry these elements:
- The workings for each line (the profit at the chosen volume, the BEP), then the graph.
- Both axes labelled with what they measure and the unit ("Cost and Revenue (₹ '00000)", "Output ('000 units)"), on an even scale; a title where there are two situations.
- Every line named on the chart ("Sales line", "Total cost line", "Fixed cost line"); the BEP labelled, with a dotted line dropped to the activity axis.
- The readings asked for written out below the chart, with their arithmetic.
- A comment when the question compares two positions: ICAI's Example 5 comment names the BEP of each, the volume above which one is better, and which option gives the larger profit at the budgeted volume.
:::

::: trick Two points, never more
Every line on these charts is straight: compute it at zero and at maximum activity and join them. On the P/V chart the two points can be (0, −F) and the BEP, or (0, −F) and the profit at the expected volume (SM 14.22). Condition: the CVP assumptions (linear costs and revenue in the relevant range).
:::

## Answer frame

### "Explain the profit-volume chart and its advantage"

1. **What it plots:** profit and loss on the vertical axis, the horizontal axis drawn at zero profit, activity (units or sales) along it.
2. **How it is drawn:** a line from the loss at nil activity (equal to the fixed cost) to the profit at a given level or the BEP.
3. **Reading:** the BEP where the line cuts the horizontal axis; profit or loss at any activity as the height of the line.
4. **Advantage (ICAI's "biggest"):** it depicts clearly the effect on profit and the break-even point of any change in the variables (price, variable cost, fixed cost), by drawing a second line on the same graph.
5. **A labelled sketch with figures.**

### "Distinguish the break-even chart from the contribution break-even chart"

| Point | Break-even chart | Contribution break-even chart |
|---|---|---|
| Lines drawn | fixed cost, total cost, sales | variable cost, total cost, sales |
| Bottom line | horizontal at fixed cost | from the origin (variable cost) |
| Contribution | cannot be read (its major limitation) | gap between sales and variable cost lines |
| Fixed cost | height of the fixed cost line | constant gap between total cost and variable cost lines |
| BEP and profit | read in the same way on both | read in the same way on both |

For "Explain and illustrate the break-even point with a break-even chart", use the frame in [[cma.mc.bep|the break-even lesson]].

### Three answers to "Draw a break-even chart"

::: cols
**Loses marks**

A freehand sketch, unlabelled axes, the BEP circled but no figures.

The examiner cannot tell which line is which or check any reading.
---
**Passes**

Lines plotted to scale and the BEP figure written in.

No working notes for the points, axes without units, no margin of safety or profit shown.
---
**Full marks**

Working-note table of points; titled chart, labelled axes with units and an even scale; every line named; BEP labelled, with a dotted line to the activity axis; the readings asked for, with an arithmetic check; a comment if a change is compared.
:::

## Common mistakes

::: mistake Hall of Shame: the total cost line that left from the origin
Drawing total cost from zero, so it never sits above the sales line and the "break-even point" lands at the origin. **Fix:** total cost starts at the fixed cost on the vertical axis; only the sales line (and the variable cost line) leave the origin.
:::

::: mistake Contribution read off the wrong chart
Measuring "contribution" on a conventional break-even chart as the gap between sales and fixed cost. That gap is sales minus fixed cost, which means nothing. **Fix:** contribution needs a variable cost line: draw a contribution break-even chart and read sales minus variable cost.
:::

::: mistake The P/V line that started at zero
Starting the profit line at the origin, as if there were no fixed cost. **Fix:** at nil activity the loss equals the fixed cost; start at −F.
:::

::: mistake The profit path's first crossing called the break-even point
Reading ₹10,00,000 off the four-line graph. **Fix:** the break-even point of the mix is where the straight profit line from −F to the final profit cuts the axis (₹15,00,000).
:::

## Practice

::: quiz Check yourself
Q: On a profit-volume chart, Tapri's delivery kitchen shows a loss of ₹3,60,000 at zero activity and a profit of ₹2,40,000 at 40,000 meals. At how many meals does it break even?
= 24000
> The line rises ₹6,00,000 over 40,000 meals: ₹15 a meal, the contribution per meal. BEP = ₹3,60,000 ÷ ₹15 = 24,000 meals.

Q: On a conventional break-even chart, what does the vertical gap between the total cost line and the fixed cost line measure at a given activity?
- [ ] Contribution
- [x] Total variable cost
- [ ] Profit
- [ ] Margin of safety
> Total cost = fixed cost + variable cost, so the gap above the fixed cost line is the variable cost. Contribution needs the contribution break-even chart (sales minus variable cost).

Q: Case scenario. Ritu draws two profit-volume lines for the cold-chain division: the present fleet, and a proposal with refrigerated trucks that has higher fixed costs and a lower variable cost per crate. The lines cross at 1,20,000 crates; next year's expected volume is 90,000 crates. Which of these is correct?
- [ ] The proposal is better, because its line is steeper
- [x] The present fleet earns more profit at 90,000 crates
- [ ] Both earn the same at 90,000 crates, because the BEP does not depend on volume
- [ ] The proposal's break-even point must be lower than the present one
> Below the crossing point the line with the lower fixed cost (the present fleet) is higher. The proposal's steeper line overtakes it only above 1,20,000 crates. A higher fixed cost with a higher contribution per unit can give a higher or lower BEP.

Q: Tapri's fixed costs rise by ₹2,00,000 with price and variable cost unchanged. What happens to the line on its profit-volume chart?
- [ ] It becomes steeper
- [ ] It becomes flatter, starting from the same point
- [x] It moves down parallel to itself, so the break-even point moves right
- [ ] It does not move, because fixed costs are not on a P/V chart
> The slope is the contribution per unit, which has not changed; the starting loss is ₹2,00,000 larger, so the whole line drops by that amount and crosses zero later.

Q: Which lines start at the origin on a contribution break-even chart? Select all that apply.
- [x] Sales
- [x] Variable cost
- [ ] Total cost
- [ ] Fixed cost
> Sales and variable cost are both zero at zero activity. Total cost starts at the fixed cost, and a contribution chart has no separate fixed cost line.
:::

## Recap

- Break-even chart: rupees up the side, activity along the bottom; fixed cost (horizontal), total cost (from F), sales (from 0). BEP where sales cuts total cost.
- Contribution break-even chart: variable cost line from the origin instead of the fixed cost line; contribution = gap between sales and variable cost; fixed cost = constant gap between total cost and variable cost.
- Profit-volume chart: profit/loss up the side, horizontal axis at zero profit; the line starts at −F and cuts the axis at the BEP. Slope = contribution per unit (or the P/V ratio with sales value along the bottom).
- On the P/V chart, a price rise steepens the line (BEP left); a fixed cost rise drops it parallel (BEP right); volume moves along it.
- Two options cross where (F₂ − F₁) ÷ (C₂ − C₁) units: above it the higher-contribution (higher-fixed-cost) option wins, below it the lower-fixed-cost one.
- Several products: the profit path segments slope by each P/V ratio; the BEP is on the straight line from −F to the final profit.
- Every line needs two points; label axes, lines and the BEP, and write the readings.

## Flashcards

Q:: What does a break-even chart record on each axis (ICAI)?
A:: Costs and revenues on the vertical axis and the level of activity on the horizontal axis.

Q:: The three lines of a conventional break-even chart and where each starts?
A:: Fixed cost (horizontal at F), total cost (from F on the vertical axis), sales (from the origin).

Q:: How does a contribution break-even chart differ from a conventional one?
A:: It shows a variable cost line (from the origin) instead of the fixed cost line, so contribution can be read as the gap between the sales and variable cost lines.

Q:: ICAI's stated major limitation of the conventional break-even chart?
A:: It cannot be used to measure contribution.

Q:: On a profit-volume chart, what is the loss at nil activity?
A:: Equal to the fixed cost.

Q:: On a profit-volume chart, where is the break-even point?
A:: Where the profit line intersects the horizontal (zero profit) axis.

Q:: The biggest advantage of the profit-volume chart (ICAI)?
A:: It depicts clearly the effect on profit and the break-even point of any changes in the variables.

Q:: Slope of the profit line on a P/V chart?
A:: Contribution per unit with units on the horizontal axis; the P/V ratio with sales value on it.

Q:: Effect of an increase in fixed cost on the profit-volume line?
A:: It moves down parallel to itself; the break-even point moves to the right.

Q:: Volume at which two options earn equal profit?
A:: Difference in fixed costs ÷ difference in contribution per unit.

Q:: In a multi-product profit graph, which line gives the break-even point?
A:: The straight profit line from the loss at zero (fixed cost) to the final total profit, whose slope is the overall P/V ratio; not the profit path.
