<template>
  <div class="space-y-6">
    
    <!-- ── Page header ─────────────────────────── -->
    <div class="section-header">
      <div>
        <h1 class="page-title">Libreta de Notas</h1>
        <p class="page-subtitle">Registro académico de estudiantes por período bimestral</p>
      </div>
      <button
        @click="exportToExcel"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-all cursor-pointer border-none shadow-sm"
      >
        <i class="pi pi-download text-sm" />
        Exportar
      </button>
    </div>

    <!-- ── Filters ──────────────────────────── -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-2">Grado</label>
        <select
          v-model="filters.grade"
          class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Todos los grados</option>
          <option value="1">Primero</option>
          <option value="2">Segundo</option>
          <option value="3">Tercero</option>
          <option value="4">Cuarto</option>
          <option value="5">Quinto</option>
          <option value="6">Sexto</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-2">Sección</label>
        <select
          v-model="filters.section"
          class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Todas las secciones</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-2">Período</label>
        <select
          v-model="filters.period"
          class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Todos los períodos</option>
          <option value="I">I Bimestre</option>
          <option value="II">II Bimestre</option>
          <option value="III">III Bimestre</option>
          <option value="IV">IV Bimestre</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-2">Buscar</label>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Nombre del alumno..."
            class="w-full px-3.5 py-2.5 pl-10 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        </div>
      </div>
    </div>

    <!-- ── Stats summary ────────────────────────── -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card card-padding border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-black text-slate-900">324</p>
            <p class="text-xs text-slate-500 font-medium mt-1">Estudiantes Activos</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <i class="pi pi-users text-blue-600 text-xl" />
          </div>
        </div>
      </div>

      <div class="card card-padding border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-black text-slate-900">15.8</p>
            <p class="text-xs text-slate-500 font-medium mt-1">Promedio General</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <i class="pi pi-chart-bar text-green-600 text-xl" />
          </div>
        </div>
      </div>

      <div class="card card-padding border-l-4 border-orange-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-black text-slate-900">28</p>
            <p class="text-xs text-slate-500 font-medium mt-1">Estudiantes Rezagados</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <i class="pi pi-exclamation-circle text-orange-600 text-xl" />
          </div>
        </div>
      </div>

      <div class="card card-padding border-l-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-black text-slate-900">8</p>
            <p class="text-xs text-slate-500 font-medium mt-1">No Califican</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <i class="pi pi-times-circle text-red-600 text-xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- ── Grades Table ──────────────────────────– -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Alumno</th>
              <th class="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Grado</th>
              <th class="px-6 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">I Bim</th>
              <th class="px-6 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">II Bim</th>
              <th class="px-6 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">III Bim</th>
              <th class="px-6 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">IV Bim</th>
              <th class="px-6 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">Promedio</th>
              <th class="px-6 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="i in 8" :key="i" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {{ String.fromCharCode(64 + i) }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">Estudiante {{ i }}</p>
                    <p class="text-xs text-slate-500">{{ 10000000 + i }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold">4° - A</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span :class="[
                  'inline-flex px-3 py-1 rounded-lg font-bold text-xs',
                  i % 3 === 0 ? 'bg-red-100 text-red-700' : i % 2 === 0 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                ]">
                  {{ i % 3 === 0 ? '10' : i % 2 === 0 ? '13' : '16' }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span :class="[
                  'inline-flex px-3 py-1 rounded-lg font-bold text-xs',
                  i % 3 === 1 ? 'bg-red-100 text-red-700' : i % 2 === 1 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                ]">
                  {{ i % 3 === 1 ? '11' : i % 2 === 1 ? '14' : '17' }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex px-3 py-1 rounded-lg bg-green-100 text-green-700 font-bold text-xs">
                  {{ 14 + i }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex px-3 py-1 rounded-lg bg-green-100 text-green-700 font-bold text-xs">
                  {{ 15 + i }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <p class="text-sm font-black text-slate-900">{{ (14 + 13 + i + 14 + 15) / 5 | 0 }}.5</p>
              </td>
              <td class="px-6 py-4 text-center">
                <span v-if="i % 4 === 0" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold">
                  <i class="pi pi-times text-xs" /> Desaprobado
                </span>
                <span v-else-if="i % 3 === 0" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">
                  <i class="pi pi-exclamation-circle text-xs" /> En riesgo
                </span>
                <span v-else class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                  <i class="pi pi-check text-xs" /> Aprobado
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── Pagination ──────────────────────────── -->
    <div class="flex items-center justify-between">
      <p class="text-xs text-slate-600 font-medium">Mostrando 1-8 de 324 resultados</p>
      <div class="flex items-center gap-2">
        <button class="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer text-sm font-medium">
          <i class="pi pi-chevron-left text-xs" />
        </button>
        <button class="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
        <button class="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer text-sm font-medium">2</button>
        <button class="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer text-sm font-medium">3</button>
        <button class="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer text-sm font-medium">
          <i class="pi pi-chevron-right text-xs" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const filters = ref({
  grade: '',
  section: '',
  period: ''
})

const searchQuery = ref('')

const exportToExcel = () => {
  alert('Exportar a Excel (implementar con SheetJS o similar)')
}
</script>

<style scoped lang="postcss">
table {
  @apply border-collapse;
}

th, td {
  @apply whitespace-nowrap;
}
</style>
