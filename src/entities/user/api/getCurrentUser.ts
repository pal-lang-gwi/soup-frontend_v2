import { apiClient } from '@/shared/api/apiClient'

export interface User {
  id: number
  email: string
}

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get('/users/me')
  console.log(data)
  return data
}
