import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, animate, useReducedMotion } from 'motion/react'
import styles from './Placement.module.css'
import { Reveal } from './Reveal'

const ALUMNI = [
  { name: 'Raj Patel',    company: 'TechNova',   role: 'Full Stack Developer',  initials: 'RP', pkg: '6.2 LPA' },
  { name: 'Sneha Shah',   company: 'CodeWorks',  role: 'React Developer',       initials: 'SS', pkg: '5.5 LPA' },
  { name: 'Amit Verma',   company: 'PixelSoft',  role: 'Backend Engineer',      initials: 'AV', pkg: '7.0 LPA' },
  { name: 'Priya Mehta',  company: 'CloudNine',  role: 'MERN Stack Developer',  initials: 'PM', pkg: '5.8 LPA' },
  { name: 'Karan Joshi',  company: 'DevHouse',   role: 'Software Engineer',     initials: 'KJ', pkg: '6.8 LPA' },
  { name: 'Nidhi Desai',  company: 'TechNova',   role: 'Frontend Developer',    initials: 'ND', pkg: '5.2 LPA' },
]

const PACKAGE_TREND = [3.2, 3.8, 4.1, 4.6, 5.2, 5.8, 6.4]
const SPRING_EASE = [0.16, 1, 0.3, 1]

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

function SparkLine({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  const W = 280, H = 60, PAD = 4
  const min = Math.min(...data), max = Math.max(...data)
  const x = i => PAD + (i / (data.length - 1)) * (W - PAD * 2)
  const y = v => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)

  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${H - PAD} L${x(0)},${H - PAD} Z`

  return (
    <div ref={ref} className={styles.sparkWrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.sparkSvg} role="img" aria-label="Package growth trend">
        <defs>
          <linearGradient id="sparkGradCorp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#sparkGradCorp)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#ea580c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={reduce ? { duration: 0 } : { duration: 1.2, ease: SPRING_EASE }}
        />
      </svg>
    </div>
  )
}

export default function Placement() {
  return (
    <section id="placement" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className={styles.sectionTag}>
            <i className="fa-solid fa-briefcase" />
            Career Outcomes
          </span>
          <h2 className={styles.sectionTitle}>
            Careers We've <span className={styles.accent}>Launched</span>
          </h2>
          <p className={styles.sectionDesc}>
            Our graduates work at leading product companies, high-growth startups, and top IT firms across India.
          </p>
        </Reveal>

        {/* ─── Corporate Metric Cards ─────────────────────────────── */}
        <div className={styles.metricsGrid}>
          {/* Card 1: Placement Rate */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Placement Rate</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-circle-check" />
              </div>
            </div>
            <div className={styles.metricValue}>
              <CountUp to={100} suffix="%" duration={1.6} />
            </div>
            <p className={styles.metricDesc}>100% placement assistance through dedicated career coaching & resume building.</p>
          </div>

          {/* Card 2: Total Placed */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Graduates Placed</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-user-graduate" />
              </div>
            </div>
            <div className={styles.metricValue}>
              <CountUp to={500} suffix="+" duration={1.6} />
            </div>
            <p className={styles.metricDesc}>Over 500 alumni working in full stack, frontend, and backend engineering roles.</p>
          </div>

          {/* Card 3: Avg Package Growth */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Average Package</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-arrow-trend-up" />
              </div>
            </div>
            <div className={styles.metricValue}>
              ₹4–8 <span className={styles.unit}>LPA</span>
            </div>
            <SparkLine data={PACKAGE_TREND} />
            <p className={styles.metricDesc}>Up to 8.2 LPA highest starting package in recent batches.</p>
          </div>

          {/* Card 4: Hiring Partners */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Hiring Network</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-building" />
              </div>
            </div>
            <div className={styles.metricValue}>
              <CountUp to={50} suffix="+" duration={1.4} />
            </div>
            <p className={styles.metricDesc}>Active hiring partnerships with top software product & service companies.</p>
          </div>
        </div>

        {/* ─── Alumni Showcase ─────────────────────────────────── */}
        <Reveal className={styles.alumniSection}>
          <h3 className={styles.alumniTitle}>Recent Alumni Placements</h3>
          <div className={styles.alumniGrid}>
            {ALUMNI.map((a, i) => (
              <motion.div
                key={a.name}
                className={styles.alumniCard}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className={styles.alumniHeader}>
                  <div className={styles.avatar}>{a.initials}</div>
                  <span className={styles.pkgBadge}>{a.pkg}</span>
                </div>
                <h4 className={styles.alumniName}>{a.name}</h4>
                <p className={styles.alumniRole}>{a.role}</p>
                <div className={styles.companyRow}>
                  <i className="fa-solid fa-building" />
                  <span>Placed at <strong>{a.company}</strong></span>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <div className={styles.ctaRow}>
          <a href="/placements" className={styles.ctaBtn}>
            View Detailed Placement Report
            <i className="fa-solid fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  )
}
