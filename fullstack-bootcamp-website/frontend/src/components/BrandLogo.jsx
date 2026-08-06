import styles from './BrandLogo.module.css'

export default function BrandLogo({ size = 40, showText = true, className = '' }) {
  return (
    <span className={`${styles.wrap} ${className}`} style={{ gap: showText ? 10 : 0 }}>
      <svg
        className={styles.icon}
        viewBox="0 0 64 64"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="brandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#0f172a" />
        <g fill="url(#brandLogoGrad)">
          <polygon points="32,10 56,22 32,34 8,22" />
          <rect x="17" y="24" width="4" height="18" rx="2" opacity="0.7" />
          <path d="M21,27 Q21,44 32,47 Q43,44 43,27 L32,34 Z" />
          <line x1="19" y1="42" x2="19" y2="48" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          <circle cx="19" cy="51" r="3" fill="#f97316" />
        </g>
      </svg>
      {showText && (
        <span className={styles.text}>
          <span className={styles.title}>Nirayush</span>
          <span className={styles.sub}>EdTech</span>
        </span>
      )}
    </span>
  )
}
