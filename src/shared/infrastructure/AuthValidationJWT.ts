import { AuthValidation } from "../domain/AuthValidation";
import { NextFunction, Request, Response } from 'express';
import httpStatus from "http-status";
import { UserToken } from "../../users/domain/UserToken";
import {Token} from "../domain/Token";

class AuthValidationJWT implements AuthValidation {
    
    constructor() {}

    async verifyAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {

        const tokenValue = req.header("Authorization");
        if (!tokenValue) {
            AuthValidationJWT.sendResponse(res, httpStatus.UNAUTHORIZED, "Client authentication failed.");
            return;
        }
        const token: Token = new Token(tokenValue)
        const user : UserToken = token.getUserData();
        //if admin it will leave the middleware and pass the payload to the request object
        if (user.isAdmin) {
          req.user = user;
          return next();
        }
        AuthValidationJWT.sendResponse(res, httpStatus.FORBIDDEN, "User Admin is required.");

    }

    async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        const token = req.header("Authorization");
        if (!token) {
            AuthValidationJWT.sendResponse(res, httpStatus.UNAUTHORIZED, "Client authentication failed.");
            return;
        }


        next();
    }


    static sendResponse(res: Response, code: number, text: string): void {
        res.status(code).json({ errorMessage: text });
    }

}

export default AuthValidationJWT;
