// dto/create-user.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';

export class EnrollUserDto {

    @IsNotEmpty()
    @IsNumber()
    courseId: number;
}
