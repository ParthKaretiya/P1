import { Link } from 'react-router-dom'
import styles from './HomeCoursesPreview.module.css'
import { Reveal, RevealItem } from '../Reveal'

const COURSES = [
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Full Stack Developer',
    subtitle: 'MERN Stack · 12 Months',
    desc: 'Master React, Node.js, Express, MongoDB and build 10+ real-world projects from scratch to deployment.',
    badge: 'Most Popular',
    badgeColor: '#dd6b20',
    modules: 14,
    href: '/courses/fullstack-developer',
  },
  {
    icon: 'fa-brands fa-react',
    title: 'React Specialisation',
    subtitle: 'Frontend Focused · 6 Months',
    desc: 'Deep dive into React, Redux Toolkit, Next.js, TypeScript, and modern frontend architecture patterns.',
    badge: 'In Demand',
    badgeColor: '#2563eb',
    modules: 8,
    href: '/courses',
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Node.js Backend Track',
    subtitle: 'Backend Focused · 6 Months',
    desc: 'REST APIs, WebSockets, Authentication, MongoDB, Redis, Docker, CI/CD — everything backend.',
    badge: 'New',
    badgeColor: '#16a34a',
    modules: 8,
    href: '/courses',
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
