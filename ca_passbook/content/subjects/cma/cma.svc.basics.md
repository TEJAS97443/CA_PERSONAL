---
id: cma.svc.basics
title: Service costing and composite cost units
minutes: 25
needs: cma.intro.terms, cma.sheet.service
tags: service costing, operating costing, composite cost unit, absolute tonne-km, commercial tonne-km, equivalent service unit, KPI
labs:
summary: A service has no physical unit to count, so its cost unit often joins two measures (tonne-km, patient-day); absolute and commercial bases count them, and weights put different grades on one scale.
---

## In plain words

### A truck, three towns and one silly question

Tapri's refrigerated truck leaves the Indore depot at dawn with 12 tonnes of chai premix and frozen samosas. It drops 8 tonnes at Dewas, 40 km away, carries the other 4 tonnes 40 km on to Ujjain, and comes back 60 km to Indore with 2 tonnes of kulhads bought from Ujjain's potters (bulky, not heavy). The trip cost ₹22,800.

> **Kesar:** So what does one trip cost us? Done. ₹22,800.
> **Ritu:** Per unit, please. A trip with 12 tonnes for 40 km and a trip with 1 tonne for 300 km are both "one trip". So is a kilometre run empty.
> **Kesar:** Then count tonnes!
> **Ritu:** A tonne carried to Dewas and a tonne carried to Bhopal are not the same work either.

A service cannot be stacked in a godown and counted like samosa packs, so Ritu needs a **cost unit**: the unit of service in which cost is measured. For a goods truck the work done depends on two things at once, how much is carried and how far, so she joins them into one unit: the **tonne-km**, one tonne carried one kilometre. A unit made of two measures is a **composite cost unit**. A bus uses the **passenger-km**, a hospital the **patient-day**.

There are two ways to count the truck's tonne-km. The careful way takes each stretch of the trip on its own: 12 tonnes × 40 km, then 4 × 40, then 2 × 60, and adds them up: 760 tonne-km. That is the **absolute** basis. The quick way takes the average load over the three stretches, (12 + 4 + 2) ÷ 3 = 6 tonnes, and multiplies it by the whole distance, 140 km: 840 tonne-km. That is the **commercial** basis. Divide the ₹22,800 by either total and Kesar has a cost per tonne-km: ₹30 on the absolute basis, about ₹27.14 on the commercial basis.

One more problem: services come in grades. A sleeper berth and an ordinary seat on Tapri's overnight bus use the same driver, the same diesel and the same road, but nobody pays the same for both. So each grade gets a **weight** (a berth counts as more than one seat) and every grade is converted into one common unit, an **equivalent service unit**.

::: analogy The railway porter
A porter at Indore station charges by bags and by platforms walked. Three bags across two platforms is six "bag-platforms"; one bag across five platforms is five. Counting only bags, or only platforms, would cheat him or you. If he drops one bag at platform 2 and carries the rest on to platform 6, the honest count goes stretch by stretch (absolute); the quick count multiplies his average number of bags by the platforms walked (commercial). And the first-class trunk counts as two bags: that is a weight.
:::

::: key
When one measure cannot capture what a service does, the cost unit joins two (a composite unit: tonne-km, passenger-km, patient-day). Absolute basis: add up load × distance leg by leg. Commercial basis: average load × total distance. Different grades of a service are put on one scale by weights (equivalent service units).
:::

## How it works

**Service costing**, "also known as operating costing" (SM 12.2), collects all the costs of a period, records them and expresses them "in terms of a cost unit of service" (SM 12.2). It is used for in-house support services (a staff canteen, a boiler house, a vehicle fleet, the IT department) and for services sold to outside customers (transport, hotels, banks, insurers, IT companies). How it differs from product costing, and how its cost statement is laid out (standing, running and maintenance charges), is in [[cma.sheet.service|the service-sector cost sheet]].

### The hard part: what is one unit of service?

ICAI names the "specific issue" with service costing: "the difficulty in defining a realistic cost unit that represents a suitable measure of the service provided"; the unit must be defined carefully and "frequently, a composite cost unit may be deemed more appropriate", like a hotel's "Occupied Room Days" (SM 12.3). The Study Material's list (SM 12.3–12.4):

| Service industry | Unit of cost (examples) |
|---|---|
| Transport services | Passenger-km (public transport); quintal-km or tonne-km (goods carriage) |
| Electricity supply | Kilowatt-hour (kWh) |
| Hospital | Patient per day, room per day or per bed, per operation |
| Canteen | Per item, per meal |
| Cinema | Per ticket |
| Hotels | Guest days or room days |
| Bank or financial institutions | Per transaction, per service (per letter of credit, per application, per project) |
| Educational institutes | Per course, per student, per batch, per lecture |
| IT and ITES | Per project, per module |
| Insurance | Per policy, per claim, per TPA |

"The costing should be comprehensive enough to show the effects like off-season and peak-season demand, full time, part time, etc." (SM 12.4). One vehicle can also be costed per day maintained, per day operated, per hour and per km; each answers a different question (Worked example 2).

### Key performance indicators

**Key Performance Indicators (KPIs)** are "the quantitative and qualitative factors which are commonly used to assess the performance of an organization which are important to achieve its goal" (SM 12.4). A cost or revenue per KPI lets a service compare its performance against industry standards; ICAI's example is telecom's **Average Return per User (ARPU)**, the average revenue generated from a user of its services. The Study Material's list (SM 12.4–12.6):

| Industry | KPIs |
|---|---|
| Transportation | Number of shipments; truck turnaround rate; lead time (order cycle time); on-time and in-full (OTIF) |
| Hotel | Cost per occupied room (CPOR); occupancy rate; revenue per available room (RevPAR) |
| Hospitals and health care | Bed occupancy rate; staff-to-patient ratio; average treatment charge |
| IT and ITES | Gross burn rate; customer acquisition cost (CAC); customer lifetime value (CLV); monthly recurring revenue (MRR); churn rate; cost per feature |
| Telecom | ARPU; subscriber acquisition cost (SAC); network operating cost; gross revenue retention (GRR) |
| Education | Instructional costs; administrative costs per student; tuition costs; student-to-faculty ratio |
| Insurance | Average cost per claim; components of claim costs (CCC); cost per quote; administrative costs per policy; average policy size |

### Two methods for ascertaining a service cost unit

::: diagram Methods for ascertaining a service cost unit (SM 12.7–12.8)
{"type": "tree", "gapX": 26, "root": {"label": "Service\ncost unit", "children": [
  {"label": "Composite\ncost unit", "color": "a", "children": [
    {"label": "Absolute\n(weighted average)", "color": "a"},
    {"label": "Commercial\n(simple average)", "color": "e"}]},
  {"label": "Equivalent\ncost unit", "color": "d", "children": [
    {"label": "Weight each\ngrade, convert", "color": "d"}]}]},
 "caption": "A composite unit joins two measures and is counted on the absolute or the commercial basis; an equivalent unit puts different grades of one service on a common scale."}
:::

A **composite cost unit** combines two measurement units, "for example, a public transportation undertaking would measure the operating cost per passenger per kilometer" (SM 12.7). It may be computed in two ways, and in both, weight is given to a **qualitative** factor as well as to the **quantitative** one. In goods transport, distance is the quantitative factor (the variable cost depends on it); the weight carried does not affect the variable cost and is the qualitative factor (SM 12.7–12.8).

::: steps
1. **List the legs.** Every stretch between two stops, with its distance and the load actually on board (zero for an empty run).
2. **Absolute (weighted average) basis**: "a summation of the products of qualitative and quantitative factors" (SM 12.7). Multiply load × distance for each leg and add: Kesar's truck, 12 × 40 + 4 × 40 + 2 × 60 = 760 tonne-km.
3. **Commercial (simple average) basis**: "the product of average qualitative and total quantitative factors" (SM 12.7). Average the loads of the legs, then multiply by the total distance: (12 + 4 + 2) ÷ 3 × 140 = 6 × 140 = 840 tonne-km.
4. **Cost per unit** = total cost of the trip or period ÷ the units: ₹22,800 ÷ 760 = ₹30.00 per absolute tonne-km; ₹22,800 ÷ 840 = ₹27.14 per commercial tonne-km.
:::

::: diagram Kesar's truck: absolute and commercial tonne-km
{"type": "plot", "h": 300, "x": [0, 140], "y": [0, 14],
 "xlabel": "km run (Dewas 40, Ujjain 80, Indore 140)", "ylabel": "load on board (tonnes)",
 "xticks": [[0, "0"], [40, "40"], [80, "80"], [140, "140"]],
 "yticks": [0, 2, 4, 6, 8, 10, 12, 14], "legend": "top-right",
 "series": [
  {"label": "load on board", "pts": [[0, 12], [40, 12], [40, 4], [80, 4], [80, 2], [140, 2]], "color": "a"},
  {"label": "average load, 6 t", "pts": [[0, 6], [140, 6]], "color": "d", "dash": true}],
 "areas": [{"under": 0, "from": 0, "to": 140, "color": "a", "label": "760"}],
 "regions": [{"pts": [[0, 0], [140, 0], [140, 6], [0, 6]], "fill": false, "outline": true, "dash": true, "color": "d"}],
 "caption": "Absolute tonne-km are the blue shaded area under the load line: 480 + 160 + 120 = 760. Commercial tonne-km are the orange dashed rectangle, average load 6 t × 140 km = 840. They differ because the longest leg carried the lightest load."}
:::

The two bases agree when every leg is the same length or carries the same load; otherwise they usually differ. The absolute basis follows the work actually done; the commercial basis is quicker and treats a short leg and a long leg alike.

### Equivalent service units

When two or more grades of a service use common resources, each grade is assigned a weight and converted into equivalent units, which makes the grades equivalent and comparable (SM 12.8). ICAI's example is a hotel whose Deluxe suite is let at 2.5 times the Standard suite and its Luxurious suite at twice the Deluxe suite, all using the same amount of overheads (SM 12.8–12.10):

1. Find the units of each grade actually used: rooms × days (× occupancy).
2. Multiply by the weight, taking one grade as the base (weight 1): Deluxe 2.5, Luxurious 2.5 × 2 = 5.
3. Add up the equivalent units and divide the cost (or the takings needed) by them: that is the rate for the base grade; each other grade pays rate × weight.

Either the cheapest or the dearest grade may be the base. ICAI converts the same suites both ways, into 1,35,000 equivalent Standard room-days or 27,000 equivalent Luxurious room-days (SM 12.9–12.10); because the weights keep the same ratios, either base gives the same rents.

## Formats and formulas

*Reproduce the working-note layout from memory.* ICAI's suggested answers lay the absolute tonne-km out leg by leg (MTP Series I for May 2024 Q2(a)):

| Leg | Distance (km) | Load (tonnes) | Tonne-km |
|---|---:|---:|---:|
| A to B | d₁ | W₁ | d₁ × W₁ |
| B to C | d₂ | W₂ | d₂ × W₂ |
| C to A | d₃ | W₃ | d₃ × W₃ |
| **Total** | **Σd** | | **Absolute tonne-km** |

::: formula Absolute (weighted average) tonne-km
$$\text{Absolute} = (W_1 \times D_1) + (W_2 \times D_2) \qquad + \dots + (W_n \times D_n)$$
W = weight carried on a leg, D = the distance of that leg (SM 12.7).
:::

::: formula Commercial (simple average) tonne-km
$$\text{Commercial} = (D_1 + D_2 + \dots + D_n) \qquad \times \frac{W_1 + W_2 + \dots + W_n}{n}$$
n = the number of legs. Total distance × the simple average of the loads (SM 12.7).
:::

::: formula Cost per composite unit
$$\text{Cost per tonne-km} = \frac{\text{Total cost}}{\text{Total tonne-km}}$$
Total cost and total tonne-km of the same period. The same for passenger-km, patient-days or room-days.
:::

::: formula Equivalent service units
$$\text{Equivalent units} = \sum (\text{units} \times \text{weight}) \qquad \text{Grade rate} = \text{Base rate} \times \text{weight}$$
:::

::: definition Composite cost unit (SM 12.7)
Sometime two measurement units are combined together to know the cost of service or operation. These are called composite cost units. Examples are tonne-km, quintal-km, passenger-km, patient-day.
:::

::: definition Equivalent service unit (SM 12.57)
To calculate cost or pricing of two or more different grades of services which use common resources, each grade of service is assigned a weight and converted into equivalent units. Converting services into equivalent units makes different grades of services equivalent and comparable.
:::

::: definition Service costing (SM 12.57)
The application of cost concepts in the ascertainment of the cost of providing services. It is also known as operating costing, as it relates to the operating of a service.
:::

## Worked examples

:::: example Tapri's Pune milk-run: who pays for the truck?
Tapri's Pune depot runs a shared truck on a round trip that drops and picks up goods for five consignments:

| Consignment | Tonnes | Loaded at | Unloaded at |
|---|---:|---|---|
| A: premix for the Lonavala café | 6 | Pune | Lonavala |
| B: premix for the Panvel café | 8 | Pune | Panvel |
| C: frozen samosas for Bhiwandi | 4 | Pune | Bhiwandi |
| D: kulhads for the Bhiwandi godown | 5 | Lonavala | Bhiwandi |
| E: packaging material for Pune | 8 | Bhiwandi | Pune |

The distances are Pune to Lonavala 65 km, Lonavala to Panvel 45 km, Panvel to Bhiwandi 35 km and Bhiwandi to Pune 145 km. The round trip cost ₹51,150.

**Required:**

(i) Compute the absolute tonne-km and the commercial tonne-km of the trip.

(ii) Calculate the cost per tonne-km on each basis.

(iii) Charge each consignment its share of the trip's cost, and show why the absolute basis is the one to use for this.

::: answer Show the working
**(i) Working note: load on board, leg by leg**

| Leg | Distance (km) | Load on board (tonnes) | Tonne-km |
|---|---:|---:|---:|
| Pune to Lonavala | 65 | 6 + 8 + 4 = 18 | 1,170 |
| Lonavala to Panvel | 45 | 18 − 6 + 5 = 17 | 765 |
| Panvel to Bhiwandi | 35 | 17 − 8 = 9 | 315 |
| Bhiwandi to Pune | 145 | 8 | 1,160 |
| **Total** | **290** | | **3,410** |

Absolute tonne-km = **3,410**.

Commercial tonne-km = total distance × average load = 290 km × (18 + 17 + 9 + 8) ÷ 4 = 290 × 13 = **3,770**.

**(ii) Cost per tonne-km**

$$\text{Absolute} = \frac{51{,}150}{3{,}410} = \text{₹}15.00 \qquad \text{Commercial} = \frac{51{,}150}{3{,}770} = \text{₹}13.57$$

**(iii) Each consignment's share**

| Consignment | Tonnes × km carried | Tonne-km | Share at ₹15 (₹) |
|---|---|---:|---:|
| A | 6 × 65 | 390 | 5,850 |
| B | 8 × (65 + 45) | 880 | 13,200 |
| C | 4 × (65 + 45 + 35) | 580 | 8,700 |
| D | 5 × (45 + 35) | 400 | 6,000 |
| E | 8 × 145 | 1,160 | 17,400 |
| **Total** | | **3,410** | **51,150** |

The consignments' own tonne-km add up to the trip's absolute tonne-km (3,410), so charging each at the absolute rate of ₹15 recovers the whole ₹51,150. The commercial figure (3,770) is not the sum of anything the consignments carried: charging them ₹13.57 a tonne-km would recover only 3,410 × ₹13.57 = ₹46,266, ₹4,884 short. The commercial basis is a quick measure of the trip as a whole; the absolute basis follows each tonne for the distance it actually travelled.
:::
::::

:::: example The chiller van: one van, three meters
Tapri's refrigerated van supplies the Indore cafés and, when needed, stands at events as a cold store with its refrigeration running. For September (30 days):

| Particulars | Data |
|---|---|
| Km run | 3,900 |
| Hours the refrigeration unit ran | 520 |
| Driver's salary (monthly) | ₹22,000 |
| Insurance; road tax and permit; garage rent (for the month) | ₹2,500; ₹1,500; ₹5,000 |
| Interest on the vehicle loan (for the month) | ₹3,000 |
| Van | cost ₹14,40,000; residual value ₹2,40,000 after 5 years (time basis) |
| Diesel for driving | ₹96 a litre; 6 km a litre |
| Tyres and servicing | ₹2 a km |
| Refrigeration unit | burns 1.5 litres of diesel an hour; servicing ₹12 an hour |

Kesar has promised the van to the Indore food festival for 2 days: it will drive 40 km in all and run its refrigeration for 36 hours as a cold store at the venue.

**Required:**

(i) Prepare the van's cost statement for September, and find the standing charges per day maintained, the running charges per km and the refrigeration charges per hour.

(ii) Calculate the cost per km run if all the month's costs are spread over the km.

(iii) Price the festival job at a profit of 20% on the price using the three rates, and again using the single cost per km. Comment.

::: answer Show the working
**Working notes**

1. Depreciation (time basis, a standing charge) = (₹14,40,000 − ₹2,40,000) ÷ (5 × 12) = ₹20,000 a month.
2. Driving diesel = ₹96 ÷ 6 km = ₹16 a km; with tyres and servicing, ₹18 a km.
3. Refrigeration = 1.5 litres × ₹96 + ₹12 = ₹156 an hour.

**(i) Cost statement of the chiller van, September**

| Particulars | Amount (₹) | Rate |
|---|---:|---:|
| Driver's salary | 22,000 | |
| Insurance | 2,500 | |
| Road tax and permit | 1,500 | |
| Garage rent | 5,000 | |
| Depreciation (WN 1) | 20,000 | |
| Interest | 3,000 | |
| **A. Standing charges** | **54,000** | **₹1,800 a day maintained** |
| **B. Running charges, driving** (3,900 km × ₹18) | **70,200** | **₹18 a km** |
| **C. Refrigeration charges** (520 hours × ₹156) | **81,120** | **₹156 an hour** |
| **Total cost (A + B + C)** | **2,05,320** | |

Standing charges ÷ 30 days maintained = ₹1,800 a day.

**(ii) Single rate.** ₹2,05,320 ÷ 3,900 km = **₹52.65 a km**.

**(iii) The festival job**

| Particulars | Three rates (₹) | Single rate (₹) |
|---|---:|---:|
| Standing charges (2 days × ₹1,800) | 3,600 | |
| Driving (40 km × ₹18) | 720 | |
| Refrigeration (36 hours × ₹156) | 5,616 | |
| All costs at ₹52.65 a km (40 km) | | 2,106 |
| **Cost of the job** | **9,936** | **2,106** |
| Profit (20% on price = 25% on cost) | 2,484 | 526 |
| **Price** | **12,420** | **2,632** |

**Comment.** The single cost per km assumes every cost moves with distance. The festival job hardly moves the van but keeps it for two days and runs its refrigeration for 36 hours, so a per-km price would recover less than a quarter of its cost. A service with more than one cost driver needs a cost unit for each: here the day for standing charges, the km for driving and the refrigeration hour for the chiller.
:::
::::

::::: example Chai Yatra Sleeper: seats and berths on one bus
Tapri's overnight bus runs Indore to Mumbai and back, 600 km each way, one single trip a night in each direction, for 30 nights a month. Seats and berths share the same bus, driver, diesel and tolls.

| Class | Number | Average occupancy | Fare relative to a seat |
|---|---:|---:|---|
| Seater | 20 | 70% | 1 |
| Lower sleeper berth | 15 | 90% | 1.6 times |
| Upper sleeper berth | 15 | 80% | 1.4 times |

The monthly operating cost is ₹21,22,200, and Tapri wants a profit of 25% on takings.

**Required:**

(i) Calculate the fare per passenger-km and the fare for the full 600 km in each class, taking the seat as the base.

(ii) Check the fares with the lower berth as the base.

:::: answer Show the working
**Working note: equivalent seater passenger-km** (60 single trips × 600 km)

| Class | Passenger-km | Weight | Equivalent seater passenger-km |
|---|---:|---:|---:|
| Seater | 20 × 70% × 60 × 600 = 5,04,000 | 1 | 5,04,000 |
| Lower berth | 15 × 90% × 60 × 600 = 4,86,000 | 1.6 | 7,77,600 |
| Upper berth | 15 × 80% × 60 × 600 = 4,32,000 | 1.4 | 6,04,800 |
| **Total** | | | **18,86,400** |

::: diagram Equivalent seater passenger-km by class
{"type": "plot", "h": 240, "x": [0.4, 3.6], "y": [0, 900000],
 "xticks": [[1, "Seater"], [2, "Lower berth"], [3, "Upper berth"]],
 "yticks": [[0, "0"], [300000, "3,00,000"], [600000, "6,00,000"], [900000, "9,00,000"]], "ylabel": "equivalent passenger-km", "legend": "none",
 "series": [{"label": "equivalent seater passenger-km", "bars": true, "values": true, "color": "a", "pts": [[1, 504000, "5,04,000"], [2, 777600, "7,77,600"], [3, 604800, "6,04,800"]]}],
 "caption": "Lower berths carry fewer passenger-km than seats (4,86,000 against 5,04,000) but count 1.6 times each, so they carry the largest share of the 18,86,400 equivalent units."}
:::

Takings = ₹21,22,200 ÷ (1 − 0.25) = **₹28,29,600**.

**(i)** Fare per seater passenger-km = ₹28,29,600 ÷ 18,86,400 = **₹1.50**; lower berth ₹1.50 × 1.6 = **₹2.40**; upper berth ₹1.50 × 1.4 = **₹2.10** a passenger-km. For the full 600 km: seat **₹900**, lower berth **₹1,440**, upper berth **₹1,260**.

**(ii) Check with the lower berth as the base:** equivalent lower-berth passenger-km = 5,04,000 ÷ 1.6 + 4,86,000 × 1 + 4,32,000 × 1.4 ÷ 1.6 = 3,15,000 + 4,86,000 + 3,78,000 = 11,79,000; lower-berth fare = ₹28,29,600 ÷ 11,79,000 = ₹2.40 a passenger-km, and the others follow at ₹1.50 and ₹2.10. Takings check: 5,04,000 × ₹1.50 + 4,86,000 × ₹2.40 + 4,32,000 × ₹2.10 = ₹7,56,000 + ₹11,66,400 + ₹9,07,200 = ₹28,29,600.
::::
:::::

## Under the hood

### The empty leg and the average

ICAI's formula averages the loads of all n legs, so an empty run is a leg with W = 0: the suggested answer to MTP Series II for September 2024 Q1(b) takes (4 tonnes + 0 tonnes) ÷ 2 × 2,500 km. In SM Illustration 5 (12.21–12.22), though, the count of journeys behind the average leaves out an empty return leg. State your treatment in a working note; the absolute basis is not affected, because an empty leg adds zero tonne-km either way.

### Actual load, not capacity

Both bases use the load actually carried, even when it attracts a fine for overloading (SM 12.22). A contract that pays a minimum load (say 75% of capacity) changes the *chargeable* tonne-km, not the tonne-km carried; that case is in [[cma.svc.transport|transport costing]].

### Next door

Building passenger-km for buses, fares on takings and goods-transport accounts: [[cma.svc.transport|transport costing]]. Room-days, patient-days, kWh, toll rates and costing in insurance and banks: [[cma.svc.others|hotels, hospitals, power, IT and other services]]. Cost units in general: [[cma.intro.terms|cost units, cost centres and cost objects]].

## Exam angle

::: exam Where these ideas appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, this lesson's ideas came up in 9 documents:

- **Absolute and commercial tonne-km, MCQ or 4 marks**: a lorry dropping part of its load at a middle station (May 2025 MCQ 13; MTP Series I for May 2026 Q1(c), 4 marks). Both follow SM Illustration 1.
- **One vehicle, several cost units, 5 marks**: cost per day maintained, day operated, hour, km and commercial tonne-km (MTP Series II for September 2024 Q1(b)).
- **Theory, 5 marks**: "Explain the methods for ascertaining service cost unit" (MTP Series I for January 2025 Q6(b)); the suggested answer reproduces SM 12.7–12.8: the composite unit, both bases with their formulas, the cinema seats, and the definition of the equivalent unit.
- **Cost units table, 4 to 5 marks**: "State cost unit of the following industry sector" for ten industries (January 2025 Q6(b), 5 marks); the same for eight industries (MTP Series I for January 2026 Q6(c), 4 marks, an OR option); the January 2025 list again (MTP Series II for May 2026 Q6(a), 5 marks); "Describe cost unit and give examples" (RTP September 2025 Q18(d)).
- **Theory on operating costs**: RTP May 2025 Q20(b), where the features include "the cost unit used is composite like passenger-mile; kilowatt-hour".
:::

::: exam The traps ICAI set
- The middle station: the load falls after the first drop, so each leg has its own load (May 2025 MCQ 13: 15 tonnes, then 10, then 8 on the return).
- Rounding the average: MTP Series I for May 2026 Q1(c) writes 22.667 MT × 750 km = 17,000 MT-km "(approx.)"; keep the fraction, (30 + 18 + 20) ÷ 3 = 68/3, and 68/3 × 750 is exactly 17,000.
- Answer options that swap the two figures: one option gives absolute and commercial the wrong way round (May 2025 MCQ 13, options (B) and (C)).
:::

::: trick Which basis is bigger?
Absolute − commercial = Σ(dᵢ − d̄)(wᵢ − w̄), where d̄ and w̄ are the average distance and the average load of the legs. So when the longer legs carry the lighter loads (the sum is negative), commercial > absolute; when the longer legs carry the heavier loads (the sum is positive), absolute > commercial; when all legs are equal in length or in load, the sum is zero and the two are equal. Use it to check an answer option in seconds. Condition: both bases computed on the same legs, the commercial average being the simple average of the legs' loads.
:::

## Answer frame

### "Explain the methods for ascertaining service cost unit" (5 marks)

ICAI's answer (MTP Series I for January 2025 Q6(b)) follows the Study Material in this order:

1. **Composite cost unit**: two measurement units combined to know the cost of a service or operation; examples tonne-km, quintal-km, passenger-km, patient-day.
2. It may be computed in two ways: absolute (weighted average) basis and commercial (simple average) basis; in both, weightage is given to qualitative factors as well as quantitative factors.
3. **Absolute basis**: the summation of the products of qualitative and quantitative factors, Σ(weight carried × distance) for each leg; cinema seat classes are weighted the same way.
4. **Commercial basis**: the product of the average qualitative factor and the total quantitative factor, total distance × (W₁ + W₂ + … + Wₙ) ÷ n.
5. Distance is the quantitative factor (the variable cost depends on it); weight carried is the qualitative factor.
6. **Equivalent cost unit / equivalent service unit**: to calculate the cost or price of two or more grades of a service using common resources, each grade is assigned a weight and converted into equivalent units, which makes the grades equivalent and comparable. (A two-line example, such as the hotel suites, may be added.)

### "State the cost unit of …"

Write a two-column table, industry and cost unit, in the order the question lists them, using the Study Material's units (ICAI's January 2025 suggested answer copies them, "patient per day, room per day or per bed, per operation etc." for hospitals): transport, passenger-km and tonne-km; electricity, kWh; hospital, patient per day, room per day or per bed, per operation; hotel, guest days or room days; canteen, per meal; education, per student or per course; bank, per transaction or application; IT, per project or module; insurance, per policy or claim. Units for manufacturing industries (brick-making, brewing, coal) come from [[cma.intro.terms|the cost units lesson]].

## Common mistakes

::: mistake Hall of Shame: the distance-weighted "commercial" average
Bunty averages the milk-run's loads by distance: 3,410 tonne-km ÷ 290 km = 11.76 t, then 11.76 × 290 = 3,410, and proudly finds commercial = absolute. A distance-weighted average always gives back the absolute figure. **Fix:** the commercial basis uses the simple average of the legs' loads, (18 + 17 + 9 + 8) ÷ 4 = 13 t, so 3,770 tonne-km.
:::

::: mistake The load that never fell
Using the starting load for the whole trip: 12 t × 80 km for Kesar's truck to Ujjain, although 8 t came off at Dewas. **Fix:** list the legs and the load on board after each stop.
:::

::: mistake Equivalent units built on capacity
Weighting every seat and berth on the sleeper bus (20 + 15 × 1.6 + 15 × 1.4 = 65 a trip) when occupancy differs by class (the occupied figure is 52.4). **Fix:** weight the units actually sold or occupied: seats × occupancy × trips × km, then × weight.
:::

::: mistake "Per bed" when the question asks for a composite unit
The Study Material's own MCQ asks for the *composite* cost unit of a hospital and offers per patient, per patient-day, per day and per bed. Per bed, per patient and per day are single measures: valid cost units in a "state the cost unit" table, wrong here. **Fix:** a composite unit joins two measures: patient-day (and for a hotel, room-day or guest-day).
:::

## Practice

::: quiz Check yourself
Q: A van starts with 9 tonnes, drops 3 tonnes after 30 km, carries the rest another 50 km, and returns empty over 80 km. What are its absolute tonne-km?
= 570
> 9 × 30 + 6 × 50 + 0 × 80 = 270 + 300 + 0 = 570 tonne-km.

Q: Case scenario. A Tapri truck leaves Bhopal empty to collect kulhad clay. It loads 6 tonnes at Vidisha (60 km), adds 4 tonnes at Sagar (120 km further) and returns full 180 km to Bhopal. Ritu asks her intern for the commercial tonne-km, counting every leg as ICAI's formula does. Which figure is correct?
- [x] 1,920 tonne-km
- [ ] 2,520 tonne-km
- [ ] 2,880 tonne-km
- [ ] 1,440 tonne-km
> Loads on the three legs are 0, 6 and 10 tonnes; average (0 + 6 + 10) ÷ 3 = 5.33 t × 360 km = 1,920. 2,520 is the absolute figure (0 + 720 + 1,800); 2,880 leaves the empty leg out of the average (8 t × 360); 1,440 divides the loads by 4 instead of 3 legs.

Q: Which of the following is a composite cost unit?
- [ ] Per meal served in a canteen
- [ ] Per ticket sold by a cinema
- [x] Per passenger-km run by a bus operator
- [ ] Per loan application processed by a bank
> A composite unit combines two measurement units: passengers and kilometres. The other three are single units, though all are valid service cost units (SM 12.3–12.4).

Q: A guest house has Standard and Suite rooms; a Suite is let at 2.5 times a Standard room. In a year 5,400 Standard room-days and 1,200 Suite room-days are let, and the takings needed are ₹50,40,000. What is the rent of a Suite per room-day, in rupees?
= 1500
> Equivalent Standard room-days = 5,400 + 1,200 × 2.5 = 8,400. Standard rent = ₹50,40,000 ÷ 8,400 = ₹600; Suite = ₹600 × 2.5 = ₹1,500.

Q: Which statements about absolute and commercial tonne-km are correct? Select all that apply.
- [x] The absolute basis adds weight carried × distance for each leg
- [x] The commercial basis multiplies the total distance by the simple average of the loads
- [ ] The two bases always give the same figure on a round trip
- [x] In both bases, distance is the quantitative factor on which the variable cost depends
> They agree when the legs are equal in length or in load, and usually differ otherwise (5,600 against 5,760 in SM Illustration 1). The Study Material calls distance the quantitative factor and weight carried the qualitative factor (SM 12.7–12.8).
:::

## Recap

- Service costing = operating costing: costs of a period expressed per cost unit of service.
- The specific issue is defining a realistic cost unit; often a composite unit is more appropriate (hotel: occupied room-days).
- Composite cost unit: two measurement units combined (tonne-km, quintal-km, passenger-km, patient-day).
- Absolute (weighted average): Σ(weight × distance), leg by leg.
- Commercial (simple average): total distance × (W₁ + … + Wₙ) ÷ n.
- Equivalent service units: weight each grade, convert to a base, divide, then base rate × weight; any grade can be the base.
- KPIs assess performance: CPOR, occupancy and RevPAR for hotels; OTIF and truck turnaround for transport; ARPU for telecom.
- Count what was carried, stretch by stretch. (The porter knows.)

## Flashcards

Q:: What is a composite cost unit? Give four examples.
A:: Two measurement units combined to know the cost of a service or operation: tonne-km, quintal-km, passenger-km, patient-day.

Q:: In how many ways may a composite unit be computed? Name them.
A:: Two: the absolute (weighted average) basis and the commercial (simple average) basis.

Q:: Formula: absolute tonne-km?
A:: (W₁ × D₁) + (W₂ × D₂) + … + (Wₙ × Dₙ): weight carried × distance for each leg, added up.

Q:: Formula: commercial tonne-km?
A:: (D₁ + D₂ + … + Dₙ) × (W₁ + W₂ + … + Wₙ) ÷ n: total distance × the simple average load.

Q:: In goods transport, which factor is quantitative and which qualitative?
A:: Distance is quantitative (the variable cost depends on it); weight carried is qualitative.

Q:: What is an equivalent service unit?
A:: Different grades of a service using common resources are each given a weight and converted into equivalent units, making them equivalent and comparable.

Q:: Cost units: hospital, hotel, electricity, insurance, IT?
A:: Hospital: patient per day, room per day, per bed, per operation. Hotel: guest days or room days. Electricity: kWh. Insurance: per policy, per claim, per TPA. IT and ITES: per project, per module.

Q:: What is a Key Performance Indicator?
A:: The quantitative and qualitative factors commonly used to assess the performance of an organisation, which are important to achieve its goal.

Q:: Three hotel KPIs in the Study Material?
A:: Cost per occupied room (CPOR), occupancy rate, revenue per available room (RevPAR).

Q:: Service costing is also known as?
A:: Operating costing.
