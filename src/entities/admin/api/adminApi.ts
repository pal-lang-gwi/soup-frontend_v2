import { apiClient } from '@/shared/api/apiClient'
import type { ApiResponse } from '@/shared/api/types'
import type {
  AdminAddKeywordRequestData,
  AdminAddKeywordResponseData,
  AdminApproveKeywordRequestResponseData,
  AdminKeywordListResponseData,
  AdminKeywordRequestListResponseData,
  AdminRejectKeywordRequestData,
  AdminRejectKeywordRequestResponseData,
  AdminRemoveKeywordRequestData,
  AdminRemoveKeywordResponseData,
  AdminStatusParams,
} from '../model/type'

const useMockAdminApi = import.meta.env.DEV && import.meta.env.VITE_ADMIN_USE_MOCK === 'true'

const getMockAdminApi = async () => {
  const { mockAdminApi } = await import('./mockAdminApi')

  return mockAdminApi
}

export const adminApi = {
  getKeywordRequests: async (params?: AdminStatusParams) => {
    if (useMockAdminApi) {
      const mockAdminApi = await getMockAdminApi()

      return mockAdminApi.getKeywordRequests(params)
    }

    const response = await apiClient.get<ApiResponse<AdminKeywordRequestListResponseData>>(
      '/admin/keyword-requests',
      { params },
    )

    return response.data
  },

  approveKeywordRequest: async (requestId: number) => {
    if (useMockAdminApi) {
      const mockAdminApi = await getMockAdminApi()

      return mockAdminApi.approveKeywordRequest(requestId)
    }

    const response = await apiClient.post<ApiResponse<AdminApproveKeywordRequestResponseData>>(
      `/admin/keyword-requests/${requestId}/approve`,
    )

    return response.data
  },

  rejectKeywordRequest: async (requestId: number, data: AdminRejectKeywordRequestData) => {
    if (useMockAdminApi) {
      const mockAdminApi = await getMockAdminApi()

      return mockAdminApi.rejectKeywordRequest(requestId, data)
    }

    const response = await apiClient.post<ApiResponse<AdminRejectKeywordRequestResponseData>>(
      `/admin/keyword-requests/${requestId}/reject`,
      data,
    )

    return response.data
  },

  getKeywords: async (params?: AdminStatusParams) => {
    if (useMockAdminApi) {
      const mockAdminApi = await getMockAdminApi()

      return mockAdminApi.getKeywords(params)
    }

    const response = await apiClient.get<ApiResponse<AdminKeywordListResponseData>>(
      '/admin/keyword',
      { params },
    )

    return response.data
  },

  addKeyword: async (data: AdminAddKeywordRequestData) => {
    if (useMockAdminApi) {
      const mockAdminApi = await getMockAdminApi()

      return mockAdminApi.addKeyword(data)
    }

    const response = await apiClient.post<ApiResponse<AdminAddKeywordResponseData>>(
      '/admin/keyword/add',
      data,
    )

    return response.data
  },

  removeKeyword: async (data: AdminRemoveKeywordRequestData) => {
    if (useMockAdminApi) {
      const mockAdminApi = await getMockAdminApi()

      return mockAdminApi.removeKeyword(data)
    }

    const response = await apiClient.post<ApiResponse<AdminRemoveKeywordResponseData>>(
      '/admin/keyword/remove',
      data,
    )

    return response.data
  },
}
