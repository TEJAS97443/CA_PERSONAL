---
id: cma.sheet.mfg
title: Cost sheet for a manufacturer (test fixture)
minutes: 12
needs: cma.intro.classify
tags: cost sheet, prime cost, works cost, break-even
labs:
summary: A test fixture (not shipped) that uses every container and several diagram types; md.test.js renders it.
---

## In plain words

Kesar Mehra wants to know what one box of Tapri chai premix really costs. Ritu adds the costs up in layers.

> **Kesar:** Profit is profit, no? Why do I need layers?
> **Ritu:** Per unit, please. Layers tell you where the money went.

::: analogy
A cost sheet is a recipe card read backwards: you start from the ingredients and stop at the price on the menu.
:::

::: key
Each layer of the cost sheet adds one kind of cost to the layer above it, so every subtotal answers a different question.
:::

## How it works

::: steps
1. Add direct materials, direct employee cost and direct expenses: that is the **prime cost**.
2. Add factory overheads to reach the **works cost**.
3. Add administration overheads for the **cost of production**.
:::

::: diagram How the layers stack
{"type": "flow", "nodes": [{"id": "p", "kind": "start", "label": "Prime cost"}, {"id": "w", "kind": "process", "label": "+ factory overheads = works cost"}, {"id": "c", "kind": "end", "label": "+ administration = cost of production"}], "edges": [["p", "w"], ["w", "c"]]}
:::

## Formats and formulas

| Particulars | Per unit (₹) | Total (₹) |
|---|---:|---:|
| Direct materials | 40 | 4,00,000 |
| Direct employee cost | 25 | 2,50,000 |
| **Prime cost** | **65** | **6,50,000** |

::: formula Break-even point
$$BEP\ (\text{units}) = \frac{\text{Fixed cost}}{\text{Contribution per unit}} \qquad \text{₹}40 = \text{₹}100 - \text{₹}60$$
:::

## Worked examples

::::: example Where does Tapri break even?
Tapri sells premix at ₹100 a box; the variable cost is ₹60 a box and the fixed cost ₹2,00,000. Required: the break-even point in units. The chart below shows sales and total cost:

::: diagram Sales and total cost
{"type": "plot", "given": true, "x": [0, 10000], "y": [0, 1000000], "xlabel": "boxes", "series": [{"label": "sales", "fn": "100*x"}, {"label": "total cost", "fn": "200000+60*x"}]}
:::

:::: answer Show the working
::: diagram The break-even point
{"type": "plot", "x": [0, 10000], "y": [0, 1000000], "xlabel": "boxes", "series": [{"label": "sales", "fn": "100*x"}, {"label": "total cost", "fn": "200000+60*x"}], "points": [{"x": 5000, "y": 500000, "label": "BEP 5,000 boxes"}]}
:::

Contribution per box = ₹40, so BEP = 2,00,000 / 40 = **5,000 boxes**.
::::
:::::

## Under the hood

### Why $BEP = F / C$ holds

At the break-even volume the total contribution, $C \times Q$, equals the fixed cost $F$, so $Q = F / C$.

### When the price changes

A higher price raises the contribution per unit and lowers the break-even volume.

## Exam angle

::: exam How ICAI asks it
Fixture text.
:::

## Answer frame

::: compare
| Point | Marks for |
|---|---|
| Format | the layers in order |
:::

## Common mistakes

::: mistake Hall of Shame: overheads in prime cost
Factory overheads never go into prime cost.
:::

## Practice

::: pyq fx-cma-2025:Q1
:::

::: quiz Check yourself
Q: Which subtotal includes factory overheads?
- [ ] Prime cost
- [x] Works cost
- [ ] Direct cost
> Works cost is prime cost plus factory overheads.

Q: Contribution ₹40 a unit, fixed cost ₹2,00,000. Break-even in units?
= 5000
> 2,00,000 / 40.
:::

## Recap

- Prime cost = direct materials + direct employee cost + direct expenses.
- Works cost = prime cost + factory overheads.
- BEP (units) = fixed cost / contribution per unit.
- Margin of safety = actual sales − break-even sales.

## Flashcards

Q:: What is prime cost?
A:: Direct materials + direct employee cost + direct expenses.
