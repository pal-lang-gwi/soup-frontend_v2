import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import styles from './MyPage.module.scss'
import { NavBarLoggedIn } from '@/widgets/NavBar/NavBarLoggedIn'
import { keywordApi } from '@/entities/keyword/api/keywordApi'
import type { MyKeywordDto } from '@/entities/keyword/model/type'
import mailImg from '@/shared/assets/mail.png'
import { Footer } from '@/shared/ui/Footer'
import { checkNickname, getUser, updateUser } from '@/entities/user/api/getUser'

const NICKNAME_MIN_LENGTH = 2
const NICKNAME_MAX_LENGTH = 20

const MyPage = () => {
  const [nicknameState, setNicknameState] = useState({
    value: '',
    error: ''
  })
  const [currentNickname, setCurrentNickname] = useState('')
  const [myKeywords, setMyKeywords] = useState<MyKeywordDto[]>([])
  const [isKeywordLoading, setIsKeywordLoading] = useState(true)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [isNicknameSubmitting, setIsNicknameSubmitting] = useState(false)
  const [updatingSubscriptionId, setUpdatingSubscriptionId] = useState<number | null>(null)

  const loadMyKeywords = useCallback(async () => {
    const response = await keywordApi.getMyKeywords({ page: 0, size: 20 })
    setMyKeywords(response.data.myKeywordDtos)
  }, [])

  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const trimmedValue = value.trim()
    const newError = trimmedValue.length < NICKNAME_MIN_LENGTH || trimmedValue.length > NICKNAME_MAX_LENGTH
      ? `닉네임은 ${NICKNAME_MIN_LENGTH}글자 이상 ${NICKNAME_MAX_LENGTH}글자 이하로 입력해주세요.`
      : ''
    
    setNicknameState({
      value,
      error: newError
    })
  }, [])

  const handleNicknameSubmit = useCallback(async () => {
    const nextNickname = nicknameState.value.trim()

    if (isNicknameSubmitting) return

    if (nextNickname.length < NICKNAME_MIN_LENGTH || nextNickname.length > NICKNAME_MAX_LENGTH) {
      setNicknameState((prev) => ({
        ...prev,
        error: `닉네임은 ${NICKNAME_MIN_LENGTH}글자 이상 ${NICKNAME_MAX_LENGTH}글자 이하로 입력해주세요.`
      }))
      return
    }

    if (nextNickname === currentNickname) {
      alert('변경된 닉네임이 없습니다.')
      return
    }

    try {
      setIsNicknameSubmitting(true)
      const isAvailable = await checkNickname(nextNickname)

      if (!isAvailable) {
        setNicknameState((prev) => ({
          ...prev,
          error: '이미 사용 중인 닉네임입니다.'
        }))
        return
      }

      const updatedUser = await updateUser({ nickname: nextNickname })
      const updatedNickname = updatedUser.nickname ?? nextNickname

      setCurrentNickname(updatedNickname)
      setNicknameState({
        value: updatedNickname,
        error: ''
      })

      alert('닉네임이 변경되었습니다.')
    } catch (error) {
      console.error('닉네임 변경에 실패했습니다.', error)
      alert('닉네임 변경에 실패했습니다.')
    } finally {
      setIsNicknameSubmitting(false)
    }
  }, [currentNickname, isNicknameSubmitting, nicknameState.value])

  const handleRemoveKeyword = useCallback(async (keyword: MyKeywordDto) => {
    if (updatingSubscriptionId !== null) return

    const keywordName = keyword.keywordInfo.keyword
    const isConfirmed = window.confirm(`'${keywordName}' 키워드 구독을 취소하시겠습니까?`)

    if (!isConfirmed) return

    try {
      setUpdatingSubscriptionId(keyword.subscriptionId)
      await keywordApi.unsubscribeKeyword(keyword.subscriptionId)
      await loadMyKeywords()
      alert(`'${keywordName}' 키워드 구독이 취소되었습니다.`)
    } catch (error) {
      console.error('키워드 구독 해제에 실패했습니다.', error)
      alert(`'${keywordName}' 키워드 구독 취소에 실패했습니다.`)
    } finally {
      setUpdatingSubscriptionId(null)
    }
  }, [loadMyKeywords, updatingSubscriptionId])

  useEffect(() => {
    getUser()
      .then((user) => {
        const nickname = user.nickname ?? ''

        setCurrentNickname(nickname)
        setNicknameState({
          value: nickname,
          error: ''
        })
      })
      .catch((error) => {
        console.error('사용자 정보를 불러오는 데 실패했습니다.', error)
        alert('사용자 정보를 불러오지 못했습니다.')
      })
      .finally(() => setIsUserLoading(false))

    loadMyKeywords()
      .catch((error) => {
        console.error('내 키워드 목록을 불러오는 데 실패했습니다.', error)
        alert('구독 중인 키워드를 불러오지 못했습니다.')
      })
      .finally(() => setIsKeywordLoading(false))
  }, [loadMyKeywords])

  return (
    <div className={styles.root}>
      <NavBarLoggedIn />

      <main className={styles.main}>
        <img src={mailImg} alt="" className={styles.backgroundMail} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.subtitle}>나만의 뉴스레터 설정을 관리하세요</div>
          <div className={styles.title}>마이페이지</div>
          <div className={styles.description}>
            개인정보와 구독 키워드를 간편하게 관리할 수 있습니다.
          </div>
        </div>

        {/* --- 프로필 섹션 --- */}
        <section className={styles.section} aria-labelledby="profile-title">
          <h2 id="profile-title" className={styles.sectionTitle}>프로필 정보</h2>

          <div className={styles.profileColumn}>
            {/* 프로필 이미지 */}
            {/* 닉네임 */}
            <div className={styles.nicknameWrapper}>
              <label htmlFor="nickname-input" className={styles.label}>
                닉네임
              </label>

              <div className={styles.inputRow}>
                <input
                  id="nickname-input"
                  className={styles.nicknameInput}
                  value={nicknameState.value}
                  onChange={handleNicknameChange}
                  aria-invalid={nicknameState.error.length > 0}
                  aria-describedby={nicknameState.error ? "nickname-error" : undefined}
                  maxLength={NICKNAME_MAX_LENGTH}
                  disabled={isUserLoading || isNicknameSubmitting}
                />

                <Button 
                  size="s" 
                  typeStyle="type2"
                  onClick={handleNicknameSubmit}
                  disabled={isUserLoading || isNicknameSubmitting || nicknameState.error.length > 0}
                >
                  {isNicknameSubmitting ? '변경 중' : '변경'}
                </Button>
              </div>

              {/* 닉네임 에러 메시지 출력 */}
              {nicknameState.error && (
                <div 
                  id="nickname-error" 
                  className={styles.errorMessage}
                  role="alert"
                >
                  {nicknameState.error}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- 키워드 섹션 --- */}
        <section className={styles.section} aria-labelledby="keyword-title">
          <h2 id="keyword-title" className={styles.sectionTitle}>구독 키워드 관리</h2>

          <div className={`${styles.description} ${styles.withMargin}`}>
            관심 없는 키워드를 클릭하여 구독을 취소할 수 있습니다.
          </div>

          <div className={styles.keywordChip}>
            {isKeywordLoading ? (
              <p className={styles.emptyMessage}>구독 중인 키워드를 불러오는 중입니다.</p>
            ) : myKeywords.length > 0 ? (
              myKeywords.map((keyword) => (
                <Button
                  key={keyword.subscriptionId}
                  size="s"
                  typeStyle="type2"
                  close
                  disabled={updatingSubscriptionId === keyword.subscriptionId}
                  onClick={() => handleRemoveKeyword(keyword)}
                >
                  {keyword.keywordInfo.keyword}
                </Button>
              ))
            ) : (
              <p className={styles.emptyMessage}>구독 중인 키워드가 없습니다.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default MyPage
