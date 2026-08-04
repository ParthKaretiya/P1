import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
// Local optimized logo (4.6KB WebP) — replaces the old 800KB postimg.cc hotlink
import logoWebp from '../assets/logo.webp'

const LOGO_URL = logoWebp

const quickLinks = [
  { label: 'Home',            href: '/' },
  { label: 'About Us',        href: '/about' },
  { label: 'Courses',         href: '/courses' },
  { label: 'Placements',      href: '/placements' },
  { label: 'Our Commitment',  href: '/testimonials' },
  // ⚠ Faculty link hidden until real mentor lineup is confirmed
  // { label: 'Faculty',         href: '/mentors' },
  { label: 'Gallery',         href: '/gallery' },
  { label: 'FAQ',             href: '/faq' },
  { label: 'Contact Us',      href: '/contact' },
]

const programs = [
  { label: 'Full Stack Developer (MERN)', href: '/courses/fullstack-developer' },
  { label: '5-Phase Curriculum & Roadmap', href: '/courses/fullstack-developer' },
  { label: 'Admissions & Fees',           href: '/admissions' },
  { label: 'All Programs',                href: '/courses' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 4000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className={styles.footerGlass}>
      <div className="container">
        
        {/* Newsletter Banner Box */}
        <div className={styles.newsletterBox}>
          <div className={styles.newsText}>
            <h3>Subscribe to Engineering Insights</h3>
            <p>Get weekly developer roadmaps, tech interview tips, and placement updates directly in your inbox.</p>
          </div>
          <form className={styles.newsForm} onSubmit={handleNewsletter}>
            {subscribed ? (
              <div className={styles.newsSuccess} role="status" aria-live="polite">
                <i className="fa-solid fa-circle-check" /> Subscribed successfully!
              </div>
            ) : (
              <>
                <label htmlFor="newsletter-email" className={styles.newsLabel}>
                  Email Address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address..."
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  <span>Subscribe</span>
                  <i className="fa-solid fa-paper-plane" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className={styles.grid}>

          {/* Column 1: Brand & Logo */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logoLink}>
              <img src={LOGO_URL} alt="Nirayush EduTech logo" className={styles.logoImg} width="48" height="48" loading="lazy" />
            </Link>
            <p className={styles.brandDesc}>
              Ahmedabad's premier software engineering bootcamp. Transforming motivated students into industry-ready developers through 1-on-1 mentorship and production projects.
            </p>
            <div className={styles.socialRow}>
              {/* ⚠ Real social profile URLs pending — placeholder "#" links removed
                  (dead links hurt SEO/UX). Re-add with real hrefs + aria-labels:
                  { icon: 'fa-brands fa-linkedin-in', href: '...', label: 'LinkedIn' } */}
              {[
                // ⚠ LinkedIn / Instagram / YouTube hidden until the real profiles exist —
                //   placeholder '#' links fail Lighthouse (link-name / crawlable-anchors).
                //   Also add them to sameAs in src/data/structuredData.js when live.
                { icon: 'fa-brands fa-whatsapp', href: 'https://wa.me/919054117266', label: 'Chat with us on WhatsApp' },
              ].map((s, i) => (
                <a key={i} href={s.href} className={styles.socialBtn} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map(l => (
                <li key={l.href + l.label}>
                  <Link to={l.href}>
                    <i className="fa-solid fa-chevron-right" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Engineering Programs */}
          <div className={styles.col}>
            <h4>Programs</h4>
            <ul>
              {programs.map(p => (
                <li key={p.label}>
                  <Link to={p.href}>
                    <i className="fa-solid fa-chevron-right" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className={styles.col}>
            <h4>Campus & Contact</h4>
            <ul className={styles.contactList}>
              <li>
                <i className="fa-solid fa-location-dot" />
                <span>Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421</span>
              </li>
              <li>
                <i className="fa-solid fa-phone" />
                <a href="tel:+919054117266">+91 90541 17266</a>
              </li>
              <li>
                <i className="fa-brands fa-whatsapp" />
                <a href="https://wa.me/919054117266" target="_blank" rel="noreferrer">WhatsApp Inquiry</a>
              </li>
              <li>
                <i className="fa-solid fa-clock" />
                <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
              </li>
            </ul>

            {/* Embedded Map Thumbnail Link */}
            <a
              href="https://maps.google.com/?q=Skyleaf+Shop+No+01+Near+Sardardham+Khodiyar+Ahmedabad+382421"
              target="_blank"
              rel="noreferrer"
              className={styles.mapThumbBtn}
            >
              <i className="fa-solid fa-map-location-dot" />
              <span>Open Campus Map</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className={styles.bottomBar}>
          <p>
            &copy; {year} <span>Nirayush EduTech</span>. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span>·</span>
            <button onClick={scrollToTop} className={styles.topBtn}>
              Back to top <i className="fa-solid fa-arrow-up" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
