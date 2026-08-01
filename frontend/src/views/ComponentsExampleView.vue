<template>
  <div class="space-y-6">
    <!-- Ejemplo BaseAlert -->
    <BaseAlert
      v-model="showAlert"
      type="success"
      title="¡Éxito!"
      message="Los datos se guardaron correctamente"
    />

    <!-- Ejemplo BaseCard con StatCards -->
    <BaseCard title="Estadísticas" subtitle="Información general del semestre">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          value="127"
          label="Total Alumnos"
          subtitle="4 secciones"
          icon="pi pi-users"
          iconBgColor="#3b82f6"
        />
        <StatCard
          value="8"
          label="Cursos Activos"
          subtitle="3° y 4° Primaria"
          icon="pi pi-book"
          iconBgColor="#1a56a0"
        />
        <StatCard
          value="15.8"
          label="Promedio General"
          subtitle="II Bimestre"
          icon="pi pi-chart-bar"
          iconBgColor="#10b981"
        />
        <StatCard
          value="94%"
          label="Asistencia"
          subtitle="Esta semana"
          icon="pi pi-check-circle"
          iconBgColor="#f59e0b"
        />
      </div>
    </BaseCard>

    <!-- Ejemplo BaseCard con Formulario -->
    <BaseCard title="Filtros" subtitle="Aplicar filtros a los datos">
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput
            v-model="searchTerm"
            type="text"
            label="Buscar"
            placeholder="Escribe para buscar..."
            help="Busca por nombre o código"
          />
          <BaseSelect
            v-model="selectedGrade"
            label="Grado"
            placeholder="Seleccionar grado"
            :options="gradeOptions"
          />
        </div>

        <div class="flex gap-3 pt-4 border-t border-slate-100">
          <BaseButton variant="primary" @click="handleFilter">
            <i class="pi pi-search" />
            Filtrar
          </BaseButton>
          <BaseButton variant="secondary" @click="handleReset">
            <i class="pi pi-refresh" />
            Limpiar
          </BaseButton>
        </div>
      </div>
    </BaseCard>

    <!-- Ejemplo BaseTable -->
    <BaseTable
      title="Listado de Estudiantes"
      :columns="tableColumns"
      :data="students"
    >
      <!-- Celda personalizada para nombre -->
      <template #cell-name="{ row }">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
            {{ row.initials }}
          </div>
          <span class="font-semibold text-slate-900">{{ row.name }}</span>
        </div>
      </template>

      <!-- Celda personalizada para estado -->
      <template #cell-status="{ row }">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-semibold',
          row.status === 'Activo'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        ]">
          {{ row.status }}
        </span>
      </template>

      <!-- Celda personalizada para acciones -->
      <template #cell-actions="{ row: _row }">
        <div class="flex gap-2">
          <button class="p-2 rounded-lg hover:bg-blue-50 text-blue-600 border-none bg-transparent cursor-pointer">
            <i class="pi pi-pencil text-base" />
          </button>
          <button class="p-2 rounded-lg hover:bg-red-50 text-red-600 border-none bg-transparent cursor-pointer">
            <i class="pi pi-trash text-base" />
          </button>
        </div>
      </template>
    </BaseTable>

    <!-- Ejemplo de botones -->
    <BaseCard title="Variantes de Botones">
      <div class="flex flex-wrap gap-3">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="success" icon="pi pi-check">Success</BaseButton>
        <BaseButton variant="danger" icon="pi pi-trash">Danger</BaseButton>
        <BaseButton variant="outline">Outline</BaseButton>
        <BaseButton size="sm">Small</BaseButton>
        <BaseButton size="lg">Large</BaseButton>
        <BaseButton disabled>Disabled</BaseButton>
        <BaseButton full>Full Width</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  BaseButton,
  BaseCard,
  BaseAlert,
  StatCard,
  BaseInput,
  BaseSelect,
  BaseTable,
} from '@/components'

// Estado
const showAlert = ref(false)
const searchTerm = ref('')
const selectedGrade = ref('')

// Opciones de select
const gradeOptions = [
  { id: '1', label: '1° Primaria' },
  { id: '2', label: '2° Primaria' },
  { id: '3', label: '3° Primaria' },
  { id: '4', label: '4° Primaria' },
  { id: '5', label: '5° Primaria' },
  { id: '6', label: '6° Primaria' },
]

// Columnas de tabla
const tableColumns = [
  { key: 'name', label: 'Nombre', width: '40%' },
  { key: 'code', label: 'Código', width: '20%' },
  { key: 'grade', label: 'Grado', width: '20%' },
  { key: 'status', label: 'Estado', width: '15%' },
  { key: 'actions', label: 'Acciones', width: '5%' },
]

// Datos de estudiantes (ejemplo)
const students = ref([
  {
    name: 'García López, Ana',
    code: '001',
    grade: '3° A',
    status: 'Activo',
    initials: 'GA',
  },
  {
    name: 'Mendoza Ríos, Carlos',
    code: '002',
    grade: '3° A',
    status: 'Activo',
    initials: 'MC',
  },
  {
    name: 'Torres Vega, Lucía',
    code: '003',
    grade: '3° B',
    status: 'Activo',
    initials: 'TV',
  },
  {
    name: 'Ramírez Soto, Diego',
    code: '004',
    grade: '3° A',
    status: 'Inactivo',
    initials: 'RS',
  },
])

// Funciones
function handleFilter() {
  showAlert.value = true
  console.log('Filtrando por:', { searchTerm: searchTerm.value, grade: selectedGrade.value })
}

function handleReset() {
  searchTerm.value = ''
  selectedGrade.value = ''
}
</script>
