/**
 * One-shot generator for responsive hero image variants.
 * Outputs stable-named files into public/hero/ so index.html can
 * <link rel="preload"> them (bundled assets get hashed names and can't be
 * preloaded from static HTML).
 *
 * Run: node scripts/generate-hero-images.mjs
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, '../src/assets/hero-classroom-PLACEHOLDER-ai-generated.jpg')
const OUT_DIR = path.join(__dirname, '../public/hero')

const WIDTHS = [480, 768, 1100, 1376]

await mkdir(OUT_DIR, { recursive: true })

for (const w of WIDTHS) {
  const base = path.join(OUT_DIR, `classroom-${w}`)
  const resized = sharp(SRC).resize({ width: w })
  const [webp, avif] = await Promise.all([
    resized.clone().webp({ quality: 72 }).toFile(`${base}.webp`),
    resized.clone().avif({ quality: 50 }).toFile(`${base}.avif`),
  ])
  console.log(`classroom-${w}: webp ${(webp.size / 1024).toFixed(1)} KiB, avif ${(avif.size / 1024).toFixed(1)} KiB`)
}

// JPEG fallback at a single mid width for <img src> (old browsers only)
const jpg = await sharp(SRC).resize({ width: 1100 }).jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(OUT_DIR, 'classroom-1100.jpg'))
console.log(`classroom-1100.jpg: ${(jpg.size / 1024).toFixed(1)} KiB`)
