import styles from '../AdminPage.module.scss'
import type { AdminNavItem } from '../model/types'
import { AdminIcon } from './AdminIcon'

interface PlaceholderViewProps {
  navItem: AdminNavItem
}

export const PlaceholderView = ({ navItem }: PlaceholderViewProps) => {
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>{navItem.label}</h1>
        <p>관리자 콘솔 화면을 준비 중입니다</p>
      </div>
      <section className={styles.placeholderPanel}>
        <AdminIcon name={navItem.icon} />
        <h2>{navItem.label} 운영 화면</h2>
        <p>대시보드와 키워드 관리 화면의 레이아웃과 동일한 패턴으로 확장할 수 있습니다.</p>
      </section>
    </>
  )
}
