import { useEffect } from 'react'

const DEVICON_HREF = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css'

/**
 * Injects the Devicon stylesheet on demand. Only /courses and /courses/:id
 * use devicon-* classes, so the ~90KB CSS is loaded here instead of globally
 * in index.html. The <link> is left in place once added (cheap, cached).
 */
export function useDevicon() {
  useEffect(() => {
    if (document.querySelector(`link[href="${DEVICON_HREF}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = DEVICON_HREF
    document.head.appendChild(link)
  }, [])
}
