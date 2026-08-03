import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      // Guard: on a non-scrollable page (or before content settles) total
      // is 0/negative — clamp to 0% instead of dividing.
      setProgress(total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0)
    }
    onScroll() // compute immediately on mount/route change, not only on first scroll
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    // Recompute once images/fonts finish loading and the page reaches final height
    window.addEventListener('load', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', onScroll)
    }
  }, [pathname])

  return (
    <div className={styles.track}>
      <div className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  )
}
