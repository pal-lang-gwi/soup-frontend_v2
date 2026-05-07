import styles from '../AdminPage.module.scss'
import { AdminIcon } from './AdminIcon'

export const AdminTopBar = () => {
  return (
    <header className={styles.topBar}>
      <label className={styles.globalSearch}>
        <AdminIcon name='search' />
        <input placeholder='검색 (사용자, 키워드, 콘텐츠...)' />
      </label>

      <button type='button' className={styles.profileMenu}>
        <span>A</span>
        <strong>
          admin<small>관리자</small>
        </strong>
        <AdminIcon name='chevron' />
      </button>
    </header>
  )
}
