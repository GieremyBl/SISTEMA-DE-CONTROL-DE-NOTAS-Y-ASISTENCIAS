<template>
  <div class="space-y-6">

    <!-- ── Banner ──────────────────────────────── -->
    <div class="rounded-2xl overflow-hidden relative" style="background: linear-gradient(135deg, #0f1e35 0%, #1e3a5f 60%, #1a56a0 100%)">
      <div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/3 -translate-y-1/2 translate-x-1/4" />
      <div class="absolute bottom-0 left-20 w-40 h-40 rounded-full bg-white/3 translate-y-1/2" />
      <div class="relative px-8 py-7 flex items-center justify-between">
        <div>
          <p class="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Sistema de Control Académico</p>
          <h1 class="text-white text-2xl font-black tracking-tight">{{ school.name }}</h1>
          <p class="text-blue-200 text-sm mt-1">{{ school.ugel }}</p>
          <div class="flex items-center gap-3 mt-4">
            <div class="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span class="text-white/70 text-xs font-medium">Año Escolar 2025</span>
            </div>
            <div class="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
              <span class="text-white/70 text-xs font-medium">II Bimestre en curso</span>
            </div>
          </div>
        </div>
        <div class="text-right hidden sm:block">
          <p class="text-blue-300 text-xs font-semibold">Docente a cargo</p>
          <p class="text-white text-lg font-bold mt-0.5">{{ authStore.fullName }}</p>
          <p class="text-blue-200 text-xs mt-0.5">{{ authStore.isAdmin ? 'Administrador' : 'Docente' }}</p>
          <p class="text-blue-300 text-xs mt-3">{{ today }}</p>
        </div>
      </div>
    </div>

    <!-- ── Stats cards ─────────────────────────── -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in statCards"
        :key="stat.label"
        class="card card-padding flex items-center gap-4"
      >
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :style="{ background: stat.color }">
          <i :class="['text-white text-lg', stat.icon]" />
        </div>
        <div>
          <p class="text-2xl font-black text-slate-900 leading-none">{{ stat.value }}</p>
          <p class="text-xs text-slate-500 font-medium mt-1">{{ stat.label }}</p>
          <p class="text-[10px] text-slate-400 mt-0.5">{{ stat.sub }}</p>
        </div>
      </div>
    </div>

    <!-- ── Main grid ────────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

      <!-- Schedule (2 cols) -->
      <div class="lg:col-span-2 card overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-slate-900">Horario de Clases</h2>
            <p class="text-xs text-slate-400 mt-0.5">Semana actual</p>
          </div>
          <!-- Grade filter -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400">Grado:</span>
            <select
              v-model="scheduleGradeFilter"
              class="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none text-slate-600 font-semibold bg-white"
            >
              <option value="">Todos</option>
              <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.level }}</option>
            </select>
          </div>
        </div>

        <div class="p-4">
          <div class="grid grid-cols-5 gap-2">
            <div v-for="day in DAYS" :key="day.key">
              <!-- Day header -->
              <div :class="[
                'text-center text-[10px] font-black uppercase tracking-wider py-2 rounded-lg mb-2',
                isToday(day.key) ? 'bg-[#1e3a5f] text-white' : 'text-slate-400'
              ]">
                {{ day.label }}
              </div>
              <!-- Slots -->
              <div
                v-for="slot in getSlotsForDay(day.key)"
                :key="slot.id"
                class="rounded-xl p-2.5 mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                :style="{ background: slot.course?.color ?? '#1e3a5f' }"
              >
                <p class="text-[9px] text-white/70 font-semibold">{{ slot.startTime }}</p>
                <p class="text-[11px] text-white font-bold leading-tight mt-0.5">{{ slot.course?.name }}</p>
                <p class="text-[9px] text-white/60 mt-1">{{ slot.grade?.level }}</p>
              </div>
              <!-- Empty day -->
              <div v-if="getSlotsForDay(day.key).length === 0" class="rounded-xl border-2 border-dashed border-slate-100 py-4 text-center">
                <p class="text-[10px] text-slate-300">Libre</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activities (1 col) -->
      <div class="card overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-slate-900">Próximas Actividades</h2>
            <p class="text-xs text-slate-400 mt-0.5">{{ MOCK_ACTIVITIES.length }} pendientes</p>
          </div>
          <button class="text-xs text-[#1a56a0] font-bold hover:underline bg-transparent border-none cursor-pointer">
            Ver todas
          </button>
        </div>
        <div class="divide-y divide-slate-100">
          <div
            v-for="act in MOCK_ACTIVITIES"
            :key="act.id"
            class="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors"
          >
            <!-- Date badge -->
            <div
              class="w-11 h-11 rounded-xl flex flex-col items-center justify-center shrink-0"
              :style="{ background: activityColor(act.type) }"
            >
              <span class="text-white text-xs font-black leading-none">{{ formatDay(act.date) }}</span>
              <span class="text-white/70 text-[9px] uppercase font-bold mt-0.5">{{ formatMonth(act.date) }}</span>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-semibold text-slate-800 leading-tight">{{ act.title }}</p>
              <span
                class="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                :style="{ color: activityColor(act.type), background: activityColor(act.type) + '22' }"
              >
                {{ activityLabel(act.type) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Bottom row ───────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Average by grade bars -->
      <div class="card card-padding">
        <h2 class="text-sm font-bold text-slate-900 mb-1">Promedio por Grado</h2>
        <p class="text-xs text-slate-400 mb-5">II Bimestre 2025</p>
        <div class="space-y-3">
          <div v-for="g in MOCK_STATS.gradeStats" :key="g.grade" class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-500 w-12 shrink-0">{{ g.grade }}</span>
            <div class="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: `${(g.average / 20) * 100}%`, background: scoreColor(g.average) }"
              />
            </div>
            <span class="text-xs font-black w-8 text-right" :style="{ color: scoreColor(g.average) }">
              {{ g.average }}
            </span>
          </div>
        </div>
      </div>

      <!-- Quick stats -->
      <div class="card card-padding">
        <h2 class="text-sm font-bold text-slate-900 mb-1">Resumen General</h2>
        <p class="text-xs text-slate-400 mb-5">Estado actual del sistema</p>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="qs in quickStats"
            :key="qs.label"
            class="rounded-xl p-4 text-center"
            :style="{ background: qs.bg }"
          >
            <p class="text-2xl font-black" :style="{ color: qs.color }">{{ qs.value }}</p>
            <p class="text-xs font-semibold text-slate-500 mt-1">{{ qs.label }}</p>
          </div>
        </div>

        <!-- Attendance bar -->
        <div class="mt-5 pt-5 border-t border-slate-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-600">Asistencia semanal</span>
            <span class="text-sm font-black text-green-600">{{ MOCK_STATS.attendanceRate }}%</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              class="h-full rounded-full bg-green-500 transition-all duration-700"
              :style="{ width: `${MOCK_STATS.attendanceRate}%` }"
            />
          </div>
          <div class="flex justify-between mt-1.5">
            <span class="text-[10px] text-slate-400">0%</span>
            <span class="text-[10px] text-slate-400">100%</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useAuthStore } from '@/stores/auth.store'
import { MOCK_SCHEDULE, MOCK_ACTIVITIES, MOCK_STATS } from '@/mocks/dashboard.mock'
import { MOCK_GRADES } from '@/mocks/students.mock'
import { MOCK_SCHOOL } from '@/mocks/auth.mock'
import type { ActivityType } from '@/types'

dayjs.locale('es')

const authStore = useAuthStore()
const school    = MOCK_SCHOOL
const grades    = MOCK_GRADES

const scheduleGradeFilter = ref('')
const today = computed(() => dayjs().format('dddd, D [de] MMMM [de] YYYY'))

const DAYS = [
  { key: 'LUNES',     label: 'Lun' },
  { key: 'MARTES',    label: 'Mar' },
  { key: 'MIERCOLES', label: 'Mié' },
  { key: 'JUEVES',    label: 'Jue' },
  { key: 'VIERNES',   label: 'Vie' },
] as const

// ── Helpers ────────────────────────────────────
function isToday(day: string): boolean {
  const map: Record<string, number> = {
    LUNES: 1, MARTES: 2, MIERCOLES: 3, JUEVES: 4, VIERNES: 5,
  }
  return dayjs().day() === map[day]
}

function getSlotsForDay(day: string) {
  return MOCK_SCHEDULE.filter(s => {
    const matchDay   = s.day === day
    const matchGrade = !scheduleGradeFilter.value || s.gradeId === scheduleGradeFilter.value
    return matchDay && matchGrade
  })
}

function formatDay(date: string)   { return dayjs(date).format('D') }
function formatMonth(date: string) { return dayjs(date).format('MMM') }

function activityColor(type: ActivityType): string {
  const map: Record<ActivityType, string> = {
    EXAM:     '#1e3a5f',
    PRACTICE: '#1a56a0',
    DELIVERY: '#059669',
    EVENT:    '#d97706',
  }
  return map[type]
}

function activityLabel(type: ActivityType): string {
  const map: Record<ActivityType, string> = {
    EXAM:     'Examen',
    PRACTICE: 'Práctica',
    DELIVERY: 'Entrega',
    EVENT:    'Evento',
  }
  return map[type]
}

function scoreColor(score: number): string {
  if (score >= 17) return '#059669'
  if (score >= 14) return '#1a56a0'
  if (score >= 11) return '#d97706'
  return '#dc2626'
}

// ── Stat cards ─────────────────────────────────
const statCards = [
  { label: 'Total Alumnos',    value: MOCK_STATS.totalStudents,           sub: '6 grados activos',    icon: 'pi pi-users',       color: '#1e3a5f' },
  { label: 'Cursos Activos',   value: MOCK_STATS.totalCourses,            sub: 'Por grado',           icon: 'pi pi-book',        color: '#1a56a0' },
  { label: 'Promedio General', value: MOCK_STATS.generalAverage.toFixed(1), sub: 'II Bimestre',       icon: 'pi pi-chart-bar',   color: '#0e7490' },
  { label: 'Asistencia',       value: `${MOCK_STATS.attendanceRate}%`,    sub: 'Esta semana',         icon: 'pi pi-check-square', color: '#059669' },
]

const quickStats = [
  { label: 'Aprobados',        value: `${MOCK_STATS.approvedRate}%`,  color: '#059669', bg: '#f0fdf4' },
  { label: 'En recuperación',  value: `${100 - MOCK_STATS.approvedRate}%`, color: '#d97706', bg: '#fffbeb' },
  { label: 'Notas registradas', value: '320',                         color: '#1a56a0', bg: '#eff6ff' },
  { label: 'Actividades',      value: MOCK_ACTIVITIES.length,         color: '#1e3a5f', bg: '#f8fafc' },
]
</script>