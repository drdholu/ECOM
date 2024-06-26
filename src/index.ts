import express, {Request, Response, Router} from "express"
import rootRouter from "./routes";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";

const app = express();
app.use(express.json());
app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    // log: ['query']
})

app.use(errorMiddleware);    

app.listen(PORT, () =>  console.log(`port is running on port:${PORT}`));