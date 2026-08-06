// One-off asset generator: og-image.png (1200x630) + apple-touch-icon.png (180x180)
// Renders branded HTML in headless Chromium and screenshots it.
import { chromium } from 'playwright'

const browser = await chromium.launch()

// ---------- 1. OG image 1200x630 ----------
const og = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await og.setContent(`<!doctype html><html><head><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #0f172a;
    position: relative;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 90px;
  }
  .glow-1 { position: absolute; width: 560px; height: 560px; border-radius: 50%;
    background: radial-gradient(circle, rgba(249,115,22,.28) 0%, transparent 70%);
    top: -180px; right: -120px; }
  .glow-2 { position: absolute; width: 480px; height: 480px; border-radius: 50%;
    background: radial-gradient(circle, rgba(234,88,12,.18) 0%, transparent 70%);
    bottom: -220px; left: -100px; }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
    background-size: 48px 48px; }
  .brand { display: flex; align-items: center; gap: 22px; margin-bottom: 42px; position: relative; }
  .brand svg { width: 84px; height: 84px; }
  .brand-name { font-size: 44px; font-weight: 800; color: #fff; letter-spacing: -.5px; }
  .brand-name span { color: #f97316; }
  h1 { font-size: 74px; font-weight: 900; color: #fff; line-height: 1.08;
    letter-spacing: -2px; position: relative; max-width: 980px; }
  h1 em { font-style: normal;
    background: linear-gradient(120deg, #f97316, #ea580c);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .sub { margin-top: 30px; font-size: 32px; color: #cbd5e1; font-weight: 500; position: relative; }
  .badges { margin-top: 40px; display: flex; gap: 18px; position: relative; }
  .badge { padding: 12px 26px; border-radius: 999px; font-size: 24px; font-weight: 700;
    color: #fdba74; background: rgba(249,115,22,.12); border: 2px solid rgba(249,115,22,.45); }
</style></head><body>
  <div class="glow-1"></div><div class="glow-2"></div><div class="grid"></div>
  <div class="brand">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ea580c"/><stop offset="100%" stop-color="#f97316"/>
      </linearGradient></defs>
      <rect width="64" height="64" rx="14" fill="#1e293b"/>
      <g fill="url(#g)">
        <polygon points="32,10 56,22 32,34 8,22"/>
        <rect x="17" y="24" width="4" height="18" rx="2" opacity="0.7"/>
        <path d="M21,27 Q21,44 32,47 Q43,44 43,27 L32,34 Z"/>
        <line x1="19" y1="42" x2="19" y2="48" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
        <circle cx="19" cy="51" r="3" fill="#f97316"/>
      </g>
    </svg>
    <div class="brand-name">Nirayush <span>EdTech</span></div>
  </div>
  <h1>Full Stack Development <em>Bootcamp</em></h1>
  <div class="sub">12-Month Job-Focused Program &nbsp;•&nbsp; Ahmedabad</div>
  <div class="badges">
    <div class="badge">MERN Stack</div>
    <div class="badge">Placement Support</div>
    <div class="badge">Founding Batch</div>
  </div>
</body></html>`)
await og.screenshot({ path: 'public/og-image.png' })

// ---------- 2. Apple touch icon 180x180 ----------
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } })
await icon.setContent(`<!doctype html><html><head><style>
  * { margin: 0; } body { width: 180px; height: 180px; } svg { display: block; }
</style></head><body>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ea580c"/><stop offset="100%" stop-color="#f97316"/>
    </linearGradient></defs>
    <rect width="64" height="64" fill="#0f172a"/>
    <g fill="url(#g)">
      <polygon points="32,10 56,22 32,34 8,22"/>
      <rect x="17" y="24" width="4" height="18" rx="2" opacity="0.7"/>
      <path d="M21,27 Q21,44 32,47 Q43,44 43,27 L32,34 Z"/>
      <line x1="19" y1="42" x2="19" y2="48" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
      <circle cx="19" cy="51" r="3" fill="#f97316"/>
    </g>
  </svg>
</body></html>`)
await icon.screenshot({ path: 'public/apple-touch-icon.png' })

await browser.close()
console.log('Generated public/og-image.png (1200x630) and public/apple-touch-icon.png (180x180)')
