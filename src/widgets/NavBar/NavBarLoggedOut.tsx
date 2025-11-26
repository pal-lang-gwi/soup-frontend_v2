import { useState } from 'react'
import styles from './NavBar.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import soupLogo from '@/shared/assets/soup_logo.png'
import { LoginModal } from '@/widgets/auth/LoginModal'

export const NavBarLoggedOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <img src={soupLogo} alt='SOUP' className={styles.logoImage} />
        <Button size='xs' typeStyle='type2' onClick={handleOpenModal}>
          시작하기
        </Button>
      </div>

      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
    </nav>
  )
}
