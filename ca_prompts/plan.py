#!/usr/bin/env python3
"""PassBook job plan: writes jobs.json (writer batches, reviewers, labs, exemplar) from syllabus.txt.

    python3 -I ~/CA_PERSONAL/ca_prompts/plan.py          # (re)write jobs.json, keeping the wave-1 jobs
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))

# writer batches: (job id, [lesson ids or id prefixes])
BATCHES = [
    # Paper 4
    ('w-c01', ['cma.intro.scope', 'cma.intro.install', 'cma.intro.relations', 'cma.intro.terms']),
    ('w-c02', ['cma.intro.classify', 'cma.intro.behaviour', 'cma.intro.control', 'cma.intro.methods']),
    ('w-c03', ['cma.sheet.mfg', 'cma.sheet.quote', 'cma.sheet.service', 'cma.unit.unit', 'cma.unit.batch']),
    ('w-c04', ['cma.mat.procure', 'cma.mat.receipts', 'cma.mat.issues', 'cma.mat.levels']),
    ('w-c05', ['cma.mat.eoq', 'cma.mat.techniques', 'cma.mat.ratios', 'cma.mat.losses']),
    ('w-c06', ['cma.emp.payroll', 'cma.emp.idle', 'cma.emp.turnover', 'cma.emp.incentives', 'cma.emp.direct']),
    ('w-c07', ['cma.oh.classify', 'cma.oh.primary', 'cma.oh.secondary']),
    ('w-c08', ['cma.oh.absorb', 'cma.oh.underover', 'cma.oh.ads', 'cma.job.job']),
    ('w-c09', ['cma.abc.concept', 'cma.abc.compute', 'cma.abc.abm', 'cma.sys.ledgers', 'cma.sys.recon']),
    ('w-c10', ['cma.proc.accounts', 'cma.proc.eu', 'cma.proc.interprocess']),
    ('w-c11', ['cma.joint.apportion', 'cma.joint.further', 'cma.joint.byprod']),
    ('w-c12', ['cma.svc.basics', 'cma.svc.transport', 'cma.svc.others']),
    ('w-c13', ['cma.std.setting', 'cma.std.material', 'cma.std.labour']),
    ('w-c14', ['cma.std.voh', 'cma.std.foh', 'cma.std.recon']),
    ('w-c15', ['cma.mc.basics', 'cma.mc.charts', 'cma.mc.absorb']),
    ('w-c16', ['cma.mc.keyfactor', 'cma.mc.decisions', 'cma.mc.multiproduct']),
    ('w-c17', ['cma.bud.basics', 'cma.bud.functional', 'cma.bud.flexible']),
    ('w-c18', ['cma.bud.cash', 'cma.bud.zbb', 'cma.bud.ratios']),
    # Paper 5
    ('w-a01', ['aud.nature.basics', 'aud.nature.sa200', 'aud.nature.limits']),
    ('w-a17', ['aud.nature.scope', 'aud.nature.relations', 'aud.nature.assurance']),
    ('w-a02', ['aud.plan.sa300', 'aud.plan.program', 'aud.doc.sa230', 'aud.evid.trail']),
    ('w-a03', ['aud.risk.model', 'aud.risk.sa320', 'aud.risk.sa315', 'aud.risk.sa330']),
    ('w-a04', ['aud.risk.ic', 'aud.risk.testing', 'aud.risk.it', 'aud.risk.digital']),
    ('w-a05', ['aud.evid.sa500', 'aud.evid.assertions', 'aud.evid.sa530', 'aud.evid.sa520']),
    ('w-a06', ['aud.evid.sa610', 'aud.evid.ifc', 'aud.evid.sa501', 'aud.evid.sa505']),
    ('w-a07', ['aud.evid.sa510', 'aud.evid.sa550', 'aud.complete.sa560', 'aud.complete.sa570']),
    ('w-a08', ['aud.complete.sa450', 'aud.complete.sa580', 'aud.complete.sa260', 'aud.ethics.sa210']),
    ('w-a09', ['aud.items.revenue', 'aud.items.expenses', 'aud.items.equity', 'aud.items.liabilities']),
    ('w-a10', ['aud.items.ppe', 'aud.items.current', 'aud.items.contingent']),
    ('w-a11', ['aud.report.sa700', 'aud.report.sa701']),
    ('w-a12', ['aud.report.sa706', 'aud.report.sa710', 'aud.report.branch']),
    ('w-a13', ['aud.report.companies', 'aud.report.caro']),
    ('w-a14', ['aud.entities.govt', 'aud.entities.local', 'aud.entities.npo']),
    ('w-a18', ['aud.entities.institutions', 'aud.entities.firms', 'aud.entities.commercial']),
    ('w-a15', ['aud.bank.approach', 'aud.bank.auditor', 'aud.bank.advances', 'aud.bank.revenue']),
    ('w-a16', ['aud.ethics.principles', 'aud.ethics.independence', 'aud.ethics.qc']),
    # Paper 6A
    ('w-f01', ['fm.intro.objectives', 'fm.intro.role', 'fm.intro.agency']),
    ('w-f02', ['fm.sources.long', 'fm.sources.other', 'fm.sources.short', 'fm.sources.modern']),
    ('w-f03', ['fm.ratio.liquidity', 'fm.ratio.activity', 'fm.ratio.profit', 'fm.ratio.prepare']),
    ('w-f04', ['fm.coc.debt', 'fm.coc.equity', 'fm.coc.wacc']),
    ('w-f05', ['fm.cs.theories', 'fm.cs.ebiteps', 'fm.cs.planning', 'fm.lev.leverage']),
    ('w-f06', ['fm.capbud.cashflows', 'fm.capbud.payback', 'fm.capbud.npv']),
    ('w-f07', ['fm.capbud.irr', 'fm.capbud.rationing', 'fm.div.basics', 'fm.div.models']),
    ('w-f08', ['fm.wc.basics', 'fm.wc.estimate', 'fm.wc.receivables']),
    ('w-f09', ['fm.wc.cash', 'fm.wc.inventory', 'fm.wc.payables', 'fm.wc.banking']),
    # Paper 6B
    ('w-s01', ['sm.intro.meaning', 'sm.intro.intent', 'sm.intro.levels', 'sm.ext.pestle']),
    ('w-s02', ['sm.ext.industry', 'sm.ext.porter', 'sm.ext.markets']),
    ('w-s03', ['sm.int.stakeholders', 'sm.int.drivers', 'sm.int.resources', 'sm.int.swot', 'sm.int.generic']),
    ('w-s04', ['sm.choice.growth', 'sm.choice.retrench', 'sm.choice.ansoff', 'sm.choice.portfolio']),
    ('w-s05', ['sm.impl.matrix', 'sm.impl.digital', 'sm.impl.structure', 'sm.impl.leadership', 'sm.impl.control']),
]
EXEMPLARS = ['cma.mc.bep', 'aud.report.sa705']

LABS = [
    ('lab-c1', ['eoq', 'stores-ledger', 'incentives']),
    ('lab-c2', ['oh-distribution', 'abc', 'cost-sheet']),
    ('lab-c3', ['process', 'joint', 'recon']),
    ('lab-c4', ['variance', 'budget']),
    ('lab-c5', ['cvp', 'key-factor']),
    ('lab-a1', ['audit-risk', 'sampling', 'audit-journey']),
    ('lab-a2', ['audit-opinion', 'threats', 'npa']),
    ('lab-f1', ['capbud', 'wacc', 'dividend']),
    ('lab-f2', ['leverage', 'cap-structure', 'working-capital', 'ratios']),
    ('lab-s1', ['bcg-ge', 'ansoff-adl', 'five-forces', 'spot-strategy']),
]


def syllabus_ids():
    ids = []
    with open(os.path.join(HERE, 'syllabus.txt')) as f:
        for line in f:
            m = re.match(r'- ([a-z0-9.]+) \|', line)
            if m:
                ids.append(m.group(1))
    return ids


def main():
    ids = syllabus_ids()
    planned = [i for _, ls in BATCHES for i in ls] + EXEMPLARS
    missing = sorted(set(ids) - set(planned))
    extra = sorted(set(planned) - set(ids))
    dup = sorted({i for i in planned if planned.count(i) > 1})
    assert not missing and not extra and not dup, (missing, extra, dup)
    with open(os.path.join(HERE, 'jobs.json')) as f:
        old = {j['id']: j for j in json.load(f)}
    jobs = [old[k] for k in ('src-sm', 'src-q', 'fork') if k in old]
    jobs.append({'id': 'ex', 'kind': 'writer', 'lessons': EXEMPLARS, 'deps': ['fork', 'src-sm'],
                 'steps': ['start'] + EXEMPLARS + ['report']})
    for jid, ls in BATCHES:
        jobs.append({'id': jid, 'kind': 'writer', 'lessons': ls, 'deps': ['ex'],
                     'steps': ['start'] + ls + ['report']})
    for jid, ls in BATCHES:
        rid = 'r-' + jid[2:]
        jobs.append({'id': rid, 'kind': 'reviewer', 'lessons': ls, 'deps': [jid],
                     'steps': ['start'] + ls + ['report']})
    for jid, labs in LABS:
        jobs.append({'id': jid, 'kind': 'lab', 'labs': labs, 'deps': ['fork', 'src-sm'],
                     'steps': ['start'] + labs + ['report']})
    jobs.append({'id': 'bank-core', 'kind': 'bank', 'deps': ['fork', 'src-q'],
                 'steps': ['start', 'design', 'schema', 'importer', 'pilot', 'ui-bank', 'ui-question', 'ui-lesson', 'ui-paper',
                           'selfgrade', 'sm-import', 'tests', 'docs', 'report']})
    jobs.append({'id': 'kit', 'kind': 'kit', 'deps': [], 'steps': ['start', 'flow-width', 'flow-edges', 'tree-notes', 'labels', 'lint-nesting', 'shot-open', 'regress', 'report']})
    jobs.append({'id': 'embed', 'kind': 'embed', 'deps': [], 'steps': ['start', 'plan', 'cma', 'aud', 'fm', 'sm', 'verify', 'report']})
    with open(os.path.join(HERE, 'jobs.json'), 'w') as f:
        json.dump(jobs, f, indent=1)
    print(len(ids), 'lessons;', len(jobs), 'jobs:',
          sum(j.get('kind') == 'writer' for j in jobs), 'writer,',
          sum(j.get('kind') == 'reviewer' for j in jobs), 'reviewer,',
          sum(j.get('kind') == 'lab' for j in jobs), 'lab')


if __name__ == '__main__':
    main()
