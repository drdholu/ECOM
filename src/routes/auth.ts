import express, {Request, Response, Router} from "express"
import { login, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRoutes: Router = Router();

authRoutes.post('/signup', errorHandler(signup));
authRoutes.get('/login', errorHandler(login));

export default authRoutes;