import { Request, Response } from "express";

interface IAuthController {
    register(req:Request, res: Response): Promise<Response>;
    login(req:Request, res: Response): Promise<Response>
}
export { IAuthController }
