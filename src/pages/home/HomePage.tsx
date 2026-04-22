import styles from './HomePage.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import mailImg from '@/shared/assets/mail.png' 
import { NavBarLoggedIn } from '@/widgets/NavBar/NavBarLoggedIn'

import { useState, useEffect } from 'react'

import { getUser } from '@/entities/user/api/getUser'
import { keywordApi } from '@/entities/keyword/api/keywordApi'
import type { Keyword } from '@/entities/keyword/model/type'

import { InitialInfoModal } from '@/features/user-init/ui/InitialInfoModal'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchResults, setSearchResults] = useState<Keyword[]>([]) 

  const handleSearch = async (value:string) => {
    if (!value.trim()) return
    
    try {
      const response = await keywordApi.searchKeywords({ keyword: value })
      setSearchResults(response.data.keywords)
      console.log('검색 결과:', response.data.keywords)
    } catch (error: any) {
      if (error.response?.status===400) {
        alert('키워드 입력이 잘못되었습니다.')
      } else {
        alert('검색 중 오류가 발생했습니다.')
      }
    }
  }

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
          <Button size='s' typeStyle='type1'>블록체인</Button>
          <Button size='s' typeStyle='type1'>주식투자</Button>
          <Button size='s' typeStyle='type1'>파이어족</Button>
          <Button size='s' typeStyle='type1'>테슬라</Button>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchWrap}>
            <Input placeholder='검색할 키워드를 입력해보세요' onSubmit={handleSearch} />
          </div>
          
          {/* 검색 결과 리스트 */}
          {searchResults.length > 0 && (
            <div className={styles.searchResultSection}>
              <ul className={styles.searchList}>
                {searchResults.map((item) => (
                  <li key={item.id} className={styles.searchItem}>
                    <span className={styles.keywordName}>{item.name}</span>
                    <span className={styles.subStatus}>
                      {item.isSubscribed ? '(구독중)' : '(미구독)'}
                    </span>
                    <Button 
                      size='s' 
                      typeStyle={item.isSubscribed ? 'type2' : 'type1'}
                      onClick={() => {
                        if (item.isSubscribed) {
                          alert(`'${item.name}' 키워드 구독을 해제합니다.`)
                        } else {
                          alert(`'${item.name}' 키워드 구독을 신청합니다.`)
                        }
                      }}
                    >
                       {item.isSubscribed ? '해제' : '구독'}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <InitialInfoModal onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

export default HomePage
