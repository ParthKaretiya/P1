import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CtaBanner  from '../components/CtaBanner'
import styles     from './Courses.module.css'
import { Reveal, RevealItem } from '../components/Reveal'
import { useSEO }  from '../hooks/useSEO'
import { useDevicon } from '../hooks/useDevicon'
import { buildBreadcrumbSchema } from '../data/structuredData'
import { COURSES_DATA } from '../data/coursesData'

// Tiered technology breakdown — skill bullets pulled from the 5-phase
// curriculum in coursesData.js. All tiers are part of the single bootcamp.
const TECH_TIERS = [
  {
    id: 'core',
    label: 'Core Modules',
    tagline: 'Phases 1–3 · The foundational stack every student masters',
    items: [
      { name: 'HTML5', icon: 'devicon-html5-plain colored', skills: ['Semantic markup', 'Accessibility', 'Forms & inputs', 'Browser APIs'] },
      { name: 'CSS3', icon: 'devicon-css3-plain colored', skills: ['Flexbox', 'CSS Grid', 'Animations', 'Responsive design'] },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored', skills: ['ES6+ syntax', 'Closures', 'Async / Await', 'DOM manipulation'] },
      { name: 'React 18', icon: 'devicon-react-original colored', skills: ['Components & JSX', 'Hooks', 'Redux Toolkit', 'React Router v6', 'Performance'] },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored', skills: ['Runtime & Event Loop', 'npm ecosystem', 'Async I/O', 'API servers'] },
      { name: 'Express', icon: 'devicon-express-original', skills: ['REST architecture', 'Routing', 'Middleware', 'JWT authentication'] },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', skills: ['Mongoose schemas', 'CRUD operations', 'Aggregations', 'Compass'] },
      { name: 'Git & GitHub', icon: 'devicon-git-plain colored', skills: ['Version control', 'Branching', 'Pull requests', 'Team workflow'] },
    ],
  },
  {
    id: 'optional',
    label: 'Optional Modules',
    tagline: 'Workflow & productivity tools taught alongside the core phases — included in the same program',
    items: [
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored', skills: ['Static typing', 'Interfaces', 'Typed React props'] },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored', skills: ['Utility classes', 'Responsive variants', 'Custom themes'] },
      { name: 'Vite', icon: 'fa-solid fa-bolt', skills: ['Dev server & HMR', 'Production builds', 'Env configuration'] },
      { name: 'Postman', icon: 'fa-solid fa-paper-plane', skills: ['API testing', 'Collections', 'Environments'] },
      { name: 'Chrome DevTools', icon: 'devicon-chrome-plain colored', skills: ['Debugging', 'Network panel', 'Performance profiling'] },
      { name: 'Linux Basics', icon: 'devicon-linux-plain', skills: ['Shell commands', 'File permissions', 'SSH & servers'] },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced Modules',
    tagline: 'Phases 4–5 · Expert-level production engineering — included in the same program',
    items: [
      { name: 'Docker', icon: 'devicon-docker-plain colored', skills: ['Containers', 'Dockerfiles', 'Docker Compose'] },
      { name: 'AWS', icon: 'devicon-amazonwebservices-original colored', skills: ['EC2 hosting', 'S3 storage', 'CloudFront CDN'] },
      { name: 'Redis', icon: 'devicon-redis-plain colored', skills: ['Caching', 'Performance tuning', 'Session stores'] },
      { name: 'CI/CD Pipelines', icon: 'fa-solid fa-rotate', skills: ['GitHub Actions', 'Automated testing', 'Auto deployments'] },
      { name: 'WebSockets', icon: 'devicon-socketio-original', skills: ['Socket.io', 'Real-time apps', 'Live chat systems'] },
      { name: 'DSA & System Design', icon: 'fa-solid fa-diagram-project', skills: ['Data structures', 'System design basics', 'Mock interviews'] },
    ],
  },
]

export default function Courses() {
  useDevicon()
  useSEO({
    // → "Full Stack Courses & MERN Roadmap | Nirayush EdTech" (52 chars)
    title: 'Full Stack Courses & MERN Roadmap',
    description: "Explore Nirayush EdTech's Full Stack Development Bootcamp — a 12-month MERN program with a detailed 5-phase roadmap and placement assistance. View the curriculum.",
    keywords: 'full stack course Ahmedabad, MERN stack bootcamp, full stack developer bootcamp, React Node.js course',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Courses' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Learning Roadmaps"
        title="Industry-Aligned Engineering Programs"
        accent="Engineering Programs"
        desc="Handcrafted 5-phase roadmaps built to take you from fundamentals to senior-level engineering competence."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Courses' },
        ]}
      />

      {/* Tiered Technology Breakdown */}
      <section className={styles.techSection}>
        <div className="container">
          <Reveal className={styles.techHead}>
            <span className="section-tag">Official Technology Stack</span>
            <h2 className={styles.techSubhead}>Technologies & Tools You Will Master</h2>
            <p className={styles.techNote}>
              Every module below is part of the single 12-month Full Stack Development Bootcamp,
              organised by the phase in which it is taught.
            </p>
          </Reveal>

          {TECH_TIERS.map(tier => (
            <div key={tier.id} className={styles.tierBlock}>
              <Reveal className={styles.tierHead}>
                <span className={`${styles.tierBadge} ${styles[`tier_${tier.id}`]}`}>{tier.label}</span>
                <p className={styles.tierTagline}>{tier.tagline}</p>
              </Reveal>
              <Reveal stagger className={styles.tierGrid}>
                {tier.items.map(t => (
                  <RevealItem key={t.name} className={`${styles.techCard} ${styles[`accent_${tier.id}`]}`}>
                    <div className={styles.techCardHead}>
                      <i className={`${t.icon} ${styles.techCardIcon}`} />
                      <span className={styles.techCardName}>{t.name}</span>
                    </div>
                    <ul className={styles.skillList}>
                      {t.skills.map(s => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          ))}

          <Reveal className={styles.techCta}>
            <Link to="/courses/fullstack-developer" className="btn btn-outline-dark">
              View Full Curriculum & 5-Phase Roadmap <i className="fa-solid fa-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured Course */}
      <section className={styles.coursesSection}>
        <div className="container">
          <Reveal stagger className={styles.grid}>
            {COURSES_DATA.map((c) => (
              <RevealItem key={c.id} className={styles.card}>
                
                {/* Header */}
                <div className={styles.cardHead}>
                  <div className={styles.iconWrap}>
                    <i className={c.devicon} />
                  </div>
                  <span className={styles.badge} style={{ background: c.badgeColor }}>
                    {c.badge}
                  </span>
                </div>

                {/* Content */}
                <div className={styles.cardBody}>
                  <span className={styles.category}>{c.category} · {c.level}</span>
                  <h3>{c.title}</h3>
                  <p className={styles.desc}>{c.desc}</p>

                  {/* Progress Indicator */}
                  <div className={styles.progressWrap}>
                    <div className={styles.progressLabel}>
                      <span>Curriculum Depth</span>
                      <span>{c.difficulty} ({c.progress}%)</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>

                  {/* Meta Pills */}
                  <div className={styles.metaRow}>
                    <span><i className="fa-solid fa-clock" /> {c.duration}</span>
                    <span><i className="fa-solid fa-indian-rupee-sign" /> {c.salaryRange}</span>
                    <span><i className="fa-solid fa-layer-group" /> {c.phases.length} Phases</span>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className={styles.techTags}>
                    {c.techStack.slice(0, 6).map(t => (
                      <span key={t} className={styles.techBadge}>{t}</span>
                    ))}
                    {c.techStack.length > 6 && (
                      <span className={styles.techMore}>+{c.techStack.length - 6} more</span>
                    )}
                  </div>
                </div>

                {/* Action CTA */}
                <Link to={`/courses/${c.id}`} className={styles.ctaBtn}>
                  <span>View Full Details & Roadmap</span>
                  <i className="fa-solid fa-arrow-right-long" />
                </Link>

              </RevealItem>
            ))}
          </Reveal>

          {/* Upcoming programs note */}
          <Reveal className={styles.comingSoon}>
            <i className="fa-solid fa-wand-magic-sparkles" />
            <div>
              <h4>More Programs Coming Soon</h4>
              <p>
                We're focused on making our founding Full Stack batch exceptional.
                New specialised tracks will be announced here — subscribe in the footer to be the first to know.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
