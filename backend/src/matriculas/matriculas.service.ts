import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../entities/enrollment.entity';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginationService } from '../shared/services/pagination.service';

@Injectable()
export class MatriculasService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly repo: Repository<Enrollment>,
    private readonly paginationService: PaginationService,
  ) {}

  create(data: Partial<Enrollment>) {
    const m = this.repo.create(data as Enrollment);
    return this.repo.save(m);
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
    if (!r) throw new NotFoundException('Matrícula no encontrada');
    return r;
  }

  async update(id: number, data: Partial<Enrollment>) {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Matrícula no encontrada');
  }
}
