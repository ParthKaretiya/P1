import { useState, useEffect } from 'react'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      id="back-top"
      className={`${styles.btn} ${visible ? styles.show : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
    >
      <i className="fa-solid fa-chevron-up" />
    </button>
  )
}
