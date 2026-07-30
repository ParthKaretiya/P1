import styles from './CareerRoadmap.module.css'
import { Reveal, RevealItem } from '../Reveal'

const STEPS = [
  { step: '01', title: 'Resume Building & Portfolio Review', desc: 'Craft ATS-friendly developer resumes and showcase your 10+ live projects on GitHub.' },
  { step: '02', title: 'Mock Interviews & Tech Drills', desc: '1-on-1 mock technical interviews covering Data Structures, Web Concepts, and Coding Challenges.' },
  { step: '03', title: 'Partner Referrals & Shortlisting', desc: 'Direct resume forwarding to our network of 50+ hiring partners in Gujarat & pan-India.' },
  { step: '04', title: 'Technical Rounds & HR Negotiation', desc: 'Guidance through company interviews, salary negotiation, and contract finalization.' },
]

export default function CareerRoadmap() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-route" style={{ marginRight: '.4rem' }} />
            Placement Process
          </span>
          <h2 className="section-title">
            How We Get You <span className="grad">Hired</span>
          </h2>
          <p className="section-desc">
            A step-by-step career acceleration framework designed to transition you from learner to hired professional.
          </p>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {STEPS.map((s, i) => (
            <RevealItem key={i} className={styles.card}>
              <span className={styles.num}>{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
