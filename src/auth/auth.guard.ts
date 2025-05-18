import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
      
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtServ: JwtService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(
              IS_PUBLIC_KEY,
              [context.getHandler(), context.getClass()]
            );
        
            if (isPublic) return true;

            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;
            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Please provide token');
            }
            const authToken = authorization.replace(/bearer/gim, '').trim();
            const resp = this.jwtServ.verify(authToken, {
                secret : process.env.JWt_KEY
            });
            request.userData = resp;
            return true;
        } catch (error) {
            console.log('auth error');
            return false;
        }
    }
}
    