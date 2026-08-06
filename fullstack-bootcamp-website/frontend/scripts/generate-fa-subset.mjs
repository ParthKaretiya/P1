/**
 * Regenerates public/fontawesome/fa-subset.min.css from all.min.css,
 * keeping only the icon glyph rules for fa-* classes actually used in src/.
 * Run after adding new Font Awesome icons: node scripts/generate-fa-subset.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.join(__dirname, '../src')
const FA_DIR = path.join(__dirname, '../public/fontawesome')

// Collect fa-* class names used anywhere in src/
const NON_ICON = new Set(['fa-solid', 'fa-regular', 'fa-brands', 'fa-fw', 'fa-lg', 'fa-xs', 'fa-sm'])
const used = new Set(['fa-spin']) // utility animation class kept explicitly
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(jsx?|css)$/.test(f)) {
      for (const m of readFileSync(p, 'utf8').matchAll(/fa-[a-z0-9-]+/g)) {
        if (!NON_ICON.has(m[0])) used.add(m[0])
      }
    }
  }
}
walk(SRC_DIR)

const css = readFileSync(path.join(FA_DIR, 'all.min.css'), 'utf8')
// Glyph rules: .fa-name:before{content:"\fXXX"} — aliases are comma-joined and
// FA repeats ':before' on EVERY selector (.fa-location-dot:before,.fa-map-marker-alt:before{…}),
// so the ':before' must be inside the repeated group. Matching it only once at
// the end silently dropped every aliased icon (~20 of them rendered as blanks).
const glyphRe = /(?:\.fa-[a-z0-9-]+::?before,?)+\{content:"[^"]+"\}/g
const kept = []
for (const m of css.matchAll(glyphRe)) {
  const sels = m[0].split('{')[0].split(',').map(s => s.replace(/::?before/, '').slice(1))
  if (sels.some(s => used.has(s))) kept.push(m[0])
}
const out = (css.replace(glyphRe, '') + kept.join(''))
  // Absolute font paths — relative ../webfonts/ would resolve to /webfonts/
  // (SPA HTML fallback) since the CSS lives at /fontawesome/*.css
  .replaceAll('url(../webfonts/', 'url(/fontawesome/webfonts/')
writeFileSync(path.join(FA_DIR, 'fa-subset.min.css'), out)
console.log(`fa-subset.min.css: ${Math.round(out.length / 1024)}KB (full: ${Math.round(css.length / 1024)}KB), ${kept.length} glyph rules for ${used.size} used classes`)
