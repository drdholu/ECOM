import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpExceptions } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: Function) => {


    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("error handler here");
            await method(req, res, next);
        } catch (error) {
            // console.log(error);
            let exception: HttpExceptions;
            if(error instanceof HttpExceptions){
                exception = error;
            } else{
                // unhandled error or runtime error
                exception = new InternalException("Something went wrong", error, ErrorCode.InternalException)
            }
            next(exception);
        }
    }
}