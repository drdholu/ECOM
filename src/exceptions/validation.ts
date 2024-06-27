import { HttpExceptions } from "./root";

export class UnproccesableEntity extends HttpExceptions {
    constructor(error: any, message: string, errorCode: number){
        console.log(`unproccessable class`)
        
        super(message, 422, errorCode, error);
    }
}