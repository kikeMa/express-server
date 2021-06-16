import { UserToken } from "../../users/domain/UserToken";


declare global {
    export namespace Express {
        interface Request {
            body: Object
            user?: UserToken
        }
    }
}
