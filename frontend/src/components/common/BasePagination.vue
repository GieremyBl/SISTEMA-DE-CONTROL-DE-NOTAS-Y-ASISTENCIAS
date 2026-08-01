<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <!-- Info -->
    <p class="text-sm text-slate-500">
      Mostrando <span class="font-semibold text-slate-700">{{ rangeStart }}-{{ rangeEnd }}</span>
      de <span class="font-semibold text-slate-700">{{ totalItems }}</span>
    </p>

    <div class="flex items-center gap-4">
      <!-- Per page selector -->
      <div v-if="showPerPage" class="flex items-center gap-2">
        <label class="text-xs text-slate-500 font-medium">Por página:</label>
        <select
          :value="itemsPerPage"
          class="px-2 py-1 rounded-lg border-2 border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
          @change="$emit('update:itemsPerPage', Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <!-- Page buttons -->
      <nav class="flex items-center gap-1" role="navigation" aria-label="Paginación">
        <!-- Prev -->
        <button
          :disabled="currentPage <= 1"
          class="w-9 h-9 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all duration-150 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed bg-transparent"
          @click="goToPage(currentPage - 1)"
          aria-label="Anterior"
        >
          <i class="pi pi-angle-left text-sm" />
        </button>

        <!-- Pages -->
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === '...'" class="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">…</span>
          <button
            v-else
            :class="[
              'w-9 h-9 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all duration-150 text-sm font-semibold',
              page === currentPage
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-transparent text-slate-600 hover:bg-slate-100'
            ]"
            @click="goToPage(page as number)"
          >
            {{ page }}
          </button>
        </template>

        <!-- Next -->
        <button
          :disabled="currentPage >= totalPages"
          class="w-9 h-9 rounded-lg flex items-center justify-center border-none cursor-pointer transition-all duration-150 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed bg-transparent"
          @click="goToPage(currentPage + 1)"
          aria-label="Siguiente"
        >
          <i class="pi pi-angle-right text-sm" />
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalItems: number
  itemsPerPage?: number
  showPerPage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  showPerPage: false,
})

const emit = defineEmits<{
  'update:currentPage': [value: number]
  'update:itemsPerPage': [value: number]
}>()

const perPageOptions = [5, 10, 20, 50]

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage)))

const rangeStart = computed(() => props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.itemsPerPage + 1)
const rangeEnd = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)

  return pages
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>
