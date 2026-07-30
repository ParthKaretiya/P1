import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './Navbar.module.css'

const navItems = [
  { label: 'Home',         href: '#hero' },
  { label: 'Why Us',       href: '#why' },
  { label: 'Eligibility',  href: '#eligibility' },
  { label: 'Placement',    href: '#placement' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contact',      href: '#contact' },
]

/* ── Mega-menu content: 4 columns of links ── */
const megaColumns = [
  {
    header: 'Program',
    links: [
      { label: 'Curriculum Phases',  href: '#curriculum', primary: true, badge: 'Popular' },
      { label: 'Eligibility',        href: '#eligibility', primary: true },
      { label: 'Download Syllabus',  href: '#curriculum' },
    ],
  },
  {
    header: 'Outcomes',
    links: [
      { label: 'Placement Stats',  href: '#placement', primary: true },
      { label: 'Alumni Success',   href: '#placement', primary: true },
      { label: 'Testimonials',     href: '#testimonials' },
    ],
  },
  {
    header: 'Pricing',
    links: [
      { label: 'Fees & EMI',   href: '#pricing', primary: true },
      { label: 'Scholarship',  href: '#pricing', primary: true, badge: 'New' },
    ],
  },
  {
    header: 'Resources',
    links: [
      { label: 'FAQ',      href: '#faq', primary: true },
      { label: 'Contact',  href: '#contact', primary: true },
    ],
  },
]

/* Spring-feel easing shared with the site's design language */
const SPRING_EASE = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeId,  setActiveId]  = useState('hero')
  const [megaOpen,  setMegaOpen]  = useState(false)
  const [hoveredHref, setHoveredHref] = useState(null)
  const megaWrapRef = useRef(null)
  const closeTimer  = useRef(null)

  /* Glass effect + active section tracking */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      let current = 'hero'
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 130) current = sec.id
      })
      setActiveId(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Close mega-menu on click outside or Escape */
  useEffect(() => {
    if (!megaOpen) return
    const onDown = (e) => {
      if (megaWrapRef.current && !megaWrapRef.current.contains(e.target)) {
        setMegaOpen(false)
      }
    }
    const onKey = (e) => { if (e.key === 'Escape') setMegaOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [megaOpen])

  /* Hover open/close with a small grace period so the pointer can
     travel from trigger to panel without the menu snapping shut */
  const megaEnter = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const megaLeave = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150)
  }
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  /* Smooth scroll helper */
  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setMegaOpen(false)
    const target = document.querySelector(href)
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>

          {/* Logo */}
          <a href="#hero" className={styles.logo} onClick={e => handleNav(e, '#hero')}>
            <span className={styles.logoIcon}>N</span>
            <span className={styles.logoText}>
              <span className={styles.logoName}>Nirayush EduTech</span>
              <span className={styles.logoSub}>Full Stack Bootcamp</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
            {/* Mega-menu trigger — "Curriculum" */}
            <li
              className={styles.megaWrap}
              ref={megaWrapRef}
              onMouseEnter={megaEnter}
              onMouseLeave={megaLeave}
            >
              <button
                className={`${styles.pillItem} ${styles.megaTrigger} ${megaOpen || activeId === 'curriculum' ? styles.pillActive : ''}`}
                onClick={() => setMegaOpen(v => !v)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                Curriculum
                <i className={`fa-solid fa-chevron-down ${styles.megaChevron} ${megaOpen ? styles.megaChevronOpen : ''}`} />
              </button>

              {/* Mega panel — Motion fade + slide-down */}
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    className={styles.megaPanel}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: SPRING_EASE }}
                  >
                    <div className={styles.megaGrid}>
                      {megaColumns.map(col => (
                        <div key={col.header} className={styles.megaCol}>
                          <span className={styles.megaHeader}>{col.header}</span>
                          <ul className={styles.megaList}>
                            {col.links.map(link => (
                              <li key={link.label}>
                                <a
                                  href={link.href}
                                  className={link.primary ? styles.megaLink : styles.megaLinkMuted}
                                  onClick={e => handleNav(e, link.href)}
                                >
                                  {link.label}
                                  {link.badge && (
                                    <span className={styles.megaBadge}>{link.badge}</span>
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {navItems.map(item => {
              const id = item.href.slice(1)
              const highlighted = hoveredHref === item.href || activeId === id
              return (
                <li key={item.href} className={styles.navItem}>
                  {/* Shared pill slides between items via layoutId */}
                  {highlighted && (
                    <motion.span
                      layoutId="nav-pill"
                      className={styles.pillBg}
                      transition={{ duration: 0.25, ease: SPRING_EASE }}
                    />
                  )}
                  <a
                    href={item.href}
                    className={`${styles.pillItem} ${highlighted ? styles.pillActive : ''}`}
                    onClick={e => handleNav(e, item.href)}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    onMouseLeave={() => setHoveredHref(null)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Always-visible CTA + hamburger */}
          <div className={styles.actions}>
            <a
              href="#contact"
              className={styles.navCta}
              data-magnetic
              onClick={e => handleNav(e, '#contact')}
            >
              Enroll Now
            </a>
            <button
              id="hamburger"
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Dimmed + blurred backdrop while the mega-menu is open */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            className={styles.megaBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: SPRING_EASE }}
          />
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}
