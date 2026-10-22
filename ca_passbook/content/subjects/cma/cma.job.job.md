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

::::: example October at Tapri Kiosk Works: fixed prices and the WIP account
Tapri Kiosk Works had two jobs in progress on 1 October; their job cards showed factory cost to date of ₹1,24,000 (K-201) and ₹86,500 (K-202). October's documents show:

| Document | Job | Amount (₹) |
|---|---|---:|
| Requisition R-71 | K-201 | 22,000 |
| Requisition R-72 | K-202 | 31,000 |
| Requisition R-73 | K-203 | 48,000 |
| Requisition R-74 | K-204 | 19,000 |
| Shop credit SC-9: part of R-72 returned to stores | K-202 | 5,000 |
| Material transfer note MT-4: part of R-73 sent to K-204 | K-203 to K-204 | 6,000 |

Direct labour hours booked:

| Job | Fabrication hours | Finishing hours |
|---|---:|---:|
| K-201 | 60 | 40 |
| K-202 | 90 | 30 |
| K-203 | 120 | – |
| K-204 | 40 | 20 |

Fabrication labour is paid ₹110 an hour and finishing ₹90. Overheads are applied at ₹150 per direct labour hour in fabrication and ₹100 in finishing. A further 25 fabrication hours were lost waiting for a steel delivery that the supplier sent a week late. K-201 and K-202 were completed and delivered in October at the fixed prices agreed with the franchisees, ₹2,10,000 and ₹1,50,000. Administration and selling overheads are 8% of factory cost.

**Required:**

(i) Calculate October's cost of each job and the factory cost of the completed jobs.

(ii) Calculate the profit or loss on each completed job.

(iii) Prepare the Work-in-Process Control Account for October and reconcile its closing balance with the job cards.

:::: answer Show the working
**Working note 1: materials.** The shop credit takes ₹5,000 off K-202; the transfer note moves ₹6,000 from K-203 to K-204 (credit K-203, debit K-204). Net materials: K-201 ₹22,000; K-202 ₹26,000; K-203 ₹42,000; K-204 ₹25,000; total ₹1,15,000 (requisitions ₹1,20,000 less ₹5,000 returned).

**Working note 2: labour and overheads**

| Job | Labour (₹) | Overheads (₹) |
|---|---:|---:|
| K-201: 60 × ₹110 + 40 × ₹90; 60 × ₹150 + 40 × ₹100 | 10,200 | 13,000 |
| K-202: 90 × ₹110 + 30 × ₹90; 90 × ₹150 + 30 × ₹100 | 12,600 | 16,500 |
| K-203: 120 × ₹110; 120 × ₹150 | 13,200 | 18,000 |
| K-204: 40 × ₹110 + 20 × ₹90; 40 × ₹150 + 20 × ₹100 | 6,200 | 8,000 |
| **Total** | **42,200** | **55,500** |

The 25 hours lost waiting for the late steel are abnormal idle time: their wages (25 × ₹110 = ₹2,750) go to the Costing Profit and Loss Account, not to any job.

**(i) Cost of jobs**

| Particulars | K-201 (₹) | K-202 (₹) | K-203 (₹) | K-204 (₹) |
|---|---:|---:|---:|---:|
| Cost to 30 September | 1,24,000 | 86,500 | – | – |
| Materials (WN 1) | 22,000 | 26,000 | 42,000 | 25,000 |
| Labour (WN 2) | 10,200 | 12,600 | 13,200 | 6,200 |
| Overheads (WN 2) | 13,000 | 16,500 | 18,000 | 8,000 |
| **Factory cost** | **1,69,200** | **1,41,600** | **73,200** | **39,200** |
| Status | Completed | Completed | In progress | In progress |

**(ii) Profit or loss on completed jobs**

| Particulars | K-201 (₹) | K-202 (₹) |
|---|---:|---:|
| Factory cost | 1,69,200 | 1,41,600 |
| Administration and selling (8%) | 13,536 | 11,328 |
| **Total cost** | **1,82,736** | **1,52,928** |
| Fixed price | 2,10,000 | 1,50,000 |
| **Profit / (loss)** | **27,264** | **(2,928)** |

K-202 was priced below its cost: with a fixed price, every hour or rupee of material above the estimate comes out of the profit.

**(iii) Work-in-Process Control Account for October**

::: cols
| Dr. | Amount (₹) |
|---|---:|
| To Balance b/d | 2,10,500 |
| To Material Control A/c (₹1,20,000 − ₹5,000) | 1,15,000 |
| To Wages Control A/c | 42,200 |
| To Factory Overhead Control A/c | 55,500 |
| **Total** | **4,23,200** |
---
| Cr. | Amount (₹) |
|---|---:|
| By Cost of Sales A/c (K-201 and K-202 at factory cost) | 3,10,800 |
| By Balance c/d | 1,12,400 |
| **Total** | **4,23,200** |
:::

The returned material is credited to the job and debited back to stores, so only ₹1,15,000 reaches the account; the transfer between K-203 and K-204 changes the job cards but not the control account. Reconciliation: closing balance ₹1,12,400 = K-203 ₹73,200 + K-204 ₹39,200, the two open job cards.
::::
:::::

::::: example The airport tea cart, Job K-118: estimate, extras and actual cost
Tapri Kiosk Works quoted ₹1,56,800 for Job K-118, a steel tea cart for an airport franchisee. The estimate was: materials ₹80,000; welding 100 hours and carpentry 50 hours; total cost ₹1,25,440; profit 20% of the price. The contract says that changes the customer asks for after the quote are billed at their direct cost plus 25%, and overtime premium worked at the customer's request is billed at cost. The actual figures:

| Particulars | Details |
|---|---|
| Direct materials issued from stores | ₹86,000 |
| Direct materials returned to stores (shop credit) | ₹3,000 |
| Glass hood bought for the job, added at the customer's request after the quote | ₹18,000 |
| Design fee for the hood, paid to an outside architect | ₹4,000 |
| Welding labour | 120 hours at ₹100, of which 20 hours were overtime worked at the customer's request to deliver early; overtime premium is 50% of the normal rate |
| Carpentry labour | 50 hours at ₹80 |
| Factory overheads | Welding ₹150 and carpentry ₹60 per labour hour |
| Rectification of panels rejected at inspection, normal for this type of job | ₹2,500 (materials and labour) |
| Administration, selling and distribution overheads | 12% of works cost |

> **Kesar:** The airport wanted it early and changed the design. Do we eat all of that?
> **Ritu:** Read the contract first; then cost the job as it was actually built.

**Required:**

(i) Prepare the job cost sheet of Job K-118, showing prime cost, works cost and total cost.

(ii) Calculate the amount to be billed and the profit on the job.

(iii) Reconcile the actual profit with the profit in the estimate.

:::: answer Show the working
**(i) Job cost sheet, Job K-118**

| Particulars | Amount (₹) | Amount (₹) |
|---|---:|---:|
| Direct materials issued | 86,000 | |
| Less: returned to stores | 3,000 | |
| Add: glass hood bought for the job | 18,000 | 1,01,000 |
| Direct labour: welding 120 × ₹100 | 12,000 | |
| Overtime premium at the customer's request: 20 × ₹50 | 1,000 | |
| Carpentry 50 × ₹80 | 4,000 | 17,000 |
| Direct expenses: design fee | | 4,000 |
| **Prime cost** | | **1,22,000** |
| Factory overheads: welding 120 × ₹150 + carpentry 50 × ₹60 | | 21,000 |
| Rectification of defective work (normal) | | 2,500 |
| **Works cost** | | **1,45,500** |
| Administration, selling and distribution (12%) | | 17,460 |
| **Total cost** | | **1,62,960** |

The returned material is credited to the job; the hood bought for it is charged direct, without passing through stores (SM 9.5). The overtime premium was incurred at the customer's desire, so it is charged to the job directly (SM 3.18). The rectification is normal for this kind of job, so the job bears it.

**(ii) Amount to be billed and profit**

| Particulars | Amount (₹) |
|---|---:|
| Quoted price | 1,56,800 |
| Extras: hood and design fee (₹22,000 × 125%) | 27,500 |
| Extras: overtime premium at cost | 1,000 |
| **Amount to be billed** | **1,85,300** |
| Less: Total cost | 1,62,960 |
| **Profit** | **22,340** |

::: diagram Job K-118: the cost tiers and the bill
{"type": "plot", "h": 280, "x": [0.4, 4.6], "y": [0, 200000],
 "xlabel": "cost tier", "ylabel": "amount (₹)",
 "xticks": [[1, "prime"], [2, "works"], [3, "total"], [4, "bill"]],
 "yticks": [[0, "0"], [50000, "50,000"], [100000, "1,00,000"], [150000, "1,50,000"], [200000, "2,00,000"]],
 "legend": "none",
 "series": [{"label": "Job K-118", "bars": true, "values": true, "color": "a", "pts": [[1, 122000, "1,22,000"], [2, 145500, "1,45,500"], [3, 162960, "1,62,960"], [4, 185300, "1,85,300"]]}],
 "caption": "Each bar adds one layer: factory overheads and rectification, then administration, selling and distribution, then the profit in the bill."}
:::

**(iii) Reconciliation of profit**

| Particulars | Amount (₹) |
|---|---:|
| Profit in the estimate (₹1,56,800 − ₹1,25,440) | 31,360 |
| Add: margin earned on the extras: ₹28,500 billed − (₹23,000 cost + 12% overheads ₹2,760) | 2,740 |
| Less: overruns not billable: materials ₹3,000 (₹83,000 against ₹80,000), 20 extra welding hours × (₹100 + ₹150) = ₹5,000, rectification ₹2,500, and 12% overheads on them ₹1,260 | (11,760) |
| **Actual profit** | **22,340** |

The profit fell from 20% of the price to 12.06% of the bill because of costs the contract does not let Tapri recover: extra materials, extra welding hours and rework.
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

K-202 charged with the whole of R-72 (₹31,000) and K-203 with all of R-73, the waiting hours added to the jobs.

The documents were not read.
---
**Passes**

Returns and transfer handled and the job costs right, but no Work-in-Process Control Account, so the closing balance is never checked against the open job cards.

Right costs, half the answer.
---
**Full marks**

Working notes for the materials, labour and overheads; a job-wise factory cost table as ICAI lays it out; the profit on each fixed price; the control account reconciled with the job cards; the treatment of the waiting hours stated.
:::

## Common mistakes

::: mistake Hall of Shame: the material that was charged twice
Charging R-73's ₹6,000 to K-203 as requisitioned and again to K-204 after the transfer. **Fix:** a material transfer note moves the cost: credit the transferor job, debit the transferee job; a shop credit returns it to stores.
:::

::: mistake Waiting time on the customer's bill
Adding the 25 hours lost waiting for the late steel (₹2,750) to the jobs. **Fix:** abnormal idle time goes to the Costing Profit and Loss Account; normal idle and waiting time, booked to standing orders, is factory overhead already covered by the overhead rate.
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
