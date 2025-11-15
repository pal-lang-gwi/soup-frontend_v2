import styles from './NavBar.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import soupLogo from '@/shared/assets/soup_logo.png'

export const NavBarLoggedOut = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <img src={soupLogo} alt='SOUP' className={styles.logoImage} />
        <Button size='xs' typeStyle='type2'>
          시작하기
        </Button>
      </div>
    </nav>
  )
}
