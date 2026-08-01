import type { ScheduleSlot, Activity } from '@/types'

export const MOCK_SCHEDULE: ScheduleSlot[] = [
  // Lunes
  { id: 'sl-01', day: 'LUNES',     startTime: '07:30', endTime: '08:20', courseId: 'c-1', course: { id: 'c-1', name: 'Matemática',   gradeId: 'grade-3', color: '#1e3a5f' }, gradeId: 'grade-3', grade: { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-02', day: 'LUNES',     startTime: '08:20', endTime: '09:10', courseId: 'c-2', course: { id: 'c-2', name: 'Comunicación',  gradeId: 'grade-3', color: '#1a56a0' }, gradeId: 'grade-3', grade: { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-03', day: 'LUNES',     startTime: '09:20', endTime: '10:10', courseId: 'c-3', course: { id: 'c-3', name: 'Ciencias',      gradeId: 'grade-4', color: '#0e7490' }, gradeId: 'grade-4', grade: { id: 'grade-4', level: '4° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-04', day: 'LUNES',     startTime: '10:10', endTime: '11:00', courseId: 'c-4', course: { id: 'c-4', name: 'Historia',      gradeId: 'grade-5', color: '#374151' }, gradeId: 'grade-5', grade: { id: 'grade-5', level: '5° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },

  // Martes
  { id: 'sl-05', day: 'MARTES',    startTime: '07:30', endTime: '08:20', courseId: 'c-5', course: { id: 'c-5', name: 'Inglés',        gradeId: 'grade-3', color: '#1e3a5f' }, gradeId: 'grade-3', grade: { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-06', day: 'MARTES',    startTime: '08:20', endTime: '09:10', courseId: 'c-6', course: { id: 'c-6', name: 'Arte',          gradeId: 'grade-2', color: '#1a56a0' }, gradeId: 'grade-2', grade: { id: 'grade-2', level: '2° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-07', day: 'MARTES',    startTime: '09:20', endTime: '10:10', courseId: 'c-1', course: { id: 'c-1', name: 'Matemática',   gradeId: 'grade-5', color: '#0e7490' }, gradeId: 'grade-5', grade: { id: 'grade-5', level: '5° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },

  // Miércoles
  { id: 'sl-08', day: 'MIERCOLES', startTime: '07:30', endTime: '08:20', courseId: 'c-7', course: { id: 'c-7', name: 'Ed. Física',   gradeId: 'grade-3', color: '#1e3a5f' }, gradeId: 'grade-3', grade: { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-09', day: 'MIERCOLES', startTime: '08:20', endTime: '09:10', courseId: 'c-8', course: { id: 'c-8', name: 'Religión',     gradeId: 'grade-3', color: '#1a56a0' }, gradeId: 'grade-3', grade: { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-10', day: 'MIERCOLES', startTime: '09:20', endTime: '10:10', courseId: 'c-2', course: { id: 'c-2', name: 'Comunicación', gradeId: 'grade-5', color: '#0e7490' }, gradeId: 'grade-5', grade: { id: 'grade-5', level: '5° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-11', day: 'MIERCOLES', startTime: '10:10', endTime: '11:00', courseId: 'c-4', course: { id: 'c-4', name: 'Historia',     gradeId: 'grade-4', color: '#374151' }, gradeId: 'grade-4', grade: { id: 'grade-4', level: '4° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },

  // Jueves
  { id: 'sl-12', day: 'JUEVES',    startTime: '07:30', endTime: '08:20', courseId: 'c-1', course: { id: 'c-1', name: 'Matemática',   gradeId: 'grade-4', color: '#1e3a5f' }, gradeId: 'grade-4', grade: { id: 'grade-4', level: '4° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-13', day: 'JUEVES',    startTime: '08:20', endTime: '09:10', courseId: 'c-3', course: { id: 'c-3', name: 'Ciencias',     gradeId: 'grade-3', color: '#1a56a0' }, gradeId: 'grade-3', grade: { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },

  // Viernes
  { id: 'sl-14', day: 'VIERNES',   startTime: '07:30', endTime: '08:20', courseId: 'c-2', course: { id: 'c-2', name: 'Comunicación', gradeId: 'grade-4', color: '#1e3a5f' }, gradeId: 'grade-4', grade: { id: 'grade-4', level: '4° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-15', day: 'VIERNES',   startTime: '08:20', endTime: '09:10', courseId: 'c-6', course: { id: 'c-6', name: 'Arte',         gradeId: 'grade-3', color: '#1a56a0' }, gradeId: 'grade-3', grade: { id: 'grade-3', level: '3° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
  { id: 'sl-16', day: 'VIERNES',   startTime: '09:20', endTime: '10:10', courseId: 'c-5', course: { id: 'c-5', name: 'Inglés',       gradeId: 'grade-5', color: '#0e7490' }, gradeId: 'grade-5', grade: { id: 'grade-5', level: '5° Primaria', section: 'A', schoolId: 'school-1', teacherId: '2' } },
]

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a-1', title: 'Examen Matemática – 3° Primaria',       date: '2025-03-05', type: 'EXAM',     gradeId: 'grade-3' },
  { id: 'a-2', title: 'Entrega Libreta – Todos los grados',    date: '2025-03-08', type: 'DELIVERY'                     },
  { id: 'a-3', title: 'Práctica Comunicación – 4° Primaria',   date: '2025-03-10', type: 'PRACTICE', gradeId: 'grade-4' },
  { id: 'a-4', title: 'Día del Logro – Institución',           date: '2025-03-15', type: 'EVENT'                        },
  { id: 'a-5', title: 'Examen Historia – 5° Primaria',         date: '2025-03-18', type: 'EXAM',     gradeId: 'grade-5' },
  { id: 'a-6', title: 'Práctica de Ciencias – 3° Primaria',    date: '2025-03-20', type: 'PRACTICE', gradeId: 'grade-3' },
]

export const MOCK_STATS = {
  totalStudents: 127,
  totalCourses:  8,
  generalAverage: 15.8,
  attendanceRate: 94,
  approvedRate:   87,
  gradeStats: [
    { grade: '1° P', students: 18, average: 15.2 },
    { grade: '2° P', students: 22, average: 16.1 },
    { grade: '3° P', students: 25, average: 15.8 },
    { grade: '4° P', students: 24, average: 14.9 },
    { grade: '5° P', students: 20, average: 16.3 },
    { grade: '6° P', students: 18, average: 15.5 },
  ],
}