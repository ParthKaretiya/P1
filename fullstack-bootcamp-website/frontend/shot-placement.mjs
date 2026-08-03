// Placement redesign verification screenshots
import { chromium } from 'playwright'

const BASE = 'http://localhost:5173'
const OUT = 'screenshots'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

// Section top — header + first bento row
await page.evaluate(() => {
  const el = document.getElementById('placement')
  window.scrollTo({ top: el.offsetTop - 40, behavior: 'instant' })
})
await page.waitForTimeout(1600)
await page.screenshot({ path: `${OUT}/pl-top.png` })

// Bento mid — companies marquee + journey
await page.evaluate(() => {
  const el = document.getElementById('placement')
  window.scrollTo({ top: el.offsetTop + 620, behavior: 'instant' })
})
await page.waitForTimeout(1800)
await page.screenshot({ path: `${OUT}/pl-mid.png` })

// Journey + success card
await page.evaluate(() => {
  const el = document.getElementById('placement')
  window.scrollTo({ top: el.offsetTop + el.offsetHeight - 950, behavior: 'instant' })
})
await page.waitForTimeout(1800)
await page.screenshot({ path: `${OUT}/pl-bottom.png` })

// Hover: spotlight card
const card = page.locator('#placement article').first()
await card.scrollIntoViewIfNeeded()
await page.waitForTimeout(1000)
await card.hover({ position: { x: 200, y: 140 } })
await page.waitForTimeout(700)
await card.screenshot({ path: `${OUT}/pl-card-hover.png` })

// Hover: journey step tooltip
const step = page.locator('#placement button', { hasText: '' }).nth(3)
await step.scrollIntoViewIfNeeded()
await page.waitForTimeout(600)
await step.hover()
await page.waitForTimeout(700)
await page.screenshot({ path: `${OUT}/pl-tooltip.png` })

// Tablet
const tablet = await browser.newPage({ viewport: { width: 820, height: 1180 } })
await tablet.goto(BASE, { waitUntil: 'networkidle' })
await tablet.evaluate(() => {
  const el = document.getElementById('placement')
  window.scrollTo({ top: el.offsetTop - 30, behavior: 'instant' })
})
await tablet.waitForTimeout(1600)
await tablet.screenshot({ path: `${OUT}/pl-tablet.png` })

// Mobile — top and journey (vertical)
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto(BASE, { waitUntil: 'networkidle' })
await mobile.evaluate(() => {
  const el = document.getElementById('placement')
  window.scrollTo({ top: el.offsetTop - 20, behavior: 'instant' })
})
await mobile.waitForTimeout(1600)
await mobile.screenshot({ path: `${OUT}/pl-mobile.png` })

await mobile.evaluate(() => {
  const steps = document.querySelectorAll('#placement li')
  steps[steps.length - 4]?.scrollIntoView({ block: 'center', behavior: 'instant' })
})
await mobile.waitForTimeout(1600)
await mobile.screenshot({ path: `${OUT}/pl-mobile-journey.png` })

await browser.close()
console.log('done')
