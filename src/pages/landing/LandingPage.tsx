import styles from './LandingPage.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import mailImg from '@/shared/assets/mail.png'
import { NavBarLoggedOut } from '@/widgets/NavBar/NavBarLoggedOut'
import { useEffect,useState } from 'react'
import { getUser } from '@/entities/user/api/getUser'
import HomePage from '@/pages/home/HomePage'

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    getUser()
      .then((data) => {
        console.log('로그인 확인됨:', data)
        setIsLoggedIn(true)
      })
      .catch((err) => {
        console.log('비로그인 상태:', err)
        setIsLoggedIn(false)
      })
  }, [])

  if (isLoggedIn === null) {
    return (
      <div className={styles.splashScreen}>
        <img src={mailImg} alt="로딩중" className={styles.splashLogo} />
      </div>
    )
  }
  
  if (isLoggedIn) {
    return <HomePage />
  }

  return (
    <div className={styles.root}>
      <NavBarLoggedOut />
      <div className={styles.hero}>
        <img src={mailImg} className={styles.titleIcon} alt='mail_img' />
        <div className={styles.container}>
          <div className={styles.introBadge}>나만의 관심사로 시작하는 하루</div>
          <div className={styles.title1}>관심 키워드로</div>
          <div className={styles.title1}>나만의 뉴스를 받아보세요</div>
          <div className={styles.title2}>구독한 키워드의 최신 뉴스를 매일매일 보내드려요</div>
        </div>
      </div>
      <Input />
    </div>
  )
}

export default LandingPage
