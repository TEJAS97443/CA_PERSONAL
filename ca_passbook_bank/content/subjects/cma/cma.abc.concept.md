---
id: cma.abc.concept
title: Activities, cost pools, cost drivers and the cost hierarchy
minutes: 28
needs: cma.oh.absorb
tags: activity based costing, ABC, cost driver, cost pool, cost hierarchy, resource cost driver, activity cost driver
labs: abc
summary: Why one labour-hour rate miscosts products, and how ABC traces overheads to activities, collects them in cost pools and charges cost objects through cost drivers at four levels of the cost hierarchy.
---

## In plain words

### The festival special that looked cheap

Tapri's chai premix plant in Indore makes one big product and one tiny one. Kadak Classic runs in long batches, 1,20,000 packs a month. Kesar Pista Royale, Kesar's Diwali launch, runs in 30 small batches of 200 packs. Every batch needs the machines stripped, cleaned and reset and three lab tests, and its saffron and pistachio arrive in small, frequent orders.

> **Kesar:** Ritu, Royale carries only ₹12 of overhead a pack. Let us cut its price and sell it all year.
> **Ritu:** That ₹12 comes from charging overhead by labour hours, and Royale uses very few. Its overheads come from set-ups, orders and tests. Per unit, please, but per set-up first.

The traditional system collects overheads in a few cost centres and spreads them by direct labour hours or machine hours. It assumes that a product which takes longer causes more overhead. But a set-up, a purchase order or a lab test happens once per batch, however few hours the batch takes. So Kadak Classic, with most of the labour hours, quietly pays for Royale's set-ups.

**Activity based costing (ABC)** fixes this in two moves. First it finds the **activities** that cause overhead (setting up machines, purchasing, testing, blending) and collects the cost of each in its own **cost pool**. Then it charges each product for the activities it uses, measured by a **cost driver**: the number of set-ups, purchase orders or tests, or machine hours. Done this way, Royale's overhead is ₹42 a pack, not ₹12, and Kadak Classic's falls from ₹4.80 to ₹3.30.

Activities come in levels. Some happen for every unit (blending), some for every batch (set-ups), some for every product (designing Royale's recipe), and some just keep the plant running (rent, security). This is the **cost hierarchy**, and it tells you which kind of driver to look for.

::: analogy The group dinner bill
Six friends split a restaurant bill by how long each sat at the table. The one who lingered over a single cutting chai pays the most; the one who ordered five starters and two desserts in twenty minutes pays the least. Time at the table is not what drives the bill: the orders are. ABC splits the bill by the orders. Every item has a price (the driver rate), and each friend pays for what they ordered (the driver quantity).
:::

::: key
Overheads are caused by activities, not by labour hours. ABC traces overheads to activities first, then charges each cost object for the activities it actually uses, through cost drivers.
:::

## How it works

### Why one labour-hour rate misfires

In the traditional system overheads are grouped under cost centres and absorbed on direct labour hours, machine hours or volume ([[cma.oh.absorb|absorption rates]]). ICAI is careful: not every traditional system is inaccurate. "The main cause of inaccuracy is in the calculation of the overhead rate itself", which assumes "that products that take longer to make, generate more overheads" (SM 5.2).

Four factors prompted the development of ABC (SM 5.2):

1. Growing overhead costs because of increasingly automated production.
2. Increasing market competition, which necessitated more accurate product costs.
3. Increasing product diversity to secure economies of scope and increased market share.
4. Decreasing costs of information processing because of continual improvements and increasing application of information technology.

ABC is particularly needed (its **usefulness or suitability**, SM 5.3) in these situations:

1. **High amount of overhead**: production overheads are high and form significant costs.
2. **Wide range of products**: there is diversity in the product range, or multiple products.
3. **Presence of non-volume related activities**: activities such as material handling, inspection and set-up are significant and the traditional system cannot be applied. ABC also identifies non-value-adding activities that might be a focus for attention or elimination.
4. **Stiff competition**: cost must be computed accurately and the price fixed to the market. ABC also helps reduce cost by identifying non-value-adding activities.

### The words ICAI uses

::: definition Activity Based Costing
An accounting methodology that assigns costs to activities rather than products or services. This enables resources and overhead costs to be more accurately assigned to products and services that consume them. ABC is a technique which involves identification of cost with each cost driving activity and making it as the basis for apportionment of costs over different cost objects/jobs/products/customers or services. (SM 5.3)
:::

CIMA defines it as "an approach to the costing and monitoring of activities which involves tracing resource consumption and costing final outputs. Resources are assigned to activities, and activities to cost objects based on consumption estimates. The latter utilise cost drivers to attach activity costs to outputs" (SM 5.4).

::: definition Terms used in ABC (SM 5.4)
- (i) **Activity**: an event that incurs cost.
- (ii) **Cost object**: an item for which cost measurement is required, e.g. a product or a customer.
- (iii) **Cost driver**: a factor that causes a change in the cost of an activity. Two categories: a **resource cost driver** is a measure of the quantity of resources consumed by an activity, used to assign the cost of a resource to an activity or cost pool; an **activity cost driver** is a measure of the frequency and intensity of demand placed on activities by cost objects, used to assign activity costs to cost objects.
- (iv) **Cost pool**: a group of various individual cost items that have the same cause and effect relationship, e.g. machine set-up.
:::

### Two stages, and where ABC differs

Traditional absorption costing relates overheads first to cost centres (production and service) and then to products. ABC relates them first to activities, grouped into cost pools, and then to cost objects. "The two processes are, therefore, very similar, but the first stage is different, as ABC uses activities instead of functional departments" (SM 5.6). A department holds many activities whose costs behave differently, and activities run across departments: a purchase requisition is raised in the factory or stores, not in the purchasing department. The costs inside one activity share a driver, so ABC gives ==a more realistic picture of the way in which costs behave==.

::: diagram Cost allocation under ABC
{"type": "flow", "w": 420, "nodes": [{"id": "o", "kind": "start", "label": "Overhead cost\n(resources)"}, {"id": "r", "kind": "io", "label": "linked through\nresource cost drivers"}, {"id": "a", "kind": "process", "label": "Activities\n(one cost pool each)"}, {"id": "d", "kind": "io", "label": "linked through\nactivity cost drivers"}, {"id": "c", "kind": "end", "label": "Cost objects"}], "edges": [["o", "r"], ["r", "a"], ["a", "d"], ["d", "c"]], "caption": "Stage one: resource cost drivers measure the share of each resource an activity consumes. Stage two: activity cost drivers measure how much of each activity a cost object (a product, a customer, a channel) demands. Based on the figure at SM 5.10."}
:::

### Five stages, on Ritu's premix numbers

ICAI's stages (SM 5.9–5.10), applied to the plant's monthly overheads of ₹6,48,000:

::: steps
1. **Identify the activities.** A traditional system may use up to about fifteen cost centres; ABC could use 200 activities, but about 40 is practical. Ritu picks four: machine set-ups, purchasing, quality inspection and blending.
2. **Relate the overheads to the activities that caused them**, support and primary, using resource cost drivers. This creates the **cost pools** ("cost buckets"). Set-up crew wages ₹1,20,000 and changeover cleaning materials ₹30,000 make the set-up pool of ₹1,50,000; purchase salaries ₹90,000 and order software ₹18,000 make purchasing ₹1,08,000; lab staff ₹84,000 and test kits ₹36,000 make inspection ₹1,20,000; blender power ₹1,62,000 and depreciation ₹1,08,000 make blending ₹2,70,000.
3. **Spread support activities over the primary activities** on a base that reflects their use (the plant has none here; Worked example 1 has one).
4. **Determine the activity cost drivers** by asking what causes each activity to incur cost: 50 set-ups, 90 purchase orders, 150 inspections, 4,500 machine hours.
5. **Calculate the activity cost driver rates** and multiply them by what each cost object uses: ₹3,000 a set-up, ₹1,200 an order, ₹800 an inspection, ₹60 a machine hour.
:::

| Activity (driver used: Classic; Royale) | Kadak Classic (₹) | Kesar Pista Royale (₹) |
|---|---:|---:|
| Set-ups at ₹3,000 (20; 30) | 60,000 | 90,000 |
| Purchasing at ₹1,200 (40; 50 orders) | 48,000 | 60,000 |
| Inspection at ₹800 (60; 90) | 48,000 | 72,000 |
| Blending at ₹60 (4,000; 500 machine hours) | 2,40,000 | 30,000 |
| **Overhead under ABC** | **3,96,000** | **2,52,000** |
| Packs made | 1,20,000 | 6,000 |
| **Overhead per pack under ABC** | **3.30** | **42.00** |
| Per pack at ₹80 per labour hour (7,200; 900 hours) | 4.80 | 12.00 |

The single rate is ₹6,48,000 ÷ 8,100 labour hours = ₹80. Both methods charge the same ₹6,48,000 in total; ABC only moves ₹1,80,000 from Kadak Classic to Royale.

::: diagram Overhead per pack: one labour-hour rate against ABC
{"type": "plot", "h": 280, "x": [0.4, 2.6], "y": [0, 48], "xlabel": "product", "ylabel": "overhead per pack (₹)", "xticks": [[1, "Kadak Classic"], [2, "Kesar Pista Royale"]], "yticks": [0, 12, 24, 36, 48], "series": [{"label": "labour-hour rate", "bars": true, "bw": 0.32, "values": true, "color": "mute", "pts": [[0.82, 4.8, "4.80"], [1.82, 12, "12.00"]]}, {"label": "ABC", "bars": true, "bw": 0.32, "values": true, "color": "a", "pts": [[1.18, 3.3, "3.30"], [2.18, 42, "42.00"]]}], "caption": "Grey: overhead per pack at ₹80 per direct labour hour; blue: under ABC. The small-batch product was carrying less than a third of the overhead it causes."}
:::

::: lab abc {"base":"none"}
Step through the stages yourself: follow each cost pool to its driver rate and on into the products, one product at a time.
:::

### The cost hierarchy

These levels of activity were first identified by Cooper (1990), and "the categories of activities help to determine the type of activity cost driver required" (SM 5.8):

::: diagram The cost hierarchy (SM 5.8–5.9)
{"type": "layers", "layers": [{"label": "Unit level", "note": "varies with units produced", "right": "machine hours, units"}, {"label": "Batch level", "note": "varies with batches made", "right": "set-ups, orders"}, {"label": "Product level", "note": "supports each product", "right": "number of products"}, {"label": "Facility level", "note": "sustains the whole plant", "right": "no product driver"}], "caption": "Left: what the activity's cost varies with; right: the kind of activity cost driver to look for."}
:::

| Level | Meaning (SM 5.8–5.9) | ICAI's examples |
|---|---|---|
| Unit level | Consumption of resources can be identified with the number of units produced | Indirect materials or consumables used in proportion to units; inspection or testing of every item (or every 100th item) |
| Batch level | Performed each time a batch is produced; cost varies with the number of batches, but is common (fixed) for all units within the batch | Material ordering for every batch; machine set-up between batches; inspecting the first item in every batch |
| Product level | Performed to support different products in the product line | Designing the product; producing parts specifications; keeping technical drawings up to date |
| Facility level | Cannot be directly attributed to individual products; necessary to sustain the manufacturing process; common and joint to all products | Maintenance of buildings; plant security |

Inspection appears twice: testing every 100th item is unit level, testing the first item of every batch is batch level. The level follows what the cost varies with, not the activity's name.

## Formats and formulas

*Reproduce the formula and both driver tables from memory: ICAI asks for examples of cost drivers as 5-mark parts.*

::: formula Activity cost driver rate (SM 5.10)
$$\text{Activity cost driver rate} \qquad = \frac{\text{Total cost of activity}}{\text{Activity driver}}$$
The activity driver is the total quantity of the driver for the period (all set-ups, all orders). Overhead charged to a cost object = the sum, over the activities it uses, of driver rate × driver quantity it consumed.
:::

**Cost drivers by business function** (SM 5.4–5.5):

| Business function | Cost drivers |
|---|---|
| Research and development | Number of research projects; personnel hours on a project |
| Design of products, services and procedures | Number of products in design; number of parts per product; number of engineering hours |
| Customer service | Number of service calls; number of products serviced; hours spent on servicing products |
| Marketing | Number of advertisements; number of sales personnel; sales revenue |
| Distribution | Number of units distributed; number of customers |

**Cost drivers by activity cost pool** in a production department (SM 5.13):

| Activity cost pool | Related cost driver |
|---|---|
| Ordering and receiving materials | Number of purchase orders |
| Setting up machines | Number of set-ups |
| Machining | Machine hours |
| Assembling | Number of parts |
| Inspecting and testing | Number of tests |
| Painting | Number of parts |
| Supervising | Direct labour hours |

## Worked examples

:::: example The samosa factory: from the ledger to driver rates
Tapri's samosa factory makes Classic Aloo (1,50,000 packs a month) and Cocktail Mini (30,000 packs). It absorbs production overheads at a single rate per direct labour hour; Ritu proposes ABC with four primary activities (set-ups, material receiving, quality testing, frying) and one support activity (maintenance). The month's overheads are:

| Overhead | Amount (₹) | How it is used |
|---|---:|---|
| Supervisors' salaries | 2,40,000 | Time: set-ups 40%, receiving 20%, testing 40% |
| Stores and receiving staff wages | 1,20,000 | Receiving only |
| Lab staff and test kits | 1,80,000 | Testing only |
| Power | 3,00,000 | kWh: frying 80%, set-ups 20% |
| Depreciation of fryers | 2,10,000 | Frying only |
| Maintenance department | 1,50,000 | 150 hours on set-ups, 600 on frying |

| Driver data | Classic Aloo | Cocktail Mini |
|---|---:|---:|
| Set-ups | 15 | 45 |
| Material deliveries received | 90 | 150 |
| Quality tests | 75 | 225 |
| Machine hours (frying) | 6,000 | 1,600 |
| Direct labour hours | 18,000 | 6,000 |

**Required:**

(i) Calculate the cost of each activity pool and the activity cost driver rates.

(ii) Calculate the overhead per pack of each product under ABC and under the present labour-hour rate.

(iii) State which product is under-costed, by how much, and why.

::: answer Show the working
**Working note 1: cost pools** (stage 2 by resource cost drivers, stage 3 for maintenance in the ratio 150 : 600)

| Overhead | Set-ups (₹) | Receiving (₹) | Testing (₹) | Frying (₹) |
|---|---:|---:|---:|---:|
| Supervisors (40 : 20 : 40) | 96,000 | 48,000 | 96,000 | – |
| Stores and receiving staff | – | 1,20,000 | – | – |
| Lab staff and test kits | – | – | 1,80,000 | – |
| Power (20 : 80) | 60,000 | – | – | 2,40,000 |
| Depreciation of fryers | – | – | – | 2,10,000 |
| Maintenance (1 : 4) | 30,000 | – | – | 1,20,000 |
| **Cost pool** | **1,86,000** | **1,68,000** | **2,76,000** | **5,70,000** |

Check: the pools add up to ₹12,00,000, the ledger total.

**Working note 2: activity cost driver rates**

| Activity | Cost pool (₹) | Driver | Rate (₹) |
|---|---:|---|---:|
| Set-ups | 1,86,000 | 60 set-ups | 3,100 per set-up |
| Receiving | 1,68,000 | 240 deliveries | 700 per delivery |
| Testing | 2,76,000 | 300 tests | 920 per test |
| Frying | 5,70,000 | 7,600 machine hours | 75 per machine hour |

**(ii) Overhead charged**

| Activity | Classic Aloo (₹) | Cocktail Mini (₹) |
|---|---:|---:|
| Set-ups (15; 45 × ₹3,100) | 46,500 | 1,39,500 |
| Receiving (90; 150 × ₹700) | 63,000 | 1,05,000 |
| Testing (75; 225 × ₹920) | 69,000 | 2,07,000 |
| Frying (6,000; 1,600 × ₹75) | 4,50,000 | 1,20,000 |
| **Overhead under ABC** | **6,28,500** | **5,71,500** |
| **Per pack under ABC** | **4.19** | **19.05** |
| Present rate: ₹12,00,000 ÷ 24,000 hours = ₹50 per hour | 9,00,000 | 3,00,000 |
| Per pack at the present rate | 6.00 | 10.00 |

**(iii)** Cocktail Mini is under-costed by ₹9.05 a pack (₹2,71,500 in total) and Classic Aloo over-costed by ₹1.81 a pack (the same ₹2,71,500). Cocktail Mini uses only a quarter of the labour hours, but three-quarters of the set-ups and tests and most of the deliveries: batch-level costs that a labour-hour rate spreads by hours. The ABC costs appear to be more precise.
:::
::::

:::: example Ritu sorts the cost pools into the hierarchy
Tapri's samosa factory accumulates its overheads in the following cost pools. Classify each as unit level, batch level, product level or facility level, and suggest a cost driver for each where one exists.

(1) Packing film used for every pack; (2) Power for the fryers; (3) Changing the moulds between flavours; (4) Raw material purchase orders, placed for every production batch; (5) Testing the first pack of every batch; (6) Developing the recipe and label of a new flavour; (7) Keeping each product's specification sheets up to date; (8) Factory rent; (9) Plant security; (10) Factory manager's salary.

::: answer Model answer
| Cost pool | Level | Cost driver |
|---|---|---|
| (1) Packing film | Unit level | Number of packs |
| (2) Power for fryers | Unit level | Machine hours |
| (3) Changing moulds | Batch level | Number of set-ups |
| (4) Purchase orders per batch | Batch level | Number of purchase orders |
| (5) First-pack testing | Batch level | Number of batches (tests) |
| (6) New recipe and label | Product level | Number of products (design hours) |
| (7) Specification sheets | Product level | Number of products |
| (8) Factory rent | Facility level | None traceable to products |
| (9) Plant security | Facility level | None traceable to products |
| (10) Factory manager's salary | Facility level | None traceable to products |

Basis: unit-level costs vary with the number of units produced; batch-level costs vary with the number of batches but are common to all units in a batch; product-level activities support each product in the line; facility-level activities sustain the process and are common and joint to all products (SM 5.8–5.9). Where a pool could sit at two levels (testing every pack would be unit level), the answer should state the assumption.
:::
::::

:::: example Should they adopt ABC?
State with a brief reason whether you would recommend ABC in each case.

(a) Chai Express Logistics runs one refrigerated route; nearly all its overhead is depreciation of the trucks.

(b) Tapri's packaging unit makes eight products on different lines, with frequent set-ups and heavy inspection.

(c) Tapri's app-delivery division faces BrewBucks' price war and prices its delivery plans at cost plus a markup.

(d) A small kulhad workshop makes two hand-made products; most of its cost is direct labour, and overheads are small.

::: answer Model answer
**(a) No.** A single service, so ABC is not needed to allocate overhead between products; and depreciation, the main overhead, offers little scope for cost reduction through activity analysis.

**(b) Yes.** A wide range of products with significant non-volume related activities (set-ups, inspection): a volume-based rate will distort costs (SM 5.3).

**(c) Yes.** Stiff competition and cost-plus pricing call for accurate costs; ABC can also identify non-value-adding activities to reduce cost (SM 5.3, 5.19).

**(d) No.** Few products, labour-intensive work and low overheads: direct labour is a reasonable basis, and ABC's expense would not be justified for a small organisation (SM 5.18).
:::
::::

## Under the hood

### Still absorption costing

ICAI calls ABC "a modern absorption costing method" (SM 5.2): every production overhead still ends up in product cost, so total overhead does not change (₹6,48,000 and ₹12,00,000 above, both ways). Only its spread across products changes. ABC is not marginal costing.

### Cost drivers in chapter 1

Chapter 1 defines a cost driver as "a factor or variable which effect level of cost. Generally, it is an activity which is responsible for cost incurrence", with volume of production as an example (SM 1.21–1.22). ICAI's suggested answer to old-scheme November 2023 Q6(e) opens with this sentence and then gives the two categories of chapter 5. Write both.

### Beyond products

The activity driver rate can cost other cost objects too: customers, customer segments and distribution channels. "The possibility of costing objects other than products is part of the benefit of ABC" (SM 5.10). The calculations are in [[cma.abc.compute|product costs under ABC]]; the managerial uses in [[cma.abc.abm|activity based management and budgeting]].

## Exam angle

::: exam How ICAI asked this, May 2024 to September 2026 (and old-scheme 2022–23)
In the documents read for this lesson, the concepts of this lesson were asked in 10 questions:

- **"Discuss the usefulness/suitability of ABC"**: January 2026 Q6(c), 4 marks. The suggested answer is SM 5.3's four headed situations, word for word.
- **Classify cost pools by the cost hierarchy**: May 2025 Q6(b), 5 marks, ten pools. ICAI's answer: facility level for human resources, maintenance of buildings, plant security and the floor manager's salary; batch level for purchasing, machine set-up and the receiving department; product level for designing the product; "batch-level/product level" for parts management and "batch-level/unit level" for quality control.
- **Give examples of cost drivers**: for five cost pools (quality control, R&D, machine maintenance, employee training, customer service) in RTP January 2026 Q19(b), RTP September 2026 Q16(d) and MTP May 2025 Series I Q6(b) (5 marks); for business functions in old-scheme November 2022 Q6(c); for activity cost pools in old-scheme MTP November 2022 Series I Q6(d).
- **Meaning and categories of cost driver, with drivers for three functions**: old-scheme November 2023 Q6(e), 5 marks.
- **Recommend ABC or not** in four situations: MTP September 2025 Series II Q5(b), 5 marks.
- **"Explain how an ABC system would be developed"**, inside a 10-mark costing question: MTP January 2026 Series I Q2(a)(ii); the answer lists the stages before the numbers.
:::

::: exam The traps
- A cost pool is classified by what its cost varies with: ICAI's own answer moved quality control between batch and unit level. State the assumption.
- "Cost driver" questions want the two categories by name: resource cost driver and activity cost driver.
- ICAI's examples for quality control include "product units produced"; for employee training, "number of training hours" and "employees trained" (RTP January 2026 answer).
:::

::: trick One more what?
To place an activity in the hierarchy, ask: its cost rises if we make one more what? One more unit: unit level. One more batch: batch level. One more product in the range: product level. None of these: facility level. Condition: judge the activity as the question describes it, not by its name.
:::

## Answer frame

### "Distinguish between ABC and traditional absorption costing" (SM 5.7)

::: compare
| Point | Activity based costing | Traditional absorption costing |
|---|---|---|
| 1. Grouping | Overheads related to activities and grouped into activity cost pools | Overheads related to cost centres or departments |
| 2. Realism | Costs related to activities, hence more realistic | Costs related to cost centres, hence not realistic of cost behaviour |
| 3. Drivers | Activity-wise cost drivers determined | Time (hours) assumed to be the only cost driver in all departments |
| 4. Rates | Activity-wise recovery rates; no single overhead recovery rate | Multiple rates (one per department) or a single overhead recovery rate |
| 5. Cost objects | Customers, products, services, departments, etc. | Cost units: products, jobs or hours |
| 6. Control | Essential activities simplified, unnecessary ones eliminated: aids cost control | Cost centres cannot be eliminated: not suitable for cost control |
:::

### Other questions, in ICAI's order

- **Usefulness or suitability** (4 marks): the four headed situations of SM 5.3, each with one line of explanation.
- **Cost driver**: definition; the two categories with their uses; then two drivers for each function asked, from the SM 5.4–5.5 table.
- **How product costs are determined in ABC, or how an ABC system is developed**: the five stages in order (identify activities; relate overheads to activities to create cost pools using resource cost drivers; spread support activities over primary activities; determine activity cost drivers; calculate driver rates and charge cost objects), then the numbers.
- **Levels of activities**: the four levels, each with ICAI's meaning and one example.

## Common mistakes

::: mistake Hall of Shame: the inspection that was batch level because it said "inspection"
Bunty learned "inspection = batch level" and applied it to a factory that tests every pack. **Fix:** classify by what the cost varies with. Testing every unit is unit level; testing the first item of each batch is batch level (SM 5.8).
:::

::: mistake Charging products with a resource cost driver
Charging the supervisors' salaries straight to Classic Aloo and Cocktail Mini by the time supervisors spend on each product, skipping the cost pools. **Fix:** a resource cost driver (supervisors' time on set-ups, receiving and testing) takes a resource to the activities: stage one. Products are then charged through activity cost drivers (set-ups, tests, deliveries) at each activity's rate.
:::

::: mistake Dividing a pool by one product's driver
Taking ₹1,86,000 ÷ 45 set-ups for Cocktail Mini. **Fix:** the rate is the pool ÷ the total driver for the period (60 set-ups), then multiplied by each product's own quantity. Check: the products' charges add back to the pool.
:::

::: mistake "ABC increased the overheads"
**Fix:** ABC redistributes the same total; under-costed and over-costed amounts are equal and opposite. If your totals differ from the ledger, a pool or a rate is wrong.
:::

## Practice

::: quiz Check yourself
Q: Tapri's dispatch activity costs ₹2,88,000 a month and is driven by the number of dispatch orders: 960 in the month, of which the Elaichi premix used 140. How much dispatch cost is charged to the Elaichi premix (₹)?
= 42000
> Rate = ₹2,88,000 ÷ 960 = ₹300 per dispatch order; Elaichi: 140 × ₹300 = ₹42,000.

Q: Case scenario. At Tapri's premix plant the cost of the purchasing department (salaries, software) is first shared between "ordering spices" and "ordering packing material" by the number of buyers' hours spent on each. Each product is then charged ₹1,200 for every purchase order raised for it. Which statement is correct?
- [ ] Buyers' hours are the activity cost driver; purchase orders are the resource cost driver
- [x] Buyers' hours are the resource cost driver; purchase orders are the activity cost driver
- [ ] Both are activity cost drivers, because both are measured in numbers
- [ ] Both are resource cost drivers, because both relate to the purchasing department
> Buyers' hours measure the resources each activity consumes (stage one: resources to activities). Purchase orders measure the demand each product places on the activity (stage two: activities to cost objects).

Q: In a plant that tests the first piece of every production run, at which level of the cost hierarchy does that testing sit?
- [ ] Unit level
- [x] Batch level
- [ ] Product level
- [ ] Facility level
> Its cost varies with the number of runs (batches) and is common to all units in the run. Testing every item would be unit level.

Q: Which of the following are situations in which ICAI says ABC is particularly useful? Select all that apply.
- [x] Production overheads are high and form significant costs
- [x] Non-volume related activities such as set-ups and inspection are significant
- [ ] Overheads are small and the firm makes a single product
- [x] The firm faces stiff competition and must price accurately
> SM 5.3 lists high overhead, a wide range of products, non-volume related activities and stiff competition. A single product with small overheads is the case where ABC is not worth its cost.

Q: Under a labour-hour rate a product carries ₹4,50,000 of overhead; under ABC it carries ₹3,20,000. Total overhead is ₹10,00,000 under both. Which is correct?
- [ ] ABC has reduced total overhead by ₹1,30,000
- [x] The product was over-costed by ₹1,30,000, and other products were under-costed by the same total
- [ ] The product was under-costed by ₹1,30,000
- [ ] The difference is an under-absorption to be written off
> ABC only redistributes the same ₹10,00,000. The product was charged ₹1,30,000 more than the activities it used, so others carried ₹1,30,000 too little.
:::

## Recap

- ABC assigns overheads to activities, then to cost objects according to their use of activities (SM 5.3).
- Two stages: resources to activities by **resource cost drivers**; activities to cost objects by **activity cost drivers**.
- Activity: an event that incurs cost. Cost pool: costs with the same cause and effect relationship. Cost driver: a factor that causes a change in the cost of an activity.
- Activity cost driver rate = total cost of activity ÷ activity driver.
- Hierarchy: unit (varies with units), batch (with batches), product (supports each product), facility (sustains the plant).
- Useful when overheads are high, products many, non-volume activities significant, competition stiff.
- Same total overhead, spread differently: small-batch products often turn out under-costed by a labour-hour rate. (Split the dinner bill by the orders.)

## Flashcards

Q:: ABC: define a cost driver and name its two categories.
A:: A factor that causes a change in the cost of an activity. Resource cost driver (quantity of resources consumed by an activity) and activity cost driver (frequency and intensity of demand placed on activities by cost objects).

Q:: ABC: what is a resource cost driver used for, and what is an activity cost driver used for?
A:: A resource cost driver assigns the cost of a resource to an activity or cost pool; an activity cost driver assigns activity costs to cost objects.

Q:: ABC: what is a cost pool?
A:: A group of individual cost items that have the same cause and effect relationship, e.g. machine set-up.

Q:: Formula: activity cost driver rate?
A:: Total cost of activity ÷ activity driver (total quantity of the driver for the period).

Q:: The four levels of the cost hierarchy, in ICAI's order?
A:: Unit level, batch level, product level, facility level activities.

Q:: Batch-level activities: how does their cost behave?
A:: It varies with the number of batches made, but is common (fixed) for all units within the batch, e.g. machine set-up, material ordering per batch.

Q:: Two examples each of product-level and facility-level activities (SM)?
A:: Product level: designing the product, producing parts specifications, keeping technical drawings up to date. Facility level: maintenance of buildings, plant security.

Q:: The four situations in which ABC is particularly useful (SM 5.3)?
A:: High amount of overhead; wide range of products; presence of non-volume related activities; stiff competition.

Q:: The four factors that prompted the development of ABC?
A:: Growing overheads from automation; increasing competition; increasing product diversity; decreasing costs of information processing.

Q:: In which stage do ABC and traditional absorption costing differ?
A:: The first stage: ABC relates overheads to activities (cost pools) instead of functional departments (cost centres); both then charge cost objects.

Q:: Cost drivers for distribution and for customer service (SM)?
A:: Distribution: number of units distributed, number of customers. Customer service: number of service calls, number of products serviced, hours spent on servicing products.
