---
id: cma.mat.losses
title: Waste, scrap, spoilage, defectives and obsolescence
minutes: 25
needs: cma.mat.ratios
tags: waste, scrap, spoilage, defectives, obsolescence, normal loss, abnormal loss, rework
labs:
summary: The five forms of material loss in ICAI's words, how each is treated when normal and when abnormal, and the spoiled and defective work rules ICAI keeps asking.
---

## In plain words

### Kesar's miscellaneous drawer

At the end of the festive rush Ritu walks the samosa factory with a clipboard. Flour dust lies under the sieves. A tub of dough trimmings waits for the cattle-feed dealer, who pays ₹10 a kg. A tray of samosas burnt black in a fryer that overheated. Two hundred samosas with torn corners, which a worker is re-folding with fresh dough. And in the godown, 1,50,000 printed pouches with the old logo, useless since the rebranding.

> **Kesar:** Burnt samosas, dust, old pouches. Put it all under miscellaneous expenses. Sab adjust ho jayega.
> **Ritu:** Some of it adjusts into the cost of the good samosas. The rest is a loss, and a loss does not hide inside a samosa's price.

Each pile is a different kind of loss. The dust is **waste**: material lost in storage or production and thrown away. The trimmings are **scrap**: discarded bits of the output with a small value. The burnt tray is **spoilage**: damaged beyond economic repair. The torn samosas are **defectives**: below standard, but fixable with extra work. The pouches are **obsolescence**: material that lost its value because something replaced it.

Ritu sorts each pile by one question: was the loss **normal** (inherent in the operation, expected) or **abnormal** (avoidable, beyond the expected)? A normal loss is part of the cost of making good output, so the good samosas carry it, less whatever the loss sells for. An abnormal loss is kept out of product cost and goes to the **Costing Profit and Loss Account**. Obsolete material is always abnormal.

::: analogy The tailor's floor
In a tailor's shop, the fluff and thread ends swept up each evening are waste; the cloth offcuts sold to a quilt-maker are scrap; the shirt cut wrong beyond saving is spoilage; the shirt with a crooked collar that is re-stitched is a defective; and last season's print nobody will buy is obsolete. A good tailor prices the expected offcuts into every shirt, but never the shirt a careless cutter ruined.
:::

::: key
Normal losses are inherent and are borne by the good units, net of any realisable value; abnormal losses are avoidable and are charged to the Costing Profit and Loss Account after crediting any realisable value. Obsolete material is a total loss, abnormal by definition, and never part of the cost of manufacture.
:::

## How it works

### The five forms of loss

Loss of materials during handling, storage or process may occur as waste, scrap, spoilage, defectives or obsolescence (SM 2.64).

::: diagram The five forms of material loss (SM 2.64–2.68)
{"type": "layers", "layers": [
  {"label": "Waste", "note": "lost in storage or production, and discarded", "right": "value or none"},
  {"label": "Scrap", "note": "output discarded without further treatment", "right": "nil or small value"},
  {"label": "Spoilage", "note": "badly damaged, cannot be rectified economically", "right": "disposed of"},
  {"label": "Defectives", "note": "below quality standard: reworks or rejects", "right": "rectified or sold lower"},
  {"label": "Obsolescence", "note": "loss in intrinsic value due to supersession", "right": "always abnormal"}],
 "caption": "From input to output: waste is lost from the material, scrap comes off the output, spoilage and defectives are output that fails the standard, obsolescence is value lost while the material sits."}
:::

::: definition Waste
The portion of raw material which is lost during storage or production and discarded. The waste may or may not have any value. (SM 2.64)
:::

::: definition Scrap
The materials that result from production which are discarded and disposed-off without further treatment. Generally, scrap has either no value or insignificant value; sometimes it may be reintroduced into the process as raw material. (SM 2.64)
:::

::: definition Spoilage
Materials which are badly damaged in manufacturing operations, do not meet the specification required by the customers, cannot be rectified economically, and are taken out of the process to be disposed of in some manner without further processing. (SM 2.64)
:::

::: definition Defectives
Those units or portions of production which do not meet the quality standards. Defectives that can be re-made to the standard with additional materials are **reworks** (repairs, reconditioning, refurbishing); those that cannot are **rejects**, which may be disposed of or recycled. (SM 2.65)
:::

Defectives arise due to sub-standard materials, bad supervision, bad planning, poor workmanship, inadequate equipment and careless inspection (SM 2.65).

::: definition Obsolescence
"The loss in the intrinsic value of an asset due to its supersession"; in simple words, the loss in value due to technological advancements. (SM 2.67)
:::

### The treatment, in ICAI's words

*This table is the heart of every theory answer on the topic: learn it row by row.*

| Loss | Normal | Abnormal |
|---|---|---|
| Waste | Cost absorbed by good production units | Cost transferred to Costing Profit and Loss Account |
| Scrap | Cost borne by good units; income from its realisable value deducted from the cost | Scrap account charged with full cost and the job or process credited; profit or loss on realisation to Costing Profit and Loss Account |
| Spoilage | Included in costs: charged to the production order, or to production overhead so that it is spread over all products; any value realised credited to the order or the overhead account | Cost charged to Costing Profit and Loss Account |
| Defectives | Cost less realisable value charged to material cost of good production | Not included in material cost; treated as a loss after crediting realisable value, transferred to Costing Profit and Loss Account |
| Obsolescence | – | Always abnormal: a total loss; dispose of at the best available price; not part of the cost of manufacture |

Sources: SM 2.64–2.68. One exception for spoilage: "When spoiled work is the result of rigid specification, the cost of spoiled work is absorbed by good production while the cost of disposal is charged to production overhead" (SM 2.65).

::: diagram Which way does a loss go?
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "A loss of material"},
  {"id": "n", "kind": "decision", "label": "Normal?"},
  {"id": "g", "kind": "end", "label": "Good units\n(net of value)", "color": "c"},
  {"id": "p", "kind": "end", "label": "Costing P&L\n(net of value)", "color": "bad"}],
 "edges": [["s", "n"], ["n", "g", "yes"], ["n", "p", "no"]],
 "caption": "Normal means inherent in the operation. Amber end: borne by the good units, less what the loss realises. Rose end: abnormal, kept out of product cost. Obsolete material always takes the rose path."}
:::

### Obsolescence: three ways material becomes useless

Materials may become obsolete (SM 2.67): (i) a spare part or component of a machine used in manufacturing that is now obsolete; (ii) material used for a product that has itself become obsolete; (iii) material replaced by another because of improved quality or a fall in price. ==In all three cases the value of the obsolete material held in stock is a total loss== and immediate steps should be taken to dispose of it at the best available price; the loss is abnormal and does not form part of the cost of manufacture (SM 2.68).

### Reclaiming what you can from defective units

For spoiled articles, ICAI's five steps to reclaim as much of the loss as possible (SM 2.66):

::: steps
1. Send all defective units to a place fixed for the purpose.
2. Dismantle them.
3. Separate good and serviceable parts and take them back into stock.
4. Send parts that further work can make serviceable to the workshop, and take them into stock once the defects are removed.
5. Collect parts that cannot be made serviceable in one place, to be melted or sold off.
:::

Printed forms should record the quantities at every stage (SM 2.66).

### Spoiled and defective work in a job or batch

The Job Costing chapter treats the same losses by circumstance, and ICAI has asked this table three times since May 2024 (SM 9.6–9.7; [[cma.job.job|job costing]]). **Spoiled work** is the quantity of production totally rejected that cannot be rectified; **defective work** is production not as perfect as the saleable product but capable of being rectified, provided some additional expenditure is incurred.

| Circumstance | Treatment (SM 9.7) |
|---|---|
| A percentage of defective work is allowed in a batch, as it cannot be avoided | Defectives within or near the normal limit: cost of rectification charged to the whole job and spread over the batch's output. Defectives substantially exceeding the normal: rectification of the excess written off as a loss in Costing Profit and Loss Account |
| Defect due to bad workmanship | Rectification is an abnormal cost, written off as a loss (unless recovered as a penalty from the workman); if management provided for a proportion of such defectives as unavoidable, rectification up to that extent is a normal cost charged to the batch |
| Defect due to the Inspection Department wrongly accepting incoming material of poor quality | Rectification charged to that department, not to the cost of manufacture of the batch; being abnormal, written off to Costing Profit and Loss Account |

Where the defectives are inherent in the manufacturing process, the rectification cost may be charged to the specific jobs in which they arose; if they cannot be identified with jobs, it may be treated as factory overheads. Abnormal defectives are written off to the Costing Profit and Loss Account (SM 9.10).

## Formats and formulas

*Reproduce the cost-per-good-unit formula and the spoilage entry from memory.*

::: formula Cost of a good unit when there is a normal loss
$$\text{Cost per good unit} = \frac{T - R}{I - N}$$
T = total cost; R = realisable value of the normal loss (scrap value less cost to sell); I = input units; N = normal loss units. An abnormal loss unit is valued at the same cost as a good unit (SM 10.7–10.9).
:::

::: formula Splitting a spoilage between normal and abnormal
$$\text{Abnormal} = \text{Actual} - \text{Normal spoilage}$$
Any realisable value of the spoiled work is apportioned between the two in the ratio of their quantities (SM 9.10).
:::

**Costing journal for spoilage in a job** (SM 9.10):

| Account | Dr | Cr |
|---|---|---|
| Material (Stores) Control A/c, with the realisable value | xxx | |
| Overhead Control A/c, with the normal spoilage less its share of realisable value | xxx | |
| Costing Profit and Loss A/c, with the abnormal spoilage less its share of realisable value | xxx | |
| To Work-in-Progress Control A/c, with the total cost of spoiled work | | xxx |

## Worked examples

:::: example Kulhads from the kiln: two jobs and a failed thermostat
Tapri's kulhad unit fires clay cups in batches for café orders. Some cracking in the kiln is inherent: the normal rate of spoilage is 4% of the kulhads fired. Cracked kulhads are sold to a nursery as pot filler at ₹1 each. October's two jobs:

| Job | Kulhads fired | Manufacturing cost (₹) | Cracked |
|---|---:|---:|---:|
| K1 | 12,000 | 72,000 | 360 |
| K2 | 15,000 | 90,000 | 1,350 |

The kiln's thermostat failed during Job K2.

**Required:**

(i) Separate the normal and abnormal spoilage of each job and record them in the costing journal, charging normal spoilage to production overhead.

(ii) Show how the entry for Job K2 changes if normal spoilage is charged to the job itself, and calculate K2's cost per good kulhad under each treatment.

::: answer Show the working
**Working note: spoilage of each job** (cost per kulhad fired = ₹72,000 ÷ 12,000 = ₹90,000 ÷ 15,000 = ₹6)

| Particulars | K1 | K2 |
|---|---:|---:|
| Normal spoilage allowed (4% of kulhads fired) | 480 | 600 |
| Actual spoilage | 360 | 1,350 |
| Normal spoilage (kulhads) | 360 | 600 |
| Abnormal spoilage (kulhads) | Nil | 750 |
| Cost of normal spoilage @ ₹6 (₹) | 2,160 | 3,600 |
| Cost of abnormal spoilage @ ₹6 (₹) | Nil | 4,500 |

K1's spoilage is within the normal rate, so all of it is normal. The realisable value is known per kulhad (₹1), so each part is credited with its own units: K1 ₹360; K2 normal ₹600 and abnormal ₹750.

**(i) Costing journal (normal spoilage charged to production overhead)**

| Account | Dr (₹) | Cr (₹) |
|---|---:|---:|
| Material Control A/c (realisable value) | 360 | |
| Overhead Control A/c (₹2,160 − ₹360) | 1,800 | |
| To Work-in-Progress Control A/c (Job K1) | | 2,160 |
| (Being normal spoilage of Job K1) | | |
| Material Control A/c (realisable value) | 1,350 | |
| Overhead Control A/c (₹3,600 − ₹600) | 3,000 | |
| Costing Profit and Loss A/c (₹4,500 − ₹750) | 3,750 | |
| To Work-in-Progress Control A/c (Job K2) | | 8,100 |
| (Being spoilage of Job K2: normal to overheads, abnormal to Costing P&L) | | |

**(ii) Normal spoilage charged to the job (Job K2)**

| Account | Dr (₹) | Cr (₹) |
|---|---:|---:|
| Material Control A/c (realisable value) | 1,350 | |
| Costing Profit and Loss A/c (₹4,500 − ₹750) | 3,750 | |
| To Work-in-Progress Control A/c (Job K2) | | 5,100 |
| (Being abnormal spoilage written off and value realised from normal spoilage credited to the job) | | |

The cost of normal spoilage less its value realised, ₹3,000, now stays in Job K2 instead of going to Overhead Control. The abnormal entry is the same under both treatments: an abnormal loss never reaches a product.

| Treatment | Cost left in K2 (₹) | Good kulhads | Cost per good kulhad (₹) |
|---|---:|---:|---:|
| Normal spoilage to production overhead | 90,000 − 8,100 = 81,900 | 13,650 | 6.00 |
| Normal spoilage to the job | 90,000 − 5,100 = 84,900 | 13,650 | 6.22 |

Charging production overhead spreads the normal spoilage over all products through the overhead rate; charging the job puts it on the order that caused it (SM 2.65).
:::
::::

::::: example Dough sheets: normal trimmings and an abnormal tub of scrap
The samosa factory puts 10,000 kg of refined flour, costing ₹48.40 a kg, into a month's production of dough sheets (consider material cost only). Trimmings are normally 4% of input and sell as scrap at ₹10 a kg. This month a mis-set cutter raised the trimmings to 700 kg, all sold at ₹10 a kg.

**Required:**

(i) Calculate the material cost per kg of good dough sheets.

(ii) Calculate the normal and abnormal scrap, and show the treatment of each, with the abnormal scrap account.

:::: answer Show the working
**(i) Cost per kg of good output**

Normal scrap = 4% × 10,000 = 400 kg, realisable value 400 × ₹10 = ₹4,000.

$$\text{Cost per kg} = \frac{4{,}84{,}000 - 4{,}000}{10{,}000 - 400} = \frac{4{,}80{,}000}{9{,}600} = \text{₹}50$$

**(ii) Normal and abnormal scrap**

Actual scrap 700 kg − normal 400 kg = **300 kg abnormal**; good output = 10,000 − 700 = 9,300 kg.

- **Normal scrap (400 kg)**: its cost is borne by the good units; the ₹4,000 realised is deducted from the cost. It is why each good kg costs ₹50 and not ₹48.40.
- **Abnormal scrap (300 kg)**: the scrap account is charged with its full cost at the good-unit rate, 300 × ₹50 = ₹15,000, and production is credited; the loss on realisation goes to Costing Profit and Loss Account.

::: cols Abnormal Scrap Account
| Dr. | kg | ₹ |
|---|---:|---:|
| To Production A/c | 300 | 15,000 |
| | | |
| **Total** | **300** | **15,000** |
---
| Cr. | kg | ₹ |
|---|---:|---:|
| By Cash | 300 | 3,000 |
| By Costing P&L A/c (loss) | | 12,000 |
| **Total** | **300** | **15,000** |
:::

Check: good output 9,300 × ₹50 = ₹4,65,000; + abnormal scrap ₹15,000 + normal scrap realised ₹4,000 = ₹4,84,000, the material cost. The same arithmetic, with labour and overheads added, is the process account of [[cma.proc.accounts|normal and abnormal process loss]].
::::
:::::

:::: example Five piles, five treatments
Advise Tapri's cost accountant, with reasons, on the treatment in cost accounts of each of the following at the samosa factory:

(a) Flour lost as dust in sieving, about 1% of input every month.

(b) A hotel chain's order required every samosa to weigh 60 g, give or take 1 g; 3% of production failed the specification and was sold off cheaply, and disposing of it cost ₹2,000.

(c) The batch defect rate allowed for frying is 2%; this month 7% of a batch had to be re-fried, after a new worker set the wrong temperature.

(d) Rectification of a batch made from poor-quality potatoes that the Inspection Department had wrongly accepted.

(e) 1,50,000 printed pouches with the old logo, unusable after the rebranding.

::: answer Model answer
**(a) Normal waste.** Waste is the portion of raw material lost during storage or production and discarded. A steady 1% loss in sieving is inherent in the operation, so it is normal waste: its cost is absorbed by the good production units.

**(b) Spoilage from rigid specification.** Spoilage is material badly damaged or not meeting the customer's specification that cannot be rectified economically. When spoiled work is the result of a rigid specification, the cost of the spoiled work is absorbed by good production, while the cost of disposal (₹2,000) is charged to production overhead (SM 2.65).

**(c) Defectives, partly normal.** A normal rate of 2% has been established. The cost of rectifying defectives up to that limit is charged to the whole batch and spread over its output; the 5% substantially above the normal, caused by bad workmanship, is abnormal: the cost of rectifying it is written off as a loss in the Costing Profit and Loss Account (SM 9.7).

**(d) Defect due to the Inspection Department.** The cost of rectification is charged to the Inspection Department and is not considered part of the cost of manufacture of the batch; being abnormal, it is written off to the Costing Profit and Loss Account (SM 9.7).

**(e) Obsolescence.** The pouches are material used for a design that has been superseded. The value of obsolete material in stock is a total loss; the pouches should be disposed of immediately at the best available price, and the loss (cost less the amount realised) is an abnormal loss, charged to the Costing Profit and Loss Account. It does not form part of the cost of manufacture (SM 2.67–2.68).
:::
::::

## Under the hood

### Losses on the way in and in the store

Loss before production is treated the same way. A shortage on receipt due to normal reasons (breaking of bulk, evaporation, unavoidable conditions) is absorbed by the good units, raising the rate per unit; one due to abnormal reasons (mishandling, pilferage, avoidable causes) goes to Costing Profit and Loss Account (SM 2.15; [[cma.mat.receipts|valuing material receipts]]). In the store, normal and abnormal shortages found on verification follow the same rule after being priced at the issue rate ([[cma.mat.ratios|stock discrepancies]]).

### Same idea, three chapters

Process costing values an abnormal loss unit at the cost of a good unit and adds abnormal gain (SM 10.6–10.9); batch costing has a short defective-work table (SM 8.4). The rule never changes: inherent is product cost, avoidable is a loss.

## Exam angle

::: exam Where these appeared, May 2024 to September 2026
In the ICAI documents read for this lesson:

- **Spoiled and defective work, 4 marks**: define both and give the treatment in three circumstances (a percentage of defectives allowed; bad workmanship; the Inspection Department accepting poor material): January 2025 Q5(c) (1 + 3 marks); May 2026 Q6(c), the OR option; MTP September 2025 Series II Q6(c). Three times in the period, always with the same table.
- **Waste and scrap, 5 marks**: "Distinguish between Waste and Scrap. Discuss the treatment of normal and abnormal scrap in Cost Accounts" (May 2024 Q6(b)).
- **Defectives, 5 marks**: "EXPLAIN Defectives unit and its treatment. Also EXPLAIN the process of Reclamation of loss from defective units" (MTP September 2025 Series I Q6(b)).
- **Scrap against defectives**: wooden pieces damaged in cutting and sold as waste, against tables with rough edges corrected with extra labour (RTP May 2026 Q17(b)); the answer is ICAI's four-point table and both treatments.
- **Multiple choice, 2 marks**: the abnormal loss during storage, at the average price, to be transferred to Costing Profit and Loss Account (September 2024 MCQ 10).
:::

::: exam How the suggested answers earn the marks
They reproduce the Study Material: the definition first, then "Normal –" and "Abnormal –" in ICAI's wording, and distinctions as a numbered two-column table (May 2024 Q6(b); RTP May 2026 Q17(b)). The defective-work answer is the three-row circumstance table, word for word (January 2025, May 2026).
:::

::: trick "Inherent goes in, avoidable goes out"
Normal = inherent in the operation: cost stays in the good units, less what the loss sells for. Abnormal = avoidable or beyond the normal: cost goes to Costing Profit and Loss, after what it sells for. Conditions: two exceptions to remember, rigid-specification spoilage (absorbed by good production, disposal cost to production overhead) and obsolescence (always abnormal).
:::

## Answer frame

### Distinguish between waste and scrap (SM 2.64, 2.66)

ICAI's suggested answer to May 2024 Q6(b) puts the two definitions first, then the Study Material's three points:

| Waste | Scrap |
|---|---|
| 1. The portion of raw material which is lost during storage or production and discarded | 1. The output which is discarded and disposed of without further treatment |
| 2. Connected with raw material or inputs to the production process | 2. The loss connected with the output |
| 3. May be visible or invisible | 3. Generally identifiable and has physical substance |
| 4. Generally has no recoverable value | 4. Termed as by-products and has small recoverable value |

### Distinguish between scrap and defectives (SM 2.67)

| Scrap | Defectives |
|---|---|
| 1. Loss connected with the output | 1. Connected with the output as well as the input |
| 2. Not intended, but cannot be eliminated due to the nature of material or process | 2. Not intended, but can be eliminated through a proper control system |
| 3. Generally not used or rectified | 3. Can be used after rectification |
| 4. Insignificant recoverable value | 4. Sold at a lower value than the good one |

**Spoilage against defectives** (SM 2.67): spoilage cannot be repaired or reconditioned, while defectives can be rectified and transferred back to standard production or to the seconds; the problem in accounting for defective work is the cost of rectification or rework.

### Three answers to "Discuss the treatment of normal and abnormal scrap"

::: cols
**Loses marks**

"Normal scrap is absorbed; abnormal scrap goes to P&L."

No realisable value, no scrap account, no credit to the job.
---
**Passes**

"Normal: cost borne by good units, realisable value deducted. Abnormal: written off to Costing P&L."

Normal is right; abnormal skips the scrap account at full cost.
---
**Full marks**

The definition first. Normal: cost of scrap borne by good units, income from its realisable value deducted from the cost. Abnormal: scrap account charged with full cost, job or process credited, profit or loss on realisation to Costing Profit and Loss Account.
:::

## Common mistakes

::: mistake Hall of Shame: Kesar's miscellaneous drawer
Lumping all losses into one "miscellaneous" figure in the cost sheet. **Fix:** split each loss into normal (stays in product cost) and abnormal (Costing Profit and Loss Account); an abnormal loss inside product cost overstates the cost of every good unit and hides the inefficiency.
:::

::: mistake Abnormal scrap valued at its sale price
Crediting production with only the ₹3,000 the abnormal trimmings fetched. **Fix:** the scrap account is charged with the **full cost** (300 kg × ₹50 = ₹15,000); production is credited with that, and only the ₹12,000 shortfall on realisation goes to Costing Profit and Loss.
:::

::: mistake Obsolete stock carried at cost "until it is used"
**Fix:** obsolete material is a total loss: dispose of it at the best available price and charge the loss to Costing Profit and Loss; it is never part of the cost of manufacture.
:::

::: mistake Every defect written off
Writing off all rectification costs as abnormal. **Fix:** rectification within the normal rate of defectives (or the proportion management provided for) is a normal cost charged to the batch; only the excess, or defects caused by the Inspection Department's error, are written off.
:::

## Practice

::: quiz Check yourself
Q: A batch of 2,000 samosas allows a normal rate of defectives of 2%. This month 150 samosas came out with torn corners and were re-folded at a rectification cost of ₹3 each. Defectives this far above the normal rate are treated as abnormal. How much rectification cost is written off to the Costing Profit and Loss Account, in rupees?
= 330
> Normal defectives = 2% × 2,000 = 40; their rectification (40 × ₹3 = ₹120) is charged to the batch and spread over its output. The excess 110 samosas cost 110 × ₹3 = ₹330 to rectify, written off to Costing Profit and Loss (SM 9.7). Writing off all 150 (₹450) ignores the normal rate.

Q: Case scenario. After Tapri's rebranding, 1,50,000 pouches printed with the old logo, costing ₹1.20 each, are sold as waste paper for ₹15,000. Kesar wants to add their cost to the cost of the new pouches "since packaging is packaging". Which of the following is correct?
- [ ] Add ₹1,80,000 to the cost of the new pouches, spread over this year's production
- [x] Charge the net loss of ₹1,65,000 to the Costing Profit and Loss Account as an abnormal loss
- [ ] Charge ₹1,65,000 to factory overhead as a normal loss of the packing department
- [ ] Keep the pouches in stock at cost until a use is found for them
> Material that has become obsolete is a total loss; it is disposed of at the best price and the loss (₹1,80,000 − ₹15,000) is abnormal, not part of the cost of manufacture (SM 2.68).

Q: Case scenario. Decanting bulk ghee into 1-litre tins normally loses 0.5% of the ghee, which clings to the drums. In March a worn valve on the decanting machine raised the loss to 1.2%. Which treatment is correct?
- [ ] Absorb the whole 1.2% in the cost of the good tins, since decanting losses are inherent
- [ ] Charge the whole 1.2% to Costing Profit and Loss Account, since the loss exceeded the normal rate
- [ ] Charge 0.5% to Costing Profit and Loss Account and absorb 0.7% in the good tins
- [x] Absorb 0.5% in the cost of the good tins and charge the cost of the other 0.7% to Costing Profit and Loss Account
> Only the loss inherent in the operation (0.5%) is normal and borne by the good units. The extra 0.7% arose from an avoidable cause, the worn valve, so it is abnormal and goes to Costing Profit and Loss. Exceeding the normal rate does not make the normal part abnormal.

Q: Which of these statements are true of defectives, as distinct from scrap? Select all that apply.
- [x] They can be used after rectification
- [x] The loss is connected with the output as well as the input
- [ ] They generally have insignificant recoverable value
- [ ] They cannot be eliminated because of the nature of the material or process
> Defectives can be rectified, are connected with input and output, can be eliminated through proper control, and sell below the good units. Insignificant value and "cannot be eliminated" describe scrap (SM 2.67).

Q: A customer's rigid weight specification makes 3% of a samosa order fail and be scrapped. How is it treated?
- [ ] The whole cost of the spoiled work goes to Costing Profit and Loss Account
- [x] The cost of spoiled work is absorbed by good production; the cost of disposal is charged to production overhead
- [ ] The cost of spoiled work is charged to production overhead; the cost of disposal to Costing Profit and Loss Account
- [ ] The spoiled work is carried in stock at full cost
> The Study Material's rule for spoilage caused by rigid specification (SM 2.65). Sending it to Costing P&L treats an expected consequence of the order as abnormal.
:::

## Recap

- Five forms: waste (lost, discarded), scrap (discarded output, small value), spoilage (beyond economic repair), defectives (below standard: reworks or rejects), obsolescence (value lost to supersession).
- Normal loss: borne by good units, net of realisable value. Abnormal loss: Costing Profit and Loss Account, after realisable value.
- Scrap: normal, realisable value deducted from cost; abnormal, scrap account at full cost, job credited, loss on realisation to Costing P&L.
- Spoilage: normal, charged to the production order or production overhead; abnormal, Costing P&L; rigid specification, absorbed by good production with disposal cost to production overhead.
- Defectives: normal, cost less realisable value to material cost of good production; abnormal, Costing P&L after crediting realisable value.
- Defective work by circumstance: allowed percentage, to the batch (excess written off); bad workmanship, written off; Inspection Department's error, charged to it and written off.
- Obsolescence: always abnormal, total loss, dispose at the best price. (The tailor prices in the offcuts, never the ruined shirt.)

## Flashcards

Q:: ICAI's definition of waste, and its treatment?
A:: The portion of raw material lost during storage or production and discarded (it may or may not have value). Normal: absorbed by good units. Abnormal: transferred to Costing Profit and Loss Account.

Q:: Treatment of normal and abnormal scrap?
A:: Normal: cost borne by good units; realisable value deducted from the cost. Abnormal: scrap account charged with full cost, job or process credited; profit or loss on realisation to Costing Profit and Loss Account.

Q:: Treatment of normal and abnormal spoilage?
A:: Normal: included in costs, charged to the production order or to production overhead; value realised credited to it. Abnormal: charged to Costing Profit and Loss Account.

Q:: Spoiled work caused by rigid specification: treatment?
A:: Cost of spoiled work absorbed by good production; cost of disposal charged to production overhead.

Q:: Treatment of normal and abnormal defectives?
A:: Normal: cost less realisable value charged to material cost of good production. Abnormal: excluded from material cost, treated as a loss after crediting realisable value, transferred to Costing Profit and Loss Account.

Q:: Reworks and rejects?
A:: Reworks: defectives re-made to standard with additional material (repairs, reconditioning, refurbishing). Rejects: defectives that cannot reach the standard; disposed of or recycled.

Q:: Define obsolescence and state its treatment.
A:: The loss in the intrinsic value of an asset due to its supersession. Obsolete material is a total loss, disposed of at the best price; the loss is abnormal and not part of the cost of manufacture.

Q:: Three circumstances in which materials become obsolete?
A:: A spare part or component of a machine that is now obsolete; material for a product that has become obsolete; material replaced by another due to improved quality or a fall in price.

Q:: Defect due to the Inspection Department wrongly accepting poor material: treatment?
A:: Rectification charged to the department, not to the batch's cost of manufacture; written off to Costing Profit and Loss Account as abnormal.

Q:: Waste against scrap: three differences?
A:: Waste is connected with input, may be invisible, generally has no recoverable value. Scrap is connected with output, identifiable with physical substance, small recoverable value (termed by-products).

Q:: The five steps of reclaiming loss from defective units?
A:: Send to a fixed place; dismantle; take good parts into stock; send repairable parts to the workshop, then to stock; collect unusable parts to be melted or sold off.
