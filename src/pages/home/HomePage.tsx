import styles from './HomePage.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import mailImg from '@/shared/assets/mail.png' 
import { NavBarLoggedIn } from '@/widgets/NavBar/NavBarLoggedIn'

import { useState, useEffect } from 'react'

import { getUser } from '@/entities/user/api/getUser'
import { keywordApi } from '@/entities/keyword/api/keywordApi'
import type { Keyword, MyKeywordDto } from '@/entities/keyword/model/type'

import { InitialInfoModal } from '@/features/user-init/ui/InitialInfoModal'

type SearchKeyword = Keyword & {
  subscriptionId?: number
}

const mergeWithMyKeywords = (
  keywords: Keyword[],
  myKeywords: MyKeywordDto[]
): SearchKeyword[] => {
  const subscriptionMap = new Map(
    myKeywords.map((item) => [item.keywordInfo.keywordId, item.subscriptionId])
  )

  return keywords.map((keyword) => {
    const subscriptionId = subscriptionMap.get(keyword.id)

    return {
      ...keyword,
      isSubscribed: subscriptionId !== undefined,
      subscriptionId,
    }
  })
}

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [myKeywords, setMyKeywords] = useState<MyKeywordDto[]>([])
  const [searchResults, setSearchResults] = useState<SearchKeyword[]>([])
  const [updatingKeywordId, setUpdatingKeywordId] = useState<number | null>(null)
  const hasSearchResults = searchResults.length > 0

  const loadMyKeywords = async () => {
    const response = await keywordApi.getMyKeywords({ page: 0, size: 20 })
    const nextMyKeywords = response.data.myKeywordDtos

    setMyKeywords(nextMyKeywords)
    setSearchResults((prev) => mergeWithMyKeywords(prev, nextMyKeywords))

    return nextMyKeywords
  }

  const handleSearch = async (value:string) => {
    if (!value.trim()) return
    
    try {
      const response = await keywordApi.searchKeywords({ keyword: value })
      setSearchResults(mergeWithMyKeywords(response.data.keywords, myKeywords))
    } catch (error: any) {
      if (error.response?.status===400) {
        alert('키워드 입력이 잘못되었습니다.')
      } else {
        alert('검색 중 오류가 발생했습니다.')
      }
    }
  }

  const handleToggleSubscription = async (keyword: SearchKeyword) => {
    if (updatingKeywordId !== null) return

    try {
      setUpdatingKeywordId(keyword.id)

      if (keyword.isSubscribed) {
        if (!keyword.subscriptionId) {
          await loadMyKeywords()
          alert('구독 정보를 다시 불러왔습니다. 한 번 더 시도해주세요.')
          return
        }

        await keywordApi.unsubscribeKeyword(keyword.subscriptionId)
      } else {
        await keywordApi.subscribeKeyword({ keywordId: keyword.id })
      }

      await loadMyKeywords()
    } catch (error) {
      console.error('키워드 구독 상태 변경에 실패했습니다.', error)
      alert('구독 상태 변경 중 오류가 발생했습니다.')
    } finally {
      setUpdatingKeywordId(null)
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

    loadMyKeywords()
      .catch((error) => {
        console.error('내 키워드 목록을 불러오는 데 실패했습니다.', error)
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

        <div className={styles.keywordRow}>
          <p>구독중인 키워드</p>
          {myKeywords.length > 0 ? (
            myKeywords.map((item) => (
              <Button key={item.subscriptionId} size='s' typeStyle='type1'>
                {item.keywordInfo.keyword}
              </Button>
            ))
          ) : (
            <span className={styles.emptyKeyword}>아직 구독한 키워드가 없어요</span>
          )}
        </div>

        <div className={[
          styles.searchContainer,
          hasSearchResults ? styles.searchContainerExpanded : '',
        ].join(' ')}>
          <div className={styles.searchWrap}>
            <Input
              placeholder='검색할 키워드를 입력해보세요'
              embedded
              expanded={hasSearchResults}
              onSubmit={handleSearch}
            />
          </div>
          
          {/* 검색 결과 리스트 */}
          {hasSearchResults && (
            <div className={styles.searchResultSection}>
              <ul className={styles.searchList}>
                {searchResults.map((item) => (
                  <li key={item.id} className={styles.searchItem}>
                    <span className={styles.keywordName}>{item.name}</span>
                    <Button 
                      size='s' 
                      typeStyle={item.isSubscribed ? 'type1' : 'type2'}
                      disabled={updatingKeywordId === item.id}
                      onClick={() => handleToggleSubscription(item)}
                    >
                       {item.isSubscribed ? '구독 해제' : '구독'}
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
