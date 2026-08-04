import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let rafId = 0

    const compute = () => {
      rafId = 0
      const el = document.documentElement
      // Read fresh on every tick — mobile address-bar collapse/expand changes
      // clientHeight mid-scroll, so these must never be cached.
      const total = el.scrollHeight - el.clientHeight
      // Guard: non-scrollable page (content fits one viewport) → 0%, never
      // NaN/Infinity. Clamp [0,1] absorbs iOS rubber-band overscroll, which
      // reports scrollTop outside the normal range.
      const progress = total > 0 ? Math.min(1, Math.max(0, el.scrollTop / total)) : 0
      // scaleX on a transform-only layer — no layout/reflow per tick
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }

    // Coalesce event bursts into at most one update per animation frame
    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(compute)
    }

    compute() // reflect restored/current scroll position immediately on mount & route change
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('orientationchange', schedule)
    window.addEventListener('load', schedule)
    // Mobile browsers resize the visual viewport (not always the window) when
    // the address bar shows/hides
    window.visualViewport?.addEventListener('resize', schedule)
    // Late-loading images/fonts/lazy route chunks change document height
    // without firing scroll or resize — observe content height directly
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('orientationchange', schedule)
      window.removeEventListener('load', schedule)
      window.visualViewport?.removeEventListener('resize', schedule)
      ro.disconnect()
    }
  }, [pathname])

  return (
    <div className={styles.track}>
      <div ref={barRef} className={styles.bar} style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
