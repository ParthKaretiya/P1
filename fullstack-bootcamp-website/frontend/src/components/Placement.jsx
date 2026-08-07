import { useRef, useEffect, useState } from 'react'
import { m, useInView, useMotionValue, animate, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import styles from './Placement.module.css'
import { Reveal } from './Reveal'

/* Placement support pillars — describes the service we commit to,
   not historical outcomes (this is our founding batch). */
const SUPPORT_PILLARS = [
  { title: 'Resume & LinkedIn',     desc: 'Professional resume building and LinkedIn profile optimization with your mentor.',       icon: 'fa-solid fa-file-lines',        initials: 'CV' },
  { title: 'Mock Interviews',       desc: 'Repeated technical and HR mock interviews with detailed feedback before real ones.',     icon: 'fa-solid fa-comments',          initials: 'MI' },
  { title: 'Portfolio Reviews',     desc: 'Capstone and project portfolio polished to industry presentation standards.',            icon: 'fa-solid fa-briefcase',         initials: 'PF' },
  { title: 'DSA & System Prep',     desc: 'Structured practice for coding rounds, problem solving, and system design basics.',      icon: 'fa-solid fa-code',              initials: 'DS' },
  { title: 'Company Introductions', desc: 'Direct introductions to companies in our growing hiring network as it develops.',        icon: 'fa-solid fa-handshake',         initials: 'HR' },
  { title: 'Offer Guidance',        desc: 'Salary negotiation and offer evaluation guidance when interviews convert.',              icon: 'fa-solid fa-file-signature',    initials: 'OG' },
]

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

export default function Placement() {
  return (
    <section id="placement" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className={styles.sectionTag}>
            <i className="fa-solid fa-briefcase" />
            Your Career Path
          </span>
          <h2 className={styles.sectionTitle}>
            What You Can <span className={styles.accent}>Expect</span>
          </h2>
          <p className={styles.sectionDesc}>
            We're building this program to get our founding batch job-ready — here's the support we commit to and the industry benchmarks we prepare you for.
          </p>
        </Reveal>

        {/* ─── Corporate Metric Cards ─────────────────────────────── */}
        <div className={styles.metricsGrid}>
          {/* Card 1: Placement Support */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Placement Support</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-circle-check" />
              </div>
            </div>
            <div className={styles.metricValue}>
              1:1
            </div>
            <p className={styles.metricDesc}>Dedicated career coaching, resume building & interview prep for every founding batch student.</p>
          </div>

          {/* Card 2: Training Duration */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Career Prep Phase</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-user-graduate" />
              </div>
            </div>
            <div className={styles.metricValue}>
              <CountUp to={4} suffix=" Months" duration={1.2} />
            </div>
            <p className={styles.metricDesc}>From month 9 onward, dedicated placement preparation runs alongside your capstone project.</p>
          </div>

          {/* Card 3: Industry Benchmark Package */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Industry Benchmark</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-arrow-trend-up" />
              </div>
            </div>
            <div className={styles.metricValue}>
              ₹4–8 <span className={styles.unit}>LPA</span>
            </div>
            <p className={styles.metricDesc}>Typical industry starting range for entry-level full stack developers in India — the roles we train you to compete for.</p>
          </div>

          {/* Card 4: Portfolio Projects */}
          <div className={styles.metricCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTag}>Portfolio Projects</span>
              <div className={styles.cardIcon}>
                <i className="fa-solid fa-building" />
              </div>
            </div>
            <div className={styles.metricValue}>
              <CountUp to={10} suffix="+" duration={1.4} />
            </div>
            <p className={styles.metricDesc}>Real-world projects and a capstone you'll build and present to employers as proof of skill.</p>
          </div>
        </div>

        {/* ─── Placement Support Pillars ─────────────────────────── */}
        <Reveal className={styles.alumniSection}>
          <h3 className={styles.alumniTitle}>How We Prepare You to Get Hired</h3>
          <div className={styles.alumniGrid}>
            {SUPPORT_PILLARS.map((p, i) => (
              <m.div
                key={p.title}
                className={styles.alumniCard}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className={styles.alumniHeader}>
                  <div className={styles.avatar}><i className={p.icon} /></div>
                </div>
                <h4 className={styles.alumniName}>{p.title}</h4>
                <p className={styles.alumniRole}>{p.desc}</p>
              </m.div>
            ))}
          </div>
        </Reveal>

        {/* ─── Placement Eligibility Notice ──────────────────────── */}
        <Reveal>
          <div className={styles.attendanceNotice}>
            <i className="fa-solid fa-circle-info" />
            <p>
              <strong>Placement Support Eligibility:</strong> A minimum of{' '}
              <strong>80% attendance</strong> throughout the program is required
              to qualify for our placement support services.
            </p>
          </div>
        </Reveal>

        <div className={styles.ctaRow}>
          <Link to="/placements" className={styles.ctaBtn}>
            See How Placement Support Works
            <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  )
}
