/* Prerender the home route into dist/index.html after `vite build`.
   The SPA otherwise ships an empty <div id="root"> and the Hero (LCP
   element) only appears after the JS bundle downloads + executes — on a
   throttled mobile connection that render delay is the whole LCP problem.

   Uses a production SSR build (not ssrLoadModule) so asset imports resolve
   to the same hashed /assets/ URLs and CSS-module class names as the client
   bundle. The rendered markup is hydrated by main.jsx (hydrateRoot). */
import { build } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(root, 'dist', 'index.html')
const ssrOutDir = path.join(root, 'node_modules', '.prerender')

if (!fs.existsSync(indexPath)) {
  console.error('prerender: dist/index.html not found — run `vite build` first')
  process.exit(1)
}

await build({
  root,
  logLevel: 'error',
  build: {
    ssr: 'src/entry-prerender.jsx',
    outDir: ssrOutDir,
    emptyOutDir: true,
    // Assets referenced by the SSR render must keep the client build's URLs;
    // content-hashed names match because the files are identical.
    copyPublicDir: false,
  },
})

const { render } = await import(pathToFileURL(path.join(ssrOutDir, 'entry-prerender.js')).href)
const appHtml = render('/')

if (appHtml.includes('/src/assets/')) {
  throw new Error('prerender: dev-style /src/assets/ URL leaked into prerendered HTML')
}

const html = fs.readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error('prerender: `<div id="root"></div>` marker not found in dist/index.html')
}
fs.writeFileSync(indexPath, html.replace(marker, `<div id="root">${appHtml}</div>`))
console.log(`prerender: injected ${Math.round(appHtml.length / 1024)}KB of home-route HTML into dist/index.html`)
