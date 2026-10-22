---
id: cma.mat.levels
title: Stock levels: re-order, minimum, maximum, average and danger levels
minutes: 26
needs: cma.mat.procure
tags: re-order level, minimum stock level, maximum stock level, average stock level, danger level, safety stock, lead time
labs: eoq
summary: When to order, the least and most to hold, the stock normally carried and the emergency line: ICAI's stock-level formulas, the stock control chart and the traps in reverse questions.
---

## In plain words

### The café that ran out of chai on a Sunday

Tapri's Indore café uses 40 to 60 packs of chai premix a day, 50 on an ordinary day. The supplier takes 4 to 8 days to deliver, usually 6. One rainy Sunday the café ran dry by 11 a.m.

> **Kesar:** Just order more. Keep a lakh packs!
> **Ritu:** And pay rent, interest and expiry on a lakh packs. The question is not "more". It is *when* to order and *how much* to hold.
> **Kesar:** Then tell me when.
> **Ritu:** When the shelf is down to what the worst week can eat before the van arrives.

That worst case is the busiest usage (60 a day) for the longest delivery (8 days): 480 packs. When stock falls to 480, order. That is the **re-order level**. If things go normally (50 a day, 6 days), 300 packs are eaten while the order travels, so about 180 are still on the shelf when it arrives: the **minimum level**, the cushion that should always be there.

If 700 packs arrive at a quiet time (40 a day) after the quickest delivery (4 days), only 160 have been used meanwhile, so stock could climb to 480 + 700 − 160 = 1,020: the **maximum level**, the ceiling beyond which money and space are wasted. Stock normally hovers around the **average level**: 180 + half of 700 = 530 packs. An emergency purchase from the local market takes 2 days, so the **danger level** is what normal usage eats in those 2 days, 50 × 2 = 100 packs: below it, only emergency issues are made.

::: analogy The petrol gauge on a long drive
You do not refuel at the first pump, or when the tank is bone dry. You refuel when what is left covers the longest stretch to the next pump at your thirstiest speed (re-order level). You expect some petrol left when you get there (minimum level). The tank holds only so much (maximum level). And when the warning light comes on, you drive only to the pump (danger level).
:::

::: key
Order when stock falls to what the maximum usage could need over the maximum lead time (re-order level). The other levels follow from it: minimum = re-order level less normal usage during normal lead time; maximum = re-order level plus re-order quantity less the least usage during the shortest lead time.
:::

## How it works

Inventory control by setting quantitative levels answers seven questions (SM 2.22):

| Level | Answers |
|---|---|
| Re-order stock level | When to order |
| Re-order quantity / EOQ | How much to order |
| Maximum stock level | Up to how much to stock |
| Minimum stock level | At least how much to stock |
| Average stock level | Stock normally kept |
| Danger stock level | Kept for emergency requirement |
| Buffer stock | To meet sudden demand |

**Re-order period** is also called **lead time**: the time to get an order from the supplier to the stores (SM 2.22–2.23). **Re-order quantity** is the quantity for which the store raises the purchase requisition; it should be the quantity at which ordering and carrying costs together are least, the [[cma.mat.eoq|economic order quantity]] (SM 2.23).

### Work the levels in this order

::: steps
1. **Fix the consumption rates**: maximum, minimum and average (normal) usage per day, week or month. If one is missing, use average = (maximum + minimum) ÷ 2, as ICAI's solutions do (SM 2.31).
2. **Fix the lead times**: maximum, minimum, average, and for emergency purchases. Average lead time = (maximum + minimum) ÷ 2 when not given, as in ICAI's solutions (SM 2.29, 2.100).
3. **Re-order level** = maximum consumption × maximum re-order period.
4. **Minimum level** = re-order level − (average consumption × average re-order period).
5. **Re-order quantity**: as given; if it is not given, compute the EOQ.
6. **Maximum level** = re-order level + re-order quantity − (minimum consumption × minimum re-order period).
7. **Average level** = minimum level + ½ re-order quantity, or (maximum + minimum) ÷ 2.
8. **Danger level** = average consumption × lead time for emergency purchases.
:::

Keep every rate and time in the same unit: per day with days, per week with weeks.

::: diagram Stock control chart: the café's chai premix
{"type": "plot", "h": 340, "x": [0, 42], "y": [0, 1200], "xlabel": "days", "ylabel": "stock (packs)",
 "xticks": [[0, "0"], [7, "7"], [14, "14"], [21, "21"], [28, "28"], [35, "35"], [42, "42"]],
 "yticks": [[0, "0"], [100, "100"], [180, "180"], [480, "480"], [880, "880"], [1020, "1,020"]],
 "series": [
  {"label": "stock", "pts": [[0, 880], [14, 180], [14, 880], [28, 180], [28, 880], [42, 180]], "color": "a"},
  {"label": "maximum", "fn": "1020", "color": "bad", "dash": true},
  {"label": "average", "fn": "530", "color": "mute", "dash": true},
  {"label": "re-order level", "fn": "480", "color": "c", "dash": true},
  {"label": "minimum", "fn": "180", "color": "g", "dash": true},
  {"label": "danger", "fn": "100", "color": "d", "dash": true},
  {"label": "lead time", "pts": [[22, 140], [28, 140]], "color": "f", "arrow": "both"},
  {"pts": [[22, 0], [22, 480]], "color": "mute", "dash": true, "legend": false}
 ],
 "legend": "outside",
 "caption": "Blue: stock, falling 50 packs a day and jumping by the 700-pack order. Dashed lines: maximum 1,020 (rose), average 530 (grey, minimum + ½ × 700), re-order level 480 (amber), minimum 180 (green), danger 100 (orange). The order is placed on day 22, when stock falls to 480 (grey dashed upright); after the normal 6-day lead time (violet arrow) it arrives when stock has fallen to the minimum."}
:::

On ICAI's chart (SM 2.28) the stock rises when materials are received and declines as they are consumed; at the re-order level the re-order quantity is ordered, and fresh supplies are normally received when stocks reach the minimum level. The time between the order and the receipt is the lead time.

::: lab eoq {"mode":"levels"}
Step through it yourself: each level lands on the stock control chart together with the worst or best case it plans for.
:::

## Formats and formulas

*Write each formula with its words first, then the figures, as ICAI's answers do.* Below, usage = consumption and lead time = re-order period, as ICAI uses both pairs of words.

::: formula Re-order level (ROL)
$$\text{ROL} = \text{Max. usage} \times \text{Max. lead time}$$
Alternatively ROL = minimum level + (average consumption × average re-order period) (SM 2.22–2.23).
:::

::: formula Minimum stock level
$$\text{Minimum} = \text{ROL} \qquad - (\text{Avg. usage} \times \text{Avg. lead time})$$
:::

::: formula Maximum stock level
$$\text{Maximum} = \text{ROL} + \text{ROQ} \qquad - (\text{Min. usage} \times \text{Min. lead time})$$
Here the re-order quantity may be the EOQ (SM 2.27).
:::

::: formula Average stock level
$$\text{Average} = \text{Minimum} + \tfrac{1}{2}\,\text{ROQ} \qquad \text{or} \qquad \frac{\text{Maximum} + \text{Minimum}}{2}$$
:::

::: formula Danger level
$$\text{Danger} = \text{Avg. usage} \qquad \times \text{Emergency lead time}$$
"Some time minimum consumption is also used" (SM 2.27).
:::

::: formula Economic order quantity (when ROQ is not given)
$$\text{EOQ} = \sqrt{\frac{2AO}{C}}$$
A = annual requirement, O = cost per order, C = carrying cost per unit per annum (SM 2.24). Details: [[cma.mat.eoq|EOQ and quantity discounts]].
:::

::: definition Re-order stock level
The level which lies between minimum and maximum levels in such a way that before the material ordered is received into the stores, there is sufficient quantity in hand to cover both normal and abnormal consumption situations; the level at which fresh order should be placed for replenishment of stock. (SM 2.22)
:::

::: definition Minimum, maximum and danger levels (SM 2.27)
**Minimum**: the lowest level of material stock which must be maintained in hand at all times, so that there is no stoppage of production due to non-availability of inventory. **Maximum**: the highest level of quantity for any material which can be held in stock at any time; any quantity beyond it causes extra expenditure on funds, storage and obsolescence. **Danger**: the level at which normal issues of the raw material inventory are stopped and emergency issues only are made. **Buffer stock**: stock kept for contingency, used in case of sudden order.
:::

## Worked examples

:::: example Frozen peas for the samosa line
Tapri's samosa factory gives you this information about frozen peas:

| Particulars | Details |
|---|---|
| Annual requirement (360-day year) | 36,000 kg |
| Cost of placing an order | ₹200 |
| Purchase price | ₹80 per kg |
| Annual storage cost | ₹10 per kg |
| Lead time | average 6 days, maximum 9 days, minimum 3 days; emergency purchase 2 days |
| Consumption | average 100 kg a day, maximum 130 kg a day |

The re-order quantity is the economic order quantity.

**Required:** Calculate:

(i) the re-order level;

(ii) the maximum level;

(iii) the minimum level;

(iv) the danger level;

(v) the average stock level.

::: answer Show the working
**Working notes**

1. Minimum consumption per day: average = (minimum + maximum) ÷ 2, so 100 = (X + 130) ÷ 2, giving **X = 70 kg a day**.
2. Re-order quantity (EOQ):

$$\text{EOQ} = \sqrt{\frac{2 \times 36{,}000 \times 200}{10}} = \sqrt{14{,}40{,}000} = 1{,}200 \text{ kg}$$

**Computations**

| Level | Formula and figures | kg |
|---|---|---:|
| (i) Re-order level | Max. consumption × max. lead time = 130 × 9 | **1,170** |
| (ii) Maximum level | ROL + ROQ − (min. consumption × min. lead time) = 1,170 + 1,200 − (70 × 3) | **2,160** |
| (iii) Minimum level | ROL − (avg. consumption × avg. lead time) = 1,170 − (100 × 6) | **570** |
| (iv) Danger level | Avg. consumption × emergency lead time = 100 × 2 | **200** |
| (v) Average stock level | Minimum + ½ ROQ = 570 + 600 | **1,170** |

Alternatively, average stock level = (2,160 + 570) ÷ 2 = 1,365 kg. ICAI's answers show both formulas when they differ; write the one you use.
:::
::::

:::: example Working backwards: what consumption gives these levels?
Ritu's records for chai premix at the central store show:

| Particulars | Packs |
|---|---:|
| Re-order level | 3,000 |
| Re-order quantity | 2,500 |
| Minimum stock level | 1,425 |
| Maximum stock level | 4,900 |

The maximum lead time is 6 days more than the minimum lead time, and the average lead time is 7 days.

**Required:**

(i) Find the minimum and maximum lead time.

(ii) Calculate the maximum consumption per day.

(iii) Calculate the minimum consumption per day, and check it through the minimum level.

::: answer Show the working
**(i)** Let the minimum lead time be m. Then m + (m + 6) = 2 × 7, so m = **4 days** and the maximum lead time = **10 days**.

**(ii)** Re-order level = maximum consumption × maximum lead time: 3,000 = max. consumption × 10, so maximum consumption = **300 packs a day**.

**(iii)** Maximum level = ROL + ROQ − (min. consumption × min. lead time): 4,900 = 3,000 + 2,500 − (min. consumption × 4), so minimum consumption = 600 ÷ 4 = **150 packs a day**.

Check through the minimum level: 1,425 = 3,000 − (avg. consumption × 7), so average consumption = 225 packs a day = (300 + 150) ÷ 2. Both routes agree.
:::
::::

::::: example Three ingredients, one samosa line
The samosa line uses three ingredients. Weekly production varies from 150 to 250 batches, averaging 200 batches.

| Ingredient | Usage per batch (kg) | Re-order quantity (kg) | Delivery (weeks): min, avg, max |
|---|---:|---:|---|
| Maida | 5 | 6,000 | 1, 2, 3 |
| Potato | 8 | 10,000 | 2, 3, 4 |
| Oil | 1 | 2,000 | 1, 1.5, 2 |

The re-order level of maida is 3,750 kg and of potato 8,000 kg; the minimum level of oil is 200 kg.

**Required:** Calculate:

(i) the minimum stock of maida;

(ii) the maximum stock of potato;

(iii) the re-order level of oil;

(iv) the average stock level of maida.

:::: answer Show the working
Weekly consumption = usage per batch × batches: maida 750 / 1,000 / 1,250 kg (minimum / average / maximum), potato 1,200 / 1,600 / 2,000 kg, oil 150 / 200 / 250 kg.

**(i)** Minimum stock of maida = ROL − (average consumption × average delivery period) = 3,750 − (1,000 × 2) = **1,750 kg**.

**(ii)** Maximum stock of potato = ROL + ROQ − (minimum consumption × minimum delivery period) = 8,000 + 10,000 − (1,200 × 2) = **15,600 kg**.

**(iii)** Re-order level of oil = maximum consumption × maximum delivery period = 250 × 2 = **500 kg**. Check: minimum level + (average consumption × average period) = 200 + (200 × 1.5) = 500 kg.

**(iv)** Average stock of maida = minimum + ½ ROQ = 1,750 + 3,000 = **4,750 kg**. Or, with the maximum level of maida (3,750 + 6,000 − 750 × 1 = 9,000 kg): (9,000 + 1,750) ÷ 2 = 5,375 kg. Show the formula you use; ICAI's answer to its own version of this exercise shows both (SM 2.89).
::::
:::::

::: lab eoq {"mode":"levels","unit":"units","per":"week","ubasis":"all","umin":25,"uavg":50,"umax":75,"lmin":4,"lmax":6,"ltMid":true,"lemerg":0,"rolFrom":"max","roqFrom":"given","roq":300,"shelf":0,"avgF":"mid"}
The same weekly working on Study Material Illustration 5, component A, built one level at a time.
:::

:::: example Syrup that keeps for eight days
Tapri's café chain makes cardamom syrup base, used evenly at 600 litres a working day. It must be used within 8 days of the goods received note, or it is thrown away. Deliveries take 2 to 4 days. To get a 6% discount, the purchase team orders 6,000 litres at a time.

**Required:**

(i) Calculate the re-order level and the minimum stock level.

(ii) Calculate the maximum stock level.

(iii) Comment on the order size.

::: answer Show the working
Consumption is even, so maximum, minimum and average consumption are all 600 litres a day; average lead time = (2 + 4) ÷ 2 = 3 days.

**(i)** Re-order level = 600 × 4 = **2,400 litres**. Minimum level = 2,400 − (600 × 3) = **600 litres**.

**(ii)** By the formula, maximum level = 2,400 + 6,000 − (600 × 2) = 7,200 litres. But the syrup must be used within 8 days, so no more than 8 days' consumption, 600 × 8 = 4,800 litres, can usefully be held. The maximum stock level is the lower of the two: **4,800 litres**.

**(iii)** A lot of 6,000 litres is more than 8 days' consumption: at least 1,200 litres of every lot would expire before use. The 6% discount must be weighed against this loss before the policy continues; ICAI makes the same comparison in its case scenario on a perishable material (SM 2.98–2.99). See [[cma.mat.eoq|EOQ and quantity discounts]].
:::
::::

## Under the hood

### Safety stock and the cost of running out

**Stock-out** occurs "when an inventory item could not be supplied due to insufficient stock in the store"; it costs profit, overheads and goodwill. **Safety stock** is the stock maintained in excess of lead time consumption, a cushion against unexpected demand. The level is chosen by trading off the expected stock-out cost against the carrying cost (SM 2.31–2.33). This is also why ICAI writes ROL = safety stock + lead time consumption when a safety stock is given (May 2024 Q1(a)).

Suppose unexpected demand during a lead time is 0, 20 or 40 units with probabilities 0.5, 0.3 and 0.2, a unit short costs ₹100 and a unit of safety stock costs ₹15 a year to carry:

| Safety stock | Expected stock-out cost (₹) | Carrying cost (₹) | Total (₹) |
|---:|---:|---:|---:|
| 0 | (20 × 0.3 + 40 × 0.2) × 100 = 1,400 | 0 | 1,400 |
| 20 | 20 × 0.2 × 100 = 400 | 300 | 700 |
| 40 | 0 | 600 | **600** |

The least total cost is at 40 units: the optimum safety stock.

### Two formulas, two answers

ICAI's own answers sometimes reach different figures by the two routes. In the Study Material's exercise 4 the re-order level of C is 5,400 kg by "maximum usage × maximum delivery period" and 5,600 kg by "minimum level + average usage × average period", and the average stock of A is 9,000 or 10,125 kg (SM 2.88–2.89). In the January 2025 paper Q1(c), minimum consumption came out at 16,000 units through the maximum level and 2,858 through the minimum level, and both were shown. When the data are not consistent, use the primary formula, state it, and show the alternative if time permits.

### Where the levels come from in a long question

Consumption is often given per unit of product: usage per unit × weekly production (maximum, minimum, average) gives weekly consumption (SM exercise 4). Lead time can be read from dates: purchase order date to goods received date (RTP May 2020, old scheme). Inventory levels from a financing angle are in Paper 6A: [[fm.wc.inventory|management of inventory]].

## Exam angle

### What ICAI asks from this topic

::: exam Where stock levels appeared, May 2024 to September 2026
In the documents read for this lesson, stock levels appeared in 14 documents, in 11 of them together with the EOQ.

- **The full set, 5 to 8 marks**: MTP Series I for January 2025 Q3(b) and Series II Q4(a) (re-order, maximum, minimum and danger levels, 6 marks each; minimum consumption from the average; ROQ = EOQ); MTP Series I for May 2025 Q1(a) (three materials, usage per unit of product, 5 marks); MTP Series II for September 2025 Q3(a) (8 marks, with the cost of not ordering the EOQ); RTPs for September 2025 Q7 and September 2026 Q5.
- **Reverse working**: January 2025 Q1(c) (maximum and minimum consumption from given levels, 2 + 2 marks); May 2026 MCQ 11 (re-order quantity from the maximum level, 2 marks).
- **MCQs, 2 marks**: MTP Series I for January 2026 MCQ 11 and Series II MCQ 12, MTP Series I for May 2025 MCQ 13 (maximum level, some needing the EOQ first); MTP Series I for September 2026 MCQs 6 to 8 (ROQ, maximum and minimum levels of one material).
- **Perishable material**: RTP May 2024 Q1 and RTP May 2026 Q6 (maximum level capped by shelf life).
- **Safety stock**: May 2024 Q1(a) (ROL = safety stock + lead time consumption).
- **Theory**: MTP Series I for January 2026 Q6(b): explain any five methods of inventory control by setting quantitative levels (5 marks).
:::

::: exam The traps
- ROQ not given: compute the EOQ first; it feeds the maximum and average levels (MTP May 2025 MCQ 13, MTP January 2025 Q3(b)).
- Only average and maximum consumption given: minimum = 2 × average − maximum.
- Units of time: a weekly rate with lead time in days (or 25 working days a month) must be converted first.
- Perishable material: the maximum level is the lower of the formula and the shelf-life consumption.
- The danger level uses average consumption ("sometimes minimum") and the **emergency** lead time, not the normal one.
:::

::: trick ROL is "worst × worst", minimum is "ROL less normal", maximum is "ROL plus order less best"
Re-order level: maximum usage × maximum lead time. Minimum: ROL − average usage × average lead time. Maximum: ROL + ROQ − minimum usage × minimum lead time. Holds for ICAI's primary formulas; the alternative ROL (minimum + average × average) is the minimum formula turned around.
:::

## Answer frame

### "Distinguish between re-order level and re-order quantity" (SM 2.22–2.23)

| Re-order level | Re-order quantity |
|---|---|
| The stock level at which a fresh order is placed. | The quantity for which the purchase requisition is made. |
| Answers "when to order". | Answers "how much to order". |
| Maximum consumption × maximum re-order period. | Set considering the minimum level, re-order level, delivery time and cost; ideally the EOQ, where ordering and carrying costs together are minimum. |
| Lies between the minimum and maximum levels. | Added to the re-order level in the maximum-level formula. |

### "Explain the methods of inventory control by setting quantitative levels"

For each level: what it answers (the table in *How it works*), ICAI's definition, the formula. Five levels for five marks; end with a one-line link: all are set so that production is never interrupted (minimum, danger) and funds are not locked up (maximum).

### Short notes: danger level; maximum and minimum levels

Definition in ICAI's words, formula, and the action: at the danger level normal issues stop and only emergency issues are made; near the maximum level the store keeper stops further purchasing; at the re-order level the store keeper initiates the purchase requisition (SM 2.18).

## Common mistakes

::: mistake Hall of Shame: the re-order level built on a good day
Using average consumption × average lead time for the re-order level. On a busy week with a slow supplier, the café runs dry before the van arrives. **Fix:** ROL = maximum consumption × maximum re-order period (or minimum level + average × average).
:::

::: mistake The maximum level with the wrong subtraction
Subtracting average or maximum consumption, or the maximum lead time, in the maximum level. **Fix:** the maximum level subtracts the **minimum** consumption over the **minimum** lead time: the least that can be used before the order arrives.
:::

::: mistake The danger level on the normal lead time
Writing average consumption × average lead time for the danger level (that is part of the minimum level). **Fix:** use the lead time for **emergency** purchases.
:::

## Practice

::: quiz Check yourself
Q: A material is used at 200 to 500 units a week (average 350) and takes 3 to 6 weeks to arrive. The re-order quantity is 2,000 units. What is the maximum stock level, in units?
= 4400
> ROL = 500 × 6 = 3,000. Maximum = 3,000 + 2,000 − (200 × 3) = 4,400 units.

Q: Case scenario. Tapri's Pune store fixes for milk powder: maximum stock level 2,600 kg, re-order level 1,400 kg, minimum consumption 80 kg a day, minimum lead time 5 days. Ritu needs the re-order quantity for the purchase policy. Which is correct?
- [ ] 1,200 kg
- [x] 1,600 kg
- [ ] 1,000 kg
- [ ] 2,000 kg
> Maximum = ROL + ROQ − (min. consumption × min. lead time): 2,600 = 1,400 + ROQ − 400, so ROQ = 1,600 kg. 1,200 forgets the 400 kg subtraction; 2,000 adds it twice.

Q: Average consumption is 120 kg a day and maximum consumption 150 kg a day. The lead time is 8 to 12 days. What is the minimum stock level, in kg?
= 600
> ROL = 150 × 12 = 1,800. Average lead time = 10 days. Minimum = 1,800 − (120 × 10) = 600 kg.

Q: Which formula gives the danger level?
- [ ] Maximum consumption × maximum lead time
- [ ] Re-order level − average consumption × average lead time
- [x] Average consumption × lead time for emergency purchases
- [ ] Minimum level + ½ re-order quantity
> The danger level is where normal issues stop and only emergency issues are made: average (sometimes minimum) consumption × emergency lead time. The others are the re-order, minimum and average levels.

Q: A perishable material is used evenly at 300 kg a day and must be used within 6 days. Deliveries take 1 to 3 days and it is ordered 3,000 kg at a time. What is the maximum stock level, in kg?
= 1800
> By the formula: ROL = 300 × 3 = 900; maximum = 900 + 3,000 − 300 × 1 = 3,600 kg. Shelf life allows only 6 days' use, 300 × 6 = 1,800 kg; the maximum level is the lower, 1,800 kg.
:::

## Recap

- Re-order level = maximum consumption × maximum re-order period (or minimum level + average consumption × average period).
- Minimum level = re-order level − average consumption × average re-order period.
- Maximum level = re-order level + re-order quantity − minimum consumption × minimum re-order period.
- Average level = minimum + ½ ROQ, or (maximum + minimum) ÷ 2. Danger level = average consumption × emergency lead time.
- Re-order quantity not given: use the EOQ, √(2AO/C).
- Missing minimum consumption: 2 × average − maximum. Same time units throughout.
- Perishable material: maximum level is the lower of the formula and shelf-life consumption.
- Safety stock: optimum where expected stock-out cost + carrying cost is least; ROL = safety stock + lead time consumption. (Kesar's lakh packs: no.)

## Flashcards

Q:: Formula: re-order level (two ways)?
A:: Maximum consumption × maximum re-order period; or minimum stock level + (average consumption × average re-order period).

Q:: Formula: minimum stock level?
A:: Re-order level − (average consumption × average re-order period).

Q:: Formula: maximum stock level?
A:: Re-order level + re-order quantity − (minimum consumption × minimum re-order period). The re-order quantity may be the EOQ.

Q:: Formula: average stock level (two ways)?
A:: Minimum stock level + ½ re-order quantity; or (maximum level + minimum level) ÷ 2.

Q:: Danger level: definition and formula?
A:: The level at which normal issues of raw material are stopped and only emergency issues are made. Average consumption (sometimes minimum) × lead time for emergency purchase.

Q:: ICAI's definition of minimum stock level?
A:: The lowest level of material stock which must be maintained in hand at all times, so that there is no stoppage of production due to non-availability of inventory.

Q:: What is lead time (re-order period)?
A:: The time required to get an order from the supplier to the stores; on the stock control chart, the interval between placing the order at the re-order level and receiving the material.

Q:: Re-order level vs re-order quantity?
A:: Re-order level: the stock level at which a fresh order is placed (when to order). Re-order quantity: the quantity ordered (how much), ideally the EOQ.

Q:: Minimum consumption is not given, but average and maximum are. How is it found?
A:: Average = (maximum + minimum) ÷ 2, so minimum = 2 × average − maximum.

Q:: Maximum stock level of a perishable material?
A:: The lower of the formula figure (ROL + ROQ − min. consumption × min. lead time) and the consumption during its usable life.

Q:: Safety stock: what is it, and how is its optimum level found?
A:: Stock maintained in excess of lead time consumption as a cushion against unexpected demand; the optimum is where the total of expected stock-out cost and carrying cost is least.
