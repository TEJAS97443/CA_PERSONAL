---
id: cma.mc.decisions
title: Make or buy, shut down and other short-term decisions
minutes: 32
needs: cma.mc.basics, cma.mc.keyfactor
tags: relevant cost, make or buy, shut down, shut-down point, discontinuation, special order, opportunity cost, sunk cost
labs: key-factor
summary: Compare only the future costs and revenues that differ between the options: make or buy, shut down or continue, drop a product, accept a special order.
---

## In plain words

### The bun maska that "lost" money

Tapri's Lucknow café sends Kesar a report: the bun maska line lost ₹40,000 last month, after its share of the café's rent and head-office costs.

> **Kesar:** Bun maska is losing ₹40,000 a month. Band karo.
> **Ritu:** Per unit, please. Every month bun maska brings in ₹60,000 more than its buns, butter and gas cost. The ₹1,00,000 of rent and head-office cost we charge it will still be there tomorrow.
> **Kesar:** So the loss belongs to the rent, not the bun?
> **Ritu:** Drop the bun and the rent simply moves to the chai. And the café earns ₹60,000 less.

Ritu has used the one rule behind every short-term decision: compare only what **changes** between the options. The rent and head-office charge stay whatever Kesar decides, so they cannot decide anything. The ₹60,000 of **contribution** (sales minus variable costs) disappears if the line goes, so it decides everything. Costs and revenues that are in the future and differ between the options are **relevant**; a cost already incurred (a **sunk cost**) never is. A benefit you give up by choosing one option (an **opportunity cost**) is relevant even though no cash is paid.

The same rule answers the other classic questions: make a part or buy it, close a plant for a slow season, drop a product, accept a cheap one-off order.

::: analogy Cook or order in?
Tonight's dinner: cook at home or order in? The gas cylinder bought last month, the fridge and the rent are the same either way, so they are not part of the decision. Compare the groceries you will buy, plus whatever else you could have done with that evening, against the delivery bill.
:::

::: key
Decide on relevant costs: future costs and revenues that differ between the options, including benefits given up. Costs already incurred, and fixed costs that continue whatever you choose, do not decide anything.
:::

## How it works

Generally, short-term decisions are related with temporary gaps between demand and supply for available resources (SM 14.36). ICAI frames every decision in four steps (SM 14.32–14.33):

::: diagram The framework for decision making
{"type": "flow", "w": 420, "nodes": [
  {"id": "s1", "kind": "start", "label": "1. Identification\nof problem"},
  {"id": "s2", "kind": "process", "label": "2. Identification\nof options"},
  {"id": "s3", "kind": "process", "label": "3. Evaluation of\nthe options"},
  {"id": "s4", "kind": "end", "label": "4. Selection of\nthe option"}],
 "edges": [["s1", "s2"], ["s2", "s3"], ["s3", "s4"]],
 "caption": "Step 3 has two tasks: identify the costs and benefits of each option, then estimate their amount. Non-financial factors such as customer satisfaction, impact on existing market or customers and the ethics of the decision are evaluated too."}
:::

### Which costs count

To be **identified** for measurement, a cost or benefit must pass two principles (SM 14.33):

- **Controllability**: it arises due to the choice of an option.
- **Relevance**: a controllable cost is relevant only if ==(a) it is a future cost and (b) it differs under the two options== under consideration. Raw material for 1,000 extra units is controllable, but irrelevant to "make in-house or send to job workers" if it costs the same either way.

To be **estimated**, two more (SM 14.35): **variability** (by how much the cost or benefit rises or falls because of the choice) and **traceability** (direct costs are assigned to the option; indirect costs are apportioned). Options are measured at directly traceable and variable costs.

ICAI's own relevance list, in ICAI's order (SM 14.34–14.35):

| Cost | Relevant? | ICAI's reason |
|---|---|---|
| Historical cost | Irrelevant | Already incurred; does not affect the decision (book value of machinery) |
| Sunk cost | Irrelevant | Already paid (material in store with no replacement cost; cost of drawings, blueprints) |
| Committed cost | Irrelevant | Pre-agreed, cannot be revoked in normal circumstances (rate agreements, salaries); also a sunk cost |
| Opportunity cost | Relevant | The forgone potential benefit from the best rejected course of action |
| Notional or imputed cost | Relevant only if a benefit is actually forgone | Notional interest counts only if the company could earn that interest |
| Shut-down cost | Relevant | On suspending operations some fixed costs are avoided and extra ones may be incurred |

::: note Shut-down cost, two angles
Chapter 1 defines **shut down costs** as the fixed costs that continue to be incurred even when a plant is temporarily shut down, such as rent, rates and depreciation (SM 1.35). They are the cost of the "shut down" option, so they enter the decision to close. Once paid, they are history: ICAI's May 2025 suggested answer classifies rent already paid for a shed closed for two months as committed / shut-down cost, **non-relevant**.
:::

### The decisions, one rule each

The Study Material sorts short-term decisions into two families (SM 14.36):

::: diagram Short-term decisions
{"type": "nest", "w": 420, "root": {"title": "Short-term decisions", "mono": false, "children": [
  {"title": "Excess supply (idle capacity)", "mono": false, "color": "a", "lines": ["Processing of special order", "Price for stimulating demand", "Local vs export sale", "Minimum price for quotations", "Shut-down or continue"]},
  {"title": "Excess demand (resources short)", "mono": false, "color": "b", "lines": ["Make or buy / outsourcing", "Product mix under limiting factors", "Sales mix decisions", "Sale or further processing"]}]},
 "caption": "ICAI's two lists, in ICAI's order (SM 14.36)."}
:::

| Decision | Compare | Choose |
|---|---|---|
| Make or buy | Buy price against the relevant cost of making: variable cost + avoidable fixed cost + contribution forgone if the capacity has another use | The cheaper |
| Shut down or continue (temporary) | Loss if continued against the shut-down cost (unavoidable fixed costs + extra costs of closing) | Shut down only if continuing loses more |
| Discontinue a product | Its contribution against its avoidable (specific) fixed costs, plus any rent or contribution from the freed capacity | Drop only if the saving exceeds the contribution lost |
| Special or export order | Price against variable cost + extra costs of the order + contribution lost on any regular sales it displaces | Accept if the net gain is positive |

Two neighbours use the same rule: product mix and make-or-buy with a scarce resource rank by contribution (or saving) per unit of the key factor ([[cma.mc.keyfactor|limiting factor]]), and sell-or-process-further compares incremental revenue with incremental cost ([[cma.joint.further|sell at split-off or process further]]). A quotation built up from full cost is in [[cma.sheet.quote|estimated cost sheets, tenders and quotations]], and Paper 6A applies the same relevant-cost rule to project cash flows in [[fm.capbud.cashflows|capital budgeting cash flows]].

## Formats and formulas

*Reproduce these statements from memory: ICAI's suggested answers are built on this two-column comparison (the shut-down one is laid out as a "Statement showing operating loss").*

**Statement showing make or buy (per unit or in total)**

| Particulars | Make (₹) | Buy (₹) |
|---|---:|---:|
| Purchase price | | xxx |
| Direct materials, labour, variable overheads | xxx | |
| Avoidable fixed costs | xxx | |
| Contribution forgone on the alternative use | xxx | |
| **Relevant cost** | **xxx** | **xxx** |

**Statement showing operating profit or loss: continue or shut down**

| Particulars | If continued (₹) | If shut down (₹) |
|---|---:|---:|
| Sales | xxx | |
| Less: Variable cost | xxx | |
| **Contribution** | **xxx** | |
| Less: Fixed cost | xxx | xxx (unavoidable) |
| Less: Additional shut-down costs | | xxx |
| **Profit / (loss)** | **xxx** | **xxx** |

::: formula Shut-down point
$$\text{SDP} = \frac{\text{Fixed cost} - \text{Shut-down cost}}{\text{Contribution per unit}}$$
SDP = shut-down point in units; fixed cost = total fixed cost if the plant runs; shut-down cost = fixed costs that continue during the closure + additional costs of closing. Below this volume, closing loses less. In rupees, divide by the P/V ratio instead (SM practical problem 9: lock-up sales = avoidable fixed cost ÷ P/V ratio).
:::

::: formula Minimum price for a special order
$$\text{Minimum price} = \frac{\text{Relevant cost}}{\text{Units ordered}}$$
Relevant cost of the order = variable cost + costs specific to the order + contribution lost on any regular sales it displaces. With enough idle capacity the last part is nil.
:::

**Cost terms ICAI asks you to classify** (Chapter 1, SM 1.34–1.35)

| Term | ICAI's meaning |
|---|---|
| Differential cost | The change (increase or decrease) in total cost, variable and fixed, due to a change in activity level, technology, process or method of production |
| Imputed cost | Notional cost involving no cash outlay, such as interest on capital not actually paid |
| Opportunity cost | The value of sacrifice made or benefit of opportunity foregone in accepting an alternative course of action |
| Out-of-pocket cost | The portion of total cost that involves cash outflow; used in pricing in recession and make or buy; avoided if the proposal is not accepted |
| Shut down costs | Fixed costs which continue to be incurred, and cannot be avoided, during the temporary closure of a plant (rent, rates, depreciation) |
| Sunk costs | Historical costs incurred in the past; they play no role in decision making in the current period |

::: definition Relevant cost
A cost is treated as relevant only if (a) it is a future cost and (b) it differs under two options under consideration. (SM 14.33)
:::

## Worked examples

:::: example Desserts in the dock
Tapri's Lucknow delivery kitchen sells three lines. Figures for the quarter:

| Particulars (₹) | Chai | Snacks | Desserts |
|---|---:|---:|---:|
| Sales | 30,00,000 | 25,00,000 | 15,00,000 |
| Variable costs | 12,00,000 | 15,00,000 | 10,50,000 |
| Specific fixed costs | 4,00,000 | 3,00,000 | 2,50,000 |

Each line's specific fixed costs (its own chef and equipment lease) would be saved if the line were dropped. Common fixed costs of ₹14,00,000 (kitchen rent, app platform fee, head office) are apportioned in the ratio of sales and would not change.

**Required:**

(i) Prepare a statement of profit by line, as the management report shows it.

(ii) Examine Kesar's proposal to discontinue Desserts.

(iii) A cloud kitchen offers ₹3,00,000 a quarter to rent the Desserts space. Does it change your advice?

::: answer Show the working
**(i) Statement of profit by line**

| Particulars (₹) | Chai | Snacks | Desserts | Total |
|---|---:|---:|---:|---:|
| Sales | 30,00,000 | 25,00,000 | 15,00,000 | 70,00,000 |
| Less: Variable costs | 12,00,000 | 15,00,000 | 10,50,000 | 37,50,000 |
| **Contribution** | **18,00,000** | **10,00,000** | **4,50,000** | **32,50,000** |
| Less: Specific fixed costs | 4,00,000 | 3,00,000 | 2,50,000 | 9,50,000 |
| Contribution after specific fixed costs | 14,00,000 | 7,00,000 | 2,00,000 | 23,00,000 |
| Less: Common fixed costs (6 : 5 : 3) | 6,00,000 | 5,00,000 | 3,00,000 | 14,00,000 |
| **Profit / (loss)** | **8,00,000** | **2,00,000** | **(1,00,000)** | **9,00,000** |

**(ii) Discontinue Desserts?** Dropping it loses its contribution of ₹4,50,000 and saves only its specific fixed costs of ₹2,50,000. The ₹3,00,000 of common cost does not disappear; it is spread over Chai and Snacks. Profit falls from ₹9,00,000 to **₹7,00,000**. Desserts contributes ₹2,00,000 towards common costs: the proposal should be **rejected**.

**(iii) With the rent offer.** Dropping Desserts and letting the space gives ₹7,00,000 + ₹3,00,000 = **₹10,00,000**, ₹1,00,000 more than keeping it. On the figures, discontinue and let the space, after checking that Chai and Snacks will not lose customers who order dessert with them.
:::
::::

:::: example Khurja kulhads: make or buy
Tapri fires 2,00,000 kulhads a month in its own kiln at Khurja. Cost per kulhad:

| Particulars | ₹ per kulhad |
|---|---:|
| Clay | 1.20 |
| Labour | 1.00 |
| Fuel and other variable overheads | 0.60 |
| Fixed overheads (kiln depreciation, shed rent, supervisor) | 0.80 |
| **Total** | **3.60** |

A potters' co-operative offers kulhads at ₹3.10 delivered. If Tapri buys, the kiln supervisor (₹30,000 a month) would leave; the other fixed overheads would continue.

> **Kesar:** ₹3.10 against ₹3.60. Fifty paise a cup, two lakh cups. Sab adjust ho jayega: buy!

**Required:**

(i) Advise Tapri if the kiln has no other use.

(ii) In October the kiln could fire Diwali diyas instead, earning a contribution of ₹1,20,000 after all their own costs, the supervisor's salary included. Advise for October.

(iii) State the highest price Tapri should pay the co-operative in an ordinary month.

::: answer Show the working
**Working note.** Fixed overheads = 2,00,000 × ₹0.80 = ₹1,60,000 a month, of which only the supervisor's ₹30,000 is avoidable; ₹1,30,000 continues whether Tapri makes or buys.

**Statement showing make or buy (per month)**

| Particulars | Make (₹) | Buy (₹) |
|---|---:|---:|
| Purchase price (2,00,000 × ₹3.10) | | 6,20,000 |
| Variable cost (2,00,000 × ₹2.80) | 5,60,000 | |
| Avoidable fixed cost: supervisor | 30,000 | |
| **(i) Relevant cost, ordinary month** | **5,90,000** | **6,20,000** |
| Contribution forgone on diyas | 1,20,000 | |
| **(ii) Relevant cost, October** | **7,10,000** | **6,20,000** |

**(i)** Make: ₹30,000 a month cheaper. Kesar's ₹3.60 includes ₹0.65 a kulhad of fixed overheads (₹1,30,000) that would be paid anyway.

**(ii)** Buy in October and fire diyas: ₹90,000 better than making.

**(iii)** ₹5,90,000 ÷ 2,00,000 = **₹2.95** per kulhad.

Before switching, Tapri should also weigh the co-operative's quality and reliability in the Diwali rush, the non-financial side of step 3.
:::
::::

::: lab key-factor {"mode":"makebuy","kfName":"oven hours"}
Make or buy when oven hours are short: rank the parts by saving per hour, make the best ones first and buy the rest.
:::

::::: example Manali in the snow: open daily, open on weekends, or close?
Tapri's Manali café sells chai at ₹60 a cup; variable cost is ₹36 a cup. For the snowbound winter quarter Ritu has three options:

| Option | Expected cups | Fixed costs for the quarter (₹) |
|---|---:|---:|
| Open every day | 18,000 | 5,40,000 |
| Open only Friday to Sunday (part-time staff, lower power load) | 11,000 | 3,60,000 |
| Close for the quarter | — | 2,10,000 (lease, insurance, depreciation) |

Closing also means a one-time cost of ₹60,000 for staff settlement, winterising the plumbing and the spring relaunch.

**Required:**

(i) Prepare a statement comparing the three options, and advise.

(ii) Calculate the shut-down point of each operating option.

(iii) Above what number of cups would opening every day be better than opening on weekends only?

:::: answer Show the working
Contribution per cup = ₹60 − ₹36 = **₹24** under every option.

**(i) Statement of operating result for the quarter**

| Particulars | Open daily (₹) | Weekends only (₹) | Close (₹) |
|---|---:|---:|---:|
| Contribution (18,000 / 11,000 × ₹24) | 4,32,000 | 2,64,000 | — |
| Less: Fixed costs | 5,40,000 | 3,60,000 | 2,10,000 |
| Less: Closing and relaunch costs | — | — | 60,000 |
| **Loss** | **(1,08,000)** | **(96,000)** | **(2,70,000)** |

Open on weekends only: it loses ₹12,000 less than opening daily and ₹1,74,000 less than closing. Closing is the worst option, because the café's contribution under either way of opening more than covers the fixed costs that closing would save.

**(ii) Shut-down points.** Shut-down cost = fixed costs that continue + closing costs = ₹2,10,000 + ₹60,000 = ₹2,70,000.

$$\text{SDP} = \frac{\text{Total fixed cost} - \text{Shut-down cost}}{\text{Contribution per cup}}$$

| Option | Working | Shut-down point |
|---|---|---:|
| Open daily | (₹5,40,000 − ₹2,70,000) ÷ ₹24 | 11,250 cups |
| Weekends only | (₹3,60,000 − ₹2,70,000) ÷ ₹24 | 3,750 cups |

Both expected volumes (18,000 and 11,000) are well above their shut-down points, which confirms that the café should not close.

**(iii) Daily against weekends.** Opening daily must lose no more than ₹96,000: ₹24 × cups − ₹5,40,000 ≥ −₹96,000, so cups ≥ ₹4,44,000 ÷ ₹24 = **18,500**. The expected 18,000 falls 500 short. If Ritu expects more than 18,500 cups from daily opening (a heavy-snow season brings more tourists), open daily; otherwise weekends only.

::: diagram Manali café: the three options
{"type": "plot", "h": 340, "x": [0, 20000], "y": [-560000, 150000],
 "xlabel": "cups sold in the quarter", "ylabel": "profit / (loss) (₹)",
 "xticks": [[0, "0"], [5000, "5,000"], [10000, "10,000"], [15000, "15,000"], [20000, "20,000"]],
 "yticks": [[-540000, "−5,40,000"], [-360000, "−3,60,000"], [-270000, "−2,70,000"], [-100000, "−1,00,000"], [0, "0"]],
 "legend": "outside",
 "series": [
  {"label": "open daily", "fn": "-540000+24*x", "color": "a"},
  {"label": "weekends only", "fn": "-360000+24*x", "color": "e"},
  {"label": "close", "fn": "-270000", "color": "d", "dash": true}
 ],
 "points": [{"x": 18000, "y": -108000, "label": "daily, 18,000", "pos": "below"}, {"x": 11000, "y": -96000, "label": "weekends, 11,000", "pos": "above"}, {"x": 11250, "y": -270000, "label": "SDP 11,250", "pos": "below"}, {"x": 3750, "y": -270000, "label": "SDP 3,750", "pos": "above"}],
 "caption": "Blue: open daily; sky blue: weekends only; orange dashed: the ₹2,70,000 loss if the café closes. Each operating line meets the closing line at its shut-down point. The two operating lines are parallel (₹24 a cup) but start at different fixed costs, so they are read at their own expected volumes."}
:::
::::
:::::

::: lab key-factor {"mode":"shutdown"}
Step through the continue-or-close statement line by line, then watch the two lines cross at the shut-down point.
:::

:::: example The airline order that could cost more than it pays
Tapri's premix plant can pack 10,00,000 sachets a month and sells 7,00,000 a month at ₹12; variable cost is ₹7 a sachet and fixed costs are ₹25,00,000 a month. Udaan Airways offers to buy 2,50,000 sachets for its November flights at ₹9 each, packed in the airline's own foil (₹0.40 a sachet extra), with a one-time design and plate cost of ₹30,000.

> **Kesar:** Idle machines, extra cash. What is there to think about?
> **Ritu:** The hotel chain that buys 1,20,000 of our sachets a month. Its buyer flies Udaan.

Ritu expects that if the order is accepted, the hotel chain (part of the regular 7,00,000) will learn the airline's price and demand ₹2 off a sachet for the next three months.

**Required:**

(i) Advise whether Tapri should accept the order if the regular price is not affected.

(ii) Advise again, taking the hotel chain's reaction into account.

(iii) Calculate the minimum price per sachet for the airline order in each case.

::: answer Show the working
**Working note.** Idle capacity = 10,00,000 − 7,00,000 = 3,00,000 sachets, so the whole order of 2,50,000 fits without displacing regular sales. Variable cost of an airline sachet = ₹7 + ₹0.40 foil = ₹7.40. Fixed costs of ₹25,00,000 are incurred anyway and are not relevant.

**Statement of the effect of accepting the order**

| Particulars | Price unaffected (₹) | Hotel chain reacts (₹) |
|---|---:|---:|
| Sales (2,50,000 × ₹9) | 22,50,000 | 22,50,000 |
| Less: Variable cost (2,50,000 × ₹7.40) | 18,50,000 | 18,50,000 |
| Less: Design and plates | 30,000 | 30,000 |
| Contribution from the order | 3,70,000 | 3,70,000 |
| Less: Contribution lost on regular sales (1,20,000 × ₹2 × 3 months) | — | 7,20,000 |
| **Net gain / (loss) from accepting** | **3,70,000** | **(3,50,000)** |

**(i)** Accept: profit for November rises by ₹3,70,000, from ₹10,00,000 (7,00,000 × ₹5 − ₹25,00,000) to ₹13,70,000.

**(ii)** Reject: the price concession to the hotel chain is an opportunity cost of the order, and it turns the gain into a loss of ₹3,50,000 over the three months.

**(iii) Minimum price**

| Case | Relevant cost (₹) | Minimum price per sachet |
|---|---|---:|
| Price unaffected | 18,50,000 + 30,000 = 18,80,000 | ₹7.52 |
| Hotel chain reacts | 18,80,000 + 7,20,000 = 26,00,000 | ₹10.40 |

Before deciding, Tapri should weigh the non-financial factors the Study Material lists (SM 14.33): the impact on existing customers (can the airline's price be kept confidential, or the airline pack carry a different product description?), customer satisfaction, and the brand exposure on every November flight.
:::
::::

## Under the hood

### The cost indifference point

When two ways of doing the same job differ in fixed and variable cost (manual against automatic), the volume at which their total costs are equal is the **cost indifference point** = differential fixed cost ÷ differential variable cost per unit. Below it, the option with the lower fixed cost and higher variable cost is cheaper; above it, the option with the higher fixed cost and lower variable cost (SM 14.76–14.77, answer to practical problem 18). Example: a machine that adds ₹40,000 of fixed cost a month and saves ₹80 a unit pays off beyond 500 units a month.

### A price cut and the volume it needs

How much must sales rise to make up for a price cut? Required sales = desired contribution ÷ revised P/V ratio (Illustration 3, SM 14.17–14.19): with a P/V ratio of 40%, a 20% price cut leaves a P/V ratio of 25%, so sales value must rise 60% and quantity must double. More in [[cma.mc.bep|break-even point and margin of safety]].

### Why "out-of-pocket" matters in a slump

Out-of-pocket cost is the cash part of total cost; ICAI ties it to fixing selling prices in recession and to make or buy (SM 1.35). In a slump, a price that covers out-of-pocket costs keeps cash coming in while fixed costs that continue anyway are paid.

## Exam angle

::: exam Where these decisions appeared
In the ICAI documents read for this lesson:

- **Classifying costs**: May 2025 Q6(a), 5 marks: "identify the type of cost and state whether it is relevant/non-relevant in managerial decision making" for five situations (owned office with similar rent available nearby: opportunity or imputed cost, relevant; rent for a shed temporarily closed: committed or shut-down cost, non-relevant; market research already paid: sunk, non-relevant). Also RTP September 2026 Q16(b) and RTP May 2025 MCQ 1(ii).
- **Special and export orders**: MTP Series I for May 2026 Q4(a), 7 marks (accept with idle capacity; reject when a capacity cut forces lost regular sales); MTP Series II for January 2026 MCQs 4–5; MTP Series II for September 2025 MCQ 9; MTP Series I for January 2025 MCQs 6–10 (minimum price including the profit lost on Indian sales); MTP Series II for May 2026 Q2(a), 7 marks: a one-off order quoted at full cost plus 1/9 by company policy, a customer offering less, "State and explain the arguments for and against accepting", with a recommendation. The suggested answer re-costs the order at prime cost plus variable overheads only (no commission on a direct order, fixed overheads already recovered by budgeted sales) and accepts it.
- **Discontinuing a product**: RTP January 2025 Q10 (examine a recommendation to discontinue a product); RTP September 2025 Q16(iii).
- **Shut down**: old-scheme November 2023 Q4(b), 5 marks ("Whether the Noida plant be shut down? Find the shut-down point in units"); MTP Series II for November 2023 Q1(b) (shut-down point in units and as a percentage of capacity).
- **Make or buy**: RTP January 2026 Q17 (make or buy empty cans at three volumes, with an extra machine needed beyond present capacity, and the volume at which installing it pays); inside a key-factor question in MTP Series I for September 2025 Q4(a) (see [[cma.mc.keyfactor|limiting factor]]).
:::

::: exam The traps
- A product "making a loss" after apportioned common costs: test its contribution against its avoidable fixed costs.
- Full cost per unit against a buy price: strip out the fixed costs that continue.
- A quotation built from a full-cost pricing policy: re-cost the order with only the costs it adds (variable overheads at a variable rate, no commission if none is payable).
- "Must be accepted in full" with too little idle capacity: count the contribution lost on displaced sales.
- Shut-down cost in ICAI's answers = unavoidable fixed cost + additional cost of closing; the shut-down point divides the rest of the fixed cost by contribution per unit.
:::

::: trick The "what changes?" column
Draw two columns, one per option, and write in only what differs between them. Anything that would sit in both columns at the same figure can be left out of both: the answer does not move. Condition: both columns must cover the same period and the same volume of the other products.
:::

## Answer frame

### "Identify the type of cost and state whether it is relevant"

Write a three-column table, as ICAI's suggested answer does: **Situation | Type of cost | Relevant / Non-relevant**. One line per situation; give the ICAI term (opportunity, imputed or notional, sunk, committed, shut-down, out-of-pocket, differential), and the relevance follows from the two tests: future, and different between the options.

### "Explain the framework for decision making"

1. **Identification of problem**: the goal set to reach the objectives, such as low-cost production; a cost leader must achieve the 3Es: economy in inputs, efficiency in process and operations, effectiveness in output (SM 14.32).
2. **Identification of options**: all possible options are explored. ICAI's list for low-cost production (SM 14.32–14.33): (a) purchase of inputs from a specialised market: local vs import; (b) make the input in its own factory: make or buy; (c) bulk purchase to avail a discount: how much to purchase; (d) make in-house: make vs outsource; (e) bulk processing: how much to produce; (f) an efficient machine: old machine vs new machine; (g) optimisation of key resources: product mix decisions.
3. **Evaluation of the options** against the objective: financial measures (impact on profit, market share, return on investment) and non-financial factors (customer satisfaction, impact on existing market or customers, ethics); two tasks: identification of the costs and benefits of each option (controllability, relevance) and estimation of their amount (variability, traceability).
4. **Selection of the option**: the best option is selected and implemented.

### "Should the special order be accepted?"

1. **Relevant cost of the order**: variable cost, costs specific to the order, and the contribution lost on any regular sales it displaces; fixed costs that continue (or are already recovered by budgeted sales) are excluded.
2. **Price against relevant cost**: the margin the order adds to profit.
3. **Capacity**: whether the order fits the idle capacity or displaces regular sales.
4. **Non-financial factors** (SM 14.33): impact on the existing market or customers (regular buyers may ask for the same price), customer satisfaction, ethics of the decision.
5. **Recommendation**: accept, reject, or accept with conditions, with the reason.

### The numerical: shut down or continue

::: cols
**Loses marks**

"Loss ₹1,08,000 if open daily, so close the café."

Compares a loss with nothing: closing has a cost too.
---
**Passes**

Both columns, the right decision, no shut-down point.

The second half of the question carries marks of its own.
---
**Full marks**

Contribution per unit; a column for each option (continued / shut down) with unavoidable fixed and closing costs; decision in words; shut-down point by formula, in units (and as a % of capacity where asked).
:::

## Common mistakes

::: mistake Hall of Shame: the apportioned rent that killed the bun maska
Dropping a line because it shows a loss after apportioned common costs. Desserts' ₹1,00,000 "loss" hid a ₹2,00,000 contribution to common costs. **Fix:** compare its contribution with its avoidable fixed costs only.
:::

::: mistake Full cost against the buy price
₹3.60 a kulhad against ₹3.10 says buy; the relevant ₹2.95 says make. **Fix:** count only the variable cost, the fixed costs that would really disappear, and any contribution the capacity could earn elsewhere.
:::

::: mistake The special order with no room for it
Treating an order that must be accepted in full at its own contribution when only part of it fits the idle capacity, or ignoring a price concession it forces on regular customers. **Fix:** displaced regular sales and price concessions are opportunity costs: add the contribution lost to the cost of the order.
:::

::: mistake The feasibility report that keeps billing you
Counting money already spent, such as last year's market survey or the book value of old stock, as a cost of going ahead. **Fix:** sunk and committed costs are the same whichever option is chosen: leave them out.
:::

## Practice

::: quiz Check yourself
Q: A unit expects to sell 18,000 units in a slack quarter. Its fixed costs for the quarter are ₹4,00,000; if it closes, ₹1,50,000 of them continue and closing costs ₹30,000 more. What is the lowest contribution per unit (₹, two decimals) at which staying open is no worse than closing?
= 12.2..12.23
> Shut-down cost = ₹1,50,000 + ₹30,000 = ₹1,80,000, so closing saves ₹4,00,000 − ₹1,80,000 = ₹2,20,000 of fixed cost. Staying open must earn at least that in contribution: ₹2,20,000 ÷ 18,000 = ₹12.22 a unit. Dividing the full ₹4,00,000 (₹22.22) is the break-even contribution, not the shut-down one.

Q: Case scenario. Tapri has a one-year rate contract with a dairy for 2,000 litres of milk a day at ₹52 a litre, payable whether or not the milk is taken. About 300 litres a day are now left over and thrown away. Ananya proposes an iced-latte line that would use the surplus milk. How should the milk be costed in her proposal?
- [ ] At ₹52 a litre, the contract rate, as an out-of-pocket cost
- [ ] At the market price of milk, as an opportunity cost
- [ ] At ₹52 a litre plus a share of the dairy's delivery charges
- [x] As a committed cost: irrelevant, because it is payable whether or not the line is started
> The milk is paid for under the contract either way, and the surplus has no other use, so the cost does not differ between the options: a committed cost, irrelevant (SM 14.34). An opportunity cost would arise only if the surplus could be sold or used elsewhere.

Q: A component costs ₹45 a unit in variable cost to make, plus ₹15 of absorbed fixed overheads that would continue if it were bought. An outside supplier quotes ₹52; the capacity has no other use. What should the company do?
- [ ] Buy: ₹52 is less than the ₹60 cost of making
- [x] Make: it saves ₹7 a unit
- [ ] Buy: it saves ₹8 a unit
- [ ] Indifferent: the costs are equal
> The relevant cost of making is the ₹45 variable cost; the ₹15 continues either way. Making saves ₹52 − ₹45 = ₹7 a unit. Comparing with ₹60 is the full-cost trap.

Q: With ample idle capacity, a customer offers ₹80 a unit for 5,000 units of a product whose variable cost is ₹70; a special set-up costing ₹20,000 is needed. By how much would profit rise (₹)?
= 30000
> 5,000 × (₹80 − ₹70) − ₹20,000 = ₹30,000. Fixed costs already being incurred are irrelevant.

Q: Kesar is deciding whether to close the Manali café for the winter quarter. Which of these are relevant to the decision? Select all that apply.
- [x] Staff salaries that would be saved
- [ ] Depreciation on the café's fittings, which continues
- [x] The cost of relaunching in spring
- [x] The contribution the winter sales would earn
- [ ] Last year's renovation cost
> Relevant: what differs between staying open and closing (salaries saved, relaunch cost, contribution lost). Depreciation continues either way, and last year's renovation is sunk.
:::

## Recap

- Relevant cost: a future cost that differs between the options (SM 14.33); sunk, historical and committed costs are irrelevant; opportunity cost is relevant; notional cost only if a benefit is really forgone.
- Framework: identify the problem, identify options, evaluate (controllability, relevance; variability, traceability; non-financial factors), select.
- Make or buy: buy price against variable cost + avoidable fixed cost + contribution forgone on the alternative use.
- Discontinue: drop only if the avoidable fixed cost (plus rent from freed space) exceeds the contribution lost; apportioned common costs stay.
- Shut down: compare the loss if continued with the shut-down cost (unavoidable fixed + closing costs).
- Shut-down point = (total fixed cost − shut-down cost) ÷ contribution per unit; in rupees ÷ P/V ratio.
- Special order: accept if price exceeds variable + specific costs; with no idle capacity add the contribution of displaced sales. Minimum price = relevant cost ÷ units.
- If it would sit in both columns at the same figure, it cannot decide anything. (The rent will be there tomorrow.)

## Flashcards

Q:: When is a cost relevant for decision making, according to the Study Material?
A:: Only if (a) it is a future cost and (b) it differs under the two options under consideration.

Q:: ICAI's four steps of the framework for decision making?
A:: Identification of problem; identification of options; evaluation of the options; selection of the option.

Q:: The two principles for identifying costs and benefits, and the two for estimating them?
A:: Identification: controllability and relevance. Estimation: variability and traceability.

Q:: Historical, sunk, committed, opportunity and notional costs: relevant or not?
A:: Historical, sunk and committed: irrelevant. Opportunity: relevant. Notional (imputed): relevant only if the company is actually forgoing a benefit.

Q:: ICAI's definition of shut down costs (Chapter 1)?
A:: Costs which continue to be incurred even when a plant is temporarily shut down, e.g. rent, rates, depreciation; all fixed costs which cannot be avoided during the temporary closure of a plant.

Q:: Formula: shut-down point in units?
A:: (Total fixed cost − shut-down cost) ÷ contribution per unit, where shut-down cost = unavoidable fixed costs + additional costs of closing.

Q:: Make or buy: what is the relevant cost of making?
A:: Variable cost of making + fixed costs avoidable if bought + contribution forgone on any alternative use of the capacity.

Q:: When should a product be discontinued on cost grounds?
A:: When the fixed costs avoided by dropping it (plus any income from the freed capacity) exceed the contribution it earns; apportioned common fixed costs are ignored.

Q:: Special order without enough idle capacity: what is added to its variable and specific costs?
A:: The contribution lost on the regular sales it displaces (an opportunity cost).

Q:: ICAI's definition of opportunity cost?
A:: The value of sacrifice made or benefit of opportunity foregone in accepting an alternative course of action.

Q:: Formula: cost indifference point between two alternatives?
A:: Differential fixed cost ÷ differential variable cost per unit.
