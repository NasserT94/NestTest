import { NestFactory, Reflector  } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const jwtService = app.get(JwtService);
  const reflector  = app.get(Reflector);
  const authGuard = new AuthGuard(jwtService, reflector);

  app.useGlobalGuards(authGuard);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
