import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombreCompleto: string;

  @IsEmail()
  email: string;

  @IsString()
  contrasena: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
