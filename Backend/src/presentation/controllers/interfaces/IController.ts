import { Request, Response } from "express";

interface IController {
    create(req: Request, res: Response): Promise<Response>;
    update(req:Request, res:Response): Promise<Response>;
    getAll(req:Request, res:Response):Promise<Response>;
    delete(req:Request, res:Response):Promise<Response>;
    getId(req:Request, res:Response):Promise<Response>
}
export { IController }
