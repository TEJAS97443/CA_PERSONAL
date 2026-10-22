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

:::: example A new fryer for the Frying department
Tapri installs a continuous fryer costing ₹48,00,000, with a life of 10 years and a scrap value of ₹3,00,000 at the end. Repairs over its life are estimated at ₹22,00,000 for 22,000 running hours. The factory works 300 days a year, 8 hours a day; these 2,400 hours include 100 hours of planned maintenance and 100 hours of set-up (changing moulds and heating the oil). Other data:

| Item | Data |
|---|---|
| Power | 30 units per running hour at ₹8 a unit; none during maintenance or set-up |
| Frying consumables (filters, conditioning powder) | ₹1,500 every 5 working days |
| Rent of the Frying department | ₹60,000 a month; the fryer occupies one-fifth of the area |
| Supervisor's salary | ₹54,000 a month; one-fourth of his time on the fryer |
| Lighting of the department | ₹9,000 a month; the fryer has 3 of the 12 light points |
| Insurance | 1% of cost a year |
| Two operators, wholly on the fryer | ₹30,000 a month each; included in the rate |

**Required:**

(i) Calculate the comprehensive machine hour rate, with standing charges and machine expenses separately, treating set-up time as productive.

(ii) Calculate the rate if set-up time is unproductive, and state what each version charges to the orders.

::: answer Show the working
**Working notes**

1. Depreciation (time basis) = (₹48,00,000 − ₹3,00,000) ÷ 10 = **₹4,50,000** a year.
2. Repairs relate to activity: ₹22,00,000 ÷ 22,000 hours = **₹100** per running hour.
3. Running hours = 2,400 − 100 maintenance − 100 set-up = **2,200**. Productive hours: **2,300** if set-up is productive (only maintenance is excluded), **2,200** if it is not.

**(i) Computation of machine hour rate, set-up productive (2,300 hours)**

| Particulars | Per annum (₹) | Per hour (₹) |
|---|---:|---:|
| **(A) Standing charges** | | |
| Depreciation (WN 1) | 4,50,000 | |
| Rent (₹60,000 × 12 × 1/5) | 1,44,000 | |
| Supervisor's salary (₹54,000 × 12 × 1/4) | 1,62,000 | |
| Lighting (₹9,000 × 12 × 3/12) | 27,000 | |
| Insurance (1% × ₹48,00,000) | 48,000 | |
| Operators' wages (2 × ₹30,000 × 12) | 7,20,000 | |
| **Total standing charges** | **15,51,000** | **674.35** |
| **(B) Machine expenses** | | |
| Power (2,200 hours × 30 units × ₹8) | 5,28,000 | |
| Repairs (2,200 hours × ₹100, WN 2) | 2,20,000 | |
| Consumables (300 ÷ 5 × ₹1,500) | 90,000 | |
| **Total machine expenses** | **8,38,000** | **364.35** |
| **Machine hour rate (A) + (B)** | **23,89,000** | **1,038.70** |

**(ii) Set-up unproductive (2,200 hours).** The same ₹23,89,000 is spread over fewer hours: standing charges ₹15,51,000 ÷ 2,200 = ₹705.00 and machine expenses ₹8,38,000 ÷ 2,200 = ₹380.91, a rate of **₹1,085.91**.

**What each charges.** With set-up productive, an order is charged for its set-up hours as well as its running hours, at ₹1,038.70. With set-up unproductive, only running hours are charged, at the higher ₹1,085.91, so the set-up cost is spread over all orders. Power and repairs are the same rupees either way: only the denominator moves.
:::
::::

::::: example Order H-26: one rate or three?
The samosa factory's budget for a month, after adding a hand-shaping line (wages are direct wages, overheads are factory overheads, hours are direct labour hours):

| Budget | Frying | Shaping | Packing |
|---|---:|---:|---:|
| Wages (₹) | 1,20,000 | 4,80,000 | 2,00,000 |
| Overheads (₹) | 10,80,000 | 2,40,000 | 1,80,000 |
| Labour hours | 6,000 | 40,000 | 20,000 |
| Machine hours | 24,000 | 2,000 | – |

Order H-26, 20,000 cocktail samosas for a hotel chain, needs:

| Order H-26 | Frying | Shaping | Packing |
|---|---:|---:|---:|
| Direct materials (₹) | 24,000 | 6,000 | 4,000 |
| Direct wages (₹) | 1,200 | 9,600 | 2,000 |
| Direct labour hours | 60 | 800 | 200 |
| Machine hours | 240 | 40 | – |

Tapri absorbs factory overheads by a single blanket rate, the percentage of total factory overheads to total direct wages, and adds 25% to factory cost for administration, selling overheads and profit.

> **Kesar:** The hotel says a rival bakery quoted ₹82,000, and ours is higher. Sab adjust ho jayega?
> **Ritu:** Not by discount. By the right rate.

**Required:**

(i) Compute the blanket rate and the price of Order H-26 under the current policy.

(ii) Recommend a suitable method for each department and compute its rate.

(iii) Compute the price of Order H-26 on the rates in (ii), and comment.

:::: answer Show the working
**(i) Blanket rate**

$$\text{Blanket rate} = \frac{\text{Total factory overheads}}{\text{Total direct wages}} \times 100 \qquad = \frac{15{,}00{,}000}{8{,}00{,}000} \times 100 = 187.5\%$$

The blanket rate is 187.5% of direct wages.

**(ii) Departmental rates.** In Frying the use of machine time is the predominant factor of production, so a machine hour rate: ₹10,80,000 ÷ 24,000 = **₹45 per machine hour**. In Shaping and in Packing direct labour is the main factor, so labour hour rates: Shaping ₹2,40,000 ÷ 40,000 = **₹6 per labour hour**; Packing ₹1,80,000 ÷ 20,000 = **₹9 per labour hour**.

**(iii) Price of Order H-26 on both bases**

| Particulars | Blanket rate (₹) | Departmental rates (₹) |
|---|---:|---:|
| Direct materials | 34,000 | 34,000 |
| Direct wages | 12,800 | 12,800 |
| Factory overheads (WN) | 24,000 | 17,400 |
| **Factory cost** | **70,800** | **64,200** |
| Add: 25% of factory cost | 17,700 | 16,050 |
| **Price** | **88,500** | **80,250** |

Working note: blanket 187.5% × ₹12,800 = ₹24,000. Departmental: Frying 240 machine hours × ₹45 = ₹10,800; Shaping 800 labour hours × ₹6 = ₹4,800; Packing 200 labour hours × ₹9 = ₹1,800; total ₹17,400.

::: diagram Order H-26: overhead charged by each department
{"type": "plot", "h": 280, "x": [0.4, 3.6], "y": [0, 20000],
 "xlabel": "department", "ylabel": "overhead charged (₹)",
 "xticks": [[1, "Frying"], [2, "Shaping"], [3, "Packing"]],
 "yticks": [[0, "0"], [5000, "5,000"], [10000, "10,000"], [15000, "15,000"], [20000, "20,000"]],
 "series": [
  {"label": "blanket 187.5% of wages", "bars": true, "bw": 0.32, "values": true, "color": "a", "pts": [[0.82, 2250, "2,250"], [1.82, 18000, "18,000"], [2.82, 3750, "3,750"]]},
  {"label": "departmental rates", "bars": true, "bw": 0.32, "values": true, "color": "d", "pts": [[1.18, 10800, "10,800"], [2.18, 4800, "4,800"], [3.18, 1800, "1,800"]]}
 ],
 "caption": "Blue: blanket rate; orange: departmental rates. Shaping's wages are high but its overheads low, so the blanket rate loads ₹18,000 onto a labour-heavy order and undercharges its 240 fryer hours."}
:::

**Comment.** The blanket rate assumes every product spends the same time in every department, which is not true here: Frying is machine-intensive with overheads nine times its wages, Shaping labour-intensive with overheads half its wages. Charged at 187.5% of wages, Order H-26 is overcosted by ₹6,600 and overpriced by ₹8,250. At ₹80,250 Tapri's price is below the rival's ₹82,000. The conditions for a blanket rate are not met, so departmental rates should be used.
::::
:::::

::: lab oh-distribution {"part":"rates","method":"step","depts":[["X","P","1,93,000"],["Y","P","64,000"],["Z","P","83,000"],["P","S","45,000"],["Q","S","75,000"],["R","S","1,05,000"],["S","S","30,000"]],"bases":[["Employees","100 125 85 10 50 40 50"],["Area (sq m)","3,000 1,500 1,500 500 1,500 1,000 1,000"],["Labour hours","4,000 3,000 4,000 1,000 5,000 6,000 3,000"]],"overheads":[],"service":[["P","Employees"],["Q","Labour hours"],["R","Area"],["S","Labour hours"]],"rate":"lh","job":""}
From distribution to rates in one run: Study Material Practical Problem 3 closes four service departments by the step method and ends on three labour hour rates.
:::

:::: example Five sealing machines, three operators
Tapri's premix plant has 5 identical pouch-sealing machines worked by 3 operators; a machine cannot be worked without an operator wholly engaged on it. The machines cost ₹12,00,000. For a quarter (3 months):

| Particulars | Data |
|---|---|
| Normal available hours per operator per month | 200 |
| Absenteeism (without pay), per operator for the quarter | 15 hours |
| Leave (with pay), per operator for the quarter | 18 hours |
| Normal unavoidable idle time, per operator for the quarter | 7 hours |
| Wages per operator | ₹640 for an 8-hour day |
| Production bonus | 10% of wages |
| Power; supervision and indirect labour; lighting and electricity (quarter) | ₹40,000; ₹21,000; ₹6,560 |
| Repairs and maintenance including consumables (year) | 4% of machines' cost |
| Depreciation (year) | 12% of original cost |
| Sundry works expenses; general management expenses allocated (year) | ₹24,000; ₹36,000 |
| Insurance for all five machines | an annual premium |

The comprehensive machine hour rate for the quarter is ₹187.50.

**Required:** Find the annual insurance premium.

::: answer Show the working
**Working note 1: effective hours.** The machines can run only while an operator is available:

| Hours, 3 operators, 3 months | Hours |
|---|---:|
| Normal available (200 × 3 × 3) | 1,800 |
| Less: absenteeism (15 × 3) | (45) |
| **Paid hours** | **1,755** |
| Less: leave with pay (18 × 3) | (54) |
| Less: idle time (7 × 3) | (21) |
| **Effective working hours** | **1,680** |

**Working note 2: wages.** ₹640 ÷ 8 = ₹80 an hour; wages are paid on paid hours: 1,755 × ₹80 = **₹1,40,400**.

**Overheads of the machine shop for the quarter**

| Particulars | Amount (₹) |
|---|---:|
| Operators' wages (WN 2) | 1,40,400 |
| Production bonus (10% of wages) | 14,040 |
| Power | 40,000 |
| Supervision and indirect labour | 21,000 |
| Lighting and electricity | 6,560 |
| Repairs and maintenance (4% × ₹12,00,000 × 3/12) | 12,000 |
| Depreciation (12% × ₹12,00,000 × 3/12) | 36,000 |
| Sundry works expenses (₹24,000 × 3/12) | 6,000 |
| General management expenses (₹36,000 × 3/12) | 9,000 |
| **Total excluding insurance** | **2,85,000** |
| Insurance for the quarter (balancing figure) | 30,000 |
| **Total overheads (₹187.50 × 1,680 hours)** | **3,15,000** |

Annual insurance premium = ₹30,000 × 4 = **₹1,20,000**.
:::
::::

## Under the hood

### Set-up, maintenance and other lost hours

Planned maintenance hours are left out of productive hours in every ICAI answer read for this lesson: the machine produces nothing in them. Set-up hours depend on the question: MTP September 2024 Series I Q4(a) said set-up time "is regarded as productive time", and MTP May 2025 Series II Q1(c) asked for both versions, as in the fryer example. Calendar questions build the hours from days: Sundays, holidays (and those falling on Saturdays), shorter Saturdays, strikes, then a capacity percentage (PYQ September 2024 Q5(a)) or a breakdown allowance taken on the hours left (RTP May 2026 Q8: 2,188 × 92%, less 3% of that).

### Depreciation: time or activity

Illustration 6 (SM 4.38–4.39) gives a machine's life in years and in hours: depreciation "can be calculated either on the basis of time ... or on the basis of activity". On time it is a standing charge, on activity a machine expense. Lifetime repairs are linked to activity and charged per hour.

### What goes in, and what does not

- Operators' wages: the Study Material says that sometimes they are added to get a comprehensive rate of working the machine (SM 4.33 note). Include them when the question gives them as part of the machine's costs (Illustration 7, PYQ January 2026 Q5(a)); otherwise they stay direct wages of the jobs.
- RTP May 2026 Q8 left **interest on capital outlay** out of its machine hour rates: "a finance cost, therefore it has been excluded from the cost accounts". Interest and financing charges are shown as a separate item of cost of sales ([[cma.oh.ads|administration, selling, distribution and R&D overheads]]).
- With a hired add-on used for some hours (a computer, an AI system), the machine's own overheads are shared over all its hours, and the hire charge over the hours with the add-on only (SM practical problem 4; PYQ May 2026 MCQs 6–10).

### Next door

The pre-determined rate never equals the actual: [[cma.oh.underover|under- and over-absorption]]. Activity based costing replaces one base per department with a cost driver per activity: [[cma.abc.concept|activities, cost pools and cost drivers]].

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

"Total expenses ₹23,89,000 ÷ 2,400 hours = ₹995.42."

All hours in the year, including maintenance: the denominator is wrong and nothing shows why.
---
**Passes**

The right total over 2,300 hours, ₹1,038.70, but expenses listed in one column with no workings.

Correct, yet a slip in the rent share would leave no method marks.
---
**Full marks**

Working notes first (depreciation, repairs per hour, productive hours), then ICAI's statement: standing charges and machine expenses, each with its working, an hourly rate for each, and the total.
:::

## Common mistakes

::: mistake Hall of Shame: the maintenance hours that made the fryer cheaper
Dividing the year's expenses by all 2,400 hours gives ₹995.42 and undercharges every order. **Fix:** the denominator is productive hours: leave out planned maintenance always, set-up time when it is unproductive, and idle time.
:::

::: mistake Paying for the absentee
Charging wages on effective hours (1,680 × ₹80) or on available hours (1,800 × ₹80). **Fix:** wages are paid on paid hours: available less absenteeism without pay (1,755), because leave with pay is paid but not worked.
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

Q: Case scenario. Tapri's samosa fryer line has overheads of ₹84,000 a month and worked 1,400 hours: 800 hours without a hired auto-fry sensor and 600 hours with it. The sensor's hire is ₹1,80,000 a quarter. Ritu must quote the machine hour rate for orders that use the sensor. Which is correct?
- [ ] ₹100 per hour
- [ ] ₹60 per hour
- [x] ₹160 per hour
- [ ] ₹102.86 per hour
> Machine overheads per hour = ₹84,000 ÷ 1,400 = ₹60; sensor hire per month = ₹60,000, borne only by the 600 sensor hours (₹100 an hour). With the sensor: ₹60 + ₹100 = ₹160. ₹60 is the rate without it; ₹102.86 spreads the hire over all 1,400 hours.

Q: For which limited purpose does ICAI accept the percentage of direct material cost as an absorption base?
- [ ] Factory overheads of a machine-intensive department
- [x] Material handling and stores overheads
- [ ] Administration overheads
- [ ] Overheads of a department with skilled workers
> SM 4.32: percentage of materials cost may be used for the limited purpose of absorbing material handling and store overheads. For factory overheads in general it ignores time, skill and the use of machines.

Q: A pre-determined rate of ₹30 per machine hour was set at the budgeted activity. Budgeted overheads are ₹4,20,000 at 12,000 machine hours and ₹4,60,000 at 14,000 machine hours. What is the budgeted activity in machine hours?
= 18000
> Variable rate = ₹40,000 ÷ 2,000 = ₹20 an hour; fixed = ₹4,20,000 − ₹2,40,000 = ₹1,80,000. At the budget, ₹20X + ₹1,80,000 = ₹30X, so X = 18,000 hours.

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
