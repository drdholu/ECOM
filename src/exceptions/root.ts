// message, status code, error code, error

export class HttpExceptions extends Error {
    message: string;
    statusCode: number;
    errorCode: ErrorCode;
    errors: any;

    constructor(message: string, statusCode: number, errorCode: ErrorCode, errors: any) {
        super(message)
        console.log("http exception constructor")
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
}

export enum ErrorCode {
    UserNotFound = 1001,
    // UserNotFound = 400,
    userExists = 1002,
    // userExists = 400,
    IncorrectPass = 1003,
    // IncorrectPass = 400,
    UnproccesableEntity = 1004,
    InternalException = 1005,
    Success = 200,
    Error = 500
}