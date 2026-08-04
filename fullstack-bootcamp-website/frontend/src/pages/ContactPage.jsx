import PageHeader from '../components/ui/PageHeader'
import Contact    from '../components/Contact'
import CtaBanner  from '../components/CtaBanner'
import styles     from './ContactPage.module.css'
import { Reveal }  from '../components/Reveal'
import { useSEO }  from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

const ADDRESS_TEXT = 'Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421, Gujarat, India'
const MAP_DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Skyleaf+Shop+No+01+Near+Sardardham+Khodiyar+Ahmedabad+382421'

export default function ContactPage({ onSuccess }) {
  useSEO({
    // → "Contact Us — Campus in Khodiyar, Ahmedabad | Nirayush EduTech"
    title: 'Contact Us — Campus in Khodiyar, Ahmedabad',
    description: 'Visit Nirayush EduTech at Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad 382421. Call +91 90541 17266 or send a message — book your free counselling visit.',
    keywords: 'contact Nirayush EduTech, bootcamp location Ahmedabad, Skyleaf Khodiyar map',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Contact' },
    ]),
  })

  const copyAddress = () => {
    navigator.clipboard.writeText(ADDRESS_TEXT)
    if (onSuccess) onSuccess('Address copied to clipboard!')
  }

  return (
    <>
      <PageHeader
        tag="Get In Touch"
        title="We'd Love to Connect With You"
        accent="Connect With You"
        desc="Have questions about eligibility, course modules, fees, or placement support? Visit our Ahmedabad campus or reach out directly to our admissions team."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />

      {/* Map + Campus Section */}
      <section className={styles.mapSection}>
        <div className="container">
          <Reveal className={styles.mapGrid}>
            <div className={styles.campusCard}>
              <span className="section-tag" style={{ marginBottom: '1rem' }}>
                <i className="fa-solid fa-location-dot" /> Primary Campus
              </span>
              <h3>Nirayush EduTech Ahmedabad</h3>
              <p className={styles.addr}>
                <strong>Address:</strong><br />
                {ADDRESS_TEXT}
              </p>

              <div className={styles.actionRow}>
                <button className={styles.copyBtn} onClick={copyAddress}>
                  <i className="fa-solid fa-copy" />
                  Copy Address
                </button>
                <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noreferrer" className={styles.directionsBtn}>
                  <i className="fa-solid fa-diamond-turn-right" />
                  Get Directions
                </a>
              </div>

              <div className={styles.contactDetails}>
                <p><i className="fa-solid fa-phone" /> <a href="tel:+919054117266">+91 90541 17266</a></p>
                <p><i className="fa-brands fa-whatsapp" /> <a href="https://wa.me/919054117266" target="_blank" rel="noreferrer">WhatsApp Inquiry</a></p>
                <p><i className="fa-solid fa-clock" /> Mon – Sat: 9:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className={styles.mapFrameWrap}>
              <iframe
                title="Nirayush EduTech Exact Location Map"
                src="https://maps.google.com/maps?q=Skyleaf%20Shop%20No%2001%20Near%20Sardardham%20Khodiyar%20Ahmedabad%20382421&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Contact onSuccess={onSuccess} />
      <CtaBanner />
    </>
  )
}
