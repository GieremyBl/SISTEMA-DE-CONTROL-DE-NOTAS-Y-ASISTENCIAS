import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendance } from './attendance.entity';
import { Enrollment } from './enrollment.entity';

@Entity({ name: 'estudiantes' })
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, name: 'codigo' })
  codigo!: string;

  @Column({ name: 'nombre_completo' })
  nombreCompleto!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ nullable: true, name: 'telefono' })
  telefono?: string;

  @Column({ nullable: true, type: 'date', name: 'fecha_nacimiento' })
  fechaNacimiento?: Date;

  @Column({ name: 'estado' })
  estado!: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'creado_en' })
  creadoEn!: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.estudiante)
  matriculas!: Enrollment[];

  @OneToMany(() => Attendance, (attendance) => attendance.estudiante)
  asistencias!: Attendance[];
}