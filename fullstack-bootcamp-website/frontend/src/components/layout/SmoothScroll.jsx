import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const { pathname, hash } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    /* Lenis is dynamically imported so it stays out of the critical bundle —
       smooth scrolling isn't needed for first paint, and this shaves ~10KB
       off the JS that gates LCP. */
    let cancelled = false
    let rafId = 0
    let lenis = null

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return

      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenisRef.current = null
      window.lenis = null
    }
  }, [reduce])

  useEffect(() => {
    if (reduce || !lenisRef.current) {
      if (hash) {
        const targetEl = document.querySelector(hash)
        if (targetEl) {
          setTimeout(() => {
            const top = targetEl.getBoundingClientRect().top + window.scrollY - 90
            window.scrollTo({ top, behavior: 'auto' })
          }, 100)
        }
        return
      }
      if (!lenisRef.current) window.scrollTo(0, 0)
      return
    }

    if (hash) {
      const targetEl = document.querySelector(hash)
      if (targetEl) {
        setTimeout(() => {
          lenisRef.current?.scrollTo(targetEl, { offset: -90, duration: 1.4 })
        }, 100)
        return
      }
    }

    lenisRef.current.scrollTo(0, { immediate: true })
  }, [pathname, hash, reduce])

  return children
}
