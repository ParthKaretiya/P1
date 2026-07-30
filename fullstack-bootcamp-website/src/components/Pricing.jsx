import styles from './Pricing.module.css'
import { Reveal } from './Reveal'
import { useMagnetic } from '../hooks/useMagnetic'

/* ── PLACEHOLDER: replace fee & scholarship % with real figures ── */
const INCLUDED = [
  { icon: 'fa-solid fa-video',          text: 'Live instructor-led classes (Mon–Sat)' },
  { icon: 'fa-solid fa-diagram-project', text: '1:1 project mentorship & code reviews' },
  { icon: 'fa-solid fa-handshake-angle', text: '100% placement assistance & interview prep' },
  { icon: 'fa-solid fa-certificate',    text: 'Industry-recognized certification' },
  { icon: 'fa-solid fa-clock-rotate-left', text: '24/7 access to recorded lectures' },
  { icon: 'fa-solid fa-users',          text: 'Lifetime alumni community access' },
]

const scrollToContact = e => {
  e.preventDefault()
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Pricing() {
  const enrollRef = useMagnetic()
  return (
    <section id="pricing" className={styles.section}>
      <div className="container">

        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-tag" style={{ marginRight: '.4rem' }} />
            Fees &amp; Scholarship
          </span>
          <h2 className="section-title">
            Invest in Your <span className="grad">Future</span>
          </h2>
          <p className="section-desc">
            One transparent fee. No hidden charges. Flexible payment options for every student.
          </p>
        </Reveal>

        {/* Pricing card */}
        <Reveal className={styles.cardWrap}>
          <div className={styles.card}>
            <div className={styles.emiBadge}>
              <i className="fa-solid fa-credit-card" />
              No-Cost EMI Available
            </div>

            <h3 className={styles.program}>Full Stack Developer Bootcamp</h3>
            <p className={styles.duration}>12-Month Intensive Program</p>

            <div className={styles.price}>
              {/* PLACEHOLDER fee */}
              <span className={styles.amount}>₹85,000</span>
              <span className={styles.per}>total fee</span>
            </div>
            <p className={styles.emiNote}>or ₹7,999/month with no-cost EMI</p>

            <ul className={styles.included}>
              {INCLUDED.map(item => (
                <li key={item.text}>
                  <i className={item.icon} />
                  {item.text}
                </li>
              ))}
            </ul>

            <a ref={enrollRef} href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={scrollToContact}>
              <i className="fa-solid fa-rocket" />
              Enroll Now
            </a>
          </div>
        </Reveal>

        {/* Scholarship banner */}
        <Reveal className={styles.scholarship}>
          <div className={styles.scholarshipText}>
            <i className="fa-solid fa-award" />
            <div>
              <h4>Scored 7+ CGPA?</h4>
              {/* PLACEHOLDER percentage */}
              <p>Get up to <strong>25% scholarship</strong> on your program fee — merit-based, limited slots per batch.</p>
            </div>
          </div>
          <a href="#contact" className={styles.scholarshipBtn} onClick={scrollToContact}>
            Apply for Scholarship
            <i className="fa-solid fa-arrow-right" />
          </a>
        </Reveal>

      </div>
    </section>
  )
}
