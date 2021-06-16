
import { UserRepository } from "../../../../src/users/domain/UserRepository";
import { User } from "../../../../src/users/domain/User";
import { Nullable } from "../../../../src/shared/domain/Nullable";
import Bcrypt from "bcrypt";

export class UserRepositoryMock implements UserRepository {
    private mockSave = jest.fn();
    private mockSearch = jest.fn();

    async save(user: User): Promise<void> {
        this.mockSave(user);
    }

    async search(email: String): Promise<Nullable<User>> {
        return this.mockSearch(email);
    }

    async assertLastUserSaved(user: User) {
        const mock = this.mockSave.mock;
        const lastUser = mock.calls[mock.calls.length - 1][0] as User;
        const { id: id1, ...userPrimitives } = user.toPrimitives();
        const { id: id2, ...lastSavedPrimitives } = lastUser.toPrimitives();

        expect(lastUser).toBeInstanceOf(User);
        expect(true).toEqual( await Bcrypt.compare(userPrimitives.password, lastSavedPrimitives.password))
        lastSavedPrimitives.password = "samePassword";
        userPrimitives.password = "samePassword";
        expect(lastSavedPrimitives).toEqual(userPrimitives);
    }

}
