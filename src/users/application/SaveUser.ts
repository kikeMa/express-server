import Bcrypt from "bcrypt";
import { Uuid } from "../../shared/domain/value-object/Uuid";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

type Params = {
  email: string;
  name: string;
  lastName: string;
  userName: string;
  password: string;
  isAdmin: boolean;
  isDemo: boolean;
  shop: string;
};

export class SaveUser {
  constructor(private repository: UserRepository) {}

  async run({ email, name, lastName, userName, password, isAdmin, isDemo, shop }: Params) {

    // Hash password
    const salt = await Bcrypt.genSalt(10);
    const hashPassword = await Bcrypt.hash(password, salt);
    
    const user : User = new User(Uuid.random(), email, name, lastName, userName, hashPassword, isAdmin, isDemo, new Uuid(shop))
    
    await this.repository.save(user);
    
  }
}
