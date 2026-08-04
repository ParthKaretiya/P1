import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      if (barRef.current) barRef.current.style.transform = 'scaleX(0)'
      return
    }

    let rafId = 0
    let lastScrollY = -1

    const compute = () => {
      rafId = 0
      const el = document.documentElement
      if (el.scrollTop === lastScrollY) return
      lastScrollY = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, el.scrollTop / total)) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('orientationchange', schedule)
    window.addEventListener('load', schedule)
    window.visualViewport?.addEventListener('resize', schedule)
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
  }, [pathname, reduce])

  if (reduce) return null

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
