import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const SITE_URL = 'https://www.nirayush.com'
export const SITE_NAME = 'Nirayush EduTech'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

/** Create-or-update a <meta> tag identified by name= or property=. */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Create-or-update a <link> tag identified by rel=. */
function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
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

    const fullTitle = title
      ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`)
      : `${SITE_NAME} — Full Stack Developer Bootcamp Ahmedabad`
    document.title = fullTitle

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
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_IN')
    setMeta('property', 'og:image', image || DEFAULT_OG_IMAGE)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', `${SITE_NAME} — Full Stack Developer Bootcamp, Ahmedabad`)

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
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
}
