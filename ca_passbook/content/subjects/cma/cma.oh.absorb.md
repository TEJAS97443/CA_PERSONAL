---
id: cma.oh.absorb
title: Absorption rates and the machine hour rate
minutes: 32
needs: cma.oh.secondary
tags: absorption rate, machine hour rate, labour hour rate, blanket rate, departmental rate, pre-determined rate, normal capacity, idle capacity
labs: oh-distribution
summary: How a production department's overheads reach each job or unit: ICAI's six bases, four kinds of rate, the machine hour rate statement, and the capacity a rate is built on.
---

## In plain words

### Same fryer, same 20 hours, three times the overhead

The Indore samosa factory has finished its secondary distribution: Frying now holds ₹10,15,500 of overheads for the month ([[cma.oh.secondary|secondary distribution]]). Two orders went through Frying this month, each needing 20 hours on the fryer line: a paneer samosa order whose filling cost ₹30,000, and an aloo order whose filling cost ₹10,000.

> **Kesar:** Easy. Frying's overheads are half its materials this month. Add 50% of material cost to each order.
> **Ritu:** Then paneer carries ₹15,000 of Frying's overhead and aloo ₹5,000. Did the fryer burn three times the gas for paneer?
> **Kesar:** Same fryer, same 20 hours...
> **Ritu:** Then the same overhead. Per hour, please: ₹169.25 a fryer hour, ₹3,385 each.

Charging a production department's overheads to the jobs and units that pass through it is **absorption** (or recovery). It needs an **overhead rate**: the department's overheads divided by a **base**, a measure of how much each job used the department, such as its direct materials, direct wages, labour hours, machine hours or units of output.

Most factory overheads (rent, supervision, power, depreciation) pay for facilities by the hour, so the base that follows them best is usually time: **machine hours** where machines do the work, **labour hours** where people do it. Actual overheads are known only after the books close, so the rate is fixed in advance from budgets: a **pre-determined rate**. Its fixed part is built on **normal capacity**, the output the factory achieves on average.

::: analogy The mall car park
A car park charges by the hours your car occupies a slot, not by the price of the car: a Mercedes and a Maruti parked for two hours pay the same. Factory overheads are the rent of the factory's facilities, so they too are best charged by the hours each job occupies them. One tariff for the whole mall (a blanket rate) is fair only if every car spends the same time on every floor; otherwise each floor needs its own meter (departmental rates).
:::

::: key
An absorption rate is a cost centre's overheads divided by the base that best measures its use. Time bases follow most overheads (machine hours where machines dominate, labour hours where labour does). The rate is pre-determined from budgets, with fixed overheads on normal capacity.
:::

## How it works

### What a good method must achieve

The method chosen for charging overheads to products or jobs should ensure (SM 4.29):

1. that the total amount charged (recovered) in a period does not differ materially from the actual expenses of the period; and
2. that the amount charged to individual jobs or products is equitable. For factory overhead this means: (a) the time spent on each job is considered; (b) jobs done by skilled and by unskilled workers are distinguished; (c) jobs done by manual labour and by machines are distinguished.

It should also be convenient to use and give uniform results from period to period; any change should reflect a change in the underlying situation, such as machines replacing human labour.

### Six methods in three families

::: diagram ICAI's six methods of absorption
{"type": "nest", "w": 420, "root": {"title": "Methods of absorbing overheads", "note": "SM 4.29", "mono": false, "color": "mute", "children": [
 {"title": "Percentage of a cost", "mono": false, "color": "c", "lines": ["(1) direct material cost", "(2) prime cost", "(3) direct labour cost"]},
 {"title": "Rate per hour", "mono": false, "color": "a", "lines": ["(4) labour hour rate", "(5) machine hour rate"]},
 {"title": "Rate per unit", "mono": false, "color": "b", "lines": ["(6) rate per unit of output"]}]},
 "caption": "The numbers are ICAI's order. Amber: rates on a cost; blue: rates on time; teal: a rate on units."}
:::

| Method | Base | ICAI's view (SM 4.30–4.35) |
|---|---|---|
| 1. % of direct material cost | Budgeted direct material cost | Generally unsuitable; may be used for material handling and stores overheads |
| 2. % of prime cost | Prime cost | Generally unsuitable |
| 3. % of direct labour cost | Direct wages | Simple; recognises time only indirectly |
| 4. Labour hour rate | Direct labour hours | Suits operations without large use of machinery |
| 5. Machine hour rate | Machine hours | Usually the best where machines are the main factor of production |
| 6. Rate per unit of output | Units produced | The simplest; suits one uniform product |

### Why the first two mislead

ICAI's example (SM 4.30–4.31): materials ₹2,00,000, labour ₹1,00,000, factory overheads ₹90,000 give 45% of materials or 30% of prime cost. A job with materials ₹10,000 and labour ₹7,000 costs ₹21,500 by the first and ₹22,100 by the second: the method alone changes the works cost. The four reasons the two methods are "generally considered to be unsuitable" (SM 4.31–4.32):

1. Manufacturing overheads are mostly a **function of time**: a job that uses the facilities longer costs more. The first method ignores time altogether and the second largely.
2. Overheads are related to neither prime cost nor material cost, except to a very small extent: two jobs with the same operational time but materials of different prices would bear different overheads. Adding labour to material (prime cost) only compounds the error.
3. Material prices fluctuate widely, so overheads charged on them fluctuate violently from period to period.
4. They ignore the skill of the workers and whether machines were used.

::: diagram Paneer against aloo: the overhead each order carries
{"type": "plot", "h": 280, "x": [0.4, 2.6], "y": [0, 18000],
 "xlabel": "absorption method", "ylabel": "Frying overhead charged (₹)",
 "xticks": [[1, "50% of materials"], [2, "₹169.25 a fryer hour"]],
 "yticks": [[0, "0"], [5000, "5,000"], [10000, "10,000"], [15000, "15,000"]],
 "series": [
  {"label": "paneer order", "bars": true, "bw": 0.32, "values": true, "color": "a", "pts": [[0.82, 15000, "15,000"], [1.82, 3385, "3,385"]]},
  {"label": "aloo order", "bars": true, "bw": 0.32, "values": true, "color": "d", "pts": [[1.18, 5000, "5,000"], [2.18, 3385, "3,385"]]}
 ],
 "caption": "Blue: the paneer order; orange: the aloo order. Both used the fryer for 20 hours. On materials paneer carries three times the overhead; on fryer hours they carry the same."}
:::

### Direct labour cost and labour hours

The **percentage of direct labour cost** (SM 4.32):

| Advantages | Disadvantages |
|---|---|
| (i) Simple and economical to apply | (i) Inaccuracies, because the time factor is not given full importance |
| (ii) The time factor is recognised, even if indirectly | (ii) No allowance where machinery is used to some extent |
| (iii) Total expenses recovered will not differ much from the estimate, since total wages are not likely to fluctuate much | (iii) It does not provide for varying skills of workers |

The **labour hour rate** is an improvement on the percentage of direct wages: it fully recognises time, and is admirably suited to operations that do not involve any large use of machinery. It can be calculated for each category of workers (SM 4.32–4.33). ICAI's example: ₹90,000 of overheads over 1,50,000 labour hours is ₹0.60 an hour, so a job taking 795 labour hours absorbs ₹477.

### The machine hour rate

A **machine hour rate** is the cost of running a machine for an hour to produce goods; each machine or group of machines is treated as a cost centre (SM 4.33). Two ways to build it:

- **Direct machine hour rate**: only the expenses directly or immediately connected with operating the machine (power, depreciation, repairs and maintenance, insurance), divided by the machine's estimated operational hours.
- **Comprehensive machine hour rate**: also a share of the department's other manufacturing expenses (supervision, shop cleaning and lighting, consumable stores, shop general labour, rent and rates), so that none is left out of production cost. Alternatively those may be absorbed on a productive labour hour rate. Sometimes the **machine operator's wages** are added too, for a comprehensive rate of working the machine for one hour.

::: diagram Six steps to a machine hour rate (SM 4.34)
{"type": "flow", "w": 420, "nodes": [
 {"id": "s1", "kind": "start", "label": "1. Overheads of the\nproduction department"},
 {"id": "s2", "kind": "process", "label": "2. Apportion them to\nmachines or groups"},
 {"id": "s3", "kind": "process", "label": "3. Allocate machine-\nspecific costs"},
 {"id": "s4", "kind": "process", "label": "4. Estimate productive\nhours of the machine"},
 {"id": "s5", "kind": "process", "label": "5. (Step 2 + step 3)\n÷ productive hours"},
 {"id": "s6", "kind": "end", "label": "6. Machine hour rate"}],
 "edges": [["s1", "s2"], ["s2", "s3"], ["s3", "s4"], ["s4", "s5"], ["s5", "s6"]],
 "caption": "Step 1 is the department's total after primary and secondary distribution."}
:::

The costs are then split (SM 4.34–4.35):

- **Standing charges** (fixed): remain constant whether or not the machine runs: insurance premium, rent of the premises, supervisor's salary, depreciation if it relates to the effluxion of time.
- **Machine expenses** (variable): vary with operation: power, consumables (lubricants, oils), repairs and maintenance, depreciation if it relates to activity.

| Advantages of the machine hour rate | Disadvantages |
|---|---|
| (1) Where machines are the main factor of production, usually the best method of charging machine operating expenses | (1) Additional data on machines' operating time must be recorded and maintained |
| (2) Under-absorption of machine overheads indicates the extent to which the machines were idle | (2) A separate rate for each machine or group means further work, where a general department rate may be suitable |
| (3) Particularly advantageous where one operator attends several machines, or several operators work one machine | |

The **rate per unit of output** is the simplest of all: amount of overheads ÷ number of units (SM 4.35).

### Four kinds of rate

| Rate (SM 4.36–4.37) | Computed as | Use |
|---|---|---|
| **Normal rate** (also called actual rate) | Actual overheads ÷ actual base | Known only after the period |
| **Pre-determined rate** | Budgeted overheads ÷ budgeted base | Fixed in advance; the usual rate |
| **Blanket rate** | Total overheads for the factory ÷ total units of the base for the factory | One single rate for the whole factory |
| **Departmental rate** | Overheads of a department or cost centre ÷ its base | A separate rate for each department |

A pre-determined rate may be estimated on three bases: (1) the previous year's or period's figure, assuming production and overheads stay constant or change proportionately; (2) estimated expenses and anticipated volume of production (₹10,000 over 4,000 units is ₹2.50 a unit); (3) the normal volume of the business.

A **blanket rate** should be applied only (1) where one major product is produced, or (2) where several products are produced but (a) all products pass through all departments and (b) all are processed for the same length of time in each department. Where these conditions do not exist, ==departmental rates should be used==: where product lines vary or machinery is used to a varying degree in different departments (SM 4.37).

::: lab oh-distribution {"part":"rates","rate":"more"}
Step through it yourself: each production department gets a rate on its larger base, machine or labour hours, and then a job picks up its overhead at those rates.
:::

### Capacity: what the denominator assumes

A budgeted base is a capacity estimate, and ICAI defines five capacity concepts (SM 4.58–4.59):

::: diagram From installed to actual capacity
{"type": "layers", "layers": [
 {"label": "Installed (rated) capacity", "note": "maximum, by technical specification", "right": "theoretical", "color": "a"},
 {"label": "Normal capacity", "note": "average achievable under normal circumstances", "right": "base for fixed overheads", "color": "g"},
 {"label": "Actual capacity", "note": "achieved in the period", "right": "% of installed", "color": "c"}],
 "side": [{"label": "idle capacity", "arrow": "down"}],
 "caption": "Installed minus normal capacity is the normal idle capacity; normal minus actual capacity (when actual is lower) is the abnormal idle capacity."}
:::

- **Installed (rated) capacity**: the maximum capacity of producing goods or providing services, set by technical specification or evaluation; also called theoretical capacity, it cannot be achieved in normal operating circumstances.
- **Practical capacity** (operating, net or available capacity): ICAI calls it the actually utilised capacity of a plant; it allows for repairs, maintenance, minor breakdowns, idle time, set-up time, normal delays, Sundays and holidays, stock taking. Generally 80% to 90% of the rated capacity, and also used as a base for determining overhead rates.
- **Normal capacity**: the volume achieved or achievable on an average over a period under normal circumstances, after the reduction for planned maintenance.
- **Actual capacity**: achieved in a given period, presented as a percentage of installed capacity.
- **Idle capacity**: the part that cannot be effectively utilised. **Normal idle capacity** = installed − normal capacity; **abnormal idle capacity** = normal − actual capacity, where actual is lower.

Variable manufacturing overheads are absorbed on actual production, fixed manufacturing overheads on **normal capacity** (SM 4.10). How idle capacity costs are treated is in [[cma.oh.underover|under- and over-absorption]].

## Formats and formulas

*Reproduce the machine hour rate statement and the hours working from memory: ICAI's answers use exactly this layout.*

::: formula Percentage of direct material cost; of prime cost
$$\text{Rate} = \frac{\text{Production overheads of the department}}{\text{Budgeted direct material cost}} \times 100 \qquad \text{Rate} = \frac{\text{Production overheads of the department}}{\text{Prime cost}} \times 100$$
:::

::: formula Percentage of direct labour cost
$$\text{Rate} = \frac{\text{Production overheads of the department}}{\text{Direct labour cost}} \times 100$$
:::

::: formula Labour hour rate and machine hour rate
$$\text{Labour hour rate} = \frac{\text{Production overheads of the department}}{\text{Direct labour hours}} \qquad \text{Machine hour rate} = \frac{\text{Overheads of the machine}}{\text{Productive machine hours}}$$
Both are rupees per hour. (SM 4.33 prints the labour hour formula with "× 100"; its own example, ₹90,000 ÷ 1,50,000 hours = ₹0.60 an hour, applies no × 100, so write the rate in rupees per hour.)
:::

::: formula Rate per unit, normal and pre-determined rates
$$\text{Per unit} = \frac{\text{Overheads}}{\text{Number of units}} \qquad \text{Normal} = \frac{\text{Actual overheads}}{\text{Actual base}} \qquad \text{Pre-determined} = \frac{\text{Budgeted overheads}}{\text{Budgeted base}}$$
:::

::: formula Blanket and departmental rates
$$\text{Blanket} = \frac{\text{Total overheads for the factory}}{\text{Total units of base for the factory}} \qquad \text{Departmental} = \frac{\text{Overheads of the department}}{\text{Corresponding base}}$$
:::

### The machine hour rate statement

| Computation of machine hour rate | Per period (₹) | Per hour (₹) |
|---|---:|---:|
| **(A) Standing charges** | | |
| Rent, lighting, supervision (shares) | xxx | |
| Insurance; depreciation (time basis) | xxx | |
| Operator's wages (if included) | xxx | |
| **Total standing charges ÷ productive hours** | **xxx** | **xxx** |
| **(B) Machine expenses** | | |
| Power, consumables, repairs; depreciation (activity basis) | xxx | xxx |
| **Machine hour rate (A) + (B)** | **xxx** | **xxx** |

### Productive hours when a machine needs an operator

| Hours (all operators, for the period) | Hours |
|---|---:|
| Normal available hours × months × operators | xxx |
| Less: absenteeism without pay × operators | (xxx) |
| **Paid hours** (operators' wages are on these) | **xxx** |
| Less: leave with pay × operators | (xxx) |
| Less: normal unavoidable idle time × operators | (xxx) |
| **Effective (productive) working hours** | **xxx** |

### Normal capacity (SM 4.58)

| Normal capacity | Units |
|---|---:|
| Installed capacity | xxx |
| Adjustments for: (i) time lost to scheduled preventive or planned maintenance; (ii) number of shifts, machine hours or man hours; (iii) holidays, normal shut-down days, normal idle time; (iv) normal time lost in batch change-over | (xxx) |
| **Normal capacity** | **xxx** |

::: definition Absorption
The process of recovering overheads of a department or any other cost centre from its output is called recovery or absorption. (SM 4.10)
:::

::: definition Machine hour rate
Machine hour rate implies cost of running a machine for an hour to produce goods. (SM 4.33)
:::

::: definition Blanket overhead rate
Blanket overhead rate refers to the computation of one single overhead rate for the whole factory, as distinguished from the departmental overhead rate, a separate rate for each individual cost centre or department. (SM 4.37)
:::

::: definition Normal capacity
The volume of production or services achieved or achievable on an average over a period under normal circumstances taking into account the reduction in capacity resulting from planned maintenance. (SM 4.58)
:::

## Worked examples

:::: example One fryer, one shift or two
Tapri's continuous fryer in the Frying department works one shift today. The budget for a year:

| Item | Data |
|---|---|
| Depreciation | ₹2,00,000 a year for obsolescence, plus ₹50 per running hour for wear |
| Electricity | demand charge for the fryer's connected load ₹6,000 a month; energy 25 units per running hour at ₹9 a unit |
| Gas to heat the oil | ₹120 per running hour |
| Oil top-up and filters | ₹60 per running hour |
| Share of the department's rent | ₹1,20,000 a year |
| Share of the supervisor's salary | ₹1,80,000 a year for each shift worked |
| Insurance | ₹40,000 a year |
| Operator, wholly on the fryer (included in the rate) | ₹3,00,000 a year for each shift |

One shift gives 2,000 productive hours a year. A second shift would give 3,800 productive hours in all, with a second operator and a night allowance of ₹60,000 a year, and a second supervisor share.

**Required:**

(i) Calculate the comprehensive machine hour rate for one shift, showing standing charges and machine expenses separately.

(ii) Calculate the rate if a second shift is worked.

(iii) An order needs 50 fryer hours. Calculate the overhead charged to it under each rate, and comment.

::: answer Show the working
**Working note: what is standing and what is running.** Items that accrue with time, whether or not the fryer runs, are standing charges: time-based depreciation, the electricity demand charge, rent, supervision, insurance and the operator. Items that arise only while it runs are machine expenses: wear-based depreciation, energy, gas, oil and filters.

**(i) Computation of machine hour rate, one shift (2,000 hours)**

| Particulars | Per annum (₹) | Per hour (₹) |
|---|---:|---:|
| **(A) Standing charges** | | |
| Depreciation, obsolescence (time basis) | 2,00,000 | |
| Electricity demand charge (₹6,000 × 12) | 72,000 | |
| Share of rent | 1,20,000 | |
| Share of supervisor's salary | 1,80,000 | |
| Insurance | 40,000 | |
| Operator's wages | 3,00,000 | |
| **Total standing charges** | **9,12,000** | **456.00** |
| **(B) Machine expenses (per running hour)** | | |
| Depreciation, wear | | 50.00 |
| Energy (25 units × ₹9) | | 225.00 |
| Gas | | 120.00 |
| Oil top-up and filters | | 60.00 |
| **Total machine expenses** | | **455.00** |
| **Machine hour rate (A) + (B)** | | **911.00** |

**(ii) Two shifts (3,800 hours).** Standing charges = ₹9,12,000 + second operator ₹3,00,000 + night allowance ₹60,000 + second supervisor share ₹1,80,000 = ₹14,52,000; per hour = ₹14,52,000 ÷ 3,800 = ₹382.11. Machine expenses stay ₹455.00 an hour. Rate = **₹837.11**.

**(iii) Order of 50 fryer hours.** One shift: 50 × ₹911.00 = **₹45,550**. Two shifts: 50 × ₹837.11 = **₹41,855.50**.

**Comment.** Only the standing charges per hour fall (₹456.00 to ₹382.11), because the time-based costs are spread over more hours; the running costs of ₹455 an hour do not change with the shift pattern. The lower rate holds only if the second shift's hours are actually used: the rate is set on the hours expected, and if the second shift ran half empty the standing charges would be under-absorbed (see [[cma.oh.underover|under- and over-absorption]]).
:::
::::

::::: example Two catering bids: the blanket rate that won the wrong order
Tapri's catering kitchen has two departments. Monthly budget:

| Budget | Cooking (combi-ovens) | Assembly (plating by hand) |
|---|---:|---:|
| Factory overheads (₹) | 9,60,000 | 2,40,000 |
| Direct wages (₹) | 1,60,000 | 6,40,000 |
| Machine hours | 8,000 | nil |
| Direct labour hours | 4,000 | 32,000 |

Tapri absorbs factory overheads by a blanket rate, the percentage of total factory overheads to total direct wages, and quotes factory cost plus 10%. This week it bid for two orders, against a rival quoting ₹55,000 for the wedding buffet and ₹45,000 for the corporate lunch boxes:

| Order | Direct materials (₹) | Cooking: machine hours | Cooking: wages (₹) | Assembly: labour hours | Assembly: wages (₹) |
|---|---:|---:|---:|---:|---:|
| W: wedding buffet | 30,000 | 20 | 800 | 400 | 8,000 |
| C: corporate lunch boxes | 25,000 | 120 | 2,000 | 60 | 1,200 |

**Required:**

(i) Compute the blanket rate and the factory cost and quotation of each order on it.

(ii) Recommend a rate for each department, and recompute the factory costs and quotations.

(iii) Explain what the blanket rate did to each bid.

:::: answer Show the working
**(i) Blanket rate**

$$\text{Blanket rate} = \frac{9{,}60{,}000 + 2{,}40{,}000}{1{,}60{,}000 + 6{,}40{,}000} \times 100 = 150\% \text{ of direct wages}$$

**(ii) Departmental rates.** Cooking is machine-intensive (overheads six times its wages, mostly the ovens), so a machine hour rate: ₹9,60,000 ÷ 8,000 = **₹120 per machine hour**. Assembly is labour-intensive, so a labour hour rate: ₹2,40,000 ÷ 32,000 = **₹7.50 per labour hour**.

| Particulars | W: blanket (₹) | W: departmental (₹) | C: blanket (₹) | C: departmental (₹) |
|---|---:|---:|---:|---:|
| Direct materials | 30,000 | 30,000 | 25,000 | 25,000 |
| Direct wages | 8,800 | 8,800 | 3,200 | 3,200 |
| Factory overheads (WN) | 13,200 | 5,400 | 4,800 | 14,850 |
| **Factory cost** | **52,000** | **44,200** | **33,000** | **43,050** |
| Quotation (factory cost + 10%) | 57,200 | 48,620 | 36,300 | 47,355 |

Working note: blanket: W 150% × ₹8,800 = ₹13,200; C 150% × ₹3,200 = ₹4,800. Departmental: W 20 × ₹120 + 400 × ₹7.50 = ₹2,400 + ₹3,000 = ₹5,400; C 120 × ₹120 + 60 × ₹7.50 = ₹14,400 + ₹450 = ₹14,850.

::: diagram Overheads charged to each order
{"type": "plot", "h": 280, "x": [0.4, 2.6], "y": [0, 16000],
 "xlabel": "order", "ylabel": "overhead charged (₹)",
 "xticks": [[1, "W: wedding buffet"], [2, "C: lunch boxes"]],
 "yticks": [[0, "0"], [4000, "4,000"], [8000, "8,000"], [12000, "12,000"], [16000, "16,000"]],
 "series": [
  {"label": "blanket 150% of wages", "bars": true, "bw": 0.3, "values": true, "color": "a", "pts": [[0.84, 13200, "13,200"], [1.84, 4800, "4,800"]]},
  {"label": "departmental rates", "bars": true, "bw": 0.3, "values": true, "color": "d", "pts": [[1.16, 5400, "5,400"], [2.16, 14850, "14,850"]]}
 ],
 "legend": "outside",
 "caption": "Blue: blanket rate; orange: departmental rates. The blanket rate follows wages, so it loads the plating-heavy buffet and barely touches the oven-heavy lunch boxes."}
:::

**(iii) What the blanket rate did.** It assumes every order spends the same time in each department, which these two do not: W is mostly hand plating, C mostly oven time. On the blanket rate Tapri quoted ₹57,200 for W, above the rival's ₹55,000, and lost an order whose true factory cost is only ₹44,200. It quoted ₹36,300 for C and won an order whose true factory cost is ₹43,050: a loss of ₹6,750 on it. With departmental rates Tapri would quote ₹48,620 for W (and win it) and ₹47,355 for C (above the rival's ₹45,000; even matching ₹45,000 would leave only ₹1,950 over factory cost). The blanket-rate conditions are not met here, so departmental rates should be used.
::::
:::::

::: lab oh-distribution {"part":"rates","method":"step","depts":[["X","P","1,93,000"],["Y","P","64,000"],["Z","P","83,000"],["P","S","45,000"],["Q","S","75,000"],["R","S","1,05,000"],["S","S","30,000"]],"bases":[["Employees","100 125 85 10 50 40 50"],["Area (sq m)","3,000 1,500 1,500 500 1,500 1,000 1,000"],["Labour hours","4,000 3,000 4,000 1,000 5,000 6,000 3,000"]],"overheads":[],"service":[["P","Employees"],["Q","Labour hours"],["R","Area"],["S","Labour hours"]],"rate":"lh","job":""}
From distribution to rates in one run: Study Material Practical Problem 3 closes four service departments by the step method and ends on three labour hour rates.
:::

:::: example Seven sealing machines and a fifth operator
Tapri's premix plant has 7 identical pouch-sealing machines; a machine runs only while an operator is wholly engaged on it, and there are 4 operators. For each operator, for the quarter (3 months):

| Hours per operator for the quarter | Hours |
|---|---:|
| Normal available (200 a month) | 600 |
| Absenteeism, without pay | 12 |
| Leave, with pay | 18 |
| Normal unavoidable idle time | 10 |

Operators are paid ₹800 for an 8-hour day, plus a production bonus of 10% of wages. Power is ₹20 per running hour. The other overheads of the sealing section for the quarter are:

| Overheads for the quarter | Amount (₹) |
|---|---:|
| Supervision | 45,000 |
| Lighting | 9,000 |
| Depreciation (10% a year on ₹16,00,000) | 40,000 |
| Repairs and maintenance (4% a year on ₹16,00,000) | 16,000 |
| Insurance (₹48,000 a year) | 12,000 |
| General management expenses allocated | 18,000 |
| **Total** | **1,40,000** |

**Required:**

(i) Calculate the effective machine hours of the section for the quarter.

(ii) Calculate the comprehensive machine hour rate.

(iii) Kesar proposes to hire a fifth operator on the same terms "to make every hour cheaper". Calculate the new rate and comment.

::: answer Show the working
**(i) Effective hours.** The machines can run only while operators work, so the hours come from the operators, not from the 7 machines.

| Hours for the quarter | Per operator | 4 operators |
|---|---:|---:|
| Normal available | 600 | 2,400 |
| Less: absenteeism without pay | (12) | (48) |
| **Paid hours** | **588** | **2,352** |
| Less: leave with pay | (18) | (72) |
| Less: normal idle time | (10) | (40) |
| **Effective machine hours** | **560** | **2,240** |

**(ii) Comprehensive machine hour rate (4 operators)**

| Particulars | Amount (₹) |
|---|---:|
| Operators' wages: paid hours 2,352 × ₹100 (₹800 ÷ 8) | 2,35,200 |
| Production bonus (10% of wages) | 23,520 |
| Power (2,240 running hours × ₹20) | 44,800 |
| Other overheads of the section | 1,40,000 |
| **Total overheads for the quarter** | **4,43,520** |
| **Machine hour rate (₹4,43,520 ÷ 2,240)** | **₹198.00** |

Wages are paid on paid hours (leave with pay is paid but not worked), while the rate is spread over effective hours only.

**(iii) Five operators.** Paid hours = 5 × 588 = 2,940; effective hours = 5 × 560 = 2,800.

| Particulars | Amount (₹) |
|---|---:|
| Operators' wages (2,940 × ₹100) | 2,94,000 |
| Production bonus (10%) | 29,400 |
| Power (2,800 × ₹20) | 56,000 |
| Other overheads | 1,40,000 |
| **Total** | **5,19,400** |
| **Machine hour rate (₹5,19,400 ÷ 2,800)** | **₹185.50** |

**Comment.** The rate falls by ₹12.50 an hour only because the ₹1,40,000 of other overheads is spread over 2,800 hours instead of 2,240; every effective hour still carries ₹115.50 of wages and bonus and ₹20 of power. The section's total cost rises by ₹75,880. A lower rate is not a saving: the fifth operator pays only if there are orders for the extra 560 machine hours whose contribution, before these sealing costs, exceeds ₹75,880. With 4 operators the 7 machines are used for only 2,240 of a possible 4,200 hours; the constraint is operators, not machines.
:::
::::

## Under the hood

### Set-up, maintenance and other lost hours

Planned maintenance hours are left out of productive hours in every ICAI answer read for this lesson: the machine produces nothing in them. Set-up hours depend on the question: MTP September 2024 Series I Q4(a) said set-up time "is regarded as productive time", and MTP May 2025 Series II Q1(c) asked for both versions. Calendar questions build the hours from days: Sundays, holidays (and those falling on Saturdays), shorter Saturdays, strikes, then a capacity percentage (PYQ September 2024 Q5(a)) or a breakdown allowance taken on the hours left (RTP May 2026 Q8: 2,188 × 92%, less 3% of that).

### Depreciation: time or activity

Illustration 6 (SM 4.38–4.39) gives a machine's life in years and in hours: depreciation "can be calculated either on the basis of time ... or on the basis of activity". On time it is a standing charge, on activity a machine expense. Lifetime repairs are linked to activity and charged per hour.

### What goes in, and what does not

- Operators' wages: the Study Material says that sometimes they are added to get a comprehensive rate of working the machine (SM 4.33 note). Include them when the question gives them as part of the machine's costs (Illustration 7, PYQ January 2026 Q5(a)); otherwise they stay direct wages of the jobs.
- RTP May 2026 Q8 left **interest on capital outlay** out of its machine hour rates: "a finance cost, therefore it has been excluded from the cost accounts". Interest and financing charges are shown as a separate item of cost of sales ([[cma.oh.ads|administration, selling, distribution and R&D overheads]]).
- With a hired add-on used for some hours (a computer, an AI system), the machine's own overheads are shared over all its hours, and the hire charge over the hours with the add-on only (SM practical problem 4; PYQ May 2026 MCQs 6–10).

### Next door

The pre-determined rate never equals the actual: [[cma.oh.underover|under- and over-absorption]]. Activity based costing replaces one base per department with a cost driver per activity: [[cma.abc.concept|activities, cost pools and cost drivers]]. Whether fixed production overhead should be absorbed into stock at all is the question of [[cma.mc.absorb|marginal versus absorption costing]].

## Exam angle

::: exam How ICAI asks absorption rates
In the ten documents read for this lesson, absorption rates came up as follows:

- **Comprehensive machine hour rate, 5–7 marks**: PYQ September 2024 Q5(a) (7 marks: three machines, expenses shared on workers, floor space and kW rating, hours from a calendar at 80% capacity); PYQ January 2026 Q5(a) (6 marks, reverse: the rate is given, find the annual insurance; operators limit the hours); old scheme January 2021 Q1(b) (5 marks: 8 machines, 6 operators).
- **Single-machine rates, 4–6 marks**: MTP May 2025 Series II Q1(c) (4 marks, set-up time productive and unproductive); MTP September 2024 Series I Q4(a) (6 marks, maintenance hours excluded, set-up time productive).
- **Revised pre-determined rates**: RTP May 2026 Q8 (three CNC machines, price and consumption increases, interest excluded).
- **Case-scenario MCQs, 2 marks each**: PYQ May 2026 MCQs 6–10, machine hour rates with and without a hired AI system, for the firm and for three jobs. PYQ September 2026 MCQ 15 tested the capacity levels (a brochure figure is installed capacity; normal idle capacity = installed − normal).
- **Blanket versus departmental, 7–14 marks**: MTP September 2024 Series II Q4 (3 + 4 + 3 + 4 marks: blanket rate on wages, suggest methods, price the job, under- or over-recovery); PYQ September 2026 Q5(b) (2 + 3 + 2 marks: blanket on labour hours, a recommended method, the under- or over-recovery of one department).
- **Theory**: old scheme January 2021 Q6(c), "Explain blanket overhead rate and departmental overhead rate ... State the conditions required for the application of blanket overhead rate"; MTP January 2025 Series II Q1(a)(v), arguments for and against departmental rates.
:::

::: exam Traps
- Absenteeism without pay cuts paid hours; leave with pay and idle time cut working hours but not wages (PYQ January 2026, SM practical problem 5).
- In those questions the lost hours are per operator **for the whole period**: ICAI multiplied them by operators only, not by months.
- Annual, quarterly, half-yearly and monthly figures mixed in one question: convert all to the period of the rate.
- "Recommend a method" earns marks for the reason: machine time predominant, machine hour rate; labour predominant, labour hour rate.
:::

::: trick The car park test
Ask what the department mainly uses up: machine time (machine hour rate), people's time (labour hour rate), or nothing that differs between products (one product: rate per unit). Conditions: when the question prescribes a base (a percentage of direct wages, say), use it; a percentage of material cost suits only material handling and stores overheads (SM 4.32).
:::

## Answer frame

**"Explain blanket and departmental overhead rates; state the conditions for a blanket rate"** (5 marks):

1. Blanket rate: one single overhead rate for the whole factory; formula.
2. Departmental rate: one rate for each department or cost centre; formula.
3. Blanket rate conditions: (1) only one major product; (2) several products, but (a) all pass through all departments and (b) all are processed for the same length of time in each.
4. Otherwise departmental rates: product lines varied, or machinery used to a varying degree.

**"Arguments for and against departmental absorption rates"** (MTP January 2025): for: costs more precise than blanket rates; they facilitate variance analysis and cost control; stock and work-in-process valuation easier and more precise. Against: setting up and monitoring them can be time-consuming and expensive.

**"Direct and comprehensive machine hour rate"**: definition of MHR; direct (expenses directly connected with the machine ÷ operational hours); comprehensive (plus a share of the department's other expenses, sometimes operator's wages); standing charges and machine expenses; the six steps.

### Three answers to "compute the machine hour rate"

::: cols
**Loses marks**

"₹9,12,000 ÷ 2,000 = ₹456 an hour."

Standing charges only: the running costs are left out, and nothing shows which items were treated how.
---
**Passes**

The right rate, ₹911, but every item listed in one column with no workings.

Correct, yet a slip in one item would leave no method marks.
---
**Full marks**

Working notes first (which items accrue with time and which with running, productive hours), then ICAI's statement: standing charges and machine expenses, each with its working, an hourly rate for each, and the total.
:::

## Common mistakes

::: mistake Hall of Shame: the maintenance hours that made the fryer cheaper
Dividing the year's expenses by every hour the factory is open, planned maintenance and idle hours included, gives too low a rate and undercharges every order. **Fix:** the denominator is productive hours: leave out planned maintenance always, set-up time when it is unproductive, and idle time.
:::

::: mistake Paying for the absentee
Charging wages on effective hours (2,240 × ₹100) or on available hours (2,400 × ₹100). **Fix:** wages are paid on paid hours: available less absenteeism without pay (2,352), because leave with pay is paid but not worked.
:::

::: mistake The blanket that covered a machine shop
Using one factory-wide rate on wages when one department is machine-paced and another labour-paced: the job's overheads follow its wages, not its use of machines. **Fix:** check the blanket-rate conditions; if products do not spend the same time in each department, compute departmental rates.
:::

::: mistake A month of rent, a year of insurance
Adding a monthly rent to an annual depreciation to a quarterly power bill. **Fix:** convert every item to the period of the rate before adding, and write the conversion in the working.
:::

## Practice

::: quiz Check yourself
Q: A packing machine's standing charges are ₹36,000 a month and it runs 180 productive hours a month. It uses 12 units of power an hour at ₹7.50 a unit and ₹10 of consumables an hour. What is its machine hour rate (₹)?
= 300
> Standing charges ₹36,000 ÷ 180 = ₹200; power 12 × ₹7.50 = ₹90; consumables ₹10. Total ₹300 an hour.

Q: Case scenario. Tapri's batter-grinding department runs four large wet grinders, each tended by one worker. Its monthly overheads of ₹3,40,000 are 85% power and depreciation of the grinders. The month's budget is 4,000 grinder hours, 4,800 direct labour hours and direct wages of ₹2,40,000. Which absorption rate should Ritu use?
- [ ] ₹70.83 per direct labour hour
- [ ] 141.67% of direct wages
- [x] ₹85 per machine hour
- [ ] ₹72.25 per machine hour
> The department's overheads are mostly the cost of running the grinders, so machine time is the predominant factor: ₹3,40,000 ÷ 4,000 = ₹85 per machine hour. ₹72.25 spreads only the power and depreciation (₹2,89,000) and leaves the rest unabsorbed; the labour-based rates charge orders by the workers' time, not the grinders'.

Q: For which limited purpose does ICAI accept the percentage of direct material cost as an absorption base?
- [ ] Factory overheads of a machine-intensive department
- [x] Material handling and stores overheads
- [ ] Administration overheads
- [ ] Overheads of a department with skilled workers
> SM 4.32: percentage of materials cost may be used for the limited purpose of absorbing material handling and store overheads. For factory overheads in general it ignores time, skill and the use of machines.

Q: The Shaping department has 25 workers working 24 days a month, 8 hours a day; normal idle time is 5% of the hours. Its budgeted overheads are ₹2,28,000 a month. What is its labour hour rate (₹)?
= 50
> Hours = 25 × 24 × 8 = 4,800, less normal idle time of 5% (240) = 4,560 productive labour hours. Rate = ₹2,28,000 ÷ 4,560 = ₹50 an hour. Dividing by 4,800 (₹47.50) ignores the idle time that no job can be charged with.

Q: When is a single blanket overhead rate appropriate? Select all that apply.
- [x] Only one major product is produced
- [x] Several products pass through all departments and spend the same time in each
- [ ] Machinery is used to a varying degree in different departments
- [ ] Product lines are varied but the factory is small
> SM 4.37: one major product, or several products that all pass through all departments for the same length of time in each. Varied product lines or machinery used to a varying degree call for departmental rates.

Q: Which of these are standing charges in a machine hour rate? Select all that apply.
- [x] Insurance premium of the machine
- [x] Share of the department's rent
- [ ] Power consumed while the machine runs
- [x] Depreciation charged on the basis of time
- [ ] Lubricating oil
> Standing charges stay the same whether or not the machine runs (SM 4.34). Power and lubricants vary with operation: machine expenses.
:::

## Recap

- Absorption = recovering a cost centre's overheads from its output, at overheads ÷ base.
- ICAI's six methods: % of direct materials, % of prime cost, % of direct labour cost, labour hour rate, machine hour rate, rate per unit of output. The first two are generally unsuitable (time, price swings, skill and machines ignored).
- Labour hour rate: little machinery. Machine hour rate: machines the main factor; each machine a cost centre.
- MHR = (standing charges + machine expenses) ÷ productive hours; comprehensive adds the department's other expenses, sometimes operator's wages.
- Rates: normal (actual ÷ actual), pre-determined (budget ÷ budget), blanket (one for the factory), departmental (one per department).
- Blanket only for one major product, or products that pass through every department for the same time; otherwise departmental.
- Fixed overheads on normal capacity, variable on actual production. Normal idle = installed − normal; abnormal idle = normal − actual.
- Wages on paid hours, rate on effective hours. (Same fryer hours, same overhead.)

## Flashcards

Q:: Name ICAI's six methods of absorbing overheads, in order.
A:: Percentage of direct materials, percentage of prime cost, percentage of direct labour cost, labour hour rate, machine hour rate, rate per unit of output.

Q:: Why does ICAI call the percentage of material cost and of prime cost generally unsuitable?
A:: Overheads are mostly a function of time; they are hardly related to material or prime cost; material prices fluctuate widely; skill and use of machines are ignored.

Q:: Direct versus comprehensive machine hour rate?
A:: Direct: only expenses directly connected with operating the machine, divided by its operational hours. Comprehensive: also a share of the department's other manufacturing expenses (supervision, lighting, rent, consumables), sometimes the operator's wages.

Q:: Standing charges versus machine expenses: give two of each.
A:: Standing charges (fixed): insurance, rent, supervisor's salary, depreciation on time basis. Machine expenses (variable): power, consumables, repairs and maintenance, depreciation on activity basis.

Q:: Three advantages of the machine hour rate?
A:: Best where machines are the main factor of production; under-absorption shows the extent of machine idleness; advantageous where one operator attends several machines or several operators work one machine.

Q:: Conditions for applying a blanket overhead rate?
A:: Only one major product; or several products where all products pass through all departments and are processed for the same length of time in each department.

Q:: Formula: pre-determined overhead rate?
A:: Budgeted amount of overheads ÷ budgeted base.

Q:: Three bases on which a pre-determined rate may be estimated?
A:: The previous year's figure; estimated expenses and anticipated volume of production; the normal volume of business.

Q:: ICAI's definition of normal capacity?
A:: The volume of production or services achieved or achievable on an average over a period under normal circumstances, taking into account the reduction in capacity resulting from planned maintenance.

Q:: Normal idle capacity and abnormal idle capacity?
A:: Normal idle = installed capacity − normal capacity. Abnormal idle = normal capacity − actual capacity, where actual is lower.

Q:: On what capacity are fixed manufacturing overheads absorbed, and variable ones?
A:: Fixed on normal capacity; variable on actual production.

Q:: Operator-limited machine hours: wages on which hours, rate on which hours?
A:: Wages on paid hours (available less absenteeism without pay); the rate on effective hours (paid hours less leave with pay and normal idle time).
