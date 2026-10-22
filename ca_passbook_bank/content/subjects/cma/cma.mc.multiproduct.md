---
id: cma.mc.multiproduct
title: Multi-product break-even analysis
minutes: 26
needs: cma.mc.bep
tags: multi-product break-even, sales mix, composite contribution, composite P/V ratio, composite break-even point, weighted contribution
labs:
summary: With several products sharing fixed costs, break-even needs the sales mix: a weighted contribution per unit for a mix in units, a weighted P/V ratio for a mix in values.
---

## In plain words

### Chai, samosa and a question with no single answer

Tapri's Pune café broke even at 15,000 cups of chai a month. Now it sells samosas too, and a new fryer has lifted fixed costs to ₹2,07,000.

> **Kesar:** Ab samosa bhi! So what is the break-even now?
> **Ritu:** Per unit, please. But which unit? 17,250 cups and no samosas, or 20,700 samosas and no chai?
> **Kesar:** Whatever our customers buy, obviously.
> **Ritu:** Exactly. They buy three chais with every samosa. Give me that and I will give you one answer.

A cup of chai leaves ₹12 of contribution, a samosa ₹10. Every time the café sells its usual "batch" of three chais and one samosa, it collects ₹36 + ₹10 = ₹46. Fixed costs of ₹2,07,000 need 4,500 such batches: **13,500 cups and 4,500 samosas**. That is the break-even point for this **sales mix**, the proportion in which the products sell. If customers start buying two samosas with every three chais, the answer changes.

So a business with several products has no break-even point of its own, only a break-even point **for a given mix**. You find the contribution of the mix (per batch, per average unit, or per rupee of sales), divide the shared fixed cost by it, and split the answer back in the mix.

::: analogy The thali
A restaurant does not break even on rotis or on dal; it breaks even on thalis. Each thali holds a fixed mix of items, so it has one combined contribution, and fixed cost ÷ contribution per thali gives the thalis needed. Change what goes into the thali, and the number of thalis changes too.
:::

::: key
With products sharing fixed costs, the break-even point exists only for a stated sales mix. Weight the contributions by the mix, divide the fixed cost by the weighted figure, then split the result in the same mix.
:::

## How it works

ICAI's whole rule fits in three sentences: in a multi-product environment, where more than one product is made using a common fixed cost, the break-even formula needs some adjustments; ==the contribution is calculated by taking weights for the products==; the weights may be of sales mix quantity or sales mix values (SM 14.16). It rests on the fifth CVP assumption: the analysis covers a single product, or assumes that the proportion of the products stays constant as total units sold change (SM 14.12). Everything after the weighting (margin of safety, target profit) is the single-product method of [[cma.mc.bep|break-even point and margin of safety]] applied to the mix.

::: diagram One batch of the café's mix
{"type": "nest", "w": 420, "root": {"title": "One batch = 3 chai + 1 samosa", "note": "₹46", "mono": false, "dir": "h", "children": [
  {"title": "3 cups of chai", "mono": false, "color": "a", "rows": [["contribution", "₹12 each"], ["total", "₹36"]]},
  {"title": "1 samosa", "mono": false, "color": "c", "rows": [["contribution", "₹10"], ["total", "₹10"]]}]},
 "caption": "The batch is the mix in miniature: its contribution, ₹46, plays the part a single product's contribution plays in an ordinary break-even."}
:::

### Two routes, chosen by how the mix is given

::: steps
1. **Mix in units** ("4 units of J for every 3 of K", "5 : 3 per batch"): composite contribution per unit = each product's contribution per unit × its share of units, added up. Or work per batch: contribution of the units in one batch.
2. **Composite break-even point** = common fixed cost ÷ composite contribution per unit (or per batch).
3. **Split it in the mix**: each product's break-even units = composite BEP × its share (or batches × its units per batch); × price for rupees.
4. **Mix in values** ("sales mix 40% : 35% : 25%", or each product's sales in rupees): composite P/V ratio = each product's P/V ratio × its share of sales value, added up. ICAI's tables call each term the **contribution per rupee of sales**. With actual figures, it is simply total contribution ÷ total sales.
5. **Composite break-even sales** = fixed cost ÷ composite P/V ratio; each product's share = composite BES × its sales mix %; ÷ price for units.
:::

**Which route?** Read how the question gives the mix, then follow one column:

| Step | Mix given in units | Mix given in values |
|---|---|---|
| Weight each product by | its share of units | its share of sales value |
| Weighted figure | contribution per unit (or per batch) | P/V ratio |
| Fixed cost ÷ weighted figure | BEP in units (or batches) | break-even sales in ₹ |
| Split the answer by | the units ratio | the sales mix % |

Either route gives the same answer when the mix is converted correctly: a units mix becomes a value mix by multiplying each product's units by its price.

### Change the mix, change the break-even

Total sales and fixed costs unchanged, a mix that shifts towards the products with the higher P/V ratio raises the composite P/V ratio, so it **lowers** break-even sales and **raises** profit; a shift towards the low-P/V products does the opposite. A product with a negative contribution pulls the composite down. That is why ICAI's questions so often replace one product with another and ask whether the new mix is better (SM practical problem 20; January 2026 MCQs 1–5; RTP September 2026 Q15). The profit path that shows each product's slope on a P/V chart is drawn in [[cma.mc.charts|break-even and profit-volume charts]].

## Formats and formulas

*Reproduce ICAI's statement from memory: it is the backbone of every value-mix answer (SM 14.77–14.78).*

| Particulars | A | B | C | Total |
|---|---:|---:|---:|---:|
| Selling price (₹) | xxx | xxx | xxx | |
| Less: Variable cost (₹) | xxx | xxx | xxx | |
| Contribution per unit (₹) | xx | xx | xx | |
| P/V ratio | x% | x% | x% | |
| Sales mix | x% | x% | x% | 100% |
| **Contribution per rupee of sales (P/V ratio × sales mix)** | **x%** | **x%** | **x%** | **x%** |

Then: total contribution = total sales × composite P/V ratio; less fixed costs = profit; break-even sales = fixed costs ÷ composite P/V ratio.

::: formula Composite contribution per unit (mix in units)
$$\text{Composite contribution} = \sum (C \times w)$$
C = a product's contribution per unit; w = its units weight, its units in the mix ÷ total units in the mix. The result is a contribution per (average) unit. ICAI's Example 4: 4 units of J (₹40) to 3 of K (₹20) gives ₹40 × 4/7 + ₹20 × 3/7 = ₹31.43 (SM 14.16).
:::

::: formula Composite break-even point
$$\text{BEP (units)} = \frac{\text{Common fixed cost}}{\text{Composite contribution}} \qquad \text{Product BEP} = \text{BEP} \times w$$
:::

::: formula Composite P/V ratio (mix in values)
$$\text{Composite P/V} = \sum (\text{P/V} \times \text{mix \%}) \qquad = \frac{\text{Total contribution}}{\text{Total sales}}$$
Mix % = each product's share of total sales value.
:::

::: formula Composite break-even sales
$$\text{Composite BES} = \frac{\text{Fixed cost}}{\text{Composite P/V}} \qquad \text{Product BES} = \text{BES} \times \text{mix \%}$$
:::

ICAI's Illustration 11 also shows a second, equivalent method: share the fixed cost among the products in the ratio of their weighted contributions, then each product's BEP = its share of fixed cost ÷ its own contribution per unit (SM 14.39).

## Worked examples

::::: example Namkeen and mathri, five to three
Tapri's snacks division sells two packaged snacks. Namkeen sells at ₹60 a pack with a variable cost of ₹36; mathri sells at ₹80 with a variable cost of ₹52. They sell in the ratio of 5 packs of namkeen to 3 packs of mathri. Fixed costs are ₹10,20,000 a month, and the budget is 64,000 packs a month in the same mix.

**Required:**

(i) Calculate the composite break-even point, and the break-even packs and sales of each snack.

(ii) Calculate the margin of safety at the budget, in rupees and as a percentage of sales, and the budgeted profit.

(iii) Calculate the packs of each snack needed for a profit of ₹8,16,000 a month.

:::: answer Show the working
**Working note: composite contribution**

| Particulars | Namkeen | Mathri | Batch of 8 |
|---|---:|---:|---:|
| Contribution per pack (₹) | 24 | 28 | |
| Packs in the mix | 5 | 3 | 8 |
| Contribution in the mix (₹) | 120 | 84 | **204** |
| Sales in the mix (₹) | 300 | 240 | 540 |

Composite contribution per pack = ₹204 ÷ 8 = **₹25.50**; composite P/V ratio = 204 ÷ 540 = 37.78%.

**(i) Break-even point**

$$\text{BEP} = \frac{10{,}20{,}000}{25.50} = 40{,}000 \text{ packs}$$

That is 5,000 batches of 8 (₹10,20,000 ÷ ₹204).

| Snack | Break-even packs | Break-even sales (₹) |
|---|---:|---:|
| Namkeen (40,000 × 5/8) | 25,000 | 15,00,000 |
| Mathri (40,000 × 3/8) | 15,000 | 12,00,000 |
| **Total** | **40,000** | **27,00,000** |

**(ii) At the budget of 64,000 packs** (40,000 namkeen, 24,000 mathri)

Budgeted sales = ₹24,00,000 + ₹19,20,000 = ₹43,20,000. Margin of safety = ₹43,20,000 − ₹27,00,000 = **₹16,20,000**, which is **37.5%** of sales. Profit = 64,000 × ₹25.50 − ₹10,20,000 = **₹6,12,000**; check: ₹16,20,000 × 204/540 = ₹6,12,000.

**(iii) Profit of ₹8,16,000**

$$\text{Packs} = \frac{10{,}20{,}000 + 8{,}16{,}000}{25.50} \qquad = 72{,}000$$

That is **45,000 packs of namkeen and 27,000 of mathri** (9,000 batches).

::: diagram Snacks division: break-even chart in batches
{"type": "plot", "h": 320, "x": [0, 10000], "y": [0, 5400000],
 "xlabel": "batches of 5 namkeen + 3 mathri", "ylabel": "amount (₹)",
 "legend": "outside",
 "xticks": [[0, "0"], [2000, "2,000"], [4000, "4,000"], [5000, "5,000"], [6000, "6,000"], [8000, "8,000"], [10000, "10,000"]],
 "yticks": [[0, "0"], [1020000, "10,20,000"], [2700000, "27,00,000"], [4320000, "43,20,000"], [5400000, "54,00,000"]],
 "series": [
  {"label": "sales", "fn": "540*x", "color": "a"},
  {"label": "total cost", "fn": "1020000+336*x", "color": "d"},
  {"label": "fixed cost", "fn": "1020000", "color": "mute", "dash": true},
  {"label": "margin of safety", "pts": [[5000, 500000], [8000, 500000]], "color": "f", "arrow": "both"},
  {"pts": [[8000, 0], [8000, 4320000]], "color": "mute", "dash": true, "legend": false}
 ],
 "points": [{"x": 5000, "y": 2700000, "label": "BEP", "pos": "left"}],
 "caption": "Blue: sales at ₹540 a batch; orange: total cost, ₹10,20,000 plus ₹336 a batch. They cross at 5,000 batches (₹27,00,000). The violet arrow is the margin of safety up to the budget of 8,000 batches (₹43,20,000)."}
:::
::::
:::::

:::: example Chilled cans today, lassi tomorrow
Tapri's cold-chain division sells one product, chilled chai cans, at ₹50 a can; the variable cost is ₹30. This year's fixed costs are ₹12,00,000 and sales are at a 40% margin of safety. Income tax is 25%.

Next year Dev plans to add flavoured lassi bottles at ₹40 each with a variable cost of ₹28. Total fixed costs will be ₹15,20,000, and cans and bottles are expected to sell in the ratio of 2 cans to 3 bottles.

**Required:**

(i) Calculate this year's rate of net return on sales after tax.

(ii) Calculate next year's break-even point for each product, in units and in rupees.

::: answer Show the working
**(i) This year**

BEP = ₹12,00,000 ÷ ₹20 = 60,000 cans. With a margin of safety of 40%, break-even sales are 60% of actual sales: actual sales = 60,000 ÷ 60% = 1,00,000 cans.

| Particulars | Amount (₹) |
|---|---:|
| Sales (1,00,000 × ₹50) | 50,00,000 |
| Less: Variable cost (1,00,000 × ₹30) | 30,00,000 |
| **Contribution** | **20,00,000** |
| Less: Fixed costs | 12,00,000 |
| Profit before tax | 8,00,000 |
| Less: Income tax @ 25% | 2,00,000 |
| **Net return** | **6,00,000** |

Rate of net return on sales = ₹6,00,000 ÷ ₹50,00,000 × 100 = **12%**.

**(ii) Next year: mix of 2 cans to 3 bottles (units)**

Contribution of one batch = 2 × ₹20 + 3 × ₹12 = ₹76, i.e. ₹15.20 per unit. Composite BEP = ₹15,20,000 ÷ ₹15.20 = 1,00,000 units (20,000 batches).

| Product | Break-even units | Break-even sales (₹) |
|---|---:|---:|
| Chai cans (1,00,000 × 2/5) | 40,000 | 20,00,000 |
| Lassi bottles (1,00,000 × 3/5) | 60,000 | 24,00,000 |
| **Total** | **1,00,000** | **44,00,000** |

Check by ICAI's second method: share the fixed cost in the ratio of the batch contributions, 40 : 36. Cans: ₹8,00,000 ÷ ₹20 = 40,000; bottles: ₹7,20,000 ÷ ₹12 = 60,000.
:::
::::

::::: example Premix: swap Ginger for Tulsi?
Tapri's premix division sells three products:

| Particulars | Masala | Elaichi | Ginger |
|---|---:|---:|---:|
| Selling price per carton (₹) | 250 | 350 | 200 |
| Variable cost per carton (₹) | 125 | 210 | 140 |
| Sales mix (% of sales value) | 40% | 35% | 25% |

Total sales are ₹1,20,00,000 and fixed costs ₹41,50,000 for the year. Ananya proposes to discontinue Ginger and launch Tulsi at ₹240 a carton with a variable cost of ₹132. She expects total sales of ₹1,30,00,000 in the mix Masala 45%, Elaichi 30%, Tulsi 25%; a new filling line will raise fixed costs to ₹43,92,000.

**Required:**

(i) Calculate the composite P/V ratio, the profit and the break-even sales at the existing mix.

(ii) Calculate the break-even sales of each product at the existing mix, in rupees and in cartons.

(iii) Calculate the composite P/V ratio, the profit and the break-even sales at the proposed mix, and the margin of safety in both cases.

(iv) Advise whether the proposal should be accepted.

:::: answer Show the working
**(i) Existing mix**

| Particulars | Masala | Elaichi | Ginger | Total |
|---|---:|---:|---:|---:|
| Contribution per carton (₹) | 125 | 140 | 60 | |
| P/V ratio | 50% | 40% | 30% | |
| Sales mix | 40% | 35% | 25% | 100% |
| **Contribution per rupee of sales** | **20%** | **14%** | **7.5%** | **41.5%** |

Contribution = ₹1,20,00,000 × 41.5% = ₹49,80,000; less fixed costs ₹41,50,000: profit **₹8,30,000**. Break-even sales = ₹41,50,000 ÷ 41.5% = **₹1,00,00,000**.

**(ii) Break-even sales of each product**

| Product | BES (₹) | Cartons |
|---|---:|---:|
| Masala (40%) | 40,00,000 | 16,000 |
| Elaichi (35%) | 35,00,000 | 10,000 |
| Ginger (25%) | 25,00,000 | 12,500 |
| **Total** | **1,00,00,000** | |

**(iii) Proposed mix**

| Particulars | Masala | Elaichi | Tulsi | Total |
|---|---:|---:|---:|---:|
| P/V ratio | 50% | 40% | 45% | |
| Sales mix | 45% | 30% | 25% | 100% |
| **Contribution per rupee of sales** | **22.5%** | **12%** | **11.25%** | **45.75%** |

Contribution = ₹1,30,00,000 × 45.75% = ₹59,47,500; less fixed costs ₹43,92,000: profit **₹15,55,500**. Break-even sales = ₹43,92,000 ÷ 45.75% = **₹96,00,000**.

| Particulars | Existing | Proposed |
|---|---:|---:|
| Composite P/V ratio | 41.5% | 45.75% |
| Break-even sales (₹) | 1,00,00,000 | 96,00,000 |
| Margin of safety (₹) | 20,00,000 | 34,00,000 |
| Margin of safety (% of sales) | 16.67% | 26.15% |
| **Profit (₹)** | **8,30,000** | **15,55,500** |

::: diagram Existing and proposed mix on a profit-volume chart, close up
{"type": "plot", "h": 320, "x": [8000000, 14000000], "y": [-1000000, 2200000], "clip": true,
 "xlabel": "sales (₹ lakh)", "ylabel": "profit / (loss) (₹ lakh)",
 "xticks": [[8000000, "80"], [9000000, "90"], [10000000, "100"], [11000000, "110"], [12000000, "120"], [13000000, "130"], [14000000, "140"]],
 "yticks": [[-1000000, "−10"], [-500000, "−5"], [0, "0"], [500000, "5"], [1000000, "10"], [1500000, "15"], [2000000, "20"]],
 "legend": "top-left",
 "series": [
  {"label": "existing mix (P/V 41.5%)", "fn": "-4150000+0.415*x", "color": "a"},
  {"label": "proposed mix (P/V 45.75%)", "fn": "-4392000+0.4575*x", "color": "d"}
 ],
 "points": [{"x": 9600000, "y": 0, "label": "BES 96", "pos": "left"}, {"x": 10000000, "y": 0, "label": "BES 100", "pos": "right"}, {"x": 12000000, "y": 830000, "label": "8.30", "pos": "below"}, {"x": 13000000, "y": 1555500, "label": "15.56", "pos": "above"}],
 "caption": "Close-up of sales from ₹80 lakh to ₹140 lakh. Blue: existing mix; orange: proposed mix, which starts from a bigger fixed cost (₹43.92 lakh against ₹41.50 lakh) but climbs faster. Each line cuts the axis at its break-even sales; the dots mark each plan's expected sales and profit."}
:::

**(iv) Advice.** Accept the proposal. Replacing Ginger (P/V 30%) with Tulsi (45%) and shifting the mix towards Masala raises the composite P/V ratio from 41.5% to 45.75%, so break-even sales fall by ₹4,00,000 even though fixed costs rise by ₹2,42,000, the margin of safety widens to 26.15%, and profit rises by ₹7,25,500. Even if total sales stayed at ₹1,20,00,000, the new mix would earn ₹10,98,000. The advice holds only if the new mix is actually achieved.
::::
:::::

## Under the hood

### Units or values? Read the ratio twice

When a question states the mix as percentages of sales, or gives each product's sales in rupees, weight the P/V ratios. When it gives units ("4 units of J and 3 units of K"), weight the contributions per unit. A bare "sales mix of X : Y would be 5 : 3" is the trap: ICAI's RTP for September 2024 Q17 and MTP Series II for September 2025 Q1(a) solve it as a ratio of **units**, and the Study Material's Illustration 11, though it words its ratio as "sales mix values of X : Y would be 7 : 3", also weights the contribution per unit by 7 and 3 (SM 14.37–14.39). Follow that reading and write it as an assumption. Read as values, the namkeen–mathri 5 : 3 would give a composite P/V ratio of 38.125% and break-even sales of ₹26,75,410 instead of ₹27,00,000.

### The "t" method

The Study Material's practical problem 8 (SM 14.65–14.66) lets t be the break-even units of one product, writes the other as a multiple of t from the mix (2t), and sets total contribution minus fixed cost to zero. It is the batch method in algebra: one equation, one unknown.

### Fixed costs that belong to one product

The composite break-even point uses all the fixed costs, common and product-specific, because it asks when the business as a whole stops making a loss at that mix. Whether one product covers its own specific fixed cost is a different question, asked product by product.

## Exam angle

::: exam Where multi-product break-even appeared
In the ICAI documents read for this lesson:

- **January 2026 MCQs 1–5, 2 marks each**: a three-product case: combined contribution-to-sales ratio at the existing level (from each product's sales in rupees), total profit, the new ratio when Product W replaces Z in a given mix, break-even sales and profit at the proposed mix.
- **RTP September 2026 Q15**: sales mix 35% : 35% : 30%, a proposal to replace C with P: "Will you advise the company to change over to production of P? Give reasons for your answer."
- **RTP May 2025 MCQ 7**: "Composite Break-even Batch" for ball pens and gel pens, the mix taken from expected sales of 6,000 and 3,600 units (5 : 3).
- **RTP September 2024 Q17** and **MTP Series II for September 2025 Q1(a), 5 marks**: a single product at a 60% margin of safety (net return on sales after tax), then a second product with "sales mix of X : Y would be 5 : 3": break-even units of each.
- **RTP January 2025 MCQ 1(ii)**: overall break-even units for three articles demanded in the ratio 2 : 3 : 5.
- The Study Material: Example 4, Illustration 11, practical problems 8 and 20.
:::

::: exam The traps
- A mix "per batch" or "for every": compute one batch's contribution, then the number of batches.
- Sales of each product given in rupees, not as percentages: composite P/V = total contribution ÷ total sales.
- A replacement product: recompute the whole composite, with the new mix, the new total sales and the new fixed cost.
- Rounding: ICAI's Illustration 11 gives 23,145.80 composite units and rounds each product to whole units (16,202 and 6,944).
:::

::: trick Batch it
Turn any units mix into one "batch" (5 namkeen + 3 mathri). Fixed cost ÷ contribution per batch = break-even batches; multiply by each product's units in the batch. No fractions until the end. Condition: the mix stays constant at every volume.
:::

## Answer frame

### "Advise whether the company should change over to the new mix"

1. Statement of contribution to sales ratio at the existing mix (P/V ratio × sales mix for each product, total).
2. Existing total contribution, profit and break-even sales.
3. The same statement and figures for the proposed mix, with its own sales and fixed costs.
4. Comparison: composite P/V ratio, break-even sales, profit (and margin of safety).
5. Conclusion in words, with the reason (higher composite P/V ratio and profit), and the assumption that the mix will be achieved.

### Three answers to "Find the break-even point of each product"

::: cols
**Loses marks**

Namkeen: ₹10,20,000 ÷ ₹24 = 42,500 packs; mathri: ₹10,20,000 ÷ ₹28 = 36,429 packs.

Each product is made to carry all the fixed cost, and the mix is ignored.
---
**Passes**

Composite contribution ₹25.50, composite BEP 40,000 packs.

Correct, but stops before splitting it between the products, which the question asked for.
---
**Full marks**

Working note on the mix (contribution of a batch), composite BEP by formula, split by the ratio in units and rupees, total checked against fixed cost ÷ composite P/V.
:::

## Common mistakes

::: mistake Hall of Shame: the P/V ratios that were simply averaged
(50% + 40% + 30%) ÷ 3 = 40% ignores that Masala is 40% of sales and Ginger 25%. It gives break-even sales of ₹1,03,75,000 instead of ₹1,00,00,000. **Fix:** weight each P/V ratio by its share of sales value, or divide total contribution by total sales.
:::

::: mistake The right weights on the wrong figures
A units ratio applied to P/V ratios, or a value mix applied to contributions per unit, mixes two different weightings. **Fix:** units weights go with contribution per unit; value weights go with P/V ratios. Convert one into the other with the prices if needed.
:::

::: mistake Splitting the answer in the wrong ratio
Splitting ₹27,00,000 of break-even sales 5 : 3 gives ₹16,87,500 of namkeen, but 5 : 3 is a ratio of packs. **Fix:** split composite units by the units ratio (25,000 and 15,000 packs), then multiply by the prices.
:::

## Practice

::: quiz Check yourself
Q: Products A and B sell in the ratio of 2 units of A to 3 units of B. A's contribution is ₹30 a unit and B's ₹15. Common fixed costs are ₹2,10,000. What is the composite break-even point in total units (A and B together)?
= 10000
> One batch (2 A + 3 B) contributes ₹60 + ₹45 = ₹105. Break-even batches = ₹2,10,000 ÷ ₹105 = 2,000, i.e. 4,000 A + 6,000 B = 10,000 units.

Q: Two products have P/V ratios of 60% and 30% and make up 30% and 70% of sales value. Fixed costs are ₹7,80,000. What are the composite break-even sales (₹)?
= 2000000
> Composite P/V = 60% × 30% + 30% × 70% = 18% + 21% = 39%. BES = ₹7,80,000 ÷ 39% = ₹20,00,000.

Q: Case scenario. Tapri's Indore kiosk sold chai worth ₹6,00,000 (P/V ratio 60%) and snacks worth ₹4,00,000 (P/V ratio 35%) last month. Fixed costs are ₹3,60,000. Ritu must report the break-even sales at this mix. Which figure is correct?
- [x] ₹7,20,000
- [ ] ₹7,57,895
- [ ] ₹6,00,000
- [ ] ₹10,28,571
> Composite P/V = (₹3,60,000 + ₹1,40,000) ÷ ₹10,00,000 = 50%; BES = ₹3,60,000 ÷ 50% = ₹7,20,000. ₹7,57,895 uses the simple average 47.5%; ₹6,00,000 and ₹10,28,571 treat the kiosk as all chai or all snacks.

Q: Total sales and fixed costs stay the same, but the mix shifts towards the product with the lowest P/V ratio. What happens?
- [ ] Break-even sales fall and profit rises
- [x] Break-even sales rise and profit falls
- [ ] Break-even sales and profit are unchanged, as total sales are unchanged
- [ ] Only the margin of safety changes
> The composite P/V ratio falls, so fixed cost ÷ composite P/V rises and each rupee of sales earns less contribution.

Q: X earns ₹40 a unit and Y ₹20; they sell one for one; fixed costs are ₹6,00,000. Kesar says X breaks even at 15,000 units and Y at 30,000. What is the correct break-even point?
- [ ] 45,000 units: 15,000 X and 30,000 Y
- [x] 20,000 units: 10,000 X and 10,000 Y
- [ ] 15,000 units of X only
- [ ] 22,500 units: 11,250 X and 11,250 Y
> Composite contribution = (₹40 + ₹20) ÷ 2 = ₹30 a unit; BEP = ₹6,00,000 ÷ ₹30 = 20,000 units, split 1 : 1. Kesar made each product carry all the fixed cost.
:::

## Recap

- Several products sharing a fixed cost break even only for a stated sales mix (CVP assumption: the mix stays constant).
- Mix in units: composite contribution = Σ contribution per unit × units weight; composite BEP = common fixed cost ÷ composite contribution; split by the units ratio.
- Batch method: contribution of one batch of the mix; fixed cost ÷ that = batches.
- Mix in values: composite P/V = Σ P/V ratio × sales mix % (contribution per rupee of sales) = total contribution ÷ total sales; BES = fixed cost ÷ composite P/V; split by the sales mix %.
- A shift towards high-P/V products lowers break-even sales and raises profit; a replacement product means a new composite.
- Margin of safety = actual (or budgeted) sales − composite break-even sales; profit = MOS × composite P/V ratio.
- "Sales mix 5 : 3" with no unit stated: ICAI's answers treat it as units; state the assumption. (Break even on thalis, not on rotis.)

## Flashcards

Q:: What does the Study Material say about break-even in a multi-product environment?
A:: The break-even formula needs adjustments: the contribution is calculated by taking weights for the products; the weights may be of sales mix quantity or sales mix values.

Q:: Formula: composite contribution per unit when the mix is given in units?
A:: Σ (contribution per unit × units of the product in the mix ÷ total units in the mix).

Q:: Formula: composite break-even point?
A:: Common fixed cost ÷ composite contribution per unit; each product's BEP = composite BEP × its share of units.

Q:: Formula: composite P/V ratio when the mix is given in values?
A:: Σ (P/V ratio × sales mix %), ICAI's "contribution per rupee of sales"; equals total contribution ÷ total sales.

Q:: Formula: composite break-even sales?
A:: Fixed cost ÷ composite P/V ratio; each product's BES = composite BES × its sales mix %.

Q:: Which CVP assumption does multi-product break-even rest on?
A:: The analysis either covers a single product or assumes that the proportion of the products sold remains constant as total units sold change.

Q:: Effect on break-even sales of a mix shift towards high-P/V products (sales and fixed costs unchanged)?
A:: Composite P/V rises, so break-even sales fall and profit rises.

Q:: ICAI's second method in Illustration 11 for each product's BEP?
A:: Share the fixed cost in the ratio of weighted contributions, then each product's BEP = its share of fixed cost ÷ its contribution per unit.

Q:: What is the composite break-even batch?
A:: Fixed cost ÷ contribution of one batch of the sales mix (e.g. 5 ball pens + 3 gel pens); multiply by each product's units per batch for its break-even units.
