import { apiClient } from '@/shared/api/apiClient'

export interface KeywordInfo {
  keywordId: number
  keyword: string
  registeredAt: string
}

export interface Subscription {
  subscriptionId: number
  keywordInfo: KeywordInfo
}

export const getKeywords = async (): Promise<Subscription[]> => {
  const response = await apiClient.get('/users/me/keywords')
  return response.data.data
}