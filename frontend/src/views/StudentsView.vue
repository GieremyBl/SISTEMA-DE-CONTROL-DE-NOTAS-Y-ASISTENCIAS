<template>
  <div>

    <!-- ── Page header ─────────────────────────── -->
    <div class="section-header">
      <div>
        <h1 class="page-title">Gestión de Alumnos</h1>
        <p class="page-subtitle">
          {{ filteredStudents.length }} alumno{{ filteredStudents.length !== 1 ? 's' : '' }}
          en {{ selectedGrade?.level }} {{ selectedGrade?.section }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="openImportDialog"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all cursor-pointer"
        >
          <i class="pi pi-upload text-sm" />
          Importar
        </button>
        <button
          @click="openCreateDialog"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#1a56a0] text-white text-sm font-bold transition-all cursor-pointer border-none shadow-sm"
        >
          <i class="pi pi-plus text-sm" />
          Nuevo Alumno
        </button>
      </div>
    </div>

    <!-- ── Grade tabs ──────────────────────────── -->
    <div class="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
      <button
        v-for="grade in store.grades"
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
          {{ store.getByGrade(grade.id).length }}
        </span>
      </button>
    </div>

    <!-- ── Filters bar ─────────────────────────── -->
    <div class="flex items-center gap-3 mb-5">
      <div class="relative flex-1 max-w-xs">
        <i class="pi pi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
        <input
          v-model="search"
          type="text"
          placeholder="Buscar alumno..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-[#1a56a0] focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300"
        />
      </div>
      <div class="flex items-center gap-2 ml-auto">
        <span class="text-xs text-slate-400 font-medium">Vista:</span>
        <button
          @click="viewMode = 'table'"
          :class="['p-2 rounded-lg border cursor-pointer transition-all', viewMode === 'table' ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300']"
        >
          <i class="pi pi-table text-sm" />
        </button>
        <button
          @click="viewMode = 'grid'"
          :class="['p-2 rounded-lg border cursor-pointer transition-all', viewMode === 'grid' ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300']"
        >
          <i class="pi pi-th-large text-sm" />
        </button>
      </div>
    </div>

    <!-- ── Loading ─────────────────────────────── -->
    <div v-if="store.loading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-3">
        <svg class="animate-spin w-8 h-8 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <span class="text-sm text-slate-400 font-medium">Cargando alumnos...</span>
      </div>
    </div>

    <!-- ── Empty state ─────────────────────────── -->
    <div v-else-if="filteredStudents.length === 0" class="card card-padding flex flex-col items-center justify-center py-16 text-center">
      <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl mb-4 text-slate-400">
        <i class="pi pi-user" />
      </div>
      <p class="text-slate-700 font-bold text-base mb-1">
        {{ search ? 'Sin resultados' : 'No hay alumnos registrados' }}
      </p>
      <p class="text-slate-400 text-sm mb-5">
        {{ search ? `No se encontró "${search}"` : 'Agrega el primer alumno para este grado' }}
      </p>
      <button
        v-if="!search"
        @click="openCreateDialog"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e3a5f] text-white text-sm font-bold border-none cursor-pointer hover:bg-[#1a56a0] transition-all"
      >
        <i class="pi pi-plus" /> Agregar Alumno
      </button>
    </div>

    <!-- ── TABLE view ──────────────────────────── -->
    <div v-else-if="viewMode === 'table'" class="card overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-[#1e3a5f]">
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider w-10">#</th>
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">Alumno</th>
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">DNI</th>
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">Grado</th>
            <th class="px-5 py-3.5 text-left text-[11px] font-bold text-slate-300 uppercase tracking-wider">Fecha Registro</th>
            <th class="px-5 py-3.5 text-center text-[11px] font-bold text-slate-300 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in filteredStudents"
            :key="student.id"
            class="border-b border-slate-100 hover:bg-slate-50 transition-colors group"
          >
            <td class="px-5 py-3.5 text-xs text-slate-400 font-semibold">
              {{ String(index + 1).padStart(2, '0') }}
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {{ store.getInitials(student) }}
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900 leading-tight">{{ store.getFullName(student) }}</p>
                  <p class="text-xs text-slate-400 mt-0.5">{{ student.name }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <span class="text-sm font-mono text-slate-600">{{ student.dni }}</span>
            </td>
            <td class="px-5 py-3.5">
              <span class="badge bg-blue-50 text-blue-700">
                {{ gradeLabel(student.gradeId) }}
              </span>
            </td>
            <td class="px-5 py-3.5 text-sm text-slate-500">
              {{ formatDate(student.createdAt) }}
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="openEditDialog(student)"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-[#1a56a0] hover:bg-blue-50 border-none bg-transparent cursor-pointer transition-all"
                  title="Editar"
                >
                  <i class="pi pi-pencil text-sm" />
                </button>
                <button
                  @click="confirmDelete(student)"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 border-none bg-transparent cursor-pointer transition-all"
                  title="Eliminar"
                >
                  <i class="pi pi-trash text-sm" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Table footer -->
      <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs text-slate-400">
          Mostrando <strong class="text-slate-600">{{ filteredStudents.length }}</strong> alumnos
        </span>
        <span class="text-xs text-slate-400">
          {{ selectedGrade?.level }} — Sección {{ selectedGrade?.section }}
        </span>
      </div>
    </div>

    <!-- ── GRID view ───────────────────────────── -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="card card-padding flex flex-col items-center text-center group hover:shadow-md transition-all"
      >
        <div class="w-14 h-14 rounded-2xl bg-[#1e3a5f] flex items-center justify-center text-white text-lg font-black mb-3">
          {{ store.getInitials(student) }}
        </div>
        <p class="text-sm font-bold text-slate-900 leading-tight">{{ student.lastName }}</p>
        <p class="text-xs text-slate-500 mt-0.5 mb-1">{{ student.name }}</p>
        <span class="badge bg-blue-50 text-blue-700 mb-3">{{ gradeLabel(student.gradeId) }}</span>
        <p class="text-xs font-mono text-slate-400 mb-4">{{ student.dni }}</p>
        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            @click="openEditDialog(student)"
            class="p-1.5 rounded-lg text-slate-400 hover:text-[#1a56a0] hover:bg-blue-50 border border-slate-200 bg-white cursor-pointer transition-all"
          >
            <i class="pi pi-pencil text-xs" />
          </button>
          <button
            @click="confirmDelete(student)"
            class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 bg-white cursor-pointer transition-all"
          >
            <i class="pi pi-trash text-xs" />
          </button>
        </div>
      </div>
    </div>

    <!-- ── DIALOG: Crear / Editar ──────────────── -->
    <div
      v-if="showDialog"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeDialog"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        <!-- Header -->
        <div class="bg-[#0f1e35] px-6 py-5 flex items-center justify-between">
          <div>
            <h3 class="text-white font-bold text-base">
              {{ isEditing ? 'Editar Alumno' : 'Nuevo Alumno' }}
            </h3>
            <p class="text-slate-400 text-xs mt-0.5">
              {{ isEditing ? 'Modifica los datos del alumno' : 'Completa los datos para registrar' }}
            </p>
          </div>
          <button @click="closeDialog" class="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer transition-colors">
            <i class="pi pi-times text-lg" />
          </button>
        </div>

        <!-- Form -->
        <div class="px-6 py-6 space-y-4">

          <!-- Nombre -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nombres</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Ej: Ana María"
                :class="inputClass(!!formErrors.name)"
                @input="formErrors.name = ''"
              />
              <p v-if="formErrors.name" class="text-red-500 text-xs mt-1">{{ formErrors.name }}</p>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Apellidos</label>
              <input
                v-model="form.lastName"
                type="text"
                placeholder="Ej: García López"
                :class="inputClass(!!formErrors.lastName)"
                @input="formErrors.lastName = ''"
              />
              <p v-if="formErrors.lastName" class="text-red-500 text-xs mt-1">{{ formErrors.lastName }}</p>
            </div>
          </div>

          <!-- DNI -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">DNI</label>
            <input
              v-model="form.dni"
              type="text"
              placeholder="8 dígitos"
              maxlength="8"
              :class="inputClass(!!formErrors.dni)"
              @input="formErrors.dni = ''"
            />
            <p v-if="formErrors.dni" class="text-red-500 text-xs mt-1">{{ formErrors.dni }}</p>
          </div>

          <!-- Grado -->
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Grado y Sección</label>
            <select
              v-model="form.gradeId"
              :class="inputClass(!!formErrors.gradeId)"
              @change="formErrors.gradeId = ''"
            >
              <option value="" disabled>Selecciona un grado</option>
              <option v-for="g in store.grades" :key="g.id" :value="g.id">
                {{ g.level }} — Sección {{ g.section }}
              </option>
            </select>
            <p v-if="formErrors.gradeId" class="text-red-500 text-xs mt-1">{{ formErrors.gradeId }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
          <button
            @click="closeDialog"
            class="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-all"
          >
            Cancelar
          </button>
          <button
            @click="handleSubmit"
            :disabled="submitting"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#1a56a0] text-white text-sm font-bold border-none cursor-pointer transition-all disabled:opacity-70"
          >
            <svg v-if="submitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <i v-else :class="isEditing ? 'pi pi-check' : 'pi pi-plus'" />
            {{ isEditing ? 'Guardar cambios' : 'Registrar alumno' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── DIALOG: Confirmar eliminación ──────── -->
    <div
      v-if="showDeleteDialog"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showDeleteDialog = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div class="px-6 py-6 text-center">
          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <i class="pi pi-exclamation-triangle text-red-500 text-2xl" />
          </div>
          <h3 class="text-slate-900 font-bold text-base mb-2">¿Eliminar alumno?</h3>
          <p class="text-slate-500 text-sm">
            Se eliminará a <strong>{{ studentToDelete ? store.getFullName(studentToDelete) : '' }}</strong>.
            Esta acción no se puede deshacer.
          </p>
        </div>
        <div class="px-6 pb-6 flex gap-3">
          <button
            @click="showDeleteDialog = false"
            class="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-all"
          >
            Cancelar
          </button>
          <button
            @click="handleDelete"
            :disabled="submitting"
            class="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold border-none cursor-pointer transition-all disabled:opacity-70"
          >
            {{ submitting ? 'Eliminando...' : 'Sí, eliminar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Toast success ───────────────────────── -->
    <transition name="toast">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 flex items-center gap-3 bg-[#0f1e35] text-white px-5 py-3.5 rounded-xl shadow-2xl z-[100] min-w-[280px]"
      >
        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
          <i :class="toast.type === 'success' ? 'pi pi-check' : 'pi pi-times'" class="text-xs" />
        </div>
        <div>
          <p class="text-sm font-bold">{{ toast.title }}</p>
          <p class="text-xs text-slate-400 mt-0.5">{{ toast.message }}</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useStudentStore } from '@/stores/student.store'
import type { Student } from '@/types'
import dayjs from 'dayjs'

const store = useStudentStore()

// ── State ──────────────────────────────────────
const selectedGradeId = ref<string>(store.grades[2]?.id ?? store.grades[0]?.id ?? '')
const search          = ref('')
const viewMode        = ref<'table' | 'grid'>('table')
const showDialog      = ref(false)
const showDeleteDialog = ref(false)
const submitting      = ref(false)
const isEditing       = ref(false)
const editingId       = ref<string | null>(null)
const studentToDelete = ref<Student | null>(null)

const toast = reactive({ show: false, type: 'success', title: '', message: '' })

const form = reactive({ name: '', lastName: '', dni: '', gradeId: '' })
const formErrors = reactive({ name: '', lastName: '', dni: '', gradeId: '' })

// ── Computed ───────────────────────────────────
const selectedGrade = computed(() =>
  store.grades.find(g => g.id === selectedGradeId.value)
)

const filteredStudents = computed(() => {
  const base = store.getByGrade(selectedGradeId.value)
  if (!search.value.trim()) return base
  const q = search.value.toLowerCase()
  return base.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.lastName.toLowerCase().includes(q) ||
    s.dni.includes(q)
  )
})

// ── Helpers ────────────────────────────────────
function gradeLabel(gradeId: string): string {
  const g = store.grades.find(g => g.id === gradeId)
  return g ? `${g.level} ${g.section}` : ''
}

function formatDate(iso: string): string {
  return dayjs(iso).format('DD/MM/YYYY')
}

function inputClass(hasError: boolean): string {
  return [
    'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all',
    'bg-white placeholder:text-slate-300',
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 focus:border-[#1a56a0] focus:ring-2 focus:ring-blue-100',
  ].join(' ')
}

function showToast(type: 'success' | 'error', title: string, message: string) {
  toast.type    = type
  toast.title   = title
  toast.message = message
  toast.show    = true
  setTimeout(() => (toast.show = false), 3000)
}

// ── Dialog handlers ────────────────────────────
function openCreateDialog() {
  isEditing.value = false
  editingId.value = null
  form.name       = ''
  form.lastName   = ''
  form.dni        = ''
  form.gradeId    = selectedGradeId.value
  formErrors.name = formErrors.lastName = formErrors.dni = formErrors.gradeId = ''
  showDialog.value = true
}

function openEditDialog(student: Student) {
  isEditing.value  = true
  editingId.value  = student.id
  form.name        = student.name
  form.lastName    = student.lastName
  form.dni         = student.dni
  form.gradeId     = student.gradeId
  formErrors.name = formErrors.lastName = formErrors.dni = formErrors.gradeId = ''
  showDialog.value = true
}

function closeDialog() {
  showDialog.value = false
}

function confirmDelete(student: Student) {
  studentToDelete.value  = student
  showDeleteDialog.value = true
}

function openImportDialog() {
  showToast('success', 'Próximamente', 'La importación de archivos estará disponible pronto.')
}

// ── Validation ─────────────────────────────────
function validate(): boolean {
  formErrors.name     = form.name.trim()     ? '' : 'El nombre es obligatorio'
  formErrors.lastName = form.lastName.trim() ? '' : 'El apellido es obligatorio'
  formErrors.gradeId  = form.gradeId         ? '' : 'Selecciona un grado'

  if (!form.dni.trim()) {
    formErrors.dni = 'El DNI es obligatorio'
  } else if (!/^\d{8}$/.test(form.dni)) {
    formErrors.dni = 'El DNI debe tener 8 dígitos'
  } else {
    formErrors.dni = ''
  }

  return !formErrors.name && !formErrors.lastName && !formErrors.dni && !formErrors.gradeId
}

// ── Submit ─────────────────────────────────────
async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  try {
    if (isEditing.value && editingId.value) {
      await store.update(editingId.value, { name: form.name, lastName: form.lastName, dni: form.dni, gradeId: form.gradeId })
      showToast('success', 'Alumno actualizado', `${form.lastName}, ${form.name} fue actualizado correctamente.`)
    } else {
      await store.create({ name: form.name, lastName: form.lastName, dni: form.dni, gradeId: form.gradeId })
      showToast('success', 'Alumno registrado', `${form.lastName}, ${form.name} fue registrado correctamente.`)
    }
    closeDialog()
  } catch {
    showToast('error', 'Error', 'No se pudo guardar el alumno. Intenta de nuevo.')
  } finally {
    submitting.value = false
  }
}

async function handleDelete() {
  if (!studentToDelete.value) return
  submitting.value = true
  try {
    const name = store.getFullName(studentToDelete.value)
    await store.remove(studentToDelete.value.id)
    showDeleteDialog.value = false
    showToast('success', 'Alumno eliminado', `${name} fue eliminado del registro.`)
  } catch {
    showToast('error', 'Error', 'No se pudo eliminar el alumno.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to       { opacity: 0; transform: translateY(16px); }
</style>