import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IRolesController } from "./interfaces/IRolesController";
import { IRolesServices } from "../../services";
import { RolesServices } from "../../services/RolesServices";
import { createSchema, idSchema, roleNameSchema, updateSchema } from "./Schema/RolesSchema";
import { Roles } from "../../domain";

class RolesController implements IRolesController{
    private rolesServices: IRolesServices;
    constructor(){
        this.rolesServices = new RolesServices();
        this.getByRoleName = this.getByRoleName.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getId = this.getId.bind(this);
    }
    async getByRoleName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await roleNameSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { roleName } = resultSchema.data;
            const role = this.rolesServices.GetRoleByRoleName(roleName);
            if(role !== undefined){
                return res.json(role);
            }
            return res.json("Nada encontrado!");
        }
        return res.json(resultSchema.error);
    }
    async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await createSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { roleName, typeid } = resultSchema.data;
            const role = new Roles({
                id:0,
                roleName,
                typeid
            })
            const result = await this.rolesServices.Save(role);
            return res.json(result);
        }
        return res.json(resultSchema.error);
    }
    async update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await updateSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { id, roleName, typeid} = resultSchema.data;
            const role = new Roles({
                id:id,
                roleName,
                typeid
            });
            const result = await this.rolesServices.Save(role);
            return res.json(result);
        }
        return res.json(resultSchema.error);
    }
    async getAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const list = await this.rolesServices.GetAll();
        if(list.length !== 0 ){
            return res.json(list);
        }
        return res.json("Nada Encontrado!")
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    async getId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        const resultSchema = await idSchema.safeParseAsync(req.body);
        if(resultSchema.success){
            const { id } = resultSchema.data;
            const role = this.rolesServices.GetbyId(id);
            if(role !== undefined){
                return res.json(role);
            }
            return res.json("Nada encontrado");
        }
        throw new Error("Method not implemented.");
    }

}
export { RolesController }
