import express, {Request, Response, Router} from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets";
import { ErrorCode } from "../exceptions/root";

enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!userExists) 
            return res.status(ErrorCode.userExists).json({
                msg: "user doesn't exist"
            })

        if(!compareSync(password, userExists.password)) {
            return res.status(ErrorCode.IncorrectPass).json({
                msg: "Incorrect password/email"
            })
        }

        const token = jwt.sign({userId: userExists.id}, JWT_SECRET)

        res.status(ResponseStatus.Success).json({
            user: userExists,
            token: token,
        })
        
    } catch (error) {
        res.status(ResponseStatus.Error).json({
            msg: `Signup error ${error}`
        })
    }
}

export const signup = async (req: Request, res: Response) => {
    const {email, password, name} = req.body

    try {
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userExists) 
            return res.status(ErrorCode.UserNotFound).json({
                msg: "user alr exists"
            })

        await prismaClient.user.create({
            data:{
                email, 
                password: hashSync(password, 10),
                name
            }
        })

        return res.status(ResponseStatus.Success).json({
            msg: 'signup successful'
        })
        
    } catch (error) {
        res.status(ResponseStatus.Error).json({
            msg: `Signup error ${error}`
        })
    }

}