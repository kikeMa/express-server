import { UserToken } from "../../user/domain/UserToken";


declare global {
    export namespace Express {
        interface Request {
            body: Object
            user?: UserToken
        }
    }
}
