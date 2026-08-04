import { Link } from 'react-router-dom'
import styles from './CtaBanner.module.css'
import { Reveal } from './Reveal'
import { useMagnetic } from '../hooks/useMagnetic'

export default function CtaBanner() {
  const enrollRef = useMagnetic()

  // Smooth-scroll to the on-page contact form when present;
  // otherwise the crawlable href navigates to the /contact page.
  const handleClick = (e) => {
    const target = document.querySelector('#contact')
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
<<<<<<< HEAD
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
=======
        <Link
          ref={enrollRef}
          to="/contact"
          className={styles.cta}
          onClick={handleClick}
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
        >
          <i className="fa-solid fa-rocket" aria-hidden="true" />
          Enroll Now
        </Link>
      </Reveal>
    </section>
  )
}
