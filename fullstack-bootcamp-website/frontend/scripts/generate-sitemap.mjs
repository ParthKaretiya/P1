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
