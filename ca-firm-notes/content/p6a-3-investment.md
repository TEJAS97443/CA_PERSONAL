## Unit 3 — Capital Investment and Dividend Decisions

Capital investment decisions commit large sums, are largely irreversible, and bind the firm for years,
so the **objective** is to accept only projects returning more than the capital funding them costs,
and to rank projects when funds are short. Two rules govern everything here: work with **incremental
cash flows after tax**, never accounting profit, and ignore sunk costs while including opportunity
costs. Depreciation enters only through its **tax saving**, not being a cash outflow.

:::formula Payback, discounted payback and Accounting Rate of Return
@formula: Payback period = Years fully recovered + (Unrecovered cost / Cash flow of next year)
Discounted payback = the same, on cash flows already discounted at the cost of capital
ARR = (Average annual accounting profit after tax / Investment) x 100
Average investment = (Initial outlay + Salvage value) / 2
@terms: Accounting profit = cash flow − depreciation. With even flows, payback = Outlay / Annual inflow.
@watch: Payback uses **cash flows**, ARR uses **profit after depreciation** — mixing the two is the
commonest error in this unit. Payback ignores everything after the cut-off and ignores the time value
of money; discounted payback fixes the second defect, not the first.
:::

> **Verify:** the ARR denominator is a genuine split — some editions divide by **average** investment,
> others by **initial** investment, and the answers differ by a factor of two. Average investment is
> more commonly expected in ICAI solutions. State your base, and confirm it for your attempt.

:::formula Net Present Value and Profitability Index
@formula: NPV = Sum of [ Cash inflow of year t / (1 + k)^t ] - Initial outlay
PI (Benefit-Cost Ratio) = PV of future cash inflows / Initial outlay
@terms: k = cost of capital. PI = 1 + (NPV / Initial outlay).
@watch: Accept if NPV is positive. PI and NPV always agree on accept-or-reject, PI exceeding 1 exactly
when NPV exceeds 0 — but they can **disagree on ranking**, NPV measuring rupees created and PI rupees
created per rupee invested.
:::

**Strengths of NPV**: uses all cash flows, discounts them properly, is in absolute rupees and so is
additive across projects, and uses the cost of capital directly. **Limitations**: needs an estimate of
the cost of capital; is unintuitive to non-finance managers; ignores the size of the outlay (₹10,000 of
NPV counts the same on a ₹1 lakh project as on a ₹1 crore one); and assumes intermediate flows are
reinvested at the cost of capital.

**The working capital adjustment in NPV** has three rules: the working capital is an **outflow when
committed**, it is **not depreciated**, and it is **recovered as an inflow at the end** of the life,
**untaxed**, because releasing stock and debtors is not income.

> **Verify:** conventions vary. Some questions inject the whole amount at time zero and release it in the
> terminal year; others add increments year by year as sales grow; a few do not recover it at all.
> Follow the question, say so in one line, and check the Study Material for your attempt.

:::formula Internal Rate of Return and Modified IRR
@formula: IRR = the rate at which NPV = 0
By interpolation:  IRR = L + [ NPV at L / (NPV at L - NPV at H) ] x (H - L)
MIRR: Terminal Value = Sum of [ Cash inflow of year t x (1 + k)^(n - t) ]
      MIRR = (Terminal Value / Initial outlay)^(1/n) - 1
@terms: L = lower rate (positive NPV), H = higher rate (negative NPV), n = life, k = reinvestment rate.
@watch: The interpolation denominator is the **difference** between the two NPVs, which becomes a sum in
arithmetic when NPV at H is negative. Interpolation is an **approximation** — a straight line drawn
through a curved NPV profile — so the error shrinks as L and H close in. Bracket the answer within a
few percentage points and call the figure approximate.
:::

:::estimate One project, every appraisal method
@given: Outlay ₹1,00,000 now. After-tax inflows ₹40,000, ₹40,000, ₹30,000, ₹30,000. Life 4 years,
straight-line depreciation, no salvage. Cost of capital 10%. Use the four-figure PV factors exactly as
printed: at 10%, 0.9091, 0.8264, 0.7513, 0.6830; at 15%, 0.8696, 0.7561, 0.6575, 0.5718; at 18%,
0.8475, 0.7182, 0.6086, 0.5158. Round each product to the rupee.
@ask: Compute payback, discounted payback, ARR on both bases, NPV, profitability index, IRR by
interpolation between 15% and 18%, and MIRR.
@work:
```text
Yr  Cash inflow  PV factor   Present    Cumulative   Cumulative     Profit after
        (₹)        @10%      value (₹)   cash (₹)      PV (₹)     depreciation (₹)
 1     40,000     0.9091      36,364      40,000       36,364          15,000
 2     40,000     0.8264      33,056      80,000       69,420          15,000
 3     30,000     0.7513      22,539    1,10,000       91,959           5,000
 4     30,000     0.6830      20,490    1,40,000     1,12,449           5,000
                             --------                                  ------
                            1,12,449                                   40,000
```
Depreciation = 1,00,000/4 = ₹25,000 a year, hence the profit column. Every present value here is the
inflow times the **printed** factor, so the table can be reproduced digit for digit; discounting at an
unrounded 10% would give ₹1,12,451, and a ₹2 difference of that kind is a rounding convention, not an
error — say which you used.

**Payback** — ₹80,000 is recovered by the end of Year 2, leaving ₹20,000 against Year 3's ₹30,000:
2 + 20,000/30,000 = **2.67 years**, i.e. 2 years 8 months.

**Discounted payback** — ₹91,959 recovered by Year 3, leaving ₹8,041 against Year 4's ₹20,490:
3 + 8,041/20,490 = **3.39 years**.

**ARR** — average profit = 40,000/4 = ₹10,000. On initial investment: 10,000/1,00,000 = **10%**. On
average investment of (1,00,000 + 0)/2 = ₹50,000: 10,000/50,000 = **20%**.

**NPV** = 1,12,449 − 1,00,000 = **₹12,449**. **PI** = 1,12,449/1,00,000 = **1.1245** (which is
1 + 12,449/1,00,000, as it must be).

**IRR.** At 15% the present values are 34,784 + 30,244 + 19,725 + 17,154 = ₹1,01,907, so NPV =
**+₹1,907**. At 18% they are 33,900 + 28,728 + 18,258 + 15,474 = ₹96,360, so NPV = **−₹3,640**.
Interpolating:

IRR = 15 + [ 1,907 / (1,907 − (−3,640)) ] x (18 − 15)
    = 15 + (1,907 / 5,547) x 3 = 15 + 0.3438 x 3 = 15 + 1.03 = **16.03%**

The true IRR is 15.9988%, so the interpolation is 0.03 percentage points high — acceptable, and it
would have been worse had the bracket been 10% and 20%.

**MIRR** — compound each inflow forward to Year 4 at 10%: 40,000 x 1.331 = 53,240; 40,000 x 1.21 =
48,400; 30,000 x 1.10 = 33,000; 30,000 x 1 = 30,000. Terminal value = **₹1,64,640**.
MIRR = (1,64,640/1,00,000)^(1/4) − 1 = 1.6464^0.25 − 1 = **13.27%**.
@sanity: Four checks. NPV is positive, so IRR must exceed the 10% cost of capital and PI must exceed 1 —
both hold. Discounted payback (3.39 years) must exceed plain payback (2.67), discounting shrinking every
inflow. ARR on average investment must be exactly twice ARR on initial investment when there is no
salvage — 20% and 10%, so it is. And MIRR (13.27%) must sit **between** the cost of capital and the IRR,
because it replaces reinvestment at 16% with reinvestment at 10%; a MIRR above the IRR means you
compounded at the wrong rate.
:::

**Decision rules, and where they conflict.** Accept if NPV > 0; IRR > cost of capital; PI > 1; payback
within the cut-off; ARR above target. For one conventional project the discounted methods agree. They
diverge on **ranking**, and that is what is tested:

| Conflict | Why it arises | Which to prefer |
|---|---|---|
| NPV against IRR | Different project sizes, or timing patterns; IRR assumes reinvestment at itself | NPV — it maximises absolute wealth |
| NPV against PI | PI favours small, capital-efficient projects | NPV, unless capital is rationed |
| IRR against MIRR | IRR reinvests at IRR, MIRR at the cost of capital | MIRR — the reinvestment assumption is realistic |
| Any of them against payback or ARR | Payback ignores post-cut-off flows; ARR ignores time value | The discounted method |

**Multiple IRRs** arise on non-conventional flows — more than one change of sign, as with a mid-life
overhaul or a terminal restoration cost — and there can be as many IRRs as sign changes. On flows of
−₹1,000, +₹3,000, −₹2,100 the NPV equation is satisfied at **11.27%** and again at **88.73%**, and
neither is "the" return. A decisive argument for NPV or MIRR, which give one answer.

**Capital rationing** ranks projects when capital is limited. Where projects are **divisible**, rank
by profitability index and work down the list. Where they are **indivisible**, PI ranking can fail,
and you must examine feasible combinations:

```text
  Project   Outlay (₹)   NPV (₹)     PI      PI rank
     A        50,000     16,000    1.320        4
     B        40,000     14,000    1.350        1
     C        30,000     10,000    1.333        2
     D        20,000      6,500    1.325        3

  Capital available ₹1,00,000
    Greedy by PI rank:  B + C + D = ₹90,000 outlay, total NPV ₹30,500 (₹10,000 idle)
    Best combination:   A + C + D = ₹1,00,000 outlay, total NPV ₹32,500
```

**Equivalent Annual Cost (EAC)** compares assets of **unequal life** by turning each one's present value
of cost into a level annual charge: EAC = PV of costs / PVAF for that life. Machine X — ₹1,00,000 plus
₹20,000 a year for 3 years at 10%: PV = 1,00,000 + 20,000 x 2.4869 = ₹1,49,738, so EAC =
1,49,738/2.4869 = **₹60,211**. Machine Y — ₹1,50,000 plus ₹15,000 a year for 5 years: PV = 1,50,000 +
15,000 x 3.7908 = ₹2,06,862, so EAC = 2,06,862/3.7908 = **₹54,569**. Choose Y: lower annual cost
despite the larger total PV, because it serves longer.

:::trap Comparing total present values of two assets with different lives
Machine Y above has the higher PV of cost (₹2,06,862 against ₹1,49,738) and is still the better buy.
Comparing raw PVs silently assumes the two assets do the same job for the same period. Convert to an
annual figure — EAC for costs, equivalent annual benefit for inflows — or extend both to a common
horizon. The same warning applies to NPV when lives differ.
:::

### Dividend decisions

A dividend distributes earnings to shareholders, so the decision is really about how much to
**retain** — every rupee paid out is a rupee not reinvested. Keep the four instruments apart:

| | What happens | Effect |
|---|---|---|
| Cash dividend | Cash leaves the company | Reserves and cash fall; number of shares unchanged |
| Stock dividend (bonus issue) | Reserves are capitalised into new fully paid shares | No cash moves; shares rise, reserves fall, EPS and price per share fall proportionately, total wealth unchanged |
| Stock split | The face value of each share is subdivided | Shares rise, capital unchanged, reserves unchanged; price falls proportionately; improves marketability |
| Share buy-back | The company purchases its own shares | Cash and shares both fall; EPS rises on the reduced base; a way of returning surplus cash and signalling confidence |

**Determinants of dividend**: level and stability of earnings; liquidity, since profit is not cash;
access to and cost of external finance; investment opportunities and their return relative to Ke;
shareholders' expectations and the shareholder base; the desire for a stable payout; contractual and
statutory restrictions; signalling; and shareholders' tax position.

:::formula Walter's model and Gordon's model
@formula: Walter:  P = [ D + (r/Ke)(E - D) ] / Ke
Gordon:   P0 = E1 x (1 - b) / (Ke - b x r)        where growth g = b x r
@terms: P = price per share, D = dividend per share, E = earnings per share, r = return on retained
earnings, Ke = cost of equity, b = retention ratio.
@watch: Both models make payout **relevant** and both reach the same conclusion. When r > Ke (growth
firm) price is highest at **zero** payout; when r < Ke (declining firm) at **100%** payout; when
r = Ke payout is irrelevant. Gordon's formula breaks down once b x r reaches Ke, the denominator
turning zero or negative — say so rather than reporting an absurd price.
:::

:::key With E = ₹10, r = 15%, Ke = 12%, Walter gives ₹104.17 at zero payout, ₹91.67 at a ₹6 dividend and ₹83.33 at full payout. Reverse r and Ke and the ordering reverses exactly.
Check the middle figure: [6 + (0.15/0.12)(10 − 6)]/0.12 = 11/0.12 = **₹91.67**. Gordon on the same firm
at b = 40%: g = 6%, P0 = 6/(0.12 − 0.06) = **₹100**; at b = 60%: g = 9%, P0 = 4/0.03 = **₹133.33** —
higher retention, higher price, because r beats Ke. Note that Walter's E is the **current** EPS while
Gordon's E1 is **next year's**; a question giving a single earnings figure means both, as here, and if
it gives E0 and a growth rate, take E1 = E0(1 + g) for Gordon.
:::

**The traditional approach** (Graham and Dodd) also treats dividends as relevant, weighting the dividend
more heavily than retained earnings in the market price. **MM's hypothesis** says the opposite: in a
perfect market with no taxes or transaction costs and a given investment policy, dividend policy is
**irrelevant** — a shareholder wanting cash can sell shares, one who does not can reinvest. Pay a
dividend and the firm must raise the same sum elsewhere, the fall in terminal price exactly offsetting
the dividend.

:::attempt A company has 10,000 shares at ₹100, Ke 10%, expected earnings ₹1,00,000 and planned investment ₹1,50,000. Prove MM's irrelevance by computing the value of the firm when it pays a ₹10 dividend and when it pays nothing.
Use the two MM relations: the year-end price **P1 = P0(1 + Ke) − D1**, and the funds to be raised by
a fresh issue = Investment − (Earnings − Total dividend), so the number of new shares is that amount
divided by P1. Then value the existing shares as

  n x P0 = [ (n + Δn) x P1 − (Investment − Earnings) ] / (1 + Ke)

**Case 1, dividend ₹10 per share.** P1 = 100(1.10) − 10 = ₹100. Dividend paid = ₹1,00,000, so
retained earnings are nil and the whole ₹1,50,000 must be raised: Δn = 1,50,000/100 = 1,500 shares.
n x P0 = [(10,000 + 1,500) x 100 − (1,50,000 − 1,00,000)]/1.10 = (11,50,000 − 50,000)/1.10 =
**₹10,00,000**.

**Case 2, no dividend.** P1 = 100(1.10) − 0 = ₹110. Earnings of ₹1,00,000 are retained, so only
₹50,000 need be raised: Δn = 50,000/110 = 454.55 shares.
n x P0 = [(10,000 + 454.55) x 110 − 50,000]/1.10 = (11,50,000 − 50,000)/1.10 = **₹10,00,000**.

Identical, and the identity is the answer: paying the dividend transferred ₹1,00,000 of value from
the terminal share price into the shareholders' pockets and forced the company to sell 1,500 shares
to strangers instead of 455. Total wealth did not move.

Close by naming the assumptions, where the remaining marks are: perfect capital markets with costless
information, no taxes, no transaction or floatation costs, a fixed investment policy, and certainty of
future earnings. Relax any one — taxes and issue costs especially — and dividend policy becomes
relevant again, which is why Walter and Gordon exist.
:::

:::think A company announces a bonus issue and its share price halves the next day. Have shareholders lost money?
No. A bonus issue capitalises reserves into shares: the share count rises, the price per share falls
proportionately, each holder's total value is unchanged, and no cash has left the company — which is
why a bonus is no substitute for a cash dividend, and why a stock split produces the same price effect
by a different route (face value, not reserves).
:::

```text
UNIT 3 FORMULA SHEET — investment appraisal and dividend models
  k = cost of capital    n = life in years    t = tax rate    PVAF = present value annuity factor

APPRAISAL
  Payback period            = Years fully recovered + (Unrecovered cost / Next year's cash flow)
                            = Initial outlay / Annual inflow      (only if inflows are even)
  Discounted payback        = as above, using discounted cash flows
  ARR                       = (Average annual profit after tax / Investment) x 100
     Average investment     = (Initial outlay + Salvage value) / 2      -- state which base you use
  NPV                       = Sum [ CFt / (1 + k)^t ] - Initial outlay
  Profitability Index       = PV of inflows / Initial outlay = 1 + (NPV / Outlay)
  IRR                       = rate at which NPV = 0
     by interpolation       = L + [ NPV(L) / (NPV(L) - NPV(H)) ] x (H - L)      -- approximate
  MIRR                      = (Terminal Value / Outlay)^(1/n) - 1
     Terminal Value         = Sum [ CFt x (1 + k)^(n - t) ]
  Equivalent Annual Cost    = PV of all costs / PVAF(k, n)
  Annual cash flow          = (Profit before depreciation and tax) x (1 - t) + (Depreciation x t)
  Working capital           = outflow when committed, NOT depreciated, recovered untaxed at the end

  Accept if: NPV > 0 | IRR > k | PI > 1 | payback within cut-off | ARR > target
  On ranking conflicts prefer NPV; prefer PI only when capital is rationed and projects divisible.
  Non-conventional flows (more than one sign change) can give MULTIPLE IRRs - use NPV or MIRR.

DIVIDEND MODELS
  Walter          P  = [ D + (r/Ke)(E - D) ] / Ke
  Gordon          P0 = E1(1 - b) / (Ke - br)          growth g = b x r ; needs br < Ke
     r > Ke -> pay nothing | r < Ke -> pay everything | r = Ke -> payout is irrelevant
  MM              P0 = (D1 + P1) / (1 + Ke)      so  P1 = P0(1 + Ke) - D1
     New funds to raise = Investment - (Earnings - Total dividend)
     New shares  Dn     = New funds / P1
     n x P0 = [ (n + Dn) x P1 - (Investment - Earnings) ] / (1 + Ke)      -- same under any payout
```
