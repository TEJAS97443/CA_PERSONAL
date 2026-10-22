---
id: cma.mc.absorb
title: Marginal versus absorption costing and profit reconciliation
minutes: 32
needs: cma.mc.basics, cma.oh.underover
tags: absorption costing, marginal costing, stock valuation, profit reconciliation, under-absorption, period cost, product cost
labs: cvp
summary: Why the two methods report different profits when stock changes, ICAI's income statement for each, and how to reconcile them through the fixed overhead in opening and closing stock.
---

## In plain words

### The rent that hid in the kulhads

Tapri's kulhad factory made 10,000 cups this month and sold 8,000 at ₹15. Each cup uses ₹6 of clay, labour and firing; the factory's fixed overhead (rent, kiln lease, supervisor) is ₹40,000 a month, which the finance team absorbs at ₹4 a cup over the normal 10,000 cups.

> **Kesar:** Ritu's report says the kulhad unit made ₹32,000 this month. The finance team says ₹40,000. Same cups, same month. Whom do I believe?
> **Ritu:** Both, once you count the shelf. Finance put ₹4 of this month's rent into each of the 2,000 cups still in the godown, so ₹8,000 of rent is waiting there for next month. I charged the whole ₹40,000 to this month.
> **Kesar:** So the rent is hiding in the kulhads.
> **Ritu:** Until they are sold. Then it comes out again.

The finance team uses **absorption costing**: every production cost, fixed and variable, is charged to the products, so a cup in stock carries ₹6 + ₹4 = ₹10. Ritu uses **marginal costing**: a cup carries only its ₹6 of variable cost, and the fixed overhead is a **period cost**, charged in full to the month in which it is incurred.

Sales are the same, the variable costs of the 8,000 cups sold are the same; the only difference is where ₹8,000 of fixed overhead sits this month. When the factory makes exactly what it sells, both methods show the same profit. When stock builds up, absorption costing shows more; when stock runs down, marginal costing shows more.

::: analogy Tonight's gas, tomorrow's tiffin
You cook tonight and pack tomorrow's tiffin. Was the gas you burnt tonight's expense or part of tomorrow's lunch? Put a share of it into the tiffin and tonight's kitchen looks cheaper; charge it all tonight and tomorrow's lunch looks cheaper. The gas bill is the same either way; only the day that carries it changes.
:::

::: key
The two methods differ only in fixed production overhead. Absorption costing carries part of it forward in closing stock (and brings last period's part back with opening stock); marginal costing charges all of it to the period. So the difference in profit is exactly the fixed overhead in closing stock minus the fixed overhead in opening stock.
:::

## How it works

### Where each cost goes

ICAI draws the two approaches as two routes (SM 14.43):

| Cost | Absorption costing | Marginal costing |
|---|---|---|
| Direct materials, direct labour, variable factory overhead | cost of goods produced; expense when the goods are sold | the same |
| Fixed factory overhead | cost of goods produced; expense when the goods are sold | expense when incurred (period cost) |
| All selling and administration overhead | expense when incurred | expense when incurred |

So under absorption costing the product (inventoriable) cost is total manufacturing cost, variable and fixed; under marginal costing it is variable manufacturing cost only (SM 1.35).

::: diagram The kulhad month: where ₹40,000 of fixed overhead goes
{"type": "tree", "root": {"label": "Fixed factory overhead\n₹40,000", "color": "c", "children": [
  {"label": "Absorption costing", "color": "a", "children": [
    {"label": "8,000 sold\n₹32,000 now", "color": "a"},
    {"label": "2,000 in stock\n₹8,000 later", "color": "d"}]},
  {"label": "Marginal costing", "color": "b", "children": [
    {"label": "Period cost\n₹40,000 now", "color": "b"}]}]},
 "caption": "Absorption costing charges this month only the ₹4 a cup on the cups sold and carries ₹8,000 forward in closing stock; marginal costing charges all ₹40,000 now. Absorption profit ₹40,000; marginal profit ₹32,000; difference ₹8,000 = 2,000 cups × ₹4."}
:::

### Six steps through an absorption-versus-marginal question

::: steps
1. **Fixed production overhead absorption rate** = budgeted fixed production overhead ÷ normal (budgeted) output. ICAI's Illustration 14: ₹1,60,000 ÷ 800 units = ₹200 a unit (SM 14.47).
2. **Stock movement in units**: closing stock = opening stock + production − sales, period by period.
3. **Unit costs**: absorption = variable production cost + the absorption rate; marginal = variable production cost only. Opening stock is valued at the previous period's cost, closing stock at the current period's (SM 14.45).
4. **Under- or over-absorption** (absorption costing only) = actual fixed production overhead − overhead absorbed (units *produced* × rate). It is added to (under) or deducted from (over) cost of goods sold. Marginal costing charges the actual fixed overhead, so none arises (see [[cma.oh.underover|under- and over-absorption]]).
5. **Selling and administration costs** are charged to the period under both; under marginal costing the variable ones are deducted before contribution.
6. **Reconcile**: absorption profit + fixed overhead in opening stock − fixed overhead in closing stock = marginal profit.
:::

### Which profit is higher? ICAI's four cases (SM 14.44)

::: diagram Which method shows the higher profit
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "Compare the stocks"},
  {"id": "n", "kind": "decision", "label": "Any opening or closing stock?"},
  {"id": "e0", "kind": "end", "label": "Equal profit", "color": "mute"},
  {"id": "q", "kind": "decision", "label": "Closing = opening?"},
  {"id": "e1", "kind": "end", "label": "Equal profit*", "color": "mute"},
  {"id": "m", "kind": "decision", "label": "Closing more?"},
  {"id": "a", "kind": "end", "label": "Absorption higher", "color": "a"},
  {"id": "b", "kind": "end", "label": "Marginal higher", "color": "b"}
 ],
 "edges": [["s", "n"], ["n", "e0", "no"], ["n", "q", "yes"], ["q", "e1", "yes"], ["q", "m", "no"], ["m", "a", "yes"], ["m", "b", "no"]],
 "caption": "Closing stock more than opening means production exceeded sales. *Equal only if the fixed cost in both stocks is the same amount."}
:::

1. **No opening and closing stock**: profit is equal under both.
2. **Opening stock equal to closing stock**: profit is equal, provided the fixed cost element in both stocks is the same amount.
3. **Closing stock more than opening stock** (production more than sales): absorption profit is higher, because part of the fixed overhead in closing stock is carried forward to the next period.
4. **Opening stock more than closing stock** (production less than sales): marginal profit is higher, because fixed cost of the preceding period comes into this period's cost of goods sold through the opening stock.

::: lab cvp {"mode":"absorb","absPeriods":[["Q1",12000,9000],["Q2",9000,11000]]}
Step through two quarters of Tapri's samosa factory: stock builds up in the first and runs down in the second, so the higher profit switches sides.
:::

## Formats and formulas

ICAI's two income statements (SM 14.45–14.46); the absorption one runs down the same lines as [[cma.sheet.mfg|the cost sheet]]. *Reproduce both layouts from memory; the order of the lines is what earns the format marks.*

**Income Statement (Absorption costing)**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| **Sales** | | xxx |
| Production costs: | | |
| Direct material consumed | | xxx |
| Direct labour cost | | xxx |
| Variable manufacturing overhead | | xxx |
| Fixed manufacturing overhead | | xxx |
| **Cost of production** | | **xxx** |
| Add: Opening stock of finished goods (at cost of previous period's production) | | xxx |
| Less: Closing stock of finished goods (at production cost of current period) | | xxx |
| **Cost of goods sold** | | **xxx** |
| Add (or less): Under (or over) absorption of fixed manufacturing overhead | | xxx |
| Add: Administration costs | xxx | |
| Add: Selling and distribution costs | xxx | xxx |
| **Total cost** | | **xxx** |
| **Profit (Sales − Total cost)** | | **xxx** |

**Income Statement (Marginal costing)**

| Particulars | Amount (₹) |
|---|---:|
| **Sales** | xxx |
| Variable manufacturing costs: | |
| – Direct material consumed | xxx |
| – Direct labour | xxx |
| – Variable manufacturing overhead | xxx |
| **Cost of goods produced** | **xxx** |
| Add: Opening stock of finished goods (at cost of previous period) | xxx |
| Less: Closing stock of finished goods (at current variable cost) | xxx |
| **Cost of goods sold** | **xxx** |
| Add: Variable administration, selling and distribution overhead | xxx |
| **Total variable cost** | **xxx** |
| **Contribution (Sales − Total variable cost)** | **xxx** |
| Less: Fixed costs (production, administration, selling and distribution) | xxx |
| **Net profit** | **xxx** |

Under marginal costing the contributions of the various products are pooled, and the fixed overheads are met out of this total contribution, which is also known as **gross margin** (SM 14.46). ICAI's printed statement also has a line "Add: Selling and distribution costs" with no amount between total variable cost and contribution; variable selling costs are already in the line above and fixed ones below, so nothing is entered there.

**Reconciliation of profits** (the layout of ICAI's suggested answers: SM practical problem 17, MTP Series I for May 2024 Q4(a)(iii))

| Particulars | Amount (₹) |
|---|---:|
| Profit as per absorption costing | xxx |
| Add: Fixed overhead in opening stock (opening stock under-valued in marginal costing) | xxx |
| Less: Fixed overhead in closing stock (closing stock under-valued in marginal costing) | xxx |
| **Profit as per marginal costing** | **xxx** |

::: lab cvp {"mode":"absorb","aprice":2000,"vcp":800,"vcs":400,"fop":40000,"normal":200,"fos":60000,"absPeriods":[["Quarter 1",220,160]]}
Fill the layout in on Study Material Illustration 14's first quarter: both income statements line by line, then the reconciliation through the fixed overhead in stock.
:::

::: formula Fixed production overhead absorption rate
$$\text{Rate per unit} = \frac{\text{Budgeted fixed production overhead}}{\text{Normal (budgeted) output}}$$
:::

::: formula Under- or over-absorption
$$\text{Under (+) / over (−) absorption} \qquad = \text{Actual fixed production overhead} \qquad - \text{Units produced} \times \text{Rate}$$
:::

::: formula Difference in profit
$$\text{Absorption profit} - \text{Marginal profit} \qquad = \text{Fixed overhead in closing stock} \qquad - \text{Fixed overhead in opening stock}$$
Each stock's fixed overhead at the rate at which it was valued: closing stock at this period's rate, opening stock at the previous period's.
:::

::: definition Absorption costing
Absorption costing is the practice of charging all costs, both variable and fixed to operations, processes or product. (SM 14.9) In it, fixed expenses are distributed over products on the basis of a pre-determined level of output, which leads to over- or under-recovery as actual output differs from the estimate. (SM 14.9)
:::

::: definition Product (inventoriable) costs
Under marginal costing, ==variable manufacturing costs== and under absorption costing, ==total manufacturing costs (variable and fixed)== constitute inventoriable or product costs. (SM 1.35)
:::

## Worked examples

::::: example The bonus that lived in the godown
Tapri's frozen paratha unit sells 4,00,000 packs a year at ₹50. Variable production cost is ₹28 a pack and variable selling cost ₹2 a pack sold. Fixed production overheads are ₹24,00,000 a year (actual as budgeted), absorbed on a normal output of 4,00,000 packs; fixed selling and administration overheads are ₹8,00,000. There is no opening stock.

The unit manager's bonus is 5% of the profit in the absorption costing report. The plan is to produce 4,00,000 packs. Near the year-end the manager proposes to produce 4,60,000 instead, "to use the spare freezer space"; the extra 60,000 packs will be in stock on 31 March, and sales will not change.

**Required:**

(i) Prepare the profit statement under absorption costing for the plan and for the manager's proposal.

(ii) Prepare the profit statement under marginal costing for both.

(iii) Reconcile the profits, calculate the manager's bonus in each case, and comment.

:::: answer Show the working
**Working notes**

1. Absorption rate = ₹24,00,000 ÷ 4,00,000 = **₹6** a pack; full production cost = ₹28 + ₹6 = **₹34** a pack.
2. Under the proposal, overhead absorbed = 4,60,000 × ₹6 = ₹27,60,000 against actual ₹24,00,000: **over-absorbed ₹3,60,000**.
3. Closing stock under the proposal = 60,000 packs: ₹20,40,000 at ₹34 (absorption) or ₹16,80,000 at ₹28 (marginal).

**(i) Statement of profit under absorption costing**

| Particulars | Plan (₹) | Proposal (₹) |
|---|---:|---:|
| Sales (4,00,000 × ₹50) (A) | 2,00,00,000 | 2,00,00,000 |
| Cost of production @ ₹34 (4,00,000 / 4,60,000 packs) | 1,36,00,000 | 1,56,40,000 |
| Less: Closing stock @ ₹34 | — | (20,40,000) |
| **Cost of goods sold** | **1,36,00,000** | **1,36,00,000** |
| Less: Over-absorption (WN 2) | — | (3,60,000) |
| Add: Variable selling cost @ ₹2 | 8,00,000 | 8,00,000 |
| Add: Fixed selling and administration | 8,00,000 | 8,00,000 |
| **Cost of sales (B)** | **1,52,00,000** | **1,48,40,000** |
| **Profit (A − B)** | **48,00,000** | **51,60,000** |

**(ii) Statement of profit under marginal costing**

| Particulars | Plan (₹) | Proposal (₹) |
|---|---:|---:|
| Sales | 2,00,00,000 | 2,00,00,000 |
| Variable cost of production @ ₹28 | 1,12,00,000 | 1,28,80,000 |
| Less: Closing stock @ ₹28 | — | (16,80,000) |
| **Variable cost of goods sold** | **1,12,00,000** | **1,12,00,000** |
| Add: Variable selling cost | 8,00,000 | 8,00,000 |
| **Contribution** | **80,00,000** | **80,00,000** |
| Less: Fixed production overheads | 24,00,000 | 24,00,000 |
| Less: Fixed selling and administration | 8,00,000 | 8,00,000 |
| **Profit** | **48,00,000** | **48,00,000** |

**(iii) Reconciliation and bonus**

| Particulars | Plan (₹) | Proposal (₹) |
|---|---:|---:|
| Profit under absorption costing | 48,00,000 | 51,60,000 |
| Less: Fixed overhead in closing stock (60,000 × ₹6) | — | (3,60,000) |
| **Profit under marginal costing** | **48,00,000** | **48,00,000** |
| Manager's bonus at 5% of absorption profit | 2,40,000 | 2,58,000 |

::: diagram The paratha unit: profit under each method
{"type": "plot", "h": 280, "x": [0.4, 2.6], "y": [0, 6000000],
 "xlabel": "production plan", "ylabel": "profit (₹)",
 "xticks": [[1, "Plan: 4,00,000"], [2, "Proposal: 4,60,000"]],
 "yticks": [[0, "0"], [2000000, "20,00,000"], [4000000, "40,00,000"], [6000000, "60,00,000"]],
 "series": [
  {"label": "absorption costing", "bars": true, "bw": 0.3, "values": true, "color": "a", "pts": [[0.84, 4800000, "48,00,000"], [1.84, 5160000, "51,60,000"]]},
  {"label": "marginal costing", "bars": true, "bw": 0.3, "values": true, "color": "b", "pts": [[1.16, 4800000, "48,00,000"], [2.16, 4800000, "48,00,000"]]}
 ],
 "legend": "outside",
 "caption": "Blue: absorption costing; teal: marginal costing. Sales are the same under both plans; only the absorption profit moves with the extra production."}
:::

**Comment.** Producing 60,000 packs for stock raises the absorption profit by ₹3,60,000, the fixed overhead carried forward in closing stock, and the manager's bonus by ₹18,000, though not one extra pack is sold. The company spends ₹16,80,000 more on variable production for packs that sit in the freezer, and next year's profit will bear the ₹3,60,000 when they are sold. Marginal costing profit moves with sales, not production (SM 14.10): a bonus based on marginal costing profit, or a cap on closing stock, removes the incentive to produce for stock.
::::
:::::

:::: example Same stock, different profits: the chai premix year
Tapri's chai premix factory, 2025-26: selling price ₹150 a box; variable production cost ₹80 a box (the same as last year); variable selling cost ₹6 a box; fixed selling overheads ₹10,00,000. Fixed production overheads rose to ₹24,00,000 (₹19,20,000 last year) after a new plant lease; both years they are absorbed on a normal output of 1,60,000 boxes, and actual equalled budget. The opening stock of 12,000 boxes was made last year. During the year 1,50,000 boxes were produced and 1,50,000 sold, so 12,000 boxes, all from this year's production, remain at the year-end (FIFO).

Dev, reading the two reports: "The stock did not change, so the profits must be equal. One of you has made an error."

**Required:**

(i) Calculate the profit for the year by absorption costing and by marginal costing.

(ii) Reconcile the two profits, and comment on Dev's remark.

::: answer Show the working
**Working notes**

1. Absorption rates: last year ₹19,20,000 ÷ 1,60,000 = **₹12** a box; this year ₹24,00,000 ÷ 1,60,000 = **₹15** a box.
2. Stock values: opening 12,000 boxes at ₹80 + ₹12 = ₹92 (absorption ₹11,04,000; marginal ₹9,60,000); closing 12,000 boxes at ₹80 + ₹15 = ₹95 (absorption ₹11,40,000; marginal ₹9,60,000).
3. Overhead absorbed = 1,50,000 × ₹15 = ₹22,50,000 against actual ₹24,00,000: **under-absorbed ₹1,50,000**.

**(i) Income statement (absorption costing)**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Sales (1,50,000 × ₹150) | | 2,25,00,000 |
| Cost of production (1,50,000 × ₹95) | 1,42,50,000 | |
| Add: Opening stock (12,000 × ₹92) | 11,04,000 | |
| Less: Closing stock (12,000 × ₹95) | (11,40,000) | |
| **Cost of goods sold** | **1,42,14,000** | |
| Add: Under-absorbed fixed production overhead (WN 3) | 1,50,000 | |
| Add: Variable selling cost (1,50,000 × ₹6) | 9,00,000 | |
| Add: Fixed selling overheads | 10,00,000 | 1,62,64,000 |
| **Profit** | | **62,36,000** |

**Income statement (marginal costing)**

| Particulars | Amount (₹) |
|---|---:|
| Sales | 2,25,00,000 |
| Variable cost of production (1,50,000 × ₹80) | 1,20,00,000 |
| Add: Opening stock (12,000 × ₹80) | 9,60,000 |
| Less: Closing stock (12,000 × ₹80) | (9,60,000) |
| Add: Variable selling cost | 9,00,000 |
| **Total variable cost** | **1,29,00,000** |
| **Contribution** | **96,00,000** |
| Less: Fixed production overheads | 24,00,000 |
| Less: Fixed selling overheads | 10,00,000 |
| **Profit** | **62,00,000** |

**(ii) Reconciliation**

| Particulars | Amount (₹) |
|---|---:|
| Profit as per absorption costing | 62,36,000 |
| Add: Fixed overhead in opening stock (12,000 × ₹12) | 1,44,000 |
| Less: Fixed overhead in closing stock (12,000 × ₹15) | (1,80,000) |
| **Profit as per marginal costing** | **62,00,000** |

**Comment.** Dev is not right, and neither report is wrong. When opening and closing stocks are equal, the two profits are equal only if the fixed cost element in both stocks is the same amount (SM 14.44). Here the stock quantity is unchanged, but the opening boxes carry last year's ₹12 of fixed overhead and the closing boxes this year's ₹15, because the lease raised the fixed overheads. Absorption costing carries ₹36,000 more fixed overhead out of the year than it brought in, so its profit is ₹36,000 higher. The variable cost per box did not change, so marginal costing's stocks cancel exactly.
:::
::::

## Under the hood

### The argument behind the two numbers

Advocates of marginal costing say its profit is the realistic one: stock is carried at marginal cost and fixed expenses are written off as period costs, so profit moves with sales, not with production (SM 14.10, advantage 3). A manager judged on absorption profit can raise this period's profit by producing for stock. The other side is in ICAI's limitations of marginal costing: fixed overheads cannot be wholly excluded from work-in-progress, particularly in large contracts, and stocks and work-in-progress are understated (SM 14.10–14.11, limitations 4 and 7).

### Over or under, it is always actual that reaches profit

Absorption costing charges fixed production overhead in two places: the absorbed amount in cost of production, and the under- or over-absorption below cost of goods sold. Together they bring the period's charge back to the actual overhead, apart from the part held in stock. That is why the reconciliation needs only the fixed overhead in stocks, and why marginal costing, which charges the actual overhead directly, has no under- or over-recovery to deal with (SM 14.9–14.10, advantage 2). The absorption-rate mechanics are in [[cma.oh.absorb|absorption rates]].

### Stock at production cost, never at selling price

Both methods value stock at cost (full production cost or variable production cost), never at selling price, and the difference between them per unit is always the fixed production overhead rate. Variable selling and distribution costs are excluded from stock under both (SM 14.5, 14.43).

ICAI's chapter summary words absorption costing more widely: absorbed cost "includes production cost as well as administrative and other cost" (SM 14.49). That is a cost sheet's total cost, as in September 2025 MCQ 6. For stock values and the income statement, administration and selling costs go to the period (SM 14.43, 14.45).

## Exam angle

### What ICAI has asked

::: exam Where the topic appeared, May 2024 to September 2026
In the documents read for this lesson, marginal versus absorption costing came up in 10 places in 9 documents.

- **Profit statements under both methods, 6–10 marks.** MTP Series I for May 2024 Q4(a): three months of production and sales, profit statements by absorption and by marginal costing and a reconciliation (10 marks). MTP Series I for May 2025 Q5(a): profit for a quarter by both methods, from annual data at a 100% activity level (3 + 3 marks), the pattern of the Study Material's Illustration 14.
- **Multiple choice, 2 marks.** September 2025 MCQ 6: "Cost of production" and "Total Cost" as per absorption costing (cost of production: all manufacturing costs, fixed included; total cost: every cost, administration and selling included). MTP Series II for May 2025, MCQ case: total variable cost and fixed cost as per the marginal costing income statement.
- **Theory.** "Differentiate between Marginal and Absorption Costing" (old-scheme November 2020 Q6(e), 5 marks), answered with the Study Material's five points. Product costs "under marginal costing, variable manufacturing costs and under absorption costing, total manufacturing costs": RTP May 2025 Q20(a) ("DEFINE Product costs"), and as an answer point in MTP Series I for May 2025 Q6(a), RTP January 2026 Q19(a), MTP Series II for September 2026 Q6(b) and RTP May 2026 Q17(a).
:::

::: exam The traps ICAI builds in
- The absorption rate uses **normal** output, not actual (SM practical problem 17: 90% of capacity; MTP Series I for May 2025 Q5(a): normal level 4,400 units).
- Under- or over-absorption is based on units **produced**, not sold, and appears only in the absorption statement.
- Quarterly questions with annual data: fixed costs are a quarter of the year's (Illustration 14; MTP Series I for May 2025 Q5(a)).
- Opening stock at the **previous** period's cost, closing stock at the **current** period's (SM practical problem 17: opening stock at ₹13, the standard ₹11 + ₹2).
- The SM's own MCQs 4–6: sales = production gives equal profits (ICAI's key answer; it assumes the same fixed cost per unit in both stocks, which the chai premix example breaks); sales more than production gives higher marginal profit; the main difference is the treatment of fixed overheads.
:::

::: trick The one-line reconciliation
Profit difference = (closing stock units × fixed rate in closing stock) − (opening stock units × fixed rate in opening stock). Compute it first: it checks both statements before you have finished either. Condition: under- or over-absorption written off to the period, as ICAI's format does.
:::

## Answer frame

### "Discuss the points of difference between absorption costing and marginal costing" (ICAI's five, in order)

::: compare
| No. | Marginal costing | Absorption costing |
|---|---|---|
| 1 | Only variable costs are considered for product costing and inventory valuation. | Both fixed and variable costs are considered for product costing and inventory valuation. |
| 2 | Fixed costs are regarded as period costs; the profitability of different products is judged by their P/V ratio. | Fixed costs are charged to the cost of production; each product bears a reasonable share of fixed cost, so its profitability is influenced by the apportionment of fixed costs. |
| 3 | Cost data presented highlight the total contribution of each product. | Cost data are presented in the conventional pattern; net profit of each product is determined after subtracting fixed cost along with variable costs. |
| 4 | The difference in the magnitude of opening and closing stock does not affect the unit cost of production. | The difference in the magnitude of opening and closing stock affects the unit cost of production due to the impact of related fixed cost. |
| 5 | Cost per unit remains the same irrespective of production, as it is valued at variable cost. | Cost per unit reduces as production increases, because fixed cost per unit falls while variable cost per unit stays the same. |
:::

(SM 14.43–14.44) Add the difference in profit (the four cases) when the question asks about profits.

### "Explain the difference in profit": the frame

1. **The cause:** the difference in stock valuation; under absorption costing stock carries fixed production overhead.
2. **The case that applies:** closing stock more than opening (absorption higher), less (marginal higher), equal (equal profits if the fixed cost in both stocks is the same).
3. **The amount:** fixed overhead in closing stock − fixed overhead in opening stock, with figures.
4. **The reconciliation statement**, from absorption profit to marginal profit.

### Three answers to the paratha-bonus question

::: cols
**Loses marks**

Profits for both plans with no working notes, closing stock valued at ₹34 under both methods.

Wrong stock value under marginal costing, and no way to award method marks.
---
**Passes**

Both statements correct, but no reconciliation and no explanation.

Part (iii) carries marks of its own.
---
**Full marks**

Working notes (unit costs, stock in units, under/over absorption); both statements in ICAI's layout; the reconciliation; the bonus; a comment naming the case (closing stock above opening) and its ₹ effect.
:::

## Common mistakes

::: mistake Hall of Shame: the commission that went into the godown
Valuing closing stock with the ₹2 selling cost included (₹36 or ₹30 a pack). **Fix:** stock is valued at production cost only, under both methods; selling costs are charged to the period.
:::

::: mistake Under-absorption counted on the packs sold
Working the proposal's absorbed overhead as 4,00,000 packs sold × ₹6 = ₹24,00,000, "nil" under- or over-absorption, instead of an over-absorption of ₹3,60,000. **Fix:** overhead is absorbed into production, so use units produced (4,60,000).
:::

::: mistake Under-absorption put into the marginal costing statement
Adding the chai premix factory's ₹1,50,000 under-absorption to the marginal statement as well. **Fix:** marginal costing charges actual fixed overhead (₹24,00,000) in full; no absorption, so nothing is under- or over-absorbed.
:::

::: mistake "Equal stocks, so equal profits"
Writing, as Dev did, that the chai premix profits must be equal because opening and closing stocks are both 12,000 boxes. **Fix:** equal only if the fixed cost in both stocks is the same amount; here ₹12 against ₹15 a box makes a ₹36,000 difference.
:::

## Practice

::: quiz Check yourself
Q: Tapri's cookie unit had an opening stock of 3,000 jars and a closing stock of 7,000 jars, both carrying fixed production overhead of ₹20 a jar. Its profit under marginal costing was ₹4,20,000. What was its profit under absorption costing (₹)?
= 500000
> Absorption profit = marginal profit + fixed overhead in closing stock − fixed overhead in opening stock = ₹4,20,000 + ₹1,40,000 − ₹60,000 = ₹5,00,000. Stock rose, so absorption profit is higher.

Q: Case scenario. In March, Tapri's samosa factory sold more packs than it produced, with fixed production overhead absorbed at the same rate as in February. Dev's absorption costing report shows a profit of ₹3,10,000; Ritu's marginal costing report shows ₹3,40,000. Kesar asks which statement is correct.
- [ ] Ritu has made an error, because absorption costing always shows the higher profit
- [x] Both can be right: stock fell, so ₹30,000 more fixed overhead came into March's cost with the opening stock than went out with the closing stock
- [ ] The ₹30,000 is March's under-absorbed overhead, which marginal costing ignores
- [ ] The difference shows that the closing stock was valued at selling price
> When sales exceed production, opening stock is more than closing stock and marginal profit is higher (SM 14.44, case 4). Under-absorption is charged to the period under absorption costing and actual overhead under marginal costing, so it is not the difference.

Q: Under absorption costing, which costs are included in the value of closing stock of finished goods? Select all that apply.
- [x] Direct materials
- [x] Fixed manufacturing overhead absorbed
- [ ] Fixed selling and distribution overhead
- [ ] Variable selling commission
> Absorption costing values stock at total manufacturing cost, variable and fixed. Selling and distribution costs, fixed or variable, are period costs under both methods.

Q: Tapri's kulhad unit started April with no stock, made 12,000 cups and sold all of them. Its fixed factory overhead was under-absorbed by ₹6,000. How do its April profits under the two methods compare?
- [ ] Absorption profit is ₹6,000 lower, because of the under-absorption
- [ ] Absorption profit is ₹6,000 higher, because the overhead was under-absorbed
- [x] The two profits are equal
- [ ] Marginal profit is higher by the fixed overhead absorbed in the cups sold
> No opening and no closing stock, so no fixed overhead is carried in or out (SM 14.44, case 1). The ₹6,000 under-absorption is added to cost in the absorption statement, so absorption costing too charges April with the actual fixed overhead, exactly as marginal costing does.

Q: Fixed production overhead budgeted at ₹24,00,000 for a normal output of 1,20,000 units; actual overhead ₹24,00,000; actual production 1,10,000 units. What is the under-absorption (₹)?
= 200000
> Rate = ₹24,00,000 ÷ 1,20,000 = ₹20 a unit; absorbed = 1,10,000 × ₹20 = ₹22,00,000; under-absorbed = ₹24,00,000 − ₹22,00,000 = ₹2,00,000. It is added to cost of goods sold in the absorption statement only.
:::

## Recap

- Absorption costing charges all costs, fixed and variable, to products; marginal costing values products and stock at variable cost and charges fixed costs to the period.
- Product (inventoriable) cost: total manufacturing cost under absorption, variable manufacturing cost under marginal. Selling and administration costs are period costs under both.
- Fixed production overhead rate = budgeted fixed production overhead ÷ normal output; under/(over) absorption = actual − units produced × rate, adjusted in the absorption statement only.
- No stock: equal profits. Equal stocks: equal profits if their fixed cost is the same amount. Closing more than opening: absorption higher. Opening more than closing: marginal higher.
- Absorption profit − marginal profit = fixed overhead in closing stock − fixed overhead in opening stock.
- Reconciliation: absorption profit + fixed overhead in opening stock − fixed overhead in closing stock = marginal profit.
- The five ICAI differences: inventory valuation, fixed cost as period cost (P/V ratio), contribution highlighted, stock levels and unit cost, unit cost and volume.

## Flashcards

Q:: ICAI's definition of absorption costing?
A:: The practice of charging all costs, both variable and fixed, to operations, processes or products.

Q:: Product (inventoriable) costs under marginal and under absorption costing?
A:: Marginal costing: variable manufacturing costs. Absorption costing: total manufacturing costs (variable and fixed).

Q:: Under absorption costing, when are selling and administration overheads charged?
A:: As expenses when incurred (period costs), like under marginal costing.

Q:: Profit when closing stock is more than opening stock?
A:: Absorption costing profit is higher, because part of the fixed overhead in closing stock is carried forward to the next period.

Q:: Profit when opening stock is more than closing stock?
A:: Marginal costing profit is higher, because fixed cost of the preceding period enters this period's cost of goods sold through opening stock.

Q:: Profit when opening and closing stocks are equal?
A:: Equal under both methods, provided the fixed cost element in both stocks is the same amount.

Q:: Formula: difference between absorption and marginal profit?
A:: Fixed overhead in closing stock − fixed overhead in opening stock.

Q:: Under- or over-absorption of fixed production overhead: on which units, and in which statement?
A:: Actual fixed production overhead − units produced × absorption rate; adjusted to cost of goods sold in the absorption costing statement only.

Q:: In ICAI's absorption costing income statement, at what value is opening stock and closing stock taken?
A:: Opening stock at the cost of the previous period's production; closing stock at the production cost of the current period.

Q:: The main difference between marginal and absorption costing is in the treatment of which cost?
A:: Fixed (production) overheads.

Q:: The five points of distinction between marginal and absorption costing (headings)?
A:: Inventory valuation; fixed cost as period cost vs charged to production; contribution highlighted vs conventional net profit; effect of stock levels on unit cost; unit cost constant vs falling with production.
