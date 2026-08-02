import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from '../entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Student[]> {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return this.service.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() body: CreateStudentDto): Promise<Student> {
    return this.service.create(body as any);
  }
}
