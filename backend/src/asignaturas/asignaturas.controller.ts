import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { CreateAsignaturaDto, UpdateAsignaturaDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly svc: AsignaturasService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() body: CreateAsignaturaDto) {
    return this.svc.create(body);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.svc.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAsignaturaDto) {
    return this.svc.update(id, body);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
