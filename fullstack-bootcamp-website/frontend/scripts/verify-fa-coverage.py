"""Verify every fa-* class used in src/ resolves to a glyph that actually exists
in the subset woff2 files shipped from public/. A class with a rule in
fa-subset.min.css but no glyph in the font renders as a blank box, which is
invisible in code review — this catches it. Run after subset-fa-fonts.py:
    python scripts/verify-fa-coverage.py
"""
import os
import re
import sys

from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FA = os.path.join(ROOT, 'public', 'fontawesome')
SRC_DIR = os.path.join(ROOT, 'src')

NON_ICON = {'fa-solid', 'fa-regular', 'fa-brands', 'fa-fw', 'fa-lg', 'fa-xs', 'fa-sm', 'fa-spin'}

# fa-* classes actually referenced in src/
used = set()
for dirpath, _, files in os.walk(SRC_DIR):
    for f in files:
        if re.search(r'\.(jsx?|css)$', f):
            text = open(os.path.join(dirpath, f), encoding='utf-8').read()
            for m in re.findall(r'fa-[a-z0-9-]+', text):
                if m not in NON_ICON:
                    used.add(m)

# class -> codepoints, from the subset CSS
GLYPH_RE = r'((?:\.fa-[a-z0-9-]+::?before,?)+)\{content:"([^"]+)"\}'


def parse_rules(path):
    text = open(path, encoding='utf-8').read()
    out = {}
    for m in re.finditer(GLYPH_RE, text):
        cps = [int(e, 16) for e in re.findall(r'\\([0-9a-f]{2,6})', m.group(2))]
        for sel in m.group(1).split(','):
            sel = re.sub(r'::?before', '', sel.strip()).lstrip('.')
            if sel:
                out[sel] = cps
    return out


rules = parse_rules(os.path.join(FA, 'fa-subset.min.css'))
# Tokens matching /fa-[a-z0-9-]+/ in src/ that aren't icons at all (filenames
# like "fa-subset.min.css", CSS module class names) have no rule in the FULL
# stylesheet either — only flag a missing rule when the icon genuinely exists.
real_icons = set(parse_rules(os.path.join(FA, 'all.min.css')))

cmaps = {}
for name in ('fa-solid-900', 'fa-brands-400', 'fa-regular-400'):
    p = os.path.join(FA, 'webfonts', f'{name}.woff2')
    if os.path.exists(p):
        cmaps[name] = TTFont(p).getBestCmap()

no_rule, no_glyph = [], []
for cls in sorted(used):
    cps = rules.get(cls)
    if cps is None:
        if cls in real_icons:
            no_rule.append(cls)
    elif not all(any(c in cm for cm in cmaps.values()) for c in cps):
        no_glyph.append((cls, [hex(c) for c in cps]))

print(f'{len(used)} fa-* classes used in src/, {len(rules)} classes covered by fa-subset.min.css')
for cls in no_rule:
    print(f'  NO CSS RULE   {cls}  (renders blank — not in fa-subset.min.css)')
for cls, cps in no_glyph:
    print(f'  NO GLYPH      {cls} {cps}  (rule exists but glyph absent from shipped woff2)')

if no_rule or no_glyph:
    print(f'\nFAIL: {len(no_rule) + len(no_glyph)} icon(s) will not render')
    sys.exit(1)
print('OK: every used icon has a rule and a glyph')
