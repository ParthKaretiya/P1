import { useState } from 'react'
import styles from './Contact.module.css'
import { Reveal } from './Reveal'

const QUALIFICATIONS = [
  '10th / 12th',
  'Diploma (Computer)',
  'BCA',
  'B.Sc IT',
  'BE / B.Tech (CS/IT)',
  'MCA',
  'M.Sc IT',
  'Other',
]

export default function Contact({ onSuccess }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', qualification: '', message: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const err = {}
    if (!form.name.trim())          err.name    = 'Name is required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
                                    err.phone   = 'Enter a valid 10-digit number'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                                    err.email   = 'Enter a valid email'
    if (!form.qualification)        err.qual    = 'Please select your qualification'
    return err
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: undefined }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) { setErrors(err); return }

    setIsSubmitting(true)
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'https://p1-p2rz.onrender.com'
      const response = await fetch(`${backendUrl}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(60000), // 60s timeout for Render free tier wake-up
      })
      const data = await response.json()

      if (response.ok && data.success) {
        onSuccess('🎉 Thank you! Our counsellor will reach you within 24 hours.')
        setForm({ name: '', phone: '', email: '', qualification: '', message: '' })
        setErrors({})
      } else {
        setErrors({ submit: data.message || 'Failed to submit enquiry. Please try again.' })
      }
    } catch (err) {
      setErrors({ submit: 'Server is starting up, please wait 30 seconds and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="container">

        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-envelope" style={{ marginRight: '.4rem' }} />
            Contact
          </span>
          <h2 className="section-title">
            Start Your <span className="grad">Journey Today</span>
          </h2>
          <p className="section-desc">
            Fill out the form and our team will get back to you within 24 hours to discuss your enrollment.
          </p>
        </Reveal>

        <div className={styles.inner}>

          {/* ── Left: Contact info ───────────────────────────── */}
          <Reveal direction="left" className={styles.infoCol}>
            <h3>Get in Touch</h3>
            <p>Have questions about the program, eligibility, fees, or scholarships? We're here to help.</p>

            <div className={styles.details}>
              {/* Address */}
              <div className={styles.detail}>
                <div className={styles.detailIcon}><i className="fa-solid fa-location-dot" /></div>
                <div>
                  <strong>Our Location</strong>
                  <span>Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421</span>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.detail}>
                <div className={styles.detailIcon}><i className="fa-solid fa-phone" /></div>
                <div>
                  <strong>Call / WhatsApp</strong>
                  <span><a href="tel:+919054117266">+91 90541 17266</a></span>
                </div>
              </div>

              {/* Hours */}
              <div className={styles.detail}>
                <div className={styles.detailIcon}><i className="fa-solid fa-clock" /></div>
                <div>
                  <strong>Counselling Hours</strong>
                  <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick promise cards */}
            <div className={styles.promises}>
              {[
                { icon: 'fa-solid fa-bolt', text: '24-hr Response' },
                { icon: 'fa-solid fa-shield-halved', text: 'No Spam, Ever' },
                { icon: 'fa-solid fa-comments', text: 'Free Counselling' },
              ].map((p, i) => (
                <div key={i} className={styles.promise}>
                  <i className={p.icon} />
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Right: Enquiry form ──────────────────────────── */}
          <Reveal direction="right" className={styles.formWrap}>
            <h3>Enquiry Form</h3>
            <form id="enquiry-form" onSubmit={handleSubmit} noValidate>

              <div className={styles.formGrid}>
                {/* Name */}
                <div className={`${styles.formGroup} ${errors.name ? styles.hasError : ''}`}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className={`${styles.formGroup} ${errors.phone ? styles.hasError : ''}`}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                  />
                  {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className={`${styles.formGroup} ${errors.email ? styles.hasError : ''}`}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </div>

                {/* Qualification */}
                <div className={`${styles.formGroup} ${errors.qual ? styles.hasError : ''}`}>
                  <label htmlFor="qualification">Qualification *</label>
                  <select
                    id="qualification" name="qualification"
                    value={form.qualification}
                    onChange={handleChange}
                  >
                    <option value="">Select your qualification</option>
                    {QUALIFICATIONS.map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                  {errors.qual && <span className={styles.errorMsg}>{errors.qual}</span>}
                </div>

                {/* Message */}
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label htmlFor="message">Message / Question (Optional)</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Any questions about the course, fees, or schedule?"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {errors.submit && (
                <div style={{ color: '#ff4d4f', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '0.5rem' }} />
                  {errors.submit}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${styles.submitBtn}`}>
                <i className={isSubmitting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-paper-plane"} />
                {isSubmitting ? ' Sending...' : ' Send Enquiry'}
              </button>
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
