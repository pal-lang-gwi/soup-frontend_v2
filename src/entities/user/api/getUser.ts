import { apiClient } from '@/shared/api/apiClient'

export interface User {
  id: number
  email: string
}

export const getUser = async () => {
  const response = await apiClient.get('/users')
  return response.data.data
}
