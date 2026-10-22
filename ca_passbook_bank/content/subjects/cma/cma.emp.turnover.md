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

:::: example The riders who left, the riders who joined
Tapri's delivery app employs riders on its rolls. For the quarter ended 30 June 2026, the HR team computed the employee turnover rates as 12% by the flux method, 4% by the replacement method and 6% by the separation method. 26 riders were replaced during the quarter.

**Required:**

(i) Calculate the average number of riders on roll for the quarter.

(ii) Calculate the number of riders who left and were discharged.

(iii) Calculate the number of riders recruited and joined, and how many of them joined for expansion.

(iv) Calculate the equivalent annual turnover rates.

::: answer Show the working
**(i) Average number on roll** (replacement method)

$$\frac{4}{100} = \frac{26}{\text{Average on roll}} \qquad \text{Average on roll} = \frac{26 \times 100}{4} = 650$$

**(ii) Left and discharged** (separation method)

$$\frac{6}{100} = \frac{S}{650} \qquad S = 39$$

**(iii) Recruited and joined.** As in ICAI's Illustration 14, the flux rate here is taken as (separations + accessions) ÷ average on roll:

$$\frac{12}{100} = \frac{39 + A}{650} \qquad A = 78 - 39 = 39$$

**39 riders** were recruited and joined: 26 replacements and **13** for expansion. (Check: separations + replacements alone, 65 ÷ 650, give only 10%, so the 12% must include the new joinings.)

**(iv) Equivalent annual rates** = quarterly rate × 4:

| Method | Quarter | Year |
|---|---:|---:|
| Flux | 12% | 48% |
| Replacement | 4% | 16% |
| Separation | 6% | 24% |
:::
::::

::::: example The samosa factory's lost hours
Kesar wants to know what last year's turnover at the samosa factory cost before he approves a retention plan. Ritu has collected:

| Particulars | |
|---|---:|
| Sales | ₹3,48,00,000 |
| P/V ratio | 25% |
| Actual hours worked by direct workers | 6,00,000 |
| of which hours spent training new recruits (40% of them unproductive) | 50,000 |
| Potential productive hours lost through delays in filling vacancies (excluding unproductive training hours) | 1,00,000 |
| Units produced during training found defective; rectification cost ₹30 a unit | 2,000 units |
| Settlement cost of workers leaving | ₹2,10,000 |
| Recruitment and selection cost | ₹1,45,000 |
| Training and induction cost | ₹1,85,000 |

The lost production could have been sold at current prices.

**Required:** Calculate the profit forgone last year on account of employee turnover.

:::: answer Show the working
**Working notes**

1. Unproductive training hours = 40% × 50,000 = **20,000**. Actual productive hours = 6,00,000 − 20,000 = **5,80,000**.
2. Productive hours lost = 1,00,000 + 20,000 = **1,20,000**.
3. Sales lost = ₹3,48,00,000 ÷ 5,80,000 × 1,20,000 = ₹60 an hour × 1,20,000 = **₹72,00,000**.
4. Contribution lost = ₹72,00,000 × 25% = **₹18,00,000**.

**Computation of profit forgone on account of employee turnover**

| Particulars | Amount (₹) |
|---|---:|
| Contribution foregone (WN 4) | 18,00,000 |
| Settlement cost due to leaving | 2,10,000 |
| Recruitment and selection cost | 1,45,000 |
| Training and induction cost | 1,85,000 |
| Cost of rectification of defective units (2,000 × ₹30) | 60,000 |
| **Profit foregone** | **24,00,000** |

::: diagram Where the ₹24 lakh went
{"type": "plot", "h": 260, "x": [0.4, 5.6], "y": [0, 20],
 "xticks": [[1, "contribution"], [2, "settlement"], [3, "recruitment"], [4, "training"], [5, "rectification"]],
 "yticks": [0, 5, 10, 15, 20], "ylabel": "amount (₹ lakh)",
 "series": [{"label": "₹ lakh", "bars": true, "values": true, "color": "d", "pts": [[1, 18, "18.00"], [2, 2.1, "2.10"], [3, 1.45, "1.45"], [4, 1.85, "1.85"], [5, 0.6, "0.60"]]}],
 "caption": "Three-quarters of the profit forgone is contribution on hours never worked, not the visible costs of hiring and training."}
:::

The price of each productive hour is sales ÷ **productive** hours (5,80,000), not ÷ all hours worked (6,00,000). The 30,000 productive training hours are not lost: they produced output and stay in the productive hours.
::::
:::::

## Under the hood

### Why the average, not the opening number

Dividing by the number at the beginning of the year understates turnover in a shrinking firm (the opening number is above the average) and overstates it in a growing one: Tapri's cafés grew from 480 to 520, so 60 ÷ 480 gives 12.5% against the correct 12%. ICAI's chapter MCQ 5 offers "persons separated ÷ number of workers at the beginning of the year" as a distractor; the answer is replacements ÷ average number of workers (SM 3.57–3.58, 3.63).

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

"Lost sales ₹72,00,000 + costs ₹6,00,000 = ₹78,00,000."

Sales lost were never turned into contribution.
---
**Passes**

"Contribution lost ₹18,00,000; profit forgone ₹24,00,000."

Right, but the hours working is invisible: no method marks if a figure slips.
---
**Full marks**

Working notes for productive hours, hours lost, sales per productive hour and contribution lost; then ICAI's statement with each turnover cost on its own line, ending in the profit foregone.
:::

## Common mistakes

::: mistake Hall of Shame: the opening headcount as the denominator
Dividing the 60 café separations by the 480 on roll at the start (12.5%) instead of the average of 500 (12%). **Fix:** every method divides by the average number on roll, (beginning + end) ÷ 2.
:::

::: mistake The new café's staff counted as replacements
Adding the 55 baristas hired for the new cafés to the 45 replacements, giving a replacement rate of 20%. **Fix:** employees appointed for expansion are not replacements (SM 3.45); they enter only the flux rate with accessions.
:::

::: mistake All training hours written off
Treating all 50,000 training hours as lost. **Fix:** only the unproductive part (here 40%, 20,000 hours) is lost; the rest produced output.
:::

::: mistake A quarter's rate reported as the year's
Giving the riders' 6% separation rate as annual. **Fix:** a quarterly rate × 4 (24%), or rate × 365 ÷ days for any other period.
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
