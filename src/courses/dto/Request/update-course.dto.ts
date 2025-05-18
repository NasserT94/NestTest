// dto/create-user.dto.ts
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    name?: string;
}
