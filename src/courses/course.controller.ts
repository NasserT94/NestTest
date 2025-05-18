// users.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/Request/create-course.dto';
import { UpdateCourseDto } from './dto/Request/update-course.dto';
import { CourseDto } from './dto/Response/course.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Public()
  @Put()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<CourseDto> {
    const course : Course = await this.courseService.create(createCourseDto);
    return new CourseDto(course);
  }

  @Public()
  @Post(':id')
  async update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
    const course = await this.courseService.update(id, updateCourseDto);
    return new CourseDto(course);
  }

  @Public()
  @Get()
  async list(): Promise<CourseDto[]> {
    const courses = await this.courseService.list();
    return courses.map( course => {return new CourseDto(course)})
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<CourseDto> {
    const course = await this.courseService.getOne(id);
    return new CourseDto(course);
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.courseService.delete(id);
  }
}
