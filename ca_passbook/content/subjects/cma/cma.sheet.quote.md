---
id: cma.sheet.quote
title: Estimated cost sheets, tenders and quotations
minutes: 30
needs: cma.sheet.mfg
tags: estimated cost sheet, quotation, tender, price to be quoted, overhead recovery rate, profit on sales, capacity levels
labs: cost-sheet
summary: A quotation is a cost sheet for the future: the order's estimated direct costs, overheads at rates taken from past cost sheets, order-specific costs, then the profit margin converted correctly.
---

## In plain words

### The hotel chain wants a number by Friday

Sahyadri Hotels has invited tenders for 50,000 boxes of chai premix printed with its own logo. The quotation must reach them by Friday, and the order has not been made yet, so no bill for it exists.

> **Kesar:** Quote our list price, ₹120 a box, and let's go to lunch.
> **Ritu:** Per unit, please, for *this* order. The premix base is dearer, wages have gone up, the logo needs a printing plate, and you want 20% of the price, not of the cost.

Ritu builds a cost sheet that looks forward. She estimates what the order will consume (material at today's price, the hours of labour, the printing plate). For the overheads she cannot trace to one order (the factory's rent, the office, the sales team) she uses last year's cost sheet: what each overhead came to per labour hour or as a percentage of its base, after taking out anything that will not happen again. She applies those rates to the order's own hours and costs, adds anything made for this order alone, and only then adds the profit.

That forward-looking statement is an **estimated cost sheet**, and the figure at the bottom is the **price to be quoted**. It is the cost sheet's third advantage in ICAI's list: it "facilitates the preparation of cost estimates required for submitting tenders" (SM 6.10).

::: analogy The wedding halwai
A halwai quoting for a wedding of 500 guests does not wait for the wedding to happen. He prices the ghee, sugar and khoya at today's market rate, counts his karigars' days, adds a share of his shop's rent and lights in the proportion he has always found them to bear to wages, adds the tempo to the venue, and then his margin. Get any line wrong and he either loses the order or cooks at a loss.
:::

::: key
Price to be quoted = the order's estimated direct costs + overheads at pre-determined recovery rates (from past cost sheets, on ICAI's bases) + costs specific to the order + profit. A margin "on selling price" must be converted before it is added to cost: 20% on price is 25% on cost.
:::

## How it works

An **estimated cost** is "the expected cost of manufacture, or acquisition, often in terms of a unit of product computed on the basis of information available in advance of actual production or purchase" (Kohler, SM 1.34). Overheads cannot be traced to an order that has not been produced, so they are charged at **pre-determined rates**: "production overheads are to be determined in advance for fixing selling price, quote tender price and to formulate budgets" (SM 4.41).

::: diagram From last year's cost sheet to a quoted price
{"type": "flow", "w": 430, "nodes": [
  {"id": "s", "kind": "start", "label": "Last period's cost sheet"},
  {"id": "r", "kind": "process", "label": "Overhead recovery rates"},
  {"id": "d", "kind": "process", "label": "Order's direct costs\nat expected prices"},
  {"id": "a", "kind": "process", "label": "Apply the rates"},
  {"id": "o", "kind": "process", "label": "Add order-specific costs"},
  {"id": "p", "kind": "end", "label": "Add profit:\nprice to be quoted", "color": "g"}],
 "edges": [["s", "r"], ["r", "d"], ["d", "a"], ["a", "o"], ["o", "p"]],
 "caption": "Each rate is worked out on the base the question names, then applied to the same base for the order."}
:::

### Six steps to a quotation

::: steps
1. **Recovery rates from the past cost sheet.** Divide each overhead by its base: factory overheads by direct wages (or prime cost, or labour or machine hours); administration overheads by works (factory) cost; selling and distribution by cost of production (or per unit sold). The bases for administration include works cost, sales value, gross profit, quantity produced and conversion cost (SM 4.48); for selling, sales value, cost of goods sold, gross profit, or number of orders or units sold (SM 4.53). The Study Material calls sales value "ordinarily the most logical basis" for selling overheads and cost of production "not as satisfactory", yet ICAI's questions often fix the rate on cost of production (January 2025 Q4(b); MTP Series I September 2026 Q2(a)). Use the one the question states.
2. **Revise the rates for known changes.** "Factory overheads will fall 10%" changes the rate's numerator; a new base changes the denominator (RTP January 2026 Q13).
3. **Estimate the order's direct costs at expected prices**: material quantity × the new price, labour hours × the new rate, and direct expenses such as a special die or design for this order.
4. **Apply the rates to the same bases for the order**: factory overheads on the order's wages, administration on its works cost, selling and distribution on its cost of production.
5. **Add costs that belong to this order only**, such as delivery to the customer's premises or special packing, at their estimated amounts (January 2025 Q4(b)).
6. **Add the profit** and arrive at the price. Profit x% on selling price is x ÷ (100 − x) on cost; price = total cost ÷ (1 − x%).
:::

### When volume changes: fixed costs per unit do not stay put

A quotation for a different volume cannot use last year's cost *per unit* for everything. Variable cost per unit stays the same, fixed cost in total stays the same (so per unit it falls as volume rises), and a semi-variable cost must be split first: variable rate = change in cost ÷ change in output, fixed part = total cost − variable part (SM Illustration 2, 8.6–8.7; [[cma.intro.behaviour|cost behaviour]]). ICAI's own problem prepares a cost sheet "at 30% and 100% capacity level" where selling the full output needs gifts, lucky draws and TV sponsorship (SM 6.24–6.25, 6.32–6.33).

### Not to be confused with buying by tender

When Tapri *buys*, it invites quotations through a request for proposal (RFP) or a notification inviting tender (NIT) and selects the best one (SM 2.9–2.11): that is [[cma.mat.procure|the procurement procedure]]. This lesson is the seller's side: pricing the quotation you send.

## Formats and formulas

The estimated cost sheet follows the cost sheet's own order ([[cma.sheet.mfg|cost sheet for a manufacturer]]), with each overhead line showing its rate and base. *Reproduce it from memory.*

| Statement of estimated cost and price to be quoted | Amount (₹) |
|---|---:|
| Direct materials (estimated quantity × expected price) | xxx |
| Direct wages (estimated hours × expected rate) | xxx |
| Direct expenses specific to the order | xxx |
| **Prime cost** | **xxx** |
| Add: Factory overheads (F% of direct wages) | xxx |
| **Works / factory cost** | **xxx** |
| Add: Administration overheads (A% of works cost) | xxx |
| **Cost of production** | **xxx** |
| Add: Selling and distribution overheads (S% of cost of production) | xxx |
| Add: Costs specific to the order (delivery, special packing) | xxx |
| **Total cost** | **xxx** |
| Add: Profit (x% on price = x ÷ (100 − x) on cost) | xxx |
| **Price to be quoted** | **xxx** |

::: formula Overhead recovery rates from a past cost sheet
$$F = \frac{\text{Factory overheads}}{\text{Direct wages}} \times 100 \qquad A = \frac{\text{Admin overheads}}{\text{Works cost}} \times 100$$

$$S = \frac{\text{S\&D overheads}}{\text{Cost of production}} \times 100$$
S&D = selling and distribution. The base in each denominator is the one the question names; the same base is used for the order.
:::

::: formula Pre-determined overhead rate
$$\text{Pre-determined rate} = \frac{\text{Estimated overheads}}{\text{Budgeted units}}$$
Estimated (normal) overheads for the period ÷ budgeted number of units during the period (SM 4.41); with hours or wages as the denominator for an hour rate or a percentage rate.
:::

::: formula Price from a margin, and cost from a price
$$\text{Price} = \frac{\text{Total cost}}{1 - x\%} \qquad \text{Total cost} = \frac{\text{Selling price}}{100\% + p\%}$$
x = profit as a percentage of selling price; p = profit as a percentage of total cost (SM 4.51).
:::

::: definition Estimated cost
Kohler defines estimated cost as "the expected cost of manufacture, or acquisition, often in terms of a unit of product computed on the basis of information available in advance of actual production or purchase". Estimated costs are prospective costs since they refer to prediction of costs. (SM 1.34)
:::

::: definition Pre-determined cost
A cost which is computed in advance before production or operations start, on the basis of specification of all the factors affecting cost, is known as a pre-determined cost. (SM 1.34)
:::

## Worked examples

:::: example Sahyadri Hotels: last year's rates, cleaned, for this year's order
Tapri's premix division recorded the following for 2025-26 (no work-in-process):

| Particulars, 2025-26 | Amount (₹) |
|---|---:|
| Direct materials consumed | 1,50,00,000 |
| Direct wages (30,000 labour hours at ₹200) | 60,00,000 |
| Factory overheads, including ₹3,00,000 spent repairing flood damage in the godown (not expected to recur) | 48,00,000 |
| Administration overheads | 25,50,000 |
| Selling and distribution overheads | 22,44,000 |

Tapri recovers factory overheads at a rate per direct labour hour, administration overheads as a percentage of works cost and selling and distribution overheads as a percentage of cost of production, at last year's normal rates.

Sahyadri Hotels' tender is for 50,000 logo boxes in 2026-27. The boxes will hold 19,000 kg of premix base, and blending and filling lose 5% of the base put in (a normal loss). The base cost ₹60 a kg last year and is now 10% dearer. The order needs 4,000 labour hours; the wage rate has risen from ₹200 to ₹216 an hour. A printing plate for the logo costs ₹60,000.

**Required:**

(i) Calculate the overhead recovery rates for 2025-26.

(ii) Prepare a statement of estimated cost and the price to be quoted if Tapri wants a profit of 20% on the price.

(iii) Kesar asks why factory overheads are not simply charged at last year's percentage of wages. Show the price that basis would give, and say which basis suits this order.

::: answer Show the working
**(i) Recovery rates, 2025-26**

The flood repairs are an abnormal cost: a pre-determined rate is built on estimated *normal* overheads (SM 4.41), so they are left out of the base. Normal factory overheads = ₹48,00,000 − ₹3,00,000 = ₹45,00,000. Works cost = ₹1,50,00,000 + ₹60,00,000 + ₹45,00,000 = ₹2,55,00,000. Cost of production = ₹2,55,00,000 + ₹25,50,000 = ₹2,80,50,000.

| Overhead | Calculation | Rate |
|---|---|---:|
| Factory | 45,00,000 ÷ 30,000 hours | ₹150 an hour |
| Administration | 25,50,000 ÷ 2,55,00,000 | 10% of works cost |
| Selling, distribution | 22,44,000 ÷ 2,80,50,000 | 8% of cost of production |

**Working note: the order's materials.** Input = 19,000 kg ÷ 95% = 20,000 kg, at ₹60 × 110% = ₹66 a kg: ₹13,20,000.

**(ii) Statement of estimated cost and price to be quoted, Sahyadri Hotels order**

| Particulars | Amount (₹) |
|---|---:|
| Direct materials (20,000 kg × ₹66) | 13,20,000 |
| Direct wages (4,000 hours × ₹216) | 8,64,000 |
| Direct expense: printing plate for the logo | 60,000 |
| **Prime cost** | **22,44,000** |
| Factory overheads (4,000 hours × ₹150) | 6,00,000 |
| **Works cost** | **28,44,000** |
| Administration overheads (10% of works cost) | 2,84,400 |
| **Cost of production** | **31,28,400** |
| Selling and distribution (8% of cost of production) | 2,50,272 |
| **Total cost** | **33,78,672** |
| Profit (20% on price = 25% on cost) | 8,44,668 |
| **Price to be quoted** | **42,23,340** |

That is ₹84.47 a box, against Kesar's ₹120. Check: ₹8,44,668 ÷ ₹42,23,340 = 20%. The plate is made for this order alone, so it is a direct expense (SM 6.4): it is in prime cost but carries no factory overhead, which is charged on labour hours.

**(iii) Factory overheads on wages instead.** Last year's rate = ₹45,00,000 ÷ ₹60,00,000 = 75% of wages, so the order would carry 75% × ₹8,64,000 = ₹6,48,000, ₹48,000 more. Works cost ₹28,92,000; administration ₹2,89,200; cost of production ₹31,81,200; selling and distribution ₹2,54,496; total cost ₹34,35,696; price ₹34,35,696 ÷ 80% = **₹42,94,620**, ₹71,280 higher.

The extra ₹48,000 comes only from the 8% rise in the wage rate: the order takes the same 4,000 hours of the factory's time either way. The labour hour rate "fully recognises the significance of the element of time in the incurring and absorption of manufacturing overhead expenses" and is an improvement on the percentage of direct wages (SM 4.32), so the hour rate suits this order. Had the flood repairs been left in, the hour rate would have been ₹160 and the quotation ₹40,000 of factory overheads too high.
:::
::::

::: lab cost-sheet {"mode":"quote","rates":"past","fohBase":"dl","admBase":"works","sdBase":"cop","adjFoh":0,"adjAdm":0,"adjSd":0,"profitOn":"sales","profitPct":"20","pctDp":"exact","sheetItems":[["Opening inventory of raw materials","2,00,000"],["Raw material purchases","12,00,000"],["Closing inventory of raw materials","2,50,000"],["Labour costs [labour]","5,00,000"],["Production overheads [factory]","2,50,000"],["Marketing and distribution expenses [selling]","1,52,000"]],"order":[["Estimated raw material cost [materials]","3,00,000"],["Estimated labour cost [labour]","1,50,000"],["Packaging and transportation [selling direct]","49,400"]],"produced":0,"sold":0}
The January 2025 paper, Q4(b), runs the same way: last year's rates first, then the bulk order priced at 20% profit on sales.
:::

:::: example The lost rate card: two old quotations, one new one
Tapri's kulhad unit makes custom-printed clay cups for hotel chains. It recovers administration overheads at 12% of factory cost, and factory overheads at a fixed percentage of direct wages that was set at the start of the year; the note recording that percentage is lost. Every quotation carries the same percentage of profit on total cost, and that figure is in the same lost note. Two jobs quoted and completed last quarter:

| Particulars | Job K-21 (₹) | Job K-22 (₹) |
|---|---:|---:|
| Direct materials | 72,000 | 38,000 |
| Direct wages | 30,000 | 22,000 |
| Price quoted | 1,80,600 | 1,11,720 |

**Required:**

(i) Find the factory overhead recovery rate and the percentage of profit on total cost.

(ii) Prepare the cost sheet of each job.

(iii) Quote for Job K-23 (direct materials ₹56,000, direct wages ₹30,000) on the same basis, and state its profit as a percentage of the price.

::: answer Show the working
**(i) The two missing figures**

Let F = factory overheads as a fraction of direct wages and p = profit as a fraction of total cost. For each job:

Price = (materials + wages + F × wages) × 1.12 × (1 + p)

The factors 1.12 and (1 + p) are the same for both jobs, so they cancel in the ratio of the two prices:

$$\frac{1{,}80{,}600}{1{,}11{,}720} = \frac{1{,}02{,}000 + 30{,}000F}{60{,}000 + 22{,}000F}$$

₹1,80,600 : ₹1,11,720 = 215 : 133 (both divided by 840). Cross-multiplying:

215 × (60,000 + 22,000F) = 133 × (1,02,000 + 30,000F)

1,29,00,000 + 47,30,000F = 1,35,66,000 + 39,90,000F

7,40,000F = 6,66,000, so **F = 0.90**: factory overheads are **90% of direct wages**.

K-21: factory cost = ₹72,000 + ₹30,000 + ₹27,000 = ₹1,29,000; total cost = ₹1,29,000 × 1.12 = ₹1,44,480; profit = ₹1,80,600 − ₹1,44,480 = ₹36,120 = **25% of total cost**.

**(ii) The two jobs**

| Particulars | K-21 (₹) | K-22 (₹) |
|---|---:|---:|
| Direct materials | 72,000 | 38,000 |
| Direct wages | 30,000 | 22,000 |
| **Prime cost** | **1,02,000** | **60,000** |
| Factory overheads (90% of wages) | 27,000 | 19,800 |
| **Factory cost** | **1,29,000** | **79,800** |
| Administration (12% of factory cost) | 15,480 | 9,576 |
| **Total cost** | **1,44,480** | **89,376** |
| Profit (25% of total cost) | 36,120 | 22,344 |
| **Price quoted** | **1,80,600** | **1,11,720** |

K-22 lands exactly on its quoted ₹1,11,720: the check that F and p are right.

**(iii) Job K-23**

| Particulars | Amount (₹) |
|---|---:|
| Direct materials | 56,000 |
| Direct wages | 30,000 |
| **Prime cost** | **86,000** |
| Factory overheads (90% of ₹30,000) | 27,000 |
| **Factory cost** | **1,13,000** |
| Administration (12% of factory cost) | 13,560 |
| **Total cost** | **1,26,560** |
| Profit (25% of total cost) | 31,640 |
| **Price to be quoted** | **1,58,200** |

Profit as a percentage of the price = ₹31,640 ÷ ₹1,58,200 = **20%**: 25% on cost is 20% on price. When both rates are unknown and the profit percentage is known, ICAI's method is two simultaneous equations in F and A (Illustration 9, SM 4.49–4.52); here the unknown, common mark-up drops out of the ratio instead.
:::
::::

::::: example Samosa packs: four prices from the market survey
Tapri's samosa factory can make 80,000 packs a month in normal working hours. Costs per pack: materials ₹30, wages ₹12, variable factory overheads ₹6, distribution ₹4. Fixed costs a month: factory overheads ₹6,00,000, production administration ₹1,20,000, general administration ₹1,80,000, selling ₹2,40,000. Packs beyond 80,000 a month can be made only on overtime, at a premium of ₹6 a pack, and need a second blast freezer hired at ₹1,50,000 a month.

Dev's market survey gives the packs Tapri can sell a month at each price:

| Price a pack (₹) | Packs a month |
|---:|---:|
| 92 | 48,000 |
| 86 | 64,000 |
| 80 | 80,000 |
| 76 | 96,000 |

**Required:** Prepare a cost sheet for the month at each of the four levels showing works cost, cost of production, total cost and profit, in total and per pack, and advise Kesar which price to set.

:::: answer Show the working
**Cost sheet for the month at each level**

| Particulars (₹) | 48,000 | 64,000 | 80,000 | 96,000 |
|---|---:|---:|---:|---:|
| Materials (₹30) | 14,40,000 | 19,20,000 | 24,00,000 | 28,80,000 |
| Wages (₹12) | 5,76,000 | 7,68,000 | 9,60,000 | 11,52,000 |
| Variable factory overheads (₹6) | 2,88,000 | 3,84,000 | 4,80,000 | 5,76,000 |
| Overtime premium (16,000 × ₹6) | — | — | — | 96,000 |
| Fixed factory overheads | 6,00,000 | 6,00,000 | 6,00,000 | 6,00,000 |
| Hired blast freezer | — | — | — | 1,50,000 |
| **Works cost** | **29,04,000** | **36,72,000** | **44,40,000** | **54,54,000** |
| Production administration | 1,20,000 | 1,20,000 | 1,20,000 | 1,20,000 |
| **Cost of production** | **30,24,000** | **37,92,000** | **45,60,000** | **55,74,000** |
| General administration | 1,80,000 | 1,80,000 | 1,80,000 | 1,80,000 |
| Selling | 2,40,000 | 2,40,000 | 2,40,000 | 2,40,000 |
| Distribution (₹4) | 1,92,000 | 2,56,000 | 3,20,000 | 3,84,000 |
| **Total cost** | **36,36,000** | **44,68,000** | **53,00,000** | **63,78,000** |
| Sales | 44,16,000 | 55,04,000 | 64,00,000 | 72,96,000 |
| **Profit** | **7,80,000** | **10,36,000** | **11,00,000** | **9,18,000** |

| Per pack (₹) | 48,000 | 64,000 | 80,000 | 96,000 |
|---|---:|---:|---:|---:|
| Works cost | 60.50 | 57.38 | 55.50 | 56.81 |
| Cost of production | 63.00 | 59.25 | 57.00 | 58.06 |
| Total cost | 75.75 | 69.81 | 66.25 | 66.44 |
| Selling price | 92.00 | 86.00 | 80.00 | 76.00 |
| Profit | 16.25 | 16.19 | 13.75 | 9.56 |

The overtime premium is shown under factory overheads: it is paid because of the general volume of work, not for one batch.

::: diagram Samosa packs: total cost and survey price per pack
{"type": "plot", "h": 300, "x": [40000, 100000], "y": [60, 100], "clip": true,
 "xlabel": "packs a month", "ylabel": "amount per pack (₹)", "legend": "outside",
 "xticks": [[48000, "48,000"], [64000, "64,000"], [80000, "80,000"], [96000, "96,000"]],
 "yticks": [[60, "60"], [70, "70"], [80, "80"], [90, "90"], [100, "100"]],
 "series": [
  {"label": "total cost, normal time", "color": "a", "pts": [[40000, 80.5], [44000, 77.91], [48000, 75.75], [52000, 73.92], [56000, 72.36], [60000, 71.0], [64000, 69.81], [68000, 68.76], [72000, 67.83], [76000, 67.0], [80000, 66.25]]},
  {"label": "total cost, with overtime and freezer", "color": "d", "dash": true, "pts": [[80000, 68.12], [84000, 67.64], [88000, 67.2], [92000, 66.8], [96000, 66.44], [100000, 66.1]]},
  {"label": "survey price", "color": "g", "pts": [[48000, 92], [64000, 86], [80000, 80], [96000, 76]]}],
 "caption": "Fixed costs of ₹11,40,000 a month spread thinner as volume rises (blue). Above 80,000 packs the freezer and the overtime premium lift cost per pack (orange, dashed). The survey price (green) falls faster than cost, so the gap between them narrows from ₹16.25 a pack at 48,000 to ₹9.56 at 96,000."}
:::

**Advice.** Set the price at ₹80 a pack: 80,000 packs earn the highest profit, ₹11,00,000 a month. Going to ₹76 adds 16,000 packs, but the ₹4 price cut on all 96,000 packs, the overtime premium and the freezer cost more than the extra packs earn, and profit falls to ₹9,18,000. Profit per pack is highest at ₹92, but total profit, not profit per pack, is what Kesar banks.
::::
:::::

## Under the hood

### Which cost of the previous year?

Rates come from *actual* costs of the previous period unless the question gives budgets (January 2025 Q4(b): "based on the previous year's data"). If a rate is to be revised ("factory overheads have decreased by 10%"), revise the overhead amount and recompute the rate on the old base (RTP January 2026 Q13).

### Rounding the rates

ICAI's answers are not consistent. RTP May 2021 Q7 shows 20,50,400 ÷ 2,96,80,000 as 6.91% but 30,80,000 ÷ 90,50,000 (34.03%) as 34%; RTP January 2026 Q13 carries three decimals (19.251%, 52.806%). Use at least two decimals, follow any rounding the question asks for, and state the rounding you used.

### Normal and abnormal costs in a quotation

A rectification cost that is normal for that type of job is charged to the job and quoted; an abnormal one is written off to costing profit and loss and kept out of the price (SM 8.4; MTP Series I September 2026 Q2(a); [[cma.mat.losses|spoilage and defectives]]).

### Quoting the lowest price

To keep last year's profit while accepting an extra order, the extra order needs only to cover its own variable cost plus the rise in total fixed cost and any profit shortfall (old-scheme November 2019 Q5(a), 10 marks). That reasoning is marginal costing: [[cma.mc.decisions|short-term decisions]].

## Exam angle

::: exam Where quotations appeared, May 2024 to September 2026 (and the old scheme)
In the documents read for this lesson:

- **Bulk order priced from last year's rates, 6 marks:** January 2025 Q4(b): production overhead as a percentage of labour, marketing and distribution as a percentage of production cost, packaging and transport added, "Sales required for achieving a profit margin of 20% on the final sales amount".
- **Cost sheet at two activity levels, 8 marks:** September 2024 Q2(a): January at 40% and February at 100% capacity, with TV sponsorship, a hi-tea, a gift per dozen and lucky draw prizes.
- **Job cost sheet and price to be quoted:** MTP Series I September 2026 Q2(a) (7 marks, 20% on selling price, normal rectification); RTP January 2026 Q13 (revised overhead structure, same profit % on sales).
- **Old scheme:** May 2022 Q2(a) (10 marks: two jobs, find both rates, price a third job at 15% on selling price); RTPs May 2021 Q7, May 2022 Q8 and November 2023 Q7 (overhead rates from last year's actuals, price at 25% on sales); November 2019 Q5(a) (10 marks, lowest price for an extra order).
- **Multiple choice:** MTP Series I September 2026 MCQ 11 (2 marks), the relevant cost of material in a quotation.
:::

::: exam The traps ICAI set
- "Profit 20% on sales" or "on the final sales amount": divide total cost by 80%; never add 20% of cost.
- "Profit percentage on total cost" for the old jobs, then "on selling price" for the new one (May 2022): two different conversions in one question.
- Price changes: apply the new material price and wage rate before the overhead rates.
- Promotional costs (gifts, prizes, sponsorship) belong only to the level that needs them (September 2024).
:::

::: trick Margin conversions you will use every paper
On price → on cost: 10% → 11.11%, 12.5% → 14.29%, 20% → 25%, 25% → 33.33%, 33⅓% → 50%. Rule: x on price = x ÷ (100 − x) on cost; p on cost = p ÷ (100 + p) on price. Always true, for any x below 100.
:::

## Answer frame

For a quotation question, ICAI's suggested answers earn marks in this order:

1. **Working note: recovery rates**, each with its formula and base ("Normal factory overheads ÷ direct labour hours = ₹150 an hour"; "Administration ÷ works cost × 100 = 10%").
2. **Working note: revised figures** (new material price, wage rate, revised overheads).
3. **Statement of estimated cost**, in cost sheet order, each overhead line showing "% of base".
4. **Profit line with the conversion stated** ("20% on price = 25% on cost").
5. **The final line in the question's words**: "Price to be quoted" or "Sales value", and a one-line conclusion ("Hence the price to be quoted is ₹42,23,340").

For theory, the point to write is ICAI's: pre-determined overhead rates are used because "production overheads are to be determined in advance for fixing selling price, quote tender price and to formulate budgets" (SM 4.41), and a cost sheet "facilitates the preparation of cost estimates required for submitting tenders" (SM 6.10).

## Common mistakes

::: mistake Hall of Shame: the 20% that was added to cost
Total cost ₹33,78,672, "add 20% profit": ₹40,54,406. Sahyadri accepts, and Tapri earns only 16.67% of the price. **Fix:** 20% on price = 25% on cost; price = ₹33,78,672 ÷ 80% = ₹42,23,340.
:::

::: mistake Last year's material price in this year's quotation
Using 19,000 kg at last year's ₹60 (₹11,40,000) for materials, when the normal loss needs 20,000 kg put in and the price has risen 10% (₹13,20,000), understates every line below it. **Fix:** revise direct costs first (quantity with its normal loss, then the new price), then apply the rates.
:::

::: mistake The right rate on the wrong base
Administration at 10% of prime cost instead of works cost, or selling at 8% of works cost instead of cost of production. **Fix:** a rate is only valid on the base it was computed on; write the base on every overhead line.
:::

::: mistake Fixed cost per unit carried to a new volume
Using the 48,000-pack level's fixed cost per pack (₹23.75) for 80,000 packs gives ₹52 + ₹23.75 = ₹75.75 a pack, not ₹66.25, and makes ₹80 look like a loss-making price. **Fix:** at a new level, take fixed costs in total and divide by the new volume.
:::

## Practice

::: quiz Check yourself
Q: An order's total cost is estimated at ₹4,80,000. Tapri wants a profit of 25% on the price to be quoted. What price should it quote, in rupees?
= 640000
> Price = ₹4,80,000 ÷ 75% = ₹6,40,000; profit ₹1,60,000 is 25% of the price (33⅓% of cost). Adding 25% of cost gives ₹6,00,000, only 20% on price.

Q: Last year's cost sheet shows direct wages ₹20,00,000, factory overheads ₹16,00,000, prime cost ₹50,00,000 and works cost ₹66,00,000. Factory overheads are recovered as a percentage of direct wages. A new order has prime cost ₹2,00,000 including wages of ₹50,000. What factory overheads should the quotation carry, in rupees?
= 40000
> Rate = 16,00,000 ÷ 20,00,000 = 80% of wages; 80% × ₹50,000 = ₹40,000. Using 32% of prime cost (16 ÷ 50) gives ₹64,000, the right figure on the wrong base.

Q: Case scenario. Dev reviews Ritu's quotation for a corporate client. It shows materials at this month's prices, factory overheads at last year's percentage of wages, administration at last year's percentage of works cost, a courier charge for this client only, and profit "at 20% of total cost" because the board wants a margin of 20% on price. Which correction is needed?
- [ ] Administration should be charged as a percentage of prime cost
- [ ] The courier charge should be absorbed into selling overheads at the normal rate
- [x] Profit should be 25% of total cost (total cost ÷ 80% gives the price)
- [ ] Materials should be taken at last year's prices so that the rates stay consistent
> A 20% margin on price is 25% on cost. The overhead bases are right as stated; an order-specific cost is added at its own amount; materials must be at expected prices.

Q: A factory's monthly fixed costs are ₹6,00,000 and variable cost is ₹50 a unit. Last month it made 20,000 units at ₹80 a unit total cost. What is the total cost per unit at 30,000 units?
- [ ] ₹80
- [x] ₹70
- [ ] ₹75
- [ ] ₹65
> ₹50 + ₹6,00,000 ÷ 30,000 = ₹50 + ₹20 = ₹70. Keeping ₹80 treats the ₹30 fixed cost per unit as if it were variable.

Q: In an estimated cost sheet, which of these are added at their own estimated amount rather than through an overhead recovery rate? Select all that apply.
- [x] Delivery to this customer's premises
- [ ] The factory's rent
- [x] A die made only for this order
- [ ] The finance manager's salary
> Costs traceable to the order (delivery, a special die) are added directly. Rent and the finance manager's salary are overheads, charged through factory and administration rates.
:::

## Recap

- An estimated cost sheet is a cost sheet for the future; its bottom line is the price to be quoted (SM 6.10, advantage iii).
- Recovery rates from last period: factory overheads ÷ direct wages; administration ÷ works cost; selling and distribution ÷ cost of production (or the bases the question names).
- Revise direct costs to expected prices first, then apply each rate to the order's own base.
- Add order-specific costs (delivery, special dies or packing) at their own amounts.
- Price = total cost ÷ (1 − margin on price); x% on price = x ÷ (100 − x) on cost; total cost = price ÷ (100% + p% on cost).
- Two jobs with known prices give two equations in F and A; eliminate, then price the third job (SM 4.49–4.52). A common unknown mark-up cancels in the ratio of the two prices.
- At a new volume, fixed costs stay in total and change per unit; split semi-variable costs first.
- The halwai prices the wedding before the wedding.

## Flashcards

Q:: Kohler's definition of estimated cost?
A:: The expected cost of manufacture, or acquisition, often in terms of a unit of product, computed on the basis of information available in advance of actual production or purchase.

Q:: Why are production overheads pre-determined (SM 4.41)?
A:: Because they are to be determined in advance for fixing selling price, quoting tender price and formulating budgets.

Q:: Formula: pre-determined overhead rate?
A:: Estimated or normal overheads for the period ÷ budgeted number of units (or hours, or wages) during the period.

Q:: Usual recovery bases in a quotation question?
A:: Factory overheads as a % of direct wages (or prime cost or hours); administration as a % of works cost; selling and distribution as a % of cost of production.

Q:: Profit of 20% on selling price is what % on cost?
A:: 25% (x ÷ (100 − x) = 20 ÷ 80).

Q:: Total cost from selling price and profit % on cost?
A:: Total cost = selling price ÷ (100% + profit %).

Q:: How are costs specific to one order (delivery, a special die) treated in a quotation?
A:: Added at their own estimated amounts, not through a recovery rate.

Q:: Two past jobs give selling prices and profit % on cost. How do you find the factory and administration rates?
A:: Find each job's total cost, write (materials + wages + F × wages)(1 + A) = total cost for each, and solve the two equations for F and A.

Q:: At a higher volume, what happens to fixed cost per unit and variable cost per unit?
A:: Fixed cost per unit falls (total unchanged); variable cost per unit stays the same.

Q:: Which advantage of a cost sheet does a quotation use?
A:: It facilitates the preparation of cost estimates required for submitting tenders (and helps in arriving at the selling price).
