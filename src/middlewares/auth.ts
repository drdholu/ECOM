import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets"
import { UnauthorizedException } from "../exceptions/unauthorized"
import { ErrorCode } from "../exceptions/root"
import { prismaClient } from ".."
import { any } from "zod"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.includes("Bearer ")){
        next(new UnauthorizedException("Invalid token", ErrorCode.Unauthorized))
        return;
    }

    const token = authHeader?.split(" ")[1]!
    
    try {
        
        const payload = jwt.verify(token, JWT_SECRET) as any
    
        const user = await prismaClient.user.findFirst({where: {
            id: payload.userId
        }})
    
        if(!user){
            next(new UnauthorizedException("Invalid token", ErrorCode.Unauthorized))
            return;
        }
    
        (req: any) => {
            req.user = user;
        }
        next();

    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.Unauthorized))
        return;
    }


}