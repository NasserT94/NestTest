// dto/create-user.dto.ts
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
}
