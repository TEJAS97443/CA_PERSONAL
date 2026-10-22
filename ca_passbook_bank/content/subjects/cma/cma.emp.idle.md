---
id: cma.emp.idle
title: Idle time and overtime
minutes: 28
needs: cma.emp.payroll
tags: idle time, normal idle time, abnormal idle time, overtime premium, Factories Act, inflated wage rate, Costing Profit and Loss
labs:
summary: Paid hours that produce nothing and extra hours that cost extra: what causes each, where ICAI charges it, and how to compute the charge to a job.
---

## In plain words

### The mixer that broke and the order that could not wait

Diwali week at Tapri's samosa factory. On Monday the dough mixer breaks down and twelve fryer operators stand around for two hours, on full pay. On Thursday an airline wants 50,000 extra samosas by Saturday, so the same operators stay till midnight and are paid double for the extra hours.

> **Kesar:** Charge the two lost hours to the Diwali batch. Sab adjust ho jayega.
> **Ritu:** The batch did not break the mixer. A breakdown is abnormal: its cost goes to Costing Profit and Loss, not into the samosas. The tea breaks and machine set-ups are normal: those stay in the cost.
> **Kesar:** And the double pay on Thursday?
> **Ritu:** The airline asked for the rush, so the extra half goes to the airline's job.

Ritu has just used the two rules of this lesson. **Idle time** is time paid for in which nothing is produced. If it cannot be avoided in the normal course of business (walking from the gate, set-ups, lunch), it is **normal idle time** and part of the cost of production. If it comes from something abnormal (a breakdown, a power cut, no material, a strike), it is **abnormal idle time** and charged to Costing Profit and Loss.

**Overtime** is work beyond normal hours, paid at a higher rate. The extra over the normal rate, the **overtime premium**, is charged according to *why* the overtime was worked: to the job if the customer wanted it, to overheads if general production needed it, to the department at fault if another department caused it, and to Costing Profit and Loss if a flood or earthquake did.

::: analogy The wedding caterer
A caterer's staff are paid while they wait for the baraat to arrive: every wedding has that wait, so it is built into the price per plate (normal idle time). If the generator fails for three hours, that is not the guests' doing, and the caterer swallows the loss (abnormal idle time). If the bride's father asks for dinner to run past midnight, he pays the late-night surcharge (overtime premium charged to the job).
:::

::: key
Normal idle time and the normal-rate part of overtime are costs of production; abnormal idle time is a loss for Costing Profit and Loss. The overtime premium follows the reason the overtime was worked.
:::

## How it works

### Paid, but producing nothing

**Idle time** is the time during which no production is carried out because the worker remains idle but is paid: ==the difference between the time paid and the time booked==. The time paid includes holidays, paid leave and allowable rest (SM 3.13). Its two kinds, with ICAI's causes and treatment (SM 3.13–3.14):

| | Normal idle time | Abnormal idle time |
|---|---|---|
| Meaning | Cannot be avoided or reduced in the normal course of business | Arises from abnormal factors |
| Causes | Time lost between factory gate and place of work; interval between one job and another; setting-up time for the machine; normal rest time, lunch break | Lack of coordination; power failure, breakdown of machines; non-availability of raw materials, strikes, lockouts, poor supervision, fire, flood |
| Treatment | Part of the cost of production: for direct workers an allowance in the standard hours or standard rate; for indirect workers, in the overhead rate | Not part of production cost: a separate item in the Costing Profit and Loss Account |

Abnormal idle time is further split into **controllable** (time that could have been put to productive use had management been more alert and efficient) and **uncontrollable** (lost to causes management cannot control, such as a breakdown of machines or a flood). The cost of each category is shown by cause, so that responsibility can be fixed. Management should aim to eliminate controllable idle time and, in the long run, to reduce even normal idle time (SM 3.14).

::: diagram Idle time: kinds and treatment
{"type": "tree", "root": {"label": "Idle time\npaid − booked", "children": [
  {"label": "Normal\ncost of production", "note": "in the rate or overhead rate", "color": "a"},
  {"label": "Abnormal\nCosting P&L", "note": "controllable or not", "color": "bad"}]},
 "caption": "Blue: normal idle time stays in cost (direct workers through the wage rate, indirect workers through the overhead rate); rose: abnormal idle time goes to Costing Profit and Loss, analysed as controllable or uncontrollable (SM 3.13–3.14)."}
:::

How the allowance for normal idle time gets into the rate: divide the wages by the hours that can be worked (paid hours less normal breaks), not by all the paid hours. Every job then carries a little of the normal idle time, and abnormal idle hours are charged to Costing Profit and Loss at the same rate (SM 3.16, Illustration 2). Building the full hourly rate is in [[cma.emp.payroll|attendance, payroll and the elements of wages]].

### Overtime: the extra hours and the extra half

**Overtime** is work done beyond normal working hours. The **overtime payment** has two elements: wages for the overtime hours at the normal rate, and the **premium** (extra) payment. The overtime rate is usually double the normal rate; the extra over the normal rate is the **overtime premium** (SM 3.17).

The rate may be fixed by the entity or by statute, but the premium may not be less than the statute requires. The Study Material quotes the Factories Act, 1948: "Where a worker works in a factory for more than nine hours in any day or for more than forty-eight hours in any week, he shall, in respect of overtime work, be entitled to wages at the rate of twice his ordinary rate of wages." For piece-rate workers, the time rate is deemed to be the daily average of their full-time earnings on the same or identical job in the month before (SM 3.17).

::: warning
The Factories Act provisions are quoted as the Study Material gives them (SM 3.17). Verify against the Study Material and Statutory Update for your attempt.
:::

**Occasional overtime is a healthy sign**: the firm has the optimum capacity and is using it fully. **Persistent overtime is a bad sign**: either the firm needs more capacity in men and machines, or the workers have got into the habit of postponing ordinary work to the evening to earn overtime wages (SM 3.17–3.18).

### Who pays the extra half

The normal-rate part of overtime wages is charged like any other wages. The **premium** goes where its cause sends it (SM 3.18):

::: diagram Overtime premium: where it is charged
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Why overtime?"},
  {"id": "c", "kind": "decision", "label": "Customer's request?"},
  {"id": "cj", "kind": "end", "label": "Charge the job", "color": "a"},
  {"id": "f", "kind": "decision", "label": "Another dept's fault?"},
  {"id": "fd", "kind": "end", "label": "Charge that dept", "color": "c"},
  {"id": "a", "kind": "decision", "label": "Flood, earthquake?"},
  {"id": "ap", "kind": "end", "label": "Costing P&L", "color": "bad"},
  {"id": "o", "kind": "end", "label": "Overheads of the dept", "color": "g"}],
 "edges": [["s", "c"], ["c", "cj", "yes"], ["c", "f", "no"], ["f", "fd", "yes"], ["f", "a", "no"], ["a", "ap", "yes"], ["a", "o", "no"]],
 "caption": "ICAI's four treatments of overtime premium (SM 3.18); the last branch covers general production programmes and urgent orders. When overtime is worked regularly as a policy, for example because of a shortage of workers, ICAI charges all jobs at an inflated wage rate instead (SM 3.25)."}
:::

ICAI prints the causes and the treatments side by side (SM 3.18); learn both lists in this order. Each treatment names the situation it applies to.

| Causes of overtime | Treatment of overtime premium |
|---|---|
| 1. The customer may agree to bear the entire charge of overtime because of urgency of work | 1. Overtime at the desire of the customer: premium charged to the job directly |
| 2. To make up a shortfall in production due to some unexpected development | 2. Overtime to cope with general production programmes or to meet urgent orders: overhead cost of the department or cost centre that works overtime |
| 3. To make up a shortfall in production due to some fault of management | 3. Overtime in a department due to the fault of another department: charged to the latter department |
| 4. To secure an out-turn in excess of normal output, to take advantage of an expanding market or rising demand | 4. Overtime on account of abnormal conditions such as flood or earthquake: not charged to cost, but to Costing Profit and Loss Account |

**Overtime as a policy.** If overtime is worked regularly throughout the year, for example because workers are short, the premium is a normal part of employee cost. ICAI then charges every job at an **average inflated wage rate**: the year's total wages including premium, divided by the total hours (SM 3.25, Illustration 5).

## Formats and formulas

::: definition Idle time
The time for which the employer pays but obtains no direct benefit or for no productive purpose. (SM 3.55)
:::

::: definition Overtime premium
The rate for overtime work is higher than the normal time rate; the extra amount so paid over the normal rate is called overtime premium. (SM 3.17)
:::

::: definition Ordinary rate of wages (Factories Act, as quoted in the SM)
The basic wages plus such allowances, including the cash equivalent of the advantage accruing through the concessional sale to workers of food grains and other articles, as the worker is for the time being entitled to, but does not include a bonus and wages for overtime work. (SM 3.17)
:::

::: formula Idle time and overtime
$$\text{Idle time} = \text{Time paid} - \text{Time booked}$$
$$\text{OT pay} = \text{OT hours} \times \text{normal rate} \qquad + \text{premium}$$
Premium = overtime hours × (overtime rate − normal rate).
:::

::: formula Average inflated wage rate
$$\text{Inflated rate} = \frac{\text{Total wages}}{\text{Total hours}}$$
Total wages = normal-time wages + overtime wages at the overtime rates (premium included). Used when overtime is a regular policy (SM 3.25).
:::

ICAI's layout for the wages of a period (SM 3.16, Illustration 2). *Reproduce it from memory.*

| Allocation of wages in cost accounting | Hours × rate | Amount (₹) |
|---|---|---:|
| Allocated to Job X | hours booked × rate | xxx |
| Allocated to Job Y | hours booked × rate | xxx |
| Charged to Costing Profit and Loss A/c | abnormal idle hours × rate | xxx |
| **Total** (equals the wages paid) | | **xxx** |

Rate = wages of the period ÷ effective hours (paid hours less normal breaks). For overtime questions, ICAI shows each situation separately: employee cost chargeable to the job, and the premium as overhead, to the job, to another department or to Costing Profit and Loss (SM 3.25–3.26).

## Worked examples

::::: example The fryer line's lost Tuesday
Salma is a fryer operator at Tapri's samosa factory, which works six days a week, eight hours a day. She is paid ₹400 a day basic plus dearness allowance of 50% of basic. She is allowed 30 minutes a day for tea breaks and cleaning the fryer. Her job card for the week shows:

| Job | Hours |
|---|---:|
| Batch 51 | 18 |
| Batch 52 | 14 |
| Batch 53 | 10 |

The hours not booked were lost when the power failed on Tuesday.

**Required:**

(i) Calculate the cost of normal idle time and of abnormal idle time at the wage rate paid per hour.

(ii) Show how the week's wages are charged in cost accounts.

(iii) State how the treatment would differ if the hours had been lost because the stores department failed to issue cooking oil on time.

:::: answer Show the working
::: diagram Salma's 48 paid hours
{"type": "plot", "h": 260, "x": [0.4, 5.6], "y": [0, 20],
 "xticks": [[1, "Batch 51"], [2, "Batch 52"], [3, "Batch 53"], [4, "normal idle"], [5, "abnormal idle"]],
 "yticks": [0, 5, 10, 15, 20], "ylabel": "hours",
 "series": [{"label": "hours", "bars": true, "values": true, "color": "a", "pts": [[1, 18], [2, 14], [3, 10], [4, 3], [5, 3]]}],
 "caption": "18 + 14 + 10 + 3 + 3 = 48 paid hours. The jobs and the normal idle time make up the 45 hours of cost of production; the 3 abnormal hours are a loss."}
:::

**Working notes**

1. Wages for the week = (₹400 + 50% of ₹400) × 6 days = ₹600 × 6 = **₹3,600**.
2. Paid hours = 8 × 6 = 48. Normal idle time = 30 minutes × 6 = **3 hours**.
3. Effective hours = 48 − 3 = **45**. Hours booked = 18 + 14 + 10 = 42. Abnormal idle time = 45 − 42 = **3 hours**.
4. Wage rate paid = ₹3,600 ÷ 48 = ₹75 an hour. Rate for costing = ₹3,600 ÷ 45 = **₹80 an hour**.

**(i)** Cost of normal idle time = 3 × ₹75 = **₹225**; cost of abnormal idle time = 3 × ₹75 = **₹225**.

**(ii) Allocation of wages in cost accounting**

| Particulars | Hours × rate | Amount (₹) |
|---|---|---:|
| Allocated to Batch 51 | 18 × ₹80 | 1,440 |
| Allocated to Batch 52 | 14 × ₹80 | 1,120 |
| Allocated to Batch 53 | 10 × ₹80 | 800 |
| Charged to Costing Profit and Loss A/c (power failure) | 3 × ₹80 | 240 |
| **Total** | | **3,600** |

The normal idle time is not shown as a separate charge: it is inside the ₹80 rate. The ₹5 an hour by which ₹80 exceeds ₹75, over the 45 effective hours, is ₹225, exactly the cost of normal idle time: ₹210 of it rides on the batches (42 × ₹5) and ₹15 on the abnormal hours (3 × ₹5). The power failure is an abnormal, uncontrollable cause, so its cost goes to Costing Profit and Loss.

**Why ₹225 in (i) but ₹240 in (ii).** ICAI uses both rates, each for its own question. Asked for the *cost of idle time* with a rate per hour given, value the idle hours at the rate paid (January 2025 MCQ 13: 1.5 hours of each kind at ₹100 an hour, so ₹150 and ₹150). Asked to *allocate the week's wages*, divide the wages by the effective hours and charge the jobs and the abnormal hours at that rate (SM 3.16, Illustration 2), so the abnormal hours carry their ₹15 share of normal idle time. Answer each part as it is asked, and name the rate in a working note.

**(iii)** Late issue of material is still abnormal idle time and still goes to Costing Profit and Loss. But it is **controllable**: the hours could have been used had the stores department been more alert. It is shown under controllable abnormal idle time, against its cause, so that responsibility is fixed on the stores department (SM 3.14).
::::
:::::

:::: example Kesar's Diwali hampers and the four reasons for overtime
Tapri's packing unit has 100 workers. Each works 8 hours a day including a 30-minute lunch break, and last year they worked 240 days; their wages for normal time came to ₹1,62,00,000. Overtime is paid at a premium of 50% of the basic rate before and after normal working hours, and 100% on Sundays and holidays. Last year the unit worked:

| Hours worked last year | Hours |
|---|---:|
| Normal time | 1,80,000 |
| Overtime before and after working hours | 40,000 |
| Overtime on Sundays and holidays | 5,000 |
| **Total** | **2,25,000** |

Job H-12, Kesar's Diwali hamper order, took 1,600 normal hours, 160 hours of overtime before and after working hours and 40 hours on Sundays: 1,800 hours in all.

**Required:** Calculate the employee cost chargeable to Job H-12 and the treatment of the overtime premium where overtime is worked:

(i) regularly throughout the year as a policy, because of a shortage of workers;

(ii) irregularly, to meet the requirements of production;

(iii) at the request of the customer, to deliver before Diwali;

(iv) because a cyclone flooded the unit and lost output had to be made up;

(v) because the stores department issued the hamper boxes three days late.

::: answer Show the working
**Working notes**

1. Effective normal hours = 100 workers × (8 − 0.5) hours × 240 days = 1,80,000 hours; basic wage rate = ₹1,62,00,000 ÷ 1,80,000 = **₹90 an hour**. Overtime rate before and after working hours = ₹90 + 50% = ₹135; on Sundays and holidays = ₹90 + 100% = ₹180.
2. Premium per hour: ₹45 before and after working hours; ₹90 on Sundays and holidays.
3. Premium on Job H-12 = 160 × ₹45 + 40 × ₹90 = ₹7,200 + ₹3,600 = **₹10,800**. Job H-12 at basic rate = 1,800 × ₹90 = **₹1,62,000**.
4. Average inflated wage rate:

| Particulars | Amount (₹) |
|---|---:|
| Normal time (1,80,000 hours × ₹90) | 1,62,00,000 |
| Overtime before and after working hours (40,000 × ₹135) | 54,00,000 |
| Overtime on Sundays and holidays (5,000 × ₹180) | 9,00,000 |
| **Total wages for 2,25,000 hours** | **2,25,00,000** |

Average inflated wage rate = ₹2,25,00,000 ÷ 2,25,000 hours = **₹100 an hour**.

**Statement of employee cost of Job H-12 and treatment of the premium**

| Situation | Charged to Job H-12 (₹) | Premium of ₹10,800 goes to |
|---|---:|---|
| (i) Regular policy, shortage of workers | 1,80,000 (1,800 × ₹100) | Inside the inflated rate; nothing separate |
| (ii) Irregular, production requirements | 1,62,000 | Factory overheads of the packing unit |
| (iii) Customer's request | 1,72,800 (₹1,62,000 + ₹10,800) | The job itself |
| (iv) Cyclone and flood | 1,62,000 | Costing Profit and Loss Account |
| (v) Late issue by stores | 1,62,000 | The stores department, whose fault it was |

In (i) the job bears the year's average premium (₹18,000 above basic) rather than its own ₹10,800, because under a policy of regular overtime every job shares the premium.
:::
::::

## Under the hood

### When "more than nine hours" is read two ways

The SM's Illustration 4 pays twice the ordinary rate only for hours beyond nine in a day: a 10½-hour day is 8 normal hours, 1 extra hour at the ordinary rate and 1½ overtime hours at double, 12 equivalent hours (SM 3.22). ICAI's RTP for January 2026 (Q9) instead says that once a worker works more than nine hours, overtime counts from the 8th hour. Read the question's rule and state the reading in a working note.

### Idle time in standard costing

In standard costing, the idle hours (hours paid − hours worked) at the standard rate are the **labour idle time variance** (SM 13.27): [[cma.std.labour|labour variances]].

### Control

ICAI lists control over idle time and overtime among the factors for controlling employee cost (SM 3.5). The labour utilisation statement shows abnormal idle time by causes each week (SM 3.26), and persistent overtime is itself a warning about capacity or habits (SM 3.17).

## Exam angle

::: exam Where idle time and overtime appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, the topic came up in 11 questions.

- **Theory, 4 marks.** "Describe briefly idle time and explain the treatment" for a set-up (direct worker), a lunch break (indirect worker) and a breakdown: May 2024 Q6(c), repeated in MTP May 2026 Series II Q6(c). Causes of normal and abnormal idle time: MTP January 2025 Series II Q4(b). Treatment of idle time and overtime wages: MTP September 2025 Series I Q4(b). Effect of overtime on productivity: MTP May 2025 Series I Q2(b).
- **Numerical, 4–6 marks.** Inflated wage rate and the job's cost in four overtime situations, including a flood, after first finding the basic rate from 50 workers' effective hours (8 hours less a 30-minute lunch break, 160 days): September 2024 Q2(b) (6 marks). The same in two situations, premium stated as 75% and 125%: MTP May 2025 Series I Q1(c). Abnormal idle time and overtime premium per employee: MTP September 2026 Series I Q1(a). Overtime at twice basic and DA, allocated to jobs: RTP May 2025 Q9. Daily overtime after nine hours, holiday work: RTP January 2026 Q9.
- **Multiple choice, 2 marks.** Cost of normal and abnormal idle time in a 48-hour week: January 2025 MCQ 13. Allocation of a week's wages with an abnormal idle time charge: MTP September 2025 Series II MCQ 14.
:::

::: exam The traps ICAI set
- **Rate or premium?** Illustration 5 gives overtime "rates" of 175% and 225% of basic; MTP May 2025 Series I Q1(c) gives a "premium" of 75% and 125%: the same thing. Premium = rate − 100%.
- **Only the premium moves.** In the irregular, customer and flood cases, the job keeps all hours at the basic rate; only the premium goes elsewhere.
- **Which time is abnormal?** "Unaccounted time attributable to power failure" (January 2025 MCQ 13) is abnormal; the allowed 15 minutes a day for maintenance is normal.
- **Which rate?** The cost of idle time with a rate per hour given is hours × that rate (January 2025 MCQ 13); an allocation of the week's wages uses wages ÷ effective hours for the jobs and the abnormal hours alike (MTP September 2025 Series II MCQ 14: ₹2,640 ÷ 44 hours = ₹60).
- One MTP answer (September 2026 Series I Q1(a)(iv)) words the customer case differently; write the Study Material's rule: a customer's request is charged to the job.
:::

::: trick Follow the cause
Ask "Who or what made this time necessary?" The normal course of business: cost of production. The customer: the job. Another department: that department. Nature or abnormal events: Costing Profit and Loss. Condition: overtime worked regularly as a policy is the exception; it is spread through the inflated rate.
:::

## Answer frame

### "Describe idle time and its treatment in the following situations"

Define idle time first (time paid but no production; time paid − time booked; normal or abnormal), then a table, as ICAI's suggested answer to May 2024 Q6(c) does:

| Situation | Idle time | Treatment |
|---|---|---|
| Setting-up time for a direct worker's machine | Normal | Part of cost of production; allowed for in standard hours or rate |
| Lunch break of an indirect worker | Normal | Considered in computing the overhead rate |
| Time lost by a machine breakdown | Abnormal | Separate item in the Costing Profit and Loss Account |

### "Discuss the effect of overtime payment on productivity"

1. From the SM (3.17–3.18): occasional overtime is healthy (optimum capacity, fully used); persistent overtime is a bad sign (more capacity needed, or work habitually postponed to earn overtime).
2. ICAI's suggested answer (MTP May 2025 Series I Q2(b)) adds that overtime raises the cost of production: the premium is an extra payment; efficiency during overtime may fall; workers may slacken in normal hours to earn more; lower output and higher premium raise cost.

### "Discuss the accounting treatment of idle time and overtime wages"

The chapter's own Theoretical Question 1, set as MTP September 2025 Series I Q4(b) (4 marks). ICAI's suggested answer gives the normal idle time treatment and the four premium treatments; add abnormal idle time to make the answer complete. In this order:

1. **Normal idle time**: part of the cost of production; for direct workers an allowance in the standard hours or standard rate, for indirect workers considered in computing the overhead rate (SM 3.13).
2. **Abnormal idle time**: not part of production cost; a separate item in the Costing Profit and Loss Account, analysed into controllable and uncontrollable by cause (SM 3.14).
3. **Overtime premium** (SM 3.18): at the desire of the customer, charged to the job directly; for general production programmes or urgent orders, overhead cost of the department or cost centre that works overtime; due to the fault of another department, charged to that department; on account of abnormal conditions such as flood or earthquake, not charged to cost but to Costing Profit and Loss Account. The overtime hours at the normal rate are charged like ordinary wages.
4. **Overtime worked regularly as a policy**: the premium is part of employee cost, and jobs are charged at the average inflated wage rate (SM 3.25).

### The numerical: three answers to case (ii)

::: cols
**Loses marks**

"Job H-12: 160 × ₹135 + 40 × ₹180 + 1,600 × ₹90 = ₹1,72,800."

That is the customer case: the premium stayed on the job.
---
**Passes**

"Job ₹1,62,000; overheads ₹10,800."

Right figures, but no rates, no premium working, no reason.
---
**Full marks**

Rates and premium per hour as working notes, the job at basic rate for all 1,800 hours, the premium split by type, and the treatment named with its reason.
:::

## Common mistakes

::: mistake Hall of Shame: the 75% premium paid at 75%
Reading "overtime premium of 75%" as an overtime rate of 75% of basic, so overtime is paid *less* than normal time. **Fix:** a premium is the extra; the overtime rate is 175% of basic.
:::

::: mistake The whole overtime wage sent to overheads
Charging all 160 × ₹135 to overheads in case (ii). **Fix:** the overtime hours are still the job's hours at the normal rate; only the premium (160 × ₹45) goes to overheads.
:::

::: mistake The power cut spread over the samosas
Dividing Salma's wages by the 42 booked hours (₹85.71 an hour) so that every batch carries the power failure. **Fix:** divide by the effective hours (45), and charge the 3 abnormal hours separately to Costing Profit and Loss.
:::

::: mistake Normal idle time written off
Sending tea breaks or set-up time to Costing Profit and Loss. **Fix:** normal idle time cannot be avoided in the normal course of business; it is part of the cost of production.
:::

## Practice

::: quiz Check yourself
Q: A packer is paid ₹70 an hour for a 48-hour week. Normal idle time is 2 hours; she booked 41 hours to jobs; the rest was lost waiting for a delayed truck. What is the cost of abnormal idle time at the rate paid, in rupees?
= 350
> Abnormal idle time = 48 − 2 − 41 = 5 hours; 5 × ₹70 = ₹350. Counting the 2 normal hours as abnormal gives ₹490.

Q: Case scenario. In November Tapri's packing department works 300 overtime hours because the samosa factory sent its output two days late after a mix-up in its own planning. Ritu must book the ₹13,500 overtime premium. Which treatment is correct?
- [ ] Charge it to the jobs packed in those 300 hours
- [ ] Treat it as an overhead of the packing department
- [x] Charge it to the samosa factory, the department at fault
- [ ] Charge it to the Costing Profit and Loss Account
> Overtime worked in one department because of the fault of another is charged to the latter (SM 3.18). Overheads of the packing department would be right for general production needs; Costing P&L is for abnormal conditions such as floods.

Q: A worker's ordinary rate is ₹60 an hour, her normal day is 8 hours, and her employer pays twice the ordinary rate only for hours beyond nine in a day. What is her pay for an 11-hour day, in rupees?
= 780
> 9 hours at ₹60 = ₹540, plus 2 overtime hours at ₹120 = ₹240: ₹780. Treating all 3 hours beyond 8 as overtime gives ₹840: a different rule (RTP January 2026 Q9 style), which must be stated in the question.

Q: Which of these are normal idle time? Select all that apply.
- [x] Time lost walking from the factory gate to the place of work
- [ ] Time lost because raw material ran out
- [x] Setting-up time for the machine
- [ ] Time lost in a lockout
> ICAI's normal causes: gate to workplace, interval between jobs, set-up time, rest and lunch (SM 3.13). Shortage of material and lockouts are abnormal (SM 3.14).

Q: Overtime is worked irregularly to meet production requirements. 100 overtime hours are paid at ₹150 against a normal rate of ₹100. How much goes to factory overheads, in rupees?
= 5000
> Only the premium: 100 × (₹150 − ₹100) = ₹5,000. The other ₹10,000 is the job's normal wages for those hours. ₹15,000 sends the whole overtime wage to overheads.
:::

## Recap

- Idle time = time paid − time booked: paid, nothing produced.
- Normal idle time (gate to workplace, between jobs, set-ups, rest and lunch): cost of production; direct workers through the rate, indirect workers through the overhead rate.
- Abnormal idle time (lack of coordination, power failure, breakdown, no material, strikes, lockouts, fire, flood): Costing Profit and Loss, analysed as controllable and uncontrollable.
- Overtime payment = overtime hours at normal rate + premium; usually double the normal rate.
- Premium: customer's request → job; general production or urgent orders → department overheads; another department's fault → that department; abnormal conditions → Costing P&L. Regular policy → inflated rate for all jobs.
- The SM's Factories Act quote: more than nine hours a day or 48 a week, twice the ordinary rate.
- Occasional overtime healthy; persistent overtime a bad sign. (Whoever caused the wait pays for it.)

## Flashcards

Q:: Define idle time.
A:: The time during which no production is carried out because the worker remains idle but is paid; the difference between the time paid and the time booked.

Q:: Four causes of normal idle time?
A:: Time lost between factory gate and place of work; interval between one job and another; setting-up time for the machine; normal rest time and lunch break.

Q:: Treatment of normal idle time in cost accounts?
A:: Part of the cost of production: for direct workers an allowance in standard hours or rate; for indirect workers it is considered in the overhead rate.

Q:: Treatment of abnormal idle time?
A:: Not included in production cost; shown as a separate item in the Costing Profit and Loss Account, analysed into controllable and uncontrollable by cause.

Q:: Controllable vs uncontrollable abnormal idle time?
A:: Controllable: could have been put to productive use had management been more alert and efficient. Uncontrollable: lost to abnormal causes beyond management's control, such as machine breakdown or flood.

Q:: Two elements of overtime payment?
A:: Wages for overtime hours at the normal rate, and the premium (extra) payment for overtime work.

Q:: Overtime premium at the desire of the customer: treatment?
A:: Charged to the job directly.

Q:: Overtime to meet general production programmes or urgent orders: treatment of the premium?
A:: Overhead cost of the department or cost centre that works the overtime.

Q:: Overtime due to the fault of another department, or due to flood or earthquake: treatment of the premium?
A:: Fault of another department: charged to that department. Abnormal conditions: not charged to cost; Costing Profit and Loss Account.

Q:: Overtime worked regularly as a policy (shortage of workers): how is the job charged?
A:: At the average inflated wage rate (total wages including premium ÷ total hours), so the premium is part of employee cost.

Q:: Factories Act, as quoted in the SM: when is overtime at twice the ordinary rate due?
A:: When a worker works more than nine hours in any day or more than forty-eight hours in any week.

Q:: What does persistent overtime indicate?
A:: That the firm needs more capacity in men and machines, or that workers postpone ordinary work to the evening to earn overtime wages.
