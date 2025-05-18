
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'  })
  createdAt: Date;

  
  constructor(
    name: string,
    id?: number,
  ) {
    this.name = name;
    this.id = id;
  }
}