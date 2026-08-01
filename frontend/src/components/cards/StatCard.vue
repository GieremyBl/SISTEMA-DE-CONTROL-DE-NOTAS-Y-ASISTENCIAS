<template>
  <div class="card card-padding rounded-2xl bg-white hover:shadow-lg transition-all">
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl shrink-0"
        :style="{ background: iconBgColor }"
      >
        <i :class="icon" />
      </div>

      <!-- Content -->
      <div class="flex-1">
        <p class="text-3xl font-black text-slate-900 leading-none">{{ value }}</p>
        <p class="text-xs text-slate-500 font-medium mt-0.5">{{ label }}</p>
        <p v-if="subtitle" class="text-[10px] text-slate-400 mt-0.5">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string | number
  label: string
  subtitle?: string
  icon: string
  iconBgColor?: string
}

withDefaults(defineProps<Props>(), {
  iconBgColor: '#3b82f6',
})
</script>
