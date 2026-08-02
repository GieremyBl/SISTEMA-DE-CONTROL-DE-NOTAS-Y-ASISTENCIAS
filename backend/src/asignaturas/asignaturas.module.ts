import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../entities/subject.entity';
import { AsignaturasService } from './asignaturas.service';
import { AsignaturasController } from './asignaturas.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), SharedModule],
  controllers: [AsignaturasController],
  providers: [AsignaturasService],
  exports: [AsignaturasService],
})
export class AsignaturasModule {}
