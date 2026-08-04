import { m } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

export default function PageTransition({ children }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </m.div>
  )
}
