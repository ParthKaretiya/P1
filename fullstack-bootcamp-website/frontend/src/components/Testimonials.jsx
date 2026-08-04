import styles from './Testimonials.module.css'
import { Reveal, RevealItem } from './Reveal'

/* ── Founding batch: no student outcomes exist yet, so this section
      carries founder & mentor credibility instead of student quotes.
      Replace placeholder names/quotes with REAL founder & mentor
      words before launch — do not publish invented people. ── */
const FOUNDER_NOTE = {
  name: 'Dr. Ravi Patel', role: 'Founder, Nirayush EduTech', initials: 'RP',
  quote: 'We built this program because we kept meeting talented students who finished degrees without ever building anything real. Our answer is a 12-month, project-first curriculum designed with working engineers — and a founding batch we intend to make our proof.',
}

const PRINCIPLES = [
  {
    name: 'Practitioners, Not Just Teachers', initials: 'PR',
    quote: 'Every module is designed and taught by people who build software for a living — you learn the way the industry actually works.',
  },
  {
    name: 'Small Founding Batch', initials: 'SB',
    quote: 'We are deliberately keeping the first batch small so every student gets direct mentor attention, code reviews, and 1:1 career support.',
  },
  {
    name: 'Portfolio Over Certificates', initials: 'PO',
    quote: 'You graduate with 10+ real projects and a capstone — evidence employers can inspect, not just a certificate to frame.',
  },
  {
    name: 'Skin in the Game', initials: 'SG',
    quote: 'As our first batch, your outcome is our reputation. We succeed only if you do — and we have built the program accordingly.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-quote-left" style={{ marginRight: '.4rem' }} />
            Our Commitment
          </span>
          <h2 className="section-title">
            Why We <span className="grad">Built This</span>
          </h2>
          <p className="section-desc">
            You're joining our founding batch — here's what we stand for and what you can hold us to.
          </p>
        </Reveal>

        {/* ── Oversized pull-quote — the section's visual anchor ── */}
        <Reveal className={styles.featured}>
          <i className={`fa-solid fa-quote-left ${styles.featuredMark}`} aria-hidden="true" />
          <blockquote className={styles.featuredQuote}>
            {FOUNDER_NOTE.quote}
          </blockquote>
          <div className={styles.featuredMeta}>
            <div className={styles.avatarLg}>{FOUNDER_NOTE.initials}</div>
            <div className={styles.featuredPerson}>
              <h4>{FOUNDER_NOTE.name}</h4>
              <span>{FOUNDER_NOTE.role}</span>
            </div>
          </div>
        </Reveal>

        {/* ── Supporting commitments — all visible, no pagination ── */}
        <Reveal stagger className={styles.grid}>
          {PRINCIPLES.map(t => (
            <RevealItem key={t.name} className={styles.card}>
              <i className={`fa-solid fa-quote-left ${styles.quoteMark}`} />
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.person}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <h4>{t.name}</h4>
                  <span>Founding Batch Commitment</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
