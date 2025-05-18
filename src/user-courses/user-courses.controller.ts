// users.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserCourseService } from './services/user-course.service';
import { UserCourse } from './entities/user-course.entity';
import { EnrollUserDto } from './dto/Request/enroll-user.dto';
import { UserCourseDto } from './dto/Response/user-course.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';

@Controller('user-courses')
export class UserCoursesController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Put('/enroll')
  async create(@AuthUser() userId: number, @Body() enrollUserDto: EnrollUserDto): Promise<UserCourseDto> {
    const userCourse : UserCourse = await this.userCourseService.create(userId, enrollUserDto);
    return new UserCourseDto(userCourse);
  }

  @Get('/my-courses')
  async list(@AuthUser() userId: number): Promise<UserCourseDto[]> {
    const courses = await this.userCourseService.list(userId);
    return courses.map( userCourse => {return new UserCourseDto(userCourse)})
  }

  @Get(':id')
  async getOne(@AuthUser() userId: number, @Param('id') id: number): Promise<UserCourseDto> {
    const userCourse = await this.userCourseService.getOne(userId, id);
    return new UserCourseDto(userCourse);
  }

  @Delete(':id')
  delete(@AuthUser() userId: number, @Param('id') id: number): Promise<void> {
    return this.userCourseService.delete(userId, id);
  }
}
