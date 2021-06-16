import {User} from "../../../../src/users/domain/User";
import {Uuid} from "../../../../src/shared/domain/value-object/Uuid";
import {UuidMother} from "../../../utils/domain/UuidMother";
import {WordMother} from "../../../utils/domain/WordMother";

export class UserMother {
    static create(
        id: Uuid,
        email: string,
        name: string,
        lastName: string,
        userName: string,
        password: string,
        isAdmin: boolean,
        isDemo: boolean,
        shop: Uuid
    ): User {
        return new User(
            id,
            email,
            name,
            lastName,
            userName,
            password,
            isAdmin,
            isDemo,
            shop
        );
    }

    static random(): User {
        return this.create(
            new Uuid(UuidMother.random()),
            WordMother.random(),
            WordMother.random(),
            WordMother.random(),
            WordMother.random(),
            WordMother.random(),
            true,
            false,
            new Uuid(UuidMother.random()),
        );
    }
}
