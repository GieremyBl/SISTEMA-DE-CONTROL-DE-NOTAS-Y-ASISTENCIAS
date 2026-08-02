import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { UsuariosService } from './usuarios/usuarios.service';

async function seedDefaultUsers(usuariosService: UsuariosService) {
  const defaults = [
    {
      nombreCompleto: 'Administrador Principal',
      email: process.env.ADMIN_EMAIL ?? 'admin@localhost',
      contrasena: process.env.ADMIN_PASSWORD ?? 'Admin123!@#',
      rol: 'admin',
    },
    {
      nombreCompleto: 'Usuario de Prueba',
      email: process.env.DEFAULT_USER_EMAIL ?? 'user@localhost',
      contrasena: process.env.DEFAULT_USER_PASSWORD ?? 'User123!@#',
      rol: 'user',
    },
  ];

  for (const user of defaults) {
    const existing = await usuariosService.findByEmail(user.email);
    if (!existing) {
      await usuariosService.create(user as any);
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const usuariosService = app.get(UsuariosService);
  await seedDefaultUsers(usuariosService);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
