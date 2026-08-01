import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Student } from '@/types'
import { MOCK_STUDENTS, MOCK_GRADES } from '@/mocks/students.mock'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const useStudentStore = defineStore('student', () => {
  const students = ref<Student[]>([...MOCK_STUDENTS])
  const grades   = ref(MOCK_GRADES)
  const loading  = ref(false)

  const getByGrade = computed(() => (gradeId: string) =>
    students.value.filter(s => s.gradeId === gradeId)
  )

  const getFullName = (s: Student) => `${s.lastName}, ${s.name}`
  const getInitials = (s: Student) => `${s.name[0]}${s.lastName[0]}`.toUpperCase()

  async function create(payload: Omit<Student, 'id' | 'createdAt'>): Promise<Student> {
    loading.value = true
    await delay(500)
    const newStudent: Student = { ...payload, id: `s-${Date.now()}`, createdAt: new Date().toISOString() }
    students.value.push(newStudent)
    loading.value = false
    return newStudent
  }

  async function update(id: string, payload: Partial<Student>): Promise<void> {
    loading.value = true
    await delay(400)
    const idx = students.value.findIndex(s => s.id === id)
    if (idx !== -1) students.value[idx] = { ...students.value[idx], ...payload } as Student
    loading.value = false
  }

  async function remove(id: string): Promise<void> {
    loading.value = true
    await delay(400)
    students.value = students.value.filter(s => s.id !== id)
    loading.value = false
  }

  return { students, grades, loading, getByGrade, getFullName, getInitials, create, update, remove }
})