<template>
  <div>

    <!-- ── Header ──────────────────────────────── -->
    <div class="section-header">
      <div>
        <h1 class="page-title">Orden de Mérito</h1>
        <p class="page-subtitle">Ranking por promedio general — {{ selectedGrade?.level }} Sección {{ selectedGrade?.section }}</p>
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="selectedPeriod"
          class="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 outline-none cursor-pointer"
        >
          <option value="general">Promedio General</option>
          <option v-for="p in gradeStore.periods" :key="p" :value="p">{{ p }}</option>
        </select>
        <button
          @click="exportRanking"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-all"
        >
          <i class="pi pi-file-excel text-sm text-green-600" />
          Exportar
        </button>
      </div>
    </div>

    <!-- ── Grade tabs ──────────────────────────── -->
    <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
      <button
        v-for="grade in gradeStore.grades"
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
        <span :class="[
          'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black',
          selectedGradeId === grade.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
        ]">
          {{ studentStore.getByGrade(grade.id).length }}
        </span>
      </button>
    </div>

    <!-- ── Podium top 3 ────────────────────────── -->
    <div v-if="rankedStudents.length >= 3" class="grid grid-cols-3 gap-4 mb-6">
      <!-- 2nd place -->
      <div class="card card-padding flex flex-col items-center text-center pt-6 border-2 border-slate-200">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white text-2xl font-black mb-2">
          2°
        </div>
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Segundo Lugar</p>
        <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-black text-base mb-2">
          {{ initials(second) }}
        </div>
        <p class="text-sm font-black text-slate-900 leading-tight">{{ second.lastName }}</p>
        <p class="text-xs text-slate-500 mt-0.5 mb-3">{{ second.name }}</p>
        <p class="text-2xl font-black" style="color: #64748b">{{ getAvg(second) }}</p>
        <p class="text-[10px] text-slate-400 mt-0.5">Promedio</p>
        <div class="mt-3 w-full">
          <div v-for="p in gradeStore.periods.slice(0, 2)" :key="p" class="flex items-center justify-between text-[10px] text-slate-500 mb-1">
            <span>{{ p }}</span>
            <span class="font-bold" :style="{ color: gradeStore.scoreColor(gradeStore.getStudentAverage(second.id, p)) }">
              {{ gradeStore.getStudentAverage(second.id, p) ?? '—' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 1st place -->
      <div class="card card-padding flex flex-col items-center text-center pt-6 border-2" style="border-color: #fbbf24; box-shadow: 0 4px 24px rgba(251,191,36,0.2)">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-2" style="background: linear-gradient(135deg, #f59e0b, #fbbf24)">
          1°
        </div>
        <p class="text-[10px] font-black uppercase tracking-widest mb-1" style="color: #d97706">Primer Lugar</p>
        <div class="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg mb-2 text-white" style="background: linear-gradient(135deg,#f59e0b,#fbbf24)">
          {{ initials(first) }}
        </div>
        <p class="text-base font-black text-slate-900 leading-tight">{{ first.lastName }}</p>
        <p class="text-sm text-slate-500 mt-0.5 mb-3">{{ first.name }}</p>
        <p class="text-3xl font-black" style="background: linear-gradient(135deg,#f59e0b,#d97706); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent">
          {{ getAvg(first) }}
        </p>
        <p class="text-[10px] text-slate-400 mt-0.5">Promedio</p>
        <div class="mt-3 w-full">
          <div v-for="p in gradeStore.periods.slice(0, 2)" :key="p" class="flex items-center justify-between text-[10px] text-slate-500 mb-1">
            <span>{{ p }}</span>
            <span class="font-bold" :style="{ color: gradeStore.scoreColor(gradeStore.getStudentAverage(first.id, p)) }">
              {{ gradeStore.getStudentAverage(first.id, p) ?? '—' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 3rd place -->
      <div class="card card-padding flex flex-col items-center text-center pt-6 border-2 border-slate-200">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-2" style="background: linear-gradient(135deg, #cd7f32, #d97706)">
          3°
        </div>
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tercer Lugar</p>
        <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-base mb-2 text-white" style="background: linear-gradient(135deg,#cd7f32,#d97706)">
          {{ initials(third) }}
        </div>
        <p class="text-sm font-black text-slate-900 leading-tight">{{ third.lastName }}</p>
        <p class="text-xs text-slate-500 mt-0.5 mb-3">{{ third.name }}</p>
        <p class="text-2xl font-black" style="color: #cd7f32">{{ getAvg(third) }}</p>
        <p class="text-[10px] text-slate-400 mt-0.5">Promedio</p>
        <div class="mt-3 w-full">
          <div v-for="p in gradeStore.periods.slice(0, 2)" :key="p" class="flex items-center justify-between text-[10px] text-slate-500 mb-1">
            <span>{{ p }}</span>
            <span class="font-bold" :style="{ color: gradeStore.scoreColor(gradeStore.getStudentAverage(third.id, p)) }">
              {{ gradeStore.getStudentAverage(third.id, p) ?? '—' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Full ranking table ──────────────────── -->
    <div class="card overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 class="text-sm font-bold text-slate-900">Ranking Completo</h2>
        <span class="text-xs text-slate-400">{{ rankedStudents.length }} alumnos ordenados</span>
      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-[#1e3a5f]">
            <th class="px-5 py-3.5 text-center text-[11px] font-bold text-slate-300 uppercase tracking-wider w-16">Puesto</th>
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">Alumno</th>
            <th
              v-for="p in gradeStore.periods"
              :key="p"
              class="px-4 py-3.5 text-center text-[11px] font-bold text-blue-200 uppercase tracking-wider min-w-[90px]"
            >
              {{ p.replace(' Bimestre', ' Bim.') }}
            </th>
            <th class="px-5 py-3.5 text-center text-[11px] font-bold text-yellow-300 uppercase tracking-wider">Promedio</th>
            <th class="px-5 py-3.5 text-center text-[11px] font-bold text-slate-300 uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, i) in rankedStudents"
            :key="student.id"
            :class="[
              'border-b border-slate-100 transition-colors',
              i < 3 ? 'hover:bg-amber-50/30' : 'hover:bg-slate-50',
              i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
            ]"
          >
            <!-- Rank -->
            <td class="px-5 py-3.5 text-center">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black mx-auto"
                :style="rankStyle(i)"
              >
                {{ i + 1 }}
              </div>
            </td>

            <!-- Student -->
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  :style="i < 3 ? { background: '#1e3a5f', color: '#fff' } : { background: '#f1f5f9', color: '#64748b' }"
                >
                  {{ initials(student) }}
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900">{{ student.lastName }}, {{ student.name }}</p>
                  <p class="text-xs text-slate-400">DNI: {{ student.dni }}</p>
                </div>
              </div>
            </td>

            <!-- Per-period averages -->
            <td
              v-for="p in gradeStore.periods"
              :key="p"
              class="px-4 py-3.5 text-center"
            >
              <span
                class="text-sm font-bold px-2.5 py-1 rounded-lg"
                :style="{
                  color: gradeStore.scoreColor(gradeStore.getStudentAverage(student.id, p)),
                  background: gradeStore.scoreBg(gradeStore.getStudentAverage(student.id, p))
                }"
              >
                {{ gradeStore.getStudentAverage(student.id, p) ?? '—' }}
              </span>
            </td>

            <!-- General average -->
            <td class="px-5 py-3.5 text-center">
              <span
                class="text-base font-black px-3 py-1.5 rounded-xl"
                :style="{
                  color: gradeStore.scoreColor(gradeStore.getGeneralAverage(student.id)),
                  background: gradeStore.scoreBg(gradeStore.getGeneralAverage(student.id))
                }"
              >
                {{ gradeStore.getGeneralAverage(student.id) ?? '—' }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-5 py-3.5 text-center">
              <span
                class="text-xs font-bold px-2.5 py-1 rounded-full"
                :style="statusStyle(gradeStore.getGeneralAverage(student.id))"
              >
                {{ statusLabel(gradeStore.getGeneralAverage(student.id)) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-6 text-xs text-slate-500">
          <span>Aprobados: <strong class="text-green-600">{{ approvedCount }}</strong></span>
          <span>En recuperación: <strong class="text-amber-600">{{ recoveryCount }}</strong></span>
          <span>Promedio del aula: <strong :style="{ color: gradeStore.scoreColor(classAverage) }">{{ classAverage ?? '—' }}</strong></span>
        </div>
        <span class="text-xs text-slate-400">{{ selectedPeriod === 'general' ? 'Promedio General' : selectedPeriod }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGradeStore } from '@/stores/grade.store'
import { useStudentStore } from '@/stores/student.store'
import type { Student, Period } from '@/types'

const gradeStore   = useGradeStore()
const studentStore = useStudentStore()

const selectedGradeId = ref(gradeStore.grades[2]?.id ?? gradeStore.grades[0]?.id ?? '')
const selectedPeriod  = ref<'general' | Period>('general')

const selectedGrade = computed(() => gradeStore.grades.find(g => g.id === selectedGradeId.value))

// ── Ranking ────────────────────────────────────
function getAvg(student: Student): string {
  if (selectedPeriod.value === 'general') {
    return String(gradeStore.getGeneralAverage(student.id) ?? '—')
  }
  return String(gradeStore.getStudentAverage(student.id, selectedPeriod.value) ?? '—')
}

const rankedStudents = computed(() => {
  const students = studentStore.getByGrade(selectedGradeId.value)
  return [...students].sort((a, b) => {
    const avgA = parseFloat(getAvg(a)) || 0
    const avgB = parseFloat(getAvg(b)) || 0
    return avgB - avgA
  })
})

const first  = computed(() => rankedStudents.value[0] as Student)
const second = computed(() => rankedStudents.value[1] as Student)
const third  = computed(() => rankedStudents.value[2] as Student)

// ── Stats ──────────────────────────────────────
const approvedCount = computed(() =>
  rankedStudents.value.filter(s => (gradeStore.getGeneralAverage(s.id) ?? 0) >= 11).length
)
const recoveryCount = computed(() => rankedStudents.value.length - approvedCount.value)

const classAverage = computed(() => {
  const avgs = rankedStudents.value
    .map(s => gradeStore.getGeneralAverage(s.id))
    .filter((v): v is number => v !== null)
  if (!avgs.length) return null
  return parseFloat((avgs.reduce((a, b) => a + b, 0) / avgs.length).toFixed(2))
})

// ── Helpers ────────────────────────────────────
function initials(s: Student): string {
  return `${s.name[0]}${s.lastName[0]}`.toUpperCase()
}

function rankStyle(i: number): Record<string, string> {
  if (i === 0) return { background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', color: '#fff' }
  if (i === 1) return { background: 'linear-gradient(135deg,#9ca3af,#d1d5db)', color: '#fff' }
  if (i === 2) return { background: 'linear-gradient(135deg,#cd7f32,#d97706)', color: '#fff' }
  return { background: '#f1f5f9', color: '#64748b' }
}

function statusLabel(avg: number | null): string {
  if (avg === null) return 'Sin notas'
  if (avg >= 14) return 'Aprobado'
  if (avg >= 11) return 'Regular'
  return 'Recuperación'
}

function statusStyle(avg: number | null): Record<string, string> {
  if (avg === null) return { color: '#94a3b8', background: '#f8fafc' }
  if (avg >= 14) return { color: '#059669', background: '#d1fae5' }
  if (avg >= 11) return { color: '#1a56a0', background: '#dbeafe' }
  return { color: '#d97706', background: '#fef3c7' }
}

function exportRanking() {
  // TODO: conectar con ExcelJS
  console.log('Exportar ranking')
}
</script>