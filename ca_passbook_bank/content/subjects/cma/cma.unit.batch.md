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

:::: example Nankhatai for a wedding: price an order of 6,000
Tapri's bakery can bake at most 400 nankhatai in one oven load. A caterer orders 6,000. For each load: direct materials ₹1,800, direct wages ₹400 and oven set-up ₹300. Production overheads are absorbed at 50% of direct wages, and 12% of the production cost of each batch is added for administration, selling and distribution. Tapri wants a profit of 20% on the selling price.

**Required:** Determine the selling price of the order and of one nankhatai.

::: answer Show the working
Number of batches = 6,000 ÷ 400 = **15**.

**Statement of cost per batch and per order**

| Particulars | Per batch (₹) | Order (₹) |
|---|---:|---:|
| Direct materials | 1,800 | 27,000 |
| Direct wages | 400 | 6,000 |
| Oven set-up | 300 | 4,500 |
| Production overheads (50% of wages) | 200 | 3,000 |
| **Total production cost** | **2,700** | **40,500** |
| Administration, selling and distribution (12%) | 324 | 4,860 |
| **Total cost** | **3,024** | **45,360** |
| Profit (20% on price = 25% on cost) | 756 | 11,340 |
| **Selling price** | **3,780** | **56,700** |

Selling price per nankhatai = ₹3,780 ÷ 400 = **₹9.45**. The set-up cost is per batch: 15 loads, 15 set-ups, whether a load holds 400 pieces or 40.
:::
::::

:::: example Hampers, one batch order a month
Tapri has contracted to supply 500 gift hampers a month for April to June at ₹1,200 a hamper, 1,500 in all. Each month a batch order is opened; materials and labour are booked at actual, and overheads are levied at the month's rate per labour hour.

| Month | Batch output (hampers) | Materials (₹) | Direct wages (₹) | Batch labour hours |
|---|---:|---:|---:|---:|
| April | 520 | 3,64,000 | 78,000 | 780 |
| May | 500 | 3,60,000 | 80,000 | 800 |
| June | 500 | 3,54,600 | 76,000 | 760 |

| Month | Factory overheads (₹) | Labour hours of the month |
|---|---:|---:|
| April | 4,80,000 | 6,000 |
| May | 5,50,000 | 5,000 |
| June | 4,50,000 | 6,000 |

**Required:** Calculate the cost and profit per hamper of each batch order, and the overall position of the order for 1,500 hampers.

::: answer Show the working
**Working note: overhead rate a labour hour.** April ₹4,80,000 ÷ 6,000 = ₹80; May ₹5,50,000 ÷ 5,000 = ₹110; June ₹4,50,000 ÷ 6,000 = ₹75. Batch overheads = rate × batch hours: ₹62,400; ₹88,000; ₹57,000.

| Particulars | April (₹) | May (₹) | June (₹) |
|---|---:|---:|---:|
| Sales (output × ₹1,200) | 6,24,000 | 6,00,000 | 6,00,000 |
| Materials | 3,64,000 | 3,60,000 | 3,54,600 |
| Direct wages | 78,000 | 80,000 | 76,000 |
| Overheads | 62,400 | 88,000 | 57,000 |
| **Total cost** | **5,04,400** | **5,28,000** | **4,87,600** |
| Profit per batch | 1,19,600 | 72,000 | 1,12,400 |
| Cost per hamper | 970.00 | 1,056.00 | 975.20 |
| Profit per hamper | 230.00 | 144.00 | 224.80 |

Total: 1,520 hampers cost ₹15,20,000, an average of **₹1,000** a hamper.

**Overall position of the order for 1,500 hampers**

| Particulars | Amount (₹) |
|---|---:|
| Sales (1,500 × ₹1,200) | 18,00,000 |
| Less: Cost (1,500 × ₹1,000) | 15,00,000 |
| **Profit** | **3,00,000** |

May's batch earns least because May's overheads were spread over fewer labour hours (₹110 an hour). The 20 hampers made beyond the contract are valued at the average cost, as SM Illustration 4 values its order at the average cost per unit (8.11).
:::
::::

::::: example Kulhad cartons for a café chain: the optimum run
Tapri supplies 72,000 cartons of printed kulhads a year to a café chain, at a steady daily rate. A production run costs ₹1,350 to set up (changing the print screens). A carton costs ₹100 to make, and the annual carrying cost is 15% of that. At present the unit makes 6,000 cartons a run, one run a month.

**Required:**

(i) Determine the economic batch quantity, the number of runs a year and the interval between runs (365 days).

(ii) Calculate the extra cost a year of the present policy of 6,000 cartons a run.

(iii) Find the EBQ if annual demand rises by 44%.

:::: answer Show the working
**(i) EBQ**

C = 15% × ₹100 = ₹15 a carton a year.

$$\text{EBQ} = \sqrt{\frac{2 \times 72{,}000 \times 1{,}350}{15}} \qquad = \sqrt{1{,}29{,}60{,}000} \qquad = 3{,}600 \text{ cartons}$$

Runs = 72,000 ÷ 3,600 = **20 a year**; interval = 365 ÷ 20 = **18.25 days**.

**(ii) Present policy against the EBQ**

| Particulars | EBQ: 3,600 a run | Policy: 6,000 a run |
|---|---:|---:|
| Runs (72,000 ÷ run) | 20 | 12 |
| Set-up (runs × ₹1,350), ₹ | 27,000 | 16,200 |
| Average stock (run ÷ 2) | 1,800 | 3,000 |
| Holding (× ₹15), ₹ | 27,000 | 45,000 |
| **Total cost, ₹** | **54,000** | **61,200** |

The present policy costs **₹7,200** a year more. At the EBQ, set-up and holding costs are equal, which is the check that 3,600 is right.

::: diagram Cartons: total cost a year by run size
{"type": "plot", "h": 300, "x": [1500, 8000], "y": [0, 120000], "clip": true,
 "xlabel": "cartons a run", "ylabel": "cost a year (₹)", "legend": "outside",
 "xticks": [[2000, "2,000"], [3600, "3,600"], [6000, "6,000"], [8000, "8,000"]],
 "yticks": [[0, "0"], [30000, "30,000"], [60000, "60,000"], [90000, "90,000"], [120000, "1,20,000"]],
 "series": [
  {"label": "set-up cost", "fn": "72000/x*1350", "color": "d"},
  {"label": "holding cost", "fn": "x/2*15", "color": "a"},
  {"label": "total cost", "fn": "72000/x*1350+x/2*15", "color": "f"}],
 "points": [{"x": 3600, "y": 54000, "label": "EBQ: ₹54,000", "pos": "below"}, {"x": 6000, "y": 61200, "label": "policy: ₹61,200", "pos": "above"}],
 "caption": "The total-cost curve (violet) is flat near its bottom: 6,000 cartons a run, two-thirds above the EBQ, costs only 13% more a year."}
:::

**(iii) Demand up 44%.** EBQ = √(2 × 1,03,680 × 1,350 ÷ 15) = **4,320 cartons**: the EBQ rises with the square root of demand (√1.44 = 1.2), so 44% more demand needs only 20% bigger runs.
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
Charging set-up as ₹300 ÷ 400 = ₹0.75 per nankhatai, then multiplying by a different number of pieces per load. **Fix:** set-up is a cost per batch: count the batches and multiply.
:::

::: mistake The extra cost of a policy measured on one cost only
Comparing only set-up costs (₹27,000 against ₹16,200) makes the 6,000-carton policy look ₹10,800 cheaper. **Fix:** compare total cost, set-up plus holding: the policy costs ₹7,200 more.
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
