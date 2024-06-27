import { ErrorCode, HttpExceptions } from "./root";

export class NotFound extends HttpExceptions {
    constructor(message: string, errorCode: ErrorCode){
        console.log(`not found class`)
        super(message, 400, errorCode, null);
    }
}