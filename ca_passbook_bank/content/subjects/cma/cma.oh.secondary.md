---
id: cma.oh.secondary
title: Secondary distribution: direct, step, repeated and simultaneous methods
minutes: 34
needs: cma.oh.primary
tags: secondary distribution, re-apportionment, service departments, step method, repeated distribution, simultaneous equation, reciprocal service method
labs: oh-distribution
summary: How service departments' overheads reach the production departments: the direct method, the step ladder, and the reciprocal methods (repeated distribution, trial and error, simultaneous equations).
---

## In plain words

### Two departments that keep serving each other

After the [[cma.oh.primary|primary distribution]], the samosa factory's Stores holds ₹1,20,000 of overheads and Maintenance ₹3,00,000. Neither makes a single samosa, so their costs must move to Frying and Packing before any pack can carry them. The catch: Maintenance repairs Stores' racks and cold room, and Stores issues spares to Maintenance. They serve each other.

> **Bunty:** Easy. Send Stores to Frying and Packing, send Maintenance to Frying and Packing. Done.
> **Ritu:** Then the spares Stores gives Maintenance count for nothing. Fine if they are small.
> **Kesar:** And if they are big?
> **Ritu:** Then the costs go back and forth until there is nothing left to send.

Moving service department costs to production departments is **re-apportionment**, or **secondary distribution**. There are three ways to do it, and they differ only in how they treat the services that service departments give each other:

- The **direct method** ignores them: each service department's cost goes straight to the production departments.
- The **step method** counts them one way: service departments are closed one at a time, and a closed department receives nothing back.
- The **reciprocal service method** counts them both ways, by passing the costs back and forth until they run out (**repeated distribution**, or **trial and error**), or by solving two equations in one go (**simultaneous equations**).

::: analogy Ping-pong with a melting ball
Stores and Maintenance play ping-pong with a ball of ice. Every time one of them hits it, 80% melts onto the production departments' side of the table and only 20% reaches the other player. After a few rallies the ball is gone. You can play every rally (repeated distribution) or work out at once where every drop fell (simultaneous equations): the puddles are the same. The direct method pretends the ball never crosses the net; the step method lets it cross once.
:::

::: key
The methods differ only in how they treat services between service departments: the direct method ignores them, the step method recognises them one way, and the reciprocal methods recognise them both ways. All the reciprocal methods give the same answer.
:::

## How it works

### The bases for service departments

Each service department's cost is re-apportioned on the measure of the service it gives. The Study Material suggests these bases (SM 4.17):

| Cost of the service department | Basis |
|---|---|
| 1. Maintenance and repair shop; 2. Planning and progress; 3. Tool room | Direct labour hours, machine hours, direct labour wages, asset value × hours worked |
| 4. Canteen and welfare; 5. Hospital and dispensary; 6. Personnel department | Number of direct workers, number of employees etc. |
| 7. Time-keeping | Number of cards punched, number of employees |
| 8. Computer section | Computer hours, specific allocation to departments |
| 9. Power house (electric lighting cost) | Floor area, cubic content, number of electric points, wattage |
| 10. Power house (electric power cost) | Horse power, kWh, horse power × machine hours, kWh × machine hours |
| 11. Stores department | Number of requisitions, weight or value of materials issued |
| 12. Transport department | Crane hours, truck hours, truck mileage, truck tonnage, truck ton-hours, tonnage handled, number of packages of standard size |
| 13. Fire protection | Capital values |
| 14. Inspection | Inspection hours |

ICAI's notes to the table: (1) repairs included in the repair shop's cost, building maintenance included in the maintenance shop's cost and the like should be apportioned on capital values; (2) economy, practicability, equitability and reliability are the matters of consideration for selection of the base.

### Three methods, one family tree

::: diagram Methods for re-apportionment (SM 4.18)
{"type": "tree", "gapY": 90, "root": {"label": "Methods for\nre-apportionment", "children": [{"label": "Direct\nre-distribution", "color": "a"}, {"label": "Step\n(non-reciprocal)", "color": "b"}, {"label": "Reciprocal\nservice", "color": "c", "children": [{"label": "Simultaneous equation\nTrial and error\nRepeated distribution"}]}]}, "caption": "The reciprocal service method has three ways of handling the services that service departments render to each other."}
:::

For the samosa factory, the services are (percentages of each service department's work):

::: diagram Who serves whom in the samosa factory
{"type": "graph", "w": 420, "h": 300, "nodes": [{"id": "S", "label": "Stores", "x": 75, "y": 150, "fill": "c", "shape": "square"}, {"id": "M", "label": "Maint.", "x": 345, "y": 150, "fill": "c", "shape": "square"}, {"id": "F", "label": "Frying", "x": 210, "y": 45, "fill": "a"}, {"id": "P", "label": "Packing", "x": 210, "y": 255, "fill": "a"}], "edges": [{"from": "S", "to": "F", "label": "40%"}, {"from": "S", "to": "P", "label": "40%"}, {"from": "M", "to": "F", "label": "60%"}, {"from": "M", "to": "P", "label": "20%"}, {"from": "S", "to": "M", "label": "20%"}, {"from": "M", "to": "S", "label": "20%"}], "caption": "Amber squares: service departments; blue circles: production departments. Maint.: Maintenance. Each arrow is the share of a service department's work done for the department it points to. Example 1 works all four methods on these figures."}
:::

### Method 1: direct re-distribution

Service department costs are apportioned over the **production departments only, ignoring the services rendered by one service department to the other** (SM 4.18). The percentages for the production departments are scaled up to 100%: Stores' 40% and 40% become 1 : 1; Maintenance's 60% and 20% become 3 : 1. Simple, but the services between service departments are lost: the bigger they are, the further the result drifts from the reciprocal answer (Example 1 measures the drift).

### Method 2: the step method (non-reciprocal)

This method gives cognizance to the services rendered by one service department to another, so a **sequence** must be chosen (SM 4.19–4.20):

::: steps
1. Start with the service department that serves the **largest number of other departments** (service and production). Apportion its cost to all the departments it serves.
2. Then take the department serving the next largest number, with its own cost plus the share it has received, and apportion it to the departments **not yet closed**.
3. Continue until the last service department, whose cost goes to the production departments only.
4. A closed department receives nothing back. When a basis is a count (employees, requisitions), leave out the department's own figure and those of departments already closed.
:::

The Study Material's summary words the rule as "the department that renders service to the maximum number of other service departments" (SM 4.64). Both wordings give the same order whenever every service department serves all the production departments, as in this lesson's examples.

The Study Material also notes the view of some authors that the service department with the **largest amount of cost** should be distributed first (SM 4.20). PassBook's suggestion: use it to break a tie in the number of departments served. When the question states the order ("in the same order viz. R and S"), follow it.

### Method 3: the reciprocal service method

Where two or more service departments render services to each other, these inter-departmental services are given due weight (SM 4.21). Three ways:

- **(a) Simultaneous equation method.** Write each service department's total cost as its own cost plus its share of the other's total, solve, and apportion the totals to the production departments on the given percentages.
- **(b) Trial and error method.** Apportion one service department's cost to the other service department only, then the other's cost plus that share back to the first, and repeat until the amount becomes negligible. Add up each service department's amounts to get its total cost, and apportion the totals to the production departments. It gives the same result as the simultaneous equation method (SM 4.23).
- **(c) Repeated distribution method.** Distribute each service department's cost to the other service and production departments on the agreed percentages, and repeat the process until the service departments' figures are exhausted or reduced to too small a figure (SM 4.26).

::: lab oh-distribution {"part":"secondary","method":"repeated"}
Press play to watch the service balances shrink round after round until ICAI's closing step, then switch the method to compare all of them on the same data.
:::

## Formats and formulas

*ICAI heads the statement Secondary Overhead Distribution Statement (SM 4.19), Secondary Distribution Summary, or Re-distribution of Service Department's Expenses. Reproduce the layout from memory. In an answer each department has its own column; the direct and simultaneous equation methods may show the production departments only, the step and repeated distribution methods need the service departments' columns too.*

| Particulars | Production depts (₹) | Service depts (₹) |
|---|---:|---:|
| Overheads as per primary distribution | xxx | xxx |
| Service department S1 apportioned (ratio) | xxx | (xxx) |
| Service department S2 apportioned (ratio) | xxx | (xxx) |
| … repeated, for the repeated distribution method | … | … |
| **Total** | **xxx** | **Nil** |

::: definition Secondary distribution
The re-apportionment of the service department cost to the production department is known as secondary distribution. (SM 4.16)
:::

::: definition Direct re-distribution method
Under this method service department costs are apportioned over the production departments only, ignoring the services rendered by one service department to the other. (SM 4.64)
:::

::: definition Step method or non-reciprocal method
This method gives cognizance to the service rendered by service department to another service department. The sequence here begins with the department that renders service to the maximum number of other service departments. (SM 4.64)
:::

::: definition Reciprocal service method
These methods are used when different service departments render services to each other, in addition to rendering services to production departments; the various service departments have to share overheads of each other. (SM 4.64)
:::

::: formula Direct method: share of a production department
$$\text{Share} = \text{Service cost} \times \frac{\text{Its \%}}{\text{Production \%}}$$
"Its %" is the production department's share of the service; "production %" is the total of the production departments' shares (80% for Stores in the samosa factory).
:::

::: formula Simultaneous equations for two service departments
$$S_1 = a + p\,S_2 \qquad S_2 = b + q\,S_1$$

Substituting the second equation in the first:

$$S_1 = \frac{a + p\,b}{1 - p\,q}$$

$a$, $b$: the service departments' costs after primary distribution; $p$: the share of $S_2$'s work done for $S_1$; $q$: the share of $S_1$'s work done for $S_2$; $S_1$, $S_2$: their total costs including reciprocal services. Then $S_2 = b + q\,S_1$. Apportion $S_1$ and $S_2$ on the production departments' percentages only.
:::

::: formula The check that saves marks
$$\text{Production shares} = a + b$$
Under every method, the production departments receive exactly the service departments' primary totals ($a + b$). The solved totals $S_1 + S_2$ exceed this figure, because they include the services the departments render to each other.
:::

## Worked examples

::::: example One factory, four answers
Tapri's samosa factory has these overheads after primary distribution: Frying ₹7,38,000, Packing ₹4,20,000, Stores ₹1,20,000, Maintenance ₹3,00,000. The services rendered by the service departments are:

| Service department | Frying | Packing | Stores | Maintenance |
|---|---:|---:|---:|---:|
| Stores | 40% | 40% | – | 20% |
| Maintenance | 60% | 20% | 20% | – |

Frying works 6,000 machine hours and Packing 7,500 direct labour hours in the month.

**Required:** Re-apportion the service departments' overheads to Frying and Packing using

(i) the direct re-distribution method;

(ii) the step method, apportioning Maintenance first;

(iii) the repeated distribution method;

(iv) the simultaneous equation method.

(v) Using (iv), calculate the machine hour rate of Frying and the labour hour rate of Packing.

(vi) Comment on the results.

:::: answer Show the working
**(i) Direct re-distribution method**

Working note: production percentages scaled to 100%: Stores 40 : 40 = 1 : 1; Maintenance 60 : 20 = 3 : 1.

| Particulars | Frying (₹) | Packing (₹) |
|---|---:|---:|
| Overheads as per primary distribution | 7,38,000 | 4,20,000 |
| Stores (1 : 1) | 60,000 | 60,000 |
| Maintenance (3 : 1) | 2,25,000 | 75,000 |
| **Total** | **10,23,000** | **5,55,000** |

**(ii) Step method, Maintenance first**

| Particulars | Frying | Packing | Stores | Maintenance |
|---|---:|---:|---:|---:|
| Primary distribution | 7,38,000 | 4,20,000 | 1,20,000 | 3,00,000 |
| Maintenance (60 : 20 : 20) | 1,80,000 | 60,000 | 60,000 | (3,00,000) |
| Stores (40 : 40 = 1 : 1) | 90,000 | 90,000 | (1,80,000) | – |
| **Total** | **10,08,000** | **5,70,000** | **–** | **–** |

Maintenance is closed, so Stores' 20% for Maintenance is ignored and its ₹1,80,000 goes to Frying and Packing only.

**(iii) Repeated distribution method** (amounts rounded to the rupee; Stores taken first)

| Particulars | Frying | Packing | Stores | Maintenance |
|---|---:|---:|---:|---:|
| Primary distribution | 7,38,000 | 4,20,000 | 1,20,000 | 3,00,000 |
| Stores (40 : 40 : – : 20) | 48,000 | 48,000 | (1,20,000) | 24,000 |
| Maintenance (60 : 20 : 20 : –) | 1,94,400 | 64,800 | 64,800 | (3,24,000) |
| Stores | 25,920 | 25,920 | (64,800) | 12,960 |
| Maintenance | 7,776 | 2,592 | 2,592 | (12,960) |
| Stores | 1,037 | 1,037 | (2,592) | 518 |
| Maintenance | 311 | 104 | 103 | (518) |
| Stores | 41 | 41 | (103) | 21 |
| Maintenance | 13 | 4 | 4 | (21) |
| Stores | 2 | 2 | (4) | – |
| **Total** | **10,15,500** | **5,62,500** | **–** | **–** |

::: diagram The melting ball: what is still with the service departments
{"type": "plot", "h": 260, "x": [0, 9], "y": [0, 450000],
 "xlabel": "passes of the repeated distribution", "ylabel": "amount left (₹)",
 "xticks": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
 "yticks": [[0, "0"], [150000, "1,50,000"], [300000, "3,00,000"], [420000, "4,20,000"]],
 "series": [{"label": "left with Stores and Maintenance", "pts": [[0, 420000], [1, 324000], [2, 64800], [3, 12960], [4, 2592], [5, 518], [6, 103], [7, 21], [8, 4], [9, 0]], "color": "d", "dots": true}],
 "caption": "After the first pass, each pass leaves only 20% of what it moved with the other service department; by the fourth pass less than ₹3,000 is left."}
:::

**(iv) Simultaneous equation method**

Let S and M be the total overheads of Stores and Maintenance.

$$S = 1{,}20{,}000 + 0.20M \qquad M = 3{,}00{,}000 + 0.20S$$

Substituting M in the first equation:

$$S = 1{,}20{,}000 + 0.20\,(3{,}00{,}000 + 0.20S) \qquad = 1{,}80{,}000 + 0.04S$$

$$0.96S = 1{,}80{,}000 \qquad S = \text{₹}1{,}87{,}500$$

M = ₹3,00,000 + 0.20 × ₹1,87,500 = **₹3,37,500**.

| Particulars | Frying (₹) | Packing (₹) |
|---|---:|---:|
| Overheads as per primary distribution | 7,38,000 | 4,20,000 |
| Stores (40% and 40% of ₹1,87,500) | 75,000 | 75,000 |
| Maintenance (60% and 20% of ₹3,37,500) | 2,02,500 | 67,500 |
| **Total** | **10,15,500** | **5,62,500** |

Check: ₹2,77,500 + ₹1,42,500 = ₹4,20,000, the service departments' primary total. The repeated distribution gave the same figures.

**(v) Overhead rates**: Frying ₹10,15,500 ÷ 6,000 machine hours = **₹169.25 per machine hour**; Packing ₹5,62,500 ÷ 7,500 labour hours = **₹75.00 per labour hour**.

::: diagram Frying's share of the ₹4,20,000, method by method
{"type": "plot", "h": 270, "x": [0.4, 4.6], "y": [0, 320000],
 "ylabel": "Frying's share (₹)",
 "xticks": [[1, "Direct"], [2, "Step, M first"], [3, "Step, S first"], [4, "Reciprocal"]],
 "yticks": [[0, "0"], [100000, "1,00,000"], [200000, "2,00,000"], [300000, "3,00,000"]],
 "series": [{"label": "Frying's share", "bars": true, "values": true, "color": "a", "pts": [[1, 285000, "2,85,000"], [2, 270000, "2,70,000"], [3, 291000, "2,91,000"], [4, 277500, "2,77,500"]]}],
 "legend": "none",
 "caption": "Step, S first: Stores ₹1,20,000 to Frying, Packing and Maintenance (40 : 40 : 20), then Maintenance's ₹3,24,000 at 3 : 1. The reciprocal bar is the same for the repeated, trial and error and simultaneous equation methods."}
:::

**(vi) Comment.** The reciprocal methods recognise the services Stores and Maintenance render each other in full, so ₹2,77,500 is Frying's fair share. The direct method ignores those services and overcharges Frying by ₹7,500 (a rate of ₹170.50); the step method recognises them in one direction only, and its result depends on the order: ₹2,70,000 with Maintenance first, ₹2,91,000 with Stores first. Where service departments serve each other this much (20% each way), the Study Material's point applies: the inter-departmental services are to be given due weight, and only a reciprocal method does that in full.
::::
:::::

:::: example Chai premix plant: the canteen and the fitters
Tapri's chai premix plant has production departments Blending and Pouching and service departments Canteen and Maintenance. Overheads after primary distribution: Blending ₹4,60,000, Pouching ₹3,10,000, Canteen ₹1,20,000, Maintenance ₹1,80,000.

| Particulars | Blending | Pouching | Canteen | Maintenance |
|---|---:|---:|---:|---:|
| Number of employees | 45 | 75 | 8 | 30 |
| Maintenance hours | 1,800 | 600 | – | – |
| Machine hours | 5,000 | – | – | – |
| Direct labour hours | – | 10,000 | – | – |

The canteen serves the employees of all departments; Maintenance does no work for the canteen.

**Required:**

(i) State the order in which the step method should close the service departments, with the reason.

(ii) Re-apportion the service departments' overheads by the step method.

(iii) Calculate a machine hour rate for Blending and a labour hour rate for Pouching.

::: answer Show the working
**(i) Order.** The canteen serves three other departments (Blending, Pouching and Maintenance); Maintenance serves two (Blending and Pouching). The step method begins with the department that serves the largest number of other departments, so **Canteen first, then Maintenance**.

**(ii) Step distribution**

Working note: the canteen's basis is the number of employees of the departments it serves, leaving out its own 8: 45 : 75 : 30 = 3 : 5 : 2.

| Particulars | Blending | Pouching | Canteen | Maintenance |
|---|---:|---:|---:|---:|
| Primary distribution | 4,60,000 | 3,10,000 | 1,20,000 | 1,80,000 |
| Canteen (3 : 5 : – : 2) | 36,000 | 60,000 | (1,20,000) | 24,000 |
| Maintenance, hours (1,800 : 600 = 3 : 1) | 1,53,000 | 51,000 | – | (2,04,000) |
| **Total** | **6,49,000** | **4,21,000** | **–** | **–** |

Check: 6,49,000 + 4,21,000 = ₹10,70,000, the total overheads.

**(iii) Rates**: Blending ₹6,49,000 ÷ 5,000 = **₹129.80 per machine hour**; Pouching ₹4,21,000 ÷ 10,000 = **₹42.10 per labour hour**.

Because Maintenance gives no service to the canteen, nothing is lost by closing the canteen first: here the step method recognises every service and gives the same result as a reciprocal method would.
:::
::::

::: lab oh-distribution {"part":"secondary","method":"step","depts":[["MD","P","0"],["DS","P","0"],["Finance","S","22,96,800"],["IT","S","30,30,500"]],"bases":[],"overheads":[],"service":[["Finance","4,500 2,250 - 750"],["IT","67,500 75,000 7,500 -"]],"rate":"mh","job":""}
Here is MTP September 2025 Series II Q2(a), Finance and IT closed by the step method; switch the method to see direct and simultaneous on the same data.
:::

:::: example Four marks, seven minutes: the kulhad unit's equations
Tapri's kulhad unit has production departments Kiln, Glazing and Painting and two service departments, the Quality lab and the Power house, which also serve each other. Their expenses after primary distribution are: Quality lab ₹96,000; Power house ₹2,10,000. Their services are used as follows:

| Service department | Kiln | Glazing | Painting | Quality lab | Power house |
|---|---:|---:|---:|---:|---:|
| Quality lab | 30% | 30% | 15% | – | 25% |
| Power house | 40% | 30% | 20% | 10% | – |

**Required:** Apportion the expenses of the service departments to the production departments using the simultaneous equation method.

::: answer Show the working
Let Q and H be the total expenses of the Quality lab and the Power house.

$$Q = 96{,}000 + 0.10H \qquad H = 2{,}10{,}000 + 0.25Q$$

$$Q = 96{,}000 + 0.10\,(2{,}10{,}000 + 0.25Q) \qquad = 1{,}17{,}000 + 0.025Q$$

$$0.975Q = 1{,}17{,}000 \qquad Q = \text{₹}1{,}20{,}000$$

$$H = 2{,}10{,}000 + 0.25 \times 1{,}20{,}000 \qquad = \text{₹}2{,}40{,}000$$

| Particulars | Kiln (₹) | Glazing (₹) | Painting (₹) |
|---|---:|---:|---:|
| Quality lab (30%, 30%, 15% of ₹1,20,000) | 36,000 | 36,000 | 18,000 |
| Power house (40%, 30%, 20% of ₹2,40,000) | 96,000 | 72,000 | 48,000 |
| **Total** | **1,32,000** | **1,08,000** | **66,000** |

The total apportioned to the production departments is ₹3,06,000 = ₹96,000 + ₹2,10,000.
:::
::::

::: lab oh-distribution {"part":"secondary","method":"simultaneous","depts":[["P1","P","0"],["P2","P","0"],["P3","P","0"],["S1","S","1,60,000"],["S2","S","2,40,000"]],"bases":[],"overheads":[],"service":[["S1","25 35 20 - 20"],["S2","35 30 25 10 -"]],"rate":"mh","job":""}
The same two equations on the September 2025 paper, Q2(b): watch the substitution, and see why S1's 20% to S2 is not added twice.
:::

## Under the hood

### Trial and error on the samosa factory

The trial and error method runs the repeated distribution between the service departments only (SM 4.23):

| Step | Stores (₹) | Maintenance (₹) |
|---|---:|---:|
| Primary distribution | 1,20,000 | 3,00,000 |
| 20% of Stores' ₹1,20,000 to Maintenance | | 24,000 |
| 20% of Maintenance's ₹3,24,000 to Stores | 64,800 | |
| 20% of ₹64,800 to Maintenance | | 12,960 |
| 20% of ₹12,960 to Stores | 2,592 | |
| 20% of ₹2,592 to Maintenance | | 518 |
| 20% of ₹518 to Stores | 104 | |
| 20% of ₹104 to Maintenance | | 21 |
| 20% of ₹21 to Stores | 4 | |
| 20% of ₹4 to Maintenance | | 1 |
| **Total** | **1,87,500** | **3,37,500** |

The totals are the simultaneous equation answers. Each total is then split on the production percentages only: Stores 40% and 40%, Maintenance 60% and 20%. ICAI's Illustration 4 rounds these totals to the nearest hundred before the split (SM 4.26), which is why its trial and error figures differ from its repeated distribution figures by a few tens of rupees.

### Why the reciprocal methods must agree

Each pass sends 20% of what it moved back to the other department, so the amounts form a geometric series. Repeated distribution adds the series term by term; the simultaneous equations add it in one step, which is where the $1 - pq$ (here 1 − 0.20 × 0.20 = 0.96) in the denominator comes from. With three or more service departments, the equations become three or more, and repeated distribution is usually quicker by hand.

### Dual-rate apportionment: an MTP extension

MTP September 2025 Series II Q2(a) apportioned support departments' **fixed** costs on budgeted usage and **variable** costs on actual usage (a "dual-rate method"), each by the direct, step-down and reciprocal methods. The Study Material does not cover the dual-rate method; the three methods themselves work exactly as above, once for each cost pool.

### Where the totals go next

The production departments' totals become the numerators of the absorption rates: [[cma.oh.absorb|machine hour and labour hour rates]]. In activity based costing the same idea, a cost pool charged on the measure of the service it gives, becomes a cost driver: [[cma.abc.concept|activities, cost pools and cost drivers]].

## Exam angle

::: exam How ICAI asks secondary distribution
In the documents read for this lesson, secondary distribution came up in 15 of them:

- **Simultaneous equations alone, 3–4 marks**: September 2025 Q2(b) (two service and three production departments, 4 marks); September 2026 Q1(c) ("Use simultaneous equation method and find out the total expenses of FC", 3 marks).
- **Inside a full overhead question, 8–12 marks**, after the primary distribution and before an hourly rate: MTP January 2025 Series I Q2(a) (repeated distribution), MTP May 2025 Series I Q5(b) and MTP May 2026 Series I Q3(b) (simultaneous equations), RTP September 2025 Q9 (direct method, "ignoring the apportionment of service department costs among service departments"), RTP May 2025 Q10 (service costs to two production departments in given ratios, then pre-determined rates), RTP January 2026 Q10 (administration and general management re-apportioned in sequence), and in the old scheme November 2020 Q2(b) (simultaneous, with a note that repeated distribution is acceptable) and November 2023 Q3(a) (step method, 10 marks).
- **All three methods on one set of data, 12 marks**: MTP September 2025 Series II Q2(a).
- **Case-scenario MCQs**: RTP September 2026 case scenario 1 (step method).
- **Bases, 4–5 marks**: January 2025 Q6(c) (OR, 4 marks) and, in the old scheme, May 2023 Q6(d) (5 marks): "Suggest any one basis of re-apportionment of service department overheads" for eight or ten service departments; the answers were ICAI's table.
- **Theory, 4 marks**: MTP January 2025 Series II Q6(d) (OR), "Discuss in brief three main methods of allocating support departments costs to operating departments"; the chapter's own questions 2 and 8.
:::

::: exam Traps
- **Direct method**: scale the production percentages to 100% (MTP September 2025 used 4,500 : 2,250 hours, not 60% : 30%).
- **Own count out**: a service department's own employees, hours or requisitions are left out of its basis under every method (MTP May 2026 Series I Q3(b), simultaneous equations: General Plant spread on employees 20 : 12 : 8 = 5 : 3 : 2, leaving out its own 4).
- **Step method**: closed departments are left out too (November 2023 apportioned R's cost "in the ratio of number of employees (10 : 30 : 4)", leaving out R's own 6, then S's cost on machine hours 40 : 10, leaving out R's and S's).
- **Simultaneous equations**: apportion the solved totals on the production percentages only; the production departments must receive exactly the service departments' primary total.
- Round consistently (ICAI's answers usually round to the rupee) and show the check line.
:::

::: trick The closed-form shortcut
For two service departments: $S_1 = (a + pb) \div (1 - pq)$. Kulhad unit: (96,000 + 0.10 × 2,10,000) ÷ (1 − 0.10 × 0.25) = 1,17,000 ÷ 0.975 = ₹1,20,000. Condition: exactly two service departments; still write both equations in the answer, because the method is what earns the marks.
:::

## Answer frame

**"Explain the methods of re-apportionment of service department expenses"** (SM theory questions 2 and 8; MTP January 2025 Series II Q6(d)): the points ICAI's answer gives, in order.

1. **Direct re-distribution method**: service department costs are apportioned over the production departments only, ignoring the services rendered by one service department to the other.
2. **Step method (non-reciprocal method)**: gives cognizance to the services rendered by one service department to another; the cost of the service department that serves the maximum number of departments is apportioned first, then the next, until the last service department's cost is apportioned to production departments only.
3. **Reciprocal service method**: recognises that service departments may render services to each other and gives these inter-departmental services due weight. The methods available are (a) the simultaneous equation method, (b) the repeated distribution method and (c) the trial and error method, each in one line.

If time allows, add a two-line illustration (two service departments that serve each other) under the reciprocal method.

## Common mistakes

::: mistake Hall of Shame: the step method's boomerang
After closing Maintenance, the student apportions Stores' ₹1,80,000 as 40 : 40 : 20, sending ₹36,000 back to the closed Maintenance column, which then never empties. **Fix:** a closed department receives nothing; the last department's cost goes to production departments only (here 1 : 1).
:::

::: mistake The direct method that lost 20%
Taking Stores' 40% and 40% literally distributes only ₹96,000 of ₹1,20,000. **Fix:** in the direct method, scale the production percentages to 100% (1 : 1); the service departments must end at nil.
:::

::: mistake Distributing the wrong totals
Solving S = ₹1,87,500 and M = ₹3,37,500, then apportioning ₹1,20,000 and ₹3,00,000 anyway; or apportioning the solved totals on all four percentages, so that the 20% shares go round a second time. **Fix:** apportion the solved totals on the production percentages only, and check that the production departments received exactly ₹4,20,000.
:::

::: mistake The canteen that fed itself
Apportioning the canteen on all 158 employees (45 : 75 : 8 : 30) leaves ₹6,076 with the canteen. **Fix:** a service department's own count is left out of its basis: 45 : 75 : 30.
:::

## Practice

::: quiz Check yourself
Q: Service department X costs ₹76,000 and Y ₹1,00,000 after primary distribution. X receives 20% of Y's services and Y 20% of X's. What is X's total cost under the simultaneous equation method (₹)?
= 100000
> X = 76,000 + 0.2Y and Y = 1,00,000 + 0.2X, so X = (76,000 + 20,000) ÷ (1 − 0.04) = ₹1,00,000 (and Y = ₹1,20,000).

Q: Which method ignores the services that service departments render to each other?
- [x] Direct re-distribution method
- [ ] Step method
- [ ] Repeated distribution method
- [ ] Trial and error method
> The direct method apportions service costs over the production departments only. The step method recognises them one way; the other two are reciprocal methods.

Q: Case scenario. Tapri's cold-chain hub has three service departments. The Time office serves four other departments, Stores serves three and the Boiler house serves two. Ritu uses the step method and the question gives no order. In which order should she close them?
- [ ] Boiler house, Stores, Time office
- [x] Time office, Stores, Boiler house
- [ ] Stores, Time office, Boiler house
- [ ] In the order of the largest cost first, whatever the services
> The Study Material's rule: begin with the department that serves the largest number of other departments, then the next largest. "Largest cost first" is only a view of some authors that the Study Material mentions, and no costs are given here: the rule in the text decides.

Q: Compared with the simultaneous equation method, the trial and error method gives:
- [ ] a higher cost for the production department with the most machine hours
- [x] the same result
- [ ] a lower total, because the last small amounts are ignored
- [ ] the same result as the direct method
> Both recognise the reciprocal services in full; the Study Material says they give the same result (SM 4.23). Any difference is rounding.

Q: Stores costs ₹50,000 and serves Frying 50%, Packing 30% and Maintenance 20%. Under the direct method, what is Frying's share (₹)?
= 31250
> The direct method ignores Maintenance and scales the production shares to 100%: 50 : 30 = 5 : 3, so ₹50,000 × 5 ÷ 8 = ₹31,250. Taking 50% (₹25,000) leaves part of Stores undistributed.
:::

## Recap

- Secondary distribution: re-apportioning service department costs to production departments, on bases such as machine or direct labour hours (maintenance), number of employees (canteen, personnel), requisitions or value of materials issued (stores), kWh (power house), capital values (fire protection).
- Direct method: production departments only, inter-service services ignored, production percentages scaled to 100%.
- Step method: start with the department serving the largest number of others (some authors: largest cost first); a closed department receives nothing; the last goes to production only.
- Reciprocal service method: simultaneous equations, trial and error, repeated distribution; all give the same result.
- Two service departments: S₁ = a + pS₂ and S₂ = b + qS₁; apportion the solved totals on production percentages only.
- Check: production departments receive exactly the service departments' primary total.
- Then the production totals ÷ machine or labour hours give the absorption rates. (The ball always melts.)

## Flashcards

Q:: What is secondary distribution?
A:: The re-apportionment of service department costs to production departments.

Q:: The three methods of re-apportionment (SM 4.18)?
A:: Direct re-distribution method; step method of secondary distribution (non-reciprocal method); reciprocal service method.

Q:: The three reciprocal service methods?
A:: Simultaneous equation method, trial and error method, repeated distribution method.

Q:: Direct re-distribution method in one line?
A:: Service department costs are apportioned over the production departments only, ignoring the services rendered by one service department to the other.

Q:: Step method: which service department is apportioned first?
A:: The one that renders services to the largest number of other departments; some authors would take the one with the largest cost first.

Q:: Step method: what does a service department already closed receive?
A:: Nothing; the last service department's cost goes to the production departments only.

Q:: Trial and error method: how does it work?
A:: The service departments' costs are apportioned back and forth between the service departments only until the amount is negligible; the totals are then apportioned to production departments. Same result as simultaneous equations.

Q:: Repeated distribution method: how does it work?
A:: Each service department's cost is distributed to other service and production departments on agreed percentages, repeatedly, until the service departments' figures are exhausted or too small.

Q:: Basis for re-apportioning the stores department's cost?
A:: Number of requisitions, or weight or value of materials issued.

Q:: Bases for canteen, hospital and personnel departments?
A:: Number of direct workers, number of employees.

Q:: Bases for the maintenance and repair shop, planning and progress, and tool room?
A:: Direct labour hours, machine hours, direct labour wages, asset value × hours worked.

Q:: Four considerations for selecting a base (SM 4.17)?
A:: Economy, practicability, equitability and reliability.
