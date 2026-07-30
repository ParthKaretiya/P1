import styles from './WhyUs.module.css'
import { Reveal, RevealItem } from './Reveal'

const reasons = [
  {
    icon: 'fa-solid fa-industry',
    title: 'Industry-Ready Curriculum',
    desc: 'Courses designed in collaboration with top tech companies. Every module reflects real-world workplace demands.',
  },
  {
    icon: 'fa-solid fa-chalkboard-user',
    title: 'Expert Mentors & Guidance',
    desc: 'Learn directly from engineers with 5–15 years of industry experience at MNCs and startups.',
  },
  {
    icon: 'fa-solid fa-code',
    title: 'Real-Time Projects',
    desc: 'Build 10+ live projects, a polished portfolio, and a capstone full-stack application ready for employers.',
  },
  {
    icon: 'fa-solid fa-handshake-angle',
    title: '100% Placement Assistance',
    desc: 'Resume workshops, mock interviews, LinkedIn optimization, and dedicated placement drives with partner companies.',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-star" style={{ marginRight: '.4rem' }} />
            Why Choose Us
          </span>
          <h2 className="section-title">
            Built for the <span className="grad">Modern Developer</span>
          </h2>
          <p className="section-desc">
            We don't just teach code — we shape careers. Here's what sets Nirayush EduTech apart.
          </p>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {reasons.map((r, i) => (
            <RevealItem key={i} className={styles.card}>
              <div className={styles.iconWrap}>
                <i className={r.icon} />
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
