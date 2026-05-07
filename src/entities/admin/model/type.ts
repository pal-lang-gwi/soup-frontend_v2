export type AdminKeywordStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'PENDING' | 'REJECTED'

export interface AdminPageParams {
  page?: number
  size?: number
  sort?: string
}

export interface AdminStatusParams extends AdminPageParams {
  status?: AdminKeywordStatus
}

export interface AdminKeywordDto {
  keywordId: number
  name: string
  status: AdminKeywordStatus
  requestedDate: string | number[]
  rejectionReason: string | null
}

export interface AdminRequestedByDto {
  userId: number
  email: string
}

export interface AdminKeywordRequestDto {
  requestId: number
  keyword: AdminKeywordDto
  requestedBy: AdminRequestedByDto
}

export interface AdminKeywordRequestListResponseData {
  adminKeywordResponseDtos: AdminKeywordRequestDto[]
  totalPages: number
  totalElements: number
  currentPage: number
}

export interface AdminApproveKeywordRequestResponseData {
  keyword: string
  requestedUserCnt: number
}

export interface AdminRejectKeywordRequestData {
  rejectReason: string
}

export interface AdminRejectKeywordRequestResponseData {
  keyword: string
  rejectReason: string
}

export interface AdminKeywordListItemDto {
  id: number
  name: string
  normalizedName: string
  status: AdminKeywordStatus
}

export interface AdminKeywordListResponseData {
  keywordResponseDtos: AdminKeywordListItemDto[]
  totalElements: number
  totalPages: number
  currentPage: number
}

export interface AdminAddKeywordRequestData {
  keyword: string
}

export interface AdminAddKeywordResponseData {
  keyword: string
}

export interface AdminRemoveKeywordRequestData {
  keywordId: number
  removeReason: string
}

export interface AdminRemoveKeywordResponseData {
  keyword: string
  removeReason: string
}
