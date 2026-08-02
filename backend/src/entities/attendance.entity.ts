import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'asistencias' })
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, (student) => student.asistencias, {
    nullable: false,
  })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante!: Student;

  @ManyToOne(() => Subject, (subject) => subject.asistencias, {
    nullable: false,
  })
  @JoinColumn({ name: 'asignatura_id' })
  asignatura!: Subject;

  @Column({ type: 'date', name: 'fecha_asistencia' })
  fechaAsistencia!: string;

  @Column({ name: 'estado' })
  estado!: string;

  @Column({ nullable: true, name: 'justificacion', type: 'text' })
  justificacion?: string;

  @Column({ name: 'registrado_por' })
  registradoPor!: number;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'creado_en' })
  creadoEn!: Date;
}