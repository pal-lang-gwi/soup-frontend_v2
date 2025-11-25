import { Button } from '@/shared/ui/Button/Button'
import styles from './MyPage.module.scss'
import { NavBarLoggedIn } from '@/widgets/NavBar/NavBarLoggedIn'

const MyPage = () => {
  const handleProfileImageChange = () => {
    console.log('이미지 변경 클릭')
    // 파일 업로드 input 트리거 연결 가능
  }

  return (
    <div className={styles.root}>
      <NavBarLoggedIn />

      <div className={styles.header}>
        <div className={styles.subtitle}>나만의 뉴스레터 설정을 관리하세요</div>
        <div className={styles.title}>마이페이지</div>
        <div className={styles.desc}>
          개인정보와 구독 키워드를 간편하게 관리할 수 있습니다.
        </div>
      </div>

      {/* --- 프로필 섹션 --- */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>프로필 정보</div>

        <div className={styles.profileColumn}>
          {/* 프로필 이미지 */}
          <div className={styles.profileImgOverlayContainer}>
            <img
              src="/sample-profile.jpg"
              className={styles.profileImg}
              alt="profile"
            />

            <div
              className={styles.overlay}
              onClick={() => console.log('이미지 변경')}
            >
              <span className={styles.changeText}>사진 변경하기</span>
            </div>
          </div>

          {/* 닉네임 */}
          <div className={styles.nicknameWrapper}>
            <span className={styles.label}>닉네임</span>

            <div className={styles.inputRow}>
              <input
                className={styles.nicknameInput}
                defaultValue="뉴스매니아"
              />

              <Button 
                size="s" 
                typeStyle="type2"
                onClick={() => console.log('닉네임 변경')}
              >
                변경
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 키워드 섹션 --- */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>구독 키워드 관리</div>

        <div className={styles.desc2}>
          관심 없는 키워드를 클릭하여 구독을 취소할 수 있습니다.
        </div>

        <div className={styles.keywordChip}>
          <Button
            size="s"
            typeStyle="type2"
            close
            onClick={() => console.log('keyword 삭제')}
          >
            텍스트
          </Button>
        </div>
      </section>

      {/* footer */}
      <footer className={styles.footer}>푸터자리</footer>
    </div>
  )
}

export default MyPage