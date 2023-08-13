import { NextFunction, Request, Response } from "express";

export default class AuthMiddeware {
    async Authentication(roles:string[]){
        return function(req:Request,res: Response,next: NextFunction){
            let acess:boolean = false;
            const auth = req.headers['authorization'];
            roles.map(role =>{
                if(role.toString() == auth?.toString()){
                    acess = true;
                }
            })
            if(acess === false){
                return res.status(403).json("Acesso não autorizado")
            }
            next();
        }
    }

}
