<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-xl shadow-lg border min-w-[320px] max-w-[420px]',
            variantClasses[toast.type]
          ]"
        >
          <i :class="['text-lg shrink-0 mt-0.5', iconClasses[toast.type]]" />
          <div class="flex-1">
            <p class="text-sm font-semibold">{{ toast.title }}</p>
            <p v-if="toast.message" class="text-xs mt-0.5 opacity-80">{{ toast.message }}</p>
          </div>
          <button
            @click="removeToast(toast.id)"
            class="text-sm hover:opacity-70 transition border-none bg-transparent cursor-pointer opacity-50 shrink-0"
          >
            <i class="pi pi-times" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: number
  type: ToastType
  title: string
  message?: string
}

const toasts = ref<Toast[]>([])
let nextId = 0

const variantClasses: Record<ToastType, string> = {
  success: 'bg-white border-green-200 text-green-800',
  error:   'bg-white border-red-200 text-red-800',
  warning: 'bg-white border-yellow-200 text-yellow-800',
  info:    'bg-white border-blue-200 text-blue-800',
}

const iconClasses: Record<ToastType, string> = {
  success: 'pi pi-check-circle text-green-500',
  error:   'pi pi-exclamation-circle text-red-500',
  warning: 'pi pi-exclamation-triangle text-yellow-500',
  info:    'pi pi-info-circle text-blue-500',
}

function addToast(type: ToastType, title: string, message?: string, duration = 4000) {
  const id = nextId++
  toasts.value.push({ id, type, title, message })

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration)
  }
}

function removeToast(id: number) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) toasts.value.splice(index, 1)
}

defineExpose({ addToast, removeToast })
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease;
}
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>
