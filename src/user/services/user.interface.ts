import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/Request/create-user.dto';
import { UpdateUserDto } from '../dto/Request/update-user.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  list(): Promise<User[]>;
  getOne(id: number): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
  getByToken(refreshToken: string): Promise<User | null>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: number): Promise<void>;
}
