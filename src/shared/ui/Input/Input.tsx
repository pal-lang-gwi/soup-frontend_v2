import styles from '@/shared/ui/Input/Input.module.scss'
import searchIcon from '@/shared/assets/search_icon.png'

export const Input = () => {
  return (
    <div className={styles.input}>
      <img src={searchIcon} alt='검색' className={styles.searchIcon} />
      <input type='text' className={styles.textInput} placeholder='키워드를 입력해보세요...' />
    </div>
  )
}
