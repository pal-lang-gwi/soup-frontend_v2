import type { ApiResponse } from '@/shared/api/types'
import { mockKeywordRequests, mockKeywords } from '../model/mockData'
import type {
  AdminAddKeywordRequestData,
  AdminAddKeywordResponseData,
  AdminApproveKeywordRequestResponseData,
  AdminKeywordListItemDto,
  AdminKeywordListResponseData,
  AdminKeywordRequestListResponseData,
  AdminRejectKeywordRequestData,
  AdminRejectKeywordRequestResponseData,
  AdminRemoveKeywordRequestData,
  AdminRemoveKeywordResponseData,
  AdminStatusParams,
} from '../model/type'

let keywordRequests = [...mockKeywordRequests]
let keywords = [...mockKeywords]

const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
  error: null,
})

const paginate = <T>(items: T[], page = 0, size = 10) => {
  const safeSize = Math.max(1, Math.trunc(Number.isFinite(size) ? size : 10))
  const totalPages = Math.ceil(items.length / safeSize)
  const maxPage = Math.max(totalPages - 1, 0)
  const safePage = Math.min(Math.max(0, Math.trunc(Number.isFinite(page) ? page : 0)), maxPage)
  const start = safePage * safeSize
  const pagedItems = items.slice(start, start + safeSize)

  return {
    items: pagedItems,
    totalElements: items.length,
    totalPages,
    currentPage: safePage,
  }
}

const nextKeywordId = () => Math.max(0, ...keywords.map((keyword) => keyword.id)) + 1

export const mockAdminApi = {
  getKeywordRequests: async (params?: AdminStatusParams) => {
    const filteredRequests = params?.status
      ? keywordRequests.filter((request) => request.keyword.status === params.status)
      : keywordRequests
    const page = paginate(filteredRequests, params?.page, params?.size)

    return createSuccessResponse<AdminKeywordRequestListResponseData>({
      adminKeywordResponseDtos: page.items,
      totalPages: page.totalPages,
      totalElements: page.totalElements,
      currentPage: page.currentPage,
    })
  },

  approveKeywordRequest: async (requestId: number) => {
    const request = keywordRequests.find((item) => item.requestId === requestId)

    if (!request) {
      throw new Error('KeywordRequestNotFound')
    }

    const keywordName = request.keyword.name
    const requestedUserCnt = keywordRequests.filter(
      (item) => item.keyword.keywordId === request.keyword.keywordId,
    ).length

    keywordRequests = keywordRequests.filter(
      (item) => item.keyword.keywordId !== request.keyword.keywordId,
    )

    if (!keywords.some((keyword) => keyword.id === request.keyword.keywordId)) {
      keywords = [
        {
          id: request.keyword.keywordId,
          name: request.keyword.name,
          normalizedName: request.keyword.name.toLowerCase().replaceAll(' ', '-'),
          status: 'ACTIVE',
        },
        ...keywords,
      ]
    }

    return createSuccessResponse<AdminApproveKeywordRequestResponseData>({
      keyword: keywordName,
      requestedUserCnt,
    })
  },

  rejectKeywordRequest: async (requestId: number, data: AdminRejectKeywordRequestData) => {
    const request = keywordRequests.find((item) => item.requestId === requestId)

    if (!request) {
      throw new Error('KeywordRequestNotFound')
    }

    const keywordName = request.keyword.name

    keywordRequests = keywordRequests.map((item) =>
      item.requestId === requestId
        ? {
            ...item,
            keyword: {
              ...item.keyword,
              status: 'REJECTED',
              rejectionReason: data.rejectReason,
            },
          }
        : item,
    )

    return createSuccessResponse<AdminRejectKeywordRequestResponseData>({
      keyword: keywordName,
      rejectReason: data.rejectReason,
    })
  },

  getKeywords: async (params?: AdminStatusParams) => {
    const filteredKeywords = params?.status
      ? keywords.filter((keyword) => keyword.status === params.status)
      : keywords
    const page = paginate(filteredKeywords, params?.page, params?.size)

    return createSuccessResponse<AdminKeywordListResponseData>({
      keywordResponseDtos: page.items,
      totalElements: page.totalElements,
      totalPages: page.totalPages,
      currentPage: page.currentPage,
    })
  },

  addKeyword: async (data: AdminAddKeywordRequestData) => {
    const keyword: AdminKeywordListItemDto = {
      id: nextKeywordId(),
      name: data.keyword,
      normalizedName: data.keyword.toLowerCase().replaceAll(' ', '-'),
      status: 'ACTIVE',
    }

    keywords = [keyword, ...keywords]

    return createSuccessResponse<AdminAddKeywordResponseData>({
      keyword: data.keyword,
    })
  },

  removeKeyword: async (data: AdminRemoveKeywordRequestData) => {
    const keyword = keywords.find((item) => item.id === data.keywordId)

    if (!keyword) {
      throw new Error('KeywordNotFound')
    }

    keywords = keywords.map((item) =>
      item.id === data.keywordId ? { ...item, status: 'DELETED' } : item,
    )

    return createSuccessResponse<AdminRemoveKeywordResponseData>({
      keyword: keyword.name,
      removeReason: data.removeReason,
    })
  },
}
