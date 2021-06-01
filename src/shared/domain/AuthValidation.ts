import { NextFunction, Request, Response } from 'express';

export interface AuthValidation {
    verifyAdmin(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}