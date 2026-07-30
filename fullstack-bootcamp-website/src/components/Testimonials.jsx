import styles from './Testimonials.module.css'
import { Reveal, RevealItem } from './Reveal'

/* ── PLACEHOLDER testimonials: replace with real student quotes & photos ── */
const TESTIMONIALS = [
  {
    name: 'Rohan Trivedi', batch: 'Batch of 2024', stars: 5, initials: 'RT',
    quote: 'I joined with zero coding knowledge. The mentors broke everything down step by step, and within 10 months I had a portfolio that got me hired.',
  },
  {
    name: 'Ananya Iyer', batch: 'Batch of 2024', stars: 5, initials: 'AI',
    quote: 'The mock interviews and resume workshops made all the difference. I cracked my first interview at a product startup in Ahmedabad.',
  },
  {
    name: 'Jay Prajapati', batch: 'Batch of 2023', stars: 4, initials: 'JP',
    quote: 'Small batch size meant I could actually ask questions. The capstone project became the centerpiece of every interview I gave.',
  },
  {
    name: 'Kavya Bhatt', batch: 'Batch of 2023', stars: 5, initials: 'KB',
    quote: 'Switched from a non-IT job at 26. The evening batch schedule let me learn while working. Best career decision I have made.',
  },
  {
    name: 'Harsh Solanki', batch: 'Batch of 2024', stars: 5, initials: 'HS',
    quote: 'Real projects, real code reviews, real deadlines. It felt like working at a company before I even got the job.',
  },
]

/* The strongest quote anchors the section; the rest support it below */
const [FEATURED, ...SUPPORTING] = TESTIMONIALS

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, s) => (
        <i
          key={s}
          className="fa-solid fa-star"
          style={{ color: s < count ? 'var(--orange)' : 'var(--gray-200)' }}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-quote-left" style={{ marginRight: '.4rem' }} />
            Testimonials
          </span>
          <h2 className="section-title">
            What Our <span className="grad">Students Say</span>
          </h2>
          <p className="section-desc">
            Real experiences from students who transformed their careers with us.
          </p>
        </Reveal>

        {/* ── Oversized pull-quote — the section's visual anchor ── */}
        <Reveal className={styles.featured}>
          <i className={`fa-solid fa-quote-left ${styles.featuredMark}`} aria-hidden="true" />
          <blockquote className={styles.featuredQuote}>
            {FEATURED.quote}
          </blockquote>
          <div className={styles.featuredMeta}>
            <div className={styles.avatarLg}>{FEATURED.initials}</div>
            <div className={styles.featuredPerson}>
              <h4>{FEATURED.name}</h4>
              <span>{FEATURED.batch}</span>
            </div>
            <Stars count={FEATURED.stars} />
          </div>
        </Reveal>

        {/* ── Supporting quotes — all visible, no pagination ── */}
        <Reveal stagger className={styles.grid}>
          {SUPPORTING.map(t => (
            <RevealItem key={t.name} className={styles.card}>
              <i className={`fa-solid fa-quote-left ${styles.quoteMark}`} />
              <p className={styles.quote}>{t.quote}</p>
              <Stars count={t.stars} />
              <div className={styles.person}>
                {/* Photo placeholder — swap for <img> when photos exist */}
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.batch}</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
