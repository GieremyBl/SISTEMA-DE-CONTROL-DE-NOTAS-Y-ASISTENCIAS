import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor: attach JWT ───────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor: handle 401 ─────────────
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const auth = useAuthStore()
      auth.logout()
      router.push({ name: 'Login' })
    }
    return Promise.reject(error)
  },
)

export default api