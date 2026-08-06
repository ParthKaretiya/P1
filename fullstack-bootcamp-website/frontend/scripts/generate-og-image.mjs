// One-off generator for public/og-image.png (1200x630 branded social card)
// Usage: node scripts/generate-og-image.mjs   (from frontend/)
import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../public/og-image.png')

const html = `<!doctype html>
<html><head><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #0f172a; color: #fff; position: relative;
    display: flex; flex-direction: column; justify-content: center; padding: 0 90px;
  }
  .mesh { position: absolute; inset: 0;
    background:
      radial-gradient(600px 400px at 85% 15%, rgba(249,115,22,.28), transparent 65%),
      radial-gradient(500px 380px at 10% 90%, rgba(234,88,12,.18), transparent 60%);
  }
  .dots { position: absolute; inset: 0; opacity: .25;
    background-image: radial-gradient(rgba(255,255,255,.35) 1.4px, transparent 1.4px);
    background-size: 34px 34px;
  }
  .brand { display: flex; align-items: center; gap: 22px; margin-bottom: 44px; position: relative; }
  .brand svg { width: 84px; height: 84px; }
  .brand-name { font-size: 44px; font-weight: 800; letter-spacing: -.5px; }
  .brand-name span { color: #f97316; }
  h1 { position: relative; font-size: 76px; font-weight: 800; line-height: 1.08; letter-spacing: -2px; max-width: 950px; }
  h1 .accent { background: linear-gradient(90deg, #ea580c, #fb923c); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .sub { position: relative; margin-top: 30px; font-size: 30px; color: #cbd5e1; font-weight: 500; }
  .badge { position: absolute; bottom: 48px; right: 90px; font-size: 24px; font-weight: 700;
    background: rgba(249,115,22,.14); border: 2px solid rgba(249,115,22,.5); color: #fb923c;
    padding: 14px 30px; border-radius: 999px; }
</style></head>
<body>
  <div class="mesh"></div><div class="dots"></div>
  <div class="brand">
    <svg viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ea580c"/><stop offset="100%" stop-color="#f97316"/></linearGradient></defs>
      <rect width="64" height="64" rx="14" fill="#1e293b"/>
      <g fill="url(#g)"><polygon points="32,10 56,22 32,34 8,22"/>
      <rect x="17" y="24" width="4" height="18" rx="2" opacity=".7"/>
      <path d="M21,27 Q21,44 32,47 Q43,44 43,27 L32,34 Z"/>
      <line x1="19" y1="42" x2="19" y2="48" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
      <circle cx="19" cy="51" r="3" fill="#f97316"/></g></svg>
    <div class="brand-name">Nirayush <span>EdTech</span></div>
  </div>
  <h1>Full Stack Development <span class="accent">Bootcamp</span></h1>
  <div class="sub">12-Month Job-Focused Program &middot; Dedicated Placement Support &middot; Ahmedabad</div>
  <div class="badge">Founding Batch Enrolling Now</div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: OUT })
await browser.close()
console.log('Wrote', OUT)
