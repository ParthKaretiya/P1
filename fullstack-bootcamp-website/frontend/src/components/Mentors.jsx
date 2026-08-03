import styles from './Mentors.module.css'
import { Reveal, RevealItem } from './Reveal'

/* ⚠ PLACEHOLDER mentors — these are NOT real people. Replace with the
   confirmed, verifiable mentor lineup (real names, roles, experience)
   before launch. If the lineup isn't final, list only confirmed mentors. */
const MENTORS = [
  {
    name: 'Vikram Singh',
    role: 'Senior Software Engineer',
    company: 'Google',
    experience: '8+ Years',
    initials: 'VS'
  },
  {
    name: 'Anjali Sharma',
    role: 'Tech Lead',
    company: 'Amazon',
    experience: '10+ Years',
    initials: 'AS'
  },
  {
    name: 'Rahul Gupta',
    role: 'Full Stack Architect',
    company: 'Microsoft',
    experience: '12+ Years',
    initials: 'RG'
  },
  {
    name: 'Priya Patel',
    role: 'SDE III',
    company: 'Uber',
    experience: '7+ Years',
    initials: 'PP'
  }
]

export default function Mentors() {
  return (
    <section id="mentors" className={styles.section}>
      <div className="container">
        
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-users-viewfinder" style={{ marginRight: '.4rem' }} />
            Mentorship
          </span>
          <h2 className="section-title">
            Learn from the <span className="grad">Best</span>
          </h2>
          <p className="section-desc">
            Get personalized guidance from industry veterans who have built scalable products at top tech companies.
          </p>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {MENTORS.map((m, i) => (
            <RevealItem key={i} className={styles.card}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>{m.initials}</div>
                <div className={styles.linkedin}>
                  <i className="fa-brands fa-linkedin-in" />
                </div>
              </div>
              <h3>{m.name}</h3>
              <p className={styles.role}>{m.role}</p>
              <div className={styles.meta}>
                <span><i className="fa-solid fa-building" /> {m.company}</span>
                <span><i className="fa-solid fa-clock" /> {m.experience}</span>
              </div>
            </RevealItem>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
