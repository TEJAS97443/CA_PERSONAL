---
id: cma.svc.transport
title: Transport costing: passenger-km and tonne-km
minutes: 32
needs: cma.svc.basics, cma.sheet.service
tags: transport costing, passenger-km, tonne-km, operating cost sheet, bus fare, standing charges, running charges, takings
labs:
summary: Costing a bus or a truck: kilometres run, passenger-km or tonne-km, the operating cost sheet in standing, running and maintenance charges, and a fare built on takings.
---

## In plain words

### The Chai Yatra trial month

Kesar has a new idea for the pilgrims who travel from Indore to the Mahakal temple at Ujjain, 55 km away: a bus with hot chai served at every seat. The trial bus has 40 seats and makes 4 round trips a day for 25 days.

> **Kesar:** The bus cost us ₹2,97,000 this month. Ritu, what do I charge a ticket?
> **Ritu:** Per unit, please. And for a bus the unit is one passenger carried one kilometre.
> **Kesar:** Why not per seat?
> **Ritu:** An empty seat earns nothing, Kesar-ji. It still burns diesel.

Ritu counts the work in three steps. **Kilometres run**: 55 km × 2 (there and back) × 4 round trips × 25 days = 11,000 km. **Passenger-km**: on average 30 of the 40 seats were filled, so the bus carried 30 passengers over every one of those kilometres: 11,000 × 30 = 3,30,000 passenger-km. **Cost per passenger-km**: ₹2,97,000 ÷ 3,30,000 = 90 paise. A pilgrim travelling 55 km costs Tapri 55 × ₹0.90 = ₹49.50.

That is only the cost. The ticket must also cover anything charged as a share of the ticket money (the conductor's commission, a passenger tax) and Kesar's profit, so Ritu works out the total ticket money needed, the **takings**, and divides it by the passenger-km too.

The cost is grouped the way the bus behaves. Insurance, the road tax, the garage rent and the monthly salaries are paid whether or not the bus moves: **standing charges**. Diesel and oil rise with every kilometre: **running charges**. Repairs, tyres and spares wear out with use but never fall to zero: **maintenance charges**. A truck is costed the same way, with the **tonne-km** (one tonne carried one kilometre) in place of the passenger-km.

::: analogy The shared auto at the bus stand
A shared auto-rickshaw driver knows his day's cost: CNG, his EMI, the permit. He does not divide it by the seats in his auto but by the passengers he actually carries and how far he takes them. A full auto on a long route makes every rupee of cost cheap per passenger; a half-empty one makes it dear, though the CNG bill is the same.
:::

::: key
Cost per passenger-km (or tonne-km) = total operating cost of the period ÷ passenger-km (or tonne-km) of the same period, where passenger-km = kilometres run × passengers actually carried. The fare is built on takings: cost plus everything charged as a percentage of takings, divided by the passenger-km, then × the length of the journey.
:::

## How it works

Transport organisations are of two kinds, goods transport and passenger transport (SM 12.11). Their cost units are composite, built in [[cma.svc.basics|service costing and composite cost units]]:

::: definition Tonne-km and passenger-km (SM 12.11)
The cost unit for a goods transport organisation is the tonne-kilometre: the cost of carrying one tonne of goods over a distance of one kilometre. The cost unit for a passenger transport organisation is the passenger-kilometre: the cost of carrying one passenger over a distance of one kilometre.
:::

### The three heads of a transport cost sheet

ICAI's "suggestive" heads and items, in ICAI's order (SM 12.12):

| Head | Items |
|---|---|
| **Standing charges or fixed costs**: constant irrespective of the distance travelled | Insurance; licence fees; salary to driver, conductor, cleaners, etc. if paid on a monthly basis; garage costs, including garage rent; depreciation (if related to efflux of time); taxes; administration expenses |
| **Variable costs or running costs**: generally associated with the distance travelled | Petrol and diesel; lubricant oils; wages to driver, conductor, cleaners, etc. if related to operations; depreciation (if related to activity); any other variable costs identified |
| **Semi-variable costs or maintenance costs** | Repairs and maintenance; tyres; spares |

"The heads for a cost may change as per the situation or condition": a driver's salary is a standing charge or a running cost "depending on the situation and nature of his employment" (SM 12.12). Interest is a separate item of cost and fixed unless otherwise given (SM 12.10).

### From a timetable to a fare

::: diagram From a timetable to a fare
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Route and timetable"},
  {"id": "k", "kind": "process", "label": "Km run\nroute × 2 × trips × days"},
  {"id": "p", "kind": "process", "label": "Passenger-km\nkm × seats × occupancy"},
  {"id": "c", "kind": "process", "label": "Operating cost\nA + B + C"},
  {"id": "t", "kind": "process", "label": "Takings\ncost ÷ (1 − c − p)"},
  {"id": "r", "kind": "process", "label": "Rate per passenger-km\ntakings ÷ passenger-km"},
  {"id": "f", "kind": "end", "label": "Fare\nrate × journey km", "color": "g"}],
 "edges": [["s", "k"], ["k", "p"], ["p", "c"], ["c", "t"], ["t", "r"], ["r", "f"]],
 "caption": "Trips are round trips, for every vehicle; A, B and C are the standing, running and maintenance charges; c and p are the commission (or passenger tax) and the profit as fractions of takings. For a truck, read tonne-km for passenger-km."}
:::

::: steps
1. **Kilometres run** in the period. A round trip covers the route twice. ICAI's working note for buses: number of buses × distance × number of days × number of trips, with "6 single trips (3 round trips)" written out (SM 12.15).
2. **Passenger-km** = kilometres run × passengers actually carried per trip (seats × occupancy). ICAI's version in one line: buses × distance × seating capacity × used capacity × days × trips (SM 12.13).
3. **Operating cost** for the same period under the three heads. Convert every item to that period first: insurance at 3% of the bus's cost, a monthly garage rent × 12, repairs per annum.
4. **Takings.** Commission, passenger tax and profit stated as a percentage of takings are solved, not added: Takings = cost + c × Takings + p × Takings (SM Illustration 3, 12.16).
5. **Rate per passenger-km** = takings ÷ passenger-km; **fare** for a journey = rate × its kilometres. Round as the question says (ICAI's September 2026 paper asked for the next higher rupee).
:::

### Why empty seats are expensive

Once the timetable is fixed, the bus runs the same kilometres and spends the same money whether it is full or half-empty; only the passenger-km change.

::: diagram Chai Yatra trial bus: cost per passenger-km against occupancy
{"type": "plot", "h": 300, "x": [30, 100], "y": [0.5, 2.4], "clip": true,
 "xlabel": "seats occupied (%)", "ylabel": "cost per passenger-km (₹)", "legend": "none",
 "xticks": [30, 40, 50, 60, 70, 80, 90, 100],
 "yticks": [[0.5, "0.50"], [0.9, "0.90"], [1.35, "1.35"], [1.8, "1.80"], [2.25, "2.25"]],
 "series": [{"label": "cost per passenger-km", "fn": "67.5/x", "color": "a"},
  {"pts": [[75, 0.5], [75, 0.9]], "color": "mute", "dash": true, "legend": false}],
 "points": [{"x": 75, "y": 0.9, "label": "75% full: 90 paise", "pos": "right"}, {"x": 50, "y": 1.35, "label": "half full: ₹1.35", "pos": "right"}],
 "caption": "₹2,97,000 spread over 11,000 km × 40 seats × occupancy. Halving the passengers doubles the cost of each passenger-km; the cost of the bus does not move."}
:::

### Goods transport

A truck is costed under the same three heads, per tonne-km. When it drops part of its load on the way, count the tonne-km leg by leg on the **absolute** basis or as total distance × average load on the **commercial** basis ([[cma.svc.basics|both bases]]). Two rules from ICAI's lorry illustration (SM 12.22):

- The **actual load carried** is used for tonne-km, even when it attracts a fine for overloading.
- The **penalty for overloading** is abnormal: it is not an operating cost of the lorry but is debited to the Costing Profit and Loss Account, so it comes off the operating profit to give the net profit or loss.

## Formats and formulas

*Reproduce this statement from memory.* It follows SM Illustrations 2 and 3 (12.14–12.16) and the January 2025 suggested answer; add a "per month" column when the question mixes periods.

| Operating cost statement for … (period) | Total (₹) | Per passenger-km (₹) |
|---|---:|---:|
| **A. Standing charges** | | |
| Insurance, taxes, licence, garage rent | xxx | |
| Salaries paid monthly | xxx | |
| Depreciation (time basis) | xxx | |
| Interest, administration, stationery | xxx | |
| **Total standing charges** | **xxx** | **x.xxxx** |
| **B. Running charges** | | |
| Petrol or diesel, lubricants | xxx | |
| Wages per trip; depreciation (usage basis) | xxx | |
| **Total running charges** | **xxx** | **x.xxxx** |
| **C. Maintenance charges** | | |
| Repairs, tyres, spares | xxx | x.xxxx |
| **Total cost (A + B + C)** | **xxx** | **x.xxxx** |
| Add: Commission, passenger tax (on takings) | xxx | x.xxxx |
| Add: Profit (on takings) | xxx | x.xxxx |
| **Takings** | **xxx** | **x.xxxx** |

ICAI shows commission inside running charges in SM Illustration 3, and on a line after "total cost before commission" in the January 2025 suggested answer; either way its amount is solved from takings.

::: formula Kilometres run and passenger-km
$$\text{Km run} = \text{Vehicles} \times \text{Route km} \times 2 \qquad \times \text{Round trips a day} \times \text{Days}$$

$$\text{Passenger-km} = \text{Km run} \qquad \times \text{Seats} \times \text{Occupancy}$$
:::

::: formula Fuel cost
$$\text{Diesel cost} = \frac{\text{Km run}}{\text{Km per litre}} \qquad \times \text{Price per litre}$$
:::

::: formula Takings when charges and profit are on takings
$$T = \text{Cost} + cT + pT \qquad T = \frac{\text{Cost}}{1 - c - p}$$
c = commission or passenger tax, p = profit, each as a fraction of takings (SM 12.16).
:::

::: formula Rate per passenger-km and fare
$$\text{Rate} = \frac{\text{Takings}}{\text{Passenger-km}} \qquad \text{Fare} = \text{Rate} \times \text{Journey km}$$
Rate = rate per passenger-km; for goods, rate per tonne-km = takings ÷ tonne-km.
:::

## Worked examples

:::: example Chai Yatra: a pilgrim bus with a stop at Dewas
After the trial, Tapri runs 2 buses on the Indore–Dewas–Ujjain route: Indore to Dewas 35 km, Dewas to Ujjain 45 km. Each bus has 50 seats and makes 2 round trips a day, 30 days a month. The conductors' counts give the average passengers on board on each stage:

| Stage | Distance (km) | Passengers on board |
|---|---:|---:|
| Indore to Dewas | 35 | 40 |
| Dewas to Ujjain | 45 | 25 |
| Ujjain to Dewas | 45 | 28 |
| Dewas to Indore | 35 | 44 |

Monthly costs:

| Particulars | Data |
|---|---|
| Each bus | cost ₹36,00,000; residual value ₹6,00,000 after 10 years; straight line, time basis |
| Insurance and road tax | ₹12,000 a month per bus |
| Garage rent | ₹20,000 a month for both buses |
| Driver and conductor | ₹25,000 and ₹18,000 a month per bus |
| Supervisor | ₹30,000 a month |
| Diesel | ₹96 a litre; 4 km a litre |
| Lubricants | ₹2 a km |
| Repairs, tyres and spares | ₹3 a km |

The crews get a commission of 5% of takings, and Tapri wants a profit of 20% of takings. Fares are charged per passenger-km of the stage travelled.

**Required:**

(i) Calculate the kilometres run and the passenger-km for the month.

(ii) Prepare an operating cost statement for the month, in total and per passenger-km.

(iii) Calculate the rate per passenger-km and the fares from Indore to Dewas, from Dewas to Ujjain and from Indore to Ujjain.

::: answer Show the working
**Working notes**

1. Round trips = 2 buses × 2 × 30 days = 120; each covers 35 + 45 + 45 + 35 = 160 km. **Km run = 120 × 160 = 19,200 km.**
2. Passenger-km per round trip, stage by stage = 35 × 40 + 45 × 25 + 45 × 28 + 35 × 44 = 1,400 + 1,125 + 1,260 + 1,540 = 5,325. **Passenger-km = 120 × 5,325 = 6,39,000.**
3. Depreciation per bus = (₹36,00,000 − ₹6,00,000) ÷ 10 ÷ 12 = ₹25,000 a month (time basis: a standing charge).
4. Diesel = 19,200 ÷ 4 = 4,800 litres × ₹96 = ₹4,60,800.

**Operating cost statement of Chai Yatra for the month** (6,39,000 passenger-km)

| Particulars | Total (₹) | Per passenger-km (₹) |
|---|---:|---:|
| Depreciation (2 × ₹25,000) | 50,000 | |
| Insurance and road tax (2 × ₹12,000) | 24,000 | |
| Garage rent | 20,000 | |
| Crew salaries (2 × ₹43,000) | 86,000 | |
| Supervisor | 30,000 | |
| **A. Standing charges** | **2,10,000** | **0.3286** |
| Diesel (WN 4) | 4,60,800 | |
| Lubricants (19,200 × ₹2) | 38,400 | |
| **B. Running charges** | **4,99,200** | **0.7812** |
| **C. Maintenance** (19,200 × ₹3) | **57,600** | **0.0901** |
| **Total cost (A + B + C)** | **7,66,800** | **1.2000** |
| Commission (5% of takings) | 51,120 | 0.0800 |
| Profit (20% of takings) | 2,04,480 | 0.3200 |
| **Takings** | **10,22,400** | **1.6000** |

Per passenger-km figures are rounded to four decimals. **Working note 5: takings.** T = ₹7,66,800 + 0.05T + 0.20T, so 0.75T = ₹7,66,800 and T = ₹10,22,400.

**(iii) Fares**

$$\text{Rate} = \frac{10{,}22{,}400}{6{,}39{,}000} = \text{₹}1.60 \text{ per passenger-km}$$

Indore to Dewas (35 km) **₹56**; Dewas to Ujjain (45 km) **₹72**; Indore to Ujjain (80 km) **₹128**.

The load changes at Dewas, so the passenger-km are counted stage by stage, as tonne-km are on the absolute basis. Taking the average load of the four stages (34.25) over all 19,200 km would give 6,57,600 passenger-km and a rate of ₹1.5547: the long Dewas–Ujjain stages carry the fewest passengers, so the shortcut overstates the work done and the fares would fall short of the takings needed.
:::
::::

:::: example Tapri Cold Chain: the empty way home
Tapri Cold Chain Pvt Ltd, Tapri's cold-chain subsidiary, runs a 10-tonne refrigerated truck between Indore and Bhopal (190 km). In May it made 12 round trips. Every outward trip carried 9 tonnes of premix and frozen snacks; on 4 return trips it brought back 6 tonnes of a Bhopal dairy's butter, and on the other 8 it came back empty.

| Costs for May | Amount |
|---|---|
| Standing charges (driver's salary, insurance, permits, depreciation on time basis, interest) | ₹72,000 |
| Maintenance | ₹20,000 + ₹1 a km |
| Diesel | ₹95 a litre; 4 km a litre |
| Fuel of the refrigeration unit (run only when loaded) | ₹6 a loaded km |

**Required:**

(i) Calculate the absolute and the commercial tonne-km for May, and explain why they agree.

(ii) Prepare the cost statement for May and find the cost per tonne-km.

(iii) Calculate the freight per tonne-km that would give a profit of 20% on the freight.

(iv) The dairy offers 6 tonnes of butter on each of the 8 empty return trips at ₹3 a tonne-km. Loading does not change the truck's diesel use. Should the offer be accepted, though ₹3 is below the cost per tonne-km?

::: answer Show the working
**(i) Tonne-km**

| Journey | Working | Tonne-km |
|---|---|---:|
| Indore to Bhopal | 12 × 190 km × 9 t | 20,520 |
| Bhopal to Indore, loaded | 4 × 190 km × 6 t | 4,560 |
| Bhopal to Indore, empty | 8 × 190 km × 0 t | 0 |
| **Absolute tonne-km** | | **25,080** |

Commercial tonne-km = total distance × average load = (12 × 2 × 190 = 4,560 km) × (12 × 9 + 4 × 6 + 8 × 0) ÷ 24 journeys = 4,560 × 5.5 t = **25,080**. They agree because every journey is the same length (190 km): the two bases differ only when long and short legs carry different loads. The empty journeys stay in the average with a load of zero.

**(ii) Cost statement for May**

| Particulars | Amount (₹) |
|---|---:|
| A. Standing charges | 72,000 |
| B. Maintenance (₹20,000 + 4,560 km × ₹1) | 24,560 |
| Diesel (4,560 km ÷ 4 × ₹95) | 1,08,300 |
| Refrigeration fuel ((12 + 4) × 190 = 3,040 loaded km × ₹6) | 18,240 |
| C. Running charges | 1,26,540 |
| **Total cost** | **2,23,100** |

Cost per tonne-km = ₹2,23,100 ÷ 25,080 = **₹8.90**.

**(iii) Freight.** Profit 20% on freight: ₹8.8955 ÷ 0.80 = **₹11.12 a tonne-km**.

**(iv) The backhaul offer**

| Per backhaul trip | Amount (₹) |
|---|---:|
| Freight (6 t × 190 km × ₹3) | 3,420 |
| Extra cost: refrigeration fuel (190 km × ₹6) | 1,140 |
| **Gain** | **2,280** |

Accept: the 8 trips add ₹18,240 to May's profit. The standing charges, the diesel and the maintenance are incurred whether the truck comes back full or empty, so only the refrigeration fuel is extra. With the backhaul the month carries 34,200 tonne-km for ₹2,32,220, and the cost per tonne-km falls to ₹6.79. The full cost per tonne-km is the right base for the regular freight rate, not for pricing a load the truck can carry at almost no extra cost.
:::
::::

:::: example Own, lease or outsource: deliveries to the cafés
Tapri delivers premix and snacks to its 40 Indore cafés: 2,400 drops a month over 3,600 km. Dev compares three ways of doing it:

(i) Own a van: cost ₹12,00,000, residual value ₹3,00,000 after 5 years (time basis); insurance and road tax ₹3,000 a month; driver ₹22,000 and helper ₹14,000 a month; diesel ₹96 a litre at 8 km a litre; repairs, tyres and servicing ₹3 a km.

(ii) Lease a van with its driver: ₹60,000 a month including 3,000 km, and ₹8 for every km above that; Tapri pays the diesel and its own helper.

(iii) Use a logistics partner at ₹42 a drop plus a fuel surcharge of 5%.

**Required:**

(i) Work out the cost a month and per drop of each option at the present level, and rank them.

(ii) From next year Kesar expects 3,000 drops a month over 4,500 km. Re-rank the options, and find the drops a month at which owning and outsourcing cost the same (km per drop unchanged).

::: answer Show the working
**Working notes**

1. Own van, fixed a month: depreciation (₹12,00,000 − ₹3,00,000) ÷ 60 = ₹15,000; insurance and road tax ₹3,000; driver ₹22,000; helper ₹14,000: **₹54,000**. Variable: diesel ₹96 ÷ 8 = ₹12 a km + repairs ₹3 = **₹15 a km**.
2. Lease: excess km at 3,600 km = 600 × ₹8 = ₹4,800; diesel ₹12 a km.
3. Partner: ₹42 × 105% = **₹44.10 a drop**.

**(i) Present level: 2,400 drops, 3,600 km**

| Particulars (₹) | (i) Own | (ii) Lease | (iii) Partner |
|---|---:|---:|---:|
| Fixed charges | 54,000 | 60,000 | – |
| Excess km | – | 4,800 | – |
| Diesel and repairs (3,600 km) | 54,000 | 43,200 | – |
| Helper | (in fixed) | 14,000 | – |
| Drops × ₹44.10 | – | – | 1,05,840 |
| **Cost a month** | **1,08,000** | **1,22,000** | **1,05,840** |
| **Cost per drop** | **45.00** | **50.83** | **44.10** |
| **Rank** | **2** | **3** | **1** |

**(ii) Next year: 3,000 drops, 4,500 km**

| Particulars (₹) | (i) Own | (ii) Lease | (iii) Partner |
|---|---:|---:|---:|
| Fixed charges | 54,000 | 60,000 | – |
| Excess km (1,500 × ₹8) | – | 12,000 | – |
| Diesel and repairs (4,500 km) | 67,500 | 54,000 | – |
| Helper | (in fixed) | 14,000 | – |
| Drops × ₹44.10 | – | – | 1,32,300 |
| **Cost a month** | **1,21,500** | **1,40,000** | **1,32,300** |
| **Cost per drop** | **40.50** | **46.67** | **44.10** |
| **Rank** | **1** | **3** | **2** |

**Indifference point.** A drop needs 3,600 ÷ 2,400 = 1.5 km, so the own van's variable cost is 1.5 × ₹15 = ₹22.50 a drop against the partner's ₹44.10. They cost the same when ₹54,000 + ₹22.50D = ₹44.10D, so

$$D = \frac{54{,}000}{44.10 - 22.50} = 2{,}500 \text{ drops a month}$$

Below 2,500 drops the partner is cheaper; above it the van's fixed ₹54,000 is spread thin enough for owning to win. The cost unit here is the drop, not the km: the question is what each delivery costs, and only the own van's cost moves with km.
:::
::::

## Under the hood

### School buses and half fares

When some riders pay half fare, convert them into equivalent units, as SM Illustration 4 does for a school whose students within 4 km pay half: each full-fare student counts as 2 half-fare students, and cost per month ÷ equivalent students gives the half fare (12.16–12.19). Two details carry marks: the bus runs only in the working months (diesel for 9 months there), but the fee and the salaries run for all 12, so the year's cost is divided by 12 months.

### CNG or electric?

The chapter's case scenario compares a CNG car and an electric car (SM 12.63–12.65, 12.71–12.73). The depreciable value is the price less any government subsidy and the residual value. A tyre or battery replacement is counted once for each replacement that falls inside the car's life (tyres every 5 years: twice in 15 years, once in 10) and spread over the life to get a cost per month.

### Minimum-load contracts

A truck owner may insist on being paid for at least a stated share of capacity on every leg. Then a leg loaded below that share is billed at the minimum load: the chargeable tonne-km rise, the tonne-km carried do not (MTP Series II for January 2025, case scenario I).

## Exam angle

::: exam Where transport costing appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, transport costing came up in 12 documents:

- **Bus fare on takings, 6 to 8 marks**: January 2025 Q4(a) (8 marks: 4 round trips, 10% commission shared by driver and conductor, 15% profit on takings); MTP Series I for September 2024 Q3(b) (8 marks: annual statement, passenger tax 22% and profit 25% on takings, one-way fare); MTP Series I for September 2025 Q5(b) (mini bus, profit 20% of revenue, 43 paise per passenger-km); MTP Series II for September 2026 Q2(b) (6 marks: monthly cost sheet, 10% commission, 25% profit on takings).
- **A fleet for a year, 7 marks**: September 2026 Q3(b): 8 buses, two under servicing for a month each, profit one-third of revenue, the fare rounded off to the next higher rupee (suggested answers not yet published). A city fleet of 25 buses of two sizes, 5 of them off the road each day for repairs, costed per passenger-km: RTP September 2026 Q13.
- **Goods vehicles, up to 9 marks**: absolute ton-km of six routes with up and down loads, depreciation per km (MTP Series I for May 2024 Q2(a), 9 marks); five MCQs on a truck with a 75% minimum-load condition (MTP Series II for January 2025); five MCQs on a fleet's fixed and variable costs and the freight rate per ton-km (RTP January 2026).
- **MCQs, 2 marks each**: cost per passenger-km for 4 buses (May 2026 MCQ 14); ton-km of a truck (MTP Series I for September 2024 MCQ 14); a round trip that takes 2 days (MTP Series I for May 2025 MCQ 12); a bus case with break-even passengers per trip, and a ferry fare in nautical miles (MTP Series II for May 2025, MCQs 6–10 and 13).
:::

::: exam The traps ICAI set
- **What is a trip?** In MTP Series II for May 2025 the Mumbai–Pune buses made "20 round trips", and the cost "per trip" meant per round trip of 300 km; in SM Illustration 3, "3 up and down trips" are 6 single trips. Read the question twice.
- **Days on the road**: a round trip that takes 2 days halves the number of trips (MTP Series I for May 2025 MCQ 12).
- **Months**: two buses under servicing run 11 months, while the salaries and the depreciation are given as annual totals for the fleet (September 2026 Q3(b)): kilometres and diesel follow the months run, fixed costs do not.
- **Commission shared by two people** is still one percentage of takings: 10% shared equally is 5% each, 10% in all (January 2025 Q4(a)).
- **Depreciation on the straight-line method**: the January 2025 suggested answer showed it among running charges; SM 12.10 treats time-based depreciation as fixed. The total, and so the fare, is the same either way; follow the Study Material unless the question says otherwise.
:::

::: trick The fare shortcut
One-way fare = takings ÷ passengers carried in the period, because takings ÷ passenger-km × route km = takings ÷ (passenger-km ÷ route km). Use it to check the rate-per-passenger-km route. Condition: every passenger travels the full route.
:::

## Answer frame

### The numerical answer, in ICAI's order

1. **Working note: kilometres run**, with the trips written out ("3 round trips = 6 single trips").
2. **Working note: passenger-km or tonne-km** (absolute or commercial as asked, legs in a table).
3. **Working notes for items that need arithmetic**: diesel, depreciation, the takings equation.
4. **The operating cost statement**: A standing, B running, C maintenance, each with its total and per-unit figure; then commission or tax, profit, takings.
5. **The answer in the question's words**: "cost per passenger-km", "fare per passenger-km", "one-way fare per passenger", rounded as instructed; abnormal items such as a penalty shown below the operating profit.

### "Classify these costs of a transport undertaking"

Use ICAI's three heads and their items (SM 12.12): **standing** (insurance, licence fees, monthly salaries, garage costs and rent, time-based depreciation, taxes, administration); **running** (petrol and diesel, lubricant oils, wages related to operations, activity-based depreciation); **maintenance** (repairs and maintenance, tyres, spares). Where an item can move (a salary, depreciation), state the basis you assume.

## Common mistakes

::: mistake Hall of Shame: the bus that only went one way
"2 round trips × 80 km" gives 160 km a day for a Chai Yatra bus; it actually runs 320. **Fix:** a round trip covers the route twice; write "2 round trips = 4 single trips" in the working note, as ICAI does.
:::

::: mistake Seats in place of passengers
Multiplying Chai Yatra's 19,200 km by the 50 seats gives 9,60,000 "passenger-km" and a rate of ₹1.065, a third too low. **Fix:** passenger-km use passengers actually carried, stage by stage (6,39,000).
:::

::: mistake The fine that became a running cost
Leaving a penalty for overloading a lorry in its running charges raises every tonne-km cost. **Fix:** a penalty is abnormal; take it out of the operating cost and deduct it after the operating profit (SM 12.22).
:::

::: mistake The full cost per tonne-km used to refuse a backhaul
Turning down the dairy's butter at ₹3 a tonne-km "because the truck costs ₹8.90" throws away ₹2,280 a trip: the truck comes back from Bhopal anyway. **Fix:** the full cost per tonne-km prices the regular freight; a load on a journey that will be run anyway needs to cover only its extra cost (here the refrigeration fuel).
:::

## Practice

::: quiz Check yourself
Q: A Tapri staff shuttle runs 3 buses on a 30 km route, 4 round trips a day for 26 days. The month's takings must be ₹9,82,800, and the one-way fare is fixed at ₹45. How many passengers must each single trip carry on average?
= 35
> Km run = 3 × 30 × 2 × 4 × 26 = 18,720. Rate = ₹45 ÷ 30 km = ₹1.50 a passenger-km, so the takings need ₹9,82,800 ÷ ₹1.50 = 6,55,200 passenger-km; ÷ 18,720 km = 35 passengers a trip.

Q: Case scenario. Tapri's airport coach makes 8 single trips a day for 30 days. On an average trip it carries 30 full-fare passengers, 10 children at half fare and 10 senior citizens at 60% of the full fare. The month's operating cost is ₹5,90,400, and Tapri wants a profit of 20% of takings. Ritu must fix the full fare per trip. Which is correct?
- [ ] ₹60.00
- [ ] ₹61.50
- [ ] ₹72.00
- [x] ₹75.00
> Equivalent full-fare passengers a trip = 30 + 10 × 0.5 + 10 × 0.6 = 41; × 240 trips = 9,840. Takings = ₹5,90,400 ÷ 0.80 = ₹7,38,000; full fare = ₹7,38,000 ÷ 9,840 = ₹75 (children ₹37.50, seniors ₹45). ₹60 recovers only the cost; ₹61.50 treats all 50 as full-fare passengers; ₹72 adds 20% to cost instead of taking 20% of takings.

Q: How is a penalty paid for overloading a lorry treated in ICAI's transport costing?
- [ ] As a running charge, because it arises from a journey
- [ ] As a maintenance charge
- [x] Excluded from the operating cost and debited to the Costing Profit and Loss Account
- [ ] Spread over the tonne-km of the month
> SM 12.22: it is abnormal expenditure, not part of the operating cost of the lorry; it is deducted from the operating profit to arrive at the net profit or loss.

Q: A Tapri truck based at Indore drives empty 40 km to a dairy at Dewas, carries 9 tonnes from Dewas to Bhopal (150 km), and returns empty to Indore (190 km). It does this circuit 20 times in a month, and the month's cost is ₹2,70,000. What is the cost per absolute tonne-km, in rupees?
= 10
> Absolute tonne-km = 20 × 9 t × 150 km = 27,000; the empty legs add kilometres and cost but no tonne-km. ₹2,70,000 ÷ 27,000 = ₹10 a tonne-km.

Q: Which of these are standing charges of a bus operator under ICAI's classification? Select all that apply.
- [x] Garage rent
- [x] Conductor's salary paid monthly
- [ ] Lubricant oil
- [x] Depreciation related to the efflux of time
- [ ] Tyres
> SM 12.12: garage costs, monthly salaries and time-based depreciation are standing charges; lubricants are running costs; tyres are maintenance costs.
:::

## Recap

- Goods transport: tonne-km; passenger transport: passenger-km (one tonne or one passenger carried one km).
- Km run = vehicles × route km × 2 × round trips × days; passenger-km = km run × seats × occupancy.
- Standing (insurance, licence, monthly salaries, garage, time depreciation, taxes, administration); running (fuel, lubricants, wages per operation, activity depreciation); maintenance (repairs, tyres, spares).
- Interest: a separate item, fixed unless otherwise given; heads can change with the facts (a driver's salary).
- Takings = cost ÷ (1 − c − p) when commission, passenger tax and profit are on takings.
- Rate per passenger-km = takings ÷ passenger-km; fare = rate × journey km.
- Actual load counts for tonne-km even when fined; the fine itself is abnormal and goes to the Costing P&L.
- An empty seat still burns diesel.

## Flashcards

Q:: Cost unit of a goods transport and of a passenger transport organisation?
A:: Goods: tonne-km (cost of carrying one tonne one kilometre). Passengers: passenger-km (cost of carrying one passenger one kilometre).

Q:: Formula: passenger-km of a bus service?
A:: Number of buses × distance × seating capacity × used capacity × number of days × number of single trips.

Q:: ICAI's standing charges of a transport undertaking?
A:: Insurance; licence fees; salaries of driver, conductor, cleaners if paid monthly; garage costs including rent; depreciation related to efflux of time; taxes; administration expenses.

Q:: ICAI's running costs of a transport undertaking?
A:: Petrol and diesel; lubricant oils; wages of driver, conductor, cleaners if related to operations; depreciation related to activity; any other variable costs.

Q:: ICAI's maintenance (semi-variable) costs of a transport undertaking?
A:: Repairs and maintenance; tyres; spares.

Q:: Is a driver's salary a standing or a running charge?
A:: Either, depending on the situation and the nature of his employment: standing if paid monthly, running if related to operations.

Q:: Takings when commission is 10% and profit 15% of takings?
A:: Takings = cost before commission ÷ (1 − 0.10 − 0.15) = cost ÷ 0.75.

Q:: Treatment of a penalty paid for overloading a lorry?
A:: Abnormal: excluded from operating cost, debited to Costing Profit and Loss Account and deducted from operating profit. The actual (overloaded) weight still counts for tonne-km.

Q:: Fare per passenger for a journey?
A:: Rate per passenger-km (takings ÷ passenger-km) × the journey's kilometres.

Q:: Diesel cost of a vehicle for a period?
A:: Km run ÷ km per litre × price per litre.
