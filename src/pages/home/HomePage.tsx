import styles from './HomePage.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import mailImg from '@/shared/assets/mail.png'
import { NavBarLoggedIn } from '@/widgets/NavBar/NavBarLoggedIn'

import { useState, useEffect } from 'react'

import { getUser } from '@/entities/user/api/getUser'
import { getKeywords } from '@/entities/keyword/api/getKeywords' 
import type { Subscription } from '@/entities/keyword/api/getKeywords' 
import { InitialInfoModal } from '@/features/user-init/ui/InitialInfoModal'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [keywords, setKeywords] = useState<Subscription[]>([])

  useEffect(() => {
    // 유저 정보 조회
    getUser()
      .then((data) => {
        if (!data.nickname) {
          setShowModal(true)
        }
      })
      .catch((error) => {
        console.error('유저 정보를 불러오는 데 실패했습니다.', error)
      })

    // 키워드 목록 조회
    getKeywords()
      .then((data) => {
        setKeywords(data)
      })
      .catch((error) => {
        console.error('키워드 목록을 불러오는 데 실패했습니다.', error)
      })
  }, [])

  return (
    <>
      <div className={styles.root}>
        <NavBarLoggedIn />
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
        </div>

        <div className={styles.keywordRow}>
          <p>구독중인 키워드</p>
          {keywords.length > 0 ? (
            keywords.map((item) => (
              <Button key={item.subscriptionId} size='s' typeStyle='type1'>
                {item.keywordInfo.keyword}
              </Button>
            ))
          ) : (
            <span className={styles.emptyText}>구독 중인 키워드가 없습니다.</span>
          )}
        </div>
        <Input />
      </div>

      {showModal && (
        <InitialInfoModal onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

export default HomePage