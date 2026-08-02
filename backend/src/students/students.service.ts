import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginationService } from '../shared/services/pagination.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
    private readonly paginationService: PaginationService,
  ) {}

  findAll(paginationQuery?: PaginationQueryDto): Promise<Student[]> {
    const { skip, take } = this.paginationService.getPagination({
      page: paginationQuery?.page ?? 1,
      limit: paginationQuery?.limit ?? 10,
    });
    return this.repo.find({ skip, take });
  }

  async findOne(id: number): Promise<Student> {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Student not found');
    return s;
  }

  create(data: Partial<Student>): Promise<Student> {
    const student = this.repo.create(data as Student);
    return this.repo.save(student);
  }
}
