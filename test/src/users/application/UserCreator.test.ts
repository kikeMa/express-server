import { UserRepositoryMock } from "../_mocks_/UserRepositoryMock";
import { SaveUser } from "../../../../src/users/application/SaveUser";
import { UuidMother } from "../../../utils/domain/UuidMother";
import { WordMother } from "../../../utils/domain/WordMother";
import { UserMother } from "../domain/UserMother";
import { Uuid } from "../../../../src/shared/domain/value-object/Uuid";

describe('User creator', () => {

    let repository: UserRepositoryMock;
    let saveUser: SaveUser;

    beforeEach(() => {
        repository = new UserRepositoryMock();
        saveUser = new SaveUser(repository);
    });

    it('save a correct user', async () => {
        const email = WordMother.random();
        const name = WordMother.random();
        const lastName = WordMother.random();
        const userName = WordMother.random();
        const password = WordMother.random();
        const isAdmin = false;
        const isDemo = true;
        const shop = UuidMother.random();

        const user = UserMother.create(new Uuid(UuidMother.random()), email, name, lastName, userName, password, isAdmin, isDemo, new Uuid(shop));

        await saveUser.run({ email, name, lastName, userName, password, isAdmin, isDemo, shop });

        await repository.assertLastUserSaved(user);

    });
});
