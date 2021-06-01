import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MongoClientFactory } from '../../shared/infrastructure/mongo/MongoClientFactory';
import { MongoUserRepository } from '../../user/infrastructure/UserRepository';
import { LoginNotCorrect } from '../../user/domain/LoginNotCorrect';
import { Controller } from '../Controller';
import { SaveUser } from '../../user/application/SaveUser';

export class RegisterUserController implements Controller {
  
  private saveUser: SaveUser;
  
  constructor() {
    const userRepository = new MongoUserRepository(MongoClientFactory.createClient("mooc", MongoClientFactory.createConfig()));
    this.saveUser = new SaveUser(userRepository)
  }

  async run(req: Request, res: Response): Promise<void> {
    try {

      const email : string = req.body?.email;
      const name : string = req.body?.name;
      const lastName : string = req.body?.lastName;
      const userName : string = req.body?.userName;
      const password : string = req.body?.password;
      const isAdmin : boolean = req.body?.isAdmin;
      const isDemo : boolean = req.body?.isDemo;
      const shop : string = req.body?.shop;

      const user = await this.saveUser.run({email, name, lastName, userName, password, isAdmin, isDemo, shop});
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
