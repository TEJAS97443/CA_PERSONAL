---
id: cma.svc.others
title: Hotels, hospitals, power, IT and other services
minutes: 35
needs: cma.svc.basics, cma.sheet.service, cma.mc.bep
tags: hotel costing, room-day, patient-day, hospital costing, toll road, BOT, kWh, insurance costing, IT project costing
labs:
summary: The service chapter's other industries: room-days for hotels, patient-days for hospitals, kWh for power, toll rates for BOT roads, projects for IT, students for schools, policies for insurers, applications for banks.
---

## In plain words

### Kesar's week of new ventures

Tapri has grown far beyond chai. In one week Kesar asks Ritu to price a hill-station inn at Pachmarhi, the dialysis centre that Tapri's charitable trust runs in Jabalpur, the captive power plant at the samosa factory, the toll road near Indore in which Tapri has taken a stake, an ordering app and a term-insurance plan for the delivery riders.

> **Kesar:** Six businesses, six headaches. One formula for all, na? Total cost divided by customers.
> **Ritu:** The idea is the same, Kesar-ji. The unit changes. A room is sold by the night, a hospital bed by the patient-day, a dialysis machine by the session, the power plant by the unit of electricity, a toll road by the vehicle.
> **Kesar:** And the app?
> **Ritu:** By the project, built out of the months your developers spend on it.

So every service gets the unit it is sold in: a **room-day** (one room let for one day) for a hotel, a **patient-day** for a hospital, a **kWh** (one kilowatt-hour, the "unit" on an electricity bill) for a power plant, a **vehicle** passing the plaza for a toll road, a **project** for an IT company, a **student** or a **batch** for a school, a **policy** for an insurer, an **application** for a bank.

Then three moves, in every business. Count the units **actually** delivered: an inn with 40 rooms that is 40% full in winter sells 16 rooms a night, not 40. Split the cost into what stays fixed and what moves with each unit. Divide, then add the profit and anything charged as a share of takings. Where some units are worth more (a deluxe room, off-season half rent, a truck against a car at the toll plaza), give them weights, exactly as in [[cma.svc.basics|equivalent service units]].

::: analogy One recipe, many kitchens
Ritu's dal recipe is the same in every kitchen; only the measure changes: a katori at a dhaba, a kilo at a wedding, a degchi at a langar. Service costing is one recipe (count the units used, total the cost, divide, add the margin) cooked with a different measure in each industry.
:::

::: key
Each service has its own cost unit (room-day, patient-day, kWh, vehicle, project, student, policy, application). Count the units actually used, not the capacity; give weights to grades and seasons; divide the period's cost, then build the price on takings.
:::

## How it works

### Hotels and lodges

Hotels are run on commercial basis, so cost is computed "to fix the price of various services provided by the hotel and to find out the profit or loss" (SM 12.22). The cost unit "may be Guest-day or Room Day", and the estimated occupancy rate at different points of time, peak season or lean season, is taken into account (SM 12.23).

::: steps
1. **Room-days occupied** for each type and season: rooms × occupancy × days.
2. **Equivalent room-days**: weight each type (a suite let at twice a Standard room) and each season (off-season at half rent) to one base: full-rent Standard room-days (SM Illustrations 6 and 7, 12.23–12.28).
3. **Total cost of the year**: fixed costs (salaries, depreciation, repairs) plus costs per occupied room-day (room attendants paid on occupancy, laundry).
4. **Takings**, solving for any rent or commission charged as a percentage of takings and for the profit on takings; then rent per equivalent room-day × each weight.
:::

### Hospitals

A hospital has departments for **out-patients**, **in-patients**, **medical services** (X-ray, scanning), **general services** (catering, laundry, power house) and **miscellaneous services** (transport, dispensary) (SM 12.28). Their units (SM 12.28):

| Department | Unit of cost |
|---|---|
| Out-patient | Per out-patient |
| In-patient | Per room-day |
| Scanning | Per case |
| Laundry | Per 100 items laundered |

**Cost segregation** (SM 12.28–12.29): **fixed costs** are based on timelines and do not depend on the services provided (staff salaries, depreciation on building and equipment); **variable costs** vary with the level of services rendered (laundry, food supplied to patients, power). ICAI's critical care unit (CCU) illustration treats doctors paid on the basis of the number of patients attended and the time spent as a variable cost, works out the contribution per patient-day and finds a break-even point in patient-days (SM Illustration 8, 12.29–12.31), the method of [[cma.mc.bep|break-even analysis]].

### IT and ITES

IT and IT-enabled services organisations are highly labour intensive and provide services to outside customers or internally (captive consumption); employee cost is a significant part of their operating cost, and the direct employee cost is traceable to the services rendered; their significant overheads ("service overheads") are allocated or apportioned to cost units (SM 12.31). The jobs undertaken are **projects**, each unique in size, functionality, duration and staffing (SM 12.32):

1. The project is broken into activities and their dependencies; the project schedule is developed from them.
2. The skill level and duration of each activity are identified: **effort estimation**. Scheduling and effort estimation are normally done together.
3. The manpower needed is identified, and effort is costed **per person-day, person-week or person-month** (SM 12.33).

**Direct manpower** (software engineers, functional consultants, business analysts; project leaders; project manager; program manager) is traceable and a direct cost. **Support manpower** (quality assurance, testing, version control, staffing manager) is a direct cost if its time can be identified with the project, otherwise an overhead apportioned on a suitable basis (SM 12.32–12.33). The parameters of total cost (SM 12.34–12.35):

| Parameter | Direct to the project when | Otherwise |
|---|---|---|
| A. Hardware and software | Identifiable with the project | Service overhead |
| B. Travel and training | Incurred for the project | Service overhead (Java training useful across many projects) |
| C. Effort costs | Identified with the project: direct unless otherwise specified | – |

Effort cost is not just salary: it includes a share of the cost of running the organisation (office space, heating and lighting; support staff; networking and communications; central facilities such as a library; social security and employee benefits). In short, salary plus part of common overhead (SM 12.34–12.35). A project cost sheet built this way is worked in [[cma.sheet.service|the service-sector cost sheet]].

### Toll roads

Highway economic analysis quantifies a scheme's costs and benefits over a time horizon, compares the "with" and "without" project conditions, and tests the project by sensitivity analysis (SM 12.36–12.37). The project cost has two components:

::: diagram Costs of a toll road project (SM 12.37–12.38)
{"type": "nest", "w": 430, "root": {"title": "Toll road project", "mono": false, "color": "mute", "children": [
  {"title": "Capital costs", "note": "during construction", "mono": false, "color": "a", "lines": ["Preliminary and pre-operative expenses", "Land acquisition", "Materials", "Labour", "Overheads in actual construction", "Contingency allowance", "Interest during construction period"]},
  {"title": "Operating and maintenance costs", "note": "once operational", "mono": false, "color": "d", "lines": ["Toll collection expenses", "Administrative expenses for day-to-day operation", "Maintenance: routine and periodic", "Interest for servicing term loans"]}]},
 "caption": "Interest appears in both: during construction it is capital cost; once the road is operational, interest for servicing term loans is an operating cost."}
:::

**Annual operating cost** covers operating the tollbooths, administration, emergency services, communications, security and other operating costs. **Maintenance** is annual (routine: the wearing surface, railings, roadside furniture; patching potholes, sealing cracks, edge repair, surface renewal) or periodic (overlays or wearing coats, painting of railings) (SM 12.37–12.38).

::: definition Build-Operate-Transfer (BOT) (SM 12.38)
BOT is an option for the Government to outsource public projects to the private sector. With BOT, the private sector designs, finances, constructs and operates the facility and eventually, after a specified concession period, the ownership is transferred to the Government. Therefore, BOT can be seen as a developing technique for infrastructure projects by making them amenable to private sector participation.
:::

The **toll rate** should have a direct relation with the benefits users gain from the road: fuel savings, improvement in travel time and good riding quality. The Study Material's formula, "with rounding off to nearest multiple of five": ==User Fee = Total Distance × Toll Rate per km== (SM 12.38–12.39). The Study Material's own worked answers still show the exact toll (₹24.35 a vehicle in Illustration 10, SM 12.40; ₹19.06 for a two-wheeler in Practical Problem 1, SM 12.67), as does ICAI's September 2025 suggested answer: compute the exact rate first, and round only when the question asks.

### Educational institutions

Schools, colleges and training institutes, "Not-for profit" or "For profit", need costing for cost-social benefit analysis, allocation of funds and budgeting (zero-based budgeting) and performance evaluation (SM 12.41).

| | Items (SM 12.41–12.42) |
|---|---|
| **One-time fees** | Admission fee, development fee, annual fee |
| **Recurring fees** | Tuition, laboratory, computer and internet, library, training, amenities, sports, extracurricular activities |
| **Other incomes** | Transport, hostel, mess and canteen, normally on a no-profit-no-loss basis |
| **Operational costs** | Teaching and non-teaching salaries; laboratory maintenance; computer maintenance and internet; building maintenance; repairs of equipment; administration; finance charges |
| **Cost centres** | Primary or direct (Civil, Mechanical Engineering departments); service (laboratory, library, sports); students' self-supporting services (transport, hostel and mess); administration (research and improvement, examination) |

Government and aided institutes may not be permitted to collect fees such as capitation and development fees, and are not free to fix fees beyond a prescribed limit. Research costs are collected in a cost centre and set off against research revenue, any balance going to the course cost centres as "Research costs"; publication costs are allocated to the publication department (SM 12.41–12.42). Training-batch fees are worked in [[cma.sheet.service|the service-sector cost sheet]].

### Insurance companies

Insurers are life or non-life (general); their products include life policies with or without maturity benefits, general insurance (health, fire, property, travel) and other services (re-insurance, fund management) (SM 12.47). **Income**: premium; commission on re-insurance; fund administration fee and return on investment. **Expenditure**, direct to a policy or product: commission paid to agents, claim settlement, cost of valuation, premium for re-insurance, legal and other costs; indirect: actuarial fees, market and product development costs, administration, asset management (SM 12.48).

The cost object may be a product, a policy, a department or region, or an agent, and **activity based costing** is used for direct product profitability and customer (policy) profitability analysis (SM 12.48). Costs are traced to the activities that caused them, then reassigned to cost objects by cost drivers: hours spent on processing applications and claims, number of applications, policies, claims (SM 12.48–12.49).

::: diagram Activities of an insurance company (SM 12.48–12.49)
{"type": "tree", "gapX": 18, "root": {"label": "Activities", "children": [
  {"label": "Pre-product\ndevelopment", "color": "a", "note": "market research,\nproduct development"},
  {"label": "Post-product\ndevelopment", "color": "d", "children": [
    {"label": "Selling of\npolicy", "color": "d", "note": "channels,\napplications"},
    {"label": "Processing\nof claims", "color": "d", "note": "inception to\nsettlement"}]}]},
 "caption": "Pre-product development covers market research and product development (coverage, conditions, premium, contract, policy forms, sales channel). Claims processing runs from claim inception and estimation to settlement and legal action."}
:::

ICAI's illustration groups a policy's costs into marketing and sales support, operations, IT and support functions, then finds the **cost per policy** and the **cost per rupee of insured value** (SM Illustration 12, 12.49–12.50).

### Financial institutions

Manpower cost, other than interest and finance charges, is one of the largest single cost components (SM 12.51). The objectives of cost measurement (SM 12.51): understand profitability by products and by customers; establish a mechanism for pricing products by identifying product-level and activity-level unit costs; understand productivity issues and their relationship with strategic goals. ABC helps to identify profitability by product and by customer and to build product-level costs from activity-level unit costs; profitability improves by concentrating on more profitable products and high-margin customers (SM 12.52). The cost of processing a loan application = (direct professional labour + the share of the loan department's overheads applicable to that work) ÷ applications processed (SM Illustration 13, 12.52–12.53).

### Power houses

Power houses generating electricity or steam use "Powerhouse Costing"; the cost unit for electricity is the **kilowatt-hour (kWh)**, commonly known as a "Unit" (SM 12.53). The heads (SM 12.54):

| Head | Items |
|---|---|
| Standing charges or fixed costs | Rent, rates and taxes; insurance; depreciation; salaries if paid on time (monthly) basis; administration expenses |
| Variable costs or running costs | Fuel charges; water charges; wages or labour charges if paid on the basis of production; any other variable costs |
| Semi-variable or maintenance costs | Meters; furnaces; service materials; tools |

## Formats and formulas

*Reproduce the hotel working note and the hospital statement from memory.*

| Type and season | Occupied room-days | Weight | Equivalent room-days |
|---|---:|---:|---:|
| Standard, season | rooms × % × days | 1 | xxx |
| Standard, off-season | rooms × % × days | ½ | xxx |
| Deluxe, season | rooms × % × days | w | xxx |
| **Total** | | | **xxx** |

| Statement of profitability (hospital) | Amount (₹) |
|---|---:|
| Income (patient-days × rate) | xxx |
| Less: Variable costs (doctors paid per patient, food, medicines, laundry, bed hire) | xxx |
| **Contribution** | **xxx** |
| Less: Fixed costs (rent, salaries, fixed repairs, administration) | xxx |
| **Profit** | **xxx** |

::: formula Rent per room-day when charges and profit are on takings
$$R \times E = \text{Cost} + (c + p) \times R \times E \qquad R = \frac{\text{Cost}}{E \times (1 - c - p)}$$
E = equivalent base room-days, R = rent of the base room-day, c = rent, commission or fee as a fraction of takings, p = profit as a fraction of takings (SM 12.25).
:::

::: formula Hospital break-even point
$$\text{BEP} = \frac{\text{Fixed cost}}{\text{Contribution per patient-day}}$$
The BEP comes out in patient-days; ÷ (beds × days) gives it as a percentage of capacity.
:::

::: formula Toll rate
$$\text{Base toll} = \frac{\text{Total cost} + \text{Profit}}{\text{Equivalent vehicles}} \qquad \text{User fee} = \text{Distance} \times \text{Rate per km}$$
Base toll: the toll of the vehicle type with weight 1. Equivalent vehicles: each type × its weight or toll ratio (SM 12.38–12.40, 12.66–12.67). User fee: the Study Material's formula, rounded off to the nearest multiple of five (SM 12.38–12.39); ICAI's worked answers show the exact toll, so round only when the question asks.
:::

::: formula Power, insurance and banks
$$\text{Cost per kWh} = \frac{\text{Total cost}}{\text{kWh generated}} \qquad \text{Cost per policy} = \frac{\text{Total cost}}{\text{Policies sold}}$$

$$\text{Cost per ₹ insured} = \frac{\text{Total cost}}{\text{Insured value}} \qquad \text{Per application} = \frac{\text{Labour} + \text{Overhead share}}{\text{Applications}}$$
Cost per ₹ insured = cost per rupee of insured value. Per application: direct professional labour plus the share of the department's overheads applicable to that work (SM 12.50, 12.53).
:::

## Worked examples

:::: example Kulhad Inn, Pachmarhi: rooms and a banquet hall under one roof
Tapri's Kulhad Inn at Pachmarhi has 30 Standard rooms and 6 Family suites; a Family suite is let at twice the rent of a Standard room. The building also holds a banquet hall that is run as a separate business. Of the building's 12,000 sq ft, the rooms wing takes 9,000 sq ft and the banquet hall 3,000 sq ft. Occupancy for the year: Standard rooms 75%, Family suites 50%. Take 360 days in a year.

| Costs for the year | Amount |
|---|---|
| Building costs shared by the rooms and the banquet hall: depreciation ₹12,00,000; repairs ₹3,60,000; security and gardening ₹4,80,000; property tax and insurance ₹2,40,000 | ₹22,80,000 |
| Rooms only: front-office and housekeeping salaries | ₹15,00,000 |
| Rooms only: depreciation of room furniture | ₹3,00,000 |
| Room attendants, paid on occupancy | ₹150 per occupied room-day |
| Laundry and toiletries | ₹100 per occupied room-day |
| Power for the rooms | ₹150 per occupied room-day |

A booking app takes a commission of 10% of room takings, and Tapri wants a profit of 20% of room takings.

**Required:**

(i) Calculate the rent per room-day of a Standard room and of a Family suite.

(ii) Kesar's first draft charged all the building costs to the rooms. Calculate the Standard rent it would give, and comment.

::: answer Show the working
**Working note 1: room-days**

| Rooms | Occupied room-days | Weight | Equivalent Standard room-days |
|---|---:|---:|---:|
| Standard | 30 × 75% × 360 = 8,100 | 1 | 8,100 |
| Family suite | 6 × 50% × 360 = 1,080 | 2 | 2,160 |
| **Total** | **9,180** | | **10,260** |

**Working note 2: the rooms' share of building costs.** The building costs are common to the two businesses and are apportioned on floor area: rooms 9,000 ÷ 12,000 = 75% of ₹22,80,000 = ₹17,10,000; the banquet hall bears the other ₹5,70,000.

**Working note 3: statement of cost of the rooms for the year**

| Particulars | Amount (₹) |
|---|---:|
| Building costs (75%, WN 2) | 17,10,000 |
| Front-office and housekeeping salaries | 15,00,000 |
| Depreciation of room furniture | 3,00,000 |
| Room attendants (9,180 × ₹150) | 13,77,000 |
| Laundry and toiletries (9,180 × ₹100) | 9,18,000 |
| Power (9,180 × ₹150) | 13,77,000 |
| **Total cost** | **71,82,000** |

**(i) Rent.** Let R be the rent of a Standard room-day. Takings = 10,260R = ₹71,82,000 + (0.10 + 0.20) × 10,260R, so 7,182R = ₹71,82,000 and **R = ₹1,000**. Takings ₹1,02,60,000; commission ₹10,26,000; profit ₹20,52,000.

| Rent per room-day (₹) | |
|---|---:|
| Standard room | 1,000 |
| Family suite (× 2) | 2,000 |

Check: 8,100 × ₹1,000 + 1,080 × ₹2,000 = ₹1,02,60,000. Costs paid per occupied room-day use the 9,180 room-days actually occupied; only the rent uses the 10,260 equivalent ones.

**(ii) All building costs on the rooms.** Cost = ₹71,82,000 + ₹5,70,000 = ₹77,52,000; takings = ₹77,52,000 ÷ 0.70 = ₹1,10,74,286; Standard rent = ₹1,10,74,286 ÷ 10,260 = **₹1,079.36**, and a Family suite ₹2,158.73. The rooms would carry ₹79.36 a room-day of the banquet hall's building costs, overpricing the rooms against nearby hotels and making the banquet hall look more profitable than it is. A cost common to two services is apportioned on a suitable basis (here floor area) before either is priced.
:::
::::

::::: example Narmada Seva Trust: the dialysis centre and its third shift
Tapri's charitable trust runs a dialysis centre in a hired building in Jabalpur. It has 10 dialysis machines; each machine completes 2 sessions in a shift, the centre works 2 shifts a day for 26 days a month, and 90% of the session slots are used. The trust recovers ₹2,200 a session. Monthly data:

| Particulars | Amount |
|---|---|
| Rent | ₹1,20,000 a month |
| Machines | 10 at ₹9,00,000 each; life 5 years, straight line, time basis |
| Annual maintenance contract for the machines | ₹50,000 a month |
| Technicians (3 a shift) | ₹30,000 a month each |
| Nurses (2 a shift) | ₹35,000 a month each |
| Administration expenses allocated | ₹60,000 a month |
| Nephrologist, paid per session supervised | ₹300 a session |
| Dialyser, tubing and needles | ₹650 a session |
| Fluids and drugs | ₹250 a session |
| Power and treated water | ₹100 a session |

**Required:**

(i) Calculate the cost per session and the profit per session for the month.

(ii) Find the break-even point in sessions a month, and as a percentage of the two-shift capacity.

(iii) A third shift would need 3 more technicians and 2 more nurses, and 60% of its slots are expected to be used. Calculate its effect on the month's profit and the sessions it needs to break even on its own.

:::: answer Show the working
**Working note: sessions.** Capacity = 10 machines × 2 sessions × 2 shifts × 26 days = 1,040 a month; sessions = 90% × 1,040 = **936**. Depreciation = 10 × ₹9,00,000 ÷ (5 × 12) = ₹1,50,000 a month.

**Statement of profitability for the month**

| Particulars | Amount (₹) |
|---|---:|
| Income (936 × ₹2,200) | 20,59,200 |
| Nephrologist (936 × ₹300) | 2,80,800 |
| Dialyser, tubing and needles (936 × ₹650) | 6,08,400 |
| Fluids and drugs (936 × ₹250) | 2,34,000 |
| Power and treated water (936 × ₹100) | 93,600 |
| **Total variable costs (₹1,300 a session)** | **12,16,800** |
| **Contribution (₹900 a session)** | **8,42,400** |
| Rent | 1,20,000 |
| Depreciation of machines | 1,50,000 |
| Annual maintenance contract | 50,000 |
| Technicians (6 × ₹30,000) | 1,80,000 |
| Nurses (4 × ₹35,000) | 1,40,000 |
| Administration allocated | 60,000 |
| **Total fixed costs** | **7,00,000** |
| **Profit** | **1,42,400** |

**(i)** Cost per session = ₹1,300 + ₹7,00,000 ÷ 936 = **₹2,047.86**; profit per session = ₹1,42,400 ÷ 936 = **₹152.14**.

**(ii)**

$$\text{BEP} = \frac{7{,}00{,}000}{900} = 777.8 \text{, say } 778 \text{ sessions} \qquad \frac{777.8}{1{,}040} = 74.79\%$$

::: diagram Narmada Seva dialysis centre: break-even chart (two shifts)
{"type": "plot", "h": 320, "x": [0, 1100], "y": [0, 2500000], "legend": "top-left",
 "xlabel": "sessions in the month", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [400, "400"], [778, "778"], [936, "936"]],
 "yticks": [[0, "0"], [500000, "5,00,000"], [1000000, "10,00,000"], [1500000, "15,00,000"], [2000000, "20,00,000"], [2500000, "25,00,000"]],
 "series": [
  {"label": "income", "fn": "2200*x", "color": "a"},
  {"label": "total cost", "fn": "700000+1300*x", "color": "d"},
  {"label": "fixed cost", "fn": "700000", "color": "mute", "dash": true},
  {"pts": [[777.8, 0], [777.8, 1711111]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[936, 0], [936, 2059200]], "color": "mute", "dash": true, "legend": false}],
 "points": [{"x": 777.8, "y": 1711111, "label": "BEP: 778", "pos": "left"}],
 "caption": "Blue: income at ₹2,200 a session; orange: total cost (₹7,00,000 fixed plus ₹1,300 a session). They cross at about 778 sessions; the month's 936 leave a margin of safety of 158 sessions."}
:::

**(iii) A third shift.** Capacity 10 × 2 × 26 = 520 sessions; 60% used = 312 sessions. Extra contribution 312 × ₹900 = ₹2,80,800; extra fixed cost 3 × ₹30,000 + 2 × ₹35,000 = ₹1,60,000; extra profit **₹1,20,800**, so the month's profit rises to ₹2,63,200. The rent, machines, maintenance contract and administration do not change: the shift's own break-even is ₹1,60,000 ÷ ₹900 = 177.8, say **178 sessions** (34.19% of its 520 slots). Staff hired per shift are a stepped fixed cost: fixed while the shift runs, added in a block when a shift is opened.
::::
:::::

:::: example Malwa Expressway: tolls by the kilometre
Malwa Expressway Ltd, in which Tapri holds a stake, operates an 80 km access-controlled highway near Indore under BOT. Vehicles take a ticket where they enter and pay by the kilometre where they leave. The expected traffic for a year:

| Vehicle | Trips a year | Average distance a trip (km) | Toll per km relative to a car |
|---|---:|---:|---:|
| Cars and jeeps | 30,00,000 | 50 | 1 |
| Buses and LCVs | 6,00,000 | 70 | 1.6 |
| Trucks | 4,00,000 | 80 | 3 |

Annual costs: toll operations and administration ₹4.80 crore; routine maintenance ₹6.00 crore; periodic maintenance (overlays, painting of railings) ₹3.60 crore; interest for servicing term loans ₹18.24 crore. The project cost of ₹720 crore is to be recovered evenly over the 24-year concession period. The company wants a profit of 25% on total cost.

**Required:**

(i) Calculate the total annual cost and the takings required.

(ii) Calculate the toll per km for each type of vehicle.

(iii) Calculate the toll each type pays for the full 80 km and for a 46 km trip, rounded to the nearest multiple of ₹5 (user fee = distance × toll rate per km).

::: answer Show the working
**(i) Annual cost and takings**

| Particulars | Amount (₹ crore) |
|---|---:|
| Toll operations and administration | 4.80 |
| Routine maintenance | 6.00 |
| Periodic maintenance | 3.60 |
| Interest for servicing term loans | 18.24 |
| Recovery of project cost (₹720 crore ÷ 24 years) | 30.00 |
| **Total annual cost** | **62.64** |
| Profit (25% on total cost) | 15.66 |
| **Takings required** | **78.30** |

**(ii) Working note: equivalent car-km.** Each type's vehicle-km × its weight:

| Vehicle | Vehicle-km | Weight | Equivalent car-km |
|---|---:|---:|---:|
| Cars and jeeps | 30,00,000 × 50 = 15,00,00,000 | 1 | 15,00,00,000 |
| Buses and LCVs | 6,00,000 × 70 = 4,20,00,000 | 1.6 | 6,72,00,000 |
| Trucks | 4,00,000 × 80 = 3,20,00,000 | 3 | 9,60,00,000 |
| **Total** | | | **31,32,00,000** |

Car toll per km = ₹78,30,00,000 ÷ 31,32,00,000 = **₹2.50**; buses and LCVs ₹2.50 × 1.6 = **₹4.00**; trucks ₹2.50 × 3 = **₹7.50** per km.

Check: 15,00,00,000 × ₹2.50 + 4,20,00,000 × ₹4.00 + 3,20,00,000 × ₹7.50 = ₹37.50 crore + ₹16.80 crore + ₹24.00 crore = ₹78.30 crore.

**(iii) User fee**

| Vehicle | 80 km (₹) | 46 km, exact (₹) | 46 km, rounded (₹) |
|---|---:|---:|---:|
| Car or jeep | 200 | 115.00 | 115 |
| Bus or LCV | 320 | 184.00 | 185 |
| Truck | 600 | 345.00 | 345 |

The weights are applied to vehicle-km, not to trips: a truck pays three times a car for each kilometre, and trucks also travel further on average. Pricing per trip at the average distance of all vehicles would overcharge short car trips and undercharge long truck trips.
:::
::::

## Under the hood

### The hill-station lighting puzzle

SM Illustration 7 (12.25–12.28) and MTP Series I for January 2026 Q5(b) charge lighting at one rate for 8 months and a lower rate for the 4 winter months, while occupancy is 80% in the 6-month season and 40% in the 6-month off-season. At a hill station the winter falls in the off-season, so the year splits three ways: 6 season months at the higher rate, 2 off-season months at the higher rate, 4 off-season (winter) months at the lower rate, each × the rooms occupied in that period.

### Same idea, other chapters

A hospital's patient-day break-even is [[cma.mc.bep|break-even analysis]]; an insurer's or a bank's activity costing is [[cma.abc.concept|activity based costing]]; a school's apportionment of a principal's or a librarian's salary across streams is [[cma.oh.primary|primary distribution of overheads]].

## Exam angle

::: exam Where these industries appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, these industries came up in 13 documents (12 of the new scheme, 1 of the old):

- **Hotels, 2 to 7 marks**: hill-station hotel with off-season half rent and lighting by months (MTP Series I for January 2026 Q5(b), 7 marks); tariff per room-day and break-even occupancy in the normal season (MTP Series II for May 2024 Q5(b), 6 marks); Premium rooms at double the Deluxe rent, profit 20% of revenue (RTP September 2024 MCQ 5 and MTP Series II for September 2026 MCQ 12); single and double rooms, attendants ₹125 per room-day, profit 25% on takings (RTP May 2025 Q16).
- **Toll roads, 5 to 10 marks**: monthly cost of a plaza and tolls for three vehicle types in a ratio, 20% profit over takings (September 2025 Q2(a), 10 marks); "Explain BOT and classify six expenses" into capital or operating and maintenance cost (September 2024 Q4(b), 5 marks); a BOT highway's project cost per day of the concession period and tolls by vehicle weights (RTP September 2024 Q16).
- **Banks, 2 to 8 marks**: gold-loan and car-loan applications, solving for the salary that equalises their cost (January 2026 Q3(a), 8 marks); home-loan and education-loan applications (MTP Series I for September 2025 MCQ 12; MTP Series II for January 2025 Q3(c), 2 marks).
- **Insurance, MCQs**: cost per rupee of insured value (RTP September 2024 MCQ 6; MTP Series I for May 2026 MCQ 13); a policy's activity costs (MTP Series I for January 2025 MCQ 14).
- **Hospitals**: no numerical in the new-scheme documents read; the old-scheme January 2021 paper Q5(a) (10 marks) asked profit per patient-day and the break-even patient-days, as SM Illustration 8 does. Hospitals, hotels and electricity also appear in the cost-units table questions ([[cma.svc.basics|composite cost units]]).
- **IT and power**: no numerical in the documents read; power appears only as "kWh" in cost-units questions.
- **Education and training, 6 marks**: an air-hostess training institute's cost per batch, minimum fee per trainee and minimum batch size (January 2026 Q3(b)); this pattern is worked in [[cma.sheet.service|the service-sector cost sheet]].
:::

::: exam The traps ICAI set
- **A cost traceable to one service is not apportioned.** In MTP Series II for January 2025 Q3(c), ₹11,000 of legal advice for an education loan was charged in full, and only 30% of the rest of the department's overheads.
- **Interest**: capital cost during construction, an operating cost once the road runs (September 2024 Q4(b)).
- **"20% profit margin over total takings"** means takings = cost ÷ 0.80, not cost × 1.20 (September 2025 Q2(a)).
- **Off-season half rent** is a weight of ½ on the off-season room-days, not half the occupancy.
:::

::: trick The equivalent-unit shortcut for any grading
Whenever prices of grades stand in fixed ratios (rooms, seasons, vehicle classes, seat classes), total takings ÷ Σ(units × ratio) gives the base price in one line. Condition: the ratios are of prices (rents, tolls, fees), and the units are those actually sold.
:::

## Answer frame

### "Explain the BOT approach and classify these expenses"

1. **BOT**: an option for the Government to outsource public projects to the private sector; the private sector designs, finances, constructs and operates the facility and, after the specified concession period, ownership is transferred to the Government. Therefore, BOT can be seen as a developing technique for infrastructure projects by making them amenable to private sector participation (ICAI's September 2024 answer gives exactly this paragraph for the 2 marks).
2. **A two-column table**, the expenses in the question's order, each against its class (SM 12.37–12.38; September 2024 Q4(b)):

| Expense | Classification |
|---|---|
| Preliminary and pre-operative expenses; land acquisition | Capital cost |
| Materials; labour; overheads of actual construction | Capital cost |
| Contingency allowance; interest during construction period | Capital cost |
| Toll collection expenses; day-to-day administration | Operating and maintenance cost |
| Routine and periodic maintenance (overlays, painting of railings) | Operating and maintenance cost |
| Interest for servicing term loans | Operating and maintenance cost |

### Short notes on any one industry

Use the Study Material's skeleton for that industry: what the service is; its **cost unit**; its **income** heads (education, insurance); its **cost heads** or segregation (fixed and variable for hospitals; standing, running and maintenance for power; capital and O&M for toll roads; direct and indirect for insurers); the **method** (projects and effort for IT; ABC for insurers and banks; cost centres for schools). The numerical answer runs: units actually delivered (working note) → statement of cost → takings → rate per unit.

## Common mistakes

::: mistake Hall of Shame: the inn that was always full
Bunty divides Kulhad Inn's room takings of ₹1,02,60,000 by 36 rooms × 360 days = 12,960 room-days and gets a rent of ₹791.67 for every room on every day. Occupancy was 75% and 50%, and a Family suite pays double. **Fix:** room-days occupied, then weights: 10,260 equivalent room-days and ₹1,000.
:::

::: mistake Per-room costs on equivalent room-days
Charging room attendants on the 10,260 equivalent room-days. **Fix:** costs paid per occupied room-day use the 9,180 room-days actually occupied; equivalents are only for sharing out the rent.
:::

::: mistake Doctors on a per-patient fee shown as fixed
In the Narmada Seva dialysis centre, moving the nephrologist's ₹2,80,800 for the month into fixed costs gives a contribution of ₹1,200 a session and a break-even point of about 818 sessions instead of 778. **Fix:** pay that varies with patients attended or sessions supervised is variable (SM Illustration 8).
:::

::: mistake The training course charged to one project
Java training useful to many projects charged in full to the project in hand. **Fix:** travel and training incurred for a project are direct; anything useful across projects is service overhead (SM 12.34).
:::

## Practice

::: quiz Check yourself
Q: Tapri's captive power plant generated 12,00,000 kWh in the year, but 5% of it was used by the plant itself (auxiliary consumption), so only the rest reached the samosa factory. Costs: supervision, administration and depreciation ₹30,00,000; operating staff on fixed shifts ₹18,00,000; repairs ₹5,40,000; biomass fuel ₹1.25 per kWh generated. What is the cost per kWh delivered to the factory, in rupees?
= 6
> Fuel = 12,00,000 × ₹1.25 = ₹15,00,000; total = ₹30,00,000 + ₹18,00,000 + ₹5,40,000 + ₹15,00,000 = ₹68,40,000. kWh delivered = 12,00,000 × 95% = 11,40,000; ₹68,40,000 ÷ 11,40,000 = ₹6.00. Dividing by the kWh generated (₹5.70) understates what the factory's power really costs.

Q: Case scenario. Kavach Life Ltd sells two term plans to Tapri's people. The Rider plan cost ₹1,20,00,000 for the year and sold 500 policies with a total insured value of ₹600 crore. The Café plan cost ₹90,00,000 and sold 600 policies insured for ₹300 crore in all. Dev compares the two plans. Which statement is correct?
- [ ] The Rider plan costs less per policy and less per rupee of insured value
- [ ] The Rider plan costs less per policy but more per rupee of insured value
- [x] The Rider plan costs more per policy but less per rupee of insured value
- [ ] The Café plan costs less on both measures
> Per policy: ₹1,20,00,000 ÷ 500 = ₹24,000 against ₹90,00,000 ÷ 600 = ₹15,000. Per rupee of insured value: ₹1.2 crore ÷ ₹600 crore = ₹0.002 against ₹0.9 crore ÷ ₹300 crore = ₹0.003. The two cost units rank the plans differently, so state which one is asked (SM 12.50).

Q: A bank's loan processors are paid ₹8,00,000 a month; their timesheets show 60% of their hours on home-loan applications and 40% on car-loan applications. The department's other overheads, ₹5,00,000 a month, are shared in the ratio of applications processed. In the month 300 home-loan and 700 car-loan applications were processed. What is the cost per home-loan application, in rupees?
= 2100
> Salaries: 60% × ₹8,00,000 = ₹4,80,000. Overheads: ₹5,00,000 × 300 ÷ 1,000 = ₹1,50,000. (₹4,80,000 + ₹1,50,000) ÷ 300 = ₹2,100. Using 60% for the overheads as well gives ₹2,600; sharing the salaries by applications gives ₹1,300: each cost goes on its own basis.

Q: Which of these are capital costs of a toll road project? Select all that apply.
- [x] Land acquisition
- [x] Contingency allowance
- [x] Interest during the construction period
- [ ] Toll collection expenses
- [ ] Periodic painting of railings
- [ ] Interest for servicing term loans after the road opens
> SM 12.37–12.38: capital costs are incurred during construction; toll collection, periodic maintenance and interest for servicing term loans are operating and maintenance costs.

Q: In an IT company, Java training given to software engineers that will be useful in several Java projects is treated as:
- [ ] A direct cost of the project running when the training was given
- [x] Service overhead, apportioned over projects
- [ ] Effort cost of the trainees
- [ ] A capital cost
> SM 12.34: travel and training incurred for a project are allocated to it; when not identifiable with one project, they are service overhead.
:::

## Recap

- Hotels: room-day or guest-day; occupancy by season; weights for room types and off-season rent; rent = cost ÷ (equivalent room-days × (1 − c − p)).
- Hospitals: OP per out-patient, IP per room-day, scanning per case, laundry per 100 items; fixed vs variable; BEP in patient-days.
- IT and ITES: projects; effort estimation; direct vs support manpower; hardware, travel and training direct if identifiable, else service overhead; effort cost = salary + part of common overhead.
- Toll roads: capital costs (land, materials, labour, construction overheads, contingency, interest during construction) vs O&M (toll collection, administration, routine and periodic maintenance, interest for servicing term loans); BOT; user fee = distance × rate per km, rounded to the nearest multiple of five when the question asks.
- Education: one-time, recurring and other income; four kinds of cost centre.
- Insurance: ABC with pre- and post-product development activities; cost per policy and per rupee of insured value.
- Banks: cost per application = (direct labour + share of overheads applicable) ÷ applications processed.
- Power: kWh; standing (rent, insurance, depreciation, time salaries, administration), running (fuel, water, production wages), maintenance (meters, furnaces, tools). Same recipe, different katori.

## Flashcards

Q:: Cost unit of a hotel, and what is taken into account in computing it?
A:: Guest-day or room-day, with the estimated occupancy rate at different points of time (peak season, lean season).

Q:: Units of cost for a hospital's out-patient, in-patient, scanning and laundry departments?
A:: Per out-patient; per room-day; per case; per 100 items laundered.

Q:: Hospital cost segregation: examples of fixed and variable costs?
A:: Fixed (based on timelines): staff salaries, depreciation on building and equipment. Variable: laundry, food supplied to patients, power.

Q:: What is BOT?
A:: Build-Operate-Transfer: the private sector designs, finances, constructs and operates the facility and, after the specified concession period, transfers ownership to the Government.

Q:: Capital costs of a toll road project?
A:: Preliminary and pre-operative expenses, land acquisition, materials, labour, overheads in actual construction, contingency allowance, interest during construction period.

Q:: Operating and maintenance costs of a toll road?
A:: Toll collection expenses; administrative expenses for day-to-day operation; maintenance (routine and periodic); interest for servicing term loans.

Q:: Toll rate formula in the Study Material?
A:: User fee = total distance × toll rate per km, rounded off to the nearest multiple of five.

Q:: IT and ITES: what is effort estimation, and how is effort costed?
A:: Identifying the skill level and duration of each activity of a project; effort is costed per person-day, person-week or person-month.

Q:: IT and ITES: when are hardware, software, travel and training a direct project cost?
A:: When identifiable with (incurred for) the project; otherwise they are service overhead.

Q:: Insurance ABC: the two groups of activities?
A:: Pre-product development (market research, product development) and post-product development (selling of policy; processing of claims).

Q:: Cost unit of a power house generating electricity?
A:: Kilowatt-hour (kWh), commonly known as a "Unit".

Q:: Four kinds of cost centre in an educational institution?
A:: Primary or direct (departments); service (laboratory, library, sports); students' self-supporting services (transport, hostel and mess); administration (research and improvement, examination).
