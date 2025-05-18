// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from '../dto/Request/create-course.dto';
import { UpdateCourseDto } from '../dto/Request/update-course.dto';
import { ICourseService } from './course.interface';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CourseService implements ICourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const user = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(user);
  }

  async list(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async getOne(id: number): Promise<Course> {
    const user = await this.courseRepository.findOneBy({ id });
    if(!user) throw new BadRequestException('Course not found!');
    return  user;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    await this.courseRepository.update(id, updateCourseDto);
    return this.getOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
