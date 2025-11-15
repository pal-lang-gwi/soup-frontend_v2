import styles from './NavBar.module.scss'
import soupLogo from '@/shared/assets/soup_logo.png'

export const NavBarLoggedIn = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <img src={soupLogo} alt='SOUP' className={styles.logoImage} />
        <button className={styles.profileButton} type='button'></button>
      </div>
    </nav>
  )
}
