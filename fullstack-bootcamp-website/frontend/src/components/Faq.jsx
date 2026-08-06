import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'motion/react'
import styles from './Faq.module.css'
import { Reveal, EASE } from './Reveal'
import { injectJsonLd } from '../hooks/useSEO'
import { buildFaqSchema } from '../data/schema'

// Exported so FAQPage JSON-LD structured data matches the visible content exactly.
export const FAQS = [
  {
    q: 'Do I need coding experience to join?',
    a: 'No. The program starts from absolute fundamentals — HTML, CSS, and basic programming logic. Most of our students come from non-coding backgrounds. All you need is basic computer literacy and a strong willingness to learn.',
  },
  {
    q: 'What is the placement assistance process?',
    a: 'From month 9 onward, our placement cell works with you on resume building, LinkedIn optimization, mock technical interviews, and HR round preparation. We then introduce you to companies in our growing hiring network and support you through interviews until you receive an offer. We commit to the process — outcomes depend on your performance in company interviews.',
  },
  {
    q: 'Is EMI available?',
    a: 'Yes — no-cost EMI is available, letting you split the program fee into monthly installments with zero interest. Our counsellors will help you pick a plan during enrollment.',
  },
  {
    q: 'What is the class schedule?',
    a: 'Classes run Monday to Saturday with morning and evening batch options. Each session is around 2 hours of live instruction, plus lab/practice time. Weekend doubt-clearing sessions are held every week.',
  },
  {
    q: 'What happens if I miss a class?',
    a: 'Every live session is recorded and available 24/7 in your student portal. You can also attend the same topic in a parallel batch or bring questions to the weekly doubt-clearing session.',
  },
  {
    q: 'Is there a certificate on completion?',
    a: 'Yes. On completing the program and capstone project, you receive an industry-recognized Full Stack Developer certification from Nirayush EdTech, which you can add to your resume and LinkedIn.',
  },
  {
    q: 'What is the refund policy?',
    a: 'If you decide the program is not for you within the first 7 days of classes, you are eligible for a full refund, no questions asked. After that, refunds are prorated as per the enrollment agreement.',
  },
  {
    q: 'How is the scholarship calculated?',
    a: 'Scholarships are merit-based, primarily on your academic record — students with 7+ CGPA (or equivalent) qualify for up to 25% off the program fee. Slots are limited per batch and awarded after a short interview.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  // FAQPage JSON-LD — mirrors the exact visible questions/answers above
  useEffect(() => injectJsonLd('faq', buildFaqSchema(FAQS)), [])

  return (
    <section id="faq" className={styles.section}>
      <div className="container">

        <Reveal className={styles.head}>
          <span className="section-tag">
            <i className="fa-solid fa-circle-question" style={{ marginRight: '.4rem' }} />
            FAQ
          </span>
          <h2 className="section-title">
            Frequently Asked <span className="grad">Questions</span>
          </h2>
          <p className="section-desc">
            Everything you need to know before joining. Still have questions? Reach out below.
          </p>
        </Reveal>

        <Reveal className={styles.list}>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            const qid = `faq-q-${i}`
            const pid = `faq-panel-${i}`
            return (
              <div key={f.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  id={qid}
                  className={styles.question}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={pid}
                >
                  <span>{f.q}</span>
                  <i className={`fa-solid fa-chevron-down ${styles.chevron}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={pid}
                      role="region"
                      aria-labelledby={qid}
                      className={styles.answerInner}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className={styles.answer}>{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>

      </div>
    </section>
  )
}
