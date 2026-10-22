"""Keyword baseline tagger (subject + topic). Used ONLY with `build.py --dev-tags` so the UI has plausible filters while the real
tagging pass (reviewed by subject specialists) is pending. Never ships: real tags come from pyq/meta/*.json."""
import re

SUBJECT_KW = {
    "os": r"\b(process(es)?|thread|semaphore|mutex|deadlock|scheduling|scheduler|round robin|page fault|page replacement|paging|virtual memory|demand paging|tlb|thrashing|inode|file system|disk (scheduling|arm|block)|context switch|critical section|race condition|fork|banker|belady|working set|segmentation|shell|system call|kernel|monitor|dining philosopher|producer|consumer|spinlock|peterson|test-and-set|cpu burst|turnaround time|waiting time|rate monotonic|boot|swap|buddy)\b",
    "db": r"\b(sql|relational|relation r|schema|functional dependenc|normal form|bcnf|3nf|2nf|b\+? ?tree|b-tree|index(ing)?|transaction|serializab|two-phase|2pl|timestamp ordering|deadlock detection|entity|er diagram|foreign key|primary key|candidate key|tuple|select .* from|join|aggregate|conflict serial|view serial|recoverab|cascad|checkpoint|dbms|query|trigger|relational algebra)\b",
    "cn": r"\b(tcp|udp|ip address|subnet|cidr|router|routing|distance vector|link state|ethernet|csma|aloha|mac address|sliding window|go-back|selective repeat|congestion|packet|bandwidth|latency|propagation delay|transmission delay|http|dns|smtp|ftp|nat\b|icmp|arp|dhcp|osi|network layer|transport layer|data link|crc|checksum|hamming|bridge|switch|socket|rsa|public key|symmetric|firewall|throughput|window size|mss|fragment)\b",
    "coa": r"\b(cache|pipeline|pipelining|hazard|instruction (format|set)|addressing mode|cpi|mips|clock cycle|dma|interrupt|micro-?(program|instruction|operation)|control unit|alu|register file|memory interleav|main memory|virtual address|direct[- ]mapped|set[- ]associative|write[- ]back|write[- ]through|speedup|amdahl|opcode|operand|risc|cisc|hit ratio|miss penalty|booth|disk drive|rpm|seek time|processor|bus\b|stall|forwarding|branch prediction)\b",
    "dl": r"\b(boolean|karnaugh|k-map|minimi[sz]|flip-?flop|latch|counter|multiplexer|mux|decoder|encoder|adder|subtractor|gate|nand|nor|xor|logic (circuit|function)|truth table|sequential circuit|combinational|state (machine|diagram)|mealy|moore|ieee 754|floating[- ]point|two'?s complement|1'?s complement|sign[- ]magnitude|gray code|bcd|overflow|hazard|prime implicant|sop|pos|shift register|jk|t flip|d flip|excitation)\b",
    "toc": r"\b(dfa|nfa|finite automat|regular (expression|language|grammar)|context[- ]free|cfg|cfl|pushdown|pda|turing machine|undecidab|decidab|recursively enumerable|recursive language|pumping lemma|halting problem|rice'?s theorem|chomsky|ambiguous grammar|language accepted|minimal dfa|regular set|kleene|closure propert|lba|linear bounded|reduction|np-?complete|np-?hard)\b",
    "cd": r"\b(compiler|lexical|token|lexeme|parser|parsing|ll\(1\)|lr\(0\)|slr|lalr|clr|first and follow|first\(|follow\(|shift-reduce|reduce-reduce|syntax[- ]directed|attribute|three[- ]address|quadruple|basic block|dead code|common subexpression|register allocation|activation record|symbol table|intermediate code|code generation|optimi[sz]ation|liveness|dag|backpatch|handle|left recursion|left factoring)\b",
    "algo": r"\b(time complexity|worst[- ]case|big[- ]?o|theta|omega|recurrence|master theorem|merge ?sort|quick ?sort|heap ?sort|insertion sort|bubble sort|selection sort|binary search|dijkstra|bellman|floyd|kruskal|prim'?s|minimum spanning|shortest path|dynamic programming|greedy|huffman|knapsack|lcs|longest common|matrix chain|bfs|dfs|breadth[- ]first|depth[- ]first|topological|hash(ing)? ?(function|table)?|collision|open addressing|chaining|probing|divide and conquer|asymptotic|amortized|np-?complete|sorting algorithm|comparison[- ]based|stable sort)\b",
    "pds": r"\b(c program|following c|the output|what is the (value|output) printed|printf|scanf|pointer|struct\b|malloc|array|linked list|stack|queue|binary (search )?tree|bst|avl|heap|inorder|preorder|postorder|traversal|recursion|recursive function|function (f|g|foo)|int main|void |#include|sizeof|static|global variable|call by|pass by|dequeue|enqueue|push|pop|circular)\b",
    "dm": r"\b(propositional|predicate|first[- ]order|tautolog|logical (equivalen|implication)|quantifier|set (a|b|s)|relation (on|r)|reflexive|symmetric|transitive|equivalence relation|partial order|poset|lattice|hasse|group\b|subgroup|monoid|abelian|cyclic|lagrange|graph (g|with)|vertices|vertex|edges|planar|chromatic|euler|hamilton|matching|spanning tree|bipartite|degree sequence|permutation|combination|pigeonhole|recurrence relation|generating function|binomial|inclusion[- ]exclusion|counting|number of (ways|functions|relations)|injective|surjective|bijective|function f|cardinality)\b",
    "la": r"\b(matri(x|ces)|determinant|eigen ?value|eigen ?vector|rank of|system of linear|gaussian|lu decomposition|inverse of|characteristic (polynomial|equation)|singular|orthogonal matrix|trace of|linear (equations|independen)|vector space|null space|diagonal)\b",
    "calc": r"\b(limit|lim\b|continuous|differentiab|derivative|integral|integrat|maxima|minima|mean value|rolle|lagrange|taylor|series converge|convergen|sin ?x|cos ?x|log ?x|e\^x|f\(x\) =|d/dx|partial deriv|stationary point)\b",
    "ps": r"\b(probability|random variable|expected value|expectation|variance|standard deviation|bayes|conditional probability|binomial distribution|poisson|exponential distribution|normal distribution|uniform distribution|independent events|dice|coin|median|mode\b|mean of|pmf|pdf|cdf|geometric distribution)\b",
    "ga": r"\b(choose the (most|correct|appropriate|option)|word (that|which)|synonym|antonym|idiom|sentence (is|that)|grammatically|passage|paragraph|which one of the following (statements|options) (can be|is) (inferred|best)|the ratio of|percent|per cent|average age|speed of|train|boat|work together|profit|loss|interest|rectangle|circle|triangle|area of|cube|dice|paper (is )?folded|mirror|pie chart|bar graph|table (shows|below)|odd one|analogy|series|fill in the blank|filled in the blank|best expresses|spatial|figure (below|shows))\b",
}
OS_TOPICS = {
    "os.sched": r"\b(scheduling|scheduler|round robin|turnaround|waiting time|burst|shortest (job|remaining)|sjf|srtf|fcfs|priority|quantum|gantt|rate monotonic|response time)\b",
    "os.sync": r"\b(semaphore|mutex|critical section|race|synchroni|peterson|dekker|test-and-set|producer|consumer|reader|writer|dining|monitor|spinlock|busy wait|barrier|wait\(|signal\()\b",
    "os.deadlock": r"\b(deadlock|banker|safe state|resource allocation graph|wait-for|circular wait|mutual exclusion and)\b",
    "os.mem": r"\b(paging|page table|tlb|segment|fragmentation|first fit|best fit|worst fit|logical address|physical address|translation|address space|page size|multi-?level|frame|swap|buddy|base and limit)\b",
    "os.vm": r"\b(page fault|page replacement|lru|fifo|optimal|belady|thrashing|working set|demand paging|virtual memory|clock algorithm|second chance|copy-on-write|dirty)\b",
    "os.file": r"\b(inode|file system|file allocation|fat\b|directory|disk block|indexed allocation|linked allocation|contiguous allocation|hard link|soft link|symbolic link|file descriptor|mount|open file)\b",
    "os.io": r"\b(disk (scheduling|arm|head)|scan|c-scan|look|sstf|seek|rotational|raid|dma|spooling|buffering|i/o (device|request)|cylinder|sector)\b",
    "os.proc": r"\b(fork|exec|wait\(|process (state|control|creation)|pcb|context switch|thread|zombie|orphan|user[- ]level thread|kernel[- ]level thread|multithreading|child process)\b",
    "os.ipc": r"\b(pipe|message passing|shared memory|signal|socket|ipc|inter-?process)\b",
    "os.intro": r"\b(system call|kernel mode|user mode|privileged|interrupt|trap|boot|operating system (is|provides)|monolithic|microkernel|dual mode|shell)\b",
}


def tag(text: str):
    t = text.lower()
    best, score = None, 0
    for sid, pat in SUBJECT_KW.items():
        n = len(re.findall(pat, t))
        if n > score:
            best, score = sid, n
    topic = None
    if best == "os":
        s2 = 0
        for tid, pat in OS_TOPICS.items():
            n = len(re.findall(pat, t))
            if n > s2:
                topic, s2 = tid, n
    return best, topic
