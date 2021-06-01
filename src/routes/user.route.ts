import { Router, Request, Response } from 'express';
import { LoginController } from '../controllers/user/LoginController';
import { RegisterUserController } from '../controllers/user/RegisterUserController';

export const register = (router: Router) => {
  const loginController: LoginController = new LoginController();
  router.post('/login', (req: Request, res: Response) => loginController.run(req, res));
 
 
  const registerUserController: RegisterUserController = new RegisterUserController();
  router.post('/users', (req: Request, res: Response) => registerUserController.run(req, res));
};

