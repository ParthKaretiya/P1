// Hero classroom-image verification — desktop / tablet / mobile
import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:5173'
const OUT = 'screenshots'

const browser = await chromium.launch()

const shots = [
  { name: 'hero-classroom-desktop', width: 1440, height: 900 },
  { name: 'hero-classroom-tablet', width: 820, height: 1100 },
  { name: 'hero-classroom-mobile', width: 390, height: 844 },
]

for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800) // let entrance animations settle
  await page.screenshot({ path: `${OUT}/${s.name}.png` })
  await page.close()
}

await browser.close()
console.log('done')
