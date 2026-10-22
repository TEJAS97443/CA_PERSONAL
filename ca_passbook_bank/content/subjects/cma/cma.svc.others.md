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

Tapri has grown far beyond chai. In one week Kesar asks Ritu to price a hill-station inn at Pachmarhi, the ICU that Tapri's charitable trust runs in Jabalpur, the captive power plant at the samosa factory, the toll road near Indore in which Tapri has taken a stake, an ordering app and a term-insurance plan for the delivery riders.

> **Kesar:** Six businesses, six headaches. One formula for all, na? Total cost divided by customers.
> **Ritu:** The idea is the same, Kesar-ji. The unit changes. A room is sold by the night, an ICU bed by the patient-day, the power plant by the unit of electricity, a toll road by the vehicle.
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
2. **Equivalent room-days**: weight each type (a Deluxe room at 1.5 times a Standard) and each season (off-season at half rent) to one base: full-rent Standard room-days (SM Illustrations 6 and 7, 12.23–12.28).
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

:::: example Kulhad Inn, Pachmarhi: two room types, two seasons
Tapri opens Kulhad Inn at the hill station of Pachmarhi with 30 Standard rooms and 10 Deluxe rooms. The rent of a Deluxe room is to be 1.5 times that of a Standard room. For six months (the season) occupancy is 80%; for the other six (the off-season) it is 40%, and half the full rent is charged. Take 30 days a month. Expenses for the year:

| Particulars | Amount |
|---|---|
| Staff salaries (excluding room attendants) | ₹18,00,000 |
| Room attendants, paid on occupancy | ₹100 per occupied room-day |
| Complimentary breakfast | ₹80 per occupied room-day |
| Laundry | ₹40 per occupied room-day |
| Power and heating | ₹4,80,000 |
| Repairs | ₹2,40,000 |
| Building | ₹1.5 crore; depreciation 5% straight-line |
| Furniture | ₹30 lakh; depreciation 15% straight-line |
| Miscellaneous | ₹49,200 |

A booking app takes a commission of 10% of takings, and Tapri wants a profit of 20% of takings.

**Required:** Calculate the rent per room-day for each type of room in the season and in the off-season.

::: answer Show the working
**Working note 1: room-days.** Occupied room-days = rooms × occupancy × 180 days in each season: Standard 30 × 80% × 180 = 4,320 and 30 × 40% × 180 = 2,160; Deluxe 10 × 80% × 180 = 1,440 and 10 × 40% × 180 = 720. Weights: Deluxe 1.5, off-season ½, so a Deluxe off-season room-day is 0.75 of a full-rent Standard room-day.

| Rooms, season | Occupied | Weight | Equivalent |
|---|---:|---:|---:|
| Standard, season | 4,320 | 1 | 4,320 |
| Standard, off-season | 2,160 | ½ | 1,080 |
| Deluxe, season | 1,440 | 1.5 | 2,160 |
| Deluxe, off-season | 720 | 0.75 | 540 |
| **Total** | **8,640** | | **8,100** |

Equivalent = full-rent Standard room-days.

**Working note 2: statement of total cost**

| Particulars | Amount (₹) |
|---|---:|
| Staff salaries | 18,00,000 |
| Room attendants (8,640 × ₹100) | 8,64,000 |
| Breakfast (8,640 × ₹80) | 6,91,200 |
| Laundry (8,640 × ₹40) | 3,45,600 |
| Power and heating | 4,80,000 |
| Repairs | 2,40,000 |
| Depreciation on building (₹1,50,00,000 × 5%) | 7,50,000 |
| Depreciation on furniture (₹30,00,000 × 15%) | 4,50,000 |
| Miscellaneous | 49,200 |
| **Total cost** | **56,70,000** |

**Rent.** Let R be the full rent of a Standard room-day. Takings = 8,100R = ₹56,70,000 + (0.10 + 0.20) × 8,100R, so 5,670R = ₹56,70,000 and **R = ₹1,000**. Takings = ₹81,00,000; commission ₹8,10,000; profit ₹16,20,000.

| Rent per room-day (₹) | Season | Off-season |
|---|---:|---:|
| Standard | 1,000 | 500 |
| Deluxe (× 1.5) | 1,500 | 750 |

Check: 4,320 × ₹1,000 + 2,160 × ₹500 + 1,440 × ₹1,500 + 720 × ₹750 = ₹81,00,000. The per-room-day costs use the 8,640 occupied room-days; only the rent uses the 8,100 equivalent ones.
:::
::::

::::: example Narmada Seva Trust: is the ICU paying its way?
Tapri's charitable trust runs a 20-bed ICU in a hired building in Jabalpur. In 2025-26 all 20 beds were occupied for 150 days, 15 beds for 170 days and 10 beds for 45 days. On the busiest days up to 4 extra beds were hired at ₹200 per bed per day: 400 bed-days in all. The ICU recovers ₹4,500 a patient-day on average.

| Particulars | Amount |
|---|---|
| Rent | ₹1,50,000 a month |
| Nurses (12) | ₹30,000 a month each |
| Supervisors (2) | ₹45,000 a month each |
| Ward attendants (6) | ₹15,000 a month each |
| Visiting doctors, paid on patients attended and time spent | ₹3,20,000 a month on average |
| Food to patients | ₹300 a patient-day |
| Medicines and consumables | ₹900 a patient-day |
| Laundry | ₹100 a patient-day |
| Repairs (fixed) | ₹2,70,000 a year |
| Administration expenses allocated | ₹18,00,000 a year |

**Required:**

(i) Calculate the profit per patient-day.

(ii) Find the break-even point in patient-days, and as a percentage of the normal capacity of 20 beds for 365 days.

:::: answer Show the working
**Working note: patient-days** = 20 × 150 + 15 × 170 + 10 × 45 + 400 extra = 3,000 + 2,550 + 450 + 400 = **6,400**.

**Statement of profitability for 2025-26**

| Particulars | Amount (₹) |
|---|---:|
| Income (6,400 × ₹4,500) | 2,88,00,000 |
| Doctors' fees (₹3,20,000 × 12) | 38,40,000 |
| Food (6,400 × ₹300) | 19,20,000 |
| Medicines and consumables (6,400 × ₹900) | 57,60,000 |
| Laundry (6,400 × ₹100) | 6,40,000 |
| Hire of extra beds (400 × ₹200) | 80,000 |
| **Total variable costs** | **1,22,40,000** |
| **Contribution** | **1,65,60,000** |
| Rent (₹1,50,000 × 12) | 18,00,000 |
| Nurses (12 × ₹30,000 × 12) | 43,20,000 |
| Supervisors (2 × ₹45,000 × 12) | 10,80,000 |
| Ward attendants (6 × ₹15,000 × 12) | 10,80,000 |
| Repairs (fixed) | 2,70,000 |
| Administration allocated | 18,00,000 |
| **Total fixed costs** | **1,03,50,000** |
| **Profit** | **62,10,000** |

**(i)** Profit per patient-day = ₹62,10,000 ÷ 6,400 = **₹970.31**.

**(ii)** Contribution per patient-day = ₹1,65,60,000 ÷ 6,400 = ₹2,587.50.

$$\text{BEP} = \frac{1{,}03{,}50{,}000}{2{,}587.50} = 4{,}000 \text{ patient-days} \qquad \frac{4{,}000}{20 \times 365} = 54.79\%$$

::: diagram Narmada Seva ICU: break-even chart
{"type": "plot", "h": 320, "x": [0, 7000], "y": [0, 32000000], "legend": "top-left",
 "xlabel": "patient-days in the year", "ylabel": "amount (₹)",
 "xticks": [[0, "0"], [2000, "2,000"], [4000, "4,000"], [6400, "6,400"]],
 "yticks": [[0, "0"], [8000000, "80,00,000"], [16000000, "1,60,00,000"], [24000000, "2,40,00,000"], [32000000, "3,20,00,000"]],
 "series": [
  {"label": "income", "fn": "4500*x", "color": "a"},
  {"label": "total cost", "fn": "10350000+1912.5*x", "color": "d"},
  {"label": "fixed cost", "fn": "10350000", "color": "mute", "dash": true},
  {"pts": [[4000, 0], [4000, 18000000]], "color": "mute", "dash": true, "legend": false},
  {"pts": [[6400, 0], [6400, 28800000]], "color": "mute", "dash": true, "legend": false}],
 "points": [{"x": 4000, "y": 18000000, "label": "BEP: 4,000", "pos": "left"}],
 "caption": "Blue: income at ₹4,500 a patient-day; orange: total cost (₹1,03,50,000 fixed plus ₹1,912.50 a patient-day). They cross at 4,000 patient-days; the year's 6,400 leave a margin of safety of 2,400 patient-days."}
:::

Doctors paid on the patients they attend are a variable cost, as in SM Illustration 8; on a fixed monthly retainer they would join the fixed costs and raise the break-even point.
::::
:::::

:::: example Malwa Expressway: toll rates for three kinds of vehicle
Malwa Expressway Ltd, in which Tapri holds a stake, built an 80 km highway near Indore under BOT and collects tolls at one plaza. It expects 48 lakh vehicles a year: 70% cars and jeeps, 20% buses and light commercial vehicles (LCVs), 10% trucks. A bus or LCV is to pay twice the car toll, a truck 3.5 times. Monthly costs (30 days):

| Personnel | Shifts | Persons per shift | ₹ per day each |
|---|---:|---:|---:|
| Toll collectors | 3 | 8 | 700 |
| Supervisors | 3 | 2 | 1,100 |
| Security staff | 3 | 6 | 600 |
| Plaza manager | 2 | 1 | 2,500 |

Annual costs: electricity ₹18,00,000; telephone and network ₹3,60,000; routine maintenance ₹48,00,000; periodic maintenance (overlays, painting of railings) ₹24,00,000; depreciation and amortisation ₹9,60,00,000; interest for servicing term loans ₹5,64,76,800. The company wants a profit of 20% of takings.

**Required:**

(i) Calculate the total cost per month.

(ii) Calculate the toll per vehicle of each type, and round it to the nearest multiple of ₹5.

(iii) Calculate the car toll per km of the highway.

::: answer Show the working
**(i) Statement of cost for a month**

| Particulars | Amount (₹) |
|---|---:|
| Toll collectors (3 × 8 × ₹700 × 30) | 5,04,000 |
| Supervisors (3 × 2 × ₹1,100 × 30) | 1,98,000 |
| Security staff (3 × 6 × ₹600 × 30) | 3,24,000 |
| Plaza manager (2 × 1 × ₹2,500 × 30) | 1,50,000 |
| Electricity (₹18,00,000 ÷ 12) | 1,50,000 |
| Telephone and network (₹3,60,000 ÷ 12) | 30,000 |
| Routine maintenance (₹48,00,000 ÷ 12) | 4,00,000 |
| Periodic maintenance (₹24,00,000 ÷ 12) | 2,00,000 |
| Depreciation and amortisation (₹9,60,00,000 ÷ 12) | 80,00,000 |
| Interest for servicing term loans (₹5,64,76,800 ÷ 12) | 47,06,400 |
| **Total cost per month** | **1,46,62,400** |

**(ii) Toll per vehicle**

Takings needed = ₹1,46,62,400 ÷ (1 − 0.20) = ₹1,83,28,000. Vehicles a month = 48,00,000 ÷ 12 = 4,00,000: cars 2,80,000; buses and LCVs 80,000; trucks 40,000.

Let the car toll be x. Then 2,80,000x + 80,000 × 2x + 40,000 × 3.5x = 5,80,000x = ₹1,83,28,000, so **x = ₹31.60**.

| Vehicle | Toll (₹) | Rounded to nearest ₹5 |
|---|---:|---:|
| Car or jeep | 31.60 | 30 |
| Bus or LCV (× 2) | 63.20 | 65 |
| Truck (× 3.5) | 110.60 | 110 |

**(iii)** Car toll per km = ₹31.60 ÷ 80 km = **₹0.395** (User fee = total distance × toll rate per km).

The rounding is done because the question asks for it, following the Study Material's toll-rate formula (SM 12.38–12.39); when a question does not ask, present the exact rates, as ICAI's own answers do (SM 12.40, 12.67). At the rounded rates the month's takings would be ₹1,80,00,000, ₹3,28,000 short of the target, so show the exact rates before the rounded ones.
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
Bunty divides the takings of ₹81,00,000 by 40 rooms × 360 days = 14,400 room-days and gets a rent of ₹562.50 for every room on every day. Occupancy was 80% and 40%, and the off-season pays half. **Fix:** room-days occupied, then weights: 8,100 equivalent room-days and ₹1,000.
:::

::: mistake Per-room costs on equivalent room-days
Charging room attendants on the 8,100 equivalent room-days. **Fix:** costs paid per occupied room-day use the 8,640 room-days actually occupied; equivalents are only for sharing out the rent.
:::

::: mistake Doctors on a per-patient fee shown as fixed
In the Narmada Seva ICU, moving the doctors' ₹38,40,000 into fixed costs gives a contribution of ₹3,187.50 a patient-day and a break-even point of about 4,452 patient-days instead of 4,000. **Fix:** pay that varies with patients attended is variable (SM Illustration 8).
:::

::: mistake The training course charged to one project
Java training useful to many projects charged in full to the project in hand. **Fix:** travel and training incurred for a project are direct; anything useful across projects is service overhead (SM 12.34).
:::

## Practice

::: quiz Check yourself
Q: Tapri's captive power plant generated 12,00,000 kWh. Its fixed costs (supervision, administration, depreciation) were ₹30,00,000, operating labour ₹18,00,000 and repairs ₹6,00,000. It generates 4 kWh per kg of coal costing ₹5 a kg. What is the cost per kWh, in rupees?
= 5.75
> Coal = 12,00,000 ÷ 4 × ₹5 = ₹15,00,000. Total = ₹30,00,000 + ₹18,00,000 + ₹6,00,000 + ₹15,00,000 = ₹69,00,000; ÷ 12,00,000 kWh = ₹5.75.

Q: Case scenario. Kavach Life Ltd launched a term plan for Tapri's delivery riders. The plan's total cost for the year was ₹2,88,00,000; it sold 600 policies with a total insured value of ₹1,800 crore. Dev asks for the cost per rupee of insured value. Which is correct?
- [x] ₹0.0016
- [ ] ₹48,000
- [ ] ₹0.016
- [ ] ₹0.16
> ₹2.88 crore ÷ ₹1,800 crore = ₹0.0016. ₹48,000 is the cost per policy (₹2,88,00,000 ÷ 600); the other two misplace the decimal.

Q: A bank's home-loan processors are paid ₹6,00,000 a month. The loan department's overheads are ₹4,40,000, of which ₹40,000 is a car-loan advertising campaign that has nothing to do with home loans; 25% of the other overheads relate to home loans. 400 home-loan applications are processed. What is the cost per application, in rupees?
= 1750
> (₹6,00,000 + 25% × ₹4,00,000) ÷ 400 = ₹7,00,000 ÷ 400 = ₹1,750. Taking 25% of all ₹4,40,000 gives ₹1,775: a cost traceable to another product is not apportioned to this one.

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
