import { apiClient } from '@/shared/api/apiClient'
import type { ApiResponse } from '@/shared/api/types'
import type { NewsListResponseData } from '@/types/news'

export interface DailyNewsParams {
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}

export const newsApi = {
  getDailyNews: async (params: DailyNewsParams) => {
    const response = await apiClient.get<ApiResponse<NewsListResponseData>>(
      '/news',
      { params }
    )

    return response.data.data
  },
}
