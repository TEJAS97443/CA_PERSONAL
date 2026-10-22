---
id: cma.emp.turnover
title: Employee turnover: measurement, causes, effects and cost
minutes: 30
needs: cma.emp.payroll, cma.mc.basics
tags: employee turnover, labour turnover, separation method, replacement method, flux method, accessions, profit forgone, preventive and replacement costs
labs: incentives
summary: How fast a workforce changes, measured three ways; why people leave; what it does to cost; and how to compute the profit forgone because of it.
---

## In plain words

### The baristas who went to BrewBucks

BrewBucks opened in Pune last spring, and Tapri's kulhad cafés started losing baristas. By March, 60 of them had left.

> **Kesar:** People come, people go. Hire 60 more. Sab adjust ho jayega.
> **Ritu:** Each one who leaves costs us twice. While the post is empty, the counter sells less tea. When the new barista comes, we pay for recruiting and training, and for a month she is slow and breaks kulhads.
> **Kesar:** How bad is it, in one number?
> **Ritu:** Sixty left out of an average of 500 on the rolls: a separation rate of 12% for the year.

That number is the **employee (labour) turnover**: the rate at which the composition of the workforce changes. ICAI measures it three ways, always against the **average number of employees on roll**: by the people who **left** (separation method), by the people **hired to fill their places** (replacement method), or by both together (flux method). Hiring for expansion is not replacement: a new café's staff did not take anyone's place.

People leave for **personal** reasons (a better job, health, family), for **unavoidable** reasons (the business is seasonal, the plant moves, discipline), and for **avoidable** reasons that management can fix (poor pay, poor conditions, a bad supervisor, no training or promotion). High turnover raises the cost of production; its cost is the **contribution lost** on the hours that could not be worked, plus the money spent on settling, recruiting and training.

::: analogy The railway coach
A Mumbai local stops at a station. The passengers who get off are the separations. Those who board to take their seats are the replacements. If the railway adds a new coach, the people who fill it are new joinings, not replacements. Turnover measures the churn in the existing coaches; adding a coach is growth.
:::

::: key
Turnover = movement out, in, or both, divided by the average number on roll. It costs the contribution on the productive hours lost plus the costs of leaving, hiring and training; preventive spending is worth it up to the optimum level of turnover.
:::

## How it works

### One measure, three ways

ICAI defines employee turnover as ==the rate of change in the composition of employee force during a specified period measured against a suitable index==. The index or norm may be the usual turnover in the industry or locality, or the firm's own rate for a past period (SM 3.45). The three methods (SM 3.45–3.46):

1. **Replacement method**: employees actually replaced ÷ average number on roll × 100. New employees appointed for expansion are not replacements.
2. **Separation method**: employees separated (resigned, retired, discharged) ÷ average number on roll × 100.
3. **Flux method**: separations plus replacements ÷ average number on roll × 100.

**New recruitment.** Recruits for expansion are generally left out, but since they too change the composition of the workforce, some management accountants include them. All workers joining, including replacements, are **accessions**, and the flux rate may then be (separations + replacements + new joinings) ÷ average, or (separations + accessions) ÷ average (SM 3.46).

The **average number on roll** = (number at the beginning + number at the end) ÷ 2. A rate for a period shorter than a year is converted to an **equivalent annual rate**: rate for the period × 365 ÷ days in the period; for a quarter ICAI multiplies by 4 (SM 3.46–3.48).

Tapri's cafés over the year, with the figures from the story:

::: diagram Tapri's café staff: who left, who replaced, who was added
{"type": "flow", "w": 420, "nodes": [
  {"id": "a", "kind": "start", "label": "On roll, 1 April: 480"},
  {"id": "s", "kind": "process", "label": "Separations: 60 left"},
  {"id": "r", "kind": "process", "label": "Replacements: 45 hired"},
  {"id": "n", "kind": "process", "label": "New joinings: 55 (new cafés)"},
  {"id": "z", "kind": "end", "label": "On roll, 31 March: 520"}],
 "edges": [["a", "s", "− 60"], ["s", "r", "+ 45"], ["r", "n", "+ 55"], ["n", "z"]],
 "caption": "480 − 60 + 45 + 55 = 520; average on roll (480 + 520) ÷ 2 = 500. Accessions = 45 + 55 = 100."}
:::

| Method | Working | Rate |
|---|---|---:|
| Separation | 60 ÷ 500 × 100 | 12% |
| Replacement | 45 ÷ 500 × 100 | 9% |
| Flux (separations + replacements) | (60 + 45) ÷ 500 × 100 | 21% |
| Flux with accessions | (60 + 100) ÷ 500 × 100 | 32% |

::: lab incentives {"mode":"turnover"}
Step through it yourself: the average on roll comes first, then each rate, then its equivalent annual rate.
:::

### Why they leave

ICAI groups the causes under three heads (SM 3.48–3.49):

::: diagram Causes of employee turnover
{"type": "tree", "root": {"label": "Causes of\nturnover", "children": [
  {"label": "Personal\nown choice", "color": "a"},
  {"label": "Unavoidable\nmust ask", "color": "mute"},
  {"label": "Avoidable\ncan be fixed", "color": "bad"}]},
 "caption": "Blue: personal; grey: unavoidable; rose: avoidable, the head that needs management's continuous attention (SM 3.48–3.49)."}
:::

**(a) Personal causes**: personal reasons which induce or compel an employee to leave:

1. Change of jobs for betterment.
2. Premature retirement due to ill health or old age.
3. Domestic problems and family responsibilities.
4. Discontent over the jobs and working environment.

**(b) Unavoidable causes**: management is obliged to ask one or more employees to leave:

1. Seasonal nature of the business.
2. Shortage of raw material, power; slack market for the product.
3. Change in the plant location.
4. Disability, making a worker unfit for work.
5. Disciplinary measures.

**(c) Avoidable causes**: they need management's attention on a continuous basis:

1. Dissatisfaction with job, remuneration, hours of work, working conditions.
2. Strained relationship with management, supervisors or fellow workers.
3. Lack of training facilities and promotional avenues.
4. Lack of recreational and medical facilities.
5. Low wages and allowances.

Under personal causes the employee leaves at will, and the first three are hard to remedy; the fourth, discontent, can be overcome by a healthy working environment, with officers making sure subordinates work in healthy conditions. Unavoidable causes oblige management to ask employees to leave. Avoidable causes need management's attention continuously, and proper and timely action can reduce turnover from them appreciably (SM 3.48–3.49).

### What it does to cost

High employee turnover increases the cost of production because (SM 3.50):

1. the even flow of production is disturbed;
2. the efficiency of new workers is low, and even experienced newcomers are less productive at first;
3. the cost of training and induction increases;
4. new workers cause more breakage of tools, wastage of materials and so on;
5. the cost of recruitment and training increases.

Two types of cost go with it (SM 3.50):

- **Preventive costs**, incurred to keep turnover as low as possible: (i) medical benefits; (ii) employee welfare such as pension; (iii) other benefits aimed at retaining employees.
- **Replacement costs**, which arise because of turnover: recruitment, training and induction, abnormal breakage and scrap, and extra wages and overheads due to the inefficiency of new workers.

High turnover means high replacement costs, and only adequate preventive costs keep turnover low, so each company must work out its **optimum level** of turnover from its personnel policies and the behaviour of the two costs (SM 3.50):

::: diagram Preventive and replacement cost: the optimum level (illustrative)
{"type": "plot", "h": 300, "x": [2, 30], "y": [0, 120], "clip": true,
 "xlabel": "employee turnover rate (%)", "ylabel": "cost a year (₹ lakh)",
 "xticks": [2, 5, 10, 15, 20, 25, 30], "yticks": [0, 20, 40, 60, 80, 100, 120],
 "series": [
  {"label": "preventive cost", "fn": "200/x", "color": "a"},
  {"label": "replacement cost", "fn": "2*x", "color": "d"},
  {"label": "total", "fn": "200/x+2*x", "color": "g"}],
 "points": [{"x": 10, "y": 40, "label": "optimum", "pos": "above"}],
 "caption": "Illustrative curves, not ICAI figures. Blue: preventive cost falls as more turnover is tolerated; orange: replacement cost rises with turnover; green: their total is lowest at the optimum level."}
:::

### The profit forgone

The cost of turnover in rupees is the **profit forgone**: the contribution that the lost productive hours would have earned, plus the costs incurred because of turnover (SM 3.51–3.52, Illustration 15). The steps:

::: steps
1. **Actual productive hours** = actual hours worked − unproductive training hours.
2. **Productive hours lost** = potential productive hours lost (vacancies not filled in time) + unproductive training hours.
3. **Sales lost** = sales ÷ actual productive hours × productive hours lost.
4. **Contribution lost** = sales lost × P/V ratio ([[cma.mc.basics|contribution and the P/V ratio]]).
5. **Profit forgone** = contribution lost + settlement, recruitment, selection and training costs (+ rectification of defective output, when given).
:::

When the data are in units instead (the chapter's case scenario of J Ltd), output lost = potential hours lost ÷ hours per unit + training hours' output lost through lower productivity, and contribution lost = units lost × contribution per unit (SM 3.61–3.62, 3.68).

## Formats and formulas

::: definition Employee (labour) turnover
The rate of change in the composition of employee force during a specified period measured against a suitable index. (SM 3.45)
:::

::: formula Replacement and separation methods
$$\text{Replacement} = \frac{\text{Employees replaced}}{\text{Average on roll}} \times 100$$
$$\text{Separation} = \frac{\text{Employees separated}}{\text{Average on roll}} \times 100$$
(SM 3.45–3.46)
:::

::: formula Flux method
$$\text{Flux} = \frac{\text{Separated} + \text{Replaced}}{\text{Average on roll}} \times 100$$
With accessions (all joining, including replacements): (separations + accessions) ÷ average on roll × 100, or (separations + replacements + new joinings) ÷ average on roll × 100 (SM 3.46).
:::

::: formula Average on roll and the equivalent annual rate
$$\text{Average} = \frac{\text{At beginning} + \text{At end}}{2} \qquad \text{Annual rate} = \frac{\text{Rate for period} \times 365}{\text{Days in period}}$$
(SM 3.46–3.47)
:::

ICAI's layout for the cost of turnover (SM 3.52, Illustration 15). *Reproduce it from memory.*

| Computation of profit forgone on account of employee turnover | Amount (₹) |
|---|---:|
| Contribution foregone (working note) | xxx |
| Settlement cost due to leaving | xxx |
| Recruitment cost | xxx |
| Selection cost | xxx |
| Training costs | xxx |
| Cost of rectification of defective units (if given) | xxx |
| **Profit foregone** | **xxx** |

## Worked examples

:::: example Riders and cooks: two turnover rates and a retention plan
Tapri's HR team gives these figures for 2025-26:

| Particulars | Delivery riders | Kitchen staff |
|---|---:|---:|
| On roll on 1 April 2025 | 380 | 150 |
| On roll on 31 March 2026 | 420 | 150 |
| Left and discharged during the year | 114 | 12 |
| Replaced during the year | 104 | 12 |
| Joined for new posts (expansion) | 50 | – |

Each rider who leaves costs Tapri ₹9,000 to replace (recruitment, induction, uniform and road-safety training) and ₹8,000 of contribution on deliveries lost while the post is vacant. HR proposes a rider retention plan (medical cover and a loyalty bonus) costing ₹6,00,000 a year, which is expected to cut rider separations by one-third; every leaver would still be replaced.

**Required:**

(i) Calculate the separation rate, the replacement rate and the flux rate (on separations and replacements, and including all accessions) for each group.

(ii) Comment on the comparison.

(iii) Evaluate the retention plan.

(iv) For next year HR targets a rider flux rate (separations + replacements) of 30%, with the same average on roll and every leaver replaced. How many riders may leave?

::: answer Show the working
**Working note: average on roll** = (beginning + end) ÷ 2: riders (380 + 420) ÷ 2 = **400**; kitchen staff (150 + 150) ÷ 2 = **150**. Accessions of riders = 104 replacements + 50 new posts = 154.

**(i) Employee turnover rates**

| Method | Riders | Kitchen staff |
|---|---:|---:|
| Separation: 114 ÷ 400; 12 ÷ 150 | 28.50% | 8.00% |
| Replacement: 104 ÷ 400; 12 ÷ 150 | 26.00% | 8.00% |
| Flux, separations + replacements: 218 ÷ 400; 24 ÷ 150 | 54.50% | 16.00% |
| Flux, separations + accessions: 268 ÷ 400; 24 ÷ 150 | 67.00% | 16.00% |

The 50 riders hired for new posts are not replacements (SM 3.45); they enter only the flux rate that includes all accessions.

**(ii) Comment.** More than a quarter of the riders left during the year, against one in twelve of the kitchen staff. The riders' turnover is the one that disturbs the flow of work and keeps raising recruitment and training costs, so it needs attention to its avoidable causes (pay, working conditions, relations with supervisors). The kitchen's rates are low and steady; its separations were all replaced, so separation, replacement and both flux rates move together.

**(iii) Retention plan**

| Particulars | Amount (₹) |
|---|---:|
| Separations avoided: 114 ÷ 3 = 38 | |
| Replacement cost saved: 38 × ₹9,000 | 3,42,000 |
| Contribution no longer lost: 38 × ₹8,000 | 3,04,000 |
| **Saving** | **6,46,000** |
| Less: Cost of the plan (preventive cost) | 6,00,000 |
| **Net benefit** | **46,000** |

The plan is worthwhile, but only just: its preventive cost of ₹6,00,000 buys ₹6,46,000 of lower replacement cost and lost contribution, and the rider separation rate falls to 76 ÷ 400 = 19%. If it cuts separations by less than 36 (₹6,00,000 ÷ ₹17,000 = 35.3), it does not pay. This is the trade-off between preventive and replacement costs that decides a company's optimum level of turnover (SM 3.50).

**(iv) Target.** Flux = (S + R) ÷ 400 × 100 = 30%, so S + R = 120; with every leaver replaced, R = S, so **S = 60 riders** (a separation rate of 15%).
:::
::::

::::: example The samosa factory's vacancies
Kesar wants to know what last year's turnover at the samosa factory cost before he approves any retention plan. Ritu's records show:

1. 40 direct workers left during the year, and all were replaced. On average a post stayed vacant for 20 working days of 8 hours before the replacement joined.

2. Each recruit spent 10 days of 8 hours in training, half of which time produced nothing.

3. A direct worker fries 4 trays an hour; each tray earns a contribution of ₹45, and all lost output could have been sold.

4. Recruits wasted materials worth ₹1,80,000 during training.

5. Settlement cost was ₹4,000 for each worker leaving; recruitment and selection cost ₹6,500 and training and induction ₹5,000 for each recruit.

**Required:**

(i) Calculate the productive hours lost on account of employee turnover.

(ii) Calculate the profit forgone last year on account of employee turnover, and the profit forgone per worker who left.

:::: answer Show the working
**(i) Productive hours lost**

| Particulars | Hours |
|---|---:|
| Vacancies: 40 posts × 20 days × 8 hours | 6,400 |
| Unproductive training hours: 40 recruits × 10 days × 8 hours × 50% | 1,600 |
| **Productive hours lost** | **8,000** |

The productive half of the training hours is not lost: it produced output.

**Working note: contribution lost** = 8,000 hours × 4 trays × ₹45 = 32,000 trays × ₹45 = **₹14,40,000**.

**(ii) Computation of profit forgone on account of employee turnover**

| Particulars | Amount (₹) |
|---|---:|
| Contribution foregone (working note) | 14,40,000 |
| Settlement cost due to leaving (40 × ₹4,000) | 1,60,000 |
| Recruitment and selection cost (40 × ₹6,500) | 2,60,000 |
| Training and induction cost (40 × ₹5,000) | 2,00,000 |
| Materials wasted by recruits | 1,80,000 |
| **Profit foregone** | **22,40,000** |

Profit forgone per worker who left = ₹22,40,000 ÷ 40 = **₹56,000**.

::: diagram Where the ₹22.4 lakh went
{"type": "plot", "h": 260, "x": [0.4, 5.6], "y": [0, 16],
 "xticks": [[1, "contribution"], [2, "settlement"], [3, "recruitment"], [4, "training"], [5, "materials"]],
 "yticks": [0, 4, 8, 12, 16], "ylabel": "amount (₹ lakh)",
 "series": [{"label": "₹ lakh", "bars": true, "values": true, "color": "d", "pts": [[1, 14.4, "14.40"], [2, 1.6, "1.60"], [3, 2.6, "2.60"], [4, 2.0, "2.00"], [5, 1.8, "1.80"]]}],
 "caption": "Nearly two-thirds of the profit forgone is contribution on hours never worked, not the visible costs of hiring and training."}
:::

The visible costs of turnover (settlement, recruitment, training, wasted materials) are ₹8,00,000; the contribution lost on vacant posts and unproductive training is almost twice as large. Any retention plan costing less than about ₹56,000 for each departure it prevents would pay for itself.
::::
:::::

## Under the hood

### Why the average, not the opening number

Dividing by the number at the beginning of the year understates turnover in a shrinking firm (the opening number is above the average) and overstates it in a growing one: Tapri's café staff grew from 480 to 520, so 60 ÷ 480 gives 12.5% against the correct 12%. ICAI's chapter MCQ 5 offers "persons separated ÷ number of workers at the beginning of the year" as a distractor; the answer is replacements ÷ average number of workers (SM 3.57–3.58, 3.63).

### "Newly set up" and other wording

In May 2025 Q1(c) the firm was "newly set up", and the separation rate (3.5%) and 28 separations gave the average on roll (800) before the other rates could be found. When a question gives two rates and one count, start from the method whose count you have.

### Turnover and the other levers

Control over employee turnover is one of ICAI's eight factors for controlling employee cost (SM 3.5–3.6), and the low efficiency of new workers (SM 3.50) is what a labour efficiency variance measures: [[cma.std.labour|labour variances]]. The incentive schemes that keep good workers are in [[cma.emp.incentives|time rate, piece rate and the premium plans]].

## Exam angle

::: exam Where employee turnover appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, employee turnover was examined in 11 questions.

- **Numerical from the rates, 4–5 marks.** Average on roll, recruited and joined, and left, from flux, replacement and separation rates for a quarter: May 2026 Q4(b) (5 marks); RTP September 2024 Q8. Replacement and flux rates from a separation rate: May 2025 Q1(c) (4 marks). The same as an MCQ: MTP January 2025 Series I MCQ 11.
- **Separation rate from opening numbers and movements**, 2 marks: September 2024 MCQ 14.
- **Profit forgone, 6 marks**: May 2024 Q5(a), with unproductive training hours, potential hours lost and rectification of defectives. Output and contribution lost in units, as five MCQs on one case: RTP May 2024 Q2.
- **Theory, 4–5 marks.** Two types of employee cost from turnover, with two productivity factors: MTP May 2026 Series I Q6(b). Two cost impacts and two measures: MTP September 2025 Series II Q6(c). Remedial steps to minimise labour turnover: MTP January 2026 Series II Q6(b) (5 marks); MTP May 2024 Series II Q6(c) (4 marks).
:::

::: exam The traps ICAI set
- **Accessions or replacements?** "Recruited and joined" is accessions: replacements plus new joinings (Illustration 14; May 2026 Q4(b)).
- **Productive hours, not all hours.** Only the unproductive part of training hours is lost (40% in May 2024 Q5(a)); sales per hour is sales ÷ actual productive hours.
- **Contribution, not sales.** The lost sales are multiplied by the P/V ratio before the turnover costs are added.
- **Annualise.** A quarter's rate × 4; any other period × 365 ÷ days.
:::

::: trick One count unlocks the rest
The three methods share one denominator. Find the average on roll from whichever method's count is given (count ÷ rate), then every other count is rate × average. Condition: all the rates are for the same period and use the same average.
:::

::: lab incentives {"mode":"turnover","tbasis":"rates","period":"quarter"}
Try the trick in the lab: work back from three quarterly rates to the counts, as Study Material Illustration 14 and May 2026 Q4(b) ask.
:::

## Answer frame

### "Discuss the two types of cost associated with labour turnover"

ICAI's suggested answers (MTP May 2026 Series I Q6(b); MTP September 2025 Series II Q6(c)) reproduce SM 3.50: (a) **preventive costs**, defined, with the three items (medical benefits, welfare such as pension, other retention benefits); (b) **replacement costs**, defined, with the items (recruitment, training and induction, abnormal breakage and scrap, extra wages and overheads from the inefficiency of new workers); then the conclusion that high turnover means high replacement costs and only adequate preventive costs keep it low, so each firm works out its optimum level.

### "Discuss the remedial steps to minimise labour turnover"

The Study Material says proper and timely management action can appreciably reduce turnover from avoidable causes (SM 3.49) and lists the preventive costs (SM 3.50). ICAI's suggested answers to the MTP questions (January 2026 Series II Q6(b); May 2024 Series II Q6(c)) give these steps; write them with one line each:

1. **Exit interview** with each outgoing employee, to find out why he is leaving.
2. **Job analysis and evaluation**, to know the requirements of each job.
3. A **scientific system of recruitment, placement and promotion**.
4. A **healthy atmosphere**, with education, medical and housing facilities for workers.
5. A **committee for settling workers' grievances**.

Then tie them to the avoidable causes they remove (dissatisfaction, strained relations, no training or promotion, no recreational or medical facilities, low wages).

### "Causes" and "effects"

Write the three heads with ICAI's items in ICAI's order (the lists above), adding the remark on remedies under each head. For effects, the five ways high turnover raises the cost of production (SM 3.50).

### The numerical: three answers to the profit-forgone question

::: cols
**Loses marks**

"Profit forgone = settlement + recruitment + training = ₹6,20,000."

Only the visible costs: the contribution on 8,000 lost hours and the wasted materials are missing.
---
**Passes**

"Contribution lost ₹14,40,000; profit forgone ₹22,40,000."

Right, but the hours working is invisible: no method marks if a figure slips.
---
**Full marks**

Working notes for the productive hours lost (vacancies and unproductive training) and the contribution lost (or, when sales and a P/V ratio are given, sales per productive hour × P/V ratio); then ICAI's statement with each turnover cost on its own line, ending in the profit foregone.
:::

## Common mistakes

::: mistake Hall of Shame: the opening headcount as the denominator
Dividing the 60 café separations by the 480 on roll at the start (12.5%) instead of the average of 500 (12%). **Fix:** every method divides by the average number on roll, (beginning + end) ÷ 2.
:::

::: mistake The new café's staff counted as replacements
Adding the 55 baristas hired for the new cafés to the 45 replacements, giving a replacement rate of 20%. **Fix:** employees appointed for expansion are not replacements (SM 3.45); they enter only the flux rate with accessions.
:::

::: mistake All training hours written off
Treating all 80 training hours of each recruit as lost (3,200 hours). **Fix:** only the unproductive half (1,600 hours) is lost; the rest produced output.
:::

::: mistake A month's rate reported as the year's
Giving a 30-day month's 2% separation rate as the year's rate. **Fix:** rate × 365 ÷ days in the period (24.33% here), or a quarterly rate × 4.
:::

## Practice

::: quiz Check yourself
Q: A Tapri kitchen had 220 workers at the start of the year. During the year 50 left and 10 were replaced; no one was hired for expansion. What is the separation rate, in per cent?
= 25
> Closing = 220 − 50 + 10 = 180; average = (220 + 180) ÷ 2 = 200; separation rate = 50 ÷ 200 × 100 = 25%. Dividing by the opening 220 gives 22.73%.

Q: Case scenario. In one year Tapri's cafés lose staff for these reasons: some move with their families to another city, a seasonal kiosk at a hill station closes for the monsoon, and several leave after constant quarrels with one supervisor. Ritu must tell the board which losses management can reduce by timely action. Which is correct?
- [ ] The family moves, a personal cause
- [ ] The kiosk closure, an unavoidable cause
- [x] The quarrels with the supervisor, an avoidable cause
- [ ] None of them: turnover is outside management's control
> Strained relationship with supervisors is an avoidable cause, which proper and timely management action can reduce (SM 3.49). Domestic reasons are personal and hard to remedy; the seasonal nature of business is unavoidable.

Q: Average on roll 400; during the period 30 separated, 20 were replaced and 25 joined for expansion. What is the flux rate including accessions, in per cent?
= 18.75
> Accessions = 20 + 25 = 45; (30 + 45) ÷ 400 × 100 = 18.75%. The flux rate without new joinings is (30 + 20) ÷ 400 = 12.5%.

Q: A factory's separation rate for a 30-day month is 2%. What is the equivalent annual rate, in per cent, to one decimal?
= 24.3..24.4
> 2% × 365 ÷ 30 = 24.33%. Multiplying by 12 gives 24%, close, but ICAI's formula uses days.

Q: Which of these is a preventive cost of employee turnover rather than a replacement cost?
- [ ] Training and induction of new recruits
- [x] Pension and other welfare for existing employees
- [ ] Abnormal breakage and scrap by new workers
- [ ] Recruitment advertising for vacancies
> Preventive costs are incurred to keep turnover low: medical benefits, welfare like pension, other retention benefits. The other three arise because employees have left (SM 3.50).
:::

## Recap

- Employee turnover: the rate of change in the composition of the workforce in a period, against an index (industry, locality, or own past rate).
- Replacement = replaced ÷ average on roll; separation = separated ÷ average; flux = (separated + replaced) ÷ average; all × 100.
- Expansion hires are not replacements; accessions = all joinings including replacements; flux with accessions = (separations + accessions) ÷ average.
- Average on roll = (beginning + end) ÷ 2; annual rate = period rate × 365 ÷ days (a quarter × 4).
- Causes: personal, unavoidable, avoidable (management can act on the avoidable ones).
- Costs: preventive (medical, welfare, retention benefits) and replacement (recruitment, training, breakage, inefficiency); find the optimum level.
- Profit forgone = (productive hours lost × sales per productive hour × P/V ratio) + settlement, recruitment, selection, training and rectification costs. (Count who got off the coach, not the new coach.)

## Flashcards

Q:: ICAI's definition of employee (labour) turnover?
A:: The rate of change in the composition of employee force during a specified period measured against a suitable index.

Q:: Formula: employee turnover by the replacement method?
A:: Number of employees replaced during the period ÷ average number of employees on roll during the period × 100 (expansion hires excluded).

Q:: Formula: employee turnover by the separation method?
A:: Number of employees separated during the period ÷ average number of employees on roll during the period × 100.

Q:: Formula: employee turnover by the flux method?
A:: (Number separated + number replaced) ÷ average number on roll × 100; with accessions, (separations + accessions) ÷ average on roll × 100.

Q:: What are accessions?
A:: The total number of workers joining, including replacements.

Q:: Formula: equivalent annual employee turnover rate?
A:: Turnover rate for the period × 365 ÷ number of days in the period (a quarterly rate × 4).

Q:: Three heads of causes of employee turnover?
A:: Personal causes, unavoidable causes and avoidable causes.

Q:: Five avoidable causes of employee turnover?
A:: Dissatisfaction with job, remuneration, hours or conditions; strained relationship with management, supervisors or fellow workers; lack of training facilities and promotional avenues; lack of recreational and medical facilities; low wages and allowances.

Q:: Five ways high employee turnover increases the cost of production?
A:: Even flow of production disturbed; low efficiency of new workers; increased cost of training and induction; more breakage of tools and wastage of materials; increased cost of recruitment and training.

Q:: Two types of cost associated with employee turnover?
A:: Preventive costs (medical benefits, welfare like pension, other retention benefits) and replacement costs (recruitment, training and induction, abnormal breakage and scrap, extra wages and overheads from inefficient new workers).

Q:: Profit forgone on account of employee turnover: how is the contribution lost computed?
A:: Sales ÷ actual productive hours × productive hours lost (potential hours lost + unproductive training hours) × P/V ratio.
