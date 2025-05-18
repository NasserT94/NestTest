import { Course } from "../../entities/course.entity";

export class CourseDto {
    id?: number;
    name: string;
    createdAt: Date;

    constructor(course: Course)
    {
        this.id = course.id;
        this.name = course.name;
        this.createdAt = course.createdAt;
    }
}
