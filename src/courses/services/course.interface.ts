import { Course } from '../entities/course.entity';
import { CreateCourseDto } from '../dto/Request/create-course.dto';
import { UpdateCourseDto } from '../dto/Request/update-course.dto';

export interface ICourseService {
  create(createUserDto: CreateCourseDto): Promise<Course>;
  list(): Promise<Course[]>;
  getOne(id: number): Promise<Course>;
  update(id: number, updateUserDto: UpdateCourseDto): Promise<Course>;
  delete(id: number): Promise<void>;
}
