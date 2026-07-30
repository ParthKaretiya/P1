import styles from './JourneyTimeline.module.css'
import { Reveal } from '../Reveal'

const MILESTONES = [
  { year: '2018', icon: 'fa-solid fa-seedling',      title: 'Founded',            desc: 'Nirayush EduTech opens its doors in Ahmedabad with a vision to bridge the education-industry gap.' },
  { year: '2019', icon: 'fa-solid fa-users',          title: 'First 50 Graduates', desc: 'Our pioneering batch of 50 students achieves 94% placement within 3 months of completion.' },
  { year: '2020', icon: 'fa-solid fa-laptop-code',    title: 'Online Expansion',   desc: 'Launched hybrid learning model with recorded lectures and live sessions to reach students statewide.' },
  { year: '2021', icon: 'fa-solid fa-handshake',      title: '20+ Hiring Partners',desc: 'Signed placement agreements with 20+ tech companies and startups across Gujarat.' },
  { year: '2022', icon: 'fa-solid fa-trophy',         title: 'Best EdTech Award',  desc: 'Recognized as Ahmedabad\'s Best Tech Training Institute by the Gujarat EdTech Association.' },
  { year: '2023', icon: 'fa-solid fa-rocket',         title: '250+ Students Placed',desc: 'Crossed 250 successful placements with average packages reaching ₹5.5 LPA.' },
  { year: '2024', icon: 'fa-solid fa-star',           title: '500+ Placed & MERN Bootcamp', desc: '500+ placements milestone. Launched dedicated MERN Stack Bootcamp and Cloud/DevOps track.' },
  { year: '2025', icon: 'fa-solid fa-chart-line',     title: 'Scaling Up',         desc: 'Expanded batch capacity, upgraded labs, and launched advanced AI/ML specialization add-on.' },
]

export default function JourneyTimeline() {
  return (
    <section className={`${styles.section} texture-grain`}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-timeline" style={{ marginRight: '.4rem' }} />
            Our Journey
          </span>
          <h2 className="section-title">
            7 Years of <span className="grad">Impact & Growth</span>
          </h2>
          <p className="section-desc">
            From a single classroom to Ahmedabad's premier developer training institute.
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
