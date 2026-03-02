import { apiClient } from '@/shared/api/apiClient'

interface InitUserParams {
  nickname: string
  gender: 'MALE' | 'FEMALE'
  birthDate: string // "YYYY-MM-DD"
}

interface InitUserResponse {
    success: boolean
    data: {
      userId: number
      email: string
      nickname: string
      role: string
      gender: string
      birthDate: number[]
      profileImageUrl: string
    }
    error: null | string
  }
  
  export const initUser = async (params: InitUserParams): Promise<InitUserResponse> => {
    const response = await apiClient.post<InitUserResponse>('/users/init', params)
    return response.data
  }
