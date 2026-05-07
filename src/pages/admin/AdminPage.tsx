import { useState } from 'react'
import styles from './AdminPage.module.scss'
import { navItems } from './model/mockData'
import type { AdminSection } from './model/types'
import { AdminSidebar } from './ui/AdminSidebar'
import { AdminTopBar } from './ui/AdminTopBar'
import { DashboardView } from './ui/DashboardView'
import { KeywordManagementView } from './ui/KeywordManagementView'
import { PlaceholderView } from './ui/PlaceholderView'

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const activeNavItem = navItems.find((item) => item.id === activeSection) ?? navItems[0]

  return (
    <div className={styles.adminShell}>
      <AdminSidebar
        activeSection={activeSection}
        isCollapsed={isSidebarCollapsed}
        onSectionChange={setActiveSection}
        onToggleCollapsed={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      <div className={styles.contentShell}>
        <AdminTopBar />

        <main className={styles.mainContent}>
          {activeSection === 'dashboard' && <DashboardView />}
          {activeSection === 'keywords' && <KeywordManagementView />}
          {activeSection !== 'dashboard' && activeSection !== 'keywords' && (
            <PlaceholderView navItem={activeNavItem} />
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminPage
