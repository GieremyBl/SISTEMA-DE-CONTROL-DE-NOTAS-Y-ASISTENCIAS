import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Attendance, AttendanceStatus } from '@/types'
import { MOCK_STUDENTS } from '@/mocks/students.mock'
import dayjs from 'dayjs'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

function generateMockAttendance(): Attendance[] {
  const records: Attendance[] = []
  const statuses: AttendanceStatus[] = ['PRESENT', 'PRESENT', 'PRESENT', 'PRESENT', 'LATE', 'ABSENT'] 
  let idx = 1
  MOCK_STUDENTS.forEach((s, si) => {
    for (let d = 0; d < 5; d++) {
      const date   = dayjs().startOf('week').add(1 + d, 'day').format('YYYY-MM-DD')
      const status: AttendanceStatus = statuses[(si + d) % statuses.length] ?? 'PRESENT'
      records.push({ id: `att-${idx++}`, studentId: s.id, date, status })
    }
  })
  return records
}

export const useAttendanceStore = defineStore('attendance', () => {
  const records = ref<Attendance[]>(generateMockAttendance())
  const loading = ref(false)
  const saving  = ref(false)

  function getStatus(studentId: string, date: string): AttendanceStatus {
    return records.value.find(r => r.studentId === studentId && r.date === date)?.status ?? 'PRESENT'
  }

  function countByStatus(studentId: string, status: AttendanceStatus, weekStart: string): number {
    const days = Array.from({ length: 5 }, (_, i) => dayjs(weekStart).add(i, 'day').format('YYYY-MM-DD'))
    return days.filter(d => getStatus(studentId, d) === status).length
  }

  function setStatus(studentId: string, date: string, status: AttendanceStatus): void {
    
    const idx = records.value.findIndex(r => r.studentId === studentId && r.date === date)
    if (idx !== -1) records.value[idx]!.status = status
    else records.value.push({ id: `att-${Date.now()}`, studentId, date, status })
  }

  async function saveWeek(): Promise<void> {
    saving.value = true
    await delay(500)
    saving.value = false
  }

  return { records, loading, saving, getStatus, countByStatus, setStatus, saveWeek }
})