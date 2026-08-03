import styles from './VisionValues.module.css'
import { Reveal, RevealItem } from '../Reveal'

const VALUES = [
  {
    icon: 'fa-solid fa-bullseye',
    title: 'Our Mission',
    color: 'var(--orange-deep)',
    body: 'To democratize quality software education by making world-class, industry-aligned training accessible to every aspiring developer in India.',
  },
  {
    icon: 'fa-solid fa-eye',
    title: 'Our Vision',
    color: '#2563eb',
    body: "To become India's most trusted destination for full stack developer education, measured by student success, not just enrollment numbers.",
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Industry First',
    color: '#16a34a',
    body: 'Every module is co-created with industry professionals. We teach what companies actually hire for, not just theoretical concepts.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Integrity & Transparency',
    color: 'var(--navy-mid)',
    body: 'Honest fee structures, realistic placement expectations, and open communication with students throughout their learning journey.',
  },
]

export default function VisionValues() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-compass" style={{ marginRight: '.4rem' }} />
            Mission & Values
          </span>
          <h2 className="section-title">
            What Drives <span className="grad">Everything We Do</span>
          </h2>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {VALUES.map((v, i) => (
            <RevealItem key={i} className={styles.card}>
              <div className={styles.iconWrap} style={{ '--c': v.color }}>
                <i className={v.icon} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
