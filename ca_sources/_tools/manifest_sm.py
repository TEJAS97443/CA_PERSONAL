# (paper, edition_set, local_name, url, label)
B = 'https://resource.cdn.icai.org/'
J27 = 'jan2027'   # set ICAI lists as "Applicable for May 2026 Examination Onwards" = July 2024 ed., reprint Aug 2025
M27 = 'may2027'   # set ICAI lists as "Applicable for May 2027 Exam Onwards" (NOT for Jan 2027)
ITEMS = [
 # ---- Paper 4 CMA (module page sm_chapter_details.php?p_id=146&m_id=164/165)
 ('p4', J27, 'm1-ip.pdf', B+'87788bos-aps2161-ip-m1.pdf', 'Module 1 Initial Pages'),
 ('p4', J27, 'ch01.pdf', B+'87789bos-aps2161-ch1.pdf', 'Chapter 1: Introduction to Cost and Management Accounting'),
 ('p4', J27, 'ch02.pdf', B+'87790bos-aps2161-ch2.pdf', 'Chapter 2: Material Cost'),
 ('p4', J27, 'ch03.pdf', B+'87791bos-aps2161-ch3.pdf', 'Chapter 3: Employee Cost and Direct Expenses'),
 ('p4', J27, 'ch04.pdf', B+'87792bos-aps2161-ch4.pdf', 'Chapter 4: Overheads - Absorption Costing Method'),
 ('p4', J27, 'ch05.pdf', B+'87793bos-aps2161-ch5.pdf', 'Chapter 5: Activity Based Costing'),
 ('p4', J27, 'ch06.pdf', B+'87794bos-aps2161-ch6.pdf', 'Chapter 6: Cost Sheet'),
 ('p4', J27, 'ch07.pdf', B+'87795bos-aps2161-ch7.pdf', 'Chapter 7: Cost Accounting Systems'),
 ('p4', J27, 'm2-ip.pdf', B+'87796bos-aps2161-ip-m2.pdf', 'Module 2 Initial Pages'),
 ('p4', J27, 'ch08.pdf', B+'87797bos-aps2161-ch8.pdf', 'Chapter 8: Unit & Batch Costing'),
 ('p4', J27, 'ch09.pdf', B+'87798bos-aps2161-ch9.pdf', 'Chapter 9: Job Costing'),
 ('p4', J27, 'ch10.pdf', B+'87799bos-aps2161-ch10.pdf', 'Chapter 10: Process & Operation Costing'),
 ('p4', J27, 'ch11.pdf', B+'87800bos-aps2161-ch11.pdf', 'Chapter 11: Joint Products and By Products'),
 ('p4', J27, 'ch12.pdf', B+'87801bos-aps2161-ch12.pdf', 'Chapter 12: Service Costing'),
 ('p4', J27, 'ch13.pdf', B+'87802bos-aps2161-ch13.pdf', 'Chapter 13: Standard Costing'),
 ('p4', J27, 'ch14.pdf', B+'87803bos-aps2161-ch14.pdf', 'Chapter 14: Marginal Costing'),
 ('p4', J27, 'ch15.pdf', B+'87804bos-aps2161-ch15.pdf', 'Chapter 15: Budgets and Budgetary Control'),
 # ---- Paper 5 Auditing and Ethics (p_id=147, m_id=166/167)
 ('p5', J27, 'm1-ip.pdf', B+'87755bos280825-ip-5.pdf', 'Module 1 Initial Pages'),
 ('p5', J27, 'ch01.pdf', B+'87756bos280825-ch1a.pdf', 'Chapter 1: Nature, Objective and Scope of Audit'),
 ('p5', J27, 'ch02.pdf', B+'87757bos280825-ch2a.pdf', 'Chapter 2: Audit Strategy, Audit Planning and Audit Programme'),
 ('p5', J27, 'ch03.pdf', B+'87758bos280825-ch3a.pdf', 'Chapter 3: Risk Assessment and Internal Control'),
 ('p5', J27, 'ch04.pdf', B+'87759bos280825-ch4a.pdf', 'Chapter 4: Audit Evidence'),
 ('p5', J27, 'ch05.pdf', B+'87760bos280825-ch5a.pdf', 'Chapter 5: Audit of Items of Financial Statements'),
 ('p5', J27, 'm2-ip.pdf', B+'87761bos280528a-im2.pdf', 'Module 2 Initial Pages'),
 ('p5', J27, 'ch06.pdf', B+'87762bos280825-ch6a.pdf', 'Chapter 6: Audit Documentation'),
 ('p5', J27, 'ch07.pdf', B+'87763bos280825-ch7a.pdf', 'Chapter 7: Completion and Review'),
 ('p5', J27, 'ch08.pdf', B+'87764bos280825-ch8a.pdf', 'Chapter 8: Audit Report'),
 ('p5', J27, 'ch09.pdf', B+'87765bos280825-ch9a.pdf', 'Chapter 9: Special Features of Audit of Different Type of Entities'),
 ('p5', J27, 'ch10.pdf', B+'87766bos280825-ch10a.pdf', 'Chapter 10: Audit of Banks'),
 ('p5', J27, 'ch11.pdf', B+'87767bos280825-ch11a.pdf', 'Chapter 11: Ethics and Terms of Audit Engagements'),
 # ---- Paper 6A FM (p_id=151, m_id=177/178; ch9 units sm_unit_details.php?c_id=1221)
 ('p6a', J27, 'm1-ip.pdf', B+'87736bos-28082025-ip.pdf', 'Module 1 Initial Pages'),
 ('p6a', J27, 'ch01.pdf', B+'87737bos280825-ch1.pdf', 'Chapter 1: Scope and Objectives of Financial Management'),
 ('p6a', J27, 'ch02.pdf', B+'87738bos280825-ch2.pdf', 'Chapter 2: Types of Financing'),
 ('p6a', J27, 'ch03.pdf', B+'87739bos280825-ch3.pdf', 'Chapter 3: Financial Analysis and Planning - Ratio Analysis'),
 ('p6a', J27, 'ch04.pdf', B+'87740bos-280825-ch4.pdf', 'Chapter 4: Cost of Capital'),
 ('p6a', J27, 'ch05.pdf', B+'87741bos-280825-ch5.pdf', 'Chapter 5: Financing Decisions - Capital Structure'),
 ('p6a', J27, 'ch06.pdf', B+'87742bos-28082025-ch6.pdf', 'Chapter 6: Financing Decisions - Leverages'),
 ('p6a', J27, 'm1-appendix.pdf', B+'87743bos280825-appdx.pdf', 'Module 1 Appendix'),
 ('p6a', J27, 'm2-ip.pdf', B+'87744bos280825-ipa.pdf', 'Module 2 Initial Pages'),
 ('p6a', J27, 'ch07.pdf', B+'87745bos280825-ch7.pdf', 'Chapter 7: Investment Decisions'),
 ('p6a', J27, 'ch08.pdf', B+'87746bos280825-ch8.pdf', 'Chapter 8: Dividend Decision'),
 ('p6a', J27, 'ch09-u1.pdf', B+'88440bos280825-cp9u1.pdf', 'Chapter 9 Unit I: Introduction to Working Capital Management'),
 ('p6a', J27, 'ch09-u2.pdf', B+'87748bos280825-cp9u2.pdf', 'Chapter 9 Unit II: Treasury and Cash Management'),
 ('p6a', J27, 'ch09-u3.pdf', B+'87749bos280825-cp9u3.pdf', 'Chapter 9 Unit III: Management of Inventory'),
 ('p6a', J27, 'ch09-u4.pdf', B+'87750bos280825-cp9u4.pdf', 'Chapter 9 Unit IV: Management of Receivables'),
 ('p6a', J27, 'ch09-u5.pdf', B+'87751bos280825-cp9u5.pdf', 'Chapter 9 Unit V: Management of Payables (Creditors)'),
 ('p6a', J27, 'ch09-u6.pdf', B+'87752bos280825-cp9u6.pdf', 'Chapter 9 Unit VI: Financing of Working Capital'),
 ('p6a', J27, 'm2-appendix.pdf', B+'87753bos280825-appdx-m2.pdf', 'Module 2 Appendix'),
 # ---- Paper 6B SM (p_id=156, m_id=185)
 ('p6b', J27, 'ip.pdf', B+'88000bos-aps2213-ip.pdf', 'Initial Pages'),
 ('p6b', J27, 'ch01.pdf', B+'87995bos-aps2213-ch1.pdf', 'Chapter 1: Introduction to Strategic Management'),
 ('p6b', J27, 'ch02.pdf', B+'87996bos-aps2213-ch2.pdf', 'Chapter 2: Strategic Analysis: External Environment'),
 ('p6b', J27, 'ch03.pdf', B+'87997bos-aps2213-ch3.pdf', 'Chapter 3: Strategic Analysis: Internal Environment'),
 ('p6b', J27, 'ch04.pdf', B+'87998bos-aps2213-ch4.pdf', 'Chapter 4: Strategic Choices'),
 ('p6b', J27, 'ch05.pdf', B+'87999bos-aps2213-ch5.pdf', 'Chapter 5: Strategy Implementation and Evaluation'),
]
# ---- Newer set "Applicable for May 2027 Exam Onwards" (reference only; P6A not yet listed there)
_m27 = [
 ('p4', 'm1-ip.pdf', '93302bos-aps5870-ip-m1.pdf'), ('p4', 'm2-ip.pdf', '93303bos-aps5870-ip-m2.pdf'),
] + [('p4', 'ch%02d.pdf' % n, '%dbos-aps5870-ch%d.pdf' % (93303 + n, n)) for n in range(1, 16)] + [
 ('p5', 'm1-ip.pdf', '93330bos-aps5884-ip-m1.pdf'), ('p5', 'm2-ip.pdf', '93331bos-aps5884-ip-m2.pdf'),
] + [('p5', 'ch%02d.pdf' % n, '%dbos-aps5884-ch%d.pdf' % (93331 + n, n)) for n in range(1, 12)] + [
 ('p6b', 'ip.pdf', '93343bos-aps5885-ip.pdf'),
] + [('p6b', 'ch%02d.pdf' % n, '%dbos-aps5885-ch%d.pdf' % (93343 + n, n)) for n in range(1, 6)]
for p, n, u in _m27:
    ITEMS.append((p, M27, n, B + u, 'May 2027 set ' + n))
