import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CtaBanner  from '../components/CtaBanner'
import Faq        from '../components/Faq'
import NotFound   from './NotFound'
import { COURSES_DATA } from '../data/coursesData'
import styles from './CourseDetail.module.css'
import { Reveal } from '../components/Reveal'
import { useSEO } from '../hooks/useSEO'
<<<<<<< HEAD
import { buildCourseSchema, buildBreadcrumbSchema } from '../data/structuredData'

export default function CourseDetail() {
  const { courseId } = useParams()
  const course = COURSES_DATA.find(c => c.id === courseId)

  // Unknown course id → real 404 instead of silently showing another course
  // under the wrong (indexable) URL
  if (!course) return <NotFound />

  return <CourseDetailContent course={course} />
}

function CourseDetailContent({ course }) {
=======
import { buildCourseSchema } from '../data/schema'

export default function CourseDetail({ onSuccess: _onSuccess }) {
  const { courseId } = useParams()

  // Find matching course or fallback to fullstack-developer
  const course = COURSES_DATA.find(c => c.id === courseId) || COURSES_DATA[0]

>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
  const [activeTab, setActiveTab] = useState('roadmap')
  const [openFaq, setOpenFaq] = useState(0)

  useSEO({
<<<<<<< HEAD
    title: `${course.title} Course & Roadmap`,
    description: `${course.desc} ${course.duration} program in Ahmedabad with placement support — view the full curriculum and apply today.`,
    keywords: `${course.title}, roadmap, syllabus, ${course.techStack.join(', ')}`,
    jsonLd: [
      buildCourseSchema(course),
      buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Courses', path: '/courses' },
        { label: course.title },
      ]),
    ],
=======
    title: `${course.title} Course | Nirayush EduTech`,
    description: `${course.desc} Explore the full 5-phase roadmap, projects, and placement prep — enroll in Ahmedabad's founding batch today.`,
    keywords: `${course.title}, roadmap, syllabus, ${course.techStack.join(', ')}`,
    jsonLd: buildCourseSchema(course),
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
  })

  return (
    <>
      {/* Page Hero Header */}
      <PageHeader
        tag={course.category}
        title={course.title}
        accent={course.category}
        desc={course.desc}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Courses', href: '/courses' },
          { label: course.title },
        ]}
      />

      {/* Course Key Specs Banner */}
      <section className={styles.specsBanner}>
        <div className="container">
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <i className={course.devicon} style={{ fontSize: '2rem' }} />
              <div>
                <span className={styles.specLabel}>Main Tech</span>
                <strong>{course.title.split(' ')[0]}</strong>
              </div>
            </div>
            <div className={styles.specItem}>
              <i className="fa-solid fa-calendar-days" />
              <div>
                <span className={styles.specLabel}>Duration</span>
                <strong>{course.duration}</strong>
              </div>
            </div>
            <div className={styles.specItem}>
              <i className="fa-solid fa-signal" />
              <div>
                <span className={styles.specLabel}>Difficulty</span>
                <strong>{course.difficulty}</strong>
              </div>
            </div>
            <div className={styles.specItem}>
              <i className="fa-solid fa-sack-dollar" />
              <div>
                <span className={styles.specLabel}>Salary Target</span>
                <strong>{course.salaryRange}</strong>
              </div>
            </div>
            <div className={styles.specItem}>
              <i className="fa-solid fa-certificate" />
              <div>
                <span className={styles.specLabel}>Certificate</span>
                <strong>Industry Recognized</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Bar */}
      <div className={styles.stickyTabsNav}>
        <div className="container">
          <div className={styles.tabsRow}>
            {[
              { id: 'roadmap', label: '5-Phase Roadmap', icon: 'fa-solid fa-route' },
              { id: 'projects', label: 'Projects Showcase', icon: 'fa-solid fa-diagram-project' },
              { id: 'career', label: 'Career & Salary', icon: 'fa-solid fa-briefcase' },
              { id: 'interview', label: 'Interview Prep', icon: 'fa-solid fa-comments' },
              { id: 'resources', label: 'Resources & Docs', icon: 'fa-solid fa-book-bookmark' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className={styles.mainSection}>
        <div className="container">

          {/* TAB 1: 5-PHASE ROADMAP & TIMELINE */}
          {activeTab === 'roadmap' && (
            <Reveal className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <span className="section-tag">Step-by-Step Curriculum</span>
                <h2>Complete 5-Phase <span className="grad">Learning Roadmap</span></h2>
                <p>Follow a structured trajectory from zero knowledge to production-grade engineering mastery.</p>
              </div>

              <div className={styles.roadmapTimeline}>
                {course.phases.map((ph, idx) => (
                  <div key={idx} className={styles.phaseCard}>
                    <div className={styles.phaseHeader}>
                      <span className={styles.phaseBadge}>{ph.phase}</span>
                      <span className={styles.phaseTime}><i className="fa-solid fa-clock" /> {ph.duration}</span>
                    </div>
                    <h3>{ph.title}</h3>
                    
                    <div className={styles.phaseBodyGrid}>
                      <div>
                        <h4><i className="fa-solid fa-list-check" /> Core Topics Covered</h4>
                        <ul className={styles.topicList}>
                          {ph.topics.map((t, i) => (
                            <li key={i}><i className="fa-solid fa-check" /> {t}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4><i className="fa-solid fa-laptop-code" /> Hands-on Projects Built</h4>
                        <ul className={styles.projectList}>
                          {ph.projects.map((p, i) => (
                            <li key={i}><i className="fa-solid fa-rocket" /> {p}</li>
                          ))}
                        </ul>
                        <div className={styles.toolsWrap}>
                          <strong>Tools Used:</strong> {ph.tools.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* TAB 2: PROJECTS SHOWCASE */}
          {activeTab === 'projects' && (
            <Reveal className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <span className="section-tag">Build Your Portfolio</span>
                <h2>Beginner to Advanced <span className="grad">Real-World Projects</span></h2>
                <p>You won't just learn syntax — you will construct real software apps to feature on GitHub.</p>
              </div>

              <div className={styles.projectsGrid}>
                {course.projectsList && Object.entries(course.projectsList).map(([level, items]) => (
                  <div key={level} className={styles.projectLevelCard}>
                    <span className={styles.levelTag}>{level.toUpperCase()} LEVEL</span>
                    <h3>{level.charAt(0).toUpperCase() + level.slice(1)} Projects</h3>
                    <ul className={styles.projectBulletList}>
                      {items.map((item, idx) => (
                        <li key={idx}>
                          <i className="fa-solid fa-folder-open" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* TAB 3: CAREER & SALARY */}
          {activeTab === 'career' && (
            <Reveal className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <span className="section-tag">Career Acceleration</span>
                <h2>Target Roles & <span className="grad">Industry Compensation</span></h2>
              </div>

              <div className={styles.careerGrid}>
                <div className={styles.careerCard}>
                  <h3><i className="fa-solid fa-user-tie" /> Eligible Job Roles</h3>
                  <div className={styles.roleTags}>
                    {course.outcomes.map(role => (
                      <span key={role} className={styles.roleChip}>{role}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.careerCard}>
                  <h3><i className="fa-solid fa-chart-line" /> Average Salary Expectation</h3>
                  <div className={styles.salaryHighlight}>
                    <span className={styles.salaryNum}>{course.salaryRange}</span>
                    <p>Industry benchmark based on publicly available 2024-2025 salary data for entry-level developers in Ahmedabad & Pan-India — a target range, not our batch outcomes.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* TAB 4: INTERVIEW PREP */}
          {activeTab === 'interview' && (
            <Reveal className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <span className="section-tag">Interview Mastery</span>
                <h2>Frequently Asked <span className="grad">Technical Questions</span></h2>
              </div>

              <div className={styles.interviewList}>
                {course.interviewPrep.map((item, i) => (
                  <div key={i} className={styles.interviewCard}>
                    <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <strong>Q: {item.q}</strong>
                      <i className={`fa-solid fa-chevron-down ${openFaq === i ? styles.openChev : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className={styles.faqAns}>
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* TAB 5: RESOURCES & DOCS */}
          {activeTab === 'resources' && (
            <Reveal className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <span className="section-tag">Curated Knowledge</span>
                <h2>Recommended <span className="grad">Resources & Docs</span></h2>
              </div>

              <div className={styles.resourcesGrid}>
                {course.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" className={styles.resourceCard}>
                    <div>
                      <span className={styles.resType}>{r.type}</span>
                      <h3>{r.title}</h3>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                ))}
              </div>
            </Reveal>
          )}

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <Faq />

      <CtaBanner />
    </>
  )
}
