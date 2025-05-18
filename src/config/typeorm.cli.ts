import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { UserCourse } from 'src/user-courses/entities/user-course.entity';

dotenvConfig({ path: '.env' }); 


const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, 
  entities:['src/**/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
};


export const AppDataSource = new DataSource(config);