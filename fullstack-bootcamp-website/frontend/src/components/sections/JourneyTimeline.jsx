import styles from './JourneyTimeline.module.css'
import { Reveal } from '../Reveal'

/* Honest roadmap: where we are and where we're going — no fabricated history.
   Update "Now"/future entries as real milestones are achieved. */
const MILESTONES = [
  { year: 'The Idea',   icon: 'fa-solid fa-seedling',   title: 'Why We Started',          desc: 'Too many talented graduates finish degrees without ever building real software. We set out to fix that in Ahmedabad.' },
  { year: 'Building',   icon: 'fa-solid fa-laptop-code', title: 'Curriculum Designed',     desc: 'A 12-month, project-first curriculum built with working engineers — 14+ core modules from HTML to deployment.' },
  { year: 'Building',   icon: 'fa-solid fa-handshake',   title: 'Growing Our Network',     desc: 'Actively building relationships with tech companies and startups across Gujarat to open doors for our graduates.' },
  { year: 'Now',        icon: 'fa-solid fa-rocket',      title: 'Founding Batch Enrolling', desc: 'Our first batch is now open — deliberately small, so every student gets direct mentor attention and 1:1 career support.' },
  { year: 'Month 1–8',  icon: 'fa-solid fa-code',        title: 'Learn & Build',           desc: 'Fundamentals to full stack: live classes, labs, code reviews, and 10+ portfolio projects along the way.' },
  { year: 'Month 9–12', icon: 'fa-solid fa-briefcase',   title: 'Career Preparation',      desc: 'Capstone project plus dedicated placement prep — resume, mock interviews, and introductions to our hiring network.' },
  { year: 'Ahead',      icon: 'fa-solid fa-star',        title: 'Our Graduates, Our Proof', desc: 'The founding batch\'s outcomes will be our first real track record — published honestly, as they happen.' },
]

export default function JourneyTimeline() {
  return (
    <section className={`${styles.section} texture-grain`}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-timeline" style={{ marginRight: '.4rem' }} />
            Our Roadmap
          </span>
          <h2 className="section-title">
            Where We Are & <span className="grad">Where We're Going</span>
          </h2>
          <p className="section-desc">
            We're at the start of our journey — here's the honest picture, and the plan.
          </p>
        </Reveal>

        <div className={styles.timeline}>
          {MILESTONES.map((m, i) => (
            <Reveal
              key={i}
              direction={i % 2 === 0 ? 'left' : 'right'}
              className={`${styles.item} ${i % 2 === 0 ? styles.itemLeft : styles.itemRight}`}
            >
              <div className={styles.node}>
                <div className={styles.year}>{m.year}</div>
                <div className={styles.dot}><i className={m.icon} /></div>
              </div>
              <div className={styles.card}>
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
