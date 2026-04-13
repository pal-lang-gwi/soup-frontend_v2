import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true, // 쿠키 자동 포함
})
