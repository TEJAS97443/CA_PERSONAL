import sys, os, re, glob, pymupdf
for f in sys.argv[1:]:
    d = pymupdf.open(f)
    toc = d.get_toc()
    chars = [len(p.get_text('text')) for p in d]
    pua = sum(len(re.findall(r'[-]', p.get_text('text'))) for p in d)
    low = [i + 1 for i, c in enumerate(chars) if c < 80]
    imgs = sum(len(p.get_images()) for p in d)
    print('%-45s pages=%3d toc=%3d chars=%7d pua=%5d lowtext_pages=%s imgs=%d' % (os.path.relpath(f, os.path.expanduser('~/CA_PERSONAL/ca_sources/sm')), d.page_count, len(toc), sum(chars), pua, low[:15], imgs))
