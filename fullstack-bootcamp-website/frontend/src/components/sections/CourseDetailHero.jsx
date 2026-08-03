import { Link } from 'react-router-dom'
import styles from './CourseDetailHero.module.css'
import { Reveal } from '../Reveal'

const QUICK_FACTS = [
  { icon: 'fa-solid fa-calendar-days',    label: 'Duration',          value: '12 Months' },
  { icon: 'fa-solid fa-clock',            label: 'Class Frequency',   value: 'Mon–Sat, 2hrs/day' },
  { icon: 'fa-solid fa-cube',             label: 'Core Modules',      value: '14 Modules' },
  { icon: 'fa-solid fa-laptop-code',      label: 'Live Projects',     value: '10+ Projects' },
  { icon: 'fa-solid fa-handshake-angle',  label: 'Placement',         value: 'Dedicated Support' },
  { icon: 'fa-solid fa-certificate',      label: 'Certificate',       value: 'Industry Recognized' },
  { icon: 'fa-solid fa-indian-rupee-sign',label: 'Industry Benchmark',value: '₹4–8 LPA' },
  { icon: 'fa-solid fa-users',            label: 'Batch Size',        value: 'Small Batches' },
]

const TOOLS = ['VS Code', 'Git & GitHub', 'Postman', 'MongoDB Compass', 'Figma', 'Docker', 'AWS Console', 'Vercel', 'Linux CLI', 'Jest', 'Redux DevTools', 'Chrome DevTools']

export default function CourseDetailHero() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>

          {/* Quick Facts Grid */}
          <Reveal direction="left" className={styles.factsCol}>
            <h3>Quick Facts</h3>
            <div className={styles.factsGrid}>
              {QUICK_FACTS.map((f, i) => (
                <div key={i} className={styles.fact}>
                  <i className={f.icon} />
                  <div>
                    <span className={styles.factLabel}>{f.label}</span>
                    <strong className={styles.factValue}>{f.value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tools & CTA */}
          <Reveal direction="right" className={styles.toolsCol}>
            <h3>Tools You'll Use</h3>
            <div className={styles.toolsGrid}>
              {TOOLS.map(t => (
                <span key={t} className={styles.toolChip}>{t}</span>
              ))}
            </div>
            <div className={styles.actions}>
              <Link to="/admissions" className="btn btn-primary">
                <i className="fa-solid fa-rocket" />
                Enroll Now
              </Link>
              <Link to="/contact" className="btn btn-outline-dark">
                <i className="fa-solid fa-phone" />
                Get Counselling
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
