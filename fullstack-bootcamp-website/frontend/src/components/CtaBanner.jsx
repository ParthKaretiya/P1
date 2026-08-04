import { Link } from 'react-router-dom'
import styles from './CtaBanner.module.css'
import { Reveal } from './Reveal'
import { useMagnetic } from '../hooks/useMagnetic'

export default function CtaBanner() {
  const enrollRef = useMagnetic()
  return (
    <section id="cta" className={styles.banner}>
      <Reveal className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2>Ready to start your journey?</h2>
          <p>
            Seats fill fast and the next batch starts soon. Book a free counselling
            session and take the first step toward your tech career.
          </p>
        </div>
        {/* Real crawlable route link; scrolls in-page when a #contact section exists */}
        <Link
          ref={enrollRef}
          to="/admissions"
          className={styles.cta}
          onClick={e => {
            const contact = document.querySelector('#contact')
            if (contact) {
              e.preventDefault()
              contact.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <i className="fa-solid fa-rocket" aria-hidden="true" />
          Enroll Now
        </Link>
      </Reveal>
    </section>
  )
}
