import styles from './FounderSection.module.css'
import { Reveal } from '../Reveal'

export default function FounderSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>

          {/* Left — photo */}
          <Reveal direction="left" className={styles.photoCol}>
            <div className={styles.photoWrap}>
              <img
                src="https://i.postimg.cc/zGpZx43Z/dr-ravi-patel.webp"
                alt="Dr. Ravi Patel — Founder, Nirayush EdTech"
                className={styles.photo}
                loading="lazy"
                width="420"
                height="520"
              />
              <div className={styles.badge}>
                <i className="fa-solid fa-award" />
                <span>Founder &amp; Director</span>
              </div>
            </div>
          </Reveal>

          {/* Right — content */}
          <Reveal direction="right" className={styles.textCol}>
            <span className="section-tag">
              <i className="fa-solid fa-user-tie" style={{ marginRight: '.4rem' }} />
              Meet the Founder
            </span>
            <h2 className="section-title">
              Dr. <span className="grad">Ravi Patel</span>
            </h2>
            <p className={styles.role}>Founder &amp; Director, Nirayush EdTech</p>
            <p className={styles.body}>
              Dr. Ravi Patel is the Founder and Director of Nirayush EdTech, an institution
              established with the vision of providing quality education and meaningful career
              opportunities to aspiring students. His dedication to education, innovation, and
              student success has been the driving force behind the growth of Nirayush.
            </p>
            <p className={styles.body}>
              Believing that every student deserves the right guidance and opportunities to succeed,
              he has fostered a learning environment that emphasizes practical exposure, mentorship,
              and holistic development. He is committed to creating an educational ecosystem where
              students are encouraged to learn with confidence, think independently, and continuously
              strive for excellence.
            </p>
            <p className={styles.body}>
              Under his leadership, Nirayush EdTech continues to empower students with the
              confidence, skills, and support needed to build successful careers and become
              responsible professionals. His vision continues to inspire the institution's mission
              of transforming lives through accessible, value-driven, and future-focused education.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <i className="fa-solid fa-briefcase" />
                <span>15+ Years Leadership &amp; Teaching Experience</span>
              </div>
              <div className={styles.highlight}>
                <i className="fa-solid fa-location-dot" />
                <span>Based in Ahmedabad, Gujarat</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
