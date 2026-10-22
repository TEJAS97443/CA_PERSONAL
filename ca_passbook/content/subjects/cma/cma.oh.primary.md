---
id: cma.oh.primary
title: Primary distribution of factory overheads
minutes: 26
needs: cma.oh.classify
tags: primary distribution, primary distribution summary, bases of apportionment, overhead distribution statement, apportionment, allocation
labs: oh-distribution
summary: How every factory overhead reaches a department, production or service: allocate whole items, apportion shared ones on ICAI's bases, and total the primary distribution summary.
---

## In plain words

### Equal shares, said Kesar

Ritu has the samosa factory's overhead budget for a month: ₹15.78 lakh, already sorted by kind ([[cma.oh.classify|classifying overheads]]). Now each rupee must reach a department. The factory has two **production departments**, Frying and Packing, and two **service departments**, Stores and Maintenance, which only help the other two.

> **Kesar:** Divide by four. Equal shares, nobody fights.
> **Ritu:** Frying has ten fryers that run day and night; Packing has sixty workers and one sealing machine. Equal shares would make Packing pay Frying's power bill.

So Ritu goes item by item. Some items belong wholly to one department: the storekeepers' wages go to Stores, the fryer lubricants to Frying. Those are **allocated**. The rest are shared, and for each one she picks a yardstick that measures how much each department benefits from it or causes it: rent by **floor area**, supervision by **number of workers**, depreciation of plant by **capital value**, machine power by **horse power × machine hours**. Each shared item is split in the ratio of its own yardstick: that is **apportionment**.

When every item has been placed, she adds up each department's column. The result, every factory overhead sitting in a production or service department, is the **primary distribution**. The service departments' totals will be passed on to Frying and Packing in the next step, the [[cma.oh.secondary|secondary distribution]].

::: analogy The housing society's maintenance bill
A housing society bills each flat on several yardsticks at once: water by the flat's own meter, security by the number of flats, the garden by carpet area, the lift by the floors it serves. Nobody would split the water bill by carpet area. Each bill is shared by whatever measures who uses it, and that is exactly how each factory overhead finds its basis.
:::

::: key
Primary distribution charges every factory overhead to every department that benefits from it, **production and service alike**: whole items by allocation, shared items by apportionment, each shared item on the basis that best measures the benefit received or the cause of the cost.
:::

## How it works

### Five steps to a primary distribution summary

::: steps
1. **Lay out the data**: the overheads, and the facts about each department the bases need (floor area, workers, capital values, horse power, machine hours, light points).
2. **Allocate** every item identifiable with one department, service departments included: the storekeepers' wages and the stores they consume go to Stores. Direct materials and direct wages of the production departments are prime cost, not overheads: they stay out.
3. **Choose a basis** for each shared item, on the principle of benefit received or cause and effect (SM 4.8), using ICAI's bases below.
4. **Reduce the basis to a ratio**, over only the departments that share the cost, and split the item: share = item × the department's units of the base ÷ the total units.
5. **Total each column**. A department's primary total = its allocated overheads + its apportioned overheads. Check that the columns add up to the total overheads.
:::

::: diagram One shared item, split by floor area
{"type": "tree", "root": {"label": "Rent\n₹1,80,000", "children": [{"label": "Kiln\n₹90,000", "edge": "2/4", "note": "2,000 sq ft"}, {"label": "Glazing\n₹45,000", "edge": "1/4", "note": "1,000 sq ft"}, {"label": "Stores\n₹45,000", "edge": "1/4", "note": "1,000 sq ft"}]}, "caption": "Tapri's kulhad unit: rent apportioned on floor area, 2,000 : 1,000 : 1,000 = 2 : 1 : 1. Each department's share is the rent times its fraction of the total area."}
:::

### ICAI's bases of apportionment

The same basis cannot be used for every item, because the benefit of each service to a department has to be measured differently (SM 4.13). The Study Material suggests these (SM 4.14):

| Overhead cost | Basis of apportionment |
|---|---|
| 1. Rent and other building expenses; lighting and heating (conditioning); fire precaution service; air-conditioning | Floor area, or volume of department |
| 2. Perquisites; labour welfare expenses; time keeping; personnel office; supervision | Number of workers |
| 3. Compensation to workers; holiday pay; ESI and PF contribution; perquisites | Direct wages |
| 4. General overhead | Direct labour hours, or direct wages, or machine hours |
| 5. Depreciation of plant and machinery; repairs and maintenance of plant and machinery; insurance of stock | Capital values |
| 6. Power or steam consumption; internal transport; managerial salaries | Technical estimates |
| 7. Lighting expenses | Number of light points, or area, or metered units |
| 8. Electric power (machine operation) | Horse power of machines, or number of machine hours, or value of machines, or units consumed |
| 9. Material handling; stores overhead | Weight, volume, value or units of materials |

Perquisites appear in two rows, under number of workers and under direct wages: pick one and state which you use.

::: lab oh-distribution {"part":"primary"}
Watch Tapri's premix plant charge rent, power, depreciation and the canteen subsidy to four departments one cell at a time, then change a basis and see the shares move.
:::

### Beyond benefit received: three other bases

The benefit received by the department is generally the principal criterion, but the Study Material names three other bases that may be used (SM 4.15–4.16):

1. **Analysis or survey of existing conditions**: when the benefit cannot be seen without analysing the expenditure, e.g. lighting distributed on the number of light points in each department.
2. **Ability to pay**: a principle of taxation; expenses distributed in proportion to the income of the paying department, e.g. a sales organisation's cost spread over products by their sales. Simple, but ==it may be inequitable==: the charge may have no relation to the effort of selling, so easy-selling lines bear the largest share when they should bear the lowest.
3. **Efficiency or incentive**: overheads distributed on pre-determined levels of production or sales. A department that exceeds the level bears less overhead per unit and shows a greater profit; one that falls short bears more.

A concern may use one criterion or all of them for different phases of its activity. ICAI prints its note on choosing a base under the table of bases for service departments, but the four tests are a sound check on any basis: ==economy, practicability, equitability and reliability== are the matters of consideration for selection of the base (SM 4.17).

## Formats and formulas

*ICAI calls this statement the Primary Distribution Summary, the Overhead Distribution Summary or the Overhead Distribution Statement. Reproduce the layout from memory.*

| Item of cost | Basis | Total (₹) | Production depts (₹) | Service depts (₹) |
|---|---|---:|---:|---:|
| *Allocated:* indirect material | Actual (allocation) | xxx | xxx | xxx |
| Indirect wages | Actual (allocation) | xxx | xxx | xxx |
| *Apportioned:* rent | Floor area (ratio) | xxx | xxx | xxx |
| Depreciation of plant | Capital value (ratio) | xxx | xxx | xxx |
| Power | H.P. × machine hours (ratio) | xxx | xxx | xxx |
| … | … | … | … | … |
| **Total** | | **xxx** | **xxx** | **xxx** |

In an answer, each production and service department gets its own column. ICAI's answers print the ratio in brackets beside the item or its basis, e.g. "Factory rent, floor area (6 : 3 : 1)", and some split the statement into allocated overheads and a "schedule of apportioned expenses" (SM 4.80–4.81). Both layouts are ICAI's own; whichever you use, show every basis and its ratio.

::: formula A department's share of a shared overhead
$$\text{Share} = \text{Overhead} \times \frac{\text{Its base}}{\text{Total base}}$$
"Its base" is the department's units of the base (square metres, workers, rupees of capital value); "total base" is the total of the sharing departments only, those that benefit: a rented block's rent is not shared with a department housed in an owned building.
:::

::: formula Compound base for machine power
$$\text{Power share} \propto \text{HP} \times \text{machine hours}$$
Used in ICAI's Illustration 4 (SM 4.24–4.25); a 50 HP machine running 6,000 hours draws 3,00,000 HP-hours.
:::

::: formula Department's primary total
$$\text{Total} = \text{Allocated} + \text{Apportioned}$$
Check: the primary totals of all departments add up to the total factory overheads.
:::

::: definition Service departments
Service departments are those departments which do not directly take part in the production of goods or providing services. Such departments provide auxiliary services across the entity and render services to other cost centres and in some cases to outside parties; e.g. engineering, quality control and assurance, laboratory, canteen, stores, time office, dispensary. (SM 4.9)
:::

## Worked examples

::::: example The samosa factory's overhead budget
Tapri's samosa factory has production departments Frying and Packing and service departments Stores and Maintenance. Its overhead budget for a month:

**Allocated overheads**

| Item (₹) | Frying | Packing | Stores | Maintenance |
|---|---:|---:|---:|---:|
| Indirect material | 1,10,000 | 64,500 | 15,500 | 50,000 |
| Indirect wages | 72,000 | 96,000 | 54,000 | 1,08,000 |

**Overheads to be apportioned**

| Item | Amount (₹) |
|---|---:|
| Factory rent | 2,40,000 |
| Fire insurance of buildings | 36,000 |
| Lighting | 30,000 |
| Power (machines) | 1,80,000 |
| Depreciation of plant and machinery | 3,00,000 |
| Insurance of plant and machinery | 30,000 |
| Supervision | 1,20,000 |
| Canteen subsidy | 72,000 |

**Survey data**

| Particulars | Frying | Packing | Stores | Maintenance |
|---|---:|---:|---:|---:|
| Floor area (sq m) | 3,000 | 1,500 | 1,000 | 500 |
| Light points | 40 | 30 | 20 | 10 |
| Horse power of machines | 50 | 20 | 5 | 25 |
| Machine hours | 6,000 | 3,000 | 3,000 | 3,000 |
| Capital value of plant (₹ lakh) | 60 | 15 | 5 | 20 |
| Number of workers | 40 | 60 | 10 | 10 |

Stores works from a godown the company owns. The factory rent is for the main block, which houses the other three departments; the fire insurance covers both buildings.

**Required:**

(i) Prepare a primary distribution summary, showing the basis of apportionment of each item.

(ii) Calculate how much power Frying would bear if power were apportioned on horse power alone, and say which basis is better here.

:::: answer Show the working
**Working note 1: bases, ratios and totals**

| Item | Basis | Ratio (F : P : S : M) | Total (₹) |
|---|---|---|---:|
| Factory rent | Floor area of the main block | 6 : 3 : – : 1 | 2,40,000 |
| Fire insurance of buildings | Floor area, both buildings | 6 : 3 : 2 : 1 | 36,000 |
| Lighting | Light points | 4 : 3 : 2 : 1 | 30,000 |
| Power | H.P. × machine hours | 20 : 4 : 1 : 5 | 1,80,000 |
| Depreciation of plant | Capital value | 12 : 3 : 1 : 4 | 3,00,000 |
| Insurance of plant | Capital value | 12 : 3 : 1 : 4 | 30,000 |
| Supervision | Number of workers | 4 : 6 : 1 : 1 | 1,20,000 |
| Canteen subsidy | Number of workers | 4 : 6 : 1 : 1 | 72,000 |

H.P. × machine hours: 50 × 6,000 = 3,00,000; 20 × 3,000 = 60,000; 5 × 3,000 = 15,000; 25 × 3,000 = 75,000; ratio 20 : 4 : 1 : 5.

**(i) Primary distribution summary**

| Item of cost (₹) | Frying | Packing | Stores | Maintenance |
|---|---:|---:|---:|---:|
| Indirect material (allocated) | 1,10,000 | 64,500 | 15,500 | 50,000 |
| Indirect wages (allocated) | 72,000 | 96,000 | 54,000 | 1,08,000 |
| Factory rent | 1,44,000 | 72,000 | – | 24,000 |
| Fire insurance of buildings | 18,000 | 9,000 | 6,000 | 3,000 |
| Lighting | 12,000 | 9,000 | 6,000 | 3,000 |
| Power | 1,20,000 | 24,000 | 6,000 | 30,000 |
| Depreciation of plant | 1,80,000 | 45,000 | 15,000 | 60,000 |
| Insurance of plant | 18,000 | 4,500 | 1,500 | 6,000 |
| Supervision | 40,000 | 60,000 | 10,000 | 10,000 |
| Canteen subsidy | 24,000 | 36,000 | 6,000 | 6,000 |
| **Total** | **7,38,000** | **4,20,000** | **1,20,000** | **3,00,000** |

Check: 7,38,000 + 4,20,000 + 1,20,000 + 3,00,000 = ₹15,78,000 = allocated ₹5,70,000 + apportioned ₹10,08,000.

::: diagram After the primary distribution
{"type": "plot", "h": 280, "x": [0.4, 4.6], "y": [0, 900000], "legend": "outside",
 "ylabel": "overheads (₹)",
 "xticks": [[1, "Frying"], [2, "Packing"], [3, "Stores"], [4, "Maintenance"]],
 "yticks": [[0, "0"], [300000, "3,00,000"], [600000, "6,00,000"], [900000, "9,00,000"]],
 "series": [
  {"label": "production departments", "bars": true, "values": true, "color": "a", "pts": [[1, 738000, "7,38,000"], [2, 420000, "4,20,000"]]},
  {"label": "service departments", "bars": true, "values": true, "color": "c", "pts": [[3, 120000, "1,20,000"], [4, 300000, "3,00,000"]]}
 ],
 "caption": "Blue: production departments; amber: service departments. The amber ₹4,20,000 still has to reach Frying and Packing through the secondary distribution."}
:::

**(ii) Power on horse power alone**: 50 : 20 : 5 : 25 = 10 : 4 : 1 : 5, so Frying would bear ₹1,80,000 × 10 ÷ 20 = **₹90,000**, against ₹1,20,000 on H.P. × machine hours. Power is consumed only while machines run, and Frying's fryers run twice as long as any other department's machines, so **H.P. × machine hours** is the better measure of the benefit received. ICAI's suggested answer to November 2023 (old scheme) Q3(a) used horse power alone and showed H.P. × machine hours as an alternative, so state the basis you use.

The ₹1,20,000 of Stores and ₹3,00,000 of Maintenance are re-apportioned in [[cma.oh.secondary|the secondary distribution]].
::::
:::::

::: lab oh-distribution {"part":"primary","method":"simultaneous","depts":[["Machine shop","P",""],["Packing","P",""],["General plant","S",""],["Stores","S",""]],"bases":[["Floor space","2,000 800 400 1,600"],["Radiator sections","45 90 30 60"],["Employees","20 12 4 8"],["Investment","8,00,000 2,40,000 80,000 1,60,000"],["HP hours","3,500 500 - 1,000"]],"overheads":[["Indirect labour","8,000 6,000 4,000 11,000","allocated"],["Maintenance material","3,400 1,600 2,100 2,800","allocated"],["Misc. supplies","1,500 2,900 900 600","allocated"],["Supervisor's salary","0 0 16,000 0","allocated"],["Cost & payroll salary","0 0 80,000 0","allocated"],["Power","78,000","HP hours"],["Rent","72,000","Floor space"],["Fuel and heat","60,000","Radiator sections"],["Insurance","12,000","Investment"],["Taxes","8,400","Investment"],["Depreciation","1,20,000","Investment"]],"service":[["Stores","50 20 30 -"],["General plant","Employees"]],"rate":"mh","job":""}
Here is a real one, MTP May 2026 Series I Q3(b): the allocated items first, then six items shared on HP hours, floor space, radiator sections and investment.
:::

:::: example Kesar wants "ability to pay"
Tapri's Indore sales office costs ₹6,00,000 a month and sells three lines. Kesar wants the cost spread over the lines in proportion to their sales; Ritu has a survey of how the sales staff actually spent their hours.

| Line | Sales for the month (₹) | Sales staff hours |
|---|---:|---:|
| Chai premix | 60,00,000 | 1,200 |
| Frozen samosas | 30,00,000 | 1,800 |
| Kulhad cups | 10,00,000 | 3,000 |

**Required:**

(i) Apportion the sales office cost on ability to pay and on the survey of effort.

(ii) Comment on the two bases.

::: answer Show the working
**(i) Apportionment**

| Line | Ability to pay: sales (6 : 3 : 1) (₹) | Survey: hours (2 : 3 : 5) (₹) |
|---|---:|---:|
| Chai premix | 3,60,000 | 1,20,000 |
| Frozen samosas | 1,80,000 | 1,80,000 |
| Kulhad cups | 60,000 | 3,00,000 |
| **Total** | **6,00,000** | **6,00,000** |

**(ii) Comment.** Ability to pay distributes the expense in proportion to the income of each line. It is simple to apply but may be inequitable, because the charge has no relation to the actual effort of selling: chai premix, which takes a fifth of the staff's time, would bear 60% of the cost, while kulhad cups, which take half of it, would bear 10%. Easy-selling lines bear the largest proportion when they should bear the lowest (SM 4.15). The survey of existing conditions measures the benefit each line receives, so it should be used for costing; the sales basis makes the cups look more profitable than they are.
:::
::::

:::: example Bunty's draft: one basis for everything
Tapri's kulhad unit has two production departments, Kiln and Glazing, and one service department, Stores. Bunty, attending for Iyer & Associates, finds that the unit's draft overhead statement has apportioned four items on the number of workers alone:

| Item | Amount (₹) |
|---|---:|
| Air-conditioning (only the kiln control room and the glazing hall are air-conditioned) | 48,000 |
| Holiday pay of production workers | 36,000 |
| Insurance of stock | 18,000 |
| Canteen subsidy | 30,000 |

| Particulars | Kiln | Glazing | Stores |
|---|---:|---:|---:|
| Number of workers | 30 | 20 | 10 |
| Air-conditioned volume (cubic metres) | 200 | 600 | nil |
| Direct wages (₹) | 2,40,000 | 1,20,000 | nil |
| Average value of stock held (₹) | 2,00,000 | 1,00,000 | 9,00,000 |

**Required:**

(i) Show the draft apportionment on the number of workers.

(ii) Re-apportion each item on the basis the Study Material gives, and show the effect on each department's total.

::: answer Show the working
**(i) Draft: number of workers (3 : 2 : 1)**

| Item (₹) | Kiln | Glazing | Stores |
|---|---:|---:|---:|
| Air-conditioning | 24,000 | 16,000 | 8,000 |
| Holiday pay | 18,000 | 12,000 | 6,000 |
| Insurance of stock | 9,000 | 6,000 | 3,000 |
| Canteen subsidy | 15,000 | 10,000 | 5,000 |
| **Total** | **66,000** | **44,000** | **22,000** |

**(ii) Corrected apportionment**

| Item | Basis (SM 4.14, 4.62) | Ratio (K : G : S) |
|---|---|---|
| Air-conditioning | Volume of department, only the spaces air-conditioned | 1 : 3 : nil |
| Holiday pay | Direct wages | 2 : 1 : nil |
| Insurance of stock | Capital values: the value of stock held | 2 : 1 : 9 |
| Canteen subsidy | Number of workers | 3 : 2 : 1 |

| Item (₹) | Kiln | Glazing | Stores |
|---|---:|---:|---:|
| Air-conditioning | 12,000 | 36,000 | – |
| Holiday pay | 24,000 | 12,000 | – |
| Insurance of stock | 3,000 | 1,500 | 13,500 |
| Canteen subsidy | 15,000 | 10,000 | 5,000 |
| **Total** | **54,000** | **59,500** | **18,500** |
| Change from the draft | (12,000) | 15,500 | (3,500) |

The total of ₹1,32,000 is unchanged; only its spread moves. Number of workers was right for the canteen subsidy alone. Air-conditioning benefits only the cooled spaces, by their volume, so Stores bears none and Glazing's large hall bears most; holiday pay follows the wages it is paid with; stock insurance follows the value insured, most of which sits in Stores. On the draft, Glazing was undercharged by ₹15,500 and every job passing through it would have been undercosted.
:::
::::

## Under the hood

### Fine print from ICAI's own answers

- **A cost that only some departments share** is apportioned over those departments only. In RTP September 2025 Q9 the rent was apportioned "among the departments which actually use the rented building"; the general service department, in a company-owned building, got none.
- **Notional rent** of an owned building was left out of that answer as an imputed cost. Follow the question's instruction where it gives one.
- **Part allocated, part apportioned**: in the same RTP, one-third of the building insurance was given to department M1 first and only the balance was apportioned by area. When the question earmarks part of an item, allocate that part, then apportion the rest.
- **"Production departments only"**: in MTP May 2025 Series I Q5(b) the suggested answer distributed the factory supervisor's wages over the production departments only (on working hours, 31 : 40 : 30), with a note saying so. Where you make such a choice, write the note.
- **Service departments' own materials and wages** appear in the service columns of ICAI's distribution statements, often headed "direct material" and "direct wages: actual" (SM 4.24, Illustration 4; SM 4.82, Practical Problem 2): for the product they are overheads.

### Equal splits: the basis that measures nothing

Every basis in ICAI's table measures something about each department: its area, its workers, its wages, the value of its plant, its hours, its horse power. Splitting by the number of departments measures nothing about any of them, so it reflects neither the benefit received nor the cause of the cost, and it fails the "equitability" test outright.

## Exam angle

::: exam How ICAI asks primary distribution
In the documents read for this lesson, primary distribution came up in 9 of them, almost always as the first part of a longer overhead question:

- **Full questions, 8 to 12 marks**, where primary distribution is followed by the secondary distribution and an absorption rate: MTP January 2025 Series I Q2(a) (12 marks, five departments, then repeated distribution and an hourly rate), MTP May 2025 Series I Q5(b) (8 marks), MTP May 2026 Series I Q3(b) (9 marks, "overhead distribution statement with supporting schedules"), RTP September 2025 Q9 ("overhead analysis sheet, showing the bases of apportionment"), RTP January 2026 Q10 (allocation and primary distribution over functional departments), and in the old scheme November 2020 Q2(b) and November 2023 Q3(a) (10 marks).
- **Case-scenario MCQs**: RTP September 2026 case scenario 1 built five MCQs on a primary and a step distribution.
- **Bases only, 4 marks**: MTP January 2026 Series I Q6(c) listed the overheads of ICAI's table and asked for the basis of each; the answer was the table itself.
:::

::: exam Traps
- The ratio is marked: write "Floor area (6 : 3 : 1)", not only "floor area".
- Power: horse power alone or H.P. × machine hours; the November 2023 (old scheme) suggested answer showed both. Say which you used.
- A department in an owned building does not share the rent of a rented one.
- Service departments' material and wages are allocated to them, even when the question heads them "direct wages" (MTP January 2025 Series I Q2(a) gave the service departments direct wages of ₹12,00,000 and ₹1,56,000; the answer allocated both, basis "Actual"). A production department's direct wages never enter the statement, although they may serve as a basis (indirect wages and sundries on direct wages in the same answer).
:::

::: trick Ratio first, rupees second
Cut each base to its smallest whole-number ratio (3,000 : 1,500 : 500 = 6 : 3 : 1), then share = amount × part ÷ sum of parts. Conditions: the ratio must be exact (1,240 : 1,600 : 1,200 = 31 : 40 : 30, not "1 : 1.3 : 1"), and the same base gives the same ratio for every item on it, so compute it once.
:::

## Answer frame

**"Suggest a basis of apportionment for each of the following"**: a two-column table (overhead | basis), one line per item, in ICAI's words from the bases table; where ICAI gives alternatives ("floor area, or volume of department"), write both.

**"Explain the other bases of apportioning overheads"** (SM 4.15–4.16):

1. Benefit received is generally the principal criterion; other bases that may be used are the three below.
2. Analysis or survey of existing conditions, with the light points example.
3. Ability to pay: income of the paying department; simple but may be inequitable; easy-selling lines bear the most.
4. Efficiency or incentive: pre-determined levels; exceeding them lowers the overhead per unit and raises the department's profit.
5. A concern may use one criterion, or all of them for different activities.

## Common mistakes

::: mistake Hall of Shame: Kesar's equal shares
₹15,78,000 ÷ 4 = ₹3,94,500 each makes Packing pay for Frying's fryers and Stores for Packing's workers. **Fix:** allocate what can be allocated, then give every shared item its own basis from ICAI's table.
:::

::: mistake The godown that paid rent
Apportioning the main block's rent over all four departments by floor area (3,000 : 1,500 : 1,000 : 500) charges Stores ₹40,000 for a building it does not use. **Fix:** a cost is shared only by the departments that benefit from it: 6 : 3 : 1 over Frying, Packing and Maintenance.
:::

::: mistake The service departments that vanished
Putting rent, power and supervision only in the production columns, "because only they make samosas". **Fix:** primary distribution covers all departments; service departments take their share now and pass it on in the secondary distribution.
:::

::: mistake Prime cost in the overhead statement
Adding the Packing line's direct wages or the potatoes to the distribution summary. **Fix:** only indirect items belong there. A service department's wages are indirect for the product, so they are allocated to it.
:::

## Practice

::: quiz Check yourself
Q: Supervision of ₹84,000 is shared by four departments with 30, 45, 9 and 6 workers. What is the share of the department with 45 workers (₹)?
= 42000
> Supervision goes on the number of workers: 30 + 45 + 9 + 6 = 90, so ₹84,000 × 45 ÷ 90 = ₹42,000.

Q: On which basis does the Study Material suggest apportioning depreciation of plant and machinery?
- [ ] Floor area
- [ ] Number of workers
- [x] Capital values
- [ ] Direct wages
> Depreciation of plant and machinery, its repairs and maintenance, and insurance of stock go on capital values (SM 4.14).

Q: Case scenario. A year after the rent diagram above, Tapri's kulhad unit has moved Stores (1,000 sq ft) into a shed the company has bought. The rented main shed still houses Kiln (2,000 sq ft) and Glazing (1,000 sq ft), and its rent is now ₹1,20,000 a month. The question gives no notional rent. What is Stores' share of the rent?
- [x] Nil
- [ ] ₹30,000
- [ ] ₹40,000
- [ ] ₹24,000
> Rent is shared only by the departments that use the rented shed: 2 : 1 between Kiln (₹80,000) and Glazing (₹40,000). ₹30,000 spreads it over all 4,000 sq ft.

Q: Which of these appear in the samosa factory's primary distribution summary? Select all that apply.
- [x] Wages of the storekeepers
- [ ] Wages of the workers on the Packing line who fill the pouches
- [x] Depreciation of the fryers
- [x] Canteen subsidy
- [ ] Potatoes used in the filling
> Only overheads are distributed. Storekeepers' wages are indirect (allocated to Stores); depreciation and the canteen subsidy are apportioned. Packing-line wages and potatoes are direct wages and direct material: prime cost.

Q: Power of ₹90,000 drives the machines of two departments: X has 20 HP running 1,000 hours, Y 10 HP running 4,000 hours. What is X's share on H.P. × machine hours (₹)?
= 30000
> 20 × 1,000 = 20,000 and 10 × 4,000 = 40,000, so X bears ₹90,000 × 20,000 ÷ 60,000 = ₹30,000. On horse power alone X would bear ₹60,000: the commonest slip when machine hours are given.
:::

## Recap

- Primary distribution: every factory overhead to every department, production and service, by allocation or apportionment.
- Allocate whole items first, including service departments' own material and wages; prime cost stays out.
- Each shared item gets its own basis: building costs by floor area; supervision, welfare and time keeping by workers; ESI, PF and holiday pay by direct wages; depreciation and repairs of plant by capital values; machine power by horse power or H.P. × machine hours; lighting by light points.
- Share the item only among the departments that benefit (a rented block's rent skips the owned godown).
- Other bases: survey of existing conditions, ability to pay (simple, may be inequitable), efficiency or incentive.
- Base selection: economy, practicability, equitability and reliability.
- Show the basis and the ratio for every item, and check the column totals against total overheads. (Equal shares are not a basis.)

## Flashcards

Q:: What is primary distribution of overheads?
A:: Allocating and apportioning factory overheads to all departments, production and service, so that every item sits in some department; the result is the primary distribution summary.

Q:: Basis for rent, lighting and heating, fire precaution and air-conditioning?
A:: Floor area, or volume of department.

Q:: Basis for supervision, time keeping, labour welfare and the personnel office?
A:: Number of workers.

Q:: Basis for holiday pay, ESI and PF contribution and compensation to workers?
A:: Direct wages.

Q:: Basis for depreciation, and repairs and maintenance, of plant and machinery?
A:: Capital values.

Q:: Bases for electric power for machine operation?
A:: Horse power of machines, number of machine hours, value of machines, or units consumed (H.P. × machine hours combines the first two).

Q:: Basis for power or steam consumption, internal transport and managerial salaries?
A:: Technical estimates.

Q:: The three other bases of apportionment besides benefit received?
A:: Analysis or survey of existing conditions; ability to pay; efficiency or incentive.

Q:: Why may the ability-to-pay basis be inequitable?
A:: The charge may have no relation to the actual effort involved, so easy-selling lines bear the largest proportion of expenses when they should bear the lowest.

Q:: Four considerations in selecting a base?
A:: Economy, practicability, equitability and reliability.
