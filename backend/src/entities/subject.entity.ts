import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Enrollment } from './enrollment.entity';

@Entity({ name: 'asignaturas' })
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, name: 'codigo' })
  codigo!: string;

  @Column({ name: 'nombre' })
  nombre!: string;

  @Column({ type: 'int', name: 'semestre' })
  semestre!: number;

  @Column({ default: true, name: 'activo' })
  activo!: boolean;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.asignatura)
  matriculas!: Enrollment[];

  @OneToMany(() => Attendance, (attendance) => attendance.asignatura)
  asistencias!: Attendance[];
}