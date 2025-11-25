import googleLogo from '../../shared/assets/logo_google_long.png'
import xCircleImg from '../../shared/assets/x_circle.png'
import styles from './LoginModal.module.scss'

const GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL

interface LoginModalProps {
  onClose: () => void
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.title}>로그인</div>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={xCircleImg} alt='닫기' />
        </button>
        <div className={styles.subtitle}>SOUP의 서비스를 계속 이용해보세요!</div>
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <img src={googleLogo} alt='구글 로그인' />
        </button>
      </div>
    </div>
  )
}

export default LoginModal
