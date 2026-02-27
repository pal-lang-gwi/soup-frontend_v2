import { apiClient } from '@/shared/api/apiClient'

interface InitUserParams {
  nickname: string
  gender: 'MALE' | 'FEMALE'
  birthDate: string // "YYYY-MM-DD"
}

export const initUser = async (params: InitUserParams) => {
  const response = await apiClient.post('/users/init', params)
  return response.data
}