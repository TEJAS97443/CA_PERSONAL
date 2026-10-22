---
id: cma.proc.eu
title: Equivalent units: FIFO and weighted average
minutes: 40
needs: cma.proc.accounts
tags: equivalent units, equivalent production, work-in-process, FIFO, weighted average, statement of evaluation, process costing
labs: process
summary: How partly finished units become equivalent finished units for each cost element, and how the FIFO and weighted average methods value output, losses and work-in-process.
---

## In plain words

### 5,000 kg of achaar that is sort of finished

Every Diwali, Kesar launches something. This year it is Tapri mango achaar. Mango, oil and spices go into the curing vats on day one; the curing (labour, power, the warm room) takes six weeks. On 31 October, 20,000 kg have been jarred and sent to packing, and 5,000 kg are still in the vats, 60% cured.

> **Kesar:** Count the vats as finished. Or don't count them. Whichever gives the nicer cost per kg.
> **Ritu:** Neither. All the mango is in those vats, so for materials they are 5,000 full kilograms. The curing is 60% done, so for labour and overheads they count as 3,000.
> **Kesar:** So half-pickled achaar is pickled achaar at a discount?
> **Ritu:** Per unit, please. It is 3,000 equivalent kilograms of curing.

That is the whole idea of **equivalent units**: units in process are converted into the number of finished units the same work would have made, separately for each **cost element** (material, labour, overheads).

There is a twist. On 1 October, 6,000 kg from September were already in the vats, 40% cured. Ritu can treat them in two ways. **FIFO** (first in, first out) finishes the old vats first and counts only October's 60% of their curing; their September cost stays separate. **Weighted average** pours September's cost into October's pot and treats all 20,000 finished kilograms alike.

::: analogy Four glasses, two glasses of chai
Four glasses half-filled with chai: you have bought four glasses (material, all there) but poured only two glasses of chai (the work, half done). Equivalent units ask the same question twice, once per cost element.
:::

::: key
Equivalent units = units × percentage of work done, worked out separately for each cost element. FIFO counts only this period's work (opening work-in-process gets only its remaining percentage) and divides only this period's cost; weighted average adds the opening work-in-process cost to this period's and counts every completed unit as 100%.
:::

## How it works

### Why work-in-process needs equivalent units

In continuous manufacture, a period's cost is spent on three groups at once: the opening work-in-process (WIP) still being finished, the units started and finished, and the closing WIP. Dividing total cost by completed units would load the closing WIP's cost onto finished goods. WIP could be valued on an actual basis (materials used plus the actual labour and expenses on the unfinished units), but ICAI notes that its accuracy "cannot be satisfactory"; the alternative is to convert partly finished units into **equivalent finished units** (SM 10.15–10.16).

$$\text{Equivalent completed units} \qquad = \text{Actual units in process} \qquad \times \text{Percentage of work completed}$$

ICAI's own example: 200 units 25% done equal 50 completed units, and their cost is the cost of 50 finished units (SM 10.16).

### The five steps of a production cost report

ICAI prepares a **production cost report** for each process at the end of each period (SM 10.18–10.19):

::: steps
1. **Physical flow**: units in (opening WIP, units introduced or transferred in) and units out (completed, losses, closing WIP). The two sides must be equal.
2. **Equivalent units for each cost element**, from the extent of work done on each. Materials put in at the start make closing WIP 100% complete for materials.
3. **Total cost for each element** for the period (and, under weighted average, the opening WIP's cost too), less the scrap value of normal loss.
4. **Cost per equivalent unit** = step 3 ÷ step 2, element by element.
5. **Assign the cost** to units completed and transferred, abnormal loss and closing WIP; post them to the process account.
:::

### The achaar vats, both ways

October: opening WIP 6,000 kg (materials 100%, curing 40%), cost ₹7,20,000 materials and ₹1,93,000 curing. Introduced 19,000 kg: materials ₹24,70,000 (mango prices are up), curing ₹18,54,000. Completed 20,000 kg; closing WIP 5,000 kg (materials 100%, curing 60%).

**Equivalent units, FIFO**

| Output | Kg | Materials | Curing |
|---|---:|---:|---:|
| Opening WIP | 6,000 | 0 | 3,600 (60%) |
| Started and finished | 14,000 | 14,000 | 14,000 |
| Closing WIP | 5,000 | 5,000 | 3,000 (60%) |
| **Total** | **25,000** | **19,000** | **20,600** |

**Equivalent units, weighted average**

| Output | Kg | Materials | Curing |
|---|---:|---:|---:|
| Completed | 20,000 | 20,000 | 20,000 |
| Closing WIP | 5,000 | 5,000 | 3,000 (60%) |
| **Total** | **25,000** | **25,000** | **23,000** |

Under weighted average every completed kilogram counts in full, whenever its work was done.

::: diagram FIFO: curing work done in October
{"type": "plot", "h": 270, "x": [0, 25000], "y": [0, 100], "legend": "none",
 "xlabel": "kg: opening WIP | started and finished | closing WIP", "ylabel": "% of curing",
 "xticks": [[0, "0"], [6000, "6,000"], [20000, "20,000"], [25000, "25,000"]],
 "yticks": [[0, "0"], [40, "40"], [60, "60"], [100, "100"]],
 "regions": [
  {"pts": [[0, 0], [6000, 0], [6000, 40], [0, 40]], "color": "mute", "hatch": true, "label": "Sept."},
  {"pts": [[0, 40], [6000, 40], [6000, 100], [0, 100]], "color": "a", "label": "3,600"},
  {"pts": [[6000, 0], [20000, 0], [20000, 100], [6000, 100]], "color": "b", "label": "14,000"},
  {"pts": [[20000, 0], [25000, 0], [25000, 60], [20000, 60]], "color": "c", "label": "3,000"},
  {"pts": [[20000, 60], [25000, 60], [25000, 100], [20000, 100]], "fill": false, "outline": true, "dash": true, "color": "mute", "label": "Nov."}
 ],
 "caption": "Each block is kg (width) × % of curing done (height), so its area is equivalent units. Blue: finishing the opening WIP; teal: started and finished; amber: closing WIP. Grey hatched: September's work, outside FIFO's count; dashed: November's. Coloured area = 20,600."}
:::

::: diagram Weighted average: the same vats
{"type": "plot", "h": 270, "x": [0, 25000], "y": [0, 100], "legend": "none",
 "xlabel": "kg: opening WIP | started and finished | closing WIP", "ylabel": "% of curing",
 "xticks": [[0, "0"], [6000, "6,000"], [20000, "20,000"], [25000, "25,000"]],
 "yticks": [[0, "0"], [40, "40"], [60, "60"], [100, "100"]],
 "regions": [
  {"pts": [[0, 0], [6000, 0], [6000, 40], [0, 40]], "color": "a", "hatch": true, "label": "2,400"},
  {"pts": [[0, 40], [6000, 40], [6000, 100], [0, 100]], "color": "a", "label": "3,600"},
  {"pts": [[6000, 0], [20000, 0], [20000, 100], [6000, 100]], "color": "b", "label": "14,000"},
  {"pts": [[20000, 0], [25000, 0], [25000, 60], [20000, 60]], "color": "c", "label": "3,000"},
  {"pts": [[20000, 60], [25000, 60], [25000, 100], [20000, 100]], "fill": false, "outline": true, "dash": true, "color": "mute", "label": "Nov."}
 ],
 "caption": "The hatched blue block is September's 40% of the opening WIP: weighted average counts it, together with its September cost of ₹1,93,000. Coloured area = 23,000 = 20,000 completed + 3,000 in closing WIP."}
:::

**Cost per equivalent unit**

- FIFO, October's cost only: materials ₹24,70,000 ÷ 19,000 = ₹130; curing ₹18,54,000 ÷ 20,600 = ₹90.
- Weighted average, September's cost added: materials (₹7,20,000 + ₹24,70,000) ÷ 25,000 = ₹127.60; curing (₹1,93,000 + ₹18,54,000) ÷ 23,000 = ₹89.

| Element | FIFO (₹) | Weighted average (₹) |
|---|---:|---:|
| Materials | 130.00 | 127.60 |
| Curing | 90.00 | 89.00 |
| **Total** | **220.00** | **216.60** |

**Where the ₹52,37,000 goes**

| Particulars | FIFO (₹) | Weighted average (₹) |
|---|---:|---:|
| Opening WIP (₹9,13,000 + 3,600 × ₹90) | 12,37,000 | – |
| Started and finished (14,000 × ₹220) | 30,80,000 | – |
| Completed (20,000 × ₹216.60) | – | 43,32,000 |
| **Transferred to packing** | **43,17,000** | **43,32,000** |
| Closing WIP (5,000 materials, 3,000 curing) | 9,20,000 | 9,05,000 |
| **Total** | **52,37,000** | **52,37,000** |

With mango prices rising, FIFO's closing WIP carries October's higher cost: under FIFO "the ==closing stock of work in process is valued at current cost==" (SM 10.19). Weighted average spreads September's cheaper cost over everything. The two equivalent-unit totals differ by exactly the opening WIP's work done last period (6,000 for materials, 2,400 for curing).

::: lab process {"mode":"wip","method":"fifo"}
Step through the five statements yourself, FIFO first, on Tapri's kulhad glaze: physical flow, equivalent units, cost, cost per unit, evaluation.
:::

::: lab process {"mode":"wip","method":"avg"}
Then the same glaze by weighted average: compare its equivalent units with the FIFO ones, element by element.
:::

### Losses in the statement

ICAI's footnotes to the statement of equivalent units (SM 10.17):

- **Normal loss**: ==no equivalent unit is calculated==. Its cost is absorbed by the good units, and its scrap value is deducted from the cost (usually from materials).
- **Abnormal loss**: equivalent units at its stage of completion for each element, which the question gives (80% for labour and overheads in SM Problem 4). A loss found when the process ends is 100% complete, as in the Study Material's case scenario (SM 10.49); some questions say so outright ("any loss beyond normal loss is considered 100% complete", MTP Series II for January 2026).
- **Abnormal gain**: treated as 100% complete for all elements, whatever the percentage of completion, and deducted.
- **Finished output** under FIFO = units completed and transferred less opening WIP; under weighted average = all units completed and transferred.

## Formats and formulas

### Statement of equivalent production

ICAI's statement has ten columns: input details and units, output particulars and units, then the percentage and units for materials, labour and overheads. Below, the input side comes first and the percentages are left out to fit a phone; on paper, write a % column before each element's units. *Reproduce it from memory.*

| Input details | Units |
|---|---:|
| Opening WIP | xxx |
| Units introduced (or transferred in) | xxx |
| **Total** | **xxx** |

| Output particulars | Units | Material | Labour | Overheads |
|---|---:|---:|---:|---:|
| Opening WIP (1) | xxx | xxx | xxx | xxx |
| Finished output (2) | xxx | xxx | xxx | xxx |
| Normal loss (3) | xxx | – | – | – |
| Abnormal loss (4) | xxx | xxx | xxx | xxx |
| Less: Abnormal gain (5) | (xxx) | (xxx) | (xxx) | (xxx) |
| Closing WIP (4) | xxx | xxx | xxx | xxx |
| **Total** | **xxx** | **xxx** | **xxx** | **xxx** |

(1) FIFO only: units × (100% − % done before). (2) FIFO: units completed less opening WIP; weighted average: all units completed; 100%. (3) No equivalent units. (4) Units × % complete. (5) 100% for every element.

### Statement of cost per equivalent unit

| Particulars | Materials | Labour | Overheads | Total |
|---|---:|---:|---:|---:|
| Cost of opening WIP (weighted average only) | xxx | xxx | xxx | xxx |
| Cost incurred during the period | xxx | xxx | xxx | xxx |
| Less: Scrap value of normal loss | (xxx) | – | – | (xxx) |
| **Total cost (A)** | **xxx** | **xxx** | **xxx** | **xxx** |
| Equivalent units (B) | xxx | xxx | xxx | |
| **Cost per equivalent unit (A ÷ B)** | **xxx** | **xxx** | **xxx** | **xxx** |

### Statement of evaluation (also called apportionment or distribution of cost)

| FIFO | Weighted average |
|---|---|
| (i) Opening WIP: cost b/f + equivalent units to complete × cost per EU | (i) Units completed and transferred × cost per EU |
| (ii) Units started and completed × cost per EU | (ii) Abnormal loss (or gain), element-wise |
| (iii) Abnormal loss (or gain), element-wise | (iii) Closing WIP, element-wise |
| (iv) Closing WIP, element-wise | |

The process account then shows units and amounts as in [[cma.proc.accounts|process accounts]], with opening WIP on the debit side and closing WIP on the credit side.

::: formula Equivalent units, FIFO
$$\text{EU} = \text{Opening WIP} \qquad \times (100\% - \%\ \text{done before}) \qquad + \text{Started and completed} \qquad + \text{Abnormal loss} \times \% \qquad - \text{Abnormal gain} \qquad + \text{Closing WIP} \times \%$$
One line per cost element.
:::

::: formula Equivalent units, weighted average
$$\text{EU} = \text{Units completed} \qquad + \text{Abnormal loss} \times \% \qquad - \text{Abnormal gain} \qquad + \text{Closing WIP} \times \%$$
:::

::: formula Cost per equivalent unit
$$\text{Cost to divide, FIFO} \qquad = \text{Period's cost} - \text{Scrap of normal loss}$$

$$\text{Cost to divide, weighted average} \qquad = \text{Opening WIP cost} \qquad + \text{Period's cost} - \text{Scrap of normal loss}$$

$$\text{Cost per EU} = \frac{\text{Cost to divide}}{\text{Equivalent units}}$$

Scrap of normal loss is its realisable value. Work each cost element separately.
:::

::: formula The bridge between the two
$$\text{EU (weighted average)} - \text{EU (FIFO)} \qquad = \text{Opening WIP} \qquad \times \%\ \text{done last period}$$
Holds for each cost element; a quick check on both statements.
:::

::: definition Equivalent units
Equivalent units or equivalent production units means converting the incomplete production units into their equivalent completed units. (SM 10.16)
:::

::: definition FIFO method
Units completed and transferred are taken from both opening WIP and freshly introduced inputs. The cost to complete the opening WIP and the other completed units are calculated separately; the cost of opening WIP is added to the cost of completing it. Closing WIP is valued at current cost. (SM 10.19)
:::

::: definition Weighted average method
The cost of opening work-in-process and the cost of the current period are aggregated, and the aggregate cost is divided by output in terms of completed units. Equivalent production consists of the work-load already contained in opening WIP and the work-load of the current period. (SM 10.21)
:::

## Worked examples

::::: example FIFO: cold-brew chai, and the caps go on last
Tapri's cold-brew chai is steeped, filled into 1-litre bottles and capped in one continuous process. For November:

| Particulars | Litres | Amount (₹) |
|---|---:|---:|
| Opening WIP | 3,000 | 2,10,000 |
| Introduced: brew ingredients | 22,000 | 14,40,560 |
| Bottles and caps | | 4,69,040 |
| Labour | | 4,40,400 |
| Overheads | | 3,30,300 |
| Lost in process | 1,180 | |
| Closing WIP | 2,500 | |

The brew ingredients go in at the start. Labour and overheads are incurred evenly and are always at the same stage, so treat them together as conversion. Each litre is bottled and capped at the very end of the process. Opening WIP was 40% complete for conversion and closing WIP 70%; neither had been bottled. The rest was transferred to finished stock.

Normal loss is 4% of the litres introduced this month. The loss beyond normal came from a leaking valve in the steeping tank and was found when that brew was half way through conversion. Lost brew is sold to a biogas plant at ₹5 a litre, and its value is deducted from the cost of brew ingredients.

**Required:** Using the FIFO method,

(i) Prepare the statement of equivalent production.

(ii) Calculate the cost per equivalent unit for each element.

(iii) Calculate the cost of abnormal loss, closing WIP and the litres transferred.

(iv) Prepare the Process Account and the Abnormal Loss Account.

:::: answer Show the working
**Working notes:** transferred = 3,000 + 22,000 − 1,180 − 2,500 = 21,320 litres, of which 3,000 came from opening WIP and 18,320 were started and completed. Normal loss = 4% × 22,000 = 880 litres, so abnormal loss = 1,180 − 880 = 300 litres. Bottles go on only at the end: every litre transferred gets one this month (the opening WIP's 3,000 included), and no litre lost or in closing WIP has one.

**(i) Statement of equivalent production (FIFO)**

| Output | Litres | Brew | Bottles | Conversion |
|---|---:|---:|---:|---:|
| From opening WIP | 3,000 | – | 3,000 | 1,800 (60%) |
| Started and completed | 18,320 | 18,320 | 18,320 | 18,320 |
| Normal loss | 880 | – | – | – |
| Abnormal loss | 300 | 300 | – | 150 (50%) |
| Closing WIP | 2,500 | 2,500 | – | 1,750 (70%) |
| **Total (= 3,000 + 22,000)** | **25,000** | **21,120** | **21,320** | **22,020** |

**(ii) Cost per equivalent unit**

| Element | Cost (₹) | EU | Cost per EU (₹) |
|---|---:|---:|---:|
| Brew (14,40,560 − 880 × ₹5) | 14,36,160 | 21,120 | 68.00 |
| Bottles and caps | 4,69,040 | 21,320 | 22.00 |
| Conversion (4,40,400 + 3,30,300) | 7,70,700 | 22,020 | 35.00 |
| **Total** | **26,75,900** | | **125.00** |

**(iii) Statement of evaluation**

| Particulars | Working | Amount (₹) |
|---|---|---:|
| Opening WIP: cost b/f | | 2,10,000 |
| Add: bottling it | 3,000 × ₹22 | 66,000 |
| Add: completing its conversion | 1,800 × ₹35 | 63,000 |
| Started and completed | 18,320 × ₹125 | 22,90,000 |
| **Transferred to finished stock (21,320 litres)** | | **26,29,000** |
| Abnormal loss | 300 × ₹68 + 150 × ₹35 | 25,650 |
| Closing WIP | 2,500 × ₹68 + 1,750 × ₹35 | 2,31,250 |

**(iv) Process Account** (debit side)

| Dr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| To Opening WIP | 3,000 | 2,10,000 |
| To Brew ingredients | 22,000 | 14,40,560 |
| To Bottles and caps | – | 4,69,040 |
| To Labour | – | 4,40,400 |
| To Overheads | – | 3,30,300 |
| **Total** | **25,000** | **28,90,300** |

**Process Account** (credit side)

| Cr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (880 × ₹5) | 880 | 4,400 |
| By Abnormal loss A/c | 300 | 25,650 |
| By Finished stock A/c | 21,320 | 26,29,000 |
| By Closing WIP c/d | 2,500 | 2,31,250 |
| **Total** | **25,000** | **28,90,300** |

**Abnormal Loss Account**

::: cols
| Dr. | Litres | (₹) |
|---|---:|---:|
| To Process A/c | 300 | 25,650 |
| **Total** | **300** | **25,650** |
---
| Cr. | Litres | (₹) |
|---|---:|---:|
| By Bank (300 × ₹5) | 300 | 1,500 |
| By Costing P&L A/c | – | 24,150 |
| **Total** | **300** | **25,650** |
:::

Treating the bottles like the brew, 100% for every litre in the process, would put bottles into the closing WIP and the abnormal loss that were never filled.
::::
:::::

::::: example Weighted average: bhujia in the fryer, two trays of WIP
Tapri's bhujia is made in two processes, Mixing and then Frying. Frying receives dough from Mixing at Mixing's cost and adds its own labour and overheads. For January, Frying shows:

| Particulars | Kg | Amount (₹) |
|---|---:|---:|
| Opening WIP: cost from Mixing | 3,000 | 1,29,000 |
| Opening WIP: labour (60% done) | | 19,500 |
| Opening WIP: overheads (50% done) | | 16,500 |
| Received from Mixing | 37,000 | 16,31,000 |
| Labour | | 4,59,550 |
| Overheads | | 5,30,700 |

Transferred to Packing: 35,700 kg. Closing WIP: 2,800 kg in two lots, 1,800 kg that was 75% complete for labour and 60% for overheads, and 1,000 kg that had just entered the fryer, 30% complete for labour and 20% for overheads. Normal loss is 5% of total input (opening WIP plus kg received); burnt crumbs sell at ₹25 a kg, credited against the cost received from Mixing.

**Required:** Using the weighted average method, prepare:

(i) The statement of equivalent production.

(ii) The statement of cost.

(iii) The statement of distribution of cost.

(iv) The Frying Process Account and the Abnormal Gain Account.

:::: answer Show the working
**Working notes:** total input 3,000 + 37,000 = 40,000 kg; normal loss 5% = 2,000 kg; actual loss = 40,000 − 35,700 − 2,800 = 1,500 kg. The loss is 500 kg less than normal: an **abnormal gain** of 500 kg, 100% complete for every element. Dough from Mixing is Frying's material: 100% complete for every kg in Frying, both WIP lots included. Weighted average does not use the opening WIP's 60% and 50%: its cost is pooled with January's, and its units count among the completed units.

**(i) Statement of equivalent production**

| Output | Kg | From Mixing | Labour | Overheads |
|---|---:|---:|---:|---:|
| Completed and transferred | 35,700 | 35,700 | 35,700 | 35,700 |
| Normal loss | 2,000 | – | – | – |
| Closing WIP, lot 1 | 1,800 | 1,800 | 1,350 (75%) | 1,080 (60%) |
| Closing WIP, lot 2 | 1,000 | 1,000 | 300 (30%) | 200 (20%) |
| Less: Abnormal gain | (500) | (500) | (500) | (500) |
| **Total** | **40,000** | **38,000** | **36,850** | **36,480** |

**(ii) Statement of cost**

| Particulars | From Mixing | Labour | Overheads | Total |
|---|---:|---:|---:|---:|
| Opening WIP (₹) | 1,29,000 | 19,500 | 16,500 | 1,65,000 |
| January (₹) | 16,31,000 | 4,59,550 | 5,30,700 | 26,21,250 |
| Less: Scrap of normal loss (₹) | (50,000) | – | – | (50,000) |
| **Total cost (₹)** | **17,10,000** | **4,79,050** | **5,47,200** | **27,36,250** |
| Equivalent units | 38,000 | 36,850 | 36,480 | |
| **Cost per EU (₹)** | **45.00** | **13.00** | **15.00** | **73.00** |

**(iii) Statement of distribution of cost**

| Particulars | Working | Amount (₹) |
|---|---|---:|
| Completed and transferred | 35,700 × ₹73 | 26,06,100 |
| Closing WIP, lot 1 | 1,800 × ₹45 + 1,350 × ₹13 + 1,080 × ₹15 | 1,14,750 |
| Closing WIP, lot 2 | 1,000 × ₹45 + 300 × ₹13 + 200 × ₹15 | 51,900 |
| **Closing WIP** | | **1,66,650** |
| Abnormal gain | 500 × ₹73 | 36,500 |

Check: ₹26,06,100 + ₹1,66,650 − ₹36,500 = ₹27,36,250, the total cost.

**(iv) Frying Process Account** (debit side)

| Dr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| To Opening WIP | 3,000 | 1,65,000 |
| To Mixing process A/c | 37,000 | 16,31,000 |
| To Labour | – | 4,59,550 |
| To Overheads | – | 5,30,700 |
| To Abnormal gain A/c | 500 | 36,500 |
| **Total** | **40,500** | **28,22,750** |

**Frying Process Account** (credit side)

| Cr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (2,000 × ₹25) | 2,000 | 50,000 |
| By Packing A/c | 35,700 | 26,06,100 |
| By Closing WIP c/d | 2,800 | 1,66,650 |
| **Total** | **40,500** | **28,22,750** |

**Abnormal Gain Account**

::: cols
| Dr. | Kg | (₹) |
|---|---:|---:|
| To Normal loss A/c (500 × ₹25) | 500 | 12,500 |
| To Costing P&L A/c | – | 24,000 |
| **Total** | **500** | **36,500** |
---
| Cr. | Kg | (₹) |
|---|---:|---:|
| By Frying process A/c | 500 | 36,500 |
| **Total** | **500** | **36,500** |
:::
::::
:::::

::::: example The two printouts: rebuild the month from equivalent units
The ERP at Tapri's chai-concentrate plant crashed while printing October's production cost report. Before it died it printed two summary lines, one for the FIFO report used by the plant and one for the weighted average report used by the head office:

| Equivalent units | Materials | Conversion |
|---|---:|---:|
| Weighted average | 10,800 | 9,900 |
| FIFO | 9,800 | 9,500 |

The FIFO report's cost per equivalent unit was ₹150 for materials and ₹100 for conversion. Ritu also knows:

- Opening WIP: 1,000 litres, valued at ₹1,69,300 (materials ₹1,39,200, conversion ₹30,100). Its stage of completion for conversion is not on record.
- All materials are added at the start of the process.
- Closing WIP: 1,500 litres, 40% complete for conversion.
- Normal loss is 2% of the litres introduced during the month, has no realisable value and is found at the end of the process. There was no abnormal loss or gain.

**Required:** Calculate

(i) The stage of completion of the opening WIP for conversion.

(ii) The litres introduced, the normal loss and the litres completed and transferred.

(iii) The cost of materials and of conversion added during October.

(iv) The value of output transferred and of closing WIP under FIFO.

(v) The cost per equivalent unit, the output transferred and the closing WIP under weighted average, and why the two closing WIP values differ.

(vi) Also prepare the Process Account under FIFO.

:::: answer Show the working
**(i) Stage of opening WIP.** The two methods differ only in the opening WIP's work done last period: EU (weighted average) − EU (FIFO) = opening WIP × % done last period. Conversion: 9,900 − 9,500 = 400 = 1,000 × **40%**, so 60% was done in October. (Materials: 10,800 − 9,800 = 1,000 = 1,000 × 100%, as materials go in at the start.)

**(ii) Litres.** Under weighted average the materials EU are completed units plus closing WIP at 100%: completed = 10,800 − 1,500 = **9,300 litres**. Under FIFO they are units started and completed plus closing WIP: started and completed = 9,800 − 1,500 = 8,300 (= 9,300 − 1,000). Normal loss has no equivalent units, so FIFO's 9,800 is the litres introduced less the 2% normal loss: litres introduced = 9,800 ÷ 98% = **10,000**, normal loss = **200 litres**.

::: diagram The month's litres: what went in equals what came out
{"type": "nest", "w": 380, "dir": "h",
 "boxes": [
  {"title": "In", "mono": false, "color": "a", "rows": [["Opening WIP", "1,000"], ["Introduced", "10,000"], ["Total", "11,000"]]},
  {"title": "Out", "mono": false, "color": "b", "rows": [["Finished goods", "9,300"], ["Normal loss", "200"], ["Closing WIP", "1,500"], ["Total", "11,000"]]}
 ],
 "caption": "Introduced is found from FIFO's materials EU: 98% of it is 8,300 + 1,500 = 9,800 litres, so 10,000 litres went in."}
:::

**Statement of equivalent production (FIFO)**, which reproduces the printout:

| Output | Litres | Materials | Conversion |
|---|---:|---:|---:|
| From opening WIP | 1,000 | – | 600 (60%) |
| Started and completed | 8,300 | 8,300 | 8,300 |
| Normal loss | 200 | – | – |
| Closing WIP | 1,500 | 1,500 | 600 (40%) |
| **Total (= 1,000 + 10,000)** | **11,000** | **9,800** | **9,500** |

**(iii) Costs added in October** (FIFO divides only the period's cost): materials 9,800 × ₹150 = **₹14,70,000**; conversion 9,500 × ₹100 = **₹9,50,000**.

**(iv) FIFO evaluation**

| Particulars | Working | Amount (₹) |
|---|---|---:|
| Opening WIP b/f | | 1,69,300 |
| Completing it | 600 × ₹100 | 60,000 |
| Started and completed | 8,300 × ₹250 | 20,75,000 |
| **Output transferred (9,300 litres)** | | **23,04,300** |
| Closing WIP | 1,500 × ₹150 + 600 × ₹100 | 2,85,000 |

**(v) Weighted average.** Materials (₹1,39,200 + ₹14,70,000) ÷ 10,800 = ₹149; conversion (₹30,100 + ₹9,50,000) ÷ 9,900 = ₹99.

| Particulars | Working | Amount (₹) |
|---|---|---:|
| Output transferred | 9,300 × ₹248 | 23,06,400 |
| Closing WIP | 1,500 × ₹149 + 600 × ₹99 | 2,82,900 |
| **Total** | | **25,89,300** |

Both methods distribute the same ₹25,89,300 (₹1,69,300 + ₹14,70,000 + ₹9,50,000). FIFO's closing WIP is ₹2,100 higher because it is valued at October's cost (₹150 and ₹100), while weighted average blends in the opening WIP's cheaper September cost (₹139.20 a litre for materials, ₹30,100 ÷ 400 = ₹75.25 per EU for conversion). Under FIFO the closing stock of work in process is valued at current cost (SM 10.19).

**(vi) Process Account (FIFO)** (debit side)

| Dr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| To Opening WIP | 1,000 | 1,69,300 |
| To Materials | 10,000 | 14,70,000 |
| To Conversion (labour and overheads) | – | 9,50,000 |
| **Total** | **11,000** | **25,89,300** |

**Process Account (FIFO)** (credit side)

| Cr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (no realisable value) | 200 | – |
| By Finished goods A/c | 9,300 | 23,04,300 |
| By Closing WIP c/d | 1,500 | 2,85,000 |
| **Total** | **11,000** | **25,89,300** |
::::
:::::

## Under the hood

### Transferred-in units and materials added late

In a second process, the cost transferred from the first is an element of its own, 100% complete for every unit received, including closing WIP (RTP May 2025 Q14 treats "cost of units transferred from Process I" this way). A material added only on completion, such as protective packing at the end of the last process, belongs to finished units only: ICAI adds the packing cost straight to the cost of finished stock (SM 10.46, Problem 5; RTP September 2026 Q11 does the same).

### The base of the normal loss, again

"10% of total input including units in process at the beginning" (SM 10.19) and "10% of input (fresh)" (SM 10.37) give different abnormal losses from the same figures. Read the base before anything else.

### Rounding differences

ICAI rounds cost per EU to two or three decimals and notes that "the difference in total amount may arise due to rounding off error" (SM 10.21). In its Problem 6 it adds an ₹18 difference to the abnormal loss so that the process account balances (SM 10.48).

### When the shortcut happens to work

In the Study Material's fire case (SM 10.50), the output was valued simply as 3,400 litres × ₹660. That gives the FIFO answer only because the opening WIP's b/f value plus its cost to complete happens to equal 500 × ₹660. In the two-printout example it does not: 9,300 × ₹250 = ₹23,25,000, but the correct FIFO value is ₹23,04,300. Value the opening WIP separately unless the question says otherwise.

## Exam angle

::: exam Where equivalent units appeared in the documents read for this lesson
- **Rebuild the month from the cost per EU** (quantity introduced, normal and abnormal loss, costs added, closing WIP, output): the Study Material's case scenario (SM 10.37), reproduced as the case-scenario MCQs of MTP Series I for May 2024; MTP Series I for May 2026 Q4(b) (7 marks); September 2026 Q4(b) (5 marks).
- **Full FIFO statement with losses**: September 2024 Case Scenario I, MCQs 1–5 (equivalent units, cost per unit, abnormal loss, transfer, closing WIP); RTP September 2024 Q14 (abnormal gain).
- **Weighted average**: MTP Series I for January 2026 Q4(a) (8 marks, abnormal loss 80% complete); RTP May 2025 Q14, repeated as RTP January 2026 Q14 (two processes, missing figures); MTP Series II for January 2026 Q2(a) (8 marks).
- **Two processes, no opening WIP, packing added at the end of Process II**: RTP September 2026 Q11, the Study Material's Problem 5 with new figures.
- **No opening WIP**: May 2025 Q5(a) (4 marks: equivalent units, cost per EU, closing WIP and finished output).
- **Single MCQs, 2 marks**: FIFO conversion EU, September 2026 MCQ 11 and MTP Series II for September 2025 MCQ 13; units completed worked back from FIFO EU, RTP May 2026 MCQ 4.
:::

::: lab process {"mode":"wip","method":"fifo","openUnits":12000,"introduced":74500,"completed":82000,"closeUnits":2600,"nlPct":2,"nlBase":"total","scrap":2,"abBasis":"own","abPct":"100, 70, 70","wipElements":[["Material",166200,476465],["Labour",0,370395],["Overheads",0,296316]],"openPct":"100, 80, 80","closePct":"100, 60, 60"}
Here is the September 2024 Case Scenario I, a full FIFO statement with normal and abnormal loss, worked to every figure its five MCQs asked for.
:::

::: exam What the suggested answers do
- Present three statements in this order: equivalent production, cost per EU element by element, evaluation (distribution) of cost; then the process account.
- Deduct the scrap value of normal loss from materials when the question says so (September 2024: "deducted from cost of material introduced").
- Show abnormal gain as a "Less" row at 100% (RTP September 2024 Q14).
:::

::: trick Same EU totals, both ways
Units out (including normal loss) must equal units in, on every statement. And EU (weighted average) − EU (FIFO) = opening WIP × % done last period, element by element. Both checks hold for any data; if either fails, a row is in the wrong place.
:::

## Answer frame

### "Explain briefly the procedure for the valuation of work-in-process"

The chapter's own theory question (SM 10.31); ICAI's answer is paragraph 4 (SM 10.15–10.16):

1. The average cost per unit is total cost ÷ units produced, but in continuous manufacture the period's cost covers opening WIP, closing WIP and completed units.
2. So the cost of WIP at the beginning and at the end must be ascertained to find the cost of each completed unit.
3. WIP holds units at every stage of completion, which makes valuation difficult.
4. It can be valued on an actual basis (materials used and actual labour and expenses), but the accuracy is not satisfactory.
5. The alternative converts partly finished units into equivalent finished units; then name the two methods, FIFO and weighted average.

### "Explain equivalent units"

Definition (converting incomplete units into equivalent completed units); the estimate of percentage completion for each element, which "should be as accurate as possible"; the formula; ICAI's example of 200 units at 25% = 50 completed units (SM 10.16).

### "Distinguish between FIFO and weighted average"

::: compare
| Point | FIFO | Weighted average |
|---|---|---|
| Opening WIP | Work and cost kept separate; only the remaining work is counted | Units and cost taken in full |
| Cost divided | Current period only | Opening WIP cost + current period |
| Completed units | Opening WIP and fresh units costed separately | All treated as equally complete, one rate |
| Closing WIP | At current cost | At the average cost |
:::

The Study Material's one-line version: "units of opening work in process and their cost are taken in full under average method while under FIFO method only the remaining work done now is considered" (SM 10.22).

## Common mistakes

::: mistake Hall of Shame: the opening WIP counted at the work already done
Counting the achaar's opening WIP as 6,000 × 40% = 2,400 equivalent kg under FIFO. **Fix:** the 40% was done in September; FIFO counts October's remaining 60%, 3,600 equivalent kg.
:::

::: mistake Every litre transferred at this month's rate
Valuing FIFO output as 9,300 × ₹250 = ₹23,25,000. **Fix:** under FIFO the opening WIP brings its own b/f cost: ₹1,69,300 + ₹60,000 to complete + 8,300 × ₹250 = ₹23,04,300.
:::

::: mistake Equivalent units for the normal loss
Giving the 2,000 kg of normal loss equivalent units, which lowers the cost per unit and leaves its cost nowhere. **Fix:** normal loss has no equivalent units; only its scrap value is deducted from the cost.
:::

::: mistake The abnormal gain that was added
Adding the 500 kg of abnormal gain to equivalent units. **Fix:** abnormal gain is deducted, at 100% for every element; the units column still balances because the normal loss row is in full.
:::

## Practice

::: quiz Check yourself
Q: Tapri's tomato chutney line adds tomatoes at the start and the spice mix when a batch is 50% cooked; conversion is incurred evenly. In March, opening WIP was 4,000 kg, 30% cooked; 30,000 kg were completed and transferred; closing WIP was 5,000 kg, 60% cooked. There were no losses. What are the equivalent units for conversion under the weighted average method?
= 33000
> All 30,000 kg completed count at 100%, plus closing WIP 5,000 × 60% = 3,000: 33,000. Under weighted average the opening WIP's 30% does not enter the count.

Q: Same data. Under FIFO, what are the equivalent units for conversion and for the spice mix?
- [ ] Conversion 30,200; spice mix 35,000
- [ ] Conversion 31,800; spice mix 31,000
- [x] Conversion 31,800; spice mix 35,000
- [ ] Conversion 33,000; spice mix 35,000
> Conversion: opening WIP 4,000 × 70% still to do = 2,800, plus 26,000 started and completed, plus closing 5,000 × 60% = 3,000: 31,800 (30,200 counts the 30% done last month; 33,000 is the weighted average). Spice goes in at the 50% point, so the opening WIP (30% cooked) receives all of it this month (4,000) and the closing WIP (60% cooked) already has it (5,000): 4,000 + 26,000 + 5,000 = 35,000. 31,000 forgets the opening WIP's spice.

Q: Case scenario. Mango prices rose sharply this month at the achaar plant; the opening WIP in the vats carries last month's lower cost, and this month's cost per equivalent unit is higher for both materials and curing. Dev asks Ritu which of the following is correct for this month.
- [x] FIFO values closing WIP higher than weighted average, because it uses only this month's cost per equivalent unit
- [ ] Weighted average values closing WIP higher, because it includes the opening WIP's cost
- [ ] Both methods give the same closing WIP, because the equivalent units of closing WIP are the same
- [ ] FIFO transfers more cost to packing than weighted average
> FIFO values closing WIP at current cost (SM 10.19), which is higher when prices rise. In the achaar example FIFO's closing WIP is ₹9,20,000 against ₹9,05,000, and it transfers less (₹43,17,000 against ₹43,32,000).

Q: Which statements about the statement of equivalent production are correct? Select all that apply.
- [x] Normal loss is given no equivalent units
- [x] Abnormal gain is treated as 100% complete for all elements and deducted
- [ ] Abnormal loss is always treated as 100% complete
- [x] Opening WIP is shown separately only under FIFO
> Abnormal loss takes its own stage of completion (80% in SM Problem 4); the other three are ICAI's footnotes (SM 10.17).

Q: Under weighted average, opening WIP materials cost ₹40,000, materials introduced ₹3,20,000 and the scrap value of normal loss ₹10,000. Equivalent units for materials are 14,000. What is the cost per equivalent unit for materials, in rupees?
= 25
> (₹40,000 + ₹3,20,000 − ₹10,000) ÷ 14,000 = ₹25.
:::

## Recap

- Equivalent units = units × % of work done, separately for each cost element.
- Five steps: physical flow, EU per element, cost per element, cost per EU, assign costs.
- FIFO: opening WIP gets only its remaining %; divide only the period's cost; opening WIP's b/f cost is added to its completion cost; closing WIP at current cost.
- Weighted average: all completed units at 100%; divide opening WIP cost + period cost.
- EU (weighted average) − EU (FIFO) = opening WIP × % done last period.
- Normal loss: no EU, scrap value deducted. Abnormal loss: at its stage of completion. Abnormal gain: 100%, deducted.
- Order of statements: equivalent production, cost per EU, evaluation, process account. (Half-pickled achaar is 3,000 equivalent kilograms of curing.)

## Flashcards

Q:: ICAI's formula for equivalent completed units?
A:: Actual number of units in the process of manufacture × percentage of work completed.

Q:: FIFO: equivalent units of opening WIP?
A:: Opening WIP units × the percentage of work still to be done in the current period (100% minus the percentage done earlier).

Q:: Under which method is closing WIP valued at current cost?
A:: FIFO.

Q:: Weighted average: what is divided by the equivalent units?
A:: The cost of opening work-in-process plus the cost of the current period (less the scrap value of normal loss).

Q:: Equivalent units for normal loss?
A:: None; normal loss is given no equivalent units.

Q:: How is abnormal gain treated in the statement of equivalent production?
A:: As 100% complete for all cost elements, irrespective of the percentage of completion, and deducted.

Q:: Finished output in the statement of equivalent units: FIFO vs weighted average?
A:: FIFO: units completed and transferred less opening WIP. Weighted average: all units completed and transferred.

Q:: Main difference between FIFO and weighted average (ICAI)?
A:: Under average, units of opening WIP and their cost are taken in full; under FIFO only the remaining work done now is considered.

Q:: The five steps of a production cost report, in order?
A:: Physical flow of units; equivalent units for each element; total cost for each element; cost per equivalent unit; assignment of cost to completed units, WIP and abnormal loss.

Q:: Link between weighted average and FIFO equivalent units?
A:: EU (weighted average) − EU (FIFO) = opening WIP units × percentage completed in the previous period, for each element.
