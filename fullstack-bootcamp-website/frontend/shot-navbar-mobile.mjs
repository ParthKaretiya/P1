// Mobile navbar verification — closed, open drawer, small phone
import { chromium } from 'playwright'

const BASE = 'http://localhost:5199'
const OUT = 'screenshots'

const browser = await chromium.launch()

// iPhone-ish viewport
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

// 1. Navbar closed
await page.screenshot({ path: `${OUT}/nav-mobile-closed.png` })

// 2. Drawer open
await page.click('button[aria-label="Toggle menu"]')
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/nav-mobile-open.png` })

// 3. Small phone (320px)
const small = await browser.newPage({ viewport: { width: 320, height: 568 } })
await small.goto(BASE, { waitUntil: 'networkidle' })
await small.waitForTimeout(1200)
await small.screenshot({ path: `${OUT}/nav-mobile-320-closed.png` })
await small.click('button[aria-label="Toggle menu"]')
await small.waitForTimeout(600)
await small.screenshot({ path: `${OUT}/nav-mobile-320-open.png` })

await browser.close()
console.log('done')
