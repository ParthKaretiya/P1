import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ultra smooth exponential inertia decay
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  // Handle page transitions and anchor links smoothly
  useEffect(() => {
    if (!lenisRef.current) return

    if (hash) {
      const targetEl = document.querySelector(hash)
      if (targetEl) {
        // Smooth scroll to anchor element with offset for fixed header
        setTimeout(() => {
          lenisRef.current?.scrollTo(targetEl, { offset: -90, duration: 1.4 })
        }, 100)
        return
      }
    }

    // Scroll to top immediately on new page navigation
    lenisRef.current.scrollTo(0, { immediate: true })
  }, [pathname, hash])

  return children
}
