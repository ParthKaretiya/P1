import styles from './Eligibility.module.css'
import { Reveal } from './Reveal'
import { useMagnetic } from '../hooks/useMagnetic'

const criteria = [
  {
    icon: 'fa-solid fa-school',
    title: '10th & 12th Standard',
    desc: 'Minimum 60% marks in both 10th and 12th standard from any recognized board.',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Undergraduate / PG Degree',
    desc: 'Minimum 6.0 CGPA in BCA, B.Sc IT, Diploma (Comp.), BE, B.Tech, MCA, or M.Sc. IT.',
  },
]

const features = [
  { icon: 'fa-solid fa-check-circle', text: 'Flexible batch timings (morning & evening)' },
  { icon: 'fa-solid fa-check-circle', text: 'Weekend crash courses available' },
  { icon: 'fa-solid fa-check-circle', text: 'Doubt-clearing sessions every week' },
  { icon: 'fa-solid fa-check-circle', text: 'Access to recorded lectures 24/7' },
]

export default function Eligibility() {
  const applyRef = useMagnetic()
  return (
    <section id="eligibility" className={styles.section}>
      <div className="container">

        {/* Section header */}
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-clipboard-list" style={{ marginRight: '.4rem' }} />
            Eligibility
          </span>
          <h2 className="section-title">
            Who Can <span className="grad">Join?</span>
          </h2>
          <p className="section-desc">
            Open to all aspiring developers who meet these criteria. Scholarships available for high achievers!
          </p>
        </Reveal>

        <div className={styles.inner}>

          {/* ── Left: criteria cards ─────────────────────────── */}
          <Reveal direction="left" className={styles.cardsCol}>
            {criteria.map((c, i) => (
              <div key={i} className={styles.eligCard}>
                <div className={styles.eligIcon}>
                  <i className={c.icon} />
                </div>
                <div className={styles.eligText}>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}

            {/* Scholarship banner */}
            <div className={styles.scholarship}>
              <i className="fa-solid fa-trophy" />
              <div>
                <h3>🎓 Scholarship Available!</h3>
                <p>Students with above <strong>7 CGPA</strong> are eligible for a merit-based scholarship. Apply today!</p>
              </div>
            </div>
          </Reveal>

          {/* ── Right: duration card ─────────────────────────── */}
          <Reveal direction="right" className={styles.durationCol}>
            <div className={styles.durationCard}>
              <p className={styles.durationLabel}>Course Duration</p>
              <div className={styles.durationNum}>12</div>
              <p className={styles.durationUnit}>Months</p>

              <div className={styles.divider} />

              <ul className={styles.features}>
                {features.map((f, i) => (
                  <li key={i}>
                    <i className={f.icon} />
                    {f.text}
                  </li>
                ))}
              </ul>

              <a
                ref={applyRef}
                href="#contact"
                className="btn btn-primary"
                style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <i className="fa-solid fa-paper-plane" />
                Apply Now
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
