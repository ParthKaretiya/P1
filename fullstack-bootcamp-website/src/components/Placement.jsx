import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, animate, useReducedMotion } from 'motion/react'
import styles from './Placement.module.css'
import { Reveal, RevealItem } from './Reveal'

/* ── PLACEHOLDER DATA: replace with real placement stats & alumni ── */
const ALUMNI = [
  { name: 'Raj Patel',     company: 'TechNova',  role: 'Full Stack Developer', initials: 'RP' },
  { name: 'Sneha Shah',    company: 'CodeWorks', role: 'React Developer',      initials: 'SS' },
  { name: 'Amit Verma',    company: 'PixelSoft', role: 'Backend Engineer',     initials: 'AV' },
  { name: 'Priya Mehta',   company: 'CloudNine', role: 'MERN Stack Developer', initials: 'PM' },
  { name: 'Karan Joshi',   company: 'DevHouse',  role: 'Software Engineer',    initials: 'KJ' },
  { name: 'Nidhi Desai',   company: 'TechNova',  role: 'Frontend Developer',   initials: 'ND' },
]

/* PLACEHOLDER trend data — average package (LPA) across recent batches.
   Replace with real figures when available. */
const PACKAGE_TREND = [3.2, 3.8, 4.1, 4.6, 5.2, 5.8, 6.4]

const SPRING_EASE = [0.16, 1, 0.3, 1]

/* ── Animated counting number (500+ students) ─────────────────── */
function CountUp({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const value = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setDisplay(to); return }
    const controls = animate(value, to, {
      duration,
      ease: SPRING_EASE,
      onUpdate: v => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration, value])

  return <span ref={ref}>{display}{suffix}</span>
}

/* ── Ring / donut chart — 100% placement rate ─────────────────── */
function RingChart({ percent }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  const R = 52
  const CIRC = 2 * Math.PI * R
  const target = CIRC * (1 - percent / 100)

  return (
    <div className={styles.ringWrap} ref={ref}>
      <svg viewBox="0 0 128 128" className={styles.ringSvg} role="img"
           aria-label={`${percent}% placement rate`}>
        {/* Track */}
        <circle cx="64" cy="64" r={R} fill="none"
                stroke="rgba(255,255,255,.12)" strokeWidth="10" />
        {/* Fill — draws in from 0 when scrolled into view */}
        <motion.circle
          cx="64" cy="64" r={R} fill="none"
          stroke="var(--orange)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={CIRC}
          transform="rotate(-90 64 64)"
          initial={{ strokeDashoffset: CIRC }}
          animate={inView ? { strokeDashoffset: target } : {}}
          transition={reduce ? { duration: 0 } : { duration: 1.6, ease: SPRING_EASE }}
        />
      </svg>
      <div className={styles.ringLabel}>
        <span className={styles.statNum}><CountUp to={percent} suffix="%" /></span>
        <span className={styles.statLabel}>Placement Rate</span>
      </div>
    </div>
  )
}

/* ── Sparkline / area chart — average package growth ──────────── */
function SparkArea({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  const W = 220, H = 72, PAD = 4
  const min = Math.min(...data), max = Math.max(...data)
  const x = i => PAD + (i / (data.length - 1)) * (W - PAD * 2)
  const y = v => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)

  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${H - PAD} L${x(0)},${H - PAD} Z`

  return (
    <div ref={ref} className={styles.sparkWrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.sparkSvg} role="img"
           aria-label="Average package growth across recent batches">
        <motion.path
          d={area}
          fill="rgba(246,173,85,.18)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={reduce ? { duration: 0 } : { duration: .8, delay: .6, ease: SPRING_EASE }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="var(--orange)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={reduce ? { duration: 0 } : { duration: 1.4, ease: SPRING_EASE }}
        />
      </svg>
      <span className={styles.statNum}>₹4–8 LPA</span>
      <span className={styles.statLabel}>Average Package Growth</span>
    </div>
  )
}

export default function Placement() {
  return (
    <section id="placement" className={styles.section}>
      <div className="container">

        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-briefcase" style={{ marginRight: '.4rem' }} />
            Placement Success
          </span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            Careers We've <span className="grad" style={{ color: 'var(--orange-deep)' }}>Launched</span>
          </h2>
          <p className="section-desc" style={{ color: 'var(--gray-200)' }}>
            Our graduates work at product companies, startups, and IT services firms across India.
          </p>
        </Reveal>

        {/* Stat cards — ring chart, students counter, package sparkline */}
        <Reveal stagger className={styles.stats}>
          <RevealItem className={styles.statCard}>
            <RingChart percent={100} />
          </RevealItem>

          <RevealItem className={styles.statCard}>
            <div className={styles.statIcon}>
              <i className="fa-solid fa-user-graduate" />
            </div>
            <span className={styles.statNum}>
              <CountUp to={500} suffix="+" />
            </span>
            <span className={styles.statLabel}>Students Placed</span>
          </RevealItem>

          <RevealItem className={styles.statCard}>
            <SparkArea data={PACKAGE_TREND} />
          </RevealItem>
        </Reveal>

        {/* Alumni scroller */}
        <Reveal className={styles.alumniWrap}>
          <div className={styles.alumniRow}>
            {ALUMNI.map(a => (
              <div key={a.name} className={styles.alumniCard}>
                {/* Photo placeholder — swap for <img> when photos are available */}
                <div className={styles.avatar}>{a.initials}</div>
                <h4>{a.name}</h4>
                <p className={styles.placedAt}>
                  Placed at <strong>{a.company}</strong>
                </p>
                <span className={styles.role}>{a.role}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className={styles.moreWrap}>
          {/* Placeholder link — point to the dedicated success-stories page when built */}
          <a href="#contact" className="btn btn-outline-dark" onClick={e => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            View All Success Stories
            <i className="fa-solid fa-arrow-right" />
          </a>
        </div>

      </div>
    </section>
  )
}
