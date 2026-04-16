import { apiClient } from '@/shared/api/apiClient'

export interface SubscribeRequest {
  keywordId: string 
}

export interface SubscribeResponse {
  keywordId: string
  keywordName: string
}

export const subscribeKeyword = async (keywordId: string) => {
  const response = await apiClient.post('/keywords/subscriptions', { keywordId })
  return response.data
}