/* Build-time prerender entry (used by scripts/prerender.mjs, never shipped).
   Renders the home route to static HTML so the Hero (LCP element) is in
   dist/index.html itself — main.jsx hydrates it on the client. */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

export function render(url = '/') {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
