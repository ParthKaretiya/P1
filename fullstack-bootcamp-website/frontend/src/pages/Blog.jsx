import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CtaBanner  from '../components/CtaBanner'
import styles     from './Blog.module.css'
import { Reveal, RevealItem } from '../components/Reveal'
import { useSEO }  from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export const BLOG_POSTS = [
  {
    id: 'how-to-become-fullstack-developer-2025',
    title: 'How to Become a Full Stack Developer in 2025: Complete Roadmap',
    date: 'Jan 15, 2025',
    author: 'Nirayush Tech Team',
    category: 'Career Guide',
    readTime: '6 min read',
    excerpt: 'Step-by-step roadmap covering HTML/CSS, JS, React, Node.js, databases, and DevOps essentials for landing a developer job.',
  },
  {
    id: 'mern-vs-mean-stack-comparison',
    title: 'MERN Stack vs MEAN Stack: Which One Should You Learn in Ahmedabad?',
    date: 'Dec 28, 2024',
    author: 'Senior Frontend Mentor',
    category: 'Tech Stack',
    readTime: '5 min read',
    excerpt: 'Comparing React vs Angular in the job market, company demand across Gujarat tech hubs, and long-term career growth.',
  },
  {
    id: 'non-cs-background-to-software-engineer',
    title: 'Can Non-CS Graduates Become Software Engineers? Real Success Stories',
    date: 'Nov 20, 2024',
    author: 'Placement Cell',
    category: 'Success Story',
    readTime: '4 min read',
    excerpt: 'B.Com, B.Sc, and Mechanical engineering graduates who switched to high-paying developer roles through focused bootcamp training.',
  },
  {
    id: 'top-10-react-interview-questions-2025',
    title: 'Top 10 React 18 Interview Questions You Must Prepare',
    date: 'Oct 10, 2024',
    author: 'Lead Instructor',
    category: 'Interview Prep',
    readTime: '8 min read',
    excerpt: 'Hooks, Virtual DOM reconciliation, state management with Redux Toolkit, and performance optimization questions asked by top tech firms.',
  },
]

export default function Blog() {
  useSEO({
    // → "Developer Blog & Career Guides | Nirayush EduTech" (49 chars)
    title: 'Developer Blog & Career Guides',
    description: 'Expert articles, developer roadmaps, tech stack comparisons and interview preparation guides by Nirayush EduTech. Start reading and level up your coding career.',
    keywords: 'full stack developer blog, MERN stack guide, software developer career tips, tech interview prep',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Blog' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Insights & Articles"
        title="Resources for Aspiring Developers"
        accent="Aspiring Developers"
        desc="Actionable career guides, tech tutorials, interview preparation blueprints, and industry news."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <h2 className="sr-only">Latest Articles & Guides</h2>
          <Reveal stagger className={styles.grid}>
            {BLOG_POSTS.map(post => (
              <RevealItem key={post.id} className={styles.card}>
                <div className={styles.metaTop}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.author}><i className="fa-solid fa-user-pen" />{post.author}</span>
                  <Link to={`/blog/${post.id}`} className={styles.readBtn}>
                    Read Article <i className="fa-solid fa-arrow-right" />
                  </Link>
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
