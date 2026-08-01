import type { Student, Grade } from '@/types'

export const MOCK_GRADES: Grade[] = [
  { id: 'grade-1', level: '1° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' },
  { id: 'grade-2', level: '2° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' },
  { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' },
  { id: 'grade-4', level: '4° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' },
  { id: 'grade-5', level: '5° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' },
  { id: 'grade-6', level: '6° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' },
]

export const MOCK_STUDENTS: Student[] = [
  // 3° Primaria
  { id: 's-01', name: 'Ana',       lastName: 'García López',     dni: '12345678', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-02', name: 'Carlos',    lastName: 'Mendoza Ríos',     dni: '23456789', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-03', name: 'Lucía',     lastName: 'Torres Vega',      dni: '34567890', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-04', name: 'Diego',     lastName: 'Ramírez Soto',     dni: '45678901', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-05', name: 'Valentina', lastName: 'Cruz Mora',        dni: '56789012', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-06', name: 'Sebastián', lastName: 'Flores Huanca',    dni: '67890123', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-07', name: 'Camila',    lastName: 'Quispe Mamani',    dni: '78901234', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-08', name: 'Mateo',     lastName: 'Vargas Paredes',   dni: '89012345', gradeId: 'grade-3', createdAt: '2025-01-10T00:00:00Z' },

  // 4° Primaria
  { id: 's-09', name: 'Sofía',     lastName: 'Herrera Lazo',     dni: '90123456', gradeId: 'grade-4', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-10', name: 'Nicolás',   lastName: 'Castillo Pérez',   dni: '01234567', gradeId: 'grade-4', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-11', name: 'Isabella',  lastName: 'Morales Chávez',   dni: '11234567', gradeId: 'grade-4', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-12', name: 'Rodrigo',   lastName: 'Salinas Torres',   dni: '22345678', gradeId: 'grade-4', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-13', name: 'Valeria',   lastName: 'Núñez Cárdenas',   dni: '33456789', gradeId: 'grade-4', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-14', name: 'Alejandro', lastName: 'Díaz Ríos',        dni: '44567890', gradeId: 'grade-4', createdAt: '2025-01-10T00:00:00Z' },

  // 5° Primaria
  { id: 's-15', name: 'Gabriela',  lastName: 'Ramos Huerta',     dni: '55678901', gradeId: 'grade-5', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-16', name: 'Fernando',  lastName: 'Ortiz Salazar',    dni: '66789012', gradeId: 'grade-5', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-17', name: 'Mariana',   lastName: 'Vega Condori',     dni: '77890123', gradeId: 'grade-5', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-18', name: 'Tomás',     lastName: 'Gutiérrez Luna',   dni: '88901234', gradeId: 'grade-5', createdAt: '2025-01-10T00:00:00Z' },

  // 6° Primaria
  { id: 's-19', name: 'Paula',     lastName: 'Jiménez Bravo',    dni: '99012345', gradeId: 'grade-6', createdAt: '2025-01-10T00:00:00Z' },
  { id: 's-20', name: 'Andrés',    lastName: 'Mendez Ccallo',    dni: '10123456', gradeId: 'grade-6', createdAt: '2025-01-10T00:00:00Z' },
]