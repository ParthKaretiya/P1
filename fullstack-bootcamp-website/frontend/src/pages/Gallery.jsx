import PageHeader from '../components/ui/PageHeader'
import CtaBanner  from '../components/CtaBanner'
import styles     from './Gallery.module.css'
import { Reveal, RevealItem } from '../components/Reveal'
import { useSEO }  from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

const GALLERY_ITEMS = [
  { title: 'Interactive Coding Labs', category: 'Infrastructure', desc: 'High-speed internet, dual-monitor setup, and modern workstations.', icon: 'fa-solid fa-desktop' },
  { title: '1-on-1 Mentorship Sessions', category: 'Learning', desc: 'Personalized doubt clearance and code reviews with senior devs.', icon: 'fa-solid fa-comments' },
  { title: 'Hackathon Weekend 2024', category: 'Events', desc: '48-hour build-a-thon with cash prizes and live demo day to recruiters.', icon: 'fa-solid fa-trophy' },
  { title: 'Alumni Meet & Connect', category: 'Community', desc: 'Annual networking event connecting current batch with working alumni.', icon: 'fa-solid fa-users' },
  { title: 'Project Demo Day', category: 'Outcomes', desc: 'Students presenting capstone projects to hiring managers and founders.', icon: 'fa-solid fa-laptop-code' },
  { title: 'Graduation Day Celebration', category: 'Milestones', desc: 'Certificate award ceremony celebrating successful batch completion.', icon: 'fa-solid fa-graduation-cap' },
]

export default function Gallery() {
  useSEO({
<<<<<<< HEAD
    // → "Campus & Learning Gallery | Nirayush EduTech" (44 chars)
    title: 'Campus & Learning Gallery',
    description: "Take a virtual tour of Nirayush EduTech's modern coding campus in Ahmedabad — interactive labs, hackathons, project demo days and graduation celebrations. See it live.",
=======
    title: 'Campus & Learning Gallery — Ahmedabad',
    description: "Tour Nirayush EduTech's modern coding campus in Ahmedabad — interactive labs, hackathons, demo days and graduation celebrations. Book an in-person campus visit.",
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
    keywords: 'campus gallery Ahmedabad, bootcamp environment, tech hackathon Gujarat, coding labs',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Gallery' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Campus Life"
        title="Inside Nirayush EduTech"
        accent="Nirayush EduTech"
        desc="Explore our modern tech campus, interactive labs, hackathons, project demo days, and graduation ceremonies."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Gallery' },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <h2 className="sr-only">Campus Life Highlights</h2>
          <Reveal stagger className={styles.grid}>
            {GALLERY_ITEMS.map((item, i) => (
              <RevealItem key={i} className={styles.card}>
                <div className={styles.visualPlaceholder}>
                  <i className={item.icon} />
                  <span className={styles.category}>{item.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
