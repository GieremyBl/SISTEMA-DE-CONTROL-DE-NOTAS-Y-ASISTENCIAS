<template>
  <label
    :class="[
      'inline-flex items-center gap-3 cursor-pointer select-none group',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <!-- Hidden native radio -->
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      class="sr-only peer"
      @change="$emit('update:modelValue', value)"
    />

    <!-- Custom radio -->
    <div
      :class="[
        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150',
        modelValue === value
          ? 'border-blue-600'
          : 'border-slate-300 group-hover:border-blue-400'
      ]"
    >
      <div
        :class="[
          'w-2.5 h-2.5 rounded-full transition-all duration-150',
          modelValue === value ? 'bg-blue-600 scale-100' : 'bg-transparent scale-0'
        ]"
      />
    </div>

    <!-- Label -->
    <span v-if="label" class="text-sm text-slate-700 font-medium">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  value: string | number
  label?: string
  name: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
