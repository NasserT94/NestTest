
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'first_name'  })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name'  })
  lastName: string;

  @Column({ type: 'varchar', length: 255, name: 'refresh_token', default: null })
  refreshToken: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'  })
  createdAt: Date;

  
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    id?: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
