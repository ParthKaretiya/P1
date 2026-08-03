import styles from './Toast.module.css'

export default function Toast({ show, message }) {
  return (
    <div className={`${styles.toast} ${show ? styles.show : ''}`} role="alert" aria-live="polite">
      <i className="fa-solid fa-circle-check" />
      <span className={styles.msg}>{message}</span>
    </div>
  )
}
