import styles from '../AdminPage.module.scss'
import {
  contentSummaries,
  dashboardMetrics,
  keywordCollectionStatus,
  mailLogs,
  popularKeywords,
  recentErrors,
  systemStatus,
} from '../model/mockData'
import { AdminIcon } from './AdminIcon'
import { AdminPanel } from './AdminPanel'
import { MetricGrid } from './MetricGrid'

export const DashboardView = () => {
  return (
    <>
      <div className={styles.pageTitle}>
        <h1>대시보드</h1>
      </div>

      <MetricGrid items={dashboardMetrics} />

      <div className={styles.sectionTitle}>운영 핵심 화면</div>

      <div className={styles.dashboardTopGrid}>
        <AdminPanel title='메일 로그'>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>이메일</th>
                <th>상태</th>
                <th>발송 시간</th>
              </tr>
            </thead>
            <tbody>
              {mailLogs.map((log) => (
                <tr key={`${log.email}-${log.time}`}>
                  <td>{log.email}</td>
                  <td>
                    <span
                      className={`${styles.statusDot} ${
                        log.status === '성공' ? styles.successDot : styles.failDot
                      }`}
                    />
                    <span className={log.status === '성공' ? styles.successText : styles.failText}>
                      {log.status}
                    </span>
                  </td>
                  <td>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminPanel>

        <AdminPanel title='콘텐츠 / AI 요약'>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>키워드</th>
                <th>원문 제목</th>
                <th>AI 요약</th>
                <th>출처 URL</th>
              </tr>
            </thead>
            <tbody>
              {contentSummaries.map((content) => (
                <tr key={content.title}>
                  <td>
                    <span className={styles.keywordBadge}>{content.keyword}</span>
                  </td>
                  <td>{content.title}</td>
                  <td>{content.summary}</td>
                  <td>
                    <span className={styles.sourceLink}>
                      {content.source}
                      <AdminIcon name='external' />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminPanel>
      </div>

      <div className={styles.dashboardBottomGrid}>
        <AdminPanel title='인기 키워드'>
          <div className={styles.rankList}>
            {popularKeywords.map((keyword) => (
              <div key={keyword.rank} className={styles.rankRow}>
                <span>{keyword.rank}</span>
                <strong>{keyword.keyword}</strong>
                <em>{keyword.count}</em>
              </div>
            ))}
            <p>최근 7일 기준</p>
          </div>
        </AdminPanel>

        <AdminPanel title='키워드별 수집 상태'>
          <div className={styles.progressList}>
            {keywordCollectionStatus.map((item) => (
              <div key={item.keyword} className={styles.progressRow}>
                <span>{item.keyword}</span>
                <div className={styles.progressTrack}>
                  <div style={{ width: `${item.percent}%` }} />
                </div>
                <strong>{item.percent}%</strong>
                <em className={item.status === '정상' ? styles.normalBadge : styles.warningBadge}>
                  {item.status}
                </em>
              </div>
            ))}
            <p>최근 7일 기준</p>
          </div>
        </AdminPanel>

        <AdminPanel title='시스템 상태'>
          <div className={styles.systemList}>
            {systemStatus.map((item) => (
              <div key={item.name} className={styles.systemRow}>
                <span className={styles.statusDot} />
                <strong>{item.name}</strong>
                <em className={item.status === '정상' ? styles.normalBadge : styles.warningBadge}>
                  {item.status}
                </em>
              </div>
            ))}
            <div className={styles.panelFooter}>
              <span>최근 체크: 2025-05-16 10:33:00</span>
              <button type='button'>
                <AdminIcon name='refresh' />
                새로고침
              </button>
            </div>
          </div>
        </AdminPanel>

        <AdminPanel title='최근 오류 로그'>
          <div className={styles.errorList}>
            {recentErrors.map((error) => (
              <div key={`${error.message}-${error.time}`} className={styles.errorRow}>
                <span className={styles.failDot} />
                <strong>{error.message}</strong>
                <em>{error.time}</em>
              </div>
            ))}
            <button type='button' className={styles.errorLink}>
              전체 오류 로그 보기
            </button>
          </div>
        </AdminPanel>
      </div>
    </>
  )
}
