<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-semibold text-slate-900 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'w-full px-4 py-2.5 rounded-lg border-2 transition-colors text-slate-900',
        error
          ? 'border-red-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200'
          : 'border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="text-red-600 text-xs mt-1">{{ error }}</p>
    <p v-if="help" class="text-slate-400 text-xs mt-1">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: string
  label?: string
  placeholder?: string
  error?: string
  help?: string
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
