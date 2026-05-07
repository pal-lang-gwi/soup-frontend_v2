import { useState } from 'react'
import styles from '../AdminPage.module.scss'
import type { KeywordAdminTab } from '../model/keywordManagement'
import { KeywordListPanel } from './KeywordListPanel'
import { KeywordRequestPanel } from './KeywordRequestPanel'

export const KeywordManagementView = () => {
  const [activeTab, setActiveTab] = useState<KeywordAdminTab>('requests')

  return (
    <>
      <div className={styles.pageTitle}>
        <h1>키워드 관리</h1>
        <p>사용자 키워드 요청과 서비스 키워드 목록을 관리합니다</p>
      </div>

      <div className={styles.managementTabs}>
        <button
          type='button'
          className={activeTab === 'requests' ? styles.activeTab : ''}
          onClick={() => setActiveTab('requests')}
        >
          요청 관리
        </button>
        <button
          type='button'
          className={activeTab === 'keywords' ? styles.activeTab : ''}
          onClick={() => setActiveTab('keywords')}
        >
          키워드 목록
        </button>
      </div>

      {activeTab === 'requests' ? <KeywordRequestPanel /> : <KeywordListPanel />}
    </>
  )
}
