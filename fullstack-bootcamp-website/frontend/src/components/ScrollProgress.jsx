import { useScroll, useSpring, motion, useReducedMotion } from 'motion/react'
import styles from './ScrollProgress.module.css'

/* Thin electric-blue progress bar pinned to the top of the viewport.
   Driven by Motion's useScroll — scaleX transform only, so it never
   triggers layout. A light spring smooths fast scroll jumps. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const smooth = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
      aria-hidden="true"
    />
  )
}
