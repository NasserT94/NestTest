import { UserCourse } from "../../entities/user-course.entity";

export class UserCourseDto {
    id?: number;
    userId: number;
    courseId: number;
    endAt: Date;
    createdAt: Date;

    constructor(userCourse: UserCourse)
    {
        this.id = userCourse.id;
        this.userId = userCourse.userId;
        this.courseId = userCourse.courseId;
        this.endAt = userCourse.endAt;
        this.createdAt = userCourse.createdAt;
    }
}
