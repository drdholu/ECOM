import { NextFunction, Request, Response } from "express";
import { HttpExceptions } from "../exceptions/root";

export const errorMiddleware = (error: HttpExceptions, req: Request, res: Response, next: NextFunction) => {
    
    console.log(`here error middleware`);
    res.status(error.statusCode).json({
        msg: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
    console.log(`no error middleware`)
    next(error);

}