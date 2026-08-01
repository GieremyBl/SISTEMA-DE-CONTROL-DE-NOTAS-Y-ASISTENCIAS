import { ref, type ComponentPublicInstance } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastInstance {
  addToast: (type: ToastType, title: string, message?: string, duration?: number) => void
}

const toastRef = ref<ToastInstance | null>(null)

export function setToastRef(instance: ComponentPublicInstance | null) {
  toastRef.value = instance as unknown as ToastInstance
}

export function useAppToast() {
  function success(title: string, message?: string) {
    toastRef.value?.addToast('success', title, message)
  }

  function error(title: string, message?: string) {
    toastRef.value?.addToast('error', title, message)
  }

  function warning(title: string, message?: string) {
    toastRef.value?.addToast('warning', title, message)
  }

  function info(title: string, message?: string) {
    toastRef.value?.addToast('info', title, message)
  }

  return { success, error, warning, info }
}
