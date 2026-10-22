---
id: cma.intro.methods
title: Methods and techniques of costing, and digital costing
minutes: 26
needs: cma.intro.terms
tags: methods of costing, techniques of costing, job costing, process costing, uniform costing, digital costing, information technology
labs:
summary: Which method of costing fits which kind of output, the techniques that work with any method, how IT and ERP changed cost accounting, and what a digital costing system collects and delivers.
---

## In plain words

### One company, seven ways to collect costs

Ritu has drawn Tapri's businesses on the whiteboard, and Kesar is not happy.

> **Kesar:** Why do you need seven different cost sheets? Cost is cost. Make one format for everything.
> **Ritu:** A wedding order and a tanker of premix are different animals, Kesar-ji. One is finished once, to one customer's menu. The other never stops flowing.

The wedding catering order is costed **as a job**: every rupee spent on it is collected on that order. The Diwali gift boxes are made 5,000 identical boxes at a time, so each lot is costed **as a batch** and divided by 5,000. The chai premix flows through blending, roasting and packing, so costs are collected **stage by stage, process by process**. The new headquarters that Tapri's engineers are building for two years is costed **as a contract**. The cold-chain trucks sell a service, not a product, so they are costed per tonne-kilometre (**operating costing**). The kulhad-making machine Tapri builds for its franchisees has parts made in batches and an assembly line at the end, so it needs **a mix of methods**. The way the output is produced decides the **method of costing**.

Then Dev joins in. He wants to see the premix cost split into fixed and variable, the plant's actual cost compared with the standard, and the full cost charged to every pack for valuing stock. These are not new methods: they are **techniques**, ways of looking at and using the costs, and any of them can be applied whichever method collected the costs.

Finally, Kesar's favourite: the delivery app. It now reports the cost of every order as it happens, links the plant with suppliers and customers, and predicts next week's demand. That is **digital costing**: the same costing ideas, with a different way of collecting, storing, analysing and reporting the data.

::: analogy Containers and lenses
A method is the container you collect costs in: a job bag, a batch tray, a process bucket, a contract file. A technique is the lens you look at the contents through: marginal, standard, absorption. Any lens works on any container. Digital costing replaces the paper and the monthly wait with sensors, an ERP and real time.
:::

::: key
The **method** follows the nature of the output (job, batch, contract, process, single output, service, or a mix). A **technique** (uniform, marginal, standard, historical, absorption) is used with any method. **Digital costing** changes how cost data is collected, stored, analysed and reported, and links the entity with its suppliers, customers and market.
:::

## How it works

### Methods of costing: what the output looks like

Different industries follow different methods of costing because of the differences in the nature of their work (SM 1.36). ICAI's list, in its order:

| Method | What it costs (ICAI) | Typical industries |
|---|---|---|
| Single or output costing | The cost of a product that is the only one produced | Bricks, coal |
| Batch costing | An extension of job costing: each batch is a unit of cost; cost per unit = cost of the batch ÷ units in the batch | Small orders passed through in batches |
| Job costing | Cost of each job ascertained separately; work undertaken on receiving a customer's order | Printing press, motor workshop |
| Contract costing | Cost of each contract ascertained separately | Bridges, roads, buildings |
| Process costing | Cost of completing each stage of work, e.g. pulp, then paper from pulp; in mechanical operations, cost of each operation (**operation costing**) | Paper, sugar |
| Operating costing | Concerns rendering services | Transport, supply of water, retail trade |
| Multiple costing | A combination of two or more of the above, e.g. bicycle parts by job or batch costing and assembly by single or output costing | Bicycles |

(SM 1.36–1.37.) ICAI summarises them by the nature of output (SM 1.37–1.38):

| Nature of output | Method | Cost | Example |
|---|---|---|---|
| A series of processes | Process or operation costing | For each process | Sugar |
| Construction of building | Contract costing | For each contract | Real estate |
| Similar units of a single product, by a single process | Unit or single or output costing | For the entire activity, averaged for the output | Cold drinks |
| Rendering of services | Operating costing | For all services | Hospitals |
| Customer specifications: single unit | Job costing | For each order, assignment or job | Advertising |
| Multiple varieties of activities and processes | Multiple costing | Combination of any method | Car assembly |

Industries also follow **Activity Based Costing**, an accounting methodology that assigns costs to activities rather than products or services: cost is identified with each cost-driving activity, which becomes the basis for apportioning costs over cost objects, jobs, products, customers or services (SM 1.38; see [[cma.abc.concept|activity based costing]]).

::: diagram Which method of costing?
{"type": "flow", "w": 350, "nodes": [{"id": "s", "kind": "start", "label": "The output"}, {"id": "q1", "kind": "decision", "label": "A service?"}, {"id": "op", "kind": "end", "label": "Operating costing", "color": "e"}, {"id": "q2", "kind": "decision", "label": "Construction\nproject?"}, {"id": "ct", "kind": "end", "label": "Contract costing", "color": "d"}, {"id": "q3", "kind": "decision", "label": "To one\ncustomer's order?"}, {"id": "jb", "kind": "end", "label": "Job costing", "color": "c"}, {"id": "q4", "kind": "decision", "label": "Identical\nunits in lots?"}, {"id": "bt", "kind": "end", "label": "Batch costing", "color": "h"}, {"id": "q5", "kind": "decision", "label": "Series of\nprocesses?"}, {"id": "pr", "kind": "end", "label": "Process costing", "color": "b"}, {"id": "q6", "kind": "decision", "label": "One product,\none process?"}, {"id": "un", "kind": "end", "label": "Single or output costing", "color": "a"}, {"id": "mu", "kind": "end", "label": "Multiple costing", "color": "f"}], "edges": [["s", "q1"], ["q1", "op", "yes"], ["q1", "q2", "no"], ["q2", "ct", "yes"], ["q2", "q3", "no"], ["q3", "jb", "yes"], ["q3", "q4", "no"], ["q4", "bt", "yes"], ["q4", "q5", "no"], ["q5", "pr", "yes"], ["q5", "q6", "no"], ["q6", "un", "yes"], ["q6", "mu", "no"]], "caption": "A rough guide built from ICAI's descriptions (SM 1.36–1.38). Each method has its own colour. Multiple costing is for output that combines several of these, such as parts made in batches and assembled on a line."}
:::

### Techniques of costing: how costs are looked at

"For ascertaining cost, following types of costing are usually used" (SM 1.38):

| Technique | ICAI's description |
|---|---|
| Uniform costing | A number of firms in an industry agree among themselves to follow the same system of costing in detail, adopting common terminology for various items and processes |
| Marginal costing | The ascertainment of marginal cost by differentiating between fixed and variable costs; used to ascertain the effect of changes in volume or type of output on profit |
| Standard costing and variance analysis | Standard costs are pre-determined and subsequently compared with the recorded actual costs: a technique of cost ascertainment and cost control. It may be used with ==any method of costing==, and is especially suitable for standardised goods of repetitive nature |
| Historical costing | The ascertainment of costs after they have been incurred; limited utility. **Post costing**: after production is completed. **Continuous costing**: as soon as the job is completed, or even while the job is in progress |
| Absorption costing | Charging all costs, both variable and fixed, to operations, processes or products; differs from marginal costing, where fixed costs are excluded |

(SM 1.38–1.39.) The two advantages of **uniform costing**: (i) the performance of each firm can be compared with that of another, or with the average performance in the industry; (ii) the cost of production of goods which is true for the industry as a whole can be determined, which is found useful when tax-relief or protection is sought from the Government (SM 1.38–1.39).

### Information technology in cost accounting

The introduction of **Enterprise Resource Planning (ERP)** systems changed cost and management accounting dramatically, and Industry 4.0 puts more emphasis on digitisation and automation of business processes for better control over cost (SM 1.17). ICAI lists the impact of IT as follows (SM 1.17–1.18):

1. **Integration.** After ERPs, functional activities are integrated: a single entry into the accounting system provides custom-made reports for every purpose, and reconciling the results of cost and financial accounts becomes simpler and less cumbersome.
2. **Paperless environment.** Documents like the Bill of Material, Material Requisition Note, Goods Received Note and labour utilisation report are no longer prepared in multiple copies; each department gets an e-copy from the system.
3. **Procurement and mobilisation.** Internet, intranet and extranet help: production gets materials from stores without a physical material requisition note, and purchase orders go to suppliers over the extranet. This enables a shift towards Just-in-Time (JIT) inventory management and production.
4. **Accurate and timely cost information.** Each cost centre and cost object is codified, and costs are assigned by code: accumulation and ascertainment are automated, and information can be customised job-wise, batch-wise, process-wise or cost centre-wise.
5. **Uniformity** in preparing reports, budgets and standards, irrespective of location, currency, language and regulations.
6. **Real-time variance reports** of cost and revenue, so management can take control measures immediately.
7. **Elimination of non-value added activities**, by monitoring and analysing each process closely.

### The digital costing system

::: definition Digital costing system
Like the conventional cost accounting system, a digital costing system collects data, classifies it and accounts for it to get and process information for decisions; the difference is the method of collection, medium of storage, forms of analysis and reporting. It links business functions such as production, procurement and inventory management with the digital costing systems of its suppliers, customers and the market, through data sharing and network interaction. (SM 1.18)
:::

::: diagram What a digital costing system links
{"type": "nest", "w": 390, "root": {"title": "Digital costing system", "note": "data sharing, network interaction", "mono": false, "dir": "h", "children": [{"title": "Inside Tapri", "mono": false, "lines": ["Production", "Procurement", "Inventory management"], "color": "a"}, {"title": "Outside", "mono": false, "lines": ["Suppliers", "Customers", "The market"], "color": "d"}]}, "caption": "SM 1.18: the system links the entity's own functions (blue) with the digital costing systems of its suppliers, customers and the market (orange)."}
:::

It provides data to get six kinds of information (SM 1.18–1.19): (i) cost incurred on a cost object; (ii) data on time spent; (iii) data on resource consumption; (iv) data on current market price of the final product and raw materials; (v) data on lead time and availability of materials; (vi) data on product demand and trend.

With **Artificial Intelligence (AI)** and **Machine Learning (ML)**, which help analyse **Big Data** and apprehend consumption and demand patterns, it delivers eight benefits (SM 1.19):

::: steps
1. **Ascertainment of cost with certainty** on a cost object, which helps to analyse activities for cost allocation and apportionment.
2. **Analysis of time spent** on each activity, to study and formulate incentive plans.
3. **Material requirement planning** and scheduling of procurement; resource consumption data analysed for resource optimisation, zero wastage and Just-in-Time.
4. **Identification and elimination of non-value-added activities.**
5. **Setting standards and measuring variances on a real-time basis**, from resource consumption data.
6. **Estimating cost and setting standards on a Marked to Market (M2M) basis**, from current market prices of materials and consumables.
7. **Predicting market demand** by extrapolating data on customer behaviour, for budgets and production planning.
8. **Better analysis of cost behaviour**, which improves cost-benefit analysis and equips management for informed decision making.
:::

## Worked examples

:::: example Six businesses, six methods
Tapri asks you to recommend a method of costing and a cost unit for each of these operations, with reasons:

(a) A chai-masala unit: whole spices are cleaned, roasted, ground and packed, the output of each stage passing to the next as its input.

(b) A printing unit that prints menu cards to each café owner's own design.

(c) Chai biscuits, baked in batches of 20,000 identical packets.

(d) A cold-storage warehouse at Nagpur that Tapri's engineering wing is building for a client over 18 months.

(e) A chain of 12 highway motels.

(f) Electric delivery scooters: frames are made in the workshop in lots, motors are bought in, and each scooter is assembled on a line.

::: answer Model answer
| Operation | Method | Cost unit |
|---|---|---|
| (a) Chai masala | Process costing | Kilogram |
| (b) Menu cards | Job costing | Each job |
| (c) Biscuits | Batch costing | Batch, then per packet |
| (d) Warehouse | Contract costing | Each contract |
| (e) Motels | Operating costing | Room-day |
| (f) Scooters | Multiple costing | Number of scooters |

Reasons:

(a) The output passes through a series of processes (cleaning, roasting, grinding, packing); process costing ascertains the cost of completing each stage of work (SM 1.37). A product sold by weight is costed per kilogram, as chemicals are (SM 1.20).

(b) Work is undertaken on receiving each customer's order, to the customer's specification: the cost of each job is ascertained separately.

(c) Identical units are made in lots; each batch is treated as a unit of cost, and cost per packet = cost of the batch ÷ number of packets in the batch (SM 1.36).

(d) Construction of a building: the cost of each contract is ascertained separately.

(e) The motels render a service: operating costing.

(f) Frames are costed by batch costing and the assembly by single or output costing; the combination is multiple costing, as in ICAI's bicycle example (SM 1.37).

Cost units: the Study Material's cost unit for hotels is the room or meal (SM 1.21); ICAI's suggested answers also accept guest days or room days (MTP May 2022 Series II, old scheme).
:::
::::

:::: example "We already have accounting software"
Kesar tells the board: "Our accounting software gives a profit and loss account every month. A digital costing system linked to our suppliers and customers is an expensive toy."

Ritu has to reply. **Explain** how a digital costing system differs from the conventional one, and **describe five benefits** it would bring Tapri.

::: answer Model answer
**What it is.** Like the conventional cost accounting system, a digital costing system collects data, classifies it and accounts for it to get and process information for decisions. The difference is the method of collection, the medium of storage, and the forms of analysis and reporting. It links business functions such as production, procurement and inventory management with the digital costing systems of suppliers, customers and the market through data sharing and network interaction (SM 1.18). A monthly profit and loss account reports the results of the whole entity after the event; a digital costing system provides data on the cost of each cost object, time spent, resource consumption, current market prices, lead times and availability of materials, and product demand and trend.

**Benefits for Tapri** (with AI and machine learning analysing Big Data on consumption and demand; SM 1.19):

1. **Cost with certainty on each cost object**: the cost of each café, delivery route and premix batch, which also helps analyse activities for allocating and apportioning overheads.
2. **Material requirement planning**: milk, tea and kulhad procurement scheduled from consumption data, moving towards zero wastage and Just-in-Time.
3. **Identification and elimination of non-value-added activities** in the plant and the delivery chain.
4. **Standards and variances on a real-time basis**, so a cost overrun at a café is seen the same day, not at the month-end; and standards set on a Marked to Market basis from current prices of milk and tea.
5. **Prediction of market demand** by extrapolating customer behaviour data from the delivery app, for festive budgets and production planning.

**Conclusion.** The accounting software tells the board what profit was made; a digital costing system tells managers what each activity costs and why, while there is still time to act.
:::
::::

:::: example Name the technique
Identify the technique of costing in each case.

(i) Twelve chai-premix makers in an industry association agree to follow the same costing system in detail, with common terms for items and processes.

(ii) The cost of a menu-card printing job is worked out while the job is still on the press.

(iii) Each week the biscuit unit compares its actual flour usage and price with figures set in advance for efficient operation, and analyses the differences.

(iv) To judge a 20% price cut on festive packs, Ritu separates fixed and variable costs and studies how profit changes with volume.

(v) The motel chain charges all its costs, including the fixed rent and depreciation, to room-days.

(vi) After the season's last batch of mango chai is sold, Ritu works out what the season's production cost.

::: answer Model answer
| Case | Technique | ICAI's description, applied |
|---|---|---|
| (i) | Uniform costing | Firms in an industry follow the same system in detail with common terminology; it allows inter-firm comparison and an industry cost when tax relief or protection is sought |
| (ii) | Historical costing: continuous costing | Cost ascertained as soon as the job is completed or even while it is in progress |
| (iii) | Standard costing and variance analysis | Standard costs pre-determined and compared with recorded actual costs |
| (iv) | Marginal costing | Fixed and variable costs differentiated to see the effect of a change in volume on profit |
| (v) | Absorption costing | All costs, variable and fixed, charged to operations, processes or products |
| (vi) | Historical costing: post costing | Cost ascertained after production is completed |

(SM 1.38–1.39.)
:::
::::

## Under the hood

### Methods and techniques are not rivals

A method answers "what output am I costing?"; a technique answers "how will I use the cost?". ICAI says so for standard costing: it "may be used in conjunction with any method of costing" (SM 1.39). The premix plant can use process costing (method) with standard costing (technique) for control and marginal costing (technique) for pricing, all at once. Absorption costing "differs from marginal costing where fixed costs are excluded" (SM 1.39); the two value stock and report profit differently ([[cma.mc.absorb|marginal versus absorption costing]]).

### One method, two names

- **Operating costing** in Chapter 1 is the subject of the Service Costing chapter ([[cma.svc.basics|service costing]]); ICAI's suggested answers write "Service/Operating Costing" (November 2020, old scheme) and "Operation/Service Costing" for an airline (January 2021, old scheme).
- **Operation costing** is the version of process costing for mechanical operations (SM 1.37), not to be confused with operating costing.
- **Single, output or unit costing**: ICAI uses all three names; the lesson [[cma.unit.unit|unit costing]] covers it.

### Where each method is taught in full

[[cma.job.job|Job costing]], [[cma.unit.batch|batch costing and the economic batch quantity]], [[cma.proc.accounts|process costing]] and [[cma.svc.transport|transport costing]] each have their own chapters. This lesson is the map; those are the territory.

## Exam angle

::: exam Where methods, techniques, IT and digital costing appeared (new and old scheme)
In the ICAI documents read for this lesson, these topics came up in 15 questions in 13 documents, all descriptive, usually 4 or 5 marks.

- **Choose the method, new scheme.** MTP January 2025 Series I Q6(d) (4 marks): identify the method from a description and give one example of an industry. MTP January 2026 Series I Q6(a) (5 marks): recommend the method for five businesses (cement, custom furniture, batch pharmaceuticals, packaged snacks, a bus company), "explaining your reasoning". MTP September 2025 Series II Q6(a) (5 marks): complete ICAI's nature-of-output table (method, cost, example).
- **Choose the method, old scheme.** November 2020 Q6(d) (ten industries), January 2021 Q6(d) (five industries), May 2022 Q6(e) (identify the method from five statements), MTP May 2022 Series II Q6(b) (method) and Q6(c) (unit of cost).
- **Techniques.** December 2021 Q6(a), old scheme (5 marks): "Briefly explain the techniques of costing".
- **IT and digital costing.** September 2024 Q6(a) (5 marks): "Describe any five benefits of the Digital Costing System". MTP May 2024 Series I Q6(b) (5 marks): "EXPLAIN the impact of Information Technology in Cost Accounting". Old scheme: January 2021 Q6(e) ("Give any five examples of the impact"), MTP May 2023 Series II Q6(d), MTP November 2023 Series I Q6(d) and RTP May 2022 Q14(d) ("DISCUSS the impact").
- The suggested answers on IT and digital costing reproduce ICAI's lists (SM 1.17–1.19) almost word for word.
:::

::: exam Answers ICAI has accepted that look surprising
- Assembly of bicycles: "Unit/Single/Output/Multiple Costing"; car manufacturing: "Multiple Costing" (November 2020, old scheme). The Study Material's own bicycle example is multiple costing (SM 1.37): write multiple costing, with the reason.
- Biscuits: batch costing (November 2020); pharmaceuticals: batch costing (MTP January 2026); bakery: batch costing (MTP January 2025).
- Cement: "Unit/Output Costing" (MTP January 2026) and "Unit/Single/Output Costing" (November 2020).
- "Nature of the product is complex and method cannot be ascertained": multiple costing (May 2022, old scheme).
:::

::: trick Read the output, not the industry name
The same industry can need different methods: custom furniture to a client's design is job costing, but identical chairs made in lots of 500 would be batch costing. Ask how the output is produced (to order, in lots, in a continuous flow, as a service, or a combination), then name the method. Condition: when the question names only the industry, use ICAI's standard pairing.
:::

## Answer frame

### "State the method of costing and the suggested unit of cost"

A three-column table, one row per industry. ICAI's pairings from the Study Material and suggested answers:

| Industry | Method | Cost unit |
|---|---|---|
| Transport | Operating (service) costing | Passenger-km, tonne-km |
| Power, electricity supply | Operating (service) costing | Kilowatt-hour (kWh) |
| Hospital | Operating (service) costing | Patient day |
| Hotel | Operating (service) costing | Room, meal |
| Bridge, road, building | Contract costing | Each contract |
| Printing, interior decoration, advertising | Job costing | Each job |
| Bricks | Single or output costing | 1,000 bricks |
| Coal | Single or output costing | Tonne |
| Cement | Single or output costing | Ton, per bag |
| Chemicals, oil refinery | Process costing | Litre, kilogram, ton; barrel |
| Biscuits, pharmaceuticals, bakery | Batch costing | Batch |
| Bicycles, car assembly | Multiple costing | Number |

(Methods: SM 1.36–1.38 and the suggested answers in Exam angle; cost units: SM 1.20–1.21, and [[cma.intro.terms|cost units]].)

### "Describe any five benefits of the Digital Costing System" (5 marks)

Open with a two-line definition (collects, classifies and accounts data like the conventional system; differs in collection, storage, analysis and reporting; links production, procurement and inventory with suppliers, customers and the market). Then five of the eight benefits, each with ICAI's key phrase: **cost with certainty** on a cost object; **time spent** for incentive plans; **material requirement planning** and JIT; **non-value-added activities** eliminated; **real-time** standards and variances; **Marked to Market** standards; **demand prediction** for budgets; **cost behaviour** for cost-benefit analysis.

### "Explain the impact of IT in cost accounting" (5 marks)

ICAI's seven points in order: integration through ERP and simpler reconciliation; paperless documents; procurement over intranet and extranet, enabling JIT; codified, accurate and timely cost information, customised job-wise or process-wise; uniformity of reports, budgets and standards; real-time variance reports; elimination of non-value-added activities. Five well-explained points earn the marks.

::: cols
**Loses marks**

"Bicycle: unit costing."

The industry name was read, not the output: parts and assembly need different methods.
---
**Passes**

"Bicycle: multiple costing."

Correct, but a bare name; an "explain your reasoning" question gives no marks for the reason.
---
**Full marks**

"Bicycle: multiple costing. The parts are costed by job or batch costing and the assembly by single or output costing; the combination is multiple costing. Cost unit: number of bicycles."
:::

## Common mistakes

::: mistake Hall of Shame: marginal costing listed as a method
"Methods of costing: job, process, marginal, standard..." mixes the two lists. **Fix:** methods are single or output, batch, job, contract, process, operating and multiple costing (SM 1.36–1.37); uniform, marginal, standard, historical and absorption costing are techniques (SM 1.38–1.39).
:::

::: mistake Operating costing and operation costing treated as one
Writing "operation costing" for a bus company, or "operating costing" for a machine shop. **Fix:** operating costing is for concerns rendering services (transport, water supply, retail trade); operation costing is process costing applied to each mechanical operation (SM 1.37). ICAI's January 2021 (old scheme) answer printed "Operation/ Service Costing" for an airline; write the Study Material's term, operating (service) costing.
:::

::: mistake Digital costing answered as "computerised accounts"
An answer that says only "accounts are kept on a computer, so they are faster". **Fix:** use ICAI's points: links with suppliers, customers and the market; AI and machine learning on Big Data; real-time standards and variances; Marked to Market standards; demand prediction; elimination of non-value-added activities (SM 1.18–1.19).
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Tapri's herbal-tea unit blends sachets in lots of 50,000 identical sachets. Each lot gets a lot number, its costs are collected separately, and the cost of a sachet is the lot's cost divided by 50,000. Dev asks Ritu which method of costing this is. Which answer is correct?
- [ ] Job costing, because each lot is a separate order
- [x] Batch costing, because each lot of identical units is the unit of cost
- [ ] Process costing, because blending is a process
- [ ] Multiple costing, because several sachets are made
> A group of identical items costed together, with cost per unit = cost of the batch ÷ units in the batch, is batch costing (SM 1.36). Job costing is for work to a customer's order; process costing collects cost stage by stage for a continuous flow.

Q: Which of these is a technique of costing, not a method?
- [ ] Contract costing
- [ ] Batch costing
- [x] Marginal costing
- [ ] Multiple costing
> Marginal costing is a technique (SM 1.39). Contract, batch and multiple costing are methods (SM 1.36–1.37).

Q: A software firm, a cement plant and a chain of hospitals ask which method suits them. Which pairing is correct?
- [ ] Cement plant: job costing
- [x] Hospitals: operating costing
- [ ] Software firm: process costing
- [ ] Cement plant: multiple costing
> Rendering of services, such as hospitals, uses operating costing (SM 1.38). Cement is costed by unit or output costing in ICAI's suggested answers. A software firm working to client orders would use job costing.

Q: Which of these are benefits of a digital costing system as ICAI lists them? Select all that apply.
- [x] Setting standards and measuring variances on a real-time basis
- [x] Estimating cost and setting standards on a Marked to Market basis
- [ ] Removing the need to classify cost data
- [x] Predicting market demand from data on customer behaviour
> SM 1.19 lists the first, second and fourth. A digital costing system still collects, classifies and accounts for data like a conventional one (SM 1.18); only the method of collection, storage, analysis and reporting differs.

Q: Ten kulhad makers in Khurja adopt the same costing system and common terms, so that each can compare its cost with the average of the group. Which technique is this, and which other advantage does ICAI give for it?
- [ ] Standard costing; it controls cost through variances
- [x] Uniform costing; it gives a cost of production true for the industry as a whole, useful when seeking tax relief or protection from the Government
- [ ] Marginal costing; it shows the effect of volume on profit
- [ ] Multiple costing; it combines several methods
> Firms in an industry following the same system with common terminology is uniform costing. Its two advantages: inter-firm comparison, and an industry cost useful when tax relief or protection is sought (SM 1.38–1.39).
:::

## Recap

- Methods (SM 1.36–1.37): single or output, batch, job, contract, process (operation), operating, multiple. The method follows the nature of the output.
- Batch cost per unit = cost of the batch ÷ units in the batch; operation costing = process costing for mechanical operations.
- Techniques (SM 1.38–1.39): uniform, marginal, standard costing and variance analysis, historical (post, continuous), absorption. Standard costing can be used with any method.
- Uniform costing's two advantages: inter-firm comparison; an industry cost for tax relief or protection.
- IT impact (SM 1.17–1.18): ERP integration, paperless, extranet procurement and JIT, codified timely cost, uniformity, real-time variances, NVA elimination.
- Digital costing (SM 1.18): same functions, different collection, storage, analysis and reporting; links production, procurement and inventory with suppliers, customers and the market.
- Its benefits (SM 1.19): cost with certainty, time data for incentives, MRP and JIT, NVA elimination, real-time standards, M2M standards, demand prediction, cost behaviour analysis. (Containers, lenses, and now sensors.)

## Flashcards

Q:: The methods of costing, in ICAI's order?
A:: Single or output costing; batch costing; job costing; contract costing; process costing (operation costing); operating costing; multiple costing.

Q:: The techniques of costing ICAI lists?
A:: Uniform costing; marginal costing; standard costing and variance analysis; historical costing (post costing, continuous costing); absorption costing.

Q:: Multiple costing: meaning and ICAI's example?
A:: A combination of two or more methods of costing; e.g. bicycle parts costed by job or batch costing and the assembly of the bicycle by single or output costing.

Q:: Operating costing is used for which concerns?
A:: Concerns rendering services, like transport, supply of water and retail trade.

Q:: Post costing vs continuous costing?
A:: Both are historical costing. Post costing: cost ascertained after production is completed. Continuous costing: cost ascertained as soon as the job is completed or even while the job is in progress.

Q:: The two advantages of uniform costing?
A:: (i) The performance of each firm can be compared with another's or with the industry average; (ii) the cost of production true for the industry as a whole can be determined, useful when tax relief or protection is sought from the Government.

Q:: How does a digital costing system differ from the conventional cost accounting system?
A:: It too collects, classifies and accounts for data to process information for decisions; the difference is the method of collection, medium of storage, forms of analysis and reporting, and it links production, procurement and inventory management with the systems of suppliers, customers and the market.

Q:: The six kinds of data a digital costing system provides?
A:: Cost incurred on a cost object; time spent; resource consumption; current market price of final product and raw materials; lead time and availability of materials; product demand and trend.

Q:: Name five benefits of a digital costing system.
A:: Any five of: cost with certainty on a cost object; time data for incentive plans; material requirement planning and JIT; elimination of non-value-added activities; real-time standards and variances; Marked to Market standards; demand prediction for budgets; better cost behaviour and cost-benefit analysis.

Q:: Impact of IT on cost accounting: what does ERP integration achieve?
A:: A single entry into the accounting system provides custom-made reports for every purpose, saves preparing different sets of documents, and makes reconciliation of cost and financial accounts simpler and less cumbersome.
