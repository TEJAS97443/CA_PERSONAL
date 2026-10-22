#!/usr/bin/env python3
"""Plan for OLD-scheme Intermediate question documents (old P3 Cost & MA, old P6 Auditing & Assurance,
old P8 FM & Economics for Finance), November 2019 - November 2023.

URLs come from ICAI's listing pages (live, or their Wayback captures where noted in LISTING):
  QPs   P3 post_id=14726, P6 post_id=14752, P8 post_id=14773 (live)
  SAs   P3 post_id=14958, P6 post_id=14970, P8 post_id=14972 (live for Dec 2021+; Wayback 2020/2022 captures
        for Nov 2019 - Jul 2021); group-wise SA compilations https://www.icai.org/post/15963
  RTPs  P3 post_id=14463, P6 post_id=14489, P8 post_id=14493 (live for May 2022+; Wayback 2020-2022 captures)
  MTPs  per-attempt ICAI pages (live) / boslive android API series 10, 12 (Nov 2023)
Candidates per slot are tried in order by fetch_old.py (first that yields a PDF wins).
Run: python3 -I plan_old.py   -> ~/CA_PERSONAL/ca_sources/q/_scratch/plan-old.json
"""
import json
import os

R = 'https://resource.cdn.icai.org/'
B = 'https://boslive.icai.org/mock_test_paper/'
QP_LIST = {'p3': 'https://www.icai.org/post.html?post_id=14726', 'p6': 'https://www.icai.org/post.html?post_id=14752',
           'p8': 'https://www.icai.org/post.html?post_id=14773'}
SA_LIST = {'p3': 'https://www.icai.org/post.html?post_id=14958', 'p6': 'https://www.icai.org/post.html?post_id=14970',
           'p8': 'https://www.icai.org/post.html?post_id=14972'}
SA_WB = {'p3': ('web.archive.org/web/20200925123608/', 'web.archive.org/web/20220523013642/'),
         'p6': ('web.archive.org/web/20200924151430/', 'web.archive.org/web/20220523030312/'),
         'p8': ('web.archive.org/web/20210118073709/', 'web.archive.org/web/20220815003029/')}
RTP_LIST = {'p3': 'https://www.icai.org/post.html?post_id=14463', 'p6': 'https://www.icai.org/post.html?post_id=14489',
            'p8': 'https://www.icai.org/post.html?post_id=14493'}
RTP_WB = {'p3': ('web.archive.org/web/20200925120513/', 'web.archive.org/web/20220523012638/'),
          'p6': ('web.archive.org/web/20200924143347/', 'web.archive.org/web/20220523020923/'),
          'p8': ('web.archive.org/web/20210118081416/', 'web.archive.org/web/20220815012337/')}

QP = {
    'p3': {'nov2023': '77068bos62109-inter-p3.pdf', 'may2023': '73959bos598087-p3-inter.pdf',
           'nov2022': '72078bos58004-inter-p3.pdf', 'may2022': '70464bos230522-inter-p3.pdf',
           'dec2021': '68133bos54558-inter-p3.pdf', 'jul2021': '65497bos52820-inter-p3.pdf',
           'jan2021': '62893bos300121-inter-p3.pdf', 'nov2020': '62118bos061220-qp-inter-p3new.pdf',
           'nov2019': '57429bos46507nov19-p3-inter.pdf'},
    'p6': {'nov2023': '77069bos62115-inter-p6.pdf', 'may2023': '74025bos59882-inter-p6.pdf',
           'nov2022': '72113bos58072-inter-p6.pdf', 'may2022': '70512bos56464-inter-p6.pdf',
           'dec2021': '68246bos54608-inter-p6.pdf', 'jul2021': '65618bos52929inter-p6.pdf',
           'jan2021': '64403bos51631-inter-p6-jan21.pdf', 'nov2020': '64393bos51625inter-p6-nov20.pdf',
           'nov2019': '57549bos46693new.pdf'},
    'p8': {'nov2023': '77208bos62135.pdf', 'may2023': '74073inter-p8190523a.pdf',
           'nov2022': '72138bos-inter181122b.pdf', 'may2022': '70574bos-ip8-may22.pdf',
           'dec2021': '68396bos54742.pdf', 'jul2021': '65774bos53050inter-p8.pdf',
           'jan2021': '64396bos51625inter-p8-jan21.pdf', 'nov2020': '62440bos121220interp8.pdf',
           'nov2019': '57550bos46695.pdf'},
}
SA = {
    'p3': {'nov2023': '79237bos63377-p3.pdf', 'may2023': '75779bos61308-p3.pdf',
           'nov2022': '73256bos559103-inter-p3.pdf', 'may2022': '71482bos57500-p3.pdf',
           'dec2021': '69776bos55738-p3.pdf', 'jul2021': '66989bos54005inter-p3.pdf',
           'jan2021': '64717bos51934-inter-p3.pdf', 'nov2020': '63944bos51397interp3.pdf',
           'nov2019': '58780bos47871p3.pdf'},
    'p6': {'nov2023': '79240bos63377-p6.pdf', 'may2023': '75781bos61308-p6.pdf',
           'nov2022': '73259bos559103-inter-p6.pdf', 'may2022': '71485bos57500-p6.pdf',
           'dec2021': '69779bos55738-p6.pdf', 'jul2021': '66992bos54005inter-p6.pdf',
           'jan2021': '64720bos51934-inter-p6.pdf', 'nov2020': '63947bos51397interp6.pdf',
           'nov2019': '58782bos47871p6.pdf'},
    'p8': {'nov2023': '79242bos63377-p8.pdf', 'may2023': '75783bos61308-p8.pdf',
           'nov2022': '73260bos559103-inter-p8.pdf', 'may2022': '71487bos57500-p8.pdf',
           'dec2021': '69781bos55738-p8.pdf', 'jul2021': '66994bos54005inter-p8.pdf',
           'jan2021': '64722bos51934-inter-p8.pdf', 'nov2020': '63949bos51397interp8.pdf',
           'nov2019': '58799bos47893interp8.pdf'},
}
SA_OLDLIST = {'nov2019': 0, 'nov2020': 1, 'jan2021': 1, 'jul2021': 1}   # which Wayback capture listed it
RTP = {
    'p3': {'nov2019': '56588bos45818p3.pdf', 'may2020': '58000bos47277p3.pdf',
           'nov2020': '61202bos49747-inter-p3new.pdf', 'jul2021': '63686bos51306inter-p3.pdf',
           'dec2021': '66088bos53351inter-p3.pdf', 'may2022': '69589bos55533-p3.pdf',
           'nov2022': '71217bos57230-p3.pdf', 'may2023': '73148bos58999-p3.pdf', 'nov2023': '75568bos61147-p3.pdf'},
    'p6': {'nov2019': '56633bos45853-p6.pdf', 'may2020': '58003bos47277p6.pdf',
           'nov2020': '61170bos49747-inter-p6.pdf', 'jul2021': '63689bos51306inter-p6.pdf',
           'dec2021': '66091bos53351inter-p6.pdf', 'may2022': '69592bos55533-p6.pdf',
           'nov2022': '71220bos57230-p6.pdf', 'may2023': '73151bos58999-p6.pdf', 'nov2023': '75571bos61147-p6.pdf'},
    'p8': {'nov2019': '56635bos45853-p8.pdf', 'may2020': '58004bos47277p8.pdf',
           'nov2020': '61254bos49747-inter-p8-230920.pdf', 'jul2021': '63691bos51306inter-p8.pdf',
           'dec2021': '66093bos53351inter-p8.pdf', 'may2022': '69594bos55533-p8.pdf',
           'nov2022': '71222bos57230-p8.pdf', 'may2023': '73153bos58999-p8.pdf', 'nov2023': '75573bos61147-p8.pdf'},
}
RTP_OLDLIST = {'nov2019': 0, 'may2020': 0, 'nov2020': 0, 'jul2021': 1, 'dec2021': 1}
MTP = {   # (attempt, series): {paper: (question, answer, listing)}
    ('dec2021', 's1'): {'_l': 'https://www.icai.org/post.html?post_id=17796',
                        'p3': ('66918bos53947-inter-p3-q-1.pdf', '66928bos53960a-p3-inter-a.pdf'),
                        'p6': ('67040bos54036-inter-p6q.pdf', '67088bos54072-inter-p6a.pdf'),
                        'p8': ('67195bos54094-inter-p8q.pdf', '67229bos54127-inter-p8a.pdf')},
    ('dec2021', 's2'): {'_l': 'https://www.icai.org/post.html?post_id=17846',
                        'p3': ('67457bos54238-inter-p3q.pdf', '67532bos54266-inter-p3a.pdf'),
                        'p6': ('67581bos54273-inter-p6q.pdf', '67607bos-151121-inter-p6a.pdf'),
                        'p8': ('67637bos54307-inter-p8q.pdf', '67688bos54337-inter-p8a.pdf')},
    ('may2022', 's1'): {'_l': 'https://www.icai.org/post/intermediate-mtp-may2022-sr1',
                        'p3': ('69685bos55657.pdf', '69687bos55661-p3a.pdf'),
                        'p6': ('69731bos55706-p6q.pdf', '69750bos270322interp6a.pdf'),
                        'p8': ('69814bos300322-inter-p8q.pdf', '69888bos55810-interp8a.pdf')},
    ('may2022', 's2'): {'_l': 'https://www.icai.org/post/intermediate-mtp-may2022-sr2',
                        'p3': ('70082bos56025-inter-p3q.pdf', '70108bos220422-p3a.pdf'),
                        'p6': ('70113bos230422-inter-p6q.pdf', '70125bos56083-iner-p6a.pdf'),
                        'p8': ('70155bos56106-inter-p8q.pdf', '70188bos280422-Inter-paper-8a.pdf')},
    ('nov2022', 's1'): {'_l': 'https://www.icai.org/post/intermediate-mtp-nov2022-sr1',
                        'p3': ('71656bos57659-inter-p3q.pdf', '71694bos57679-inter-p3a.pdf'),
                        'p6': ('71720bosinter-p6q.pdf', '71746bos071022-inter-p6a.pdf'),
                        'p8': ('71747bos071022-inter-p8q.pdf', '71755bos57743-inter-p8a.pdf')},
    ('nov2022', 's2'): {'_l': 'https://www.icai.org/post/intermediate-mtp-nov2022-sr2',
                        'p3': ('71824bos57779-inter-p3q.pdf', '71842bos161022-inter-p3a.pdf'),
                        'p6': ('71860bos57825-inter-p6q.pdf', '71870bos57833-inter-p6a.pdf'),
                        'p8': ('71888bos57845-inter-p8q.pdf', '71893bos57851-inter-p8-a.pdf')},
    ('may2023', 's1'): {'_l': 'https://www.icai.org/post/intermediate-mtp-may2023-sr1',
                        'p3': ('73265bos59105-inter-p3q.pdf', '73336bos59152-inter-p3a.pdf'),
                        'p6': ('73370bos59157-inter-p6q.pdf', '73376bos59163-inter-p6a.pdf'),
                        'p8': ('73382bos59169-inter-p8q.pdf', '73400bos59191-inter-p8a.pdf')},
    ('may2023', 's2'): {'_l': 'https://www.icai.org/post/intermediate-mtp-may2023-sr2',
                        'p3': ('73579bos59397-inter-p3q.pdf', '73586bos59409-inter-p3a.pdf'),
                        'p6': ('73626bos59461-inter-p6q.pdf', '73662bos59508-inter-p6a.pdf'),
                        'p8': ('73663bos59508-inter-p8q.pdf', '73686bos59511-inter-p8a.pdf')},
    ('may2020', 's1'): {'_l': 'Wayback CDX of resource.cdn.icai.org (file names *bos44257inter-pN-q/-a*)',
                        'p8': ('55079bos44257inter-p8-q.pdf', '55080bos44257inter-p8-a.pdf')},
}
MTP_BOSLIVE = {   # boslive series ids; paper ids old scheme: P3=16, P6=21, P8=25
    ('nov2023', 's1'): (10, {'p3': ('MTP_10_16_QUESTIONS_1694017726.pdf', 'MTP_10_16_ANSWERS_1694780069.pdf'),
                             'p6': ('MTP_10_21_QUESTIONS_1694433199.pdf', 'MTP_10_21_ANSWERS_1694676341.pdf'),
                             'p8': ('MTP_10_25_QUESTIONS_1695182854.pdf', 'MTP_10_25_ANSWERS_1695182913.pdf')}),
    ('nov2023', 's2'): (12, {'p3': ('MTP_12_16_QUESTIONS_1696416003.pdf', 'MTP_12_16_ANSWERS_1696782053.pdf'),
                             'p6': ('MTP_12_21_QUESTIONS_1696771411.pdf', 'MTP_12_21_ANSWERS_1696997953.pdf'),
                             'p8': ('MTP_12_25_QUESTIONS_1696939932.pdf', 'MTP_12_25_ANSWERS_1697029886.pdf')}),
}
MTP_BOSLIVE_ALT = {   # boslive copies of the May 2023 series (fallback if the resource.cdn copy is unusable)
    ('may2023', 's1'): (6, {'p3': ('MTP_6_16_QUESTIONS_1682676144.pdf', 'MTP_6_16_ANSWERS_1682676144.pdf'),
                            'p6': ('MTP_6_21_QUESTIONS_1682676321.pdf', 'MTP_6_21_ANSWERS_1683187017.pdf'),
                            'p8': ('MTP_6_25_QUESTIONS_1697187667.pdf', 'MTP_6_25_ANSWERS_1697187667.pdf')}),
    ('may2023', 's2'): (3, {'p3': ('MTP_3_16_QUESTIONS_1680847029.pdf', 'MTP_3_16_ANSWERS_1681098469.pdf'),
                            'p6': ('MTP_3_21_QUESTIONS_1681209019.pdf', 'MTP_3_21_ANSWERS_1681446073.pdf'),
                            'p8': ('MTP_3_25_QUESTIONS_1681389372.pdf', 'MTP_3_25_ANSWERS_1681648853.pdf')}),
}
CC = 'https://cacult.com/wp-content/uploads/'
CS = 'https://castudynotes.com/wp-content/uploads/'
MIRROR_SA = {  # cacult.com copies of ICAI per-paper Suggested Answers (ICAI CDN copies 404, no Wayback capture)
    'p3': {'nov2019': CC + '2021/05/1.-nov-19-3.pdf', 'nov2020': CC + '2021/05/1.-nov-20-3.pdf',
           'jan2021': CC + '2021/05/1.-jan-21-3.pdf'},
    'p6': {'nov2019': CC + '2021/05/1.-nov-19-6.pdf', 'nov2020': CC + '2021/05/1.-nov-20-6.pdf',
           'jan2021': CC + '2021/05/1.-jan-21-6.pdf'},
    'p8': {'nov2019': CC + '2021/05/1.-nov-19-8.pdf', 'nov2020': CC + '2021/05/1.-nov-20-8.pdf',
           'jan2021': CC + '2021/05/1.-jan-21-8.pdf'},
}
MIRROR_RTP = {  # cacult.com copies (file numbers on cacult do not follow paper numbers - identified by content)
    'p3': {'may2020': CC + '2021/05/rtp-may-20-2.pdf', 'nov2020': CC + '2021/05/rtp-nov-20-4.pdf',
           'jul2021': CC + '2021/05/rtp-may-21-2.pdf', 'dec2021': CC + '2021/08/3-RTP-NOV-21.pdf'},
    'p6': {'nov2019': CC + '2021/05/rtp-nov-19-6.pdf', 'may2020': CC + '2021/05/rtp-may-20-5.pdf',
           'nov2020': CC + '2021/05/rtp-nov-20-7.pdf', 'jul2021': CC + '2021/05/rtp-may-21-5.pdf',
           'dec2021': CC + '2021/08/6-RTP-NOV-21.pdf'},
    'p8': {'nov2019': CC + '2021/05/rtp-nov-19-8.pdf', 'may2020': CC + '2021/05/rtp-may-20-7.pdf',
           'nov2020': CC + '2021/05/rtp-nov-20-9.pdf', 'jul2021': CC + '2021/05/rtp-may-21-7.pdf',
           'dec2021': CC + '2021/08/8-RTP-NOV-21-1.pdf'},
}
MIRROR_MTP = {  # castudynotes.com copies (adds a diagonal 'www.castudynotes.com' watermark to every page)
    ('nov2019', 's1'): {'p3': ('2021/06/Cost-New-Q-MTP-Inter-Oct19.pdf', '2021/06/Cost-New-A-MTP-Inter-Oct19.pdf'),
                        'p6': ('2022/07/Audit-New-MTP-Inter-Oct-19-Q.pdf', '2022/07/Audit-New-MTP-Inter-Oct-19-A.pdf'),
                        'p8': ('2022/07/FM-Eco-New-MTP-Inter-Oct-19-Q.pdf', '2022/07/FM-Eco-New-MTP-Inter-Oct-19-A.pdf')},
    ('may2020', 's1'): {'p3': ('2021/06/CostingNew-Q-MTP1-May-2020.pdf', '2021/06/CostingNew-A-MTP1-May-2020.pdf'),
                        'p6': ('2022/07/AuditNew-Q-MTP1-May-2020.pdf', '2022/07/AuditNew-A-MTP1-May-2020-Inter.pdf'),
                        'p8': ('2022/07/FM-ECO-New-Q-MTP1-May-2020.pdf', '2022/07/FM-Eco-New-A-MTP1-May-2020.pdf')},
    ('nov2020', 's1'): {'p3': ('2021/06/CostingNew-Q-MTP-Inter-Nov-2020-@canotes_ipcc.pdf',
                               '2021/06/CostingNew-A-MTP-Inter-Nov-2020-@canotes_ipcc.pdf'),
                        'p6': ('2022/07/AuditNew-Q-MTP-Inter-Nov-2020-@canotes_ipcc.pdf',
                               '2022/07/AuditNew-A-MTP-Inter-Nov-2020-@canotes_ipcc.pdf'),
                        'p8': ('2022/07/FM-EcoNew-Q-MTP-Inter-Nov-2020-@canotes_ipcc.pdf', None)},
    ('jul2021', 's1'): {'p3': ('2021/06/CostingNew-Q-MTP-Inter-Mar-2021.pdf', '2021/06/CostingNew-A-MTP-Inter-Mar-2021.pdf'),
                        'p6': ('2022/07/AuditNew-Q-MTP-Inter-Mar-2021.pdf', '2022/07/AuditNew-A-MTP-Inter-Mar-2021.pdf'),
                        'p8': ('2022/07/FM-ECONew-Q-MTP-Inter-Mar-2021.pdf', '2022/07/FM-ECONew-A-MTP-Inter-Mar-2021.pdf')},
    ('jul2021', 's2'): {'p3': ('2021/06/CostingNew-Q-MTP-Inter-Apr-2021.pdf', '2021/06/CostingNew-A-MTP-Inter-Apr-2021.pdf'),
                        'p6': ('2022/07/AuditNew-Q-MTP-Inter-Apr-2021.pdf', '2022/07/AuditNew-A-MTP-Inter-Apr-2021.pdf'),
                        'p8': ('2022/07/FM-EcoNew-Q-MTP-Inter-Apr-2021.pdf', '2022/07/FM-EcoNew-A-MTP-Inter-Apr-2021.pdf')},
    ('dec2021', 's1'): {'p3': ('2021/10/Cost-New-Q-MTP1-Inter-Oct21.pdf', '2021/10/Cost-New-A-MTP1-Inter-Oct21.pdf'),
                        'p6': ('2022/07/Audit-New-Q-MTP1-Inter-Oct21.pdf', '2022/07/Audit-New-A-MTP1-Inter-Oct21.pdf'),
                        'p8': ('2022/07/FM-ECO-Q-MTP1-Inter-Oct21.pdf', '2022/07/FM-ECO-A-MTP1-Inter-Oct21.pdf')},
    ('dec2021', 's2'): {'p3': ('2022/07/Cost-Q-MTP2-Inter-Nov21.pdf', '2022/07/Cost-A-MTP2-Inter-Nov21.pdf'),
                        'p6': ('2022/07/AUDIT-Q-MTP2-Inter-Nov21.pdf', '2022/07/AUDIT-A-MTP2-Inter-Nov21.pdf'),
                        'p8': ('2022/07/FM-ECO-Q-MTP2-Inter-Nov21.pdf', '2022/07/FM-ECO-A-MTP2-Inter-Nov21.pdf')},
    ('may2022', 's1'): {'p3': ('2022/03/Costing-Q-MTP-1-Inter-May22.pdf', '2022/03/Costing-A-MTP-1-Inter-May22.pdf'),
                        'p6': ('2022/03/Audit-Q-MTP-1-Inter-May22.pdf', '2022/03/Audit-A-MTP-1-Inter-May22.pdf'),
                        'p8': ('2022/03/FM-ECO-Q-MTP-1-Inter-May22.pdf', '2022/04/FM-ECO-A-MTP-1-Inter-May22.pdf')},
    ('may2022', 's2'): {'p3': ('2022/04/Costing-Q-MTP-2-Inter-May22.pdf', '2022/04/Costing-A-MTP-2-Inter-May22.pdf'),
                        'p6': ('2022/04/Audit-Q-MTP-2-Inter-May22.pdf', '2022/04/Audit-A-MTP-2-Inter-May22.pdf'),
                        'p8': ('2022/04/FM-ECO-Q-MTP-2-Inter-May22.pdf', '2022/04/FM-ECO-A-MTP-2-Inter-May22.pdf')},
}
MIRROR_MTP_PAGES = {('nov2019', 's1'): 'https://castudynotes.com/2022/07/04/ca-inter-paper-6-audit-assurance-mock-test-papers-mtp-compilation-from-may18-to-may22-at-one-place-in-pdf/ (and the paper 3 / paper 8 compilation posts)',
                    ('dec2021', 's1'): 'https://castudynotes.com/2021/10/05/ca-inter-ipcc-oct-2021-mock-test-papers-mtps-for-new-old-syllabus-in-pdf-at-one-place/',
                    ('dec2021', 's2'): 'https://castudynotes.com/2022/07/03/ca-inter-nov-2021-mock-test-papers-mtps-series-ii-for-new-syllabus-in-pdf-at-one-place/',
                    ('may2022', 's1'): 'https://castudynotes.com/2022/03/14/ca-inter-may-2022-mock-test-papers-mtps-series-i-in-pdf-at-one-place/',
                    ('may2022', 's2'): 'https://castudynotes.com/2022/04/18/ca-inter-may-2022-mock-test-papers-mtps-series-ii-in-pdf-at-one-place/'}
GROUP_SA_JUL2021 = {'p3': R + '67078bos54071-inter-gp1.pdf', 'p6': R + '67079bos54071-inter-gp2.pdf',
                    'p8': R + '67079bos54071-inter-gp2.pdf'}


def main():
    plan = []

    def add(paper, kind, att, part, cands, listing, series=None, notes='', mirrors=None):
        name = f'{kind}-{att}' + (f'-{series}' if series else '') + f'-{part}'
        for e in plan:
            if e['dest'] == f'old/{paper}/{name}.pdf':
                e['candidates'] += cands
                e['mirrors'] = (e.get('mirrors') or []) + (mirrors or [])
                return
        plan.append({'scheme': 'old', 'paper': paper, 'kind': kind, 'attempt': att, 'series': series, 'part': part,
                     'dest': f'old/{paper}/{name}.pdf', 'candidates': cands, 'listing': listing, 'notes': notes,
                     'mirrors': mirrors or []})

    for p in ('p3', 'p6', 'p8'):
        for att, fn in QP[p].items():
            add(p, 'pyq', att, 'q', [R + fn], QP_LIST[p])
        for att, fn in SA[p].items():
            if att in SA_OLDLIST:
                lst = 'https://' + SA_WB[p][SA_OLDLIST[att]] + SA_LIST[p].replace('https://', '')
            else:
                lst = SA_LIST[p]
            c = [R + fn]
            if att == 'jul2021':
                c.append(GROUP_SA_JUL2021[p])
            mir = [{'url': MIRROR_SA[p][att], 'site': 'cacult.com',
                    'page': 'https://cacult.com/past-year-questions-icai-suggested-answers-ca-intermediate/'}] \
                if att in MIRROR_SA[p] else []
            add(p, 'pyq', att, 'a', c, lst, mirrors=mir)
        for att, fn in RTP[p].items():
            if att in RTP_OLDLIST:
                lst = 'https://' + RTP_WB[p][RTP_OLDLIST[att]] + RTP_LIST[p].replace('https://', '')
            else:
                lst = RTP_LIST[p]
            mir = [{'url': MIRROR_RTP[p][att], 'site': 'cacult.com',
                    'page': 'https://cacult.com/rtps-ca-intermediate-course/'}] if att in MIRROR_RTP[p] else []
            add(p, 'rtp', att, 'qa', [R + fn], lst, mirrors=mir)
        for (att, ser), d in MTP.items():
            if p not in d:
                continue
            q, a = d[p]
            altq, alta = [], []
            if (att, ser) in MTP_BOSLIVE_ALT:
                sid, dd = MTP_BOSLIVE_ALT[(att, ser)]
                altq, alta = [B + dd[p][0]], [B + dd[p][1]]
            add(p, 'mtp', att, 'q', [R + q] + altq, d['_l'], ser)
            add(p, 'mtp', att, 'a', [R + a] + alta, d['_l'], ser)
        for (att, ser), (sid, d) in MTP_BOSLIVE.items():
            lst = f'https://boslive.icai.org/androidapi/mock_test_paper_details.php?id={sid}'
            add(p, 'mtp', att, 'q', [B + d[p][0]], lst, ser)
            add(p, 'mtp', att, 'a', [B + d[p][1]], lst, ser)
        for (att, ser), d in MIRROR_MTP.items():
            q, a = d[p]
            pg = MIRROR_MTP_PAGES.get((att, ser), {'p3': 'https://castudynotes.com/2021/06/13/ca-inter-paper-3-costing-mock-test-papers-mtp-compilation-from-may18-to-may21-at-one-place-in-pdf/',
                                                    'p6': 'https://castudynotes.com/2022/07/04/ca-inter-paper-6-audit-assurance-mock-test-papers-mtp-compilation-from-may18-to-may22-at-one-place-in-pdf/',
                                                    'p8': 'https://castudynotes.com/2022/07/09/ca-inter-paper-8-fm-eco-mock-test-papers-mtp-compilation-from-may18-to-may22-at-one-place-in-pdf/'}[p])
            for part, fn in (('q', q), ('a', a)):
                mir = [{'url': CS + fn, 'site': 'castudynotes.com', 'page': pg}] if fn else []
                add(p, 'mtp', att, part, [], None, ser, mirrors=mir)
    out = os.path.expanduser('~/CA_PERSONAL/ca_sources/q/_scratch/plan-old.json')
    json.dump(plan, open(out, 'w'), indent=1)
    print(len(plan), 'entries ->', out)


if __name__ == '__main__':
    main()
