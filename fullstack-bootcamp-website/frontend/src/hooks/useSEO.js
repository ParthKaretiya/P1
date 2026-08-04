import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

<<<<<<< HEAD
/** Canonical production origin — keep in sync with scripts/generate-sitemap.mjs */
=======
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
export const SITE_URL = 'https://www.nirayush.com'
export const SITE_NAME = 'Nirayush EduTech'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

<<<<<<< HEAD
/** Create-or-update a <meta> tag identified by name= or property= */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!content) {
    if (el) el.remove()
    return
  }
=======
/** Create-or-update a <meta> tag identified by name= or property=. */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

<<<<<<< HEAD
/** Create-or-update <link rel="canonical"> */
function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
=======
/** Create-or-update a <link> tag identified by rel=. */
function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
<<<<<<< HEAD
 * Per-route SEO: title, meta description, canonical URL, Open Graph,
 * Twitter Card, robots and JSON-LD structured data.
 *
 * @param {object}  opts
 * @param {string}  opts.title       Page title. " | Nirayush EduTech" is appended
 *                                   automatically unless the brand is already present.
 * @param {string}  opts.description Meta description (aim for 150–160 chars).
 * @param {string}  [opts.keywords]  Optional meta keywords.
 * @param {string}  [opts.image]     Absolute URL for og:image (defaults to branded 1200x630).
 * @param {string}  [opts.type]      og:type — 'website' (default) or 'article'.
 * @param {boolean} [opts.noindex]   Set robots noindex (404 / thin pages).
 * @param {object|object[]} [opts.jsonLd] JSON-LD structured data to inject.
 */
export function useSEO({ title, description, keywords, image, type = 'website', noindex = false, jsonLd }) {
  const { pathname } = useLocation()
  // Serialize for stable effect deps (object literals change identity every render)
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
=======
 * Inject a managed JSON-LD <script> block. Each `id` owns exactly one block;
 * re-injecting with the same id replaces the previous content.
 * Returns a cleanup function that removes the block.
 */
export function injectJsonLd(id, data) {
  const attr = 'data-jsonld-id'
  let el = document.head.querySelector(`script[${attr}="${id}"]`)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute(attr, id)
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
  return () => {
    document.head.querySelector(`script[${attr}="${id}"]`)?.remove()
  }
}

/**
 * Per-route SEO head management for the SPA:
 * title, meta description/keywords, canonical URL, Open Graph + Twitter Card
 * tags, robots noindex, and optional page-level JSON-LD structured data.
 *
 * Canonical/og:url are derived automatically from the current route.
 */
export function useSEO({ title, description, keywords, image, type, noindex, jsonLd }) {
  const { pathname } = useLocation()

  useEffect(() => {
    // Canonical: absolute URL of the current route, no trailing slash (except root)
    const path = pathname === '/' ? '' : pathname.replace(/\/+$/, '')
    const canonicalUrl = `${SITE_URL}${path}`

>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
    const fullTitle = title
      ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`)
      : `${SITE_NAME} — Full Stack Developer Bootcamp Ahmedabad`
    document.title = fullTitle

<<<<<<< HEAD
    // Canonical — absolute URL of the current route, no trailing slash (except root)
    const canonicalPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const canonicalUrl = `${SITE_URL}${canonicalPath}`
    setCanonical(canonicalUrl)

    setMeta('name', 'description', description)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : null)

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', type)
=======
    if (description) setMeta('name', 'description', description)
    if (keywords) setMeta('name', 'keywords', keywords)

    setLink('canonical', canonicalUrl)

    // Robots — noindex for pages that must stay out of the index (e.g. 404)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    if (description) setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', type || 'website')
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_IN')
    setMeta('property', 'og:image', image || DEFAULT_OG_IMAGE)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', `${SITE_NAME} — Full Stack Developer Bootcamp, Ahmedabad`)

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
<<<<<<< HEAD
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image || DEFAULT_OG_IMAGE)

    // JSON-LD structured data (one script tag per page, replaced on route change)
    const JSONLD_ID = 'seo-jsonld'
    let script = document.getElementById(JSONLD_ID)
    if (jsonLdString) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = JSONLD_ID
        document.head.appendChild(script)
      }
      script.textContent = jsonLdString
    } else if (script) {
      script.remove()
    }
  }, [title, description, keywords, image, type, noindex, jsonLdString, pathname])
=======
    if (description) setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image || DEFAULT_OG_IMAGE)

    // Page-level JSON-LD (Course, FAQPage, etc.)
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      const cleanups = blocks.map((block, i) => injectJsonLd(`page-${i}`, block))
      return () => cleanups.forEach(fn => fn())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywords, image, type, noindex, JSON.stringify(jsonLd), pathname])
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
}
