import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginationService } from '../shared/services/pagination.service';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repo: Repository<Attendance>,
    private readonly paginationService: PaginationService,
  ) {}

  create(data: Partial<Attendance>) {
    const a = this.repo.create(data as Attendance);
    return this.repo.save(a);
  }

  findAll(paginationQuery?: PaginationQueryDto) {
    const { skip, take } = this.paginationService.getPagination({
      page: paginationQuery?.page ?? 1,
      limit: paginationQuery?.limit ?? 10,
    });
    return this.repo.find({ skip, take });
  }

  async findOne(id: number) {
    const r = await this.repo.findOne({ where: { id } });
    if (!r) throw new NotFoundException('Asistencia no encontrada');
    return r;
  }

  async update(id: number, data: Partial<Attendance>) {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Asistencia no encontrada');
  }
}
