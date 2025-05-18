// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { IAuthService } from './auth.interface'; // adjust path
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../dto/Request/auth.dto';
import { AuthResponseDto } from '../dto/Response/auth-response.dto';
import { UsersService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<AuthResponseDto> {
    const user = await this.userService.getByEmail(authDto.email);

    if(!user) throw new BadRequestException('User Not Found !');

    if(! await bcrypt.compare(authDto.password,user.password))
      throw new BadRequestException('Password is not correct !');

    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '6h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    
    await this.userService.update(user.id!, { refreshToken });
    
    return await new AuthResponseDto(accessToken, refreshToken);
  }
  
  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    try {
      this.jwtService.verify(refreshToken); 
  
      const user = await this.userService.getByToken(refreshToken);
  
      if(!user) throw new UnauthorizedException('Invalid Refresh Token !');
  
      const payload = { email: user.email, sub: user.id };
  
      const accessToken = this.jwtService.sign(payload, { expiresIn: '6h' });
      refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      await this.userService.update(user.id!, { refreshToken });
  
      return await new AuthResponseDto(accessToken, refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid Refresh Token !');
    }
  }
}
