import { HttpExceptions } from "./root";

export class InternalException extends HttpExceptions{
    constructor(message: string, errors: any, errorCode: number){
        console.log(`internal exception class`)
        
        super(message, 500, errorCode, errors);
    }
}