// users.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './services/user.service';
import { CreateUserDto } from './dto/Request/create-user.dto';
import { UpdateUserDto } from './dto/Request/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/Response/user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Put()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user : User = await this.usersService.create(createUserDto);
    return new UserDto(user);
  }

  @Public()
  @Post(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return new UserDto(user);
  }

  @Public()
  @Get()
  async list(): Promise<UserDto[]> {
    const users = await this.usersService.list();
    return users.map( user => {return new UserDto(user)})
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<UserDto> {
    const user = await this.usersService.getOne(id);
    return new UserDto(user);
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
