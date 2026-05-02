import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'
import soupLogo from '@/shared/assets/soup_logo.png'
import profileImg from '@/shared/assets/profile_img.png'

export const NavBarLoggedIn = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/' className={styles.logoLink} aria-label='홈으로 이동'>
          <img src={soupLogo} alt='SOUP' className={styles.logoImage} />
        </Link>
        <Link to='/mypage' className={styles.profileButton} aria-label='마이페이지로 이동'>
          <img src={profileImg} alt='' className={styles.profileImage} />
        </Link>
      </div>
    </nav>
  )
}
