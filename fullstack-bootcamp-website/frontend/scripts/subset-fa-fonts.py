"""One-off + repeatable: subset the FontAwesome woff2 files down to only the
glyphs referenced by fa-subset.min.css. Run after generate-fa-subset.mjs:
    python scripts/subset-fa-fonts.py
fa-solid-900.woff2 is ~156KB with all glyphs; the site uses ~80 icons.
"""
import os
import re

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FA = os.path.join(ROOT, 'public', 'fontawesome')

css = open(os.path.join(FA, 'fa-subset.min.css'), encoding='utf-8').read()
cps = set()
for content in re.findall(r'content:"(.*?)"', css):
    for esc in re.findall(r'\\([0-9a-f]{2,6})', content):
        cps.add(int(esc, 16))
print(f'{len(cps)} glyph codepoints referenced by fa-subset.min.css')

for name in ('fa-solid-900', 'fa-brands-400'):
    path = os.path.join(FA, 'webfonts', f'{name}.woff2')
    before = os.path.getsize(path)
    font = TTFont(path)
    opts = Options()
    opts.flavor = 'woff2'
    subsetter = Subsetter(options=opts)
    subsetter.populate(unicodes=sorted(cps))
    subsetter.subset(font)
    font.save(path)
    after = os.path.getsize(path)
    print(f'{name}.woff2: {before // 1024}KB -> {after // 1024}KB')
