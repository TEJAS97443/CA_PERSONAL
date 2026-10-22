---
id: cma.unit.batch
title: Batch costing and the economic batch quantity
minutes: 30
needs: cma.unit.unit
tags: batch costing, economic batch quantity, EBQ, set-up cost, carrying cost, optimum run size, job vs batch costing
labs:
summary: Batch costing makes the batch the cost object and divides its cost by the units in it; the economic batch quantity is the batch size at which set-up and holding costs together are lowest.
---

## In plain words

### The grinder that has to be cleaned

Tapri sells jars of chai masala to a supermarket chain, 1,20,000 jars a year, taken evenly. Each production run means cleaning the grinder, changing the spice settings and test-grinding: ₹2,400 a run, however many jars follow. Every jar waiting in the store costs ₹4 a year to keep (space, insurance, money locked up).

> **Kesar:** Easy. Make all 1,20,000 jars in one run. One cleaning, done.
> **Ritu:** And rent a godown for a year's stock. Per unit, please: that is ₹2,40,000 a year of holding cost.
> **Kesar:** Then a small run every working morning.
> **Ritu:** And pay for the cleaning 250 times a year. That is ₹6,00,000.

The jars of one run are made together, in a **batch**, and they are identical, so their cost is worked out for the batch and divided by the jars in it: that is **batch costing**. The argument between Kesar and Ritu is about the size of the batch. Bigger batches mean fewer set-ups but more stock to hold; smaller batches mean less stock but more set-ups. Somewhere between the two extremes the total is lowest: here at 12,000 jars a run, ten runs a year, ₹24,000 of set-ups and ₹24,000 of holding cost. That batch size is the **economic batch quantity (EBQ)**.

::: analogy The atta for the week
A household that kneads atta once a week saves effort but keeps a big ball of dough in the fridge, going stale. One that kneads before every roti has fresh dough and an aching back. Most kneading families settle on a ball for a day or two: the batch where effort and staleness together hurt least.
:::

::: key
In batch costing the batch is the cost object: cost per unit = cost of the batch ÷ units in the batch. The economic batch quantity is the batch size at which set-up costs and inventory holding costs together are at a minimum: EBQ = √(2DS ÷ C).
:::

## How it works

::: definition Batch costing
Batch Costing is a type of specific order costing where articles are manufactured in predetermined lots, known as batch. Under this costing method, the cost object for cost determination is a batch for production rather output as seen in unit costing method. (SM 8.8)
:::

A batch "consists of certain number of units which are processed simultaneously" (SM 8.8). Inputs accumulate until the minimum batch size is reached, and the reasons for batch production "may be either technical or economical or both": making one pen of a design for one customer would be too costly, while 10,000 pens of the same design cut the cost "to a sizeable extent" (SM 8.8). Each run carries a minimum level of expenditure, on workers, supervision and setting up the machine, "irrespective of number of units produced" (SM 8.8).

### The costing procedure

::: diagram Costing a batch (SM 8.8)
{"type": "flow", "w": 420, "nodes": [
  {"id": "n", "kind": "start", "label": "A number for each batch"},
  {"id": "m", "kind": "process", "label": "Materials: from\nmaterial requisitions"},
  {"id": "l", "kind": "process", "label": "Labour: time on batch\n× rate (time cards)"},
  {"id": "o", "kind": "process", "label": "Overheads: machine or\nlabour hours"},
  {"id": "c", "kind": "end", "label": "Batch cost ÷ units\n= cost per unit", "color": "g"}],
 "edges": [["n", "m"], ["m", "l"], ["l", "o"], ["o", "c"]],
 "caption": "Material, labour and overheads are booked against the batch number; set-up costs are part of the batch's cost."}
:::

1. **One number is allotted for each batch** (SM 8.8).
2. **Material cost** for the batch comes from the material requisitions for the batch.
3. **Labour cost** = time spent on the batch by direct workers (from time cards or job tickets) × the rate.
4. **Overheads** are absorbed on a suitable basis such as machine hours or direct labour hours. When a batch order is repeated each month, the overhead rate is the month's overheads ÷ the month's labour hours, applied to the batch's hours (SM Illustration 4, 8.9–8.11).
5. **Cost per unit** = total cost of the batch ÷ units in the batch; set-up cost is added per batch, whatever the number of units (SM Illustration 3, 8.8–8.9).

### Choosing the batch size

The total production cost under batch production has two main costs: **machine set-up costs** and **inventory holding costs** (SM 8.11). A larger batch means fewer set-ups but more units in stock; a smaller one means lower holding costs "but only with higher set up costs" (SM 8.11).

::: diagram Chai masala jars: set-up, holding and total cost by batch size
{"type": "plot", "h": 320, "x": [2000, 30000], "y": [0, 160000], "clip": true,
 "xlabel": "jars in a batch", "ylabel": "cost a year (₹)", "legend": "outside",
 "xticks": [[6000, "6,000"], [12000, "12,000"], [18000, "18,000"], [24000, "24,000"], [30000, "30,000"]],
 "yticks": [[0, "0"], [40000, "40,000"], [80000, "80,000"], [120000, "1,20,000"], [160000, "1,60,000"]],
 "series": [
  {"label": "set-up cost (D ÷ Q × S)", "fn": "120000/x*2400", "color": "d"},
  {"label": "holding cost (Q ÷ 2 × C)", "fn": "x/2*4", "color": "a"},
  {"label": "total cost", "fn": "120000/x*2400+x/2*4", "color": "f"},
  {"pts": [[12000, 0], [12000, 48000]], "color": "mute", "dash": true, "legend": false}],
 "points": [{"x": 12000, "y": 48000, "label": "EBQ 12,000: ₹48,000", "pos": "above"}],
 "caption": "Set-up cost (orange) falls as the batch grows; holding cost (blue) rises; their total (violet) is lowest at 12,000 jars, where the two are equal at ₹24,000 each."}
:::

The EBQ "may be determined by calculating the total cost for a series of possible batch sizes and checking which batch size gives the minimum cost", or by a formula "similar to determination of Economic Order Quantity (EOQ)" (SM 8.12), the twin of [[cma.mat.eoq|EOQ in material cost]].

### Job costing and batch costing

ICAI's three differences, in ICAI's order (SM 8.15):

::: compare
| No. | Job costing | Batch costing |
|---|---|---|
| 1 | Method of costing used for non-standard and non-repetitive products produced as per customer specifications and against specific orders | Homogeneous products produced in a continuous production flow in lots |
| 2 | Cost determined for each job | Cost determined in aggregate for the entire batch and then arrived at on per unit basis |
| 3 | Jobs are different from each other and independent of each other; each job is unique | Products produced in a batch are homogeneous and lack of individuality |
:::

More on jobs in [[cma.job.job|job costing]].

## Formats and formulas

::: formula Economic batch quantity
$$\text{EBQ} = \sqrt{\frac{2DS}{C}}$$
D = annual demand for the product; S = setting up cost per batch; C = carrying cost per unit of production, per annum (SM 8.12). If C is given per month, multiply by 12; if as a percentage, apply it to the cost of making one unit (SM Illustrations 5 and 6).
:::

::: formula Number of runs, interval and the costs at any batch size Q
$$\text{Runs} = \frac{D}{Q} \qquad \text{Interval (days)} = \frac{365}{\text{Runs}}$$

$$\text{Set-up cost} = \frac{D}{Q} \times S \qquad \text{Holding cost} = \frac{Q}{2} \times C$$
Average inventory is half the batch (SM 8.13). At the EBQ the two costs are equal.
:::

*Reproduce this statement from memory* (SM Illustration 3, 8.9):

| Statement of cost per batch and per order | Per batch (₹) | Order (₹) |
|---|---:|---:|
| Direct material cost | xxx | xxx |
| Direct wages | xxx | xxx |
| Set-up cost | xxx | xxx |
| Add: Production overheads | xxx | xxx |
| **Total production cost** | **xxx** | **xxx** |
| Add: Administration, selling and distribution | xxx | xxx |
| **Total cost** | **xxx** | **xxx** |
| Add: Profit | xxx | xxx |
| **Selling price** | **xxx** | **xxx** |

Selling price per unit = selling price per batch ÷ units in a batch.

::: definition Economic batch quantity (EBQ)
Economic batch quantity is the size of a batch where total cost of set-up and holding costs are at minimum. (SM 8.11)
:::

## Worked examples

:::: example Nankhatai for a wedding: the order that does not fill the last tray
Tapri's bakery oven takes at most 400 nankhatai in one load, and every load bakes for 1.5 oven hours whether it is full or not. A caterer orders 6,100 nankhatai. Costs:

- Flour, ghee and sugar ₹4.20 a piece; packing ₹0.60 a piece.
- Bakers' wages ₹320 a load; oven set-up and cleaning ₹300 a load.
- Oven overheads are absorbed at ₹240 an oven hour.
- Administration, selling and distribution: 10% of the production cost of the order.
- Tapri wants a profit of 20% on the selling price.

**Required:**

(i) Determine the number of loads, the cost of the order, its selling price and the selling price of one nankhatai.

(ii) The caterer asks what one nankhatai would cost him if he raised the order to 6,400. Calculate it and explain the difference.

::: answer Show the working
**Working note: loads.** 6,100 ÷ 400 = 15.25, so **16 loads**: 15 full loads and one of 100 pieces. A part load still needs a set-up, a bakers' shift and 1.5 oven hours. An order of 6,400 also needs 16 loads (6,400 ÷ 400 = 16, all full).

**Statement of cost and selling price**

| Particulars | 6,100 pieces (₹) | 6,400 pieces (₹) |
|---|---:|---:|
| Flour, ghee and sugar (₹4.20 a piece) | 25,620 | 26,880 |
| Packing (₹0.60 a piece) | 3,660 | 3,840 |
| Bakers' wages (16 loads × ₹320) | 5,120 | 5,120 |
| Oven set-up (16 loads × ₹300) | 4,800 | 4,800 |
| Oven overheads (16 × 1.5 hours × ₹240) | 5,760 | 5,760 |
| **Total production cost** | **44,960** | **46,400** |
| Administration, selling and distribution (10%) | 4,496 | 4,640 |
| **Total cost** | **49,456** | **51,040** |
| Profit (20% on price = 25% on cost) | 12,364 | 12,760 |
| **Selling price of the order** | **61,820** | **63,800** |
| **Selling price per nankhatai** | **₹10.13** | **₹9.97** |

**(i)** 16 loads; cost of the order ₹49,456; selling price ₹61,820, or ₹61,820 ÷ 6,100 = **₹10.13** a nankhatai.

**(ii)** At 6,400 pieces the price is ₹63,800 ÷ 6,400 = **₹9.97** a nankhatai. The 300 extra pieces add only ₹1,980 to the bill (₹6.60 each), because they fill the sixteenth load, which was already being set up, staffed and fired for 100 pieces. Only the per-piece costs rise (₹4.80 of ingredients and packing, ₹6.60 with the 10% administration charge and the profit on it); the per-load costs of ₹980 a load (₹320 + ₹300 + ₹360) stay at 16 loads.
:::
::::

:::: example Printed kulhads: three batches, three prices
In August Tapri's printing line ran three batch orders of printed kulhads. The machine makes 1,200 passes an hour, and each colour is one pass of every kulhad in the batch.

| Batch | Customer | Kulhads | Colours | Price a kulhad (₹) |
|---|---|---:|---:|---:|
| B-81 | Hotel chain | 14,400 | 1 | 4.50 |
| B-82 | Wedding planner | 3,000 | 4 | 6.50 |
| B-83 | College fest | 6,000 | 2 | 5.50 |

Costs:

- Plain kulhads (issued on material requisitions) ₹3.00 each; ink ₹0.10 a kulhad for each colour; packing ₹0.30 a kulhad.
- A new screen and make-ready for each colour of each batch: ₹1,000.
- Operators' wages ₹250 a machine hour.
- Printing department overheads for August, ₹1,12,000 for 320 machine hours worked, are absorbed on machine hours.

**Required:**

(i) Calculate the cost and the profit or loss per kulhad of each batch, and the profit of the month's three orders.

(ii) The wedding planner wants a repeat of the same four-colour design at ₹6.50 a kulhad. Calculate the smallest batch at which the order recovers its full cost.

::: answer Show the working
**Working notes**

1. Machine hours = kulhads × colours ÷ 1,200: B-81 14,400 × 1 ÷ 1,200 = 12; B-82 3,000 × 4 ÷ 1,200 = 10; B-83 6,000 × 2 ÷ 1,200 = 10.
2. Overhead rate = ₹1,12,000 ÷ 320 = ₹350 a machine hour.
3. Screens = colours × ₹1,000: ₹1,000; ₹4,000; ₹2,000.

**(i) Statement of cost and profit of each batch**

| Particulars | B-81 (₹) | B-82 (₹) | B-83 (₹) | Total (₹) |
|---|---:|---:|---:|---:|
| Plain kulhads | 43,200 | 9,000 | 18,000 | 70,200 |
| Ink | 1,440 | 1,200 | 1,200 | 3,840 |
| Screens and make-ready | 1,000 | 4,000 | 2,000 | 7,000 |
| Operators' wages | 3,000 | 2,500 | 2,500 | 8,000 |
| Overheads (₹350 an hour) | 4,200 | 3,500 | 3,500 | 11,200 |
| Packing | 4,320 | 900 | 1,800 | 7,020 |
| **Total cost** | **57,160** | **21,100** | **29,000** | **1,07,260** |
| Sales | 64,800 | 19,500 | 33,000 | 1,17,300 |
| **Profit / (loss)** | **7,640** | **(1,600)** | **4,000** | **10,040** |

| Per kulhad (₹) | B-81 | B-82 | B-83 |
|---|---:|---:|---:|
| Cost (total cost ÷ kulhads) | 3.97 | 7.03 | 4.83 |
| Price | 4.50 | 6.50 | 5.50 |
| **Profit / (loss)** | **0.53** | **(0.53)** | **0.67** |

The three orders together earn ₹10,040. The wedding batch loses ₹0.53 a kulhad: four screens (₹4,000) spread over only 3,000 kulhads add ₹1.33 a kulhad, and four passes take four times the machine time of a one-colour kulhad.

**(ii) Smallest repeat batch.** Cost per kulhad other than screens = ₹3.00 + 4 × ₹0.10 + ₹0.30 + 4 passes ÷ 1,200 × (₹250 + ₹350) = ₹3.70 + ₹2.00 = ₹5.70. The screens, ₹4,000, are a cost per batch. Full cost is recovered when ₹4,000 ÷ batch size = ₹6.50 − ₹5.70 = ₹0.80, so the batch must be at least ₹4,000 ÷ ₹0.80 = **5,000 kulhads**. Check: 5,000 × ₹5.70 + ₹4,000 = ₹32,500 = 5,000 × ₹6.50.
:::
::::

::::: example Kulhad cartons for a café chain: is a quick-change kit worth it?
Tapri supplies 72,000 cartons of printed kulhads a year to a café chain, at a steady daily rate. Each production run needs a change of print screens: 3 hours of a printer's time at ₹250 an hour, and 6 cartons of test prints that are scrapped (a carton costs ₹100 to make). Cartons in stock are carried at interest of 12% a year on their cost of making, plus storage of ₹3 a carton a year.

A supplier offers a quick-change screen kit on hire at ₹12,000 a year. With it a change takes 2 hours and scraps only 1 carton of test prints.

**Required:**

(i) Determine the set-up cost per run, the carrying cost per carton per annum, the economic batch quantity, the number of runs a year and the interval between runs (365 days).

(ii) Calculate the annual set-up cost and holding cost at the EBQ.

(iii) Advise whether Tapri should hire the kit.

:::: answer Show the working
**(i) EBQ without the kit**

Set-up cost per run S = 3 × ₹250 + 6 × ₹100 = ₹750 + ₹600 = **₹1,350**. Carrying cost C = 12% × ₹100 + ₹3 = **₹15** a carton a year.

$$\text{EBQ} = \sqrt{\frac{2 \times 72{,}000 \times 1{,}350}{15}} \qquad = \sqrt{1{,}29{,}60{,}000} \qquad = 3{,}600 \text{ cartons}$$

Runs = 72,000 ÷ 3,600 = **20 a year**; interval = 365 ÷ 20 = **18.25 days**.

**(ii) Costs at the EBQ.** Set-up 20 × ₹1,350 = **₹27,000**; holding 3,600 ÷ 2 × ₹15 = **₹27,000**; total ₹54,000. The two are equal, which is the check that 3,600 is right.

**(iii) With the kit.** S = 2 × ₹250 + 1 × ₹100 = ₹600; C is unchanged at ₹15.

$$\text{EBQ} = \sqrt{\frac{2 \times 72{,}000 \times 600}{15}} \qquad = \sqrt{57{,}60{,}000} \qquad = 2{,}400 \text{ cartons}$$

Runs = 72,000 ÷ 2,400 = 30 a year; interval = 365 ÷ 30 = 12.17 days.

| Particulars | Without kit | With kit |
|---|---:|---:|
| Run size (EBQ), cartons | 3,600 | 2,400 |
| Runs a year | 20 | 30 |
| Set-up cost (runs × S), ₹ | 27,000 | 18,000 |
| Holding cost (run ÷ 2 × ₹15), ₹ | 27,000 | 18,000 |
| Kit hire, ₹ | — | 12,000 |
| **Total cost a year, ₹** | **54,000** | **48,000** |

::: diagram Cartons: total cost a year by run size, with and without the kit
{"type": "plot", "h": 300, "x": [1000, 8000], "y": [0, 120000], "clip": true,
 "xlabel": "cartons a run", "ylabel": "cost a year (₹)", "legend": "outside",
 "xticks": [[1000, "1,000"], [2400, "2,400"], [3600, "3,600"], [6000, "6,000"], [8000, "8,000"]],
 "yticks": [[0, "0"], [30000, "30,000"], [60000, "60,000"], [90000, "90,000"], [120000, "1,20,000"]],
 "series": [
  {"label": "set-up cost, no kit", "fn": "72000/x*1350", "color": "d"},
  {"label": "holding cost", "fn": "x/2*15", "color": "a"},
  {"label": "total cost, no kit", "fn": "72000/x*1350+x/2*15", "color": "f"},
  {"label": "set-up + holding, with kit", "fn": "72000/x*600+x/2*15", "color": "g", "dash": true}],
 "points": [{"x": 3600, "y": 54000, "label": "₹54,000", "pos": "above"}, {"x": 2400, "y": 36000, "label": "₹36,000", "pos": "below"}],
 "caption": "Without the kit the total (violet) is lowest at 3,600 cartons; with it the set-up and holding total (green, dashed) is lowest at 2,400 cartons, before the ₹12,000 hire."}
:::

**Advice:** hire the kit. Set-up and holding costs fall from ₹54,000 to ₹36,000 a year, a saving of ₹18,000 against the hire of ₹12,000: a net saving of **₹6,000** a year, provided the run size is cut to the new EBQ of 2,400. Kept at 3,600 cartons a run, the kit would save only ₹15,000 (20 × ₹600 + ₹27,000 = ₹39,000), so the net gain would fall to ₹3,000. A lower set-up cost always means a smaller economic batch: the EBQ moves with the square root of S (√(600 ÷ 1,350) = 2/3).
::::
:::::

## Under the hood

### When the number of runs is not a whole number

ICAI rounds runs up and reads the interval from the rounded number: 48,000 ÷ 5,060 = 9.49, "or 10 run", and 365 ÷ 10 = 36.5 days (SM Illustration 6, 8.13); 12.245 "or 13 run", interval 28 days "or 365 ÷ 12.24 = 29.82 days" (SM 8.26). For the cost at the EBQ it shows both: set-up cost with fractional runs (₹2,160) or whole runs (7 set-ups, ₹2,268), and the extra cost as ₹576 or ₹468 (SM 8.25). Show the fractional figure and mention the whole-run one.

### Trial and error against the formula

A table of batch sizes in steps (4,000 to 10,000 litres in SM Illustration 7) finds the cheapest step (7,000 litres, ₹1,414 a year); the formula gives the exact minimum (7,071 litres). The two "slightly vary" (SM 8.15). Use the table when the question asks for it.

### Holding cost from storage space

When holding cost is rent per square metre and each square metre holds a number of units, C = rent ÷ units per square metre: ₹50 ÷ 250 litres = ₹0.20 a litre a year (SM Illustration 7, 8.14).

### What counts as a set-up cost

Only costs incurred each time a run is started: set-up labour, machine changeover, power during set-up. In the SM's soft-drink case, the "other variable cost per batch" and the power used during set-up were taken as the set-up cost per batch (SM 8.30).

## Exam angle

::: exam Where batch costing and EBQ appeared, May 2024 to September 2026 (and the old scheme)
In the documents read for this lesson:

- **Batch cost and price, 5 marks:** May 2026 Q1(a) (a batch of 20 chairs: cost of the batch and selling price per chair at 25% on selling price); January 2025 Q1(b) (batches of 2,000 with a 3% rejection rate and scrap value: contribution per good unit and monthly profit).
- **EBQ multiple choice, 2 marks each**, in seven of the sixteen MTP papers: Series I May 2026 MCQ 15 (frames: monthly demand, carrying cost 10% of unit cost, answer 800); Series II May 2026 MCQ 14; Series I September 2025 MCQ 14; Series I January 2026 MCQ 14; Series I September 2024 MCQ 11; Series I May 2024 MCQ 7 and Series I May 2025 MCQ 4 (optimum run size, with holding cost per month). A batch-cost MCQ besides: Series II September 2024 MCQ 15 (total cost of a batch with a set-up cost).
- **EBQ descriptive:** MTP Series II September 2024 Q1(c) (4 marks: vaccines, carrying cost per month, extra cost of 15,000 a run); old-scheme May 2023 Q1(a) (5 marks: EBQ of 13,500, then the extra ₹12,000 of a 7,500-unit policy); MTP Series II September 2025 Q2(b) (2 marks: rented storage per square metre); RTP May 2024 and RTP September 2026 (the SM soft-drink case, EBQ per bottle size).
- **Theory, 4 to 5 marks:** "how batch size affects set-up costs and holding costs" and "how to determine EBQ": MTP Series I May 2026 Q6(c); the number of batches at which set-up and carrying cost are optimum: MTP Series I September 2026 Q6(c); describe batch costing with examples and its costing procedure: May 2024 Q6(c), MTP Series II May 2026 Q6(b).
:::

::: exam The traps ICAI set
- Carrying cost per month (multiply by 12) or as a percentage of the unit's production cost.
- Monthly demand: annualise before the formula (500 a month × 12 in SM Illustration 5).
- "Extra cost of the present policy": total cost at the policy minus total cost at the EBQ, both set-up and holding.
- Rejections in a batch: cost is spread over the good units only; scrap value reduces cost (January 2025).
:::

::: trick The equal-cost check
At the EBQ, annual set-up cost equals annual holding cost (D ÷ Q × S = Q ÷ 2 × C, which solves to the formula). If your two figures differ, recheck C's period. Condition: the simple EBQ model, with average inventory taken as half the batch.
:::

## Answer frame

**In batch costing, state how the economic batch quantity is determined** (SM 8.18, Q3; MTP Series I May 2026 Q6(c)).

1. In batch production the lot size is critical to the least cost of operation; total production cost comprises two main costs: machine set-up costs and inventory holding costs.
2. If the batch size is higher, set-up costs decline because fewer set-ups are needed, but units in inventory rise and holding costs go up; if it is lower, holding costs fall but set-up costs rise.
3. EBQ is the size of a batch where the total of set-up and holding costs is at a minimum: on a graph, where the two cost lines intersect.
4. It is found by calculating total cost for a series of batch sizes and picking the lowest, or by the formula EBQ = √(2DS ÷ C), with D, S and C defined.

**Describe batch costing, with examples, and its costing procedure** (MTP Series II May 2026 Q6(b)): the SM 8.8 definition; cost per unit = cost of the batch ÷ units in it; examples (ICAI's May 2024 answer: pharmaceutical or drug industries, readymade garments, electronic parts of TV and radio sets; the SM's own: pens, bakery items); then the procedure (one number per batch, materials from requisitions, labour from time cards, overheads on machine or labour hours).

**Distinguish job costing and batch costing**: ICAI's three points in the table in How it works.

## Common mistakes

::: mistake Hall of Shame: the monthly carrying cost used as annual
Holding cost "₹1 per bearing per month" put straight into the formula gives an EBQ √12 times too large (17,527 instead of 5,060 in SM Illustration 6). **Fix:** C is per unit per annum: ₹1 × 12 = ₹12.
:::

::: mistake Monthly demand in an annual formula
500 units a month used as D. **Fix:** D = annual demand, 500 × 12 = 6,000 (SM Illustration 5). Keep D and C over the same period.
:::

::: mistake Set-up cost spread per unit
Charging the per-load costs per piece: (₹300 + ₹320 + ₹360) ÷ 400 = ₹2.45 a nankhatai × 6,100 = ₹14,945, instead of 16 loads × ₹980 = ₹15,680. The part load of 100 still needs a full set-up, a full bakers' shift and 1.5 oven hours. **Fix:** a cost per batch is counted by batches, and a part batch is a whole batch.
:::

::: mistake The extra cost of a policy measured on one cost only
Comparing only set-up costs, a run of 30,000 jars of chai masala (4 runs, ₹9,600) looks ₹14,400 cheaper than the EBQ of 12,000 jars (10 runs, ₹24,000). **Fix:** compare total cost, set-up plus holding: holding rises from ₹24,000 to 15,000 × ₹4 = ₹60,000, so the policy costs ₹21,600 more.
:::

## Practice

::: quiz Check yourself
Q: Annual demand is 36,000 units, the set-up cost is ₹500 a batch and the carrying cost is ₹10 per unit per annum. What is the economic batch quantity, in units?
= 1897.3..1897.4
> EBQ = √(2 × 36,000 × 500 ÷ 10) = √36,00,000 = 1,897.37 units (round to 1,897 in an answer).

Q: Case scenario. Dev reviews the masala unit: demand 1,20,000 jars a year, set-up ₹2,400 a run, holding ₹4 a jar a year. The production head wants 24,000 jars a run to "cut set-up cost in half". Which statement is correct?
- [ ] The proposal saves ₹12,000 a year because set-up cost falls from ₹24,000 to ₹12,000
- [x] The proposal raises total cost from ₹48,000 to ₹60,000 a year, because holding cost doubles to ₹48,000
- [ ] The EBQ is 24,000 jars, so the proposal is optimal
- [ ] Set-up cost does not change with batch size
> At 24,000 a run: 5 runs × ₹2,400 = ₹12,000 set-up; 12,000 average × ₹4 = ₹48,000 holding; total ₹60,000 against ₹48,000 at the EBQ of 12,000.

Q: A batch of 250 units needs materials of ₹6,000, wages of ₹2,000 and a set-up of ₹1,500; production overheads are 60% of wages. What is the production cost per unit, in rupees?
= 42.8
> Production cost = 6,000 + 2,000 + 1,500 + 1,200 = ₹10,700; ÷ 250 = ₹42.80.

Q: Which of these is one of ICAI's differences between job costing and batch costing?
- [x] Jobs are unique and independent of each other; products in a batch are homogeneous and lack individuality
- [ ] Job costing determines cost in aggregate for many jobs and then per unit
- [ ] Batch costing is used for non-standard products made to customer specifications
- [ ] Batch costing never includes set-up costs
> SM 8.15: job costing suits non-standard, non-repetitive products to customer specification, with cost found for each job; batch costing suits homogeneous products in lots, with cost found for the batch and then per unit.

Q: Holding cost is given as ₹0.50 per unit per month and set-up cost as ₹1,200 a run, with monthly demand of 2,000 units. Which inputs give the correct EBQ? Select all that apply.
- [x] D = 24,000 units a year
- [ ] C = ₹0.50
- [x] C = ₹6 per unit per annum
- [x] S = ₹1,200
> D and C must be annual: 2,000 × 12 = 24,000 and ₹0.50 × 12 = ₹6. Then EBQ = √(2 × 24,000 × 1,200 ÷ 6) = 3,098 units.
:::

## Recap

- Batch costing: a type of specific order costing; articles made in predetermined lots; the batch is the cost object (SM 8.8).
- Procedure: a number per batch; materials from requisitions; labour from time cards; overheads on machine or labour hours; cost per unit = batch cost ÷ units.
- Set-up cost is incurred per batch, whatever its size.
- EBQ = size of batch where total set-up and holding costs are minimum: √(2DS ÷ C), D annual, C per unit per annum.
- Runs = D ÷ EBQ (ICAI rounds up); interval = 365 ÷ runs; at EBQ, set-up cost = holding cost.
- Extra cost of a policy = total cost at the policy − total cost at the EBQ.
- Job vs batch (SM 8.15): unique jobs vs homogeneous lots; cost per job vs cost per batch then per unit; individuality vs none.
- Knead the atta for a day or two, not for every roti.

## Flashcards

Q:: ICAI's definition of batch costing?
A:: A type of specific order costing where articles are manufactured in predetermined lots, known as batch; the cost object is a batch for production rather than output as in unit costing.

Q:: Costing procedure in batch costing (SM 8.8)?
A:: One number for each batch; material cost from material requisitions for the batch; labour cost = time on the batch (time cards or job tickets) × rate; overheads absorbed on machine hours, direct labour hours etc.

Q:: Define economic batch quantity.
A:: The size of a batch where the total cost of set-up and holding costs are at a minimum.

Q:: EBQ formula and its symbols?
A:: √(2DS ÷ C): D = annual demand for the product, S = setting-up cost per batch, C = carrying cost per unit of production per annum.

Q:: The two main costs whose total EBQ minimises?
A:: Machine set-up costs and inventory holding costs.

Q:: Two ways of determining EBQ?
A:: Calculating the total cost for a series of possible batch sizes and choosing the minimum, or the formula √(2DS ÷ C).

Q:: At the EBQ, how do annual set-up cost and annual holding cost compare?
A:: They are equal.

Q:: Interval between two runs?
A:: 365 days ÷ number of runs a year (ICAI rounds the runs up).

Q:: Job costing vs batch costing: the three points of SM 8.15?
A:: (1) Non-standard, non-repetitive products to customer specification vs homogeneous products in lots; (2) cost determined for each job vs in aggregate for the batch, then per unit; (3) jobs unique vs batch products lack individuality.

Q:: Holding cost ₹1 per unit per month: what C goes into the EBQ formula?
A:: ₹12 per unit per annum.
