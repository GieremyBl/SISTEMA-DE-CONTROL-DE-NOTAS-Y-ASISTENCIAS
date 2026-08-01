import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Score, Period } from '@/types'
import { MOCK_STUDENTS, MOCK_GRADES } from '@/mocks/students.mock'
import { COURSES, PERIODS, generateMockScores } from '@/mocks/scores.mock'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const useGradeStore = defineStore('grades', () => {
  const scores  = ref<Score[]>(generateMockScores(MOCK_STUDENTS.map(s => s.id)))
  const loading = ref(false)
  const saving  = ref(false)

  const courses = COURSES
  const periods = PERIODS
  const grades  = MOCK_GRADES

  function getScore(studentId: string, courseId: string, period: Period): number | null {
    return scores.value.find(s => s.studentId === studentId && s.courseId === courseId && s.period === period)?.value ?? null
  }

  function getStudentAverage(studentId: string, period: Period): number | null {
    const vals = COURSES.map(c => getScore(studentId, c.id, period)).filter((v): v is number => v !== null)
    if (!vals.length) return null
    return parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1))
  }

  function getGeneralAverage(studentId: string): number | null {
    const avgs = PERIODS.map(p => getStudentAverage(studentId, p)).filter((v): v is number => v !== null)
    if (!avgs.length) return null
    return parseFloat((avgs.reduce((a, b) => a + b, 0) / avgs.length).toFixed(2))
  }

  function getCourseAverage(gradeId: string, courseId: string, period: Period): number | null {
    const students = MOCK_STUDENTS.filter(s => s.gradeId === gradeId)
    const vals = students.map(s => getScore(s.id, courseId, period)).filter((v): v is number => v !== null)
    if (!vals.length) return null
    return parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1))
  }

  function scoreColor(val: number | null): string {
    if (val === null) return '#94a3b8'
    if (val >= 17) return '#059669'
    if (val >= 14) return '#1a56a0'
    if (val >= 11) return '#d97706'
    return '#dc2626'
  }

  function scoreBg(val: number | null): string {
    if (val === null) return '#f8fafc'
    if (val >= 17) return '#d1fae5'
    if (val >= 14) return '#dbeafe'
    if (val >= 11) return '#fef3c7'
    return '#fee2e2'
  }

  async function updateScore(studentId: string, courseId: string, period: Period, value: number): Promise<void> {
    const idx = scores.value.findIndex(s => s.studentId === studentId && s.courseId === courseId && s.period === period)
    if (idx !== -1) scores.value[idx] = { ...scores.value[idx]!, value }
    else scores.value.push({ id: `score-${Date.now()}`, studentId, courseId, period, value, type: 'BIMESTRAL' })
  }

  async function bulkSave(updates: { studentId: string; courseId: string; period: Period; value: number }[]): Promise<void> {
    saving.value = true
    await delay(600)
    updates.forEach(u => {
      const idx = scores.value.findIndex(s => s.studentId === u.studentId && s.courseId === u.courseId && s.period === u.period)
      if (idx !== -1) scores.value[idx] = { ...scores.value[idx]!, value: u.value }
      else scores.value.push({ id: `score-${Date.now()}`, ...u, type: 'BIMESTRAL' } as Score)
    })
    saving.value = false
  }

  return { scores, loading, saving, courses, periods, grades, getScore, getStudentAverage, getGeneralAverage, getCourseAverage, scoreColor, scoreBg, updateScore, bulkSave }
})