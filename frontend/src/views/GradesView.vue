<template>
  <div>

    <!-- ── Header ──────────────────────────────── -->
    <div class="section-header">
      <div>
        <h1 class="page-title">Registro de Notas</h1>
        <p class="page-subtitle">Calificaciones por bimestre — {{ selectedGrade?.level }} Sección {{ selectedGrade?.section }}</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          v-if="hasChanges"
          @click="handleBulkSave"
          :disabled="store.saving"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold border-none cursor-pointer transition-all disabled:opacity-70 shadow-sm"
        >
          <svg v-if="store.saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <i v-else class="pi pi-save text-sm" />
          {{ store.saving ? 'Guardando...' : `Guardar cambios (${pendingCount})` }}
        </button>
        <button
          @click="exportExcel"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all cursor-pointer"
        >
          <i class="pi pi-file-excel text-sm text-green-600" />
          Exportar Excel
        </button>
      </div>
    </div>

    <!-- ── Grade tabs ──────────────────────────── -->
    <div class="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
      <button
        v-for="grade in store.grades"
        :key="grade.id"
        @click="selectGrade(grade.id)"
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

    <!-- ── Period tabs ─────────────────────────── -->
    <div class="flex items-center gap-2 mb-5">
      <button
        v-for="period in store.periods"
        :key="period"
        @click="selectedPeriod = period"
        :class="[
          'px-4 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer',
          selectedPeriod === period
            ? 'bg-blue-50 text-[#1a56a0] border-[#1a56a0]'
            : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
        ]"
      >
        {{ period }}
      </button>

      <!-- Unsaved badge -->
      <transition name="fade">
        <span v-if="hasChanges" class="ml-2 flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-lg">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {{ pendingCount }} cambio{{ pendingCount > 1 ? 's' : '' }} sin guardar
        </span>
      </transition>
    </div>

    <!-- ── Table ────────────────────────────────── -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse" style="min-width: 900px">
          <thead>
            <tr class="bg-[#1e3a5f]">
              <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider sticky left-0 bg-[#1e3a5f] z-10 min-w-[200px]">
                Alumno
              </th>
              <th
                v-for="course in store.courses"
                :key="course.id"
                class="px-3 py-3.5 text-center text-[11px] font-bold text-blue-200 uppercase tracking-wider min-w-[90px]"
              >
                {{ course.name }}
              </th>
              <th class="px-4 py-3.5 text-center text-[11px] font-bold text-yellow-300 uppercase tracking-wider min-w-[90px]">
                Promedio
              </th>
            </tr>

            <!-- Course averages row -->
            <tr class="bg-[#162d4a] border-t border-white/10">
              <td class="px-5 py-2 text-[10px] font-bold text-blue-300 uppercase tracking-wider sticky left-0 bg-[#162d4a] z-10">
                Promedio del Aula
              </td>
              <td
                v-for="course in store.courses"
                :key="course.id"
                class="px-3 py-2 text-center"
              >
                <span
                  class="text-xs font-black px-2 py-0.5 rounded"
                  :style="{ color: store.scoreColor(store.getCourseAverage(selectedGradeId, course.id, selectedPeriod)), background: store.scoreBg(store.getCourseAverage(selectedGradeId, course.id, selectedPeriod)) }"
                >
                  {{ store.getCourseAverage(selectedGradeId, course.id, selectedPeriod) ?? '—' }}
                </span>
              </td>
              <td class="px-4 py-2 text-center">
                <span class="text-xs font-black text-yellow-300">{{ gradeGeneralAverage }}</span>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(student, i) in gradeStudents"
              :key="student.id"
              :class="['border-b border-slate-100 transition-colors', i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50']"
            >
              <!-- Student name -->
              <td class="px-5 py-3 sticky left-0 z-10" :class="i % 2 === 0 ? 'bg-white' : 'bg-slate-50'">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {{ studentInitials(student) }}
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 leading-tight">{{ student.lastName }}, {{ student.name }}</p>
                  </div>
                </div>
              </td>

              <!-- Score inputs -->
              <td
                v-for="course in store.courses"
                :key="course.id"
                class="px-2 py-2 text-center"
              >
                <input
                  type="number"
                  min="0"
                  max="20"
                  :value="getCellValue(student.id, course.id)"
                  @change="onScoreChange(student.id, course.id, $event)"
                  @focus="onFocus(student.id, course.id)"
                  @blur="onBlur"
                  :class="[
                    'w-14 text-center py-1.5 rounded-lg border text-sm font-bold outline-none transition-all',
                    isFocused(student.id, course.id) ? 'border-[#1a56a0] ring-2 ring-blue-100 bg-white' : 'border-transparent',
                    isPending(student.id, course.id) ? 'ring-1 ring-amber-400 border-amber-300' : '',
                  ]"
                  :style="{
                    color: store.scoreColor(getCellValue(student.id, course.id)),
                    background: isFocused(student.id, course.id) ? '#fff' : store.scoreBg(getCellValue(student.id, course.id))
                  }"
                />
              </td>

              <!-- Row average -->
              <td class="px-4 py-3 text-center">
                <span
                  class="text-sm font-black px-3 py-1 rounded-lg"
                  :style="{
                    color: store.scoreColor(store.getStudentAverage(student.id, selectedPeriod)),
                    background: store.scoreBg(store.getStudentAverage(student.id, selectedPeriod))
                  }"
                >
                  {{ store.getStudentAverage(student.id, selectedPeriod) ?? '—' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table footer -->
      <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs text-slate-400">
          <strong class="text-slate-600">{{ gradeStudents.length }}</strong> alumnos · {{ selectedPeriod }}
        </span>
        <div class="flex items-center gap-4 text-[10px] font-semibold">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-green-100 border border-green-300 inline-block"/><span class="text-slate-400">17–20 Excelente</span></span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-blue-100 border border-blue-300 inline-block"/><span class="text-slate-400">14–16 Bueno</span></span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-yellow-100 border border-yellow-300 inline-block"/><span class="text-slate-400">11–13 Regular</span></span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-red-100 border border-red-300 inline-block"/><span class="text-slate-400">0–10 Bajo</span></span>
        </div>
      </div>
    </div>

    <!-- ── Toast ────────────────────────────────── -->
    <transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 flex items-center gap-3 bg-[#0f1e35] text-white px-5 py-3.5 rounded-xl shadow-2xl z-[100]"
      >
        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
          <i :class="toast.type === 'success' ? 'pi pi-check' : 'pi pi-times'" class="text-xs" />
        </div>
        <div>
          <p class="text-sm font-bold">{{ toast.title }}</p>
          <p class="text-xs text-slate-400">{{ toast.message }}</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useGradeStore } from '@/stores/grade.store'
import { useStudentStore } from '@/stores/student.store'
import type { Period, Student } from '@/types'

const store        = useGradeStore()
const studentStore = useStudentStore()

// ── State ──────────────────────────────────────
const selectedGradeId = ref(store.grades[2]?.id ?? store.grades[0]?.id ?? '')
const selectedPeriod  = ref<Period>('I Bimestre')
const focusedCell     = ref<string | null>(null)

// pending = cambios locales aún no guardados { key → value }
const pending = reactive<Record<string, number>>({})

const toast = reactive({ show: false, type: 'success', title: '', message: '' })

// ── Computed ───────────────────────────────────
const selectedGrade = computed(() => store.grades.find(g => g.id === selectedGradeId.value))

const gradeStudents = computed(() =>
  studentStore.students.filter(s => s.gradeId === selectedGradeId.value)
)

const hasChanges   = computed(() => Object.keys(pending).length > 0)
const pendingCount = computed(() => Object.keys(pending).length)

const gradeGeneralAverage = computed(() => {
  const avgs = gradeStudents.value
    .map(s => store.getStudentAverage(s.id, selectedPeriod.value))
    .filter((v): v is number => v !== null)
  if (!avgs.length) return '—'
  return (avgs.reduce((a, b) => a + b, 0) / avgs.length).toFixed(1)
})

// ── Helpers ────────────────────────────────────
function cellKey(studentId: string, courseId: string) {
  return `${studentId}::${courseId}::${selectedPeriod.value}`
}

function getCellValue(studentId: string, courseId: string): number | null {
  const key = cellKey(studentId, courseId)
  return key in pending ? (pending[key] ?? null) : store.getScore(studentId, courseId, selectedPeriod.value)
}

function isPending(studentId: string, courseId: string): boolean {
  return cellKey(studentId, courseId) in pending
}

function isFocused(studentId: string, courseId: string): boolean {
  return focusedCell.value === cellKey(studentId, courseId)
}

function studentInitials(s: Student): string {
  return `${s.name[0]}${s.lastName[0]}`.toUpperCase()
}

function onFocus(studentId: string, courseId: string) {
  focusedCell.value = cellKey(studentId, courseId)
}

function onBlur() {
  focusedCell.value = null
}

function onScoreChange(studentId: string, courseId: string, event: Event) {
  const input = event.target as HTMLInputElement
  let val = parseInt(input.value)
  if (isNaN(val)) return
  if (val < 0)  val = 0
  if (val > 20) val = 20
  input.value = String(val)
  const key = cellKey(studentId, courseId)
  const original = store.getScore(studentId, courseId, selectedPeriod.value)
  if (original === val) {
    delete pending[key]
  } else {
    pending[key] = val
  }
}

function selectGrade(id: string) {
  if (hasChanges.value) {
    if (!confirm('Tienes cambios sin guardar. ¿Deseas descartarlos?')) return
    Object.keys(pending).forEach(k => delete pending[k])
  }
  selectedGradeId.value = id
}

// ── Actions ────────────────────────────────────
async function handleBulkSave() {
  const updates = Object.entries(pending).map(([key, value]) => {
  const parts     = key.split('::')
  const studentId = parts[0] as string
  const courseId  = parts[1] as string
  const period    = parts[2] as Period
  return { studentId, courseId, period, value }
})
  try {
    await store.bulkSave(updates)
    Object.keys(pending).forEach(k => delete pending[k])
    showToast('success', 'Notas guardadas', `${updates.length} nota${updates.length > 1 ? 's' : ''} actualizada${updates.length > 1 ? 's' : ''} correctamente.`)
  } catch {
    showToast('error', 'Error al guardar', 'No se pudieron guardar las notas.')
  }
}

function exportExcel() {
  showToast('success', 'Exportando...', 'El archivo Excel se generará próximamente.')
}

function showToast(type: 'success' | 'error', title: string, message: string) {
  toast.type    = type
  toast.title   = title
  toast.message = message
  toast.show    = true
  setTimeout(() => (toast.show = false), 3000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active   { transition: all 0.2s ease; }
.fade-enter-from, .fade-leave-to         { opacity: 0; transform: translateX(8px); }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to       { opacity: 0; transform: translateY(16px); }

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
input[type=number] { -moz-appearance: textfield; appearance: textfield; }
</style>