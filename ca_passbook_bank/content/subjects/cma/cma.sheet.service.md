---
id: cma.sheet.service
title: Cost sheet for the service sector
minutes: 30
needs: cma.sheet.mfg
tags: service cost statement, operating cost sheet, standing charges, running charges, maintenance charges, cost per unit of service, takings
labs:
summary: A service's cost statement has no stocks to adjust; it is built by function or by variability (standing, running and maintenance charges), divided by the service unit, and priced on takings.
---

## In plain words

### A canteen has no closing stock of lunches

Tapri runs the canteen at an IT park in Pune: 1,600 lunches a day, 25 days a month. Kesar asks Ritu for the same cost sheet she makes for the samosa factory.

> **Kesar:** Same format, na? Prime cost, works cost, closing stock...
> **Ritu:** Per unit, please, and the unit is a meal. A lunch not eaten at one o'clock is not inventory, it is waste. And the rent and the cooks cost the same whether we serve 30,000 meals or 40,000.

So Ritu changes two things. First, there are no tiers for stock: a service cannot be stored, so there is no work-in-process or finished goods to carry forward. Second, she groups costs by how they behave. Rent, the manager's and cooks' salaries, insurance and the time-based depreciation of the kitchen are **standing charges**: fixed for the month. Food, gas, plates and the helpers paid per meal are **running charges**: they move with every meal. Repairs of the kitchen equipment are **maintenance charges**, partly fixed and partly variable. Totalled and divided by 40,000 meals, they give a **cost per meal**, and the price per meal is built on it.

The same idea prices a training course (cost per batch, then per trainee), a software project (cost per project) or a loan department (cost per application): collect the period's costs, arrange them in a statement, express them per **unit of service**.

::: analogy The dhaba's slate
A highway dhaba owner chalks three lines on a slate each month: what he pays even if no truck stops (rent, the cook's salary), what each plate costs him (atta, dal, gas), and the tandoor's repairs, which grow with use but never fall to zero. Divide the slate by plates served and he knows his cost per thali; add his margin and the tax he owes on every rupee he takes, and he knows his price.
:::

::: key
A service cost statement has no stock adjustments. It is prepared on functional classification or on variability (fixed or standing charges, variable or running charges, semi-variable or maintenance charges), and the total is divided by the service's cost unit (per meal, passenger-km, patient-day, project) to get cost per unit, then the price.
:::

## How it works

Service costing, "also known as operating costing" (SM 12.2), is used **internally** for support services such as a staff canteen, a boiler house or an IT department, and **externally** when the service is sold, as by a transporter, a hotel or an insurer (SM 12.2). Either way, "all costs incurred are collected, accumulated for a certain period or volume, recorded in the cost accounting system and then expressed in terms of a cost unit of service" (SM 12.2).

### Why the manufacturer's format changes

ICAI gives four differences between service costing and product costing (SM 12.3):

1. **Tangibility**: services are intangible and cannot be stored, so there is no inventory for services.
2. **Cost units**: composite cost units are used to measure cost and express output (passenger-km, tonne-km, patient-day).
3. **Material vs employee cost**: employee cost is a bigger element than material cost.
4. **Traceability of costs**: indirect costs such as administration overheads are a significant proportion, as services depend heavily on support services and tracing costs may not be economically feasible.

The cost sheet chapter itself says so: the cost statement for services "is also prepared but the format and presentation may differ as per the information requirement" (SM 6.9).

### Two ways to arrange the statement

"The cost statement for services may be prepared either on the basis of functional classification as done for product costing or on the basis of variability" (SM 12.10). On variability it has three heads: **fixed costs or standing charges**, **variable costs or operating expenses**, and **semi-variable costs or maintenance expenses**; with no information about semi-variable costs, only fixed and variable heads are shown (SM 12.10).

::: diagram The two layouts of a service cost statement
{"type": "nest", "w": 430, "root": {"title": "Statement of cost of a service", "note": "for a period", "mono": false, "color": "mute", "children": [
  {"title": "On variability (operating cost sheet)", "mono": false, "color": "a", "rows": [["A. Standing charges", "fixed"], ["B. Running charges", "variable"], ["C. Maintenance charges", "semi-variable"]]},
  {"title": "On function (as for a product)", "mono": false, "color": "d", "rows": [["Direct material", "often small"], ["Direct employee cost", "often largest"], ["Direct expenses", "traced"], ["Overheads", "apportioned"]]}]},
 "caption": "Either layout ends in a total cost for the period, divided by the service units to give cost per unit. Neither has stock adjustments."}
:::

### Two items that change sides

- **Depreciation**: "If related to effluxion of time or calculated on time basis, will be treated as fixed. However, if the depreciation is calculated on the basis of activity level or usage, it will be treated as variable cost" (SM 12.10).
- **Interest**: "Interest and finance charges shall be presented in the cost statement as a separate item of cost of sales. In general, interest is treated as fixed cost, unless otherwise given" (SM 12.10). ICAI's toll-plaza answer included interest in the month's total cost (September 2025 Q2(a)).

A head can also move with the facts: a driver's salary is a standing charge if paid monthly and a running charge if related to operations (SM 12.12).

### From total cost to cost per unit and price

::: steps
1. **Collect the period's costs** under the heads (or the functions) and total them.
2. **Count the service units** for the same period: meals served, passenger-km, patient-days, sessions, applications. Composite units are built in [[cma.svc.basics|service costing and composite cost units]].
3. **Cost per unit** = total cost ÷ total units, with a per-unit column beside each head.
4. **Price**: add profit, and any charge that is a percentage of the price or takings (a commission, a licence fee, a passenger tax). Since those are percentages of takings, solve for takings: Takings = costs + c% × Takings + p% × Takings (SM Illustration 3, 12.15–12.16).
:::

The method of costing follows the service too: job costing suits customised software or healthcare, process costing utilities such as power or water, and joint-product costing bundled services such as telecom or events (SM 12.11).

## Formats and formulas

*Reproduce the operating cost sheet from memory.* Each head (A standing charges, B running charges, C maintenance charges) is followed by its own total and a per-unit figure. A commission or tax on takings is shown either inside running charges (SM Illustration 3, 12.16) or on its own line after the A + B + C total (January 2025 Q4(a): "total cost before commission", then commission); either way its amount is solved from takings.

| Operating cost sheet for … (period) | Total (₹) | Per unit (₹) |
|---|---:|---:|
| **A. Standing (fixed)** | | |
| Rent, insurance, taxes | xxx | |
| Salaries (time basis) | xxx | |
| Depreciation (time basis) | xxx | |
| Interest, administration | xxx | |
| **Total standing charges** | **xxx** | **xxx** |
| **B. Running (variable)** | | |
| Fuel, food, consumables | xxx | |
| Wages per trip or unit | xxx | |
| Depreciation (usage basis) | xxx | |
| **Total running charges** | **xxx** | **xxx** |
| **C. Maintenance** | | |
| Repairs, tyres, spares | xxx | **xxx** |
| **Total cost (A + B + C)** | **xxx** | **xxx** |
| Add: Charges on takings | xxx | xxx |
| Add: Profit | xxx | xxx |
| **Takings / price** | **xxx** | **xxx** |

On functional classification the heads are those of [[cma.sheet.mfg|the manufacturer's cost sheet]] (direct material, direct employee cost, direct expenses, overheads), without the work-in-process and finished goods lines.

::: formula Cost per unit of service
$$\text{Cost per unit} = \frac{\text{Total cost of the period}}{\text{Total service units of the period}}$$
Units: per meal, per passenger-km, per patient-day, per room-day, per project, per application (SM 12.3–12.4).
:::

::: formula Takings when charges are a percentage of takings
$$\text{Takings} = \frac{\text{Total cost}}{1 - c\% - p\%}$$
c = commission, licence fee or tax as a percentage of takings; p = profit as a percentage of takings. The equation behind it: T = cost + cT + pT (SM 12.16).
:::

::: definition Statement of costs for service sectors (SM 12.10)
For preparing a statement of cost or a cost sheet for service sector, costs are usually collected and accumulated for a specified period viz. a month, quarter or a year. The cost statement may be prepared either on the basis of functional classification or on the basis of variability: (1) fixed costs or standing charges; (2) variable costs or operating expenses; (3) semi-variable costs or maintenance expenses.
:::

## Worked examples

:::: example The IT-park canteen: cost per meal and price per meal
Tapri's canteen serves 1,600 meals a day for 25 days a month. Monthly data:

| Particulars | Amount |
|---|---:|
| Kitchen rent | ₹1,20,000 a month |
| Salaries of the manager and cooks (monthly) | ₹2,40,000 a month |
| Kitchen equipment: cost ₹18,00,000, life 5 years, straight line | |
| Insurance | ₹16,000 a month |
| Interest on the equipment loan | ₹14,000 a month |
| Food materials | ₹42 a meal |
| LPG | ₹4 a meal |
| Plates and packing | ₹3 a meal |
| Helpers, paid per meal served | ₹5 a meal |
| Repairs and maintenance of equipment | ₹20,000 a month + ₹1 a meal |

The IT park charges a licence fee of 4% of takings, and Tapri wants a profit of 16% of takings.

**Required:**

(i) Prepare an operating cost sheet for the month showing standing, running and maintenance charges, in total and per meal.

(ii) Calculate the price to be charged per meal.

::: answer Show the working
**Working note.** Meals = 1,600 × 25 = 40,000. Depreciation = ₹18,00,000 ÷ 5 ÷ 12 = ₹30,000 a month (time basis, so a standing charge).

**(i) Operating cost sheet, canteen, for the month** (40,000 meals)

| Particulars | Total (₹) | Per meal (₹) |
|---|---:|---:|
| Rent | 1,20,000 | |
| Salaries (monthly) | 2,40,000 | |
| Depreciation (time basis) | 30,000 | |
| Insurance | 16,000 | |
| Interest | 14,000 | |
| **A. Standing charges** | **4,20,000** | **10.50** |
| Food (₹42) | 16,80,000 | |
| LPG (₹4) | 1,60,000 | |
| Plates and packing (₹3) | 1,20,000 | |
| Helpers (₹5) | 2,00,000 | |
| **B. Running charges** | **21,60,000** | **54.00** |
| **C. Maintenance** (20,000 + 40,000 × ₹1) | **60,000** | **1.50** |
| **Total cost (A + B + C)** | **26,40,000** | **66.00** |

**(ii) Price per meal**

Let takings = T. T = ₹26,40,000 + 0.04T + 0.16T, so 0.80T = ₹26,40,000 and **T = ₹33,00,000**.

| Particulars | Total (₹) | Per meal (₹) |
|---|---:|---:|
| Total cost | 26,40,000 | 66.00 |
| Licence fee (4% of ₹33,00,000) | 1,32,000 | 3.30 |
| Profit (16% of ₹33,00,000) | 5,28,000 | 13.20 |
| **Takings** | **33,00,000** | **82.50** |

Price per meal: **₹82.50**. Adding 20% to cost would give ₹79.20 and leave Tapri short, because the fee and the profit are fractions of the price, not of the cost.
:::
::::

::::: example Tapri Chai Academy: what to charge a trainee
Tapri runs an 8-week barista-and-chaiwala course. It rents a training hall for ₹18,000 a week, seating 60 trainees. There are 2 sessions a day, 6 days a week. The master trainer is paid ₹2,500 a session, a travel allowance of ₹400 a day and refreshments costing ₹1,350 a week. Every Sunday Kesar gives a guest talk billed at ₹6,000, travel included. Tea, milk and spices used in practice cost ₹150 per trainee per week.

**Required:**

(i) Calculate the total cost of a batch if it is full.

(ii) Find the minimum fee per trainee to cover the cost of a full batch.

(iii) Tapri charges ₹12,000 a trainee and wants a margin of 20% on the fees. Calculate the minimum number of trainees, and the percentage of seats that must be filled.

:::: answer Show the working
**(i) Cost of a full batch**

| Particulars | Amount (₹) |
|---|---:|
| Hall (₹18,000 × 8 weeks) | 1,44,000 |
| Trainer's honorarium (2 × 6 × 8 = 96 sessions × ₹2,500) | 2,40,000 |
| Travel (6 × 8 = 48 days × ₹400) | 19,200 |
| Refreshments (₹1,350 × 8) | 10,800 |
| Sunday talks (8 × ₹6,000) | 48,000 |
| **Fixed cost of the batch** | **4,62,000** |
| Practice materials (60 × ₹150 × 8) | 72,000 |
| **Total cost of a full batch** | **5,34,000** |

**(ii) Minimum fee, full batch** = ₹5,34,000 ÷ 60 = **₹8,900** a trainee.

**(iii) Minimum batch size at ₹12,000 a trainee**

A 20% margin on fees means cost may be at most 80% of fees. Each trainee brings 80% × ₹12,000 = ₹9,600 for cost and uses ₹1,200 of materials, so ₹8,400 is left for the fixed cost:

$$\text{Trainees} = \frac{4{,}62{,}000}{9{,}600 - 1{,}200} = 55 \qquad \frac{55}{60} = 91.67\%$$

Check at 55: cost = ₹4,62,000 + 55 × ₹1,200 = ₹5,28,000; fees = ₹6,60,000; margin ₹1,32,000 = 20% of fees. At 54 the margin is 18.7%.

::: diagram Fee needed per trainee against batch size
{"type": "plot", "h": 300, "x": [30, 60], "y": [8000, 22000], "clip": true,
 "xlabel": "trainees in the batch", "ylabel": "fee per trainee (₹)", "legend": "outside",
 "xticks": [30, 35, 40, 45, 50, 55, 60],
 "yticks": [[8000, "8,000"], [12000, "12,000"], [16000, "16,000"], [20000, "20,000"]],
 "series": [
  {"label": "fee needed for a 20% margin", "fn": "(462000/x+1200)/0.8", "color": "a"},
  {"label": "fee charged, ₹12,000", "fn": "12000", "color": "d", "dash": true},
  {"pts": [[55, 8000], [55, 12000]], "color": "mute", "dash": true, "legend": false}],
 "points": [{"x": 55, "y": 12000, "label": "55 trainees", "pos": "above"}],
 "caption": "The fixed ₹4,62,000 spreads over more trainees as the batch fills, so the fee needed falls; it meets the ₹12,000 actually charged at 55 trainees."}
:::

The pattern is ICAI's (January 2026 Q3(b), September 2024 Q1(a)), with one twist ICAI's versions did not have: a cost per trainee, which must come off each trainee's fee before the fixed cost is covered.
::::
:::::

:::: example Tapri Tech: a project cost sheet on functional lines
Tapri's IT team pays its 6 developers ₹54,00,000 a year in all, its 2 team leads ₹24,00,000 and its project manager ₹18,00,000. Office rent and utilities are ₹19,20,000 a year and administration and support staff ₹28,80,000; overheads are absorbed as a percentage of salaries. A hotel chain wants an ordering app. It will take 4 months, with 3 developers and 1 team lead full time and the project manager for 1 month. Cloud servers rented for the project cost ₹60,000; two test phones bought for it cost ₹36,000 each and will last 2 years.

**Required:** Prepare the project cost sheet and the price to quote at a margin of 25% on price.

::: answer Show the working
Overhead rate = (₹19,20,000 + ₹28,80,000) ÷ (₹54,00,000 + ₹24,00,000 + ₹18,00,000) = ₹48,00,000 ÷ ₹96,00,000 = **50% of salaries**. Monthly salaries: developer ₹75,000, team lead ₹1,00,000, project manager ₹1,50,000.

| Project cost sheet | Amount (₹) |
|---|---:|
| Developers (3 × ₹75,000 × 4 months) | 9,00,000 |
| Team lead (₹1,00,000 × 4 months) | 4,00,000 |
| Project manager (₹1,50,000 × 1 month) | 1,50,000 |
| **Direct employee cost** | **14,50,000** |
| Overheads (50% of salaries) | 7,25,000 |
| Cloud servers (direct expense) | 60,000 |
| Depreciation of test phones (₹72,000 ÷ 24 × 4) | 12,000 |
| **Total project cost** | **22,47,000** |
| Profit (25% on price = 33⅓% on cost) | 7,49,000 |
| **Price to be quoted** | **29,96,000** |

Employee cost is about 65% of the project's cost (₹14,50,000 of ₹22,47,000), which is ICAI's third difference between service and product costing. The layout follows SM Illustration 9 (12.35–12.36).
:::
::::

## Under the hood

### When a cost statement is asked "for the month" but costs are annual

Convert everything to the period asked: annual insurance ÷ 12, quarterly repairs × 4 ÷ 12. ICAI's operating cost answers state the period in the heading and show both "per annum" and "per month" columns where the question gives mixed periods (January 2025 Q4(a)).

### Semi-variable costs with no split

If only a total is given for a semi-variable cost and no behaviour is stated, show it under maintenance; if the question says nothing at all about semi-variable costs, use only fixed and variable heads (SM 12.10).

### Next door

Tonne-km, passenger-km and absolute against commercial units: [[cma.svc.basics|service costing and composite cost units]]. Bus fares, school buses and fleet costs: [[cma.svc.transport|transport costing]]. Hotels, hospitals, power, toll roads, IT, education and insurance: [[cma.svc.others|other service industries]].

## Exam angle

::: exam Where service cost statements appeared, May 2024 to September 2026
In the documents read for this lesson:

- **Training batch, 5 to 6 marks:** cost per batch, minimum fee for a full batch, then the fee or the fill needed for a margin on the fee: September 2024 Q1(a) (5 marks, TOEFL institute, 80% filled, 25% margin); January 2026 Q3(b) (6 marks, air-hostess institute, ₹14,800 fee, 20% margin, minimum 62.5% filled).
- **Cost per application, 8 marks:** January 2026 Q3(a), a bank's gold-loan and car-loan applications with overheads allocated by percentage.
- **Statement of cost and price on takings, 6 to 10 marks:** toll plaza, total monthly cost including interest, then toll rates at 20% profit on takings: September 2025 Q2(a) (10 marks). Bus fare with 10% commission on takings and 15% profit: January 2025 Q4(a) (8 marks). Operating cost statement with a passenger tax of 22% and profit of 25% on takings: MTP Series I September 2024 Q3(b) (8 marks); monthly operating cost sheet and fare: MTP Series II September 2026 Q2(b) (6 marks).
- **Theory:** "Differentiate between service costing and product costing": RTP September 2024 Q19(b). "What do you understand by operating costs? Describe its essential features": RTP May 2025 Q20(b).
:::

::: exam The traps ICAI set
- Charges and profit stated "on takings": solve T = cost + cT + pT; never add them to cost.
- Mixed periods (per month, per quarter, per annum) in one list.
- Depreciation on a time basis (standing charge) against an activity basis (running charge).
- A full batch versus a partly filled one: the fixed cost does not shrink with the batch.
:::

::: trick The takings divisor
If commission and profit are c% and p% of takings, takings = cost ÷ (1 − c − p). For 10% and 15%: cost ÷ 0.75. Condition: both are percentages of takings, not of cost; a percentage of cost is added to cost first.
:::

## Answer frame

**Differentiate between service costing and product costing.** ICAI's four points, in ICAI's order (SM 12.3), as a table. ICAI's own answer (RTP September 2024 Q19(b)) states each point for services only; the product column is the contrast that makes it a "differentiate" answer.

| Basis | Service costing | Product costing |
|---|---|---|
| Tangibility | Services are intangible and cannot be stored: no inventory | Products can be stored: inventories of WIP and finished goods |
| Cost units | Composite cost units (passenger-km, patient-day) | Simple units (per unit, per batch, per job) |
| Material vs employee cost | Employee cost is the major element | Material cost is usually the major element |
| Traceability | Indirect costs such as administration are significant; tracing may not be economically feasible | Larger share of costs traced directly |

**What do you understand by operating costs? Describe their features.** ICAI's answer (RTP May 2025 Q20(b)): (1) operating costs are the costs incurred by undertakings which do not manufacture any product but provide a service, such as transport concerns, electricity undertakings, hospitals and theatres; service costing is also known as operating costing (SM 12.2). (2) They are classified under three categories, with examples: operating and running charges (variable: petrol, diesel, lubricants), maintenance charges (semi-variable: tyres, repairs, spares) and fixed or standing charges (garage rent, insurance, road licence, depreciation, interest on capital, salary of the operating manager) (SM 12.10, 12.12). (3) The cost unit is composite, such as passenger-km or kWh (SM 12.3). Add internal and external applications (SM 12.2) if the marks allow.

**Numerical answer, in order:** working notes (units of service, period conversions, depreciation basis); the statement with A, B, C heads, totals and per-unit column; the takings equation; the final rate in the question's words ("fare per passenger-km", "fee per trainee").

## Common mistakes

::: mistake Hall of Shame: the licence fee charged on cost
Ritu's trainee priced the canteen meal at cost + 4% + 16% = ₹66 × 1.20 = ₹79.20. At that price the 4% fee and 16% profit come to ₹15.84, not the ₹13.20 left over. **Fix:** percentages of takings are solved for: ₹66 ÷ 0.80 = ₹82.50.
:::

::: mistake Closing stock in a service statement
Adding "opening and closing WIP" lines to a canteen or a training course. **Fix:** a service cannot be stored (SM 12.3); the statement runs straight from costs of the period to cost per unit.
:::

::: mistake Depreciation always fixed
A delivery van's depreciation charged "per km" goes in running charges, not standing. **Fix:** time basis = fixed; activity or usage basis = variable (SM 12.10).
:::

::: mistake The cost per trainee forgotten
Dividing the batch's fixed cost by (₹12,000 × 80%) gives 48.1, so 49 trainees, too few. **Fix:** take the per-trainee cost off each trainee's contribution first: ₹4,62,000 ÷ ₹8,400 = 55.
:::

## Practice

::: quiz Check yourself
Q: A tourist-bus operator's total operating cost for the month is ₹6,30,000. The driver's commission is 10% of takings and the operator wants a profit of 20% of takings. What must the month's takings be, in rupees?
= 900000
> T = ₹6,30,000 + 0.10T + 0.20T, so 0.70T = ₹6,30,000 and T = ₹9,00,000. Adding 30% to cost gives ₹8,19,000.

Q: A day-care centre's standing charges are ₹3,60,000 a month and its running cost is ₹800 a child-day. It provided 600 child-days this month. What is its cost per child-day, in rupees?
= 1400
> (₹3,60,000 + 600 × ₹800) ÷ 600 = ₹8,40,000 ÷ 600 = ₹1,400.

Q: Case scenario. Tapri's delivery fleet is leased with a charge of ₹2 for every km run, plus a fixed monthly rent. Dev also notes that the vans' depreciation is calculated per km, and that the fleet manager is paid a fixed monthly salary. In the fleet's operating cost sheet, which treatment is correct?
- [ ] Depreciation and the lease charge per km are standing charges; the manager's salary is a running charge
- [x] Depreciation per km and the ₹2 per km lease charge are running charges; the monthly rent and the manager's salary are standing charges
- [ ] All depreciation is a standing charge; the lease charge per km is a maintenance charge
- [ ] The manager's salary is excluded because it is administration
> Depreciation on an activity basis is variable (SM 12.10); a charge per km varies with distance. A fixed monthly rent and a monthly salary are standing charges.

Q: Which of these is one of ICAI's differences between service costing and product costing?
- [ ] Services always use process costing
- [x] Services cannot be stored, so there is no inventory for services
- [ ] Material cost is the largest element in services
- [ ] Indirect costs are insignificant in services
> SM 12.3: tangibility (no inventory), composite cost units, employee cost larger than material, and significant indirect costs. The other options reverse those points.

Q: In an operating cost sheet prepared on variability, which of these are standing charges? Select all that apply.
- [x] Insurance of the vehicle
- [ ] Diesel
- [x] Interest on the loan for the vehicle, unless otherwise given
- [x] Driver's salary paid monthly
- [ ] Tyres and spares
> Insurance, interest (fixed unless otherwise given, SM 12.10) and a monthly salary are standing charges; diesel is a running charge; tyres and spares are maintenance charges (SM 12.12).
:::

## Recap

- No inventory in services: no WIP or finished goods lines (SM 12.3).
- Two layouts: functional (as for products) or variability: standing (fixed), running (variable), maintenance (semi-variable) charges (SM 12.10).
- No information on semi-variable costs: show fixed and variable heads only.
- Depreciation: time basis fixed, usage basis variable. Interest: separate item of cost of sales, fixed unless otherwise given.
- Cost per unit = total cost of the period ÷ service units of the period (meal, passenger-km, patient-day, project).
- Commission, tax and profit on takings: takings = cost ÷ (1 − c − p).
- Training batches: fixed cost per batch, then per trainee; for a minimum fill, divide fixed cost by (fee × (1 − margin) − variable cost per trainee).
- A lunch not eaten at one o'clock is not inventory.

## Flashcards

Q:: ICAI's four differences between service costing and product costing?
A:: Tangibility (services cannot be stored, no inventory); composite cost units; employee cost is a major element over material; indirect costs such as administration are significant and tracing may not be economically feasible.

Q:: On what bases may a service cost statement be prepared?
A:: On functional classification (as for products) or on variability.

Q:: The three heads of a service cost statement on variability?
A:: Fixed costs or standing charges; variable costs or operating (running) expenses; semi-variable costs or maintenance expenses.

Q:: What if no information on semi-variable costs is given?
A:: The costs are shown under fixed and variable heads only.

Q:: Treatment of depreciation in a service cost statement?
A:: Fixed if related to effluxion of time or calculated on a time basis; variable if calculated on the basis of activity level or usage.

Q:: Treatment of interest in a service cost statement?
A:: Presented as a separate item of cost of sales; in general treated as a fixed cost unless otherwise given.

Q:: Service costing is also known as?
A:: Operating costing.

Q:: Internal and external applications of service costing?
A:: Internal: in-house support services (canteen, staff hospital, boiler house, captive power, vehicle fleet, IT department). External: services offered to outside customers as a profit centre (transport, hotels, financial services, insurance, IT).

Q:: Takings when commission is c% and profit p% of takings?
A:: Takings = total cost ÷ (1 − c − p).

Q:: Cost unit examples for canteen, hospital, hotel, electricity, IT?
A:: Canteen: per item or meal; hospital: per patient-day, bed or operation; hotel: guest-days or room-days; electricity: kWh; IT: per project or module.
