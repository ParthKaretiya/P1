import { useState } from 'react'
import styles from './Curriculum.module.css'
import { Reveal } from './Reveal'

const PHASES = [
  {
    id: 'foundation',
    phase: 'Phase 01',
    title: 'Development Foundations',
    subtitle: 'Weeks 1–6',
    desc: 'Master version control, web standards, semantic markup, layout systems, and Figma developer handoff.',
    nodes: [
      { label: 'Git & GitHub', sub: 'Version Control' },
      { label: 'Design Systems', sub: 'UI/UX & Figma' },
      { label: 'Semantic HTML5', sub: 'DOM & Accessibility' },
      { label: 'Modern CSS3', sub: 'Flexbox, Grid & Animations' },
    ],
  },
  {
    id: 'frontend',
    phase: 'Phase 02',
    title: 'Frontend Engineering',
    subtitle: 'Weeks 7–16',
    desc: 'Deep dive into modern ES6+ JavaScript, component-driven React architecture, and state management.',
    nodes: [
      { label: 'JavaScript (ES6+)', sub: 'Async, Promises & OOP' },
      { label: 'React Core', sub: 'Hooks, Context & Lifecycle' },
      { label: 'State Management', sub: 'Redux Toolkit & Zustand' },
      { label: 'Client Routing', sub: 'React Router & SPA Architecture' },
    ],
  },
  {
    id: 'backend',
    phase: 'Phase 03',
    title: 'Backend & API Architecture',
    subtitle: 'Weeks 17–26',
    desc: 'Build secure, scalable REST APIs, authentication layers, microservices, and real-time WebSockets.',
    nodes: [
      { label: 'Node.js Runtime', sub: 'Event Loop & Modules' },
      { label: 'Express Framework', sub: 'REST APIs & Middleware' },
      { label: 'Auth & Security', sub: 'JWT, OAuth & Rate Limiting' },
      { label: 'Real-Time WebSockets', sub: 'Socket.io & Events' },
    ],
  },
  {
    id: 'database',
    phase: 'Phase 04',
    title: 'Database & Cloud DevOps',
    subtitle: 'Weeks 27–34',
    desc: 'Database schema design, indexing, containerization with Docker, CI/CD, and AWS deployment.',
    nodes: [
      { label: 'MongoDB & Mongoose', sub: 'Document Store & Indexing' },
      { label: 'PostgreSQL Basics', sub: 'Relational Schemas & SQL' },
      { label: 'Docker Containers', sub: 'Images, Compose & Deployment' },
      { label: 'CI/CD Pipelines', sub: 'GitHub Actions & Monitoring' },
    ],
  },
  {
    id: 'capstone',
    phase: 'Phase 05',
    title: 'Production Capstone & Career Placement',
    subtitle: 'Weeks 35–40+',
    desc: 'Build an end-to-end full stack application, code review by senior engineers, and placement preparation.',
    nodes: [
      { label: 'Industry Capstone', sub: 'Full Stack Real-World Application' },
      { label: 'Code Quality', sub: 'Testing, Performance & Security' },
      { label: 'Portfolio & Resume', sub: 'Technical Interview Prep' },
      { label: 'Hiring Drives', sub: 'Direct Partner Interviews' },
    ],
  },
]

export default function Curriculum() {
  const [activePhase, setActivePhase] = useState(0)

  return (
    <section id="curriculum" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className={styles.sectionTag}>
            <i className="fa-solid fa-graduation-cap" />
            Structured Curriculum
          </span>
          <h2 className={styles.sectionTitle}>
            From Zero to <span className={styles.accent}>Industry-Ready</span>
          </h2>
          <p className={styles.sectionDesc}>
            A comprehensive, industry-designed 40-week curriculum engineered to turn beginners into job-ready full stack developers.
          </p>
        </Reveal>

        {/* ─── Phase Navigation Tabs ───────────────────────────── */}
        <div className={styles.tabsContainer}>
          {PHASES.map((p, index) => (
            <button
              key={p.id}
              className={`${styles.tabBtn} ${activePhase === index ? styles.tabActive : ''}`}
              onClick={() => setActivePhase(index)}
            >
              <span className={styles.tabStep}>{p.phase}</span>
              <span className={styles.tabTitle}>{p.title}</span>
            </button>
          ))}
        </div>

        {/* ─── Active Phase Detail Card ────────────────────────── */}
        <div className={styles.phaseDetailCard}>
          <div className={styles.detailHeader}>
            <div>
              <span className={styles.phaseBadge}>{PHASES[activePhase].phase} · {PHASES[activePhase].subtitle}</span>
              <h3 className={styles.detailTitle}>{PHASES[activePhase].title}</h3>
            </div>
            <span className={styles.stepCounter}>0{activePhase + 1} / 05</span>
          </div>

          <p className={styles.detailDesc}>{PHASES[activePhase].desc}</p>

          <div className={styles.moduleGrid}>
            {PHASES[activePhase].nodes.map((node, i) => (
              <div key={i} className={styles.moduleCard}>
                <div className={styles.moduleNum}>0{i + 1}</div>
                <div className={styles.moduleContent}>
                  <h4>{node.label}</h4>
                  <p>{node.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaRow}>
          <button
            className={styles.downloadBtn}
            onClick={() => alert('Full syllabus PDF coming soon! Contact us to receive it by email.')}
          >
            <i className="fa-solid fa-download" />
            Download Complete Syllabus (PDF)
          </button>
        </div>
      </div>
    </section>
  )
}
