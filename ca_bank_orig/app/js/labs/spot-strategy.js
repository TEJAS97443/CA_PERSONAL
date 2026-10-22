/* PassBook — Spot the Strategy Lab (spot-strategy): read a case, see its clue words light up one by one with what each one tells you,
   then the concept it describes and the textbook reasoning. Ten families of concepts from ICAI's Strategic Management Study Material:
   Porter's generic strategies (3.6.2), Ansoff's growth strategies (4.4.1), integration and diversification (4.2.2.3), the corporate strategies
   (4.2), retrenchment (4.3), Mendelow's quadrants (3.2.1), the levels of strategy (1.6), the product life cycle (2.4.1), SWOT (3.5) and BCG
   (4.4.3). Cases from ICAI's RTPs, MTPs and past papers keep ICAI's facts (lightly trimmed) and ICAI's answer, with the source.
   (TOWS is not in the current Study Material, so it is not a family here.)
   Pure part: CASES, FAMILIES, findClues(text, clues) and compute(values); UI: register() at the bottom. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let lastFam = 'all';

  /* ================================================================ the families: options with the Study Material's own descriptions */
  const FAMILIES = {
    generic: { name: 'Porter\'s generic strategies', q: 'Which of Porter\'s generic strategies is this?', sm: 'Study Material 3.6.2',
      how: 'Two questions: is the target the broad market or a narrow segment, and is the edge low cost, uniqueness, or both (more value for money)?',
      opts: [['Cost leadership', 'Low cost aimed at the broad mass market: a lower price than most competitors, still earning satisfactory profits'],
        ['Differentiation', 'A product the broad market sees as unique (design, brand, features, service), so it can charge a premium'],
        ['Focused cost leadership', 'Competing on price within a narrow target market: low prices relative to other firms in that market'],
        ['Focused differentiation', 'Unique features that fulfil the demands of a narrow market'],
        ['Best-cost provider', 'More value for money: a lower price than rivals for comparable quality, or a similar price for much higher quality']] },
    ansoff: { name: 'Ansoff\'s growth strategies', q: 'Which growth strategy of Ansoff\'s matrix is this?', sm: 'Study Material 4.4.1',
      how: 'Is the product new to the firm? Is the market new to it?',
      opts: [['Market penetration', 'Existing products in existing markets: more sales to present customers'], ['Market development', 'Existing products in new markets: new regions, segments or channels'],
        ['Product development', 'New or modified products for existing markets'], ['Diversification', 'New products in new markets: the risky cell']] },
    integration: { name: 'Integration and diversification', q: 'Which kind of growth by diversification is this?', sm: 'Study Material 4.2.2.3',
      how: 'Is the new business related to the present one? If it sits in the same product-process chain, is it the input side (backward), the output and distribution side (forward), or the same stage (horizontal)?',
      opts: [['Backward integration', 'Entering the business of the input providers to secure supply or lower cost'], ['Forward integration', 'Moving forward in the value chain: businesses that use the existing products, or the distribution channels'],
        ['Horizontal integration', 'Acquiring similar businesses at the same stage of the production-marketing chain, or complementary products'],
        ['Concentric diversification', 'A related business linked to the present one through process, technology or marketing'], ['Conglomerate diversification', 'An unrelated business: no linkage of product, market or technology']] },
    corporate: { name: 'Corporate strategies', q: 'Which corporate strategy is this?', sm: 'Study Material 4.2',
      how: 'Does the firm stay with its businesses (stability), grow them significantly (expansion), cut some of them back (retrenchment), or do several at once (combination)?',
      opts: [['Stability', 'Stays with its current businesses and product markets, maintains the existing level of effort, satisfied with incremental growth'],
        ['Expansion', 'Seeks significant growth: in the current businesses, or by entering related or unrelated new businesses'],
        ['Retrenchment', 'Retrenches some activities, or drops a business through sell-out or liquidation'], ['Combination', 'Combines the other strategies to suit its specific needs']] },
    retrench: { name: 'Retrenchment strategies', q: 'Which retrenchment strategy is this?', sm: 'Study Material 4.3',
      how: 'Reverse the decline from inside (turnaround), cut off a unit or product line (divestment), or abandon the activities totally (liquidation)?',
      opts: [['Turnaround', 'Reversing the process of decline by improving internal efficiency, often with changes in the top management'],
        ['Divestment', 'Selling or liquidating a portion of the business, a division, profit centre or SBU; often after a turnaround has failed'],
        ['Liquidation', 'Abandoning the activities totally when nothing else works']] },
    mendelow: { name: 'Mendelow\'s matrix', q: 'Where does this stakeholder fall in Mendelow\'s matrix?', sm: 'Study Material 3.2.1',
      how: 'Two questions: how much power does the stakeholder have over the organisation\'s strategy or resources, and how interested is it in the organisation succeeding?',
      opts: [['Key players', 'High power, high interest: manage closely, involve in decisions'], ['Keep satisfied', 'High power, low interest: consult often, keep them satisfied'],
        ['Keep informed', 'Low power, high interest: inform adequately, use their feedback'], ['Low priority', 'Low power, low interest: monitor only']] },
    level: { name: 'Levels of strategy', q: 'At which level of strategic management is this?', sm: 'Study Material 1.6',
      how: 'Is the decision about which businesses to be in (corporate), how to compete in one business (business), or how one function carries it out (functional)?',
      opts: [['Corporate level', 'CEO, senior executives and the board: mission, which businesses to be in, allocating resources among them'],
        ['Business level', 'The head of a division or SBU: concrete strategies to compete in that business'],
        ['Functional level', 'Managers of one function (marketing, HR, production, finance): strategies that carry out the business strategy']] },
    plc: { name: 'Product life cycle', q: 'Which stage of the product life cycle is this?', sm: 'Study Material 2.4.1',
      how: 'Read the sales, prices and competition: slow sales and high prices, rapid growth and falling prices, slowing growth and tough competition, or sharply falling sales?',
      opts: [['Introduction', 'Slow sales growth, negligible competition, relatively high prices, limited markets'], ['Growth', 'Rapid market acceptance: demand expands, prices fall, competition increases'],
        ['Maturity', 'Growth slows down, competition gets tough, the market stabilises, profits come down'], ['Decline', 'A sharp downward drift in sales and profits as new products replace the old']] },
    swot: { name: 'SWOT analysis', q: 'In a SWOT analysis, where does this item go?', sm: 'Study Material 3.5',
      how: 'Is it internal (the firm\'s own attribute) or external (the environment)? Is it helpful or harmful to the objective?',
      opts: [['Strength', 'Internal and helpful'], ['Weakness', 'Internal and harmful'], ['Opportunity', 'External and helpful'], ['Threat', 'External and harmful']] },
    bcg: { name: 'BCG growth-share matrix', q: 'Which BCG category is this business?', sm: 'Study Material 4.4.3',
      how: 'High or low relative market share? High or low market growth?',
      opts: [['Star', 'High share in a high-growth market: needs heavy investment, the best opportunity for expansion'], ['Cash cow', 'High share in a low-growth market: generates cash, needs less investment'],
        ['Question mark', 'Low share in a high-growth market: needs a lot of cash to hold its share'], ['Dog', 'Low share in a low-growth market: not much future']] }
  };
  const FAM_IDS = Object.keys(FAMILIES);

  /* ================================================================ the cases. clues: [exact phrase in the text, what it tells you] */
  const C = (fam, id, title, text, clues, answer, why, src, q) => ({ fam, id, title, text, clues, answer, why, src: src || '', q: q || '' });
  const CASES = [
    /* ---------------- Porter's generic strategies */
    C('generic', 'g-elite', 'Elite Motors\' bespoke luxury cars', 'Elite Motors Ltd., a luxury automobile manufacturer, exclusively targets ultra-high-net-worth individuals by offering premium cars with bespoke features such as hand-stitched leather interiors, personalised design options, and superior craftsmanship that are not available in mass-market vehicles. The company deliberately serves a narrow customer segment and differentiates its products through exceptional quality and exclusivity rather than competing on price.',
      [['exclusively targets ultra-high-net-worth individuals', 'the target is a small, specific group, not the mass market'], ['not available in mass-market vehicles', 'the edge is uniqueness'], ['serves a narrow customer segment', 'narrow target, said in so many words'], ['rather than competing on price', 'the edge is not low cost']],
      'Focused differentiation', 'A narrow target served with unique, premium features: focused differentiation (like Rolls-Royce in the Study Material).', 'RTP September 2026 Q13'),
    C('generic', 'g-pearl', 'Pearl India\'s packaged foods', 'Pearl India Ltd. is a major packaged food company which dominates in some sectors like snacks, dairy, biscuits and instant meals. It offers high quality and unique products that match the taste and preference of the customers. It always takes steps to enhance brand image and charge a premium price for which buyers do not negotiate. Often the unique features of their products that are not available with their competitors help them to gain competitive advantage.',
      [['major packaged food company which dominates', 'a large firm serving the broad market'], ['high quality and unique products', 'the edge is uniqueness'], ['enhance brand image and charge a premium price', 'brand image and a premium price: the marks of a differentiator'], ['buyers do not negotiate', 'buyers accept the price for the special features']],
      'Differentiation', 'Broad market, unique products, brand image and a premium price buyers do not haggle over: differentiation.', 'PYQ May 2026 Q5(b)'),
    C('generic', 'g-budget', 'BudgetBazaar (EcoTrend, BudgetBazaar and VogueVista)', 'EcoTrend, a growing e-commerce company, competes with industry giants by offering premium, eco-friendly products at high prices, targeting environmentally conscious consumers. Meanwhile, its competitor, BudgetBazaar, focuses on providing the lowest prices by optimizing costs and streamlining operations. Another player, VogueVista, stands out through exclusive, fashion-forward designs that attract trend-savvy customers.',
      [['BudgetBazaar, focuses on providing the lowest prices', 'the edge is price'], ['optimizing costs and streamlining operations', 'it gets there by vigorous cost reduction, across the whole market']],
      'Cost leadership', 'Lowest prices for everyone, made possible by optimised costs and operations: cost leadership.', 'MTP May 2025 Series II Q(b)', 'Which generic strategy does BudgetBazaar follow?'),
    C('generic', 'g-eco', 'EcoTrend (EcoTrend, BudgetBazaar and VogueVista)', 'EcoTrend, a growing e-commerce company, competes with industry giants by offering premium, eco-friendly products at high prices, targeting environmentally conscious consumers. Meanwhile, its competitor, BudgetBazaar, focuses on providing the lowest prices by optimizing costs and streamlining operations. Another player, VogueVista, stands out through exclusive, fashion-forward designs that attract trend-savvy customers.',
      [['premium, eco-friendly products at high prices', 'uniqueness and a premium price'], ['targeting environmentally conscious consumers', 'a niche, not the whole market']],
      'Focused differentiation', 'A niche (environmentally conscious buyers) served with premium, unique products: ICAI calls it differentiation focus, i.e. focused differentiation.', 'MTP May 2025 Series II Q(b)', 'Which generic strategy does EcoTrend follow?'),
    C('generic', 'g-vogue', 'VogueVista (EcoTrend, BudgetBazaar and VogueVista)', 'EcoTrend, a growing e-commerce company, competes with industry giants by offering premium, eco-friendly products at high prices, targeting environmentally conscious consumers. Meanwhile, its competitor, BudgetBazaar, focuses on providing the lowest prices by optimizing costs and streamlining operations. Another player, VogueVista, stands out through exclusive, fashion-forward designs that attract trend-savvy customers.',
      [['VogueVista, stands out through exclusive, fashion-forward designs', 'the edge is unique design and brand image'], ['attract trend-savvy customers', 'a style-conscious mass of customers, not a tiny niche: ICAI reads it as the broad market']],
      'Differentiation', 'Exclusive, fashion-forward designs and a strong brand image across the market: differentiation.', 'MTP May 2025 Series II Q(b)', 'Which generic strategy does VogueVista follow?'),
    C('generic', 'g-elitew', 'EliteWheels\' premium automobiles', 'EliteWheels Ltd. is a luxury automobile manufacturer that caters to affluent customers seeking exclusivity and high-end features. The company offers premium vehicles with cutting-edge technology, customization options, and top-tier customer service. Unlike mass-market car brands, EliteWheels Ltd. charges a significant premium, ensuring that only a niche segment of customers can afford them.',
      [['caters to affluent customers seeking exclusivity', 'a narrow, well-defined target'], ['cutting-edge technology, customization options, and top-tier customer service', 'uniqueness'], ['only a niche segment of customers can afford them', 'narrow target, said plainly']],
      'Focused differentiation', 'Unique, high-value cars for an affluent niche: focused differentiation.', 'RTP May 2025 Q11'),
    C('generic', 'g-abc', 'ABC Ltd.\'s sugar-free beverages', 'ABC Ltd. is a beverage manufacturing company. Its R & D developed a formula for manufacturing sugar-free beverages. On approval by the competent authorities, the company became the pioneer to launch sugar free beverages, which are sold at a relatively higher price. The new product has been accepted widely by a class of customers and has proved profitable for the company.',
      [['the pioneer to launch sugar free beverages', 'a product nobody else offers: uniqueness'], ['sold at a relatively higher price', 'a premium price for the unique feature'], ['accepted widely', 'ICAI reads the market as broad']],
      'Differentiation', 'A pioneering, unique product sold at a premium: ICAI\'s answer is differentiation.', 'RTP May 2024 Q11'),
    C('generic', 'g-xxp', 'XXP India\'s home appliances', 'A leading company in the home appliances domain, XXP India, is planning to launch various innovative product designs and offer loyalty programmes to lure consumers as the whole sector expects business to grow by 15-20 percent.',
      [['innovative product designs', 'uniqueness through design'], ['loyalty programmes', 'building customer loyalty, a basis of differentiation'], ['A leading company', 'a large firm in the broad market']],
      'Differentiation', 'Innovative designs and loyalty programmes for the mass market: differentiation.', 'RTP September 2024 Q11'),
    C('generic', 'g-phones', 'Flagship phones at lower prices', 'Several Android phone brands offer flagship-quality phones with the latest features at prices well below those of the market leaders, giving customers better quality at the lowest prices.',
      [['flagship-quality phones with the latest features', 'quality and features comparable to the best'], ['at prices well below those of the market leaders', 'and a lower price than rivals'], ['better quality at the lowest prices', 'both together: more value for money']],
      'Best-cost provider', 'A lower price than rivals for comparable quality: the Study Material\'s example of the best-cost provider strategy (OnePlus, Xiaomi, Oppo, Vivo).', 'Study Material 3.6.2.4 (example)'),
    C('generic', 'g-express', 'Tapri Express at railway stations', 'Tapri Express sells one standard cup of chai for ₹10 at 600 railway stations across India. It buys tea and milk centrally in huge volumes, uses identical kiosks and no frills, and prices below every rival on the platform while still making a profit.',
      [['one standard cup of chai', 'standardised product for mass production'], ['600 railway stations across India', 'the broad mass market'], ['buys tea and milk centrally in huge volumes', 'economies of scale: lower cost per unit'], ['prices below every rival', 'the edge is price']],
      'Cost leadership', 'Standardised product, scale economies and the lowest price for the whole market: cost leadership (like McDonald\'s in the Study Material).'),
    C('generic', 'g-campus', 'Tapri\'s campus chai for students', 'Tapri opens tiny counters only next to college campuses, selling a ₹12 cutting chai and a bun to students on a budget. Its prices are lower than the campus canteens, though not the lowest in the city.',
      [['only next to college campuses', 'a narrow target market'], ['students on a budget', 'price-sensitive buyers in that segment'], ['lower than the campus canteens, though not the lowest in the city', 'low price relative to the target market only']],
      'Focused cost leadership', 'Competing on price within a narrow segment, cheaper than the others serving it but not the cheapest overall: focused cost leadership.'),
    /* ---------------- Ansoff */
    C('ansoff', 'a-tooth', 'Toothpaste: brush twice a day', 'A leading producer of tooth paste advises its customers to brush teeth twice a day to keep breath fresh.',
      [['advises its customers', 'the same, existing customers'], ['brush teeth twice a day', 'they use more of the same product (frequency of use)']],
      'Market penetration', 'Existing product, existing market, more usage: market penetration.', 'SM Test Your Knowledge, Descriptive Q4(i)'),
    C('ansoff', 'a-hotel', 'Hotel giant enters dairy', 'A business giant in hotel industry decides to enter into dairy business.',
      [['business giant in hotel industry', 'what it knows today: hotels'], ['enter into dairy business', 'a new product for new customers']],
      'Diversification', 'New product, new market: diversification.', 'SM Test Your Knowledge, Descriptive Q4(ii)'),
    C('ansoff', 'a-uv', 'Utility vehicle maker goes abroad', 'One of India\'s premier utility vehicles manufacturing company ventures to foray into foreign markets.',
      [['utility vehicles manufacturing company', 'its existing product'], ['foray into foreign markets', 'markets that are new to it']],
      'Market development', 'Existing product, new geographical market: market development.', 'SM Test Your Knowledge, Descriptive Q4(iii)'),
    C('ansoff', 'a-scooter', 'Auto maker launches ungeared scooters', 'A renowned auto manufacturing company launches ungeared scooters in the market.',
      [['renowned auto manufacturing company', 'it already sells to two-wheeler buyers'], ['launches ungeared scooters', 'a product that is new to the company']],
      'Product development', 'New product for its existing market: product development.', 'SM Test Your Knowledge, Descriptive Q4(iv)'),
    C('ansoff', 'a-phone', 'Phone maker grows at home', 'A mobile phone company already has a strong customer base in its home country. To grow further, it focuses on increasing sales of its existing phones by offering promotional discounts, ramping up advertising and partnering with more local retailers for better distribution.',
      [['strong customer base in its home country', 'its existing market'], ['increasing sales of its existing phones', 'existing products'], ['promotional discounts, ramping up advertising', 'aggressive promotion to sell more to the same market']],
      'Market penetration', 'More sales of existing phones in the home market: market penetration (option (a)).', 'RTP September 2025 MCQ 5'),
    C('ansoff', 'a-gho', 'Green Harvest Organics\' loyalty programmes', 'To expand its market share, Green Harvest Organics introduced loyalty programmes to encourage repeat purchases among existing customers and launched promotional campaigns to attract consumers who previously purchased conventional produce, without expanding into new markets or spending money on introducing new products.',
      [['To expand its market share', 'the aim: a bigger share of the present market'], ['repeat purchases among existing customers', 'existing customers buy more'], ['without expanding into new markets or spending money on introducing new products', 'neither the market nor the product is new']],
      'Market penetration', 'Existing products, existing markets, more share: market penetration, whose objective is increasing market share by selling existing products in existing markets (ICAI, option (b)).', 'RTP September 2026 Case Scenario MCQ 1(i)'),
    C('ansoff', 'a-gucci', 'Gucci casual wear in Europe', 'Gucci, a luxury clothing brand, starts selling casual clothing in its European markets.',
      [['luxury clothing brand', 'what it sells today'], ['starts selling casual clothing', 'a product new to Gucci'], ['its European markets', 'a market it already serves']],
      'Product development', 'New product (casual wear), existing market (Europe): the Study Material\'s example of product development.', 'Study Material 4.4.1 (example)'),
    C('ansoff', 'a-dubai', 'Tapri premix in Dubai', 'Tapri Tea Co. starts selling its existing chai premix, unchanged, in supermarkets in Dubai, where it has never sold before.',
      [['its existing chai premix, unchanged', 'existing product'], ['where it has never sold before', 'a new geographical market']],
      'Market development', 'Existing product in a new geographical market: market development.'),
    /* ---------------- integration and diversification */
    C('integration', 'i-gho', 'Green Harvest Organics\' farm-to-table cafés', 'Green Harvest Organics grows and sells organic produce. Its growth strategy also involves establishing a chain of branded farm-to-table cafés. GHO plans to connect directly with consumers and increase its control over the distribution process, capturing additional value.',
      [['grows and sells organic produce', 'its present stage in the chain: growing'], ['farm-to-table cafés', 'a business that uses its produce, further down the chain'], ['increase its control over the distribution process', 'taking over distribution: moving forward']],
      'Forward integration', 'Moving forward in the value chain into businesses that use its products and into distribution: vertical forward integration (option (c)).', 'RTP September 2026 Case Scenario MCQ 1(ii)'),
    C('integration', 'i-rajesh', 'Rajesh Textiles opens hospitals', 'Rajesh Textiles Ltd., a leading fabric manufacturer, establishes MedCare Hospitals to enter the healthcare services industry, which has no technological or market linkage with its existing textile business. The management expects growth through sectoral expansion and risk spreading.',
      [['a leading fabric manufacturer', 'its present business'], ['healthcare services industry', 'a business of an entirely different kind'], ['no technological or market linkage', 'unrelated: no common thread'], ['risk spreading', 'a classic reason for unrelated diversification']],
      'Conglomerate diversification', 'No product, market or technology linkage: conglomerate diversification (option (b)).', 'RTP May 2026 MCQ 6'),
    C('integration', 'i-farms', 'Supermarket chain buys farms', 'A large supermarket chain considers purchasing a number of farms that would provide it a significant amount of fresh produce.',
      [['supermarket chain', 'a retailer: it buys produce from others'], ['purchasing a number of farms', 'entering the business of its input providers'], ['provide it a significant amount of fresh produce', 'securing its own supply']],
      'Backward integration', 'Entering the business of its input providers: the Study Material\'s example of backward integration.', 'Study Material 4.2.2.3 (example)'),
    C('integration', 'i-coffee', 'Coffee bean maker and a café', 'A coffee bean manufacturer chooses to merge with a coffee café chain.',
      [['coffee bean manufacturer', 'it makes the input'], ['merge with a coffee café chain', 'joining the business that uses its product']],
      'Forward integration', 'Moving forward in the value chain into a business that uses its product: the Study Material\'s example of forward integration.', 'Study Material 4.2.2.3 (example)'),
    C('integration', 'i-textile', 'Textile mill buys two mills', 'Textile Mill 1 acquires Textile Mill 2 and Textile Mill 3.',
      [['acquires Textile Mill 2 and Textile Mill 3', 'similar businesses at the same stage of the chain']],
      'Horizontal integration', 'Acquiring similar businesses at the same stage of the production-marketing chain: the Study Material\'s figure of horizontal integration.', 'Study Material 4.2.2.3 (figure)'),
    C('integration', 'i-shoes', 'Clothing maker ventures into shoes', 'A company producing clothes ventures into the manufacturing of shoes, sold through the same stores to the same customers.',
      [['producing clothes', 'its present product'], ['manufacturing of shoes', 'a new but related product'], ['through the same stores to the same customers', 'linked through marketing: synergy']],
      'Concentric diversification', 'A related business linked through marketing: the Study Material\'s example of concentric diversification.', 'Study Material 4.2.2.3 (example)'),
    C('integration', 'i-cement', 'Cement maker makes steel and rubber', 'A cement manufacturer diversifies into the manufacture of steel and rubber products.',
      [['cement manufacturer', 'its present business'], ['steel and rubber products', 'unrelated to cement in product, market and technology']],
      'Conglomerate diversification', 'No common thread with the present business: the Study Material\'s example of conglomerate diversification.', 'Study Material 4.2.2.3 (example)'),
    C('integration', 'i-estate', 'Tapri buys a tea estate', 'Tapri buys a tea estate in Assam so that its cafés and premix plant get their tea leaves from their own gardens.',
      [['buys a tea estate', 'the source of its main input'], ['get their tea leaves from their own gardens', 'it now supplies itself']],
      'Backward integration', 'Entering the business of its input providers: backward integration.'),
    C('integration', 'i-chaichain', 'Tapri acquires ChaiChain', 'Tapri acquires ChaiChain, a rival chain of 80 tea cafés in South India, to add outlets and remove a competitor.',
      [['a rival chain of 80 tea cafés', 'a similar business at the same stage of the chain'], ['remove a competitor', 'taking over a competitor']],
      'Horizontal integration', 'Taking over a similar business at the same stage, a competitor: horizontal integration.'),
    /* ---------------- corporate strategies */
    C('corporate', 'c-mm', 'MM Company\'s tubeless tyres', 'A well-established MM Company has manufactured tubeless tyres for quite some time, and the product has reached the maturity stage of its life cycle. Cost benefit analysis indicates that it would be better to modernise its plant and machinery to improve efficiency and productivity. The idea is to remain competitive in a dynamic and volatile business world while preserving its market share.',
      [['reached the maturity stage', 'a mature product: a typical reason for stability'], ['modernise its plant and machinery to improve efficiency', 'incremental improvement in functional efficiency'], ['preserving its market share', 'no new business or market: keep what it has']],
      'Stability', 'Same business, same product-market posture, incremental efficiency to preserve share: stability, which is not a "do nothing" strategy.', 'PYQ May 2026 Q5(c)'),
    C('corporate', 'c-tapri-mix', 'Tapri grows and prunes at once', 'Kesar opens kulhad cafés in 20 new cities this year and, at the same time, closes the loss-making frozen-snacks unit.',
      [['opens kulhad cafés in 20 new cities', 'growth in one part of the business'], ['closes the loss-making frozen-snacks unit', 'retrenchment in another'], ['at the same time', 'both together']],
      'Combination', 'Expansion in one business and retrenchment in another at the same time: a combination strategy.'),
    C('corporate', 'c-tapri-grow', 'Tapri\'s ₹300 crore push', 'Tapri raises ₹300 crore to launch a chain of tea-and-snacks restaurants and an export premix brand, redefining itself from a café company into a food company.',
      [['launch a chain of tea-and-snacks restaurants and an export premix brand', 'new businesses, new markets'], ['redefining itself', 'a redefinition of the business']],
      'Expansion', 'Significant growth that redefines the business: expansion.'),
    /* ---------------- retrenchment */
    C('retrench', 'r-maai23', 'MaAi\'s product "Nota" in 2023', 'MaAi, a prominent group with businesses named Alpha, Bravo, Charlie and Delta, had acquired a business dealing in product "Nota" in 2020. "Nota" was not contributing as expected; rather it was causing financial duress. After identifying the apparent problem area, in 2023 an emphasis was placed on change in management and improvement in internal efficiency.',
      [['causing financial duress', 'a business in decline'], ['change in management', 'changes in the top management: an element of turnaround'], ['improvement in internal efficiency', 'internal retrenchment to reverse the decline']],
      'Turnaround', 'Emphasis on change in management and internal efficiency to reverse the decline: turnaround.', 'PYQ May 2025 Q5(c) (year 2023)'),
    C('retrench', 'r-maai24', 'MaAi\'s product "Nota" in 2024', 'MaAi had acquired a business dealing in product "Nota" in 2020, and in 2023 tried a change in management and better internal efficiency. On further evaluation in 2024, even after due emphasis, there was no positive outcome, and the company decided to get rid of the business related to product "Nota".',
      [['even after due emphasis, there was no positive outcome', 'a turnaround was attempted and failed'], ['get rid of the business related to product "Nota"', 'selling off one business, not the whole group']],
      'Divestment', 'A turnaround attempted but unsuccessful, then one business sold off: divestment.', 'PYQ May 2025 Q5(c) (year 2024)'),
    C('retrench', 'r-prime', 'PrimeVision Entertainment closes', 'PrimeVision Entertainment Ltd. had been incurring continuous losses for several years. After evaluating all revival options, the promoters concluded that selling the company\'s assets would generate higher value than continuing its operations. Accordingly, they decided to permanently close the business and pursue asset sales.',
      [['After evaluating all revival options', 'turnaround and divestment were considered'], ['permanently close the business', 'abandoning the activities totally']],
      'Liquidation', 'Nothing else works, so the business is closed and its assets sold: liquidation (option (b)).', 'RTP September 2026 MCQ 5'),
    C('retrench', 'r-cloth', 'Clothing brand revamps', 'A well-established clothing brand is experiencing a decline in sales and market share due to changing consumer preferences and rising competition. In response, the company restructures its operations, cuts cost, revamps its product line, enhances marketing efforts and focuses on boosting employee morale and operational efficiency.',
      [['decline in sales and market share', 'danger signals of decline'], ['restructures its operations, cuts cost, revamps its product line', 'restructuring and quick cost reductions'], ['boosting employee morale and operational efficiency', 'improving internal efficiency to reverse the decline']],
      'Turnaround', 'Reversing a decline from inside: turnaround (option (d)).', 'RTP September 2025 MCQ 6'),
    C('retrench', 'r-symergy', 'Symergy Ltd.\'s decline', 'Symergy Ltd. has manufactured a product since 2010 and was doing well till 2022. After that its market share started declining, accumulated losses started mounting with a persistent negative impact on its cash flow, and employee morale fell. The Board thought it proper to continue in business by placing emphasis on improvement in internal efficiency, including revamping the top management.',
      [['market share started declining', 'a danger signal'], ['persistent negative impact on its cash flow', 'another danger signal'], ['continue in business', 'not closing or selling'], ['improvement in internal efficiency, including revamping the top management', 'the heart of a turnaround']],
      'Turnaround', 'Staying in business and fixing it from inside: turnaround.', 'PYQ September 2024 Q5(b)'),
    C('retrench', 'r-tapri-sam', 'Tapri sells the samosa factory', 'Tapri\'s frozen-samosa factory has lost money for four years even after a new manager and a cost drive. Kesar sells the factory to a snacks company and keeps the cafés and the premix business.',
      [['even after a new manager and a cost drive', 'a turnaround was tried and failed'], ['sells the factory', 'one unit is sold'], ['keeps the cafés and the premix business', 'the rest of the company carries on']],
      'Divestment', 'One loss-making unit sold after a failed turnaround: divestment.'),
    /* ---------------- Mendelow */
    C('mendelow', 'm-green', 'Green Habitat Constructions and Solar Tech', 'A leading real estate developer, Green Habitat Constructions, wants to integrate Solar Tech\'s next-generation panels into its residential and commercial projects.',
      [['A leading real estate developer', 'a big buyer: power over Solar Tech\'s success'], ['wants to integrate Solar Tech\'s next-generation panels', 'deeply interested in Solar Tech\'s product']],
      'Key players', 'High power and high interest: key players, option (A).', 'PYQ September 2025 MCQ 13'),
    C('mendelow', 'm-ngo', 'An environmental NGO and EcoRide', 'When the government announced stricter battery recycling norms, an environmental NGO emerged as a powerful stakeholder, urging EcoRide to adopt greener supply chain practices.',
      [['emerged as a powerful stakeholder', 'high power'], ['urging EcoRide to adopt greener supply chain practices', 'high, active interest in what EcoRide does']],
      'Key players', 'High power and high interest: key players, to be engaged actively, option (d).', 'RTP May 2026 Case Scenario MCQ 1(v)'),
    C('mendelow', 'm-health', 'A health-conscious community group', 'A health-conscious community group strongly advocates for more organic options in local eateries and shows great interest in influencing food choices. However, a small local café, whose loyal customer base prefers traditional food, remains unaffected by the group\'s efforts.',
      [['shows great interest in influencing food choices', 'high interest'], ['remains unaffected by the group\'s efforts', 'little power over the café']],
      'Keep informed', 'High interest, low power: keep informed, option (c).', 'RTP September 2025 MCQ 4'),
    C('mendelow', 'm-gst', 'The tax department after a GST lapse', 'An organisation inadvertently contravenes a GST regulation. The Indirect Taxes Department, which normally has little interest in the firm\'s day-to-day work, now examines its affairs closely.',
      [['Indirect Taxes Department', 'a regulator: high power'], ['now examines its affairs closely', 'its interest has jumped']],
      'Key players', 'The Study Material\'s own example: the regulator moves from high power, low interest to high power, high interest, a key player.', 'Study Material 3.2.1 (example)'),
    C('mendelow', 'm-bank', 'Tapri\'s banker', 'Tapri\'s lead bank has lent it ₹120 crore and can refuse further loans, but takes little interest in Tapri\'s menus or cities as long as the instalments arrive.',
      [['can refuse further loans', 'high power over resources'], ['takes little interest', 'low interest']],
      'Keep satisfied', 'High power, low interest: keep satisfied (the Study Material lists banks and government here).'),
    C('mendelow', 'm-mag', 'A business magazine', 'A business magazine writes about chai cafés once a year; it has no say in Tapri\'s plans and little interest in its success.',
      [['no say in Tapri\'s plans', 'low power'], ['little interest in its success', 'low interest']],
      'Low priority', 'Low power, low interest: low priority, monitor only (the Study Material\'s example: business magazines and media houses).'),
    C('mendelow', 'm-staff', 'Tapri\'s café staff', 'Tapri\'s café staff care a great deal about the new shift system and the bonus plan, though the decision rests with the board.',
      [['care a great deal', 'high interest'], ['the decision rests with the board', 'low power over the decision']],
      'Keep informed', 'Low power, high interest: keep informed (the Study Material\'s example: employees, vendors, suppliers).'),
    C('mendelow', 'm-rival', 'BrewBucks as a stakeholder', 'BrewBucks, the global coffee chain, can change the market Tapri competes in with one price cut, but it has no interest in Tapri succeeding.',
      [['can change the market Tapri competes in', 'high power to impact strategy'], ['no interest in Tapri succeeding', 'low interest in the organisation\'s success']],
      'Keep satisfied', 'High power, low interest: the Study Material\'s big competitor, which sits in keep satisfied.'),
    /* ---------------- levels of strategy */
    C('level', 'l-rohan', 'Rohan at Z-Foods', 'Rohan is a manager at "Z-Foods." His primary responsibility is to develop specific tactics for the marketing department to ensure that the "Quick-Snack" division achieves its market share targets.',
      [['specific tactics for the marketing department', 'one function: marketing'], ['to ensure that the "Quick-Snack" division achieves', 'carrying out the division\'s (business) strategy']],
      'Functional level', 'Strategies for one function that help a division meet its targets: functional level, option (c).', 'RTP May 2026 MCQ 2'),
    C('level', 'l-bev', 'A beverage company\'s departments', 'A beverage company\'s marketing team launches a campaign to boost social media engagement. The production unit enhances efficiency to cut costs and the HR department implements new training programs to improve employee productivity. These departmental initiatives are aligned with the company\'s overall growth goals.',
      [['marketing team', 'a function'], ['the HR department', 'another function'], ['departmental initiatives are aligned with the company\'s overall growth goals', 'functions carrying out the higher-level strategy']],
      'Functional level', 'Each department\'s own strategy in support of the company\'s goals: functional level, option (c).', 'RTP September 2025 MCQ 2'),
    C('level', 'l-alpha', 'Alpha Group\'s board buys a pharma company', 'The Board of Directors of Alpha Group Ltd., which operates in the textiles, hospitality and renewable energy businesses, has decided to acquire a pharmaceutical company to diversify its business portfolio and reduce dependence on existing industries.',
      [['The Board of Directors', 'the top of the organisation'], ['acquire a pharmaceutical company to diversify its business portfolio', 'deciding which businesses to be in']],
      'Corporate level', 'The board deciding the portfolio of businesses: corporate level, option (a).', 'RTP September 2026 MCQ 2'),
    C('level', 'l-adani', 'A group chairman\'s responsibilities', 'The group chairman of a conglomerate active in mining, ports, airports, power and cement sets the overall strategic objectives, allocates resources among the different business areas, and decides whether the group should divest any business or acquire new ones.',
      [['allocates resources among the different business areas', 'resource allocation across businesses'], ['divest any business or acquire new ones', 'building and managing the portfolio']],
      'Corporate level', 'Strategies that span the individual businesses: the Study Material\'s Adani Group example of the corporate level.', 'Study Material 1.6 (example)'),
    C('level', 'l-ananya', 'The head of Tapri\'s café division', 'The head of Tapri\'s café division decides how the cafés will compete with BrewBucks in the metros: a new menu, kulhad sizes and prices, and faster service.',
      [['The head of Tapri\'s café division', 'a business (SBU) head'], ['how the cafés will compete', 'how to compete in one business']],
      'Business level', 'How one business competes: business level.'),
    /* ---------------- product life cycle */
    C('plc', 'p-intro', 'A new product\'s first phase', 'A company has recently launched a new product in the market. Initially, it faced slow sales growth, limited markets, and high prices.',
      [['recently launched', 'the start of the life cycle'], ['slow sales growth, limited markets, and high prices', 'the features of the introduction stage']],
      'Introduction', 'Slow sales growth, limited markets and high prices: introduction.', 'RTP September 2024 Q9 (first phase)'),
    C('plc', 'p-growth', 'The same product, later', 'After its launch, over time, the demand for the product expanded rapidly, prices fell, and competition increased.',
      [['demand for the product expanded rapidly', 'rapid market acceptance'], ['prices fell, and competition increased', 'the other features of growth']],
      'Growth', 'Demand expands rapidly, prices fall, competition increases: growth.', 'RTP September 2024 Q9 (second phase)'),
    C('plc', 'p-phone', 'Fixed-line telephones', 'Fixed line telephone instruments have largely been replaced by mobile phones; their sales and profits keep falling year after year.',
      [['largely been replaced by mobile phones', 'a new product replaces the existing one'], ['sales and profits keep falling', 'a downward drift in sales']],
      'Decline', 'Sales and profits fall as a new product replaces the old: decline (the Study Material\'s example).', 'Study Material 2.4 (example)'),
    C('plc', 'p-premix', 'Tapri\'s chai premix today', 'Sales of Tapri\'s chai premix now grow by barely 2% a year. Every big brand has a premix, the market has stabilised, competition is stiff and profit per pack is falling.',
      [['grow by barely 2% a year', 'the growth rate has slowed'], ['the market has stabilised, competition is stiff', 'tough competition in a stable market'], ['profit per pack is falling', 'profits come down because of stiff competition']],
      'Maturity', 'Slowing growth, a stable market and tough competition: maturity.'),
    /* ---------------- SWOT (the Study Material's law firm, and Tapri) */
    C('swot', 's-brand', 'A law firm\'s 70 years', 'A law firm doing its SWOT analysis notes: 70 years of brand value, with services spread across 20 states of India.',
      [['70 years of brand value', 'an attribute of the firm itself, and helpful']],
      'Strength', 'Internal and helpful: a strength (the Study Material\'s law firm).', 'Study Material 3.5 (example)'),
    C('swot', 's-auto', 'A law firm run by old methods', 'The same law firm notes that it is run by old methods, with no automation of work and documentation.',
      [['run by old methods', 'about the firm itself'], ['no automation of work and documentation', 'and it holds the firm back']],
      'Weakness', 'Internal and harmful: a weakness.', 'Study Material 3.5 (example)'),
    C('swot', 's-tech', 'Technology could multiply returns', 'The law firm sees that investment in technology can multiply returns, and that startups could be supported with its experienced partners.',
      [['investment in technology can multiply returns', 'a chance in the environment'], ['startups could be supported', 'an outside demand it could serve']],
      'Opportunity', 'External and helpful: an opportunity.', 'Study Material 3.5 (example)'),
    C('swot', 's-online', 'Online players entering', 'The law firm worries about online players entering the market with AI based solutions and very competitive price points.',
      [['online players entering the market', 'outside the firm'], ['very competitive price points', 'and harmful to it']],
      'Threat', 'External and harmful: a threat.', 'Study Material 3.5 (example)'),
    C('swot', 's-tapri-o', 'Tea in the Gulf', 'Tapri\'s strategy team notes that Indian families in the Gulf countries buy large amounts of ready chai mixes, and no Indian brand leads there yet.',
      [['Indian families in the Gulf countries buy', 'a market outside the firm'], ['no Indian brand leads there yet', 'an opening Tapri could use']],
      'Opportunity', 'External and helpful: an opportunity.'),
    /* ---------------- BCG */
    C('bcg', 'b-coufix', 'SO Pharma\'s Coufix', 'SO Pharma Ltd. developed a new age medicine, "COUFIX", which cures cough in 3 hours, with an investment of INR 80 crores in R&D. Coufix needs a lot of marketing spend to create awareness and funds to get licences from the regulators. Coufix has gained 60% market share within 6 months of launch and been profitable since day 1.',
      [['needs a lot of marketing spend', 'heavy investment needed'], ['gained 60% market share', 'high share'], ['within 6 months of launch', 'a young market growing fast']],
      'Star', 'High share in a fast-growing market, still needing heavy investment: a Star. The Study Material adds that one parameter of market share alone cannot define the status of an SBU.', 'Study Material 4.4.3 (illustration)'),
    C('bcg', 'b-sugar', 'Organic Beverages\' "Say no to Sugar"', 'Organic Beverages developed a sugar free beverage, spending heavily on research and development, marketing and licences. In a span of five months, the company has gained a major share in the market for this new product and it is growing rapidly. To take advantage of the best opportunity for expansion, it has to make heavy investment to maintain its position in current and new markets.',
      [['gained a major share in the market', 'high share'], ['it is growing rapidly', 'high growth'], ['heavy investment to maintain its position', 'Stars need heavy investment']],
      'Star', 'High share, rapid growth, heavy investment, the best opportunity for expansion: a Star (strategy Build, or Hold).', 'PYQ January 2025 Q5(c)'),
    C('bcg', 'b-xyz', 'XYZ Corporation\'s software unit', 'XYZ Corporation is a conglomerate with a leading consumer electronics division, a growing e-commerce platform, a mature industrial machinery division, and a newly established software development unit that is positioned to lead its fast-growing industry. Consider the software development unit.',
      [['newly established software development unit', 'a young business'], ['positioned to lead its fast-growing industry', 'high (potential) share in a high-growth market']],
      'Star', 'High share in a high-growth market: ICAI\'s answer names the software unit the Star.', 'RTP May 2024 Q13'),
    C('bcg', 'b-innov', 'InnovateCo\'s home appliances', 'InnovateCo\'s home appliances unit is in a mature market segment with steady cash flow but low growth potential, generating $500 million annually in profits.',
      [['mature market segment', 'low market growth'], ['steady cash flow', 'it throws off cash'], ['generating $500 million annually in profits', 'a successful, established business']],
      'Cash cow', 'Low growth, a strong established position, steady cash: a Cash cow that funds the growth areas (option (b)).', 'MTP May 2026 Series II Case Scenario MCQ (A)(i)'),
    C('bcg', 'b-ev', 'InnovateCo\'s EV division under BCG', 'InnovateCo\'s electric vehicle division competes in a fast-growing industry, but its current market share is low next to the established EV makers.',
      [['fast-growing industry', 'high market growth'], ['its current market share is low', 'low relative share']],
      'Question mark', 'Low share in a high-growth market: a Question mark under BCG (the same MTP notes ADL rates the division Dominant because of its technological leadership).', 'MTP May 2026 Series II Case Scenario'),
    C('bcg', 'b-scooter', 'EcoRide\'s petrol scooters', 'EcoRide\'s scooters enjoy steady demand from the mass market where it is a leading brand, but the scooter market is growing slowly.',
      [['steady demand from the mass market where it is a leading brand', 'high share, steady cash'], ['growing slowly', 'low growth']],
      'Cash cow', 'High share, low growth: a Cash cow, to be harvested while the e-bikes (a Star) get the investment (option (c)).', 'RTP May 2026 Case Scenario MCQ 1(iv)'),
    C('bcg', 'b-app', 'Tapri\'s delivery app', 'Tapri\'s delivery app holds 4% of a quick-commerce market that grows 38% a year; the leader holds 31% and Tapri burns cash on discounts to keep its share.',
      [['holds 4%', 'low share'], ['the leader holds 31%', 'relative share about 0.13×: low'], ['grows 38% a year', 'high growth'], ['burns cash on discounts to keep its share', 'needs a lot of cash to hold its share']],
      'Question mark', 'Low relative share in a high-growth market: a Question mark (ICAI pairs it with Hold).')
  ];
  const BY = Object.fromEntries(CASES.map(c => [c.id, c]));
  const FIRST = Object.fromEntries(FAM_IDS.map(f => [f, CASES.find(c => c.fam === f).id]));

  /** the clues found in the text, in reading order: [{at, len, phrase, note}]; a phrase that is not in the text is an error (a broken case) */
  function findClues(text, clues) {
    return clues.map(([phrase, note]) => {
      const at = text.indexOf(phrase);
      if (at < 0) throw new Error(`clue not in the text: "${phrase}"`);
      return { at, len: phrase.length, phrase, note };
    }).sort((a, b) => a.at - b.at);
  }
  /** the case text as HTML with the first `upto` clues (in reading order) marked; `now` = the newest one */
  function markText(text, found, upto) {
    let out = '', i = 0;
    found.slice(0, upto).forEach((f, k) => {
      if (f.at < i) return;                                       // overlapping clues: the earlier one wins
      out += esc(text.slice(i, f.at)) + `<mark${k === upto - 1 ? ' class="now"' : ''}>${esc(f.phrase)}</mark>`;
      i = f.at + f.len;
    });
    return out + esc(text.slice(i));
  }
  const card = (c, found, upto, showSrc) => ({ html: `<div class="ex ss-card"><div class="ex-h"><span class="ex-tag">${esc(FAMILIES[c.fam].name)}</span><b>${esc(c.title)}</b></div><div class="ex-b"><p>${markText(c.text, found, upto)}</p>${showSrc && c.src ? `<p><small>Source: ${esc(c.src)}, ICAI</small></p>` : ''}</div></div>` });
  function optTable(fam, answer) {
    const F = FAMILIES[fam], i = F.opts.findIndex(o => o[0] === answer);
    return { type: 'table', title: `${F.name} (${F.sm}): ${F.how}`, head: ['Concept', 'What the Study Material says'], align: ['left', 'left'],
      cells: i >= 0 ? { [i + ',0']: 'ok', [i + ',1']: 'ok' } : {}, rows: F.opts.map(o => [o[0], o[1]]) };
  }

  function compute(v) {
    const c = BY[v.case];
    if (!c) throw new Error('Choose a case from the list.');
    const F = FAMILIES[c.fam];
    if (!F.opts.some(o => o[0] === c.answer)) throw new Error(`The case "${c.title}" has an answer that is not one of the options.`);
    const found = findClues(c.text, c.clues);
    const frames = [{ caption: `Read the case first. The question: **${c.q || F.q}** ${F.how}`, view: [card(c, found, 0, false)] }];
    found.forEach((f, k) => frames.push({ caption: `Clue ${k + 1} of ${found.length}: **"${f.phrase}"**: ${f.note}.`, view: [card(c, found, k + 1, false)] }));
    frames.push({ caption: `The answer: **${c.answer}**. ${c.why}${c.src ? ` Source: ${c.src}, ICAI.` : ''}`, view: [card(c, found, found.length, true), optTable(c.fam, c.answer)] });
    lastFam = FAMILIES[v.fam] ? v.fam : 'all';
    return {
      frames, sim: { case: c, answer: c.answer },
      stats: [{ label: 'Concept', value: F.name, hint: F.sm }, { label: 'Answer', value: c.answer, hint: (F.opts.find(o => o[0] === c.answer) || [])[1], tone: 'ok' },
        { label: 'Clue words', value: String(found.length), hint: 'the phrases that decide it' }, { label: 'Source', value: c.src ? 'ICAI' : 'PassBook', hint: c.src || 'a PassBook case with the Tapri cast' }],
      table: { head: ['Clue in the case', 'What it tells you'], rows: found.map(f => ['"' + f.phrase + '"', f.note]) },
      note: '**Conventions.** Each answer follows ICAI\'s Suggested Answer where the case is ICAI\'s (the source is named), and the Study Material\'s definitions otherwise. ICAI\'s cases are lightly trimmed but keep their facts. A case may show several strategies at once; the question asks for the one its clue words point to.'
    };
  }

  /* the family list and the case list agree: picking a family shows its first case; picking a case of another family switches the family */
  function sync(v) {
    const c = BY[v.case];
    if (v._fam !== v.fam) { if (FAMILIES[v.fam] && (!c || c.fam !== v.fam)) v.case = FIRST[v.fam]; v._fam = v.fam; }
    else if (c && FAMILIES[v.fam] && c.fam !== v.fam) { v.fam = c.fam; v._fam = v.fam; }
    if (!BY[v.case]) v.case = CASES[0].id;
    return true;
  }

  const presets = [
    { label: 'RTP September 2026 Q13 · Elite Motors: which generic strategy?', values: { fam: 'generic', case: 'g-elite' } },
    { label: 'PYQ May 2025 Q5(c) · MaAi\'s product "Nota" in 2023, then in 2024', values: { fam: 'retrench', case: 'r-maai23' } },
    { label: 'PYQ September 2025 MCQ 13 · Green Habitat in Mendelow\'s matrix', values: { fam: 'mendelow', case: 'm-green' } },
    { label: 'RTP September 2026 MCQ 1(ii) · Green Harvest\'s farm-to-table cafés', values: { fam: 'integration', case: 'i-gho' } },
    { label: 'PYQ January 2025 Q5(c) · "Say no to Sugar" in the BCG matrix', values: { fam: 'bcg', case: 'b-sugar' } },
    { label: 'Tapri Express at railway stations', values: { fam: 'generic', case: 'g-express' } },
    { label: 'Tapri grows and prunes at once', values: { fam: 'corporate', case: 'c-tapri-mix' } },
    { label: 'SM Descriptive Q4 · the toothpaste maker', values: { fam: 'ansoff', case: 'a-tooth' } }
  ];
  const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
  const challenge = {
    title: 'Spot the concept',
    gen(r) {
      const pool = FAMILIES[lastFam] ? CASES.filter(c => c.fam === lastFam) : CASES;
      const c = pick(r, pool);
      return { fam: FAMILIES[lastFam] ? lastFam : 'all', _fam: FAMILIES[lastFam] ? lastFam : 'all', case: c.id };
    },
    prompt: (v, res) => res.sim.case.q || FAMILIES[res.sim.case.fam].q,
    solve: res => res.sim.answer,
    kind: 'choice',
    choices: (v, res) => FAMILIES[res.sim.case.fam].opts.map(o => o[0]),
    view: res => [card(res.sim.case, findClues(res.sim.case.text, res.sim.case.clues), 0, false)],
    explain: res => { const c = res.sim.case; return `${findClues(c.text, c.clues).map(f => `"${f.phrase}": ${f.note}`).join('; ')}. So: **${c.answer}**. ${c.why}${c.src ? ` (${c.src}.)` : ''}`; }
  };

  const caseOptions = FAM_IDS.flatMap(f => CASES.filter(c => c.fam === f).map(c => [c.id, c.title + (c.src ? ` (${c.src.replace(/ \(.*\)$/, '')})` : ''), FAMILIES[f].name]));
  const def = {
    id: 'spot-strategy', title: 'Spot the Strategy Lab',
    blurb: 'Watch the clue words in a case light up one by one, then name the strategy, quadrant, level or stage they describe.',
    controls: [
      { id: 'fam', type: 'select', label: 'Concept', value: 'all', options: [['all', 'Any concept']].concat(FAM_IDS.map(f => [f, FAMILIES[f].name])), show: sync },
      { id: 'case', type: 'select', label: 'Case', value: 'g-elite', options: caseOptions, help: 'Cases marked with an ICAI paper are ICAI\'s own (RTPs, MTPs, past papers and the Study Material); the rest use the PassBook cast.' }
    ],
    presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { CASES, FAMILIES, findClues, markText, compute, def, sync };
  g.__lab_def_spot_strategy = def;
})(typeof window !== 'undefined' ? window : globalThis);
