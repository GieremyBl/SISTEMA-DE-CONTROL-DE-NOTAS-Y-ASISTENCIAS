<template>
  <div class="space-y-6">
    
    <!-- ── Page header ─────────────────────────── -->
    <div class="section-header">
      <div>
        <h1 class="page-title">Configuración</h1>
        <p class="page-subtitle">Administra la configuración del sistema y tus preferencias</p>
      </div>
    </div>

    <!-- ── Settings Layout ──────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      <!-- ── Sidebar navigation ──────────────────– -->
      <div class="lg:col-span-1">
        <div class="card card-padding p-0 sticky top-20">
          <nav class="space-y-1 p-4">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="activeSection = section.id"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer',
                activeSection === section.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              ]"
            >
              <i :class="['text-base', section.icon]" />
              <span>{{ section.label }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- ── Content area ───────────────────────── -->
      <div class="lg:col-span-3 space-y-6">

        <!-- ── General Settings ──────────────────– -->
        <div v-show="activeSection === 'general'" class="card card-padding">
          <div class="mb-6">
            <h2 class="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <i class="pi pi-cog text-xl" /> Configuración General
            </h2>
            <p class="text-xs text-slate-500">Ajusta los parámetros principales del sistema</p>
          </div>

          <div class="space-y-5 divide-y divide-slate-200">
            <div class="pb-5">
              <label class="block text-sm font-bold text-slate-900 mb-2">Nombre de la Institución</label>
              <input
                type="text"
                value="Instituto Educativo Ejemplo"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <p class="text-xs text-slate-500 mt-2">El nombre será mostrado en encabezados y reportes</p>
            </div>

            <div class="pt-5 pb-5">
              <label class="block text-sm font-bold text-slate-900 mb-2">Región / UGEL</label>
              <input
                type="text"
                value="UGEL - Región Lima"
                class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div class="pt-5 pb-5">
              <label class="block text-sm font-bold text-slate-900 mb-2">Año Escolar</label>
              <select class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer">
                <option>2024</option>
                <option selected>2025</option>
                <option>2026</option>
              </select>
            </div>

            <div class="pt-5 pb-5">
              <label class="block text-sm font-bold text-slate-900 mb-2">Bimestre en curso</label>
              <select class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer">
                <option>I Bimestre</option>
                <option selected>II Bimestre</option>
                <option>III Bimestre</option>
                <option>IV Bimestre</option>
              </select>
            </div>

            <div class="pt-5">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked class="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-0" />
                <span class="text-sm font-bold text-slate-900">Habilitar modo de mantenimiento</span>
              </label>
              <p class="text-xs text-slate-500 mt-2">El sistema mostrará un mensaje de mantenimiento a los usuarios</p>
            </div>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <button class="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all cursor-pointer">
              <i class="pi pi-save mr-2 text-sm" />Guardar Cambios
            </button>
            <button class="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer">
              Cancelar
            </button>
          </div>
        </div>

        <!-- ── Security Settings ──────────────────– -->
        <div v-show="activeSection === 'security'" class="card card-padding">
          <div class="mb-6">
            <h2 class="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <i class="pi pi-shield text-xl" /> Seguridad
            </h2>
            <p class="text-xs text-slate-500">Administra contraseñas y niveles de acceso</p>
          </div>

          <div class="space-y-5 divide-y divide-slate-200">
            <div class="pb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-4">Cambiar Contraseña</h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-2">Contraseña Actual</label>
                  <input type="password" placeholder="••••••••" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-2">Nueva Contraseña</label>
                  <input type="password" placeholder="••••••••" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  <p class="text-xs text-slate-500 mt-2">Mínimo 8 caracteres, incluir números y símbolos</p>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-2">Confirmar Contraseña</label>
                  <input type="password" placeholder="••••••••" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div class="pt-5 pb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-4">Autenticación de Dos Factores</h3>
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p class="text-sm font-bold text-blue-900">Estado: <span class="text-green-600">Habilitado</span></p>
                  <p class="text-xs text-blue-700 mt-1">Tu cuenta está protegida con 2FA</p>
                </div>
                <button class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all cursor-pointer">
                  Configurar
                </button>
              </div>
            </div>

            <div class="pt-5 pb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-4">Sesiones Activas</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <i class="pi pi-desktop text-blue-600 text-sm" />
                    </div>
                    <div>
                      <p class="text-xs font-bold text-slate-900">Windows - Chrome</p>
                      <p class="text-xs text-slate-500">192.168.1.100 • Activo hace 2 minutos</p>
                    </div>
                  </div>
                  <span class="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold gap-1">
                    <span class="w-2 h-2 rounded-full bg-green-600" /> Actual
                  </span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <i class="pi pi-mobile text-purple-600 text-sm" />
                    </div>
                    <div>
                      <p class="text-xs font-bold text-slate-900">iPhone - Safari</p>
                      <p class="text-xs text-slate-500">203.0.113.50 • Activo hace 1 hora</p>
                    </div>
                  </div>
                  <button class="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition-all cursor-pointer">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <button class="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all cursor-pointer">
              <i class="pi pi-save mr-2 text-sm" />Guardar Cambios
            </button>
          </div>
        </div>

        <!-- ── Data & Privacy ────────────────────– -->
        <div v-show="activeSection === 'data'" class="card card-padding">
          <div class="mb-6">
            <h2 class="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <i class="pi pi-database text-xl" /> Datos y Privacidad
            </h2>
            <p class="text-xs text-slate-500">Gestiona tu información y privacidad</p>
          </div>

          <div class="space-y-5 divide-y divide-slate-200">
            <div class="pb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-4">Exportar Datos</h3>
              <p class="text-xs text-slate-600 mb-4">Descarga tus datos en formato compatible</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all cursor-pointer">
                  <i class="pi pi-download text-sm" />
                  Excel
                </button>
                <button class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all cursor-pointer">
                  <i class="pi pi-download text-sm" />
                  PDF
                </button>
                <button class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all cursor-pointer">
                  <i class="pi pi-download text-sm" />
                  JSON
                </button>
              </div>
            </div>

            <div class="pt-5 pb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-4">Preferencias de Privacidad</h3>
              <div class="space-y-3">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked class="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-0" />
                  <span class="text-sm font-medium text-slate-900">Permitir notificaciones por correo</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked class="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-0" />
                  <span class="text-sm font-medium text-slate-900">Permitir estadísticas anónimas</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" class="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-0" />
                  <span class="text-sm font-medium text-slate-900">Permitir cookies de rastreo</span>
                </label>
              </div>
            </div>

            <div class="pt-5 pb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-4">Zona de Peligro</h3>
              <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm font-bold text-red-900 mb-3">Eliminar cuenta permanentemente</p>
                <p class="text-xs text-red-700 mb-4">Esta acción es irreversible. Se eliminarán todos tus datos.</p>
                <button class="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all cursor-pointer">
                  <i class="pi pi-trash mr-2 text-sm" />Eliminar Mi Cuenta
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Notifications ─────────────────────– -->
        <div v-show="activeSection === 'notifications'" class="card card-padding">
          <div class="mb-6">
            <h2 class="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <i class="pi pi-bell text-xl" /> Notificaciones
            </h2>
            <p class="text-xs text-slate-500">Controla cómo y cuándo recibes notificaciones</p>
          </div>

          <div class="space-y-4">
            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-bold text-slate-900">Nuevas calificaciones</p>
                <p class="text-xs text-slate-600 mt-1">Notificación cuando se registren nuevas notas</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-bold text-slate-900">Aplicaciones y eventos</p>
                <p class="text-xs text-slate-600 mt-1">Recordatorios de eventos académicos</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-bold text-slate-900">Comunicados del sistema</p>
                <p class="text-xs text-slate-600 mt-1">Actualizaciones y mantenimiento del sistema</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-bold text-slate-900">Resumen semanal</p>
                <p class="text-xs text-slate-600 mt-1">Recibe un resumen de actividades cada domingo</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <button class="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all cursor-pointer">
              <i class="pi pi-save mr-2 text-sm" />Guardar Preferencias
            </button>
          </div>
        </div>

        <!-- ── About & Help ──────────────────────– -->
        <div v-show="activeSection === 'about'" class="card card-padding">
          <div class="mb-6">
            <h2 class="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <i class="pi pi-info-circle text-xl" /> Acerca de
            </h2>
            <p class="text-xs text-slate-500">Información del sistema y soporte</p>
          </div>

          <div class="space-y-5 divide-y divide-slate-200">
            <div class="pb-5">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-slate-600 font-medium">Versión del Sistema</p>
                  <p class="text-lg font-black text-slate-900 mt-1">3.2.1</p>
                </div>
                <div>
                  <p class="text-xs text-slate-600 font-medium">Fecha de Actualización</p>
                  <p class="text-lg font-black text-slate-900 mt-1">5 Mar, 2025</p>
                </div>
              </div>
            </div>

            <div class="pt-5 pb-5">
              <h3 class="text-sm font-bold text-slate-900 mb-3">Enlaces Útiles</h3>
              <div class="space-y-2">
                <a href="#" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  <i class="pi pi-book text-sm" />
                  Documentación
                </a>
                <a href="#" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  <i class="pi pi-video text-sm" />
                  Tutoriales en Video
                </a>
                <a href="#" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  <i class="pi pi-comments text-sm" />
                  Comunidad
                </a>
                <a href="#" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  <i class="pi pi-envelope text-sm" />
                  Contáctanos
                </a>
              </div>
            </div>

            <div class="pt-5">
              <h3 class="text-sm font-bold text-slate-900 mb-3">Información Legal</h3>
              <div class="space-y-2">
                <a href="#" class="text-slate-600 hover:text-slate-700 text-xs">Términos de Servicio</a>
                <a href="#" class="text-slate-600 hover:text-slate-700 text-xs block">Política de Privacidad</a>
                <a href="#" class="text-slate-600 hover:text-slate-700 text-xs block">Licencia de Software</a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeSection = ref('general')

const sections = [
  { id: 'general', label: 'General', icon: 'pi pi-cog' },
  { id: 'security', label: 'Seguridad', icon: 'pi pi-shield' },
  { id: 'data', label: 'Datos', icon: 'pi pi-database' },
  { id: 'notifications', label: 'Notificaciones', icon: 'pi pi-bell' },
  { id: 'about', label: 'Acerca de', icon: 'pi pi-info-circle' }
]
</script>
