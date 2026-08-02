import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Entity({ name: 'calificaciones' })
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.calificaciones, {
    nullable: false,
  })
  @JoinColumn({ name: 'matricula_id' })
  matricula!: Enrollment;

  @Column({ name: 'tipo_evaluacion' })
  tipoEvaluacion!: string;

  @Column({ type: 'numeric', name: 'nota' })
  nota!: number;

  @Column({ type: 'numeric', name: 'ponderacion' })
  ponderacion!: number;

  @Column({ type: 'date', nullable: true, name: 'fecha_calificacion' })
  fechaCalificacion!: Date;

  @Column({ name: 'registrado_por' })
  registradoPor!: number;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'creado_en' })
  creadoEn!: Date;
}