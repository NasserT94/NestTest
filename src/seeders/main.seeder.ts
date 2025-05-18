import { AppDataSource } from '../config/typeorm';
import { CoursesSeeder } from './course.seeder';

async function main() {
  await AppDataSource.initialize();

  await CoursesSeeder(AppDataSource);

  await AppDataSource.destroy();
}

main().catch((error) => {
  console.error(error);
});
