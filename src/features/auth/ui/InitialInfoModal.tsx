import { useState } from 'react'
import styles from './InitialInfoModal.module.scss'
import xCircleImg from '@/shared/assets/x_circle.png' 
import { initUser } from '@/entities/user/api/initUser'

interface Props {
  onClose: () => void
}

export const InitialInfoModal = ({ onClose }: Props) => {
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE')
  const [birthDate, setBirthDate] = useState('')

  const handleSubmit = async () => {
    if (!nickname || !birthDate) {
      alert('닉네임과 생년월일을 모두 입력해주세요!')
      return
    }

    try {
      const result = await initUser({
        nickname,
        gender,
        birthDate,
      })

      if (result.success) {
        alert('정보가 등록되었습니다!')
        onClose()
        window.location.reload()
      }
    } catch (error) {
      console.error('에러 발생:', error)
      alert('등록에 실패했습니다.')
    }
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={xCircleImg} alt="닫기" />
        </button>
        <div className={styles.title}>환영합니다!</div>
        <div className={styles.subtitle}>
          더 나은 서비스를 위해<br />추가 정보를 입력해주세요.
        </div>

        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="사용하실 닉네임을 입력하세요"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>성별</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'MALE' | 'FEMALE')}
            >
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>생년월일</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          저장하기
        </button>
      </div>
    </div>
  )
}