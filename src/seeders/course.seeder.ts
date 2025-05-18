import { DataSource } from 'typeorm';
import { Course } from '../courses/entities/course.entity';

export const CoursesSeeder = async (dataSource: DataSource) => {
  const courseRepo = dataSource.getRepository(Course);

  const courses = [
    { name: 'Course 1' },
    { name: 'Course 2' },
    { name: 'Course 3' }
  ];
  for (const data of courses) await courseRepo.insert(data);
};
