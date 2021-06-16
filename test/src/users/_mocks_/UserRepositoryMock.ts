import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import {UserRepository} from "../../../../src/users/domain/UserRepository";

export class UserRepositoryMock implements UserRepository {
    private mockSave = jest.fn();
    private mockSearch = jest.fn();

    async save(course: Course): Promise<void> {
        this.mockSave(course);
    }

    async search(id: CourseId): Promise<Nullable<Course>> {
        return this.mockSearch(id);
    }
}
