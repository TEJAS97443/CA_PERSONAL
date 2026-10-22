"""Profits and Gains of Business or Profession (PGBP), from first principles to advanced.
CA Intermediate, Paper 3A Income-tax Law · Income-tax Act, 1961 as amended by the Finance Act, 2025 · A.Y. 2026-27
(P.Y. 2025-26) · for the January 2027 exam. Source: ICAI Study Material Module 1, Ch 3 Unit 3 (src/ch3u3.pdf) and the
Study Guidelines (src/ip.pdf: ICDS, 33AB, 33ABA, 35(2AB), 35ABA/ABB, 35CCA/CCC/CCD, 35DD, 35E, 42, 43C, 43D, 44, 44A,
44B-44DB are excluded). Single voice af_heart. Every beat is a hand-drawn scene in scenes/ch_<k>.py (see SHOTS.md).

One world: Meera's Bakehouse, Pune (a manufacturer: cakes and bread), proprietor Meera, default regime u/s 115BAC.
Her books show a net profit of ₹12,00,000; her PGBP income is ₹18,99,000 (chapter z works it out line by line)."""
import re
from story import Script, num_words

ROMAN = {'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5, 'vi': 6, 'vii': 7, 'viii': 8, 'ix': 9, 'x': 10}
def _letters(s): return ' '.join('ay' if ch == 'A' else ch for ch in s.upper())
def _num(n):
    n = int(n)
    if 100 <= n <= 999 and n % 100: return num_words(n // 100) + ' ' + num_words(n % 100)   # 115 -> one fifteen
    return num_words(n)
def sec_say(tok):
    """'40A(3)' -> 'forty ay three', '40(a)(ia)' -> 'forty ay, one ay', '115BAC' -> 'one fifteen B ay C'."""
    m = re.match(r'(\d+)([A-Z]*)(.*)', tok); out = [_num(m.group(1))]
    if m.group(2): out.append(_letters(m.group(2)))
    for p in re.findall(r'\(([^)]+)\)', m.group(3)):
        q = re.match(r'(\d+)([A-Za-z]*)$', p)
        if q: out.append(_num(q.group(1)) + (' ' + _letters(q.group(2)) if q.group(2) else '')); continue
        r = re.match(r'([ivx]+?)([a-h]?)$', p) if p not in ('a', 'b', 'h') else None
        if r and r.group(1) in ROMAN: out.append(num_words(ROMAN[r.group(1)]) + (' ' + _letters(r.group(2)) if r.group(2) else ''))
        else: out.append(_letters(p))
    return ', '.join([' '.join(out[:2])] + out[2:]) if len(out) > 2 else ' '.join(out)
SEC_RE = re.compile(r'(?<![\w₹,.])(\d{1,3}[A-Z]{0,4}(?:\((?:\d{1,3}[A-Z]?|[a-z]{1,4})\))+|\d{1,3}[A-Z]{1,4})(?![\w])')

LEX = {'PGBP': 'P G B P', 'CBDT': 'C B D T', 'NSE': 'N S E', 'IMPS': 'I M P S', 'NEFT': 'N E F T', 'RTGS': 'R T G S',
       'NPS': 'N P S', 'PF': 'P F', 'DA': 'D A', 'keyman': 'key-man', 'Keyman': 'Key-man', '1961': 'nineteen sixty-one',
       '2026-27': 'twenty twenty-six, twenty-seven', 'A.Y.': 'assessment year', 'MSMED': 'M S M E D', '145': 'one forty-five'}

S = Script('Profits and Gains of Business or Profession',
           course='CA Intermediate · Paper 3A Income-tax Law',
           ref='Income-tax Act, 1961 · Finance Act 2025 · A.Y. 2026-27 · Jan 2027 exam',
           syllabus=['section 28', 'speculation', 'composite income', 'method of accounting', 'section 29', 'capital expenditure',
                     'depreciation', 'block of assets', 'written down value', '180 days', 'section 50', 'actual cost',
                     'additional depreciation', '115BAC', 'unabsorbed depreciation', 'scientific research', '35AD', '35D',
                     '35DDA', 'section 36', 'section 37', '40(a)(ia)', '40(b)', '40A(2)', '40A(3)', '43B', '43B(h)', '41(1)',
                     '43CA', '44AA', '44AB', '44AD', '44ADA', '44AE'],
           jargon=['speculative transaction', 'composite income', 'mercantile', 'revenue expenditure', 'capital expenditure',
                   'depreciation', 'block of assets', 'written down value', 'actual cost', 'additional depreciation',
                   'unabsorbed depreciation', 'book profit', 'remission', 'presumptive'],
           labels={'exam': 'WRITE THIS IN YOUR EXAM'},
           lexicon=LEX)
S.voices, S.roles, S.lead = {'teacher': 'af_heart'}, {}, 'teacher'

# ======================================================================= A · intro (unnumbered)
a = S.chapter('a', 'Twelve lakh in the books, nineteen for tax')
a.hook("Meera runs a bakery in Pune. Her books say she made ₹12 lakh this year. "
       "So why will she pay tax on almost nineteen lakh?")
a.observe("Nobody cheated. Her accountant measures profit one way. The Income-tax Act measures it another way. "
          "The gap between the two is this whole chapter.")
a.explain("The law asks three questions about every rupee. Is it business income at all? Is this cost allowed? "
          "And is it allowed this year?")
a.say("We'll answer them from first principles. What gets taxed. What you can deduct, and what you can't. "
      "The shortcuts for small businesses. And at the end, Meera's full computation, line by line.")
a.say("Everything follows the Income-tax Act, 1961, as amended by the Finance Act, 2025. "
      "That's assessment year 2026-27, for the January 2027 exam.")

# ======================================================================= B · business, profession, heads
b = S.chapter('b', 'Business, profession and the five heads', 'sections 2(13) and 2(36)')
b.hook("Meera bakes cakes. Her friend Kabir fixes teeth. Is a dentist running a business?")
b.explain("First, the big picture. The Act sorts all income into five heads. Salaries, house property, business or profession, "
          "capital gains, and other sources. Each head has its own rules. Ours is the third one.")
b.name("Business means any trade, commerce or manufacture, or any adventure in the nature of trade. That's section 2(13).",
       show='Business · sec 2(13): trade, commerce, manufacture, or an adventure in the nature of trade')
b.name("A profession is work that needs learning, like a doctor, a lawyer, an architect or an auditor. "
       "It includes a vocation too. That's section 2(36).",
       show='Profession · sec 2(36): an occupation needing learning · includes a vocation')
b.explain("Here's the good news. For computing income, the difference hardly matters. Business and profession are taxed alike. "
          "It matters only for tax audit and the presumptive schemes, which have different limits.")
b.example("Business usually means doing something again and again, for profit. But even one deal can count. "
          "Buy a truckload of mangoes once, just to resell them, and that's an adventure in the nature of trade.")
b.extreme("What if the business itself is illegal? Its profit is still taxed. The law doesn't ask where income came from. "
          "But money spent on an offence is never deductible.")
b.explain("Two more rules. Profit received in kind is valued at its cash worth. And if you run three businesses, "
          "each one's profit is worked out separately, then added together.")
b.check("Kabir runs a clinic and a medical shop. Two heads of income?",
        answer="No. Both fall under one head, business or profession. Their profits are worked out separately, then added.")

# ======================================================================= C · section 28
c = S.chapter('c', 'What lands in this head', 'section 28')
c.hook("A company pays Meera ₹5 lakh to promise she won't open a bakery in its area for three years. "
       "She baked nothing for it. Is it business income?")
c.predict("Is a promise not to do business, business income?")
c.explain("Yes. Section 28 is a net. It lists everything taxed under this head, and it reaches well past ordinary profit.")
c.name("That payment is a non-compete fee. Money for not carrying on a business, or for not sharing know-how, "
       "is business income.",
       show='Non-compete fee: sec 28(va) · business income · but selling a right to manufacture → capital gains')
c.explain("The net also catches compensation, when an agency or a business contract is ended or changed. "
          "It catches export incentives, like duty drawback. "
          "And a trade association's income from special services to its members.")
c.example("Benefits in kind count too. A company gives its lawyer a free flat, in return for legal work. "
          "The value of that flat is the lawyer's professional income.")
c.explain("A partner's salary, bonus, commission and interest from the firm are business income too. "
          "But only the part the firm was allowed to deduct. His share of the firm's profit is exempt, under section 10(2A).")
c.explain("Three more. Money received on a keyman insurance policy. The market value of stock turned into a capital asset. "
          "And money from an asset whose whole cost was deducted under section 35AD.")
c.trap("One thing slips out of the net. Rent from letting out a residential house is taxed under house property, "
       "even when letting is your business.",
       show='Letting out a residential house → “Income from house property”, not business, even for a letting business')
c.check("A distributor's agency is cancelled, and she gets ₹8 lakh as compensation. Which head?",
        answer="Business or profession. Compensation on the end of an agency is caught by section 28.")

# ======================================================================= D · speculation + composite income
d = S.chapter('d', 'Two carve-outs', 'speculation and composite income')
d.hook("Rohan buys shares in the morning, and sells them before the market closes. He never takes delivery. "
       "Is that the same business as the bakery?")
d.explain("No. When a deal is settled without the goods or shares ever changing hands, it's a bet on prices, not trade.")
d.name("The law calls it a speculative transaction, under section 43(5). And it's treated as a business of its own.",
       show='Speculation: sec 43(5) · settled without actual delivery → a separate business')
d.explain("Why keep it separate? Because of losses. If you lose on speculation, you can set it off only against speculation profit. "
          "And you can carry it forward for just four years.")
d.explain("Some deals without delivery are not speculation. A baker hedging the price of wheat. An investor hedging his shares. "
          "And trading in derivatives, or commodity derivatives, on a recognised stock exchange.")
d.example("Rohan loses ₹50,000 on intraday trades, while the bakery makes ₹12 lakh. "
          "That loss can't cut the bakery's profit. It waits for a future speculation profit.")
d.imagine("Now picture a tea estate. Growing the leaves is farming. Making tea in the factory is business. "
          "One profit, with two natures.")
d.name("The rules split this composite income. For tea grown and made by the seller, 40% is business income. "
       "The other 60% is agricultural, and exempt.",
       show='Composite income · Rule 8: tea 40% business, 60% agricultural (exempt)')
d.example("So a tea estate earning ₹10 lakh pays tax on ₹4 lakh. For rubber, 35% is business. "
          "For coffee grown and cured, 25%. If it's also roasted and ground, 40%.")
d.check("Is futures trading on the NSE a speculative transaction?",
        answer="No. Eligible trading in derivatives on a recognised stock exchange is not speculation.")

# ======================================================================= E · accounting method + the machine
e = S.chapter('e', 'The machine', 'section 145 and section 29')
e.hook("Meera delivers a wedding cake on 28 March. The money arrives on 10 April. Which year does that income belong to?")
e.predict("This year, or next?")
e.explain("It depends on her method of accounting. Under section 145, income is computed by the method she regularly follows, "
          "cash or mercantile.")
e.example("Under the mercantile system, income counts when it's earned, so the cake belongs to this year. "
          "Under the cash system, it counts when the money arrives. That's next year.")
e.trap("Government money follows its own clock. A subsidy, grant or cash incentive is taxed in the year it's received, "
       "whatever her method.",
       show='Sec 145B: subsidy / grant / cash incentive / duty drawback → taxed in the year of receipt')
e.explain("Now the big picture. Section 29 says business income is worked out under sections 30 to 43D. "
          "The profit and loss account is only the starting point.")
e.name("Here's the machine every exam question uses. Start with net profit. Add back what the law doesn't allow. "
       "Deduct what it allows but the books missed. Remove other heads' income. Then add deemed income.",
       show='The PGBP machine: net profit + disallowed − allowed but not debited − other heads + deemed income')
e.analogy("Think of a security check at the airport. Every item in the profit and loss account goes through. "
          "Most pass. Some are taken out. And a few are added that you never packed.",
          limit="Unlike security, a disallowed cost is often just allowed in a later year.")
e.check("Meera's books include ₹30,000 of bank interest. What does the machine do with it?",
        answer="It takes it out. Bank interest is taxed under income from other sources.")

# ======================================================================= F · capital vs revenue
f = S.chapter('f', 'Capital or revenue?', 'sections 30, 31 and 38')
f.hook("Meera spends ₹4 lakh on flour, and ₹4 lakh on a new oven. Both leave her bank this year. Can she deduct both?")
f.predict("Both, one, or neither?")
f.explain("Only the flour. It's used up making this year's cakes. The oven will bake for ten years. "
          "If you charged it all to one year, this year would look poor, and the next nine rich.")
f.name("Spending that's used up within the year is revenue expenditure. You can deduct it. "
       "Spending with a lasting benefit is capital expenditure. You can't deduct it directly.",
       show='Revenue vs capital: used up this year → deduct · lasting benefit → no direct deduction')
f.explain("Repairs sit on this line too. Section 30 allows rent, rates, taxes, repairs and insurance of the building. "
          "Section 31 allows current repairs and insurance of machinery, plant and furniture.")
f.example("Repainting the shop, or fixing the oven door, is a current repair. Deductible. "
          "Replacing the whole oven, or adding a new floor, is capital. Not a repair at all.")
f.explain("A few details. An owner using her own shop can't deduct notional rent. A firm paying rent to its own partner can, "
          "if it's reasonable. And a machine used for even a month gets its full insurance.")
f.extreme("What if an asset is used partly for personal work? Meera takes the van on family trips. "
          "Under section 38, only the business share of its costs is allowed.")
f.check("Meera rebuilds a collapsed wall of her shop. Revenue or capital?",
        answer="Capital. Rebuilding is a replacement, not a current repair.")

# ======================================================================= G · depreciation conditions
g = S.chapter('g', 'Depreciation: who gets it', 'section 32')
g.hook("If the oven can't be deducted, does Meera just lose that ₹4 lakh?")
g.explain("No. You get the cost back slowly, a slice every year, as the oven wears out. That slice is depreciation, under section 32.")
g.explain("But only some assets qualify. Tangible ones: buildings, machinery, plant and furniture. "
          "And intangible ones: know-how, patents, copyrights, trademarks, licences and franchises.")
g.trap("Two famous exceptions. Land never wears out, so it gets no depreciation, even under a building. "
       "And goodwill of a business isn't depreciable any more.",
       show='No depreciation on land · none on goodwill of a business or profession')
g.explain("Plant is a wide word. It includes vehicles, books, scientific apparatus and surgical equipment. "
          "But not tea bushes, livestock or buildings. And roads, bridges and wells count as buildings.")
g.name("Then three conditions. She must own the asset, wholly or partly. She must use it for business during the year. "
       "And it must be one of those assets.",
       show='Depreciation conditions: own it (wholly or partly) · use it for business in the year · eligible asset')
g.example("Use includes standby use. A backup generator that never ran, or a fire extinguisher on the wall, is in use. "
          "And a tenant who builds a store room in a rented shop gets depreciation on it, as if she owned it.")
g.extreme("What if Meera simply skips depreciation this year, to save it for later? She can't. "
          "Under Explanation 5, depreciation is compulsory. It's deducted whether she claims it or not.")
g.check("Meera leases a mixer from a dealer. Who claims depreciation on it?",
        answer="The dealer, who owns it. Meera deducts the lease rent instead.")

# ======================================================================= H · block of assets
h = S.chapter('h', 'Blocks of assets', 'section 2(11) and the rates')
h.hook("Meera's bakery has ovens, mixers, trays, fridges and a van. Does she track the depreciation of each one?")
h.explain("Imagine doing that for a factory with five thousand machines. Each with its own date, cost and value. "
          "The paperwork would never end.")
h.name("So the Act pools them. A block of assets is a group of assets in the same class, with the same rate.",
       show='Block of assets · sec 2(11): same class (tangible or intangible) + same rate')
h.explain("Depreciation is then charged on the whole pool, at a fixed share of its written down value. "
          "That's what's left of the cost, after earlier depreciation.")
h.example("Here are the main rates. Residential buildings, 5%. Other buildings, 10%. Furniture and fittings, 10%. "
          "Plant and machinery, 15%, and that includes cars.")
h.example("And the higher ones. Buses, lorries and taxis in a hiring business, 30%. Computers and software, 40%. "
          "Books for professionals, 40%. Intangible assets, 25%.")
h.analogy("A block works like a water tank. New assets pour in. Sale money drains out. "
          "Every year, a fixed share of what's inside is taken as depreciation.",
          limit="Unlike water, the level can never go below zero. We'll see what happens then.")
h.check("A new laptop and a new oven, both bought this year. Same block?",
        answer="No. The laptop is at 40%, the oven at 15%. Different rates, different blocks.")

# ======================================================================= I · WDV + 180 days (hero)
i = S.chapter('i', 'The 180-day rule', 'written down value, worked')
i.hook("Meera buys a mixer on 20 December. Should she get a full year's depreciation, for three months of use?")
i.explain("That seems unfair. So the Act has a simple rule. Count the days the asset is used, in the year it's bought.")
i.name("If it's used for less than 180 days in that year, depreciation is half the normal rate. "
       "For 180 days or more, it's the full rate.",
       show='Half-rate rule: used < 180 days in the year of acquisition → 50% of the normal rate, that year only')
i.example("Let's work it out. Her plant and machinery block starts the year at ₹10 lakh. "
          "On 1 June, she adds a new oven for ₹4 lakh. On 20 December, a mixer for ₹2 lakh.")
i.explain("The oven is used for ten months, so it joins the full-rate part. "
          "The mixer is used for just a hundred and two days. That's under 180, so it gets half.")
i.formula("So 15% of ₹14 lakh is ₹2,10,000. And 7.5% of ₹2 lakh is ₹15,000. Total depreciation, ₹2,25,000.",
          show='₹2,10,000 + ₹15,000 = ₹2,25,000')
i.explain("The block carries ₹16 lakh, minus ₹2,25,000, into next year. That's ₹13,75,000. "
          "And the mixer's half rate was a one-time thing. Next year, it's at the full rate.")
i.trap("The rule is about use, not purchase. A machine bought in April but installed in November is used for under 180 days. "
       "Half rate.",
       show='Half rate depends on the date the asset is PUT TO USE, not the date of purchase')
i.exam("Write it like this. The asset was acquired during the previous year. It was put to use for less than 180 days. "
       "So depreciation is restricted to 50% of the prescribed rate.",
       show='“Asset acquired and put to use for < 180 days in the P.Y. → depreciation @ 50% of the prescribed rate [2nd proviso, sec 32(1)]”')
i.check("A laptop is bought and put to use on 1 January. Rate?",
        answer="Twenty percent. Half of forty, since it's used for under 180 days.")

# ======================================================================= J · selling from a block + section 50 (hero)
j = S.chapter('j', 'Selling from a block', 'section 50')
j.hook("Meera sells her old van for more than the whole block is worth. The block now holds less than nothing. "
       "What happens?")
j.imagine("Imagine a van block holding ₹3 lakh. Let's follow four different sales.")
j.example("First, she buys a new van for ₹5 lakh, and sells the old one for ₹3,60,000. "
          "Three lakh plus five lakh, minus three lakh sixty thousand, leaves ₹4,40,000. Depreciation runs on that.")
j.example("Second, no new van. She sells her only van for ₹3,60,000. The block is empty. It has ceased to exist.")
j.name("Then there's no depreciation for that block. The ₹60,000 over its written down value "
       "is a short-term capital gain, under section 50.",
       show='Sec 50: block ceases, or sale > WDV → no depreciation · excess = short-term capital gain')
j.explain("Why short-term? Because she already got depreciation on that money. "
          "Gains on depreciable assets in a block are always short-term, however long she owned them.")
j.extreme("Third. She sells the only van for just ₹2,40,000. The block ceases with ₹60,000 still inside. "
          "That's a short-term capital loss.")
j.extreme("Fourth. She buys a new van for ₹5 lakh, and sells a vintage one for ₹9 lakh. Three plus five is eight, and nine comes out. "
          "The level stops at zero. The block lives on at zero, and the extra ₹1 lakh is a short-term capital gain.")
j.trap("Don't charge depreciation on a block that has ceased, or hit zero. "
       "And the money that comes out includes scrap value and insurance money, not just the sale price.",
       show='Money receivable = sale price + scrap value + insurance / compensation')
j.check("A machine block holds ₹50,000, and its only machine is lost in a fire. Insurance pays ₹30,000. Result?",
        answer="The block ceases. ₹20,000 is a short-term capital loss, with no depreciation.")

# ======================================================================= K · actual cost
k = S.chapter('k', 'What counts as cost', 'section 43(1)')
k.hook("The oven's price tag said ₹3,70,000. So why did it enter the block at ₹4 lakh?")
k.explain("Because actual cost, under section 43(1), is everything you spend to bring the asset into use. "
          "The price, plus ₹10,000 of freight, plus ₹20,000 for installation.")
k.explain("And it's reduced by any part of the cost paid by someone else. If the state paid ₹50,000 of it as a subsidy, "
          "the cost would be ₹3,50,000.")
k.trap("Cash breaks the cost. Any payment of more than ₹10,000 in a day in cash is left out of the cost. "
       "No depreciation on it, ever.",
       show='Cash > ₹10,000 to a person in a day → excluded from actual cost [sec 43(1), 2nd proviso]')
k.explain("Interest has a dividing line too. Say she borrowed for the oven on 1 April, and started using it on 1 June. "
          "Interest till 1 June is added to the cost. Interest after that is a normal expense, under section 36.")
k.example("Old assets keep their original cost. If Meera's personal car, bought for ₹5,25,000, joins the business, "
          "its cost is ₹5,25,000. Not today's market value.")
k.extreme("Two odd cases. A building moved from personal use is valued at cost, minus the depreciation it would have had. "
          "And a gift or an inheritance takes the previous owner's cost, minus depreciation since.")
k.explain("One more. If the oven were imported on credit, and the rupee fell before she paid, "
          "the extra rupees would be added to its cost. That's section 43A.")
k.check("A machine costs ₹6 lakh in all, including ₹50,000 of installation paid in cash in one day. "
        "The government pays ₹1 lakh. Actual cost?",
        answer="₹4,50,000. Six lakh, minus the subsidy, minus the cash payment.")

# ======================================================================= L · regimes + additional depreciation
l = S.chapter('l', 'Two regimes, one extra 20%', 'section 32(1)(iia) and section 115BAC')
l.hook("If Meera buys new machines to bake more, should the law reward her for it?")
l.explain("Under the old rules, yes. If you manufacture goods and buy new plant or machinery, you get extra depreciation in year one. "
          "But there's a catch, called section 115BAC.")
l.name("Section 115BAC is the default tax regime. Lower slab rates, but fewer deductions. "
       "An individual is in it automatically, unless she opts out.",
       show='Default regime: sec 115BAC · lower rates, fewer deductions · no additional depreciation · no 35AD')
l.name("If she opts out, she gets additional depreciation. It's 20% of the cost of new plant or machinery, "
       "for anyone who makes goods, or generates power.",
       show='Additional depreciation: sec 32(1)(iia) · 20% of new P&M · makers of goods / power · only if opted out')
l.example("So the ₹4 lakh oven gets ₹80,000 extra. The mixer, used under 180 days, gets half: ₹20,000 now. "
          "The other ₹20,000 comes next year, if she's still outside the default regime.")
l.trap("Not every machine qualifies. Not second hand machines. Not office machines, like the laptop. "
       "Not road vehicles, like the van. And not anything fully deducted in one year.",
       show='No additional depreciation: second-hand · office / residence / guest house · office appliances · road vehicles · 100% deducted')
l.explain("And a business owner can't hop between regimes every year. Once she opts out, she gets only one chance to come back.")
l.explain("What if her profit is too small to absorb the depreciation? The unused part is unabsorbed depreciation. "
          "It's carried forward with no time limit, and set off against any head except salaries.")
l.explain("When it's set off, the order matters. This year's depreciation comes first. Then old business losses. "
          "Then unabsorbed depreciation.")
l.check("A printing press buys a new printing machine. Is additional depreciation possible?",
        answer="Yes, if it opts out of 115BAC. Printing counts as manufacture, says a CBDT circular.")

# ======================================================================= M · scientific research
m = S.chapter('m', 'Scientific research', 'section 35')
m.hook("Meera wants to invent a sugar-free cake, so she sets up a small lab. Should research be treated like any other cost?")
m.explain("The law wants you to do research. So under section 35, research gets special treatment, "
          "even when it's capital.")
m.explain("Revenue spending on research for her own business is deducted in full. "
          "That's things like a scientist's salary, and the ingredients.")
m.name("And capital spending on that research is also deducted in full, in the year she spends it. Except land. "
       "Land never counts.",
       show='Sec 35(1)(iv): capital spent on in-house research → 100% (except land) · both regimes')
m.example("She spends ₹3 lakh on salaries and materials, and ₹7,50,000 on a lab building, of which ₹5 lakh is land. "
          "Her deduction is ₹3 lakh plus ₹2,50,000. That's ₹5,50,000.")
m.explain("Research before the business starts counts too. What she spends in the three years before starting "
          "is deducted in the year the business begins.")
m.trap("No double counting. A lab asset deducted under section 35 gets no depreciation. And if she sells it, "
       "the sale price, up to the deduction, is taxed as business income.",
       show='Asset deducted u/s 35 → no depreciation · on sale: lower of sale price or deduction is taxed [sec 41(3)]')
m.explain("Paying outsiders is different. She may give money to an approved university, research body, company or lab. "
          "That's deductible at 100%, but only if she opts out of the default regime.")
m.example("Say Meera also gives ₹1 lakh to an approved university for food research. "
          "In the default regime, she still gets ₹5,50,000. If she opts out, ₹6,50,000.")
m.check("What if her profit is too small to use the research deduction? Can she carry it forward?",
        answer="Yes, with no time limit. It's set off like unabsorbed depreciation, against any head except salaries.")

# ======================================================================= N · 35AD
n = S.chapter('n', 'Investment-linked deduction', 'section 35AD')
n.hook("Meera's cousin Anil builds a cold storage for fruit and vegetables. What if he could deduct the whole building "
       "in year one?")
n.explain("If you run one of a few businesses the country badly needs, you can. Section 35AD gives 100% of the capital spending "
          "as a deduction, instead of depreciation.")
n.name("These are specified businesses. Cold chains, warehouses for farm produce or sugar, hospitals with a hundred beds, "
       "hotels of two stars and above, and affordable housing, among others.",
       show='Specified business: sec 35AD · cold chain, warehousing, hospitals, hotels, housing, pipelines, infrastructure…')
n.example("Anil spends ₹1.2 crore. ₹40 lakh is land, which doesn't count. The other ₹80 lakh is deducted, "
          "including what he spent before opening. His profit was ₹30 lakh, so he now has a loss of ₹50 lakh.")
n.explain("That loss can be set off only against profit from a specified business. "
          "But it can be carried forward with no time limit.")
n.trap("The conditions bite. He must have opted out of the default regime. Any cash payment over ₹10,000 in a day "
       "is excluded. And the asset must be used for that business for eight years.",
       show='35AD: only if opted out of 115BAC · no land, goodwill, financial instruments · cash > ₹10,000/day excluded · 8 years')
n.extreme("What if Anil moves the building to an ordinary business in year three? "
          "Then the deduction he got, minus normal depreciation, becomes his income that year.")
n.check("Can Anil claim both the 35AD deduction and depreciation on the same building?",
        answer="No. Its actual cost becomes nil, so there's nothing left to depreciate.")

# ======================================================================= O · 35D + 35DDA
o = S.chapter('o', 'Spread over five years', 'sections 35D and 35DDA')
o.hook("Before opening a second outlet, Meera pays for a project report, a market survey and a lawyer. Capital or revenue?")
o.explain("Neither, quite. The spending builds the new unit, but it isn't an asset you can touch. "
          "So section 35D spreads it over five years.")
o.name("Preliminary expenses are deducted at one fifth a year, for five years, starting the year the new unit begins.",
       show='Sec 35D: preliminary expenses ÷ 5, over 5 years · Indian companies and resident non-corporates')
o.explain("The list is fixed. Feasibility and project reports, market surveys, engineering services, "
          "and legal charges for business agreements. For a company, also its memorandum, registration fees, "
          "and the costs of a public issue.")
o.example("Meera spends ₹4 lakh. But there's a cap: 5% of the cost of the project. Her project costs ₹60 lakh, "
          "so only ₹3 lakh counts. She deducts ₹60,000 a year, for five years.")
o.explain("An Indian company can use 5% of its capital employed instead, if that's higher. "
          "And a non-corporate taxpayer must get her accounts audited to claim it.")
o.name("Voluntary retirement payments follow the same five-year pattern, under section 35DDA. "
       "Pay ₹10 lakh to staff who retire early, and deduct ₹2 lakh a year.",
       show='Sec 35DDA: voluntary retirement payments ÷ 5, over 5 years')
o.check("Meera's books write off the whole ₹4 lakh this year. What's the adjustment?",
        answer="Add back ₹4 lakh, and deduct ₹60,000.")

# ======================================================================= P · section 36
p = S.chapter('p', 'The people costs', 'section 36')
p.hook("Meera now has twelve employees. Which of their costs can she deduct, and when?")
p.explain("Section 36 is a list of specific deductions. Most are about people and money. "
          "Insurance, bonus, interest, staff funds and bad debts.")
p.explain("Insurance on her stock is allowed. So is health insurance for her staff, if the premium isn't paid in cash. "
          "Bonus and commission to employees are allowed too, unless they replace a share of profit.")
p.explain("Interest on money borrowed for the business is allowed. But for a new asset, "
          "interest before it's first used goes into its cost, as we saw.")
p.example("Her contribution to her staff's pension scheme, the NPS, is allowed up to 14% of salary. "
          "Salary means basic plus dearness allowance. With basic of ₹10 lakh and DA of ₹4 lakh, the limit is ₹1,96,000.")
p.explain("She actually paid ₹2 lakh. So ₹4,000 is disallowed.")
p.trap("Here's the one examiners love. Employees' own PF share, cut from their salary, must reach the fund "
       "by the due date under the PF law. That's the fifteenth of the next month. Late means never deductible.",
       show='Employees’ PF / ESI contribution [36(1)(va)]: deposit by the due date under that law · no 43B grace')
p.explain("Bad debts are allowed once they're written off in the books, if the debt was counted as income earlier. "
          "If she later recovers one, the recovery becomes income again, under section 41(4).")
p.explain("And a share trader can deduct the securities transaction tax he pays, when his trading profit is business income.")
p.check("Meera cuts ₹15,000 of PF from May salaries, and deposits it on 30 June. Allowed?",
        answer="No. It was due by 15 June. Section 43B's extra time doesn't apply to employees' contributions.")

# ======================================================================= Q · section 37
q = S.chapter('q', 'The last door', 'section 37')
q.hook("Meera pays a food blogger to taste her cakes. No section mentions bloggers. Is that cost lost?")
q.explain("No. Section 37 is the last door. Any expense not covered by sections 30 to 36 can still pass, "
          "if it meets a few conditions.")
q.name("It must be laid out wholly and exclusively for the business. It must not be capital. And it must not be personal.",
       show='Sec 37(1): wholly and exclusively for business · not capital · not personal · not an offence')
q.explain("Notice the words. Wholly and exclusively, not necessarily. Even if you spend unwisely, "
          "the expense is allowed, as long as it was for the business.")
q.trap("Illegal spending never passes. A bribe. A penalty for breaking a law. "
       "Or freebies that doctors aren't allowed to accept from drug companies.",
       show='Explanations 1 & 3: offence / prohibited by law · freebies to doctors · compounding an offence')
q.explain("Since April 2025, money paid to settle proceedings under the SEBI and Competition laws is blocked too. "
          "But a penalty for late delivery under a contract is fine. It's compensation, not a fine.")
q.explain("Two more rules. CSR spending by a company is never allowed under section 37. "
          "And nobody can deduct an advertisement in a political party's souvenir.")
q.example("Some costs that do pass. Keyman insurance premium on a key person, even a partner. "
          "The food blogger's fee. Legal fees to defend her business.")
q.check("Meera's van gets a ₹2,000 fine for parking on the road. Deductible?",
        answer="No. It's a penalty for breaking the law.")

# ======================================================================= R · 40(a)
r = S.chapter('r', 'The TDS traps', 'section 40(a)')
r.hook("Meera pays a chef-consultant ₹1,50,000, and forgets to deduct TDS. The cost is real. "
       "Why would the law cut her deduction?")
r.explain("Because tax deducted at source is how the government follows the money. "
          "If she doesn't deduct it, the law holds back part of her deduction until she does.")
r.name("For a payment to a resident, 30% of the expense is disallowed, under section 40(a)(ia). "
       "For a payment to a non-resident, under section 40(a)(i), it's 100%.",
       show='TDS default · sec 40(a): resident → 30% disallowed · non-resident → 100% disallowed')
r.example("So 30% of ₹1,50,000, which is ₹45,000, is added back. "
          "If she deducts and pays the tax next year, that ₹45,000 is allowed next year.")
r.explain("The deadline is generous. Tax deducted this year can be paid any time before the due date of the return, "
          "under section 139(1).")
r.explain("There's one escape. If the payee has filed his return, included the income and paid the tax, "
          "she's treated as having deducted it on that date. An accountant must certify it.")
r.trap("Students forget section 40(a)(ii). Income tax itself is never a business expense, including surcharge and cess. "
       "You can't deduct the tax on profit from the profit.",
       show='Income-tax, including surcharge and cess, is never deductible [sec 40(a)(ii)]')
r.explain("And when an employer pays the tax on an employee's non-cash perks, that tax isn't deductible either.")
r.exam("Write it like this. Thirty percent of any sum payable to a resident is disallowed, if tax at source is not deducted. "
       "The same applies if it's not paid by the due date under section 139(1).",
       show='“30% of any sum payable to a resident is disallowed if TDS is not deducted, or not paid on or before the due date u/s 139(1)”')
r.check("A company pays salary of ₹14 lakh without deducting TDS. How much is disallowed?",
        answer="30%, which is ₹4,20,000.")

# ======================================================================= S · 40(b) (hero)
s = S.chapter('s', 'Paying the partners', 'section 40(b)')
s.hook("Meera's brother Rohan joins, and the bakery becomes a firm. The firm pays both of them a salary. "
       "Can a firm pay its own owners, and deduct it?")
s.explain("A firm and its partners are the same people. If you could pay yourself any salary, you could drain every rupee out, "
          "and leave nothing to tax.")
s.name("So section 40(b) allows it, within limits. Salary only to working partners. It must be written in the deed, "
       "and only for the period after the deed.",
       show='Sec 40(b): working partners · authorised by the deed · after the deed date · interest ≤ 12% simple')
s.explain("Interest on a partner's capital is allowed up to 12% a year, simple interest. Anything more is disallowed.")
s.explain("Book profit is the firm's net profit, worked out under the tax rules, before the partners' salary.")
s.formula("The salary limit works on book profit. On the first ₹6 lakh, or on a loss, it's ₹3 lakh or 90%, "
          "whichever is higher. On the rest, it's 60%.",
          show='First ₹6 lakh: ₹3 lakh or 90%, higher · Balance: 60%')
s.example("The firm earns ₹17 lakh, before ₹1,50,000 of depreciation, and before the partners' salary and interest. "
          "Interest at 15% on ₹5 lakh is ₹75,000, but only 12%, ₹60,000, is allowed. So the book profit is ₹14,90,000.")
s.example("The limit is 90% of ₹6 lakh, which is ₹5,40,000. Plus 60% of the other ₹8,90,000, which is ₹5,34,000. "
          "Total, ₹10,74,000.")
s.explain("The partners were paid ₹40,000 a month each. That's ₹9,60,000, inside the limit. All of it is allowed.")
s.explain("On the other side, Rohan pays tax on the salary and interest the firm could deduct. "
          "That's business income in his hands. His share of the firm's profit is exempt.")
s.extreme("What if the firm makes a loss? It can still pay its working partners up to ₹3 lakh in all, and deduct it.")
s.check("The deed allows salary from 1 April, but it was signed on 1 July. From when is salary allowed?",
        answer="From 1 July. A deed can't authorise salary for the period before it.")

# ======================================================================= T · 40A
t = S.chapter('t', 'Relatives and cash', 'section 40A')
t.hook("Meera buys flour from her husband's mill at ₹48 a kilo. The market price is ₹40. What will the officer say?")
t.explain("If you overpay a relative, you quietly move profit from one family member to another. "
          "So section 40A(2) lets the officer disallow the excess. Here, ₹8 a kilo.")
t.name("These are specified persons. For an individual, relatives: spouse, brother, sister, and anyone in the direct line, "
       "up or down. Also businesses where she or a relative holds at least 20%.",
       show='Specified persons: sec 40A(2) · relatives and businesses with a substantial interest (≥ 20%)')
t.explain("Now cash. Under section 40A(3), if she pays one person more than ₹10,000 in cash in a single day, "
          "the whole payment is disallowed. Not just the excess.")
t.example("Four cash payments of ₹8,000 to the same supplier, at ten, at noon, at three and at six. "
          "Each is under the limit, but the day's total is ₹32,000. All ₹32,000 is disallowed.")
t.explain("Safe modes are an account payee cheque or draft, and electronic payment: card, net banking, UPI, IMPS, NEFT, "
          "RTGS. For a transporter hiring out goods carriages, the cash limit is ₹35,000.")
t.extreme("What if an expense was allowed last year, and she pays it in cash this year? "
          "Then that cash payment becomes income this year, under section 40A(3A).")
t.explain("Rule 6DD gives exceptions. Paying a bank or the government. Buying wheat directly from the farmer who grew it. "
          "Paying in a village with no bank. And retirement benefits up to ₹50,000.")
t.explain("Two last ones. A provision for gratuity isn't deductible, under section 40A(7). Only payments are, "
          "or contributions to an approved fund. And contributions to unapproved staff funds are blocked, under 40A(9).")
t.exam("Write it like this. Expenditure paid to a person in a day, otherwise than by account payee cheque, draft "
       "or prescribed electronic mode, exceeding ₹10,000, is disallowed.",
       show='“Payment(s) to a person in a day > ₹10,000 otherwise than by A/c payee cheque / draft / prescribed electronic mode → disallowed [40A(3)]”')
t.check("Meera buys ₹60,000 of milk in cash from a dairy farmer, in one day. Disallowed?",
        answer="No. Buying dairy produce from the producer is an exception under Rule 6DD.")

# ======================================================================= U · 43B (hero)
u = S.chapter('u', 'Pay to claim', 'section 43B')
u.hook("On 31 March, Meera owes ₹80,000 of staff bonus. It's in her books. Can she deduct it this year, before paying it?")
u.predict("Deduct now, or only after paying?")
u.explain("If you could claim dues without paying, you could delay paying for years. "
          "So section 43B says certain sums are deductible only when actually paid.")
u.name("The list: taxes, duties, cess and fees. The employer's contributions to PF and other staff funds. "
       "Bonus and commission. Interest to banks and public financial institutions. Leave encashment. And Indian Railways.",
       show='Sec 43B, pay to claim: taxes · employer’s PF · bonus · bank interest · leave encashment · Railways')
u.explain("But there's a grace period. If she pays before the due date of her return, under section 139(1), "
          "it's still allowed this year.")
u.example("Meera's return is due on 31 October 2026, because she's under tax audit. "
          "If the bonus is paid on 15 October, it's allowed this year. Paid on 15 November, it moves to next year.")
u.trap("Converting unpaid bank interest into a new loan is not payment. "
       "It's allowed only as she actually repays that converted loan.",
       show='Unpaid interest converted into a loan ≠ actual payment · allowed as the loan is repaid')
u.name("Then the newest clause, 43B(h). Money owed to a micro or small enterprise must be paid within the time "
       "in the MSME law. Otherwise, it's deductible only in the year it's paid.",
       show='Sec 43B(h): micro / small supplier · agreement ≤ 45 days, none → 15 days · no grace till the return date')
u.example("She buys boxes worth ₹10,000 from a micro enterprise on 1 March 2026, payable by 5 April. "
          "Paid on 2 April, it's allowed this year. Paid on 20 April, it moves to next year.")
u.explain("Notice the difference. Ordinary 43B items get grace till the return date. MSME dues get no such grace. "
          "And the rule doesn't apply to medium enterprises at all.")
u.check("Meera collects GST in March, and pays it on 20 April. Allowed this year?",
        answer="Yes. It's paid before the due date of the return.")

# ======================================================================= V · 41 + 43CA
v = S.chapter('v', 'Money that comes back', 'sections 41 and 43CA')
v.hook("Years ago, Meera deducted a ₹35,000 bill from her supplier. Now the supplier says, forget it, you needn't pay. "
       "Is that a gift?")
v.explain("She already got a deduction for that bill. If she never pays it, the deduction was for nothing. "
          "So the law takes it back.")
v.name("That's a remission of a trading liability, under section 41(1). The amount waived becomes business income, "
       "in the year it's waived.",
       show='Remission · sec 41(1): a trading liability waived or written back → income of that year')
v.explain("It applies even if she writes the liability back herself. And even if the business has already closed. "
          "A successor in the business is taxed the same way.")
v.explain("The same idea runs through section 41. A bad debt recovered later, under 41(4). A research asset sold, "
          "under 41(3). Whatever was deducted and comes back, is taxed.")
v.imagine("Now a different business. A builder holds flats as his stock. He sells one to a friend for ₹1 crore. "
          "But the stamp duty value is ₹1.2 crore.")
v.name("Under section 43CA, the stamp duty value is taken as the sale price. "
       "Unless it's within 110% of the actual price.",
       show='Sec 43CA: land or building held as stock · stamp duty value deemed the sale price, unless ≤ 110%')
v.example("₹1.2 crore is more than 110% of ₹1 crore. So the sale is taken at ₹1.2 crore. "
          "If the stamp value were ₹1.08 crore, his own price of ₹1 crore would stand.")
v.explain("Sometimes the price is agreed earlier, and part is paid by a non-cash mode by that date. "
          "Then the stamp value on the agreement date is used.")
v.check("Meera writes off a supplier's balance of ₹20,000 as no longer payable. Taxable?",
        answer="Yes. Writing back a trading liability is a remission, under section 41(1).")

# ======================================================================= W · 44AA + 44AB
w = S.chapter('w', 'Books and audit', 'sections 44AA and 44AB')
w.hook("Does every shopkeeper in India have to keep books, and get them audited?")
w.explain("No. You need books only above certain limits, under section 44AA. "
          "And you need an audit only above higher limits, under section 44AB.")
w.explain("For specified professions, like doctors, lawyers and accountants, prescribed books are needed "
          "if gross receipts crossed ₹1,50,000 in each of the last three years.")
w.explain("For other businesses run by an individual, there are two limits. "
          "Books are needed if income crossed ₹2,50,000, or turnover crossed ₹25 lakh, in any of the last three years.")
w.name("Tax audit is needed when business turnover is over ₹1 crore. That rises to ₹10 crore if cash receipts "
       "and cash payments are each within 5%. For a profession, the limit is ₹50 lakh.",
       show='Tax audit · sec 44AB: turnover > ₹1 crore (₹10 crore if cash ≤ 5%) · profession > ₹50 lakh')
w.example("Meera's turnover is ₹2.4 crore, and 12% comes in cash at the counter. That's over 5%, "
          "so the ₹10 crore limit isn't open to her. She needs a tax audit.")
w.explain("The audit report is due by 30 September 2026, a month before her return. "
          "Miss it, and the penalty is half a percent of turnover, up to ₹1,50,000. Not keeping books costs ₹25,000.")
w.check("A trader with ₹8 crore of turnover receives and pays everything through the bank. Audit?",
        answer="No. Cash is within 5% on both sides, so his limit is ₹10 crore.")

# ======================================================================= X · 44AD (hero)
x = S.chapter('x', 'The 8% shortcut', 'section 44AD')
x.hook("A small grocery shop has no accountant. How can the tax department know its profit?")
x.explain("It can't, easily. So for small businesses, the law offers a deal. "
          "Declare a fixed share of your turnover as profit, and skip the books.")
x.name("That's presumptive taxation, under section 44AD. Profit is taken as 8% of turnover. "
       "Or 6%, on the part received through banks or digital modes.",
       show='Presumptive · sec 44AD: 8% of turnover · 6% of digital receipts · or more, if earned')
x.explain("Who can use it? A resident individual, HUF, or partnership firm, but not an LLP. "
          "Turnover up to ₹2 crore. Or up to ₹3 crore, if cash receipts are within 5%.")
x.trap("It's not for everyone. Not for professionals, commission or brokerage earners, or agency businesses. "
       "And not for goods carriages, which have their own scheme.",
       show='44AD is not for: specified professions · commission or brokerage · agency business · goods carriages (→ 44AE)')
x.example("Sunil's grocery turns over ₹2,98,50,000. Only ₹14 lakh comes in cash, which is under 5%. So he's eligible. "
          "8% of ₹14 lakh is ₹1,12,000. 6% of the rest is ₹17,07,000. His income is ₹18,19,000.")
x.explain("That's it. Every deduction from sections 30 to 38 counts as already given, depreciation included. "
          "Even a firm can't deduct partners' salary and interest. And advance tax is due in one go, by 15 March.")
x.extreme("What if he uses the scheme one year, then declares less within the next five? "
          "He's locked out for five years after that. He must keep books, and get an audit, "
          "if his income is above the basic exemption limit.")
x.exam("Write it like this. The profit is deemed to be 8% of total turnover. "
       "For turnover received by account payee cheque, draft, or prescribed electronic modes, it's 6%.",
       show='“Profits deemed @ 8% of total turnover / gross receipts, or 6% of the amount received by A/c payee cheque / draft / ECS / prescribed electronic modes [sec 44AD(1)]”')
x.check("Meera's turnover is ₹2.4 crore, and 12% is cash. Can she use section 44AD?",
        answer="No. Above ₹2 crore, cash receipts must be within 5%.")

# ======================================================================= Y · 44ADA + 44AE
y = S.chapter('y', 'Doctors and truck owners', 'sections 44ADA and 44AE')
y.hook("Kabir the dentist earns ₹60 lakh a year, and Ravi owns three trucks. Do they get a shortcut too?")
y.explain("Yes. If you're a professional, there's section 44ADA. If you run goods carriages, there's section 44AE.")
y.name("Under 44ADA, half the gross receipts is taken as profit. It's for a resident individual or firm, "
       "but not an LLP, in a specified profession.",
       show='Sec 44ADA: 50% of gross receipts · ≤ ₹50 lakh, or ≤ ₹75 lakh if cash ≤ 5%')
y.example("Kabir's receipts are ₹60 lakh, with 3% in cash. That's within ₹75 lakh, with cash under 5%. "
          "So his income is ₹30 lakh. If 8% came in cash, his limit would be ₹50 lakh, and he'd need books and an audit.")
y.name("Under 44AE, a person owning at most ten goods carriages, at any time in the year, "
       "declares a fixed amount per vehicle, per month.",
       show='Sec 44AE: heavy vehicle ₹1,000 per ton per month · others ₹7,500 per month')
y.example("Ravi has two light trucks all year. That's two times twelve months, times ₹7,500, or ₹1,80,000. "
          "On 29 August he buys a 15 ton heavy truck. August to March is eight months. "
          "Eight times fifteen, times ₹1,000, is ₹1,20,000. Total, ₹3,00,000.")
y.trap("Months count from ownership, not use. A truck bought in April but driven only from July still counts from April. "
       "And any part of a month counts as a whole month.",
       show='44AE: months of OWNERSHIP, not use · part of a month = a full month · heavy = over 12,000 kg')
y.explain("One difference worth remembering. Under 44AE, a firm can still deduct partners' salary and interest, "
          "within section 40(b). Under 44AD and 44ADA, it can't.")
y.check("Kabir declares ₹22 lakh on receipts of ₹50 lakh, and his income is above the exemption limit. What must he do?",
        answer="Keep books under section 44AA, and get them audited under section 44AB.")

# ======================================================================= Z · full computation + recap
z = S.chapter('z', "Meera's full computation", 'every line through the machine')
z.hook("Back to Meera. Her books say ₹12 lakh. Let's put every line through the machine. Ready?",
       show="Meera's books say ₹12 lakh. What does the machine say?")
z.example("Start with the net profit, ₹12 lakh. First, add back what the law doesn't allow. "
          "Book depreciation, ₹3,10,000. Income tax, ₹1,20,000. "
          "And the new oven, ₹4 lakh, wrongly written off as an expense.")
z.example("Then the disallowances. Cash to the packaging supplier, ₹24,000. 30% of the consultant's fee without TDS, "
          "₹45,000. Bonus paid after the return date, ₹80,000. And the late MSME bill, ₹60,000.")
z.example("And the rest. Her family trip, ₹40,000, which is personal. The food safety penalty, ₹15,000. "
          "And the provision for gratuity, ₹50,000. Our total so far is ₹23,44,000.")
z.example("Now deduct what the books missed. Depreciation as per the Act, ₹2,85,000. "
          "And last year's bonus, paid this year, ₹70,000. That leaves ₹19,89,000.")
z.example("Take out other heads' income. ₹30,000 of bank interest, and ₹1,20,000 of rent from a flat. "
          "That leaves ₹18,39,000.")
z.example("Finally, add deemed income. A bad debt recovered, ₹25,000. And the supplier's waived bill, ₹35,000. "
          "Meera's business income is ₹18,99,000.")
z.extreme("And if she'd opted out of the default regime? Additional depreciation of ₹1 lakh, on the oven and the mixer. "
          "Her income would be ₹17,99,000.")
z.recap("So, the whole chapter in one breath. Section 28 decides what's caught. The books are only the starting point. "
        "Capital becomes depreciation, in blocks, at half rate under 180 days.")
z.recap("Sections 30 to 37 let costs in. Sections 40, 40A and 43B keep some out, or make them wait. "
        "Section 41 brings back what returns. And small businesses can take the presumptive shortcut.")
z.wonder("Every adjustment answers one of three questions. Is it business income? Is it allowed? Is it allowed this year? "
         "Ask those three, and no PGBP question can surprise you.")

# section numbers are spoken the way a CA teacher says them: 40A(3) -> 'forty ay three'
for b_ in S.beats():
    for tok in SEC_RE.findall(b_.text + ' ' + (b_.answer or '')):
        S.lex.setdefault(tok, sec_say(tok))
