import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMatriculaDto {
  @IsInt()
  estudianteId: number;

  @IsInt()
  asignaturaId: number;

  @IsString()
  periodoAcademico: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
