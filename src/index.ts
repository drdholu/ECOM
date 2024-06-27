import express, {Request, Response, Router} from "express"
import rootRouter from "./routes";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app = express();
app.use(express.json());
app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    // log: ['query']
})
// .$extends({
//     name: 'signup schema validation',
//     query:{
//         user:{
//             create({args, query}) {
//                 args.data = SignUpSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// }) -> commented this as it runs AFTER the user is created, whereas we need it before the user is created

app.use(errorMiddleware);    

app.listen(PORT, () =>  console.log(`port is running on port:${PORT}`));