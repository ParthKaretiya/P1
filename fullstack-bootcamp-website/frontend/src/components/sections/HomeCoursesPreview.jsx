import { Link } from 'react-router-dom'
import styles from './HomeCoursesPreview.module.css'
import { Reveal, RevealItem } from '../Reveal'

const COURSES = [
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Full Stack Developer',
    subtitle: 'MERN Stack · 12 Months',
    desc: 'Master React, Node.js, Express, MongoDB and build 10+ real-world projects from scratch to deployment.',
    badge: 'Enrolling Now',
    badgeColor: '#dd6b20',
    modules: 14,
    href: '/courses/fullstack-developer',
  },
]

export default function HomeCoursesPreview() {
  return (
    <section id="courses-preview" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-book-open" style={{ marginRight: '.4rem' }} />
            Our Programs
          </span>
          <h2 className="section-title">
            Programs Built for the <span className="grad">Real World</span>
          </h2>
          <p className="section-desc">
            Practical, structured programs designed to take you from zero to job-ready.
          </p>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {COURSES.map((c, i) => (
            <RevealItem key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <i className={c.icon} />
                </div>
                <span className={styles.badge} style={{ background: c.badgeColor }}>{c.badge}</span>
              </div>
              <h3>{c.title}</h3>
              <p className={styles.subtitle}>{c.subtitle}</p>
              <p className={styles.desc}>{c.desc}</p>
              <div className={styles.meta}>
                <span><i className="fa-solid fa-cube" /> {c.modules} Modules</span>
                <span><i className="fa-solid fa-certificate" /> Certificate</span>
                <span><i className="fa-solid fa-handshake-angle" /> Placement Support</span>
              </div>
              <Link to={c.href} className={styles.cta}>
                View Details <i className="fa-solid fa-arrow-right" />
              </Link>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className={styles.viewAll}>
          <Link to="/courses" className="btn btn-outline-dark">
            View All Programs <i className="fa-solid fa-arrow-right" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
