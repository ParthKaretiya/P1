import styles from './AboutStory.module.css'
import { Reveal } from '../Reveal'

const STATS = [
  { num: '500+', label: 'Students Placed' },
  { num: '98%',  label: 'Satisfaction Rate' },
  { num: '50+',  label: 'Hiring Partners' },
  { num: '7+',   label: 'Years of Excellence' },
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
              From a Small Class to <span className="grad">Ahmedabad's Best</span>
            </h2>
            <p className={styles.body}>
              Nirayush EduTech started with a single classroom and a bold belief — that with the right
              mentorship and practical exposure, any motivated student could become a world-class developer.
            </p>
            <p className={styles.body}>
              Today, with 500+ placed graduates, 50+ hiring partners across Gujarat and beyond, and a
              curriculum co-designed with industry professionals, we have become Ahmedabad's most trusted
              full stack developer training institution.
            </p>
            <p className={styles.body}>
              Our approach is simple: teach the way the industry works, not the way textbooks describe it.
              Every project is real. Every mentor is a practitioner. Every placement is evidence.
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
