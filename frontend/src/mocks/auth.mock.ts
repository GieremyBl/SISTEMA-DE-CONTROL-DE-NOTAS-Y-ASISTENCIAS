import type { User } from '@/types'

export interface MockCredential {
  email: string
  password: string
  user: User
}

export const MOCK_USERS: MockCredential[] = [
  {
    email: 'docente@edunotas.pe',
    password: 'docente123',
    user: {
      id: '2',
      name: 'María Rodríguez',
      email: 'docente@edunotas.pe',
      role: 'TEACHER', // Rol único según requerimiento
      schoolId: 'school-1',
      createdAt: '2025-01-01T00:00:00Z',
    },
  },
  {
    email: 'profesora.test@edunotas.pe',
    password: 'Password123', // Cumple con la validación de 8 caracteres + número
    user: {
      id: '3',
      name: 'Lucía Fernández',
      email: 'profesora.test@edunotas.pe',
      role: 'TEACHER',
      schoolId: 'school-1',
      createdAt: '2026-03-05T00:00:00Z',
    },
  },
]

export const MOCK_SCHOOL = {
  id: 'school-1',
  name: 'I.E. Nuestra Señora del Carmen',
  ugel: 'UGEL 01 – San Juan de Miraflores',
  address: 'Av. Pachacútec 1234, Villa El Salvador',
  createdAt: '2025-01-01T00:00:00Z',
}