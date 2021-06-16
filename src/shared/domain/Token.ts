import convictConfig from "../../config/config";
import {UserToken} from "../../users/domain/UserToken";
const jwt = require("jsonwebtoken");


export class Token {
    readonly value: string;

    constructor(token: string) {
        token = Token.clearBearer(token);
        this.value = token;
    }

    private static clearBearer(token: string): string {
        return token.replace("Bearer ","")
    }

    response(): string {
        return `Bearer ${this.value}`;
    }

    static getToken(data: UserToken): Token {
        return new Token(jwt.sign(data, convictConfig.get('TOKEN_SECRET')));
    }

    getUserData(): UserToken {
        return jwt.verify(this.value, convictConfig.get('TOKEN_SECRET')) as UserToken;
    }

}