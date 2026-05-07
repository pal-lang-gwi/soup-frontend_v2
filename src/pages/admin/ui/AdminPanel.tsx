import type { ReactNode } from 'react'
import styles from '../AdminPage.module.scss'

interface AdminPanelProps {
  title: string
  children: ReactNode
  actionLabel?: string
}

export const AdminPanel = ({ title, children, actionLabel = '전체 보기' }: AdminPanelProps) => {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>{title}</h2>
        <button type='button' className={styles.ghostButton}>
          {actionLabel}
        </button>
      </div>
      {children}
    </section>
  )
}
