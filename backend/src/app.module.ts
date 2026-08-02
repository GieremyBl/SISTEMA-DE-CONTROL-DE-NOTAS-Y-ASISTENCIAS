import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Attendance } from './entities/attendance.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Grade } from './entities/grade.entity';
import { Student } from './entities/student.entity';
import { Subject } from './entities/subject.entity';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { MatriculasModule } from './matriculas/matriculas.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Student, Subject, Enrollment, Attendance, Grade, Usuario],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    SharedModule,
    AuthModule,
    StudentsModule,
    AsignaturasModule,
    MatriculasModule,
    AsistenciasModule,
    CalificacionesModule,
    UsuariosModule,
  ],
})
export class AppModule {}
