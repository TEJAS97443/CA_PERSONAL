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

Ritu's rerun leaves the **prime cost** alone: materials and labour are traced to each product directly, under any system. Only the **production overheads** move. The old system spread them by machine hours. Everyday uses most of the machine hours, so it carried most of the overhead. ABC charges them by what each product actually demands: set-ups, purchase orders, inspections, and machine hours only for the machine costs. Masala Gold is made in 40 tiny batches: half the factory's set-ups and purchase orders are its, though it is less than 7% of the cartons.

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

"The activity driver rate can be used not only to identify cost of products ... but it can also be used for costing other cost objects such as customers/customer segments and distribution channels" (SM 5.10). Each customer's revenue is reduced by the discount it receives, its cost of goods sold, and the cost of the activities it makes the company perform: purchase orders, visits, delivery kilometres, expedited deliveries. What is left is the **customer-level operating income**.

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
Tapri's premix plant makes three products. Data for the quarter:

| Particulars | Everyday | Elaichi Premium | Masala Gold |
|---|---:|---:|---:|
| Production (cartons) | 20,000 | 8,000 | 2,000 |
| Direct materials per carton (₹) | 300 | 380 | 520 |
| Direct labour hours per carton | 2 | 2 | 3 |
| Machine hours per carton | 3 | 2 | 2 |
| Batch size (cartons) | 1,000 | 400 | 50 |
| Purchase orders per batch | 2 | 4 | 3 |
| Inspections per batch | 3 | 3 | 2 |

Direct labour is paid ₹60 an hour. All production overheads are absorbed at ₹40 per machine hour. Ritu analyses the overheads as: set-ups 25%, machine operation 40%, inspection 20%, material procurement 15%. Each batch needs one set-up, and the quarter's entire output is sold.

**Required:**

(i) Calculate the cost per carton of each product under the traditional method.

(ii) Calculate the cost per carton of each product using activity based costing.

(iii) Calculate the cost distortion per carton and in total, stating which products are under-costed.

(iv) Kesar prices every product at traditional cost plus 25%. Calculate the profit per carton under ABC and comment.

:::: answer Show the working
**Working note 1: total overheads and pools.** Machine hours = 20,000 × 3 + 8,000 × 2 + 2,000 × 2 = 80,000; overheads = 80,000 × ₹40 = ₹32,00,000.

**Working note 2: driver totals**

| Particulars | Everyday | Elaichi Premium | Masala Gold | Total |
|---|---:|---:|---:|---:|
| Batches (production ÷ batch size) | 20 | 20 | 40 | 80 |
| Purchase orders (batches × per batch) | 40 | 80 | 120 | 240 |
| Inspections (batches × per batch) | 60 | 60 | 80 | 200 |
| Machine hours | 60,000 | 16,000 | 4,000 | 80,000 |

**Working note 3: cost driver rates**

| Cost pool | Overheads (₹) | Driver | Rate (₹) |
|---|---:|---|---:|
| Set-ups (25%) | 8,00,000 | 80 batches | 10,000 per set-up |
| Machine operation (40%) | 12,80,000 | 80,000 machine hours | 16 per machine hour |
| Inspection (20%) | 6,40,000 | 200 inspections | 3,200 per inspection |
| Material procurement (15%) | 4,80,000 | 240 orders | 2,000 per order |

**(i) Cost per carton: traditional method**

| Particulars | Everyday (₹) | Elaichi Premium (₹) | Masala Gold (₹) |
|---|---:|---:|---:|
| Direct materials | 300 | 380 | 520 |
| Direct labour (2, 2, 3 hours × ₹60) | 120 | 120 | 180 |
| Production overheads (3, 2, 2 hours × ₹40) | 120 | 80 | 80 |
| **Cost per carton** | **540** | **580** | **780** |

**(ii) Cost: activity based costing**

| Particulars | Everyday (₹) | Elaichi Premium (₹) | Masala Gold (₹) |
|---|---:|---:|---:|
| Direct materials | 60,00,000 | 30,40,000 | 10,40,000 |
| Direct labour | 24,00,000 | 9,60,000 | 3,60,000 |
| Set-ups @ ₹10,000 (20, 20, 40) | 2,00,000 | 2,00,000 | 4,00,000 |
| Machine operation @ ₹16 (60,000, 16,000, 4,000 hours) | 9,60,000 | 2,56,000 | 64,000 |
| Inspection @ ₹3,200 (60, 60, 80) | 1,92,000 | 1,92,000 | 2,56,000 |
| Procurement @ ₹2,000 (40, 80, 120) | 80,000 | 1,60,000 | 2,40,000 |
| **Total cost** | **98,32,000** | **48,08,000** | **23,60,000** |
| **Cost per carton** | **491.60** | **601.00** | **1,180.00** |

Check: the ABC overheads, ₹14,32,000 + ₹8,08,000 + ₹9,60,000 = ₹32,00,000.

**(iii) Cost distortion** (traditional − ABC)

| Particulars | Everyday | Elaichi Premium | Masala Gold |
|---|---:|---:|---:|
| Per carton (₹) | +48.40 | (−) 21.00 | (−) 400.00 |
| Total (₹) | +9,68,000 | (−) 1,68,000 | (−) 8,00,000 |
| Result | Over-costed | Under-costed | Under-costed |

The total distortion is nil: ₹9,68,000 = ₹1,68,000 + ₹8,00,000.

::: diagram Cost per carton: machine-hour rate against ABC
{"type": "plot", "h": 290, "x": [0.4, 3.6], "y": [0, 1300], "xlabel": "product", "ylabel": "cost per carton (₹)", "xticks": [[1, "Everyday"], [2, "Elaichi Premium"], [3, "Masala Gold"]], "yticks": [0, 325, 650, 975, 1300], "series": [{"label": "traditional", "bars": true, "bw": 0.32, "values": true, "color": "mute", "pts": [[0.82, 540, "540"], [1.82, 580, "580"], [2.82, 780, "780"]]}, {"label": "ABC", "bars": true, "bw": 0.32, "values": true, "color": "a", "pts": [[1.18, 491.6, "491.60"], [2.18, 601, "601"], [3.18, 1180, "1,180"]]}], "caption": "Grey: traditional cost; blue: ABC cost. Masala Gold's 40 small batches carry half the set-ups and procurement, which machine hours never saw."}
:::

**(iv) Profit per carton under ABC**

| Particulars | Everyday (₹) | Elaichi Premium (₹) | Masala Gold (₹) |
|---|---:|---:|---:|
| Price (traditional cost × 125%) | 675.00 | 725.00 | 975.00 |
| Less: ABC cost | 491.60 | 601.00 | 1,180.00 |
| **Profit / (loss) per carton** | **183.40** | **124.00** | **(205.00)** |

**Comment.** Everyday earns ₹183.40, not the ₹135 the old cost suggested: it has room to meet BrewBucks' ₹640 and still earn ₹148.40 a carton. Masala Gold loses ₹205 a carton: its price must rise towards ₹1,475 (ABC cost plus 25%), or its batches must be fewer and larger. Total profit for the quarter (₹42,50,000) is the same under both systems because all output is sold; the difference is in which product earns it. The ABC costs appear to be more precise.
::::
:::::

::: lab abc {"base":"lh"}
Run the same comparison on Tapri's premix, sachets and samosas: ABC beside one labour hour rate, and which product each method under-costs, and why.
:::

:::: example Capacity-based rates and the cost of unused capacity
The packing hall of Tapri's samosa factory calculates activity cost rates on cost driver capacity:

| Activity | Cost driver | Capacity | Cost (₹) |
|---|---|---:|---:|
| Packing machine | Machine hours | 12,000 hours | 9,60,000 |
| Quality inspection | Number of inspections | 800 | 4,80,000 |
| Dispatch | Number of dispatch orders | 2,500 | 3,75,000 |

The year's consumption of cost drivers:

| Product | Machine hours | Inspections | Dispatch orders |
|---|---:|---:|---:|
| Classic Aloo | 6,000 | 350 | 900 |
| Cocktail Mini | 2,500 | 300 | 1,000 |
| Punjabi Jumbo | 2,000 | 150 | 400 |

**Required:**

(i) Compute the costs allocated to each product from each activity.

(ii) Calculate the cost of unused capacity for each activity.

(iii) State the factors management considers in choosing a capacity level to compute the budgeted fixed overhead cost rate.

::: answer Show the working
**Working note: rate per unit of cost driver** (cost ÷ capacity): packing ₹9,60,000 ÷ 12,000 = **₹80 per hour**; inspection ₹4,80,000 ÷ 800 = **₹600 per inspection**; dispatch ₹3,75,000 ÷ 2,500 = **₹150 per order**.

**(i) Statement of cost allocation to each product**

| Activity | Classic Aloo (₹) | Cocktail Mini (₹) | Punjabi Jumbo (₹) | Total (₹) |
|---|---:|---:|---:|---:|
| Packing (6,000; 2,500; 2,000 × ₹80) | 4,80,000 | 2,00,000 | 1,60,000 | 8,40,000 |
| Inspection (350; 300; 150 × ₹600) | 2,10,000 | 1,80,000 | 90,000 | 4,80,000 |
| Dispatch (900; 1,000; 400 × ₹150) | 1,35,000 | 1,50,000 | 60,000 | 3,45,000 |
| **Total** | **8,25,000** | **5,30,000** | **3,10,000** | **16,65,000** |

**(ii) Cost of unused capacity**

| Activity | Unused capacity | Amount (₹) |
|---|---|---:|
| Packing (₹9,60,000 − ₹8,40,000) | 1,500 hours × ₹80 | 1,20,000 |
| Inspection (₹4,80,000 − ₹4,80,000) | Nil | – |
| Dispatch (₹3,75,000 − ₹3,45,000) | 200 orders × ₹150 | 30,000 |
| **Total cost of unused capacity** | | **1,50,000** |

Check: ₹16,65,000 + ₹1,50,000 = ₹18,15,000, the total cost of the three activities.

**(iii)** Effect on product costing and capacity management; effect on pricing decisions; effect on performance evaluation; effect on financial statements; regulatory requirements; difficulties in forecasting (SM 5.23).
:::
::::

:::: example Which customers earn money?
Tapri sells its premix to three customer categories at a list price of ₹500 a carton; the cost of goods sold is ₹380 a carton. Its customer-level activities and their cost driver rates are: order processing ₹600 per purchase order; customer visits ₹1,500 per visit; delivery ₹25 per kilometre travelled; expedited delivery ₹2,000 each.

| Particulars | Distributors | Supermarkets | Online |
|---|---:|---:|---:|
| Cartons sold | 12,000 | 6,000 | 2,000 |
| Discount on list price | 10% | 6% | Nil |
| Purchase orders | 24 | 120 | 400 |
| Customer visits | 12 | 30 | Nil |
| Kilometres travelled | 2,400 | 3,000 | 3,200 |
| Expedited deliveries | Nil | 10 | 40 |

**Required:** Calculate the customer-level operating income of each category and the operating income as a percentage of revenue, rank them, and comment.

::: answer Show the working
**Working note: customer-level operating activity costs**

| Activity | Distributors (₹) | Supermarkets (₹) | Online (₹) |
|---|---:|---:|---:|
| Order processing (24; 120; 400 × ₹600) | 14,400 | 72,000 | 2,40,000 |
| Customer visits (12; 30; – × ₹1,500) | 18,000 | 45,000 | – |
| Delivery (2,400; 3,000; 3,200 km × ₹25) | 60,000 | 75,000 | 80,000 |
| Expedited delivery (–; 10; 40 × ₹2,000) | – | 20,000 | 80,000 |
| **Total** | **92,400** | **2,12,000** | **4,00,000** |

**Customer-level operating income**

| Particulars | Distributors (₹) | Supermarkets (₹) | Online (₹) |
|---|---:|---:|---:|
| Revenues at list price | 60,00,000 | 30,00,000 | 10,00,000 |
| Less: Discount | 6,00,000 | 1,80,000 | – |
| **Revenue at actual price** | **54,00,000** | **28,20,000** | **10,00,000** |
| Less: Cost of goods sold (₹380) | 45,60,000 | 22,80,000 | 7,60,000 |
| **Gross margin** | **8,40,000** | **5,40,000** | **2,40,000** |
| Less: Customer-level activity costs | 92,400 | 2,12,000 | 4,00,000 |
| **Customer-level operating income** | **7,47,600** | **3,28,000** | **(1,60,000)** |
| Operating income as % of revenue | 13.84% | 11.63% | (16.00%) |
| **Rank** | **I** | **II** | **III** |

**Comment.** On gross margin alone the online customers look best (24% of revenue, with no discount). ABC shows the opposite: 400 small orders and 40 expedited deliveries cost ₹4,00,000 to serve 2,000 cartons, and the category loses ₹1,60,000. Distributors take the largest discount but order rarely and in bulk, so they are the most profitable. Tapri should set a minimum order size or a delivery charge for online orders, and charge for expedited delivery.
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

"Masala Gold ABC cost ₹1,180, so it is under-costed."

No rates, no driver totals: a slip anywhere loses every method mark.
---
**Passes**

Driver rates and the ABC statement, but the per-batch orders were charged as if they were totals, and the distortion has no sign.

One slip in a working note spoils every figure after it.
---
**Full marks**

Working notes for driver totals and rates, both statements, the distortion with "(−)" for under-costed products and the check that it nets to zero, and a two-line comment on pricing.
:::

## Common mistakes

::: mistake Hall of Shame: per-batch data used as if it were the total
"Purchase orders per batch: 3" for Masala Gold, charged as 3 orders × ₹2,000 = ₹6,000. **Fix:** batches = 2,000 ÷ 50 = 40; orders = 40 × 3 = 120; charge = ₹2,40,000.
:::

::: mistake The rate on actual use when the question says capacity
Dividing ₹9,60,000 by the 10,500 hours used gives ₹91.43 and hides the ₹1,20,000 of idle packing capacity inside product costs. **Fix:** divide by capacity (12,000 hours) and report the unused capacity separately.
:::

::: mistake Dividing ABC overhead by units sold
Cost per unit is total cost ÷ units **produced**. Units sold matter only for sales, cost of goods sold and closing stock.
:::

::: mistake Percentages on list-price revenue
Operating income as a percentage of revenue uses revenue at actual price, after discount, as ICAI's answers do. **Fix:** ₹7,47,600 ÷ ₹54,00,000 = 13.84%, not ÷ ₹60,00,000 = 12.46%.
:::

## Practice

::: quiz Check yourself
Q: A product's cost is ₹612 a unit under a single labour-hour rate and ₹655 a unit under ABC. 5,000 units are made. What is the total cost distortion in rupees? (Enter a negative number for under-costing.)
= -215000
> Distortion = traditional − ABC = ₹612 − ₹655 = −₹43 a unit; × 5,000 = −₹2,15,000: the product is under-costed by ₹2,15,000.

Q: Tapri's lab can perform 1,200 tests a year at a cost of ₹7,20,000; rates are based on capacity. Products used 1,050 tests. What is the cost of unused capacity (₹)?
= 90000
> Rate = ₹7,20,000 ÷ 1,200 = ₹600 per test. Unused 150 tests × ₹600 = ₹90,000 (= ₹7,20,000 − 1,050 × ₹600).

Q: Case scenario. Tapri's samosa factory makes Classic (1,00,000 packs, 25 batches) and Party Pack (20,000 packs, 100 batches). Set-up costs are ₹6,25,000 and are now absorbed at a rate per direct labour hour; Classic uses 80% of the labour hours. Under ABC, set-ups are charged per batch. What is Party Pack's set-up cost per pack under ABC?
- [ ] ₹6.25
- [x] ₹25.00
- [ ] ₹1.25
- [ ] ₹5.00
> Rate = ₹6,25,000 ÷ 125 batches = ₹5,000 per set-up. Party Pack: 100 × ₹5,000 = ₹5,00,000 ÷ 20,000 packs = ₹25. Under the labour-hour rate it was 20% × ₹6,25,000 ÷ 20,000 = ₹6.25 (option A).

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
