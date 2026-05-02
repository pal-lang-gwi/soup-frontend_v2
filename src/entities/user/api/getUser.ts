import { apiClient } from '@/shared/api/apiClient'
import type { ApiResponse } from '@/shared/api/types'

export interface User {
  email: string
  username: string
  nickname: string | null
  role: string
  gender: string | null
  birthDate: number[] | null
  providerId: string
  profileImageUrl: string | null
  userKeywords: {
    keyword: string
  }[]
}

export interface UpdateUserParams {
  nickname?: string
  profileImageUrl?: string
}

export const getUser = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>('/users')
  return response.data.data
}

export const checkNickname = async (nickname: string): Promise<boolean> => {
  const response = await apiClient.get<ApiResponse<boolean>>('/users/check-nickname', {
    params: { nickname },
  })

  return response.data.data
}

export const updateUser = async (params: UpdateUserParams): Promise<User> => {
  const response = await apiClient.patch<ApiResponse<User>>('/users', params)
  return response.data.data
}
