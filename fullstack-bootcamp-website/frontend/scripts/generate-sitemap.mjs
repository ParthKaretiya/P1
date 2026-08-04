// Build-time sitemap generator — runs automatically before `vite build`.
// Emits public/sitemap.xml covering all public routes, including dynamic
// course and blog slugs, so it never needs hand-maintenance.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// Keep in sync with SITE_URL in src/hooks/useSEO.js
const SITE_URL = 'https://www.nirayush.com'

// Dynamic slugs — coursesData.js is pure data so we can import it directly.
const { COURSES_DATA } = await import(
  new URL(`file://${resolve(root, 'src/data/coursesData.js').replace(/\\/g, '/')}`).href
)

// Blog posts live inside Blog.jsx (a React component), so extract ids by regex.
const blogSource = readFileSync(resolve(root, 'src/pages/Blog.jsx'), 'utf8')
const blogIds = [...blogSource.matchAll(/^\s*id:\s*'([^']+)'/gm)].map(m => m[1])

const today = new Date().toISOString().slice(0, 10)

/** [path, priority, changefreq] — static public routes (mirror App.jsx). */
const STATIC_ROUTES = [
  ['/',             '1.0', 'weekly'],
  ['/courses',      '0.9', 'weekly'],
  ['/admissions',   '0.9', 'monthly'],
  ['/about',        '0.8', 'monthly'],
  ['/placements',   '0.8', 'monthly'],
  ['/contact',      '0.8', 'monthly'],
  ['/faq',          '0.7', 'monthly'],
  ['/blog',         '0.7', 'weekly'],
  ['/testimonials', '0.6', 'monthly'],
  ['/gallery',      '0.5', 'monthly'],
  ['/privacy',      '0.3', 'yearly'],
  ['/terms',        '0.3', 'yearly'],
]

const urls = [
  ...STATIC_ROUTES,
  ...COURSES_DATA.map(c => [`/courses/${c.id}`, '0.9', 'monthly']),
  ...blogIds.map(id => [`/blog/${id}`, '0.6', 'monthly']),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([path, priority, changefreq]) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml written — ${urls.length} URLs (${COURSES_DATA.length} courses, ${blogIds.length} blog posts)`)
