---
id: cma.proc.eu
title: Equivalent units: FIFO and weighted average
minutes: 40
needs: cma.proc.accounts
tags: equivalent units, equivalent production, work-in-process, FIFO, weighted average, statement of evaluation, process costing
labs:
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

::::: example FIFO: bottled chai and a leaking valve
Tapri's bottled kadak chai is brewed in Process I and then bottled. For November:

| Particulars | Litres | Amount (₹) |
|---|---:|---:|
| Opening WIP (materials 100%, labour and overheads 60%) | 2,000 | 1,58,000 |
| Introduced: materials | 18,000 | 13,78,000 |
| Labour | | 5,29,515 |
| Overheads | | 3,36,200 |
| Lost in process (materials 100%, labour and overheads 70%) | 1,300 | |
| Closing WIP (materials 100%, labour and overheads 40%) | 1,500 | |

The rest was transferred to Bottling. Normal loss is 5% of total input (opening WIP plus litres introduced); lost liquid is sold to a biogas plant at ₹18 a litre, and its value is deducted from the cost of materials.

**Required:** Using the FIFO method,

(i) Prepare the statement of equivalent production.

(ii) Calculate the cost per equivalent unit for each element.

(iii) Calculate the cost of abnormal loss, closing WIP and the litres transferred.

(iv) Prepare the Process I Account and the Abnormal Loss Account.

:::: answer Show the working
**Working notes:** transferred = 20,000 − 1,300 − 1,500 = 17,200 litres, of which 2,000 came from opening WIP and 15,200 were started and completed. Normal loss = 5% × 20,000 = 1,000 litres, so abnormal loss = 1,300 − 1,000 = 300 litres.

**(i) Statement of equivalent production (FIFO)**

| Output | Litres | Materials | Labour and overheads |
|---|---:|---:|---:|
| From opening WIP | 2,000 | – | 800 (40%) |
| Started and completed | 15,200 | 15,200 | 15,200 |
| Normal loss | 1,000 | – | – |
| Abnormal loss | 300 | 300 | 210 (70%) |
| Closing WIP | 1,500 | 1,500 | 600 (40%) |
| **Total (= input 2,000 + 18,000)** | **20,000** | **17,000** | **16,810** |

**(ii) Cost per equivalent unit**

| Element | Cost (₹) | EU | Cost per EU (₹) |
|---|---:|---:|---:|
| Materials (13,78,000 − 1,000 × ₹18) | 13,60,000 | 17,000 | 80.00 |
| Labour | 5,29,515 | 16,810 | 31.50 |
| Overheads | 3,36,200 | 16,810 | 20.00 |
| **Total** | **22,25,715** | | **131.50** |

**(iii) Statement of evaluation**

| Particulars | Working | Amount (₹) |
|---|---|---:|
| Opening WIP: cost b/f | | 1,58,000 |
| Add: completing it | 800 × (₹31.50 + ₹20) | 41,200 |
| Started and completed | 15,200 × ₹131.50 | 19,98,800 |
| **Transferred to Bottling (17,200 litres)** | | **21,98,000** |
| Abnormal loss | 300 × ₹80 + 210 × ₹51.50 | 34,815 |
| Closing WIP | 1,500 × ₹80 + 600 × ₹51.50 | 1,50,900 |

**(iv) Process I Account** (debit side)

| Dr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| To Opening WIP | 2,000 | 1,58,000 |
| To Materials | 18,000 | 13,78,000 |
| To Labour | – | 5,29,515 |
| To Overheads | – | 3,36,200 |
| **Total** | **20,000** | **24,01,715** |

**Process I Account** (credit side)

| Cr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (1,000 × ₹18) | 1,000 | 18,000 |
| By Abnormal loss A/c | 300 | 34,815 |
| By Bottling A/c | 17,200 | 21,98,000 |
| By Closing WIP c/d | 1,500 | 1,50,900 |
| **Total** | **20,000** | **24,01,715** |

**Abnormal Loss Account**

::: cols
| Dr. | Litres | (₹) |
|---|---:|---:|
| To Process I A/c | 300 | 34,815 |
| **Total** | **300** | **34,815** |
---
| Cr. | Litres | (₹) |
|---|---:|---:|
| By Bank (300 × ₹18) | 300 | 5,400 |
| By Costing P&L A/c | – | 29,415 |
| **Total** | **300** | **34,815** |
:::
::::
:::::

::::: example Weighted average: bhujia and a better fryer
Tapri's bhujia line fries besan dough into namkeen. For January:

| Particulars | Materials (₹) | Labour (₹) | Overheads (₹) |
|---|---:|---:|---:|
| Opening WIP, 3,000 kg | 1,26,000 | 21,000 | 28,000 |
| Introduced, 37,000 kg | 15,96,000 | 4,41,520 | 5,25,200 |

Transferred to Packing: 35,600 kg. Closing WIP: 2,800 kg, complete as to materials, 75% as to labour and 60% as to overheads. Normal loss is 5% of total input including opening WIP; burnt crumbs sell at ₹25 a kg, credited against materials.

**Required:** Using the weighted average method, prepare:

(i) The statement of equivalent production.

(ii) The statement of cost.

(iii) The statement of distribution of cost.

(iv) The Process Account and the Abnormal Gain Account.

:::: answer Show the working
**Working notes:** total input 40,000 kg; normal loss 5% = 2,000 kg; actual loss = 40,000 − 35,600 − 2,800 = 1,600 kg. The loss is 400 kg less than normal: an **abnormal gain** of 400 kg, 100% complete for every element.

**(i) Statement of equivalent production**

| Output | Kg | Materials | Labour | Overheads |
|---|---:|---:|---:|---:|
| Completed and transferred | 35,600 | 35,600 | 35,600 | 35,600 |
| Normal loss | 2,000 | – | – | – |
| Closing WIP | 2,800 | 2,800 | 2,100 (75%) | 1,680 (60%) |
| Less: Abnormal gain | (400) | (400) | (400) | (400) |
| **Total** | **40,000** | **38,000** | **37,300** | **36,880** |

**(ii) Statement of cost**

| Particulars | Materials | Labour | Overheads | Total |
|---|---:|---:|---:|---:|
| Opening WIP (₹) | 1,26,000 | 21,000 | 28,000 | 1,75,000 |
| Introduced (₹) | 15,96,000 | 4,41,520 | 5,25,200 | 25,62,720 |
| Less: Scrap of normal loss (₹) | (50,000) | – | – | (50,000) |
| **Total cost (₹)** | **16,72,000** | **4,62,520** | **5,53,200** | **26,87,720** |
| Equivalent units | 38,000 | 37,300 | 36,880 | |
| **Cost per EU (₹)** | **44.00** | **12.40** | **15.00** | **71.40** |

**(iii) Statement of distribution of cost**

| Particulars | Working | Amount (₹) |
|---|---|---:|
| Completed and transferred | 35,600 × ₹71.40 | 25,41,840 |
| Closing WIP: materials | 2,800 × ₹44 | 1,23,200 |
| Closing WIP: labour | 2,100 × ₹12.40 | 26,040 |
| Closing WIP: overheads | 1,680 × ₹15 | 25,200 |
| **Closing WIP** | | **1,74,440** |
| Abnormal gain | 400 × ₹71.40 | 28,560 |

**(iv) Process Account** (debit side)

| Dr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| To Opening WIP | 3,000 | 1,75,000 |
| To Materials | 37,000 | 15,96,000 |
| To Labour | – | 4,41,520 |
| To Overheads | – | 5,25,200 |
| To Abnormal gain A/c | 400 | 28,560 |
| **Total** | **40,400** | **27,66,280** |

**Process Account** (credit side)

| Cr. Particulars | Kg | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (2,000 × ₹25) | 2,000 | 50,000 |
| By Packing A/c | 35,600 | 25,41,840 |
| By Closing WIP c/d | 2,800 | 1,74,440 |
| **Total** | **40,400** | **27,66,280** |

**Abnormal Gain Account**

::: cols
| Dr. | Kg | (₹) |
|---|---:|---:|
| To Normal loss A/c (400 × ₹25) | 400 | 10,000 |
| To Costing P&L A/c | – | 18,560 |
| **Total** | **400** | **28,560** |
---
| Cr. | Kg | (₹) |
|---|---:|---:|
| By Process A/c | 400 | 28,560 |
| **Total** | **400** | **28,560** |
:::
::::
:::::

::::: example The burst pipe: rebuild the month from the cost per unit
A pipe burst in Tapri's chai-concentrate plant and soaked the month's production files. Ritu recovers the following:

- Opening WIP: 600 litres, 70% complete for labour and 50% for overheads, valued at ₹1,62,000.
- Closing WIP: 200 litres, 40% complete for labour and 25% for overheads.
- Normal loss is 5% of fresh input. Total losses were 640 litres, partly due to the burst; all losses are found at the end of the process.
- Output transferred to finished goods: 4,200 litres. Losses have a scrap value of ₹30 a litre.
- All materials are added at the start of the process.
- Cost per equivalent unit for the month: materials ₹180, labour ₹120, overheads ₹90 (₹390).
- The plant uses the FIFO method.

**Required:** Calculate

(i) The litres of material introduced.

(ii) The normal and abnormal loss.

(iii) The cost of materials, labour and overheads added during the month.

(iv) The value of closing WIP.

(v) The value of output transferred.

(vi) Also prepare the Process Account.

:::: answer Show the working
::: diagram The month's litres: what went in equals what came out
{"type": "nest", "w": 380, "dir": "h",
 "boxes": [
  {"title": "In", "mono": false, "color": "a", "rows": [["Opening WIP", "600"], ["Introduced", "4,440"], ["Total", "5,040"]]},
  {"title": "Out", "mono": false, "color": "b", "rows": [["Finished goods", "4,200"], ["Normal loss", "222"], ["Abnormal loss", "418"], ["Closing WIP", "200"], ["Total", "5,040"]]}
 ],
 "caption": "Introduced is the balancing figure: 4,200 + 640 + 200 − 600 = 4,440 litres."}
:::

**(i) Litres introduced** = 4,200 + 640 + 200 − 600 = **4,440 litres**.

**(ii) Normal loss** = 5% × 4,440 = **222 litres**; **abnormal loss** = 640 − 222 = **418 litres**, 100% complete (found at the end).

**Statement of equivalent production (FIFO)**

| Output | Litres | Materials | Labour | Overheads |
|---|---:|---:|---:|---:|
| From opening WIP | 600 | – | 180 (30%) | 300 (50%) |
| From fresh input | 3,600 | 3,600 | 3,600 | 3,600 |
| Normal loss | 222 | – | – | – |
| Abnormal loss | 418 | 418 | 418 | 418 |
| Closing WIP | 200 | 200 | 80 (40%) | 50 (25%) |
| **Total (= 600 + 4,440)** | **5,040** | **4,218** | **4,278** | **4,368** |

**(iii) Costs added during the month**

| Element | EU × rate | Amount (₹) |
|---|---|---:|
| Materials | 4,218 × ₹180 = ₹7,59,240, add back scrap 222 × ₹30 = ₹6,660 | 7,65,900 |
| Labour | 4,278 × ₹120 | 5,13,360 |
| Overheads | 4,368 × ₹90 | 3,93,120 |

The scrap is added back because the cost per EU for materials was struck after deducting it.

**(iv) Closing WIP** = 200 × ₹180 + 80 × ₹120 + 50 × ₹90 = ₹36,000 + ₹9,600 + ₹4,500 = **₹50,100**.

**(v) Output transferred**

| Particulars | Amount (₹) |
|---|---:|
| Opening WIP b/f | 1,62,000 |
| Completing it: 180 × ₹120 + 300 × ₹90 | 48,600 |
| Started and completed: 3,600 × ₹390 | 14,04,000 |
| **Output transferred (4,200 litres)** | **16,14,600** |

Abnormal loss = 418 × ₹390 = ₹1,63,020.

**(vi) Process Account** (debit side)

| Dr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| To Opening WIP | 600 | 1,62,000 |
| To Materials | 4,440 | 7,65,900 |
| To Labour | – | 5,13,360 |
| To Overheads | – | 3,93,120 |
| **Total** | **5,040** | **18,34,380** |

**Process Account** (credit side)

| Cr. Particulars | Litres | Amount (₹) |
|---|---:|---:|
| By Normal loss A/c (222 × ₹30) | 222 | 6,660 |
| By Abnormal loss A/c | 418 | 1,63,020 |
| By Finished goods A/c | 4,200 | 16,14,600 |
| By Closing WIP c/d | 200 | 50,100 |
| **Total** | **5,040** | **18,34,380** |
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

In the Study Material's fire case (SM 10.50), the output was valued simply as 3,400 litres × ₹660. That gives the FIFO answer only because the opening WIP's b/f value plus its cost to complete happens to equal 500 × ₹660. In the burst-pipe example it does not: 4,200 × ₹390 = ₹16,38,000, but the correct FIFO value is ₹16,14,600. Value the opening WIP separately unless the question says otherwise.

## Exam angle

::: exam Where equivalent units appeared in the documents read for this lesson
- **Rebuild the month from the cost per EU** (quantity introduced, normal and abnormal loss, costs added, closing WIP, output): the Study Material's case scenario (SM 10.37), reproduced as the case-scenario MCQs of MTP Series I for May 2024; MTP Series I for May 2026 Q4(b) (7 marks); September 2026 Q4(b) (5 marks).
- **Full FIFO statement with losses**: September 2024 Case Scenario I, MCQs 1–5 (equivalent units, cost per unit, abnormal loss, transfer, closing WIP); RTP September 2024 Q14 (abnormal gain).
- **Weighted average**: MTP Series I for January 2026 Q4(a) (8 marks, abnormal loss 80% complete); RTP May 2025 Q14, repeated as RTP January 2026 Q14 (two processes, missing figures); MTP Series II for January 2026 Q2(a) (8 marks).
- **Two processes, no opening WIP, packing added at the end of Process II**: RTP September 2026 Q11, the Study Material's Problem 5 with new figures.
- **No opening WIP**: May 2025 Q5(a) (4 marks: equivalent units, cost per EU, closing WIP and finished output).
- **Single MCQs, 2 marks**: FIFO conversion EU, September 2026 MCQ 11 and MTP Series II for September 2025 MCQ 13; units completed worked back from FIFO EU, RTP May 2026 MCQ 4.
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
Valuing FIFO output as 4,200 × ₹390 = ₹16,38,000. **Fix:** under FIFO the opening WIP brings its own b/f cost: ₹1,62,000 + ₹48,600 to complete + 3,600 × ₹390 = ₹16,14,600.
:::

::: mistake Equivalent units for the normal loss
Giving the 2,000 kg of normal loss equivalent units, which lowers the cost per unit and leaves its cost nowhere. **Fix:** normal loss has no equivalent units; only its scrap value is deducted from the cost.
:::

::: mistake The abnormal gain that was added
Adding the 400 kg of abnormal gain to equivalent units. **Fix:** abnormal gain is deducted, at 100% for every element; the units column still balances because the normal loss row is in full.
:::

## Practice

::: quiz Check yourself
Q: A process had opening WIP of 4,000 units, 30% complete for conversion; 26,000 units were started and completed; closing WIP was 5,000 units, 40% complete. What are the equivalent units for conversion under the weighted average method?
= 32000
> Completed = 4,000 + 26,000 = 30,000 at 100%, plus closing WIP 5,000 × 40% = 2,000: 32,000.

Q: Same data. What are the equivalent units for conversion under FIFO?
- [ ] 29,200
- [x] 30,800
- [ ] 32,000
- [ ] 35,000
> FIFO: 4,000 × 70% (the work still to do) + 26,000 + 2,000 = 30,800. 29,200 counts the opening WIP's 30% done last period; 32,000 is the weighted average; 35,000 is physical units.

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
