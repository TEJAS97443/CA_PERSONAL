---
id: aud.entities.commercial
title: Cinemas and hire purchase and leasing companies
minutes: 30
needs: aud.risk.ic, aud.items.revenue
tags: audit of cinema, multiplex, ticket controls, film hire, hire purchase, finance lease, operating lease, leasing company
labs:
summary: The special audit steps for a cinema (tickets, free passes, tax, film hire, advances to distributors) and for hire purchase and leasing companies (the agreements, the documents, finance versus operating lease).
---

## In plain words

### Popcorn, scooters and a fleet of vans

Tapri Tea runs kulhad cafés inside Rajmahal Cinemas, a three-screen multiplex in Indore, and pays the cinema a share of the café's takings. Its delivery boys ride scooters bought on **hire purchase** from Narmada Leasing & Hire Purchase Ltd, and its cold-chain vans are **leased** from the same company. Iyer & Associates audit both Rajmahal Cinemas and Narmada Leasing.

> **Bunty:** Ma'am, the cinema is easy. Tickets in, cash out. I will tie the Cash Book to the bank.
> **Lakshmi:** And how do you know the Cash Book holds every ticket, Bunty? Or that the "free" seats were free by permission?
> **Kesar:** *(from the café counter)* Lakshmi-ji, the leasing people want insurance copies for vans that are parked in my yard!
> **Lakshmi:** They own the vans, Kesar-ji. You only drive them.

A **cinema** sells one product, a seat for one show, mostly for cash. So the auditor's whole attention goes to the **ticket**: every person who walks into the hall must hold a printed, serially numbered ticket; at the end of every show the tickets sold must agree with the cash; free passes must be recorded and authorised; and the tax collected must agree with the tickets issued. The big payments go to **film distributors** under agreements, often with advances that must be adjusted once the film has run.

A **hire purchase** or **leasing company** owns goods that sit with someone else. With hire purchase, the hirer pays in instalments and the goods become his with the last one. With a lease, the lessee pays rent for the right to use the asset; in a **finance lease** that rent is really a way of financing the asset, in an **operating lease** it is plain rent. So the auditor reads the agreement, checks that instalments and rentals arrive on time, and sees that the paperwork protecting the owner (proposal form, invoice, acceptance letter, insurance) is on file.

::: analogy The bus conductor's ticket rolls
A city-bus conductor carries rolls of serially numbered tickets, a separate roll for each fare, and a separate pad for monthly passes. At the end of the trip the depot clerk notes the first and last ticket numbers of each roll, multiplies by the fare and expects exactly that much cash. A staff pass is fine only if the depot issued it. A cinema's ticket control is that depot clerk's job, done for every show and every class of seat.
:::

::: key
In a cinema, revenue is proved through the tickets: serially numbered, bound, a separate series for each show, class and advance booking, kept in custody, agreed with cash at the end of each show, with free passes authorised and tax reconciled to tickets. In a hire purchase or leasing company, the agreement is the evidence: its terms, the regular receipt of instalments or rentals, the lessee's credit and the documents, and whether the lease is a finance lease or an operating lease.
:::

## How it works

### 1. Cinemas

The special steps in the audit of a cinema are (SM 9.49–9.51):

1. **Verify the internal control mechanism**:
    - (a) entrance to the cinema hall during a show is **only through printed tickets**;
    - (b) they are **serially numbered** and bound into books;
    - (c) the numbers of tickets issued for each show and class are different, though the numbers of the same class for the show on the same day each week run serially;
    - (d) for **advance booking a separate series** of tickets is issued; and
    - (e) the **inventory of tickets** is kept in the custody of a responsible official.
2. Confirm that at the **end of each show** a statement of tickets sold is prepared and the **cash collected is agreed** with it.
3. Verify that a record is kept of the ==‘free passes’ and that these are issued under proper authority==.
4. **Reconcile the tax collected** with the total number of tickets issued for each class, and vouch and verify the **tax returns** filed each month.
5. Vouch the **Cash Book** entries for ticket sales of different shows with the **Daily Statements**, themselves test checked as above with the record of tickets issued.
6. Verify the charges collected for **advertisement slides and shorts** with the **Register of Slides and Shorts Exhibited** and the agreements with advertisers.
7. Vouch the expenditure on **advertisement, repairs and maintenance**. **No part of such expenditure should be capitalised.**
8. Confirm that **depreciation** on machinery and furniture has been charged at an appropriate rate.
9. Vouch payments of **film hire** with the distributors' bills, referring to the agreements concerned.
10. Examine the **unadjusted balance of advances paid to distributors** against film hire contracts to see that they are good and recoverable. If a film for which an advance was paid has **already run**, enquire why the advance has not been adjusted; ask management to **provide** for advances considered irrecoverable.
11. Enquire into the arrangement for collecting the cinema's **share of the restaurant income**: a fixed sum or a fixed percentage of the takings may be receivable annually. If the cinema runs the restaurant itself, check its accounts: sales and purchases of foodstuffs, cold drinks, etc., **as in the case of a club** (see [[aud.entities.institutions|clubs and hotels]]).

Where tickets are booked online, ICAI's suggested answer adds that the auditor verifies the **system for online booking** (MTP May 2024 Series I Q6(c)).

::: diagram From the ticket to the Cash Book
{"type": "flow", "w": 420, "nodes": [{"id": "i", "kind": "start", "label": "Ticket inventory with\na responsible official"}, {"id": "t", "kind": "process", "label": "Serial numbers issued\nper show and class"}, {"id": "f", "kind": "process", "label": "Free passes: recorded,\nproperly authorised"}, {"id": "s", "kind": "process", "label": "End of show: statement\nof tickets sold = cash"}, {"id": "x", "kind": "process", "label": "Tax collected reconciled\nwith tickets per class"}, {"id": "c", "kind": "end", "label": "Daily Statements\nvouched into Cash Book"}], "edges": [["i", "t"], ["t", "f"], ["f", "s"], ["s", "x"], ["x", "c"]], "caption": "Points 1 to 5 as one chain: each record is checked against the one before it, so a missing ticket, an unauthorised pass or unbanked cash shows up as a break in the chain."}
:::

### 2. Hire purchase

::: definition Hire-purchase agreement
An agreement under which goods are let on hire and under which the hirer has an option to purchase them in accordance with the terms of the agreement, and includes an agreement under which (i) possession of goods is delivered by the owner to a person on condition that such person pays the agreed amount in **periodical instalments**; (ii) the **property in the goods is to pass** to such person on the payment of the **last of such instalments**; and (iii) such person has a **right to terminate** the agreement at any time before the property so passes (SM 9.51).
:::

The **hirer** is the person who obtains possession of goods from an owner under a hire-purchase agreement; the **owner** is the person who lets, or delivers possession of, goods to a hirer under such an agreement (SM 9.51).

::: diagram Owner and hirer under a hire-purchase agreement
{"type": "seq", "lanes": ["Owner", "Hirer"], "events": [{"from": "Owner", "to": "Hirer", "text": "delivers possession of the goods"}, {"from": "Hirer", "to": "Owner", "text": "deposit or initial payment"}, {"from": "Hirer", "to": "Owner", "text": "agreed periodical instalments"}, {"lane": "Hirer", "text": "may terminate before property passes"}, {"from": "Owner", "to": "Hirer", "text": "property passes on the last instalment"}], "caption": "Possession moves at the start; ownership moves only with the last instalment."}
:::

While checking hire-purchase transactions, the auditor may examine that (SM 9.52):

- (i) the agreement is **in writing** and **signed by all parties**;
- (ii) the agreement clearly specifies (a) the **hire-purchase price**; (b) the **cash price**, the price at which the hirer may buy the goods for cash; (c) the date on which the agreement is deemed to have **commenced**; (d) the **number of instalments**, the amount of each, the date (or mode of determining it) on which each is payable, and the person to whom and the place where it is payable; (e) the **goods**, described sufficiently to identify them;
- (iii) **instalment payments are being received regularly** as per the agreement.

### 3. Leases

In a lease agreement, the **lessee** acquires the right to use an asset for an agreed period in consideration of rent paid to the **lessor**. In some leases the lessor (the leasing company) keeps legal ownership but, in substance, **all the risks and rewards of ownership are transferred to the lessee**: the lease is in effect a **financing arrangement**, a **finance lease**. An **operating lease** is a simple arrangement where, in return for rent, the lessor allows the lessee to use the asset for a certain period (SM 9.52).

**How a normal finance lease runs** (SM 9.52–9.53):

::: diagram The modality of a finance lease
{"type": "seq", "lanes": ["Lessee", "Lessor", "Manufacturer"], "events": [{"lane": "Lessee", "text": "I. selects the equipment"}, {"from": "Lessee", "to": "Lessor", "text": "II. approaches, directly or via a broker"}, {"from": "Lessor", "to": "Manufacturer", "text": "III. rates agreed; order placed"}, {"from": "Manufacturer", "to": "Lessee", "text": "IV. delivers at the lessee's site"}, {"from": "Lessee", "to": "Lessor", "text": "IV. notice of acceptance"}, {"from": "Lessor", "to": "Lessee", "text": "V. lease agreement signed"}, {"from": "Lessee", "to": "Lessor", "text": "VI. rentals, usually monthly"}, {"from": "Lessee", "to": "Lessor", "text": "VII. equipment reverts at the end"}], "caption": "The lessor plays no part in choosing the equipment. During the lease the lessee keeps it in good repair and gets the manufacturer's warranties; leases are normally full pay-out. At the end the lessee may get a renewal right or join in buying the equipment when the lessor sells it, but no purchase option is given in the lease agreement itself."}
:::

**Auditor's procedures for leasing transactions of a leasing company** (SM 9.53–9.54):

1. **Object clause**: see the goods (capital goods, consumer durables, etc.) for which the company can undertake leasing, and whether it can undertake **financing activities**.
2. **Credit analysis**: whether a procedure exists to assess the lessee's ability to meet the commitment, past credit record, capital strength and availability of collateral security.
3. **Lease agreement**: note (i) the description of the lessor, lessee, equipment and its **location** (the equipment not to be removed except for repairs; plates or markings for identification); (ii) the amount and tenure of the lease, dates of payment, late charges, deposits or advances; (iii) whether the equipment is **returned to the lessor on termination**, at the lessee's cost; (iv) whether the agreement **prohibits the lessee from assigning or subletting** the equipment and authorises the lessor to do so.
4. **Lease proposal form** submitted by the lessee.
5. **Invoice** retained safely, as the lease is a long-term contract.
6. **Acceptance letter** from the lessee that the equipment was received in order and is acceptable.
7. **Board resolution** of the lessee authorising a director to execute the lease agreement.
8. **Insurance policies**: copies obtained by the lessor for its records.

### 4. Finance lease or operating lease

The Study Material asks students to note that AS 19 classifies leases into two types (SM 9.54–9.55):

::: diagram The two types of lease (SM 9.54–9.55)
{"type": "nest", "w": 430, "root": {"title": "Lease arrangements (AS 19)", "color": "mute", "mono": false, "children": [{"title": "Finance lease", "color": "a", "mono": false, "lines": ["Ownership transferred at the end of the term", "Purchase option well below fair value", "Term is the major part of economic life", "PV of minimum lease payments at least", "substantially all of fair value", "Asset so specialised only the lessee can use it"]}, {"title": "Operating lease", "color": "c", "mono": false, "lines": ["Does not transfer substantially all", "the risks and rewards of ownership:", "a lease other than a finance lease"]}]}, "caption": "Blue box: the attributes the Study Material lists for a finance lease, any of which points to one; amber box: everything else is an operating lease."}
:::

**The broad differences** (SM 9.55–9.56), from the lessee's side:

::: compare
| Point | Operating lease | Finance lease |
|---|---|---|
| Common examples | Projector, computers, laptops, coffee dispensers | Plant and machinery, land, office building |
| Ownership | Stays with the lessor for the entire lease period | Ownership transfer option at the end lies with the lessee; title may or may not pass |
| Accounting treatment | Like renting: payments are operating expenses; the asset is not on the lessee's balance sheet | Like a loan: the asset is treated as the lessee's and appears on its balance sheet |
| Purchase option | None during the lease period | Purchase option at less than fair market value |
| Lease term | Generally less than 75% of the projected useful life | Generally more than or equal to the estimated economic life |
| Running expenses | Lessee pays only the lease payments; no running or administration costs (registration, repairs) | Lessee generally bears insurance, maintenance and taxes |
| Tax benefit | Payment is an expense; no depreciation for the lessee | Lessee claims both interest and depreciation |
:::

## Formats and formulas

::: formula Hire-purchase charges
$$\text{Total charges (interest)} = \qquad \text{Hire-purchase price} - \text{Cash price}$$

Hire-purchase price = deposit or initial payment + all instalments. Instalments overdue = instalments due to date under the agreement − instalments received.
:::

::: formula Present value test for a finance lease
$$PV = \sum_{t=1}^{n} \frac{L_t}{(1+r)^t}$$

$L_t$ = minimum lease payment of period $t$; $r$ = discount rate; $n$ = number of periods. If $PV$ is at least substantially all of the fair value of the asset, the lease is a finance lease (SM 9.54).
:::

## Worked examples

:::: example A Sunday at Rajmahal Cinemas
Iyer & Associates audit Rajmahal Cinemas Pvt Ltd for 2025-26. Ticket prices before tax are ₹450 (Recliner) and ₹250 (Gold); tax on admission is 18% (the rate assumed for this example). For Screen 2 on Sunday, 15 March 2026, the ticket books show:

| Show and class | Serial numbers issued | Free passes issued |
|---|---|---:|
| 15:30 Recliner | 3,201 to 3,260 | 2 |
| 15:30 Gold | 8,451 to 8,630 | 0 |
| 19:00 Recliner | 4,101 to 4,170 | 0 |
| 19:00 Gold | 9,301 to 9,520 | 6 |

The Free Pass Register shows two passes for the 15:30 Recliner show and two for the 19:00 Gold show, signed by the manager. The Daily Statement records collections of ₹1,80,658, including tax of ₹27,558.

Bunty also notes: (a) an advance of ₹6,00,000 to a distributor for a film that ran from 9 to 29 January 2026 is still unadjusted; (b) ₹3,20,000 spent on seat repairs and repainting has been capitalised; (c) Tapri's café pays the cinema 12% of its takings; takings for the year were ₹38,40,000 and the cinema received ₹3,90,000.

Required: compute the collections that should have been recorded for the two shows, and comment on each matter.

::: answer Model answer
**Working: collections due, Screen 2, 15 March 2026**

| Show and class | Issued | Free | Paid | With tax (₹) |
|---|---:|---:|---:|---:|
| 15:30 Recliner (₹531) | 60 | 2 | 58 | 30,798 |
| 15:30 Gold (₹295) | 180 | 0 | 180 | 53,100 |
| 19:00 Recliner (₹531) | 70 | 0 | 70 | 37,170 |
| 19:00 Gold (₹295) | 220 | 6 | 214 | 63,130 |
| **Total** | **530** | **8** | **522** | **1,84,198** |

Tax included: 522 paid tickets give ticket revenue of ₹1,56,100 and tax of ₹28,098.

**Tickets and cash.** The auditor confirms that at the end of each show a statement of tickets sold is prepared and the cash collected agreed with it, and reconciles the tax collected with the tickets issued for each class. Collections should be ₹1,84,198, including tax of ₹28,098; the Daily Statement shows ₹1,80,658 and ₹27,558. The shortfall of ₹3,540 (tax ₹540) equals 12 Gold tickets at ₹295. The auditor should trace the serial numbers to the show-wise statements to find the 12 tickets, examine whether cash was collected and not accounted for, verify the month's tax return, and report the control failure.

**Free passes.** A record must be kept of free passes and they must be issued under proper authority. Four of the six 19:00 Gold passes (₹1,180 at ₹295 each) are not in the Free Pass Register: they are either unauthorised gifts or sold tickets with unrecorded cash. The auditor should enquire and report.

**Advance to the distributor.** The unadjusted balance of advances paid to distributors must be examined to see that it is good and recoverable; where the film has already run, the auditor enquires why the advance has not been adjusted, and asks management to provide for any advance considered irrecoverable. The ₹6,00,000 should have been adjusted against film hire for January; if it is not recoverable, a provision is required.

**Repairs capitalised.** No part of the expenditure on advertisement, repairs and maintenance should be capitalised. The ₹3,20,000 must be charged to revenue; otherwise assets and profit are overstated.

**Share of café takings.** The auditor enquires into the arrangement for collecting the share in the restaurant income. At 12% of ₹38,40,000 the cinema's share is ₹4,60,800; it received ₹3,90,000, so ₹70,800 is receivable and must be accounted for and followed up.
:::
::::

::::: example Narmada Leasing's scooters and vans
Narmada Leasing & Hire Purchase Ltd has these transactions with Tapri Tea Co. Ltd in 2025-26; Iyer & Associates audit both companies.

(i) **Hire purchase** of 40 delivery scooters from 1 July 2025, one agreement and one account per scooter: cash price ₹90,000 each; a deposit of ₹12,000 each and 24 monthly instalments of ₹4,000 each, due on the first day of each month from 1 August 2025. By 31 March 2026, 36 scooter accounts show 7 instalments received and 4 show 5 received. The agreement states the hire-purchase price, the instalments and the scooters' chassis numbers but not the cash price.

(ii) **Lease of a refrigerated van fleet** for five years from 1 April 2025: fair value ₹2,40,00,000; five annual rentals of ₹62,00,000 in arrears; estimated economic life of the vans 10 years; Narmada maintains the vans and Tapri insures them; no transfer of ownership and no purchase option; the interest rate implicit in the lease is 10% a year. Tapri's accountant treats it as an operating lease "because the term is only half the vans' life and the lessor maintains them".

Required: (a) compute the hire-purchase charges per scooter and the instalments overdue at 31 March 2026, and comment; (b) advise on the classification of the van lease and its accounting and tax treatment in Tapri's books.

:::: answer Model answer
**(a) Hire purchase**

| Particulars | Amount (₹) |
|---|---:|
| Hire-purchase price per scooter: 12,000 + 24 × 4,000 | 1,08,000 |
| Less: cash price | 90,000 |
| **Hire-purchase charges per scooter** | **18,000** |

Instalments due by 31 March 2026: August 2025 to March 2026 = 8 per scooter. Overdue: 36 × (8 − 7) + 4 × (8 − 5) = 36 + 12 = 48 instalments, that is **₹1,92,000**.

As per the Study Material, the auditor ensures that instalment payments are being received regularly as per the agreement, and that the agreement is in writing, signed by all parties, and clearly specifies the hire-purchase price, the **cash price**, the commencement date, the instalments (number, amount, due dates, payee and place) and the goods. Overdue instalments of ₹1,92,000, concentrated in four accounts three months behind, call for follow-up of recoverability and adequate provision; the omission of the cash price from the agreement is a deficiency to be reported to management.

**(b) The van lease**

| Test | Facts | Points to |
|---|---|---|
| Lease term ÷ economic life | 5 ÷ 10 = 50% | Operating (generally below 75%) |
| Maintenance | Borne by the lessor | Operating (general pointer) |
| Ownership or purchase option | Neither | Not decisive |
| PV of minimum lease payments | 62,00,000 × 3.7908 = ₹2,35,02,960, about 98% of ₹2,40,00,000 | **Finance lease** |

(3.7908 is the present value of ₹1 a year for five years at 10%.)

**Relevant provision.** As per AS 19, an arrangement qualifies as a finance lease where, among the attributes the Study Material lists, at the inception of the lease the present value of the minimum lease payments amounts to at least substantially all of the fair value of the leased asset; an operating lease is a lease other than a finance lease. The lease term and who bears the running costs appear only in the Study Material's table of broad differences, which states what is generally the case.

**Analysis.** The term and the lessor's maintenance point towards an operating lease, but the rentals recover about 98% of the vans' fair value: in substance Tapri pays for the vans, the lease is a financing arrangement and the risks and rewards of ownership pass to Tapri.

**Conclusion.** The van lease is a **finance lease**, and the accountant's treatment is not acceptable. It is treated like a loan arrangement: the vans appear on Tapri's balance sheet, and Tapri can claim both interest and depreciation.
::::
:::::

## Under the hood

### The ticket that is no longer paper

The Study Material's controls speak of printed tickets bound into books. ICAI's own suggested answer adds the online-booking system (MTP May 2024 Series I Q6(c)); the same five controls translate naturally to a ticketing system (unique serial numbers, a separate series for advance booking, custody of ticket stock or access), though the Study Material does not spell that out, so write its words first.

### Why the leasing company wants Tapri's insurance policy

The lessor owns the asset but never sees it: it sits at the lessee's site, chosen by the lessee. Hence the procedures that protect the owner: the location clause and identification plates, the ban on subletting by the lessee, return on termination, the acceptance letter (proof the lessee got what it asked for, so it cannot later refuse rent), and the insurance copies (SM 9.53–9.54).

## Exam angle

::: exam Where this topic appeared
In the ICAI documents read for this lesson, these entities were examined in 7 new-scheme documents (May 2024 to May 2026):

- **Cinemas.** Areas covered in verifying the internal control mechanism of a multiplex: May 2025 Q6(b) (5 marks; the answer is point 1(a)–(e)). Receipts from sale of tickets: MTP May 2024 Series I Q6(c) (4 marks; points 1–5 plus the online booking system).
- **Leases.** An 11-year lease over about the asset's economic life with the lessee bearing insurance and maintenance (type, ownership, accounting, tax): May 2024 Q6(d) (3 marks). Two equipment leases to classify, with accounting and tax treatment: May 2026 Q4(b) (1 + 4 marks). Points to note in a finance lease agreement: September 2024 Q5(d) (3 marks). Operating vs finance lease for the lessee (accounting, tax): RTP May 2024 Q21. A leasing company's file reviewed against the eight procedures: MTP January 2026 Series II MCQs 6–9.

Old-scheme papers asked the same multiplex questions (November 2022; MTPs May 2020 and July 2021), and the Study Material asks about a multiplex's agreements with film distributors and whether an operating lease is a financing arrangement (it is not).
:::

::: exam How the marks are earned
Lists are marked point by point in the Study Material's words. Lease questions are marked for the classification **with reasons** (term vs economic life, who bears insurance and maintenance, purchase option), then the accounting treatment and the tax benefit from the comparison table.
:::

::: trick Five ticket controls: "Print, Number, Separate, Advance, Custody"
**P**rinted tickets only; serially **N**umbered and bound; **S**eparate numbers for each show and class; a separate series for **A**dvance booking; **C**ustody of the ticket inventory with a responsible official. Condition: this is point 1(a)–(e) only; the other ten steps (end-of-show statement, free passes, tax, film hire and so on) are separate points.
:::

## Answer frame

### "Areas to verify in the internal control mechanism of a cinema" (5 marks)

Write point 1(a)–(e) in order, one mark each; if more is asked ("receipts from sale of tickets"), add the end-of-show statement, free passes, tax reconciliation and Daily Statements to Cash Book, and the online booking system.

### "Which kind of lease, and its treatment?"

1. **Provision**: the attributes of a finance lease (or "other than a finance lease") as the Study Material lists them.
2. **Facts**: lease term against economic life; present value of the minimum lease payments against fair value; ownership transfer or purchase option; specialised asset; who bears insurance and maintenance.
3. **Conclusion**: finance or operating lease, then ownership, accounting treatment and tax benefit from the comparison table.

### Three answers to "points to note in a finance lease agreement" (3 marks)

::: cols
**Loses marks**

"See that the agreement is signed and the rent is received."

Neither is one of the four points.
---
**Passes**

Description of lessor, lessee, equipment and location; tenure, payment dates and late charges.

Two of four points.
---
**Full marks**

All four: description and location (no removal except for repairs; plates); amount, tenure, dates, late charges, deposits; return on termination at the lessee's cost; no assigning or subletting by the lessee.
:::

## Common mistakes

::: mistake Hall of Shame: the operating lease that became a loan
Bunty puts leased coffee dispensers (3 years of an 8-year life, the lessor doing repairs) on Tapri's balance sheet "because Tapri uses them". **Fix:** use alone does not make a finance lease; an operating lease is like renting, the asset stays off the lessee's balance sheet and the payments are expenses (SM 9.55).
:::

::: mistake Capitalising the cinema's repairs
**Fix:** for a cinema, the Study Material is explicit: vouch advertisement, repairs and maintenance, and **no part of such expenditure should be capitalised** (SM 9.50).
:::

::: mistake Writing a purchase option into the lease
Saying the leasing company should "ensure the lease agreement gives the lessee an option to buy". **Fix:** in the normal finance lease modality, **no purchase option is given to the lessee in the lease agreement itself**; at the end the lessee may get a renewal right or join in a purchase when the lessor sells (SM 9.53).
:::

## Practice

::: quiz Check yourself
Q: Case scenario. At Moti Mahal Talkies, the projectionist hands free seats to his friends by tearing tickets from the current show's book and marking them "complimentary". No register of free passes exists. Which step does the auditor primarily apply?
- [ ] Reconcile advertisement charges with the Register of Slides and Shorts Exhibited
- [x] Verify that a record is kept of free passes and that they are issued under proper authority
- [ ] Examine unadjusted advances to distributors
- [ ] Check that depreciation on projection machinery is at an appropriate rate
> Free passes need a record and proper authority. Unrecorded "complimentary" tickets torn from the paid series also distort the end-of-show agreement of tickets and cash, which the auditor tests next.

Q: A hirer bought a machine under a hire-purchase agreement: cash price ₹4,50,000; a deposit of ₹60,000 and 18 monthly instalments of ₹25,000. What are the total hire-purchase charges in rupees?
= 60000
> Hire-purchase price = 60,000 + 18 × 25,000 = ₹5,10,000; charges = 5,10,000 − 4,50,000 = ₹60,000.

Q: Ujjwal Prints Ltd leases a printing press for 6 years; the press's economic life is 15 years. The agreement transfers ownership of the press to Ujjwal at the end of the lease term; the lessor bears maintenance. How should Ujjwal treat the lease?
- [ ] Operating lease, because the term is only 40% of the economic life
- [ ] Operating lease, because the lessor bears maintenance
- [x] Finance lease, because ownership transfers to the lessee at the end of the lease term; the press appears on Ujjwal's balance sheet
- [ ] Hire purchase, because ownership passes at the end
> Transfer of ownership to the lessee by the end of the lease term is one of the attributes of a finance lease in the Study Material's list, so the short term and the lessor's maintenance do not make it an operating lease (ICAI's May 2024 answer, too, classified a lease on a single attribute). The arrangement is a lease (rent for the right to use), so it is classified as a finance or an operating lease, not as hire purchase.

Q: Which of the following are procedures the Study Material lists for a leasing company's leasing transactions? Select all that apply.
- [x] Examine the lease proposal form submitted by the lessee
- [x] See that the lessee's Board has passed a resolution authorising a director to execute the lease agreement
- [ ] Ensure that the lease agreement gives the lessee an option to purchase the equipment
- [x] See that the lessor has obtained copies of the insurance policies
> The purchase-option statement is the trap: in the normal finance lease no purchase option is given in the lease agreement itself.

Q: Rajmahal Cinemas paid a distributor an advance for a film that finished its run three months before the year end; the advance is still in the books. What should the auditor do?
- [ ] Nothing, because advances are assets until the agreement expires
- [ ] Capitalise it as part of film rights
- [x] Enquire why it has not been adjusted and ask management to provide for it if it is irrecoverable
- [ ] Qualify the report at once
> Point 10: for a film that has already run, enquire why the advance is unadjusted; management provides for advances considered irrecoverable. A qualification arises only if a material misstatement then remains.
:::

## Recap

- Cinema revenue is proved through tickets: printed, serially numbered and bound, separate numbers for each show and class, a separate series for advance booking, ticket inventory in custody.
- After each show, tickets sold agree with cash; free passes recorded and authorised; tax reconciled with tickets per class; Daily Statements vouched into the Cash Book.
- Cinema expenses: advertisement, repairs and maintenance never capitalised; film hire vouched with distributors' bills and agreements; unadjusted advances for films already run enquired into and provided for; restaurant share followed up.
- Hire purchase: possession now, property with the last instalment, hirer may terminate before; agreement in writing, signed, stating hire-purchase price, cash price, commencement, instalments and goods; instalments received regularly.
- Leasing company: object clause, credit analysis, agreement terms (location, tenure, return, no subletting), proposal form, invoice, acceptance letter, lessee's Board resolution, insurance copies.
- Finance lease transfers substantially all risks and rewards (treated like a loan: asset on the lessee's balance sheet, interest and depreciation); an operating lease is any other lease (rent: expense, no depreciation). (Like the bus conductor, the cinema must account for every ticket on the roll.)

## Flashcards

Q:: Audit of a cinema: state the five internal controls over tickets.
A:: Entrance only through printed tickets; tickets serially numbered and bound into books; different numbers for each show and class (same class for the same show each week running serially); a separate series for advance booking; ticket inventory in the custody of a responsible official.

Q:: Audit of a cinema: what is confirmed at the end of each show?
A:: That a statement of tickets sold is prepared and the cash collected is agreed with it.

Q:: Audit of a cinema: how is tax verified?
A:: Reconcile the tax collected with the total number of tickets issued for each class, and vouch and verify the monthly tax returns.

Q:: Audit of a cinema: what is the rule for advertisement, repairs and maintenance expenditure?
A:: Vouch it; no part of such expenditure should be capitalised.

Q:: Audit of a cinema: what does the auditor do about advances to distributors for films that have already run?
A:: Enquire why the advance has not been adjusted, see that it is good and recoverable, and ask management to provide for advances considered irrecoverable.

Q:: Hire purchase: what three features does the definition of a hire-purchase agreement include?
A:: Possession delivered on condition of paying periodical instalments; property passes on payment of the last instalment; the hirer may terminate at any time before property passes.

Q:: Hire purchase: what must the agreement clearly specify?
A:: The hire-purchase price, the cash price, the commencement date, the number, amount, due dates, payee and place of instalments, and the goods, described sufficiently to identify them.

Q:: Leasing company: name the eight audit procedures for leasing transactions.
A:: Object clause; credit analysis of the lessee; lease agreement terms; lease proposal form; invoice retained safely; acceptance letter from the lessee; lessee's Board resolution authorising execution; copies of insurance policies.

Q:: Lease: which party bears insurance, maintenance and taxes in a finance lease?
A:: The lessee generally bears them; under an operating lease the lessee pays only the lease payments.

Q:: Lease: tax benefit to the lessee under an operating lease and under a finance lease?
A:: Operating lease: the lease payment is an expense and no depreciation is claimed. Finance lease: the lessee claims both interest and depreciation.
