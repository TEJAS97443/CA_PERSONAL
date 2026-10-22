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

:::: example Two potato suppliers: what a faster truck is worth
Tapri's samosa factory uses potatoes at 1,600 to 2,400 kg a working day, 2,000 kg on average, for 300 working days a year. Potatoes are ordered 20,000 kg at a time. Holding a kilogram in cold storage for a year costs ₹5.

| Particulars | Present supplier (Nashik) | Proposed supplier (Indore) |
|---|---|---|
| Lead time | 6 to 10 days | 1 to 3 days |
| Price | ₹20 per kg delivered | ₹20 per kg plus ₹500 per delivery |

If stock runs low, potatoes can be bought from the local mandi within 2 days.

**Required:**

(i) For each supplier, calculate the re-order level, minimum level, maximum level and average stock level.

(ii) Calculate the danger level under the present supplier.

(iii) Advise Kesar whether to switch to the Indore supplier.

::: answer Show the working
Average lead time = (minimum + maximum) ÷ 2: Nashik 8 days, Indore 2 days.

**(i) Stock levels (kg)**

| Level | Nashik | Indore |
|---|---:|---:|
| Re-order level = max. usage × max. lead time | 2,400 × 10 = **24,000** | 2,400 × 3 = **7,200** |
| Minimum = ROL − avg. usage × avg. lead time | 24,000 − 2,000 × 8 = **8,000** | 7,200 − 2,000 × 2 = **3,200** |
| Maximum = ROL + ROQ − min. usage × min. lead time | 24,000 + 20,000 − 1,600 × 6 = **34,400** | 7,200 + 20,000 − 1,600 × 1 = **25,600** |
| Average = minimum + ½ ROQ | 8,000 + 10,000 = **18,000** | 3,200 + 10,000 = **13,200** |

**(ii) Danger level** = average usage × lead time for emergency purchases = 2,000 × 2 = **4,000 kg**.

**(iii) Advice**

| Particulars | Amount (₹) |
|---|---:|
| Fall in average stock: 18,000 − 13,200 = 4,800 kg × ₹5 | 24,000 |
| Less: extra delivery charge: (6,00,000 kg ÷ 20,000 kg) = 30 deliveries × ₹500 | 15,000 |
| **Net annual saving from switching** | **9,000** |

Annual requirement = 2,000 kg × 300 days = 6,00,000 kg. The shorter lead time lowers every level that depends on it: the re-order level falls from 24,000 to 7,200 kg because far less stock must cover the wait. The Indore supplier saves ₹9,000 a year and should be preferred. With the alternative average, (maximum + minimum) ÷ 2, the averages are 21,200 and 14,400 kg and the saving is 6,800 × ₹5 − ₹15,000 = ₹19,000: the advice is the same.
:::
::::

:::: example Working backwards from the danger level
Ritu has lost her working papers for chai premix at the central store. The stock register still shows:

| Particulars | Packs |
|---|---:|
| Re-order level | 3,600 |
| Minimum stock level | 1,500 |
| Maximum stock level | 6,800 |
| Danger level | 600 |

Emergency purchases arrive in 2 days, and the danger level was set on average consumption. The maximum lead time is 9 days, and average lead time and average consumption are the averages of their maximum and minimum.

**Required:**

(i) Calculate the average consumption per day and the average lead time.

(ii) Calculate the maximum and minimum consumption per day and the minimum lead time.

(iii) Calculate the re-order quantity Ritu was using, and the average stock level.

::: answer Show the working
**(i)** Danger level = average consumption × emergency lead time: 600 = average consumption × 2, so average consumption = **300 packs a day**.

Minimum level = ROL − (average consumption × average lead time): 1,500 = 3,600 − (300 × average lead time), so average lead time = 2,100 ÷ 300 = **7 days**.

**(ii)** ROL = maximum consumption × maximum lead time: 3,600 = maximum consumption × 9, so maximum consumption = **400 packs a day**.

Minimum consumption = 2 × average − maximum = 2 × 300 − 400 = **200 packs a day**.

Minimum lead time = 2 × average − maximum = 2 × 7 − 9 = **5 days**.

**(iii)** Maximum level = ROL + ROQ − (minimum consumption × minimum lead time): 6,800 = 3,600 + ROQ − (200 × 5), so ROQ = 6,800 − 3,600 + 1,000 = **4,200 packs**.

Average stock level = minimum + ½ ROQ = 1,500 + 2,100 = **3,600 packs**; or (6,800 + 1,500) ÷ 2 = 4,150 packs. State the formula you use.
:::
::::

::::: example Diwali gift boxes: three items and one rack
For the Diwali season Tapri packs gift boxes at 500 to 900 boxes a day, 700 on average. Each box holds 2 tins of premix, 1 kulhad set and 1 greeting-card set.

| Item | Per box | Re-order quantity | Lead time (days) |
|---|---:|---:|---|
| Premix tin | 2 | 12,000 | 2 to 4 |
| Kulhad set | 1 | 8,000 | 5 to 9 |
| Card set | 1 | 20,000 | 10 to 14 |

**Required:**

(i) For each item, calculate the re-order level, the minimum level and the maximum level.

(ii) Calculate the average stock level of premix tins.

(iii) The godown has racks for only 12,000 kulhad sets. Is the present re-order quantity for kulhad sets acceptable? If not, find the largest re-order quantity that keeps the maximum level within the racks.

:::: answer Show the working
Daily usage = per box × boxes a day (minimum / average / maximum): tins 1,000 / 1,400 / 1,800; kulhad sets 500 / 700 / 900; card sets 500 / 700 / 900. Average lead times: 3, 7 and 12 days.

**(i) Levels (units)**

| Level | Tins | Kulhad sets | Card sets |
|---|---:|---:|---:|
| ROL = max. usage × max. lead time | 7,200 | 8,100 | 12,600 |
| Minimum = ROL − avg. usage × avg. lead time | 3,000 | 3,200 | 4,200 |
| Maximum = ROL + ROQ − min. usage × min. lead time | 17,200 | 13,600 | 27,600 |

Workings: tins 1,800 × 4; 7,200 − 1,400 × 3; 7,200 + 12,000 − 1,000 × 2. Kulhad sets 900 × 9; 8,100 − 700 × 7; 8,100 + 8,000 − 500 × 5. Card sets 900 × 14; 12,600 − 700 × 12; 12,600 + 20,000 − 500 × 10.

**(ii)** Average stock of tins = minimum + ½ ROQ = 3,000 + 6,000 = **9,000 tins**; or (17,200 + 3,000) ÷ 2 = 10,100 tins.

**(iii)** The maximum level of kulhad sets, 13,600, exceeds the 12,000 rack places, so an order of 8,000 can arrive when there is no room for it. Keeping the maximum level at 12,000:

$$12{,}000 = 8{,}100 + \text{ROQ} \qquad - (500 \times 5)$$

ROQ = 12,000 − 8,100 + 2,500 = **6,400 kulhad sets**. Order 6,400 sets at a time (or add rack space): the re-order and minimum levels do not change, because they do not depend on the order size.
::::
:::::

::: lab eoq {"mode":"levels","unit":"units","per":"week","ubasis":"all","umin":25,"uavg":50,"umax":75,"lmin":4,"lmax":6,"ltMid":true,"lemerg":0,"rolFrom":"max","roqFrom":"given","roq":300,"shelf":0,"avgF":"mid"}
The same weekly working on Study Material Illustration 5, component A, built one level at a time.
:::

:::: example The Sunday stock-out: a post-mortem
The manager of Tapri's Bhopal café orders chai premix whenever stock falls to the re-order level, 1,200 packs at a time. Usage is 30 to 70 packs a day, 50 on average; the supplier takes 3 to 7 days, 5 on average. The manager set the re-order level at average usage × average lead time. In the week of the stock-out the order was placed on Monday morning when stock touched that level; customers took 70 packs every day, and the van came after 7 days.

**Required:**

(i) What re-order level did the manager use? How many packs could the café not serve before the van arrived?

(ii) Calculate the re-order level, minimum level and maximum level by ICAI's formulas.

(iii) With the re-order level in (ii), how much stock would be left when the van arrives in the worst week (70 packs a day, 7 days), a normal week (50 a day, 5 days) and the best week (30 a day, 3 days)? Relate each answer to a level in (ii).

::: answer Show the working
**(i)** The manager's re-order level = 50 × 5 = **250 packs**. In the worst week the café needed 70 × 7 = 490 packs before the van came. The 250 packs ran out after 250 ÷ 70 ≈ 3.6 days, and **240 packs** (490 − 250) could not be served.

**(ii)** ICAI's levels:

| Level | Working | Packs |
|---|---|---:|
| Re-order level | Max. usage × max. lead time = 70 × 7 | **490** |
| Minimum level | ROL − avg. usage × avg. lead time = 490 − 50 × 5 | **240** |
| Maximum level | ROL + ROQ − min. usage × min. lead time = 490 + 1,200 − 30 × 3 | **1,600** |

**(iii)** Stock left when the van arrives, starting from the re-order level of 490:

| Week | Used before delivery | Left on arrival | Level it matches |
|---|---:|---:|---|
| Worst: 70 × 7 | 490 | 0 | the re-order level covers exactly the worst case |
| Normal: 50 × 5 | 250 | 240 | minimum level |
| Best: 30 × 3 | 90 | 400 | 400 + 1,200 delivered = 1,600, the maximum level |

So the re-order level is built for the worst week, the minimum level is the stock normally left when supplies arrive, and the maximum level is the highest stock can reach, in the best week. A re-order level on averages protects only the normal week.
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
Q: Maida is used at 80 to 140 kg a working day, and the factory works 6 days a week. Deliveries take 1 to 2 weeks, and 3,000 kg are ordered at a time. What is the maximum stock level, in kg?
= 4200
> Put both in days first: lead time 6 to 12 working days. ROL = 140 × 12 = 1,680 kg. Maximum = 1,680 + 3,000 − (80 × 6) = 4,200 kg. Mixing a daily rate with weeks (140 × 2) gives nonsense.

Q: Case scenario. At Tapri's Pune store the re-order level for milk powder is 1,500 kg, average consumption is 90 kg a day and the average lead time is 10 days. Ritu's report shows an average stock level of 1,700 kg, worked as minimum level + ½ re-order quantity. What re-order quantity is the store using?
- [ ] 1,100 kg
- [ ] 400 kg
- [x] 2,200 kg
- [ ] 3,400 kg
> Minimum level = 1,500 − (90 × 10) = 600 kg. Then 1,700 = 600 + ½ ROQ, so ROQ = 2 × 1,100 = 2,200 kg. 1,100 kg forgets to double the half; 400 kg treats the re-order level as the minimum; 3,400 kg doubles the average and ignores the minimum level.

Q: Average consumption is 120 kg a day and maximum consumption 150 kg a day. The lead time is 8 to 12 days. What is the minimum stock level, in kg?
= 600
> ROL = 150 × 12 = 1,800. Average lead time = 10 days. Minimum = 1,800 − (120 × 10) = 600 kg.

Q: Which formula gives the danger level?
- [ ] Maximum consumption × maximum lead time
- [ ] Re-order level − average consumption × average lead time
- [x] Average consumption × lead time for emergency purchases
- [ ] Minimum level + ½ re-order quantity
> The danger level is where normal issues stop and only emergency issues are made: average (sometimes minimum) consumption × emergency lead time. The others are the re-order, minimum and average levels.

Q: Fresh paneer for the kathi-roll counters is used evenly at 250 kg a day and must be used within 5 days of receipt. Deliveries take 1 to 2 days. What is the largest order size, in kg, that keeps the maximum stock level within 5 days' consumption?
= 1000
> Shelf-life limit = 250 × 5 = 1,250 kg. ROL = 250 × 2 = 500 kg. Maximum = 500 + ROQ − (250 × 1) = 250 + ROQ, which must not exceed 1,250, so ROQ = 1,000 kg. Ordering 1,250 kg forgets the 250 kg still on hand when the fastest delivery arrives.
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
