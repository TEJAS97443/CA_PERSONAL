---
id: cma.sheet.mfg
title: Cost sheet for a manufacturer
minutes: 40
needs: cma.intro.classify
tags: cost sheet, prime cost, works cost, cost of production, cost of goods sold, cost of sales, primary packing, functional classification
labs: cost-sheet
summary: The cost sheet stacks costs by function in ICAI's order: prime cost, works cost, cost of production, cost of goods sold and cost of sales, with stocks adjusted at the right step.
---

## In plain words

### Kesar's favourite word: miscellaneous

Tapri's chai premix sells for ₹150 a box, and Kesar wants to know what a box really costs. He hands Ritu a bag of bills: milk powder, wages, electricity, a supervisor's salary, the auditor's fee, a TV advertisement, foil pouches, cartons, diesel.

> **Kesar:** Total them and divide by boxes. Whatever does not fit, put under miscellaneous. Sab adjust ho jayega.
> **Ritu:** Per unit, please, but in layers. In one heap I cannot tell you whether the factory is expensive or the advertising is.

Ritu sorts every bill by the **function** it served: making the premix, running the company, selling it, or getting it to the shop. Then she stacks the piles in a fixed order. The costs that go straight into a box (milk powder, the mixing team's wages, the royalty on the recipe) come to ₹80. The factory's indirect costs take it to ₹100. Quality checks, the production office and the foil pouch, less the scrap sold, take it to ₹110: the cost to *make* a box. The general office, selling and delivery add ₹20: ₹130 to *make and sell* it, and Kesar keeps ₹20.

That stacked statement is a **cost sheet**. Each subtotal has a name ICAI expects you to write, and each answers its own question: is the factory efficient (works cost), what does a finished box cost (cost of production), what does it cost in a customer's hands (cost of sales)?

::: analogy The four-tier tiffin
A cost sheet is a steel tiffin carrier. The bottom tier is prime cost, the next adds the factory's overheads, the third what it takes to finish and pack a box, and the top the office, the salesman and the delivery boy. You can open any tier and see its total, but you build it from the bottom up, and nothing from the top tier may fall into the lower ones.
:::

::: key
A cost sheet classifies cost by function and builds it up in a fixed order: prime cost → works cost → cost of production → cost of goods sold → cost of sales. Each stock is adjusted at the tier where it sits: raw material in materials consumed, work-in-process in works cost, finished goods in cost of goods sold.
:::

## How it works

ICAI's cost sheet presents cost information "on the basis of functional classification" (SM 6.2). **Functional classification** divides costs by the function for which they are incurred: production (manufacturing), administration, selling, distribution, and research and development. They are grouped into four **cost heads**: prime cost, cost of production, cost of goods sold and cost of sales (SM 6.2).

::: diagram Where each function lands in the cost sheet
{"type": "layers", "layers": [
  {"label": "Production", "note": "direct costs, factory overheads", "right": "prime cost, works cost"},
  {"label": "Administration (production)", "note": "production planning, factory office", "right": "cost of production"},
  {"label": "R&D (process)", "note": "improving the process", "right": "cost of production"},
  {"label": "Administration (general)", "note": "board, finance, audit", "right": "cost of sales"},
  {"label": "Selling, distribution", "note": "ads, salesmen, delivery", "right": "cost of sales"}],
 "caption": "Top to bottom in the order the cost sheet adds them; the right-hand column names the head each function joins."}
:::

### Building the tiers, one step at a time

::: steps
1. **Direct materials consumed** = opening stock of raw material + purchases − closing stock. Freight inwards and other procurement costs are added, trade discounts deducted, and duties and taxes added only if input tax credit is not available (SM 6.3). More in [[cma.mat.receipts|valuing material receipts]].
2. **Direct employee (labour) cost**: wages, allowances, overtime, bonus, the employer's contribution to provident and similar funds, other benefits (SM 6.3–6.4).
3. **Direct expenses**: power and fuel, royalty on production, hire of specific equipment, know-how fees, amortised moulds and patterns, product-specific design and software (SM 6.4). Steps 1 to 3 make **prime cost**.
4. **Works (factory) overheads** give **gross works cost**: consumable stores, depreciation, repairs and insurance of factory and plant, lease rent of production assets, supervisors, service departments such as the tool room (SM 6.5). Add opening and deduct closing work-in-process: **works (factory) cost**.
5. **Cost of production** = works cost + quality control + R&D (process related) + administration related to production − credit for recoveries (scrap, waste, by-products) + primary packing (SM 6.4–6.6).
6. **Cost of goods sold** = cost of production + opening − closing finished goods (SM 6.6).
7. **Cost of sales** = cost of goods sold + general administration + selling + secondary packing + distribution (SM 6.6–6.7); interest, where given, as a separate item (SM 6.10). Sales less cost of sales is **profit**.
:::

::: diagram One box of chai premix, tier by tier
{"type": "nest", "w": 440, "root": {"title": "Cost of sales", "note": "₹130", "mono": false, "color": "d", "rows": [["+ general administration", "₹8"], ["+ selling and distribution", "₹12"]], "children": [
  {"title": "Cost of production (no stock: = COGS)", "note": "₹110", "mono": false, "color": "c", "rows": [["+ QC, production office, pouch", "₹12"], ["− scrap sold", "₹2"]], "children": [
    {"title": "Works cost", "note": "₹100", "mono": false, "color": "b", "rows": [["+ factory overheads", "₹20"]], "children": [
      {"title": "Prime cost", "note": "₹80", "mono": false, "color": "a", "rows": [["direct materials", "₹60"], ["direct employee cost", "₹15"], ["direct expenses", "₹5"]]}]}]}]},
 "caption": "Read from the innermost box outwards: each tier is the one inside it plus its own rows. Price ₹150 less cost of sales ₹130 leaves ₹20 a box."}
:::

### The awkward items

Some bills look like costs and are not; some reduce cost. ICAI's rules, in ICAI's words (SM 6.5–6.10), are also the model answers to "explain the treatment of":

| Item | Treatment in the cost sheet |
|---|---|
| Credit for recoveries | The realised or realisable value of scrap or waste is deducted, as it reduces the cost of production |
| Packing cost (primary) | Packing material essential to hold and preserve the product for its use by the customer: part of cost of production |
| Joint products and by-products | Joint costs are allocated on a rational and consistent basis; the net realisable value of by-products is deducted from the cost of production |
| Quality control cost | The cost of resources consumed towards quality control procedures: part of cost of production |
| Abnormal costs | Where material and quantifiable (e.g. costs of a pandemic, employee costs of a sudden lockdown), they ==shall not form part of cost of production== or acquisition or supply of goods or provision of service |
| Subsidy, grant, incentives | Reduced from the cost objects to which the amount pertains |
| Penalty, fine, damages, demurrage | Do not form part of cost |
| Interest and other finance costs | Not included in cost of production; presented ==as a separate item of cost of sales== |
| GST and other duties on materials | Added to material cost only if input tax credit is not available or not availed |

ICAI's suggested answers also leave out income tax and donations (RTP September 2026, Q8).

### Why bother: the advantages of a cost sheet

ICAI lists five (SM 6.10): (i) the total cost figure as well as cost per unit of production; (ii) cost comparison; (iii) cost estimates required for submitting tenders; (iv) help in arriving at the selling price; (v) cost control by disclosing operational efficiency. The third and fourth are the next lesson, [[cma.sheet.quote|estimated cost sheets, tenders and quotations]].

## Formats and formulas

ICAI's specimen format for a manufacturing entity (SM 6.8–6.9), in ICAI's words and line order. *Reproduce it from memory: examiners mark the subtotals.* ICAI prints two amount columns, **Total Cost (₹)** and **Cost per unit (₹)**; one is shown here so the format reads on a phone.

| Particulars | Total cost (₹) |
|---|---:|
| 1. Direct materials consumed: Opening Stock of Raw Material; Add: Additions/ Purchases; Less: Closing stock of Raw Material | xxx |
| 2. Direct employee (labour) cost | xxx |
| 3. Direct expenses | xxx |
| **4. Prime Cost (1+2+3)** | **xxx** |
| 5. Add: Works/ Factory Overheads | xxx |
| **6. Gross Works Cost (4+5)** | **xxx** |
| 7. Add: Opening Work in Process | xxx |
| 8. Less: Closing Work in Process | (xxx) |
| **9. Works/ Factory Cost (6+7−8)** | **xxx** |
| 10. Add: Quality Control Cost | xxx |
| 11. Add: Research and Development Cost | xxx |
| 12. Add: Administrative Overheads (relating to production activity) | xxx |
| 13. Less: Credit for Recoveries/Scrap/By-Products/misc. income | (xxx) |
| 14. Add: Packing cost (primary) | xxx |
| **15. Cost of Production (9+10+11+12−13+14)** | **xxx** |
| 16. Add: Opening stock of finished goods | xxx |
| 17. Less: Closing stock of finished goods | (xxx) |
| **18. Cost of Goods Sold (15+16−17)** | **xxx** |
| 19. Add: Administrative Overheads (General) | xxx |
| 20. Add: Marketing Overheads: Selling Overheads; Distribution Overheads | xxx |
| **21. Cost of Sales (18+19+20)** | **xxx** |

Secondary packing sits with selling and distribution (SM 6.7); interest, if any, on its own line before cost of sales (SM 6.10). Then sales, with profit as the balancing figure (or profit first, then sales, when a margin is given).

::: lab cost-sheet {}
Watch Tapri's samosa factory's cost sheet build in ICAI's order, every item going to its head, and GST with credit and a penalty left out.
:::

::: formula Prime cost and works cost
$$\text{Prime cost} = \text{Direct materials} \qquad + \text{Direct employee cost} \qquad + \text{Direct expenses}$$

$$\text{Works cost} = \text{Prime cost} \qquad + \text{Factory overheads} \qquad + \text{Opening WIP} - \text{Closing WIP}$$
:::

::: formula Cost of production, cost of goods sold, cost of sales
$$\text{Cost of production} = \text{Works cost} \qquad + \text{QC} + \text{R\&D} \qquad + \text{Production admin} \qquad - \text{Recoveries} \qquad + \text{Primary packing}$$

$$\text{COGS} = \text{Cost of production} \qquad + \text{Opening FG} - \text{Closing FG}$$

$$\text{Cost of sales} = \text{COGS} + \text{General admin} \qquad + \text{Selling} + \text{Secondary packing} \qquad + \text{Distribution}$$
QC = quality control; R&D = research and development for the process; production admin = administrative overheads related to production; recoveries = realised or realisable value of scrap, waste and by-products; FG = finished goods.
:::

::: formula Profit as a percentage of sales or of cost
$$\text{Profit} = x\% \text{ of sales} \qquad = \frac{x}{100 - x} \text{ of cost of sales}$$
20% on sales is 25% on cost; 25% on sales is 33⅓% on cost. Sales = cost of sales ÷ (1 − x%).
:::

### ICAI's examples under each head

The lists to classify from, in ICAI's words and order (SM 6.3–6.8). September 2026 Q6(a) asked exactly this for ten items.

| Head | ICAI's examples |
|---|---|
| Direct material (additions to cost) | (a) freight inwards; (b) insurance and other expenditure directly attributable to procurement; (c) trade discounts or rebates (to be deducted); (d) duties and taxes (if input tax credit is not available or availed) |
| Direct employee (labour) cost | (a) wages and salary; (b) allowances and incentives; (c) payment for overtimes; (d) bonus / ex-gratia; (e) employer's contribution to welfare funds such as provident fund; (f) other benefits (medical, leave with pay, free or subsidised food, leave travel concession, provisions for retirement benefits) |
| Direct expenses | (a) utilities such as power and fuel, steam; (b) royalty paid or payable for production or provision of service; (c) hire charges for specific equipment; (d) fee for technical assistance and know-how; (e) amortised cost of moulds, patterns, patents; (f) product or service specific design or drawing; (g) product or service specific software; (h) other expenses directly related with production or provision of service |
| Factory overheads | (a) consumable stores and spares; (b) depreciation of plant and machinery, factory building; (c) lease rent of production assets; (d) repair and maintenance of plant and machinery, factory building; (e) indirect employees cost related with production activities; (f) drawing and designing department cost; (g) insurance of plant and machinery, factory building, stock of raw material and WIP; (h) amortised cost of jigs, fixtures, tooling; (i) service department cost such as tool room, engineering and maintenance, pollution control |
| Selling overheads | (a) salary and wages of the sales department and of employees directly related with selling; (b) rent, depreciation, maintenance and other cost of the sales department; (c) advertisement, maintenance of website for online sales, market research |
| Distribution overheads | (a) salary and wages of employees engaged in distribution; (b) transportation and insurance related with distribution; (c) depreciation, hire charges, maintenance and other operating costs of distribution vehicles |

::: definition Prime cost
Prime cost represents the total of direct materials costs, direct employee (labour) costs and direct expenses. (SM 6.3)
:::

::: definition Primary and secondary packing cost
Primary packing cost: cost incurred on packing materials which are essential to hold and preserve the product for further processing or its use by consumer. Secondary packing cost: cost incurred on packing materials which is used to store, transport, and promote the product. (SM 6.20)
:::

::: definition Cost of sales
It is the total cost of a product incurred to make the product available to the customer or consumer. It is the aggregate of cost of goods sold, administrative costs, marketing costs and other separate line items of cost which could not form part of cost of production. (SM 6.20)
:::

## Worked examples

::::: example Samosa packs: a month at the Indore factory
Tapri's Indore factory made 50,000 packs of frozen samosas in October 2026 and sold 46,000 at ₹90 a pack. At 1 October it held 2,000 finished packs costing ₹1,10,000. Finished stock is issued on the first-in, first-out basis.

| Particulars | Amount (₹) |
|---|---:|
| Opening stock of raw materials | 2,40,000 |
| Purchases of raw materials | 14,60,000 |
| Freight inwards | 40,000 |
| Closing stock of raw materials | 3,00,000 |
| Direct wages | 6,00,000 |
| Power and fuel for the fryers | 1,20,000 |
| Royalty on production | 50,000 |
| Factory overheads: 5,000 machine hours at ₹86 an hour | |
| Opening work-in-process | 60,000 |
| Closing work-in-process | 1,00,000 |
| Quality control laboratory | 45,000 |
| R&D on a faster frying process | 25,000 |
| Production office (planning and control) | 80,000 |
| Waste sold to a cattle-feed unit | 20,000 |
| Pouches that hold the samosas | 1,70,000 |
| General administration | 2,30,000 |
| Selling overheads | 1,84,000 |
| Outer cartons for the trucks | 92,000 |
| Distribution overheads | 2,76,000 |

**Required:** Prepare a cost sheet for October 2026 showing, in total and per pack, (i) materials consumed, (ii) prime cost, (iii) works cost, (iv) cost of production, (v) cost of goods sold, (vi) cost of sales and profit.

:::: answer Show the working
**Working notes**

1. Closing finished packs = 2,000 + 50,000 − 46,000 = 6,000. Under FIFO they come from October's production, at October's cost of production per pack.
2. Production heads are divided by the 50,000 packs produced; cost of goods sold and everything after it by the 46,000 packs sold.
3. Direct expenses = power and fuel ₹1,20,000 + royalty ₹50,000; factory overheads = 5,000 hours × ₹86 = ₹4,30,000.

**Cost sheet of Tapri Tea Co. Ltd, Indore factory, for October 2026** (output 50,000 packs; sold 46,000)

| Particulars | Total (₹) | Per pack (₹) |
|---|---:|---:|
| Opening raw materials | 2,40,000 | |
| Add: Purchases | 14,60,000 | |
| Add: Freight inwards | 40,000 | |
| Less: Closing raw materials | (3,00,000) | |
| **(i) Materials consumed** | **14,40,000** | **28.80** |
| Direct wages | 6,00,000 | 12.00 |
| Direct expenses (WN 3) | 1,70,000 | 3.40 |
| **(ii) Prime cost** | **22,10,000** | **44.20** |
| Factory overheads (WN 3) | 4,30,000 | 8.60 |
| **Gross works cost** | **26,40,000** | **52.80** |
| Add: Opening WIP | 60,000 | |
| Less: Closing WIP | (1,00,000) | |
| **(iii) Works cost** | **26,00,000** | **52.00** |

| Particulars | Total (₹) | Per pack (₹) |
|---|---:|---:|
| **Works cost** | **26,00,000** | **52.00** |
| Add: Quality control | 45,000 | 0.90 |
| Add: R&D (process) | 25,000 | 0.50 |
| Add: Production office | 80,000 | 1.60 |
| Less: Waste sold | (20,000) | (0.40) |
| Add: Primary packing | 1,70,000 | 3.40 |
| **(iv) Cost of production** | **29,00,000** | **58.00** |
| Add: Opening FG | 1,10,000 | |
| Less: Closing FG (WN 1) | (3,48,000) | |
| **(v) Cost of goods sold** | **26,62,000** | **57.87** |
| Add: General administration | 2,30,000 | 5.00 |
| Add: Selling overheads | 1,84,000 | 4.00 |
| Add: Secondary packing | 92,000 | 2.00 |
| Add: Distribution | 2,76,000 | 6.00 |
| **(vi) Cost of sales** | **34,44,000** | **74.87** |
| Profit (balancing figure) | 6,96,000 | 15.13 |
| **Sales (46,000 × ₹90)** | **41,40,000** | **90.00** |

::: diagram Samosa packs: cost per pack at each tier
{"type": "plot", "h": 300, "x": [0.4, 6.6], "y": [0, 100],
 "xticks": [[1, "prime"], [2, "works"], [3, "production"], [4, "COGS"], [5, "sales cost"], [6, "price"]],
 "yticks": [[0, "0"], [20, "20"], [40, "40"], [60, "60"], [80, "80"], [100, "100"]],
 "ylabel": "cost per pack (₹)", "legend": "none",
 "series": [{"label": "₹ per pack", "bars": true, "values": true, "color": "a",
   "pts": [[1, 44.2, "44.20"], [2, 52, "52.00"], [3, 58, "58.00"], [4, 57.87, "57.87"], [5, 74.87, "74.87"], [6, 90, "90.00"]]}],
 "caption": "Each tier adds a function. Cost of goods sold per pack dips below cost of production because 2,000 of the packs sold came from September's cheaper stock (₹55 each)."}
:::

Cartons move the packs (secondary packing); pouches hold them (primary).
::::
:::::

::: lab cost-sheet {"mode":"sheet","produced":0,"sold":0,"fgOpenUnits":0,"profitOn":"sales","profitPct":"","sheetItems":[["Opening stock of raw materials","60,000"],["Purchase of raw materials","4,80,000"],["Closing stock of raw materials","50,000"],["Wages paid [labour]","2,40,000"],["Factory overheads","1,00,000"],["Opening work-in-process","12,000"],["Closing work-in-process","15,000"],["Administration overheads (related to production)","50,000"],["Opening stock of finished goods","90,000"],["Closing stock of finished goods","1,10,000"],["Selling and distribution overheads","25,000"],["Sales","10,00,000"]]}
Practise the three stock adjustments on Study Material Illustration 2: raw materials, work-in-process and finished goods, line by line.
:::

:::: example Chai premix plant: the intern's draft and Ritu's red pen
Tapri Premix Ltd runs the chai premix plant at Dewas. It produced 6,00,000 kg in 2025-26. Finished stock is issued first-in, first-out, and the company prices to earn a profit of 20% on sales. Ritu's intern sorted the year's bills into cost heads as below and arrived at a cost of production of ₹6,72,90,000. Ritu sent it back: some bills sit under the wrong head, some are not costs at all, and two are at the wrong amount.

**The intern's heads for 2025-26**

| Head, and the bills the intern put in it (₹) | Amount (₹) |
|---|---:|
| **Materials consumed:** purchases 4,80,00,000; GST @ 18% on them 86,40,000 (input tax credit available); freight inwards 6,40,000; opening stock 24,00,000; less closing stock 30,00,000 | 5,66,80,000 |
| **Direct wages:** wages 48,00,000; employer's PF and ESI 5,76,000; wages of workers idle in a sudden lockdown 1,20,000 | 54,96,000 |
| **Direct expenses:** royalty for the drying process 2,40,000; power bill of the dryers 9,60,000; licence fee for an instant-dissolve formula 3,00,000 (the licence covers two years' production) | 15,00,000 |
| **Works overheads:** stores and spares 2,10,000; depreciation of plant 6,80,000, factory building 3,20,000 and delivery vans 2,60,000; supervisors 9,24,000; repairs of plant 1,80,000; interest on term loan 8,40,000 | 34,14,000 |
| **Work-in-process:** opening 8,00,000 less closing 6,00,000 | 2,00,000 |
| **Cost of production (intern)** | **6,72,90,000** |
| **General administration:** office depreciation 1,40,000; finance manager 10,80,000; managing director 36,00,000; audit fees 3,00,000; quality control laboratory 4,50,000; production planning and control manager 9,00,000; income tax 20,00,000; penalty for late filing of returns 50,000 | 85,20,000 |
| **Selling and distribution:** sales manager 12,00,000; advertisement and website 18,00,000; running cost of delivery vans 9,60,000; foil sachets that hold the premix 16,50,000; outer cartons for dispatch 4,80,000 | 60,90,000 |
| **Other income, added to sales:** spilt powder sold 1,20,000; State subsidy on the plant's power cost 1,60,000 | 2,80,000 |

Finished goods: 1 April 2025, 20,000 kg costing ₹19,00,000; 31 March 2026, 30,000 kg.

**Required:**

(i) Prepare the corrected statement of cost for 2025-26 showing prime cost, works cost, cost of production, cost of goods sold and cost of sales.

(ii) Calculate the sales, and the selling price per kg, that earn a profit of 20% on sales.

(iii) Reconcile the intern's cost of production with the corrected figure, stating the rule behind each adjustment.

::: answer Show the working
**(i) Statement of cost of Tapri Premix Ltd for the year ended 31 March 2026** (output 6,00,000 kg)

| Particulars | Amount (₹) |
|---|---:|
| Purchases 4,80,00,000 + freight inwards 6,40,000 + opening stock 24,00,000 − closing stock 30,00,000 | 4,80,40,000 |
| **Materials consumed** | **4,80,40,000** |
| Direct employee cost: wages 48,00,000 + PF and ESI 5,76,000 | 53,76,000 |
| Direct expenses: royalty 2,40,000 + power net of subsidy 8,00,000 + licence amortised (3,00,000 ÷ 2) 1,50,000 | 11,90,000 |
| **Prime cost** | **5,46,06,000** |
| Works overheads: stores 2,10,000; depreciation of plant 6,80,000 and factory building 3,20,000; supervisors 9,24,000; repairs 1,80,000 | 23,14,000 |
| **Gross works cost** | **5,69,20,000** |
| Add: Opening WIP 8,00,000; less: closing WIP 6,00,000 | 2,00,000 |
| **Works cost** | **5,71,20,000** |

| Particulars | Amount (₹) |
|---|---:|
| **Works cost** | **5,71,20,000** |
| Add: Quality control laboratory | 4,50,000 |
| Add: Production planning and control manager | 9,00,000 |
| Less: Spilt powder sold | (1,20,000) |
| Add: Primary packing (foil sachets) | 16,50,000 |
| **Cost of production (₹100 a kg)** | **6,00,00,000** |
| Add: Opening finished goods (20,000 kg) | 19,00,000 |
| Less: Closing finished goods (30,000 kg × ₹100) | (30,00,000) |
| **Cost of goods sold (5,90,000 kg)** | **5,89,00,000** |
| Administration: office depreciation 1,40,000 + finance manager 10,80,000 + MD 36,00,000 + audit fees 3,00,000 | 51,20,000 |
| Selling: sales manager 12,00,000 + advertisement and website 18,00,000 | 30,00,000 |
| Secondary packing (outer cartons) | 4,80,000 |
| Distribution: van depreciation 2,60,000 + running cost 9,60,000 | 12,20,000 |
| Interest on term loan (separate item) | 8,40,000 |
| **Cost of sales** | **6,95,60,000** |

**(ii) Sales and price.** Profit 20% on sales = 25% on cost = ₹1,73,90,000; sales = ₹6,95,60,000 ÷ 80% = **₹8,69,50,000**. Kg sold = 20,000 + 6,00,000 − 30,000 = 5,90,000, so the price is ₹8,69,50,000 ÷ 5,90,000 = **₹147.37 a kg**.

**(iii) Reconciliation of cost of production**

| Particulars | Amount (₹) |
|---|---:|
| Cost of production as drafted by the intern | 6,72,90,000 |
| Less: GST with input tax credit available: not a cost (SM 6.3) | (86,40,000) |
| Less: Lockdown idle wages: abnormal cost, excluded (SM 6.9) | (1,20,000) |
| Less: Power subsidy: reduced from the cost it pertains to (SM 6.9) | (1,60,000) |
| Less: Half the licence: amortised over two years' production (SM 6.4) | (1,50,000) |
| Less: Depreciation of delivery vans: distribution overhead (SM 6.8) | (2,60,000) |
| Less: Interest on term loan: separate item of cost of sales (SM 6.10) | (8,40,000) |
| Add: Quality control laboratory: part of cost of production (SM 6.5) | 4,50,000 |
| Add: Production planning and control manager: administration related to production (SM 6.6) | 9,00,000 |
| Less: Spilt powder sold: credit for recoveries (SM 6.6) | (1,20,000) |
| Add: Foil sachets: primary packing (SM 6.6) | 16,50,000 |
| **Corrected cost of production** | **6,00,00,000** |

**Working notes**

1. Income tax (₹20,00,000) and the penalty (₹50,000, SM 6.9) are not costs: they leave the intern's administration figure and appear nowhere in the statement.
2. Neither the scrap nor the subsidy is sales: one is a credit against cost of production, the other reduces power cost.
3. Under FIFO the closing 30,000 kg are this year's, at ₹6,00,00,000 ÷ 6,00,000 = ₹100 a kg.
:::
::::

:::: example Kulhads at Khurja: the work-in-process under the chai
Kesar rested his cutting chai on the July 2026 ledger of Tapri's kulhad unit at Khurja, and the cup tipped over the stock page. This is what Ritu can still read. The unit made 4,00,000 kulhads in July and sold 3,90,000 at ₹6.96 each. Finished stock is issued on the first-in, first-out basis, and July's profit was one-sixth of sales.

| Particulars (July 2026) | Amount (₹) |
|---|---:|
| Clay purchased (invoice value) | 12,50,000 |
| Freight inwards on clay | 50,000 |
| Direct wages | 3,20,000 |
| Kiln fuel and power | 1,20,000 |
| Royalty for the glaze design | ₹0.10 per kulhad produced |
| Works overheads | 4,000 kiln hours at ₹50 an hour |
| Quality control (leak and crack testing) | 60,000 |
| Administration overheads related to production | 40,000 |
| Broken kulhads sold as crushed clay | 25,000 |
| General administration overheads | 1,32,000 |
| Selling and distribution overheads | ₹0.50 per kulhad sold |

| Stocks | 1 July 2026 (₹) | 31 July 2026 (₹) |
|---|---:|---:|
| Clay (raw material) | 1,10,000 | 1,40,000 |
| Work-in-process (dried, unfired) | 80,000 | smudged |
| Finished kulhads | 1,35,000 (30,000 kulhads) | ? (40,000 kulhads) |

**Required:**

(i) Calculate July's cost of production, the cost per kulhad and the value of the closing finished kulhads.

(ii) Find the closing work-in-process.

(iii) Prepare the cost sheet for July from clay consumed to sales.

::: answer Show the working
**Working notes**

1. Sales = 3,90,000 × ₹6.96 = ₹27,14,400; profit = ⅙ × ₹27,14,400 = ₹4,52,400; cost of sales = ₹22,62,000.
2. Selling and distribution = 3,90,000 × ₹0.50 = ₹1,95,000. Cost of goods sold = ₹22,62,000 − ₹1,32,000 − ₹1,95,000 = **₹19,35,000**.
3. Closing finished kulhads = 30,000 + 4,00,000 − 3,90,000 = 40,000. Under FIFO they are July's, valued at July's cost per kulhad, which is unknown: closing stock = 40,000 ÷ 4,00,000 = 10% of the cost of production (CP).
4. Direct expenses = kiln fuel ₹1,20,000 + royalty 4,00,000 × ₹0.10 = ₹1,60,000 (SM 6.4). Works overheads = 4,000 × ₹50 = ₹2,00,000.

**(i) Cost of production.** Cost of goods sold = CP + opening stock − closing stock:

$$19{,}35{,}000 = \text{CP} + 1{,}35{,}000 - 0.10\,\text{CP} \qquad 0.90\,\text{CP} = 18{,}00{,}000 \qquad \text{CP} = 20{,}00{,}000$$

Cost of production **₹20,00,000**, or ₹20,00,000 ÷ 4,00,000 = **₹5 a kulhad**; closing finished kulhads 40,000 × ₹5 = **₹2,00,000**. Check: the 30,000 old kulhads (₹1,35,000) plus 3,60,000 new ones at ₹5 (₹18,00,000) = ₹19,35,000.

**(ii) Closing work-in-process.** Climb down from cost of production to works cost, and up from clay to gross works cost; the WIP closes the gap.

| Particulars | Amount (₹) |
|---|---:|
| Cost of production (part i) | 20,00,000 |
| Less: Quality control | (60,000) |
| Less: Administration related to production | (40,000) |
| Add: Crushed clay sold (deducted on the way up) | 25,000 |
| **Works cost** | **19,25,000** |

| Particulars | Amount (₹) |
|---|---:|
| Clay consumed: 1,10,000 + 12,50,000 + 50,000 − 1,40,000 | 12,70,000 |
| Direct wages | 3,20,000 |
| Direct expenses (WN 4) | 1,60,000 |
| **Prime cost** | **17,50,000** |
| Works overheads (WN 4) | 2,00,000 |
| **Gross works cost** | **19,50,000** |

Closing WIP = gross works cost + opening WIP − works cost = ₹19,50,000 + ₹80,000 − ₹19,25,000 = **₹1,05,000**.

**(iii) Cost sheet of the Khurja kulhad unit for July 2026** (output 4,00,000; sold 3,90,000)

| Particulars | Amount (₹) |
|---|---:|
| Opening clay 1,10,000 + purchases 12,50,000 + freight 50,000 − closing clay 1,40,000 | 12,70,000 |
| Direct wages | 3,20,000 |
| Direct expenses (WN 4) | 1,60,000 |
| **Prime cost** | **17,50,000** |
| Works overheads (WN 4) | 2,00,000 |
| **Gross works cost** | **19,50,000** |
| Add: Opening WIP 80,000; less: closing WIP 1,05,000 | (25,000) |
| **Works cost** | **19,25,000** |
| Add: Quality control | 60,000 |
| Add: Administration related to production | 40,000 |
| Less: Crushed clay sold | (25,000) |
| **Cost of production (₹5 a kulhad)** | **20,00,000** |
| Add: Opening finished kulhads | 1,35,000 |
| Less: Closing finished kulhads | (2,00,000) |
| **Cost of goods sold** | **19,35,000** |
| Add: General administration | 1,32,000 |
| Add: Selling and distribution (WN 2) | 1,95,000 |
| **Cost of sales (₹5.80 a kulhad)** | **22,62,000** |
| Profit (⅙ of sales = 20% on cost of sales) | 4,52,400 |
| **Sales (3,90,000 × ₹6.96)** | **27,14,400** |

The forward sheet landing on the sales register's ₹27,14,400 is the check that both climbs were right. Valuing the closing kulhads at the opening rate (₹4.50) instead of July's ₹5 would give a cost of production of ₹19,80,000 and a closing WIP of ₹1,25,000: the FIFO rule decides the answer.
:::
::::

## Under the hood

### Two denominators, and which stock method

Up to cost of production, divide by **units produced**; from cost of goods sold onwards, by **units sold** (SM Illustration 1, 6.11: general administration of ₹35,000 over 3,600 units sold is ₹9.72). The Study Material's own answer to Problem 2 values closing finished goods at this period's cost of production per unit (₹94.73 × 44,000, SM 6.32), the first-in, first-out reading, and ICAI's suggested answers do the same (January 2026 Q2(a) names FIFO). Weighted average would give ₹30,10,000 ÷ 52,000 = ₹57.88 for the samosa packs. If the question is silent, use FIFO and say so.

### "Office overheads" without an adjective, and where scrap goes

For "office overheads recovered at 20% of works cost", ICAI's answer to May 2025 Q2(a) put them inside cost of production, and added a note that a student who reads them as general overheads puts them in cost of sales: state the reading you use. The specimen deducts scrap at line 13; May 2026 Q2(a) asked for a "net works cost", so its answer deducted scrap straight after works cost. Cost of production is the same either way.

### Next door

Work-in-process by equivalent units: [[cma.proc.eu|equivalent units]]. By-products: [[cma.joint.byprod|treatment of by-products]]. Absorbing administration and selling overheads: [[cma.oh.ads|administration, selling and distribution overheads]]. A single-product factory's cost sheet *is* [[cma.unit.unit|unit costing]]; the service version is [[cma.sheet.service|the cost sheet for the service sector]]. Factory overheads arrive at the rates built in [[cma.oh.absorb|absorption rates]]; split by behaviour instead, the same costs give the marginal cost statement of [[cma.mc.absorb|marginal versus absorption costing]].

## Exam angle

::: exam Where the manufacturer's cost sheet appeared, May 2024 to September 2026
In the documents read for this lesson, it was examined in seven of the eight past papers from May 2024 to September 2026 (all but May 2024), and in five MTP questions.

- **Descriptive, 7 to 9 marks.** A long list of bills, stocks and a margin: January 2025 Q2(a) (9 marks). Two models, office overheads at 20% of works cost: May 2025 Q2(a) (7 marks). Prime cost to profit with scrap: May 2026 Q2(a) (7 marks). Only the figures "as they will appear in the Cost Sheet": September 2026 Q5(a) (7 marks). Two months at 40% and 100% capacity: September 2024 Q2(a) (8 marks), worked in [[cma.sheet.quote|estimated cost sheets]].
- **Working backwards, 5 to 9 marks.** Cost of production given, materials consumed as the balancing figure: January 2026 Q2(a) (9 marks). Cost of goods sold given, direct wages "being 180% of factory overheads", production administration at 8% of factory overheads: MTP Series I September 2026 Q5(b) (5 marks). The Study Material's own Problem 1 (SM 6.23) is the same climb.
- **Classification and treatment, 4 to 5 marks.** Ten items by function: September 2026 Q6(a). Lockdown wages, a subsidy, interest on a term loan, GST with input tax credit: September 2026 Q6(c). The SM 6.5–6.10 items: MTP Series II May 2025 Q3(b); MTP Series I September 2024 Q2(b). Cost of production from a list of bills: MTP Series I September 2024 Q1(a).
- **Multiple choice, 2 marks each**, five on one case scenario walking down the tiers: September 2025 MCQs 1–5; MTP Series I May 2026 MCQs 6–10.
:::

::: exam The traps ICAI set
- "Inclusive of GST @ 18% (ineligible for ITC)" stays in material cost (January 2025); creditable GST comes out.
- Closing finished stock must be valued: units produced = units sold + closing − opening (January 2025, January 2026).
- "Profit is 20% on sales": add 25% of cost of sales, or divide it by 80%.
- "Direct labour cost ₹17,500 being 175% of works overheads" (SM 6.23): overheads = ₹17,500 ÷ 1.75 = ₹10,000, never ₹17,500 × 1.75.
:::

::: trick FIFO stock in one line
Units produced = units sold + closing stock − opening stock; closing stock = closing units × (cost of production ÷ units produced). Condition: FIFO, or closing stock stated to be from this period's output.
:::

## Answer frame

The chapter's own theory questions (SM 6.22) and the MTP favourites. Write the points in this order.

**Describe how costs are classified on the basis of function.** Costs are divided according to the function for which they have been incurred: (i) production / manufacturing cost; (ii) administration cost; (iii) selling cost; (iv) distribution cost; (v) research and development costs. In a cost sheet they are grouped into prime cost, cost of production, cost of goods sold and cost of sales.

**Explain the treatment of administration overheads.** (1) Only administrative overheads related to production are included in cost of production. (2) General administration overheads are not included in production cost; they are added to cost of goods sold to arrive at cost of sales. (3) General administration includes (SM 6.7): (a) depreciation and maintenance of building, furniture etc. of corporate or general management; (b) salary of administrative employees, accountants, directors, secretaries etc.; (c) rent, rates and taxes, insurance, lighting, office expenses etc.; (d) indirect materials: printing and stationery, office supplies etc.; (e) legal charges, audit fees, corporate office expenses like directors' sitting fees, remuneration and commission, meeting expenses etc.

**State the advantages of a cost sheet.** The five points of SM 6.10, in that order.

**Explain the treatment of the following items.** One line per item, in the words of the table in How it works.

::: cols
**Loses marks**

One column of figures, closing stock at the cost of goods sold figure, GST added "to be safe", income tax in administration.
---
**Passes**

The right tiers in the right order, but stocks valued without showing units produced, and excluded items silently dropped.
---
**Full marks**

ICAI's line order, every subtotal named, working notes for units and closing stock, each excluded item listed with its reason.
:::

## Common mistakes

::: mistake Hall of Shame: the GST that sneaked into material cost
Ritu's intern added ₹86,40,000 of GST to the premix plant's materials "because we paid it". **Fix:** GST is material cost only if input tax credit is not available or not availed.
:::

::: mistake The managing director's salary in cost of production
General administration placed above cost of production inflates every closing stock. **Fix:** only administration related to production goes into cost of production; the rest comes after cost of goods sold.
:::

::: mistake The two kinds of packing swapped
Foil sachets in selling, outer cartons in cost of production. **Fix:** packing that holds and preserves the product is primary (cost of production); packing to store, transport or promote it is secondary (selling and distribution).
:::

::: mistake Closing stock valued at the wrong rate
The 6,000 closing samosa packs at cost of goods sold per pack (₹57.87), or at cost of sales per pack (₹74.87, carrying selling costs unsold stock never incurred). **Fix:** this period's cost of production per unit (FIFO), ₹58.
:::

## Practice

::: quiz Check yourself
Q: A Tapri unit's cost of production for the month is ₹12,00,000 for 20,000 units. Opening finished stock was 2,000 units costing ₹1,10,000 and 21,000 units were sold. Using FIFO, what is the cost of goods sold in rupees?
= 1250000
> Closing units = 2,000 + 20,000 − 21,000 = 1,000, at ₹12,00,000 ÷ 20,000 = ₹60: ₹60,000. Cost of goods sold = ₹12,00,000 + ₹1,10,000 − ₹60,000 = ₹12,50,000. Check: the 2,000 old units (₹1,10,000) plus 19,000 new ones at ₹60 (₹11,40,000).

Q: Case scenario. Ritu is classifying the premix plant's bills: the salary of the chemist who tests each batch against food-safety standards; outer cartons for the trucks; interest on the working capital loan; wages paid to workers idle during a sudden State lockdown. Which treatment is correct?
- [ ] Chemist: factory overhead; cartons: primary packing; interest: works cost; idle wages: employee cost
- [x] Chemist: quality control cost; cartons: secondary packing; interest: separate item of cost of sales; idle wages: excluded as abnormal cost
- [ ] Chemist: research and development; cartons: secondary packing; interest: excluded; idle wages: factory overhead
- [ ] Chemist: quality control cost; cartons: primary packing; interest: cost of production; idle wages: excluded
> Testing for compliance with standards is quality control (SM 6.5); cartons that help transport are secondary packing (SM 6.7); interest is a separate item of cost of sales (SM 6.10); lockdown wages are an abnormal cost (SM 6.9).

Q: For August the premix plant shows: gross works cost ₹8,00,000; opening WIP ₹50,000; closing WIP ₹70,000; quality control ₹20,000; scrap sold ₹10,000; primary packing ₹30,000; secondary packing ₹15,000; general administration ₹40,000. What is the cost of production?
- [ ] ₹8,75,000
- [x] ₹8,20,000
- [ ] ₹8,60,000
- [ ] ₹8,40,000
> ₹8,00,000 + ₹50,000 − ₹70,000 = works cost ₹7,80,000; + ₹20,000 − ₹10,000 + ₹30,000 = ₹8,20,000. Secondary packing and general administration come after cost of goods sold (₹8,75,000 adds them); ₹8,60,000 swaps the WIP signs; ₹8,40,000 adds the scrap instead of deducting it.

Q: Cost of sales is ₹6,00,000 and Kesar wants a profit of 25% on sales. What should sales be?
- [ ] ₹7,50,000
- [x] ₹8,00,000
- [ ] ₹7,20,000
- [ ] ₹7,80,000
> 25% on sales is 33⅓% on cost: profit ₹2,00,000, sales ₹8,00,000. Adding 25% of cost gives ₹7,50,000, only 20% on sales.

Q: Which of these are NOT part of any tier of the cost sheet? Select all that apply.
- [x] A fine paid for a pollution violation
- [ ] Royalty paid to the owner of a production process
- [x] Income tax paid by the company
- [ ] Insurance of the stock of raw materials and WIP
- [x] GST paid on purchases when input tax credit is available
> Fines are not cost (SM 6.9); income tax is left out in ICAI's answers; creditable GST is not a cost (SM 6.3). Production royalty is a direct expense, stock insurance a factory overhead (SM 6.4–6.5).
:::

## Recap

- Functional classification: production, administration, selling, distribution, R&D (SM 6.2).
- Prime cost = direct materials consumed + direct employee cost + direct expenses.
- Works cost = prime cost + factory overheads + opening WIP − closing WIP.
- Cost of production = works cost + QC + R&D (process) + production administration − scrap and by-product credit + primary packing.
- Cost of goods sold = cost of production + opening − closing finished goods (closing at this period's cost of production per unit, FIFO).
- Cost of sales = cost of goods sold + general administration + selling + secondary packing + distribution; interest as a separate item.
- Out of cost: abnormal costs, penalties and fines, creditable GST, income tax; subsidies reduce the cost they relate to.
- x% profit on sales = x ÷ (100 − x) on cost. (The tiffin is built from the bottom up.)

## Flashcards

Q:: ICAI's functional classification of costs, in order?
A:: (i) Production / manufacturing cost, (ii) administration cost, (iii) selling cost, (iv) distribution cost, (v) research and development costs.

Q:: The four cost heads in a cost sheet?
A:: Prime cost, cost of production, cost of goods sold, cost of sales.

Q:: Define prime cost.
A:: The total of direct materials costs, direct employee (labour) costs and direct expenses.

Q:: What is added to works cost to arrive at cost of production?
A:: Quality control cost, R&D cost (process related), administrative overheads related to production and primary packing, less credit for recoveries (scrap, waste, by-products).

Q:: Primary versus secondary packing: where does each go?
A:: Primary packing (holds and preserves the product) is in cost of production; secondary packing (to store, transport and promote) is in cost of sales with selling and distribution.

Q:: Treatment of interest and finance charges in a cost sheet?
A:: Not included in cost of production; presented as a separate item of cost of sales.

Q:: Treatment of abnormal costs in a cost sheet?
A:: Where material and quantifiable, they do not form part of cost of production or acquisition or supply of goods or provision of service (e.g. costs of a pandemic, employee costs of a sudden lockdown).

Q:: Treatment of a subsidy, grant or incentive?
A:: Reduced from the cost object to which the amount pertains.

Q:: Treatment of penalty, fine, damages and demurrage?
A:: They do not form part of cost.

Q:: When is GST on raw materials part of material cost?
A:: Only when input tax credit is not available or not availed.

Q:: Advantages of a cost sheet (SM 6.10)?
A:: Total cost and cost per unit; cost comparison; cost estimates for tenders; arriving at selling price; cost control by disclosing operational efficiency.

Q:: Units produced from units sold and stocks?
A:: Units produced = units sold + closing stock − opening stock.
