---
id: cma.emp.incentives
title: Time rate, piece rate and the Halsey and Rowan premium plans
minutes: 32
needs: cma.emp.payroll
tags: Halsey premium plan, Rowan premium plan, time rate, piece rate, premium bonus, effective hourly rate, efficiency rating
labs: incentives
summary: Paying for time, for output, or for time plus a share of the time saved: the Halsey and Rowan formulas, which pays more when, and what each does to labour cost per unit.
---

## In plain words

### Shabnam finishes early

A lot of 400 premix boxes at Tapri's packing line is allowed 8 hours. Shabnam packs it in 6. She is paid ₹100 an hour.

> **Kesar:** She worked 6 hours, so she gets ₹600. Simple.
> **Ritu:** Then why would she ever hurry? Pay her by the box and she gets 8 hours' worth, ₹800, and we gain nothing from her speed.
> **Shabnam:** Somewhere in between would be fair, Sir.
> **Ritu:** That is what the premium plans do. Halsey gives her half the 2 hours saved: ₹700. Rowan gives her 2/8 of her time wages as bonus: ₹750.

Those are the four ideas of this lesson. A **time rate** pays for the hours, whatever the output. A **piece rate** pays for the output, whatever the hours. A **premium bonus** plan fixes a **time allowed** (standard time) for the job, guarantees the time wages, and shares the **time saved** between worker and employer. Under the **Halsey plan** the worker gets wages for half the time saved. Under the **Rowan plan** the bonus is the fraction of her time wages that the time saved is of the time allowed.

The two premium plans pay exactly the same when the job takes half the time allowed. If she saves less than that, Rowan pays more; if she saves more, Halsey pays more. Rowan's bonus is largest at that halfway point and then falls, so racing does not pay under it.

::: analogy The saved-time cake
Each time a worker beats the standard, she bakes a cake: the wages of the hours saved. Halsey always cuts it in half. Rowan gives her a slice the size of the share of the allowed time she actually worked: generous when she saves a little, stingy when she saves a lot. Under Rowan, the bigger the cake, the smaller her share of it.
:::

::: key
Premium plans guarantee time wages and share the time saved. Halsey: 50% of the time saved, at the time rate. Rowan: (time saved ÷ time allowed) × time wages. Equal when time taken is 50% of time allowed; Rowan pays more for moderate efficiency, Halsey for high efficiency.
:::

## How it works

### Six ways to pay, three to master

ICAI classifies wage systems under six heads (SM 3.27); the Study Material for January 2027 explains only the time rate, the piece rate and, under the premium bonus method, the Halsey and Rowan plans:

::: diagram Systems of wage payment and incentives
{"type": "layers", "layers": [
  {"label": "Time based", "note": "straight time rate", "right": "explained"},
  {"label": "Output based", "note": "straight piece rate", "right": "explained"},
  {"label": "Time and output combined", "note": "", "right": "named only"},
  {"label": "Premium bonus method", "note": "Halsey and Rowan plans", "right": "explained"},
  {"label": "Group bonus scheme", "note": "", "right": "named only"},
  {"label": "Incentives for indirect workers", "note": "", "right": "named only"}],
 "caption": "ICAI's six heads (SM 3.27). Only the time rate, the piece rate and the Halsey and Rowan premium plans are worked in this edition."}
:::

**Straight time rate** (SM 3.27–3.28): wages = time worked (including normal idle time) × rate for the time. It suits employees (i) whose services cannot be directly or tangibly measured, such as general helpers, supervisory and clerical staff; (ii) engaged in highly skilled jobs; (iii) where the pace of output is independent of the operator, as in automatic chemical plants.

**Straight piece rate** (SM 3.28): each operation, job or unit is a piece with a piece rate; wages = number of units produced × rate per unit, independent of the time taken.

**Premium bonus method** (SM 3.28): a standard time is set for the job. The worker is guaranteed his day wages (except in the Barth system) if his output is below or up to standard; if he finishes in less than the standard time, the time saved is shared between employee and employer.

### Halsey: half the saving

If there is no saving, the worker gets his day rate, even if he exceeds the standard time. If he saves time, he gets a bonus of 50% of the wages of the time saved; the employer keeps the other 50%. It is also called the Halsey fifty percent plan (SM 3.28).

| Halsey: advantages | Halsey: disadvantages |
|---|---|
| Time rate is guaranteed, with a chance to earn more by producing more | Incentive not as strong as piece rate: the harder he works, the less he gets per piece |
| Equitable: the employer gets a direct return for improving methods and equipment | The sharing principle may not be liked by employees |

### Rowan: a share that shrinks as the saving grows

The bonus is that proportion of the time wages which the time saved bears to the time allowed (SM 3.29).

| Rowan: advantages | Rowan: disadvantages |
|---|---|
| Fool-proof: a worker can never double his earnings, even with bad rate setting | A bit complicated |
| Encourages moderately efficient workers: better return for moderate efficiency than Halsey | Weak incentive at high production, where time saved is more than 50% of time allowed |
| The sharing principle appeals to the employer as equitable | The sharing principle is not generally welcomed by employees |

::: diagram Bonus on one lot: time allowed 8 hours, ₹100 an hour
{"type": "plot", "h": 300, "x": [0, 8], "y": [0, 450],
 "xlabel": "time taken (hours)", "ylabel": "bonus (₹)",
 "xticks": [0, 1, 2, 3, 4, 5, 6, 7, 8], "yticks": [0, 100, 200, 300, 400],
 "series": [
  {"label": "Halsey bonus", "fn": "50*(8-x)", "color": "a"},
  {"label": "Rowan bonus", "fn": "12.5*x*(8-x)", "color": "d"},
  {"pts": [[4, 0], [4, 200]], "color": "mute", "dash": true, "legend": false}],
 "points": [{"x": 4, "y": 200, "label": "equal at 4 h", "pos": "above"}, {"x": 6, "y": 150, "label": "Rowan ₹150", "pos": "right"}, {"x": 6, "y": 100, "label": "Halsey ₹100", "pos": "below"}],
 "caption": "Blue: Halsey bonus rises steadily as time taken falls. Orange: Rowan bonus is largest at 4 hours, half the time allowed, and falls on either side. Right of 4 hours (saving under 50%) Rowan pays more; left of it Halsey does. Shabnam's 6 hours are marked."}
:::

### Which plan pays more

ICAI proves it (SM 3.33, Illustration 9): Halsey bonus = 50% × (SH − AH) × R and Rowan bonus = (AH ÷ SH) × (SH − AH) × R, so ==the two are equal when the time taken is 50% of the time allowed==.

| Time taken (AH) compared with time allowed (SH) | Pays more |
|---|---|
| AH more than 50% of SH (time saved less than 50%) | Rowan |
| AH exactly 50% of SH | Equal |
| AH less than 50% of SH (time saved more than 50%) | Halsey |
| AH equal to or more than SH | Neither: time wages only, guaranteed |

::: lab incentives {}
Step through time rate, piece rate, Halsey and Rowan on one job, then the bonus and hourly-rate plots that show where the two premium plans meet.
:::

### Efficiency rating

**Efficiency** compares the time taken with the standard time: a worker taking no more than standard is efficient (SM 3.43). The procedure is: (1) determine standard time by time and motion or work study, for a heterogeneous group with contingency allowances; (2) record each worker's output and time taken; (3) compute the rating. It is needed where pay is by results, and for the employee requirement budget: Tapri's budget of 18,000 standard hours at an expected efficiency of 90% needs 18,000 ÷ 90% = 20,000 hours (SM 3.43–3.44, Example 1).

**Employee productivity** = standard time for doing actual work ÷ actual time taken. It improves by employing workers with the right skill, placing the right person in the right job, training young and old workers, avoiding excess or shortage of employees, and work study for fixing wages and simplifying and standardising work (SM 3.44–3.45).

## Formats and formulas

SH = time allowed (standard hours), AH = time taken (actual hours), R = time rate per hour.

::: formula Time rate and piece rate
$$\text{Wages} = \text{Time worked} \times \text{Rate} \qquad \text{Wages} = \text{Units} \times \text{Rate per unit}$$
(SM 3.28)
:::

::: formula Halsey premium plan
$$\text{Earnings} = AH \times R \qquad + 50\% \times (SH - AH) \times R$$
(SM 3.28)
:::

::: formula Rowan premium plan
$$\text{Earnings} = AH \times R \qquad + \frac{SH - AH}{SH} \times AH \times R$$
(SM 3.30)
:::

::: formula Effective hourly rate and cost per unit
$$\text{Effective rate} = \frac{\text{Total earnings}}{\text{Hours worked}} \qquad \text{Cost per unit} = \frac{\text{Total earnings}}{\text{Units}}$$
:::

::: formula Efficiency
$$\text{Efficiency (\%)} = \frac{\text{Time allowed}}{\text{Time taken}} \times 100$$
Time allowed = time allowed as per standard for the work done (SM 3.43).
:::

ICAI's comparative statement (RTP September 2026 Q6; the chapter's Practical Problem 2 gives the same figures scheme by scheme, SM 3.65–3.67). *Reproduce it from memory.*

| Method | Hours worked | Earnings (₹) | Units | Cost per unit (₹) |
|---|---:|---:|---:|---:|
| Time rate | xx | xxx | xx | x.xx |
| Piece rate | xx | xxx | xx | x.xx |
| Halsey | xx | xxx | xx | x.xx |
| Rowan | xx | xxx | xx | x.xx |

## Worked examples

::::: example One lot, three operators: what each scheme costs Tapri
A lot of 600 trays of samosas at Tapri's frying line is allowed 30 hours. Three operators, Rekha, Imran and Joseph, each fried one such lot in a week, taking 30, 24 and 12 hours. The time rate is ₹100 an hour, and the piece rate is set at the standard (20 trays an hour). Factory overheads are absorbed at ₹150 per hour worked.

**Required:**

(i) Calculate each operator's earnings and effective hourly rate under the time rate, the straight piece rate, the Halsey plan (50%) and the Rowan plan.

(ii) Calculate the conversion cost (wages plus overheads) per tray of each lot under each scheme.

(iii) Comment on the results from Tapri's point of view and from the operators'.

:::: answer Show the working
**Working notes**

1. Piece rate = ₹100 ÷ 20 = **₹5 a tray**; piece earnings = 600 × ₹5 = ₹3,000 for every operator.
2. Time saved = 30 − time taken: Rekha nil, Imran 6 hours, Joseph 18 hours.
3. Halsey bonus = 50% × time saved × ₹100: nil, ₹300, ₹900.
4. Rowan bonus = time saved ÷ time allowed × time wages: nil; 6/30 × ₹2,400 = ₹480; 18/30 × ₹1,200 = ₹720.

**(i) Earnings (₹) and effective hourly rate (₹)**

| Scheme | Rekha (30 h) | Imran (24 h) | Joseph (12 h) |
|---|---:|---:|---:|
| Time rate | 3,000 / 100.00 | 2,400 / 100.00 | 1,200 / 100.00 |
| Piece rate | 3,000 / 100.00 | 3,000 / 125.00 | 3,000 / 250.00 |
| Halsey | 3,000 / 100.00 | 2,700 / 112.50 | 2,100 / 175.00 |
| Rowan | 3,000 / 100.00 | 2,880 / 120.00 | 1,920 / 160.00 |

Effective hourly rate = earnings ÷ hours actually worked.

**(ii) Conversion cost per tray (₹)** = (earnings + hours × ₹150) ÷ 600

| Scheme | Rekha | Imran | Joseph |
|---|---:|---:|---:|
| Overheads (30, 24, 12 hours × ₹150) | 4,500 | 3,600 | 1,800 |
| Time rate | 12.50 | 10.00 | 5.00 |
| Piece rate | 12.50 | 11.00 | 8.00 |
| Halsey | 12.50 | 10.50 | 6.50 |
| Rowan | 12.50 | 10.80 | 6.20 |

::: diagram Conversion cost per tray against time taken for the lot
{"type": "plot", "h": 320, "x": [10, 30], "y": [0, 14], "legend": "outside",
 "xlabel": "time taken for the lot (hours)", "ylabel": "cost per tray (₹)",
 "xticks": [10, 12, 15, 18, 21, 24, 27, 30], "yticks": [0, 2, 4, 6, 8, 10, 12, 14],
 "series": [
  {"label": "time rate", "fn": "250*x/600", "color": "a"},
  {"label": "piece rate", "fn": "(3000+150*x)/600", "color": "g"},
  {"label": "Halsey", "fn": "(1500+200*x)/600", "color": "f"},
  {"label": "Rowan", "fn": "(250*x+(30-x)*100*x/30)/600", "color": "d"}],
 "caption": "All four schemes cost ₹12.50 a tray when the lot takes the 30 hours allowed. The quicker the lot, the cheaper each tray under every scheme, because overheads are absorbed per hour. Piece rate (green) passes the whole saving in wages to the operator; the premium plans share it; Rowan (orange) costs more than Halsey (violet) above 15 hours and less below it."}
:::

**(iii) Comment.** For Tapri every quick lot is cheaper, whichever scheme is used, because each hour saved also saves ₹150 of overheads: Joseph's lot costs ₹6.20 to ₹8.00 a tray against Rekha's ₹12.50. The time rate looks cheapest, but it gives the operators no reason to be quick: Joseph earns only ₹1,200 for the fastest lot. Piece rate gives the operators the entire gain in wages and is the dearest scheme for quick lots. The premium plans share the gain. Imran, who took 80% of the time allowed, earns more under Rowan (₹2,880) than under Halsey (₹2,700); Joseph, who took 40%, earns more under Halsey (₹2,100) than under Rowan (₹1,920), since the two plans pay the same only when the time taken is half the time allowed.
::::
:::::

::: lab incentives {"units":1,"std":8,"taken":4,"rate":8}
Here is Study Material Illustration 9, 8 hours allowed and 4 taken: step to its statement frame to see ICAI's rows of time taken.
:::

:::: example Two jobs, one painter: find the rates from the cost records
Gita, a painter at Tapri's kulhad workshop, is paid under the Rowan plan. Her job cards show only the time allowed, the time taken and the conversion cost (her wages plus factory overheads, which are absorbed at a rate per hour actually worked):

| Job | Time allowed | Time taken | Conversion cost (₹) |
|---|---:|---:|---:|
| P: 400 festival kulhads | 10 hours | 8 hours | 1,792 |
| Q: 1,000 corporate kulhads | 20 hours | 12 hours | 2,976 |

**Required:**

(i) Compute Gita's normal wage rate per hour and the overhead absorption rate per hour.

(ii) Prepare a statement of the conversion cost of each job under the Rowan plan and as it would have been under the Halsey plan (50%), and comment.

::: answer Show the working
**Step 1.** Let R be the wage rate per hour and H the overhead rate per hour.

**Step 2. Job P:** wages = 8R + (10 − 8) ÷ 10 × 8R = 8R + 1.6R = 9.6R; overheads = 8H. So

9.6R + 8H = ₹1,792 ... (i)

**Step 3. Job Q:** wages = 12R + (20 − 12) ÷ 20 × 12R = 12R + 4.8R = 16.8R; overheads = 12H. So

16.8R + 12H = ₹2,976 ... (ii)

**Step 4.** (i) × 1.5 gives 14.4R + 12H = ₹2,688. Subtracting from (ii): 2.4R = ₹288, so **R = ₹120 an hour**. From (i): 8H = ₹1,792 − 9.6 × ₹120 = ₹640, so **H = ₹80 an hour**.

**(ii) Statement of conversion cost**

| Particulars | Job P, Rowan (₹) | Job P, Halsey (₹) | Job Q, Rowan (₹) | Job Q, Halsey (₹) |
|---|---:|---:|---:|---:|
| Time wages (8 or 12 hours × ₹120) | 960 | 960 | 1,440 | 1,440 |
| Bonus | 192 | 120 | 576 | 480 |
| Overheads (8 or 12 hours × ₹80) | 640 | 640 | 960 | 960 |
| **Conversion cost** | **1,792** | **1,720** | **2,976** | **2,880** |

Bonus: Rowan 2/10 × ₹960 and 8/20 × ₹1,440; Halsey 50% × 2 × ₹120 and 50% × 8 × ₹120.

**Comment.** Gita took 80% and 60% of the time allowed, more than half in both jobs, so the Rowan plan pays her more than Halsey would: ₹72 more on Job P and ₹96 more on Job Q. Overheads are the same under both plans, because they depend on the hours worked, not on the plan.
:::
::::

:::: example Kesar's 20% promise: how many trays does each plan need?
Tapri's kulhad potters work 48 hours a week at a guaranteed ₹60 an hour. At their previous performance a tray of kulhads took 4 hours, and this is taken as the time allowed. To meet Diwali demand Kesar has promised that an incentive scheme will raise each potter's weekly earnings by 20%. Ritu must choose between the Halsey plan (50%) and the Rowan plan.

**Required:**

(i) Calculate the minimum number of trays a potter must make in a week for each plan to deliver the promised 20% rise.

(ii) Ritu expects 16 trays a potter a week. At that output, calculate each plan's weekly earnings and effective hourly rate, the potter's efficiency, and the labour cost per tray, and advise which plan keeps the promise.

(iii) At what weekly output would the two plans pay the same?

::: answer Show the working
**Working note.** Weekly time wages = 48 × ₹60 = **₹2,880**; the promise needs **₹3,456** (₹2,880 × 120%). Let SH be the time allowed for the week's output (trays × 4 hours).

**(i) Minimum output**

| Plan | Condition for a 20% rise | Time allowed needed | Trays needed |
|---|---|---:|---:|
| Halsey | 50% × (SH − 48) × ₹60 ≥ 20% × ₹2,880, so SH − 48 ≥ 19.2 | 67.2 hours | 16.8, so **17** |
| Rowan | (SH − 48) ÷ SH ≥ 20%, so SH ≥ 48 ÷ 0.8 | 60 hours | **15** |

Under Rowan the bonus is (SH − 48) ÷ SH × time wages, so a 20% rise needs time saved of 20% of the time allowed.

**(ii) At 16 trays a week** (time allowed 64 hours, time saved 16 hours)

| Particulars | Halsey | Rowan |
|---|---:|---:|
| Time wages (₹) | 2,880 | 2,880 |
| Bonus (₹): 50% × 16 × ₹60; 16/64 × ₹2,880 | 480 | 720 |
| **Weekly earnings (₹)** | **3,360** | **3,600** |
| Rise over time wages | 16.67% | 25.00% |
| Effective hourly rate (₹): ÷ 48 hours | 70.00 | 75.00 |
| Labour cost per tray (₹): ÷ 16 | 210.00 | 225.00 |
| Saving per tray against ₹240 (4 hours × ₹60) (₹) | 30.00 | 15.00 |

Efficiency = time allowed ÷ time taken × 100 = 64 ÷ 48 × 100 = **133.33%**.

**Advice.** At the expected 16 trays only the Rowan plan keeps Kesar's promise (a rise of 25%); Halsey gives 16.67% and would need 17 trays. Ritu should adopt the **Rowan plan**: it meets the promise from 15 trays a week and still saves Tapri ₹15 a tray. Halsey would cost Tapri less, but it breaks the promise.

**(iii)** The plans pay the same when the time taken is 50% of the time allowed: SH = 96 hours, that is **24 trays** a week (efficiency 200%). Below that output Rowan pays more; above it Halsey does.
:::
::::

## Under the hood

### Why Rowan can never double the wage

Rowan's hourly earnings are R × (1 + time saved ÷ time allowed), and time saved is always less than time allowed, so the hourly rate stays below 2R. Halsey's hourly rate has no such ceiling.

::: diagram Effective earnings per hour: time allowed 8 hours, ₹100 an hour
{"type": "plot", "h": 300, "x": [1, 8], "y": [0, 450], "clip": true,
 "xlabel": "time taken (hours)", "ylabel": "earnings per hour (₹)",
 "xticks": [1, 2, 3, 4, 5, 6, 7, 8], "yticks": [0, 100, 200, 300, 400],
 "series": [
  {"label": "Halsey", "fn": "50+400/x", "color": "a"},
  {"label": "Rowan", "fn": "200-12.5*x", "color": "d"},
  {"label": "time rate", "fn": "100", "color": "mute", "dash": true}],
 "caption": "Blue: Halsey's rate climbs without limit as the job gets quicker. Orange: Rowan's rate rises in a straight line towards ₹200, twice the time rate, and never reaches it. The lines cross at 4 hours. The SM's table for 8 hours at ₹8 shows the same pattern (SM 3.34)."}
:::

### The suitable scheme for a new rate-setting department

ICAI's answer (SM 3.35–3.37, Illustration 11; asked in January 2026 Q6(b)) recommends Rowan, for three reasons, each shown with figures. Take time allowed 6 hours at ₹100:

1. **Gains not wholly passed on.** Taking 4.5 hours saves ₹150 of wages; the Rowan bonus is 4.5/6 × 1.5 × ₹100 = ₹112.50 (75%); the employer keeps ₹37.50.
2. **Quality protected.** The bonus is greatest at 3 hours, half the time allowed (₹150); rushing to 2 hours cuts it to ₹133.33, so racing does not pay.
3. **Loose standards.** If 12 hours is wrongly set instead of 6, the 4.5-hour worker gets 4.5/12 × 7.5 × ₹100 = ₹281.25 under Rowan, against ₹375 under Halsey: a mistake in rate setting costs less.

### Wording to watch

"Add 50% to time" (RTP September 2026 Q6) inflates the time allowed before the plans are applied. Time taken from clock times counts working hours only: 9 a.m. on 1 June to 12 noon on 4 June, with 9-hour days, is 9 + 9 + 9 + 3 = 30 hours (January 2026 Q1(c)).

## Exam angle

::: exam Where these plans appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, the Halsey and Rowan plans were examined in 10 questions.

- **Numerical, 4–7 marks.** Earnings under both plans and which suits the worker: January 2025 Q2(b) (5 marks). Remuneration with time taken from clock times: January 2026 Q1(c) (4 marks). Effective hourly rates, increase in efficiency, saving in labour cost per unit and advice against a promised 15% rise for 128 workers: May 2025 Q2(b) (7 marks). Normal wage rate and material cost from equal factory costs: September 2025 Q2(b) (5 marks). Time rate, piece work, Rowan and Halsey for one operator, with a comparative statement: RTP September 2026 Q6.
- **Theory, 5 marks.** A suitable incentive scheme for a factory whose rate-setting department is new: January 2026 Q6(b).
- **Multiple choice, 2 marks.** Equal total earnings under Rowan and Halsey, find one worker's rate: September 2024 MCQ 13. Case scenario on replacing overtime with a Rowan scheme: MTP September 2024 Series I.
:::

::: exam The traps ICAI set
- "Time saved" is SH − AH; Rowan multiplies time saved ÷ **time allowed** by **time wages** (AH × R), not by time saved × R.
- The promise test (May 2025 Q2(b)): compare total wages under each plan with present earnings × 1.15; only the plan that meets it is advisable.
- Efficiency is time allowed ÷ time taken (122.07% in May 2025 Q2(b)), not the other way round.
- Round only at the end: ICAI shows ₹1,38,854.40 and ₹35.424 an hour in full.
:::

::: trick The 50% line
Work out AH ÷ SH first. Above 50%: Rowan pays more. Exactly 50%: equal, and Rowan's bonus is at its maximum. Below 50%: Halsey pays more. Conditions: same rate and same standard for both plans, and Halsey at 50%.
:::

## Answer frame

### "Describe how wages are calculated under the Rowan and Halsey systems"

For each plan: the standard time and the guarantee; the bonus rule in ICAI's words; the formula; a two-line example; and one advantage and one disadvantage.

### "Distinguish between the Halsey and Rowan plans"

| Point | Halsey | Rowan |
|---|---|---|
| Bonus | 50% of time saved × rate | Time saved ÷ time allowed × time wages |
| Worker's share of the saving | Fixed at 50% | Equals AH ÷ SH: falls as the saving grows |
| Highest bonus | Keeps rising with time saved | At time taken = 50% of time allowed |
| Earnings can double? | Yes: hourly earnings reach twice the rate once time taken is a third of time allowed or less (loose standards) | Never, even with bad rate setting (SM 3.30) |
| Better for | Highly efficient workers (saving above 50%) | Moderately efficient workers (saving below 50%) |
| Simplicity | Simple | A bit complicated |

### "When is the time rate system preferred?"

ICAI's three cases (SM 3.27): services that cannot be directly or tangibly measured (helpers, supervisory and clerical staff); highly skilled jobs; output whose pace is independent of the operator (automatic chemical plants).

### The numerical: three answers to the same question

::: cols
**Loses marks**

"Rowan (Imran) = 24 × 100 + 6/30 × 6 × 100 = ₹2,520."

Time saved × rate in place of time wages: wrong formula, no marks for method.
---
**Passes**

"Rowan = ₹2,880, Halsey = ₹2,700."

Right figures, but no time allowed, no time saved, no formula.
---
**Full marks**

Working notes for time allowed and time saved, each formula written once in symbols, figures substituted, results with units, and the comparison or advice the question asks for.
:::

## Common mistakes

::: mistake Hall of Shame: Rowan's bonus built on the time saved
Writing Rowan bonus = time saved ÷ time allowed × **time saved** × rate. For Imran that gives 6/30 × 6 × ₹100 = ₹120 instead of ₹480. **Fix:** the fraction multiplies the **time wages**, time taken × rate.
:::

::: mistake The negative bonus
When time taken exceeds time allowed, deducting a "bonus" from day wages. **Fix:** premium plans guarantee day wages; with no time saved the bonus is nil (SM 3.28).
:::

::: mistake The effective rate on the wrong hours
Dividing total earnings by the time allowed. **Fix:** the effective hourly rate is earnings ÷ hours actually worked (Joseph under Halsey: ₹2,100 ÷ 12 = ₹175, not ÷ 30 = ₹70).
:::

::: mistake Calendar hours for a clock-time question
Counting 1 June 9 a.m. to 4 June noon as 75 hours. **Fix:** count only working hours in each day.
:::

## Practice

::: quiz Check yourself
Q: Time allowed 10 hours, time taken 6 hours, rate ₹80 an hour. What are the earnings under the Rowan plan, in rupees?
= 672
> Time wages = 6 × ₹80 = ₹480; bonus = 4/10 × ₹480 = ₹192; earnings ₹672. Using time saved instead of time taken gives 4/10 × 4 × 80 = ₹128 and ₹608.

Q: Time allowed 10 hours, time taken 4 hours, rate ₹80 an hour. What is the effective hourly rate under the Halsey plan (50%), in rupees?
= 140
> Earnings = 4 × 80 + 50% × 6 × 80 = ₹320 + ₹240 = ₹560; ₹560 ÷ 4 hours = ₹140 an hour. Rowan would give 320 + 6/10 × 320 = ₹512, less, because time taken is below 50% of time allowed.

Q: Case scenario. Tapri's cold-chain unit discovers that its new standard for a packing job is 12 hours, though the job really needs about 8. An operator paid ₹90 an hour finishes it in 4 hours. Under which plan does the loose standard cost Tapri less, and what does the operator earn under it?
- [ ] Halsey: ₹720
- [x] Rowan: ₹600
- [ ] Rowan: ₹720
- [ ] Both plans: ₹600
> Halsey: 4 × ₹90 + 50% × 8 × ₹90 = ₹720. Rowan: 4 × ₹90 + 8/12 × 4 × ₹90 = ₹360 + ₹240 = ₹600. Rowan's bonus is a fraction of time wages and the hourly earnings can never reach twice the rate, so a mistake in rate setting costs less under it (SM 3.30).

Q: Salma is on the Rowan plan and usually takes 75% of the time allowed. Tapri offers her a switch to the Halsey plan (50%), and she plans to speed up to 40% of the time allowed. Which statement is correct?
- [ ] Rowan pays her more both now and after she speeds up
- [ ] Halsey pays her more both now and after she speeds up
- [x] Rowan pays her more now; Halsey would pay her more after she speeds up
- [ ] Both plans pay her the same, because her rate does not change
> The plans pay the same when the time taken is 50% of the time allowed. At 75% (time saved 25%) her Rowan share of the saving is 75% against Halsey's 50%; at 40% (time saved 60%) her Rowan share falls to 40%, so Halsey pays more.

Q: A worker's output needs 36 standard hours and she took 40 hours. What is her efficiency, in per cent?
= 90
> Efficiency = time allowed as per standard ÷ time taken × 100 = 36 ÷ 40 × 100 = 90%. Inverting it gives 111.11%.
:::

## Recap

- Time rate: time worked × rate; for unmeasurable services, highly skilled jobs, operator-independent output.
- Piece rate: units × rate per unit, independent of time.
- Premium plans: standard time set, time wages guaranteed, time saved shared.
- Halsey: AH × R + 50% × (SH − AH) × R.
- Rowan: AH × R + (SH − AH) ÷ SH × AH × R; the worker can never double his earnings.
- Equal when AH = 50% of SH; Rowan more above it (moderate efficiency), Halsey more below it. Rowan's bonus is greatest at 50%.
- Efficiency % = time allowed ÷ time taken × 100. (Halsey halves the cake; Rowan slices it by time worked.)

## Flashcards

Q:: Formula: earnings under the Halsey premium plan?
A:: Time taken × time rate + 50% of time saved × time rate.

Q:: Formula: earnings under the Rowan premium plan?
A:: Time taken × rate per hour + (time saved ÷ time allowed) × time taken × rate per hour.

Q:: When do the Halsey (50%) and Rowan plans give the same bonus?
A:: When the actual time taken is 50% of the time allowed.

Q:: Time allowed 20 hours, time taken 15 hours, same hourly rate: which pays the worker more, the Halsey plan (50%) or the Rowan plan?
A:: Rowan. Time taken is 75% of time allowed (more than 50%), so Rowan pays 75% of the time saved against Halsey's 50%: bonus 3.75 hours' wages against 2.5 (SM 3.33).

Q:: At what time taken is the Rowan bonus at its maximum?
A:: When the time taken is half the time allowed.

Q:: Three cases where the time rate system is suitable?
A:: Services that cannot be directly or tangibly measured (helpers, supervisory and clerical staff); highly skilled jobs; where the pace of output is independent of the operator (automatic chemical plants).

Q:: Two advantages and two disadvantages of the Halsey plan?
A:: Advantages: time rate guaranteed with a chance to earn more; equitable, as the employer gains from better methods and equipment. Disadvantages: incentive weaker than piece rate; the sharing principle may not be liked by employees.

Q:: Three advantages of the Rowan plan?
A:: Fool-proof: a worker can never double his earnings even with bad rate setting; suits moderately efficient workers better than Halsey; the sharing principle appeals to the employer as equitable.

Q:: Two disadvantages of the Rowan plan beyond its sharing principle?
A:: It is a bit complicated; the incentive is weak at high production where time saved exceeds 50% of time allowed.

Q:: Formula: efficiency rating in per cent?
A:: Time allowed as per standard ÷ time taken × 100.

Q:: Premium bonus method: what is guaranteed and what is shared?
A:: Day wages are guaranteed (except in the Barth system) when output is below or up to standard; the time saved is shared between employee and employer.
