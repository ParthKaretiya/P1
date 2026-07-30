import { useEffect } from 'react'

/**
 * Custom hook to dynamically update document title, meta description, and keywords
 * for SEO optimization across sub-pages.
 */
export function useSEO({ title, description, keywords }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Nirayush EduTech — Ahmedabad`
    }
    
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', description)
      }
    }

    if (keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]')
      if (metaKw) {
        metaKw.setAttribute('content', keywords)
      }
    }
  }, [title, description, keywords])
}
