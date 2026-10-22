---
id: cma.bud.ratios
title: Control ratios, budget variances, motivation, feedback and feed-forward
minutes: 32
needs: cma.bud.basics
tags: control ratios, efficiency ratio, activity ratio, capacity ratio, calendar ratio, budget variance, feedforward control, budgets and motivation
labs:
summary: The six budget ratios that split a shortfall into speed, hours and days; how to read a budget variance; and how feedback, feed-forward and well-set targets make budgetary control work.
---

## In plain words

### Fast cooks, short month

Ritu's monthly report on the Dewas samosa line lands on Kesar's desk.

> **Kesar:** Ten per cent fewer samosas than the budget. Who was sleeping?
> **Ritu:** Nobody. Power cuts took 2,000 of the 10,000 hours we planned to work. In the hours we did work, the cooks were faster than standard.
> **Kesar:** Faster, and still short?
> **Ritu:** Faster by 12.5%, short of hours by 20%. Per hour, please, Kesar-ji.

The line had budgeted 10,000 hours. It actually worked 8,000. In those 8,000 hours it made samosas that should take 9,000 hours at the standard speed: its output was worth 9,000 **standard hours**. Three comparisons tell the whole story:

- speed: 9,000 standard hours earned in 8,000 actual hours is 112.5%, the **efficiency ratio**;
- time: 8,000 of the 10,000 budgeted hours worked is 80%, the **capacity ratio**;
- output: 9,000 standard hours against the 10,000 budgeted is 90%, the **activity ratio**.

And 112.5% × 80% = 90%. These **control ratios** (ICAI's **budget ratios**) show how far actual performance is from the budget and why. A ratio of 100% or more is favourable; below 100%, unfavourable.

Next month the report shows oven maintenance ₹25,000 under budget, marked "favourable". Ritu is not pleased: the ovens were never serviced. A **budget variance** (actual against budget) means something only against the right yardstick and with its cause.

Two more questions decide whether all this helps. When is the comparison made: after the year, as a post-mortem (**feedback control**), or all through it, so the course can be corrected in time (**feed-forward control**)? And will the managers chase the targets at all? That depends on how the targets were set: **budgets and motivation**.

::: analogy A rain-hit cricket chase
The plan: 50 overs. Rain allows only 40: the capacity ratio is 80%. The batters score 270, a total a par side needs 45 overs for: in 40 overs that is 112.5% efficiency. Against the 50-over plan the side delivered 45 overs' worth: the activity ratio is 90%. Feedback is the post-match review; feed-forward is checking the required run rate every over and changing the batting order before the match is lost. And a target the team believes it can chase is the one it plays hardest for.
:::

::: key
Activity ratio = efficiency ratio × capacity ratio: output against budget is speed times time. A budget variance is read against a budget flexed to the actual activity, with its cause and its controllability. Control works best when actuals are compared during the period (feed-forward) against targets the managers accept as achievable.
:::

## How it works

### Four kinds of hours, one kind of day

Every control ratio compares two of these (the samosa line's figures are in the chart below; its full capacity could work 12,000 hours):

- **Maximum possible hours**: the hours the full capacity could work in the period (maximum employees × hours a day × days).
- **Budgeted hours**: the hours planned to be worked in the budget period. In ICAI's illustration they are the employees "actual working" (budgeted to work) × hours a day × days (SM 15.69).
- **Actual hours** worked.
- **Standard hours for actual output**: the output achieved × the standard time per unit ("standard hours earned").
- **Budgeted working days** against the **available (actual) working days**.

::: diagram The samosa line's hours
{"type": "plot", "h": 280, "x": [0.4, 4.6], "y": [0, 13000], "ylabel": "hours", "legend": "none",
 "xticks": [[1, "maximum"], [2, "budgeted"], [3, "actual"], [4, "standard"]],
 "yticks": [[0, "0"], [4000, "4,000"], [8000, "8,000"], [12000, "12,000"]],
 "series": [
  {"bars": true, "bw": 0.6, "values": true, "color": "mute", "pts": [[1, 12000, "12,000"]]},
  {"bars": true, "bw": 0.6, "values": true, "color": "a", "pts": [[2, 10000, "10,000"]]},
  {"bars": true, "bw": 0.6, "values": true, "color": "d", "pts": [[3, 8000, "8,000"]]},
  {"bars": true, "bw": 0.6, "values": true, "color": "g", "pts": [[4, 9000, "9,000"]]}
 ],
 "caption": "Maximum possible 12,000 (grey), budgeted 10,000 (blue), actual 8,000 (orange), standard hours for the actual output 9,000 (green). Efficiency = green ÷ orange = 112.5%; activity = green ÷ blue = 90%; capacity = orange ÷ blue = 80%; standard capacity usage = blue ÷ grey = 83.33%; actual capacity usage = orange ÷ grey = 66.67%."}
:::

### The six ratios ICAI lists

Budget ratios provide information about the performance level: the extent of deviation of actual performance from the budgeted performance, and whether it is favourable or unfavourable. If the ratio is 100% or more, the performance is considered favourable; below 100%, unfavourable (SM 15.67).

| Ratio | Compares | It answers |
|---|---|---|
| Efficiency | Standard hours ÷ actual hours | Were the hours worked productive? |
| Activity | Standard hours ÷ budgeted hours | Did output reach the budget? |
| Calendar | Available days ÷ budgeted days | Were the budgeted days available? |
| Standard capacity usage | Budgeted hours ÷ maximum hours | How much capacity did the budget plan to use? |
| Actual capacity usage | Actual hours ÷ maximum hours | How much capacity was used? |
| Actual usage of budgeted capacity | Actual hours ÷ budgeted hours | Were the budgeted hours worked? |

The last one is the ratio ICAI's MTPs call the **capacity ratio** or **capacity utilisation ratio** (actual hours ÷ budgeted hours). The formulas, each × 100, are in Formats and formulas.

### Speed times time

Because standard ÷ budgeted = (standard ÷ actual) × (actual ÷ budgeted), the activity ratio is always the product of the other two. The chapter's own MCQ puts it the other way round: the efficiency ratio is the activity ratio divided by the capacity ratio (SM 15.73, key at 15.83).

::: diagram Splitting the samosa line's activity ratio
{"type": "tree", "gapX": 40, "root": {"label": "Activity ratio\n90%", "color": "bad", "children": [{"label": "Efficiency ratio\n112.5%", "color": "ok"}, {"label": "Capacity ratio\n80%", "color": "bad"}]}, "caption": "Activity = efficiency × capacity: 112.5% × 80% = 90%. Green: favourable (100% or more); rose: unfavourable. The 10% shortfall in output came from lost hours, not slow work."}
:::

### Budget variances: reading the gap

A **budget variance** is the difference between the actual and the budgeted figure of an item. As in standard costing, a variance is **favourable** when it is profitable for the company (actual cost below budget, actual sales above budget) and **adverse** when it causes loss (SM 13.12). Four rules make it useful:

1. **Compare like with like.** A fixed budget operates on one level of activity; when actual activity differs from it, comparing actual performance with it is meaningless, and a poor or good performance may remain unnoticed (SM 15.20, 15.23). Flex the budget to the actual activity first: [[cma.bud.flexible|flexible budgets]].
2. **Favourable is not the same as efficient.** A favourable variance does not necessarily indicate efficient performance, because it might have been arrived at by not carrying out the expenses mentioned in the budget (SM 15.72–15.73, key at 15.83).
3. **Report by exception, both ways.** A budget report prepared on the principle of exception shows both favourable and unfavourable variances (SM 15.73, key at 15.83).
4. **Ask who could have controlled it.** Controllable variances can be controlled under normal operating conditions if a responsibility centre takes preventive measures and acts prudently; uncontrollable variances arise from conditions beyond its control. Responsibility centres are answerable for all adverse variances that could have been controlled; significant and persistent uncontrollable variances may call for a revision of the standard (SM 13.11–13.12).

::: diagram What happens to a budget variance
{"type": "tree", "gapX": 30, "root": {"label": "Variance against\nthe flexed budget", "children": [{"label": "Controllable", "children": [{"label": "Manager answers;\ncorrective action"}]}, {"label": "Uncontrollable", "children": [{"label": "Significant and\npersistent: revise"}]}]}, "caption": "Budgetary control fixes responsibility for failure to achieve the budget and revises the budget when circumstances change (SM 15.7); the controllable or uncontrollable split decides which applies (SM 13.11–13.12)."}
:::

### Feedback and feed-forward: when the comparison happens

There are two types of budgetary control system based on the timing of action (SM 15.9–15.10).

**Feedback control.** The actual results for the budgeted period are collected and compared with the budgeted figures. Variance identification is done **after the completion of the budget period**; the variances are reported, and on the report corrective actions are taken, responsibility is fixed and, based on experience, future targets are modified. It is an ==ex-post corrective control system==. It is common where the management information system (MIS) is not robust and data is obtained only after the books of account are finalised; it is less expensive to maintain but has limitations, and leaves the organisation on the looser side "in today's age of data warfare".

**Feed-forward control** is the opposite: an **ex-ante preventive** control mechanism. The budgets are set at the inception of the budgeted period and the actual results are **continuously monitored and compared**; the targets are kept as realistic as possible and are reviewed and reset if necessary. It requires a robust MIS supported by an integrated ERP system, so data is available as and when desired. It is very expensive, and beneficial where the business environment is dynamic and information gives an edge in competition.

::: diagram Premix sales: the same slip, caught at two moments
{"type": "plot", "h": 300, "x": [0, 12], "y": [0, 130], "xlabel": "month of the year", "ylabel": "cumulative sales (₹ crore)", "legend": "outside",
 "xticks": [[0, "0"], [3, "3"], [6, "6"], [9, "9"], [12, "12"]],
 "yticks": [[0, "0"], [30, "30"], [60, "60"], [90, "90"], [120, "120"]],
 "series": [
  {"label": "budget", "fn": "10*x", "color": "a"},
  {"label": "actual, feedback only", "pts": [[0, 0], [12, 102]], "color": "d", "dash": true},
  {"label": "actual, feed-forward", "pts": [[0, 0], [3, 25.5], [12, 120]], "color": "g"}
 ],
 "points": [{"x": 3, "y": 25.5, "color": "g"}, {"x": 12, "y": 102, "color": "d"}],
 "caption": "An illustration. Sales run 15% behind budget (blue) from the start. Under feedback control (orange, dashed) the gap is found only in the year-end report (orange dot), ₹18 crore short. Under feed-forward control (green) the month-3 comparison (green dot) catches it, and corrective action restores the budget by the year end."}
:::

### Budgets and motivation: targets people chase

Motivation is the driving force that converts efforts into results. A budget quantifies the desired results into targets, communicates them to executives at different levels and asks them to strive to achieve them; the behavioural side decides whether they will. A budgeting process should therefore have these considerations to make it motivating (SM 15.14–15.15):

1. **Performance measurement.** The budget is first communicated to all executives, so that everybody knows the performance expected of him or her; achievement of targets is then considered in measuring and evaluating the performance of executives individually and departmentally. Rewards such as promotion, increment, performance related pay and bonus may be appropriate motivation factors.
2. **Achievable targets.** Targets consider practical aspects such as the availability of resources and the realism of the figures: neither very easy nor too tough. An unrealistic target has a reverse impact and may demotivate the executives.
3. **Optimum utilisation of resources.** An easily achievable target may under-utilise resources such as the potential skills of executives, while some pressure forces innovative ways of getting things done; so a balanced approach takes resources up to their effort zone, beyond the comfort zone.
4. **Involvement in the budgeting process.** Budgets that involve executives from all departments capture the requirements of all users; participative budgeting motivates the executives and gives them a sense of ownership, and involvement at the planning stage makes them accept the targets. Involvement at every stage may distort the objective of the budget, so a balance is followed.

::: diagram Where a target sits (SM 15.15)
{"type": "layers", "layers": [{"label": "Unrealistic target", "note": "beyond the effort zone", "right": "demotivates"}, {"label": "Balanced target", "note": "past comfort, up to effort", "right": "optimum use"}, {"label": "Easy target", "note": "inside the comfort zone", "right": "under-utilises"}], "caption": "Top to bottom, from the hardest target to the easiest. ICAI's balance: neither very easy nor too tough, with resources used up to the effort zone, though beyond the comfort zone. Placing the unrealistic target beyond the effort zone is this lesson's reading."}
:::

## Formats and formulas

*Reproduce the six formulas and the report layout from memory.* (SM 15.68)

::: formula Efficiency ratio
$$\text{Efficiency ratio} = \frac{\text{Standard hours}}{\text{Actual hours}} \times 100$$
Standard hours = standard hours for the actual output (standard hours earned).
:::

::: formula Activity ratio
$$\text{Activity ratio} = \frac{\text{Standard hours}}{\text{Budgeted hours}} \times 100$$
:::

::: formula Calendar ratio
$$\text{Calendar ratio} = \frac{\text{Available working days}}{\text{Budgeted working days}} \times 100$$
:::

::: formula Standard capacity usage ratio
$$\frac{\text{Budgeted hours}}{\text{Maximum possible hours}} \times 100$$
Maximum possible hours in the budgeted period.
:::

::: formula Actual capacity usage ratio
$$\frac{\text{Actual hours worked}}{\text{Maximum possible hours}} \times 100$$
Maximum possible working hours in the period.
:::

::: formula Actual usage of budgeted capacity ratio (the capacity ratio)
$$\frac{\text{Actual working hours}}{\text{Budgeted hours}} \times 100$$
ICAI's MTPs call it the capacity ratio or capacity utilisation ratio.
:::

::: formula How three of them fit together
$$\text{Activity ratio} = \text{Efficiency ratio} \times \text{Capacity ratio} \qquad \text{Efficiency ratio} = \frac{\text{Activity ratio}}{\text{Capacity ratio}}$$
True whenever the capacity ratio is actual hours ÷ budgeted hours, because the actual hours cancel.
:::

### Which ratio from which data

| You are given | Find first | Then |
|---|---|---|
| Employees (or machines), hours a day, days | Maximum and budgeted hours | Both capacity usage ratios |
| Output and standard time (or rate) a unit | Standard hours | Efficiency and activity ratios |
| A capacity usage ratio | Hours = ratio × maximum hours (budgeted from the standard ratio, actual from the actual) | The other ratios |
| Two of efficiency, capacity and activity | The third: activity = efficiency × capacity | The missing hours from the ratio's definition |

::: definition Budget ratios
A ratio is a mathematical relationship between two or more related figures. Budget ratios provide information about the performance level, i.e., the extent of deviation of actual performance from the budgeted performance and whether the actual performance is favourable or unfavourable. (SM 15.67, 15.71)
:::

::: definition Controllable and uncontrollable variances
Controllable variances are those which can be controlled under normal operating conditions if a responsibility centre takes preventive measures and acts prudently. Uncontrollable variances are those which occur due to conditions beyond the control of a responsibility centre and cannot be controlled even though all preventive measures are in place. (SM 13.11–13.12)
:::

### The budget report

The layout of ICAI's own answer comparing a master budget, a flexible budget and actual results (SM 15.92):

| Particulars | Master budget (₹) | Flexible budget (₹) | Actual (₹) | Variance (₹) |
|---|---:|---:|---:|---:|
| Units | xxx | actual units | actual units | |
| Sales | xxx | xxx | xxx | xxx (F/A) |
| Variable costs, item by item | xxx | xxx | xxx | xxx (F/A) |
| Contribution | xxx | xxx | xxx | |
| Fixed overhead | xxx | xxx | xxx | xxx (F/A) |
| **Net profit** | **xxx** | **xxx** | **xxx** | **xxx (F/A)** |

The variance column compares actual with the flexible budget, not with the master budget.

## Worked examples

:::: example Diwali at the Ratlam namkeen lines: all six ratios
Tapri's namkeen factory at Ratlam measures its capacity in **line-hours** (one frying line running for one hour). For October 2026, the Diwali month, it gives you the following:

| Particulars | Data |
|---|---|
| Frying lines installed | 24 |
| Frying lines in the budget | 16 |
| Working hours | Two shifts of 8 hours a day |
| Budgeted working days | 25 |
| Working days available | 26 (one Sunday worked for Diwali orders) |
| Line-hours actually worked | 7,040 |
| Output | 2,00,640 trays; standard output 30 trays a line-hour |

**Required:**

(i) Calculate the efficiency, activity, calendar, standard capacity usage, actual capacity usage and actual usage of budgeted capacity ratios.

(ii) Kesar says output beat the budget "because the new temporary crews were fast". Use the ratios to say whether he is right, and comment on the month.

::: answer Show the working
**Working notes**

1. Maximum possible line-hours = 24 lines × 16 hours × 25 days = **9,600**.
2. Budgeted line-hours = 16 lines × 16 hours × 25 days = **6,400**.
3. Actual line-hours = **7,040** (given).
4. Standard line-hours for actual output = 2,00,640 trays ÷ 30 = **6,688**.
5. Budgeted working days = 25; available working days = 26.

**(i) Ratios**

| Ratio | Working | Result |
|---|---|---:|
| Efficiency | 6,688 ÷ 7,040 × 100 | 95% |
| Activity | 6,688 ÷ 6,400 × 100 | 104.5% |
| Calendar | 26 ÷ 25 × 100 | 104% |
| Standard capacity usage | 6,400 ÷ 9,600 × 100 | 66.67% |
| Actual capacity usage | 7,040 ÷ 9,600 × 100 | 73.33% |
| Actual usage of budgeted capacity | 7,040 ÷ 6,400 × 100 | 110% |

**(ii) Comment.** Activity = efficiency × capacity: 95% × 110% = 104.5%. Output was 4.5% above the budget (favourable), but Kesar is wrong about the reason. The efficiency ratio is 95% (unfavourable): each line-hour produced only 95% of the standard output, which points at the new temporary crews and should be investigated. The extra output came from time: 10% more line-hours than budgeted (favourable), helped by the extra working day (calendar ratio 104%). The budget planned to use only two-thirds of the installed capacity (66.67%); 73.33% was used.
:::
::::

:::: example Hosur packing unit: working backwards
Tapri's cold-chain packing unit at Hosur gives you this for March 2026 (four weeks):

| Particulars | Data |
|---|---|
| Working hours | 7½ hours a day, 6 days a week |
| Maximum capacity | 50 packers |
| Standard capacity usage ratio | 80% |
| Activity ratio | 105% |
| Efficiency ratio | 112% |

**Required:** Calculate (i) the budgeted hours, (ii) the standard hours for the actual output, (iii) the actual hours worked, (iv) the actual capacity usage ratio and (v) the actual usage of budgeted capacity ratio. (vi) State whether the output above budget came from speed or from hours.

::: answer Show the working
**Working note.** Maximum possible hours = 50 packers × 7.5 hours × 6 days × 4 weeks = **9,000 hours**.

**(i) Budgeted hours.** Standard capacity usage ratio = budgeted hours ÷ maximum possible hours × 100, so budgeted hours = 9,000 × 80% = **7,200 hours**.

**(ii) Standard hours.** Activity ratio = standard hours ÷ budgeted hours × 100, so standard hours = 7,200 × 105% = **7,560 hours**.

**(iii) Actual hours.** Efficiency ratio = standard hours ÷ actual hours × 100, so actual hours = 7,560 ÷ 112% = **6,750 hours**.

**(iv) Actual capacity usage ratio** = 6,750 ÷ 9,000 × 100 = **75%**.

**(v) Actual usage of budgeted capacity ratio** = 6,750 ÷ 7,200 × 100 = **93.75%**.

Check: 112% × 93.75% = 105%, the activity ratio.

**(vi)** From speed. The packers worked only 93.75% of the budgeted hours (unfavourable), but at 112% efficiency (favourable), so output reached 105% of the budget.
:::
::::

:::: example The pilot premix line: every cost over budget?
Tapri's pilot line for a new masala premix had this master budget and these actual results for June 2026. A late order from a hotel chain added 500 kg to the month.

| Particulars | Master budget | Actual |
|---|---:|---:|
| Output and sales (kg) | 5,000 | 5,500 |
| Sales (₹) | 10,00,000 | 10,78,000 |
| Direct material (₹) | 4,00,000 | 4,51,000 |
| Direct labour (₹) | 1,50,000 | 1,59,500 |
| Variable overheads (₹) | 1,00,000 | 1,15,500 |
| Fixed overheads (₹) | 1,20,000 | 1,26,000 |
| Marketing campaign, fixed (₹) | 50,000 | 10,000 |

The budget assumed ₹200 a kg for sales and ₹80, ₹30 and ₹20 a kg for material, labour and variable overheads. The launch campaign budgeted for June was postponed to August; the ₹10,000 spent in June was for its design. Kesar reads the comparison with the master budget, praises the sales team for ₹78,000 of extra sales and asks the production manager why every variable cost is over budget.

**Required:**

(i) Prepare a statement comparing the actual results with a flexible budget, and compute the variances.

(ii) Comment on Kesar's reading, on the marketing variance and on which variances an exception report should show.

::: answer Show the working
**(i) Flexible budget compared with actual, June 2026**

| Particulars | Master (5,000 kg) | Flexible (5,500 kg) | Actual (5,500 kg) | Variance |
|---|---:|---:|---:|---:|
| Sales | 10,00,000 | 11,00,000 | 10,78,000 | 22,000 A |
| Direct material | 4,00,000 | 4,40,000 | 4,51,000 | 11,000 A |
| Direct labour | 1,50,000 | 1,65,000 | 1,59,500 | 5,500 F |
| Variable overheads | 1,00,000 | 1,10,000 | 1,15,500 | 5,500 A |
| **Contribution** | **3,50,000** | **3,85,000** | **3,52,000** | **33,000 A** |
| Fixed overheads | 1,20,000 | 1,20,000 | 1,26,000 | 6,000 A |
| Marketing campaign | 50,000 | 50,000 | 10,000 | 40,000 F |
| **Net profit** | **1,80,000** | **2,15,000** | **2,16,000** | **1,000 F** |

The flexible budget applies the budgeted rates to the actual 5,500 kg: sales 5,500 × ₹200; material 5,500 × ₹80; labour 5,500 × ₹30; variable overheads 5,500 × ₹20. Fixed costs stay at the budget. (Flexing is simple here because the rates are given; separating fixed and semi-variable costs first is the method of [[cma.bud.flexible|flexible budgets]]. This example is about reading the variances.)

**(ii) Comments.**

1. *Kesar's reading.* Against the master budget every variable cost looks adverse (material ₹51,000, labour ₹9,500, variable overheads ₹15,500) only because 500 kg more were made: comparing actual performance with a fixed budget at a different level of activity is meaningless. At the actual level, material is ₹11,000 adverse (₹82 a kg against ₹80) and variable overheads ₹5,500 adverse (₹21 against ₹20), but labour is ₹5,500 **favourable** (₹29 against ₹30). Sales are ₹78,000 above the master budget but ₹22,000 below the flexible budget: the 5,500 kg sold at an average of ₹196 a kg against ₹200. The sales team earned the volume; it owes an explanation for the price.
2. *Marketing.* The ₹40,000 favourable variance arises because the campaign was not carried out in June, not from efficiency: the spending has moved to August, and the delay may cost sales. A favourable variance does not necessarily indicate efficient performance. Without it, the month's operations are ₹1,000 − ₹40,000 = **₹39,000 adverse**, although profit is ₹36,000 above the master budget.
3. *Exception report.* On the principle of exception, the report should show both the favourable and the unfavourable significant variances: the sales price shortfall (₹22,000 A), material (₹11,000 A) and the marketing deferral (₹40,000 F), each with its reason and the manager responsible.
:::
::::

## Under the hood

### The fixed overhead twins

Four of the ratios have a fixed overhead variance computed from the same hours (SM 13.40–13.41): the ratio says in percent what the variance says in rupees ([[cma.std.foh|fixed overhead variances]]):

| Ratio | Its variance (SR = standard fixed overhead rate per hour) |
|---|---|
| Activity: SH ÷ BH | Volume variance: SR × (SH − BH) |
| Efficiency: SH ÷ AH | Efficiency variance: SR × (SH − AH) |
| Capacity: AH ÷ BH | Capacity variance: SR × (AH − BH) |
| Calendar: days | Calendar variance: SR per day × (actual days − budgeted days) |

At ₹50 an hour on the samosa line's figures: volume ₹50,000 A = efficiency ₹50,000 F + capacity ₹1,00,000 A, just as 90% = 112.5% × 80%. When a calendar variance is computed, the capacity variance is revised to use the revised budgeted hours (SM 13.41).

### The efficiency ratio inside a labour budget

Labour budgets turn the idea round: the hours to be paid = standard hours for the budgeted output ÷ the target efficiency (productivity) ratio, plus any budgeted non-productive downtime. At 80% efficiency, 33,400 standard hours need 41,750 hours (SM 3.44); the chapter's Practical Problem 8 adds downtime of 20% of productive hours (SM 15.80–15.81). The wages budget is in [[cma.bud.functional|functional budgets]].

### Two names in the definitions

The Study Material's definitions name a **capacity usage ratio** (budgeted hours against the maximum possible hours, the formula's standard capacity usage ratio) and a **standard capacity employed ratio**, "the extent to which facilities were actually utilized during the budget period" (SM 15.68). The formula box has no ratio of that second name; use the six formula names in an answer.

## Exam angle

::: exam Where these topics appeared, May 2024 to September 2026
In the new-scheme documents read for this lesson, control ratios were asked in 10 documents, feedback and feed-forward control in 2, controllable and uncontrollable variances in 2, and budgets and motivation in none.

- **Ratios, descriptive.** Working backwards from two ratios: May 2024 Q1(c) (4 marks; actual usage of budgeted capacity 86% and efficiency 110%) and January 2026 Q5(b) (5 marks; actual capacity usage 65% and activity 125%). Capacity, activity and efficiency ratios for two products in a month of 22 working days: MTP Series II for September 2026 Q1(c) (4 marks).
- **Ratios, multiple choice, 2 marks.** Activity ratio from standard, budgeted and actual hours: MTP Series I for September 2024 MCQ 15 and MTP Series I for May 2026 MCQ 12. Efficiency from capacity utilisation and activity: MTP Series II for September 2024 MCQ 14. Standard hours from budgeted hours, capacity utilisation and efficiency: MTP Series II for January 2026 MCQ 11.
- **The efficiency (productivity) ratio inside a wages budget**: MTP Series I for September 2024 Q5(a), MTP Series II for January 2025 Q5(b), RTP January 2026 Q18, MTP Series I for September 2026 Q5(a) (an 85% target efficiency plus downtime of 15% of productive hours).
- **Feedback and feed-forward control**, "Discuss", 4 marks: May 2024 Q5(c); MTP Series II for May 2026 Q6(c) (an OR choice).
- **Controllable and uncontrollable variances**: two terms of a five-term definition question, September 2024 Q6(b); "Discuss", RTP September 2024 Q19(c).
- Old scheme: January 2021 Q5(b) (10 marks) asked capacity, efficiency and activity ratios with the fixed overhead variances; its budgeted hours were net of a 15% normal downtime.
:::

::: exam The traps ICAI set
- **Which employees make the budgeted hours?** In ICAI's illustration and in May 2024 Q1(c), budgeted hours are the "actual working" employees × hours × days; the maximum capacity employees give the maximum possible hours. Mixing them up swaps the two capacity ratios.
- **"Capacity ratio"** in the MTPs is actual hours ÷ budgeted hours (the Study Material's actual usage of budgeted capacity ratio), not budgeted ÷ maximum.
- **Normal downtime** reduces the budgeted hours before any ratio is taken (January 2021).
- **Two products**: standard hours are the sum over both products of output × standard hours a unit, and an annual budget of hours is divided by 12 for the month (MTP Series II for September 2026).
- **Feedback or feed-forward**: ICAI's suggested answer (May 2024) reproduces the Study Material's two paragraphs. Get its key phrases in: "after the completion of the budget period", "ex-post corrective", "continuously monitored", "ex-ante preventive", "robust MIS" and "ERP".
:::

::: trick E × C = A
**E**fficiency × **C**apacity = **A**ctivity: speed times time is output. Given any two, the third follows. Condition: the capacity ratio must be actual hours ÷ budgeted hours.
:::

## Answer frame

### "Discuss feedback and feed-forward control" (4 marks)

| Point | Feedback control | Feed-forward control |
|---|---|---|
| Timing | Variances identified after the completion of the budget period | Actual results continuously monitored and compared during the period |
| Nature | Ex-post corrective | Ex-ante preventive |
| Action | Corrective action, responsibility fixed, future targets modified | Targets kept realistic, reviewed and reset if necessary |
| Information needed | Data available only after finalisation of books; MIS not robust | Robust MIS supported by an integrated ERP system |
| Cost and fit | Less expensive, but leaves the organisation on the looser side | Very expensive; suits a dynamic business environment where information gives a competitive edge |

### "How can budgets motivate executives?"

The four considerations in ICAI's order, each with a line: performance measurement (communicated targets, achievement used in evaluation, rewards); achievable targets (neither very easy nor too tough; unrealistic targets demotivate); optimum utilisation of resources (beyond the comfort zone, up to the effort zone); involvement in the budgeting process (participative budgeting gives ownership; a balance, not involvement at every stage).

### The ratio numericals: three answers

::: cols
**Loses marks**

"Efficiency 95%, activity 104.5%, capacity 110%."

Bare figures; one wrong hours figure and nothing earns method marks.
---
**Passes**

Each ratio with its formula and figures, but the budgeted hours appear without the lines × hours × days working.

Correct, with the base of every ratio unexplained.
---
**Full marks**

Working notes for maximum, budgeted, actual and standard hours and for the days; each ratio with formula, figures and result (ICAI prints 109.375% in full, SM 15.69); a one-line check (efficiency × capacity = activity) and a comment marking each ratio favourable or unfavourable.
:::

## Common mistakes

::: mistake Hall of Shame: the activity ratio on actual hours
Dividing standard hours by actual hours and calling it activity. That is efficiency. **Fix:** activity compares output with the **budget**: standard hours ÷ budgeted hours. Check with E × C = A.
:::

::: mistake Maximum capacity used as the budget
Computing the Ratlam budgeted hours with all 24 installed lines: the standard capacity usage ratio becomes 100% and every other ratio shifts. **Fix:** the maximum capacity (installed lines, maximum employees) gives the maximum possible hours; the lines or employees budgeted to work ("actual working" in ICAI's data) give the budgeted hours.
:::

::: mistake The efficiency ratio upside down
With 9,750 actual hours and 10,000 standard hours, actual ÷ standard gives 97.5% where the answer is 102.56%, turning a good month bad. **Fix:** standard hours are always the numerator of the efficiency and activity ratios.
:::

::: mistake "Favourable, so well done"
A cost under budget praised without asking why. **Fix:** compare with the flexed budget, then ask the cause: an unspent campaign, skipped maintenance or a lower activity level is not efficiency.
:::

## Practice

::: quiz Check yourself
Q: A kulhad workshop budgeted 12,000 hours for a month. Its activity ratio was 99% and its efficiency ratio 110%. How many hours did it actually work?
= 10800
> Standard hours = 99% × 12,000 = 11,880. Efficiency = standard ÷ actual, so actual = 11,880 ÷ 110% = 10,800 hours (a capacity ratio of 90%).

Q: Case scenario. Tapri's app-delivery division changes its menu, prices and delivery zones every few weeks to fight BrewBucks. It has an integrated ERP system that gives daily data. Ritu must recommend a budgetary control system. Which recommendation is correct?
- [ ] Feedback control, because it is the less expensive system
- [ ] Feedback control, because variances are best identified after the budget period ends
- [x] Feed-forward control, because the environment is dynamic and a robust MIS is available to monitor actuals continuously
- [ ] Neither; budgets cannot be used in a dynamic business
> Feed-forward control is ex-ante preventive: actuals are monitored continuously and targets reset where necessary. It needs a robust MIS with an integrated ERP and suits a dynamic environment where information gives a competitive edge. Feedback is cheaper but acts only after the period.

Q: Ritu's June exception report for the premix pilot line lists the ₹11,000 adverse material variance but leaves out the ₹40,000 favourable marketing variance, "because it is good news". Is that right?
- [ ] Yes: a report on the principle of exception shows only the adverse variances
- [ ] Yes: a favourable variance always reflects efficient performance
- [ ] No: an exception report must list every variance, however small
- [x] No: significant favourable variances belong in the report too, and this one comes from a campaign that was not run
> A budget report on the principle of exception shows both favourable and unfavourable variances (SM 15.73, key at 15.83), and a favourable variance may come from expenses not carried out. "Exception" means the significant deviations, not every rupee.

Q: A plant worked 9,000 hours against 10,000 budgeted hours and produced output worth 9,450 standard hours. A trainee computes the activity ratio as 105%. What has he done, and what is the correct figure?
- [ ] Nothing wrong; 105% is the activity ratio
- [x] He divided by actual hours, which gives the efficiency ratio; the activity ratio is 94.5%
- [ ] He should have divided budgeted hours by standard hours: 105.82%
- [ ] He should have divided actual hours by budgeted hours: 90%
> 9,450 ÷ 9,000 = 105% is efficiency. Activity = 9,450 ÷ 10,000 = 94.5%; 90% is the capacity ratio. Check: 105% × 90% = 94.5%.

Q: Which of these are considerations ICAI lists for making a budgeting process motivating? Select all that apply.
- [x] Targets that are achievable, neither very easy nor too tough
- [x] Involvement of executives in the budgeting process
- [ ] Keeping the targets secret until the year end, so managers do not relax
- [x] Using the achievement of targets in measuring and evaluating performance
> ICAI's four: performance measurement, achievable targets, optimum utilisation of resources, involvement in the budgeting process (SM 15.15). The budget must first be communicated to all executives, so secret targets fail the first consideration.
:::

## Recap

- Efficiency = standard hours ÷ actual hours; activity = standard ÷ budgeted; calendar = available days ÷ budgeted days; all × 100.
- Standard capacity usage = budgeted ÷ maximum hours; actual capacity usage = actual ÷ maximum; actual usage of budgeted capacity (the capacity ratio) = actual ÷ budgeted.
- 100% or more is favourable; below 100%, unfavourable. Activity = efficiency × capacity.
- Budgeted hours come from the employees budgeted to work; maximum hours from maximum capacity; deduct normal downtime if given.
- Budget variances: compare with the flexed budget; favourable is not necessarily efficient; exception reports show both directions; controllable variances are the manager's to answer.
- Feedback: after the period, ex-post corrective, cheaper. Feed-forward: continuous, ex-ante preventive, needs robust MIS and ERP, suits dynamic businesses.
- Motivation: performance measurement, achievable targets, optimum utilisation of resources, involvement. (Rain cut the overs; the batters were fine.)

## Flashcards

Q:: Formula: efficiency ratio?
A:: Standard hours for actual output ÷ actual hours worked × 100.

Q:: Formula: activity ratio?
A:: Standard hours for actual output ÷ budgeted hours × 100.

Q:: Formula: calendar ratio?
A:: Available working days ÷ budgeted working days × 100.

Q:: Standard capacity usage ratio against actual capacity usage ratio?
A:: Standard: budgeted hours ÷ maximum possible hours in the budget period × 100. Actual: actual hours worked ÷ maximum possible working hours × 100.

Q:: Formula: actual usage of budgeted capacity ratio (the capacity ratio)?
A:: Actual working hours ÷ budgeted hours × 100.

Q:: How are the efficiency, activity and capacity ratios related?
A:: Activity ratio = efficiency ratio × capacity ratio; so efficiency = activity ÷ capacity (capacity ratio = actual ÷ budgeted hours).

Q:: When is a budget ratio favourable, per ICAI?
A:: When it is 100% or more; below 100% the performance is considered unfavourable.

Q:: A kulhad café's repairs cost is ₹25,000 under budget for the quarter because the planned servicing of its chai machines was put off. Does the favourable variance show efficient performance?
A:: No. A favourable variance does not necessarily indicate efficient performance: this one arises from not carrying out an expense provided in the budget, so it is a postponement, not a saving (SM 15.72–15.73).

Q:: The cold-chain fleet's fuel cost is 15% below budget, a significant deviation. Should it appear in a budget report prepared on the principle of exception?
A:: Yes. Such a report shows both favourable and unfavourable variances; "exception" does not mean adverse only (SM 15.73).

Q:: Define controllable and uncontrollable variances.
A:: Controllable: can be controlled under normal operating conditions if the responsibility centre takes preventive measures and acts prudently. Uncontrollable: arise from conditions beyond its control and cannot be controlled even with all preventive measures in place.

Q:: Feedback against feed-forward control, one line each?
A:: Feedback: actuals compared with budget after the completion of the budget period, then corrective action, responsibility fixed and future targets modified (ex-post corrective; less expensive). Feed-forward: actuals continuously monitored during the period and targets reviewed and reset if necessary (ex-ante preventive; needs a robust MIS with integrated ERP; very expensive; suits dynamic environments).

Q:: ICAI's four considerations that make budgeting motivating?
A:: Performance measurement; achievable targets; optimum utilisation of resources; involvement in the budgeting process.
