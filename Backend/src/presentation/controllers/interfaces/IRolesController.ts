import { Request, Response } from "express";
import { IController } from "./IController";

interface IRolesController extends IController{
    getByRoleName(req: Request, res: Response): Promise<Response>
}
export { IRolesController }
