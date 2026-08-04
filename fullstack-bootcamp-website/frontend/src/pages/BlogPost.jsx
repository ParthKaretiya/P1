import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import CtaBanner  from '../components/CtaBanner'
import NotFound   from './NotFound'
import { BLOG_POSTS } from './Blog'
import styles from './BlogPost.module.css'
import { Reveal } from '../components/Reveal'
import { useSEO } from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.id === slug)

  // Unknown slug → real 404 (falling back to another post would create
  // duplicate content indexed under a wrong URL)
  if (!post) return <NotFound />

  return <BlogPostContent post={post} />
}

function BlogPostContent({ post }) {
  useSEO({
    title: post.title,
    description: post.excerpt,
    keywords: `${post.category}, full stack tutorial, Nirayush EduTech blog`,
    type: 'article',
<<<<<<< HEAD
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Blog', path: '/blog' },
      { label: post.title },
    ]),
=======
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
  })

  return (
    <>
      <PageHeader
        tag={post.category}
        title={post.title}
        accent={post.category}
        desc={`${post.author} · Published on ${post.date} · ${post.readTime}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: 'Article' },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.wrapper}>
            <Reveal className={styles.content}>
              <p className={styles.lead}>{post.excerpt}</p>

              <h2>Why Full Stack Development in 2025?</h2>
              <p>
                The demand for developers who can work across both frontend interfaces and backend infrastructure
                has never been higher. Modern companies require agile engineers capable of taking a feature from UI mockups to database design and cloud deployment.
              </p>

              <h2>Core Pillars to Master</h2>
              <ul>
                <li><strong>Frontend Excellence:</strong> HTML5, CSS3 modules, JavaScript ES6+, React 18, State Management.</li>
                <li><strong>Backend Architecture:</strong> Node.js event loop, Express server structure, REST API design, JWT auth.</li>
                <li><strong>Database Mastery:</strong> MongoDB indexing, aggregation pipelines, schema validation, Mongoose.</li>
                <li><strong>DevOps & Deployment:</strong> Git workflows, Docker containers, AWS S3/EC2, CI/CD pipelines.</li>
              </ul>

              <h2>Next Steps for Your Journey</h2>
              <p>
                Whether you choose self-guided learning or an intensive bootcamp like Nirayush EduTech, consistency and hands-on projects are key. Build at least 3 production-grade applications that demonstrate full CRUD capabilities and real authentication.
              </p>

              <div className={styles.backLinkWrap}>
                <Link to="/blog" className="btn btn-outline-dark">
                  <i className="fa-solid fa-arrow-left" style={{ marginRight: '.4rem' }} /> Back to All Articles
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
