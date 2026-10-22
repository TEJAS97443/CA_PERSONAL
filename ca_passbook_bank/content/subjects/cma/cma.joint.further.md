---
id: cma.joint.further
title: Sell at split-off or process further
minutes: 28
needs: cma.joint.apportion, cma.mc.decisions
tags: further processing, split-off point, incremental revenue, incremental cost, joint products, relevant cost, sell or process further
labs:
summary: At the split-off point the joint cost is already spent. Process a joint product further only if the extra revenue beats the extra cost; ICAI's statement and its traps.
---

## In plain words

### Kesar discovers "value addition"

Tapri's tea factory can sell each grade loose at the Guwahati auction, or pack it under the Tapri brand. Kesar has just come back from a seminar.

> **Kesar:** Value addition, Ritu! Pack everything. Packed tea always sells for more.
> **Ritu:** Brokens fetch ₹300 a kg at auction and ₹420 packed. Dust fetches ₹100 at auction and ₹180 in sachets.
> **Kesar:** So both go up by more than ₹70. Pack them!
> **Ritu:** Per unit, please. Packing and marketing cost ₹100 a kg for Brokens and ₹90 a kg for Dust.

Packing earns Brokens ₹120 a kg more and costs ₹100 a kg: ₹20 a kg better off, so Brokens should be packed. Packing earns Dust ₹80 a kg more and costs ₹90 a kg: ₹10 a kg worse off, so Dust should go to the auction loose.

The extra revenue from processing further is the **incremental revenue** (final price minus the split-off price); the extra cost it causes is the **incremental cost**. Notice what is missing: the ₹200 a kg of joint cost that each grade carried in the books. It was spent in the dryer before the sieve, and it is the same whether the tea is packed or not, so it cannot change the answer.

::: analogy The tender-coconut vendor
The vendor has already paid ₹40 for the coconut and sold its water. Should he also crack it open and scoop out the malai for a customer who will pay ₹10 more? That depends only on the ₹10 and on his minute of work. The ₹40 he paid this morning is the same whichever he does.
:::

::: key
At the split-off point the joint cost is already spent and is the same whichever way you go, so it is irrelevant. Process a product further only if its incremental revenue (sales after further processing minus sales value at split-off) exceeds its incremental cost (every cost the further processing adds, less any it saves).
:::

## How it works

### Six steps to the decision

::: steps
1. **Sales value at split-off**: the quantity available at split-off × the split-off price (or the price offered for the intermediate product).
2. **Sales value after further processing**: the quantity that comes out of the further process × the final price. A loss or yield in further processing reduces the quantity: 4,000 units with a 2% loss leave 3,920 to sell.
3. **Incremental revenue** = step 2 − step 1.
4. **Incremental cost**: the further processing cost (materials, labour, variable overheads, and fixed costs that arise only because of the processing), plus any additional selling, packing or marketing costs, less any selling expenses saved.
5. **Incremental profit or loss** = step 3 − step 4.
6. **Decide**: positive, process further; negative, sell at split-off. ICAI writes the conclusion in this form: It is advisable to further process only product X and Z and to sell product Y at the point of separation (SM 11.36).
:::

This is the relevance principle of short-term decisions: a cost is relevant only if (a) it is a future cost and (b) it differs under the options under consideration (SM 14.33). The joint cost fails (b); further processing costs pass both. "Sale or further processing" is one of ICAI's short-term decisions related with excess demand (SM 14.36); the other decisions are in [[cma.mc.decisions|make or buy, shut down and other short-term decisions]].

::: diagram Sell at split-off or process further?
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "A joint product\nat split-off"}, {"id": "m", "kind": "decision", "label": "Market at\nsplit-off?"}, {"id": "p0", "kind": "end", "label": "No choice:\nprocess it"}, {"id": "c", "kind": "process", "label": "Incremental\nrevenue and cost"}, {"id": "d", "kind": "decision", "label": "Revenue more\nthan cost?"}, {"id": "p", "kind": "end", "label": "Process further", "color": "ok"}, {"id": "x", "kind": "end", "label": "Sell at split-off", "color": "d"}], "edges": [["s", "m"], ["m", "p0", "no"], ["m", "c", "yes"], ["c", "d"], ["d", "p", "yes"], ["d", "x", "no"]], "caption": "Green: process further; orange: sell at split-off. Joint costs appear nowhere in the path. A product with no market at split-off has no choice to make; a tie is decided on factors other than profit."}
:::

### The tea factory's two grades, side by side

::: diagram Brokens and Dust: extra revenue against extra cost of packing, per kg
{"type": "plot", "h": 280, "x": [0.4, 2.6], "y": [0, 140], "xticks": [[1, "Brokens"], [2, "Dust"]], "yticks": [0, 40, 80, 120], "ylabel": "amount per kg (₹)", "legend": "outside", "series": [{"label": "incremental revenue", "bars": true, "bw": 0.3, "values": true, "color": "a", "pts": [[0.82, 120], [1.82, 80]]}, {"label": "incremental cost", "bars": true, "bw": 0.3, "values": true, "color": "d", "pts": [[1.18, 100], [2.18, 90]]}], "caption": "Blue: what packing adds to the price; orange: what packing and marketing cost. Brokens' blue bar is taller (pack them, ₹20 a kg better); Dust's orange bar is taller (sell loose, ₹10 a kg better)."}
:::

### What goes into the decision

| Item | In the decision? | Why |
|---|---|---|
| Joint cost up to split-off | No | Spent; same either way |
| Share of joint cost, any method | No | A slice of the same cost |
| Further processing materials, labour, variable overheads | Yes | Arise only if processed |
| Fixed cost of a department used only for it | Yes | Avoided if sold at split-off |
| General overhead apportioned to it | No | Continues either way |
| Extra selling, packing, marketing | Yes | Arise only if processed |
| Selling expenses saved | Yes, deduct | Avoided by processing |
| Loss in further processing | Yes | Fewer units to sell |

ICAI counted the whole conversion cost of a department "used exclusively" for the product, fixed overhead included, and deducted the selling expenses saved (May 2026 Q3(a), suggested answer); it added the further marketing cost to the further processing cost (January 2026 Q1(b)).

## Formats and formulas

*Reproduce the incremental statement and the plan statement from memory; ICAI's suggested answers use exactly these layouts.*

::: formula Incremental profit from further processing
$$\text{Incremental profit} = (\text{Sales after processing} - \text{Sales at split-off}) \qquad - \text{Incremental cost}$$
Sales after processing = output after any loss × final price. Sales at split-off = quantity at split-off × split-off price. Process further if the result is positive.
:::

::: formula Lowest final price that justifies further processing
$$\text{Minimum final price} = \frac{\text{Sales value at split-off} + \text{Incremental cost}}{\text{Output after further processing}}$$
At this price the incremental profit is nil.
:::

**Statement of incremental profit or loss** (per product; per unit or in total):

| Particulars | Product X (₹) | Product Y (₹) |
|---|---:|---:|
| Sales value after further processing | xxx | xxx |
| Less: Sales value at split-off | (xxx) | (xxx) |
| **Incremental revenue** | **xxx** | **xxx** |
| Less: Further processing cost | (xxx) | (xxx) |
| Less: Further marketing cost | (xxx) | (xxx) |
| Add: Selling expenses saved | xxx | xxx |
| **Incremental profit/(loss)** | **xxx** | **xxx** |

**Statement of profit under a production plan** (SM 11.31–11.33; one column a product, then a total):

| Line | Particulars |
|---|---|
| A | Sales revenue |
| B | Apportioned joint costs |
| C | Further processing cost |
| D | Total cost (B + C) |
| E | Excess of sales revenue over cost (A − D) |
| F | Fixed cost |
| G | Profit (E − F) |

Prepare it for "none processed further", "all processed further" and "the suggested plan" when asked. Line B is the same in all three plans, which is why the plans differ by exactly the incremental profits.

## Worked examples

::::: example Natural cocoa powder or Dutch cocoa?
Tapri's cocoa unit presses cocoa mass in Department I into cocoa butter and natural cocoa powder, in the ratio 40 : 60 by weight; the input-output ratio of Department I is 100 : 96. Butter is sold at the split-off point. Powder can be sold at the split-off point, or alkalised and fine-milled in Department II into Dutch cocoa; Department II is used only for this, and its input-output ratio is 100 : 90. Data for September 2026:

| Cost (₹) | Department I | Department II |
|---|---:|---:|
| Cocoa mass (25,000 kg × ₹240) | 60,00,000 | – |
| Other materials | – | 2,40,000 |
| Labour | 5,00,000 | 3,00,000 |
| Variable overheads | 4,00,000 | 1,60,000 |
| Fixed overheads | 7,00,000 | 1,00,000 |

| Product | Price (₹ per kg) | Selling expenses (₹) |
|---|---:|---:|
| Cocoa butter | 600 | 1,50,000 |
| Natural powder (at split-off) | 360 | 1,20,000 |
| Dutch cocoa | 500 | 2,96,000 |

Department II's costs, fixed overheads included, are incurred only if the powder is processed.

**Required:**

(i) Prepare a statement apportioning the joint cost between butter and powder on the basis of sales value at the split-off point.

(ii) Advise whether the powder should be sold at the split-off point or processed into Dutch cocoa, showing incremental revenue, incremental cost and incremental profit.

(iii) Calculate the lowest price of Dutch cocoa per kg at which further processing is still worthwhile (to two decimals).

(iv) BrewBucks offers to buy all of next month's natural powder at ₹420 a kg, collecting it from the factory, so Tapri would incur no selling expenses on it. Volumes, prices and costs are otherwise as in September. Advise.

:::: answer Show the working
**Working note: output**

| Particulars | kg |
|---|---:|
| Input to Department I | 25,000 |
| Output (96%) | 24,000 |
| Cocoa butter (40%) | 9,600 |
| Natural powder (60%) | 14,400 |
| Dutch cocoa (90% of 14,400) | 12,960 |

**(i) Joint cost apportionment on sales value at split-off**

Joint cost = ₹60,00,000 + ₹5,00,000 + ₹4,00,000 + ₹7,00,000 = **₹76,00,000**.

| Particulars | Butter | Powder | Total |
|---|---:|---:|---:|
| Output (kg) | 9,600 | 14,400 | 24,000 |
| Price at split-off (₹) | 600 | 360 | |
| Sales value at split-off (₹) | 57,60,000 | 51,84,000 | 1,09,44,000 |
| **Joint cost (10 : 9) (₹)** | **40,00,000** | **36,00,000** | **76,00,000** |

**(ii) Further processing of powder into Dutch cocoa**

| Particulars | Amount (₹) |
|---|---:|
| Sales of Dutch cocoa (12,960 kg × ₹500) | 64,80,000 |
| Less: Sales of powder at split-off (14,400 kg × ₹360) | 51,84,000 |
| **(A) Incremental revenue** | **12,96,000** |
| Department II conversion cost (WN) | 8,00,000 |
| Add: Extra selling expenses (₹2,96,000 − ₹1,20,000) | 1,76,000 |
| **(B) Incremental cost** | **9,76,000** |
| **(C) Incremental profit (A − B)** | **3,20,000** |

WN: Department II = ₹2,40,000 + ₹3,00,000 + ₹1,60,000 + ₹1,00,000 = ₹8,00,000.

The powder should be **processed into Dutch cocoa**: it adds ₹3,20,000 to profit. The ₹36,00,000 of joint cost apportioned to powder is the same under both choices and is not part of the decision.

::: diagram Powder: sold at split-off against processed into Dutch cocoa
{"type": "plot", "h": 280, "x": [0.4, 2.6], "y": [0, 70], "xticks": [[1, "sell at split-off"], [2, "process further"]], "yticks": [0, 20, 40, 60], "ylabel": "amount (₹ lakh)", "legend": "outside", "series": [{"label": "sales", "bars": true, "bw": 0.3, "values": true, "color": "a", "pts": [[0.82, 51.84], [1.82, 64.8]]}, {"label": "selling and Dept II costs", "bars": true, "bw": 0.3, "values": true, "color": "d", "pts": [[1.18, 1.2], [2.18, 10.96]]}], "caption": "Blue: sales; orange: the costs that change with the choice. Net: ₹50.64 lakh sold at split-off, ₹53.84 lakh processed, ₹3.20 lakh better. The ₹36 lakh joint cost is the same in both and is left out."}
:::

**(iii) Lowest price of Dutch cocoa**

$$\text{Minimum price} = \frac{51{,}84{,}000 + 9{,}76{,}000}{12{,}960} = \text{₹}475.31 \text{ per kg}$$

Below ₹475.31 a kg, selling the powder at the split-off point is better.

**(iv) BrewBucks' offer**

| Particulars | Amount (₹) |
|---|---:|
| Sales of Dutch cocoa (12,960 kg × ₹500) | 64,80,000 |
| Less: Sales to BrewBucks (14,400 kg × ₹420) | 60,48,000 |
| **(A) Incremental revenue from processing** | **4,32,000** |
| Department II conversion cost | 8,00,000 |
| Add: Selling expenses of Dutch cocoa (none on the offer) | 2,96,000 |
| **(B) Incremental cost** | **10,96,000** |
| **(C) Incremental loss from processing (A − B)** | **(6,64,000)** |

On financial grounds Tapri should **accept the offer**: operating income is ₹6,64,000 higher than from processing the powder. (Whether to supply a competitor's hot chocolate is a strategic question the numbers do not answer.)
::::
:::::

::::: example Four grades, one plan
Tapri's tea factory produced the following in October 2026. The joint cost of ₹1,00,80,000 is apportioned on sales value at the split-off point. Each grade except Dust can be sold at the auction or packed under the Tapri brand; Dust can only be sold at the auction. In the tea-bag machine 6% of the Fannings is lost as fluff with no value. Fixed costs of the factory, not included above, are ₹12,00,000.

| Grade | Output (kg) | Auction price (₹/kg) | Packed price (₹/kg) | Packing cost (₹) |
|---|---:|---:|---:|---:|
| Leaf | 6,000 | 500 | 800 | 14,40,000 |
| Brokens | 18,000 | 300 | 360 | 12,60,000 |
| Fannings | 12,000 | 200 | 300 | 10,20,000 |
| Dust | 24,000 | 110 | – | – |

**Required:**

(i) Prepare a statement of profit if every grade is sold at the auction.

(ii) Prepare a statement of profit if every grade that can be packed is packed.

(iii) Suggest the production plan that maximises profit and prepare its profit statement.

:::: answer Show the working
**Working note: joint cost apportioned** (multiplying factor = ₹1,00,80,000 ÷ ₹1,34,40,000 × 100 = 75%)

| Grade | Sales at split-off (₹) | Joint cost at 75% (₹) |
|---|---:|---:|
| Leaf (6,000 × ₹500) | 30,00,000 | 22,50,000 |
| Brokens (18,000 × ₹300) | 54,00,000 | 40,50,000 |
| Fannings (12,000 × ₹200) | 24,00,000 | 18,00,000 |
| Dust (24,000 × ₹110) | 26,40,000 | 19,80,000 |
| **Total** | **1,34,40,000** | **1,00,80,000** |

**(i) Every grade sold at the auction**

| Particulars (₹) | Leaf | Brokens | Fannings | Dust |
|---|---:|---:|---:|---:|
| Sales revenue | 30,00,000 | 54,00,000 | 24,00,000 | 26,40,000 |
| Less: Joint cost | 22,50,000 | 40,50,000 | 18,00,000 | 19,80,000 |
| **Excess** | **7,50,000** | **13,50,000** | **6,00,000** | **6,60,000** |

Total excess ₹33,60,000 − fixed cost ₹12,00,000 = **profit ₹21,60,000**.

**(ii) Every grade that can be packed is packed**

Fannings packed = 12,000 × 94% = 11,280 kg; sales = 11,280 × ₹300 = ₹33,84,000.

| Particulars (₹) | Leaf | Brokens | Fannings | Dust |
|---|---:|---:|---:|---:|
| A. Sales revenue | 48,00,000 | 64,80,000 | 33,84,000 | 26,40,000 |
| B. Joint cost | 22,50,000 | 40,50,000 | 18,00,000 | 19,80,000 |
| C. Packing cost | 14,40,000 | 12,60,000 | 10,20,000 | – |
| D. Total cost (B + C) | 36,90,000 | 53,10,000 | 28,20,000 | 19,80,000 |
| **E. Excess (A − D)** | **11,10,000** | **11,70,000** | **5,64,000** | **6,60,000** |

Total excess ₹35,04,000 − fixed cost ₹12,00,000 = **profit ₹23,04,000**.

**(iii) The best plan**

| Particulars (₹) | Leaf | Brokens | Fannings |
|---|---:|---:|---:|
| Packed sales | 48,00,000 | 64,80,000 | 33,84,000 |
| Less: Auction sales | 30,00,000 | 54,00,000 | 24,00,000 |
| Incremental revenue | 18,00,000 | 10,80,000 | 9,84,000 |
| Less: Packing cost | 14,40,000 | 12,60,000 | 10,20,000 |
| **Incremental profit/(loss)** | **3,60,000** | **(1,80,000)** | **(36,000)** |

::: diagram Incremental profit or loss of packing each grade
{"type": "plot", "h": 260, "x": [0.4, 3.6], "y": [-3, 5], "xticks": [[1, "Leaf"], [2, "Brokens"], [3, "Fannings"]], "yticks": [-2, 0, 2, 4], "ylabel": "amount (₹ lakh)", "legend": "none", "series": [{"label": "incremental profit", "bars": true, "bw": 0.45, "values": true, "color": "a", "pts": [[1, 3.6], [2, -1.8], [3, -0.36]]}], "caption": "Bars above zero: packing pays (Leaf). Bars below zero: packing loses (Brokens, and Fannings once the 6% fluff loss is counted)."}
:::

It is advisable to pack only Leaf and to sell Brokens, Fannings and Dust at the auction.

| Particulars (₹) | Leaf | Brokens | Fannings | Dust |
|---|---:|---:|---:|---:|
| A. Sales revenue | 48,00,000 | 54,00,000 | 24,00,000 | 26,40,000 |
| B. Joint cost | 22,50,000 | 40,50,000 | 18,00,000 | 19,80,000 |
| C. Packing cost | 14,40,000 | – | – | – |
| D. Total cost (B + C) | 36,90,000 | 40,50,000 | 18,00,000 | 19,80,000 |
| **E. Excess (A − D)** | **11,10,000** | **13,50,000** | **6,00,000** | **6,60,000** |

Total excess ₹37,20,000 − fixed cost ₹12,00,000 = **profit ₹25,20,000**: ₹3,60,000 more than plan (i) and ₹2,16,000 more than plan (ii). Check: ₹21,60,000 + ₹3,60,000 = ₹25,20,000.

Had the fluff loss been ignored, Fannings would have shown an incremental profit of ₹1,80,000 (12,000 kg × ₹100 − ₹10,20,000) and been packed wrongly.
::::
:::::

## Under the hood

### When the joint cost does matter

The joint cost is irrelevant to what happens *after* the split-off point, but not to whether the joint process should run at all. That question compares the revenue of the best plan with the joint cost plus the further costs of that plan. The Study Material's answer to Practical Problem 5 shows the starting figures: sold at split-off, the three products bring ₹11,000 against a pre-separation cost of ₹10,000, a profit of ₹1,000 (SM 11.36). If a process cannot cover its joint cost even in its best plan, the whole process is the problem; dropping one joint product is never an option on its own, because the products come out together.

### Why ICAI's statements still show the joint cost

The Study Material says management needs the share of joint cost to decide whether to process further or sell at split-off (SM 11.4). Its own solutions show how it is used: the apportioned joint cost appears in the "sell at split-off" statement and in the "process further" statement in the same amount, so it cancels (SM 11.32–11.33, 11.36–11.37). A product can show a loss after its apportioned joint cost and still be worth processing further: in Practical Problem 5, product X shows a loss of ₹1,000 after further processing but an incremental profit of ₹500, and ICAI advises processing it (SM 11.35–11.36).

### An offer for the intermediate product

An outside offer for the product at split-off simply replaces the split-off price in step 1: compare the revenue after processing with the offer, and the processing costs with any costs of the offer (Illustration 4 (2): the operating income "will be reduced by ₹20,000" if the chlorine is sold instead of processed into PVC; SM 11.15). Selling expenses that the offer avoids count in its favour.

### Fixed costs after the split-off point

A fixed cost belongs in the incremental cost only if it arises because of the processing: a department that exists only for the product, a machine hired for it, a supervisor engaged for it. A share of general factory rent that continues either way does not. When the question is silent, state the assumption you make, as ICAI's May 2026 answer implicitly did by counting the whole of Department II.

## Exam angle

::: exam Where the decision appeared, May 2024 to September 2026
In the new-scheme Paper 4 past papers, RTPs and MTPs from May 2024 to September 2026, the sell-or-process-further decision for a joint product was examined in 10 documents (3 past papers, 3 RTPs, 4 MTPs), always after a joint cost apportionment in the same question. (MTP September 2026 Series I also asks it for a single intermediate product in a process costing case.)

- **Descriptive, as one part of a 4 to 8-mark question.** Product B with a 2% loss in further processing: May 2024 Q1(b)(ii) ("Explain the impact on profitability"). Input-output ratios, an exclusive department and selling expenses saved: May 2026 Q3(a)(ii) (8 marks for the whole question). Further processing plus further marketing cost: January 2026 Q1(b)(iii). Per-kg incremental statement: RTP January 2025 Q14(ii), RTP January 2026 Q15(iv), RTP September 2025 Q14(iv). Current policy against the better plan, with profit statements: MTP May 2025 Series II Q5(a)(iii)–(iv) (8 marks). An offer for the intermediate product: MTP January 2026 Series I Q1(c)(ii) (4 marks).
- **Multiple choice, 2 marks.** Which product loses after further processing, total profit, and the profit of the optimum plan: MTP September 2026 Series II MCQs 1, 2, 4 and 5. Incremental revenue of processing Halogen into Vinyl: MTP January 2025 Series II MCQ 10.
:::

::: exam The wording traps ICAI used
- "Loss in further processing is 2%": incremental revenue uses 98% of the units at the final price against 100% at the split-off price (May 2024 Q1(b)(ii); ICAI showed the answer both as a profit comparison, ₹22,500 against ₹21,060, and as an incremental loss of ₹1,440).
- Two input-output ratios in a row: the output of Department I feeds Department II (May 2026 Q3(a)).
- "Further marketing cost (per kg)" sits next to the further processing cost: both are incremental (January 2026 Q1(b)).
- "Selling expense" for the product at split-off and after processing: only the difference counts (May 2026 Q3(a)).
:::

::: trick Per kg first
When prices and costs are given per kg and there is no loss in further processing, work the decision per kg (final price − split-off price − further cost per kg) and multiply once at the end, as RTP January 2025 Q14 does. Condition: no loss or yield change in further processing and no fixed further processing cost; otherwise work in totals.
:::

## Answer frame

### The "advise" part: how ICAI words it

1. A statement of incremental revenue, incremental cost and incremental profit or loss, product by product (per unit or total).
2. The working notes for quantities after any loss or yield.
3. One sentence of advice in ICAI's form: "It is advisable to further process only product ___ and to sell product ___ at the point of separation."
4. Where asked, the profit statement of the suggested plan, with the increase over the present plan.

### Three answers to "Should the powder be processed further?"

::: cols
**Loses marks**

"Yes, Dutch cocoa sells for ₹500 against ₹360."

Compares prices only: no costs, no loss in processing, no figures.
---
**Passes**

"Profit after processing = ₹64,80,000 − ₹36,00,000 − ₹8,00,000 − ₹2,96,000 = ₹17,84,000, so process."

Right decision, but drags in the joint cost and gives no incremental figure to compare with.
---
**Full marks**

Output working; incremental revenue ₹12,96,000; incremental cost ₹9,76,000 with its parts; incremental profit ₹3,20,000; the advice sentence; joint cost stated as irrelevant.
:::

## Common mistakes

::: mistake Hall of Shame: the joint cost that sneaked back in
Deducting the product's share of joint cost from the further-processing revenue and deciding on what is left, or dropping a product because it shows a loss after its share of joint cost. **Fix:** the joint cost is the same whether the product is sold at split-off or processed further; compare only incremental revenue with incremental cost.
:::

::: mistake The 6% that vanished
Multiplying the final price by the quantity at split-off when the further process loses part of it. In the tea factory that turned the Fannings' loss of ₹36,000 into a profit of ₹1,80,000. **Fix:** final sales = output **after** the loss × final price; split-off sales = quantity **before** the process × split-off price.
:::

::: mistake Comparing the final sales with the further processing cost alone
"Dutch cocoa brings ₹64,80,000 and costs ₹8,00,000 to make, so process." This forgets the ₹51,84,000 the powder would have brought at split-off. **Fix:** incremental revenue is the *difference* between the two sales values; the split-off sales given up are part of the comparison.
:::

::: mistake Forgetting the costs on either side of the factory gate
Leaving out further marketing or packing costs, or the selling expenses the processed product saves. **Fix:** every cost that changes with the choice goes in, with its sign.
:::

## Practice

::: quiz Check yourself
Q: A joint product gives 10,000 kg at split-off, saleable at ₹45 a kg. Processed further, 5% is lost and the rest sells at ₹60 a kg; further processing costs ₹1,00,000 plus packing of ₹2 per kg of output. What is the incremental profit or loss (₹) from processing further? (Enter a loss as a negative number.)
= 1000
> Output 9,500 kg. Incremental revenue = 9,500 × ₹60 − 10,000 × ₹45 = ₹5,70,000 − ₹4,50,000 = ₹1,20,000. Incremental cost = ₹1,00,000 + 9,500 × ₹2 = ₹1,19,000. Incremental profit ₹1,000: just worth it. Ignoring the loss would give ₹30,000.

Q: Case scenario. Tapri's dairy can sell 5,000 kg of cream at split-off at ₹350 a kg, or churn it into 2,200 kg of ghee selling at ₹900 a kg. Churning costs ₹3,20,000 and ghee packing and marketing ₹60,000. Under the NRV method the cream carries ₹12,00,000 of joint cost. Ritu must advise Kesar. Which advice is correct?
- [ ] Churn: ghee brings ₹19,80,000 against ₹17,50,000 for cream
- [x] Sell the cream at split-off: churning loses ₹1,50,000
- [ ] Churn: ghee earns ₹4,00,000 after its joint cost and further costs
- [ ] Indifferent: the ₹12,00,000 joint cost is the same either way
> Incremental revenue = ₹19,80,000 − ₹17,50,000 = ₹2,30,000; incremental cost = ₹3,20,000 + ₹60,000 = ₹3,80,000; incremental loss ₹1,50,000. The first option ignores costs; the third measures ghee's profit after joint cost instead of comparing the two choices; the fourth is true of the joint cost but ignores the incremental figures.

Q: After apportioning the joint cost, product Z shows a loss of ₹20,000 when processed further. Its incremental revenue from further processing is ₹90,000 and its further processing cost ₹60,000. What should be done?
- [ ] Stop producing Z
- [ ] Sell Z at split-off, because it shows a loss
- [x] Process Z further
- [ ] Close the joint process
> Processing adds ₹90,000 − ₹60,000 = ₹30,000. The ₹20,000 "loss" includes Z's share of the joint cost, which does not change with the decision; Z cannot be stopped without stopping the joint process.

Q: Which of these belong in the incremental cost of processing a joint product further? Select all that apply.
- [x] Materials and labour used in the further process
- [ ] The product's share of joint cost under the NRV method
- [x] Salary of a supervisor engaged only for the further process
- [ ] A share of general factory rent that is paid either way
- [x] Additional marketing cost of the processed product
> A cost belongs if it arises only because of the further processing. The joint cost and the general rent are the same under both choices.

Q: A product gives 10,000 kg at split-off worth ₹40 a kg. Further processing costs ₹1,40,000 and loses 10% of the weight. What is the lowest final price per kg (₹) at which processing further is worthwhile?
= 60
> Output 9,000 kg. Minimum price = (₹4,00,000 + ₹1,40,000) ÷ 9,000 = ₹60 a kg. Dividing by 10,000 kg gives ₹54, a price at which processing would lose ₹54,000.
:::

## Recap

- Joint cost is spent before the split-off point and is the same whatever is decided after it: irrelevant to sell-or-process-further.
- Incremental revenue = sales after further processing − sales value at split-off.
- Incremental cost = further processing cost + extra selling, packing, marketing − selling expenses saved; fixed costs only if they arise because of the processing.
- Process further if incremental revenue > incremental cost; otherwise sell at the split-off point.
- A loss in further processing cuts the output: final sales use the units after the loss.
- An offer for the product at split-off replaces the split-off price in the comparison.
- ICAI's advice: "It is advisable to further process only product ___ and to sell product ___ at the point of separation."
- The coconut cost ₹40 either way; only the malai's ₹10 and the minute matter.

## Flashcards

Q:: Sell at split-off or process further: what is the decision rule?
A:: Process further only if incremental revenue (sales after further processing − sales value at split-off) exceeds the incremental cost of further processing.

Q:: Why is the joint cost irrelevant to the decision to process a joint product further?
A:: It is incurred before the split-off point and is the same whether the product is sold at split-off or processed further; a relevant cost must be a future cost that differs between the options.

Q:: Formula: incremental revenue from further processing?
A:: Units after further processing (after any loss) × final price − units at split-off × split-off price.

Q:: What goes into the incremental cost of further processing?
A:: Further processing materials, labour and variable overheads; fixed costs that arise only because of the processing; additional selling, packing or marketing costs; less selling expenses saved.

Q:: How does a loss in further processing enter the decision?
A:: It reduces the quantity sold after processing: final sales = (units − loss) × final price, compared with all the units at the split-off price.

Q:: ICAI's wording of the advice in a further-processing question?
A:: "It is advisable to further process only product ___ and to sell product ___ at the point of separation."

Q:: Formula: minimum final price that justifies further processing?
A:: (Sales value at split-off + incremental cost) ÷ output after further processing.

Q:: A buyer offers a price for a joint product at the split-off point. How is the offer evaluated?
A:: Compare the revenue after further processing with the revenue from the offer, and the further processing and selling costs with the costs of the offer; accept if processing adds less than it costs.

Q:: When does the joint cost become relevant?
A:: When deciding whether to run the joint process at all: the revenue of the best plan must cover the joint cost plus the further costs of that plan.
