import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
      forwardRef(() => UsersModule),
      JwtModule.register({
        secret: `${process.env.JWT_KEY}`,
        signOptions: { expiresIn: '3600s' },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}