import { useState, useCallback, useRef } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import styles from './MyPage.module.scss'
import { NavBarLoggedIn } from '@/widgets/NavBar/NavBarLoggedIn'

const NICKNAME_MIN_LENGTH = 3
const NICKNAME_MAX_LENGTH = 12
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

const MyPage = () => {
  const [nicknameState, setNicknameState] = useState({
    value: '뉴스매니아',
    error: ''
  })
  const [keywords, setKeywords] = useState(['AI', '경제', '스타트업', '기술'])
  const [profileImgError, setProfileImgError] = useState(false)
  const [profileImage, setProfileImage] = useState<string>('/sample-profile.jpg')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newError = value.length < NICKNAME_MIN_LENGTH || value.length > NICKNAME_MAX_LENGTH
      ? `닉네임은 ${NICKNAME_MIN_LENGTH}글자 이상 ${NICKNAME_MAX_LENGTH}글자 이하로 입력해주세요.`
      : ''
    
    setNicknameState({
      value,
      error: newError
    })
  }, [])

  const handleNicknameSubmit = useCallback(() => {
    if (!nicknameState.error) {
      console.log('닉네임 변경:', nicknameState.value)
      // API 호출 등
    }
  }, [nicknameState])

  const handleRemoveKeyword = useCallback((keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword))
    console.log('키워드 삭제:', keyword)
  }, [])

  const handleImageChange = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 검증
    if (file.size > MAX_IMAGE_SIZE) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    // 파일 미리보기 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result) {
        setProfileImage(reader.result as string)
        setProfileImgError(false)
        console.log('이미지 변경:', file.name)
        // 여기서 API 호출하여 서버에 업로드할 수 있습니다
      }
    }
    reader.onerror = () => {
      alert('파일을 읽는 중 오류가 발생했습니다.')
    }
    reader.readAsDataURL(file)

    // input 초기화 (같은 파일을 다시 선택할 수 있도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleImageError = useCallback(() => {
    setProfileImgError(true)
  }, [])

  return (
    <div className={styles.root}>
      <NavBarLoggedIn />

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
          <div className={styles.profileImgOverlayContainer}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className={styles.fileInput}
              aria-label="프로필 이미지 파일 선택"
            />
            {!profileImgError && profileImage ? (
              <img
                src={profileImage}
                className={styles.profileImg}
                alt="프로필 이미지"
                onError={handleImageError}
              />
            ) : (
              <div className={styles.profileImgPlaceholder}>
                <svg 
                  width="60" 
                  height="60" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}

            <button
              className={styles.overlay}
              onClick={handleImageChange}
              aria-label="프로필 사진 변경하기"
              type="button"
            >
              <span className={styles.changeText}>사진 변경하기</span>
            </button>
          </div>

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
              />

              <Button 
                size="s" 
                typeStyle="type2"
                onClick={handleNicknameSubmit}
                disabled={nicknameState.error.length > 0}
              >
                변경
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
          {keywords.length > 0 ? (
            keywords.map((keyword) => (
              <Button
                key={keyword}
                size="s"
                typeStyle="type2"
                close
                onClick={() => handleRemoveKeyword(keyword)}
              >
                {keyword}
              </Button>
            ))
          ) : (
            <p className={styles.emptyMessage}>구독 중인 키워드가 없습니다.</p>
          )}
        </div>
      </section>

      <footer className={styles.footer}>푸터자리</footer>
    </div>
  )
}

export default MyPage