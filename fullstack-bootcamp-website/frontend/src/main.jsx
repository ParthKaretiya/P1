import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

/* dist/index.html is prerendered with the HOME route (scripts/prerender.mjs)
   so the Hero/LCP is in the initial HTML. Only hydrate when we're actually
   on / — deep links (e.g. /about) get the same HTML from the SPA fallback,
   where the prerendered home markup would mismatch: clear it and render
   fresh. Dev server serves an empty #root and also takes the render path. */
if (root.hasChildNodes() && window.location.pathname === '/') {
  ReactDOM.hydrateRoot(root, app)
} else {
  root.innerHTML = ''
  ReactDOM.createRoot(root).render(app)
}
