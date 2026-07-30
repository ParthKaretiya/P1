import styles from './HiringPartners.module.css'
import { Reveal } from './Reveal'

const PARTNERS = ['TechNova', 'CodeWorks', 'PixelSoft', 'CloudNine', 'DevHouse', 'InnovateX', 'WebSphere', 'DataMinds']

export default function HiringPartners() {
  const allPartners = [...PARTNERS, ...PARTNERS]

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal className={styles.inner}>
          <span className={styles.label}>Our Students Work At</span>
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
