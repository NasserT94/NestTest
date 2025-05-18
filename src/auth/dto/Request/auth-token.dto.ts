// dto/create-user.dto.ts
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthTokenDto {
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}
