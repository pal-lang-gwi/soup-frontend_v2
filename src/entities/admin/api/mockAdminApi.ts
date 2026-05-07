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
  const start = page * size
  const pagedItems = items.slice(start, start + size)

  return {
    items: pagedItems,
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    currentPage: page,
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
    const keywordName = request?.keyword.name ?? '알 수 없는 키워드'
    const requestedUserCnt = request
      ? keywordRequests.filter((item) => item.keyword.keywordId === request.keyword.keywordId)
          .length
      : 0

    keywordRequests = keywordRequests.filter(
      (item) => item.keyword.keywordId !== request?.keyword.keywordId,
    )

    if (request && !keywords.some((keyword) => keyword.id === request.keyword.keywordId)) {
      keywords = [
        {
          id: request.keyword.keywordId,
          name: request.keyword.name,
          normalizedName: request.keyword.name.toLowerCase().replaceAll(' ', '-'),
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
    const keywordName = request?.keyword.name ?? '알 수 없는 키워드'

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
    const page = paginate(keywords, params?.page, params?.size)

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
    }

    keywords = [keyword, ...keywords]

    return createSuccessResponse<AdminAddKeywordResponseData>({
      keyword: data.keyword,
    })
  },

  removeKeyword: async (data: AdminRemoveKeywordRequestData) => {
    const keyword = keywords.find((item) => item.id === data.keywordId)

    keywords = keywords.filter((item) => item.id !== data.keywordId)

    return createSuccessResponse<AdminRemoveKeywordResponseData>({
      keyword: keyword?.name ?? '알 수 없는 키워드',
      removeReason: data.removeReason,
    })
  },
}
