import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MongoClientFactory } from '../../shared/infrastructure/mongo/MongoClientFactory';
import { MongoUserRepository } from '../../users/infrastructure/UserRepository';
import { LoginUser } from '../../users/application/LoginUser';
import { LoginNotCorrect } from '../../users/domain/LoginNotCorrect';
import { Controller } from '../Controller';

export class LoginController implements Controller {
  
  private loginClient: LoginUser;
  
  constructor() {
    const userRepository = new MongoUserRepository(MongoClientFactory.createClient("mooc", MongoClientFactory.createConfig()));
    this.loginClient = new LoginUser(userRepository)
  }

  async run(req: Request, res: Response): Promise<void> {
    try {

      const email : string = req.body?.email;
      const password : string = req.body?.password;

      console.log(req.body);
      
      const user = await this.loginClient.run({email, password});
      res.status(httpStatus.OK).json(user);
    } catch (e) {
      if (e instanceof LoginNotCorrect) {
        res.status(httpStatus.UNAUTHORIZED).send(e.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.toString());
      }
    }
  }
}
