import styles from './LandingPage.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import mailImg from '@/shared/assets/mail.png'

const LandingPage = () => {
  return (
    <div className={styles.root}>
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
