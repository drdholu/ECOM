import express, {NextFunction, Request, Response, Router} from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets";
import { ErrorCode } from "../exceptions/root";
import { BadReq } from "../exceptions/BadReq";
import { UnproccesableEntity } from "../exceptions/validation";
import { LoginSchema, SignUpSchema } from "../schema/users";
import { NotFound } from "../exceptions/not-found";

enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

// export const login = async (req: Request, res: Response) => {
//     const {email, password} = req.body

//     try {
//         const userExists = await prismaClient.user.findFirst({
//             where: {
//                 email: email
//             }
//         })

//         if(!userExists) 
//             return res.status(ErrorCode.userExists).json({
//                 msg: "user doesn't exist"
//             })

//         if(!compareSync(password, userExists.password)) {
//             return res.status(ErrorCode.IncorrectPass).json({
//                 msg: "Incorrect password/email"
//             })
//         }

//         const token = jwt.sign({userId: userExists.id}, JWT_SECRET)

//         res.status(ResponseStatus.Success).json({
//             user: userExists,
//             token: token,
//         })
        
//     } catch (error) {
//         res.status(ResponseStatus.Error).json({
//             msg: `Signup error ${error}`
//         })
//     }
// }

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body

    LoginSchema.parse(req.body);
    const userExists = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    })

    if(!userExists) {
        next(new NotFound("User doesn't exist", ErrorCode.UserNotFound));
        return; // return to remove error ('userExists' is possibly 'null'.ts(18047))
    }

    if(!compareSync(password, userExists.password)) {
        next(new BadReq("Incorrect password/email", ErrorCode.IncorrectPass));
        return;
    }

    const token = jwt.sign({userId: userExists.id}, JWT_SECRET)

    res.status(ResponseStatus.Success).json({
        user: userExists,
        token: token,
    })

    // try {
    //     const userExists = await prismaClient.user.findFirst({
    //         where: {
    //             email: email
    //         }
    //     })

    //     if(!userExists) {
    //         next(new BadReq("User doesn't exist", ErrorCode.userExists));
    //         return; // to remove error ('userExists' is possibly 'null'.ts(18047))
    //     }

    //     if(!compareSync(password, userExists.password)) {
    //         next(new BadReq("Incorrect password/email", ErrorCode.IncorrectPass));
    //         return;
    //     }

    //     const token = jwt.sign({userId: userExists.id}, JWT_SECRET)

    //     res.status(ResponseStatus.Success).json({
    //         user: userExists,
    //         token: token,
    //     })
        
    // } catch (error: any) {
    //     next(new UnproccesableEntity(error?.issues, 'Login error', ErrorCode.UnproccesableEntity));
    // }
}


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password, name} = req.body

    SignUpSchema.parse(req.body)
    const userExists = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    })

    if(userExists) {
        next(new BadReq('User exists', ErrorCode.userExists))
        return;
    }
    // return res.status(ErrorCode.UserNotFound).json({
    //     msg: "user alr exists"
    // })

    const user = await prismaClient.user.create({
        data:{
            email, 
            password: hashSync(password, 10),
            name
        }
    })

    return res.status(ResponseStatus.Success).json({
        msg: 'signup successful',
        user: user
    })

    // try {
    //     SignUpSchema.parse(req.body)
    //     const userExists = await prismaClient.user.findFirst({
    //         where: {
    //             email: email
    //         }
    //     })

    //     if(userExists) {
    //         next(new BadReq('User exists', ErrorCode.userExists))
    //         return;
    //     }
    //     // return res.status(ErrorCode.UserNotFound).json({
    //     //     msg: "user alr exists"
    //     // })

    //     await prismaClient.user.create({
    //         data:{
    //             email, 
    //             password: hashSync(password, 10),
    //             name
    //         }
    //     })

    //     return res.status(ResponseStatus.Success).json({
    //         msg: 'signup successful'
    //     })
        
    // } catch (error: any) {
    //     // res.status(ResponseStatus.Error).json({
    //     //     msg: `Signup error ${error}`
    //     // })
    //     next(new UnproccesableEntity(error?.issues, 'Signup error', ErrorCode.UnproccesableEntity));
    //     return
    // }
}