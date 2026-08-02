import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grade } from './grade.entity';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'matriculas' })
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, (student) => student.matriculas, {
    nullable: false,
  })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante!: Student;

  @ManyToOne(() => Subject, (subject) => subject.matriculas, {
    nullable: false,
  })
  @JoinColumn({ name: 'asignatura_id' })
  asignatura!: Subject;

  @Column({ name: 'periodo_academico' })
  periodoAcademico!: string;

  @Column({ name: 'estado' })
  estado!: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'matriculado_en',
  })
  matriculadoEn!: Date;

  @OneToMany(() => Grade, (grade) => grade.matricula)
  calificaciones!: Grade[];
}