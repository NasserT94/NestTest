
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCourse {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'int', name: 'course_id' })
  courseId: number;

  @Column({ type: 'timestamp', name: 'end_at' })
  endAt: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'  })
  createdAt: Date;

  
  constructor(
    userId: number,
    courseId: number,
    endAt: Date,
    id?: number,
  ) {
    this.userId = userId;
    this.courseId = courseId;
    this.endAt = endAt;
    this.id = id;
  }
}
