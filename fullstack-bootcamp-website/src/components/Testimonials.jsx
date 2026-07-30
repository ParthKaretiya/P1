import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './Testimonials.module.css'
import { Reveal, EASE } from './Reveal'

/* ── PLACEHOLDER testimonials: replace with real student quotes & photos ── */
const TESTIMONIALS = [
  {
    name: 'Rohan Trivedi', batch: 'Batch of 2024', stars: 5, initials: 'RT',
    quote: 'I joined with zero coding knowledge. The mentors broke everything down step by step, and within 10 months I had a portfolio that got me hired.',
  },
  {
    name: 'Ananya Iyer', batch: 'Batch of 2024', stars: 5, initials: 'AI',
    quote: 'The mock interviews and resume workshops made all the difference. I cracked my first interview at a product startup in Ahmedabad.',
  },
  {
    name: 'Jay Prajapati', batch: 'Batch of 2023', stars: 4, initials: 'JP',
    quote: 'Small batch size meant I could actually ask questions. The capstone project became the centerpiece of every interview I gave.',
  },
  {
    name: 'Kavya Bhatt', batch: 'Batch of 2023', stars: 5, initials: 'KB',
    quote: 'Switched from a non-IT job at 26. The evening batch schedule let me learn while working. Best career decision I have made.',
  },
  {
    name: 'Harsh Solanki', batch: 'Batch of 2024', stars: 5, initials: 'HS',
    quote: 'Real projects, real code reviews, real deadlines. It felt like working at a company before I even got the job.',
  },
]

const AUTOPLAY_MS = 5000

/* Slide variants — direction-aware (1 = next, -1 = prev) */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
}

export default function Testimonials() {
  const [[idx, dir], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = useCallback((newIdx, newDir) => {
    setState([(newIdx + TESTIMONIALS.length) % TESTIMONIALS.length, newDir])
  }, [])
  const next = useCallback(() => setState(([i]) => [(i + 1) % TESTIMONIALS.length, 1]), [])
  const prev = () => setState(([i]) => [(i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1])

  /* Autoplay, paused on hover */
  useEffect(() => {
    if (paused) return
    const t = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, next])

  const t = TESTIMONIALS[idx]

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-quote-left" style={{ marginRight: '.4rem' }} />
            Testimonials
          </span>
          <h2 className="section-title">
            What Our <span className="grad">Students Say</span>
          </h2>
          <p className="section-desc">
            Real experiences from students who transformed their careers with us.
          </p>
        </Reveal>

        <Reveal
          className={styles.slider}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className={styles.arrow} onClick={prev} aria-label="Previous testimonial">
            <i className="fa-solid fa-chevron-left" />
          </button>

          {/* One card at a time — AnimatePresence slides between them */}
          <div className={styles.viewport}>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={idx}
                className={styles.slide}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className={styles.card}>
                  <i className={`fa-solid fa-quote-left ${styles.quoteMark}`} />
                  <p className={styles.quote}>{t.quote}</p>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }, (_, s) => (
                      <i
                        key={s}
                        className="fa-solid fa-star"
                        style={{ color: s < t.stars ? 'var(--orange)' : 'var(--gray-200)' }}
                      />
                    ))}
                  </div>
                  <div className={styles.person}>
                    {/* Photo placeholder — swap for <img> when photos exist */}
                    <div className={styles.avatar}>{t.initials}</div>
                    <div>
                      <h4>{t.name}</h4>
                      <span>{t.batch}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={styles.arrow} onClick={next} aria-label="Next testimonial">
            <i className="fa-solid fa-chevron-right" />
          </button>
        </Reveal>

        {/* Dots */}
        <div className={styles.dots}>
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
              onClick={() => go(i, i > idx ? 1 : -1)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
