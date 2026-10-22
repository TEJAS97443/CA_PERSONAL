#!/usr/bin/env python3
"""Map old-scheme MTP SM questions to the 5 current (2023-scheme) chapters.
Rules encode SPEC §4/§5 judgement, verified against /Users/ztejas/CA_PERSONAL/sm-qbank/syllabus.json.
Ordered: OUT_OF_SYLLABUS rules first (most specific), then chapter rules."""
import re

OOS = 'OUT_OF_SYLLABUS'

# (pattern, chapter, mapping_note, tags)
RULES = [
 # ---------- dropped from the 2023 syllabus ----------
 (r'business process re\s?-?engineering|\bBPR\b', OOS,
  'Business Process Reengineering — dropped from the 2023 syllabus (old Paper 7B Ch 8.7); no counterpart in current Paper 6B',
  ['bpr','reengineering']),
 (r'benchmark', OOS,
  'Benchmarking — dropped from the 2023 syllabus (old Paper 7B Ch 8.8); no counterpart in current Paper 6B',
  ['benchmarking']),
 (r'strategy audit|strategic audit|Rumel', OOS,
  'Strategy audit / Rumelt’s criteria — dropped from the 2023 syllabus (old Paper 7B Ch 8.6)',
  ['strategy audit','rumelt']),
 (r'six sigma', OOS, 'Six Sigma — not in the 2023 syllabus (pre-2017 IPCC topic)', ['six sigma']),
 (r'total quality management|\bTQM\b', OOS,
  'Total Quality Management — not in the 2023 syllabus (pre-2017 IPCC topic)', ['tqm']),
 (r'marketing mix|expanded marketing|\b7\s?P\b|four\s+P\b|\b4\s?Ps\b', OOS,
  'Marketing mix / expanded marketing mix — part of the dropped functional Marketing Strategy (old Ch 6.2)',
  ['marketing mix','functional strategy']),
 (r'publicity|sales promotion|personal selling|promotional method|promotion oriented|pricing strateg', OOS,
  'Promotion / pricing element of the marketing mix — part of the dropped functional Marketing Strategy (old Ch 6.2)',
  ['promotion','marketing mix']),
 (r'logistic|supply chain', OOS,
  'Logistics Management / Supply Chain Management — dropped from the 2023 syllabus (old Ch 6.4.3-6.4.4)',
  ['logistics','supply chain']),
 (r'research and development|\bR\s?&\s?D\b|\bR and D\b', OOS,
  'Research & Development Strategy — dropped from the 2023 syllabus (old Ch 6.5)',
  ['r&d','functional strategy']),
 (r'human resource|employee.{0,4}s?\s+competence|\bSHRM\b|\bHRM\b', OOS,
  'Human Resource Strategy / Strategic HRM — dropped from the 2023 syllabus (old Ch 6.6)',
  ['hr strategy','functional strategy']),
 (r'worth of a business|projected financial statement|financial budget|financial strateg', OOS,
  'Financial Strategy — dropped from the 2023 syllabus (old Ch 6.3)',
  ['financial strategy','functional strategy']),
 (r'intrapreneur|\bentrepreneur\b(?!ial|ship of)', OOS,
  'Entrepreneurship / Intrapreneurship — dropped from the 2023 syllabus (old Ch 7.5)',
  ['entrepreneur','intrapreneur']),
 (r'not[- ]for[- ]profit|non[- ]?profit|government organi[sz]ation|medical organi[sz]ation', OOS,
  'Strategic management in Government and Not-for-profit organisations — dropped from the 2023 syllabus (old Ch 1)',
  ['not-for-profit','government']),
 (r'production strateg|operations planning and control', OOS,
  'Production / Operations Strategy — dropped from the 2023 syllabus (old Ch 6.4)',
  ['production strategy','functional strategy']),
 # ---------- Chapter 5 ----------
 (r'operational control|management control|premise control|implementation control|strategic surveillance|special alert',
  5, 'Strategic control types / operational vs management control → Ch 5', ['strategic control']),
 (r'strategy evaluation|strategic control|evaluation and control', 5,
  'Strategy evaluation and control → Ch 5', ['strategy evaluation']),
 (r'transformational|transactional leadership|leadership style|leadership role|strategic leader', 5,
  'Strategic leadership → Ch 5', ['strategic leadership']),
 (r'corporate culture|organi[sz]ational culture|culture.{0,25}(strength and weakness)|supportive culture|culture is out of sync|new culture',
  5, 'Organisation culture (soft) → Ch 5', ['organisational culture']),
 (r'strategic change|unfreez|Kurt Lewin|change process|initiating strategic change|digital transformation',
  5, 'Strategic change / change management → Ch 5', ['strategic change']),
 (r'organi[sz]ation(al)? structure|functional structure|divisional structure|multi.?divisional|matrix structure|network structure|hourglass|simple structure|strategic business unit|\bSBU\b',
  5, 'Organisation structure (hard) → Ch 5', ['organisation structure']),
 (r'strategy formulation and (strategy )?implementation|formulation vs|strategy implementation|strategy execution|execution process|issues in strategy implementation|interlinked|linkages',
  5, 'Strategy formulation vs implementation / implementation issues → Ch 5', ['strategy implementation']),
 (r'McKinsey|7\s?-?S', 5, 'McKinsey 7S framework → Ch 5', ['mckinsey 7s']),
 (r'strategic planning and operational planning|strategic planning', 5,
  'Strategic planning within the strategic management process → Ch 5', ['strategic planning']),
 (r'strategic management process|stages in strategic management|comprehensive strategic.management model|strategic.management model',
  5, 'Strategic management process / stages → Ch 5', ['strategic management process']),
 (r'strategic performance measure', 5, 'Strategic performance measures → Ch 5', ['performance measures']),
 # ---------- Chapter 4 ----------
 (r'Ansoff', 4, 'Ansoff’s product-market growth matrix → Ch 4', ['ansoff']),
 (r'\bBCG\b|Boston Consulting|cash cow|question mark|\bdogs?\b.{0,30}matrix|growth.share matrix',
  4, 'BCG growth-share matrix → Ch 4', ['bcg matrix']),
 (r'\bGE\b matrix|stop.?light|General Electric matrix|\bADL\b', 4,
  'GE / ADL portfolio matrix → Ch 4', ['ge matrix']),
 (r'turnaround', 4, 'Turnaround strategy → Ch 4 (strategic exits)', ['turnaround']),
 (r'divest|liquidation', 4, 'Divestment / liquidation → Ch 4 (strategic exits)', ['divestment','liquidation']),
 (r'retrenchment', 4, 'Retrenchment strategy → Ch 4', ['retrenchment']),
 (r'merger|acquisition|amalgamat|co.?generic|conglomerate|concentric|horizontal integration|vertical integration|vertically integrated|diversificat',
  4, 'Expansion through diversification / mergers and acquisitions → Ch 4', ['diversification','mergers']),
 (r'strategic alliance|joint venture|collaborat', 4,
  'Expansion through strategic alliance / joint venture → Ch 4', ['strategic alliance']),
 (r'market penetration|market development|product development|intensificat', 4,
  'Expansion through intensification → Ch 4', ['intensification']),
 (r'stability strateg|expansion strateg|growth strateg|combination strateg|corporate (level )?strateg|strategic (choice|alternative|option)|niche strateg|innovation strateg',
  4, 'Corporate-level strategic choices → Ch 4', ['strategic choices']),
 # ---------- Chapter 3 ----------
 (r'cost leadership|differentiation strateg|focus(ed)? (cost|differentiation)|generic strateg|best.cost|competitive advantage',
  3, 'Michael Porter’s generic strategies / competitive advantage → Ch 3', ['generic strategies','competitive advantage']),
 (r'core competen', 3, 'Core competence (resources and capabilities) → Ch 3', ['core competence']),
 (r'SWOT|TOWS|strengths and weaknesses', 3, 'SWOT analysis → Ch 3', ['swot']),
 (r'strategic group', 3, 'Strategic group mapping → Ch 3', ['strategic group mapping']),
 (r'Mendelow|stakeholder', 3, 'Key stakeholders / Mendelow’s matrix → Ch 3', ['stakeholders']),
 (r'social marketing|augmented marketing|relationship marketing|differential marketing|synchro|demarketing|concentrated marketing|direct marketing|person marketing|place marketing|organi[sz]ation marketing',
  3, 'Strategic marketing techniques (retained in Ch 3 ‘Strategic Drivers: Product/Services’)', ['strategic marketing techniques']),
 (r'strategic driver|customer analysis|customer behaviour|channel', 3,
  'Strategic drivers (industry/markets, customers, channels) → Ch 3', ['strategic drivers']),
 # ---------- Chapter 2 ----------
 (r'five forces|Porter.{0,15}(five|model)', 2, 'Porter’s five forces → Ch 2', ['five forces']),
 (r'PESTLE|macro environment|micro environment|environmental scanning|business environment|external (analysis|environment)',
  2, 'Macro/external environment analysis → Ch 2', ['pestle','external environment']),
 (r'product life cycle|\bPLC\b', 2, 'Product life cycle → Ch 2', ['product life cycle']),
 (r'value chain', 2, 'Value chain analysis → Ch 2', ['value chain']),
 (r'experience curve', 2, 'Experience curve → Ch 2', ['experience curve']),
 (r'competitive landscape', 2, 'Competitive landscape → Ch 2', ['competitive landscape']),
 (r'key success factor|\bKSF\b|key factors for competitive success', 2,
  'Key success factors → Ch 2', ['key success factors']),
 (r'driving force', 2, 'Driving forces of industry change → Ch 2', ['driving forces']),
 (r'industry analysis|industry environment|attractiveness of industry|competitor analysis|globali[sz]ation|internationali[sz]ation|industry life cycle',
  2, 'Industry and competitive analysis → Ch 2', ['industry analysis']),
 # ---------- Chapter 1 ----------
 (r'vision|mission', 1, 'Strategic intent — vision and mission → Ch 1', ['vision','mission']),
 (r'objective|goal|strategic intent|values', 1, 'Strategic intent — objectives and goals → Ch 1', ['objectives']),
 (r'level(s)? of strateg|strategic level|corporate level|business level|functional level|network level',
  1, 'Strategic levels in organisations → Ch 1', ['strategic levels']),
 (r'limitation', 1, 'Limitations of strategic management → Ch 1', ['limitations']),
 (r'importance of strategic management|benefits of strategic management|strategic approach to managing|why.{0,20}strategic management',
  1, 'Importance and benefits of strategic management → Ch 1', ['importance']),
 (r'strategic decision|dimensions of strategic|strategic manager|task(s)? (are )?performed',
  1, 'Nature of strategic management — strategic decisions and the strategic manager → Ch 1',
  ['strategic decisions']),
 (r'proactive|reactive', 1, 'Nature of strategy — partly proactive, partly reactive → Ch 1', ['nature of strategy']),
 (r'definition of strateg|define strateg|meaning of strateg|what is strateg|concept of strateg|strategy helps|business policy|define strategic management|what is strategic management',
  1, 'Meaning and nature of strategy / strategic management → Ch 1', ['meaning of strategy']),
]

COMPILED=[(re.compile(p,re.I),c,n,t) for p,c,n,t in RULES]

def classify(stem, answer='', options=None, correct=None):
    opt_all=' | '.join(o['text'] for o in options) if options else ''
    opt_right=''
    if options and correct:
        opt_right=' '.join(o['text'] for o in options if o['label']==correct)
    for text,src in ((stem,'stem'), (opt_right,'correct_option'),
                     (answer[:700],'answer'), (opt_all,'options')):
        if not text: continue
        for rx,c,n,t in COMPILED:
            if rx.search(text): return c,n,t,src
    return None,'','',''
