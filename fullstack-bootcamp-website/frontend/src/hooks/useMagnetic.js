import { useEffect, useRef } from 'react'
import { animate } from 'motion'

/**
 * useMagnetic — pulls an element slightly toward the pointer while it hovers,
 * springing back to rest on leave. Returns a ref to attach to the element.
 *
 * Respects prefers-reduced-motion and skips devices without a fine pointer
 * (touch), where the effect is meaningless and the listeners would be wasted.
 *
 * @param {number} strength  How far the element travels toward the pointer,
 *                           as a fraction of the pointer's offset (0–1).
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      animate(
        el,
        { x: relX * strength, y: relY * strength },
        { type: 'spring', stiffness: 350, damping: 20, mass: 0.6 },
      )
    }

    const onLeave = () => {
      animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 18 })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      animate(el, { x: 0, y: 0 }, { duration: 0 })
    }
  }, [strength])

  return ref
}
