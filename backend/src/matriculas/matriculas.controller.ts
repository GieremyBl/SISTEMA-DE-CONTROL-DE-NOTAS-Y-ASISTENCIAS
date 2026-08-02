import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly svc: MatriculasService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() body: CreateMatriculaDto) {
    return this.svc.create(body as any);
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
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateMatriculaDto) {
    return this.svc.update(id, body as any);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
