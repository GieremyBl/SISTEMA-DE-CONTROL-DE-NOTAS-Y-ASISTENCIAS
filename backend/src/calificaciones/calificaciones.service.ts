import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../entities/grade.entity';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginationService } from '../shared/services/pagination.service';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectRepository(Grade)
    private readonly repo: Repository<Grade>,
    private readonly paginationService: PaginationService,
  ) {}

  create(data: Partial<Grade>) {
    const c = this.repo.create(data as Grade);
    return this.repo.save(c);
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
    if (!r) throw new NotFoundException('Calificación no encontrada');
    return r;
  }

  async update(id: number, data: Partial<Grade>) {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Calificación no encontrada');
  }
}
