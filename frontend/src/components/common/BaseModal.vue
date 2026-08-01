<template>
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @keydown.esc="handleClose"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="handleOverlayClick"
        />

        <!-- Dialog -->
        <div
          :class="[
            'relative bg-white rounded-2xl shadow-xl w-full flex flex-col max-h-[90vh] animate-slideUp',
            sizeClass
          ]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'modal-title' : undefined"
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header"
            class="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0"
          >
            <slot name="header">
              <h3 id="modal-title" class="text-lg font-bold text-slate-900">{{ title }}</h3>
            </slot>
            <button
              @click="handleClose"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-all duration-150"
              aria-label="Cerrar"
            >
              <i class="pi pi-times text-sm" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-auto px-6 py-5">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 shrink-0"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  persistent: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const sizeClass = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }
  return sizes[props.size]
})

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick() {
  if (!props.persistent) {
    handleClose()
  }
}

// Lock body scroll when modal is open
watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
.modal-leave-to > div:last-child {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>
