import soupLogo from '@/shared/assets/soup_logo.png'
import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={soupLogo} alt="SOUP" className={styles.logo} />
          <p className={styles.info}>
            Copyright © 2025 SOUP. All rights reserved.
          </p>
        </div>

        <nav className={styles.links} aria-label="푸터 메뉴">
          <a href="/feedback">서비스 피드백</a>
        </nav>
      </div>
    </footer>
  )
}
