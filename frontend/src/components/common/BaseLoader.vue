<template>
  <!-- Overlay variant -->
  <div v-if="variant === 'overlay'" class="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
    <div :class="['spinner', spinnerSize]" />
    <p v-if="text" class="text-sm text-slate-500 font-medium mt-3">{{ text }}</p>
  </div>

  <!-- Spinner variant -->
  <div v-else-if="variant === 'spinner'" class="inline-flex flex-col items-center gap-2">
    <div :class="['spinner', spinnerSize]" :style="spinnerStyle" />
    <p v-if="text" class="text-sm text-slate-500 font-medium">{{ text }}</p>
  </div>

  <!-- Dots variant -->
  <div v-else class="inline-flex items-center gap-1.5">
    <span
      v-for="i in 3"
      :key="i"
      class="rounded-full bg-blue-500 animate-bounce"
      :class="dotSize"
      :style="{ animationDelay: `${(i - 1) * 0.15}s`, backgroundColor: color }"
    />
    <p v-if="text" class="text-sm text-slate-500 font-medium ml-2">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'spinner' | 'dots' | 'overlay'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'spinner',
  size: 'md',
  color: '#3b82f6',
})

const spinnerSize = computed(() => {
  const sizes = { sm: 'spinner-sm', md: 'spinner-md', lg: 'spinner-lg' }
  return sizes[props.size]
})

const dotSize = computed(() => {
  const sizes = { sm: 'w-1.5 h-1.5', md: 'w-2.5 h-2.5', lg: 'w-3.5 h-3.5' }
  return sizes[props.size]
})

const spinnerStyle = computed(() => ({
  borderTopColor: props.color,
}))
</script>

<style scoped>
.spinner {
  border-radius: 50%;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  animation: spin 0.7s linear infinite;
}
.spinner-sm { width: 20px; height: 20px; border-width: 2px; }
.spinner-md { width: 32px; height: 32px; border-width: 3px; }
.spinner-lg { width: 48px; height: 48px; border-width: 4px; }

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
