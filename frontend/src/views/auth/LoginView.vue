<template>
  <div class="min-h-screen w-full bg-[#020617] flex flex-col items-center justify-center p-4 relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]"></div>
    </div>

    <div class="flex flex-col items-center w-full max-w-md mb-8 text-center relative z-10 animate-fade-down">
      <div class="flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 shadow-xl shadow-blue-900/20 mb-6">
        <i class="pi pi-book text-4xl text-white"></i>
      </div>
      <h1 class="text-4xl font-black text-white tracking-tight">EduNotas</h1>
      <p class="text-slate-400 text-sm font-medium mt-2">Portal de Gestión Docente</p>
    </div>

    <div class="w-full max-w-110 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10 animate-fade-up">
      <div class="p-10">
        <div v-if="showSuccessMessage" class="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 animate-fade-in">
          <i class="pi pi-check-circle text-emerald-500 text-xl"></i>
          <div>
            <p class="text-emerald-900 text-xs font-bold">¡Cuenta creada con éxito!</p>
            <p class="text-emerald-700 text-[10px]">Ya puedes iniciar sesión con tus credenciales.</p>
          </div>
        </div>

        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-slate-900">{{ isLogin ? 'Bienvenido de nuevo' : 'Crear cuenta docente' }}</h2>
          <p class="text-slate-500 text-sm mt-2 leading-relaxed">
            {{ isLogin ? 'Ingresa tus credenciales para gestionar tus notas' : 'Regístrate para comenzar a usar el sistema' }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div v-if="!isLogin" class="flex flex-col gap-2">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
            <div class="relative flex items-center">
              <i class="pi pi-user absolute left-4 text-slate-300"></i>
              <input v-model="form.name" type="text" placeholder="Ej. María García" 
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
            <div class="relative flex items-center">
              <i class="pi pi-envelope absolute left-4 text-slate-300"></i>
              <input v-model="form.email" type="email" placeholder="profesora@colegio.edu.pe" 
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center px-1">
              <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Contraseña</label>
              <a v-if="isLogin" href="#" class="text-[11px] font-bold text-blue-600 hover:underline">¿Olvidaste tu acceso?</a>
            </div>
            <div class="relative flex items-center">
              <i class="pi pi-lock absolute left-4 text-slate-300"></i>
              <input v-model="form.password" type="password" placeholder="••••••••" 
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all" />
            </div>
            <p v-if="!isLogin && form.password && !isPasswordValid" class="text-[10px] text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">
              <i class="pi pi-exclamation-circle"></i> Mínimo 8 caracteres, una letra y un número.
            </p>
          </div>

          <button type="submit" :disabled="!isFormValid || isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4">
            <i v-if="isLoading" class="pi pi-spin pi-spinner"></i>
            <i v-else :class="isLogin ? 'pi pi-sign-in' : 'pi pi-user-plus'"></i>
            <span>{{ buttonText }}</span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-slate-500">
            {{ isLogin ? '¿Aún no tienes cuenta?' : '¿Ya eres usuario?' }}
            <button @click="toggleMode" class="text-blue-600 font-bold hover:underline ml-1 bg-transparent border-none p-0 cursor-pointer">
              {{ isLogin ? 'Regístrate aquí' : 'Inicia sesión' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { MOCK_USERS } from '@/mocks/auth.mock'

const isLogin = ref(true)
const isLoading = ref(false)
const showSuccessMessage = ref(false)
const form = reactive({ name: '', email: '', password: '' })

const isPasswordValid = computed(() => {
  const p = form.password
  return p.length >= 8 && /\d/.test(p) && /[a-zA-Z]/.test(p)
})

const isFormValid = computed(() => {
  if (isLogin.value) return form.email.includes('@') && form.password.length > 0
  return form.name.length > 2 && form.email.includes('@') && isPasswordValid.value
})

const buttonText = computed(() => {
  if (isLoading.value) return isLogin.value ? 'Iniciando sesión...' : 'Procesando registro...'
  return isLogin.value ? 'Ingresar al Sistema' : 'Finalizar Registro'
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  showSuccessMessage.value = false
  form.password = ''
}

const handleSubmit = async () => {
  if (!isFormValid.value || isLoading.value) return
  isLoading.value = true
  setTimeout(() => {
    if (isLogin.value) {
      const user = MOCK_USERS.find(u => u.email === form.email && u.password === form.password)
      if (user) console.log('Correcto')
      else alert('Credenciales no válidas')
    } else {
      showSuccessMessage.value = true
      isLogin.value = true
    }
    isLoading.value = false
  }, 1500)
}
</script>

<style scoped>
@keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-down { animation: fadeDown 0.6s ease-out forwards; }
.animate-fade-up { animation: fadeUp 0.6s ease-out 0.2s forwards; opacity: 0; }
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
</style>