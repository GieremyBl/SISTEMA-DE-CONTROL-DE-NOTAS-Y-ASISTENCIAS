<template>
  <div>

    <!-- ── Header ──────────────────────────────── -->
    <div class="section-header">
      <div>
        <h1 class="page-title">Control de Asistencia</h1>
        <p class="page-subtitle">{{ selectedGrade?.level }} — Semana del {{ weekLabel }}</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="store.saveWeek()"
          :disabled="store.saving"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#1a56a0] text-white text-sm font-bold border-none cursor-pointer transition-all disabled:opacity-70 shadow-sm"
        >
          <svg v-if="store.saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <i v-else class="pi pi-save text-sm" />
          {{ store.saving ? 'Guardando...' : 'Guardar' }}
        </button>
        <button
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-all"
        >
          <i class="pi pi-file-excel text-sm text-green-600" />
          Exportar
        </button>
      </div>
    </div>

    <!-- ── Grade tabs ──────────────────────────── -->
    <div class="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
      <button
        v-for="grade in grades"
        :key="grade.id"
        @click="selectedGradeId = grade.id"
        :class="[
          'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer',
          selectedGradeId === grade.id
            ? 'bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-sm'
            : 'bg-white text-slate-500 border-slate-200 hover:border-[#1e3a5f] hover:text-[#1e3a5f]'
        ]"
      >
        {{ grade.level }}
      </button>
    </div>

    <!-- ── Week navigator ──────────────────────── -->
    <div class="card card-padding mb-5 flex items-center justify-between">
      <button
        @click="prevWeek"
        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-all"
      >
        <i class="pi pi-angle-left" /> Anterior
      </button>

      <!-- Week days summary -->
      <div class="flex items-center gap-3">
        <div
          v-for="day in weekDays"
          :key="day.date"
          :class="[
            'flex flex-col items-center px-3 py-2 rounded-xl transition-all',
            day.isToday ? 'bg-[#1e3a5f] text-white' : 'text-slate-500'
          ]"
        >
          <span class="text-[10px] font-bold uppercase tracking-wider">{{ day.label }}</span>
          <span class="text-lg font-black leading-tight">{{ day.day }}</span>
          <span class="text-[10px] opacity-70">{{ day.month }}</span>
        </div>
      </div>

      <button
        @click="nextWeek"
        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-all"
      >
        Siguiente <i class="pi pi-angle-right" />
      </button>
    </div>

    <!-- ── Legend ───────────────────────────────── -->
    <div class="flex items-center gap-4 mb-4">
      <span class="text-xs text-slate-400 font-semibold">Leyenda:</span>
      <span v-for="s in STATUS_CONFIG" :key="s.key" class="flex items-center gap-1.5 text-xs font-bold" :style="{ color: s.color }">
        <span class="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-black" :style="{ background: s.color }">{{ s.label }}</span>
        {{ s.name }}
      </span>
      <span class="text-xs text-slate-300 ml-2">· Clic para cambiar estado</span>
    </div>

    <!-- ── Attendance table ─────────────────────── -->
    <div class="card overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-[#1e3a5f]">
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider w-10">#</th>
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider min-w-[180px]">Alumno</th>
            <th
              v-for="day in weekDays"
              :key="day.date"
              :class="[
                'px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider min-w-[80px]',
                day.isToday ? 'text-yellow-300' : 'text-blue-200'
              ]"
            >
              <div>{{ day.label }}</div>
              <div class="text-[9px] font-normal opacity-70 mt-0.5">{{ day.day }}/{{ day.monthNum }}</div>
            </th>
            <th class="px-4 py-3.5 text-center text-[11px] font-bold text-slate-300 uppercase tracking-wider">F</th>
            <th class="px-4 py-3.5 text-center text-[11px] font-bold text-slate-300 uppercase tracking-wider">T</th>
            <th class="px-4 py-3.5 text-center text-[11px] font-bold text-yellow-300 uppercase tracking-wider">%</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, i) in gradeStudents"
            :key="student.id"
            :class="['border-b border-slate-100 transition-colors', i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50']"
          >
            <td class="px-5 py-3 text-xs text-slate-400 font-semibold">{{ String(i + 1).padStart(2, '0') }}</td>
            <td class="px-5 py-3">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {{ student.name[0] }}{{ student.lastName[0] }}
                </div>
                <p class="text-xs font-bold text-slate-900">{{ student.lastName }}, {{ student.name }}</p>
              </div>
            </td>

            <!-- Status buttons -->
            <td v-for="day in weekDays" :key="day.date" class="px-2 py-2.5 text-center">
              <button
                @click="cycleStatus(student.id, day.date)"
                class="w-9 h-9 rounded-xl border-none cursor-pointer font-black text-xs transition-all hover:scale-105 active:scale-95"
                :style="{
                  background: statusConfig(store.getStatus(student.id, day.date)).color,
                  color: '#fff',
                  boxShadow: day.isToday ? `0 0 0 2px ${statusConfig(store.getStatus(student.id, day.date)).color}40` : 'none'
                }"
              >
                {{ statusConfig(store.getStatus(student.id, day.date)).label }}
              </button>
            </td>

            <!-- Faltas -->
            <td class="px-4 py-3 text-center">
              <span :class="['text-sm font-black', store.countByStatus(student.id, 'ABSENT', weekStart) > 0 ? 'text-red-500' : 'text-slate-300']">
                {{ store.countByStatus(student.id, 'ABSENT', weekStart) }}
              </span>
            </td>
            <!-- Tardanzas -->
            <td class="px-4 py-3 text-center">
              <span :class="['text-sm font-black', store.countByStatus(student.id, 'LATE', weekStart) > 0 ? 'text-amber-500' : 'text-slate-300']">
                {{ store.countByStatus(student.id, 'LATE', weekStart) }}
              </span>
            </td>
            <!-- % asistencia -->
            <td class="px-4 py-3 text-center">
              <span
                class="text-xs font-black px-2 py-1 rounded-lg"
                :style="{ color: attendanceColor(attendanceRate(student.id)), background: attendanceColor(attendanceRate(student.id)) + '20' }"
              >
                {{ attendanceRate(student.id) }}%
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer summary -->
      <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-6 text-xs text-slate-500">
          <span>Total: <strong class="text-slate-700">{{ gradeStudents.length }} alumnos</strong></span>
          <span>Presentes hoy: <strong class="text-green-600">{{ presentToday }}</strong></span>
          <span>Faltas hoy: <strong class="text-red-500">{{ absentToday }}</strong></span>
          <span>Tardanzas hoy: <strong class="text-amber-500">{{ lateToday }}</strong></span>
        </div>
        <span class="text-xs text-slate-400">Asistencia promedio: <strong :style="{ color: attendanceColor(avgAttendanceRate) }">{{ avgAttendanceRate }}%</strong></span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useAttendanceStore } from '@/stores/attendance.store'
import { useStudentStore } from '@/stores/student.store'
import type { AttendanceStatus } from '@/types'

dayjs.locale('es')

const store        = useAttendanceStore()
const studentStore = useStudentStore()

const grades = studentStore.grades
const selectedGradeId = ref(grades[2]?.id ?? grades[0]?.id ?? '')
const currentWeekOffset = ref(0)

// ── Status config ──────────────────────────────
const STATUS_CONFIG = [
  { key: 'PRESENT', label: 'A', name: 'Asistió',  color: '#059669' },
  { key: 'LATE',    label: 'T', name: 'Tardanza', color: '#d97706' },
  { key: 'ABSENT',  label: 'F', name: 'Faltó',    color: '#dc2626' },
] as const

const STATUS_CYCLE: AttendanceStatus[] = ['PRESENT', 'LATE', 'ABSENT']

function statusConfig(status: AttendanceStatus) {
  return STATUS_CONFIG.find(s => s.key === status) ?? STATUS_CONFIG[0]
}

function cycleStatus(studentId: string, date: string) {
  const current = store.getStatus(studentId, date)
  const idx     = STATUS_CYCLE.indexOf(current)
  const next: AttendanceStatus = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] ?? 'PRESENT'
  store.setStatus(studentId, date, next)
}

// ── Week computation ───────────────────────────
const weekStart = computed(() =>
  dayjs().startOf('week').add(1 + currentWeekOffset.value * 7, 'day').format('YYYY-MM-DD')
)

const weekDays = computed(() =>
  Array.from({ length: 5 }, (_, i) => {
    const d = dayjs(weekStart.value).add(i, 'day')
    return {
      date:     d.format('YYYY-MM-DD'),
      label:    d.format('ddd'),
      day:      d.format('D'),
      month:    d.format('MMM'),
      monthNum: d.format('MM'),
      isToday:  d.isSame(dayjs(), 'day'),
    }
  })
)

const weekLabel = computed(() => {
  const start = dayjs(weekStart.value)
  const end   = start.add(4, 'day')
  return `${start.format('D MMM')} – ${end.format('D MMM YYYY')}`
})

const selectedGrade = computed(() => grades.find(g => g.id === selectedGradeId.value))
const gradeStudents = computed(() => studentStore.students.filter(s => s.gradeId === selectedGradeId.value))

function prevWeek() { currentWeekOffset.value-- }
function nextWeek() { currentWeekOffset.value++ }

// ── Stats ──────────────────────────────────────
const todayDate = dayjs().format('YYYY-MM-DD')

const presentToday = computed(() =>
  gradeStudents.value.filter(s => store.getStatus(s.id, todayDate) === 'PRESENT').length
)
const absentToday = computed(() =>
  gradeStudents.value.filter(s => store.getStatus(s.id, todayDate) === 'ABSENT').length
)
const lateToday = computed(() =>
  gradeStudents.value.filter(s => store.getStatus(s.id, todayDate) === 'LATE').length
)

function attendanceRate(studentId: string): number {
  const total   = weekDays.value.length
  const absents = store.countByStatus(studentId, 'ABSENT', weekStart.value)
  return Math.round(((total - absents) / total) * 100)
}

const avgAttendanceRate = computed(() => {
  if (!gradeStudents.value.length) return 0
  const sum = gradeStudents.value.reduce((acc, s) => acc + attendanceRate(s.id), 0)
  return Math.round(sum / gradeStudents.value.length)
})

function attendanceColor(rate: number): string {
  if (rate >= 90) return '#059669'
  if (rate >= 75) return '#d97706'
  return '#dc2626'
}
</script>