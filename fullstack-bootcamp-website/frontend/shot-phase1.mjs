// Phase 1 verification screenshots — hero top + scrolled navbar state
import { chromium } from 'playwright'

const BASE = 'http://localhost:5174'
const OUT = 'screenshots'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500) // let entrance animations settle

// 1. Hero at top (navbar transparent)
await page.screenshot({ path: `${OUT}/phase1-hero.png` })

// 2. Scroll down — navbar glass + scroll progress bar + back-to-top visible
await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }))
await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}/phase1-scrolled.png` })

// 3. Mobile hero
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto(BASE, { waitUntil: 'networkidle' })
await mobile.waitForTimeout(1500)
await mobile.screenshot({ path: `${OUT}/phase1-mobile.png` })

await browser.close()
console.log('done')
