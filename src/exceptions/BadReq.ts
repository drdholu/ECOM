import { ErrorCode, HttpExceptions } from "./root";

export class BadReq extends HttpExceptions {
    constructor(message: string, errorCode: ErrorCode){
        super(message, 400, errorCode, null);
    }
}