import styles from './Ticker.module.css'

const items = [
  { icon: 'fa-solid fa-briefcase',       label: 'Career Ready' },
  { icon: 'fa-solid fa-layer-group',     label: 'Full Stack' },
  { icon: 'fa-solid fa-book',            label: 'Industry Curriculum' },
  { icon: 'fa-solid fa-laptop-code',     label: 'Hands-on Projects' },
  { icon: 'fa-solid fa-user-graduate',   label: 'Expert Mentorship' },
  { icon: 'fa-solid fa-handshake',       label: 'Placement Preparation' },
  { icon: 'fa-solid fa-award',           label: 'Founding Batch Enrolling' },
  { icon: 'fa-brands fa-react',          label: 'React & MERN Stack' },
]

export default function Ticker() {
  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div className={styles.ticker} id="ticker">
      <div className={styles.track}>
        {all.map((item, idx) => (
          <span key={idx} className={styles.item}>
            <i className={item.icon} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
