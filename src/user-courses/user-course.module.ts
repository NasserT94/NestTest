import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoursesController } from './user-courses.controller';
import { UserCourseService } from './services/user-course.service';
import { UserCourse } from './entities/user-course.entity';
import { UsersModule } from 'src/user/user.module';
import { CoursesModule } from 'src/courses/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse]), CoursesModule, UsersModule],
  controllers: [UserCoursesController],
  providers: [UserCourseService],
  exports: [UserCourseService],
})
export class UserCoursesModule {}