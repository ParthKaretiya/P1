import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import styles from './Hero.module.css'

/* Stylized code lines for the editor mockup — purely decorative */
const CODE_LINES = [
  [{ t: 'const', c: 'kw' }, { t: ' developer', c: 'var' }, { t: ' = ', c: 'op' }, { t: 'new', c: 'kw' }, { t: ' FullStack', c: 'fn' }, { t: '()', c: 'op' }],
  [{ t: 'developer', c: 'var' }, { t: '.learn(', c: 'op' }, { t: "'React'", c: 'str' }, { t: ', ', c: 'op' }, { t: "'Node.js'", c: 'str' }, { t: ')', c: 'op' }],
  [{ t: 'developer', c: 'var' }, { t: '.build(', c: 'op' }, { t: 'projects', c: 'var' }, { t: ': ', c: 'op' }, { t: '10', c: 'num' }, { t: ')', c: 'op' }],
  [{ t: 'await', c: 'kw' }, { t: ' developer', c: 'var' }, { t: '.getHired(', c: 'op' }, { t: '{', c: 'op' }],
  [{ t: '  package', c: 'var' }, { t: ': ', c: 'op' }, { t: "'₹4-8 LPA'", c: 'str' }, { t: ',', c: 'op' }],
  [{ t: '  assistance', c: 'var' }, { t: ': ', c: 'op' }, { t: "'100%'", c: 'str' }],
  [{ t: '})', c: 'op' }, { t: ' // Learn. Build. Get Hired.', c: 'cmt' }],
]

export default function Hero() {
  const visualRef = useRef(null)
  const reduce = useReducedMotion()

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* Soft parallax: layers drift at different speeds as the hero scrolls out */
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })
  const yEditor = useTransform(scrollYProgress, [0, 1], [30, -30])
  const yMid = useTransform(scrollYProgress, [0, 1], [55, -55])
  const yFront = useTransform(scrollYProgress, [0, 1], [85, -85])

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
            100% PLACEMENT ASSISTANCE &nbsp;•&nbsp; AHMEDABAD'S MOST PRACTICAL BOOTCAMP
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

            {/* Layer 1 (back) — glass code editor */}
            <motion.div
              className={styles.editorCard}
              style={reduce ? undefined : { y: yEditor }}
            >
              <div className={styles.editorBar}>
                <span className={styles.winDot} data-c="r" />
                <span className={styles.winDot} data-c="y" />
                <span className={styles.winDot} data-c="g" />
                <span className={styles.editorTab}>career.js</span>
              </div>
              <pre className={styles.editorBody}>
                {CODE_LINES.map((line, i) => (
                  <div key={i} className={styles.codeLine}>
                    <span className={styles.lineNum}>{i + 1}</span>
                    <code>
                      {line.map((tok, j) => (
                        <span key={j} className={styles[`tok_${tok.c}`]}>{tok.t}</span>
                      ))}
                    </code>
                  </div>
                ))}
                <div className={styles.codeLine}>
                  <span className={styles.lineNum}>8</span>
                  <code><span className={styles.caret} /></code>
                </div>
              </pre>
            </motion.div>

            {/* Layer 2 (middle) — glass dashboard mini-card */}
            <motion.div
              className={styles.dashCard}
              style={reduce ? undefined : { y: yMid }}
            >
              <div className={styles.dashHeader}>
                <i className="fa-solid fa-chart-line" />
                Placement Dashboard
              </div>
              <div className={styles.dashBars}>
                {[38, 55, 47, 70, 62, 88, 100].map((h, i) => (
                  <span key={i} className={styles.dashBar} style={{ '--h': `${h}%`, '--d': `${i * 90}ms` }} />
                ))}
              </div>
              <span className={styles.dashFoot}>Batch outcomes ↗</span>
            </motion.div>

            {/* Layer 3 (front) — floating stat badges at the shallowest depth */}
            <motion.div
              className={styles.badgeLayer}
              style={reduce ? undefined : { y: yFront }}
            >
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
