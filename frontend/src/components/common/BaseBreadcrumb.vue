<template>
  <nav class="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <!-- Separator -->
      <i v-if="index > 0" class="pi pi-angle-right text-xs text-slate-300" />

      <!-- Item -->
      <component
        :is="item.to ? 'router-link' : 'span'"
        :to="item.to"
        :class="[
          'inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-colors duration-150',
          index === items.length - 1
            ? 'text-slate-900 font-semibold cursor-default'
            : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer'
        ]"
        :aria-current="index === items.length - 1 ? 'page' : undefined"
      >
        <i v-if="item.icon" :class="[item.icon, 'text-xs']" />
        <span>{{ item.label }}</span>
      </component>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string | Record<string, unknown>
  icon?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>
