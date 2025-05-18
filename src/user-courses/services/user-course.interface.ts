import { UserCourse } from '../entities/user-course.entity';
import { EnrollUserDto } from '../dto/Request/enroll-user.dto';

export interface IUserCourseService {
  create(userId: number, enrollUserDto: EnrollUserDto): Promise<UserCourse>;
  list(userId: number): Promise<UserCourse[]>;
  getOne(userId: number, id: number): Promise<UserCourse>;
  delete(userId: number, id: number): Promise<void>;
}
