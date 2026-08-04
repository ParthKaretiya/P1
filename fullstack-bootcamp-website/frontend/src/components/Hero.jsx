import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import styles from './Hero.module.css'
/* PLACEHOLDER AI-generated classroom image — swap for a real photo later */
import heroClassroomWebp from '../assets/hero-classroom-PLACEHOLDER-ai-generated.webp'
import heroClassroomJpg from '../assets/hero-classroom-PLACEHOLDER-ai-generated.jpg'

export default function Hero() {
  const visualRef = useRef(null)
  const reduce = useReducedMotion()

  /* Soft parallax: layers drift at different speeds as the hero scrolls out.
     useScroll/useTransform called unconditionally per Rules of Hooks; Motion's
     reduced-motion detection internally skips transform updates for users
     who opted out. We then pass literal 0 values as fallback to force 0 offset. */
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })
  const yEditor = reduce ? 0 : useTransform(scrollYProgress, [0, 1], [30, -30])
  const yMid    = reduce ? 0 : useTransform(scrollYProgress, [0, 1], [55, -55])
  const yFront  = reduce ? 0 : useTransform(scrollYProgress, [0, 1], [85, -85])

  /* Cursor-follow glow — writes CSS vars directly (no re-render per move) */
  const onGlowMove = useCallback((e) => {
    const el = visualRef.current
    if (!el || reduce) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
    el.style.setProperty('--glow-o', '1')
  }, [reduce])
  const onGlowLeave = useCallback(() => {
    visualRef.current?.style.setProperty('--glow-o', '0')
  }, [])

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
            <i className="fa-solid fa-wand-magic-sparkles" />
            DEDICATED PLACEMENT SUPPORT &nbsp;•&nbsp; AHMEDABAD'S MOST PRACTICAL BOOTCAMP
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
              <span className={styles.statNum}>1:1</span>
              <span className={styles.statLabel}>Placement Support</span>
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
            <Link
              to="/admissions"
              className={styles.btnPrimary}
            >
              <i className="fa-solid fa-rocket" />
              Enroll Now
            </Link>
            <Link
              to="/courses"
              className={styles.btnOutline}
            >
              <i className="fa-solid fa-book-open" />
              Explore Programs & Roadmaps
            </Link>
          </div>

          {/* 7. Microcopy under CTAs */}
          <p className={styles.microcopy}>
            No-cost EMI available &bull; Free counselling session included
          </p>



        </div>

        {/* ══════════════════════════════════════
            RIGHT COLUMN — Layered glass UI mockup
        ══════════════════════════════════════ */}
        <div
          className={styles.visualCol}
          ref={visualRef}
          onPointerMove={onGlowMove}
          onPointerLeave={onGlowLeave}
        >
          {/* Electric-blue glow that trails the cursor behind the mockup */}
          <div className={styles.cursorGlow} aria-hidden="true" />

          {/* Subtle tech pattern behind mockup */}
          <div className={styles.techPattern}>
            {['⚛', '{ }', '</>', '🟢', '#', '⚡'].map((sym, i) => (
              <span key={i} className={styles.techSym} style={{ '--i': i }}>
                {sym}
              </span>
            ))}
          </div>

          <div className={styles.mockupWrap}>

            {/* Layer 1 (back) — classroom photo card */}
            <motion.div
              className={styles.photoCard}
              style={reduce ? undefined : { y: yEditor }}
            >
              <picture>
                <source srcSet={heroClassroomWebp} type="image/webp" />
                <img
                  src={heroClassroomJpg}
                  alt="Students collaborating on laptops during a Nirayush EduTech coding session"
                  className={styles.photoImg}
                  width="1376"
                  height="768"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              {/* Edge-darkening vignette keeps floating cards legible on the photo */}
              <div className={styles.photoVignette} aria-hidden="true" />
            </motion.div>

            {/* Layer 2 (middle) — glass dashboard mini-card */}
            <motion.div
              className={styles.dashCard}
              style={reduce ? undefined : { y: yMid }}
            >
              <div className={styles.dashHeader}>
                <i className="fa-solid fa-chart-line" />
                Skill Progress
              </div>
              <div className={styles.dashBars}>
                {[38, 55, 47, 70, 62, 88, 100].map((h, i) => (
                  <span key={i} className={styles.dashBar} style={{ '--h': `${h}%`, '--d': `${i * 90}ms` }} />
                ))}
              </div>
              <span className={styles.dashFoot}>HTML → React → Node → Deploy ↗</span>
            </motion.div>

            {/* Layer 3 (front) — floating stat badges at the shallowest depth */}
            <motion.div
              className={styles.badgeLayer}
              style={reduce ? undefined : { y: yFront }}
            >
              {/* Floating badge 1 — top right — Founding batch */}
              <div className={`${styles.floatCard} ${styles.cardTopRight}`}>
                <div className={styles.floatCardIcon} style={{ background: '#16a34a' }}>
                  <i className="fa-solid fa-rocket" />
                </div>
                <div>
                  <strong>Founding Batch</strong>
                  <span>Now Enrolling</span>
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
            </motion.div>

          </div>
        </div>
      </div>

      {/* Curved divider flowing into the partners/skills marquee below */}
      <div className={styles.divider} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,44 C240,92 480,4 720,30 C960,56 1200,8 1440,52 L1440,80 L0,80 Z"
            fill="var(--white)"
          />
        </svg>
      </div>
    </section>
  )
}
