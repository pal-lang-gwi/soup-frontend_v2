import type { AdminKeywordStatus } from '@/entities/admin/model/type'

export type KeywordAdminTab = 'requests' | 'keywords'
export type RequestStatusFilter = 'all' | 'PENDING'
export type KeywordStatusFilter = 'all' | AdminKeywordStatus

export const DEFAULT_PAGE_SIZE = 10

export const requestStatusOptions: Array<{ label: string; value: RequestStatusFilter }> = [
  { label: '전체', value: 'all' },
  { label: '대기', value: 'PENDING' },
]

export const keywordStatusOptions: Array<{ label: string; value: KeywordStatusFilter }> = [
  { label: '전체', value: 'all' },
  { label: '활성', value: 'ACTIVE' },
  { label: '대기', value: 'PENDING' },
  { label: '거절', value: 'REJECTED' },
  { label: '삭제', value: 'DELETED' },
  { label: '비활성', value: 'INACTIVE' },
]

export const statusLabel: Record<AdminKeywordStatus, string> = {
  ACTIVE: '활성',
  INACTIVE: '비활성',
  DELETED: '삭제',
  PENDING: '대기',
  REJECTED: '거절',
}
