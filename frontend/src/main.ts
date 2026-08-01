import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'

// Estilos globales
import './style.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import { cacheCleanupService } from '@/services/cacheCleanup.service'

const app = createApp(App)

// Pinia
app.use(createPinia())

// Router
app.use(router)

// PrimeVue — sin tema por defecto, usamos Tailwind para estilos base
app.use(PrimeVue, {
  unstyled: false,
  ripple: true,
  locale: {
    accept: 'Sí',
    reject: 'No',
    cancel: 'Cancelar',
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Limpiar',
  },
})

app.use(ToastService)
app.use(ConfirmationService)
app.directive('tooltip', Tooltip)

// Inicializar limpieza automática de cache (cada 5 minutos)
const { initialize } = cacheCleanupService()
initialize(5 * 60 * 1000)

app.mount('#app')