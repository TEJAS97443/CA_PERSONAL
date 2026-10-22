#!/usr/bin/env python3
"""Apply reviewed chapter overrides + table/figure fixes; emit data/rtp-old-<slug>.json."""
import json, glob, os, re

WORK = "/Users/ztejas/CA_PERSONAL/sm-qbank/work"
DATA = "/Users/ztejas/CA_PERSONAL/sm-qbank/data"
os.makedirs(DATA, exist_ok=True)

OOS = 'OUT_OF_SYLLABUS'
N_LEVELS = 'Strategic levels in organisations (corporate / business / functional) → Ch 1'
N_DECISION = ('Placement in the organisational hierarchy and the nature/dimensions of strategic '
              'decisions → Ch 1 (Strategic Levels in Organisations; nature of strategic management)')
N_NFP = ('Relevance of strategic management to a non-commercial / not-for-profit organisation. The old '
         'standalone topic "Strategic Management in Government and Not-for-profit organisations" was '
         'dropped in 2023, but the content tested here (nature, scope and importance of strategic '
         'management) remains in Ch 1, so mapped to Ch 1 rather than flagged out of syllabus')
N_COSTLEAD = "Michael Porter's generic strategies (cost leadership) → Ch 3 (Competitive Advantage)"
N_BARRIERS = "Barriers to entry / threat of new entrants → Ch 2 (Porter's Five Forces)"
N_PSU = ('Strategic management in Government / Public Sector Units (old Ch 1) — absent from the current '
         'Paper 6B study material (no "public sector", "government agency" or "taxpayer" content in any '
         'of the 5 chapters)')
N_AUDIT = 'Strategy Audit (old Ch 8.6) — dropped from the 2023 syllabus'
N_BPR = 'Business Process Reengineering (old Ch 8.7) — dropped from the 2023 syllabus'
N_UNCERT = ('Strategic uncertainty and how to deal with it → Ch 5 (the current Ch 5 covers "Strategic '
            'uncertainty and how to deal with it", incl. monitoring and scenario planning)')
N_GROUP = 'Strategic group mapping → Ch 3 (Analysing Industry and Markets)'
N_SWOT = 'SWOT analysis → Ch 3 (Combining External and Internal Analysis)'
N_CORE = 'Core competence → Ch 3 (Role of Resources and Capabilities)'
N_DIFF = "Michael Porter's generic strategies (differentiation) → Ch 3 (Competitive Advantage)"
N_TURN = 'Turnaround strategy → Ch 4 (Strategic Exits)'
N_FIVE = "Porter's five forces / industry environment analysis → Ch 2"
N_PLC = 'Product life cycle → Ch 2 (Defining the industry for analysis)'
N_MKTG = ('Strategic marketing techniques → Ch 3 (relocated verbatim from the old functional marketing '
          'chapter into Ch 3.3.3 Strategic Drivers: Product/Services)')
N_LOG = ('Logistics / supply chain management (old Ch 6.4.3-6.4.4) — dropped with the functional-strategy '
         'chapter; absent from the current study material')
N_FUNC = ('Formulation of functional strategies (old Ch 6) — the standalone functional-strategy treatment '
          'has no counterpart in the 2023 scheme')
N_MIX = 'Marketing mix / promotion (old Ch 6.2.2) — dropped with the functional-strategy chapter'
N_IMPL = 'Strategy implementation → Ch 5 (Implementation: linkages and issues)'
N_CTRL = 'Strategic control / strategy evaluation → Ch 5 (Strategic Control)'
N_PORT = 'Portfolio analysis / BCG matrix → Ch 4 (How to develop strategic options)'
N_SUST = 'Sustainability of competitive advantage → Ch 3 (Competitive Advantage)'
N_ENV = 'Influence of the external environment on the organisation → Ch 2 (Strategic Analysis: External Environment)'
N_PROACT = 'Strategy is partly proactive and partly reactive → Ch 1 (Meaning and Nature of Strategic Management)'
N_INTENT = 'Strategic intent — vision, mission, business definition and business model → Ch 1'
N_IMPORT = 'Importance / benefits of strategic management → Ch 1'
N_KSF = 'Key success factors → Ch 2 (Key Factors for Competitive Success)'
N_LAND = 'Competitive landscape → Ch 2 (Competitive Strategy)'
N_CUST = 'Understanding customers and markets → Ch 2'
N_STAB = 'Stability strategy → Ch 4 (corporate strategy alternatives)'
N_INTEG = 'Backward integration → Ch 4 (Expansion through diversification)'
N_BENCH = 'Benchmarking (old Ch 8.8) — dropped from the 2023 syllabus'
N_FIN = ('Financial Strategy (old Ch 6.3) — dropped with the functional-strategy chapter; "financial strategy" occurs 0 times in the current Paper 6B study material')
N_HR = ('Human Resource Strategy / the human resource dimension of strategy implementation (old Ch 6.6) — dropped with the functional-strategy chapter; the ICAI answer content ("disruption of social and political structures", matching individuals\' aptitudes with implementation tasks) is absent from the current Paper 6B study material')

# (slug, qno) -> (chapter, mapping_note, tags)
OV = {
 ('may2018', '1(b)'): (3, N_SWOT, ['swot analysis', 'opportunity']),
 ('may2018', '2(a)'): (1, 'Limitations of strategic management (cost) → Ch 1', ['limitations']),
 ('may2018', '2(c)'): (5, N_UNCERT, ['strategic uncertainty']),
 ('may2018', '3(b)'): (3, N_COSTLEAD, ['cost leadership']),
 ('may2018', '4(a)'): (OOS, N_LOG, ['logistics']),
 ('may2018', '5'):    (1, N_NFP, ['nature of sm', 'not-for-profit']),
 ('may2018', '9'):    (1, N_DECISION, ['strategic levels', 'strategic decisions']),
 ('may2018', '19'):   (OOS, N_AUDIT, ['strategy audit']),

 ('nov2018', '1(e)'): (3, N_COSTLEAD, ['cost leadership']),
 ('nov2018', '2(a)'): (5, 'Control systems run parallel with strategic levels → Ch 5 (Strategic Control)', ['strategic control']),
 ('nov2018', '2(b)'): (3, 'Competitive strategy and competitive advantage → Ch 3 (Gaining competitive advantage)', ['competitive advantage']),
 ('nov2018', '2(c)'): (1, N_INTENT, ['vision', 'mission']),
 ('nov2018', '4(b)'): (3, "Cost leadership vs differentiation → Ch 3 (Michael Porter's generic strategies)", ['cost leadership', 'differentiation']),
 ('nov2018', '13'):   (3, N_DIFF, ['differentiation']),
 ('nov2018', '15'):   (OOS, N_FUNC, ['functional strategy']),
 ('nov2018', '16'):   (OOS, N_MIX, ['pricing strategy']),
 ('nov2018', '19'):   (OOS, N_BENCH, ['benchmarking']),

 ('may2019', '1(i)'):    (1, 'Nature of strategy → Ch 1 (Meaning and Nature of Strategic Management)', ['meaning of strategy']),
 ('may2019', '1(iv)'):   (3, N_GROUP, ['strategic group mapping']),
 ('may2019', '1(vi)'):   (1, 'Nature of strategic decisions → Ch 1', ['strategic decisions']),
 ('may2019', '1(vii)'):  (1, N_LEVELS, ['strategic levels']),
 ('may2019', '1(ix)'):   (3, 'Competitive advantage / distinctive competence → Ch 3', ['competitive advantage']),
 ('may2019', '1(xi)'):   (4, N_PORT, ['bcg matrix']),
 ('may2019', '1(xiii)'): (3, "Michael Porter's generic strategies → Ch 3 (Competitive Advantage)", ['generic strategies']),
 ('may2019', '1(xv)'):   (1, N_LEVELS, ['strategic levels', 'functional strategy']),
 ('may2019', '4'):       (3, N_CORE, ['core competence']),
 ('may2019', '6'):       (1, N_DECISION, ['strategic levels', 'strategic decisions']),
 ('may2019', '10'):      (2, N_BARRIERS, ['barriers to entry']),

 ('nov2019', '1(h)'): (5, N_CTRL, ['strategy evaluation']),
 ('nov2019', '1(j)'): (1, N_LEVELS, ['strategic levels']),
 ('nov2019', '10'):   (3, N_DIFF, ['differentiation']),
 ('nov2019', '11'):   (2, N_FIVE, ['five forces', 'bargaining power of buyers']),

 ('may2020', '1(iii)'): (5, 'Annual objectives are especially important in the implementation phase → Ch 5', ['strategy implementation']),
 ('may2020', '2'):      (1, N_NFP, ['nature of sm', 'not-for-profit']),
 ('may2020', '6'):      (1, N_DECISION, ['strategic levels', 'strategic decisions']),
 ('may2020', '8'):      (4, N_INTEG, ['backward integration', 'diversification']),

 ('nov2020', '1(i)'):  (2, N_LAND, ['competitive landscape']),
 ('nov2020', '1(ii)'): (5, 'Annual objectives are especially important in the implementation stage → Ch 5', ['strategy implementation']),
 ('nov2020', '1(v)'):  (2, N_BARRIERS, ['barriers to entry', 'economies of scale']),
 ('nov2020', '3'):     (2, 'External factors to consider when entering a new market → Ch 2 (external environment)', ['external environment']),
 ('nov2020', '4'):     (5, N_IMPL, ['strategy implementation']),
 ('nov2020', '9'):     (3, N_CORE, ['core competence']),
 ('nov2020', '12'):    (1, N_DECISION, ['strategic decisions', 'strategic levels']),

 ('july2021', '1(i)'):  (1, N_PROACT, ['proactive and reactive strategy']),
 ('july2021', '1(ii)'): (2, N_KSF, ['key success factors']),
 ('july2021', '1(iv)'): (5, N_UNCERT, ['strategic uncertainty', 'scenario planning']),
 ('july2021', '4'):     (2, N_PLC, ['product life cycle']),
 ('july2021', '9'):     (2, N_PLC, ['product life cycle']),
 ('july2021', '15'):    (2, N_FIVE, ['five forces']),

 ('dec2021', '1(i)'):  (2, N_ENV, ['external environment']),
 ('dec2021', '1(iv)'): (3, N_MKTG, ['marketing techniques']),
 ('dec2021', '1(v)'):  (3, N_SUST, ['cost leadership', 'competitive advantage']),
 ('dec2021', '2'):     (1, N_INTENT, ['vision', 'mission']),
 ('dec2021', '3'):     (3, N_SWOT, ['swot analysis', 'threat']),
 ('dec2021', '11'):    (1, 'Nature of strategic decisions vs routine decisions → Ch 1', ['strategic decisions']),
 ('dec2021', '15'):    (2, N_BARRIERS, ['barriers to entry']),

 ('may2022', '1(i)'):   (4, N_STAB, ['stability strategy']),
 ('may2022', '1(iii)'): (3, N_SUST, ['competitive advantage', 'sustainability']),
 ('may2022', '6'):      (2, 'Exit barriers → Ch 2 (industry environment analysis)', ['exit barriers']),
 ('may2022', '8'):      (OOS, N_PSU, ['public sector']),
 ('may2022', '22'):     (OOS, N_BPR, ['bpr']),

 ('nov2022', '1(i)'): (4, N_TURN, ['turnaround']),
 ('nov2022', '1(v)'): (4, 'Requirements for a successful turnaround in the case scenario → Ch 4 (Strategic Exits: Turnaround)', ['turnaround']),
 ('nov2022', '5'):    (1, N_INTENT, ['business model']),
 ('nov2022', '8'):    (OOS, N_PSU, ['public sector']),
 ('nov2022', '21'):   (OOS, N_AUDIT, ['strategy audit']),

 ('may2022', '18'):   (OOS, N_FIN, ['financial strategy']),
 ('nov2022', '17'):   (OOS, N_FIN, ['financial strategy']),
 ('nov2020', '17'):   (OOS, N_MIX, ['promotion mix', 'personal selling']),
 ('nov2023', '18'):   (OOS, N_HR, ['hr strategy']),
 ('may2023', '1(iv)'): (3, N_SWOT, ['swot analysis']),
 ('may2023', '2'):     (4, N_PORT, ['bcg matrix']),
 ('may2023', '5'):     (3, N_GROUP, ['strategic group mapping']),
 ('may2023', '12'):    (1, N_DECISION, ['strategic levels', 'strategic decisions']),
 ('may2023', '15'):    (3, "Best-cost provider strategy → Ch 3 (Michael Porter's generic strategies)", ['best-cost provider']),

 ('nov2023', '1(i)'):  (3, N_DIFF, ['differentiation', 'competitive advantage']),
 ('nov2023', '1(iv)'): (4, 'Strategic alliance → Ch 4 (External growth strategies)', ['strategic alliance']),
 ('nov2023', '4'):     (1, N_PROACT, ['proactive and reactive strategy']),
 ('nov2023', '7'):     (3, N_GROUP, ['strategic group mapping']),
 ('nov2023', '9'):     (1, N_IMPORT, ['importance of sm', 'core competence']),
 ('nov2023', '13'):    (1, N_DECISION, ['strategic decisions', 'strategic levels']),
 ('nov2023', '16'):    (2, N_BARRIERS, ['barriers to entry']),
 ('nov2023', '19'):    (3, N_MKTG, ['marketing techniques', 'social marketing']),
}

# verbatim answers rebuilt where pdftotext scrambled a table / figure
ANSWER_FIX = {
 ('may2022', '11'): (
  "| Strategic planning | Operational planning |\n"
  "|---|---|\n"
  "| Strategic planning shapes the organisation and its resources. | Operational planning deals with current deployment of resources. |\n"
  "| Strategic planning assesses the impact of environmental variables. | Operational planning develops tactics rather than strategy. |\n"
  "| Strategic planning takes a holistic view of the organisation. | Operational planning projects current operations into the future. |\n"
  "| Strategic planning develops overall objectives and strategies. | Operational planning makes modifications to the business functions but not fundamental changes. |\n"
  "| Strategic planning is concerned with the long-term success of the organisation. | Operational planning is concerned with the short-term success of the organisation. |\n"
  "| Strategic planning is a senior management responsibility. | Operational planning is the responsibility of functional managers. |"),
 ('nov2022', '9'): (
  "Following are the differences between the market development and product development:\n"
  "| Market Development | Product Development |\n"
  "|---|---|\n"
  "| Meaning | Meaning |\n"
  "| - It refers to a growth strategy where the business seeks to sell its existing products into new "
  "markets. It is a strategy for company growth by identifying and developing new markets for current "
  "company products. | - It refers to a growth strategy where business aims to introduce new products "
  "into existing markets. It is a strategy for company growth by offering modified or new products to "
  "current markets. |\n"
  "| Strategy Application | Strategy Application |\n"
  "| - It may be achieved through new geographical markets, new product dimensions or packaging, new "
  "distribution channels or different pricing policies to attract different customers or create new "
  "market segments. | - It is for company's growth and requires the development of new competencies and "
  "the business to develop modified products which can appeal to existing markets. |"),
 ('nov2019', '7'): (
  "The strategic management process can best be studied and applied using a model. Identifying an "
  "organization's vision, mission, goals and objectives, is the starting point for strategic management "
  "process. The strategic management process is dynamic and continuous. A change in any one of the major "
  "components in the model can necessitate a change in any or all of the other components. Therefore, "
  "strategy formulation, implementation, and evaluation activities should be performed on a continual "
  "basis, not just at the end of the year or semi-annually.\n"
  "Formulating, implementing, and evaluating strategies are the major components of the strategic "
  "management that are represented in the following model:\n"
  "Figure: Strategic Management Model\n"
  "| | | | |\n"
  "|---|---|---|---|\n"
  "| Environmental Analysis | | | |\n"
  "| Develop Vision, Mission and Objectives | Generate, Analyse and select Strategies | Implement "
  "Strategies | Strategic Evaluation and Control |\n"
  "| Organisation Appraisal | | | |\n"
  "| Analysis | | Implementation | Evaluation |\n"
  "The strategic management process is not as cleanly divided and neatly performed in practice. "
  "Strategists do not go through the process in lockstep fashion. Generally, there is give-and-take among "
  "hierarchical levels of an organization. Many organizations conduct formal meetings semi-annually to "
  "discuss and update the firm's vision/mission, opportunities/threats, strengths/weaknesses, strategies, "
  "objectives, policies, and performance. Creativity from participants is encouraged in meeting. Good "
  "communication and feedback are needed throughout the strategic management process."),
}

TAGWORDS = [
 ('vision', 'vision'), ('mission', 'mission'), ('strategic intent', 'strategic intent'),
 ('objectiv', 'objectives'), ('limitation', 'limitations'), ('benefit', 'importance of sm'),
 ('PESTLE', 'pestle'), ('five forces', 'five forces'), ('substitut', 'substitutes'),
 ('new entrant', 'barriers to entry'), ('experience curve', 'experience curve'),
 ('product life cycle', 'product life cycle'), ('value chain', 'value chain'),
 ('competitive landscape', 'competitive landscape'), ('key success factor', 'key success factors'),
 ('driving force', 'driving forces'), ('core competen', 'core competence'),
 ('SWOT', 'swot analysis'), ('strategic group', 'strategic group mapping'),
 ('stakeholder', 'stakeholders'), ('cost leadership', 'cost leadership'),
 ('differentiation strateg|differentiated|basis of differentiation|leadership and differentiation', 'differentiation'), ('best.cost', 'best-cost provider'),
 ('focus(ed)? (strateg|low|differentiation)|niche', 'focus strategy'), ('BCG', 'bcg matrix'), ('ADL', 'adl matrix'),
 ('Ansoff', 'ansoff matrix'), ('portfolio', 'portfolio analysis'),
 ('merger', 'mergers'), ('acquisition', 'acquisitions'), ('strategic alliance', 'strategic alliance'),
 ('turnaround', 'turnaround'), ('divest', 'divestment'), ('liquidation', 'liquidation'),
 ('stability strategy', 'stability strategy'), ('retrenchment', 'retrenchment'),
 ('diversif', 'diversification'), ('(forward|backward|vertical|horizontal) integrat', 'integration'), ('expansion', 'expansion strategy'),
 ('structure', 'organisation structure'), ('SBU', 'strategic business unit'),
 ('culture', 'culture'),
 ('leadership style|strategic leader|leadership role|transactional', 'strategic leadership'),
 ('transformational', 'transformational leadership'), ('premise control', 'premise control'),
 ('implementation control', 'implementation control'), ('surveillance', 'strategic surveillance'),
 ('operational control', 'operational control'), ('strategic control', 'strategic control'),
 ('benchmark', 'benchmarking'), ('reengineer', 'bpr'), ('strategy audit', 'strategy audit'),
 ('supply chain', 'supply chain'), ('logistic', 'logistics'), ('human resource', 'hr strategy'),
 ('entrepreneur', 'entrepreneur'), ('research and development', 'r&d strategy'),
 ('publicity', 'promotion mix'),
 ('marketing technique|social marketing|augmented|synchro|demarketing|relationship marketing|direct marketing|person marketing|place marketing|services? marketing', 'marketing techniques'),
 ('Kurt Lewin|strategic change|change process|change management|initiate the change|unfreez|refreez', 'strategic change'),
 ('strategic planning', 'strategic planning'), ('implementation', 'strategy implementation'),
 ('formulation', 'strategy formulation'), ('linkage', 'linkages'),
 ('strategic decision', 'strategic decisions'), ('corporate level', 'strategic levels'),
 ('proactive', 'proactive and reactive strategy'), ('reactive', 'proactive and reactive strategy'),
 ('strategic management', 'strategic management'),
]


def tags_for(q, seed):
    out = list(dict.fromkeys(seed))
    text = q['question'] + ' ' + (q['answer'] or '')[:600]
    for pat, tag in TAGWORDS:
        if len(out) >= 4:
            break
        if re.search(pat, text, re.I) and tag not in out:
            out.append(tag)
    if not out:
        out = ['strategic management']
    return out[:4]


if __name__ == '__main__':
    totals = {}
    for f in sorted(glob.glob(f'{WORK}/*-classified.json')):
        slug = os.path.basename(f).replace('-classified.json', '')
        d = json.load(open(f))
        recs = []
        for q in d['questions']:
            ch, note, tg = q['_ch'], q['_note'], list(q['_tags'])
            key = (slug, q['qno'])
            if key in OV:
                ch, note, tg = OV[key]
            if ch is None:
                raise SystemExit(f'unclassified: {key}')
            ans = ANSWER_FIX.get(key, q['answer'])
            qid = 'rtp-old-' + slug + '-q' + re.sub(r'[^0-9a-z]', '', q['qno'].lower())
            recs.append({
                'id': qid,
                'chapter': ch,
                'chapter_source': 'mapped',
                'mapping_note': note,
                'qno': q['qno'],
                'kind': q['kind'],
                'marks': None,
                'question': q['question'],
                'options': q['options'],
                'answer': ans,
                'mcq_answer': q['mcq_answer'],
                'topic_tags': tags_for(q, tg),
            })
            totals[str(ch)] = totals.get(str(ch), 0) + 1
        out = {'source': d['source'], 'questions': recs}
        json.dump(out, open(f'{DATA}/rtp-old-{slug}.json', 'w'), ensure_ascii=False, indent=1)
        print(f'{slug:9s} {len(recs):3d} -> data/rtp-old-{slug}.json')
    print('chapter totals:', dict(sorted(totals.items())))
