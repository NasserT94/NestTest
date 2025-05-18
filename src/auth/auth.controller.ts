// users.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { AuthService } from './services/auth.service'; // adjust path
import { AuthDto } from './dto/Request/auth.dto';
import { AuthResponseDto } from './dto/Response/auth-response.dto';
import { AuthTokenDto } from './dto/Request/auth-token.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get()
  async login(@Body() authDto: AuthDto): Promise<AuthResponseDto> {
    return await this.authService.login(authDto);
  }

  @Public()
  @Get('/refresh')
  async refresh(@Body() authTokenDto: AuthTokenDto): Promise<AuthResponseDto> {
    return await this.authService.refresh(authTokenDto.refreshToken);
  }
}
