import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginPayload } from '@/types'
import { MOCK_USERS } from '@/mocks/auth.mock'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const STORAGE_KEY_TOKEN = 'edu_token'
const STORAGE_KEY_USER  = 'edu_user'

export const useAuthStore = defineStore('auth', () => {
  // ── State ─────────────────────────────────────
  const user  = ref<User | null>(
    JSON.parse(localStorage.getItem(STORAGE_KEY_USER) ?? 'null')
  )
  const token = ref<string | null>(
    localStorage.getItem(STORAGE_KEY_TOKEN)
  )
  const loading = ref(false)

  // ── Getters ───────────────────────────────────
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin         = computed(() => user.value?.role === 'ADMIN')
  const fullName        = computed(() => user.value?.name ?? '')
  const initials        = computed(() =>
    (user.value?.name ?? '')
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase()
  )

  // ── Actions ───────────────────────────────────
  async function login(payload: LoginPayload): Promise<void> {
    loading.value = true
    await delay(800)

    const match = MOCK_USERS.find(
      u => u.email === payload.email && u.password === payload.password
    )

    loading.value = false

    if (!match) throw new Error('Correo o contraseña incorrectos')

    const mockToken = btoa(`${match.user.id}:${match.user.email}:${Date.now()}`)
    token.value = mockToken
    user.value  = match.user

    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken)
    localStorage.setItem(STORAGE_KEY_USER,  JSON.stringify(match.user))
  }

  function logout(): void {
    user.value  = null
    token.value = null
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    localStorage.removeItem(STORAGE_KEY_USER)
  }

  return { user, token, loading, isAuthenticated, isAdmin, fullName, initials, login, logout }
})