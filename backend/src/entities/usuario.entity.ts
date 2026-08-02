import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_completo' })
  nombreCompleto: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'hash_contrasena' })
  hashContrasena: string;

  @Column({ name: 'rol' })
  rol: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'creado_en' })
  creadoEn: Date;
}
