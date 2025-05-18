// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan } from 'typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from '../entities/user-course.entity';
import { EnrollUserDto } from '../dto/Request/enroll-user.dto';
import { IUserCourseService } from './user-course.interface';
import { CourseService } from '../../courses/services/course.service';
import { UsersService } from '../../user/services/user.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserCourseService implements IUserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
    private readonly courseService: CourseService,
    private readonly usersService: UsersService,
  ) {}


  async create(userId: number, enrollUserDto: EnrollUserDto): Promise<UserCourse> {
    await this.courseService.getOne(enrollUserDto.courseId);
    await this.usersService.getOne(userId);
    
    const userCourses = await this.userCourseRepository.find({ where : { userId : userId, courseId : enrollUserDto.courseId, endAt: MoreThan(new Date()),} });

    if(userCourses.length > 0) throw new BadRequestException('User Already Enrolled !');

    const today = new Date();
    const endAt = new Date(today);
    endAt.setFullYear(today.getFullYear() + 1);
    
    const enrollUser = { userId: userId, courseId: enrollUserDto.courseId, endAt: endAt };
    
    const userCourse = this.userCourseRepository.create(enrollUser);
    return this.userCourseRepository.save(userCourse);
  }

  async list(userId: number): Promise<UserCourse[]> {
    return this.userCourseRepository.find({ where : { userId } });
  }

  async getOne(userId: number, id: number): Promise<UserCourse> {
    const userCourses = await this.userCourseRepository.find({ where : { userId : userId, id : id} });
    if(userCourses.length <= 0) throw new BadRequestException('User Course not found!');
    return  userCourses[0];
  }

  async delete(userId: number, id: number): Promise<void> {
    const userCourses = await this.userCourseRepository.find({ where : { userId : userId, id : id} });
    if(userCourses.length <= 0) throw new BadRequestException('User Course not found!');
    await this.userCourseRepository.delete(id);
  }
}
