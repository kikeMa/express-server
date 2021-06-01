import { Router, Request, Response } from 'express';
import StatusGetController from '../controllers/StatusGetController';

export const register = (router: Router) => {
  const statusGetController: StatusGetController = new StatusGetController();
  router.get('/status', (req: Request, res: Response) => statusGetController.run(req, res));
};