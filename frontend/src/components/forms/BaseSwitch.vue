<template>
  <label
    :class="[
      'inline-flex items-center gap-3 cursor-pointer select-none',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <!-- Label (left) -->
    <span v-if="label" class="text-sm text-slate-700 font-medium">{{ label }}</span>

    <!-- Hidden input -->
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="sr-only peer"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />

    <!-- Track -->
    <div
      :class="[
        'relative rounded-full transition-all duration-200 shrink-0',
        trackSize,
        modelValue ? activeTrackColor : 'bg-slate-300'
      ]"
    >
      <!-- Thumb -->
      <div
        :class="[
          'absolute top-0.5 bg-white rounded-full shadow-md transition-all duration-200',
          thumbSize,
          modelValue ? thumbTranslate : 'left-0.5'
        ]"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  activeColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'md',
  activeColor: 'bg-blue-600',
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const activeTrackColor = computed(() => props.activeColor)

const trackSize = computed(() => {
  const sizes = { sm: 'w-8 h-4', md: 'w-11 h-6', lg: 'w-14 h-7' }
  return sizes[props.size]
})

const thumbSize = computed(() => {
  const sizes = { sm: 'w-3 h-3', md: 'w-5 h-5', lg: 'w-6 h-6' }
  return sizes[props.size]
})

const thumbTranslate = computed(() => {
  const positions = { sm: 'left-[18px]', md: 'left-[22px]', lg: 'left-[30px]' }
  return positions[props.size]
})
</script>
