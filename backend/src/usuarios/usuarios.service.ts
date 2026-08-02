import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcryptjs';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginationService } from '../shared/services/pagination.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(data: Partial<Usuario>) {
    if (data['contrasena']) {
      const hash = await bcrypt.hash(data['contrasena'], 10);
      data['hashContrasena'] = hash;
      delete data['contrasena'];
    }
    const u = this.repo.create(data as Usuario);
    return this.repo.save(u);
  }

  findAll(paginationQuery?: PaginationQueryDto) {
    const { skip, take } = this.paginationService.getPagination({
      page: paginationQuery?.page ?? 1,
      limit: paginationQuery?.limit ?? 10,
    });
    return this.repo
      .createQueryBuilder('usuario')
      .select([
        'usuario.id',
        'usuario.nombreCompleto',
        'usuario.email',
        'usuario.rol',
        'usuario.creadoEn',
      ])
      .skip(skip)
      .take(take)
      .getMany();
  }

  async findOne(id: number) {
    const r = await this.repo.findOne({ where: { id } });
    if (!r) throw new NotFoundException('Usuario no encontrado');
    return r;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<Usuario>) {
    await this.findOne(id);
    if (data['contrasena']) {
      data['hashContrasena'] = await bcrypt.hash(data['contrasena'], 10);
      delete data['contrasena'];
    }
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Usuario no encontrado');
  }
}
