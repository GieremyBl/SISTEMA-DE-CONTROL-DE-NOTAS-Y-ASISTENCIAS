import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAsignaturaDto {
  @IsString()
  nombre: string;

  @IsString()
  codigo: string;

  @IsInt()
  semestre: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
