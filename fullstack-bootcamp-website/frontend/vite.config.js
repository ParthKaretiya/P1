import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Inline the entry CSS bundle into dist/index.html as a <style> tag.
   It's the last render-blocking request on mobile (~150ms on a slow
   connection): a SPA has one HTML entry anyway, so inlining trades a little
   HTML weight (~8KB gz) for zero extra round trips before first paint.
   Route-split CSS chunks (About-*.css etc.) still load as separate files. */
function inlineEntryCss() {
  return {
    name: 'inline-entry-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html
      for (const [name, asset] of Object.entries(ctx.bundle)) {
        if (asset.type === 'asset' && /^assets\/index-.*\.css$/.test(name)) {
          const linkRe = new RegExp(
            `<link[^>]*\\bhref="/${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
          )
          if (linkRe.test(html)) {
            html = html.replace(linkRe, `<style>${asset.source}</style>`)
          }
        }
      }
      return html
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineEntryCss()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
  },
})
