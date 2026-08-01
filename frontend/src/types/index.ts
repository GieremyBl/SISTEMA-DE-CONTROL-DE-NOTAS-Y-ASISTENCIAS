// ── Auth ──────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'TEACHER'
  schoolId: string
  avatarUrl?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

// ── School ────────────────────────────────────────
export interface School {
  id: string
  name: string
  ugel: string
  logoUrl?: string
  address?: string
  createdAt: string
}

// ── Grade / Section ───────────────────────────────
export type GradeLevel =
  | '1° Primaria' | '2° Primaria' | '3° Primaria'
  | '4° Primaria' | '5° Primaria' | '6° Primaria'

export interface Grade {
  id: string
  level: GradeLevel
  section: string     // 'A', 'B', etc.
  schoolId: string
  teacherId: string
}

// ── Course ────────────────────────────────────────
export interface Course {
  id: string
  name: string
  gradeId: string
  color?: string
}

// ── Student ───────────────────────────────────────
export interface Student {
  id: string
  name: string
  lastName: string
  dni: string
  gradeId: string
  grade?: Grade
  createdAt: string
}

// ── Scores ────────────────────────────────────────
export type Period = 'I Bimestre' | 'II Bimestre' | 'III Bimestre' | 'IV Bimestre'

export interface Score {
  id: string
  studentId: string
  courseId: string
  period: Period
  value: number        // 0 – 20
  type: 'BIMESTRAL' | 'EXAMEN' | 'PRACTICA'
}

export interface ScoreRow {
  student: Student
  scores: Record<string, number>   // courseId → value
  average: number
}

// ── Attendance ───────────────────────────────────
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE'

export interface Attendance {
  id: string
  studentId: string
  date: string          // ISO date
  status: AttendanceStatus
}

// ── Schedule ──────────────────────────────────────
export interface ScheduleSlot {
  id: string
  day: 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES'
  startTime: string     // '07:30'
  endTime: string       // '08:20'
  courseId: string
  course?: Course
  gradeId: string
  grade?: Grade
}

// ── Activity ──────────────────────────────────────
export type ActivityType = 'EXAM' | 'PRACTICE' | 'DELIVERY' | 'EVENT'

export interface Activity {
  id: string
  title: string
  date: string
  type: ActivityType
  gradeId?: string
}

// ── Notebook ──────────────────────────────────────
export interface NotebookTemplate {
  id: string
  schoolId: string
  fileUrl: string
  name: string
}

// ── API helpers ───────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message?: string
  statusCode: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ApiError {
  message: string
  statusCode: number
  error?: string
}