<template>
  <div class="relative inline-block" ref="dropdownRef">
    <!-- Trigger -->
    <div @click="toggle" class="cursor-pointer">
      <slot name="trigger">
        <button class="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 border-none cursor-pointer transition-all duration-150">
          Opciones
          <i class="pi pi-angle-down text-xs ml-1" />
        </button>
      </slot>
    </div>

    <!-- Menu -->
    <transition name="dropdown">
      <div
        v-if="isOpen"
        :class="[
          'absolute z-50 mt-2 min-w-[180px] bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 overflow-hidden',
          align === 'right' ? 'right-0' : 'left-0'
        ]"
      >
        <template v-for="(item, index) in items" :key="index">
          <!-- Divider -->
          <div v-if="item.divider" class="my-1.5 border-t border-slate-100" />

          <!-- Menu Item -->
          <button
            v-else
            :disabled="item.disabled"
            :class="[
              'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left border-none bg-transparent cursor-pointer transition-all duration-150',
              item.disabled
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
            ]"
            @click="handleSelect(item)"
          >
            <i v-if="item.icon" :class="[item.icon, 'text-base text-slate-400']" />
            <span class="font-medium">{{ item.label }}</span>
          </button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface DropdownItem {
  label?: string
  icon?: string
  action?: string
  disabled?: boolean
  divider?: boolean
}

interface Props {
  items: DropdownItem[]
  align?: 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  align: 'left',
})

const emit = defineEmits<{
  select: [item: DropdownItem]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function handleSelect(item: DropdownItem) {
  if (item.disabled) return
  emit('select', item)
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
