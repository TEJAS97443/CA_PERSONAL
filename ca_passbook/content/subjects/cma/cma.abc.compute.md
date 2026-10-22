---
id: cma.abc.compute
title: Product costs under ABC versus traditional absorption
minutes: 35
needs: cma.abc.concept, cma.oh.absorb
tags: ABC product cost, cost distortion, under-costing, over-costing, unused capacity, customer profitability, activity cost driver rate
labs: abc
summary: Building ICAI's two cost statements side by side (one overhead rate against activity driver rates), reading the cost distortion, costing unused capacity and measuring customer-level operating income.
---

## In plain words

### The price war that Ritu's spreadsheet explained

BrewBucks has launched an instant premix at ₹640 a carton, and Tapri Everyday, priced at ₹675, is losing shelf space. Kesar prices every product at cost plus 25%, and his costs come from one overhead rate per machine hour.

> **Kesar:** Everyday is our biggest seller and still we cannot match their price? Masala Gold, our fancy one, sells beautifully. Make more Masala Gold.
> **Ritu:** Masala Gold sells beautifully because we sell it below its cost. Per unit, please: let me rerun the costs activity by activity.

Ritu's rerun leaves the **prime cost** alone: materials and labour are traced to each product directly, under any system. Only the **production overheads** move. The old system spread them by machine hours. Everyday uses most of the machine hours, so it carried most of the overhead. ABC charges them by what each product actually demands: set-up hours, quality tests, material moves, recipe changes, and machine hours only for the machine costs. Masala Gold is made in 40 tiny runs: half the factory's production runs and more than half its quality tests are its, though it is less than 7% of the cartons.

The gap between the two costs is the **cost distortion**. Everyday turns out to be **over-costed**, so its cost-plus price was too high and BrewBucks walked in. Masala Gold is **under-costed** by so much that every carton sold at ₹975 costs more than ₹975 to make. The over-costing and the under-costing cancel out: the factory's total overhead is the same either way. Worked example 1 rebuilds Ritu's spreadsheet line by line.

The same driver rates do two more jobs. Set on the **capacity** of each activity (the inspections the lab could do, not the ones it did), they show the **cost of unused capacity** separately instead of loading it onto products. And charged to customers instead of products (orders, visits, deliveries), they show which customers really earn money.

::: analogy The housing society bill
A housing society splits its ₹6 lakh maintenance bill by flat area. The ground-floor family that never uses the lift, the gym or a parking slot pays the same per square foot as the fourteenth-floor family with two cars and a gym habit. Charging per lift trip, parking slot and gym hour is ABC; the ground floor was over-costed and the fourteenth floor under-costed, by the same total. And if the generator was sized for 100 flats but only 80 are occupied, the cost of the empty 20 is reported as idle capacity, not quietly added to the bills of the 80.
:::

::: key
Prime cost does not change; only overheads are re-spread. Cost distortion = traditional cost − ABC cost: positive means over-costed, negative means under-costed, and across all products the distortion adds up to zero.
:::

## How it works

### Building the two statements

::: steps
1. **Prime cost per unit**: direct materials, direct labour and direct expenses, the same under both systems.
2. **Traditional overhead**: absorption rate = budgeted overheads ÷ budgeted base (direct labour hours, machine hours or units, as the question says); overhead per unit = rate × the base per unit (SM 5.15). See [[cma.oh.absorb|absorption rates]].
3. **ABC driver totals**: turn the data into totals for each product. Per-unit data × units produced; batches = units ÷ batch size; per-batch data × batches (SM 5.45). Where the question gives percentages or ratios, first split the overheads into the activity pools ([[cma.abc.concept|the five stages]]).
4. **Driver rates and charges**: rate = cost pool ÷ total driver; each product's overhead = rate × its driver quantity; per unit = ÷ units produced.
5. **Compare**: cost distortion per unit = traditional cost − ABC cost. Check: the distortions × units add up to zero.
6. **Use the cost**: price (cost-plus), profit, product mix. When production and sales differ, closing stock is valued at each system's cost per unit, so each product's profit differs between the systems (May 2026 Q5(a)).
:::

::: diagram What changes when you switch to ABC
{"type": "nest", "w": 420, "root": {"title": "Cost per unit", "mono": false, "children": [{"title": "Prime cost", "note": "same in both", "mono": false, "rows": [["Direct materials", "traced"], ["Direct labour", "traced"]], "color": "g"}, {"title": "Production overheads", "note": "re-spread", "dir": "h", "mono": false, "children": [{"title": "Traditional", "mono": false, "lines": ["one rate", "× hours per unit"], "color": "mute"}, {"title": "ABC", "mono": false, "lines": ["driver rates", "× drivers used"], "color": "a"}]}]}, "caption": "Green: prime cost, traced directly under both systems. Only the overhead box changes: grey, one absorption rate; blue, a rate for each activity."}
:::

### Rates on capacity, and the cost of unused capacity

When a firm "calculates activity cost rates based on cost driver capacity" (SM 5.22), the rate is the activity's cost ÷ the driver quantity the activity can supply. Products are charged only for what they used, and the rest is reported as the **cost of unused capacity**: ICAI's Illustration 2 charges power at ₹4 per kWh on a capacity of 50,000 kWh, products use 45,000, and the unused 5,000 kWh cost ₹20,000 (SM 5.23).

ICAI lists the factors management considers in choosing a capacity level to compute the budgeted fixed overhead rate (SM 5.23):

1. Effect on product costing and capacity management.
2. Effect on pricing decisions.
3. Effect on performance evaluation.
4. Effect on financial statements.
5. Regulatory requirements.
6. Difficulties in forecasting.

### Costing customers and channels

"The activity driver rate can be used not only to identify cost of products ... but it can also be used for costing other cost objects such as customers/customer segments and distribution channels" (SM 5.10). Each customer's revenue is reduced by the discount it receives, its cost of goods sold, and the cost of the activities it makes the company perform: orders, deliveries, visits, merchandising, collections. What is left is the **customer-level operating income**.

## Formats and formulas

*Reproduce both statements from memory. ICAI's suggested answers show the driver rate and the quantity in brackets on every overhead line.*

**Statement of cost per unit: traditional absorption** (SM 5.16, 5.44)

| Particulars | Product A (₹) | Product B (₹) |
|---|---:|---:|
| Direct materials | xxx | xxx |
| Direct labour (hours × rate) | xxx | xxx |
| Production overheads (hours × absorption rate) | xxx | xxx |
| **Cost per unit** | **xxx** | **xxx** |

**Statement of cost: activity based costing** (SM 5.17, 5.44–5.45)

| Particulars | Product A (₹) | Product B (₹) |
|---|---:|---:|
| Direct materials | xxx | xxx |
| Direct labour | xxx | xxx |
| Set-up costs @ ₹… per set-up (set-ups) | xxx | xxx |
| Machine costs @ ₹… per machine hour (hours) | xxx | xxx |
| Inspection costs @ ₹… per inspection (inspections) | xxx | xxx |
| **Total cost** | **xxx** | **xxx** |
| **Cost per unit** (total cost ÷ units) | **xxx** | **xxx** |

Working notes before the statement: driver totals (batches, orders, inspections, hours) and the driver rate table (cost pool, driver, quantity, rate).

::: formula Activity cost driver rate and the product's overhead
$$\text{Rate} = \frac{\text{Cost of activity pool}}{\text{Total quantity of the driver}} \qquad \text{Overhead}_{\text{product}} \qquad = \sum \text{Rate} \times \text{Driver quantity used}$$
On a capacity basis the denominator is the driver's capacity, not its actual use.
:::

::: formula Cost distortion
$$\text{Cost distortion per unit} \qquad = \text{Traditional cost} - \text{ABC cost}$$
Both costs are per unit. Positive: over-costed by the traditional system; negative: under-costed. ICAI prints the sign: "(−) 40.42" for the under-costed product (SM 5.26).
:::

::: formula Cost of unused capacity
$$\text{Cost of unused capacity} \qquad = \text{Cost of activity} - \text{Cost allocated} \qquad = \text{Unused driver units} \times \text{Rate}$$
Cost allocated = the driver units products actually used × the capacity rate.
:::

**Customer-level operating income** (SM 5.54–5.55; May 2024 Q2(a))

| Particulars | Customer A (₹) |
|---|---:|
| Revenues at list price (units × list price) | xxx |
| Less: Discount | xxx |
| **Revenue at actual price** | **xxx** |
| Less: Cost of goods sold | xxx |
| **Gross margin** | **xxx** |
| Less: Customer-level operating activity costs (orders, visits, delivery, expediting) | xxx |
| **Customer-level operating income** | **xxx** |
| Operating income as a % of revenue (at actual price) | x% |

## Worked examples

::::: example Three premix lines: one machine-hour rate against ABC
Tapri's premix plant makes three products. At present all production overheads of the quarter, ₹32,00,000, are absorbed at ₹40 per machine hour. Data for the quarter:

| Particulars | Everyday | Elaichi Premium | Masala Gold |
|---|---:|---:|---:|
| Production (cartons) | 20,000 | 8,000 | 2,000 |
| Prime cost per carton (₹) | 420 | 500 | 700 |
| Machine hours per carton | 3 | 2 | 2 |
| Production runs | 20 | 20 | 40 |
| Set-up hours per run | 6 | 4 | 3 |
| Quality tests per run | 4 | 3 | 4 |
| Material moves per run | 3 | 2 | 2 |
| Recipe and pack changes | 1 | 3 | 7 |

Ritu traces the same ₹32,00,000 to five activities:

| Activity | Cost (₹) | Cost driver |
|---|---:|---|
| Machine running | 12,80,000 | Machine hours |
| Set-ups | 6,40,000 | Set-up hours |
| Quality testing | 4,80,000 | Number of tests |
| Material handling | 3,60,000 | Number of material moves |
| Recipe and pack development | 4,40,000 | Number of recipe and pack changes |

The quarter's entire output is sold.

**Required:**

(i) Calculate the cost per carton of each product under the present machine-hour rate.

(ii) Calculate the cost per carton of each product using activity based costing.

(iii) Calculate the cost distortion per carton and in total, stating which products are under-costed and why.

(iv) Kesar prices every product at traditional cost plus 25%. Calculate the profit per carton under ABC.

(v) Kesar now proposes runs of 100 cartons for Masala Gold, with set-up hours, tests and material moves per run unchanged. Assuming the activity driver rates do not change, calculate Masala Gold's new ABC cost per carton, state whether its ₹975 price covers it, and what else must change.

:::: answer Show the working
**Working note 1: driver totals**

| Driver | Everyday | Elaichi Premium | Masala Gold | Total |
|---|---:|---:|---:|---:|
| Machine hours | 60,000 | 16,000 | 4,000 | 80,000 |
| Set-up hours (runs × per run) | 120 | 80 | 120 | 320 |
| Tests (runs × per run) | 80 | 60 | 160 | 300 |
| Moves (runs × per run) | 60 | 40 | 80 | 180 |
| Recipe and pack changes | 1 | 3 | 7 | 11 |

**Working note 2: cost driver rates**

| Activity | Cost (₹) | Driver quantity | Rate (₹) |
|---|---:|---:|---:|
| Machine running | 12,80,000 | 80,000 machine hours | 16 per machine hour |
| Set-ups | 6,40,000 | 320 set-up hours | 2,000 per set-up hour |
| Quality testing | 4,80,000 | 300 tests | 1,600 per test |
| Material handling | 3,60,000 | 180 moves | 2,000 per move |
| Recipe and pack development | 4,40,000 | 11 changes | 40,000 per change |

**(i) Cost per carton: machine-hour rate**

| Particulars | Everyday (₹) | Elaichi Premium (₹) | Masala Gold (₹) |
|---|---:|---:|---:|
| Prime cost | 420 | 500 | 700 |
| Production overheads (3, 2, 2 hours × ₹40) | 120 | 80 | 80 |
| **Cost per carton** | **540** | **580** | **780** |

**(ii) Cost: activity based costing**

| Particulars | Everyday (₹) | Elaichi Premium (₹) | Masala Gold (₹) |
|---|---:|---:|---:|
| Prime cost | 84,00,000 | 40,00,000 | 14,00,000 |
| Machine running @ ₹16 (60,000; 16,000; 4,000) | 9,60,000 | 2,56,000 | 64,000 |
| Set-ups @ ₹2,000 (120; 80; 120 hours) | 2,40,000 | 1,60,000 | 2,40,000 |
| Quality testing @ ₹1,600 (80; 60; 160) | 1,28,000 | 96,000 | 2,56,000 |
| Material handling @ ₹2,000 (60; 40; 80) | 1,20,000 | 80,000 | 1,60,000 |
| Development @ ₹40,000 (1; 3; 7) | 40,000 | 1,20,000 | 2,80,000 |
| **Total cost** | **98,88,000** | **47,12,000** | **24,00,000** |
| **Cost per carton** | **494.40** | **589.00** | **1,200.00** |

Check: the ABC overheads, ₹14,88,000 + ₹7,12,000 + ₹10,00,000 = ₹32,00,000.

**(iii) Cost distortion** (traditional − ABC)

| Particulars | Everyday | Elaichi Premium | Masala Gold |
|---|---:|---:|---:|
| Per carton (₹) | +45.60 | (−) 9.00 | (−) 420.00 |
| Total (₹) | +9,12,000 | (−) 72,000 | (−) 8,40,000 |
| Result | Over-costed | Under-costed | Under-costed |

The total distortion is nil: ₹9,12,000 = ₹72,000 + ₹8,40,000. Masala Gold is under-costed because machine hours ignore the batch-level and product-level work it causes: it has half the runs and more than half the tests of the plant, and 7 of the 11 recipe and pack changes, on less than 7% of the cartons.

::: diagram Cost per carton: machine-hour rate against ABC
{"type": "plot", "h": 290, "x": [0.4, 3.6], "y": [0, 1300], "xlabel": "product", "ylabel": "cost per carton (₹)", "xticks": [[1, "Everyday"], [2, "Elaichi Premium"], [3, "Masala Gold"]], "yticks": [0, 325, 650, 975, 1300], "series": [{"label": "traditional", "bars": true, "bw": 0.32, "values": true, "color": "mute", "pts": [[0.82, 540, "540"], [1.82, 580, "580"], [2.82, 780, "780"]]}, {"label": "ABC", "bars": true, "bw": 0.32, "values": true, "color": "a", "pts": [[1.18, 494.4, "494.40"], [2.18, 589, "589"], [3.18, 1200, "1,200"]]}], "caption": "Grey: traditional cost; blue: ABC cost. Masala Gold's 40 small runs and 7 recipe changes carry costs that machine hours never saw."}
:::

**(iv) Profit per carton under ABC**

| Particulars | Everyday (₹) | Elaichi Premium (₹) | Masala Gold (₹) |
|---|---:|---:|---:|
| Price (traditional cost × 125%) | 675.00 | 725.00 | 975.00 |
| Less: ABC cost | 494.40 | 589.00 | 1,200.00 |
| **Profit / (loss) per carton** | **180.60** | **136.00** | **(225.00)** |

Everyday earns ₹180.60, not the ₹135 the old cost suggested: it can meet BrewBucks' ₹640 and still earn ₹145.60 a carton. Total profit for the quarter (₹42,50,000) is the same under both systems because all output is sold; the difference is in which product earns it.

**(v) Masala Gold in runs of 100 cartons**

Runs = 2,000 ÷ 100 = 20.

| Activity | Driver | Amount (₹) |
|---|---|---:|
| Machine running | 4,000 hours × ₹16 | 64,000 |
| Set-ups | 20 × 3 = 60 hours × ₹2,000 | 1,20,000 |
| Quality testing | 20 × 4 = 80 tests × ₹1,600 | 1,28,000 |
| Material handling | 20 × 2 = 40 moves × ₹2,000 | 80,000 |
| Recipe and pack development | 7 changes × ₹40,000 | 2,80,000 |
| **Overheads** | | **6,72,000** |

New ABC cost per carton = ₹700 + ₹6,72,000 ÷ 2,000 = ₹700 + ₹336 = **₹1,036**. The ₹975 price still loses ₹61 a carton. Halving the runs halves the batch-level costs (₹3,28,000 saved), but the product-level cost of ₹2,80,000 (₹140 a carton) does not move with batch size. To cover cost at ₹975, development cost must fall by at least ₹61 × 2,000 = ₹1,22,000, that is by 4 changes (3 changes a quarter, giving a cost of ₹956), or the price must rise; ABC cost plus 25% is ₹1,295. The Activity Based Costs appear to be more precise.
::::
:::::

::: lab abc {"base":"lh"}
Run the same comparison on Tapri's premix, sachets and samosas: ABC beside one labour hour rate, and which product each method under-costs, and why.
:::

:::: example Punjabi Jumbo is dropped: rates on use or on capacity?
The packing hall of Tapri's samosa factory has three activities whose costs are fixed for the year:

| Activity | Cost driver | Capacity | Annual cost (₹) |
|---|---|---:|---:|
| Packing machine | Machine hours | 12,000 hours | 9,60,000 |
| Quality inspection | Number of inspections | 800 | 4,80,000 |
| Dispatch | Number of dispatch orders | 2,500 | 3,75,000 |

Until last year Ritu set the rates on the drivers **actually used**, so the whole cost went to products. Last year's use:

| Product | Machine hours | Inspections | Dispatch orders |
|---|---:|---:|---:|
| Classic Aloo (5,00,000 packs) | 5,000 | 350 | 900 |
| Cocktail Mini (2,00,000 packs) | 3,000 | 250 | 600 |
| Punjabi Jumbo | 1,600 | 150 | 500 |

This year Punjabi Jumbo is discontinued. Classic Aloo and Cocktail Mini will use exactly what they used last year; the hall and its costs stay as they are.

**Required:**

(i) Calculate the activity rates (a) on actual use last year, (b) on actual use this year and (c) on cost driver capacity.

(ii) Calculate the packing-hall cost per pack of Classic Aloo and Cocktail Mini under each set of rates.

(iii) Under capacity-based rates, calculate this year's cost of unused capacity for each activity and reconcile with the hall's total cost.

(iv) Tapri prices at cost plus a markup. Advise which rates should be used, with reference to the factors management considers in choosing a capacity level.

::: answer Show the working
**(i) Activity rates**

| Activity | (a) Last year's use | (b) This year's use | (c) Capacity |
|---|---:|---:|---:|
| Packing (₹ per hour) | 9,60,000 ÷ 9,600 = 100.00 | 9,60,000 ÷ 8,000 = 120.00 | 9,60,000 ÷ 12,000 = 80.00 |
| Inspection (₹ each) | 4,80,000 ÷ 750 = 640.00 | 4,80,000 ÷ 600 = 800.00 | 4,80,000 ÷ 800 = 600.00 |
| Dispatch (₹ per order) | 3,75,000 ÷ 2,000 = 187.50 | 3,75,000 ÷ 1,500 = 250.00 | 3,75,000 ÷ 2,500 = 150.00 |

**(ii) Cost charged to each product**

| Particulars | (a) Last year (₹) | (b) This year (₹) | (c) Capacity (₹) |
|---|---:|---:|---:|
| Classic Aloo: packing | 5,00,000 | 6,00,000 | 4,00,000 |
| Classic Aloo: inspection | 2,24,000 | 2,80,000 | 2,10,000 |
| Classic Aloo: dispatch | 1,68,750 | 2,25,000 | 1,35,000 |
| **Classic Aloo: total** | **8,92,750** | **11,05,000** | **7,45,000** |
| **Per pack (÷ 5,00,000)** | **1.79** | **2.21** | **1.49** |
| Cocktail Mini: packing | 3,00,000 | 3,60,000 | 2,40,000 |
| Cocktail Mini: inspection | 1,60,000 | 2,00,000 | 1,50,000 |
| Cocktail Mini: dispatch | 1,12,500 | 1,50,000 | 90,000 |
| **Cocktail Mini: total** | **5,72,500** | **7,10,000** | **4,80,000** |
| **Per pack (÷ 2,00,000)** | **2.86** | **3.55** | **2.40** |

Under (a) Punjabi Jumbo carried the remaining ₹3,49,750 (₹1,60,000 + ₹96,000 + ₹93,750).

**(iii) Cost of unused capacity this year (capacity-based rates)**

| Activity | Unused capacity | Amount (₹) |
|---|---|---:|
| Packing | 12,000 − 8,000 = 4,000 hours × ₹80 | 3,20,000 |
| Inspection | 800 − 600 = 200 × ₹600 | 1,20,000 |
| Dispatch | 2,500 − 1,500 = 1,000 × ₹150 | 1,50,000 |
| **Total cost of unused capacity** | | **5,90,000** |

Reconciliation: allocated ₹7,45,000 + ₹4,80,000 = ₹12,25,000; add unused capacity ₹5,90,000 = ₹18,15,000, the total cost of the three activities (₹9,60,000 + ₹4,80,000 + ₹3,75,000).

**(iv) Advice.** Rates on actual use put the whole ₹18,15,000 on whatever products remain. Nothing about Classic Aloo or Cocktail Mini has changed, yet their costs per pack rise by about 24% (₹1.79 to ₹2.21 and ₹2.86 to ₹3.55), because the cost of the 4,000 idle machine hours, 200 idle inspections and 1,000 idle dispatch orders is loaded onto them. Rates on cost driver capacity should be used:

1. **Effect on product costing and capacity management**: each product is charged only for the capacity it uses (₹1.49 and ₹2.40 a pack, the same as before Jumbo left), and the ₹5,90,000 of unused capacity is reported to management, who can sell it, redeploy it or reduce it.

2. **Effect on pricing decisions**: cost-plus prices on actual-use rates would rise for the remaining products, which may lose volume and push the rates up again.

3. **Effect on performance evaluation**: the managers of Classic Aloo and Cocktail Mini are not charged for a capacity decision they did not make.

The other factors ICAI lists are the effect on financial statements, regulatory requirements and difficulties in forecasting (SM 5.23).
:::
::::

:::: example Should the kirana stores go to a distributor?
Tapri sells its premix at a list price of ₹500 a carton through three channels; the cost of goods sold is ₹380 a carton. Its customer-level activities and their cost driver rates are: order processing ₹100 per order; van delivery ₹250 per delivery drop; in-store merchandising ₹300 per merchandiser hour; payment collection ₹150 per collection visit. Last year:

| Particulars | Supermarkets | Kirana stores | Café franchisees |
|---|---:|---:|---:|
| Cartons sold | 15,000 | 9,000 | 6,000 |
| Discount on list price | 12% | 4% | 8% |
| Orders | 60 | 1,800 | 300 |
| Delivery drops | 60 | 1,800 | 150 |
| Merchandising hours | 600 | 900 | Nil |
| Collection visits | Nil | 900 | 60 |

Malwa Traders, a distributor, offers to take over the whole kirana channel. It would buy 10,000 cartons a year at 15% off list price, order weekly (52 orders, each delivered in one drop to its godown) and do all merchandising and collection itself.

**Required:**

(i) Calculate the customer-level operating income of each channel and the operating income as a percentage of revenue, and rank the channels.

(ii) Evaluate Malwa Traders' proposal and advise, stating the condition on which the activity cost savings depend.

::: answer Show the working
**Working note: customer-level activity costs**

| Activity | Supermarkets (₹) | Kirana stores (₹) | Café franchisees (₹) |
|---|---:|---:|---:|
| Orders @ ₹100 (60; 1,800; 300) | 6,000 | 1,80,000 | 30,000 |
| Delivery drops @ ₹250 (60; 1,800; 150) | 15,000 | 4,50,000 | 37,500 |
| Merchandising @ ₹300 (600; 900; –) | 1,80,000 | 2,70,000 | – |
| Collection @ ₹150 (–; 900; 60) | – | 1,35,000 | 9,000 |
| **Total** | **2,01,000** | **10,35,000** | **76,500** |

**(i) Customer-level operating income**

| Particulars | Supermarkets (₹) | Kirana stores (₹) | Café franchisees (₹) |
|---|---:|---:|---:|
| Revenues at list price | 75,00,000 | 45,00,000 | 30,00,000 |
| Less: Discount | 9,00,000 | 1,80,000 | 2,40,000 |
| **Revenue at actual price** | **66,00,000** | **43,20,000** | **27,60,000** |
| Less: Cost of goods sold (₹380) | 57,00,000 | 34,20,000 | 22,80,000 |
| **Gross margin** | **9,00,000** | **9,00,000** | **4,80,000** |
| Less: Customer-level activity costs | 2,01,000 | 10,35,000 | 76,500 |
| **Customer-level operating income** | **6,99,000** | **(1,35,000)** | **4,03,500** |
| Operating income as % of revenue | 10.59% | (3.13%) | 14.62% |
| **Rank** | **II** | **III** | **I** |

**(ii) Kirana channel through Malwa Traders**

| Particulars | Amount (₹) |
|---|---:|
| Revenue at list price (10,000 × ₹500) | 50,00,000 |
| Less: Discount 15% | 7,50,000 |
| **Revenue at actual price** | **42,50,000** |
| Less: Cost of goods sold (10,000 × ₹380) | 38,00,000 |
| **Gross margin** | **4,50,000** |
| Less: Orders 52 × ₹100 and drops 52 × ₹250 | 18,200 |
| **Customer-level operating income** | **4,31,800** |
| Operating income as % of revenue | 10.16% |

The channel moves from a loss of ₹1,35,000 to an income of ₹4,31,800, an improvement of ₹5,66,800. The kirana stores have the smallest discount and the same gross margin as the supermarkets, but they buy 5 cartons a drop, so 1,800 orders, 1,800 drops, 900 merchandiser hours and 900 collection visits swallow it. The distributor gives away 11 more points of discount and still leaves more, because it removes almost all the activities.

**Advice:** accept the proposal, on one condition. The activity costs are the cost of resources used (vans, order clerks, merchandisers, collectors). The saving of ₹10,35,000 − ₹18,200 = ₹10,16,800 is real only if Tapri releases or redeploys those resources; if the vans and merchandisers stay on the payroll with nothing to do, the cost remains and becomes unused capacity. Tapri should also check that Malwa Traders can sell the 10,000 cartons it promises.
:::
::::

::: lab abc {"base":"lh","layout":"total","rates":"exact","productLines":[["X","16,000"],["Y","17,000"],["Z","15,000"]],"productData":[["Direct material ₹ (3, 4, 5 kg × ₹2)","6 8 10"],["Direct labour ₹ (hours × ₹20)","2 3 4"],["Labour hours","0.10 0.15 0.20"],["Machine hours","0.5 0.7 0.9"],["Production runs p.a.","50 65 60"],["Purchase orders p.a.","5 10 15"],["Orders shipped p.a.","25 35 32"]],"pools":[["Machine set-up","49,000","Production runs"],["Machine running","64,128","Machine hours"],["Purchasing","52,050","Purchase orders"],["Delivery","46,460","Orders shipped"]],"resources":[]}
Now a real paper, January 2025 Case Scenario I: four pools, three products, and every figure its five MCQs asked for.
:::

## Under the hood

### Why volume rates miscost small products

A rate per labour hour or machine hour charges batch-level and product-level costs (set-ups, orders, designs) in proportion to volume. The product made in many small batches demands those activities far more than its volume suggests. ICAI's conclusion in Illustration 3: "Low volume product Y is under-costed and high volume product Z is over costed using direct labour hours for overhead absorption" (SM 5.26). It is a tendency, not a law: read each question's driver data.

### Same total, different stock and profit

When all output is sold, total profit is the same under both systems: only its split between products changes (Example 1). When some output is unsold, closing stock is valued at a different cost per unit under each system, so each product's profit changes, and the total changes too unless every product keeps the same share of its output in stock. In May 2026 Q5(a) ICAI's answer valued each product's closing stock at its own cost per unit under each system: Mini's profit was ₹12,80,000 under absorption costing and ₹18,80,000 under ABC, Maxi's ₹18,40,000 and ₹12,40,000. The total, ₹31,20,000, came out the same only because both products held 20% of their output in stock.

### Challenges in assigning costs to activities

ICAI's answer to Practical Problem 2 lists the challenges in assigning total operating costs to activity areas (SM 5.49): choosing an appropriate cost driver for each activity area; developing a reliable database for the chosen cost driver; deciding how to handle costs that may be common across several activities; choice of the time period to compute cost rates per cost driver; behavioural factors.

### List price and actual price

Reporting both the list price and the actual price shows which customer received what discount per unit, and whether the discount bears any relationship to volume; a customer who gets a large discount on a small volume (ICAI's customer E) should be explored (SM 5.55–5.56).

## Exam angle

::: exam How ICAI examined ABC computations, May 2024 to September 2026
In the documents read for this lesson, ABC computations appeared in 10 questions, usually 8 to 10 marks:

- **Traditional against ABC product cost**: September 2024 Q3(a), 8 marks: overheads first distributed to activities in given ratios (technical staff 1 : 2 : 2, machine costs 2 : 3), then driver rates; May 2026 Q5(a), 10 marks: total sales and profit of two products under both systems, with closing stock; MTP January 2026 Series I Q2(a), 10 marks: machine-hour rate against ABC with allocation percentages, plus "explain how an ABC system would be developed".
- **Capacity-based rates and unused capacity**: May 2025 Q3(a), 8 marks, four activities; the inspection capacity was fully used, so its unused cost was nil.
- **Service sectors**: September 2025 Q3(a), 8 marks: cost per project in three sectors, then the most profitable sector on profitability % of fees.
- **Customer profitability**: May 2024 Q2(a), 8 marks: customer-level operating income, % of revenue at actual price, and rank; September 2026 Part I MCQs 1–5, a five-MCQ case (cost of visits, transport, activity cost as % of revenue net of discount, operating income).
- **Pricing**: MTP January 2025 Series II Q2(a), 10 marks: cost and quoted price at cost plus 50% under labour hours and ABC, then pricing strategies; RTP May 2026 Q9: profit per printer under the current basis and ABC, and the benefits of ABC.
- **MCQ**: MTP September 2025 Series II MCQ 6, ABC cost per unit of three products.
:::

::: exam The traps
- Driver data per batch or per unit: multiply up to totals first (the SM's Practical Problem 1).
- Overheads given as ledger items with sharing ratios: distribute them to the activities before computing rates (September 2024 Q3(a)).
- "Calculates activity cost rates based on cost driver capacity": divide by capacity, not by use (May 2025).
- Percentages of revenue: on revenue at actual price, net of discount (May 2024; September 2026 MCQ 3 says "net of discount").
- State the comment ICAI expects: which product is under- or over-costed, and why; ICAI's own line is "The Activity Based Costs appear to be more precise" (SM 5.17).
:::

::: trick Check the zero
Total overhead under ABC must equal the traditional total, so the distortions × units must add up to zero (and with capacity rates, allocated cost + unused capacity cost = total activity cost). If they do not, a driver total or a rate is wrong. Condition: both systems absorb the same overheads; a question that gives a different total for ABC must be read as given.
:::

## Answer frame

### A full-marks numerical answer, in ICAI's order

1. **Working notes**: driver totals (batches, orders, inspections, hours); the split of overheads into pools if percentages or ratios are given; the driver rate table (pool, driver basis, quantity, rate).
2. **Statement 1**: cost per unit under the traditional method (rate shown).
3. **Statement 2**: cost under ABC with "@ ₹ rate (quantities)" on each overhead line; total cost and cost per unit.
4. **Comparison**: cost distortion with its sign, under- or over-costed.
5. **Comment**: reason for the difference (overheads borne by each product differ; batch-level and product-level activities) and the decision asked (price, mix, customer action).

::: cols
**Loses marks**

"Masala Gold ABC cost ₹1,200, so it is under-costed."

No rates, no driver totals: a slip anywhere loses every method mark.
---
**Passes**

Driver rates and the ABC statement, but the per-run tests were charged as if they were totals, and the distortion has no sign.

One slip in a working note spoils every figure after it.
---
**Full marks**

Working notes for driver totals and rates, both statements, the distortion with "(−)" for under-costed products and the check that it nets to zero, and a two-line comment on pricing.
:::

## Common mistakes

::: mistake Hall of Shame: per-run data used as if it were the total
"Quality tests per run: 4" for Masala Gold, charged as 4 tests × ₹1,600 = ₹6,400. **Fix:** tests = 40 runs × 4 = 160; charge = ₹2,56,000. Where a question gives a batch size instead of the number of runs, batches = units ÷ batch size first.
:::

::: mistake The rate on actual use when the question says capacity
Dividing ₹9,60,000 by the 8,000 hours used gives ₹120 an hour and hides ₹3,20,000 of idle packing capacity inside Classic Aloo's and Cocktail Mini's costs. **Fix:** divide by capacity (12,000 hours: ₹80) and report the unused capacity separately.
:::

::: mistake Dividing ABC overhead by units sold
Cost per unit is total cost ÷ units **produced**. Units sold matter only for sales, cost of goods sold and closing stock.
:::

::: mistake Percentages on list-price revenue
Operating income as a percentage of revenue uses revenue at actual price, after discount, as ICAI's answers do. **Fix:** supermarkets ₹6,99,000 ÷ ₹66,00,000 = 10.59%, not ÷ ₹75,00,000 = 9.32%.
:::

## Practice

::: quiz Check yourself
Q: A product's cost is ₹612 a unit under a single labour-hour rate and ₹655 a unit under ABC. 5,000 units are made. What is the total cost distortion in rupees? (Enter a negative number for under-costing.)
= -215000
> Distortion = traditional − ABC = ₹612 − ₹655 = −₹43 a unit; × 5,000 = −₹2,15,000: the product is under-costed by ₹2,15,000.

Q: Tapri's lab can perform 1,200 tests a year at a cost of ₹7,20,000; rates are based on capacity. Products used 1,050 tests. What is the cost of unused capacity (₹)?
= 90000
> Rate = ₹7,20,000 ÷ 1,200 = ₹600 per test. Unused 150 tests × ₹600 = ₹90,000 (= ₹7,20,000 − 1,050 × ₹600).

Q: Case scenario. Under ABC, Tapri's samosa factory charges set-ups at ₹4,000 per set-up, one set-up per batch. Party Pack (20,000 packs a month) is made in batches of 250 packs, so it carries ₹16 of set-up cost per pack. Kesar wants that figure down to ₹8 a pack, with the rate per set-up unchanged. What batch size does Party Pack need?
- [ ] 1,000 packs
- [x] 500 packs
- [ ] 250 packs
- [ ] 125 packs
> Set-up cost per pack = ₹4,000 ÷ batch size, so ₹8 needs 4,000 ÷ 8 = 500 packs a batch (40 batches a month instead of 80). The monthly volume does not enter: set-ups are batch-level, so the cost per pack depends on the batch size, not on how many packs are made. 1,000 packs would give ₹4; 125 packs, ₹32.

Q: Under ABC, a company finds Product X over-costed by ₹3 a unit on 40,000 units, and Product Y under-costed by ₹12 a unit. If these are its only products and total overheads are unchanged, how many units of Y were made?
- [ ] 1,20,000
- [ ] 40,000
- [x] 10,000
- [ ] 4,80,000
> The distortions net to zero: 40,000 × ₹3 = ₹1,20,000 = units of Y × ₹12, so Y = 10,000 units.

Q: Which of the following are correct about the comparison of traditional absorption costing and ABC? Select all that apply.
- [x] Direct materials and direct labour per unit are the same under both
- [ ] ABC always shows a higher total cost for the factory
- [x] With capacity-based rates, allocated cost plus the cost of unused capacity equals the activity's total cost
- [x] When all output is sold, total profit is the same under both
> Only overheads are re-spread; the total is unchanged, so with no closing stock total profit is unchanged too. Unused capacity is reported separately, so the pieces add back to the activity's cost.
:::

## Recap

- Prime cost is the same under both systems; only production overheads move.
- Traditional: overhead per unit = absorption rate × base per unit. ABC: driver rate × driver quantity per product ÷ units produced.
- Turn per-batch and per-unit data into totals first; batches = units ÷ batch size.
- Cost distortion = traditional − ABC: + over-costed, (−) under-costed; the total distortion is nil.
- Capacity-based rates: allocated + cost of unused capacity = activity cost; unused capacity = unused units × rate.
- Customer-level operating income = revenue at actual price − cost of goods sold − customer-level activity costs; % on revenue at actual price.
- Small-batch, low-volume products tend to be under-costed by volume rates (SM 5.26). (The ground floor was paying the fourteenth floor's bills.)

## Flashcards

Q:: ABC: formula for cost distortion per unit, and what its sign means?
A:: Traditional cost per unit − ABC cost per unit. Positive: over-costed by the traditional system; negative: under-costed.

Q:: ABC: what is the total of the cost distortions across all products?
A:: Nil, when both systems absorb the same total overheads: over-costing of some products equals under-costing of the others.

Q:: Which cost elements are unchanged when a firm moves from traditional absorption to ABC?
A:: Prime cost: direct materials, direct labour and direct expenses. Only production overheads are re-spread.

Q:: ABC: how are batches and per-batch drivers turned into totals?
A:: Batches = units produced ÷ batch size; total orders (or inspections) = batches × orders (or inspections) per batch.

Q:: Formula: cost of unused capacity under capacity-based activity rates?
A:: Cost of the activity − cost allocated to products, or unused driver units × rate (rate = cost ÷ driver capacity).

Q:: The six factors in choosing a capacity level for the budgeted fixed overhead rate (SM 5.23)?
A:: Effect on product costing and capacity management; on pricing decisions; on performance evaluation; on financial statements; regulatory requirements; difficulties in forecasting.

Q:: Format: customer-level operating income?
A:: Revenue at list price − discount = revenue at actual price; − cost of goods sold = gross margin; − customer-level operating activity costs = customer-level operating income.

Q:: Customer profitability: operating income as a % of which revenue?
A:: Revenue at actual price (net of discount), as in ICAI's suggested answers.

Q:: Five challenges in assigning operating costs to activity areas (SM 5.49)?
A:: Choosing an appropriate cost driver; developing a reliable database for it; handling costs common to several activities; choice of time period for cost rates; behavioural factors.

Q:: ICAI's conclusion in Illustration 3 about volume and cost distortion?
A:: The low volume product is under-costed and the high volume product over-costed when direct labour hours are used to absorb overheads.
