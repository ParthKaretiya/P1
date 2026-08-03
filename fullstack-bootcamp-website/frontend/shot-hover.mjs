// Verify the hover topics reveal on a single card
import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })

const card = page.locator('#curriculum article', { hasText: 'React Development' }).first()
await card.scrollIntoViewIfNeeded()
await page.waitForTimeout(1200)
await card.hover()
await page.waitForTimeout(900)
await card.screenshot({ path: 'screenshots/curr-card-hover.png' })

// Keyboard focus check — tab reveal should also work
await page.keyboard.press('Escape')
const authCard = page.locator('#curriculum article', { hasText: 'Authentication' }).first()
await authCard.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)
await authCard.focus()
await page.waitForTimeout(700)
await authCard.screenshot({ path: 'screenshots/curr-card-focus.png' })

await browser.close()
console.log('done')
