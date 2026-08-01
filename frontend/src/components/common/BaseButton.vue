<template>
  <button
    :class="[
      'font-semibold border-none cursor-pointer transition-all duration-150 inline-flex items-center justify-center gap-2',
      sizeClasses,
      variantClasses,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <i v-if="icon" :class="['text-base', icon]" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  disabled?: boolean
  full?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  full: false,
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed',
  }
  return `${variants[props.variant]} ${props.full ? 'w-full' : ''}`
})
</script>
