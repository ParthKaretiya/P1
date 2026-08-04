import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'
import { useSEO } from '../hooks/useSEO'

export default function NotFound() {
  useSEO({
    title: '404 — Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    noindex: true,
  })

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <span className={styles.errCode}>404</span>
          <h1>Page Not Found</h1>
          <p>
            Oops! The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
          <div className={styles.actions}>
            <Link to="/" className="btn btn-primary">
              <i className="fa-solid fa-house" /> Return to Home
            </Link>
            <Link to="/courses" className="btn btn-outline-dark">
              <i className="fa-solid fa-book-open" /> View Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
