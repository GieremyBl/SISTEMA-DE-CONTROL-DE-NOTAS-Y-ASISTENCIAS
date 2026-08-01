<template>
  <div class="card card-padding rounded-2xl bg-white border-none" :class="{ 'shadow-lg': elevated }">
    <!-- Header -->
    <div v-if="title || $slots.header" class="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
      <div>
        <h3 v-if="title" class="text-base font-bold text-slate-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-slate-400 mt-0.5">{{ subtitle }}</p>
      </div>
      <slot name="header" />
    </div>

    <!-- Content -->
    <div>
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-slate-100">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  elevated?: boolean
}

withDefaults(defineProps<Props>(), {
  elevated: false,
})
</script>
