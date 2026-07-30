import { useState, useRef, useEffect } from 'react'
import { createTimeline, stagger } from 'animejs'
import styles from './Curriculum.module.css'
import { Reveal } from './Reveal'

const TABS = [
  { id: 'core',     label: 'Core (14 Modules)',    icon: 'fa-solid fa-star' },
  { id: 'optional', label: 'Optional (4 Modules)', icon: 'fa-solid fa-plus-circle' },
  { id: 'advanced', label: 'Advanced (4 Modules)', icon: 'fa-solid fa-rocket' },
]

const MODULES = {
  core: [
    { num: '01', title: 'Git & GitHub',           desc: 'Version control, branching & collaboration' },
    { num: '02', title: 'Design for Developers',  desc: 'UI/UX principles & Figma workflows' },
    { num: '03', title: 'HTML',                   desc: 'Semantic markup & accessibility' },
    { num: '04', title: 'CSS',                    desc: 'Flexbox, Grid & modern CSS techniques' },
    { num: '05', title: 'JavaScript',             desc: 'ES6+, DOM, Async/Await, Fetch API & OOP' },
    { num: '06', title: 'React',                  desc: 'Components, State, Routing & Redux' },
    { num: '07', title: 'Node.js',                desc: 'Server-side JS & runtime fundamentals' },
    { num: '08', title: 'Express & REST APIs',    desc: 'RESTful architecture & middleware' },
    { num: '09', title: 'Authentication',         desc: 'JWT, Cookies & Sessions' },
    { num: '10', title: 'API Gateway',            desc: 'Rate limiting, routing & orchestration' },
    { num: '11', title: 'WebSocket & Socket.io',  desc: 'Real-time bidirectional communication' },
    { num: '12', title: 'Database (MongoDB)',      desc: 'CRUD, Indexing & schema design' },
    { num: '13', title: 'Deployment & Monitoring', desc: 'CI/CD, Docker basics & logging' },
    { num: '14', title: 'Capstone Project',       desc: 'Full stack project + portfolio showcase' },
  ],
  optional: [
    { num: 'A', title: 'AWS',            desc: 'EC2, S3 & IAM fundamentals' },
    { num: 'B', title: 'Docker',         desc: 'Containers, images & orchestration' },
    { num: 'C', title: 'Testing',        desc: 'Jest, Postman & Cypress end-to-end' },
    { num: 'D', title: 'Spring Boot',    desc: 'Java-based enterprise backend' },
  ],
  advanced: [
    { num: 'I',   title: 'Advanced Frontend',   desc: 'Redux Toolkit & code splitting strategies' },
    { num: 'II',  title: 'Advanced Backend',    desc: 'Microservices & message queues' },
    { num: 'III', title: 'Industry Project',    desc: 'Real client-grade full stack build' },
    { num: 'IV',  title: 'Next.js',             desc: 'SSR, SSG & the App Router' },
  ],
}

export default function Curriculum() {
  const [active, setActive] = useState('core')
  const timelineRef = useRef(null)

  useEffect(() => {
    const timelineElement = timelineRef.current
    if (!timelineElement) return

    const nodes = timelineElement.querySelectorAll(`.${styles.timelineItem}`)
    if (!nodes.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      nodes.forEach((c) => {
        c.style.opacity = '1'
        c.style.transform = 'none'
      })
      return
    }

    const tl = createTimeline({
      defaults: { ease: 'out(3)', duration: 620 },
    })
    tl.add(nodes, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100),
    })

    return () => tl.revert()
  }, [active])

  return (
    <section id="curriculum" className={styles.section}>
      <div className="container">

        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-book-open" style={{ marginRight: '.4rem' }} />
            Curriculum
          </span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            What You'll <span className="grad" style={{ color: 'var(--orange-deep)' }}>Learn</span>
          </h2>
          <p className="section-desc" style={{ color: 'var(--gray-200)' }}>
            A comprehensive, structured curriculum covering every layer of the modern web stack — from design to deployment.
          </p>
        </Reveal>

        <Reveal className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${active === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActive(tab.id)}
            >
              <i className={tab.icon} />
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          <div className={styles.timeline} ref={timelineRef}>
            {MODULES[active].map((mod, i) => (
              <div key={mod.num} className={styles.timelineItem}>
                <div className={styles.timelineNode}>
                  <div className={styles.timelineDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.num}>{mod.num}</div>
                  <div className={styles.info}>
                    <h4>{mod.title}</h4>
                    <p>{mod.desc}</p>
                  </div>
                  {active === 'optional' && <span className={`${styles.badge} ${styles.badgeOpt}`}>Optional</span>}
                  {active === 'advanced' && <span className={`${styles.badge} ${styles.badgeAdv}`}>Advanced</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            className="btn btn-primary"
            onClick={() => alert('Full syllabus PDF coming soon! Contact us to receive it by email.')}
          >
            <i className="fa-solid fa-download" />
            Download Full Syllabus
          </button>
        </div>

      </div>
    </section>
  )
}
