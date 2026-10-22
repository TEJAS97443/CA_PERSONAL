---
id: cma.emp.incentives
title: Time rate, piece rate and the Halsey and Rowan premium plans
minutes: 32
needs: cma.emp.payroll
tags: Halsey premium plan, Rowan premium plan, time rate, piece rate, premium bonus, effective hourly rate, efficiency rating
labs:
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

::::: example Three packers, four ways to pay
Tapri's packing line wants to replace day wages with a scheme that rewards output. Three packers worked a normal day of 8 hours and packed 160, 120 and 72 boxes respectively. Day wages are guaranteed at ₹90 an hour, and the standard output is 10 boxes an hour; the piece rate is set at the standard.

**Required:**

(i) Calculate the earnings of each packer under day wages, straight piece rate, the Halsey plan (50%) and the Rowan plan.

(ii) Calculate the labour cost per box for each packer, and the average labour cost per 100 boxes for the company, under each scheme.

(iii) Comment on the results.

:::: answer Show the working
**Working notes**

1. Piece rate = ₹90 ÷ 10 = **₹9 a box**. Day wages = 8 × ₹90 = **₹720**.
2. Time allowed = boxes ÷ 10: 16, 12 and 7.2 hours. Time saved: 8, 4 and nil hours (the third packer took longer than allowed, so his day wages are guaranteed under both premium plans).
3. Halsey bonus = 50% × time saved × ₹90: ₹360, ₹180, nil. Rowan bonus = (time saved ÷ time allowed) × ₹720: 8/16 × 720 = ₹360; 4/12 × 720 = ₹240; nil.

**(i) and (ii) Earnings (₹) and labour cost per box (₹)**

| Packer (boxes) | Day wages | Piece rate | Halsey | Rowan |
|---|---:|---:|---:|---:|
| First (160) | 720 / 4.50 | 1,440 / 9.00 | 1,080 / 6.75 | 1,080 / 6.75 |
| Second (120) | 720 / 6.00 | 1,080 / 9.00 | 900 / 7.50 | 960 / 8.00 |
| Third (72) | 720 / 10.00 | 648 / 9.00 | 720 / 10.00 | 720 / 10.00 |
| **Total (352 boxes)** | **2,160** | **3,168** | **2,700** | **2,760** |
| **Cost per 100 boxes** | **613.64** | **900.00** | **767.05** | **784.09** |

Cost per 100 boxes = total earnings ÷ 352 × 100.

::: diagram Labour cost per box against output in an 8-hour day
{"type": "plot", "h": 320, "x": [60, 200], "y": [0, 13], "clip": true,
 "xlabel": "boxes packed in 8 hours", "ylabel": "cost per box (₹)",
 "xticks": [60, 80, 100, 120, 140, 160, 180, 200], "yticks": [0, 3, 6, 9, 12],
 "series": [
  {"label": "day wages", "fn": "720/x", "color": "a"},
  {"label": "piece rate", "fn": "9", "color": "g"},
  {"label": "Halsey", "fn": "max(720/x, 4.5+360/x)", "color": "f"},
  {"label": "Rowan", "fn": "max(720/x, 1440/x-57600/x^2)", "color": "d"},
  {"pts": [[80, 0], [80, 9]], "color": "mute", "dash": true, "legend": false}],
 "points": [{"x": 80, "y": 9, "label": "standard output", "pos": "above"}],
 "caption": "All four schemes cost ₹9 a box at the standard output of 80 boxes. Above it, day wages (blue) are cheapest per box, piece rate (green) dearest, and the premium plans in between: Rowan (orange) above Halsey (violet) until 160 boxes, where the time taken is half the time allowed, and below it after. Below standard, the day-wage, Halsey and Rowan lines coincide (the guaranteed day wage), so each box is dearer under all but the piece rate."}
:::

**(iii) Comment.** At the standard output every scheme costs ₹9 a box. For the two fast packers the premium plans cost the company less per box than piece rate, because the saving is shared; the first packer, who took exactly half the time allowed, earns the same under Halsey and Rowan. The second, saving a third of the time allowed, earns more under Rowan, as moderate efficiency is rewarded better by Rowan. The slow packer earns ₹648 under straight piece rate but ₹720 under the premium plans, which guarantee day wages.
::::
:::::

:::: example The kulhad artisans: find the rate from the factory cost
Two artisans at Tapri's kulhad workshop each make a batch of 500 hand-painted Diwali cups from the same clay, at the same normal wage rate. The time allowed for a batch is 60 hours. Farhan, paid under the Rowan plan, takes 36 hours; Gita, paid under the Halsey plan (50%), takes 48 hours. Factory overheads are recovered at ₹40 per hour actually worked. The factory cost of Farhan's batch is ₹18,000 and of Gita's ₹19,020.

**Required:**

(i) Compute the normal rate of wages per hour.

(ii) Compute the cost of materials per batch.

(iii) Prepare a statement comparing the factory cost of the two batches.

::: answer Show the working
**Step 1.** Let X be the material cost and Y the normal wage rate per hour.

**Step 2. Farhan (Rowan):** wages 36Y; bonus = (60 − 36) ÷ 60 × 36 × Y = 14.4Y; overheads 36 × ₹40 = ₹1,440. So

X + 50.4Y = ₹18,000 − ₹1,440 = ₹16,560 ... (i)

**Step 3. Gita (Halsey):** wages 48Y; bonus = 50% × (60 − 48) × Y = 6Y; overheads 48 × ₹40 = ₹1,920. So

X + 54Y = ₹19,020 − ₹1,920 = ₹17,100 ... (ii)

**Step 4.** (ii) − (i): 3.6Y = ₹540, so **Y = ₹150 an hour**. From (i): X = ₹16,560 − 50.4 × ₹150 = **₹9,000**.

**(iii) Comparative statement of factory cost**

| Particulars | Farhan (₹) | Gita (₹) |
|---|---:|---:|
| Material cost | 9,000 | 9,000 |
| Direct wages (36 × ₹150; 48 × ₹150) | 5,400 | 7,200 |
| Bonus (14.4 × ₹150; 6 × ₹150) | 2,160 | 900 |
| Factory overheads (36 × ₹40; 48 × ₹40) | 1,440 | 1,920 |
| **Factory cost** | **18,000** | **19,020** |

Farhan's batch is ₹1,020 cheaper: he earns ₹7,560 against Gita's ₹8,100 for the same batch, and his 12 fewer hours also save ₹480 of overheads.
:::
::::

::::: example Kesar's 20% promise at the kulhad unit
Diwali demand for kulhads is up 30%, and Tapri's kulhad unit cannot hire more skilled potters. Kesar has promised its 20 potters that an incentive scheme will raise their average earnings by 20%. Ritu is choosing between the Halsey plan (50%) and the Rowan plan. Figures for October, the first month of extra effort:

| Particulars | |
|---|---:|
| Guaranteed hourly rate | ₹50 |
| Time per tray at the previous performance (take as time allowed) | 4 hours |
| Working days in the month | 26 |
| Working hours a day for each potter | 8 |
| Trays produced in October by the 20 potters | 1,300 |

**Required:**

(i) Calculate the effective hourly rate of earnings under each plan.

(ii) Calculate the increase in efficiency.

(iii) Calculate the saving in labour cost per tray under each plan.

(iv) Advise which plan keeps Kesar's promise.

:::: answer Show the working
**Working notes**

1. Hours worked = 20 potters × 26 days × 8 hours = **4,160 hours**; time wages = 4,160 × ₹50 = **₹2,08,000**.
2. Time allowed = 1,300 trays × 4 hours = **5,200 hours**; time saved = 5,200 − 4,160 = **1,040 hours**.
3. Halsey bonus = 50% × 1,040 × ₹50 = **₹26,000**; total wages ₹2,34,000.
4. Rowan bonus = 4,160 ÷ 5,200 × 1,040 × ₹50 = **₹41,600**; total wages ₹2,49,600.

**(i) Effective hourly rate**: Halsey ₹2,34,000 ÷ 4,160 = **₹56.25**; Rowan ₹2,49,600 ÷ 4,160 = **₹60.00**.

**(ii) Efficiency** = 5,200 ÷ 4,160 × 100 = **125%**: up by 25%.

**(iii) Labour cost per tray**

| Particulars | Time rate | Halsey | Rowan |
|---|---:|---:|---:|
| Cost per tray (₹) | 200.00 (4 × ₹50) | 180.00 (₹2,34,000 ÷ 1,300) | 192.00 (₹2,49,600 ÷ 1,300) |
| Saving per tray (₹) | — | 20.00 | 8.00 |

**(iv) Advice.** The promise needs total wages of ₹2,08,000 × 120% = ₹2,49,600. Halsey pays ₹2,34,000, a rise of only 12.5%; Rowan pays exactly ₹2,49,600, a rise of 20%. Ritu should adopt the **Rowan plan**: it keeps the promise and still saves ₹8 a tray. As the potters save 20% of the time allowed (less than 50%), Rowan was always going to pay more.
::::
:::::

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

"Rowan = 8 × 90 + 4/12 × 4 × 90 = ₹840."

Time saved × rate in place of time wages: wrong formula, no marks for method.
---
**Passes**

"Rowan = ₹960, Halsey = ₹900."

Right figures, but no time allowed, no time saved, no formula.
---
**Full marks**

Working notes for time allowed and time saved, each formula written once in symbols, figures substituted, results with units, and the comparison or advice the question asks for.
:::

## Common mistakes

::: mistake Hall of Shame: Rowan's bonus built on the time saved
Writing Rowan bonus = time saved ÷ time allowed × **time saved** × rate. For the second packer that gives 4/12 × 4 × ₹90 = ₹120 instead of ₹240. **Fix:** the fraction multiplies the **time wages**, time taken × rate.
:::

::: mistake The negative bonus
When time taken exceeds time allowed, deducting a "bonus" from day wages. **Fix:** premium plans guarantee day wages; with no time saved the bonus is nil (SM 3.28).
:::

::: mistake The effective rate on the wrong hours
Dividing total earnings by the time allowed. **Fix:** the effective hourly rate is earnings ÷ hours actually worked (₹1,080 ÷ 8 = ₹135 for the first packer).
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

Q: Case scenario. Tapri's new cold-chain unit has just set up a rate-setting cell staffed by trainees. Ritu wants an incentive scheme in which the workers do not get the entire gain of improved output, speed does not ruin quality, and a wrongly loose standard does not cost much. Which is correct?
- [ ] Straight piece rate, since it rewards output most directly
- [ ] Halsey plan, since the 50% share is easy to explain
- [x] Rowan plan, since its bonus peaks at half the time allowed and stays low under loose standards
- [ ] Straight time rate, since no standard needs to be set
> ICAI's answer to these three requirements is the Rowan scheme (SM 3.35–3.37). Piece rate passes the whole gain to the worker; Halsey keeps rewarding speed and pays more under loose standards; time rate gives no incentive at all.

Q: A worker saves 30% of the time allowed. Under which plan does she earn more?
- [x] Rowan
- [ ] Halsey
- [ ] Both pay the same
- [ ] Neither: she gets only time wages
> Time taken is 70% of time allowed, more than 50%, so Rowan pays more: her share of the saving is 70% against Halsey's 50%.

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
