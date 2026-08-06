import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'motion/react'
import styles from './Navbar.module.css'
// Local optimized logo (4.6KB WebP) — replaces the old 800KB postimg.cc hotlink
import logoWebp from '../assets/logo.webp'

const LOGO_URL = logoWebp

const navItems = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Courses',      href: '/courses' },
  { label: 'Placements',   href: '/placements' },
  { label: 'Our Commitment', href: '/testimonials' },
  // ⚠ Faculty hidden until real mentor lineup is confirmed (fabricated data removed)
  // { label: 'Faculty',      href: '/mentors' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
]

const megaColumns = [
  {
    header: 'Programs & Roadmaps',
    links: [
      { label: 'Full Stack Developer (MERN)', href: '/courses/fullstack-developer', primary: true, badge: 'Enrolling' },
      { label: '5-Phase Curriculum & Roadmap', href: '/courses/fullstack-developer', primary: true },
      { label: 'All Programs',                href: '/courses' },
    ],
  },
  {
    header: 'Careers & Support',
    links: [
      { label: 'Placement Support', href: '/placements', primary: true },
      { label: 'Our Commitment',  href: '/testimonials', primary: true },
      { label: 'Hiring Network',  href: '/placements#partners' },
    ],
  },
  {
    header: 'Campus & Life',
    links: [
      // ⚠ 'Our Faculty' hidden until real mentor lineup is confirmed
      // { label: 'Our Faculty',    href: '/mentors', primary: true },
      { label: 'Campus Gallery', href: '/gallery', primary: true, badge: 'New' },
      { label: 'Blog & Guides',  href: '/blog', primary: true },
    ],
  },
  {
    header: 'Quick Action',
    links: [
      { label: 'Admissions & Fees', href: '/admissions', primary: true },
      { label: 'FAQ',               href: '/faq' },
      { label: 'Contact Us',        href: '/contact' },
    ],
  },
]

const SPRING_EASE = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [megaOpen,  setMegaOpen]  = useState(false)
  const megaWrapRef = useRef(null)
  const closeTimer  = useRef(null)
  const location    = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) return () => { document.body.style.overflow = '' }
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Close the mobile drawer if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    const onChange = (e) => { if (e.matches) setMenuOpen(false) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!megaOpen) return
    const onDown = (e) => {
      if (megaWrapRef.current && !megaWrapRef.current.contains(e.target)) setMegaOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setMegaOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [megaOpen])

  const megaEnter = () => { clearTimeout(closeTimer.current); setMegaOpen(true) }
  const megaLeave = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150)
  }

  // Mega-menu items are real <Link>s (crawlable hrefs) — this just closes the menus.
  const handleMegaLink = () => {
    setMegaOpen(false)
    setMenuOpen(false)
  }

  return (
    <>
      <header className={`${styles.headerWrapper} ${scrolled ? styles.headerScrolled : ''}`}>
        <nav className={`${styles.glassPillNav} ${scrolled ? styles.pillContracted : ''}`}>
          <div className={styles.navInner}>

            {/* Premium Logo — no aria-label: the accessible name comes from the
                visible text (avoids label-content-name-mismatch) */}
            <Link to="/" className={styles.logoLink}>
              <img
                src={LOGO_URL}
                alt=""
                aria-hidden="true"
                className={styles.logoImg}
                loading="eager"
                width="40"
                height="40"
              />
              <div className={styles.logoTextWrap}>
                <span className={styles.logoText}>Nirayush</span>
                <span className={styles.logoSub}>EduTech</span>
              </div>
            </Link>


            {/* Desktop Navigation */}
            <ul className={styles.desktopMenu}>
              {/* Mega Dropdown */}
              <li
                className={styles.megaWrap}
                ref={megaWrapRef}
                onMouseEnter={megaEnter}
                onMouseLeave={megaLeave}
              >
                <button
                  className={`${styles.navPillBtn} ${megaOpen ? styles.navPillActive : ''}`}
                  onClick={() => setMegaOpen(v => !v)}
                  aria-expanded={megaOpen}
                >
                  <span>Explore</span>
                  <i className={`fa-solid fa-chevron-down ${styles.chevron} ${megaOpen ? styles.chevronOpen : ''}`} />
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <m.div
                      className={styles.megaPanelGlass}
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: SPRING_EASE }}
                    >
                      <div className={styles.megaGrid}>
                        {megaColumns.map(col => (
                          <div key={col.header} className={styles.megaCol}>
                            <span className={styles.megaHeader}>{col.header}</span>
                            <ul className={styles.megaList}>
                              {col.links.map(link => (
                                <li key={link.label}>
                                  <Link
                                    to={link.href}
                                    className={link.primary ? styles.megaItemPrimary : styles.megaItemSecondary}
                                    onClick={handleMegaLink}
                                  >
                                    <span>{link.label}</span>
                                    {link.badge && (
                                      <span className={styles.megaBadge}>{link.badge}</span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>

              {navItems.map(item => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `${styles.navPillBtn} ${isActive ? styles.navPillActive : ''}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <m.span
                            layoutId="active-nav-pill-modern"
                            className={styles.activePillBg}
                            transition={{ duration: 0.25, ease: SPRING_EASE }}
                          />
                        )}
                        <span className={styles.navLabel}>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Action CTA & Mobile Hamburger */}
            <div className={styles.actions}>
              <Link to="/admissions" className={styles.applyBtn}>
                <span>Apply Now</span>
                <i className="fa-solid fa-arrow-right-long" />
              </Link>

              <button
                className={`${styles.hamburgerBtn} ${menuOpen ? styles.hamburgerActive : ''}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-drawer"
              >
                <span className={styles.bar1} />
                <span className={styles.bar2} />
                <span className={styles.bar3} />
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <m.div
              className={styles.mobileScrim}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <m.div
              id="mobile-nav-drawer"
              className={styles.mobileGlassDrawer}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: SPRING_EASE }}
            >
              <div className={styles.mobileMenuContainer}>
                <ul className={styles.mobileNavList}>
                  {navItems.map((item, idx) => (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 + 0.04, duration: 0.2 }}
                    >
                      <NavLink
                        to={item.href}
                        end={item.href === '/'}
                        className={({ isActive }) =>
                          `${styles.mobileNavLink} ${isActive ? styles.mobileNavActive : ''}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </m.li>
                  ))}
                </ul>

                {/* Pages that only live in the desktop mega menu */}
                <div className={styles.mobileQuickLinks}>
                  <span className={styles.mobileQuickHeader}>More</span>
                  <div className={styles.mobileQuickGrid}>
                    <Link to="/admissions" className={styles.mobileQuickLink}>Admissions & Fees</Link>
                    <Link to="/gallery" className={styles.mobileQuickLink}>Campus Gallery</Link>
                    <Link to="/faq" className={styles.mobileQuickLink}>FAQ</Link>
                  </div>
                </div>

                <div className={styles.mobileDrawerFooter}>
                  <Link to="/admissions" className={styles.mobileApplyBtn}>
                    Apply Now — Cohort 2025
                  </Link>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {megaOpen && (
          <m.div
            className={styles.backdropBlur}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
