import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCalificacionDto {
  @IsInt()
  matriculaId: number;

  @IsString()
  tipoEvaluacion: string;

  @IsNumber()
  @Type(() => Number)
  nota: number;

  @IsNumber()
  @Type(() => Number)
  ponderacion: number;

  @IsOptional()
  @IsDateString()
  fechaCalificacion?: string;

  @IsOptional()
  @IsInt()
  registradoPor?: number;
}
