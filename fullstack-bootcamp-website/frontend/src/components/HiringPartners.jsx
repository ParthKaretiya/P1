import styles from './HiringPartners.module.css'
import { Reveal } from './Reveal'

/* ⚠ PLACEHOLDER company names — replace with REAL confirmed hiring
   relationships only (MOU / hiring commitment / genuine intent to
   interview graduates). Remove any name not backed by a real relationship. */
const PARTNERS = ['TechNova', 'CodeWorks', 'PixelSoft', 'CloudNine', 'DevHouse', 'InnovateX', 'WebSphere', 'DataMinds']

export default function HiringPartners() {
  const allPartners = [...PARTNERS, ...PARTNERS]

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal className={styles.inner}>
          <span className={styles.label}>Hiring Partners We're Building Relationships With</span>
          <div className={styles.marquee}>
            <div className={styles.track}>
              {allPartners.map((name, idx) => (
                <span key={idx} className={styles.logo}>{name}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
