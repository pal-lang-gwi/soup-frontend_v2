export type AdminSection = 'dashboard' | 'users' | 'keywords' | 'contents' | 'mail' | 'system'

export type Tone = 'green' | 'red' | 'amber'

export type RequestStatus = 'pending' | 'approved' | 'rejected'

export type RequestStatusFilter = 'all' | RequestStatus

export type IconName =
  | 'dashboard'
  | 'users'
  | 'keywords'
  | 'contents'
  | 'mail'
  | 'system'
  | 'send'
  | 'warning'
  | 'document'
  | 'search'
  | 'chevron'
  | 'clock'
  | 'check'
  | 'x'
  | 'tag'
  | 'download'
  | 'refresh'
  | 'shield'
  | 'menu'
  | 'external'

export interface AdminNavItem {
  id: AdminSection
  label: string
  icon: IconName
}

export interface MetricCard {
  title: string
  value: string
  change: string
  meta: string
  icon: IconName
  tone: Tone
}

export interface KeywordRequest {
  id: string
  user: string
  keyword: string
  category: string
  requestedAt: string
  status: RequestStatus
  reason: string
  duplicateInfo: string
  expectedDemand: '높음' | '보통' | '낮음'
}

export interface StatusOption {
  label: string
  value: RequestStatusFilter
}
