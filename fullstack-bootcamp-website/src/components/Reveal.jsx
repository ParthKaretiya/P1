import { motion } from 'motion/react'

/* Shared scroll-reveal primitives (Motion) — replaces the old
   .animate-on-scroll IntersectionObserver + CSS classes.
   Spring easing matches the site-wide design language. */

export const EASE = [0.16, 1, 0.3, 1]

const OFFSETS = {
  up:    { y: 32 },
  left:  { x: -32 },
  right: { x: 32 },
}

/* Variants for staggered children — use with <Reveal stagger> */
export const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/**
 * <Reveal>            — fade + slide up when scrolled into view
 * <Reveal direction>  — 'up' | 'left' | 'right'
 * <Reveal stagger>    — parent only orchestrates; wrap children in <RevealItem>
 */
export function Reveal({ direction = 'up', stagger = false, className, children, ...rest }) {
  const off = OFFSETS[direction]
  const variants = stagger
    ? {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }
    : {
        hidden: { opacity: 0, ...off },
        show:   { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE } },
      }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ className, children, ...rest }) {
  return (
    <motion.div className={className} variants={item} {...rest}>
      {children}
    </motion.div>
  )
}
