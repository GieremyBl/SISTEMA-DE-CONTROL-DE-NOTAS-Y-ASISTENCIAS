import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAsistenciaDto {
  @IsInt()
  estudianteId: number;

  @IsInt()
  asignaturaId: number;

  @IsDateString()
  fechaAsistencia: string;

  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  justificacion?: string;

  @IsOptional()
  @IsInt()
  registradoPor?: number;
}
