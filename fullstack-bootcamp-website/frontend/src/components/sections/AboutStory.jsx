import styles from './AboutStory.module.css'
import { Reveal } from '../Reveal'

const STATS = [
  { num: '12',   label: 'Month Program' },
  { num: '14+',  label: 'Core Modules' },
  { num: '10+',  label: 'Portfolio Projects' },
  { num: '1:1',  label: 'Placement Support' },
]

export default function AboutStory() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>

          {/* Left — text */}
          <Reveal direction="left" className={styles.textCol}>
            <span className="section-tag">
              <i className="fa-solid fa-building-columns" style={{ marginRight: '.4rem' }} />
              Our Origin
            </span>
            <h2 className="section-title">
              Built to Close the <span className="grad">Education–Industry Gap</span>
            </h2>
            <p className={styles.body}>
              Nirayush EdTech was founded on a bold belief — that with the right mentorship and
              practical exposure, any motivated student can become a world-class developer.
            </p>
            <p className={styles.body}>
              We kept meeting talented graduates who had degrees but had never shipped anything real.
              So we built a 12-month, project-first curriculum with industry practitioners — and we're
              now enrolling our founding batch in Ahmedabad.
            </p>
            <p className={styles.body}>
              Our approach is simple: teach the way the industry works, not the way textbooks describe it.
              Every project is real. Every mentor is a practitioner. Our founding batch will be our proof.
            </p>
          </Reveal>

          {/* Right — stats + image placeholder */}
          <Reveal direction="right" className={styles.visualCol}>
            <div className={styles.statsGrid}>
              {STATS.map((s, i) => (
                <div key={i} className={styles.statCard}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBanner}>
              <i className="fa-solid fa-location-dot" />
              <div>
                <strong>Headquartered in Ahmedabad</strong>
                <span>Skyleaf, Near Sardardham, Khodiyar, Ahmedabad – 382421</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
