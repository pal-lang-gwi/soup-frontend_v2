import { useCallback, useEffect, useMemo, useState } from 'react'
import { adminApi } from '@/entities/admin/api/adminApi'
import type { AdminKeywordListItemDto, AdminKeywordStatus } from '@/entities/admin/model/type'
import { downloadCsv } from '../lib/csv'
import {
  DEFAULT_PAGE_SIZE,
  keywordStatusOptions,
  statusLabel,
  type KeywordStatusFilter,
} from '../model/keywordManagement'
import styles from '../AdminPage.module.scss'
import { AdminIcon } from './AdminIcon'
import { AdminPagination } from './AdminPagination'

const statusClass: Record<AdminKeywordStatus, string> = {
  ACTIVE: styles.active,
  INACTIVE: styles.inactive,
  DELETED: styles.deleted,
  PENDING: styles.pending,
  REJECTED: styles.rejected,
}

export const KeywordListPanel = () => {
  const [keywords, setKeywords] = useState<AdminKeywordListItemDto[]>([])
  const [keywordQuery, setKeywordQuery] = useState('')
  const [keywordStatus, setKeywordStatus] = useState<KeywordStatusFilter>('all')
  const [keywordPage, setKeywordPage] = useState(0)
  const [keywordPageSize, setKeywordPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [keywordTotalPages, setKeywordTotalPages] = useState(0)
  const [keywordTotalElements, setKeywordTotalElements] = useState(0)
  const [isKeywordLoading, setIsKeywordLoading] = useState(false)
  const [keywordError, setKeywordError] = useState('')
  const [updatingKeywordId, setUpdatingKeywordId] = useState<number | null>(null)

  const filteredKeywords = useMemo(() => {
    const normalizedQuery = keywordQuery.trim().toLowerCase()

    if (!normalizedQuery) return keywords

    return keywords.filter((keyword) =>
      [String(keyword.id), keyword.name, keyword.normalizedName].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [keywordQuery, keywords])

  const loadKeywords = useCallback(async () => {
    try {
      setIsKeywordLoading(true)
      setKeywordError('')

      const response = await adminApi.getKeywords({
        status: keywordStatus === 'all' ? undefined : keywordStatus,
        page: keywordPage,
        size: keywordPageSize,
      })

      setKeywords(response.data.keywordResponseDtos)
      setKeywordTotalPages(response.data.totalPages)
      setKeywordTotalElements(response.data.totalElements)
    } catch (error) {
      console.error('키워드 목록을 불러오는 데 실패했습니다.', error)
      setKeywordError('키워드 목록을 불러오지 못했습니다.')
    } finally {
      setIsKeywordLoading(false)
    }
  }, [keywordPage, keywordPageSize, keywordStatus])

  const handleAddKeyword = async () => {
    const keyword = window.prompt('추가할 키워드를 입력해주세요.')?.trim()

    if (!keyword) return

    try {
      const response = await adminApi.addKeyword({ keyword })

      alert(`'${response.data.keyword}' 키워드를 추가했습니다.`)
      setKeywordPage(0)
      await loadKeywords()
    } catch (error) {
      console.error('키워드 추가에 실패했습니다.', error)
      alert('키워드 추가에 실패했습니다.')
    }
  }

  const handleRemoveKeyword = async (keyword: AdminKeywordListItemDto) => {
    if (updatingKeywordId !== null) return

    const removeReason = window.prompt(`'${keyword.name}' 키워드 삭제 사유를 입력해주세요.`)?.trim()

    if (!removeReason) return

    try {
      setUpdatingKeywordId(keyword.id)
      const response = await adminApi.removeKeyword({
        keywordId: keyword.id,
        removeReason,
      })

      alert(`'${response.data.keyword}' 키워드를 삭제했습니다.`)
      await loadKeywords()
    } catch (error) {
      console.error('키워드 삭제에 실패했습니다.', error)
      alert('키워드 삭제에 실패했습니다.')
    } finally {
      setUpdatingKeywordId(null)
    }
  }

  const handleExportKeywords = () => {
    downloadCsv(
      'admin-keywords.csv',
      ['키워드 ID', '키워드', '정규화 키워드', '상태'],
      filteredKeywords.map((keyword) => [
        String(keyword.id),
        keyword.name,
        keyword.normalizedName,
        statusLabel[keyword.status],
      ]),
    )
  }

  useEffect(() => {
    loadKeywords()
  }, [loadKeywords])

  return (
    <>
      <section className={styles.filterPanel}>
        <label className={styles.searchBox}>
          <AdminIcon name='search' />
          <input
            value={keywordQuery}
            onChange={(event) => setKeywordQuery(event.target.value)}
            placeholder='키워드 ID, 키워드명 검색'
          />
        </label>

        <div className={styles.statusTabs}>
          {keywordStatusOptions.map((option) => (
            <button
              key={option.value}
              type='button'
              className={keywordStatus === option.value ? styles.activeStatusTab : ''}
              onClick={() => {
                setKeywordStatus(option.value)
                setKeywordPage(0)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={styles.toolbarActions}>
          <button type='button' className={styles.ghostButton} onClick={handleAddKeyword}>
            키워드 추가
          </button>
          <button type='button' className={styles.primaryButton} onClick={handleExportKeywords}>
            <AdminIcon name='download' />
            엑셀 다운로드
          </button>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>키워드 목록</h2>
          <button type='button' className={styles.ghostButton} onClick={loadKeywords}>
            새로고침
          </button>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.requestTable}>
            <thead>
              <tr>
                <th>키워드 ID</th>
                <th>키워드</th>
                <th>정규화 키워드</th>
                <th>상태</th>
                <th>처리</th>
              </tr>
            </thead>
            <tbody>
              {isKeywordLoading ? (
                <tr>
                  <td colSpan={5} className={styles.tableMessage}>
                    키워드 목록을 불러오는 중입니다.
                  </td>
                </tr>
              ) : keywordError ? (
                <tr>
                  <td colSpan={5} className={styles.tableError}>
                    {keywordError}
                  </td>
                </tr>
              ) : filteredKeywords.length > 0 ? (
                filteredKeywords.map((keyword) => (
                  <tr key={keyword.id}>
                    <td>{keyword.id}</td>
                    <td>{keyword.name}</td>
                    <td>{keyword.normalizedName}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${statusClass[keyword.status]}`}>
                        {statusLabel[keyword.status]}
                      </span>
                    </td>
                    <td>
                      <button
                        type='button'
                        className={styles.rejectButton}
                        disabled={updatingKeywordId === keyword.id}
                        onClick={() => handleRemoveKeyword(keyword)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.tableMessage}>
                    표시할 키워드가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <AdminPagination
          page={keywordPage}
          pageSize={keywordPageSize}
          totalPages={keywordTotalPages}
          totalElements={keywordTotalElements}
          onPageChange={setKeywordPage}
          onPageSizeChange={setKeywordPageSize}
        />
      </section>
    </>
  )
}
