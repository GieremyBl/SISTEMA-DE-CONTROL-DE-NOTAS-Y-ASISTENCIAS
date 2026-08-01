<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-semibold text-slate-900 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'w-full px-4 py-2.5 rounded-lg border-2 transition-colors text-slate-900 font-medium',
        error
          ? 'border-red-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200'
          : 'border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'
      ]"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.id" :value="opt.id">
        {{ opt.label }}
      </option>
    </select>
    <p v-if="error" class="text-red-600 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  id: string | number
  label: string
}

interface Props {
  modelValue: string | number
  options: Option[]
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
