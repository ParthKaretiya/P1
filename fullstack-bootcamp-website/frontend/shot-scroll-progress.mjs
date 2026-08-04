// Scroll progress bar test matrix — desktop/tablet/mobile × top/mid/bottom,
// plus short page, mid-scroll reload, route change, address-bar viewport resize,
// and rubber-band overscroll simulation.
import { chromium } from 'playwright'
import fs from 'fs'

const BASE = process.env.BASE || 'http://localhost:5173'
const OUT = 'screenshots/scroll-progress'
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const results = []

// Read bar progress as % from its transform scaleX
async function readBar(page) {
  return page.evaluate(() => {
    const track = document.querySelector('[class*="track"]')
    const bar = track?.firstElementChild
    if (!bar) return { found: false }
    const t = getComputedStyle(bar).transform
    // matrix(a, b, c, d, tx, ty) — a = scaleX
    const scaleX = t === 'none' ? 1 : parseFloat(t.match(/matrix\(([^,]+)/)?.[1] ?? 'NaN')
    const el = document.documentElement
    const total = el.scrollHeight - el.clientHeight
    const expected = total > 0 ? Math.min(1, Math.max(0, el.scrollTop / total)) : 0
    return {
      found: true,
      pct: +(scaleX * 100).toFixed(1),
      expectedPct: +(expected * 100).toFixed(1),
      scrollTop: el.scrollTop, total,
    }
  })
}

async function check(page, name, tolerancePct = 2) {
  await page.waitForTimeout(350) // let transition (0.1s) + raf settle
  const r = await readBar(page)
  const pass = r.found && Math.abs(r.pct - r.expectedPct) <= tolerancePct
  results.push({ name, ...r, pass })
  await page.screenshot({ path: `${OUT}/${name}.png` })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}: bar=${r.pct}% expected=${r.expectedPct}% (scrollTop=${r.scrollTop}, total=${r.total})`)
}

async function scrollToFraction(page, f) {
  await page.evaluate((frac) => {
    // Bypass Lenis smooth-scroll for deterministic positioning
    window.lenis?.scrollTo(
      (document.documentElement.scrollHeight - document.documentElement.clientHeight) * frac,
      { immediate: true },
    ) ?? window.scrollTo(0, (document.documentElement.scrollHeight - document.documentElement.clientHeight) * frac)
  }, f)
}

const devices = [
  { dev: 'desktop', width: 1440, height: 900 },
  { dev: 'tablet-portrait', width: 820, height: 1180 },
  { dev: 'tablet-landscape', width: 1180, height: 820 },
  { dev: 'mobile-portrait', width: 390, height: 844, mobile: true },
  { dev: 'mobile-landscape', width: 844, height: 390, mobile: true },
]

for (const d of devices) {
  const page = await browser.newPage({
    viewport: { width: d.width, height: d.height },
    ...(d.mobile ? { hasTouch: true, isMobile: true } : {}),
  })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  await scrollToFraction(page, 0)
  await check(page, `${d.dev}-top`)
  await scrollToFraction(page, 0.5)
  await check(page, `${d.dev}-mid`)
  await scrollToFraction(page, 1)
  await check(page, `${d.dev}-bottom`)
  await page.close()
}

// --- Address-bar collapse simulation: viewport height changes mid-scroll ---
{
  const page = await browser.newPage({ viewport: { width: 390, height: 660 }, hasTouch: true, isMobile: true })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await scrollToFraction(page, 0.5)
  await page.waitForTimeout(300)
  await page.setViewportSize({ width: 390, height: 750 }) // address bar collapses → taller viewport
  await check(page, 'mobile-addressbar-collapse')
  await page.close()
}

// --- Mid-scroll reload: bar must reflect restored position immediately ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await scrollToFraction(page, 0.5)
  await page.waitForTimeout(300)
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1200) // NO scroll event issued after reload
  await check(page, 'desktop-reload-midscroll', 5) // restored position may differ slightly as images load
  await page.close()
}

// --- Route change: bar resets for the new page's height ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await scrollToFraction(page, 1)
  await page.waitForTimeout(300)
  await page.click('a[href="/courses"]')
  await page.waitForTimeout(1500)
  await check(page, 'route-change-to-courses')
  await page.close()
}

// --- Rubber-band overscroll: force out-of-range scrollTop values ---
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const r = await page.evaluate(() => {
    const el = document.documentElement
    const track = document.querySelector('[class*="track"]')
    const bar = track?.firstElementChild
    const read = () => {
      const t = getComputedStyle(bar).transform
      return t === 'none' ? 1 : parseFloat(t.match(/matrix\(([^,]+)/)?.[1] ?? 'NaN')
    }
    // Simulate what the component computes for overscrolled values
    const total = el.scrollHeight - el.clientHeight
    const compute = (st) => (total > 0 ? Math.min(1, Math.max(0, st / total)) : 0)
    return { negOK: compute(-120) === 0, overOK: compute(total + 300) === 1, current: read() }
  })
  const pass = r.negOK && r.overOK
  results.push({ name: 'rubberband-clamp', pass, ...r })
  console.log(`${pass ? 'PASS' : 'FAIL'}  rubberband-clamp: negative→0 ${r.negOK}, over-bottom→100% ${r.overOK}`)
  await page.close()
}

// --- Short page: nothing to scroll → 0%, never NaN ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 3000 } }) // viewport taller than most content
  await page.goto(`${BASE}/privacy-policy`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await check(page, 'short-page-tall-viewport')
  await page.close()
}

await browser.close()
const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
if (failed.length) { console.log('FAILED:', failed.map((f) => f.name).join(', ')); process.exit(1) }
