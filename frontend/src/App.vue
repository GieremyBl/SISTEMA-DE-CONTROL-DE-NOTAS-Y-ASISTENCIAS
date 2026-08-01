<template>
  <!-- Auth layout -->
  <template v-if="route.meta.layout === 'auth'">
    <router-view />
  </template>

  <!-- Main layout -->
  <template v-else>
    <div class="flex h-screen overflow-hidden bg-slate-100">

      <!-- ── Sidebar ─────────────────────────────── -->
      <aside
        :class="[
          'flex flex-col bg-[#0f1e35] transition-all duration-300 shrink-0',
          collapsed ? 'w-16' : 'w-60'
        ]"
      >
        <!-- Logo -->
        <div
          class="flex items-center gap-3 px-4 py-5 border-b border-white/[0.07]"
          :class="collapsed ? 'justify-center px-0' : ''"
        >
          <div class="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
            <i class="pi pi-book text-white text-sm" />
          </div>
          <transition name="fade">
            <div v-if="!collapsed">
              <p class="text-white font-extrabold text-sm leading-tight tracking-tight">EduNotas</p>
              <p class="text-slate-500 text-[10px] font-medium mt-0.5">Sistema Académico</p>
            </div>
          </transition>
        </div>

        <!-- Nav items -->
        <nav class="flex-1 px-2 py-3 overflow-hidden">
          <button
            v-for="item in navItems"
            :key="item.label"
            @click="router.push({ name: item.routeName })"
            :class="[
              'w-full flex items-center gap-3 py-2.5 rounded-xl border-none cursor-pointer mb-1 transition-all duration-150',
              collapsed ? 'justify-center px-0' : 'px-3',
              isActive(item.routeName)
                ? 'bg-primary-600 text-white'
                : 'bg-transparent text-slate-400 hover:bg-white/6 hover:text-slate-200'
            ]"
          >
            <i :class="['text-base shrink-0', item.icon]" />
            <transition name="fade">
              <span v-if="!collapsed" class="text-[13px] font-semibold whitespace-nowrap">
                {{ item.label }}
              </span>
            </transition>
          </button>
        </nav>

        <!-- Collapse toggle -->
        <button
          @click="collapsed = !collapsed"
          class="mx-2 mb-3 py-2.5 rounded-xl bg-white/4 text-slate-500 hover:text-slate-300 hover:bg-white/8 border-none cursor-pointer flex items-center justify-center transition-all"
        >
          <i :class="collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'" />
        </button>
      </aside>

      <!-- ── Main ───────────────────────────────── -->
      <div class="flex flex-col flex-1 min-w-0 overflow-hidden">

        <!-- Topbar -->
        <header class="h-15 bg-white border-b border-slate-200 flex items-center justify-between px-7 shrink-0">
          <p class="text-sm font-semibold text-slate-500">{{ pageTitle }}</p>
          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative p-2 rounded-xl hover:bg-slate-100 border-none bg-transparent cursor-pointer text-slate-500">
              <i class="pi pi-bell text-base" />
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <!-- User Dropdown -->
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-colors border-none bg-transparent"
              >
                <div class="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center text-white text-[13px] font-bold">
                  {{ initials }}
                </div>
                <div class="hidden sm:block">
                  <p class="text-[13px] font-bold text-slate-900 leading-tight">{{ authStore.fullName }}</p>
                  <p class="text-[11px] text-slate-400">
                    {{ authStore.isAdmin ? 'Administrador' : 'Docente' }}
                  </p>
                </div>
              </button>

              <!-- Dropdown menu -->
              <transition name="dropdown">
                <div 
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
                  @click.stop
                >
                  <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-red-50 hover:text-red-600 border-none bg-transparent cursor-pointer text-left transition-colors"
                  >
                    <i class="pi pi-sign-out text-base" />
                    <span class="text-sm font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </header>

        <!-- Page content -->
        <main class="flex-1 overflow-auto p-7">
          <router-view />
        </main>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()
const collapsed = ref(false)
const showUserMenu = ref(false)

const navItems = [
  { label: 'Dashboard',       icon: 'pi pi-home',          routeName: 'Dashboard'  },
  { label: 'Alumnos',         icon: 'pi pi-users',         routeName: 'Students'   },
  { label: 'Notas',           icon: 'pi pi-book',          routeName: 'Grades'     },
  { label: 'Asistencia',      icon: 'pi pi-check-square',  routeName: 'Attendance' },
  { label: 'Orden de Mérito', icon: 'pi pi-star',          routeName: 'Merit'      },
  { label: 'Libreta',         icon: 'pi pi-file',          routeName: 'Notebook'   },
  { label: 'Configuración',   icon: 'pi pi-cog',           routeName: 'Settings'   },
]

const isActive   = (name: string) => route.name === name
const pageTitle  = computed(() => route.meta.title as string ?? 'EduNotas')
const initials   = computed(() => {
  return (authStore.fullName ?? '')
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
})

function handleLogout() {
  authStore.logout()
  showUserMenu.value = false
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.dropdown-enter-active, .dropdown-leave-active { 
  transition: opacity 0.15s ease, transform 0.15s ease; 
}
.dropdown-enter-from, .dropdown-leave-to { 
  opacity: 0;
  transform: translateY(-8px);
}
</style>