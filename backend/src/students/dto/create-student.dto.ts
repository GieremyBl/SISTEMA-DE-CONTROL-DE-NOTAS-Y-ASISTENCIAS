import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  codigo: string;

  @IsString()
  nombreCompleto: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
