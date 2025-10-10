import styles from './HomePage.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import mailImg from '@/shared/assets/mail.png'

const HomePage = () => {
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

      <div className={styles.keywordRow}>
        <p>인기 키워드</p>
        <Button size='s' typeStyle='type1'>
          블록체인
        </Button>
        <Button size='s' typeStyle='type1'>
          주식투자
        </Button>
        <Button size='s' typeStyle='type1'>
          파이어족
        </Button>
        <Button size='s' typeStyle='type1'>
          테슬라
        </Button>
        <Button size='s' typeStyle='type1'>
          테슬라
        </Button>
      </div>
      <div className={styles.keywordRow}>
        <p>검색기록</p>
        <Button size='s' typeStyle='type1' close={true}>
          블록체인
        </Button>
        <Button size='s' typeStyle='type1' close={true}>
          주식투자
        </Button>
        <Button size='s' typeStyle='type1' close={true}>
          파이어족
        </Button>
        <Button size='s' typeStyle='type1' close={true}>
          테슬라
        </Button>
        <Button size='s' typeStyle='type1' close={true}>
          테슬라
        </Button>
      </div>

      {/* 검색창 */}
      <div className={styles.searchBar}></div>
    </div>
  )
}

export default HomePage
