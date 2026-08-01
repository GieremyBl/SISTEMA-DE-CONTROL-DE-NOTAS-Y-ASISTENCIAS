import { useCache } from '@/composables/useCache'

/**
 * Servicio para manejar la limpieza automática de cache
 */
export const cacheCleanupService = () => {
  const { startAutoCleanup, clearExpired } = useCache()

  /**
   * Inicializar limpieza automática
   * @param intervalMs Intervalo en milisegundos (por defecto 5 minutos)
   */
  const initialize = (intervalMs: number = 5 * 60 * 1000) => {
    console.log(`[CacheCleanup] Iniciando limpieza automática cada ${intervalMs / 1000}s`)
    
    const stopCleanup = startAutoCleanup(intervalMs)

    // Limpiar también cuando la página se cierre
    window.addEventListener('beforeunload', () => {
      clearExpired()
      stopCleanup()
    })

    return stopCleanup
  }

  /**
   * Limpiar cache manualmente
   */
  const cleanup = () => {
    const cleaned = clearExpired()
    console.log(`[CacheCleanup] Se limpiaron ${cleaned} entradas expiradas`)
    return cleaned
  }

  return {
    initialize,
    cleanup,
  }
}
