import { Router } from "express"
import { AuthController } from "../controllers/AuthController";

const AuthRoute = () =>{
    const authRoute = Router();
    const authController = new AuthController();
    authRoute.post('/login', authController.login);
    authRoute.post('/register', authController.register)
    return authRoute;
}

export { AuthRoute }
