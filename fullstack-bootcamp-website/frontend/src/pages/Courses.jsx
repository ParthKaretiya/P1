import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CtaBanner  from '../components/CtaBanner'
import styles     from './Courses.module.css'
import { Reveal, RevealItem } from '../components/Reveal'
import { useSEO }  from '../hooks/useSEO'
import { COURSES_DATA } from '../data/coursesData'

const ALL_TECHS = [
  { name: 'HTML5', icon: 'devicon-html5-plain colored' },
  { name: 'CSS3', icon: 'devicon-css3-plain colored' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { name: 'React', icon: 'devicon-react-original colored' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { name: 'Express', icon: 'devicon-express-original' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
  { name: 'Git', icon: 'devicon-git-plain colored' },
  { name: 'GitHub', icon: 'devicon-github-original' },
  { name: 'Docker', icon: 'devicon-docker-plain colored' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-original colored' },
  { name: 'Linux', icon: 'devicon-linux-plain' },
]

export default function Courses() {
  useSEO({
    title: 'Programs & Learning Roadmaps',
    description: "Explore Nirayush EduTech's Full Stack Development Bootcamp — a 12-month MERN program with a detailed 5-phase roadmap and placement assistance.",
    keywords: 'full stack course Ahmedabad, MERN stack bootcamp, full stack developer bootcamp, React Node.js course',
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

      {/* Tech Logos Header Marquee */}
      <section className={styles.techSection}>
        <div className="container">
          <Reveal className={styles.techHead}>
            <span className="section-tag">Official Technology Stack</span>
            <h3 className={styles.techSubhead}>Technologies & Tools You Will Master</h3>
          </Reveal>
          <Reveal className={styles.techRow}>
            {ALL_TECHS.map(t => (
              <div key={t.name} className={styles.techChip}>
                <i className={`${t.icon} ${styles.techIcon}`} />
                <span>{t.name}</span>
              </div>
            ))}
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
