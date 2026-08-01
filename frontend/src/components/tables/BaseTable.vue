<template>
  <div class="card card-padding rounded-2xl overflow-hidden bg-white">
    <!-- Header -->
    <div v-if="title" class="pb-4 border-b border-slate-100 mb-4">
      <h3 class="text-base font-bold text-slate-900">{{ title }}</h3>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-100 bg-slate-50">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider"
              :style="{ width: col.width }"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in data"
            :key="idx"
            class="border-b border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3.5 text-sm text-slate-700"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty state -->
    <div v-if="data.length === 0" class="text-center py-8">
      <p class="text-slate-400">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  width?: string
}

interface Props {
  title?: string
  columns: Column[]
  data: any[]
  emptyMessage?: string
}

withDefaults(defineProps<Props>(), {
  emptyMessage: 'No hay datos disponibles',
})
</script>
