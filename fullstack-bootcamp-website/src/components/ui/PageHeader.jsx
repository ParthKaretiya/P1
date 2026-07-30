import styles from './PageHeader.module.css'
import { Reveal } from '../Reveal'
import { Link } from 'react-router-dom'

/**
 * Premium Sub-page Hero Banner (Deep Navy w/ Mesh Gradient)
 */
export default function PageHeader({ tag, title, accent, desc, breadcrumbs = [] }) {
  return (
    <section className={styles.header}>
      <div className={styles.meshBg} />
      <div className={styles.dotGrid} />
      <div className="container">
        {breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className={styles.crumbItem}>
                {i > 0 && <i className="fa-solid fa-chevron-right" />}
                {crumb.href ? (
                  <Link to={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span className={styles.current}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <Reveal className={styles.content}>
          {tag && (
            <span className={styles.tag}>
              {tag}
            </span>
          )}
          <h1 className={styles.title}>
            {accent
              ? title.split(accent).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <span className={styles.accent}>{accent}</span>}
                  </span>
                ))
              : title
            }
          </h1>
          {desc && <p className={styles.desc}>{desc}</p>}
        </Reveal>
      </div>
    </section>
  )
}
