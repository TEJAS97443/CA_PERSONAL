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

:::: example Chai Yatra: four buses, one in the workshop
After the trial, Tapri runs 4 buses on the 55 km Indore–Ujjain route for 2026-27. Each bus has 45 seats and makes 3 round trips a day, 25 days a month, carrying on average 80% of its seats. One bus will be in the workshop for major servicing for one month; the other three run all 12 months.

| Particulars | Data |
|---|---|
| Cost of each bus | ₹40,00,000; life 8 years; residual value ₹8,00,000; straight-line |
| Insurance | 2.5% of cost a year |
| Road tax and permits | ₹60,000 per bus a year |
| Garage rent | ₹30,000 a month for the fleet |
| Driver and conductor | ₹40,000 a month per bus, paid for all 12 months |
| Supervisor | ₹45,000 a month |
| Booking office expenses | ₹25,000 a year |
| Diesel | ₹95 a litre; 5 km a litre |
| Lubricants | ₹4 per km |
| Repairs, tyres and spares (including the servicing) | ₹1,80,000 per bus a year |

The crews get a commission of 5% of takings, and Tapri wants a profit of 20% of takings.

**Required:**

(i) Calculate the kilometres run and the passenger-km for the year.

(ii) Prepare an operating cost statement for the year showing standing, running and maintenance charges, in total and per passenger-km.

(iii) Calculate the rate per passenger-km and the one-way fare, rounded up to the next higher rupee.

::: answer Show the working
**Working notes**

1. Bus-months run = 3 × 12 + 1 × 11 = 47. Single trips = 47 × 25 days × 3 round trips × 2 = 7,050. **Km run = 7,050 × 55 = 3,87,750 km.**
2. Passengers per single trip = 45 × 80% = 36. **Passenger-km = 3,87,750 × 36 = 1,39,59,000.** Passengers carried = 7,050 × 36 = 2,53,800.
3. Depreciation per bus = (₹40,00,000 − ₹8,00,000) ÷ 8 = ₹4,00,000 a year, on a time basis: a standing charge for all four buses, servicing month included.
4. Diesel = 3,87,750 ÷ 5 = 77,550 litres × ₹95 = ₹73,67,250.

**Operating cost statement of Chai Yatra for 2026-27** (1,39,59,000 passenger-km)

| Particulars | Total (₹) | Per passenger-km (₹) |
|---|---:|---:|
| Depreciation (4 × ₹4,00,000) | 16,00,000 | |
| Insurance (2.5% × ₹1,60,00,000) | 4,00,000 | |
| Road tax and permits (4 × ₹60,000) | 2,40,000 | |
| Garage rent (₹30,000 × 12) | 3,60,000 | |
| Crew salaries (4 × ₹40,000 × 12) | 19,20,000 | |
| Supervisor (₹45,000 × 12) | 5,40,000 | |
| Booking office | 25,000 | |
| **A. Standing charges** | **50,85,000** | **0.3643** |
| Diesel (WN 4) | 73,67,250 | |
| Lubricants (3,87,750 × ₹4) | 15,51,000 | |
| **B. Running charges** | **89,18,250** | **0.6389** |
| **C. Maintenance** (4 × ₹1,80,000) | **7,20,000** | **0.0516** |
| **Total cost (A + B + C)** | **1,47,23,250** | **1.0547** |
| Commission (5% of takings) | 9,81,550 | 0.0703 |
| Profit (20% of takings) | 39,26,200 | 0.2813 |
| **Takings** | **1,96,31,000** | **1.4063** |

Per passenger-km figures are rounded to four decimals.

**Working note 5: takings.** T = ₹1,47,23,250 + 0.05T + 0.20T, so 0.75T = ₹1,47,23,250 and T = ₹1,96,31,000.

**(iii) Fares**

$$\text{Rate} = \frac{1{,}96{,}31{,}000}{1{,}39{,}59{,}000} = \text{₹}1.4063 \qquad \text{One-way fare} = 1.4063 \times 55 = \text{₹}77.35$$

Rounded up to the next higher rupee: **₹78**. Check: takings ÷ passengers carried = ₹1,96,31,000 ÷ 2,53,800 = ₹77.35.

The month in the workshop cuts the kilometres (47 bus-months, not 48) but not the standing charges or the crew's salaries, which is why it raises the fare.
:::
::::

:::: example Chai Express Logistics: a truck, a middle stop and a fine
Chai Express Logistics Pvt Ltd, a Tapri subsidiary, runs a 10-tonne refrigerated truck for a dairy co-operative between Indore and Bhopal (190 km), on the route below:

::: diagram The Indore–Bhopal route
{"type": "graph", "directed": false, "w": 420, "h": 130,
 "nodes": [{"id": "I", "label": "Indore", "x": 55, "y": 65}, {"id": "S", "label": "Sehore", "x": 250, "y": 65}, {"id": "B", "label": "Bhopal", "x": 370, "y": 65}],
 "edges": [{"from": "I", "to": "S", "label": "150 km"}, {"from": "S", "to": "B", "label": "40 km"}],
 "caption": "Sehore lies on the road, 150 km from Indore and 40 km short of Bhopal."}
:::

It charges ₹1,900 a tonne loaded at Indore for Bhopal, and ₹1,500 a tonne from Bhopal to Indore. Goods unloaded at Sehore on the way are billed nothing extra, and no concession is given for the lighter load after Sehore. In April the truck made 10 round trips:

| Journey | Number | Load (tonnes) |
|---|---:|---:|
| Indore to Bhopal, direct | 8 | 10 |
| Indore to Sehore | 2 | 10 |
| Sehore to Bhopal (after unloading 6 t) | 2 | 4 |
| Bhopal to Indore | 5 | 12 |
| Bhopal to Indore | 5 | 6 |

Annual fixed costs are ₹9,00,000 and annual maintenance charges ₹2,40,000. Running charges for April were ₹2,20,000, including ₹14,000 paid as a penalty for overloading.

**Required:**

(i) Calculate the cost per (a) commercial tonne-km and (b) absolute tonne-km for April.

(ii) Calculate the net profit or loss for April.

::: answer Show the working
**Cost of running the truck in April**

| Particulars | Per annum (₹) | April (₹) |
|---|---:|---:|
| A. Standing charges | 9,00,000 | 75,000 |
| B. Maintenance charges | 2,40,000 | 20,000 |
| C. Running charges (₹2,20,000 − penalty ₹14,000) | | 2,06,000 |
| **Total cost** | | **3,01,000** |

**Working note 1: commercial tonne-km**

Total distance = 10 round trips × 2 × 190 km = 3,800 km.

Average load = (8 × 10 + 2 × 10 + 2 × 4 + 5 × 12 + 5 × 6) ÷ 22 journeys = 198 ÷ 22 = 9 tonnes.

Commercial tonne-km = 3,800 × 9 = **34,200**.

**Working note 2: absolute tonne-km**

| Journey | Working | Tonne-km |
|---|---|---:|
| Indore to Bhopal | 8 × 190 km × 10 t | 15,200 |
| Indore to Sehore | 2 × 150 km × 10 t | 3,000 |
| Sehore to Bhopal | 2 × 40 km × 4 t | 320 |
| Bhopal to Indore | 5 × 190 km × 12 t | 11,400 |
| Bhopal to Indore | 5 × 190 km × 6 t | 5,700 |
| **Total** | | **35,620** |

**(i)** Cost per commercial tonne-km = ₹3,01,000 ÷ 34,200 = **₹8.80**; cost per absolute tonne-km = ₹3,01,000 ÷ 35,620 = **₹8.45**. The 12-tonne loads count at their actual weight although they were fined.

**(ii) Net profit for April**

| Particulars | Amount (₹) |
|---|---:|
| Outward hire: (8 + 2) journeys × 10 t × ₹1,900 | 1,90,000 |
| Return hire: (5 × 12 t + 5 × 6 t) × ₹1,500 | 1,35,000 |
| **Hire charges received** | **3,25,000** |
| Less: Operating cost | 3,01,000 |
| **Operating profit** | **24,000** |
| Less: Penalty for overloading (abnormal) | 14,000 |
| **Net profit** | **10,000** |

The penalty is abnormal, so it is kept out of the operating cost and debited to the Costing Profit and Loss Account (SM 12.22). The overloading earned ₹1,500 × 2 extra tonnes × 5 trips = ₹15,000 of hire, and the fine took ₹14,000 of it back.
:::
::::

:::: example Own, reimburse or hire: the sales team's cars
Tapri's 6 area sales managers each drive about 24,000 km a year. Dev has three proposals:

(i) Buy a car for each manager: cost ₹8,00,000, resale value ₹1,40,000 after 5 years. The company pays insurance ₹18,000 and taxes ₹2,400 per car a year, petrol ₹7.00 per km, repairs ₹0.60 per km and tyres ₹0.25 per km.

(ii) Let each manager use their own car, reimbursing ₹12 per km; the company also bears the insurance.

(iii) Hire cars at ₹2,16,000 per car a year; the company bears petrol, taxes and tyres.

**Required:** Work out the cost per km and per year of each proposal, and rank them.

::: answer Show the working
**Working note: per km figures** (24,000 km a year). Depreciation = (₹8,00,000 − ₹1,40,000) ÷ 5 ÷ 24,000 = ₹5.50; hire = ₹2,16,000 ÷ 24,000 = ₹9.00; insurance = ₹18,000 ÷ 24,000 = ₹0.75; taxes = ₹2,400 ÷ 24,000 = ₹0.10.

**Comparative cost per km**

| Per km (₹) | (i) Own | (ii) Reimburse | (iii) Hire |
|---|---:|---:|---:|
| Depreciation | 5.50 | – | – |
| Reimbursement or hire | – | 12.00 | 9.00 |
| Insurance | 0.75 | 0.75 | – |
| Taxes | 0.10 | – | 0.10 |
| Petrol | 7.00 | – | 7.00 |
| Repairs | 0.60 | – | – |
| Tyres | 0.25 | – | 0.25 |
| **Total per km** | **14.20** | **12.75** | **16.35** |
| **A year (₹)** | **3,40,800** | **3,06,000** | **3,92,400** |
| **Rank** | **2** | **1** | **3** |

The yearly figure is per manager (× 24,000 km).

Reimbursing the managers' own cars is cheapest: for 6 managers ₹18,36,000 a year, ₹2,08,800 less than buying cars. Each column carries only the costs the company bears under that proposal; the layout follows SM 12.70.
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
"3 round trips × 55 km" gives 165 km a day; the bus actually runs 330. **Fix:** a round trip covers the route twice; write "3 round trips = 6 single trips" in the working note, as ICAI does.
:::

::: mistake Seats in place of passengers
Multiplying the kilometres by the 45 seats gives 1,74,48,750 "passenger-km" and a fare that is 20% too low. **Fix:** passenger-km use passengers actually carried: seats × occupancy (36).
:::

::: mistake The fine that became a running cost
Leaving the ₹14,000 overloading penalty in running charges raises every tonne-km cost. **Fix:** a penalty is abnormal; take it out of the operating cost and deduct it after the operating profit (SM 12.22).
:::

::: mistake Twelve months of diesel for a bus that ran eleven
Counting 48 bus-months for Chai Yatra gives 3,96,000 km and ₹75,24,000 of diesel: ₹1,56,750 of diesel for a bus that was in the workshop. **Fix:** kilometres, and with them diesel and lubricants, follow the months the bus actually ran; monthly salaries and time-based depreciation follow the calendar.
:::

## Practice

::: quiz Check yourself
Q: A Tapri staff shuttle runs 3 buses on a 30 km route, 4 round trips a day for 26 days. Each bus has 50 seats and is 70% full on average. The takings needed for the month are ₹9,82,800. What is the one-way fare per passenger, in rupees?
= 45
> Km run = 3 × 30 × 2 × 4 × 26 = 18,720; passenger-km = 18,720 × 35 = 6,55,200; rate = ₹9,82,800 ÷ 6,55,200 = ₹1.50; fare = ₹1.50 × 30 = ₹45.

Q: Case scenario. Tapri's factory bus makes two trips a day, one for the morning shift and one for the night shift, each carrying a different group of 50 workers with every seat filled. In each group 20 riders live within 5 km and pay half fare; the other 30 pay full fare. The bus costs ₹48,000 a month, recovered at cost. Ritu must fix the monthly fares. Which is correct?
- [x] Full fare ₹600, half fare ₹300
- [ ] ₹480 for everyone
- [ ] Full fare ₹1,200, half fare ₹600
- [ ] Full fare ₹685.71, half fare ₹342.86
> Equivalent full-fare riders per shift = 30 + 20 × ½ = 40, so 80 for the two shifts; ₹48,000 ÷ 80 = ₹600, and half fare ₹300. ₹480 ignores the half fares; ₹1,200 counts one shift only; ₹685.71 halves the wrong group (20 + 30 × ½ = 35 a shift).

Q: How is a penalty paid for overloading a lorry treated in ICAI's transport costing?
- [ ] As a running charge, because it arises from a journey
- [ ] As a maintenance charge
- [x] Excluded from the operating cost and debited to the Costing Profit and Loss Account
- [ ] Spread over the tonne-km of the month
> SM 12.22: it is abnormal expenditure, not part of the operating cost of the lorry; it is deducted from the operating profit to arrive at the net profit or loss.

Q: A lorry runs 250 km each way between two cities with 8 tonnes out and 3 tonnes back. A round trip takes 2 days and the lorry is on the road 300 days a year. What are its tonne-km for the year?
= 412500
> Round trips = 300 ÷ 2 = 150. Tonne-km per round trip = 8 × 250 + 3 × 250 = 2,750. Year = 150 × 2,750 = 4,12,500. Counting 300 round trips doubles it.

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
