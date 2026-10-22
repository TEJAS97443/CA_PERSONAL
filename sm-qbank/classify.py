#!/usr/bin/env python3
"""Auto-assign new-scheme chapters (1-5 / OUT_OF_SYLLABUS) to old-scheme RTP records.

Mapping oracle = syllabus.json (verified against the current ICAI Paper 6B study
material) + ICAI's own chapter tagging in the 8 new-scheme RTPs.
Produces work/<slug>-classified.json and work/review.tsv for human review.
"""
import json, glob, os, re

WORK = "/Users/ztejas/CA_PERSONAL/sm-qbank/work"

# (regex, chapter, mapping_note, tags)
RULES = [
    # ---------- genuinely dropped topics (syllabus.json: status "dropped", high confidence)
    (r'\bbenchmark', 'OUT_OF_SYLLABUS', 'Benchmarking (old Ch 8.8) — dropped from the 2023 syllabus; no definition, types or process in the current Paper 6B study material', ['benchmarking']),
    (r'business process re\s?-?engineering|\bBPR\b|reengineer', 'OUT_OF_SYLLABUS', 'Business Process Reengineering (old Ch 8.7) — dropped from the 2023 syllabus', ['bpr']),
    (r'strategy audit|strategic audit', 'OUT_OF_SYLLABUS', 'Strategy Audit (old Ch 8.6) — dropped from the 2023 syllabus', ['strategy audit']),
    (r'six sigma|total quality|\bTQM\b', 'OUT_OF_SYLLABUS', 'Six Sigma / TQM — absent from the 2023 syllabus', ['quality']),
    (r'supply chain|\blogistic',
     'OUT_OF_SYLLABUS', 'Logistics Management / Supply Chain Management (old Ch 6.4.3-6.4.4) — dropped with the functional-strategy chapter', ['logistics', 'supply chain']),
    (r'financial strategy', 'OUT_OF_SYLLABUS', 'Financial Strategy (old Ch 6.3) — dropped with the functional-strategy chapter', ['financial strategy']),
    (r'production system|production strateg|operations planning|operations strateg',
     'OUT_OF_SYLLABUS', 'Production/Operations Strategy (old Ch 6.4) — dropped with the functional-strategy chapter', ['production strategy']),
    (r'research and development (strateg|personnel|department)|\bR\s?&\s?D\b\s*(strateg|personnel|approach)|approach(es)? of R\s?&\s?D|strategic decisions in research|research and development are important', 'OUT_OF_SYLLABUS', 'Research and Development Strategy (old Ch 6.5) — dropped with the functional-strategy chapter', ['r&d strategy']),
    (r'marketing mix|publicity|sales promotion|\b4 ?p.?s\b|promote his product|promotional|pricing strategy|personal selling|advertising and|components of marketing strategy|marketing strategy is',
     'OUT_OF_SYLLABUS', 'Marketing Mix / promotion (old Ch 6.2.2) — dropped with the functional-strategy chapter', ['marketing mix']),
    (r'\bintrapreneur|define entrepreneur|an entrepreneur is|characteristics of an entrepreneur|who is an entrepreneur|concept of entrepreneur|searched for business opportunity and starts', 'OUT_OF_SYLLABUS', 'Entrepreneurship and Intrapreneurship (old Ch 7.5) — dropped from the 2023 syllabus', ['entrepreneur']),
    (r'human resource (strateg|manager)|strategic human resource|employee.{0,3}s competence|factors of human resource',
     'OUT_OF_SYLLABUS', 'Human Resource Strategy / SHRM (old Ch 6.6) — dropped with the functional-strategy chapter', ['hr strategy']),
    (r'service marketing|services marketing|social marketing|augmented marketing|synchro|demarketing|'
     r'person marketing|place marketing|organization marketing|concentrated marketing|differential marketing|'
     r'relationship marketing|direct marketing',
     3, 'Strategic Marketing Techniques → Ch 3 (relocated verbatim into Ch 3.3.3 Strategic Drivers: Product/Services)', ['marketing techniques']),

    # ---------- Chapter 5
    (r'premise control|implementation control|strategic surveillance|special alert|operational control|'
     r'strategic control|types of control', 5, "Strategic control types → Ch 5 (Strategic Control)", ['strategic control']),
    (r'kurt lewin|unfreez|refreez|change process|strategic change|initiate the change|change, adapt and survive',
     5, 'Strategic change / Kurt Lewin change process → Ch 5 (Strategic Change)', ['strategic change']),
    (r'mckinsey|\b7\s?s\b', 5, 'McKinsey 7S framework → Ch 5', ['7s framework']),
    (r'matrix structure|network structure|hourglass|divisional structure|functional structure|simple structure|'
     r'organisational structure|organizational structure|organisation structure|organization structure|'
     r'strategic business unit|\bSBU\b', 5, 'Organisation structure types → Ch 5 (Organisation Structure (hard))', ['organisation structure']),
    (r'corporate culture|organisational culture|organizational culture|culture', 5, 'Organisational culture → Ch 5 (Culture (soft))', ['culture']),
    (r'transformational|transactional|leadership role|strategic leadership|leadership style|role to be played by him in execution|leadership in (the )?execution', 5, 'Strategic leadership → Ch 5', ['strategic leadership']),
    (r'forward linkage|backward linkage|linkage', 5, 'Linkages between strategy formulation and implementation → Ch 5', ['linkages']),
    (r'strategy formulation and implementation|formulation vs|strategy.execution|strategy execution|'
     r'implementing all strategic plans|issues in strategy implementation|strategy implementation',
     5, 'Strategy formulation vs implementation / issues in implementation → Ch 5', ['strategy implementation']),
    (r'strategic planning|operational planning|strategic management process|stages in strategic|'
     r'model explain strategic|strategic planner', 5, 'Strategic management process / strategic planning → Ch 5 (5.2)', ['strategic management process']),
    (r'strategic performance measure|performance measure', 5, 'Strategic performance measures → Ch 5', ['performance measures']),
    (r'strategic uncertaint', 5, 'Managing strategic uncertainty → Ch 5', ['strategic uncertainty']),
    (r'strategic decision making|strategic manager|tasks are performed|dimensions of the decision|'
     r'strategic decisions differ', 5, 'Strategic decision making / tasks of a strategic manager → Ch 5', ['strategic decision making']),

    # ---------- Chapter 4
    (r'\bBCG\b|growth-share|growth share|stars|question marks|cash cows|\bdogs\b', 4, 'BCG growth-share matrix → Ch 4 (Strategic Options)', ['bcg matrix']),
    (r'\bADL\b', 4, 'ADL matrix → Ch 4 (Strategic Options)', ['adl matrix']),
    (r'ansoff', 4, "Ansoff's product-market growth matrix → Ch 4 (Strategic Options)", ['ansoff matrix']),
    (r'\bGE matrix|general electric|stop.light|portfolio analysis|corporate portfolio', 4, 'Portfolio analysis / GE matrix → Ch 4', ['portfolio analysis']),
    (r'merger|acquisition|takeover', 4, 'Mergers and acquisitions → Ch 4 (External growth strategies)', ['mergers', 'acquisitions']),
    (r'strategic alliance|joint venture', 4, 'Strategic alliance → Ch 4 (External growth strategies)', ['strategic alliance']),
    (r'turnaround', 4, 'Turnaround strategy → Ch 4 (Strategic Exits)', ['turnaround']),
    (r'divest|liquidation', 4, 'Divestment / liquidation → Ch 4 (Strategic Exits)', ['divestment']),
    (r'stability strategy', 4, 'Stability strategy → Ch 4', ['stability strategy']),
    (r'retrenchment', 4, 'Retrenchment strategy → Ch 4', ['retrenchment']),
    (r'diversificat|concentric|conglomerate|vertical integrat|horizontal integrat|forward integrat|'
     r'backward integrat|integrated diversif', 4, 'Diversification / integration → Ch 4 (Expansion through diversification)', ['diversification']),
    (r'expansion|intensification|market penetration|market development|product development|combination strateg',
     4, 'Corporate-level expansion / combination strategies → Ch 4', ['expansion strategy']),
    (r'innovation strateg', 4, 'Innovation as a strategic choice → Ch 4', ['innovation']),

    # ---------- Chapter 3
    (r'generic strateg|cost leadership|differentiation strateg|best.cost|focus(ed)? (cost|differentiation|strateg)|'
     r'niche strateg|basis of differentiation', 3, "Michael Porter's generic strategies → Ch 3 (Competitive Advantage)", ['generic strategies']),
    (r'core competen', 3, 'Core competence → Ch 3 (Role of resources and capabilities)', ['core competence']),
    (r'\bSWOT\b|strengths, weaknesses', 3, 'SWOT analysis → Ch 3 (Combining external and internal analysis)', ['swot analysis']),
    (r'strategic group', 3, 'Strategic group mapping → Ch 3 (Analysing industry and markets)', ['strategic group mapping']),
    (r'mendelow|stakeholder', 3, "Stakeholder analysis / Mendelow's matrix → Ch 3", ['stakeholders']),
    (r'valuable, rare|costly to imitate|non.substitutable|sustainable competitive advantage|'
     r'resources and capabilit|capabilities that are', 3, 'Resources, capabilities and sustainable competitive advantage → Ch 3', ['resources and capabilities']),
    (r'strategic driver|channel analysis', 3, 'Strategic drivers → Ch 3', ['strategic drivers']),

    # ---------- Chapter 2
    (r'five forces|competitive forces|bargaining power|threat of new entrant|substitut|'
     r'barriers (that are )?faced by new entrants|barriers to entry|exit barrier|new entrants',
     2, "Porter's five forces / industry environment analysis → Ch 2", ['five forces']),
    (r'competitive landscape|competitive intelligence', 2, 'Competitive landscape → Ch 2 (Competitive Strategy)', ['competitive landscape']),
    (r'key success factor|\bKSF', 2, 'Key success factors → Ch 2', ['key success factors']),
    (r'experience curve|learning curve', 2, 'Experience curve → Ch 2', ['experience curve']),
    (r'product life cycle|\bPLC\b|life cycle', 2, 'Product life cycle → Ch 2', ['product life cycle']),
    (r'value chain', 2, 'Value chain analysis → Ch 2', ['value chain']),
    (r'\bPESTLE\b|macro environment|micro environment|environmental scanning|business environment|'
     r'globalis|globaliz|internationalis|international environment', 2, 'Macro/external environment analysis (PESTLE) → Ch 2', ['pestle']),
    (r'driving force', 2, 'Driving forces affecting an industry → Ch 2', ['driving forces']),
    (r'market segmentation|market positioning|customer analysis|understanding customers',
     2, 'Understanding customers and markets → Ch 2', ['customer analysis']),
    (r'industry attractiveness|competitor analysis|analyse the industry', 2, 'Industry and competitive analysis → Ch 2', ['industry analysis']),

    # ---------- Chapter 1
    (r'strategic intent', 1, 'Strategic intent → Ch 1', ['strategic intent']),
    (r'\bvision\b|\bmission\b', 1, 'Vision / mission → Ch 1 (Strategic Intent)', ['vision', 'mission']),
    (r"\bobjectives\b|\bgoals\b", 1, 'Objectives and goals → Ch 1 (Strategic Intent)', ['objectives']),
    (r'corporate level manager|business level|functional level|levels of strategy|strategic level|'
     r'organisational hierarchy|organizational hierarchy|three levels', 1, 'Strategic levels in organisations → Ch 1', ['strategic levels']),
    (r'limitations (attached to|of) strategic management|cannot counter all hindrances|'
     r'limitations of strategic management', 1, 'Limitations of strategic management → Ch 1', ['limitations']),
    (r'benefits.{0,30}strategic|importance of strategic management|why.{0,20}strategic management|'
     r'relevan.{0,30}strategic management|strategic management.{0,40}(relevant|survival and growth)',
     1, 'Importance / benefits of strategic management → Ch 1', ['importance of sm']),
    (r'define strategic management|meaning of strateg|what is strategy|concept of strategy|'
     r'partly proactive and partly reactive|proactive|business policy', 1, 'Meaning and nature of strategic management → Ch 1', ['meaning of sm']),
]

OLD_HEAD_DEFAULT = {
    '1': (1, 'Old Ch 1 "Introduction to Strategic Management" → Ch 1'),
    '2': (2, 'Old Ch 2 "Dynamics of Competitive Strategy" → Ch 2 (external analysis)'),
    '3': (5, 'Old Ch 3 "Strategic Management Process" → Ch 5 (5.2 Strategic Management Process)'),
    '4': (4, 'Old Ch 4 "Corporate Level Strategies" → Ch 4 (Strategic Choices)'),
    '5': (3, 'Old Ch 5 "Business Level Strategies" → Ch 3 (Competitive Advantage/generic strategies)'),
    '6': ('OUT_OF_SYLLABUS', 'Old Ch 6 "Functional Level Strategies" — the standalone functional-strategy chapter has no counterpart in the 2023 scheme'),
    '7': (5, 'Old Ch 7 "Organisation and Strategic Leadership" → Ch 5'),
    '8': (5, 'Old Ch 8 "Strategy Implementation and Control" → Ch 5'),
}


ANSWER_OOS = [
    (r'benchmark', 3, 'OUT_OF_SYLLABUS', 'Benchmarking (old Ch 8.8) — dropped from the 2023 syllabus', ['benchmarking']),
    (r'strategy audit', 2, 'OUT_OF_SYLLABUS', 'Strategy Audit (old Ch 8.6) — dropped from the 2023 syllabus', ['strategy audit']),
    (r'reengineer', 3, 'OUT_OF_SYLLABUS', 'Business Process Reengineering (old Ch 8.7) — dropped from the 2023 syllabus', ['bpr']),
    (r'functional strateg', 4, 'OUT_OF_SYLLABUS', 'Formulation of functional strategies (old Ch 6) — the standalone functional-strategy treatment has no counterpart in the 2023 scheme', ['functional strategy']),
]


def classify(q):
    text = (q['question'] or '')
    if q.get('options'):
        text += ' ' + ' '.join(o['text'] for o in q['options'])
    ans = q.get('answer') or ''
    for rx, nmin, ch, note, tags in ANSWER_OOS:
        if len(re.findall(rx, ans, re.I)) >= nmin:
            return ch, note, tags, 'answer'
    for rx, ch, note, tags in RULES:
        if re.search(rx, text, re.I):
            return ch, note, tags, 'rule'
    head = q.get('chapter_head') or ''
    m = re.match(r'Chapter (\d+)', head)
    if m and m.group(1) in OLD_HEAD_DEFAULT:
        ch, note = OLD_HEAD_DEFAULT[m.group(1)]
        return ch, note, [], 'oldhead'
    return None, '', [], 'none'


if __name__ == '__main__':
    rows = []
    for f in sorted(glob.glob(f'{WORK}/*-draft.json')):
        slug = os.path.basename(f).replace('-draft.json', '')
        d = json.load(open(f))
        for q in d['questions']:
            ch, note, tags, how = classify(q)
            q['_ch'], q['_note'], q['_tags'], q['_how'] = ch, note, tags, how
            rows.append((slug, q['qno'], (q.get('chapter_head') or q.get('group') or '')[:24],
                         str(ch), how, q['question'].replace('\n', ' / ')))
        json.dump(d, open(f.replace('-draft', '-classified'), 'w'), ensure_ascii=False, indent=1)
    with open(f'{WORK}/review.tsv', 'w') as fh:
        for r in rows:
            fh.write('\t'.join(r[:5]) + '\t' + r[5][:200] + '\n')
    print(len(rows), 'rows ->', f'{WORK}/review.tsv')
