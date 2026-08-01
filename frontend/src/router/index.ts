import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes: RouteRecordRaw[] = [
  // ── Auth ──────────────────────────────────────
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { requiresAuth: false, layout: 'auth' },
  },

  // ── App (protected) ───────────────────────────
  {
    path: '/',
    redirect: '/dashboard',
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, title: 'Dashboard' },
  },
  {
    path: '/alumnos',
    name: 'Students',
    component: () => import('@/views/StudentsView.vue'),
    meta: { requiresAuth: true, title: 'Alumnos' },
  },
  {
    path: '/notas',
    name: 'Grades',
    component: () => import('@/views/GradesView.vue'),
    meta: { requiresAuth: true, title: 'Registro de Notas' },
  },
  {
    path: '/asistencia',
    name: 'Attendance',
    component: () => import('@/views/AttendanceView.vue'),
    meta: { requiresAuth: true, title: 'Asistencia' },
  },
  {
    path: '/merito',
    name: 'Merit',
    component: () => import('@/views/MeritView.vue'),
    meta: { requiresAuth: true, title: 'Orden de Mérito' },
  },
  {
    path: '/libreta',
    name: 'Notebook',
    component: () => import('@/views/NotebookView.vue'),
    meta: { requiresAuth: true, title: 'Libreta de Notas' },
  },
  {
    path: '/configuracion',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { requiresAuth: true, title: 'Configuración', requiresAdmin: true },
  },

  // ── 404 ──────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// ── Navigation Guard ──────────────────────────────
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next({ name: 'Dashboard' })
  }

  if (to.name === 'Login' && auth.isAuthenticated) {
    return next({ name: 'Dashboard' })
  }

  next()
})

// ── Page title ────────────────────────────────────
router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} — EduNotas` : 'EduNotas'
})

export default router