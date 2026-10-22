---
id: cma.job.job
title: Job costing
minutes: 30
needs: cma.sheet.mfg, cma.oh.absorb
tags: job costing, job cost sheet, job cost card, specific order costing, stores requisition, material transfer note, control accounts, job costing vs process costing
labs:
summary: Each customer order is its own cost object: ICAI's job cost sheet, how materials, labour and overheads reach it, the thirteen control-account entries, and how job costing differs from process costing.
---

## In plain words

### Per job, please

Tapri Kiosk Works, the company's workshop in Indore, builds kulhad kiosks, café counters and tea carts, each to a franchisee's own drawing. This month it is finishing a steel tea cart with a glass hood for an airport franchisee and a plain wooden kiosk for a mall.

> **Kesar:** A kiosk is a kiosk. Charge both the same as last time.
> **Ritu:** The airport cart has twice the steel and three times the welding. Per job, please.
> **Bunty:** So every kiosk gets its own bill?
> **Ritu:** Every kiosk gets its own number, and every cost carries that number.

When every order is different, the order itself is the cost unit. Each job gets a **job number**. Materials are drawn from stores against that number, workers book their hours against it, and overheads are added at the factory's rates. The costs pile up on the job's own cost sheet, the **job cost card**, and when the job is finished the card shows what it cost and what it earned. This is **job costing**, the main method of **specific order costing**.

It is the opposite of costing a stream of identical products, where costs are collected for a period and averaged over the output (unit and process costing). Here nothing is averaged: two kiosks never share a cost sheet, and the work-in-progress at any date is simply the jobs still on the shop floor.

::: analogy The tailor's order book
A tailor writes a slip for every customer: cloth used, hours of stitching, buttons and lining, a share of the shop's rent. When the suit is ready the slip shows its cost, and the price follows. A ready-made shirt factory cannot do that for each shirt: it adds up the month's costs and divides by the shirts made. The tailor uses job costing; the factory uses process or unit costing.
:::

::: key
In job costing the job is the cost unit: materials (stores requisitions), labour (job time cards) and overheads (pre-determined rates) are collected by job number on a job cost sheet, and the job's cost and profit are known when it is completed.
:::

## How it works

### What ICAI means by job costing

::: definition Job costing
"The category of basic costing methods which is applicable where the work consists of separate contracts, jobs or batches, each of which is authorised by specific order or contract." (CIMA London, SM 9.2)
:::

Costs are collected and accumulated according to jobs, contracts, products or work orders; each job or unit of production is a separate entity for costing. The method also applies where production is in batches, batch production being of the same character as job order production and differing mainly in the size of orders (SM 9.2; [[cma.unit.batch|batch costing]]).

**Principles.** Job costing may be regarded as the principal method of costing, since the basic object of all costing is the analysis and ascertainment of the cost of each unit of production, to control and regulate cost, and to determine profitability. Its principles hold for printing, furniture, hardware, ship-building, heavy machinery, interior decoration, repairs and similar work (SM 9.2).

**Process of job costing** (SM 9.2): prepare a separate cost sheet for each job; record the materials issued for the job and the employee costs incurred (on the basis of the bill of material and time cards respectively); when the job is completed, add overhead charges to ascertain the total expenditure.

**Suitability** (SM 9.3): when jobs are executed for different customers according to their specifications; when no two orders are alike and each needs special treatment; where work-in-progress differs from period to period with the number of jobs in hand.

::: diagram How costs reach a job cost sheet
{"type": "flow", "w": 420, "nodes": [
 {"id": "o", "kind": "start", "label": "Customer order:\njob number given", "color": "mute"},
 {"id": "m", "kind": "process", "label": "Stores requisitions\n(or bill of material)", "color": "a"},
 {"id": "ma", "kind": "process", "label": "Material abstract", "color": "a"},
 {"id": "l", "kind": "process", "label": "Job time cards", "color": "g"},
 {"id": "la", "kind": "process", "label": "Labour abstract", "color": "g"},
 {"id": "h", "kind": "process", "label": "Overheads at\npre-determined rates", "color": "c"},
 {"id": "c", "kind": "end", "label": "Job cost sheet in\nthe WIP ledger", "color": "d"}],
 "edges": [["o", "m"], ["m", "ma"], ["ma", "l"], ["l", "la"], ["la", "h"], ["h", "c"]],
 "caption": "Blue: materials; green: labour; amber: overheads; orange: the job cost sheet, posted weekly or monthly. The three streams run side by side in practice; the flow lists them in the order the cost sheet adds them."}
:::

### Collecting materials (SM 9.4–9.5)

- Direct materials must be traced to the specific job through a **separate stores requisition** for each job or work order. A **bill of material** is the basis for the requisitions; if the whole quantity in it is drawn in one lot or in instalments, the bill itself may serve as the requisition.
- Priced requisitions are entered in a **material abstract** (analysis book), which collects direct materials by job and indirect materials by standing order or expense code. Job totals are posted to the job cost sheets in the **Work-in-Progress ledger**, usually weekly or monthly; indirect materials go to standing orders in the **Overhead Expenses ledger**.
- **Special material** purchased for a particular job is charged direct to that job as soon as it is bought, without passing through the Stores Ledger.
- **Surplus material** that cannot immediately and economically be used on another job is returned to stores with a **stores debit note or shop credit**, and the job is credited. If it is used on another job instead, a **material transfer note** shows both jobs, and the WIP ledger is adjusted.

### Collecting labour (SM 9.5)

All direct labour is booked against jobs on **job time cards** or sheets. Idle time is booked against standing order numbers, on the job time card or on a separate **idle time card**. Time booked is valued at the appropriate rates and entered in a **labour abstract**, then posted to the job cost cards weekly or monthly; idle time costs and other indirect labour go to standing orders in the Overhead Expenses ledger. Overtime premium paid because the customer wanted the job early may be charged to that job directly (SM 3.18; [[cma.emp.idle|idle time and overtime]]).

### Collecting overheads (SM 9.6)

Manufacturing overheads are collected under standing order numbers, and selling and distribution overheads against cost account numbers. They are apportioned to service and production departments, service departments' costs transferred to production departments, and the production overheads applied to jobs on a realistic basis: machine hours, labour hours, percentage of direct wages, percentage of direct materials ([[cma.oh.absorb|absorption rates]]). Different methods give a different works overhead and so a different job cost. Because overheads cannot be traced to any particular job, the best that can be done is to apply a suitable overhead rate to each job: ==essentially an arbitrary method==.

### Spoiled and defective work

**Spoiled work** is production totally rejected that cannot be rectified; **defective work** is production not as perfect as the saleable product but capable of being rectified at additional cost (SM 9.6). The cost of rectifying a normal rate of defectives is charged to the job and spread over its output, and rectification of the defectives above normal is written off to Costing P&L. Defects from bad workmanship are an abnormal cost, written off unless recovered as a penalty from the workman (or treated as normal to the extent management provided for them). Defects from the inspection department wrongly accepting poor incoming material are charged to that department and written off to Costing P&L (SM 9.7). Defectives inherent in the process may be charged to the jobs in which they arise, or treated as factory overheads if they cannot be identified with jobs (SM 9.10). The full circumstance-by-circumstance treatment and the spoilage journal entry are in [[cma.mat.losses|spoilage and defectives]].

### Accounting: the entries in control accounts (SM 9.8–9.9)

::: diagram Where a job's costs travel in the cost ledger
{"type": "flow", "w": 420, "nodes": [
 {"id": "g", "kind": "start", "label": "Cost Ledger Control A/c", "color": "mute"},
 {"id": "s", "kind": "process", "label": "Stores Ledger, Wages and\nFactory Overhead Control", "color": "a"},
 {"id": "w", "kind": "process", "label": "Work-in-Process Control A/c\n(the job cost sheets)", "color": "c"},
 {"id": "c", "kind": "process", "label": "Cost of Sales A/c", "color": "d"},
 {"id": "p", "kind": "end", "label": "Costing Profit and Loss A/c", "color": "g"}],
 "edges": [["g", "s", "purchases, wages, expenses"], ["s", "w", "direct costs, overheads"], ["w", "c", "jobs completed"], ["c", "p", "cost of jobs sold"]],
 "caption": "Each arrow is a debit to the lower account and a credit to the upper one. Sales are credited to Costing P&L against Cost Ledger Control; the balance of Costing P&L is the profit or loss."}
:::

The thirteen entries are in Formats and formulas. Integrated and non-integrated ledgers are explained in [[cma.sys.ledgers|non-integrated and integrated accounts]].

### Advantages and disadvantages (SM 9.13)

| Advantages | Disadvantages |
|---|---|
| 1. The details of cost of material, labour and overhead of every job are available to control | 1. Costly and laborious |
| 2. The profitability of each job can be derived | 2. A lot of clerical work, so more chance of error |
| 3. It facilitates production planning | 3. Not suitable in inflationary conditions |
| 4. Budgetary control and standard costing can be applied | 4. Previous cost records become meaningless if market conditions change |
| 5. Spoilage and defectives can be identified and responsibility fixed | |

### Job costing against process costing (SM 9.13–9.14)

::: compare
| | Job costing | Process costing |
|---|---|---|
| (i) | A job is carried out or a product produced by specific orders | Production is a continuous flow and the product is homogeneous |
| (ii) | Costs are determined for each job | Costs are compiled on a time basis: for an accounting period, for each process or department |
| (iii) | Each job is separate and independent of other jobs | Products lose their individual identity in the continuous flow |
| (iv) | Each job has a number and costs are collected against it | The unit cost of a process is an average cost for the period |
| (v) | Costs are computed when the job is completed, by adding all costs against it | Costs are calculated at the end of the period: total cost ÷ output of the process |
| (vi) | Production is not continuous and jobs differ, so more managerial attention is needed for control | Production is standardised and stable, so control is comparatively easier |
:::

Job against batch costing is set out in [[cma.unit.batch|batch costing]]; process accounts in [[cma.proc.accounts|process costing]].

## Formats and formulas

*Reproduce the job cost sheet and the control-account entries from memory.*

### Job cost sheet (ICAI's format, SM 9.3–9.4)

| Header | |
|---|---|
| Description; Blue Print No.; Material No.; Reference No. | Job No.; Quantity; Date of delivery; Date commenced; Date finished |

| Date / Reference | Details | Material (₹) | Labour (₹) | Overhead (₹) |
|---|---|---:|---:|---:|
| | | xxx | xxx | xxx |
| **Total** | | **xxx** | **xxx** | **xxx** |

| Summary of costs | Estimated (₹) | Actual (₹) |
|---|---:|---:|
| Direct material cost | xxx | xxx |
| Direct wages | xxx | xxx |
| Production overhead | xxx | xxx |
| **Production cost** | **xxx** | **xxx** |
| Administration and selling and distribution overheads | xxx | xxx |
| **Total cost** | **xxx** | **xxx** |
| Profit / loss | xxx | xxx |
| **Selling price** | **xxx** | **xxx** |

Beside the summary: for the job; units produced; cost per unit; remarks; prepared by; checked by.

### Entries in control accounts (SM 9.8–9.9)

| No. | For | Entry |
|---|---|---|
| 1 | Purchase of materials | Stores Ledger Control A/c Dr. To Cost Ledger Control A/c |
| 2 | Direct materials issued to jobs | Work-in-Process Control A/c Dr. To Stores Ledger Control A/c |
| 3 | Return of direct materials from jobs | Stores Ledger Control A/c Dr. To Work-in-Process Control A/c |
| 4 | Return of materials to suppliers | Cost Ledger Control A/c Dr. To Stores Ledger Control A/c |
| 5 | Indirect materials | Factory Overhead Control A/c Dr. To Stores Ledger Control A/c |
| 6 | Wages paid | Wages Control A/c Dr. To Cost Ledger Control A/c |
| 7 | Direct wages incurred on jobs | Work-in-Process Control A/c Dr. To Wages Control A/c |
| 8 | Indirect wages | Factory Overhead Control A/c Dr. To Wages Control A/c |
| 9 | Any indirect expense paid | Factory Overhead Control A/c Dr. To Cost Ledger Control A/c |
| 10 | Overhead charged to jobs | Work-in-Process Control A/c Dr. To Factory Overhead Control A/c |
| 11 | Total cost of jobs completed | Cost of Sales A/c Dr. To Work-in-Progress Control A/c |
| 12 | Balance of Cost of Sales transferred | Costing Profit and Loss A/c Dr. To Cost of Sales A/c |
| 13 | Sales value of jobs completed | Cost Ledger Control A/c Dr. To Costing Profit and Loss A/c |

General Ledger Adjustment Account is another name of the Cost Ledger Control Account. After entry 13 the balance of Costing P&L is the profit or loss; the Cost Ledger Control balance is carried forward, and a trial balance can be drawn from the balances (SM 9.9).

::: formula Pricing a job
$$\text{Price} = \text{Total cost} \times (1 + m_c) \qquad \text{Price} = \frac{\text{Total cost}}{1 - m_s}$$
$m_c$ = profit as a fraction of total cost; $m_s$ = profit as a fraction of the selling price (20% on price is 25% on cost).
:::

## Worked examples

::::: example October at Tapri Kiosk Works
The work-in-progress abstract at 30 September:

| Job | Materials (₹) | Hours | Labour (₹) | Overheads applied (₹) |
|---|---:|---:|---:|---:|
| K-101 | 18,400 | 320 | 28,800 | 21,600 |
| K-102 | 12,600 | 210 | 18,900 | 14,175 |
| K-103 | 9,800 | 150 | 13,500 | 10,125 |

Materials requisitioned in October:

| Requisition | Job | Cost (₹) |
|---|---|---:|
| R-41 | K-102 | 4,200 |
| R-42 | K-102 | 3,600 |
| R-43 | K-103 | 5,400 |
| R-44 | K-104 | 8,000 |
| R-45 | K-105 | 6,500 |
| R-46 | K-102 | 2,900 |

A shop credit shows that the material of R-41 was returned to stores as unsuitable; a material transfer note shows that the material of R-42 was diverted to Job K-105. October's direct hours, at ₹100 an hour in the welding shop and ₹80 in the carpentry shop:

| Job | Welding hours | Carpentry hours |
|---|---:|---:|
| K-101 | 20 | 15 |
| K-102 | 40 | 25 |
| K-103 | 30 | 10 |
| K-104 | 25 | – |
| K-105 | 10 | 20 |

A further 18 welding and 12 carpentry hours were waiting time and machine breakdown. Factory overhead is applied at September's rate. Jobs K-101, K-102 and K-103 were completed in October. Tapri adds 10% of factory cost for administration and selling overheads and invoices at total cost plus 20%.

**Required:** Compute the factory cost of the completed jobs and their invoice prices.

:::: answer Show the working
**Working note 1: September's overhead rate.** ₹21,600 ÷ ₹28,800 = 75% of labour cost (the same for K-102 and K-103): **75% of direct labour cost**.

**Working note 2: October's materials.** R-41 is credited back (returned to stores) and R-42 is charged to K-105, not K-102. So October's materials: K-102 ₹2,900 (R-46 only); K-103 ₹5,400 (R-43); K-101 nil.

**Working note 3: October's labour.** K-101: 20 × ₹100 + 15 × ₹80 = ₹3,200; K-102: 40 × ₹100 + 25 × ₹80 = ₹6,000; K-103: 30 × ₹100 + 10 × ₹80 = ₹3,800. The 30 waiting and breakdown hours are indirect labour: part of factory overhead, recovered through the 75% rate, not charged to any job.

**Factory cost of completed jobs** (overheads at 75% of labour)

| Job, month | Materials (₹) | Labour (₹) | Overheads (₹) | Factory cost (₹) |
|---|---:|---:|---:|---:|
| K-101 Sep | 18,400 | 28,800 | 21,600 | 68,800 |
| K-101 Oct | – | 3,200 | 2,400 | 5,600 |
| **K-101 total** | **18,400** | **32,000** | **24,000** | **74,400** |
| K-102 Sep | 12,600 | 18,900 | 14,175 | 45,675 |
| K-102 Oct | 2,900 | 6,000 | 4,500 | 13,400 |
| **K-102 total** | **15,500** | **24,900** | **18,675** | **59,075** |
| K-103 Sep | 9,800 | 13,500 | 10,125 | 33,425 |
| K-103 Oct | 5,400 | 3,800 | 2,850 | 12,050 |
| **K-103 total** | **15,200** | **17,300** | **12,975** | **45,475** |

**Invoice prices**

| Particulars | K-101 (₹) | K-102 (₹) | K-103 (₹) |
|---|---:|---:|---:|
| Factory cost | 74,400.00 | 59,075.00 | 45,475.00 |
| Administration and selling (10% of factory cost) | 7,440.00 | 5,907.50 | 4,547.50 |
| **Total cost** | **81,840.00** | **64,982.50** | **50,022.50** |
| Profit (20% of total cost) | 16,368.00 | 12,996.50 | 10,004.50 |
| **Invoice price** | **98,208.00** | **77,979.00** | **60,027.00** |

Assumption, as in ICAI's answer to its own version of this problem: indirect labour is included in the factory overhead recovered at 75% of labour cost.
::::
:::::

::::: example The airport tea cart, Job K-118
Job K-118, a steel tea cart with a glass hood for an airport franchisee:

| Particulars | Details |
|---|---|
| Direct materials issued from stores | ₹96,000 |
| Direct materials returned to stores (shop credit) | ₹4,500 |
| Glass hood bought specially for this job | ₹18,000 |
| Welding labour | 120 hours at ₹100, of which 20 hours were overtime worked at the franchisee's request; overtime premium is 50% of the normal rate |
| Carpentry labour | 80 hours at ₹80 |
| Design fee paid to an outside architect for this job | ₹5,600 |
| Factory overheads | Welding ₹120 and carpentry ₹60 per labour hour |
| Rectification of panels rejected at inspection, normal for this type of job | ₹2,300 (materials and labour) |
| Administration overheads | 10% of works cost |
| Selling and distribution overheads | 5% of cost of production |
| Profit | 20% of the selling price |

> **Kesar:** The airport wanted it early. Do we eat the overtime?
> **Ritu:** Who asked for the overtime, and why? The answer decides where it goes.

**Required:**

(i) Prepare a job cost sheet showing prime cost, works cost, cost of production and total cost.

(ii) Calculate the price to quote.

(iii) State how (i) changes if the rectification had been caused by a one-off machine fault.

:::: answer Show the working
**(i) Job cost sheet, Job K-118**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Direct materials issued | 96,000 | |
| Less: returned to stores | (4,500) | |
| Add: glass hood bought for the job | 18,000 | 1,09,500 |
| Direct wages: welding (120 × ₹100) | 12,000 | |
| Direct wages: carpentry (80 × ₹80) | 6,400 | 18,400 |
| Overtime premium at the customer's request (20 × ₹50) | | 1,000 |
| Direct expenses: architect's design fee | | 5,600 |
| **Prime cost** | | **1,34,500** |
| Factory overheads: welding (120 × ₹120) | 14,400 | |
| Factory overheads: carpentry (80 × ₹60) | 4,800 | 19,200 |
| Rectification of defective work (normal) | | 2,300 |
| **Works cost** | | **1,56,000** |
| Administration overheads (10% of works cost) | | 15,600 |
| **Cost of production** | | **1,71,600** |
| Selling and distribution overheads (5% of cost of production) | | 8,580 |
| **Total cost** | | **1,80,180** |

**(ii) Price** = ₹1,80,180 ÷ 80% = **₹2,25,225**, a profit of ₹45,045 (25% of cost).

::: diagram Job K-118: the cost tiers and the price
{"type": "plot", "h": 280, "x": [0.4, 5.6], "y": [0, 250000],
 "xlabel": "cost tier", "ylabel": "amount (₹)",
 "xticks": [[1, "prime"], [2, "works"], [3, "production"], [4, "total"], [5, "price"]],
 "yticks": [[0, "0"], [50000, "50,000"], [100000, "1,00,000"], [150000, "1,50,000"], [200000, "2,00,000"], [250000, "2,50,000"]],
 "legend": "none",
 "series": [{"label": "Job K-118", "bars": true, "values": true, "color": "a", "pts": [[1, 134500, "1,34,500"], [2, 156000, "1,56,000"], [3, 171600, "1,71,600"], [4, 180180, "1,80,180"], [5, 225225, "2,25,225"]]}],
 "caption": "Each bar adds one layer: factory overheads and rectification, administration, selling and distribution, then the profit."}
:::

**Treatment notes.** The returned material is credited to the job; the glass hood bought for it is charged direct, without passing through stores (SM 9.5). The overtime premium was incurred at the customer's desire, so it is charged to the job directly (SM 3.18). The rectification is normal for this kind of job, so the job bears it.

**(iii) Abnormal cause.** Rectification caused by a one-off machine fault is abnormal: it is not charged to Job K-118 but written off to the Costing Profit and Loss Account. Works cost becomes ₹1,53,700, administration ₹15,370, cost of production ₹1,69,070, selling and distribution ₹8,453.50 and total cost **₹1,77,523.50**; the price on the same margin falls to ₹2,21,904.38.
::::
:::::

## Under the hood

### Job, batch and the WIP ledger

A batch is a job made of many identical units: its card collects costs like a job's, then divides by the units in the batch ([[cma.unit.batch|batch costing]]). In both, the job cost sheets in the WIP ledger are the detail behind the Work-in-Process Control Account: every debit to it (entries 2, 7 and 10) is posted to some job's card, and every credit (entries 3 and 11) is taken off one.

### Two ways ICAI prices from last year's books

Four of the five job-pricing questions read for this lesson give last year's totals and ask for this year's quote. Factory overheads are taken as a percentage of direct wages, and administration (and selling) as a percentage of works cost or cost of production, read from the previous year's figures (MTP May 2025 Series II Q4(a), RTP January 2026 Q13, PYQ September 2026 Q2(b)); the method is worked in [[cma.oh.ads|administration, selling and distribution overheads]]. Illustration 2 (SM 9.10–9.12, repeated with new numbers in RTP May 2025 Q13) takes departmental overhead percentages of departmental wages from last year's profit and loss account, and selling expenses as a percentage of works cost.

### Estimated and actual

The cost sheet has two columns, estimated and actual: the estimate prices the quotation ([[cma.sheet.quote|estimated cost sheets, tenders and quotations]]); the actual, built from requisitions and time cards, shows whether the job earned what was quoted.

## Exam angle

::: exam How ICAI asks job costing
In the ten documents read for this lesson:

- **Job cost sheet and price, 6–7 marks**: MTP September 2026 Series I Q2(a) (materials returned, direct expenses, rectification of normal defectives charged to the job, administration on works cost, selling on cost of production, 20% on price; part (iii) the abnormal case, 7 marks); MTP May 2025 Series II Q4(a) (6 marks) and RTP January 2026 Q13 (RTPs carry no marks): last year's rates, a new job at the same profit on sales with revised overheads; PYQ September 2026 Q2(b) (an aircraft component order at last year's rates plus a 10% safety margin, 7 marks); RTP May 2025 Q13 (departmental overheads from last year's profit and loss account).
- **Case-scenario MCQ**: RTP September 2026 case scenario, full production cost of Job AMS-101.
- **Theory, 3–5 marks**: PYQ September 2025 Q6(b), "List the advantages of Job Costing" (5 marks; the answer was ICAI's five points word for word); MTP January 2026 Series I Q2(b), "Distinguish between Job Costing and Process Costing" (4 marks); PYQ September 2024 Q6(c), "Define Job costing and explain differences between job and batch costing" (4 marks, the CIMA definition first); PYQ May 2025 Q5(b), job against batch costing (3 marks).
- The spoiled and defective work table (SM 9.7) was set as 4-mark theory in PYQ January 2025 Q5(c), PYQ May 2026 (an OR option) and MTP September 2025 Series II Q6(c); it is taught in [[cma.mat.losses|spoilage and defectives]].
:::

::: exam Traps
- A shop credit removes the material from the job; a transfer note moves it to the other job. Neither stays where it was first requisitioned.
- Special material bought for a job goes straight to the job, not through stores.
- Waiting time, breakdowns and idle time are indirect labour, booked to standing orders: do not add them to a job. ICAI's answer to SM practical problem 1 assumes they are covered by the overhead rate.
- "Same rate as last month" means the percentage computed from last month's abstract, applied to this month's labour only.
:::

::: trick The three streams test
Before adding up a job, check that every figure came through one of three doors: a requisition (materials), a time card (labour) or a pre-determined rate (overheads). Anything else (special purchases, direct expenses, customer-requested overtime) must be traceable to the job by its own document. Condition: abnormal items never enter the job.
:::

## Answer frame

**"Describe job costing, giving examples of industries"** (SM question 1):

1. CIMA definition, in quotation marks.
2. Costs collected by jobs, contracts, products or work orders; each job a separate entity; also applies to batches.
3. Process: a separate cost sheet for each job; materials and labour from the bill of material and time cards; overheads added on completion.
4. Suitability: customers' own specifications; no two orders alike; WIP varies with jobs in hand.
5. Industries: printing, furniture, hardware, ship-building, heavy machinery, interior decoration, repairs.

**"List the advantages of job costing"** (PYQ September 2025 Q6(b), 5 marks): ICAI's five, in order: cost details of every job for control; profitability of each job; production planning; budgetary control and standard costing can be applied; spoilage and defectives identified and responsibility fixed.

**"Distinguish between job costing and process costing"** (4 marks): the six points of the compare table, each as a pair, in ICAI's order.

### Three answers to the October question

::: cols
**Loses marks**

K-102 charged with all three requisitions (₹10,700) and the 30 waiting hours added to the jobs.

The documents were not read.
---
**Passes**

Returns and transfer handled, but September and October lumped into one line per job with no working for the 75%.

Right totals, invisible method.
---
**Full marks**

Working notes for the rate, the materials and the labour; a month-wise factory cost table as ICAI lays it out; the invoice table; the assumption about indirect labour stated.
:::

## Common mistakes

::: mistake Hall of Shame: the material that was charged twice
Charging R-42 to K-102 as requisitioned and again to K-105 after the transfer. **Fix:** a material transfer note moves the cost: credit the transferor job, debit the transferee job; a shop credit returns it to stores.
:::

::: mistake Waiting time on the customer's bill
Adding waiting and breakdown hours (30 hours, ₹2,760) to the completed jobs. **Fix:** idle and waiting time are booked to standing orders: they are factory overhead, already covered by the overhead rate.
:::

::: mistake Overtime premium in the overhead pool
Spreading the airport cart's ₹1,000 premium over all jobs. **Fix:** overtime at the customer's desire is charged to that job directly. Overtime to cope with general production programmes or urgent orders is overhead of the department that works it; overtime caused by another department's fault is charged to that department; overtime from abnormal conditions goes to Costing P&L (SM 3.18).
:::

::: mistake The abnormal defect the customer paid for
Charging rectification from a machine fault to the job. **Fix:** abnormal rectification goes to Costing P&L; only the normal rate of defectives is charged to the job.
:::

## Practice

::: quiz Check yourself
Q: A job's direct materials are ₹50,000 and direct labour ₹20,000. Factory overheads are 80% of direct labour, administration overheads 10% of factory cost, and the company wants a profit of 20% on the selling price. What price should it quote (₹)?
= 118250
> Factory cost = ₹50,000 + ₹20,000 + ₹16,000 = ₹86,000; total cost = ₹86,000 × 1.10 = ₹94,600; price = ₹94,600 ÷ 0.80 = ₹1,18,250.

Q: Case scenario. At Tapri Kiosk Works, steel sheets issued to Job K-104 are not needed there, and the shop supervisor sends them straight to Job K-105 on the next bay instead of returning them to stores. Which document must record this?
- [ ] A shop credit (stores debit note)
- [x] A material transfer note
- [ ] A fresh bill of material
- [ ] A material requisition for K-105
> SM 9.5: surplus used on another job without returning to stores is recorded on a material transfer note naming both jobs, so the WIP ledger is adjusted. A shop credit is for material returned to stores.

Q: Which journal entry records the total cost of jobs completed?
- [ ] Work-in-Process Control A/c Dr. To Cost of Sales A/c
- [x] Cost of Sales A/c Dr. To Work-in-Progress Control A/c
- [ ] Costing Profit and Loss A/c Dr. To Work-in-Process Control A/c
- [ ] Finished Goods A/c Dr. To Factory Overhead Control A/c
> SM 9.9, entry 11. The balance of Cost of Sales then goes to Costing P&L (entry 12).

Q: Which of these is a feature of job costing, not process costing?
- [ ] The unit cost is an average cost for the period
- [ ] Costs are compiled for each process for an accounting period
- [x] Costs are computed when the job is completed, by adding all costs against its number
- [ ] Products lose their individual identity in a continuous flow
> SM 9.13–9.14: the other three describe process costing.

Q: Which are among ICAI's advantages of job costing? Select all that apply.
- [x] The profitability of each job can be derived
- [x] It facilitates production planning
- [ ] It is economical and needs little clerical work
- [x] Spoilage and defectives can be identified and responsibility fixed
> SM 9.13. Job costing is costly and laborious, with a lot of clerical work: those are its disadvantages.
:::

## Recap

- Job costing (CIMA): where work consists of separate contracts, jobs or batches, each authorised by a specific order or contract; each job a separate cost unit.
- Suits customers' own specifications, orders that are never alike, WIP varying with jobs in hand: printing, furniture, ship-building, interior decoration, repairs.
- Materials: a stores requisition per job (or the bill of material); special purchases direct; returns by shop credit; transfers by material transfer note.
- Labour: job time cards; idle time to standing orders. Overheads: pre-determined rates, "essentially an arbitrary method".
- Thirteen entries: purchases, issues, returns, wages, overheads into WIP Control; completed jobs to Cost of Sales; then to Costing P&L; sales against Cost Ledger Control.
- Normal rectification is charged to the job; abnormal goes to Costing P&L; customer-requested overtime premium goes to the job.
- Job against process: specific orders vs continuous flow; cost per job on completion vs average cost per period. (A kiosk is never just a kiosk.)

## Flashcards

Q:: CIMA's definition of job costing?
A:: The category of basic costing methods which is applicable where the work consists of separate contracts, jobs or batches, each of which is authorised by specific order or contract.

Q:: When is job costing suitable (SM 9.3)?
A:: When jobs are executed for different customers to their specifications; when no two orders are alike and each needs special treatment; where work-in-progress differs from period to period with the number of jobs in hand.

Q:: Name five industries ICAI gives for job costing.
A:: Printing, furniture, hardware, ship-building, heavy machinery, interior decoration, repairs (any five).

Q:: Document for surplus material returned from a job to stores, and for material moved to another job?
A:: Returned: stores debit note or shop credit (the job is credited). Moved: material transfer note naming both jobs.

Q:: How is special material bought for a particular job treated?
A:: Charged direct to that job as soon as it is purchased, without passing through the Stores Ledger.

Q:: Entry for overhead charged to jobs?
A:: Work-in-Process Control A/c Dr. To Factory Overhead Control A/c.

Q:: Entry for the sales value of jobs completed?
A:: Cost Ledger Control A/c Dr. To Costing Profit and Loss A/c.

Q:: Another name of the Cost Ledger Control Account?
A:: General Ledger Adjustment Account.

Q:: ICAI's five advantages of job costing?
A:: Cost details of each job available for control; profitability of each job; facilitates production planning; budgetary control and standard costing can be applied; spoilage and defectives identified and responsibility fixed.

Q:: ICAI's four disadvantages of job costing?
A:: Costly and laborious; much clerical work so more chance of error; not suitable in inflationary conditions; previous cost records meaningless if market conditions change.

Q:: Treatment of overtime premium paid because the customer wanted the job early?
A:: Charged to that job directly.
