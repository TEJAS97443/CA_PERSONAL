#!/usr/bin/env python3
import json, os, re, sys, subprocess, hashlib, collections
sys.path.insert(0,'/Users/ztejas/CA_PERSONAL/sm-qbank/work/mtp-old')
from build import build
from classify_mtp import classify

RAW='/Users/ztejas/CA_PERSONAL/sm-qbank/raw'
DATA='/Users/ztejas/CA_PERSONAL/sm-qbank/data'
TODAY='2026-10-05'
CSN='https://castudynotes.com/wp-content/uploads'
ICAI='https://resource.cdn.icai.org'
BOS='https://boslive.icai.org/mock_test_paper'

# slug -> (attempt, attempt_sort, series, q_url, a_url, source_is_mirror, notes)
SRC = {
 'may2018-s1': ('May 2018','2018-05','I',
   f'{CSN}/2022/07/Enterprise_Information_Systems_.pdf',
   f'{CSN}/2022/07/Enterprise_Information_Systems_-2.pdf', True,
   'ICAI MTP for the May 2018 attempt (Test Series: March 2018). The ICAI originals are no longer on resource.cdn.icai.org; retrieved from the castudynotes.com mirror of the official ICAI PDFs (https://castudynotes.com/2022/07/04/ca-inter-paper-7-eis-sm-mock-test-papers-mtp-compilation-from-may18-to-may22-at-one-place-in-pdf/). ICAI published only Series I for this attempt.'),
 'nov2018-s1': ('Nov 2018','2018-11','I',
   f'{ICAI}/51720bos41394inter-p7q.pdf', f'{ICAI}/51721bos41394inter-p7a.pdf', False,
   'Official ICAI PDFs (Test Series: August 2018, MOCK TEST PAPER - 1). Link discovered via the vsijaipur.com index of ICAI papers; files downloaded directly from resource.cdn.icai.org.'),
 'nov2018-s2': ('Nov 2018','2018-11','II',
   f'{ICAI}/52183bos41817-interp7-q.pdf', f'{ICAI}/52184bos41817-interp7-a.pdf', False,
   'Official ICAI PDFs (Test Series: October 2018, MOCK TEST PAPER - 2). Link discovered via the vsijaipur.com index of ICAI papers; files downloaded directly from resource.cdn.icai.org.'),
 'may2019-s1': ('May 2019','2019-05','I',
   f'{CSN}/2022/07/EIS-SMNew-Q-MTP-Mar19-CA-Inter.pdf',
   f'{CSN}/2022/07/EIS-SMNew-A-MTP-Mar19-CA-Inter.pdf', True,
   'ICAI MTP Series I for May 2019 (Test Series: March 2019, MOCK TEST PAPER - 1). ICAI originals removed from resource.cdn.icai.org; retrieved from the castudynotes.com mirror. The mirror stamps a diagonal "www.castudynotes.com" watermark over the page; it was removed during extraction by filtering the oversized watermark glyphs, and the resulting text was verified word-for-word against pdftotext output.'),
 'may2019-s2': ('May 2019','2019-05','II',
   f'{CSN}/2022/07/EIS_SMNew-Q-MTP2-Apr-19.pdf',
   f'{CSN}/2022/07/EIS_SMNew-A-MTP2-Apr-19.pdf', True,
   'ICAI MTP Series II for May 2019 (Test Series: April 2019, MOCK TEST PAPER - 2). ICAI originals removed; castudynotes.com mirror. Diagonal mirror watermark removed during extraction. Note: MCQs 1(i) ("Strategy helps in:") and 1(v) ("Mission") have very short stems in the original ICAI paper - that is ICAI\'s own wording, with the substance carried by the four options; it is not an extraction failure.'),
 'nov2019-s1': ('Nov 2019','2019-11','I',
   f'{CSN}/2022/07/EIS-SM-New-MTP-Inter-Oct-19-Q.pdf',
   f'{CSN}/2022/07/EIS-SM-New-MTP-Inter-Oct-19-A.pdf', True,
   'ICAI MTP Series I for Nov 2019 (Test Series: October 2019, MOCK TEST PAPER 1). ICAI originals removed; castudynotes.com mirror. Diagonal mirror watermark removed during extraction. ICAI published only Series I for this attempt.'),
 'may2020-s1': ('May 2020','2020-05','I',
   f'{CSN}/2022/07/EIS-SMNew-Q-MTP1-May-2020.pdf',
   f'{CSN}/2022/07/EIS-SM-New-A-MTP1-May-2020.pdf', True,
   'ICAI MTP Series I for May 2020 (Test Series: May 2020, MOCK TEST PAPER 1) - the May 2020 exam was eventually cancelled but the MTP was published. ICAI originals (55077bos44257inter-p7-q.pdf / 55078bos44257inter-p7-a.pdf) now return 404; castudynotes.com mirror. Diagonal mirror watermark removed during extraction. Only Series I was published.'),
 'nov2020-s1': ('Nov 2020','2020-11','I',
   f'{CSN}/2022/07/EIS-SMNew-Q-MTP-Inter-Nov-2020-@canotes_ipcc.pdf',
   f'{CSN}/2022/07/EIS-SMNew-A-MTP-Inter-Nov-2020-@canotes_ipcc.pdf', True,
   'ICAI MTP for the Nov 2020 attempt (Test Series: October 2020). ICAI originals removed; castudynotes.com mirror. Diagonal mirror watermark removed during extraction. Only one series was published for this attempt.'),
 'july2021-s1': ('July 2021','2021-07','I',
   f'{CSN}/2022/07/EIS-SMNew-Q-MTP-Inter-Mar-2021.pdf',
   f'{CSN}/2022/07/EIS-SMNew-A-MTP-Inter-Mar-2021.pdf', True,
   'ICAI MTP Series I for the May 2021 attempt, which was deferred and held in July 2021 (Test Series: March 2021, MOCK TEST PAPER - 1). ICAI originals removed; castudynotes.com mirror. Diagonal mirror watermark removed during extraction.'),
 'july2021-s2': ('July 2021','2021-07','II',
   f'{CSN}/2022/07/EIS-SMNew-Q-MTP-Inter-Apr-2021.pdf',
   f'{CSN}/2022/07/EIS-SMNew-A-MTP-Inter-Apr-2021.pdf', True,
   'ICAI MTP Series II for the May 2021 attempt, held in July 2021 (Test Series: April 2021, MOCK TEST PAPER-II). ICAI originals removed; castudynotes.com mirror. Diagonal mirror watermark removed during extraction.'),
 'dec2021-s1': ('Dec 2021','2021-12','I',
   f'{CSN}/2022/07/Eis-Sm-Q-MTP1-Inter-Oct21.pdf',
   f'{CSN}/2022/07/Eis-Sm-A-MTP1-Inter-Oct21.pdf', True,
   'ICAI MTP Series I for Dec 2021 (Test Series: October 2021, MOCK TEST PAPER-I). The ICAI originals (resource.cdn.icai.org/67089bos54072-inter-p7q.pdf and /67151bos54085-inter-p7a.pdf, linked from https://www.icai.org/post/mtp-series-i-dec2021caexam) now return 404 and the Wayback Machine holds only the 404 responses; retrieved from the castudynotes.com mirror (https://castudynotes.com/2021/10/05/ca-inter-ipcc-oct-2021-mock-test-papers-mtps-for-new-old-syllabus-in-pdf-at-one-place/).'),
 'dec2021-s2': ('Dec 2021','2021-12','II',
   f'{CSN}/2022/07/EIS-SM-Q-MTP2-Inter-Nov21.pdf',
   f'{CSN}/2022/07/EIS-SM-A-MTP2-Inter-Nov21.pdf', True,
   'ICAI MTP Series II for Dec 2021 (Test Series: November 2021, MOCK TEST PAPER-II). ICAI originals 67640bos54273-inter-p7q.pdf / 67666bos54327-inter-p7a.pdf now 404; retrieved from the castudynotes.com mirror (https://castudynotes.com/2022/07/03/ca-inter-nov-2021-mock-test-papers-mtps-series-ii-for-new-syllabus-in-pdf-at-one-place/).'),
 'may2022-s1': ('May 2022','2022-05','I',
   f'{CSN}/2022/03/EIS-SM-Q-MTP-1-Inter-May22.pdf',
   f'{CSN}/2022/03/EIS-SM-A-MTP-1-Inter-May22.pdf', True,
   'ICAI MTP Series I for May 2022 (Test Series: March 2022, MOCK TEST PAPER-I). ICAI originals 69768bos280322-p7.pdf / 69817bos300322-interp7a.pdf (linked from https://www.icai.org/post/intermediate-mtp-may2022-sr1) now return 404; retrieved from the castudynotes.com mirror (https://castudynotes.com/2022/03/14/ca-inter-may-2022-mock-test-papers-mtps-series-i-in-pdf-at-one-place/).'),
 'may2022-s2': ('May 2022','2022-05','II',
   f'{CSN}/2022/04/EIS-SM-Q-MTP-2-Inter-May22.pdf',
   f'{CSN}/2022/04/EIS-SM-A-MTP-2-Inter-May22.pdf', True,
   'ICAI MTP Series II for May 2022 (Test Series: April 2022, MOCK TEST PAPER-II). ICAI originals 70126bos56083-iner-p7q.pdf / 70191bos56147-inter-p7a.pdf (linked from https://www.icai.org/post/intermediate-mtp-may2022-sr2) now return 404; retrieved from the castudynotes.com mirror (https://castudynotes.com/2022/04/18/ca-inter-may-2022-mock-test-papers-mtps-series-ii-in-pdf-at-one-place/).'),
 'nov2022-s1': ('Nov 2022','2022-11','I',
   f'{ICAI}/71730bos57711-inter-p7q.pdf', f'{ICAI}/71749bos091022-inter-p7a.pdf', False,
   'Official ICAI PDFs (Test Series: September 2022, MOCK TEST PAPER-I), linked from https://www.icai.org/post/intermediate-mtp-nov2022-sr1.'),
 'nov2022-s2': ('Nov 2022','2022-11','II',
   f'{ICAI}/71867bos57833-inter-p7q.pdf', f'{ICAI}/71887bos57845-inter-p7a.pdf', False,
   'Official ICAI PDFs (Test Series: October 2022, MOCK TEST PAPER-II), linked from https://www.icai.org/post/intermediate-mtp-nov2022-sr2.'),
 'may2023-s1': ('May 2023','2023-05','I',
   f'{ICAI}/73377bos59163-inter-p7q.pdf', f'{ICAI}/73392bos59178-inter-p7a.pdf', False,
   'Official ICAI PDFs (Test Series: March 2023, MOCK TEST PAPER-I), linked from https://www.icai.org/post/intermediate-mtp-may2023-sr1. ICAI also serves this series via its BoS app API as MTP_6_22_QUESTIONS_1682676380.pdf / MTP_6_22_ANSWERS_1682676380.pdf, but those copies are image-only scans with no text layer, so the resource.cdn.icai.org copies were used.'),
 'may2023-s2': ('May 2023','2023-05','II',
   f'{ICAI}/73644bos59495-inter-p7q.pdf',
   f'{BOS}/MTP_3_22_ANSWERS_1681648787.pdf', False,
   'Official ICAI PDFs (Test Series: April 2023, MOCK TEST PAPER - II). Question paper from resource.cdn.icai.org (linked from https://www.icai.org/post/intermediate-mtp-may2023-sr2). The suggested-answers copy on resource.cdn.icai.org (73679bos-inter-p7a.pdf, 4.8 MB) is an image-only scan with no text layer; the equivalent official ICAI file served by the BoS app API (https://boslive.icai.org/androidapi/mock_test_paper_details.php?id=3) has a text layer and was used instead. Both files were compared: the SM answer key and text are identical.'),
 'nov2023-s1': ('Nov 2023','2023-11','I',
   f'{BOS}/MTP_10_22_QUESTIONS_1694521144.pdf',
   f'{BOS}/MTP_10_22_ANSWERS_1694763907.pdf', False,
   'Official ICAI PDFs served by the BoS app API (https://boslive.icai.org/androidapi/mock_test_paper_details.php?id=10; Test Series: September 2023, MOCK TEST PAPER 1). The castudynotes.com mirror copies (CA-Inter-EIS-SM-Q-MTP-1-Nov23-castudynotes-com.pdf / P7-EIS-Ans-MTP-1-Nov-23.pdf) were also downloaded and their extracted text is byte-identical to the ICAI files once the mirror banner is stripped.'),
 'nov2023-s2': ('Nov 2023','2023-11','II',
   f'{BOS}/MTP_12_22_QUESTIONS_1696853344.pdf',
   f'{BOS}/MTP_12_22_ANSWERS_1696998020.pdf', False,
   'Official ICAI PDFs served by the BoS app API (https://boslive.icai.org/androidapi/mock_test_paper_details.php?id=12; Test Series: October 2023, MOCK TEST PAPER - 2). The castudynotes.com mirror copies were also downloaded and their extracted text is byte-identical to the ICAI files once the mirror banner is stripped.'),
}

NOT_PUBLISHED = [
 ('May 2018','2018-05','II','ICAI conducted only Series I of the Mock Test Papers for the May 2018 attempt for Intermediate Paper 7.'),
 ('Nov 2019','2019-11','II','ICAI conducted only Series I of the Mock Test Papers for the Nov 2019 attempt for Intermediate Paper 7.'),
 ('May 2020','2020-05','II','ICAI conducted only Series I of the Mock Test Papers for the May 2020 attempt (the exam itself was later cancelled).'),
 ('Nov 2020','2020-11','II','ICAI conducted only one Mock Test Paper series for the Nov 2020 attempt for Intermediate Paper 7.'),
 ('Jan 2021','2021-01','I','No separate Mock Test Paper was published for the Jan 2021 sitting: Jan 2021 was the deferred/second window of the Nov 2020 examination cycle and ICAI reused the Nov 2020 MTP (Test Series: October 2020). See the Nov 2020 Series I entry.'),
 ('Jan 2021','2021-01','II','No separate Mock Test Paper was published for the Jan 2021 sitting (see the Jan 2021 Series I note).'),
]

def hdr(slug, part):
    t=open(f'{RAW}/mtp-old-{slug}-{part}.pdf.txt',encoding='utf-8',errors='replace').read()[:900]
    ts=re.search(r'Test Series:\s*([A-Za-z]+,?\s*\d{4})',t)
    mt=re.search(r'MOCK TEST PAPER\s*[-–]?\s*([0-9IVi]+)',t)
    return (ts.group(1).replace(',','') if ts else None), (mt.group(1) if mt else None)

def md5(p):
    return hashlib.md5(open(p,'rb').read()).hexdigest()

def main():
    ov=json.load(open('/Users/ztejas/CA_PERSONAL/sm-qbank/work/mtp-old/overrides.json'))
    manifest=[]; chap=collections.Counter(); total=0
    for slug,(att,sort,ser,qurl,aurl,mirror,notes) in SRC.items():
        recs=build(slug)
        ts,mt=hdr(slug,'q')
        pid=f'mtp-old-{slug}'
        out={'source':{
            'type':'MTP','attempt':att,'attempt_sort':sort,'series':ser,'scheme':'old',
            'paper':'Paper 7B: Strategic Management',
            'pdf_url':qurl,'answers_url':aurl,
            'local_file':f'raw/mtp-old-{slug}-q.pdf',
            'local_answers_file':f'raw/mtp-old-{slug}-a.pdf',
            'test_series':ts,'mock_test_paper_no':mt,
            'source_is_mirror':mirror,
            'retrieved':TODAY,'extract_ok':True,
            'notes':notes},
            'questions':[]}
        for r in recs:
            if r['id'] in ov:
                c,n,t = ov[r['id']]
            else:
                c,n,t,_ = classify(r.get('_stem',r['question']),r['answer'],r['options'],r['mcq_answer'])
            assert c is not None, r['id']
            chap[c]+=1; total+=1
            out['questions'].append({
                'id':r['id'],'chapter':c,'chapter_source':'mapped','mapping_note':n,
                'qno':r['qno'],'kind':r['kind'],'marks':r['marks'],
                'question':r['question'],'options':r['options'],
                'answer':r['answer'],'mcq_answer':r['mcq_answer'],
                'topic_tags':t[:4]})
        path=f'{DATA}/mtp-old-{slug}.json'
        json.dump(out,open(path,'w'),indent=1,ensure_ascii=False)
        oos=sum(1 for q in out['questions'] if q['chapter']=='OUT_OF_SYLLABUS')
        manifest.append({'attempt':att,'attempt_sort':sort,'series':ser,'type':'MTP','scheme':'old',
            'paper':'Paper 7B: Strategic Management',
            'pdf_url':qurl,'answers_url':aurl,'source_is_mirror':mirror,
            'local_file':f'raw/mtp-old-{slug}-q.pdf',
            'local_answers_file':f'raw/mtp-old-{slug}-a.pdf',
            'data_file':f'data/mtp-old-{slug}.json',
            'test_series':ts,'mock_test_paper_no':mt,
            'status':'extracted','question_count':len(out['questions']),
            'out_of_syllabus_count':oos,
            'md5_question_pdf':md5(f'{RAW}/mtp-old-{slug}-q.pdf'),
            'md5_answers_pdf':md5(f'{RAW}/mtp-old-{slug}-a.pdf'),
            'note':notes})
    for att,sort,ser,note in NOT_PUBLISHED:
        manifest.append({'attempt':att,'attempt_sort':sort,'series':ser,'type':'MTP','scheme':'old',
            'paper':'Paper 7B: Strategic Management','pdf_url':None,'answers_url':None,
            'source_is_mirror':None,'local_file':None,'local_answers_file':None,'data_file':None,
            'test_series':None,'mock_test_paper_no':None,
            'status':'not_published','question_count':0,'out_of_syllabus_count':0,
            'md5_question_pdf':None,'md5_answers_pdf':None,'note':note})
    manifest.sort(key=lambda m:(m['attempt_sort'],m['series']))
    json.dump(manifest,open('/Users/ztejas/CA_PERSONAL/sm-qbank/manifest-mtp-old.json','w'),indent=1,ensure_ascii=False)
    print('files:',len(SRC),'  questions:',total)
    print('per chapter:',dict(sorted(chap.items(),key=lambda x:str(x[0]))))
    print('manifest entries:',len(manifest))

if __name__=='__main__': main()
