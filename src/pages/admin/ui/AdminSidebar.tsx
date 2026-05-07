import soupLogo from '@/shared/assets/soup_logo.png'
import styles from '../AdminPage.module.scss'
import { navItems } from '../model/mockData'
import type { AdminSection } from '../model/types'
import { AdminIcon } from './AdminIcon'

interface AdminSidebarProps {
  activeSection: AdminSection
  isCollapsed: boolean
  onSectionChange: (section: AdminSection) => void
  onToggleCollapsed: () => void
}

export const AdminSidebar = ({
  activeSection,
  isCollapsed,
  onSectionChange,
  onToggleCollapsed,
}: AdminSidebarProps) => {
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.brand}>
        <img src={soupLogo} alt='SOUP' />
        {!isCollapsed && <strong>SOUP Admin</strong>}
      </div>

      <nav className={styles.sideNav} aria-label='관리자 메뉴'>
        {navItems.map((item) => (
          <button
            key={item.id}
            type='button'
            className={activeSection === item.id ? styles.activeNavItem : ''}
            onClick={() => onSectionChange(item.id)}
            title={isCollapsed ? item.label : undefined}
          >
            <AdminIcon name={item.icon} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <button type='button' className={styles.collapseButton} onClick={onToggleCollapsed}>
        <AdminIcon name='menu' />
        {!isCollapsed && <span>메뉴 접기</span>}
      </button>
    </aside>
  )
}
