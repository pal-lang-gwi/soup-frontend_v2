import { useCallback, useEffect, useMemo, useState } from 'react'
import { adminApi } from '@/entities/admin/api/adminApi'
import type { AdminKeywordRequestDto, AdminKeywordStatus } from '@/entities/admin/model/type'
import { downloadCsv } from '../lib/csv'
import { formatAdminDate } from '../lib/date'
import {
  DEFAULT_PAGE_SIZE,
  requestStatusOptions,
  statusLabel,
  type RequestStatusFilter,
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

export const KeywordRequestPanel = () => {
  const [requests, setRequests] = useState<AdminKeywordRequestDto[]>([])
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null)
  const [requestQuery, setRequestQuery] = useState('')
  const [requestStatus, setRequestStatus] = useState<RequestStatusFilter>('PENDING')
  const [requestPage, setRequestPage] = useState(0)
  const [requestPageSize, setRequestPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [requestTotalPages, setRequestTotalPages] = useState(0)
  const [requestTotalElements, setRequestTotalElements] = useState(0)
  const [isRequestLoading, setIsRequestLoading] = useState(false)
  const [requestError, setRequestError] = useState('')
  const [updatingRequestId, setUpdatingRequestId] = useState<number | null>(null)

  const selectedRequest = requests.find((request) => request.requestId === selectedRequestId)

  const filteredRequests = useMemo(() => {
    const normalizedQuery = requestQuery.trim().toLowerCase()

    if (!normalizedQuery) return requests

    return requests.filter((request) =>
      [
        String(request.requestId),
        request.requestedBy.email,
        request.keyword.name,
        request.keyword.status,
      ].some((value) => value.toLowerCase().includes(normalizedQuery)),
    )
  }, [requestQuery, requests])

  const loadKeywordRequests = useCallback(async () => {
    try {
      setIsRequestLoading(true)
      setRequestError('')

      const response = await adminApi.getKeywordRequests({
        status: requestStatus === 'all' ? undefined : requestStatus,
        page: requestPage,
        size: requestPageSize,
      })
      const nextRequests = response.data.adminKeywordResponseDtos

      setRequests(nextRequests)
      setRequestTotalPages(response.data.totalPages)
      setRequestTotalElements(response.data.totalElements)
      setSelectedRequestId((prev) => {
        if (nextRequests.length === 0) return null
        if (prev && nextRequests.some((request) => request.requestId === prev)) return prev

        return nextRequests[0].requestId
      })
    } catch (error) {
      console.error('키워드 요청 목록을 불러오는 데 실패했습니다.', error)
      setRequestError('키워드 요청 목록을 불러오지 못했습니다.')
    } finally {
      setIsRequestLoading(false)
    }
  }, [requestPage, requestPageSize, requestStatus])

  const handleApproveRequest = async (request: AdminKeywordRequestDto) => {
    if (updatingRequestId !== null) return

    const isConfirmed = window.confirm(`'${request.keyword.name}' 키워드 요청을 승인하시겠습니까?`)

    if (!isConfirmed) return

    try {
      setUpdatingRequestId(request.requestId)
      const response = await adminApi.approveKeywordRequest(request.requestId)

      alert(
        `'${response.data.keyword}' 키워드를 승인했습니다. 요청자 ${response.data.requestedUserCnt}명이 구독 처리되었습니다.`,
      )
      await loadKeywordRequests()
    } catch (error) {
      console.error('키워드 요청 승인에 실패했습니다.', error)
      alert('키워드 요청 승인에 실패했습니다.')
    } finally {
      setUpdatingRequestId(null)
    }
  }

  const handleRejectRequest = async (request: AdminKeywordRequestDto) => {
    if (updatingRequestId !== null) return

    const rejectReason = window
      .prompt(`'${request.keyword.name}' 키워드 요청의 거절 사유를 입력해주세요.`)
      ?.trim()

    if (!rejectReason) return

    try {
      setUpdatingRequestId(request.requestId)
      const response = await adminApi.rejectKeywordRequest(request.requestId, { rejectReason })

      alert(`'${response.data.keyword}' 키워드 요청을 거절했습니다.`)
      await loadKeywordRequests()
    } catch (error) {
      console.error('키워드 요청 거절에 실패했습니다.', error)
      alert('키워드 요청 거절에 실패했습니다.')
    } finally {
      setUpdatingRequestId(null)
    }
  }

  const handleExportRequests = () => {
    downloadCsv(
      'keyword-requests.csv',
      ['요청 ID', '사용자', '요청 키워드', '요청일', '상태'],
      filteredRequests.map((request) => [
        String(request.requestId),
        request.requestedBy.email,
        request.keyword.name,
        formatAdminDate(request.keyword.requestedDate),
        statusLabel[request.keyword.status],
      ]),
    )
  }

  useEffect(() => {
    loadKeywordRequests()
  }, [loadKeywordRequests])

  return (
    <>
      <section className={styles.filterPanel}>
        <label className={styles.searchBox}>
          <AdminIcon name='search' />
          <input
            value={requestQuery}
            onChange={(event) => setRequestQuery(event.target.value)}
            placeholder='요청 ID, 사용자, 키워드 검색'
          />
        </label>

        <div className={styles.statusTabs}>
          {requestStatusOptions.map((option) => (
            <button
              key={option.value}
              type='button'
              className={requestStatus === option.value ? styles.activeStatusTab : ''}
              onClick={() => {
                setRequestStatus(option.value)
                setRequestPage(0)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button type='button' className={styles.primaryButton} onClick={handleExportRequests}>
          <AdminIcon name='download' />
          엑셀 다운로드
        </button>
      </section>

      <div className={styles.keywordLayout}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>구독 요청 목록</h2>
            <button type='button' className={styles.ghostButton} onClick={loadKeywordRequests}>
              새로고침
            </button>
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.requestTable}>
              <thead>
                <tr>
                  <th>요청 ID</th>
                  <th>사용자</th>
                  <th>요청 키워드</th>
                  <th>요청일</th>
                  <th>상태</th>
                  <th>처리</th>
                </tr>
              </thead>
              <tbody>
                {isRequestLoading ? (
                  <tr>
                    <td colSpan={6} className={styles.tableMessage}>
                      키워드 요청 목록을 불러오는 중입니다.
                    </td>
                  </tr>
                ) : requestError ? (
                  <tr>
                    <td colSpan={6} className={styles.tableError}>
                      {requestError}
                    </td>
                  </tr>
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr
                      key={request.requestId}
                      className={
                        request.requestId === selectedRequest?.requestId ? styles.selectedRow : ''
                      }
                      onClick={() => setSelectedRequestId(request.requestId)}
                    >
                      <td>KR{request.requestId}</td>
                      <td>{request.requestedBy.email}</td>
                      <td>{request.keyword.name}</td>
                      <td>{formatAdminDate(request.keyword.requestedDate)}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${statusClass[request.keyword.status]}`}
                        >
                          {statusLabel[request.keyword.status]}
                        </span>
                      </td>
                      <td>
                        {request.keyword.status === 'PENDING' ? (
                          <div className={styles.actionGroup}>
                            <button
                              type='button'
                              className={styles.acceptButton}
                              disabled={updatingRequestId === request.requestId}
                              onClick={(event) => {
                                event.stopPropagation()
                                handleApproveRequest(request)
                              }}
                            >
                              허용
                            </button>
                            <button
                              type='button'
                              className={styles.rejectButton}
                              disabled={updatingRequestId === request.requestId}
                              onClick={(event) => {
                                event.stopPropagation()
                                handleRejectRequest(request)
                              }}
                            >
                              거절
                            </button>
                          </div>
                        ) : (
                          <span className={styles.doneText}>처리 불가</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.tableMessage}>
                      표시할 키워드 요청이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <AdminPagination
            page={requestPage}
            pageSize={requestPageSize}
            totalPages={requestTotalPages}
            totalElements={requestTotalElements}
            onPageChange={setRequestPage}
            onPageSizeChange={setRequestPageSize}
          />
        </section>

        <aside className={styles.detailColumn}>
          <section className={styles.panel}>
            <div className={styles.detailHeader}>
              <h2>요청 상세</h2>
            </div>

            {selectedRequest ? (
              <>
                <dl className={styles.detailList}>
                  <div>
                    <dt>사용자</dt>
                    <dd>{selectedRequest.requestedBy.email}</dd>
                  </div>
                  <div>
                    <dt>요청 키워드</dt>
                    <dd>{selectedRequest.keyword.name}</dd>
                  </div>
                  <div>
                    <dt>요청일</dt>
                    <dd>{formatAdminDate(selectedRequest.keyword.requestedDate)}</dd>
                  </div>
                  <div>
                    <dt>상태</dt>
                    <dd>
                      <span
                        className={`${styles.statusBadge} ${
                          statusClass[selectedRequest.keyword.status]
                        }`}
                      >
                        {statusLabel[selectedRequest.keyword.status]}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt>거절 사유</dt>
                    <dd>{selectedRequest.keyword.rejectionReason ?? '-'}</dd>
                  </div>
                </dl>

                <div className={styles.detailActions}>
                  <button
                    type='button'
                    className={styles.primaryButton}
                    disabled={
                      selectedRequest.keyword.status !== 'PENDING' ||
                      updatingRequestId === selectedRequest.requestId
                    }
                    onClick={() => handleApproveRequest(selectedRequest)}
                  >
                    요청 허용
                  </button>
                  <button
                    type='button'
                    className={styles.rejectWideButton}
                    disabled={
                      selectedRequest.keyword.status !== 'PENDING' ||
                      updatingRequestId === selectedRequest.requestId
                    }
                    onClick={() => handleRejectRequest(selectedRequest)}
                  >
                    요청 거절
                  </button>
                </div>
              </>
            ) : (
              <p className={styles.emptyDetail}>선택된 요청이 없습니다.</p>
            )}
          </section>

          <section className={styles.panel}>
            <div className={styles.detailHeader}>
              <h2>처리 가이드</h2>
            </div>
            <ul className={styles.guideList}>
              <li>
                <AdminIcon name='shield' />
                서비스 주제 적합성 확인
              </li>
              <li>
                <AdminIcon name='shield' />
                중복 키워드 여부 확인
              </li>
              <li>
                <AdminIcon name='shield' />
                과도하게 모호한 키워드 검토
              </li>
              <li>
                <AdminIcon name='shield' />
                스팸성 요청 차단
              </li>
            </ul>
            <p className={styles.guideNote}>가이드를 참고하여 신중하게 처리해주세요.</p>
          </section>
        </aside>
      </div>
    </>
  )
}
