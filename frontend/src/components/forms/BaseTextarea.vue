<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-semibold text-slate-900 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <textarea
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :maxlength="maxLength"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-2.5 rounded-lg border-2 transition-colors text-slate-900 resize-y',
          error
            ? 'border-red-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200'
            : 'border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
          disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed resize-none' : 'bg-white',
          autoResize ? 'resize-none overflow-hidden' : ''
        ]"
        @input="handleInput"
      />
    </div>
    <div class="flex items-center justify-between mt-1">
      <div>
        <p v-if="error" class="text-red-600 text-xs">{{ error }}</p>
        <p v-else-if="help" class="text-slate-400 text-xs">{{ help }}</p>
      </div>
      <p v-if="maxLength" class="text-xs text-slate-400">
        {{ charCount }}/{{ maxLength }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  error?: string
  help?: string
  disabled?: boolean
  required?: boolean
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  disabled: false,
  required: false,
  autoResize: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const charCount = computed(() => (props.modelValue ?? '').length)

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)

  if (props.autoResize) {
    nextTick(() => adjustHeight())
  }
}

function adjustHeight() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

watch(() => props.modelValue, () => {
  if (props.autoResize) {
    nextTick(() => adjustHeight())
  }
})
</script>
