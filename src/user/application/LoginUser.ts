import { LoginNotCorrect } from "../domain/LoginNotCorrect";
import { UserRepository } from "../domain/UserRepository";
import { LoginResponse } from "./LoginResponse";
import Bcrypt from "bcrypt";
import { Token } from "../../shared/domain/Token";

type Params = {
    email: string;
    password: string;
};

  
export class LoginUser {
    constructor(private repository: UserRepository) {}
  
    async run({ email, password }: Params) {

      const user = await this.repository.search(email);
      
      if (!user) {
        throw new LoginNotCorrect();
      }
      
      const validPassword = await Bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new LoginNotCorrect();
      }

      const token : Token = Token.getToken({id: user.shop, isAdmin: user.isAdmin, isDemo: user.isDemo});

      return new LoginResponse(user.email, user.shop.toString(), token.response() );
    }
  }
  