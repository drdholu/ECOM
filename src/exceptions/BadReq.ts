import { ErrorCode, HttpExceptions } from "./root";

export class BadReq extends HttpExceptions {
    constructor(message: string, errorCode: ErrorCode){
        console.log(`bad request class`)
        super(message, 400, errorCode, null);
    }
}