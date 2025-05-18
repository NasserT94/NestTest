// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/Request/create-user.dto';
import { IUserService } from './user.interface';
import { UpdateUserDto } from '../dto/Request/update-user.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async list(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if(!user) throw new BadRequestException('User not found!');
    return  user;
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async getByToken(refreshToken: string): Promise<User | null> {
    return this.userRepository.findOneBy({ refreshToken });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if(updateUserDto.password) updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    await this.userRepository.update(id, updateUserDto);
    return this.getOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
