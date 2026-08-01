import { ref, computed } from 'vue'

export interface CacheEntry {
  key: string
  value: any
  timestamp: number
  ttl?: number // Time to live in milliseconds
}

export const useCache = () => {
  const cache = ref<Map<string, CacheEntry>>(new Map())

  /**
   * Obtener valor del cache
   */
  const get = (key: string): any | null => {
    const entry = cache.value.get(key)
    
    if (!entry) return null

    // Verificar si el cache ha expirado
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      cache.value.delete(key)
      return null
    }

    return entry.value
  }

  /**
   * Almacenar valor en cache
   */
  const set = (key: string, value: any, ttl?: number): void => {
    cache.value.set(key, {
      key,
      value,
      timestamp: Date.now(),
      ttl,
    })
  }

  /**
   * Verificar si una clave existe
   */
  const has = (key: string): boolean => {
    const entry = cache.value.get(key)
    if (!entry) return false

    // Verificar si ha expirado
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      cache.value.delete(key)
      return false
    }

    return true
  }

  /**
   * Eliminar un valor del cache
   */
  const remove = (key: string): void => {
    cache.value.delete(key)
  }

  /**
   * Limpiar todo el cache
   */
  const clear = (): void => {
    cache.value.clear()
  }

  /**
   * Limpiar cache expirado automáticamente
   */
  const clearExpired = (): number => {
    const now = Date.now()
    let count = 0

    cache.value.forEach((entry, key) => {
      if (entry.ttl && now - entry.timestamp > entry.ttl) {
        cache.value.delete(key)
        count++
      }
    })

    return count
  }

  /**
   * Obtener tamaño del cache
   */
  const size = computed(() => cache.value.size)

  /**
   * Obtener todas las claves
   */
  const keys = computed(() => Array.from(cache.value.keys()))

  /**
   * Iniciar limpieza automática de cache expirado
   */
  const startAutoCleanup = (interval: number = 60000): (() => void) => {
    const timer = setInterval(() => {
      clearExpired()
    }, interval)

    // Retornar función para detener la limpieza
    return () => clearInterval(timer)
  }

  return {
    cache,
    get,
    set,
    has,
    remove,
    clear,
    clearExpired,
    size,
    keys,
    startAutoCleanup,
  }
}
