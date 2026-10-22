---
id: cma.emp.direct
title: Direct expenses
minutes: 20
needs: cma.intro.classify
tags: direct expenses, royalty, hire charges, job work, prime cost, amortisation, chargeable expenses
labs:
summary: Costs other than direct material and direct employee cost that can be traced to one product, job or service: what they are, how they are measured, and where they sit in prime cost.
---

## In plain words

### The bills only one product ran up

Every Diwali Kesar launches a new product. This year it is a bottled Kesar-Elaichi Cold Chai, and the accounts team has a pile of bills that belong to nothing else.

> **Kesar:** Royalty to the chef who created the recipe, a bottling line hired for the season, the label design, a software licence for the QR codes. Put the lot in miscellaneous.
> **Ritu:** Each one exists only because of this chai. They are its direct expenses: part of its prime cost, next to the milk, the bottles and the line workers' wages.
> **Kesar:** And the courier who took one sample bottle to Mumbai for ₹300?
> **Ritu:** That one is traceable, but too small to matter. It can go to overheads.

A **direct expense** is a cost that is neither direct material nor direct employee cost but can still be traced to one cost object in an economically feasible manner: the royalty, the hire of a specific machine, a design made for one product, software bought for one service. It is added to direct material and direct employee cost to give **prime cost**.

Two practical rules come with it. A **one-time or lump-sum** payment (a design, a licence) is spread over the output that will benefit from it, not charged to the first batch. And an amount too small to matter can be treated as overheads.

::: analogy The party caterer's bill
For a wedding dinner the caterer buys the paneer (direct material) and pays the cooks (direct employee cost). He also hires a tandoor only for that wedding and pays a fee for a special dessert recipe: those are direct expenses of that dinner. The rent of his kitchen and his accountant's salary serve every function he caters: those are overheads.
:::

::: key
Direct expenses are the third part of prime cost: costs other than direct material and direct employee cost that are directly traceable, in an economically feasible way, to a product, job or service. Measure them net of rebates, with non-creditable taxes; spread lump sums over the output that benefits; treat trivial amounts as overheads.
:::

## How it works

### What counts

ICAI's definition: expenses other than direct material cost and direct employee cost, which are incurred to manufacture a product or for provision of service and ==can be directly traced in an economically feasible manner to a cost object== (SM 3.52). ICAI's examples, in its order (SM 3.52):

1. Royalty paid or payable for production or provision of service;
2. Hire charges paid for hiring **specific** equipment;
3. Cost for product or service specific design or drawing;
4. Cost of product or service specific software;
5. Other expenses directly related with the production of goods or provision of service.

The list is not exhaustive: any other expense directly attributable to the production or service is also a direct expense (SM 3.53). The Cost Sheet chapter gives a longer list, in this order (SM 6.4):

1. Cost of utilities such as power and fuel, steam etc.;
2. Royalty paid or payable for production or provision of service;
3. Hire charges paid for hiring specific equipment;
4. Fee for technical assistance and know-how;
5. Amortised cost of moulds, patterns, patents etc.;
6. Cost for product or service specific design or drawing;
7. Cost of product or service specific software;
8. Other expenses directly related with the production of goods or provision of service.

ICAI's answers also put job charges paid to job workers and the fee of a technician hired for the job under direct expenses (SM 3.67, Practical Problem 3; SM 6.17).

### How it is measured

Direct expenses are measured at **invoice or agreed price net of rebate or discount**, but **including** duties and taxes for which input credit is not available, commission and other directly attributable costs (SM 3.53).

**Sub-contracting.** Goods made by job workers independent of the principal are measured at the agreed price. Where the principal supplies some materials to the job workers, the value of those materials and other incidental expenses are added to the job charges (SM 3.53).

### Where it goes

Direct expenses form part of the **prime cost** of the product or service to which they can be traced (SM 3.53). Two exceptions:

- **Lump-sum or one-time payment**: amortised over the estimated production volume or the benefit derived.
- **Insignificant amount** (not material): may be treated as part of overheads.

::: diagram Is it a direct expense?
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "A cost"},
  {"id": "m", "kind": "decision", "label": "Material or wages?"},
  {"id": "me", "kind": "end", "label": "Other element", "color": "mute"},
  {"id": "t", "kind": "decision", "label": "Traceable to it?"},
  {"id": "oh", "kind": "end", "label": "Overheads", "color": "c"},
  {"id": "q", "kind": "decision", "label": "Significant?"},
  {"id": "oh2", "kind": "end", "label": "May be overheads", "color": "c"},
  {"id": "l", "kind": "decision", "label": "One-time payment?"},
  {"id": "am", "kind": "end", "label": "Amortise", "color": "a"},
  {"id": "de", "kind": "end", "label": "Direct expense", "color": "a"}],
 "edges": [["s", "m"], ["m", "me", "yes"], ["m", "t", "no"], ["t", "oh", "no"], ["t", "q", "yes"], ["q", "oh2", "no"], ["q", "l", "yes"], ["l", "am", "yes"], ["l", "de", "no"]],
 "caption": "The tests of SM 3.52–3.53 in order, from the sky-blue start: is it direct material or direct employee cost (another element of prime cost); is it traceable to the cost object in an economically feasible manner; is it material in amount; is it a lump sum. The two blue end boxes are direct expenses, charged in full or amortised over the estimated output or benefit."}
:::

::: diagram Where direct expenses sit
{"type": "nest", "root": {"title": "Prime cost", "color": "mute", "children": [
  {"title": "Direct materials consumed", "color": "a", "mono": false, "lines": ["milk, tea, bottles, caps"]},
  {"title": "Direct employee cost", "color": "b", "mono": false, "lines": ["line workers' wages", "employer's contributions"]},
  {"title": "Direct expenses", "color": "d", "mono": false, "lines": ["royalty, specific hire", "specific design, software", "job work, power for production"]}]},
 "caption": "Prime cost = direct materials + direct employee cost + direct expenses. Factory overheads are added after it to give works cost: see the cost sheet."}
:::

The full cost sheet, from prime cost to cost of sales, is in [[cma.sheet.mfg|the cost sheet for a manufacturer]]; the classification of costs by element is in [[cma.intro.classify|elements and classification of cost]].

## Formats and formulas

::: definition Direct expenses
Expenses other than direct material cost and direct employee cost, which are incurred to manufacture a product or for provision of service and can be directly traced in an economically feasible manner to a cost object. (SM 3.52)
:::

::: formula Amortising a one-time payment
$$\text{Per unit} = \frac{\text{One-time payment}}{\text{Estimated output}}$$
Charge for the period = charge per unit × units produced in the period. Use the estimated benefit instead of units when the benefit is not measured in output (SM 3.53).
:::

::: formula Measuring a direct expense
$$\text{Cost} = \text{Price} - \text{Rebate} \qquad + \text{Non-creditable taxes} + \text{Commission}$$
Price = invoice or agreed price; add any other directly attributable cost (SM 3.53).
:::

ICAI's layout for a classification question (SM 3.54, Illustration 16). *Reproduce it from memory, with notes for every item left out.*

| Calculation of direct expenses | Job A (₹) | Job B (₹) | Job C (₹) |
|---|---:|---:|---:|
| Product blueprint cost | xxx | — | — |
| Hire charges for machinery | — | xxx | — |
| Licence fee for software | — | — | xxx |
| **Total direct expenses** | **xxx** | **xxx** | **xxx** |

Notes: office and administration cost is overheads; salary of office attendants is office and administration cost; salary of the marketing manager is selling overheads (SM 3.54).

## Worked examples

:::: example Three event orders and a pile of bills
Tapri's catering division completed three corporate orders last month: Job A (Diwali hampers for an airline), Job B (a three-day tea stall at a trade fair) and Job C (a co-branded masala chai for a hotel chain). Apart from direct material and direct employee cost, it incurred:

| No. | Item | Amount (₹) |
|---|---|---:|
| (i) | Office and administration cost | 2,40,000 |
| (ii) | Packaging artwork designed for Job A | 85,000 |
| (iii) | Hire of a refrigerated van used only for Job B | 36,000 |
| (iv) | Royalty to a celebrity chef: ₹4 a pack on Job C's 15,000 packs | 60,000 |
| (v) | Salary of the kitchen supervisor, who oversees all jobs | 55,000 |
| (vi) | Commission to sales staff | 48,000 |
| (vii) | Job charges paid to an outside packer for Job A; Tapri also supplied cartons worth ₹12,000 and paid ₹3,000 to send them | 70,000 |
| (viii) | Hire of a sealing machine at ₹500 per machine hour; 40 hours on Job B | 20,000 |
| (ix) | Courier of one sample for Job C | 350 |

The cartons in (vii) have not been charged to any job as material.

**Required:**

(i) Calculate the direct expenses attributable to each job.

(ii) State the treatment of the items that are not direct expenses.

::: answer Show the working
**(i) Calculation of direct expenses**

| Particulars | Job A (₹) | Job B (₹) | Job C (₹) |
|---|---:|---:|---:|
| Packaging artwork for Job A (ii) | 85,000 | — | — |
| Job work: charges ₹70,000 + cartons ₹12,000 + transport ₹3,000 (vii) | 85,000 | — | — |
| Hire of refrigerated van (iii) | — | 36,000 | — |
| Hire of sealing machine, 40 hours × ₹500 (viii) | — | 20,000 | — |
| Royalty, 15,000 packs × ₹4 (iv) | — | — | 60,000 |
| **Total direct expenses** | **1,70,000** | **56,000** | **60,000** |

**(ii) Notes**

1. Office and administration cost (i) is an overhead: administration overheads.
2. The supervisor's salary (v) serves all jobs and cannot be traced to one economically: factory (production) overheads.
3. Commission to sales staff (vi) is selling overheads.
4. The courier charge (ix) is traceable to Job C but insignificant; it may be treated as part of overheads (SM 3.53).
5. Job work (vii) is measured at the agreed price, with the value of materials supplied by Tapri and the incidental expense added (SM 3.53). Had the cartons already been charged to Job A as direct material, only ₹73,000 would be added here.
:::
::::

:::: example Cold Chai: measuring, amortising and building prime cost
In October, Tapri's new bottling unit produced 80,000 bottles of Kesar-Elaichi Cold Chai. Its records show:

| No. | Item | Amount |
|---|---|---|
| (i) | Direct materials consumed | ₹9,60,000 |
| (ii) | Wages of bottling line workers | ₹3,20,000 |
| (iii) | Employer's contribution to PF on those wages | ₹38,400 |
| (iv) | Royalty to the recipe's creator | ₹2 per bottle produced |
| (v) | Hire of a bottling line used only for this product: invoice ₹1,50,000 less 4% trade discount, plus GST at 18% on which input credit is available | |
| (vi) | Commission to the agent who arranged the hire | ₹6,000 |
| (vii) | Label and bottle-mould design for the product, paid once: ₹6,00,000 plus GST of ₹1,08,000 on which input credit is not available; expected to serve 11,80,000 bottles | |
| (viii) | Power for the bottling line, separately metered | ₹42,000 |
| (ix) | Rent of the factory building | ₹80,000 |

**Required:**

(i) Calculate the direct expenses for October.

(ii) Prepare a statement of prime cost, in total and per bottle.

::: answer Show the working
**Working notes**

1. Royalty = 80,000 × ₹2 = **₹1,60,000**.
2. Hire of bottling line = ₹1,50,000 − 4% (₹6,000) = ₹1,44,000. GST is left out because input credit is available; the agent's commission of ₹6,000 is directly attributable and added: **₹1,50,000**.
3. Design is a one-time payment, amortised: (₹6,00,000 + ₹1,08,000 non-creditable GST) ÷ 11,80,000 bottles = ₹0.60 a bottle; October's charge = 80,000 × ₹0.60 = **₹48,000**.
4. Power for the line is separately metered, so traceable to this product: **₹42,000**.
5. Factory rent serves the whole building: factory overheads, not prime cost.

**(i) Direct expenses for October**

| Particulars | Amount (₹) |
|---|---:|
| Royalty (WN 1) | 1,60,000 |
| Hire charges of bottling line (WN 2) | 1,50,000 |
| Design, amortised (WN 3) | 48,000 |
| Power for the bottling line (WN 4) | 42,000 |
| **Total direct expenses** | **4,00,000** |

**(ii) Statement of prime cost for 80,000 bottles**

| Particulars | Total (₹) | Per bottle (₹) |
|---|---:|---:|
| Direct materials consumed | 9,60,000 | 12.00 |
| Direct employee cost (₹3,20,000 + ₹38,400) | 3,58,400 | 4.48 |
| Direct expenses | 4,00,000 | 5.00 |
| **Prime cost** | **17,18,400** | **21.48** |

The factory rent of ₹80,000 joins the factory overheads below prime cost.
:::
::::

## Under the hood

### Specific equipment or general plant?

ICAI's example is hire charges for **specific** equipment. When a question calls the hire of a plant used by everything "indirect expenses", as RTP January 2025 Q5 does, it is an overhead. The test is always traceability to the cost object in an economically feasible manner.

### Power and fuel: direct, or factory overhead?

The Cost Sheet chapter lists "cost of utilities such as power and fuel, steam" as a direct expense (SM 6.4), its illustration puts "amount paid for power and fuel" in direct expenses (SM 6.17), and so do the chapter's Practical Problem 3 (SM 3.67), RTP September 2026 Q8 (with consumable materials) and MTP May 2026 Series I MCQ 11. But where a question gives "heat, light and power" for the factory as a whole, to be shared, it is a works overhead (SM 6.34). Read the description: power paid for production, or separately metered for one line, is direct; a general factory bill to be apportioned is overhead. State your reading in a note.

## Exam angle

::: exam Where direct expenses appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, direct expenses were examined in 8 questions, most often inside a cost sheet.

- **Classification on its own.** "Calculate direct expenses for the month" from power and fuel, factory wages, job workers' bill, royalty, technician's fee, administrative overheads and sales commission: RTP September 2026 Q7. The same idea as an MCQ (2 marks): MTP May 2026 Series I MCQ 11.
- **Inside cost sheets, 7–9 marks.** Hire of specific equipment at a rate per labour hour and fees for technical assistance as direct expenses, lease rent of production assets as factory overhead: January 2026 Q2(a). Job charges paid to job workers: January 2025 Q2(a). Royalty paid for production: MTP September 2024 Series II Q3(a) (7 marks). Consumable materials and power and fuel as direct expenses: RTP September 2026 Q8. Hire charges for a plant marked as indirect: RTP January 2025 Q5.
- **Case scenario MCQs.** Power, diesel for the generator and hire of machines used directly in production inside prime cost; car hire with GST under reverse charge without credit added to the cost: MTP May 2024 Series I, case scenario 2.
:::

::: exam The traps ICAI set
- "Specific equipment" or a job's own machine is direct; a plant used by all is overheads.
- GST or duty **with** input credit stays out; **without** credit it is part of the cost.
- Sales commission, marketing manager's salary and office attendants' salary are never direct expenses (SM 3.54, 3.67).
- A rate per hour or per unit (hire per labour hour, royalty per unit) is multiplied by the hours or units of the period.
:::

## Answer frame

### "What are direct expenses? How are they measured and treated in cost accounts?"

1. **Definition** in ICAI's words (SM 3.52).
2. **Examples**: royalty; hire of specific equipment; product or service specific design or drawing; product or service specific software; other directly related expenses. The list is not exhaustive.
3. **Measurement**: invoice or agreed price net of rebate or discount, including duties and taxes without input credit, commission and other directly attributable costs; job work at agreed price plus materials supplied and incidental expenses.
4. **Treatment**: part of prime cost; lump sums amortised over estimated production or benefit; insignificant amounts as overheads.

### A classification question

Answer in ICAI's layout: a table of the direct expenses by job or product, with the working of each figure (hours × rate, packs × royalty, job work plus materials), then numbered notes giving the treatment of every item left out ("administrative overhead is indirect expense"; "commission paid to sales staff comes under selling expenses"), as the Suggested Answers do. The notes carry marks: a bare total of direct expenses earns little.

## Common mistakes

::: mistake Hall of Shame: the design charged to the launch month
Charging Cold Chai's whole ₹7,08,000 design to October's 80,000 bottles (₹8.85 a bottle). **Fix:** a one-time payment is amortised over the estimated production that benefits: ₹0.60 a bottle.
:::

::: mistake GST that will come back
Adding 18% GST to the bottling line's hire when input credit is available. **Fix:** only duties and taxes for which input credit is **not** available are part of the cost (SM 3.53).
:::

::: mistake Factory wages under direct expenses
Listing wages paid to factory workers as a direct expense because they are "direct". **Fix:** they are direct employee cost, the second element of prime cost, together with the employer's contributions on them (SM 3.67; RTP September 2026 Q8): see [[cma.emp.payroll|attendance, payroll and the elements of wages]].
:::

::: mistake The sales commission that became prime cost
Treating commission paid to sales staff as a direct expense of the product sold. **Fix:** it is a selling overhead (SM 3.67); the commission that *is* part of a direct expense is one paid to acquire that expense, like the agent's fee for hiring the bottling line.
:::

## Practice

::: quiz Check yourself
Q: Tapri pays ₹3,60,000 once for a mould expected to make 2,40,000 kulhads. In November it makes 18,000 kulhads. What direct expense is charged for the mould in November, in rupees?
= 27000
> ₹3,60,000 ÷ 2,40,000 = ₹1.50 a kulhad; 18,000 × ₹1.50 = ₹27,000. Charging all ₹3,60,000 to November is the launch-month mistake.

Q: A product-specific software licence is invoiced at ₹2,00,000 less a 5% rebate, plus a tax of 18% on the net amount for which input credit is not available. A commission of ₹4,000 was paid to the reseller. At what amount is the direct expense measured, in rupees?
= 228200
> ₹2,00,000 − ₹10,000 = ₹1,90,000; tax ₹34,200 (no credit, so included); commission ₹4,000: ₹2,28,200. Leaving the tax out (₹1,94,000) would be right only if input credit were available.

Q: Case scenario. For Job 17, a hotel chain's private-label chai, Ritu finds these costs: wages of the blending staff, a royalty per pack to the hotel for its brand name, the salary of Tapri's marketing manager, and rent of the blending unit used for all products. Which of them is a direct expense of Job 17?
- [ ] Wages of the blending staff
- [x] Royalty per pack paid to the hotel
- [ ] Salary of the marketing manager
- [ ] Rent of the blending unit
> Royalty for production is ICAI's first example of a direct expense (SM 3.52). The wages are direct employee cost, the marketing manager's salary is a selling overhead, and the rent serves every product, so it is a factory overhead.

Q: Which of these are part of the measured cost of a direct expense? Select all that apply.
- [x] Commission paid to acquire it
- [ ] GST on it for which input credit is available
- [x] Duty on it for which input credit is not available
- [ ] The trade discount allowed on the invoice
> Measured at invoice or agreed price net of rebate or discount, including duties and taxes without input credit, commission and other directly attributable costs (SM 3.53).
:::

## Recap

- Direct expenses: costs other than direct material and direct employee cost, incurred for a product or service and traceable to it in an economically feasible manner.
- ICAI's examples: royalty; hire of specific equipment; product- or service-specific design or drawing; specific software; other directly related expenses (not exhaustive). The Cost Sheet chapter adds utilities such as power and fuel, technical know-how fees and amortised moulds and patterns (SM 6.4).
- Measured at invoice or agreed price net of rebate or discount, plus taxes without input credit, commission and other directly attributable costs.
- Job work: agreed price, plus materials supplied by the principal and incidental expenses.
- Part of prime cost; one-time payments amortised over estimated production or benefit; insignificant amounts may be overheads.
- Not direct expenses: factory wages (employee cost), administration, sales commission, marketing salaries, general plant hire. (If only this product ran up the bill, it is a direct expense.)

## Flashcards

Q:: ICAI's definition of direct expenses?
A:: Expenses other than direct material cost and direct employee cost, incurred to manufacture a product or for provision of service, which can be directly traced in an economically feasible manner to a cost object.

Q:: ICAI's examples of direct expenses, in order?
A:: Royalty paid or payable for production or provision of service; hire charges for hiring specific equipment; cost of product or service specific design or drawing; cost of product or service specific software; other expenses directly related with production or provision of service.

Q:: Cost Sheet chapter (SM 6.4): three examples of direct expenses not in Chapter 3's list?
A:: Cost of utilities such as power and fuel, steam etc.; fee for technical assistance and know-how; amortised cost of moulds, patterns, patents etc.

Q:: How are direct expenses measured?
A:: At invoice or agreed price net of rebate or discount, including duties and taxes for which input credit is not available, commission and other directly attributable costs.

Q:: How is sub-contracted (job) work measured as a direct expense?
A:: At the agreed price; where the principal supplies materials to the job workers, the value of those materials and other incidental expenses are added to the job charges.

Q:: Treatment of a lump-sum or one-time direct expense?
A:: Amortised over the estimated production volume or the benefit derived.

Q:: Treatment of a direct expense of insignificant amount?
A:: It may be treated as part of overheads.

Q:: In which element of the cost sheet do direct expenses appear?
A:: Prime cost (direct materials + direct employee cost + direct expenses).

Q:: Salary of the marketing manager, office administration cost and sales commission: direct expenses?
A:: No: salary of the marketing manager and sales commission are selling overheads; office and administration cost is an overhead.
