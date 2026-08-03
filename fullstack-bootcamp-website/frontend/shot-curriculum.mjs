// Curriculum redesign verification screenshots
import { chromium } from 'playwright'

const BASE = 'http://localhost:5173'
const OUT = 'screenshots'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)

// Scroll to curriculum section top
await page.evaluate(() => {
  const el = document.getElementById('curriculum')
  window.scrollTo({ top: el.offsetTop - 60, behavior: 'instant' })
})
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/curr-top.png` })

// Mid-roadmap — spine partially filled, active card
await page.evaluate(() => {
  const el = document.getElementById('curriculum')
  window.scrollTo({ top: el.offsetTop + el.offsetHeight * 0.4, behavior: 'instant' })
})
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/curr-mid.png` })

// Hover a card to reveal topics
const card = page.locator('#curriculum article').nth(3)
await card.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)
await card.hover()
await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}/curr-hover.png` })

// Final celebration card
await page.evaluate(() => {
  const el = document.getElementById('curriculum')
  window.scrollTo({ top: el.offsetTop + el.offsetHeight - 900, behavior: 'instant' })
})
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/curr-final.png` })

// Mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto(BASE, { waitUntil: 'networkidle' })
await mobile.evaluate(() => {
  const el = document.getElementById('curriculum')
  window.scrollTo({ top: el.offsetTop - 40, behavior: 'instant' })
})
await mobile.waitForTimeout(1400)
await mobile.screenshot({ path: `${OUT}/curr-mobile.png` })

await mobile.evaluate(() => {
  const el = document.getElementById('curriculum')
  window.scrollTo({ top: el.offsetTop + el.offsetHeight * 0.35, behavior: 'instant' })
})
await mobile.waitForTimeout(1400)
await mobile.screenshot({ path: `${OUT}/curr-mobile-mid.png` })

await browser.close()
console.log('done')
