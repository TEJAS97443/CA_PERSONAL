---
id: cma.joint.byprod
title: Treatment of by-products
minutes: 26
needs: cma.joint.apportion
tags: by-products, joint products, net realisable value, comparative price, re-use basis, technical estimates, credit for recoveries
labs: joint
summary: What makes a by-product, ICAI's four ways of valuing it, and its three treatments in cost accounts: small value, considerable value, and value only after further processing.
---

## In plain words

### Kesar finds money on the floor

Every evening at Tapri's tea factory the sorting room is swept. The sweepings (fibre, stalks and fluff) are cleaned, bagged and sold to a caffeine-extraction plant in Guwahati. A month's sweepings fetch about ₹1 lakh. A month's tea fetches about ₹70 lakh.

> **Kesar:** Free money! Put it in miscellaneous income.
> **Ritu:** It is not free, Kesar-ji. It came out of the same green leaf, and the cleaning and freight cost us.
> **Kesar:** Fine. Then miscellaneous income, minus cleaning.
> **Ritu:** That is one of the ways ICAI allows. The question is which way is right for us.

The sweepings are a **by-product**: something recovered incidentally while making the main products, worth little compared with them. Nobody runs a tea factory for the fluff. So the fluff is not given its own share of the joint cost the way Leaf and Brokens are. Instead, what it brings in, after the costs of cleaning and selling it (its **net realisable value**), either lowers the cost of the main products or is shown as other income in the Costing Profit and Loss Account.

That holds only while the by-product stays small. If caffeine prices tripled and the sweepings started earning as much as the Brokens, they would have to be treated as a **joint product** and carry a share of the joint cost.

::: analogy The barber's floor
A barber sweeps up the hair and sells it to a wig-maker. Nobody opens a salon for the hair; the wig money just makes each haircut a little cheaper to provide. If wigs became so profitable that the hair earned as much as the haircuts, the barber would have to start costing the hair as a product of its own.
:::

::: key
A by-product is recovered incidentally and is of small value compared with the main product. Its realisation, net of the costs of processing and selling it, is credited (to the cost of the main product, or to the Costing Profit and Loss Account when small) instead of the by-product carrying a share of joint cost; once its value is considerable, it is treated as a joint product.
:::

## How it works

### What ICAI calls a by-product

::: definition By-products
Products recovered from material discarded in a main process, or from the production of some major products, where the material value is to be considered at the time of severance from the main product. In a nutshell, a product recovered incidentally from the material used in the manufacture of main or desired products, having either a net realisable value or a usable value which is relatively insignificant in comparison with the saleable value of the main or desired products. By-products may be further processed to increase their realisable value. (SM 11.2–11.3)
:::

ICAI's examples: **molasses** in the manufacture of sugar; **tar, ammonia and benzole** obtained on carbonisation of coal; **glycerin** obtained in the manufacture of soap (SM 11.3). Its MCQs add **oil cakes** beside edible oils (SM 11.21, MCQ 7; key (b) on SM 11.29).

### Joint product or by-product?

::: compare
| Point | Joint products | By-products |
|---|---|---|
| Importance | Of equal importance | Of small economic value |
| How produced | Simultaneously | Incidentally, in addition to the main products |
| Cost up to split-off | Joint cost apportioned on a rational basis | Realisation credited: deducted from cost, or to Costing P&L |
| Examples | Petrol, kerosene, lubricants from crude oil | Molasses, glycerin, tar |
:::

The first two rows are ICAI's own two points of distinction (SM 11.3); the third follows from its methods (SM 11.4, 11.15).

### Four ways to put a value on a by-product

ICAI lists these methods for accounting for by-products and arriving at the cost of production of the main product, in this order (SM 11.15–11.16):

::: steps
1. **Net realisable value method.** The realisation on the disposal of the by-product is deducted from the total cost of production to arrive at the cost of the main product: what is realised from molasses reduces the cost of sugar. If the by-product needs further processing to be saleable, deduct those expenses from its realisation and credit only the **net** realisation. Keep separate accounts for (a) further processing of the by-product and (b) selling, distribution and administration expenses attributable to it.
2. **Standard cost in technical estimates.** Value the by-product at a standard cost, set by averaging past costs and making technical estimates of how much of the original raw material goes into the main product and how much forms the by-product (or another consistent basis). Used where the by-product is not saleable in the condition in which it emerges, or comparative prices of similar products are not available.
3. **Comparative price.** Value it at the price of a similar or an alternative material. A blast furnace that makes steel for car bodies also gives gas used in the factory: value the gas at what a gas company would have charged.
4. **Re-use basis.** A by-product that can be put back into the process as part of its input is valued at the same value as the materials introduced into that process.
:::

### Three treatments in the cost accounts

ICAI's answer to "Discuss the treatment of by-product cost in cost accounting" has three cases (SM 11.17):

**(a) When they are of small total value**, the amount realised from their sale may be dealt with in either of two ways:

1. The sales value of the by-products may be credited to the **Costing Profit and Loss Account** and no credit be given in the cost accounts; the credit is treated either as **miscellaneous income** or as **additional sales revenue**.
2. The sale proceeds may be treated as **deductions from the total costs**: deducted either from the **production cost** or from the **cost of sales**.

**(b) When they are of considerable total value**, they may be regarded as joint products rather than as by-products. The costs up to the point of separation are apportioned over the by-products and joint products on a logical basis: ==relative market values, physical output (at the point of split-off) or ultimate selling prices (if sold)==.

**(c) Where they require further processing**, the net realisable value of the by-product at the split-off point is its realisable value less the further processing cost. If that total is small, treat it as in (a); if considerable, as in (b).

::: diagram How to treat a by-product (SM 11.17)
{"type": "flow", "w": 370, "nodes": [{"id": "s", "kind": "start", "label": "By-product\nat split-off"}, {"id": "f", "kind": "decision", "label": "Needs further\nprocessing?"}, {"id": "m", "kind": "process", "label": "Amount\nrealised"}, {"id": "n", "kind": "process", "label": "(c) NRV: value\nless further cost"}, {"id": "v", "kind": "decision", "label": "Total value\nsmall?"}, {"id": "a", "kind": "end", "label": "(a) Costing P&L\nor deduct", "color": "g"}, {"id": "b", "kind": "end", "label": "(b) Treat as\njoint product", "color": "d"}], "edges": [["s", "f"], ["f", "m", "no"], ["f", "n", "yes"], ["m", "v"], ["n", "v"], ["v", "a", "yes"], ["v", "b", "no"]], "caption": "Case (c) is the yes-branch: work out the NRV at split-off first, then treat it as (a) or (b). Green: case (a), small value; orange: case (b), considerable value."}
:::

::: lab joint {"mode":"byprod","method":"nrv"}
Step through Tapri's samosa crumbs: their NRV first, then the three treatments side by side, as other income, as a credit to joint cost and as a joint product.
:::

### Where the credit sits in the cost sheet

In a manufacturer's cost sheet the credit appears as "Less: Credit for Recoveries/Scrap/By-Products/misc. income" between works cost and cost of production (SM 6.9); in ICAI's words, "in case of by-products, the net realisable value of by-products is deducted from the cost of production" (SM 6.6). The full layout is in [[cma.sheet.mfg|the cost sheet for a manufacturer]].

## Formats and formulas

*Reproduce these two working notes from memory; ICAI's suggested answers open with one of them.*

::: formula Net realisable value of a by-product
$$\text{NRV} = \text{Sales value} - \text{Further processing cost} \qquad - \text{Selling, distribution, admin. cost}$$
The admin. cost counted is the administration expense attributable to the by-product (SM 11.16).
:::

::: formula Net joint cost to apportion over the main products
$$\text{Net joint cost} = \text{Joint cost} - \text{NRV of by-product}$$
Then apportion the net joint cost over the joint products by the method the question names ([[cma.joint.apportion|apportioning joint costs]]).
:::

| Calculation of net joint cost | Amount (₹) |
|---|---:|
| Joint costs | xxx |
| Less: Net realisable value of by-product | (xxx) |
| **Net joint costs to be apportioned** | **xxx** |

::: formula Joint cost carried by a by-product, when an estimated profit is given
$$\text{Joint cost of by-product} = \text{Sales} - \text{Estimated profit} \qquad - \text{Selling expenses} - \text{Cost after separation}$$
The main product bears the rest: total joint cost − joint cost of the by-products. The by-product is left with exactly its estimated profit.
:::

| Statement of joint cost allocated | By-product 1 (₹) | By-product 2 (₹) |
|---|---:|---:|
| Sales value | xxx | xxx |
| Less: Estimated profit | (xxx) | (xxx) |
| **Cost of sales** | **xxx** | **xxx** |
| Less: Estimated selling expenses | (xxx) | (xxx) |
| **Cost of production** | **xxx** | **xxx** |
| Less: Cost after separation | (xxx) | (xxx) |
| **Joint cost allocated** | **xxx** | **xxx** |

This is the layout of ICAI's suggested answers to MTP September 2024 Series I Q3(a) and MTP September 2025 Series I Q3(a), and the NRV pro-forma of SM 11.7 with its profit-margin line applied to a by-product.

## Worked examples

::::: example Tea, and the fluff on the floor
Tapri's tea factory spent ₹57,51,000 up to the sorting sieve in April 2026. Leaf and Brokens are joint products, sold at the split-off point. The sweepings are a by-product, saleable only after cleaning and bagging. The management deducts the net realisable value of the by-product from the joint cost and apportions the rest on the sales value at the split-off point.

| Particulars | Leaf | Brokens | Sweepings |
|---|---:|---:|---:|
| Output (kg) | 5,000 | 15,000 | 3,550 |
| Price at split-off (₹ per kg) | 520 | 300 | – |
| Cleaning and bagging (₹ per kg) | – | – | 5 |
| Freight to buyer (₹ per kg) | – | – | 3 |
| Selling price after cleaning (₹ per kg) | – | – | 28 |

**Required:**

(i) Calculate the net realisable value of the sweepings and the net joint cost to be apportioned.

(ii) Apportion the net joint cost between Leaf and Brokens.

(iii) Prepare a statement of profit if the joint products are sold at the split-off point.

(iv) Kesar wants the sweepings' money credited to the Costing Profit and Loss Account as miscellaneous income instead. Show the effect.

:::: answer Show the working
**(i) Net realisable value of the by-product**

| Particulars | Per kg (₹) |
|---|---:|
| Selling price after cleaning | 28 |
| Less: Cleaning and bagging | 5 |
| Less: Freight | 3 |
| **Net realisable value** | **20** |

NRV of sweepings = 3,550 kg × ₹20 = **₹71,000**.

| Calculation of net joint cost | Amount (₹) |
|---|---:|
| Joint costs | 57,51,000 |
| Less: Net realisable value of by-product | 71,000 |
| **Net joint costs to be apportioned** | **56,80,000** |

**(ii) Apportionment on sales value at split-off**

| Particulars | Leaf | Brokens | Total |
|---|---:|---:|---:|
| Output (kg) | 5,000 | 15,000 | |
| Price at split-off (₹) | 520 | 300 | |
| Sales value at split-off (₹) | 26,00,000 | 45,00,000 | 71,00,000 |
| **Net joint cost (26 : 45) (₹)** | **20,80,000** | **36,00,000** | **56,80,000** |

Multiplying factor = ₹56,80,000 ÷ ₹71,00,000 × 100 = 80%. Joint cost per kg: Leaf ₹416, Brokens ₹240.

**(iii) Profit if sold at the split-off point**

| Particulars (₹) | Leaf | Brokens | Total |
|---|---:|---:|---:|
| Sales value at split-off | 26,00,000 | 45,00,000 | 71,00,000 |
| Less: Net joint cost | 20,80,000 | 36,00,000 | 56,80,000 |
| **Profit** | **5,20,000** | **9,00,000** | **14,20,000** |

**(iv) Credit to the Costing Profit and Loss Account instead**

No credit is given in the cost accounts, so the whole ₹57,51,000 is apportioned (26 : 45). The sweepings appear in the Costing Profit and Loss Account at ₹71,000: sales of ₹99,400 (3,550 kg × ₹28) less cleaning, bagging and freight of ₹28,400.

| Particulars (₹) | Leaf | Brokens | Total |
|---|---:|---:|---:|
| Joint cost | 21,06,000 | 36,45,000 | 57,51,000 |
| Profit on the products | 4,94,000 | 8,55,000 | 13,49,000 |
| Add: Miscellaneous income | | | 71,000 |
| **Total profit** | | | **14,20,000** |

::: diagram Where the ₹71,000 from the sweepings goes
{"type": "plot", "h": 260, "x": [0.4, 2.6], "y": [0, 16], "xticks": [[1, "deduct from joint cost"], [2, "Costing P&L income"]], "yticks": [0, 4, 8, 12, 16], "ylabel": "amount (₹ lakh)", "legend": "outside", "series": [{"label": "profit on Leaf and Brokens", "bars": true, "bw": 0.3, "values": true, "color": "a", "pts": [[0.82, 14.2], [1.82, 13.49]]}, {"label": "miscellaneous income", "bars": true, "bw": 0.3, "values": true, "color": "c", "pts": [[2.18, 0.71]]}], "caption": "Blue: profit shown on the two joint products; amber: the sweepings shown as miscellaneous income. Either way the total is ₹14.20 lakh; only the product costs differ."}
:::

Both are treatments ICAI allows for a by-product of small total value (SM 11.17). Kesar's choice raises the cost of Leaf by ₹26,000 and of Brokens by ₹45,000 (₹5.20 and ₹3 a kg) and shows ₹71,000 as miscellaneous income; total profit is unchanged at ₹14,20,000. The deduction method is the one the cost sheet uses ("Less: Credit for Recoveries/Scrap/By-Products", SM 6.9), so the cost of the main products, used for pricing and inventory, is shown net of what the by-product recovers.
::::
:::::

::: lab joint {"mode":"byprod","method":"sales","jointCost":146100,"byName":"Cotton Linters","byUnits":300,"byPrice":10,"byCost":900,"products":[["Cotton Fibre",2800,90,0],["Cotton Seed",1800,60,0]],"further":[]}
Here is January 2026 Q1(b): Cotton Linters' NRV first, then its credit against the joint cost of fibre and seed.
:::

:::: example Sugar, molasses in the tank and the price of sugar
Malwa Sugar Mills Ltd, near Indore, supplies the sugar for Tapri's chai premix and wants to agree next season's price with Tapri. For the 2025-26 crushing season, the cost up to the point of separation was ₹3,20,70,000. Sugar is the main product; molasses (sold to distilleries) and bagasse (sold as boiler fuel) are by-products, valued by the reverse cost method.

| Particulars | Molasses | Bagasse |
|---|---:|---:|
| Output (tonnes) | 450 | 3,000 |
| Selling price (₹ per tonne) | 10,000 | 1,800 |
| Cost after separation (₹) | 3,00,000 | 6,00,000 |
| Estimated selling expenses (% of sales) | 10% | 5% |
| Estimated net profit (% of sales) | 20% | 15% |

The mill produced 1,000 tonnes of sugar, all of which Tapri buys. At the end of the season 90 tonnes of molasses were still in the mill's tank; all the bagasse was sold. Sugar's selling expenses are 5% of sales.

**Required:**

(i) Calculate the joint cost to be allocated to each by-product, and the cost of the molasses in the tank at the end of the season.

(ii) Calculate the joint cost per tonne of sugar.

(iii) Calculate the price per tonne the mill must charge for sugar to earn a profit of 20% on sales.

(iv) Prepare a statement of the season's profit by product at that price.

::: answer Show the working
**(i) Joint cost allocated to the by-products** (on the whole output)

| Particulars (₹) | Molasses | Bagasse |
|---|---:|---:|
| Sales value (450 × ₹10,000; 3,000 × ₹1,800) | 45,00,000 | 54,00,000 |
| Less: Estimated profit (20%; 15%) | 9,00,000 | 8,10,000 |
| **Cost of sales** | **36,00,000** | **45,90,000** |
| Less: Estimated selling expenses (10%; 5%) | 4,50,000 | 2,70,000 |
| **Cost of production** | **31,50,000** | **43,20,000** |
| Less: Cost after separation | 3,00,000 | 6,00,000 |
| **Joint cost allocated** | **28,50,000** | **37,20,000** |

Cost of production of molasses = ₹31,50,000 ÷ 450 = ₹7,000 a tonne, so the 90 tonnes in the tank are valued at **₹6,30,000**.

**(ii) Joint cost of sugar** = ₹3,20,70,000 − ₹28,50,000 − ₹37,20,000 = ₹2,55,00,000, that is **₹25,500 a tonne**.

**(iii) Price of sugar.** Cost + selling expenses (5% of price) + profit (20% of price) = price, so cost = 75% of price: ₹25,500 ÷ 75% = **₹34,000 a tonne**.

**(iv) Statement of profit for the season**

| Particulars (₹) | Sugar | Molasses | Bagasse |
|---|---:|---:|---:|
| A. Sales (1,000 × ₹34,000; 360 × ₹10,000; 3,000 × ₹1,800) | 3,40,00,000 | 36,00,000 | 54,00,000 |
| Cost of production of the quantity sold | 2,55,00,000 | 25,20,000 | 43,20,000 |
| Selling expenses (5%; 10%; 5%) | 17,00,000 | 3,60,000 | 2,70,000 |
| B. Cost of sales | 2,72,00,000 | 28,80,000 | 45,90,000 |
| **Profit (A − B)** | **68,00,000** | **7,20,000** | **8,10,000** |

Molasses sold: 360 tonnes × ₹7,000 = ₹25,20,000. Overall profit = **₹83,30,000**. Check: total sales ₹4,30,00,000 − joint cost ₹3,20,70,000 − costs after separation ₹9,00,000 − selling expenses ₹23,30,000 + closing stock of molasses ₹6,30,000 = ₹83,30,000.

Each by-product earns exactly its estimated percentage of profit on what it sells; the reverse cost method gives it a cost of production, which is also the basis for valuing its unsold stock.
:::
::::

:::: example Three leftovers at the tea factory
Tapri's tea factory sells about ₹3 crore of tea a month. Its processing leaves three by-products:

(a) Fluff swept from the sorting floor, which a compost maker collects for about ₹10,000 a month.

(b) Tea seeds, which an oil mill buys for about ₹45 lakh a month once Tapri has dried them; drying costs about ₹5 lakh a month.

(c) Stalks and coarse waste, which the factory now burns in its own dryer furnace in place of firewood that would cost about ₹40,000 a month.

Kesar asks Ritu how each should be treated in the cost accounts. Discuss.

::: answer Model answer
By-products are products recovered from material discarded in a main process, or from the production of some major products, and their value is relatively small compared with the main product. Their treatment depends on their value and on whether they are sold or used inside the business.

**(a) Fluff: small total value.** At about ₹10,000 against ₹3 crore of tea, its value is small. As per the Study Material, the amount realised from a by-product of small total value may be dealt with in either of two ways: (1) its sales value may be credited to the Costing Profit and Loss Account, as miscellaneous income or as additional sales revenue, with no credit in the cost accounts; or (2) the sale proceeds may be deducted from the total costs, either from the production cost or from the cost of sales (SM 11.17). Either is permissible here.

**(b) Tea seeds: further processing.** Where a by-product requires further processing, its net realisable value at the split-off point is found by subtracting the further processing cost from its realisable value (SM 11.17): ₹45 lakh − ₹5 lakh = about ₹40 lakh a month, more than an eighth of the tea's sales. That is a considerable amount, so the seeds are treated as by-products of considerable total value: they may be regarded as joint products rather than as by-products, and the cost up to the point of separation is apportioned over tea and seeds on a logical basis: relative market values, physical output at the point of split-off, or ultimate selling prices (SM 11.17). The drying cost and the selling, distribution and administration expenses of the seeds are collected in separate accounts (SM 11.16). Had the seeds' net value been small, they would be treated as in (a).

**(c) Stalks: used inside the business.** They are not sold, so there is no realisation to credit. Under the **comparative price** method, a by-product is valued at the price of a similar or alternative material (SM 11.16): the stalks are worth the ₹40,000 of firewood they replace. That value is credited to the cost of the main process and charged to the dryer furnace, so the cost of tea is not overstated and the furnace's fuel cost is not understated. (Had the stalks been fed back into the same process as input, the **re-use basis** would value them at the value of the materials introduced into that process.)
:::
::::

## Under the hood

### A by-product from a later process

A by-product does not always come out at the main split-off point. In RTP May 2025 Q15 a waste material from the finishing process of one product is processed further into a saleable by-product; its net revenue is credited to **that product** alone, reducing its cost and adding to its NRV when the joint cost is apportioned. Credit a by-product to the process (or product) that produces it.

### A by-product with no realisable value

If a by-product has no realisable value, there is nothing to credit: its cost is borne by the good units of the main product (SM 11.22, MCQ 10; key (b) on SM 11.29).

### Re-use, read carefully

The Study Material's re-use paragraph says that a by-product reprocessed in the same process is valued at the value of the materials introduced into that process, and then repeats the same rule for a by-product that "can be put into an earlier process only" (SM 11.16). Read it as: value the by-product at the value of the materials introduced into the process it re-enters.

### Scrap and by-products

ICAI's distinction between waste and scrap ends with scraps being termed by-products with a small recoverable value (SM 2.66); their realisable value is a credit for recoveries in the cost sheet, like a by-product's. More in [[cma.mat.losses|waste, scrap, spoilage and defectives]].

### Co-products are not by-products

Co-products are contemporary products that do not necessarily emerge from the same material in the same process (SM 11.3). ICAI's MCQs: mustard oil and sunflower oil in an oil processing company are co-products (SM 11.21, MCQ 6, key (d)); and "co-products do not have any by-products" is the statement that is **not** correct (SM 11.21–11.22, MCQ 9, key (c); keys on SM 11.29).

## Exam angle

::: exam Where by-products appeared, May 2024 to September 2026
In the 15 new-scheme Paper 4 documents (May 2024 to September 2026) read for this lesson that examined by-products (3 past papers, 4 RTPs, 8 MTPs):

- **Theory, 4 or 5 marks.** "Discuss the treatment of by-products in cost accounting": September 2024 Q6(c) (4 marks, with an OR on job costing), MTP September 2026 Series II Q6(a) (5 marks); only the small-value case: RTP January 2025 Q19(c); the same three cases for buttermilk as a by-product of butter: MTP September 2024 Series II Q6(b) (5 marks). The NRV method of apportioning joint costs to by-products: RTP September 2024 Q19(a). Molasses, and a by-product that needs further processing: September 2026 Q6(b)(i) and (iii) (answers not yet published). The cost-sheet treatment of joint products and by-products, one of four items: MTP September 2024 Series I Q2(b), MTP September 2026 Series I Q5(b) (4 marks each).
- **Numerical, 5 or 6 marks.** By-product NRV credited before apportioning the joint cost: January 2026 Q1(b) (5 marks), RTP January 2025 Q14. Main product with two by-products valued at sales less estimated profit, selling expenses and cost after separation: MTP September 2024 Series I Q3(a) (6 marks), MTP September 2025 Series I Q3(a) (5 marks). A by-product credited at sales less a margin on cost: RTP September 2024 Q15. A by-product with estimated profit and selling expenses shared in proportion to sales: RTP September 2026 Q12. A by-product from a finishing process: RTP May 2025 Q15.
- **Multiple choice, 2 marks.** Cost of the main product after the joint cost of two by-products: MTP May 2025 Series I MCQ 14 and MTP May 2026 Series II MCQ 13 (the same question). Net joint cost after a by-product's NRV, then physical units: MTP January 2025 Series I MCQ 15.
:::

::: exam How the marks are earned
The theory answers ICAI publishes are the Study Material's paragraph 5, case by case, in its order: small total value (two ways), considerable total value, requiring further processing. The numerical answers open with a working note: either "Calculation of net joint costs to be apportioned" (joint costs less NRV of the by-product) or a statement of joint cost allocated to each by-product.
:::

::: trick Small, Big, Busy
**S**mall value: credit Costing P&L or deduct from cost. **B**ig value: treat as a joint product. **B**usy (needs further processing): find the NRV at split-off, then decide small or big. Condition: this is ICAI's order of the three cases (SM 11.17); write them in that order.
:::

## Answer frame

### "Distinguish between joint products and by-products"

Write the compare table from How it works: ICAI's two points (importance; simultaneous against incidental production) first, then cost treatment and one example on each side.

### "Discuss the treatment of by-product cost in cost accounting"

1. **When they are of small total value**: (1) credit the sales value to the Costing Profit and Loss Account, no credit in the cost accounts, as miscellaneous income or additional sales revenue; (2) deduct the sale proceeds from the total costs, from the production cost or the cost of sales.
2. **When they are of considerable total value**: regard them as joint products; apportion the costs up to the point of separation on a logical basis (relative market values, physical output at split-off, or ultimate selling prices).
3. **Where they require further processing**: NRV at split-off = realisable value − further processing cost; small, treat as in 1; considerable, as in 2.

### "Discuss the NRV method of apportioning joint costs to by-products"

1. The realisation on disposal of the by-product is deducted from the total cost of production to arrive at the cost of the main product (molasses reduces the cost of sugar).
2. If the by-product needs additional processing, the expenses are deducted from its realisation, and only the net realisation is deducted from the cost of production.
3. Separate accounts collect the additional expenses on (a) further processing of the by-product and (b) its selling, distribution and administration.

### Three answers to the numerical part

::: cols
**Loses marks**

"Sugar's joint cost = ₹3,20,70,000 − ₹99,00,000 = ₹2,21,70,000."

Credits the by-products at their full sales value.
---
**Passes**

Deducts profit and cost after separation but forgets the selling expenses: sugar's joint cost comes to ₹2,47,80,000.

Right idea, one line missing.
---
**Full marks**

ICAI's statement for each by-product (sales, less estimated profit, cost of sales, less selling expenses, cost of production, less cost after separation, joint cost allocated); sugar by difference; profitability statement with a check.
:::

## Common mistakes

::: mistake Hall of Shame: the by-product credited at its price tag
Deducting the by-product's full sales value from the joint cost, ignoring its further processing, freight or selling costs. **Fix:** credit only the net realisable value: sales value − further processing − attributable selling, distribution and administration costs (SM 11.16).
:::

::: mistake A by-product with a share of the joint cost on physical units
Adding the sweepings' 3,550 kg to Leaf and Brokens and sharing the joint cost over 23,550 kg. That treats a by-product as a joint product. **Fix:** a by-product of small value is credited at its NRV; only a by-product of considerable value is treated as a joint product, and then by the basis the question gives.
:::

::: mistake The estimated profit left inside the by-product's cost
Working joint cost of the by-product as sales − selling expenses − cost after separation, without deducting the estimated profit. **Fix:** when the question gives an estimated profit on the by-product, deduct it first; the by-product keeps that profit and only the rest reduces the main product's joint cost.
:::

## Practice

::: quiz Check yourself
Q: A joint process costs ₹8,40,000 and yields main products A (30,000 kg) and B (10,000 kg) and a by-product (20,000 kg) that sells at ₹6 a kg after further processing of ₹1 a kg and selling costs of ₹1 a kg. The NRV of the by-product is deducted from the joint cost and the rest is apportioned on physical units. What joint cost (₹) goes to A?
= 570000
> NRV = 20,000 × (₹6 − ₹1 − ₹1) = ₹80,000. Net joint cost = ₹8,40,000 − ₹80,000 = ₹7,60,000. A = ₹7,60,000 × 30,000 ÷ 40,000 = ₹5,70,000. The by-product's kilos are not part of the physical base.

Q: Case scenario. Tapri's premix plant sells the powder swept from its filling lines to a cattle-feed maker for about ₹12,000 a month, against premix sales of ₹2 crore a month. Ritu lists the treatments ICAI allows for it. Which of these is NOT one of ICAI's treatments for a by-product of small total value?
- [ ] Credit the sales value to the Costing Profit and Loss Account as miscellaneous income
- [ ] Credit it to the Costing Profit and Loss Account as additional sales revenue
- [ ] Deduct the sale proceeds from the cost of production
- [x] Apportion part of the joint cost to it on the basis of physical output
> Small total value: credit Costing P&L (as miscellaneous income or additional sales revenue) or deduct from production cost or cost of sales (SM 11.17). Sharing the joint cost on physical output is for a by-product of considerable total value, treated as a joint product.

Q: A by-product sells for ₹50,000. Its cost after separation is ₹8,000, selling expenses ₹5,000, and its estimated profit is 20% of sales. How much of the joint cost does it carry?
- [ ] ₹37,000
- [x] ₹27,000
- [ ] ₹50,000
- [ ] ₹40,000
> ₹50,000 − ₹10,000 profit − ₹5,000 selling − ₹8,000 after separation = ₹27,000. ₹37,000 forgets the estimated profit; ₹40,000 deducts only the profit; ₹50,000 credits the full sales value.

Q: Which of these are methods ICAI lists for apportioning joint cost to by-products? Select all that apply.
- [x] Net realisable value method
- [x] Standard cost in technical estimates
- [x] Comparative price
- [x] Re-use basis
- [ ] Contribution margin method
- [ ] Average unit cost method
> ICAI's four methods for by-products (SM 11.15–11.16). Contribution margin and average unit cost are methods for joint products.

Q: A by-product can be fed back into the process it came from as part of that process's input. At what value should it be taken?
- [ ] Its selling price to outside buyers
- [ ] The price of a similar material bought from outside
- [x] The value of the materials introduced into that process
- [ ] Nil, since it is reused internally
> Re-use basis: the value put on the by-product is the same as that of the materials introduced into the process (SM 11.16). The price of a similar material is the comparative price method.
:::

## Recap

- By-product: recovered incidentally from the material used for the main product; value relatively insignificant against the main product (molasses, tar, glycerin).
- Joint products: equal importance, produced simultaneously; by-products: small economic value, produced incidentally.
- ICAI's four methods for by-products: NRV; standard cost in technical estimates; comparative price; re-use basis.
- NRV of a by-product = sales value − further processing − attributable selling, distribution and administration costs.
- Small total value: credit Costing P&L (miscellaneous income or additional sales) or deduct from production cost or cost of sales.
- Considerable total value: treat as a joint product and apportion the joint cost.
- Needs further processing: NRV at split-off first, then small or considerable.
- With an estimated profit: by-product's joint cost = sales − profit − selling expenses − cost after separation; the main product bears the rest. The barber still sells haircuts.

## Flashcards

Q:: ICAI's definition of by-products?
A:: Products recovered from material discarded in a main process, or from the production of some major products, where the material value is to be considered at the time of severance from the main product.

Q:: Two points of distinction between joint products and by-products (ICAI)?
A:: (a) Joint products are of equal importance whereas by-products are of small economic value; (b) joint products are produced simultaneously but by-products are produced incidentally in addition to the main products.

Q:: ICAI's examples of by-products?
A:: Molasses in the manufacture of sugar; tar, ammonia and benzole on carbonisation of coal; glycerin in the manufacture of soap.

Q:: ICAI's four methods of apportioning joint cost to by-products, in order?
A:: (i) Net realisable value method; (ii) standard cost in technical estimates; (iii) comparative price; (iv) re-use basis.

Q:: By-product of small total value: the two treatments?
A:: (1) Credit its sales value to the Costing Profit and Loss Account (as miscellaneous income or additional sales revenue), with no credit in the cost accounts; (2) deduct its sale proceeds from the total costs, from production cost or cost of sales.

Q:: By-product of considerable total value: treatment?
A:: Regard it as a joint product; apportion the costs up to the point of separation over the by-products and joint products by relative market values, physical output at split-off, or ultimate selling prices.

Q:: By-product that requires further processing: treatment?
A:: Find its NRV at split-off (realisable value − further processing cost); if the total is small treat it as a small-value by-product, if considerable as a joint product.

Q:: When is the standard cost in technical estimates method used for a by-product?
A:: Where the by-product is not saleable in the condition in which it emerges, or comparative prices of similar products are not available.

Q:: Comparative price method for a by-product: what is it, with ICAI's example?
A:: The by-product is valued at the price of a similar or alternative material: gas from a blast furnace used in the factory is valued at what a gas company would have charged.

Q:: Where does the by-product credit appear in the cost sheet?
A:: "Less: Credit for Recoveries/Scrap/By-Products/misc. income", deducted before arriving at the cost of production; the NRV of by-products is deducted from the cost of production.
