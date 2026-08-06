"""Repeatable: subset the FontAwesome woff2 files down to only the glyphs
referenced by fa-subset.min.css. Run after generate-fa-subset.mjs:
    node scripts/generate-fa-subset.mjs && python scripts/subset-fa-fonts.py
fa-solid-900.woff2 is ~156KB with all glyphs; the site uses ~80 icons.

Reads the PRISTINE full fonts from vendor/fontawesome-webfonts/ and writes the
subset copies into public/. It must never subset public/ in place: doing so is
lossy and one-way, so the next icon added to src/ would silently render as a
blank box (the glyph is no longer in the file to keep). Keep vendor/ untouched.
"""
import os
import re

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'vendor', 'fontawesome-webfonts')
DST = os.path.join(ROOT, 'public', 'fontawesome', 'webfonts')

css = open(os.path.join(ROOT, 'public', 'fontawesome', 'fa-subset.min.css'), encoding='utf-8').read()
cps = set()
for content in re.findall(r'content:"(.*?)"', css):
    for esc in re.findall(r'\\([0-9a-f]{2,6})', content):
        cps.add(int(esc, 16))
print(f'{len(cps)} glyph codepoints referenced by fa-subset.min.css')

for name in ('fa-solid-900', 'fa-brands-400'):
    src = os.path.join(SRC, f'{name}.woff2')
    dst = os.path.join(DST, f'{name}.woff2')
    if not os.path.exists(src):
        raise SystemExit(f'missing pristine font {src} — restore it before subsetting')
    before = os.path.getsize(src)
    font = TTFont(src)
    opts = Options()
    opts.flavor = 'woff2'
    subsetter = Subsetter(options=opts)
    subsetter.populate(unicodes=sorted(cps))
    subsetter.subset(font)
    font.save(dst)
    kept = len(TTFont(dst).getBestCmap())
    print(f'{name}.woff2: {before // 1024}KB -> {os.path.getsize(dst) // 1024}KB ({kept} glyphs)')
