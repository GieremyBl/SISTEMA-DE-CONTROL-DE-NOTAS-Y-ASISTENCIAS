<template>
  <label
    :class="[
      'inline-flex items-center gap-3 cursor-pointer select-none group',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <!-- Hidden native checkbox -->
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="sr-only peer"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />

    <!-- Custom checkbox -->
    <div
      :class="[
        'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-150',
        modelValue || indeterminate
          ? 'bg-blue-600 border-blue-600 text-white'
          : 'bg-white border-slate-300 group-hover:border-blue-400',
        error ? 'border-red-500' : ''
      ]"
    >
      <i v-if="indeterminate && !modelValue" class="pi pi-minus text-[10px]" />
      <i v-else-if="modelValue" class="pi pi-check text-[10px]" />
    </div>

    <!-- Label -->
    <span v-if="label" class="text-sm text-slate-700 font-medium">{{ label }}</span>
  </label>
  <p v-if="error" class="text-red-600 text-xs mt-1 ml-8">{{ error }}</p>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  error?: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  indeterminate: false,
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
