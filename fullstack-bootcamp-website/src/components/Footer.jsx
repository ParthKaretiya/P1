import styles from './Footer.module.css'

const quickLinks = [
  { label: 'Home',         href: '#hero' },
  { label: 'Why Us',       href: '#why' },
  { label: 'Eligibility',  href: '#eligibility' },
  { label: 'Curriculum',   href: '#curriculum' },
  { label: 'Placement',    href: '#placement' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contact',      href: '#contact' },
]

const programs = [
  'Full Stack Developer',
  'MERN Stack Bootcamp',
  'React Specialisation',
  'Node.js Backend Track',
  'Cloud & DevOps Add-on',
]

const handleNav = (e, href) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <a href="#hero" className={styles.logo} onClick={e => handleNav(e, '#hero')}>
              <span className={styles.logoIcon}>N</span>
              <span className={styles.logoText}>
                <span className={styles.logoName}>Nirayush EduTech</span>
                <span className={styles.logoSub}>Full Stack Bootcamp</span>
              </span>
            </a>
            <p>
              Transforming aspirants into industry-ready full stack developers through a rigorous,
              mentorship-driven 12-month bootcamp based in Ahmedabad.
            </p>
            <div className={styles.social}>
              {[
                { icon: 'fa-brands fa-linkedin-in', href: '#' },
                { icon: 'fa-brands fa-instagram',   href: '#' },
                { icon: 'fa-brands fa-youtube',     href: '#' },
                { icon: 'fa-brands fa-whatsapp',    href: 'https://wa.me/919054117266' },
              ].map((s, i) => (
                <a key={i} href={s.href} className={styles.socialBtn} target="_blank" rel="noreferrer">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={e => handleNav(e, l.href)}>
                    <i className="fa-solid fa-chevron-right" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className={styles.col}>
            <h4>Programs</h4>
            <ul>
              {programs.map(p => (
                <li key={p}>
                  <a href="#curriculum" onClick={e => handleNav(e, '#curriculum')}>
                    <i className="fa-solid fa-chevron-right" />
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className={styles.col}>
            <h4>Contact Us</h4>
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
                <a href="https://wa.me/919054117266" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              </li>
              <li>
                <i className="fa-solid fa-clock" />
                <span>Mon–Sat: 9 AM – 7 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p>
            &copy; {year} <span>Nirayush EduTech</span>. All rights reserved.
          </p>
          <p>
            Made with <span>❤️</span> in Ahmedabad, India
          </p>
        </div>
      </div>
    </footer>
  )
}
