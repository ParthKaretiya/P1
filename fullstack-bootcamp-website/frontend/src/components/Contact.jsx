import { useState, useEffect } from 'react'
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

const DEFAULT_BACKEND_URL = 'https://p1-p2rz.onrender.com'
const HONEYPOT_FIELD = 'website_interests_hp'
const TIMEOUT_MS = 60000

const normalizeUrl = (value) => (typeof value === 'string' ? value.trim().replace(/\/+$/, '') : '')

const classifyError = (error, response, status) => {
  if (error?.name === 'AbortError') return 'timeout'
  if (status === 429) return 'rate-limit'
  if (status >= 400 && status < 500) return 'client'
  if (status >= 500) return 'server'
  if (typeof response?.message === 'string' && /CORS/i.test(response.message)) return 'cors'
  if (error && !status) return 'network'
  return 'generic'
}

const errorMessage = (kind, serverMessage) => {
  switch (kind) {
    case 'timeout':
      return 'Request timed out. The backend may be starting up — please wait 30 seconds and try again.'
    case 'rate-limit':
      return 'Too many submissions from your connection. Please try again in a few minutes.'
    case 'cors':
      return 'Cross-origin request blocked. The website origin may not be authorized.'
    case 'network':
      return 'Unable to reach the server. Please check your internet and try again.'
    case 'server':
      return 'Server error. Please try again in a few minutes.'
    default:
      return serverMessage || 'Failed to submit enquiry. Please try again.'
  }
}

export default function Contact({ onSuccess }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', qualification: '', message: '',
    [HONEYPOT_FIELD]: '',
  })
  const [errors, setErrors] = useState({})

  const backendUrl = normalizeUrl(import.meta.env.VITE_API_URL || DEFAULT_BACKEND_URL)

  useEffect(() => {
    if (!backendUrl) return
    fetch(`${backendUrl}/`).catch(() => {})
  }, [backendUrl])

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Name is required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
      err.phone = 'Enter a valid 10-digit number'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      err.email = 'Enter a valid email'
    if (!form.qualification) err.qual = 'Please select your qualification'
    if (form.message && form.message.length > 2000)
      err.message = 'Message is too long (limit 2000 characters).'
    return err
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) {
      setErrors(err)
      return
    }

    setIsSubmitting(true)
    let responseBody = null
    let status = 0
    let caughtError = null

    try {
      const payload = { ...form }
      if (backendUrl.includes('localhost') || backendUrl.startsWith('http://localhost')) {
        // keep honeypot value if any
      }
      const response = await fetch(`${backendUrl}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      })
      status = response.status
      try {
        responseBody = await response.json()
      } catch {
        responseBody = null
      }

      if (response.ok && responseBody?.success) {
        onSuccess?.('🎉 Thank you! Our counsellor will reach you within 24 hours.')
        setForm({ name: '', phone: '', email: '', qualification: '', message: '', [HONEYPOT_FIELD]: '' })
        setErrors({})
        return
      }

      const kind = classifyError(null, responseBody, status)
      setErrors({ submit: errorMessage(kind, responseBody?.message) })
    } catch (err) {
      caughtError = err
      const kind = classifyError(err, responseBody, status)
      setErrors({ submit: errorMessage(kind, responseBody?.message) })
    } finally {
      if (caughtError) {
        // left intentionally for future debug logging hooks
      }
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

          <Reveal direction="left" className={styles.infoCol}>
            <h3>Get in Touch</h3>
            <p>Have questions about the program, eligibility, fees, or scholarships? We're here to help.</p>

            <div className={styles.details}>
              <div className={styles.detail}>
                <div className={styles.detailIcon}><i className="fa-solid fa-location-dot" /></div>
                <div>
                  <strong>Our Location</strong>
                  <span>Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421</span>
                </div>
              </div>

              <div className={styles.detail}>
                <div className={styles.detailIcon}><i className="fa-solid fa-phone" /></div>
                <div>
                  <strong>Call / WhatsApp</strong>
                  <span><a href="tel:+919054117266">+91 90541 17266</a></span>
                </div>
              </div>

              <div className={styles.detail}>
                <div className={styles.detailIcon}><i className="fa-solid fa-clock" /></div>
                <div>
                  <strong>Counselling Hours</strong>
                  <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

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

          <Reveal direction="right" className={styles.formWrap}>
            <h3>Enquiry Form</h3>
            <form id="enquiry-form" onSubmit={handleSubmit} noValidate>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${errors.name ? styles.hasError : ''}`}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={120}
                    autoComplete="name"
                  />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>

                <div className={`${styles.formGroup} ${errors.phone ? styles.hasError : ''}`}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    autoComplete="tel"
                  />
                  {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                </div>

                <div className={`${styles.formGroup} ${errors.email ? styles.hasError : ''}`}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={254}
                    autoComplete="email"
                  />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </div>

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

                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label htmlFor="message">Message / Question (Optional)</label>
                  <textarea
                    id="message" name="message"
                    placeholder="Any questions about the course, fees, or schedule?"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    maxLength={2000}
                  />
                  {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
                </div>
              </div>

              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor={HONEYPOT_FIELD}>Do not fill this field</label>
                <input
                  id={HONEYPOT_FIELD}
                  name={HONEYPOT_FIELD}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form[HONEYPOT_FIELD]}
                  onChange={handleChange}
                />
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
