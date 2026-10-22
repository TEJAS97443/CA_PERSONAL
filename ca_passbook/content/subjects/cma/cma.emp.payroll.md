---
id: cma.emp.payroll
title: Attendance, payroll and the elements of wages
minutes: 34
needs: cma.intro.classify
tags: employee cost, time-keeping, time booking, payroll procedure, elements of wages, wage rate for costing, bio-metric attendance
labs:
summary: How a factory records who came and what they worked on, turns that into a payroll, and works out what one productive hour of an employee really costs.
---

## In plain words

### ₹75 on the napkin, much more on the cost sheet

Tapri's samosa factory in Indore is pricing a big airline order, and Kesar has done the labour cost on the back of a napkin.

> **Kesar:** Ramesh gets ₹15,000 a month and is paid for 2,400 hours a year. ₹1,80,000 ÷ 2,400 is ₹75 an hour. Done.
> **Ritu:** Per productive hour, please. Add our share of his PF and ESI, his Diwali bonus and the canteen. Then take out his 20 days of paid leave and the time lost in tea breaks and machine set-ups. Ramesh costs Tapri nearly half as much again as your napkin says.
> **Kesar:** Put the difference in miscellaneous expenses.
> **Ritu:** Then every airline samosa is priced at a loss.

Ritu's figure is a fraction. On top is everything Tapri spends because Ramesh works there: wages, employer's contributions, bonus, benefits in kind. That total is his **employee cost**. Below are the hours he can actually work: hours paid for, less paid leave, less unavoidable idle time. The result is the rate at which his work is charged to the samosas.

Three records get there. **Time-keeping** records when Ramesh came and left: his attendance time. **Time booking** records what he did with it: 3½ hours on one batch, 4 on another, half an hour waiting for dough. The **payroll** turns attendance into pay; costing uses the time booked to charge each batch.

::: analogy The iceberg under the payslip
A payslip is the tip of an iceberg: basic pay and dearness allowance. Below the water, just as real to the employer: PF and ESI contributions, bonus, paid holidays, the canteen, medical care. Costing measures the whole iceberg, then divides it only by the hours that do useful work.
:::

::: key
Time-keeping says how long an employee was at work; time booking says what that time was spent on. The cost of an employee hour for costing is the whole employee cost (monetary and non-monetary) divided by the effective hours, not the payslip divided by the hours paid.
:::

## How it works

### Five departments and one worker

**Employee cost** covers wages and salary, allowances and incentives, overtime, the employer's contribution to provident fund and other welfare funds, and benefits such as leave with pay and subsidised food (SM 3.3). The part traceable to a cost object economically is **direct**; the rest, **indirect**, goes to overheads.

Control does not mean a small wage bill or low wages for each employee: ICAI's aim is ==to keep the wages per unit of output as low as possible==, by paying in a way that encourages efficiency (SM 3.4). Five departments share the job (SM 3.4–3.5):

| Department | Functions |
|---|---|
| Personnel | (i) On a requisition from a department, searches for the skills and qualification required; (ii) ensures recruits have them; (iii) arranges training for new recruits and workshops for existing employees; (iv) maintains personal and job records; (v) evaluates performance from time to time |
| Engineering and Work Study | (i) Prepares plans and specifications for each job; (ii) training and guidance; (iii) supervises production; (iv) time and motion studies; (v) job analysis; (vi) job evaluation |
| Time-keeping | (i) Attendance records (time-keeping); (ii) time spent on various jobs (time booking) |
| Payroll | (i) Prepares the payroll; (ii) disburses salary and wages |
| Cost Accounting | (i) Accumulates and classifies employee costs; (ii) analyses and allocates them to cost centres or cost objects |

### The gate and the job card

Time-keeping is the correct recording of employees' attendance time; even piece workers are recorded, for discipline and an adequate rate of production (SM 3.6–3.7). Its **objectives** are: preparation of payrolls; calculating overtime; ascertaining and controlling employee cost; ascertaining idle time; disciplinary purposes; and overhead distribution (SM 3.7).

The **methods** are manual or mechanical/automated (SM 3.7–3.8):

| Method | How it works | Note |
|---|---|---|
| Attendance register (manual) | Arrival and departure written in a register | Simple, cheap, for small firms; wrong and back-dated entries in collusion with the time-keeper |
| Metal disc / token (manual) | Numbered token recorded by the time-keeper | Almost obsolete; errors, proxy attendance |
| Punch card (automated) | Card inserted or waved at a reader | No time-keeper; minimises recording error and time manipulation |
| Bio-metric (automated) | Fingerprint, face or retina matched to a database | Reduces manipulation and proxy; costly for small firms |

**Time booking** records each activity of the employee on a **time (or job) card**, for **costing** (the cost of each job), **measuring efficiency** (actual against standard time) and **fixing responsibility** (variances split into controllable and uncontrollable causes) (SM 3.9). Job time plus idle time must equal attendance time: the two records check each other (SM 3.10).

::: diagram One day of Ramesh: the gate record and the job card
{"type": "seq", "w": 380, "lanes": ["Gate", "Ramesh", "Job card"],
 "events": [
  {"from": "Ramesh", "to": "Gate", "text": "in at 9:00"},
  {"from": "Ramesh", "to": "Job card", "text": "Batch 46: 3½ h"},
  {"from": "Ramesh", "to": "Job card", "text": "idle, no dough: ½ h"},
  {"from": "Ramesh", "to": "Job card", "text": "Batch 47: 4 h"},
  {"from": "Ramesh", "to": "Gate", "text": "out at 17:00"},
  {"note": "8 h at work = 3½ + ½ + 4 on the card", "over": ["Gate", "Job card"]}],
 "caption": "The gate record is time-keeping (attendance time); the job card is time booking (jobs and idle time). The two must agree."}
:::

### From attendance sheet to bank transfer

The payroll procedure has five steps (SM 3.11–3.12):

::: steps
1. **Time and attendance details** from the time-keeping department: days or hours (time rate), units (piece rate); with time booking, payroll works out overtime and bonus.
2. **List of employees and other details** from personnel/HR: employees on roll and their rates, so that no unauthorised or bogus employee is paid.
3. **Computation of wages and other incentives** by payroll, which sends pay slips to the cost/accounting department.
4. **Payment to the employees** by cost/accounting, after statutory deductions (employee's PF and ESI, TDS on salary).
5. **Deposit of all statutory liabilities**: the deductions and the employer's contributions go to the statutory bodies.
:::

::: diagram Payroll procedure
{"type": "flow", "w": 420, "nodes": [
  {"id": "tk", "kind": "io", "label": "Time-keeping"},
  {"id": "hr", "kind": "io", "label": "Personnel / HR"},
  {"id": "pay", "kind": "process", "label": "Payroll department"},
  {"id": "acc", "kind": "process", "label": "Cost / Accounts"},
  {"id": "emp", "kind": "end", "label": "Employees", "color": "g"},
  {"id": "stat", "kind": "end", "label": "Statutory bodies", "color": "c"}],
 "edges": [["tk", "pay", "1"], ["hr", "pay", "2"], ["pay", "acc", "3"], ["acc", "emp", "4"], ["acc", "stat", "5"]],
 "caption": "ICAI's five steps (SM 3.11): 1 time and attendance, 2 employee details, 3 wage and salary sheet, 4 payment after deductions, 5 deposit of deductions and contributions."}
:::

What is generally deducted from the payroll (SM 3.12–3.13):

**Statutory deductions**

1. Provident fund: the employee's contribution.
2. Employee State Insurance (ESI): the employee's contribution.
3. Tax deducted at source (TDS), when the salary exceeds the maximum exemption limit.
4. Professional tax, a state-level tax on carrying on a business, profession or service.

**Other deductions**

1. Voluntary contribution to provident fund: an employee who so desires may contribute over and above the contribution payable by the employer.
2. Contribution to any benevolent fund, on the employee's request.
3. Loan deductions: instalments of loans taken.
4. Other advances and dues: festival advance, unadjusted advances.

### Where the wage bill goes

Cost accounting analyses each department's total wages into four parts (SM 3.6), by cost centre, job and work order, on a **wage analysis sheet** built from wage sheets, time cards, piece-work cards and job cards (SM 3.26):

::: diagram A department's wages, analysed
{"type": "layers", "layers": [
  {"label": "Direct cost", "note": "jobs completed, goods produced", "right": "cost object"},
  {"label": "Indirect employee cost", "note": "not traceable to a job", "right": "overheads"},
  {"label": "Cost of idle time", "note": "paid, nothing produced", "right": "a loss"},
  {"label": "Abnormal loss / gain", "note": "abnormal causes", "right": "Costing P&L"}],
 "caption": "ICAI's four-way analysis of total wages (SM 3.6). Direct hours reach a job through time sheets and job cards; indirect hours through the overhead absorption rate (SM 3.27)."}
:::

### The iceberg under the payslip

Strictly, wages include the **non-monetary benefits** received by virtue of employment: medical facilities; educational and training facilities; recreational and sports facilities; housing and social welfare; and the cost of subsidised canteen and co-operative societies. Their money value is part of the wage cost per worker (SM 3.38).

::: diagram Elements of wages
{"type": "nest", "root": {"title": "Employee cost", "color": "mute", "children": [
  {"title": "Monetary", "color": "a", "mono": false, "lines": ["Basic wage and DA", "Overtime, special allowances", "Production bonus", "Employer's PF, ESI, pension", "Leave pay"]},
  {"title": "Non-monetary", "color": "b", "mono": false, "lines": ["Medical facilities", "Education and training", "Recreation and sports", "Housing and social welfare", "Subsidised canteen"]}]},
 "caption": "Blue box: what is paid in money; teal box: what is given in kind (SM 3.38–3.39). Both go into the cost of an employee hour."}
:::

In the monetary part (SM 3.39), the **basic wage** pays for work done, in hours attended or units produced. **Dearness allowance (DA)** covers the rise in the cost of living: a percentage of basic or a fixed amount, revised with the cost of living index as agreed with the union. **Overtime allowance** pays extra hours at the rates of the Factories Act; special allowances (working conditions, tool maintenance) are wages too. **Production bonus** rewards output above standard.

::: warning
The Study Material states that under the Payment of Bonus Act a worker is entitled to a compulsory bonus of 8.33% of wages earned in the year or ₹100, whichever is greater, and up to 20% of wages depending on profits (SM 3.39). Verify against the Study Material and Statutory Update for your attempt.
:::

### An hour for costing is not an hour for paying

For **indirect workers**, all wages and benefits are overheads. For **direct workers** there are two choices (SM 3.40, 3.42):

1. Treat the payments other than basic wages and DA, and the non-monetary benefits, as overheads; or
2. Build them into the rate charged to jobs: total wages and additional payments ÷ **effective hours**. ICAI calls this the ideal method; the rate is for costing only, not for paying the worker.

**Holiday and leave wages** are either departmental overheads (kept apart from "worked for wages" in the payroll) or built into the inflated rate, which is possible only for direct workers (SM 3.41). A **night shift allowance** is overheads: it is not for any particular job (SM 3.42). Idle time and overtime premium have rules of their own: [[cma.emp.idle|idle time and overtime]].

## Formats and formulas

::: definition Employee (labour) cost
Benefits paid or payable to the employees of an entity, whether permanent or temporary, for the services rendered by them. Employee cost includes payments made in cash or kind. (SM 3.3)
:::

::: definition Direct and indirect employee cost
Direct: benefits paid or payable to the employees which can be attributed to a cost object in an economically feasible manner. Indirect: benefits paid or payable to the employees which cannot be directly attributable to a particular cost object in an economically feasible manner. (SM 3.3)
:::

::: definition Time-keeping and time booking
Time-keeping refers to recording and keeping of the employees' attendance time. Time booking is recording the details of work done and the time spent by an employee on each job or process. (SM 3.55)
:::

::: formula Rate per hour for costing (direct workers)
$$\text{Rate per hour} = \frac{\text{All benefits}}{\text{Effective hours}}$$
ICAI: total estimated monetary benefits and cost of non-monetary benefits ÷ (budgeted direct employee hours − normal idle time) (SM 3.42). Leave on full pay also comes off the hours.
:::

ICAI's layout for the effective hourly cost (SM 3.15, Illustration 1). *Reproduce it from memory.*

| Statement showing computation of effective hourly cost | Per month (₹) | Per annum (₹) |
|---|---:|---:|
| **(A) Earnings of the employee:** | | |
| Basic pay | xxx | xxx |
| Dearness allowance | xxx | xxx |
| Bonus | xxx | xxx |
| Employer's contribution to provident fund | xxx | xxx |
| Other allowances and benefits | xxx | xxx |
| **Total** | **xxx** | **xxx** |
| **(B) Effective working hours** (working note) | | xxx hours |
| **(C) Effective hourly cost (A ÷ B)** | | **₹ xx** |

When the question asks for both the pay and the cost, ICAI keeps two statements (SM 3.19–3.20, Illustration 3):

| Statement of earnings | Statement of employee cost |
|---|---|
| Basic wages | Gross wages (excluding overtime) |
| Add: Dearness allowance, overtime, allowances | Add: Employer's contribution to PF |
| **Gross wages earned** | Add: Employer's contribution to ESI |
| Less: Employee's contribution to PF | **Employee cost** |
| Less: Employee's contribution to ESI | ÷ Normal working hours |
| **Net wages earned** (what is paid) | **Ordinary wage rate per hour** |

The employee's own contributions are inside his gross wages, merely withheld; only the employer's are added to cost. The cost statement leaves overtime out because ICAI allocates the overtime wages separately, to the job on which the overtime was worked (Job Y in Illustration 3); the ordinary wages are shared over the jobs in the ratio of time booked.

## Worked examples

:::: example The real price of Ramesh's hour
Ramesh Yadav is a fryer operator at Tapri's Indore samosa factory, one of its 250 workers. His terms are:

| Particulars | Amount |
|---|---|
| Basic pay | ₹12,000 p.m. |
| Dearness allowance | 25% of basic pay |
| Diwali bonus | one month's basic pay and DA |
| Employer's contribution to PF | 12% of basic pay and DA |
| Employer's contribution to ESI | 3% of basic pay and DA |
| Canteen subsidy and medical scheme | ₹22,50,000 a year for all 250 workers |
| Working days | 300 a year of 8 hours, including 20 days of leave on full pay |
| Normal idle time (set-ups, oil changes, tea breaks) | 140 hours a year |
| Deducted from his pay | his own PF contribution of 12% of basic pay and DA, and professional tax of ₹200 a month |

**Required:**

(i) Prepare a statement showing the effective hourly cost of Ramesh, per month and per annum.

(ii) In October, Ramesh's job card shows 150 hours on Batch 47, an order of frozen samosas for an airline. Calculate the employee cost to be charged to Batch 47.

(iii) Calculate Ramesh's monthly net pay, and state why it is not his employee cost.

::: answer Show the working
**Working notes**

1. DA = 25% × ₹12,000 = ₹3,000 a month; basic pay and DA = ₹15,000 a month.
2. Employer's PF = 12% × ₹15,000 = ₹1,800 a month; employer's ESI = 3% × ₹15,000 = ₹450 a month.
3. Bonus = ₹15,000 a year = ₹1,250 a month. Canteen and medical = ₹22,50,000 ÷ 250 = ₹9,000 a year = ₹750 a month.
4. Effective working hours:

| Particulars | Hours |
|---|---:|
| Working days (300 × 8 hours) | 2,400 |
| Less: Leave on full pay (20 × 8 hours) | 160 |
| Hours available | 2,240 |
| Less: Normal idle time | 140 |
| **Effective working hours** | **2,100** |

**(i) Statement showing computation of effective hourly cost of Ramesh**

| Particulars | Per month (₹) | Per annum (₹) |
|---|---:|---:|
| Basic pay | 12,000 | 1,44,000 |
| Dearness allowance | 3,000 | 36,000 |
| Bonus | 1,250 | 15,000 |
| Employer's contribution to PF | 1,800 | 21,600 |
| Employer's contribution to ESI | 450 | 5,400 |
| Canteen subsidy and medical scheme | 750 | 9,000 |
| **(A) Employee cost** | **19,250** | **2,31,000** |
| (B) Effective working hours (WN 4) | | 2,100 hours |
| **(C) Effective hourly cost (A ÷ B)** | | **₹110** |

**(ii) Batch 47** = 150 hours × ₹110 = **₹16,500**.

**(iii) Net pay** = basic pay and DA ₹15,000 − his PF ₹1,800 − professional tax ₹200 = **₹13,000** a month. His own PF and the professional tax are part of his gross wages, only withheld and passed on, so they are not added again. Employee cost is what Tapri bears: gross wages, employer's contributions, bonus and benefits in kind.

The napkin method (₹1,80,000 ÷ 2,400 hours) gives ₹75: ₹35 short on every hour charged to the airline's batch.
:::
::::

:::: example November's wage analysis in the blending section
The blending section of Tapri's premix plant has six blenders (direct workers) and one supervisor. For November:

1. Each blender earns basic pay of ₹16,000 and dearness allowance of 25% of basic pay for 200 normal hours. The employer contributes 12% to PF and 3% to ESI, both on basic pay.

2. Two blenders worked 50 overtime hours in all, paid at double the rate of basic pay and DA: 30 hours on Job J-3, at the request of a hotel chain that agreed to bear the extra cost, and 20 hours on Job J-1, for general production. No contributions are payable on overtime.

3. Three blenders on the night shift received a night shift allowance of ₹4,500 in all.

4. The supervisor's employee cost, contributions included, was ₹36,000.

5. The blenders' job cards show (including the overtime hours): J-1 600 hours, J-2 350 hours, J-3 300 hours.

**Required:**

(i) Calculate the employee cost of a blender for the month and the ordinary rate per hour for costing.

(ii) Prepare the analysis of November's wages: the amount charged to each job and to the section's overheads, giving the reason for each treatment.

::: answer Show the working
**(i) Employee cost of one blender**

| Particulars | Amount (₹) |
|---|---:|
| Basic pay | 16,000 |
| Dearness allowance (25% of basic) | 4,000 |
| Employer's contribution to PF (12% of basic) | 1,920 |
| Employer's contribution to ESI (3% of basic) | 480 |
| **Employee cost for 200 normal hours** | **22,400** |
| **Ordinary rate per hour (÷ 200)** | **112** |

The blenders' own PF and ESI contributions are deducted from their pay; they are not added to the cost.

**Working note: overtime.** Rate of basic pay and DA = ₹20,000 ÷ 200 = ₹100 an hour; overtime is paid at ₹200 an hour: ₹100 for the hour and a premium of ₹100. Normal hours on the jobs: J-1 600 − 20 = 580; J-2 350; J-3 300 − 30 = 270; total 1,200 = 6 × 200.

**(ii) Analysis of November's wages**

| Item | J-1 (₹) | J-2 (₹) | J-3 (₹) | Section overheads (₹) |
|---|---:|---:|---:|---:|
| Normal hours at ₹112 (580; 350; 270) | 64,960 | 39,200 | 30,240 | – |
| Overtime hours at ₹100 (20; –; 30) | 2,000 | – | 3,000 | – |
| Premium, customer's request: 30 × ₹100 | – | – | 3,000 | – |
| Premium, general production: 20 × ₹100 | – | – | – | 2,000 |
| Night shift allowance | – | – | – | 4,500 |
| Supervisor (indirect worker) | – | – | – | 36,000 |
| **Total** | **66,960** | **39,200** | **36,240** | **42,500** |

Check: ₹66,960 + ₹39,200 + ₹36,240 + ₹42,500 = ₹1,84,900 = six blenders' ₹1,34,400 + overtime ₹10,000 + night shift allowance ₹4,500 + supervisor ₹36,000.

**Reasons.** The blenders' hours booked on each job are direct employee cost of that job, at the ordinary rate that includes the employer's contributions. The overtime premium worked at the customer's request is charged to that job; overtime premium for general production is an overhead of the section (SM 3.18). The night shift allowance is not for any particular job, so it is an overhead (SM 3.42), and the pay of an indirect worker such as the supervisor is wholly overheads (SM 3.40).
:::
::::

:::: example The 6,500 hours no job received
Tapri's chai premix plant at Pithampur records attendance on punch cards. In September its 250 direct workers were paid for 52,000 hours, but their job cards account for only 45,500 hours, so the job costs came out lower than the payroll. The workers fill one job card per job, and time not spent on a job is not recorded anywhere. Ritu's sample of the missing 6,500 hours shows:

| Use of the time | Hours |
|---|---:|
| Tea breaks and machine changeovers | 3,250 |
| Waiting for blend that the stores issued late | 1,300 |
| Cleaning and minor maintenance of the machines | 1,950 |

The cost of a direct worker's hour is ₹110. Kesar wants to know what went wrong and what should change. **Advise.**

::: answer Model answer
**Time keeping and time booking.** Time keeping records the total time an employee spends in the factory; time booking breaks that time up over the jobs on which it was spent (SM 3.6). Time booking is used for costing, for measuring efficiency against standard time and for fixing responsibility for variances (SM 3.9). The total of each employee's job time and idle time must equal his attendance time (SM 3.10). At Pithampur the punch cards keep time correctly, but the booking misses 6,500 hours (12.5% of the hours paid), costing ₹7,15,000 (6,500 × ₹110).

**What the missing hours are, and their treatment**

| Use of the time | Hours | Cost (₹) | Treatment |
|---|---:|---:|---|
| Tea breaks and changeovers | 3,250 | 3,57,500 | Normal idle time: part of the cost of production, recovered through the rate charged to jobs |
| Waiting for blend issued late | 1,300 | 1,43,000 | Abnormal idle time: Costing Profit and Loss Account, shown as controllable against the stores department |
| Cleaning and minor maintenance | 1,950 | 2,14,500 | Indirect work: production overheads |
| **Total** | **6,500** | **7,15,000** | |

Because none of this was booked, ₹7,15,000 of the payroll reached neither the jobs nor the overheads, and the job costs and the overhead rates were both understated.

**What should change.**

1. Each worker should book every hour of attendance: job time on the job, idle time with its cause, and indirect work against the overhead account.
2. With many short jobs, a time card for each employee for each day or week, showing all his jobs and idle time, makes the reconciliation with attendance time easy; one card per job makes the job's cost easy to compute but scatters each worker's time over many cards (SM 3.10).
3. The cost accounting department should reconcile the hours booked with the hours paid every week, and analyse the wages into direct cost, overheads and idle time (SM 3.6), before the job costs are used for pricing.
:::
::::

## Under the hood

### Two kinds of job card

One card per job, with every operation and worker on it, makes the job's employee cost easy to compute, but each worker's time is scattered over many cards and must be abstracted to reconcile with attendance. One card per employee per day or week, with all his jobs and idle time, makes that reconciliation easy (SM 3.10).

### Labour utilisation

A statement prepared (generally weekly) for each department or cost centre shows the actual time paid for, the standard time (including normal idle time) allowed for production, and the abnormal idle time analysed by causes (SM 3.26). The **wage analysis sheet** behind it serves three purposes (SM 3.26):

1. It analyses labour time into direct and indirect labour by cost centres, jobs and work orders.
2. It gives the direct labour cost (wages, overtime) to be charged as production cost of cost centres, jobs or work orders.
3. It provides information for treating indirect labour cost as overhead expenses.

Direct labour hours are identified with work orders, batches or capital jobs from source documents such as time sheets and job cards; indirect labour hours are traced to cost centres and then assigned through the overhead absorption rate (SM 3.26–3.27).

### Same question, older list

ICAI's MTP September 2024 Series II answer to "objectives of time keeping and time booking" gives time-keeping only two objectives (preparation of payroll; computation of cost) and time booking five (labour time and idle hours of a job; labour cost of jobs; wages and bonus under incentive schemes; overhead rates under labour and machine hour methods; performance against standard). The Study Material for January 2027 gives the six objectives of time-keeping and three purposes of time booking used above: write those, and use the older points as explanation if time allows.

## Exam angle

::: exam Where these topics appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, the topic came up in 9 questions.

- **Theory, 4 marks.** Objectives of time keeping and time booking: MTP September 2024 Series II Q6(c). Factors for controlling employee costs: September 2025 Q6(c). Proxy attendance and payroll errors, "discuss the features of the Bio-Metric Attendance System": May 2026 Q6(c).
- **Numerical, 4–5 marks.** Effective hourly cost: MTP September 2025 Series I Q3(c). Labour cost per man-day, DA on a cost of living index: MTP January 2026 Series I Q1(a). Cost per hour, then abnormal idle time and overtime premium: MTP September 2026 Series I Q1(a). Earnings per day, effective rate and wages charged to a job: RTP January 2026 Q9.
- **Inside other questions.** Production bonus and leave wages in a machine hour rate: RTP September 2024 Q9. Employer's EPF and ESI in direct employee cost of a cost sheet: RTP September 2026 Q8.
:::

::: exam The traps ICAI set
- Leave on full pay and normal idle time come off the hours, not the cost; abnormal idle time stays in the hours and its cost is charged separately (MTP September 2026 Series I Q1(a)).
- Read the base of each percentage: "10% of (i), (ii) and (iii)" puts PF on basic, DA and leave salary together (MTP January 2026 Series I Q1(a)).
- A welfare cost for all employees is divided per head first.
:::

::: trick Cost on top, effective hours below
Rate for costing = everything the employer bears ÷ hours that can be worked. What is withheld *from* the worker's wages (his PF, ESI, TDS) is already in the top line; paid time not worked (leave, normal idle time) comes off the bottom line. Condition: the inflated-rate method for direct workers; under the overheads method only basic and DA go on top.
:::

## Answer frame

### The theory questions ICAI asks

**Objectives of time-keeping and time booking** (SM 3.7, 3.9): the six objectives of time-keeping as listed above, then the three purposes of time booking (costing, efficiency, responsibility), one line each.

**Distinguish between time-keeping and time booking**

| Point | Time-keeping | Time booking |
|---|---|---|
| Records | Attendance time: arrival and departure | Time spent on each job, operation or process |
| Shows | Total time spent in the factory | Break-up of that time over jobs and idle time |
| Used for | Payroll, overtime, discipline, idle time | Job cost, efficiency, fixing responsibility |
| Record | Attendance register, token, punch card, bio-metric device | Time (job) card |

**Distinguish between direct and indirect employee cost** (SM 3.3–3.4)

| Direct employee cost | Indirect employee cost |
|---|---|
| Paid to employees directly engaged in the production process | Paid to employees not directly engaged in the production process |
| Easily identified and allocated to the cost unit | Apportioned on some appropriate basis |
| Varies with the volume of production | May not vary with the volume of production |

**Factors for controlling employee cost** (SM 3.5–3.6), in ICAI's order: (i) assessment of manpower requirements; (ii) control over time-keeping and time-booking; (iii) time and motion study; (iv) control over idle time and overtime; (v) control over employee turnover; (vi) wage and incentive systems; (vii) job evaluation and merit rating; (viii) employee productivity. Four are lessons of their own: [[cma.emp.idle|idle time and overtime]], [[cma.emp.turnover|turnover]], [[cma.emp.incentives|incentive systems]], [[cma.std.labour|labour efficiency]].

**A factory with proxy attendance: features of the bio-metric attendance system** (May 2026 Q6(c)). Write the features in ICAI's words, then apply them to the facts:

1. Attendance is marked by recognising an employee on the basis of physical and behavioural traits.
2. Each employee's unique identity (fingerprint, face, retina image) is kept in a database and matched when attendance is marked.
3. It includes fingerprint recognition, face recognition and time and attendance tracking technology.
4. It reduces the risk of time manipulation and proxy attendance.
5. Its set-up and maintenance cost may make it unsuitable for small organisations (SM 3.8).
6. Apply it: a large factory with proxy attendance justifies the cost; payroll should also pay only the employees on roll listed by HR (SM 3.11).

### The numerical: three answers to the same question

::: cols
**Loses marks**

"₹2,31,000 ÷ 2,400 hours = ₹96.25 an hour."

Leave and idle time left in the hours; no working notes.
---
**Passes**

"Rate = ₹2,31,000 ÷ 2,100 hours = ₹110."

Right, but the ₹2,31,000 and 2,100 hours come from nowhere: no method marks if one is wrong.
---
**Full marks**

ICAI's statement, each element per month and per annum, a working note for effective hours, the rate, and any assumption stated.
:::

## Common mistakes

::: mistake Hall of Shame: the PF counted twice
Adding the employee's own PF (deducted from his pay) as well as the employer's. For Ramesh that adds ₹21,600 a year and turns ₹110 an hour into ₹120.29. **Fix:** the employee's contribution is already inside his gross wages; add only the employer's contribution.
:::

::: mistake The paid holiday that worked a shift
Dividing the annual cost by all 2,400 paid hours. Ramesh is paid for 20 days of leave but works none of them, so the rate comes out at ₹96.25 instead of ₹110 and every job is under-costed. **Fix:** leave on full pay and normal idle time come out of the hours; their cost stays in the numerator, spread over the hours actually worked.
:::

::: mistake The night shift that billed the night's job
Charging the blenders' ₹4,500 night shift allowance to the job that ran at night. **Fix:** it is not for any particular job, so it is overheads (SM 3.42).
:::

## Practice

::: quiz Check yourself
Q: A Tapri café supervisor costs ₹2,85,600 a year in wages, employer's contributions and benefits. She is paid for 290 days of 8 hours, of which 18 days are leave on full pay, and normal idle time is 136 hours a year. What is her employee cost per hour for costing, in rupees?
= 140
> Effective hours = 2,320 − 144 − 136 = 2,040; rate = ₹2,85,600 ÷ 2,040 = ₹140. Dividing by all 2,320 paid hours gives ₹123.10.

Q: Case scenario. Tapri's Bhopal unit, 40 workers, keeps an attendance register. Ritu finds back-dated entries made with the time-keeper's help and wants a method that needs no time-keeper and suits a small budget. Which method fits best?
- [ ] Metal disc or token method
- [ ] Attendance register with a second time-keeper
- [x] Punch card attendance
- [ ] Bio-metric attendance system
> A punch card needs no time-keeper and minimises recording error and time manipulation (SM 3.8). Tokens are almost obsolete and allow proxies; a second time-keeper keeps the collusion risk; bio-metric costs may not suit a small unit.

Q: Which of these is an "other" (non-statutory) deduction from the payroll?
- [ ] Employee's contribution to ESI
- [ ] Professional tax
- [x] Contribution to a benevolent fund
- [ ] Tax deducted at source on salary
> ICAI lists PF, ESI, TDS and professional tax as statutory deductions; voluntary PF, benevolent fund, loan instalments and other advances are other deductions (SM 3.12–3.13).

Q: A worker's basic pay and DA are ₹20,000 a month. He contributes 12% to PF and the employer contributes 12%. What is the monthly employee cost to the employer, counting only these items, in rupees?
= 22400
> ₹20,000 + employer's 12% (₹2,400) = ₹22,400. The worker's own ₹2,400 is withheld from the ₹20,000, not added to it; ₹24,800 counts it twice.

Q: Which of these does ICAI treat as overheads rather than as part of a job's direct employee cost? Select all that apply.
- [x] Night shift allowance paid to a direct worker
- [x] All wages and benefits of indirect workers
- [ ] Basic wages of a direct worker for hours booked on the job
- [x] Holiday and leave wages, when the firm does not inflate the wage rate
> Night shift allowance is not for a particular job (SM 3.42); indirect workers' pay is all overheads (SM 3.40); holiday and leave wages are overheads unless built into an inflated rate (SM 3.41). Booked basic wages are direct.
:::

## Recap

- Employee cost: benefits paid or payable to employees, permanent or temporary, in cash or kind; direct if traceable to a cost object economically, else indirect (overheads).
- Aim of control: low wages per unit of output, not a low wage bill. Eight factors, from manpower assessment to employee productivity.
- Time-keeping = attendance time (six objectives); time booking = time on each job (costing, efficiency, responsibility). Job time + idle time = attendance time.
- Payroll in five steps: time and attendance, employee details, wage sheet, payment after deductions, deposit with statutory bodies. HR's list stops bogus employees.
- Wages include non-monetary benefits: medical, education and training, recreation, housing and welfare, subsidised canteen.
- Rate for costing = (monetary + non-monetary benefits) ÷ (budgeted hours − normal idle time); leave days come off the hours too.
- Add the employer's PF and ESI; never the employee's. Night shift allowance: overheads. (Measure the iceberg, not the tip.)

## Flashcards

Q:: ICAI's definition of employee (labour) cost?
A:: Benefits paid or payable to the employees of an entity, whether permanent or temporary, for the services rendered by them; it includes payments made in cash or kind.

Q:: Difference between time-keeping and time booking?
A:: Time-keeping records employees' attendance time (total time in the factory); time booking records the time spent by an employee on each job or process.

Q:: Six objectives of time-keeping?
A:: Preparation of payrolls; calculating overtime; ascertaining and controlling employee cost; ascertaining idle time; disciplinary purposes; overhead distribution.

Q:: Three purposes of time booking?
A:: Costing (cost of each job or activity), measurement of efficiency (actual vs standard time), fixation of responsibility (controllable and uncontrollable variances).

Q:: Payroll procedure: the five steps in order?
A:: Time and attendance details; list of employees and other details; computation of wages and other incentives; payment to employees after deductions; deposit of statutory liabilities.

Q:: Four statutory deductions from the payroll?
A:: Employee's contribution to provident fund; employee's contribution to ESI; tax deducted at source; professional tax.

Q:: Bio-metric attendance system: how does it work and what does it prevent?
A:: Attendance is marked by recognising physical and behavioural traits (fingerprint, face, retina) matched against a database; it reduces time manipulation and proxy attendance, but its cost may not suit small organisations.

Q:: Formula: rate per hour for costing purposes (direct workers)?
A:: (Total estimated monetary benefits + cost of non-monetary benefits) ÷ (budgeted direct employee hours − normal idle time).

Q:: Five non-monetary benefits included in wages?
A:: Medical facilities; educational and training facilities; recreational and sports facilities; housing and social welfare; cost of subsidised canteen and co-operative societies.

Q:: Treatment of night shift allowance in cost accounts?
A:: Treated as overheads, because the extra payment is not for any particular job.

Q:: Two treatments of holiday and leave wages?
A:: As departmental overheads (recorded separately from "worked for wages"), or by inflating the wage rate for costing, which is possible only for direct workers.

Q:: Eight factors for the control of employee cost?
A:: Assessment of manpower requirements; control over time-keeping and time-booking; time and motion study; control over idle time and overtime; control over employee turnover; wage and incentive systems; job evaluation and merit rating; employee productivity.
