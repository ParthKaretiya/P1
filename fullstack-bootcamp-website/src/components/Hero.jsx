import styles from './Hero.module.css'
import studentImg from '../assets/student_hero.jpg'

/* ── PLACEHOLDER: swap these for real hiring-partner logos ──
   To use image logos, replace `name` text with an <img> in the
   render below (grayscale styling is handled in CSS). */
const PARTNERS = ['TechNova', 'CodeWorks', 'PixelSoft', 'CloudNine', 'DevHouse']

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className={styles.hero}>
      {/* Background layers (clipped to section) */}
      <div className={styles.bgWrap}>
        {/* Subtle dot-grid overlay */}
        <div className={styles.dotGrid} />

        {/* Ambient glow blobs */}
        <div className={styles.blobOrange} />
        <div className={styles.blobNavy} />
      </div>

      <div className={`container ${styles.inner}`}>

        {/* ══════════════════════════════════════
            LEFT COLUMN — Text content
        ══════════════════════════════════════ */}
        <div className={styles.textCol}>

          {/* 1. Badge pill */}
          <div className={styles.badge}>
            <i className="fa-solid fa-shield-halved" />
            100% Placement Assistance &nbsp;|&nbsp; Ahmedabad's Most Practical Full Stack Program
          </div>

          {/* 2. Headline */}
          <h1 className={styles.title}>
            From Beginner to{' '}
            <span className={styles.accent}>Industry-Ready</span>
            {' '}Full Stack Developer
          </h1>

          {/* 3. Tagline */}
          <p className={styles.tagline}>
            Learn. Build. Get Hired.
          </p>

          {/* 4. Stats row */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>14+</span>
              <span className={styles.statLabel}>Core Modules</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Placement Assistance</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>12 Months</span>
              <span className={styles.statLabel}>Intensive Training</span>
            </div>
          </div>

          {/* 5. Urgency line */}
          <div className={styles.urgency}>
            <i className="fa-solid fa-hourglass-half" />
            Next Batch Starting Soon — <strong>Limited Seats Available</strong>
          </div>

          {/* 6. CTA buttons */}
          <div className={styles.ctas}>
            <a
              href="#contact"
              className={styles.btnPrimary}
              onClick={scrollTo('#contact')}
            >
              <i className="fa-solid fa-rocket" />
              Enroll Now
            </a>
            <a
              href="#curriculum"
              className={styles.btnOutline}
              onClick={scrollTo('#curriculum')}
            >
              <i className="fa-solid fa-book-open" />
              View Curriculum
            </a>
          </div>

          {/* 7. Microcopy under CTAs */}
          <p className={styles.microcopy}>
            No-cost EMI available &bull; Free counselling session included
          </p>



        </div>

        {/* ══════════════════════════════════════
            RIGHT COLUMN — Photo visual
        ══════════════════════════════════════ */}
        <div className={styles.visualCol}>

          {/* Subtle tech pattern behind photo */}
          <div className={styles.techPattern}>
            {['⚛', '{ }', '</>', '🟢', '#', '⚡'].map((sym, i) => (
              <span key={i} className={styles.techSym} style={{ '--i': i }}>
                {sym}
              </span>
            ))}
          </div>

          {/* Student photo */}
          <div className={styles.photoWrap}>
            <img
              src={studentImg}
              alt="Nirayush EduTech student working on full stack project"
              className={styles.photo}
            />

            {/* Floating badge 1 — top right — Placement stat
                PLACEHOLDER NUMBER: update "500+" with the real figure */}
            <div className={`${styles.floatCard} ${styles.cardTopRight}`}>
              <div className={styles.floatCardIcon} style={{ background: '#16a34a' }}>
                <i className="fa-solid fa-user-graduate" />
              </div>
              <div>
                <strong>500+ Students</strong>
                <span>Placed in Tech Roles</span>
              </div>
            </div>

            {/* Floating badge 2 — bottom left — Scholarship */}
            <div className={`${styles.floatCard} ${styles.cardBotLeft}`}>
              <div className={styles.floatCardIcon} style={{ background: 'var(--navy-mid)' }}>
                <i className="fa-solid fa-trophy" />
              </div>
              <div>
                <strong>Scholarship</strong>
                <span>Available for 7+ CGPA</span>
              </div>
            </div>

            {/* Floating badge 3 — bottom right — Duration */}
            <div className={`${styles.floatCard} ${styles.cardBotRight}`}>
              <div className={styles.floatCardIcon} style={{ background: 'var(--navy)' }}>
                <i className="fa-solid fa-calendar-days" />
              </div>
              <div>
                <strong>12-Month</strong>
                <span>Intensive Program</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
