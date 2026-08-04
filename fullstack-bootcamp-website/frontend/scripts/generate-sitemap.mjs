<<<<<<< HEAD
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
=======
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');
const SITE_URL = 'https://www.nirayush.com';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_ROUTES = [
  { path: '/',                          priority: 1.0,  freq: 'weekly'  },
  { path: '/about',                     priority: 0.8,  freq: 'monthly' },
  { path: '/courses',                   priority: 0.9,  freq: 'weekly'  },
  { path: '/courses/fullstack-developer', priority: 0.9, freq: 'weekly' },
  { path: '/placements',                priority: 0.8,  freq: 'monthly' },
  { path: '/testimonials',              priority: 0.7,  freq: 'monthly' },
  { path: '/admissions',                priority: 0.9,  freq: 'weekly'  },
  { path: '/contact',                   priority: 0.8,  freq: 'monthly' },
  { path: '/gallery',                   priority: 0.6,  freq: 'monthly' },
  { path: '/faq',                       priority: 0.7,  freq: 'monthly' },
  { path: '/blog',                      priority: 0.7,  freq: 'weekly'  },
  { path: '/privacy',                   priority: 0.3,  freq: 'yearly'  },
  { path: '/terms',                     priority: 0.3,  freq: 'yearly'  },
];

const DYNAMIC_BLOG_POSTS = [];

function buildSitemap() {
  const allRoutes = [
    ...STATIC_ROUTES,
    ...DYNAMIC_BLOG_POSTS.map(slug => ({
      path: `/blog/${slug}`, priority: 0.6, freq: 'monthly',
    })),
  ];

  const urls = allRoutes
    .map(r => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });
  writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log(`✓ sitemap.xml generated (${allRoutes.length} URLs) — ${join(PUBLIC_DIR, 'sitemap.xml')}`);
}

buildSitemap();
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
