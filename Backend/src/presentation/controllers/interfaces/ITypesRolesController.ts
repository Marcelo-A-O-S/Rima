import { Request, Response } from "express";
import { IController } from "./IController";

interface ITypesRolesController extends IController{
    GetByTypeName(req:Request, res:Response):Promise<Response>
}
export { ITypesRolesController }
