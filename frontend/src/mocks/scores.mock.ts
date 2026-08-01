import type { Score, Period } from '@/types'

export const COURSES = [
  { id: 'c-1', name: 'Matemática'  },
  { id: 'c-2', name: 'Comunicación'},
  { id: 'c-3', name: 'Ciencias'    },
  { id: 'c-4', name: 'Historia'    },
  { id: 'c-5', name: 'Inglés'      },
  { id: 'c-6', name: 'Arte'        },
  { id: 'c-7', name: 'Ed. Física'  },
  { id: 'c-8', name: 'Religión'    },
]

export const PERIODS: Period[] = [
  'I Bimestre',
  'II Bimestre',
  'III Bimestre',
  'IV Bimestre',
]

// Genera notas aleatorias pero consistentes por alumno
function rnd(min: number, max: number, seed: number): number {
  const x = Math.sin(seed) * 10000
  return Math.round(min + (x - Math.floor(x)) * (max - min))
}

export function generateMockScores(studentIds: string[]): Score[] {
  const scores: Score[] = []
  let idx = 1

  studentIds.forEach((studentId, si) => {
    PERIODS.slice(0, 2).forEach((period, pi) => {
      COURSES.forEach((course, ci) => {
        scores.push({
          id:        `score-${idx++}`,
          studentId,
          courseId:  course.id,
          period,
          value:     rnd(11, 20, si * 100 + pi * 10 + ci),
          type:      'BIMESTRAL',
        })
      })
    })
  })

  return scores
}