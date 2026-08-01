<template>
  <transition name="slide">
    <div
      v-if="modelValue"
      :class="[
        'p-4 rounded-lg flex items-start gap-3 border-l-4',
        variantClasses
      ]"
    >
      <i :class="['text-lg shrink-0', iconClass]" />
      <div class="flex-1">
        <p class="font-semibold text-sm">{{ title }}</p>
        <p class="text-xs mt-1">{{ message }}</p>
      </div>
      <button
        @click="$emit('update:modelValue', false)"
        class="text-lg hover:opacity-70 transition border-none bg-transparent cursor-pointer"
      >
        <i class="pi pi-times" />
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface Props {
  modelValue: boolean
  type?: AlertType
  title?: string
  message: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  title: '',
})

const variantClasses = computed(() => {
  const variants = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
  }
  return variants[props.type]
})

const iconClass = computed(() => {
  const icons = {
    success: 'pi pi-check-circle text-green-600',
    error: 'pi pi-exclamation-circle text-red-600',
    warning: 'pi pi-exclamation-triangle text-yellow-600',
    info: 'pi pi-info-circle text-blue-600',
  }
  return icons[props.type]
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
