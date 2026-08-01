<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      
      <!-- ── Animated 404 illustration ──────────────────── -->
      <div class="mb-8 relative h-48 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
        
        <div class="relative">
          <!-- Floating background shapes -->
          <div class="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-blue-400/10 animate-pulse" />
          <div class="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-purple-400/10 animate-pulse animation-delay-1000" />
          
          <!-- Main 404 text -->
          <div class="relative">
            <div class="text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-2">
              404
            </div>
            <div class="flex items-center justify-center gap-2 animate-bounce animation-delay-500">
              <span class="w-3 h-3 rounded-full bg-blue-600 animate-bounce" />
              <span class="w-3 h-3 rounded-full bg-purple-600 animate-bounce animation-delay-200" />
              <span class="w-3 h-3 rounded-full bg-pink-600 animate-bounce animation-delay-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- ── Content ─────────────────────────────────── -->
      <div class="mb-8">
        <h1 class="text-3xl font-black text-slate-900 mb-3">
          Página no encontrada
        </h1>
        <p class="text-slate-600 text-sm leading-relaxed">
          Parece que la página que buscas no existe o ha sido movida. No te preocupes, aquí te ayudamos a volver al camino correcto.
        </p>
      </div>

      <!-- ── Helpful suggestions ──────────────────────── -->
      <div class="mb-8 space-y-3">
        <div class="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <i class="pi pi-check-circle text-blue-600 text-xl mt-0.5 shrink-0" />
          <div class="text-left">
            <p class="text-xs font-bold text-blue-900">Verifica la URL</p>
            <p class="text-xs text-blue-700 mt-0.5">Asegúrate de que la dirección sea correcta</p>
          </div>
        </div>

        <div class="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-200">
          <i class="pi pi-shield text-purple-600 text-xl mt-0.5 shrink-0" />
          <div class="text-left">
            <p class="text-xs font-bold text-purple-900">Verifica permisos</p>
            <p class="text-xs text-purple-700 mt-0.5">Es posible que no tengas acceso a esta sección</p>
          </div>
        </div>

        <div class="flex items-start gap-3 p-4 rounded-xl bg-pink-50 border border-pink-200">
          <i class="pi pi-info-circle text-pink-600 text-xl mt-0.5 shrink-0" />
          <div class="text-left">
            <p class="text-xs font-bold text-pink-900">Recursos disponibles</p>
            <p class="text-xs text-pink-700 mt-0.5">Navega usando el menú lateral</p>
          </div>
        </div>
      </div>

      <!-- ── Action buttons ──────────────────────────── -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <router-link
          to="/"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-bold transition-all shadow-sm"
        >
          <i class="pi pi-arrow-left text-sm" />
          Volver al Inicio
        </router-link>

        <button
          @click="$router.back()"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 text-sm font-bold transition-all cursor-pointer bg-white"
        >
          <i class="pi pi-arrow-circle-left text-sm" />
          Atrás
        </button>
      </div>

      <!-- ── Footer help ──────────────────────────────── -->
      <div class="mt-8 pt-6 border-t border-slate-200">
        <p class="text-xs text-slate-500 mb-4">¿Necesitas ayuda?</p>
        <div class="flex items-center justify-center gap-4">
          <button class="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-all cursor-pointer">
            <i class="pi pi-envelope text-sm" />
            Contactar Soporte
          </button>
          <button class="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-all cursor-pointer">
            <i class="pi pi-question-circle text-sm" />
            FAQs
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const $router = useRouter()
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
</style>
